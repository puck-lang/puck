'use strict';
exports.TopLevelVisitor = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("./../ast/ast");
const $puck_4 = require("./../ast/span");
const $puck_5 = require("./../ast/empty_visitor");
const visit = require("./../ast/empty_visitor");
const $puck_6 = require("./../compiler");
const $puck_7 = require("./../compiler/ast");
const $puck_8 = require("./../entities");
var TopLevelVisitor = exports.TopLevelVisitor = (object) => object;
$puck_5.EmptyVisitor["$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/top_level_visitor.puck:TopLevelVisitor"] = {
visitModule: $puck_5.EmptyVisitor.visitModule,
visitTopLevelStatement: $puck_5.EmptyVisitor.visitTopLevelStatement,
visitBlockLevelStatement: $puck_5.EmptyVisitor.visitBlockLevelStatement,
visitExpression: $puck_5.EmptyVisitor.visitExpression,
visitEnumDeclaration: function (t) {
  let self = this;
  $puck_1.ObjectMap.set.call(self.value.declarations, t.name.name, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumDeclaration', value: t, $isTraitObject: true});
},
visitEnumMember: $puck_5.EmptyVisitor.visitEnumMember,
visitImplDeclaration: $puck_5.EmptyVisitor.visitImplDeclaration,
visitImplShorthandDeclaration: $puck_5.EmptyVisitor.visitImplShorthandDeclaration,
visitMethodDeclaration: $puck_5.EmptyVisitor.visitMethodDeclaration,
visitTraitDeclaration: function (t) {
  let self = this;
  $puck_1.ObjectMap.set.call(self.value.declarations, t.name.name, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration', value: t, $isTraitObject: true});
},
visitTypeDeclaration: function (t) {
  let self = this;
  $puck_1.ObjectMap.set.call(self.value.declarations, t.name.name, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeDeclaration', value: t, $isTraitObject: true});
},
visitExportDirective: $puck_5.EmptyVisitor.visitExportDirective,
visitImportDirective: function (i) {
  let self = this;
  let $puck_9 = i.specifier;
  if ($puck_9.kind === "Identifier") {
    let {value: identifier} = $puck_9;
    $puck_1.ObjectMap.set.call(self.value.declarations, identifier.name, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true});
  }
  else {
    if ($puck_9.kind === "ObjectDestructure") {
      let {value: d} = $puck_9;
      $puck_5.EmptyVisitor["$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/top_level_visitor.puck:TopLevelVisitor"].visitObjectDestructure.call(self, d);
    }
    else {
      if ($puck_9.kind === "Asterisk") {
        $puck_9;
      };
    };
  };
},
visitObjectDestructure: function (i) {
  let self = this;
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true}, function (m) {
    return $puck_1.ObjectMap.set.call(self.value.declarations, m.local.name, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructureMember', value: m, $isTraitObject: true});
  });
},
visitObjectDestructureMember: $puck_5.EmptyVisitor.visitObjectDestructureMember,
visitBlock: $puck_5.EmptyVisitor.visitBlock,
visitBreakStatement: $puck_5.EmptyVisitor.visitBreakStatement,
visitReturnStatement: $puck_5.EmptyVisitor.visitReturnStatement,
visitForLoop: $puck_5.EmptyVisitor.visitForLoop,
visitWhileLoop: $puck_5.EmptyVisitor.visitWhileLoop,
visitIdentifier: $puck_5.EmptyVisitor.visitIdentifier,
visitFunctionDeclaration: function (f) {
  let self = this;
  let $puck_10 = f.name;
  if ($puck_10 !== undefined) {
    let name = $puck_10;
    $puck_1.ObjectMap.set.call(self.value.declarations, name.name, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: f, $isTraitObject: true});
  };
},
visitVariableDeclaration: $puck_5.EmptyVisitor.visitVariableDeclaration,
visitAssignmentExpression: $puck_5.EmptyVisitor.visitAssignmentExpression,
visitBinaryExpression: $puck_5.EmptyVisitor.visitBinaryExpression,
visitCallExpression: $puck_5.EmptyVisitor.visitCallExpression,
visitIfExpression: $puck_5.EmptyVisitor.visitIfExpression,
visitIfLetExpression: $puck_5.EmptyVisitor.visitIfLetExpression,
visitMatchExpression: $puck_5.EmptyVisitor.visitMatchExpression,
visitMatchArm: $puck_5.EmptyVisitor.visitMatchArm,
visitTypePath: $puck_5.EmptyVisitor.visitTypePath,
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
visitIdentifierPattern: function (p, $puck_11) {
  let self = this;
  $puck_1.ObjectMap.set.call(self.value.declarations, p.name, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: p, $isTraitObject: true});
},
visitRecordPattern: $puck_5.EmptyVisitor.visitRecordPattern,
visitTuplePattern: $puck_5.EmptyVisitor.visitTuplePattern,
visitTypeBound: $puck_5.EmptyVisitor.visitTypeBound,
visitFunctionTypeBound: $puck_5.EmptyVisitor.visitFunctionTypeBound,
visitIntersectionTypeBound: $puck_5.EmptyVisitor.visitIntersectionTypeBound,
visitNamedTypeBound: $puck_5.EmptyVisitor.visitNamedTypeBound,
visitRecordTypeBound: $puck_5.EmptyVisitor.visitRecordTypeBound,
visitRecordTypeBoundMember: $puck_5.EmptyVisitor.visitRecordTypeBoundMember,
visitTupleTypeBound: $puck_5.EmptyVisitor.visitTupleTypeBound,
visitTypeParameter: $puck_5.EmptyVisitor.visitTypeParameter,
visitTypeParameterBound: $puck_5.EmptyVisitor.visitTypeParameterBound,
visitWhereClause: $puck_5.EmptyVisitor.visitWhereClause
};
TopLevelVisitor._new = function (context, file) {
  return {
    context: context,
    file: file,
    declarations: $puck_1.ObjectMap._new(),
  };
}
