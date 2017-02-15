import {Type, Implementation} from '../entities'
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
  MinusGreaterThanToken,
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
  ImplShorthandDeclaration,
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
  MatchExpression,
  TypePathExpression,
  UnaryExpression,
  WhileLoop,

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
  '->': SyntaxKind.MinusGreaterThanToken,
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
  '=>', '->',
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

export function isExport(token): token is ExportDirective {
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

export type Option<T>
  = {
      kind: 'Some'
      value: [T]
    }
  | {
      kind: 'None'
    }

export interface Token {
  kind?: SyntaxKind
  type_?: Type
}

export type Expression
  = {kind: 'Identifier', value: [Identifier]}
  | {kind: 'ThrowStatement', value: [any]}
  | {kind: 'FunctionDeclaration', value: [FunctionDeclaration]}
  | {kind: 'VariableDeclaration', value: [VariableDeclaration]}

  | {kind: 'AssignmentExpression', value: [AssignmentExpression]}
  | {kind: 'BinaryExpression', value: [BinaryExpression]}
  | {kind: 'CallExpression', value: [CallExpression]}
  | {kind: 'IfExpression', value: [IfExpression]}
  | {kind: 'IfLetExpression', value: [IfLetExpression]}
  | {kind: 'MatchExpression', value: [MatchExpression]}
  | {kind: 'TypePathExpression', value: [TypePathExpression]}
  | {kind: 'UnaryExpression', value: [UnaryExpression]}

  | {kind: 'IndexAccess', value: [IndexAccess]}
  | {kind: 'MemberAccess', value: [MemberAccess]}

  | {kind: 'BooleanLiteral', value: [BooleanLiteral]}
  | {kind: 'ListLiteral', value: [ListLiteral]}
  | {kind: 'NumberLiteral', value: [NumberLiteral]}
  | {kind: 'RecordLiteral', value: [ObjectLiteral]}
  | {kind: 'StringLiteral', value: [StringLiteral]}
  | {kind: 'TupleLiteral', value: [TupleLiteral]}

export interface CommentNode extends Token {
  text: string
}

export interface BlockNode extends Token {
  statements: Array<BlockLevelStatement>
}

export interface EnumDeclaration extends Token {
  keyword: Token
  name: Identifier
  typeParameters: Array<TypeParameter>
  members: Array<TypeDeclaration>
}

export interface FunctionDeclaration extends Token {
  name: Option<Identifier>
  parameterList: Array<VariableDeclaration>
  returnType: Option<TypeBound>
  body: Option<BlockNode>

  traitFunctionType: Type
}

export interface Identifier extends SimpleIdentifier {
  name: string
}

export interface ImplDeclaration {
  implementation: Implementation
  trait_: TypeBound
  type_: TypeBound
  members: Array<FunctionDeclaration>
}

export interface ImplShorthandDeclaration {
  type_: TypeBound
  members: Array<FunctionDeclaration>
}

export interface Module extends Token {
  fileName: string
  path: string
  exports: {[name: string]: ExportDirective}
  statements: Array<
    {kind: 'EnumDeclaration', value: [EnumDeclaration]} |
    {kind: 'TypeDeclaration', value: [TypeDeclaration]} |
    {kind: 'ImplDeclaration', value: [ImplDeclaration]} |
    {kind: 'ImplShorthandDeclaration', value: [ImplShorthandDeclaration]} |
    {kind: 'BlockLevelStatement', value: [BlockLevelStatement]} |
    {kind: 'TraitDeclaration', value: [TraitDeclaration]}
  | {kind: 'ImportDirective', value: [ImportDirective]}
  | {kind: 'ExportDirective', value: [ExportDirective]}
  >
}

export type BlockLevelStatement
  = {kind: 'Block', value: [BlockNode]}
  | {kind: 'BreakStatement', value: [BreakStatement]}
  | {kind: 'ReturnStatement', value: [ReturnStatement]}
  | {kind: 'WhileLoop', value: [WhileLoop]}
  | {kind: 'Expression', value: [Expression]}

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

export type TypeBound = {
  kind: 'NamedTypeBound'|'RecordTypeBound'|'TupleTypeBound',
  value: [{
    path: TypePath
    typeParameters: Array<TypeBound>
    type_: Type
  }]
}

export interface TypeDeclaration {
  keyword: Token
  name: Identifier
  typeParameters: Array<TypeParameter>
  bound: Option<TypeBound>
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
  typeBound: Option<TypeBound>
  initializer: Option<Expression>
  type_?: Type
  scope: any
}

export interface ExportDirective extends Token {
  keyword: Token
  statement:
    {kind: 'VariableDeclaration', value: [VariableDeclaration]} |
    {kind: 'FunctionDeclaration', value: [FunctionDeclaration]} |
    {kind: 'TraitDeclaration', value: [TraitDeclaration]} |
    {kind: 'TypeDeclaration', value: [TypeDeclaration]} |
    {kind: 'EnumDeclaration', value: [EnumDeclaration]}
  identifier: Identifier
}

export interface ImportDirective extends Token {
  importKeyword: Token
  domain: Option<string>
  path: string
  asKeyword: Token
  specifier: ImportSpecifier
}

export type ImportSpecifier
  = {kind: 'ObjectDestructure', value: [ObjectDestructure]}
  | {kind: 'Identifier', value: [Identifier]}

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
export interface UnitPatternArm {
  kind: 'UnitType'
  value: [TypePath]
}
export interface CatchAllPatternArm {
  kind: 'CatchAll'
  value: [undefined]
}
export type Pattern
  = IdentifierPatternArm
  | RecordPatternArm
  | RecordTypePatternArm
  | TuplePatternArm
  | TupleTypePatternArm
  | UnitPatternArm
  | CatchAllPatternArm

export interface RecordPattern extends Token {
  properties: Array<{property: Identifier, pattern: Pattern}>
}
export interface TuplePattern extends Token {
  properties: Array<Pattern>
}

export interface AssignmentExpression extends Token {
  lhs: Expression
  token: Token
  rhs: Expression
}

export interface BinaryExpression extends Token {
  lhs: Expression
  operator: Token
  rhs: Expression
}

export interface CallExpression extends Token {
  func: Expression
  openParen: Token
  argumentList: Array<Expression>
  closeParen: Token

  // The resolved trait function (if is trait call)
  functionType: Type
  implementation: Implementation
}

export interface ForExpression extends Token {
  body: Expression,
}

export interface IfExpression extends Token {
  condition: Expression
  then_: BlockNode
  else_: Option<BlockNode>
}

export interface IfLetExpression extends Token {
  pattern: Pattern
  expression: Expression
  then_: BlockNode
  else_: Option<BlockNode>

  scope: any
}

export interface MatchExpression extends Token {
  expression: Expression
  patterns: Array<MatchArm>

  scope: any
}

export interface MatchArm {
  pattern: Pattern
  block: BlockNode
}

export interface TypePathExpression extends Token {
  typePath: TypePath,
}

export interface UnaryExpression extends Token {
  operator: Token
  rhs: Expression
}

export interface WhileLoop extends Token {
  condition: Expression,
  body: BlockNode,
}

export interface IndexAccess extends Token {
  object: Expression
  index: Expression
}

export interface MemberAccess extends Token {
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

export interface BooleanLiteral extends Token {
  value: boolean
}

export interface ListLiteral extends Token {
  members: Array<Expression>
}

export interface NumberLiteral extends Token {
  value: number
}

export interface ObjectLiteral extends Token {
  members: Array<ObjectLiteralMember>
}

export interface ObjectLiteralMember extends Token {
  name: SimpleIdentifier
  value: Expression
}

export interface SimpleStringLiteral extends Token {
  value: string
}

export interface StringLiteral extends Token {
  parts: Array<StringLiteralPart>
}

export type StringLiteralPart
  = {kind: 'Literal', value: [SimpleStringLiteral]}
  | {kind: 'Identifier', value: [Identifier]}

export interface TupleLiteral extends Token {
  expressions: Array<Expression>
}
