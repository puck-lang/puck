import {
  isBlock,
  isExport,
  isIdentifier,
  isMember,
  precedence,
  textToToken,
  tokenToText,
  ArrayLiteral,
  AssignmentExpression,
  BinaryExpression,
  BlockNode,
  BooleanLiteral,
  CallExpression,
  CommentNode,
  ExportDirective,
  Expression,
  ForExpression,
  FunctionNode,
  Identifier,
  IfExpression,
  ImportDirective,
  IndexAccess,
  LoopExpression,
  MemberAccess,
  Module,
  NumberLiteral,
  ObjectLiteral,
  ReturnStatement,
  SimpleIdentifier,
  StringLiteral,
  StringLiteralPart,
  SyntaxKind,
  Token,
  TypeBound,
  UnaryExpression,
  VariableDeclaration,
  WhileExpression,
} from './ast'
import {isTypeScopeDeclaration} from '../helpers'

const jsKeywords = ['arguments', 'module', 'new', 'null', 'Object', 'typeof', 'undefined']
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

  function emitLines(block: Expression[]) {
    let wasInContext = context
    context = null
    let lines: any[] = []
    let outerHoist = hoist
    hoist = code => {
      lines.push(code)
    }
    for (let i = 0; i < block.length; i++) {
      if (wasInContext && i == block.length - 1) {
        context = wasInContext
      }
      lines.push(emitExpressionKeepContext(block[i]))
    }
    hoist = outerHoist
    return lines
  }

  function emitModule(module: Module) {
    let preamble = `#!/usr/bin/env node\n'use strict';\n`
    let lines = emitLines(module.lines.filter(e => !(
      e.kind === SyntaxKind.TraitDeclaration ||
      e.kind === SyntaxKind.TypeDeclaration ||
      (isExport(e) && (
        e.expression.kind === SyntaxKind.TraitDeclaration ||
        e.expression.kind === SyntaxKind.TypeDeclaration
      ))
    )))
    return preamble + lines.join(';\n')
  }

  function emitBlock(block: BlockNode) {
    level++
    let lines = emitLines(block.block)
    let body
    let end = '}'
    if (lines.length !== 0) {
      let last = lines.length - 1
      if (lines[last] !== 'break') {
        lines[last] = `${lines[last]};\n`
      }
      body = `\n${indent(lines).join(`;\n`)}`
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

      case SyntaxKind.BreakKeyword: return emitBreak(expression);
      case SyntaxKind.ReturnStatement: return emitReturn(expression);
      case SyntaxKind.ThrowKeyword: return emitThrow(expression);

      case SyntaxKind.ArrayLiteral: return emitArrayLiteral(expression);
      case SyntaxKind.BooleanLiteral: return emitBooleanLiteral(expression);
      case SyntaxKind.NumberLiteral: return emitNumberLiteral(expression);
      case SyntaxKind.ObjectLiteral: return emitObjectLiteral(expression);
      case SyntaxKind.StringLiteral: return emitStringLiteral(expression);
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
        case SyntaxKind.IfExpression: return emitIfExpression(expression);
        default: throw `${SyntaxKind[expression.kind]} is not supported`
      }
    } finally {
      valueVariable = currentValueVariableContext
      currentValueVariableContext = outerValueVariableContext
    }
  }

  function emitExpression(expression, context = null) {
    return withContext(context, () => emitExpressionKeepContext(expression))
  }

  function emitFunctionDeclaration(fn: FunctionNode) {
    let name = fn.name ? emitIdentifier(fn.name) : ''
    let parameterList = fn.parameterList
    let body = fn.body
    if (parameterList.length > 0 && parameterList[0].identifier.name == 'self') {
      parameterList = fn.parameterList.slice(1)
      if (fn.body.block.length > 0) {
        body = Object['assign']({}, body, {
          block: [Object['assign'](fn.parameterList[0], {
            initializer: {
              kind: SyntaxKind.Identifier,
              name: 'this',
            } as Identifier
          }), ...body.block]
        })
      }
    }
    let code = `function ${name}(${parameterList.map(emitFunctionParameter).join(', ')}) `
    code += withContext(Context.Return, () => emitBlock(body))

    return code
  }

  function emitFunctionParameter(vd: VariableDeclaration) {
    let initializer = vd.initializer
      ? ` = ${emitExpression(vd.initializer, Context.Value)}`
      : ''
    return `${emitIdentifier(vd.identifier)}${initializer}`
  }

  function emitIdentifier(identifier: SimpleIdentifier) {
    if (jsKeywords.indexOf(identifier.name) != -1) {
      return `_${identifier.name}`
    }
    return identifier.name
  }

  function emitVariableDeclaration(vd: VariableDeclaration & {scope: any}) {
    let binding = vd.scope.getBinding(vd.identifier.name)
    let willBeRedefined = binding.redefined
    while (binding && binding.identifier !== vd.identifier) {
      binding = binding.previous
    }

    let initializer = vd.initializer
      ? ` = ${emitExpression(vd.initializer, Context.Value)}`
      : ''

    if (binding && binding.previous) {
      return `${emitIdentifier(vd.identifier)}${initializer}`
    }

    let kw = (vd.mutable || willBeRedefined) ? 'let' : 'const'
    return `${kw} ${emitIdentifier(vd.identifier)}${initializer}`
  }

  function emitExportDirective(e: ExportDirective) {
    return `export ${emitExpression(e.expression)}`
  }

  function emitImportDirective(i: ImportDirective) {
    let specifier = isIdentifier(i.specifier)
      ? `* as ${emitIdentifier(i.specifier)}`
      : `{${i.specifier.members
          .filter(({property, local}) => {
            if (/\.puck$/.test(i.path) && /^[A-Z]/.test(local.name) &&
              ['TokenStream', 'InputStream', 'TopScopeVisitor', 'ScopeVisitor', 'ImportVisitor']
                .indexOf(local.name) == -1) {
              return false
            }

            if (!i['module']) return true
            const e = i['module'].exports[local.name]

            return isTypeScopeDeclaration(e.expression)
          })
          .map(({property, local}) => property.name === local.name
            ? emitIdentifier(property)
            : `${emitIdentifier(property)} as ${emitIdentifier(local)}`
          )
          .join(', ')
        }}`

    let path
    if (i.domain == 'node') {
      path = i.path
    } else if (i.domain == 'puck') {
      path = `puck-lang/dist/lib/stdlib/${i.path}`
    } else if (!i.domain) {
      if (i.path.charAt(0) == '/') {
        path = i.path
      } else {
        path = `./${i.path}`
      }
      path = path.replace(/\.(puck|ts)$/, '.js')
    } else {
      throw `Unsupported import-domain "${i.domain}"`
    }

    return `import ${specifier} from '${path}'`
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

  function emitCallExpression(fn: CallExpression) {
    return `${emitExpression(fn.func)}(${fn.argumentList.map(
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
    let el = e._else
      ? (`\n${indent('else')} ${emitBlock(e._else as any)}`)
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

  function emitArrayLiteral(l: ArrayLiteral) {
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

  function emitBooleanLiteral(l: BooleanLiteral) {
    return `${l.value}`
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

  return {emitModule}
}
