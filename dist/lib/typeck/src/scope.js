#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createScope = createScope;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _util = require('util');

var _ast = require('./../../ast/ast.js');

var _ast2 = require('./../../compiler/ast.js');

var _entities = require('./../../entities.js');

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
    clearBindings: function clearBindings() {
      return bindings = {};
    },
    setTypeBinding: function setTypeBinding(binding) {
      return typeBindings[binding.name] = binding;
    },
    getLocalBinding: function getLocalBinding(name) {
      return bindings[name];
    },
    getBinding: function getBinding(name) {
      var binding = bindings[name] || parent && parent.getBinding(name);
      if (binding.inherit) {
        binding.type_ = binding.inherit.type_;
        if (!binding.type_) {
          context.runCheckerOnFile(binding.importedFrom.file);
          var externalBinding = binding.importedFrom._module.scope.getBinding(binding.token.property.name);
          binding.type_ = externalBinding.type_;
        };
      };
      return binding;
    },
    getTypeBinding: function getTypeBinding(name) {
      return typeBindings[name] || parent && parent.getTypeBinding(name);
    },
    getTypePath: function getTypePath(typePath) {
      var self = this;
      if (typePath.kind == "Member") {
        return self.getTypeBinding(typePath.value[0].name);
      } else {
        var type_ = self.getTypeBinding(typePath.value[0].name).type_;
        var path = typePath.value[1];
        while (path.kind == "Object") {
          type_ = type_.members[path.value[0].name];
          path = path.value[1];
        };
        return {
          name: path.value[0].name,
          type_: type_.members[path.value[0].name]
        };
      };
    },
    define: function define(binding) {
      var allowRedeclare = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      var self = this;
      var name = binding.name;
      if (!name) {
        throw (0, _js.Error)("Missing name");
      };
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
    defineType: function defineType(type_, token) {
      var allowRedeclare = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

      var self = this;
      var name = _core.MaybeTrait['$Option'].unwrap.call(type_.name);
      if (!allowRedeclare && typeBindings[name]) {
        reportError(token, "Type " + name + " is already defined");
      };
      if (allowRedeclare && typeBindings[name]) {
        _js._Object.assign(typeBindings[name].type_, type_);
        return typeBindings[name];
      } else {
        return typeBindings[name] = {
          name: name,
          token: token,
          type_: type_
        };
      };
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
