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

var _token = require('./../ast/token');

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
  return a;
};
function asIterable(a) {
  return { type: '$impl_lib/stdlib/core.puck:Iterable$List', value: a, $isTraitObject: true };
};
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
function getCoreType(scope, id, description) {
  var __PUCK__value__7 = _scope.Scope.getBindingByTypeId.call(scope, id);
  if ($unwrapTraitObject(__PUCK__value__7).kind == "Some") {
    var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__7),
        _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
        binding = _$unwrapTraitObject4$[0];

    return (0, _core.Ok)(_core.Option.unwrap.call(binding.type_.providesType));
  } else {
    return (0, _core.Err)("puck:core::" + id + " is not in scope. Please import " + id + " from puck:core to use " + description + ".");
  };
};
function ScopeVisitor(context, file) {
  var importDirective = void 0;
  var matchExpression = _core.None;
  var reportError = $unwrapTraitObject($unwrapTraitObject(context).reportError).bind(context, file);
  function checkFunctionCall(functionType, c) {
    if (!functionType) {
      return _js._undefined;
    };
    var __PUCK__value__8 = c.func;
    var __PUCK__value__9 = __PUCK__value__8;
    var __PUCK__value__10 = void 0;
    if ($unwrapTraitObject(__PUCK__value__9).kind == "Identifier") {
      var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__9),
          _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
          i = _$unwrapTraitObject5$[0];

      __PUCK__value__10 = (0, _core.Some)(i.name);
    } else {
      var __PUCK__value__11 = __PUCK__value__8;
      var __PUCK__value__12 = void 0;
      if (true) {
        var __PUCK__value__13 = __PUCK__value__11;
        __PUCK__value__12 = _core.None;
      };
      __PUCK__value__10 = __PUCK__value__12;
    };
    var namei = __PUCK__value__10;
    var name = _core.Option.unwrapOrElse.call(namei, function () {
      return _entities.Type.displayName.call(functionType);
    });
    var __PUCK__value__14 = functionType.kind;
    var __PUCK__value__15 = __PUCK__value__14;
    var __PUCK__value__16 = void 0;
    if ($unwrapTraitObject(__PUCK__value__15).kind == "Function") {
      var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__15),
          _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
          func = _$unwrapTraitObject6$[0];

      __PUCK__value__16 = func;
    } else {
      var __PUCK__value__17 = __PUCK__value__14;
      var __PUCK__value__18 = void 0;
      if (true) {
        var __PUCK__value__19 = __PUCK__value__17;
        reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: c, $isTraitObject: true }, "" + name + " is not callable");
        return _js._undefined;
      };
      __PUCK__value__16 = __PUCK__value__18;
    };
    var _function = __PUCK__value__16;
    var __PUCK__value__20 = _function.selfBinding;
    if ($unwrapTraitObject(__PUCK__value__20).kind == "Some") {
      var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__20),
          _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
          selfBinding = _$unwrapTraitObject7$[0];

      if (selfBinding.mutable) {
        if (!_core.Option.mapOr.call(getBinding(c.func), true, function (binding) {
          return binding.mutable;
        })) {
          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: c, $isTraitObject: true }, "" + name + " can only be called on a mutable binding");
        };
      };
    };
    var __PUCK__value__21 = (0, _range.checkRange)(c.argumentList, _function.parameterRange, "arguments", name);
    if ($unwrapTraitObject(__PUCK__value__21).kind == "Err") {
      var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__21),
          _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
          error = _$unwrapTraitObject8$[0];

      reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: c, $isTraitObject: true }, error);
      return _function;
    };
    var __PUCK__value__22 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: c.argumentList, $isTraitObject: true });
    _core.Iterable[__PUCK__value__22.type].forEach.call(__PUCK__value__22, function (_ref) {
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
        var __PUCK__value__23 = getBinding(argument);
        if ($unwrapTraitObject(__PUCK__value__23).kind == "Some") {
          var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__23),
              _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
              argumentBinding = _$unwrapTraitObject9$[0];

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
        var __PUCK__value__24 = s;
        var __PUCK__value__25 = __PUCK__value__24;
        if ($unwrapTraitObject(__PUCK__value__25).kind == "ExportDirective" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__25).value)[$unwrapTraitObject(0)]).statement).kind == "FunctionDeclaration") {
          var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__25),
              _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
              _$unwrapTraitObject12 = _slicedToArray(_$unwrapTraitObject11[0].statement.value, 1),
              f = _$unwrapTraitObject12[0];

          return $unwrapTraitObject(self).visitFunctionDeclaration(f, true);
        } else {
          var __PUCK__value__26 = __PUCK__value__24;
          if ($unwrapTraitObject(__PUCK__value__26).kind == "BlockLevelStatement" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__26).value)[$unwrapTraitObject(0)]).kind == "Expression" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__26).value)[$unwrapTraitObject(0)]).value)[$unwrapTraitObject(0)]).kind == "FunctionDeclaration") {
            var _$unwrapTraitObject13 = $unwrapTraitObject(__PUCK__value__26),
                _$unwrapTraitObject14 = _slicedToArray(_$unwrapTraitObject13.value, 1),
                _$unwrapTraitObject15 = _slicedToArray(_$unwrapTraitObject14[0].value, 1),
                _$unwrapTraitObject16 = _slicedToArray(_$unwrapTraitObject15[0].value, 1),
                _f = _$unwrapTraitObject16[0];

            return $unwrapTraitObject(self).visitFunctionDeclaration(_f, true);
          } else {
            var __PUCK__value__27 = __PUCK__value__24;
            if (true) {
              var __PUCK__value__28 = __PUCK__value__27;;
              var __PUCK__value__29 = __PUCK__value__28;;
              return __PUCK__value__28;
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
        var __PUCK__value__30 = s;
        var __PUCK__value__31 = __PUCK__value__30;
        if ($unwrapTraitObject(__PUCK__value__31).kind == "Expression" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__31).value)[$unwrapTraitObject(0)]).kind == "FunctionDeclaration") {
          var _$unwrapTraitObject17 = $unwrapTraitObject(__PUCK__value__31),
              _$unwrapTraitObject18 = _slicedToArray(_$unwrapTraitObject17.value, 1),
              _$unwrapTraitObject19 = _slicedToArray(_$unwrapTraitObject18[0].value, 1),
              f = _$unwrapTraitObject19[0];

          return $unwrapTraitObject(self).visitFunctionDeclaration(f, true);
        } else {
          var __PUCK__value__32 = __PUCK__value__30;
          if (true) {
            var __PUCK__value__33 = __PUCK__value__32;;
            var __PUCK__value__34 = __PUCK__value__33;;
            return __PUCK__value__33;
          };
        };
      });
      var lastIndex = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true }) - 1;
      var __PUCK__value__35 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true });
      _core.Iterable[__PUCK__value__35.type].forEach.call(__PUCK__value__35, function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            s = _ref4[0],
            index = _ref4[1];

        $unwrapTraitObject(self).isUsed = isUsed && index == lastIndex;
        return $unwrapTraitObject(self).visitBlockLevelStatement(s);
      });
      var __PUCK__value__36 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].last.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true });
      var __PUCK__value__37 = void 0;
      if ($unwrapTraitObject(__PUCK__value__36).kind == "Some") {
        var _$unwrapTraitObject20 = $unwrapTraitObject(__PUCK__value__36),
            _$unwrapTraitObject21 = _slicedToArray(_$unwrapTraitObject20.value, 1),
            last = _$unwrapTraitObject21[0];

        __PUCK__value__37 = _ast.BlockLevelStatement.getType.call(last);
      } else {
        __PUCK__value__37 = _entities.Type.empty();
      };
      return b.type_ = __PUCK__value__37;
    },
    visitBreak: function visitBreak(b) {
      var self = this;
      return b.scope = $unwrapTraitObject(self).scope;
    },
    visitReturn: function visitReturn(r) {
      var self = this;
      visit.walkReturn(self, r);
      var __PUCK__value__38 = $unwrapTraitObject($unwrapTraitObject(self).functionContext).returnType;
      if ($unwrapTraitObject(__PUCK__value__38).kind == "Some") {
        var _$unwrapTraitObject22 = $unwrapTraitObject(__PUCK__value__38),
            _$unwrapTraitObject23 = _slicedToArray(_$unwrapTraitObject22.value, 1),
            returnType = _$unwrapTraitObject23[0];

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
      var __PUCK__value__39 = _scope.Scope.getBinding.call(scope, i.name);
      if ($unwrapTraitObject(__PUCK__value__39).kind == "Some") {
        var _$unwrapTraitObject24 = $unwrapTraitObject(__PUCK__value__39),
            _$unwrapTraitObject25 = _slicedToArray(_$unwrapTraitObject24.value, 1),
            binding = _$unwrapTraitObject25[0];

        var b = binding;
        i.binding = binding;
        var __PUCK__value__40 = void 0;
        if (binding.type_ && _core.Option.isSome.call(binding.type_.providesType)) {
          __PUCK__value__40 = (0, _type_function.enumMemberToFunction)(b.type_);
        } else {
          __PUCK__value__40 = binding.type_;
        };
        i.type_ = __PUCK__value__40;
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
        var __PUCK__value__41 = f.body;
        if ($unwrapTraitObject(__PUCK__value__41).kind == "Some") {
          var _$unwrapTraitObject26 = $unwrapTraitObject(__PUCK__value__41),
              _$unwrapTraitObject27 = _slicedToArray(_$unwrapTraitObject26.value, 1),
              body = _$unwrapTraitObject27[0];

          var parentAssignedTo = $unwrapTraitObject(self).assignedTo;
          var parentContext = $unwrapTraitObject(self).functionContext;
          var isUsed = true;
          $unwrapTraitObject(self).functionContext = {
            returnType: _core.None,
            returnTypes: []
          };
          var __PUCK__value__42 = f.type_.kind;
          if ($unwrapTraitObject(__PUCK__value__42).kind == "Function") {
            var _$unwrapTraitObject28 = $unwrapTraitObject(__PUCK__value__42),
                _$unwrapTraitObject29 = _slicedToArray(_$unwrapTraitObject28.value, 1),
                func = _$unwrapTraitObject29[0];

            $unwrapTraitObject(self).assignedTo = func.returnType;
            if (func.returnType) {
              $unwrapTraitObject($unwrapTraitObject(self).functionContext).returnType = (0, _core.Some)(func.returnType);
              if (_entities.Type.isEmpty.call(func.returnType)) {
                isUsed = false;
              };
            };
          };
          $unwrapTraitObject(self).visitBlock(body, isUsed);
          var __PUCK__value__43 = $unwrapTraitObject(self).functionContext;
          if ($unwrapTraitObject(__PUCK__value__43).kind == "None") {
            var _undefined2 = $unwrapTraitObject(__PUCK__value__43);
          };
          var __PUCK__value__44 = f.type_.kind;
          if ($unwrapTraitObject(__PUCK__value__44).kind == "Function") {
            var _$unwrapTraitObject30 = $unwrapTraitObject(__PUCK__value__44),
                _$unwrapTraitObject31 = _slicedToArray(_$unwrapTraitObject30.value, 1),
                _func = _$unwrapTraitObject31[0];

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
                var __PUCK__value__45 = (0, _types.findCommonType)(types);
                var __PUCK__value__46 = __PUCK__value__45;
                if ($unwrapTraitObject(__PUCK__value__46).kind == "Ok") {
                  var _$unwrapTraitObject32 = $unwrapTraitObject(__PUCK__value__46),
                      _$unwrapTraitObject33 = _slicedToArray(_$unwrapTraitObject32.value, 1),
                      type_ = _$unwrapTraitObject33[0];

                  $unwrapTraitObject(_js._Object).assign(_func, { returnType: body.type_ });
                } else {
                  var __PUCK__value__47 = __PUCK__value__45;
                  if ($unwrapTraitObject(__PUCK__value__47).kind == "Err") {
                    var _$unwrapTraitObject34 = $unwrapTraitObject(__PUCK__value__47),
                        _$unwrapTraitObject35 = _slicedToArray(_$unwrapTraitObject34.value, 1),
                        __PUCK__value__48 = _$unwrapTraitObject35[0];

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
      var __PUCK__value__49 = void 0;
      if (visitInitializer) {
        __PUCK__value__49 = visitInitializer;
      } else {
        __PUCK__value__49 = function __PUCK__value__49(e) {
          var parentAssignedTo = $unwrapTraitObject(self).assignedTo;
          $unwrapTraitObject(self).assignedTo = d.type_;
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
        var _$unwrapTraitObject36 = $unwrapTraitObject(__PUCK__value__50),
            _$unwrapTraitObject37 = _slicedToArray(_$unwrapTraitObject36.value, 1),
            binding = _$unwrapTraitObject37[0];

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
      var isUnknownCall = false;
      var skipFirstArgument = false;
      var __PUCK__value__51 = e.func;
      if ($unwrapTraitObject(__PUCK__value__51).kind == "MemberAccess") {
        var _$unwrapTraitObject38 = $unwrapTraitObject(__PUCK__value__51),
            _$unwrapTraitObject39 = _slicedToArray(_$unwrapTraitObject38.value, 1),
            access = _$unwrapTraitObject39[0];

        if (_ast.Expression.getType.call(access.object)) {
          (function () {
            var name = access.member.name;
            var objectType = _ast.Expression.getType.call(access.object);
            var __PUCK__value__52 = objectType.providesType;
            if ($unwrapTraitObject(__PUCK__value__52).kind == "Some") {
              var _$unwrapTraitObject40 = $unwrapTraitObject(__PUCK__value__52),
                  _$unwrapTraitObject41 = _slicedToArray(_$unwrapTraitObject40.value, 1),
                  providesType = _$unwrapTraitObject41[0];

              var __PUCK__value__53 = providesType.kind;
              var __PUCK__value__54 = __PUCK__value__53;
              if ($unwrapTraitObject(__PUCK__value__54).kind == "Enum") {
                var _$unwrapTraitObject42 = $unwrapTraitObject(__PUCK__value__54),
                    _$unwrapTraitObject43 = _slicedToArray(_$unwrapTraitObject42.value, 1),
                    enum_ = _$unwrapTraitObject43[0];

                functionType = $unwrapTraitObject(_core.Option.unwrapOr.call(_core.Option.map.call(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: enum_.implementations, $isTraitObject: true }, function (_ref5) {
                  var trait_ = _ref5.trait_;

                  return _entities.Type.getTrait.call(trait_).isShorthand;
                }), function (_ref6) {
                  var trait_ = _ref6.trait_;

                  return _entities.Type.getTrait.call(trait_).functions[name];
                }), _js._undefined));
              } else {
                var __PUCK__value__55 = __PUCK__value__53;
                if ($unwrapTraitObject(__PUCK__value__55).kind == "Struct") {
                  var _$unwrapTraitObject44 = $unwrapTraitObject(__PUCK__value__55),
                      _$unwrapTraitObject45 = _slicedToArray(_$unwrapTraitObject44.value, 1),
                      struct = _$unwrapTraitObject45[0];

                  functionType = $unwrapTraitObject(_core.Option.unwrapOr.call(_core.Option.map.call(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: struct.implementations, $isTraitObject: true }, function (_ref7) {
                    var trait_ = _ref7.trait_;

                    return _entities.Type.getTrait.call(trait_).isShorthand;
                  }), function (_ref8) {
                    var trait_ = _ref8.trait_;

                    return _entities.Type.getTrait.call(trait_).functions[name];
                  }), _js._undefined));
                } else {
                  var __PUCK__value__56 = __PUCK__value__53;
                  if ($unwrapTraitObject(__PUCK__value__56).kind == "Trait") {
                    var _$unwrapTraitObject46 = $unwrapTraitObject(__PUCK__value__56),
                        _$unwrapTraitObject47 = _slicedToArray(_$unwrapTraitObject46.value, 1),
                        trait_ = _$unwrapTraitObject47[0];

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
                var __PUCK__value__59 = _function.selfBinding;
                if ($unwrapTraitObject(__PUCK__value__59).kind == "Some") {
                  var _$unwrapTraitObject48 = $unwrapTraitObject(__PUCK__value__59),
                      _$unwrapTraitObject49 = _slicedToArray(_$unwrapTraitObject48.value, 1),
                      selfBinding = _$unwrapTraitObject49[0];

                  functionType = {
                    id: functionType.id,
                    displayName: functionType.displayName,
                    name: functionType.name,
                    kind: _entities.TypeKind.Function({
                      selfBinding: _core.None,
                      parameters: [selfBinding].concat(_function.parameters),
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
                    enumMember: functionType.enumMember,
                    complete: functionType.complete
                  };
                  var __PUCK__value__60 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true });
                  if ($unwrapTraitObject(__PUCK__value__60).kind == "Some") {
                    var _$unwrapTraitObject50 = $unwrapTraitObject(__PUCK__value__60),
                        _$unwrapTraitObject51 = _slicedToArray(_$unwrapTraitObject50.value, 1),
                        selfArgument = _$unwrapTraitObject51[0];

                    skipFirstArgument = true;
                    $unwrapTraitObject(self).visitExpression(selfArgument);
                    if (!_ast.Expression.getType.call(selfArgument)) {
                      reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: selfArgument, $isTraitObject: true }, "selfArgument has no type");
                    };
                    var __PUCK__value__61 = (0, _impls.getImplementationForTrait)(_ast.Expression.getType.call(selfArgument), _core.Option.unwrapOr.call(objectType.providesType, objectType));
                    var __PUCK__value__62 = __PUCK__value__61;
                    if ($unwrapTraitObject(__PUCK__value__62).kind == "Ok" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__62).value)[$unwrapTraitObject(0)]).kind == "Some") {
                      var _$unwrapTraitObject52 = $unwrapTraitObject(__PUCK__value__62),
                          _$unwrapTraitObject53 = _slicedToArray(_$unwrapTraitObject52.value, 1),
                          _$unwrapTraitObject54 = _slicedToArray(_$unwrapTraitObject53[0].value, 1),
                          implementation = _$unwrapTraitObject54[0];

                      e.traitName = _core.Option.unwrap.call(_scope.Scope.getBindingByTypeId.call(scope, _core.Option.unwrap.call(providesType.id))).name;
                      e.isDirectTraitCall = true;
                      e.implementation = implementation;
                    } else {
                      var __PUCK__value__63 = __PUCK__value__61;
                      if ($unwrapTraitObject(__PUCK__value__63).kind == "Ok" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__63).value)[$unwrapTraitObject(0)]).kind == "None") {
                        var _$unwrapTraitObject55 = $unwrapTraitObject(__PUCK__value__63),
                            _$unwrapTraitObject56 = _toArray(_$unwrapTraitObject55.value);

                        reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true }, _entities.Type.displayName.call(objectType) + " has not been implemented for type " + _entities.Type.displayName.call(_ast.Expression.getType.call(selfArgument)));
                      } else {
                        var __PUCK__value__64 = __PUCK__value__61;
                        if (true) {
                          var _Err = __PUCK__value__64;
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
              var __PUCK__value__65 = objectType.kind;
              if ($unwrapTraitObject(__PUCK__value__65).kind == "Trait") {
                var _$unwrapTraitObject57 = $unwrapTraitObject(__PUCK__value__65),
                    _$unwrapTraitObject58 = _slicedToArray(_$unwrapTraitObject57.value, 1),
                    _trait_ = _$unwrapTraitObject58[0];

                functionType = _trait_.functions[name];
                if (functionType) {
                  var _function2 = _entities.Type.getFunction.call(functionType);
                  if (_core.Option.isSome.call(_function2.selfBinding)) {
                    var __PUCK__value__66 = _scope.Scope.getBindingByTypeId.call(scope, _core.Option.unwrap.call(objectType.id));
                    if ($unwrapTraitObject(__PUCK__value__66).kind == "Some") {
                      var _$unwrapTraitObject59 = $unwrapTraitObject(__PUCK__value__66),
                          _$unwrapTraitObject60 = _slicedToArray(_$unwrapTraitObject59.value, 1),
                          binding = _$unwrapTraitObject60[0];

                      e.traitName = binding.name;
                      e.isTraitObject = true;
                    } else {
                      var typeName = _core.Option.unwrap.call(objectType.name);
                      reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true }, "The function " + name + " is defined in trait " + typeName + " but it is not in scope");
                    };
                  };
                };
              } else {
                var __PUCK__value__67 = (0, _impls.getImplementation)(name, objectType, e);
                var __PUCK__value__68 = __PUCK__value__67;
                if ($unwrapTraitObject(__PUCK__value__68).kind == "Ok" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__68).value)[$unwrapTraitObject(0)]).kind == "Some") {
                  var _$unwrapTraitObject61 = $unwrapTraitObject(__PUCK__value__68),
                      _$unwrapTraitObject62 = _slicedToArray(_$unwrapTraitObject61.value, 1),
                      _$unwrapTraitObject63 = _slicedToArray(_$unwrapTraitObject62[0].value, 1),
                      _implementation = _$unwrapTraitObject63[0];

                  var __PUCK__value__69 = _implementation.trait_.instance;
                  var __PUCK__value__70 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__69).kind == "Some") {
                    var _$unwrapTraitObject64 = $unwrapTraitObject(__PUCK__value__69),
                        _$unwrapTraitObject65 = _slicedToArray(_$unwrapTraitObject64.value, 1),
                        instance = _$unwrapTraitObject65[0];

                    __PUCK__value__70 = instance._class;
                  } else {
                    __PUCK__value__70 = _implementation.trait_;
                  };
                  var _trait_2 = __PUCK__value__70;
                  var __PUCK__value__71 = _scope.Scope.getBindingByTypeId.call(scope, _core.Option.unwrap.call(_trait_2.id));
                  if ($unwrapTraitObject(__PUCK__value__71).kind == "Some") {
                    var _$unwrapTraitObject66 = $unwrapTraitObject(__PUCK__value__71),
                        _$unwrapTraitObject67 = _slicedToArray(_$unwrapTraitObject66.value, 1),
                        _binding = _$unwrapTraitObject67[0];

                    e.traitName = _binding.name;
                    e.isShorthand = _entities.Type.getTrait.call(_trait_2).isShorthand;
                    e.implementation = _implementation;
                    functionType = _entities.Type.getTrait.call(asType(_implementation.trait_)).functions[name];
                  } else {
                    var traitName = _core.Option.unwrap.call(_trait_2.name);
                    var id = _core.Option.unwrap.call(_trait_2.id);
                    reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true }, "The function " + name + " is defined in trait " + traitName + " but it is not in scope");
                  };
                } else {
                  var __PUCK__value__72 = __PUCK__value__67;
                  if ($unwrapTraitObject(__PUCK__value__72).kind == "Ok") {
                    var _$unwrapTraitObject68 = $unwrapTraitObject(__PUCK__value__72),
                        _$unwrapTraitObject69 = _slicedToArray(_$unwrapTraitObject68.value, 1),
                        _None = _$unwrapTraitObject69[0];
                  } else {
                    var __PUCK__value__73 = __PUCK__value__67;
                    if (true) {
                      var _Err2 = __PUCK__value__73;
                      reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true }, "Ambiguous trait call");
                    };
                  };
                };
              };
              if (e.traitName) {
                var __PUCK__value__74 = objectType.instance;
                if ($unwrapTraitObject(__PUCK__value__74).kind == "Some") {
                  var _$unwrapTraitObject70 = $unwrapTraitObject(__PUCK__value__74),
                      _$unwrapTraitObject71 = _slicedToArray(_$unwrapTraitObject70.value, 1),
                      _instance = _$unwrapTraitObject71[0];

                  functionType = (0, _types.resolveTypeParameters)(_instance.parameterMap)(functionType);
                };
              };
            };
          })();
        };
      } else {
        var __PUCK__value__75 = e.func;
        if ($unwrapTraitObject(__PUCK__value__75).kind == "UnknownAccess") {
          var _$unwrapTraitObject72 = $unwrapTraitObject(__PUCK__value__75),
              _$unwrapTraitObject73 = _slicedToArray(_$unwrapTraitObject72.value, 1),
              __PUCK__value__76 = _$unwrapTraitObject73[0];

          isUnknownCall = true;
        } else {
          var __PUCK__value__77 = e.func;
          if ($unwrapTraitObject(__PUCK__value__77).kind == "UnknownIndexAccess") {
            var _$unwrapTraitObject74 = $unwrapTraitObject(__PUCK__value__77),
                _$unwrapTraitObject75 = _slicedToArray(_$unwrapTraitObject74.value, 1),
                __PUCK__value__78 = _$unwrapTraitObject75[0];

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
          var __PUCK__value__80 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true });
          var __PUCK__value__79 = _core.Iterable[__PUCK__value__80.type].take.call(__PUCK__value__80, _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: functionKind.parameters, $isTraitObject: true }));
          _core.Iterable[__PUCK__value__79.type].forEach.call(__PUCK__value__79, function (_ref9) {
            var _ref10 = _slicedToArray(_ref9, 2),
                a = _ref10[0],
                i = _ref10[1];

            var parameter = functionKind.parameters[i];
            $unwrapTraitObject(self).assignedTo = $unwrapTraitObject(parameter).type_;
            if (!skipFirstArgument || i > 0) {
              $unwrapTraitObject(self).visitExpression(a);
            };
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
      var __PUCK__value__81 = e.else_;
      if ($unwrapTraitObject(__PUCK__value__81).kind == "Some") {
        var _$unwrapTraitObject76 = $unwrapTraitObject(__PUCK__value__81),
            _$unwrapTraitObject77 = _slicedToArray(_$unwrapTraitObject76.value, 1),
            else_ = _$unwrapTraitObject77[0];

        $unwrapTraitObject(self).scope = _scope.Scope.createChild.call(parentScope);
        $unwrapTraitObject(self).visitBlock(else_, isUsed);
      };
      if (isUsed) {
        var __PUCK__value__82 = e.else_;
        var __PUCK__value__83 = void 0;
        if ($unwrapTraitObject(__PUCK__value__82).kind == "Some") {
          var _$unwrapTraitObject78 = $unwrapTraitObject(__PUCK__value__82),
              _$unwrapTraitObject79 = _slicedToArray(_$unwrapTraitObject78.value, 1),
              _else_ = _$unwrapTraitObject79[0];

          var __PUCK__value__84 = (0, _types.findCommonType)([e.then_.type_, _else_.type_]);
          var __PUCK__value__85 = __PUCK__value__84;
          var __PUCK__value__86 = void 0;
          if ($unwrapTraitObject(__PUCK__value__85).kind == "Ok") {
            var _$unwrapTraitObject80 = $unwrapTraitObject(__PUCK__value__85),
                _$unwrapTraitObject81 = _slicedToArray(_$unwrapTraitObject80.value, 1),
                type_ = _$unwrapTraitObject81[0];

            __PUCK__value__86 = type_;
          } else {
            var __PUCK__value__87 = __PUCK__value__84;
            var __PUCK__value__88 = void 0;
            if ($unwrapTraitObject(__PUCK__value__87).kind == "Err") {
              var _$unwrapTraitObject82 = $unwrapTraitObject(__PUCK__value__87),
                  _$unwrapTraitObject83 = _slicedToArray(_$unwrapTraitObject82.value, 1),
                  __PUCK__value__89 = _$unwrapTraitObject83[0];

              reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression', value: e, $isTraitObject: true }, "Type " + _entities.Type.displayName.call(e.then_.type_) + " and " + _entities.Type.displayName.call(asType(_else_.type_)) + " is not compatible");
              __PUCK__value__88 = _entities.Type.empty();
            };
            __PUCK__value__86 = __PUCK__value__88;
          };
          __PUCK__value__83 = __PUCK__value__86;
        } else {
          __PUCK__value__83 = _entities.Type.empty();
        };
        e.type_ = __PUCK__value__83;
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
      var __PUCK__value__90 = (0, _patterns.declarePatternVariables)($unwrapTraitObject(self).scope, self, e.pattern, false, _ast.Expression.getType.call(e.expression), true);
      var __PUCK__value__91 = __PUCK__value__90;
      if ($unwrapTraitObject(__PUCK__value__91).kind == "Ok") {
        var _$unwrapTraitObject84 = $unwrapTraitObject(__PUCK__value__91),
            _$unwrapTraitObject85 = _slicedToArray(_$unwrapTraitObject84.value, 1),
            __PUCK__value__92 = _$unwrapTraitObject85[0];
      } else {
        var __PUCK__value__93 = __PUCK__value__90;
        if ($unwrapTraitObject(__PUCK__value__93).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__93).value)[$unwrapTraitObject(0)]).kind == "PatternMismatch") {
          var _$unwrapTraitObject86 = $unwrapTraitObject(__PUCK__value__93),
              _$unwrapTraitObject87 = _slicedToArray(_$unwrapTraitObject86.value, 1),
              _$unwrapTraitObject88 = _slicedToArray(_$unwrapTraitObject87[0].value, 3),
              pattern = _$unwrapTraitObject88[0],
              to = _$unwrapTraitObject88[1],
              subject = _$unwrapTraitObject88[2];

          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(to, subject));
        } else {
          var __PUCK__value__94 = __PUCK__value__90;
          if ($unwrapTraitObject(__PUCK__value__94).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__94).value)[$unwrapTraitObject(0)]).kind == "ScopeError") {
            var _$unwrapTraitObject89 = $unwrapTraitObject(__PUCK__value__94),
                _$unwrapTraitObject90 = _slicedToArray(_$unwrapTraitObject89.value, 1),
                _$unwrapTraitObject91 = _slicedToArray(_$unwrapTraitObject90[0].value, 2),
                token = _$unwrapTraitObject91[0],
                err = _$unwrapTraitObject91[1];

            reportError(token, err);
          } else {
            var __PUCK__value__95 = __PUCK__value__90;
            if ($unwrapTraitObject(__PUCK__value__95).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__95).value)[$unwrapTraitObject(0)]).kind == "NotExhaustive") {
              var _$unwrapTraitObject92 = $unwrapTraitObject(__PUCK__value__95),
                  _$unwrapTraitObject93 = _toArray(_$unwrapTraitObject92.value);
            };
          };
        };
      };
      var expressionScope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(self).scope = _scope.Scope.createChild.call(expressionScope);
      $unwrapTraitObject(self).visitBlock(e.then_, isUsed);
      var __PUCK__value__96 = e.else_;
      if ($unwrapTraitObject(__PUCK__value__96).kind == "Some") {
        var _$unwrapTraitObject94 = $unwrapTraitObject(__PUCK__value__96),
            _$unwrapTraitObject95 = _slicedToArray(_$unwrapTraitObject94.value, 1),
            else_ = _$unwrapTraitObject95[0];

        $unwrapTraitObject(self).scope = _scope.Scope.createChild.call(expressionScope);
        $unwrapTraitObject(self).visitBlock(else_, isUsed);
      };
      if (isUsed) {
        var __PUCK__value__97 = e.else_;
        var __PUCK__value__98 = void 0;
        if ($unwrapTraitObject(__PUCK__value__97).kind == "Some") {
          var _$unwrapTraitObject96 = $unwrapTraitObject(__PUCK__value__97),
              _$unwrapTraitObject97 = _slicedToArray(_$unwrapTraitObject96.value, 1),
              _else_2 = _$unwrapTraitObject97[0];

          var __PUCK__value__99 = (0, _types.findCommonType)([e.then_.type_, _else_2.type_]);
          var __PUCK__value__100 = __PUCK__value__99;
          var __PUCK__value__101 = void 0;
          if ($unwrapTraitObject(__PUCK__value__100).kind == "Ok") {
            var _$unwrapTraitObject98 = $unwrapTraitObject(__PUCK__value__100),
                _$unwrapTraitObject99 = _slicedToArray(_$unwrapTraitObject98.value, 1),
                type_ = _$unwrapTraitObject99[0];

            __PUCK__value__101 = type_;
          } else {
            var __PUCK__value__102 = __PUCK__value__99;
            var __PUCK__value__103 = void 0;
            if ($unwrapTraitObject(__PUCK__value__102).kind == "Err") {
              var _$unwrapTraitObject100 = $unwrapTraitObject(__PUCK__value__102),
                  _$unwrapTraitObject101 = _slicedToArray(_$unwrapTraitObject100.value, 1),
                  __PUCK__value__104 = _$unwrapTraitObject101[0];

              reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression', value: e, $isTraitObject: true }, "Type " + _entities.Type.displayName.call(e.then_.type_) + " and " + _entities.Type.displayName.call(asType(_else_2.type_)) + " is not compatible");
              __PUCK__value__103 = _entities.Type.empty();
            };
            __PUCK__value__101 = __PUCK__value__103;
          };
          __PUCK__value__98 = __PUCK__value__101;
        } else {
          __PUCK__value__98 = _entities.Type.empty();
        };
        e.type_ = __PUCK__value__98;
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
      var __PUCK__value__105 = (0, _enums.checkExhaustive)(e);
      if ($unwrapTraitObject(__PUCK__value__105).kind == "Err") {
        var _$unwrapTraitObject102 = $unwrapTraitObject(__PUCK__value__105),
            _$unwrapTraitObject103 = _slicedToArray(_$unwrapTraitObject102.value, 1),
            error = _$unwrapTraitObject103[0];

        reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true }, error);
      };
      if (isUsed) {
        var __PUCK__value__106 = void 0;
        if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isNotEmpty.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true })) {
          var __PUCK__value__108 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true }, function (arm) {
            return arm.type_;
          });
          var __PUCK__value__107 = (0, _types.findCommonType)(_core.Iterable[__PUCK__value__108.type].toList.call(__PUCK__value__108));
          var __PUCK__value__109 = __PUCK__value__107;
          var __PUCK__value__110 = void 0;
          if ($unwrapTraitObject(__PUCK__value__109).kind == "Ok") {
            var _$unwrapTraitObject104 = $unwrapTraitObject(__PUCK__value__109),
                _$unwrapTraitObject105 = _slicedToArray(_$unwrapTraitObject104.value, 1),
                type_ = _$unwrapTraitObject105[0];

            __PUCK__value__110 = type_;
          } else {
            var __PUCK__value__111 = __PUCK__value__107;
            var __PUCK__value__112 = void 0;
            if ($unwrapTraitObject(__PUCK__value__111).kind == "Err") {
              var _$unwrapTraitObject106 = $unwrapTraitObject(__PUCK__value__111),
                  _$unwrapTraitObject107 = _slicedToArray(_$unwrapTraitObject106.value, 1),
                  __PUCK__value__113 = _$unwrapTraitObject107[0];

              reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true }, "Match arms return mixed types " + _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true }, function (arm) {
                return _entities.Type.displayName.call(asType(arm.type_));
              }).value.join(", "));
              __PUCK__value__112 = _entities.Type.empty();
            };
            __PUCK__value__110 = __PUCK__value__112;
          };
          __PUCK__value__106 = __PUCK__value__110;
        } else {
          __PUCK__value__106 = _entities.Type.empty();
        };
        e.type_ = __PUCK__value__106;
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
      var __PUCK__value__114 = (0, _patterns.declarePatternVariables)(a.scope, self, a.pattern, false, _ast.Expression.getType.call(m.expression), true);
      var __PUCK__value__115 = __PUCK__value__114;
      if ($unwrapTraitObject(__PUCK__value__115).kind == "Ok") {
        var _$unwrapTraitObject108 = $unwrapTraitObject(__PUCK__value__115),
            _$unwrapTraitObject109 = _slicedToArray(_$unwrapTraitObject108.value, 1),
            __PUCK__value__116 = _$unwrapTraitObject109[0];
      } else {
        var __PUCK__value__117 = __PUCK__value__114;
        if ($unwrapTraitObject(__PUCK__value__117).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__117).value)[$unwrapTraitObject(0)]).kind == "PatternMismatch") {
          var _$unwrapTraitObject110 = $unwrapTraitObject(__PUCK__value__117),
              _$unwrapTraitObject111 = _slicedToArray(_$unwrapTraitObject110.value, 1),
              _$unwrapTraitObject112 = _slicedToArray(_$unwrapTraitObject111[0].value, 3),
              pattern = _$unwrapTraitObject112[0],
              to = _$unwrapTraitObject112[1],
              subject = _$unwrapTraitObject112[2];

          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchArm', value: a, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(to, subject));
        } else {
          var __PUCK__value__118 = __PUCK__value__114;
          if ($unwrapTraitObject(__PUCK__value__118).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__118).value)[$unwrapTraitObject(0)]).kind == "ScopeError") {
            var _$unwrapTraitObject113 = $unwrapTraitObject(__PUCK__value__118),
                _$unwrapTraitObject114 = _slicedToArray(_$unwrapTraitObject113.value, 1),
                _$unwrapTraitObject115 = _slicedToArray(_$unwrapTraitObject114[0].value, 2),
                token = _$unwrapTraitObject115[0],
                err = _$unwrapTraitObject115[1];

            reportError(token, err);
          } else {
            var __PUCK__value__119 = __PUCK__value__114;
            if ($unwrapTraitObject(__PUCK__value__119).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__119).value)[$unwrapTraitObject(0)]).kind == "NotExhaustive") {
              var _$unwrapTraitObject116 = $unwrapTraitObject(__PUCK__value__119),
                  _$unwrapTraitObject117 = _toArray(_$unwrapTraitObject116.value);
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
      var __PUCK__value__120 = e.operator.kind;
      var __PUCK__value__121 = __PUCK__value__120;
      if ($unwrapTraitObject(__PUCK__value__121).kind == "NotKeyword") {
        var _undefined3 = $unwrapTraitObject(__PUCK__value__121);
        var __PUCK__value__122 = _scope.Scope.getBindingByTypeId.call(scope, "Bool");
        if ($unwrapTraitObject(__PUCK__value__122).kind == "Some") {
          var _$unwrapTraitObject118 = $unwrapTraitObject(__PUCK__value__122),
              _$unwrapTraitObject119 = _slicedToArray(_$unwrapTraitObject118.value, 1),
              binding = _$unwrapTraitObject119[0];

          e.type_ = _core.Option.unwrap.call(binding.type_.providesType);
        } else {
          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true }, "puck:core::Bool is not in scope. Please import Bool from puck:core to use boolean literals.");
        };
      } else {
        var __PUCK__value__123 = __PUCK__value__120;
        if ($unwrapTraitObject(__PUCK__value__123).kind == "MinusToken") {
          var _undefined4 = $unwrapTraitObject(__PUCK__value__123);
          var __PUCK__value__124 = _scope.Scope.getBindingByTypeId.call(scope, "Num");
          if ($unwrapTraitObject(__PUCK__value__124).kind == "Some") {
            var _$unwrapTraitObject120 = $unwrapTraitObject(__PUCK__value__124),
                _$unwrapTraitObject121 = _slicedToArray(_$unwrapTraitObject120.value, 1),
                _binding2 = _$unwrapTraitObject121[0];

            e.type_ = _core.Option.unwrap.call(_binding2.type_.providesType);
          } else {
            reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true }, "puck:core::Num is not in scope. Please import Num from puck:core to use number literals.");
          };
        } else {
          var __PUCK__value__125 = __PUCK__value__120;
          if ($unwrapTraitObject(__PUCK__value__125).kind == "PlusToken") {
            var _undefined5 = $unwrapTraitObject(__PUCK__value__125);
            var __PUCK__value__126 = _scope.Scope.getBindingByTypeId.call(scope, "Num");
            if ($unwrapTraitObject(__PUCK__value__126).kind == "Some") {
              var _$unwrapTraitObject122 = $unwrapTraitObject(__PUCK__value__126),
                  _$unwrapTraitObject123 = _slicedToArray(_$unwrapTraitObject122.value, 1),
                  _binding3 = _$unwrapTraitObject123[0];

              e.type_ = _core.Option.unwrap.call(_binding3.type_.providesType);
            } else {
              reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true }, "puck:core::Num is not in scope. Please import Num from puck:core to use number literals.");
            };
          } else {
            var __PUCK__value__127 = __PUCK__value__120;
            if (true) {
              var __PUCK__value__128 = __PUCK__value__127;
            };
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
        var __PUCK__value__129 = _ast.Expression.getType.call(a.object).kind;
        if ($unwrapTraitObject(__PUCK__value__129).kind == "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__129).value)[$unwrapTraitObject(0)]).kind).kind == "Record") {
          var _$unwrapTraitObject124 = $unwrapTraitObject(__PUCK__value__129),
              _$unwrapTraitObject125 = _slicedToArray(_$unwrapTraitObject124.value, 1),
              _$unwrapTraitObject126 = _slicedToArray(_$unwrapTraitObject125[0].kind.value, 1),
              record = _$unwrapTraitObject126[0];

          return a.type_ = record.properties[a.member.name];
        } else {};
      };
    },
    visitUnknownAccess: function visitUnknownAccess(a) {
      var self = this;
      visit.walkExpression(self, a.object);
      var __PUCK__value__130 = getCoreType($unwrapTraitObject(self).scope, "Unknown", "unknown access");
      var __PUCK__value__131 = __PUCK__value__130;
      if ($unwrapTraitObject(__PUCK__value__131).kind == "Ok") {
        var _$unwrapTraitObject127 = $unwrapTraitObject(__PUCK__value__131),
            _$unwrapTraitObject128 = _slicedToArray(_$unwrapTraitObject127.value, 1),
            type_ = _$unwrapTraitObject128[0];

        a.type_ = type_;
      } else {
        var __PUCK__value__132 = __PUCK__value__130;
        if ($unwrapTraitObject(__PUCK__value__132).kind == "Err") {
          var _$unwrapTraitObject129 = $unwrapTraitObject(__PUCK__value__132),
              _$unwrapTraitObject130 = _slicedToArray(_$unwrapTraitObject129.value, 1),
              err = _$unwrapTraitObject130[0];

          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownAccess', value: a, $isTraitObject: true }, err);
        };
      };
      return [];
    },
    visitUnknownIndexAccess: function visitUnknownIndexAccess(a) {
      var self = this;
      visit.walkUnknownIndexAccess(self, a);
      var __PUCK__value__133 = getCoreType($unwrapTraitObject(self).scope, "Unknown", "unknown access");
      var __PUCK__value__134 = __PUCK__value__133;
      if ($unwrapTraitObject(__PUCK__value__134).kind == "Ok") {
        var _$unwrapTraitObject131 = $unwrapTraitObject(__PUCK__value__134),
            _$unwrapTraitObject132 = _slicedToArray(_$unwrapTraitObject131.value, 1),
            type_ = _$unwrapTraitObject132[0];

        a.type_ = type_;
      } else {
        var __PUCK__value__135 = __PUCK__value__133;
        if ($unwrapTraitObject(__PUCK__value__135).kind == "Err") {
          var _$unwrapTraitObject133 = $unwrapTraitObject(__PUCK__value__135),
              _$unwrapTraitObject134 = _slicedToArray(_$unwrapTraitObject133.value, 1),
              err = _$unwrapTraitObject134[0];

          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownIndexAccess', value: a, $isTraitObject: true }, err);
        };
      };
      return [];
    },
    visitBooleanLiteral: function visitBooleanLiteral(l) {
      var self = this;
      var scope = $unwrapTraitObject(self).scope;
      l.scope = $unwrapTraitObject(self).scope;
      var __PUCK__value__136 = _scope.Scope.getBindingByTypeId.call(scope, "Bool");
      if ($unwrapTraitObject(__PUCK__value__136).kind == "Some") {
        var _$unwrapTraitObject135 = $unwrapTraitObject(__PUCK__value__136),
            _$unwrapTraitObject136 = _slicedToArray(_$unwrapTraitObject135.value, 1),
            binding = _$unwrapTraitObject136[0];

        l.type_ = _core.Option.unwrap.call(binding.type_.providesType);
      } else {
        reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BooleanLiteral', value: l, $isTraitObject: true }, "puck:core::Bool is not in scope. Please import Bool from puck:core to use boolean literals.");
      };
      return visit.walkBooleanLiteral(self, l);
    },
    visitListLiteral: function visitListLiteral(l) {
      var self = this;
      var scope = $unwrapTraitObject(self).scope;
      var __PUCK__value__137 = _scope.Scope.getBindingByTypeId.call(scope, "List");
      var __PUCK__value__138 = void 0;
      if ($unwrapTraitObject(__PUCK__value__137).kind == "Some") {
        var _$unwrapTraitObject137 = $unwrapTraitObject(__PUCK__value__137),
            _$unwrapTraitObject138 = _slicedToArray(_$unwrapTraitObject137.value, 1),
            binding = _$unwrapTraitObject138[0];

        __PUCK__value__138 = _core.Option.unwrap.call(binding.type_.providesType);
      } else {
        return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral', value: l, $isTraitObject: true }, "puck:core::List is not in scope. Please import List from puck:core to use list literals.");
      };
      var listType = __PUCK__value__138;
      l.scope = $unwrapTraitObject(self).scope;
      visit.walkListLiteral(self, l);
      if (l.members.length >= 1) {
        var __PUCK__value__139 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true }, function (m) {
          return _ast.Expression.getType.call(m);
        });
        var types = _core.Iterable[__PUCK__value__139.type].toList.call(__PUCK__value__139);
        var result = (0, _types.findCommonType)(types);
        var __PUCK__value__140 = result;
        var __PUCK__value__141 = __PUCK__value__140;
        if ($unwrapTraitObject(__PUCK__value__141).kind == "Ok") {
          var _$unwrapTraitObject139 = $unwrapTraitObject(__PUCK__value__141),
              _$unwrapTraitObject140 = _slicedToArray(_$unwrapTraitObject139.value, 1),
              type_ = _$unwrapTraitObject140[0];

          if (!type_) {
            l.type_ = listType;
          } else {
            l.type_ = (0, _types.createTypeInstance)(listType, asIterable([type_]));
          };
        } else {
          var __PUCK__value__142 = __PUCK__value__140;
          if ($unwrapTraitObject(__PUCK__value__142).kind == "Err") {
            var _$unwrapTraitObject141 = $unwrapTraitObject(__PUCK__value__142),
                _$unwrapTraitObject142 = _slicedToArray(_$unwrapTraitObject141.value, 1),
                __PUCK__value__143 = _$unwrapTraitObject142[0];

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
      var __PUCK__value__144 = _scope.Scope.getBindingByTypeId.call(scope, "Num");
      if ($unwrapTraitObject(__PUCK__value__144).kind == "Some") {
        var _$unwrapTraitObject143 = $unwrapTraitObject(__PUCK__value__144),
            _$unwrapTraitObject144 = _slicedToArray(_$unwrapTraitObject143.value, 1),
            binding = _$unwrapTraitObject144[0];

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
        enumMember: _core.None,
        complete: true
      });
    },
    visitStringLiteral: function visitStringLiteral(l) {
      var self = this;
      var scope = $unwrapTraitObject(self).scope;
      l.scope = $unwrapTraitObject(self).scope;
      var __PUCK__value__145 = _scope.Scope.getBindingByTypeId.call(scope, "String");
      if ($unwrapTraitObject(__PUCK__value__145).kind == "Some") {
        var _$unwrapTraitObject145 = $unwrapTraitObject(__PUCK__value__145),
            _$unwrapTraitObject146 = _slicedToArray(_$unwrapTraitObject145.value, 1),
            binding = _$unwrapTraitObject146[0];

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
      var __PUCK__value__146 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.expressions, $isTraitObject: true }, function (e) {
        return _ast.Expression.getType.call(e);
      });
      return l.type_ = (0, _entities.Type)({
        id: _core.None,
        displayName: _core.None,
        name: _core.None,
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: _entities.StructKind.Tuple({ properties: _core.Iterable[__PUCK__value__146.type].toList.call(__PUCK__value__146) })
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
      var __PUCK__value__147 = p;
      var __PUCK__value__148 = __PUCK__value__147;
      var __PUCK__value__149 = void 0;
      if ($unwrapTraitObject(__PUCK__value__148).kind == "CatchAll") {
        var _undefined6 = $unwrapTraitObject(__PUCK__value__148);
        __PUCK__value__149 = _entities.Type.unused();
      } else {
        var __PUCK__value__150 = __PUCK__value__147;
        var __PUCK__value__151 = void 0;
        if ($unwrapTraitObject(__PUCK__value__150).kind == "Identifier") {
          var _$unwrapTraitObject147 = $unwrapTraitObject(__PUCK__value__150),
              _$unwrapTraitObject148 = _slicedToArray(_$unwrapTraitObject147.value, 1),
              identifier = _$unwrapTraitObject148[0];

          __PUCK__value__151 = _js._undefined;
        } else {
          var __PUCK__value__152 = __PUCK__value__147;
          var __PUCK__value__153 = void 0;
          if ($unwrapTraitObject(__PUCK__value__152).kind == "Record") {
            var _$unwrapTraitObject149 = $unwrapTraitObject(__PUCK__value__152),
                _$unwrapTraitObject150 = _slicedToArray(_$unwrapTraitObject149.value, 1),
                record = _$unwrapTraitObject150[0];

            __PUCK__value__153 = record.type_;
          } else {
            var __PUCK__value__154 = __PUCK__value__147;
            var __PUCK__value__155 = void 0;
            if ($unwrapTraitObject(__PUCK__value__154).kind == "RecordType") {
              var _$unwrapTraitObject151 = $unwrapTraitObject(__PUCK__value__154),
                  _$unwrapTraitObject152 = _slicedToArray(_$unwrapTraitObject151.value, 2),
                  typePath = _$unwrapTraitObject152[0],
                  _record = _$unwrapTraitObject152[1];

              var type_ = typePath.providesType;
              if (!(0, _types.isAssignable)(_record.type_, type_)) {
                reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p, $isTraitObject: true }, _entities.Type.displayName.call(type_) + " is not assignable to pattern " + _ast.RecordPattern.displayName.call(_record));
              };
              __PUCK__value__155 = _core.Option.mapOr.call(type_.enumMember, type_, function (_ref11) {
                var _ref12 = _slicedToArray(_ref11, 2),
                    __PUCK__value__156 = _ref12[0],
                    enum_ = _ref12[1];

                return enum_;
              });
            } else {
              var __PUCK__value__157 = __PUCK__value__147;
              var __PUCK__value__158 = void 0;
              if ($unwrapTraitObject(__PUCK__value__157).kind == "Tuple") {
                var _$unwrapTraitObject153 = $unwrapTraitObject(__PUCK__value__157),
                    _$unwrapTraitObject154 = _slicedToArray(_$unwrapTraitObject153.value, 1),
                    tuple = _$unwrapTraitObject154[0];

                __PUCK__value__158 = tuple.type_;
              } else {
                var __PUCK__value__159 = __PUCK__value__147;
                var __PUCK__value__160 = void 0;
                if ($unwrapTraitObject(__PUCK__value__159).kind == "TupleType") {
                  var _$unwrapTraitObject155 = $unwrapTraitObject(__PUCK__value__159),
                      _$unwrapTraitObject156 = _slicedToArray(_$unwrapTraitObject155.value, 2),
                      _typePath = _$unwrapTraitObject156[0],
                      _tuple = _$unwrapTraitObject156[1];

                  var _type_ = _typePath.providesType;
                  if (!(0, _types.isAssignable)(_tuple.type_, _type_)) {
                    reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p, $isTraitObject: true }, _entities.Type.displayName.call(_type_) + " is not assignable to pattern " + _ast.TuplePattern.displayName.call(_tuple));
                  };
                  __PUCK__value__160 = _core.Option.mapOr.call(_type_.enumMember, _type_, function (_ref13) {
                    var _ref14 = _slicedToArray(_ref13, 2),
                        __PUCK__value__161 = _ref14[0],
                        enum_ = _ref14[1];

                    return enum_;
                  });
                } else {
                  var __PUCK__value__162 = __PUCK__value__147;
                  var __PUCK__value__163 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__162).kind == "UnitType") {
                    var _$unwrapTraitObject157 = $unwrapTraitObject(__PUCK__value__162),
                        _$unwrapTraitObject158 = _slicedToArray(_$unwrapTraitObject157.value, 1),
                        _typePath2 = _$unwrapTraitObject158[0];

                    __PUCK__value__163 = _js._undefined;
                  };
                  __PUCK__value__160 = __PUCK__value__163;
                };
                __PUCK__value__158 = __PUCK__value__160;
              };
              __PUCK__value__155 = __PUCK__value__158;
            };
            __PUCK__value__153 = __PUCK__value__155;
          };
          __PUCK__value__151 = __PUCK__value__153;
        };
        __PUCK__value__149 = __PUCK__value__151;
      };
      return p.type_ = __PUCK__value__149;
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
      var __PUCK__value__164 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: p.properties, $isTraitObject: true }, function (p) {
        return p.type_;
      });
      return p.type_ = (0, _entities.Type)({
        id: _core.None,
        displayName: _core.None,
        name: _core.None,
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: _entities.StructKind.Tuple({ properties: _core.Iterable[__PUCK__value__164.type].toList.call(__PUCK__value__164) })
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
