'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expect = exports.ExpectationObject = undefined;
exports.describe = describe;
exports.ddescribe = ddescribe;
exports.xdescribe = xdescribe;
exports.it = it;
exports.iit = iit;
exports.xit = xit;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};
var ExpectationObject = exports.ExpectationObject = function ExpectationObject(object) {
  return object;
};
var expect = exports.expect = $unwrapTraitObject(_js.global).expect;
function describe(message, group) {
  return $unwrapTraitObject(_js.global).describe(message, group);
};
function ddescribe(message, group) {
  return $unwrapTraitObject($unwrapTraitObject(_js.global).describe).only(message, group);
};
function xdescribe(message, group) {
  return $unwrapTraitObject($unwrapTraitObject(_js.global).describe).skip(message, group);
};
function it(message, test) {
  return $unwrapTraitObject(_js.global).it(message, test);
};
function iit(message, test) {
  return $unwrapTraitObject($unwrapTraitObject(_js.global).it).only(message, test);
};
function xit(message, test) {
  return $unwrapTraitObject($unwrapTraitObject(_js.global).it).skip(message, test);
}