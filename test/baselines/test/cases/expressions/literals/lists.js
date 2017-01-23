'use strict';

var _core = require('puck-lang/dist/lib/stdlib/core');

var __PUCK__value__1 = void 0;
if (true) {
  __PUCK__value__1 = 5;
};
var a = ["a", 1, true, ["b", "c", [[[[[[[[[[[[[]]]]]]]]]]]]], function (a) {
  return 3;
}, __PUCK__value__1]];
var b = [a, "b", 3, [1, [], {
  a: a,
  b: "b"
}]];
_core.Iterable['$List<E>'].size.call(b);
_core.Iterable['$List<E>'].size.call([]);
