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
  if (typePathType) {
    let [member, $puck_14] = $puck_1.Option.unwrap.call(typePathType.enumMember);
    return $puck_1.Some(member);
  }
  else {
    return $puck_1.None;
  };
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
    let $puck_45 = member;
    if ($puck_45.kind == "Some") {
      let {value: [member]} = $puck_45;
      if ((!$puck_1.Option.unwrapOr.call($puck_1.ObjectMap.get.call(exhaustiveMap, $unwrapTraitObject(member)), false))) {
        const individuallyExhaustive = isIndividuallyExhaustive(pattern);
        const isEnum = isEnumArm(pattern);
        exhaustiveMap[$unwrapTraitObject(member)] = (individuallyExhaustive && !isEnum);
        if (isEnum) {
          if (!$puck_1.ObjectMap.has.call(enumArmsMap, $unwrapTraitObject(member))) {
            enumArmsMap[$unwrapTraitObject(member)] = [];
          };
          $puck_1.List.push.call($puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: enumArmsMap, $isTraitObject: true}, $unwrapTraitObject(member)), pattern);
        };
      };
    };
    return false;
  });
  if ($puck_31.kind == "Some") {
    let {value: [$puck_46]} = $puck_31;
    return $puck_1.Ok([]);
  };
  let innerErrors = [];
  $puck_1.ObjectMap.forEach.call(enumArmsMap, function ([member, patterns]) {
    let $puck_48 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: getSubPatterns($puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: patterns, $isTraitObject: true}, 0)), $isTraitObject: true})
;
    let $puck_47 = $puck_1.Iterable[$puck_48.type].filter.call($puck_48, function ([$puck_49, pattern]) {
      return isEnumPattern(pattern);
    })
;
    const enumPatterns = $puck_1.Iterable[$puck_47.type].map.call($puck_47, function ([index, pattern]) {
      let $puck_50 = pattern;
      let $puck_51;
      if ($unwrapTraitObject($puck_50).kind == "RecordType") {
        let {value: [typePath, $puck_52]} = $unwrapTraitObject($puck_50);
        $puck_51 = getEnumType(typePath, scope);
      }
      else {
        let $puck_53;
        if ($unwrapTraitObject($puck_50).kind == "TupleType") {
          let {value: [typePath, $puck_54]} = $unwrapTraitObject($puck_50);
          $puck_53 = getEnumType(typePath, scope);
        }
        else {
          let $puck_55;
          if ($unwrapTraitObject($puck_50).kind == "UnitType") {
            let {value: [typePath]} = $unwrapTraitObject($puck_50);
            $puck_55 = getEnumType(typePath, scope);
          }
          else {
            let $puck_56;
            if (true) {
              let $puck_57 = $puck_50;
              throw "Invalid pattern";
            };
            $puck_55 = $puck_56;
          };
          $puck_53 = $puck_55;
        };
        $puck_51 = $puck_53;
      };
      const type_ = $puck_51;
      let $puck_58 = type_;
      let $puck_59;
      if ($puck_58.kind == "Some") {
        let {value: [type_]} = $puck_58;
        $puck_59 = $puck_4.Type.getEnum.call(type_);
      }
      else {
        throw "no type";
      };
      const enum_ = $puck_59;
      let $puck_61 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: patterns, $isTraitObject: true}, getSubPatterns)
;
      let $puck_60 = $puck_1.Iterable[$puck_61.type].map.call($puck_61, function (subPatterns) {
        return $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: subPatterns, $isTraitObject: true}, index);
      })
;
      const subPatterns = $puck_1.Iterable[$puck_60.type].toList.call($puck_60);
      return [
        $puck_1.Option.unwrap.call(type_),
        enum_,
        subPatterns,
      ];
    });
    let $puck_63 = $puck_1.Iterable[enumPatterns.type].map.call(enumPatterns, function ([type_, enum_, subPatterns]) {
      return checkExhaustiveEnum({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: subPatterns, $isTraitObject: true}, type_, enum_, scope);
    })
;
    let $puck_62 = $puck_1.Iterable[$puck_63.type].filter.call($puck_63, function (result) {
      return $puck_1.Result.isErr.call(result);
    })
;
    const errors = $puck_1.Iterable[$puck_62.type].toList.call($puck_62);
    innerErrors = $unwrapTraitObject(innerErrors.concat(errors));
    return exhaustiveMap[member] = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: errors, $isTraitObject: true}) == 0;
  });
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: innerErrors, $isTraitObject: true}) > 0) {
    return $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: innerErrors, $isTraitObject: true}, 0);
  };
  const mapSize = $puck_1.ObjectMap.size.call(exhaustiveMap);
  const memberCount = $puck_1.ObjectMap.size.call(enum_.members);
  if (mapSize == memberCount - 1) {
    let [missing, $puck_65] = $puck_1.Option.unwrap.call($puck_1.ObjectMap.find.call(enum_.members, function ([member, $puck_64]) {
      return (!$puck_1.Option.unwrapOr.call($puck_1.ObjectMap.get.call(exhaustiveMap, member), false));
    }));
    return $puck_1.Err("Match is not exhaustive. It is missing a case for " + typeName + "::" + missing + "");
  }
  else {
    if (mapSize < memberCount) {
      return $puck_1.Err("Match is not exhaustive.");
    }
    else {
      let $puck_66 = $puck_1.ObjectMap.find.call(exhaustiveMap, function ([$puck_67, exhaustive]) {
        return (!exhaustive);
      });
      if ($puck_66.kind == "Some") {
        let {value: [[member, a]]} = $puck_66;
        return $puck_1.Err("Match is not exhaustive. " + typeName + "::" + member + " is not exhaustive. " + a + "");
      }
      else {
        return $puck_1.Ok([]);
      };
    };
  };
}
