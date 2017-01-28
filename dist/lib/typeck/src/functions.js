'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.createFunctionType = createFunctionType;
exports.checkFunctionAssignability = checkFunctionAssignability;
exports.resolveFunctionTypeParameters = resolveFunctionTypeParameters;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _ast = require('./../../ast/ast');

var _entities = require('./../../entities');

var _range = require('./range');

var _types = require('./types');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};
function createFunctionType(scope, f, reportError) {
  var __PUCK__value__1 = void 0;
  if (f.typeParameters.length) {
    var __PUCK__value__2 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: f.typeParameters, $isTraitObject: true }, function (p) {
      return p.type_;
    });
    __PUCK__value__1 = (0, _core.Some)({
      parameterRange: (0, _range.getRange)(f.typeParameters, function (p) {
        return _core.Option.isSome.call(p.defaultValue);
      }, reportError, "type parameter"),
      instances: [],
      typeParameters: _core.Iterable[__PUCK__value__2.type].toList.call(__PUCK__value__2)
    });
  } else {
    __PUCK__value__1 = _core.None;
  };
  var _class = __PUCK__value__1;
  var __PUCK__value__3 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: f.parameterList, $isTraitObject: true }, function (p) {
    return {
      pattern: p.pattern,
      mutable: p.mutable,
      type_: p.type_,
      token: p
    };
  });
  var _arguments = _core.Iterable[__PUCK__value__3.type].toList.call(__PUCK__value__3);
  var __PUCK__value__4 = f.returnType;
  var __PUCK__value__5 = void 0;
  if ($unwrapTraitObject(__PUCK__value__4).kind == "Some") {
    var _PUCK__value__4$valu = _slicedToArray(__PUCK__value__4.value, 1),
        _returnType = _PUCK__value__4$valu[0];

    __PUCK__value__5 = $unwrapTraitObject(_returnType).type_;
  };
  var returnType = __PUCK__value__5;
  var __PUCK__value__6 = void 0;
  if (_arguments.length > 0 && $unwrapTraitObject($unwrapTraitObject(_arguments[0]).pattern).kind == "Identifier" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(_arguments[0]).pattern).value)[0]).name == "self") {
    __PUCK__value__6 = (0, _core.Some)($unwrapTraitObject($unwrapTraitObject(_arguments[0]).pattern).binding);
  } else {
    __PUCK__value__6 = _core.None;
  };
  var selfBinding = __PUCK__value__6;
  var __PUCK__value__7 = void 0;
  if (_core.Option.isSome.call(selfBinding)) {
    __PUCK__value__7 = $unwrapTraitObject(_arguments).slice(1);
  } else {
    __PUCK__value__7 = _arguments;
  };
  _arguments = __PUCK__value__7;
  var __PUCK__value__8 = void 0;
  if (f.parameterList) {
    __PUCK__value__8 = (0, _range.getRange)(_arguments, function (p) {
      var vd = $unwrapTraitObject(p).token;
      return _core.Option.isSome.call(vd.initializer);
    }, reportError, "parameter");
  } else {
    __PUCK__value__8 = {
      start: 0,
      end: 1
    };
  };
  return {
    displayName: _core.None,
    name: _core.Option.map.call(f.name, function (identifier) {
      return identifier.name;
    }),
    kind: _entities.TypeKind.Function({
      selfBinding: selfBinding,
      _arguments: _arguments,
      argumentRange: __PUCK__value__8,
      returnType: returnType,
      isAbstract: _core.Option.isNone.call(f.body)
    }),
    _class: _class,
    instance: _core.None
  };
};
function checkFunctionAssignability(functionName, to, subject) {
  var __PUCK__value__9 = (0, _range.checkRange)(subject._arguments, to.argumentRange, "arguments", functionName);
  if ($unwrapTraitObject(__PUCK__value__9).kind == "Err") {
    var _PUCK__value__9$valu = _slicedToArray(__PUCK__value__9.value, 1),
        error = _PUCK__value__9$valu[0];

    return (0, _core.Err)(error);
  };
  var errors = [];
  var __PUCK__value__10 = _core.Iterable['$List<E>'].enumerate.call({ type: '$List<E>', value: subject._arguments, $isTraitObject: true });
  _core.Iterable[__PUCK__value__10.type].forEach.call(__PUCK__value__10, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        subjectArgument = _ref2[0],
        i = _ref2[1];

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
};
function resolveFunctionTypeParameters(parameterMap, typeParameters, parameterType, argumentType) {
  var __PUCK__value__11 = parameterType.kind;
  var __PUCK__value__12 = __PUCK__value__11;
  if ($unwrapTraitObject(__PUCK__value__12).kind == "Parameter") {
    var _ret = function () {
      var _PUCK__value__12$val = _slicedToArray(__PUCK__value__12.value, 1),
          __PUCK__value__13 = _PUCK__value__12$val[0];

      var name = _core.Option.unwrap.call(parameterType.name);
      if (_core.Iterable['$List<E>'].any.call({ type: '$List<E>', value: typeParameters, $isTraitObject: true }, function (p) {
        return _core.Option.unwrap.call(p.name) == name;
      })) {
        if (!_core.ObjectMap.has.call(parameterMap, name)) {
          return {
            v: parameterMap[name] = argumentType
          };
        };
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  } else {
    var __PUCK__value__14 = __PUCK__value__11;
    if ($unwrapTraitObject(__PUCK__value__14).kind == "Function") {
      var _PUCK__value__14$val = _slicedToArray(__PUCK__value__14.value, 1),
          parameterFunction = _PUCK__value__14$val[0];

      if (parameterFunction.returnType) {
        var __PUCK__value__15 = argumentType.kind;
        if ($unwrapTraitObject(__PUCK__value__15).kind == "Function") {
          var _PUCK__value__15$val = _slicedToArray(__PUCK__value__15.value, 1),
              argumentFunction = _PUCK__value__15$val[0];

          if (argumentFunction.returnType) {
            return resolveFunctionTypeParameters(parameterMap, typeParameters, parameterFunction.returnType, argumentFunction.returnType);
          };
        };
      };
    } else {
      var __PUCK__value__16 = __PUCK__value__11;
      if (true) {
        var __PUCK__value__17 = __PUCK__value__16;
        return [];
      };
    };
  };
}
