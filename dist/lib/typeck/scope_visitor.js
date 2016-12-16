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
  var matchExpression = _core.None;
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
      if (__PUCK__value__11.kind == "Some") {
        var _PUCK__value__11$val = _slicedToArray(__PUCK__value__11.value, 1);

        var else_ = _PUCK__value__11$val[0];

        self.visitBlock(else_);
      };
      return self.scope = self.scope.parent;
    },
    visitMatchExpression: function visitMatchExpression(e) {
      var self = this;
      e.scope = self.scope;
      var oldMatchExpression = matchExpression;
      matchExpression = (0, _core.Some)(e);
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
      var m = _core.MaybeTrait['$Option'].unwrap.call(matchExpression);
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
                      name: type_.name + "::" + member.name,
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
      l.type_ = self.scope.getTypeBinding("List").type_;
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
function isIndividuallyExhaustive(p) {
  var __PUCK__value__15 = p;
  var __PUCK__value__16 = __PUCK__value__15;
  if (__PUCK__value__16.kind == "CatchAll") {
    var _undefined2 = __PUCK__value__16;
    return true;
  } else {
    var __PUCK__value__17 = __PUCK__value__15;
    if (__PUCK__value__17.kind == "Identifier") {
      var _PUCK__value__17$val = _slicedToArray(__PUCK__value__17.value, 1);

      var __PUCK__value__18 = _PUCK__value__17$val[0];

      return true;
    } else {
      var __PUCK__value__19 = __PUCK__value__15;
      if (__PUCK__value__19.kind == "Record") {
        var _PUCK__value__19$val = _slicedToArray(__PUCK__value__19.value, 1);

        var record = _PUCK__value__19$val[0];

        return record.properties.every(function (p) {
          return isIndividuallyExhaustive(p.pattern);
        });
      } else {
        var __PUCK__value__20 = __PUCK__value__15;
        if (__PUCK__value__20.kind == "RecordType") {
          var _PUCK__value__20$val = _slicedToArray(__PUCK__value__20.value, 2);

          var __PUCK__value__21 = _PUCK__value__20$val[0];
          var _record = _PUCK__value__20$val[1];

          return _record.properties.every(function (p) {
            return isIndividuallyExhaustive(p.pattern);
          });
        } else {
          var __PUCK__value__22 = __PUCK__value__15;
          if (__PUCK__value__22.kind == "Tuple") {
            var _PUCK__value__22$val = _slicedToArray(__PUCK__value__22.value, 1);

            var tuple = _PUCK__value__22$val[0];

            return tuple.properties.every(isIndividuallyExhaustive);
          } else {
            var __PUCK__value__23 = __PUCK__value__15;
            if (__PUCK__value__23.kind == "TupleType") {
              var _PUCK__value__23$val = _slicedToArray(__PUCK__value__23.value, 2);

              var __PUCK__value__24 = _PUCK__value__23$val[0];
              var _tuple = _PUCK__value__23$val[1];

              return _tuple.properties.every(isIndividuallyExhaustive);
            } else {
              var __PUCK__value__25 = __PUCK__value__15;
              if (__PUCK__value__25.kind == "UnitType") {
                var _PUCK__value__25$val = _slicedToArray(__PUCK__value__25.value, 1);

                var __PUCK__value__26 = _PUCK__value__25$val[0];

                return true;
              };
            };
          };
        };
      };
    };
  };
};
function getEnumMember(typePath) {
  var __PUCK__value__27 = typePath;
  var __PUCK__value__28 = __PUCK__value__27;
  if (__PUCK__value__28.kind == "_Object") {
    var _PUCK__value__28$val = _slicedToArray(__PUCK__value__28.value, 2);

    var __PUCK__value__29 = _PUCK__value__28$val[0];
    var _typePath = _PUCK__value__28$val[1];

    var __PUCK__value__30 = _typePath;
    var __PUCK__value__31 = __PUCK__value__30;
    if (__PUCK__value__31.kind == "Member") {
      var _PUCK__value__31$val = _slicedToArray(__PUCK__value__31.value, 1);

      var member = _PUCK__value__31$val[0];

      return member.name;
    } else {
      var __PUCK__value__32 = __PUCK__value__30;
      if (true) {
        var __PUCK__value__33 = __PUCK__value__32;
        throw "Invalid typepath";
      };
    };
  } else {
    var __PUCK__value__34 = __PUCK__value__27;
    if (true) {
      var __PUCK__value__35 = __PUCK__value__34;
      throw "Invalid typepath";
    };
  };
};
function isEnumPattern(p) {
  var __PUCK__value__36 = p;
  var __PUCK__value__37 = __PUCK__value__36;
  if (__PUCK__value__37.kind == "CatchAll") {
    var _undefined3 = __PUCK__value__37;
    return false;
  } else {
    var __PUCK__value__38 = __PUCK__value__36;
    if (__PUCK__value__38.kind == "Identifier") {
      var _PUCK__value__38$val = _slicedToArray(__PUCK__value__38.value, 1);

      var __PUCK__value__39 = _PUCK__value__38$val[0];

      return false;
    } else {
      var __PUCK__value__40 = __PUCK__value__36;
      if (__PUCK__value__40.kind == "Record") {
        var _PUCK__value__40$val = _slicedToArray(__PUCK__value__40.value, 1);

        var record = _PUCK__value__40$val[0];

        return false;
      } else {
        var __PUCK__value__41 = __PUCK__value__36;
        if (__PUCK__value__41.kind == "RecordType") {
          var _PUCK__value__41$val = _slicedToArray(__PUCK__value__41.value, 2);

          var __PUCK__value__42 = _PUCK__value__41$val[0];
          var _record2 = _PUCK__value__41$val[1];

          return true;
        } else {
          var __PUCK__value__43 = __PUCK__value__36;
          if (__PUCK__value__43.kind == "Tuple") {
            var _PUCK__value__43$val = _slicedToArray(__PUCK__value__43.value, 1);

            var tuple = _PUCK__value__43$val[0];

            return false;
          } else {
            var __PUCK__value__44 = __PUCK__value__36;
            if (__PUCK__value__44.kind == "TupleType") {
              var _PUCK__value__44$val = _slicedToArray(__PUCK__value__44.value, 2);

              var __PUCK__value__45 = _PUCK__value__44$val[0];
              var _tuple2 = _PUCK__value__44$val[1];

              return true;
            } else {
              var __PUCK__value__46 = __PUCK__value__36;
              if (__PUCK__value__46.kind == "UnitType") {
                var _PUCK__value__46$val = _slicedToArray(__PUCK__value__46.value, 1);

                var __PUCK__value__47 = _PUCK__value__46$val[0];

                return true;
              };
            };
          };
        };
      };
    };
  };
};
function isEnumArm(p) {
  var __PUCK__value__48 = p;
  var __PUCK__value__49 = __PUCK__value__48;
  if (__PUCK__value__49.kind == "CatchAll") {
    var _undefined4 = __PUCK__value__49;
    return false;
  } else {
    var __PUCK__value__50 = __PUCK__value__48;
    if (__PUCK__value__50.kind == "Identifier") {
      var _PUCK__value__50$val = _slicedToArray(__PUCK__value__50.value, 1);

      var __PUCK__value__51 = _PUCK__value__50$val[0];

      return false;
    } else {
      var __PUCK__value__52 = __PUCK__value__48;
      if (__PUCK__value__52.kind == "Record") {
        var _PUCK__value__52$val = _slicedToArray(__PUCK__value__52.value, 1);

        var record = _PUCK__value__52$val[0];

        return false;
      } else {
        var __PUCK__value__53 = __PUCK__value__48;
        if (__PUCK__value__53.kind == "RecordType") {
          var _PUCK__value__53$val = _slicedToArray(__PUCK__value__53.value, 2);

          var __PUCK__value__54 = _PUCK__value__53$val[0];
          var _record3 = _PUCK__value__53$val[1];

          return _record3.properties.some(function (p) {
            return isEnumPattern(p.pattern);
          });
        } else {
          var __PUCK__value__55 = __PUCK__value__48;
          if (__PUCK__value__55.kind == "Tuple") {
            var _PUCK__value__55$val = _slicedToArray(__PUCK__value__55.value, 1);

            var tuple = _PUCK__value__55$val[0];

            return false;
          } else {
            var __PUCK__value__56 = __PUCK__value__48;
            if (__PUCK__value__56.kind == "TupleType") {
              var _PUCK__value__56$val = _slicedToArray(__PUCK__value__56.value, 2);

              var __PUCK__value__57 = _PUCK__value__56$val[0];
              var _tuple3 = _PUCK__value__56$val[1];

              return _tuple3.properties.some(isEnumPattern);
            } else {
              var __PUCK__value__58 = __PUCK__value__48;
              if (__PUCK__value__58.kind == "UnitType") {
                var _PUCK__value__58$val = _slicedToArray(__PUCK__value__58.value, 1);

                var __PUCK__value__59 = _PUCK__value__58$val[0];

                return false;
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
    return checkExhaustiveEnum(e.patterns.map(function (a) {
      return a.pattern;
    }), e.type_);
  } else {
    return (0, _core.Ok)([]);
  };
};
function getSubPatterns(pattern) {
  var __PUCK__value__60 = pattern;
  var __PUCK__value__61 = __PUCK__value__60;
  if (__PUCK__value__61.kind == "RecordType") {
    var _PUCK__value__61$val = _slicedToArray(__PUCK__value__61.value, 2);

    var __PUCK__value__62 = _PUCK__value__61$val[0];
    var record = _PUCK__value__61$val[1];

    return record.properties.map(function (p) {
      return p.pattern;
    });
  } else {
    var __PUCK__value__63 = __PUCK__value__60;
    if (__PUCK__value__63.kind == "TupleType") {
      var _PUCK__value__63$val = _slicedToArray(__PUCK__value__63.value, 2);

      var __PUCK__value__64 = _PUCK__value__63$val[0];
      var tuple = _PUCK__value__63$val[1];

      return tuple.properties;
    } else {
      var __PUCK__value__65 = __PUCK__value__60;
      if (true) {
        var __PUCK__value__66 = __PUCK__value__65;
        return [];
      };
    };
  };
};
function checkExhaustiveEnum(patterns, enum_) {
  var typeName = enum_.name;
  var exhaustiveMap = _core.ObjectMapTrait._new();
  var enumArmsMap = _core.ObjectMapTrait._new();
  var __PUCK__value__67 = _core.Iterable['$List'].find.call(patterns, function (pattern) {
    var __PUCK__value__68 = pattern;
    var __PUCK__value__69 = __PUCK__value__68;
    var __PUCK__value__70 = void 0;
    if (__PUCK__value__69.kind == "CatchAll") {
      var _undefined5 = __PUCK__value__69;
      return true;
    } else {
      var __PUCK__value__71 = __PUCK__value__68;
      var __PUCK__value__72 = void 0;
      if (__PUCK__value__71.kind == "Identifier") {
        var _PUCK__value__71$val = _slicedToArray(__PUCK__value__71.value, 1);

        var __PUCK__value__73 = _PUCK__value__71$val[0];

        return true;
      } else {
        var __PUCK__value__74 = __PUCK__value__68;
        var __PUCK__value__75 = void 0;
        if (__PUCK__value__74.kind == "Record") {
          var _PUCK__value__74$val = _slicedToArray(__PUCK__value__74.value, 1);

          var __PUCK__value__76 = _PUCK__value__74$val[0];

          throw "Invalid pattern";
        } else {
          var __PUCK__value__77 = __PUCK__value__68;
          var __PUCK__value__78 = void 0;
          if (__PUCK__value__77.kind == "RecordType") {
            var _PUCK__value__77$val = _slicedToArray(__PUCK__value__77.value, 2);

            var typePath = _PUCK__value__77$val[0];
            var __PUCK__value__79 = _PUCK__value__77$val[1];

            __PUCK__value__78 = getEnumMember(typePath);
          } else {
            var __PUCK__value__80 = __PUCK__value__68;
            var __PUCK__value__81 = void 0;
            if (__PUCK__value__80.kind == "Tuple") {
              var _PUCK__value__80$val = _slicedToArray(__PUCK__value__80.value, 1);

              var __PUCK__value__82 = _PUCK__value__80$val[0];

              throw "Invalid pattern";
            } else {
              var __PUCK__value__83 = __PUCK__value__68;
              var __PUCK__value__84 = void 0;
              if (__PUCK__value__83.kind == "TupleType") {
                var _PUCK__value__83$val = _slicedToArray(__PUCK__value__83.value, 2);

                var _typePath2 = _PUCK__value__83$val[0];
                var __PUCK__value__85 = _PUCK__value__83$val[1];

                __PUCK__value__84 = getEnumMember(_typePath2);
              } else {
                var __PUCK__value__86 = __PUCK__value__68;
                var __PUCK__value__87 = void 0;
                if (__PUCK__value__86.kind == "UnitType") {
                  var _PUCK__value__86$val = _slicedToArray(__PUCK__value__86.value, 1);

                  var _typePath3 = _PUCK__value__86$val[0];

                  __PUCK__value__87 = getEnumMember(_typePath3);
                };
                __PUCK__value__84 = __PUCK__value__87;
              };
              __PUCK__value__81 = __PUCK__value__84;
            };
            __PUCK__value__78 = __PUCK__value__81;
          };
          __PUCK__value__75 = __PUCK__value__78;
        };
        __PUCK__value__72 = __PUCK__value__75;
      };
      __PUCK__value__70 = __PUCK__value__72;
    };
    var member = __PUCK__value__70;
    if (!exhaustiveMap[member]) {
      var individuallyExhaustive = isIndividuallyExhaustive(pattern);
      var isEnum = isEnumArm(pattern);
      exhaustiveMap[member] = individuallyExhaustive && !isEnum;
      if (isEnum) {
        if (!enumArmsMap[member]) {
          enumArmsMap[member] = [];
        };
        enumArmsMap[member].push(pattern);
      };
    };
    return false;
  });
  if (__PUCK__value__67.kind == "Some") {
    var _PUCK__value__67$val = _slicedToArray(__PUCK__value__67.value, 1);

    var __PUCK__value__88 = _PUCK__value__67$val[0];

    return (0, _core.Ok)([]);
  };
  var innerErrors = [];
  _core.ObjectMapTrait['$ObjectMap'].forEach.call(enumArmsMap, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2);

    var member = _ref2[0];
    var patterns = _ref2[1];

    var enumPatterns = _core.Iterable['$List'].enumerate.call(getSubPatterns(patterns[0])).filter(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2);

      var pattern = _ref4[0];
      var __PUCK__value__89 = _ref4[1];

      return isEnumPattern(pattern);
    }).map(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2);

      var pattern = _ref6[0];
      var index = _ref6[1];

      var p = pattern;
      var __PUCK__value__90 = p;
      var __PUCK__value__91 = __PUCK__value__90;
      var __PUCK__value__92 = void 0;
      if (__PUCK__value__91.kind == "RecordType") {
        var _PUCK__value__91$val = _slicedToArray(__PUCK__value__91.value, 2);

        var typePath = _PUCK__value__91$val[0];
        var __PUCK__value__93 = _PUCK__value__91$val[1];

        __PUCK__value__92 = typePath;
      } else {
        var __PUCK__value__94 = __PUCK__value__90;
        var __PUCK__value__95 = void 0;
        if (__PUCK__value__94.kind == "TupleType") {
          var _PUCK__value__94$val = _slicedToArray(__PUCK__value__94.value, 2);

          var _typePath4 = _PUCK__value__94$val[0];
          var __PUCK__value__96 = _PUCK__value__94$val[1];

          __PUCK__value__95 = _typePath4;
        } else {
          var __PUCK__value__97 = __PUCK__value__90;
          var __PUCK__value__98 = void 0;
          if (__PUCK__value__97.kind == "UnitType") {
            var _PUCK__value__97$val = _slicedToArray(__PUCK__value__97.value, 1);

            var _typePath5 = _PUCK__value__97$val[0];

            __PUCK__value__98 = _typePath5;
          } else {
            var __PUCK__value__99 = __PUCK__value__90;
            var __PUCK__value__100 = void 0;
            if (true) {
              var __PUCK__value__101 = __PUCK__value__99;
              throw "Invalid pattern6";
            };
            __PUCK__value__98 = __PUCK__value__100;
          };
          __PUCK__value__95 = __PUCK__value__98;
        };
        __PUCK__value__92 = __PUCK__value__95;
      };
      var _PUCK__value__ = __PUCK__value__92;
      var type_ = _PUCK__value__.type_;

      var subPatterns = patterns.map(getSubPatterns).map(function (subPatterns) {
        return subPatterns[index];
      });
      return [type_, subPatterns];
    });
    var errors = enumPatterns.map(function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 2);

      var type_ = _ref8[0];
      var subPatterns = _ref8[1];

      return checkExhaustiveEnum(subPatterns, type_);
    }).filter(function (result) {
      return _core.ResultTrait['$Result'].isErr.call(result);
    });
    innerErrors = innerErrors.concat(errors);
    return exhaustiveMap[member] = errors.length == 0;
  });
  if (innerErrors.length > 0) {
    return innerErrors[0];
  };
  var mapSize = _core.ObjectMapTrait['$ObjectMap'].size.call(exhaustiveMap);
  var memberCount = _core.ObjectMapTrait['$ObjectMap'].size.call(enum_.members);
  if (mapSize == memberCount - 1) {
    var _MaybeTrait$$Option$u = _core.MaybeTrait['$Option'].unwrap.call(_core.ObjectMapTrait['$ObjectMap'].find.call(enum_.members, function (_ref9) {
      var _ref10 = _slicedToArray(_ref9, 2);

      var member = _ref10[0];
      var __PUCK__value__102 = _ref10[1];

      return !exhaustiveMap[member];
    }));

    var _MaybeTrait$$Option$u2 = _slicedToArray(_MaybeTrait$$Option$u, 2);

    var missing = _MaybeTrait$$Option$u2[0];
    var __PUCK__value__103 = _MaybeTrait$$Option$u2[1];

    return (0, _core.Err)("Match is not exhaustive. It is missing a case for " + typeName + "::" + missing + "");
  } else {
    if (mapSize < memberCount) {
      return (0, _core.Err)("Match is not exhaustive.");
    } else {
      var __PUCK__value__104 = _core.ObjectMapTrait['$ObjectMap'].find.call(exhaustiveMap, function (_ref11) {
        var _ref12 = _slicedToArray(_ref11, 2);

        var __PUCK__value__105 = _ref12[0];
        var exhaustive = _ref12[1];

        return !exhaustive;
      });
      if (__PUCK__value__104.kind == "Some") {
        var _PUCK__value__104$va = _slicedToArray(__PUCK__value__104.value, 1);

        var _PUCK__value__104$va$ = _slicedToArray(_PUCK__value__104$va[0], 2);

        var member = _PUCK__value__104$va$[0];
        var a = _PUCK__value__104$va$[1];

        return (0, _core.Err)("Match is not exhaustive. " + typeName + "::" + member + " is not exhaustive. " + a + "");
      };
    };
  };
  return (0, _core.Ok)([]);
}
