#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScopeAware = exports.Scope = exports.TypeBinding = exports.Binding = exports.GenericFunctionInstace = exports.GenericFunction = exports.UnitType = exports.TupleType = exports.ObjectType = exports.FunctionType = exports.EnumType = exports.TypeParameter = exports.TypeInstance = exports.TypeClass = exports.Implementation = exports.Trait = exports.Struct = exports.Type = exports.File = undefined;
exports.isEnumType = isEnumType;
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

var _ast = require('./ast/ast.js');

var File = exports.File = null;
var Type = exports.Type = null;
var Struct = exports.Struct = null;
var Trait = exports.Trait = null;
var Implementation = exports.Implementation = null;
var TypeClass = exports.TypeClass = null;
var TypeInstance = exports.TypeInstance = null;
var TypeParameter = exports.TypeParameter = null;
var EnumType = exports.EnumType = null;
var FunctionType = exports.FunctionType = null;
var ObjectType = exports.ObjectType = null;
var TupleType = exports.TupleType = null;
var UnitType = exports.UnitType = null;
var GenericFunction = exports.GenericFunction = null;
var GenericFunctionInstace = exports.GenericFunctionInstace = null;
var Binding = exports.Binding = null;
var TypeBinding = exports.TypeBinding = null;
var Scope = exports.Scope = null;
var ScopeAware = exports.ScopeAware = null;
function isEnumType(ty) {
  return ty.members;
};
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
