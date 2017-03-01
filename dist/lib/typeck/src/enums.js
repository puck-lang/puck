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
  if ($unwrapTraitObject($puck_6).kind === "CatchAll") {
    let undefined = $unwrapTraitObject($puck_6);
    return true;
  }
  else {
    if ($unwrapTraitObject($puck_6).kind === "Identifier") {
      let undefined = $unwrapTraitObject($puck_6);
      return true;
    }
    else {
      if ($unwrapTraitObject($puck_6).kind === "Record") {
        let {value: [record]} = $unwrapTraitObject($puck_6);
        return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: record.properties, $isTraitObject: true}, function (p) {
          return isIndividuallyExhaustive(p.pattern);
        });
      }
      else {
        if ($unwrapTraitObject($puck_6).kind === "RecordType") {
          let {value: [$puck_7, record]} = $unwrapTraitObject($puck_6);
          return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: record.properties, $isTraitObject: true}, function (p) {
            return isIndividuallyExhaustive(p.pattern);
          });
        }
        else {
          if ($unwrapTraitObject($puck_6).kind === "Tuple") {
            let {value: [tuple]} = $unwrapTraitObject($puck_6);
            return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true}, isIndividuallyExhaustive);
          }
          else {
            if ($unwrapTraitObject($puck_6).kind === "TupleType") {
              let {value: [$puck_8, tuple]} = $unwrapTraitObject($puck_6);
              return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true}, isIndividuallyExhaustive);
            }
            else {
              if ($unwrapTraitObject($puck_6).kind === "UnitType") {
                let {value: [$puck_9]} = $unwrapTraitObject($puck_6);
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
  let $puck_10 = typePath;
  if ($unwrapTraitObject($puck_10).kind === "Member") {
    let {value: [$puck_11]} = $unwrapTraitObject($puck_10);
    return $puck_1.None;
  }
  else {
    if ($unwrapTraitObject($puck_10).kind === "_Object") {
      let {value: [{name: name}, $puck_12]} = $unwrapTraitObject($puck_10);
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
    let [member, $puck_13] = $puck_1.Option.unwrap.call(typePathType.enumMember);
    return $puck_1.Some(member);
  }
  else {
    return $puck_1.None;
  };
};
exports.getEnumMember = getEnumMember;
function isEnumPattern(p) {
  let $puck_14 = p;
  if ($unwrapTraitObject($puck_14).kind === "CatchAll") {
    let undefined = $unwrapTraitObject($puck_14);
    return false;
  }
  else {
    if ($unwrapTraitObject($puck_14).kind === "Identifier") {
      let undefined = $unwrapTraitObject($puck_14);
      return false;
    }
    else {
      if ($unwrapTraitObject($puck_14).kind === "Record") {
        let {value: [record]} = $unwrapTraitObject($puck_14);
        return false;
      }
      else {
        if ($unwrapTraitObject($puck_14).kind === "RecordType") {
          let {value: [$puck_15, record]} = $unwrapTraitObject($puck_14);
          return true;
        }
        else {
          if ($unwrapTraitObject($puck_14).kind === "Tuple") {
            let {value: [tuple]} = $unwrapTraitObject($puck_14);
            return false;
          }
          else {
            if ($unwrapTraitObject($puck_14).kind === "TupleType") {
              let {value: [$puck_16, tuple]} = $unwrapTraitObject($puck_14);
              return true;
            }
            else {
              if ($unwrapTraitObject($puck_14).kind === "UnitType") {
                let {value: [$puck_17]} = $unwrapTraitObject($puck_14);
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
  let $puck_18 = p;
  if ($unwrapTraitObject($puck_18).kind === "CatchAll") {
    let undefined = $unwrapTraitObject($puck_18);
    return false;
  }
  else {
    if ($unwrapTraitObject($puck_18).kind === "Identifier") {
      let undefined = $unwrapTraitObject($puck_18);
      return false;
    }
    else {
      if ($unwrapTraitObject($puck_18).kind === "Record") {
        let {value: [record]} = $unwrapTraitObject($puck_18);
        return false;
      }
      else {
        if ($unwrapTraitObject($puck_18).kind === "RecordType") {
          let {value: [$puck_19, record]} = $unwrapTraitObject($puck_18);
          return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: record.properties, $isTraitObject: true}, function (p) {
            return isEnumPattern(p.pattern);
          });
        }
        else {
          if ($unwrapTraitObject($puck_18).kind === "Tuple") {
            let {value: [tuple]} = $unwrapTraitObject($puck_18);
            return false;
          }
          else {
            if ($unwrapTraitObject($puck_18).kind === "TupleType") {
              let {value: [$puck_20, tuple]} = $unwrapTraitObject($puck_18);
              return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true}, isEnumPattern);
            }
            else {
              if ($unwrapTraitObject($puck_18).kind === "UnitType") {
                let {value: [$puck_21]} = $unwrapTraitObject($puck_18);
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
  let $puck_22 = $puck_3.Expression.getType.call(e.expression).kind;
  if ($puck_22.kind === "Enum") {
    let {value: [enum_]} = $puck_22;
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
  let $puck_23 = pattern;
  if ($unwrapTraitObject($puck_23).kind === "RecordType") {
    let {value: [$puck_24, record]} = $unwrapTraitObject($puck_23);
    let $puck_25 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: record.properties, $isTraitObject: true}, function (p) {
      return p.pattern;
    })
;
    return $puck_1.Iterable[$puck_25.type].toList.call($puck_25);
  }
  else {
    if ($unwrapTraitObject($puck_23).kind === "TupleType") {
      let {value: [$puck_26, tuple]} = $unwrapTraitObject($puck_23);
      return tuple.properties;
    }
    else {
      if (true) {
        let $puck_27 = $puck_23;
        return [];
      };
    };
  };
};
function checkExhaustiveEnum(patterns, type_, enum_, scope) {
  const typeName = $puck_4.Type.displayName.call(type_);
  let exhaustiveMap = $puck_1.ObjectMap._new();
  let enumArmsMap = $puck_1.ObjectMap._new();
  let $puck_28 = $puck_1.Iterable[patterns.type].find.call(patterns, function (pattern) {
    let $puck_29 = pattern;
    let $puck_30;
    if ($unwrapTraitObject($puck_29).kind === "CatchAll") {
      let undefined = $unwrapTraitObject($puck_29);
      return true;
    }
    else {
      let $puck_31;
      if ($unwrapTraitObject($puck_29).kind === "Identifier") {
        let undefined = $unwrapTraitObject($puck_29);
        return true;
      }
      else {
        let $puck_32;
        if ($unwrapTraitObject($puck_29).kind === "Record") {
          let {value: [$puck_33]} = $unwrapTraitObject($puck_29);
          throw "Invalid pattern";
        }
        else {
          let $puck_34;
          if ($unwrapTraitObject($puck_29).kind === "RecordType") {
            let {value: [typePath, $puck_35]} = $unwrapTraitObject($puck_29);
            $puck_34 = getEnumMember(typePath);
          }
          else {
            let $puck_36;
            if ($unwrapTraitObject($puck_29).kind === "Tuple") {
              let {value: [$puck_37]} = $unwrapTraitObject($puck_29);
              throw "Invalid pattern";
            }
            else {
              let $puck_38;
              if ($unwrapTraitObject($puck_29).kind === "TupleType") {
                let {value: [typePath, $puck_39]} = $unwrapTraitObject($puck_29);
                $puck_38 = getEnumMember(typePath);
              }
              else {
                let $puck_40;
                if ($unwrapTraitObject($puck_29).kind === "UnitType") {
                  let {value: [typePath]} = $unwrapTraitObject($puck_29);
                  $puck_40 = getEnumMember(typePath);
                };
                $puck_38 = $puck_40;
              };
              $puck_36 = $puck_38;
            };
            $puck_34 = $puck_36;
          };
          $puck_32 = $puck_34;
        };
        $puck_31 = $puck_32;
      };
      $puck_30 = $puck_31;
    };
    const member = $puck_30;
    let $puck_41 = member;
    if ($puck_41.kind === "Some") {
      let {value: [member]} = $puck_41;
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
  if ($puck_28.kind === "Some") {
    let {value: [$puck_42]} = $puck_28;
    return $puck_1.Ok([]);
  };
  let innerErrors = [];
  $puck_1.ObjectMap.forEach.call(enumArmsMap, function ([member, patterns]) {
    let $puck_44 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: getSubPatterns($puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: patterns, $isTraitObject: true}, 0)), $isTraitObject: true})
;
    let $puck_43 = $puck_1.Iterable[$puck_44.type].filter.call($puck_44, function ([$puck_45, pattern]) {
      return isEnumPattern(pattern);
    })
;
    const enumPatterns = $puck_1.Iterable[$puck_43.type].map.call($puck_43, function ([index, pattern]) {
      let $puck_46 = pattern;
      let $puck_47;
      if ($unwrapTraitObject($puck_46).kind === "RecordType") {
        let {value: [typePath, $puck_48]} = $unwrapTraitObject($puck_46);
        $puck_47 = getEnumType(typePath, scope);
      }
      else {
        let $puck_49;
        if ($unwrapTraitObject($puck_46).kind === "TupleType") {
          let {value: [typePath, $puck_50]} = $unwrapTraitObject($puck_46);
          $puck_49 = getEnumType(typePath, scope);
        }
        else {
          let $puck_51;
          if ($unwrapTraitObject($puck_46).kind === "UnitType") {
            let {value: [typePath]} = $unwrapTraitObject($puck_46);
            $puck_51 = getEnumType(typePath, scope);
          }
          else {
            let $puck_52;
            if (true) {
              let $puck_53 = $puck_46;
              throw "Invalid pattern";
            };
            $puck_51 = $puck_52;
          };
          $puck_49 = $puck_51;
        };
        $puck_47 = $puck_49;
      };
      const type_ = $puck_47;
      let $puck_54 = type_;
      let $puck_55;
      if ($puck_54.kind === "Some") {
        let {value: [type_]} = $puck_54;
        $puck_55 = $puck_4.Type.getEnum.call(type_);
      }
      else {
        throw "no type";
      };
      const enum_ = $puck_55;
      let $puck_57 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: patterns, $isTraitObject: true}, getSubPatterns)
;
      let $puck_56 = $puck_1.Iterable[$puck_57.type].map.call($puck_57, function (subPatterns) {
        return $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: subPatterns, $isTraitObject: true}, index);
      })
;
      const subPatterns = $puck_1.Iterable[$puck_56.type].toList.call($puck_56);
      return [
        $puck_1.Option.unwrap.call(type_),
        enum_,
        subPatterns,
      ];
    });
    let $puck_59 = $puck_1.Iterable[enumPatterns.type].map.call(enumPatterns, function ([type_, enum_, subPatterns]) {
      return checkExhaustiveEnum({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: subPatterns, $isTraitObject: true}, type_, enum_, scope);
    })
;
    let $puck_58 = $puck_1.Iterable[$puck_59.type].filter.call($puck_59, function (result) {
      return $puck_1.Result.isErr.call(result);
    })
;
    const errors = $puck_1.Iterable[$puck_58.type].toList.call($puck_58);
    innerErrors = $unwrapTraitObject(innerErrors.concat(errors));
    return exhaustiveMap[member] = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: errors, $isTraitObject: true}) === 0;
  });
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: innerErrors, $isTraitObject: true}) > 0) {
    return $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: innerErrors, $isTraitObject: true}, 0);
  };
  const mapSize = $puck_1.ObjectMap.size.call(exhaustiveMap);
  const memberCount = $puck_1.ObjectMap.size.call(enum_.members);
  if (mapSize === memberCount - 1) {
    let [missing, $puck_61] = $puck_1.Option.unwrap.call($puck_1.ObjectMap.find.call(enum_.members, function ([member, $puck_60]) {
      return (!$puck_1.Option.unwrapOr.call($puck_1.ObjectMap.get.call(exhaustiveMap, member), false));
    }));
    return $puck_1.Err("Match is not exhaustive. It is missing a case for " + typeName + "::" + missing + "");
  }
  else {
    if (mapSize < memberCount) {
      return $puck_1.Err("Match is not exhaustive.");
    }
    else {
      let $puck_62 = $puck_1.ObjectMap.find.call(exhaustiveMap, function ([$puck_63, exhaustive]) {
        return (!exhaustive);
      });
      if ($puck_62.kind === "Some") {
        let {value: [[member, a]]} = $puck_62;
        return $puck_1.Err("Match is not exhaustive. " + typeName + "::" + member + " is not exhaustive. " + a + "");
      }
      else {
        return $puck_1.Ok([]);
      };
    };
  };
}
