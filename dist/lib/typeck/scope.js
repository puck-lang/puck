#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopScopeVisitor = TopScopeVisitor;
exports.TypeVisitor = TypeVisitor;
exports.ScopeVisitor = ScopeVisitor;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _util = require('util');

var _js = require('puck-lang/dist/lib/stdlib/js');

require('./../ast/ast.js');

var _visit = require('./../ast/visit.js');

var visit = _interopRequireWildcard(_visit);

var _ast = require('./../compiler/ast.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function isStruct(type_) {
  return type_.implementations;
};
function isTrait(type_) {
  return type_.isTrait;
};
function isTypeClass(type_) {
  return type_.parameterRange;
};
function isSameType(a, b) {
  return a.kind == b.kind;
};
function createTypeInstance(_class, typeParameters) {
  var instance = void 0;;
  if (instance = _class.instances.find(function (i) {
    return i.typeParameters.length == typeParameters.length && i.typeParameters.every(function (p, i) {
      return isSameType(p, typeParameters[i]);
    });
  })) {
    return instance;
  } else {
    instance = {
      isTrait: _class.isTrait,
      functions: _class.functions,
      implementations: _class.implementations && [],
      kind: _class.name + "<" + typeParameters.map(function (p) {
        return p.name;
      }).join(", ") + ">",
      name: _class.name + "<" + typeParameters.map(function (p) {
        return p.name;
      }).join(", ") + ">",
      _class: _class,
      typeParameters: typeParameters
    };
    _class.instances.push(instance);
    return instance;
  };
};
function getType(scope, t) {
  if (!t) {
    return _js._undefined;
  };
  if (t.name) {
    var binding = scope.getTypeBinding(t.name.name);
    if (!binding) {
      return binding;
    } else {
      if (isTypeClass(binding.type_)) {
        return createTypeInstance(binding.type_, t.typeParameters.map(function (p) {
          return p.type_;
        }));
      } else {
        return binding.type_;
      };
    };
  } else {
    var _arguments = t._arguments.map(function (p) {
      return { type_: getType(scope, p) };
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
  var __PUCK__value__2 = void 0;
  if (argumentCount < min) {
    __PUCK__value__2 = "few";
  } else {
    var __PUCK__value__3 = void 0;
    if (argumentCount > max) {
      __PUCK__value__3 = "many";
    };
    __PUCK__value__2 = __PUCK__value__3;
  };
  var error = __PUCK__value__2;
  if (error) {
    var __PUCK__value__4 = void 0;
    if (min == max) {
      __PUCK__value__4 = min;
    } else {
      __PUCK__value__4 = "" + min + " to " + max + "";
    };
    var required = __PUCK__value__4;
    return reportError(token, "Too " + error + " " + argumentName + " given to " + subjectName + ", " + required + " required, " + argumentCount + " given");
  };
};
function createFunctionType(scope, f, reportError) {
  var _arguments = f.parameterList.map(function (p) {
    return {
      identifier: p.identifier,
      mutable: p.mutable,
      type_: p.type_
    };
  });
  var returnType = getType(scope, f.returnType);
  var __PUCK__value__5 = void 0;
  if (f.name) {
    __PUCK__value__5 = f.name.name;
  } else {
    __PUCK__value__5 = getFunctionTypeName(_arguments, returnType);
  };
  var __PUCK__value__6 = void 0;
  if (f.parameterList) {
    __PUCK__value__6 = getMinMax(f.parameterList, function (p) {
      return p.initializer;
    }, reportError, "parameter");
  } else {
    __PUCK__value__6 = {
      min: 0,
      max: 0
    };
  };
  return {
    kind: "Function",
    name: __PUCK__value__5,
    _arguments: _arguments,
    argumentRange: __PUCK__value__6,
    returnType: returnType,
    isAbstract: !f.body
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

      var name = binding.name;
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
      var __PUCK__value__7 = void 0;
      if (t.typeParameters && t.typeParameters.length) {
        __PUCK__value__7 = getMinMax(t.typeParameters, function (p) {
          return p.defaultValue;
        }, reportError, "type parameter");
      };
      var parameterRange = __PUCK__value__7;
      var __PUCK__value__8 = void 0;
      if (t.type_) {
        __PUCK__value__8 = t.type_;
      } else {
        var _ty = {
          kind: name,
          name: name,
          parameterRange: parameterRange
        };
        if (t.kind == _ast.SyntaxKind.TraitDeclaration) {
          _ty.isTrait = true;
        } else {
          if (t.kind == _ast.SyntaxKind.TypeDeclaration) {
            _ty.implementations = [];
          };
        };
        if (isTypeClass(_ty)) {
          _ty.instances = [];
        };
        __PUCK__value__8 = _ty;
      };
      var type_ = __PUCK__value__8;
      var binding = {
        name: name,
        type_: type_
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
  if (f.name) {
    return scope.define({
      name: f.name.name,
      token: f,
      mutable: false,
      type_: f.type_
    });
  };
};
function definedHosted(visitor, scope, expressions) {
  return expressions.forEach(function (e) {
    if (e.kind == _ast.SyntaxKind.Function) {
      e.hoisting = true;
      visitor.visitFunctionDeclaration(e);
      e.hoisted = true;
    };
    if (e.kind == _ast.SyntaxKind.ExportDirective && e.expression.kind == _ast.SyntaxKind.Function) {
      e.expression.hoisting = true;
      visitor.visitFunctionDeclaration(e.expression);
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
        e.type_ = scope.defineType(e).type_;
        return e.hoisted = true;
      } else {
        if (e.kind == _ast.SyntaxKind.ExportDirective && (e.expression.kind == _ast.SyntaxKind.TraitDeclaration || e.expression.kind == _ast.SyntaxKind.TypeDeclaration)) {
          e.expression.type_ = scope.defineType(e.expression).type_;
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
    visitImplDeclaration: function visitImplDeclaration(i) {},
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
    visitTypeBound: function visitTypeBound(t) {},
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
      if (i.specifier.kind == _ast.SyntaxKind.Identifier) {
        return scope.define({
          name: i.specifier.name,
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
function visitFunctionDeclarationFrame(visitor, reportError, f) {
  if (f.typeParameters) {
    f.typeParameters.forEach(visitor.visitTypeParameter.bind(visitor));
  };
  f.parameterList.forEach(visitor.visitVariableDeclaration.bind(visitor));
  if (f.returnType) {
    visitor.visitTypeBound(f.returnType);
  };
  f.type_ = createFunctionType(f.scope, f, reportError);
  return defineFunction(f.scope.parent, f);
};
function _visitFunctionTypeBound(visitor, reportError, t) {
  visit.walkFunctionTypeBound(visitor, t);
  return t.type_ = getType(t.scope, t);
};
function _visitNamedTypeBound(visitor, reportError, t) {
  var binding = t.scope.getTypeBinding(t.name.name);
  if (!binding) {
    reportError(t, "Use of undeclared type " + t.name.name);
  };
  if (isTypeClass(binding.type_)) {
    checkMinMax(t.typeParameters, binding.type_.parameterRange, reportError, "type parameters", binding.name, t);
  } else {
    if (t.typeParameters.length > 0) {
      reportError(t, "Type " + binding.name + " is not generic");
    };
  };
  visit.walkNamedTypeBound(visitor, t);
  return t.type_ = getType(t.scope, t);
};
function TypeVisitor(context, file) {
  var importDirective = void 0;
  var scope = createScope(context, file);
  var reportError = context.reportError.bind(context, file);
  return _js._Object.assign({}, visit.Visitor, {
    visitBlock: function visitBlock(b) {},
    visitFunctionDeclaration: function visitFunctionDeclaration(f) {
      var self = this;
      f.hoisting = true;
      f.hoisted = true;
      scope = createScope(context, file, scope);
      f.scope = scope;
      visitFunctionDeclarationFrame(self, reportError, f);
      return scope = scope.parent;
    },
    visitIdentifier: function visitIdentifier(i) {},
    visitImplDeclaration: function visitImplDeclaration(i) {},
    visitModule: function visitModule(m) {
      var self = this;
      m.scope = scope;
      definedHostedTopLevel(self, scope, m.lines);
      return visit.walkModule(self, m);
    },
    visitObjectDestructure: function visitObjectDestructure(i) {
      var self = this;
      i.scope = scope;
      return i.members.forEach(function (m) {
        if (importDirective._module) {
          var e = importDirective._module.exports[m.local.name];
          if (e.expression.kind == _ast.SyntaxKind.TraitDeclaration || e.expression.kind == _ast.SyntaxKind.TypeDeclaration) {
            return scope.defineType(e.expression);
          } else {
            return scope.define({
              name: m.local.name,
              mutable: false,
              token: m
            });
          };
        } else {
          return scope.define({
            name: m.local.name,
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
      t.type_.functions = (0, _core.objectFromList)(t.members.map(function (m) {
        return [m.name.name, m.type_];
      }));
      return scope = scope.parent;
    },
    visitFunctionTypeBound: function visitFunctionTypeBound(t) {
      var self = this;
      scope = createScope(context, file, scope);
      t.scope = scope;
      _visitFunctionTypeBound(self, reportError, t);
      return scope = scope.parent;
    },
    visitNamedTypeBound: function visitNamedTypeBound(t) {
      var self = this;
      t.scope = scope;
      return _visitNamedTypeBound(self, reportError, t);
    },
    visitTypeDeclaration: function visitTypeDeclaration(t) {
      var self = this;
      scope = createScope(context, file, scope);
      t.scope = scope;
      visit.walkTypeDeclaration(self, t);
      t.type_.properties = (0, _core.objectFromList)(t.properties.map(function (p) {
        return [p.name.name, p.typeBound.type_];
      }));
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
      return d.type_ = getType(d.scope, d.typeBound);
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
          name: i.specifier.name,
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
  var scope = void 0;
  var importDirective = void 0;
  var reportError = context.reportError.bind(context, file);
  function reportNotAssignableError(t, to, subject) {
    return reportError(t, subject.name + " is not assignable to type " + to.name);
  };
  function checkFunctionType(binding, c) {
    if (!binding.type_) {
      return _js._undefined;
    };
    var name = binding.type_.name;
    if (!binding.type_._arguments) {
      reportError(c, "" + name + " is not callable");
    };
    checkMinMax(c.argumentList, binding.type_.argumentRange, reportError, "arguments", binding.name, c);
    return c.argumentList.forEach(function (argument, i) {
      var parameter = binding.type_._arguments[i];
      if (!isAssignable(parameter.type_, argument.type_)) {
        reportNotAssignableError(argument, parameter.type_, argument.type_);
      };
      if (parameter.mutable && argument.kind == _ast.SyntaxKind.Identifier) {
        var argumentName = argument.name;
        var argumentBinding = scope.getBinding(argumentName);
        if (!argumentBinding.mutable) {
          var __PUCK__value__9 = void 0;
          if (c.func.kind == _ast.SyntaxKind.Identifier) {
            __PUCK__value__9 = c.func.name;
          } else {
            __PUCK__value__9 = "function";
          };
          var functionName = __PUCK__value__9;
          var __PUCK__value__10 = void 0;
          if (parameter.identifier) {
            __PUCK__value__10 = parameter.identifier.name;
          } else {
            __PUCK__value__10 = i;
          };
          var parameterName = __PUCK__value__10;
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
      definedHosted(self, scope, b.block);
      return visit.walkBlock(self, b);
    },
    visitFunctionDeclaration: function visitFunctionDeclaration(f) {
      var self = this;
      if (!f.hoisting || !f.hoisted) {
        scope = createScope(context, file, scope);
        f.scope = scope;
        visitFunctionDeclarationFrame(self, reportError, f);
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
        i.type_ = binding.type_;
      };
      return visit.walkIdentifier(self, i);
    },
    visitImplDeclaration: function visitImplDeclaration(i) {
      var self = this;
      scope = createScope(context, file, scope);
      i.scope = scope;
      visit.walkImplDeclaration(self, i);
      if (!isTrait(i.trait_.type_)) {
        reportError(i.trait_, i.trait_.type_.name + " is not a trait");
      };
      if (!isStruct(i.type_.type_)) {
        reportError(i.type_, i.type_.type_.name + " is not a type");
      };
      if (i.type_.type_.implementations.some(function (imp) {
        return isSameType(imp.trait_.type_, i.trait_.type_);
      })) {
        reportError(i, i.trait_.type_.name + " has already been implemented for " + i.type_.type_.name);
      };
      var functions = i.members.reduce(function (functions, member) {
        functions[member.type_.name] = member.type_;
        return functions;
      }, {});
      var traitFunctions = i.trait_.type_.functions;
      _js._Object.keys(traitFunctions).forEach(function (name) {
        if (traitFunctions[name].isAbstract && !functions[name]) {
          return reportError(i, "Function " + i.trait_.type_.name + "::" + name + " is not implemented for " + i.type_.type_.name);
        };
      }, {});
      i.members.forEach(function (_function) {
        if (!traitFunctions[_function.type_.name]) {
          return reportError(i, "Function " + _function.type_.name + " is not defined by " + i.trait_.type_.name);
        };
      });
      i.type_.type_.implementations.push({
        type_: i.type_,
        trait_: i.trait_
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
            return binding.type_ = e.expression.type_;
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
        scope = createScope(context, file, scope);
        t.scope = scope;
        _visitFunctionTypeBound(self, reportError, t);
        return scope = scope.parent;
      };
    },
    visitNamedTypeBound: function visitNamedTypeBound(t) {
      var self = this;
      if (!t.scope) {
        t.scope = scope;
        return _visitNamedTypeBound(self, reportError, t);
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
        d.type_ = getType(d.scope, d.typeBound);
      };
      var binding = d.scope.define({
        name: d.identifier.name,
        mutable: d.mutable,
        token: d,
        type_: d.type_
      }, true);
      d.binding = binding;
      if (d.initializer) {
        self.visitExpression(d.initializer);
        if (!binding.type_) {
          return binding.type_ = d.initializer.type_;
        } else {
          if (!isAssignable(binding.type_, d.initializer.type_)) {
            return reportNotAssignableError(d, binding.type_, d.initializer.type_);
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
        if (!isAssignable(e.lhs.type_, e.rhs.type_)) {
          return reportNotAssignableError(e, e.lhs.type_, e.rhs.type_);
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
      if (e.func.type_) {
        checkFunctionType(e.func, e);
        return e.type_ = e.func.type_.returnType;
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
      visit.walkUnaryExpression(self, e);
      var __PUCK__value__12 = void 0;
      if (e.operator.kind == _ast.SyntaxKind.NotKeyword) {
        __PUCK__value__12 = {
          kind: "Bool",
          name: "Bool"
        };
      } else {
        var __PUCK__value__13 = void 0;
        if (e.operator.kind == _ast.SyntaxKind.MinusToken || e.operator.kind == _ast.SyntaxKind.PlusToken) {
          __PUCK__value__13 = {
            kind: "Num",
            name: "Num"
          };
        };
        __PUCK__value__12 = __PUCK__value__13;
      };
      return e.type_ = __PUCK__value__12;
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
      l.type_ = {
        kind: "Bool",
        name: "Bool"
      };
      return visit.walkBooleanLiteral(self, l);
    },
    visitNumberLiteral: function visitNumberLiteral(l) {
      var self = this;
      l.scope = scope;
      l.type_ = {
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
      l.type_ = {
        kind: "String",
        name: "String"
      };
      return visit.walkStringLiteral(self, l);
    }
  });
}
