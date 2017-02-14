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
var _null = exports._null = js._null;
var _undefined = exports._undefined = js._undefined;
var global = exports.global = js._global || js._window || js._self;
var window = exports.window = js._window;
var _self = exports._self = js._self;
var Array = exports.Array = js._Array;
var Boolean = exports.Boolean = js._Boolean;
var Date = exports.Date = js._Date;
var Error = exports.Error = js._Error;
var Number = exports.Number = js._Number;
var _Object = exports._Object = js._Object;
var RegExp = exports.RegExp = js._RegExp;
var String = exports.String = js._String;
var console = exports.console = $unwrapTraitObject(global).console;
var _module = exports._module = js._module;
var process = exports.process = js._process;
var _require = js._require;
exports.require = _require;
var _new = exports._new = js._new;
var _typeof = exports._typeof = js._typeof;
function asResult(func) {
  var result = js.asResult(func);
  if ($unwrapTraitObject(result).error) {
    return (0, _core.Err)($unwrapTraitObject(result).value);
  } else {
    return (0, _core.Ok)($unwrapTraitObject(result).value);
  };
};
var wrapAsResult = exports.wrapAsResult = js.wrapAsResult;
