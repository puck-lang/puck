#!/usr/bin/env node

'use strict';

var _core = require('puck-lang/dist/lib/stdlib/core');

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
  return function c(a, b) {
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
};
function h(a, b) {
  return a == b;
};
function i(a, b) {
  if (a > 0) {
    return b;
  };
  return a == b;
};
function j(a, b) {
  return a == b;
};
function k(a, b) {
  return a == b;
};
function l(a, b) {
  return a == b;
};
function m(a, b) {
  return a == b;
};
function n() {
  var self = this;
  return self.toString();
};
function o() {
  var self = this;
  return self.toString();
};
function p(a) {
  var self = this;
  return self.toString();
}
