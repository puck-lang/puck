'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.ScopeVisitor = ScopeVisitor;

var _core = require('puck-lang/dist/lib/stdlib/core');

var core = _interopRequireWildcard(_core);

var _js = require('puck-lang/dist/lib/stdlib/js');

var _util = require('util');

var _ast = require('./../ast/ast');

var _span = require('./../ast/span');

var _visit = require('./../ast/visit');

var visit = _interopRequireWildcard(_visit);

var _ast2 = require('./../compiler/ast');

var _enums = require('./src/enums');

var _functions = require('./src/functions');

var _impls = require('./src/impls');

var _patterns = require('./src/patterns');

var _range = require('./src/range');

var _scope = require('./src/scope');

var _structure_visitor = require('./src/structure_visitor');

var _type_function = require('./src/type_function');

var _types = require('./src/types');

var _entities = require('./../entities');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};

function asType(a) {
  return a;
};
function asIterable(a) {
  return { type: '$impl_lib/stdlib/core.puck:Iterable$List', value: a, $isTraitObject: true };
};
function ScopeVisitor(context, file) {
  var importDirective = void 0;
  var matchExpression = _core.None;
  var reportError = $unwrapTraitObject($unwrapTraitObject(context).reportError).bind(context, file);
  function getBinding(e) {
    var __PUCK__value__1 = e;
    var __PUCK__value__2 = __PUCK__value__1;
    if ($unwrapTraitObject(__PUCK__value__2).kind == "Identifier") {
      var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__2),
          _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
          i = _$unwrapTraitObject$v[0];

      var scope = i.scope;
      return _scope.Scope.getBinding.call(scope, i.name);
    } else {
      var __PUCK__value__3 = __PUCK__value__1;
      if ($unwrapTraitObject(__PUCK__value__3).kind == "IndexAccess") {
        var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__3),
            _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
            _i = _$unwrapTraitObject2$[0];

        return getBinding(_i.object);
      } else {
        var __PUCK__value__4 = __PUCK__value__1;
        if ($unwrapTraitObject(__PUCK__value__4).kind == "MemberAccess") {
          var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__4),
              _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
              _i2 = _$unwrapTraitObject3$[0];

          return getBinding(_i2.object);
        } else {
          var __PUCK__value__5 = __PUCK__value__1;
          if (true) {
            var __PUCK__value__6 = __PUCK__value__5;
            return _core.None;
          };
        };
      };
    };
  };
  function checkFunctionCall(functionType, c) {
    if (!functionType) {
      return _js._undefined;
    };
    var __PUCK__value__7 = c.func;
    var __PUCK__value__8 = __PUCK__value__7;
    var __PUCK__value__9 = void 0;
    if ($unwrapTraitObject(__PUCK__value__8).kind == "Identifier") {
      var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__8),
          _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
          i = _$unwrapTraitObject4$[0];

      __PUCK__value__9 = (0, _core.Some)(i.name);
    } else {
      var __PUCK__value__10 = __PUCK__value__7;
      var __PUCK__value__11 = void 0;
      if (true) {
        var __PUCK__value__12 = __PUCK__value__10;
        __PUCK__value__11 = _core.None;
      };
      __PUCK__value__9 = __PUCK__value__11;
    };
    var namei = __PUCK__value__9;
    var name = _core.Option.unwrapOrElse.call(namei, function () {
      return _entities.Type.displayName.call(functionType);
    });
    var __PUCK__value__13 = functionType.kind;
    var __PUCK__value__14 = __PUCK__value__13;
    var __PUCK__value__15 = void 0;
    if ($unwrapTraitObject(__PUCK__value__14).kind == "Function") {
      var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__14),
          _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
          func = _$unwrapTraitObject5$[0];

      __PUCK__value__15 = func;
    } else {
      var __PUCK__value__16 = __PUCK__value__13;
      var __PUCK__value__17 = void 0;
      if (true) {
        var __PUCK__value__18 = __PUCK__value__16;
        reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: c, $isTraitObject: true }, "" + name + " is not callable");
        return _js._undefined;
      };
      __PUCK__value__15 = __PUCK__value__17;
    };
    var _function = __PUCK__value__15;
    var __PUCK__value__19 = _function.selfBinding;
    if ($unwrapTraitObject(__PUCK__value__19).kind == "Some") {
      var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__19),
          _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
          selfBinding = _$unwrapTraitObject6$[0];

      if (selfBinding.mutable) {
        if (!_core.Option.mapOr.call(getBinding(c.func), true, function (binding) {
          return binding.mutable;
        })) {
          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: c, $isTraitObject: true }, "" + name + " can only be called on a mutable binding");
        };
      };
    };
    var __PUCK__value__20 = (0, _range.checkRange)(c.argumentList, _function.parameterRange, "arguments", name);
    if ($unwrapTraitObject(__PUCK__value__20).kind == "Err") {
      var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__20),
          _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
          error = _$unwrapTraitObject7$[0];

      reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: c, $isTraitObject: true }, error);
      return _function;
    };
    var __PUCK__value__21 = functionType._class;
    var __PUCK__value__22 = void 0;
    if ($unwrapTraitObject(__PUCK__value__21).kind == "Some") {
      (function () {
        var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__21),
            _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
            _class = _$unwrapTraitObject8$[0];

        var parameterMap = _core.ObjectMap._new();
        var __PUCK__value__23 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _function.parameters, $isTraitObject: true });
        _core.Iterable[__PUCK__value__23.type].forEach.call(__PUCK__value__23, function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              parameter = _ref2[0],
              i = _ref2[1];

          var __PUCK__value__24 = void 0;
          if (i < c.argumentList.length) {
            __PUCK__value__24 = c.argumentList[i];
          } else {
            __PUCK__value__24 = parameter;
          };
          var argument = __PUCK__value__24;
          if (parameter.type_ && _ast.Expression.getType.call(argument)) {
            var __PUCK__value__25 = parameter.type_.kind;
            if ($unwrapTraitObject(__PUCK__value__25).kind == "Parameter") {
              var _undefined2 = $unwrapTraitObject(__PUCK__value__25);
              if (parameterMap[_core.Option.unwrap.call(parameter.type_.name)]) {
                var existingMapping = parameterMap[_core.Option.unwrap.call(parameter.type_.name)];
                if (!(0, _types.isAssignable)(existingMapping, _ast.Expression.getType.call(argument))) {
                  if ((0, _types.isAssignable)(_ast.Expression.getType.call(argument), existingMapping)) {
                    return parameterMap[_core.Option.unwrap.call(parameter.type_.name)] = _ast.Expression.getType.call(argument);
                  } else {
                    return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: argument, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(existingMapping, _ast.Expression.getType.call(argument)));
                  };
                };
              } else {
                parameterMap[_core.Option.unwrap.call(parameter.type_.name)] = _ast.Expression.getType.call(argument);
                return [];
              };
            };
          };
        });
        var resolvedFunction = (0, _types.resolveTypeParameters)(parameterMap)(functionType);
        __PUCK__value__22 = _entities.Type.getFunction.call(resolvedFunction);
      })();
    } else {
      __PUCK__value__22 = _function;
    };
    _function = __PUCK__value__22;
    var __PUCK__value__26 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: c.argumentList, $isTraitObject: true });
    _core.Iterable[__PUCK__value__26.type].forEach.call(__PUCK__value__26, function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          argument = _ref4[0],
          i = _ref4[1];

      var parameter = _function.parameters[i];
      var __PUCK__value__27 = void 0;
      if ($unwrapTraitObject(parameter).pattern) {
        var __PUCK__value__28 = $unwrapTraitObject(parameter).pattern;
        var __PUCK__value__29 = void 0;
        if ($unwrapTraitObject(__PUCK__value__28).kind == "Identifier") {
          var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__28),
              _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
              _name = _$unwrapTraitObject9$[0].name;

          __PUCK__value__29 = _name;
        } else {
          __PUCK__value__29 = "" + i + "";
        };
        __PUCK__value__27 = __PUCK__value__29;
      } else {
        __PUCK__value__27 = "" + i + "";
      };
      var parameterName = __PUCK__value__27;
      var pType = $unwrapTraitObject(parameter).type_;
      if (!(0, _types.isAssignable)($unwrapTraitObject(parameter).type_, _ast.Expression.getType.call(argument))) {
        reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: argument, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)($unwrapTraitObject(parameter).type_, _ast.Expression.getType.call(argument)) + " in parameter " + parameterName + " of function " + name + "");
      };
      if ($unwrapTraitObject(parameter).mutable) {
        var __PUCK__value__30 = getBinding(argument);
        if ($unwrapTraitObject(__PUCK__value__30).kind == "Some") {
          var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__30),
              _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
              argumentBinding = _$unwrapTraitObject11[0];

          var argumentName = argumentBinding.name;
          if (!argumentBinding.mutable) {
            return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: argument, $isTraitObject: true }, "Parameter " + parameterName + " of function " + name + " requires a mutable binding " + "but " + argumentName + " is declared as immutable.");
          };
        };
      };
    });
    return _function;
  };
  var structureVisitorInstance = (0, _structure_visitor.structureVisitor)(reportError);
  return $unwrapTraitObject(_js._Object).assign({}, visit.walkingVisitor, structureVisitorInstance, {
    reportError: reportError,
    visitModule: function visitModule(m) {
      var self = this;
      $unwrapTraitObject(self).scope = m.scope;
      _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: m.statements, $isTraitObject: true }, function (s) {
        var __PUCK__value__31 = s;
        var __PUCK__value__32 = __PUCK__value__31;
        if ($unwrapTraitObject(__PUCK__value__32).kind == "ExportDirective" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__32).value)[$unwrapTraitObject(0)]).statement).kind == "FunctionDeclaration") {
          var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__32),
              _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12.value, 1),
              _$unwrapTraitObject14 = _slicedToArray(_$unwrapTraitObject13[0].statement.value, 1),
              f = _$unwrapTraitObject14[0];

          return $unwrapTraitObject(self).visitFunctionDeclaration(f, true);
        } else {
          var __PUCK__value__33 = __PUCK__value__31;
          if ($unwrapTraitObject(__PUCK__value__33).kind == "BlockLevelStatement" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__33).value)[$unwrapTraitObject(0)]).kind == "Expression" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__33).value)[$unwrapTraitObject(0)]).value)[$unwrapTraitObject(0)]).kind == "FunctionDeclaration") {
            var _$unwrapTraitObject15 = $unwrapTraitObject(__PUCK__value__33),
                _$unwrapTraitObject16 = _slicedToArray(_$unwrapTraitObject15.value, 1),
                _$unwrapTraitObject17 = _slicedToArray(_$unwrapTraitObject16[0].value, 1),
                _$unwrapTraitObject18 = _slicedToArray(_$unwrapTraitObject17[0].value, 1),
                _f = _$unwrapTraitObject18[0];

            return $unwrapTraitObject(self).visitFunctionDeclaration(_f, true);
          } else {
            var __PUCK__value__34 = __PUCK__value__31;
            if (true) {
              var __PUCK__value__35 = __PUCK__value__34;;
              var __PUCK__value__36 = __PUCK__value__35;;
              return __PUCK__value__35;
            };
          };
        };
      });
      return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: m.statements, $isTraitObject: true }, function (s) {
        $unwrapTraitObject(self).isUsed = false;
        return $unwrapTraitObject(self).visitTopLevelStatement(s);
      });
    },
    visitExpression: function visitExpression(e) {
      var self = this;
      $unwrapTraitObject(self).isUsed = true;
      return $unwrapTraitObject($unwrapTraitObject(visit.walkingVisitor).visitExpression).call(self, e);
    },
    visitImplDeclaration: function visitImplDeclaration(i) {
      var self = this;
      return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true }, function (f) {
        return $unwrapTraitObject(self).visitFunctionDeclaration(f);
      });
    },
    visitImplShorthandDeclaration: function visitImplShorthandDeclaration(i) {
      var self = this;
      return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true }, function (f) {
        return $unwrapTraitObject(self).visitFunctionDeclaration(f);
      });
    },
    visitTraitDeclaration: function visitTraitDeclaration(t) {
      var self = this;
      var parentScope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(self).scope = t.scope;
      visit.walkTraitDeclaration(self, t);
      return $unwrapTraitObject(self).scope = parentScope;
    },
    visitTypeDeclaration: function visitTypeDeclaration(t) {},
    visitExportDirective: function visitExportDirective(e) {
      var self = this;
      return visit.walkExportDirective(self, e);
    },
    visitImportDirective: function visitImportDirective(i) {},
    visitObjectDestructure: function visitObjectDestructure(i) {},
    visitBlock: function visitBlock(b) {
      var isUsed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var self = this;
      b.scope = $unwrapTraitObject(self).scope;
      _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true }, function (s) {
        var __PUCK__value__37 = s;
        var __PUCK__value__38 = __PUCK__value__37;
        if ($unwrapTraitObject(__PUCK__value__38).kind == "Expression" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__38).value)[$unwrapTraitObject(0)]).kind == "FunctionDeclaration") {
          var _$unwrapTraitObject19 = $unwrapTraitObject(__PUCK__value__38),
              _$unwrapTraitObject20 = _slicedToArray(_$unwrapTraitObject19.value, 1),
              _$unwrapTraitObject21 = _slicedToArray(_$unwrapTraitObject20[0].value, 1),
              f = _$unwrapTraitObject21[0];

          return $unwrapTraitObject(self).visitFunctionDeclaration(f, true);
        } else {
          var __PUCK__value__39 = __PUCK__value__37;
          if (true) {
            var __PUCK__value__40 = __PUCK__value__39;;
            var __PUCK__value__41 = __PUCK__value__40;;
            return __PUCK__value__40;
          };
        };
      });
      var lastIndex = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true }) - 1;
      var __PUCK__value__42 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true });
      _core.Iterable[__PUCK__value__42.type].forEach.call(__PUCK__value__42, function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            s = _ref6[0],
            index = _ref6[1];

        $unwrapTraitObject(self).isUsed = isUsed && index == lastIndex;
        return $unwrapTraitObject(self).visitBlockLevelStatement(s);
      });
      var __PUCK__value__43 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].last.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true });
      var __PUCK__value__44 = void 0;
      if ($unwrapTraitObject(__PUCK__value__43).kind == "Some") {
        var _$unwrapTraitObject22 = $unwrapTraitObject(__PUCK__value__43),
            _$unwrapTraitObject23 = _slicedToArray(_$unwrapTraitObject22.value, 1),
            last = _$unwrapTraitObject23[0];

        __PUCK__value__44 = _ast.BlockLevelStatement.getType.call(last);
      } else {
        __PUCK__value__44 = _entities.Type.empty();
      };
      return b.type_ = __PUCK__value__44;
    },
    visitBreak: function visitBreak(b) {
      var self = this;
      return b.scope = $unwrapTraitObject(self).scope;
    },
    visitReturn: function visitReturn(r) {
      var self = this;
      r.scope = $unwrapTraitObject(self).scope;
      return visit.walkReturn(self, r);
    },
    visitWhileLoop: function visitWhileLoop(e) {
      var self = this;
      var parentScope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(self).scope = _scope.Scope.createChild.call(parentScope);
      e.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(self).visitExpression(e.condition);
      $unwrapTraitObject(self).visitBlock(e.body, false);
      e.type_ = _entities.Type.empty();
      return $unwrapTraitObject(self).scope = parentScope;
    },
    visitIdentifier: function visitIdentifier(i) {
      var self = this;
      var scope = $unwrapTraitObject(self).scope;
      i.scope = $unwrapTraitObject(self).scope;
      var __PUCK__value__45 = _scope.Scope.getBinding.call(scope, i.name);
      if ($unwrapTraitObject(__PUCK__value__45).kind == "Some") {
        var _$unwrapTraitObject24 = $unwrapTraitObject(__PUCK__value__45),
            _$unwrapTraitObject25 = _slicedToArray(_$unwrapTraitObject24.value, 1),
            binding = _$unwrapTraitObject25[0];

        var b = binding;
        var __PUCK__value__46 = void 0;
        if (binding.type_ && _core.Option.isSome.call(binding.type_.providesType)) {
          __PUCK__value__46 = (0, _type_function.enumMemberToFunction)(b.type_);
        } else {
          __PUCK__value__46 = binding.type_;
        };
        i.type_ = __PUCK__value__46;
      } else {
        reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: i, $isTraitObject: true }, "Use of undefined variable " + i.name);
      };
      return visit.walkIdentifier(self, i);
    },
    visitFunctionDeclaration: function visitFunctionDeclaration(f) {
      var isHoisting = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var self = this;
      structureVisitorInstance.visitFunctionDeclaration.call(self, f);
      if (!isHoisting) {
        var selfScope = $unwrapTraitObject(self).scope;
        $unwrapTraitObject(self).scope = f.scope;
        _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true }, function (p) {
          return $unwrapTraitObject(self).visitVariableDeclaration(p);
        });
        var __PUCK__value__47 = f.body;
        if ($unwrapTraitObject(__PUCK__value__47).kind == "Some") {
          var _$unwrapTraitObject26 = $unwrapTraitObject(__PUCK__value__47),
              _$unwrapTraitObject27 = _slicedToArray(_$unwrapTraitObject26.value, 1),
              body = _$unwrapTraitObject27[0];

          $unwrapTraitObject(self).visitBlock(body);
          var __PUCK__value__48 = f.type_.kind;
          if ($unwrapTraitObject(__PUCK__value__48).kind == "Function") {
            var _$unwrapTraitObject28 = $unwrapTraitObject(__PUCK__value__48),
                _$unwrapTraitObject29 = _slicedToArray(_$unwrapTraitObject28.value, 1),
                func = _$unwrapTraitObject29[0];

            if (func.returnType) {
              if (!(0, _types.isAssignable)(func.returnType, body.type_)) {
                reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: f, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(func.returnType, body.type_) + " as returnType");
              };
            } else {
              $unwrapTraitObject(_js._Object).assign(func, { returnType: body.type_ });
            };
          };
        };
        return $unwrapTraitObject(self).scope = selfScope;
      };
    },
    visitVariableDeclaration: function visitVariableDeclaration(d, visitInitializer, type_) {
      var allowNotExhaustive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      var self = this;
      var __PUCK__value__49 = void 0;
      if (visitInitializer) {
        __PUCK__value__49 = visitInitializer;
      } else {
        __PUCK__value__49 = function __PUCK__value__49(e) {
          var parentAssignedTo = $unwrapTraitObject(self).assignedTo;
          $unwrapTraitObject(self).assignedTo = d;
          $unwrapTraitObject(self).isUsed = true;
          $unwrapTraitObject(self).visitExpression(e);
          return $unwrapTraitObject(self).assignedTo = parentAssignedTo;
        };
      };
      return structureVisitorInstance.visitVariableDeclaration.call(self, d, __PUCK__value__49, type_, allowNotExhaustive);
    },
    visitAssignmentExpression: function visitAssignmentExpression(e) {
      var self = this;
      e.scope = $unwrapTraitObject(self).scope;
      visit.walkAssignmentExpression(self, e);
      var __PUCK__value__50 = getBinding(e.lhs);
      if ($unwrapTraitObject(__PUCK__value__50).kind == "Some") {
        var _$unwrapTraitObject30 = $unwrapTraitObject(__PUCK__value__50),
            _$unwrapTraitObject31 = _slicedToArray(_$unwrapTraitObject30.value, 1),
            binding = _$unwrapTraitObject31[0];

        if (!binding.mutable) {
          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:AssignmentExpression', value: e, $isTraitObject: true }, "Can't assign to immutable variable " + binding.name);
        };
        if (!(0, _types.isAssignable)(_ast.Expression.getType.call(e.lhs), _ast.Expression.getType.call(e.rhs))) {
          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:AssignmentExpression', value: e, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(_ast.Expression.getType.call(e.lhs), _ast.Expression.getType.call(e.rhs)));
        };
      };
      return e.type_ = _ast.Expression.getType.call(e.lhs) || _ast.Expression.getType.call(e.rhs);
    },
    visitBinaryExpression: function visitBinaryExpression(e) {
      var self = this;
      e.scope = $unwrapTraitObject(self).scope;
      return visit.walkBinaryExpression(self, e);
    },
    visitCallExpression: function visitCallExpression(e) {
      var self = this;
      e.scope = $unwrapTraitObject(self).scope;
      var scope = e.scope;
      $unwrapTraitObject(self).visitExpression(e.func);
      var functionType = _ast.Expression.getType.call(e.func);
      var __PUCK__value__51 = e.func;
      if ($unwrapTraitObject(__PUCK__value__51).kind == "MemberAccess") {
        var _$unwrapTraitObject32 = $unwrapTraitObject(__PUCK__value__51),
            _$unwrapTraitObject33 = _slicedToArray(_$unwrapTraitObject32.value, 1),
            access = _$unwrapTraitObject33[0];

        if (_ast.Expression.getType.call(access.object)) {
          (function () {
            var name = access.member.name;
            var objectType = _ast.Expression.getType.call(access.object);
            var __PUCK__value__52 = objectType.providesType;
            if ($unwrapTraitObject(__PUCK__value__52).kind == "Some") {
              var _$unwrapTraitObject34 = $unwrapTraitObject(__PUCK__value__52),
                  _$unwrapTraitObject35 = _slicedToArray(_$unwrapTraitObject34.value, 1),
                  providesType = _$unwrapTraitObject35[0];

              var __PUCK__value__53 = providesType.kind;
              var __PUCK__value__54 = __PUCK__value__53;
              if ($unwrapTraitObject(__PUCK__value__54).kind == "Enum") {
                var _$unwrapTraitObject36 = $unwrapTraitObject(__PUCK__value__54),
                    _$unwrapTraitObject37 = _slicedToArray(_$unwrapTraitObject36.value, 1),
                    enum_ = _$unwrapTraitObject37[0];

                functionType = $unwrapTraitObject(_core.Option.unwrapOr.call(_core.Option.map.call(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: enum_.implementations, $isTraitObject: true }, function (_ref7) {
                  var trait_ = _ref7.trait_;

                  return _entities.Type.getTrait.call(trait_).isShorthand;
                }), function (_ref8) {
                  var trait_ = _ref8.trait_;

                  return _entities.Type.getTrait.call(trait_).functions[name];
                }), _js._undefined));
              } else {
                var __PUCK__value__55 = __PUCK__value__53;
                if ($unwrapTraitObject(__PUCK__value__55).kind == "Struct") {
                  var _$unwrapTraitObject38 = $unwrapTraitObject(__PUCK__value__55),
                      _$unwrapTraitObject39 = _slicedToArray(_$unwrapTraitObject38.value, 1),
                      struct = _$unwrapTraitObject39[0];

                  functionType = $unwrapTraitObject(_core.Option.unwrapOr.call(_core.Option.map.call(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: struct.implementations, $isTraitObject: true }, function (_ref9) {
                    var trait_ = _ref9.trait_;

                    return _entities.Type.getTrait.call(trait_).isShorthand;
                  }), function (_ref10) {
                    var trait_ = _ref10.trait_;

                    return _entities.Type.getTrait.call(trait_).functions[name];
                  }), _js._undefined));
                } else {
                  var __PUCK__value__56 = __PUCK__value__53;
                  if ($unwrapTraitObject(__PUCK__value__56).kind == "Trait") {
                    var _$unwrapTraitObject40 = $unwrapTraitObject(__PUCK__value__56),
                        _$unwrapTraitObject41 = _slicedToArray(_$unwrapTraitObject40.value, 1),
                        trait_ = _$unwrapTraitObject41[0];

                    functionType = trait_.functions[name];
                  } else {
                    var __PUCK__value__57 = __PUCK__value__53;
                    if (true) {
                      var __PUCK__value__58 = __PUCK__value__57;
                    };
                  };
                };
              };
              if (functionType) {
                var _function = _entities.Type.getFunction.call(functionType);
                if (_core.Option.isSome.call(_function.selfBinding)) {
                  reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true }, _entities.Type.displayName.call(providesType) + "::" + name + " takes a self parameter and can't be called directly");
                } else {
                  e.traitName = _core.Option.unwrap.call(_scope.Scope.getBindingByTypeId.call(scope, _core.Option.unwrap.call(providesType.id))).name;
                  e.isTraitObject = true;
                };
              } else {
                reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true }, _entities.Type.displayName.call(providesType) + " has no function named " + name + "");
              };
            } else {
              var __PUCK__value__59 = objectType.kind;
              if ($unwrapTraitObject(__PUCK__value__59).kind == "Trait") {
                var _$unwrapTraitObject42 = $unwrapTraitObject(__PUCK__value__59),
                    _$unwrapTraitObject43 = _slicedToArray(_$unwrapTraitObject42.value, 1),
                    _trait_ = _$unwrapTraitObject43[0];

                functionType = _trait_.functions[name];
                if (functionType) {
                  var _function2 = _entities.Type.getFunction.call(functionType);
                  if (_core.Option.isSome.call(_function2.selfBinding)) {
                    var __PUCK__value__60 = _scope.Scope.getBindingByTypeId.call(scope, _core.Option.unwrap.call(objectType.id));
                    if ($unwrapTraitObject(__PUCK__value__60).kind == "Some") {
                      var _$unwrapTraitObject44 = $unwrapTraitObject(__PUCK__value__60),
                          _$unwrapTraitObject45 = _slicedToArray(_$unwrapTraitObject44.value, 1),
                          binding = _$unwrapTraitObject45[0];

                      e.traitName = binding.name;
                      e.isTraitObject = true;
                    } else {
                      var typeName = _core.Option.unwrap.call(objectType.name);
                      reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true }, "The function " + name + " is defined in trait " + typeName + " but it is not in scope");
                    };
                  };
                };
              } else {
                var __PUCK__value__61 = (0, _impls.getImplementation)(name, objectType, e, reportError);
                if ($unwrapTraitObject(__PUCK__value__61).kind == "Some") {
                  var _$unwrapTraitObject46 = $unwrapTraitObject(__PUCK__value__61),
                      _$unwrapTraitObject47 = _slicedToArray(_$unwrapTraitObject46.value, 1),
                      implementation = _$unwrapTraitObject47[0];

                  var __PUCK__value__62 = implementation.trait_.instance;
                  var __PUCK__value__63 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__62).kind == "Some") {
                    var _$unwrapTraitObject48 = $unwrapTraitObject(__PUCK__value__62),
                        _$unwrapTraitObject49 = _slicedToArray(_$unwrapTraitObject48.value, 1),
                        instance = _$unwrapTraitObject49[0];

                    __PUCK__value__63 = instance._class;
                  } else {
                    __PUCK__value__63 = implementation.trait_;
                  };
                  var _trait_2 = __PUCK__value__63;
                  var __PUCK__value__64 = _scope.Scope.getBindingByTypeId.call(scope, _core.Option.unwrap.call(_trait_2.id));
                  if ($unwrapTraitObject(__PUCK__value__64).kind == "Some") {
                    var _$unwrapTraitObject50 = $unwrapTraitObject(__PUCK__value__64),
                        _$unwrapTraitObject51 = _slicedToArray(_$unwrapTraitObject50.value, 1),
                        _binding = _$unwrapTraitObject51[0];

                    e.traitName = _binding.name;
                    e.isShorthand = _entities.Type.getTrait.call(_trait_2).isShorthand;
                    e.implementation = implementation;
                    functionType = _entities.Type.getTrait.call(asType(implementation.trait_)).functions[name];
                  } else {
                    var traitName = _core.Option.unwrap.call(_trait_2.name);
                    var id = _core.Option.unwrap.call(_trait_2.id);
                    reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true }, "The function " + name + " is defined in trait " + traitName + " but it is not in scope");
                  };
                };
              };
              var __PUCK__value__65 = objectType.instance;
              if ($unwrapTraitObject(__PUCK__value__65).kind == "Some") {
                var _$unwrapTraitObject52 = $unwrapTraitObject(__PUCK__value__65),
                    _$unwrapTraitObject53 = _slicedToArray(_$unwrapTraitObject52.value, 1),
                    _instance = _$unwrapTraitObject53[0];

                functionType = (0, _types.resolveTypeParameters)(_instance.parameterMap)(functionType);
              };
            };
          })();
        };
      };
      var parentAssignedTo = void 0;
      if (functionType && _entities.Type.isFunction.call(functionType)) {
        (function () {
          var callTypeParameters = _core.Option.unwrapOr.call(_core.Option.map.call(functionType._class, function (_class) {
            return _class.typeParameters;
          }), []);
          var callParameterMap = _core.ObjectMap._new();
          var parentAssignedTo = $unwrapTraitObject(self).assignedTo;
          var functionKind = _entities.Type.getFunction.call(functionType);
          var __PUCK__value__67 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true });
          var __PUCK__value__66 = _core.Iterable[__PUCK__value__67.type].take.call(__PUCK__value__67, _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: functionKind.parameters, $isTraitObject: true }));
          _core.Iterable[__PUCK__value__66.type].forEach.call(__PUCK__value__66, function (_ref11) {
            var _ref12 = _slicedToArray(_ref11, 2),
                a = _ref12[0],
                i = _ref12[1];

            var parameter = functionKind.parameters[i];
            $unwrapTraitObject(self).assignedTo = parameter;
            $unwrapTraitObject(self).visitExpression(a);
            if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isNotEmpty.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: callTypeParameters, $isTraitObject: true }) && $unwrapTraitObject(parameter).type_ && _ast.Expression.getType.call(a)) {
              return (0, _functions.resolveFunctionTypeParameters)(callParameterMap, callTypeParameters, $unwrapTraitObject(parameter).type_, _ast.Expression.getType.call(a));
            };
          });
          if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isNotEmpty.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: callTypeParameters, $isTraitObject: true })) {
            functionType = (0, _types.resolveTypeParameters)(callParameterMap)(functionType);
          };
          $unwrapTraitObject(self).assignedTo = parentAssignedTo;
        })();
      } else {
        parentAssignedTo = $unwrapTraitObject(self).assignedTo;
        $unwrapTraitObject(self).assignedTo = _js._undefined;
        _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true }, function (a) {
          return $unwrapTraitObject(self).visitExpression(a);
        });
        $unwrapTraitObject(self).assignedTo = parentAssignedTo;
      };
      if (functionType) {
        e.functionType = functionType;
        var _function = checkFunctionCall(functionType, e);
        if (_function) {
          return e.type_ = _function.returnType;
        };
      };
    },
    visitIfExpression: function visitIfExpression(e) {
      var self = this;
      var parentScope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(self).scope = _scope.Scope.createChild.call(parentScope);
      e.scope = $unwrapTraitObject(self).scope;
      var isUsed = $unwrapTraitObject(self).isUsed;
      $unwrapTraitObject(self).visitExpression(e.condition);
      $unwrapTraitObject(self).visitBlock(e.then_, isUsed);
      var __PUCK__value__68 = e.else_;
      if ($unwrapTraitObject(__PUCK__value__68).kind == "Some") {
        var _$unwrapTraitObject54 = $unwrapTraitObject(__PUCK__value__68),
            _$unwrapTraitObject55 = _slicedToArray(_$unwrapTraitObject54.value, 1),
            else_ = _$unwrapTraitObject55[0];

        $unwrapTraitObject(self).visitBlock(else_, isUsed);
      };
      if (isUsed) {
        var __PUCK__value__69 = e.else_;
        var __PUCK__value__70 = void 0;
        if ($unwrapTraitObject(__PUCK__value__69).kind == "Some") {
          var _$unwrapTraitObject56 = $unwrapTraitObject(__PUCK__value__69),
              _$unwrapTraitObject57 = _slicedToArray(_$unwrapTraitObject56.value, 1),
              _else_ = _$unwrapTraitObject57[0];

          var __PUCK__value__71 = (0, _types.findCommonType)([e.then_.type_, _else_.type_]);
          var __PUCK__value__72 = __PUCK__value__71;
          var __PUCK__value__73 = void 0;
          if ($unwrapTraitObject(__PUCK__value__72).kind == "Ok") {
            var _$unwrapTraitObject58 = $unwrapTraitObject(__PUCK__value__72),
                _$unwrapTraitObject59 = _slicedToArray(_$unwrapTraitObject58.value, 1),
                type_ = _$unwrapTraitObject59[0];

            __PUCK__value__73 = type_;
          } else {
            var __PUCK__value__74 = __PUCK__value__71;
            var __PUCK__value__75 = void 0;
            if ($unwrapTraitObject(__PUCK__value__74).kind == "Err") {
              var _$unwrapTraitObject60 = $unwrapTraitObject(__PUCK__value__74),
                  _$unwrapTraitObject61 = _slicedToArray(_$unwrapTraitObject60.value, 1),
                  __PUCK__value__76 = _$unwrapTraitObject61[0];

              __PUCK__value__75 = reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression', value: e, $isTraitObject: true }, "Type " + _entities.Type.displayName.call(e.then_.type_) + " and " + _entities.Type.displayName.call(asType(_else_.type_)) + " is not compatible");
            };
            __PUCK__value__73 = __PUCK__value__75;
          };
          __PUCK__value__70 = __PUCK__value__73;
        } else {
          __PUCK__value__70 = _entities.Type.empty();
        };
        e.type_ = __PUCK__value__70;
      };
      return $unwrapTraitObject(self).scope = parentScope;
    },
    visitIfLetExpression: function visitIfLetExpression(e) {
      var self = this;
      var parentScope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(self).scope = _scope.Scope.createChild.call(parentScope);
      e.scope = $unwrapTraitObject(self).scope;
      var isUsed = $unwrapTraitObject(self).isUsed;
      $unwrapTraitObject(self).visitPattern(e.pattern);
      $unwrapTraitObject(self).visitExpression(e.expression);
      var __PUCK__value__77 = (0, _patterns.declarePatternVariables)(e.scope, self, e.pattern, false, _ast.Expression.getType.call(e.expression), true);
      var __PUCK__value__78 = __PUCK__value__77;
      if ($unwrapTraitObject(__PUCK__value__78).kind == "Ok") {
        var _$unwrapTraitObject62 = $unwrapTraitObject(__PUCK__value__78),
            _$unwrapTraitObject63 = _slicedToArray(_$unwrapTraitObject62.value, 1),
            __PUCK__value__79 = _$unwrapTraitObject63[0];
      } else {
        var __PUCK__value__80 = __PUCK__value__77;
        if ($unwrapTraitObject(__PUCK__value__80).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__80).value)[$unwrapTraitObject(0)]).kind == "PatternMismatch") {
          var _$unwrapTraitObject64 = $unwrapTraitObject(__PUCK__value__80),
              _$unwrapTraitObject65 = _slicedToArray(_$unwrapTraitObject64.value, 1),
              _$unwrapTraitObject66 = _slicedToArray(_$unwrapTraitObject65[0].value, 3),
              pattern = _$unwrapTraitObject66[0],
              to = _$unwrapTraitObject66[1],
              subject = _$unwrapTraitObject66[2];

          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(to, subject));
        } else {
          var __PUCK__value__81 = __PUCK__value__77;
          if ($unwrapTraitObject(__PUCK__value__81).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__81).value)[$unwrapTraitObject(0)]).kind == "ScopeError") {
            var _$unwrapTraitObject67 = $unwrapTraitObject(__PUCK__value__81),
                _$unwrapTraitObject68 = _slicedToArray(_$unwrapTraitObject67.value, 1),
                _$unwrapTraitObject69 = _slicedToArray(_$unwrapTraitObject68[0].value, 2),
                token = _$unwrapTraitObject69[0],
                err = _$unwrapTraitObject69[1];

            reportError(token, err);
          } else {
            var __PUCK__value__82 = __PUCK__value__77;
            if ($unwrapTraitObject(__PUCK__value__82).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__82).value)[$unwrapTraitObject(0)]).kind == "NotExhaustive") {
              var _$unwrapTraitObject70 = $unwrapTraitObject(__PUCK__value__82),
                  _$unwrapTraitObject71 = _toArray(_$unwrapTraitObject70.value);
            };
          };
        };
      };
      $unwrapTraitObject(self).visitBlock(e.then_, isUsed);
      var __PUCK__value__83 = e.else_;
      if ($unwrapTraitObject(__PUCK__value__83).kind == "Some") {
        var _$unwrapTraitObject72 = $unwrapTraitObject(__PUCK__value__83),
            _$unwrapTraitObject73 = _slicedToArray(_$unwrapTraitObject72.value, 1),
            else_ = _$unwrapTraitObject73[0];

        $unwrapTraitObject(self).visitBlock(else_, isUsed);
      };
      if (isUsed) {
        var __PUCK__value__84 = e.else_;
        var __PUCK__value__85 = void 0;
        if ($unwrapTraitObject(__PUCK__value__84).kind == "Some") {
          var _$unwrapTraitObject74 = $unwrapTraitObject(__PUCK__value__84),
              _$unwrapTraitObject75 = _slicedToArray(_$unwrapTraitObject74.value, 1),
              _else_2 = _$unwrapTraitObject75[0];

          var __PUCK__value__86 = (0, _types.findCommonType)([e.then_.type_, _else_2.type_]);
          var __PUCK__value__87 = __PUCK__value__86;
          var __PUCK__value__88 = void 0;
          if ($unwrapTraitObject(__PUCK__value__87).kind == "Ok") {
            var _$unwrapTraitObject76 = $unwrapTraitObject(__PUCK__value__87),
                _$unwrapTraitObject77 = _slicedToArray(_$unwrapTraitObject76.value, 1),
                type_ = _$unwrapTraitObject77[0];

            __PUCK__value__88 = type_;
          } else {
            var __PUCK__value__89 = __PUCK__value__86;
            var __PUCK__value__90 = void 0;
            if ($unwrapTraitObject(__PUCK__value__89).kind == "Err") {
              var _$unwrapTraitObject78 = $unwrapTraitObject(__PUCK__value__89),
                  _$unwrapTraitObject79 = _slicedToArray(_$unwrapTraitObject78.value, 1),
                  __PUCK__value__91 = _$unwrapTraitObject79[0];

              __PUCK__value__90 = reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression', value: e, $isTraitObject: true }, "Type " + _entities.Type.displayName.call(e.then_.type_) + " and " + _entities.Type.displayName.call(asType(_else_2.type_)) + " is not compatible");
            };
            __PUCK__value__88 = __PUCK__value__90;
          };
          __PUCK__value__85 = __PUCK__value__88;
        } else {
          __PUCK__value__85 = _entities.Type.empty();
        };
        e.type_ = __PUCK__value__85;
      };
      return $unwrapTraitObject(self).scope = parentScope;
    },
    visitMatchExpression: function visitMatchExpression(e) {
      var self = this;
      e.scope = $unwrapTraitObject(self).scope;
      var oldMatchExpression = matchExpression;
      matchExpression = (0, _core.Some)(e);
      var isUsed = $unwrapTraitObject(self).isUsed;
      $unwrapTraitObject(self).visitExpression(e.expression);
      _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true }, function (a) {
        return $unwrapTraitObject(self).visitMatchArm(a, isUsed);
      });
      var __PUCK__value__92 = (0, _enums.checkExhaustive)(e);
      if ($unwrapTraitObject(__PUCK__value__92).kind == "Err") {
        var _$unwrapTraitObject80 = $unwrapTraitObject(__PUCK__value__92),
            _$unwrapTraitObject81 = _slicedToArray(_$unwrapTraitObject80.value, 1),
            error = _$unwrapTraitObject81[0];

        reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true }, error);
      };
      if (isUsed) {
        var __PUCK__value__93 = void 0;
        if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isNotEmpty.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true })) {
          var __PUCK__value__95 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true }, function (arm) {
            return arm.type_;
          });
          var __PUCK__value__94 = (0, _types.findCommonType)(_core.Iterable[__PUCK__value__95.type].toList.call(__PUCK__value__95));
          var __PUCK__value__96 = __PUCK__value__94;
          var __PUCK__value__97 = void 0;
          if ($unwrapTraitObject(__PUCK__value__96).kind == "Ok") {
            var _$unwrapTraitObject82 = $unwrapTraitObject(__PUCK__value__96),
                _$unwrapTraitObject83 = _slicedToArray(_$unwrapTraitObject82.value, 1),
                type_ = _$unwrapTraitObject83[0];

            __PUCK__value__97 = type_;
          } else {
            var __PUCK__value__98 = __PUCK__value__94;
            var __PUCK__value__99 = void 0;
            if ($unwrapTraitObject(__PUCK__value__98).kind == "Err") {
              var _$unwrapTraitObject84 = $unwrapTraitObject(__PUCK__value__98),
                  _$unwrapTraitObject85 = _slicedToArray(_$unwrapTraitObject84.value, 1),
                  __PUCK__value__100 = _$unwrapTraitObject85[0];

              __PUCK__value__99 = reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true }, "Match arms return mixed types " + _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true }, function (arm) {
                return _entities.Type.displayName.call(asType(arm.type_));
              }).value.join(", "));
            };
            __PUCK__value__97 = __PUCK__value__99;
          };
          __PUCK__value__93 = __PUCK__value__97;
        } else {
          __PUCK__value__93 = _entities.Type.empty();
        };
        e.type_ = __PUCK__value__93;
      };
      return matchExpression = oldMatchExpression;
    },
    visitMatchArm: function visitMatchArm(a, isUsed) {
      var self = this;
      var parentScope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(self).scope = _scope.Scope.createChild.call(parentScope);
      a.scope = $unwrapTraitObject(self).scope;
      var m = _core.Option.unwrap.call(matchExpression);
      $unwrapTraitObject(self).visitPattern(a.pattern);
      var __PUCK__value__101 = (0, _patterns.declarePatternVariables)(a.scope, self, a.pattern, false, _ast.Expression.getType.call(m.expression), true);
      var __PUCK__value__102 = __PUCK__value__101;
      if ($unwrapTraitObject(__PUCK__value__102).kind == "Ok") {
        var _$unwrapTraitObject86 = $unwrapTraitObject(__PUCK__value__102),
            _$unwrapTraitObject87 = _slicedToArray(_$unwrapTraitObject86.value, 1),
            __PUCK__value__103 = _$unwrapTraitObject87[0];
      } else {
        var __PUCK__value__104 = __PUCK__value__101;
        if ($unwrapTraitObject(__PUCK__value__104).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__104).value)[$unwrapTraitObject(0)]).kind == "PatternMismatch") {
          var _$unwrapTraitObject88 = $unwrapTraitObject(__PUCK__value__104),
              _$unwrapTraitObject89 = _slicedToArray(_$unwrapTraitObject88.value, 1),
              _$unwrapTraitObject90 = _slicedToArray(_$unwrapTraitObject89[0].value, 3),
              pattern = _$unwrapTraitObject90[0],
              to = _$unwrapTraitObject90[1],
              subject = _$unwrapTraitObject90[2];

          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchArm', value: a, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(to, subject));
        } else {
          var __PUCK__value__105 = __PUCK__value__101;
          if ($unwrapTraitObject(__PUCK__value__105).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__105).value)[$unwrapTraitObject(0)]).kind == "ScopeError") {
            var _$unwrapTraitObject91 = $unwrapTraitObject(__PUCK__value__105),
                _$unwrapTraitObject92 = _slicedToArray(_$unwrapTraitObject91.value, 1),
                _$unwrapTraitObject93 = _slicedToArray(_$unwrapTraitObject92[0].value, 2),
                token = _$unwrapTraitObject93[0],
                err = _$unwrapTraitObject93[1];

            reportError(token, err);
          } else {
            var __PUCK__value__106 = __PUCK__value__101;
            if ($unwrapTraitObject(__PUCK__value__106).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__106).value)[$unwrapTraitObject(0)]).kind == "NotExhaustive") {
              var _$unwrapTraitObject94 = $unwrapTraitObject(__PUCK__value__106),
                  _$unwrapTraitObject95 = _toArray(_$unwrapTraitObject94.value);
            };
          };
        };
      };
      $unwrapTraitObject(self).visitBlock(a.block, isUsed);
      a.type_ = a.block.type_;
      return $unwrapTraitObject(self).scope = parentScope;
    },
    visitTypePathExpression: function visitTypePathExpression(e) {
      var self = this;
      e.scope = $unwrapTraitObject(self).scope;
      var typePath = e.typePath;
      $unwrapTraitObject(self).visitTypePath(e.typePath);
      var type_ = e.typePath.type_;
      return e.type_ = (0, _type_function.enumMemberToFunction)(e.typePath.type_);
    },
    visitUnaryExpression: function visitUnaryExpression(e) {
      var self = this;
      var scope = $unwrapTraitObject(self).scope;
      e.scope = $unwrapTraitObject(self).scope;
      visit.walkUnaryExpression(self, e);
      if (e.operator.kind == $unwrapTraitObject(_ast2.SyntaxKind).NotKeyword) {
        var __PUCK__value__107 = _scope.Scope.getBindingByTypeId.call(scope, "Bool");
        if ($unwrapTraitObject(__PUCK__value__107).kind == "Some") {
          var _$unwrapTraitObject96 = $unwrapTraitObject(__PUCK__value__107),
              _$unwrapTraitObject97 = _slicedToArray(_$unwrapTraitObject96.value, 1),
              binding = _$unwrapTraitObject97[0];

          e.type_ = _core.Option.unwrap.call(binding.type_.providesType);
        } else {
          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true }, "puck:core::Bool is not in scope. Please import Bool from puck:core to use boolean literals.");
        };
      } else {
        if (e.operator.kind == $unwrapTraitObject(_ast2.SyntaxKind).MinusToken || e.operator.kind == $unwrapTraitObject(_ast2.SyntaxKind).PlusToken) {
          var __PUCK__value__108 = _scope.Scope.getBindingByTypeId.call(scope, "Num");
          if ($unwrapTraitObject(__PUCK__value__108).kind == "Some") {
            var _$unwrapTraitObject98 = $unwrapTraitObject(__PUCK__value__108),
                _$unwrapTraitObject99 = _slicedToArray(_$unwrapTraitObject98.value, 1),
                _binding2 = _$unwrapTraitObject99[0];

            e.type_ = _core.Option.unwrap.call(_binding2.type_.providesType);
          } else {
            reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true }, "puck:core::Num is not in scope. Please import Num from puck:core to use number literals.");
          };
        };
      };
      return [];
    },
    visitIndexAccess: function visitIndexAccess(a) {
      var self = this;
      a.scope = $unwrapTraitObject(self).scope;
      return visit.walkIndexAccess(self, a);
    },
    visitMemberAccess: function visitMemberAccess(a) {
      var self = this;
      a.scope = $unwrapTraitObject(self).scope;
      visit.walkExpression(self, a.object);
      if (_ast.Expression.getType.call(a.object)) {
        var __PUCK__value__109 = _ast.Expression.getType.call(a.object).kind;
        if ($unwrapTraitObject(__PUCK__value__109).kind == "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__109).value)[$unwrapTraitObject(0)]).kind).kind == "Record") {
          var _$unwrapTraitObject100 = $unwrapTraitObject(__PUCK__value__109),
              _$unwrapTraitObject101 = _slicedToArray(_$unwrapTraitObject100.value, 1),
              _$unwrapTraitObject102 = _slicedToArray(_$unwrapTraitObject101[0].kind.value, 1),
              record = _$unwrapTraitObject102[0];

          return a.type_ = record.properties[a.member.name];
        } else {};
      };
    },
    visitBooleanLiteral: function visitBooleanLiteral(l) {
      var self = this;
      var scope = $unwrapTraitObject(self).scope;
      l.scope = $unwrapTraitObject(self).scope;
      var __PUCK__value__110 = _scope.Scope.getBindingByTypeId.call(scope, "Bool");
      if ($unwrapTraitObject(__PUCK__value__110).kind == "Some") {
        var _$unwrapTraitObject103 = $unwrapTraitObject(__PUCK__value__110),
            _$unwrapTraitObject104 = _slicedToArray(_$unwrapTraitObject103.value, 1),
            binding = _$unwrapTraitObject104[0];

        l.type_ = _core.Option.unwrap.call(binding.type_.providesType);
      } else {
        reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BooleanLiteral', value: l, $isTraitObject: true }, "puck:core::Bool is not in scope. Please import Bool from puck:core to use boolean literals.");
      };
      return visit.walkBooleanLiteral(self, l);
    },
    visitListLiteral: function visitListLiteral(l) {
      var self = this;
      var scope = $unwrapTraitObject(self).scope;
      var __PUCK__value__111 = _scope.Scope.getBindingByTypeId.call(scope, "List");
      var __PUCK__value__112 = void 0;
      if ($unwrapTraitObject(__PUCK__value__111).kind == "Some") {
        var _$unwrapTraitObject105 = $unwrapTraitObject(__PUCK__value__111),
            _$unwrapTraitObject106 = _slicedToArray(_$unwrapTraitObject105.value, 1),
            binding = _$unwrapTraitObject106[0];

        __PUCK__value__112 = _core.Option.unwrap.call(binding.type_.providesType);
      } else {
        return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral', value: l, $isTraitObject: true }, "puck:core::List is not in scope. Please import List from puck:core to use list literals.");
      };
      var listType = __PUCK__value__112;
      l.scope = $unwrapTraitObject(self).scope;
      visit.walkListLiteral(self, l);
      if (l.members.length >= 1) {
        var __PUCK__value__113 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true }, function (m) {
          return _ast.Expression.getType.call(m);
        });
        var types = _core.Iterable[__PUCK__value__113.type].toList.call(__PUCK__value__113);
        var result = (0, _types.findCommonType)(types);
        var __PUCK__value__114 = result;
        var __PUCK__value__115 = __PUCK__value__114;
        if ($unwrapTraitObject(__PUCK__value__115).kind == "Ok") {
          var _$unwrapTraitObject107 = $unwrapTraitObject(__PUCK__value__115),
              _$unwrapTraitObject108 = _slicedToArray(_$unwrapTraitObject107.value, 1),
              type_ = _$unwrapTraitObject108[0];

          if (!type_) {
            return l.type_ = listType;
          } else {
            return l.type_ = (0, _types.createTypeInstance)(listType, asIterable([type_]));
          };
        } else {
          var __PUCK__value__116 = __PUCK__value__114;
          if ($unwrapTraitObject(__PUCK__value__116).kind == "Err") {
            var _$unwrapTraitObject109 = $unwrapTraitObject(__PUCK__value__116),
                _$unwrapTraitObject110 = _slicedToArray(_$unwrapTraitObject109.value, 1),
                __PUCK__value__117 = _$unwrapTraitObject110[0];

            return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral', value: l, $isTraitObject: true }, "List contains mixed types");
          };
        };
      } else {
        return l.type_ = listType;
      };
    },
    visitNumberLiteral: function visitNumberLiteral(l) {
      var self = this;
      var scope = $unwrapTraitObject(self).scope;
      l.scope = $unwrapTraitObject(self).scope;
      var __PUCK__value__118 = _scope.Scope.getBindingByTypeId.call(scope, "Num");
      if ($unwrapTraitObject(__PUCK__value__118).kind == "Some") {
        var _$unwrapTraitObject111 = $unwrapTraitObject(__PUCK__value__118),
            _$unwrapTraitObject112 = _slicedToArray(_$unwrapTraitObject111.value, 1),
            binding = _$unwrapTraitObject112[0];

        l.type_ = _core.Option.unwrap.call(binding.type_.providesType);
      } else {
        reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NumberLiteral', value: l, $isTraitObject: true }, "puck:core::Num is not in scope. Please import Num from puck:core to use number literals.");
      };
      return visit.walkNumberLiteral(self, l);
    },
    visitRecordLiteral: function visitRecordLiteral(l) {
      var self = this;
      l.scope = $unwrapTraitObject(self).scope;
      _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true }, function (m) {
        return $unwrapTraitObject(self).visitExpression(m.value);
      });
      return l.type_ = (0, _entities.Type)({
        id: _core.None,
        displayName: _core.None,
        name: _core.None,
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: _entities.StructKind.Record({ properties: _core.ObjectMap.fromIter(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true }, function (m) {
              return [m.name.name, _ast.Expression.getType.call(m.value)];
            })) })
        }),
        _class: _core.None,
        instance: _core.None,
        providesType: _core.None,
        enumMember: _core.None,
        complete: true
      });
    },
    visitStringLiteral: function visitStringLiteral(l) {
      var self = this;
      var scope = $unwrapTraitObject(self).scope;
      l.scope = $unwrapTraitObject(self).scope;
      var __PUCK__value__119 = _scope.Scope.getBindingByTypeId.call(scope, "String");
      if ($unwrapTraitObject(__PUCK__value__119).kind == "Some") {
        var _$unwrapTraitObject113 = $unwrapTraitObject(__PUCK__value__119),
            _$unwrapTraitObject114 = _slicedToArray(_$unwrapTraitObject113.value, 1),
            binding = _$unwrapTraitObject114[0];

        l.type_ = _core.Option.unwrap.call(binding.type_.providesType);
      } else {
        reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral', value: l, $isTraitObject: true }, "puck:core::String is not in scope. Please import String from puck:core to use string literals.");
      };
      return visit.walkStringLiteral(self, l);
    },
    visitTupleLiteral: function visitTupleLiteral(l) {
      var self = this;
      l.scope = $unwrapTraitObject(self).scope;
      visit.walkTupleLiteral(self, l);
      var __PUCK__value__120 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.expressions, $isTraitObject: true }, function (e) {
        return _ast.Expression.getType.call(e);
      });
      return l.type_ = (0, _entities.Type)({
        id: _core.None,
        displayName: _core.None,
        name: _core.None,
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: _entities.StructKind.Tuple({ properties: _core.Iterable[__PUCK__value__120.type].toList.call(__PUCK__value__120) })
        }),
        _class: _core.None,
        instance: _core.None,
        providesType: _core.None,
        enumMember: _core.None,
        complete: true
      });
    },
    visitPattern: function visitPattern(p) {
      var self = this;
      p.scope = $unwrapTraitObject(self).scope;
      visit.walkPattern(self, p);
      var __PUCK__value__121 = p;
      var __PUCK__value__122 = __PUCK__value__121;
      var __PUCK__value__123 = void 0;
      if ($unwrapTraitObject(__PUCK__value__122).kind == "CatchAll") {
        var _undefined3 = $unwrapTraitObject(__PUCK__value__122);
        __PUCK__value__123 = _entities.Type.unused();
      } else {
        var __PUCK__value__124 = __PUCK__value__121;
        var __PUCK__value__125 = void 0;
        if ($unwrapTraitObject(__PUCK__value__124).kind == "Identifier") {
          var _$unwrapTraitObject115 = $unwrapTraitObject(__PUCK__value__124),
              _$unwrapTraitObject116 = _slicedToArray(_$unwrapTraitObject115.value, 1),
              identifier = _$unwrapTraitObject116[0];

          __PUCK__value__125 = _js._undefined;
        } else {
          var __PUCK__value__126 = __PUCK__value__121;
          var __PUCK__value__127 = void 0;
          if ($unwrapTraitObject(__PUCK__value__126).kind == "Record") {
            var _$unwrapTraitObject117 = $unwrapTraitObject(__PUCK__value__126),
                _$unwrapTraitObject118 = _slicedToArray(_$unwrapTraitObject117.value, 1),
                record = _$unwrapTraitObject118[0];

            __PUCK__value__127 = record.type_;
          } else {
            var __PUCK__value__128 = __PUCK__value__121;
            var __PUCK__value__129 = void 0;
            if ($unwrapTraitObject(__PUCK__value__128).kind == "RecordType") {
              var _$unwrapTraitObject119 = $unwrapTraitObject(__PUCK__value__128),
                  _$unwrapTraitObject120 = _slicedToArray(_$unwrapTraitObject119.value, 2),
                  typePath = _$unwrapTraitObject120[0],
                  _record = _$unwrapTraitObject120[1];

              var type_ = typePath.providesType;
              if (!(0, _types.isAssignable)(_record.type_, type_)) {
                reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p, $isTraitObject: true }, _entities.Type.displayName.call(type_) + " is not assignable to pattern " + _ast.RecordPattern.displayName.call(_record));
              };
              __PUCK__value__129 = _core.Option.mapOr.call(type_.enumMember, type_, function (_ref13) {
                var _ref14 = _slicedToArray(_ref13, 2),
                    __PUCK__value__130 = _ref14[0],
                    enum_ = _ref14[1];

                return enum_;
              });
            } else {
              var __PUCK__value__131 = __PUCK__value__121;
              var __PUCK__value__132 = void 0;
              if ($unwrapTraitObject(__PUCK__value__131).kind == "Tuple") {
                var _$unwrapTraitObject121 = $unwrapTraitObject(__PUCK__value__131),
                    _$unwrapTraitObject122 = _slicedToArray(_$unwrapTraitObject121.value, 1),
                    tuple = _$unwrapTraitObject122[0];

                __PUCK__value__132 = tuple.type_;
              } else {
                var __PUCK__value__133 = __PUCK__value__121;
                var __PUCK__value__134 = void 0;
                if ($unwrapTraitObject(__PUCK__value__133).kind == "TupleType") {
                  var _$unwrapTraitObject123 = $unwrapTraitObject(__PUCK__value__133),
                      _$unwrapTraitObject124 = _slicedToArray(_$unwrapTraitObject123.value, 2),
                      _typePath = _$unwrapTraitObject124[0],
                      _tuple = _$unwrapTraitObject124[1];

                  var _type_ = _typePath.providesType;
                  if (!(0, _types.isAssignable)(_tuple.type_, _type_)) {
                    reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p, $isTraitObject: true }, _entities.Type.displayName.call(_type_) + " is not assignable to pattern " + _ast.TuplePattern.displayName.call(_tuple));
                  };
                  __PUCK__value__134 = _core.Option.mapOr.call(_type_.enumMember, _type_, function (_ref15) {
                    var _ref16 = _slicedToArray(_ref15, 2),
                        __PUCK__value__135 = _ref16[0],
                        enum_ = _ref16[1];

                    return enum_;
                  });
                } else {
                  var __PUCK__value__136 = __PUCK__value__121;
                  var __PUCK__value__137 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__136).kind == "UnitType") {
                    var _$unwrapTraitObject125 = $unwrapTraitObject(__PUCK__value__136),
                        _$unwrapTraitObject126 = _slicedToArray(_$unwrapTraitObject125.value, 1),
                        _typePath2 = _$unwrapTraitObject126[0];

                    __PUCK__value__137 = _js._undefined;
                  };
                  __PUCK__value__134 = __PUCK__value__137;
                };
                __PUCK__value__132 = __PUCK__value__134;
              };
              __PUCK__value__129 = __PUCK__value__132;
            };
            __PUCK__value__127 = __PUCK__value__129;
          };
          __PUCK__value__125 = __PUCK__value__127;
        };
        __PUCK__value__123 = __PUCK__value__125;
      };
      return p.type_ = __PUCK__value__123;
    },
    visitRecordPattern: function visitRecordPattern(p) {
      var self = this;
      p.scope = $unwrapTraitObject(self).scope;
      visit.walkRecordPattern(self, p);
      return p.type_ = (0, _entities.Type)({
        id: _core.None,
        displayName: _core.None,
        name: _core.None,
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: _entities.StructKind.Record({ properties: _core.ObjectMap.fromIter(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: p.properties, $isTraitObject: true }, function (p) {
              return [p.property.name, p.pattern.type_];
            })) })
        }),
        instance: _core.None,
        _class: _core.None,
        providesType: _core.None,
        enumMember: _core.None,
        complete: true
      });
    },
    visitTuplePattern: function visitTuplePattern(p) {
      var self = this;
      p.scope = $unwrapTraitObject(self).scope;
      visit.walkTuplePattern(self, p);
      var __PUCK__value__138 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: p.properties, $isTraitObject: true }, function (p) {
        return p.type_;
      });
      return p.type_ = (0, _entities.Type)({
        id: _core.None,
        displayName: _core.None,
        name: _core.None,
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: _entities.StructKind.Tuple({ properties: _core.Iterable[__PUCK__value__138.type].toList.call(__PUCK__value__138) })
        }),
        instance: _core.None,
        _class: _core.None,
        providesType: _core.None,
        enumMember: _core.None,
        complete: true
      });
    }
  });
}
