'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.PatternError = exports.declarePatternVariablesundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("./../../ast/ast");
const $puck_3 = require("./../../ast/span");
const $puck_4 = require("./../../entities");
const $puck_5 = require("./scope");
const $puck_6 = require("./types");
var PatternError = exports.PatternError = {
ScopeError: (...members) => ({kind: 'ScopeError', value: members}),
PatternMismatch: (...members) => ({kind: 'PatternMismatch', value: members}),
NotExhaustive: {kind: 'NotExhaustive', value: Symbol('NotExhaustive')},
};
function getValueType(typePath, type_) {
  const typePathType = $unwrapTraitObject(typePath.type_);
  const typePathProvidesType = $puck_1.Option.unwrapOr.call(typePathType.providesType, typePathType);
  let $puck_7;
  if (type_) {
    let $puck_8 = typePathType.enumMember;
    if ($puck_8.kind === "Some") {
      let {value: [member, typePathEnum]} = $puck_8;
      let $puck_9 = type_.kind;
      if ($unwrapTraitObject($puck_9).kind === "Enum") {
        $unwrapTraitObject($puck_9);
      }
      else {
        if ($unwrapTraitObject($puck_9).kind === "Parameter") {
          $unwrapTraitObject($puck_9);
        }
        else {
          if (true) {
            $puck_9;
            return $puck_1.Err([
              typePathEnum,
              type_,
            ]);
          };
        };
      };
    };
    $puck_7 = type_;
  }
  else {
    $puck_7 = typePathProvidesType;
  };
  const structType = $puck_7;
  let $puck_10 = structType.kind;
  if ($unwrapTraitObject($puck_10).kind === "Enum") {
    let {value: enum_} = $unwrapTraitObject($puck_10);
    let $puck_11 = typePathType.enumMember;
    if ($puck_11.kind === "Some") {
      let {value: [member, typePathEnum]} = $puck_11;
      if ($puck_6.isAssignable(typePathEnum, type_)) {
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
      $puck_10;
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
  let $puck_12 = typePathType.kind;
  if ($puck_12.kind === "Enum") {
    let {value: enum_} = $puck_12;
    if ($puck_1.ObjectMap.size.call(enum_.members) > 1) {
      return true;
    };
  };
  return false;
};
function declarePatternVariables(scope, visitor, p, type_, allowNotExhaustive, useParentScope = false, definitions = $puck_1.ObjectMap._new()) {
  let $puck_13 = p;
  if ($unwrapTraitObject($puck_13).kind === "CatchAll") {
    $unwrapTraitObject($puck_13);
    return $puck_1.Ok(null);
  }
  else {
    if ($unwrapTraitObject($puck_13).kind === "Identifier") {
      let {value: {identifier: identifier, mutable: mutable}} = $unwrapTraitObject($puck_13);
      if ($puck_1.ObjectMap.has.call(definitions, identifier.name)) {
        return $puck_1.Err(PatternError.ScopeError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true}, "\"" + identifier.name + "\" is already defined in this pattern"));
      }
      else {
        definitions[identifier.name] = true;
      };
      let $puck_14 = $puck_5.Scope.define.call(scope, {
        definition: $puck_4.Definition({
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
      if (($unwrapTraitObject($puck_14).kind === "Ok")) {
        let {value: binding} = $unwrapTraitObject($puck_14);
        p.binding = binding;
        return $puck_1.Ok(null);
      }
      else {
        if ($unwrapTraitObject($puck_14).kind === "Err") {
          let {value: err} = $unwrapTraitObject($puck_14);
          return $puck_1.Err(PatternError.ScopeError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true}, err));
        };
      };
    }
    else {
      if ($unwrapTraitObject($puck_13).kind === "Record") {
        let {value: record} = $unwrapTraitObject($puck_13);
        let $puck_15;
        if (type_) {
          let $puck_16 = type_.kind;
          let $puck_17;
          if ($unwrapTraitObject($puck_16).kind === "Struct") {
            let {value: struct} = $unwrapTraitObject($puck_16);
            let $puck_18 = struct.kind;
            let $puck_19;
            if ($unwrapTraitObject($puck_18).kind === "Record") {
              let {value: record} = $unwrapTraitObject($puck_18);
              $puck_19 = record.properties;
            }
            else {
              let $puck_20;
              if (true) {
                $puck_18;
                return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), type_));
              };
              $puck_19 = $puck_20;
            };
            $puck_17 = $puck_19;
          }
          else {
            let $puck_21;
            if ($unwrapTraitObject($puck_16).kind === "Parameter") {
              $unwrapTraitObject($puck_16);
              $puck_21 = {};
            }
            else {
              let $puck_22;
              if (true) {
                $puck_16;
                return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), type_));
              };
              $puck_21 = $puck_22;
            };
            $puck_17 = $puck_21;
          };
          $puck_15 = $puck_17;
        }
        else {
          $puck_15 = $puck_1.ObjectMap._new();
        };
        const props = $puck_15;
        let $puck_24 = $puck_1.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: record.properties, $isTraitObject: true})
;
        let $puck_23 = $puck_1.Iterator[$puck_24.type].map.call($puck_24, function (p) {
          return [
            p.property.name,
            declarePatternVariables(scope, visitor, p.pattern, $unwrapTraitObject(props[p.property.name]), allowNotExhaustive, useParentScope, definitions),
          ];
        })
;
        return $puck_1.Iterator[$puck_23.type].fold.call($puck_23, $puck_1.Ok(null), function (acc, [name, type_]) {
          return $puck_1.Result.andThen.call(acc, function ($puck_25) {
            return type_;
          });
        });
      }
      else {
        if ($unwrapTraitObject($puck_13).kind === "RecordType") {
          let {value: [typePath, record]} = $unwrapTraitObject($puck_13);
          let $puck_26 = getValueType(typePath, type_);
          let $puck_27;
          if ($unwrapTraitObject($puck_26).kind === "Ok") {
            let {value: type_} = $unwrapTraitObject($puck_26);
            $puck_27 = type_;
          }
          else {
            let $puck_28;
            if ($unwrapTraitObject($puck_26).kind === "Err") {
              let {value: [to, subject]} = $unwrapTraitObject($puck_26);
              return $puck_1.Err(PatternError.PatternMismatch(p, to, subject));
            };
            $puck_27 = $puck_28;
          };
          const recordType = $puck_27;
          let $puck_29 = recordType.kind;
          let $puck_30;
          if ($unwrapTraitObject($puck_29).kind === "Struct") {
            let {value: struct} = $unwrapTraitObject($puck_29);
            let $puck_31 = struct.kind;
            let $puck_32;
            if ($unwrapTraitObject($puck_31).kind === "Record") {
              let {value: record} = $unwrapTraitObject($puck_31);
              $puck_32 = record.properties;
            }
            else {
              let $puck_33;
              if (true) {
                $puck_31;
                return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), recordType));
              };
              $puck_32 = $puck_33;
            };
            $puck_30 = $puck_32;
          }
          else {
            let $puck_34;
            if ($unwrapTraitObject($puck_29).kind === "Parameter") {
              $unwrapTraitObject($puck_29);
              $puck_34 = {};
            }
            else {
              let $puck_35;
              if (true) {
                $puck_29;
                return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), recordType));
              };
              $puck_34 = $puck_35;
            };
            $puck_30 = $puck_34;
          };
          const props = $puck_30;
          if ((!allowNotExhaustive && isNonExhaustive(typePath))) {
            return $puck_1.Err(PatternError.NotExhaustive);
          };
          let $puck_37 = $puck_1.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].toList.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: record.properties, $isTraitObject: true}), $isTraitObject: true})
;
          let $puck_36 = $puck_1.Iterator[$puck_37.type].map.call($puck_37, function (p) {
            return [
              p.property.name,
              declarePatternVariables(scope, visitor, p.pattern, $unwrapTraitObject(props[p.property.name]), allowNotExhaustive, useParentScope, definitions),
            ];
          })
;
          return $puck_1.Iterator[$puck_36.type].fold.call($puck_36, $puck_1.Ok(null), function (acc, [name, type_]) {
            return $puck_1.Result.andThen.call(acc, function ($puck_38) {
              return type_;
            });
          });
        }
        else {
          if ($unwrapTraitObject($puck_13).kind === "Tuple") {
            let {value: tuple} = $unwrapTraitObject($puck_13);
            let $puck_39;
            if (type_) {
              let $puck_40 = type_.kind;
              let $puck_41;
              if ($unwrapTraitObject($puck_40).kind === "Struct") {
                let {value: struct} = $unwrapTraitObject($puck_40);
                let $puck_42 = struct.kind;
                let $puck_43;
                if ($unwrapTraitObject($puck_42).kind === "Tuple") {
                  let {value: tuple} = $unwrapTraitObject($puck_42);
                  $puck_43 = tuple.properties;
                }
                else {
                  let $puck_44;
                  if (true) {
                    $puck_42;
                    return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), type_));
                  };
                  $puck_43 = $puck_44;
                };
                $puck_41 = $puck_43;
              }
              else {
                let $puck_45;
                if ($unwrapTraitObject($puck_40).kind === "Parameter") {
                  $unwrapTraitObject($puck_40);
                  $puck_45 = [];
                }
                else {
                  let $puck_46;
                  if (true) {
                    $puck_40;
                    return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), type_));
                  };
                  $puck_45 = $puck_46;
                };
                $puck_41 = $puck_45;
              };
              $puck_39 = $puck_41;
            }
            else {
              $puck_39 = [];
            };
            const props = $puck_39;
            let $puck_49 = $puck_1.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: tuple.properties, $isTraitObject: true})
;
            let $puck_48 = $puck_1.Iterator[$puck_49.type].enumerate.call($puck_49)
;
            let $puck_47 = $puck_1.Iterator[$puck_48.type].map.call($puck_48, function ([i, p]) {
              return declarePatternVariables(scope, visitor, p, $unwrapTraitObject(props[i]), allowNotExhaustive, useParentScope, definitions);
            })
;
            return $puck_1.Iterator[$puck_47.type].fold.call($puck_47, $puck_1.Ok(null), function (acc, cur) {
              return $puck_1.Result.andThen.call(acc, function ($puck_50) {
                return cur;
              });
            });
          }
          else {
            if ($unwrapTraitObject($puck_13).kind === "TupleType") {
              let {value: [typePath, tuple]} = $unwrapTraitObject($puck_13);
              let $puck_51 = getValueType(typePath, type_);
              let $puck_52;
              if ($unwrapTraitObject($puck_51).kind === "Ok") {
                let {value: type_} = $unwrapTraitObject($puck_51);
                $puck_52 = type_;
              }
              else {
                let $puck_53;
                if ($unwrapTraitObject($puck_51).kind === "Err") {
                  let {value: [to, subject]} = $unwrapTraitObject($puck_51);
                  return $puck_1.Err(PatternError.PatternMismatch(p, to, subject));
                };
                $puck_52 = $puck_53;
              };
              const tupleType = $puck_52;
              let $puck_54 = tupleType.kind;
              let $puck_55;
              if ($unwrapTraitObject($puck_54).kind === "Struct") {
                let {value: struct} = $unwrapTraitObject($puck_54);
                let $puck_56 = struct.kind;
                let $puck_57;
                if ($unwrapTraitObject($puck_56).kind === "Tuple") {
                  let {value: tuple} = $unwrapTraitObject($puck_56);
                  $puck_57 = tuple.properties;
                }
                else {
                  let $puck_58;
                  if (true) {
                    $puck_56;
                    return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), tupleType));
                  };
                  $puck_57 = $puck_58;
                };
                $puck_55 = $puck_57;
              }
              else {
                let $puck_59;
                if ($unwrapTraitObject($puck_54).kind === "Parameter") {
                  $unwrapTraitObject($puck_54);
                  $puck_59 = [];
                }
                else {
                  let $puck_60;
                  if (true) {
                    $puck_54;
                    return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), tupleType));
                  };
                  $puck_59 = $puck_60;
                };
                $puck_55 = $puck_59;
              };
              const props = $puck_55;
              if ((!allowNotExhaustive && isNonExhaustive(typePath))) {
                return $puck_1.Err(PatternError.NotExhaustive);
              };
              let $puck_63 = $puck_1.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: tuple.properties, $isTraitObject: true})
;
              let $puck_62 = $puck_1.Iterator[$puck_63.type].enumerate.call($puck_63)
;
              let $puck_61 = $puck_1.Iterator[$puck_62.type].map.call($puck_62, function ([i, p]) {
                return declarePatternVariables(scope, visitor, p, $unwrapTraitObject(props[i]), allowNotExhaustive, useParentScope, definitions);
              })
;
              return $puck_1.Iterator[$puck_61.type].fold.call($puck_61, $puck_1.Ok(null), function (acc, cur) {
                return $puck_1.Result.andThen.call(acc, function ($puck_64) {
                  return cur;
                });
              });
            }
            else {
              if ($unwrapTraitObject($puck_13).kind === "UnitType") {
                let {value: typePath} = $unwrapTraitObject($puck_13);
                if ((!allowNotExhaustive && isNonExhaustive(typePath))) {
                  return $puck_1.Err(PatternError.NotExhaustive);
                };
                return $puck_1.Ok(null);
              };
            };
          };
        };
      };
    };
  };
};
exports.declarePatternVariables = declarePatternVariables
