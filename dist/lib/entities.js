'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StructKind = exports.TypeKind = exports.TypeParameter = exports.TypeInstance = exports.TypeClass = exports.Implementation = exports.Tuple = exports.Record = exports.Trait = exports.Struct = exports.Function = exports.Enum = exports.Type = exports.File = exports.UnparsedFile = exports.BuildFile = undefined;

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (_js.Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _ast = require('./ast/ast');

var _span = require('./ast/span');

var _range = require('./typeck/src/range');

var _scope = require('./typeck/src/scope');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};
var BuildFile = exports.BuildFile = function BuildFile(object) {
  return object;
};
var UnparsedFile = exports.UnparsedFile = function UnparsedFile(object) {
  return object;
};
var File = exports.File = function File(object) {
  return object;
};
var Type = exports.Type = function Type(object) {
  return object;
};
var Enum = exports.Enum = function Enum(object) {
  return object;
};
var Function = exports.Function = function Function(object) {
  return object;
};
var Struct = exports.Struct = function Struct(object) {
  return object;
};
var Trait = exports.Trait = function Trait(object) {
  return object;
};
var Record = exports.Record = function Record(object) {
  return object;
};
var Tuple = exports.Tuple = function Tuple(object) {
  return object;
};
var Implementation = exports.Implementation = function Implementation(object) {
  return object;
};
var TypeClass = exports.TypeClass = function TypeClass(object) {
  return object;
};
var TypeInstance = exports.TypeInstance = function TypeInstance(object) {
  return object;
};
var TypeParameter = exports.TypeParameter = function TypeParameter(object) {
  return object;
};
var TypeKind = exports.TypeKind = {
  Enum: function Enum() {
    for (var _len = arguments.length, members = (0, _js.Array)(_len), _key = 0; _key < _len; _key++) {
      members[_key] = arguments[_key];
    }

    return { kind: 'Enum', value: members };
  },
  Function: function Function() {
    for (var _len2 = arguments.length, members = (0, _js.Array)(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      members[_key2] = arguments[_key2];
    }

    return { kind: 'Function', value: members };
  },
  Parameter: function Parameter() {
    for (var _len3 = arguments.length, members = (0, _js.Array)(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      members[_key3] = arguments[_key3];
    }

    return { kind: 'Parameter', value: members };
  },
  Struct: function Struct() {
    for (var _len4 = arguments.length, members = (0, _js.Array)(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      members[_key4] = arguments[_key4];
    }

    return { kind: 'Struct', value: members };
  },
  Trait: function Trait() {
    for (var _len5 = arguments.length, members = (0, _js.Array)(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      members[_key5] = arguments[_key5];
    }

    return { kind: 'Trait', value: members };
  }
};
var StructKind = exports.StructKind = {
  Record: function Record() {
    for (var _len6 = arguments.length, members = (0, _js.Array)(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      members[_key6] = arguments[_key6];
    }

    return { kind: 'Record', value: members };
  },
  Tuple: function Tuple() {
    for (var _len7 = arguments.length, members = (0, _js.Array)(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      members[_key7] = arguments[_key7];
    }

    return { kind: 'Tuple', value: members };
  },
  Unit: { kind: 'Unit', value: Symbol('Unit') }
};
Type.empty = function empty() {
  return {
    id: _core.None,
    displayName: (0, _core.Some)("()"),
    name: _core.None,
    kind: TypeKind.Struct({
      implementations: [],
      kind: StructKind.Tuple({ properties: [] })
    }),
    _class: _core.None,
    instance: _core.None,
    providesType: _core.None,
    enumMember: _core.None,
    complete: true
  };
};
Type.provides = function provides(type_) {
  return {
    id: _core.None,
    displayName: type_.displayName,
    name: type_.name,
    kind: TypeKind.Struct({
      implementations: [],
      kind: StructKind.Tuple({ properties: [] })
    }),
    _class: type_._class,
    instance: type_.instance,
    providesType: (0, _core.Some)(type_),
    enumMember: _core.None,
    complete: true
  };
};
Type.unused = function unused() {
  return {
    id: _core.None,
    displayName: (0, _core.Some)("_"),
    name: _core.None,
    kind: TypeKind.Parameter({ defaultValue: _core.None }),
    _class: _core.None,
    instance: _core.None,
    providesType: _core.None,
    enumMember: _core.None,
    complete: true
  };
};
Type.displayName = function displayName() {
  var self = this;
  if (!self) {
    return "??";
  };
  var __PUCK__value__1 = self.displayName;
  if ($unwrapTraitObject(__PUCK__value__1).kind == "Some") {
    var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__1),
        _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
        name = _$unwrapTraitObject$v[0];

    return name;
  };
  var __PUCK__value__2 = self.kind;
  var __PUCK__value__3 = __PUCK__value__2;
  if ($unwrapTraitObject(__PUCK__value__3).kind == "Enum") {
    var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__3),
        _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
        enum_ = _$unwrapTraitObject2$[0];

    return getGenericName(_core.Option.unwrap.call(self.name), self);
  } else {
    var __PUCK__value__4 = __PUCK__value__2;
    if ($unwrapTraitObject(__PUCK__value__4).kind == "Function") {
      var _ret = function () {
        var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__4),
            _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
            _function = _$unwrapTraitObject3$[0];

        return {
          v: _core.Option.unwrapOrElse.call(self.name, function () {
            return getFunctionTypeName(_function);
          })
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof2(_ret)) === "object") return _ret.v;
    } else {
      var __PUCK__value__5 = __PUCK__value__2;
      if ($unwrapTraitObject(__PUCK__value__5).kind == "Parameter") {
        var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__5),
            _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
            __PUCK__value__6 = _$unwrapTraitObject4$[0];

        return _core.Option.unwrap.call(self.name);
      } else {
        var __PUCK__value__7 = __PUCK__value__2;
        if ($unwrapTraitObject(__PUCK__value__7).kind == "Struct") {
          var _ret2 = function () {
            var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__7),
                _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
                struct = _$unwrapTraitObject5$[0];

            return {
              v: _core.Option.mapOrElse.call(self.name, function () {
                var __PUCK__value__8 = struct.kind;
                var __PUCK__value__9 = __PUCK__value__8;
                if ($unwrapTraitObject(__PUCK__value__9).kind == "Record") {
                  var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__9),
                      _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
                      properties = _$unwrapTraitObject6$[0].properties;

                  return getRecordTypeName(properties);
                } else {
                  var __PUCK__value__10 = __PUCK__value__8;
                  if ($unwrapTraitObject(__PUCK__value__10).kind == "Tuple") {
                    var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__10),
                        _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
                        _properties = _$unwrapTraitObject7$[0].properties;

                    return getTupleTypeName({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _properties, $isTraitObject: true });
                  } else {
                    var __PUCK__value__11 = __PUCK__value__8;
                    if ($unwrapTraitObject(__PUCK__value__11).kind == "Unit") {
                      var _undefined = $unwrapTraitObject(__PUCK__value__11);
                      return _core.Option.unwrap.call(self.name);
                    };
                  };
                };
              }, function (name) {
                return getGenericName(name, self);
              })
            };
          }();

          if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof2(_ret2)) === "object") return _ret2.v;
        } else {
          var __PUCK__value__12 = __PUCK__value__2;
          if ($unwrapTraitObject(__PUCK__value__12).kind == "Trait") {
            var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__12),
                _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
                __PUCK__value__13 = _$unwrapTraitObject8$[0];

            return getGenericName(_core.Option.unwrap.call(self.name), self, true);
          };
        };
      };
    };
  };
};
Type.verboseName = function verboseName() {
  var self = this;
  if (!self) {
    return "??";
  };
  var __PUCK__value__14 = self.kind;
  var __PUCK__value__15 = __PUCK__value__14;
  if ($unwrapTraitObject(__PUCK__value__15).kind == "Enum") {
    var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__15),
        _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
        enum_ = _$unwrapTraitObject9$[0];

    return getGenericName(_core.Option.unwrap.call(self.name), self, true);
  } else {
    var __PUCK__value__16 = __PUCK__value__14;
    if ($unwrapTraitObject(__PUCK__value__16).kind == "Function") {
      var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__16),
          _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
          _function = _$unwrapTraitObject11[0];

      return getGenericName(getFunctionTypeName(_function), self, true);
    } else {
      var __PUCK__value__17 = __PUCK__value__14;
      if ($unwrapTraitObject(__PUCK__value__17).kind == "Parameter") {
        var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__17),
            _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12.value, 1),
            __PUCK__value__18 = _$unwrapTraitObject13[0];

        return _core.Option.unwrap.call(self.name);
      } else {
        var __PUCK__value__19 = __PUCK__value__14;
        if ($unwrapTraitObject(__PUCK__value__19).kind == "Struct") {
          var _$unwrapTraitObject14 = $unwrapTraitObject(__PUCK__value__19),
              _$unwrapTraitObject15 = _slicedToArray(_$unwrapTraitObject14.value, 1),
              struct = _$unwrapTraitObject15[0];

          var __PUCK__value__20 = struct.kind;
          var __PUCK__value__21 = __PUCK__value__20;
          if ($unwrapTraitObject(__PUCK__value__21).kind == "Record") {
            var _$unwrapTraitObject16 = $unwrapTraitObject(__PUCK__value__21),
                _$unwrapTraitObject17 = _slicedToArray(_$unwrapTraitObject16.value, 1),
                properties = _$unwrapTraitObject17[0].properties;

            return getRecordTypeName(properties);
          } else {
            var __PUCK__value__22 = __PUCK__value__20;
            if ($unwrapTraitObject(__PUCK__value__22).kind == "Tuple") {
              var _$unwrapTraitObject18 = $unwrapTraitObject(__PUCK__value__22),
                  _$unwrapTraitObject19 = _slicedToArray(_$unwrapTraitObject18.value, 1),
                  _properties2 = _$unwrapTraitObject19[0].properties;

              return getTupleTypeName({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _properties2, $isTraitObject: true });
            } else {
              var __PUCK__value__23 = __PUCK__value__20;
              if ($unwrapTraitObject(__PUCK__value__23).kind == "Unit") {
                var _undefined2 = $unwrapTraitObject(__PUCK__value__23);
                return _core.Option.unwrap.call(self.name);
              };
            };
          };
        } else {
          var __PUCK__value__24 = __PUCK__value__14;
          if ($unwrapTraitObject(__PUCK__value__24).kind == "Trait") {
            var _$unwrapTraitObject20 = $unwrapTraitObject(__PUCK__value__24),
                _$unwrapTraitObject21 = _slicedToArray(_$unwrapTraitObject20.value, 1),
                __PUCK__value__25 = _$unwrapTraitObject21[0];

            return getGenericName(_core.Option.unwrap.call(self.name), self, true);
          };
        };
      };
    };
  };
};
Type.getEnum = function getEnum() {
  var self = this;
  var __PUCK__value__26 = self.kind;
  var __PUCK__value__27 = __PUCK__value__26;
  if ($unwrapTraitObject(__PUCK__value__27).kind == "Enum") {
    var _$unwrapTraitObject22 = $unwrapTraitObject(__PUCK__value__27),
        _$unwrapTraitObject23 = _slicedToArray(_$unwrapTraitObject22.value, 1),
        enum_ = _$unwrapTraitObject23[0];

    return enum_;
  } else {
    var __PUCK__value__28 = __PUCK__value__26;
    if (true) {
      var __PUCK__value__29 = __PUCK__value__28;
      var name = Type.displayName.call(self);
      throw (0, _js.Error)("Type " + name + " is not an enum");
    };
  };
};
Type.getFunction = function getFunction() {
  var self = this;
  var __PUCK__value__30 = self.kind;
  var __PUCK__value__31 = __PUCK__value__30;
  if ($unwrapTraitObject(__PUCK__value__31).kind == "Function") {
    var _$unwrapTraitObject24 = $unwrapTraitObject(__PUCK__value__31),
        _$unwrapTraitObject25 = _slicedToArray(_$unwrapTraitObject24.value, 1),
        _function = _$unwrapTraitObject25[0];

    return _function;
  } else {
    var __PUCK__value__32 = __PUCK__value__30;
    if (true) {
      var __PUCK__value__33 = __PUCK__value__32;
      var name = Type.displayName.call(self);
      throw (0, _js.Error)("Type " + name + " is not a function");
    };
  };
};
Type.getTrait = function getTrait() {
  var self = this;
  var __PUCK__value__34 = self.kind;
  var __PUCK__value__35 = __PUCK__value__34;
  if ($unwrapTraitObject(__PUCK__value__35).kind == "Trait") {
    var _$unwrapTraitObject26 = $unwrapTraitObject(__PUCK__value__35),
        _$unwrapTraitObject27 = _slicedToArray(_$unwrapTraitObject26.value, 1),
        trait_ = _$unwrapTraitObject27[0];

    return trait_;
  } else {
    var __PUCK__value__36 = __PUCK__value__34;
    if (true) {
      var __PUCK__value__37 = __PUCK__value__36;
      var name = Type.displayName.call(self);
      throw (0, _js.Error)("Type " + name + " is not a trait");
    };
  };
};
Type.isEmpty = function isEmpty() {
  var self = this;
  var __PUCK__value__38 = self.kind;
  var __PUCK__value__39 = __PUCK__value__38;
  if ($unwrapTraitObject(__PUCK__value__39).kind == "Struct") {
    var _$unwrapTraitObject28 = $unwrapTraitObject(__PUCK__value__39),
        _$unwrapTraitObject29 = _slicedToArray(_$unwrapTraitObject28.value, 1),
        struct = _$unwrapTraitObject29[0];

    var __PUCK__value__40 = struct.kind;
    var __PUCK__value__41 = __PUCK__value__40;
    if ($unwrapTraitObject(__PUCK__value__41).kind == "Tuple") {
      var _$unwrapTraitObject30 = $unwrapTraitObject(__PUCK__value__41),
          _$unwrapTraitObject31 = _slicedToArray(_$unwrapTraitObject30.value, 1),
          tuple = _$unwrapTraitObject31[0];

      return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isEmpty.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true });
    } else {
      var __PUCK__value__42 = __PUCK__value__40;
      if (true) {
        var __PUCK__value__43 = __PUCK__value__42;
        return false;
      };
    };
  } else {
    var __PUCK__value__44 = __PUCK__value__38;
    if (true) {
      var __PUCK__value__45 = __PUCK__value__44;
      return false;
    };
  };
};
Type.isEnum = function isEnum() {
  var self = this;
  var __PUCK__value__46 = self.kind;
  var __PUCK__value__47 = __PUCK__value__46;
  if ($unwrapTraitObject(__PUCK__value__47).kind == "Enum") {
    var _$unwrapTraitObject32 = $unwrapTraitObject(__PUCK__value__47),
        _$unwrapTraitObject33 = _slicedToArray(_$unwrapTraitObject32.value, 1),
        __PUCK__value__48 = _$unwrapTraitObject33[0];

    return true;
  } else {
    var __PUCK__value__49 = __PUCK__value__46;
    if (true) {
      var __PUCK__value__50 = __PUCK__value__49;
      return false;
    };
  };
};
Type.isFunction = function isFunction() {
  var self = this;
  var __PUCK__value__51 = self.kind;
  var __PUCK__value__52 = __PUCK__value__51;
  if ($unwrapTraitObject(__PUCK__value__52).kind == "Function") {
    var _$unwrapTraitObject34 = $unwrapTraitObject(__PUCK__value__52),
        _$unwrapTraitObject35 = _slicedToArray(_$unwrapTraitObject34.value, 1),
        __PUCK__value__53 = _$unwrapTraitObject35[0];

    return true;
  } else {
    var __PUCK__value__54 = __PUCK__value__51;
    if (true) {
      var __PUCK__value__55 = __PUCK__value__54;
      return false;
    };
  };
};
Type.isParameter = function isParameter() {
  var self = this;
  var __PUCK__value__56 = self.kind;
  var __PUCK__value__57 = __PUCK__value__56;
  if ($unwrapTraitObject(__PUCK__value__57).kind == "Parameter") {
    var _$unwrapTraitObject36 = $unwrapTraitObject(__PUCK__value__57),
        _$unwrapTraitObject37 = _slicedToArray(_$unwrapTraitObject36.value, 1),
        __PUCK__value__58 = _$unwrapTraitObject37[0];

    return true;
  } else {
    var __PUCK__value__59 = __PUCK__value__56;
    if (true) {
      var __PUCK__value__60 = __PUCK__value__59;
      return false;
    };
  };
};
Type.typeParameters = function typeParameters() {
  var self = this;
  return _core.Option.orValue.call(_core.Option.map.call(self.instance, function (i) {
    return i.typeParameters;
  }), _core.Option.map.call(self._class, function (i) {
    return i.typeParameters;
  }));
};
TypeClass.fromAstNode = function fromAstNode(astNode, reportError) {
  if (astNode.typeParameters && astNode.typeParameters.length) {
    var parameterRange = (0, _range.getRange)(astNode.typeParameters, function (p) {
      return _core.Option.isSome.call(p.defaultValue);
    }, reportError, "type parameter");
    return (0, _core.Some)({
      parameterRange: parameterRange,
      typeParameters: [],
      typeParameterBindings: astNode.typeParameters,
      instances: []
    });
  } else {
    return _core.None;
  };
};
function getFunctionTypeName(_function) {
  return getTupleTypeName(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _function.parameters, $isTraitObject: true }, function (a) {
    return a.type_;
  })) + " -> " + (_function.returnType && Type.displayName.call(_function.returnType));
};
function getTupleTypeName(properties) {
  return "(" + _core.Iterable[properties.type].map.call(properties, function (type_) {
    return Type.displayName.call(type_);
  }).value.join(", ") + ")";
};
function getRecordTypeName(properties) {
  return "{" + _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _core.ObjectMap.toList.call(properties), $isTraitObject: true }, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        type_ = _ref2[1];

    return "" + key + ": " + Type.displayName.call(type_);
  }).value.join(", ") + "}";
};
function getGenericName(name, type_) {
  var showClassParameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var __PUCK__value__61 = type_.instance;
  var __PUCK__value__62 = void 0;
  if ($unwrapTraitObject(__PUCK__value__61).kind == "Some") {
    var _$unwrapTraitObject38 = $unwrapTraitObject(__PUCK__value__61),
        _$unwrapTraitObject39 = _slicedToArray(_$unwrapTraitObject38.value, 1),
        instance = _$unwrapTraitObject39[0];

    __PUCK__value__62 = "<" + _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: instance.typeParameters, $isTraitObject: true }, function (p) {
      return Type.displayName.call(p);
    }).value.join(", ") + ">";
  } else {
    var __PUCK__value__63 = void 0;
    if (showClassParameters) {
      var __PUCK__value__64 = type_._class;
      var __PUCK__value__65 = void 0;
      if ($unwrapTraitObject(__PUCK__value__64).kind == "Some") {
        var _$unwrapTraitObject40 = $unwrapTraitObject(__PUCK__value__64),
            _$unwrapTraitObject41 = _slicedToArray(_$unwrapTraitObject40.value, 1),
            _class = _$unwrapTraitObject41[0];

        __PUCK__value__65 = "<" + _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _class.typeParameters, $isTraitObject: true }, function (p) {
          return Type.displayName.call(p);
        }).value.join(", ") + ">";
      } else {
        __PUCK__value__65 = "";
      };
      __PUCK__value__63 = __PUCK__value__65;
    } else {
      __PUCK__value__63 = "";
    };
    __PUCK__value__62 = __PUCK__value__63;
  };
  var parameters = __PUCK__value__62;
  if (Type.isFunction.call(type_)) {
    return parameters + name;
  } else {
    return name + parameters;
  };
}
