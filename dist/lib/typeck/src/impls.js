'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.getImplementationForTrait = exports.getImplementation = exports.resolveImplTypeParameters = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("util");
const $puck_4 = require("./../../ast/ast");
const $puck_5 = require("./../../ast/span");
const $puck_6 = require("./../../entities");
const $puck_7 = require("./scope");
const $puck_8 = require("./types");
function getImplementationsForInstance(type_) {
  let $puck_9 = type_.kind;
  let $puck_10;
  if ($puck_9.kind === "Enum") {
    let {value: enum_} = $puck_9;
    $puck_10 = enum_.implementations;
  }
  else {
    let $puck_11;
    if ($puck_9.kind === "Struct") {
      let {value: struct} = $puck_9;
      $puck_11 = struct.implementations;
    }
    else {
      let $puck_12;
      if (true) {
        $puck_9;
        $puck_12 = [];
      };
      $puck_11 = $puck_12;
    };
    $puck_10 = $puck_11;
  };
  const implementations = $puck_10;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    let $puck_13 = type_.instance;
    if ($puck_13 !== undefined) {
      let objectInstance = $puck_13;
      let $puck_14 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
        const implementationInstance = $puck_1.Option.unwrap.call(i.type_.instance);
        return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.List.zip({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: objectInstance.typeParameters, $isTraitObject: true}, implementationInstance.typeParameters), $isTraitObject: true}, function ([objectP, implP]) {
          return $puck_8.isAssignable(implP, objectP);
        });
      })
;
      return $puck_1.Iterable[$puck_14.type].toList.call($puck_14);
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
  let $puck_15 = type_.instance;
  if ($puck_15 !== undefined) {
    let objectInstance = $puck_15;
    let maxSpecificity = 0;
    let $puck_18 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
      const specificity = getTypeSpecificity(i.type_);
      maxSpecificity = $unwrapTraitObject($unwrapTraitObject($puck_2._global).Math).max(maxSpecificity, specificity);
      return [
        i,
        specificity,
      ];
    })
;
    let $puck_17 = $puck_1.Iterable[$puck_18.type].filter.call($puck_18, function ([, specificity]) {
      return specificity === maxSpecificity;
    })
;
    let $puck_16 = $puck_1.Iterable[$puck_17.type].map.call($puck_17, function ([i, ]) {
      return i;
    })
;
    return $puck_1.Iterable[$puck_16.type].toList.call($puck_16);
  }
  else {
    return implementations;
  };
};
function getImplementationForTrait(type_, trait_) {
  let $puck_20 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: getImplementationsForInstance(type_), $isTraitObject: true}, function (i) {
    return (!$puck_6.Type.getTrait.call(i.trait_).isShorthand);
  })
;
  let $puck_19 = $puck_1.Iterable[$puck_20.type].filter.call($puck_20, function (i) {
    return $puck_8.isAssignable(i.trait_, trait_);
  })
;
  let implementations = $puck_1.Iterable[$puck_19.type].toList.call($puck_19);
  let $puck_21;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    $puck_21 = getMostSpecificImplementations(type_, implementations);
  }
  else {
    $puck_21 = implementations;
  };
  implementations = $puck_21;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    return $puck_1.Err(implementations);
  }
  else {
    return $puck_1.Ok($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}));
  };
};
exports.getImplementationForTrait = getImplementationForTrait;
function getImplementation(functionName, type_, e) {
  let implementations = getImplementationsForInstance(type_);
  let $puck_22 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
    return $puck_1.ObjectMap.has.call($puck_6.Type.getTrait.call(i.trait_).functions, functionName);
  })
;
  implementations = $puck_1.Iterable[$puck_22.type].toList.call($puck_22);
  const scope = $unwrapTraitObject(e.scope);
  let $puck_23;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    let $puck_24 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
      return $puck_1.Option.isSome.call($puck_7.Scope.getBinding.call(scope, $puck_1.Option.unwrap.call(i.trait_.name)));
    })
;
    $puck_23 = $puck_1.Iterable[$puck_24.type].toList.call($puck_24);
  }
  else {
    $puck_23 = implementations;
  };
  implementations = $puck_23;
  let $puck_25;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    let $puck_26 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
      return $puck_1.Range.contains.call($puck_6.Type.getFunction.call($puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: $puck_6.Type.getTrait.call(i.trait_).functions, $isTraitObject: true}, functionName)).parameterRange, $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true}));
    })
;
    $puck_25 = $puck_1.Iterable[$puck_26.type].toList.call($puck_26);
  }
  else {
    $puck_25 = implementations;
  };
  implementations = $puck_25;
  let $puck_27;
  if (($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1 && $puck_1.Option.isSome.call(type_.instance))) {
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
exports.getImplementation = getImplementation;
function getTypeSpecificity(type_) {
  let $puck_28 = type_.kind;
  if ($puck_28.kind === "Parameter") {
    $puck_28;
    return 0;
  };
  let $puck_29 = type_.instance;
  if ($puck_29 !== undefined) {
    let instance = $puck_29;
    return instance.typeParameters.reduce(function (sum, type_) {
      return sum + getTypeSpecificity(type_);
    }, 1);
  }
  else {
    if (($puck_29 === undefined)) {
      $puck_29;
      return 1;
    };
  };
};
function resolveImplTypeParameters(implementation, objectType) {
  let parameterMap = $puck_1.ObjectMap._new();
  let $puck_30 = implementation.type_.instance;
  if ($puck_30 !== undefined) {
    let instance = $puck_30;
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: instance.typeParameters, $isTraitObject: true}, function (p) {
      return $puck_1.ObjectMap.set.call(parameterMap, $puck_1.Option.unwrap.call(p.name), p);
    });
    let iter = $puck_1.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: $puck_1.List.zip({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: instance.typeParameters, $isTraitObject: true}, $puck_1.Option.unwrap.call($puck_6.Type.typeParameters.call(objectType))), $isTraitObject: true});
    while (true) {
      let $puck_31 = $puck_1.Iterator[iter.type].next.call(iter);
      if ($puck_31 !== undefined) {
        let [ip, op] = $puck_31;
        let $puck_32 = collectTypeParameters(parameterMap, ip, op);
        if ($puck_32.kind === "Err") {
          let {value: err} = $puck_32;
          return $puck_1.Err(err);
        };
      }
      else {
        break      };
    };
  };
  return $puck_1.Ok($unwrapTraitObject($puck_8.resolveTypeParameters(parameterMap)(implementation.trait_)));
};
exports.resolveImplTypeParameters = resolveImplTypeParameters;
function collectTypeParameters(parameterMap, ip, op) {
  let $puck_33 = ip.kind;
  if ($puck_33.kind === "Parameter") {
    $puck_33;
    const name = $puck_1.Option.unwrap.call(ip.name);
    if ($puck_8.isAssignable($puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: parameterMap, $isTraitObject: true}, name), op)) {
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
      $puck_33;
      let $puck_34 = ip.instance;
      if ($puck_34 !== undefined) {
        let instance = $puck_34;
        let iter = $puck_1.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: $puck_1.List.zip({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: instance.typeParameters, $isTraitObject: true}, $puck_1.Option.unwrap.call(op.instance).typeParameters), $isTraitObject: true});
        while (true) {
          let $puck_35 = $puck_1.Iterator[iter.type].next.call(iter);
          if ($puck_35 !== undefined) {
            let [ip, op] = $puck_35;
            let $puck_36 = collectTypeParameters(parameterMap, ip, op);
            if ($puck_36.kind === "Err") {
              let {value: err} = $puck_36;
              return $puck_1.Err(err);
            };
          }
          else {
            break          };
        };
      };
    };
  };
  return $puck_1.Ok(null);
}
