import {Type, Implementation} from '../entities'

export type Option<T> = T | undefined

export interface SimpleToken {
  kind?: {kind: string}
  type_?: Type
}

export type Expression
  = {kind: 'JsExpression', value: string}
  | {kind: 'Identifier', value: Identifier}
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
  | {kind: 'TupleIndexAccess', value: TupleIndexAccess}
  | {kind: 'UnknownAccess', value: MemberAccess}
  | {kind: 'UnknownIndexAccess', value: IndexAccess}

  | {kind: 'BooleanLiteral', value: BooleanLiteral}
  | {kind: 'ListLiteral', value: ListLiteral}
  | {kind: 'NumberLiteral', value: NumberLiteral}
  | {kind: 'RangeLiteral', value: RangeLiteral}
  | {kind: 'RecordLiteral', value: ObjectLiteral}
  | {kind: 'StringLiteral', value: StringLiteral}
  | {kind: 'TupleLiteral', value: TupleLiteral}

export interface CommentNode extends SimpleToken {
  text: string
}

export interface BlockNode extends SimpleToken {
  statements: Array<BlockLevelStatement>
}

export interface EnumDeclaration extends SimpleToken {
  keyword: SimpleToken
  name: Identifier
  typeParameters: Array<TypeParameter>
  members: Array<TypeDeclaration>
}

export interface FunctionDeclaration extends SimpleToken {
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
  extendedTraits: Record<string, string>
}

export interface ImplShorthandDeclaration {
  type_: NamedTypeBound
  members: Array<FunctionDeclaration>
}

export interface Module extends SimpleToken {
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
  | {kind: 'ForLoop', value: ForLoop}
  | {kind: 'WhileLoop', value: WhileLoop}
  | {kind: 'Expression', value: Expression}

export interface ObjectDestructure extends SimpleToken {
  openBrace: SimpleToken
  members: Array<ObjectDestructureMember>
  closeBrace: SimpleToken
}

export interface ObjectDestructureMember extends SimpleToken {
  property: SimpleIdentifier
  local: SimpleIdentifier
}

export interface SimpleIdentifier extends SimpleToken {
  name: string
}

export interface TraitDeclaration extends SimpleToken {
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
  keyword: SimpleToken
  name: Identifier
  typeParameters: Array<TypeParameter>
  bound: Option<TypeBound>
}

export interface TypeParameter extends SimpleToken {
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

export interface TypeProperty extends SimpleToken {
  name: Identifier
  typeBound: TypeBound
}

export interface VariableDeclaration extends SimpleToken {
  pattern: Pattern
  typeBound: Option<TypeBound>
  initializer: Option<Expression>
  type_?: Type
  scope: any
}

export interface ExportDirective extends SimpleToken {
  keyword: SimpleToken
  statement:
    {kind: 'Identifier', value: Identifier} |
    {kind: 'VariableDeclaration', value: VariableDeclaration} |
    {kind: 'FunctionDeclaration', value: FunctionDeclaration} |
    {kind: 'TraitDeclaration', value: TraitDeclaration} |
    {kind: 'TypeDeclaration', value: TypeDeclaration} |
    {kind: 'EnumDeclaration', value: EnumDeclaration}
  identifier: Identifier
}

export interface ImportDirective extends SimpleToken {
  importKeyword: SimpleToken
  domain: Option<string>
  path: string
  asKeyword: SimpleToken
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

export interface RecordPattern extends SimpleToken {
  properties: Array<{property: Identifier, pattern: Pattern}>
}
export interface TuplePattern extends SimpleToken {
  properties: Array<Pattern>
}

export interface AssignmentExpression extends SimpleToken {
  lhs: Expression
  token: SimpleToken
  rhs: Expression
  call?: any
}

export interface BinaryExpression extends SimpleToken {
  lhs: Expression
  operator: SimpleToken
  rhs: Expression
  call?: any
}

export interface CallExpression extends SimpleToken {
  func: Expression
  openParen: SimpleToken
  argumentList: Array<Expression>
  closeParen: SimpleToken

  // The resolved trait function (if is trait call)
  functionType: Type
  implementation: Implementation
  traitBinding?: any
}

export interface IfExpression extends SimpleToken {
  condition: Expression
  then_: BlockNode
  else_: Option<BlockNode>
}

export interface IfLetExpression extends SimpleToken {
  pattern: Pattern
  expression: Expression
  then_: BlockNode
  else_: Option<BlockNode>

  scope: any
}

export interface MatchExpression extends SimpleToken {
  expression: Expression
  patterns: Array<MatchArm>

  scope: any
}

export interface MatchArm {
  pattern: Pattern
  block: BlockNode
}

export interface TypePathExpression extends SimpleToken {
  typePath: TypePath,
}

export interface UnaryExpression extends SimpleToken {
  operator: SimpleToken
  rhs: Expression
}

export interface ForLoop extends SimpleToken {
  pattern: Pattern,
  expression: Expression,
  body: BlockNode,
  createIterCall: CallExpression
  nextCall: CallExpression
  optionSome: TypePath
  scope: any
}

export interface WhileLoop extends SimpleToken {
  condition: Expression,
  body: BlockNode,
}

export interface IndexAccess extends SimpleToken {
  object: Expression
  index: Expression
  call?: any
}

export interface MemberAccess extends SimpleToken {
  object: Expression
  member: Identifier
}

export interface TupleIndexAccess extends SimpleToken {
  object: Expression
  index: NumberLiteral
}

export interface BreakStatement extends SimpleToken {
  keyword: SimpleToken
}

export interface ReturnStatement extends SimpleToken {
  keyword: SimpleToken
  expression: Expression
}

export interface BooleanLiteral extends SimpleToken {
  value: boolean
}

export interface ListLiteral extends SimpleToken {
  members: Array<Expression>
}

export interface NumberLiteral extends SimpleToken {
  value: number
}

export interface ObjectLiteral extends SimpleToken {
  members: Array<ObjectLiteralMember>
}

export type ObjectLiteralMember
  = {kind: 'Property', value: {name: SimpleIdentifier, value: Expression}}
  | {kind: 'Spread', value: Expression}

export interface RangeLiteral extends SimpleToken {
  start: Expression
  end: Expression

  call: CallExpression
}


export interface SimpleStringLiteral extends SimpleToken {
  value: string
}

export interface StringLiteral extends SimpleToken {
  parts: Array<StringLiteralPart>
}

export type StringLiteralPart
  = {kind: 'Literal', value: SimpleStringLiteral}
  | {kind: 'Identifier', value: Identifier}

export interface TupleLiteral extends SimpleToken {
  expressions: Array<Expression>
}
