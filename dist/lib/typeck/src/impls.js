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
function getMostSpecificImplementations(type_, trait_, implementations) {
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
    const hasSameTrait = ($puck_1.Option.isSome.call(trait_) && $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
      return $puck_9.isSameId(i.trait_, $puck_1.Option.unwrap.call(trait_));
    }));
    if (hasSameTrait) {
      let $puck_25 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
        return $puck_9.isSameId(i.trait_, $puck_1.Option.unwrap.call(trait_));
      })
;
      return $puck_1.Iterable[$puck_25.type].toList.call($puck_25);
    }
    else {
      return implementations;
    };
  };
};
function getImplementationForTrait(type_, trait_) {
  let $puck_27 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: getImplementationsForInstance(type_), $isTraitObject: true}, function (i) {
    return !$puck_6.Type.getTrait.call(i.trait_).isShorthand;
  })
;
  let $puck_26 = $puck_1.Iterable[$puck_27.type].filter.call($puck_27, function (i) {
    return $puck_9.isAssignable(i.trait_, trait_);
  })
;
  let implementations = $puck_1.Iterable[$puck_26.type].toList.call($puck_26);
  let $puck_28;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    $puck_28 = getMostSpecificImplementations(type_, $puck_1.Some(trait_), implementations);
  }
  else {
    $puck_28 = implementations;
  };
  implementations = $puck_28;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    return $puck_1.Err(implementations);
  }
  else {
    return $puck_1.Ok($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}));
  };
};
exports.getImplementationForTrait = getImplementationForTrait;
function getImplementationForTraitCall(functionName, type_, trait_, e, functionType_) {
  let $puck_30 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: getImplementationsForInstance(type_), $isTraitObject: true}, function (i) {
    return (!$puck_6.Type.getTrait.call(i.trait_).isShorthand);
  })
;
  let $puck_29 = $puck_1.Iterable[$puck_30.type].filter.call($puck_30, function (i) {
    return $puck_9.isAssignable(i.trait_, trait_);
  })
;
  let implementations = $puck_1.Iterable[$puck_29.type].toList.call($puck_29);
  let $puck_31;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    let $puck_32 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
      let $puck_33 = resolveImplTypeParameters(i, type_);
      if ($puck_33.kind === "Ok") {
        let {value: type_} = $puck_33;
        let functionType = $puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: $puck_6.Type.getTrait.call(type_).functions, $isTraitObject: true}, functionName);
        const _function = $puck_6.Type.getFunction.call(functionType);
        let $puck_34 = _function.selfBinding;
        let $puck_35;
        if ($puck_34 !== undefined) {
          let selfBinding = $puck_34;
          $puck_35 = {
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
          $puck_35 = functionType;
        };
        functionType = $puck_35;
        return $puck_1.Result.isOk.call($puck_1.Result.mapErr.call($puck_7.checkFunctionCall(functionType, e), function ([, e]) {
          return $puck_1.print("error", e);
        }));
      }
      else {
        return false;
      };
    })
;
    const filteredImplementations = $puck_1.Iterable[$puck_32.type].toList.call($puck_32);
    let $puck_36;
    if (($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: filteredImplementations, $isTraitObject: true}) > 0)) {
      $puck_36 = filteredImplementations;
    }
    else {
      $puck_36 = implementations;
    };
    $puck_31 = $puck_36;
  }
  else {
    $puck_31 = implementations;
  };
  implementations = $puck_31;
  let $puck_37;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    $puck_37 = getMostSpecificImplementations(type_, $puck_1.Some(trait_), implementations);
  }
  else {
    $puck_37 = implementations;
  };
  implementations = $puck_37;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    return $puck_1.Err(implementations);
  }
  else {
    return $puck_1.Ok($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}));
  };
};
function getImplementation(functionName, type_, e) {
  let implementations = getImplementationsForInstance(type_);
  let $puck_38 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
    return $puck_1.ObjectMap.has.call($puck_6.Type.getTrait.call(i.trait_).functions, functionName);
  })
;
  implementations = $puck_1.Iterable[$puck_38.type].toList.call($puck_38);
  const scope = $unwrapTraitObject(e.scope);
  let $puck_39;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    let $puck_40 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
      return $puck_1.Option.isSome.call($puck_8.Scope.getBinding.call(scope, $puck_1.Option.unwrap.call(i.trait_.name)));
    })
;
    $puck_39 = $puck_1.Iterable[$puck_40.type].toList.call($puck_40);
  }
  else {
    $puck_39 = implementations;
  };
  implementations = $puck_39;
  let $puck_41;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    let $puck_42 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
      return $puck_1.Range.contains.call($puck_6.Type.getFunction.call($puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: $puck_6.Type.getTrait.call(i.trait_).functions, $isTraitObject: true}, functionName)).parameterRange, $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true}));
    })
;
    $puck_41 = $puck_1.Iterable[$puck_42.type].toList.call($puck_42);
  }
  else {
    $puck_41 = implementations;
  };
  implementations = $puck_41;
  let $puck_43;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    let $puck_44 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
      let $puck_45 = resolveImplTypeParameters(i, type_);
      if ($puck_45.kind === "Ok") {
        let {value: type_} = $puck_45;
        return $puck_1.Result.isOk.call($puck_7.checkFunctionCall($puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: $puck_6.Type.getTrait.call(type_).functions, $isTraitObject: true}, functionName), e));
      }
      else {
        return false;
      };
    })
;
    const filteredImplementations = $puck_1.Iterable[$puck_44.type].toList.call($puck_44);
    let $puck_46;
    if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: filteredImplementations, $isTraitObject: true}) > 0) {
      $puck_46 = filteredImplementations;
    }
    else {
      $puck_46 = implementations;
    };
    $puck_43 = $puck_46;
  }
  else {
    $puck_43 = implementations;
  };
  implementations = $puck_43;
  let $puck_47;
  if (($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1 && $puck_1.Option.isSome.call(type_.instance))) {
    $puck_47 = getMostSpecificImplementations(type_, $puck_1.None, implementations);
  }
  else {
    $puck_47 = implementations;
  };
  implementations = $puck_47;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    return $puck_1.Err(implementations);
  }
  else {
    return $puck_1.Ok($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}));
  };
};
exports.getImplementation = getImplementation;
function getTypeSpecificity(type_) {
  let $puck_48 = type_.kind;
  if ($puck_48.kind === "Parameter") {
    $puck_48;
    return 0;
  };
  let $puck_49 = type_.instance;
  if ($puck_49 !== undefined) {
    let instance = $puck_49;
    let $puck_50 = $puck_1.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: instance.typeParameters, $isTraitObject: true})
;
    return $puck_1.Iterator[$puck_50.type].fold.call($puck_50, 1, function (sum, type_) {
      return sum + getTypeSpecificity(type_);
    });
  }
  else {
    if (($puck_49 === undefined)) {
      $puck_49;
      return 1;
    };
  };
};
function resolveImplTypeParameters(implementation, objectType) {
  let parameterMap = $puck_1.ObjectMap._new();
  let $puck_51 = implementation.type_.instance;
  if ($puck_51 !== undefined) {
    let instance = $puck_51;
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: instance.typeParameters, $isTraitObject: true}, function (p) {
      return $puck_1.ObjectMap.set.call(parameterMap, $puck_1.Option.unwrap.call(p.name), p);
    });
    let iter = $puck_1.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: $puck_1.List.zip({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: instance.typeParameters, $isTraitObject: true}, $puck_1.Option.unwrap.call($puck_6.Type.typeParameters.call(objectType))), $isTraitObject: true});
    while (true) {
      let $puck_52 = $puck_1.Iterator[iter.type].next.call(iter);
      if ($puck_52 !== undefined) {
        let [ip, op] = $puck_52;
        let $puck_53 = collectTypeParameters(parameterMap, ip, op);
        if ($puck_53.kind === "Err") {
          let {value: err} = $puck_53;
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
  let $puck_54 = ip.kind;
  if ($puck_54.kind === "Parameter") {
    $puck_54;
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
      $puck_54;
      let $puck_55 = ip.instance;
      if ($puck_55 !== undefined) {
        let instance = $puck_55;
        let iter = $puck_1.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: $puck_1.List.zip({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: instance.typeParameters, $isTraitObject: true}, $puck_1.Option.unwrap.call(op.instance).typeParameters), $isTraitObject: true});
        while (true) {
          let $puck_56 = $puck_1.Iterator[iter.type].next.call(iter);
          if ($puck_56 !== undefined) {
            let [ip, op] = $puck_56;
            let $puck_57 = collectTypeParameters(parameterMap, ip, op);
            if ($puck_57.kind === "Err") {
              let {value: err} = $puck_57;
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
  let $puck_58 = objectType.kind;
  if ($puck_58.kind === "Trait") {
    let {value: trait_} = $puck_58;
    let $puck_59 = $puck_1.ObjectMap.get.call(trait_.functions, methodName);
    if ($puck_59 !== undefined) {
      let functionType = $puck_59;
      return $puck_1.Some(functionType);
    }
    else {
      if (true) {
        const None = $puck_59;
        let $puck_60 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filterMap.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: trait_.requiredTraits, $isTraitObject: true}, function (type_) {
          return getTraitCallForTrait(type_, methodName);
        })
;
        return $puck_1.Iterable[$puck_60.type].first.call($puck_60);
      };
    };
  }
  else {
    if (true) {
      $puck_58;
      return $puck_1.None;
    };
  };
};
function getTraitObjectCall(functionName, objectType, trait_, e, functionType_) {
  let $puck_61 = objectType.kind;
  if ($puck_61.kind === "Intersection") {
    let {value: intersection} = $puck_61;
    return TraitCall.orElse.call(getTraitCall(intersection.baseType, functionName, e), function () {
      return getTraitCall(intersection.intersectedTrait, functionName, e);
    });
  }
  else {
    if ($puck_61.kind === "Trait") {
      let {value: trait_} = $puck_61;
      return $puck_1.Option.unwrapOr.call($puck_1.Option.map.call(getTraitCallForTrait(objectType, functionName), function (functionType) {
        return TraitCall.TraitObject({
          objectType: objectType,
          functionType: functionType,
        });
      }), TraitCall.None);
    }
    else {
      if (true) {
        $puck_61;
        let $puck_62 = getImplementationForTraitCall(functionName, objectType, trait_, e, functionType_);
        if (($puck_62.kind === "Ok" && $puck_62.value !== undefined)) {
          let {value: implementation} = $puck_62;
          return TraitCall.TypeObject(implementation);
        }
        else {
          if ($puck_62.kind === "Ok") {
            let {value: None} = $puck_62;
            return TraitCall.None;
          }
          else {
            if (true) {
              const Err = $puck_62;
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
  let $puck_63 = objectType.kind;
  if ($puck_63.kind === "Intersection") {
    let {value: intersection} = $puck_63;
    return TraitCall.orElse.call(getTraitCall(intersection.baseType, methodName, e), function () {
      return getTraitCall(intersection.intersectedTrait, methodName, e);
    });
  }
  else {
    if ($puck_63.kind === "Trait") {
      let {value: trait_} = $puck_63;
      return $puck_1.Option.unwrapOr.call($puck_1.Option.map.call(getTraitCallForTrait(objectType, methodName), function (functionType) {
        return TraitCall.TraitObject({
          objectType: objectType,
          functionType: functionType,
        });
      }), TraitCall.None);
    }
    else {
      if (true) {
        $puck_63;
        let $puck_64 = getImplementation(methodName, objectType, e);
        if (($puck_64.kind === "Ok" && $puck_64.value !== undefined)) {
          let {value: implementation} = $puck_64;
          return TraitCall.TypeObject(implementation);
        }
        else {
          if ($puck_64.kind === "Ok") {
            let {value: None} = $puck_64;
            return TraitCall.None;
          }
          else {
            if (true) {
              const Err = $puck_64;
              return TraitCall.Error({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true}, "Ambiguous trait call");
            };
          };
        };
      };
    };
  };
};
exports.getTraitCall = getTraitCall
