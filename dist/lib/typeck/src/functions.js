#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFunctionTypeName = getFunctionTypeName;
exports.createFunctionType = createFunctionType;
exports.checkFunctionAssignability = checkFunctionAssignability;

var _core = require('puck-lang/dist/lib/stdlib/core');

require('./../../ast/ast.js');

require('./../../entities.js');

var _range = require('./range.js');

var _types = require('./types.js');

function getFunctionTypeName(_arguments, returnType) {
  return "(" + _arguments.map(function (a) {
    return a && a.name || "??";
  }).join(", ") + ") => " + (returnType && returnType.name || "??");
};
function createFunctionType(scope, f, reportError) {
  var _arguments = f.parameterList.map(function (p) {
    return {
      identifier: p.identifier,
      mutable: p.mutable,
      ty: p.ty,
      token: p
    };
  });
  var returnType = (0, _types.getType)(scope, f.returnType);
  var __PUCK__value__1 = void 0;
  if (_arguments.length > 0 && _arguments[0].identifier.name == "self") {
    __PUCK__value__1 = _arguments[0];
  };
  var selfBinding = __PUCK__value__1;
  var __PUCK__value__2 = void 0;
  if (selfBinding) {
    __PUCK__value__2 = _arguments.slice(1);
  } else {
    __PUCK__value__2 = _arguments;
  };
  _arguments = __PUCK__value__2;
  var __PUCK__value__3 = void 0;
  if (f.name) {
    __PUCK__value__3 = f.name.name;
  } else {
    __PUCK__value__3 = getFunctionTypeName(_arguments, returnType);
  };
  var __PUCK__value__4 = void 0;
  if (f.parameterList) {
    __PUCK__value__4 = (0, _range.getRange)(_arguments, function (p) {
      return p.token.initializer;
    }, reportError, "parameter");
  } else {
    __PUCK__value__4 = {
      start: 0,
      end: 1
    };
  };
  return {
    kind: "Function",
    name: __PUCK__value__3,
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
