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

var _span = require('./../ast/span');

var _token2 = require('./../ast/token');

var _visit = require('./../ast/visit');

var visit = _interopRequireWildcard(_visit);

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
  return $unwrapTraitObject(a);
};
function asIterable(a) {
  return { type: '$impl_lib/stdlib/core.puck:Iterable$List', value: a, $isTraitObject: true };
};
function getBinding(e) {
  var __PUCK__value__1 = e;
  if ($unwrapTraitObject(__PUCK__value__1).kind == "Identifier") {
    var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__1),
        _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
        i = _$unwrapTraitObject$v[0];

    var scope = $unwrapTraitObject(i.scope);
    return _scope.Scope.getBinding.call(scope, i.name);
  } else {
    if ($unwrapTraitObject(__PUCK__value__1).kind == "IndexAccess") {
      var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__1),
          _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
          _i = _$unwrapTraitObject2$[0];

      return getBinding(_i.object);
    } else {
      if ($unwrapTraitObject(__PUCK__value__1).kind == "MemberAccess") {
        var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__1),
            _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
            _i2 = _$unwrapTraitObject3$[0];

        return getBinding(_i2.object);
      } else {
        if (true) {
          var __PUCK__value__2 = __PUCK__value__1;
          return _core.None;
        };
      };
    };
  };
};
function getCoreType(scope, id, description) {
  var __PUCK__value__3 = _scope.Scope.getBindingByTypeId.call(scope, id);
  if (__PUCK__value__3.kind == "Some") {
    var _PUCK__value__3$valu = _slicedToArray(__PUCK__value__3.value, 1),
        binding = _PUCK__value__3$valu[0];

    return (0, _core.Ok)([_core.Option.unwrap.call(binding.type_.providesType), binding]);
  } else {
    return (0, _core.Err)("puck:core::" + id + " is not in scope. Please import " + id + " from puck:core to use " + description + ".");
  };
};
function ScopeVisitor(context, file) {
  var importDirective = void 0;
  var matchExpression = _core.None;
  var reportError = $unwrapTraitObject($unwrapTraitObject(context).reportError).bind(context, file);
  var accessError = _core.None;
  function checkFunctionCall(functionType, c) {
    if (!functionType) {
      return _js._undefined;
    };
    var __PUCK__value__4 = c.func;
    var __PUCK__value__5 = void 0;
    if ($unwrapTraitObject(__PUCK__value__4).kind == "Identifier") {
      var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__4),
          _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
          i = _$unwrapTraitObject4$[0];

      __PUCK__value__5 = (0, _core.Some)(i.name);
    } else {
      var __PUCK__value__6 = void 0;
      if (true) {
        var __PUCK__value__7 = __PUCK__value__4;
        __PUCK__value__6 = _core.None;
      };
      __PUCK__value__5 = __PUCK__value__6;
    };
    var namei = __PUCK__value__5;
    var name = _core.Option.unwrapOrElse.call(namei, function () {
      return _entities.Type.displayName.call(functionType);
    });
    var __PUCK__value__8 = functionType.kind;
    var __PUCK__value__9 = void 0;
    if ($unwrapTraitObject(__PUCK__value__8).kind == "Function") {
      var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__8),
          _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
          func = _$unwrapTraitObject5$[0];

      __PUCK__value__9 = func;
    } else {
      var __PUCK__value__10 = void 0;
      if (true) {
        var __PUCK__value__11 = __PUCK__value__8;
        reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: c, $isTraitObject: true }, "" + name + " is not callable");
        return _js._undefined;
      };
      __PUCK__value__9 = __PUCK__value__10;
    };
    var _function = __PUCK__value__9;
    var __PUCK__value__12 = _function.selfBinding;
    if (__PUCK__value__12.kind == "Some") {
      var _PUCK__value__12$val = _slicedToArray(__PUCK__value__12.value, 1),
          selfBinding = _PUCK__value__12$val[0];

      if (selfBinding.mutable) {
        if (!_core.Option.mapOr.call(getBinding(c.func), true, function (binding) {
          return binding.mutable;
        })) {
          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: c, $isTraitObject: true }, "" + name + " can only be called on a mutable binding");
        };
      };
    };
    var __PUCK__value__13 = (0, _range.checkRange)(c.argumentList, _function.parameterRange, "arguments", name);
    if (__PUCK__value__13.kind == "Err") {
      var _PUCK__value__13$val = _slicedToArray(__PUCK__value__13.value, 1),
          error = _PUCK__value__13$val[0];

      reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: c, $isTraitObject: true }, error);
      return _function;
    };
    var __PUCK__value__14 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: c.argumentList, $isTraitObject: true });
    _core.Iterable[__PUCK__value__14.type].forEach.call(__PUCK__value__14, function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          i = _ref2[0],
          argument = _ref2[1];

      var parameter = _core.Option.unwrap.call(_core.List.get.call(_function.parameters, i));
      var parameterName = parameter.name;
      if (!(0, _types.isAssignable)(parameter.type_, _ast.Expression.getType.call(argument))) {
        reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: argument, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(parameter.type_, _ast.Expression.getType.call(argument)) + " in parameter " + parameterName + " of function " + name + "");
      };
      if (parameter.mutable) {
        var __PUCK__value__15 = getBinding(argument);
        if (__PUCK__value__15.kind == "Some") {
          var _PUCK__value__15$val = _slicedToArray(__PUCK__value__15.value, 1),
              argumentBinding = _PUCK__value__15$val[0];

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
  return _js._Object.assign({}, visit.walkingVisitor, structureVisitorInstance, {
    reportError: reportError,
    visitModule: function visitModule(m) {
      var self = this;
      $unwrapTraitObject(self).scope = m.scope;
      _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: m.statements, $isTraitObject: true }, function (s) {
        var __PUCK__value__16 = s;
        if ($unwrapTraitObject(__PUCK__value__16).kind == "ExportDirective" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__16).value)[0]).statement).kind == "FunctionDeclaration") {
          var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__16),
              _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
              _$unwrapTraitObject6$2 = _slicedToArray(_$unwrapTraitObject6$[0].statement.value, 1),
              f = _$unwrapTraitObject6$2[0];

          return $unwrapTraitObject(self).visitFunctionDeclaration(f, true);
        } else {
          if ($unwrapTraitObject(__PUCK__value__16).kind == "BlockLevelStatement" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__16).value)[0]).kind == "Expression" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__16).value)[0]).value)[0]).kind == "FunctionDeclaration") {
            var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__16),
                _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
                _$unwrapTraitObject7$2 = _slicedToArray(_$unwrapTraitObject7$[0].value, 1),
                _$unwrapTraitObject7$3 = _slicedToArray(_$unwrapTraitObject7$2[0].value, 1),
                _f = _$unwrapTraitObject7$3[0];

            return $unwrapTraitObject(self).visitFunctionDeclaration(_f, true);
          } else {
            if (true) {
              var __PUCK__value__17 = __PUCK__value__16;;
              var __PUCK__value__18 = __PUCK__value__17;;
              return __PUCK__value__17;
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
        var __PUCK__value__19 = s;
        if ($unwrapTraitObject(__PUCK__value__19).kind == "Expression" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__19).value)[0]).kind == "FunctionDeclaration") {
          var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__19),
              _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
              _$unwrapTraitObject8$2 = _slicedToArray(_$unwrapTraitObject8$[0].value, 1),
              f = _$unwrapTraitObject8$2[0];

          return $unwrapTraitObject(self).visitFunctionDeclaration(f, true);
        } else {
          if (true) {
            var __PUCK__value__20 = __PUCK__value__19;;
            var __PUCK__value__21 = __PUCK__value__20;;
            return __PUCK__value__20;
          };
        };
      });
      var lastIndex = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true }) - 1;
      var __PUCK__value__22 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true });
      _core.Iterable[__PUCK__value__22.type].forEach.call(__PUCK__value__22, function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            index = _ref4[0],
            s = _ref4[1];

        $unwrapTraitObject(self).isUsed = isUsed && index == lastIndex;
        return $unwrapTraitObject(self).visitBlockLevelStatement(s);
      });
      var __PUCK__value__23 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].last.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true });
      var __PUCK__value__24 = void 0;
      if (__PUCK__value__23.kind == "Some") {
        var _PUCK__value__23$val = _slicedToArray(__PUCK__value__23.value, 1),
            last = _PUCK__value__23$val[0];

        __PUCK__value__24 = _ast.BlockLevelStatement.getType.call(last);
      } else {
        __PUCK__value__24 = _entities.Type.empty();
      };
      return b.type_ = __PUCK__value__24;
    },
    visitBreak: function visitBreak(b) {
      var self = this;
      return b.scope = $unwrapTraitObject(self).scope;
    },
    visitReturn: function visitReturn(r) {
      var self = this;
      visit.walkReturn(self, r);
      var __PUCK__value__25 = $unwrapTraitObject($unwrapTraitObject(self).functionContext).returnType;
      if (__PUCK__value__25.kind == "Some") {
        var _PUCK__value__25$val = _slicedToArray(__PUCK__value__25.value, 1),
            returnType = _PUCK__value__25$val[0];

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
      var __PUCK__value__26 = _scope.Scope.getBinding.call(scope, i.name);
      if (__PUCK__value__26.kind == "Some") {
        var _PUCK__value__26$val = _slicedToArray(__PUCK__value__26.value, 1),
            binding = _PUCK__value__26$val[0];

        var b = binding;
        i.binding = binding;
        var __PUCK__value__27 = void 0;
        if (binding.type_ && _core.Option.isSome.call(binding.type_.providesType)) {
          __PUCK__value__27 = (0, _type_function.enumMemberToFunction)(b.type_);
        } else {
          __PUCK__value__27 = binding.type_;
        };
        i.type_ = __PUCK__value__27;
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
        var __PUCK__value__28 = f.body;
        if (__PUCK__value__28.kind == "Some") {
          var _PUCK__value__28$val = _slicedToArray(__PUCK__value__28.value, 1),
              body = _PUCK__value__28$val[0];

          var parentAssignedTo = $unwrapTraitObject(self).assignedTo;
          var parentContext = $unwrapTraitObject(self).functionContext;
          var isUsed = true;
          $unwrapTraitObject(self).functionContext = {
            returnType: _core.None,
            returnTypes: []
          };
          var __PUCK__value__29 = f.type_.kind;
          if (__PUCK__value__29.kind == "Function") {
            var _PUCK__value__29$val = _slicedToArray(__PUCK__value__29.value, 1),
                func = _PUCK__value__29$val[0];

            $unwrapTraitObject(self).assignedTo = func.returnType;
            if (func.returnType) {
              $unwrapTraitObject($unwrapTraitObject(self).functionContext).returnType = (0, _core.Some)(func.returnType);
              if (_entities.Type.isEmpty.call(func.returnType)) {
                isUsed = false;
              };
            };
          };
          $unwrapTraitObject(self).visitBlock(body, isUsed);
          var __PUCK__value__30 = $unwrapTraitObject(self).functionContext;
          if (__PUCK__value__30.kind == "None") {
            var _undefined2 = __PUCK__value__30;
          };
          var __PUCK__value__31 = f.type_.kind;
          if (__PUCK__value__31.kind == "Function") {
            var _PUCK__value__31$val = _slicedToArray(__PUCK__value__31.value, 1),
                _func = _PUCK__value__31$val[0];

            if (_func.returnType) {
              if (!(0, _types.isAssignable)(_func.returnType, body.type_) && !_entities.Type.isEmpty.call(_func.returnType)) {
                reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: f, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(_func.returnType, body.type_));
              };
            } else {
              var types = $unwrapTraitObject($unwrapTraitObject(self).functionContext).returnTypes;
              if (body.type_) {
                _core.List.push.call(types, body.type_);
              };
              if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isNotEmpty.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: types, $isTraitObject: true })) {
                var __PUCK__value__32 = (0, _types.findCommonType)(types);
                if ($unwrapTraitObject(__PUCK__value__32).kind == "Ok") {
                  var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__32),
                      _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
                      type_ = _$unwrapTraitObject9$[0];

                  _js._Object.assign(_func, { returnType: body.type_ });
                } else {
                  if ($unwrapTraitObject(__PUCK__value__32).kind == "Err") {
                    var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__32),
                        _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
                        __PUCK__value__33 = _$unwrapTraitObject11[0];

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
      var __PUCK__value__34 = void 0;
      if (visitInitializer) {
        __PUCK__value__34 = visitInitializer;
      } else {
        __PUCK__value__34 = function __PUCK__value__34(e) {
          var parentAssignedTo = $unwrapTraitObject(self).assignedTo;
          $unwrapTraitObject(self).assignedTo = d.type_;
          $unwrapTraitObject(self).isUsed = true;
          $unwrapTraitObject(self).visitExpression(e);
          return $unwrapTraitObject(self).assignedTo = parentAssignedTo;
        };
      };
      return structureVisitorInstance.visitVariableDeclaration.call(self, d, __PUCK__value__34, type_, allowNotExhaustive);
    },
    visitAssignmentExpression: function visitAssignmentExpression(e) {
      var self = this;
      e.scope = $unwrapTraitObject(self).scope;
      var __PUCK__value__35 = e.lhs;
      if (__PUCK__value__35.kind == "IndexAccess") {
        var _PUCK__value__35$val = _slicedToArray(__PUCK__value__35.value, 1),
            a = _PUCK__value__35$val[0];

        visit.walkIndexAccess(self, a);
        visit.walkExpression(self, e.rhs);
      } else {
        visit.walkAssignmentExpression(self, e);
      };
      var __PUCK__value__36 = getBinding(e.lhs);
      if (__PUCK__value__36.kind == "Some") {
        var _PUCK__value__36$val = _slicedToArray(__PUCK__value__36.value, 1),
            binding = _PUCK__value__36$val[0];

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
      var scope = $unwrapTraitObject(self).scope;
      var functionType = void 0;
      var isUnknownCall = false;
      var skipFirstArgument = false;
      var __PUCK__value__37 = e.func;
      if (__PUCK__value__37.kind == "MemberAccess") {
        var _PUCK__value__37$val = _slicedToArray(__PUCK__value__37.value, 1),
            access = _PUCK__value__37$val[0];

        $unwrapTraitObject(self).visitMemberAccess(access, true);
        functionType = _ast.Expression.getType.call(e.func);
        if (_ast.Expression.getType.call(access.object)) {
          var _ret = function () {
            var name = access.member.name;
            var objectType = _ast.Expression.getType.call(access.object);
            var __PUCK__value__38 = objectType.providesType;
            if (__PUCK__value__38.kind == "Some") {
              var _PUCK__value__38$val = _slicedToArray(__PUCK__value__38.value, 1),
                  providesType = _PUCK__value__38$val[0];

              var __PUCK__value__39 = providesType.kind;
              if ($unwrapTraitObject(__PUCK__value__39).kind == "Enum") {
                var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__39),
                    _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12.value, 1),
                    enum_ = _$unwrapTraitObject13[0];

                functionType = _core.Option.unwrapOr.call(_core.Option.andThen.call(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: enum_.implementations, $isTraitObject: true }, function (_ref5) {
                  var trait_ = _ref5.trait_;

                  return _entities.Type.getTrait.call(trait_).isShorthand;
                }), function (_ref6) {
                  var trait_ = _ref6.trait_;

                  return _core.ObjectMap.get.call(_entities.Type.getTrait.call(trait_).functions, name);
                }), $unwrapTraitObject(_js._undefined));
              } else {
                if ($unwrapTraitObject(__PUCK__value__39).kind == "Struct") {
                  var _$unwrapTraitObject14 = $unwrapTraitObject(__PUCK__value__39),
                      _$unwrapTraitObject15 = _slicedToArray(_$unwrapTraitObject14.value, 1),
                      struct = _$unwrapTraitObject15[0];

                  functionType = _core.Option.unwrapOr.call(_core.Option.andThen.call(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: struct.implementations, $isTraitObject: true }, function (_ref7) {
                    var trait_ = _ref7.trait_;

                    return _entities.Type.getTrait.call(trait_).isShorthand;
                  }), function (_ref8) {
                    var trait_ = _ref8.trait_;

                    return _core.ObjectMap.get.call(_entities.Type.getTrait.call(trait_).functions, name);
                  }), $unwrapTraitObject(_js._undefined));
                } else {
                  if ($unwrapTraitObject(__PUCK__value__39).kind == "Trait") {
                    var _$unwrapTraitObject16 = $unwrapTraitObject(__PUCK__value__39),
                        _$unwrapTraitObject17 = _slicedToArray(_$unwrapTraitObject16.value, 1),
                        trait_ = _$unwrapTraitObject17[0];

                    functionType = _core.Option.unwrapOr.call(_core.ObjectMap.get.call(trait_.functions, name), $unwrapTraitObject(_js._undefined));
                  } else {
                    if (true) {
                      var __PUCK__value__40 = __PUCK__value__39;
                    };
                  };
                };
              };
              if (functionType) {
                var _function = _entities.Type.getFunction.call(functionType);
                var __PUCK__value__41 = _function.selfBinding;
                if (__PUCK__value__41.kind == "Some") {
                  var _PUCK__value__41$val = _slicedToArray(__PUCK__value__41.value, 1),
                      selfBinding = _PUCK__value__41$val[0];

                  functionType = {
                    id: functionType.id,
                    displayName: functionType.displayName,
                    name: functionType.name,
                    kind: _entities.TypeKind.Function({
                      selfBinding: _core.None,
                      parameters: $unwrapTraitObject([selfBinding].concat(_function.parameters)),
                      parameterRange: {
                        start: _function.parameterRange.start + 1,
                        end: _function.parameterRange.end + 1
                      },
                      returnType: _function.returnType,
                      isAbstract: _function.isAbstract
                    }),
                    _class: functionType._class,
                    instance: functionType.instance,
                    providesType: functionType.providesType,
                    enumMember: functionType.enumMember
                  };
                  var __PUCK__value__42 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true });
                  if (__PUCK__value__42.kind == "Some") {
                    var _PUCK__value__42$val = _slicedToArray(__PUCK__value__42.value, 1),
                        selfArgument = _PUCK__value__42$val[0];

                    skipFirstArgument = true;
                    $unwrapTraitObject(self).visitExpression(selfArgument);
                    if (!_ast.Expression.getType.call(selfArgument)) {
                      reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: selfArgument, $isTraitObject: true }, "selfArgument has no type");
                    };
                    var __PUCK__value__43 = (0, _impls.getImplementationForTrait)(_ast.Expression.getType.call(selfArgument), _core.Option.unwrapOr.call(objectType.providesType, objectType));
                    if ($unwrapTraitObject(__PUCK__value__43).kind == "Ok" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__43).value)[0]).kind == "Some") {
                      var _$unwrapTraitObject18 = $unwrapTraitObject(__PUCK__value__43),
                          _$unwrapTraitObject19 = _slicedToArray(_$unwrapTraitObject18.value, 1),
                          _$unwrapTraitObject20 = _slicedToArray(_$unwrapTraitObject19[0].value, 1),
                          implementation = _$unwrapTraitObject20[0];

                      e.traitName = _core.Option.unwrap.call(_scope.Scope.getBindingByTypeId.call(scope, _core.Option.unwrap.call(providesType.id))).name;
                      e.isDirectTraitCall = true;
                      e.implementation = implementation;
                      if (_core.Option.isSome.call(providesType._class)) {
                        var __PUCK__value__44 = (0, _impls.resolveImplTypeParameters)($unwrapTraitObject(e.implementation), _ast.Expression.getType.call(selfArgument));
                        if ($unwrapTraitObject(__PUCK__value__44).kind == "Ok") {
                          var _$unwrapTraitObject21 = $unwrapTraitObject(__PUCK__value__44),
                              _$unwrapTraitObject22 = _slicedToArray(_$unwrapTraitObject21.value, 1),
                              resolvedTrait = _$unwrapTraitObject22[0];

                          var parameterMap = _core.Option.unwrap.call(resolvedTrait.instance).parameterMap;
                          functionType = $unwrapTraitObject((0, _types.resolveTypeParameters)(parameterMap)(functionType));
                        } else {
                          if ($unwrapTraitObject(__PUCK__value__44).kind == "Err") {
                            var _$unwrapTraitObject23 = $unwrapTraitObject(__PUCK__value__44),
                                _$unwrapTraitObject24 = _slicedToArray(_$unwrapTraitObject23.value, 1),
                                _$unwrapTraitObject25 = _slicedToArray(_$unwrapTraitObject24[0], 2),
                                to = _$unwrapTraitObject25[0],
                                subject = _$unwrapTraitObject25[1];

                            return {
                              v: reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(to, subject))
                            };
                          };
                        };
                      };
                    } else {
                      if ($unwrapTraitObject(__PUCK__value__43).kind == "Ok" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__43).value)[0]).kind == "None") {
                        var _$unwrapTraitObject26 = $unwrapTraitObject(__PUCK__value__43),
                            _$unwrapTraitObject27 = _toArray(_$unwrapTraitObject26.value);

                        reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true }, _entities.Type.displayName.call(objectType) + " has not been implemented for type " + _entities.Type.displayName.call(_ast.Expression.getType.call(selfArgument)));
                      } else {
                        if (true) {
                          var _Err = __PUCK__value__43;
                          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true }, "Ambiguous trait call");
                        };
                      };
                    };
                  };
                } else {
                  e.traitName = _core.Option.unwrap.call(_scope.Scope.getBindingByTypeId.call(scope, _core.Option.unwrap.call(providesType.id))).name;
                  e.isTraitObject = true;
                };
              } else {
                reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true }, _entities.Type.displayName.call(providesType) + " has no function named " + name + "");
              };
            } else {
              var __PUCK__value__45 = objectType.kind;
              if (__PUCK__value__45.kind == "Trait") {
                var _PUCK__value__45$val = _slicedToArray(__PUCK__value__45.value, 1),
                    _trait_ = _PUCK__value__45$val[0];

                var __PUCK__value__46 = _core.ObjectMap.get.call(_trait_.functions, name);
                if (__PUCK__value__46.kind == "Some") {
                  var _PUCK__value__46$val = _slicedToArray(__PUCK__value__46.value, 1),
                      func = _PUCK__value__46$val[0];

                  functionType = func;
                  var _function2 = _entities.Type.getFunction.call(functionType);
                  if (_core.Option.isSome.call(_function2.selfBinding)) {
                    var __PUCK__value__47 = _scope.Scope.getBindingByTypeId.call(scope, _core.Option.unwrap.call(objectType.id));
                    if (__PUCK__value__47.kind == "Some") {
                      var _PUCK__value__47$val = _slicedToArray(__PUCK__value__47.value, 1),
                          binding = _PUCK__value__47$val[0];

                      e.traitName = binding.name;
                      e.isTraitObject = true;
                    } else {
                      var typeName = _core.Option.unwrap.call(objectType.name);
                      reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true }, "The function " + name + " is defined in trait " + typeName + " but it is not in scope");
                    };
                  };
                };
              } else {
                var __PUCK__value__48 = (0, _impls.getImplementation)(name, objectType, e);
                if ($unwrapTraitObject(__PUCK__value__48).kind == "Ok" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__48).value)[0]).kind == "Some") {
                  var _$unwrapTraitObject28 = $unwrapTraitObject(__PUCK__value__48),
                      _$unwrapTraitObject29 = _slicedToArray(_$unwrapTraitObject28.value, 1),
                      _$unwrapTraitObject30 = _slicedToArray(_$unwrapTraitObject29[0].value, 1),
                      _implementation = _$unwrapTraitObject30[0];

                  var __PUCK__value__49 = _implementation.trait_.instance;
                  var __PUCK__value__50 = void 0;
                  if (__PUCK__value__49.kind == "Some") {
                    var _PUCK__value__49$val = _slicedToArray(__PUCK__value__49.value, 1),
                        instance = _PUCK__value__49$val[0];

                    __PUCK__value__50 = instance._class;
                  } else {
                    __PUCK__value__50 = _implementation.trait_;
                  };
                  var _trait_2 = __PUCK__value__50;
                  var __PUCK__value__51 = _scope.Scope.getBindingByTypeId.call(scope, _core.Option.unwrap.call(_trait_2.id));
                  if (__PUCK__value__51.kind == "Some") {
                    var _PUCK__value__51$val = _slicedToArray(__PUCK__value__51.value, 1),
                        _binding = _PUCK__value__51$val[0];

                    e.traitName = _binding.name;
                    e.isShorthand = _entities.Type.getTrait.call(_trait_2).isShorthand;
                    e.implementation = _implementation;
                    functionType = _core.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({ type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: _entities.Type.getTrait.call(_implementation.trait_).functions, $isTraitObject: true }, name);
                  } else {
                    var traitName = _core.Option.unwrap.call(_trait_2.name);
                    var id = _core.Option.unwrap.call(_trait_2.id);
                    reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true }, "The function " + name + " is defined in trait " + traitName + " but it is not in scope");
                  };
                } else {
                  if ($unwrapTraitObject(__PUCK__value__48).kind == "Ok") {
                    var _$unwrapTraitObject31 = $unwrapTraitObject(__PUCK__value__48),
                        _$unwrapTraitObject32 = _slicedToArray(_$unwrapTraitObject31.value, 1),
                        _None = _$unwrapTraitObject32[0];
                  } else {
                    if (true) {
                      var _Err2 = __PUCK__value__48;
                      reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true }, "Ambiguous trait call");
                    };
                  };
                };
              };
              if (e.traitName) {
                var __PUCK__value__52 = objectType.instance;
                if (__PUCK__value__52.kind == "Some") {
                  var _PUCK__value__52$val = _slicedToArray(__PUCK__value__52.value, 1),
                      _instance = _PUCK__value__52$val[0];

                  functionType = $unwrapTraitObject((0, _types.resolveTypeParameters)(_instance.parameterMap)(functionType));
                };
              };
            };
          }();

          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        };
        if (e.traitName) {
          accessError = _core.None;
        } else {
          var __PUCK__value__53 = accessError;
          if (__PUCK__value__53.kind == "Some") {
            var _PUCK__value__53$val = _slicedToArray(__PUCK__value__53.value, 1),
                _PUCK__value__53$val$ = _slicedToArray(_PUCK__value__53$val[0], 2),
                token = _PUCK__value__53$val$[0],
                message = _PUCK__value__53$val$[1];

            reportError(token, message);
            accessError = _core.None;
          };
        };
      } else {
        $unwrapTraitObject(self).visitExpression(e.func);
        functionType = _ast.Expression.getType.call(e.func);
        var __PUCK__value__54 = e.func;
        if (__PUCK__value__54.kind == "UnknownAccess") {
          var _PUCK__value__54$val = _slicedToArray(__PUCK__value__54.value, 1),
              __PUCK__value__55 = _PUCK__value__54$val[0];

          isUnknownCall = true;
        } else {
          var __PUCK__value__56 = e.func;
          if (__PUCK__value__56.kind == "UnknownIndexAccess") {
            var _PUCK__value__56$val = _slicedToArray(__PUCK__value__56.value, 1),
                __PUCK__value__57 = _PUCK__value__56$val[0];

            isUnknownCall = true;
          };
        };
      };
      var parentAssignedTo = void 0;
      if (!isUnknownCall && functionType && _entities.Type.isFunction.call(functionType)) {
        (function () {
          var callTypeParameters = _core.Option.unwrapOr.call(_core.Option.map.call(functionType._class, function (_class) {
            return _class.typeParameters;
          }), []);
          var callParameterMap = _core.ObjectMap._new();
          var parentAssignedTo = $unwrapTraitObject(self).assignedTo;
          var functionKind = _entities.Type.getFunction.call(functionType);
          var __PUCK__value__59 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true });
          var __PUCK__value__58 = _core.Iterable[__PUCK__value__59.type].take.call(__PUCK__value__59, _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: functionKind.parameters, $isTraitObject: true }));
          _core.Iterable[__PUCK__value__58.type].forEach.call(__PUCK__value__58, function (_ref9) {
            var _ref10 = _slicedToArray(_ref9, 2),
                i = _ref10[0],
                a = _ref10[1];

            var parameter = _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: functionKind.parameters, $isTraitObject: true }, i);
            $unwrapTraitObject(self).assignedTo = parameter.type_;
            if (!skipFirstArgument || i > 0) {
              $unwrapTraitObject(self).visitExpression(a);
            };
            if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isNotEmpty.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: callTypeParameters, $isTraitObject: true }) && parameter.type_ && _ast.Expression.getType.call(a)) {
              return (0, _functions.resolveFunctionTypeParameters)(callParameterMap, callTypeParameters, $unwrapTraitObject(parameter.type_), _ast.Expression.getType.call(a));
            };
          });
          if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isNotEmpty.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: callTypeParameters, $isTraitObject: true })) {
            functionType = $unwrapTraitObject((0, _types.resolveTypeParameters)(callParameterMap)(functionType));
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
      if (isUnknownCall) {
        e.type_ = functionType;
      } else {
        if (functionType) {
          e.functionType = functionType;
          var _function = checkFunctionCall(functionType, e);
          if (_function) {
            e.type_ = _function.returnType;
          };
        };
      };
      return [];
    },
    visitIfExpression: function visitIfExpression(e) {
      var self = this;
      var parentScope = $unwrapTraitObject(self).scope;
      e.scope = $unwrapTraitObject(self).scope;
      var isUsed = $unwrapTraitObject(self).isUsed;
      $unwrapTraitObject(self).visitExpression(e.condition);
      $unwrapTraitObject(self).scope = _scope.Scope.createChild.call(parentScope);
      $unwrapTraitObject(self).visitBlock(e.then_, isUsed && _core.Option.isSome.call(e.else_));
      var __PUCK__value__60 = e.else_;
      if (__PUCK__value__60.kind == "Some") {
        var _PUCK__value__60$val = _slicedToArray(__PUCK__value__60.value, 1),
            else_ = _PUCK__value__60$val[0];

        $unwrapTraitObject(self).scope = _scope.Scope.createChild.call(parentScope);
        $unwrapTraitObject(self).visitBlock(else_, isUsed);
      };
      if (isUsed) {
        var __PUCK__value__61 = e.else_;
        var __PUCK__value__62 = void 0;
        if (__PUCK__value__61.kind == "Some") {
          var _PUCK__value__61$val = _slicedToArray(__PUCK__value__61.value, 1),
              _else_ = _PUCK__value__61$val[0];

          var __PUCK__value__63 = (0, _types.findCommonType)([e.then_.type_, _else_.type_]);
          var __PUCK__value__64 = void 0;
          if ($unwrapTraitObject(__PUCK__value__63).kind == "Ok") {
            var _$unwrapTraitObject33 = $unwrapTraitObject(__PUCK__value__63),
                _$unwrapTraitObject34 = _slicedToArray(_$unwrapTraitObject33.value, 1),
                type_ = _$unwrapTraitObject34[0];

            __PUCK__value__64 = type_;
          } else {
            var __PUCK__value__65 = void 0;
            if ($unwrapTraitObject(__PUCK__value__63).kind == "Err") {
              var _$unwrapTraitObject35 = $unwrapTraitObject(__PUCK__value__63),
                  _$unwrapTraitObject36 = _slicedToArray(_$unwrapTraitObject35.value, 1),
                  __PUCK__value__66 = _$unwrapTraitObject36[0];

              reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression', value: e, $isTraitObject: true }, "Type " + _entities.Type.displayName.call(e.then_.type_) + " and " + _entities.Type.displayName.call(_else_.type_) + " is not compatible");
              __PUCK__value__65 = _entities.Type.empty();
            };
            __PUCK__value__64 = __PUCK__value__65;
          };
          __PUCK__value__62 = __PUCK__value__64;
        } else {
          __PUCK__value__62 = _entities.Type.empty();
        };
        e.type_ = __PUCK__value__62;
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
      var __PUCK__value__67 = (0, _patterns.declarePatternVariables)($unwrapTraitObject(self).scope, self, e.pattern, false, _ast.Expression.getType.call(e.expression), true);
      if ($unwrapTraitObject(__PUCK__value__67).kind == "Ok") {
        var _$unwrapTraitObject37 = $unwrapTraitObject(__PUCK__value__67),
            _$unwrapTraitObject38 = _slicedToArray(_$unwrapTraitObject37.value, 1),
            __PUCK__value__68 = _$unwrapTraitObject38[0];
      } else {
        if ($unwrapTraitObject(__PUCK__value__67).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__67).value)[0]).kind == "PatternMismatch") {
          var _$unwrapTraitObject39 = $unwrapTraitObject(__PUCK__value__67),
              _$unwrapTraitObject40 = _slicedToArray(_$unwrapTraitObject39.value, 1),
              _$unwrapTraitObject41 = _slicedToArray(_$unwrapTraitObject40[0].value, 3),
              pattern = _$unwrapTraitObject41[0],
              to = _$unwrapTraitObject41[1],
              subject = _$unwrapTraitObject41[2];

          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(to, subject));
        } else {
          if ($unwrapTraitObject(__PUCK__value__67).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__67).value)[0]).kind == "ScopeError") {
            var _$unwrapTraitObject42 = $unwrapTraitObject(__PUCK__value__67),
                _$unwrapTraitObject43 = _slicedToArray(_$unwrapTraitObject42.value, 1),
                _$unwrapTraitObject44 = _slicedToArray(_$unwrapTraitObject43[0].value, 2),
                token = _$unwrapTraitObject44[0],
                err = _$unwrapTraitObject44[1];

            reportError(token, err);
          } else {
            if ($unwrapTraitObject(__PUCK__value__67).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__67).value)[0]).kind == "NotExhaustive") {
              var _$unwrapTraitObject45 = $unwrapTraitObject(__PUCK__value__67),
                  _$unwrapTraitObject46 = _toArray(_$unwrapTraitObject45.value);
            };
          };
        };
      };
      var expressionScope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(self).scope = _scope.Scope.createChild.call(expressionScope);
      $unwrapTraitObject(self).visitBlock(e.then_, isUsed);
      var __PUCK__value__69 = e.else_;
      if (__PUCK__value__69.kind == "Some") {
        var _PUCK__value__69$val = _slicedToArray(__PUCK__value__69.value, 1),
            else_ = _PUCK__value__69$val[0];

        $unwrapTraitObject(self).scope = _scope.Scope.createChild.call(expressionScope);
        $unwrapTraitObject(self).visitBlock(else_, isUsed);
      };
      if (isUsed) {
        var __PUCK__value__70 = e.else_;
        var __PUCK__value__71 = void 0;
        if (__PUCK__value__70.kind == "Some") {
          var _PUCK__value__70$val = _slicedToArray(__PUCK__value__70.value, 1),
              _else_2 = _PUCK__value__70$val[0];

          var __PUCK__value__72 = (0, _types.findCommonType)([e.then_.type_, _else_2.type_]);
          var __PUCK__value__73 = void 0;
          if ($unwrapTraitObject(__PUCK__value__72).kind == "Ok") {
            var _$unwrapTraitObject47 = $unwrapTraitObject(__PUCK__value__72),
                _$unwrapTraitObject48 = _slicedToArray(_$unwrapTraitObject47.value, 1),
                type_ = _$unwrapTraitObject48[0];

            __PUCK__value__73 = type_;
          } else {
            var __PUCK__value__74 = void 0;
            if ($unwrapTraitObject(__PUCK__value__72).kind == "Err") {
              var _$unwrapTraitObject49 = $unwrapTraitObject(__PUCK__value__72),
                  _$unwrapTraitObject50 = _slicedToArray(_$unwrapTraitObject49.value, 1),
                  __PUCK__value__75 = _$unwrapTraitObject50[0];

              reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression', value: e, $isTraitObject: true }, "Type " + _entities.Type.displayName.call(e.then_.type_) + " and " + _entities.Type.displayName.call(_else_2.type_) + " is not compatible");
              __PUCK__value__74 = _entities.Type.empty();
            };
            __PUCK__value__73 = __PUCK__value__74;
          };
          __PUCK__value__71 = __PUCK__value__73;
        } else {
          __PUCK__value__71 = _entities.Type.empty();
        };
        e.type_ = __PUCK__value__71;
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
      if (!_ast.Expression.getType.call(e.expression)) {
        (0, _core.print)("e.expression", e.expression);
        (0, _core.print)("e.expression value", e.expression.value[0]);
        return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true }, "No type in match expression");
      };
      var __PUCK__value__76 = (0, _enums.checkExhaustive)(e);
      if (__PUCK__value__76.kind == "Err") {
        var _PUCK__value__76$val = _slicedToArray(__PUCK__value__76.value, 1),
            error = _PUCK__value__76$val[0];

        reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true }, error);
      };
      if (isUsed) {
        var __PUCK__value__77 = void 0;
        if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isNotEmpty.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true })) {
          var __PUCK__value__79 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true }, function (arm) {
            return arm.type_;
          });
          var __PUCK__value__78 = (0, _types.findCommonType)(_core.Iterable[__PUCK__value__79.type].toList.call(__PUCK__value__79));
          var __PUCK__value__80 = void 0;
          if ($unwrapTraitObject(__PUCK__value__78).kind == "Ok") {
            var _$unwrapTraitObject51 = $unwrapTraitObject(__PUCK__value__78),
                _$unwrapTraitObject52 = _slicedToArray(_$unwrapTraitObject51.value, 1),
                type_ = _$unwrapTraitObject52[0];

            __PUCK__value__80 = type_;
          } else {
            var __PUCK__value__81 = void 0;
            if ($unwrapTraitObject(__PUCK__value__78).kind == "Err") {
              var _$unwrapTraitObject53 = $unwrapTraitObject(__PUCK__value__78),
                  _$unwrapTraitObject54 = _slicedToArray(_$unwrapTraitObject53.value, 1),
                  __PUCK__value__82 = _$unwrapTraitObject54[0];

              reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true }, "Match arms return mixed types " + _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true }, function (arm) {
                return _entities.Type.displayName.call(asType($unwrapTraitObject(arm.type_)));
              }).value.join(", "));
              __PUCK__value__81 = _entities.Type.empty();
            };
            __PUCK__value__80 = __PUCK__value__81;
          };
          __PUCK__value__77 = __PUCK__value__80;
        } else {
          __PUCK__value__77 = _entities.Type.empty();
        };
        e.type_ = __PUCK__value__77;
      };
      matchExpression = oldMatchExpression;
      return [];
    },
    visitMatchArm: function visitMatchArm(a, isUsed) {
      var self = this;
      var parentScope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(self).scope = _scope.Scope.createChild.call(parentScope);
      a.scope = $unwrapTraitObject(self).scope;
      var m = _core.Option.unwrap.call(matchExpression);
      $unwrapTraitObject(self).visitPattern(a.pattern);
      var __PUCK__value__83 = (0, _patterns.declarePatternVariables)($unwrapTraitObject(self).scope, self, a.pattern, false, _ast.Expression.getType.call(m.expression), true);
      if ($unwrapTraitObject(__PUCK__value__83).kind == "Ok") {
        var _$unwrapTraitObject55 = $unwrapTraitObject(__PUCK__value__83),
            _$unwrapTraitObject56 = _slicedToArray(_$unwrapTraitObject55.value, 1),
            __PUCK__value__84 = _$unwrapTraitObject56[0];
      } else {
        if ($unwrapTraitObject(__PUCK__value__83).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__83).value)[0]).kind == "PatternMismatch") {
          var _$unwrapTraitObject57 = $unwrapTraitObject(__PUCK__value__83),
              _$unwrapTraitObject58 = _slicedToArray(_$unwrapTraitObject57.value, 1),
              _$unwrapTraitObject59 = _slicedToArray(_$unwrapTraitObject58[0].value, 3),
              pattern = _$unwrapTraitObject59[0],
              to = _$unwrapTraitObject59[1],
              subject = _$unwrapTraitObject59[2];

          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchArm', value: a, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(to, subject));
        } else {
          if ($unwrapTraitObject(__PUCK__value__83).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__83).value)[0]).kind == "ScopeError") {
            var _$unwrapTraitObject60 = $unwrapTraitObject(__PUCK__value__83),
                _$unwrapTraitObject61 = _slicedToArray(_$unwrapTraitObject60.value, 1),
                _$unwrapTraitObject62 = _slicedToArray(_$unwrapTraitObject61[0].value, 2),
                token = _$unwrapTraitObject62[0],
                err = _$unwrapTraitObject62[1];

            reportError(token, err);
          } else {
            if ($unwrapTraitObject(__PUCK__value__83).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__83).value)[0]).kind == "NotExhaustive") {
              var _$unwrapTraitObject63 = $unwrapTraitObject(__PUCK__value__83),
                  _$unwrapTraitObject64 = _toArray(_$unwrapTraitObject63.value);
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
      var type_ = $unwrapTraitObject(e.typePath.type_);
      if (type_) {
        return e.type_ = (0, _type_function.enumMemberToFunction)(type_);
      };
    },
    visitUnaryExpression: function visitUnaryExpression(e) {
      var self = this;
      var scope = $unwrapTraitObject(self).scope;
      e.scope = $unwrapTraitObject(self).scope;
      visit.walkUnaryExpression(self, e);
      var __PUCK__value__85 = e.operator.kind;
      if ($unwrapTraitObject(__PUCK__value__85).kind == "NotKeyword") {
        var _undefined3 = $unwrapTraitObject(__PUCK__value__85);
        var __PUCK__value__86 = _scope.Scope.getBindingByTypeId.call(scope, "Bool");
        if (__PUCK__value__86.kind == "Some") {
          var _PUCK__value__86$val = _slicedToArray(__PUCK__value__86.value, 1),
              binding = _PUCK__value__86$val[0];

          e.type_ = _core.Option.unwrap.call(binding.type_.providesType);
        } else {
          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true }, "puck:core::Bool is not in scope. Please import Bool from puck:core to use boolean literals.");
        };
      } else {
        if ($unwrapTraitObject(__PUCK__value__85).kind == "MinusToken") {
          var _undefined4 = $unwrapTraitObject(__PUCK__value__85);
          var __PUCK__value__87 = _scope.Scope.getBindingByTypeId.call(scope, "Num");
          if (__PUCK__value__87.kind == "Some") {
            var _PUCK__value__87$val = _slicedToArray(__PUCK__value__87.value, 1),
                _binding2 = _PUCK__value__87$val[0];

            e.type_ = _core.Option.unwrap.call(_binding2.type_.providesType);
          } else {
            reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true }, "puck:core::Num is not in scope. Please import Num from puck:core to use number literals.");
          };
        } else {
          if ($unwrapTraitObject(__PUCK__value__85).kind == "PlusToken") {
            var _undefined5 = $unwrapTraitObject(__PUCK__value__85);
            var __PUCK__value__88 = _scope.Scope.getBindingByTypeId.call(scope, "Num");
            if (__PUCK__value__88.kind == "Some") {
              var _PUCK__value__88$val = _slicedToArray(__PUCK__value__88.value, 1),
                  _binding3 = _PUCK__value__88$val[0];

              e.type_ = _core.Option.unwrap.call(_binding3.type_.providesType);
            } else {
              reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true }, "puck:core::Num is not in scope. Please import Num from puck:core to use number literals.");
            };
          } else {
            if (true) {
              var __PUCK__value__89 = __PUCK__value__85;
            };
          };
        };
      };
      return [];
    },
    visitIndexAccess: function visitIndexAccess(a) {
      var self = this;
      var __PUCK__value__90 = getCoreType($unwrapTraitObject(self).scope, "Index", "index access");
      if ($unwrapTraitObject(__PUCK__value__90).kind == "Ok") {
        var _$unwrapTraitObject65 = $unwrapTraitObject(__PUCK__value__90),
            _$unwrapTraitObject66 = _slicedToArray(_$unwrapTraitObject65.value, 1),
            _$unwrapTraitObject67 = _slicedToArray(_$unwrapTraitObject66[0], 2),
            __PUCK__value__91 = _$unwrapTraitObject67[0],
            binding = _$unwrapTraitObject67[1];

        var call = (0, _ast.CallExpression)({
          func: _ast.Expression.MemberAccess({
            object: _ast.Expression.Identifier({
              name: binding.name,
              span: _span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: a.object, $isTraitObject: true })
            }),
            member: {
              name: "index",
              span: {
                start: a.openBracket.span.start,
                end: a.closeBracket.span.end
              }
            }
          }),
          openParen: a.openBracket,
          argumentList: [a.object, a.index],
          closeParen: a.closeBracket
        });
        $unwrapTraitObject(self).visitCallExpression(call);
        a.call = call;
        a.type_ = call.type_;
        return [];
      } else {
        if ($unwrapTraitObject(__PUCK__value__90).kind == "Err") {
          var _$unwrapTraitObject68 = $unwrapTraitObject(__PUCK__value__90),
              _$unwrapTraitObject69 = _slicedToArray(_$unwrapTraitObject68.value, 1),
              err = _$unwrapTraitObject69[0];

          return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IndexAccess', value: a, $isTraitObject: true }, err);
        };
      };
    },
    visitMemberAccess: function visitMemberAccess(a) {
      var inCallExpression = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var self = this;
      visit.walkExpression(self, a.object);
      if (_ast.Expression.getType.call(a.object)) {
        var __PUCK__value__92 = _ast.Expression.getType.call(a.object).kind;
        if (__PUCK__value__92.kind == "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__92.value)[0]).kind).kind == "Record") {
          var _PUCK__value__92$val = _slicedToArray(__PUCK__value__92.value, 1),
              _PUCK__value__92$val$ = _slicedToArray(_PUCK__value__92$val[0].kind.value, 1),
              record = _PUCK__value__92$val$[0];

          var __PUCK__value__93 = _core.ObjectMap.get.call(record.properties, a.member.name);
          if (__PUCK__value__93.kind == "Some") {
            var _PUCK__value__93$val = _slicedToArray(__PUCK__value__93.value, 1),
                type_ = _PUCK__value__93$val[0];

            return a.type_ = type_;
          } else {
            var message = _entities.Type.displayName.call(_ast.Expression.getType.call(a.object)) + " has no property " + a.member.name;
            var token = { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: a.member, $isTraitObject: true };
            if (inCallExpression) {
              return accessError = (0, _core.Some)([token, message]);
            } else {
              return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MemberAccess', value: a, $isTraitObject: true }, message);
            };
          };
        } else {
          var _message = "Can only read properties on record types";
          var _token = { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: a.member, $isTraitObject: true };
          if (inCallExpression) {
            return accessError = (0, _core.Some)([_token, _message]);
          } else {
            return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MemberAccess', value: a, $isTraitObject: true }, _message);
          };
        };
      };
    },
    visitUnknownAccess: function visitUnknownAccess(a) {
      var self = this;
      visit.walkExpression(self, a.object);
      var __PUCK__value__94 = getCoreType($unwrapTraitObject(self).scope, "Unknown", "unknown access");
      if ($unwrapTraitObject(__PUCK__value__94).kind == "Ok") {
        var _$unwrapTraitObject70 = $unwrapTraitObject(__PUCK__value__94),
            _$unwrapTraitObject71 = _slicedToArray(_$unwrapTraitObject70.value, 1),
            _$unwrapTraitObject72 = _slicedToArray(_$unwrapTraitObject71[0], 2),
            type_ = _$unwrapTraitObject72[0],
            __PUCK__value__95 = _$unwrapTraitObject72[1];

        a.type_ = type_;
      } else {
        if ($unwrapTraitObject(__PUCK__value__94).kind == "Err") {
          var _$unwrapTraitObject73 = $unwrapTraitObject(__PUCK__value__94),
              _$unwrapTraitObject74 = _slicedToArray(_$unwrapTraitObject73.value, 1),
              err = _$unwrapTraitObject74[0];

          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownAccess', value: a, $isTraitObject: true }, err);
        };
      };
      return [];
    },
    visitUnknownIndexAccess: function visitUnknownIndexAccess(a) {
      var self = this;
      visit.walkUnknownIndexAccess(self, a);
      var __PUCK__value__96 = getCoreType($unwrapTraitObject(self).scope, "Unknown", "unknown access");
      if ($unwrapTraitObject(__PUCK__value__96).kind == "Ok") {
        var _$unwrapTraitObject75 = $unwrapTraitObject(__PUCK__value__96),
            _$unwrapTraitObject76 = _slicedToArray(_$unwrapTraitObject75.value, 1),
            _$unwrapTraitObject77 = _slicedToArray(_$unwrapTraitObject76[0], 2),
            type_ = _$unwrapTraitObject77[0],
            __PUCK__value__97 = _$unwrapTraitObject77[1];

        a.type_ = type_;
      } else {
        if ($unwrapTraitObject(__PUCK__value__96).kind == "Err") {
          var _$unwrapTraitObject78 = $unwrapTraitObject(__PUCK__value__96),
              _$unwrapTraitObject79 = _slicedToArray(_$unwrapTraitObject78.value, 1),
              err = _$unwrapTraitObject79[0];

          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownIndexAccess', value: a, $isTraitObject: true }, err);
        };
      };
      return [];
    },
    visitBooleanLiteral: function visitBooleanLiteral(l) {
      var self = this;
      var scope = $unwrapTraitObject(self).scope;
      l.scope = $unwrapTraitObject(self).scope;
      var __PUCK__value__98 = _scope.Scope.getBindingByTypeId.call(scope, "Bool");
      if (__PUCK__value__98.kind == "Some") {
        var _PUCK__value__98$val = _slicedToArray(__PUCK__value__98.value, 1),
            binding = _PUCK__value__98$val[0];

        l.type_ = _core.Option.unwrap.call(binding.type_.providesType);
      } else {
        reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BooleanLiteral', value: l, $isTraitObject: true }, "puck:core::Bool is not in scope. Please import Bool from puck:core to use boolean literals.");
      };
      return visit.walkBooleanLiteral(self, l);
    },
    visitListLiteral: function visitListLiteral(l) {
      var self = this;
      var scope = $unwrapTraitObject(self).scope;
      var __PUCK__value__99 = _scope.Scope.getBindingByTypeId.call(scope, "List");
      var __PUCK__value__100 = void 0;
      if (__PUCK__value__99.kind == "Some") {
        var _PUCK__value__99$val = _slicedToArray(__PUCK__value__99.value, 1),
            binding = _PUCK__value__99$val[0];

        __PUCK__value__100 = _core.Option.unwrap.call(binding.type_.providesType);
      } else {
        return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral', value: l, $isTraitObject: true }, "puck:core::List is not in scope. Please import List from puck:core to use list literals.");
      };
      var listType = __PUCK__value__100;
      l.scope = $unwrapTraitObject(self).scope;
      visit.walkListLiteral(self, l);
      if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true }) >= 1) {
        var __PUCK__value__101 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true }, function (m) {
          return _ast.Expression.getType.call(m);
        });
        var types = _core.Iterable[__PUCK__value__101.type].toList.call(__PUCK__value__101);
        var result = (0, _types.findCommonType)(types);
        var __PUCK__value__102 = result;
        if ($unwrapTraitObject(__PUCK__value__102).kind == "Ok") {
          var _$unwrapTraitObject80 = $unwrapTraitObject(__PUCK__value__102),
              _$unwrapTraitObject81 = _slicedToArray(_$unwrapTraitObject80.value, 1),
              type_ = _$unwrapTraitObject81[0];

          if (!type_) {
            l.type_ = listType;
          } else {
            l.type_ = (0, _types.createTypeInstance)(listType, asIterable([type_]));
          };
        } else {
          if ($unwrapTraitObject(__PUCK__value__102).kind == "Err") {
            var _$unwrapTraitObject82 = $unwrapTraitObject(__PUCK__value__102),
                _$unwrapTraitObject83 = _slicedToArray(_$unwrapTraitObject82.value, 1),
                __PUCK__value__103 = _$unwrapTraitObject83[0];

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
      var __PUCK__value__104 = _scope.Scope.getBindingByTypeId.call(scope, "Num");
      if (__PUCK__value__104.kind == "Some") {
        var _PUCK__value__104$va = _slicedToArray(__PUCK__value__104.value, 1),
            binding = _PUCK__value__104$va[0];

        l.type_ = _core.Option.unwrap.call(binding.type_.providesType);
        return [];
      } else {
        return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NumberLiteral', value: l, $isTraitObject: true }, "puck:core::Num is not in scope. Please import Num from puck:core to use number literals.");
      };
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
        enumMember: _core.None
      });
    },
    visitStringLiteral: function visitStringLiteral(l) {
      var self = this;
      var scope = $unwrapTraitObject(self).scope;
      l.scope = $unwrapTraitObject(self).scope;
      var __PUCK__value__105 = _scope.Scope.getBindingByTypeId.call(scope, "String");
      if (__PUCK__value__105.kind == "Some") {
        var _PUCK__value__105$va = _slicedToArray(__PUCK__value__105.value, 1),
            binding = _PUCK__value__105$va[0];

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
      var __PUCK__value__106 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.expressions, $isTraitObject: true }, function (e) {
        return _ast.Expression.getType.call(e);
      });
      return l.type_ = (0, _entities.Type)({
        id: _core.None,
        displayName: _core.None,
        name: _core.None,
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: _entities.StructKind.Tuple({ properties: _core.Iterable[__PUCK__value__106.type].toList.call(__PUCK__value__106) })
        }),
        _class: _core.None,
        instance: _core.None,
        providesType: _core.None,
        enumMember: _core.None
      });
    },
    visitPattern: function visitPattern(p) {
      var self = this;
      p.scope = $unwrapTraitObject(self).scope;
      visit.walkPattern(self, p);
      var __PUCK__value__107 = p;
      var __PUCK__value__108 = void 0;
      if ($unwrapTraitObject(__PUCK__value__107).kind == "CatchAll") {
        var _undefined6 = $unwrapTraitObject(__PUCK__value__107);
        __PUCK__value__108 = _entities.Type.unused();
      } else {
        var __PUCK__value__109 = void 0;
        if ($unwrapTraitObject(__PUCK__value__107).kind == "Identifier") {
          var _$unwrapTraitObject84 = $unwrapTraitObject(__PUCK__value__107),
              _$unwrapTraitObject85 = _slicedToArray(_$unwrapTraitObject84.value, 1),
              identifier = _$unwrapTraitObject85[0];

          __PUCK__value__109 = _js._undefined;
        } else {
          var __PUCK__value__110 = void 0;
          if ($unwrapTraitObject(__PUCK__value__107).kind == "Record") {
            var _$unwrapTraitObject86 = $unwrapTraitObject(__PUCK__value__107),
                _$unwrapTraitObject87 = _slicedToArray(_$unwrapTraitObject86.value, 1),
                record = _$unwrapTraitObject87[0];

            __PUCK__value__110 = record.type_;
          } else {
            var __PUCK__value__111 = void 0;
            if ($unwrapTraitObject(__PUCK__value__107).kind == "RecordType") {
              var _$unwrapTraitObject88 = $unwrapTraitObject(__PUCK__value__107),
                  _$unwrapTraitObject89 = _slicedToArray(_$unwrapTraitObject88.value, 2),
                  typePath = _$unwrapTraitObject89[0],
                  _record = _$unwrapTraitObject89[1];

              var type_ = $unwrapTraitObject(typePath.providesType);
              if (!(0, _types.isAssignable)($unwrapTraitObject(_record.type_), type_)) {
                reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p, $isTraitObject: true }, _entities.Type.displayName.call(type_) + " is not assignable to pattern " + _ast.RecordPattern.displayName.call(_record));
              };
              __PUCK__value__111 = _core.Option.mapOr.call(type_.enumMember, type_, function (_ref11) {
                var _ref12 = _slicedToArray(_ref11, 2),
                    __PUCK__value__112 = _ref12[0],
                    enum_ = _ref12[1];

                return enum_;
              });
            } else {
              var __PUCK__value__113 = void 0;
              if ($unwrapTraitObject(__PUCK__value__107).kind == "Tuple") {
                var _$unwrapTraitObject90 = $unwrapTraitObject(__PUCK__value__107),
                    _$unwrapTraitObject91 = _slicedToArray(_$unwrapTraitObject90.value, 1),
                    tuple = _$unwrapTraitObject91[0];

                __PUCK__value__113 = tuple.type_;
              } else {
                var __PUCK__value__114 = void 0;
                if ($unwrapTraitObject(__PUCK__value__107).kind == "TupleType") {
                  var _$unwrapTraitObject92 = $unwrapTraitObject(__PUCK__value__107),
                      _$unwrapTraitObject93 = _slicedToArray(_$unwrapTraitObject92.value, 2),
                      _typePath = _$unwrapTraitObject93[0],
                      _tuple = _$unwrapTraitObject93[1];

                  var _type_ = $unwrapTraitObject(_typePath.providesType);
                  if (!(0, _types.isAssignable)($unwrapTraitObject(_tuple.type_), _type_)) {
                    reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p, $isTraitObject: true }, _entities.Type.displayName.call(_type_) + " is not assignable to pattern " + _ast.TuplePattern.displayName.call(_tuple));
                  };
                  __PUCK__value__114 = _core.Option.mapOr.call(_type_.enumMember, _type_, function (_ref13) {
                    var _ref14 = _slicedToArray(_ref13, 2),
                        __PUCK__value__115 = _ref14[0],
                        enum_ = _ref14[1];

                    return enum_;
                  });
                } else {
                  var __PUCK__value__116 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__107).kind == "UnitType") {
                    var _$unwrapTraitObject94 = $unwrapTraitObject(__PUCK__value__107),
                        _$unwrapTraitObject95 = _slicedToArray(_$unwrapTraitObject94.value, 1),
                        _typePath2 = _$unwrapTraitObject95[0];

                    __PUCK__value__116 = _js._undefined;
                  };
                  __PUCK__value__114 = __PUCK__value__116;
                };
                __PUCK__value__113 = __PUCK__value__114;
              };
              __PUCK__value__111 = __PUCK__value__113;
            };
            __PUCK__value__110 = __PUCK__value__111;
          };
          __PUCK__value__109 = __PUCK__value__110;
        };
        __PUCK__value__108 = __PUCK__value__109;
      };
      return p.type_ = __PUCK__value__108;
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
        enumMember: _core.None
      });
    },
    visitTuplePattern: function visitTuplePattern(p) {
      var self = this;
      p.scope = $unwrapTraitObject(self).scope;
      visit.walkTuplePattern(self, p);
      var __PUCK__value__117 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: p.properties, $isTraitObject: true }, function (p) {
        return p.type_;
      });
      return p.type_ = (0, _entities.Type)({
        id: _core.None,
        displayName: _core.None,
        name: _core.None,
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: _entities.StructKind.Tuple({ properties: _core.Iterable[__PUCK__value__117.type].toList.call(__PUCK__value__117) })
        }),
        instance: _core.None,
        _class: _core.None,
        providesType: _core.None,
        enumMember: _core.None
      });
    }
  });
}
