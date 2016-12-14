#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
  var matchExpression = _core.Nothing;
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
    var __PUCK__value__1 = (0, _range.checkRange)(c.argumentList, _function.argumentRange, "arguments", name);
    if (__PUCK__value__1.kind == "Err") {
      var _PUCK__value__1$valu = _slicedToArray(__PUCK__value__1.value, 1);

      var error = _PUCK__value__1$valu[0];

      reportError(c, error);
    };
    var __PUCK__value__2 = void 0;
    if ((0, _entities.isTypeClass)(_function)) {
      (function () {
        var parameterMap = _core.ObjectMapTrait._new();
        _function._arguments.forEach(function (parameter, i) {
          var __PUCK__value__3 = void 0;
          if (i < c.argumentList.length) {
            __PUCK__value__3 = c.argumentList[i];
          } else {
            __PUCK__value__3 = parameter;
          };
          var argument = __PUCK__value__3;
          if (parameter.type_ && argument.type_ && (0, _entities.isTypeParameter)(parameter.type_) && !(0, _entities.isTypeParameter)(argument.type_)) {
            if (parameterMap[parameter.type_.name]) {
              var existingMapping = parameterMap[parameter.type_.name];
              if (!(0, _types.isAssignable)(existingMapping, argument.type_)) {
                if ((0, _types.isAssignable)(argument.type_, existingMapping)) {
                  return parameterMap[parameter.type_.name] = argument.type_;
                } else {
                  return reportError(argument, (0, _structure_visitor.notAssignableError)(existingMapping, argument.type_));
                };
              };
            } else {
              return parameterMap[parameter.type_.name] = argument.type_;
            };
          };
        });
        __PUCK__value__2 = (0, _types.resolveTypeParameters)(parameterMap)(_function);
      })();
    } else {
      __PUCK__value__2 = _function;
    };
    _function = __PUCK__value__2;
    c.argumentList.forEach(function (argument, i) {
      var parameter = _function._arguments[i];
      if (!(0, _types.isAssignable)(parameter.type_, argument.type_)) {
        reportError(argument, (0, _structure_visitor.notAssignableError)(parameter.type_, argument.type_));
      };
      if (parameter.mutable && argument.kind == _ast2.SyntaxKind.Identifier) {
        var argumentName = argument.name;
        var argumentBinding = argument.scope.getBinding(argumentName);
        if (!argumentBinding.mutable) {
          var __PUCK__value__4 = void 0;
          if (parameter.pattern.kind == "Identifier") {
            __PUCK__value__4 = parameter.pattern.value[0].name;
          } else {
            __PUCK__value__4 = i;
          };
          var parameterName = __PUCK__value__4;
          return reportError(argument, "Parameter " + parameterName + " of " + name + " requires a mutable binding " + "but " + argumentName + " is declared as immutable.");
        };
      };
    });
    return _function;
  };
  function checkFunctionAssignability(to, subject, token) {
    (0, _range.checkRange)(subject._arguments, to.argumentRange, reportError, "arguments", subject.name, token);
    subject._arguments.forEach(function (subjectArgument, i) {
      var toArgument = to._arguments[i];
      if (!(0, _types.isAssignable)(toArgument.type_, subjectArgument.type_)) {
        reportError(token, "Types of parameter #" + i + " does not match. " + subjectArgument.type_.name + " is not assignable to " + toArgument.type_.name);
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
        i.type_ = binding.type_;
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
    visitVariableDeclaration: function visitVariableDeclaration(d, visitInitializer, type_) {
      var allowNotExhaustive = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

      var self = this;
      var __PUCK__value__5 = void 0;
      if (visitInitializer) {
        __PUCK__value__5 = visitInitializer;
      } else {
        __PUCK__value__5 = function __PUCK__value__5(e) {
          var parentAssignedTo = self.assignedTo;
          self.assignedTo = d;
          self.visitExpression(e);
          return self.assignedTo = parentAssignedTo;
        };
      };
      return _structure_visitor.structureVisitor.visitVariableDeclaration.call(self, d, __PUCK__value__5, type_, allowNotExhaustive);
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
      var binding = getBinding(e.lhs);
      if (binding) {
        if (!binding.mutable) {
          reportError(e, "Can't assign to immutable variable " + binding.name);
        };
        if (!(0, _types.isAssignable)(e.lhs.type_, e.rhs.type_)) {
          reportError(e, (0, _structure_visitor.notAssignableError)(e.lhs.type_, e.rhs.type_));
        };
      };
      return e.type_ = e.lhs.type_ || e.rhs.type_;
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
      var functionType = e.func.type_;
      if (e.func.kind == _ast2.SyntaxKind.MemberAccess && e.func.object.type_) {
        (function () {
          var name = e.func.member.name;
          var objectType = e.func.object.type_;
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
                var getImplementations = function getImplementations(type_) {
                  var implementations = type_.implementations.filter(function (i) {
                    return i.trait_.functions[name];
                  });
                  var __PUCK__value__6 = void 0;
                  if (implementations.length > 1) {
                    __PUCK__value__6 = implementations.filter(function (i) {
                      var __PUCK__value__7 = void 0;
                      if ((0, _entities.isTypeInstance)(i.trait_)) {
                        __PUCK__value__7 = i.trait_._class.name;
                      } else {
                        __PUCK__value__7 = i.trait_.name;
                      };
                      return e.scope.getTypeBinding(__PUCK__value__7);
                    });
                  } else {
                    __PUCK__value__6 = implementations;
                  };
                  implementations = __PUCK__value__6;
                  var __PUCK__value__8 = void 0;
                  if (implementations.length > 1) {
                    __PUCK__value__8 = implementations.map(function (i) {
                      return i.trait_.functions[name].argumentRange;
                    }).filter(function (range) {
                      return _core.RangeTrait['$Range<Num>'].contains.call(range, e.argumentList.length);
                    });
                  } else {
                    __PUCK__value__8 = implementations;
                  };
                  implementations = __PUCK__value__8;
                  if (implementations.length > 1) {
                    reportError(e, "Ambiguous trait call");
                  };
                  if (implementations.length == 0 && (0, _entities.isTypeInstance)(type_)) {
                    return getImplementations(type_._class);
                  } else {
                    return implementations;
                  };
                };

                ;
                var implementations = getImplementations(objectType);
                if (implementations.length == 1) {
                  var implementation = implementations[0];
                  var __PUCK__value__9 = void 0;
                  if ((0, _entities.isTypeInstance)(implementation.trait_)) {
                    __PUCK__value__9 = implementation.trait_._class.name;
                  } else {
                    __PUCK__value__9 = implementation.trait_.name;
                  };
                  var traitName = __PUCK__value__9;
                  if (!e.scope.getTypeBinding(traitName)) {
                    reportError(e, "The function " + name + " is defined in trait " + traitName + " but it is not in scope");
                  };
                  e.traitName = traitName;
                  e.implementationType = implementation.type_;
                  functionType = implementation.trait_.functions[name];
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
        var __PUCK__value__10 = void 0;
        if (functionType && functionType._arguments) {
          __PUCK__value__10 = functionType._arguments[i];
        };
        self.assignedTo = __PUCK__value__10;
        return self.visitExpression(a);
      });
      self.assignedTo = parentAssignedTo;
      if (functionType) {
        functionType = checkFunctionCall(functionType, e);
        return e.type_ = functionType.returnType;
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
    visitIfLetExpression: function visitIfLetExpression(e) {
      var self = this;
      self.scope = (0, _scope.createScope)(context, file, self.scope);
      e.scope = self.scope;
      self.visitVariableDeclaration(e.variableDeclaration, _js._undefined, _js._undefined, true);
      self.visitBlock(e.then_);
      var __PUCK__value__11 = e.else_;
      if (__PUCK__value__11.kind == "Just") {
        var _PUCK__value__11$val = _slicedToArray(__PUCK__value__11.value, 1);

        var else_ = _PUCK__value__11$val[0];

        self.visitBlock(else_);
      };
      return self.scope = self.scope.parent;
    },
    visitLoopExpression: function visitLoopExpression(e) {
      var self = this;
      self.scope = (0, _scope.createScope)(context, file, self.scope);
      e.scope = self.scope;
      visit.walkLoopExpression(self, e);
      return self.scope = self.scope.parent;
    },
    visitMatchExpression: function visitMatchExpression(e) {
      var self = this;
      e.scope = self.scope;
      var oldMatchExpression = matchExpression;
      matchExpression = (0, _core.Just)(e);
      self.visitExpression(e.expression);
      e.type_ = e.expression.type_;
      e.patterns.forEach(function (a) {
        return self.visitMatchArm(a);
      });
      var __PUCK__value__12 = checkExhaustive(e);
      if (__PUCK__value__12.kind == "Err") {
        var _PUCK__value__12$val = _slicedToArray(__PUCK__value__12.value, 1);

        var error = _PUCK__value__12$val[0];

        self.reportError(e, error);
      };
      return matchExpression = oldMatchExpression;
    },
    visitMatchArm: function visitMatchArm(a) {
      var self = this;
      self.scope = (0, _scope.createScope)(context, file, self.scope);
      a.scope = self.scope;
      var m = _core.MaybeTrait['$Maybe'].unwrap.call(matchExpression);
      var result = (0, _structure_visitor.declarePatternVariables)(a.scope, self, a.pattern, false, m.type_, true);
      if (_core.ResultTrait['$Result'].isOk.call(result)) {
        var patternTy = result.value[0];
        if (!(0, _types.isAssignable)(m.type_, patternTy)) {
          self.reportError(a, (0, _structure_visitor.notAssignableError)(m.type_, patternTy));
        };
      } else {
        if (result.value[0].kind == "PatternMismatch") {
          var _result$value$0$value = _slicedToArray(result.value[0].value, 3);

          var pattern = _result$value$0$value[0];
          var to = _result$value$0$value[1];
          var subject = _result$value$0$value[2];

          self.reportError(a, (0, _structure_visitor.notAssignableError)(to, subject));
        };
      };
      self.visitBlock(a.block);
      return self.scope = self.scope.parent;
    },
    visitTypePathExpression: function visitTypePathExpression(e) {
      var self = this;
      e.scope = self.scope;
      var typePath = e.typePath;
      if (typePath.kind == "_Object") {
        var _ret4 = function () {
          var binding = e.scope.getTypeBinding(typePath.value[0].name);
          if (!binding) {
            self.reportError(e, "Use of undeclared type " + typePath.value[0].name);
          };
          var type_ = binding.type_;
          if (typePath.value[1].kind != "Member") {
            self.reportError(e, "Nested type paths are not supported");
          };
          var memberIdentifier = typePath.value[1].value[0];
          if ((0, _entities.isEnumType)(type_)) {
            var member = type_.members[memberIdentifier.name];
            if (!member) {
              return {
                v: reportError(memberIdentifier, type_.name + " has no member named " + memberIdentifier.name)
              };
            } else {
              if ((0, _entities.isObjectType)(member)) {
                return {
                  v: e.type_ = {
                    kind: "Function",
                    name: memberIdentifier.name,
                    parameterRange: type_.parameterRange,
                    typeParameters: type_.typeParameters,
                    instances: [],
                    _arguments: [{
                      name: memberIdentifier.name,
                      token: memberIdentifier,
                      mutable: false,
                      type_: member,
                      redefined: false
                    }],
                    argumentRange: {
                      start: 1,
                      end: 2
                    },
                    returnType: type_,
                    isAbstract: false
                  }
                };
              } else {
                if ((0, _entities.isTupleType)(member)) {
                  return {
                    v: e.type_ = {
                      kind: "Function",
                      name: memberIdentifier.name,
                      parameterRange: type_.parameterRange,
                      typeParameters: type_.typeParameters,
                      instances: [],
                      _arguments: member.properties.map(function (p, i) {
                        return {
                          name: i.toString(),
                          token: memberIdentifier,
                          mutable: false,
                          type_: p,
                          redefined: false
                        };
                      }),
                      argumentRange: {
                        start: member.properties.length,
                        end: member.properties.length + 1
                      },
                      returnType: type_,
                      isAbstract: false
                    }
                  };
                } else {
                  return {
                    v: e.type_ = {
                      kind: type_.kind,
                      name: type_.name + "." + member.name,
                      parameterRange: type_.parameterRange,
                      typeParameters: type_.typeParameters,
                      instances: []
                    }
                  };
                };
              };
            };
          };
        }();

        if ((typeof _ret4 === 'undefined' ? 'undefined' : _typeof(_ret4)) === "object") return _ret4.v;
      };
    },
    visitUnaryExpression: function visitUnaryExpression(e) {
      var self = this;
      e.scope = self.scope;
      visit.walkUnaryExpression(self, e);
      var __PUCK__value__13 = void 0;
      if (e.operator.kind == _ast2.SyntaxKind.NotKeyword) {
        __PUCK__value__13 = e.scope.getTypeBinding("Bool").type_;
      } else {
        var __PUCK__value__14 = void 0;
        if (e.operator.kind == _ast2.SyntaxKind.MinusToken || e.operator.kind == _ast2.SyntaxKind.PlusToken) {
          __PUCK__value__14 = e.scope.getTypeBinding("Num").type_;
        };
        __PUCK__value__13 = __PUCK__value__14;
      };
      return e.type_ = __PUCK__value__13;
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
      if (a.object.type_) {
        if ((0, _entities.isEnumType)(a.object.type_)) {} else {
          if ((0, _entities.isStruct)(a.object.type_)) {
            a.type_ = a.object.type_.properties[a.member.name];
          };
        };
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
      l.type_ = self.scope.getTypeBinding("Bool").type_;
      return visit.walkBooleanLiteral(self, l);
    },
    visitNumberLiteral: function visitNumberLiteral(l) {
      var self = this;
      l.scope = self.scope;
      l.type_ = self.scope.getTypeBinding("Num").type_;
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
      l.type_ = self.scope.getTypeBinding("String").type_;
      return visit.walkStringLiteral(self, l);
    },
    visitTupleLiteral: function visitTupleLiteral(l) {
      var self = this;
      l.scope = self.scope;
      visit.walkTupleLiteral(self, l);
      var properties = l.expressions.map(function (e) {
        return e.type_;
      });
      return l.type_ = {
        kind: "Tuple",
        name: (0, _functions.getTupleTypeName)(properties),
        properties: properties
      };
    }
  });
};
function isExhaustive(p) {
  if (p.kind == "CatchAll") {
    return true;
  } else {
    if (p.kind == "Identifier") {
      return true;
    } else {
      if (p.kind == "Record") {
        return p.value[0].properties.every(function (p) {
          return isExhaustive(p.pattern);
        });
      } else {
        if (p.kind == "RecordType") {
          return p.value[1].properties.every(function (p) {
            return isExhaustive(p.pattern);
          });
        } else {
          if (p.kind == "Tuple") {
            return p.value[0].properties.every(isExhaustive);
          } else {
            if (p.kind == "TupleType") {
              return p.value[1].properties.every(isExhaustive);
            } else {
              if (p.kind == "UnitType") {
                return true;
              };
            };
          };
        };
      };
    };
  };
};
function checkExhaustive(e) {
  if ((0, _entities.isEnumType)(e.type_)) {
    var _ret5 = function () {
      var enum_ = e.type_;
      var typeName = e.type_.name;
      var map = _core.ObjectMapTrait._new();
      var __PUCK__value__15 = _core.Iterable['$List'].find.call(e.patterns, function (a) {
        var pattern = a.pattern;
        var member = "";
        if (pattern.kind == "CatchAll") {
          return true;
        } else {
          if (pattern.kind == "Variable") {
            return true;
          } else {
            if (pattern.kind == "Record") {
              (0, _core.print)("Record bad!!!");
            } else {
              if (pattern.kind == "RecordType") {
                member = pattern.value[0].value[1].value[0].name;
              } else {
                if (pattern.kind == "Tuple") {
                  (0, _core.print)("Tuple bad!!!");
                } else {
                  if (pattern.kind == "TupleType") {
                    member = pattern.value[0].value[1].value[0].name;
                  } else {
                    if (pattern.kind == "UnitType") {
                      member = pattern.value[0].value[1].value[0].name;
                    } else {
                      (0, _core.print)("else bad!!!");
                    };
                  };
                };
              };
            };
          };
        };
        if (!map[member]) {
          map[member] = isExhaustive(pattern);
        };
        return false;
      });
      if (__PUCK__value__15.kind == "Just") {
        var _PUCK__value__15$val = _slicedToArray(__PUCK__value__15.value, 1);

        var __PUCK__value__16 = _PUCK__value__15$val[0];

        return {
          v: (0, _core.Ok)([])
        };
      };
      var mapSize = _core.ObjectMapTrait['$ObjectMap'].size.call(map);
      var memberCount = _core.ObjectMapTrait['$ObjectMap'].size.call(enum_.members);
      if (mapSize == memberCount - 1) {
        var _MaybeTrait$$Maybe$un = _core.MaybeTrait['$Maybe'].unwrap.call(_core.ObjectMapTrait['$ObjectMap'].find.call(enum_.members, function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2);

          var member = _ref2[0];
          var __PUCK__value__17 = _ref2[1];

          return !map[member];
        }));

        var _MaybeTrait$$Maybe$un2 = _slicedToArray(_MaybeTrait$$Maybe$un, 2);

        var missing = _MaybeTrait$$Maybe$un2[0];
        var __PUCK__value__18 = _MaybeTrait$$Maybe$un2[1];

        return {
          v: (0, _core.Err)("Match is not exhaustive. It is missing a case for " + typeName + "::" + missing + "")
        };
      } else {
        if (mapSize < memberCount) {
          return {
            v: (0, _core.Err)("Match is not exhaustive.")
          };
        } else {
          var __PUCK__value__19 = _core.ObjectMapTrait['$ObjectMap'].find.call(map, function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2);

            var __PUCK__value__20 = _ref4[0];
            var exhaustive = _ref4[1];

            return !exhaustive;
          });
          if (__PUCK__value__19.kind == "Just") {
            var _PUCK__value__19$val = _slicedToArray(__PUCK__value__19.value, 1);

            var _PUCK__value__19$val$ = _slicedToArray(_PUCK__value__19$val[0], 2);

            var member = _PUCK__value__19$val$[0];
            var __PUCK__value__21 = _PUCK__value__19$val$[1];

            return {
              v: (0, _core.Err)("Match is not exhaustive. " + typeName + "::" + member + " is not exhaustive.")
            };
          };
        };
      };
    }();

    if ((typeof _ret5 === 'undefined' ? 'undefined' : _typeof(_ret5)) === "object") return _ret5.v;
  };
  return (0, _core.Ok)([]);
}
