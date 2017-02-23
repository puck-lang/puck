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
Scope.getBindings = function getBindings() {
  var self = this;
  var __PUCK__value__1 = self.parent;
  if (__PUCK__value__1.kind == "Some") {
    var _PUCK__value__1$valu = _slicedToArray(__PUCK__value__1.value, 1),
        parent = _PUCK__value__1$valu[0];

    return _js._Object.assign({}, Scope.getBindings.call(parent), self.bindings);
  } else {
    return self.bindings;
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
    var __PUCK__value__2 = binding.completeType;
    if (__PUCK__value__2.kind == "Some") {
      var _PUCK__value__2$valu = _slicedToArray(__PUCK__value__2.value, 1),
          completeType = _PUCK__value__2$valu[0];

      var __PUCK__value__3 = completeType(visitor);
      if (__PUCK__value__3.kind == "Some") {
        var _PUCK__value__3$valu = _slicedToArray(__PUCK__value__3.value, 1),
            type_ = _PUCK__value__3$valu[0];

        binding.type_ = type_;
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
    var __PUCK__value__4 = binding.completeType;
    if (__PUCK__value__4.kind == "Some") {
      var _PUCK__value__4$valu = _slicedToArray(__PUCK__value__4.value, 1),
          completeType = _PUCK__value__4$valu[0];

      var __PUCK__value__5 = completeType("");
      if (__PUCK__value__5.kind == "Some") {
        var _PUCK__value__5$valu = _slicedToArray(__PUCK__value__5.value, 1),
            type_ = _PUCK__value__5$valu[0];

        binding.type_ = type_;
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
  var __PUCK__value__6 = _core.ObjectMap.get.call(self.bindings, binding.name);
  var __PUCK__value__7 = void 0;
  if ($unwrapTraitObject(__PUCK__value__6).kind == "Some") {
    var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__6),
        _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
        _previous = _$unwrapTraitObject$v[0];

    var __PUCK__value__8 = void 0;
    if (_previous.allowRedeclare) {
      __PUCK__value__8 = (0, _core.Some)(_previous);
    } else {
      return (0, _core.Err)(binding.name + " is already defined");
    };
    __PUCK__value__7 = __PUCK__value__8;
  } else {
    var __PUCK__value__9 = void 0;
    if ($unwrapTraitObject(__PUCK__value__6).kind == "None") {
      var _undefined2 = $unwrapTraitObject(__PUCK__value__6);
      __PUCK__value__9 = _core.None;
    };
    __PUCK__value__7 = __PUCK__value__9;
  };
  var previous = __PUCK__value__7;
  binding = {
    name: binding.name,
    token: binding.token,
    mutable: binding.mutable,
    allowRedeclare: binding.allowRedeclare,
    type_: binding.type_,
    completeType: binding.completeType,
    previous: previous
  };
  _core.ObjectMap.set.call(self.bindings, binding.name, binding);
  if (binding.type_) {
    var __PUCK__value__10 = binding.type_.providesType;
    if (__PUCK__value__10.kind == "Some" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__10.value)[0]).id).kind == "Some") {
      var _PUCK__value__10$val = _slicedToArray(__PUCK__value__10.value, 1),
          _PUCK__value__10$val$ = _slicedToArray(_PUCK__value__10$val[0].id.value, 1),
          id = _PUCK__value__10$val$[0];

      _core.ObjectMap.set.call(self.bindingsByTypeId, id, binding);
    };
  };
  return (0, _core.Ok)(binding);
};
Scope.setSelfType = function setSelfType(selfType) {
  var self = this;
  _core.ObjectMap.set.call(self.bindings, "Self", {
    name: "Self",
    token: { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/span.puck:Span', value: _span.Span.empty(), $isTraitObject: true },
    mutable: false,
    allowRedeclare: false,
    type_: _entities.Type.provides(selfType),
    previous: _core.None,
    completeType: _core.None
  });
};
Scope.getTypePath = function getTypePath(typePath) {
  var visitor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

  var self = this;
  var __PUCK__value__11 = typePath;
  if ($unwrapTraitObject(__PUCK__value__11).kind == "Member") {
    var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__11),
        _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
        name = _$unwrapTraitObject2$[0].name;

    return _core.Option.okOr.call(Scope.getBinding.call(self, name, visitor), "Use of undeclared type " + name + "");
  } else {
    if ($unwrapTraitObject(__PUCK__value__11).kind == "_Object") {
      var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__11),
          _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 2),
          identifier = _$unwrapTraitObject3$[0],
          path = _$unwrapTraitObject3$[1];

      var token = { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true };
      var _name = identifier.name;
      var path_ = path;
      var __PUCK__value__12 = Scope.getBinding.call(self, _name, visitor);
      var __PUCK__value__13 = void 0;
      if ($unwrapTraitObject(__PUCK__value__12).kind == "Some") {
        var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__12),
            _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
            _binding = _$unwrapTraitObject4$[0];

        __PUCK__value__13 = _binding;
      } else {
        var __PUCK__value__14 = void 0;
        if ($unwrapTraitObject(__PUCK__value__12).kind == "None") {
          var _undefined3 = $unwrapTraitObject(__PUCK__value__12);
          return (0, _core.Err)("Use of undeclared type " + _name + "");
        };
        __PUCK__value__13 = __PUCK__value__14;
      };
      var binding = __PUCK__value__13;
      var type_ = binding.type_;
      while (true) {
        var displayPath = "" + _name + "";
        var providesType = _core.Option.unwrapOr.call(type_.providesType, type_);
        var __PUCK__value__15 = path_;
        if ($unwrapTraitObject(__PUCK__value__15).kind == "Member") {
          var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__15),
              _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
              _identifier = _$unwrapTraitObject5$[0];

          token = { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: _identifier, $isTraitObject: true };
          _name = _identifier.name;
          var __PUCK__value__16 = getTypeMember(providesType, displayPath, _name);
          var __PUCK__value__17 = void 0;
          if ($unwrapTraitObject(__PUCK__value__16).kind == "Ok") {
            var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__16),
                _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
                _type_ = _$unwrapTraitObject6$[0];

            __PUCK__value__17 = _type_;
          } else {
            var __PUCK__value__18 = void 0;
            if ($unwrapTraitObject(__PUCK__value__16).kind == "Err") {
              var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__16),
                  _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
                  err = _$unwrapTraitObject7$[0];

              return (0, _core.Err)(err);
            };
            __PUCK__value__17 = __PUCK__value__18;
          };
          type_ = __PUCK__value__17;
          break;
        } else {
          if ($unwrapTraitObject(__PUCK__value__15).kind == "_Object") {
            var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__15),
                _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 2),
                _identifier2 = _$unwrapTraitObject8$[0],
                _path = _$unwrapTraitObject8$[1];

            token = { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: _identifier2, $isTraitObject: true };
            _name = _identifier2.name;
            path_ = _path;
            var __PUCK__value__19 = getTypeMember(providesType, displayPath, _name);
            var __PUCK__value__20 = void 0;
            if ($unwrapTraitObject(__PUCK__value__19).kind == "Ok") {
              var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__19),
                  _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
                  _type_2 = _$unwrapTraitObject9$[0];

              __PUCK__value__20 = _type_2;
            } else {
              var __PUCK__value__21 = void 0;
              if ($unwrapTraitObject(__PUCK__value__19).kind == "Err") {
                var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__19),
                    _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
                    _err = _$unwrapTraitObject11[0];

                return (0, _core.Err)(_err);
              };
              __PUCK__value__20 = __PUCK__value__21;
            };
            type_ = __PUCK__value__20;
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
        completeType: binding.completeType
      }));
    };
  };
};
function getTypeMember(type_, displayPath, member) {
  var __PUCK__value__22 = type_.kind;
  if ($unwrapTraitObject(__PUCK__value__22).kind == "Enum") {
    var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__22),
        _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12.value, 1),
        enum_ = _$unwrapTraitObject13[0];

    var __PUCK__value__23 = _core.ObjectMap.get.call(enum_.members, member);
    if ($unwrapTraitObject(__PUCK__value__23).kind == "Some") {
      var _$unwrapTraitObject14 = $unwrapTraitObject(__PUCK__value__23),
          _$unwrapTraitObject15 = _slicedToArray(_$unwrapTraitObject14.value, 1),
          memberType = _$unwrapTraitObject15[0];

      return (0, _core.Ok)(memberType);
    } else {
      if ($unwrapTraitObject(__PUCK__value__23).kind == "None") {
        var _undefined4 = $unwrapTraitObject(__PUCK__value__23);
        return (0, _core.Err)("Use of undeclared type " + displayPath + "::" + member + "");
      };
    };
  } else {
    if ($unwrapTraitObject(__PUCK__value__22).kind == "Struct") {
      var _$unwrapTraitObject16 = $unwrapTraitObject(__PUCK__value__22),
          _$unwrapTraitObject17 = _slicedToArray(_$unwrapTraitObject16.value, 1),
          struct = _$unwrapTraitObject17[0];

      var __PUCK__value__24 = struct.kind;
      if ($unwrapTraitObject(__PUCK__value__24).kind == "Record") {
        var _$unwrapTraitObject18 = $unwrapTraitObject(__PUCK__value__24),
            _$unwrapTraitObject19 = _slicedToArray(_$unwrapTraitObject18.value, 1),
            record = _$unwrapTraitObject19[0];

        var __PUCK__value__25 = _core.ObjectMap.get.call(record.properties, member);
        if ($unwrapTraitObject(__PUCK__value__25).kind == "Some") {
          var _$unwrapTraitObject20 = $unwrapTraitObject(__PUCK__value__25),
              _$unwrapTraitObject21 = _slicedToArray(_$unwrapTraitObject20.value, 1),
              propertyType = _$unwrapTraitObject21[0];

          return (0, _core.Ok)(propertyType);
        } else {
          if ($unwrapTraitObject(__PUCK__value__25).kind == "None") {
            var _undefined5 = $unwrapTraitObject(__PUCK__value__25);
            return (0, _core.Err)("Use of undeclared type " + displayPath + "::" + member + "");
          };
        };
      } else {
        if ($unwrapTraitObject(__PUCK__value__24).kind == "Tuple") {
          var _undefined6 = $unwrapTraitObject(__PUCK__value__24);
          return (0, _core.Err)("Can not access members on a tuple type");
        } else {
          if ($unwrapTraitObject(__PUCK__value__24).kind == "Unit") {
            var _undefined7 = $unwrapTraitObject(__PUCK__value__24);
            return (0, _core.Err)("Can not access members on a unit type");
          };
        };
      };
    } else {
      if (true) {
        var __PUCK__value__26 = __PUCK__value__22;
        return (0, _core.Err)("Type paths can only access enums or records");
      };
    };
  };
}
