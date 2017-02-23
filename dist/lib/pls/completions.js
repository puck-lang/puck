'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompletionVisitor = exports.Completion = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _core = require('puck-lang/dist/lib/stdlib/core');

var _vscodeLanguageserver = require('vscode-languageserver');

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
var Completion = exports.Completion = function Completion(object) {
  return object;
};
var CompletionVisitor = exports.CompletionVisitor = function CompletionVisitor(object) {
  return object;
};
_position_visitor.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/completions.puck:CompletionVisitor"] = {
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
  visitImplDeclaration: function visitImplDeclaration(i) {
    var self = this;
    if (!visit.walkImplDeclaration(self, i)) {
      var trait_ = _ast.TypeBound.getType.call(i.trait_);
      if (trait_) {
        var __PUCK__value__1 = trait_.kind;
        if ($unwrapTraitObject(__PUCK__value__1).kind == "Trait") {
          var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__1),
              _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
              _trait_ = _$unwrapTraitObject$v[0];

          var __PUCK__value__2 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _core.ObjectMap.toList.call(_trait_.functions), $isTraitObject: true }, function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                name = _ref2[0],
                type_ = _ref2[1];

            var _function = _entities.Type.getFunction.call(type_);
            var __PUCK__value__3 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _function.parameters, $isTraitObject: true }, function (b) {
              var typeName = _entities.Type.displayName.call(b.type_);
              var typed = b.name + ": " + typeName + "";
              if (b.mutable) {
                return "mut " + typed + "";
              } else {
                return typed;
              };
            });
            var parameters = _core.Iterable[__PUCK__value__3.type].toList.call(__PUCK__value__3);
            var __PUCK__value__4 = _function.selfBinding;
            if (__PUCK__value__4.kind == "Some") {
              var _PUCK__value__4$valu = _slicedToArray(__PUCK__value__4.value, 1),
                  selfBinding = _PUCK__value__4$valu[0];

              if (selfBinding.mutable) {
                _core.List.lpush.call(parameters, "mut self");
              } else {
                _core.List.lpush.call(parameters, "self");
              };
            };
            parameters = $unwrapTraitObject(parameters).join(", ");
            var returnType = _entities.Type.displayName.call(_function.returnType);
            var signature = "" + name + "(" + parameters + ") -> " + returnType + "";
            return {
              label: signature,
              kind: $unwrapTraitObject(_vscodeLanguageserver.CompletionItemKind).Method,
              insertText: signature + " "
            };
          });
          self.value.completions = (0, _core.Some)(_core.Iterable[__PUCK__value__2.type].toList.call(__PUCK__value__2));
        } else {
          if (true) {
            var __PUCK__value__5 = __PUCK__value__1;
          };
        };
      };
    };
  },
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
  visitObjectDestructure: function visitObjectDestructure(o) {
    var self = this;
    if (!visit.walkObjectDestructure(self, o)) {
      (0, _core.print)("CompletionVisitor visitObjectDestructure");
      self.value.completions = _core.Option.map.call(self.value.importedModule, getImportCompletions);
    };
  },
  visitObjectDestructureMember: function visitObjectDestructureMember(m) {
    var self = this;
    if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: m.property, $isTraitObject: true }), _position_visitor.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/completions.puck:CompletionVisitor"].position.call(self)) == _core.Ordering.Equal) {
      (0, _core.print)("CompletionVisitor visitObjectDestructureMember");
      self.value.completions = _core.Option.map.call(self.value.importedModule, getImportCompletions);
    };
  },
  visitBlock: function visitBlock(b) {
    var self = this;
    if (!visit.walkBlock(self, b)) {
      (0, _core.print)("CompletionVisitor visitBlock");
      self.value.completions = (0, _core.Some)(getScopeCompletions(b));
    };
  },
  visitBreakStatement: _position_visitor.PositionVisitor.visitBreakStatement,
  visitReturnStatement: _position_visitor.PositionVisitor.visitReturnStatement,
  visitWhileLoop: _position_visitor.PositionVisitor.visitWhileLoop,
  visitIdentifier: function visitIdentifier(i) {
    var self = this;
    (0, _core.print)("CompletionVisitor visitIdentifier");
    self.value.completions = (0, _core.Some)(getScopeCompletions(i));
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
  visitMemberAccess: function visitMemberAccess(a) {
    var self = this;
    if (_span.Span.cmp.call(_span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: a.object, $isTraitObject: true }), _position_visitor.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/completions.puck:CompletionVisitor"].position.call(self)) == _core.Ordering.Less) {
      (0, _core.print)("CompletionVisitor visitMemberAccess");
      var type_ = _ast.Expression.getType.call(a.object);
      if (type_) {
        var __PUCK__value__6 = type_.kind;
        if ($unwrapTraitObject(__PUCK__value__6).kind == "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__6).value)[0]).kind).kind == "Record") {
          var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__6),
              _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
              _$unwrapTraitObject2$2 = _slicedToArray(_$unwrapTraitObject2$[0].kind.value, 1),
              record = _$unwrapTraitObject2$2[0];

          var __PUCK__value__7 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _core.ObjectMap.toList.call(record.properties), $isTraitObject: true }, function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                property = _ref4[0],
                type_ = _ref4[1];

            var typeName = _entities.Type.displayName.call(type_);
            return {
              label: "" + property + ": " + typeName + "",
              kind: $unwrapTraitObject(_vscodeLanguageserver.CompletionItemKind).Text,
              insertText: property
            };
          });
          self.value.completions = (0, _core.Some)(_core.Iterable[__PUCK__value__7.type].toList.call(__PUCK__value__7));
        } else {
          if (true) {
            var __PUCK__value__8 = __PUCK__value__6;
          };
        };
      };
    } else {
      visit.walkMemberAccess(self, a);
    };
  },
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
CompletionVisitor._new = function (position) {
  return {
    position: position,
    completions: _core.None,
    importedModule: _core.None
  };
};
function getImportCompletions(_module) {
  var __PUCK__value__9 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _core.ObjectMap.values.call(_module.exports), $isTraitObject: true }, function (e) {
    return {
      label: e.identifier.name,
      kind: $unwrapTraitObject(_vscodeLanguageserver.CompletionItemKind).Text,
      insertText: e.identifier.name
    };
  });
  return _core.Iterable[__PUCK__value__9.type].toList.call(__PUCK__value__9);
};
function getScopeCompletions(node) {
  if ($unwrapTraitObject(node).scope) {
    var scope = $unwrapTraitObject(node).scope;
    var __PUCK__value__10 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _core.ObjectMap.values.call(_scope.Scope.getBindings.call(scope)), $isTraitObject: true }, function (binding) {
      var typeName = _entities.Type.displayName.call(binding.type_);
      return {
        label: binding.name + ": " + typeName + "",
        kind: $unwrapTraitObject(_vscodeLanguageserver.CompletionItemKind).Text,
        insertText: binding.name
      };
    });
    return _core.Iterable[__PUCK__value__10.type].toList.call(__PUCK__value__10);
  } else {
    return [];
  };
}
