'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.Definition = exports.DefinitionVisitorundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("./../ast/ast");
const $puck_3 = require("./../ast/span");
const $puck_4 = require("./../typeck/src/scope");
const $puck_5 = require("./../entities");
const $puck_6 = require("./position_visitor");
const visit = require("./position_visitor");
var Definition = exports.Definition = (object) => object;
var DefinitionVisitor = exports.DefinitionVisitor = (object) => object;
$puck_6.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/definition.puck:DefinitionVisitor"] = {
position: function () {
  const self = this;
  return self.value.position;
},
visitModule: $puck_6.PositionVisitor.visitModule,
visitTopLevelStatement: $puck_6.PositionVisitor.visitTopLevelStatement,
visitBlockLevelStatement: $puck_6.PositionVisitor.visitBlockLevelStatement,
visitExpression: $puck_6.PositionVisitor.visitExpression,
visitEnumDeclaration: $puck_6.PositionVisitor.visitEnumDeclaration,
visitEnumMember: $puck_6.PositionVisitor.visitEnumMember,
visitImplDeclaration: $puck_6.PositionVisitor.visitImplDeclaration,
visitImplShorthandDeclaration: $puck_6.PositionVisitor.visitImplShorthandDeclaration,
visitMethodDeclaration: $puck_6.PositionVisitor.visitMethodDeclaration,
visitTraitDeclaration: $puck_6.PositionVisitor.visitTraitDeclaration,
visitTypeDeclaration: $puck_6.PositionVisitor.visitTypeDeclaration,
visitExportDirective: $puck_6.PositionVisitor.visitExportDirective,
visitImportDirective: function (i) {
  let self = this;
  self.value.importedModule = i._module;
  visit.walkImportDirective(self, i);
},
visitObjectDestructure: $puck_6.PositionVisitor.visitObjectDestructure,
visitObjectDestructureMember: function (m) {
  let self = this;
  if ($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: m.property, $isTraitObject: true}), $puck_6.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/definition.puck:DefinitionVisitor"].position.call(self)) == $puck_1.Ordering.Equal) {
    let $puck_7 = self.value.importedModule;
    if ($puck_7.kind == "Some") {
      let {value: [_module]} = $puck_7;
      let $puck_8 = $puck_1.ObjectMap.get.call(_module.exports, m.property.name);
      if ($puck_8.kind == "Some") {
        let {value: [e]} = $puck_8;
        self.value.definitions = [{
          file: _module.file,
          span: $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: e.identifier, $isTraitObject: true}),
        }];
      };
    };
  };
},
visitBlock: $puck_6.PositionVisitor.visitBlock,
visitBreakStatement: $puck_6.PositionVisitor.visitBreakStatement,
visitReturnStatement: $puck_6.PositionVisitor.visitReturnStatement,
visitWhileLoop: $puck_6.PositionVisitor.visitWhileLoop,
visitIdentifier: function (i) {
  let self = this;
  const binding = $unwrapTraitObject(i.binding);
  if (binding) {
    let $puck_9 = binding.token
;
    self.value.definitions = [{
      file: self.value.file,
      span: $puck_3.ToSpan[$puck_9.type].span.call($puck_9),
    }];
  };
},
visitFunctionDeclaration: $puck_6.PositionVisitor.visitFunctionDeclaration,
visitVariableDeclaration: $puck_6.PositionVisitor.visitVariableDeclaration,
visitAssignmentExpression: $puck_6.PositionVisitor.visitAssignmentExpression,
visitBinaryExpression: $puck_6.PositionVisitor.visitBinaryExpression,
visitCallExpression: $puck_6.PositionVisitor.visitCallExpression,
visitIfExpression: $puck_6.PositionVisitor.visitIfExpression,
visitIfLetExpression: $puck_6.PositionVisitor.visitIfLetExpression,
visitMatchExpression: $puck_6.PositionVisitor.visitMatchExpression,
visitMatchArm: $puck_6.PositionVisitor.visitMatchArm,
visitTypePath: $puck_6.PositionVisitor.visitTypePath,
visitTypePathExpression: $puck_6.PositionVisitor.visitTypePathExpression,
visitUnaryExpression: $puck_6.PositionVisitor.visitUnaryExpression,
visitIndexAccess: $puck_6.PositionVisitor.visitIndexAccess,
visitMemberAccess: $puck_6.PositionVisitor.visitMemberAccess,
visitUnknownAccess: $puck_6.PositionVisitor.visitUnknownAccess,
visitUnknownIndexAccess: $puck_6.PositionVisitor.visitUnknownIndexAccess,
visitListLiteral: $puck_6.PositionVisitor.visitListLiteral,
visitBooleanLiteral: $puck_6.PositionVisitor.visitBooleanLiteral,
visitNumberLiteral: $puck_6.PositionVisitor.visitNumberLiteral,
visitRecordLiteral: $puck_6.PositionVisitor.visitRecordLiteral,
visitRecordLiteralMember: $puck_6.PositionVisitor.visitRecordLiteralMember,
visitStringLiteral: $puck_6.PositionVisitor.visitStringLiteral,
visitStringLiteralPart: $puck_6.PositionVisitor.visitStringLiteralPart,
visitTupleLiteral: $puck_6.PositionVisitor.visitTupleLiteral,
visitPattern: $puck_6.PositionVisitor.visitPattern,
visitIdentifierPattern: $puck_6.PositionVisitor.visitIdentifierPattern,
visitRecordPattern: $puck_6.PositionVisitor.visitRecordPattern,
visitRecordTypePattern: $puck_6.PositionVisitor.visitRecordTypePattern,
visitTuplePattern: $puck_6.PositionVisitor.visitTuplePattern,
visitTupleTypePattern: $puck_6.PositionVisitor.visitTupleTypePattern,
visitTypeBound: $puck_6.PositionVisitor.visitTypeBound,
visitFunctionTypeBound: $puck_6.PositionVisitor.visitFunctionTypeBound,
visitNamedTypeBound: $puck_6.PositionVisitor.visitNamedTypeBound,
visitRecordTypeBound: $puck_6.PositionVisitor.visitRecordTypeBound,
visitRecordTypeBoundMember: $puck_6.PositionVisitor.visitRecordTypeBoundMember,
visitTupleTypeBound: $puck_6.PositionVisitor.visitTupleTypeBound,
visitTypeParameter: $puck_6.PositionVisitor.visitTypeParameter
};
DefinitionVisitor._new = function (file, position) {
  return {
    file: file,
    position: position,
    definitions: [],
    importedModule: $puck_1.None,
  };
}
