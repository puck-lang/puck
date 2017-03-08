'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports._null = exports._undefined = exports._global = exports.window = exports._self = exports.Array = exports.Boolean = exports.Date = exports.Error = exports.Number = exports._Object = exports.RegExp = exports.String = exports.console = exports._module = exports.process = exports._require = exports._new = exports._typeof = exports.asResult = exports.wrapAsResult = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const core = require("puck-lang/dist/lib/stdlib/core");
const js = require("./js/js.js");
var _null = exports._null = js._null;
var _undefined = exports._undefined = $unwrapTraitObject(js._undefined);
var _global = exports._global = js._global || js._window || js._self;
var window = exports.window = js._window;
var _self = exports._self = js._self;
var Array = exports.Array = js._Array;
var Boolean = exports.Boolean = js._Boolean;
var Date = exports.Date = js._Date;
var Error = exports.Error = $unwrapTraitObject(js._Error);
var Number = exports.Number = js._Number;
var _Object = exports._Object = js._Object;
var RegExp = exports.RegExp = js._RegExp;
var String = exports.String = js._String;
var console = exports.console = $unwrapTraitObject(_global).console;
var _module = exports._module = js._module;
var process = exports.process = js._process;
var _require = exports._require = $unwrapTraitObject(js._require);
var _new = exports._new = $unwrapTraitObject(js._new);
var _typeof = exports._typeof = $unwrapTraitObject(js._typeof);
function asResult(func) {
  const result = js.asResult(func);
  if (result.error) {
    return $puck_1.Err(result.value);
  }
  else {
    return $puck_1.Ok(result.value);
  };
};
exports.asResult = asResult;
var wrapAsResult = exports.wrapAsResult = js.wrapAsResult
