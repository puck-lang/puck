'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.ImplVisitor = ImplVisitor;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _ast = require('./../ast/ast');

var _visit = require('./../ast/visit');

var visit = _interopRequireWildcard(_visit);

var _ast2 = require('./../compiler/ast');

var _functions = require('./src/functions');

var _range = require('./src/range');

var _scope = require('./src/scope');

var _structure_visitor = require('./src/structure_visitor');

var _types = require('./src/types');

var _entities = require('./../entities');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};

function implementTrait(traitType, trait_, type_, implementable, i, reportError) {
  var traitName = _entities.Type.displayName.call(traitType);
  if (_core.Iterable['$List<E>'].any.call({ type: '$List<E>', value: implementable.implementations, $isTraitObject: true }, function (imp) {
    return imp.trait_ == traitType;
  })) {
    reportError(i, "" + traitName + " has already been implemented for " + _entities.Type.displayName.call(type_));
  };
  var functions = _core.ObjectMap.fromIter(_core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: i.members, $isTraitObject: true }, function (functionDeclaration) {
    return [_core.Option.unwrap.call(functionDeclaration.type_.name), functionDeclaration.type_];
  }));
  var traitFunctions = trait_.functions;
  _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: _core.ObjectMap.keys.call(traitFunctions), $isTraitObject: true }, function (name) {
    var traitFunctionType = traitFunctions[name];
    var traitFunction = _entities.Type.getFunction.call(traitFunctionType);
    if (traitFunction.isAbstract && !functions[name]) {
      return reportError(i, "Function " + traitName + "::" + name + " is not implemented for " + _entities.Type.displayName.call(type_));
    };
  });
  _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: i.members, $isTraitObject: true }, function (functionDeclaration) {
    var functionName = _entities.Type.displayName.call(functionDeclaration.type_);
    var _function = _entities.Type.getFunction.call(functionDeclaration.type_);
    var traitFunctionType = traitFunctions[_core.Option.unwrap.call(functionDeclaration.type_.name)];
    if (!traitFunctionType) {
      reportError(i, "Function " + functionName + " is not defined by " + traitName + "");
    };
    var traitFunctionName = _entities.Type.displayName.call(traitFunctionType);
    var traitFunction = _entities.Type.getFunction.call(traitFunctionType);
    var __PUCK__value__1 = _function.selfBinding;
    if ($unwrapTraitObject(__PUCK__value__1).kind == "Some") {
      var _PUCK__value__1$valu = _slicedToArray(__PUCK__value__1.value, 1),
          implSelf = _PUCK__value__1$valu[0];

      var __PUCK__value__2 = traitFunction.selfBinding;
      if ($unwrapTraitObject(__PUCK__value__2).kind == "Some") {
        var _PUCK__value__2$valu = _slicedToArray(__PUCK__value__2.value, 1),
            traitSelf = _PUCK__value__2$valu[0];

        if (implSelf.mutable && !traitSelf.mutable) {
          return reportError(functionDeclaration, "Function " + traitName + "::" + traitFunctionName + " requires an immutable self parameter");
        };
      } else {
        return reportError(_function, "Function " + traitName + "::" + traitFunctionName + " is static");
      };
    } else {
      var __PUCK__value__3 = traitFunction.selfBinding;
      if ($unwrapTraitObject(__PUCK__value__3).kind == "Some") {
        var _PUCK__value__3$valu = _slicedToArray(__PUCK__value__3.value, 1),
            __PUCK__value__4 = _PUCK__value__3$valu[0];

        return reportError(_function, "Function " + traitName + "::" + traitFunctionName + " requires a self parameter");
      };
    };
  });
  var implementation = {
    type_: type_,
    trait_: traitType
  };
  implementable.implementations.push(implementation);
  return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: i.members, $isTraitObject: true }, function (functionDeclaration) {
    var functionName = _entities.Type.displayName.call(functionDeclaration.type_);
    var traitFunctionType = traitFunctions[_core.Option.unwrap.call(functionDeclaration.type_.name)];
    var traitFunction = _entities.Type.getFunction.call(traitFunctionType);
    var _function = _entities.Type.getFunction.call(functionDeclaration.type_);
    functionDeclaration.traitFunctionType = traitFunctionType;
    var __PUCK__value__5 = (0, _functions.checkFunctionAssignability)(functionName, traitFunction, _function);
    if ($unwrapTraitObject(__PUCK__value__5).kind == "Err") {
      var _PUCK__value__5$valu = _slicedToArray(__PUCK__value__5.value, 1),
          error = _PUCK__value__5$valu[0];

      return reportError(_function, error);
    };
  });
};
function implementShorthand(type_, implementable, i, reportError) {
  var typeName = _entities.Type.displayName.call(type_);
  if (_core.Iterable['$List<E>'].any.call({ type: '$List<E>', value: implementable.implementations, $isTraitObject: true }, function (imp) {
    return _entities.Type.getTrait.call(imp.trait_).isShorthand;
  })) {
    reportError(i, "" + typeName + " has already been implemented");
  };
  var functions = _core.ObjectMap.fromIter(_core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: i.members, $isTraitObject: true }, function (functionDeclaration) {
    return [_core.Option.unwrap.call(functionDeclaration.type_.name), functionDeclaration.type_];
  }));
  return implementable.implementations.push({
    type_: type_,
    trait_: {
      displayName: type_.displayName,
      name: type_.name,
      kind: _entities.TypeKind.Trait({
        isShorthand: true,
        functions: functions
      }),
      _class: _core.None,
      instance: _core.None
    }
  });
};
function ImplVisitor(context, file) {
  var importDirective = void 0;
  var reportError = $unwrapTraitObject($unwrapTraitObject(context).reportError).bind(context, file);
  return $unwrapTraitObject(_js._Object).assign({}, $unwrapTraitObject(visit).emptyVisitor, _structure_visitor.structureVisitor, {
    reportError: reportError,
    visitImplDeclaration: function visitImplDeclaration(i) {
      var self = this;
      $unwrapTraitObject(self).scope = $unwrapTraitObject($unwrapTraitObject(self).scope).createChild();
      i.scope = $unwrapTraitObject(self).scope;
      _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: i.typeParameters, $isTraitObject: true }, $unwrapTraitObject($unwrapTraitObject(self).visitTypeParameter).bind(self));
      $unwrapTraitObject(self).visitTypeBound(i.trait_);
      $unwrapTraitObject(self).visitTypeBound(i.type_);
      var traitType = i.trait_.type_;
      var structType = i.type_.type_;
      $unwrapTraitObject($unwrapTraitObject(self).scope).setSelfBinding(_core.Option.unwrap.call(structType.name));
      _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: i.members, $isTraitObject: true }, function (m) {
        return $unwrapTraitObject(self).visitMethodDeclaration(m, structType);
      });
      var __PUCK__value__6 = traitType.kind;
      if ($unwrapTraitObject(__PUCK__value__6).kind == "Trait") {
        var _PUCK__value__6$valu = _slicedToArray(__PUCK__value__6.value, 1),
            trait_ = _PUCK__value__6$valu[0];

        var __PUCK__value__7 = structType.kind;
        var __PUCK__value__8 = __PUCK__value__7;
        if ($unwrapTraitObject(__PUCK__value__8).kind == "Enum") {
          var _PUCK__value__8$valu = _slicedToArray(__PUCK__value__8.value, 1),
              enum_ = _PUCK__value__8$valu[0];

          implementTrait(traitType, trait_, structType, enum_, i, reportError);
        } else {
          var __PUCK__value__9 = __PUCK__value__7;
          if ($unwrapTraitObject(__PUCK__value__9).kind == "Struct") {
            var _PUCK__value__9$valu = _slicedToArray(__PUCK__value__9.value, 1),
                struct = _PUCK__value__9$valu[0];

            implementTrait(traitType, trait_, structType, struct, i, reportError);
          } else {
            var __PUCK__value__10 = __PUCK__value__7;
            if (true) {
              var __PUCK__value__11 = __PUCK__value__10;
              reportError(i.type_, _entities.Type.displayName.call(structType) + " is not a struct or an enum");
            };
          };
        };
      } else {
        reportError(i.trait_, _entities.Type.displayName.call(traitType) + " is not a trait");
      };
      return $unwrapTraitObject(self).scope = $unwrapTraitObject($unwrapTraitObject(self).scope).parent;
    },
    visitImplShorthandDeclaration: function visitImplShorthandDeclaration(i) {
      var self = this;
      $unwrapTraitObject(self).scope = $unwrapTraitObject($unwrapTraitObject(self).scope).createChild();
      i.scope = $unwrapTraitObject(self).scope;
      _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: i.typeParameters, $isTraitObject: true }, $unwrapTraitObject($unwrapTraitObject(self).visitTypeParameter).bind(self));
      $unwrapTraitObject(self).visitTypeBound(i.type_);
      var structType = i.type_.type_;
      $unwrapTraitObject($unwrapTraitObject(self).scope).setSelfBinding(_core.Option.unwrap.call(structType.name));
      _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: i.members, $isTraitObject: true }, function (m) {
        return $unwrapTraitObject(self).visitMethodDeclaration(m, structType);
      });
      var __PUCK__value__12 = structType.kind;
      var __PUCK__value__13 = __PUCK__value__12;
      if ($unwrapTraitObject(__PUCK__value__13).kind == "Enum") {
        var _PUCK__value__13$val = _slicedToArray(__PUCK__value__13.value, 1),
            enum_ = _PUCK__value__13$val[0];

        implementShorthand(structType, enum_, i, reportError);
      } else {
        var __PUCK__value__14 = __PUCK__value__12;
        if ($unwrapTraitObject(__PUCK__value__14).kind == "Struct") {
          var _PUCK__value__14$val = _slicedToArray(__PUCK__value__14.value, 1),
              struct = _PUCK__value__14$val[0];

          implementShorthand(structType, struct, i, reportError);
        } else {
          var __PUCK__value__15 = __PUCK__value__12;
          if (true) {
            var __PUCK__value__16 = __PUCK__value__15;
            reportError(i.type_, _entities.Type.displayName.call(structType) + " is not a struct or an enum");
          };
        };
      };
      return $unwrapTraitObject(self).scope = $unwrapTraitObject($unwrapTraitObject(self).scope).parent;
    },
    visitModule: function visitModule(m) {
      var self = this;
      $unwrapTraitObject(self).scope = m.scope;
      return $unwrapTraitObject(m.expressions.filter(function (e) {
        return $unwrapTraitObject(e).kind == $unwrapTraitObject(_ast2.SyntaxKind).ImportDirective || $unwrapTraitObject(e).kind == $unwrapTraitObject(_ast2.SyntaxKind).ImplDeclaration || $unwrapTraitObject(e).kind == $unwrapTraitObject(_ast2.SyntaxKind).ImplShorthandDeclaration;
      })).forEach($unwrapTraitObject($unwrapTraitObject(self).visitExpression).bind(self));
    },
    visitObjectDestructure: function visitObjectDestructure(i) {
      var self = this;
      return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: i.members, $isTraitObject: true }, function (m) {
        if (importDirective._module) {
          var e = $unwrapTraitObject($unwrapTraitObject(importDirective._module).exports)[m.local.name];
          if ($unwrapTraitObject($unwrapTraitObject(e).expression).kind == $unwrapTraitObject(_ast2.SyntaxKind).TraitDeclaration) {
            var binding = $unwrapTraitObject($unwrapTraitObject(self).scope).getTypeBinding(m.local.name);
            $unwrapTraitObject(binding).type_ = $unwrapTraitObject($unwrapTraitObject(e).expression).type_;
            binding = $unwrapTraitObject($unwrapTraitObject(self).scope).getBinding(m.local.name);
            $unwrapTraitObject(binding).type_ = $unwrapTraitObject($unwrapTraitObject(e).expression).type_;
          };
          if ($unwrapTraitObject($unwrapTraitObject(e).expression).kind == $unwrapTraitObject(_ast2.SyntaxKind).TypeDeclaration) {
            var _binding = $unwrapTraitObject($unwrapTraitObject(self).scope).getTypeBinding(m.local.name);
            return $unwrapTraitObject(_binding).type_ = $unwrapTraitObject($unwrapTraitObject(e).expression).type_;
          };
        };
      });
    },
    visitImportDirective: function visitImportDirective(i) {
      var self = this;
      if ($unwrapTraitObject(i.specifier).kind == $unwrapTraitObject(_ast2.SyntaxKind).ObjectDestructure) {
        importDirective = i;
        return $unwrapTraitObject(visit).walkImportDirective(self, i);
      };
    }
  });
}
