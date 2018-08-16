import {
  AssignmentExpression,
  BinaryExpression,
  BlockNode,
  BlockLevelStatement,
  BooleanLiteral,
  BreakStatement,
  CallExpression,
  CommentNode,
  EnumDeclaration,
  ExportDirective,
  Expression,
  ForLoop,
  FunctionDeclaration,
  Identifier,
  IfExpression,
  IfLetExpression,
  ImplDeclaration,
  ImplShorthandDeclaration,
  ImportDirective,
  IndexAccess,
  ListLiteral,
  MatchArm,
  MatchExpression,
  Option,
  MemberAccess,
  Module,
  NumberLiteral,
  ObjectLiteral,
  Pattern,
  RangeLiteral,
  RecordPatternArm,
  ReturnStatement,
  SimpleIdentifier,
  StringLiteral,
  SimpleStringLiteral,
  SimpleToken,
  TraitDeclaration,
  TupleIndexAccess,
  TupleLiteral,
  TuplePattern,
  TuplePatternArm,
  TypeBound,
  TypeDeclaration,
  TypePath,
  TypePathObjectArm,
  UnaryExpression,
  UnitPatternArm,
  VariableDeclaration,
  WhileLoop,
} from './ast'
import {Expression as ExpressionImpl} from '../ast/ast'
import {SyntaxKind} from '../ast/token'
import {Type, Record, Tuple, Implementation} from '../entities'
import {isPatternMutable} from '../typeck/src/functions'
import {getImplementationForTrait} from '../typeck/src/impls'
import {Scope} from '../typeck/src/scope'
import {isAssignable} from '../typeck/src/types'

const jsKeywords = [
  'arguments', 'case', 'class', 'default', 'delete', 'function', 'global', 'module', 'new', 'null',
  'require', 'static', 'Object', 'typeof', 'undefined',
]
const tokenToJs = (kind: {kind: string}) => {
  if (kind.kind == 'AndKeyword') return '&&'
  if (kind.kind == 'OrKeyword')  return '||'
  if (kind.kind == 'NotKeyword') return '!'
  if (kind.kind == 'EqualsEqualsToken') return '==='
  if (kind.kind == 'ExclamationEqualsToken') return '!=='
  if (kind.kind == 'PlusPlusToken') return '+'
  return SyntaxKind.name.call(kind)
}
const gloablPuckJsImports = ['require', 'module']

enum Context {
  Return = 1,
  Value = 2,
}

function getPatternType(pattern: Pattern): Type|undefined {
  if (pattern.kind === 'UnitType' || pattern.kind === 'TupleType' || pattern.kind === 'RecordType') {
    const typePath = pattern.kind === 'UnitType'
      ? pattern.value
      : pattern.value[0]
    return typePath.type_
  }
}

function getEnumMember(pattern: Pattern): string|undefined {
  const type = getPatternType(pattern)
  if (type && type.enumMember) {
    return type.enumMember[0]
  }
}

function getEnumType(type: Type|undefined): Type|undefined {
  if (!type) return
  if (type.providesType) {
    type = type.providesType
  }
  if (type.enumMember) {
    type = type.enumMember[1]
  }
  if (type.kind.kind !== 'Enum') return
  return type
}

function useUndefinedPointerOptimization(type: Type|undefined) {
  type = getEnumType(type)
  if (!type) return false
  const members = Object.keys(type.kind.value.members)
  if (members.length !== 2) return false
  const hasUnit = members.some(m => type!.kind.value.members[m].kind.value.kind.kind === 'Unit')
  const hasValue = members.some(m => type!.kind.value.members[m].kind.value.kind.kind !== 'Unit')

  return hasUnit && hasValue
}

export function Emitter() {
  let level = 0
  let context: Context|null = null
  let allowReturnContext = true
  let hoist: ((code: string) => void) | undefined
  let valueVariable: string|null
  let valueVarableCount = 0
  let currentPrecedence: number
  let typeOverrides = {} as {[name: string]: {old: Type, new: Type}}
  let includeTraitObjectHelper = false
  let exportPreamble = [] as Array<string>
  let functionContext: {
    returnType: Type|undefined
  }

  function newValueVariable() {
    valueVarableCount += 1
    return `$puck_${valueVarableCount}`
  }

  function isOverriden(e: Expression): boolean {
    return e.kind === 'Identifier' &&
      typeOverrides[(e.value as Identifier).name] &&
      typeOverrides[(e.value as Identifier).name].old === e.value.type_
  }
  function getType(e: Expression, allowOverriden = true): Type {
    if (isOverriden(e) && allowOverriden) {
      return typeOverrides[(e.value as Identifier).name].new
    }
    return e.value.type_
  }

  function unwrap(code: string, e: Expression) {
    let type = getType(e)
    if (type && (type.kind.kind === 'Trait' || type.kind.kind === 'Intersection')) {
      return `${code}.value`
    }
    else if (!type || type.kind.kind === 'Parameter') {
      includeTraitObjectHelper = true
      return `$unwrapTraitObject(${code})`
    }
    return code
  }

  function withContext<T>(newContext: Context|null, fn: () => T, forceSet = false): T {
    if (!forceSet && newContext === Context.Return && context === Context.Return) {
      return fn()
    }
    if (newContext === Context.Return) {
      allowReturnContext = true
    }
    let wasInContext = context
    context = newContext
    let value = fn()
    context = wasInContext
    if (newContext === Context.Return) {
      allowReturnContext = true
    }
    return value
  }

  function withPrecedence(operator: SimpleToken, emitter: () => string) {
    const parentPrecedence = currentPrecedence
    currentPrecedence = SyntaxKind.precedence.call(operator.kind)
    if (parentPrecedence > currentPrecedence)
      return `(${emitter()})`
    else return emitter()
  }

  function indent(lines: string, level?: number): string
  function indent(lines: string[], level?: number): string[]
  function indent(lines: string|string[], level_ = level) {
    let indentation = ''
    for (let i = 0; i < level_; i++) {
      indentation += '  '
    }
    if (Array.isArray(lines)) {
      return lines.map(line => indentation + line)
    } else {
      return indentation + lines
    }
  }

  function getTypeClass(type: any) {
    if (type._class && type.typeParameters && type.typeParameters.some((p: any) => p.isTypeParameter)) {
      return type._class
    }
    else return type
  }

  function getImplId(type: Type, trait: Type) {
    let opt = getImplementationForTrait(type, trait).value
    if (!opt) {
      console.error('type displayName', Type.displayName.call(type))
      console.error('type verboseName', Type.verboseName.call(type))
      console.error('trait displayName', Type.displayName.call(trait))
      console.error('trait verboseName', Type.verboseName.call(trait))
      throw Error('No impl')
    }
    return opt.id
  }

  function implProp(impl: Implementation) {
    return `[${JSON.stringify(impl.id)}]`
  }

  function emitExpressions(block: Expression[], inContext = context, assignedTo_?: Type) {
    let wasInContext = inContext
    context = null
    let expressions: any[] = []
    let outerHoist = hoist
    hoist = code => {
      expressions.push(code)
    }
    let assignedTo
    for (let i = 0; i < block.length; i++) {
      if (i == block.length - 1) {
        context = wasInContext
        assignedTo = assignedTo_
      }
      allowReturnContext = true
      expressions.push(emitExpressionKeepContext(block[i], assignedTo))
    }
    hoist = outerHoist
    return expressions
  }

  function emitTopLevelStatements(block: any[]) {
    let expressions: any[] = []
    hoist = code => {
      expressions.push(code)
    }
    for (let i = 0; i < block.length; i++) {
      context = null
      allowReturnContext = true
      if (isExported(block[i])) {
        expressions.push(emitExportDirective(block[i].value))
      } else {
        expressions.push(emitBlockLevelStatement(block[i].value, undefined))
      }
    }
    hoist = undefined
    return expressions
  }

  function emitBlockLevelStatements(block: BlockLevelStatement[], inContext = context, assignedTo_?: Type) {
    let wasInContext = inContext
    context = null
    let expressions: any[] = []
    let outerHoist = hoist
    hoist = code => {
      expressions.push(code)
    }
    let assignedTo
    for (let i = 0; i < block.length; i++) {
      if (i == block.length - 1) {
        context = wasInContext
        assignedTo = assignedTo_
      }
      allowReturnContext = true
      expressions.push(emitBlockLevelStatement(block[i], assignedTo))
    }
    hoist = outerHoist
    return expressions
  }

  function isExported(e: Module['statements'][0], kind: string = ''): e is {kind: any, value: ExportDirective} {
    return e.kind === 'ExportDirective' &&
      (kind === '' || e.value.statement.kind === kind)
  }

  function emitModule(module: Module, isBin: boolean) {
    let preamble = `${isBin ? '#!/usr/bin/env node\n' : ''}'use strict';\n`
    let statements =
      module.statements
        .filter(e => e.kind === 'ImportDirective')
        .map(e => emitImportDirective(e.value as ImportDirective))
    statements = statements.concat(
      module.statements
        .filter(e => e.kind === 'TypeDeclaration' || isExported(e, 'TypeDeclaration'))
        .map(e =>
          isExported(e, 'TypeDeclaration')
            ? emitExportDirective(e.value)
            : emitTypeDeclaration(e.value as TypeDeclaration)
        )
    )
    statements = statements.concat(
      module.statements
        .filter(e => e.kind === 'EnumDeclaration' || isExported(e, 'EnumDeclaration'))
        .map(e =>
          isExported(e, 'EnumDeclaration')
            ? emitExportDirective(e.value)
            : emitEnumDeclaration(e.value as EnumDeclaration)
        )
    )
    statements = statements.concat(
      module.statements
        .filter(e => e.kind === 'TraitDeclaration' || isExported(e, 'TraitDeclaration'))
        .map(e =>
          isExported(e, 'TraitDeclaration')
            ? emitExportDirective(e.value)
            : emitTraitDeclaration(e.value as TraitDeclaration)
        )
    )
    statements = statements.concat(
      module.statements
        .filter(e => e.kind === 'ImplDeclaration')
        .map(e => emitImplDeclaration(e.value as ImplDeclaration))
    )
    statements = statements.concat(
      module.statements
        .filter(e => e.kind === 'ImplShorthandDeclaration')
        .map(e => emitImplShorthandDeclaration(e.value as ImplShorthandDeclaration))
    )
    statements = statements.concat(emitTopLevelStatements(
      module.statements
        .filter(e =>
          e.kind === 'BlockLevelStatement' ||
          isExported(e, 'Identifier') ||
          isExported(e, 'FunctionDeclaration') ||
          isExported(e, 'VariableDeclaration')
        )
    ))
    if (includeTraitObjectHelper) {
      preamble += '\nconst $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);\n'
    }

    let e = ''
    if (exportPreamble.length) {
      e = exportPreamble.join(' = ') + ' = undefined;\n'
    }
    return preamble + e + statements.join(';\n')
  }

  function emitBlock(block: BlockNode, inContext?: Context|null, assignedTo_?: Type) {
    level++
    let expressions = emitBlockLevelStatements(block.statements, inContext, assignedTo_)
    let body
    let end = '}'
    if (expressions.length !== 0) {
      let last = expressions.length - 1
      if (expressions[last] !== 'break') {
        expressions[last] = `${expressions[last]};\n`
      }
      body = `\n${indent(expressions).join(`;\n`)}`
      end = indent(end, level - 1)
    }
    level--
    return `{${body || ''}${end}`
  }

  function emitBlockLevelStatement(expression: BlockLevelStatement, assignedTo: Type|undefined) {
    switch (expression.kind) {
      case 'ForLoop': return emitForLoop(expression.value);
      case 'WhileLoop': return emitWhileLoop(expression.value);

      case 'BreakStatement': return emitBreak(expression.value);
      case 'ReturnStatement': return emitReturn(expression.value);

      case 'Expression': return emitExpressionKeepContext(expression.value, assignedTo);
    }
  }

  function emitScalarExpression(expression: Expression, assignedTo: Type|undefined) {
    switch (expression.kind) {
      case 'JsExpression': return expression.value;
      case 'ThrowStatement': return emitThrow(expression.value);
      case 'FunctionDeclaration': return emitFunctionDeclaration(expression.value)
      case 'Identifier': return emitIdentifier(expression.value)
      case 'VariableDeclaration': return emitVariableDeclaration(expression.value)

      case 'AssignmentExpression': return emitAssignmentExpression(expression.value)
      case 'BinaryExpression': return emitBinaryExpression(expression.value)
      case 'CallExpression': return emitCallExpression(expression.value)
      case 'TypePathExpression': return emitTypePath(expression.value.typePath)
      case 'UnaryExpression': return emitUnaryExpression(expression.value)

      case 'IndexAccess': return emitIndexAccess(expression.value)
      case 'MemberAccess': return emitMemberAccess(expression.value)
      case 'TupleIndexAccess': return emitTupleIndexAccess(expression.value)
      case 'UnknownAccess': return emitMemberAccess(expression.value)
      case 'UnknownIndexAccess': return emitIndexAccess(expression.value)

      case 'BooleanLiteral': return emitBooleanLiteral(expression.value)
      case 'ListLiteral': return emitListLiteral(expression.value, assignedTo)
      case 'NumberLiteral': return emitNumberLiteral(expression.value)
      case 'RangeLiteral': return emitRangeLiteral(expression.value)
      case 'RecordLiteral': return emitObjectLiteral(expression.value, assignedTo)
      case 'StringLiteral': return emitStringLiteral(expression.value)
      case 'TupleLiteral': return emitTupleLiteral(expression.value, assignedTo)
    }
  }

  let currentValueVariableContext: string|null
  function emitExpressionKeepContext(expression: Expression, assignedTo?: Type): string {
    let outerValueVariableContext = currentValueVariableContext
    if (currentValueVariableContext == valueVariable) {
      valueVariable = null
    } else {
      currentValueVariableContext = valueVariable
    }
    try {
      let scalarExpression = emitScalarExpression(expression, assignedTo)
      if (scalarExpression) {
        const expressionType = getType(expression)
        if (assignedTo && expressionType && (context == Context.Return || context == Context.Value)) {
          if (
            assignedTo.kind.kind === 'Trait' && expressionType.kind.kind === 'Intersection'
          ) {
            let baseType = expressionType
            do {
              baseType = baseType.kind.value.baseType
            } while (baseType.kind.kind === 'Intersection')
            if (isAssignable(assignedTo, baseType)) {
              scalarExpression = `{type: '${getImplId(baseType, assignedTo)}', value: ${scalarExpression}.value, $isTraitObject: true}`
            } else {
              if (expression.kind !== 'Identifier') {
                const valueVariable = newValueVariable()
                hoist!(`let ${valueVariable} = ${scalarExpression}`)
                scalarExpression = valueVariable
              }
              scalarExpression = `{type: ${scalarExpression}.traits['${assignedTo.id}'], value: ${scalarExpression}.value, $isTraitObject: true}`
            }
          }
          else if (
            assignedTo.kind.kind === 'Trait' && expressionType.kind.kind !== 'Trait'
          ) {
            scalarExpression = `{type: '${getImplId(expressionType, assignedTo)}', value: ${scalarExpression}, $isTraitObject: true}`
          }
          else if (
            assignedTo.kind.kind === 'Intersection' && expressionType.kind.kind !== 'Intersection'
          ) {
            const traits = []
            let currentType = assignedTo
            do {
              const trait = currentType.kind.value.intersectedTrait
              traits.push(
                `'${trait.id}': '${getImplId(expressionType, trait)}'`
              )
              currentType = currentType.kind.value.baseType
            } while (currentType.kind.kind === 'Intersection')
            scalarExpression = `{traits: {${traits.join(',')}}, value: ${scalarExpression}, $isTraitObject: true}`
          }
          else if (assignedTo.kind.kind !== 'Trait' && assignedTo.kind.kind !== 'Intersection') {
            scalarExpression = unwrap(scalarExpression, expression)
          }
        }
        if (allowReturnContext && context == Context.Return) {
          allowReturnContext = false
          return `return ${scalarExpression}`
        }
        else if (allowReturnContext && context == Context.Value && valueVariable) {
          return `${valueVariable} = ${scalarExpression}`
        }
        else {
          return scalarExpression
        }
      }
      switch (expression.kind) {
        case 'IfExpression': return emitIfExpression(expression.value)
        case 'IfLetExpression': return emitIfLetExpression(expression.value)
        case 'MatchExpression': return emitMatchExpression(expression.value)
        default:
          throw Error(`${expression.kind} is not supported`)
      }
    } finally {
      valueVariable = currentValueVariableContext
      currentValueVariableContext = outerValueVariableContext
    }
  }

  function emitExpression(expression: Expression, context: Context|null = null, assignedTo_?: Type) {
    return withContext(context, () => emitExpressionKeepContext(expression, assignedTo_), false)
  }

  function emitEnumDeclaration(e: EnumDeclaration, export_ = '') {
    const uPO = useUndefinedPointerOptimization(e.type_)
    return `var ${emitIdentifier(e.name)} = ${export_}{\n${
      indent(e.members.map(m => emitEnumMember(m, uPO)).join('\n'))
    }\n}`
  }

  function emitEnumMember(t: TypeDeclaration, useUndefinedPointerOptimization: boolean) {
    let value
    if (t.bound && useUndefinedPointerOptimization) {
      value = emitTypeBound(t)
    }
    else if (t.bound) {
      let bound = t.bound
      if (bound.kind === 'RecordTypeBound') {
        value = `(object) => ({kind: '${emitIdentifier(t.name)}', value: object})`
      }
      else if (bound.kind === 'TupleTypeBound') {
        if (bound.value.properties.length === 0) {
          value = `() => ({kind: '${emitIdentifier(t.name)}'})`
        }
        else if (bound.value.properties.length === 1) {
          value = `(member) => ({kind: '${emitIdentifier(t.name)}', value: member})`
        }
        else {
          value = `(...members) => ({kind: '${emitIdentifier(t.name)}', value: members})`
        }
      }
      else {
        throw `Unsupported type bound`
      }
    }
    else if (useUndefinedPointerOptimization) {
      value = 'undefined'
    }
    else {
      value = `{kind: '${emitIdentifier(t.name)}', value: Symbol('${emitIdentifier(t.name)}')}`
    }

    return `${emitIdentifier(t.name)}: ${value},`
  }

  function emitFunctionDeclaration(fn: FunctionDeclaration, emitName = true) {
    let name = (emitName && fn.name !== undefined) ? emitIdentifier(fn.name) : ''
    let parameterList = fn.parameterList

    if (!fn.body) throw 'Function without body'
    let body = fn.body
    const firstParameter = parameterList.length > 0 && parameterList[0]
    if (firstParameter && firstParameter.pattern.kind === 'Identifier' && firstParameter.pattern.value.identifier.name == 'self') {
      parameterList = fn.parameterList.slice(1)
      if (body.statements.length > 0) {
        body = {
          ...body,
          statements: [
            {
              kind: 'Expression',
              value: {
                kind: 'VariableDeclaration',
                value: {
                  ...fn.parameterList[0],
                  initializer: {
                    kind: 'Identifier',
                    value: {
                      name: 'this',
                    }
                  },
                } as VariableDeclaration,
              },
            },
            ...body.statements,
          ]
        }
      }
    }

    let oldTypeOverrides = typeOverrides
    typeOverrides = {...typeOverrides}

    if (fn.traitFunctionType) {
      const {selfBinding} = fn.traitFunctionType.kind.value
      if (selfBinding && firstParameter) {
        typeOverrides['self'] = {
          old: firstParameter.type_!,
          new: selfBinding.type_,
        }
      }

      parameterList.forEach((p, i) => {
        if (p.pattern.kind === 'Identifier') {
          typeOverrides[p.pattern.value.identifier.name] = {
            old: p.type_!,
            new: fn.traitFunctionType.kind.value.parameters[i].type_,
          }
        }
      })
    }

    let returnType =
      fn.traitFunctionType
        ? fn.traitFunctionType.kind.value.returnType
        : fn.returnType && fn.returnType.value.type_
    let code = `function ${name}(${parameterList.map(emitFunctionParameter).join(', ')}) `
    functionContext = {returnType}
    if (returnType && Type.isEmpty.call(returnType)) {
      code += emitBlock(body, undefined, returnType)
    }
    else {
      code += withContext(Context.Return, () => emitBlock(body, undefined, returnType), true)
    }

    typeOverrides = oldTypeOverrides

    return code
  }

  function emitFunctionParameter(vd: VariableDeclaration) {
    let initializer = vd.initializer
        ? ` = ${emitExpression(vd.initializer, Context.Value)}`
        : ''
    return `${emitPatternDestructuring(vd.pattern) || newValueVariable()}${initializer}`
  }

  function emitIdentifier(identifier: {name: string, binding?: any}) {
    if (identifier.binding && identifier.binding.definition.token.value.importName) {
      return identifier.binding.definition.token.value.importName
    }
    if (jsKeywords.indexOf(identifier.name) != -1) {
      return `_${identifier.name}`
    }
    return identifier.name
  }

  function emitImplDeclaration(i: ImplDeclaration) {
    let functions: {[name: string]: Type|string} = {...i.trait_.type_.kind.value.functions}
    let inherited =
      (i.trait_.type_.kind.value.requiredTraits || []).reduce(
        (members, trait) => {
          Object.keys(trait.kind.value.functions).forEach(fn => {
            members[fn] = trait
          })
          return members
        },
        {} as {[name: string]: Type}
      )
    i.members.forEach(m => functions[m.name!.name] = emitFunctionDeclaration(m, false))
    return `${emitTypePath(i.trait_.path)}${implProp(i.implementation)} = {\n${
      indent(

        Object.keys(inherited).map(f =>
          `${emitIdentifier({name: f})}: ${
            `${i.extendedTraits[inherited[f].id!]}.${emitIdentifier({name: f})}`
          }`
        ).concat(
          Object.keys(functions).map(f =>
            `${emitIdentifier({name: f})}: ${
              typeof functions[f] === 'string'
                ? functions[f]
                : `${emitTypePath(i.trait_.path)}.${emitIdentifier({name: f})}`
            }`)
        )
      )
      .join(',\n')
    }\n}`
  }

  function emitImplShorthandDeclaration(i: ImplShorthandDeclaration) {
    return i.members
      .map(m =>
        `${emitTypePath(i.type_.path)}.${emitIdentifier(m.name!)} = ${emitFunctionDeclaration(m, false)}`
      )
      .join(';\n')
  }

  function emitTraitDeclaration(t: TraitDeclaration, export_ = '') {
    return `var ${emitIdentifier(t.name)} = ${export_}{\n${
      indent(
        t.members
          .filter(m => m.body)
          .map(m => `${emitIdentifier(m.name!)}: ${emitFunctionDeclaration(m, false)}`)
      )
      .join(',\n')
    }\n}`
  }

  function emitTypeBound(t: TypeDeclaration) {
    let value
    if (t.bound) {
      let bound = t.bound
      if (bound.kind === 'RecordTypeBound') {
        value = `(object) => object`
      }
      else if (bound.kind === 'TupleTypeBound') {
        if (bound.value.properties.length === 0) {
          value = `() => undefined`
        }
        else if (bound.value.properties.length === 1) {
          value = `(member) => member`
        }
        else {
          value = `(...members) => members`
        }
      }
      else {
        throw `Unsupported type bound`
      }
    } else {
      value = `Symbol('${emitIdentifier(t.name)}')`
    }

    return value
  }

  function emitTypeDeclaration(t: TypeDeclaration, export_ = '') {
    let value = emitTypeBound(t)

    return `var ${emitIdentifier(t.name)} = ${export_}${value}`
  }

  function emitVariableDeclaration(vd: VariableDeclaration, export_ = '') {
    let willBeRedefined = true
    let binding
    if (vd.pattern.kind === 'Identifier') {
      binding = Scope.getBinding.call(vd.scope, vd.pattern.value.identifier.name)
      willBeRedefined = binding.redefined || binding.previous
      while (binding && binding.definition && binding.definition.token.value !== vd.pattern) {
        binding = binding.previous
      }
    }

    let initializer = ``

    if (vd.initializer) {
      initializer = emitExpression(vd.initializer, Context.Value, vd.type_)
      let type = getType(vd.initializer)

      if (vd.pattern.kind !== 'Identifier' && vd.pattern.kind !== 'CatchAll') {
        initializer = unwrap(initializer, vd.initializer)
      }
      initializer = `${export_}${initializer}`
    }

    const destructure = emitPatternDestructuring(vd.pattern)
    if (initializer && destructure) {
      initializer = ` = ${initializer}`
    }

    if (binding && binding.previous) {
      return `${destructure || ''}${initializer}`
    }

    if (context) {
      let valueVariable = newValueVariable()
      if (destructure) {
        hoist!(`let ${valueVariable}${initializer};`)
        hoist!(`let ${destructure} = ${valueVariable};`)
      }
      else {
        hoist!(`let ${valueVariable} = ${initializer};`)
      }

      return valueVariable
    }

    if (!destructure) return initializer

    let kw = export_ ? 'var' : ((willBeRedefined || isPatternMutable(vd.pattern)) ? 'let' : 'const')
    return `${kw} ${destructure}${initializer}`
  }

  function emitExportDirective(e: ExportDirective) {
    let identifier = emitIdentifier({...e.identifier, binding: undefined})
    let export_ = `exports.${identifier} = `
    const definition = `${
      e.statement.kind === 'EnumDeclaration'
        ? emitEnumDeclaration(e.statement.value, export_) :
      e.statement.kind === 'TraitDeclaration'
        ? emitTraitDeclaration(e.statement.value, export_) :
      e.statement.kind === 'TypeDeclaration'
        ? emitTypeDeclaration(e.statement.value, export_) :
      e.statement.kind === 'Identifier'
        ? `${export_}${emitIdentifier(e.statement.value)}` :
      e.statement.kind === 'FunctionDeclaration'
        ? `${emitFunctionDeclaration(e.statement.value, true)};\n${export_}${emitIdentifier(e.identifier)}` :
      e.statement.kind === 'VariableDeclaration'
        ? emitVariableDeclaration(e.statement.value, export_)
      : (() => {throw 'Unknown Exported statement'})()
    }`
    exportPreamble.push(`exports.${identifier}`)
    return definition
  }

  function emitImportDirective(i: ImportDirective) {
    let isPuckJsImport = false
    let path
    if (i.domain === undefined) {
      if (i.path.charAt(0) == '/') {
        path = i.path
      } else {
        path = `./${i.path}`
      }
      path = path.replace(/\.(puck|ts)$/, '')
    } else if (i.domain == 'node') {
      path = i.path
    } else if (i.domain == 'package') {
      const parts = i.path.split('/')
      const packageName = parts[0]
      const packagePath = parts.slice(1).join('/').replace(/\.(puck|ts)$/, '')
      path = `puck-${packageName}/dist/lib/${packagePath}`
    } else if (i.domain == 'puck') {
      path = `puck-lang/dist/lib/stdlib/${i.path}`
      isPuckJsImport = i.path === 'js'
    } else {
      throw `Unsupported import-domain "${i.domain}"`
    }

    let importName = i.specifier.kind === 'Identifier'
      ? `${emitIdentifier(i.specifier.value)}`
      : newValueVariable()
    if (i.specifier.kind === 'ObjectDestructure') {
      i.specifier.value.members.forEach(m => {
        if (isPuckJsImport && gloablPuckJsImports.indexOf(m.property.name) !== -1) {
          (m as any).importName = m.property.name
        }
        else {
          (m as any).importName = `${importName}.${emitIdentifier(m.property)}`
        }
      })
    }
    else if (isPuckJsImport && i.specifier.kind === 'Identifier') {
      (i.specifier.value as any).globalImports = gloablPuckJsImports
    }

    return `const ${importName} = require(${JSON.stringify(path)})`
  }

  function emitPatternDestructuring(p: Pattern): string|undefined {
    let isEnum = !!getEnumMember(p) && !useUndefinedPointerOptimization(getPatternType(p))

    if (p.kind === 'Identifier') {
      return emitIdentifier(p.value.identifier)
    }
    else if (p.kind === 'Record') {
      return `{${p.value.properties.map(({property, pattern}) => {
        let destructure = emitPatternDestructuring(pattern)
        if (destructure) return `${emitIdentifier(property)}: ${destructure}`
      }).filter(p => !!p).join(', ')}}`
    }
    else if (p.kind === 'RecordType') {
      let destructure = `{${p.value[1].properties.map(({property, pattern}) => {
        let destructure = emitPatternDestructuring(pattern)
        if (destructure) return `${emitIdentifier(property)}: ${destructure}`
      }).filter(p => !!p).join(', ')}}`
      if (isEnum) {
        destructure = `{value: ${destructure}}`
      }
      return destructure
    }
    else if (p.kind === 'Tuple') {
      return p.value.properties.length === 1
        ? emitPatternDestructuring(p.value.properties[0])
        : `[${p.value.properties.map(emitPatternDestructuring).join(', ')}]`
    }
    else if (p.kind === 'TupleType') {
      let destructure = p.value[1].properties.length === 1
        ? emitPatternDestructuring(p.value[1].properties[0])
        : `[${p.value[1].properties.map(emitPatternDestructuring).join(', ')}]`
      if (isEnum) {
        destructure = destructure && `{value: ${destructure}}`
      }
      return destructure
    }
  }

  function emitAssignmentExpression(e: AssignmentExpression): string {
    let left = emitScalarExpression(e.lhs, undefined)
    return `${left} ${tokenToJs(e.token.kind!)} ${emitExpression(e.rhs, Context.Value, getType(e.lhs))}`
  }

  function emitBinaryExpression(e: BinaryExpression) {
    let call = e.call
    if (call) {
      let lhsType = ExpressionImpl.getType.call(e.lhs)
      let rhsType = ExpressionImpl.getType.call(e.rhs)

      if (
          !rhsType || (
            (lhsType.id === 'Bool' && rhsType.id === 'Bool') ||
            (lhsType.id === 'Num' && rhsType.id === 'Num') ||
            (lhsType.id === 'String' && rhsType.id === 'String')
          )
        ) {
        call = false
      }
    }
    if (call) {
      return emitCallExpression(e.call)
    }
    return withPrecedence(e.operator, () =>
      `${emitExpression(e.lhs, Context.Value)} ${tokenToJs(e.operator.kind!)} ${emitExpression(e.rhs, Context.Value)}`
    )
  }

  function emitCallExpression(fn_: CallExpression) {
    let fn = fn_ as CallExpression & {traitName: string, isShorthand: boolean, isTraitObject: boolean, isDirectTraitCall: boolean}
    let functionName
    let functionType = fn_.functionType || getType(fn.func)
    let parameterBindings = functionType && functionType.kind.value.parameters

    if (fn.traitName) {
      parameterBindings = fn.functionType.kind.value.parameters
      let selfBinding = fn.functionType.kind.value.selfBinding
      if (selfBinding) {
        parameterBindings = [selfBinding, ...parameterBindings]
      }
      let outerValueVariable = valueVariable
      if (fn.isTraitObject) {
        if ((fn.func.value as MemberAccess).object.kind === 'Identifier') {
          valueVariable = ((fn.func.value as MemberAccess).object.value as Identifier).name
        } else {
          valueVariable = newValueVariable()
          hoist!(`let ${valueVariable} = ${emitExpression((fn.func.value as MemberAccess).object)}\n`)
        }
      }
      let traitName = fn.traitBinding && fn.traitBinding.definition.token.value.importName
        ? fn.traitBinding.definition.token.value.importName
        : fn.traitName

      functionName = `${traitName}${
        (fn.isShorthand || (!selfBinding && !fn.isDirectTraitCall)) ? `` :
        fn.isTraitObject ? `[${emitIdentifier({name: valueVariable!})}.type]`
        : `${implProp(fn.implementation)}`
      }.${emitIdentifier((fn.func.value as MemberAccess).member)}`

      if (selfBinding) {
        if (fn.isTraitObject) {
          fn.argumentList.unshift({
            kind: 'Identifier',
            value: {
              name: valueVariable,
              type_: (fn.func.value as MemberAccess).object.value.type_,
            } as Identifier,
          })
        }
        else {
          fn.argumentList.unshift((fn.func.value as MemberAccess).object)
        }
        functionName += '.call'
      }
      else if (fn.isDirectTraitCall) {
        functionName += '.call'
      }
      // transmute is a noop
      if (
        fn.implementation && fn.implementation.type_.id &&
        fn.implementation.type_.id === 'Unknown' &&
        (fn.func.value as MemberAccess).member.name == 'transmute'
      ) {
        return emitExpression((fn.func.value as MemberAccess).object)
      }
      valueVariable = outerValueVariable
    }
    else {
      functionName = emitExpression(fn.func)
    }

    return `${functionName}(${fn.argumentList.map((arg, i) =>
      emitExpression(arg, Context.Value, parameterBindings && parameterBindings[i] && parameterBindings[i].type_)
    ).join(', ')})`
  }

  function emitIfExpression(e: IfExpression) {
    let condition = emitExpression(e.condition, Context.Value)
    let produceValue = context == Context.Value
    let outerValueVariable = valueVariable
    if (produceValue) {
      valueVariable = newValueVariable()
    }
    let then = emitBlock(e.then_)
    let el = e.else_
      ? (`\n${indent('else')} ${emitBlock(e.else_)}`)
      : ''

    let code = `if (${condition}) ${then}${el}`

    if (produceValue) {
      hoist!(`let ${valueVariable};\n${indent(code)}`)
      let thisValueVariable = valueVariable!
      valueVariable = outerValueVariable
      return valueVariable
        ? `${valueVariable} = ${thisValueVariable}`
        : thisValueVariable
    }
    else return code
  }

  function emitPatternComparison(pattern: Pattern, expression: Expression): Expression {
    let enumMember = getEnumMember(pattern)
    let condition: Array<Expression> = []

    if (enumMember) {
      const patternType = getEnumType(getPatternType(pattern))
      if (useUndefinedPointerOptimization(patternType)) {
        const isUnit = patternType!.kind.value.members[enumMember].kind.value.kind.kind === 'Unit'
        condition.push({
          kind: 'BinaryExpression',
          value: {
            lhs: expression,
            operator: {
              kind: isUnit
                ? SyntaxKind.EqualsEqualsToken
                : SyntaxKind.ExclamationEqualsToken
            },
            rhs: {
              kind: 'JsExpression',
              value: 'undefined',
            },
          } as BinaryExpression
        })
      }
      else {
        condition.push({
          kind: 'BinaryExpression',
          value: {
            lhs: {
              kind: 'MemberAccess',
              value: {
                object: expression,
                member: {
                  name: 'kind',
                },
              }
            },
            operator: {kind: SyntaxKind.EqualsEqualsToken},
            rhs: {
              kind: 'StringLiteral',
              value: {
                parts: [{
                  kind: 'Literal',
                  value: {value: emitIdentifier({name: enumMember})},
                }],
              } as StringLiteral,
            },
          } as BinaryExpression
        })
      }

      let innerPattern: Pattern|undefined
      if (pattern.kind === 'TupleType') {
        innerPattern = {
          kind: 'Tuple',
          value: pattern.value[1],
        }
      }
      else if (pattern.kind === 'RecordType') {
        innerPattern = {
          kind: 'Record',
          value: pattern.value[1],
        }
      }

      if (innerPattern) {
        condition.push(
          emitPatternComparison(
            innerPattern,
            useUndefinedPointerOptimization(patternType)
              ? expression
              : {
                kind: 'MemberAccess',
                value: {
                  object: expression,
                  member: {
                    name: 'value',
                  },
                }
              }
          )
        )
      }
    }
    else {
      if (pattern.kind === 'Record') {
        condition = pattern.value.properties
          .map(p => emitPatternComparison(p.pattern, {
            kind: 'MemberAccess',
            value: {
              object: expression,
              member: p.property,
            }
          }))
      }
      else if (pattern.kind === 'Tuple') {
        if (pattern.value.properties.length === 1) {
          condition.push(
            emitPatternComparison(pattern.value.properties[0], expression)
          )
        }
        else {
          condition = pattern.value.properties
            .map((p, i) => emitPatternComparison(p, {
              kind: 'IndexAccess',
              value: {
                object: expression,
                index: {
                  kind: 'NumberLiteral',
                  value: {value: i, type_: {kind: {kind: 'Struct'}}},
                },
              } as IndexAccess
            }))
        }
      }
    }

    condition = condition.filter(e => e.kind !== 'BooleanLiteral')

    if (condition.length === 0) return {kind: 'BooleanLiteral', value: {value: true}}

    return condition.reduce((acc, curr) => ({
      kind: 'BinaryExpression',
      value: {
        lhs: acc,
        operator: {kind: SyntaxKind.AndKeyword},
        rhs: curr,
      }
    }))
  }

  function emitIfLetExpression(e: IfLetExpression) {
    let outerValueVariable = valueVariable
    let initializer: Identifier
    if (e.expression.kind === 'Identifier' && e.expression.value.name.startsWith('$puck_')) {
      initializer = e.expression.value
    } else {
      valueVariable = newValueVariable()
      hoist!(`let ${valueVariable} = ${emitExpression(e.expression)}`)
      initializer = {name: valueVariable, type_: {kind: {kind: 'Struct'}} as any}
    }

    let condition = emitPatternComparison(e.pattern, {
      kind: 'Identifier',
      value: initializer,
    })

    let then_ = {
      statements: [
        {
          kind: 'Expression',
          value: {
            kind: 'VariableDeclaration',
            value: {
              scope: e.scope,
              mutable: false,
              pattern: e.pattern,
              typeBound: undefined,
              initializer: {
                kind: 'Identifier',
                value: initializer,
              },
            },
          },
        },
        ...e.then_.statements,
      ] as BlockLevelStatement[]
    }

    valueVariable = outerValueVariable

    return emitIfExpression({
      condition,
      then_,
      else_: e.else_,
    })
  }

  function emitMatchExpression(e: MatchExpression) {
    let outerValueVariable = valueVariable
    valueVariable = newValueVariable()
    hoist!(`let ${valueVariable} = ${emitExpression(e.expression, null, getType(e.expression))}`)

    if (e.patterns.length === 0) return ''

    let ifLet: IfLetExpression|undefined
    for (let i = e.patterns.length - 1; i >= 0; i--) {
      let arm = e.patterns[i]
      ifLet = {
        pattern: arm.pattern,
        expression: {kind: 'Identifier', value: {name: valueVariable, type_: getType(e.expression)} as Identifier},
        scope: e.scope,
        then_: arm.block,
        else_: ifLet && {
          statements: [{kind: 'Expression', value: {kind: 'IfLetExpression', value: ifLet}}],
        } as BlockNode,
        type_: getType({kind: 'MatchExpression', value: e})
      }
    }

    valueVariable = outerValueVariable

    return emitIfLetExpression(ifLet!)
  }

  function emitUnaryExpression(e: UnaryExpression) {
    return withPrecedence(e.operator, () => `${tokenToJs(e.operator.kind!)}${emitExpression(e.rhs)}`)
  }

  function emitForLoop(e: ForLoop) {
    let iterator = newValueVariable()
    let continueLoop = newValueVariable()
    let element = newValueVariable()
    hoist!(`let ${iterator} = ${emitCallExpression(e.createIterCall)}`)
    hoist!(`let ${continueLoop} = true`)
    e.nextCall.func = {kind: 'MemberAccess', value: {
      object: {kind: 'Identifier', value: {name: iterator}} as Expression,
      member: (e.nextCall.func.value as MemberAccess).member,
    }}
    return emitWhileLoop({
      condition: {kind: 'JsExpression', value: continueLoop},
      body: {
        statements: [{
          kind: 'Expression',
          value: {
            kind: 'IfLetExpression',
            value: {
              pattern: {
                kind: 'TupleType',
                value: [
                  e.optionSome,
                  {properties: [e.pattern]}
                ]
              },
              expression: {kind: 'CallExpression', value: e.nextCall},
              then_: e.body,
              else_: {statements: [{
                kind: 'Expression',
                value: {kind: 'JsExpression', value: `${continueLoop} = false`}
              }]},
              scope: e.scope,
            }
          },
        } as BlockLevelStatement]
      }
    })
  }

  function emitWhileLoop(e: WhileLoop) {
    let body = () => emitBlock(e.body, null)

    return `while (${emitExpression(e.condition)}) ${body()}`
  }

  function emitIndexAccess(e: IndexAccess) {
    if (e.call) {
      return emitCallExpression(e.call)
    }
    return `${unwrap(emitExpression(e.object), e.object)}[${unwrap(emitExpression(e.index, Context.Value), e.index)}]`
  }

  function emitMemberAccess(e: MemberAccess) {
    if (e.object.kind === 'Identifier' && (e.object.value as any).globalImports &&
       ((e.object.value as any).globalImports as Array<string>).indexOf(e.member.name) !== -1) {
      return e.member.name
    }
    let object = e.object.kind == 'NumberLiteral'
      ? `(${emitExpression(e.object)})`
      : unwrap(emitExpression(e.object), e.object)
    const code = `${object}.${emitIdentifier(e.member)}`
    return code
  }

  function emitTupleIndexAccess(e: TupleIndexAccess) {
    let type_ = getType(e.object, isOverriden(e.object) && getType(e.object).kind.kind === 'Struct')
    while (type_.kind.kind === 'Intersection') {
      type_ = type_.kind.value.baseType
    }
    const boxed = (type_.kind.value.kind as Tuple).value.properties.length > 1

    let object = e.object.kind == 'NumberLiteral'
      ? `(${emitExpression(e.object)})`
      : unwrap(emitExpression(e.object), e.object)
    const code = boxed ? `${object}[${emitNumberLiteral(e.index)}]` : object
    return code
  }

  function emitTypePath(e: TypePath): string {
    if (e.kind === 'Member') {
      return emitIdentifier(e.value)
    } else {
      return `${emitIdentifier(e.value[0])}.${emitTypePath(e.value[1])}`
    }
  }

  function emitBreak(_: BreakStatement) {
    allowReturnContext = false
    return `break`
  }

  function emitReturn(e: ReturnStatement) {
    const code = emitExpression(e.expression, Context.Return, functionContext.returnType)
    allowReturnContext = false
    return code
  }

  function emitThrow(e: any) {
    allowReturnContext = false
    return `throw ${emitExpression(e.expression, Context.Value)}`
  }

  function emitBooleanLiteral(l: BooleanLiteral) {
    return `${l.value}`
  }

  function emitListLiteral(l: ListLiteral, assignedTo?: Type) {
    let elementType: Type
    if (assignedTo && assignedTo.instance) {
      elementType = assignedTo.instance.typeParameters[0]
    }
    else if (l.type_ && l.type_.instance) {
      elementType = l.type_.instance.typeParameters[0]
    }
    let members: any[] = l.members.map(e => emitExpression(e, Context.Value, elementType))
    let body

    if (members.length == 0) {
      body = ']'
    } else if (l.members.length == 1) {
      body = `${members[0]}]`
    } else {
      level++
      body = `\n${indent(members).join(`,\n`)},\n${indent(']', level - 1)}`
      level--
    }

    return `[${body}`
  }

  function emitNumberLiteral(l: NumberLiteral) {
    return `${l.value}`
  }

  function emitRangeLiteral(l: RangeLiteral) {
    return emitCallExpression(l.call)
  }

  function emitObjectLiteral(l: ObjectLiteral, assignedTo?: Type) {
    let memberTypes: Record['value']['properties']
    if (assignedTo && assignedTo.kind.value.kind && assignedTo.kind.value.kind.kind === 'Record') {
      memberTypes = (assignedTo.kind.value.kind as Record).value.properties
    }
    let members: any[] = l.members.map(member =>
      member.kind === 'Property'
        ? `${emitIdentifier(member.value.name)}: ${emitExpression(
            member.value.value,
            Context.Value,
            memberTypes && memberTypes[member.value.name.name] && memberTypes[member.value.name.name].type_
          )}`
        : `...${emitExpression(member.value, Context.Value)}`
    )
    let body

    if (members.length == 0) {
      body = '}'
    } else if (l.members.length == 1) {
      body = `${members[0]}}`
    } else {
      level++
      body = `\n${indent(members).join(`,\n`)},\n${indent('}', level - 1)}`
      level--
    }

    return `{${body}`
  }

  function emitStringLiteralPart(l: SimpleStringLiteral) {
    return JSON.stringify(l.value)
  }

  function emitStringLiteral(l: StringLiteral) {
    return l.parts
      .map(p => (p.kind === 'Literal')
        ? emitStringLiteralPart(p.value)
        : emitIdentifier(p.value)
      )
      .join(' + ')
  }

  function emitTupleLiteral(l: TupleLiteral, assignedTo?: Type) {
    let memberTypes: Type[]
    if (assignedTo && assignedTo.kind.value.kind && assignedTo.kind.value.kind.kind === 'Tuple') {
      memberTypes = (assignedTo.kind.value.kind as Tuple).value.properties
    }
    let members: any[] = l.expressions.map((e, i) => emitExpression(e, Context.Value, memberTypes && memberTypes[i]))

    if (members.length == 0) {
      return 'undefined'
    } else if (l.expressions.length == 1) {
      return members[0]
    } else {
      level++
      let body = `\n${indent(members).join(`,\n`)},\n${indent(']', level - 1)}`
      level--
      return `[${body}`
    }

  }

  return {emitModule}
}
