import {Option} from './compiler/ast'

export class Type {
  static displayName(): string
  static isEmpty(): boolean
  id: Option<String>

  kind: {
    kind: string
    value: [{
      functions: {[name: string]: Type}
      parameters: Array<{type_: Type}>
      selfBinding: Option<{type_: Type}>
      kind: Record | Tuple | {kind: 'Unit'}
      returnType: Type
    }]
  }

  instance: Option<{
    typeParameters: Array<Type>
  }>
}

export type Record = {
  kind: 'Record'
  value: [{
    properties: {[name: string]: Type}
  }]
}

export type Tuple = {
  kind: 'Tuple'
  value: [{
    properties: Type[]
  }]
}

export type Implementation = {
  type_: Type
  trait_: Type
  id: string
}
