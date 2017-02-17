'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = undefined;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _module = require('module');

var _export = require('./export');

var e = _interopRequireWildcard(_export);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var Type = function Type() {
  for (var _len = arguments.length, members = Array(_len), _key = 0; _key < _len; _key++) {
    members[_key] = arguments[_key];
  }

  return members;
};
var Trait = {
  inner: function inner() {
    var self = this;
    return self;
  }
};
Trait["$impl_test/cases/modules/import.puck:Trait$test/cases/modules/export.puck:Type"] = {
  inner: Trait.inner
};
_export.Trait["$impl_test/cases/modules/export.puck:Trait$test/cases/modules/import.puck:Type"] = {
  _static: _export.Trait._static,
  implemented: function implemented() {},
  _default: _export.Trait._default
};
var foo = exports.foo = e.b + _module.a + _export.b + _module.b;
var q = "not imported";
var f = [1];
var h = (0, _export.Type)(2);
_export.Trait["$impl_test/cases/modules/export.puck:Trait$test/cases/modules/export.puck:Type"]._default.call({ type: '$impl_test/cases/modules/export.puck:Trait$test/cases/modules/export.puck:Type', value: _export.Trait._static(), $isTraitObject: true });
_export.Trait["$impl_test/cases/modules/export.puck:Trait$test/cases/modules/export.puck:Type"]._default.call({ type: '$impl_test/cases/modules/export.puck:Trait$test/cases/modules/export.puck:Type', value: f, $isTraitObject: true });
_export.Trait["$impl_test/cases/modules/export.puck:Trait$test/cases/modules/export.puck:Type"].implemented.call({ type: '$impl_test/cases/modules/export.puck:Trait$test/cases/modules/export.puck:Type', value: f, $isTraitObject: true });
_export.OtherTrait["$impl_test/cases/modules/export.puck:OtherTrait$test/cases/modules/export.puck:Type"].other.call({ type: '$impl_test/cases/modules/export.puck:OtherTrait$test/cases/modules/export.puck:Type', value: f, $isTraitObject: true });
var i = (0, _export.Type)(3);
var j = e.Enum.A;
