'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.ImplVisitorundefined;
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
function implementTrait(traitType, trait_, type_, implementable, i, reportError, id) {
  const traitName = $puck_12.Type.displayName.call(traitType);
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementable.implementations, $isTraitObject: true}, function (imp) {
    return $puck_11.isSameType(imp.trait_, traitType);
  })) {
    reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplDeclaration', value: i, $isTraitObject: true}, "" + traitName + " has already been implemented for " + $puck_12.Type.displayName.call(type_));
  };
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
    let $puck_13 = $puck_1.ObjectMap.get.call(traitFunctions, $puck_1.Option.unwrap.call(functionDeclaration.type_.name));
    if (($puck_13.kind === "Some")) {
      let {value: [traitFunctionType]} = $puck_13;
      const traitFunctionName = $puck_12.Type.displayName.call(traitFunctionType);
      const traitFunction = $puck_12.Type.getFunction.call(traitFunctionType);
      let $puck_14 = [
        _function.selfBinding,
        traitFunction.selfBinding,
      ];
      if (($unwrapTraitObject($unwrapTraitObject($puck_14)[0]).kind === "Some" && $unwrapTraitObject($unwrapTraitObject($puck_14)[1]).kind === "Some")) {
        let [{value: [implSelf]}, {value: [traitSelf]}] = $unwrapTraitObject($puck_14);
        if ((implSelf.mutable && !traitSelf.mutable)) {
          return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: functionDeclaration, $isTraitObject: true}, "Function " + traitName + "::" + traitFunctionName + " requires an immutable self parameter");
        };
      }
      else {
        if (($unwrapTraitObject($unwrapTraitObject($puck_14)[0]).kind === "None" && $unwrapTraitObject($unwrapTraitObject($puck_14)[1]).kind === "Some")) {
          let [, {value: [$puck_15]}] = $unwrapTraitObject($puck_14);
          return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: functionDeclaration, $isTraitObject: true}, "Function " + traitName + "::" + traitFunctionName + " requires a self parameter");
        }
        else {
          if ($unwrapTraitObject($unwrapTraitObject($puck_14)[1]).kind === "None") {
            let [$puck_16, ] = $unwrapTraitObject($puck_14);
            return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: functionDeclaration, $isTraitObject: true}, "Static trait functions can not be implemented");
          };
        };
      };
    }
    else {
      return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: functionDeclaration, $isTraitObject: true}, "Function " + functionName + " is not defined by " + traitName + "");
    };
  });
  let $puck_17 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true}, function (p) {
    return p.type_;
  })
;
  const implementation = $puck_12.Implementation({
    id: id,
    type_: type_,
    trait_: traitType,
    typeParameters: $puck_1.Iterable[$puck_17.type].toList.call($puck_17),
    functions: functions,
  });
  i.implementation = implementation;
  $puck_1.List.push.call(implementable.implementations, implementation);
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true}, function (functionDeclaration) {
    const functionName = $puck_12.Type.displayName.call(functionDeclaration.type_);
    let $puck_18 = $puck_1.ObjectMap.get.call(traitFunctions, $puck_1.Option.unwrap.call(functionDeclaration.type_.name));
    if ($puck_18.kind === "Some") {
      let {value: [traitFunctionType]} = $puck_18;
      const traitFunction = $puck_12.Type.getFunction.call(traitFunctionType);
      const _function = $puck_12.Type.getFunction.call(functionDeclaration.type_);
      functionDeclaration.traitFunctionType = traitFunctionType;
      let $puck_19 = $puck_7.checkFunctionAssignability(functionName, traitFunction, _function);
      if ($puck_19.kind === "Err") {
        let {value: [error]} = $puck_19;
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
  let $puck_20 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true}, function (p) {
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
    functions: functions,
  }),
    _class: $puck_1.None,
    instance: $puck_1.None,
    providesType: $puck_1.None,
    enumMember: $puck_1.None,
  },
    typeParameters: $puck_1.Iterable[$puck_20.type].toList.call($puck_20),
    functions: functions,
  });
};
function ImplVisitor(context, file) {
  let importDirective;
  function getImplId(type_, trait_) {
    let id = "$impl_" + $puck_1.Option.unwrap.call(type_.id) + "$" + $puck_1.Option.unwrap.call(trait_.id);
    let $puck_21 = $puck_1.Map.get.call(context.impls, id);
    if (($puck_21.kind === "Some")) {
      let {value: [count]} = $puck_21;
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
    let $puck_22 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: m.statements, $isTraitObject: true}, function (e) {
      let $puck_23 = e;
      if (($unwrapTraitObject($puck_23).kind === "ImplDeclaration")) {
        let {value: [$puck_24]} = $unwrapTraitObject($puck_23);
        return true;
      }
      else {
        if ($unwrapTraitObject($puck_23).kind === "ImplShorthandDeclaration") {
          let {value: [$puck_25]} = $unwrapTraitObject($puck_23);
          return true;
        }
        else {
          if (true) {
            let $puck_26 = $puck_23;
            return false;
          };
        };
      };
    })
;
    return $puck_1.Iterable[$puck_22.type].forEach.call($puck_22, function (s) {
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
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true}, function (m) {
      return $unwrapTraitObject(self).visitMethodDeclaration(m, structType);
    });
    const id = getImplId(traitType, structType);
    let $puck_27 = traitType.kind;
    if ($puck_27.kind === "Trait") {
      let {value: [trait_]} = $puck_27;
      let $puck_28 = structType.kind;
      if ($unwrapTraitObject($puck_28).kind === "Enum") {
        let {value: [enum_]} = $unwrapTraitObject($puck_28);
        let e = enum_;
        implementTrait(traitType, trait_, structType, e, i, reportError, id);
      }
      else {
        if ($unwrapTraitObject($puck_28).kind === "Struct") {
          let {value: [struct]} = $unwrapTraitObject($puck_28);
          let s = struct;
          implementTrait(traitType, trait_, structType, s, i, reportError, id);
        }
        else {
          if (true) {
            let $puck_29 = $puck_28;
            $puck_5.CompilerContext.reportError.call(context, file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: i.type_, $isTraitObject: true}, $puck_12.CompilationError.Other($puck_12.Type.displayName.call(structType) + " is not a struct or an enum"));
          };
        };
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
    let $puck_30 = structType.kind;
    if (($unwrapTraitObject($puck_30).kind === "Enum")) {
      let {value: [enum_]} = $unwrapTraitObject($puck_30);
      let e = enum_;
      implementShorthand(structType, e, i, reportError);
    }
    else {
      if ($unwrapTraitObject($puck_30).kind === "Struct") {
        let {value: [struct]} = $unwrapTraitObject($puck_30);
        let s = struct;
        implementShorthand(structType, s, i, reportError);
      }
      else {
        if (true) {
          let $puck_31 = $puck_30;
          $puck_5.CompilerContext.reportError.call(context, file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: i.type_, $isTraitObject: true}, $puck_12.CompilationError.Other($puck_12.Type.displayName.call(structType) + " is not a struct or an enum"));
        };
      };
    };
    return $unwrapTraitObject(self).scope = parentScope;
  },
  });
};
exports.ImplVisitor = ImplVisitor
