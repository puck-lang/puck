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
  return $unwrapTraitObject(_js._Object).assign({}, a, b);
};
var resolveTypeParameters = exports.resolveTypeParameters = function resolveTypeParameters(parameterMap) {
  var enterNamed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  return function resolveTypeParametersInner(type_) {
    if (!type_) {
      return type_;
    };
    var __PUCK__value__1 = type_.instance;
    if ($unwrapTraitObject(__PUCK__value__1).kind == "Some") {
      var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__1),
          _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
          instance = _$unwrapTraitObject$v[0];

      var i = instance;
      var typeParameters = instance.typeParameters;
      if (_core.Iterable['$List<E>'].any.call({ type: '$List<E>', value: typeParameters, $isTraitObject: true }, function (parameter) {
        return _entities.Type.isParameter.call(parameter);
      })) {
        return createTypeInstance(i._class, _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: typeParameters, $isTraitObject: true }, function (p) {
          if (_entities.Type.isParameter.call(p)) {
            return _core.Option.unwrapOr.call(_core.ObjectMap.get.call(parameterMap, _core.Option.unwrap.call(p.name)), p);
          } else {
            return p;
          };
        }));
      };
    };
    if (!enterNamed && !_entities.Type.isParameter.call(type_) && (_core.Option.isSome.call(type_.name) || _core.Option.isSome.call(type_.displayName))) {
      return type_;
    };
    var __PUCK__value__2 = type_.kind;
    var __PUCK__value__3 = __PUCK__value__2;
    var __PUCK__value__4 = void 0;
    if ($unwrapTraitObject(__PUCK__value__3).kind == "Enum") {
      var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__3),
          _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
          enum_ = _$unwrapTraitObject2$[0];

      __PUCK__value__4 = _entities.TypeKind.Enum(resolveTypeParametersEnum(parameterMap, enum_));
    } else {
      var __PUCK__value__5 = __PUCK__value__2;
      var __PUCK__value__6 = void 0;
      if ($unwrapTraitObject(__PUCK__value__5).kind == "Function") {
        var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__5),
            _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
            func = _$unwrapTraitObject3$[0];

        var f = func;
        __PUCK__value__6 = _entities.TypeKind.Function(resolveTypeParametersFn(parameterMap, f));
      } else {
        var __PUCK__value__7 = __PUCK__value__2;
        var __PUCK__value__8 = void 0;
        if ($unwrapTraitObject(__PUCK__value__7).kind == "Parameter") {
          var _undefined2 = $unwrapTraitObject(__PUCK__value__7);
          return _core.Option.unwrapOr.call(_core.ObjectMap.get.call(parameterMap, _core.Option.unwrap.call(type_.name)), type_);
        } else {
          var __PUCK__value__9 = __PUCK__value__2;
          var __PUCK__value__10 = void 0;
          if ($unwrapTraitObject(__PUCK__value__9).kind == "Struct") {
            var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__9),
                _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
                struct = _$unwrapTraitObject4$[0];

            __PUCK__value__10 = _entities.TypeKind.Struct(resolveTypeParametersStruct(parameterMap, struct));
          } else {
            var __PUCK__value__11 = __PUCK__value__2;
            var __PUCK__value__12 = void 0;
            if ($unwrapTraitObject(__PUCK__value__11).kind == "Trait") {
              var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__11),
                  _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
                  trait_ = _$unwrapTraitObject5$[0];

              __PUCK__value__12 = _entities.TypeKind.Trait(resolveTypeParametersTrait(parameterMap, trait_));
            } else {
              var __PUCK__value__13 = __PUCK__value__2;
              var __PUCK__value__14 = void 0;
              if (true) {
                var __PUCK__value__15 = __PUCK__value__13;
                return type_;
              };
              __PUCK__value__12 = __PUCK__value__14;
            };
            __PUCK__value__10 = __PUCK__value__12;
          };
          __PUCK__value__8 = __PUCK__value__10;
        };
        __PUCK__value__6 = __PUCK__value__8;
      };
      __PUCK__value__4 = __PUCK__value__6;
    };
    var resolvedKind = __PUCK__value__4;
    return assign(type_, { kind: resolvedKind });
  };
};
function resolveTypeParametersEnum(parameterMap, e) {
  return assign(e, { members: _core.ObjectMap.map.call(e.members, resolveTypeParameters(parameterMap)) });
};
function resolveTypeParametersFn(parameterMap, func) {
  var __PUCK__value__16 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: func.parameters, $isTraitObject: true }, function (binding) {
    var __PUCK__value__17 = void 0;
    if (binding.type_) {
      __PUCK__value__17 = resolveTypeParameters(parameterMap, false)(binding.type_);
    };
    return assign(binding, { type_: __PUCK__value__17 });
  });
  var __PUCK__value__18 = void 0;
  if (func.returnType) {
    __PUCK__value__18 = resolveTypeParameters(parameterMap, false)(func.returnType);
  };
  return assign(func, {
    parameters: _core.Iterable[__PUCK__value__16.type].toList.call(__PUCK__value__16),
    returnType: __PUCK__value__18
  });
};
function resolveTypeParametersStruct(parameterMap, struct) {
  var __PUCK__value__19 = struct.kind;
  var __PUCK__value__20 = __PUCK__value__19;
  var __PUCK__value__21 = void 0;
  if ($unwrapTraitObject(__PUCK__value__20).kind == "Record") {
    var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__20),
        _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
        properties = _$unwrapTraitObject6$[0].properties;

    __PUCK__value__21 = _entities.StructKind.Record({ properties: _core.ObjectMap.map.call(properties, resolveTypeParameters(parameterMap, false)) });
  } else {
    var __PUCK__value__22 = __PUCK__value__19;
    var __PUCK__value__23 = void 0;
    if ($unwrapTraitObject(__PUCK__value__22).kind == "Tuple") {
      var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__22),
          _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
          _properties = _$unwrapTraitObject7$[0].properties;

      var __PUCK__value__24 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: _properties, $isTraitObject: true }, resolveTypeParameters(parameterMap, false));
      __PUCK__value__23 = _entities.StructKind.Tuple({ properties: _core.Iterable[__PUCK__value__24.type].toList.call(__PUCK__value__24) });
    } else {
      var __PUCK__value__25 = __PUCK__value__19;
      var __PUCK__value__26 = void 0;
      if ($unwrapTraitObject(__PUCK__value__25).kind == "Unit") {
        var _undefined3 = $unwrapTraitObject(__PUCK__value__25);
        __PUCK__value__26 = struct.kind;
      };
      __PUCK__value__23 = __PUCK__value__26;
    };
    __PUCK__value__21 = __PUCK__value__23;
  };
  return assign(struct, { kind: __PUCK__value__21 });
};
function resolveTypeParametersTrait(parameterMap, t) {
  return assign(t, { functions: _core.ObjectMap.map.call(t.functions, resolveTypeParameters(parameterMap, false)) });
};
function mapObject(object, mapper) {
  return _core.ObjectMap.map.call(object, mapper);
};
function createTypeInstance(type_, typeParameters_) {
  var __PUCK__value__27 = type_.providesType;
  if ($unwrapTraitObject(__PUCK__value__27).kind == "Some") {
    var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__27),
        _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
        providedType = _$unwrapTraitObject8$[0];

    var p = providedType;
    return {
      displayName: type_.displayName,
      name: type_.name,
      kind: type_.kind,
      _class: type_._class,
      instance: type_.instance,
      providesType: createTypeInstance(p, typeParameters_),
      enumMember: type_.enumMember
    };
  };
  var _class = _core.Option.unwrap.call(type_._class);
  var __PUCK__value__28 = void 0;
  if (typeParameters_.value.length < _class.parameterRange.end - 1) {
    __PUCK__value__28 = typeParameters_.value.concat($unwrapTraitObject(_class.typeParameters.slice(typeParameters_.value.length)).map(function (p) {
      var __PUCK__value__29 = $unwrapTraitObject(p).kind;
      if ($unwrapTraitObject(__PUCK__value__29).kind == "Parameter") {
        var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__29),
            _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
            parameter = _$unwrapTraitObject9$[0];

        return _core.Option.unwrapOr.call(parameter.defaultValue, p);
      } else {
        throw "not a type parameter";
      };
    }));
  } else {
    __PUCK__value__28 = _core.Iterable[typeParameters_.type].toList.call(typeParameters_);
  };
  var typeParameters = __PUCK__value__28;
  var __PUCK__value__30 = _core.Iterable['$List<E>'].find.call({ type: '$List<E>', value: _class.instances, $isTraitObject: true }, function (a) {
    var i = _core.Option.unwrap.call(a.instance);
    return i.typeParameters.length == typeParameters.length && i.typeParameters.every(function (p, i) {
      return isSameType(p, typeParameters[$unwrapTraitObject(i)]);
    });
  });
  if ($unwrapTraitObject(__PUCK__value__30).kind == "Some") {
    var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__30),
        _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
        cachedInstance = _$unwrapTraitObject11[0];

    return cachedInstance;
  };
  var parameterMap = _core.ObjectMap.fromIter(_core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: _core.List.zip({ type: '$List<E>', value: typeParameters, $isTraitObject: true }, { type: '$List<E>', value: _class.typeParameters, $isTraitObject: true }), $isTraitObject: true }, function (p) {
    var typeArgument = p[0];
    var typeParameter = p[1];
    return [_core.Option.unwrap.call(typeParameter.name), typeArgument];
  }));
  var instance = {
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
  _class.instances.push(instance);
  instance.kind = $unwrapTraitObject(resolveTypeParameters(parameterMap)(type_)).kind;
  var __PUCK__value__31 = instance.kind;
  if ($unwrapTraitObject(__PUCK__value__31).kind == "Enum") {
    var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__31),
        _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12.value, 1),
        enum_ = _$unwrapTraitObject13[0];

    _core.ObjectMap.forEach.call(enum_.members, function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          __PUCK__value__32 = _ref2[0],
          member = _ref2[1];

      return member.enumMember = _core.Option.map.call(member.enumMember, function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            member = _ref4[0],
            __PUCK__value__33 = _ref4[1];

        return [member, instance];
      });
    });
  };
  return instance;
};
function isSameName(to, subject) {
  var __PUCK__value__34 = [to.name, subject.name];
  var __PUCK__value__35 = __PUCK__value__34;
  if ($unwrapTraitObject($unwrapTraitObject(__PUCK__value__35)[$unwrapTraitObject(0)]).kind == "Some" && $unwrapTraitObject($unwrapTraitObject(__PUCK__value__35)[$unwrapTraitObject(1)]).kind == "Some") {
    var _$unwrapTraitObject14 = $unwrapTraitObject(__PUCK__value__35),
        _$unwrapTraitObject15 = _slicedToArray(_$unwrapTraitObject14, 2),
        _$unwrapTraitObject16 = _slicedToArray(_$unwrapTraitObject15[0].value, 1),
        toName = _$unwrapTraitObject16[0],
        _$unwrapTraitObject17 = _slicedToArray(_$unwrapTraitObject15[1].value, 1),
        subjectName = _$unwrapTraitObject17[0];

    return toName == subjectName;
  } else {
    var __PUCK__value__36 = __PUCK__value__34;
    if (true) {
      var __PUCK__value__37 = __PUCK__value__36;
      return true;
    };
  };
};
function isAssignable(to, subject) {
  if (to && !subject) {
    var __PUCK__value__38 = to.kind;
    if ($unwrapTraitObject(__PUCK__value__38).kind == "Trait") {
      var _$unwrapTraitObject18 = $unwrapTraitObject(__PUCK__value__38),
          _$unwrapTraitObject19 = _slicedToArray(_$unwrapTraitObject18.value, 1),
          __PUCK__value__39 = _$unwrapTraitObject19[0];

      return false;
    };
  };
  if (!subject || !to) {
    return true;
  };
  if (to == subject) {
    return true;
  };
  var __PUCK__value__40 = subject.kind;
  var __PUCK__value__41 = __PUCK__value__40;
  if ($unwrapTraitObject(__PUCK__value__41).kind == "Parameter") {
    var _undefined4 = $unwrapTraitObject(__PUCK__value__41);
    return true;
  } else {
    var __PUCK__value__42 = __PUCK__value__40;
    if ($unwrapTraitObject(__PUCK__value__42).kind == "Enum") {
      var _$unwrapTraitObject20 = $unwrapTraitObject(__PUCK__value__42),
          _$unwrapTraitObject21 = _slicedToArray(_$unwrapTraitObject20.value, 1),
          enum_ = _$unwrapTraitObject21[0];

      if (_core.ObjectMap.size.call(enum_.members) == 0) {
        return true;
      };
    } else {
      var __PUCK__value__43 = __PUCK__value__40;
      if (true) {
        var __PUCK__value__44 = __PUCK__value__43;
      };
    };
  };
  var __PUCK__value__45 = to.kind;
  var __PUCK__value__46 = __PUCK__value__45;
  if ($unwrapTraitObject(__PUCK__value__46).kind == "Enum") {
    var _$unwrapTraitObject22 = $unwrapTraitObject(__PUCK__value__46),
        _$unwrapTraitObject23 = _slicedToArray(_$unwrapTraitObject22.value, 1),
        toEnum = _$unwrapTraitObject23[0];

    var __PUCK__value__47 = subject.kind;
    var __PUCK__value__48 = __PUCK__value__47;
    if ($unwrapTraitObject(__PUCK__value__48).kind == "Enum") {
      var _$unwrapTraitObject24 = $unwrapTraitObject(__PUCK__value__48),
          _$unwrapTraitObject25 = _slicedToArray(_$unwrapTraitObject24.value, 1),
          subjectEnum = _$unwrapTraitObject25[0];

      return isSameName(to, subject) && isEnumAssignable(toEnum, subjectEnum);
    } else {
      var __PUCK__value__49 = __PUCK__value__47;
      if (true) {
        var __PUCK__value__50 = __PUCK__value__49;
        return false;
      };
    };
  } else {
    var __PUCK__value__51 = __PUCK__value__45;
    if ($unwrapTraitObject(__PUCK__value__51).kind == "Function") {
      var _$unwrapTraitObject26 = $unwrapTraitObject(__PUCK__value__51),
          _$unwrapTraitObject27 = _slicedToArray(_$unwrapTraitObject26.value, 1),
          toFunc = _$unwrapTraitObject27[0];

      var __PUCK__value__52 = subject.kind;
      var __PUCK__value__53 = __PUCK__value__52;
      if ($unwrapTraitObject(__PUCK__value__53).kind == "Function") {
        var _$unwrapTraitObject28 = $unwrapTraitObject(__PUCK__value__53),
            _$unwrapTraitObject29 = _slicedToArray(_$unwrapTraitObject28.value, 1),
            subjectFunc = _$unwrapTraitObject29[0];

        return isFunctionAssignable(toFunc, subjectFunc);
      } else {
        var __PUCK__value__54 = __PUCK__value__52;
        if (true) {
          var __PUCK__value__55 = __PUCK__value__54;
          return false;
        };
      };
    } else {
      var __PUCK__value__56 = __PUCK__value__45;
      if ($unwrapTraitObject(__PUCK__value__56).kind == "Parameter") {
        var _undefined5 = $unwrapTraitObject(__PUCK__value__56);
        return true;
      } else {
        var __PUCK__value__57 = __PUCK__value__45;
        if ($unwrapTraitObject(__PUCK__value__57).kind == "Struct") {
          var _$unwrapTraitObject30 = $unwrapTraitObject(__PUCK__value__57),
              _$unwrapTraitObject31 = _slicedToArray(_$unwrapTraitObject30.value, 1),
              toStruct = _$unwrapTraitObject31[0];

          var __PUCK__value__58 = subject.kind;
          var __PUCK__value__59 = __PUCK__value__58;
          if ($unwrapTraitObject(__PUCK__value__59).kind == "Struct") {
            var _$unwrapTraitObject32 = $unwrapTraitObject(__PUCK__value__59),
                _$unwrapTraitObject33 = _slicedToArray(_$unwrapTraitObject32.value, 1),
                subjectStruct = _$unwrapTraitObject33[0];

            return isSameName(to, subject) && isStructAssignable(toStruct, subjectStruct);
          } else {
            var __PUCK__value__60 = __PUCK__value__58;
            if (true) {
              var __PUCK__value__61 = __PUCK__value__60;
              return false;
            };
          };
        } else {
          var __PUCK__value__62 = __PUCK__value__45;
          if ($unwrapTraitObject(__PUCK__value__62).kind == "Trait") {
            var _$unwrapTraitObject34 = $unwrapTraitObject(__PUCK__value__62),
                _$unwrapTraitObject35 = _slicedToArray(_$unwrapTraitObject34.value, 1),
                toTrait = _$unwrapTraitObject35[0];

            var __PUCK__value__63 = subject.kind;
            var __PUCK__value__64 = __PUCK__value__63;
            if ($unwrapTraitObject(__PUCK__value__64).kind == "Trait") {
              var _$unwrapTraitObject36 = $unwrapTraitObject(__PUCK__value__64),
                  _$unwrapTraitObject37 = _slicedToArray(_$unwrapTraitObject36.value, 1),
                  subjectTrait = _$unwrapTraitObject37[0];

              return isTraitAssignable(toTrait, subjectTrait);
            } else {
              var __PUCK__value__65 = __PUCK__value__63;
              if ($unwrapTraitObject(__PUCK__value__65).kind == "Enum") {
                var _$unwrapTraitObject38 = $unwrapTraitObject(__PUCK__value__65),
                    _$unwrapTraitObject39 = _slicedToArray(_$unwrapTraitObject38.value, 1),
                    _subjectEnum = _$unwrapTraitObject39[0];

                return _core.Iterable['$List<E>'].any.call({ type: '$List<E>', value: _subjectEnum.implementations, $isTraitObject: true }, function (implementation) {
                  return isAssignable(to, implementation.trait_);
                });
              } else {
                var __PUCK__value__66 = __PUCK__value__63;
                if ($unwrapTraitObject(__PUCK__value__66).kind == "Struct") {
                  var _$unwrapTraitObject40 = $unwrapTraitObject(__PUCK__value__66),
                      _$unwrapTraitObject41 = _slicedToArray(_$unwrapTraitObject40.value, 1),
                      _subjectStruct = _$unwrapTraitObject41[0];

                  return _core.Iterable['$List<E>'].any.call({ type: '$List<E>', value: _subjectStruct.implementations, $isTraitObject: true }, function (implementation) {
                    return isAssignable(to, implementation.trait_);
                  });
                } else {
                  var __PUCK__value__67 = __PUCK__value__63;
                  if (true) {
                    var __PUCK__value__68 = __PUCK__value__67;
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
    return _core.Iterable['$List<E>'].all.call({ type: '$List<E>', value: _core.ObjectMap.toList.call(to.members), $isTraitObject: true }, function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
          name = _ref6[0],
          toMember = _ref6[1];

      return isAssignable($unwrapTraitObject(toMember), subject.members[name]);
    });
  } else {
    return false;
  };
};
function isFunctionAssignable(to, subject) {
  if (!_core.Range.isSubsetOf.call(to.parameterRange, subject.parameterRange)) {
    return false;
  };
  var __PUCK__value__69 = _core.Iterable['$List<E>'].enumerate.call({ type: '$List<E>', value: to.parameters, $isTraitObject: true });
  return _core.Iterable[__PUCK__value__69.type].all.call(__PUCK__value__69, function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        toArg = _ref8[0],
        i = _ref8[1];

    return isAssignable($unwrapTraitObject(toArg).type_, $unwrapTraitObject(subject.parameters[i]).type_);
  });
};
function isStructAssignable(to, subject) {
  var __PUCK__value__70 = [to.kind, subject.kind];
  var __PUCK__value__71 = __PUCK__value__70;
  if ($unwrapTraitObject($unwrapTraitObject(__PUCK__value__71)[$unwrapTraitObject(0)]).kind == "Record" && $unwrapTraitObject($unwrapTraitObject(__PUCK__value__71)[$unwrapTraitObject(1)]).kind == "Record") {
    var _ret = function () {
      var _$unwrapTraitObject42 = $unwrapTraitObject(__PUCK__value__71),
          _$unwrapTraitObject43 = _slicedToArray(_$unwrapTraitObject42, 2),
          _$unwrapTraitObject44 = _slicedToArray(_$unwrapTraitObject43[0].value, 1),
          toProps = _$unwrapTraitObject44[0].properties,
          _$unwrapTraitObject45 = _slicedToArray(_$unwrapTraitObject43[1].value, 1),
          subjectProps = _$unwrapTraitObject45[0].properties;

      return {
        v: _core.Iterable['$List<E>'].all.call({ type: '$List<E>', value: _core.ObjectMap.toList.call(toProps), $isTraitObject: true }, function (_ref9) {
          var _ref10 = _slicedToArray(_ref9, 2),
              key = _ref10[0],
              toProp = _ref10[1];

          return _core.ObjectMap.has.call(subjectProps, key) && isAssignable($unwrapTraitObject(toProp), subjectProps[key]);
        })
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  } else {
    var __PUCK__value__72 = __PUCK__value__70;
    if ($unwrapTraitObject($unwrapTraitObject(__PUCK__value__72)[$unwrapTraitObject(0)]).kind == "Tuple" && $unwrapTraitObject($unwrapTraitObject(__PUCK__value__72)[$unwrapTraitObject(1)]).kind == "Tuple") {
      var _$unwrapTraitObject46 = $unwrapTraitObject(__PUCK__value__72),
          _$unwrapTraitObject47 = _slicedToArray(_$unwrapTraitObject46, 2),
          _$unwrapTraitObject48 = _slicedToArray(_$unwrapTraitObject47[0].value, 1),
          toProps = _$unwrapTraitObject48[0].properties,
          _$unwrapTraitObject49 = _slicedToArray(_$unwrapTraitObject47[1].value, 1),
          subjectProps = _$unwrapTraitObject49[0].properties;

      if (_core.Iterable['$List<E>'].size.call({ type: '$List<E>', value: toProps, $isTraitObject: true }) != _core.Iterable['$List<E>'].size.call({ type: '$List<E>', value: subjectProps, $isTraitObject: true })) {
        return false;
      };
      return _core.Iterable['$List<E>'].all.call({ type: '$List<E>', value: _core.List.zip({ type: '$List<E>', value: toProps, $isTraitObject: true }, { type: '$List<E>', value: subjectProps, $isTraitObject: true }), $isTraitObject: true }, function (_ref11) {
        var _ref12 = _slicedToArray(_ref11, 2),
            toProp = _ref12[0],
            subjectProp = _ref12[1];

        return isAssignable($unwrapTraitObject(toProp), $unwrapTraitObject(subjectProp));
      });
    } else {
      var __PUCK__value__73 = __PUCK__value__70;
      if ($unwrapTraitObject($unwrapTraitObject(__PUCK__value__73)[$unwrapTraitObject(0)]).kind == "Unit" && $unwrapTraitObject($unwrapTraitObject(__PUCK__value__73)[$unwrapTraitObject(1)]).kind == "Unit") {
        var _$unwrapTraitObject50 = $unwrapTraitObject(__PUCK__value__73),
            _$unwrapTraitObject51 = _slicedToArray(_$unwrapTraitObject50, 1);

        return to.kind.value == subject.kind.value;
      } else {
        var __PUCK__value__74 = __PUCK__value__70;
        if (true) {
          var __PUCK__value__75 = __PUCK__value__74;
          return to.kind == subject.kind;
        };
      };
    };
  };
};
function isTraitAssignable(to, subject) {
  if (_core.ObjectMap.size.call(to.functions) == _core.ObjectMap.size.call(subject.functions)) {
    return _core.Iterable['$List<E>'].all.call({ type: '$List<E>', value: _core.ObjectMap.toList.call(to.functions), $isTraitObject: true }, function (_ref13) {
      var _ref14 = _slicedToArray(_ref13, 2),
          name = _ref14[0],
          toFunction = _ref14[1];

      return isAssignable($unwrapTraitObject(toFunction), subject.functions[name]);
    });
  } else {
    return false;
  };
};
function isSameType(a, b) {
  var __PUCK__value__76 = [a.name, b.name];
  if ($unwrapTraitObject($unwrapTraitObject(__PUCK__value__76)[$unwrapTraitObject(0)]).kind == "Some" && $unwrapTraitObject($unwrapTraitObject(__PUCK__value__76)[$unwrapTraitObject(1)]).kind == "Some") {
    var _$unwrapTraitObject52 = $unwrapTraitObject(__PUCK__value__76),
        _$unwrapTraitObject53 = _slicedToArray(_$unwrapTraitObject52, 2),
        _$unwrapTraitObject54 = _slicedToArray(_$unwrapTraitObject53[0].value, 1),
        aName = _$unwrapTraitObject54[0],
        _$unwrapTraitObject55 = _slicedToArray(_$unwrapTraitObject53[1].value, 1),
        bName = _$unwrapTraitObject55[0];

    return aName == bName;
  } else {
    return false;
  };
};
function findCommonType(types) {
  var index = 0;

  var _loop = function _loop() {
    var type_ = types[index];
    if (_core.Iterable['$List<E>'].all.call({ type: '$List<E>', value: types, $isTraitObject: true }, function (t) {
      return isAssignable(type_, t);
    })) {
      return {
        v: (0, _core.Ok)(type_)
      };
    };
    index += 1;
  };

  while (index < types.length) {
    var _ret2 = _loop();

    if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
  };
  return (0, _core.Err)([]);
}
