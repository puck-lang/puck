'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveTypeParameters = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.createTypeInstance = createTypeInstance;
exports.isAssignable = isAssignable;
exports.isSameType = isSameType;
exports.findCommonType = findCommonType;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _ast = require('./../../ast/ast');

var _visit = require('./../../ast/visit');

var visit = _interopRequireWildcard(_visit);

var _ast2 = require('./../../compiler/ast');

var _entities = require('./../../entities');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};

function assign(a, b) {
  return _js._Object.assign({}, a, b);
};
var resolveTypeParameters = exports.resolveTypeParameters = function resolveTypeParameters(parameterMap) {
  var enterNamed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  return function resolveTypeParametersInner(type_) {
    if (!type_) {
      return type_;
    };
    var __PUCK__value__1 = type_.instance;
    if (__PUCK__value__1.kind == "Some") {
      var _PUCK__value__1$valu = _slicedToArray(__PUCK__value__1.value, 1),
          instance = _PUCK__value__1$valu[0];

      var i = instance;
      var typeParameters = instance.typeParameters;
      return createTypeInstance(i._class, _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: typeParameters, $isTraitObject: true }, resolveTypeParameters(parameterMap, false)));
    };
    if (!enterNamed && !_entities.Type.isParameter.call(type_) && (_core.Option.isSome.call(type_.name) || _core.Option.isSome.call(type_.displayName))) {
      return type_;
    };
    var __PUCK__value__2 = type_.kind;
    var __PUCK__value__3 = void 0;
    if ($unwrapTraitObject(__PUCK__value__2).kind == "Enum") {
      var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__2),
          _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
          enum_ = _$unwrapTraitObject$v[0];

      __PUCK__value__3 = _entities.TypeKind.Enum(resolveTypeParametersEnum(parameterMap, enum_));
    } else {
      var __PUCK__value__4 = void 0;
      if ($unwrapTraitObject(__PUCK__value__2).kind == "Function") {
        var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__2),
            _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
            func = _$unwrapTraitObject2$[0];

        var f = func;
        __PUCK__value__4 = _entities.TypeKind.Function(resolveTypeParametersFn(parameterMap, f));
      } else {
        var __PUCK__value__5 = void 0;
        if ($unwrapTraitObject(__PUCK__value__2).kind == "Parameter") {
          var _undefined2 = $unwrapTraitObject(__PUCK__value__2);
          return _core.Option.unwrapOr.call(_core.ObjectMap.get.call(parameterMap, _core.Option.unwrap.call(type_.name)), type_);
        } else {
          var __PUCK__value__6 = void 0;
          if ($unwrapTraitObject(__PUCK__value__2).kind == "Struct") {
            var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__2),
                _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
                struct = _$unwrapTraitObject3$[0];

            __PUCK__value__6 = _entities.TypeKind.Struct(resolveTypeParametersStruct(parameterMap, struct));
          } else {
            var __PUCK__value__7 = void 0;
            if ($unwrapTraitObject(__PUCK__value__2).kind == "Trait") {
              var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__2),
                  _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
                  trait_ = _$unwrapTraitObject4$[0];

              __PUCK__value__7 = _entities.TypeKind.Trait(resolveTypeParametersTrait(parameterMap, trait_));
            } else {
              var __PUCK__value__8 = void 0;
              if (true) {
                var __PUCK__value__9 = __PUCK__value__2;
                return type_;
              };
              __PUCK__value__7 = __PUCK__value__8;
            };
            __PUCK__value__6 = __PUCK__value__7;
          };
          __PUCK__value__5 = __PUCK__value__6;
        };
        __PUCK__value__4 = __PUCK__value__5;
      };
      __PUCK__value__3 = __PUCK__value__4;
    };
    var resolvedKind = __PUCK__value__3;
    return assign(type_, { kind: resolvedKind });
  };
};
function resolveTypeParametersEnum(parameterMap, e) {
  return assign(e, { members: _core.ObjectMap.map.call(e.members, resolveTypeParameters(parameterMap)) });
};
function resolveTypeParametersFn(parameterMap, func) {
  var __PUCK__value__10 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: func.parameters, $isTraitObject: true }, function (binding) {
    return assign(binding, { type_: resolveTypeParameters(parameterMap, false)(binding.type_) });
  });
  return assign(func, {
    parameters: _core.Iterable[__PUCK__value__10.type].toList.call(__PUCK__value__10),
    returnType: resolveTypeParameters(parameterMap, false)(func.returnType)
  });
};
function resolveTypeParametersStruct(parameterMap, struct) {
  var __PUCK__value__11 = struct.kind;
  var __PUCK__value__12 = void 0;
  if ($unwrapTraitObject(__PUCK__value__11).kind == "Record") {
    var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__11),
        _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
        properties = _$unwrapTraitObject5$[0].properties;

    __PUCK__value__12 = _entities.StructKind.Record({ properties: _core.ObjectMap.map.call(properties, resolveTypeParameters(parameterMap, false)) });
  } else {
    var __PUCK__value__13 = void 0;
    if ($unwrapTraitObject(__PUCK__value__11).kind == "Tuple") {
      var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__11),
          _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
          _properties = _$unwrapTraitObject6$[0].properties;

      var __PUCK__value__14 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _properties, $isTraitObject: true }, resolveTypeParameters(parameterMap, false));
      __PUCK__value__13 = _entities.StructKind.Tuple({ properties: _core.Iterable[__PUCK__value__14.type].toList.call(__PUCK__value__14) });
    } else {
      var __PUCK__value__15 = void 0;
      if ($unwrapTraitObject(__PUCK__value__11).kind == "Unit") {
        var _undefined3 = $unwrapTraitObject(__PUCK__value__11);
        __PUCK__value__15 = struct.kind;
      };
      __PUCK__value__13 = __PUCK__value__15;
    };
    __PUCK__value__12 = __PUCK__value__13;
  };
  return $unwrapTraitObject(assign(struct, { kind: __PUCK__value__12 }));
};
function resolveTypeParametersTrait(parameterMap, t) {
  return assign(t, { functions: _core.ObjectMap.map.call(t.functions, resolveTypeParameters(parameterMap, false)) });
};
function createTypeInstance(type_, typeParameters_) {
  var __PUCK__value__16 = type_.providesType;
  if (__PUCK__value__16.kind == "Some") {
    var _PUCK__value__16$val = _slicedToArray(__PUCK__value__16.value, 1),
        providedType = _PUCK__value__16$val[0];

    var p = providedType;
    return (0, _entities.Type)({
      id: type_.id,
      displayName: type_.displayName,
      name: type_.name,
      kind: type_.kind,
      _class: type_._class,
      instance: type_.instance,
      providesType: createTypeInstance(p, typeParameters_),
      enumMember: type_.enumMember
    });
  };
  var _class = _core.Option.unwrap.call(type_._class);
  var __PUCK__value__17 = void 0;
  if (_core.Iterable[typeParameters_.type].size.call(typeParameters_) < _class.parameterRange.end - 1) {
    var __PUCK__value__19 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].skip.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _class.typeParameters, $isTraitObject: true }, _core.Iterable[typeParameters_.type].size.call(typeParameters_));
    var __PUCK__value__18 = _core.Iterable[__PUCK__value__19.type].map.call(__PUCK__value__19, function (p) {
      var __PUCK__value__20 = p.kind;
      if (__PUCK__value__20.kind == "Parameter") {
        var _PUCK__value__20$val = _slicedToArray(__PUCK__value__20.value, 1),
            parameter = _PUCK__value__20$val[0];

        return _core.Option.unwrapOr.call(parameter.defaultValue, p);
      } else {
        throw "not a type parameter";
      };
    });
    __PUCK__value__17 = typeParameters_.value.concat(_core.Iterable[__PUCK__value__18.type].toList.call(__PUCK__value__18));
  } else {
    __PUCK__value__17 = _core.Iterable[typeParameters_.type].toList.call(typeParameters_);
  };
  var typeParameters = __PUCK__value__17;
  var __PUCK__value__21 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _class.instances, $isTraitObject: true }, function (a) {
    var i = _core.Option.unwrap.call(a.instance);
    var __PUCK__value__22 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true });
    return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true }) == _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: typeParameters, $isTraitObject: true }) && _core.Iterable[__PUCK__value__22.type].all.call(__PUCK__value__22, function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          i = _ref2[0],
          p = _ref2[1];

      return isSameType(p, _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: typeParameters, $isTraitObject: true }, i));
    });
  });
  if (__PUCK__value__21.kind == "Some") {
    var _PUCK__value__21$val = _slicedToArray(__PUCK__value__21.value, 1),
        cachedInstance = _PUCK__value__21$val[0];

    return cachedInstance;
  };
  var parameterMap = _core.ObjectMap.fromIter(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _core.List.zip({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: typeParameters, $isTraitObject: true }, _class.typeParameters), $isTraitObject: true }, function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        typeArgument = _ref4[0],
        typeParameter = _ref4[1];

    return [_core.Option.unwrap.call(typeParameter.name), typeArgument];
  }));
  var instance = {
    id: type_.id,
    displayName: type_.displayName,
    name: type_.name,
    kind: type_.kind,
    _class: _core.None,
    instance: (0, _core.Some)({
      _class: type_,
      typeParameters: typeParameters,
      parameterMap: parameterMap
    }),
    providesType: type_.providesType,
    enumMember: type_.enumMember
  };
  _core.List.push.call(_class.instances, instance);
  instance.kind = $unwrapTraitObject($unwrapTraitObject(resolveTypeParameters(parameterMap)(type_)).kind);
  var __PUCK__value__23 = instance.kind;
  if (__PUCK__value__23.kind == "Enum") {
    var _PUCK__value__23$val = _slicedToArray(__PUCK__value__23.value, 1),
        enum_ = _PUCK__value__23$val[0];

    _core.ObjectMap.forEach.call(enum_.members, function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
          __PUCK__value__24 = _ref6[0],
          member = _ref6[1];

      return member.enumMember = _core.Option.map.call(member.enumMember, function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
            member = _ref8[0],
            __PUCK__value__25 = _ref8[1];

        return [member, instance];
      });
    });
  };
  return instance;
};
function isSameId(to, subject) {
  var __PUCK__value__26 = [to.id, subject.id];
  if ($unwrapTraitObject($unwrapTraitObject(__PUCK__value__26)[0]).kind == "Some" && $unwrapTraitObject($unwrapTraitObject(__PUCK__value__26)[1]).kind == "Some") {
    var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__26),
        _$unwrapTraitObject8 = _slicedToArray(_$unwrapTraitObject7, 2),
        _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8[0].value, 1),
        toId = _$unwrapTraitObject8$[0],
        _$unwrapTraitObject8$2 = _slicedToArray(_$unwrapTraitObject8[1].value, 1),
        subjectId = _$unwrapTraitObject8$2[0];

    return toId == subjectId;
  } else {
    if (true) {
      var __PUCK__value__27 = __PUCK__value__26;
      return true;
    };
  };
};
function checkTypeParameters(to, subject) {
  if (_core.Option.isNone.call(to.id) || _core.Option.isNone.call(subject.id)) {
    return true;
  };
  var __PUCK__value__28 = [_entities.Type.typeParameters.call(to), _entities.Type.typeParameters.call(subject)];
  if ($unwrapTraitObject($unwrapTraitObject(__PUCK__value__28)[0]).kind == "Some" && $unwrapTraitObject($unwrapTraitObject(__PUCK__value__28)[1]).kind == "Some") {
    var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__28),
        _$unwrapTraitObject10 = _slicedToArray(_$unwrapTraitObject9, 2),
        _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10[0].value, 1),
        toParameters = _$unwrapTraitObject11[0],
        _$unwrapTraitObject12 = _slicedToArray(_$unwrapTraitObject10[1].value, 1),
        subjectParameters = _$unwrapTraitObject12[0];

    if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: toParameters, $isTraitObject: true }) == _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: subjectParameters, $isTraitObject: true })) {
      return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _core.List.zip({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: toParameters, $isTraitObject: true }, subjectParameters), $isTraitObject: true }, function (_ref9) {
        var _ref10 = _slicedToArray(_ref9, 2),
            toParameter = _ref10[0],
            subjectParameter = _ref10[1];

        return isAssignable(toParameter, subjectParameter);
      });
    } else {
      return false;
    };
  } else {
    if ($unwrapTraitObject($unwrapTraitObject(__PUCK__value__28)[0]).kind == "None" && $unwrapTraitObject($unwrapTraitObject(__PUCK__value__28)[1]).kind == "None") {
      var _$unwrapTraitObject13 = $unwrapTraitObject(__PUCK__value__28),
          _$unwrapTraitObject14 = _slicedToArray(_$unwrapTraitObject13, 1);

      return true;
    } else {
      if (true) {
        var __PUCK__value__29 = __PUCK__value__28;
        return false;
      };
    };
  };
};
function isAssignable(to, subject) {
  if (to && !subject) {
    var __PUCK__value__30 = to.kind;
    if (__PUCK__value__30.kind == "Trait") {
      var _PUCK__value__30$val = _slicedToArray(__PUCK__value__30.value, 1),
          __PUCK__value__31 = _PUCK__value__30$val[0];

      return false;
    };
  };
  if (!subject || !to) {
    return true;
  };
  if (to == subject) {
    return true;
  };
  var __PUCK__value__32 = subject.kind;
  if ($unwrapTraitObject(__PUCK__value__32).kind == "Parameter") {
    var _undefined4 = $unwrapTraitObject(__PUCK__value__32);
    return true;
  } else {
    if ($unwrapTraitObject(__PUCK__value__32).kind == "Enum") {
      var _$unwrapTraitObject15 = $unwrapTraitObject(__PUCK__value__32),
          _$unwrapTraitObject16 = _slicedToArray(_$unwrapTraitObject15.value, 1),
          enum_ = _$unwrapTraitObject16[0];

      if (_core.ObjectMap.size.call(enum_.members) == 0) {
        return true;
      };
    } else {
      if (true) {
        var __PUCK__value__33 = __PUCK__value__32;
      };
    };
  };
  var __PUCK__value__34 = to.kind;
  if ($unwrapTraitObject(__PUCK__value__34).kind == "Enum") {
    var _$unwrapTraitObject17 = $unwrapTraitObject(__PUCK__value__34),
        _$unwrapTraitObject18 = _slicedToArray(_$unwrapTraitObject17.value, 1),
        toEnum = _$unwrapTraitObject18[0];

    var __PUCK__value__35 = subject.kind;
    if ($unwrapTraitObject(__PUCK__value__35).kind == "Enum") {
      var _$unwrapTraitObject19 = $unwrapTraitObject(__PUCK__value__35),
          _$unwrapTraitObject20 = _slicedToArray(_$unwrapTraitObject19.value, 1),
          subjectEnum = _$unwrapTraitObject20[0];

      return isSameId(to, subject) && isEnumAssignable(toEnum, subjectEnum) && checkTypeParameters(to, subject);
    } else {
      if (true) {
        var __PUCK__value__36 = __PUCK__value__35;
        return false;
      };
    };
  } else {
    if ($unwrapTraitObject(__PUCK__value__34).kind == "Function") {
      var _$unwrapTraitObject21 = $unwrapTraitObject(__PUCK__value__34),
          _$unwrapTraitObject22 = _slicedToArray(_$unwrapTraitObject21.value, 1),
          toFunc = _$unwrapTraitObject22[0];

      var __PUCK__value__37 = subject.kind;
      if ($unwrapTraitObject(__PUCK__value__37).kind == "Function") {
        var _$unwrapTraitObject23 = $unwrapTraitObject(__PUCK__value__37),
            _$unwrapTraitObject24 = _slicedToArray(_$unwrapTraitObject23.value, 1),
            subjectFunc = _$unwrapTraitObject24[0];

        return isFunctionAssignable(toFunc, subjectFunc);
      } else {
        if (true) {
          var __PUCK__value__38 = __PUCK__value__37;
          return false;
        };
      };
    } else {
      if ($unwrapTraitObject(__PUCK__value__34).kind == "Parameter") {
        var _undefined5 = $unwrapTraitObject(__PUCK__value__34);
        return true;
      } else {
        if ($unwrapTraitObject(__PUCK__value__34).kind == "Struct") {
          var _$unwrapTraitObject25 = $unwrapTraitObject(__PUCK__value__34),
              _$unwrapTraitObject26 = _slicedToArray(_$unwrapTraitObject25.value, 1),
              toStruct = _$unwrapTraitObject26[0];

          var __PUCK__value__39 = subject.kind;
          if ($unwrapTraitObject(__PUCK__value__39).kind == "Struct") {
            var _$unwrapTraitObject27 = $unwrapTraitObject(__PUCK__value__39),
                _$unwrapTraitObject28 = _slicedToArray(_$unwrapTraitObject27.value, 1),
                subjectStruct = _$unwrapTraitObject28[0];

            return isSameId(to, subject) && isStructAssignable(toStruct, subjectStruct) && checkTypeParameters(to, subject);
          } else {
            if (true) {
              var __PUCK__value__40 = __PUCK__value__39;
              return false;
            };
          };
        } else {
          if ($unwrapTraitObject(__PUCK__value__34).kind == "Trait") {
            var _undefined6 = $unwrapTraitObject(__PUCK__value__34);
            var __PUCK__value__41 = subject.kind;
            if ($unwrapTraitObject(__PUCK__value__41).kind == "Trait") {
              var _undefined7 = $unwrapTraitObject(__PUCK__value__41);
              return isSameId(to, subject) && checkTypeParameters(to, subject);
            } else {
              if ($unwrapTraitObject(__PUCK__value__41).kind == "Enum") {
                var _$unwrapTraitObject29 = $unwrapTraitObject(__PUCK__value__41),
                    _$unwrapTraitObject30 = _slicedToArray(_$unwrapTraitObject29.value, 1),
                    _subjectEnum = _$unwrapTraitObject30[0];

                return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _subjectEnum.implementations, $isTraitObject: true }, function (implementation) {
                  return isAssignable(to, implementation.trait_);
                });
              } else {
                if ($unwrapTraitObject(__PUCK__value__41).kind == "Struct") {
                  var _$unwrapTraitObject31 = $unwrapTraitObject(__PUCK__value__41),
                      _$unwrapTraitObject32 = _slicedToArray(_$unwrapTraitObject31.value, 1),
                      _subjectStruct = _$unwrapTraitObject32[0];

                  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _subjectStruct.implementations, $isTraitObject: true }, function (implementation) {
                    return isAssignable(to, implementation.trait_);
                  });
                } else {
                  if (true) {
                    var __PUCK__value__42 = __PUCK__value__41;
                    return false;
                  };
                };
              };
            };
          };
        };
      };
    };
  };
};
function isEnumAssignable(to, subject) {
  if (_core.ObjectMap.size.call(to.members) == _core.ObjectMap.size.call(subject.members)) {
    return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _core.ObjectMap.toList.call(to.members), $isTraitObject: true }, function (_ref11) {
      var _ref12 = _slicedToArray(_ref11, 2),
          name = _ref12[0],
          toMember = _ref12[1];

      return isAssignable(toMember, _core.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({ type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: subject.members, $isTraitObject: true }, name));
    });
  } else {
    return false;
  };
};
function isFunctionAssignable(to, subject) {
  if (!_core.Range.isSubsetOf.call(to.parameterRange, subject.parameterRange)) {
    return false;
  };
  var __PUCK__value__43 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: to.parameters, $isTraitObject: true });
  if (!_core.Iterable[__PUCK__value__43.type].all.call(__PUCK__value__43, function (_ref13) {
    var _ref14 = _slicedToArray(_ref13, 2),
        i = _ref14[0],
        toArg = _ref14[1];

    return isAssignable(_core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: subject.parameters, $isTraitObject: true }, i).type_, toArg.type_);
  })) {
    return false;
  };
  return isAssignable(to.returnType, subject.returnType) || _entities.Type.isEmpty.call(to.returnType);
};
function isStructAssignable(to, subject) {
  var __PUCK__value__44 = [to.kind, subject.kind];
  if ($unwrapTraitObject($unwrapTraitObject(__PUCK__value__44)[0]).kind == "Record" && $unwrapTraitObject($unwrapTraitObject(__PUCK__value__44)[1]).kind == "Record") {
    var _ret = function () {
      var _$unwrapTraitObject33 = $unwrapTraitObject(__PUCK__value__44),
          _$unwrapTraitObject34 = _slicedToArray(_$unwrapTraitObject33, 2),
          _$unwrapTraitObject35 = _slicedToArray(_$unwrapTraitObject34[0].value, 1),
          toProps = _$unwrapTraitObject35[0].properties,
          _$unwrapTraitObject36 = _slicedToArray(_$unwrapTraitObject34[1].value, 1),
          subjectProps = _$unwrapTraitObject36[0].properties;

      return {
        v: _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _core.ObjectMap.toList.call(toProps), $isTraitObject: true }, function (_ref15) {
          var _ref16 = _slicedToArray(_ref15, 2),
              key = _ref16[0],
              toProp = _ref16[1];

          return _core.ObjectMap.has.call(subjectProps, key) && isAssignable(toProp, _core.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({ type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: subjectProps, $isTraitObject: true }, key));
        })
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  } else {
    if ($unwrapTraitObject($unwrapTraitObject(__PUCK__value__44)[0]).kind == "Tuple" && $unwrapTraitObject($unwrapTraitObject(__PUCK__value__44)[1]).kind == "Tuple") {
      var _$unwrapTraitObject37 = $unwrapTraitObject(__PUCK__value__44),
          _$unwrapTraitObject38 = _slicedToArray(_$unwrapTraitObject37, 2),
          _$unwrapTraitObject39 = _slicedToArray(_$unwrapTraitObject38[0].value, 1),
          toProps = _$unwrapTraitObject39[0].properties,
          _$unwrapTraitObject40 = _slicedToArray(_$unwrapTraitObject38[1].value, 1),
          subjectProps = _$unwrapTraitObject40[0].properties;

      if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: toProps, $isTraitObject: true }) != _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: subjectProps, $isTraitObject: true })) {
        return false;
      };
      return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _core.List.zip({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: toProps, $isTraitObject: true }, subjectProps), $isTraitObject: true }, function (_ref17) {
        var _ref18 = _slicedToArray(_ref17, 2),
            toProp = _ref18[0],
            subjectProp = _ref18[1];

        return isAssignable(toProp, subjectProp);
      });
    } else {
      if ($unwrapTraitObject($unwrapTraitObject(__PUCK__value__44)[0]).kind == "Unit" && $unwrapTraitObject($unwrapTraitObject(__PUCK__value__44)[1]).kind == "Unit") {
        var _$unwrapTraitObject41 = $unwrapTraitObject(__PUCK__value__44),
            _$unwrapTraitObject42 = _slicedToArray(_$unwrapTraitObject41, 1);

        return to.kind.value == subject.kind.value;
      } else {
        if (true) {
          var __PUCK__value__45 = __PUCK__value__44;
          return to.kind == subject.kind;
        };
      };
    };
  };
};
function isSameType(a, b) {
  var __PUCK__value__46 = [a.id, b.id];
  if ($unwrapTraitObject($unwrapTraitObject(__PUCK__value__46)[0]).kind == "Some" && $unwrapTraitObject($unwrapTraitObject(__PUCK__value__46)[1]).kind == "Some") {
    var _$unwrapTraitObject43 = $unwrapTraitObject(__PUCK__value__46),
        _$unwrapTraitObject44 = _slicedToArray(_$unwrapTraitObject43, 2),
        _$unwrapTraitObject45 = _slicedToArray(_$unwrapTraitObject44[0].value, 1),
        aId = _$unwrapTraitObject45[0],
        _$unwrapTraitObject46 = _slicedToArray(_$unwrapTraitObject44[1].value, 1),
        bId = _$unwrapTraitObject46[0];

    if (aId != bId) {
      return false;
    };
    var __PUCK__value__47 = [_entities.Type.typeParameters.call(a), _entities.Type.typeParameters.call(b)];
    if ($unwrapTraitObject($unwrapTraitObject(__PUCK__value__47)[0]).kind == "Some" && $unwrapTraitObject($unwrapTraitObject(__PUCK__value__47)[1]).kind == "Some") {
      var _$unwrapTraitObject47 = $unwrapTraitObject(__PUCK__value__47),
          _$unwrapTraitObject48 = _slicedToArray(_$unwrapTraitObject47, 2),
          _$unwrapTraitObject49 = _slicedToArray(_$unwrapTraitObject48[0].value, 1),
          aParameters = _$unwrapTraitObject49[0],
          _$unwrapTraitObject50 = _slicedToArray(_$unwrapTraitObject48[1].value, 1),
          bParameters = _$unwrapTraitObject50[0];

      if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: aParameters, $isTraitObject: true }) == _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: bParameters, $isTraitObject: true })) {
        return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _core.List.zip({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: aParameters, $isTraitObject: true }, bParameters), $isTraitObject: true }, function (_ref19) {
          var _ref20 = _slicedToArray(_ref19, 2),
              aParameter = _ref20[0],
              bParameter = _ref20[1];

          return isSameType(aParameter, bParameter);
        });
      } else {
        return false;
      };
    } else {
      if ($unwrapTraitObject($unwrapTraitObject(__PUCK__value__47)[0]).kind == "None" && $unwrapTraitObject($unwrapTraitObject(__PUCK__value__47)[1]).kind == "None") {
        var _$unwrapTraitObject51 = $unwrapTraitObject(__PUCK__value__47),
            _$unwrapTraitObject52 = _slicedToArray(_$unwrapTraitObject51, 1);

        return true;
      } else {
        if (true) {
          var __PUCK__value__48 = __PUCK__value__47;
          return false;
        };
      };
    };
  } else {
    if (true) {
      var __PUCK__value__49 = __PUCK__value__46;
      return false;
    };
  };
};
function findCommonType(types) {
  var index = 0;

  var _loop = function _loop() {
    var type_ = _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: types, $isTraitObject: true }, index);
    if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: types, $isTraitObject: true }, function (t) {
      return isAssignable(type_, t);
    })) {
      return {
        v: (0, _core.Ok)(type_)
      };
    };
    index += 1;
  };

  while (index < _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: types, $isTraitObject: true })) {
    var _ret2 = _loop();

    if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
  };
  return (0, _core.Err)([]);
}
