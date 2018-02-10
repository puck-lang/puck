'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.ParameterInformation = exports.SignatureInformation = exports.SignatureHelp = exports.SignatureVisitor = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("./../ast/ast");
const $puck_3 = require("./../ast/span");
const $puck_4 = require("./../entities");
const $puck_5 = require("./position_visitor");
const visit = require("./position_visitor");
var ParameterInformation = exports.ParameterInformation = (object) => object;
var SignatureInformation = exports.SignatureInformation = (object) => object;
var SignatureHelp = exports.SignatureHelp = (object) => object;
var SignatureVisitor = exports.SignatureVisitor = (object) => object;
$puck_5.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/signature.puck:SignatureVisitor"] = {
position: function () {
  const self = this;
  return self.value.position;
},
visitModule: $puck_5.PositionVisitor.visitModule,
visitTopLevelStatement: $puck_5.PositionVisitor.visitTopLevelStatement,
visitBlockLevelStatement: $puck_5.PositionVisitor.visitBlockLevelStatement,
visitExpression: $puck_5.PositionVisitor.visitExpression,
visitEnumDeclaration: $puck_5.PositionVisitor.visitEnumDeclaration,
visitEnumMember: $puck_5.PositionVisitor.visitEnumMember,
visitImplDeclaration: $puck_5.PositionVisitor.visitImplDeclaration,
visitImplShorthandDeclaration: $puck_5.PositionVisitor.visitImplShorthandDeclaration,
visitMethodDeclaration: $puck_5.PositionVisitor.visitMethodDeclaration,
visitTraitDeclaration: $puck_5.PositionVisitor.visitTraitDeclaration,
visitTypeDeclaration: $puck_5.PositionVisitor.visitTypeDeclaration,
visitExportDirective: $puck_5.PositionVisitor.visitExportDirective,
visitImportDirective: $puck_5.PositionVisitor.visitImportDirective,
visitObjectDestructure: $puck_5.PositionVisitor.visitObjectDestructure,
visitObjectDestructureMember: $puck_5.PositionVisitor.visitObjectDestructureMember,
visitBlock: $puck_5.PositionVisitor.visitBlock,
visitBreakStatement: $puck_5.PositionVisitor.visitBreakStatement,
visitReturnStatement: $puck_5.PositionVisitor.visitReturnStatement,
visitForLoop: $puck_5.PositionVisitor.visitForLoop,
visitWhileLoop: $puck_5.PositionVisitor.visitWhileLoop,
visitIdentifier: $puck_5.PositionVisitor.visitIdentifier,
visitFunctionDeclaration: $puck_5.PositionVisitor.visitFunctionDeclaration,
visitVariableDeclaration: $puck_5.PositionVisitor.visitVariableDeclaration,
visitAssignmentExpression: $puck_5.PositionVisitor.visitAssignmentExpression,
visitBinaryExpression: $puck_5.PositionVisitor.visitBinaryExpression,
visitCallExpression: function (e) {
  let self = this;
  if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.func, $isTraitObject: true}), self.value.position), $puck_1.Ordering.Equal)) {
    return $puck_5.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/signature.puck:SignatureVisitor"].visitExpression.call(self, e.func);
  };
  let $puck_6 = $puck_1.List.binarySearchBy.call(e.argumentList, function (arg) {
    return $puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: arg, $isTraitObject: true}), self.value.position);
  });
  let $puck_7;
  if ($puck_6.kind === "Ok") {
    let {value: index} = $puck_6;
    $puck_5.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/signature.puck:SignatureVisitor"].visitExpression.call(self, $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: e.argumentList, $isTraitObject: true}, index));
    if ($puck_1.Option.isSome.call(self.value.signatureHelp)) {
      return undefined;
    };
    $puck_7 = index;
  }
  else {
    let $puck_8;
    if ($puck_6.kind === "Err") {
      let {value: index} = $puck_6;
      $puck_8 = index;
    };
    $puck_7 = $puck_8;
  };
  const index = $puck_7;
  if (e.functionType) {
    const type_ = $unwrapTraitObject(e.functionType);
    let $puck_9 = type_.kind;
    if ($puck_9.kind === "Function") {
      let {value: func} = $puck_9;
      let $puck_10 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: func.parameters, $isTraitObject: true}, function (p) {
        let label = p.name + ": " + $puck_4.Type.displayName.call(p.type_);
        let $puck_11;
        if (p.mutable) {
          $puck_11 = "mut " + label + "";
        }
        else {
          $puck_11 = label;
        };
        label = $puck_11;
        return {label: label};
      })
;
      self.value.signatureHelp = $puck_1.Some({
        signatures: [{
        label: $puck_4.Type.displayName.call(type_) + $puck_4.Type.verboseName.call(type_),
        parameters: $puck_1.Iterable[$puck_10.type].toList.call($puck_10),
      }],
        activeSignature: 0,
        activeParameter: index,
      });
    };
  };
},
visitIfExpression: $puck_5.PositionVisitor.visitIfExpression,
visitIfLetExpression: $puck_5.PositionVisitor.visitIfLetExpression,
visitMatchExpression: $puck_5.PositionVisitor.visitMatchExpression,
visitMatchArm: $puck_5.PositionVisitor.visitMatchArm,
visitTypePath: $puck_5.PositionVisitor.visitTypePath,
visitTypePathExpression: $puck_5.PositionVisitor.visitTypePathExpression,
visitUnaryExpression: $puck_5.PositionVisitor.visitUnaryExpression,
visitIndexAccess: $puck_5.PositionVisitor.visitIndexAccess,
visitMemberAccess: $puck_5.PositionVisitor.visitMemberAccess,
visitTupleIndexAccess: $puck_5.PositionVisitor.visitTupleIndexAccess,
visitUnknownAccess: $puck_5.PositionVisitor.visitUnknownAccess,
visitUnknownIndexAccess: $puck_5.PositionVisitor.visitUnknownIndexAccess,
visitListLiteral: $puck_5.PositionVisitor.visitListLiteral,
visitBooleanLiteral: $puck_5.PositionVisitor.visitBooleanLiteral,
visitNumberLiteral: $puck_5.PositionVisitor.visitNumberLiteral,
visitRangeLiteral: $puck_5.PositionVisitor.visitRangeLiteral,
visitRecordLiteral: $puck_5.PositionVisitor.visitRecordLiteral,
visitRecordLiteralMember: $puck_5.PositionVisitor.visitRecordLiteralMember,
visitStringLiteral: $puck_5.PositionVisitor.visitStringLiteral,
visitStringLiteralPart: $puck_5.PositionVisitor.visitStringLiteralPart,
visitTupleLiteral: $puck_5.PositionVisitor.visitTupleLiteral,
visitPattern: $puck_5.PositionVisitor.visitPattern,
visitIdentifierPattern: $puck_5.PositionVisitor.visitIdentifierPattern,
visitRecordPattern: $puck_5.PositionVisitor.visitRecordPattern,
visitRecordTypePattern: $puck_5.PositionVisitor.visitRecordTypePattern,
visitTuplePattern: $puck_5.PositionVisitor.visitTuplePattern,
visitTupleTypePattern: $puck_5.PositionVisitor.visitTupleTypePattern,
visitTypeBound: $puck_5.PositionVisitor.visitTypeBound,
visitFunctionTypeBound: $puck_5.PositionVisitor.visitFunctionTypeBound,
visitIntersectionTypeBound: $puck_5.PositionVisitor.visitIntersectionTypeBound,
visitNamedTypeBound: $puck_5.PositionVisitor.visitNamedTypeBound,
visitRecordTypeBound: $puck_5.PositionVisitor.visitRecordTypeBound,
visitRecordTypeBoundMember: $puck_5.PositionVisitor.visitRecordTypeBoundMember,
visitTupleTypeBound: $puck_5.PositionVisitor.visitTupleTypeBound,
visitTypeParameter: $puck_5.PositionVisitor.visitTypeParameter
};
SignatureVisitor._new = function (position) {
  return {
    position: position,
    signatureHelp: $puck_1.None,
  };
}
