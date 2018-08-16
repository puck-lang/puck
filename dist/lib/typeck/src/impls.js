'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.TraitCall = exports.getImplementationForTrait = exports.getImplementationForTraitCall = exports.getImplementation = exports.resolveImplTypeParameters = exports.getTraitCall = undefined;
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
function getImplementationsForInstance(type_) {
  let $puck_11 = type_.kind;
  let $puck_12;
  if ($puck_11.kind === "Enum") {
    let {value: enum_} = $puck_11;
    $puck_12 = enum_.implementations;
  }
  else {
    let $puck_13;
    if ($puck_11.kind === "Intersection") {
      let {value: intersection} = $puck_11;
      $puck_13 = getImplementationsForInstance(intersection.baseType);
    }
    else {
      let $puck_14;
      if ($puck_11.kind === "Struct") {
        let {value: struct} = $puck_11;
        $puck_14 = struct.implementations;
      }
      else {
        let $puck_15;
        if (true) {
          $puck_11;
          $puck_15 = [];
        };
        $puck_14 = $puck_15;
      };
      $puck_13 = $puck_14;
    };
    $puck_12 = $puck_13;
  };
  const implementations = $puck_12;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    let $puck_16 = type_.instance;
    if ($puck_16 !== undefined) {
      let objectInstance = $puck_16;
      let $puck_17 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
        const implementationInstance = $puck_1.Option.unwrap.call(i.type_.instance);
        return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.List.zip({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: objectInstance.typeParameters, $isTraitObject: true}, implementationInstance.typeParameters), $isTraitObject: true}, function ([objectP, implP]) {
          return $puck_9.isAssignable(implP, objectP);
        });
      })
;
      return $puck_1.Iterable[$puck_17.type].toList.call($puck_17);
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
  let $puck_18 = type_.instance;
  if ($puck_18 !== undefined) {
    let objectInstance = $puck_18;
    let maxSpecificity = 0;
    let $puck_21 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
      const specificity = getTypeSpecificity(i.type_);
      maxSpecificity = $unwrapTraitObject($unwrapTraitObject($puck_2._global).Math).max(maxSpecificity, specificity);
      return [
        i,
        specificity,
      ];
    })
;
    let $puck_20 = $puck_1.Iterable[$puck_21.type].filter.call($puck_21, function ([, specificity]) {
      return specificity === maxSpecificity;
    })
;
    let $puck_19 = $puck_1.Iterable[$puck_20.type].map.call($puck_20, function ([i, ]) {
      return i;
    })
;
    return $puck_1.Iterable[$puck_19.type].toList.call($puck_19);
  }
  else {
    return implementations;
  };
};
function getImplementationForTrait(type_, trait_) {
  let $puck_23 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: getImplementationsForInstance(type_), $isTraitObject: true}, function (i) {
    return (!$puck_6.Type.getTrait.call(i.trait_).isShorthand);
  })
;
  let $puck_22 = $puck_1.Iterable[$puck_23.type].filter.call($puck_23, function (i) {
    return $puck_9.isAssignable(i.trait_, trait_);
  })
;
  let implementations = $puck_1.Iterable[$puck_22.type].toList.call($puck_22);
  let $puck_24;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    $puck_24 = getMostSpecificImplementations(type_, implementations);
  }
  else {
    $puck_24 = implementations;
  };
  implementations = $puck_24;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    return $puck_1.Err(implementations);
  }
  else {
    return $puck_1.Ok($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}));
  };
};
exports.getImplementationForTrait = getImplementationForTrait;
function getImplementationForTraitCall(functionName, type_, trait_, e, functionType_) {
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
    let $puck_28 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
      let $puck_29 = resolveImplTypeParameters(i, type_);
      if ($puck_29.kind === "Ok") {
        let {value: type_} = $puck_29;
        let functionType = $puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: $puck_6.Type.getTrait.call(type_).functions, $isTraitObject: true}, functionName);
        const _function = $puck_6.Type.getFunction.call(functionType);
        let $puck_30 = _function.selfBinding;
        let $puck_31;
        if ($puck_30 !== undefined) {
          let selfBinding = $puck_30;
          $puck_31 = {
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
          $puck_31 = functionType;
        };
        functionType = $puck_31;
        return $puck_1.Result.isOk.call($puck_1.Result.mapErr.call($puck_7.checkFunctionCall(functionType, e), function ([, e]) {
          return $puck_1.print("error", e);
        }));
      }
      else {
        return false;
      };
    })
;
    const filteredImplementations = $puck_1.Iterable[$puck_28.type].toList.call($puck_28);
    let $puck_32;
    if (($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: filteredImplementations, $isTraitObject: true}) > 0)) {
      $puck_32 = filteredImplementations;
    }
    else {
      $puck_32 = implementations;
    };
    $puck_27 = $puck_32;
  }
  else {
    $puck_27 = implementations;
  };
  implementations = $puck_27;
  let $puck_33;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    $puck_33 = getMostSpecificImplementations(type_, implementations);
  }
  else {
    $puck_33 = implementations;
  };
  implementations = $puck_33;
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
  let $puck_34 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
    return $puck_1.ObjectMap.has.call($puck_6.Type.getTrait.call(i.trait_).functions, functionName);
  })
;
  implementations = $puck_1.Iterable[$puck_34.type].toList.call($puck_34);
  const scope = $unwrapTraitObject(e.scope);
  let $puck_35;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    let $puck_36 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
      return $puck_1.Option.isSome.call($puck_8.Scope.getBinding.call(scope, $puck_1.Option.unwrap.call(i.trait_.name)));
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
      return $puck_1.Range.contains.call($puck_6.Type.getFunction.call($puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: $puck_6.Type.getTrait.call(i.trait_).functions, $isTraitObject: true}, functionName)).parameterRange, $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true}));
    })
;
    $puck_37 = $puck_1.Iterable[$puck_38.type].toList.call($puck_38);
  }
  else {
    $puck_37 = implementations;
  };
  implementations = $puck_37;
  let $puck_39;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    let $puck_40 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
      let $puck_41 = resolveImplTypeParameters(i, type_);
      if ($puck_41.kind === "Ok") {
        let {value: type_} = $puck_41;
        return $puck_1.Result.isOk.call($puck_7.checkFunctionCall($puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: $puck_6.Type.getTrait.call(type_).functions, $isTraitObject: true}, functionName), e));
      }
      else {
        return false;
      };
    })
;
    const filteredImplementations = $puck_1.Iterable[$puck_40.type].toList.call($puck_40);
    let $puck_42;
    if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: filteredImplementations, $isTraitObject: true}) > 0) {
      $puck_42 = filteredImplementations;
    }
    else {
      $puck_42 = implementations;
    };
    $puck_39 = $puck_42;
  }
  else {
    $puck_39 = implementations;
  };
  implementations = $puck_39;
  let $puck_43;
  if (($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1 && $puck_1.Option.isSome.call(type_.instance))) {
    $puck_43 = getMostSpecificImplementations(type_, implementations);
  }
  else {
    $puck_43 = implementations;
  };
  implementations = $puck_43;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    return $puck_1.Err(implementations);
  }
  else {
    return $puck_1.Ok($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}));
  };
};
exports.getImplementation = getImplementation;
function getTypeSpecificity(type_) {
  let $puck_44 = type_.kind;
  if ($puck_44.kind === "Parameter") {
    $puck_44;
    return 0;
  };
  let $puck_45 = type_.instance;
  if ($puck_45 !== undefined) {
    let instance = $puck_45;
    let $puck_46 = $puck_1.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: instance.typeParameters, $isTraitObject: true})
;
    return $puck_1.Iterator[$puck_46.type].fold.call($puck_46, 1, function (sum, type_) {
      return sum + getTypeSpecificity(type_);
    });
  }
  else {
    if (($puck_45 === undefined)) {
      $puck_45;
      return 1;
    };
  };
};
function resolveImplTypeParameters(implementation, objectType) {
  let parameterMap = $puck_1.ObjectMap._new();
  let $puck_47 = implementation.type_.instance;
  if ($puck_47 !== undefined) {
    let instance = $puck_47;
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: instance.typeParameters, $isTraitObject: true}, function (p) {
      return $puck_1.ObjectMap.set.call(parameterMap, $puck_1.Option.unwrap.call(p.name), p);
    });
    let iter = $puck_1.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: $puck_1.List.zip({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: instance.typeParameters, $isTraitObject: true}, $puck_1.Option.unwrap.call($puck_6.Type.typeParameters.call(objectType))), $isTraitObject: true});
    while (true) {
      let $puck_48 = $puck_1.Iterator[iter.type].next.call(iter);
      if ($puck_48 !== undefined) {
        let [ip, op] = $puck_48;
        let $puck_49 = collectTypeParameters(parameterMap, ip, op);
        if ($puck_49.kind === "Err") {
          let {value: err} = $puck_49;
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
  let $puck_50 = ip.kind;
  if ($puck_50.kind === "Parameter") {
    $puck_50;
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
      $puck_50;
      let $puck_51 = ip.instance;
      if ($puck_51 !== undefined) {
        let instance = $puck_51;
        let iter = $puck_1.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: $puck_1.List.zip({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: instance.typeParameters, $isTraitObject: true}, $puck_1.Option.unwrap.call(op.instance).typeParameters), $isTraitObject: true});
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
            break          };
        };
      };
    };
  };
  return $puck_1.Ok(undefined);
};
function getTraitCallForTrait(objectType, methodName) {
  let $puck_54 = objectType.kind;
  if ($puck_54.kind === "Trait") {
    let {value: trait_} = $puck_54;
    let $puck_55 = $puck_1.ObjectMap.get.call(trait_.functions, methodName);
    if ($puck_55 !== undefined) {
      let functionType = $puck_55;
      return $puck_1.Some(functionType);
    }
    else {
      if (true) {
        const None = $puck_55;
        let $puck_56 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filterMap.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: trait_.requiredTraits, $isTraitObject: true}, function (type_) {
          return getTraitCallForTrait(type_, methodName);
        })
;
        return $puck_1.Iterable[$puck_56.type].first.call($puck_56);
      };
    };
  }
  else {
    if (true) {
      $puck_54;
      return $puck_1.None;
    };
  };
};
function getTraitCall(objectType, methodName, e) {
  let $puck_57 = objectType.kind;
  if ($puck_57.kind === "Intersection") {
    let {value: intersection} = $puck_57;
    return TraitCall.orElse.call(getTraitCall(intersection.baseType, methodName, e), function () {
      return getTraitCall(intersection.intersectedTrait, methodName, e);
    });
  }
  else {
    if ($puck_57.kind === "Trait") {
      let {value: trait_} = $puck_57;
      return $puck_1.Option.unwrapOr.call($puck_1.Option.map.call(getTraitCallForTrait(objectType, methodName), function (functionType) {
        return TraitCall.TraitObject({
          objectType: objectType,
          functionType: functionType,
        });
      }), TraitCall.None);
    }
    else {
      if (true) {
        $puck_57;
        let $puck_58 = getImplementation(methodName, objectType, e);
        if (($puck_58.kind === "Ok" && $puck_58.value !== undefined)) {
          let {value: implementation} = $puck_58;
          return TraitCall.TypeObject(implementation);
        }
        else {
          if ($puck_58.kind === "Ok") {
            let {value: None} = $puck_58;
            return TraitCall.None;
          }
          else {
            if (true) {
              const Err = $puck_58;
              return TraitCall.Error({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true}, "Ambiguous trait call");
            };
          };
        };
      };
    };
  };
};
exports.getTraitCall = getTraitCall
