#!/usr/bin/env node

'use strict';

var _core = require('puck-lang/dist/lib/stdlib/core');

var a = ["a", 1, true, ["b", "c", [[[[[[[[[[[[[]]]]]]]]]]]]], function (a) {
  return 3;
}]];
var b = [a, "b", 3, [1, [], {
  a: a,
  b: "b"
}]];
