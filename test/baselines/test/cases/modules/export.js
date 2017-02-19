'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.q = exports.b = exports.OtherTrait = exports.Trait = exports.Enum = exports.Type = undefined;
exports.a = a;

var _core = require('puck-lang/dist/lib/stdlib/core');

var Type = exports.Type = function Type() {
  for (var _len = arguments.length, members = Array(_len), _key = 0; _key < _len; _key++) {
    members[_key] = arguments[_key];
  }

  return members;
};
var Enum = exports.Enum = {
  A: { kind: 'A', value: Symbol('A') },
  B: { kind: 'B', value: Symbol('B') }
};
var Trait = exports.Trait = {
  _static: function _static() {
    return Type(5);
  },
  _default: function _default() {
    var self = this;
    (0, _core.print)(self);
  }
};
var OtherTrait = exports.OtherTrait = {
  other: function other() {}
};
Trait["$impl_test/cases/modules/export.puck:Trait$test/cases/modules/export.puck:Type"] = {
  _static: Trait._static,
  implemented: function implemented() {},
  _default: Trait._default
};
OtherTrait["$impl_test/cases/modules/export.puck:OtherTrait$test/cases/modules/export.puck:Type"] = {
  other: OtherTrait.other
};
function a() {
  return "exported!";
};
var b = exports.b = "exported";
var q = exports.q = "";
