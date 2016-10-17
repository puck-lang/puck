#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScopeVisitor = ScopeVisitor;

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

function ScopeVisitor(context, file) {
  var importDirective = void 0;
  var reportError = context.reportError.bind(context, file);
  function getBinding(token) {
    if (token.kind == _ast2.SyntaxKind.Identifier) {
      return token.scope.getBinding(token.name);
    } else {
      if (token.kind == _ast2.SyntaxKind.MemberAccess) {
        return getBinding(token.object);
      } else {
        if (token.kind == _ast2.SyntaxKind.IndexAccess) {
          return getBinding(token.object);
        };
      };
    };
  };
  function checkFunctionCall(_function, c) {
    if (!_function) {
      return _js._undefined;
    };
    var name = c.func.name || _function.name;
    if (!_function._arguments) {
      reportError(c, "" + name + " is not callable");
    };
    if (_function.selfBinding && _function.selfBinding.mutable) {
      var binding = getBinding(c.func);
      if (binding && !binding.mutable) {
        reportError(c, "" + name + " can only be called on a mutable binding");
      };
    };
    var error = void 0;;
    if (error = (0, _range.checkRange)(c.argumentList, _function.argumentRange, "arguments", name)) {
      reportError(c, error);
    };
    return c.argumentList.forEach(function (argument, i) {
      var parameter = _function._arguments[i];
      if (!(0, _types.isAssignable)(parameter.ty, argument.ty)) {
        reportError(argument, (0, _structure_visitor.notAssignableError)(parameter.ty, argument.ty));
      };
      if (parameter.mutable && argument.kind == _ast2.SyntaxKind.Identifier) {
        var argumentName = argument.name;
        var argumentBinding = argument.scope.getBinding(argumentName);
        if (!argumentBinding.mutable) {
          var __PUCK__value__2 = void 0;
          if (parameter.identifier) {
            __PUCK__value__2 = parameter.identifier.name;
          } else {
            __PUCK__value__2 = i;
          };
          var parameterName = __PUCK__value__2;
          return reportError(argument, "Parameter " + parameterName + " of " + name + " requires a mutable binding " + "but " + argumentName + " is declared as immutable.");
        };
      };
    });
  };
  function checkFunctionAssignability(to, subject, token) {
    (0, _range.checkRange)(subject._arguments, to.argumentRange, reportError, "arguments", subject.name, token);
    subject._arguments.forEach(function (subjectArgument, i) {
      var toArgument = to._arguments[i];
      if (!(0, _types.isAssignable)(toArgument.ty, subjectArgument.ty)) {
        reportError(token, "Types of parameter #" + i + " does not match. " + subjectArgument.ty.name + " is not assignable to " + toArgument.ty.name);
      };
      if (subjectArgument.mutable && !toArgument.mutable) {
        return reportError(token, "Parameter #" + i + " is required to be immutable");
      };
    });
    if (!(0, _types.isAssignable)(to.returnType, subject.returnType)) {
      return reportError(token, "Return type " + subject.returnType.name + " is not assignable to " + to.returnType.name);
    };
  };
  function defineHoisted(expressions, visitor) {
    return expressions.forEach(function (e) {
      if (e.kind == _ast2.SyntaxKind.Function) {
        e.hoisting = true;
        visitor.visitFunctionDeclaration(e);
        e.hoisted = true;
      };
      if (e.kind == _ast2.SyntaxKind.ExportDirective && e.expression.kind == _ast2.SyntaxKind.Function) {
        e.expression.hoisting = true;
        visitor.visitFunctionDeclaration(e.expression);
        return e.expression.hoisted = true;
      };
    });
  };
  return _js._Object.assign({}, visit.walkingVisitor, _structure_visitor.structureVisitor, {
    reportError: reportError,
    visitBlock: function visitBlock(b) {
      var self = this;
      b.scope = self.scope;
      defineHoisted(b.expressions, self);
      return visit.walkBlock(self, b);
    },
    visitFunctionDeclaration: function visitFunctionDeclaration(f) {
      var self = this;
      _structure_visitor.structureVisitor.visitFunctionDeclaration.call(self, f);
      if (!f.hoisting || f.hoisted) {
        self.scope = f.scope;
        f.parameterList.forEach(function (p) {
          return self.visitVariableDeclaration(p);
        });
        if (f.body) {
          self.visitBlock(f.body);
        };
        return self.scope = self.scope.parent;
      };
    },
    visitIdentifier: function visitIdentifier(i) {
      var self = this;
      i.scope = self.scope;
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
      return i.members.forEach(self.visitFunctionDeclaration.bind(self));
    },
    visitModule: function visitModule(m) {
      var self = this;
      self.scope = m.scope;
      defineHoisted(m.expressions, self);
      return visit.walkModule(self, m);
    },
    visitObjectDestructure: function visitObjectDestructure(i) {},
    visitTraitDeclaration: function visitTraitDeclaration(t) {
      var self = this;
      self.scope = t.scope;
      visit.walkTraitDeclaration(self, t);
      return self.scope = self.scope.parent;
    },
    visitTypeDeclaration: function visitTypeDeclaration(t) {},
    visitVariableDeclaration: function visitVariableDeclaration(d, visitInitializer, ty) {
      var self = this;
      var __PUCK__value__3 = void 0;
      if (visitInitializer) {
        __PUCK__value__3 = visitInitializer;
      } else {
        __PUCK__value__3 = function __PUCK__value__3(e) {
          var parentAssignedTo = self.assignedTo;
          self.assignedTo = d;
          self.visitExpression(e);
          return self.assignedTo = parentAssignedTo;
        };
      };
      return _structure_visitor.structureVisitor.visitVariableDeclaration.call(self, d, __PUCK__value__3, ty);
    },
    visitExportDirective: function visitExportDirective(e) {
      var self = this;
      return visit.walkExportDirective(self, e);
    },
    visitImportDirective: function visitImportDirective(i) {},
    visitAssignmentExpression: function visitAssignmentExpression(e) {
      var self = this;
      e.scope = self.scope;
      visit.walkAssignmentExpression(self, e);
      var binding = void 0;;
      if (binding = getBinding(e.lhs)) {
        if (!binding.mutable) {
          reportError(e, "Can't assign to immutable variable " + binding.name);
        };
        if (!(0, _types.isAssignable)(e.lhs.ty, e.rhs.ty)) {
          reportError(e, (0, _structure_visitor.notAssignableError)(e.lhs.ty, e.rhs.ty));
        };
      };
      return e.ty = e.lhs.ty || e.rhs.ty;
    },
    visitBinaryExpression: function visitBinaryExpression(e) {
      var self = this;
      e.scope = self.scope;
      return visit.walkBinaryExpression(self, e);
    },
    visitCallExpression: function visitCallExpression(e) {
      var self = this;
      e.scope = self.scope;
      self.visitExpression(e.func);
      var functionType = e.func.ty;
      if (e.func.kind == _ast2.SyntaxKind.MemberAccess && e.func.object.ty) {
        (function () {
          var name = e.func.member.name;
          var objectType = e.func.object.ty;
          var isDirectTraitCall = (0, _entities.isTrait)(objectType);
          if ((0, _entities.isTrait)(objectType)) {
            functionType = objectType.functions[name];
            if (!functionType) {
              reportError(e, objectType.name + " has no function named " + name + "");
            };
            if (functionType.selfBinding) {
              throw "direct trait calls for functions with self bindings are not implemented";
            };
          } else {
            if ((0, _entities.isStruct)(objectType)) {
              (function () {
                var getImplementations = function getImplementations(ty) {
                  var implementations = ty.implementations.filter(function (i) {
                    return i.tra.functions[name];
                  });
                  var __PUCK__value__5 = void 0;
                  if (implementations.length > 1) {
                    __PUCK__value__5 = implementations.filter(function (i) {
                      var __PUCK__value__6 = void 0;
                      if ((0, _entities.isTypeInstance)(i.tra)) {
                        __PUCK__value__6 = i.tra._class.name;
                      } else {
                        __PUCK__value__6 = i.tra.name;
                      };
                      return e.scope.getTypeBinding(__PUCK__value__6);
                    });
                  } else {
                    __PUCK__value__5 = implementations;
                  };
                  implementations = __PUCK__value__5;
                  var __PUCK__value__7 = void 0;
                  if (implementations.length > 1) {
                    __PUCK__value__7 = implementations.map(function (i) {
                      return i.tra.functions[name].argumentRange;
                    }).filter(function (range) {
                      return _core.RangeTrait['$Range<Num>'].contains.call(range, e.argumentList.length);
                    });
                  } else {
                    __PUCK__value__7 = implementations;
                  };
                  implementations = __PUCK__value__7;
                  if (implementations.length > 1) {
                    reportError(e, "Ambiguous trait call");
                  };
                  if (implementations.length == 0 && (0, _entities.isTypeInstance)(ty)) {
                    return getImplementations(ty._class);
                  } else {
                    return implementations;
                  };
                };

                ;
                var implementations = getImplementations(objectType);
                if (implementations.length == 1) {
                  var implementation = implementations[0];
                  var __PUCK__value__8 = void 0;
                  if ((0, _entities.isTypeInstance)(implementation.tra)) {
                    __PUCK__value__8 = implementation.tra._class.name;
                  } else {
                    __PUCK__value__8 = implementation.tra.name;
                  };
                  var traitName = __PUCK__value__8;
                  if (!e.scope.getTypeBinding(traitName)) {
                    reportError(e, "The function " + name + " is defined in trait " + traitName + " but it is not in scope");
                  };
                  e.traitName = traitName;
                  e.implementationType = implementation.ty;
                  functionType = implementation.tra.functions[name];
                  if (objectType.parameterMap) {
                    functionType = (0, _types.resolveTypeParameters)(objectType.parameterMap)(functionType);
                  };
                };
              })();
            };
          };
        })();
      };
      var parentAssignedTo = self.assignedTo;
      e.argumentList.forEach(function (a, i) {
        var __PUCK__value__9 = void 0;
        if (functionType) {
          __PUCK__value__9 = functionType._arguments[i];
        };
        self.assignedTo = __PUCK__value__9;
        return self.visitExpression(a);
      });
      self.assignedTo = parentAssignedTo;
      if (functionType) {
        checkFunctionCall(functionType, e);
        return e.ty = functionType.returnType;
      };
    },
    visitForExpression: function visitForExpression(e) {
      var self = this;
      self.scope = (0, _scope.createScope)(context, file, self.scope);
      e.scope = self.scope;
      visit.walkForExpression(self, e);
      return self.scope = self.scope.parent;
    },
    visitIfExpression: function visitIfExpression(e) {
      var self = this;
      self.scope = (0, _scope.createScope)(context, file, self.scope);
      e.scope = self.scope;
      visit.walkIfExpression(self, e);
      return self.scope = self.scope.parent;
    },
    visitLoopExpression: function visitLoopExpression(e) {
      var self = this;
      self.scope = (0, _scope.createScope)(context, file, self.scope);
      e.scope = self.scope;
      visit.walkLoopExpression(self, e);
      return self.scope = self.scope.parent;
    },
    visitUnaryExpression: function visitUnaryExpression(e) {
      var self = this;
      e.scope = self.scope;
      visit.walkUnaryExpression(self, e);
      var __PUCK__value__10 = void 0;
      if (e.operator.kind == _ast2.SyntaxKind.NotKeyword) {
        __PUCK__value__10 = e.scope.getTypeBinding("Bool").ty;
      } else {
        var __PUCK__value__11 = void 0;
        if (e.operator.kind == _ast2.SyntaxKind.MinusToken || e.operator.kind == _ast2.SyntaxKind.PlusToken) {
          __PUCK__value__11 = e.scope.getTypeBinding("Num").ty;
        };
        __PUCK__value__10 = __PUCK__value__11;
      };
      return e.ty = __PUCK__value__10;
    },
    visitWhileExpression: function visitWhileExpression(e) {
      var self = this;
      self.scope = (0, _scope.createScope)(context, file, self.scope);
      e.scope = self.scope;
      visit.walkWhileExpression(self, e);
      return self.scope = self.scope.parent;
    },
    visitIndexAccess: function visitIndexAccess(a) {
      var self = this;
      a.scope = self.scope;
      return visit.walkIndexAccess(self, a);
    },
    visitMemberAccess: function visitMemberAccess(a) {
      var self = this;
      a.scope = self.scope;
      visit.walkExpression(self, a.object);
      if (a.object.ty && (0, _entities.isStruct)(a.object.ty)) {
        return a.ty = a.object.ty.properties[a.member.name];
      };
    },
    visitBreak: function visitBreak(b) {
      var self = this;
      b.scope = self.scope;
      return visit.walkBreak(self, b);
    },
    visitReturn: function visitReturn(r) {
      var self = this;
      r.scope = self.scope;
      return visit.walkReturn(self, r);
    },
    visitListLiteral: function visitListLiteral(l) {
      var self = this;
      l.scope = self.scope;
      return visit.walkListLiteral(self, l);
    },
    visitBooleanLiteral: function visitBooleanLiteral(l) {
      var self = this;
      l.scope = self.scope;
      l.ty = self.scope.getTypeBinding("Bool").ty;
      return visit.walkBooleanLiteral(self, l);
    },
    visitNumberLiteral: function visitNumberLiteral(l) {
      var self = this;
      l.scope = self.scope;
      l.ty = self.scope.getTypeBinding("Num").ty;
      return visit.walkNumberLiteral(self, l);
    },
    visitObjectLiteral: function visitObjectLiteral(l) {
      var self = this;
      l.scope = self.scope;
      return l.members.forEach(function (m) {
        return self.visitExpression(m.value);
      });
    },
    visitStringLiteral: function visitStringLiteral(l) {
      var self = this;
      l.scope = self.scope;
      l.ty = self.scope.getTypeBinding("String").ty;
      return visit.walkStringLiteral(self, l);
    },
    visitTupleLiteral: function visitTupleLiteral(l) {
      var self = this;
      l.scope = self.scope;
      visit.walkTupleLiteral(self, l);
      var properties = l.expressions.map(function (e) {
        return e.ty;
      });
      return l.ty = {
        kind: "Tuple",
        name: (0, _functions.getTupleTypeName)(properties),
        properties: properties
      };
    }
  });
}
