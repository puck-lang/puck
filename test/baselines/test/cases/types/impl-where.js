'use strict';
exports.Order = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
var Order = exports.Order = {

};
Order["$impl_test/cases/types/impl-where.puck:Order$List"] = {
order: function () {
  const self = this;
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].toList.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self.value, $isTraitObject: true});
}
};
Order["$impl_test/cases/types/impl-where.puck:Order$List"].order.call({type: '$impl_test/cases/types/impl-where.puck:Order$List', value: [
  1,
  2,
], $isTraitObject: true});
Order["$impl_test/cases/types/impl-where.puck:Order$List"].order.call({type: '$impl_test/cases/types/impl-where.puck:Order$List', value: [
  "a",
  "b",
], $isTraitObject: true})
