'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.getEnumType = getEnumType;
exports.getEnumMember = getEnumMember;
exports.checkExhaustive = checkExhaustive;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _ast = require('./../../ast/ast');

var _entities = require('./../../entities');

var _scope = require('./scope');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};

function isIndividuallyExhaustive(p) {
  var __PUCK__value__1 = p;
  if ($unwrapTraitObject(__PUCK__value__1).kind == "CatchAll") {
    var _undefined = $unwrapTraitObject(__PUCK__value__1);
    return true;
  } else {
    if ($unwrapTraitObject(__PUCK__value__1).kind == "Identifier") {
      var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__1),
          _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
          __PUCK__value__2 = _$unwrapTraitObject$v[0];

      return true;
    } else {
      if ($unwrapTraitObject(__PUCK__value__1).kind == "Record") {
        var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__1),
            _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
            record = _$unwrapTraitObject2$[0];

        return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: record.properties, $isTraitObject: true }, function (p) {
          return isIndividuallyExhaustive(p.pattern);
        });
      } else {
        if ($unwrapTraitObject(__PUCK__value__1).kind == "RecordType") {
          var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__1),
              _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 2),
              __PUCK__value__3 = _$unwrapTraitObject3$[0],
              _record = _$unwrapTraitObject3$[1];

          return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _record.properties, $isTraitObject: true }, function (p) {
            return isIndividuallyExhaustive(p.pattern);
          });
        } else {
          if ($unwrapTraitObject(__PUCK__value__1).kind == "Tuple") {
            var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__1),
                _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
                tuple = _$unwrapTraitObject4$[0];

            return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true }, isIndividuallyExhaustive);
          } else {
            if ($unwrapTraitObject(__PUCK__value__1).kind == "TupleType") {
              var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__1),
                  _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 2),
                  __PUCK__value__4 = _$unwrapTraitObject5$[0],
                  _tuple = _$unwrapTraitObject5$[1];

              return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _tuple.properties, $isTraitObject: true }, isIndividuallyExhaustive);
            } else {
              if ($unwrapTraitObject(__PUCK__value__1).kind == "UnitType") {
                var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__1),
                    _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
                    __PUCK__value__5 = _$unwrapTraitObject6$[0];

                return true;
              };
            };
          };
        };
      };
    };
  };
};
function getEnumType(typePath, scope) {
  var __PUCK__value__6 = typePath;
  if ($unwrapTraitObject(__PUCK__value__6).kind == "Member") {
    var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__6),
        _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
        __PUCK__value__7 = _$unwrapTraitObject7$[0];

    return _core.None;
  } else {
    if ($unwrapTraitObject(__PUCK__value__6).kind == "_Object") {
      var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__6),
          _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 2),
          name = _$unwrapTraitObject8$[0].name,
          __PUCK__value__8 = _$unwrapTraitObject8$[1];

      return _core.Option.andThen.call(_core.Option.andThen.call(_scope.Scope.getBinding.call(scope, name), function (binding) {
        return binding.type_.providesType;
      }), function (type_) {
        if (_entities.Type.isEnum.call(type_)) {
          return (0, _core.Some)(type_);
        } else {
          return _core.None;
        };
      });
    };
  };
};
function getEnumMember(typePath) {
  var typePathType = $unwrapTraitObject(typePath.type_);

  var _Option$unwrap$call = _core.Option.unwrap.call(typePathType.enumMember),
      _Option$unwrap$call2 = _slicedToArray(_Option$unwrap$call, 2),
      member = _Option$unwrap$call2[0],
      __PUCK__value__9 = _Option$unwrap$call2[1];

  return member;
};
function isEnumPattern(p) {
  var __PUCK__value__10 = p;
  if ($unwrapTraitObject(__PUCK__value__10).kind == "CatchAll") {
    var _undefined2 = $unwrapTraitObject(__PUCK__value__10);
    return false;
  } else {
    if ($unwrapTraitObject(__PUCK__value__10).kind == "Identifier") {
      var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__10),
          _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
          __PUCK__value__11 = _$unwrapTraitObject9$[0];

      return false;
    } else {
      if ($unwrapTraitObject(__PUCK__value__10).kind == "Record") {
        var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__10),
            _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
            record = _$unwrapTraitObject11[0];

        return false;
      } else {
        if ($unwrapTraitObject(__PUCK__value__10).kind == "RecordType") {
          var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__10),
              _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12.value, 2),
              __PUCK__value__12 = _$unwrapTraitObject13[0],
              _record2 = _$unwrapTraitObject13[1];

          return true;
        } else {
          if ($unwrapTraitObject(__PUCK__value__10).kind == "Tuple") {
            var _$unwrapTraitObject14 = $unwrapTraitObject(__PUCK__value__10),
                _$unwrapTraitObject15 = _slicedToArray(_$unwrapTraitObject14.value, 1),
                tuple = _$unwrapTraitObject15[0];

            return false;
          } else {
            if ($unwrapTraitObject(__PUCK__value__10).kind == "TupleType") {
              var _$unwrapTraitObject16 = $unwrapTraitObject(__PUCK__value__10),
                  _$unwrapTraitObject17 = _slicedToArray(_$unwrapTraitObject16.value, 2),
                  __PUCK__value__13 = _$unwrapTraitObject17[0],
                  _tuple2 = _$unwrapTraitObject17[1];

              return true;
            } else {
              if ($unwrapTraitObject(__PUCK__value__10).kind == "UnitType") {
                var _$unwrapTraitObject18 = $unwrapTraitObject(__PUCK__value__10),
                    _$unwrapTraitObject19 = _slicedToArray(_$unwrapTraitObject18.value, 1),
                    __PUCK__value__14 = _$unwrapTraitObject19[0];

                return true;
              };
            };
          };
        };
      };
    };
  };
};
function isEnumArm(p) {
  var __PUCK__value__15 = p;
  if ($unwrapTraitObject(__PUCK__value__15).kind == "CatchAll") {
    var _undefined3 = $unwrapTraitObject(__PUCK__value__15);
    return false;
  } else {
    if ($unwrapTraitObject(__PUCK__value__15).kind == "Identifier") {
      var _$unwrapTraitObject20 = $unwrapTraitObject(__PUCK__value__15),
          _$unwrapTraitObject21 = _slicedToArray(_$unwrapTraitObject20.value, 1),
          __PUCK__value__16 = _$unwrapTraitObject21[0];

      return false;
    } else {
      if ($unwrapTraitObject(__PUCK__value__15).kind == "Record") {
        var _$unwrapTraitObject22 = $unwrapTraitObject(__PUCK__value__15),
            _$unwrapTraitObject23 = _slicedToArray(_$unwrapTraitObject22.value, 1),
            record = _$unwrapTraitObject23[0];

        return false;
      } else {
        if ($unwrapTraitObject(__PUCK__value__15).kind == "RecordType") {
          var _$unwrapTraitObject24 = $unwrapTraitObject(__PUCK__value__15),
              _$unwrapTraitObject25 = _slicedToArray(_$unwrapTraitObject24.value, 2),
              __PUCK__value__17 = _$unwrapTraitObject25[0],
              _record3 = _$unwrapTraitObject25[1];

          return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _record3.properties, $isTraitObject: true }, function (p) {
            return isEnumPattern(p.pattern);
          });
        } else {
          if ($unwrapTraitObject(__PUCK__value__15).kind == "Tuple") {
            var _$unwrapTraitObject26 = $unwrapTraitObject(__PUCK__value__15),
                _$unwrapTraitObject27 = _slicedToArray(_$unwrapTraitObject26.value, 1),
                tuple = _$unwrapTraitObject27[0];

            return false;
          } else {
            if ($unwrapTraitObject(__PUCK__value__15).kind == "TupleType") {
              var _$unwrapTraitObject28 = $unwrapTraitObject(__PUCK__value__15),
                  _$unwrapTraitObject29 = _slicedToArray(_$unwrapTraitObject28.value, 2),
                  __PUCK__value__18 = _$unwrapTraitObject29[0],
                  _tuple3 = _$unwrapTraitObject29[1];

              return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _tuple3.properties, $isTraitObject: true }, isEnumPattern);
            } else {
              if ($unwrapTraitObject(__PUCK__value__15).kind == "UnitType") {
                var _$unwrapTraitObject30 = $unwrapTraitObject(__PUCK__value__15),
                    _$unwrapTraitObject31 = _slicedToArray(_$unwrapTraitObject30.value, 1),
                    __PUCK__value__19 = _$unwrapTraitObject31[0];

                return false;
              };
            };
          };
        };
      };
    };
  };
};
function checkExhaustive(e) {
  var __PUCK__value__20 = _ast.Expression.getType.call(e.expression).kind;
  if (__PUCK__value__20.kind == "Enum") {
    var _PUCK__value__20$val = _slicedToArray(__PUCK__value__20.value, 1),
        enum_ = _PUCK__value__20$val[0];

    return checkExhaustiveEnum(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true }, function (a) {
      return a.pattern;
    }), _ast.Expression.getType.call(e.expression), enum_, $unwrapTraitObject(e.scope));
  } else {
    return (0, _core.Ok)([]);
  };
};
function getSubPatterns(pattern) {
  var __PUCK__value__21 = pattern;
  if ($unwrapTraitObject(__PUCK__value__21).kind == "RecordType") {
    var _$unwrapTraitObject32 = $unwrapTraitObject(__PUCK__value__21),
        _$unwrapTraitObject33 = _slicedToArray(_$unwrapTraitObject32.value, 2),
        __PUCK__value__22 = _$unwrapTraitObject33[0],
        record = _$unwrapTraitObject33[1];

    var __PUCK__value__23 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: record.properties, $isTraitObject: true }, function (p) {
      return p.pattern;
    });
    return _core.Iterable[__PUCK__value__23.type].toList.call(__PUCK__value__23);
  } else {
    if ($unwrapTraitObject(__PUCK__value__21).kind == "TupleType") {
      var _$unwrapTraitObject34 = $unwrapTraitObject(__PUCK__value__21),
          _$unwrapTraitObject35 = _slicedToArray(_$unwrapTraitObject34.value, 2),
          __PUCK__value__24 = _$unwrapTraitObject35[0],
          tuple = _$unwrapTraitObject35[1];

      return tuple.properties;
    } else {
      if (true) {
        var __PUCK__value__25 = __PUCK__value__21;
        return [];
      };
    };
  };
};
function checkExhaustiveEnum(patterns, type_, enum_, scope) {
  var typeName = _entities.Type.displayName.call(type_);
  var exhaustiveMap = _core.ObjectMap._new();
  var enumArmsMap = _core.ObjectMap._new();
  var __PUCK__value__26 = _core.Iterable[patterns.type].find.call(patterns, function (pattern) {
    var __PUCK__value__27 = pattern;
    var __PUCK__value__28 = void 0;
    if ($unwrapTraitObject(__PUCK__value__27).kind == "CatchAll") {
      var _undefined4 = $unwrapTraitObject(__PUCK__value__27);
      return true;
    } else {
      var __PUCK__value__29 = void 0;
      if ($unwrapTraitObject(__PUCK__value__27).kind == "Identifier") {
        var _$unwrapTraitObject36 = $unwrapTraitObject(__PUCK__value__27),
            _$unwrapTraitObject37 = _slicedToArray(_$unwrapTraitObject36.value, 1),
            __PUCK__value__30 = _$unwrapTraitObject37[0];

        return true;
      } else {
        var __PUCK__value__31 = void 0;
        if ($unwrapTraitObject(__PUCK__value__27).kind == "Record") {
          var _$unwrapTraitObject38 = $unwrapTraitObject(__PUCK__value__27),
              _$unwrapTraitObject39 = _slicedToArray(_$unwrapTraitObject38.value, 1),
              __PUCK__value__32 = _$unwrapTraitObject39[0];

          throw "Invalid pattern";
        } else {
          var __PUCK__value__33 = void 0;
          if ($unwrapTraitObject(__PUCK__value__27).kind == "RecordType") {
            var _$unwrapTraitObject40 = $unwrapTraitObject(__PUCK__value__27),
                _$unwrapTraitObject41 = _slicedToArray(_$unwrapTraitObject40.value, 2),
                typePath = _$unwrapTraitObject41[0],
                __PUCK__value__34 = _$unwrapTraitObject41[1];

            __PUCK__value__33 = getEnumMember(typePath);
          } else {
            var __PUCK__value__35 = void 0;
            if ($unwrapTraitObject(__PUCK__value__27).kind == "Tuple") {
              var _$unwrapTraitObject42 = $unwrapTraitObject(__PUCK__value__27),
                  _$unwrapTraitObject43 = _slicedToArray(_$unwrapTraitObject42.value, 1),
                  __PUCK__value__36 = _$unwrapTraitObject43[0];

              throw "Invalid pattern";
            } else {
              var __PUCK__value__37 = void 0;
              if ($unwrapTraitObject(__PUCK__value__27).kind == "TupleType") {
                var _$unwrapTraitObject44 = $unwrapTraitObject(__PUCK__value__27),
                    _$unwrapTraitObject45 = _slicedToArray(_$unwrapTraitObject44.value, 2),
                    _typePath = _$unwrapTraitObject45[0],
                    __PUCK__value__38 = _$unwrapTraitObject45[1];

                __PUCK__value__37 = getEnumMember(_typePath);
              } else {
                var __PUCK__value__39 = void 0;
                if ($unwrapTraitObject(__PUCK__value__27).kind == "UnitType") {
                  var _$unwrapTraitObject46 = $unwrapTraitObject(__PUCK__value__27),
                      _$unwrapTraitObject47 = _slicedToArray(_$unwrapTraitObject46.value, 1),
                      _typePath2 = _$unwrapTraitObject47[0];

                  __PUCK__value__39 = getEnumMember(_typePath2);
                };
                __PUCK__value__37 = __PUCK__value__39;
              };
              __PUCK__value__35 = __PUCK__value__37;
            };
            __PUCK__value__33 = __PUCK__value__35;
          };
          __PUCK__value__31 = __PUCK__value__33;
        };
        __PUCK__value__29 = __PUCK__value__31;
      };
      __PUCK__value__28 = __PUCK__value__29;
    };
    var member = __PUCK__value__28;
    if (!_core.Option.unwrapOr.call(_core.ObjectMap.get.call(exhaustiveMap, member), false)) {
      var individuallyExhaustive = isIndividuallyExhaustive(pattern);
      var isEnum = isEnumArm(pattern);
      exhaustiveMap[$unwrapTraitObject(member)] = individuallyExhaustive && !isEnum;
      if (isEnum) {
        if (!_core.ObjectMap.has.call(enumArmsMap, member)) {
          enumArmsMap[$unwrapTraitObject(member)] = [];
        };
        _core.List.push.call(_core.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({ type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: enumArmsMap, $isTraitObject: true }, member), pattern);
      };
    };
    return false;
  });
  if (__PUCK__value__26.kind == "Some") {
    var _PUCK__value__26$val = _slicedToArray(__PUCK__value__26.value, 1),
        __PUCK__value__40 = _PUCK__value__26$val[0];

    return (0, _core.Ok)([]);
  };
  var innerErrors = [];
  _core.ObjectMap.forEach.call(enumArmsMap, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        member = _ref2[0],
        patterns = _ref2[1];

    var __PUCK__value__42 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: getSubPatterns(_core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: patterns, $isTraitObject: true }, 0)), $isTraitObject: true });
    var __PUCK__value__41 = _core.Iterable[__PUCK__value__42.type].filter.call(__PUCK__value__42, function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          __PUCK__value__43 = _ref4[0],
          pattern = _ref4[1];

      return isEnumPattern(pattern);
    });
    var enumPatterns = _core.Iterable[__PUCK__value__41.type].map.call(__PUCK__value__41, function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
          index = _ref6[0],
          pattern = _ref6[1];

      var __PUCK__value__44 = pattern;
      var __PUCK__value__45 = void 0;
      if ($unwrapTraitObject(__PUCK__value__44).kind == "RecordType") {
        var _$unwrapTraitObject48 = $unwrapTraitObject(__PUCK__value__44),
            _$unwrapTraitObject49 = _slicedToArray(_$unwrapTraitObject48.value, 2),
            typePath = _$unwrapTraitObject49[0],
            __PUCK__value__46 = _$unwrapTraitObject49[1];

        __PUCK__value__45 = getEnumType(typePath, scope);
      } else {
        var __PUCK__value__47 = void 0;
        if ($unwrapTraitObject(__PUCK__value__44).kind == "TupleType") {
          var _$unwrapTraitObject50 = $unwrapTraitObject(__PUCK__value__44),
              _$unwrapTraitObject51 = _slicedToArray(_$unwrapTraitObject50.value, 2),
              _typePath3 = _$unwrapTraitObject51[0],
              __PUCK__value__48 = _$unwrapTraitObject51[1];

          __PUCK__value__47 = getEnumType(_typePath3, scope);
        } else {
          var __PUCK__value__49 = void 0;
          if ($unwrapTraitObject(__PUCK__value__44).kind == "UnitType") {
            var _$unwrapTraitObject52 = $unwrapTraitObject(__PUCK__value__44),
                _$unwrapTraitObject53 = _slicedToArray(_$unwrapTraitObject52.value, 1),
                _typePath4 = _$unwrapTraitObject53[0];

            __PUCK__value__49 = getEnumType(_typePath4, scope);
          } else {
            var __PUCK__value__50 = void 0;
            if (true) {
              var __PUCK__value__51 = __PUCK__value__44;
              throw "Invalid pattern";
            };
            __PUCK__value__49 = __PUCK__value__50;
          };
          __PUCK__value__47 = __PUCK__value__49;
        };
        __PUCK__value__45 = __PUCK__value__47;
      };
      var type_ = __PUCK__value__45;
      var __PUCK__value__52 = type_;
      var __PUCK__value__53 = void 0;
      if (__PUCK__value__52.kind == "Some") {
        var _PUCK__value__52$val = _slicedToArray(__PUCK__value__52.value, 1),
            _type_ = _PUCK__value__52$val[0];

        __PUCK__value__53 = _entities.Type.getEnum.call(_type_);
      } else {
        throw "no type";
      };
      var enum_ = __PUCK__value__53;
      var __PUCK__value__55 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: patterns, $isTraitObject: true }, getSubPatterns);
      var __PUCK__value__54 = _core.Iterable[__PUCK__value__55.type].map.call(__PUCK__value__55, function (subPatterns) {
        return _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: subPatterns, $isTraitObject: true }, index);
      });
      var subPatterns = _core.Iterable[__PUCK__value__54.type].toList.call(__PUCK__value__54);
      return [_core.Option.unwrap.call(type_), enum_, subPatterns];
    });
    var __PUCK__value__57 = _core.Iterable[enumPatterns.type].map.call(enumPatterns, function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 3),
          type_ = _ref8[0],
          enum_ = _ref8[1],
          subPatterns = _ref8[2];

      return checkExhaustiveEnum({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: subPatterns, $isTraitObject: true }, type_, enum_, scope);
    });
    var __PUCK__value__56 = _core.Iterable[__PUCK__value__57.type].filter.call(__PUCK__value__57, function (result) {
      return _core.Result.isErr.call(result);
    });
    var errors = _core.Iterable[__PUCK__value__56.type].toList.call(__PUCK__value__56);
    innerErrors = $unwrapTraitObject(innerErrors.concat(errors));
    return exhaustiveMap[member] = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: errors, $isTraitObject: true }) == 0;
  });
  if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: innerErrors, $isTraitObject: true }) > 0) {
    return _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: innerErrors, $isTraitObject: true }, 0);
  };
  var mapSize = _core.ObjectMap.size.call(exhaustiveMap);
  var memberCount = _core.ObjectMap.size.call(enum_.members);
  if (mapSize == memberCount - 1) {
    var _Option$unwrap$call3 = _core.Option.unwrap.call(_core.ObjectMap.find.call(enum_.members, function (_ref9) {
      var _ref10 = _slicedToArray(_ref9, 2),
          member = _ref10[0],
          __PUCK__value__58 = _ref10[1];

      return !_core.Option.unwrapOr.call(_core.ObjectMap.get.call(exhaustiveMap, member), false);
    })),
        _Option$unwrap$call4 = _slicedToArray(_Option$unwrap$call3, 2),
        missing = _Option$unwrap$call4[0],
        __PUCK__value__59 = _Option$unwrap$call4[1];

    return (0, _core.Err)("Match is not exhaustive. It is missing a case for " + typeName + "::" + missing + "");
  } else {
    if (mapSize < memberCount) {
      return (0, _core.Err)("Match is not exhaustive.");
    } else {
      var __PUCK__value__60 = _core.ObjectMap.find.call(exhaustiveMap, function (_ref11) {
        var _ref12 = _slicedToArray(_ref11, 2),
            __PUCK__value__61 = _ref12[0],
            exhaustive = _ref12[1];

        return !exhaustive;
      });
      if (__PUCK__value__60.kind == "Some") {
        var _PUCK__value__60$val = _slicedToArray(__PUCK__value__60.value, 1),
            _PUCK__value__60$val$ = _slicedToArray(_PUCK__value__60$val[0], 2),
            member = _PUCK__value__60$val$[0],
            a = _PUCK__value__60$val$[1];

        return (0, _core.Err)("Match is not exhaustive. " + typeName + "::" + member + " is not exhaustive. " + a + "");
      } else {
        return (0, _core.Ok)([]);
      };
    };
  };
}
