import {Implementation, Type} from '../../entities'
import {Option} from '../../compiler/ast'

export function getImplementationForTrait(type_: Type, trait_: Type): {kind: 'Ok', value: [Option<Implementation>]}
