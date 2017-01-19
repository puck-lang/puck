#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.ScopeVisitor = ScopeVisitor;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _util = require('util');

var _ast = require('./../ast/ast.js');

var _visit = require('./../ast/visit.js');

var visit = _interopRequireWildcard(_visit);

var _ast2 = require('./../compiler/ast.js');

var _enums = require('./src/enums.js');

var _range = require('./src/range.js');

var _scope = require('./src/scope.js');

var _structure_visitor = require('./src/structure_visitor.js');

var _types = require('./src/types.js');

var _entities = require('./../entities.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function asType(a) {
  return a;
};
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
  function checkFunctionCall(functionType, c) {
    if (!functionType) {
      return _js._undefined;
    };
    var name = c.func.name || _core.None;
    var __PUCK__value__1 = void 0;
    if (!name.kind) {
      __PUCK__value__1 = (0, _core.Some)(name);
    } else {
      __PUCK__value__1 = name;
    };
    var iName = __PUCK__value__1;
    name = _core.MaybeTrait['$Option'].unwrapOrElse.call(iName, function () {
      return _entities.TypeTrait['$Type'].displayName.call(functionType);
    });
    var __PUCK__value__2 = functionType.kind;
    var __PUCK__value__3 = __PUCK__value__2;
    var __PUCK__value__4 = void 0;
    if (__PUCK__value__3.kind == "Function") {
      var _PUCK__value__3$valu = _slicedToArray(__PUCK__value__3.value, 1);

      var func = _PUCK__value__3$valu[0];

      __PUCK__value__4 = func;
    } else {
      var __PUCK__value__5 = __PUCK__value__2;
      var __PUCK__value__6 = void 0;
      if (true) {
        var __PUCK__value__7 = __PUCK__value__5;
        __PUCK__value__6 = reportError(c, "" + name + " is not callable");
      };
      __PUCK__value__4 = __PUCK__value__6;
    };
    var _function = __PUCK__value__4;
    var __PUCK__value__8 = _function.selfBinding;
    if (__PUCK__value__8.kind == "Some") {
      var _PUCK__value__8$valu = _slicedToArray(__PUCK__value__8.value, 1);

      var selfBinding = _PUCK__value__8$valu[0];

      if (selfBinding.mutable) {
        var binding = getBinding(c.func);
        if (binding && !binding.mutable) {
          reportError(c, "" + name + " can only be called on a mutable binding");
        };
      };
    };
    var __PUCK__value__9 = (0, _range.checkRange)(c.argumentList, _function.argumentRange, "arguments", name);
    if (__PUCK__value__9.kind == "Err") {
      var _PUCK__value__9$valu = _slicedToArray(__PUCK__value__9.value, 1);

      var error = _PUCK__value__9$valu[0];

      reportError(c, error);
    };
    var __PUCK__value__10 = functionType._class;
    var __PUCK__value__11 = void 0;
    if (__PUCK__value__10.kind == "Some") {
      (function () {
        var _PUCK__value__10$val = _slicedToArray(__PUCK__value__10.value, 1);

        var _class = _PUCK__value__10$val[0];

        var parameterMap = _core.ObjectMapTrait._new();
        _function._arguments.forEach(function (parameter, i) {
          var __PUCK__value__12 = void 0;
          if (i < c.argumentList.length) {
            __PUCK__value__12 = c.argumentList[i];
          } else {
            __PUCK__value__12 = parameter;
          };
          var argument = __PUCK__value__12;
          if (parameter.type_ && argument.type_) {
            var __PUCK__value__13 = parameter.type_.kind;
            if (__PUCK__value__13.kind == "Parameter") {
              var _undefined2 = __PUCK__value__13;
              if (parameterMap[_core.MaybeTrait['$Option'].unwrap.call(parameter.type_.name)]) {
                var existingMapping = parameterMap[_core.MaybeTrait['$Option'].unwrap.call(parameter.type_.name)];
                if (!(0, _types.isAssignable)(existingMapping, argument.type_)) {
                  if ((0, _types.isAssignable)(argument.type_, existingMapping)) {
                    return parameterMap[_core.MaybeTrait['$Option'].unwrap.call(parameter.type_.name)] = argument.type_;
                  } else {
                    return reportError(argument, (0, _structure_visitor.notAssignableError)(existingMapping, argument.type_));
                  };
                };
              } else {
                return parameterMap[_core.MaybeTrait['$Option'].unwrap.call(parameter.type_.name)] = argument.type_;
              };
            };
          };
        });
        var resolvedFunction = (0, _types.resolveTypeParameters)(parameterMap)(functionType);
        var __PUCK__value__14 = resolvedFunction.kind;
        var __PUCK__value__15 = __PUCK__value__14;
        var __PUCK__value__16 = void 0;
        if (__PUCK__value__15.kind == "Function") {
          var _PUCK__value__15$val = _slicedToArray(__PUCK__value__15.value, 1);

          var _func = _PUCK__value__15$val[0];

          __PUCK__value__16 = _func;
        } else {
          var __PUCK__value__17 = __PUCK__value__14;
          var __PUCK__value__18 = void 0;
          if (true) {
            var __PUCK__value__19 = __PUCK__value__17;
            throw "resolved function is not a function";
          };
          __PUCK__value__16 = __PUCK__value__18;
        };
        __PUCK__value__11 = __PUCK__value__16;
      })();
    } else {
      __PUCK__value__11 = _function;
    };
    _function = __PUCK__value__11;
    c.argumentList.forEach(function (argument, i) {
      var parameter = _function._arguments[i];
      if (!(0, _types.isAssignable)(parameter.type_, argument.type_)) {
        reportError(argument, (0, _structure_visitor.notAssignableError)(parameter.type_, argument.type_));
      };
      if (parameter.mutable && argument.kind == _ast2.SyntaxKind.Identifier) {
        var argumentName = argument.name;
        var argumentBinding = argument.scope.getBinding(argumentName);
        if (!argumentBinding.mutable) {
          var __PUCK__value__20 = void 0;
          if (parameter.pattern.kind == "Identifier") {
            __PUCK__value__20 = parameter.pattern.value[0].name;
          } else {
            __PUCK__value__20 = i;
          };
          var parameterName = __PUCK__value__20;
          return reportError(argument, "Parameter " + parameterName + " of " + name + " requires a mutable binding " + "but " + argumentName + " is declared as immutable.");
        };
      };
    });
    return _function;
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
      visit.walkBlock(self, b);
      var __PUCK__value__21 = _core.Iterable['$List'].last.call(b.expressions);
      if (__PUCK__value__21.kind == "Some") {
        var _PUCK__value__21$val = _slicedToArray(__PUCK__value__21.value, 1);

        var last = _PUCK__value__21$val[0];

        return b.type_ = last.type_;
      };
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
          var __PUCK__value__22 = f.type_.kind;
          if (__PUCK__value__22.kind == "Function") {
            var _PUCK__value__22$val = _slicedToArray(__PUCK__value__22.value, 1);

            var func = _PUCK__value__22$val[0];

            if (func.returnType) {
              if (!(0, _types.isAssignable)(func.returnType, f.body.type_)) {
                reportError(f, (0, _structure_visitor.notAssignableError)(func.returnType, f.body.type_));
              };
            } else {
              _js._Object.assign(func, { returnType: f.body.type_ });
            };
          };
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
      var __PUCK__value__23 = void 0;
      if (visitInitializer) {
        __PUCK__value__23 = visitInitializer;
      } else {
        __PUCK__value__23 = function __PUCK__value__23(e) {
          var parentAssignedTo = self.assignedTo;
          self.assignedTo = d;
          self.visitExpression(e);
          return self.assignedTo = parentAssignedTo;
        };
      };
      return _structure_visitor.structureVisitor.visitVariableDeclaration.call(self, d, __PUCK__value__23, type_, allowNotExhaustive);
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
          var __PUCK__value__24 = objectType.kind;
          if (__PUCK__value__24.kind == "Trait") {
            var _PUCK__value__24$val = _slicedToArray(__PUCK__value__24.value, 1);

            var trait_ = _PUCK__value__24$val[0];

            functionType = trait_.functions[name];
            if (!functionType) {
              reportError(e, _entities.TypeTrait['$Type'].displayName.call(objectType) + " has no function named " + name + "");
            };
            if (functionType.selfBinding) {
              throw "direct trait calls for functions with self bindings are not implemented";
            };
          } else {
            (function () {
              var getFunction = function getFunction(type_) {
                var __PUCK__value__25 = type_.kind;
                var __PUCK__value__26 = __PUCK__value__25;
                if (__PUCK__value__26.kind == "Function") {
                  var _PUCK__value__26$val = _slicedToArray(__PUCK__value__26.value, 1);

                  var func_ = _PUCK__value__26$val[0];

                  return func_;
                } else {
                  var __PUCK__value__27 = __PUCK__value__25;
                  if (true) {
                    var __PUCK__value__28 = __PUCK__value__27;
                    throw "Type is not a function";
                  };
                };
              };

              var getTrait = function getTrait(type_) {
                var __PUCK__value__29 = type_.kind;
                var __PUCK__value__30 = __PUCK__value__29;
                if (__PUCK__value__30.kind == "Trait") {
                  var _PUCK__value__30$val = _slicedToArray(__PUCK__value__30.value, 1);

                  var _trait_ = _PUCK__value__30$val[0];

                  return _trait_;
                } else {
                  var __PUCK__value__31 = __PUCK__value__29;
                  if (true) {
                    var __PUCK__value__32 = __PUCK__value__31;
                    throw "Type is not a trait";
                  };
                };
              };

              var getImplementations = function getImplementations(type_) {
                var __PUCK__value__33 = type_.kind;
                var __PUCK__value__34 = __PUCK__value__33;
                var __PUCK__value__35 = void 0;
                if (__PUCK__value__34.kind == "Enum") {
                  var _PUCK__value__34$val = _slicedToArray(__PUCK__value__34.value, 1);

                  var enum_ = _PUCK__value__34$val[0];

                  __PUCK__value__35 = enum_.implementations;
                } else {
                  var __PUCK__value__36 = __PUCK__value__33;
                  var __PUCK__value__37 = void 0;
                  if (__PUCK__value__36.kind == "Struct") {
                    var _PUCK__value__36$val = _slicedToArray(__PUCK__value__36.value, 1);

                    var struct = _PUCK__value__36$val[0];

                    __PUCK__value__37 = struct.implementations;
                  } else {
                    var __PUCK__value__38 = __PUCK__value__33;
                    var __PUCK__value__39 = void 0;
                    if (__PUCK__value__38.kind == "Parameter") {
                      var _undefined3 = __PUCK__value__38;
                      __PUCK__value__39 = [];
                    } else {
                      var __PUCK__value__40 = __PUCK__value__33;
                      var __PUCK__value__41 = void 0;
                      if (true) {
                        var __PUCK__value__42 = __PUCK__value__40;
                        throw "Not an enum or a struct";
                      };
                      __PUCK__value__39 = __PUCK__value__41;
                    };
                    __PUCK__value__37 = __PUCK__value__39;
                  };
                  __PUCK__value__35 = __PUCK__value__37;
                };
                var implementations = __PUCK__value__35;
                implementations = implementations.filter(function (i) {
                  return getTrait(i.trait_).functions[name];
                });
                var __PUCK__value__43 = void 0;
                if (implementations.length > 1) {
                  __PUCK__value__43 = implementations.filter(function (i) {
                    return e.scope.getTypeBinding(_core.MaybeTrait['$Option'].unwrap.call(asType(i.trait_).name));
                  });
                } else {
                  __PUCK__value__43 = implementations;
                };
                implementations = __PUCK__value__43;
                var __PUCK__value__44 = void 0;
                if (implementations.length > 1) {
                  __PUCK__value__44 = implementations.filter(function (i) {
                    return _core.RangeTrait['$Range<Num>'].contains.call(getFunction(getTrait(i.trait_).functions[name]).argumentRange, e.argumentList.length);
                  });
                } else {
                  __PUCK__value__44 = implementations;
                };
                implementations = __PUCK__value__44;
                var __PUCK__value__45 = void 0;
                if (implementations.length > 1) {
                  var hasInstance = _core.Iterable['$List'].find.call(implementations, function (i) {
                    return _core.MaybeTrait['$Option'].isJust.call(i.trait_.instance);
                  });
                  var __PUCK__value__46 = void 0;
                  if (_core.MaybeTrait['$Option'].isJust.call(hasInstance)) {
                    __PUCK__value__46 = implementations.filter(function (i) {
                      return _core.MaybeTrait['$Option'].isJust.call(i.trait_.instance);
                    });
                  } else {
                    __PUCK__value__46 = implementations;
                  };
                  __PUCK__value__45 = __PUCK__value__46;
                } else {
                  __PUCK__value__45 = implementations;
                };
                implementations = __PUCK__value__45;
                if (implementations.length > 1) {
                  reportError(e, "Ambiguous trait call");
                };
                if (implementations.length == 0) {
                  var __PUCK__value__47 = type_.instance;
                  if (__PUCK__value__47.kind == "Some") {
                    var _PUCK__value__47$val = _slicedToArray(__PUCK__value__47.value, 1);

                    var instance = _PUCK__value__47$val[0];

                    return getImplementations(instance._class);
                  } else {
                    return implementations;
                  };
                } else {
                  return implementations;
                };
              };

              ;
              ;
              ;
              var implementations = getImplementations(objectType);
              if (implementations.length == 1) {
                var implementation = implementations[0];
                var __PUCK__value__48 = implementation.trait_.instance;
                var __PUCK__value__49 = void 0;
                if (__PUCK__value__48.kind == "Some") {
                  var _PUCK__value__48$val = _slicedToArray(__PUCK__value__48.value, 1);

                  var instance = _PUCK__value__48$val[0];

                  __PUCK__value__49 = _core.MaybeTrait['$Option'].unwrap.call(asType(instance._class).name);
                } else {
                  __PUCK__value__49 = _core.MaybeTrait['$Option'].unwrap.call(asType(implementation.trait_).name);
                };
                var traitName = __PUCK__value__49;
                if (!e.scope.getTypeBinding(traitName)) {
                  reportError(e, "The function " + name + " is defined in trait " + traitName + " but it is not in scope");
                };
                e.traitName = traitName;
                e.implementationType = implementation.type_;
                functionType = getTrait(implementation.trait_).functions[name];
                var __PUCK__value__50 = objectType.instance;
                if (__PUCK__value__50.kind == "Some") {
                  var _PUCK__value__50$val = _slicedToArray(__PUCK__value__50.value, 1);

                  var _instance = _PUCK__value__50$val[0];

                  functionType = (0, _types.resolveTypeParameters)(_instance.parameterMap)(functionType);
                };
              };
            })();
          };
        })();
      };
      var parentAssignedTo = self.assignedTo;
      e.argumentList.forEach(function (a, i) {
        var __PUCK__value__51 = void 0;
        if (functionType) {
          var __PUCK__value__52 = functionType.kind;
          var __PUCK__value__53 = void 0;
          if (__PUCK__value__52.kind == "Function") {
            var _PUCK__value__52$val = _slicedToArray(__PUCK__value__52.value, 1);

            var func = _PUCK__value__52$val[0];

            __PUCK__value__53 = func._arguments[i];
          };
          __PUCK__value__51 = __PUCK__value__53;
        };
        self.assignedTo = __PUCK__value__51;
        return self.visitExpression(a);
      });
      self.assignedTo = parentAssignedTo;
      if (functionType) {
        var _function = checkFunctionCall(functionType, e);
        return e.type_ = _function.returnType;
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
      var __PUCK__value__54 = e.else_;
      if (__PUCK__value__54.kind == "Some") {
        var _PUCK__value__54$val = _slicedToArray(__PUCK__value__54.value, 1);

        var else_ = _PUCK__value__54$val[0];

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
      var __PUCK__value__55 = (0, _enums.checkExhaustive)(e);
      if (__PUCK__value__55.kind == "Err") {
        var _PUCK__value__55$val = _slicedToArray(__PUCK__value__55.value, 1);

        var error = _PUCK__value__55$val[0];

        self.reportError(e, error);
      };
      e.type_ = _js._undefined;
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
        var binding = e.scope.getTypeBinding(typePath.value[0].name);
        if (!binding) {
          self.reportError(e, "Use of undeclared type " + typePath.value[0].name);
        };
        var type_ = binding.type_;
        if (typePath.value[1].kind != "Member") {
          self.reportError(e, "Nested type paths are not supported");
        };
        var __PUCK__value__56 = type_.kind;
        if (__PUCK__value__56.kind == "Enum") {
          var _ret4 = function () {
            var _PUCK__value__56$val = _slicedToArray(__PUCK__value__56.value, 1);

            var enum_ = _PUCK__value__56$val[0];

            var memberIdentifier = typePath.value[1].value[0];
            var member = enum_.members[memberIdentifier.name];
            if (!member) {
              return {
                v: reportError(memberIdentifier, _entities.TypeTrait['$Type'].displayName.call(type_) + " has no member named " + memberIdentifier.name)
              };
            } else {
              var __PUCK__value__57 = member.kind;
              var __PUCK__value__58 = __PUCK__value__57;
              if (__PUCK__value__58.kind == "Struct") {
                var _PUCK__value__58$val = _slicedToArray(__PUCK__value__58.value, 1);

                var struct = _PUCK__value__58$val[0];

                var __PUCK__value__59 = struct.kind;
                var __PUCK__value__60 = __PUCK__value__59;
                if (__PUCK__value__60.kind == "Record") {
                  var _PUCK__value__60$val = _slicedToArray(__PUCK__value__60.value, 1);

                  var record = _PUCK__value__60$val[0];

                  return {
                    v: e.type_ = {
                      displayName: _core.MaybeTrait['$Option'].map.call(type_.name, function (name) {
                        return name + "::" + memberIdentifier.name;
                      }),
                      name: type_.name,
                      kind: _entities.TypeKind.Function({
                        selfBinding: _core.None,
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
                      }),
                      _class: type_._class,
                      instance: type_.instance
                    }
                  };
                } else {
                  var __PUCK__value__61 = __PUCK__value__59;
                  if (__PUCK__value__61.kind == "Tuple") {
                    var _PUCK__value__61$val = _slicedToArray(__PUCK__value__61.value, 1);

                    var tuple = _PUCK__value__61$val[0];

                    return {
                      v: e.type_ = {
                        displayName: _core.MaybeTrait['$Option'].map.call(type_.name, function (name) {
                          return name + "::" + memberIdentifier.name;
                        }),
                        name: type_.name,
                        kind: _entities.TypeKind.Function({
                          selfBinding: _core.None,
                          _arguments: _core.Iterable['$List'].map.call(_core.Iterable['$List'].enumerate.call(tuple.properties), function (_ref) {
                            var _ref2 = _slicedToArray(_ref, 2);

                            var p = _ref2[0];
                            var i = _ref2[1];

                            return {
                              name: i.toString(),
                              token: memberIdentifier,
                              mutable: false,
                              type_: p,
                              redefined: false
                            };
                          }),
                          argumentRange: {
                            start: tuple.properties.length,
                            end: tuple.properties.length + 1
                          },
                          returnType: type_,
                          isAbstract: false
                        }),
                        _class: type_._class,
                        instance: type_.instance
                      }
                    };
                  } else {
                    var __PUCK__value__62 = __PUCK__value__59;
                    if (__PUCK__value__62.kind == "Unit") {
                      var _undefined4 = __PUCK__value__62;
                      return {
                        v: e.type_ = {
                          displayName: _core.MaybeTrait['$Option'].map.call(type_.name, function (name) {
                            return name + "::" + memberIdentifier.name;
                          }),
                          name: type_.name,
                          kind: type_.kind,
                          _class: type_._class,
                          instance: type_.instance
                        }
                      };
                    };
                  };
                };
              } else {
                var __PUCK__value__63 = __PUCK__value__57;
                if (true) {
                  var __PUCK__value__64 = __PUCK__value__63;
                  throw "enum arm is not a struct";
                };
              };
            };
          }();

          if ((typeof _ret4 === 'undefined' ? 'undefined' : _typeof(_ret4)) === "object") return _ret4.v;
        };
      };
    },
    visitUnaryExpression: function visitUnaryExpression(e) {
      var self = this;
      e.scope = self.scope;
      visit.walkUnaryExpression(self, e);
      var __PUCK__value__65 = void 0;
      if (e.operator.kind == _ast2.SyntaxKind.NotKeyword) {
        __PUCK__value__65 = e.scope.getTypeBinding("Bool").type_;
      } else {
        var __PUCK__value__66 = void 0;
        if (e.operator.kind == _ast2.SyntaxKind.MinusToken || e.operator.kind == _ast2.SyntaxKind.PlusToken) {
          __PUCK__value__66 = e.scope.getTypeBinding("Num").type_;
        };
        __PUCK__value__65 = __PUCK__value__66;
      };
      return e.type_ = __PUCK__value__65;
    },
    visitWhileLoop: function visitWhileLoop(e) {
      var self = this;
      self.scope = (0, _scope.createScope)(context, file, self.scope);
      e.scope = self.scope;
      visit.walkWhileLoop(self, e);
      e.type_ = _entities.TypeTrait.empty();
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
        var __PUCK__value__67 = a.object.type_.kind;
        if (__PUCK__value__67.kind == "Struct" && __PUCK__value__67.value[0].kind.kind == "Record") {
          var _PUCK__value__67$val = _slicedToArray(__PUCK__value__67.value, 1);

          var _PUCK__value__67$val$ = _slicedToArray(_PUCK__value__67$val[0].kind.value, 1);

          var record = _PUCK__value__67$val$[0];

          return a.type_ = record.properties[a.member.name];
        } else {};
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
      var properties = _core.Iterable['$List'].map.call(l.expressions, function (e) {
        return e.type_;
      });
      return l.type_ = {
        displayName: _core.None,
        name: _core.None,
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: _entities.StructKind.Tuple({ properties: properties })
        }),
        _class: _core.None,
        instance: _core.None
      };
    }
  });
}
