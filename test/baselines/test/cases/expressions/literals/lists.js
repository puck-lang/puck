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
_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$lib/stdlib/core.puck:List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$lib/stdlib/core.puck:List', value: b, $isTraitObject: true });
_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$lib/stdlib/core.puck:List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$lib/stdlib/core.puck:List', value: [], $isTraitObject: true });
[(0, _core.Some)(5), (0, _core.Some)(5), _core.None];
_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$lib/stdlib/core.puck:List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$lib/stdlib/core.puck:List', value: ["b"], $isTraitObject: true }, function (e) {
  return _core.String.contains.call(e, "a");
});
[(0, _core.Ok)(5), (0, _core.Err)("hi")];
