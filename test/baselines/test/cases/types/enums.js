#!/usr/bin/env node

'use strict';

var _core = require('puck-lang/dist/lib/stdlib/core');

var five = (0, _core.Just)(5);
var nothing = _core.Nothing;
var maybeFive = _core.Maybe.Just(5);
var maybeNothing = _core.Maybe.Nothing;
var Enum = {
  A: function A(object) {
    return { kind: 'A', value: object };
  }
};
var a = Enum.A({ b: 5 });
