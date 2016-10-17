#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveTypeParameters = undefined;
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
  return function resolveTypeParametersInner(ty) {
    if ((0, _entities.isFunctionType)(ty)) {
      return resolveTypeParametersFn(parameterMap, ty);
    } else {
      if ((0, _entities.isObjectType)(ty)) {
        return resolveTypeParametersObject(parameterMap, ty);
      } else {
        if ((0, _entities.isTupleType)(ty)) {
          return resolveTypeParametersTuple(parameterMap, ty);
        } else {
          if ((0, _entities.isTypeParameter)(ty)) {
            return parameterMap[ty.name] || ty;
          };
        };
      };
    };
  };
};
function resolveTypeParametersFn(parameterMap, func) {
  var __PUCK__value__2 = void 0;
  if (func.returnType) {
    __PUCK__value__2 = resolveTypeParameters(parameterMap)(func.returnType);
  };
  return _js._Object.assign({}, func, {
    _arguments: func._arguments.map(function (binding) {
      var __PUCK__value__1 = void 0;
      if (binding.ty) {
        __PUCK__value__1 = resolveTypeParameters(parameterMap)(binding.ty);
      };
      return _js._Object.assign({}, binding, { ty: __PUCK__value__1 });
    }),
    returnType: __PUCK__value__2
  });
};
function resolveTypeParametersObject(parameterMap, struct) {
  return _js._Object.assign({}, struct, { properties: _core.ObjectMapTrait['$ObjectMap'].map.call(struct.properties, resolveTypeParameters(parameterMap)) });
};
function resolveTypeParametersTuple(parameterMap, struct) {
  return _js._Object.assign({}, struct, { properties: struct.properties.map(resolveTypeParameters(parameterMap)) });
};
function mapObject(object, mapper) {
  return _core.ObjectMapTrait['$ObjectMap'].map.call(object, mapper);
};
function createTypeInstance(_class, typeParameters) {
  var __PUCK__value__3 = void 0;
  if (typeParameters.length < _class.parameterRange.end - 1) {
    __PUCK__value__3 = typeParameters.concat(_class.typeParameters.slice(typeParameters.length).map(function (p) {
      return p.defaultValue;
    }));
  } else {
    __PUCK__value__3 = typeParameters;
  };
  typeParameters = __PUCK__value__3;
  var cachedInstance = _class.instances.find(function (i) {
    return i.typeParameters.length == typeParameters.length && i.typeParameters.every(function (p, i) {
      return isSameType(p, typeParameters[i]);
    });
  });
  if (cachedInstance) {
    return cachedInstance;
  };
  var parameterMap = _core.ObjectMapTrait.fromList(_core.ListTrait.zip(typeParameters, _class.typeParameters).map(function (p) {
    var typeArgument = p[0];
    var typeParameter = p[1];
    return [typeParameter.name, typeArgument];
  }));
  var __PUCK__value__4 = void 0;
  if (_class.functions) {
    __PUCK__value__4 = mapObject(_class.functions, resolveTypeParameters(parameterMap));
  };
  var __PUCK__value__5 = void 0;
  if (_class.properties) {
    __PUCK__value__5 = mapObject(_class.properties, resolveTypeParameters(parameterMap));
  };
  var instance = {
    isTrait: _class.isTrait,
    functions: __PUCK__value__4,
    properties: __PUCK__value__5,
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
  if (!t) {
    return _js._undefined;
  };
  if (t.name) {
    var binding = scope.getTypeBinding(t.name.name);
    if (!binding) {
      return binding;
    } else {
      if ((0, _entities.isTypeClass)(binding.ty)) {
        return createTypeInstanceTypeCast(binding.ty, t.typeParameters.map(function (p) {
          return p.ty;
        }));
      } else {
        return binding.ty;
      };
    };
  } else {
    if (t.kind == _ast2.SyntaxKind.ObjectTypeBound) {
      var properties = mapObject(t.properties, function (p) {
        return getType(scope, p);
      });
      return {
        kind: "Object",
        name: "Object",
        properties: properties
      };
    } else {
      if (t.kind == _ast2.SyntaxKind.TupleTypeBound) {
        var _properties = t.properties.map(function (p) {
          return getType(scope, p);
        });
        return {
          kind: "Tuple",
          name: (0, _functions.getTupleTypeName)(_properties),
          properties: _properties
        };
      } else {
        var _arguments = t._arguments.properties.map(function (p) {
          return { ty: getType(scope, p) };
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
