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

    return (0, _core.Ok)([_core.Option.unwrap.call(binding.type_.providesType), binding]);
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
      var __PUCK__value__50 = e.lhs;
      if ($unwrapTraitObject(__PUCK__value__50).kind == "IndexAccess") {
        var _$unwrapTraitObject36 = $unwrapTraitObject(__PUCK__value__50),
            _$unwrapTraitObject37 = _slicedToArray(_$unwrapTraitObject36.value, 1),
            a = _$unwrapTraitObject37[0];

        visit.walkIndexAccess(self, a);
        visit.walkExpression(self, e.rhs);
      } else {
        visit.walkAssignmentExpression(self, e);
      };
      var __PUCK__value__51 = getBinding(e.lhs);
      if ($unwrapTraitObject(__PUCK__value__51).kind == "Some") {
        var _$unwrapTraitObject38 = $unwrapTraitObject(__PUCK__value__51),
            _$unwrapTraitObject39 = _slicedToArray(_$unwrapTraitObject38.value, 1),
            binding = _$unwrapTraitObject39[0];

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
      var __PUCK__value__52 = e.func;
      if ($unwrapTraitObject(__PUCK__value__52).kind == "MemberAccess") {
        var _$unwrapTraitObject40 = $unwrapTraitObject(__PUCK__value__52),
            _$unwrapTraitObject41 = _slicedToArray(_$unwrapTraitObject40.value, 1),
            access = _$unwrapTraitObject41[0];

        if (_ast.Expression.getType.call(access.object)) {
          (function () {
            var name = access.member.name;
            var objectType = _ast.Expression.getType.call(access.object);
            var __PUCK__value__53 = objectType.providesType;
            if ($unwrapTraitObject(__PUCK__value__53).kind == "Some") {
              var _$unwrapTraitObject42 = $unwrapTraitObject(__PUCK__value__53),
                  _$unwrapTraitObject43 = _slicedToArray(_$unwrapTraitObject42.value, 1),
                  providesType = _$unwrapTraitObject43[0];

              var __PUCK__value__54 = providesType.kind;
              var __PUCK__value__55 = __PUCK__value__54;
              if ($unwrapTraitObject(__PUCK__value__55).kind == "Enum") {
                var _$unwrapTraitObject44 = $unwrapTraitObject(__PUCK__value__55),
                    _$unwrapTraitObject45 = _slicedToArray(_$unwrapTraitObject44.value, 1),
                    enum_ = _$unwrapTraitObject45[0];

                functionType = _core.Option.unwrapOr.call(_core.Option.andThen.call(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: enum_.implementations, $isTraitObject: true }, function (_ref5) {
                  var trait_ = _ref5.trait_;

                  return _entities.Type.getTrait.call(trait_).isShorthand;
                }), function (_ref6) {
                  var trait_ = _ref6.trait_;

                  return _core.ObjectMap.get.call(_entities.Type.getTrait.call(trait_).functions, name);
                }), _js._undefined);
              } else {
                var __PUCK__value__56 = __PUCK__value__54;
                if ($unwrapTraitObject(__PUCK__value__56).kind == "Struct") {
                  var _$unwrapTraitObject46 = $unwrapTraitObject(__PUCK__value__56),
                      _$unwrapTraitObject47 = _slicedToArray(_$unwrapTraitObject46.value, 1),
                      struct = _$unwrapTraitObject47[0];

                  functionType = _core.Option.unwrapOr.call(_core.Option.andThen.call(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: struct.implementations, $isTraitObject: true }, function (_ref7) {
                    var trait_ = _ref7.trait_;

                    return _entities.Type.getTrait.call(trait_).isShorthand;
                  }), function (_ref8) {
                    var trait_ = _ref8.trait_;

                    return _core.ObjectMap.get.call(_entities.Type.getTrait.call(trait_).functions, name);
                  }), _js._undefined);
                } else {
                  var __PUCK__value__57 = __PUCK__value__54;
                  if ($unwrapTraitObject(__PUCK__value__57).kind == "Trait") {
                    var _$unwrapTraitObject48 = $unwrapTraitObject(__PUCK__value__57),
                        _$unwrapTraitObject49 = _slicedToArray(_$unwrapTraitObject48.value, 1),
                        trait_ = _$unwrapTraitObject49[0];

                    functionType = _core.Option.unwrapOr.call(_core.ObjectMap.get.call(trait_.functions, name), _js._undefined);
                  } else {
                    var __PUCK__value__58 = __PUCK__value__54;
                    if (true) {
                      var __PUCK__value__59 = __PUCK__value__58;
                    };
                  };
                };
              };
              if (functionType) {
                var _function = _entities.Type.getFunction.call(functionType);
                var __PUCK__value__60 = _function.selfBinding;
                if ($unwrapTraitObject(__PUCK__value__60).kind == "Some") {
                  var _$unwrapTraitObject50 = $unwrapTraitObject(__PUCK__value__60),
                      _$unwrapTraitObject51 = _slicedToArray(_$unwrapTraitObject50.value, 1),
                      selfBinding = _$unwrapTraitObject51[0];

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
                  var __PUCK__value__61 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true });
                  if ($unwrapTraitObject(__PUCK__value__61).kind == "Some") {
                    var _$unwrapTraitObject52 = $unwrapTraitObject(__PUCK__value__61),
                        _$unwrapTraitObject53 = _slicedToArray(_$unwrapTraitObject52.value, 1),
                        selfArgument = _$unwrapTraitObject53[0];

                    skipFirstArgument = true;
                    $unwrapTraitObject(self).visitExpression(selfArgument);
                    if (!_ast.Expression.getType.call(selfArgument)) {
                      reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: selfArgument, $isTraitObject: true }, "selfArgument has no type");
                    };
                    var __PUCK__value__62 = (0, _impls.getImplementationForTrait)(_ast.Expression.getType.call(selfArgument), _core.Option.unwrapOr.call(objectType.providesType, objectType));
                    var __PUCK__value__63 = __PUCK__value__62;
                    if ($unwrapTraitObject(__PUCK__value__63).kind == "Ok" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__63).value)[$unwrapTraitObject(0)]).kind == "Some") {
                      var _$unwrapTraitObject54 = $unwrapTraitObject(__PUCK__value__63),
                          _$unwrapTraitObject55 = _slicedToArray(_$unwrapTraitObject54.value, 1),
                          _$unwrapTraitObject56 = _slicedToArray(_$unwrapTraitObject55[0].value, 1),
                          implementation = _$unwrapTraitObject56[0];

                      e.traitName = _core.Option.unwrap.call(_scope.Scope.getBindingByTypeId.call(scope, _core.Option.unwrap.call(providesType.id))).name;
                      e.isDirectTraitCall = true;
                      e.implementation = implementation;
                    } else {
                      var __PUCK__value__64 = __PUCK__value__62;
                      if ($unwrapTraitObject(__PUCK__value__64).kind == "Ok" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__64).value)[$unwrapTraitObject(0)]).kind == "None") {
                        var _$unwrapTraitObject57 = $unwrapTraitObject(__PUCK__value__64),
                            _$unwrapTraitObject58 = _toArray(_$unwrapTraitObject57.value);

                        reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true }, _entities.Type.displayName.call(objectType) + " has not been implemented for type " + _entities.Type.displayName.call(_ast.Expression.getType.call(selfArgument)));
                      } else {
                        var __PUCK__value__65 = __PUCK__value__62;
                        if (true) {
                          var _Err = __PUCK__value__65;
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
              var __PUCK__value__66 = objectType.kind;
              if ($unwrapTraitObject(__PUCK__value__66).kind == "Trait") {
                var _$unwrapTraitObject59 = $unwrapTraitObject(__PUCK__value__66),
                    _$unwrapTraitObject60 = _slicedToArray(_$unwrapTraitObject59.value, 1),
                    _trait_ = _$unwrapTraitObject60[0];

                var __PUCK__value__67 = _core.ObjectMap.get.call(_trait_.functions, name);
                if ($unwrapTraitObject(__PUCK__value__67).kind == "Some") {
                  var _$unwrapTraitObject61 = $unwrapTraitObject(__PUCK__value__67),
                      _$unwrapTraitObject62 = _slicedToArray(_$unwrapTraitObject61.value, 1),
                      func = _$unwrapTraitObject62[0];

                  functionType = func;
                  var _function2 = _entities.Type.getFunction.call(functionType);
                  if (_core.Option.isSome.call(_function2.selfBinding)) {
                    var __PUCK__value__68 = _scope.Scope.getBindingByTypeId.call(scope, _core.Option.unwrap.call(objectType.id));
                    if ($unwrapTraitObject(__PUCK__value__68).kind == "Some") {
                      var _$unwrapTraitObject63 = $unwrapTraitObject(__PUCK__value__68),
                          _$unwrapTraitObject64 = _slicedToArray(_$unwrapTraitObject63.value, 1),
                          binding = _$unwrapTraitObject64[0];

                      e.traitName = binding.name;
                      e.isTraitObject = true;
                    } else {
                      var typeName = _core.Option.unwrap.call(objectType.name);
                      reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true }, "The function " + name + " is defined in trait " + typeName + " but it is not in scope");
                    };
                  };
                };
              } else {
                var __PUCK__value__69 = (0, _impls.getImplementation)(name, objectType, e);
                var __PUCK__value__70 = __PUCK__value__69;
                if ($unwrapTraitObject(__PUCK__value__70).kind == "Ok" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__70).value)[$unwrapTraitObject(0)]).kind == "Some") {
                  var _$unwrapTraitObject65 = $unwrapTraitObject(__PUCK__value__70),
                      _$unwrapTraitObject66 = _slicedToArray(_$unwrapTraitObject65.value, 1),
                      _$unwrapTraitObject67 = _slicedToArray(_$unwrapTraitObject66[0].value, 1),
                      _implementation = _$unwrapTraitObject67[0];

                  var __PUCK__value__71 = _implementation.trait_.instance;
                  var __PUCK__value__72 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__71).kind == "Some") {
                    var _$unwrapTraitObject68 = $unwrapTraitObject(__PUCK__value__71),
                        _$unwrapTraitObject69 = _slicedToArray(_$unwrapTraitObject68.value, 1),
                        instance = _$unwrapTraitObject69[0];

                    __PUCK__value__72 = instance._class;
                  } else {
                    __PUCK__value__72 = _implementation.trait_;
                  };
                  var _trait_2 = __PUCK__value__72;
                  var __PUCK__value__73 = _scope.Scope.getBindingByTypeId.call(scope, _core.Option.unwrap.call(_trait_2.id));
                  if ($unwrapTraitObject(__PUCK__value__73).kind == "Some") {
                    var _$unwrapTraitObject70 = $unwrapTraitObject(__PUCK__value__73),
                        _$unwrapTraitObject71 = _slicedToArray(_$unwrapTraitObject70.value, 1),
                        _binding = _$unwrapTraitObject71[0];

                    e.traitName = _binding.name;
                    e.isShorthand = _entities.Type.getTrait.call(_trait_2).isShorthand;
                    e.implementation = _implementation;
                    functionType = $unwrapTraitObject(_core.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({ type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: _entities.Type.getTrait.call(asType(_implementation.trait_)).functions, $isTraitObject: true }, name));
                  } else {
                    var traitName = _core.Option.unwrap.call(_trait_2.name);
                    var id = _core.Option.unwrap.call(_trait_2.id);
                    reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true }, "The function " + name + " is defined in trait " + traitName + " but it is not in scope");
                  };
                } else {
                  var __PUCK__value__74 = __PUCK__value__69;
                  if ($unwrapTraitObject(__PUCK__value__74).kind == "Ok") {
                    var _$unwrapTraitObject72 = $unwrapTraitObject(__PUCK__value__74),
                        _$unwrapTraitObject73 = _slicedToArray(_$unwrapTraitObject72.value, 1),
                        _None = _$unwrapTraitObject73[0];
                  } else {
                    var __PUCK__value__75 = __PUCK__value__69;
                    if (true) {
                      var _Err2 = __PUCK__value__75;
                      reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true }, "Ambiguous trait call");
                    };
                  };
                };
              };
              if (e.traitName) {
                var __PUCK__value__76 = objectType.instance;
                if ($unwrapTraitObject(__PUCK__value__76).kind == "Some") {
                  var _$unwrapTraitObject74 = $unwrapTraitObject(__PUCK__value__76),
                      _$unwrapTraitObject75 = _slicedToArray(_$unwrapTraitObject74.value, 1),
                      _instance = _$unwrapTraitObject75[0];

                  functionType = (0, _types.resolveTypeParameters)(_instance.parameterMap)(functionType);
                };
              };
            };
          })();
        };
      } else {
        var __PUCK__value__77 = e.func;
        if ($unwrapTraitObject(__PUCK__value__77).kind == "UnknownAccess") {
          var _$unwrapTraitObject76 = $unwrapTraitObject(__PUCK__value__77),
              _$unwrapTraitObject77 = _slicedToArray(_$unwrapTraitObject76.value, 1),
              __PUCK__value__78 = _$unwrapTraitObject77[0];

          isUnknownCall = true;
        } else {
          var __PUCK__value__79 = e.func;
          if ($unwrapTraitObject(__PUCK__value__79).kind == "UnknownIndexAccess") {
            var _$unwrapTraitObject78 = $unwrapTraitObject(__PUCK__value__79),
                _$unwrapTraitObject79 = _slicedToArray(_$unwrapTraitObject78.value, 1),
                __PUCK__value__80 = _$unwrapTraitObject79[0];

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
          var __PUCK__value__82 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true });
          var __PUCK__value__81 = _core.Iterable[__PUCK__value__82.type].take.call(__PUCK__value__82, _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: functionKind.parameters, $isTraitObject: true }));
          _core.Iterable[__PUCK__value__81.type].forEach.call(__PUCK__value__81, function (_ref9) {
            var _ref10 = _slicedToArray(_ref9, 2),
                a = _ref10[0],
                i = _ref10[1];

            var parameter = $unwrapTraitObject(_core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: functionKind.parameters, $isTraitObject: true }, i));
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
      var __PUCK__value__83 = e.else_;
      if ($unwrapTraitObject(__PUCK__value__83).kind == "Some") {
        var _$unwrapTraitObject80 = $unwrapTraitObject(__PUCK__value__83),
            _$unwrapTraitObject81 = _slicedToArray(_$unwrapTraitObject80.value, 1),
            else_ = _$unwrapTraitObject81[0];

        $unwrapTraitObject(self).scope = _scope.Scope.createChild.call(parentScope);
        $unwrapTraitObject(self).visitBlock(else_, isUsed);
      };
      if (isUsed) {
        var __PUCK__value__84 = e.else_;
        var __PUCK__value__85 = void 0;
        if ($unwrapTraitObject(__PUCK__value__84).kind == "Some") {
          var _$unwrapTraitObject82 = $unwrapTraitObject(__PUCK__value__84),
              _$unwrapTraitObject83 = _slicedToArray(_$unwrapTraitObject82.value, 1),
              _else_ = _$unwrapTraitObject83[0];

          var __PUCK__value__86 = (0, _types.findCommonType)([e.then_.type_, _else_.type_]);
          var __PUCK__value__87 = __PUCK__value__86;
          var __PUCK__value__88 = void 0;
          if ($unwrapTraitObject(__PUCK__value__87).kind == "Ok") {
            var _$unwrapTraitObject84 = $unwrapTraitObject(__PUCK__value__87),
                _$unwrapTraitObject85 = _slicedToArray(_$unwrapTraitObject84.value, 1),
                type_ = _$unwrapTraitObject85[0];

            __PUCK__value__88 = type_;
          } else {
            var __PUCK__value__89 = __PUCK__value__86;
            var __PUCK__value__90 = void 0;
            if ($unwrapTraitObject(__PUCK__value__89).kind == "Err") {
              var _$unwrapTraitObject86 = $unwrapTraitObject(__PUCK__value__89),
                  _$unwrapTraitObject87 = _slicedToArray(_$unwrapTraitObject86.value, 1),
                  __PUCK__value__91 = _$unwrapTraitObject87[0];

              reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression', value: e, $isTraitObject: true }, "Type " + _entities.Type.displayName.call(e.then_.type_) + " and " + _entities.Type.displayName.call(asType(_else_.type_)) + " is not compatible");
              __PUCK__value__90 = _entities.Type.empty();
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
    visitIfLetExpression: function visitIfLetExpression(e) {
      var self = this;
      var parentScope = $unwrapTraitObject(self).scope;
      e.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(self).scope = _scope.Scope.createChild.call(parentScope);
      var isUsed = $unwrapTraitObject(self).isUsed;
      $unwrapTraitObject(self).visitPattern(e.pattern);
      $unwrapTraitObject(self).visitExpression(e.expression);
      var __PUCK__value__92 = (0, _patterns.declarePatternVariables)($unwrapTraitObject(self).scope, self, e.pattern, false, _ast.Expression.getType.call(e.expression), true);
      var __PUCK__value__93 = __PUCK__value__92;
      if ($unwrapTraitObject(__PUCK__value__93).kind == "Ok") {
        var _$unwrapTraitObject88 = $unwrapTraitObject(__PUCK__value__93),
            _$unwrapTraitObject89 = _slicedToArray(_$unwrapTraitObject88.value, 1),
            __PUCK__value__94 = _$unwrapTraitObject89[0];
      } else {
        var __PUCK__value__95 = __PUCK__value__92;
        if ($unwrapTraitObject(__PUCK__value__95).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__95).value)[$unwrapTraitObject(0)]).kind == "PatternMismatch") {
          var _$unwrapTraitObject90 = $unwrapTraitObject(__PUCK__value__95),
              _$unwrapTraitObject91 = _slicedToArray(_$unwrapTraitObject90.value, 1),
              _$unwrapTraitObject92 = _slicedToArray(_$unwrapTraitObject91[0].value, 3),
              pattern = _$unwrapTraitObject92[0],
              to = _$unwrapTraitObject92[1],
              subject = _$unwrapTraitObject92[2];

          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(to, subject));
        } else {
          var __PUCK__value__96 = __PUCK__value__92;
          if ($unwrapTraitObject(__PUCK__value__96).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__96).value)[$unwrapTraitObject(0)]).kind == "ScopeError") {
            var _$unwrapTraitObject93 = $unwrapTraitObject(__PUCK__value__96),
                _$unwrapTraitObject94 = _slicedToArray(_$unwrapTraitObject93.value, 1),
                _$unwrapTraitObject95 = _slicedToArray(_$unwrapTraitObject94[0].value, 2),
                token = _$unwrapTraitObject95[0],
                err = _$unwrapTraitObject95[1];

            reportError(token, err);
          } else {
            var __PUCK__value__97 = __PUCK__value__92;
            if ($unwrapTraitObject(__PUCK__value__97).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__97).value)[$unwrapTraitObject(0)]).kind == "NotExhaustive") {
              var _$unwrapTraitObject96 = $unwrapTraitObject(__PUCK__value__97),
                  _$unwrapTraitObject97 = _toArray(_$unwrapTraitObject96.value);
            };
          };
        };
      };
      var expressionScope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(self).scope = _scope.Scope.createChild.call(expressionScope);
      $unwrapTraitObject(self).visitBlock(e.then_, isUsed);
      var __PUCK__value__98 = e.else_;
      if ($unwrapTraitObject(__PUCK__value__98).kind == "Some") {
        var _$unwrapTraitObject98 = $unwrapTraitObject(__PUCK__value__98),
            _$unwrapTraitObject99 = _slicedToArray(_$unwrapTraitObject98.value, 1),
            else_ = _$unwrapTraitObject99[0];

        $unwrapTraitObject(self).scope = _scope.Scope.createChild.call(expressionScope);
        $unwrapTraitObject(self).visitBlock(else_, isUsed);
      };
      if (isUsed) {
        var __PUCK__value__99 = e.else_;
        var __PUCK__value__100 = void 0;
        if ($unwrapTraitObject(__PUCK__value__99).kind == "Some") {
          var _$unwrapTraitObject100 = $unwrapTraitObject(__PUCK__value__99),
              _$unwrapTraitObject101 = _slicedToArray(_$unwrapTraitObject100.value, 1),
              _else_2 = _$unwrapTraitObject101[0];

          var __PUCK__value__101 = (0, _types.findCommonType)([e.then_.type_, _else_2.type_]);
          var __PUCK__value__102 = __PUCK__value__101;
          var __PUCK__value__103 = void 0;
          if ($unwrapTraitObject(__PUCK__value__102).kind == "Ok") {
            var _$unwrapTraitObject102 = $unwrapTraitObject(__PUCK__value__102),
                _$unwrapTraitObject103 = _slicedToArray(_$unwrapTraitObject102.value, 1),
                type_ = _$unwrapTraitObject103[0];

            __PUCK__value__103 = type_;
          } else {
            var __PUCK__value__104 = __PUCK__value__101;
            var __PUCK__value__105 = void 0;
            if ($unwrapTraitObject(__PUCK__value__104).kind == "Err") {
              var _$unwrapTraitObject104 = $unwrapTraitObject(__PUCK__value__104),
                  _$unwrapTraitObject105 = _slicedToArray(_$unwrapTraitObject104.value, 1),
                  __PUCK__value__106 = _$unwrapTraitObject105[0];

              reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression', value: e, $isTraitObject: true }, "Type " + _entities.Type.displayName.call(e.then_.type_) + " and " + _entities.Type.displayName.call(asType(_else_2.type_)) + " is not compatible");
              __PUCK__value__105 = _entities.Type.empty();
            };
            __PUCK__value__103 = __PUCK__value__105;
          };
          __PUCK__value__100 = __PUCK__value__103;
        } else {
          __PUCK__value__100 = _entities.Type.empty();
        };
        e.type_ = __PUCK__value__100;
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
      var __PUCK__value__107 = (0, _enums.checkExhaustive)(e);
      if ($unwrapTraitObject(__PUCK__value__107).kind == "Err") {
        var _$unwrapTraitObject106 = $unwrapTraitObject(__PUCK__value__107),
            _$unwrapTraitObject107 = _slicedToArray(_$unwrapTraitObject106.value, 1),
            error = _$unwrapTraitObject107[0];

        reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true }, error);
      };
      if (isUsed) {
        var __PUCK__value__108 = void 0;
        if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isNotEmpty.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true })) {
          var __PUCK__value__110 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true }, function (arm) {
            return arm.type_;
          });
          var __PUCK__value__109 = (0, _types.findCommonType)(_core.Iterable[__PUCK__value__110.type].toList.call(__PUCK__value__110));
          var __PUCK__value__111 = __PUCK__value__109;
          var __PUCK__value__112 = void 0;
          if ($unwrapTraitObject(__PUCK__value__111).kind == "Ok") {
            var _$unwrapTraitObject108 = $unwrapTraitObject(__PUCK__value__111),
                _$unwrapTraitObject109 = _slicedToArray(_$unwrapTraitObject108.value, 1),
                type_ = _$unwrapTraitObject109[0];

            __PUCK__value__112 = type_;
          } else {
            var __PUCK__value__113 = __PUCK__value__109;
            var __PUCK__value__114 = void 0;
            if ($unwrapTraitObject(__PUCK__value__113).kind == "Err") {
              var _$unwrapTraitObject110 = $unwrapTraitObject(__PUCK__value__113),
                  _$unwrapTraitObject111 = _slicedToArray(_$unwrapTraitObject110.value, 1),
                  __PUCK__value__115 = _$unwrapTraitObject111[0];

              reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true }, "Match arms return mixed types " + _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true }, function (arm) {
                return _entities.Type.displayName.call(asType(arm.type_));
              }).value.join(", "));
              __PUCK__value__114 = _entities.Type.empty();
            };
            __PUCK__value__112 = __PUCK__value__114;
          };
          __PUCK__value__108 = __PUCK__value__112;
        } else {
          __PUCK__value__108 = _entities.Type.empty();
        };
        e.type_ = __PUCK__value__108;
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
      var __PUCK__value__116 = (0, _patterns.declarePatternVariables)(a.scope, self, a.pattern, false, _ast.Expression.getType.call(m.expression), true);
      var __PUCK__value__117 = __PUCK__value__116;
      if ($unwrapTraitObject(__PUCK__value__117).kind == "Ok") {
        var _$unwrapTraitObject112 = $unwrapTraitObject(__PUCK__value__117),
            _$unwrapTraitObject113 = _slicedToArray(_$unwrapTraitObject112.value, 1),
            __PUCK__value__118 = _$unwrapTraitObject113[0];
      } else {
        var __PUCK__value__119 = __PUCK__value__116;
        if ($unwrapTraitObject(__PUCK__value__119).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__119).value)[$unwrapTraitObject(0)]).kind == "PatternMismatch") {
          var _$unwrapTraitObject114 = $unwrapTraitObject(__PUCK__value__119),
              _$unwrapTraitObject115 = _slicedToArray(_$unwrapTraitObject114.value, 1),
              _$unwrapTraitObject116 = _slicedToArray(_$unwrapTraitObject115[0].value, 3),
              pattern = _$unwrapTraitObject116[0],
              to = _$unwrapTraitObject116[1],
              subject = _$unwrapTraitObject116[2];

          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchArm', value: a, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(to, subject));
        } else {
          var __PUCK__value__120 = __PUCK__value__116;
          if ($unwrapTraitObject(__PUCK__value__120).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__120).value)[$unwrapTraitObject(0)]).kind == "ScopeError") {
            var _$unwrapTraitObject117 = $unwrapTraitObject(__PUCK__value__120),
                _$unwrapTraitObject118 = _slicedToArray(_$unwrapTraitObject117.value, 1),
                _$unwrapTraitObject119 = _slicedToArray(_$unwrapTraitObject118[0].value, 2),
                token = _$unwrapTraitObject119[0],
                err = _$unwrapTraitObject119[1];

            reportError(token, err);
          } else {
            var __PUCK__value__121 = __PUCK__value__116;
            if ($unwrapTraitObject(__PUCK__value__121).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__121).value)[$unwrapTraitObject(0)]).kind == "NotExhaustive") {
              var _$unwrapTraitObject120 = $unwrapTraitObject(__PUCK__value__121),
                  _$unwrapTraitObject121 = _toArray(_$unwrapTraitObject120.value);
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
      var __PUCK__value__122 = e.operator.kind;
      var __PUCK__value__123 = __PUCK__value__122;
      if ($unwrapTraitObject(__PUCK__value__123).kind == "NotKeyword") {
        var _undefined3 = $unwrapTraitObject(__PUCK__value__123);
        var __PUCK__value__124 = _scope.Scope.getBindingByTypeId.call(scope, "Bool");
        if ($unwrapTraitObject(__PUCK__value__124).kind == "Some") {
          var _$unwrapTraitObject122 = $unwrapTraitObject(__PUCK__value__124),
              _$unwrapTraitObject123 = _slicedToArray(_$unwrapTraitObject122.value, 1),
              binding = _$unwrapTraitObject123[0];

          e.type_ = _core.Option.unwrap.call(binding.type_.providesType);
        } else {
          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true }, "puck:core::Bool is not in scope. Please import Bool from puck:core to use boolean literals.");
        };
      } else {
        var __PUCK__value__125 = __PUCK__value__122;
        if ($unwrapTraitObject(__PUCK__value__125).kind == "MinusToken") {
          var _undefined4 = $unwrapTraitObject(__PUCK__value__125);
          var __PUCK__value__126 = _scope.Scope.getBindingByTypeId.call(scope, "Num");
          if ($unwrapTraitObject(__PUCK__value__126).kind == "Some") {
            var _$unwrapTraitObject124 = $unwrapTraitObject(__PUCK__value__126),
                _$unwrapTraitObject125 = _slicedToArray(_$unwrapTraitObject124.value, 1),
                _binding2 = _$unwrapTraitObject125[0];

            e.type_ = _core.Option.unwrap.call(_binding2.type_.providesType);
          } else {
            reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true }, "puck:core::Num is not in scope. Please import Num from puck:core to use number literals.");
          };
        } else {
          var __PUCK__value__127 = __PUCK__value__122;
          if ($unwrapTraitObject(__PUCK__value__127).kind == "PlusToken") {
            var _undefined5 = $unwrapTraitObject(__PUCK__value__127);
            var __PUCK__value__128 = _scope.Scope.getBindingByTypeId.call(scope, "Num");
            if ($unwrapTraitObject(__PUCK__value__128).kind == "Some") {
              var _$unwrapTraitObject126 = $unwrapTraitObject(__PUCK__value__128),
                  _$unwrapTraitObject127 = _slicedToArray(_$unwrapTraitObject126.value, 1),
                  _binding3 = _$unwrapTraitObject127[0];

              e.type_ = _core.Option.unwrap.call(_binding3.type_.providesType);
            } else {
              reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true }, "puck:core::Num is not in scope. Please import Num from puck:core to use number literals.");
            };
          } else {
            var __PUCK__value__129 = __PUCK__value__122;
            if (true) {
              var __PUCK__value__130 = __PUCK__value__129;
            };
          };
        };
      };
      return [];
    },
    visitIndexAccess: function visitIndexAccess(a) {
      var self = this;
      var __PUCK__value__131 = getCoreType($unwrapTraitObject(self).scope, "Index", "index access");
      var __PUCK__value__132 = __PUCK__value__131;
      if ($unwrapTraitObject(__PUCK__value__132).kind == "Ok") {
        var _$unwrapTraitObject128 = $unwrapTraitObject(__PUCK__value__132),
            _$unwrapTraitObject129 = _slicedToArray(_$unwrapTraitObject128.value, 1),
            _$unwrapTraitObject130 = _slicedToArray(_$unwrapTraitObject129[0], 2),
            __PUCK__value__133 = _$unwrapTraitObject130[0],
            binding = _$unwrapTraitObject130[1];

        var call = (0, _ast.CallExpression)({
          func: _ast.Expression.MemberAccess({
            object: _ast.Expression.Identifier({
              name: binding.name,
              span: _span.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: a.object, $isTraitObject: true })
            }),
            member: {
              name: "index",
              span: {
                start: a.openBracket.start,
                end: a.closeBracket.end
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
        var __PUCK__value__134 = __PUCK__value__131;
        if ($unwrapTraitObject(__PUCK__value__134).kind == "Err") {
          var _$unwrapTraitObject131 = $unwrapTraitObject(__PUCK__value__134),
              _$unwrapTraitObject132 = _slicedToArray(_$unwrapTraitObject131.value, 1),
              err = _$unwrapTraitObject132[0];

          return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IndexAccess', value: a, $isTraitObject: true }, err);
        };
      };
    },
    visitMemberAccess: function visitMemberAccess(a) {
      var self = this;
      a.scope = $unwrapTraitObject(self).scope;
      visit.walkExpression(self, a.object);
      if (_ast.Expression.getType.call(a.object)) {
        var __PUCK__value__135 = _ast.Expression.getType.call(a.object).kind;
        if ($unwrapTraitObject(__PUCK__value__135).kind == "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__135).value)[$unwrapTraitObject(0)]).kind).kind == "Record") {
          var _$unwrapTraitObject133 = $unwrapTraitObject(__PUCK__value__135),
              _$unwrapTraitObject134 = _slicedToArray(_$unwrapTraitObject133.value, 1),
              _$unwrapTraitObject135 = _slicedToArray(_$unwrapTraitObject134[0].kind.value, 1),
              record = _$unwrapTraitObject135[0];

          var __PUCK__value__136 = _core.ObjectMap.get.call(record.properties, a.member.name);
          if ($unwrapTraitObject(__PUCK__value__136).kind == "Some") {
            var _$unwrapTraitObject136 = $unwrapTraitObject(__PUCK__value__136),
                _$unwrapTraitObject137 = _slicedToArray(_$unwrapTraitObject136.value, 1),
                type_ = _$unwrapTraitObject137[0];

            return a.type_ = type_;
          };
        } else {};
      };
    },
    visitUnknownAccess: function visitUnknownAccess(a) {
      var self = this;
      visit.walkExpression(self, a.object);
      var __PUCK__value__137 = getCoreType($unwrapTraitObject(self).scope, "Unknown", "unknown access");
      var __PUCK__value__138 = __PUCK__value__137;
      if ($unwrapTraitObject(__PUCK__value__138).kind == "Ok") {
        var _$unwrapTraitObject138 = $unwrapTraitObject(__PUCK__value__138),
            _$unwrapTraitObject139 = _slicedToArray(_$unwrapTraitObject138.value, 1),
            _$unwrapTraitObject140 = _slicedToArray(_$unwrapTraitObject139[0], 2),
            type_ = _$unwrapTraitObject140[0],
            __PUCK__value__139 = _$unwrapTraitObject140[1];

        a.type_ = type_;
      } else {
        var __PUCK__value__140 = __PUCK__value__137;
        if ($unwrapTraitObject(__PUCK__value__140).kind == "Err") {
          var _$unwrapTraitObject141 = $unwrapTraitObject(__PUCK__value__140),
              _$unwrapTraitObject142 = _slicedToArray(_$unwrapTraitObject141.value, 1),
              err = _$unwrapTraitObject142[0];

          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownAccess', value: a, $isTraitObject: true }, err);
        };
      };
      return [];
    },
    visitUnknownIndexAccess: function visitUnknownIndexAccess(a) {
      var self = this;
      visit.walkUnknownIndexAccess(self, a);
      var __PUCK__value__141 = getCoreType($unwrapTraitObject(self).scope, "Unknown", "unknown access");
      var __PUCK__value__142 = __PUCK__value__141;
      if ($unwrapTraitObject(__PUCK__value__142).kind == "Ok") {
        var _$unwrapTraitObject143 = $unwrapTraitObject(__PUCK__value__142),
            _$unwrapTraitObject144 = _slicedToArray(_$unwrapTraitObject143.value, 1),
            _$unwrapTraitObject145 = _slicedToArray(_$unwrapTraitObject144[0], 2),
            type_ = _$unwrapTraitObject145[0],
            __PUCK__value__143 = _$unwrapTraitObject145[1];

        a.type_ = type_;
      } else {
        var __PUCK__value__144 = __PUCK__value__141;
        if ($unwrapTraitObject(__PUCK__value__144).kind == "Err") {
          var _$unwrapTraitObject146 = $unwrapTraitObject(__PUCK__value__144),
              _$unwrapTraitObject147 = _slicedToArray(_$unwrapTraitObject146.value, 1),
              err = _$unwrapTraitObject147[0];

          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownIndexAccess', value: a, $isTraitObject: true }, err);
        };
      };
      return [];
    },
    visitBooleanLiteral: function visitBooleanLiteral(l) {
      var self = this;
      var scope = $unwrapTraitObject(self).scope;
      l.scope = $unwrapTraitObject(self).scope;
      var __PUCK__value__145 = _scope.Scope.getBindingByTypeId.call(scope, "Bool");
      if ($unwrapTraitObject(__PUCK__value__145).kind == "Some") {
        var _$unwrapTraitObject148 = $unwrapTraitObject(__PUCK__value__145),
            _$unwrapTraitObject149 = _slicedToArray(_$unwrapTraitObject148.value, 1),
            binding = _$unwrapTraitObject149[0];

        l.type_ = _core.Option.unwrap.call(binding.type_.providesType);
      } else {
        reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BooleanLiteral', value: l, $isTraitObject: true }, "puck:core::Bool is not in scope. Please import Bool from puck:core to use boolean literals.");
      };
      return visit.walkBooleanLiteral(self, l);
    },
    visitListLiteral: function visitListLiteral(l) {
      var self = this;
      var scope = $unwrapTraitObject(self).scope;
      var __PUCK__value__146 = _scope.Scope.getBindingByTypeId.call(scope, "List");
      var __PUCK__value__147 = void 0;
      if ($unwrapTraitObject(__PUCK__value__146).kind == "Some") {
        var _$unwrapTraitObject150 = $unwrapTraitObject(__PUCK__value__146),
            _$unwrapTraitObject151 = _slicedToArray(_$unwrapTraitObject150.value, 1),
            binding = _$unwrapTraitObject151[0];

        __PUCK__value__147 = _core.Option.unwrap.call(binding.type_.providesType);
      } else {
        return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral', value: l, $isTraitObject: true }, "puck:core::List is not in scope. Please import List from puck:core to use list literals.");
      };
      var listType = __PUCK__value__147;
      l.scope = $unwrapTraitObject(self).scope;
      visit.walkListLiteral(self, l);
      if (l.members.length >= 1) {
        var __PUCK__value__148 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true }, function (m) {
          return _ast.Expression.getType.call(m);
        });
        var types = _core.Iterable[__PUCK__value__148.type].toList.call(__PUCK__value__148);
        var result = (0, _types.findCommonType)(types);
        var __PUCK__value__149 = result;
        var __PUCK__value__150 = __PUCK__value__149;
        if ($unwrapTraitObject(__PUCK__value__150).kind == "Ok") {
          var _$unwrapTraitObject152 = $unwrapTraitObject(__PUCK__value__150),
              _$unwrapTraitObject153 = _slicedToArray(_$unwrapTraitObject152.value, 1),
              type_ = _$unwrapTraitObject153[0];

          if (!type_) {
            l.type_ = listType;
          } else {
            l.type_ = (0, _types.createTypeInstance)(listType, asIterable([type_]));
          };
        } else {
          var __PUCK__value__151 = __PUCK__value__149;
          if ($unwrapTraitObject(__PUCK__value__151).kind == "Err") {
            var _$unwrapTraitObject154 = $unwrapTraitObject(__PUCK__value__151),
                _$unwrapTraitObject155 = _slicedToArray(_$unwrapTraitObject154.value, 1),
                __PUCK__value__152 = _$unwrapTraitObject155[0];

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
      var __PUCK__value__153 = _scope.Scope.getBindingByTypeId.call(scope, "Num");
      if ($unwrapTraitObject(__PUCK__value__153).kind == "Some") {
        var _$unwrapTraitObject156 = $unwrapTraitObject(__PUCK__value__153),
            _$unwrapTraitObject157 = _slicedToArray(_$unwrapTraitObject156.value, 1),
            binding = _$unwrapTraitObject157[0];

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
      var __PUCK__value__154 = _scope.Scope.getBindingByTypeId.call(scope, "String");
      if ($unwrapTraitObject(__PUCK__value__154).kind == "Some") {
        var _$unwrapTraitObject158 = $unwrapTraitObject(__PUCK__value__154),
            _$unwrapTraitObject159 = _slicedToArray(_$unwrapTraitObject158.value, 1),
            binding = _$unwrapTraitObject159[0];

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
      var __PUCK__value__155 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.expressions, $isTraitObject: true }, function (e) {
        return _ast.Expression.getType.call(e);
      });
      return l.type_ = (0, _entities.Type)({
        id: _core.None,
        displayName: _core.None,
        name: _core.None,
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: _entities.StructKind.Tuple({ properties: _core.Iterable[__PUCK__value__155.type].toList.call(__PUCK__value__155) })
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
      var __PUCK__value__156 = p;
      var __PUCK__value__157 = __PUCK__value__156;
      var __PUCK__value__158 = void 0;
      if ($unwrapTraitObject(__PUCK__value__157).kind == "CatchAll") {
        var _undefined6 = $unwrapTraitObject(__PUCK__value__157);
        __PUCK__value__158 = _entities.Type.unused();
      } else {
        var __PUCK__value__159 = __PUCK__value__156;
        var __PUCK__value__160 = void 0;
        if ($unwrapTraitObject(__PUCK__value__159).kind == "Identifier") {
          var _$unwrapTraitObject160 = $unwrapTraitObject(__PUCK__value__159),
              _$unwrapTraitObject161 = _slicedToArray(_$unwrapTraitObject160.value, 1),
              identifier = _$unwrapTraitObject161[0];

          __PUCK__value__160 = _js._undefined;
        } else {
          var __PUCK__value__161 = __PUCK__value__156;
          var __PUCK__value__162 = void 0;
          if ($unwrapTraitObject(__PUCK__value__161).kind == "Record") {
            var _$unwrapTraitObject162 = $unwrapTraitObject(__PUCK__value__161),
                _$unwrapTraitObject163 = _slicedToArray(_$unwrapTraitObject162.value, 1),
                record = _$unwrapTraitObject163[0];

            __PUCK__value__162 = record.type_;
          } else {
            var __PUCK__value__163 = __PUCK__value__156;
            var __PUCK__value__164 = void 0;
            if ($unwrapTraitObject(__PUCK__value__163).kind == "RecordType") {
              var _$unwrapTraitObject164 = $unwrapTraitObject(__PUCK__value__163),
                  _$unwrapTraitObject165 = _slicedToArray(_$unwrapTraitObject164.value, 2),
                  typePath = _$unwrapTraitObject165[0],
                  _record = _$unwrapTraitObject165[1];

              var type_ = typePath.providesType;
              if (!(0, _types.isAssignable)(_record.type_, type_)) {
                reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p, $isTraitObject: true }, _entities.Type.displayName.call(type_) + " is not assignable to pattern " + _ast.RecordPattern.displayName.call(_record));
              };
              __PUCK__value__164 = _core.Option.mapOr.call(type_.enumMember, type_, function (_ref11) {
                var _ref12 = _slicedToArray(_ref11, 2),
                    __PUCK__value__165 = _ref12[0],
                    enum_ = _ref12[1];

                return enum_;
              });
            } else {
              var __PUCK__value__166 = __PUCK__value__156;
              var __PUCK__value__167 = void 0;
              if ($unwrapTraitObject(__PUCK__value__166).kind == "Tuple") {
                var _$unwrapTraitObject166 = $unwrapTraitObject(__PUCK__value__166),
                    _$unwrapTraitObject167 = _slicedToArray(_$unwrapTraitObject166.value, 1),
                    tuple = _$unwrapTraitObject167[0];

                __PUCK__value__167 = tuple.type_;
              } else {
                var __PUCK__value__168 = __PUCK__value__156;
                var __PUCK__value__169 = void 0;
                if ($unwrapTraitObject(__PUCK__value__168).kind == "TupleType") {
                  var _$unwrapTraitObject168 = $unwrapTraitObject(__PUCK__value__168),
                      _$unwrapTraitObject169 = _slicedToArray(_$unwrapTraitObject168.value, 2),
                      _typePath = _$unwrapTraitObject169[0],
                      _tuple = _$unwrapTraitObject169[1];

                  var _type_ = _typePath.providesType;
                  if (!(0, _types.isAssignable)(_tuple.type_, _type_)) {
                    reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p, $isTraitObject: true }, _entities.Type.displayName.call(_type_) + " is not assignable to pattern " + _ast.TuplePattern.displayName.call(_tuple));
                  };
                  __PUCK__value__169 = _core.Option.mapOr.call(_type_.enumMember, _type_, function (_ref13) {
                    var _ref14 = _slicedToArray(_ref13, 2),
                        __PUCK__value__170 = _ref14[0],
                        enum_ = _ref14[1];

                    return enum_;
                  });
                } else {
                  var __PUCK__value__171 = __PUCK__value__156;
                  var __PUCK__value__172 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__171).kind == "UnitType") {
                    var _$unwrapTraitObject170 = $unwrapTraitObject(__PUCK__value__171),
                        _$unwrapTraitObject171 = _slicedToArray(_$unwrapTraitObject170.value, 1),
                        _typePath2 = _$unwrapTraitObject171[0];

                    __PUCK__value__172 = _js._undefined;
                  };
                  __PUCK__value__169 = __PUCK__value__172;
                };
                __PUCK__value__167 = __PUCK__value__169;
              };
              __PUCK__value__164 = __PUCK__value__167;
            };
            __PUCK__value__162 = __PUCK__value__164;
          };
          __PUCK__value__160 = __PUCK__value__162;
        };
        __PUCK__value__158 = __PUCK__value__160;
      };
      return p.type_ = __PUCK__value__158;
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
      var __PUCK__value__173 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: p.properties, $isTraitObject: true }, function (p) {
        return p.type_;
      });
      return p.type_ = (0, _entities.Type)({
        id: _core.None,
        displayName: _core.None,
        name: _core.None,
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: _entities.StructKind.Tuple({ properties: _core.Iterable[__PUCK__value__173.type].toList.call(__PUCK__value__173) })
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
