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
  ImplDeclaration,
  ImportDirective,
  IndexAccess,
  isBlock,
  isExport,
  isIdentifier,
  isMember,
  ListLiteral,
  LoopExpression,
  MemberAccess,
  Module,
  NumberLiteral,
  ObjectLiteral,
  Pattern,
  precedence,
  ReturnStatement,
  SimpleIdentifier,
  StringLiteral,
  StringLiteralPart,
  SyntaxKind,
  textToToken,
  Token,
  tokenToText,
  TraitDeclaration,
  TupleLiteral,
  TypeBound,
  TypeDeclaration,
  UnaryExpression,
  VariableDeclaration,
  WhileExpression
} from './ast';
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

  function withContext<T>(newContext: Context, fn: () => T): T {
    let wasInContext = context
    context = newContext
    let value = fn()
    context = wasInContext
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
    if (type._class && type.typeParameters.some(p => p.isTypeParameter)) {
      type = type._class
    }

    return `'$${type.name}'`
  }

  function emitExpressions(block: Expression[]) {
    let wasInContext = context
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
      expressions.push(emitExpressionKeepContext(block[i]))
    }
    hoist = outerHoist
    return expressions
  }

  function emitModule(module: Module) {
    let preamble = `#!/usr/bin/env node\n'use strict';\n`
    let expressions =
      module.expressions
        .filter(e => e.kind === SyntaxKind.TraitDeclaration ||
          (isExport(e) && e.expression.kind === SyntaxKind.TraitDeclaration)
        )
        .map(e =>
          isExport(e)
            ? emitExportDirective(e)
            : emitTraitDeclaration(e as TraitDeclaration)
        )
    expressions = expressions.concat(
      module.expressions
        .filter(e => e.kind === SyntaxKind.ImplDeclaration)
        .map(e => emitImplDeclaration(e as ImplDeclaration))
    )
    expressions = expressions.concat(emitExpressions(
      module.expressions.filter(e => !(
        e.kind === SyntaxKind.ImplDeclaration ||
        e.kind === SyntaxKind.TraitDeclaration ||
        (isExport(e) && e.expression.kind === SyntaxKind.TraitDeclaration)
      ))
    ))
    return preamble + expressions.join(';\n')
  }

  function emitBlock(block: BlockNode) {
    level++
    let expressions = emitExpressions(block.expressions)
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
      case SyntaxKind.UnaryExpression: return emitUnaryExpression(expression);
      case SyntaxKind.WhileExpression: return emitWhileExpression(expression);

      case SyntaxKind.IndexAccess: return emitIndexAccess(expression);
      case SyntaxKind.MemberAccess: return emitMemberAccess(expression);
      case SyntaxKind.TypePath: return emitTypePath(expression);

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
        if (context == Context.Return) {
          return `return ${scalarExpression}`
        }
        else if (context == Context.Value && valueVariable) {
          return `${valueVariable} = ${scalarExpression}`
        }
        else {
          allowReturnContext = true
          return scalarExpression
        }
      }
      switch (expression.kind) {
        case SyntaxKind.EnumDeclaration: return emitEnumDeclaration(expression);
        case SyntaxKind.TypeDeclaration: return emitTypeDeclaration(expression);
        case SyntaxKind.IfExpression: return emitIfExpression(expression);
        default: throw Error(`${SyntaxKind[expression.kind]} is not supported`)
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
    if (t.bound.kind == 'Just') {
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
    let name = fn.name.kind == 'Just' ? emitIdentifier(fn.name.value[0]) : ''
    let parameterList = fn.parameterList
    let body = fn.body
    const firstParameter = parameterList.length > 0 && parameterList[0]
    if (firstParameter && firstParameter.pattern.kind === 'Identifier' && firstParameter.pattern.value[0].name == 'self') {
      parameterList = fn.parameterList.slice(1)
      if (fn.body.expressions.length > 0) {
        body = Object['assign']({}, body, {
          expressions: [Object['assign'](fn.parameterList[0], {
            initializer: {
                kind: 'Just',
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
    code += withContext(Context.Return, () => emitBlock(body))

    return code
  }

  function emitFunctionParameter(vd: VariableDeclaration) {
    let initializer = vd.initializer.kind == 'Just'
      ? ` = ${emitExpression(vd.initializer.value[0], Context.Value)}`
      : ''
    return `${emitPattern(vd.pattern)}${initializer}`
  }

  function emitIdentifier(identifier: {name: string}) {
    if (jsKeywords.indexOf(identifier.name) != -1) {
      return `_${identifier.name}`
    }
    return identifier.name
  }

  function emitImplDeclaration(i: ImplDeclaration) {
    let functions = Object['assign']({}, i.tra.ty.functions)
    i.members.forEach(m => functions[m.name.value[0].name] = emitFunctionDeclaration(m))
    return `${emitIdentifier(i.tra.name)}[${getTypeProp(i.ty.ty)}] = {\n${
      indent(
        Object.keys(functions).map(f =>
          `${emitIdentifier({name: f})}: ${
            typeof functions[f] === 'string'
              ? functions[f]
              : `${emitIdentifier(i.tra.name)}.${emitIdentifier({name: f})}`
          }`)
      )
      .join(',\n')
    }\n}`
  }

  function emitTraitDeclaration(t: TraitDeclaration) {
    return `var ${emitIdentifier(t.name)} = {\n${
      indent(
        t.members
          .filter(m => m.body)
          .map(m => `${emitIdentifier(m.name.value[0])}: ${emitFunctionDeclaration(m)}`)
      )
      .join(',\n')
    }\n}`
  }

  function emitTypeDeclaration(t: TypeDeclaration) {
    let value
    if (t.bound.kind == 'Just') {
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

    let initializer = vd.initializer.kind == 'Just'
      ? ` = ${emitExpression(vd.initializer.value[0], Context.Value)}`
      : ''

    if (binding && binding.previous) {
      return `${emitPattern(vd.pattern)}${initializer}`
    }

    if (context) {
      let valueVariable = newValueVariable()
      hoist(`let ${emitPattern(vd.pattern)};`)

      return `${emitPattern(vd.pattern)}${initializer}`
    }

    let kw = (vd.mutable || willBeRedefined) ? 'let' : 'const'
    return `${kw} ${emitPattern(vd.pattern)}${initializer}`
  }

  function emitExportDirective(e: ExportDirective) {
    return `export ${
      e.expression.kind === SyntaxKind.TraitDeclaration
        ? emitTraitDeclaration(e.expression as TraitDeclaration)
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
    if (i.domain.kind == 'Nothing') {
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

  function emitPattern(p: Pattern) {
    if (p.kind === 'CatchAll') {
      return newValueVariable()
    }
    if (p.kind === 'Identifier') {
      return emitIdentifier(p.value[0])
    }
    else if (p.kind === 'Record') {
      return `{${p.value[0].properties.map(({property, local}) =>
        `${emitIdentifier(property)}: ${emitPattern(local)}`
      ).join(', ')}}`
    }
    else if (p.kind === 'RecordType') {
      return `{${p.value[1].properties.map(({property, local}) =>
        `${emitIdentifier(property)}: ${emitPattern(local)}`
      ).join(', ')}}`
    }
    else if (p.kind === 'Tuple') {
      return `[${p.value[0].properties.map(emitPattern).join(', ')}]`
    }
    else if (p.kind === 'TupleType') {
      return `[${p.value[1].properties.map(emitPattern).join(', ')}]`
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
    let fn = fn_ as CallExpression & {traitName: any, implementationType: any}
    let functionName

    if (fn.traitName) {
      functionName = `${fn.traitName}[${getTypeProp(fn.implementationType)}].${emitIdentifier((fn.func as MemberAccess).member)}.call`
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
    let then = emitBlock(e._then)
    let el = e._else.kind == 'Just'
      ? (`\n${indent('else')} ${emitBlock(e._else.value[0])}`)
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

  function emitUnaryExpression(e: BinaryExpression) {
    return withPrecedence(e.operator, () => `${tokenToJs[e.operator.kind]}${emitExpression(e.rhs)}`)
  }

  function emitWhileExpression(e: WhileExpression) {
    let body = () => emitBlock(e.body)

    if (!context) return `while (${emitExpression(e.condition)}) ${body()}`

    let hoisted = ''
    let hoist = code => hoisted += `\n${indent(code)};\n`

    return `(() => {` +
      `let __value__;` +
      `while (${emitExpression(e.condition)}) {${hoisted}` +
        `__value__ = ${withContext(Context.Value, body)}` +
      `} return value})()`
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

  function emitTypePath(e: MemberAccess) {
    let object = emitExpression(e.object)
    return `${object}.${emitExpression(e.member, Context.Value)}`
  }

  function emitBreak(_) {
    allowReturnContext = false
    return `break`
  }

  function emitReturn(e: ReturnStatement) {
    allowReturnContext = false
    context = null
    return `return ${emitExpression(e.expression, Context.Value)}`
  }

  function emitThrow(e) {
    allowReturnContext = false
    context = null
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
