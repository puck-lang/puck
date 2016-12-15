#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveTypeParameters = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.createTypeInstance = createTypeInstance;
exports.createTypeInstanceTypeCast = createTypeInstanceTypeCast;
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

var _functions = require('./functions.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var resolveTypeParameters = exports.resolveTypeParameters = function resolveTypeParameters(parameterMap) {
  return function resolveTypeParametersInner(type_) {
    var __PUCK__value__1 = void 0;
    if ((0, _entities.isEnumType)(type_)) {
      __PUCK__value__1 = resolveTypeParametersEnum(parameterMap, type_);
    } else {
      var __PUCK__value__2 = void 0;
      if ((0, _entities.isFunctionType)(type_)) {
        __PUCK__value__2 = resolveTypeParametersFn(parameterMap, type_);
      } else {
        var __PUCK__value__3 = void 0;
        if ((0, _entities.isObjectType)(type_)) {
          __PUCK__value__3 = resolveTypeParametersObject(parameterMap, type_);
        } else {
          var __PUCK__value__4 = void 0;
          if ((0, _entities.isTupleType)(type_)) {
            __PUCK__value__4 = resolveTypeParametersTuple(parameterMap, type_);
          } else {
            var __PUCK__value__5 = void 0;
            if ((0, _entities.isTypeParameter)(type_)) {
              __PUCK__value__5 = parameterMap[type_.name] || type_;
            };
            __PUCK__value__4 = __PUCK__value__5;
          };
          __PUCK__value__3 = __PUCK__value__4;
        };
        __PUCK__value__2 = __PUCK__value__3;
      };
      __PUCK__value__1 = __PUCK__value__2;
    };
    var resolved = __PUCK__value__1;
    return resolved || type_;
  };
};
function resolveTypeParametersEnum(parameterMap, e) {
  if ((0, _entities.isTypeClass)(e)) {
    return createTypeInstanceTypeCast(e, e.typeParameters.map(function (p) {
      return parameterMap[p.name] || p;
    }));
  } else {
    return e;
  };
};
function resolveTypeParametersFn(parameterMap, func) {
  var __PUCK__value__7 = void 0;
  if (func.returnType) {
    __PUCK__value__7 = resolveTypeParameters(parameterMap)(func.returnType);
  };
  return _js._Object.assign({}, func, {
    _arguments: func._arguments.map(function (binding) {
      var __PUCK__value__6 = void 0;
      if (binding.type_) {
        __PUCK__value__6 = resolveTypeParameters(parameterMap)(binding.type_);
      };
      return _js._Object.assign({}, binding, { type_: __PUCK__value__6 });
    }),
    returnType: __PUCK__value__7
  });
};
function resolveTypeParametersObject(parameterMap, struct) {
  return _js._Object.assign({}, struct, { properties: _core.ObjectMapTrait['$ObjectMap'].map.call(struct.properties, resolveTypeParameters(parameterMap)) });
};
function resolveTypeParametersTuple(parameterMap, struct) {
  var properties = struct.properties.map(resolveTypeParameters(parameterMap));
  return _js._Object.assign({}, struct, {
    name: (0, _functions.getTupleTypeName)(properties),
    properties: properties
  });
};
function mapObject(object, mapper) {
  return _core.ObjectMapTrait['$ObjectMap'].map.call(object, mapper);
};
function createTypeInstance(_class, typeParameters) {
  var __PUCK__value__8 = void 0;
  if (typeParameters.length < _class.parameterRange.end - 1) {
    __PUCK__value__8 = typeParameters.concat(_class.typeParameters.slice(typeParameters.length).map(function (p) {
      return p.defaultValue;
    }));
  } else {
    __PUCK__value__8 = typeParameters;
  };
  typeParameters = __PUCK__value__8;
  var __PUCK__value__9 = _core.Iterable['$List'].find.call(_class.instances, function (i) {
    return i.typeParameters.length == typeParameters.length && i.typeParameters.every(function (p, i) {
      return isSameType(p, typeParameters[i]);
    });
  });
  if (__PUCK__value__9.kind == "Some") {
    var _PUCK__value__9$valu = _slicedToArray(__PUCK__value__9.value, 1);

    var cachedInstance = _PUCK__value__9$valu[0];

    return cachedInstance;
  };
  var parameterMap = _core.ObjectMapTrait.fromList(_core.ListTrait.zip(typeParameters, _class.typeParameters).map(function (p) {
    var typeArgument = p[0];
    var typeParameter = p[1];
    return [typeParameter.name, typeArgument];
  }));
  var __PUCK__value__10 = void 0;
  if (_class.functions) {
    __PUCK__value__10 = mapObject(_class.functions, resolveTypeParameters(parameterMap));
  };
  var __PUCK__value__11 = void 0;
  if (_class.members) {
    __PUCK__value__11 = mapObject(_class.members, resolveTypeParameters(parameterMap));
  };
  var __PUCK__value__12 = void 0;
  if (_class.properties) {
    __PUCK__value__12 = mapObject(_class.properties, resolveTypeParameters(parameterMap));
  };
  var instance = {
    isTrait: _class.isTrait,
    functions: __PUCK__value__10,
    members: __PUCK__value__11,
    properties: __PUCK__value__12,
    implementations: _class.implementations && [],
    kind: _class.name,
    name: _class.name + "<" + typeParameters.map(function (p) {
      return p.name;
    }).join(", ") + ">",
    _class: _class,
    typeParameters: typeParameters,
    parameterMap: parameterMap
  };
  _class.instances.push(instance);
  return instance;
};
function createTypeInstanceTypeCast(_class, typeParameters) {
  return createTypeInstance(_class, typeParameters);
};
function getType(scope, t) {
  var msg = arguments.length <= 2 || arguments[2] === undefined ? "" : arguments[2];

  if (!t) {
    return _js._undefined;
  };
  if (t.path) {
    var binding = scope.getTypePath(t.path);
    if (!binding) {
      return binding;
    } else {
      if ((0, _entities.isTypeClass)(binding.type_)) {
        return createTypeInstanceTypeCast(binding.type_, t.typeParameters.map(function (p) {
          return p.type_;
        }));
      } else {
        return binding.type_;
      };
    };
  } else {
    if (t.kind == _ast2.SyntaxKind.ObjectTypeBound) {
      var properties = _core.ObjectMapTrait.fromList(t.properties.map(function (member) {
        return [member.name.name, getType(scope, member.typeBound, "ObjectTypeBound")];
      }));
      return {
        kind: "Object",
        name: "Object",
        properties: properties
      };
    } else {
      if (t.kind == _ast2.SyntaxKind.TupleTypeBound) {
        var _properties = t.properties.map(function (p) {
          return getType(scope, p, "TupleTypeBound");
        });
        return {
          kind: "Tuple",
          name: (0, _functions.getTupleTypeName)(_properties),
          properties: _properties
        };
      } else {
        var _arguments = t._arguments.properties.map(function (p) {
          return { type_: getType(scope, p) };
        });
        var returnType = getType(scope, t.returnType);
        return {
          kind: "Function",
          name: (0, _functions.getFunctionTypeName)(_arguments, returnType),
          _arguments: _arguments,
          argumentRange: {
            start: _arguments.length,
            end: _arguments.length + 1
          },
          returnType: returnType
        };
      };
    };
  };
};
function isAssignable(to, subject) {
  if (!subject || !to) {
    return true;
  };
  if ((0, _entities.isTypeParameter)(to)) {
    return true;
  };
  var sameKind = subject.kind == to.kind;
  if (!sameKind) {
    return false;
  };
  if ((0, _entities.isTypeInstance)(to) && (0, _entities.isTypeInstance)(subject)) {
    if (!subject.typeParameters.every(function (p, i) {
      return isAssignable(to.typeParameters[i], p);
    })) {
      return false;
    };
  };
  if (sameKind && to.kind == "Function") {
    return isFunctionAssignable(to, subject);
  } else {
    if (sameKind && to.kind == "Tuple") {
      return subject.properties.length == to.properties.length && subject.properties.every(function (p, i) {
        return isAssignable(to.properties[i], p);
      });
    } else {
      return true;
    };
  };
};
function isFunctionAssignable(to, subject) {
  if (!_core.RangeTrait['$Range<Num>'].isSubsetOf.call(to.argumentRange, subject.argumentRange)) {
    return false;
  };
  return to._arguments.every(function (toArg, i) {
    var subjectArg = subject._arguments[i];
    return isAssignable(toArg, subjectArg);
  });
};
function isSameType(a, b) {
  return a.kind == b.kind;
}
