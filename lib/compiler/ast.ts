export enum SyntaxKind {
  AndKeyword,
  AsKeyword,
  BreakKeyword,
  ElseKeyword,
  EnumKeyword,
  ExportKeyword,
  FalseKeyword,
  FnKeyword,
  ForKeyword,
  IfKeyword,
  ImplKeyword,
  ImportKeyword,
  LetKeyword,
  LoopKeyword,
  MutKeyword,
  MatchKeyword,
  NotKeyword,
  OrKeyword,
  ReturnKeyword,
  ThenKeyword,
  ThrowKeyword,
  TraitKeyword,
  TrueKeyword,
  TypeKeyword,
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
  BarToken,
  ColonToken,
  ColonColonToken,
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
  UnderscoreToken,

  NewlineToken,
  EndOfFileToken,

  Comment,
  Block,
  EnumDeclaration,
  Function,
  Identifier,
  ImplDeclaration,
  Module,
  ObjectDestructure,
  ObjectDestructureMember,
  TraitDeclaration,
  TypeBound,
  NamedTypeBound,
  FunctionTypeBound,
  ObjectTypeBound,
  TupleTypeBound,
  TypeDeclaration,
  TypeParameter,
  TypeProperty,
  VariableDeclaration,

  ExportDirective,
  ImportDirective,

  AssignmentExpression,
  BinaryExpression,
  CallExpression,
  ForExpression,
  IfExpression,
  IfLetExpression,
  LoopExpression,
  MatchExpression,
  TypePathExpression,
  UnaryExpression,
  WhileExpression,

  IndexAccess,
  MemberAccess,
  TypePath,

  BreakStatement,
  ReturnStatement,

  BooleanLiteral,
  ListLiteral,
  NumberLiteral,
  ObjectLiteral,
  StringLiteral,
  TupleLiteral,

  EnumMember,
  ObjectLiteralMember,
  StringLiteralPart,
}

export const textToToken = Object['assign'](Object.create(null), {
  'and': SyntaxKind.AndKeyword,
  'break': SyntaxKind.BreakKeyword,
  // 'as': SyntaxKind.AsKeyword,
  // 'debugger': SyntaxKind.DebuggerKeyword,
  'else': SyntaxKind.ElseKeyword,
  'enum': SyntaxKind.EnumKeyword,
  'export': SyntaxKind.ExportKeyword,
  'false': SyntaxKind.FalseKeyword,
  'for': SyntaxKind.ForKeyword,
  'fn': SyntaxKind.FnKeyword,
  'if': SyntaxKind.IfKeyword,
  'impl': SyntaxKind.ImplKeyword,
  'import': SyntaxKind.ImportKeyword,
  'let': SyntaxKind.LetKeyword,
  'loop': SyntaxKind.LoopKeyword,
  'match': SyntaxKind.MatchKeyword,
  'mut': SyntaxKind.MutKeyword,
  'not': SyntaxKind.NotKeyword,
  'or': SyntaxKind.OrKeyword,
  'return': SyntaxKind.ReturnKeyword,
  'throw': SyntaxKind.ThrowKeyword,
  'true': SyntaxKind.TrueKeyword,
  'then': SyntaxKind.ThenKeyword,
  'trait': SyntaxKind.TraitKeyword,
  'type': SyntaxKind.TypeKeyword,
  'while': SyntaxKind.WhileKeyword,
  // 'of': SyntaxKind.OfKeyword,
  '{': SyntaxKind.OpenBraceToken,
  '}': SyntaxKind.CloseBraceToken,
  '[': SyntaxKind.OpenBracketToken,
  ']': SyntaxKind.CloseBracketToken,
  '(': SyntaxKind.OpenParenToken,
  ')': SyntaxKind.CloseParenToken,
  '|': SyntaxKind.BarToken,
  ',': SyntaxKind.CommaToken,
  ':': SyntaxKind.ColonToken,
  '::': SyntaxKind.ColonColonToken,
  '.': SyntaxKind.DotToken,
  // '...': SyntaxKind.DotDotDotToken,
  ';': SyntaxKind.SemicolonToken,
  '_': SyntaxKind.UnderscoreToken,
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
  '=': SyntaxKind.EqualsToken,
  '+=': SyntaxKind.PlusEqualsToken,
  '-=': SyntaxKind.MinusEqualsToken,
  '*=': SyntaxKind.AsteriskEqualsToken,
  '**=': SyntaxKind.AsteriskAsteriskEqualsToken,
  '/=': SyntaxKind.SlashEqualsToken,
  '%=': SyntaxKind.PercentEqualsToken,
})

function reverse(object) {
  let reverse = {}

  Object.keys(object).forEach(key => {
    reverse[object[key]] = key
  })

  return reverse
}

export const operators = [
  ',', ';', ':', '::', '.', '_', '|',
  '{', '}', '[', ']', '(', ')',
  '+', '-', '*', '**', '/', '%',
  '=', '+=', '-=', '*=', '**=', '/=', '%=',
  '==', '!=', '<', '<=', '>', '>=',
  '=>',
]

export const precedence = {
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
  [SyntaxKind.SlashToken]: 20,
  [SyntaxKind.PercentToken]: 20,
  [SyntaxKind.AsteriskAsteriskToken]: 25,
}

export const tokenToText = Object['assign'](reverse(textToToken), {
  [SyntaxKind.Identifier]: (i: Identifier) => (i && i.name)
    ? `identifier: ${i.name}`
    : 'identifier',
})

export function isBlock(token: Token): token is BlockNode {
  return token.kind === SyntaxKind.Block
}

export function isExport(token: Token): token is ExportDirective {
  return token.kind === SyntaxKind.ExportDirective
}

export function isIdentifier(token: Token): token is Identifier {
  return token.kind === SyntaxKind.Identifier
}

export function isMember(token: Token): token is MemberAccess {
  return token.kind === SyntaxKind.MemberAccess
}

export function isIndex(token: Token): token is IndexAccess {
  return token.kind === SyntaxKind.IndexAccess
}

export type Maybe<T>
  = {
      kind: 'Just'
      value: [T]
    }
  | {
      kind: 'Nothing'
    }

export interface Token {
  kind: SyntaxKind
}

export interface Expression extends Token {}

export interface CommentNode extends Token {
  text: string
}

export interface BlockNode extends Token {
  expressions: Array<Expression>
}

export interface EnumDeclaration extends Token {
  keyword: Token
  name: Identifier
  typeParameters: Array<TypeParameter>
  members: Array<TypeDeclaration>
}

export interface FunctionDeclaration extends Token {
  name: Maybe<Identifier>
  parameterList: Array<VariableDeclaration>
  returnType: Maybe<TypeBound>
  body: BlockNode
}

export interface Identifier extends SimpleIdentifier, Expression {
  name: string
}

export interface ImplDeclaration extends Token {
  trait_: TypeBound
  type_: TypeBound
  members: Array<FunctionDeclaration>
}

export interface Module extends Token {
  fileName: string
  path: string
  exports: {[name: string]: ExportDirective}
  expressions: Array<Token>
}

export interface ObjectDestructure extends Token {
  openBrace: Token
  members: Array<ObjectDestructureMember>
  closeBrace: Token
}

export interface ObjectDestructureMember extends Token {
  property: SimpleIdentifier
  local: SimpleIdentifier
}

export interface SimpleIdentifier extends Token {
  name: string
}

export interface TraitDeclaration extends Token {
  name: SimpleIdentifier
  members: Array<FunctionDeclaration>
}

export interface TypeBound extends Token {
  path: TypePath
  typeParameters: Array<TypeBound>
  type_: any
}

export interface TypeDeclaration extends Token {
  keyword: Token
  name: Identifier
  typeParameters: Array<TypeParameter>
  bound: Maybe<TypeBound>
}

export interface TypeParameter extends Token {
  name: Identifier
  defaultValue: TypeBound
}

export interface TypePathMemberArm {
  kind: 'Member'
  value: [Identifier]
}

export interface TypePathObjectArm {
  kind: '_Object'
  value: [Identifier, TypePath]
}

export type TypePath
  = TypePathMemberArm
  | TypePathObjectArm

export interface TypeProperty extends Token {
  name: Identifier
  typeBound: TypeBound
}

export interface VariableDeclaration extends Token {
  pattern: Pattern
  mutable: boolean
  typeBound: Maybe<TypeBound>
  initializer: Maybe<Expression>
}

export interface ExportDirective extends Token {
  keyword: Token
  expression: VariableDeclaration|FunctionDeclaration|TraitDeclaration|TypeDeclaration
  identifier: Identifier
}

export interface ImportDirective extends Token {
  importKeyword: Token
  domain: Maybe<string>
  path: string
  asKeyword: Token
  specifier: Identifier|ObjectDestructure
}

export interface IdentifierPatternArm {
  kind: 'Identifier'
  value: [Identifier]
}
export interface RecordPatternArm {
  kind: 'Record'
  value: [RecordPattern]
}
export interface RecordTypePatternArm {
  kind: 'RecordType'
  value: [TypePath, RecordPattern]
}
export interface TuplePatternArm {
  kind: 'Tuple'
  value: [TuplePattern]
}
export interface TupleTypePatternArm {
  kind: 'TupleType'
  value: [TypePath, TuplePattern]
}
export type Pattern
  = IdentifierPatternArm
  | RecordPatternArm
  | RecordTypePatternArm
  | TuplePatternArm
  | TupleTypePatternArm

export interface RecordPattern extends Token {
  properties: Array<{property: Identifier, pattern: Pattern}>
}
export interface TuplePattern extends Token {
  properties: Array<Pattern>
}

export interface AssignmentExpression extends Expression {
  lhs: Identifier|MemberAccess|IndexAccess
  token: Token
  rhs: Expression
}

export interface BinaryExpression extends Expression {
  lhs: Expression
  operator: Token
  rhs: Expression
}

export interface CallExpression extends Expression {
  func: Expression
  openParen: Token
  argumentList: Array<Expression>
  closeParen: Token
}

export interface ForExpression extends Token {
  body: Expression,
}

export interface IfExpression extends Token {
  condition: Expression
  then_: BlockNode
  else_: Maybe<BlockNode>
}

export interface IfLetExpression extends Token {
  variableDeclaration: VariableDeclaration
  then_: BlockNode
  else_: Maybe<BlockNode>
}

export interface LoopExpression extends Token {
  body: BlockNode,
}

export interface MatchExpression extends Token {
  expression: Expression
  patterns: Array<MatchArm>
}

export interface MatchArm {
  pattern: Pattern
  expression: Expression
}

export interface TypePathExpression extends Token {
  typePath: TypePath,
}

export interface UnaryExpression extends Expression {
  operator: Token
  rhs: Expression
}

export interface WhileExpression extends Token {
  condition: Expression,
  body: BlockNode,
}

export interface IndexAccess extends Expression {
  object: Expression
  index: Expression
}

export interface MemberAccess extends Expression {
  object: Expression
  member: Identifier
}

export interface BreakStatement extends Token {
  keyword: Token
}

export interface ReturnStatement extends Token {
  keyword: Token
  expression: Expression
}

export interface BooleanLiteral extends Expression {
  value: boolean
}

export interface ListLiteral extends Expression {
  members: Array<Expression>
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

export interface StringLiteralPart extends Expression {
  value: string
}

export interface StringLiteral extends Expression {
  parts: Array<StringLiteralPart|Identifier>
}

export interface TupleLiteral extends Expression {
  expressions: Array<Expression>
}
