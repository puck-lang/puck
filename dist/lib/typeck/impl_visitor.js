#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.ImplVisitor = ImplVisitor;

var _core = require('puck-lang/dist/lib/stdlib/core');

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

function implementTrait(traitType, trait_, type_, implementable, i, reportError) {
  var traitName = _entities.TypeTrait['$Type'].displayName.call(traitType);
  if (implementable.implementations.some(function (imp) {
    return imp.trait_ == traitType;
  })) {
    reportError(i, "" + traitName + " has already been implemented for " + _entities.TypeTrait['$Type'].displayName.call(type_));
  };
  var functions = i.members.reduce(function (functions, member) {
    var memberType = member.type_;
    functions[_core.MaybeTrait['$Option'].unwrap.call(memberType.name)] = member.type_;
    return functions;
  }, {});
  var traitFunctions = trait_.functions;
  _js._Object.keys(traitFunctions).forEach(function (name) {
    var traitFunctionType = traitFunctions[name];
    var __PUCK__value__1 = traitFunctionType.kind;
    var __PUCK__value__2 = __PUCK__value__1;
    var __PUCK__value__3 = void 0;
    if (__PUCK__value__2.kind == "Function") {
      var _PUCK__value__2$valu = _slicedToArray(__PUCK__value__2.value, 1);

      var func = _PUCK__value__2$valu[0];

      __PUCK__value__3 = func;
    } else {
      var __PUCK__value__4 = __PUCK__value__1;
      var __PUCK__value__5 = void 0;
      if (true) {
        var __PUCK__value__6 = __PUCK__value__4;
        throw "trait function is not a function";
      };
      __PUCK__value__3 = __PUCK__value__5;
    };
    var traitFunction = __PUCK__value__3;
    if (traitFunction.isAbstract && !functions[name]) {
      return reportError(i, "Function " + traitName + "::" + name + " is not implemented for " + _entities.TypeTrait['$Type'].displayName.call(type_));
    };
  }, {});
  i.members.forEach(function (functionDeclaration) {
    var functionName = _entities.TypeTrait['$Type'].displayName.call(functionDeclaration.type_);
    var __PUCK__value__7 = functionDeclaration.type_.kind;
    var __PUCK__value__8 = __PUCK__value__7;
    var __PUCK__value__9 = void 0;
    if (__PUCK__value__8.kind == "Function") {
      var _PUCK__value__8$valu = _slicedToArray(__PUCK__value__8.value, 1);

      var func = _PUCK__value__8$valu[0];

      __PUCK__value__9 = func;
    } else {
      var __PUCK__value__10 = __PUCK__value__7;
      var __PUCK__value__11 = void 0;
      if (true) {
        var __PUCK__value__12 = __PUCK__value__10;
        throw "impl function is not a function";
      };
      __PUCK__value__9 = __PUCK__value__11;
    };
    var _function = __PUCK__value__9;
    var traitFunctionType = traitFunctions[_core.MaybeTrait['$Option'].unwrap.call(functionDeclaration.type_.name)];
    if (!traitFunctionType) {
      reportError(i, "Function " + functionName + " is not defined by " + traitName + "");
    };
    var traitFunctionName = _entities.TypeTrait['$Type'].displayName.call(traitFunctionType);
    var __PUCK__value__13 = traitFunctionType.kind;
    var __PUCK__value__14 = __PUCK__value__13;
    var __PUCK__value__15 = void 0;
    if (__PUCK__value__14.kind == "Function") {
      var _PUCK__value__14$val = _slicedToArray(__PUCK__value__14.value, 1);

      var _func = _PUCK__value__14$val[0];

      __PUCK__value__15 = _func;
    } else {
      var __PUCK__value__16 = __PUCK__value__13;
      var __PUCK__value__17 = void 0;
      if (true) {
        var __PUCK__value__18 = __PUCK__value__16;
        throw "trait function is not a function";
      };
      __PUCK__value__15 = __PUCK__value__17;
    };
    var traitFunction = __PUCK__value__15;
    var __PUCK__value__19 = _function.selfBinding;
    if (__PUCK__value__19.kind == "Some") {
      var _PUCK__value__19$val = _slicedToArray(__PUCK__value__19.value, 1);

      var implSelf = _PUCK__value__19$val[0];

      var __PUCK__value__20 = traitFunction.selfBinding;
      if (__PUCK__value__20.kind == "Some") {
        var _PUCK__value__20$val = _slicedToArray(__PUCK__value__20.value, 1);

        var traitSelf = _PUCK__value__20$val[0];

        if (implSelf.mutable && !traitSelf.mutable) {
          reportError(functionDeclaration, "Function " + traitName + "::" + traitFunctionName + " requires an immutable self parameter");
        };
      } else {
        reportError(_function, "Function " + traitName + "::" + traitFunctionName + " is static");
      };
    } else {
      var __PUCK__value__21 = traitFunction.selfBinding;
      if (__PUCK__value__21.kind == "Some") {
        var _PUCK__value__21$val = _slicedToArray(__PUCK__value__21.value, 1);

        var __PUCK__value__22 = _PUCK__value__21$val[0];

        reportError(_function, "Function " + traitName + "::" + traitFunctionName + " requires a self parameter");
      };
    };
    var __PUCK__value__23 = (0, _functions.checkFunctionAssignability)(functionName, traitFunction, _function);
    if (__PUCK__value__23.kind == "Err") {
      var _PUCK__value__23$val = _slicedToArray(__PUCK__value__23.value, 1);

      var error = _PUCK__value__23$val[0];

      return reportError(_function, error);
    };
  });
  return implementable.implementations.push({
    type_: type_,
    trait_: traitType
  });
};
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
      var traitType = i.trait_.type_;
      var structType = i.type_.type_;
      var __PUCK__value__24 = traitType.kind;
      if (__PUCK__value__24.kind == "Trait") {
        var _PUCK__value__24$val = _slicedToArray(__PUCK__value__24.value, 1);

        var trait_ = _PUCK__value__24$val[0];

        var __PUCK__value__25 = structType.kind;
        var __PUCK__value__26 = __PUCK__value__25;
        if (__PUCK__value__26.kind == "Enum") {
          var _PUCK__value__26$val = _slicedToArray(__PUCK__value__26.value, 1);

          var enum_ = _PUCK__value__26$val[0];

          implementTrait(traitType, trait_, structType, enum_, i, reportError);
        } else {
          var __PUCK__value__27 = __PUCK__value__25;
          if (__PUCK__value__27.kind == "Struct") {
            var _PUCK__value__27$val = _slicedToArray(__PUCK__value__27.value, 1);

            var struct = _PUCK__value__27$val[0];

            implementTrait(traitType, trait_, structType, struct, i, reportError);
          } else {
            var __PUCK__value__28 = __PUCK__value__25;
            if (true) {
              var __PUCK__value__29 = __PUCK__value__28;
              reportError(i.type_, _entities.TypeTrait['$Type'].displayName.call(structType) + " is not a struct or an enum");
            };
          };
        };
      } else {
        reportError(i.trait_, _entities.TypeTrait['$Type'].displayName.call(traitType) + " is not a trait");
      };
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
