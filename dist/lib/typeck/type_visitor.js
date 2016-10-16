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

var _entities = require('./../entities.js');

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
    imports: {},
    postHoist: [],
    visitModule: function visitModule(m) {
      var self = this;
      self.scope = m.scope;
      self.scope.clearBindings();
      var expressions = m.expressions.filter(function (e) {
        return e.kind == _ast.SyntaxKind.ImportDirective || e.kind == _ast.SyntaxKind.TraitDeclaration || e.kind == _ast.SyntaxKind.TypeDeclaration || e.kind == _ast.SyntaxKind.ExportDirective && (e.expression.kind == _ast.SyntaxKind.TraitDeclaration || e.expression.kind == _ast.SyntaxKind.TypeDeclaration);
      });
      expressions.forEach(function (e) {
        self.visitExpression(e);
        return e.hoisted = true;
      });
      self.postHoist.forEach(self.visitExpression.bind(self));
      return expressions.forEach(self.visitExpression.bind(self));
    },
    visitNamedTypeBound: function visitNamedTypeBound(t) {
      var self = this;
      var binding = self.scope.getTypeBinding(t.name.name);
      if (!binding.token.scope) {
        if (!self.imports[t.name.name]) {
          reportError(t, "Scope not set for binding " + t.name.name + " but not found in imports either");
        };
        context.runTypeVisitorOnFile(self.imports[t.name.name]);
      };
      return _structure_visitor.structureVisitor.visitNamedTypeBound.call(self, t);
    },
    visitObjectDestructure: function visitObjectDestructure(i) {
      var self = this;
      i.scope = self.scope;
      return i.members.forEach(function (m) {
        if (importDirective._module) {
          var e = importDirective._module.exports[m.local.name];
          if (e.expression.kind == _ast.SyntaxKind.TraitDeclaration) {
            var typeBinding = importDirective._module.scope.getTypeBinding(m.property.name);
            self.scope.setTypeBinding(typeBinding);
            return self.scope.define({
              name: m.local.name,
              mutable: false,
              token: m
            });
          } else {
            if (e.expression.kind == _ast.SyntaxKind.TypeDeclaration) {
              var _typeBinding = importDirective._module.scope.getTypeBinding(m.property.name);
              self.scope.setTypeBinding(_typeBinding);
              return self.imports[m.local.name] = importDirective.file;
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
        t.ty = self.scope.defineType(t, true).ty;
        t.binding = self.scope.define({
          name: t.name.name,
          mutable: false,
          token: t,
          ty: t.ty
        });
        return self.postHoist.push(t);
      } else {
        if (!t.scope) {
          self.scope = (0, _scope.createScope)(context, file, self.scope);
          t.scope = self.scope;
          if (t.typeParameters) {
            t.typeParameters.forEach(function (p) {
              self.visitTypeParameter(p);
              return t.ty.typeParameters.push(p.ty);
            });
          };
          return self.scope = self.scope.parent;
        } else {
          self.scope = t.scope;
          t.members.forEach(function (t) {
            return self.visitFunctionDeclaration(t);
          });
          _js._Object.assign(t.ty.functions, _core.ObjectMapTrait.fromList(t.members.map(function (m) {
            return [m.name.name, m.ty];
          })));
          if (t.ty.instances) {
            t.ty.instances.forEach(function (instance) {
              return instance.functions = t.ty.functions;
            });
          };
          return self.scope = self.scope.parent;
        };
      };
    },
    visitTypeDeclaration: function visitTypeDeclaration(t) {
      var self = this;
      if (!t.ty) {
        t.ty = self.scope.defineType(t, true).ty;
        t.scope = (0, _scope.createScope)(context, file, self.scope);
        return self.postHoist.push(t);
      } else {
        if (!t.typeParametersAssigned) {
          self.scope = t.scope;
          t.typeParameters.forEach(function (p) {
            self.visitTypeParameter(p);
            return t.ty.typeParameters.push(p.ty);
          });
          t.typeParametersAssigned = true;
          return self.scope = self.scope.parent;
        } else {
          self.scope = t.scope;
          if (t.bound) {
            self.visitTypeBound(t.bound);
          };
          if ((0, _entities.isObjectType)(t.ty)) {
            _js._Object.assign(t.ty.properties, _core.ObjectMapTrait.fromList(t.bound.properties.map(function (p) {
              return [p.name.name, p.typeBound.ty];
            })));
          } else {
            if ((0, _entities.isTupleType)(t.ty)) {
              t.ty.properties = t.bound.properties.map(function (p) {
                return p.ty;
              });
            };
          };
          return self.scope = self.scope.parent;
        };
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
