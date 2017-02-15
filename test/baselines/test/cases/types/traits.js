'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenericSelf = exports.Generic = exports.SelfAware = exports.Functions = exports.Empty = exports.GenericType = exports.FunctionsType = exports.EmptyType = undefined;

var _core = require('puck-lang/dist/lib/stdlib/core');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};
var EmptyType = exports.EmptyType = function EmptyType(object) {
  return object;
};
var FunctionsType = exports.FunctionsType = function FunctionsType(object) {
  return object;
};
var GenericType = exports.GenericType = function GenericType(object) {
  return object;
};
var Empty = exports.Empty = {};
var Functions = exports.Functions = {
  withBody: function withBody(a) {
    var self = this;
    var b = a;
    return b;
  }
};
var SelfAware = exports.SelfAware = {
  _static: function _static() {
    return 5;
  },
  withImmutableSelf: function withImmutableSelf(a) {
    var self = this;
    return a;
  },
  withMutableSelf: function withMutableSelf() {
    var self = this;
    return self;
  }
};
var Generic = exports.Generic = {};
var GenericSelf = exports.GenericSelf = {
  genericSelf2: function genericSelf2(a) {
    var self = this;
    return $unwrapTraitObject(GenericSelf[self.type].genericSelf.call(self, a));
  }
};
Empty["$impl_test/cases/types/traits.puck:Empty$test/cases/types/traits.puck:EmptyType"] = {};
Functions["$impl_test/cases/types/traits.puck:Functions$test/cases/types/traits.puck:EmptyType"] = {
  noBody: function noBody() {
    return 5;
  },
  withBody: Functions.withBody
};
Functions["$impl_test/cases/types/traits.puck:Functions$test/cases/types/traits.puck:FunctionsType"] = {
  noBody: function noBody() {
    return 5;
  },
  withBody: function withBody(a) {
    var self = this;
    return self.value.name;
  }
};
Generic["$impl_test/cases/types/traits.puck:Generic$test/cases/types/traits.puck:GenericType"] = {
  generic: function generic(a) {
    var self = this;
    return $unwrapTraitObject(a);
  }
};
GenericSelf["$impl_test/cases/types/traits.puck:GenericSelf$test/cases/types/traits.puck:GenericType"] = {
  genericSelf: function genericSelf(a) {
    var self = this;
    return a.value;
  },
  genericSelf2: GenericSelf.genericSelf2
};
Generic["$impl_test/cases/types/traits.puck:Generic$test/cases/types/traits.puck:GenericType$1"] = {
  generic: function generic(a) {
    var self = this;
    return a + a;
  }
};
SelfAware["$impl_test/cases/types/traits.puck:SelfAware$test/cases/types/traits.puck:FunctionsType"] = {
  _static: SelfAware._static,
  withImmutableSelf: SelfAware.withImmutableSelf,
  withMutableSelf: SelfAware.withMutableSelf
};
Functions.noBody();
var func = { name: "func" };
Functions["$impl_test/cases/types/traits.puck:Functions$test/cases/types/traits.puck:FunctionsType"].withBody.call({ type: '$impl_test/cases/types/traits.puck:Functions$test/cases/types/traits.puck:FunctionsType', value: func, $isTraitObject: true }, "body");
var mutFunc = func;
SelfAware["$impl_test/cases/types/traits.puck:SelfAware$test/cases/types/traits.puck:FunctionsType"].withMutableSelf.call({ type: '$impl_test/cases/types/traits.puck:SelfAware$test/cases/types/traits.puck:FunctionsType', value: mutFunc, $isTraitObject: true });
var genericNum = {};
Generic["$impl_test/cases/types/traits.puck:Generic$test/cases/types/traits.puck:GenericType"].generic.call({ type: '$impl_test/cases/types/traits.puck:Generic$test/cases/types/traits.puck:GenericType', value: genericNum, $isTraitObject: true }, 5);
var genericString = {};
Generic["$impl_test/cases/types/traits.puck:Generic$test/cases/types/traits.puck:GenericType$1"].generic.call({ type: '$impl_test/cases/types/traits.puck:Generic$test/cases/types/traits.puck:GenericType$1', value: genericString, $isTraitObject: true }, "hello");
