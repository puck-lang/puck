#!/usr/bin/env node

'use strict';

var a = function a(_a, b) {
  return _a + b;
};
var b = function b() {
  return a();
};
var c = function c(a, b) {
  if (a) {
    b();
  };
  return a;
};
var d = function d() {
  a();
  return b();
};
var e = { empty: function empty() {} };
