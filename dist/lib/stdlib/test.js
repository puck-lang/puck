'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.ExpectationObject = exports.expect = exports.describe = exports.ddescribe = exports.xdescribe = exports.it = exports.iit = exports.xitundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
var ExpectationObject = exports.ExpectationObject = (object) => object;
function expect(value) {
  return $unwrapTraitObject($puck_2._global).expect(value);
};
exports.expect = expect;
function describe(message, group) {
  $unwrapTraitObject($puck_2._global).describe(message, group);
};
exports.describe = describe;
function ddescribe(message, group) {
  $unwrapTraitObject($unwrapTraitObject($puck_2._global).describe).only(message, group);
};
exports.ddescribe = ddescribe;
function xdescribe(message, group) {
  $unwrapTraitObject($unwrapTraitObject($puck_2._global).describe).skip(message, group);
};
exports.xdescribe = xdescribe;
function it(message, test) {
  $unwrapTraitObject($puck_2._global).it(message, test);
};
exports.it = it;
function iit(message, test) {
  $unwrapTraitObject($unwrapTraitObject($puck_2._global).it).only(message, test);
};
exports.iit = iit;
function xit(message, test) {
  $unwrapTraitObject($unwrapTraitObject($puck_2._global).it).skip(message, test);
};
exports.xit = xit
