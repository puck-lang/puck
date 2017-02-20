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
    var __PUCK__value__21 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: c.argumentList, $isTraitObject: true });
    _core.Iterable[__PUCK__value__21.type].forEach.call(__PUCK__value__21, function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          argument = _ref2[0],
          i = _ref2[1];

      var parameter = _core.Option.unwrap.call(_core.List.get.call(_function.parameters, i));
      var parameterName = parameter.name;
      var pType = parameter.type_;
      if (!(0, _types.isAssignable)(parameter.type_, _ast.Expression.getType.call(argument))) {
        reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: argument, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(parameter.type_, _ast.Expression.getType.call(argument)) + " in parameter " + parameterName + " of function " + name + "");
      };
      if (parameter.mutable) {
        var __PUCK__value__22 = getBinding(argument);
        if ($unwrapTraitObject(__PUCK__value__22).kind == "Some") {
          var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__22),
              _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
              argumentBinding = _$unwrapTraitObject8$[0];

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
        var __PUCK__value__23 = s;
        var __PUCK__value__24 = __PUCK__value__23;
        if ($unwrapTraitObject(__PUCK__value__24).kind == "ExportDirective" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__24).value)[$unwrapTraitObject(0)]).statement).kind == "FunctionDeclaration") {
          var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__24),
              _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
              _$unwrapTraitObject9$2 = _slicedToArray(_$unwrapTraitObject9$[0].statement.value, 1),
              f = _$unwrapTraitObject9$2[0];

          return $unwrapTraitObject(self).visitFunctionDeclaration(f, true);
        } else {
          var __PUCK__value__25 = __PUCK__value__23;
          if ($unwrapTraitObject(__PUCK__value__25).kind == "BlockLevelStatement" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__25).value)[$unwrapTraitObject(0)]).kind == "Expression" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__25).value)[$unwrapTraitObject(0)]).value)[$unwrapTraitObject(0)]).kind == "FunctionDeclaration") {
            var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__25),
                _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
                _$unwrapTraitObject12 = _slicedToArray(_$unwrapTraitObject11[0].value, 1),
                _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12[0].value, 1),
                _f = _$unwrapTraitObject13[0];

            return $unwrapTraitObject(self).visitFunctionDeclaration(_f, true);
          } else {
            var __PUCK__value__26 = __PUCK__value__23;
            if (true) {
              var __PUCK__value__27 = __PUCK__value__26;;
              var __PUCK__value__28 = __PUCK__value__27;;
              return __PUCK__value__27;
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
      return visit.walkingVisitor.visitExpression.call(self, e);
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
        var __PUCK__value__29 = s;
        var __PUCK__value__30 = __PUCK__value__29;
        if ($unwrapTraitObject(__PUCK__value__30).kind == "Expression" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__30).value)[$unwrapTraitObject(0)]).kind == "FunctionDeclaration") {
          var _$unwrapTraitObject14 = $unwrapTraitObject(__PUCK__value__30),
              _$unwrapTraitObject15 = _slicedToArray(_$unwrapTraitObject14.value, 1),
              _$unwrapTraitObject16 = _slicedToArray(_$unwrapTraitObject15[0].value, 1),
              f = _$unwrapTraitObject16[0];

          return $unwrapTraitObject(self).visitFunctionDeclaration(f, true);
        } else {
          var __PUCK__value__31 = __PUCK__value__29;
          if (true) {
            var __PUCK__value__32 = __PUCK__value__31;;
            var __PUCK__value__33 = __PUCK__value__32;;
            return __PUCK__value__32;
          };
        };
      });
      var lastIndex = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true }) - 1;
      var __PUCK__value__34 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true });
      _core.Iterable[__PUCK__value__34.type].forEach.call(__PUCK__value__34, function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            s = _ref4[0],
            index = _ref4[1];

        $unwrapTraitObject(self).isUsed = isUsed && index == lastIndex;
        return $unwrapTraitObject(self).visitBlockLevelStatement(s);
      });
      var __PUCK__value__35 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].last.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true });
      var __PUCK__value__36 = void 0;
      if ($unwrapTraitObject(__PUCK__value__35).kind == "Some") {
        var _$unwrapTraitObject17 = $unwrapTraitObject(__PUCK__value__35),
            _$unwrapTraitObject18 = _slicedToArray(_$unwrapTraitObject17.value, 1),
            last = _$unwrapTraitObject18[0];

        __PUCK__value__36 = _ast.BlockLevelStatement.getType.call(last);
      } else {
        __PUCK__value__36 = _entities.Type.empty();
      };
      return b.type_ = __PUCK__value__36;
    },
    visitBreak: function visitBreak(b) {
      var self = this;
      return b.scope = $unwrapTraitObject(self).scope;
    },
    visitReturn: function visitReturn(r) {
      var self = this;
      visit.walkReturn(self, r);
      var __PUCK__value__37 = $unwrapTraitObject($unwrapTraitObject(self).functionContext).returnType;
      if ($unwrapTraitObject(__PUCK__value__37).kind == "Some") {
        var _$unwrapTraitObject19 = $unwrapTraitObject(__PUCK__value__37),
            _$unwrapTraitObject20 = _slicedToArray(_$unwrapTraitObject19.value, 1),
            returnType = _$unwrapTraitObject20[0];

        if (!(0, _types.isAssignable)($unwrapTraitObject(returnType), _ast.Expression.getType.call(r.expression))) {
          return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: r.expression, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)($unwrapTraitObject(returnType), _ast.Expression.getType.call(r.expression)));
        };
      } else {
        if (_ast.Expression.getType.call(r.expression)) {
          return $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(self).functionContext).returnTypes).push(_ast.Expression.getType.call(r.expression));
        };
      };
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
      var __PUCK__value__38 = _scope.Scope.getBinding.call(scope, i.name);
      if ($unwrapTraitObject(__PUCK__value__38).kind == "Some") {
        var _$unwrapTraitObject21 = $unwrapTraitObject(__PUCK__value__38),
            _$unwrapTraitObject22 = _slicedToArray(_$unwrapTraitObject21.value, 1),
            binding = _$unwrapTraitObject22[0];

        var b = binding;
        i.binding = binding;
        var __PUCK__value__39 = void 0;
        if (binding.type_ && _core.Option.isSome.call(binding.type_.providesType)) {
          __PUCK__value__39 = (0, _type_function.enumMemberToFunction)(b.type_);
        } else {
          __PUCK__value__39 = binding.type_;
        };
        i.type_ = __PUCK__value__39;
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
        var __PUCK__value__40 = f.body;
        if ($unwrapTraitObject(__PUCK__value__40).kind == "Some") {
          var _$unwrapTraitObject23 = $unwrapTraitObject(__PUCK__value__40),
              _$unwrapTraitObject24 = _slicedToArray(_$unwrapTraitObject23.value, 1),
              body = _$unwrapTraitObject24[0];

          var parentAssignedTo = $unwrapTraitObject(self).assignedTo;
          var parentContext = $unwrapTraitObject(self).functionContext;
          var isUsed = true;
          $unwrapTraitObject(self).functionContext = {
            returnType: _core.None,
            returnTypes: []
          };
          var __PUCK__value__41 = f.type_.kind;
          if ($unwrapTraitObject(__PUCK__value__41).kind == "Function") {
            var _$unwrapTraitObject25 = $unwrapTraitObject(__PUCK__value__41),
                _$unwrapTraitObject26 = _slicedToArray(_$unwrapTraitObject25.value, 1),
                func = _$unwrapTraitObject26[0];

            $unwrapTraitObject(self).assignedTo = func.returnType;
            if (func.returnType) {
              $unwrapTraitObject($unwrapTraitObject(self).functionContext).returnType = (0, _core.Some)(func.returnType);
              if (_entities.Type.isEmpty.call(func.returnType)) {
                isUsed = false;
              };
            };
          };
          $unwrapTraitObject(self).visitBlock(body, isUsed);
          var __PUCK__value__42 = $unwrapTraitObject(self).functionContext;
          if ($unwrapTraitObject(__PUCK__value__42).kind == "None") {
            var _undefined2 = $unwrapTraitObject(__PUCK__value__42);
          };
          var __PUCK__value__43 = f.type_.kind;
          if ($unwrapTraitObject(__PUCK__value__43).kind == "Function") {
            var _$unwrapTraitObject27 = $unwrapTraitObject(__PUCK__value__43),
                _$unwrapTraitObject28 = _slicedToArray(_$unwrapTraitObject27.value, 1),
                _func = _$unwrapTraitObject28[0];

            if (_func.returnType) {
              if (!(0, _types.isAssignable)(_func.returnType, body.type_) && !_entities.Type.isEmpty.call(_func.returnType)) {
                reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: f, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(_func.returnType, body.type_));
              };
            } else {
              var types = $unwrapTraitObject($unwrapTraitObject(self).functionContext).returnTypes;
              if (body.type_) {
                types.push(body.type_);
              };
              if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isNotEmpty.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: types, $isTraitObject: true })) {
                var __PUCK__value__44 = (0, _types.findCommonType)(types);
                var __PUCK__value__45 = __PUCK__value__44;
                if ($unwrapTraitObject(__PUCK__value__45).kind == "Ok") {
                  var _$unwrapTraitObject29 = $unwrapTraitObject(__PUCK__value__45),
                      _$unwrapTraitObject30 = _slicedToArray(_$unwrapTraitObject29.value, 1),
                      type_ = _$unwrapTraitObject30[0];

                  $unwrapTraitObject(_js._Object).assign(_func, { returnType: body.type_ });
                } else {
                  var __PUCK__value__46 = __PUCK__value__44;
                  if ($unwrapTraitObject(__PUCK__value__46).kind == "Err") {
                    var _$unwrapTraitObject31 = $unwrapTraitObject(__PUCK__value__46),
                        _$unwrapTraitObject32 = _slicedToArray(_$unwrapTraitObject31.value, 1),
                        __PUCK__value__47 = _$unwrapTraitObject32[0];

                    reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: f, $isTraitObject: true }, "No best common type exists among return expressions. Found " + _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: types, $isTraitObject: true }, function (type_) {
                      return _entities.Type.displayName.call(type_);
                    }).value.join(", "));
                  };
                };
              };
            };
          };
          $unwrapTraitObject(self).assignedTo = parentAssignedTo;
          $unwrapTraitObject(self).functionContext = parentContext;
        };
        return $unwrapTraitObject(self).scope = selfScope;
      };
    },
    visitVariableDeclaration: function visitVariableDeclaration(d, visitInitializer, type_) {
      var allowNotExhaustive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      var self = this;
      var __PUCK__value__48 = void 0;
      if (visitInitializer) {
        __PUCK__value__48 = visitInitializer;
      } else {
        __PUCK__value__48 = function __PUCK__value__48(e) {
          var parentAssignedTo = $unwrapTraitObject(self).assignedTo;
          $unwrapTraitObject(self).assignedTo = d.type_;
          $unwrapTraitObject(self).isUsed = true;
          $unwrapTraitObject(self).visitExpression(e);
          return $unwrapTraitObject(self).assignedTo = parentAssignedTo;
        };
      };
      return structureVisitorInstance.visitVariableDeclaration.call(self, d, __PUCK__value__48, type_, allowNotExhaustive);
    },
    visitAssignmentExpression: function visitAssignmentExpression(e) {
      var self = this;
      e.scope = $unwrapTraitObject(self).scope;
      visit.walkAssignmentExpression(self, e);
      var __PUCK__value__49 = getBinding(e.lhs);
      if ($unwrapTraitObject(__PUCK__value__49).kind == "Some") {
        var _$unwrapTraitObject33 = $unwrapTraitObject(__PUCK__value__49),
            _$unwrapTraitObject34 = _slicedToArray(_$unwrapTraitObject33.value, 1),
            binding = _$unwrapTraitObject34[0];

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
      var __PUCK__value__50 = e.func;
      if ($unwrapTraitObject(__PUCK__value__50).kind == "MemberAccess") {
        var _$unwrapTraitObject35 = $unwrapTraitObject(__PUCK__value__50),
            _$unwrapTraitObject36 = _slicedToArray(_$unwrapTraitObject35.value, 1),
            access = _$unwrapTraitObject36[0];

        if (_ast.Expression.getType.call(access.object)) {
          (function () {
            var name = access.member.name;
            var objectType = _ast.Expression.getType.call(access.object);
            var __PUCK__value__51 = objectType.providesType;
            if ($unwrapTraitObject(__PUCK__value__51).kind == "Some") {
              var _$unwrapTraitObject37 = $unwrapTraitObject(__PUCK__value__51),
                  _$unwrapTraitObject38 = _slicedToArray(_$unwrapTraitObject37.value, 1),
                  providesType = _$unwrapTraitObject38[0];

              var __PUCK__value__52 = providesType.kind;
              var __PUCK__value__53 = __PUCK__value__52;
              if ($unwrapTraitObject(__PUCK__value__53).kind == "Enum") {
                var _$unwrapTraitObject39 = $unwrapTraitObject(__PUCK__value__53),
                    _$unwrapTraitObject40 = _slicedToArray(_$unwrapTraitObject39.value, 1),
                    enum_ = _$unwrapTraitObject40[0];

                functionType = $unwrapTraitObject(_core.Option.unwrapOr.call(_core.Option.map.call(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: enum_.implementations, $isTraitObject: true }, function (_ref5) {
                  var trait_ = _ref5.trait_;

                  return _entities.Type.getTrait.call(trait_).isShorthand;
                }), function (_ref6) {
                  var trait_ = _ref6.trait_;

                  return _entities.Type.getTrait.call(trait_).functions[name];
                }), _js._undefined));
              } else {
                var __PUCK__value__54 = __PUCK__value__52;
                if ($unwrapTraitObject(__PUCK__value__54).kind == "Struct") {
                  var _$unwrapTraitObject41 = $unwrapTraitObject(__PUCK__value__54),
                      _$unwrapTraitObject42 = _slicedToArray(_$unwrapTraitObject41.value, 1),
                      struct = _$unwrapTraitObject42[0];

                  functionType = $unwrapTraitObject(_core.Option.unwrapOr.call(_core.Option.map.call(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: struct.implementations, $isTraitObject: true }, function (_ref7) {
                    var trait_ = _ref7.trait_;

                    return _entities.Type.getTrait.call(trait_).isShorthand;
                  }), function (_ref8) {
                    var trait_ = _ref8.trait_;

                    return _entities.Type.getTrait.call(trait_).functions[name];
                  }), _js._undefined));
                } else {
                  var __PUCK__value__55 = __PUCK__value__52;
                  if ($unwrapTraitObject(__PUCK__value__55).kind == "Trait") {
                    var _$unwrapTraitObject43 = $unwrapTraitObject(__PUCK__value__55),
                        _$unwrapTraitObject44 = _slicedToArray(_$unwrapTraitObject43.value, 1),
                        trait_ = _$unwrapTraitObject44[0];

                    functionType = trait_.functions[name];
                  } else {
                    var __PUCK__value__56 = __PUCK__value__52;
                    if (true) {
                      var __PUCK__value__57 = __PUCK__value__56;
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
              var __PUCK__value__58 = objectType.kind;
              if ($unwrapTraitObject(__PUCK__value__58).kind == "Trait") {
                var _$unwrapTraitObject45 = $unwrapTraitObject(__PUCK__value__58),
                    _$unwrapTraitObject46 = _slicedToArray(_$unwrapTraitObject45.value, 1),
                    _trait_ = _$unwrapTraitObject46[0];

                functionType = _trait_.functions[name];
                if (functionType) {
                  var _function2 = _entities.Type.getFunction.call(functionType);
                  if (_core.Option.isSome.call(_function2.selfBinding)) {
                    var __PUCK__value__59 = _scope.Scope.getBindingByTypeId.call(scope, _core.Option.unwrap.call(objectType.id));
                    if ($unwrapTraitObject(__PUCK__value__59).kind == "Some") {
                      var _$unwrapTraitObject47 = $unwrapTraitObject(__PUCK__value__59),
                          _$unwrapTraitObject48 = _slicedToArray(_$unwrapTraitObject47.value, 1),
                          binding = _$unwrapTraitObject48[0];

                      e.traitName = binding.name;
                      e.isTraitObject = true;
                    } else {
                      var typeName = _core.Option.unwrap.call(objectType.name);
                      reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true }, "The function " + name + " is defined in trait " + typeName + " but it is not in scope");
                    };
                  };
                };
              } else {
                var __PUCK__value__60 = (0, _impls.getImplementation)(name, objectType, e, reportError);
                if ($unwrapTraitObject(__PUCK__value__60).kind == "Some") {
                  var _$unwrapTraitObject49 = $unwrapTraitObject(__PUCK__value__60),
                      _$unwrapTraitObject50 = _slicedToArray(_$unwrapTraitObject49.value, 1),
                      implementation = _$unwrapTraitObject50[0];

                  var __PUCK__value__61 = implementation.trait_.instance;
                  var __PUCK__value__62 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__61).kind == "Some") {
                    var _$unwrapTraitObject51 = $unwrapTraitObject(__PUCK__value__61),
                        _$unwrapTraitObject52 = _slicedToArray(_$unwrapTraitObject51.value, 1),
                        instance = _$unwrapTraitObject52[0];

                    __PUCK__value__62 = instance._class;
                  } else {
                    __PUCK__value__62 = implementation.trait_;
                  };
                  var _trait_2 = __PUCK__value__62;
                  var __PUCK__value__63 = _scope.Scope.getBindingByTypeId.call(scope, _core.Option.unwrap.call(_trait_2.id));
                  if ($unwrapTraitObject(__PUCK__value__63).kind == "Some") {
                    var _$unwrapTraitObject53 = $unwrapTraitObject(__PUCK__value__63),
                        _$unwrapTraitObject54 = _slicedToArray(_$unwrapTraitObject53.value, 1),
                        _binding = _$unwrapTraitObject54[0];

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
              if (e.traitName) {
                var __PUCK__value__64 = objectType.instance;
                if ($unwrapTraitObject(__PUCK__value__64).kind == "Some") {
                  var _$unwrapTraitObject55 = $unwrapTraitObject(__PUCK__value__64),
                      _$unwrapTraitObject56 = _slicedToArray(_$unwrapTraitObject55.value, 1),
                      _instance = _$unwrapTraitObject56[0];

                  functionType = (0, _types.resolveTypeParameters)(_instance.parameterMap)(functionType);
                };
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
          var __PUCK__value__66 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true });
          var __PUCK__value__65 = _core.Iterable[__PUCK__value__66.type].take.call(__PUCK__value__66, _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: functionKind.parameters, $isTraitObject: true }));
          _core.Iterable[__PUCK__value__65.type].forEach.call(__PUCK__value__65, function (_ref9) {
            var _ref10 = _slicedToArray(_ref9, 2),
                a = _ref10[0],
                i = _ref10[1];

            var parameter = functionKind.parameters[i];
            $unwrapTraitObject(self).assignedTo = $unwrapTraitObject(parameter).type_;
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
        var _parentAssignedTo = $unwrapTraitObject(self).assignedTo;
        $unwrapTraitObject(self).assignedTo = _js._undefined;
        _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true }, function (a) {
          return $unwrapTraitObject(self).visitExpression(a);
        });
        $unwrapTraitObject(self).assignedTo = _parentAssignedTo;
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
      e.scope = $unwrapTraitObject(self).scope;
      var isUsed = $unwrapTraitObject(self).isUsed;
      $unwrapTraitObject(self).visitExpression(e.condition);
      $unwrapTraitObject(self).scope = _scope.Scope.createChild.call(parentScope);
      $unwrapTraitObject(self).visitBlock(e.then_, isUsed && _core.Option.isSome.call(e.else_));
      var __PUCK__value__67 = e.else_;
      if ($unwrapTraitObject(__PUCK__value__67).kind == "Some") {
        var _$unwrapTraitObject57 = $unwrapTraitObject(__PUCK__value__67),
            _$unwrapTraitObject58 = _slicedToArray(_$unwrapTraitObject57.value, 1),
            else_ = _$unwrapTraitObject58[0];

        $unwrapTraitObject(self).scope = _scope.Scope.createChild.call(parentScope);
        $unwrapTraitObject(self).visitBlock(else_, isUsed);
      };
      if (isUsed) {
        var __PUCK__value__68 = e.else_;
        var __PUCK__value__69 = void 0;
        if ($unwrapTraitObject(__PUCK__value__68).kind == "Some") {
          var _$unwrapTraitObject59 = $unwrapTraitObject(__PUCK__value__68),
              _$unwrapTraitObject60 = _slicedToArray(_$unwrapTraitObject59.value, 1),
              _else_ = _$unwrapTraitObject60[0];

          var __PUCK__value__70 = (0, _types.findCommonType)([e.then_.type_, _else_.type_]);
          var __PUCK__value__71 = __PUCK__value__70;
          var __PUCK__value__72 = void 0;
          if ($unwrapTraitObject(__PUCK__value__71).kind == "Ok") {
            var _$unwrapTraitObject61 = $unwrapTraitObject(__PUCK__value__71),
                _$unwrapTraitObject62 = _slicedToArray(_$unwrapTraitObject61.value, 1),
                type_ = _$unwrapTraitObject62[0];

            __PUCK__value__72 = type_;
          } else {
            var __PUCK__value__73 = __PUCK__value__70;
            var __PUCK__value__74 = void 0;
            if ($unwrapTraitObject(__PUCK__value__73).kind == "Err") {
              var _$unwrapTraitObject63 = $unwrapTraitObject(__PUCK__value__73),
                  _$unwrapTraitObject64 = _slicedToArray(_$unwrapTraitObject63.value, 1),
                  __PUCK__value__75 = _$unwrapTraitObject64[0];

              reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression', value: e, $isTraitObject: true }, "Type " + _entities.Type.displayName.call(e.then_.type_) + " and " + _entities.Type.displayName.call(asType(_else_.type_)) + " is not compatible");
              __PUCK__value__74 = _entities.Type.empty();
            };
            __PUCK__value__72 = __PUCK__value__74;
          };
          __PUCK__value__69 = __PUCK__value__72;
        } else {
          __PUCK__value__69 = _entities.Type.empty();
        };
        e.type_ = __PUCK__value__69;
      };
      return $unwrapTraitObject(self).scope = parentScope;
    },
    visitIfLetExpression: function visitIfLetExpression(e) {
      var self = this;
      var parentScope = $unwrapTraitObject(self).scope;
      e.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(self).scope = _scope.Scope.createChild.call(parentScope);
      var isUsed = $unwrapTraitObject(self).isUsed;
      $unwrapTraitObject(self).visitPattern(e.pattern);
      $unwrapTraitObject(self).visitExpression(e.expression);
      var __PUCK__value__76 = (0, _patterns.declarePatternVariables)($unwrapTraitObject(self).scope, self, e.pattern, false, _ast.Expression.getType.call(e.expression), true);
      var __PUCK__value__77 = __PUCK__value__76;
      if ($unwrapTraitObject(__PUCK__value__77).kind == "Ok") {
        var _$unwrapTraitObject65 = $unwrapTraitObject(__PUCK__value__77),
            _$unwrapTraitObject66 = _slicedToArray(_$unwrapTraitObject65.value, 1),
            __PUCK__value__78 = _$unwrapTraitObject66[0];
      } else {
        var __PUCK__value__79 = __PUCK__value__76;
        if ($unwrapTraitObject(__PUCK__value__79).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__79).value)[$unwrapTraitObject(0)]).kind == "PatternMismatch") {
          var _$unwrapTraitObject67 = $unwrapTraitObject(__PUCK__value__79),
              _$unwrapTraitObject68 = _slicedToArray(_$unwrapTraitObject67.value, 1),
              _$unwrapTraitObject69 = _slicedToArray(_$unwrapTraitObject68[0].value, 3),
              pattern = _$unwrapTraitObject69[0],
              to = _$unwrapTraitObject69[1],
              subject = _$unwrapTraitObject69[2];

          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(to, subject));
        } else {
          var __PUCK__value__80 = __PUCK__value__76;
          if ($unwrapTraitObject(__PUCK__value__80).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__80).value)[$unwrapTraitObject(0)]).kind == "ScopeError") {
            var _$unwrapTraitObject70 = $unwrapTraitObject(__PUCK__value__80),
                _$unwrapTraitObject71 = _slicedToArray(_$unwrapTraitObject70.value, 1),
                _$unwrapTraitObject72 = _slicedToArray(_$unwrapTraitObject71[0].value, 2),
                token = _$unwrapTraitObject72[0],
                err = _$unwrapTraitObject72[1];

            reportError(token, err);
          } else {
            var __PUCK__value__81 = __PUCK__value__76;
            if ($unwrapTraitObject(__PUCK__value__81).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__81).value)[$unwrapTraitObject(0)]).kind == "NotExhaustive") {
              var _$unwrapTraitObject73 = $unwrapTraitObject(__PUCK__value__81),
                  _$unwrapTraitObject74 = _toArray(_$unwrapTraitObject73.value);
            };
          };
        };
      };
      var expressionScope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(self).scope = _scope.Scope.createChild.call(expressionScope);
      $unwrapTraitObject(self).visitBlock(e.then_, isUsed);
      var __PUCK__value__82 = e.else_;
      if ($unwrapTraitObject(__PUCK__value__82).kind == "Some") {
        var _$unwrapTraitObject75 = $unwrapTraitObject(__PUCK__value__82),
            _$unwrapTraitObject76 = _slicedToArray(_$unwrapTraitObject75.value, 1),
            else_ = _$unwrapTraitObject76[0];

        $unwrapTraitObject(self).scope = _scope.Scope.createChild.call(expressionScope);
        $unwrapTraitObject(self).visitBlock(else_, isUsed);
      };
      if (isUsed) {
        var __PUCK__value__83 = e.else_;
        var __PUCK__value__84 = void 0;
        if ($unwrapTraitObject(__PUCK__value__83).kind == "Some") {
          var _$unwrapTraitObject77 = $unwrapTraitObject(__PUCK__value__83),
              _$unwrapTraitObject78 = _slicedToArray(_$unwrapTraitObject77.value, 1),
              _else_2 = _$unwrapTraitObject78[0];

          var __PUCK__value__85 = (0, _types.findCommonType)([e.then_.type_, _else_2.type_]);
          var __PUCK__value__86 = __PUCK__value__85;
          var __PUCK__value__87 = void 0;
          if ($unwrapTraitObject(__PUCK__value__86).kind == "Ok") {
            var _$unwrapTraitObject79 = $unwrapTraitObject(__PUCK__value__86),
                _$unwrapTraitObject80 = _slicedToArray(_$unwrapTraitObject79.value, 1),
                type_ = _$unwrapTraitObject80[0];

            __PUCK__value__87 = type_;
          } else {
            var __PUCK__value__88 = __PUCK__value__85;
            var __PUCK__value__89 = void 0;
            if ($unwrapTraitObject(__PUCK__value__88).kind == "Err") {
              var _$unwrapTraitObject81 = $unwrapTraitObject(__PUCK__value__88),
                  _$unwrapTraitObject82 = _slicedToArray(_$unwrapTraitObject81.value, 1),
                  __PUCK__value__90 = _$unwrapTraitObject82[0];

              reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression', value: e, $isTraitObject: true }, "Type " + _entities.Type.displayName.call(e.then_.type_) + " and " + _entities.Type.displayName.call(asType(_else_2.type_)) + " is not compatible");
              __PUCK__value__89 = _entities.Type.empty();
            };
            __PUCK__value__87 = __PUCK__value__89;
          };
          __PUCK__value__84 = __PUCK__value__87;
        } else {
          __PUCK__value__84 = _entities.Type.empty();
        };
        e.type_ = __PUCK__value__84;
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
      var __PUCK__value__91 = (0, _enums.checkExhaustive)(e);
      if ($unwrapTraitObject(__PUCK__value__91).kind == "Err") {
        var _$unwrapTraitObject83 = $unwrapTraitObject(__PUCK__value__91),
            _$unwrapTraitObject84 = _slicedToArray(_$unwrapTraitObject83.value, 1),
            error = _$unwrapTraitObject84[0];

        reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true }, error);
      };
      if (isUsed) {
        var __PUCK__value__92 = void 0;
        if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isNotEmpty.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true })) {
          var __PUCK__value__94 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true }, function (arm) {
            return arm.type_;
          });
          var __PUCK__value__93 = (0, _types.findCommonType)(_core.Iterable[__PUCK__value__94.type].toList.call(__PUCK__value__94));
          var __PUCK__value__95 = __PUCK__value__93;
          var __PUCK__value__96 = void 0;
          if ($unwrapTraitObject(__PUCK__value__95).kind == "Ok") {
            var _$unwrapTraitObject85 = $unwrapTraitObject(__PUCK__value__95),
                _$unwrapTraitObject86 = _slicedToArray(_$unwrapTraitObject85.value, 1),
                type_ = _$unwrapTraitObject86[0];

            __PUCK__value__96 = type_;
          } else {
            var __PUCK__value__97 = __PUCK__value__93;
            var __PUCK__value__98 = void 0;
            if ($unwrapTraitObject(__PUCK__value__97).kind == "Err") {
              var _$unwrapTraitObject87 = $unwrapTraitObject(__PUCK__value__97),
                  _$unwrapTraitObject88 = _slicedToArray(_$unwrapTraitObject87.value, 1),
                  __PUCK__value__99 = _$unwrapTraitObject88[0];

              reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true }, "Match arms return mixed types " + _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true }, function (arm) {
                return _entities.Type.displayName.call(asType(arm.type_));
              }).value.join(", "));
              __PUCK__value__98 = _entities.Type.empty();
            };
            __PUCK__value__96 = __PUCK__value__98;
          };
          __PUCK__value__92 = __PUCK__value__96;
        } else {
          __PUCK__value__92 = _entities.Type.empty();
        };
        e.type_ = __PUCK__value__92;
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
      var __PUCK__value__100 = (0, _patterns.declarePatternVariables)(a.scope, self, a.pattern, false, _ast.Expression.getType.call(m.expression), true);
      var __PUCK__value__101 = __PUCK__value__100;
      if ($unwrapTraitObject(__PUCK__value__101).kind == "Ok") {
        var _$unwrapTraitObject89 = $unwrapTraitObject(__PUCK__value__101),
            _$unwrapTraitObject90 = _slicedToArray(_$unwrapTraitObject89.value, 1),
            __PUCK__value__102 = _$unwrapTraitObject90[0];
      } else {
        var __PUCK__value__103 = __PUCK__value__100;
        if ($unwrapTraitObject(__PUCK__value__103).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__103).value)[$unwrapTraitObject(0)]).kind == "PatternMismatch") {
          var _$unwrapTraitObject91 = $unwrapTraitObject(__PUCK__value__103),
              _$unwrapTraitObject92 = _slicedToArray(_$unwrapTraitObject91.value, 1),
              _$unwrapTraitObject93 = _slicedToArray(_$unwrapTraitObject92[0].value, 3),
              pattern = _$unwrapTraitObject93[0],
              to = _$unwrapTraitObject93[1],
              subject = _$unwrapTraitObject93[2];

          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchArm', value: a, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(to, subject));
        } else {
          var __PUCK__value__104 = __PUCK__value__100;
          if ($unwrapTraitObject(__PUCK__value__104).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__104).value)[$unwrapTraitObject(0)]).kind == "ScopeError") {
            var _$unwrapTraitObject94 = $unwrapTraitObject(__PUCK__value__104),
                _$unwrapTraitObject95 = _slicedToArray(_$unwrapTraitObject94.value, 1),
                _$unwrapTraitObject96 = _slicedToArray(_$unwrapTraitObject95[0].value, 2),
                token = _$unwrapTraitObject96[0],
                err = _$unwrapTraitObject96[1];

            reportError(token, err);
          } else {
            var __PUCK__value__105 = __PUCK__value__100;
            if ($unwrapTraitObject(__PUCK__value__105).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__105).value)[$unwrapTraitObject(0)]).kind == "NotExhaustive") {
              var _$unwrapTraitObject97 = $unwrapTraitObject(__PUCK__value__105),
                  _$unwrapTraitObject98 = _toArray(_$unwrapTraitObject97.value);
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
      if (type_) {
        return e.type_ = (0, _type_function.enumMemberToFunction)(type_);
      };
    },
    visitUnaryExpression: function visitUnaryExpression(e) {
      var self = this;
      var scope = $unwrapTraitObject(self).scope;
      e.scope = $unwrapTraitObject(self).scope;
      visit.walkUnaryExpression(self, e);
      if (e.operator.kind == $unwrapTraitObject(_ast2.SyntaxKind).NotKeyword) {
        var __PUCK__value__106 = _scope.Scope.getBindingByTypeId.call(scope, "Bool");
        if ($unwrapTraitObject(__PUCK__value__106).kind == "Some") {
          var _$unwrapTraitObject99 = $unwrapTraitObject(__PUCK__value__106),
              _$unwrapTraitObject100 = _slicedToArray(_$unwrapTraitObject99.value, 1),
              binding = _$unwrapTraitObject100[0];

          e.type_ = _core.Option.unwrap.call(binding.type_.providesType);
        } else {
          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true }, "puck:core::Bool is not in scope. Please import Bool from puck:core to use boolean literals.");
        };
      } else {
        if (e.operator.kind == $unwrapTraitObject(_ast2.SyntaxKind).MinusToken || e.operator.kind == $unwrapTraitObject(_ast2.SyntaxKind).PlusToken) {
          var __PUCK__value__107 = _scope.Scope.getBindingByTypeId.call(scope, "Num");
          if ($unwrapTraitObject(__PUCK__value__107).kind == "Some") {
            var _$unwrapTraitObject101 = $unwrapTraitObject(__PUCK__value__107),
                _$unwrapTraitObject102 = _slicedToArray(_$unwrapTraitObject101.value, 1),
                _binding2 = _$unwrapTraitObject102[0];

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
        var __PUCK__value__108 = _ast.Expression.getType.call(a.object).kind;
        if ($unwrapTraitObject(__PUCK__value__108).kind == "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__108).value)[$unwrapTraitObject(0)]).kind).kind == "Record") {
          var _$unwrapTraitObject103 = $unwrapTraitObject(__PUCK__value__108),
              _$unwrapTraitObject104 = _slicedToArray(_$unwrapTraitObject103.value, 1),
              _$unwrapTraitObject105 = _slicedToArray(_$unwrapTraitObject104[0].kind.value, 1),
              record = _$unwrapTraitObject105[0];

          return a.type_ = record.properties[a.member.name];
        } else {};
      };
    },
    visitBooleanLiteral: function visitBooleanLiteral(l) {
      var self = this;
      var scope = $unwrapTraitObject(self).scope;
      l.scope = $unwrapTraitObject(self).scope;
      var __PUCK__value__109 = _scope.Scope.getBindingByTypeId.call(scope, "Bool");
      if ($unwrapTraitObject(__PUCK__value__109).kind == "Some") {
        var _$unwrapTraitObject106 = $unwrapTraitObject(__PUCK__value__109),
            _$unwrapTraitObject107 = _slicedToArray(_$unwrapTraitObject106.value, 1),
            binding = _$unwrapTraitObject107[0];

        l.type_ = _core.Option.unwrap.call(binding.type_.providesType);
      } else {
        reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BooleanLiteral', value: l, $isTraitObject: true }, "puck:core::Bool is not in scope. Please import Bool from puck:core to use boolean literals.");
      };
      return visit.walkBooleanLiteral(self, l);
    },
    visitListLiteral: function visitListLiteral(l) {
      var self = this;
      var scope = $unwrapTraitObject(self).scope;
      var __PUCK__value__110 = _scope.Scope.getBindingByTypeId.call(scope, "List");
      var __PUCK__value__111 = void 0;
      if ($unwrapTraitObject(__PUCK__value__110).kind == "Some") {
        var _$unwrapTraitObject108 = $unwrapTraitObject(__PUCK__value__110),
            _$unwrapTraitObject109 = _slicedToArray(_$unwrapTraitObject108.value, 1),
            binding = _$unwrapTraitObject109[0];

        __PUCK__value__111 = _core.Option.unwrap.call(binding.type_.providesType);
      } else {
        return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral', value: l, $isTraitObject: true }, "puck:core::List is not in scope. Please import List from puck:core to use list literals.");
      };
      var listType = __PUCK__value__111;
      l.scope = $unwrapTraitObject(self).scope;
      visit.walkListLiteral(self, l);
      if (l.members.length >= 1) {
        var __PUCK__value__112 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true }, function (m) {
          return _ast.Expression.getType.call(m);
        });
        var types = _core.Iterable[__PUCK__value__112.type].toList.call(__PUCK__value__112);
        var result = (0, _types.findCommonType)(types);
        var __PUCK__value__113 = result;
        var __PUCK__value__114 = __PUCK__value__113;
        if ($unwrapTraitObject(__PUCK__value__114).kind == "Ok") {
          var _$unwrapTraitObject110 = $unwrapTraitObject(__PUCK__value__114),
              _$unwrapTraitObject111 = _slicedToArray(_$unwrapTraitObject110.value, 1),
              type_ = _$unwrapTraitObject111[0];

          if (!type_) {
            l.type_ = listType;
          } else {
            l.type_ = (0, _types.createTypeInstance)(listType, asIterable([type_]));
          };
        } else {
          var __PUCK__value__115 = __PUCK__value__113;
          if ($unwrapTraitObject(__PUCK__value__115).kind == "Err") {
            var _$unwrapTraitObject112 = $unwrapTraitObject(__PUCK__value__115),
                _$unwrapTraitObject113 = _slicedToArray(_$unwrapTraitObject112.value, 1),
                __PUCK__value__116 = _$unwrapTraitObject113[0];

            reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral', value: l, $isTraitObject: true }, "List contains mixed types");
          };
        };
      } else {
        l.type_ = listType;
      };
      return [];
    },
    visitNumberLiteral: function visitNumberLiteral(l) {
      var self = this;
      var scope = $unwrapTraitObject(self).scope;
      l.scope = $unwrapTraitObject(self).scope;
      var __PUCK__value__117 = _scope.Scope.getBindingByTypeId.call(scope, "Num");
      if ($unwrapTraitObject(__PUCK__value__117).kind == "Some") {
        var _$unwrapTraitObject114 = $unwrapTraitObject(__PUCK__value__117),
            _$unwrapTraitObject115 = _slicedToArray(_$unwrapTraitObject114.value, 1),
            binding = _$unwrapTraitObject115[0];

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
      var __PUCK__value__118 = _scope.Scope.getBindingByTypeId.call(scope, "String");
      if ($unwrapTraitObject(__PUCK__value__118).kind == "Some") {
        var _$unwrapTraitObject116 = $unwrapTraitObject(__PUCK__value__118),
            _$unwrapTraitObject117 = _slicedToArray(_$unwrapTraitObject116.value, 1),
            binding = _$unwrapTraitObject117[0];

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
      var __PUCK__value__119 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.expressions, $isTraitObject: true }, function (e) {
        return _ast.Expression.getType.call(e);
      });
      return l.type_ = (0, _entities.Type)({
        id: _core.None,
        displayName: _core.None,
        name: _core.None,
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: _entities.StructKind.Tuple({ properties: _core.Iterable[__PUCK__value__119.type].toList.call(__PUCK__value__119) })
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
      var __PUCK__value__120 = p;
      var __PUCK__value__121 = __PUCK__value__120;
      var __PUCK__value__122 = void 0;
      if ($unwrapTraitObject(__PUCK__value__121).kind == "CatchAll") {
        var _undefined3 = $unwrapTraitObject(__PUCK__value__121);
        __PUCK__value__122 = _entities.Type.unused();
      } else {
        var __PUCK__value__123 = __PUCK__value__120;
        var __PUCK__value__124 = void 0;
        if ($unwrapTraitObject(__PUCK__value__123).kind == "Identifier") {
          var _$unwrapTraitObject118 = $unwrapTraitObject(__PUCK__value__123),
              _$unwrapTraitObject119 = _slicedToArray(_$unwrapTraitObject118.value, 1),
              identifier = _$unwrapTraitObject119[0];

          __PUCK__value__124 = _js._undefined;
        } else {
          var __PUCK__value__125 = __PUCK__value__120;
          var __PUCK__value__126 = void 0;
          if ($unwrapTraitObject(__PUCK__value__125).kind == "Record") {
            var _$unwrapTraitObject120 = $unwrapTraitObject(__PUCK__value__125),
                _$unwrapTraitObject121 = _slicedToArray(_$unwrapTraitObject120.value, 1),
                record = _$unwrapTraitObject121[0];

            __PUCK__value__126 = record.type_;
          } else {
            var __PUCK__value__127 = __PUCK__value__120;
            var __PUCK__value__128 = void 0;
            if ($unwrapTraitObject(__PUCK__value__127).kind == "RecordType") {
              var _$unwrapTraitObject122 = $unwrapTraitObject(__PUCK__value__127),
                  _$unwrapTraitObject123 = _slicedToArray(_$unwrapTraitObject122.value, 2),
                  typePath = _$unwrapTraitObject123[0],
                  _record = _$unwrapTraitObject123[1];

              var type_ = typePath.providesType;
              if (!(0, _types.isAssignable)(_record.type_, type_)) {
                reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p, $isTraitObject: true }, _entities.Type.displayName.call(type_) + " is not assignable to pattern " + _ast.RecordPattern.displayName.call(_record));
              };
              __PUCK__value__128 = _core.Option.mapOr.call(type_.enumMember, type_, function (_ref11) {
                var _ref12 = _slicedToArray(_ref11, 2),
                    __PUCK__value__129 = _ref12[0],
                    enum_ = _ref12[1];

                return enum_;
              });
            } else {
              var __PUCK__value__130 = __PUCK__value__120;
              var __PUCK__value__131 = void 0;
              if ($unwrapTraitObject(__PUCK__value__130).kind == "Tuple") {
                var _$unwrapTraitObject124 = $unwrapTraitObject(__PUCK__value__130),
                    _$unwrapTraitObject125 = _slicedToArray(_$unwrapTraitObject124.value, 1),
                    tuple = _$unwrapTraitObject125[0];

                __PUCK__value__131 = tuple.type_;
              } else {
                var __PUCK__value__132 = __PUCK__value__120;
                var __PUCK__value__133 = void 0;
                if ($unwrapTraitObject(__PUCK__value__132).kind == "TupleType") {
                  var _$unwrapTraitObject126 = $unwrapTraitObject(__PUCK__value__132),
                      _$unwrapTraitObject127 = _slicedToArray(_$unwrapTraitObject126.value, 2),
                      _typePath = _$unwrapTraitObject127[0],
                      _tuple = _$unwrapTraitObject127[1];

                  var _type_ = _typePath.providesType;
                  if (!(0, _types.isAssignable)(_tuple.type_, _type_)) {
                    reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p, $isTraitObject: true }, _entities.Type.displayName.call(_type_) + " is not assignable to pattern " + _ast.TuplePattern.displayName.call(_tuple));
                  };
                  __PUCK__value__133 = _core.Option.mapOr.call(_type_.enumMember, _type_, function (_ref13) {
                    var _ref14 = _slicedToArray(_ref13, 2),
                        __PUCK__value__134 = _ref14[0],
                        enum_ = _ref14[1];

                    return enum_;
                  });
                } else {
                  var __PUCK__value__135 = __PUCK__value__120;
                  var __PUCK__value__136 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__135).kind == "UnitType") {
                    var _$unwrapTraitObject128 = $unwrapTraitObject(__PUCK__value__135),
                        _$unwrapTraitObject129 = _slicedToArray(_$unwrapTraitObject128.value, 1),
                        _typePath2 = _$unwrapTraitObject129[0];

                    __PUCK__value__136 = _js._undefined;
                  };
                  __PUCK__value__133 = __PUCK__value__136;
                };
                __PUCK__value__131 = __PUCK__value__133;
              };
              __PUCK__value__128 = __PUCK__value__131;
            };
            __PUCK__value__126 = __PUCK__value__128;
          };
          __PUCK__value__124 = __PUCK__value__126;
        };
        __PUCK__value__122 = __PUCK__value__124;
      };
      return p.type_ = __PUCK__value__122;
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
      var __PUCK__value__137 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: p.properties, $isTraitObject: true }, function (p) {
        return p.type_;
      });
      return p.type_ = (0, _entities.Type)({
        id: _core.None,
        displayName: _core.None,
        name: _core.None,
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: _entities.StructKind.Tuple({ properties: _core.Iterable[__PUCK__value__137.type].toList.call(__PUCK__value__137) })
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
