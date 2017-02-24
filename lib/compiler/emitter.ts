import {
  AssignmentExpression,
  BinaryExpression,
  BlockNode,
  BlockLevelStatement,
  BooleanLiteral,
  CallExpression,
  CommentNode,
  EnumDeclaration,
  ExportDirective,
  Expression,
  ForExpression,
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
  RecordPatternArm,
  ReturnStatement,
  SimpleIdentifier,
  StringLiteral,
  SimpleStringLiteral,
  Token,
  TraitDeclaration,
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
import {getImplementationForTrait} from '../typeck/src/impls'
import {Scope} from '../typeck/src/scope'

const jsKeywords = [
  'arguments', 'case', 'class', 'default', 'delete', 'function', 'module', 'new', 'null',
  'static', 'Object', 'typeof', 'undefined',
]
const tokenToJs = kind => {
  if (kind.kind == 'AndKeyword') return '&&'
  if (kind.kind == 'OrKeyword')  return '||'
  if (kind.kind == 'NotKeyword') return '!'
  return SyntaxKind.name.call(kind)
}

enum Context {
  Return = 1,
  Value = 2,
}

function getEnumMember(pattern: Pattern): string {
  if (pattern.kind === 'UnitType' || pattern.kind === 'TupleType' || pattern.kind === 'RecordType') {
    const typePath = pattern.value[0] as any
    if (typePath.type_.enumMember.kind == 'Some') {
      return typePath.type_.enumMember.value[0][0]
    }
  }
  return null
}

export function Emitter() {
  let level = 0
  let context: Context = null
  let allowReturnContext = true
  let hoist: (code: string) => void
  let valueVariable
  let valueVarableCount = 0
  let currentPrecedence
  let typeOverrides = {}
  let includeTraitObjectHelper = false

  function newValueVariable() {
    valueVarableCount += 1
    return `__PUCK__value__${valueVarableCount}`
  }

  function getType(e: Expression) {
    if (e.kind === 'Identifier' &&
        typeOverrides[(e.value[0] as Identifier).name] &&
        typeOverrides[(e.value[0] as Identifier).name].old === e.value[0].type_) {
      return typeOverrides[(e.value[0] as Identifier).name].new
    }
    return e.value[0].type_
  }

  function unwrap(code, e: Expression) {
    let type = getType(e)
    if (type && type.kind.kind === 'Trait') {
      return `${code}.value`
    }
    else if (!type || type.kind.kind === 'Parameter') {
      includeTraitObjectHelper = true
      return `$unwrapTraitObject(${code})`
    }
    return code
  }

  function withContext<T>(newContext: Context, fn: () => T, forceSet = false): T {
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

  function withPrecedence(operator: Token, emitter: () => string) {
    const parentPrecedence = currentPrecedence
    currentPrecedence = SyntaxKind.precedence.call(operator.kind)
    if (parentPrecedence > currentPrecedence)
      return `(${emitter()})`
    else return emitter()
  }

  function indent(lines: string, level?): string
  function indent(lines: string[], level?): string[]
  function indent(lines, level_ = level) {
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

  function getTypeClass(type) {
    if (type._class && type.typeParameters && type.typeParameters.some(p => p.isTypeParameter)) {
      return type._class
    }
    else return type
  }

  function getImplId(type, trait) {
    let opt = getImplementationForTrait(type, trait).value[0]
    if (opt.kind == 'None') {
      throw Error('No impl')
    }
    return opt.value[0].id
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
        expressions.push(emitExportDirective(block[i].value[0]))
      } else {
        expressions.push(emitBlockLevelStatement(block[i].value[0], null))
      }
    }
    hoist = null
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

  function isExported(e, kind: string = ''): e is {value: [ExportDirective]} {
    return e.kind === 'ExportDirective' &&
      (kind === '' || e.value[0].statement.kind === kind)
  }

  function emitModule(module: Module, isBin: boolean) {
    let preamble = `${isBin ? '#!/usr/bin/env node\n' : ''}'use strict';\n`
    let statements =
      module.statements
        .filter(e => e.kind === 'ImportDirective')
        .map(e => emitImportDirective(e.value[0] as ImportDirective))
    statements = statements.concat(
      module.statements
        .filter(e => e.kind === 'TypeDeclaration' || isExported(e, 'TypeDeclaration'))
        .map(e =>
          isExported(e, 'TypeDeclaration')
            ? emitExportDirective(e.value[0])
            : emitTypeDeclaration(e.value[0] as TypeDeclaration)
        )
    )
    statements = statements.concat(
      module.statements
        .filter(e => e.kind === 'EnumDeclaration' || isExported(e, 'EnumDeclaration'))
        .map(e =>
          isExported(e, 'EnumDeclaration')
            ? emitExportDirective(e.value[0])
            : emitEnumDeclaration(e.value[0] as EnumDeclaration)
        )
    )
    statements = statements.concat(
      module.statements
        .filter(e => e.kind === 'TraitDeclaration' || isExported(e, 'TraitDeclaration'))
        .map(e =>
          isExported(e, 'TraitDeclaration')
            ? emitExportDirective(e.value[0])
            : emitTraitDeclaration(e.value[0] as TraitDeclaration)
        )
    )
    statements = statements.concat(
      module.statements
        .filter(e => e.kind === 'ImplDeclaration')
        .map(e => emitImplDeclaration(e.value[0] as ImplDeclaration))
    )
    statements = statements.concat(
      module.statements
        .filter(e => e.kind === 'ImplShorthandDeclaration')
        .map(e => emitImplShorthandDeclaration(e.value[0] as ImplShorthandDeclaration))
    )
    statements = statements.concat(emitTopLevelStatements(
      module.statements
        .filter(e =>
          e.kind === 'BlockLevelStatement' ||
          isExported(e, 'FunctionDeclaration') ||
          isExported(e, 'VariableDeclaration')
        )
    ))
    if (includeTraitObjectHelper) {
      preamble += '\nconst $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);\n'
    }
    return preamble + statements.join(';\n')
  }

  function emitBlock(block: BlockNode, inContext?, assignedTo_?: Type) {
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

  function emitBlockLevelStatement(expression: BlockLevelStatement, assignedTo: Type) {
    switch (expression.kind) {
      case 'WhileLoop': return emitWhileLoop(expression.value[0]);

      case 'BreakStatement': return emitBreak(expression.value[0]);
      case 'ReturnStatement': return emitReturn(expression.value[0]);

      case 'Expression': return emitExpressionKeepContext(expression.value[0], assignedTo);
    }
  }

  function emitScalarExpression(expression: Expression, assignedTo: Type) {
    switch (expression.kind) {
      case 'ThrowStatement': return emitThrow(expression.value[0]);
      case 'FunctionDeclaration': return emitFunctionDeclaration(expression.value[0])
      case 'Identifier': return emitIdentifier(expression.value[0])
      case 'VariableDeclaration': return emitVariableDeclaration(expression.value[0])

      case 'AssignmentExpression': return emitAssignmentExpression(expression.value[0])
      case 'BinaryExpression': return emitBinaryExpression(expression.value[0])
      case 'CallExpression': return emitCallExpression(expression.value[0])
      case 'TypePathExpression': return emitTypePath(expression.value[0].typePath)
      case 'UnaryExpression': return emitUnaryExpression(expression.value[0])

      case 'IndexAccess': return emitIndexAccess(expression.value[0])
      case 'MemberAccess': return emitMemberAccess(expression.value[0])
      case 'UnknownAccess': return emitMemberAccess(expression.value[0])
      case 'UnknownIndexAccess': return emitIndexAccess(expression.value[0])

      case 'BooleanLiteral': return emitBooleanLiteral(expression.value[0])
      case 'ListLiteral': return emitListLiteral(expression.value[0], assignedTo)
      case 'NumberLiteral': return emitNumberLiteral(expression.value[0])
      case 'RecordLiteral': return emitObjectLiteral(expression.value[0], assignedTo)
      case 'StringLiteral': return emitStringLiteral(expression.value[0])
      case 'TupleLiteral': return emitTupleLiteral(expression.value[0], assignedTo)
    }
  }

  let currentValueVariableContext
  function emitExpressionKeepContext(expression: Expression, assignedTo: Type = null) {
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
          if (assignedTo.kind.kind === 'Trait' && getType(expression).kind.kind !== 'Trait') {
            scalarExpression = `{type: '${getImplId(expressionType, assignedTo)}', value: ${scalarExpression}, $isTraitObject: true}`
          }
          else if (assignedTo.kind.kind !== 'Trait') {
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
        case 'IfExpression': return emitIfExpression(expression.value[0])
        case 'IfLetExpression': return emitIfLetExpression(expression.value[0])
        case 'MatchExpression': return emitMatchExpression(expression.value[0])
        default:
          throw Error(`${expression.kind} is not supported`)
      }
    } finally {
      valueVariable = currentValueVariableContext
      currentValueVariableContext = outerValueVariableContext
    }
  }

  function emitExpression(expression, context = null, assignedTo_: Type = null) {
    return withContext(context, () => emitExpressionKeepContext(expression, assignedTo_), false)
  }

  function emitEnumDeclaration(e: EnumDeclaration) {
    return `var ${emitIdentifier(e.name)} = {\n${
      indent(e.members.map(emitEnumMember).join('\n'))
    }\n}`
  }

  function emitEnumMember(t: TypeDeclaration) {
    let value
    if (t.bound.kind == 'Some') {
      let bound = t.bound.value[0]
      if (bound.kind === 'RecordTypeBound') {
        value = `(object) => ({kind: '${emitIdentifier(t.name)}', value: object})`
      }
      else if (bound.kind === 'TupleTypeBound') {
        value = `(...members) => ({kind: '${emitIdentifier(t.name)}', value: members})`
      }
      else {
        throw `Unsupported type bound`
      }
    } else {
      value = `{kind: '${emitIdentifier(t.name)}', value: Symbol('${emitIdentifier(t.name)}')}`
    }

    return `${emitIdentifier(t.name)}: ${value},`
  }

  function emitFunctionDeclaration(fn: FunctionDeclaration, emitName = true) {
    let name = (emitName && fn.name.kind == 'Some') ? emitIdentifier(fn.name.value[0]) : ''
    let parameterList = fn.parameterList

    if (fn.body.kind == 'None') throw 'Function without body'
    let body = fn.body.value[0]
    const firstParameter = parameterList.length > 0 && parameterList[0]
    if (firstParameter && firstParameter.pattern.kind === 'Identifier' && firstParameter.pattern.value[0].name == 'self') {
      parameterList = fn.parameterList.slice(1)
      if (body.statements.length > 0) {
        body = {
          ...body,
          statements: [
            {
              kind: 'Expression',
              value: [{
                kind: 'VariableDeclaration',
                value: [{
                  ...fn.parameterList[0],
                  initializer: {
                    kind: 'Some',
                    value: [{
                      kind: 'Identifier',
                      value: [{
                        name: 'this',
                      }]
                    }]
                  }
                } as VariableDeclaration],
              }],
            },
            ...body.statements,
          ]
        }
      }
    }

    let oldTypeOverrides = typeOverrides
    typeOverrides = {...typeOverrides}

    if (fn.traitFunctionType) {
      const {selfBinding} = fn.traitFunctionType.kind.value[0]
      if (selfBinding.kind === 'Some') {
        typeOverrides['self'] = {
          old: firstParameter.type_,
          new: selfBinding.value[0].type_,
        }
      }

      parameterList.forEach((p, i) => {
        if (p.pattern.kind === 'Identifier') {
          typeOverrides[p.pattern.value[0].name] = {
            old: p.type_,
            new: fn.traitFunctionType.kind.value[0].parameters[i].type_,
          }
        }
      })
    }

    let returnType =
      fn.traitFunctionType
        ? fn.traitFunctionType.kind.value[0].returnType
        : fn.returnType.kind === 'Some' && fn.returnType.value[0].value[0].type_
    let code = `function ${name}(${parameterList.map(emitFunctionParameter).join(', ')}) `
    if (returnType && Type.isEmpty && Type.isEmpty.call(returnType)) {
      code += emitBlock(body, undefined, returnType)
    }
    else {
      code += withContext(Context.Return, () => emitBlock(body, undefined, returnType), true)
    }

    typeOverrides = oldTypeOverrides

    return code
  }

  function emitFunctionParameter(vd: VariableDeclaration) {
    let initializer = vd.initializer.kind == 'Some'
      ? ` = ${emitExpression(vd.initializer.value[0], Context.Value)}`
      : ''
    return `${emitPatternDestructuring(vd.pattern)}${initializer}`
  }

  function emitIdentifier(identifier: {name: string}) {
    if (jsKeywords.indexOf(identifier.name) != -1) {
      return `_${identifier.name}`
    }
    return identifier.name
  }

  function emitImplDeclaration(i: ImplDeclaration) {
    let functions: any = Object['assign']({}, i.trait_.value[0].type_.kind.value[0].functions)
    i.members.forEach(m => functions[(m.name as any).value[0].name] = emitFunctionDeclaration(m, false))
    return `${emitTypePath(i.trait_.value[0].path)}${implProp(i.implementation)} = {\n${
      indent(
        Object.keys(functions).map(f =>
          `${emitIdentifier({name: f})}: ${
            typeof functions[f] === 'string'
              ? functions[f]
              : `${emitTypePath(i.trait_.value[0].path)}.${emitIdentifier({name: f})}`
          }`)
      )
      .join(',\n')
    }\n}`
  }

  function emitImplShorthandDeclaration(i: ImplShorthandDeclaration) {
    return i.members
      .map(m =>
        `${emitTypePath(i.type_.value[0].path)}.${emitIdentifier((m.name as any).value[0])} = ${emitFunctionDeclaration(m, false)}`
      )
      .join(';\n')
  }

  function emitTraitDeclaration(t: TraitDeclaration) {
    return `var ${emitIdentifier(t.name)} = {\n${
      indent(
        t.members
          .filter(m => m.body.kind === 'Some')
          .map(m => `${emitIdentifier((m.name as any).value[0])}: ${emitFunctionDeclaration(m, false)}`)
      )
      .join(',\n')
    }\n}`
  }

  function emitTypeDeclaration(t: TypeDeclaration) {
    let value
    if (t.bound.kind == 'Some') {
      let bound = t.bound.value[0]
      if (bound.kind === 'RecordTypeBound') {
        value = `(object) => object`
      }
      else if (bound.kind === 'TupleTypeBound') {
        value = '(...members) => members'
      }
      else {
        throw `Unsupported type bound`
      }
    } else {
      value = `Symbol('${emitIdentifier(t.name)}')`
    }

    return `var ${emitIdentifier(t.name)} = ${value}`
  }

  function emitVariableDeclaration(vd: VariableDeclaration) {
    let willBeRedefined = true
    let binding
    if (vd.pattern.kind === 'Identifier') {
      binding = Scope.getBinding.call(vd.scope, vd.pattern.value[0].name).value[0]
      willBeRedefined = binding.redefined || (binding.previous && binding.previous.value[0])
      while (binding && ((binding.token.$isTraitObject ? binding.token.value : binding.token) !== vd.pattern)) {
        binding = binding.previous.value[0]
      }
    }

    let initializer = ``

    if (vd.initializer.kind == 'Some') {
      initializer = emitExpression(vd.initializer.value[0], Context.Value, vd.type_)
      let type = getType(vd.initializer.value[0])

      if (vd.pattern.kind !== 'Identifier' && vd.pattern.kind !== 'CatchAll') {
        initializer = unwrap(initializer, vd.initializer.value[0])
      }
      initializer = ` = ${initializer}`
    }

    if (binding && binding.previous && binding.previous.value[0]) {
      return `${emitPatternDestructuring(vd.pattern)}${initializer}`
    }

    if (context) {
      let valueVariable = newValueVariable()
      hoist(`let ${valueVariable}${initializer};`)
      hoist(`let ${emitPatternDestructuring(vd.pattern)} = ${valueVariable};`)

      return valueVariable
    }

    let kw = (vd.mutable || willBeRedefined) ? 'let' : 'const'
    return `${kw} ${emitPatternDestructuring(vd.pattern)}${initializer}`
  }

  function emitExportDirective(e: ExportDirective) {
    return `export ${
      e.statement.kind === 'EnumDeclaration'
        ? emitEnumDeclaration(e.statement.value[0] as EnumDeclaration) :
      e.statement.kind === 'TraitDeclaration'
        ? emitTraitDeclaration(e.statement.value[0] as TraitDeclaration) :
      e.statement.kind === 'TypeDeclaration'
        ? emitTypeDeclaration(e.statement.value[0] as TypeDeclaration) :
      e.statement.kind === 'FunctionDeclaration'
        ? emitFunctionDeclaration(e.statement.value[0] as FunctionDeclaration) :
      e.statement.kind === 'VariableDeclaration'
        ? emitVariableDeclaration(e.statement.value[0] as VariableDeclaration)
      : (() => {throw 'Unknown Exported statement'})()
    }`
  }

  function emitImportDirective(i: ImportDirective) {
    let specifier = i.specifier.kind === 'Identifier'
      ? `* as ${emitIdentifier(i.specifier.value[0])}`
      : `{${i.specifier.value[0].members
          .map(({property, local}) => property.name === local.name
            ? emitIdentifier(property)
            : `${emitIdentifier(property)} as ${emitIdentifier(local)}`
          )
          .join(', ')
        }}`

    let path
    if (i.domain.kind == 'None') {
      if (i.path.charAt(0) == '/') {
        path = i.path
      } else {
        path = `./${i.path}`
      }
      path = path.replace(/\.(puck|ts)$/, '')
    } else if (i.domain.value[0] == 'node') {
      path = i.path
    } else if (i.domain.value[0] == 'puck') {
      path = `puck-lang/dist/lib/stdlib/${i.path}`
    } else {
      throw `Unsupported import-domain "${i.domain}"`
    }

    return `import ${specifier} from '${path}'`
  }

  function emitPatternDestructuring(p: Pattern) {
    let isEnum = !!getEnumMember(p)

    if (p.kind === 'CatchAll') {
      return newValueVariable()
    }
    if (p.kind === 'Identifier') {
      return emitIdentifier(p.value[0])
    }
    else if (p.kind === 'Record') {
      return `{${p.value[0].properties.map(({property, pattern}) =>
        `${emitIdentifier(property)}: ${emitPatternDestructuring(pattern)}`
      ).join(', ')}}`
    }
    else if (p.kind === 'RecordType') {
      let destructure = `{${p.value[1].properties.map(({property, pattern}) =>
        `${emitIdentifier(property)}: ${emitPatternDestructuring(pattern)}`
      ).join(', ')}}`
      if (isEnum) {
        destructure = `{value: ${destructure}}`
      }
      return destructure
    }
    else if (p.kind === 'Tuple') {
      return `[${p.value[0].properties.map(emitPatternDestructuring).join(', ')}]`
    }
    else if (p.kind === 'TupleType') {
      let destructure = `[${p.value[1].properties.map(emitPatternDestructuring).join(', ')}]`
      if (isEnum) {
        destructure = `{value: ${destructure}}`
      }
      return destructure
    }
  }

  function emitAssignmentExpression(e: AssignmentExpression) {
    let left = emitScalarExpression(e.lhs, null)
    return `${left} ${tokenToJs(e.token.kind)} ${emitExpression(e.rhs, Context.Value, getType(e.lhs))}`
  }

  function emitBinaryExpression(e: BinaryExpression) {
    let call = e.call
    if (call) {
      let lhsType = ExpressionImpl.getType.call(e.lhs)
      let rhsType = ExpressionImpl.getType.call(e.rhs)

      if (!rhsType || (lhsType.id.value[0] === 'Num' && rhsType.id.value[0] === 'Num')) {
        call = false
      }
    }
    if (call) {
      return emitCallExpression(e.call)
    }
    return withPrecedence(e.operator, () =>
      `${emitExpression(e.lhs)} ${tokenToJs(e.operator.kind)} ${emitExpression(e.rhs)}`
    )
  }

  function emitCallExpression(fn_: CallExpression) {
    let fn = fn_ as CallExpression & {traitName: string, isShorthand: boolean, isTraitObject: boolean, isDirectTraitCall: boolean}
    let functionName
    let functionType = getType(fn.func)
    let parameterBindings = functionType && functionType.kind.value[0].parameters

    if (fn.traitName) {
      parameterBindings = fn.functionType.kind.value[0].parameters
      let selfBinding = fn.functionType.kind.value[0].selfBinding
      if (selfBinding.kind === 'Some') {
        parameterBindings = [selfBinding.value[0], ...parameterBindings]
      }
      let outerValueVariable = valueVariable
      if (fn.isTraitObject) {
        if ((fn.func.value[0] as MemberAccess).object.kind === 'Identifier') {
          valueVariable = ((fn.func.value[0] as MemberAccess).object.value[0] as Identifier).name
        } else {
          valueVariable = newValueVariable()
          hoist(`let ${valueVariable} = ${emitExpression((fn.func.value[0] as MemberAccess).object)}\n`)
        }
      }
      functionName = `${fn.traitName}${
        (fn.isShorthand || (selfBinding.kind === 'None' && !fn.isDirectTraitCall)) ? `` :
        fn.isTraitObject ? `[${emitIdentifier({name: valueVariable})}.type]`
        : `${implProp(fn.implementation)}`
      }.${emitIdentifier((fn.func.value[0] as MemberAccess).member)}`
      if (selfBinding.kind === 'Some') {
        if (fn.isTraitObject) {
          fn.argumentList.unshift({
            kind: 'Identifier',
            value: [{
              name: valueVariable,
              type_: (fn.func.value[0] as MemberAccess).object.value[0].type_,
            }],
          })
        }
        else {
          fn.argumentList.unshift((fn.func.value[0] as MemberAccess).object)
        }
        functionName += '.call'
      }
      else if (fn.isDirectTraitCall) {
        functionName += '.call'
      }
      if (functionName == 'Unknown.transmute.call') {
        return emitExpression((fn.func.value[0] as MemberAccess).object)
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
    let el = e.else_.kind == 'Some'
      ? (`\n${indent('else')} ${emitBlock(e.else_.value[0])}`)
      : ''

    let code = `if (${condition}) ${then}${el}`

    if (produceValue) {
      hoist(`let ${valueVariable};\n${indent(code)}`)
      let thisValueVariable = valueVariable
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
      condition.push({
        kind: 'BinaryExpression',
        value: [{
          lhs: {
            kind: 'MemberAccess',
            value: [{
              object: expression,
              member: {
                name: 'kind',
              },
            }]
          },
          operator: {kind: SyntaxKind.EqualsEqualsToken},
          rhs: {
            kind: 'StringLiteral',
            value: [{
              parts: [{
                kind: 'Literal',
                value: [{value: emitIdentifier({name: enumMember})}],
              }],
            }]
          },
        } as BinaryExpression]
      })

      let innerPattern: Pattern
      if (pattern.kind === 'TupleType') {
        innerPattern = {
          kind: 'Tuple',
          value: [pattern.value[1]],
        }
      }
      else if (pattern.kind === 'RecordType') {
        innerPattern = {
          kind: 'Record',
          value: [pattern.value[1]],
        }
      }

      if (innerPattern) {
        condition.push(
          emitPatternComparison(innerPattern, {
            kind: 'MemberAccess',
            value: [{
              object: expression,
              member: {
                name: 'value',
              },
            }]
          })
        )
      }
    } else {
      if (pattern.kind === 'Record') {
        condition = pattern.value[0].properties
          .map(p => emitPatternComparison(p.pattern, {
            kind: 'MemberAccess',
            value: [{
              object: expression,
              member: p.property,
            }]
          }))
      }
      else if (pattern.kind === 'Tuple') {
        condition = pattern.value[0].properties
          .map((p, i) => emitPatternComparison(p, {
            kind: 'IndexAccess',
            value: [{
              object: expression,
              index: {
                kind: 'NumberLiteral',
                value: [{value: i, type_: {kind: {kind: 'Struct'}}}],
              },
            } as IndexAccess]
          }))
      }
    }

    condition = condition.filter(e => e.kind !== 'BooleanLiteral')

    if (condition.length === 0) return {kind: 'BooleanLiteral', value: [{value: true}]}

    return condition.reduce((acc, curr) => ({
      kind: 'BinaryExpression',
      value: [{
        lhs: acc,
        operator: {kind: SyntaxKind.AndKeyword},
        rhs: curr,
      }]
    }))
  }

  function emitIfLetExpression(e: IfLetExpression) {
    let outerValueVariable = valueVariable
    let initializer: Identifier
    if (e.expression.kind === 'Identifier' && e.expression.value[0].name.startsWith('__PUCK__value__')) {
      initializer = e.expression.value[0]
    } else {
      valueVariable = newValueVariable()
      hoist(`let ${valueVariable} = ${emitExpression(e.expression)}`)
      initializer = {name: valueVariable, type_: {kind: {kind: 'Struct'}} as any}
    }

    let condition = emitPatternComparison(e.pattern, {
      kind: 'Identifier',
      value: [initializer],
    })

    let then_ = {
      statements: [
        {
          kind: 'Expression',
          value: [{
            kind: 'VariableDeclaration',
            value: [{
              scope: e.scope,
              mutable: false,
              pattern: e.pattern,
              typeBound: {kind: 'None'},
              initializer: {
                kind: 'Some',
                value: [{
                  kind: 'Identifier',
                  value: [initializer],
                }],
              },
            }]
          }],
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
    hoist(`let ${valueVariable} = ${emitExpression(e.expression)}`)

    if (e.patterns.length === 0) return ''

    let ifLet: IfLetExpression
    for (let i = e.patterns.length - 1; i >= 0; i--) {
      let arm = e.patterns[i]
      ifLet = {
        pattern: arm.pattern,
        expression: {kind: 'Identifier', value: [{name: valueVariable} as Identifier]},
        scope: e.scope,
        then_: arm.block,
        else_: ifLet
          ? {kind: 'Some', value: [{
              statements: [{kind: 'Expression', value: [{kind: 'IfLetExpression', value: [ifLet]}]}],
            }]} as Option<BlockNode>
          : {kind: 'None'} as Option<BlockNode>,
      }
    }

    valueVariable = outerValueVariable

    return emitIfLetExpression(ifLet)
  }

  function emitUnaryExpression(e: UnaryExpression) {
    return withPrecedence(e.operator, () => `${tokenToJs(e.operator.kind)}${emitExpression(e.rhs)}`)
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
    let object = e.object.kind == 'NumberLiteral'
      ? `(${emitExpression(e.object)})`
      : unwrap(emitExpression(e.object), e.object)
    const code = `${object}.${emitIdentifier(e.member)}`
    return code
  }

  function emitTypePath(e: TypePath) {
    if (e.kind === 'Member') {
      return emitIdentifier(e.value[0])
    } else {
      return `${emitIdentifier(e.value[0])}.${emitTypePath(e.value[1])}`
    }
  }

  function emitOldTypePath(e: MemberAccess) {
    let object = emitExpression(e.object)
    return `${object}.${emitExpression(e.member, Context.Value)}`
  }

  function emitBreak(_) {
    allowReturnContext = false
    return `break`
  }

  function emitReturn(e: ReturnStatement) {
    const code = emitExpression(e.expression, Context.Return)
    allowReturnContext = false
    return code
  }

  function emitThrow(e) {
    allowReturnContext = false
    return `throw ${emitExpression(e.expression, Context.Value)}`
  }

  function emitBooleanLiteral(l: BooleanLiteral) {
    return `${l.value}`
  }

  function emitListLiteral(l: ListLiteral, assignedTo: Type) {
    let elementType: Type
    if (assignedTo && assignedTo.instance.kind === 'Some') {
      elementType = assignedTo.instance.value[0].typeParameters[0]
    }
    else if (l.type_ && l.type_.instance.kind === 'Some') {
      elementType = l.type_.instance.value[0].typeParameters[0]
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

  function emitObjectLiteral(l: ObjectLiteral, assignedTo: Type) {
    let memberTypes: {[name: string]: Type}
    if (assignedTo && assignedTo.kind.value[0].kind && assignedTo.kind.value[0].kind.kind === 'Record') {
      memberTypes = (assignedTo.kind.value[0].kind as Record).value[0].properties
    }
    let members: any[] = l.members.map(member => `${emitIdentifier(member.name)}: ${
      emitExpression(member.value, Context.Value, memberTypes && memberTypes[member.name.name])}`)
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
        ? emitStringLiteralPart(p.value[0])
        : emitIdentifier(p.value[0] as Identifier)
      )
      .join(' + ')
  }

  function emitTupleLiteral(l: TupleLiteral, assignedTo: Type) {
    let memberTypes: Type[]
    if (assignedTo && assignedTo.kind.value[0].kind && assignedTo.kind.value[0].kind.kind === 'Tuple') {
      memberTypes = (assignedTo.kind.value[0].kind as Tuple).value[0].properties
    }
    let members: any[] = l.expressions.map((e, i) => emitExpression(e, Context.Value, memberTypes && memberTypes[i]))
    let body

    if (members.length == 0) {
      body = ']'
    } else if (l.expressions.length == 1) {
      body = `${members[0]}]`
    } else {
      level++
      body = `\n${indent(members).join(`,\n`)},\n${indent(']', level - 1)}`
      level--
    }

    return `[${body}`
  }

  return {emitModule}
}
