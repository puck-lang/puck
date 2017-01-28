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
  var firstOptional = parameters.length;
  var hasOptional = false;
  var __PUCK__value__1 = _core.Iterable['$List<E>'].enumerate.call({ type: '$List<E>', value: parameters, $isTraitObject: true });
  _core.Iterable[__PUCK__value__1.type].forEach.call(__PUCK__value__1, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        parameter = _ref2[0],
        i = _ref2[1];

    if (isOptional($unwrapTraitObject(parameter)) && !hasOptional) {
      hasOptional = true;
      return firstOptional = i;
    } else {
      if (!isOptional($unwrapTraitObject(parameter)) && hasOptional) {
        return reportError(parameter, "An optional " + name + " can't be followed by a required " + name + "");
      };
    };
  });
  return {
    start: firstOptional,
    end: parameters.length + 1
  };
};
function checkRange(_arguments, range, argumentName, subjectName) {
  var argumentCount = _arguments.length;
  var max = range.end - 1;
  var min = range.start;
  var __PUCK__value__2 = void 0;
  if (argumentCount < min) {
    __PUCK__value__2 = "few";
  } else {
    var __PUCK__value__3 = void 0;
    if (argumentCount > max) {
      __PUCK__value__3 = "many";
    };
    __PUCK__value__2 = __PUCK__value__3;
  };
  var error = __PUCK__value__2;
  if (error) {
    var __PUCK__value__4 = void 0;
    if (min == max) {
      __PUCK__value__4 = min;
    } else {
      __PUCK__value__4 = "" + min + " to " + max + "";
    };
    var required = __PUCK__value__4;
    return (0, _core.Err)("Too " + error + " " + argumentName + " given to " + subjectName + ", " + required + " required, " + argumentCount + " given");
  } else {
    return (0, _core.Ok)([]);
  };
}
