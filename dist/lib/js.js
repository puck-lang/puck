"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asResult = asResult;
var _new = exports._new = function _new(constructor) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new (Function.prototype.bind.apply(constructor, [null].concat(args)))();
  };
};
function asResult(fn) {
  try {
    return { result: fn() };
  } catch (error) {
    return { error: error };
  }
}
