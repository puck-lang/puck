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
  if ($unwrapTraitObject(__PUCK__value__1).kind == "Identifier") {
    var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__1),
        _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
        i = _$unwrapTraitObject$v[0];

    return (0, _core.Some)(i.name);
  } else {
    if (true) {
      var __PUCK__value__2 = __PUCK__value__1;
      return _core.None;
    };
  };
};
function createFunctionType(scope, f, reportError) {
  var __PUCK__value__3 = void 0;
  if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.typeParameters, $isTraitObject: true })) {
    var __PUCK__value__4 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.typeParameters, $isTraitObject: true }, function (p) {
      return p.type_;
    });
    __PUCK__value__3 = (0, _core.Some)({
      parameterRange: (0, _range.getRange)(f.typeParameters, function (p) {
        return _core.Option.isSome.call(p.defaultValue);
      }, reportError, "type parameter"),
      instances: [],
      typeParameters: _core.Iterable[__PUCK__value__4.type].toList.call(__PUCK__value__4)
    });
  } else {
    __PUCK__value__3 = _core.None;
  };
  var _class = __PUCK__value__3;
  var __PUCK__value__6 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true });
  var __PUCK__value__5 = _core.Iterable[__PUCK__value__6.type].map.call(__PUCK__value__6, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        i = _ref2[0],
        p = _ref2[1];

    return {
      name: _core.Option.unwrapOr.call(getPatternName(p.pattern), "p" + i + ""),
      token: p,
      mutable: p.mutable,
      allowRedeclare: true,
      type_: p.type_,
      previous: _core.None,
      completeType: _core.None
    };
  });
  var parameters = _core.Iterable[__PUCK__value__5.type].toList.call(__PUCK__value__5);
  var __PUCK__value__7 = f.returnType;
  var __PUCK__value__8 = void 0;
  if (__PUCK__value__7.kind == "Some") {
    var _PUCK__value__7$valu = _slicedToArray(__PUCK__value__7.value, 1),
        _returnType = _PUCK__value__7$valu[0];

    __PUCK__value__8 = _ast.TypeBound.getType.call(_returnType);
  } else {
    __PUCK__value__8 = _js._undefined;
  };
  var returnType = __PUCK__value__8;
  var selfBinding = _core.Option.andThen.call(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameters, $isTraitObject: true }), function (b) {
    if (b.name == "self") {
      return (0, _core.Some)(b);
    } else {
      return _core.None;
    };
  });
  var __PUCK__value__9 = void 0;
  if (_core.Option.isSome.call(selfBinding)) {
    __PUCK__value__9 = $unwrapTraitObject(parameters).slice(1);
  } else {
    __PUCK__value__9 = parameters;
  };
  parameters = __PUCK__value__9;
  var __PUCK__value__10 = void 0;
  if (f.parameterList) {
    __PUCK__value__10 = (0, _range.getRange)(parameters, function (p) {
      var vd = $unwrapTraitObject($unwrapTraitObject(p).token);
      return _core.Option.isSome.call(vd.initializer);
    }, reportError, "parameter");
  } else {
    __PUCK__value__10 = {
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
      parameterRange: __PUCK__value__10,
      returnType: returnType,
      isAbstract: _core.Option.isNone.call(f.body)
    }),
    _class: _class,
    instance: _core.None,
    providesType: _core.None,
    enumMember: _core.None
  };
};
function checkFunctionAssignability(functionName, to, subject) {
  var __PUCK__value__11 = (0, _range.checkRange)(subject.parameters, to.parameterRange, "arguments", functionName);
  if (__PUCK__value__11.kind == "Err") {
    var _PUCK__value__11$val = _slicedToArray(__PUCK__value__11.value, 1),
        error = _PUCK__value__11$val[0];

    return (0, _core.Err)(error);
  };
  var errors = [];
  var __PUCK__value__12 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: subject.parameters, $isTraitObject: true });
  _core.Iterable[__PUCK__value__12.type].forEach.call(__PUCK__value__12, function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        i = _ref4[0],
        subjectParameter = _ref4[1];

    var toParameter = _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: to.parameters, $isTraitObject: true }, i);
    if (!(0, _types.isAssignable)(toParameter.type_, subjectParameter.type_)) {
      return _core.List.push.call(errors, "Types of parameter #" + i + " does not match. " + _entities.Type.displayName.call(subjectParameter.type_) + " is not assignable to " + _entities.Type.displayName.call(toParameter.type_));
    } else {
      if (subjectParameter.mutable && !toParameter.mutable) {
        return _core.List.push.call(errors, "Parameter #" + i + " is required to be immutable");
      };
    };
  });
  if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: errors, $isTraitObject: true }) > 0) {
    return (0, _core.Err)($unwrapTraitObject(_core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: errors, $isTraitObject: true }, 0)));
  };
  if (!(0, _types.isAssignable)(to.returnType, subject.returnType)) {
    return (0, _core.Err)("Return type " + _entities.Type.displayName.call(subject.returnType) + " is not assignable to " + _entities.Type.displayName.call(to.returnType));
  } else {
    return (0, _core.Ok)([]);
  };
};
function resolveFunctionTypeParameters(parameterMap, typeParameters, parameterType, argumentType) {
  var allowedToFollowFunction = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

  if (!parameterType || !argumentType || _entities.Type.isNever.call(argumentType)) {
    return [];
  };
  var __PUCK__value__13 = parameterType.kind;
  if ($unwrapTraitObject(__PUCK__value__13).kind == "Parameter") {
    (function () {
      var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__13),
          _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
          __PUCK__value__14 = _$unwrapTraitObject2$[0];

      var name = _core.Option.unwrap.call(parameterType.name);
      if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: typeParameters, $isTraitObject: true }, function (p) {
        return _core.Option.unwrap.call(p.name) == name;
      })) {
        if (!_core.ObjectMap.has.call(parameterMap, name)) {
          parameterMap[name] = argumentType;
        };
      };
    })();
  } else {
    if ($unwrapTraitObject(__PUCK__value__13).kind == "Struct") {
      var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__13),
          _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
          struct = _$unwrapTraitObject3$[0];

      if (!_core.Option.isSome.call(parameterType.id)) {
        var __PUCK__value__15 = struct.kind;
        if ($unwrapTraitObject(__PUCK__value__15).kind == "Record") {
          var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__15),
              _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
              parameterRecord = _$unwrapTraitObject4$[0];

          var __PUCK__value__16 = argumentType.kind;
          if (__PUCK__value__16.kind == "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__16.value)[0]).kind).kind == "Record") {
            (function () {
              var _PUCK__value__16$val = _slicedToArray(__PUCK__value__16.value, 1),
                  _PUCK__value__16$val$ = _slicedToArray(_PUCK__value__16$val[0].kind.value, 1),
                  argumentRecord = _PUCK__value__16$val$[0];

              _core.ObjectMap.forEach.call(parameterRecord.properties, function (_ref5) {
                var _ref6 = _slicedToArray(_ref5, 2),
                    name = _ref6[0],
                    parameterType = _ref6[1];

                var __PUCK__value__17 = _core.ObjectMap.get.call(argumentRecord.properties, name);
                if (__PUCK__value__17.kind == "Some") {
                  var _PUCK__value__17$val = _slicedToArray(__PUCK__value__17.value, 1),
                      _argumentType = _PUCK__value__17$val[0];

                  return resolveFunctionTypeParameters(parameterMap, typeParameters, parameterType, _argumentType);
                };
              });
            })();
          };
        } else {
          if ($unwrapTraitObject(__PUCK__value__15).kind == "Tuple") {
            var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__15),
                _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
                parameterTuple = _$unwrapTraitObject5$[0];

            var __PUCK__value__18 = argumentType.kind;
            if (__PUCK__value__18.kind == "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__18.value)[0]).kind).kind == "Tuple") {
              (function () {
                var _PUCK__value__18$val = _slicedToArray(__PUCK__value__18.value, 1),
                    _PUCK__value__18$val$ = _slicedToArray(_PUCK__value__18$val[0].kind.value, 1),
                    argumentTuple = _PUCK__value__18$val$[0];

                var __PUCK__value__19 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameterTuple.properties, $isTraitObject: true });
                _core.Iterable[__PUCK__value__19.type].forEach.call(__PUCK__value__19, function (_ref7) {
                  var _ref8 = _slicedToArray(_ref7, 2),
                      i = _ref8[0],
                      parameterType = _ref8[1];

                  var __PUCK__value__20 = _core.List.get.call(argumentTuple.properties, i);
                  if (__PUCK__value__20.kind == "Some") {
                    var _PUCK__value__20$val = _slicedToArray(__PUCK__value__20.value, 1),
                        _argumentType2 = _PUCK__value__20$val[0];

                    return resolveFunctionTypeParameters(parameterMap, typeParameters, parameterType, _argumentType2);
                  };
                });
              })();
            };
          } else {
            if (true) {
              var __PUCK__value__21 = __PUCK__value__15;
            };
          };
        };
      };
    } else {
      if ($unwrapTraitObject(__PUCK__value__13).kind == "Function") {
        var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__13),
            _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
            parameterFunction = _$unwrapTraitObject6$[0];

        if (allowedToFollowFunction && parameterFunction.returnType) {
          var __PUCK__value__22 = argumentType.kind;
          if (__PUCK__value__22.kind == "Function") {
            var _PUCK__value__22$val = _slicedToArray(__PUCK__value__22.value, 1),
                argumentFunction = _PUCK__value__22$val[0];

            if (argumentFunction.returnType) {
              resolveFunctionTypeParameters(parameterMap, typeParameters, parameterFunction.returnType, argumentFunction.returnType);
            };
          };
        };
      } else {
        if (true) {
          var __PUCK__value__23 = __PUCK__value__13;
        };
      };
    };
  };
  var __PUCK__value__24 = [_entities.Type.typeParameters.call(parameterType), _entities.Type.typeParameters.call(argumentType)];
  if ($unwrapTraitObject($unwrapTraitObject(__PUCK__value__24)[0]).kind == "Some" && $unwrapTraitObject($unwrapTraitObject(__PUCK__value__24)[1]).kind == "Some") {
    var _ret4 = function () {
      var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__24),
          _$unwrapTraitObject8 = _slicedToArray(_$unwrapTraitObject7, 2),
          _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8[0].value, 1),
          parameterParameters = _$unwrapTraitObject8$[0],
          _$unwrapTraitObject8$2 = _slicedToArray(_$unwrapTraitObject8[1].value, 1),
          argumentParameters = _$unwrapTraitObject8$2[0];

      var __PUCK__value__25 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameterParameters, $isTraitObject: true });
      return {
        v: _core.Iterable[__PUCK__value__25.type].forEach.call(__PUCK__value__25, function (_ref9) {
          var _ref10 = _slicedToArray(_ref9, 2),
              i = _ref10[0],
              parameterType = _ref10[1];

          var __PUCK__value__26 = _core.List.get.call(argumentParameters, i);
          if (__PUCK__value__26.kind == "Some") {
            var _PUCK__value__26$val = _slicedToArray(__PUCK__value__26.value, 1),
                _argumentType3 = _PUCK__value__26$val[0];

            return resolveFunctionTypeParameters(parameterMap, typeParameters, parameterType, _argumentType3, false);
          };
        })
      };
    }();

    if ((typeof _ret4 === 'undefined' ? 'undefined' : _typeof(_ret4)) === "object") return _ret4.v;
  } else {
    if (true) {
      var __PUCK__value__27 = __PUCK__value__24;;
      var __PUCK__value__28 = __PUCK__value__27;;
      return __PUCK__value__27;
    };
  };
}
