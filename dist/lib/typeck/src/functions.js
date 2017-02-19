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

var _js = require('puck-lang/dist/lib/stdlib/js');

var _ast = require('./../../ast/ast');

var _span = require('./../../ast/span');

var _entities = require('./../../entities');

var _range = require('./range');

var _scope = require('./scope');

var _types = require('./types');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};

function getPatternName(pattern) {
  var __PUCK__value__1 = pattern;
  var __PUCK__value__2 = __PUCK__value__1;
  if ($unwrapTraitObject(__PUCK__value__2).kind == "Identifier") {
    var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__2),
        _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
        i = _$unwrapTraitObject$v[0];

    return (0, _core.Some)(i.name);
  } else {
    var __PUCK__value__3 = __PUCK__value__1;
    if (true) {
      var __PUCK__value__4 = __PUCK__value__3;
      return _core.None;
    };
  };
};
function createFunctionType(scope, f, reportError) {
  var __PUCK__value__5 = void 0;
  if (f.typeParameters.length) {
    var __PUCK__value__6 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.typeParameters, $isTraitObject: true }, function (p) {
      return p.type_;
    });
    __PUCK__value__5 = (0, _core.Some)({
      parameterRange: (0, _range.getRange)(f.typeParameters, function (p) {
        return _core.Option.isSome.call(p.defaultValue);
      }, reportError, "type parameter"),
      instances: [],
      typeParameters: _core.Iterable[__PUCK__value__6.type].toList.call(__PUCK__value__6)
    });
  } else {
    __PUCK__value__5 = _core.None;
  };
  var _class = __PUCK__value__5;
  var __PUCK__value__8 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true });
  var __PUCK__value__7 = _core.Iterable[__PUCK__value__8.type].map.call(__PUCK__value__8, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        p = _ref2[0],
        i = _ref2[1];

    return {
      name: _core.Option.unwrapOr.call(getPatternName($unwrapTraitObject(p).pattern), "p" + i + ""),
      token: p,
      mutable: $unwrapTraitObject(p).mutable,
      allowRedeclare: true,
      type_: $unwrapTraitObject(p).type_,
      previous: _core.None,
      completeType: _core.None
    };
  });
  var parameters = _core.Iterable[__PUCK__value__7.type].toList.call(__PUCK__value__7);
  var __PUCK__value__9 = f.returnType;
  var __PUCK__value__10 = void 0;
  if ($unwrapTraitObject(__PUCK__value__9).kind == "Some") {
    var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__9),
        _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
        _returnType = _$unwrapTraitObject2$[0];

    __PUCK__value__10 = _ast.TypeBound.getType.call(_returnType);
  } else {
    __PUCK__value__10 = _js._undefined;
  };
  var returnType = __PUCK__value__10;
  var selfBinding = _core.Option.andThen.call(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameters, $isTraitObject: true }), function (b) {
    if (b.name == "self") {
      return (0, _core.Some)(b);
    } else {
      return _core.None;
    };
  });
  var __PUCK__value__11 = void 0;
  if (_core.Option.isSome.call(selfBinding)) {
    __PUCK__value__11 = $unwrapTraitObject(parameters).slice(1);
  } else {
    __PUCK__value__11 = parameters;
  };
  parameters = __PUCK__value__11;
  var __PUCK__value__12 = void 0;
  if (f.parameterList) {
    __PUCK__value__12 = (0, _range.getRange)(parameters, function (p) {
      var vd = $unwrapTraitObject(p).token;
      return _core.Option.isSome.call(vd.initializer);
    }, reportError, "parameter");
  } else {
    __PUCK__value__12 = {
      start: 0,
      end: 1
    };
  };
  return {
    id: _core.None,
    displayName: _core.None,
    name: _core.Option.map.call(f.name, function (identifier) {
      return identifier.name;
    }),
    kind: _entities.TypeKind.Function({
      selfBinding: selfBinding,
      parameters: parameters,
      parameterRange: __PUCK__value__12,
      returnType: returnType,
      isAbstract: _core.Option.isNone.call(f.body)
    }),
    _class: _class,
    instance: _core.None,
    providesType: _core.None,
    enumMember: _core.None,
    complete: true
  };
};
function checkFunctionAssignability(functionName, to, subject) {
  var __PUCK__value__13 = (0, _range.checkRange)(subject.parameters, to.parameterRange, "arguments", functionName);
  if ($unwrapTraitObject(__PUCK__value__13).kind == "Err") {
    var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__13),
        _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
        error = _$unwrapTraitObject3$[0];

    return (0, _core.Err)(error);
  };
  var errors = [];
  var __PUCK__value__14 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: subject.parameters, $isTraitObject: true });
  _core.Iterable[__PUCK__value__14.type].forEach.call(__PUCK__value__14, function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        subjectParameter = _ref4[0],
        i = _ref4[1];

    var toParameter = to.parameters[i];
    if (!(0, _types.isAssignable)(toParameter.type_, subjectParameter.type_)) {
      return errors.push("Types of parameter #" + i + " does not match. " + _entities.Type.displayName.call(subjectParameter.type_) + " is not assignable to " + _entities.Type.displayName.call(toParameter.type_));
    } else {
      if (subjectParameter.mutable && !toParameter.mutable) {
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
  var __PUCK__value__15 = parameterType.kind;
  var __PUCK__value__16 = __PUCK__value__15;
  if ($unwrapTraitObject(__PUCK__value__16).kind == "Parameter") {
    var _ret = function () {
      var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__16),
          _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
          __PUCK__value__17 = _$unwrapTraitObject4$[0];

      var name = _core.Option.unwrap.call(parameterType.name);
      if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: typeParameters, $isTraitObject: true }, function (p) {
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
    var __PUCK__value__18 = __PUCK__value__15;
    if ($unwrapTraitObject(__PUCK__value__18).kind == "Function") {
      var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__18),
          _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
          parameterFunction = _$unwrapTraitObject5$[0];

      if (parameterFunction.returnType) {
        var __PUCK__value__19 = argumentType.kind;
        if ($unwrapTraitObject(__PUCK__value__19).kind == "Function") {
          var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__19),
              _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
              argumentFunction = _$unwrapTraitObject6$[0];

          if (argumentFunction.returnType) {
            return resolveFunctionTypeParameters(parameterMap, typeParameters, parameterFunction.returnType, argumentFunction.returnType);
          };
        };
      };
    } else {
      var __PUCK__value__20 = __PUCK__value__15;
      if (true) {
        var __PUCK__value__21 = __PUCK__value__20;
        return [];
      };
    };
  };
}
