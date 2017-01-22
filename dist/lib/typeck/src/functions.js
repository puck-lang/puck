#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.createFunctionType = createFunctionType;
exports.checkFunctionAssignability = checkFunctionAssignability;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _ast = require('./../../ast/ast.js');

var _entities = require('./../../entities.js');

var _range = require('./range.js');

var _types = require('./types.js');

function any(a) {
  return a;
};
function createFunctionType(scope, f, reportError) {
  var __PUCK__value__1 = void 0;
  if (f.typeParameters.length) {
    __PUCK__value__1 = (0, _core.Some)({
      parameterRange: (0, _range.getRange)(f.typeParameters, function (p) {
        return _core.Option.isJust.call(p.defaultValue);
      }, reportError, "type parameter"),
      instances: [],
      typeParameters: f.typeParameters
    });
  } else {
    __PUCK__value__1 = _core.None;
  };
  var _class = __PUCK__value__1;
  var _arguments = _core.Iterable['$List'].map.call(f.parameterList, function (p) {
    return {
      pattern: p.pattern,
      mutable: p.mutable,
      type_: p.type_,
      token: p
    };
  });
  var __PUCK__value__2 = f.returnType;
  var __PUCK__value__3 = void 0;
  if (__PUCK__value__2.kind == "Some") {
    var _PUCK__value__2$valu = _slicedToArray(__PUCK__value__2.value, 1);

    var _returnType = _PUCK__value__2$valu[0];

    __PUCK__value__3 = (0, _types.getType)(scope, _returnType);
  };
  var returnType = __PUCK__value__3;
  var __PUCK__value__4 = void 0;
  if (_arguments.length > 0 && _arguments[0].pattern.kind == "Identifier" && _arguments[0].pattern.value[0].name == "self") {
    __PUCK__value__4 = (0, _core.Some)(_arguments[0].pattern.binding);
  } else {
    __PUCK__value__4 = _core.None;
  };
  var selfBinding = __PUCK__value__4;
  var __PUCK__value__5 = void 0;
  if (_core.Option.isJust.call(selfBinding)) {
    __PUCK__value__5 = _arguments.slice(1);
  } else {
    __PUCK__value__5 = _arguments;
  };
  _arguments = __PUCK__value__5;
  var __PUCK__value__6 = void 0;
  if (f.parameterList) {
    __PUCK__value__6 = (0, _range.getRange)(_arguments, function (p) {
      var vd = p.token;
      return _core.Option.isJust.call(vd.initializer);
    }, reportError, "parameter");
  } else {
    __PUCK__value__6 = {
      start: 0,
      end: 1
    };
  };
  return {
    displayName: _core.None,
    name: any(_core.Option.map.call(f.name, function (identifier) {
      return identifier.name;
    })),
    kind: _entities.TypeKind.Function({
      selfBinding: selfBinding,
      _arguments: _arguments,
      argumentRange: __PUCK__value__6,
      returnType: returnType,
      isAbstract: _core.Option.isNothing.call(f.body)
    }),
    _class: _class,
    instance: _core.None
  };
};
function checkFunctionAssignability(functionName, to, subject) {
  var __PUCK__value__7 = (0, _range.checkRange)(subject._arguments, to.argumentRange, "arguments", functionName);
  if (__PUCK__value__7.kind == "Err") {
    var _PUCK__value__7$valu = _slicedToArray(__PUCK__value__7.value, 1);

    var error = _PUCK__value__7$valu[0];

    return (0, _core.Err)(error);
  };
  var errors = [];
  _core.Iterable['$List'].forEach.call(_core.Iterable['$List'].enumerate.call(subject._arguments), function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2);

    var subjectArgument = _ref2[0];
    var i = _ref2[1];

    var toArgument = to._arguments[i];
    if (!(0, _types.isAssignable)(toArgument.type_, subjectArgument.type_)) {
      return errors.push("Types of parameter #" + i + " does not match. " + _entities.Type.displayName.call(subjectArgument.type_) + " is not assignable to " + _entities.Type.displayName.call(toArgument.type_));
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
    return (0, _core.Err)("Return type " + _entities.Type.displayName.call(subject.returnType) + " is not assignable to " + _entities.Type.displayName.call(to.returnType));
  } else {
    return (0, _core.Ok)([]);
  };
}
