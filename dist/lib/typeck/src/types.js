'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.resolveTypeParameters = exports.createTypeInstance = exports.isSameId = exports.isAssignable = exports.isSameType = exports.findCommonType = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("./../../ast/ast");
const visit = require("./../../ast/visit");
const $puck_4 = require("./../../compiler/ast");
const $puck_5 = require("./../../entities");
function assign(a, b) {
  return $puck_2._Object.assign({}, a, b);
};
var resolveTypeParameters = exports.resolveTypeParameters = function (parameterMap, enterNamed = true) {
  return function resolveTypeParametersInner(type_) {
    if (!type_) {
      return type_;
    };
    let $puck_6 = type_.instance;
    if ($puck_6 !== undefined) {
      let instance = $puck_6;
      let i = instance;
      const typeParameters = instance.typeParameters;
      let $puck_7 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: typeParameters, $isTraitObject: true}, resolveTypeParameters(parameterMap, false))
;
      return createTypeInstance(i._class, $puck_1.Iterable[$puck_7.type].toList.call($puck_7));
    };
    if ((!enterNamed && !$puck_5.Type.isParameter.call(type_) && ($puck_1.Option.isSome.call(type_.name) || $puck_1.Option.isSome.call(type_.displayName)))) {
      return type_;
    };
    let $puck_8 = type_.kind;
    let $puck_9;
    if ($puck_8.kind === "Enum") {
      let {value: enum_} = $puck_8;
      $puck_9 = $puck_5.TypeKind.Enum(resolveTypeParametersEnum(parameterMap, enum_));
    }
    else {
      let $puck_10;
      if ($puck_8.kind === "Function") {
        let {value: func} = $puck_8;
        let f = func;
        $puck_10 = $puck_5.TypeKind.Function(resolveTypeParametersFn(parameterMap, f));
      }
      else {
        let $puck_11;
        if ($puck_8.kind === "Parameter") {
          $puck_8;
          return $puck_1.Option.unwrapOr.call($puck_1.ObjectMap.get.call(parameterMap, $puck_1.Option.unwrap.call(type_.name)), type_);
        }
        else {
          let $puck_12;
          if ($puck_8.kind === "Struct") {
            let {value: struct} = $puck_8;
            $puck_12 = $puck_5.TypeKind.Struct(resolveTypeParametersStruct(parameterMap, struct));
          }
          else {
            let $puck_13;
            if ($puck_8.kind === "Trait") {
              let {value: trait_} = $puck_8;
              $puck_13 = $puck_5.TypeKind.Trait(resolveTypeParametersTrait(parameterMap, trait_));
            }
            else {
              let $puck_14;
              if (true) {
                $puck_8;
                return type_;
              };
              $puck_13 = $puck_14;
            };
            $puck_12 = $puck_13;
          };
          $puck_11 = $puck_12;
        };
        $puck_10 = $puck_11;
      };
      $puck_9 = $puck_10;
    };
    const resolvedKind = $puck_9;
    return $unwrapTraitObject(assign(type_, {kind: resolvedKind}));
  };
};
function resolveTypeParametersEnum(parameterMap, e) {
  return assign(e, {members: $puck_1.ObjectMap.map.call(e.members, resolveTypeParameters(parameterMap))});
};
function resolveTypeParametersFn(parameterMap, func) {
  let $puck_15 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: func.parameters, $isTraitObject: true}, function (binding) {
    return assign(binding, {type_: resolveTypeParameters(parameterMap, false)(binding.type_)});
  })
;
  return assign(func, {
    parameters: $puck_1.Iterable[$puck_15.type].toList.call($puck_15),
    returnType: resolveTypeParameters(parameterMap, false)(func.returnType),
  });
};
function resolveTypeParametersStruct(parameterMap, struct) {
  let $puck_16 = struct.kind;
  let $puck_17;
  if ($puck_16.kind === "Record") {
    let {value: {properties: properties}} = $puck_16;
    $puck_17 = $puck_5.StructKind.Record({properties: $puck_1.ObjectMap.map.call(properties, function (p) {
      return {
        optional: p.optional,
        type_: resolveTypeParameters(parameterMap, false)(p.type_),
      };
    })});
  }
  else {
    let $puck_18;
    if ($puck_16.kind === "Tuple") {
      let {value: {properties: properties}} = $puck_16;
      let $puck_19 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: properties, $isTraitObject: true}, resolveTypeParameters(parameterMap, false))
;
      $puck_18 = $puck_5.StructKind.Tuple({properties: $puck_1.Iterable[$puck_19.type].toList.call($puck_19)});
    }
    else {
      let $puck_20;
      if ($puck_16.kind === "Unit") {
        $puck_16;
        $puck_20 = struct.kind;
      };
      $puck_18 = $puck_20;
    };
    $puck_17 = $puck_18;
  };
  return $unwrapTraitObject(assign(struct, {kind: $puck_17}));
};
function resolveTypeParametersTrait(parameterMap, t) {
  return assign(t, {functions: $puck_1.ObjectMap.map.call(t.functions, resolveTypeParameters(parameterMap, false))});
};
function createTypeInstance(type_, typeParameters_) {
  let $puck_21 = type_.providesType;
  if ($puck_21 !== undefined) {
    let providedType = $puck_21;
    let p = providedType;
    return $puck_5.Type({
      definition: type_.definition,
      id: type_.id,
      displayName: type_.displayName,
      name: type_.name,
      kind: type_.kind,
      _class: type_._class,
      instance: type_.instance,
      providesType: createTypeInstance(p, typeParameters_),
      enumMember: type_.enumMember,
    });
  };
  let _class = $puck_1.Option.unwrap.call(type_._class);
  let $puck_22;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: typeParameters_, $isTraitObject: true}) < _class.parameterRange.end - 1) {
    let $puck_24 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].skip.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _class.typeParameters, $isTraitObject: true}, $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: typeParameters_, $isTraitObject: true}))
;
    let $puck_23 = $puck_1.Iterable[$puck_24.type].map.call($puck_24, function (p) {
      let $puck_25 = p.kind;
      if (($puck_25.kind === "Parameter")) {
        let {value: parameter} = $puck_25;
        return $puck_1.Option.unwrapOr.call(parameter.defaultValue, p);
      }
      else {
        return $puck_1.panic("not a type parameter");
      };
    })
;
    $puck_22 = typeParameters_.concat($puck_1.Iterable[$puck_23.type].toList.call($puck_23));
  }
  else {
    $puck_22 = typeParameters_;
  };
  const typeParameters = $puck_22;
  let $puck_26 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _class.instances, $isTraitObject: true}, function (a) {
    const i = $puck_1.Option.unwrap.call(a.instance);
    let $puck_27 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true})
;
    return ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true}) === $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: typeParameters, $isTraitObject: true}) && $puck_1.Iterable[$puck_27.type].all.call($puck_27, function ([i, p]) {
      return isSameType(p, $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: typeParameters, $isTraitObject: true}, i));
    }));
  });
  if ($puck_26 !== undefined) {
    let cachedInstance = $puck_26;
    return cachedInstance;
  };
  const parameterMap = $puck_1.ObjectMap.fromIter($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.List.zip({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: typeParameters, $isTraitObject: true}, _class.typeParameters), $isTraitObject: true}, function ([typeArgument, typeParameter]) {
    return [
      $puck_1.Option.unwrap.call(typeParameter.name),
      typeArgument,
    ];
  }));
  let instance = {
    definition: type_.definition,
    id: type_.id,
    displayName: type_.displayName,
    name: type_.name,
    kind: type_.kind,
    _class: $puck_1.None,
    instance: $puck_1.Some({
    _class: type_,
    typeParameters: typeParameters,
    parameterMap: parameterMap,
  }),
    providesType: type_.providesType,
    enumMember: type_.enumMember,
  };
  $puck_1.List.push.call(_class.instances, instance);
  instance.kind = $unwrapTraitObject(resolveTypeParameters(parameterMap)(type_).kind);
  let $puck_28 = instance.kind;
  if ($puck_28.kind === "Enum") {
    let {value: enum_} = $puck_28;
    $puck_1.ObjectMap.forEach.call(enum_.members, function ([, member]) {
      return member.enumMember = $puck_1.Option.map.call(member.enumMember, function ([member, ]) {
        return [
          member,
          instance,
        ];
      });
    });
  };
  return instance;
};
exports.createTypeInstance = createTypeInstance;
function isSameId(to, subject) {
  let $puck_29 = [
    to.id,
    subject.id,
  ];
  if (($puck_29[0] !== undefined && $puck_29[1] !== undefined)) {
    let [toId, subjectId] = $puck_29;
    return toId === subjectId;
  }
  else {
    if (true) {
      $puck_29;
      return true;
    };
  };
};
exports.isSameId = isSameId;
function bothHasId(to, subject) {
  return ($puck_1.Option.isSome.call(to.id) && $puck_1.Option.isSome.call(subject.id));
};
function checkTypeParameters(to, subject) {
  if (($puck_1.Option.isNone.call(to.id) || $puck_1.Option.isNone.call(subject.id))) {
    return true;
  };
  let $puck_30 = [
    $puck_5.Type.typeParameters.call(to),
    $puck_5.Type.typeParameters.call(subject),
  ];
  if ($puck_30[0] !== undefined && $puck_30[1] !== undefined) {
    let [toParameters, subjectParameters] = $puck_30;
    if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: toParameters, $isTraitObject: true}) === $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: subjectParameters, $isTraitObject: true})) {
      return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.List.zip({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: toParameters, $isTraitObject: true}, subjectParameters), $isTraitObject: true}, function ([toParameter, subjectParameter]) {
        return isAssignable(toParameter, subjectParameter);
      });
    }
    else {
      return false;
    };
  }
  else {
    if (($puck_30[0] === undefined && $puck_30[1] === undefined)) {
      let [, ] = $puck_30;
      return true;
    }
    else {
      if (true) {
        $puck_30;
        return false;
      };
    };
  };
};
function isAssignable(to, subject) {
  return _isAssignable(to, subject, $puck_1.Map._new());
};
exports.isAssignable = isAssignable;
function _isAssignable(to, subject, checked) {
  if ((to && !subject)) {
    let $puck_31 = to.kind;
    if ($puck_31.kind === "Trait") {
      $puck_31;
      return false;
    };
  };
  if ((!subject || !to)) {
    return true;
  };
  if ($puck_1.identical(to, subject)) {
    return true;
  };
  let $puck_32 = $puck_1.Map.get.call(checked, to);
  if ($puck_32 !== undefined) {
    let set = $puck_32;
    if ($puck_1.Set.has.call(set, subject)) {
      return true;
    };
    let c = set;
    $puck_1.Set.add.call(c, subject);
  }
  else {
    let c = $puck_1.Set._new();
    $puck_1.Set.add.call(c, subject);
    $puck_1.Map.set.call(checked, to, c);
  };
  let $puck_33 = subject.kind;
  if ($puck_33.kind === "Parameter") {
    $puck_33;
    return true;
  }
  else {
    if ($puck_33.kind === "Enum") {
      let {value: enum_} = $puck_33;
      if ($puck_1.ObjectMap.size.call(enum_.members) === 0) {
        return true;
      };
    }
    else {
      if (true) {
        $puck_33;
      };
    };
  };
  let $puck_34 = to.kind;
  if ($puck_34.kind === "Enum") {
    let {value: toEnum} = $puck_34;
    let $puck_35 = subject.kind;
    if ($puck_35.kind === "Enum") {
      let {value: subjectEnum} = $puck_35;
      return (isSameId(to, subject) && (bothHasId(to, subject) || isEnumAssignable(toEnum, subjectEnum, checked)) && checkTypeParameters(to, subject));
    }
    else {
      if (true) {
        $puck_35;
        return false;
      };
    };
  }
  else {
    if ($puck_34.kind === "Function") {
      let {value: toFunc} = $puck_34;
      let $puck_36 = subject.kind;
      if ($puck_36.kind === "Function") {
        let {value: subjectFunc} = $puck_36;
        return isFunctionAssignable(toFunc, subjectFunc, checked);
      }
      else {
        if (true) {
          $puck_36;
          return false;
        };
      };
    }
    else {
      if ($puck_34.kind === "Intersection") {
        let {value: toIntersection} = $puck_34;
        return (_isAssignable(toIntersection.baseType, subject, checked) && _isAssignable(toIntersection.intersectedTrait, subject, checked));
      }
      else {
        if ($puck_34.kind === "Parameter") {
          $puck_34;
          return true;
        }
        else {
          if ($puck_34.kind === "Struct") {
            let {value: toStruct} = $puck_34;
            let $puck_37 = subject.kind;
            if ($puck_37.kind === "Struct") {
              let {value: subjectStruct} = $puck_37;
              return (isSameId(to, subject) && (bothHasId(to, subject) || isStructAssignable(toStruct, subjectStruct, checked)) && checkTypeParameters(to, subject));
            }
            else {
              if ($puck_37.kind === "Intersection") {
                let {value: subjectIntersection} = $puck_37;
                return _isAssignable(to, subjectIntersection.baseType, checked);
              }
              else {
                if (true) {
                  $puck_37;
                  return false;
                };
              };
            };
          }
          else {
            if ($puck_34.kind === "Trait") {
              $puck_34;
              let $puck_38 = subject.kind;
              if ($puck_38.kind === "Trait") {
                $puck_38;
                return (isSameId(to, subject) && checkTypeParameters(to, subject));
              }
              else {
                if ($puck_38.kind === "Enum") {
                  let {value: subjectEnum} = $puck_38;
                  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: subjectEnum.implementations, $isTraitObject: true}, function (implementation) {
                    return _isAssignable(to, implementation.trait_, checked);
                  });
                }
                else {
                  if ($puck_38.kind === "Intersection") {
                    let {value: subjectIntersection} = $puck_38;
                    return (_isAssignable(to, subjectIntersection.baseType, checked) || _isAssignable(to, subjectIntersection.intersectedTrait, checked));
                  }
                  else {
                    if ($puck_38.kind === "Struct") {
                      let {value: subjectStruct} = $puck_38;
                      return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: subjectStruct.implementations, $isTraitObject: true}, function (implementation) {
                        return _isAssignable(to, implementation.trait_, checked);
                      });
                    }
                    else {
                      if (true) {
                        $puck_38;
                        return false;
                      };
                    };
                  };
                };
              };
            };
          };
        };
      };
    };
  };
};
function isEnumAssignable(to, subject, checked) {
  if ($puck_1.ObjectMap.size.call(to.members) === $puck_1.ObjectMap.size.call(subject.members)) {
    return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.ObjectMap.toList.call(to.members), $isTraitObject: true}, function ([name, toMember]) {
      return _isAssignable(toMember, $puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: subject.members, $isTraitObject: true}, name), checked);
    });
  }
  else {
    return false;
  };
};
function isFunctionAssignable(to, subject, checked) {
  if ((!$puck_1.Range.isSubsetOf.call(to.parameterRange, subject.parameterRange))) {
    return false;
  };
  let $puck_39 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: to.parameters, $isTraitObject: true})
;
  if (!$puck_1.Iterable[$puck_39.type].all.call($puck_39, function ([i, toArg]) {
    return _isAssignable($puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: subject.parameters, $isTraitObject: true}, i).type_, toArg.type_, checked);
  })) {
    return false;
  };
  return (_isAssignable(to.returnType, subject.returnType, checked) || $puck_5.Type.isEmpty.call(to.returnType));
};
function isStructAssignable(to, subject, checked) {
  let $puck_40 = [
    to.kind,
    subject.kind,
  ];
  if ($unwrapTraitObject($puck_40[0]).kind === "Record" && $unwrapTraitObject($puck_40[1]).kind === "Record") {
    let [{value: {properties: toProps}}, {value: {properties: subjectProps}}] = $puck_40;
    return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.ObjectMap.toList.call(toProps), $isTraitObject: true}, function ([key, toProp]) {
      if (($puck_1.ObjectMap.has.call(subjectProps, key) && !$puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: subjectProps, $isTraitObject: true}, key))) {
        $puck_1.print("ket", [
          key,
          subjectProps,
        ]);
      };
      if (!toProp) {
        $puck_1.print("toProp", [
          key,
          toProps,
        ]);
      };
      let $puck_41 = $puck_1.ObjectMap.get.call(subjectProps, key);
      if ($puck_41 !== undefined) {
        let subjectProp = $puck_41;
        return _isAssignable(toProp.type_, subjectProp.type_, checked);
      }
      else {
        return toProp.optional;
      };
    });
  }
  else {
    if (($unwrapTraitObject($puck_40[0]).kind === "Tuple" && $unwrapTraitObject($puck_40[1]).kind === "Tuple")) {
      let [{value: {properties: toProps}}, {value: {properties: subjectProps}}] = $puck_40;
      if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: toProps, $isTraitObject: true}) !== $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: subjectProps, $isTraitObject: true})) {
        return false;
      };
      return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.List.zip({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: toProps, $isTraitObject: true}, subjectProps), $isTraitObject: true}, function ([toProp, subjectProp]) {
        return _isAssignable(toProp, subjectProp, checked);
      });
    }
    else {
      if (($unwrapTraitObject($puck_40[0]).kind === "Unit" && $unwrapTraitObject($puck_40[1]).kind === "Unit")) {
        let [, ] = $puck_40;
        return $puck_1.identical(to.kind.value, subject.kind.value);
      }
      else {
        if (true) {
          $puck_40;
          return $puck_1.identical(to.kind, subject.kind);
        };
      };
    };
  };
};
function isSameType(a, b) {
  let $puck_42 = [
    a.id,
    b.id,
  ];
  if (($puck_42[0] !== undefined && $puck_42[1] !== undefined)) {
    let [aId, bId] = $puck_42;
    if (aId !== bId) {
      return false;
    };
    let $puck_43 = [
      $puck_5.Type.typeParameters.call(a),
      $puck_5.Type.typeParameters.call(b),
    ];
    if (($puck_43[0] !== undefined && $puck_43[1] !== undefined)) {
      let [aParameters, bParameters] = $puck_43;
      if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: aParameters, $isTraitObject: true}) === $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: bParameters, $isTraitObject: true})) {
        return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.List.zip({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: aParameters, $isTraitObject: true}, bParameters), $isTraitObject: true}, function ([aParameter, bParameter]) {
          return isSameType(aParameter, bParameter);
        });
      }
      else {
        return false;
      };
    }
    else {
      if (($puck_43[0] === undefined && $puck_43[1] === undefined)) {
        let [, ] = $puck_43;
        return true;
      }
      else {
        if (true) {
          $puck_43;
          return false;
        };
      };
    };
  }
  else {
    if (true) {
      $puck_42;
      return false;
    };
  };
};
exports.isSameType = isSameType;
function findCommonType(types) {
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: types, $isTraitObject: true})) {
    return $puck_1.Err(undefined);
  };
  let index = 0;
  let commonType = $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: types, $isTraitObject: true}, 0);
  while (index < $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: types, $isTraitObject: true})) {
    const type_ = $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: types, $isTraitObject: true}, index);
    if ((!type_ || $puck_5.Type.isNever.call(type_))) {}
    else {
      if ((!commonType || $puck_5.Type.isNever.call(commonType))) {
        commonType = type_;
      }
      else {
        if (($puck_5.Type.isParameter.call(commonType) && !$puck_5.Type.isParameter.call(type_))) {
          commonType = type_;
        }
        else {
          if ($puck_5.Type.isParameter.call(type_)) {}
          else {
            let $puck_44 = $puck_1.Option.andThen.call(commonType.id, function (a) {
              return $puck_1.Option.map.call(type_.id, function (b) {
                return [
                  a,
                  b,
                ];
              });
            });
            if ($puck_44 !== undefined) {
              let [commonId, typeId] = $puck_44;
              if (commonId !== typeId) {
                return $puck_1.Err(undefined);
              };
              let $puck_45 = [
                $puck_5.Type.typeParameters.call(commonType),
                $puck_5.Type.typeParameters.call(type_),
              ];
              if (($puck_45[0] !== undefined && $puck_45[1] !== undefined)) {
                let [c, typeParameters] = $puck_45;
                let commonTypeParameters = c;
                let index = 0;
                while (index < $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: commonTypeParameters, $isTraitObject: true})) {
                  const commonParameter = $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: commonTypeParameters, $isTraitObject: true}, index);
                  const typeParameter = $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: typeParameters, $isTraitObject: true}, index);
                  let $puck_46 = findCommonType([
                    commonParameter,
                    typeParameter,
                  ]);
                  if ($puck_46.kind === "Ok") {
                    let {value: newCommonParameter} = $puck_46;
                    if ((!$puck_1.identical(newCommonParameter, commonParameter))) {
                      if ($puck_1.identical(commonTypeParameters, c)) {
                        let $puck_47 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].skip.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: c, $isTraitObject: true}, 0)
;
                        commonTypeParameters = $puck_1.Iterable[$puck_47.type].toList.call($puck_47);
                      };
                      commonTypeParameters[index] = newCommonParameter;
                    };
                  }
                  else {
                    if ($puck_46.kind === "Err") {
                      let {value: err} = $puck_46;
                      return $puck_1.Err(err);
                    };
                  };
                  index += 1;
                };
                if ((!$puck_1.identical(commonTypeParameters, c))) {
                  let _class = $puck_1.Option.mapOr.call(commonType.instance, commonType, function (i) {
                    return i._class;
                  });
                  commonType = createTypeInstance(_class, commonTypeParameters);
                };
              }
              else {
                if (($puck_45[0] === undefined && $puck_45[1] === undefined)) {
                  let [, ] = $puck_45;
                }
                else {
                  if (true) {
                    $puck_45;
                    $puck_1.panic("The same type both have and don't have type parameters");
                  };
                };
              };
            }
            else {
              if (isAssignable(commonType, type_)) {}
              else {
                if (isAssignable(type_, commonType)) {
                  commonType = type_;
                }
                else {
                  return $puck_1.Err(undefined);
                };
              };
            };
          };
        };
      };
    };
    index += 1;
  };
  return $puck_1.Ok(commonType);
};
exports.findCommonType = findCommonType
