'use strict';
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
var Type = (object) => object;
var Trait = {
a: function () {}
};
Trait["$impl_test/cases/types/impl.puck:Trait$test/cases/types/impl.puck:Type"] = {
a: function () {}
};
Type.isAnswer = function () {
  const self = this;
  return self.value == 42;
};
Type.isNegative = function (other) {
  const self = this;
  return {value: self.value + other.value};
};
Type.isAnswer2 = function () {
  const self = this;
  return Type.isAnswer.call(self);
};
const type_ = {value: 42};
Type.isAnswer.call(type_)
