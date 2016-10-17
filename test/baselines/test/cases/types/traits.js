#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenericType = exports.FunctionsType = exports.EmptyType = exports.GenericSelf = exports.Generic = exports.SelfAware = exports.Functions = exports.Empty = undefined;

var _core = require('puck-lang/dist/lib/stdlib/core');

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
var GenericSelf = exports.GenericSelf = {};
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
Generic['$GenericType'] = {
  generic: function generic(a) {
    return a;
  }
};
GenericSelf['$GenericType<String>'] = {
  genericSelf: function genericSelf(a) {
    var self = this;
    return a;
  }
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
var EmptyType = exports.EmptyType = null;
var FunctionsType = exports.FunctionsType = null;
var GenericType = exports.GenericType = null;
Functions.noBody();
var func = { name: "func" };
Functions['$FunctionsType'].withBody.call(func, "body");
var mutFunc = func;
SelfAware['$FunctionsType'].withMutableSelf.call(mutFunc);
var genericNum = {};
Generic['$GenericType'].generic.call(genericNum, 5);
var genericString = {};
Generic['$GenericType<String>'].generic.call(genericString, "hello");
