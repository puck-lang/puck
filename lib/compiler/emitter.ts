import {
  AssignmentExpression,
  BinaryExpression,
  BlockNode,
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
  StringLiteralPart,
  SyntaxKind,
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
  isBlock,
  isExport,
  isIdentifier,
  isMember,
  precedence,
  textToToken,
  tokenToText,
} from './ast'
import {Type} from '../entities'
import {isTypeScopeDeclaration} from '../helpers'

const jsKeywords = ['arguments', 'class', 'default', 'function', 'module', 'new', 'null', 'static', 'Object', 'typeof', 'undefined']
const tokenToJs = Object['assign'](tokenToText, {
  [SyntaxKind.AndKeyword]: '&&',
  [SyntaxKind.OrKeyword]: '||',
  [SyntaxKind.NotKeyword]: '!',
})

enum Context {
  Return = 1,
  Value = 2,
}

function isEnumPattern(pattern: Pattern): pattern is RecordPatternArm|TuplePatternArm|UnitPatternArm {
  if (pattern.kind === 'UnitType' || pattern.kind === 'TupleType' || pattern.kind === 'RecordType') {
      const typePath = pattern.value[0]
      if (typePath.kind === '_Object') {
        if (typePath.value[1].kind !== 'Member')
          throw 'Multi step type paths is not supported'

        return true
      }
  }
  return false
}

export function Emitter() {
  let level = 0
  let context: Context = null
  let allowReturnContext = true
  let hoist: (code: string) => void
  let valueVariable
  let valueVarableCount = 0
  let currentPrecedence

  function newValueVariable() {
    valueVarableCount += 1
    return `__PUCK__value__${valueVarableCount}`
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
    currentPrecedence = precedence[operator.kind]
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

  function getTypeProp(type) {
    if (type._class && type.typeParameters && type.typeParameters.some(p => p.isTypeParameter)) {
      type = type._class
    }

    if (type && type.name && type.name.kind) {
      return `'$${Type.displayName.call(type)}'`
    }

    return `'$${type.name}'`
  }

  function emitExpressions(block: Expression[], inContext = context) {
    let wasInContext = inContext
    context = null
    let expressions: any[] = []
    let outerHoist = hoist
    hoist = code => {
      expressions.push(code)
    }
    for (let i = 0; i < block.length; i++) {
      if (i == block.length - 1) {
        context = wasInContext
      }
      allowReturnContext = true
      expressions.push(emitExpressionKeepContext(block[i]))
    }
    hoist = outerHoist
    return expressions
  }

  function emitModule(module: Module, isBin: boolean) {
    let preamble = `${isBin ? '#!/usr/bin/env node\n' : ''}'use strict';\n`
    let expressions =
      module.expressions
        .filter(e => e.kind === SyntaxKind.TypeDeclaration ||
          (isExport(e) && e.expression.kind === SyntaxKind.TypeDeclaration)
        )
        .map(e =>
          isExport(e)
            ? emitExportDirective(e)
            : emitTypeDeclaration(e as TypeDeclaration)
        )
    expressions = expressions.concat(
      module.expressions
        .filter(e => e.kind === SyntaxKind.EnumDeclaration ||
          (isExport(e) && e.expression.kind === SyntaxKind.EnumDeclaration)
        )
        .map(e =>
          isExport(e)
            ? emitExportDirective(e)
            : emitEnumDeclaration(e as EnumDeclaration)
        )
    )
    expressions = expressions.concat(
      module.expressions
        .filter(e => e.kind === SyntaxKind.TraitDeclaration ||
          (isExport(e) && e.expression.kind === SyntaxKind.TraitDeclaration)
        )
        .map(e =>
          isExport(e)
            ? emitExportDirective(e)
            : emitTraitDeclaration(e as TraitDeclaration)
        )
    )
    expressions = expressions.concat(
      module.expressions
        .filter(e => e.kind === SyntaxKind.ImplDeclaration)
        .map(e => emitImplDeclaration(e as ImplDeclaration))
    )
    expressions = expressions.concat(
      module.expressions
        .filter(e => e.kind === SyntaxKind.ImplShorthandDeclaration)
        .map(e => emitImplShorthandDeclaration(e as ImplShorthandDeclaration))
    )
    expressions = expressions.concat(emitExpressions(
      module.expressions.filter(e => !(
        e.kind === SyntaxKind.EnumDeclaration ||
        e.kind === SyntaxKind.ImplDeclaration ||
        e.kind === SyntaxKind.ImplShorthandDeclaration ||
        e.kind === SyntaxKind.TraitDeclaration ||
        e.kind === SyntaxKind.TypeDeclaration ||
        (isExport(e) && (
          e.expression.kind === SyntaxKind.EnumDeclaration ||
          e.expression.kind === SyntaxKind.TraitDeclaration ||
          e.expression.kind === SyntaxKind.TypeDeclaration
        ))
      ))
    ))
    return preamble + expressions.join(';\n')
  }

  function emitBlock(block: BlockNode, inContext?) {
    level++
    let expressions = emitExpressions(block.expressions, inContext)
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

  function emitScalarExpression(expression: any) {
    switch (expression.kind) {
      case SyntaxKind.Function: return emitFunctionDeclaration(expression);
      case SyntaxKind.Identifier: return emitIdentifier(expression);
      case SyntaxKind.VariableDeclaration: return emitVariableDeclaration(expression);

      case SyntaxKind.ExportDirective: return emitExportDirective(expression);
      case SyntaxKind.ImportDirective: return emitImportDirective(expression);

      case SyntaxKind.AssignmentExpression: return emitAssignmentExpression(expression);
      case SyntaxKind.BinaryExpression: return emitBinaryExpression(expression);
      case SyntaxKind.CallExpression: return emitCallExpression(expression);
      case SyntaxKind.TypePathExpression: return emitTypePath(expression.typePath);
      case SyntaxKind.UnaryExpression: return emitUnaryExpression(expression);
      case SyntaxKind.WhileLoop: return emitWhileLoop(expression);

      case SyntaxKind.IndexAccess: return emitIndexAccess(expression);
      case SyntaxKind.MemberAccess: return emitMemberAccess(expression);
      case SyntaxKind.TypePath: return emitOldTypePath(expression);

      case SyntaxKind.BreakKeyword: return emitBreak(expression);
      case SyntaxKind.ReturnStatement: return emitReturn(expression);
      case SyntaxKind.ThrowKeyword: return emitThrow(expression);

      case SyntaxKind.BooleanLiteral: return emitBooleanLiteral(expression);
      case SyntaxKind.ListLiteral: return emitListLiteral(expression);
      case SyntaxKind.NumberLiteral: return emitNumberLiteral(expression);
      case SyntaxKind.ObjectLiteral: return emitObjectLiteral(expression);
      case SyntaxKind.StringLiteral: return emitStringLiteral(expression);
      case SyntaxKind.TupleLiteral: return emitTupleLiteral(expression);
    }
  }

  let currentValueVariableContext
  function emitExpressionKeepContext(expression: any) {
    let outerValueVariableContext = currentValueVariableContext
    if (currentValueVariableContext == valueVariable) {
      valueVariable = null
    } else {
      currentValueVariableContext = valueVariable
    }
    try {
      let scalarExpression = emitScalarExpression(expression)
      if (scalarExpression) {
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
        case SyntaxKind.IfExpression: return emitIfExpression(expression);
        case SyntaxKind.IfLetExpression: return emitIfLetExpression(expression);
        case SyntaxKind.MatchExpression: return emitMatchExpression(expression);
        default:
          console.error('expression', expression)
          throw Error(`${SyntaxKind[expression.kind]} is not supported`)
      }
    } finally {
      valueVariable = currentValueVariableContext
      currentValueVariableContext = outerValueVariableContext
    }
  }

  function emitExpression(expression, context = null) {
    return withContext(context, () => emitExpressionKeepContext(expression))
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
      if (bound.kind === SyntaxKind.ObjectTypeBound) {
        value = `(object) => ({kind: '${emitIdentifier(t.name)}', value: object})`
      }
      else if (bound.kind === SyntaxKind.TupleTypeBound) {
        value = `(...members) => ({kind: '${emitIdentifier(t.name)}', value: members})`
      }
      else {
        throw `Unsupproted type bound ${SyntaxKind[t.bound.kind]}, ${t.bound.kind}`
      }
    } else {
      value = `{kind: '${emitIdentifier(t.name)}', value: Symbol('${emitIdentifier(t.name)}')}`
    }

    return `${emitIdentifier(t.name)}: ${value},`
  }

  function emitFunctionDeclaration(fn: FunctionDeclaration) {
    fn.parameterList = fn.parameterList.map(p => {
      if (p['identifier']) {
        p.pattern = {
          kind: 'Identifier',
          value: [p['identifier']],
        }
      }
      return p
    })
    let name = fn.name.kind == 'Some' ? emitIdentifier(fn.name.value[0]) : ''
    let parameterList = fn.parameterList
    if (fn.body.kind == 'None') throw 'Function without body'
    let body = fn.body.value[0]
    const firstParameter = parameterList.length > 0 && parameterList[0]
    if (firstParameter && firstParameter.pattern.kind === 'Identifier' && firstParameter.pattern.value[0].name == 'self') {
      parameterList = fn.parameterList.slice(1)
      if (body.expressions.length > 0) {
        body = Object['assign']({}, body, {
          expressions: [Object['assign'](fn.parameterList[0], {
            initializer: {
                kind: 'Some',
                value: [{
                  kind: SyntaxKind.Identifier,
                  name: 'this',
                }] as [Identifier]
            }
          }), ...body.expressions]
        })
      }
    }
    let code = `function ${name}(${parameterList.map(emitFunctionParameter).join(', ')}) `
    code += withContext(Context.Return, () => emitBlock(body), true)

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
    let functions = Object['assign']({}, i.trait_.type_.kind.value[0].functions)
    i.members.forEach(m => functions[(m.name as any).value[0].name] = emitFunctionDeclaration(m))
    return `${emitTypePath(i.trait_.path)}[${getTypeProp(i.type_.type_)}] = {\n${
      indent(
        Object.keys(functions).map(f =>
          `${emitIdentifier({name: f})}: ${
            typeof functions[f] === 'string'
              ? functions[f]
              : `${emitTypePath(i.trait_.path)}.${emitIdentifier({name: f})}`
          }`)
      )
      .join(',\n')
    }\n}`
  }

  function emitImplShorthandDeclaration(i: ImplShorthandDeclaration) {
    return i.members
      .map(m =>
        `${emitTypePath(i.type_.path)}.${emitIdentifier((m.name as any).value[0])} = ${emitFunctionDeclaration(m)}`
      )
      .join(';\n')
  }

  function emitTraitDeclaration(t: TraitDeclaration) {
    return `var ${emitIdentifier(t.name)} = {\n${
      indent(
        t.members
          .filter(m => m.body.kind === 'Some')
          .map(m => `${emitIdentifier((m.name as any).value[0])}: ${emitFunctionDeclaration(m)}`)
      )
      .join(',\n')
    }\n}`
  }

  function emitTypeDeclaration(t: TypeDeclaration) {
    let value
    if (t.bound.kind == 'Some') {
      let bound = t.bound.value[0]
      if (bound.kind === SyntaxKind.ObjectTypeBound) {
        value = `(object) => object`
      }
      else if (bound.kind === SyntaxKind.TupleTypeBound) {
        value = '(...members) => members'
      }
      else {
        throw `Unsupproted type bound ${SyntaxKind[t.bound.kind]}, ${t.bound.kind}`
      }
    } else {
      value = `Symbol('${emitIdentifier(t.name)}')`
    }

    return `var ${emitIdentifier(t.name)} = ${value}`
  }

  function emitVariableDeclaration(vd: VariableDeclaration & {scope: any}) {
    if (vd['identifier']) {
      vd.pattern = {
        kind: 'Identifier',
        value: [vd['identifier']],
      }
    }
    let willBeRedefined = true
    let binding
    if (vd.pattern.kind === 'Identifier') {
      binding = vd.scope.getBinding(vd.pattern.value[0].name)
      willBeRedefined = binding.redefined
      if (vd['identifier']) {
        while (binding && (binding.token !== vd)) {
          binding = binding.previous
        }
      } else {
        while (binding && (binding.token !== vd.pattern)) {
          binding = binding.previous
        }
      }
    }

    let initializer = vd.initializer.kind == 'Some'
      ? ` = ${emitExpression(vd.initializer.value[0], Context.Value)}`
      : ''

    if (binding && binding.previous) {
      return `${emitPatternDestructuring(vd.pattern)}${initializer}`
    }

    if (context) {
      let valueVariable = newValueVariable()
      hoist(`let ${emitPatternDestructuring(vd.pattern)};`)

      return `${emitPatternDestructuring(vd.pattern)}${initializer}`
    }

    let kw = (vd.mutable || willBeRedefined) ? 'let' : 'const'
    return `${kw} ${emitPatternDestructuring(vd.pattern)}${initializer}`
  }

  function emitExportDirective(e: ExportDirective) {
    return `export ${
      e.expression.kind === SyntaxKind.EnumDeclaration
        ? emitEnumDeclaration(e.expression as EnumDeclaration) :
      e.expression.kind === SyntaxKind.TraitDeclaration
        ? emitTraitDeclaration(e.expression as TraitDeclaration) :
      e.expression.kind === SyntaxKind.TypeDeclaration
        ? emitTypeDeclaration(e.expression as TypeDeclaration)
      : emitExpression(e.expression)
    }`
  }

  function emitImportDirective(i: ImportDirective) {
    let specifier = isIdentifier(i.specifier)
      ? `* as ${emitIdentifier(i.specifier)}`
      : `{${i.specifier.members
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
      path = path.replace(/\.(puck|ts)$/, '.js')
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
    let isEnum = isEnumPattern(p)

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
    let left = isIdentifier(e.lhs)
      ? emitIdentifier(e.lhs)
      : (isMember(e.lhs)
          ? emitMemberAccess(e.lhs)
          : emitIndexAccess(e.lhs))
    return `${left} ${tokenToJs[e.token.kind]} ${emitExpression(e.rhs, Context.Value)}`
  }

  function emitBinaryExpression(e: BinaryExpression) {
    return withPrecedence(e.operator, () =>
      `${emitExpression(e.lhs)} ${tokenToJs[e.operator.kind]} ${emitExpression(e.rhs)}`
    )
  }

  function emitCallExpression(fn_: CallExpression) {
    let fn = fn_ as CallExpression & {traitName: string, implementationType: any, isShorthand: boolean}
    let functionName

    if (fn.traitName) {
      functionName = `${fn.traitName}${
        fn.isShorthand
          ? ``
          : `[${getTypeProp(fn.implementationType)}]`
      }.${emitIdentifier((fn.func as MemberAccess).member)}.call`
      fn.argumentList.unshift((fn.func as MemberAccess).object)
    }
    else {
      functionName = emitExpression(fn.func)
    }

    return `${functionName}(${fn.argumentList.map(
      arg => emitExpression(arg, Context.Value)
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
    let isEnum = isEnumPattern(pattern)
    let condition: Array<Expression> = []

    if (isEnum) {
      const typePath = pattern.value[0] as TypePathObjectArm

      condition.push({
        kind: SyntaxKind.BinaryExpression,
        lhs: {
          kind: SyntaxKind.MemberAccess,
          object: expression,
          member: {
            kind: SyntaxKind.Identifier,
            name: 'kind',
          },
        } as MemberAccess,
        operator: {kind: SyntaxKind.EqualsEqualsToken},
        rhs: {
          kind: SyntaxKind.StringLiteral,
          parts: [{
            kind: SyntaxKind.StringLiteralPart,
            value: emitIdentifier(typePath.value[1].value[0]),
          }],
        } as StringLiteral,
      } as BinaryExpression)

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
            kind: SyntaxKind.MemberAccess,
            object: expression,
            member: {
              kind: SyntaxKind.Identifier,
              name: 'value',
            },
          } as MemberAccess)
        )
      }
    } else {
      if (pattern.kind === 'Record') {
        condition = pattern.value[0].properties
          .map(p => emitPatternComparison(p.pattern, {
            kind: SyntaxKind.MemberAccess,
            object: expression,
            member: p.property,
          } as MemberAccess))
      }
      else if (pattern.kind === 'Tuple') {
        condition = pattern.value[0].properties
          .map((p, i) => emitPatternComparison(p, {
            kind: SyntaxKind.IndexAccess,
            object: expression,
            index: {
              kind: SyntaxKind.NumberLiteral,
              value: i,
            } as NumberLiteral,
          } as IndexAccess))
      }
    }

    condition = condition.filter(e => e.kind !== SyntaxKind.BooleanLiteral)

    if (condition.length === 0) return {kind: SyntaxKind.BooleanLiteral, value: true} as BooleanLiteral

    return condition.reduce((acc, curr) => ({
      kind: SyntaxKind.BinaryExpression,
      lhs: acc,
      operator: {kind: SyntaxKind.AndKeyword},
      rhs: curr,
    } as BinaryExpression))
  }

  function emitIfLetExpression(e: IfLetExpression) {
    let outerValueVariable = valueVariable
    valueVariable = newValueVariable()
    hoist(`let ${valueVariable} = ${emitExpression((e.variableDeclaration.initializer as any).value[0])}`)

    let condition = emitPatternComparison(e.variableDeclaration.pattern, {
      kind: SyntaxKind.Identifier,
      name: valueVariable,
    } as Identifier)

    let then_ = {
      kind: e.then_.kind,
      expressions: [
        {
          scope: (e as any).variableDeclaration.scope,
          kind: SyntaxKind.VariableDeclaration,
          mutable: false,
          pattern: e.variableDeclaration.pattern,
          typeBound: {kind: 'None'},
          initializer: {
            kind: 'Some',
            value: [{
              kind: SyntaxKind.Identifier,
              name: valueVariable,
            } as Identifier],
          },
        } as VariableDeclaration,
        ...e.then_.expressions,
      ]
    }

    valueVariable = outerValueVariable

    return emitIfExpression({
      kind: SyntaxKind.IfExpression,
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
        kind: SyntaxKind.IfLetExpression,
        variableDeclaration: {
          kind: SyntaxKind.VariableDeclaration,
          mutable: false,
          typeBound: null,
          pattern: arm.pattern,
          initializer: {kind: 'Some', value: [
            {kind: SyntaxKind.Identifier, name: valueVariable} as Identifier
          ]},
        },
        then_: arm.block,
        else_: ifLet
          ? {kind: 'Some', value: [{
              kind: SyntaxKind.Block,
              expressions: [ifLet]
            }]}
          : {kind: 'None'}
      }
    }

    valueVariable = outerValueVariable

    return emitIfLetExpression(ifLet)
  }

  function emitUnaryExpression(e: BinaryExpression) {
    return withPrecedence(e.operator, () => `${tokenToJs[e.operator.kind]}${emitExpression(e.rhs)}`)
  }

  function emitWhileLoop(e: WhileLoop) {
    let body = () => emitBlock(e.body, null)

    return `while (${emitExpression(e.condition)}) ${body()}`
  }

  function emitIndexAccess(e: IndexAccess) {
    return `${emitExpression(e.object)}[${emitExpression(e.index, Context.Value)}]`
  }

  function emitMemberAccess(e: MemberAccess) {
    let object = e.object.kind == SyntaxKind.NumberLiteral
      ? `(${emitExpression(e.object)})`
      : emitExpression(e.object)
    return `${object}.${emitExpression(e.member, Context.Value)}`
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
    // context = Context.Return
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

  function emitListLiteral(l: ListLiteral) {
    let members: any[] = l.members.map(e => emitExpression(e, Context.Value))
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

  function emitObjectLiteral(l: ObjectLiteral) {
    let members: any[] = l.members.map(member => `${emitIdentifier(member.name)}: ${
      emitExpression(member.value, Context.Value)}`)
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

  function emitStringLiteralPart(l: StringLiteralPart) {
    return JSON.stringify(l.value)
  }

  function emitStringLiteral(l: StringLiteral) {
    if ((l as any).value !== undefined) return emitStringLiteralPart(l as any)
    return l.parts
      .map(p => p.kind === SyntaxKind.StringLiteralPart
        ? emitStringLiteralPart(p as StringLiteralPart)
        : emitIdentifier(p as Identifier)
      )
      .join(' + ')
  }

  function emitTupleLiteral(l: TupleLiteral) {
    let members: any[] = l.expressions.map(e => emitExpression(e, Context.Value))
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
