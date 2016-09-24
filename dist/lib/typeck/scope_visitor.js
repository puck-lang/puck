#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScopeVisitor = ScopeVisitor;

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

var _types = require('./src/types.js');

var _entities = require('./../entities.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function ScopeVisitor(context, file) {
  var scope = void 0;
  var importDirective = void 0;
  var reportError = context.reportError.bind(context, file);
  function reportNotAssignableError(t, to, subject) {
    return reportError(t, subject.name + " is not assignable to type " + to.name);
  };
  function checkFunctionType(binding, c) {
    if (!binding.ty) {
      return _js._undefined;
    };
    var name = binding.ty.name;
    if (!binding.ty._arguments) {
      reportError(c, "" + name + " is not callable");
    };
    (0, _range.checkRange)(c.argumentList, binding.ty.argumentRange, reportError, "arguments", binding.name, c);
    return c.argumentList.forEach(function (argument, i) {
      var parameter = binding.ty._arguments[i];
      if (!(0, _types.isAssignable)(parameter.ty, argument.ty)) {
        reportNotAssignableError(argument, parameter.ty, argument.ty);
      };
      if (parameter.mutable && argument.kind == _ast.SyntaxKind.Identifier) {
        var argumentName = argument.name;
        var argumentBinding = scope.getBinding(argumentName);
        if (!argumentBinding.mutable) {
          var __PUCK__value__1 = void 0;
          if (c.func.kind == _ast.SyntaxKind.Identifier) {
            __PUCK__value__1 = c.func.name;
          } else {
            __PUCK__value__1 = "function";
          };
          var functionName = __PUCK__value__1;
          var __PUCK__value__2 = void 0;
          if (parameter.identifier) {
            __PUCK__value__2 = parameter.identifier.name;
          } else {
            __PUCK__value__2 = i;
          };
          var parameterName = __PUCK__value__2;
          return reportError(argument, "Parameter " + parameterName + " of " + functionName + " requires a mutable binding " + "but " + argumentName + " is declared as immutable.");
        };
      };
    });
  };
  function getBinding(token) {
    if (token.kind == _ast.SyntaxKind.Identifier) {
      return token.scope.getBinding(token.name);
    } else {
      if (token.kind == _ast.SyntaxKind.MemberAccess) {
        return getBinding(token.object);
      } else {
        if (token.kind == _ast.SyntaxKind.IndexAccess) {
          return getBinding(token.object);
        };
      };
    };
  };
  return _js._Object.assign({}, visit.Visitor, {
    visitBlock: function visitBlock(b) {
      var self = this;
      b.scope = scope;
      b.expressions.forEach(function (e) {
        if (e.kind == _ast.SyntaxKind.Function) {
          e.hoisting = true;
          self.visitFunctionDeclaration(e);
          e.hoisted = true;
        };
        if (e.kind == _ast.SyntaxKind.ExportDirective && e.expression.kind == _ast.SyntaxKind.Function) {
          e.expression.hoisting = true;
          self.visitFunctionDeclaration(e.expression);
          return e.expression.hoisted = true;
        };
      });
      return visit.walkBlock(self, b);
    },
    visitFunctionDeclaration: function visitFunctionDeclaration(f) {
      var self = this;
      if (!f.hoisting || !f.hoisted) {
        scope = (0, _scope.createScope)(context, file, scope);
        f.scope = scope;
        (0, _functions.visitFunctionDeclarationFrame)(self, reportError, f);
      };
      if (!f.hoisting || f.hoisted) {
        scope = f.scope;
        f.parameterList.forEach(self.visitVariableDeclaration.bind(self));
        if (f.body) {
          self.visitBlock(f.body);
        };
      };
      return scope = scope.parent;
    },
    visitIdentifier: function visitIdentifier(i) {
      var self = this;
      i.scope = scope;
      var binding = i.scope.getBinding(i.name);
      if (!binding) {
        reportError(i, "Use of undefined variable " + i.name);
      } else {
        i.ty = binding.ty;
      };
      return visit.walkIdentifier(self, i);
    },
    visitImplDeclaration: function visitImplDeclaration(i) {
      var self = this;
      scope = (0, _scope.createScope)(context, file, scope);
      i.scope = scope;
      visit.walkImplDeclaration(self, i);
      if (!(0, _entities.isTrait)(i.tra.ty)) {
        reportError(i.tra, i.tra.ty.name + " is not a trait");
      };
      if (!(0, _entities.isStruct)(i.ty.ty)) {
        reportError(i.ty, i.ty.ty.name + " is not a type");
      };
      if (i.ty.ty.implementations.some(function (imp) {
        return (0, _types.isSameType)(imp.tra.ty, i.tra.ty);
      })) {
        reportError(i, i.tra.ty.name + " has already been implemented for " + i.ty.ty.name);
      };
      var functions = i.members.reduce(function (functions, member) {
        functions[member.ty.name] = member.ty;
        return functions;
      }, {});
      var traitFunctions = i.tra.ty.functions;
      _js._Object.keys(traitFunctions).forEach(function (name) {
        if (traitFunctions[name].isAbstract && !functions[name]) {
          return reportError(i, "Function " + i.tra.ty.name + "::" + name + " is not implemented for " + i.ty.ty.name);
        };
      }, {});
      i.members.forEach(function (_function) {
        if (!traitFunctions[_function.ty.name]) {
          return reportError(i, "Function " + _function.ty.name + " is not defined by " + i.tra.ty.name);
        };
      });
      i.ty.ty.implementations.push({
        ty: i.ty,
        tra: i.tra
      });
      return scope = scope.parent;
    },
    visitModule: function visitModule(m) {
      var self = this;
      scope = m.scope;
      return visit.walkModule(self, m);
    },
    visitObjectDestructure: function visitObjectDestructure(i) {
      var self = this;
      return i.members.forEach(function (m) {
        if (importDirective._module) {
          var e = importDirective._module.exports[m.local.name];
          if (e.expression.kind == _ast.SyntaxKind.TraitDeclaration || e.expression.kind == _ast.SyntaxKind.TypeDeclaration) {
            var binding = scope.getTypeBinding(m.local.name);
            return binding.ty = e.expression.ty;
          };
        };
      });
    },
    visitTraitDeclaration: function visitTraitDeclaration(t) {
      var self = this;
      scope = t.scope;
      visit.walkTraitDeclaration(self, t);
      return scope = scope.parent;
    },
    visitFunctionTypeBound: function visitFunctionTypeBound(t) {
      var self = this;
      if (!t.scope) {
        scope = (0, _scope.createScope)(context, file, scope);
        t.scope = scope;
        (0, _types.visitFunctionTypeBound)(self, reportError, t);
        return scope = scope.parent;
      };
    },
    visitNamedTypeBound: function visitNamedTypeBound(t) {
      var self = this;
      if (!t.scope) {
        t.scope = scope;
        return (0, _types.visitNamedTypeBound)(self, reportError, t);
      };
    },
    visitTypeDeclaration: function visitTypeDeclaration(t) {},
    visitTypeParameter: function visitTypeParameter(t) {
      var self = this;
      if (!t.scope) {
        t.scope = scope;
        scope.defineType(t);
        return visit.walkTypeParameter(self, t);
      };
    },
    visitVariableDeclaration: function visitVariableDeclaration(d) {
      var self = this;
      if (d.binding) {
        return _js._undefined;
      };
      if (!d.scope) {
        d.scope = scope;
        if (d.typeBound) {
          self.visitTypeBound(d.typeBound);
        };
        d.ty = (0, _types.getType)(d.scope, d.typeBound);
      };
      var binding = d.scope.define({
        name: d.identifier.name,
        mutable: d.mutable,
        token: d,
        ty: d.ty
      }, true);
      d.binding = binding;
      if (d.initializer) {
        self.visitExpression(d.initializer);
        if (!binding.ty) {
          return binding.ty = d.initializer.ty;
        } else {
          if (!(0, _types.isAssignable)(binding.ty, d.initializer.ty)) {
            return reportNotAssignableError(d, binding.ty, d.initializer.ty);
          };
        };
      };
    },
    visitExportDirective: function visitExportDirective(e) {
      var self = this;
      return visit.walkExportDirective(self, e);
    },
    visitImportDirective: function visitImportDirective(i) {
      var self = this;
      if (i.specifier.kind == _ast.SyntaxKind.ObjectDestructure) {
        importDirective = i;
        return visit.walkImportDirective(self, i);
      };
    },
    visitAssignmentExpression: function visitAssignmentExpression(e) {
      var self = this;
      e.scope = scope;
      visit.walkAssignmentExpression(self, e);
      var binding = void 0;;
      if (binding = getBinding(e.lhs)) {
        if (!binding.mutable) {
          reportError(e, "Can't assign to immutable variable " + binding.name);
        };
        if (!(0, _types.isAssignable)(e.lhs.ty, e.rhs.ty)) {
          return reportNotAssignableError(e, e.lhs.ty, e.rhs.ty);
        };
      };
    },
    visitBinaryExpression: function visitBinaryExpression(e) {
      var self = this;
      e.scope = scope;
      return visit.walkBinaryExpression(self, e);
    },
    visitCallExpression: function visitCallExpression(e) {
      var self = this;
      e.scope = scope;
      visit.walkCallExpression(self, e);
      if (e.func.ty) {
        checkFunctionType(e.func, e);
        return e.ty = e.func.ty.returnType;
      };
    },
    visitForExpression: function visitForExpression(e) {
      var self = this;
      scope = (0, _scope.createScope)(context, file, scope);
      e.scope = scope;
      visit.walkForExpression(self, e);
      return scope = scope.parent;
    },
    visitIfExpression: function visitIfExpression(e) {
      var self = this;
      scope = (0, _scope.createScope)(context, file, scope);
      e.scope = scope;
      visit.walkIfExpression(self, e);
      return scope = scope.parent;
    },
    visitLoopExpression: function visitLoopExpression(e) {
      var self = this;
      scope = (0, _scope.createScope)(context, file, scope);
      e.scope = scope;
      visit.walkLoopExpression(self, e);
      return scope = scope.parent;
    },
    visitUnaryExpression: function visitUnaryExpression(e) {
      var self = this;
      e.scope = scope;
      visit.walkUnaryExpression(self, e);
      var __PUCK__value__4 = void 0;
      if (e.operator.kind == _ast.SyntaxKind.NotKeyword) {
        __PUCK__value__4 = {
          kind: "Bool",
          name: "Bool"
        };
      } else {
        var __PUCK__value__5 = void 0;
        if (e.operator.kind == _ast.SyntaxKind.MinusToken || e.operator.kind == _ast.SyntaxKind.PlusToken) {
          __PUCK__value__5 = {
            kind: "Num",
            name: "Num"
          };
        };
        __PUCK__value__4 = __PUCK__value__5;
      };
      return e.ty = __PUCK__value__4;
    },
    visitWhileExpression: function visitWhileExpression(e) {
      var self = this;
      scope = (0, _scope.createScope)(context, file, scope);
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
      l.ty = {
        kind: "Bool",
        name: "Bool"
      };
      return visit.walkBooleanLiteral(self, l);
    },
    visitNumberLiteral: function visitNumberLiteral(l) {
      var self = this;
      l.scope = scope;
      l.ty = {
        kind: "Num",
        name: "Num"
      };
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
      l.ty = {
        kind: "String",
        name: "String"
      };
      return visit.walkStringLiteral(self, l);
    }
  });
}
