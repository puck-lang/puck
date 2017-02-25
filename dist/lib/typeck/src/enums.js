'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.getEnumType = exports.getEnumMember = exports.checkExhaustiveundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("./../../ast/ast");
const $puck_4 = require("./../../entities");
const $puck_5 = require("./scope");
function isIndividuallyExhaustive(p) {
  let $puck_6 = p;
  if ($unwrapTraitObject($puck_6).kind == "CatchAll") {
    let undefined = $unwrapTraitObject($puck_6);
    return true;
  }
  else {
    if ($unwrapTraitObject($puck_6).kind == "Identifier") {
      let {value: [$puck_7]} = $unwrapTraitObject($puck_6);
      return true;
    }
    else {
      if ($unwrapTraitObject($puck_6).kind == "Record") {
        let {value: [record]} = $unwrapTraitObject($puck_6);
        return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: record.properties, $isTraitObject: true}, function (p) {
          return isIndividuallyExhaustive(p.pattern);
        });
      }
      else {
        if ($unwrapTraitObject($puck_6).kind == "RecordType") {
          let {value: [$puck_8, record]} = $unwrapTraitObject($puck_6);
          return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: record.properties, $isTraitObject: true}, function (p) {
            return isIndividuallyExhaustive(p.pattern);
          });
        }
        else {
          if ($unwrapTraitObject($puck_6).kind == "Tuple") {
            let {value: [tuple]} = $unwrapTraitObject($puck_6);
            return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true}, isIndividuallyExhaustive);
          }
          else {
            if ($unwrapTraitObject($puck_6).kind == "TupleType") {
              let {value: [$puck_9, tuple]} = $unwrapTraitObject($puck_6);
              return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true}, isIndividuallyExhaustive);
            }
            else {
              if ($unwrapTraitObject($puck_6).kind == "UnitType") {
                let {value: [$puck_10]} = $unwrapTraitObject($puck_6);
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
  let $puck_11 = typePath;
  if ($unwrapTraitObject($puck_11).kind == "Member") {
    let {value: [$puck_12]} = $unwrapTraitObject($puck_11);
    return $puck_1.None;
  }
  else {
    if ($unwrapTraitObject($puck_11).kind == "_Object") {
      let {value: [{name: name}, $puck_13]} = $unwrapTraitObject($puck_11);
      return $puck_1.Option.andThen.call($puck_1.Option.andThen.call($puck_5.Scope.getBinding.call(scope, name), function (binding) {
        return binding.type_.providesType;
      }), function (type_) {
        if ($puck_4.Type.isEnum.call(type_)) {
          return $puck_1.Some(type_);
        }
        else {
          return $puck_1.None;
        };
      });
    };
  };
};
exports.getEnumType = getEnumType;
function getEnumMember(typePath) {
  const typePathType = $unwrapTraitObject(typePath.type_);
  let [member, $puck_14] = $puck_1.Option.unwrap.call(typePathType.enumMember);
  return member;
};
exports.getEnumMember = getEnumMember;
function isEnumPattern(p) {
  let $puck_15 = p;
  if ($unwrapTraitObject($puck_15).kind == "CatchAll") {
    let undefined = $unwrapTraitObject($puck_15);
    return false;
  }
  else {
    if ($unwrapTraitObject($puck_15).kind == "Identifier") {
      let {value: [$puck_16]} = $unwrapTraitObject($puck_15);
      return false;
    }
    else {
      if ($unwrapTraitObject($puck_15).kind == "Record") {
        let {value: [record]} = $unwrapTraitObject($puck_15);
        return false;
      }
      else {
        if ($unwrapTraitObject($puck_15).kind == "RecordType") {
          let {value: [$puck_17, record]} = $unwrapTraitObject($puck_15);
          return true;
        }
        else {
          if ($unwrapTraitObject($puck_15).kind == "Tuple") {
            let {value: [tuple]} = $unwrapTraitObject($puck_15);
            return false;
          }
          else {
            if ($unwrapTraitObject($puck_15).kind == "TupleType") {
              let {value: [$puck_18, tuple]} = $unwrapTraitObject($puck_15);
              return true;
            }
            else {
              if ($unwrapTraitObject($puck_15).kind == "UnitType") {
                let {value: [$puck_19]} = $unwrapTraitObject($puck_15);
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
  let $puck_20 = p;
  if ($unwrapTraitObject($puck_20).kind == "CatchAll") {
    let undefined = $unwrapTraitObject($puck_20);
    return false;
  }
  else {
    if ($unwrapTraitObject($puck_20).kind == "Identifier") {
      let {value: [$puck_21]} = $unwrapTraitObject($puck_20);
      return false;
    }
    else {
      if ($unwrapTraitObject($puck_20).kind == "Record") {
        let {value: [record]} = $unwrapTraitObject($puck_20);
        return false;
      }
      else {
        if ($unwrapTraitObject($puck_20).kind == "RecordType") {
          let {value: [$puck_22, record]} = $unwrapTraitObject($puck_20);
          return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: record.properties, $isTraitObject: true}, function (p) {
            return isEnumPattern(p.pattern);
          });
        }
        else {
          if ($unwrapTraitObject($puck_20).kind == "Tuple") {
            let {value: [tuple]} = $unwrapTraitObject($puck_20);
            return false;
          }
          else {
            if ($unwrapTraitObject($puck_20).kind == "TupleType") {
              let {value: [$puck_23, tuple]} = $unwrapTraitObject($puck_20);
              return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true}, isEnumPattern);
            }
            else {
              if ($unwrapTraitObject($puck_20).kind == "UnitType") {
                let {value: [$puck_24]} = $unwrapTraitObject($puck_20);
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
  let $puck_25 = $puck_3.Expression.getType.call(e.expression).kind;
  if ($puck_25.kind == "Enum") {
    let {value: [enum_]} = $puck_25;
    return checkExhaustiveEnum($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true}, function (a) {
      return a.pattern;
    }), $puck_3.Expression.getType.call(e.expression), enum_, $unwrapTraitObject(e.scope));
  }
  else {
    return $puck_1.Ok([]);
  };
};
exports.checkExhaustive = checkExhaustive;
function getSubPatterns(pattern) {
  let $puck_26 = pattern;
  if ($unwrapTraitObject($puck_26).kind == "RecordType") {
    let {value: [$puck_27, record]} = $unwrapTraitObject($puck_26);
    let $puck_28 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: record.properties, $isTraitObject: true}, function (p) {
      return p.pattern;
    })
;
    return $puck_1.Iterable[$puck_28.type].toList.call($puck_28);
  }
  else {
    if ($unwrapTraitObject($puck_26).kind == "TupleType") {
      let {value: [$puck_29, tuple]} = $unwrapTraitObject($puck_26);
      return tuple.properties;
    }
    else {
      if (true) {
        let $puck_30 = $puck_26;
        return [];
      };
    };
  };
};
function checkExhaustiveEnum(patterns, type_, enum_, scope) {
  const typeName = $puck_4.Type.displayName.call(type_);
  let exhaustiveMap = $puck_1.ObjectMap._new();
  let enumArmsMap = $puck_1.ObjectMap._new();
  let $puck_31 = $puck_1.Iterable[patterns.type].find.call(patterns, function (pattern) {
    let $puck_32 = pattern;
    let $puck_33;
    if ($unwrapTraitObject($puck_32).kind == "CatchAll") {
      let undefined = $unwrapTraitObject($puck_32);
      return true;
    }
    else {
      let $puck_34;
      if ($unwrapTraitObject($puck_32).kind == "Identifier") {
        let {value: [$puck_35]} = $unwrapTraitObject($puck_32);
        return true;
      }
      else {
        let $puck_36;
        if ($unwrapTraitObject($puck_32).kind == "Record") {
          let {value: [$puck_37]} = $unwrapTraitObject($puck_32);
          throw "Invalid pattern";
        }
        else {
          let $puck_38;
          if ($unwrapTraitObject($puck_32).kind == "RecordType") {
            let {value: [typePath, $puck_39]} = $unwrapTraitObject($puck_32);
            $puck_38 = getEnumMember(typePath);
          }
          else {
            let $puck_40;
            if ($unwrapTraitObject($puck_32).kind == "Tuple") {
              let {value: [$puck_41]} = $unwrapTraitObject($puck_32);
              throw "Invalid pattern";
            }
            else {
              let $puck_42;
              if ($unwrapTraitObject($puck_32).kind == "TupleType") {
                let {value: [typePath, $puck_43]} = $unwrapTraitObject($puck_32);
                $puck_42 = getEnumMember(typePath);
              }
              else {
                let $puck_44;
                if ($unwrapTraitObject($puck_32).kind == "UnitType") {
                  let {value: [typePath]} = $unwrapTraitObject($puck_32);
                  $puck_44 = getEnumMember(typePath);
                };
                $puck_42 = $puck_44;
              };
              $puck_40 = $puck_42;
            };
            $puck_38 = $puck_40;
          };
          $puck_36 = $puck_38;
        };
        $puck_34 = $puck_36;
      };
      $puck_33 = $puck_34;
    };
    const member = $puck_33;
    if ((!$puck_1.Option.unwrapOr.call($puck_1.ObjectMap.get.call(exhaustiveMap, member), false))) {
      const individuallyExhaustive = isIndividuallyExhaustive(pattern);
      const isEnum = isEnumArm(pattern);
      exhaustiveMap[$unwrapTraitObject(member)] = (individuallyExhaustive && !isEnum);
      if (isEnum) {
        if (!$puck_1.ObjectMap.has.call(enumArmsMap, member)) {
          enumArmsMap[$unwrapTraitObject(member)] = [];
        };
        $puck_1.List.push.call($puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: enumArmsMap, $isTraitObject: true}, member), pattern);
      };
    };
    return false;
  });
  if ($puck_31.kind == "Some") {
    let {value: [$puck_45]} = $puck_31;
    return $puck_1.Ok([]);
  };
  let innerErrors = [];
  $puck_1.ObjectMap.forEach.call(enumArmsMap, function ([member, patterns]) {
    let $puck_47 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: getSubPatterns($puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: patterns, $isTraitObject: true}, 0)), $isTraitObject: true})
;
    let $puck_46 = $puck_1.Iterable[$puck_47.type].filter.call($puck_47, function ([$puck_48, pattern]) {
      return isEnumPattern(pattern);
    })
;
    const enumPatterns = $puck_1.Iterable[$puck_46.type].map.call($puck_46, function ([index, pattern]) {
      let $puck_49 = pattern;
      let $puck_50;
      if ($unwrapTraitObject($puck_49).kind == "RecordType") {
        let {value: [typePath, $puck_51]} = $unwrapTraitObject($puck_49);
        $puck_50 = getEnumType(typePath, scope);
      }
      else {
        let $puck_52;
        if ($unwrapTraitObject($puck_49).kind == "TupleType") {
          let {value: [typePath, $puck_53]} = $unwrapTraitObject($puck_49);
          $puck_52 = getEnumType(typePath, scope);
        }
        else {
          let $puck_54;
          if ($unwrapTraitObject($puck_49).kind == "UnitType") {
            let {value: [typePath]} = $unwrapTraitObject($puck_49);
            $puck_54 = getEnumType(typePath, scope);
          }
          else {
            let $puck_55;
            if (true) {
              let $puck_56 = $puck_49;
              throw "Invalid pattern";
            };
            $puck_54 = $puck_55;
          };
          $puck_52 = $puck_54;
        };
        $puck_50 = $puck_52;
      };
      const type_ = $puck_50;
      let $puck_57 = type_;
      let $puck_58;
      if ($puck_57.kind == "Some") {
        let {value: [type_]} = $puck_57;
        $puck_58 = $puck_4.Type.getEnum.call(type_);
      }
      else {
        throw "no type";
      };
      const enum_ = $puck_58;
      let $puck_60 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: patterns, $isTraitObject: true}, getSubPatterns)
;
      let $puck_59 = $puck_1.Iterable[$puck_60.type].map.call($puck_60, function (subPatterns) {
        return $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: subPatterns, $isTraitObject: true}, index);
      })
;
      const subPatterns = $puck_1.Iterable[$puck_59.type].toList.call($puck_59);
      return [
        $puck_1.Option.unwrap.call(type_),
        enum_,
        subPatterns,
      ];
    });
    let $puck_62 = $puck_1.Iterable[enumPatterns.type].map.call(enumPatterns, function ([type_, enum_, subPatterns]) {
      return checkExhaustiveEnum({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: subPatterns, $isTraitObject: true}, type_, enum_, scope);
    })
;
    let $puck_61 = $puck_1.Iterable[$puck_62.type].filter.call($puck_62, function (result) {
      return $puck_1.Result.isErr.call(result);
    })
;
    const errors = $puck_1.Iterable[$puck_61.type].toList.call($puck_61);
    innerErrors = $unwrapTraitObject(innerErrors.concat(errors));
    return exhaustiveMap[member] = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: errors, $isTraitObject: true}) == 0;
  });
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: innerErrors, $isTraitObject: true}) > 0) {
    return $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: innerErrors, $isTraitObject: true}, 0);
  };
  const mapSize = $puck_1.ObjectMap.size.call(exhaustiveMap);
  const memberCount = $puck_1.ObjectMap.size.call(enum_.members);
  if (mapSize == memberCount - 1) {
    let [missing, $puck_64] = $puck_1.Option.unwrap.call($puck_1.ObjectMap.find.call(enum_.members, function ([member, $puck_63]) {
      return (!$puck_1.Option.unwrapOr.call($puck_1.ObjectMap.get.call(exhaustiveMap, member), false));
    }));
    return $puck_1.Err("Match is not exhaustive. It is missing a case for " + typeName + "::" + missing + "");
  }
  else {
    if (mapSize < memberCount) {
      return $puck_1.Err("Match is not exhaustive.");
    }
    else {
      let $puck_65 = $puck_1.ObjectMap.find.call(exhaustiveMap, function ([$puck_66, exhaustive]) {
        return (!exhaustive);
      });
      if ($puck_65.kind == "Some") {
        let {value: [[member, a]]} = $puck_65;
        return $puck_1.Err("Match is not exhaustive. " + typeName + "::" + member + " is not exhaustive. " + a + "");
      }
      else {
        return $puck_1.Ok([]);
      };
    };
  };
}
