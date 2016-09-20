#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopScopeVisitor = TopScopeVisitor;
exports.ScopeVisitor = ScopeVisitor;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _util = require('util');

var _js = require('puck-lang/dist/lib/stdlib/js');

require('./../ast/ast.js');

var _visit = require('./../ast/visit.js');

var visit = _interopRequireWildcard(_visit);

var _ast = require('./../compiler/ast.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function getType(scope, t) {
  var name = arguments.length <= 2 || arguments[2] === undefined ? _js._undefined : arguments[2];

  if (!t) {
    return _js._undefined;
  };
  if (t.name) {
    var binding = scope.getTypeBinding(t.name.name);
    return binding && binding.ty;
  } else {
    var _arguments = t.parameters.map(function (p) {
      return { ty: getType(scope, p) };
    });
    var returnType = getType(scope, t.returnType);
    return {
      kind: "Function",
      name: getFunctionTypeName(_arguments, returnType),
      _arguments: _arguments,
      argumentRange: {
        min: _arguments.length,
        max: _arguments.length
      },
      returnType: returnType
    };
  };
};
function getFunctionTypeName(_arguments, returnType) {
  return "(" + _arguments.map(function (a) {
    return a && a.name || "??";
  }).join(", ") + ") => " + (returnType && returnType.name || "??");
};
function getMinMax(parameters, isOptional, reportError, name) {
  var firstOptional = parameters.length;
  var hasOptional = false;
  parameters.forEach(function (parameter, i) {
    if (isOptional(parameter) && !hasOptional) {
      hasOptional = true;
      return firstOptional = i;
    } else {
      if (!isOptional(parameter) && hasOptional) {
        return reportError(parameter, "An optional " + name + " can't be followed by a required " + name + "");
      };
    };
  });
  return {
    min: firstOptional,
    max: parameters.length
  };
};
function isAssignable(to, subject) {
  if (!subject || !to) {
    return true;
  };
  var sameKind = subject.kind == to.kind;
  if (!sameKind) {
    return false;
  };
  if (sameKind && to.kind == "Function") {
    if (to.argumentRange.min < subject.argumentRange.min || to.argumentRange.max > subject.argumentRange.max) {
      return false;
    };
    return to._arguments.every(function (toArg, i) {
      var subjectArg = subject._arguments[i];
      return isAssignable(toArg, subjectArg);
    });
  } else {
    return true;
  };
};
function checkMinMax(_arguments, minMax, reportError, argumentName, subjectName, token) {
  var argumentCount = _arguments.length;
  var max = minMax.max;
  var min = minMax.min;
  var __PUCK__value__1 = void 0;
  if (argumentCount < min) {
    __PUCK__value__1 = "few";
  } else {
    var __PUCK__value__2 = void 0;
    if (argumentCount > max) {
      __PUCK__value__2 = "many";
    };
    __PUCK__value__1 = __PUCK__value__2;
  };
  var error = __PUCK__value__1;
  if (error) {
    var __PUCK__value__3 = void 0;
    if (min == max) {
      __PUCK__value__3 = min;
    } else {
      __PUCK__value__3 = "" + min + " to " + max + "";
    };
    var required = __PUCK__value__3;
    return reportError(token, "Too " + error + " " + argumentName + " given to " + subjectName + ", " + required + " required, " + argumentCount + " given");
  };
};
function createFunctionType(scope, f, reportError) {
  var _arguments = f.parameterList.map(function (p) {
    return {
      identifier: p.identifier,
      mutable: p.mutable,
      ty: getType(scope, p.typeBound, p.identifier.name)
    };
  });
  var returnType = getType(scope, f.returnType);
  var __PUCK__value__4 = void 0;
  if (f.parameterList) {
    __PUCK__value__4 = getMinMax(f.parameterList, function (p) {
      return p.initializer;
    }, reportError, "parameter");
  } else {
    __PUCK__value__4 = {
      min: 0,
      max: 0
    };
  };
  return {
    kind: "Function",
    name: f.name || getFunctionTypeName(_arguments, returnType),
    _arguments: _arguments,
    argumentRange: __PUCK__value__4,
    returnType: returnType
  };
};
function createScope(context, file) {
  var parent = arguments.length <= 2 || arguments[2] === undefined ? _js._undefined : arguments[2];

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
      var allowRedeclare = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      var name = binding.identifier.name;
      binding.redefined = bindings[name] != _js._undefined;
      if (binding.redefined) {
        if (!allowRedeclare) {
          reportError(binding.token, "" + name + " has already been declared in the scope");
        };
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
      var __PUCK__value__5 = void 0;
      if (t.parameters && t.parameters.length) {
        __PUCK__value__5 = getMinMax(t.parameters, function (p) {
          return p.defaultValue;
        }, reportError, "type parameter");
      };
      var parameterRange = __PUCK__value__5;
      var binding = {
        kind: name,
        name: name,
        parameterRange: parameterRange
      };
      if (!parameterRange) {
        binding.ty = binding;
      };
      return typeBindings[name] = binding;
    },
    inspect: function inspect(depth, opts) {
      var scope = {};
      if (parent) {
        scope["[parent]"] = parent.inspect();
      };
      _js._Object.assign(scope, bindings);
      if (!depth && !opts) {
        return scope;
      } else {
        return (0, _util.inspect)(scope, _js._Object.assign({}, opts, { depth: depth }));
      };
    }
  };
};
function defineFunction(scope, f) {
  var reportError = arguments.length <= 2 || arguments[2] === undefined ? _js._undefined : arguments[2];

  if (reportError) {
    f.ty = createFunctionType(scope, f, reportError);
  };
  if (f.name) {
    return scope.define({
      identifier: f.name,
      token: f,
      mutable: false,
      ty: f.ty
    });
  };
};
function definedHosted(scope, expressions, reportError) {
  return expressions.forEach(function (e) {
    if (e.kind == _ast.SyntaxKind.Function) {
      defineFunction(scope, e, reportError);
      e.hoisted = true;
    };
    if (e.kind == _ast.SyntaxKind.ExportDirective && e.expression.kind == _ast.SyntaxKind.Function) {
      defineFunction(scope, e.expression, reportError);
      return e.expression.hoisted = true;
    };
  });
};
function definedHostedTopLevel(visitor, scope, expressions) {
  return expressions.forEach(function (e) {
    if (e.kind == _ast.SyntaxKind.ImportDirective) {
      visitor.visitImportDirective(e);
      return e.hoisted = true;
    } else {
      if (e.kind == _ast.SyntaxKind.TraitDeclaration || e.kind == _ast.SyntaxKind.TypeDeclaration) {
        scope.defineType(e);
        return e.hoisted = true;
      } else {
        if (e.kind == _ast.SyntaxKind.ExportDirective && (e.expression.kind == _ast.SyntaxKind.TraitDeclaration || e.expression.kind == _ast.SyntaxKind.TypeDeclaration)) {
          scope.defineType(e.expression);
          return e.expression.hoisted = true;
        };
      };
    };
  });
};
function TopScopeVisitor(context, file) {
  var scope = createScope(context, file);
  return _js._Object.assign({}, visit.Visitor, {
    visitBlock: function visitBlock(b) {},
    visitFunctionDeclaration: function visitFunctionDeclaration(f) {
      var self = this;
      return defineFunction(scope, f);
    },
    visitIdentifier: function visitIdentifier(i) {},
    visitModule: function visitModule(m) {
      var self = this;
      m.scope = scope;
      return visit.walkModule(self, m);
    },
    visitObjectDestructure: function visitObjectDestructure(i) {
      var self = this;
      return i.members.forEach(function (m) {
        return scope.define({
          identifier: m.local,
          mutable: false,
          token: m
        }, true);
      });
    },
    visitTraitDeclaration: function visitTraitDeclaration(t) {
      var self = this;
      return scope.defineType(t);
    },
    visitTypeBound: function visitTypeBound(t) {},
    visitTypeDeclaration: function visitTypeDeclaration(t) {
      var self = this;
      return scope.defineType(t);
    },
    visitVariableDeclaration: function visitVariableDeclaration(d) {
      var self = this;
      return scope.define({
        identifier: d.identifier,
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
      if (i.specifier.kind == _ast.SyntaxKind.Identifier) {
        return scope.define({
          identifier: i.specifier,
          mutable: false,
          token: i
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
  var scope = createScope(context, file);
  var reportError = context.reportError.bind(context, file);
  function reportNotAssignableError(t, to, subject) {
    return reportError(t, subject.name + " is not assignable to type " + to.name);
  };
  function checkFunctionType(binding, c) {
    if (!binding.ty) {
      return _js._undefined;
    };
    var name = binding.identifier.name;
    if (!binding.ty._arguments) {
      reportError(c, "" + name + " is not callable");
    };
    checkMinMax(c.argumentList, binding.ty.argumentRange, reportError, "arguments", name, c);
    return c.argumentList.forEach(function (argument, i) {
      var parameter = binding.ty._arguments[i];
      if (!isAssignable(parameter.ty, argument.ty)) {
        reportNotAssignableError(argument, parameter.ty, argument.ty);
      };
      if (parameter.mutable && argument.kind == _ast.SyntaxKind.Identifier) {
        var argumentName = argument.name;
        var argumentBinding = scope.getBinding(argumentName);
        if (!argumentBinding.mutable) {
          var __PUCK__value__6 = void 0;
          if (c.func.kind == _ast.SyntaxKind.Identifier) {
            __PUCK__value__6 = c.func.name;
          } else {
            __PUCK__value__6 = "function";
          };
          var functionName = __PUCK__value__6;
          var __PUCK__value__7 = void 0;
          if (parameter.identifier) {
            __PUCK__value__7 = parameter.identifier.name;
          } else {
            __PUCK__value__7 = i;
          };
          var parameterName = __PUCK__value__7;
          return reportError(argument, "Parameter " + parameterName + " of " + functionName + " requires a mutable binding " + "but " + argumentName + " is declared as immutable.");
        };
      };
    });
  };
  return _js._Object.assign({}, visit.Visitor, {
    visitBlock: function visitBlock(b) {
      var self = this;
      b.scope = scope;
      definedHosted(scope, b.block, reportError);
      return visit.walkBlock(self, b);
    },
    visitFunctionDeclaration: function visitFunctionDeclaration(f) {
      var self = this;
      if (!f.hoisted) {
        defineFunction(scope, f, reportError);
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
      m.scope = scope;
      definedHostedTopLevel(self, scope, m.lines);
      definedHosted(scope, m.lines, reportError);
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
              mutable: false,
              token: m
            });
          };
        } else {
          return scope.define({
            identifier: m.local,
            mutable: false,
            token: m
          });
        };
      });
    },
    visitTraitDeclaration: function visitTraitDeclaration(t) {
      var self = this;
      scope = createScope(context, file, scope);
      t.scope = scope;
      visit.walkTraitDeclaration(self, t);
      return scope = scope.parent;
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
      if (binding.parameterRange) {
        checkMinMax(t.parameters, binding.parameterRange, reportError, "type parameters", t.name.name, t);
      } else {
        if (t.parameters.length > 0) {
          reportError(t, "Type " + t.name.name + " is not generic");
        };
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
      d.scope = scope;
      if (d.typeBound) {
        self.visitTypeBound(d.typeBound);
      };
      var binding = scope.define({
        identifier: d.identifier,
        mutable: d.mutable,
        token: d,
        ty: getType(scope, d.typeBound)
      }, true);
      if (d.initializer) {
        self.visitExpression(d.initializer);
        if (!binding.ty) {
          return binding.ty = d.initializer.ty;
        } else {
          if (!isAssignable(binding.ty, d.initializer.ty)) {
            return reportNotAssignableError(d, binding.ty, d.initializer.ty);
          };
        };
      };
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
          identifier: i.specifier,
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
    visitAssignmentExpression: function visitAssignmentExpression(e) {
      var self = this;
      e.scope = scope;
      visit.walkAssignmentExpression(self, e);
      if (e.lhs.kind == _ast.SyntaxKind.Identifier) {
        var binding = e.scope.getBinding(e.lhs.name);
        if (!binding.mutable) {
          reportError(e, "Can't assign to immutable variable " + e.lhs.name);
        };
        if (!isAssignable(binding.ty, e.rhs.ty)) {
          return reportNotAssignableError(e, binding.ty, e.rhs.ty);
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
      if (e.func.kind == _ast.SyntaxKind.Identifier) {
        var binding = scope.getBinding(e.func.name);
        return checkFunctionType(binding, e);
      };
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
