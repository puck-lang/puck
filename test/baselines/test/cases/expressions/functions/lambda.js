'use strict';

var _core = require('puck-lang/dist/lib/stdlib/core');

var a = function a(_a, b) {
  return _a + b;
};
var b = function b() {
  return a(1, 2);
};
var c = function c(a, b) {
  if (a) {
    b();
  };
  return a;
};
var d = function d() {
  a(1, 2);
  return b();
};
var e = { empty: function empty() {} };
