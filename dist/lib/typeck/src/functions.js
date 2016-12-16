#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
      return _core.MaybeTrait['$Option'].isJust.call(p.defaultValue);
    }, reportError, "type parameter");
    instances = [];
    typeParameters = f.typeParameters;
  };
  var _arguments = f.parameterList.map(function (p) {
    return {
      pattern: p.pattern,
      mutable: p.mutable,
      type_: p.type_,
      token: p
    };
  });
  var __PUCK__value__1 = f.returnType;
  var __PUCK__value__2 = void 0;
  if (__PUCK__value__1.kind == "Some") {
    var _PUCK__value__1$valu = _slicedToArray(__PUCK__value__1.value, 1);

    var _returnType = _PUCK__value__1$valu[0];

    __PUCK__value__2 = (0, _types.getType)(scope, _returnType);
  };
  var returnType = __PUCK__value__2;
  var __PUCK__value__3 = void 0;
  if (_arguments.length > 0 && _arguments[0].pattern.kind == "Identifier" && _arguments[0].pattern.value[0].name == "self") {
    __PUCK__value__3 = _arguments[0].pattern.binding;
  };
  var selfBinding = __PUCK__value__3;
  var __PUCK__value__4 = void 0;
  if (selfBinding) {
    __PUCK__value__4 = _arguments.slice(1);
  } else {
    __PUCK__value__4 = _arguments;
  };
  _arguments = __PUCK__value__4;
  var __PUCK__value__5 = void 0;
  if (f.parameterList) {
    __PUCK__value__5 = (0, _range.getRange)(_arguments, function (p) {
      var vd = p.token;
      return _core.MaybeTrait['$Option'].isJust.call(vd.initializer);
    }, reportError, "parameter");
  } else {
    __PUCK__value__5 = {
      start: 0,
      end: 1
    };
  };
  return {
    kind: "Function",
    name: _core.MaybeTrait['$Option'].mapOrElse.call(f.name, function () {
      return getFunctionTypeName(_arguments, returnType);
    }, function (ident) {
      return ident.name;
    }),
    parameterRange: parameterRange,
    selfBinding: selfBinding,
    _arguments: _arguments,
    argumentRange: __PUCK__value__5,
    returnType: returnType,
    isAbstract: !f.body
  };
};
function checkFunctionAssignability(to, subject) {
  var __PUCK__value__6 = (0, _range.checkRange)(subject._arguments, to.argumentRange, "arguments", subject.name);
  if (__PUCK__value__6.kind == "Err") {
    var _PUCK__value__6$valu = _slicedToArray(__PUCK__value__6.value, 1);

    var error = _PUCK__value__6$valu[0];

    return (0, _core.Err)(error);
  };
  var errors = [];
  subject._arguments.forEach(function (subjectArgument, i) {
    var toArgument = to._arguments[i];
    if (!(0, _types.isAssignable)(toArgument.type_, subjectArgument.type_)) {
      return errors.push("Types of parameter #" + i + " does not match. " + subjectArgument.type_.name + " is not assignable to " + toArgument.type_.name);
    } else {
      if (subjectArgument.mutable && !toArgument.mutable) {
        return errors.push("Parameter #" + i + " is required to be immutable");
      };
    };
  });
  if (errors.length > 0) {
    return (0, _core.Err)(errors[0]);
  };
  if (!(0, _types.isAssignable)(to.returnType, subject.returnType)) {
    return (0, _core.Err)("Return type " + subject.returnType.name + " is not assignable to " + to.returnType.name);
  } else {
    return (0, _core.Ok)([]);
  };
}
