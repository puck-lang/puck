'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.isPatternMutable = exports.createFunctionType = exports.checkFunctionAssignability = exports.checkFunctionCall = exports.resolveFunctionTypeParametersByReturnValue = exports.resolveFunctionTypeParameters = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("./../../ast/ast");
const $puck_4 = require("./../../ast/span");
const $puck_5 = require("./../scope_visitor");
const $puck_6 = require("./../../entities");
const $puck_7 = require("./range");
const $puck_8 = require("./scope");
const $puck_9 = require("./types");
const $puck_10 = require("./structure_visitor");
function getPatternName(pattern) {
  let $puck_11 = pattern;
  if ($puck_11.kind === "Identifier") {
    let {value: {identifier: identifier}} = $puck_11;
    return $puck_1.Some(identifier.name);
  }
  else {
    if (true) {
      $puck_11;
      return $puck_1.None;
    };
  };
};
function isPatternMutable(pattern) {
  let $puck_12 = pattern;
  if ($puck_12.kind === "CatchAll") {
    $puck_12;
    return false;
  }
  else {
    if ($puck_12.kind === "Identifier") {
      let {value: {identifier: identifier, mutable: mutable}} = $puck_12;
      return mutable;
    }
    else {
      if ($puck_12.kind === "Record") {
        let {value: record} = $puck_12;
        return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: record.properties, $isTraitObject: true}, function (p) {
          return isPatternMutable(p.pattern);
        });
      }
      else {
        if ($puck_12.kind === "Tuple") {
          let {value: tuple} = $puck_12;
          return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true}, isPatternMutable);
        }
        else {
          if ($puck_12.kind === "RecordType") {
            let {value: [, record]} = $puck_12;
            return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: record.properties, $isTraitObject: true}, function (p) {
              return isPatternMutable(p.pattern);
            });
          }
          else {
            if ($puck_12.kind === "TupleType") {
              let {value: [, tuple]} = $puck_12;
              return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true}, isPatternMutable);
            }
            else {
              if ($puck_12.kind === "UnitType") {
                $puck_12;
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
  let $puck_13;
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.typeParameters, $isTraitObject: true})) {
    let $puck_14 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.typeParameters, $isTraitObject: true}, function (p) {
      return p.type_;
    })
;
    $puck_13 = $puck_1.Some({
      parameterRange: $puck_7.getRange(f.typeParameters, function (p) {
      return $puck_1.Option.isSome.call(p.defaultValue);
    }, reportError, "type parameter"),
      instances: [],
      typeParameters: $puck_1.Iterable[$puck_14.type].toList.call($puck_14),
    });
  }
  else {
    $puck_13 = $puck_1.None;
  };
  const _class = $puck_13;
  let $puck_16 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true})
;
  let $puck_15 = $puck_1.Iterable[$puck_16.type].map.call($puck_16, function ([i, p]) {
    return $puck_8.Binding({
      definition: $puck_6.Definition({
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
  let parameters = $puck_1.Iterable[$puck_15.type].toList.call($puck_15);
  let $puck_17 = f.returnType;
  let $puck_18;
  if ($puck_17 !== undefined) {
    let returnType = $puck_17;
    $puck_18 = $puck_3.TypeBound.getType.call(returnType);
  }
  else {
    $puck_18 = $puck_2._undefined;
  };
  const returnType = $puck_18;
  const selfBinding = $puck_1.Option.andThen.call($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameters, $isTraitObject: true}), function (b) {
    if (b.name === "self") {
      return $puck_1.Some(b);
    }
    else {
      return $puck_1.None;
    };
  });
  let $puck_19;
  if ($puck_1.Option.isSome.call(selfBinding)) {
    let $puck_20 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].skip.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameters, $isTraitObject: true}, 1)
;
    $puck_19 = $puck_1.Iterable[$puck_20.type].toList.call($puck_20);
  }
  else {
    $puck_19 = parameters;
  };
  parameters = $puck_19;
  let $puck_21;
  if (f.parameterList) {
    $puck_21 = $puck_7.getRange(parameters, function (p) {
      const vd = $unwrapTraitObject(p.definition.token);
      return $puck_1.Option.isSome.call(vd.initializer);
    }, reportError, "parameter");
  }
  else {
    $puck_21 = {
      start: 0,
      end: 1,
    };
  };
  return {
    definition: $puck_6.Definition({
    file: file,
    token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: f, $isTraitObject: true},
  }),
    id: $puck_1.None,
    displayName: $puck_1.None,
    name: $puck_1.Option.map.call(f.name, function (identifier) {
    return identifier.name;
  }),
    kind: $puck_6.TypeKind.Function({
    selfBinding: selfBinding,
    parameters: parameters,
    parameterRange: $puck_21,
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
  let $puck_22 = $puck_7.checkRange(subject.parameters, to.parameterRange, "arguments", functionName);
  if ($puck_22.kind === "Err") {
    let {value: error} = $puck_22;
    return $puck_1.Err(error);
  };
  let errors = [];
  let $puck_23 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: subject.parameters, $isTraitObject: true})
;
  $puck_1.Iterable[$puck_23.type].forEach.call($puck_23, function ([i, subjectParameter]) {
    const toParameter = $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: to.parameters, $isTraitObject: true}, i);
    if ((!$puck_9.isAssignable(toParameter.type_, subjectParameter.type_))) {
      return $puck_1.List.push.call(errors, "Types of parameter #" + i + " does not match. " + $puck_6.Type.displayName.call(subjectParameter.type_) + " is not assignable to " + $puck_6.Type.displayName.call(toParameter.type_));
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
  if ((!$puck_9.isAssignable(to.returnType, subject.returnType))) {
    return $puck_1.Err("Return type " + $puck_6.Type.displayName.call(subject.returnType) + " is not assignable to " + $puck_6.Type.displayName.call(to.returnType));
  }
  else {
    return $puck_1.Ok(undefined);
  };
};
exports.checkFunctionAssignability = checkFunctionAssignability;
function checkFunctionCall(functionType, c) {
  if ((!functionType)) {
    return $puck_1.Ok($unwrapTraitObject($puck_2._undefined));
  };
  let $puck_24 = c.func;
  let $puck_25;
  if ($puck_24.kind === "Identifier") {
    let {value: i} = $puck_24;
    $puck_25 = i.name;
  }
  else {
    let $puck_26;
    if (true) {
      $puck_24;
      $puck_26 = $puck_6.Type.displayName.call(functionType);
    };
    $puck_25 = $puck_26;
  };
  const name = $puck_25;
  let $puck_27 = functionType.kind;
  let $puck_28;
  if ($puck_27.kind === "Function") {
    let {value: func} = $puck_27;
    $puck_28 = func;
  }
  else {
    let $puck_29;
    if (true) {
      $puck_27;
      return $puck_1.Err([
        {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: c, $isTraitObject: true},
        "" + name + " is not callable",
      ]);
    };
    $puck_28 = $puck_29;
  };
  const _function = $puck_28;
  let $puck_30 = _function.selfBinding;
  if ($puck_30 !== undefined) {
    let selfBinding = $puck_30;
    if (selfBinding.mutable) {
      if ((!$puck_1.Option.mapOr.call($puck_5.getBinding(c.func), true, function (binding) {
        return binding.mutable;
      }))) {
        return $puck_1.Err([
          {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: c, $isTraitObject: true},
          "" + name + " can only be called on a mutable binding",
        ]);
      };
    };
  };
  let $puck_31 = $puck_7.checkRange(c.argumentList, _function.parameterRange, "arguments", name);
  if ($puck_31.kind === "Err") {
    let {value: error} = $puck_31;
    return $puck_1.Err([
      {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: c, $isTraitObject: true},
      error,
    ]);
  };
  let $puck_32 = c.typeArguments;
  if ($puck_32 !== undefined) {
    let t = $puck_32;
    let $puck_33 = $puck_1.Option.orValue.call($puck_1.Option.andThen.call(functionType.instance, function (i) {
      return i._class._class;
    }), functionType._class);
    if ($puck_33 !== undefined) {
      let _class = $puck_33;
      let $puck_34 = $puck_7.checkRange(t.typeArguments, _class.parameterRange, "type parameters", $puck_6.Type.displayName.call(functionType));
      if ($puck_34.kind === "Err") {
        let {value: error} = $puck_34;
        return $puck_1.Err([
          {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeArguments', value: t, $isTraitObject: true},
          error,
        ]);
      };
    }
    else {
      return $puck_1.Err([
        {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeArguments', value: t, $isTraitObject: true},
        "Type " + $puck_6.Type.displayName.call(functionType) + " is not generic",
      ]);
    };
  };
  let $puck_38 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: c.argumentList, $isTraitObject: true})
;
  let $puck_35 = $puck_1.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: $puck_1.Iterable[$puck_38.type].toList.call($puck_38), $isTraitObject: true});
  let $puck_36 = true;
  while ($puck_36) {
    let $puck_39 = $puck_1.Iterator[$puck_35.type].next.call($puck_35);
    if (($puck_39 !== undefined)) {
      let [i, argument] = $puck_39;
      const parameter = $puck_1.Option.unwrap.call($puck_1.List.get.call(_function.parameters, i));
      const parameterName = parameter.name;
      if ((!$puck_9.isAssignable(parameter.type_, $puck_3.Expression.getType.call(argument)))) {
        return $puck_1.Err([
          {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: argument, $isTraitObject: true},
          $puck_10.notAssignableError(parameter.type_, $puck_3.Expression.getType.call(argument)) + " in parameter " + parameterName + " of function " + name + "",
        ]);
      };
      if (parameter.mutable) {
        let $puck_40 = $puck_5.getBinding(argument);
        if (($puck_40 !== undefined)) {
          let argumentBinding = $puck_40;
          const argumentName = argumentBinding.name;
          if ((!argumentBinding.mutable)) {
            return $puck_1.Err([
              {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: argument, $isTraitObject: true},
              "Parameter " + parameterName + " of function " + name + " requires a mutable binding " + "but " + argumentName + " is declared as immutable.",
            ]);
          };
        };
      };
    }
    else {
      $puck_36 = false;
    };
  };
  return $puck_1.Ok(_function);
};
exports.checkFunctionCall = checkFunctionCall;
function resolveFunctionTypeParametersByReturnValue(parameterMap, typeParameters, returnType, assignedTo) {
  if (($puck_9.isSameId(returnType, assignedTo) && $puck_9.isAssignable(assignedTo, returnType))) {
    let $puck_41 = [
      $puck_6.Type.typeParameters.call(returnType),
      $puck_6.Type.typeParameters.call(assignedTo),
    ];
    if ($puck_41[0] !== undefined && $puck_41[1] !== undefined) {
      let [returnTypeTypeParameters, assignedToTypeParameters] = $puck_41;
      let $puck_42 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: returnTypeTypeParameters, $isTraitObject: true})
;
      return $puck_1.Iterable[$puck_42.type].forEach.call($puck_42, function ([i, returnTypeTypeParameter]) {
        let $puck_43 = $puck_1.List.get.call(assignedToTypeParameters, i);
        if ($puck_43 !== undefined) {
          let assignedToTypeParameter = $puck_43;
          if (($puck_6.Type.isParameter.call(returnTypeTypeParameter) && !$puck_6.Type.isParameter.call(assignedToTypeParameter))) {
            const name = $puck_1.Option.unwrap.call(returnTypeTypeParameter.name);
            if (!$puck_1.ObjectMap.has.call(parameterMap, name)) {
              return $puck_1.ObjectMap.set.call(parameterMap, name, assignedToTypeParameter);
            };
          };
        };
      });
    }
    else {
      if (true) {
        let $puck_44 = $puck_41;;
        return $puck_44;
      };
    };
  };
};
exports.resolveFunctionTypeParametersByReturnValue = resolveFunctionTypeParametersByReturnValue;
function resolveFunctionTypeParameters(parameterMap, typeParameters, parameterType, argumentType, allowedToFollowFunction = true) {
  if ((!parameterType || !argumentType || $puck_6.Type.isNever.call(argumentType))) {
    return undefined;
  };
  let $puck_45 = parameterType.kind;
  if ($puck_45.kind === "Parameter") {
    $puck_45;
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
    if ($puck_45.kind === "Struct") {
      let {value: struct} = $puck_45;
      if ((!$puck_1.Option.isSome.call(parameterType.id))) {
        let $puck_46 = struct.kind;
        if ($puck_46.kind === "Record") {
          let {value: parameterRecord} = $puck_46;
          let $puck_47 = argumentType.kind;
          if (($puck_47.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($puck_47.value).kind).kind === "Record")) {
            let {value: {kind: {value: argumentRecord}}} = $puck_47;
            $puck_1.ObjectMap.forEach.call(parameterRecord.properties, function ([name, {type_: parameterType}]) {
              let $puck_48 = $puck_1.ObjectMap.get.call(argumentRecord.properties, name);
              if ($puck_48 !== undefined) {
                let {type_: argumentType} = $puck_48;
                return resolveFunctionTypeParameters(parameterMap, typeParameters, parameterType, argumentType);
              };
            });
          };
        }
        else {
          if ($puck_46.kind === "Tuple") {
            let {value: parameterTuple} = $puck_46;
            let $puck_49 = argumentType.kind;
            if (($puck_49.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($puck_49.value).kind).kind === "Tuple")) {
              let {value: {kind: {value: argumentTuple}}} = $puck_49;
              let $puck_50 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameterTuple.properties, $isTraitObject: true})
;
              $puck_1.Iterable[$puck_50.type].forEach.call($puck_50, function ([i, parameterType]) {
                let $puck_51 = $puck_1.List.get.call(argumentTuple.properties, i);
                if ($puck_51 !== undefined) {
                  let argumentType = $puck_51;
                  return resolveFunctionTypeParameters(parameterMap, typeParameters, parameterType, argumentType);
                };
              });
            };
          }
          else {
            if (true) {
              $puck_46;
            };
          };
        };
      };
    }
    else {
      if ($puck_45.kind === "Function") {
        let {value: parameterFunction} = $puck_45;
        if ((allowedToFollowFunction && parameterFunction.returnType)) {
          let $puck_52 = argumentType.kind;
          if ($puck_52.kind === "Function") {
            let {value: argumentFunction} = $puck_52;
            if (argumentFunction.returnType) {
              resolveFunctionTypeParameters(parameterMap, typeParameters, parameterFunction.returnType, argumentFunction.returnType);
            };
          };
        };
      }
      else {
        if (true) {
          $puck_45;
        };
      };
    };
  };
  let $puck_53 = [
    $puck_6.Type.typeParameters.call(parameterType),
    $puck_6.Type.typeParameters.call(argumentType),
  ];
  if (($puck_53[0] !== undefined && $puck_53[1] !== undefined)) {
    let [parameterParameters, argumentParameters] = $puck_53;
    let $puck_54 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameterParameters, $isTraitObject: true})
;
    return $puck_1.Iterable[$puck_54.type].forEach.call($puck_54, function ([i, parameterType]) {
      let $puck_55 = $puck_1.List.get.call(argumentParameters, i);
      if ($puck_55 !== undefined) {
        let argumentType = $puck_55;
        return resolveFunctionTypeParameters(parameterMap, typeParameters, parameterType, argumentType, false);
      };
    });
  }
  else {
    if (true) {
      let $puck_56 = $puck_53;;
      return $puck_56;
    };
  };
};
exports.resolveFunctionTypeParameters = resolveFunctionTypeParameters
