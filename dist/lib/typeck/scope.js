#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopScopeVisitor = TopScopeVisitor;
exports.ScopeVisitor = ScopeVisitor;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

require('./../ast/ast.js');

var _visit = require('./../ast/visit.js');

var visit = _interopRequireWildcard(_visit);

var _ast = require('./../compiler/ast.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function createScope(context, file, parent) {
  var reportError = context.reportError.bind(context, file);
  var bindings = {};
  var typeBindings = {};
  return {
    parent: parent,
    getLocalBinding: function getLocalBinding(name) {
      return bindings[name];
    },
    getBinding: function getBinding(name) {
      return bindings[name] || parent && parent.getBinding(name);
    },
    getTypeBinding: function getTypeBinding(name) {
      return typeBindings[name] || parent && parent.getTypeBinding(name);
    },
    define: function define(binding) {
      var name = binding.identifier.name;
      binding.redefined = bindings[name] != _js._undefined;
      if (binding.redefined) {
        bindings[name].redefined = true;
        binding.previous = bindings[name];
      };
      return bindings[name] = binding;
    },
    defineType: function defineType(t) {
      var name = t.name.name;
      if (typeBindings[name]) {
        reportError(t, "Type " + name + " is already defined");
      };
      var __PUCK__value__1 = void 0;
      if (t.parameters) {
        (function () {
          var firstOptional = t.parameters.length;
          var hasOptional = false;
          t.parameters.forEach(function (t, i) {
            if (t.defaultValue && !hasOptional) {
              hasOptional = true;
              return firstOptional = i;
            } else {
              if (!t.defaultValue && hasOptional) {
                return reportError(t, "An optional type paramterer can't be followed by a required type parameter");
              };
            };
          });
          __PUCK__value__1 = {
            min: firstOptional,
            max: t.parameters.length
          };
        })();
      } else {
        __PUCK__value__1 = {
          min: 0,
          max: 0
        };
      };
      var parameters = __PUCK__value__1;
      return typeBindings[name] = {
        name: t.name,
        parameters: parameters
      };
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
  var scope = createScope(context, file);
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
    visitTypeDeclaration: function visitTypeDeclaration(t) {
      var self = this;
      t.scope = scope;
      return scope.defineType(t);
    },
    visitVariableDeclaration: function visitVariableDeclaration(d) {
      var self = this;
      d.scope = scope;
      return scope.define({
        identifier: d.identifier,
        mutable: d.mutable
      });
    },
    visitExportDirective: function visitExportDirective(e) {
      var self = this;
      e.scope = scope;
      return visit.walkExportDirective(self, e);
    },
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
    visitListLiteral: function visitListLiteral(l) {},
    visitBooleanLiteral: function visitBooleanLiteral(l) {},
    visitNumberLiteral: function visitNumberLiteral(l) {},
    visitObjectLiteral: function visitObjectLiteral(l) {},
    visitStringLiteral: function visitStringLiteral(l) {}
  });
};
function ScopeVisitor(context, file) {
  var importDirective = void 0;
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
      scope = createScope(context, file, scope);
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
        if (importDirective._module) {
          var e = importDirective._module.exports[m.local.name];
          if (e.expression.kind == _ast.SyntaxKind.TypeDeclaration) {
            return scope.defineType(e.expression);
          } else {
            return scope.define({
              identifier: m.local,
              mutable: false
            });
          };
        } else {
          return scope.define({
            identifier: m.local,
            mutable: false
          });
        };
      });
    },
    visitFunctionTypeBound: function visitFunctionTypeBound(t) {
      var self = this;
      scope = createScope(context, file, scope);
      t.scope = scope;
      visit.walkFunctionTypeBound(self, t);
      return scope = scope.parent;
    },
    visitNamedTypeBound: function visitNamedTypeBound(t) {
      var self = this;
      t.scope = scope;
      var binding = t.scope.getTypeBinding(t.name.name);
      if (!binding) {
        reportError(t, "Use of undeclared type " + t.name.name);
      };
      var parameterCount = t.parameters.length;
      if (parameterCount < binding.parameters.min) {
        reportError(t, "To few type parameters given to " + t.name.name + " min " + binding.parameters.min + " required, " + parameterCount + " given");
      };
      if (parameterCount > binding.parameters.max) {
        var __PUCK__value__2 = void 0;
        if (binding.parameters.max == 0) {
          __PUCK__value__2 = "Type " + t.name.name + " is not generic";
        } else {
          __PUCK__value__2 = "To many type parameters given to " + t.name.name + " max " + binding.parameters.max + " required, " + parameterCount + " given";
        };
        reportError(t, __PUCK__value__2);
      };
      return visit.walkNamedTypeBound(self, t);
    },
    visitTypeDeclaration: function visitTypeDeclaration(t) {
      var self = this;
      scope = createScope(context, file, scope);
      visit.walkTypeDeclaration(self, t);
      return scope = scope.parent;
    },
    visitTypeParameter: function visitTypeParameter(t) {
      var self = this;
      t.scope = scope;
      scope.defineType(t);
      return visit.walkTypeParameter(self, t);
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
    visitImportDirective: function visitImportDirective(i) {
      var self = this;
      i.scope = scope;
      if (i.specifier.kind == _ast.SyntaxKind.Identifier) {
        return scope.define({
          identifier: i.specifier,
          mutable: false
        });
      } else {
        if (i.specifier.kind == _ast.SyntaxKind.ObjectDestructure) {
          importDirective = i;
          return visit.walkImportDirective(self, i);
        };
      };
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
      scope = createScope(context, file, scope);
      e.scope = scope;
      visit.walkForExpression(self, e);
      return scope = scope.parent;
    },
    visitIfExpression: function visitIfExpression(e) {
      var self = this;
      scope = createScope(context, file, scope);
      e.scope = scope;
      visit.walkIfExpression(self, e);
      return scope = scope.parent;
    },
    visitLoopExpression: function visitLoopExpression(e) {
      var self = this;
      scope = createScope(context, file, scope);
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
      scope = createScope(context, file, scope);
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
    visitListLiteral: function visitListLiteral(l) {
      var self = this;
      l.scope = scope;
      return visit.walkListLiteral(self, l);
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
