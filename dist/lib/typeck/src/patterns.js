'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.PatternError = exports.declarePatternVariables = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("./../../ast/ast");
const $puck_3 = require("./../../ast/span");
const $puck_4 = require("puck-lang/dist/lib/stdlib/js");
const $puck_5 = require("./../../entities");
const $puck_6 = require("./scope");
const $puck_7 = require("./types");
const $puck_8 = require("./core_type_helpers");
var PatternError = exports.PatternError = {
ScopeError: (...members) => ({kind: 'ScopeError', value: members}),
PatternMismatch: (...members) => ({kind: 'PatternMismatch', value: members}),
NotExhaustive: {kind: 'NotExhaustive', value: Symbol('NotExhaustive')},
};
function getValueType(typePath, type_) {
  const typePathType = $unwrapTraitObject(typePath.type_);
  const typePathProvidesType = $puck_1.Option.unwrapOr.call(typePathType.providesType, typePathType);
  let $puck_9;
  if (type_) {
    let $puck_10 = typePathType.enumMember;
    if ($puck_10 !== undefined) {
      let [member, typePathEnum] = $puck_10;
      let $puck_11 = type_.kind;
      if ($puck_11.kind === "Enum") {
        $puck_11;
      }
      else {
        if ($puck_11.kind === "Parameter") {
          $puck_11;
        }
        else {
          if (true) {
            $puck_11;
            return $puck_1.Err([
              typePathEnum,
              type_,
            ]);
          };
        };
      };
    };
    $puck_9 = type_;
  }
  else {
    $puck_9 = typePathProvidesType;
  };
  const structType = $puck_9;
  let $puck_12 = structType.kind;
  if ($puck_12.kind === "Enum") {
    let {value: enum_} = $puck_12;
    let $puck_13 = typePathType.enumMember;
    if ($puck_13 !== undefined) {
      let [member, typePathEnum] = $puck_13;
      if ($puck_7.isAssignable(typePathEnum, type_)) {
        return $puck_1.Ok($puck_1.Option.unwrap.call($puck_1.ObjectMap.get.call(enum_.members, member)));
      }
      else {
        return $puck_1.Err([
          typePathEnum,
          type_,
        ]);
      };
    }
    else {
      return $puck_1.Err([
        typePathProvidesType,
        type_,
      ]);
    };
  }
  else {
    if (true) {
      $puck_12;
      return $puck_1.Ok(structType);
    };
  };
};
function isNonExhaustive(typePath) {
  let typePathType = $unwrapTraitObject(typePath.type_);
  typePathType = $puck_1.Option.unwrapOr.call($puck_1.Option.orElse.call($puck_1.Option.map.call(typePathType.enumMember, function ([, enum_]) {
    return enum_;
  }), function () {
    return typePathType.providesType;
  }), typePathType);
  let $puck_14 = typePathType.kind;
  if ($puck_14.kind === "Enum") {
    let {value: enum_} = $puck_14;
    if ($puck_1.ObjectMap.size.call(enum_.members) > 1) {
      return true;
    };
  };
  return false;
};
function declarePatternVariables(scope, visitor, p, type_, allowNotExhaustive, useParentScope = false, definitions = $puck_1.ObjectMap._new()) {
  let $puck_15 = p;
  if ($puck_15.kind === "CatchAll") {
    $puck_15;
    return $puck_1.Ok(undefined);
  }
  else {
    if ($puck_15.kind === "Identifier") {
      let {value: {identifier: identifier, mutable: mutable}} = $puck_15;
      if ($puck_1.ObjectMap.has.call(definitions, identifier.name)) {
        return $puck_1.Err(PatternError.ScopeError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true}, "\"" + identifier.name + "\" is already defined in this pattern"));
      }
      else {
        definitions[identifier.name] = true;
      };
      let $puck_16 = $puck_6.Scope.define.call(scope, {
        definition: $puck_5.Definition({
        file: $unwrapTraitObject(visitor).file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p, $isTraitObject: true},
      }),
        name: identifier.name,
        mutable: mutable,
        allowRedeclare: true,
        type_: type_,
        completeType: $puck_1.None,
        previous: $puck_1.None,
      }, useParentScope);
      if (($puck_16.kind === "Ok")) {
        let {value: binding} = $puck_16;
        p.binding = binding;
        return $puck_1.Ok(undefined);
      }
      else {
        if ($puck_16.kind === "Err") {
          let {value: err} = $puck_16;
          return $puck_1.Err(PatternError.ScopeError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true}, err));
        };
      };
    }
    else {
      if ($puck_15.kind === "Record") {
        let {value: record} = $puck_15;
        let $puck_17;
        if (type_) {
          let $puck_18 = type_.kind;
          let $puck_19;
          if ($puck_18.kind === "Struct") {
            let {value: struct} = $puck_18;
            let $puck_20 = struct.kind;
            let $puck_21;
            if ($puck_20.kind === "Record") {
              let {value: record} = $puck_20;
              $puck_21 = record.properties;
            }
            else {
              let $puck_22;
              if (true) {
                $puck_20;
                return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), type_));
              };
              $puck_21 = $puck_22;
            };
            $puck_19 = $puck_21;
          }
          else {
            let $puck_23;
            if ($puck_18.kind === "Parameter") {
              $puck_18;
              $puck_23 = {};
            }
            else {
              let $puck_24;
              if (true) {
                $puck_18;
                return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), type_));
              };
              $puck_23 = $puck_24;
            };
            $puck_19 = $puck_23;
          };
          $puck_17 = $puck_19;
        }
        else {
          $puck_17 = $puck_1.ObjectMap._new();
        };
        const props = $puck_17;
        let $puck_25 = $puck_1.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: record.properties, $isTraitObject: true})
;
        let b = $puck_1.Iterator[$puck_25.type].map.call($puck_25, function (p) {
          let $puck_26 = $puck_1.Option.mapOr.call($puck_1.ObjectMap.get.call(props, p.property.name), $puck_1.Ok($unwrapTraitObject($puck_4._undefined)), $puck_8.getRecordPropType(scope));
          let $puck_27;
          if ($puck_26.kind === "Ok") {
            let {value: type_} = $puck_26;
            $puck_27 = type_;
          }
          else {
            let $puck_28;
            if ($puck_26.kind === "Err") {
              let {value: err} = $puck_26;
              return [
                p.property.name,
                $puck_1.Err(PatternError.ScopeError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p.pattern, $isTraitObject: true}, $unwrapTraitObject(err))),
              ];
            };
            $puck_27 = $puck_28;
          };
          const type_ = $puck_27;
          return [
            p.property.name,
            declarePatternVariables(scope, visitor, p.pattern, $unwrapTraitObject(type_), allowNotExhaustive, useParentScope, definitions),
          ];
        });
        return $puck_1.Iterator[b.type].fold.call(b, $puck_1.Ok(undefined), function (acc, [name, type_]) {
          return $puck_1.Result.andThen.call(acc, function ($puck_29) {
            return type_;
          });
        });
      }
      else {
        if ($puck_15.kind === "RecordType") {
          let {value: [typePath, record]} = $puck_15;
          let $puck_30 = getValueType(typePath, type_);
          let $puck_31;
          if ($puck_30.kind === "Ok") {
            let {value: type_} = $puck_30;
            $puck_31 = type_;
          }
          else {
            let $puck_32;
            if ($puck_30.kind === "Err") {
              let {value: [to, subject]} = $puck_30;
              return $puck_1.Err(PatternError.PatternMismatch(p, to, subject));
            };
            $puck_31 = $puck_32;
          };
          const recordType = $puck_31;
          let $puck_33 = recordType.kind;
          let $puck_34;
          if ($puck_33.kind === "Struct") {
            let {value: struct} = $puck_33;
            let $puck_35 = struct.kind;
            let $puck_36;
            if ($puck_35.kind === "Record") {
              let {value: record} = $puck_35;
              $puck_36 = record.properties;
            }
            else {
              let $puck_37;
              if (true) {
                $puck_35;
                return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), recordType));
              };
              $puck_36 = $puck_37;
            };
            $puck_34 = $puck_36;
          }
          else {
            let $puck_38;
            if ($puck_33.kind === "Parameter") {
              $puck_33;
              $puck_38 = {};
            }
            else {
              let $puck_39;
              if (true) {
                $puck_33;
                return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), recordType));
              };
              $puck_38 = $puck_39;
            };
            $puck_34 = $puck_38;
          };
          const props = $puck_34;
          if ((!allowNotExhaustive && isNonExhaustive(typePath))) {
            return $puck_1.Err(PatternError.NotExhaustive);
          };
          let $puck_40 = $puck_1.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].toList.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: record.properties, $isTraitObject: true}), $isTraitObject: true})
;
          let a = $puck_1.Iterator[$puck_40.type].map.call($puck_40, function (p) {
            let $puck_41 = $puck_1.Option.mapOr.call($puck_1.ObjectMap.get.call(props, p.property.name), $puck_1.Ok($unwrapTraitObject($puck_4._undefined)), $puck_8.getRecordPropType(scope));
            let $puck_42;
            if ($puck_41.kind === "Ok") {
              let {value: type_} = $puck_41;
              $puck_42 = type_;
            }
            else {
              let $puck_43;
              if ($puck_41.kind === "Err") {
                let {value: err} = $puck_41;
                return [
                  p.property.name,
                  $puck_1.Err(PatternError.ScopeError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p.pattern, $isTraitObject: true}, $unwrapTraitObject(err))),
                ];
              };
              $puck_42 = $puck_43;
            };
            const type_ = $puck_42;
            return [
              p.property.name,
              declarePatternVariables(scope, visitor, p.pattern, $unwrapTraitObject(type_), allowNotExhaustive, useParentScope, definitions),
            ];
          });
          return $puck_1.Iterator[a.type].fold.call(a, $puck_1.Ok(undefined), function (acc, [name, type_]) {
            return $puck_1.Result.andThen.call(acc, function ($puck_44) {
              return type_;
            });
          });
        }
        else {
          if ($puck_15.kind === "Tuple") {
            let {value: tuple} = $puck_15;
            let $puck_45;
            if (type_) {
              let $puck_46 = type_.kind;
              let $puck_47;
              if ($puck_46.kind === "Struct") {
                let {value: struct} = $puck_46;
                let $puck_48 = struct.kind;
                let $puck_49;
                if ($puck_48.kind === "Tuple") {
                  let {value: tuple} = $puck_48;
                  $puck_49 = tuple.properties;
                }
                else {
                  let $puck_50;
                  if (true) {
                    $puck_48;
                    return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), type_));
                  };
                  $puck_49 = $puck_50;
                };
                $puck_47 = $puck_49;
              }
              else {
                let $puck_51;
                if ($puck_46.kind === "Parameter") {
                  $puck_46;
                  $puck_51 = [];
                }
                else {
                  let $puck_52;
                  if (true) {
                    $puck_46;
                    return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), type_));
                  };
                  $puck_51 = $puck_52;
                };
                $puck_47 = $puck_51;
              };
              $puck_45 = $puck_47;
            }
            else {
              $puck_45 = [];
            };
            const props = $puck_45;
            let $puck_55 = $puck_1.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: tuple.properties, $isTraitObject: true})
;
            let $puck_54 = $puck_1.Iterator[$puck_55.type].enumerate.call($puck_55)
;
            let $puck_53 = $puck_1.Iterator[$puck_54.type].map.call($puck_54, function ([i, p]) {
              return declarePatternVariables(scope, visitor, p, $puck_1.Option.unwrapOr.call($puck_1.List.get.call(props, i), $unwrapTraitObject($puck_4._undefined)), allowNotExhaustive, useParentScope, definitions);
            })
;
            return $puck_1.Iterator[$puck_53.type].fold.call($puck_53, $puck_1.Ok(undefined), function (acc, cur) {
              return $puck_1.Result.andThen.call(acc, function ($puck_56) {
                return cur;
              });
            });
          }
          else {
            if ($puck_15.kind === "TupleType") {
              let {value: [typePath, tuple]} = $puck_15;
              let $puck_57 = getValueType(typePath, type_);
              let $puck_58;
              if ($puck_57.kind === "Ok") {
                let {value: type_} = $puck_57;
                $puck_58 = type_;
              }
              else {
                let $puck_59;
                if ($puck_57.kind === "Err") {
                  let {value: [to, subject]} = $puck_57;
                  return $puck_1.Err(PatternError.PatternMismatch(p, to, subject));
                };
                $puck_58 = $puck_59;
              };
              const tupleType = $puck_58;
              let $puck_60 = tupleType.kind;
              let $puck_61;
              if ($puck_60.kind === "Struct") {
                let {value: struct} = $puck_60;
                let $puck_62 = struct.kind;
                let $puck_63;
                if ($puck_62.kind === "Tuple") {
                  let {value: tuple} = $puck_62;
                  $puck_63 = tuple.properties;
                }
                else {
                  let $puck_64;
                  if (true) {
                    $puck_62;
                    return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), tupleType));
                  };
                  $puck_63 = $puck_64;
                };
                $puck_61 = $puck_63;
              }
              else {
                let $puck_65;
                if ($puck_60.kind === "Parameter") {
                  $puck_60;
                  $puck_65 = [];
                }
                else {
                  let $puck_66;
                  if (true) {
                    $puck_60;
                    return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), tupleType));
                  };
                  $puck_65 = $puck_66;
                };
                $puck_61 = $puck_65;
              };
              const props = $puck_61;
              if ((!allowNotExhaustive && isNonExhaustive(typePath))) {
                return $puck_1.Err(PatternError.NotExhaustive);
              };
              let $puck_69 = $puck_1.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: tuple.properties, $isTraitObject: true})
;
              let $puck_68 = $puck_1.Iterator[$puck_69.type].enumerate.call($puck_69)
;
              let $puck_67 = $puck_1.Iterator[$puck_68.type].map.call($puck_68, function ([i, p]) {
                return declarePatternVariables(scope, visitor, p, $puck_1.Option.unwrapOr.call($puck_1.List.get.call(props, i), $unwrapTraitObject($puck_4._undefined)), allowNotExhaustive, useParentScope, definitions);
              })
;
              return $puck_1.Iterator[$puck_67.type].fold.call($puck_67, $puck_1.Ok(undefined), function (acc, cur) {
                return $puck_1.Result.andThen.call(acc, function ($puck_70) {
                  return cur;
                });
              });
            }
            else {
              if ($puck_15.kind === "UnitType") {
                let {value: typePath} = $puck_15;
                if ((!allowNotExhaustive && isNonExhaustive(typePath))) {
                  return $puck_1.Err(PatternError.NotExhaustive);
                };
                return $puck_1.Ok(undefined);
              };
            };
          };
        };
      };
    };
  };
};
exports.declarePatternVariables = declarePatternVariables
