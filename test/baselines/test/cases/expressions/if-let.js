'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _core = require('puck-lang/dist/lib/stdlib/core');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};

var __PUCK__value__1 = _core.Option.Some(5);
if ($unwrapTraitObject(__PUCK__value__1).kind == "Some") {
  var _PUCK__value__1$valu = _slicedToArray(__PUCK__value__1.value, 1),
      value = _PUCK__value__1$valu[0];

  (0, _core.print)(value);
} else {
  (0, _core.print)("None");
};
var __PUCK__value__2 = _core.Option.Some(3);
if ($unwrapTraitObject(__PUCK__value__2).kind == "Some") {
  var _PUCK__value__2$valu = _slicedToArray(__PUCK__value__2.value, 1),
      number = _PUCK__value__2$valu[0];

  number;
} else {
  "string";
}
