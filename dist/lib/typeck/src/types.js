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

      var typeParameters = instance.typeParameters;
      if (_core.Iterable['$List<E>'].any.call(typeParameters, function (parameter) {
        return _entities.Type.isParameter.call(parameter);
      })) {
        return createTypeInstance(instance._class, _core.Iterable['$List<E>'].map.call(typeParameters, function (p) {
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
    if (__PUCK__value__3.kind == "Enum") {
      var _PUCK__value__3$valu = _slicedToArray(__PUCK__value__3.value, 1),
          enum_ = _PUCK__value__3$valu[0];

      __PUCK__value__4 = _entities.TypeKind.Enum(resolveTypeParametersEnum(parameterMap, enum_));
    } else {
      var __PUCK__value__5 = __PUCK__value__2;
      var __PUCK__value__6 = void 0;
      if (__PUCK__value__5.kind == "Function") {
        var _PUCK__value__5$valu = _slicedToArray(__PUCK__value__5.value, 1),
            func = _PUCK__value__5$valu[0];

        __PUCK__value__6 = _entities.TypeKind.Function(resolveTypeParametersFn(parameterMap, func));
      } else {
        var __PUCK__value__7 = __PUCK__value__2;
        var __PUCK__value__8 = void 0;
        if (__PUCK__value__7.kind == "Parameter") {
          var _undefined2 = __PUCK__value__7;
          return _core.Option.unwrapOr.call(_core.ObjectMap.get.call(parameterMap, _core.Option.unwrap.call(type_.name)), type_);
        } else {
          var __PUCK__value__9 = __PUCK__value__2;
          var __PUCK__value__10 = void 0;
          if (__PUCK__value__9.kind == "Struct") {
            var _PUCK__value__9$valu = _slicedToArray(__PUCK__value__9.value, 1),
                struct = _PUCK__value__9$valu[0];

            __PUCK__value__10 = _entities.TypeKind.Struct(resolveTypeParametersStruct(parameterMap, struct));
          } else {
            var __PUCK__value__11 = __PUCK__value__2;
            var __PUCK__value__12 = void 0;
            if (true) {
              var __PUCK__value__13 = __PUCK__value__11;
              return type_;
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
  var __PUCK__value__15 = void 0;
  if (func.returnType) {
    __PUCK__value__15 = resolveTypeParameters(parameterMap, false)(func.returnType);
  };
  return assign(func, {
    _arguments: _core.Iterable['$List<E>'].map.call(func._arguments, function (binding) {
      var __PUCK__value__14 = void 0;
      if (binding.type_) {
        __PUCK__value__14 = resolveTypeParameters(parameterMap, false)(binding.type_);
      };
      return assign(binding, { type_: __PUCK__value__14 });
    }),
    returnType: __PUCK__value__15
  });
};
function resolveTypeParametersStruct(parameterMap, struct) {
  var __PUCK__value__16 = struct.kind;
  var __PUCK__value__17 = __PUCK__value__16;
  var __PUCK__value__18 = void 0;
  if (__PUCK__value__17.kind == "Record") {
    var _PUCK__value__17$val = _slicedToArray(__PUCK__value__17.value, 1),
        properties = _PUCK__value__17$val[0].properties;

    __PUCK__value__18 = _entities.StructKind.Record({ properties: _core.ObjectMap.map.call(properties, resolveTypeParameters(parameterMap, false)) });
  } else {
    var __PUCK__value__19 = __PUCK__value__16;
    var __PUCK__value__20 = void 0;
    if (__PUCK__value__19.kind == "Tuple") {
      var _PUCK__value__19$val = _slicedToArray(__PUCK__value__19.value, 1),
          _properties = _PUCK__value__19$val[0].properties;

      __PUCK__value__20 = _entities.StructKind.Tuple({ properties: _core.Iterable['$List<E>'].map.call(_properties, resolveTypeParameters(parameterMap, false)) });
    } else {
      var __PUCK__value__21 = __PUCK__value__16;
      var __PUCK__value__22 = void 0;
      if (__PUCK__value__21.kind == "Unit") {
        var _undefined3 = __PUCK__value__21;
        __PUCK__value__22 = struct.kind;
      };
      __PUCK__value__20 = __PUCK__value__22;
    };
    __PUCK__value__18 = __PUCK__value__20;
  };
  return assign(struct, { kind: __PUCK__value__18 });
};
function mapObject(object, mapper) {
  return _core.ObjectMap.map.call(object, mapper);
};
function createTypeInstance(type_, typeParameters) {
  var _class = _core.Option.unwrap.call(type_._class);
  var __PUCK__value__23 = void 0;
  if (typeParameters.length < _class.parameterRange.end - 1) {
    __PUCK__value__23 = typeParameters.concat(_class.typeParameters.slice(typeParameters.length).map(function (p) {
      var __PUCK__value__24 = p.kind;
      if (__PUCK__value__24.kind == "Parameter") {
        var _PUCK__value__24$val = _slicedToArray(__PUCK__value__24.value, 1),
            _p = _PUCK__value__24$val[0];

        return _core.Option.unwrap.call(_p.defaultValue);
      } else {
        throw "not a type parameter";
      };
    }));
  } else {
    __PUCK__value__23 = typeParameters;
  };
  typeParameters = __PUCK__value__23;
  var __PUCK__value__25 = _core.Iterable['$List<E>'].find.call(_class.instances, function (a) {
    var i = _core.Option.unwrap.call(a.instance);
    return i.typeParameters.length == typeParameters.length && i.typeParameters.every(function (p, i) {
      return isSameType(p, typeParameters[i]);
    });
  });
  if (__PUCK__value__25.kind == "Some") {
    var _PUCK__value__25$val = _slicedToArray(__PUCK__value__25.value, 1),
        cachedInstance = _PUCK__value__25$val[0];

    return cachedInstance;
  };
  var parameterMap = _core.ObjectMap.fromList.call(_core.ObjectMap, _core.Iterable['$List<E>'].map.call(_core.List.zip.call(_core.List, typeParameters, _class.typeParameters), function (p) {
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
  instance.kind = resolveTypeParameters(parameterMap)(type_).kind;
  return instance;
};
function getType(scope, t) {
  if (!t) {
    return _js._undefined;
  };
  if (t.path) {
    var binding = scope.getTypePath(t.path);
    if (!binding) {
      return binding;
    } else {
      var __PUCK__value__26 = binding.type_._class;
      if (__PUCK__value__26.kind == "Some") {
        var _PUCK__value__26$val = _slicedToArray(__PUCK__value__26.value, 1),
            __PUCK__value__27 = _PUCK__value__26$val[0];

        return createTypeInstance(binding.type_, t.typeParameters.map(function (p) {
          return p.type_;
        }));
      } else {
        return binding.type_;
      };
    };
  } else {
    if (t.kind == _ast2.SyntaxKind.ObjectTypeBound) {
      var properties = _core.ObjectMap.fromList.call(_core.ObjectMap, t.properties.map(function (member) {
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
      if (t.kind == _ast2.SyntaxKind.TupleTypeBound) {
        var _properties2 = t.properties.map(function (p) {
          return getType(scope, p);
        });
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
        var _arguments = t._arguments.properties.map(function (p) {
          return { type_: getType(scope, p) };
        });
        var returnType = getType(scope, t.returnType);
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
          _class: _entities.TypeClass.fromAstNode.call(_entities.TypeClass, t, function () {}),
          instance: _core.None
        };
      };
    };
  };
};
function isSameName(to, subject) {
  var __PUCK__value__28 = [to.name, subject.name];
  var __PUCK__value__29 = __PUCK__value__28;
  if (__PUCK__value__29[0].kind == "Some" && __PUCK__value__29[1].kind == "Some") {
    var _PUCK__value__29$0$v = _slicedToArray(__PUCK__value__29[0].value, 1),
        toName = _PUCK__value__29$0$v[0],
        _PUCK__value__29$1$v = _slicedToArray(__PUCK__value__29[1].value, 1),
        subjectName = _PUCK__value__29$1$v[0];

    return toName == subjectName;
  } else {
    var __PUCK__value__30 = __PUCK__value__28;
    if (true) {
      var __PUCK__value__31 = __PUCK__value__30;
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
  var __PUCK__value__32 = subject.kind;
  if (__PUCK__value__32.kind == "Parameter") {
    var _undefined4 = __PUCK__value__32;
    return true;
  };
  var __PUCK__value__33 = to.kind;
  var __PUCK__value__34 = __PUCK__value__33;
  if (__PUCK__value__34.kind == "Enum") {
    var _PUCK__value__34$val = _slicedToArray(__PUCK__value__34.value, 1),
        toEnum = _PUCK__value__34$val[0];

    var __PUCK__value__35 = subject.kind;
    var __PUCK__value__36 = __PUCK__value__35;
    if (__PUCK__value__36.kind == "Enum") {
      var _PUCK__value__36$val = _slicedToArray(__PUCK__value__36.value, 1),
          subjectEnum = _PUCK__value__36$val[0];

      return isSameName(to, subject) && isEnumAssignable(toEnum, subjectEnum);
    } else {
      var __PUCK__value__37 = __PUCK__value__35;
      if (true) {
        var __PUCK__value__38 = __PUCK__value__37;
        return false;
      };
    };
  } else {
    var __PUCK__value__39 = __PUCK__value__33;
    if (__PUCK__value__39.kind == "Function") {
      var _PUCK__value__39$val = _slicedToArray(__PUCK__value__39.value, 1),
          toFunc = _PUCK__value__39$val[0];

      var __PUCK__value__40 = subject.kind;
      var __PUCK__value__41 = __PUCK__value__40;
      if (__PUCK__value__41.kind == "Function") {
        var _PUCK__value__41$val = _slicedToArray(__PUCK__value__41.value, 1),
            subjectFunc = _PUCK__value__41$val[0];

        return isFunctionAssignable(toFunc, subjectFunc);
      } else {
        var __PUCK__value__42 = __PUCK__value__40;
        if (true) {
          var __PUCK__value__43 = __PUCK__value__42;
          return false;
        };
      };
    } else {
      var __PUCK__value__44 = __PUCK__value__33;
      if (__PUCK__value__44.kind == "Parameter") {
        var _undefined5 = __PUCK__value__44;
        return true;
      } else {
        var __PUCK__value__45 = __PUCK__value__33;
        if (__PUCK__value__45.kind == "Struct") {
          var _PUCK__value__45$val = _slicedToArray(__PUCK__value__45.value, 1),
              toStruct = _PUCK__value__45$val[0];

          var __PUCK__value__46 = subject.kind;
          var __PUCK__value__47 = __PUCK__value__46;
          if (__PUCK__value__47.kind == "Struct") {
            var _PUCK__value__47$val = _slicedToArray(__PUCK__value__47.value, 1),
                subjectStruct = _PUCK__value__47$val[0];

            return isSameName(to, subject) && isStructAssignable(toStruct, subjectStruct);
          } else {
            var __PUCK__value__48 = __PUCK__value__46;
            if (true) {
              var __PUCK__value__49 = __PUCK__value__48;
              return false;
            };
          };
        } else {
          var __PUCK__value__50 = __PUCK__value__33;
          if (__PUCK__value__50.kind == "Trait") {
            var _PUCK__value__50$val = _slicedToArray(__PUCK__value__50.value, 1),
                toTrait = _PUCK__value__50$val[0];

            var __PUCK__value__51 = subject.kind;
            var __PUCK__value__52 = __PUCK__value__51;
            if (__PUCK__value__52.kind == "Trait") {
              var _PUCK__value__52$val = _slicedToArray(__PUCK__value__52.value, 1),
                  subjectTrait = _PUCK__value__52$val[0];

              return isTraitAssignable(toTrait, subjectTrait);
            } else {
              var __PUCK__value__53 = __PUCK__value__51;
              if (true) {
                var __PUCK__value__54 = __PUCK__value__53;
                return false;
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
    return _core.Iterable['$List<E>'].all.call(_core.ObjectMap.toList.call(to.members), function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          name = _ref2[0],
          toMember = _ref2[1];

      return isAssignable(toMember, subject.members[name]);
    });
  } else {
    return false;
  };
};
function isFunctionAssignable(to, subject) {
  if (!_core.Range.isSubsetOf.call(to.argumentRange, subject.argumentRange)) {
    return false;
  };
  return _core.Iterable['$List<E>'].all.call(_core.Iterable['$List<E>'].enumerate.call(to._arguments), function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        toArg = _ref4[0],
        i = _ref4[1];

    return isAssignable(toArg.type_, subject._arguments[i].type_);
  });
};
function isStructAssignable(to, subject) {
  var __PUCK__value__55 = [to.kind, subject.kind];
  var __PUCK__value__56 = __PUCK__value__55;
  if (__PUCK__value__56[0].kind == "Record" && __PUCK__value__56[1].kind == "Record") {
    var _ret = function () {
      var _PUCK__value__56$0$v = _slicedToArray(__PUCK__value__56[0].value, 1),
          toProps = _PUCK__value__56$0$v[0].properties,
          _PUCK__value__56$1$v = _slicedToArray(__PUCK__value__56[1].value, 1),
          subjectProps = _PUCK__value__56$1$v[0].properties;

      return {
        v: _core.Iterable['$List<E>'].all.call(_core.ObjectMap.toList.call(toProps), function (_ref5) {
          var _ref6 = _slicedToArray(_ref5, 2),
              key = _ref6[0],
              toProp = _ref6[1];

          return _core.ObjectMap.has.call(subjectProps, key) && isAssignable(toProp, subjectProps[key]);
        })
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  } else {
    var __PUCK__value__57 = __PUCK__value__55;
    if (__PUCK__value__57[0].kind == "Tuple" && __PUCK__value__57[1].kind == "Tuple") {
      var _PUCK__value__57$0$v = _slicedToArray(__PUCK__value__57[0].value, 1),
          toProps = _PUCK__value__57$0$v[0].properties,
          _PUCK__value__57$1$v = _slicedToArray(__PUCK__value__57[1].value, 1),
          subjectProps = _PUCK__value__57$1$v[0].properties;

      if (_core.Iterable['$List<E>'].size.call(toProps) != _core.Iterable['$List<E>'].size.call(subjectProps)) {
        return false;
      };
      return _core.Iterable['$List<E>'].all.call(_core.List.zip.call(_core.List, toProps, subjectProps), function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
            toProp = _ref8[0],
            subjectProp = _ref8[1];

        return isAssignable(toProp, subjectProp);
      });
    } else {
      var __PUCK__value__58 = __PUCK__value__55;
      if (__PUCK__value__58[0].kind == "Unit" && __PUCK__value__58[1].kind == "Unit") {
        return to.kind.value == subject.kind.value;
      } else {
        var __PUCK__value__59 = __PUCK__value__55;
        if (true) {
          var __PUCK__value__60 = __PUCK__value__59;
          return to.kind == subject.kind;
        };
      };
    };
  };
};
function isTraitAssignable(to, subject) {
  if (_core.ObjectMap.size.call(to.functions) == _core.ObjectMap.size.call(subject.functions)) {
    return _core.Iterable['$List<E>'].all.call(_core.ObjectMap.toList.call(to.functions), function (_ref9) {
      var _ref10 = _slicedToArray(_ref9, 2),
          name = _ref10[0],
          toFunction = _ref10[1];

      return isAssignable(toFunction, subject.functions[name]);
    });
  } else {
    return false;
  };
};
function isSameType(a, b) {
  var __PUCK__value__61 = [a.name, b.name];
  if (__PUCK__value__61[0].kind == "Some" && __PUCK__value__61[1].kind == "Some") {
    var _PUCK__value__61$0$v = _slicedToArray(__PUCK__value__61[0].value, 1),
        aName = _PUCK__value__61$0$v[0],
        _PUCK__value__61$1$v = _slicedToArray(__PUCK__value__61[1].value, 1),
        bName = _PUCK__value__61$1$v[0];

    return aName == bName;
  } else {
    return false;
  };
};
function findCommonType(types) {
  var index = 0;

  var _loop = function _loop() {
    var type_ = types[index];
    if (_core.Iterable['$List<E>'].all.call(types, function (t) {
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
