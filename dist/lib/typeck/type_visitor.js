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

var _scope = require('./src/scope.js');

var _structure_visitor = require('./src/structure_visitor.js');

var _types = require('./src/types.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function TypeVisitor(context, file) {
  var importDirective = void 0;
  var reportError = context.reportError.bind(context, file);
  return _js._Object.assign({}, visit.emptyVisitor, _structure_visitor.structureVisitor, {
    scope: (0, _scope.createScope)(context, file),
    reportError: reportError,
    visitModule: function visitModule(m) {
      var self = this;
      m.scope = self.scope;
      var expressions = m.expressions.filter(function (e) {
        return e.kind == _ast.SyntaxKind.ImportDirective || e.kind == _ast.SyntaxKind.TraitDeclaration || e.kind == _ast.SyntaxKind.TypeDeclaration || e.kind == _ast.SyntaxKind.ExportDirective && (e.expression.kind == _ast.SyntaxKind.TraitDeclaration || e.expression.kind == _ast.SyntaxKind.TypeDeclaration);
      });
      expressions.forEach(function (e) {
        self.visitExpression(e);
        return e.hoisted = true;
      });
      return expressions.forEach(self.visitExpression.bind(self));
    },
    visitObjectDestructure: function visitObjectDestructure(i) {
      var self = this;
      i.scope = self.scope;
      return i.members.forEach(function (m) {
        if (importDirective._module) {
          var e = importDirective._module.exports[m.local.name];
          if (e.expression.kind == _ast.SyntaxKind.TraitDeclaration) {
            self.scope.defineType(e.expression);
            return self.scope.define({
              name: m.local.name,
              mutable: false,
              token: m
            });
          } else {
            if (e.expression.kind == _ast.SyntaxKind.TypeDeclaration) {
              return self.scope.defineType(e.expression);
            } else {
              return self.scope.define({
                name: m.local.name,
                mutable: false,
                token: m
              });
            };
          };
        } else {
          return self.scope.define({
            name: m.local.name,
            mutable: false,
            token: m
          });
        };
      });
    },
    visitTraitDeclaration: function visitTraitDeclaration(t) {
      var self = this;
      if (!t.ty) {
        t.ty = self.scope.defineType(t).ty;
        return t.binding = self.scope.define({
          name: t.name.name,
          mutable: false,
          token: t,
          ty: t.ty
        });
      } else {
        self.scope = (0, _scope.createScope)(context, file, self.scope);
        t.scope = self.scope;
        visit.walkTraitDeclaration(self, t);
        _js._Object.assign(t.ty.functions, (0, _core.objectFromList)(t.members.map(function (m) {
          return [m.name.name, m.ty];
        })));
        return self.scope = self.scope.parent;
      };
    },
    visitTypeDeclaration: function visitTypeDeclaration(t) {
      var self = this;
      if (!t.ty) {
        return t.ty = self.scope.defineType(t).ty;
      } else {
        self.scope = (0, _scope.createScope)(context, file, self.scope);
        t.scope = self.scope;
        visit.walkTypeDeclaration(self, t);
        _js._Object.assign(t.ty.properties, (0, _core.objectFromList)(t.properties.map(function (p) {
          return [p.name.name, p.typeBound.ty];
        })));
        return self.scope = self.scope.parent;
      };
    },
    visitTypeProperty: visit.walkingVisitor.visitTypeProperty,
    visitExportDirective: function visitExportDirective(e) {
      var self = this;
      e.scope = self.scope;
      return visit.walkExportDirective(self, e);
    },
    visitImportDirective: function visitImportDirective(i) {
      var self = this;
      if (i.hoisted) {
        return _js._undefined;
      };
      i.scope = self.scope;
      if (i.specifier.kind == _ast.SyntaxKind.Identifier) {
        return self.scope.define({
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
    }
  });
}
