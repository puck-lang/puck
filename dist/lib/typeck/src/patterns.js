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
    if ($puck_8.kind == "Some") {
      let {value: [[member, typePathEnum]]} = $puck_8;
      let $puck_9 = type_.kind;
      if ($unwrapTraitObject($puck_9).kind == "Enum") {
        let {value: [$puck_10]} = $unwrapTraitObject($puck_9);
      }
      else {
        if ($unwrapTraitObject($puck_9).kind == "Parameter") {
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
  if ($unwrapTraitObject($puck_12).kind == "Enum") {
    let {value: [enum_]} = $unwrapTraitObject($puck_12);
    let $puck_13 = typePathType.enumMember;
    if ($puck_13.kind == "Some") {
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
  if ($puck_16.kind == "Enum") {
    let {value: [enum_]} = $puck_16;
    if ($puck_1.ObjectMap.size.call(enum_.members) > 1) {
      return true;
    };
  };
  return false;
};
function declarePatternVariables(scope, visitor, p, mutable, type_, allowNotExhaustive, useParentScope = false, definitions = $puck_1.ObjectMap._new()) {
  let $puck_17 = p;
  if ($unwrapTraitObject($puck_17).kind == "CatchAll") {
    let undefined = $unwrapTraitObject($puck_17);
    return $puck_1.Ok([]);
  }
  else {
    if ($unwrapTraitObject($puck_17).kind == "Identifier") {
      let {value: [identifier]} = $unwrapTraitObject($puck_17);
      if ($puck_1.ObjectMap.has.call(definitions, identifier.name)) {
        return $puck_1.Err(PatternError.ScopeError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true}, "\"" + identifier.name + "\" is already defined in this pattern"));
      }
      else {
        definitions[identifier.name] = true;
      };
      let $puck_18 = $puck_5.Scope.define.call(scope, {
        name: identifier.name,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p, $isTraitObject: true},
        mutable: mutable,
        allowRedeclare: true,
        type_: type_,
        completeType: $puck_1.None,
        previous: $puck_1.None,
      }, useParentScope);
      if (($unwrapTraitObject($puck_18).kind == "Ok")) {
        let {value: [binding]} = $unwrapTraitObject($puck_18);
        p.binding = binding;
        return $puck_1.Ok([]);
      }
      else {
        if ($unwrapTraitObject($puck_18).kind == "Err") {
          let {value: [err]} = $unwrapTraitObject($puck_18);
          return $puck_1.Err(PatternError.ScopeError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true}, err));
        };
      };
    }
    else {
      if ($unwrapTraitObject($puck_17).kind == "Record") {
        let {value: [record]} = $unwrapTraitObject($puck_17);
        let $puck_19;
        if (type_) {
          let $puck_20 = type_.kind;
          let $puck_21;
          if ($unwrapTraitObject($puck_20).kind == "Struct") {
            let {value: [struct]} = $unwrapTraitObject($puck_20);
            let $puck_22 = struct.kind;
            let $puck_23;
            if ($unwrapTraitObject($puck_22).kind == "Record") {
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
            if ($unwrapTraitObject($puck_20).kind == "Parameter") {
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
        const properties = $unwrapTraitObject($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: record.properties, $isTraitObject: true}, function (p) {
          return [
            p.property.name,
            declarePatternVariables(scope, visitor, p.pattern, mutable, $unwrapTraitObject(props[p.property.name]), allowNotExhaustive, useParentScope, definitions),
          ];
        }).value.reduce(function (acc, [name, type_]) {
          return $puck_1.Result.andThen.call(acc, function ($puck_29) {
            return type_;
          });
        }, $puck_1.Ok([])));
        return properties;
      }
      else {
        if ($unwrapTraitObject($puck_17).kind == "RecordType") {
          let {value: [typePath, record]} = $unwrapTraitObject($puck_17);
          let $puck_30 = getValueType(typePath, type_);
          let $puck_31;
          if ($unwrapTraitObject($puck_30).kind == "Ok") {
            let {value: [type_]} = $unwrapTraitObject($puck_30);
            $puck_31 = type_;
          }
          else {
            let $puck_32;
            if ($unwrapTraitObject($puck_30).kind == "Err") {
              let {value: [[to, subject]]} = $unwrapTraitObject($puck_30);
              return $puck_1.Err(PatternError.PatternMismatch(p, to, subject));
            };
            $puck_31 = $puck_32;
          };
          const recordType = $puck_31;
          let $puck_33 = recordType.kind;
          let $puck_34;
          if ($unwrapTraitObject($puck_33).kind == "Struct") {
            let {value: [struct]} = $unwrapTraitObject($puck_33);
            let $puck_35 = struct.kind;
            let $puck_36;
            if ($unwrapTraitObject($puck_35).kind == "Record") {
              let {value: [record]} = $unwrapTraitObject($puck_35);
              $puck_36 = record.properties;
            }
            else {
              let $puck_37;
              if (true) {
                let $puck_38 = $puck_35;
                return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), recordType));
              };
              $puck_36 = $puck_37;
            };
            $puck_34 = $puck_36;
          }
          else {
            let $puck_39;
            if ($unwrapTraitObject($puck_33).kind == "Parameter") {
              let undefined = $unwrapTraitObject($puck_33);
              $puck_39 = {};
            }
            else {
              let $puck_40;
              if (true) {
                let $puck_41 = $puck_33;
                return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), recordType));
              };
              $puck_39 = $puck_40;
            };
            $puck_34 = $puck_39;
          };
          const props = $puck_34;
          if ((!allowNotExhaustive && isNonExhaustive(typePath))) {
            return $puck_1.Err(PatternError.NotExhaustive);
          };
          const properties = $unwrapTraitObject($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].toList.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: record.properties, $isTraitObject: true}), $isTraitObject: true}, function (p) {
            return [
              p.property.name,
              declarePatternVariables(scope, visitor, p.pattern, mutable, $unwrapTraitObject(props[p.property.name]), allowNotExhaustive, useParentScope, definitions),
            ];
          }).value.reduce(function (acc, [name, type_]) {
            return $puck_1.Result.andThen.call(acc, function ($puck_42) {
              return type_;
            });
          }, $puck_1.Ok([])));
          return properties;
        }
        else {
          if ($unwrapTraitObject($puck_17).kind == "Tuple") {
            let {value: [tuple]} = $unwrapTraitObject($puck_17);
            let $puck_43;
            if (type_) {
              let $puck_44 = type_.kind;
              let $puck_45;
              if ($unwrapTraitObject($puck_44).kind == "Struct") {
                let {value: [struct]} = $unwrapTraitObject($puck_44);
                let $puck_46 = struct.kind;
                let $puck_47;
                if ($unwrapTraitObject($puck_46).kind == "Tuple") {
                  let {value: [tuple]} = $unwrapTraitObject($puck_46);
                  $puck_47 = tuple.properties;
                }
                else {
                  let $puck_48;
                  if (true) {
                    let $puck_49 = $puck_46;
                    return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), type_));
                  };
                  $puck_47 = $puck_48;
                };
                $puck_45 = $puck_47;
              }
              else {
                let $puck_50;
                if ($unwrapTraitObject($puck_44).kind == "Parameter") {
                  let undefined = $unwrapTraitObject($puck_44);
                  $puck_50 = [];
                }
                else {
                  let $puck_51;
                  if (true) {
                    let $puck_52 = $puck_44;
                    return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), type_));
                  };
                  $puck_50 = $puck_51;
                };
                $puck_45 = $puck_50;
              };
              $puck_43 = $puck_45;
            }
            else {
              $puck_43 = [];
            };
            const props = $puck_43;
            let $puck_54 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true})
;
            let $puck_53 = $puck_1.Iterable[$puck_54.type].map.call($puck_54, function ([i, p]) {
              return declarePatternVariables(scope, visitor, p, mutable, $unwrapTraitObject(props[i]), allowNotExhaustive, useParentScope, definitions);
            })
;
            const properties = $unwrapTraitObject($puck_1.Iterable[$puck_53.type].toList.call($puck_53).reduce(function (acc, cur) {
              return $puck_1.Result.andThen.call(acc, function ($puck_55) {
                return cur;
              });
            }, $puck_1.Ok([])));
            return properties;
          }
          else {
            if ($unwrapTraitObject($puck_17).kind == "TupleType") {
              let {value: [typePath, tuple]} = $unwrapTraitObject($puck_17);
              let $puck_56 = getValueType(typePath, type_);
              let $puck_57;
              if ($unwrapTraitObject($puck_56).kind == "Ok") {
                let {value: [type_]} = $unwrapTraitObject($puck_56);
                $puck_57 = type_;
              }
              else {
                let $puck_58;
                if ($unwrapTraitObject($puck_56).kind == "Err") {
                  let {value: [[to, subject]]} = $unwrapTraitObject($puck_56);
                  return $puck_1.Err(PatternError.PatternMismatch(p, to, subject));
                };
                $puck_57 = $puck_58;
              };
              const tupleType = $puck_57;
              let $puck_59 = tupleType.kind;
              let $puck_60;
              if ($unwrapTraitObject($puck_59).kind == "Struct") {
                let {value: [struct]} = $unwrapTraitObject($puck_59);
                let $puck_61 = struct.kind;
                let $puck_62;
                if ($unwrapTraitObject($puck_61).kind == "Tuple") {
                  let {value: [tuple]} = $unwrapTraitObject($puck_61);
                  $puck_62 = tuple.properties;
                }
                else {
                  let $puck_63;
                  if (true) {
                    let $puck_64 = $puck_61;
                    return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), tupleType));
                  };
                  $puck_62 = $puck_63;
                };
                $puck_60 = $puck_62;
              }
              else {
                let $puck_65;
                if ($unwrapTraitObject($puck_59).kind == "Parameter") {
                  let undefined = $unwrapTraitObject($puck_59);
                  $puck_65 = [];
                }
                else {
                  let $puck_66;
                  if (true) {
                    let $puck_67 = $puck_59;
                    return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), tupleType));
                  };
                  $puck_65 = $puck_66;
                };
                $puck_60 = $puck_65;
              };
              const props = $puck_60;
              if ((!allowNotExhaustive && isNonExhaustive(typePath))) {
                return $puck_1.Err(PatternError.NotExhaustive);
              };
              let $puck_69 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true})
;
              let $puck_68 = $puck_1.Iterable[$puck_69.type].map.call($puck_69, function ([i, p]) {
                return declarePatternVariables(scope, visitor, p, mutable, $unwrapTraitObject(props[i]), allowNotExhaustive, useParentScope, definitions);
              })
;
              const properties = $unwrapTraitObject($puck_1.Iterable[$puck_68.type].toList.call($puck_68).reduce(function (acc, cur) {
                return $puck_1.Result.andThen.call(acc, function ($puck_70) {
                  return cur;
                });
              }, $puck_1.Ok([])));
              return properties;
            }
            else {
              if ($unwrapTraitObject($puck_17).kind == "UnitType") {
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
