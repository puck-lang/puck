'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapAsResult = exports._typeof = exports._new = exports.require = exports.process = exports._module = exports.console = exports.String = exports.RegExp = exports._Object = exports.Number = exports.Error = exports.Date = exports.Boolean = exports.Array = exports._self = exports.window = exports.global = exports._undefined = exports._null = undefined;
exports.asResult = asResult;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('./js/js.js');

var js = _interopRequireWildcard(_js);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};
var _null = exports._null = $unwrapTraitObject(js)._null;
var _undefined = exports._undefined = $unwrapTraitObject(js)._undefined;
var global = exports.global = $unwrapTraitObject(js)._global || $unwrapTraitObject(js)._window || $unwrapTraitObject(js)._self;
var window = exports.window = $unwrapTraitObject(js)._window;
var _self = exports._self = $unwrapTraitObject(js)._self;
var Array = exports.Array = $unwrapTraitObject(js)._Array;
var Boolean = exports.Boolean = $unwrapTraitObject(js)._Boolean;
var Date = exports.Date = $unwrapTraitObject(js)._Date;
var Error = exports.Error = $unwrapTraitObject(js)._Error;
var Number = exports.Number = $unwrapTraitObject(js)._Number;
var _Object = exports._Object = $unwrapTraitObject(js)._Object;
var RegExp = exports.RegExp = $unwrapTraitObject(js)._RegExp;
var String = exports.String = $unwrapTraitObject(js)._String;
var console = exports.console = $unwrapTraitObject(global).console;
var _module = exports._module = $unwrapTraitObject(js)._module;
var process = exports.process = $unwrapTraitObject(js)._process;
var _require = $unwrapTraitObject(js)._require;
exports.require = _require;
var _new = exports._new = $unwrapTraitObject(js)._new;
var _typeof = exports._typeof = $unwrapTraitObject(js)._typeof;
function asResult(func) {
  var result = $unwrapTraitObject(js).asResult(func);
  if ($unwrapTraitObject(result).error) {
    return (0, _core.Err)($unwrapTraitObject(result).value);
  } else {
    return (0, _core.Ok)($unwrapTraitObject(result).value);
  };
};
var wrapAsResult = exports.wrapAsResult = $unwrapTraitObject(js).wrapAsResult;
