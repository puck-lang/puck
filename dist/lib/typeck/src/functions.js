'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.isPatternMutable = exports.createFunctionType = exports.checkFunctionAssignability = exports.resolveFunctionTypeParameters = undefined;
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
  if ($puck_9.kind === "Identifier") {
    let {value: {identifier: identifier}} = $puck_9;
    return $puck_1.Some(identifier.name);
  }
  else {
    if (true) {
      $puck_9;
      return $puck_1.None;
    };
  };
};
function isPatternMutable(pattern) {
  let $puck_10 = pattern;
  if ($puck_10.kind === "CatchAll") {
    $puck_10;
    return false;
  }
  else {
    if ($puck_10.kind === "Identifier") {
      let {value: {identifier: identifier, mutable: mutable}} = $puck_10;
      return mutable;
    }
    else {
      if ($puck_10.kind === "Record") {
        let {value: record} = $puck_10;
        return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: record.properties, $isTraitObject: true}, function (p) {
          return isPatternMutable(p.pattern);
        });
      }
      else {
        if ($puck_10.kind === "Tuple") {
          let {value: tuple} = $puck_10;
          return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true}, isPatternMutable);
        }
        else {
          if ($puck_10.kind === "RecordType") {
            let {value: [, record]} = $puck_10;
            return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: record.properties, $isTraitObject: true}, function (p) {
              return isPatternMutable(p.pattern);
            });
          }
          else {
            if ($puck_10.kind === "TupleType") {
              let {value: [, tuple]} = $puck_10;
              return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true}, isPatternMutable);
            }
            else {
              if ($puck_10.kind === "UnitType") {
                $puck_10;
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
  let $puck_11;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.typeParameters, $isTraitObject: true})) {
    let $puck_12 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.typeParameters, $isTraitObject: true}, function (p) {
      return p.type_;
    })
;
    $puck_11 = $puck_1.Some({
      parameterRange: $puck_6.getRange(f.typeParameters, function (p) {
      return $puck_1.Option.isSome.call(p.defaultValue);
    }, reportError, "type parameter"),
      instances: [],
      typeParameters: $puck_1.Iterable[$puck_12.type].toList.call($puck_12),
    });
  }
  else {
    $puck_11 = $puck_1.None;
  };
  const _class = $puck_11;
  let $puck_14 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true})
;
  let $puck_13 = $puck_1.Iterable[$puck_14.type].map.call($puck_14, function ([i, p]) {
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
  let parameters = $puck_1.Iterable[$puck_13.type].toList.call($puck_13);
  let $puck_15 = f.returnType;
  let $puck_16;
  if ($puck_15 !== undefined) {
    let returnType = $puck_15;
    $puck_16 = $puck_3.TypeBound.getType.call(returnType);
  }
  else {
    $puck_16 = $puck_2._undefined;
  };
  const returnType = $puck_16;
  const selfBinding = $puck_1.Option.andThen.call($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameters, $isTraitObject: true}), function (b) {
    if (b.name === "self") {
      return $puck_1.Some(b);
    }
    else {
      return $puck_1.None;
    };
  });
  let $puck_17;
  if ($puck_1.Option.isSome.call(selfBinding)) {
    let $puck_18 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].skip.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameters, $isTraitObject: true}, 1)
;
    $puck_17 = $puck_1.Iterable[$puck_18.type].toList.call($puck_18);
  }
  else {
    $puck_17 = parameters;
  };
  parameters = $puck_17;
  let $puck_19;
  if (f.parameterList) {
    $puck_19 = $puck_6.getRange(parameters, function (p) {
      const vd = $unwrapTraitObject(p.definition.token);
      return $puck_1.Option.isSome.call(vd.initializer);
    }, reportError, "parameter");
  }
  else {
    $puck_19 = {
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
    parameterRange: $puck_19,
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
  let $puck_20 = $puck_6.checkRange(subject.parameters, to.parameterRange, "arguments", functionName);
  if ($puck_20.kind === "Err") {
    let {value: error} = $puck_20;
    return $puck_1.Err(error);
  };
  let errors = [];
  let $puck_21 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: subject.parameters, $isTraitObject: true})
;
  $puck_1.Iterable[$puck_21.type].forEach.call($puck_21, function ([i, subjectParameter]) {
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
    return $puck_1.Ok(undefined);
  };
};
exports.checkFunctionAssignability = checkFunctionAssignability;
function resolveFunctionTypeParameters(parameterMap, typeParameters, parameterType, argumentType, allowedToFollowFunction = true) {
  if ((!parameterType || !argumentType || $puck_5.Type.isNever.call(argumentType))) {
    return undefined;
  };
  let $puck_22 = parameterType.kind;
  if ($puck_22.kind === "Parameter") {
    $puck_22;
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
    if ($puck_22.kind === "Struct") {
      let {value: struct} = $puck_22;
      if ((!$puck_1.Option.isSome.call(parameterType.id))) {
        let $puck_23 = struct.kind;
        if ($puck_23.kind === "Record") {
          let {value: parameterRecord} = $puck_23;
          let $puck_24 = argumentType.kind;
          if (($puck_24.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($puck_24.value).kind).kind === "Record")) {
            let {value: {kind: {value: argumentRecord}}} = $puck_24;
            $puck_1.ObjectMap.forEach.call(parameterRecord.properties, function ([name, {type_: parameterType}]) {
              let $puck_25 = $puck_1.ObjectMap.get.call(argumentRecord.properties, name);
              if ($puck_25 !== undefined) {
                let {type_: argumentType} = $puck_25;
                return resolveFunctionTypeParameters(parameterMap, typeParameters, parameterType, argumentType);
              };
            });
          };
        }
        else {
          if ($puck_23.kind === "Tuple") {
            let {value: parameterTuple} = $puck_23;
            let $puck_26 = argumentType.kind;
            if (($puck_26.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($puck_26.value).kind).kind === "Tuple")) {
              let {value: {kind: {value: argumentTuple}}} = $puck_26;
              let $puck_27 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameterTuple.properties, $isTraitObject: true})
;
              $puck_1.Iterable[$puck_27.type].forEach.call($puck_27, function ([i, parameterType]) {
                let $puck_28 = $puck_1.List.get.call(argumentTuple.properties, i);
                if ($puck_28 !== undefined) {
                  let argumentType = $puck_28;
                  return resolveFunctionTypeParameters(parameterMap, typeParameters, parameterType, argumentType);
                };
              });
            };
          }
          else {
            if (true) {
              $puck_23;
            };
          };
        };
      };
    }
    else {
      if ($puck_22.kind === "Function") {
        let {value: parameterFunction} = $puck_22;
        if ((allowedToFollowFunction && parameterFunction.returnType)) {
          let $puck_29 = argumentType.kind;
          if ($puck_29.kind === "Function") {
            let {value: argumentFunction} = $puck_29;
            if (argumentFunction.returnType) {
              resolveFunctionTypeParameters(parameterMap, typeParameters, parameterFunction.returnType, argumentFunction.returnType);
            };
          };
        };
      }
      else {
        if (true) {
          $puck_22;
        };
      };
    };
  };
  let $puck_30 = [
    $puck_5.Type.typeParameters.call(parameterType),
    $puck_5.Type.typeParameters.call(argumentType),
  ];
  if (($puck_30[0] !== undefined && $puck_30[1] !== undefined)) {
    let [parameterParameters, argumentParameters] = $puck_30;
    let $puck_31 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameterParameters, $isTraitObject: true})
;
    return $puck_1.Iterable[$puck_31.type].forEach.call($puck_31, function ([i, parameterType]) {
      let $puck_32 = $puck_1.List.get.call(argumentParameters, i);
      if ($puck_32 !== undefined) {
        let argumentType = $puck_32;
        return resolveFunctionTypeParameters(parameterMap, typeParameters, parameterType, argumentType, false);
      };
    });
  }
  else {
    if (true) {
      let $puck_33 = $puck_30;;
      return $puck_33;
    };
  };
};
exports.resolveFunctionTypeParameters = resolveFunctionTypeParameters
