'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.getImplementationForTrait = exports.getImplementationForTraitCall = exports.getImplementation = exports.resolveImplTypeParameters = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("util");
const $puck_4 = require("./../../ast/ast");
const $puck_5 = require("./../../ast/span");
const $puck_6 = require("./../../entities");
const $puck_7 = require("./functions");
const $puck_8 = require("./scope");
const $puck_9 = require("./types");
function getImplementationsForInstance(type_) {
  let $puck_10 = type_.kind;
  let $puck_11;
  if ($puck_10.kind === "Enum") {
    let {value: enum_} = $puck_10;
    $puck_11 = enum_.implementations;
  }
  else {
    let $puck_12;
    if ($puck_10.kind === "Struct") {
      let {value: struct} = $puck_10;
      $puck_12 = struct.implementations;
    }
    else {
      let $puck_13;
      if (true) {
        $puck_10;
        $puck_13 = [];
      };
      $puck_12 = $puck_13;
    };
    $puck_11 = $puck_12;
  };
  const implementations = $puck_11;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    let $puck_14 = type_.instance;
    if ($puck_14 !== undefined) {
      let objectInstance = $puck_14;
      let $puck_15 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
        const implementationInstance = $puck_1.Option.unwrap.call(i.type_.instance);
        return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.List.zip({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: objectInstance.typeParameters, $isTraitObject: true}, implementationInstance.typeParameters), $isTraitObject: true}, function ([objectP, implP]) {
          return $puck_9.isAssignable(implP, objectP);
        });
      })
;
      return $puck_1.Iterable[$puck_15.type].toList.call($puck_15);
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
  let $puck_16 = type_.instance;
  if ($puck_16 !== undefined) {
    let objectInstance = $puck_16;
    let maxSpecificity = 0;
    let $puck_19 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
      const specificity = getTypeSpecificity(i.type_);
      maxSpecificity = $unwrapTraitObject($unwrapTraitObject($puck_2._global).Math).max(maxSpecificity, specificity);
      return [
        i,
        specificity,
      ];
    })
;
    let $puck_18 = $puck_1.Iterable[$puck_19.type].filter.call($puck_19, function ([, specificity]) {
      return specificity === maxSpecificity;
    })
;
    let $puck_17 = $puck_1.Iterable[$puck_18.type].map.call($puck_18, function ([i, ]) {
      return i;
    })
;
    return $puck_1.Iterable[$puck_17.type].toList.call($puck_17);
  }
  else {
    return implementations;
  };
};
function getImplementationForTrait(type_, trait_) {
  let $puck_21 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: getImplementationsForInstance(type_), $isTraitObject: true}, function (i) {
    return (!$puck_6.Type.getTrait.call(i.trait_).isShorthand);
  })
;
  let $puck_20 = $puck_1.Iterable[$puck_21.type].filter.call($puck_21, function (i) {
    return $puck_9.isAssignable(i.trait_, trait_);
  })
;
  let implementations = $puck_1.Iterable[$puck_20.type].toList.call($puck_20);
  let $puck_22;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    $puck_22 = getMostSpecificImplementations(type_, implementations);
  }
  else {
    $puck_22 = implementations;
  };
  implementations = $puck_22;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    return $puck_1.Err(implementations);
  }
  else {
    return $puck_1.Ok($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}));
  };
};
exports.getImplementationForTrait = getImplementationForTrait;
function getImplementationForTraitCall(functionName, type_, trait_, e, functionType_) {
  let $puck_24 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: getImplementationsForInstance(type_), $isTraitObject: true}, function (i) {
    return (!$puck_6.Type.getTrait.call(i.trait_).isShorthand);
  })
;
  let $puck_23 = $puck_1.Iterable[$puck_24.type].filter.call($puck_24, function (i) {
    return $puck_9.isAssignable(i.trait_, trait_);
  })
;
  let implementations = $puck_1.Iterable[$puck_23.type].toList.call($puck_23);
  let $puck_25;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    let $puck_26 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
      let $puck_27 = resolveImplTypeParameters(i, type_);
      if ($puck_27.kind === "Ok") {
        let {value: type_} = $puck_27;
        let functionType = $puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: $puck_6.Type.getTrait.call(type_).functions, $isTraitObject: true}, functionName);
        const _function = $puck_6.Type.getFunction.call(functionType);
        let $puck_28 = _function.selfBinding;
        let $puck_29;
        if ($puck_28 !== undefined) {
          let selfBinding = $puck_28;
          $puck_29 = {
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
          $puck_29 = functionType;
        };
        functionType = $puck_29;
        return $puck_1.Result.isOk.call($puck_1.Result.mapErr.call($puck_7.checkFunctionCall(functionType, e), function ([, e]) {
          return $puck_1.print("error", e);
        }));
      }
      else {
        return false;
      };
    })
;
    const filteredImplementations = $puck_1.Iterable[$puck_26.type].toList.call($puck_26);
    let $puck_30;
    if (($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: filteredImplementations, $isTraitObject: true}) > 0)) {
      $puck_30 = filteredImplementations;
    }
    else {
      $puck_30 = implementations;
    };
    $puck_25 = $puck_30;
  }
  else {
    $puck_25 = implementations;
  };
  implementations = $puck_25;
  let $puck_31;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    $puck_31 = getMostSpecificImplementations(type_, implementations);
  }
  else {
    $puck_31 = implementations;
  };
  implementations = $puck_31;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    return $puck_1.Err(implementations);
  }
  else {
    return $puck_1.Ok($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}));
  };
};
exports.getImplementationForTraitCall = getImplementationForTraitCall;
function getImplementation(functionName, type_, e) {
  let implementations = getImplementationsForInstance(type_);
  let $puck_32 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
    return $puck_1.ObjectMap.has.call($puck_6.Type.getTrait.call(i.trait_).functions, functionName);
  })
;
  implementations = $puck_1.Iterable[$puck_32.type].toList.call($puck_32);
  const scope = $unwrapTraitObject(e.scope);
  let $puck_33;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    let $puck_34 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
      return $puck_1.Option.isSome.call($puck_8.Scope.getBinding.call(scope, $puck_1.Option.unwrap.call(i.trait_.name)));
    })
;
    $puck_33 = $puck_1.Iterable[$puck_34.type].toList.call($puck_34);
  }
  else {
    $puck_33 = implementations;
  };
  implementations = $puck_33;
  let $puck_35;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    let $puck_36 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
      return $puck_1.Range.contains.call($puck_6.Type.getFunction.call($puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: $puck_6.Type.getTrait.call(i.trait_).functions, $isTraitObject: true}, functionName)).parameterRange, $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true}));
    })
;
    $puck_35 = $puck_1.Iterable[$puck_36.type].toList.call($puck_36);
  }
  else {
    $puck_35 = implementations;
  };
  implementations = $puck_35;
  let $puck_37;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    let $puck_38 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
      let $puck_39 = resolveImplTypeParameters(i, type_);
      if ($puck_39.kind === "Ok") {
        let {value: type_} = $puck_39;
        return $puck_1.Result.isOk.call($puck_7.checkFunctionCall($puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: $puck_6.Type.getTrait.call(type_).functions, $isTraitObject: true}, functionName), e));
      }
      else {
        return false;
      };
    })
;
    const filteredImplementations = $puck_1.Iterable[$puck_38.type].toList.call($puck_38);
    let $puck_40;
    if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: filteredImplementations, $isTraitObject: true}) > 0) {
      $puck_40 = filteredImplementations;
    }
    else {
      $puck_40 = implementations;
    };
    $puck_37 = $puck_40;
  }
  else {
    $puck_37 = implementations;
  };
  implementations = $puck_37;
  let $puck_41;
  if (($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1 && $puck_1.Option.isSome.call(type_.instance))) {
    $puck_41 = getMostSpecificImplementations(type_, implementations);
  }
  else {
    $puck_41 = implementations;
  };
  implementations = $puck_41;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    return $puck_1.Err(implementations);
  }
  else {
    return $puck_1.Ok($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}));
  };
};
exports.getImplementation = getImplementation;
function getTypeSpecificity(type_) {
  let $puck_42 = type_.kind;
  if ($puck_42.kind === "Parameter") {
    $puck_42;
    return 0;
  };
  let $puck_43 = type_.instance;
  if ($puck_43 !== undefined) {
    let instance = $puck_43;
    let $puck_44 = $puck_1.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: instance.typeParameters, $isTraitObject: true})
;
    return $puck_1.Iterator[$puck_44.type].fold.call($puck_44, 1, function (sum, type_) {
      return sum + getTypeSpecificity(type_);
    });
  }
  else {
    if (($puck_43 === undefined)) {
      $puck_43;
      return 1;
    };
  };
};
function resolveImplTypeParameters(implementation, objectType) {
  let parameterMap = $puck_1.ObjectMap._new();
  let $puck_45 = implementation.type_.instance;
  if ($puck_45 !== undefined) {
    let instance = $puck_45;
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: instance.typeParameters, $isTraitObject: true}, function (p) {
      return $puck_1.ObjectMap.set.call(parameterMap, $puck_1.Option.unwrap.call(p.name), p);
    });
    let iter = $puck_1.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: $puck_1.List.zip({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: instance.typeParameters, $isTraitObject: true}, $puck_1.Option.unwrap.call($puck_6.Type.typeParameters.call(objectType))), $isTraitObject: true});
    while (true) {
      let $puck_46 = $puck_1.Iterator[iter.type].next.call(iter);
      if ($puck_46 !== undefined) {
        let [ip, op] = $puck_46;
        let $puck_47 = collectTypeParameters(parameterMap, ip, op);
        if ($puck_47.kind === "Err") {
          let {value: err} = $puck_47;
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
  let $puck_48 = ip.kind;
  if ($puck_48.kind === "Parameter") {
    $puck_48;
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
      $puck_48;
      let $puck_49 = ip.instance;
      if ($puck_49 !== undefined) {
        let instance = $puck_49;
        let iter = $puck_1.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: $puck_1.List.zip({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: instance.typeParameters, $isTraitObject: true}, $puck_1.Option.unwrap.call(op.instance).typeParameters), $isTraitObject: true});
        while (true) {
          let $puck_50 = $puck_1.Iterator[iter.type].next.call(iter);
          if ($puck_50 !== undefined) {
            let [ip, op] = $puck_50;
            let $puck_51 = collectTypeParameters(parameterMap, ip, op);
            if ($puck_51.kind === "Err") {
              let {value: err} = $puck_51;
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
}
