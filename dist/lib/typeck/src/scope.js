#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.createScope = createScope;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _util = require('util');

var _ast = require('./../../ast/ast.js');

var _ast2 = require('./../../compiler/ast.js');

var _entities = require('./../../entities.js');

var _range = require('./range.js');

var _types = require('./types.js');

function any(a) {
  return a;
};
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
      return bindings[name] || parent && parent.getBinding(name);
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
    defineType: function defineType(t) {
      var allowRedeclare = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      var self = this;
      var name = t.name.name;
      if (!allowRedeclare && typeBindings[name]) {
        reportError(t, "Type " + name + " is already defined");
      };
      var __PUCK__value__1 = void 0;
      if (t.typeParameters && t.typeParameters.length) {
        __PUCK__value__1 = (0, _range.getRange)(t.typeParameters, function (p) {
          return _core.MaybeTrait['$Maybe'].isJust.call(p.defaultValue);
        }, reportError, "type parameter");
      };
      var parameterRange = __PUCK__value__1;
      var __PUCK__value__2 = void 0;
      if (t.type_) {
        __PUCK__value__2 = t.type_;
      } else {
        var _type_ = {
          kind: name,
          name: name,
          parameterRange: parameterRange
        };
        if (t.kind == _ast2.SyntaxKind.EnumDeclaration) {
          _type_.implementations = [];
          _type_.members = {};
        } else {
          if (t.kind == _ast2.SyntaxKind.TraitDeclaration) {
            _type_.functions = {};
          } else {
            if (t.kind == _ast2.SyntaxKind.TypeDeclaration) {
              _type_.implementations = [];
              var __PUCK__value__3 = t.bound;
              if (__PUCK__value__3.kind == "Just") {
                var _PUCK__value__3$valu = _slicedToArray(__PUCK__value__3.value, 1);

                var typeBound = _PUCK__value__3$valu[0];

                if (typeBound.kind == _ast2.SyntaxKind.ObjectTypeBound) {
                  _type_.properties = _js._Object.create(_js._null);
                } else {
                  if (typeBound.kind == _ast2.SyntaxKind.TupleTypeBound) {
                    _type_.properties = [];
                  };
                };
              };
            } else {
              if (t.kind == _ast2.SyntaxKind.TypeParameter) {
                _type_.isTypeParameter = true;
                var p = any(t);
                var __PUCK__value__4 = p.defaultValue;
                if (__PUCK__value__4.kind == "Just") {
                  var _PUCK__value__4$valu = _slicedToArray(__PUCK__value__4.value, 1);

                  var defaultValue = _PUCK__value__4$valu[0];

                  _type_.defaultValue = (0, _types.getType)(self, defaultValue);
                };
              };
            };
          };
        };
        if ((0, _entities.isTypeClass)(_type_)) {
          _type_.instances = [];
          _type_.typeParameters = [];
        };
        __PUCK__value__2 = _type_;
      };
      var type_ = __PUCK__value__2;
      if (allowRedeclare && typeBindings[name]) {
        _js._Object.assign(typeBindings[name].type_, type_);
        return typeBindings[name];
      } else {
        return typeBindings[name] = {
          name: name,
          token: t,
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
