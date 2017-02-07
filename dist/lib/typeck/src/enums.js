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

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};

function isIndividuallyExhaustive(p) {
  var __PUCK__value__1 = p;
  var __PUCK__value__2 = __PUCK__value__1;
  if ($unwrapTraitObject(__PUCK__value__2).kind == "CatchAll") {
    var _undefined = __PUCK__value__2;
    return true;
  } else {
    var __PUCK__value__3 = __PUCK__value__1;
    if ($unwrapTraitObject(__PUCK__value__3).kind == "Identifier") {
      var _PUCK__value__3$valu = _slicedToArray(__PUCK__value__3.value, 1),
          __PUCK__value__4 = _PUCK__value__3$valu[0];

      return true;
    } else {
      var __PUCK__value__5 = __PUCK__value__1;
      if ($unwrapTraitObject(__PUCK__value__5).kind == "Record") {
        var _PUCK__value__5$valu = _slicedToArray(__PUCK__value__5.value, 1),
            record = _PUCK__value__5$valu[0];

        return record.properties.every(function (p) {
          return isIndividuallyExhaustive($unwrapTraitObject(p).pattern);
        });
      } else {
        var __PUCK__value__6 = __PUCK__value__1;
        if ($unwrapTraitObject(__PUCK__value__6).kind == "RecordType") {
          var _PUCK__value__6$valu = _slicedToArray(__PUCK__value__6.value, 2),
              __PUCK__value__7 = _PUCK__value__6$valu[0],
              _record = _PUCK__value__6$valu[1];

          return _record.properties.every(function (p) {
            return isIndividuallyExhaustive($unwrapTraitObject(p).pattern);
          });
        } else {
          var __PUCK__value__8 = __PUCK__value__1;
          if ($unwrapTraitObject(__PUCK__value__8).kind == "Tuple") {
            var _PUCK__value__8$valu = _slicedToArray(__PUCK__value__8.value, 1),
                tuple = _PUCK__value__8$valu[0];

            return tuple.properties.every(isIndividuallyExhaustive);
          } else {
            var __PUCK__value__9 = __PUCK__value__1;
            if ($unwrapTraitObject(__PUCK__value__9).kind == "TupleType") {
              var _PUCK__value__9$valu = _slicedToArray(__PUCK__value__9.value, 2),
                  __PUCK__value__10 = _PUCK__value__9$valu[0],
                  _tuple = _PUCK__value__9$valu[1];

              return _tuple.properties.every(isIndividuallyExhaustive);
            } else {
              var __PUCK__value__11 = __PUCK__value__1;
              if ($unwrapTraitObject(__PUCK__value__11).kind == "UnitType") {
                var _PUCK__value__11$val = _slicedToArray(__PUCK__value__11.value, 1),
                    __PUCK__value__12 = _PUCK__value__11$val[0];

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
  var __PUCK__value__13 = typePath;
  var __PUCK__value__14 = __PUCK__value__13;
  if ($unwrapTraitObject(__PUCK__value__14).kind == "Member") {
    var _PUCK__value__14$val = _slicedToArray(__PUCK__value__14.value, 1),
        __PUCK__value__15 = _PUCK__value__14$val[0];

    return _core.None;
  } else {
    var __PUCK__value__16 = __PUCK__value__13;
    if ($unwrapTraitObject(__PUCK__value__16).kind == "_Object") {
      var _PUCK__value__16$val = _slicedToArray(__PUCK__value__16.value, 2),
          name = _PUCK__value__16$val[0].name,
          __PUCK__value__17 = _PUCK__value__16$val[1];

      var type_ = scope.getTypeBinding(name).type_;
      if (_entities.Type.isEnum.call(type_)) {
        return (0, _core.Some)(type_);
      } else {
        return _core.None;
      };
    };
  };
};
function getEnumMember(typePath) {
  var __PUCK__value__18 = typePath;
  var __PUCK__value__19 = __PUCK__value__18;
  if ($unwrapTraitObject(__PUCK__value__19).kind == "_Object") {
    var _PUCK__value__19$val = _slicedToArray(__PUCK__value__19.value, 2),
        __PUCK__value__20 = _PUCK__value__19$val[0],
        _typePath = _PUCK__value__19$val[1];

    var __PUCK__value__21 = _typePath;
    var __PUCK__value__22 = __PUCK__value__21;
    if ($unwrapTraitObject(__PUCK__value__22).kind == "Member") {
      var _PUCK__value__22$val = _slicedToArray(__PUCK__value__22.value, 1),
          member = _PUCK__value__22$val[0];

      return member.name;
    } else {
      var __PUCK__value__23 = __PUCK__value__21;
      if (true) {
        var __PUCK__value__24 = __PUCK__value__23;
        throw "Invalid typepath";
      };
    };
  } else {
    var __PUCK__value__25 = __PUCK__value__18;
    if (true) {
      var __PUCK__value__26 = __PUCK__value__25;
      throw "Invalid typepath";
    };
  };
};
function isEnumPattern(p) {
  var __PUCK__value__27 = p;
  var __PUCK__value__28 = __PUCK__value__27;
  if ($unwrapTraitObject(__PUCK__value__28).kind == "CatchAll") {
    var _undefined2 = __PUCK__value__28;
    return false;
  } else {
    var __PUCK__value__29 = __PUCK__value__27;
    if ($unwrapTraitObject(__PUCK__value__29).kind == "Identifier") {
      var _PUCK__value__29$val = _slicedToArray(__PUCK__value__29.value, 1),
          __PUCK__value__30 = _PUCK__value__29$val[0];

      return false;
    } else {
      var __PUCK__value__31 = __PUCK__value__27;
      if ($unwrapTraitObject(__PUCK__value__31).kind == "Record") {
        var _PUCK__value__31$val = _slicedToArray(__PUCK__value__31.value, 1),
            record = _PUCK__value__31$val[0];

        return false;
      } else {
        var __PUCK__value__32 = __PUCK__value__27;
        if ($unwrapTraitObject(__PUCK__value__32).kind == "RecordType") {
          var _PUCK__value__32$val = _slicedToArray(__PUCK__value__32.value, 2),
              __PUCK__value__33 = _PUCK__value__32$val[0],
              _record2 = _PUCK__value__32$val[1];

          return true;
        } else {
          var __PUCK__value__34 = __PUCK__value__27;
          if ($unwrapTraitObject(__PUCK__value__34).kind == "Tuple") {
            var _PUCK__value__34$val = _slicedToArray(__PUCK__value__34.value, 1),
                tuple = _PUCK__value__34$val[0];

            return false;
          } else {
            var __PUCK__value__35 = __PUCK__value__27;
            if ($unwrapTraitObject(__PUCK__value__35).kind == "TupleType") {
              var _PUCK__value__35$val = _slicedToArray(__PUCK__value__35.value, 2),
                  __PUCK__value__36 = _PUCK__value__35$val[0],
                  _tuple2 = _PUCK__value__35$val[1];

              return true;
            } else {
              var __PUCK__value__37 = __PUCK__value__27;
              if ($unwrapTraitObject(__PUCK__value__37).kind == "UnitType") {
                var _PUCK__value__37$val = _slicedToArray(__PUCK__value__37.value, 1),
                    __PUCK__value__38 = _PUCK__value__37$val[0];

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
  var __PUCK__value__39 = p;
  var __PUCK__value__40 = __PUCK__value__39;
  if ($unwrapTraitObject(__PUCK__value__40).kind == "CatchAll") {
    var _undefined3 = __PUCK__value__40;
    return false;
  } else {
    var __PUCK__value__41 = __PUCK__value__39;
    if ($unwrapTraitObject(__PUCK__value__41).kind == "Identifier") {
      var _PUCK__value__41$val = _slicedToArray(__PUCK__value__41.value, 1),
          __PUCK__value__42 = _PUCK__value__41$val[0];

      return false;
    } else {
      var __PUCK__value__43 = __PUCK__value__39;
      if ($unwrapTraitObject(__PUCK__value__43).kind == "Record") {
        var _PUCK__value__43$val = _slicedToArray(__PUCK__value__43.value, 1),
            record = _PUCK__value__43$val[0];

        return false;
      } else {
        var __PUCK__value__44 = __PUCK__value__39;
        if ($unwrapTraitObject(__PUCK__value__44).kind == "RecordType") {
          var _PUCK__value__44$val = _slicedToArray(__PUCK__value__44.value, 2),
              __PUCK__value__45 = _PUCK__value__44$val[0],
              _record3 = _PUCK__value__44$val[1];

          return _record3.properties.some(function (p) {
            return isEnumPattern($unwrapTraitObject(p).pattern);
          });
        } else {
          var __PUCK__value__46 = __PUCK__value__39;
          if ($unwrapTraitObject(__PUCK__value__46).kind == "Tuple") {
            var _PUCK__value__46$val = _slicedToArray(__PUCK__value__46.value, 1),
                tuple = _PUCK__value__46$val[0];

            return false;
          } else {
            var __PUCK__value__47 = __PUCK__value__39;
            if ($unwrapTraitObject(__PUCK__value__47).kind == "TupleType") {
              var _PUCK__value__47$val = _slicedToArray(__PUCK__value__47.value, 2),
                  __PUCK__value__48 = _PUCK__value__47$val[0],
                  _tuple3 = _PUCK__value__47$val[1];

              return _tuple3.properties.some(isEnumPattern);
            } else {
              var __PUCK__value__49 = __PUCK__value__39;
              if ($unwrapTraitObject(__PUCK__value__49).kind == "UnitType") {
                var _PUCK__value__49$val = _slicedToArray(__PUCK__value__49.value, 1),
                    __PUCK__value__50 = _PUCK__value__49$val[0];

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
  var __PUCK__value__51 = _ast.Expression.getType.call(e.expression).kind;
  if ($unwrapTraitObject(__PUCK__value__51).kind == "Enum") {
    var _PUCK__value__51$val = _slicedToArray(__PUCK__value__51.value, 1),
        enum_ = _PUCK__value__51$val[0];

    return checkExhaustiveEnum(_core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: e.patterns, $isTraitObject: true }, function (a) {
      return a.pattern;
    }), _ast.Expression.getType.call(e.expression), enum_, e.scope);
  } else {
    return (0, _core.Ok)([]);
  };
};
function getSubPatterns(pattern) {
  var __PUCK__value__52 = pattern;
  var __PUCK__value__53 = __PUCK__value__52;
  if ($unwrapTraitObject(__PUCK__value__53).kind == "RecordType") {
    var _PUCK__value__53$val = _slicedToArray(__PUCK__value__53.value, 2),
        __PUCK__value__54 = _PUCK__value__53$val[0],
        record = _PUCK__value__53$val[1];

    var __PUCK__value__55 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: record.properties, $isTraitObject: true }, function (p) {
      return p.pattern;
    });
    return _core.Iterable[__PUCK__value__55.type].toList.call(__PUCK__value__55);
  } else {
    var __PUCK__value__56 = __PUCK__value__52;
    if ($unwrapTraitObject(__PUCK__value__56).kind == "TupleType") {
      var _PUCK__value__56$val = _slicedToArray(__PUCK__value__56.value, 2),
          __PUCK__value__57 = _PUCK__value__56$val[0],
          tuple = _PUCK__value__56$val[1];

      return tuple.properties;
    } else {
      var __PUCK__value__58 = __PUCK__value__52;
      if (true) {
        var __PUCK__value__59 = __PUCK__value__58;
        return [];
      };
    };
  };
};
function checkExhaustiveEnum(patterns, type_, enum_, scope) {
  var typeName = _entities.Type.displayName.call(type_);
  var exhaustiveMap = _core.ObjectMap._new();
  var enumArmsMap = _core.ObjectMap._new();
  var __PUCK__value__60 = _core.Iterable[patterns.type].find.call(patterns, function (pattern) {
    var __PUCK__value__61 = pattern;
    var __PUCK__value__62 = __PUCK__value__61;
    var __PUCK__value__63 = void 0;
    if ($unwrapTraitObject(__PUCK__value__62).kind == "CatchAll") {
      var _undefined4 = __PUCK__value__62;
      return true;
    } else {
      var __PUCK__value__64 = __PUCK__value__61;
      var __PUCK__value__65 = void 0;
      if ($unwrapTraitObject(__PUCK__value__64).kind == "Identifier") {
        var _PUCK__value__64$val = _slicedToArray(__PUCK__value__64.value, 1),
            __PUCK__value__66 = _PUCK__value__64$val[0];

        return true;
      } else {
        var __PUCK__value__67 = __PUCK__value__61;
        var __PUCK__value__68 = void 0;
        if ($unwrapTraitObject(__PUCK__value__67).kind == "Record") {
          var _PUCK__value__67$val = _slicedToArray(__PUCK__value__67.value, 1),
              __PUCK__value__69 = _PUCK__value__67$val[0];

          throw "Invalid pattern";
        } else {
          var __PUCK__value__70 = __PUCK__value__61;
          var __PUCK__value__71 = void 0;
          if ($unwrapTraitObject(__PUCK__value__70).kind == "RecordType") {
            var _PUCK__value__70$val = _slicedToArray(__PUCK__value__70.value, 2),
                typePath = _PUCK__value__70$val[0],
                __PUCK__value__72 = _PUCK__value__70$val[1];

            __PUCK__value__71 = getEnumMember(typePath);
          } else {
            var __PUCK__value__73 = __PUCK__value__61;
            var __PUCK__value__74 = void 0;
            if ($unwrapTraitObject(__PUCK__value__73).kind == "Tuple") {
              var _PUCK__value__73$val = _slicedToArray(__PUCK__value__73.value, 1),
                  __PUCK__value__75 = _PUCK__value__73$val[0];

              throw "Invalid pattern";
            } else {
              var __PUCK__value__76 = __PUCK__value__61;
              var __PUCK__value__77 = void 0;
              if ($unwrapTraitObject(__PUCK__value__76).kind == "TupleType") {
                var _PUCK__value__76$val = _slicedToArray(__PUCK__value__76.value, 2),
                    _typePath2 = _PUCK__value__76$val[0],
                    __PUCK__value__78 = _PUCK__value__76$val[1];

                __PUCK__value__77 = getEnumMember(_typePath2);
              } else {
                var __PUCK__value__79 = __PUCK__value__61;
                var __PUCK__value__80 = void 0;
                if ($unwrapTraitObject(__PUCK__value__79).kind == "UnitType") {
                  var _PUCK__value__79$val = _slicedToArray(__PUCK__value__79.value, 1),
                      _typePath3 = _PUCK__value__79$val[0];

                  __PUCK__value__80 = getEnumMember(_typePath3);
                };
                __PUCK__value__77 = __PUCK__value__80;
              };
              __PUCK__value__74 = __PUCK__value__77;
            };
            __PUCK__value__71 = __PUCK__value__74;
          };
          __PUCK__value__68 = __PUCK__value__71;
        };
        __PUCK__value__65 = __PUCK__value__68;
      };
      __PUCK__value__63 = __PUCK__value__65;
    };
    var member = __PUCK__value__63;
    if (!exhaustiveMap[$unwrapTraitObject(member)]) {
      var individuallyExhaustive = isIndividuallyExhaustive(pattern);
      var isEnum = isEnumArm(pattern);
      exhaustiveMap[$unwrapTraitObject(member)] = individuallyExhaustive && !isEnum;
      if (isEnum) {
        if (!enumArmsMap[$unwrapTraitObject(member)]) {
          enumArmsMap[$unwrapTraitObject(member)] = [];
        };
        $unwrapTraitObject(enumArmsMap[$unwrapTraitObject(member)]).push(pattern);
      };
    };
    return false;
  });
  if ($unwrapTraitObject(__PUCK__value__60).kind == "Some") {
    var _PUCK__value__60$val = _slicedToArray(__PUCK__value__60.value, 1),
        __PUCK__value__81 = _PUCK__value__60$val[0];

    return (0, _core.Ok)([]);
  };
  var innerErrors = [];
  _core.ObjectMap.forEach.call(enumArmsMap, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        member = _ref2[0],
        patterns = _ref2[1];

    var enumPatterns = $unwrapTraitObject(_core.Iterable['$List<E>'].enumerate.call({ type: '$List<E>', value: getSubPatterns($unwrapTraitObject(patterns)[0]), $isTraitObject: true }).value.filter(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          pattern = _ref4[0],
          __PUCK__value__82 = _ref4[1];

      return isEnumPattern(pattern);
    })).map(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
          pattern = _ref6[0],
          index = _ref6[1];

      var p = pattern;
      var __PUCK__value__83 = p;
      var __PUCK__value__84 = __PUCK__value__83;
      var __PUCK__value__85 = void 0;
      if ($unwrapTraitObject(__PUCK__value__84).kind == "RecordType") {
        var _PUCK__value__84$val = _slicedToArray(__PUCK__value__84.value, 2),
            typePath = _PUCK__value__84$val[0],
            __PUCK__value__86 = _PUCK__value__84$val[1];

        __PUCK__value__85 = getEnumType(typePath, scope);
      } else {
        var __PUCK__value__87 = __PUCK__value__83;
        var __PUCK__value__88 = void 0;
        if ($unwrapTraitObject(__PUCK__value__87).kind == "TupleType") {
          var _PUCK__value__87$val = _slicedToArray(__PUCK__value__87.value, 2),
              _typePath4 = _PUCK__value__87$val[0],
              __PUCK__value__89 = _PUCK__value__87$val[1];

          __PUCK__value__88 = getEnumType(_typePath4, scope);
        } else {
          var __PUCK__value__90 = __PUCK__value__83;
          var __PUCK__value__91 = void 0;
          if ($unwrapTraitObject(__PUCK__value__90).kind == "UnitType") {
            var _PUCK__value__90$val = _slicedToArray(__PUCK__value__90.value, 1),
                _typePath5 = _PUCK__value__90$val[0];

            __PUCK__value__91 = getEnumType(_typePath5, scope);
          } else {
            var __PUCK__value__92 = __PUCK__value__83;
            var __PUCK__value__93 = void 0;
            if (true) {
              var __PUCK__value__94 = __PUCK__value__92;
              throw "Invalid pattern";
            };
            __PUCK__value__91 = __PUCK__value__93;
          };
          __PUCK__value__88 = __PUCK__value__91;
        };
        __PUCK__value__85 = __PUCK__value__88;
      };
      var type_ = __PUCK__value__85;
      var __PUCK__value__95 = type_;
      var __PUCK__value__96 = void 0;
      if ($unwrapTraitObject(__PUCK__value__95).kind == "Some") {
        var _PUCK__value__95$val = _slicedToArray(__PUCK__value__95.value, 1),
            _type_ = _PUCK__value__95$val[0];

        __PUCK__value__96 = _entities.Type.getEnum.call(_type_);
      } else {
        throw "no type";
      };
      var enum_ = __PUCK__value__96;
      var subPatterns = $unwrapTraitObject($unwrapTraitObject(patterns).map(getSubPatterns)).map(function (subPatterns) {
        return $unwrapTraitObject(subPatterns)[$unwrapTraitObject(index)];
      });
      return [_core.Option.unwrap.call(type_), enum_, subPatterns];
    });
    var errors = $unwrapTraitObject($unwrapTraitObject(enumPatterns).map(function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 3),
          type_ = _ref8[0],
          enum_ = _ref8[1],
          subPatterns = _ref8[2];

      return checkExhaustiveEnum({ type: '$List<E>', value: subPatterns, $isTraitObject: true }, type_, enum_, scope);
    })).filter(function (result) {
      return _core.Result.isErr.call(result);
    });
    innerErrors = innerErrors.concat(errors);
    return exhaustiveMap[member] = $unwrapTraitObject(errors).length == 0;
  });
  if (innerErrors.length > 0) {
    return innerErrors[0];
  };
  var mapSize = _core.ObjectMap.size.call(exhaustiveMap);
  var memberCount = _core.ObjectMap.size.call(enum_.members);
  if (mapSize == memberCount - 1) {
    var _Option$unwrap$call = _core.Option.unwrap.call(_core.ObjectMap.find.call(enum_.members, function (_ref9) {
      var _ref10 = _slicedToArray(_ref9, 2),
          member = _ref10[0],
          __PUCK__value__97 = _ref10[1];

      return !exhaustiveMap[member];
    })),
        _Option$unwrap$call2 = _slicedToArray(_Option$unwrap$call, 2),
        missing = _Option$unwrap$call2[0],
        __PUCK__value__98 = _Option$unwrap$call2[1];

    return (0, _core.Err)("Match is not exhaustive. It is missing a case for " + typeName + "::" + missing + "");
  } else {
    if (mapSize < memberCount) {
      return (0, _core.Err)("Match is not exhaustive.");
    } else {
      var __PUCK__value__99 = _core.ObjectMap.find.call(exhaustiveMap, function (_ref11) {
        var _ref12 = _slicedToArray(_ref11, 2),
            __PUCK__value__100 = _ref12[0],
            exhaustive = _ref12[1];

        return !exhaustive;
      });
      if ($unwrapTraitObject(__PUCK__value__99).kind == "Some") {
        var _PUCK__value__99$val = _slicedToArray(__PUCK__value__99.value, 1),
            _PUCK__value__99$val$ = _slicedToArray(_PUCK__value__99$val[0], 2),
            member = _PUCK__value__99$val$[0],
            a = _PUCK__value__99$val$[1];

        return (0, _core.Err)("Match is not exhaustive. " + typeName + "::" + member + " is not exhaustive. " + a + "");
      };
    };
  };
  return (0, _core.Ok)([]);
}
