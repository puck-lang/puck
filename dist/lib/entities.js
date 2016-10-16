#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFunctionType = isFunctionType;
exports.isObjectType = isObjectType;
exports.isTupleType = isTupleType;
exports.isStruct = isStruct;
exports.isTrait = isTrait;
exports.isTypeClass = isTypeClass;
exports.isTypeInstance = isTypeInstance;
exports.isTypeParameter = isTypeParameter;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

require('./ast/ast.js');

function isFunctionType(ty) {
  return ty._arguments;
};
function isObjectType(ty) {
  return (0, _js._typeof)(ty.properties) == "object" && !isTupleType(ty);
};
function isTupleType(ty) {
  return _js.Array.isArray(ty.properties);
};
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
