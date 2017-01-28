'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createScope = createScope;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _util = require('util');

var _ast = require('./../../ast/ast');

var _ast2 = require('./../../compiler/ast');

var _entities = require('./../../entities');

var _types = require('./types');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};
function createScope(context, file) {
  var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var reportError = $unwrapTraitObject($unwrapTraitObject(context).reportError).bind(context, file);
  var bindings = _core.ObjectMap._new();
  var typeBindings = _core.ObjectMap._new();
  return {
    parent: parent,
    setSelfBinding: function setSelfBinding(selfType) {
      var self = this;
      return typeBindings["Self"] = $unwrapTraitObject(self).getTypeBinding(selfType);
    },
    createChild: function createChild() {
      var self = this;
      return createScope(context, file, self);
    },
    clearBindings: function clearBindings() {
      return bindings = _core.ObjectMap._new();
    },
    setTypeBinding: function setTypeBinding(binding) {
      return typeBindings[$unwrapTraitObject($unwrapTraitObject(binding).name)] = binding;
    },
    getLocalBinding: function getLocalBinding(name) {
      return bindings[$unwrapTraitObject(name)];
    },
    getBinding: function getBinding(name) {
      var binding = bindings[$unwrapTraitObject(name)] || parent && parent.getBinding(name);
      if ($unwrapTraitObject(binding).inherit) {
        $unwrapTraitObject(binding).type_ = $unwrapTraitObject($unwrapTraitObject(binding).inherit).type_;
        if (!$unwrapTraitObject(binding).type_) {
          $unwrapTraitObject(context).runCheckerOnFile($unwrapTraitObject($unwrapTraitObject(binding).importedFrom).file);
          var externalBinding = $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(binding).importedFrom)._module).scope).getBinding($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(binding).token).property).name);
          $unwrapTraitObject(binding).type_ = $unwrapTraitObject(externalBinding).type_;
        };
      };
      return binding;
    },
    getTypeBinding: function getTypeBinding(name) {
      return typeBindings[$unwrapTraitObject(name)] || parent && parent.getTypeBinding(name);
    },
    getTypePath: function getTypePath(typePath) {
      var self = this;
      if (typePath.kind == "Member") {
        return $unwrapTraitObject(self).getTypeBinding($unwrapTraitObject($unwrapTraitObject(typePath.value)[0]).name);
      } else {
        var type_ = $unwrapTraitObject($unwrapTraitObject(self).getTypeBinding($unwrapTraitObject($unwrapTraitObject(typePath.value)[0]).name)).type_;
        var path = $unwrapTraitObject(typePath.value)[1];
        while ($unwrapTraitObject(path).kind == "Object") {
          type_ = $unwrapTraitObject($unwrapTraitObject(type_).members)[$unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(path).value)[0]).name)];
          path = $unwrapTraitObject($unwrapTraitObject(path).value)[1];
        };
        return {
          name: $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(path).value)[0]).name,
          type_: $unwrapTraitObject($unwrapTraitObject(type_).members)[$unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(path).value)[0]).name)]
        };
      };
    },
    define: function define(binding) {
      var allowRedeclare = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var self = this;
      var name = binding.name;
      if (!name) {
        throw (0, _js.Error)("Missing name");
      };
      binding.allowRedeclare = allowRedeclare;
      binding.redefined = bindings[name] != _js._undefined;
      if (binding.redefined) {
        if (!allowRedeclare || !$unwrapTraitObject(bindings[name]).allowRedeclare) {
          reportError(binding.token, "" + name + " has already been declared in the scope" + (0, _util.inspect)(self));
        };
        $unwrapTraitObject(bindings[name]).redefined = true;
        binding.previous = bindings[name];
      };
      return bindings[name] = binding;
    },
    defineType: function defineType(type_, token) {
      var allowRedeclare = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var self = this;
      var name = _core.Option.unwrap.call(type_.name);
      if (name == "Self") {
        reportError(token, "Self is a reserved name");
      };
      if (!allowRedeclare && typeBindings[name]) {
        reportError(token, "Type " + name + " is already defined");
      };
      if (allowRedeclare && typeBindings[name]) {
        $unwrapTraitObject(_js._Object).assign($unwrapTraitObject(typeBindings[name]).type_, type_);
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
      return "[Scope]";
    }
  };
}
