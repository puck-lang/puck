'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.checkDefferedImpls = exports.ImplVisitor = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("./../ast/ast");
const $puck_4 = require("./../ast/span");
const $puck_5 = require("./../compiler");
const visit = require("./../ast/visit");
const $puck_6 = require("./../compiler/ast");
const $puck_7 = require("./src/functions");
const $puck_8 = require("./src/range");
const $puck_9 = require("./src/scope");
const $puck_10 = require("./src/structure_visitor");
const $puck_11 = require("./src/types");
const $puck_12 = require("./../entities");
function checkDefferedImpls(deferredImpl) {
  let $puck_13 = $puck_1.IntoIterator["$impl_IntoIterator$lib/stdlib/core.puck:JsIterator"].iter.call({type: '$impl_IntoIterator$lib/stdlib/core.puck:JsIterator', value: $puck_1.Map.entries.call(deferredImpl), $isTraitObject: true});
  let $puck_14 = true;
  while ($puck_14) {
    let $puck_16 = $puck_1.Iterator[$puck_13.type].next.call($puck_13);
    if ($puck_16 !== undefined) {
      let [type_, awaiters] = $puck_16;
      let $puck_17 = type_.kind;
      let $puck_18;
      if ($puck_17.kind === "Enum") {
        let {value: enum_} = $puck_17;
        $puck_18 = enum_.implementations;
      }
      else {
        let $puck_19;
        if ($puck_17.kind === "Struct") {
          let {value: struct} = $puck_17;
          $puck_19 = struct.implementations;
        }
        else {
          let $puck_20;
          if (true) {
            $puck_17;
            $puck_20 = $puck_1.panic("Type " + $puck_12.Type.displayName.call(type_) + "is not implementable");
          };
          $puck_19 = $puck_20;
        };
        $puck_18 = $puck_19;
      };
      const implementations = $puck_18;
      if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isNotEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true})) {
        let finished = $puck_1.Set._new();
        let $puck_22 = $puck_1.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: awaiters, $isTraitObject: true})
;
        let $puck_21 = $puck_1.Iterator[$puck_22.type].enumerate.call($puck_22)
;
        $puck_1.Iterator[$puck_21.type].forEach.call($puck_21, function ([i, [requiredTraits, callback]]) {
          if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].all.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: requiredTraits, $isTraitObject: true}, function (trait_) {
            return $puck_11.isAssignable(trait_, type_);
          })) {
            $puck_1.Set.add.call(finished, requiredTraits);
            return callback();
          };
        });
        $puck_1.List.removeWhere.call(awaiters, function ([requiredTraits, ]) {
          return $puck_1.Set.has.call(finished, requiredTraits);
        });
      };
      if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: awaiters, $isTraitObject: true})) {
        $puck_1.Map._delete.call(deferredImpl, type_);
      };
    }
    else {
      $puck_14 = false;
    };
  };
};
exports.checkDefferedImpls = checkDefferedImpls;
function implementTrait(traitType, trait_, type_, implementable, i, reportError, id) {
  const traitName = $puck_12.Type.displayName.call(traitType);
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementable.implementations, $isTraitObject: true}, function (imp) {
    return $puck_11.isSameType(imp.trait_, traitType);
  })) {
    reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplDeclaration', value: i, $isTraitObject: true}, "" + traitName + " has already been implemented for " + $puck_12.Type.displayName.call(type_));
  };
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: trait_.requiredTraits, $isTraitObject: true}, function (requiredTrait) {
    if ((!$puck_11.isAssignable(requiredTrait, type_))) {
      return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplDeclaration', value: i, $isTraitObject: true}, "The trait " + $puck_12.Type.displayName.call(requiredTrait) + " is not implemented for the type " + $puck_12.Type.displayName.call(type_));
    };
  });
  const functions = $puck_1.ObjectMap.fromIter($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true}, function (functionDeclaration) {
    return [
      $puck_1.Option.unwrap.call(functionDeclaration.type_.name),
      functionDeclaration.type_,
    ];
  }));
  const traitFunctions = trait_.functions;
  $puck_1.ObjectMap.forEach.call(traitFunctions, function ([name, traitFunctionType]) {
    const traitFunction = $puck_12.Type.getFunction.call(traitFunctionType);
    if ((traitFunction.isAbstract && !$puck_1.ObjectMap.has.call(functions, name))) {
      return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplDeclaration', value: i, $isTraitObject: true}, "Function " + traitName + "::" + name + " is not implemented for " + $puck_12.Type.displayName.call(type_));
    };
  });
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true}, function (functionDeclaration) {
    const functionName = $puck_12.Type.displayName.call(functionDeclaration.type_);
    const _function = $puck_12.Type.getFunction.call(functionDeclaration.type_);
    let $puck_23 = $puck_1.ObjectMap.get.call(traitFunctions, $puck_1.Option.unwrap.call(functionDeclaration.type_.name));
    if (($puck_23 !== undefined)) {
      let traitFunctionType = $puck_23;
      const traitFunctionName = $puck_12.Type.displayName.call(traitFunctionType);
      const traitFunction = $puck_12.Type.getFunction.call(traitFunctionType);
      let $puck_24 = [
        _function.selfBinding,
        traitFunction.selfBinding,
      ];
      if (($puck_24[0] !== undefined && $puck_24[1] !== undefined)) {
        let [implSelf, traitSelf] = $puck_24;
        if ((implSelf.mutable && !traitSelf.mutable)) {
          return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: functionDeclaration, $isTraitObject: true}, "Function " + traitName + "::" + traitFunctionName + " requires an immutable self parameter");
        };
      }
      else {
        if (($puck_24[0] === undefined && $puck_24[1] !== undefined)) {
          let [, ] = $puck_24;
          return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: functionDeclaration, $isTraitObject: true}, "Function " + traitName + "::" + traitFunctionName + " requires a self parameter");
        }
        else {
          if ($puck_24[1] === undefined) {
            let [, ] = $puck_24;
            return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: functionDeclaration, $isTraitObject: true}, "Static trait functions can not be implemented");
          };
        };
      };
    }
    else {
      return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: functionDeclaration, $isTraitObject: true}, "Function " + functionName + " is not defined by " + traitName + "");
    };
  });
  let $puck_25 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true}, function (p) {
    return p.type_;
  })
;
  const implementation = $puck_12.Implementation({
    id: id,
    type_: type_,
    trait_: traitType,
    typeParameters: $puck_1.Iterable[$puck_25.type].toList.call($puck_25),
    typeParameterBounds: $puck_1.Option.map.call(i.whereClause, function (w) {
    return $puck_1.Map.fromIter($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: w.bounds, $isTraitObject: true}, function (b) {
      return [
        $puck_3.TypeBound.getType.call(b.subType),
        $puck_3.TypeBound.getType.call(b.superType),
      ];
    }));
  }),
    functions: functions,
  });
  i.implementation = implementation;
  $puck_1.List.push.call(implementable.implementations, implementation);
  let $puck_26 = traitType.instance;
  let $puck_27;
  if ($puck_26 !== undefined) {
    let traitInstance = $puck_26;
    $puck_27 = $puck_11.resolveTypeParameters(traitInstance.parameterMap);
  }
  else {
    $puck_27 = function (t) {
      return t;
    };
  };
  const resolve = $puck_27;
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true}, function (functionDeclaration) {
    const functionName = $puck_12.Type.displayName.call(functionDeclaration.type_);
    let $puck_28 = $puck_1.ObjectMap.get.call(traitFunctions, $puck_1.Option.unwrap.call(functionDeclaration.type_.name));
    if ($puck_28 !== undefined) {
      let traitFunctionType = $puck_28;
      const traitFunction = $puck_12.Type.getFunction.call(resolve(traitFunctionType));
      const _function = $puck_12.Type.getFunction.call(functionDeclaration.type_);
      functionDeclaration.traitFunctionType = traitFunctionType;
      let $puck_29 = $puck_7.checkFunctionAssignability(functionName, traitFunction, _function);
      if ($puck_29.kind === "Err") {
        let {value: error} = $puck_29;
        return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: functionDeclaration, $isTraitObject: true}, error);
      };
    };
  });
};
function implementShorthand(type_, implementable, i, reportError) {
  const typeName = $puck_12.Type.displayName.call(type_);
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementable.implementations, $isTraitObject: true}, function (imp) {
    return $puck_12.Type.getTrait.call(imp.trait_).isShorthand;
  })) {
    reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplShorthandDeclaration', value: i, $isTraitObject: true}, "" + typeName + " has already been implemented");
  };
  const functions = $puck_1.ObjectMap.fromIter($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true}, function (functionDeclaration) {
    return [
      $puck_1.Option.unwrap.call(functionDeclaration.type_.name),
      functionDeclaration.type_,
    ];
  }));
  let $puck_30 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true}, function (p) {
    return p.type_;
  })
;
  return $puck_1.List.push.call(implementable.implementations, {
    type_: type_,
    trait_: {
    definition: type_.definition,
    id: type_.id,
    displayName: type_.displayName,
    name: type_.name,
    kind: $puck_12.TypeKind.Trait({
    isShorthand: true,
    requiredTraits: [],
    functions: functions,
  }),
    _class: $puck_1.None,
    instance: $puck_1.None,
    providesType: $puck_1.None,
    enumMember: $puck_1.None,
  },
    typeParameters: $puck_1.Iterable[$puck_30.type].toList.call($puck_30),
    typeParameterBounds: $puck_1.None,
    functions: functions,
  });
};
function ImplVisitor(context, file) {
  let importDirective;
  function getImplId(type_, trait_) {
    let id = "$impl_" + $puck_1.Option.unwrap.call(type_.id) + "$" + $puck_1.Option.unwrap.call(trait_.id);
    let $puck_31 = $puck_1.Map.get.call(context.impls, id);
    if (($puck_31 !== undefined)) {
      let count = $puck_31;
      $puck_1.Map.set.call(context.impls, id, count + 1);
      id = "" + id + "$" + count + "";
    }
    else {
      $puck_1.Map.set.call(context.impls, id, 1);
    };
    return id;
  };
  function reportError(token, message) {
    return $puck_5.CompilerContext.reportError.call(context, file, token, $puck_12.CompilationError.Other(message));
  };
  return $puck_2._Object.assign({}, visit.emptyVisitor, $puck_10.structureVisitor(context, file, "ImplVisitor"), {
    visitModule: function (m) {
    let self = this;
    $unwrapTraitObject(self).scope = m.scope;
    let $puck_32 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: m.statements, $isTraitObject: true}, function (e) {
      let $puck_33 = e;
      if (($puck_33.kind === "ImplDeclaration")) {
        $puck_33;
        return true;
      }
      else {
        if ($puck_33.kind === "ImplShorthandDeclaration") {
          $puck_33;
          return true;
        }
        else {
          if (true) {
            $puck_33;
            return false;
          };
        };
      };
    })
;
    return $puck_1.Iterable[$puck_32.type].forEach.call($puck_32, function (s) {
      return $unwrapTraitObject(self).visitTopLevelStatement(s);
    });
  },
    visitImplDeclaration: function (i) {
    let self = this;
    const parentScope = $unwrapTraitObject(self).scope;
    let scope = $puck_9.Scope.createChild.call(parentScope);
    $unwrapTraitObject(self).scope = scope;
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true}, $unwrapTraitObject($unwrapTraitObject(self).visitTypeParameter).bind(self));
    $unwrapTraitObject(self).visitNamedTypeBound(i.trait_);
    $unwrapTraitObject(self).visitNamedTypeBound(i.type_);
    const traitType = $puck_3.NamedTypeBound.getType.call(i.trait_);
    let structType = $puck_3.NamedTypeBound.getType.call(i.type_);
    $puck_9.Scope.setSelfType.call(scope, structType);
    let $puck_34 = i.whereClause;
    if ($puck_34 !== undefined) {
      let whereClause = $puck_34;
      $unwrapTraitObject(self).visitWhereClause(whereClause);
    };
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true}, function (m) {
      return $unwrapTraitObject(self).visitMethodDeclaration(m, structType);
    });
    const id = getImplId(traitType, structType);
    let $puck_35 = traitType.kind;
    if ($puck_35.kind === "Trait") {
      let {value: trait_} = $puck_35;
      function implement() {
        let $puck_36 = structType.kind;
        if ($puck_36.kind === "Enum") {
          let {value: enum_} = $puck_36;
          implementTrait(traitType, trait_, structType, enum_, i, reportError, id);
        }
        else {
          if ($puck_36.kind === "Struct") {
            let {value: struct} = $puck_36;
            implementTrait(traitType, trait_, structType, struct, i, reportError, id);
          }
          else {
            if (true) {
              $puck_36;
              $puck_5.CompilerContext.reportError.call(context, file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: i.type_, $isTraitObject: true}, $puck_12.CompilationError.Other($puck_12.Type.displayName.call(structType) + " is not a struct or an enum"));
            };
          };
        };
        let $puck_38 = $puck_1.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: $puck_12.Type.getTrait.call(traitType).requiredTraits, $isTraitObject: true})
;
        let $puck_37 = $puck_1.Iterator[$puck_38.type].filterMap.call($puck_38, function (trait_) {
          let $puck_39 = $puck_9.Scope.getBindingByTypeId.call(scope, $puck_1.Option.unwrap.call(trait_.id), "ImplVisitor");
          if (($puck_39 !== undefined)) {
            let binding = $puck_39;
            return $puck_1.Some([
              $puck_1.Option.unwrap.call(trait_.id),
              binding.name,
            ]);
          }
          else {
            const typeName = $puck_1.Option.unwrap.call(trait_.name);
            $puck_5.CompilerContext.reportError.call(context, file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplDeclaration', value: i, $isTraitObject: true}, $puck_12.CompilationError.TraitNotInScope({
              traitName: typeName,
              id: $puck_1.Option.unwrap.call(trait_.id),
            }));
            return $puck_1.None;
          };
        })
;
        return i.extendedTraits = $puck_1.ObjectMap.fromIter({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.Iterator[$puck_37.type].collect.call($puck_37), $isTraitObject: true});
      };
      if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isNotEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: trait_.requiredTraits, $isTraitObject: true})) {
        $puck_5.CompilerContext.deferAfterImpl.call(context, structType, trait_.requiredTraits, implement);
      }
      else {
        implement();
      };
    }
    else {
      $puck_5.CompilerContext.reportError.call(context, file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: i.trait_, $isTraitObject: true}, $puck_12.CompilationError.Other($puck_12.Type.displayName.call(traitType) + " is not a trait"));
    };
    return $unwrapTraitObject(self).scope = parentScope;
  },
    visitImplShorthandDeclaration: function (i) {
    let self = this;
    const parentScope = $unwrapTraitObject(self).scope;
    let scope = $puck_9.Scope.createChild.call(parentScope);
    $unwrapTraitObject(self).scope = scope;
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true}, $unwrapTraitObject($unwrapTraitObject(self).visitTypeParameter).bind(self));
    $unwrapTraitObject(self).visitNamedTypeBound(i.type_);
    let structType = $puck_3.NamedTypeBound.getType.call(i.type_);
    $puck_9.Scope.setSelfType.call(scope, structType);
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true}, function (m) {
      return $unwrapTraitObject(self).visitMethodDeclaration(m, structType);
    });
    let $puck_40 = structType.kind;
    if (($puck_40.kind === "Enum")) {
      let {value: enum_} = $puck_40;
      let e = enum_;
      implementShorthand(structType, e, i, reportError);
    }
    else {
      if ($puck_40.kind === "Struct") {
        let {value: struct} = $puck_40;
        let s = struct;
        implementShorthand(structType, s, i, reportError);
      }
      else {
        if (true) {
          $puck_40;
          $puck_5.CompilerContext.reportError.call(context, file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: i.type_, $isTraitObject: true}, $puck_12.CompilationError.Other($puck_12.Type.displayName.call(structType) + " is not a struct or an enum"));
        };
      };
    };
    return $unwrapTraitObject(self).scope = parentScope;
  },
  });
};
exports.ImplVisitor = ImplVisitor
