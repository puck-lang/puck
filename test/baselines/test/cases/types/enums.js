'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.EnumTraitundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
var Enum = {
A: (object) => ({kind: 'A', value: object}),
};
var EnumTrait = exports.EnumTrait = {
getB: function () {
  const self = this;
  return $unwrapTraitObject(self.value.value.b);
}
};
EnumTrait["$impl_test/cases/types/enums.puck:EnumTrait$test/cases/types/enums.puck:Enum"] = {
getB: EnumTrait.getB
};
const five = $puck_1.Some(5);
const nothing = $puck_1.None;
const maybeFive = $puck_1.Option.Some(5);
const maybeNothing = $puck_1.Option.None;
const a = Enum.A({b: 5});
EnumTrait["$impl_test/cases/types/enums.puck:EnumTrait$test/cases/types/enums.puck:Enum"].getB.call({type: '$impl_test/cases/types/enums.puck:EnumTrait$test/cases/types/enums.puck:Enum', value: a, $isTraitObject: true})
