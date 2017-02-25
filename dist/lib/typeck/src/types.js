'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.resolveTypeParameters = exports.createTypeInstance = exports.isAssignable = exports.isSameType = exports.findCommonTypeundefined;
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
    if ($puck_6.kind == "Some") {
      let {value: [instance]} = $puck_6;
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
    if ($unwrapTraitObject($puck_8).kind == "Enum") {
      let {value: [enum_]} = $unwrapTraitObject($puck_8);
      $puck_9 = $puck_5.TypeKind.Enum(resolveTypeParametersEnum(parameterMap, enum_));
    }
    else {
      let $puck_10;
      if ($unwrapTraitObject($puck_8).kind == "Function") {
        let {value: [func]} = $unwrapTraitObject($puck_8);
        let f = func;
        $puck_10 = $puck_5.TypeKind.Function(resolveTypeParametersFn(parameterMap, f));
      }
      else {
        let $puck_11;
        if ($unwrapTraitObject($puck_8).kind == "Parameter") {
          let undefined = $unwrapTraitObject($puck_8);
          return $puck_1.Option.unwrapOr.call($puck_1.ObjectMap.get.call(parameterMap, $puck_1.Option.unwrap.call(type_.name)), type_);
        }
        else {
          let $puck_12;
          if ($unwrapTraitObject($puck_8).kind == "Struct") {
            let {value: [struct]} = $unwrapTraitObject($puck_8);
            $puck_12 = $puck_5.TypeKind.Struct(resolveTypeParametersStruct(parameterMap, struct));
          }
          else {
            let $puck_13;
            if ($unwrapTraitObject($puck_8).kind == "Trait") {
              let {value: [trait_]} = $unwrapTraitObject($puck_8);
              $puck_13 = $puck_5.TypeKind.Trait(resolveTypeParametersTrait(parameterMap, trait_));
            }
            else {
              let $puck_14;
              if (true) {
                let $puck_15 = $puck_8;
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
    return assign(type_, {kind: resolvedKind});
  };
};
function resolveTypeParametersEnum(parameterMap, e) {
  return assign(e, {members: $puck_1.ObjectMap.map.call(e.members, resolveTypeParameters(parameterMap))});
};
function resolveTypeParametersFn(parameterMap, func) {
  let $puck_16 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: func.parameters, $isTraitObject: true}, function (binding) {
    return assign(binding, {type_: resolveTypeParameters(parameterMap, false)(binding.type_)});
  })
;
  return assign(func, {
    parameters: $puck_1.Iterable[$puck_16.type].toList.call($puck_16),
    returnType: resolveTypeParameters(parameterMap, false)(func.returnType),
  });
};
function resolveTypeParametersStruct(parameterMap, struct) {
  let $puck_17 = struct.kind;
  let $puck_18;
  if ($unwrapTraitObject($puck_17).kind == "Record") {
    let {value: [{properties: properties}]} = $unwrapTraitObject($puck_17);
    $puck_18 = $puck_5.StructKind.Record({properties: $puck_1.ObjectMap.map.call(properties, resolveTypeParameters(parameterMap, false))});
  }
  else {
    let $puck_19;
    if ($unwrapTraitObject($puck_17).kind == "Tuple") {
      let {value: [{properties: properties}]} = $unwrapTraitObject($puck_17);
      let $puck_20 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: properties, $isTraitObject: true}, resolveTypeParameters(parameterMap, false))
;
      $puck_19 = $puck_5.StructKind.Tuple({properties: $puck_1.Iterable[$puck_20.type].toList.call($puck_20)});
    }
    else {
      let $puck_21;
      if ($unwrapTraitObject($puck_17).kind == "Unit") {
        let undefined = $unwrapTraitObject($puck_17);
        $puck_21 = struct.kind;
      };
      $puck_19 = $puck_21;
    };
    $puck_18 = $puck_19;
  };
  return $unwrapTraitObject(assign(struct, {kind: $puck_18}));
};
function resolveTypeParametersTrait(parameterMap, t) {
  return assign(t, {functions: $puck_1.ObjectMap.map.call(t.functions, resolveTypeParameters(parameterMap, false))});
};
function createTypeInstance(type_, typeParameters_) {
  let $puck_22 = type_.providesType;
  if ($puck_22.kind == "Some") {
    let {value: [providedType]} = $puck_22;
    let p = providedType;
    return $puck_5.Type({
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
  let $puck_23;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: typeParameters_, $isTraitObject: true}) < _class.parameterRange.end - 1) {
    let $puck_25 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].skip.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _class.typeParameters, $isTraitObject: true}, $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: typeParameters_, $isTraitObject: true}))
;
    let $puck_24 = $puck_1.Iterable[$puck_25.type].map.call($puck_25, function (p) {
      let $puck_26 = p.kind;
      if (($puck_26.kind == "Parameter")) {
        let {value: [parameter]} = $puck_26;
        return $puck_1.Option.unwrapOr.call(parameter.defaultValue, p);
      }
      else {
        throw "not a type parameter";
      };
    })
;
    $puck_23 = typeParameters_.concat($puck_1.Iterable[$puck_24.type].toList.call($puck_24));
  }
  else {
    $puck_23 = typeParameters_;
  };
  const typeParameters = $puck_23;
  let $puck_27 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _class.instances, $isTraitObject: true}, function (a) {
    const i = $puck_1.Option.unwrap.call(a.instance);
    let $puck_28 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true})
;
    return ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true}) == $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: typeParameters, $isTraitObject: true}) && $puck_1.Iterable[$puck_28.type].all.call($puck_28, function ([i, p]) {
      return isSameType(p, $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: typeParameters, $isTraitObject: true}, i));
    }));
  });
  if ($puck_27.kind == "Some") {
    let {value: [cachedInstance]} = $puck_27;
    return cachedInstance;
  };
  const parameterMap = $puck_1.ObjectMap.fromIter($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.List.zip({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: typeParameters, $isTraitObject: true}, _class.typeParameters), $isTraitObject: true}, function ([typeArgument, typeParameter]) {
    return [
      $puck_1.Option.unwrap.call(typeParameter.name),
      typeArgument,
    ];
  }));
  let instance = {
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
  instance.kind = $unwrapTraitObject($unwrapTraitObject(resolveTypeParameters(parameterMap)(type_)).kind);
  let $puck_29 = instance.kind;
  if ($puck_29.kind == "Enum") {
    let {value: [enum_]} = $puck_29;
    $puck_1.ObjectMap.forEach.call(enum_.members, function ([$puck_30, member]) {
      return member.enumMember = $puck_1.Option.map.call(member.enumMember, function ([member, $puck_31]) {
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
  let $puck_32 = [
    to.id,
    subject.id,
  ];
  if (($unwrapTraitObject($unwrapTraitObject($puck_32)[0]).kind == "Some" && $unwrapTraitObject($unwrapTraitObject($puck_32)[1]).kind == "Some")) {
    let [{value: [toId]}, {value: [subjectId]}] = $unwrapTraitObject($puck_32);
    return toId == subjectId;
  }
  else {
    if (true) {
      let $puck_33 = $puck_32;
      return true;
    };
  };
};
function checkTypeParameters(to, subject) {
  if (($puck_1.Option.isNone.call(to.id) || $puck_1.Option.isNone.call(subject.id))) {
    return true;
  };
  let $puck_34 = [
    $puck_5.Type.typeParameters.call(to),
    $puck_5.Type.typeParameters.call(subject),
  ];
  if ($unwrapTraitObject($unwrapTraitObject($puck_34)[0]).kind == "Some" && $unwrapTraitObject($unwrapTraitObject($puck_34)[1]).kind == "Some") {
    let [{value: [toParameters]}, {value: [subjectParameters]}] = $unwrapTraitObject($puck_34);
    if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: toParameters, $isTraitObject: true}) == $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: subjectParameters, $isTraitObject: true})) {
      return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.List.zip({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: toParameters, $isTraitObject: true}, subjectParameters), $isTraitObject: true}, function ([toParameter, subjectParameter]) {
        return isAssignable(toParameter, subjectParameter);
      });
    }
    else {
      return false;
    };
  }
  else {
    if (($unwrapTraitObject($unwrapTraitObject($puck_34)[0]).kind == "None" && $unwrapTraitObject($unwrapTraitObject($puck_34)[1]).kind == "None")) {
      let [, ] = $unwrapTraitObject($puck_34);
      return true;
    }
    else {
      if (true) {
        let $puck_35 = $puck_34;
        return false;
      };
    };
  };
};
function isAssignable(to, subject) {
  if ((to && !subject)) {
    let $puck_36 = to.kind;
    if ($puck_36.kind == "Trait") {
      let {value: [$puck_37]} = $puck_36;
      return false;
    };
  };
  if ((!subject || !to)) {
    return true;
  };
  if (to == subject) {
    return true;
  };
  let $puck_38 = subject.kind;
  if ($unwrapTraitObject($puck_38).kind == "Parameter") {
    let undefined = $unwrapTraitObject($puck_38);
    return true;
  }
  else {
    if ($unwrapTraitObject($puck_38).kind == "Enum") {
      let {value: [enum_]} = $unwrapTraitObject($puck_38);
      if ($puck_1.ObjectMap.size.call(enum_.members) == 0) {
        return true;
      };
    }
    else {
      if (true) {
        let $puck_39 = $puck_38;
      };
    };
  };
  let $puck_40 = to.kind;
  if ($unwrapTraitObject($puck_40).kind == "Enum") {
    let {value: [toEnum]} = $unwrapTraitObject($puck_40);
    let $puck_41 = subject.kind;
    if ($unwrapTraitObject($puck_41).kind == "Enum") {
      let {value: [subjectEnum]} = $unwrapTraitObject($puck_41);
      return (isSameId(to, subject) && isEnumAssignable(toEnum, subjectEnum) && checkTypeParameters(to, subject));
    }
    else {
      if (true) {
        let $puck_42 = $puck_41;
        return false;
      };
    };
  }
  else {
    if ($unwrapTraitObject($puck_40).kind == "Function") {
      let {value: [toFunc]} = $unwrapTraitObject($puck_40);
      let $puck_43 = subject.kind;
      if ($unwrapTraitObject($puck_43).kind == "Function") {
        let {value: [subjectFunc]} = $unwrapTraitObject($puck_43);
        return isFunctionAssignable(toFunc, subjectFunc);
      }
      else {
        if (true) {
          let $puck_44 = $puck_43;
          return false;
        };
      };
    }
    else {
      if ($unwrapTraitObject($puck_40).kind == "Parameter") {
        let undefined = $unwrapTraitObject($puck_40);
        return true;
      }
      else {
        if ($unwrapTraitObject($puck_40).kind == "Struct") {
          let {value: [toStruct]} = $unwrapTraitObject($puck_40);
          let $puck_45 = subject.kind;
          if ($unwrapTraitObject($puck_45).kind == "Struct") {
            let {value: [subjectStruct]} = $unwrapTraitObject($puck_45);
            return (isSameId(to, subject) && isStructAssignable(toStruct, subjectStruct) && checkTypeParameters(to, subject));
          }
          else {
            if (true) {
              let $puck_46 = $puck_45;
              return false;
            };
          };
        }
        else {
          if ($unwrapTraitObject($puck_40).kind == "Trait") {
            let undefined = $unwrapTraitObject($puck_40);
            let $puck_47 = subject.kind;
            if ($unwrapTraitObject($puck_47).kind == "Trait") {
              let undefined = $unwrapTraitObject($puck_47);
              return (isSameId(to, subject) && checkTypeParameters(to, subject));
            }
            else {
              if ($unwrapTraitObject($puck_47).kind == "Enum") {
                let {value: [subjectEnum]} = $unwrapTraitObject($puck_47);
                return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: subjectEnum.implementations, $isTraitObject: true}, function (implementation) {
                  return isAssignable(to, implementation.trait_);
                });
              }
              else {
                if ($unwrapTraitObject($puck_47).kind == "Struct") {
                  let {value: [subjectStruct]} = $unwrapTraitObject($puck_47);
                  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: subjectStruct.implementations, $isTraitObject: true}, function (implementation) {
                    return isAssignable(to, implementation.trait_);
                  });
                }
                else {
                  if (true) {
                    let $puck_48 = $puck_47;
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
exports.isAssignable = isAssignable;
function isEnumAssignable(to, subject) {
  if ($puck_1.ObjectMap.size.call(to.members) == $puck_1.ObjectMap.size.call(subject.members)) {
    return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.ObjectMap.toList.call(to.members), $isTraitObject: true}, function ([name, toMember]) {
      return isAssignable(toMember, $puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: subject.members, $isTraitObject: true}, name));
    });
  }
  else {
    return false;
  };
};
function isFunctionAssignable(to, subject) {
  if ((!$puck_1.Range.isSubsetOf.call(to.parameterRange, subject.parameterRange))) {
    return false;
  };
  let $puck_49 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: to.parameters, $isTraitObject: true})
;
  if (!$puck_1.Iterable[$puck_49.type].all.call($puck_49, function ([i, toArg]) {
    return isAssignable($puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: subject.parameters, $isTraitObject: true}, i).type_, toArg.type_);
  })) {
    return false;
  };
  return (isAssignable(to.returnType, subject.returnType) || $puck_5.Type.isEmpty.call(to.returnType));
};
function isStructAssignable(to, subject) {
  let $puck_50 = [
    to.kind,
    subject.kind,
  ];
  if ($unwrapTraitObject($unwrapTraitObject($puck_50)[0]).kind == "Record" && $unwrapTraitObject($unwrapTraitObject($puck_50)[1]).kind == "Record") {
    let [{value: [{properties: toProps}]}, {value: [{properties: subjectProps}]}] = $unwrapTraitObject($puck_50);
    return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.ObjectMap.toList.call(toProps), $isTraitObject: true}, function ([key, toProp]) {
      return ($puck_1.ObjectMap.has.call(subjectProps, key) && isAssignable(toProp, $puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: subjectProps, $isTraitObject: true}, key)));
    });
  }
  else {
    if ($unwrapTraitObject($unwrapTraitObject($puck_50)[0]).kind == "Tuple" && $unwrapTraitObject($unwrapTraitObject($puck_50)[1]).kind == "Tuple") {
      let [{value: [{properties: toProps}]}, {value: [{properties: subjectProps}]}] = $unwrapTraitObject($puck_50);
      if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: toProps, $isTraitObject: true}) != $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: subjectProps, $isTraitObject: true})) {
        return false;
      };
      return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.List.zip({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: toProps, $isTraitObject: true}, subjectProps), $isTraitObject: true}, function ([toProp, subjectProp]) {
        return isAssignable(toProp, subjectProp);
      });
    }
    else {
      if (($unwrapTraitObject($unwrapTraitObject($puck_50)[0]).kind == "Unit" && $unwrapTraitObject($unwrapTraitObject($puck_50)[1]).kind == "Unit")) {
        let [, ] = $unwrapTraitObject($puck_50);
        return to.kind.value == subject.kind.value;
      }
      else {
        if (true) {
          let $puck_51 = $puck_50;
          return to.kind == subject.kind;
        };
      };
    };
  };
};
function isSameType(a, b) {
  let $puck_52 = [
    a.id,
    b.id,
  ];
  if (($unwrapTraitObject($unwrapTraitObject($puck_52)[0]).kind == "Some" && $unwrapTraitObject($unwrapTraitObject($puck_52)[1]).kind == "Some")) {
    let [{value: [aId]}, {value: [bId]}] = $unwrapTraitObject($puck_52);
    if (aId != bId) {
      return false;
    };
    let $puck_53 = [
      $puck_5.Type.typeParameters.call(a),
      $puck_5.Type.typeParameters.call(b),
    ];
    if (($unwrapTraitObject($unwrapTraitObject($puck_53)[0]).kind == "Some" && $unwrapTraitObject($unwrapTraitObject($puck_53)[1]).kind == "Some")) {
      let [{value: [aParameters]}, {value: [bParameters]}] = $unwrapTraitObject($puck_53);
      if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: aParameters, $isTraitObject: true}) == $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: bParameters, $isTraitObject: true})) {
        return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.List.zip({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: aParameters, $isTraitObject: true}, bParameters), $isTraitObject: true}, function ([aParameter, bParameter]) {
          return isSameType(aParameter, bParameter);
        });
      }
      else {
        return false;
      };
    }
    else {
      if (($unwrapTraitObject($unwrapTraitObject($puck_53)[0]).kind == "None" && $unwrapTraitObject($unwrapTraitObject($puck_53)[1]).kind == "None")) {
        let [, ] = $unwrapTraitObject($puck_53);
        return true;
      }
      else {
        if (true) {
          let $puck_54 = $puck_53;
          return false;
        };
      };
    };
  }
  else {
    if (true) {
      let $puck_55 = $puck_52;
      return false;
    };
  };
};
exports.isSameType = isSameType;
function findCommonType(types) {
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: types, $isTraitObject: true})) {
    return $puck_1.Err([]);
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
            let $puck_56 = $puck_1.Option.andThen.call(commonType.id, function (a) {
              return $puck_1.Option.map.call(type_.id, function (b) {
                return [
                  a,
                  b,
                ];
              });
            });
            if ($puck_56.kind == "Some") {
              let {value: [[commonId, typeId]]} = $puck_56;
              if (commonId != typeId) {
                return $puck_1.Err([]);
              };
              let $puck_57 = [
                $puck_5.Type.typeParameters.call(commonType),
                $puck_5.Type.typeParameters.call(type_),
              ];
              if (($unwrapTraitObject($unwrapTraitObject($puck_57)[0]).kind == "Some" && $unwrapTraitObject($unwrapTraitObject($puck_57)[1]).kind == "Some")) {
                let [{value: [c]}, {value: [typeParameters]}] = $unwrapTraitObject($puck_57);
                let commonTypeParameters = c;
                let index = 0;
                while (index < $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: commonTypeParameters, $isTraitObject: true})) {
                  const commonParameter = $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: commonTypeParameters, $isTraitObject: true}, index);
                  const typeParameter = $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: typeParameters, $isTraitObject: true}, index);
                  let $puck_58 = findCommonType([
                    commonParameter,
                    typeParameter,
                  ]);
                  if ($unwrapTraitObject($puck_58).kind == "Ok") {
                    let {value: [newCommonParameter]} = $unwrapTraitObject($puck_58);
                    if (newCommonParameter != commonParameter) {
                      if (commonTypeParameters == c) {
                        let $puck_59 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].skip.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: c, $isTraitObject: true}, 0)
;
                        commonTypeParameters = $puck_1.Iterable[$puck_59.type].toList.call($puck_59);
                      };
                      commonTypeParameters[index] = newCommonParameter;
                    };
                  }
                  else {
                    if ($unwrapTraitObject($puck_58).kind == "Err") {
                      let {value: [err]} = $unwrapTraitObject($puck_58);
                      return $puck_1.Err(err);
                    };
                  };
                  index += 1;
                };
                if (commonTypeParameters != c) {
                  let _class = $puck_1.Option.mapOr.call(commonType.instance, commonType, function (i) {
                    return i._class;
                  });
                  commonType = createTypeInstance(_class, commonTypeParameters);
                };
              }
              else {
                if (($unwrapTraitObject($unwrapTraitObject($puck_57)[0]).kind == "None" && $unwrapTraitObject($unwrapTraitObject($puck_57)[1]).kind == "None")) {
                  let [, ] = $unwrapTraitObject($puck_57);
                }
                else {
                  if (true) {
                    let $puck_60 = $puck_57;
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
                  return $puck_1.Err([]);
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
