'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.PatternError = exports.declarePatternVariables = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("./../../ast/ast");
const $puck_4 = require("./../../ast/span");
const $puck_5 = require("./../../entities");
const $puck_6 = require("./../scope_visitor");
const $puck_7 = require("./scope");
const $puck_8 = require("./types");
const $puck_9 = require("./core_type_helpers");
var PatternError = exports.PatternError = {
ScopeError: (...members) => ({kind: 'ScopeError', value: members}),
PatternMismatch: (...members) => ({kind: 'PatternMismatch', value: members}),
NotExhaustive: {kind: 'NotExhaustive', value: Symbol('NotExhaustive')},
};
function getValueType(typePath, type_) {
  const typePathType = $unwrapTraitObject(typePath.type_);
  const typePathProvidesType = $puck_1.Option.unwrapOr.call(typePathType.providesType, typePathType);
  let $puck_10;
  if (type_) {
    let $puck_11 = typePathType.enumMember;
    if ($puck_11 !== undefined) {
      let [member, typePathEnum] = $puck_11;
      let $puck_12 = type_.kind;
      if ($puck_12.kind === "Enum") {
        $puck_12;
      }
      else {
        if ($puck_12.kind === "Parameter") {
          $puck_12;
        }
        else {
          if (true) {
            $puck_12;
            return $puck_1.Err([
              typePathEnum,
              type_,
            ]);
          };
        };
      };
    };
    $puck_10 = type_;
  }
  else {
    $puck_10 = typePathProvidesType;
  };
  const structType = $puck_10;
  let $puck_13 = structType.kind;
  if ($puck_13.kind === "Enum") {
    let {value: enum_} = $puck_13;
    let $puck_14 = typePathType.enumMember;
    if ($puck_14 !== undefined) {
      let [member, typePathEnum] = $puck_14;
      if ($puck_8.isAssignable(typePathEnum, type_)) {
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
      $puck_13;
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
  let $puck_15 = typePathType.kind;
  if ($puck_15.kind === "Enum") {
    let {value: enum_} = $puck_15;
    if ($puck_1.ObjectMap.size.call(enum_.members) > 1) {
      return true;
    };
  };
  return false;
};
function declarePatternVariables(scope, visitor, p, type_, allowNotExhaustive, useParentScope = false, definitions = $puck_1.ObjectMap._new()) {
  let $puck_16 = p;
  if ($puck_16.kind === "CatchAll") {
    $puck_16;
    return $puck_1.Ok(undefined);
  }
  else {
    if ($puck_16.kind === "Identifier") {
      let {value: {identifier: identifier, mutable: mutable}} = $puck_16;
      if ($puck_1.ObjectMap.has.call(definitions, identifier.name)) {
        return $puck_1.Err(PatternError.ScopeError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true}, "\"" + identifier.name + "\" is already defined in this pattern"));
      }
      else {
        definitions[identifier.name] = true;
      };
      let $puck_17 = $puck_7.Scope.define.call(scope, {
        definition: $puck_5.Definition({
        file: visitor.file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p, $isTraitObject: true},
      }),
        name: identifier.name,
        mutable: mutable,
        allowRedeclare: true,
        type_: type_,
        completeType: $puck_1.None,
        previous: $puck_1.None,
      }, useParentScope);
      if (($puck_17.kind === "Ok")) {
        let {value: binding} = $puck_17;
        p.binding = binding;
        return $puck_1.Ok(undefined);
      }
      else {
        if ($puck_17.kind === "Err") {
          let {value: err} = $puck_17;
          return $puck_1.Err(PatternError.ScopeError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true}, err));
        };
      };
    }
    else {
      if ($puck_16.kind === "Record") {
        let {value: record} = $puck_16;
        let $puck_18;
        if (type_) {
          let $puck_19 = type_.kind;
          let $puck_20;
          if ($puck_19.kind === "Struct") {
            let {value: struct} = $puck_19;
            let $puck_21 = struct.kind;
            let $puck_22;
            if ($puck_21.kind === "Record") {
              let {value: record} = $puck_21;
              $puck_22 = record.properties;
            }
            else {
              let $puck_23;
              if (true) {
                $puck_21;
                return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), type_));
              };
              $puck_22 = $puck_23;
            };
            $puck_20 = $puck_22;
          }
          else {
            let $puck_24;
            if ($puck_19.kind === "Parameter") {
              $puck_19;
              $puck_24 = {};
            }
            else {
              let $puck_25;
              if (true) {
                $puck_19;
                return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), type_));
              };
              $puck_24 = $puck_25;
            };
            $puck_20 = $puck_24;
          };
          $puck_18 = $puck_20;
        }
        else {
          $puck_18 = $puck_1.ObjectMap._new();
        };
        const props = $puck_18;
        let $puck_26 = $puck_1.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: record.properties, $isTraitObject: true})
;
        let b = $puck_1.Iterator[$puck_26.type].map.call($puck_26, function (p) {
          let $puck_27 = $puck_1.Option.mapOr.call($puck_1.ObjectMap.get.call(props, p.property.name), $puck_1.Ok($unwrapTraitObject($puck_2._undefined)), $puck_9.getRecordPropType(scope));
          let $puck_28;
          if ($puck_27.kind === "Ok") {
            let {value: type_} = $puck_27;
            $puck_28 = type_;
          }
          else {
            let $puck_29;
            if ($puck_27.kind === "Err") {
              let {value: err} = $puck_27;
              return [
                p.property.name,
                $puck_1.Err(PatternError.ScopeError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p.pattern, $isTraitObject: true}, $unwrapTraitObject(err))),
              ];
            };
            $puck_28 = $puck_29;
          };
          const type_ = $puck_28;
          return [
            p.property.name,
            declarePatternVariables(scope, visitor, p.pattern, $unwrapTraitObject(type_), allowNotExhaustive, useParentScope, definitions),
          ];
        });
        return $puck_1.Iterator[b.type].fold.call(b, $puck_1.Ok(undefined), function (acc, [name, type_]) {
          return $puck_1.Result.andThen.call(acc, function ($puck_30) {
            return type_;
          });
        });
      }
      else {
        if ($puck_16.kind === "RecordType") {
          let {value: [typePath, record]} = $puck_16;
          let $puck_31 = getValueType(typePath, type_);
          let $puck_32;
          if ($puck_31.kind === "Ok") {
            let {value: type_} = $puck_31;
            $puck_32 = type_;
          }
          else {
            let $puck_33;
            if ($puck_31.kind === "Err") {
              let {value: [to, subject]} = $puck_31;
              return $puck_1.Err(PatternError.PatternMismatch(p, to, subject));
            };
            $puck_32 = $puck_33;
          };
          const recordType = $puck_32;
          let $puck_34 = recordType.kind;
          let $puck_35;
          if ($puck_34.kind === "Struct") {
            let {value: struct} = $puck_34;
            let $puck_36 = struct.kind;
            let $puck_37;
            if ($puck_36.kind === "Record") {
              let {value: record} = $puck_36;
              $puck_37 = record.properties;
            }
            else {
              let $puck_38;
              if (true) {
                $puck_36;
                return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), recordType));
              };
              $puck_37 = $puck_38;
            };
            $puck_35 = $puck_37;
          }
          else {
            let $puck_39;
            if ($puck_34.kind === "Parameter") {
              $puck_34;
              $puck_39 = {};
            }
            else {
              let $puck_40;
              if (true) {
                $puck_34;
                return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), recordType));
              };
              $puck_39 = $puck_40;
            };
            $puck_35 = $puck_39;
          };
          const props = $puck_35;
          if ((!allowNotExhaustive && isNonExhaustive(typePath))) {
            return $puck_1.Err(PatternError.NotExhaustive);
          };
          let $puck_41 = $puck_1.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].toList.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: record.properties, $isTraitObject: true}), $isTraitObject: true})
;
          let a = $puck_1.Iterator[$puck_41.type].map.call($puck_41, function (p) {
            let $puck_42 = $puck_1.Option.mapOr.call($puck_1.ObjectMap.get.call(props, p.property.name), $puck_1.Ok($unwrapTraitObject($puck_2._undefined)), $puck_9.getRecordPropType(scope));
            let $puck_43;
            if ($puck_42.kind === "Ok") {
              let {value: type_} = $puck_42;
              $puck_43 = type_;
            }
            else {
              let $puck_44;
              if ($puck_42.kind === "Err") {
                let {value: err} = $puck_42;
                return [
                  p.property.name,
                  $puck_1.Err(PatternError.ScopeError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p.pattern, $isTraitObject: true}, $unwrapTraitObject(err))),
                ];
              };
              $puck_43 = $puck_44;
            };
            const type_ = $puck_43;
            return [
              p.property.name,
              declarePatternVariables(scope, visitor, p.pattern, $unwrapTraitObject(type_), allowNotExhaustive, useParentScope, definitions),
            ];
          });
          return $puck_1.Iterator[a.type].fold.call(a, $puck_1.Ok(undefined), function (acc, [name, type_]) {
            return $puck_1.Result.andThen.call(acc, function ($puck_45) {
              return type_;
            });
          });
        }
        else {
          if ($puck_16.kind === "Tuple") {
            let {value: tuple} = $puck_16;
            let $puck_46;
            if (type_) {
              let $puck_47 = type_.kind;
              let $puck_48;
              if ($puck_47.kind === "Struct") {
                let {value: struct} = $puck_47;
                let $puck_49 = struct.kind;
                let $puck_50;
                if ($puck_49.kind === "Tuple") {
                  let {value: tuple} = $puck_49;
                  $puck_50 = tuple.properties;
                }
                else {
                  let $puck_51;
                  if (true) {
                    $puck_49;
                    return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), type_));
                  };
                  $puck_50 = $puck_51;
                };
                $puck_48 = $puck_50;
              }
              else {
                let $puck_52;
                if ($puck_47.kind === "Parameter") {
                  $puck_47;
                  $puck_52 = [];
                }
                else {
                  let $puck_53;
                  if (true) {
                    $puck_47;
                    return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), type_));
                  };
                  $puck_52 = $puck_53;
                };
                $puck_48 = $puck_52;
              };
              $puck_46 = $puck_48;
            }
            else {
              $puck_46 = [];
            };
            const props = $puck_46;
            let $puck_56 = $puck_1.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: tuple.properties, $isTraitObject: true})
;
            let $puck_55 = $puck_1.Iterator[$puck_56.type].enumerate.call($puck_56)
;
            let $puck_54 = $puck_1.Iterator[$puck_55.type].map.call($puck_55, function ([i, p]) {
              return declarePatternVariables(scope, visitor, p, $puck_1.Option.unwrapOr.call($puck_1.List.get.call(props, i), $unwrapTraitObject($puck_2._undefined)), allowNotExhaustive, useParentScope, definitions);
            })
;
            return $puck_1.Iterator[$puck_54.type].fold.call($puck_54, $puck_1.Ok(undefined), function (acc, cur) {
              return $puck_1.Result.andThen.call(acc, function ($puck_57) {
                return cur;
              });
            });
          }
          else {
            if ($puck_16.kind === "TupleType") {
              let {value: [typePath, tuple]} = $puck_16;
              let $puck_58 = getValueType(typePath, type_);
              let $puck_59;
              if ($puck_58.kind === "Ok") {
                let {value: type_} = $puck_58;
                $puck_59 = type_;
              }
              else {
                let $puck_60;
                if ($puck_58.kind === "Err") {
                  let {value: [to, subject]} = $puck_58;
                  return $puck_1.Err(PatternError.PatternMismatch(p, to, subject));
                };
                $puck_59 = $puck_60;
              };
              const tupleType = $puck_59;
              let $puck_61 = tupleType.kind;
              let $puck_62;
              if ($puck_61.kind === "Struct") {
                let {value: struct} = $puck_61;
                let $puck_63 = struct.kind;
                let $puck_64;
                if ($puck_63.kind === "Tuple") {
                  let {value: tuple} = $puck_63;
                  $puck_64 = tuple.properties;
                }
                else {
                  let $puck_65;
                  if (true) {
                    $puck_63;
                    return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), tupleType));
                  };
                  $puck_64 = $puck_65;
                };
                $puck_62 = $puck_64;
              }
              else {
                let $puck_66;
                if ($puck_61.kind === "Parameter") {
                  $puck_61;
                  $puck_66 = [];
                }
                else {
                  let $puck_67;
                  if (true) {
                    $puck_61;
                    return $puck_1.Err(PatternError.PatternMismatch(p, $unwrapTraitObject(p.type_), tupleType));
                  };
                  $puck_66 = $puck_67;
                };
                $puck_62 = $puck_66;
              };
              const props = $puck_62;
              if ((!allowNotExhaustive && isNonExhaustive(typePath))) {
                return $puck_1.Err(PatternError.NotExhaustive);
              };
              let $puck_70 = $puck_1.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: tuple.properties, $isTraitObject: true})
;
              let $puck_69 = $puck_1.Iterator[$puck_70.type].enumerate.call($puck_70)
;
              let $puck_68 = $puck_1.Iterator[$puck_69.type].map.call($puck_69, function ([i, p]) {
                return declarePatternVariables(scope, visitor, p, $puck_1.Option.unwrapOr.call($puck_1.List.get.call(props, i), $unwrapTraitObject($puck_2._undefined)), allowNotExhaustive, useParentScope, definitions);
              })
;
              return $puck_1.Iterator[$puck_68.type].fold.call($puck_68, $puck_1.Ok(undefined), function (acc, cur) {
                return $puck_1.Result.andThen.call(acc, function ($puck_71) {
                  return cur;
                });
              });
            }
            else {
              if ($puck_16.kind === "UnitType") {
                let {value: typePath} = $puck_16;
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
