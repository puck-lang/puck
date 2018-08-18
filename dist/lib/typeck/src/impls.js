'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.TraitCall = exports.getImplementationForTrait = exports.getImplementation = exports.resolveImplTypeParameters = exports.getTraitObjectCall = exports.getTraitCall = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("util");
const $puck_4 = require("./../../ast/ast");
const $puck_5 = require("./../../ast/span");
const $puck_6 = require("./../../entities");
const $puck_7 = require("./functions");
const $puck_8 = require("./scope");
const $puck_9 = require("./types");
var TraitObject = (object) => object;
var TraitCall = exports.TraitCall = {
TraitObject: (member) => ({kind: 'TraitObject', value: member}),
TypeObject: (member) => ({kind: 'TypeObject', value: member}),
None: {kind: 'None', value: Symbol('None')},
Error: (...members) => ({kind: 'Error', value: members}),
};
TraitCall.orElse = function (op) {
  const self = this;
  let $puck_10 = self;
  if ($puck_10.kind === "None") {
    $puck_10;
    return op();
  }
  else {
    if (true) {
      $puck_10;
      return self;
    };
  };
};
function getParameterMap(objectInstance, implementation) {
  let parameterMap = $puck_1.ObjectMap._new();
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementation.typeParameters, $isTraitObject: true}, function (implementationParameter) {
    const objectParameter = $puck_1.Option.andThen.call(findTypeParameterName(objectInstance, implementationParameter, implementation), function (p) {
      return $puck_1.ObjectMap.get.call(objectInstance.parameterMap, p);
    });
    let $puck_11 = objectParameter;
    if ($puck_11 !== undefined) {
      let objectParameter = $puck_11;
      return $puck_1.ObjectMap.set.call(parameterMap, $puck_1.Option.unwrap.call(implementationParameter.name), objectParameter);
    };
  });
  return parameterMap;
};
function findTypeParameterName(objectInstance, parameter, implementation) {
  return $puck_1.Option.andThen.call(implementation.type_.instance, function (i) {
    let $puck_12 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true})
;
    return $puck_1.Option.andThen.call($puck_1.Option.andThen.call($puck_1.Iterable[$puck_12.type].find.call($puck_12, function ([, p]) {
      return $puck_1.Option.mapOr.call(p.name, false, function (name) {
        return name === $puck_1.Option.unwrap.call(parameter.name);
      });
    }), function ([index, ]) {
      return $puck_1.List.get.call($puck_1.Option.unwrap.call(objectInstance._class._class).typeParameters, index);
    }), function (p) {
      return p.name;
    });
  });
};
function getImplementationsForInstance(type_) {
  let $puck_13 = type_.kind;
  let $puck_14;
  if ($puck_13.kind === "Enum") {
    let {value: enum_} = $puck_13;
    $puck_14 = enum_.implementations;
  }
  else {
    let $puck_15;
    if ($puck_13.kind === "Intersection") {
      let {value: intersection} = $puck_13;
      $puck_15 = getImplementationsForInstance(intersection.baseType);
    }
    else {
      let $puck_16;
      if ($puck_13.kind === "Struct") {
        let {value: struct} = $puck_13;
        $puck_16 = struct.implementations;
      }
      else {
        let $puck_17;
        if (true) {
          $puck_13;
          $puck_17 = [];
        };
        $puck_16 = $puck_17;
      };
      $puck_15 = $puck_16;
    };
    $puck_14 = $puck_15;
  };
  const implementations = $puck_14;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    let $puck_18 = type_.instance;
    if ($puck_18 !== undefined) {
      let objectInstance = $puck_18;
      let $puck_20 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
        const implementationInstance = $puck_1.Option.unwrap.call(i.type_.instance);
        return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.List.zip({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: objectInstance.typeParameters, $isTraitObject: true}, implementationInstance.typeParameters), $isTraitObject: true}, function ([objectP, implP]) {
          return $puck_9.isAssignable(implP, objectP);
        });
      })
;
      let $puck_19 = $puck_1.Iterable[$puck_20.type].filter.call($puck_20, function (i) {
        return $puck_1.Option.mapOr.call(i.typeParameterBounds, true, function (bounds) {
          return $puck_1.Iterator["$impl_Iterator$lib/stdlib/core.puck:JsIterator"].all.call({type: '$impl_Iterator$lib/stdlib/core.puck:JsIterator', value: $puck_1.Map.entries.call(bounds), $isTraitObject: true}, function ([subType, superType]) {
            const resolve = $puck_9.resolveTypeParameters(getParameterMap(objectInstance, i));
            const implementationInstance = $puck_1.Option.unwrap.call(i.type_.instance);
            return $puck_9.isAssignable(resolve(superType), resolve(subType));
          });
        });
      })
;
      return $puck_1.Iterable[$puck_19.type].toList.call($puck_19);
    }
    else {
      return implementations;
    };
  }
  else {
    return implementations;
  };
};
function getMostSpecificImplementations(type_, implementations) {
  let $puck_21 = type_.instance;
  if ($puck_21 !== undefined) {
    let objectInstance = $puck_21;
    let maxSpecificity = 0;
    let $puck_24 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
      const specificity = getTypeSpecificity(i.type_);
      maxSpecificity = $puck_2._global.Math.max(maxSpecificity, specificity);
      return [
        i,
        specificity,
      ];
    })
;
    let $puck_23 = $puck_1.Iterable[$puck_24.type].filter.call($puck_24, function ([, specificity]) {
      return specificity === maxSpecificity;
    })
;
    let $puck_22 = $puck_1.Iterable[$puck_23.type].map.call($puck_23, function ([i, ]) {
      return i;
    })
;
    return $puck_1.Iterable[$puck_22.type].toList.call($puck_22);
  }
  else {
    return implementations;
  };
};
function getImplementationForTrait(type_, trait_) {
  let $puck_26 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: getImplementationsForInstance(type_), $isTraitObject: true}, function (i) {
    return (!$puck_6.Type.getTrait.call(i.trait_).isShorthand);
  })
;
  let $puck_25 = $puck_1.Iterable[$puck_26.type].filter.call($puck_26, function (i) {
    return $puck_9.isAssignable(i.trait_, trait_);
  })
;
  let implementations = $puck_1.Iterable[$puck_25.type].toList.call($puck_25);
  let $puck_27;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    $puck_27 = getMostSpecificImplementations(type_, implementations);
  }
  else {
    $puck_27 = implementations;
  };
  implementations = $puck_27;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    return $puck_1.Err(implementations);
  }
  else {
    return $puck_1.Ok($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}));
  };
};
exports.getImplementationForTrait = getImplementationForTrait;
function getImplementationForTraitCall(functionName, type_, trait_, e, functionType_) {
  let $puck_29 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: getImplementationsForInstance(type_), $isTraitObject: true}, function (i) {
    return (!$puck_6.Type.getTrait.call(i.trait_).isShorthand);
  })
;
  let $puck_28 = $puck_1.Iterable[$puck_29.type].filter.call($puck_29, function (i) {
    return $puck_9.isAssignable(i.trait_, trait_);
  })
;
  let implementations = $puck_1.Iterable[$puck_28.type].toList.call($puck_28);
  let $puck_30;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    let $puck_31 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
      let $puck_32 = resolveImplTypeParameters(i, type_);
      if ($puck_32.kind === "Ok") {
        let {value: type_} = $puck_32;
        let functionType = $puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: $puck_6.Type.getTrait.call(type_).functions, $isTraitObject: true}, functionName);
        const _function = $puck_6.Type.getFunction.call(functionType);
        let $puck_33 = _function.selfBinding;
        let $puck_34;
        if ($puck_33 !== undefined) {
          let selfBinding = $puck_33;
          $puck_34 = {
            definition: functionType.definition,
            id: functionType.id,
            displayName: functionType.displayName,
            name: functionType.name,
            kind: $puck_6.TypeKind.Function({
            selfBinding: $puck_1.None,
            parameters: $unwrapTraitObject([selfBinding].concat(_function.parameters)),
            parameterRange: {
            start: _function.parameterRange.start + 1,
            end: _function.parameterRange.end + 1,
          },
            returnType: _function.returnType,
            isAbstract: _function.isAbstract,
          }),
            _class: functionType._class,
            instance: functionType.instance,
            providesType: functionType.providesType,
            enumMember: functionType.enumMember,
          };
        }
        else {
          $puck_34 = functionType;
        };
        functionType = $puck_34;
        return $puck_1.Result.isOk.call($puck_1.Result.mapErr.call($puck_7.checkFunctionCall(functionType, e), function ([, e]) {
          return $puck_1.print("error", e);
        }));
      }
      else {
        return false;
      };
    })
;
    const filteredImplementations = $puck_1.Iterable[$puck_31.type].toList.call($puck_31);
    let $puck_35;
    if (($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: filteredImplementations, $isTraitObject: true}) > 0)) {
      $puck_35 = filteredImplementations;
    }
    else {
      $puck_35 = implementations;
    };
    $puck_30 = $puck_35;
  }
  else {
    $puck_30 = implementations;
  };
  implementations = $puck_30;
  let $puck_36;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    $puck_36 = getMostSpecificImplementations(type_, implementations);
  }
  else {
    $puck_36 = implementations;
  };
  implementations = $puck_36;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    return $puck_1.Err(implementations);
  }
  else {
    return $puck_1.Ok($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}));
  };
};
function getImplementation(functionName, type_, e) {
  let implementations = getImplementationsForInstance(type_);
  let $puck_37 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
    return $puck_1.ObjectMap.has.call($puck_6.Type.getTrait.call(i.trait_).functions, functionName);
  })
;
  implementations = $puck_1.Iterable[$puck_37.type].toList.call($puck_37);
  const scope = $unwrapTraitObject(e.scope);
  let $puck_38;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    let $puck_39 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
      return $puck_1.Option.isSome.call($puck_8.Scope.getBinding.call(scope, $puck_1.Option.unwrap.call(i.trait_.name)));
    })
;
    $puck_38 = $puck_1.Iterable[$puck_39.type].toList.call($puck_39);
  }
  else {
    $puck_38 = implementations;
  };
  implementations = $puck_38;
  let $puck_40;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    let $puck_41 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
      return $puck_1.Range.contains.call($puck_6.Type.getFunction.call($puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: $puck_6.Type.getTrait.call(i.trait_).functions, $isTraitObject: true}, functionName)).parameterRange, $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true}));
    })
;
    $puck_40 = $puck_1.Iterable[$puck_41.type].toList.call($puck_41);
  }
  else {
    $puck_40 = implementations;
  };
  implementations = $puck_40;
  let $puck_42;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    let $puck_43 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
      let $puck_44 = resolveImplTypeParameters(i, type_);
      if ($puck_44.kind === "Ok") {
        let {value: type_} = $puck_44;
        return $puck_1.Result.isOk.call($puck_7.checkFunctionCall($puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: $puck_6.Type.getTrait.call(type_).functions, $isTraitObject: true}, functionName), e));
      }
      else {
        return false;
      };
    })
;
    const filteredImplementations = $puck_1.Iterable[$puck_43.type].toList.call($puck_43);
    let $puck_45;
    if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: filteredImplementations, $isTraitObject: true}) > 0) {
      $puck_45 = filteredImplementations;
    }
    else {
      $puck_45 = implementations;
    };
    $puck_42 = $puck_45;
  }
  else {
    $puck_42 = implementations;
  };
  implementations = $puck_42;
  let $puck_46;
  if (($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1 && $puck_1.Option.isSome.call(type_.instance))) {
    $puck_46 = getMostSpecificImplementations(type_, implementations);
  }
  else {
    $puck_46 = implementations;
  };
  implementations = $puck_46;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    return $puck_1.Err(implementations);
  }
  else {
    return $puck_1.Ok($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}));
  };
};
exports.getImplementation = getImplementation;
function getTypeSpecificity(type_) {
  let $puck_47 = type_.kind;
  if ($puck_47.kind === "Parameter") {
    $puck_47;
    return 0;
  };
  let $puck_48 = type_.instance;
  if ($puck_48 !== undefined) {
    let instance = $puck_48;
    let $puck_49 = $puck_1.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: instance.typeParameters, $isTraitObject: true})
;
    return $puck_1.Iterator[$puck_49.type].fold.call($puck_49, 1, function (sum, type_) {
      return sum + getTypeSpecificity(type_);
    });
  }
  else {
    if (($puck_48 === undefined)) {
      $puck_48;
      return 1;
    };
  };
};
function resolveImplTypeParameters(implementation, objectType) {
  let parameterMap = $puck_1.ObjectMap._new();
  let $puck_50 = implementation.type_.instance;
  if ($puck_50 !== undefined) {
    let instance = $puck_50;
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: instance.typeParameters, $isTraitObject: true}, function (p) {
      return $puck_1.ObjectMap.set.call(parameterMap, $puck_1.Option.unwrap.call(p.name), p);
    });
    let iter = $puck_1.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: $puck_1.List.zip({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: instance.typeParameters, $isTraitObject: true}, $puck_1.Option.unwrap.call($puck_6.Type.typeParameters.call(objectType))), $isTraitObject: true});
    while (true) {
      let $puck_51 = $puck_1.Iterator[iter.type].next.call(iter);
      if ($puck_51 !== undefined) {
        let [ip, op] = $puck_51;
        let $puck_52 = collectTypeParameters(parameterMap, ip, op);
        if ($puck_52.kind === "Err") {
          let {value: err} = $puck_52;
          return $puck_1.Err(err);
        };
      }
      else {
        break      };
    };
  };
  return $puck_1.Ok($puck_9.resolveTypeParameters(parameterMap)(implementation.trait_));
};
exports.resolveImplTypeParameters = resolveImplTypeParameters;
function collectTypeParameters(parameterMap, ip, op) {
  let $puck_53 = ip.kind;
  if ($puck_53.kind === "Parameter") {
    $puck_53;
    const name = $puck_1.Option.unwrap.call(ip.name);
    if ($puck_9.isAssignable($puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: parameterMap, $isTraitObject: true}, name), op)) {
      parameterMap[name] = op;
    }
    else {
      return $puck_1.Err([
        $puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: parameterMap, $isTraitObject: true}, name),
        op,
      ]);
    };
  }
  else {
    if (true) {
      $puck_53;
      let $puck_54 = ip.instance;
      if ($puck_54 !== undefined) {
        let instance = $puck_54;
        let iter = $puck_1.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: $puck_1.List.zip({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: instance.typeParameters, $isTraitObject: true}, $puck_1.Option.unwrap.call(op.instance).typeParameters), $isTraitObject: true});
        while (true) {
          let $puck_55 = $puck_1.Iterator[iter.type].next.call(iter);
          if ($puck_55 !== undefined) {
            let [ip, op] = $puck_55;
            let $puck_56 = collectTypeParameters(parameterMap, ip, op);
            if ($puck_56.kind === "Err") {
              let {value: err} = $puck_56;
              return $puck_1.Err(err);
            };
          }
          else {
            break          };
        };
      };
    };
  };
  return $puck_1.Ok(undefined);
};
function getTraitCallForTrait(objectType, methodName) {
  let $puck_57 = objectType.kind;
  if ($puck_57.kind === "Trait") {
    let {value: trait_} = $puck_57;
    let $puck_58 = $puck_1.ObjectMap.get.call(trait_.functions, methodName);
    if ($puck_58 !== undefined) {
      let functionType = $puck_58;
      return $puck_1.Some(functionType);
    }
    else {
      if (true) {
        const None = $puck_58;
        let $puck_59 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filterMap.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: trait_.requiredTraits, $isTraitObject: true}, function (type_) {
          return getTraitCallForTrait(type_, methodName);
        })
;
        return $puck_1.Iterable[$puck_59.type].first.call($puck_59);
      };
    };
  }
  else {
    if (true) {
      $puck_57;
      return $puck_1.None;
    };
  };
};
function getTraitObjectCall(functionName, objectType, trait_, e, functionType_) {
  let $puck_60 = objectType.kind;
  if ($puck_60.kind === "Intersection") {
    let {value: intersection} = $puck_60;
    return TraitCall.orElse.call(getTraitCall(intersection.baseType, functionName, e), function () {
      return getTraitCall(intersection.intersectedTrait, functionName, e);
    });
  }
  else {
    if ($puck_60.kind === "Trait") {
      let {value: trait_} = $puck_60;
      return $puck_1.Option.unwrapOr.call($puck_1.Option.map.call(getTraitCallForTrait(objectType, functionName), function (functionType) {
        return TraitCall.TraitObject({
          objectType: objectType,
          functionType: functionType,
        });
      }), TraitCall.None);
    }
    else {
      if (true) {
        $puck_60;
        let $puck_61 = getImplementationForTraitCall(functionName, objectType, trait_, e, functionType_);
        if (($puck_61.kind === "Ok" && $puck_61.value !== undefined)) {
          let {value: implementation} = $puck_61;
          return TraitCall.TypeObject(implementation);
        }
        else {
          if ($puck_61.kind === "Ok") {
            let {value: None} = $puck_61;
            return TraitCall.None;
          }
          else {
            if (true) {
              const Err = $puck_61;
              return TraitCall.Error({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true}, "Ambiguous trait call");
            };
          };
        };
      };
    };
  };
};
exports.getTraitObjectCall = getTraitObjectCall;
function getTraitCall(objectType, methodName, e) {
  let $puck_62 = objectType.kind;
  if ($puck_62.kind === "Intersection") {
    let {value: intersection} = $puck_62;
    return TraitCall.orElse.call(getTraitCall(intersection.baseType, methodName, e), function () {
      return getTraitCall(intersection.intersectedTrait, methodName, e);
    });
  }
  else {
    if ($puck_62.kind === "Trait") {
      let {value: trait_} = $puck_62;
      return $puck_1.Option.unwrapOr.call($puck_1.Option.map.call(getTraitCallForTrait(objectType, methodName), function (functionType) {
        return TraitCall.TraitObject({
          objectType: objectType,
          functionType: functionType,
        });
      }), TraitCall.None);
    }
    else {
      if (true) {
        $puck_62;
        let $puck_63 = getImplementation(methodName, objectType, e);
        if (($puck_63.kind === "Ok" && $puck_63.value !== undefined)) {
          let {value: implementation} = $puck_63;
          return TraitCall.TypeObject(implementation);
        }
        else {
          if ($puck_63.kind === "Ok") {
            let {value: None} = $puck_63;
            return TraitCall.None;
          }
          else {
            if (true) {
              const Err = $puck_63;
              return TraitCall.Error({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true}, "Ambiguous trait call");
            };
          };
        };
      };
    };
  };
};
exports.getTraitCall = getTraitCall
