#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.getEnumMember = getEnumMember;
exports.checkExhaustive = checkExhaustive;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _ast = require('./../../ast/ast.js');

var _entities = require('./../../entities.js');

function isIndividuallyExhaustive(p) {
  var __PUCK__value__1 = p;
  var __PUCK__value__2 = __PUCK__value__1;
  if (__PUCK__value__2.kind == "CatchAll") {
    var _undefined = __PUCK__value__2;
    return true;
  } else {
    var __PUCK__value__3 = __PUCK__value__1;
    if (__PUCK__value__3.kind == "Identifier") {
      var _PUCK__value__3$valu = _slicedToArray(__PUCK__value__3.value, 1);

      var __PUCK__value__4 = _PUCK__value__3$valu[0];

      return true;
    } else {
      var __PUCK__value__5 = __PUCK__value__1;
      if (__PUCK__value__5.kind == "Record") {
        var _PUCK__value__5$valu = _slicedToArray(__PUCK__value__5.value, 1);

        var record = _PUCK__value__5$valu[0];

        return record.properties.every(function (p) {
          return isIndividuallyExhaustive(p.pattern);
        });
      } else {
        var __PUCK__value__6 = __PUCK__value__1;
        if (__PUCK__value__6.kind == "RecordType") {
          var _PUCK__value__6$valu = _slicedToArray(__PUCK__value__6.value, 2);

          var __PUCK__value__7 = _PUCK__value__6$valu[0];
          var _record = _PUCK__value__6$valu[1];

          return _record.properties.every(function (p) {
            return isIndividuallyExhaustive(p.pattern);
          });
        } else {
          var __PUCK__value__8 = __PUCK__value__1;
          if (__PUCK__value__8.kind == "Tuple") {
            var _PUCK__value__8$valu = _slicedToArray(__PUCK__value__8.value, 1);

            var tuple = _PUCK__value__8$valu[0];

            return tuple.properties.every(isIndividuallyExhaustive);
          } else {
            var __PUCK__value__9 = __PUCK__value__1;
            if (__PUCK__value__9.kind == "TupleType") {
              var _PUCK__value__9$valu = _slicedToArray(__PUCK__value__9.value, 2);

              var __PUCK__value__10 = _PUCK__value__9$valu[0];
              var _tuple = _PUCK__value__9$valu[1];

              return _tuple.properties.every(isIndividuallyExhaustive);
            } else {
              var __PUCK__value__11 = __PUCK__value__1;
              if (__PUCK__value__11.kind == "UnitType") {
                var _PUCK__value__11$val = _slicedToArray(__PUCK__value__11.value, 1);

                var __PUCK__value__12 = _PUCK__value__11$val[0];

                return true;
              };
            };
          };
        };
      };
    };
  };
};
function getEnumMember(typePath) {
  var __PUCK__value__13 = typePath;
  var __PUCK__value__14 = __PUCK__value__13;
  if (__PUCK__value__14.kind == "_Object") {
    var _PUCK__value__14$val = _slicedToArray(__PUCK__value__14.value, 2);

    var __PUCK__value__15 = _PUCK__value__14$val[0];
    var _typePath = _PUCK__value__14$val[1];

    var __PUCK__value__16 = _typePath;
    var __PUCK__value__17 = __PUCK__value__16;
    if (__PUCK__value__17.kind == "Member") {
      var _PUCK__value__17$val = _slicedToArray(__PUCK__value__17.value, 1);

      var member = _PUCK__value__17$val[0];

      return member.name;
    } else {
      var __PUCK__value__18 = __PUCK__value__16;
      if (true) {
        var __PUCK__value__19 = __PUCK__value__18;
        throw "Invalid typepath";
      };
    };
  } else {
    var __PUCK__value__20 = __PUCK__value__13;
    if (true) {
      var __PUCK__value__21 = __PUCK__value__20;
      throw "Invalid typepath";
    };
  };
};
function isEnumPattern(p) {
  var __PUCK__value__22 = p;
  var __PUCK__value__23 = __PUCK__value__22;
  if (__PUCK__value__23.kind == "CatchAll") {
    var _undefined2 = __PUCK__value__23;
    return false;
  } else {
    var __PUCK__value__24 = __PUCK__value__22;
    if (__PUCK__value__24.kind == "Identifier") {
      var _PUCK__value__24$val = _slicedToArray(__PUCK__value__24.value, 1);

      var __PUCK__value__25 = _PUCK__value__24$val[0];

      return false;
    } else {
      var __PUCK__value__26 = __PUCK__value__22;
      if (__PUCK__value__26.kind == "Record") {
        var _PUCK__value__26$val = _slicedToArray(__PUCK__value__26.value, 1);

        var record = _PUCK__value__26$val[0];

        return false;
      } else {
        var __PUCK__value__27 = __PUCK__value__22;
        if (__PUCK__value__27.kind == "RecordType") {
          var _PUCK__value__27$val = _slicedToArray(__PUCK__value__27.value, 2);

          var __PUCK__value__28 = _PUCK__value__27$val[0];
          var _record2 = _PUCK__value__27$val[1];

          return true;
        } else {
          var __PUCK__value__29 = __PUCK__value__22;
          if (__PUCK__value__29.kind == "Tuple") {
            var _PUCK__value__29$val = _slicedToArray(__PUCK__value__29.value, 1);

            var tuple = _PUCK__value__29$val[0];

            return false;
          } else {
            var __PUCK__value__30 = __PUCK__value__22;
            if (__PUCK__value__30.kind == "TupleType") {
              var _PUCK__value__30$val = _slicedToArray(__PUCK__value__30.value, 2);

              var __PUCK__value__31 = _PUCK__value__30$val[0];
              var _tuple2 = _PUCK__value__30$val[1];

              return true;
            } else {
              var __PUCK__value__32 = __PUCK__value__22;
              if (__PUCK__value__32.kind == "UnitType") {
                var _PUCK__value__32$val = _slicedToArray(__PUCK__value__32.value, 1);

                var __PUCK__value__33 = _PUCK__value__32$val[0];

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
  var __PUCK__value__34 = p;
  var __PUCK__value__35 = __PUCK__value__34;
  if (__PUCK__value__35.kind == "CatchAll") {
    var _undefined3 = __PUCK__value__35;
    return false;
  } else {
    var __PUCK__value__36 = __PUCK__value__34;
    if (__PUCK__value__36.kind == "Identifier") {
      var _PUCK__value__36$val = _slicedToArray(__PUCK__value__36.value, 1);

      var __PUCK__value__37 = _PUCK__value__36$val[0];

      return false;
    } else {
      var __PUCK__value__38 = __PUCK__value__34;
      if (__PUCK__value__38.kind == "Record") {
        var _PUCK__value__38$val = _slicedToArray(__PUCK__value__38.value, 1);

        var record = _PUCK__value__38$val[0];

        return false;
      } else {
        var __PUCK__value__39 = __PUCK__value__34;
        if (__PUCK__value__39.kind == "RecordType") {
          var _PUCK__value__39$val = _slicedToArray(__PUCK__value__39.value, 2);

          var __PUCK__value__40 = _PUCK__value__39$val[0];
          var _record3 = _PUCK__value__39$val[1];

          return _record3.properties.some(function (p) {
            return isEnumPattern(p.pattern);
          });
        } else {
          var __PUCK__value__41 = __PUCK__value__34;
          if (__PUCK__value__41.kind == "Tuple") {
            var _PUCK__value__41$val = _slicedToArray(__PUCK__value__41.value, 1);

            var tuple = _PUCK__value__41$val[0];

            return false;
          } else {
            var __PUCK__value__42 = __PUCK__value__34;
            if (__PUCK__value__42.kind == "TupleType") {
              var _PUCK__value__42$val = _slicedToArray(__PUCK__value__42.value, 2);

              var __PUCK__value__43 = _PUCK__value__42$val[0];
              var _tuple3 = _PUCK__value__42$val[1];

              return _tuple3.properties.some(isEnumPattern);
            } else {
              var __PUCK__value__44 = __PUCK__value__34;
              if (__PUCK__value__44.kind == "UnitType") {
                var _PUCK__value__44$val = _slicedToArray(__PUCK__value__44.value, 1);

                var __PUCK__value__45 = _PUCK__value__44$val[0];

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
  var __PUCK__value__46 = e.type_.kind;
  if (__PUCK__value__46.kind == "Enum") {
    var _PUCK__value__46$val = _slicedToArray(__PUCK__value__46.value, 1);

    var enum_ = _PUCK__value__46$val[0];

    return checkExhaustiveEnum(_core.Iterable['$List'].map.call(e.patterns, function (a) {
      return a.pattern;
    }), e.type_, enum_);
  } else {
    return (0, _core.Ok)([]);
  };
};
function getSubPatterns(pattern) {
  var __PUCK__value__47 = pattern;
  var __PUCK__value__48 = __PUCK__value__47;
  if (__PUCK__value__48.kind == "RecordType") {
    var _PUCK__value__48$val = _slicedToArray(__PUCK__value__48.value, 2);

    var __PUCK__value__49 = _PUCK__value__48$val[0];
    var record = _PUCK__value__48$val[1];

    return _core.Iterable['$List'].map.call(record.properties, function (p) {
      return p.pattern;
    });
  } else {
    var __PUCK__value__50 = __PUCK__value__47;
    if (__PUCK__value__50.kind == "TupleType") {
      var _PUCK__value__50$val = _slicedToArray(__PUCK__value__50.value, 2);

      var __PUCK__value__51 = _PUCK__value__50$val[0];
      var tuple = _PUCK__value__50$val[1];

      return tuple.properties;
    } else {
      var __PUCK__value__52 = __PUCK__value__47;
      if (true) {
        var __PUCK__value__53 = __PUCK__value__52;
        return [];
      };
    };
  };
};
function checkExhaustiveEnum(patterns, type_, enum_) {
  var typeName = _entities.Type.displayName.call(type_);
  var exhaustiveMap = _core.ObjectMap._new.call(_core.ObjectMap);
  var enumArmsMap = _core.ObjectMap._new.call(_core.ObjectMap);
  var __PUCK__value__54 = _core.Iterable['$List'].find.call(patterns, function (pattern) {
    var __PUCK__value__55 = pattern;
    var __PUCK__value__56 = __PUCK__value__55;
    var __PUCK__value__57 = void 0;
    if (__PUCK__value__56.kind == "CatchAll") {
      var _undefined4 = __PUCK__value__56;
      return true;
    } else {
      var __PUCK__value__58 = __PUCK__value__55;
      var __PUCK__value__59 = void 0;
      if (__PUCK__value__58.kind == "Identifier") {
        var _PUCK__value__58$val = _slicedToArray(__PUCK__value__58.value, 1);

        var __PUCK__value__60 = _PUCK__value__58$val[0];

        return true;
      } else {
        var __PUCK__value__61 = __PUCK__value__55;
        var __PUCK__value__62 = void 0;
        if (__PUCK__value__61.kind == "Record") {
          var _PUCK__value__61$val = _slicedToArray(__PUCK__value__61.value, 1);

          var __PUCK__value__63 = _PUCK__value__61$val[0];

          throw "Invalid pattern";
        } else {
          var __PUCK__value__64 = __PUCK__value__55;
          var __PUCK__value__65 = void 0;
          if (__PUCK__value__64.kind == "RecordType") {
            var _PUCK__value__64$val = _slicedToArray(__PUCK__value__64.value, 2);

            var typePath = _PUCK__value__64$val[0];
            var __PUCK__value__66 = _PUCK__value__64$val[1];

            __PUCK__value__65 = getEnumMember(typePath);
          } else {
            var __PUCK__value__67 = __PUCK__value__55;
            var __PUCK__value__68 = void 0;
            if (__PUCK__value__67.kind == "Tuple") {
              var _PUCK__value__67$val = _slicedToArray(__PUCK__value__67.value, 1);

              var __PUCK__value__69 = _PUCK__value__67$val[0];

              throw "Invalid pattern";
            } else {
              var __PUCK__value__70 = __PUCK__value__55;
              var __PUCK__value__71 = void 0;
              if (__PUCK__value__70.kind == "TupleType") {
                var _PUCK__value__70$val = _slicedToArray(__PUCK__value__70.value, 2);

                var _typePath2 = _PUCK__value__70$val[0];
                var __PUCK__value__72 = _PUCK__value__70$val[1];

                __PUCK__value__71 = getEnumMember(_typePath2);
              } else {
                var __PUCK__value__73 = __PUCK__value__55;
                var __PUCK__value__74 = void 0;
                if (__PUCK__value__73.kind == "UnitType") {
                  var _PUCK__value__73$val = _slicedToArray(__PUCK__value__73.value, 1);

                  var _typePath3 = _PUCK__value__73$val[0];

                  __PUCK__value__74 = getEnumMember(_typePath3);
                };
                __PUCK__value__71 = __PUCK__value__74;
              };
              __PUCK__value__68 = __PUCK__value__71;
            };
            __PUCK__value__65 = __PUCK__value__68;
          };
          __PUCK__value__62 = __PUCK__value__65;
        };
        __PUCK__value__59 = __PUCK__value__62;
      };
      __PUCK__value__57 = __PUCK__value__59;
    };
    var member = __PUCK__value__57;
    if (!exhaustiveMap[member]) {
      var individuallyExhaustive = isIndividuallyExhaustive(pattern);
      var isEnum = isEnumArm(pattern);
      exhaustiveMap[member] = individuallyExhaustive && !isEnum;
      if (isEnum) {
        if (!enumArmsMap[member]) {
          enumArmsMap[member] = [];
        };
        enumArmsMap[member].push(pattern);
      };
    };
    return false;
  });
  if (__PUCK__value__54.kind == "Some") {
    var _PUCK__value__54$val = _slicedToArray(__PUCK__value__54.value, 1);

    var __PUCK__value__75 = _PUCK__value__54$val[0];

    return (0, _core.Ok)([]);
  };
  var innerErrors = [];
  _core.ObjectMap.forEach.call(enumArmsMap, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2);

    var member = _ref2[0];
    var patterns = _ref2[1];

    var enumPatterns = _core.Iterable['$List'].enumerate.call(getSubPatterns(patterns[0])).filter(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2);

      var pattern = _ref4[0];
      var __PUCK__value__76 = _ref4[1];

      return isEnumPattern(pattern);
    }).map(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2);

      var pattern = _ref6[0];
      var index = _ref6[1];

      var p = pattern;
      var __PUCK__value__77 = p;
      var __PUCK__value__78 = __PUCK__value__77;
      var __PUCK__value__79 = void 0;
      if (__PUCK__value__78.kind == "RecordType") {
        var _PUCK__value__78$val = _slicedToArray(__PUCK__value__78.value, 2);

        var typePath = _PUCK__value__78$val[0];
        var __PUCK__value__80 = _PUCK__value__78$val[1];

        __PUCK__value__79 = typePath.type_;
      } else {
        var __PUCK__value__81 = __PUCK__value__77;
        var __PUCK__value__82 = void 0;
        if (__PUCK__value__81.kind == "TupleType") {
          var _PUCK__value__81$val = _slicedToArray(__PUCK__value__81.value, 2);

          var _typePath4 = _PUCK__value__81$val[0];
          var __PUCK__value__83 = _PUCK__value__81$val[1];

          __PUCK__value__82 = _typePath4.type_;
        } else {
          var __PUCK__value__84 = __PUCK__value__77;
          var __PUCK__value__85 = void 0;
          if (__PUCK__value__84.kind == "UnitType") {
            var _PUCK__value__84$val = _slicedToArray(__PUCK__value__84.value, 1);

            var _typePath5 = _PUCK__value__84$val[0];

            __PUCK__value__85 = _typePath5.type_;
          } else {
            var __PUCK__value__86 = __PUCK__value__77;
            var __PUCK__value__87 = void 0;
            if (true) {
              var __PUCK__value__88 = __PUCK__value__86;
              throw "Invalid pattern";
            };
            __PUCK__value__85 = __PUCK__value__87;
          };
          __PUCK__value__82 = __PUCK__value__85;
        };
        __PUCK__value__79 = __PUCK__value__82;
      };
      var type_ = __PUCK__value__79;
      if (!type_) {
        throw "no type";
      };
      var __PUCK__value__89 = type_.kind;
      var __PUCK__value__90 = void 0;
      if (__PUCK__value__89.kind == "Enum") {
        var _PUCK__value__89$val = _slicedToArray(__PUCK__value__89.value, 1);

        var _enum_ = _PUCK__value__89$val[0];

        __PUCK__value__90 = _enum_;
      } else {
        throw "Not an enum";
      };
      var enum_ = __PUCK__value__90;
      var subPatterns = patterns.map(getSubPatterns).map(function (subPatterns) {
        return subPatterns[index];
      });
      return [type_, enum_, subPatterns];
    });
    var errors = enumPatterns.map(function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 3);

      var type_ = _ref8[0];
      var enum_ = _ref8[1];
      var subPatterns = _ref8[2];

      return checkExhaustiveEnum(subPatterns, type_, enum_);
    }).filter(function (result) {
      return _core.Result.isErr.call(result);
    });
    innerErrors = innerErrors.concat(errors);
    return exhaustiveMap[member] = errors.length == 0;
  });
  if (innerErrors.length > 0) {
    return innerErrors[0];
  };
  var mapSize = _core.ObjectMap.size.call(exhaustiveMap);
  var memberCount = _core.ObjectMap.size.call(enum_.members);
  if (mapSize == memberCount - 1) {
    var _Option$unwrap$call = _core.Option.unwrap.call(_core.ObjectMap.find.call(enum_.members, function (_ref9) {
      var _ref10 = _slicedToArray(_ref9, 2);

      var member = _ref10[0];
      var __PUCK__value__91 = _ref10[1];

      return !exhaustiveMap[member];
    }));

    var _Option$unwrap$call2 = _slicedToArray(_Option$unwrap$call, 2);

    var missing = _Option$unwrap$call2[0];
    var __PUCK__value__92 = _Option$unwrap$call2[1];

    return (0, _core.Err)("Match is not exhaustive. It is missing a case for " + typeName + "::" + missing + "");
  } else {
    if (mapSize < memberCount) {
      return (0, _core.Err)("Match is not exhaustive.");
    } else {
      var __PUCK__value__93 = _core.ObjectMap.find.call(exhaustiveMap, function (_ref11) {
        var _ref12 = _slicedToArray(_ref11, 2);

        var __PUCK__value__94 = _ref12[0];
        var exhaustive = _ref12[1];

        return !exhaustive;
      });
      if (__PUCK__value__93.kind == "Some") {
        var _PUCK__value__93$val = _slicedToArray(__PUCK__value__93.value, 1);

        var _PUCK__value__93$val$ = _slicedToArray(_PUCK__value__93$val[0], 2);

        var member = _PUCK__value__93$val$[0];
        var a = _PUCK__value__93$val$[1];

        return (0, _core.Err)("Match is not exhaustive. " + typeName + "::" + member + " is not exhaustive. " + a + "");
      };
    };
  };
  return (0, _core.Ok)([]);
}
