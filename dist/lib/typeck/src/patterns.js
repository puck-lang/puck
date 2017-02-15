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
  var typePathType = typePath.type_;
  var typePathProvidesType = _core.Option.unwrapOr.call(typePathType.providesType, typePath.type_);
  var __PUCK__value__1 = void 0;
  if (type_) {
    var __PUCK__value__2 = typePathType.enumMember;
    if ($unwrapTraitObject(__PUCK__value__2).kind == "Some") {
      var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__2),
          _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
          _$unwrapTraitObject$v2 = _slicedToArray(_$unwrapTraitObject$v[0], 2),
          member = _$unwrapTraitObject$v2[0],
          typePathEnum = _$unwrapTraitObject$v2[1];

      var __PUCK__value__3 = type_.kind;
      var __PUCK__value__4 = __PUCK__value__3;
      if ($unwrapTraitObject(__PUCK__value__4).kind == "Enum") {
        var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__4),
            _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
            __PUCK__value__5 = _$unwrapTraitObject2$[0];
      } else {
        var __PUCK__value__6 = __PUCK__value__3;
        if ($unwrapTraitObject(__PUCK__value__6).kind == "Parameter") {
          var _undefined = $unwrapTraitObject(__PUCK__value__6);
        } else {
          var __PUCK__value__7 = __PUCK__value__3;
          if (true) {
            var __PUCK__value__8 = __PUCK__value__7;
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
  var __PUCK__value__9 = structType.kind;
  var __PUCK__value__10 = __PUCK__value__9;
  if ($unwrapTraitObject(__PUCK__value__10).kind == "Enum") {
    var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__10),
        _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
        enum_ = _$unwrapTraitObject3$[0];

    var __PUCK__value__11 = typePathType.enumMember;
    if ($unwrapTraitObject(__PUCK__value__11).kind == "Some") {
      var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__11),
          _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
          _$unwrapTraitObject4$2 = _slicedToArray(_$unwrapTraitObject4$[0], 2),
          _member = _$unwrapTraitObject4$2[0],
          _typePathEnum = _$unwrapTraitObject4$2[1];

      if ((0, _types.isAssignable)(_typePathEnum, type_)) {
        return (0, _core.Ok)(_core.Option.unwrap.call(_core.ObjectMap.get.call(enum_.members, _member)));
      } else {
        return (0, _core.Err)([_typePathEnum, type_]);
      };
    } else {
      return (0, _core.Err)([typePathProvidesType, type_]);
    };
  } else {
    var __PUCK__value__12 = __PUCK__value__9;
    if (true) {
      var __PUCK__value__13 = __PUCK__value__12;
      return (0, _core.Ok)(structType);
    };
  };
};
function isNonExhaustive(typePath) {
  var typePathType = typePath.type_;
  typePathType = _core.Option.unwrapOr.call(_core.Option.orElse.call(_core.Option.map.call(typePathType.enumMember, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        __PUCK__value__14 = _ref2[0],
        enum_ = _ref2[1];

    return enum_;
  }), function () {
    return typePathType.providesType;
  }), typePathType);
  var __PUCK__value__15 = typePathType.kind;
  if ($unwrapTraitObject(__PUCK__value__15).kind == "Enum") {
    var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__15),
        _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
        enum_ = _$unwrapTraitObject5$[0];

    if (_core.ObjectMap.size.call(enum_.members) > 1) {
      return true;
    };
  };
  return false;
};
function declarePatternVariables(scope, visitor, p, mutable, type_, allowNotExhaustive) {
  var __PUCK__value__16 = p;
  var __PUCK__value__17 = __PUCK__value__16;
  if ($unwrapTraitObject(__PUCK__value__17).kind == "CatchAll") {
    var _undefined2 = $unwrapTraitObject(__PUCK__value__17);
    return (0, _core.Ok)([]);
  } else {
    var __PUCK__value__18 = __PUCK__value__16;
    if ($unwrapTraitObject(__PUCK__value__18).kind == "Identifier") {
      var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__18),
          _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
          identifier = _$unwrapTraitObject6$[0];

      var __PUCK__value__19 = _scope.Scope.define.call(scope, {
        name: identifier.name,
        token: { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p, $isTraitObject: true },
        mutable: mutable,
        allowRedeclare: true,
        type_: type_,
        importedFrom: _core.None,
        previous: _core.None
      });
      var __PUCK__value__20 = __PUCK__value__19;
      if ($unwrapTraitObject(__PUCK__value__20).kind == "Ok") {
        var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__20),
            _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
            binding = _$unwrapTraitObject7$[0];

        p.binding = binding;
        return (0, _core.Ok)([]);
      } else {
        var __PUCK__value__21 = __PUCK__value__19;
        if ($unwrapTraitObject(__PUCK__value__21).kind == "Err") {
          var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__21),
              _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
              err = _$unwrapTraitObject8$[0];

          return (0, _core.Err)(PatternError.ScopeError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true }, err));
        };
      };
    } else {
      var __PUCK__value__22 = __PUCK__value__16;
      if ($unwrapTraitObject(__PUCK__value__22).kind == "Record") {
        var _ret = function () {
          var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__22),
              _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
              record = _$unwrapTraitObject9$[0];

          var __PUCK__value__23 = void 0;
          if (type_) {
            var __PUCK__value__24 = type_.kind;
            var __PUCK__value__25 = __PUCK__value__24;
            var __PUCK__value__26 = void 0;
            if ($unwrapTraitObject(__PUCK__value__25).kind == "Struct") {
              var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__25),
                  _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
                  struct = _$unwrapTraitObject11[0];

              var __PUCK__value__27 = struct.kind;
              var __PUCK__value__28 = __PUCK__value__27;
              var __PUCK__value__29 = void 0;
              if ($unwrapTraitObject(__PUCK__value__28).kind == "Record") {
                var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__28),
                    _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12.value, 1),
                    _record = _$unwrapTraitObject13[0];

                __PUCK__value__29 = _record.properties;
              } else {
                var __PUCK__value__30 = __PUCK__value__27;
                var __PUCK__value__31 = void 0;
                if (true) {
                  var __PUCK__value__32 = __PUCK__value__30;
                  return {
                    v: (0, _core.Err)(PatternError.PatternMismatch(p, p.type_, type_))
                  };
                };
                __PUCK__value__29 = __PUCK__value__31;
              };
              __PUCK__value__26 = __PUCK__value__29;
            } else {
              var __PUCK__value__33 = __PUCK__value__24;
              var __PUCK__value__34 = void 0;
              if ($unwrapTraitObject(__PUCK__value__33).kind == "Parameter") {
                var _undefined3 = $unwrapTraitObject(__PUCK__value__33);
                __PUCK__value__34 = {};
              } else {
                var __PUCK__value__35 = __PUCK__value__24;
                var __PUCK__value__36 = void 0;
                if (true) {
                  var __PUCK__value__37 = __PUCK__value__35;
                  return {
                    v: (0, _core.Err)(PatternError.PatternMismatch(p, p.type_, type_))
                  };
                };
                __PUCK__value__34 = __PUCK__value__36;
              };
              __PUCK__value__26 = __PUCK__value__34;
            };
            __PUCK__value__23 = __PUCK__value__26;
          } else {
            __PUCK__value__23 = _core.ObjectMap._new();
          };
          var props = __PUCK__value__23;
          var properties = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$lib/stdlib/core.puck:List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$lib/stdlib/core.puck:List', value: record.properties, $isTraitObject: true }, function (p) {
            return [p.property.name, declarePatternVariables(scope, visitor, p.pattern, mutable, props[p.property.name], allowNotExhaustive)];
          }).value.reduce(function (acc, _ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                name = _ref4[0],
                type_ = _ref4[1];

            return _core.Result.andThen.call(acc, function (__PUCK__value__38) {
              return type_;
            });
          }, (0, _core.Ok)([]));
          return {
            v: properties
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      } else {
        var __PUCK__value__39 = __PUCK__value__16;
        if ($unwrapTraitObject(__PUCK__value__39).kind == "RecordType") {
          var _ret2 = function () {
            var _$unwrapTraitObject14 = $unwrapTraitObject(__PUCK__value__39),
                _$unwrapTraitObject15 = _slicedToArray(_$unwrapTraitObject14.value, 2),
                typePath = _$unwrapTraitObject15[0],
                record = _$unwrapTraitObject15[1];

            var __PUCK__value__40 = getValueType(typePath, type_);
            var __PUCK__value__41 = __PUCK__value__40;
            var __PUCK__value__42 = void 0;
            if ($unwrapTraitObject(__PUCK__value__41).kind == "Ok") {
              var _$unwrapTraitObject16 = $unwrapTraitObject(__PUCK__value__41),
                  _$unwrapTraitObject17 = _slicedToArray(_$unwrapTraitObject16.value, 1),
                  _type_ = _$unwrapTraitObject17[0];

              __PUCK__value__42 = _type_;
            } else {
              var __PUCK__value__43 = __PUCK__value__40;
              var __PUCK__value__44 = void 0;
              if ($unwrapTraitObject(__PUCK__value__43).kind == "Err") {
                var _$unwrapTraitObject18 = $unwrapTraitObject(__PUCK__value__43),
                    _$unwrapTraitObject19 = _slicedToArray(_$unwrapTraitObject18.value, 1),
                    _$unwrapTraitObject20 = _slicedToArray(_$unwrapTraitObject19[0], 2),
                    to = _$unwrapTraitObject20[0],
                    subject = _$unwrapTraitObject20[1];

                return {
                  v: (0, _core.Err)(PatternError.PatternMismatch(p, to, subject))
                };
              };
              __PUCK__value__42 = __PUCK__value__44;
            };
            var recordType = __PUCK__value__42;
            var __PUCK__value__45 = recordType.kind;
            var __PUCK__value__46 = __PUCK__value__45;
            var __PUCK__value__47 = void 0;
            if ($unwrapTraitObject(__PUCK__value__46).kind == "Struct") {
              var _$unwrapTraitObject21 = $unwrapTraitObject(__PUCK__value__46),
                  _$unwrapTraitObject22 = _slicedToArray(_$unwrapTraitObject21.value, 1),
                  struct = _$unwrapTraitObject22[0];

              var __PUCK__value__48 = struct.kind;
              var __PUCK__value__49 = __PUCK__value__48;
              var __PUCK__value__50 = void 0;
              if ($unwrapTraitObject(__PUCK__value__49).kind == "Record") {
                var _$unwrapTraitObject23 = $unwrapTraitObject(__PUCK__value__49),
                    _$unwrapTraitObject24 = _slicedToArray(_$unwrapTraitObject23.value, 1),
                    _record2 = _$unwrapTraitObject24[0];

                __PUCK__value__50 = _record2.properties;
              } else {
                var __PUCK__value__51 = __PUCK__value__48;
                var __PUCK__value__52 = void 0;
                if (true) {
                  var __PUCK__value__53 = __PUCK__value__51;
                  return {
                    v: (0, _core.Err)(PatternError.PatternMismatch(p, p.type_, recordType))
                  };
                };
                __PUCK__value__50 = __PUCK__value__52;
              };
              __PUCK__value__47 = __PUCK__value__50;
            } else {
              var __PUCK__value__54 = __PUCK__value__45;
              var __PUCK__value__55 = void 0;
              if ($unwrapTraitObject(__PUCK__value__54).kind == "Parameter") {
                var _undefined4 = $unwrapTraitObject(__PUCK__value__54);
                __PUCK__value__55 = {};
              } else {
                var __PUCK__value__56 = __PUCK__value__45;
                var __PUCK__value__57 = void 0;
                if (true) {
                  var __PUCK__value__58 = __PUCK__value__56;
                  return {
                    v: (0, _core.Err)(PatternError.PatternMismatch(p, p.type_, recordType))
                  };
                };
                __PUCK__value__55 = __PUCK__value__57;
              };
              __PUCK__value__47 = __PUCK__value__55;
            };
            var props = __PUCK__value__47;
            if (!allowNotExhaustive && isNonExhaustive(typePath)) {
              return {
                v: (0, _core.Err)(PatternError.NotExhaustive)
              };
            };
            var properties = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$lib/stdlib/core.puck:List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$lib/stdlib/core.puck:List', value: _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$lib/stdlib/core.puck:List"].toList.call({ type: '$impl_lib/stdlib/core.puck:Iterable$lib/stdlib/core.puck:List', value: record.properties, $isTraitObject: true }), $isTraitObject: true }, function (p) {
              return [p.property.name, declarePatternVariables(scope, visitor, p.pattern, mutable, props[p.property.name], allowNotExhaustive)];
            }).value.reduce(function (acc, _ref5) {
              var _ref6 = _slicedToArray(_ref5, 2),
                  name = _ref6[0],
                  type_ = _ref6[1];

              return _core.Result.andThen.call(acc, function (__PUCK__value__59) {
                return type_;
              });
            }, (0, _core.Ok)([]));
            return {
              v: properties
            };
          }();

          if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
        } else {
          var __PUCK__value__60 = __PUCK__value__16;
          if ($unwrapTraitObject(__PUCK__value__60).kind == "Tuple") {
            var _ret3 = function () {
              var _$unwrapTraitObject25 = $unwrapTraitObject(__PUCK__value__60),
                  _$unwrapTraitObject26 = _slicedToArray(_$unwrapTraitObject25.value, 1),
                  tuple = _$unwrapTraitObject26[0];

              var __PUCK__value__61 = void 0;
              if (type_) {
                var __PUCK__value__62 = type_.kind;
                var __PUCK__value__63 = __PUCK__value__62;
                var __PUCK__value__64 = void 0;
                if ($unwrapTraitObject(__PUCK__value__63).kind == "Struct") {
                  var _$unwrapTraitObject27 = $unwrapTraitObject(__PUCK__value__63),
                      _$unwrapTraitObject28 = _slicedToArray(_$unwrapTraitObject27.value, 1),
                      struct = _$unwrapTraitObject28[0];

                  var __PUCK__value__65 = struct.kind;
                  var __PUCK__value__66 = __PUCK__value__65;
                  var __PUCK__value__67 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__66).kind == "Tuple") {
                    var _$unwrapTraitObject29 = $unwrapTraitObject(__PUCK__value__66),
                        _$unwrapTraitObject30 = _slicedToArray(_$unwrapTraitObject29.value, 1),
                        _tuple = _$unwrapTraitObject30[0];

                    __PUCK__value__67 = _tuple.properties;
                  } else {
                    var __PUCK__value__68 = __PUCK__value__65;
                    var __PUCK__value__69 = void 0;
                    if (true) {
                      var __PUCK__value__70 = __PUCK__value__68;
                      return {
                        v: (0, _core.Err)(PatternError.PatternMismatch(p, p.type_, type_))
                      };
                    };
                    __PUCK__value__67 = __PUCK__value__69;
                  };
                  __PUCK__value__64 = __PUCK__value__67;
                } else {
                  var __PUCK__value__71 = __PUCK__value__62;
                  var __PUCK__value__72 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__71).kind == "Parameter") {
                    var _undefined5 = $unwrapTraitObject(__PUCK__value__71);
                    __PUCK__value__72 = [];
                  } else {
                    var __PUCK__value__73 = __PUCK__value__62;
                    var __PUCK__value__74 = void 0;
                    if (true) {
                      var __PUCK__value__75 = __PUCK__value__73;
                      return {
                        v: (0, _core.Err)(PatternError.PatternMismatch(p, p.type_, type_))
                      };
                    };
                    __PUCK__value__72 = __PUCK__value__74;
                  };
                  __PUCK__value__64 = __PUCK__value__72;
                };
                __PUCK__value__61 = __PUCK__value__64;
              } else {
                __PUCK__value__61 = [];
              };
              var props = __PUCK__value__61;
              var __PUCK__value__77 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$lib/stdlib/core.puck:List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$lib/stdlib/core.puck:List', value: tuple.properties, $isTraitObject: true });
              var __PUCK__value__76 = _core.Iterable[__PUCK__value__77.type].map.call(__PUCK__value__77, function (_ref7) {
                var _ref8 = _slicedToArray(_ref7, 2),
                    p = _ref8[0],
                    i = _ref8[1];

                return declarePatternVariables(scope, visitor, $unwrapTraitObject(p), mutable, props[i], allowNotExhaustive);
              });
              var properties = _core.Iterable[__PUCK__value__76.type].toList.call(__PUCK__value__76).reduce(function (acc, cur) {
                return _core.Result.andThen.call(acc, function (__PUCK__value__78) {
                  return cur;
                });
              }, (0, _core.Ok)([]));
              return {
                v: properties
              };
            }();

            if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
          } else {
            var __PUCK__value__79 = __PUCK__value__16;
            if ($unwrapTraitObject(__PUCK__value__79).kind == "TupleType") {
              var _ret4 = function () {
                var _$unwrapTraitObject31 = $unwrapTraitObject(__PUCK__value__79),
                    _$unwrapTraitObject32 = _slicedToArray(_$unwrapTraitObject31.value, 2),
                    typePath = _$unwrapTraitObject32[0],
                    tuple = _$unwrapTraitObject32[1];

                var __PUCK__value__80 = getValueType(typePath, type_);
                var __PUCK__value__81 = __PUCK__value__80;
                var __PUCK__value__82 = void 0;
                if ($unwrapTraitObject(__PUCK__value__81).kind == "Ok") {
                  var _$unwrapTraitObject33 = $unwrapTraitObject(__PUCK__value__81),
                      _$unwrapTraitObject34 = _slicedToArray(_$unwrapTraitObject33.value, 1),
                      _type_2 = _$unwrapTraitObject34[0];

                  __PUCK__value__82 = _type_2;
                } else {
                  var __PUCK__value__83 = __PUCK__value__80;
                  var __PUCK__value__84 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__83).kind == "Err") {
                    var _$unwrapTraitObject35 = $unwrapTraitObject(__PUCK__value__83),
                        _$unwrapTraitObject36 = _slicedToArray(_$unwrapTraitObject35.value, 1),
                        _$unwrapTraitObject37 = _slicedToArray(_$unwrapTraitObject36[0], 2),
                        to = _$unwrapTraitObject37[0],
                        subject = _$unwrapTraitObject37[1];

                    return {
                      v: (0, _core.Err)(PatternError.PatternMismatch(p, to, subject))
                    };
                  };
                  __PUCK__value__82 = __PUCK__value__84;
                };
                var tupleType = __PUCK__value__82;
                var __PUCK__value__85 = tupleType.kind;
                var __PUCK__value__86 = __PUCK__value__85;
                var __PUCK__value__87 = void 0;
                if ($unwrapTraitObject(__PUCK__value__86).kind == "Struct") {
                  var _$unwrapTraitObject38 = $unwrapTraitObject(__PUCK__value__86),
                      _$unwrapTraitObject39 = _slicedToArray(_$unwrapTraitObject38.value, 1),
                      struct = _$unwrapTraitObject39[0];

                  var __PUCK__value__88 = struct.kind;
                  var __PUCK__value__89 = __PUCK__value__88;
                  var __PUCK__value__90 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__89).kind == "Tuple") {
                    var _$unwrapTraitObject40 = $unwrapTraitObject(__PUCK__value__89),
                        _$unwrapTraitObject41 = _slicedToArray(_$unwrapTraitObject40.value, 1),
                        _tuple2 = _$unwrapTraitObject41[0];

                    __PUCK__value__90 = _tuple2.properties;
                  } else {
                    var __PUCK__value__91 = __PUCK__value__88;
                    var __PUCK__value__92 = void 0;
                    if (true) {
                      var __PUCK__value__93 = __PUCK__value__91;
                      return {
                        v: (0, _core.Err)(PatternError.PatternMismatch(p, p.type_, tupleType))
                      };
                    };
                    __PUCK__value__90 = __PUCK__value__92;
                  };
                  __PUCK__value__87 = __PUCK__value__90;
                } else {
                  var __PUCK__value__94 = __PUCK__value__85;
                  var __PUCK__value__95 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__94).kind == "Parameter") {
                    var _undefined6 = $unwrapTraitObject(__PUCK__value__94);
                    __PUCK__value__95 = [];
                  } else {
                    var __PUCK__value__96 = __PUCK__value__85;
                    var __PUCK__value__97 = void 0;
                    if (true) {
                      var __PUCK__value__98 = __PUCK__value__96;
                      return {
                        v: (0, _core.Err)(PatternError.PatternMismatch(p, p.type_, tupleType))
                      };
                    };
                    __PUCK__value__95 = __PUCK__value__97;
                  };
                  __PUCK__value__87 = __PUCK__value__95;
                };
                var props = __PUCK__value__87;
                if (!allowNotExhaustive && isNonExhaustive(typePath)) {
                  return {
                    v: (0, _core.Err)(PatternError.NotExhaustive)
                  };
                };
                var __PUCK__value__100 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$lib/stdlib/core.puck:List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$lib/stdlib/core.puck:List', value: tuple.properties, $isTraitObject: true });
                var __PUCK__value__99 = _core.Iterable[__PUCK__value__100.type].map.call(__PUCK__value__100, function (_ref9) {
                  var _ref10 = _slicedToArray(_ref9, 2),
                      p = _ref10[0],
                      i = _ref10[1];

                  return declarePatternVariables(scope, visitor, $unwrapTraitObject(p), mutable, props[i], allowNotExhaustive);
                });
                var properties = _core.Iterable[__PUCK__value__99.type].toList.call(__PUCK__value__99).reduce(function (acc, cur) {
                  return _core.Result.andThen.call(acc, function (__PUCK__value__101) {
                    return cur;
                  });
                }, (0, _core.Ok)([]));
                return {
                  v: properties
                };
              }();

              if ((typeof _ret4 === 'undefined' ? 'undefined' : _typeof(_ret4)) === "object") return _ret4.v;
            } else {
              var __PUCK__value__102 = __PUCK__value__16;
              if ($unwrapTraitObject(__PUCK__value__102).kind == "UnitType") {
                var _$unwrapTraitObject42 = $unwrapTraitObject(__PUCK__value__102),
                    _$unwrapTraitObject43 = _slicedToArray(_$unwrapTraitObject42.value, 1),
                    typePath = _$unwrapTraitObject43[0];

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
