#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveTypeParameters = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.createTypeInstance = createTypeInstance;
exports.getType = getType;
exports.isAssignable = isAssignable;
exports.isSameType = isSameType;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _ast = require('./../../ast/ast.js');

var _visit = require('./../../ast/visit.js');

var visit = _interopRequireWildcard(_visit);

var _ast2 = require('./../../compiler/ast.js');

var _entities = require('./../../entities.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function assign(a, b) {
  return _js._Object.assign({}, a, b);
};
var resolveTypeParameters = exports.resolveTypeParameters = function resolveTypeParameters(parameterMap) {
  var allowCreateInstance = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
  var depth = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

  return function resolveTypeParametersInner(type_) {
    if (!type_) {
      return type_;
    };
    if (depth > 10) {
      return type_;
    };
    if (allowCreateInstance) {
      var __PUCK__value__1 = type_;
      if (__PUCK__value__1.kind.kind == "Enum" && __PUCK__value__1._class.kind == "Some") {
        var _PUCK__value__1$kind = _slicedToArray(__PUCK__value__1.kind.value, 1);

        var __PUCK__value__2 = _PUCK__value__1$kind[0];

        var _PUCK__value__1$_cla = _slicedToArray(__PUCK__value__1._class.value, 1);

        var _class = _PUCK__value__1$_cla[0];

        return createTypeInstance(type_, _class.typeParameters.map(function (p) {
          return parameterMap[_core.MaybeTrait['$Option'].unwrap.call(p.name)] || p;
        }));
      };
      var __PUCK__value__3 = type_;
      if (__PUCK__value__3.kind.kind == "Struct" && __PUCK__value__3._class.kind == "Some") {
        var _PUCK__value__3$kind = _slicedToArray(__PUCK__value__3.kind.value, 1);

        var __PUCK__value__4 = _PUCK__value__3$kind[0];

        var _PUCK__value__3$_cla = _slicedToArray(__PUCK__value__3._class.value, 1);

        var _class2 = _PUCK__value__3$_cla[0];

        return createTypeInstance(type_, _class2.typeParameters.map(function (p) {
          return parameterMap[_core.MaybeTrait['$Option'].unwrap.call(p.name)] || p;
        }));
      };
    };
    var __PUCK__value__5 = type_.kind;
    var __PUCK__value__6 = __PUCK__value__5;
    var __PUCK__value__7 = void 0;
    if (__PUCK__value__6.kind == "Enum") {
      var _PUCK__value__6$valu = _slicedToArray(__PUCK__value__6.value, 1);

      var enum_ = _PUCK__value__6$valu[0];

      __PUCK__value__7 = _entities.TypeKind.Enum(resolveTypeParametersEnum(parameterMap, enum_, depth));
    } else {
      var __PUCK__value__8 = __PUCK__value__5;
      var __PUCK__value__9 = void 0;
      if (__PUCK__value__8.kind == "Function") {
        var _PUCK__value__8$valu = _slicedToArray(__PUCK__value__8.value, 1);

        var func = _PUCK__value__8$valu[0];

        __PUCK__value__9 = _entities.TypeKind.Function(resolveTypeParametersFn(parameterMap, func, depth));
      } else {
        var __PUCK__value__10 = __PUCK__value__5;
        var __PUCK__value__11 = void 0;
        if (__PUCK__value__10.kind == "Parameter") {
          var _undefined2 = __PUCK__value__10;
          return _core.MaybeTrait['$Option'].unwrapOr.call(_core.ObjectMapTrait['$ObjectMap'].get.call(parameterMap, _core.MaybeTrait['$Option'].unwrap.call(type_.name)), type_);
        } else {
          var __PUCK__value__12 = __PUCK__value__5;
          var __PUCK__value__13 = void 0;
          if (__PUCK__value__12.kind == "Struct") {
            var _PUCK__value__12$val = _slicedToArray(__PUCK__value__12.value, 1);

            var struct = _PUCK__value__12$val[0];

            __PUCK__value__13 = _entities.TypeKind.Struct(resolveTypeParametersStruct(parameterMap, struct, depth));
          } else {
            var __PUCK__value__14 = __PUCK__value__5;
            var __PUCK__value__15 = void 0;
            if (true) {
              var __PUCK__value__16 = __PUCK__value__14;
              __PUCK__value__15 = type_.kind;
            };
            __PUCK__value__13 = __PUCK__value__15;
          };
          __PUCK__value__11 = __PUCK__value__13;
        };
        __PUCK__value__9 = __PUCK__value__11;
      };
      __PUCK__value__7 = __PUCK__value__9;
    };
    var resolvedKind = __PUCK__value__7;
    return assign(type_, { kind: resolvedKind });
  };
};
function resolveTypeParametersEnum(parameterMap, e, depth) {
  return assign(e, {
    implementations: [],
    members: _core.ObjectMapTrait['$ObjectMap'].map.call(e.members, resolveTypeParameters(parameterMap, true, depth + 1))
  });
};
function resolveTypeParametersFn(parameterMap, func, depth) {
  var __PUCK__value__18 = void 0;
  if (func.returnType) {
    __PUCK__value__18 = resolveTypeParameters(parameterMap, true, depth + 1)(func.returnType);
  };
  return assign(func, {
    _arguments: _core.Iterable['$List'].map.call(func._arguments, function (binding) {
      var __PUCK__value__17 = void 0;
      if (binding.type_) {
        __PUCK__value__17 = resolveTypeParameters(parameterMap, true, depth + 1)(binding.type_);
      };
      return assign(binding, { type_: __PUCK__value__17 });
    }),
    returnType: __PUCK__value__18
  });
};
function resolveTypeParametersStruct(parameterMap, struct, depth) {
  var __PUCK__value__19 = struct.kind;
  var __PUCK__value__20 = __PUCK__value__19;
  var __PUCK__value__21 = void 0;
  if (__PUCK__value__20.kind == "Record") {
    var _PUCK__value__20$val = _slicedToArray(__PUCK__value__20.value, 1);

    var properties = _PUCK__value__20$val[0].properties;

    __PUCK__value__21 = _entities.StructKind.Record({ properties: _core.ObjectMapTrait['$ObjectMap'].map.call(properties, resolveTypeParameters(parameterMap, true, depth + 1)) });
  } else {
    var __PUCK__value__22 = __PUCK__value__19;
    var __PUCK__value__23 = void 0;
    if (__PUCK__value__22.kind == "Tuple") {
      var _PUCK__value__22$val = _slicedToArray(__PUCK__value__22.value, 1);

      var _properties = _PUCK__value__22$val[0].properties;

      __PUCK__value__23 = _entities.StructKind.Tuple({ properties: _core.Iterable['$List'].map.call(_properties, resolveTypeParameters(parameterMap, true, depth + 1)) });
    } else {
      var __PUCK__value__24 = __PUCK__value__19;
      var __PUCK__value__25 = void 0;
      if (__PUCK__value__24.kind == "Unit") {
        var _undefined3 = __PUCK__value__24;
        __PUCK__value__25 = struct.kind;
      };
      __PUCK__value__23 = __PUCK__value__25;
    };
    __PUCK__value__21 = __PUCK__value__23;
  };
  return assign(struct, {
    implementations: [],
    kind: __PUCK__value__21
  });
};
function mapObject(object, mapper) {
  return _core.ObjectMapTrait['$ObjectMap'].map.call(object, mapper);
};
function createTypeInstance(type_, typeParameters) {
  var _class = _core.MaybeTrait['$Option'].unwrap.call(type_._class);
  var __PUCK__value__26 = void 0;
  if (typeParameters.length < _class.parameterRange.end - 1) {
    __PUCK__value__26 = typeParameters.concat(_class.typeParameters.slice(typeParameters.length).map(function (p) {
      var __PUCK__value__27 = p.kind;
      if (__PUCK__value__27.kind == "Parameter") {
        var _PUCK__value__27$val = _slicedToArray(__PUCK__value__27.value, 1);

        var _p = _PUCK__value__27$val[0];

        return _core.MaybeTrait['$Option'].unwrap.call(_p.defaultValue);
      } else {
        throw "not a type parameter";
      };
    }));
  } else {
    __PUCK__value__26 = typeParameters;
  };
  typeParameters = __PUCK__value__26;
  var __PUCK__value__28 = _core.Iterable['$List'].find.call(_class.instances, function (a) {
    var i = _core.MaybeTrait['$Option'].unwrap.call(a.instance);
    return i.typeParameters.length == typeParameters.length && i.typeParameters.every(function (p, i) {
      return isSameType(p, typeParameters[i]);
    });
  });
  if (__PUCK__value__28.kind == "Some") {
    var _PUCK__value__28$val = _slicedToArray(__PUCK__value__28.value, 1);

    var cachedInstance = _PUCK__value__28$val[0];

    return cachedInstance;
  };
  if (_core.Iterable['$List'].all.call(typeParameters, function (p) {
    var __PUCK__value__29 = p.kind;
    var __PUCK__value__30 = __PUCK__value__29;
    if (__PUCK__value__30.kind == "Parameter") {
      var _undefined4 = __PUCK__value__30;
      return true;
    } else {
      var __PUCK__value__31 = __PUCK__value__29;
      if (true) {
        var __PUCK__value__32 = __PUCK__value__31;
        return false;
      };
    };
  })) {
    return type_;
  };
  var parameterMap = _core.ObjectMapTrait.fromList(_core.Iterable['$List'].map.call(_core.ListTrait.zip(typeParameters, _class.typeParameters), function (p) {
    var typeArgument = p[0];
    var typeParameter = p[1];
    return [_core.MaybeTrait['$Option'].unwrap.call(typeParameter.name), typeArgument];
  }));
  var instance = {
    displayName: type_.displayName,
    name: type_.name,
    kind: resolveTypeParameters(parameterMap, false)(type_).kind,
    _class: _core.None,
    instance: (0, _core.Some)({
      _class: type_,
      typeParameters: typeParameters,
      parameterMap: parameterMap
    })
  };
  _class.instances.push(instance);
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
      var __PUCK__value__33 = binding.type_._class;
      if (__PUCK__value__33.kind == "Some") {
        var _PUCK__value__33$val = _slicedToArray(__PUCK__value__33.value, 1);

        var __PUCK__value__34 = _PUCK__value__33$val[0];

        return createTypeInstance(binding.type_, t.typeParameters.map(function (p) {
          return p.type_;
        }));
      } else {
        return binding.type_;
      };
    };
  } else {
    if (t.kind == _ast2.SyntaxKind.ObjectTypeBound) {
      var properties = _core.ObjectMapTrait.fromList(t.properties.map(function (member) {
        return [member.name.name, getType(scope, member.typeBound)];
      }));
      return {
        displayName: _core.None,
        name: _core.None,
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: _entities.StructKind.Record({ properties: properties }),
          _class: _core.None,
          instance: _core.None
        })
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
          _class: _entities.TypeClassTrait.fromAstNode(t, function () {}),
          instance: _core.None
        };
      };
    };
  };
};
function isSameName(to, subject) {
  var __PUCK__value__35 = [to.name, subject.name];
  var __PUCK__value__36 = __PUCK__value__35;
  if (__PUCK__value__36[0].kind == "Some" && __PUCK__value__36[1].kind == "Some") {
    var _PUCK__value__36$0$v = _slicedToArray(__PUCK__value__36[0].value, 1);

    var toName = _PUCK__value__36$0$v[0];

    var _PUCK__value__36$1$v = _slicedToArray(__PUCK__value__36[1].value, 1);

    var subjectName = _PUCK__value__36$1$v[0];

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
  if (__PUCK__value__39.kind == "Parameter") {
    var _undefined5 = __PUCK__value__39;
    return true;
  };
  var __PUCK__value__40 = to.kind;
  var __PUCK__value__41 = __PUCK__value__40;
  if (__PUCK__value__41.kind == "Enum") {
    var _PUCK__value__41$val = _slicedToArray(__PUCK__value__41.value, 1);

    var toEnum = _PUCK__value__41$val[0];

    var __PUCK__value__42 = subject.kind;
    var __PUCK__value__43 = __PUCK__value__42;
    if (__PUCK__value__43.kind == "Enum") {
      var _PUCK__value__43$val = _slicedToArray(__PUCK__value__43.value, 1);

      var subjectEnum = _PUCK__value__43$val[0];

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
    if (__PUCK__value__46.kind == "Function") {
      var _PUCK__value__46$val = _slicedToArray(__PUCK__value__46.value, 1);

      var toFunc = _PUCK__value__46$val[0];

      var __PUCK__value__47 = subject.kind;
      var __PUCK__value__48 = __PUCK__value__47;
      if (__PUCK__value__48.kind == "Function") {
        var _PUCK__value__48$val = _slicedToArray(__PUCK__value__48.value, 1);

        var subjectFunc = _PUCK__value__48$val[0];

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
      if (__PUCK__value__51.kind == "Parameter") {
        var _undefined6 = __PUCK__value__51;
        return true;
      } else {
        var __PUCK__value__52 = __PUCK__value__40;
        if (__PUCK__value__52.kind == "Struct") {
          var _PUCK__value__52$val = _slicedToArray(__PUCK__value__52.value, 1);

          var toStruct = _PUCK__value__52$val[0];

          var __PUCK__value__53 = subject.kind;
          var __PUCK__value__54 = __PUCK__value__53;
          if (__PUCK__value__54.kind == "Struct") {
            var _PUCK__value__54$val = _slicedToArray(__PUCK__value__54.value, 1);

            var subjectStruct = _PUCK__value__54$val[0];

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
          if (__PUCK__value__57.kind == "Trait") {
            var _PUCK__value__57$val = _slicedToArray(__PUCK__value__57.value, 1);

            var toTrait = _PUCK__value__57$val[0];

            var __PUCK__value__58 = subject.kind;
            var __PUCK__value__59 = __PUCK__value__58;
            if (__PUCK__value__59.kind == "Trait") {
              var _PUCK__value__59$val = _slicedToArray(__PUCK__value__59.value, 1);

              var subjectTrait = _PUCK__value__59$val[0];

              return isTraitAssignable(toTrait, subjectTrait);
            } else {
              var __PUCK__value__60 = __PUCK__value__58;
              if (true) {
                var __PUCK__value__61 = __PUCK__value__60;
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
  if (_core.ObjectMapTrait['$ObjectMap'].size.call(to.members) == _core.ObjectMapTrait['$ObjectMap'].size.call(subject.members)) {
    return _core.Iterable['$List'].all.call(_core.ObjectMapTrait['$ObjectMap'].toList.call(to.members), function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2);

      var name = _ref2[0];
      var toMember = _ref2[1];

      return isAssignable(toMember, subject.members[name]);
    });
  } else {
    return false;
  };
};
function isFunctionAssignable(to, subject) {
  if (!_core.RangeTrait['$Range<Num>'].isSubsetOf.call(to.argumentRange, subject.argumentRange)) {
    return false;
  };
  return _core.Iterable['$List'].all.call(_core.Iterable['$List'].enumerate.call(to._arguments), function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2);

    var toArg = _ref4[0];
    var i = _ref4[1];

    return isAssignable(toArg.type_, subject._arguments[i].type_);
  });
};
function isStructAssignable(to, subject) {
  var __PUCK__value__62 = [to.kind, subject.kind];
  var __PUCK__value__63 = __PUCK__value__62;
  if (__PUCK__value__63[0].kind == "Record" && __PUCK__value__63[1].kind == "Record") {
    var _ret = function () {
      var _PUCK__value__63$0$v = _slicedToArray(__PUCK__value__63[0].value, 1);

      var toProps = _PUCK__value__63$0$v[0].properties;

      var _PUCK__value__63$1$v = _slicedToArray(__PUCK__value__63[1].value, 1);

      var subjectProps = _PUCK__value__63$1$v[0].properties;

      return {
        v: _core.Iterable['$List'].all.call(_core.ObjectMapTrait['$ObjectMap'].toList.call(toProps), function (_ref5) {
          var _ref6 = _slicedToArray(_ref5, 2);

          var key = _ref6[0];
          var toProp = _ref6[1];

          return isAssignable(toProp, subjectProps[key]);
        })
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  } else {
    var __PUCK__value__64 = __PUCK__value__62;
    if (__PUCK__value__64[0].kind == "Tuple" && __PUCK__value__64[1].kind == "Tuple") {
      var _PUCK__value__64$0$v = _slicedToArray(__PUCK__value__64[0].value, 1);

      var _toProps = _PUCK__value__64$0$v[0].properties;

      var _PUCK__value__64$1$v = _slicedToArray(__PUCK__value__64[1].value, 1);

      var _subjectProps = _PUCK__value__64$1$v[0].properties;

      if (_core.Iterable['$List'].size.call(_toProps) != _core.Iterable['$List'].size.call(_subjectProps)) {
        return false;
      };
      return _core.Iterable['$List'].all.call(_core.ListTrait.zip(_toProps, _subjectProps), function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2);

        var toProp = _ref8[0];
        var subjectProp = _ref8[1];

        return isAssignable(toProp, subjectProp);
      });
    } else {
      var __PUCK__value__65 = __PUCK__value__62;
      if (__PUCK__value__65[0].kind == "Unit" && __PUCK__value__65[1].kind == "Unit") {
        return to.kind.value == subject.kind.value;
      } else {
        var __PUCK__value__66 = __PUCK__value__62;
        if (true) {
          var __PUCK__value__67 = __PUCK__value__66;
          return to.kind == subject.kind;
        };
      };
    };
  };
};
function isTraitAssignable(to, subject) {
  if (_core.ObjectMapTrait['$ObjectMap'].size.call(to.functions) == _core.ObjectMapTrait['$ObjectMap'].size.call(subject.functions)) {
    return _core.Iterable['$List'].all.call(_core.ObjectMapTrait['$ObjectMap'].toList.call(to.functions), function (_ref9) {
      var _ref10 = _slicedToArray(_ref9, 2);

      var name = _ref10[0];
      var toFunction = _ref10[1];

      return isAssignable(toFunction, subject.functions[name]);
    });
  } else {
    return false;
  };
};
function isSameType(a, b) {
  var __PUCK__value__68 = [a.name, b.name];
  if (__PUCK__value__68[0].kind == "Some" && __PUCK__value__68[1].kind == "Some") {
    var _PUCK__value__68$0$v = _slicedToArray(__PUCK__value__68[0].value, 1);

    var aName = _PUCK__value__68$0$v[0];

    var _PUCK__value__68$1$v = _slicedToArray(__PUCK__value__68[1].value, 1);

    var bName = _PUCK__value__68$1$v[0];

    return aName == bName;
  } else {
    return false;
  };
}
