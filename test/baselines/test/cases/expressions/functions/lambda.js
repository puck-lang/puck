'use strict';
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const a = function (a, b) {
  return a + b;
};
const b = function () {
  return a(1, 2);
};
const c = function (a, b) {
  if (a) {
    b();
  };
  return a;
};
const d = function () {
  a(1, 2);
  return b();
};
const e = {empty: function () {}}
