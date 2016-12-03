#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFunctionTypeName = getFunctionTypeName;
exports.getTupleTypeName = getTupleTypeName;
exports.createFunctionType = createFunctionType;
exports.checkFunctionAssignability = checkFunctionAssignability;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _ast = require('./../../ast/ast.js');

var _entities = require('./../../entities.js');

var _range = require('./range.js');

var _types = require('./types.js');

function getFunctionTypeName(_arguments, returnType) {
  return getTupleTypeName(_arguments) + " => " + (returnType && returnType.name || "??");
};
function getTupleTypeName(properties) {
  return "(" + properties.map(function (a) {
    return a && a.name || "??";
  }).join(", ") + ")";
};
function createFunctionType(scope, f, reportError) {
  var parameterRange = void 0;
  var instances = void 0;
  var typeParameters = void 0;
  if (f.typeParameters && f.typeParameters.length) {
    parameterRange = (0, _range.getRange)(f.typeParameters, function (p) {
      return _core.MaybeTrait['$Maybe'].isJust.call(p.defaultValue);
    }, reportError, "type parameter");
    instances = [];
    typeParameters = f.typeParameters;
  };
  var _arguments = f.parameterList.map(function (p) {
    return {
      pattern: p.pattern,
      mutable: p.mutable,
      ty: p.ty,
      token: p
    };
  });
  var __PUCK__value__1 = void 0;
  if (_core.MaybeTrait['$Maybe'].isJust.call(f.returnType)) {
    __PUCK__value__1 = (0, _types.getType)(scope, f.returnType.value[0]);
  };
  var returnType = __PUCK__value__1;
  var __PUCK__value__2 = void 0;
  if (_arguments.length > 0 && _arguments[0].pattern.kind == "Identifier" && _arguments[0].pattern.value[0].name == "self") {
    __PUCK__value__2 = _arguments[0].pattern.binding;
  };
  var selfBinding = __PUCK__value__2;
  var __PUCK__value__3 = void 0;
  if (selfBinding) {
    __PUCK__value__3 = _arguments.slice(1);
  } else {
    __PUCK__value__3 = _arguments;
  };
  _arguments = __PUCK__value__3;
  var __PUCK__value__4 = void 0;
  if (f.parameterList) {
    __PUCK__value__4 = (0, _range.getRange)(_arguments, function (p) {
      var vd = p.token;
      return _core.MaybeTrait['$Maybe'].isJust.call(vd.initializer);
    }, reportError, "parameter");
  } else {
    __PUCK__value__4 = {
      start: 0,
      end: 1
    };
  };
  return {
    kind: "Function",
    name: _core.MaybeTrait['$Maybe'].mapOrElse.call(f.name, function () {
      return getFunctionTypeName(_arguments, returnType);
    }, function (ident) {
      return ident.name;
    }),
    parameterRange: parameterRange,
    selfBinding: selfBinding,
    _arguments: _arguments,
    argumentRange: __PUCK__value__4,
    returnType: returnType,
    isAbstract: !f.body
  };
};
function checkFunctionAssignability(to, subject, token) {
  var error = void 0;;
  if (error = (0, _range.checkRange)(subject._arguments, to.argumentRange, "arguments", subject.name)) {
    return error;
  };
  var errors = [];
  subject._arguments.forEach(function (subjectArgument, i) {
    var toArgument = to._arguments[i];
    if (!(0, _types.isAssignable)(toArgument.ty, subjectArgument.ty)) {
      return errors.push("Types of parameter #" + i + " does not match. " + subjectArgument.ty.name + " is not assignable to " + toArgument.ty.name);
    };
    if (subjectArgument.mutable && !toArgument.mutable) {
      return errors.push("Parameter #" + i + " is required to be immutable");
    };
  });
  if (errors.length > 0) {
    return errors[0];
  };
  if (!(0, _types.isAssignable)(to.returnType, subject.returnType)) {
    return "Return type " + subject.returnType.name + " is not assignable to " + to.returnType.name;
  };
}
