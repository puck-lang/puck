#!/usr/bin/env node

'use strict';

function a() {};
function b(a) {};
function c(a) {
  return a;
};
function d(a, b) {
  return c(a);
};
function e(a, b) {
  return d(a, b);
};
function f(a, b) {
  return function a(a, b) {
    return f(a, b);
  };
};
function g(a, b) {
  a();
  b();
  return function c() {
    function g() {
      return g();
    };
    return g();
  };
}
