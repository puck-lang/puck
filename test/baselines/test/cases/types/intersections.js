'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
var Record = (object) => object;
var Tuple = (member) => member;
$puck_1.Concat["$impl_Concat$test/cases/types/intersections.puck:Record"] = {
concat: function (rhs) {
  const self = this;
  return self.value.a + rhs;
}
};
$puck_1.Ord["$impl_lib/stdlib/core.puck:Ord$test/cases/types/intersections.puck:Record"] = {
cmp: function (other) {
  const self = this;
  return $puck_1.Ord["$impl_lib/stdlib/core.puck:Ord$String"].cmp.call({type: '$impl_lib/stdlib/core.puck:Ord$String', value: self.value.a, $isTraitObject: true}, {type: '$impl_lib/stdlib/core.puck:Ord$String', value: other.value.a, $isTraitObject: true});
}
};
$puck_1.Concat["$impl_Concat$test/cases/types/intersections.puck:Tuple"] = {
concat: function (rhs) {
  const self = this;
  return self.value + rhs;
}
};
$puck_1.Ord["$impl_lib/stdlib/core.puck:Ord$test/cases/types/intersections.puck:Tuple"] = {
cmp: function (other) {
  const self = this;
  return $puck_1.Ord["$impl_lib/stdlib/core.puck:Ord$String"].cmp.call({type: '$impl_lib/stdlib/core.puck:Ord$String', value: self.value, $isTraitObject: true}, {type: '$impl_lib/stdlib/core.puck:Ord$String', value: other.value, $isTraitObject: true});
}
};
const withNamed = {traits: {'Concat': '$impl_Concat$String'}, value: "", $isTraitObject: true};
const withRecord = {traits: {'Concat': '$impl_Concat$test/cases/types/intersections.puck:Record'}, value: Record({a: ""}), $isTraitObject: true};
const withTuple = {traits: {'Concat': '$impl_Concat$test/cases/types/intersections.puck:Tuple'}, value: Tuple(""), $isTraitObject: true};
const multipleNamed = {traits: {'lib/stdlib/core.puck:Ord': '$impl_lib/stdlib/core.puck:Ord$String','Concat': '$impl_Concat$String'}, value: "", $isTraitObject: true};
const multipleRecord = {traits: {'lib/stdlib/core.puck:Ord': '$impl_lib/stdlib/core.puck:Ord$test/cases/types/intersections.puck:Record','Concat': '$impl_Concat$test/cases/types/intersections.puck:Record'}, value: Record({a: ""}), $isTraitObject: true};
const multipleTuple = {traits: {'lib/stdlib/core.puck:Ord': '$impl_lib/stdlib/core.puck:Ord$test/cases/types/intersections.puck:Tuple','Concat': '$impl_Concat$test/cases/types/intersections.puck:Tuple'}, value: Tuple(""), $isTraitObject: true};
function returnValue1() {
  return {traits: {'Concat': '$impl_Concat$test/cases/types/intersections.puck:Tuple'}, value: Tuple(""), $isTraitObject: true};
};
function returnValue2() {
  return {traits: {'Concat': '$impl_Concat$test/cases/types/intersections.puck:Tuple'}, value: Tuple(""), $isTraitObject: true};
};
const useOperator1 = $puck_1.Concat["$impl_Concat$String"].concat.call({type: '$impl_Concat$String', value: withNamed.value, $isTraitObject: true}, "");
const useOperator4 = $puck_1.Concat["$impl_Concat$String"].concat.call({type: '$impl_Concat$String', value: multipleNamed.value, $isTraitObject: true}, "");
const useTraitFromBase1 = $puck_1.String.contains.call(withNamed.value, "");
const useTraitFromBase2 = $puck_1.String.contains.call(multipleNamed.value, "");
const useTraitFromTrait1 = $unwrapTraitObject($puck_1.Concat[withRecord.type].concat.call({type: withRecord.traits['Concat'], value: withRecord.value, $isTraitObject: true}, ""));
const useTraitFromTrait2 = $unwrapTraitObject($puck_1.Concat[withTuple.type].concat.call({type: withTuple.traits['Concat'], value: withTuple.value, $isTraitObject: true}, ""));
const useTraitFromTrait3 = $unwrapTraitObject($puck_1.Concat[multipleRecord.type].concat.call({type: multipleRecord.traits['Concat'], value: multipleRecord.value, $isTraitObject: true}, ""));
const useTraitFromTrait4 = $unwrapTraitObject($puck_1.Concat[multipleTuple.type].concat.call({type: multipleTuple.traits['Concat'], value: multipleTuple.value, $isTraitObject: true}, ""));
const useTraitFromTrait5 = $puck_1.Ord[multipleRecord.type].cmp.call({type: multipleRecord.traits['lib/stdlib/core.puck:Ord'], value: multipleRecord.value, $isTraitObject: true}, {type: multipleRecord.traits['lib/stdlib/core.puck:Ord'], value: multipleRecord.value, $isTraitObject: true});
const useTraitFromTrait6 = $puck_1.Ord[multipleTuple.type].cmp.call({type: multipleTuple.traits['lib/stdlib/core.puck:Ord'], value: multipleTuple.value, $isTraitObject: true}, {type: multipleTuple.traits['lib/stdlib/core.puck:Ord'], value: multipleTuple.value, $isTraitObject: true});
const useTraitFromBaseAndTrait1 = $puck_1.Ord["$impl_lib/stdlib/core.puck:Ord$String"].cmp.call({type: '$impl_lib/stdlib/core.puck:Ord$String', value: multipleNamed.value, $isTraitObject: true}, {type: '$impl_lib/stdlib/core.puck:Ord$String', value: "", $isTraitObject: true});
const useProperty1 = withRecord.value.a;
const useProperty2 = withTuple.value;
const useProperty3 = multipleRecord.value.a;
const useProperty4 = multipleTuple.value;
const assingBase1 = withNamed.value;
const assingBase2 = withRecord.value;
const assingBase3 = withRecord.value;
const assingBase4 = withTuple.value;
const assingBase5 = withTuple.value;
const assingBase6 = multipleNamed.value;
const assingBase7 = multipleRecord.value;
const assingBase8 = multipleRecord.value;
const assingBase9 = multipleTuple.value;
const assingBase10 = multipleTuple.value;
const assingTrait1 = {type: '$impl_Concat$String', value: withNamed.value, $isTraitObject: true};
const assingTrait2 = {type: withRecord.traits['Concat'], value: withRecord.value, $isTraitObject: true};
const assingTrait3 = {type: withTuple.traits['Concat'], value: withTuple.value, $isTraitObject: true};
const assingTrait4 = {type: '$impl_Concat$String', value: multipleNamed.value, $isTraitObject: true};
const assingTrait5 = {type: '$impl_lib/stdlib/core.puck:Ord$String', value: withNamed.value, $isTraitObject: true};
const assingTrait6 = {type: '$impl_lib/stdlib/core.puck:Ord$String', value: multipleNamed.value, $isTraitObject: true};
const assingTrait7 = {type: multipleRecord.traits['lib/stdlib/core.puck:Ord'], value: multipleRecord.value, $isTraitObject: true};
const assingTrait8 = {type: multipleTuple.traits['lib/stdlib/core.puck:Ord'], value: multipleTuple.value, $isTraitObject: true};
const assingTrait9 = {type: '$impl_Concat$test/cases/types/intersections.puck:Tuple', value: returnValue1().value, $isTraitObject: true};
let $puck_2 = returnValue2();
const assingTrait10 = {type: $puck_2.traits['Concat'], value: $puck_2.value, $isTraitObject: true};
const assingTrait11 = {type: '$impl_lib/stdlib/core.puck:Ord$test/cases/types/intersections.puck:Tuple', value: returnValue1().value, $isTraitObject: true};
const assingTrait12 = {type: '$impl_lib/stdlib/core.puck:Ord$test/cases/types/intersections.puck:Tuple', value: Tuple(""), $isTraitObject: true}
