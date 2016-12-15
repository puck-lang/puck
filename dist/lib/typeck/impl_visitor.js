#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.ImplVisitor = ImplVisitor;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _util = require('util');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _ast = require('./../ast/ast.js');

var _visit = require('./../ast/visit.js');

var visit = _interopRequireWildcard(_visit);

var _ast2 = require('./../compiler/ast.js');

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
      var _trait = i.trait_.type_;
      var struct = i.type_.type_;
      if (!(0, _entities.isTrait)(_trait)) {
        reportError(i.trait_, _trait.name + " is not a trait");
      };
      if (!(0, _entities.isStruct)(struct)) {
        reportError(i.type_, struct.name + " is not a type");
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
        return (0, _types.isSameType)(imp.trait_, _trait);
      })) {
        reportError(i, _trait.name + " has already been implemented for " + struct.name);
      };
      var functions = i.members.reduce(function (functions, member) {
        functions[member.type_.name] = member.type_;
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
        var traitFunction = traitFunctions[_function.type_.name];
        if (!traitFunction) {
          reportError(i, "Function " + _function.type_.name + " is not defined by " + i.trait_.type_.name);
        };
        if (_function.type_.selfBinding && !traitFunction.selfBinding) {
          reportError(_function, "Function " + traitName + "::" + traitFunction.name + " is static");
        };
        if (!_function.type_.selfBinding && traitFunction.selfBinding) {
          reportError(_function, "Function " + traitName + "::" + traitFunction.name + " requires a self parameter");
        };
        if (_function.type_.selfBinding && traitFunction.selfBinding) {
          if (_function.type_.selfBinding.mutable && !traitFunction.selfBinding.mutable) {
            reportError(_function, "Function " + traitName + "::" + traitFunction.name + " requires an immutable self parameter");
          };
        };
        var __PUCK__value__2 = (0, _functions.checkFunctionAssignability)(traitFunction, _function.type_);
        if (__PUCK__value__2.kind == "Err") {
          var _PUCK__value__2$valu = _slicedToArray(__PUCK__value__2.value, 1);

          var error = _PUCK__value__2$valu[0];

          return reportError(_function, error);
        };
      });
      struct.implementations.push({
        type_: struct,
        trait_: _trait
      });
      return self.scope = self.scope.parent;
    },
    visitModule: function visitModule(m) {
      var self = this;
      self.scope = m.scope;
      return m.expressions.filter(function (e) {
        return e.kind == _ast2.SyntaxKind.ImportDirective || e.kind == _ast2.SyntaxKind.ImplDeclaration;
      }).forEach(self.visitExpression.bind(self));
    },
    visitObjectDestructure: function visitObjectDestructure(i) {
      var self = this;
      return i.members.forEach(function (m) {
        if (importDirective._module) {
          var e = importDirective._module.exports[m.local.name];
          if (e.expression.kind == _ast2.SyntaxKind.TraitDeclaration) {
            var binding = self.scope.getTypeBinding(m.local.name);
            binding.type_ = e.expression.type_;
            binding = self.scope.getBinding(m.local.name);
            binding.type_ = e.expression.type_;
          };
          if (e.expression.kind == _ast2.SyntaxKind.TypeDeclaration) {
            var _binding = self.scope.getTypeBinding(m.local.name);
            return _binding.type_ = e.expression.type_;
          };
        };
      });
    },
    visitImportDirective: function visitImportDirective(i) {
      var self = this;
      if (i.specifier.kind == _ast2.SyntaxKind.ObjectDestructure) {
        importDirective = i;
        return visit.walkImportDirective(self, i);
      };
    }
  });
}
