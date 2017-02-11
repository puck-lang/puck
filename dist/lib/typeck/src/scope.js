'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.createScope = createScope;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _util = require('util');

var _ast = require('./../../ast/ast');

var _span = require('./../../ast/span');

var _ast2 = require('./../../compiler/ast');

var _entities = require('./../../entities');

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
      if ($unwrapTraitObject(binding).importedFrom && !$unwrapTraitObject(binding).inherit) {
        $unwrapTraitObject(context).runCheckerOnFile($unwrapTraitObject($unwrapTraitObject(binding).importedFrom).file);
        var externalBinding = $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(binding).importedFrom)._module).scope).getBinding($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(binding).token).property).name);
        $unwrapTraitObject(binding).inherit = externalBinding;
        $unwrapTraitObject(binding).type_ = $unwrapTraitObject(externalBinding).type_;
      } else {
        if ($unwrapTraitObject(binding).inherit) {
          $unwrapTraitObject(binding).type_ = $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(binding).inherit).token).type_;
          if (!$unwrapTraitObject(binding).type_) {
            $unwrapTraitObject(context).runCheckerOnFile($unwrapTraitObject($unwrapTraitObject(binding).importedFrom).file);
            var _externalBinding = $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(binding).importedFrom)._module).scope).getBinding($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(binding).token).property).name);
            $unwrapTraitObject(binding).type_ = $unwrapTraitObject(_externalBinding).type_;
          };
        };
      };
      return binding;
    },
    getTypeBinding: function getTypeBinding(name) {
      return typeBindings[$unwrapTraitObject(name)] || parent && parent.getTypeBinding(name);
    },
    getTypePath: function getTypePath(typePath) {
      var self = this;
      var __PUCK__value__1 = typePath;
      var __PUCK__value__2 = __PUCK__value__1;
      if ($unwrapTraitObject(__PUCK__value__2).kind == "Member") {
        var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__2),
            _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
            name = _$unwrapTraitObject$v[0].name;

        var binding = $unwrapTraitObject(self).getTypeBinding(name);
        if (binding) {
          return (0, _core.Ok)(binding);
        } else {
          return (0, _core.Err)("Use of undeclared type " + name + "");
        };
      } else {
        var __PUCK__value__3 = __PUCK__value__1;
        if ($unwrapTraitObject(__PUCK__value__3).kind == "_Object") {
          var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__3),
              _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 2),
              _name = _$unwrapTraitObject2$[0].name,
              path = _$unwrapTraitObject2$[1];

          var name_ = _name;
          var path_ = path;
          var _binding = $unwrapTraitObject(self).getTypeBinding(_name);
          if (!_binding) {
            return (0, _core.Err)("Use of undeclared type " + _name + "");
          };
          var type_ = $unwrapTraitObject(_binding).type_;
          while (true) {
            var displayPath = "" + _name + "";
            var __PUCK__value__4 = path_;
            var __PUCK__value__5 = __PUCK__value__4;
            if ($unwrapTraitObject(__PUCK__value__5).kind == "Member") {
              var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__5),
                  _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
                  _name2 = _$unwrapTraitObject3$[0].name;

              name_ = _name2;
              type_ = _entities.Type.getEnum.call(type_).members[_name2];
              if (!type_) {
                return (0, _core.Err)("Use of undeclared type " + displayPath + "::" + _name2 + "");
              };
              break;
            } else {
              var __PUCK__value__6 = __PUCK__value__4;
              if ($unwrapTraitObject(__PUCK__value__6).kind == "_Object") {
                var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__6),
                    _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 2),
                    _name3 = _$unwrapTraitObject4$[0].name,
                    _path = _$unwrapTraitObject4$[1];

                name_ = _name3;
                path_ = _path;
                type_ = _entities.Type.getEnum.call(type_).members[_name3];
                if (!type_) {
                  return (0, _core.Err)("Use of undeclared type " + displayPath + "::" + _name3 + "");
                };
                displayPath = "" + displayPath + "::" + _name3 + "";
              };
            };
          };
          return (0, _core.Ok)({
            name: name_,
            type_: type_,
            token: $unwrapTraitObject(_binding).token
          });
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
