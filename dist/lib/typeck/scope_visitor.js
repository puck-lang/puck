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
function asTraitCall(visitor, e, trait_, method, desription) {
  var __PUCK__value__4 = getCoreType($unwrapTraitObject(visitor).scope, trait_, desription);
  if ($unwrapTraitObject(__PUCK__value__4).kind == "Ok") {
    var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__4),
        _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
        _$unwrapTraitObject4$2 = _slicedToArray(_$unwrapTraitObject4$[0], 2),
        __PUCK__value__5 = _$unwrapTraitObject4$2[0],
        binding = _$unwrapTraitObject4$2[1];

    var call = (0, _ast.CallExpression)({
      func: _ast.Expression.MemberAccess({
        object: _ast.Expression.Identifier({
          name: binding.name,
          span: e.operator.span
        }),
        member: {
          name: method,
          span: {
            start: e.operator.span.start,
            end: e.operator.span.end
          }
        }
      }),
      openParen: e.operator,
      argumentList: [e.lhs, e.rhs],
      closeParen: e.operator
    });
    $unwrapTraitObject(visitor).visitCallExpression(call);
    e.call = call;
    e.type_ = call.type_;
    return (0, _core.Ok)([]);
  } else {
    if ($unwrapTraitObject(__PUCK__value__4).kind == "Err") {
      var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__4),
          _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
          err = _$unwrapTraitObject5$[0];

      return (0, _core.Err)(err);
    };
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
    var __PUCK__value__6 = c.func;
    var __PUCK__value__7 = void 0;
    if ($unwrapTraitObject(__PUCK__value__6).kind == "Identifier") {
      var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__6),
          _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
          i = _$unwrapTraitObject6$[0];

      __PUCK__value__7 = (0, _core.Some)(i.name);
    } else {
      var __PUCK__value__8 = void 0;
      if (true) {
        var __PUCK__value__9 = __PUCK__value__6;
        __PUCK__value__8 = _core.None;
      };
      __PUCK__value__7 = __PUCK__value__8;
    };
    var namei = __PUCK__value__7;
    var name = _core.Option.unwrapOrElse.call(namei, function () {
      return _entities.Type.displayName.call(functionType);
    });
    var __PUCK__value__10 = functionType.kind;
    var __PUCK__value__11 = void 0;
    if ($unwrapTraitObject(__PUCK__value__10).kind == "Function") {
      var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__10),
          _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
          func = _$unwrapTraitObject7$[0];

      __PUCK__value__11 = func;
    } else {
      var __PUCK__value__12 = void 0;
      if (true) {
        var __PUCK__value__13 = __PUCK__value__10;
        reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: c, $isTraitObject: true }, "" + name + " is not callable");
        return _js._undefined;
      };
      __PUCK__value__11 = __PUCK__value__12;
    };
    var _function = __PUCK__value__11;
    var __PUCK__value__14 = _function.selfBinding;
    if (__PUCK__value__14.kind == "Some") {
      var _PUCK__value__14$val = _slicedToArray(__PUCK__value__14.value, 1),
          selfBinding = _PUCK__value__14$val[0];

      if (selfBinding.mutable) {
        if (!_core.Option.mapOr.call(getBinding(c.func), true, function (binding) {
          return binding.mutable;
        })) {
          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: c, $isTraitObject: true }, "" + name + " can only be called on a mutable binding");
        };
      };
    };
    var __PUCK__value__15 = (0, _range.checkRange)(c.argumentList, _function.parameterRange, "arguments", name);
    if (__PUCK__value__15.kind == "Err") {
      var _PUCK__value__15$val = _slicedToArray(__PUCK__value__15.value, 1),
          error = _PUCK__value__15$val[0];

      reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: c, $isTraitObject: true }, error);
      return _function;
    };
    var __PUCK__value__16 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: c.argumentList, $isTraitObject: true });
    _core.Iterable[__PUCK__value__16.type].forEach.call(__PUCK__value__16, function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          i = _ref2[0],
          argument = _ref2[1];

      var parameter = _core.Option.unwrap.call(_core.List.get.call(_function.parameters, i));
      var parameterName = parameter.name;
      if (!(0, _types.isAssignable)(parameter.type_, _ast.Expression.getType.call(argument))) {
        reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: argument, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(parameter.type_, _ast.Expression.getType.call(argument)) + " in parameter " + parameterName + " of function " + name + "");
      };
      if (parameter.mutable) {
        var __PUCK__value__17 = getBinding(argument);
        if (__PUCK__value__17.kind == "Some") {
          var _PUCK__value__17$val = _slicedToArray(__PUCK__value__17.value, 1),
              argumentBinding = _PUCK__value__17$val[0];

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
        var __PUCK__value__18 = s;
        if ($unwrapTraitObject(__PUCK__value__18).kind == "ExportDirective" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__18).value)[0]).statement).kind == "FunctionDeclaration") {
          var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__18),
              _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
              _$unwrapTraitObject8$2 = _slicedToArray(_$unwrapTraitObject8$[0].statement.value, 1),
              f = _$unwrapTraitObject8$2[0];

          return $unwrapTraitObject(self).visitFunctionDeclaration(f, true);
        } else {
          if ($unwrapTraitObject(__PUCK__value__18).kind == "BlockLevelStatement" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__18).value)[0]).kind == "Expression" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__18).value)[0]).value)[0]).kind == "FunctionDeclaration") {
            var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__18),
                _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
                _$unwrapTraitObject9$2 = _slicedToArray(_$unwrapTraitObject9$[0].value, 1),
                _$unwrapTraitObject9$3 = _slicedToArray(_$unwrapTraitObject9$2[0].value, 1),
                _f = _$unwrapTraitObject9$3[0];

            return $unwrapTraitObject(self).visitFunctionDeclaration(_f, true);
          } else {
            if (true) {
              var __PUCK__value__19 = __PUCK__value__18;;
              var __PUCK__value__20 = __PUCK__value__19;;
              return __PUCK__value__19;
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
        var __PUCK__value__21 = s;
        if ($unwrapTraitObject(__PUCK__value__21).kind == "Expression" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__21).value)[0]).kind == "FunctionDeclaration") {
          var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__21),
              _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
              _$unwrapTraitObject12 = _slicedToArray(_$unwrapTraitObject11[0].value, 1),
              f = _$unwrapTraitObject12[0];

          return $unwrapTraitObject(self).visitFunctionDeclaration(f, true);
        } else {
          if (true) {
            var __PUCK__value__22 = __PUCK__value__21;;
            var __PUCK__value__23 = __PUCK__value__22;;
            return __PUCK__value__22;
          };
        };
      });
      var lastIndex = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true }) - 1;
      var __PUCK__value__24 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true });
      _core.Iterable[__PUCK__value__24.type].forEach.call(__PUCK__value__24, function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            index = _ref4[0],
            s = _ref4[1];

        $unwrapTraitObject(self).isUsed = isUsed && index == lastIndex;
        return $unwrapTraitObject(self).visitBlockLevelStatement(s);
      });
      var __PUCK__value__25 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].last.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true });
      var __PUCK__value__26 = void 0;
      if (__PUCK__value__25.kind == "Some") {
        var _PUCK__value__25$val = _slicedToArray(__PUCK__value__25.value, 1),
            last = _PUCK__value__25$val[0];

        __PUCK__value__26 = _ast.BlockLevelStatement.getType.call(last);
      } else {
        __PUCK__value__26 = _entities.Type.empty();
      };
      return b.type_ = __PUCK__value__26;
    },
    visitBreak: function visitBreak(b) {
      var self = this;
      return b.scope = $unwrapTraitObject(self).scope;
    },
    visitReturn: function visitReturn(r) {
      var self = this;
      visit.walkReturn(self, r);
      var __PUCK__value__27 = $unwrapTraitObject($unwrapTraitObject(self).functionContext).returnType;
      if (__PUCK__value__27.kind == "Some") {
        var _PUCK__value__27$val = _slicedToArray(__PUCK__value__27.value, 1),
            returnType = _PUCK__value__27$val[0];

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
      var __PUCK__value__28 = _scope.Scope.getBinding.call(scope, i.name);
      if (__PUCK__value__28.kind == "Some") {
        var _PUCK__value__28$val = _slicedToArray(__PUCK__value__28.value, 1),
            binding = _PUCK__value__28$val[0];

        var b = binding;
        i.binding = binding;
        var __PUCK__value__29 = void 0;
        if (binding.type_ && _core.Option.isSome.call(binding.type_.providesType)) {
          __PUCK__value__29 = (0, _type_function.enumMemberToFunction)(b.type_);
        } else {
          __PUCK__value__29 = binding.type_;
        };
        i.type_ = __PUCK__value__29;
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
        var __PUCK__value__30 = f.body;
        if (__PUCK__value__30.kind == "Some") {
          var _PUCK__value__30$val = _slicedToArray(__PUCK__value__30.value, 1),
              body = _PUCK__value__30$val[0];

          var parentAssignedTo = $unwrapTraitObject(self).assignedTo;
          var parentContext = $unwrapTraitObject(self).functionContext;
          var isUsed = true;
          $unwrapTraitObject(self).functionContext = {
            returnType: _core.None,
            returnTypes: []
          };
          var __PUCK__value__31 = f.type_.kind;
          if (__PUCK__value__31.kind == "Function") {
            var _PUCK__value__31$val = _slicedToArray(__PUCK__value__31.value, 1),
                func = _PUCK__value__31$val[0];

            $unwrapTraitObject(self).assignedTo = func.returnType;
            if (func.returnType) {
              $unwrapTraitObject($unwrapTraitObject(self).functionContext).returnType = (0, _core.Some)(func.returnType);
              if (_entities.Type.isEmpty.call(func.returnType)) {
                isUsed = false;
              };
            };
          };
          $unwrapTraitObject(self).visitBlock(body, isUsed);
          var __PUCK__value__32 = $unwrapTraitObject(self).functionContext;
          if (__PUCK__value__32.kind == "None") {
            var _undefined2 = __PUCK__value__32;
          };
          var __PUCK__value__33 = f.type_.kind;
          if (__PUCK__value__33.kind == "Function") {
            var _PUCK__value__33$val = _slicedToArray(__PUCK__value__33.value, 1),
                _func = _PUCK__value__33$val[0];

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
                var __PUCK__value__34 = (0, _types.findCommonType)(types);
                if ($unwrapTraitObject(__PUCK__value__34).kind == "Ok") {
                  var _$unwrapTraitObject13 = $unwrapTraitObject(__PUCK__value__34),
                      _$unwrapTraitObject14 = _slicedToArray(_$unwrapTraitObject13.value, 1),
                      type_ = _$unwrapTraitObject14[0];

                  _js._Object.assign(_func, { returnType: body.type_ });
                } else {
                  if ($unwrapTraitObject(__PUCK__value__34).kind == "Err") {
                    var _$unwrapTraitObject15 = $unwrapTraitObject(__PUCK__value__34),
                        _$unwrapTraitObject16 = _slicedToArray(_$unwrapTraitObject15.value, 1),
                        __PUCK__value__35 = _$unwrapTraitObject16[0];

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
      var __PUCK__value__36 = void 0;
      if (visitInitializer) {
        __PUCK__value__36 = visitInitializer;
      } else {
        __PUCK__value__36 = function __PUCK__value__36(e) {
          var parentAssignedTo = $unwrapTraitObject(self).assignedTo;
          $unwrapTraitObject(self).assignedTo = d.type_;
          $unwrapTraitObject(self).isUsed = true;
          $unwrapTraitObject(self).visitExpression(e);
          return $unwrapTraitObject(self).assignedTo = parentAssignedTo;
        };
      };
      return structureVisitorInstance.visitVariableDeclaration.call(self, d, __PUCK__value__36, type_, allowNotExhaustive);
    },
    visitAssignmentExpression: function visitAssignmentExpression(e) {
      var self = this;
      e.scope = $unwrapTraitObject(self).scope;
      var __PUCK__value__37 = e.lhs;
      if (__PUCK__value__37.kind == "IndexAccess") {
        var _PUCK__value__37$val = _slicedToArray(__PUCK__value__37.value, 1),
            a = _PUCK__value__37$val[0];

        visit.walkIndexAccess(self, a);
        visit.walkExpression(self, e.rhs);
      } else {
        visit.walkAssignmentExpression(self, e);
      };
      var __PUCK__value__38 = getBinding(e.lhs);
      if (__PUCK__value__38.kind == "Some") {
        var _PUCK__value__38$val = _slicedToArray(__PUCK__value__38.value, 1),
            binding = _PUCK__value__38$val[0];

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
      var __PUCK__value__39 = e.operator.kind;
      if ($unwrapTraitObject(__PUCK__value__39).kind == "LessThanToken") {
        var _undefined3 = $unwrapTraitObject(__PUCK__value__39);
        return asTraitCall(self, e, "PartialOrd", "lt", "comparison operators");
      } else {
        if ($unwrapTraitObject(__PUCK__value__39).kind == "LessThanEqualsToken") {
          var _undefined4 = $unwrapTraitObject(__PUCK__value__39);
          return asTraitCall(self, e, "PartialOrd", "le", "comparison operators");
        } else {
          if ($unwrapTraitObject(__PUCK__value__39).kind == "GreaterThanToken") {
            var _undefined5 = $unwrapTraitObject(__PUCK__value__39);
            return asTraitCall(self, e, "PartialOrd", "gt", "comparison operators");
          } else {
            if ($unwrapTraitObject(__PUCK__value__39).kind == "GreaterThanEqualsToken") {
              var _undefined6 = $unwrapTraitObject(__PUCK__value__39);
              return asTraitCall(self, e, "PartialOrd", "ge", "comparison operators");
            } else {
              if (true) {
                var __PUCK__value__40 = __PUCK__value__39;
                return visit.walkBinaryExpression(self, e);
              };
            };
          };
        };
      };
    },
    visitCallExpression: function visitCallExpression(e) {
      var self = this;
      e.scope = $unwrapTraitObject(self).scope;
      var scope = $unwrapTraitObject(self).scope;
      var functionType = void 0;
      var isUnknownCall = false;
      var skipFirstArgument = false;
      var __PUCK__value__41 = e.func;
      if (__PUCK__value__41.kind == "MemberAccess") {
        var _PUCK__value__41$val = _slicedToArray(__PUCK__value__41.value, 1),
            access = _PUCK__value__41$val[0];

        $unwrapTraitObject(self).visitMemberAccess(access, true);
        functionType = _ast.Expression.getType.call(e.func);
        if (_ast.Expression.getType.call(access.object)) {
          var _ret = function () {
            var name = access.member.name;
            var objectType = _ast.Expression.getType.call(access.object);
            var __PUCK__value__42 = objectType.providesType;
            if (__PUCK__value__42.kind == "Some") {
              var _PUCK__value__42$val = _slicedToArray(__PUCK__value__42.value, 1),
                  providesType = _PUCK__value__42$val[0];

              var __PUCK__value__43 = providesType.kind;
              if ($unwrapTraitObject(__PUCK__value__43).kind == "Enum") {
                var _$unwrapTraitObject17 = $unwrapTraitObject(__PUCK__value__43),
                    _$unwrapTraitObject18 = _slicedToArray(_$unwrapTraitObject17.value, 1),
                    enum_ = _$unwrapTraitObject18[0];

                functionType = _core.Option.unwrapOr.call(_core.Option.andThen.call(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: enum_.implementations, $isTraitObject: true }, function (_ref5) {
                  var trait_ = _ref5.trait_;

                  return _entities.Type.getTrait.call(trait_).isShorthand;
                }), function (_ref6) {
                  var trait_ = _ref6.trait_;

                  return _core.ObjectMap.get.call(_entities.Type.getTrait.call(trait_).functions, name);
                }), $unwrapTraitObject(_js._undefined));
              } else {
                if ($unwrapTraitObject(__PUCK__value__43).kind == "Struct") {
                  var _$unwrapTraitObject19 = $unwrapTraitObject(__PUCK__value__43),
                      _$unwrapTraitObject20 = _slicedToArray(_$unwrapTraitObject19.value, 1),
                      struct = _$unwrapTraitObject20[0];

                  functionType = _core.Option.unwrapOr.call(_core.Option.andThen.call(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: struct.implementations, $isTraitObject: true }, function (_ref7) {
                    var trait_ = _ref7.trait_;

                    return _entities.Type.getTrait.call(trait_).isShorthand;
                  }), function (_ref8) {
                    var trait_ = _ref8.trait_;

                    return _core.ObjectMap.get.call(_entities.Type.getTrait.call(trait_).functions, name);
                  }), $unwrapTraitObject(_js._undefined));
                } else {
                  if ($unwrapTraitObject(__PUCK__value__43).kind == "Trait") {
                    var _$unwrapTraitObject21 = $unwrapTraitObject(__PUCK__value__43),
                        _$unwrapTraitObject22 = _slicedToArray(_$unwrapTraitObject21.value, 1),
                        trait_ = _$unwrapTraitObject22[0];

                    functionType = _core.Option.unwrapOr.call(_core.ObjectMap.get.call(trait_.functions, name), $unwrapTraitObject(_js._undefined));
                  } else {
                    if (true) {
                      var __PUCK__value__44 = __PUCK__value__43;
                    };
                  };
                };
              };
              if (functionType) {
                var _function = _entities.Type.getFunction.call(functionType);
                var __PUCK__value__45 = _function.selfBinding;
                if (__PUCK__value__45.kind == "Some") {
                  var _PUCK__value__45$val = _slicedToArray(__PUCK__value__45.value, 1),
                      selfBinding = _PUCK__value__45$val[0];

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
                  var __PUCK__value__46 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true });
                  if (__PUCK__value__46.kind == "Some") {
                    var _PUCK__value__46$val = _slicedToArray(__PUCK__value__46.value, 1),
                        selfArgument = _PUCK__value__46$val[0];

                    skipFirstArgument = true;
                    $unwrapTraitObject(self).visitExpression(selfArgument);
                    if (!_ast.Expression.getType.call(selfArgument)) {
                      reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: selfArgument, $isTraitObject: true }, "selfArgument has no type");
                    };
                    var __PUCK__value__47 = (0, _impls.getImplementationForTrait)(_ast.Expression.getType.call(selfArgument), _core.Option.unwrapOr.call(objectType.providesType, objectType));
                    if ($unwrapTraitObject(__PUCK__value__47).kind == "Ok" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__47).value)[0]).kind == "Some") {
                      var _$unwrapTraitObject23 = $unwrapTraitObject(__PUCK__value__47),
                          _$unwrapTraitObject24 = _slicedToArray(_$unwrapTraitObject23.value, 1),
                          _$unwrapTraitObject25 = _slicedToArray(_$unwrapTraitObject24[0].value, 1),
                          implementation = _$unwrapTraitObject25[0];

                      e.traitName = _core.Option.unwrap.call(_scope.Scope.getBindingByTypeId.call(scope, _core.Option.unwrap.call(providesType.id))).name;
                      e.isDirectTraitCall = true;
                      e.implementation = implementation;
                      if (_core.Option.isSome.call(providesType._class)) {
                        var __PUCK__value__48 = (0, _impls.resolveImplTypeParameters)($unwrapTraitObject(e.implementation), _ast.Expression.getType.call(selfArgument));
                        if ($unwrapTraitObject(__PUCK__value__48).kind == "Ok") {
                          var _$unwrapTraitObject26 = $unwrapTraitObject(__PUCK__value__48),
                              _$unwrapTraitObject27 = _slicedToArray(_$unwrapTraitObject26.value, 1),
                              resolvedTrait = _$unwrapTraitObject27[0];

                          var parameterMap = _core.Option.unwrap.call(resolvedTrait.instance).parameterMap;
                          functionType = $unwrapTraitObject((0, _types.resolveTypeParameters)(parameterMap)(functionType));
                        } else {
                          if ($unwrapTraitObject(__PUCK__value__48).kind == "Err") {
                            var _$unwrapTraitObject28 = $unwrapTraitObject(__PUCK__value__48),
                                _$unwrapTraitObject29 = _slicedToArray(_$unwrapTraitObject28.value, 1),
                                _$unwrapTraitObject30 = _slicedToArray(_$unwrapTraitObject29[0], 2),
                                to = _$unwrapTraitObject30[0],
                                subject = _$unwrapTraitObject30[1];

                            return {
                              v: reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(to, subject))
                            };
                          };
                        };
                      };
                    } else {
                      if ($unwrapTraitObject(__PUCK__value__47).kind == "Ok" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__47).value)[0]).kind == "None") {
                        var _$unwrapTraitObject31 = $unwrapTraitObject(__PUCK__value__47),
                            _$unwrapTraitObject32 = _toArray(_$unwrapTraitObject31.value);

                        reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true }, _entities.Type.displayName.call(objectType) + " has not been implemented for type " + _entities.Type.displayName.call(_ast.Expression.getType.call(selfArgument)));
                      } else {
                        if (true) {
                          var _Err = __PUCK__value__47;
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
              var __PUCK__value__49 = objectType.kind;
              if (__PUCK__value__49.kind == "Trait") {
                var _PUCK__value__49$val = _slicedToArray(__PUCK__value__49.value, 1),
                    _trait_ = _PUCK__value__49$val[0];

                var __PUCK__value__50 = _core.ObjectMap.get.call(_trait_.functions, name);
                if (__PUCK__value__50.kind == "Some") {
                  var _PUCK__value__50$val = _slicedToArray(__PUCK__value__50.value, 1),
                      func = _PUCK__value__50$val[0];

                  functionType = func;
                  var _function2 = _entities.Type.getFunction.call(functionType);
                  if (_core.Option.isSome.call(_function2.selfBinding)) {
                    var __PUCK__value__51 = _scope.Scope.getBindingByTypeId.call(scope, _core.Option.unwrap.call(objectType.id));
                    if (__PUCK__value__51.kind == "Some") {
                      var _PUCK__value__51$val = _slicedToArray(__PUCK__value__51.value, 1),
                          binding = _PUCK__value__51$val[0];

                      e.traitName = binding.name;
                      e.isTraitObject = true;
                    } else {
                      var typeName = _core.Option.unwrap.call(objectType.name);
                      reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true }, "The function " + name + " is defined in trait " + typeName + " but it is not in scope");
                    };
                  };
                };
              } else {
                var __PUCK__value__52 = (0, _impls.getImplementation)(name, objectType, e);
                if ($unwrapTraitObject(__PUCK__value__52).kind == "Ok" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__52).value)[0]).kind == "Some") {
                  var _$unwrapTraitObject33 = $unwrapTraitObject(__PUCK__value__52),
                      _$unwrapTraitObject34 = _slicedToArray(_$unwrapTraitObject33.value, 1),
                      _$unwrapTraitObject35 = _slicedToArray(_$unwrapTraitObject34[0].value, 1),
                      _implementation = _$unwrapTraitObject35[0];

                  var __PUCK__value__53 = _implementation.trait_.instance;
                  var __PUCK__value__54 = void 0;
                  if (__PUCK__value__53.kind == "Some") {
                    var _PUCK__value__53$val = _slicedToArray(__PUCK__value__53.value, 1),
                        instance = _PUCK__value__53$val[0];

                    __PUCK__value__54 = instance._class;
                  } else {
                    __PUCK__value__54 = _implementation.trait_;
                  };
                  var _trait_2 = __PUCK__value__54;
                  var __PUCK__value__55 = _scope.Scope.getBindingByTypeId.call(scope, _core.Option.unwrap.call(_trait_2.id));
                  if (__PUCK__value__55.kind == "Some") {
                    var _PUCK__value__55$val = _slicedToArray(__PUCK__value__55.value, 1),
                        _binding = _PUCK__value__55$val[0];

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
                  if ($unwrapTraitObject(__PUCK__value__52).kind == "Ok") {
                    var _$unwrapTraitObject36 = $unwrapTraitObject(__PUCK__value__52),
                        _$unwrapTraitObject37 = _slicedToArray(_$unwrapTraitObject36.value, 1),
                        _None = _$unwrapTraitObject37[0];
                  } else {
                    if (true) {
                      var _Err2 = __PUCK__value__52;
                      reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true }, "Ambiguous trait call");
                    };
                  };
                };
              };
              if (e.traitName) {
                var __PUCK__value__56 = objectType.instance;
                if (__PUCK__value__56.kind == "Some") {
                  var _PUCK__value__56$val = _slicedToArray(__PUCK__value__56.value, 1),
                      _instance = _PUCK__value__56$val[0];

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
          var __PUCK__value__57 = accessError;
          if (__PUCK__value__57.kind == "Some") {
            var _PUCK__value__57$val = _slicedToArray(__PUCK__value__57.value, 1),
                _PUCK__value__57$val$ = _slicedToArray(_PUCK__value__57$val[0], 2),
                token = _PUCK__value__57$val$[0],
                message = _PUCK__value__57$val$[1];

            reportError(token, message);
            accessError = _core.None;
          };
        };
      } else {
        $unwrapTraitObject(self).visitExpression(e.func);
        functionType = _ast.Expression.getType.call(e.func);
        var __PUCK__value__58 = e.func;
        if (__PUCK__value__58.kind == "UnknownAccess") {
          var _PUCK__value__58$val = _slicedToArray(__PUCK__value__58.value, 1),
              __PUCK__value__59 = _PUCK__value__58$val[0];

          isUnknownCall = true;
        } else {
          var __PUCK__value__60 = e.func;
          if (__PUCK__value__60.kind == "UnknownIndexAccess") {
            var _PUCK__value__60$val = _slicedToArray(__PUCK__value__60.value, 1),
                __PUCK__value__61 = _PUCK__value__60$val[0];

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
          var __PUCK__value__63 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true });
          var __PUCK__value__62 = _core.Iterable[__PUCK__value__63.type].take.call(__PUCK__value__63, _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: functionKind.parameters, $isTraitObject: true }));
          _core.Iterable[__PUCK__value__62.type].forEach.call(__PUCK__value__62, function (_ref9) {
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
      var __PUCK__value__64 = e.else_;
      if (__PUCK__value__64.kind == "Some") {
        var _PUCK__value__64$val = _slicedToArray(__PUCK__value__64.value, 1),
            else_ = _PUCK__value__64$val[0];

        $unwrapTraitObject(self).scope = _scope.Scope.createChild.call(parentScope);
        $unwrapTraitObject(self).visitBlock(else_, isUsed);
      };
      if (isUsed) {
        var __PUCK__value__65 = e.else_;
        var __PUCK__value__66 = void 0;
        if (__PUCK__value__65.kind == "Some") {
          var _PUCK__value__65$val = _slicedToArray(__PUCK__value__65.value, 1),
              _else_ = _PUCK__value__65$val[0];

          var __PUCK__value__67 = (0, _types.findCommonType)([e.then_.type_, _else_.type_]);
          var __PUCK__value__68 = void 0;
          if ($unwrapTraitObject(__PUCK__value__67).kind == "Ok") {
            var _$unwrapTraitObject38 = $unwrapTraitObject(__PUCK__value__67),
                _$unwrapTraitObject39 = _slicedToArray(_$unwrapTraitObject38.value, 1),
                type_ = _$unwrapTraitObject39[0];

            __PUCK__value__68 = type_;
          } else {
            var __PUCK__value__69 = void 0;
            if ($unwrapTraitObject(__PUCK__value__67).kind == "Err") {
              var _$unwrapTraitObject40 = $unwrapTraitObject(__PUCK__value__67),
                  _$unwrapTraitObject41 = _slicedToArray(_$unwrapTraitObject40.value, 1),
                  __PUCK__value__70 = _$unwrapTraitObject41[0];

              reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression', value: e, $isTraitObject: true }, "Type " + _entities.Type.displayName.call(e.then_.type_) + " and " + _entities.Type.displayName.call(_else_.type_) + " is not compatible");
              __PUCK__value__69 = _entities.Type.empty();
            };
            __PUCK__value__68 = __PUCK__value__69;
          };
          __PUCK__value__66 = __PUCK__value__68;
        } else {
          __PUCK__value__66 = _entities.Type.empty();
        };
        e.type_ = __PUCK__value__66;
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
      var __PUCK__value__71 = (0, _patterns.declarePatternVariables)($unwrapTraitObject(self).scope, self, e.pattern, false, _ast.Expression.getType.call(e.expression), true);
      if ($unwrapTraitObject(__PUCK__value__71).kind == "Ok") {
        var _$unwrapTraitObject42 = $unwrapTraitObject(__PUCK__value__71),
            _$unwrapTraitObject43 = _slicedToArray(_$unwrapTraitObject42.value, 1),
            __PUCK__value__72 = _$unwrapTraitObject43[0];
      } else {
        if ($unwrapTraitObject(__PUCK__value__71).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__71).value)[0]).kind == "PatternMismatch") {
          var _$unwrapTraitObject44 = $unwrapTraitObject(__PUCK__value__71),
              _$unwrapTraitObject45 = _slicedToArray(_$unwrapTraitObject44.value, 1),
              _$unwrapTraitObject46 = _slicedToArray(_$unwrapTraitObject45[0].value, 3),
              pattern = _$unwrapTraitObject46[0],
              to = _$unwrapTraitObject46[1],
              subject = _$unwrapTraitObject46[2];

          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(to, subject));
        } else {
          if ($unwrapTraitObject(__PUCK__value__71).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__71).value)[0]).kind == "ScopeError") {
            var _$unwrapTraitObject47 = $unwrapTraitObject(__PUCK__value__71),
                _$unwrapTraitObject48 = _slicedToArray(_$unwrapTraitObject47.value, 1),
                _$unwrapTraitObject49 = _slicedToArray(_$unwrapTraitObject48[0].value, 2),
                token = _$unwrapTraitObject49[0],
                err = _$unwrapTraitObject49[1];

            reportError(token, err);
          } else {
            if ($unwrapTraitObject(__PUCK__value__71).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__71).value)[0]).kind == "NotExhaustive") {
              var _$unwrapTraitObject50 = $unwrapTraitObject(__PUCK__value__71),
                  _$unwrapTraitObject51 = _toArray(_$unwrapTraitObject50.value);
            };
          };
        };
      };
      var expressionScope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(self).scope = _scope.Scope.createChild.call(expressionScope);
      $unwrapTraitObject(self).visitBlock(e.then_, isUsed);
      var __PUCK__value__73 = e.else_;
      if (__PUCK__value__73.kind == "Some") {
        var _PUCK__value__73$val = _slicedToArray(__PUCK__value__73.value, 1),
            else_ = _PUCK__value__73$val[0];

        $unwrapTraitObject(self).scope = _scope.Scope.createChild.call(expressionScope);
        $unwrapTraitObject(self).visitBlock(else_, isUsed);
      };
      if (isUsed) {
        var __PUCK__value__74 = e.else_;
        var __PUCK__value__75 = void 0;
        if (__PUCK__value__74.kind == "Some") {
          var _PUCK__value__74$val = _slicedToArray(__PUCK__value__74.value, 1),
              _else_2 = _PUCK__value__74$val[0];

          var __PUCK__value__76 = (0, _types.findCommonType)([e.then_.type_, _else_2.type_]);
          var __PUCK__value__77 = void 0;
          if ($unwrapTraitObject(__PUCK__value__76).kind == "Ok") {
            var _$unwrapTraitObject52 = $unwrapTraitObject(__PUCK__value__76),
                _$unwrapTraitObject53 = _slicedToArray(_$unwrapTraitObject52.value, 1),
                type_ = _$unwrapTraitObject53[0];

            __PUCK__value__77 = type_;
          } else {
            var __PUCK__value__78 = void 0;
            if ($unwrapTraitObject(__PUCK__value__76).kind == "Err") {
              var _$unwrapTraitObject54 = $unwrapTraitObject(__PUCK__value__76),
                  _$unwrapTraitObject55 = _slicedToArray(_$unwrapTraitObject54.value, 1),
                  __PUCK__value__79 = _$unwrapTraitObject55[0];

              reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression', value: e, $isTraitObject: true }, "Type " + _entities.Type.displayName.call(e.then_.type_) + " and " + _entities.Type.displayName.call(_else_2.type_) + " is not compatible");
              __PUCK__value__78 = _entities.Type.empty();
            };
            __PUCK__value__77 = __PUCK__value__78;
          };
          __PUCK__value__75 = __PUCK__value__77;
        } else {
          __PUCK__value__75 = _entities.Type.empty();
        };
        e.type_ = __PUCK__value__75;
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
      var __PUCK__value__80 = (0, _enums.checkExhaustive)(e);
      if (__PUCK__value__80.kind == "Err") {
        var _PUCK__value__80$val = _slicedToArray(__PUCK__value__80.value, 1),
            error = _PUCK__value__80$val[0];

        reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true }, error);
      };
      if (isUsed) {
        var __PUCK__value__81 = void 0;
        if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isNotEmpty.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true })) {
          var __PUCK__value__83 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true }, function (arm) {
            return arm.type_;
          });
          var __PUCK__value__82 = (0, _types.findCommonType)(_core.Iterable[__PUCK__value__83.type].toList.call(__PUCK__value__83));
          var __PUCK__value__84 = void 0;
          if ($unwrapTraitObject(__PUCK__value__82).kind == "Ok") {
            var _$unwrapTraitObject56 = $unwrapTraitObject(__PUCK__value__82),
                _$unwrapTraitObject57 = _slicedToArray(_$unwrapTraitObject56.value, 1),
                type_ = _$unwrapTraitObject57[0];

            __PUCK__value__84 = type_;
          } else {
            var __PUCK__value__85 = void 0;
            if ($unwrapTraitObject(__PUCK__value__82).kind == "Err") {
              var _$unwrapTraitObject58 = $unwrapTraitObject(__PUCK__value__82),
                  _$unwrapTraitObject59 = _slicedToArray(_$unwrapTraitObject58.value, 1),
                  __PUCK__value__86 = _$unwrapTraitObject59[0];

              reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true }, "Match arms return mixed types " + _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true }, function (arm) {
                return _entities.Type.displayName.call(asType($unwrapTraitObject(arm.type_)));
              }).value.join(", "));
              __PUCK__value__85 = _entities.Type.empty();
            };
            __PUCK__value__84 = __PUCK__value__85;
          };
          __PUCK__value__81 = __PUCK__value__84;
        } else {
          __PUCK__value__81 = _entities.Type.empty();
        };
        e.type_ = __PUCK__value__81;
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
      var __PUCK__value__87 = (0, _patterns.declarePatternVariables)($unwrapTraitObject(self).scope, self, a.pattern, false, _ast.Expression.getType.call(m.expression), true);
      if ($unwrapTraitObject(__PUCK__value__87).kind == "Ok") {
        var _$unwrapTraitObject60 = $unwrapTraitObject(__PUCK__value__87),
            _$unwrapTraitObject61 = _slicedToArray(_$unwrapTraitObject60.value, 1),
            __PUCK__value__88 = _$unwrapTraitObject61[0];
      } else {
        if ($unwrapTraitObject(__PUCK__value__87).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__87).value)[0]).kind == "PatternMismatch") {
          var _$unwrapTraitObject62 = $unwrapTraitObject(__PUCK__value__87),
              _$unwrapTraitObject63 = _slicedToArray(_$unwrapTraitObject62.value, 1),
              _$unwrapTraitObject64 = _slicedToArray(_$unwrapTraitObject63[0].value, 3),
              pattern = _$unwrapTraitObject64[0],
              to = _$unwrapTraitObject64[1],
              subject = _$unwrapTraitObject64[2];

          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchArm', value: a, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(to, subject));
        } else {
          if ($unwrapTraitObject(__PUCK__value__87).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__87).value)[0]).kind == "ScopeError") {
            var _$unwrapTraitObject65 = $unwrapTraitObject(__PUCK__value__87),
                _$unwrapTraitObject66 = _slicedToArray(_$unwrapTraitObject65.value, 1),
                _$unwrapTraitObject67 = _slicedToArray(_$unwrapTraitObject66[0].value, 2),
                token = _$unwrapTraitObject67[0],
                err = _$unwrapTraitObject67[1];

            reportError(token, err);
          } else {
            if ($unwrapTraitObject(__PUCK__value__87).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__87).value)[0]).kind == "NotExhaustive") {
              var _$unwrapTraitObject68 = $unwrapTraitObject(__PUCK__value__87),
                  _$unwrapTraitObject69 = _toArray(_$unwrapTraitObject68.value);
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
      var __PUCK__value__89 = e.operator.kind;
      if ($unwrapTraitObject(__PUCK__value__89).kind == "NotKeyword") {
        var _undefined7 = $unwrapTraitObject(__PUCK__value__89);
        var __PUCK__value__90 = _scope.Scope.getBindingByTypeId.call(scope, "Bool");
        if (__PUCK__value__90.kind == "Some") {
          var _PUCK__value__90$val = _slicedToArray(__PUCK__value__90.value, 1),
              binding = _PUCK__value__90$val[0];

          e.type_ = _core.Option.unwrap.call(binding.type_.providesType);
        } else {
          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true }, "puck:core::Bool is not in scope. Please import Bool from puck:core to use boolean literals.");
        };
      } else {
        if ($unwrapTraitObject(__PUCK__value__89).kind == "MinusToken") {
          var _undefined8 = $unwrapTraitObject(__PUCK__value__89);
          var __PUCK__value__91 = _scope.Scope.getBindingByTypeId.call(scope, "Num");
          if (__PUCK__value__91.kind == "Some") {
            var _PUCK__value__91$val = _slicedToArray(__PUCK__value__91.value, 1),
                _binding2 = _PUCK__value__91$val[0];

            e.type_ = _core.Option.unwrap.call(_binding2.type_.providesType);
          } else {
            reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true }, "puck:core::Num is not in scope. Please import Num from puck:core to use number literals.");
          };
        } else {
          if ($unwrapTraitObject(__PUCK__value__89).kind == "PlusToken") {
            var _undefined9 = $unwrapTraitObject(__PUCK__value__89);
            var __PUCK__value__92 = _scope.Scope.getBindingByTypeId.call(scope, "Num");
            if (__PUCK__value__92.kind == "Some") {
              var _PUCK__value__92$val = _slicedToArray(__PUCK__value__92.value, 1),
                  _binding3 = _PUCK__value__92$val[0];

              e.type_ = _core.Option.unwrap.call(_binding3.type_.providesType);
            } else {
              reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true }, "puck:core::Num is not in scope. Please import Num from puck:core to use number literals.");
            };
          } else {
            if (true) {
              var __PUCK__value__93 = __PUCK__value__89;
            };
          };
        };
      };
      return [];
    },
    visitIndexAccess: function visitIndexAccess(a) {
      var self = this;
      var __PUCK__value__94 = getCoreType($unwrapTraitObject(self).scope, "Index", "index access");
      if ($unwrapTraitObject(__PUCK__value__94).kind == "Ok") {
        var _$unwrapTraitObject70 = $unwrapTraitObject(__PUCK__value__94),
            _$unwrapTraitObject71 = _slicedToArray(_$unwrapTraitObject70.value, 1),
            _$unwrapTraitObject72 = _slicedToArray(_$unwrapTraitObject71[0], 2),
            __PUCK__value__95 = _$unwrapTraitObject72[0],
            binding = _$unwrapTraitObject72[1];

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
        if ($unwrapTraitObject(__PUCK__value__94).kind == "Err") {
          var _$unwrapTraitObject73 = $unwrapTraitObject(__PUCK__value__94),
              _$unwrapTraitObject74 = _slicedToArray(_$unwrapTraitObject73.value, 1),
              err = _$unwrapTraitObject74[0];

          return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IndexAccess', value: a, $isTraitObject: true }, err);
        };
      };
    },
    visitMemberAccess: function visitMemberAccess(a) {
      var inCallExpression = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var self = this;
      visit.walkExpression(self, a.object);
      if (_ast.Expression.getType.call(a.object)) {
        var __PUCK__value__96 = _ast.Expression.getType.call(a.object).kind;
        if (__PUCK__value__96.kind == "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__96.value)[0]).kind).kind == "Record") {
          var _PUCK__value__96$val = _slicedToArray(__PUCK__value__96.value, 1),
              _PUCK__value__96$val$ = _slicedToArray(_PUCK__value__96$val[0].kind.value, 1),
              record = _PUCK__value__96$val$[0];

          var __PUCK__value__97 = _core.ObjectMap.get.call(record.properties, a.member.name);
          if (__PUCK__value__97.kind == "Some") {
            var _PUCK__value__97$val = _slicedToArray(__PUCK__value__97.value, 1),
                type_ = _PUCK__value__97$val[0];

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
      var __PUCK__value__98 = getCoreType($unwrapTraitObject(self).scope, "Unknown", "unknown access");
      if ($unwrapTraitObject(__PUCK__value__98).kind == "Ok") {
        var _$unwrapTraitObject75 = $unwrapTraitObject(__PUCK__value__98),
            _$unwrapTraitObject76 = _slicedToArray(_$unwrapTraitObject75.value, 1),
            _$unwrapTraitObject77 = _slicedToArray(_$unwrapTraitObject76[0], 2),
            type_ = _$unwrapTraitObject77[0],
            __PUCK__value__99 = _$unwrapTraitObject77[1];

        a.type_ = type_;
      } else {
        if ($unwrapTraitObject(__PUCK__value__98).kind == "Err") {
          var _$unwrapTraitObject78 = $unwrapTraitObject(__PUCK__value__98),
              _$unwrapTraitObject79 = _slicedToArray(_$unwrapTraitObject78.value, 1),
              err = _$unwrapTraitObject79[0];

          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownAccess', value: a, $isTraitObject: true }, err);
        };
      };
      return [];
    },
    visitUnknownIndexAccess: function visitUnknownIndexAccess(a) {
      var self = this;
      visit.walkUnknownIndexAccess(self, a);
      var __PUCK__value__100 = getCoreType($unwrapTraitObject(self).scope, "Unknown", "unknown access");
      if ($unwrapTraitObject(__PUCK__value__100).kind == "Ok") {
        var _$unwrapTraitObject80 = $unwrapTraitObject(__PUCK__value__100),
            _$unwrapTraitObject81 = _slicedToArray(_$unwrapTraitObject80.value, 1),
            _$unwrapTraitObject82 = _slicedToArray(_$unwrapTraitObject81[0], 2),
            type_ = _$unwrapTraitObject82[0],
            __PUCK__value__101 = _$unwrapTraitObject82[1];

        a.type_ = type_;
      } else {
        if ($unwrapTraitObject(__PUCK__value__100).kind == "Err") {
          var _$unwrapTraitObject83 = $unwrapTraitObject(__PUCK__value__100),
              _$unwrapTraitObject84 = _slicedToArray(_$unwrapTraitObject83.value, 1),
              err = _$unwrapTraitObject84[0];

          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownIndexAccess', value: a, $isTraitObject: true }, err);
        };
      };
      return [];
    },
    visitBooleanLiteral: function visitBooleanLiteral(l) {
      var self = this;
      var scope = $unwrapTraitObject(self).scope;
      l.scope = $unwrapTraitObject(self).scope;
      var __PUCK__value__102 = _scope.Scope.getBindingByTypeId.call(scope, "Bool");
      if (__PUCK__value__102.kind == "Some") {
        var _PUCK__value__102$va = _slicedToArray(__PUCK__value__102.value, 1),
            binding = _PUCK__value__102$va[0];

        l.type_ = _core.Option.unwrap.call(binding.type_.providesType);
      } else {
        reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BooleanLiteral', value: l, $isTraitObject: true }, "puck:core::Bool is not in scope. Please import Bool from puck:core to use boolean literals.");
      };
      return visit.walkBooleanLiteral(self, l);
    },
    visitListLiteral: function visitListLiteral(l) {
      var self = this;
      var scope = $unwrapTraitObject(self).scope;
      var __PUCK__value__103 = _scope.Scope.getBindingByTypeId.call(scope, "List");
      var __PUCK__value__104 = void 0;
      if (__PUCK__value__103.kind == "Some") {
        var _PUCK__value__103$va = _slicedToArray(__PUCK__value__103.value, 1),
            binding = _PUCK__value__103$va[0];

        __PUCK__value__104 = _core.Option.unwrap.call(binding.type_.providesType);
      } else {
        return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral', value: l, $isTraitObject: true }, "puck:core::List is not in scope. Please import List from puck:core to use list literals.");
      };
      var listType = __PUCK__value__104;
      l.scope = $unwrapTraitObject(self).scope;
      visit.walkListLiteral(self, l);
      if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true }) >= 1) {
        var __PUCK__value__105 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true }, function (m) {
          return _ast.Expression.getType.call(m);
        });
        var types = _core.Iterable[__PUCK__value__105.type].toList.call(__PUCK__value__105);
        var result = (0, _types.findCommonType)(types);
        var __PUCK__value__106 = result;
        if ($unwrapTraitObject(__PUCK__value__106).kind == "Ok") {
          var _$unwrapTraitObject85 = $unwrapTraitObject(__PUCK__value__106),
              _$unwrapTraitObject86 = _slicedToArray(_$unwrapTraitObject85.value, 1),
              type_ = _$unwrapTraitObject86[0];

          if (!type_) {
            l.type_ = listType;
          } else {
            l.type_ = (0, _types.createTypeInstance)(listType, [type_]);
          };
        } else {
          if ($unwrapTraitObject(__PUCK__value__106).kind == "Err") {
            var _$unwrapTraitObject87 = $unwrapTraitObject(__PUCK__value__106),
                _$unwrapTraitObject88 = _slicedToArray(_$unwrapTraitObject87.value, 1),
                __PUCK__value__107 = _$unwrapTraitObject88[0];

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
      var __PUCK__value__108 = _scope.Scope.getBindingByTypeId.call(scope, "Num");
      if (__PUCK__value__108.kind == "Some") {
        var _PUCK__value__108$va = _slicedToArray(__PUCK__value__108.value, 1),
            binding = _PUCK__value__108$va[0];

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
      var __PUCK__value__109 = _scope.Scope.getBindingByTypeId.call(scope, "String");
      if (__PUCK__value__109.kind == "Some") {
        var _PUCK__value__109$va = _slicedToArray(__PUCK__value__109.value, 1),
            binding = _PUCK__value__109$va[0];

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
      var __PUCK__value__110 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.expressions, $isTraitObject: true }, function (e) {
        return _ast.Expression.getType.call(e);
      });
      return l.type_ = (0, _entities.Type)({
        id: _core.None,
        displayName: _core.None,
        name: _core.None,
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: _entities.StructKind.Tuple({ properties: _core.Iterable[__PUCK__value__110.type].toList.call(__PUCK__value__110) })
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
      var __PUCK__value__111 = p;
      var __PUCK__value__112 = void 0;
      if ($unwrapTraitObject(__PUCK__value__111).kind == "CatchAll") {
        var _undefined10 = $unwrapTraitObject(__PUCK__value__111);
        __PUCK__value__112 = _entities.Type.unused();
      } else {
        var __PUCK__value__113 = void 0;
        if ($unwrapTraitObject(__PUCK__value__111).kind == "Identifier") {
          var _$unwrapTraitObject89 = $unwrapTraitObject(__PUCK__value__111),
              _$unwrapTraitObject90 = _slicedToArray(_$unwrapTraitObject89.value, 1),
              identifier = _$unwrapTraitObject90[0];

          __PUCK__value__113 = _js._undefined;
        } else {
          var __PUCK__value__114 = void 0;
          if ($unwrapTraitObject(__PUCK__value__111).kind == "Record") {
            var _$unwrapTraitObject91 = $unwrapTraitObject(__PUCK__value__111),
                _$unwrapTraitObject92 = _slicedToArray(_$unwrapTraitObject91.value, 1),
                record = _$unwrapTraitObject92[0];

            __PUCK__value__114 = record.type_;
          } else {
            var __PUCK__value__115 = void 0;
            if ($unwrapTraitObject(__PUCK__value__111).kind == "RecordType") {
              var _$unwrapTraitObject93 = $unwrapTraitObject(__PUCK__value__111),
                  _$unwrapTraitObject94 = _slicedToArray(_$unwrapTraitObject93.value, 2),
                  typePath = _$unwrapTraitObject94[0],
                  _record = _$unwrapTraitObject94[1];

              var type_ = $unwrapTraitObject(typePath.providesType);
              if (!(0, _types.isAssignable)($unwrapTraitObject(_record.type_), type_)) {
                reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p, $isTraitObject: true }, _entities.Type.displayName.call(type_) + " is not assignable to pattern " + _ast.RecordPattern.displayName.call(_record));
              };
              __PUCK__value__115 = _core.Option.mapOr.call(type_.enumMember, type_, function (_ref11) {
                var _ref12 = _slicedToArray(_ref11, 2),
                    __PUCK__value__116 = _ref12[0],
                    enum_ = _ref12[1];

                return enum_;
              });
            } else {
              var __PUCK__value__117 = void 0;
              if ($unwrapTraitObject(__PUCK__value__111).kind == "Tuple") {
                var _$unwrapTraitObject95 = $unwrapTraitObject(__PUCK__value__111),
                    _$unwrapTraitObject96 = _slicedToArray(_$unwrapTraitObject95.value, 1),
                    tuple = _$unwrapTraitObject96[0];

                __PUCK__value__117 = tuple.type_;
              } else {
                var __PUCK__value__118 = void 0;
                if ($unwrapTraitObject(__PUCK__value__111).kind == "TupleType") {
                  var _$unwrapTraitObject97 = $unwrapTraitObject(__PUCK__value__111),
                      _$unwrapTraitObject98 = _slicedToArray(_$unwrapTraitObject97.value, 2),
                      _typePath = _$unwrapTraitObject98[0],
                      _tuple = _$unwrapTraitObject98[1];

                  var _type_ = $unwrapTraitObject(_typePath.providesType);
                  if (!(0, _types.isAssignable)($unwrapTraitObject(_tuple.type_), _type_)) {
                    reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p, $isTraitObject: true }, _entities.Type.displayName.call(_type_) + " is not assignable to pattern " + _ast.TuplePattern.displayName.call(_tuple));
                  };
                  __PUCK__value__118 = _core.Option.mapOr.call(_type_.enumMember, _type_, function (_ref13) {
                    var _ref14 = _slicedToArray(_ref13, 2),
                        __PUCK__value__119 = _ref14[0],
                        enum_ = _ref14[1];

                    return enum_;
                  });
                } else {
                  var __PUCK__value__120 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__111).kind == "UnitType") {
                    var _$unwrapTraitObject99 = $unwrapTraitObject(__PUCK__value__111),
                        _$unwrapTraitObject100 = _slicedToArray(_$unwrapTraitObject99.value, 1),
                        _typePath2 = _$unwrapTraitObject100[0];

                    __PUCK__value__120 = _js._undefined;
                  };
                  __PUCK__value__118 = __PUCK__value__120;
                };
                __PUCK__value__117 = __PUCK__value__118;
              };
              __PUCK__value__115 = __PUCK__value__117;
            };
            __PUCK__value__114 = __PUCK__value__115;
          };
          __PUCK__value__113 = __PUCK__value__114;
        };
        __PUCK__value__112 = __PUCK__value__113;
      };
      return p.type_ = __PUCK__value__112;
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
      var __PUCK__value__121 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: p.properties, $isTraitObject: true }, function (p) {
        return p.type_;
      });
      return p.type_ = (0, _entities.Type)({
        id: _core.None,
        displayName: _core.None,
        name: _core.None,
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: _entities.StructKind.Tuple({ properties: _core.Iterable[__PUCK__value__121.type].toList.call(__PUCK__value__121) })
        }),
        instance: _core.None,
        _class: _core.None,
        providesType: _core.None,
        enumMember: _core.None
      });
    }
  });
}
