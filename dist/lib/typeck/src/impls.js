'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.getImplementationForTrait = exports.getImplementation = exports.resolveImplTypeParametersundefined;
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
  if ($unwrapTraitObject($puck_9).kind == "Enum") {
    let {value: [enum_]} = $unwrapTraitObject($puck_9);
    $puck_10 = enum_.implementations;
  }
  else {
    let $puck_11;
    if ($unwrapTraitObject($puck_9).kind == "Struct") {
      let {value: [struct]} = $unwrapTraitObject($puck_9);
      $puck_11 = struct.implementations;
    }
    else {
      let $puck_12;
      if (true) {
        let $puck_13 = $puck_9;
        $puck_12 = [];
      };
      $puck_11 = $puck_12;
    };
    $puck_10 = $puck_11;
  };
  const implementations = $puck_10;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    let $puck_14 = type_.instance;
    if ($puck_14.kind == "Some") {
      let {value: [objectInstance]} = $puck_14;
      let $puck_15 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
        const implementationInstance = $puck_1.Option.unwrap.call(i.type_.instance);
        return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.List.zip({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: objectInstance.typeParameters, $isTraitObject: true}, implementationInstance.typeParameters), $isTraitObject: true}, function ([objectP, implP]) {
          return $puck_8.isAssignable(implP, objectP);
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
  if ($puck_16.kind == "Some") {
    let {value: [objectInstance]} = $puck_16;
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
    let $puck_18 = $puck_1.Iterable[$puck_19.type].filter.call($puck_19, function ([$puck_20, specificity]) {
      return specificity == maxSpecificity;
    })
;
    let $puck_17 = $puck_1.Iterable[$puck_18.type].map.call($puck_18, function ([i, $puck_21]) {
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
  let $puck_23 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: getImplementationsForInstance(type_), $isTraitObject: true}, function (i) {
    return (!$puck_6.Type.getTrait.call(i.trait_).isShorthand);
  })
;
  let $puck_22 = $puck_1.Iterable[$puck_23.type].filter.call($puck_23, function (i) {
    return $puck_8.isAssignable(i.trait_, trait_);
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
function getImplementation(functionName, type_, e) {
  let implementations = getImplementationsForInstance(type_);
  let $puck_25 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
    return $puck_1.ObjectMap.has.call($puck_6.Type.getTrait.call(i.trait_).functions, functionName);
  })
;
  implementations = $puck_1.Iterable[$puck_25.type].toList.call($puck_25);
  const scope = $unwrapTraitObject(e.scope);
  let $puck_26;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    let $puck_27 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
      return $puck_1.Option.isSome.call($puck_7.Scope.getBinding.call(scope, $puck_1.Option.unwrap.call(i.trait_.name)));
    })
;
    $puck_26 = $puck_1.Iterable[$puck_27.type].toList.call($puck_27);
  }
  else {
    $puck_26 = implementations;
  };
  implementations = $puck_26;
  let $puck_28;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    let $puck_29 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}, function (i) {
      return $puck_1.Range.contains.call($puck_6.Type.getFunction.call($puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: $puck_6.Type.getTrait.call(i.trait_).functions, $isTraitObject: true}, functionName)).parameterRange, $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true}));
    })
;
    $puck_28 = $puck_1.Iterable[$puck_29.type].toList.call($puck_29);
  }
  else {
    $puck_28 = implementations;
  };
  implementations = $puck_28;
  let $puck_30;
  if (($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1 && $puck_1.Option.isSome.call(type_.instance))) {
    $puck_30 = getMostSpecificImplementations(type_, implementations);
  }
  else {
    $puck_30 = implementations;
  };
  implementations = $puck_30;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}) > 1) {
    return $puck_1.Err(implementations);
  }
  else {
    return $puck_1.Ok($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true}));
  };
};
exports.getImplementation = getImplementation;
function getTypeSpecificity(type_) {
  let $puck_31 = type_.kind;
  if ($puck_31.kind == "Parameter") {
    let {value: [$puck_32]} = $puck_31;
    return 0;
  };
  let $puck_33 = type_.instance;
  if ($unwrapTraitObject($puck_33).kind == "Some") {
    let {value: [instance]} = $unwrapTraitObject($puck_33);
    return instance.typeParameters.reduce(function (sum, type_) {
      return sum + getTypeSpecificity(type_);
    }, 1);
  }
  else {
    if (($unwrapTraitObject($puck_33).kind == "None")) {
      let undefined = $unwrapTraitObject($puck_33);
      return 1;
    };
  };
};
function resolveImplTypeParameters(implementation, objectType) {
  let parameterMap = $puck_1.ObjectMap._new();
  let $puck_34 = implementation.type_.instance;
  if ($puck_34.kind == "Some") {
    let {value: [instance]} = $puck_34;
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: instance.typeParameters, $isTraitObject: true}, function (p) {
      return $puck_1.ObjectMap.set.call(parameterMap, $puck_1.Option.unwrap.call(p.name), p);
    });
    let iter = $puck_1.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: $puck_1.List.zip({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: instance.typeParameters, $isTraitObject: true}, $puck_1.Option.unwrap.call($puck_6.Type.typeParameters.call(objectType))), $isTraitObject: true});
    while (true) {
      let $puck_35 = $puck_1.Iterator[iter.type].next.call(iter);
      if ($puck_35.kind == "Some") {
        let {value: [[ip, op]]} = $puck_35;
        let $puck_36 = collectTypeParameters(parameterMap, ip, op);
        if ($puck_36.kind == "Err") {
          let {value: [err]} = $puck_36;
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
  let $puck_37 = ip.kind;
  if ($unwrapTraitObject($puck_37).kind == "Parameter") {
    let undefined = $unwrapTraitObject($puck_37);
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
      let $puck_38 = $puck_37;
      let $puck_39 = ip.instance;
      if ($puck_39.kind == "Some") {
        let {value: [instance]} = $puck_39;
        let iter = $puck_1.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: $puck_1.List.zip({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: instance.typeParameters, $isTraitObject: true}, $puck_1.Option.unwrap.call(op.instance).typeParameters), $isTraitObject: true});
        while (true) {
          let $puck_40 = $puck_1.Iterator[iter.type].next.call(iter);
          if ($puck_40.kind == "Some") {
            let {value: [[ip, op]]} = $puck_40;
            let $puck_41 = collectTypeParameters(parameterMap, ip, op);
            if ($puck_41.kind == "Err") {
              let {value: [err]} = $puck_41;
              return $puck_1.Err(err);
            };
          }
          else {
            break          };
        };
      };
    };
  };
  return $puck_1.Ok([]);
}
