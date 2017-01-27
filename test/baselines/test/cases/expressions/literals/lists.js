'use strict';

var _core = require('puck-lang/dist/lib/stdlib/core');

var a = ["a", "1", "true"];
var b = [[1], [2, 3]];
var c = [[[[[[[[[[[[[[[]]]]]]]]]]]]]]];
var d = [a, a];
var __PUCK__value__1 = void 0;
if (true) {
  __PUCK__value__1 = d;
} else {
  __PUCK__value__1 = [];
};
var __PUCK__value__2 = void 0;
if (false) {
  __PUCK__value__2 = d;
} else {
  __PUCK__value__2 = [a, a, a];
};
var e = [__PUCK__value__1, __PUCK__value__2];
_core.Iterable['$List<E>'].size.call(b);
_core.Iterable['$List<E>'].size.call([]);
[(0, _core.Some)(5), (0, _core.Some)(5), _core.None];
_core.Iterable['$List<E>'].map.call(["b"], function (e) {
  return _core.String.contains.call(e, "a");
});
[(0, _core.Ok)(5), (0, _core.Err)("hi")];
