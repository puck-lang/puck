import {Implementation, Type} from '../../entities'

export function getImplementationsForInstance(type_: Type): Array<Implementation>

export function getImplementationsForTrait(type_: Type, trait_: Type, implementations: Array<Implementation>): Array<Implementation>

export function getMostSpecificImplementations(type_: Type, implementations: Array<Implementation>): Array<Implementation>
