'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenericSelf = exports.Generic = exports.SelfAware = exports.Functions = exports.Empty = exports.GenericType = exports.FunctionsType = exports.EmptyType = undefined;

var _core = require('puck-lang/dist/lib/stdlib/core');

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
    return self.genericSelf(a);
  }
};
Empty['$EmptyType'] = {};
Functions['$EmptyType'] = {
  noBody: function noBody() {
    return 5;
  },
  withBody: Functions.withBody
};
Functions['$FunctionsType'] = {
  noBody: function noBody() {
    return 5;
  },
  withBody: function withBody(a) {
    var self = this;
    return self.name;
  }
};
Generic['$GenericType<T>'] = {
  generic: function generic(a) {
    return a;
  }
};
GenericSelf['$GenericType<String>'] = {
  genericSelf: function genericSelf(a) {
    var self = this;
    return a;
  },
  genericSelf2: GenericSelf.genericSelf2
};
Generic['$GenericType<String>'] = {
  generic: function generic(a) {
    return a + a;
  }
};
SelfAware['$FunctionsType'] = {
  _static: SelfAware._static,
  withImmutableSelf: SelfAware.withImmutableSelf,
  withMutableSelf: SelfAware.withMutableSelf
};

Functions.noBody();
var func = { name: "func" };
Functions['$FunctionsType'].withBody.call(func, "body");
var mutFunc = func;
SelfAware['$FunctionsType'].withMutableSelf.call(mutFunc);
var genericNum = {};
Generic['$GenericType<T>'].generic.call(genericNum, 5);
var genericString = {};
Generic['$GenericType<String>'].generic.call(genericString, "hello");
