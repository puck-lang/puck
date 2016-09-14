#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopScopeVisitor = TopScopeVisitor;
exports.ScopeVisitor = ScopeVisitor;

var _js = require('puck-lang/dist/lib/stdlib/js');

var _visit = require('./../ast/visit.js');

var visit = _interopRequireWildcard(_visit);

var _ast = require('./../compiler/ast.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
function defineFunction(scope, f) {
  if (f.name) {
    return scope.define({
      identifier: f.name,
      mutable: false
    });
  };
};
function definedHosted(scope, expressions) {
  return expressions.forEach(function (e) {
    if (e.scope) {
      return _js._undefined;
    };
    if (e.kind == _ast.SyntaxKind.Function) {
      defineFunction(scope, e);
      e.hoisted = true;
    };
    if (e.kind == _ast.SyntaxKind.ExportDirective && e.expression.kind == _ast.SyntaxKind.Function) {
      defineFunction(scope, e.expression);
      return e.expression.hoisted = true;
    };
  });
};
function TopScopeVisitor(context, file) {
  var scope = createScope();
  var reportError = context.reportError.bind(context, file);
  return _js._Object.assign({}, visit.Visitor, {
    visitBlock: function visitBlock(b) {},
    visitFunction: function visitFunction(f) {
      var self = this;
      f.scope = scope;
      if (!f.hoisted) {
        return defineFunction(scope, f);
      };
    },
    visitIdentifier: function visitIdentifier(i) {},
    visitModule: function visitModule(m) {
      var self = this;
      m.scope = scope;
      definedHosted(scope, m.lines);
      return visit.walkModule(self, m);
    },
    visitObjectDestructure: function visitObjectDestructure(i) {
      var self = this;
      i.scope = scope;
      return i.members.forEach(function (m) {
        return scope.define({
          identifier: m.local,
          mutable: false
        });
      });
    },
    visitTypeBound: function visitTypeBound(t) {},
    visitVariableDeclaration: function visitVariableDeclaration(d) {
      var self = this;
      d.scope = scope;
      return scope.define({
        identifier: d.identifier,
        mutable: d.mutable
      });
    },
    visitExportDirective: function visitExportDirective(e) {},
    visitImportDirective: function visitImportDirective(i) {
      var self = this;
      if (i.specifier.kind == _ast.SyntaxKind.Identifier) {
        return scope.define({
          identifier: i.specifier,
          mutable: false
        });
      } else {
        if (i.specifier.kind == _ast.SyntaxKind.ObjectDestructure) {
          return visit.walkImportDirective(self, i);
        };
      };
    },
    visitAssignmentExpression: function visitAssignmentExpression(e) {},
    visitBinaryExpression: function visitBinaryExpression(e) {},
    visitCallExpression: function visitCallExpression(e) {},
    visitForExpression: function visitForExpression(e) {},
    visitIfExpression: function visitIfExpression(e) {},
    visitLoopExpression: function visitLoopExpression(e) {},
    visitUnaryExpression: function visitUnaryExpression(e) {},
    visitWhileExpression: function visitWhileExpression(e) {},
    visitIndexAccess: function visitIndexAccess(a) {},
    visitMemberAccess: function visitMemberAccess(a) {},
    visitBreak: function visitBreak(b) {},
    visitReturn: function visitReturn(r) {},
    visitArrayLiteral: function visitArrayLiteral(l) {},
    visitBooleanLiteral: function visitBooleanLiteral(l) {},
    visitNumberLiteral: function visitNumberLiteral(l) {},
    visitObjectLiteral: function visitObjectLiteral(l) {},
    visitStringLiteral: function visitStringLiteral(l) {}
  });
};
function ScopeVisitor(context, file) {
  var scope = void 0;
  var reportError = context.reportError.bind(context, file);
  return _js._Object.assign({}, visit.Visitor, {
    visitBlock: function visitBlock(b) {
      var self = this;
      b.scope = scope;
      definedHosted(scope, b.block);
      return visit.walkBlock(self, b);
    },
    visitFunction: function visitFunction(f) {
      var self = this;
      if (!f.scope && !f.hoisted) {
        defineFunction(scope, f);
      };
      scope = createScope(scope);
      f.scope = scope;
      visit.walkFunction(self, f);
      return scope = scope.parent;
    },
    visitIdentifier: function visitIdentifier(i) {
      var self = this;
      i.scope = scope;
      var binding = i.scope.getBinding(i.name);
      if (!binding) {
        reportError(i, "Use of undefined variable " + i.name);
      };
      return visit.walkIdentifier(self, i);
    },
    visitModule: function visitModule(m) {
      var self = this;
      scope = m.scope;
      return visit.walkModule(self, m);
    },
    visitObjectDestructure: function visitObjectDestructure(i) {
      var self = this;
      i.scope = scope;
      return i.members.forEach(function (m) {
        return scope.define({
          identifier: m.local,
          mutable: false
        });
      });
    },
    visitTypeBound: function visitTypeBound(t) {
      var self = this;
      t.scope = scope;
      return visit.walkTypeBound(self, t);
    },
    visitVariableDeclaration: function visitVariableDeclaration(d) {
      var self = this;
      if (d.typeBound) {
        self.visitTypeBound(d.typeBound);
      };
      if (!d.scope) {
        d.scope = scope;
        scope.define({
          identifier: d.identifier,
          mutable: d.mutable
        });
      };
      if (d.initializer) {
        return self.visitExpression(d.initializer);
      };
    },
    visitExportDirective: function visitExportDirective(e) {
      var self = this;
      e.scope = scope;
      return visit.walkExportDirective(self, e);
    },
    visitAssignmentExpression: function visitAssignmentExpression(e) {
      var self = this;
      e.scope = scope;
      if (e.lhs.kind == _ast.SyntaxKind.Identifier) {
        var binding = e.scope.getBinding(e.lhs.name);
        if (binding && !binding.mutable) {
          reportError(e, "Can't assign to immutable variable " + e.lhs.name);
        };
      };
      return visit.walkAssignmentExpression(self, e);
    },
    visitBinaryExpression: function visitBinaryExpression(e) {
      var self = this;
      e.scope = scope;
      return visit.walkBinaryExpression(self, e);
    },
    visitCallExpression: function visitCallExpression(e) {
      var self = this;
      e.scope = scope;
      return visit.walkCallExpression(self, e);
    },
    visitForExpression: function visitForExpression(e) {
      var self = this;
      scope = createScope(scope);
      e.scope = scope;
      visit.walkForExpression(self, e);
      return scope = scope.parent;
    },
    visitIfExpression: function visitIfExpression(e) {
      var self = this;
      scope = createScope(scope);
      e.scope = scope;
      visit.walkIfExpression(self, e);
      return scope = scope.parent;
    },
    visitLoopExpression: function visitLoopExpression(e) {
      var self = this;
      scope = createScope(scope);
      e.scope = scope;
      visit.walkLoopExpression(self, e);
      return scope = scope.parent;
    },
    visitUnaryExpression: function visitUnaryExpression(e) {
      var self = this;
      e.scope = scope;
      return visit.walkUnaryExpression(self, e);
    },
    visitWhileExpression: function visitWhileExpression(e) {
      var self = this;
      scope = createScope(scope);
      e.scope = scope;
      visit.walkWhileExpression(self, e);
      return scope = scope.parent;
    },
    visitIndexAccess: function visitIndexAccess(a) {
      var self = this;
      a.scope = scope;
      return visit.walkIndexAccess(self, a);
    },
    visitMemberAccess: function visitMemberAccess(a) {
      var self = this;
      a.scope = scope;
      return visit.walkExpression(self, a.object);
    },
    visitBreak: function visitBreak(b) {
      var self = this;
      b.scope = scope;
      return visit.walkBreak(self, b);
    },
    visitReturn: function visitReturn(r) {
      var self = this;
      r.scope = scope;
      return visit.walkReturn(self, r);
    },
    visitArrayLiteral: function visitArrayLiteral(l) {
      var self = this;
      l.scope = scope;
      return visit.walkArrayLiteral(self, l);
    },
    visitBooleanLiteral: function visitBooleanLiteral(l) {
      var self = this;
      l.scope = scope;
      return visit.walkBooleanLiteral(self, l);
    },
    visitNumberLiteral: function visitNumberLiteral(l) {
      var self = this;
      l.scope = scope;
      return visit.walkNumberLiteral(self, l);
    },
    visitObjectLiteral: function visitObjectLiteral(l) {
      var self = this;
      l.scope = scope;
      return l.members.forEach(function (m) {
        return self.visitExpression(m.value);
      });
    },
    visitStringLiteral: function visitStringLiteral(l) {
      var self = this;
      l.scope = scope;
      return visit.walkStringLiteral(self, l);
    }
  });
}
