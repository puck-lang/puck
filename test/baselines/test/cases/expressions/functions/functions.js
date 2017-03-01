'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
function a() {};
function b(a) {};
function c(a = 1) {
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
  return a === b;
};
function i(a, b) {
  if (a > 0) {
    return b !== a;
  };
  return a === b;
};
function j(a, b) {
  return a === b;
};
function k(a, b) {
  return a === b;
};
function l(a, b) {
  return a === b;
};
function n() {
  const self = this;
  return $unwrapTraitObject(self).toString();
};
function o() {
  let self = this;
  return $unwrapTraitObject(self).toString();
};
function p(a) {
  const self = this;
  return $unwrapTraitObject(self).toString();
};
a();
b(1);
c();
c(2);
const q = function (a) {};
q(1);
const bool = j(1, 2);
const obj = {key: function () {
  const self = this;
  return self;
}};
function r(a, b) {};
r(5, function (a) {
  return $puck_1.Num.round.call(a);
});
const sa = {};
const sb = a.b;
sb === 5
