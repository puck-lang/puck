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
      let {value: [[member, typePathEnum]]} = $puck_8;
      let $puck_9 = type_.kind;
      if ($unwrapTraitObject($puck_9).kind === "Enum") {
        let {value: [$puck_10]} = $unwrapTraitObject($puck_9);
      }
      else {
        if ($unwrapTraitObject($puck_9).kind === "Parameter") {
          let undefined = $unwrapTraitObject($puck_9);
        }
        else {
          if (true) {
            let $puck_11 = $puck_9;
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
  let $puck_12 = structType.kind;
  if ($unwrapTraitObject($puck_12).kind === "Enum") {
    let {value: [enum_]} = $unwrapTraitObject($puck_12);
    let $puck_13 = typePathType.enumMember;
    if ($puck_13.kind === "Some") {
      let {value: [[member, typePathEnum]]} = $puck_13;
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
      let $puck_14 = $puck_12;
      return $puck_1.Ok(structType);
    };
  };
};
function isNonExhaustive(typePath) {
  let typePathType = $unwrapTraitObject(typePath.type_);
  typePathType = $puck_1.Option.unwrapOr.call($puck_1.Option.orElse.call($puck_1.Option.map.call(typePathType.enumMember, function ([$puck_15, enum_]) {
    return enum_;
  }), function () {
    return typePathType.providesType;
  }), typePathType);
  let $puck_16 = typePathType.kind;
  if ($puck_16.kind === "Enum") {
    let {value: [enum_]} = $puck_16;
    if ($puck_1.ObjectMap.size.call(enum_.members) > 1) {
      return true;
    };
  };
  return false;
};
function declarePatternVariables(scope, visitor, p, type_, allowNotExhaustive, useParentScope = false, definitions = $puck_1.ObjectMap._new()) {
  let $puck_17 = p;
  if ($unwrapTraitObject($puck_17).kind === "CatchAll") {
    let undefined = $unwrapTraitObject($puck_17);
    return $puck_1.Ok([]);
  }
  else {
    if ($unwrapTraitObject($puck_17).kind === "Identifier") {
      let {value: {identifier: identifier, mutable: mutable}} = $unwrapTraitObject($puck_17);
      if ($puck_1.ObjectMap.has.call(definitions, identifier.name)) {
        return $puck_1.Err(PatternError.ScopeError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true}, "\"" + identifier.name + "\" is already defined in this pattern"));
      }
      else {
        definitions[identifier.name] = true;
      };
      let $puck_18 = $puck_5.Scope.define.call(scope, {
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
      if (($unwrapTraitObject($puck_18).kind === "Ok")) {
        let {value: [binding]} = $unwrapTraitObject($puck_18);
        p.binding = binding;
        return $puck_1.Ok([]);
      }
      else {
        if ($unwrapTraitObject($puck_18).kind === "Err") {
          let {value: [err]} = $unwrapTraitObject($puck_18);
          return $puck_1.Err(PatternError.ScopeError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true}, err));
        };
      };
    }
    else {
      if ($unwrapTraitObject($puck_17).kind === "Record") {
        let {value: [record]} = $unwrapTraitObject($puck_17);
        let $puck_19;
        if (type_) {
          let $puck_20 = type_.kind;
          let $puck_21;
          if ($unwrapTraitObject($puck_20).kind === "Struct") {
            let {value: [struct]} = $unwrapTraitObject($puck_20);
            let $puck_22 = struct.kind;
            let $puck_23;
            if ($unwrapTraitObject($puck_22).kind === "Record") {
              let {value: [record]} = $unwrapTraitObject($puck_22);
              $puck_23 = record.properties;
            }
            else {
              let $puck_24;
              if (true) {
                let $puck_25 = $puck_22;
                return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), type_));
              };
              $puck_23 = $puck_24;
            };
            $puck_21 = $puck_23;
          }
          else {
            let $puck_26;
            if ($unwrapTraitObject($puck_20).kind === "Parameter") {
              let undefined = $unwrapTraitObject($puck_20);
              $puck_26 = {};
            }
            else {
              let $puck_27;
              if (true) {
                let $puck_28 = $puck_20;
                return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), type_));
              };
              $puck_26 = $puck_27;
            };
            $puck_21 = $puck_26;
          };
          $puck_19 = $puck_21;
        }
        else {
          $puck_19 = $puck_1.ObjectMap._new();
        };
        const props = $puck_19;
        let $puck_30 = $puck_1.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: record.properties, $isTraitObject: true})
;
        let $puck_29 = $puck_1.Iterator[$puck_30.type].map.call($puck_30, function (p) {
          return [
            p.property.name,
            declarePatternVariables(scope, visitor, p.pattern, $unwrapTraitObject(props[p.property.name]), allowNotExhaustive, useParentScope, definitions),
          ];
        })
;
        return $puck_1.Iterator[$puck_29.type].fold.call($puck_29, $puck_1.Ok([]), function (acc, [name, type_]) {
          return $puck_1.Result.andThen.call(acc, function ($puck_31) {
            return type_;
          });
        });
      }
      else {
        if ($unwrapTraitObject($puck_17).kind === "RecordType") {
          let {value: [typePath, record]} = $unwrapTraitObject($puck_17);
          let $puck_32 = getValueType(typePath, type_);
          let $puck_33;
          if ($unwrapTraitObject($puck_32).kind === "Ok") {
            let {value: [type_]} = $unwrapTraitObject($puck_32);
            $puck_33 = type_;
          }
          else {
            let $puck_34;
            if ($unwrapTraitObject($puck_32).kind === "Err") {
              let {value: [[to, subject]]} = $unwrapTraitObject($puck_32);
              return $puck_1.Err(PatternError.PatternMismatch(p, to, subject));
            };
            $puck_33 = $puck_34;
          };
          const recordType = $puck_33;
          let $puck_35 = recordType.kind;
          let $puck_36;
          if ($unwrapTraitObject($puck_35).kind === "Struct") {
            let {value: [struct]} = $unwrapTraitObject($puck_35);
            let $puck_37 = struct.kind;
            let $puck_38;
            if ($unwrapTraitObject($puck_37).kind === "Record") {
              let {value: [record]} = $unwrapTraitObject($puck_37);
              $puck_38 = record.properties;
            }
            else {
              let $puck_39;
              if (true) {
                let $puck_40 = $puck_37;
                return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), recordType));
              };
              $puck_38 = $puck_39;
            };
            $puck_36 = $puck_38;
          }
          else {
            let $puck_41;
            if ($unwrapTraitObject($puck_35).kind === "Parameter") {
              let undefined = $unwrapTraitObject($puck_35);
              $puck_41 = {};
            }
            else {
              let $puck_42;
              if (true) {
                let $puck_43 = $puck_35;
                return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), recordType));
              };
              $puck_41 = $puck_42;
            };
            $puck_36 = $puck_41;
          };
          const props = $puck_36;
          if ((!allowNotExhaustive && isNonExhaustive(typePath))) {
            return $puck_1.Err(PatternError.NotExhaustive);
          };
          let $puck_45 = $puck_1.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].toList.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: record.properties, $isTraitObject: true}), $isTraitObject: true})
;
          let $puck_44 = $puck_1.Iterator[$puck_45.type].map.call($puck_45, function (p) {
            return [
              p.property.name,
              declarePatternVariables(scope, visitor, p.pattern, $unwrapTraitObject(props[p.property.name]), allowNotExhaustive, useParentScope, definitions),
            ];
          })
;
          return $puck_1.Iterator[$puck_44.type].fold.call($puck_44, $puck_1.Ok([]), function (acc, [name, type_]) {
            return $puck_1.Result.andThen.call(acc, function ($puck_46) {
              return type_;
            });
          });
        }
        else {
          if ($unwrapTraitObject($puck_17).kind === "Tuple") {
            let {value: [tuple]} = $unwrapTraitObject($puck_17);
            let $puck_47;
            if (type_) {
              let $puck_48 = type_.kind;
              let $puck_49;
              if ($unwrapTraitObject($puck_48).kind === "Struct") {
                let {value: [struct]} = $unwrapTraitObject($puck_48);
                let $puck_50 = struct.kind;
                let $puck_51;
                if ($unwrapTraitObject($puck_50).kind === "Tuple") {
                  let {value: [tuple]} = $unwrapTraitObject($puck_50);
                  $puck_51 = tuple.properties;
                }
                else {
                  let $puck_52;
                  if (true) {
                    let $puck_53 = $puck_50;
                    return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), type_));
                  };
                  $puck_51 = $puck_52;
                };
                $puck_49 = $puck_51;
              }
              else {
                let $puck_54;
                if ($unwrapTraitObject($puck_48).kind === "Parameter") {
                  let undefined = $unwrapTraitObject($puck_48);
                  $puck_54 = [];
                }
                else {
                  let $puck_55;
                  if (true) {
                    let $puck_56 = $puck_48;
                    return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), type_));
                  };
                  $puck_54 = $puck_55;
                };
                $puck_49 = $puck_54;
              };
              $puck_47 = $puck_49;
            }
            else {
              $puck_47 = [];
            };
            const props = $puck_47;
            let $puck_59 = $puck_1.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: tuple.properties, $isTraitObject: true})
;
            let $puck_58 = $puck_1.Iterator[$puck_59.type].enumerate.call($puck_59)
;
            let $puck_57 = $puck_1.Iterator[$puck_58.type].map.call($puck_58, function ([i, p]) {
              return declarePatternVariables(scope, visitor, p, $unwrapTraitObject(props[i]), allowNotExhaustive, useParentScope, definitions);
            })
;
            return $puck_1.Iterator[$puck_57.type].fold.call($puck_57, $puck_1.Ok([]), function (acc, cur) {
              return $puck_1.Result.andThen.call(acc, function ($puck_60) {
                return cur;
              });
            });
          }
          else {
            if ($unwrapTraitObject($puck_17).kind === "TupleType") {
              let {value: [typePath, tuple]} = $unwrapTraitObject($puck_17);
              let $puck_61 = getValueType(typePath, type_);
              let $puck_62;
              if ($unwrapTraitObject($puck_61).kind === "Ok") {
                let {value: [type_]} = $unwrapTraitObject($puck_61);
                $puck_62 = type_;
              }
              else {
                let $puck_63;
                if ($unwrapTraitObject($puck_61).kind === "Err") {
                  let {value: [[to, subject]]} = $unwrapTraitObject($puck_61);
                  return $puck_1.Err(PatternError.PatternMismatch(p, to, subject));
                };
                $puck_62 = $puck_63;
              };
              const tupleType = $puck_62;
              let $puck_64 = tupleType.kind;
              let $puck_65;
              if ($unwrapTraitObject($puck_64).kind === "Struct") {
                let {value: [struct]} = $unwrapTraitObject($puck_64);
                let $puck_66 = struct.kind;
                let $puck_67;
                if ($unwrapTraitObject($puck_66).kind === "Tuple") {
                  let {value: [tuple]} = $unwrapTraitObject($puck_66);
                  $puck_67 = tuple.properties;
                }
                else {
                  let $puck_68;
                  if (true) {
                    let $puck_69 = $puck_66;
                    return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), tupleType));
                  };
                  $puck_67 = $puck_68;
                };
                $puck_65 = $puck_67;
              }
              else {
                let $puck_70;
                if ($unwrapTraitObject($puck_64).kind === "Parameter") {
                  let undefined = $unwrapTraitObject($puck_64);
                  $puck_70 = [];
                }
                else {
                  let $puck_71;
                  if (true) {
                    let $puck_72 = $puck_64;
                    return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), tupleType));
                  };
                  $puck_70 = $puck_71;
                };
                $puck_65 = $puck_70;
              };
              const props = $puck_65;
              if ((!allowNotExhaustive && isNonExhaustive(typePath))) {
                return $puck_1.Err(PatternError.NotExhaustive);
              };
              let $puck_75 = $puck_1.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: tuple.properties, $isTraitObject: true})
;
              let $puck_74 = $puck_1.Iterator[$puck_75.type].enumerate.call($puck_75)
;
              let $puck_73 = $puck_1.Iterator[$puck_74.type].map.call($puck_74, function ([i, p]) {
                return declarePatternVariables(scope, visitor, p, $unwrapTraitObject(props[i]), allowNotExhaustive, useParentScope, definitions);
              })
;
              return $puck_1.Iterator[$puck_73.type].fold.call($puck_73, $puck_1.Ok([]), function (acc, cur) {
                return $puck_1.Result.andThen.call(acc, function ($puck_76) {
                  return cur;
                });
              });
            }
            else {
              if ($unwrapTraitObject($puck_17).kind === "UnitType") {
                let {value: [typePath]} = $unwrapTraitObject($puck_17);
                if ((!allowNotExhaustive && isNonExhaustive(typePath))) {
                  return $puck_1.Err(PatternError.NotExhaustive);
                };
                return $puck_1.Ok([]);
              };
            };
          };
        };
      };
    };
  };
};
exports.declarePatternVariables = declarePatternVariables
