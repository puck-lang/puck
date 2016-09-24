#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isStruct = isStruct;
exports.isTrait = isTrait;
exports.isTypeClass = isTypeClass;

var _core = require('puck-lang/dist/lib/stdlib/core');

require('./ast/ast.js');

require('./typeck/src/range.js');

function isStruct(ty) {
  return ty.implementations;
};
function isTrait(ty) {
  return ty.isTrait;
};
function isTypeClass(ty) {
  return ty.parameterRange;
}
