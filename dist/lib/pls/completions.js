'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.Completion = exports.CompletionVisitorundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("vscode-languageserver");
const $puck_3 = require("./../ast/ast");
const $puck_4 = require("./../ast/span");
const $puck_5 = require("./../typeck/src/scope");
const $puck_6 = require("./../entities");
const $puck_7 = require("./position_visitor");
const visit = require("./position_visitor");
var Completion = exports.Completion = (object) => object;
var CompletionVisitor = exports.CompletionVisitor = (object) => object;
$puck_7.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/completions.puck:CompletionVisitor"] = {
position: function () {
  const self = this;
  return self.value.position;
},
visitModule: $puck_7.PositionVisitor.visitModule,
visitTopLevelStatement: $puck_7.PositionVisitor.visitTopLevelStatement,
visitBlockLevelStatement: $puck_7.PositionVisitor.visitBlockLevelStatement,
visitExpression: $puck_7.PositionVisitor.visitExpression,
visitEnumDeclaration: $puck_7.PositionVisitor.visitEnumDeclaration,
visitEnumMember: $puck_7.PositionVisitor.visitEnumMember,
visitImplDeclaration: function (i) {
  let self = this;
  $puck_1.print("CompletionVisitor visitImplDeclaration");
  const trait_ = $puck_3.NamedTypeBound.getType.call(i.trait_);
  if (trait_) {
    let $puck_8 = trait_.kind;
    if ($unwrapTraitObject($puck_8).kind == "Trait") {
      let {value: [trait_]} = $unwrapTraitObject($puck_8);
      self.value.inTraitImpl = $puck_1.Some(trait_);
    }
    else {
      if (true) {
        let $puck_9 = $puck_8;
      };
    };
  };
  if ((!visit.walkImplDeclaration(self, i))) {
    $puck_1.print("CompletionVisitor not visit.walkImplDeclara");
    self.value.completions = $puck_1.Option.map.call(self.value.inTraitImpl, getTraitImplCompletions);
  };
},
visitImplShorthandDeclaration: $puck_7.PositionVisitor.visitImplShorthandDeclaration,
visitMethodDeclaration: function (f) {
  let self = this;
  let $puck_11 = f.name;
  if ($puck_11.kind == "Some") {
    let {value: [name]} = $puck_11;
    if ($puck_4.Span.cmp.call(name.span, self.value.position) == $puck_1.Ordering.Equal) {
      self.value.completions = $puck_1.Option.map.call(self.value.inTraitImpl, getTraitImplCompletions);
      return [];
    };
  };
  self.value.inTraitImpl = $puck_1.None;
  visit.walkFunctionDeclaration(self, f);
},
visitTraitDeclaration: $puck_7.PositionVisitor.visitTraitDeclaration,
visitTypeDeclaration: $puck_7.PositionVisitor.visitTypeDeclaration,
visitExportDirective: $puck_7.PositionVisitor.visitExportDirective,
visitImportDirective: function (i) {
  let self = this;
  self.value.importedModule = i._module;
  visit.walkImportDirective(self, i);
},
visitObjectDestructure: function (o) {
  let self = this;
  if (!visit.walkObjectDestructure(self, o)) {
    $puck_1.print("CompletionVisitor visitObjectDestructure");
    self.value.completions = $puck_1.Option.map.call(self.value.importedModule, getImportCompletions);
  };
},
visitObjectDestructureMember: function (m) {
  let self = this;
  if ($puck_4.Span.cmp.call($puck_4.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: m.property, $isTraitObject: true}), $puck_7.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/completions.puck:CompletionVisitor"].position.call(self)) == $puck_1.Ordering.Equal) {
    $puck_1.print("CompletionVisitor visitObjectDestructureMember");
    self.value.completions = $puck_1.Option.map.call(self.value.importedModule, getImportCompletions);
  };
},
visitBlock: function (b) {
  let self = this;
  if ((!visit.walkBlock(self, b))) {
    $puck_1.print("CompletionVisitor visitBlock");
    self.value.completions = $puck_1.Some(getScopeCompletions(b));
  };
},
visitBreakStatement: $puck_7.PositionVisitor.visitBreakStatement,
visitReturnStatement: $puck_7.PositionVisitor.visitReturnStatement,
visitWhileLoop: $puck_7.PositionVisitor.visitWhileLoop,
visitIdentifier: function (i) {
  let self = this;
  $puck_1.print("CompletionVisitor visitIdentifier");
  self.value.completions = $puck_1.Some(getScopeCompletions(i));
},
visitFunctionDeclaration: function (f) {
  let self = this;
  let $puck_10 = f.name;
  if ($puck_10.kind == "Some") {
    let {value: [name]} = $puck_10;
    if ($puck_4.Span.cmp.call(name.span, self.value.position) == $puck_1.Ordering.Equal) {
      return [];
    };
  };
  visit.walkFunctionDeclaration(self, f);
},
visitVariableDeclaration: $puck_7.PositionVisitor.visitVariableDeclaration,
visitAssignmentExpression: $puck_7.PositionVisitor.visitAssignmentExpression,
visitBinaryExpression: $puck_7.PositionVisitor.visitBinaryExpression,
visitCallExpression: $puck_7.PositionVisitor.visitCallExpression,
visitIfExpression: $puck_7.PositionVisitor.visitIfExpression,
visitIfLetExpression: $puck_7.PositionVisitor.visitIfLetExpression,
visitMatchExpression: $puck_7.PositionVisitor.visitMatchExpression,
visitMatchArm: $puck_7.PositionVisitor.visitMatchArm,
visitTypePath: $puck_7.PositionVisitor.visitTypePath,
visitTypePathExpression: $puck_7.PositionVisitor.visitTypePathExpression,
visitUnaryExpression: $puck_7.PositionVisitor.visitUnaryExpression,
visitIndexAccess: $puck_7.PositionVisitor.visitIndexAccess,
visitMemberAccess: function (a) {
  let self = this;
  if ($puck_4.Span.cmp.call($puck_4.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: a.object, $isTraitObject: true}), $puck_7.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/completions.puck:CompletionVisitor"].position.call(self)) == $puck_1.Ordering.Less) {
    $puck_1.print("CompletionVisitor visitMemberAccess");
    const type_ = $puck_3.Expression.getType.call(a.object);
    if (type_) {
      let $puck_12 = type_.kind;
      if (($unwrapTraitObject($puck_12).kind == "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_12).value)[0]).kind).kind == "Record")) {
        let {value: [{kind: {value: [record]}}]} = $unwrapTraitObject($puck_12);
        let $puck_13 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.ObjectMap.toList.call(record.properties), $isTraitObject: true}, function ([property, type_]) {
          const typeName = $puck_6.Type.displayName.call(type_);
          return {
            label: "" + property + ": " + typeName + "",
            kind: $unwrapTraitObject($puck_2.CompletionItemKind).Text,
            insertText: property,
          };
        })
;
        self.value.completions = $puck_1.Some($puck_1.Iterable[$puck_13.type].toList.call($puck_13));
      }
      else {
        if (true) {
          let $puck_14 = $puck_12;
        };
      };
    };
  }
  else {
    visit.walkMemberAccess(self, a);
  };
},
visitUnknownAccess: $puck_7.PositionVisitor.visitUnknownAccess,
visitUnknownIndexAccess: $puck_7.PositionVisitor.visitUnknownIndexAccess,
visitListLiteral: $puck_7.PositionVisitor.visitListLiteral,
visitBooleanLiteral: $puck_7.PositionVisitor.visitBooleanLiteral,
visitNumberLiteral: $puck_7.PositionVisitor.visitNumberLiteral,
visitRecordLiteral: $puck_7.PositionVisitor.visitRecordLiteral,
visitRecordLiteralMember: $puck_7.PositionVisitor.visitRecordLiteralMember,
visitStringLiteral: $puck_7.PositionVisitor.visitStringLiteral,
visitStringLiteralPart: $puck_7.PositionVisitor.visitStringLiteralPart,
visitTupleLiteral: $puck_7.PositionVisitor.visitTupleLiteral,
visitPattern: $puck_7.PositionVisitor.visitPattern,
visitIdentifierPattern: $puck_7.PositionVisitor.visitIdentifierPattern,
visitRecordPattern: $puck_7.PositionVisitor.visitRecordPattern,
visitRecordTypePattern: $puck_7.PositionVisitor.visitRecordTypePattern,
visitTuplePattern: $puck_7.PositionVisitor.visitTuplePattern,
visitTupleTypePattern: $puck_7.PositionVisitor.visitTupleTypePattern,
visitTypeBound: $puck_7.PositionVisitor.visitTypeBound,
visitFunctionTypeBound: $puck_7.PositionVisitor.visitFunctionTypeBound,
visitNamedTypeBound: $puck_7.PositionVisitor.visitNamedTypeBound,
visitRecordTypeBound: $puck_7.PositionVisitor.visitRecordTypeBound,
visitRecordTypeBoundMember: $puck_7.PositionVisitor.visitRecordTypeBoundMember,
visitTupleTypeBound: $puck_7.PositionVisitor.visitTupleTypeBound,
visitTypeParameter: $puck_7.PositionVisitor.visitTypeParameter
};
CompletionVisitor._new = function (position) {
  return {
    position: position,
    completions: $puck_1.None,
    importedModule: $puck_1.None,
    inTraitImpl: $puck_1.None,
  };
};
function getImportCompletions(_module) {
  let $puck_15 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.ObjectMap.values.call(_module.exports), $isTraitObject: true}, function (e) {
    return {
      label: e.identifier.name,
      kind: $unwrapTraitObject($puck_2.CompletionItemKind).Text,
      insertText: e.identifier.name,
    };
  })
;
  return $puck_1.Iterable[$puck_15.type].toList.call($puck_15);
};
function getScopeCompletions(node) {
  if ($unwrapTraitObject(node).scope) {
    const scope = $unwrapTraitObject(node).scope;
    let $puck_16 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.ObjectMap.values.call($puck_5.Scope.getBindings.call(scope)), $isTraitObject: true}, function (binding) {
      let $puck_17;
      if ((!binding.type_)) {
        $puck_17 = "??";
      }
      else {
        let $puck_18 = binding.type_.kind;
        let $puck_19;
        if ($unwrapTraitObject($puck_18).kind == "Function") {
          let undefined = $unwrapTraitObject($puck_18);
          $puck_19 = $puck_6.Type.verboseName.call(binding.type_);
        }
        else {
          let $puck_20;
          if (true) {
            let $puck_21 = $puck_18;
            $puck_20 = $puck_6.Type.displayName.call(binding.type_);
          };
          $puck_19 = $puck_20;
        };
        $puck_17 = $puck_19;
      };
      const typeName = $puck_17;
      return {
        label: binding.name + ": " + typeName + "",
        kind: $unwrapTraitObject($puck_2.CompletionItemKind).Text,
        insertText: binding.name,
      };
    })
;
    return $puck_1.Iterable[$puck_16.type].toList.call($puck_16);
  }
  else {
    return [];
  };
};
function getTraitImplCompletions(trait_) {
  let $puck_22 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.ObjectMap.toList.call(trait_.functions), $isTraitObject: true}, function ([name, type_]) {
    const _function = $puck_6.Type.getFunction.call(type_);
    let $puck_23 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _function.parameters, $isTraitObject: true}, function (b) {
      const typeName = $puck_6.Type.displayName.call(b.type_);
      const typed = b.name + ": " + typeName + "";
      if (b.mutable) {
        return "mut " + typed + "";
      }
      else {
        return typed;
      };
    })
;
    let parameters = $puck_1.Iterable[$puck_23.type].toList.call($puck_23);
    let $puck_24 = _function.selfBinding;
    if (($puck_24.kind == "Some")) {
      let {value: [selfBinding]} = $puck_24;
      if (selfBinding.mutable) {
        $puck_1.List.lpush.call(parameters, "mut self");
      }
      else {
        $puck_1.List.lpush.call(parameters, "self");
      };
    };
    parameters = parameters.join(", ");
    const returnType = $puck_6.Type.displayName.call(_function.returnType);
    const signature = "" + name + "(" + parameters + ") -> " + returnType + "";
    return {
      label: signature,
      kind: $unwrapTraitObject($puck_2.CompletionItemKind).Method,
      insertText: signature + " ",
    };
  })
;
  return $puck_1.Iterable[$puck_22.type].toList.call($puck_22);
}
