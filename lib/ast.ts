export enum SyntaxKind {
  AndKeyword,
  BreakKeyword,
  ElseKeyword,
  FalseKeyword,
  FnKeyword,
  ForKeyword,
  IfKeyword,
  LetKeyword,
  LoopKeyword,
  MutKeyword,
  NotKeyword,
  // NullKeyword,
  OrKeyword,
  ReturnKeyword,
  ThenKeyword,
  ThrowKeyword,
  TrueKeyword,
  WhileKeyword,

  OpenBraceToken,
  CloseBraceToken,
  OpenBracketToken,
  CloseBracketToken,
  OpenParenToken,
  CloseParenToken,

  AsteriskAsteriskEqualsToken,
  AsteriskAsteriskToken,
  AsteriskEqualsToken,
  AsteriskToken,
  ColonToken,
  CommaToken,
  DotToken,
  EqualsEqualsToken,
  EqualsGreaterThanToken,
  EqualsToken,
  ExclamationEqualsToken,
  GreaterThanEqualsToken,
  GreaterThanToken,
  LessThanEqualsToken,
  LessThanToken,
  MinusEqualsToken,
  MinusToken,
  PercentEqualsToken,
  PercentToken,
  PlusEqualsToken,
  PlusToken,
  SemicolonToken,
  SlashEqualsToken,
  SlashToken,

  NewlineToken,
  EndOfFileToken,

  Comment,
  Block,
  Function,
  Identifier,
  VariableDeclaration,

  AssignmentExpression,
  BinaryExpression,
  CallExpression,
  ForExpression,
  IfExpression,
  LoopExpression,
  UnaryExpression,
  WhileExpression,

  IndexAccess,
  MemberAccess,

  BooleanLiteral,
  NumberLiteral,
  ObjectLiteral,
  StringLiteral,

  ObjectLiteralMember,
}

export const textToToken = {
  'and': SyntaxKind.AndKeyword,
  'break': SyntaxKind.BreakKeyword,
  // 'any': SyntaxKind.AnyKeyword,
  // 'as': SyntaxKind.AsKeyword,
  // 'debugger': SyntaxKind.DebuggerKeyword,
  // 'delete': SyntaxKind.DeleteKeyword,
  'else': SyntaxKind.ElseKeyword,
  // 'enum': SyntaxKind.EnumKeyword,
  // 'export': SyntaxKind.ExportKeyword,
  'false': SyntaxKind.FalseKeyword,
  'for': SyntaxKind.ForKeyword,
  // 'from': SyntaxKind.FromKeyword,
  'fn': SyntaxKind.FnKeyword,
  // 'get': SyntaxKind.GetKeyword,
  'if': SyntaxKind.IfKeyword,
  // 'import': SyntaxKind.ImportKeyword,
  // 'interface': SyntaxKind.InterfaceKeyword,
  // 'is': SyntaxKind.IsKeyword,
  'let': SyntaxKind.LetKeyword,
  'loop': SyntaxKind.LoopKeyword,
  'mut': SyntaxKind.MutKeyword,
  'not': SyntaxKind.NotKeyword,
  // 'null': SyntaxKind.NullKeyword,
  'or': SyntaxKind.OrKeyword,
  'return': SyntaxKind.ReturnKeyword,
  // 'set': SyntaxKind.SetKeyword,
  // 'this': SyntaxKind.ThisKeyword,
  'throw': SyntaxKind.ThrowKeyword,
  'true': SyntaxKind.TrueKeyword,
  'then': SyntaxKind.ThenKeyword,
  // 'try': SyntaxKind.TryKeyword,
  // 'type': SyntaxKind.TypeKeyword,
  'while': SyntaxKind.WhileKeyword,
  // 'yield': SyntaxKind.YieldKeyword,
  // 'async': SyntaxKind.AsyncKeyword,
  // 'await': SyntaxKind.AwaitKeyword,
  // 'of': SyntaxKind.OfKeyword,
  '{': SyntaxKind.OpenBraceToken,
  '}': SyntaxKind.CloseBraceToken,
  '[': SyntaxKind.OpenBracketToken,
  ']': SyntaxKind.CloseBracketToken,
  '(': SyntaxKind.OpenParenToken,
  ')': SyntaxKind.CloseParenToken,
  ',': SyntaxKind.CommaToken,
  ':': SyntaxKind.ColonToken,
  '.': SyntaxKind.DotToken,
  // '...': SyntaxKind.DotDotDotToken,
  ';': SyntaxKind.SemicolonToken,
  '<': SyntaxKind.LessThanToken,
  '>': SyntaxKind.GreaterThanToken,
  '<=': SyntaxKind.LessThanEqualsToken,
  '>=': SyntaxKind.GreaterThanEqualsToken,
  '==': SyntaxKind.EqualsEqualsToken,
  '!=': SyntaxKind.ExclamationEqualsToken,
  '=>': SyntaxKind.EqualsGreaterThanToken,
  '+': SyntaxKind.PlusToken,
  '-': SyntaxKind.MinusToken,
  '**': SyntaxKind.AsteriskAsteriskToken,
  '*': SyntaxKind.AsteriskToken,
  '/': SyntaxKind.SlashToken,
  '%': SyntaxKind.PercentToken,
  // '<<': SyntaxKind.LessThanLessThanToken,
  // '>>': SyntaxKind.GreaterThanGreaterThanToken,
  '=': SyntaxKind.EqualsToken,
  '+=': SyntaxKind.PlusEqualsToken,
  '-=': SyntaxKind.MinusEqualsToken,
  '*=': SyntaxKind.AsteriskEqualsToken,
  '**=': SyntaxKind.AsteriskAsteriskEqualsToken,
  '/=': SyntaxKind.SlashEqualsToken,
  '%=': SyntaxKind.PercentEqualsToken,
  // '<<=': SyntaxKind.LessThanLessThanEqualsToken,
  // '>>=': SyntaxKind.GreaterThanGreaterThanEqualsToken,
}

function reverse(object) {
  let reverse = {}

  Object.keys(object).forEach(key => {
    reverse[object[key]] = key
  })

  return reverse
}

export const operators =[
  ',', ';', ':', '.', '{', '}', '[', ']', '(', ')',
  '+', '-', '*', '**', '/', '%',
  '=', '+=', '-=', '*=', '**=', '/=', '%=',
  '==', '!=', '<', '<=', '>', '>=',
  '=>',
]

export const tokenToText = Object['assign'](reverse(textToToken), {
  [SyntaxKind.Identifier]: 'identifier',
})

export function isBlock(token: Token): token is BlockNode {
  return token.kind === SyntaxKind.Block
}

export function isIdentifier(token: Token): token is Identifier {
  return token.kind === SyntaxKind.Identifier
}

export function isMember(token: Token): token is MemberAccess {
  return token.kind === SyntaxKind.MemberAccess
}

export interface Token {
  kind: SyntaxKind
}

export interface BooleanLiteral extends Expression {
  value: boolean
}

export interface NumberLiteral extends Expression {
  value: number
}

export interface ObjectLiteral extends Expression {
  members: Array<ObjectLiteralMember>
}

export interface ObjectLiteralMember extends Token {
  name: SimpleIdentifier
  value: Expression
}

export interface StringLiteral extends Expression {
  value: string
}

export interface CommentNode extends Token {
  text: string
}

export interface BlockNode extends Token {
  block: Array<Expression>
}

export interface FunctionNode extends Token {
  name?: Identifier
  parameterList: Array<VariableDeclaration>
  body: BlockNode
}

export interface SimpleIdentifier extends Token {
  name: string
}

export interface VariableDeclaration extends Token {
  identifier: SimpleIdentifier
  mutable: boolean
  initializer?: Expression
}

export interface Expression extends Token {}

export interface AssignmentExpression extends Expression {
  lhs: Identifier|MemberAccess
  token: Token
  rhs: Expression
}

export interface CallExpression extends Expression {
  fn: Expression
  openParen: Token
  argumentList: Array<Expression>
  closeParen: Token
}

export interface UnaryExpression extends Expression {
  operator: Token
  rhs: Expression
}

export interface BinaryExpression extends Expression {
  lhs: Expression
  operator: Token
  rhs: Expression
}

export interface Identifier extends SimpleIdentifier, Expression {
  name: string
}

export interface ForExpression extends Token {
  body: Expression,
}

export interface IfExpression extends Token {
  condition: Expression,
  then: Expression,
  else?: Expression,
}

export interface LoopExpression extends Token {
  body: Expression,
}

export interface WhileExpression extends Token {
  condition: Expression,
  body: Expression,
}

export interface IndexAccess extends Expression {
  object: Expression
  index: Expression
}

export interface MemberAccess extends Expression {
  object: Expression
  member: Identifier|MemberAccess
}

// export const NULL: Token = { kind: SyntaxKind.NullKeyword }
