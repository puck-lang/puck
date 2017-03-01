'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.ImplVisitorundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("./../ast/ast");
const $puck_4 = require("./../ast/span");
const visit = require("./../ast/visit");
const $puck_5 = require("./../compiler/ast");
const $puck_6 = require("./src/functions");
const $puck_7 = require("./src/range");
const $puck_8 = require("./src/scope");
const $puck_9 = require("./src/structure_visitor");
const $puck_10 = require("./src/types");
const $puck_11 = require("./../entities");
function implementTrait(traitType, trait_, type_, implementable, i, reportError, id) {
  const traitName = $puck_11.Type.displayName.call(traitType);
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementable.implementations, $isTraitObject: true}, function (imp) {
    return $puck_10.isSameType(imp.trait_, traitType);
  })) {
    reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplDeclaration', value: i, $isTraitObject: true}, "" + traitName + " has already been implemented for " + $puck_11.Type.displayName.call(type_));
  };
  const functions = $puck_1.ObjectMap.fromIter($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true}, function (functionDeclaration) {
    return [
      $puck_1.Option.unwrap.call(functionDeclaration.type_.name),
      functionDeclaration.type_,
    ];
  }));
  const traitFunctions = trait_.functions;
  $puck_1.ObjectMap.forEach.call(traitFunctions, function ([name, traitFunctionType]) {
    const traitFunction = $puck_11.Type.getFunction.call(traitFunctionType);
    if ((traitFunction.isAbstract && !$puck_1.ObjectMap.has.call(functions, name))) {
      return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplDeclaration', value: i, $isTraitObject: true}, "Function " + traitName + "::" + name + " is not implemented for " + $puck_11.Type.displayName.call(type_));
    };
  });
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true}, function (functionDeclaration) {
    const functionName = $puck_11.Type.displayName.call(functionDeclaration.type_);
    const _function = $puck_11.Type.getFunction.call(functionDeclaration.type_);
    let $puck_12 = $puck_1.ObjectMap.get.call(traitFunctions, $puck_1.Option.unwrap.call(functionDeclaration.type_.name));
    if (($puck_12.kind === "Some")) {
      let {value: [traitFunctionType]} = $puck_12;
      const traitFunctionName = $puck_11.Type.displayName.call(traitFunctionType);
      const traitFunction = $puck_11.Type.getFunction.call(traitFunctionType);
      let $puck_13 = [
        _function.selfBinding,
        traitFunction.selfBinding,
      ];
      if (($unwrapTraitObject($unwrapTraitObject($puck_13)[0]).kind === "Some" && $unwrapTraitObject($unwrapTraitObject($puck_13)[1]).kind === "Some")) {
        let [{value: [implSelf]}, {value: [traitSelf]}] = $unwrapTraitObject($puck_13);
        if ((implSelf.mutable && !traitSelf.mutable)) {
          return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: functionDeclaration, $isTraitObject: true}, "Function " + traitName + "::" + traitFunctionName + " requires an immutable self parameter");
        };
      }
      else {
        if (($unwrapTraitObject($unwrapTraitObject($puck_13)[0]).kind === "None" && $unwrapTraitObject($unwrapTraitObject($puck_13)[1]).kind === "Some")) {
          let [, {value: [$puck_14]}] = $unwrapTraitObject($puck_13);
          return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: functionDeclaration, $isTraitObject: true}, "Function " + traitName + "::" + traitFunctionName + " requires a self parameter");
        }
        else {
          if ($unwrapTraitObject($unwrapTraitObject($puck_13)[1]).kind === "None") {
            let [$puck_15, ] = $unwrapTraitObject($puck_13);
            return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: functionDeclaration, $isTraitObject: true}, "Static trait functions can not be implemented");
          };
        };
      };
    }
    else {
      return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: functionDeclaration, $isTraitObject: true}, "Function " + functionName + " is not defined by " + traitName + "");
    };
  });
  let $puck_16 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true}, function (p) {
    return p.type_;
  })
;
  const implementation = $puck_11.Implementation({
    id: id,
    type_: type_,
    trait_: traitType,
    typeParameters: $puck_1.Iterable[$puck_16.type].toList.call($puck_16),
    functions: functions,
  });
  i.implementation = implementation;
  $puck_1.List.push.call(implementable.implementations, implementation);
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true}, function (functionDeclaration) {
    const functionName = $puck_11.Type.displayName.call(functionDeclaration.type_);
    let $puck_17 = $puck_1.ObjectMap.get.call(traitFunctions, $puck_1.Option.unwrap.call(functionDeclaration.type_.name));
    if ($puck_17.kind === "Some") {
      let {value: [traitFunctionType]} = $puck_17;
      const traitFunction = $puck_11.Type.getFunction.call(traitFunctionType);
      const _function = $puck_11.Type.getFunction.call(functionDeclaration.type_);
      functionDeclaration.traitFunctionType = traitFunctionType;
      let $puck_18 = $puck_6.checkFunctionAssignability(functionName, traitFunction, _function);
      if ($puck_18.kind === "Err") {
        let {value: [error]} = $puck_18;
        return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: functionDeclaration, $isTraitObject: true}, error);
      };
    };
  });
};
function implementShorthand(type_, implementable, i, reportError) {
  const typeName = $puck_11.Type.displayName.call(type_);
  if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementable.implementations, $isTraitObject: true}, function (imp) {
    return $puck_11.Type.getTrait.call(imp.trait_).isShorthand;
  })) {
    reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplShorthandDeclaration', value: i, $isTraitObject: true}, "" + typeName + " has already been implemented");
  };
  const functions = $puck_1.ObjectMap.fromIter($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true}, function (functionDeclaration) {
    return [
      $puck_1.Option.unwrap.call(functionDeclaration.type_.name),
      functionDeclaration.type_,
    ];
  }));
  let $puck_19 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true}, function (p) {
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
    kind: $puck_11.TypeKind.Trait({
    isShorthand: true,
    functions: functions,
  }),
    _class: $puck_1.None,
    instance: $puck_1.None,
    providesType: $puck_1.None,
    enumMember: $puck_1.None,
  },
    typeParameters: $puck_1.Iterable[$puck_19.type].toList.call($puck_19),
    functions: functions,
  });
};
function ImplVisitor(context, file) {
  let importDirective;
  const reportError = $unwrapTraitObject($unwrapTraitObject(context).reportError).bind(context, file);
  const reportFullError = $unwrapTraitObject($unwrapTraitObject(context).reportError).bind(context, file);
  function getImplId(type_, trait_) {
    let id = "$impl_" + $puck_1.Option.unwrap.call(type_.id) + "$" + $puck_1.Option.unwrap.call(trait_.id);
    if ($unwrapTraitObject($unwrapTraitObject(context).impls)[$unwrapTraitObject(id)]) {
      id = "" + id + "$" + $unwrapTraitObject($unwrapTraitObject(context).impls)[$unwrapTraitObject(id)];
      $unwrapTraitObject($unwrapTraitObject(context).impls)[$unwrapTraitObject(id)] += 1;
    }
    else {
      $unwrapTraitObject($unwrapTraitObject(context).impls)[$unwrapTraitObject(id)] = 1;
    };
    return id;
  };
  return $puck_2._Object.assign({}, visit.emptyVisitor, $puck_9.structureVisitor(file, reportError, reportFullError, "ImplVisitor"), {
    visitModule: function (m) {
    let self = this;
    $unwrapTraitObject(self).scope = m.scope;
    let $puck_20 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: m.statements, $isTraitObject: true}, function (e) {
      let $puck_21 = e;
      if (($unwrapTraitObject($puck_21).kind === "ImplDeclaration")) {
        let {value: [$puck_22]} = $unwrapTraitObject($puck_21);
        return true;
      }
      else {
        if ($unwrapTraitObject($puck_21).kind === "ImplShorthandDeclaration") {
          let {value: [$puck_23]} = $unwrapTraitObject($puck_21);
          return true;
        }
        else {
          if (true) {
            let $puck_24 = $puck_21;
            return false;
          };
        };
      };
    })
;
    return $puck_1.Iterable[$puck_20.type].forEach.call($puck_20, function (s) {
      return $unwrapTraitObject(self).visitTopLevelStatement(s);
    });
  },
    visitImplDeclaration: function (i) {
    let self = this;
    const parentScope = $unwrapTraitObject(self).scope;
    let scope = $puck_8.Scope.createChild.call(parentScope);
    $unwrapTraitObject(self).scope = scope;
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true}, $unwrapTraitObject($unwrapTraitObject(self).visitTypeParameter).bind(self));
    $unwrapTraitObject(self).visitNamedTypeBound(i.trait_);
    $unwrapTraitObject(self).visitNamedTypeBound(i.type_);
    const traitType = $puck_3.NamedTypeBound.getType.call(i.trait_);
    let structType = $puck_3.NamedTypeBound.getType.call(i.type_);
    $puck_8.Scope.setSelfType.call(scope, structType);
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true}, function (m) {
      return $unwrapTraitObject(self).visitMethodDeclaration(m, structType);
    });
    const id = getImplId(traitType, structType);
    let $puck_25 = traitType.kind;
    if ($puck_25.kind === "Trait") {
      let {value: [trait_]} = $puck_25;
      let $puck_26 = structType.kind;
      if ($unwrapTraitObject($puck_26).kind === "Enum") {
        let {value: [enum_]} = $unwrapTraitObject($puck_26);
        let e = enum_;
        implementTrait(traitType, trait_, structType, e, i, reportError, id);
      }
      else {
        if ($unwrapTraitObject($puck_26).kind === "Struct") {
          let {value: [struct]} = $unwrapTraitObject($puck_26);
          let s = struct;
          implementTrait(traitType, trait_, structType, s, i, reportError, id);
        }
        else {
          if (true) {
            let $puck_27 = $puck_26;
            reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: i.type_, $isTraitObject: true}, $puck_11.Type.displayName.call(structType) + " is not a struct or an enum");
          };
        };
      };
    }
    else {
      reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: i.trait_, $isTraitObject: true}, $puck_11.Type.displayName.call(traitType) + " is not a trait");
    };
    return $unwrapTraitObject(self).scope = parentScope;
  },
    visitImplShorthandDeclaration: function (i) {
    let self = this;
    const parentScope = $unwrapTraitObject(self).scope;
    let scope = $puck_8.Scope.createChild.call(parentScope);
    $unwrapTraitObject(self).scope = scope;
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true}, $unwrapTraitObject($unwrapTraitObject(self).visitTypeParameter).bind(self));
    $unwrapTraitObject(self).visitNamedTypeBound(i.type_);
    let structType = $puck_3.NamedTypeBound.getType.call(i.type_);
    $puck_8.Scope.setSelfType.call(scope, structType);
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true}, function (m) {
      return $unwrapTraitObject(self).visitMethodDeclaration(m, structType);
    });
    let $puck_28 = structType.kind;
    if (($unwrapTraitObject($puck_28).kind === "Enum")) {
      let {value: [enum_]} = $unwrapTraitObject($puck_28);
      let e = enum_;
      implementShorthand(structType, e, i, reportError);
    }
    else {
      if ($unwrapTraitObject($puck_28).kind === "Struct") {
        let {value: [struct]} = $unwrapTraitObject($puck_28);
        let s = struct;
        implementShorthand(structType, s, i, reportError);
      }
      else {
        if (true) {
          let $puck_29 = $puck_28;
          reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: i.type_, $isTraitObject: true}, $puck_11.Type.displayName.call(structType) + " is not a struct or an enum");
        };
      };
    };
    return $unwrapTraitObject(self).scope = parentScope;
  },
  });
};
exports.ImplVisitor = ImplVisitor
