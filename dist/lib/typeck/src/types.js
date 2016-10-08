#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTypeInstance = createTypeInstance;
exports.getType = getType;
exports.isAssignable = isAssignable;
exports.isSameType = isSameType;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

require('./../../ast/ast.js');

var _visit = require('./../../ast/visit.js');

var visit = _interopRequireWildcard(_visit);

var _entities = require('./../../entities.js');

var _functions = require('./functions.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function createTypeInstance(_class, typeParameters) {
  var __PUCK__value__1 = void 0;
  if (typeParameters.length < _class.parameterRange.end - 1) {
    __PUCK__value__1 = typeParameters.concat(_class.typeParameters.slice(typeParameters.length).map(function (p) {
      return p.defaultValue;
    }));
  } else {
    __PUCK__value__1 = typeParameters;
  };
  typeParameters = __PUCK__value__1;
  var instance = void 0;;
  if (instance = _class.instances.find(function (i) {
    return i.typeParameters.length == typeParameters.length && i.typeParameters.every(function (p, i) {
      return isSameType(p, typeParameters[i]);
    });
  })) {
    return instance;
  } else {
    instance = {
      isTrait: _class.isTrait,
      functions: _class.functions,
      properties: _class.properties && _js._Object.create(_js._null),
      implementations: _class.implementations && [],
      kind: _class.name,
      name: _class.name + "<" + typeParameters.map(function (p) {
        return p.name;
      }).join(", ") + ">",
      _class: _class,
      typeParameters: typeParameters
    };
    _class.instances.push(instance);
    return instance;
  };
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
        return createTypeInstance(binding.ty, t.typeParameters.map(function (p) {
          return p.ty;
        }));
      } else {
        return binding.ty;
      };
    };
  } else {
    var _arguments = t._arguments.map(function (p) {
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
  if (sameKind && to.kind == "Function") {
    return isFunctionAssignable(to, subject);
  } else {
    if ((0, _entities.isTypeInstance)(to) && (0, _entities.isTypeInstance)(subject)) {
      return subject.typeParameters.every(function (p, i) {
        return isAssignable(to.typeParameters[i], p);
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
