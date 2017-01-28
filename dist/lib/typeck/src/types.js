'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveTypeParameters = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.createTypeInstance = createTypeInstance;
exports.getType = getType;
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
      var _PUCK__value__1$valu = _slicedToArray(__PUCK__value__1.value, 1),
          instance = _PUCK__value__1$valu[0];

      var typeParameters = $unwrapTraitObject(instance).typeParameters;
      if (_core.Iterable['$List<E>'].any.call({ type: '$List<E>', value: typeParameters, $isTraitObject: true }, function (parameter) {
        return _entities.Type.isParameter.call(parameter);
      })) {
        return createTypeInstance($unwrapTraitObject(instance)._class, _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: typeParameters, $isTraitObject: true }, function (p) {
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
      var _PUCK__value__3$valu = _slicedToArray(__PUCK__value__3.value, 1),
          enum_ = _PUCK__value__3$valu[0];

      __PUCK__value__4 = _entities.TypeKind.Enum(resolveTypeParametersEnum(parameterMap, enum_));
    } else {
      var __PUCK__value__5 = __PUCK__value__2;
      var __PUCK__value__6 = void 0;
      if ($unwrapTraitObject(__PUCK__value__5).kind == "Function") {
        var _PUCK__value__5$valu = _slicedToArray(__PUCK__value__5.value, 1),
            func = _PUCK__value__5$valu[0];

        __PUCK__value__6 = _entities.TypeKind.Function(resolveTypeParametersFn(parameterMap, func));
      } else {
        var __PUCK__value__7 = __PUCK__value__2;
        var __PUCK__value__8 = void 0;
        if ($unwrapTraitObject(__PUCK__value__7).kind == "Parameter") {
          var _undefined2 = __PUCK__value__7;
          return _core.Option.unwrapOr.call(_core.ObjectMap.get.call(parameterMap, _core.Option.unwrap.call(type_.name)), type_);
        } else {
          var __PUCK__value__9 = __PUCK__value__2;
          var __PUCK__value__10 = void 0;
          if ($unwrapTraitObject(__PUCK__value__9).kind == "Struct") {
            var _PUCK__value__9$valu = _slicedToArray(__PUCK__value__9.value, 1),
                struct = _PUCK__value__9$valu[0];

            __PUCK__value__10 = _entities.TypeKind.Struct(resolveTypeParametersStruct(parameterMap, struct));
          } else {
            var __PUCK__value__11 = __PUCK__value__2;
            var __PUCK__value__12 = void 0;
            if ($unwrapTraitObject(__PUCK__value__11).kind == "Trait") {
              var _PUCK__value__11$val = _slicedToArray(__PUCK__value__11.value, 1),
                  trait_ = _PUCK__value__11$val[0];

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
  var __PUCK__value__16 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: func._arguments, $isTraitObject: true }, function (binding) {
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
    _arguments: _core.Iterable[__PUCK__value__16.type].toList.call(__PUCK__value__16),
    returnType: __PUCK__value__18
  });
};
function resolveTypeParametersStruct(parameterMap, struct) {
  var __PUCK__value__19 = struct.kind;
  var __PUCK__value__20 = __PUCK__value__19;
  var __PUCK__value__21 = void 0;
  if ($unwrapTraitObject(__PUCK__value__20).kind == "Record") {
    var _PUCK__value__20$val = _slicedToArray(__PUCK__value__20.value, 1),
        properties = _PUCK__value__20$val[0].properties;

    __PUCK__value__21 = _entities.StructKind.Record({ properties: _core.ObjectMap.map.call(properties, resolveTypeParameters(parameterMap, false)) });
  } else {
    var __PUCK__value__22 = __PUCK__value__19;
    var __PUCK__value__23 = void 0;
    if ($unwrapTraitObject(__PUCK__value__22).kind == "Tuple") {
      var _PUCK__value__22$val = _slicedToArray(__PUCK__value__22.value, 1),
          _properties = _PUCK__value__22$val[0].properties;

      var __PUCK__value__24 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: _properties, $isTraitObject: true }, resolveTypeParameters(parameterMap, false));
      __PUCK__value__23 = _entities.StructKind.Tuple({ properties: _core.Iterable[__PUCK__value__24.type].toList.call(__PUCK__value__24) });
    } else {
      var __PUCK__value__25 = __PUCK__value__19;
      var __PUCK__value__26 = void 0;
      if ($unwrapTraitObject(__PUCK__value__25).kind == "Unit") {
        var _undefined3 = __PUCK__value__25;
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
  var _class = _core.Option.unwrap.call(type_._class);
  var __PUCK__value__27 = void 0;
  if (typeParameters_.value.length < _class.parameterRange.end - 1) {
    __PUCK__value__27 = typeParameters_.value.concat($unwrapTraitObject(_class.typeParameters.slice(typeParameters_.value.length)).map(function (p) {
      var __PUCK__value__28 = p.kind;
      if ($unwrapTraitObject(__PUCK__value__28).kind == "Parameter") {
        var _PUCK__value__28$val = _slicedToArray(__PUCK__value__28.value, 1),
            _p = _PUCK__value__28$val[0];

        return _core.Option.unwrap.call(_p.defaultValue);
      } else {
        throw "not a type parameter";
      };
    }));
  } else {
    __PUCK__value__27 = _core.Iterable[typeParameters_.type].toList.call(typeParameters_);
  };
  var typeParameters = __PUCK__value__27;
  var __PUCK__value__29 = _core.Iterable['$List<E>'].find.call({ type: '$List<E>', value: _class.instances, $isTraitObject: true }, function (a) {
    var i = _core.Option.unwrap.call(a.instance);
    return i.typeParameters.length == typeParameters.length && i.typeParameters.every(function (p, i) {
      return isSameType(p, typeParameters[$unwrapTraitObject(i)]);
    });
  });
  if ($unwrapTraitObject(__PUCK__value__29).kind == "Some") {
    var _PUCK__value__29$val = _slicedToArray(__PUCK__value__29.value, 1),
        cachedInstance = _PUCK__value__29$val[0];

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
    })
  };
  _class.instances.push(instance);
  instance.kind = $unwrapTraitObject(resolveTypeParameters(parameterMap)(type_)).kind;
  return instance;
};
function getType(scope, t_) {
  if (!t_) {
    return _js._undefined;
  };
  if ($unwrapTraitObject(t_).path) {
    var tn = t_;
    var binding = scope.getTypePath(tn.path);
    if (!binding) {
      return binding;
    } else {
      var __PUCK__value__30 = $unwrapTraitObject($unwrapTraitObject(binding).type_)._class;
      if ($unwrapTraitObject(__PUCK__value__30).kind == "Some") {
        var _PUCK__value__30$val = _slicedToArray(__PUCK__value__30.value, 1),
            __PUCK__value__31 = _PUCK__value__30$val[0];

        var __PUCK__value__32 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: tn.typeParameters, $isTraitObject: true }, function (p) {
          return p.type_;
        });
        return createTypeInstance($unwrapTraitObject(binding).type_, { type: '$List<E>', value: _core.Iterable[__PUCK__value__32.type].toList.call(__PUCK__value__32), $isTraitObject: true });
      } else {
        return $unwrapTraitObject(binding).type_;
      };
    };
  } else {
    if ($unwrapTraitObject(t_).kind == $unwrapTraitObject(_ast2.SyntaxKind).ObjectTypeBound) {
      var to = t_;
      var properties = _core.ObjectMap.fromIter(_core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: to.properties, $isTraitObject: true }, function (member) {
        return [member.name.name, getType(scope, member.typeBound)];
      }));
      return {
        displayName: _core.None,
        name: _core.None,
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: _entities.StructKind.Record({ properties: properties })
        }),
        _class: _core.None,
        instance: _core.None
      };
    } else {
      if ($unwrapTraitObject(t_).kind == $unwrapTraitObject(_ast2.SyntaxKind).TupleTypeBound) {
        var tt = t_;
        var __PUCK__value__33 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: tt.properties, $isTraitObject: true }, function (p) {
          return getType(scope, p);
        });
        var _properties2 = _core.Iterable[__PUCK__value__33.type].toList.call(__PUCK__value__33);
        return {
          displayName: _core.None,
          name: _core.None,
          kind: _entities.TypeKind.Struct({
            implementations: [],
            kind: _entities.StructKind.Tuple({ properties: _properties2 })
          }),
          _class: _core.None,
          instance: _core.None
        };
      } else {
        var tf = t_;
        var __PUCK__value__34 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: tf._arguments.properties, $isTraitObject: true }, function (p) {
          return { type_: getType(scope, p) };
        });
        var _arguments = _core.Iterable[__PUCK__value__34.type].toList.call(__PUCK__value__34);
        var returnType = getType(scope, tf.returnType);
        return {
          displayName: _core.None,
          name: _core.None,
          kind: _entities.TypeKind.Function({
            selfBinding: _core.None,
            _arguments: _arguments,
            argumentRange: {
              start: _arguments.length,
              end: _arguments.length + 1
            },
            returnType: returnType,
            isAbstract: false
          }),
          _class: _entities.TypeClass.fromAstNode(tf, function () {}),
          instance: _core.None
        };
      };
    };
  };
};
function isSameName(to, subject) {
  var __PUCK__value__35 = [to.name, subject.name];
  var __PUCK__value__36 = __PUCK__value__35;
  if ($unwrapTraitObject($unwrapTraitObject(__PUCK__value__36)[$unwrapTraitObject(0)]).kind == "Some" && $unwrapTraitObject($unwrapTraitObject(__PUCK__value__36)[$unwrapTraitObject(1)]).kind == "Some") {
    var _PUCK__value__36$0$v = _slicedToArray(__PUCK__value__36[0].value, 1),
        toName = _PUCK__value__36$0$v[0],
        _PUCK__value__36$1$v = _slicedToArray(__PUCK__value__36[1].value, 1),
        subjectName = _PUCK__value__36$1$v[0];

    return toName == subjectName;
  } else {
    var __PUCK__value__37 = __PUCK__value__35;
    if (true) {
      var __PUCK__value__38 = __PUCK__value__37;
      return true;
    };
  };
};
function isAssignable(to, subject) {
  if (!subject || !to) {
    return true;
  };
  if (to == subject) {
    return true;
  };
  var __PUCK__value__39 = subject.kind;
  if ($unwrapTraitObject(__PUCK__value__39).kind == "Parameter") {
    var _undefined4 = __PUCK__value__39;
    return true;
  };
  var __PUCK__value__40 = to.kind;
  var __PUCK__value__41 = __PUCK__value__40;
  if ($unwrapTraitObject(__PUCK__value__41).kind == "Enum") {
    var _PUCK__value__41$val = _slicedToArray(__PUCK__value__41.value, 1),
        toEnum = _PUCK__value__41$val[0];

    var __PUCK__value__42 = subject.kind;
    var __PUCK__value__43 = __PUCK__value__42;
    if ($unwrapTraitObject(__PUCK__value__43).kind == "Enum") {
      var _PUCK__value__43$val = _slicedToArray(__PUCK__value__43.value, 1),
          subjectEnum = _PUCK__value__43$val[0];

      return isSameName(to, subject) && isEnumAssignable(toEnum, subjectEnum);
    } else {
      var __PUCK__value__44 = __PUCK__value__42;
      if (true) {
        var __PUCK__value__45 = __PUCK__value__44;
        return false;
      };
    };
  } else {
    var __PUCK__value__46 = __PUCK__value__40;
    if ($unwrapTraitObject(__PUCK__value__46).kind == "Function") {
      var _PUCK__value__46$val = _slicedToArray(__PUCK__value__46.value, 1),
          toFunc = _PUCK__value__46$val[0];

      var __PUCK__value__47 = subject.kind;
      var __PUCK__value__48 = __PUCK__value__47;
      if ($unwrapTraitObject(__PUCK__value__48).kind == "Function") {
        var _PUCK__value__48$val = _slicedToArray(__PUCK__value__48.value, 1),
            subjectFunc = _PUCK__value__48$val[0];

        return isFunctionAssignable(toFunc, subjectFunc);
      } else {
        var __PUCK__value__49 = __PUCK__value__47;
        if (true) {
          var __PUCK__value__50 = __PUCK__value__49;
          return false;
        };
      };
    } else {
      var __PUCK__value__51 = __PUCK__value__40;
      if ($unwrapTraitObject(__PUCK__value__51).kind == "Parameter") {
        var _undefined5 = __PUCK__value__51;
        return true;
      } else {
        var __PUCK__value__52 = __PUCK__value__40;
        if ($unwrapTraitObject(__PUCK__value__52).kind == "Struct") {
          var _PUCK__value__52$val = _slicedToArray(__PUCK__value__52.value, 1),
              toStruct = _PUCK__value__52$val[0];

          var __PUCK__value__53 = subject.kind;
          var __PUCK__value__54 = __PUCK__value__53;
          if ($unwrapTraitObject(__PUCK__value__54).kind == "Struct") {
            var _PUCK__value__54$val = _slicedToArray(__PUCK__value__54.value, 1),
                subjectStruct = _PUCK__value__54$val[0];

            return isSameName(to, subject) && isStructAssignable(toStruct, subjectStruct);
          } else {
            var __PUCK__value__55 = __PUCK__value__53;
            if (true) {
              var __PUCK__value__56 = __PUCK__value__55;
              return false;
            };
          };
        } else {
          var __PUCK__value__57 = __PUCK__value__40;
          if ($unwrapTraitObject(__PUCK__value__57).kind == "Trait") {
            var _PUCK__value__57$val = _slicedToArray(__PUCK__value__57.value, 1),
                toTrait = _PUCK__value__57$val[0];

            var __PUCK__value__58 = subject.kind;
            var __PUCK__value__59 = __PUCK__value__58;
            if ($unwrapTraitObject(__PUCK__value__59).kind == "Trait") {
              var _PUCK__value__59$val = _slicedToArray(__PUCK__value__59.value, 1),
                  subjectTrait = _PUCK__value__59$val[0];

              return isTraitAssignable(toTrait, subjectTrait);
            } else {
              var __PUCK__value__60 = __PUCK__value__58;
              if ($unwrapTraitObject(__PUCK__value__60).kind == "Enum") {
                var _PUCK__value__60$val = _slicedToArray(__PUCK__value__60.value, 1),
                    _subjectEnum = _PUCK__value__60$val[0];

                return _core.Iterable['$List<E>'].any.call({ type: '$List<E>', value: _subjectEnum.implementations, $isTraitObject: true }, function (implementation) {
                  return isAssignable(to, implementation.trait_);
                });
              } else {
                var __PUCK__value__61 = __PUCK__value__58;
                if ($unwrapTraitObject(__PUCK__value__61).kind == "Struct") {
                  var _PUCK__value__61$val = _slicedToArray(__PUCK__value__61.value, 1),
                      _subjectStruct = _PUCK__value__61$val[0];

                  return _core.Iterable['$List<E>'].any.call({ type: '$List<E>', value: _subjectStruct.implementations, $isTraitObject: true }, function (implementation) {
                    return isAssignable(to, implementation.trait_);
                  });
                } else {
                  var __PUCK__value__62 = __PUCK__value__58;
                  if (true) {
                    var __PUCK__value__63 = __PUCK__value__62;
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
    return _core.Iterable['$List<E>'].all.call({ type: '$List<E>', value: _core.ObjectMap.toList.call(to.members), $isTraitObject: true }, function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          name = _ref2[0],
          toMember = _ref2[1];

      return isAssignable($unwrapTraitObject(toMember), subject.members[name]);
    });
  } else {
    return false;
  };
};
function isFunctionAssignable(to, subject) {
  if (!_core.Range.isSubsetOf.call(to.argumentRange, subject.argumentRange)) {
    return false;
  };
  var __PUCK__value__64 = _core.Iterable['$List<E>'].enumerate.call({ type: '$List<E>', value: to._arguments, $isTraitObject: true });
  return _core.Iterable[__PUCK__value__64.type].all.call(__PUCK__value__64, function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        toArg = _ref4[0],
        i = _ref4[1];

    return isAssignable($unwrapTraitObject(toArg).type_, $unwrapTraitObject(subject._arguments[i]).type_);
  });
};
function isStructAssignable(to, subject) {
  var __PUCK__value__65 = [to.kind, subject.kind];
  var __PUCK__value__66 = __PUCK__value__65;
  if ($unwrapTraitObject($unwrapTraitObject(__PUCK__value__66)[$unwrapTraitObject(0)]).kind == "Record" && $unwrapTraitObject($unwrapTraitObject(__PUCK__value__66)[$unwrapTraitObject(1)]).kind == "Record") {
    var _ret = function () {
      var _PUCK__value__66$0$v = _slicedToArray(__PUCK__value__66[0].value, 1),
          toProps = _PUCK__value__66$0$v[0].properties,
          _PUCK__value__66$1$v = _slicedToArray(__PUCK__value__66[1].value, 1),
          subjectProps = _PUCK__value__66$1$v[0].properties;

      return {
        v: _core.Iterable['$List<E>'].all.call({ type: '$List<E>', value: _core.ObjectMap.toList.call(toProps), $isTraitObject: true }, function (_ref5) {
          var _ref6 = _slicedToArray(_ref5, 2),
              key = _ref6[0],
              toProp = _ref6[1];

          return _core.ObjectMap.has.call(subjectProps, key) && isAssignable($unwrapTraitObject(toProp), subjectProps[key]);
        })
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  } else {
    var __PUCK__value__67 = __PUCK__value__65;
    if ($unwrapTraitObject($unwrapTraitObject(__PUCK__value__67)[$unwrapTraitObject(0)]).kind == "Tuple" && $unwrapTraitObject($unwrapTraitObject(__PUCK__value__67)[$unwrapTraitObject(1)]).kind == "Tuple") {
      var _PUCK__value__67$0$v = _slicedToArray(__PUCK__value__67[0].value, 1),
          toProps = _PUCK__value__67$0$v[0].properties,
          _PUCK__value__67$1$v = _slicedToArray(__PUCK__value__67[1].value, 1),
          subjectProps = _PUCK__value__67$1$v[0].properties;

      if (_core.Iterable['$List<E>'].size.call({ type: '$List<E>', value: toProps, $isTraitObject: true }) != _core.Iterable['$List<E>'].size.call({ type: '$List<E>', value: subjectProps, $isTraitObject: true })) {
        return false;
      };
      return _core.Iterable['$List<E>'].all.call({ type: '$List<E>', value: _core.List.zip({ type: '$List<E>', value: toProps, $isTraitObject: true }, { type: '$List<E>', value: subjectProps, $isTraitObject: true }), $isTraitObject: true }, function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
            toProp = _ref8[0],
            subjectProp = _ref8[1];

        return isAssignable($unwrapTraitObject(toProp), $unwrapTraitObject(subjectProp));
      });
    } else {
      var __PUCK__value__68 = __PUCK__value__65;
      if ($unwrapTraitObject($unwrapTraitObject(__PUCK__value__68)[$unwrapTraitObject(0)]).kind == "Unit" && $unwrapTraitObject($unwrapTraitObject(__PUCK__value__68)[$unwrapTraitObject(1)]).kind == "Unit") {
        return to.kind.value == subject.kind.value;
      } else {
        var __PUCK__value__69 = __PUCK__value__65;
        if (true) {
          var __PUCK__value__70 = __PUCK__value__69;
          return to.kind == subject.kind;
        };
      };
    };
  };
};
function isTraitAssignable(to, subject) {
  if (_core.ObjectMap.size.call(to.functions) == _core.ObjectMap.size.call(subject.functions)) {
    return _core.Iterable['$List<E>'].all.call({ type: '$List<E>', value: _core.ObjectMap.toList.call(to.functions), $isTraitObject: true }, function (_ref9) {
      var _ref10 = _slicedToArray(_ref9, 2),
          name = _ref10[0],
          toFunction = _ref10[1];

      return isAssignable($unwrapTraitObject(toFunction), subject.functions[name]);
    });
  } else {
    return false;
  };
};
function isSameType(a, b) {
  var __PUCK__value__71 = [$unwrapTraitObject(a).name, $unwrapTraitObject(b).name];
  if ($unwrapTraitObject($unwrapTraitObject(__PUCK__value__71)[$unwrapTraitObject(0)]).kind == "Some" && $unwrapTraitObject($unwrapTraitObject(__PUCK__value__71)[$unwrapTraitObject(1)]).kind == "Some") {
    var _PUCK__value__71$0$v = _slicedToArray(__PUCK__value__71[0].value, 1),
        aName = _PUCK__value__71$0$v[0],
        _PUCK__value__71$1$v = _slicedToArray(__PUCK__value__71[1].value, 1),
        bName = _PUCK__value__71$1$v[0];

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
