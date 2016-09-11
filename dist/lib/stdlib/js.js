#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._new = exports.require = exports.module = exports._self = exports.window = exports.global = exports._undefined = exports._null = undefined;

var _js = require('./js/js.js');

var js = _interopRequireWildcard(_js);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _null = exports._null = js._null;
var _undefined = exports._undefined = js._undefined;
var global = exports.global = js._global || js._window || js._self;
var window = exports.window = js._window;
var _self = exports._self = js._self;
var _module = js._module;
exports.module = _module;
var _require = js._require;
exports.require = _require;
var _new = exports._new = js._new;
