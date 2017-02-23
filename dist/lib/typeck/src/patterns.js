'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PatternError = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.declarePatternVariables = declarePatternVariables;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _ast = require('./../../ast/ast');

var _span = require('./../../ast/span');

var _entities = require('./../../entities');

var _scope = require('./scope');

var _types = require('./types');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};
var PatternError = exports.PatternError = {
  ScopeError: function ScopeError() {
    for (var _len = arguments.length, members = Array(_len), _key = 0; _key < _len; _key++) {
      members[_key] = arguments[_key];
    }

    return { kind: 'ScopeError', value: members };
  },
  PatternMismatch: function PatternMismatch() {
    for (var _len2 = arguments.length, members = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      members[_key2] = arguments[_key2];
    }

    return { kind: 'PatternMismatch', value: members };
  },
  NotExhaustive: { kind: 'NotExhaustive', value: Symbol('NotExhaustive') }
};
function getValueType(typePath, type_) {
  var typePathType = $unwrapTraitObject(typePath.type_);
  var typePathProvidesType = _core.Option.unwrapOr.call(typePathType.providesType, typePathType);
  var __PUCK__value__1 = void 0;
  if (type_) {
    var __PUCK__value__2 = typePathType.enumMember;
    if (__PUCK__value__2.kind == "Some") {
      var _PUCK__value__2$valu = _slicedToArray(__PUCK__value__2.value, 1),
          _PUCK__value__2$valu$ = _slicedToArray(_PUCK__value__2$valu[0], 2),
          member = _PUCK__value__2$valu$[0],
          typePathEnum = _PUCK__value__2$valu$[1];

      var __PUCK__value__3 = type_.kind;
      if ($unwrapTraitObject(__PUCK__value__3).kind == "Enum") {
        var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__3),
            _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
            __PUCK__value__4 = _$unwrapTraitObject$v[0];
      } else {
        if ($unwrapTraitObject(__PUCK__value__3).kind == "Parameter") {
          var _undefined = $unwrapTraitObject(__PUCK__value__3);
        } else {
          if (true) {
            var __PUCK__value__5 = __PUCK__value__3;
            return (0, _core.Err)([typePathEnum, type_]);
          };
        };
      };
    };
    __PUCK__value__1 = type_;
  } else {
    __PUCK__value__1 = typePathProvidesType;
  };
  var structType = __PUCK__value__1;
  var __PUCK__value__6 = structType.kind;
  if ($unwrapTraitObject(__PUCK__value__6).kind == "Enum") {
    var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__6),
        _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
        enum_ = _$unwrapTraitObject2$[0];

    var __PUCK__value__7 = typePathType.enumMember;
    if (__PUCK__value__7.kind == "Some") {
      var _PUCK__value__7$valu = _slicedToArray(__PUCK__value__7.value, 1),
          _PUCK__value__7$valu$ = _slicedToArray(_PUCK__value__7$valu[0], 2),
          _member = _PUCK__value__7$valu$[0],
          _typePathEnum = _PUCK__value__7$valu$[1];

      if ((0, _types.isAssignable)(_typePathEnum, type_)) {
        return (0, _core.Ok)(_core.Option.unwrap.call(_core.ObjectMap.get.call(enum_.members, _member)));
      } else {
        return (0, _core.Err)([_typePathEnum, type_]);
      };
    } else {
      return (0, _core.Err)([typePathProvidesType, type_]);
    };
  } else {
    if (true) {
      var __PUCK__value__8 = __PUCK__value__6;
      return (0, _core.Ok)(structType);
    };
  };
};
function isNonExhaustive(typePath) {
  var typePathType = $unwrapTraitObject(typePath.type_);
  typePathType = _core.Option.unwrapOr.call(_core.Option.orElse.call(_core.Option.map.call(typePathType.enumMember, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        __PUCK__value__9 = _ref2[0],
        enum_ = _ref2[1];

    return enum_;
  }), function () {
    return typePathType.providesType;
  }), typePathType);
  var __PUCK__value__10 = typePathType.kind;
  if (__PUCK__value__10.kind == "Enum") {
    var _PUCK__value__10$val = _slicedToArray(__PUCK__value__10.value, 1),
        enum_ = _PUCK__value__10$val[0];

    if (_core.ObjectMap.size.call(enum_.members) > 1) {
      return true;
    };
  };
  return false;
};
function declarePatternVariables(scope, visitor, p, mutable, type_, allowNotExhaustive) {
  var __PUCK__value__11 = p;
  if ($unwrapTraitObject(__PUCK__value__11).kind == "CatchAll") {
    var _undefined2 = $unwrapTraitObject(__PUCK__value__11);
    return (0, _core.Ok)([]);
  } else {
    if ($unwrapTraitObject(__PUCK__value__11).kind == "Identifier") {
      var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__11),
          _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
          identifier = _$unwrapTraitObject3$[0];

      var __PUCK__value__12 = _scope.Scope.define.call(scope, {
        name: identifier.name,
        token: { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p, $isTraitObject: true },
        mutable: mutable,
        allowRedeclare: true,
        type_: type_,
        completeType: _core.None,
        previous: _core.None
      });
      if ($unwrapTraitObject(__PUCK__value__12).kind == "Ok") {
        var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__12),
            _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
            binding = _$unwrapTraitObject4$[0];

        p.binding = binding;
        return (0, _core.Ok)([]);
      } else {
        if ($unwrapTraitObject(__PUCK__value__12).kind == "Err") {
          var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__12),
              _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
              err = _$unwrapTraitObject5$[0];

          return (0, _core.Err)(PatternError.ScopeError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true }, err));
        };
      };
    } else {
      if ($unwrapTraitObject(__PUCK__value__11).kind == "Record") {
        var _ret = function () {
          var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__11),
              _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
              record = _$unwrapTraitObject6$[0];

          var __PUCK__value__13 = void 0;
          if (type_) {
            var __PUCK__value__14 = type_.kind;
            var __PUCK__value__15 = void 0;
            if ($unwrapTraitObject(__PUCK__value__14).kind == "Struct") {
              var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__14),
                  _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
                  struct = _$unwrapTraitObject7$[0];

              var __PUCK__value__16 = struct.kind;
              var __PUCK__value__17 = void 0;
              if ($unwrapTraitObject(__PUCK__value__16).kind == "Record") {
                var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__16),
                    _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
                    _record = _$unwrapTraitObject8$[0];

                __PUCK__value__17 = _record.properties;
              } else {
                var __PUCK__value__18 = void 0;
                if (true) {
                  var __PUCK__value__19 = __PUCK__value__16;
                  return {
                    v: (0, _core.Err)(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), type_))
                  };
                };
                __PUCK__value__17 = __PUCK__value__18;
              };
              __PUCK__value__15 = __PUCK__value__17;
            } else {
              var __PUCK__value__20 = void 0;
              if ($unwrapTraitObject(__PUCK__value__14).kind == "Parameter") {
                var _undefined3 = $unwrapTraitObject(__PUCK__value__14);
                __PUCK__value__20 = {};
              } else {
                var __PUCK__value__21 = void 0;
                if (true) {
                  var __PUCK__value__22 = __PUCK__value__14;
                  return {
                    v: (0, _core.Err)(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), type_))
                  };
                };
                __PUCK__value__20 = __PUCK__value__21;
              };
              __PUCK__value__15 = __PUCK__value__20;
            };
            __PUCK__value__13 = __PUCK__value__15;
          } else {
            __PUCK__value__13 = _core.ObjectMap._new();
          };
          var props = __PUCK__value__13;
          var properties = $unwrapTraitObject(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: record.properties, $isTraitObject: true }, function (p) {
            return [p.property.name, declarePatternVariables(scope, visitor, p.pattern, mutable, $unwrapTraitObject(props[p.property.name]), allowNotExhaustive)];
          }).value.reduce(function (acc, _ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                name = _ref4[0],
                type_ = _ref4[1];

            return _core.Result.andThen.call(acc, function (__PUCK__value__23) {
              return type_;
            });
          }, (0, _core.Ok)([])));
          return {
            v: properties
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      } else {
        if ($unwrapTraitObject(__PUCK__value__11).kind == "RecordType") {
          var _ret2 = function () {
            var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__11),
                _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 2),
                typePath = _$unwrapTraitObject9$[0],
                record = _$unwrapTraitObject9$[1];

            var __PUCK__value__24 = getValueType(typePath, type_);
            var __PUCK__value__25 = void 0;
            if ($unwrapTraitObject(__PUCK__value__24).kind == "Ok") {
              var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__24),
                  _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
                  _type_ = _$unwrapTraitObject11[0];

              __PUCK__value__25 = _type_;
            } else {
              var __PUCK__value__26 = void 0;
              if ($unwrapTraitObject(__PUCK__value__24).kind == "Err") {
                var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__24),
                    _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12.value, 1),
                    _$unwrapTraitObject14 = _slicedToArray(_$unwrapTraitObject13[0], 2),
                    to = _$unwrapTraitObject14[0],
                    subject = _$unwrapTraitObject14[1];

                return {
                  v: (0, _core.Err)(PatternError.PatternMismatch(p, to, subject))
                };
              };
              __PUCK__value__25 = __PUCK__value__26;
            };
            var recordType = __PUCK__value__25;
            var __PUCK__value__27 = recordType.kind;
            var __PUCK__value__28 = void 0;
            if ($unwrapTraitObject(__PUCK__value__27).kind == "Struct") {
              var _$unwrapTraitObject15 = $unwrapTraitObject(__PUCK__value__27),
                  _$unwrapTraitObject16 = _slicedToArray(_$unwrapTraitObject15.value, 1),
                  struct = _$unwrapTraitObject16[0];

              var __PUCK__value__29 = struct.kind;
              var __PUCK__value__30 = void 0;
              if ($unwrapTraitObject(__PUCK__value__29).kind == "Record") {
                var _$unwrapTraitObject17 = $unwrapTraitObject(__PUCK__value__29),
                    _$unwrapTraitObject18 = _slicedToArray(_$unwrapTraitObject17.value, 1),
                    _record2 = _$unwrapTraitObject18[0];

                __PUCK__value__30 = _record2.properties;
              } else {
                var __PUCK__value__31 = void 0;
                if (true) {
                  var __PUCK__value__32 = __PUCK__value__29;
                  return {
                    v: (0, _core.Err)(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), recordType))
                  };
                };
                __PUCK__value__30 = __PUCK__value__31;
              };
              __PUCK__value__28 = __PUCK__value__30;
            } else {
              var __PUCK__value__33 = void 0;
              if ($unwrapTraitObject(__PUCK__value__27).kind == "Parameter") {
                var _undefined4 = $unwrapTraitObject(__PUCK__value__27);
                __PUCK__value__33 = {};
              } else {
                var __PUCK__value__34 = void 0;
                if (true) {
                  var __PUCK__value__35 = __PUCK__value__27;
                  return {
                    v: (0, _core.Err)(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), recordType))
                  };
                };
                __PUCK__value__33 = __PUCK__value__34;
              };
              __PUCK__value__28 = __PUCK__value__33;
            };
            var props = __PUCK__value__28;
            if (!allowNotExhaustive && isNonExhaustive(typePath)) {
              return {
                v: (0, _core.Err)(PatternError.NotExhaustive)
              };
            };
            var properties = $unwrapTraitObject(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].toList.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: record.properties, $isTraitObject: true }), $isTraitObject: true }, function (p) {
              return [p.property.name, declarePatternVariables(scope, visitor, p.pattern, mutable, $unwrapTraitObject(props[p.property.name]), allowNotExhaustive)];
            }).value.reduce(function (acc, _ref5) {
              var _ref6 = _slicedToArray(_ref5, 2),
                  name = _ref6[0],
                  type_ = _ref6[1];

              return _core.Result.andThen.call(acc, function (__PUCK__value__36) {
                return type_;
              });
            }, (0, _core.Ok)([])));
            return {
              v: properties
            };
          }();

          if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
        } else {
          if ($unwrapTraitObject(__PUCK__value__11).kind == "Tuple") {
            var _ret3 = function () {
              var _$unwrapTraitObject19 = $unwrapTraitObject(__PUCK__value__11),
                  _$unwrapTraitObject20 = _slicedToArray(_$unwrapTraitObject19.value, 1),
                  tuple = _$unwrapTraitObject20[0];

              var __PUCK__value__37 = void 0;
              if (type_) {
                var __PUCK__value__38 = type_.kind;
                var __PUCK__value__39 = void 0;
                if ($unwrapTraitObject(__PUCK__value__38).kind == "Struct") {
                  var _$unwrapTraitObject21 = $unwrapTraitObject(__PUCK__value__38),
                      _$unwrapTraitObject22 = _slicedToArray(_$unwrapTraitObject21.value, 1),
                      struct = _$unwrapTraitObject22[0];

                  var __PUCK__value__40 = struct.kind;
                  var __PUCK__value__41 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__40).kind == "Tuple") {
                    var _$unwrapTraitObject23 = $unwrapTraitObject(__PUCK__value__40),
                        _$unwrapTraitObject24 = _slicedToArray(_$unwrapTraitObject23.value, 1),
                        _tuple = _$unwrapTraitObject24[0];

                    __PUCK__value__41 = _tuple.properties;
                  } else {
                    var __PUCK__value__42 = void 0;
                    if (true) {
                      var __PUCK__value__43 = __PUCK__value__40;
                      return {
                        v: (0, _core.Err)(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), type_))
                      };
                    };
                    __PUCK__value__41 = __PUCK__value__42;
                  };
                  __PUCK__value__39 = __PUCK__value__41;
                } else {
                  var __PUCK__value__44 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__38).kind == "Parameter") {
                    var _undefined5 = $unwrapTraitObject(__PUCK__value__38);
                    __PUCK__value__44 = [];
                  } else {
                    var __PUCK__value__45 = void 0;
                    if (true) {
                      var __PUCK__value__46 = __PUCK__value__38;
                      return {
                        v: (0, _core.Err)(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), type_))
                      };
                    };
                    __PUCK__value__44 = __PUCK__value__45;
                  };
                  __PUCK__value__39 = __PUCK__value__44;
                };
                __PUCK__value__37 = __PUCK__value__39;
              } else {
                __PUCK__value__37 = [];
              };
              var props = __PUCK__value__37;
              var __PUCK__value__48 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true });
              var __PUCK__value__47 = _core.Iterable[__PUCK__value__48.type].map.call(__PUCK__value__48, function (_ref7) {
                var _ref8 = _slicedToArray(_ref7, 2),
                    i = _ref8[0],
                    p = _ref8[1];

                return declarePatternVariables(scope, visitor, p, mutable, $unwrapTraitObject(props[i]), allowNotExhaustive);
              });
              var properties = $unwrapTraitObject(_core.Iterable[__PUCK__value__47.type].toList.call(__PUCK__value__47).reduce(function (acc, cur) {
                return _core.Result.andThen.call(acc, function (__PUCK__value__49) {
                  return cur;
                });
              }, (0, _core.Ok)([])));
              return {
                v: properties
              };
            }();

            if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
          } else {
            if ($unwrapTraitObject(__PUCK__value__11).kind == "TupleType") {
              var _ret4 = function () {
                var _$unwrapTraitObject25 = $unwrapTraitObject(__PUCK__value__11),
                    _$unwrapTraitObject26 = _slicedToArray(_$unwrapTraitObject25.value, 2),
                    typePath = _$unwrapTraitObject26[0],
                    tuple = _$unwrapTraitObject26[1];

                var __PUCK__value__50 = getValueType(typePath, type_);
                var __PUCK__value__51 = void 0;
                if ($unwrapTraitObject(__PUCK__value__50).kind == "Ok") {
                  var _$unwrapTraitObject27 = $unwrapTraitObject(__PUCK__value__50),
                      _$unwrapTraitObject28 = _slicedToArray(_$unwrapTraitObject27.value, 1),
                      _type_2 = _$unwrapTraitObject28[0];

                  __PUCK__value__51 = _type_2;
                } else {
                  var __PUCK__value__52 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__50).kind == "Err") {
                    var _$unwrapTraitObject29 = $unwrapTraitObject(__PUCK__value__50),
                        _$unwrapTraitObject30 = _slicedToArray(_$unwrapTraitObject29.value, 1),
                        _$unwrapTraitObject31 = _slicedToArray(_$unwrapTraitObject30[0], 2),
                        to = _$unwrapTraitObject31[0],
                        subject = _$unwrapTraitObject31[1];

                    return {
                      v: (0, _core.Err)(PatternError.PatternMismatch(p, to, subject))
                    };
                  };
                  __PUCK__value__51 = __PUCK__value__52;
                };
                var tupleType = __PUCK__value__51;
                var __PUCK__value__53 = tupleType.kind;
                var __PUCK__value__54 = void 0;
                if ($unwrapTraitObject(__PUCK__value__53).kind == "Struct") {
                  var _$unwrapTraitObject32 = $unwrapTraitObject(__PUCK__value__53),
                      _$unwrapTraitObject33 = _slicedToArray(_$unwrapTraitObject32.value, 1),
                      struct = _$unwrapTraitObject33[0];

                  var __PUCK__value__55 = struct.kind;
                  var __PUCK__value__56 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__55).kind == "Tuple") {
                    var _$unwrapTraitObject34 = $unwrapTraitObject(__PUCK__value__55),
                        _$unwrapTraitObject35 = _slicedToArray(_$unwrapTraitObject34.value, 1),
                        _tuple2 = _$unwrapTraitObject35[0];

                    __PUCK__value__56 = _tuple2.properties;
                  } else {
                    var __PUCK__value__57 = void 0;
                    if (true) {
                      var __PUCK__value__58 = __PUCK__value__55;
                      return {
                        v: (0, _core.Err)(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), tupleType))
                      };
                    };
                    __PUCK__value__56 = __PUCK__value__57;
                  };
                  __PUCK__value__54 = __PUCK__value__56;
                } else {
                  var __PUCK__value__59 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__53).kind == "Parameter") {
                    var _undefined6 = $unwrapTraitObject(__PUCK__value__53);
                    __PUCK__value__59 = [];
                  } else {
                    var __PUCK__value__60 = void 0;
                    if (true) {
                      var __PUCK__value__61 = __PUCK__value__53;
                      return {
                        v: (0, _core.Err)(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), tupleType))
                      };
                    };
                    __PUCK__value__59 = __PUCK__value__60;
                  };
                  __PUCK__value__54 = __PUCK__value__59;
                };
                var props = __PUCK__value__54;
                if (!allowNotExhaustive && isNonExhaustive(typePath)) {
                  return {
                    v: (0, _core.Err)(PatternError.NotExhaustive)
                  };
                };
                var __PUCK__value__63 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true });
                var __PUCK__value__62 = _core.Iterable[__PUCK__value__63.type].map.call(__PUCK__value__63, function (_ref9) {
                  var _ref10 = _slicedToArray(_ref9, 2),
                      i = _ref10[0],
                      p = _ref10[1];

                  return declarePatternVariables(scope, visitor, p, mutable, $unwrapTraitObject(props[i]), allowNotExhaustive);
                });
                var properties = $unwrapTraitObject(_core.Iterable[__PUCK__value__62.type].toList.call(__PUCK__value__62).reduce(function (acc, cur) {
                  return _core.Result.andThen.call(acc, function (__PUCK__value__64) {
                    return cur;
                  });
                }, (0, _core.Ok)([])));
                return {
                  v: properties
                };
              }();

              if ((typeof _ret4 === 'undefined' ? 'undefined' : _typeof(_ret4)) === "object") return _ret4.v;
            } else {
              if ($unwrapTraitObject(__PUCK__value__11).kind == "UnitType") {
                var _$unwrapTraitObject36 = $unwrapTraitObject(__PUCK__value__11),
                    _$unwrapTraitObject37 = _slicedToArray(_$unwrapTraitObject36.value, 1),
                    typePath = _$unwrapTraitObject37[0];

                if (!allowNotExhaustive && isNonExhaustive(typePath)) {
                  return (0, _core.Err)(PatternError.NotExhaustive);
                };
                return (0, _core.Ok)([]);
              };
            };
          };
        };
      };
    };
  };
}
