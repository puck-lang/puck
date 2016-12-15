#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnumTrait = undefined;

var _core = require('puck-lang/dist/lib/stdlib/core');

var EnumTrait = exports.EnumTrait = {
  getB: function getB() {
    var self = this;
    return self.value.b;
  }
};
EnumTrait['$Enum'] = {
  getB: EnumTrait.getB
};

var five = (0, _core.Some)(5);
var nothing = _core.None;
var maybeFive = _core.Option.Some(5);
var maybeNothing = _core.Option.None;
var Enum = {
  A: function A(object) {
    return { kind: 'A', value: object };
  }
};
var a = Enum.A({ b: 5 });
EnumTrait['$Enum'].getB.call(a);
