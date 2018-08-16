import {Option} from './compiler/ast'

export class Type {
  static displayName(this: Type): string
  static verboseName(this: Type): string
  static isEmpty(): boolean
  id: Option<String>

  kind: {
    kind:
      | 'Enum'
      | 'Function'
      | 'Intersection'
      | 'Parameter'
      | 'Struct'
      | 'Trait'
    value: {
      members: {[name: string]: Type}
      functions: {[name: string]: Type}
      parameters: Array<{type_: Type}>
      selfBinding: Option<{type_: Type}>
      kind: Record | Tuple | {kind: 'Unit'}
      returnType: Type
      baseType: Type
      intersectedTrait: Type
    }
  }

  providesType: Option<Type>
  instance: Option<{
    typeParameters: Array<Type>
  }>

  enumMember: Option<[string, Type]>
}

export type Record = {
  kind: 'Record'
  value: {
    properties: {[name: string]: {type_: Type}}
  }
}

export type Tuple = {
  kind: 'Tuple'
  value: {
    properties: Type[]
  }
}

export type Implementation = {
  type_: Type
  trait_: Type
  id: string
}
