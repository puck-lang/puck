#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createScope = createScope;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _util = require('util');

require('./../../ast/ast.js');

var _ast = require('./../../compiler/ast.js');

var _entities = require('./../../entities.js');

var _range = require('./range.js');

var _types = require('./types.js');

function createScope(context, file) {
  var parent = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  var reportError = context.reportError.bind(context, file);
  var bindings = {};
  var typeBindings = {};
  return {
    parent: parent,
    createChild: function createChild() {
      var self = this;
      return createScope(context, file, self);
    },
    getLocalBinding: function getLocalBinding(name) {
      return bindings[name];
    },
    getBinding: function getBinding(name) {
      return bindings[name] || parent && parent.getBinding(name);
    },
    getTypeBinding: function getTypeBinding(name) {
      return typeBindings[name] || parent && parent.getTypeBinding(name);
    },
    define: function define(binding) {
      var allowRedeclare = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      var self = this;
      var name = binding.name;
      binding.allowRedeclare = allowRedeclare;
      binding.redefined = bindings[name] != _js._undefined;
      if (binding.redefined) {
        if (!allowRedeclare || !bindings[name].allowRedeclare) {
          reportError(binding.token, "" + name + " has already been declared in the scope" + (0, _util.inspect)(self));
        };
        bindings[name].redefined = true;
        binding.previous = bindings[name];
      };
      return bindings[name] = binding;
    },
    defineType: function defineType(t) {
      var self = this;
      var name = t.name.name;
      if (typeBindings[name]) {
        reportError(t, "Type " + name + " is already defined");
      };
      var __PUCK__value__1 = void 0;
      if (t.typeParameters && t.typeParameters.length) {
        __PUCK__value__1 = (0, _range.getRange)(t.typeParameters, function (p) {
          return p.defaultValue;
        }, reportError, "type parameter");
      };
      var parameterRange = __PUCK__value__1;
      var __PUCK__value__2 = void 0;
      if (t.ty) {
        __PUCK__value__2 = t.ty;
      } else {
        var _ty = {
          kind: name,
          name: name,
          parameterRange: parameterRange
        };
        if (t.kind == _ast.SyntaxKind.TraitDeclaration) {
          _ty.functions = {};
        } else {
          if (t.kind == _ast.SyntaxKind.TypeDeclaration) {
            _ty.implementations = [];
            _ty.properties = _js._Object.create(_js._null);
          } else {
            if (t.kind == _ast.SyntaxKind.TypeParameter) {
              _ty.isTypeParameter = true;
              if (t.defaultValue) {
                _ty.defaultValue = (0, _types.getType)(self, t.defaultValue);
              };
            };
          };
        };
        if ((0, _entities.isTypeClass)(_ty)) {
          _ty.instances = [];
        };
        __PUCK__value__2 = _ty;
      };
      var ty = __PUCK__value__2;
      var binding = {
        name: name,
        ty: ty
      };
      return typeBindings[name] = binding;
    },
    inspect: function inspect(depth, opts) {
      var scope = {};
      if (parent) {
        scope["[parent]"] = parent.inspect();
      };
      _js._Object.assign(scope, bindings);
      if (!depth && !opts) {
        return scope;
      } else {
        return (0, _util.inspect)(scope, _js._Object.assign({}, opts, { depth: depth }));
      };
    }
  };
}
