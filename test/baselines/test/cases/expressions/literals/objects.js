#!/usr/bin/env node

'use strict';

var _core = require('puck-lang/dist/lib/stdlib/core');

var __PUCK__value__1 = void 0;
if (false) {
  __PUCK__value__1 = 3;
};
var __PUCK__value__2 = void 0;
if (true) {
  __PUCK__value__2 = 3;
} else {
  __PUCK__value__2 = 1;
};
var a = {
  a: 1,
  b: 2,
  c: 4,
  d: __PUCK__value__1,
  e: __PUCK__value__2
};
var b = {
  a: a,
  b: a
};