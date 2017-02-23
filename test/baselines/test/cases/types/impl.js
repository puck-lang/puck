'use strict';

var _core = require('puck-lang/dist/lib/stdlib/core');

var Type = function Type(object) {
  return object;
};
var Trait = {
  a: function a() {}
};
Trait["$impl_test/cases/types/impl.puck:Trait$test/cases/types/impl.puck:Type"] = {
  a: function a() {}
};
Type.isAnswer = function () {
  var self = this;
  return self.value == 42;
};
Type.isNegative = function (other) {
  var self = this;
  return { value: self.value + other.value };
};
Type.isAnswer2 = function () {
  var self = this;
  return Type.isAnswer.call(self);
};
var type_ = { value: 42 };
Type.isAnswer.call(type_);
