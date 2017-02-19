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
  if ($unwrapTraitObject(__PUCK__value__1).kind == "Some") {
    var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__1),
        _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
        parent = _$unwrapTraitObject$v[0];

    return $unwrapTraitObject(_js._Object).assign({}, parent.bindings, self.bindings);
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
    if (!(binding.type_ && binding.type_.completed)) {
      var __PUCK__value__2 = binding.completeType;
      if ($unwrapTraitObject(__PUCK__value__2).kind == "Some") {
        var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__2),
            _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
            completeType = _$unwrapTraitObject2$[0];

        var __PUCK__value__3 = completeType(visitor);
        if ($unwrapTraitObject(__PUCK__value__3).kind == "Some") {
          var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__3),
              _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
              type_ = _$unwrapTraitObject3$[0];

          binding.type_ = type_;
        };
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
    if (!(binding.type_ && binding.type_.completed)) {
      var __PUCK__value__4 = binding.completeType;
      if ($unwrapTraitObject(__PUCK__value__4).kind == "Some") {
        var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__4),
            _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
            completeType = _$unwrapTraitObject4$[0];

        var __PUCK__value__5 = completeType("");
        if ($unwrapTraitObject(__PUCK__value__5).kind == "Some") {
          var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__5),
              _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
              type_ = _$unwrapTraitObject5$[0];

          binding.type_ = type_;
        };
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
  var __PUCK__value__7 = __PUCK__value__6;
  var __PUCK__value__8 = void 0;
  if ($unwrapTraitObject(__PUCK__value__7).kind == "Some") {
    var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__7),
        _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
        _previous = _$unwrapTraitObject6$[0];

    var __PUCK__value__9 = void 0;
    if (_previous.allowRedeclare) {
      __PUCK__value__9 = (0, _core.Some)(_previous);
    } else {
      return (0, _core.Err)(binding.name + " is already defined");
    };
    __PUCK__value__8 = __PUCK__value__9;
  } else {
    var __PUCK__value__10 = __PUCK__value__6;
    var __PUCK__value__11 = void 0;
    if ($unwrapTraitObject(__PUCK__value__10).kind == "None") {
      var _undefined2 = $unwrapTraitObject(__PUCK__value__10);
      __PUCK__value__11 = _core.None;
    };
    __PUCK__value__8 = __PUCK__value__11;
  };
  var previous = __PUCK__value__8;
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
    var __PUCK__value__12 = binding.type_.providesType;
    if ($unwrapTraitObject(__PUCK__value__12).kind == "Some" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__12).value)[$unwrapTraitObject(0)]).id).kind == "Some") {
      var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__12),
          _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
          _$unwrapTraitObject7$2 = _slicedToArray(_$unwrapTraitObject7$[0].id.value, 1),
          id = _$unwrapTraitObject7$2[0];

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
  var __PUCK__value__13 = typePath;
  var __PUCK__value__14 = __PUCK__value__13;
  if ($unwrapTraitObject(__PUCK__value__14).kind == "Member") {
    var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__14),
        _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
        name = _$unwrapTraitObject8$[0].name;

    return _core.Option.okOr.call(Scope.getBinding.call(self, name, visitor), "Use of undeclared type " + name + "");
  } else {
    var __PUCK__value__15 = __PUCK__value__13;
    if ($unwrapTraitObject(__PUCK__value__15).kind == "_Object") {
      var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__15),
          _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 2),
          identifier = _$unwrapTraitObject9$[0],
          path = _$unwrapTraitObject9$[1];

      var token = { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true };
      var _name = identifier.name;
      var path_ = path;
      var __PUCK__value__16 = Scope.getBinding.call(self, _name, visitor);
      var __PUCK__value__17 = __PUCK__value__16;
      var __PUCK__value__18 = void 0;
      if ($unwrapTraitObject(__PUCK__value__17).kind == "Some") {
        var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__17),
            _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
            _binding = _$unwrapTraitObject11[0];

        __PUCK__value__18 = _binding;
      } else {
        var __PUCK__value__19 = __PUCK__value__16;
        var __PUCK__value__20 = void 0;
        if ($unwrapTraitObject(__PUCK__value__19).kind == "None") {
          var _undefined3 = $unwrapTraitObject(__PUCK__value__19);
          return (0, _core.Err)("Use of undeclared type " + _name + "");
        };
        __PUCK__value__18 = __PUCK__value__20;
      };
      var binding = __PUCK__value__18;
      var type_ = binding.type_;
      while (true) {
        var displayPath = "" + _name + "";
        var providesType = _core.Option.unwrapOr.call(type_.providesType, type_);
        var __PUCK__value__21 = path_;
        var __PUCK__value__22 = __PUCK__value__21;
        if ($unwrapTraitObject(__PUCK__value__22).kind == "Member") {
          var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__22),
              _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12.value, 1),
              _identifier = _$unwrapTraitObject13[0];

          token = { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: _identifier, $isTraitObject: true };
          _name = _identifier.name;
          var __PUCK__value__23 = getTypeMember(providesType, displayPath, _name);
          var __PUCK__value__24 = __PUCK__value__23;
          var __PUCK__value__25 = void 0;
          if ($unwrapTraitObject(__PUCK__value__24).kind == "Ok") {
            var _$unwrapTraitObject14 = $unwrapTraitObject(__PUCK__value__24),
                _$unwrapTraitObject15 = _slicedToArray(_$unwrapTraitObject14.value, 1),
                _type_ = _$unwrapTraitObject15[0];

            __PUCK__value__25 = _type_;
          } else {
            var __PUCK__value__26 = __PUCK__value__23;
            var __PUCK__value__27 = void 0;
            if ($unwrapTraitObject(__PUCK__value__26).kind == "Err") {
              var _$unwrapTraitObject16 = $unwrapTraitObject(__PUCK__value__26),
                  _$unwrapTraitObject17 = _slicedToArray(_$unwrapTraitObject16.value, 1),
                  err = _$unwrapTraitObject17[0];

              return (0, _core.Err)(err);
            };
            __PUCK__value__25 = __PUCK__value__27;
          };
          type_ = __PUCK__value__25;
          break;
        } else {
          var __PUCK__value__28 = __PUCK__value__21;
          if ($unwrapTraitObject(__PUCK__value__28).kind == "_Object") {
            var _$unwrapTraitObject18 = $unwrapTraitObject(__PUCK__value__28),
                _$unwrapTraitObject19 = _slicedToArray(_$unwrapTraitObject18.value, 2),
                _identifier2 = _$unwrapTraitObject19[0],
                _path = _$unwrapTraitObject19[1];

            token = { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: _identifier2, $isTraitObject: true };
            _name = _identifier2.name;
            path_ = _path;
            var __PUCK__value__29 = getTypeMember(providesType, displayPath, _name);
            var __PUCK__value__30 = __PUCK__value__29;
            var __PUCK__value__31 = void 0;
            if ($unwrapTraitObject(__PUCK__value__30).kind == "Ok") {
              var _$unwrapTraitObject20 = $unwrapTraitObject(__PUCK__value__30),
                  _$unwrapTraitObject21 = _slicedToArray(_$unwrapTraitObject20.value, 1),
                  _type_2 = _$unwrapTraitObject21[0];

              __PUCK__value__31 = _type_2;
            } else {
              var __PUCK__value__32 = __PUCK__value__29;
              var __PUCK__value__33 = void 0;
              if ($unwrapTraitObject(__PUCK__value__32).kind == "Err") {
                var _$unwrapTraitObject22 = $unwrapTraitObject(__PUCK__value__32),
                    _$unwrapTraitObject23 = _slicedToArray(_$unwrapTraitObject22.value, 1),
                    _err = _$unwrapTraitObject23[0];

                return (0, _core.Err)(_err);
              };
              __PUCK__value__31 = __PUCK__value__33;
            };
            type_ = __PUCK__value__31;
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
  var __PUCK__value__34 = type_.kind;
  var __PUCK__value__35 = __PUCK__value__34;
  if ($unwrapTraitObject(__PUCK__value__35).kind == "Enum") {
    var _$unwrapTraitObject24 = $unwrapTraitObject(__PUCK__value__35),
        _$unwrapTraitObject25 = _slicedToArray(_$unwrapTraitObject24.value, 1),
        enum_ = _$unwrapTraitObject25[0];

    var __PUCK__value__36 = _core.ObjectMap.get.call(enum_.members, member);
    var __PUCK__value__37 = __PUCK__value__36;
    if ($unwrapTraitObject(__PUCK__value__37).kind == "Some") {
      var _$unwrapTraitObject26 = $unwrapTraitObject(__PUCK__value__37),
          _$unwrapTraitObject27 = _slicedToArray(_$unwrapTraitObject26.value, 1),
          memberType = _$unwrapTraitObject27[0];

      return (0, _core.Ok)(memberType);
    } else {
      var __PUCK__value__38 = __PUCK__value__36;
      if ($unwrapTraitObject(__PUCK__value__38).kind == "None") {
        var _undefined4 = $unwrapTraitObject(__PUCK__value__38);
        return (0, _core.Err)("Use of undeclared type " + displayPath + "::" + member + "");
      };
    };
  } else {
    var __PUCK__value__39 = __PUCK__value__34;
    if ($unwrapTraitObject(__PUCK__value__39).kind == "Struct") {
      var _$unwrapTraitObject28 = $unwrapTraitObject(__PUCK__value__39),
          _$unwrapTraitObject29 = _slicedToArray(_$unwrapTraitObject28.value, 1),
          struct = _$unwrapTraitObject29[0];

      var __PUCK__value__40 = struct.kind;
      var __PUCK__value__41 = __PUCK__value__40;
      if ($unwrapTraitObject(__PUCK__value__41).kind == "Record") {
        var _$unwrapTraitObject30 = $unwrapTraitObject(__PUCK__value__41),
            _$unwrapTraitObject31 = _slicedToArray(_$unwrapTraitObject30.value, 1),
            record = _$unwrapTraitObject31[0];

        var __PUCK__value__42 = _core.ObjectMap.get.call(record.properties, member);
        var __PUCK__value__43 = __PUCK__value__42;
        if ($unwrapTraitObject(__PUCK__value__43).kind == "Some") {
          var _$unwrapTraitObject32 = $unwrapTraitObject(__PUCK__value__43),
              _$unwrapTraitObject33 = _slicedToArray(_$unwrapTraitObject32.value, 1),
              propertyType = _$unwrapTraitObject33[0];

          return (0, _core.Ok)(propertyType);
        } else {
          var __PUCK__value__44 = __PUCK__value__42;
          if ($unwrapTraitObject(__PUCK__value__44).kind == "None") {
            var _undefined5 = $unwrapTraitObject(__PUCK__value__44);
            return (0, _core.Err)("Use of undeclared type " + displayPath + "::" + member + "");
          };
        };
      } else {
        var __PUCK__value__45 = __PUCK__value__40;
        if ($unwrapTraitObject(__PUCK__value__45).kind == "Tuple") {
          var _undefined6 = $unwrapTraitObject(__PUCK__value__45);
          return (0, _core.Err)("Can not access members on a tuple type");
        } else {
          var __PUCK__value__46 = __PUCK__value__40;
          if ($unwrapTraitObject(__PUCK__value__46).kind == "Unit") {
            var _undefined7 = $unwrapTraitObject(__PUCK__value__46);
            return (0, _core.Err)("Can not access members on a unit type");
          };
        };
      };
    } else {
      var __PUCK__value__47 = __PUCK__value__34;
      if (true) {
        var __PUCK__value__48 = __PUCK__value__47;
        return (0, _core.Err)("Type paths can only access enums or records");
      };
    };
  };
}
