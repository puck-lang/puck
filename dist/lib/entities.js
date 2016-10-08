#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isStruct = isStruct;
exports.isTrait = isTrait;
exports.isTypeClass = isTypeClass;
exports.isTypeInstance = isTypeInstance;
exports.isTypeParameter = isTypeParameter;

var _core = require('puck-lang/dist/lib/stdlib/core');

require('./ast/ast.js');

function isStruct(ty) {
  return ty.implementations;
};
function isTrait(ty) {
  return ty.functions;
};
function isTypeClass(ty) {
  return ty.parameterRange;
};
function isTypeInstance(ty) {
  return ty._class;
};
function isTypeParameter(ty) {
  return ty.isTypeParameter;
}
