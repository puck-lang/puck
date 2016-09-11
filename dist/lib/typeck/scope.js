#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScopeVisitor = ScopeVisitor;

var _visit = require('./../ast/visit');

var _ast = require('./../compiler/ast');

var _js = require('./../stdlib/js');

function createScope(parent) {
  var bindings = {};
  return {
    parent: parent,
    getLocalBinding: function getLocalBinding(name) {
      return bindings[name];
    },
    getBinding: function getBinding(name) {
      return bindings[name] || parent && parent.getBinding(name);
    },
    define: function define(binding) {
      var name = binding.identifier.name;
      binding.redefined = bindings[name] != _js._undefined;
      if (binding.redefined) {
        bindings[name].redefined = true;
        binding.previous = bindings[name];
      };
      return bindings[name] = binding;
    }
  };
};
function ScopeVisitor() {
  return Object.assign({}, _visit.Visitor, {
    scope: createScope(),
    visitBlock: function visitBlock(b) {
      var self = this;
      b.scope = self.scope;
      return (0, _visit.walkBlock)(self, b);
    },
    visitFunction: function visitFunction(f) {
      var self = this;
      if (f.name) {
        self.scope.define({
          identifier: f.name,
          mutable: false
        });
      };
      self.scope = createScope(self.scope);
      f.scope = self.scope;
      (0, _visit.walkFunction)(self, f);
      return self.scope = self.scope.parent;
    },
    visitIdentifier: function visitIdentifier(i) {
      var self = this;
      i.scope = self.scope;
      return (0, _visit.walkIdentifier)(self, i);
    },
    visitObjectDestructure: function visitObjectDestructure(i) {
      var self = this;
      i.scope = self.scope;
      return i.members.forEach(function (m) {
        return self.scope.define({
          identifier: m.local,
          mutable: false
        });
      });
    },
    visitTypeBound: function visitTypeBound(t) {
      var self = this;
      t.scope = self.scope;
      return (0, _visit.walkTypeBound)(self, t);
    },
    visitVariableDeclaration: function visitVariableDeclaration(d) {
      var self = this;
      self.scope.define({
        identifier: d.identifier,
        mutable: d.mutable
      });
      d.scope = self.scope;
      return (0, _visit.walkVariableDeclaration)(self, d);
    },
    visitImportDirective: function visitImportDirective(i) {
      var self = this;
      i.scope = self.scope;
      if (i.specifier.kind == _ast.SyntaxKind.Identifier) {
        return self.scope.define({
          identifier: i.specifier,
          mutable: false
        });
      } else {
        return (0, _visit.walkImportDirective)(self, i);
      };
    },
    visitAssignmentExpression: function visitAssignmentExpression(e) {
      var self = this;
      e.scope = self.scope;
      if (e.lhs.kind == _ast.SyntaxKind.Identifier) {
        var binding = e.scope.getBinding(e.lhs.name);
        if (binding && !binding.mutable) {
          throw "Can't assign to immutable variable " + e.lhs.name;
        };
      };
      return (0, _visit.walkAssignmentExpression)(self, e);
    },
    visitBinaryExpression: function visitBinaryExpression(e) {
      var self = this;
      e.scope = self.scope;
      return (0, _visit.walkBinaryExpression)(self, e);
    },
    visitCallExpression: function visitCallExpression(e) {
      var self = this;
      e.scope = self.scope;
      return (0, _visit.walkCallExpression)(self, e);
    },
    visitForExpression: function visitForExpression(e) {
      var self = this;
      self.scope = createScope(self.scope);
      e.scope = self.scope;
      (0, _visit.walkForExpression)(self, e);
      return self.scope = self.scope.parent;
    },
    visitIfExpression: function visitIfExpression(e) {
      var self = this;
      self.scope = createScope(self.scope);
      e.scope = self.scope;
      (0, _visit.walkIfExpression)(self, e);
      return self.scope = self.scope.parent;
    },
    visitLoopExpression: function visitLoopExpression(e) {
      var self = this;
      self.scope = createScope(self.scope);
      e.scope = self.scope;
      (0, _visit.walkLoopExpression)(self, e);
      return self.scope = self.scope.parent;
    },
    visitUnaryExpression: function visitUnaryExpression(e) {
      var self = this;
      e.scope = self.scope;
      return (0, _visit.walkUnaryExpression)(self, e);
    },
    visitWhileExpression: function visitWhileExpression(e) {
      var self = this;
      self.scope = createScope(self.scope);
      e.scope = self.scope;
      (0, _visit.walkWhileExpression)(self, e);
      return self.scope = self.scope.parent;
    },
    visitIndexAccess: function visitIndexAccess(a) {
      var self = this;
      a.scope = self.scope;
      return (0, _visit.walkIndexAccess)(self, a);
    },
    visitMemberAccess: function visitMemberAccess(a) {
      var self = this;
      a.scope = self.scope;
      return (0, _visit.walkMemberAccess)(self, a);
    },
    visitBreak: function visitBreak(b) {
      var self = this;
      b.scope = self.scope;
      return (0, _visit.walkBreak)(self, b);
    },
    visitReturn: function visitReturn(r) {
      var self = this;
      r.scope = self.scope;
      return (0, _visit.walkReturn)(self, r);
    },
    visitArrayLiteral: function visitArrayLiteral(l) {
      var self = this;
      l.scope = self.scope;
      return (0, _visit.walkArrayLiteral)(self, l);
    },
    visitBooleanLiteral: function visitBooleanLiteral(l) {
      var self = this;
      l.scope = self.scope;
      return (0, _visit.walkBooleanLiteral)(self, l);
    },
    visitNumberLiteral: function visitNumberLiteral(l) {
      var self = this;
      l.scope = self.scope;
      return (0, _visit.walkNumberLiteral)(self, l);
    },
    visitObjectLiteral: function visitObjectLiteral(l) {
      var self = this;
      l.scope = self.scope;
      return (0, _visit.walkObjectLiteral)(self, l);
    },
    visitStringLiteral: function visitStringLiteral(l) {
      var self = this;
      l.scope = self.scope;
      return (0, _visit.walkStringLiteral)(self, l);
    }
  });
}
