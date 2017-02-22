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
      name: _core.Option.unwrapOr.call(getPatternName(p.pattern), "p" + i + ""),
      token: p,
      mutable: p.mutable,
      allowRedeclare: true,
      type_: p.type_,
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

    var toParameter = _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: to.parameters, $isTraitObject: true }, i);
    if (!(0, _types.isAssignable)(toParameter.type_, subjectParameter.type_)) {
      return errors.push("Types of parameter #" + i + " does not match. " + _entities.Type.displayName.call(subjectParameter.type_) + " is not assignable to " + _entities.Type.displayName.call(toParameter.type_));
    } else {
      if (subjectParameter.mutable && !toParameter.mutable) {
        return errors.push("Parameter #" + i + " is required to be immutable");
      };
    };
  });
  if (errors.length > 0) {
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
  var __PUCK__value__15 = parameterType.kind;
  var __PUCK__value__16 = __PUCK__value__15;
  if ($unwrapTraitObject(__PUCK__value__16).kind == "Parameter") {
    (function () {
      var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__16),
          _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
          __PUCK__value__17 = _$unwrapTraitObject4$[0];

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
    var __PUCK__value__18 = __PUCK__value__15;
    if ($unwrapTraitObject(__PUCK__value__18).kind == "Struct") {
      var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__18),
          _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
          struct = _$unwrapTraitObject5$[0];

      var __PUCK__value__19 = struct.kind;
      var __PUCK__value__20 = __PUCK__value__19;
      if ($unwrapTraitObject(__PUCK__value__20).kind == "Record") {
        var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__20),
            _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
            parameterRecord = _$unwrapTraitObject6$[0];

        var __PUCK__value__21 = argumentType.kind;
        if ($unwrapTraitObject(__PUCK__value__21).kind == "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__21).value)[$unwrapTraitObject(0)]).kind).kind == "Record") {
          (function () {
            var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__21),
                _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
                _$unwrapTraitObject7$2 = _slicedToArray(_$unwrapTraitObject7$[0].kind.value, 1),
                argumentRecord = _$unwrapTraitObject7$2[0];

            _core.ObjectMap.forEach.call(parameterRecord.properties, function (_ref5) {
              var _ref6 = _slicedToArray(_ref5, 2),
                  name = _ref6[0],
                  parameterType = _ref6[1];

              var __PUCK__value__22 = _core.ObjectMap.get.call(argumentRecord.properties, name);
              if ($unwrapTraitObject(__PUCK__value__22).kind == "Some") {
                var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__22),
                    _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
                    _argumentType = _$unwrapTraitObject8$[0];

                return resolveFunctionTypeParameters(parameterMap, typeParameters, parameterType, _argumentType);
              };
            });
          })();
        };
      } else {
        var __PUCK__value__23 = __PUCK__value__19;
        if ($unwrapTraitObject(__PUCK__value__23).kind == "Tuple") {
          var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__23),
              _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
              parameterTuple = _$unwrapTraitObject9$[0];

          var __PUCK__value__24 = argumentType.kind;
          if ($unwrapTraitObject(__PUCK__value__24).kind == "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__24).value)[$unwrapTraitObject(0)]).kind).kind == "Tuple") {
            (function () {
              var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__24),
                  _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
                  _$unwrapTraitObject12 = _slicedToArray(_$unwrapTraitObject11[0].kind.value, 1),
                  argumentTuple = _$unwrapTraitObject12[0];

              var __PUCK__value__25 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameterTuple.properties, $isTraitObject: true });
              _core.Iterable[__PUCK__value__25.type].forEach.call(__PUCK__value__25, function (_ref7) {
                var _ref8 = _slicedToArray(_ref7, 2),
                    parameterType = _ref8[0],
                    i = _ref8[1];

                var __PUCK__value__26 = _core.List.get.call(argumentTuple.properties, i);
                if ($unwrapTraitObject(__PUCK__value__26).kind == "Some") {
                  var _$unwrapTraitObject13 = $unwrapTraitObject(__PUCK__value__26),
                      _$unwrapTraitObject14 = _slicedToArray(_$unwrapTraitObject13.value, 1),
                      _argumentType2 = _$unwrapTraitObject14[0];

                  return resolveFunctionTypeParameters(parameterMap, typeParameters, parameterType, _argumentType2);
                };
              });
            })();
          };
        } else {
          var __PUCK__value__27 = __PUCK__value__19;
          if (true) {
            var __PUCK__value__28 = __PUCK__value__27;
          };
        };
      };
    } else {
      var __PUCK__value__29 = __PUCK__value__15;
      if ($unwrapTraitObject(__PUCK__value__29).kind == "Function") {
        var _$unwrapTraitObject15 = $unwrapTraitObject(__PUCK__value__29),
            _$unwrapTraitObject16 = _slicedToArray(_$unwrapTraitObject15.value, 1),
            parameterFunction = _$unwrapTraitObject16[0];

        if (allowedToFollowFunction && parameterFunction.returnType) {
          var __PUCK__value__30 = argumentType.kind;
          if ($unwrapTraitObject(__PUCK__value__30).kind == "Function") {
            var _$unwrapTraitObject17 = $unwrapTraitObject(__PUCK__value__30),
                _$unwrapTraitObject18 = _slicedToArray(_$unwrapTraitObject17.value, 1),
                argumentFunction = _$unwrapTraitObject18[0];

            if (argumentFunction.returnType) {
              resolveFunctionTypeParameters(parameterMap, typeParameters, parameterFunction.returnType, argumentFunction.returnType);
            };
          };
        };
      } else {
        var __PUCK__value__31 = __PUCK__value__15;
        if (true) {
          var __PUCK__value__32 = __PUCK__value__31;
        };
      };
    };
  };
  var __PUCK__value__33 = [_entities.Type.typeParameters.call(parameterType), _entities.Type.typeParameters.call(argumentType)];
  var __PUCK__value__34 = __PUCK__value__33;
  if ($unwrapTraitObject($unwrapTraitObject(__PUCK__value__34)[$unwrapTraitObject(0)]).kind == "Some" && $unwrapTraitObject($unwrapTraitObject(__PUCK__value__34)[$unwrapTraitObject(1)]).kind == "Some") {
    var _ret4 = function () {
      var _$unwrapTraitObject19 = $unwrapTraitObject(__PUCK__value__34),
          _$unwrapTraitObject20 = _slicedToArray(_$unwrapTraitObject19, 2),
          _$unwrapTraitObject21 = _slicedToArray(_$unwrapTraitObject20[0].value, 1),
          parameterParameters = _$unwrapTraitObject21[0],
          _$unwrapTraitObject22 = _slicedToArray(_$unwrapTraitObject20[1].value, 1),
          argumentParameters = _$unwrapTraitObject22[0];

      var __PUCK__value__35 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameterParameters, $isTraitObject: true });
      return {
        v: _core.Iterable[__PUCK__value__35.type].forEach.call(__PUCK__value__35, function (_ref9) {
          var _ref10 = _slicedToArray(_ref9, 2),
              parameterType = _ref10[0],
              i = _ref10[1];

          var __PUCK__value__36 = _core.List.get.call(argumentParameters, i);
          if ($unwrapTraitObject(__PUCK__value__36).kind == "Some") {
            var _$unwrapTraitObject23 = $unwrapTraitObject(__PUCK__value__36),
                _$unwrapTraitObject24 = _slicedToArray(_$unwrapTraitObject23.value, 1),
                _argumentType3 = _$unwrapTraitObject24[0];

            return resolveFunctionTypeParameters(parameterMap, typeParameters, parameterType, _argumentType3, false);
          };
        })
      };
    }();

    if ((typeof _ret4 === 'undefined' ? 'undefined' : _typeof(_ret4)) === "object") return _ret4.v;
  } else {
    var __PUCK__value__37 = __PUCK__value__33;
    if (true) {
      var __PUCK__value__38 = __PUCK__value__37;;
      var __PUCK__value__39 = __PUCK__value__38;;
      return __PUCK__value__38;
    };
  };
}
