import {Type, Implementation} from '../entities'

export type Option<T> = T | undefined

export interface Token {
  kind?: {kind: string}
  type_?: Type
}

export type Expression
  = {kind: 'JsExpression', value: string}
  | {kind: 'Identifier', value: Identifier}
  | {kind: 'ThrowStatement', value: any}
  | {kind: 'FunctionDeclaration', value: FunctionDeclaration}
  | {kind: 'VariableDeclaration', value: VariableDeclaration}

  | {kind: 'AssignmentExpression', value: AssignmentExpression}
  | {kind: 'BinaryExpression', value: BinaryExpression}
  | {kind: 'CallExpression', value: CallExpression}
  | {kind: 'IfExpression', value: IfExpression}
  | {kind: 'IfLetExpression', value: IfLetExpression}
  | {kind: 'MatchExpression', value: MatchExpression}
  | {kind: 'TypePathExpression', value: TypePathExpression}
  | {kind: 'UnaryExpression', value: UnaryExpression}

  | {kind: 'IndexAccess', value: IndexAccess}
  | {kind: 'MemberAccess', value: MemberAccess}
  | {kind: 'UnknownAccess', value: MemberAccess}
  | {kind: 'UnknownIndexAccess', value: IndexAccess}

  | {kind: 'BooleanLiteral', value: BooleanLiteral}
  | {kind: 'ListLiteral', value: ListLiteral}
  | {kind: 'NumberLiteral', value: NumberLiteral}
  | {kind: 'RecordLiteral', value: ObjectLiteral}
  | {kind: 'StringLiteral', value: StringLiteral}
  | {kind: 'TupleLiteral', value: TupleLiteral}

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
  trait_: NamedTypeBound
  type_: NamedTypeBound
  members: Array<FunctionDeclaration>
}

export interface ImplShorthandDeclaration {
  type_: NamedTypeBound
  members: Array<FunctionDeclaration>
}

export interface Module extends Token {
  fileName: string
  path: string
  exports: {[name: string]: ExportDirective}
  statements: Array<
    {kind: 'EnumDeclaration', value: EnumDeclaration}
  | {kind: 'TypeDeclaration', value: TypeDeclaration}
  | {kind: 'ImplDeclaration', value: ImplDeclaration}
  | {kind: 'ImplShorthandDeclaration', value: ImplShorthandDeclaration}
  | {kind: 'BlockLevelStatement', value: BlockLevelStatement}
  | {kind: 'TraitDeclaration', value: TraitDeclaration}
  | {kind: 'ImportDirective', value: ImportDirective}
  | {kind: 'ExportDirective', value: ExportDirective}
  >
}

export type BlockLevelStatement
  = {kind: 'Block', value: BlockNode}
  | {kind: 'BreakStatement', value: BreakStatement}
  | {kind: 'ReturnStatement', value: ReturnStatement}
  | {kind: 'WhileLoop', value: WhileLoop}
  | {kind: 'Expression', value: Expression}

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
  value: {
    path: TypePath
    typeParameters: Array<TypeBound>
    properties: Array<TypeBound>
    type_: Type
  }
}

export type NamedTypeBound = {
  path: TypePath
  typeParameters: Array<TypeBound>
  type_: Type
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
  value: Identifier
  type_?: Type
}

export interface TypePathObjectArm {
  kind: '_Object'
  value: [Identifier, TypePath]
  binding?: any
  type_?: Type
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
  typeBound: Option<TypeBound>
  initializer: Option<Expression>
  type_?: Type
  scope: any
}

export interface ExportDirective extends Token {
  keyword: Token
  statement:
    {kind: 'Identifier', value: Identifier} |
    {kind: 'VariableDeclaration', value: VariableDeclaration} |
    {kind: 'FunctionDeclaration', value: FunctionDeclaration} |
    {kind: 'TraitDeclaration', value: TraitDeclaration} |
    {kind: 'TypeDeclaration', value: TypeDeclaration} |
    {kind: 'EnumDeclaration', value: EnumDeclaration}
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
  = {kind: 'ObjectDestructure', value: ObjectDestructure}
  | {kind: 'Identifier', value: Identifier}

export interface IdentifierPatternArm {
  kind: 'Identifier'
  value: {identifier: Identifier, mutable: true}
}
export interface RecordPatternArm {
  kind: 'Record'
  value: RecordPattern
}
export interface RecordTypePatternArm {
  kind: 'RecordType'
  value: [TypePath, RecordPattern]
}
export interface TuplePatternArm {
  kind: 'Tuple'
  value: TuplePattern
}
export interface TupleTypePatternArm {
  kind: 'TupleType'
  value: [TypePath, TuplePattern]
}
export interface UnitPatternArm {
  kind: 'UnitType'
  value: TypePath
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
  call?: any
}

export interface BinaryExpression extends Token {
  lhs: Expression
  operator: Token
  rhs: Expression
  call?: any
}

export interface CallExpression extends Token {
  func: Expression
  openParen: Token
  argumentList: Array<Expression>
  closeParen: Token

  // The resolved trait function (if is trait call)
  functionType: Type
  implementation: Implementation
  traitBinding?: any
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
  call?: any
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

export type ObjectLiteralMember
  = {kind: 'Property', value: {name: SimpleIdentifier, value: Expression}}
  | {kind: 'Spread', value: Expression}

export interface SimpleStringLiteral extends Token {
  value: string
}

export interface StringLiteral extends Token {
  parts: Array<StringLiteralPart>
}

export type StringLiteralPart
  = {kind: 'Literal', value: SimpleStringLiteral}
  | {kind: 'Identifier', value: Identifier}

export interface TupleLiteral extends Token {
  expressions: Array<Expression>
}
