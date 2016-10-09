#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImplVisitor = ImplVisitor;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _util = require('util');

var _js = require('puck-lang/dist/lib/stdlib/js');

require('./../ast/ast.js');

var _visit = require('./../ast/visit.js');

var visit = _interopRequireWildcard(_visit);

var _ast = require('./../compiler/ast.js');

var _functions = require('./src/functions.js');

var _range = require('./src/range.js');

var _scope = require('./src/scope.js');

var _structure_visitor = require('./src/structure_visitor.js');

var _types = require('./src/types.js');

var _entities = require('./../entities.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function ImplVisitor(context, file) {
  var importDirective = void 0;
  var reportError = context.reportError.bind(context, file);
  return _js._Object.assign({}, visit.emptyVisitor, _structure_visitor.structureVisitor, {
    reportError: reportError,
    visitImplDeclaration: function visitImplDeclaration(i) {
      var self = this;
      self.scope = (0, _scope.createScope)(context, file, self.scope);
      i.scope = self.scope;
      visit.walkImplDeclaration(self, i);
      var _trait = i.tra.ty;
      var struct = i.ty.ty;
      if (!(0, _entities.isTrait)(_trait)) {
        reportError(i.tra, _trait.name + " is not a trait");
      };
      if (!(0, _entities.isStruct)(struct)) {
        reportError(i.ty, struct.name + " is not a type");
      };
      var __PUCK__value__1 = void 0;
      if ((0, _entities.isTypeInstance)(struct) && struct.typeParameters.some(function (p) {
        return p.isTypeParameter;
      })) {
        __PUCK__value__1 = struct._class;
      } else {
        __PUCK__value__1 = struct;
      };
      struct = __PUCK__value__1;
      if (struct.implementations.some(function (imp) {
        return (0, _types.isSameType)(imp.tra, _trait);
      })) {
        reportError(i, _trait.name + " has already been implemented for " + struct.name);
      };
      var functions = i.members.reduce(function (functions, member) {
        functions[member.ty.name] = member.ty;
        return functions;
      }, {});
      var traitName = _trait.name;
      var traitFunctions = _trait.functions;
      _js._Object.keys(traitFunctions).forEach(function (name) {
        if (traitFunctions[name].isAbstract && !functions[name]) {
          return reportError(i, "Function " + traitName + "::" + name + " is not implemented for " + struct.name);
        };
      }, {});
      i.members.forEach(function (_function) {
        var traitFunction = traitFunctions[_function.ty.name];
        if (!traitFunction) {
          reportError(i, "Function " + _function.ty.name + " is not defined by " + i.tra.ty.name);
        };
        if (_function.ty.selfBinding && !traitFunction.selfBinding) {
          reportError(_function, "Function " + traitName + "::" + traitFunction.name + " is static");
        };
        if (!_function.ty.selfBinding && traitFunction.selfBinding) {
          reportError(_function, "Function " + traitName + "::" + traitFunction.name + " requires a self parameter");
        };
        if (_function.ty.selfBinding && traitFunction.selfBinding) {
          if (_function.ty.selfBinding.mutable && !traitFunction.selfBinding.mutable) {
            reportError(_function, "Function " + traitName + "::" + traitFunction.name + " requires an immutable self parameter");
          };
        };
        var error = void 0;;
        if (error = (0, _functions.checkFunctionAssignability)(traitFunction, _function.ty)) {
          return reportError(_function, error);
        };
      });
      struct.implementations.push({
        ty: struct,
        tra: _trait
      });
      return self.scope = self.scope.parent;
    },
    visitModule: function visitModule(m) {
      var self = this;
      self.scope = m.scope;
      return m.expressions.filter(function (e) {
        return e.kind == _ast.SyntaxKind.ImportDirective || e.kind == _ast.SyntaxKind.ImplDeclaration;
      }).forEach(self.visitExpression.bind(self));
    },
    visitObjectDestructure: function visitObjectDestructure(i) {
      var self = this;
      return i.members.forEach(function (m) {
        if (importDirective._module) {
          var e = importDirective._module.exports[m.local.name];
          if (e.expression.kind == _ast.SyntaxKind.TraitDeclaration) {
            var binding = self.scope.getTypeBinding(m.local.name);
            binding.ty = e.expression.ty;
            binding = self.scope.getBinding(m.local.name);
            binding.ty = e.expression.ty;
          };
          if (e.expression.kind == _ast.SyntaxKind.TypeDeclaration) {
            var _binding = self.scope.getTypeBinding(m.local.name);
            return _binding.ty = e.expression.ty;
          };
        };
      });
    },
    visitImportDirective: function visitImportDirective(i) {
      var self = this;
      if (i.specifier.kind == _ast.SyntaxKind.ObjectDestructure) {
        importDirective = i;
        return visit.walkImportDirective(self, i);
      };
    }
  });
}
