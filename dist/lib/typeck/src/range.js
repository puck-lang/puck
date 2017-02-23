'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.getRange = getRange;
exports.checkRange = checkRange;

var _core = require('puck-lang/dist/lib/stdlib/core');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};
function getRange(parameters, isOptional, reportError, name) {
  var firstOptional = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameters, $isTraitObject: true });
  var hasOptional = false;
  var __PUCK__value__1 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameters, $isTraitObject: true });
  _core.Iterable[__PUCK__value__1.type].forEach.call(__PUCK__value__1, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        i = _ref2[0],
        parameter = _ref2[1];

    if (isOptional($unwrapTraitObject(parameter)) && !hasOptional) {
      hasOptional = true;
      firstOptional = i;
      return [];
    } else {
      if (!isOptional($unwrapTraitObject(parameter)) && hasOptional) {
        return reportError(parameter, "An optional " + name + " can't be followed by a required " + name + "");
      };
    };
  });
  return {
    start: firstOptional,
    end: _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameters, $isTraitObject: true }) + 1
  };
};
function checkRange(_arguments, range, argumentName, subjectName) {
  var argumentCount = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _arguments, $isTraitObject: true });
  var max = range.end - 1;
  var min = range.start;
  var __PUCK__value__2 = void 0;
  if (argumentCount < min) {
    __PUCK__value__2 = (0, _core.Err)("few");
  } else {
    var __PUCK__value__3 = void 0;
    if (argumentCount > max) {
      __PUCK__value__3 = (0, _core.Err)("many");
    } else {
      __PUCK__value__3 = (0, _core.Ok)([]);
    };
    __PUCK__value__2 = __PUCK__value__3;
  };
  var error = __PUCK__value__2;
  return _core.Result.mapErr.call(error, function (error) {
    var __PUCK__value__4 = void 0;
    if (min == max) {
      __PUCK__value__4 = "" + min + "";
    } else {
      __PUCK__value__4 = "" + min + " to " + max + "";
    };
    var required = __PUCK__value__4;
    return "Too " + error + " " + argumentName + " given to " + subjectName + ", " + required + " required, " + argumentCount + " given";
  });
}
