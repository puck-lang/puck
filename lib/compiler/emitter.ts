import {
  isBlock,
  isIdentifier,
  textToToken,
  tokenToText,
  AssignmentExpression,
  BinaryExpression,
  BlockNode,
  BooleanLiteral,
  CallExpression,
  CommentNode,
  Expression,
  ForExpression,
  FunctionNode,
  Identifier,
  IfExpression,
  IndexAccess,
  LoopExpression,
  MemberAccess,
  NumberLiteral,
  ObjectLiteral,
  SimpleIdentifier,
  StringLiteral,
  SyntaxKind,
  Token,
  TypeBound,
  UnaryExpression,
  VariableDeclaration,
  WhileExpression,
} from './ast'

const tokenToJs = Object['assign'](tokenToText, {
  [SyntaxKind.AndKeyword]: '&&',
  [SyntaxKind.OrKeyword]: '||',
  [SyntaxKind.NotKeyword]: '!',
})

enum Context {
  Return = 1,
  Value = 2,
}

let level = 0
let context: Context = null
let allowReturnContext = true
let hoist: (code: string) => void
let valueVariable
let valueVarableCount = 0

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

export function emitProgram(program: BlockNode) {
  let preamble = `#!/usr/bin/env node\n'use strict';\n`
  let lines = emitLines(program.block)
  return preamble + lines.join(';\n')
}

export function emitBlock(block: BlockNode) {
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
    case SyntaxKind.AssignmentExpression: return emitAssignmentExpression(expression);
    case SyntaxKind.BinaryExpression: return emitBinaryExpression(expression);
    case SyntaxKind.CallExpression: return emitCallExpression(expression);
    case SyntaxKind.UnaryExpression: return emitUnaryExpression(expression);
    case SyntaxKind.WhileExpression: return emitWhileExpression(expression);
    case SyntaxKind.IndexAccess: return emitIndexAccess(expression);
    case SyntaxKind.MemberAccess: return emitMemberAccess(expression);
    case SyntaxKind.BreakKeyword: return emitBreak(expression);
    case SyntaxKind.ReturnKeyword: return emitReturn(expression);
    case SyntaxKind.ThrowKeyword: return emitThrow(expression);
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
  let code = `function ${name}(${fn.parameterList.map(emitFunctionParameter).join(', ')}) `
  code += withContext(Context.Return, () => emitBlock(fn.body))

  return code
}

function emitFunctionParameter(vd: VariableDeclaration) {
  let initializer = vd.initializer
    ? ` = ${emitExpression(vd.initializer, Context.Value)}`
    : ''
  return `${emitIdentifier(vd.identifier)}${initializer}`
}

function emitIdentifier(identifier: SimpleIdentifier) {
  if (['arguments'].indexOf(identifier.name) != -1) {
    return `_${identifier.name}`
  }
  return identifier.name
}

function emitVariableDeclaration(vd: VariableDeclaration) {
  let kw = vd.mutable ? 'let' : 'const'
  let initializer = vd.initializer
    ? ` = ${emitExpression(vd.initializer, Context.Value)}`
    : ''
  return `${kw} ${emitIdentifier(vd.identifier)}${initializer}`
}

function emitAssignmentExpression(e: AssignmentExpression) {
  let left = isIdentifier(e.lhs)
    ? emitIdentifier(e.lhs)
    : emitMemberAccess(e.lhs)
  return `${left} ${tokenToJs[e.token.kind]} ${emitExpression(e.rhs, Context.Value)}`
}

function emitBinaryExpression(e: BinaryExpression) {
  return `${emitExpression(e.lhs)} ${tokenToJs[e.operator.kind]} ${emitExpression(e.rhs)}`
}

function emitCallExpression(fn: CallExpression) {
  return `${emitExpression(fn.fn)}(${fn.argumentList.map(
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
  let then = emitBlock(e.then)
  let el = e.else
    ? (`\n${indent('else')} ${emitBlock(e.else as any)}`)
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
  return `${tokenToJs[e.operator.kind]}${emitExpression(e.rhs)}`
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
  return `${emitExpression(e.object)}.${emitExpression(e.member, Context.Value)}`
}

function emitBreak(_) {
  allowReturnContext = false
  return `break`
}

function emitReturn(e) {
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

function emitNumberLiteral(l: NumberLiteral) {
  return `${l.value}`
}

function emitObjectLiteral(l: ObjectLiteral) {
  let members: any[] = l.members.map(member => `${member.name.name}: ${emitExpression(member.value)}`)
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

function emitStringLiteral(l: StringLiteral) {
  return `${JSON.stringify(l.value)}`
}
