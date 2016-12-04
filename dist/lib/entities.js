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

var File = exports.File = function File(object) {
  return object;
};
var Type = exports.Type = function Type(object) {
  return object;
};
var Struct = exports.Struct = function Struct(object) {
  return object;
};
var Trait = exports.Trait = function Trait(object) {
  return object;
};
var Implementation = exports.Implementation = function Implementation(object) {
  return object;
};
var TypeClass = exports.TypeClass = function TypeClass(object) {
  return object;
};
var TypeInstance = exports.TypeInstance = function TypeInstance(object) {
  return object;
};
var TypeParameter = exports.TypeParameter = function TypeParameter(object) {
  return object;
};
var EnumType = exports.EnumType = function EnumType(object) {
  return object;
};
var FunctionType = exports.FunctionType = function FunctionType(object) {
  return object;
};
var ObjectType = exports.ObjectType = function ObjectType(object) {
  return object;
};
var TupleType = exports.TupleType = function TupleType(object) {
  return object;
};
var UnitType = exports.UnitType = function UnitType(object) {
  return object;
};
var GenericFunction = exports.GenericFunction = function GenericFunction(object) {
  return object;
};
var GenericFunctionInstace = exports.GenericFunctionInstace = function GenericFunctionInstace(object) {
  return object;
};
var Binding = exports.Binding = function Binding(object) {
  return object;
};
var TypeBinding = exports.TypeBinding = function TypeBinding(object) {
  return object;
};
var Scope = exports.Scope = function Scope(object) {
  return object;
};
var ScopeAware = exports.ScopeAware = function ScopeAware(object) {
  return object;
};
function isEnumType(type_) {
  return type_.members;
};
function isFunctionType(type_) {
  return type_._arguments;
};
function isObjectType(type_) {
  return (0, _js._typeof)(type_.properties) == "object" && !isTupleType(type_);
};
function isTupleType(type_) {
  return _js.Array.isArray(type_.properties);
};
function isStruct(type_) {
  return type_.implementations;
};
function isTrait(type_) {
  return type_.functions;
};
function isTypeClass(type_) {
  return type_.parameterRange;
};
function isTypeInstance(type_) {
  return type_._class;
};
function isTypeParameter(type_) {
  return type_.isTypeParameter;
}
