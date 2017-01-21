#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StructKind = exports.TypeKind = exports.ScopeAware = exports.Scope = exports.TypeBinding = exports.Binding = exports.TypeParameter = exports.TypeInstance = exports.TypeClass = exports.Implementation = exports.Tuple = exports.Record = exports.Trait = exports.Struct = exports.Function = exports.Enum = exports.Type = exports.File = undefined;

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (_js.Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _ast = require('./ast/ast.js');

var _range = require('./typeck/src/range.js');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var Binding = exports.Binding = function Binding(object) {
  return object;
};
var TypeBinding = exports.TypeBinding = function TypeBinding(object) {
  return object;
};
var Scope = exports.Scope = function Scope(object) {
  return object;
};
var ScopeAware = exports.ScopeAware = function ScopeAware(object) {
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
  var _ref;

  return _ref = {
    displayName: (0, _core.Some)("")
  }, _defineProperty(_ref, 'displayName', _core.None), _defineProperty(_ref, 'kind', TypeKind.Struct({
    implementations: [],
    kind: StructKind.Tuple({ properties: [] })
  })), _ref;
}, Type.displayName = function displayName() {
  var self = this;
  if (!self) {
    return "??";
  };
  var __PUCK__value__1 = self.displayName;
  if (__PUCK__value__1.kind == "Some") {
    var _PUCK__value__1$valu = _slicedToArray(__PUCK__value__1.value, 1);

    var name = _PUCK__value__1$valu[0];

    return name;
  };
  var __PUCK__value__2 = self.kind;
  var __PUCK__value__3 = __PUCK__value__2;
  if (__PUCK__value__3.kind == "Enum") {
    var _PUCK__value__3$valu = _slicedToArray(__PUCK__value__3.value, 1);

    var enum_ = _PUCK__value__3$valu[0];

    return getGenericName(_core.Option.unwrap.call(self.name), self);
  } else {
    var __PUCK__value__4 = __PUCK__value__2;
    if (__PUCK__value__4.kind == "Function") {
      var _ret = function () {
        var _PUCK__value__4$valu = _slicedToArray(__PUCK__value__4.value, 1);

        var _function = _PUCK__value__4$valu[0];

        return {
          v: _core.Option.unwrapOrElse.call(self.name, function () {
            return getFunctionTypeName(_function);
          })
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof2(_ret)) === "object") return _ret.v;
    } else {
      var __PUCK__value__5 = __PUCK__value__2;
      if (__PUCK__value__5.kind == "Parameter") {
        var _PUCK__value__5$valu = _slicedToArray(__PUCK__value__5.value, 1);

        var __PUCK__value__6 = _PUCK__value__5$valu[0];

        return _core.Option.unwrap.call(self.name);
      } else {
        var __PUCK__value__7 = __PUCK__value__2;
        if (__PUCK__value__7.kind == "Struct") {
          var _ret2 = function () {
            var _PUCK__value__7$valu = _slicedToArray(__PUCK__value__7.value, 1);

            var struct = _PUCK__value__7$valu[0];

            return {
              v: _core.Option.mapOrElse.call(self.name, function () {
                var __PUCK__value__8 = struct.kind;
                var __PUCK__value__9 = __PUCK__value__8;
                if (__PUCK__value__9.kind == "Record") {
                  var _PUCK__value__9$valu = _slicedToArray(__PUCK__value__9.value, 1);

                  var properties = _PUCK__value__9$valu[0].properties;

                  return getRecordTypeName(properties);
                } else {
                  var __PUCK__value__10 = __PUCK__value__8;
                  if (__PUCK__value__10.kind == "Tuple") {
                    var _PUCK__value__10$val = _slicedToArray(__PUCK__value__10.value, 1);

                    var _properties = _PUCK__value__10$val[0].properties;

                    return getTupleTypeName(_properties);
                  } else {
                    var __PUCK__value__11 = __PUCK__value__8;
                    if (__PUCK__value__11.kind == "Unit") {
                      var _undefined = __PUCK__value__11;
                      return "unit";
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
          if (__PUCK__value__12.kind == "Trait") {
            var _PUCK__value__12$val = _slicedToArray(__PUCK__value__12.value, 1);

            var __PUCK__value__13 = _PUCK__value__12$val[0];

            return getGenericName(_core.Option.unwrap.call(self.name), self, true);
          };
        };
      };
    };
  };
}, Type.getFunction = function getFunction() {
  var self = this;
  var __PUCK__value__14 = self.kind;
  var __PUCK__value__15 = __PUCK__value__14;
  if (__PUCK__value__15.kind == "Function") {
    var _PUCK__value__15$val = _slicedToArray(__PUCK__value__15.value, 1);

    var _function = _PUCK__value__15$val[0];

    return _function;
  } else {
    var __PUCK__value__16 = __PUCK__value__14;
    if (true) {
      var __PUCK__value__17 = __PUCK__value__16;
      throw "Type is not a function";
    };
  };
}, Type.getTrait = function getTrait() {
  var self = this;
  var __PUCK__value__18 = self.kind;
  var __PUCK__value__19 = __PUCK__value__18;
  if (__PUCK__value__19.kind == "Trait") {
    var _PUCK__value__19$val = _slicedToArray(__PUCK__value__19.value, 1);

    var trait_ = _PUCK__value__19$val[0];

    return trait_;
  } else {
    var __PUCK__value__20 = __PUCK__value__18;
    if (true) {
      var __PUCK__value__21 = __PUCK__value__20;
      throw "Type is not a trait";
    };
  };
};
TypeClass.fromAstNode = function fromAstNode(astNode, reportError) {
  if (astNode.typeParameters && astNode.typeParameters.length) {
    var parameterRange = (0, _range.getRange)(astNode.typeParameters, function (p) {
      return _core.Option.isJust.call(p.defaultValue);
    }, reportError, "type parameter");
    return (0, _core.Some)({
      parameterRange: parameterRange,
      typeParameters: [],
      instances: []
    });
  } else {
    return _core.None;
  };
};

function getFunctionTypeName(_function) {
  return getTupleTypeName(_core.Iterable['$List'].map.call(_function._arguments, function (a) {
    return a.type_;
  })) + " -> " + (_function.returnType && Type.displayName.call(_function.returnType));
};
function getTupleTypeName(properties) {
  return "(" + _core.Iterable['$List'].map.call(properties, function (type_) {
    return Type.displayName.call(type_);
  }).join(", ") + ")";
};
function getRecordTypeName(properties) {
  return "{" + _core.Iterable['$List'].map.call(_core.ObjectMap.toList.call(properties), function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2);

    var key = _ref3[0];
    var type_ = _ref3[1];

    return "" + key + ": " + type_.displayName();
  }).join(", ") + "}";
};
function getGenericName(name, type_) {
  var showClassParameters = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  var __PUCK__value__22 = type_.instance;
  if (__PUCK__value__22.kind == "Some") {
    var _PUCK__value__22$val = _slicedToArray(__PUCK__value__22.value, 1);

    var instance = _PUCK__value__22$val[0];

    return name + "<" + instance.typeParameters.map(function (p) {
      return Type.displayName.call(p);
    }).join(", ") + ">";
  } else {
    if (showClassParameters) {
      var __PUCK__value__23 = type_._class;
      if (__PUCK__value__23.kind == "Some") {
        var _PUCK__value__23$val = _slicedToArray(__PUCK__value__23.value, 1);

        var _class = _PUCK__value__23$val[0];

        return name + "<" + _class.typeParameters.map(function (p) {
          return Type.displayName.call(p);
        }).join(", ") + ">";
      } else {
        return name;
      };
    } else {
      return name;
    };
  };
}
