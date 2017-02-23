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
  _core.ObjectMap.forEach.call(traitFunctions, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        name = _ref2[0],
        traitFunctionType = _ref2[1];

    var traitFunction = _entities.Type.getFunction.call(traitFunctionType);
    if (traitFunction.isAbstract && !_core.ObjectMap.has.call(functions, name)) {
      return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplDeclaration', value: i, $isTraitObject: true }, "Function " + traitName + "::" + name + " is not implemented for " + _entities.Type.displayName.call(type_));
    };
  });
  _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true }, function (functionDeclaration) {
    var functionName = _entities.Type.displayName.call(functionDeclaration.type_);
    var _function = _entities.Type.getFunction.call(functionDeclaration.type_);
    var __PUCK__value__1 = _core.ObjectMap.get.call(traitFunctions, _core.Option.unwrap.call(functionDeclaration.type_.name));
    if (__PUCK__value__1.kind == "Some") {
      var _PUCK__value__1$valu = _slicedToArray(__PUCK__value__1.value, 1),
          traitFunctionType = _PUCK__value__1$valu[0];

      var traitFunctionName = _entities.Type.displayName.call(traitFunctionType);
      var traitFunction = _entities.Type.getFunction.call(traitFunctionType);
      var __PUCK__value__2 = [_function.selfBinding, traitFunction.selfBinding];
      if ($unwrapTraitObject($unwrapTraitObject(__PUCK__value__2)[0]).kind == "Some" && $unwrapTraitObject($unwrapTraitObject(__PUCK__value__2)[1]).kind == "Some") {
        var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__2),
            _$unwrapTraitObject2 = _slicedToArray(_$unwrapTraitObject, 2),
            _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2[0].value, 1),
            implSelf = _$unwrapTraitObject2$[0],
            _$unwrapTraitObject2$2 = _slicedToArray(_$unwrapTraitObject2[1].value, 1),
            traitSelf = _$unwrapTraitObject2$2[0];

        if (implSelf.mutable && !traitSelf.mutable) {
          return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: functionDeclaration, $isTraitObject: true }, "Function " + traitName + "::" + traitFunctionName + " requires an immutable self parameter");
        };
      } else {
        if ($unwrapTraitObject($unwrapTraitObject(__PUCK__value__2)[0]).kind == "None" && $unwrapTraitObject($unwrapTraitObject(__PUCK__value__2)[1]).kind == "Some") {
          var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__2),
              _$unwrapTraitObject4 = _slicedToArray(_$unwrapTraitObject3, 2),
              _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4[1].value, 1),
              __PUCK__value__3 = _$unwrapTraitObject4$[0];

          return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: functionDeclaration, $isTraitObject: true }, "Function " + traitName + "::" + traitFunctionName + " requires a self parameter");
        } else {
          if ($unwrapTraitObject($unwrapTraitObject(__PUCK__value__2)[1]).kind == "None") {
            var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__2),
                _$unwrapTraitObject6 = _slicedToArray(_$unwrapTraitObject5, 1),
                __PUCK__value__4 = _$unwrapTraitObject6[0];

            return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: functionDeclaration, $isTraitObject: true }, "Static trait functions can not be implemented");
          };
        };
      };
    } else {
      return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImplDeclaration', value: i, $isTraitObject: true }, "Function " + functionName + " is not defined by " + traitName + "");
    };
  });
  var __PUCK__value__5 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true }, function (p) {
    return p.type_;
  });
  var implementation = (0, _entities.Implementation)({
    id: id,
    type_: type_,
    trait_: traitType,
    typeParameters: _core.Iterable[__PUCK__value__5.type].toList.call(__PUCK__value__5)
  });
  i.implementation = implementation;
  _core.List.push.call(implementable.implementations, implementation);
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true }, function (functionDeclaration) {
    var functionName = _entities.Type.displayName.call(functionDeclaration.type_);
    var traitFunctionType = _core.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({ type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: traitFunctions, $isTraitObject: true }, _core.Option.unwrap.call(functionDeclaration.type_.name));
    var traitFunction = _entities.Type.getFunction.call(traitFunctionType);
    var _function = _entities.Type.getFunction.call(functionDeclaration.type_);
    functionDeclaration.traitFunctionType = traitFunctionType;
    var __PUCK__value__6 = (0, _functions.checkFunctionAssignability)(functionName, traitFunction, _function);
    if (__PUCK__value__6.kind == "Err") {
      var _PUCK__value__6$valu = _slicedToArray(__PUCK__value__6.value, 1),
          error = _PUCK__value__6$valu[0];

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
  var __PUCK__value__7 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true }, function (p) {
    return p.type_;
  });
  return _core.List.push.call(implementable.implementations, {
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
    },
    typeParameters: _core.Iterable[__PUCK__value__7.type].toList.call(__PUCK__value__7)
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
  return _js._Object.assign({}, visit.emptyVisitor, (0, _structure_visitor.structureVisitor)(reportError, "ImplVisitor"), {
    visitModule: function visitModule(m) {
      var self = this;
      $unwrapTraitObject(self).scope = m.scope;
      var __PUCK__value__8 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: m.statements, $isTraitObject: true }, function (e) {
        var __PUCK__value__9 = e;
        if ($unwrapTraitObject(__PUCK__value__9).kind == "ImplDeclaration") {
          var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__9),
              _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
              __PUCK__value__10 = _$unwrapTraitObject7$[0];

          return true;
        } else {
          if ($unwrapTraitObject(__PUCK__value__9).kind == "ImplShorthandDeclaration") {
            var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__9),
                _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
                __PUCK__value__11 = _$unwrapTraitObject8$[0];

            return true;
          } else {
            if (true) {
              var __PUCK__value__12 = __PUCK__value__9;
              return false;
            };
          };
        };
      });
      return _core.Iterable[__PUCK__value__8.type].forEach.call(__PUCK__value__8, function (s) {
        return $unwrapTraitObject(self).visitTopLevelStatement(s);
      });
    },
    visitImplDeclaration: function visitImplDeclaration(i) {
      var self = this;
      var parentScope = $unwrapTraitObject(self).scope;
      var scope = _scope.Scope.createChild.call(parentScope);
      $unwrapTraitObject(self).scope = scope;
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
      var __PUCK__value__13 = traitType.kind;
      if (__PUCK__value__13.kind == "Trait") {
        var _PUCK__value__13$val = _slicedToArray(__PUCK__value__13.value, 1),
            trait_ = _PUCK__value__13$val[0];

        var __PUCK__value__14 = structType.kind;
        if ($unwrapTraitObject(__PUCK__value__14).kind == "Enum") {
          var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__14),
              _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
              enum_ = _$unwrapTraitObject9$[0];

          var e = enum_;
          implementTrait(traitType, trait_, structType, e, i, reportError, id);
        } else {
          if ($unwrapTraitObject(__PUCK__value__14).kind == "Struct") {
            var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__14),
                _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
                struct = _$unwrapTraitObject11[0];

            var s = struct;
            implementTrait(traitType, trait_, structType, s, i, reportError, id);
          } else {
            if (true) {
              var __PUCK__value__15 = __PUCK__value__14;
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
      _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.typeParameters, $isTraitObject: true }, $unwrapTraitObject($unwrapTraitObject(self).visitTypeParameter).bind(self));
      $unwrapTraitObject(self).visitTypeBound(i.type_);
      var structType = _ast.TypeBound.getType.call(i.type_);
      _scope.Scope.setSelfType.call(scope, structType);
      _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true }, function (m) {
        return $unwrapTraitObject(self).visitMethodDeclaration(m, structType);
      });
      var __PUCK__value__16 = structType.kind;
      if ($unwrapTraitObject(__PUCK__value__16).kind == "Enum") {
        var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__16),
            _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12.value, 1),
            enum_ = _$unwrapTraitObject13[0];

        var e = enum_;
        implementShorthand(structType, e, i, reportError);
      } else {
        if ($unwrapTraitObject(__PUCK__value__16).kind == "Struct") {
          var _$unwrapTraitObject14 = $unwrapTraitObject(__PUCK__value__16),
              _$unwrapTraitObject15 = _slicedToArray(_$unwrapTraitObject14.value, 1),
              struct = _$unwrapTraitObject15[0];

          var s = struct;
          implementShorthand(structType, s, i, reportError);
        } else {
          if (true) {
            var __PUCK__value__17 = __PUCK__value__16;
            reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: i.type_, $isTraitObject: true }, _entities.Type.displayName.call(structType) + " is not a struct or an enum");
          };
        };
      };
      return $unwrapTraitObject(self).scope = parentScope;
    }
  });
}
