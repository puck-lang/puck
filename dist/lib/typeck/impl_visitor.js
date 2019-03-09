'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.ImplVisitor = exports.checkDefferedImpls = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("./../ast/ast");
const $puck_3 = require("./../ast/span");
const $puck_4 = require("./../compiler");
const $puck_5 = require("./../ast/empty_visitor");
const visit = require("./../ast/empty_visitor");
const $puck_6 = require("./../compiler/ast");
const $puck_7 = require("./src/functions");
const $puck_8 = require("./src/range");
const $puck_9 = require("./src/scope");
const $puck_10 = require("./src/structure_visitor");
const $puck_11 = require("./src/types");
const $puck_12 = require("./../entities");
var ImplVisitor = exports.ImplVisitor = (object) => object;
$puck_5.EmptyVisitor["$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/impl_visitor.puck:ImplVisitor"] = {
visitModule: function (m) {
  let self = this;
  self.value.scope = $unwrapTraitObject(m.scope);
  let $puck_13 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: m.statements, $isTraitObject: true}, function (e) {
    let $puck_14 = e;
    if ($puck_14.kind === "ImplDeclaration") {
      $puck_14;
      return true;
    }
    else {
      if ($puck_14.kind === "ImplShorthandDeclaration") {
        $puck_14;
        return true;
      }
      else {
        if (true) {
          $puck_14;
          return false;
        };
      };
    };
  })
;
  $puck_1.Iterable[$puck_13.type].forEach.call($puck_13, function (s) {
    return $puck_5.EmptyVisitor["$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/impl_visitor.puck:ImplVisitor"].visitTopLevelStatement.call(self, s);
  });
},
visitTopLevelStatement: $puck_5.EmptyVisitor.visitTopLevelStatement,
visitBlockLevelStatement: $puck_5.EmptyVisitor.visitBlockLevelStatement,
visitExpression: $puck_5.EmptyVisitor.visitExpression,
visitEnumDeclaration: $puck_5.EmptyVisitor.visitEnumDeclaration,
visitEnumMember: $puck_5.EmptyVisitor.visitEnumMember,
visitImplDeclaration: function (i) {
  let self = this;
  const parentScope = self.value.scope;
  let scope = $puck_9.Scope.createChild.call(parentScope);
  self.value.scope = scope;
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true}, function (p) {
    return $puck_5.EmptyVisitor["$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/impl_visitor.puck:ImplVisitor"].visitTypeParameter.call(self, p);
  });
  $puck_5.EmptyVisitor["$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/impl_visitor.puck:ImplVisitor"].visitNamedTypeBound.call(self, asMut(i).trait_);
  $puck_5.EmptyVisitor["$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/impl_visitor.puck:ImplVisitor"].visitNamedTypeBound.call(self, asMut(i).type_);
  const traitType = $puck_2.NamedTypeBound.getType.call(i.trait_);
  let structType = $puck_2.NamedTypeBound.getType.call(i.type_);
  $puck_9.Scope.setSelfType.call(scope, structType);
  let $puck_15 = i.whereClause;
  if ($puck_15 !== undefined) {
    let whereClause = $puck_15;
    $puck_5.EmptyVisitor["$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/impl_visitor.puck:ImplVisitor"].visitWhereClause.call(self, whereClause);
  };
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true}, function (m) {
    return $puck_10.visitMethodDeclaration(self.value.typeBoundVisitor, m, structType);
  });
  const id = ImplVisitor.getImplId.call(self.value, traitType, structType);
  let $puck_16 = traitType.kind;
  if ($puck_16.kind === "Trait") {
    let {value: trait_} = $puck_16;
    function implement() {
      let $puck_17 = structType.kind;
      if ($puck_17.kind === "Enum") {
        let {value: enum_} = $puck_17;
        implementTrait(traitType, trait_, structType, enum_, asMut(i), function (token, message) {
          return ImplVisitor.reportError.call(self.value, token, $puck_12.CompilationError.Other(message));
        }, id);
      }
      else {
        if ($puck_17.kind === "Struct") {
          let {value: struct} = $puck_17;
          implementTrait(traitType, trait_, structType, struct, asMut(i), function (token, message) {
            return ImplVisitor.reportError.call(self.value, token, $puck_12.CompilationError.Other(message));
          }, id);
        }
        else {
          if (true) {
            $puck_17;
            ImplVisitor.reportError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: i.type_, $isTraitObject: true}, $puck_12.CompilationError.Other($puck_12.Type.displayName.call(structType) + " is not a struct or an enum"));
          };
        };
      };
      let $puck_19 = $puck_1.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: $puck_12.Type.getTrait.call(traitType).requiredTraits, $isTraitObject: true})
;
      let $puck_18 = $puck_1.Iterator[$puck_19.type].filterMap.call($puck_19, function (trait_) {
        let $puck_20 = $puck_9.Scope.getBindingByTypeId.call(scope, $puck_1.Option.unwrap.call(trait_.id), "ImplVisitor");
        if (($puck_20 !== undefined)) {
          let binding = $puck_20;
          return $puck_1.Some([
            $puck_1.Option.unwrap.call(trait_.id),
            {
            name: binding.name,
            binding: binding,
          },
          ]);
        }
        else {
          const typeName = $puck_1.Option.unwrap.call(trait_.name);
          ImplVisitor.reportError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplDeclaration', value: i, $isTraitObject: true}, $puck_12.CompilationError.TraitNotInScope({
            traitName: typeName,
            id: $puck_1.Option.unwrap.call(trait_.id),
          }));
          return $puck_1.None;
        };
      })
;
      return i.extendedTraits = $puck_1.ObjectMap.fromIter({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.Iterator[$puck_18.type].collect.call($puck_18), $isTraitObject: true});
    };
    if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isNotEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: trait_.requiredTraits, $isTraitObject: true})) {
      $puck_4.CompilerContext.deferAfterImpl.call(self.value.context, structType, trait_.requiredTraits, implement);
    }
    else {
      implement();
    };
  }
  else {
    ImplVisitor.reportError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: i.trait_, $isTraitObject: true}, $puck_12.CompilationError.Other($puck_12.Type.displayName.call(traitType) + " is not a trait"));
  };
  self.value.scope = parentScope;
},
visitImplShorthandDeclaration: function (i) {
  let self = this;
  const parentScope = self.value.scope;
  let scope = $puck_9.Scope.createChild.call(parentScope);
  self.value.scope = scope;
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true}, function (p) {
    return $puck_5.EmptyVisitor["$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/impl_visitor.puck:ImplVisitor"].visitTypeParameter.call(self, p);
  });
  $puck_5.EmptyVisitor["$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/impl_visitor.puck:ImplVisitor"].visitNamedTypeBound.call(self, asMut(i).type_);
  let structType = $puck_2.NamedTypeBound.getType.call(i.type_);
  $puck_9.Scope.setSelfType.call(scope, structType);
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true}, function (m) {
    return $puck_10.visitMethodDeclaration(self.value.typeBoundVisitor, m, structType);
  });
  let $puck_21 = structType.kind;
  if (($puck_21.kind === "Enum")) {
    let {value: enum_} = $puck_21;
    implementShorthand(structType, enum_, asMut(i), function (token, message) {
      return ImplVisitor.reportError.call(self.value, token, $puck_12.CompilationError.Other(message));
    });
  }
  else {
    if ($puck_21.kind === "Struct") {
      let {value: struct} = $puck_21;
      implementShorthand(structType, struct, asMut(i), function (token, message) {
        return ImplVisitor.reportError.call(self.value, token, $puck_12.CompilationError.Other(message));
      });
    }
    else {
      if (true) {
        $puck_21;
        ImplVisitor.reportError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: i.type_, $isTraitObject: true}, $puck_12.CompilationError.Other($puck_12.Type.displayName.call(structType) + " is not a struct or an enum"));
      };
    };
  };
  self.value.scope = parentScope;
},
visitMethodDeclaration: $puck_5.EmptyVisitor.visitMethodDeclaration,
visitTraitDeclaration: $puck_5.EmptyVisitor.visitTraitDeclaration,
visitTypeDeclaration: $puck_5.EmptyVisitor.visitTypeDeclaration,
visitExportDirective: $puck_5.EmptyVisitor.visitExportDirective,
visitImportDirective: $puck_5.EmptyVisitor.visitImportDirective,
visitObjectDestructure: $puck_5.EmptyVisitor.visitObjectDestructure,
visitObjectDestructureMember: $puck_5.EmptyVisitor.visitObjectDestructureMember,
visitBlock: $puck_5.EmptyVisitor.visitBlock,
visitBreakStatement: $puck_5.EmptyVisitor.visitBreakStatement,
visitReturnStatement: $puck_5.EmptyVisitor.visitReturnStatement,
visitForLoop: $puck_5.EmptyVisitor.visitForLoop,
visitWhileLoop: $puck_5.EmptyVisitor.visitWhileLoop,
visitIdentifier: $puck_5.EmptyVisitor.visitIdentifier,
visitFunctionDeclaration: $puck_5.EmptyVisitor.visitFunctionDeclaration,
visitVariableDeclaration: $puck_5.EmptyVisitor.visitVariableDeclaration,
visitAssignmentExpression: $puck_5.EmptyVisitor.visitAssignmentExpression,
visitBinaryExpression: $puck_5.EmptyVisitor.visitBinaryExpression,
visitCallExpression: $puck_5.EmptyVisitor.visitCallExpression,
visitIfExpression: $puck_5.EmptyVisitor.visitIfExpression,
visitIfLetExpression: $puck_5.EmptyVisitor.visitIfLetExpression,
visitMatchExpression: $puck_5.EmptyVisitor.visitMatchExpression,
visitMatchArm: $puck_5.EmptyVisitor.visitMatchArm,
visitTypePath: function (t) {
  let self = this;
  $puck_5.EmptyVisitor["$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/src/structure_visitor.puck:TypeBoundVisitor"].visitTypePath.call({type: '$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/src/structure_visitor.puck:TypeBoundVisitor', value: self.value.typeBoundVisitor, $isTraitObject: true}, t);
},
visitTypePathExpression: $puck_5.EmptyVisitor.visitTypePathExpression,
visitUnaryExpression: $puck_5.EmptyVisitor.visitUnaryExpression,
visitIndexAccess: $puck_5.EmptyVisitor.visitIndexAccess,
visitMemberAccess: $puck_5.EmptyVisitor.visitMemberAccess,
visitTupleIndexAccess: $puck_5.EmptyVisitor.visitTupleIndexAccess,
visitUnknownAccess: $puck_5.EmptyVisitor.visitUnknownAccess,
visitUnknownIndexAccess: $puck_5.EmptyVisitor.visitUnknownIndexAccess,
visitListLiteral: $puck_5.EmptyVisitor.visitListLiteral,
visitBooleanLiteral: $puck_5.EmptyVisitor.visitBooleanLiteral,
visitNumberLiteral: $puck_5.EmptyVisitor.visitNumberLiteral,
visitRangeLiteral: $puck_5.EmptyVisitor.visitRangeLiteral,
visitRecordLiteral: $puck_5.EmptyVisitor.visitRecordLiteral,
visitRecordLiteralMember: $puck_5.EmptyVisitor.visitRecordLiteralMember,
visitStringLiteral: $puck_5.EmptyVisitor.visitStringLiteral,
visitStringLiteralPart: $puck_5.EmptyVisitor.visitStringLiteralPart,
visitTupleLiteral: $puck_5.EmptyVisitor.visitTupleLiteral,
visitPattern: $puck_5.EmptyVisitor.visitPattern,
visitIdentifierPattern: $puck_5.EmptyVisitor.visitIdentifierPattern,
visitRecordPattern: $puck_5.EmptyVisitor.visitRecordPattern,
visitTuplePattern: $puck_5.EmptyVisitor.visitTuplePattern,
visitTypeBound: $puck_5.EmptyVisitor.visitTypeBound,
visitFunctionTypeBound: function (t) {
  let self = this;
  $puck_5.EmptyVisitor["$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/src/structure_visitor.puck:TypeBoundVisitor"].visitFunctionTypeBound.call({type: '$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/src/structure_visitor.puck:TypeBoundVisitor', value: self.value.typeBoundVisitor, $isTraitObject: true}, t);
},
visitIntersectionTypeBound: function (t) {
  let self = this;
  $puck_5.EmptyVisitor["$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/src/structure_visitor.puck:TypeBoundVisitor"].visitIntersectionTypeBound.call({type: '$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/src/structure_visitor.puck:TypeBoundVisitor', value: self.value.typeBoundVisitor, $isTraitObject: true}, t);
},
visitNamedTypeBound: function (t) {
  let self = this;
  $puck_5.EmptyVisitor["$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/src/structure_visitor.puck:TypeBoundVisitor"].visitNamedTypeBound.call({type: '$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/src/structure_visitor.puck:TypeBoundVisitor', value: self.value.typeBoundVisitor, $isTraitObject: true}, t);
},
visitRecordTypeBound: function (t) {
  let self = this;
  $puck_5.EmptyVisitor["$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/src/structure_visitor.puck:TypeBoundVisitor"].visitRecordTypeBound.call({type: '$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/src/structure_visitor.puck:TypeBoundVisitor', value: self.value.typeBoundVisitor, $isTraitObject: true}, t);
},
visitRecordTypeBoundMember: $puck_5.EmptyVisitor.visitRecordTypeBoundMember,
visitTupleTypeBound: function (t) {
  let self = this;
  $puck_5.EmptyVisitor["$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/src/structure_visitor.puck:TypeBoundVisitor"].visitTupleTypeBound.call({type: '$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/src/structure_visitor.puck:TypeBoundVisitor', value: self.value.typeBoundVisitor, $isTraitObject: true}, t);
},
visitTypeParameter: function (t) {
  let self = this;
  $puck_5.EmptyVisitor["$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/src/structure_visitor.puck:TypeBoundVisitor"].visitTypeParameter.call({type: '$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/src/structure_visitor.puck:TypeBoundVisitor', value: self.value.typeBoundVisitor, $isTraitObject: true}, t);
},
visitTypeParameterBound: $puck_5.EmptyVisitor.visitTypeParameterBound,
visitWhereClause: $puck_5.EmptyVisitor.visitWhereClause
};
ImplVisitor._new = function (context, file) {
  let implVisitor = {
    context: context,
    file: file,
    scope: $puck_9.Scope._new(context),
    assignedTo: $puck_1.None,
    typeBoundVisitor: {
    getScope: function () {
    return $unwrapTraitObject(implVisitor).scope;
  },
    setScope: function (scope) {
    return $unwrapTraitObject(implVisitor).scope = scope;
  },
    file: file,
    reportError: function (token, error) {
    return $puck_4.CompilerContext.reportError.call(context, file, token, error);
  },
    visitorName: "ImplVisitor",
  },
  };
  return implVisitor;
};
ImplVisitor.getImplId = function (type_, trait_) {
  let self = this;
  let id = "$impl_" + $puck_1.Option.unwrap.call(type_.id) + "$" + $puck_1.Option.unwrap.call(trait_.id);
  let $puck_22 = $puck_1.Map.get.call(self.context.impls, id);
  if (($puck_22 !== undefined)) {
    let count = $puck_22;
    $puck_1.Map.set.call(self.context.impls, id, count + 1);
    id = "" + id + "$" + count + "";
  }
  else {
    $puck_1.Map.set.call(self.context.impls, id, 1);
  };
  return id;
};
ImplVisitor.reportError = function (token, error) {
  const self = this;
  $puck_4.CompilerContext.reportError.call(self.context, self.file, token, error);
};
function asMut(i) {
  return i;
};
function checkDefferedImpls(deferredImpl) {
  let $puck_23 = $puck_1.IntoIterator["$impl_IntoIterator$lib/stdlib/core.puck:JsIterator"].iter.call({type: '$impl_IntoIterator$lib/stdlib/core.puck:JsIterator', value: $puck_1.Map.entries.call(deferredImpl), $isTraitObject: true});
  let $puck_24 = true;
  while ($puck_24) {
    let $puck_26 = $puck_1.Iterator[$puck_23.type].next.call($puck_23);
    if (($puck_26 !== undefined)) {
      let [type_, awaiters] = $puck_26;
      let $puck_27 = type_.kind;
      let $puck_28;
      if ($puck_27.kind === "Enum") {
        let {value: enum_} = $puck_27;
        $puck_28 = enum_.implementations;
      }
      else {
        let $puck_29;
        if ($puck_27.kind === "Struct") {
          let {value: struct} = $puck_27;
          $puck_29 = struct.implementations;
        }
        else {
          let $puck_30;
          if (true) {
            $puck_27;
            $puck_30 = $puck_1.panic("Type " + $puck_12.Type.displayName.call(type_) + "is not implementable");
          };
          $puck_29 = $puck_30;
        };
        $puck_28 = $puck_29;
      };
      const implementations = $puck_28;
      if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isNotEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementations, $isTraitObject: true})) {
        let finished = $puck_1.Set._new();
        let $puck_32 = $puck_1.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: awaiters, $isTraitObject: true})
;
        let $puck_31 = $puck_1.Iterator[$puck_32.type].enumerate.call($puck_32)
;
        $puck_1.Iterator[$puck_31.type].forEach.call($puck_31, function ([i, [requiredTraits, callback]]) {
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
      $puck_24 = false;
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
    let $puck_33 = $puck_1.ObjectMap.get.call(traitFunctions, $puck_1.Option.unwrap.call(functionDeclaration.type_.name));
    if (($puck_33 !== undefined)) {
      let traitFunctionType = $puck_33;
      const traitFunctionName = $puck_12.Type.displayName.call(traitFunctionType);
      const traitFunction = $puck_12.Type.getFunction.call(traitFunctionType);
      let $puck_34 = [
        _function.selfBinding,
        traitFunction.selfBinding,
      ];
      if (($puck_34[0] !== undefined && $puck_34[1] !== undefined)) {
        let [implSelf, traitSelf] = $puck_34;
        if ((implSelf.mutable && !traitSelf.mutable)) {
          return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: functionDeclaration, $isTraitObject: true}, "Function " + traitName + "::" + traitFunctionName + " requires an immutable self parameter");
        };
      }
      else {
        if (($puck_34[0] === undefined && $puck_34[1] !== undefined)) {
          let [, ] = $puck_34;
          return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: functionDeclaration, $isTraitObject: true}, "Function " + traitName + "::" + traitFunctionName + " requires a self parameter");
        }
        else {
          if ($puck_34[1] === undefined) {
            let [, ] = $puck_34;
            return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: functionDeclaration, $isTraitObject: true}, "Static trait functions can not be implemented");
          };
        };
      };
    }
    else {
      return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: functionDeclaration, $isTraitObject: true}, "Function " + functionName + " is not defined by " + traitName + "");
    };
  });
  let $puck_35 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true}, function (p) {
    return p.type_;
  })
;
  const implementation = $puck_12.Implementation({
    id: id,
    type_: type_,
    trait_: traitType,
    typeParameters: $puck_1.Iterable[$puck_35.type].toList.call($puck_35),
    typeParameterBounds: $puck_1.Option.map.call(i.whereClause, function (w) {
    return $puck_1.Map.fromIter($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: w.bounds, $isTraitObject: true}, function (b) {
      return [
        $puck_2.TypeBound.getType.call(b.subType),
        $puck_2.TypeBound.getType.call(b.superType),
      ];
    }));
  }),
    functions: functions,
  });
  i.implementation = implementation;
  $puck_1.List.push.call(implementable.implementations, implementation);
  let $puck_36 = traitType.instance;
  let $puck_37;
  if ($puck_36 !== undefined) {
    let traitInstance = $puck_36;
    $puck_37 = $puck_11.resolveTypeParameters(traitInstance.parameterMap);
  }
  else {
    $puck_37 = function (t) {
      return t;
    };
  };
  const resolve = $puck_37;
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true}, function (functionDeclaration) {
    const functionName = $puck_12.Type.displayName.call(functionDeclaration.type_);
    let $puck_38 = $puck_1.ObjectMap.get.call(traitFunctions, $puck_1.Option.unwrap.call(functionDeclaration.type_.name));
    if ($puck_38 !== undefined) {
      let traitFunctionType = $puck_38;
      const traitFunction = $puck_12.Type.getFunction.call(resolve(traitFunctionType));
      const _function = $puck_12.Type.getFunction.call(functionDeclaration.type_);
      functionDeclaration.traitFunctionType = traitFunctionType;
      let $puck_39 = $puck_7.checkFunctionAssignability(functionName, traitFunction, _function);
      if ($puck_39.kind === "Err") {
        let {value: error} = $puck_39;
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
  let $puck_40 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true}, function (p) {
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
    typeParameters: $puck_1.Iterable[$puck_40.type].toList.call($puck_40),
    typeParameterBounds: $puck_1.None,
    functions: functions,
  });
}
