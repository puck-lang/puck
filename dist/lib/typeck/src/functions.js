'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.isPatternMutable = exports.createFunctionType = exports.checkFunctionAssignability = exports.resolveFunctionTypeParametersundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("./../../ast/ast");
const $puck_4 = require("./../../ast/span");
const $puck_5 = require("./../../entities");
const $puck_6 = require("./range");
const $puck_7 = require("./scope");
const $puck_8 = require("./types");
function getPatternName(pattern) {
  let $puck_9 = pattern;
  if ($unwrapTraitObject($puck_9).kind === "Identifier") {
    let {value: {identifier: identifier}} = $unwrapTraitObject($puck_9);
    return $puck_1.Some(identifier.name);
  }
  else {
    if (true) {
      let $puck_10 = $puck_9;
      return $puck_1.None;
    };
  };
};
function isPatternMutable(pattern) {
  let $puck_11 = pattern;
  if ($unwrapTraitObject($puck_11).kind === "CatchAll") {
    let undefined = $unwrapTraitObject($puck_11);
    return false;
  }
  else {
    if ($unwrapTraitObject($puck_11).kind === "Identifier") {
      let {value: {identifier: identifier, mutable: mutable}} = $unwrapTraitObject($puck_11);
      return mutable;
    }
    else {
      if ($unwrapTraitObject($puck_11).kind === "Record") {
        let {value: [record]} = $unwrapTraitObject($puck_11);
        return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: record.properties, $isTraitObject: true}, function (p) {
          return isPatternMutable(p.pattern);
        });
      }
      else {
        if ($unwrapTraitObject($puck_11).kind === "Tuple") {
          let {value: [tuple]} = $unwrapTraitObject($puck_11);
          return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true}, isPatternMutable);
        }
        else {
          if ($unwrapTraitObject($puck_11).kind === "RecordType") {
            let {value: [$puck_12, record]} = $unwrapTraitObject($puck_11);
            return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: record.properties, $isTraitObject: true}, function (p) {
              return isPatternMutable(p.pattern);
            });
          }
          else {
            if ($unwrapTraitObject($puck_11).kind === "TupleType") {
              let {value: [$puck_13, tuple]} = $unwrapTraitObject($puck_11);
              return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true}, isPatternMutable);
            }
            else {
              if ($unwrapTraitObject($puck_11).kind === "UnitType") {
                let undefined = $unwrapTraitObject($puck_11);
                return false;
              };
            };
          };
        };
      };
    };
  };
};
exports.isPatternMutable = isPatternMutable;
function createFunctionType(file, scope, f, reportError) {
  let $puck_14;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.typeParameters, $isTraitObject: true})) {
    let $puck_15 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.typeParameters, $isTraitObject: true}, function (p) {
      return p.type_;
    })
;
    $puck_14 = $puck_1.Some({
      parameterRange: $puck_6.getRange(f.typeParameters, function (p) {
      return $puck_1.Option.isSome.call(p.defaultValue);
    }, reportError, "type parameter"),
      instances: [],
      typeParameters: $puck_1.Iterable[$puck_15.type].toList.call($puck_15),
    });
  }
  else {
    $puck_14 = $puck_1.None;
  };
  const _class = $puck_14;
  let $puck_17 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true})
;
  let $puck_16 = $puck_1.Iterable[$puck_17.type].map.call($puck_17, function ([i, p]) {
    return $puck_7.Binding({
      definition: $puck_5.Definition({
      file: file,
      token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: p, $isTraitObject: true},
    }),
      name: $puck_1.Option.unwrapOr.call(getPatternName(p.pattern), "p" + i + ""),
      mutable: isPatternMutable(p.pattern),
      allowRedeclare: true,
      type_: $unwrapTraitObject(p.type_),
      previous: $puck_1.None,
      completeType: $puck_1.None,
    });
  })
;
  let parameters = $puck_1.Iterable[$puck_16.type].toList.call($puck_16);
  let $puck_18 = f.returnType;
  let $puck_19;
  if ($puck_18.kind === "Some") {
    let {value: [returnType]} = $puck_18;
    $puck_19 = $puck_3.TypeBound.getType.call(returnType);
  }
  else {
    $puck_19 = $puck_2._undefined;
  };
  const returnType = $puck_19;
  const selfBinding = $puck_1.Option.andThen.call($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameters, $isTraitObject: true}), function (b) {
    if (b.name === "self") {
      return $puck_1.Some(b);
    }
    else {
      return $puck_1.None;
    };
  });
  let $puck_20;
  if ($puck_1.Option.isSome.call(selfBinding)) {
    let $puck_21 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].skip.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameters, $isTraitObject: true}, 1)
;
    $puck_20 = $puck_1.Iterable[$puck_21.type].toList.call($puck_21);
  }
  else {
    $puck_20 = parameters;
  };
  parameters = $puck_20;
  let $puck_22;
  if (f.parameterList) {
    $puck_22 = $puck_6.getRange(parameters, function (p) {
      const vd = $unwrapTraitObject(p.definition.token);
      return $puck_1.Option.isSome.call(vd.initializer);
    }, reportError, "parameter");
  }
  else {
    $puck_22 = {
      start: 0,
      end: 1,
    };
  };
  return {
    definition: $puck_5.Definition({
    file: file,
    token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: f, $isTraitObject: true},
  }),
    id: $puck_1.None,
    displayName: $puck_1.None,
    name: $puck_1.Option.map.call(f.name, function (identifier) {
    return identifier.name;
  }),
    kind: $puck_5.TypeKind.Function({
    selfBinding: selfBinding,
    parameters: parameters,
    parameterRange: $puck_22,
    returnType: returnType,
    isAbstract: $puck_1.Option.isNone.call(f.body),
  }),
    _class: _class,
    instance: $puck_1.None,
    providesType: $puck_1.None,
    enumMember: $puck_1.None,
  };
};
exports.createFunctionType = createFunctionType;
function checkFunctionAssignability(functionName, to, subject) {
  let $puck_23 = $puck_6.checkRange(subject.parameters, to.parameterRange, "arguments", functionName);
  if ($puck_23.kind === "Err") {
    let {value: [error]} = $puck_23;
    return $puck_1.Err(error);
  };
  let errors = [];
  let $puck_24 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: subject.parameters, $isTraitObject: true})
;
  $puck_1.Iterable[$puck_24.type].forEach.call($puck_24, function ([i, subjectParameter]) {
    const toParameter = $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: to.parameters, $isTraitObject: true}, i);
    if ((!$puck_8.isAssignable(toParameter.type_, subjectParameter.type_))) {
      return $puck_1.List.push.call(errors, "Types of parameter #" + i + " does not match. " + $puck_5.Type.displayName.call(subjectParameter.type_) + " is not assignable to " + $puck_5.Type.displayName.call(toParameter.type_));
    }
    else {
      if ((subjectParameter.mutable && !toParameter.mutable)) {
        return $puck_1.List.push.call(errors, "Parameter #" + i + " is required to be immutable");
      };
    };
  });
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: errors, $isTraitObject: true}) > 0) {
    return $puck_1.Err($unwrapTraitObject($puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: errors, $isTraitObject: true}, 0)));
  };
  if ((!$puck_8.isAssignable(to.returnType, subject.returnType))) {
    return $puck_1.Err("Return type " + $puck_5.Type.displayName.call(subject.returnType) + " is not assignable to " + $puck_5.Type.displayName.call(to.returnType));
  }
  else {
    return $puck_1.Ok([]);
  };
};
exports.checkFunctionAssignability = checkFunctionAssignability;
function resolveFunctionTypeParameters(parameterMap, typeParameters, parameterType, argumentType, allowedToFollowFunction = true) {
  if ((!parameterType || !argumentType || $puck_5.Type.isNever.call(argumentType))) {
    return [];
  };
  let $puck_25 = parameterType.kind;
  if ($unwrapTraitObject($puck_25).kind === "Parameter") {
    let {value: [$puck_26]} = $unwrapTraitObject($puck_25);
    const name = $puck_1.Option.unwrap.call(parameterType.name);
    if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: typeParameters, $isTraitObject: true}, function (p) {
      return $puck_1.Option.unwrap.call(p.name) === name;
    })) {
      if ((!$puck_1.ObjectMap.has.call(parameterMap, name))) {
        parameterMap[name] = argumentType;
      };
    };
  }
  else {
    if ($unwrapTraitObject($puck_25).kind === "Struct") {
      let {value: [struct]} = $unwrapTraitObject($puck_25);
      if ((!$puck_1.Option.isSome.call(parameterType.id))) {
        let $puck_27 = struct.kind;
        if ($unwrapTraitObject($puck_27).kind === "Record") {
          let {value: [parameterRecord]} = $unwrapTraitObject($puck_27);
          let $puck_28 = argumentType.kind;
          if (($puck_28.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_28.value)[0]).kind).kind === "Record")) {
            let {value: [{kind: {value: [argumentRecord]}}]} = $puck_28;
            $puck_1.ObjectMap.forEach.call(parameterRecord.properties, function ([name, parameterType]) {
              let $puck_29 = $puck_1.ObjectMap.get.call(argumentRecord.properties, name);
              if ($puck_29.kind === "Some") {
                let {value: [argumentType]} = $puck_29;
                return resolveFunctionTypeParameters(parameterMap, typeParameters, parameterType, argumentType);
              };
            });
          };
        }
        else {
          if ($unwrapTraitObject($puck_27).kind === "Tuple") {
            let {value: [parameterTuple]} = $unwrapTraitObject($puck_27);
            let $puck_30 = argumentType.kind;
            if (($puck_30.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_30.value)[0]).kind).kind === "Tuple")) {
              let {value: [{kind: {value: [argumentTuple]}}]} = $puck_30;
              let $puck_31 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameterTuple.properties, $isTraitObject: true})
;
              $puck_1.Iterable[$puck_31.type].forEach.call($puck_31, function ([i, parameterType]) {
                let $puck_32 = $puck_1.List.get.call(argumentTuple.properties, i);
                if ($puck_32.kind === "Some") {
                  let {value: [argumentType]} = $puck_32;
                  return resolveFunctionTypeParameters(parameterMap, typeParameters, parameterType, argumentType);
                };
              });
            };
          }
          else {
            if (true) {
              let $puck_33 = $puck_27;
            };
          };
        };
      };
    }
    else {
      if ($unwrapTraitObject($puck_25).kind === "Function") {
        let {value: [parameterFunction]} = $unwrapTraitObject($puck_25);
        if ((allowedToFollowFunction && parameterFunction.returnType)) {
          let $puck_34 = argumentType.kind;
          if ($puck_34.kind === "Function") {
            let {value: [argumentFunction]} = $puck_34;
            if (argumentFunction.returnType) {
              resolveFunctionTypeParameters(parameterMap, typeParameters, parameterFunction.returnType, argumentFunction.returnType);
            };
          };
        };
      }
      else {
        if (true) {
          let $puck_35 = $puck_25;
        };
      };
    };
  };
  let $puck_36 = [
    $puck_5.Type.typeParameters.call(parameterType),
    $puck_5.Type.typeParameters.call(argumentType),
  ];
  if (($unwrapTraitObject($unwrapTraitObject($puck_36)[0]).kind === "Some" && $unwrapTraitObject($unwrapTraitObject($puck_36)[1]).kind === "Some")) {
    let [{value: [parameterParameters]}, {value: [argumentParameters]}] = $unwrapTraitObject($puck_36);
    let $puck_37 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameterParameters, $isTraitObject: true})
;
    return $puck_1.Iterable[$puck_37.type].forEach.call($puck_37, function ([i, parameterType]) {
      let $puck_38 = $puck_1.List.get.call(argumentParameters, i);
      if ($puck_38.kind === "Some") {
        let {value: [argumentType]} = $puck_38;
        return resolveFunctionTypeParameters(parameterMap, typeParameters, parameterType, argumentType, false);
      };
    });
  }
  else {
    if (true) {
      let $puck_39 = $puck_36;;
      let $puck_40 = $puck_39;;
      return $puck_39;
    };
  };
};
exports.resolveFunctionTypeParameters = resolveFunctionTypeParameters
