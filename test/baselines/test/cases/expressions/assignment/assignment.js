'use strict';

var _core = require('puck-lang/dist/lib/stdlib/core');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};

var D = function D(object) {
  return object;
};
var a = void 0;
a = {};
$unwrapTraitObject(a).b = [1, 2];
$unwrapTraitObject($unwrapTraitObject(a).b)[0] = 4;
$unwrapTraitObject(a).b = [1, 2];
$unwrapTraitObject($unwrapTraitObject(a).b)[0] = 4;
$unwrapTraitObject(a).b = [1, 2];
$unwrapTraitObject($unwrapTraitObject(a).b)[0] = 4;
$unwrapTraitObject($unwrapTraitObject(a).b)[0] = 4;
var b = 5;
b = 6;
function c(a) {
  return a = a * 2;
};
var d = { e: 42 };
d.e = 5;
var e = void 0;
var f = e = 5;
