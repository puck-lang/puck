'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.getEnumType = exports.getEnumMember = exports.checkExhaustive = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("./../../ast/ast");
const $puck_4 = require("./../../entities");
const $puck_5 = require("./scope");
function isIndividuallyExhaustive(p) {
  let $puck_6 = p;
  if ($puck_6.kind === "CatchAll") {
    $puck_6;
    return true;
  }
  else {
    if ($puck_6.kind === "Identifier") {
      $puck_6;
      return true;
    }
    else {
      if ($puck_6.kind === "Record") {
        let {value: record} = $puck_6;
        return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: record.properties, $isTraitObject: true}, function (p) {
          return isIndividuallyExhaustive(p.pattern);
        });
      }
      else {
        if ($puck_6.kind === "RecordType") {
          let {value: [, record]} = $puck_6;
          return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: record.properties, $isTraitObject: true}, function (p) {
            return isIndividuallyExhaustive(p.pattern);
          });
        }
        else {
          if ($puck_6.kind === "Tuple") {
            let {value: tuple} = $puck_6;
            return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true}, isIndividuallyExhaustive);
          }
          else {
            if ($puck_6.kind === "TupleType") {
              let {value: [, tuple]} = $puck_6;
              return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true}, isIndividuallyExhaustive);
            }
            else {
              if ($puck_6.kind === "UnitType") {
                $puck_6;
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
  let $puck_7 = typePath;
  if ($puck_7.kind === "Member") {
    $puck_7;
    return $puck_1.None;
  }
  else {
    if ($puck_7.kind === "_Object") {
      let {value: [{name: name}, ]} = $puck_7;
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
    let [member, ] = $puck_1.Option.unwrap.call(typePathType.enumMember);
    return $puck_1.Some(member);
  }
  else {
    return $puck_1.None;
  };
};
exports.getEnumMember = getEnumMember;
function isEnumPattern(p) {
  let $puck_8 = p;
  if ($puck_8.kind === "CatchAll") {
    $puck_8;
    return false;
  }
  else {
    if ($puck_8.kind === "Identifier") {
      $puck_8;
      return false;
    }
    else {
      if ($puck_8.kind === "Record") {
        let {value: record} = $puck_8;
        return false;
      }
      else {
        if ($puck_8.kind === "RecordType") {
          let {value: [, record]} = $puck_8;
          return true;
        }
        else {
          if ($puck_8.kind === "Tuple") {
            let {value: tuple} = $puck_8;
            return false;
          }
          else {
            if ($puck_8.kind === "TupleType") {
              let {value: [, tuple]} = $puck_8;
              return true;
            }
            else {
              if ($puck_8.kind === "UnitType") {
                $puck_8;
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
  let $puck_9 = p;
  if ($puck_9.kind === "CatchAll") {
    $puck_9;
    return false;
  }
  else {
    if ($puck_9.kind === "Identifier") {
      $puck_9;
      return false;
    }
    else {
      if ($puck_9.kind === "Record") {
        let {value: record} = $puck_9;
        return false;
      }
      else {
        if ($puck_9.kind === "RecordType") {
          let {value: [, record]} = $puck_9;
          return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: record.properties, $isTraitObject: true}, function (p) {
            return isEnumPattern(p.pattern);
          });
        }
        else {
          if ($puck_9.kind === "Tuple") {
            let {value: tuple} = $puck_9;
            return false;
          }
          else {
            if ($puck_9.kind === "TupleType") {
              let {value: [, tuple]} = $puck_9;
              return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true}, isEnumPattern);
            }
            else {
              if ($puck_9.kind === "UnitType") {
                $puck_9;
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
  let $puck_10 = $puck_3.Expression.getType.call(e.expression).kind;
  if ($puck_10.kind === "Enum") {
    let {value: enum_} = $puck_10;
    return checkExhaustiveEnum($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true}, function (a) {
      return a.pattern;
    }), $puck_3.Expression.getType.call(e.expression), enum_, $unwrapTraitObject(e.scope));
  }
  else {
    return $puck_1.Ok(null);
  };
};
exports.checkExhaustive = checkExhaustive;
function getSubPatterns(pattern) {
  let $puck_11 = pattern;
  if ($puck_11.kind === "RecordType") {
    let {value: [, record]} = $puck_11;
    let $puck_12 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: record.properties, $isTraitObject: true}, function (p) {
      return p.pattern;
    })
;
    return $puck_1.Iterable[$puck_12.type].toList.call($puck_12);
  }
  else {
    if ($puck_11.kind === "TupleType") {
      let {value: [, tuple]} = $puck_11;
      return tuple.properties;
    }
    else {
      if (true) {
        $puck_11;
        return [];
      };
    };
  };
};
function checkExhaustiveEnum(patterns, type_, enum_, scope) {
  const typeName = $puck_4.Type.displayName.call(type_);
  let exhaustiveMap = $puck_1.ObjectMap._new();
  let enumArmsMap = $puck_1.ObjectMap._new();
  let $puck_13 = $puck_1.Iterable[patterns.type].find.call(patterns, function (pattern) {
    let $puck_14 = pattern;
    let $puck_15;
    if ($puck_14.kind === "CatchAll") {
      $puck_14;
      return true;
    }
    else {
      let $puck_16;
      if ($puck_14.kind === "Identifier") {
        $puck_14;
        return true;
      }
      else {
        let $puck_17;
        if ($puck_14.kind === "Record") {
          $puck_14;
          throw "Invalid pattern";
        }
        else {
          let $puck_18;
          if ($puck_14.kind === "RecordType") {
            let {value: [typePath, ]} = $puck_14;
            $puck_18 = getEnumMember(typePath);
          }
          else {
            let $puck_19;
            if ($puck_14.kind === "Tuple") {
              $puck_14;
              throw "Invalid pattern";
            }
            else {
              let $puck_20;
              if ($puck_14.kind === "TupleType") {
                let {value: [typePath, ]} = $puck_14;
                $puck_20 = getEnumMember(typePath);
              }
              else {
                let $puck_21;
                if ($puck_14.kind === "UnitType") {
                  let {value: typePath} = $puck_14;
                  $puck_21 = getEnumMember(typePath);
                };
                $puck_20 = $puck_21;
              };
              $puck_19 = $puck_20;
            };
            $puck_18 = $puck_19;
          };
          $puck_17 = $puck_18;
        };
        $puck_16 = $puck_17;
      };
      $puck_15 = $puck_16;
    };
    const member = $puck_15;
    let $puck_22 = member;
    if ($puck_22 !== undefined) {
      let member = $puck_22;
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
  if ($puck_13 !== undefined) {
    $puck_13;
    return $puck_1.Ok(null);
  };
  let innerErrors = [];
  $puck_1.ObjectMap.forEach.call(enumArmsMap, function ([member, patterns]) {
    let $puck_24 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: getSubPatterns($puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: patterns, $isTraitObject: true}, 0)), $isTraitObject: true})
;
    let $puck_23 = $puck_1.Iterable[$puck_24.type].filter.call($puck_24, function ([, pattern]) {
      return isEnumPattern(pattern);
    })
;
    const enumPatterns = $puck_1.Iterable[$puck_23.type].map.call($puck_23, function ([index, pattern]) {
      let $puck_25 = pattern;
      let $puck_26;
      if ($puck_25.kind === "RecordType") {
        let {value: [typePath, ]} = $puck_25;
        $puck_26 = getEnumType(typePath, scope);
      }
      else {
        let $puck_27;
        if ($puck_25.kind === "TupleType") {
          let {value: [typePath, ]} = $puck_25;
          $puck_27 = getEnumType(typePath, scope);
        }
        else {
          let $puck_28;
          if ($puck_25.kind === "UnitType") {
            let {value: typePath} = $puck_25;
            $puck_28 = getEnumType(typePath, scope);
          }
          else {
            let $puck_29;
            if (true) {
              $puck_25;
              throw "Invalid pattern";
            };
            $puck_28 = $puck_29;
          };
          $puck_27 = $puck_28;
        };
        $puck_26 = $puck_27;
      };
      const type_ = $puck_26;
      let $puck_30 = type_;
      let $puck_31;
      if ($puck_30 !== undefined) {
        let type_ = $puck_30;
        $puck_31 = $puck_4.Type.getEnum.call(type_);
      }
      else {
        throw "no type";
      };
      const enum_ = $puck_31;
      let $puck_33 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: patterns, $isTraitObject: true}, getSubPatterns)
;
      let $puck_32 = $puck_1.Iterable[$puck_33.type].map.call($puck_33, function (subPatterns) {
        return $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: subPatterns, $isTraitObject: true}, index);
      })
;
      const subPatterns = $puck_1.Iterable[$puck_32.type].toList.call($puck_32);
      return [
        $puck_1.Option.unwrap.call(type_),
        enum_,
        subPatterns,
      ];
    });
    let $puck_35 = $puck_1.Iterable[enumPatterns.type].map.call(enumPatterns, function ([type_, enum_, subPatterns]) {
      return checkExhaustiveEnum({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: subPatterns, $isTraitObject: true}, type_, enum_, scope);
    })
;
    let $puck_34 = $puck_1.Iterable[$puck_35.type].filter.call($puck_35, function (result) {
      return $puck_1.Result.isErr.call(result);
    })
;
    const errors = $puck_1.Iterable[$puck_34.type].toList.call($puck_34);
    innerErrors = $unwrapTraitObject(innerErrors.concat(errors));
    return exhaustiveMap[member] = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: errors, $isTraitObject: true}) === 0;
  });
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: innerErrors, $isTraitObject: true}) > 0) {
    return $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: innerErrors, $isTraitObject: true}, 0);
  };
  const mapSize = $puck_1.ObjectMap.size.call(exhaustiveMap);
  const memberCount = $puck_1.ObjectMap.size.call(enum_.members);
  if (mapSize === memberCount - 1) {
    let [missing, ] = $puck_1.Option.unwrap.call($puck_1.ObjectMap.find.call(enum_.members, function ([member, ]) {
      return (!$puck_1.Option.unwrapOr.call($puck_1.ObjectMap.get.call(exhaustiveMap, member), false));
    }));
    return $puck_1.Err("Match is not exhaustive. It is missing a case for " + typeName + "::" + missing + "");
  }
  else {
    if (mapSize < memberCount) {
      return $puck_1.Err("Match is not exhaustive.");
    }
    else {
      let $puck_36 = $puck_1.ObjectMap.find.call(exhaustiveMap, function ([, exhaustive]) {
        return (!exhaustive);
      });
      if ($puck_36 !== undefined) {
        let [member, a] = $puck_36;
        return $puck_1.Err("Match is not exhaustive. " + typeName + "::" + member + " is not exhaustive. " + a + "");
      }
      else {
        return $puck_1.Ok(null);
      };
    };
  };
}
