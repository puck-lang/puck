'use strict';
exports.TopLevelVisitor = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("./../ast/ast");
const $puck_4 = require("./../ast/span");
const $puck_5 = require("./../ast/visit");
const visit = require("./../ast/visit");
const $puck_6 = require("./../compiler");
const $puck_7 = require("./../compiler/ast");
const $puck_8 = require("./../entities");
var TopLevelVisitor = exports.TopLevelVisitor = (object) => object;
$puck_5.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/top_level_visitor.puck:TopLevelVisitor"] = {
visitModule: $puck_5.Visit.visitModule,
visitTopLevelStatement: $puck_5.Visit.visitTopLevelStatement,
visitBlockLevelStatement: $puck_5.Visit.visitBlockLevelStatement,
visitExpression: $puck_5.Visit.visitExpression,
visitEnumDeclaration: function (t) {
  let self = this;
  $puck_1.ObjectMap.set.call(self.value.declarations, t.name.name, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumDeclaration', value: t, $isTraitObject: true});
},
visitEnumMember: $puck_5.Visit.visitEnumMember,
visitImplDeclaration: $puck_5.Visit.visitImplDeclaration,
visitImplShorthandDeclaration: $puck_5.Visit.visitImplShorthandDeclaration,
visitMethodDeclaration: $puck_5.Visit.visitMethodDeclaration,
visitTraitDeclaration: function (t) {
  let self = this;
  $puck_1.ObjectMap.set.call(self.value.declarations, t.name.name, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration', value: t, $isTraitObject: true});
},
visitTypeDeclaration: function (t) {
  let self = this;
  $puck_1.ObjectMap.set.call(self.value.declarations, t.name.name, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeDeclaration', value: t, $isTraitObject: true});
},
visitExportDirective: $puck_5.Visit.visitExportDirective,
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
      $puck_5.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/top_level_visitor.puck:TopLevelVisitor"].visitObjectDestructure.call(self, d);
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
visitObjectDestructureMember: $puck_5.Visit.visitObjectDestructureMember,
visitBlock: $puck_5.Visit.visitBlock,
visitBreakStatement: $puck_5.Visit.visitBreakStatement,
visitReturnStatement: $puck_5.Visit.visitReturnStatement,
visitForLoop: $puck_5.Visit.visitForLoop,
visitWhileLoop: $puck_5.Visit.visitWhileLoop,
visitIdentifier: $puck_5.Visit.visitIdentifier,
visitFunctionDeclaration: function (f) {
  let self = this;
  let $puck_10 = f.name;
  if ($puck_10 !== undefined) {
    let name = $puck_10;
    $puck_1.ObjectMap.set.call(self.value.declarations, name.name, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: f, $isTraitObject: true});
  };
},
visitVariableDeclaration: $puck_5.Visit.visitVariableDeclaration,
visitAssignmentExpression: $puck_5.Visit.visitAssignmentExpression,
visitBinaryExpression: $puck_5.Visit.visitBinaryExpression,
visitCallExpression: $puck_5.Visit.visitCallExpression,
visitIfExpression: $puck_5.Visit.visitIfExpression,
visitIfLetExpression: $puck_5.Visit.visitIfLetExpression,
visitMatchExpression: $puck_5.Visit.visitMatchExpression,
visitMatchArm: $puck_5.Visit.visitMatchArm,
visitTypePath: $puck_5.Visit.visitTypePath,
visitTypePathExpression: $puck_5.Visit.visitTypePathExpression,
visitUnaryExpression: $puck_5.Visit.visitUnaryExpression,
visitIndexAccess: $puck_5.Visit.visitIndexAccess,
visitMemberAccess: $puck_5.Visit.visitMemberAccess,
visitTupleIndexAccess: $puck_5.Visit.visitTupleIndexAccess,
visitUnknownAccess: $puck_5.Visit.visitUnknownAccess,
visitUnknownIndexAccess: $puck_5.Visit.visitUnknownIndexAccess,
visitListLiteral: $puck_5.Visit.visitListLiteral,
visitBooleanLiteral: $puck_5.Visit.visitBooleanLiteral,
visitNumberLiteral: $puck_5.Visit.visitNumberLiteral,
visitRangeLiteral: $puck_5.Visit.visitRangeLiteral,
visitRecordLiteral: $puck_5.Visit.visitRecordLiteral,
visitRecordLiteralMember: $puck_5.Visit.visitRecordLiteralMember,
visitStringLiteral: $puck_5.Visit.visitStringLiteral,
visitStringLiteralPart: $puck_5.Visit.visitStringLiteralPart,
visitTupleLiteral: $puck_5.Visit.visitTupleLiteral,
visitPattern: $puck_5.Visit.visitPattern,
visitIdentifierPattern: function (p, $puck_11) {
  let self = this;
  $puck_1.ObjectMap.set.call(self.value.declarations, p.name, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: p, $isTraitObject: true});
},
visitRecordPattern: $puck_5.Visit.visitRecordPattern,
visitTuplePattern: $puck_5.Visit.visitTuplePattern,
visitTypeBound: $puck_5.Visit.visitTypeBound,
visitFunctionTypeBound: $puck_5.Visit.visitFunctionTypeBound,
visitIntersectionTypeBound: $puck_5.Visit.visitIntersectionTypeBound,
visitNamedTypeBound: $puck_5.Visit.visitNamedTypeBound,
visitRecordTypeBound: $puck_5.Visit.visitRecordTypeBound,
visitRecordTypeBoundMember: $puck_5.Visit.visitRecordTypeBoundMember,
visitTupleTypeBound: $puck_5.Visit.visitTupleTypeBound,
visitTypeParameter: $puck_5.Visit.visitTypeParameter,
visitTypeParameterBound: $puck_5.Visit.visitTypeParameterBound,
visitWhereClause: $puck_5.Visit.visitWhereClause
};
TopLevelVisitor._new = function (context, file) {
  return {
    context: context,
    file: file,
    declarations: $puck_1.ObjectMap._new(),
  };
}
