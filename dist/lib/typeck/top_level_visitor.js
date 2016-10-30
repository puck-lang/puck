#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopLevelVisitor = TopLevelVisitor;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _ast = require('./../ast/ast.js');

var _visit = require('./../ast/visit.js');

var visit = _interopRequireWildcard(_visit);

var _ast2 = require('./../compiler/ast.js');

var _scope = require('./src/scope.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function TopLevelVisitor(context, file) {
  var scope = (0, _scope.createScope)(context, file);
  return _js._Object.assign({}, visit.emptyVisitor, {
    visitBlock: function visitBlock(b) {},
    visitEnumDeclaration: function visitEnumDeclaration(t) {
      var self = this;
      return scope.defineType(t);
    },
    visitFunctionDeclaration: function visitFunctionDeclaration(f) {
      var self = this;
      if (_core.MaybeTrait['$Maybe'].isJust.call(f.name)) {
        return scope.define({
          name: f.name.value[0].name,
          token: f,
          mutable: false
        });
      };
    },
    visitModule: function visitModule(m) {
      var self = this;
      m.scope = scope;
      return visit.walkModule(self, m);
    },
    visitObjectDestructure: function visitObjectDestructure(i) {
      var self = this;
      return i.members.forEach(function (m) {
        return scope.define({
          name: m.local.name,
          mutable: false,
          token: m
        }, true);
      });
    },
    visitTraitDeclaration: function visitTraitDeclaration(t) {
      var self = this;
      return scope.defineType(t);
    },
    visitTypeDeclaration: function visitTypeDeclaration(t) {
      var self = this;
      return scope.defineType(t);
    },
    visitVariableDeclaration: function visitVariableDeclaration(d) {
      var self = this;
      return scope.define({
        name: d.identifier.name,
        mutable: d.mutable,
        token: d
      }, true);
    },
    visitExportDirective: function visitExportDirective(e) {
      var self = this;
      return visit.walkExportDirective(self, e);
    },
    visitImportDirective: function visitImportDirective(i) {
      var self = this;
      if (i.specifier.kind == _ast2.SyntaxKind.Identifier) {
        return scope.define({
          name: i.specifier.name,
          mutable: false,
          token: i
        });
      } else {
        if (i.specifier.kind == _ast2.SyntaxKind.ObjectDestructure) {
          return visit.walkImportDirective(self, i);
        };
      };
    }
  });
}
