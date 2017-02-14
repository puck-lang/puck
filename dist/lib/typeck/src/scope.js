'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scope = exports.Binding = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
var Binding = exports.Binding = function Binding(object) {
  return object;
};
var Scope = exports.Scope = function Scope(object) {
  return object;
};
Scope._new = function _new(context) {
  return {
    context: context,
    parent: _core.None,
    bindings: _core.ObjectMap._new()
  };
};
Scope.createChild = function createChild() {
  var self = this;
  return {
    context: self.context,
    parent: (0, _core.Some)(self),
    bindings: _core.ObjectMap._new()
  };
};
Scope.getBinding = function getBinding(name) {
  var visitor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

  var self = this;
  return _core.Option.map.call(_core.Option.orElse.call(_core.ObjectMap.get.call(self.bindings, name), function () {
    return _core.Option.andThen.call(self.parent, function (p) {
      return Scope.getBinding.call(p, name, visitor);
    });
  }), function (binding) {
    var __PUCK__value__1 = binding.importedFrom;
    if ($unwrapTraitObject(__PUCK__value__1).kind == "Some") {
      var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__1),
          _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
          _module = _$unwrapTraitObject$v[0];

      if (!(binding.type_ && binding.type_.completed) && visitor != "TypeVisitor") {
        if (visitor == "TypeVisitor") {
          self.context.runTypeVisitorOnFile(_module.file);
        } else {
          self.context.runCheckerOnFile(_module.file);
        };
        var moduleScope = _module.scope;
        var externalBinding = Scope.getBinding.call(moduleScope, $unwrapTraitObject(binding.token.value.property).name, visitor);
        binding.type_ = _core.Option.unwrap.call(externalBinding).type_;
      };
    };
    return binding;
  });
};
Scope.define = function define(binding) {
  var self = this;
  if (binding.name == "Self") {
    return (0, _core.Err)("Self is a reserved name");
  };
  var __PUCK__value__2 = _core.ObjectMap.get.call(self.bindings, binding.name);
  var __PUCK__value__3 = __PUCK__value__2;
  var __PUCK__value__4 = void 0;
  if ($unwrapTraitObject(__PUCK__value__3).kind == "Some") {
    var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__3),
        _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
        _previous = _$unwrapTraitObject2$[0];

    var __PUCK__value__5 = void 0;
    if (_previous.allowRedeclare) {
      __PUCK__value__5 = (0, _core.Some)(_previous);
    } else {
      return (0, _core.Err)(binding.name + " is already defined");
    };
    __PUCK__value__4 = __PUCK__value__5;
  } else {
    var __PUCK__value__6 = __PUCK__value__2;
    var __PUCK__value__7 = void 0;
    if ($unwrapTraitObject(__PUCK__value__6).kind == "None") {
      var _undefined2 = $unwrapTraitObject(__PUCK__value__6);
      __PUCK__value__7 = _core.None;
    };
    __PUCK__value__4 = __PUCK__value__7;
  };
  var previous = __PUCK__value__4;
  binding = {
    name: binding.name,
    token: binding.token,
    mutable: binding.mutable,
    allowRedeclare: binding.allowRedeclare,
    type_: binding.type_,
    importedFrom: binding.importedFrom,
    previous: previous
  };
  _core.ObjectMap.set.call(self.bindings, binding.name, binding);
  return (0, _core.Ok)(binding);
};
Scope.setSelfType = function setSelfType(selfType) {
  var self = this;
  return _core.ObjectMap.set.call(self.bindings, "Self", {
    name: "Self",
    token: { type: '$Span', value: _span.Span.empty(), $isTraitObject: true },
    mutable: false,
    allowRedeclare: false,
    type_: _entities.Type.provides(selfType),
    previous: _core.None,
    importedFrom: _core.None
  });
};
Scope.getTypePath = function getTypePath(typePath) {
  var visitor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

  var self = this;
  var __PUCK__value__8 = typePath;
  var __PUCK__value__9 = __PUCK__value__8;
  if ($unwrapTraitObject(__PUCK__value__9).kind == "Member") {
    var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__9),
        _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
        name = _$unwrapTraitObject3$[0].name;

    return _core.Option.okOr.call(Scope.getBinding.call(self, name, visitor), "Use of undeclared type " + name + "");
  } else {
    var __PUCK__value__10 = __PUCK__value__8;
    if ($unwrapTraitObject(__PUCK__value__10).kind == "_Object") {
      var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__10),
          _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 2),
          identifier = _$unwrapTraitObject4$[0],
          path = _$unwrapTraitObject4$[1];

      var token = { type: '$Identifier', value: identifier, $isTraitObject: true };
      var _name = identifier.name;
      var path_ = path;
      var __PUCK__value__11 = Scope.getBinding.call(self, _name, visitor);
      var __PUCK__value__12 = __PUCK__value__11;
      var __PUCK__value__13 = void 0;
      if ($unwrapTraitObject(__PUCK__value__12).kind == "Some") {
        var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__12),
            _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
            _binding = _$unwrapTraitObject5$[0];

        __PUCK__value__13 = _binding;
      } else {
        var __PUCK__value__14 = __PUCK__value__11;
        var __PUCK__value__15 = void 0;
        if ($unwrapTraitObject(__PUCK__value__14).kind == "None") {
          var _undefined3 = $unwrapTraitObject(__PUCK__value__14);
          return (0, _core.Err)("Use of undeclared type " + _name + "");
        };
        __PUCK__value__13 = __PUCK__value__15;
      };
      var binding = __PUCK__value__13;
      var type_ = binding.type_;
      while (true) {
        var displayPath = "" + _name + "";
        var __PUCK__value__16 = path_;
        var __PUCK__value__17 = __PUCK__value__16;
        if ($unwrapTraitObject(__PUCK__value__17).kind == "Member") {
          var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__17),
              _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
              _identifier = _$unwrapTraitObject6$[0];

          token = { type: '$Identifier', value: _identifier, $isTraitObject: true };
          _name = _identifier.name;
          var __PUCK__value__18 = _core.ObjectMap.get.call(_entities.Type.getEnum.call(_core.Option.unwrap.call(type_.providesType)).members, _name);
          var __PUCK__value__19 = __PUCK__value__18;
          if ($unwrapTraitObject(__PUCK__value__19).kind == "Some") {
            var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__19),
                _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
                memberType = _$unwrapTraitObject7$[0];

            type_ = memberType;
          } else {
            var __PUCK__value__20 = __PUCK__value__18;
            if ($unwrapTraitObject(__PUCK__value__20).kind == "None") {
              var _undefined4 = $unwrapTraitObject(__PUCK__value__20);
              return (0, _core.Err)("Use of undeclared type " + displayPath + "::" + _name + "");
            };
          };
          break;
        } else {
          var __PUCK__value__21 = __PUCK__value__16;
          if ($unwrapTraitObject(__PUCK__value__21).kind == "_Object") {
            var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__21),
                _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 2),
                _identifier2 = _$unwrapTraitObject8$[0],
                _path = _$unwrapTraitObject8$[1];

            token = { type: '$Identifier', value: _identifier2, $isTraitObject: true };
            _name = _identifier2.name;
            path_ = _path;
            var __PUCK__value__22 = _core.ObjectMap.get.call(_entities.Type.getEnum.call(type_).members, _name);
            var __PUCK__value__23 = __PUCK__value__22;
            var __PUCK__value__24 = void 0;
            if ($unwrapTraitObject(__PUCK__value__23).kind == "Some") {
              var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__23),
                  _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
                  _type_ = _$unwrapTraitObject9$[0];

              __PUCK__value__24 = _type_;
            } else {
              var __PUCK__value__25 = __PUCK__value__22;
              var __PUCK__value__26 = void 0;
              if ($unwrapTraitObject(__PUCK__value__25).kind == "None") {
                var _undefined5 = $unwrapTraitObject(__PUCK__value__25);
                return (0, _core.Err)("Use of undeclared type " + displayPath + "::" + _name + "");
              };
              __PUCK__value__24 = __PUCK__value__26;
            };
            type_ = __PUCK__value__24;
            displayPath = "" + displayPath + "::" + _name + "";
          };
        };
      };
      return (0, _core.Ok)(Binding({
        name: _name,
        token: token,
        mutable: binding.mutable,
        allowRedeclare: binding.allowRedeclare,
        type_: type_,
        previous: binding.previous,
        importedFrom: binding.importedFrom
      }));
    };
  };
};
