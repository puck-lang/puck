'use strict';
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
var Thing = (object) => object;
var Ord = {
gt: function (a, b) {
  const self = this;
  return $puck_1.PartialOrd[a.type].gt.call(a, b) && $puck_1.PartialOrd[a.type].gt.call(a, b);
}
};
Ord["$impl_test/cases/types/fn-where.puck:Ord$List"] = {
gt: Ord.gt
};
Thing.subZero = function () {
  const self = this;
  let $puck_2 = self.value
;
  let $puck_3 = self.value
;
  return $puck_1.PartialOrd[$puck_2.type].gt.call($puck_2, 0) && $puck_1.PartialOrd[$puck_3.type].lt.call(self.value, 0);
};
Thing.subZeroNum = function () {
  const self = this;
  return true;
};
function gt(a, b) {
  return $puck_1.PartialOrd[a.type].gt.call(a, b) && $puck_1.PartialOrd[a.type].gt.call(a, b);
};
gt(1, 2);
gt("1", "2");
const list = {type: '$impl_test/cases/types/fn-where.puck:Ord$List', value: [
  5,
  3,
], $isTraitObject: true};
Ord[list.type].gt.call(list, 1, 2);
function combine(a, b) {
  $puck_1.Concat[b.type].concat.call(b, b);
  $puck_1.Concat[b.type].concat.call(b, b);
  return $puck_1.PartialOrd[a.type].gt.call(a, a) && $puck_1.PartialOrd[a.type].gt.call(a, a);
};
combine("", "");
combine(5, "");
const thing = Thing({value: 1});
Thing.subZero.call(thing);
Thing.subZeroNum.call(thing)
// TODO: Check correctness?
