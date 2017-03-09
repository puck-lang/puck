'use strict';
exports.Type = exports.Enum = exports.Trait = exports.OtherTrait = exports.a = exports.b = exports.q = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
var Type = exports.Type = (...members) => members;
var Enum = exports.Enum = {
A: {kind: 'A', value: Symbol('A')},
B: {kind: 'B', value: Symbol('B')},
};
var Trait = exports.Trait = {
_static: function () {
  return Type(5);
},
_default: function () {
  const self = this;
  $puck_1.print(self);
}
};
var OtherTrait = exports.OtherTrait = {
other: function () {}
};
Trait["$impl_test/cases/modules/export.puck:Trait$test/cases/modules/export.puck:Type"] = {
_static: Trait._static,
implemented: function () {},
_default: Trait._default
};
OtherTrait["$impl_test/cases/modules/export.puck:OtherTrait$test/cases/modules/export.puck:Type"] = {
other: OtherTrait.other
};
function a() {
  return "exported!";
};
exports.a = a;
var b = exports.b = "exported";
var q = exports.q = ""
