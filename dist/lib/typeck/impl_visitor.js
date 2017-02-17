'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.ImplVisitor = ImplVisitor;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _ast = require('./../ast/ast');

var _span = require('./../ast/span');

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

function implementTrait(traitType, trait_, type_, implementable, i, reportError, id) {
  var traitName = _entities.Type.displayName.call(traitType);
  if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementable.implementations, $isTraitObject: true }, function (imp) {
    return imp.trait_ == traitType;
  })) {
    reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplDeclaration', value: i, $isTraitObject: true }, "" + traitName + " has already been implemented for " + _entities.Type.displayName.call(type_));
  };
  var functions = _core.ObjectMap.fromIter(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true }, function (functionDeclaration) {
    return [_core.Option.unwrap.call(functionDeclaration.type_.name), functionDeclaration.type_];
  }));
  var traitFunctions = trait_.functions;
  _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _core.ObjectMap.keys.call(traitFunctions), $isTraitObject: true }, function (name) {
    var traitFunctionType = traitFunctions[name];
    var traitFunction = _entities.Type.getFunction.call(traitFunctionType);
    if (traitFunction.isAbstract && !functions[name]) {
      return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplDeclaration', value: i, $isTraitObject: true }, "Function " + traitName + "::" + name + " is not implemented for " + _entities.Type.displayName.call(type_));
    };
  });
  _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true }, function (functionDeclaration) {
    var functionName = _entities.Type.displayName.call(functionDeclaration.type_);
    var _function = _entities.Type.getFunction.call(functionDeclaration.type_);
    var traitFunctionType = traitFunctions[_core.Option.unwrap.call(functionDeclaration.type_.name)];
    if (!traitFunctionType) {
      reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplDeclaration', value: i, $isTraitObject: true }, "Function " + functionName + " is not defined by " + traitName + "");
    };
    var traitFunctionName = _entities.Type.displayName.call(traitFunctionType);
    var traitFunction = _entities.Type.getFunction.call(traitFunctionType);
    var __PUCK__value__1 = _function.selfBinding;
    if ($unwrapTraitObject(__PUCK__value__1).kind == "Some") {
      var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__1),
          _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
          implSelf = _$unwrapTraitObject$v[0];

      var __PUCK__value__2 = traitFunction.selfBinding;
      if ($unwrapTraitObject(__PUCK__value__2).kind == "Some") {
        var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__2),
            _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
            traitSelf = _$unwrapTraitObject2$[0];

        if (implSelf.mutable && !traitSelf.mutable) {
          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: functionDeclaration, $isTraitObject: true }, "Function " + traitName + "::" + traitFunctionName + " requires an immutable self parameter");
        };
      } else {
        reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: functionDeclaration, $isTraitObject: true }, "Function " + traitName + "::" + traitFunctionName + " is static");
      };
      return [];
    } else {
      var __PUCK__value__3 = traitFunction.selfBinding;
      if ($unwrapTraitObject(__PUCK__value__3).kind == "Some") {
        var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__3),
            _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
            __PUCK__value__4 = _$unwrapTraitObject3$[0];

        return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: functionDeclaration, $isTraitObject: true }, "Function " + traitName + "::" + traitFunctionName + " requires a self parameter");
      };
    };
  });
  var implementation = (0, _entities.Implementation)({
    id: id,
    type_: type_,
    trait_: traitType
  });
  i.implementation = implementation;
  implementable.implementations.push(implementation);
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true }, function (functionDeclaration) {
    var functionName = _entities.Type.displayName.call(functionDeclaration.type_);
    var traitFunctionType = traitFunctions[_core.Option.unwrap.call(functionDeclaration.type_.name)];
    var traitFunction = _entities.Type.getFunction.call(traitFunctionType);
    var _function = _entities.Type.getFunction.call(functionDeclaration.type_);
    functionDeclaration.traitFunctionType = traitFunctionType;
    var __PUCK__value__5 = (0, _functions.checkFunctionAssignability)(functionName, traitFunction, _function);
    if ($unwrapTraitObject(__PUCK__value__5).kind == "Err") {
      var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__5),
          _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
          error = _$unwrapTraitObject4$[0];

      return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: functionDeclaration, $isTraitObject: true }, error);
    };
  });
};
function implementShorthand(type_, implementable, i, reportError) {
  var typeName = _entities.Type.displayName.call(type_);
  if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].any.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: implementable.implementations, $isTraitObject: true }, function (imp) {
    return _entities.Type.getTrait.call(imp.trait_).isShorthand;
  })) {
    reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplShorthandDeclaration', value: i, $isTraitObject: true }, "" + typeName + " has already been implemented");
  };
  var functions = _core.ObjectMap.fromIter(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true }, function (functionDeclaration) {
    return [_core.Option.unwrap.call(functionDeclaration.type_.name), functionDeclaration.type_];
  }));
  return _core.List.add.call(implementable.implementations, {
    type_: type_,
    trait_: {
      id: type_.id,
      displayName: type_.displayName,
      name: type_.name,
      kind: _entities.TypeKind.Trait({
        isShorthand: true,
        functions: functions
      }),
      _class: _core.None,
      instance: _core.None,
      providesType: _core.None,
      enumMember: _core.None
    }
  });
};
function ImplVisitor(context, file) {
  var importDirective = void 0;
  var reportError = $unwrapTraitObject($unwrapTraitObject(context).reportError).bind(context, file);
  function getImplId(type_, trait_) {
    var id = "$impl_" + _core.Option.unwrap.call(type_.id) + "$" + _core.Option.unwrap.call(trait_.id);
    if ($unwrapTraitObject($unwrapTraitObject(context).impls)[$unwrapTraitObject(id)]) {
      id = "" + id + "$" + $unwrapTraitObject($unwrapTraitObject(context).impls)[$unwrapTraitObject(id)];
      $unwrapTraitObject($unwrapTraitObject(context).impls)[$unwrapTraitObject(id)] += 1;
    } else {
      $unwrapTraitObject($unwrapTraitObject(context).impls)[$unwrapTraitObject(id)] = 1;
    };
    return id;
  };
  return $unwrapTraitObject(_js._Object).assign({}, visit.emptyVisitor, (0, _structure_visitor.structureVisitor)(reportError, "ImplVisitor"), {
    visitModule: function visitModule(m) {
      var self = this;
      $unwrapTraitObject(self).scope = m.scope;
      var __PUCK__value__6 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: m.statements, $isTraitObject: true }, function (e) {
        var __PUCK__value__7 = e;
        var __PUCK__value__8 = __PUCK__value__7;
        if ($unwrapTraitObject(__PUCK__value__8).kind == "ImplDeclaration") {
          var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__8),
              _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
              __PUCK__value__9 = _$unwrapTraitObject5$[0];

          return true;
        } else {
          var __PUCK__value__10 = __PUCK__value__7;
          if ($unwrapTraitObject(__PUCK__value__10).kind == "ImplShorthandDeclaration") {
            var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__10),
                _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
                __PUCK__value__11 = _$unwrapTraitObject6$[0];

            return true;
          } else {
            var __PUCK__value__12 = __PUCK__value__7;
            if (true) {
              var __PUCK__value__13 = __PUCK__value__12;
              return false;
            };
          };
        };
      });
      return _core.Iterable[__PUCK__value__6.type].forEach.call(__PUCK__value__6, function (s) {
        return $unwrapTraitObject(self).visitTopLevelStatement(s);
      });
    },
    visitImplDeclaration: function visitImplDeclaration(i) {
      var self = this;
      var parentScope = $unwrapTraitObject(self).scope;
      var scope = _scope.Scope.createChild.call(parentScope);
      $unwrapTraitObject(self).scope = scope;
      i.scope = scope;
      _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true }, $unwrapTraitObject($unwrapTraitObject(self).visitTypeParameter).bind(self));
      $unwrapTraitObject(self).visitTypeBound(i.trait_);
      $unwrapTraitObject(self).visitTypeBound(i.type_);
      var traitType = _ast.TypeBound.getType.call(i.trait_);
      var structType = _ast.TypeBound.getType.call(i.type_);
      _scope.Scope.setSelfType.call(scope, structType);
      _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true }, function (m) {
        return $unwrapTraitObject(self).visitMethodDeclaration(m, structType);
      });
      var id = getImplId(traitType, structType);
      var __PUCK__value__14 = traitType.kind;
      if ($unwrapTraitObject(__PUCK__value__14).kind == "Trait") {
        var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__14),
            _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
            trait_ = _$unwrapTraitObject7$[0];

        var __PUCK__value__15 = structType.kind;
        var __PUCK__value__16 = __PUCK__value__15;
        if ($unwrapTraitObject(__PUCK__value__16).kind == "Enum") {
          var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__16),
              _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
              enum_ = _$unwrapTraitObject8$[0];

          implementTrait(traitType, trait_, structType, enum_, i, reportError, id);
        } else {
          var __PUCK__value__17 = __PUCK__value__15;
          if ($unwrapTraitObject(__PUCK__value__17).kind == "Struct") {
            var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__17),
                _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
                struct = _$unwrapTraitObject9$[0];

            implementTrait(traitType, trait_, structType, struct, i, reportError, id);
          } else {
            var __PUCK__value__18 = __PUCK__value__15;
            if (true) {
              var __PUCK__value__19 = __PUCK__value__18;
              reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: i.type_, $isTraitObject: true }, _entities.Type.displayName.call(structType) + " is not a struct or an enum");
            };
          };
        };
      } else {
        reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: i.trait_, $isTraitObject: true }, _entities.Type.displayName.call(traitType) + " is not a trait");
      };
      return $unwrapTraitObject(self).scope = parentScope;
    },
    visitImplShorthandDeclaration: function visitImplShorthandDeclaration(i) {
      var self = this;
      var parentScope = $unwrapTraitObject(self).scope;
      var scope = _scope.Scope.createChild.call(parentScope);
      $unwrapTraitObject(self).scope = scope;
      i.scope = $unwrapTraitObject(self).scope;
      _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true }, $unwrapTraitObject($unwrapTraitObject(self).visitTypeParameter).bind(self));
      $unwrapTraitObject(self).visitTypeBound(i.type_);
      var structType = _ast.TypeBound.getType.call(i.type_);
      _scope.Scope.setSelfType.call(scope, structType);
      _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true }, function (m) {
        return $unwrapTraitObject(self).visitMethodDeclaration(m, structType);
      });
      var __PUCK__value__20 = structType.kind;
      var __PUCK__value__21 = __PUCK__value__20;
      if ($unwrapTraitObject(__PUCK__value__21).kind == "Enum") {
        var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__21),
            _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
            enum_ = _$unwrapTraitObject11[0];

        var e = enum_;
        implementShorthand(structType, e, i, reportError);
      } else {
        var __PUCK__value__22 = __PUCK__value__20;
        if ($unwrapTraitObject(__PUCK__value__22).kind == "Struct") {
          var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__22),
              _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12.value, 1),
              struct = _$unwrapTraitObject13[0];

          var s = struct;
          implementShorthand(structType, s, i, reportError);
        } else {
          var __PUCK__value__23 = __PUCK__value__20;
          if (true) {
            var __PUCK__value__24 = __PUCK__value__23;
            reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: i.type_, $isTraitObject: true }, _entities.Type.displayName.call(structType) + " is not a struct or an enum");
          };
        };
      };
      return $unwrapTraitObject(self).scope = parentScope;
    }
  });
}
