#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeVisitor = TypeVisitor;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

require('./../ast/ast.js');

var _visit = require('./../ast/visit.js');

var visit = _interopRequireWildcard(_visit);

var _ast = require('./../compiler/ast.js');

var _functions = require('./src/functions.js');

var _scope = require('./src/scope.js');

var _types = require('./src/types.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function TypeVisitor(context, file) {
  var importDirective = void 0;
  var scope = (0, _scope.createScope)(context, file);
  var reportError = context.reportError.bind(context, file);
  return _js._Object.assign({}, visit.Visitor, {
    visitBlock: function visitBlock(b) {},
    visitFunctionDeclaration: function visitFunctionDeclaration(f) {
      var self = this;
      f.hoisting = true;
      f.hoisted = true;
      scope = (0, _scope.createScope)(context, file, scope);
      f.scope = scope;
      (0, _functions.visitFunctionDeclarationFrame)(self, reportError, f);
      return scope = scope.parent;
    },
    visitIdentifier: function visitIdentifier(i) {},
    visitImplDeclaration: function visitImplDeclaration(i) {},
    visitModule: function visitModule(m) {
      var self = this;
      m.scope = scope;
      m.expressions.forEach(function (e) {
        if (e.kind == _ast.SyntaxKind.ImportDirective) {
          self.visitImportDirective(e);
          return e.hoisted = true;
        } else {
          if (e.kind == _ast.SyntaxKind.TraitDeclaration) {
            e.ty = scope.defineType(e).ty;
            scope.define({
              name: e.name.name,
              mutable: false,
              token: e
            });
            return e.hoisted = true;
          } else {
            if (e.kind == _ast.SyntaxKind.TypeDeclaration) {
              e.ty = scope.defineType(e).ty;
              return e.hoisted = true;
            } else {
              if (e.kind == _ast.SyntaxKind.ExportDirective && e.expression.kind == _ast.SyntaxKind.TraitDeclaration) {
                e.expression.ty = scope.defineType(e.expression).ty;
                scope.define({
                  name: e.expression.name.name,
                  mutable: false,
                  token: e.expression
                });
                return e.expression.hoisted = true;
              } else {
                if (e.kind == _ast.SyntaxKind.ExportDirective && e.expression.kind == _ast.SyntaxKind.TypeDeclaration) {
                  e.expression.ty = scope.defineType(e.expression).ty;
                  return e.expression.hoisted = true;
                };
              };
            };
          };
        };
      });
      return visit.walkModule(self, m);
    },
    visitObjectDestructure: function visitObjectDestructure(i) {
      var self = this;
      i.scope = scope;
      return i.members.forEach(function (m) {
        if (importDirective._module) {
          var e = importDirective._module.exports[m.local.name];
          if (e.expression.kind == _ast.SyntaxKind.TraitDeclaration || e.expression.kind == _ast.SyntaxKind.TypeDeclaration) {
            return scope.defineType(e.expression);
          } else {
            return scope.define({
              name: m.local.name,
              mutable: false,
              token: m
            });
          };
        } else {
          return scope.define({
            name: m.local.name,
            mutable: false,
            token: m
          });
        };
      });
    },
    visitTraitDeclaration: function visitTraitDeclaration(t) {
      var self = this;
      scope = (0, _scope.createScope)(context, file, scope);
      t.scope = scope;
      visit.walkTraitDeclaration(self, t);
      t.ty.functions = (0, _core.objectFromList)(t.members.map(function (m) {
        return [m.name.name, m.ty];
      }));
      return scope = scope.parent;
    },
    visitFunctionTypeBound: function visitFunctionTypeBound(t) {
      var self = this;
      scope = (0, _scope.createScope)(context, file, scope);
      t.scope = scope;
      (0, _types.visitFunctionTypeBound)(self, reportError, t);
      return scope = scope.parent;
    },
    visitNamedTypeBound: function visitNamedTypeBound(t) {
      var self = this;
      t.scope = scope;
      return (0, _types.visitNamedTypeBound)(self, reportError, t);
    },
    visitTypeDeclaration: function visitTypeDeclaration(t) {
      var self = this;
      scope = (0, _scope.createScope)(context, file, scope);
      t.scope = scope;
      visit.walkTypeDeclaration(self, t);
      t.ty.properties = (0, _core.objectFromList)(t.properties.map(function (p) {
        return [p.name.name, p.typeBound.ty];
      }));
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
      d.scope = scope;
      if (d.typeBound) {
        self.visitTypeBound(d.typeBound);
      };
      return d.ty = (0, _types.getType)(d.scope, d.typeBound);
    },
    visitExportDirective: function visitExportDirective(e) {
      var self = this;
      e.scope = scope;
      return visit.walkExportDirective(self, e);
    },
    visitImportDirective: function visitImportDirective(i) {
      var self = this;
      if (i.hoisted) {
        return _js._undefined;
      };
      i.scope = scope;
      if (i.specifier.kind == _ast.SyntaxKind.Identifier) {
        return scope.define({
          name: i.specifier.name,
          mutable: false,
          token: i
        });
      } else {
        if (i.specifier.kind == _ast.SyntaxKind.ObjectDestructure) {
          importDirective = i;
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
}
