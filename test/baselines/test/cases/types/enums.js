'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnumTrait = undefined;

var _core = require('puck-lang/dist/lib/stdlib/core');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};

var Enum = {
  A: function A(object) {
    return { kind: 'A', value: object };
  }
};
var EnumTrait = exports.EnumTrait = {
  getB: function getB() {
    var self = this;
    return $unwrapTraitObject(self.value.value).b;
  }
};
EnumTrait["$impl_test/cases/types/enums.puck:EnumTrait$test/cases/types/enums.puck:Enum"] = {
  getB: EnumTrait.getB
};
var five = (0, _core.Some)(5);
var nothing = _core.None;
var maybeFive = _core.Option.Some(5);
var maybeNothing = _core.Option.None;
var a = Enum.A({ b: 5 });
EnumTrait["$impl_test/cases/types/enums.puck:EnumTrait$test/cases/types/enums.puck:Enum"].getB.call({ type: '$impl_test/cases/types/enums.puck:EnumTrait$test/cases/types/enums.puck:Enum', value: a, $isTraitObject: true });
