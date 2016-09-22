#!/usr/bin/env node

'use strict';

var _core = require('puck-lang/dist/lib/stdlib/core');

var a = void 0;
a = {};
a.b = [1, 2];
a.b[0] = 4;
a.b = [1, 2];
a.b[0] = 4;
a.b = [1, 2];
a.b[0] = 4;
a.b[0] = 4;
var b = 5;
b = 6;
function c(a) {
  return a = a * 2;
};
var d = { e: 42 };
d.e = 5;
