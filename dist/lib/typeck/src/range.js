#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRange = getRange;
exports.checkRange = checkRange;

var _core = require('puck-lang/dist/lib/stdlib/core');

function getRange(parameters, isOptional, reportError, name) {
  var firstOptional = parameters.length;
  var hasOptional = false;
  parameters.forEach(function (parameter, i) {
    if (isOptional(parameter) && !hasOptional) {
      hasOptional = true;
      return firstOptional = i;
    } else {
      if (!isOptional(parameter) && hasOptional) {
        return reportError(parameter, "An optional " + name + " can't be followed by a required " + name + "");
      };
    };
  });
  return {
    start: firstOptional,
    end: parameters.length
  };
};
function checkRange(_arguments, range, argumentName, subjectName) {
  var argumentCount = _arguments.length;
  var max = range.end;
  var min = range.start;
  var __PUCK__value__1 = void 0;
  if (argumentCount < min) {
    __PUCK__value__1 = "few";
  } else {
    var __PUCK__value__2 = void 0;
    if (argumentCount > max) {
      __PUCK__value__2 = "many";
    };
    __PUCK__value__1 = __PUCK__value__2;
  };
  var error = __PUCK__value__1;
  if (error) {
    var __PUCK__value__3 = void 0;
    if (min == max) {
      __PUCK__value__3 = min;
    } else {
      __PUCK__value__3 = "" + min + " to " + max + "";
    };
    var required = __PUCK__value__3;
    return "Too " + error + " " + argumentName + " given to " + subjectName + ", " + required + " required, " + argumentCount + " given";
  };
}
