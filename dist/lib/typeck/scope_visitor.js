'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.ScopeVisitor = ScopeVisitor;

var _core = require('puck-lang/dist/lib/stdlib/core');

var core = _interopRequireWildcard(_core);

var _js = require('puck-lang/dist/lib/stdlib/js');

var _util = require('util');

var _ast = require('./../ast/ast');

var _visit = require('./../ast/visit');

var visit = _interopRequireWildcard(_visit);

var _ast2 = require('./../compiler/ast');

var _enums = require('./src/enums');

var _range = require('./src/range');

var _scope = require('./src/scope');

var _structure_visitor = require('./src/structure_visitor');

var _types = require('./src/types');

var _entities = require('./../entities');

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
    name = _core.Option.unwrapOrElse.call(iName, function () {
      return _entities.Type.displayName.call(functionType);
    });
    var __PUCK__value__2 = functionType.kind;
    var __PUCK__value__3 = __PUCK__value__2;
    var __PUCK__value__4 = void 0;
    if (__PUCK__value__3.kind == "Function") {
      var _PUCK__value__3$valu = _slicedToArray(__PUCK__value__3.value, 1),
          func = _PUCK__value__3$valu[0];

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
      var _PUCK__value__8$valu = _slicedToArray(__PUCK__value__8.value, 1),
          selfBinding = _PUCK__value__8$valu[0];

      if (selfBinding.mutable) {
        var binding = getBinding(c.func);
        if (binding && !binding.mutable) {
          reportError(c, "" + name + " can only be called on a mutable binding");
        };
      };
    };
    var __PUCK__value__9 = (0, _range.checkRange)(c.argumentList, _function.argumentRange, "arguments", name);
    if (__PUCK__value__9.kind == "Err") {
      var _PUCK__value__9$valu = _slicedToArray(__PUCK__value__9.value, 1),
          error = _PUCK__value__9$valu[0];

      reportError(c, error);
    };
    var __PUCK__value__10 = functionType._class;
    var __PUCK__value__11 = void 0;
    if (__PUCK__value__10.kind == "Some") {
      (function () {
        var _PUCK__value__10$val = _slicedToArray(__PUCK__value__10.value, 1),
            _class = _PUCK__value__10$val[0];

        var parameterMap = _core.ObjectMap._new.call(_core.ObjectMap);
        _core.Iterable['$List<E>'].forEach.call(_core.Iterable['$List<E>'].enumerate.call(_function._arguments), function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              parameter = _ref2[0],
              i = _ref2[1];

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
              if (parameterMap[_core.Option.unwrap.call(parameter.type_.name)]) {
                var existingMapping = parameterMap[_core.Option.unwrap.call(parameter.type_.name)];
                if (!(0, _types.isAssignable)(existingMapping, argument.type_)) {
                  if ((0, _types.isAssignable)(argument.type_, existingMapping)) {
                    return parameterMap[_core.Option.unwrap.call(parameter.type_.name)] = argument.type_;
                  } else {
                    return reportError(argument, (0, _structure_visitor.notAssignableError)(existingMapping, argument.type_));
                  };
                };
              } else {
                return parameterMap[_core.Option.unwrap.call(parameter.type_.name)] = argument.type_;
              };
            };
          };
        });
        var resolvedFunction = (0, _types.resolveTypeParameters)(parameterMap)(functionType);
        var __PUCK__value__14 = resolvedFunction.kind;
        var __PUCK__value__15 = __PUCK__value__14;
        var __PUCK__value__16 = void 0;
        if (__PUCK__value__15.kind == "Function") {
          var _PUCK__value__15$val = _slicedToArray(__PUCK__value__15.value, 1),
              _func = _PUCK__value__15$val[0];

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
    _core.Iterable['$List<E>'].forEach.call(_core.Iterable['$List<E>'].enumerate.call(c.argumentList), function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          argument = _ref4[0],
          i = _ref4[1];

      var parameter = _function._arguments[i];
      var __PUCK__value__20 = void 0;
      if (parameter.pattern) {
        var __PUCK__value__21 = parameter.pattern;
        var __PUCK__value__22 = void 0;
        if (__PUCK__value__21.kind == "Identifier") {
          var _PUCK__value__21$val = _slicedToArray(__PUCK__value__21.value, 1),
              _name = _PUCK__value__21$val[0].name;

          __PUCK__value__22 = _name;
        } else {
          __PUCK__value__22 = i;
        };
        __PUCK__value__20 = __PUCK__value__22;
      } else {
        __PUCK__value__20 = i;
      };
      var parameterName = __PUCK__value__20;
      if (!(0, _types.isAssignable)(parameter.type_, argument.type_)) {
        reportError(argument, (0, _structure_visitor.notAssignableError)(parameter.type_, argument.type_) + " in parameter " + parameterName + " of function " + name + "");
      };
      if (parameter.mutable && argument.kind == _ast2.SyntaxKind.Identifier) {
        var argumentName = argument.name;
        var argumentBinding = argument.scope.getBinding(argumentName);
        if (!argumentBinding.mutable) {
          return reportError(argument, "Parameter " + parameterName + " of function " + name + " requires a mutable binding " + "but " + argumentName + " is declared as immutable.");
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
      var __PUCK__value__23 = _core.Iterable['$List<E>'].last.call(b.expressions);
      var __PUCK__value__24 = void 0;
      if (__PUCK__value__23.kind == "Some") {
        var _PUCK__value__23$val = _slicedToArray(__PUCK__value__23.value, 1),
            last = _PUCK__value__23$val[0];

        __PUCK__value__24 = last.type_;
      } else {
        __PUCK__value__24 = _entities.Type.empty.call(_entities.Type);
      };
      return b.type_ = __PUCK__value__24;
    },
    visitFunctionDeclaration: function visitFunctionDeclaration(f) {
      var self = this;
      _structure_visitor.structureVisitor.visitFunctionDeclaration.call(self, f);
      if (!f.hoisting || f.hoisted) {
        var selfScope = self.scope;
        self.scope = f.scope;
        _core.Iterable['$List<E>'].forEach.call(f.parameterList, function (p) {
          return self.visitVariableDeclaration(p);
        });
        var __PUCK__value__25 = f.body;
        if (__PUCK__value__25.kind == "Some") {
          var _PUCK__value__25$val = _slicedToArray(__PUCK__value__25.value, 1),
              body = _PUCK__value__25$val[0];

          self.visitBlock(body);
          var __PUCK__value__26 = f.type_.kind;
          if (__PUCK__value__26.kind == "Function") {
            var _PUCK__value__26$val = _slicedToArray(__PUCK__value__26.value, 1),
                func = _PUCK__value__26$val[0];

            if (func.returnType) {
              if (!(0, _types.isAssignable)(func.returnType, body.type_)) {
                reportError(f, (0, _structure_visitor.notAssignableError)(func.returnType, body.type_));
              };
            } else {
              _js._Object.assign(func, { returnType: body.type_ });
            };
          };
        };
        return self.scope = selfScope;
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
      return _core.Iterable['$List<E>'].forEach.call(i.members, self.visitFunctionDeclaration.bind(self));
    },
    visitImplShorthandDeclaration: function visitImplShorthandDeclaration(i) {
      var self = this;
      return _core.Iterable['$List<E>'].forEach.call(i.members, self.visitFunctionDeclaration.bind(self));
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
      var allowNotExhaustive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      var self = this;
      var __PUCK__value__27 = void 0;
      if (visitInitializer) {
        __PUCK__value__27 = visitInitializer;
      } else {
        __PUCK__value__27 = function __PUCK__value__27(e) {
          var parentAssignedTo = self.assignedTo;
          self.assignedTo = d;
          self.visitExpression(e);
          return self.assignedTo = parentAssignedTo;
        };
      };
      return _structure_visitor.structureVisitor.visitVariableDeclaration.call(self, d, __PUCK__value__27, type_, allowNotExhaustive);
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
          var __PUCK__value__28 = objectType.kind;
          if (__PUCK__value__28.kind == "Trait") {
            var _PUCK__value__28$val = _slicedToArray(__PUCK__value__28.value, 1),
                trait_ = _PUCK__value__28$val[0];

            functionType = trait_.functions[name];
            if (!functionType) {
              reportError(e, _entities.Type.displayName.call(objectType) + " has no function named " + name + "");
            };
            if (functionType.selfBinding) {
              throw "direct trait calls for functions with self bindings are not implemented";
            };
          } else {
            var getImplementation = function getImplementation(type_) {
              var __PUCK__value__29 = type_.kind;
              var __PUCK__value__30 = __PUCK__value__29;
              var __PUCK__value__31 = void 0;
              if (__PUCK__value__30.kind == "Enum") {
                var _PUCK__value__30$val = _slicedToArray(__PUCK__value__30.value, 1),
                    enum_ = _PUCK__value__30$val[0];

                __PUCK__value__31 = enum_.implementations;
              } else {
                var __PUCK__value__32 = __PUCK__value__29;
                var __PUCK__value__33 = void 0;
                if (__PUCK__value__32.kind == "Struct") {
                  var _PUCK__value__32$val = _slicedToArray(__PUCK__value__32.value, 1),
                      struct = _PUCK__value__32$val[0];

                  __PUCK__value__33 = struct.implementations;
                } else {
                  var __PUCK__value__34 = __PUCK__value__29;
                  var __PUCK__value__35 = void 0;
                  if (__PUCK__value__34.kind == "Parameter") {
                    var _undefined3 = __PUCK__value__34;
                    __PUCK__value__35 = [];
                  } else {
                    var __PUCK__value__36 = __PUCK__value__29;
                    var __PUCK__value__37 = void 0;
                    if (true) {
                      var __PUCK__value__38 = __PUCK__value__36;
                      throw "Not an enum or a struct";
                    };
                    __PUCK__value__35 = __PUCK__value__37;
                  };
                  __PUCK__value__33 = __PUCK__value__35;
                };
                __PUCK__value__31 = __PUCK__value__33;
              };
              var implementations = __PUCK__value__31;
              var __PUCK__value__39 = void 0;
              if (implementations.length > 1) {
                var __PUCK__value__40 = objectType.instance;
                var __PUCK__value__41 = void 0;
                if (__PUCK__value__40.kind == "Some") {
                  (function () {
                    var _PUCK__value__40$val = _slicedToArray(__PUCK__value__40.value, 1),
                        objectInstance = _PUCK__value__40$val[0];

                    __PUCK__value__41 = implementations.filter(function (i) {
                      var implementationInstance = _core.Option.unwrap.call(i.type_.instance);
                      return _core.Iterable['$List<E>'].all.call(_core.List.zip.call(_core.List, objectInstance.typeParameters, implementationInstance.typeParameters), function (_ref5) {
                        var _ref6 = _slicedToArray(_ref5, 2),
                            objectP = _ref6[0],
                            implP = _ref6[1];

                        return (0, _types.isAssignable)(implP, objectP);
                      });
                    });
                  })();
                } else {
                  __PUCK__value__41 = implementations;
                };
                __PUCK__value__39 = __PUCK__value__41;
              } else {
                __PUCK__value__39 = implementations;
              };
              implementations = __PUCK__value__39;
              implementations = implementations.filter(function (i) {
                return _entities.Type.getTrait.call(asType(i.trait_)).functions[name];
              });
              var __PUCK__value__42 = void 0;
              if (implementations.length > 1) {
                __PUCK__value__42 = implementations.filter(function (i) {
                  return e.scope.getTypeBinding(_core.Option.unwrap.call(asType(i.trait_).name));
                });
              } else {
                __PUCK__value__42 = implementations;
              };
              implementations = __PUCK__value__42;
              var __PUCK__value__43 = void 0;
              if (implementations.length > 1) {
                __PUCK__value__43 = implementations.filter(function (i) {
                  return _core.Range.contains.call(_entities.Type.getFunction.call(asType(_entities.Type.getTrait.call(asType(i.trait_)).functions[name])).argumentRange, e.argumentList.length);
                });
              } else {
                __PUCK__value__43 = implementations;
              };
              implementations = __PUCK__value__43;
              var __PUCK__value__44 = void 0;
              if (implementations.length > 1 && _core.Option.isSome.call(objectType.instance)) {
                var __PUCK__value__45 = objectType.instance;
                var __PUCK__value__46 = void 0;
                if (__PUCK__value__45.kind == "Some") {
                  (function () {
                    var _PUCK__value__45$val = _slicedToArray(__PUCK__value__45.value, 1),
                        objectInstance = _PUCK__value__45$val[0];

                    var maxSpecificity = 0;
                    __PUCK__value__46 = _core.Iterable['$List<E>'].map.call(implementations, function (i) {
                      var specificity = getTypeSpecificity(i.type_);
                      maxSpecificity = _js.global.Math.max(maxSpecificity, specificity);
                      return [i, specificity];
                    }).filter(function (_ref7) {
                      var _ref8 = _slicedToArray(_ref7, 2),
                          __PUCK__value__47 = _ref8[0],
                          specificity = _ref8[1];

                      return specificity == maxSpecificity;
                    }).map(function (_ref9) {
                      var _ref10 = _slicedToArray(_ref9, 2),
                          i = _ref10[0],
                          __PUCK__value__48 = _ref10[1];

                      return i;
                    });
                  })();
                } else {
                  __PUCK__value__46 = implementations;
                };
                __PUCK__value__44 = __PUCK__value__46;
              } else {
                __PUCK__value__44 = implementations;
              };
              implementations = __PUCK__value__44;
              if (implementations.length > 1) {
                return reportError(e, "Ambiguous trait call");
              } else {
                return _core.Iterable['$List<E>'].first.call(implementations);
              };
            };

            ;
            var __PUCK__value__49 = getImplementation(objectType);
            if (__PUCK__value__49.kind == "Some") {
              var _PUCK__value__49$val = _slicedToArray(__PUCK__value__49.value, 1),
                  implementation = _PUCK__value__49$val[0];

              var __PUCK__value__50 = implementation.trait_.instance;
              var __PUCK__value__51 = void 0;
              if (__PUCK__value__50.kind == "Some") {
                var _PUCK__value__50$val = _slicedToArray(__PUCK__value__50.value, 1),
                    instance = _PUCK__value__50$val[0];

                __PUCK__value__51 = instance._class;
              } else {
                __PUCK__value__51 = implementation.trait_;
              };
              var _trait_ = __PUCK__value__51;
              var traitName = _core.Option.unwrap.call(_trait_.name);
              if (!e.scope.getTypeBinding(traitName)) {
                reportError(e, "The function " + name + " is defined in trait " + traitName + " but it is not in scope");
              };
              e.traitName = traitName;
              e.isShorthand = _entities.Type.getTrait.call(_trait_).isShorthand;
              e.implementationType = implementation.type_;
              functionType = _entities.Type.getTrait.call(asType(implementation.trait_)).functions[name];
              var __PUCK__value__52 = objectType.instance;
              if (__PUCK__value__52.kind == "Some") {
                var _PUCK__value__52$val = _slicedToArray(__PUCK__value__52.value, 1),
                    _instance = _PUCK__value__52$val[0];

                functionType = (0, _types.resolveTypeParameters)(_instance.parameterMap)(functionType);
              };
            };
          };
        })();
      };
      if (functionType && _entities.Type.isFunction.call(functionType)) {
        (function () {
          var callTypeParameters = _core.Option.unwrapOr.call(_core.Option.map.call(functionType._class, function (_class) {
            return _class.typeParameters;
          }), []);
          var callParameterMap = _core.ObjectMap._new.call(_core.ObjectMap);
          var parentAssignedTo = self.assignedTo;
          _core.Iterable['$List<E>'].forEach.call(_core.Iterable['$List<E>'].enumerate.call(e.argumentList), function (_ref11) {
            var _ref12 = _slicedToArray(_ref11, 2),
                a = _ref12[0],
                i = _ref12[1];

            self.assignedTo = _entities.Type.getFunction.call(functionType)._arguments[i];
            self.visitExpression(a);
            if (_core.Iterable['$List<E>'].isNotEmpty.call(callTypeParameters) && _entities.Type.getFunction.call(functionType)._arguments[i].type_ && a.type_) {
              return resolveFunctionTypeParameters(callParameterMap, callTypeParameters, _entities.Type.getFunction.call(functionType)._arguments[i].type_, a.type_);
            };
          });
          if (_core.Iterable['$List<E>'].isNotEmpty.call(callTypeParameters)) {
            functionType = (0, _types.resolveTypeParameters)(callParameterMap)(functionType);
          };
          self.assignedTo = parentAssignedTo;
        })();
      } else {
        _core.Iterable['$List<E>'].forEach.call(e.argumentList, function (a) {
          return self.visitExpression(a);
        });
      };
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
      var __PUCK__value__53 = e.else_;
      if (__PUCK__value__53.kind == "Some") {
        var _PUCK__value__53$val = _slicedToArray(__PUCK__value__53.value, 1),
            else_ = _PUCK__value__53$val[0];

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
      _core.Iterable['$List<E>'].forEach.call(e.patterns, function (a) {
        return self.visitMatchArm(a);
      });
      var __PUCK__value__54 = (0, _enums.checkExhaustive)(e);
      if (__PUCK__value__54.kind == "Err") {
        var _PUCK__value__54$val = _slicedToArray(__PUCK__value__54.value, 1),
            error = _PUCK__value__54$val[0];

        self.reportError(e, error);
      };
      e.type_ = _js._undefined;
      return matchExpression = oldMatchExpression;
    },
    visitMatchArm: function visitMatchArm(a) {
      var self = this;
      self.scope = (0, _scope.createScope)(context, file, self.scope);
      a.scope = self.scope;
      var m = _core.Option.unwrap.call(matchExpression);
      var result = (0, _structure_visitor.declarePatternVariables)(a.scope, self, a.pattern, false, m.type_, true);
      if (_core.Result.isOk.call(result)) {
        var patternTy = result.value[0];
        if (!(0, _types.isAssignable)(m.type_, patternTy)) {
          self.reportError(a, (0, _structure_visitor.notAssignableError)(m.type_, patternTy));
        };
      } else {
        if (result.value[0].kind == "PatternMismatch") {
          var _result$value$0$value = _slicedToArray(result.value[0].value, 3),
              pattern = _result$value$0$value[0],
              to = _result$value$0$value[1],
              subject = _result$value$0$value[2];

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
        var __PUCK__value__55 = type_.kind;
        if (__PUCK__value__55.kind == "Enum") {
          var _ret6 = function () {
            var _PUCK__value__55$val = _slicedToArray(__PUCK__value__55.value, 1),
                enum_ = _PUCK__value__55$val[0];

            var memberIdentifier = typePath.value[1].value[0];
            var member = enum_.members[memberIdentifier.name];
            if (!member) {
              return {
                v: reportError(memberIdentifier, _entities.Type.displayName.call(type_) + " has no member named " + memberIdentifier.name)
              };
            } else {
              var __PUCK__value__56 = member.kind;
              var __PUCK__value__57 = __PUCK__value__56;
              if (__PUCK__value__57.kind == "Struct") {
                var _PUCK__value__57$val = _slicedToArray(__PUCK__value__57.value, 1),
                    struct = _PUCK__value__57$val[0];

                var __PUCK__value__58 = struct.kind;
                var __PUCK__value__59 = __PUCK__value__58;
                if (__PUCK__value__59.kind == "Record") {
                  var _PUCK__value__59$val = _slicedToArray(__PUCK__value__59.value, 1),
                      record = _PUCK__value__59$val[0];

                  var __PUCK__value__60 = type_._class;
                  var __PUCK__value__61 = void 0;
                  if (__PUCK__value__60.kind == "Some") {
                    var _PUCK__value__60$val = _slicedToArray(__PUCK__value__60.value, 1),
                        _class = _PUCK__value__60$val[0];

                    __PUCK__value__61 = (0, _types.createTypeInstance)(type_, _class.typeParameters);
                  } else {
                    __PUCK__value__61 = type_;
                  };
                  return {
                    v: e.type_ = {
                      displayName: _core.Option.map.call(type_.name, function (name) {
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
                        returnType: __PUCK__value__61,
                        isAbstract: false
                      }),
                      _class: _core.Option.map.call(type_._class, function (_class) {
                        return _js._Object.assign({}, _class, { instances: [] });
                      }),
                      instance: type_.instance
                    }
                  };
                } else {
                  var __PUCK__value__62 = __PUCK__value__58;
                  if (__PUCK__value__62.kind == "Tuple") {
                    var _PUCK__value__62$val = _slicedToArray(__PUCK__value__62.value, 1),
                        tuple = _PUCK__value__62$val[0];

                    var __PUCK__value__63 = type_._class;
                    var __PUCK__value__64 = void 0;
                    if (__PUCK__value__63.kind == "Some") {
                      var _PUCK__value__63$val = _slicedToArray(__PUCK__value__63.value, 1),
                          _class2 = _PUCK__value__63$val[0];

                      __PUCK__value__64 = (0, _types.createTypeInstance)(type_, _class2.typeParameters);
                    } else {
                      __PUCK__value__64 = type_;
                    };
                    return {
                      v: e.type_ = {
                        displayName: _core.Option.map.call(type_.name, function (name) {
                          return name + "::" + memberIdentifier.name;
                        }),
                        name: type_.name,
                        kind: _entities.TypeKind.Function({
                          selfBinding: _core.None,
                          _arguments: _core.Iterable['$List<E>'].map.call(_core.Iterable['$List<E>'].enumerate.call(tuple.properties), function (_ref13) {
                            var _ref14 = _slicedToArray(_ref13, 2),
                                p = _ref14[0],
                                i = _ref14[1];

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
                          returnType: __PUCK__value__64,
                          isAbstract: false
                        }),
                        _class: _core.Option.map.call(type_._class, function (_class) {
                          return _js._Object.assign({}, _class, { instances: [] });
                        }),
                        instance: type_.instance
                      }
                    };
                  } else {
                    var __PUCK__value__65 = __PUCK__value__58;
                    if (__PUCK__value__65.kind == "Unit") {
                      var _undefined4 = __PUCK__value__65;
                      return {
                        v: e.type_ = {
                          displayName: _core.Option.map.call(type_.name, function (name) {
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
                var __PUCK__value__66 = __PUCK__value__56;
                if (true) {
                  var __PUCK__value__67 = __PUCK__value__66;
                  throw "enum arm is not a struct";
                };
              };
            };
          }();

          if ((typeof _ret6 === 'undefined' ? 'undefined' : _typeof(_ret6)) === "object") return _ret6.v;
        };
      };
    },
    visitUnaryExpression: function visitUnaryExpression(e) {
      var self = this;
      e.scope = self.scope;
      visit.walkUnaryExpression(self, e);
      var __PUCK__value__68 = void 0;
      if (e.operator.kind == _ast2.SyntaxKind.NotKeyword) {
        __PUCK__value__68 = e.scope.getTypeBinding("Bool").type_;
      } else {
        var __PUCK__value__69 = void 0;
        if (e.operator.kind == _ast2.SyntaxKind.MinusToken || e.operator.kind == _ast2.SyntaxKind.PlusToken) {
          __PUCK__value__69 = e.scope.getTypeBinding("Num").type_;
        };
        __PUCK__value__68 = __PUCK__value__69;
      };
      return e.type_ = __PUCK__value__68;
    },
    visitWhileLoop: function visitWhileLoop(e) {
      var self = this;
      self.scope = (0, _scope.createScope)(context, file, self.scope);
      e.scope = self.scope;
      visit.walkWhileLoop(self, e);
      e.type_ = _entities.Type.empty.call(_entities.Type);
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
        var __PUCK__value__70 = a.object.type_.kind;
        if (__PUCK__value__70.kind == "Struct" && __PUCK__value__70.value[0].kind.kind == "Record") {
          var _PUCK__value__70$val = _slicedToArray(__PUCK__value__70.value, 1),
              _PUCK__value__70$val$ = _slicedToArray(_PUCK__value__70$val[0].kind.value, 1),
              record = _PUCK__value__70$val$[0];

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
      _core.Iterable['$List<E>'].forEach.call(l.members, function (m) {
        return self.visitExpression(m.value);
      });
      return l.type_ = {
        displayName: _core.None,
        name: _core.None,
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: _entities.StructKind.Record({ properties: _core.ObjectMap.fromList.call(_core.ObjectMap, _core.Iterable['$List<E>'].map.call(l.members, function (m) {
              return [m.name.name, m.value.type_];
            })) })
        }),
        _class: _core.None,
        instance: _core.None
      };
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
      var properties = _core.Iterable['$List<E>'].map.call(l.expressions, function (e) {
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
};
function resolveFunctionTypeParameters(parameterMap, typeParameters, parameterType, argumentType) {
  var __PUCK__value__71 = parameterType.kind;
  var __PUCK__value__72 = __PUCK__value__71;
  if (__PUCK__value__72.kind == "Parameter") {
    var _ret7 = function () {
      var _PUCK__value__72$val = _slicedToArray(__PUCK__value__72.value, 1),
          __PUCK__value__73 = _PUCK__value__72$val[0];

      var name = _core.Option.unwrap.call(parameterType.name);
      if (_core.Iterable['$List<E>'].any.call(typeParameters, function (p) {
        return _core.Option.unwrap.call(p.name) == name;
      })) {
        if (!_core.ObjectMap.has.call(parameterMap, name)) {
          return {
            v: parameterMap[name] = argumentType
          };
        };
      };
    }();

    if ((typeof _ret7 === 'undefined' ? 'undefined' : _typeof(_ret7)) === "object") return _ret7.v;
  } else {
    var __PUCK__value__74 = __PUCK__value__71;
    if (__PUCK__value__74.kind == "Function") {
      var _PUCK__value__74$val = _slicedToArray(__PUCK__value__74.value, 1),
          parameterFunction = _PUCK__value__74$val[0];

      if (parameterFunction.returnType) {
        var __PUCK__value__75 = argumentType.kind;
        if (__PUCK__value__75.kind == "Function") {
          var _PUCK__value__75$val = _slicedToArray(__PUCK__value__75.value, 1),
              argumentFunction = _PUCK__value__75$val[0];

          if (argumentFunction.returnType) {
            return resolveFunctionTypeParameters(parameterMap, typeParameters, parameterFunction.returnType, argumentFunction.returnType);
          };
        };
      };
    } else {
      var __PUCK__value__76 = __PUCK__value__71;
      if (true) {
        var __PUCK__value__77 = __PUCK__value__76;
        return [];
      };
    };
  };
};
function getTypeSpecificity(type_) {
  var __PUCK__value__78 = type_.kind;
  if (__PUCK__value__78.kind == "Parameter") {
    var _PUCK__value__78$val = _slicedToArray(__PUCK__value__78.value, 1),
        __PUCK__value__79 = _PUCK__value__78$val[0];

    return 0;
  };
  var __PUCK__value__80 = type_.instance;
  var __PUCK__value__81 = __PUCK__value__80;
  if (__PUCK__value__81.kind == "Some") {
    var _PUCK__value__81$val = _slicedToArray(__PUCK__value__81.value, 1),
        instance = _PUCK__value__81$val[0];

    return instance.typeParameters.reduce(function (sum, type_) {
      return sum + getTypeSpecificity(type_);
    }, 1);
  } else {
    var __PUCK__value__82 = __PUCK__value__80;
    if (__PUCK__value__82.kind == "None") {
      var _undefined5 = __PUCK__value__82;
      return 1;
    };
  };
}
