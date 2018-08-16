'use strict';
exports.ExpectationObject = exports.expect = exports.describe = exports.ddescribe = exports.xdescribe = exports.it = exports.iit = exports.xit = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
var ExpectationObject = exports.ExpectationObject = (object) => object;
function expect(value) {
  return $puck_2._global.expect(value);
};
exports.expect = expect;
function describe(message, group) {
  $puck_2._global.describe(message, group);
};
exports.describe = describe;
function ddescribe(message, group) {
  $puck_2._global.describe.only(message, group);
};
exports.ddescribe = ddescribe;
function xdescribe(message, group) {
  $puck_2._global.describe.skip(message, group);
};
exports.xdescribe = xdescribe;
function it(message, test) {
  $puck_2._global.it(message, test);
};
exports.it = it;
function iit(message, test) {
  $puck_2._global.it.only(message, test);
};
exports.iit = iit;
function xit(message, test) {
  $puck_2._global.it.skip(message, test);
};
exports.xit = xit
