'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpectationObject = undefined;
exports.expect = expect;
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
function expect(value) {
  return $unwrapTraitObject(_js.global).expect(value);
};
function describe(message, group) {
  $unwrapTraitObject(_js.global).describe(message, group);
};
function ddescribe(message, group) {
  $unwrapTraitObject($unwrapTraitObject(_js.global).describe).only(message, group);
};
function xdescribe(message, group) {
  $unwrapTraitObject($unwrapTraitObject(_js.global).describe).skip(message, group);
};
function it(message, test) {
  $unwrapTraitObject(_js.global).it(message, test);
};
function iit(message, test) {
  $unwrapTraitObject($unwrapTraitObject(_js.global).it).only(message, test);
};
function xit(message, test) {
  $unwrapTraitObject($unwrapTraitObject(_js.global).it).skip(message, test);
}
