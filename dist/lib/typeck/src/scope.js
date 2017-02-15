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
    bindings: _core.ObjectMap._new(),
    bindingsByTypeId: _core.ObjectMap._new()
  };
};
Scope.createChild = function createChild() {
  var self = this;
  return {
    context: self.context,
    parent: (0, _core.Some)(self),
    bindings: _core.ObjectMap._new(),
    bindingsByTypeId: _core.ObjectMap._new()
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
        if (visitor == "ImplVisitor") {
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
Scope.getBindingByTypeId = function getBindingByTypeId(id) {
  var self = this;
  return _core.Option.map.call(_core.Option.orElse.call(_core.ObjectMap.get.call(self.bindingsByTypeId, id), function () {
    return _core.Option.andThen.call(self.parent, function (p) {
      return Scope.getBindingByTypeId.call(p, id);
    });
  }), function (binding) {
    var __PUCK__value__2 = binding.importedFrom;
    if ($unwrapTraitObject(__PUCK__value__2).kind == "Some") {
      var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__2),
          _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
          _module = _$unwrapTraitObject2$[0];

      if (!(binding.type_ && binding.type_.completed)) {
        self.context.runCheckerOnFile(_module.file);
        var moduleScope = _module.scope;
        var externalBinding = Scope.getBinding.call(moduleScope, $unwrapTraitObject(binding.token.value.property).name);
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
  var __PUCK__value__3 = _core.ObjectMap.get.call(self.bindings, binding.name);
  var __PUCK__value__4 = __PUCK__value__3;
  var __PUCK__value__5 = void 0;
  if ($unwrapTraitObject(__PUCK__value__4).kind == "Some") {
    var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__4),
        _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
        _previous = _$unwrapTraitObject3$[0];

    var __PUCK__value__6 = void 0;
    if (_previous.allowRedeclare) {
      __PUCK__value__6 = (0, _core.Some)(_previous);
    } else {
      return (0, _core.Err)(binding.name + " is already defined");
    };
    __PUCK__value__5 = __PUCK__value__6;
  } else {
    var __PUCK__value__7 = __PUCK__value__3;
    var __PUCK__value__8 = void 0;
    if ($unwrapTraitObject(__PUCK__value__7).kind == "None") {
      var _undefined2 = $unwrapTraitObject(__PUCK__value__7);
      __PUCK__value__8 = _core.None;
    };
    __PUCK__value__5 = __PUCK__value__8;
  };
  var previous = __PUCK__value__5;
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
  if (binding.type_) {
    var __PUCK__value__9 = binding.type_.providesType;
    if ($unwrapTraitObject(__PUCK__value__9).kind == "Some" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__9).value)[$unwrapTraitObject(0)]).id).kind == "Some") {
      var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__9),
          _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
          _$unwrapTraitObject4$2 = _slicedToArray(_$unwrapTraitObject4$[0].id.value, 1),
          id = _$unwrapTraitObject4$2[0];

      _core.ObjectMap.set.call(self.bindingsByTypeId, id, binding);
    };
  };
  return (0, _core.Ok)(binding);
};
Scope.setSelfType = function setSelfType(selfType) {
  var self = this;
  return _core.ObjectMap.set.call(self.bindings, "Self", {
    name: "Self",
    token: { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/span.puck:Span', value: _span.Span.empty(), $isTraitObject: true },
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
  var __PUCK__value__10 = typePath;
  var __PUCK__value__11 = __PUCK__value__10;
  if ($unwrapTraitObject(__PUCK__value__11).kind == "Member") {
    var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__11),
        _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
        name = _$unwrapTraitObject5$[0].name;

    return _core.Option.okOr.call(Scope.getBinding.call(self, name, visitor), "Use of undeclared type " + name + "");
  } else {
    var __PUCK__value__12 = __PUCK__value__10;
    if ($unwrapTraitObject(__PUCK__value__12).kind == "_Object") {
      var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__12),
          _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 2),
          identifier = _$unwrapTraitObject6$[0],
          path = _$unwrapTraitObject6$[1];

      var token = { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true };
      var _name = identifier.name;
      var path_ = path;
      var __PUCK__value__13 = Scope.getBinding.call(self, _name, visitor);
      var __PUCK__value__14 = __PUCK__value__13;
      var __PUCK__value__15 = void 0;
      if ($unwrapTraitObject(__PUCK__value__14).kind == "Some") {
        var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__14),
            _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
            _binding = _$unwrapTraitObject7$[0];

        __PUCK__value__15 = _binding;
      } else {
        var __PUCK__value__16 = __PUCK__value__13;
        var __PUCK__value__17 = void 0;
        if ($unwrapTraitObject(__PUCK__value__16).kind == "None") {
          var _undefined3 = $unwrapTraitObject(__PUCK__value__16);
          return (0, _core.Err)("Use of undeclared type " + _name + "");
        };
        __PUCK__value__15 = __PUCK__value__17;
      };
      var binding = __PUCK__value__15;
      var type_ = binding.type_;
      while (true) {
        var displayPath = "" + _name + "";
        var __PUCK__value__18 = path_;
        var __PUCK__value__19 = __PUCK__value__18;
        if ($unwrapTraitObject(__PUCK__value__19).kind == "Member") {
          var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__19),
              _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
              _identifier = _$unwrapTraitObject8$[0];

          token = { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: _identifier, $isTraitObject: true };
          _name = _identifier.name;
          var __PUCK__value__20 = _core.ObjectMap.get.call(_entities.Type.getEnum.call(_core.Option.unwrap.call(type_.providesType)).members, _name);
          var __PUCK__value__21 = __PUCK__value__20;
          if ($unwrapTraitObject(__PUCK__value__21).kind == "Some") {
            var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__21),
                _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
                memberType = _$unwrapTraitObject9$[0];

            type_ = memberType;
          } else {
            var __PUCK__value__22 = __PUCK__value__20;
            if ($unwrapTraitObject(__PUCK__value__22).kind == "None") {
              var _undefined4 = $unwrapTraitObject(__PUCK__value__22);
              return (0, _core.Err)("Use of undeclared type " + displayPath + "::" + _name + "");
            };
          };
          break;
        } else {
          var __PUCK__value__23 = __PUCK__value__18;
          if ($unwrapTraitObject(__PUCK__value__23).kind == "_Object") {
            var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__23),
                _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 2),
                _identifier2 = _$unwrapTraitObject11[0],
                _path = _$unwrapTraitObject11[1];

            token = { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: _identifier2, $isTraitObject: true };
            _name = _identifier2.name;
            path_ = _path;
            var __PUCK__value__24 = _core.ObjectMap.get.call(_entities.Type.getEnum.call(type_).members, _name);
            var __PUCK__value__25 = __PUCK__value__24;
            var __PUCK__value__26 = void 0;
            if ($unwrapTraitObject(__PUCK__value__25).kind == "Some") {
              var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__25),
                  _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12.value, 1),
                  _type_ = _$unwrapTraitObject13[0];

              __PUCK__value__26 = _type_;
            } else {
              var __PUCK__value__27 = __PUCK__value__24;
              var __PUCK__value__28 = void 0;
              if ($unwrapTraitObject(__PUCK__value__27).kind == "None") {
                var _undefined5 = $unwrapTraitObject(__PUCK__value__27);
                return (0, _core.Err)("Use of undeclared type " + displayPath + "::" + _name + "");
              };
              __PUCK__value__26 = __PUCK__value__28;
            };
            type_ = __PUCK__value__26;
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
