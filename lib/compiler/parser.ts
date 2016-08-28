import {
  isIdentifier,
  isMember,
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
  ObjectLiteralMember,
  StringLiteral,
  SyntaxKind,
  Token,
  TypeBound,
  UnaryExpression,
  VariableDeclaration,
  WhileExpression,
} from './ast'
import {TokenStream} from './token_stream_type'

const PRECEDENCE = {
  [SyntaxKind.EqualsToken]: 1,
  [SyntaxKind.PlusEqualsToken]: 1.1,
  [SyntaxKind.MinusEqualsToken]: 1.1,
  [SyntaxKind.OrKeyword]: 2,
  [SyntaxKind.AndKeyword]: 3,
  [SyntaxKind.NotKeyword]: 4,
  [SyntaxKind.EqualsEqualsToken]: 7,
  [SyntaxKind.ExclamationEqualsToken]: 7,
  [SyntaxKind.GreaterThanToken]: 7,
  [SyntaxKind.GreaterThanEqualsToken]: 7,
  [SyntaxKind.LessThanToken]: 7,
  [SyntaxKind.LessThanEqualsToken]: 7,
  [SyntaxKind.PlusToken]: 10,
  [SyntaxKind.MinusToken]: 10,
  [SyntaxKind.AsteriskToken]: 20,
  [SyntaxKind.AsteriskAsteriskToken]: 20,
  [SyntaxKind.SlashToken]: 20,
  [SyntaxKind.PercentToken]: 20,
}

export function parse(input: TokenStream) {

  function isToken(kind: SyntaxKind, peekDistance?) {
    let token = input.peek(false, peekDistance)
    return token && token.kind == kind
  }

  function expect(expect: SyntaxKind, name = 'token') {
    if (!isToken(expect)) {
      let token = input.peek()
      const expectedText = tokenToText[expect]
        ? `: "${tokenToText[expect]}"`
        : ``
      const but = token
        ? `got "${tokenToText[token.kind]}"`
        : `reached end of file`

      console.error(token)
      input.croak(`Expected ${name}${expectedText}, but ${but}`)
    }
  }

  function consumeToken(token: SyntaxKind) {
    expect(token)
    return input.next()
  }
  function skipKeyword(kw: SyntaxKind) {
    expect(kw, 'keyword')
    input.next()
  }
  function unexpected() {
    let token = input.peek()
    console.error('token', token, typeof token)
    input.croak(`Unexpected token: ${tokenToText[token.kind]}`)
  }

  function isAssignment(token: Token) {
    if (!token) return
    return token.kind == SyntaxKind.EqualsToken
        || token.kind == SyntaxKind.PlusEqualsToken
        || token.kind == SyntaxKind.MinusEqualsToken
        || token.kind == SyntaxKind.AsteriskEqualsToken
        || token.kind == SyntaxKind.AsteriskAsteriskEqualsToken
        || token.kind == SyntaxKind.SlashEqualsToken
        || token.kind == SyntaxKind.PercentEqualsToken
  }

  function maybeParseOperator(): Token {
    if (isAssignment(input.peek())
     || isToken(SyntaxKind.EqualsEqualsToken)
     || isToken(SyntaxKind.ExclamationEqualsToken)
     || isToken(SyntaxKind.GreaterThanToken)
     || isToken(SyntaxKind.GreaterThanEqualsToken)
     || isToken(SyntaxKind.LessThanToken)
     || isToken(SyntaxKind.LessThanEqualsToken)
     || isToken(SyntaxKind.PlusToken)
     || isToken(SyntaxKind.MinusToken)
     || isToken(SyntaxKind.AsteriskToken)
     || isToken(SyntaxKind.AsteriskAsteriskToken)
     || isToken(SyntaxKind.SlashToken)
     || isToken(SyntaxKind.PercentToken)
     || isToken(SyntaxKind.AndKeyword)
     || isToken(SyntaxKind.OrKeyword)
     || isToken(SyntaxKind.NotKeyword)
    ) {
      return input.peek()
    }
    return null
  }

  function maybeBinary(left: Expression, myPrecedence): Expression {
    let operator = maybeParseOperator()
    if (operator) {
      let hisPrecedence = PRECEDENCE[operator.kind]
      if (hisPrecedence === undefined) {
        throw `No PRECEDENCE for ${tokenToText[operator.kind]}: ${JSON.stringify(operator)}`
      }
      if (hisPrecedence > myPrecedence) {
        input.next()
        let e
        let innerExpression = maybeBinary(parseAtom(), hisPrecedence)
        if (isAssignment(operator)) {
          if (isIdentifier(left) || isMember(left)) {
            let a: AssignmentExpression = {
              kind: SyntaxKind.AssignmentExpression,
              lhs: left,
              token: operator,
              rhs: innerExpression,
            }
            e = a
          } else {
            input.croak('Can only assign to an identifier')
          }
        } else {
          let a: BinaryExpression = {
            kind: SyntaxKind.BinaryExpression,
            lhs: left,
            operator,
            rhs: innerExpression,
          }
          e = a
        }
        return maybeBinary(e, myPrecedence)
      }
    }
    return left
  }

  function maybeMemberAccess(token: Expression): MemberAccess|Expression {
    if (isToken(SyntaxKind.DotToken)) {
      input.next()
      expect(SyntaxKind.Identifier, 'identifier')
      return {
        kind: SyntaxKind.MemberAccess,
        object: token,
        member: maybeMemberAccess(maybeCall(input.next()))
      }
    }
    if (isToken(SyntaxKind.OpenBracketToken)) {
      input.next()
      let index = parseExpression()
      consumeToken(SyntaxKind.CloseBracketToken)
      return maybeMemberAccess(maybeCall({
        kind: SyntaxKind.IndexAccess,
        object: token,
        index,
      } as IndexAccess))
    }
    return token
  }

  function delimited<T>(start: SyntaxKind|string, stop: SyntaxKind|string, separator: SyntaxKind|string|(() => void), parser: () => T): Array<T> {
    if (typeof start === 'string') start = textToToken[start]
    if (typeof stop === 'string') stop = textToToken[stop]
    if (typeof separator === 'string') separator = textToToken[separator]

    let a = [], first = true
    consumeToken(start as SyntaxKind)
    while (!input.eof()) {
      if (isToken(stop as SyntaxKind)) break
      if (first) first = false; else {
        if (typeof separator === 'function') separator(); else consumeToken(separator as SyntaxKind)
      }
      let part
      while (!part) {
        if (isToken(stop as SyntaxKind)) break
        part = parser()
      }
      if (part) {
        a.push(part)
      }
    }
    consumeToken(stop as SyntaxKind)
    return a
  }

  function parseCall(fn: Expression): CallExpression {
    return {
      kind: SyntaxKind.CallExpression,
      fn,
      openParen: input.peek(),
      argumentList: delimited(`(`, `)`, `,`, parseExpression),
      closeParen: input.peek(),
    }
  }

  function parseTypeBound(): TypeBound {
    expect(SyntaxKind.Identifier, 'identifier')
    let name = input.next() as Identifier
    let parameters
    if (isToken(SyntaxKind.LessThanToken)) {
      parameters = delimited('<', '>', ',', parseTypeBound)
    }

    return {
      kind: SyntaxKind.TypeBound,
      name,
      parameters,
    }
  }

  function parseVariableDeclaration(): VariableDeclaration {
    let mutable = false
    if (isToken(SyntaxKind.MutKeyword)) {
      input.next()
      mutable = true
    }
    expect(SyntaxKind.Identifier, 'identifier')
    let declaration: VariableDeclaration = {
      kind: SyntaxKind.VariableDeclaration,
      identifier: input.next() as Identifier,
      mutable,
    }

    if (isToken(SyntaxKind.ColonToken)) {
      input.next()
      declaration.typeBound = parseTypeBound()
    }

    if (isToken(SyntaxKind.EqualsToken)) {
      input.next()
      declaration.initializer = parseExpression()
    }

    return declaration
  }

  function parseFunction(): FunctionNode {
    let name
    if (isToken(SyntaxKind.Identifier)) {
      name = input.next()
    }
    let parameterList = delimited(`(`, `)`, `,`, () => parseVariableDeclaration())

    let returnType
    if (isToken(SyntaxKind.ColonToken)) {
      input.next()
      returnType = parseTypeBound()
    }

    let body: BlockNode
    if (isToken(SyntaxKind.OpenBraceToken)) {
      body = parseBlock()
    } else {
      skipKeyword(SyntaxKind.ThenKeyword)
      body = {
        kind: SyntaxKind.Block,
        block: [parseExpression()],
      }
    }

    return {
      kind: SyntaxKind.Function,
      name,
      parameterList,
      returnType,
      body,
    }
  }

  function parseIf(): IfExpression {
    skipKeyword(SyntaxKind.IfKeyword)
    let condition = parseExpression()
    let then: BlockNode
    if (isToken(SyntaxKind.OpenBraceToken)) {
      then = parseBlock()
    } else {
      skipKeyword(SyntaxKind.ThenKeyword)
      then = {
        kind: SyntaxKind.Block,
        block: [parseExpression()],
      }
    }
    let ret: IfExpression = {
      kind: SyntaxKind.IfExpression,
      condition,
      then,
    }
    if (isToken(SyntaxKind.ElseKeyword)) {
      input.next()
      if (isToken(SyntaxKind.OpenBraceToken)) {
        ret.else = parseBlock()
      } else {
        ret.else = {
          kind: SyntaxKind.Block,
          block: [parseExpression()],
        }
      }
    }
    return ret
  }

  function parseWhile(): WhileExpression {
    skipKeyword(SyntaxKind.WhileKeyword)
    let condition = parseExpression()
    let body: BlockNode
    if (isToken(SyntaxKind.OpenBraceToken)) {
      body = parseBlock()
    } else {
      skipKeyword(SyntaxKind.ThenKeyword)
      body = {
        kind: SyntaxKind.Block,
        block: [parseExpression()],
      }
    }

    return {
      kind: SyntaxKind.WhileExpression,
      condition,
      body,
    }
  }

  function parseObjectLiteralMember(): ObjectLiteralMember {
    let name = consumeToken(SyntaxKind.Identifier) as Identifier
    let value
    if (isToken(SyntaxKind.ColonToken)) {
      input.next()
      value = parseExpression()
    } else {
      value = name
    }
    return {
      kind: SyntaxKind.ObjectLiteralMember,
      name,
      value,
    }
  }

  function parseObjectLiteral(): ObjectLiteral {
    let members = delimited(`{`, `}`, `,`, parseObjectLiteralMember)
    return { kind: SyntaxKind.ObjectLiteral, members }
  }

  function maybeCall(expr: Expression) {
    return isToken(SyntaxKind.OpenParenToken) ? parseCall(expr) : expr
  }
  function parseAtom() {
    return maybeCall((function innerParseAtom() {
      if (isToken(SyntaxKind.OpenParenToken)) {
        input.next()
        let exp = parseExpression()
        consumeToken(SyntaxKind.CloseParenToken)
        return exp
      }
      if (isToken(SyntaxKind.OpenBraceToken)) return parseObjectLiteral()
      if (isToken(SyntaxKind.IfKeyword)) return parseIf()
      if (isToken(SyntaxKind.WhileKeyword)) return parseWhile()
      if (isToken(SyntaxKind.FnKeyword)) {
        input.next()
        return parseFunction()
      }
      if (isToken(SyntaxKind.LetKeyword)) {
        input.next()
        return parseVariableDeclaration()
      }
      if (isToken(SyntaxKind.NotKeyword)
       || isToken(SyntaxKind.MinusToken)
       || isToken(SyntaxKind.PlusToken)
      ) {
        return {
          kind: SyntaxKind.UnaryExpression,
          operator: input.next(),
          rhs: parseExpression(),
        } as UnaryExpression
      }
      if (isToken(SyntaxKind.BreakKeyword)) {
        return input.next()
      }
      if (isToken(SyntaxKind.ReturnKeyword)
       || isToken(SyntaxKind.ThrowKeyword)
      ) {
        let kind = input.next().kind
        return {
          kind,
          expression: parseExpression(),
        } as any
      }
      if (
        isToken(SyntaxKind.TrueKeyword) ||
        isToken(SyntaxKind.FalseKeyword)
      ) {
        return maybeMemberAccess({
          kind: SyntaxKind.BooleanLiteral,
          value: input.next().kind == SyntaxKind.TrueKeyword,
        } as BooleanLiteral)
      }
      if (
        isToken(SyntaxKind.NumberLiteral) ||
        isToken(SyntaxKind.StringLiteral) ||
        isToken(SyntaxKind.Identifier)
      ) {
        return maybeMemberAccess(input.next())
      }
      unexpected()
    })())
  }

  function expectSeparator(kind: SyntaxKind) {
    if (!input.eof()) {
      let token = input.peek(true)
      if (token.kind == SyntaxKind.NewlineToken
       || token.kind == SyntaxKind.Comment
      ) {
        input.next(true)
      } else {
        consumeToken(kind)
      }
    }
  }

  function parseToplevel() {
    let prog = []
    while (!input.eof()) {
      let expression = parseExpression()
      if (expression) {prog.push(expression)}
      if (!input.eof()) expectSeparator(SyntaxKind.SemicolonToken)
    }
    return { kind: SyntaxKind.Block, block: prog }
  }

  function parseBlock(): BlockNode {
    let block = delimited(`{`, `}`, () => expectSeparator(SyntaxKind.SemicolonToken), parseExpression)
    return { kind: SyntaxKind.Block, block }
  }

  function parseExpression(): Expression {
    return maybeMemberAccess(maybeCall(maybeBinary(parseAtom(), 0)))
  }

  return parseToplevel()
}
