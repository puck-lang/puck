'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefinitionVisitor = exports.Definition = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _core = require('puck-lang/dist/lib/stdlib/core');

var _ast = require('./../ast/ast');

var _span = require('./../ast/span');

var _scope = require('./../typeck/src/scope');

var _entities = require('./../entities');

var _position_visitor = require('./position_visitor');

var visit = _interopRequireWildcard(_position_visitor);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};
var Definition = exports.Definition = function Definition(object) {
  return object;
};
var DefinitionVisitor = exports.DefinitionVisitor = function DefinitionVisitor(object) {
  return object;
};
_position_visitor.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/definition.puck:DefinitionVisitor"] = {
  position: function position() {
    var self = this;
    return self.value.position;
  },
  visitModule: _position_visitor.PositionVisitor.visitModule,
  visitTopLevelStatement: _position_visitor.PositionVisitor.visitTopLevelStatement,
  visitBlockLevelStatement: _position_visitor.PositionVisitor.visitBlockLevelStatement,
  visitExpression: _position_visitor.PositionVisitor.visitExpression,
  visitEnumDeclaration: _position_visitor.PositionVisitor.visitEnumDeclaration,
  visitEnumMember: _position_visitor.PositionVisitor.visitEnumMember,
  visitImplDeclaration: _position_visitor.PositionVisitor.visitImplDeclaration,
  visitImplShorthandDeclaration: _position_visitor.PositionVisitor.visitImplShorthandDeclaration,
  visitMethodDeclaration: _position_visitor.PositionVisitor.visitMethodDeclaration,
  visitTraitDeclaration: _position_visitor.PositionVisitor.visitTraitDeclaration,
  visitTypeDeclaration: _position_visitor.PositionVisitor.visitTypeDeclaration,
  visitExportDirective: _position_visitor.PositionVisitor.visitExportDirective,
  visitImportDirective: function visitImportDirective(i) {
    var self = this;
    self.value.importedModule = i._module;
    visit.walkImportDirective(self, i);
  },
  visitObjectDestructure: _position_visitor.PositionVisitor.visitObjectDestructure,
  visitObjectDestructureMember: function visitObjectDestructureMember(m) {
    var self = this;
    if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: m.property, $isTraitObject: true }), _position_visitor.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/definition.puck:DefinitionVisitor"].position.call(self)) == _core.Ordering.Equal) {
      var __PUCK__value__1 = self.value.importedModule;
      if (__PUCK__value__1.kind == "Some") {
        var _PUCK__value__1$valu = _slicedToArray(__PUCK__value__1.value, 1),
            _module = _PUCK__value__1$valu[0];

        var __PUCK__value__2 = _core.ObjectMap.get.call(_module.exports, m.property.name);
        if (__PUCK__value__2.kind == "Some") {
          var _PUCK__value__2$valu = _slicedToArray(__PUCK__value__2.value, 1),
              e = _PUCK__value__2$valu[0];

          self.value.definitions = [{
            file: _module.file,
            span: _span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: e.identifier, $isTraitObject: true })
          }];
        };
      };
    };
  },
  visitBlock: _position_visitor.PositionVisitor.visitBlock,
  visitBreakStatement: _position_visitor.PositionVisitor.visitBreakStatement,
  visitReturnStatement: _position_visitor.PositionVisitor.visitReturnStatement,
  visitWhileLoop: _position_visitor.PositionVisitor.visitWhileLoop,
  visitIdentifier: function visitIdentifier(i) {
    var self = this;
    var binding = $unwrapTraitObject(i.binding);
    if (binding) {
      var __PUCK__value__3 = binding.token;
      self.value.definitions = [{
        file: self.value.file,
        span: _span.ToSpan[__PUCK__value__3.type].span.call(__PUCK__value__3)
      }];
    };
  },
  visitFunctionDeclaration: _position_visitor.PositionVisitor.visitFunctionDeclaration,
  visitVariableDeclaration: _position_visitor.PositionVisitor.visitVariableDeclaration,
  visitAssignmentExpression: _position_visitor.PositionVisitor.visitAssignmentExpression,
  visitBinaryExpression: _position_visitor.PositionVisitor.visitBinaryExpression,
  visitCallExpression: _position_visitor.PositionVisitor.visitCallExpression,
  visitIfExpression: _position_visitor.PositionVisitor.visitIfExpression,
  visitIfLetExpression: _position_visitor.PositionVisitor.visitIfLetExpression,
  visitMatchExpression: _position_visitor.PositionVisitor.visitMatchExpression,
  visitMatchArm: _position_visitor.PositionVisitor.visitMatchArm,
  visitTypePath: _position_visitor.PositionVisitor.visitTypePath,
  visitTypePathExpression: _position_visitor.PositionVisitor.visitTypePathExpression,
  visitUnaryExpression: _position_visitor.PositionVisitor.visitUnaryExpression,
  visitIndexAccess: _position_visitor.PositionVisitor.visitIndexAccess,
  visitMemberAccess: _position_visitor.PositionVisitor.visitMemberAccess,
  visitUnknownAccess: _position_visitor.PositionVisitor.visitUnknownAccess,
  visitUnknownIndexAccess: _position_visitor.PositionVisitor.visitUnknownIndexAccess,
  visitListLiteral: _position_visitor.PositionVisitor.visitListLiteral,
  visitBooleanLiteral: _position_visitor.PositionVisitor.visitBooleanLiteral,
  visitNumberLiteral: _position_visitor.PositionVisitor.visitNumberLiteral,
  visitRecordLiteral: _position_visitor.PositionVisitor.visitRecordLiteral,
  visitRecordLiteralMember: _position_visitor.PositionVisitor.visitRecordLiteralMember,
  visitStringLiteral: _position_visitor.PositionVisitor.visitStringLiteral,
  visitStringLiteralPart: _position_visitor.PositionVisitor.visitStringLiteralPart,
  visitTupleLiteral: _position_visitor.PositionVisitor.visitTupleLiteral,
  visitPattern: _position_visitor.PositionVisitor.visitPattern,
  visitIdentifierPattern: _position_visitor.PositionVisitor.visitIdentifierPattern,
  visitRecordPattern: _position_visitor.PositionVisitor.visitRecordPattern,
  visitRecordTypePattern: _position_visitor.PositionVisitor.visitRecordTypePattern,
  visitTuplePattern: _position_visitor.PositionVisitor.visitTuplePattern,
  visitTupleTypePattern: _position_visitor.PositionVisitor.visitTupleTypePattern,
  visitTypeBound: _position_visitor.PositionVisitor.visitTypeBound,
  visitFunctionTypeBound: _position_visitor.PositionVisitor.visitFunctionTypeBound,
  visitNamedTypeBound: _position_visitor.PositionVisitor.visitNamedTypeBound,
  visitRecordTypeBound: _position_visitor.PositionVisitor.visitRecordTypeBound,
  visitRecordTypeBoundMember: _position_visitor.PositionVisitor.visitRecordTypeBoundMember,
  visitTupleTypeBound: _position_visitor.PositionVisitor.visitTupleTypeBound,
  visitTypeParameter: _position_visitor.PositionVisitor.visitTypeParameter
};
DefinitionVisitor._new = function (file, position) {
  return {
    file: file,
    position: position,
    definitions: [],
    importedModule: _core.None
  };
};
