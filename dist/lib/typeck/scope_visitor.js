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

var _visit = require('./../ast/visit');

var visit = _interopRequireWildcard(_visit);

var _ast2 = require('./../compiler/ast');

var _enums = require('./src/enums');

var _functions = require('./src/functions');

var _impls = require('./src/impls');

var _range = require('./src/range');

var _scope = require('./src/scope');

var _structure_visitor = require('./src/structure_visitor');

var _types = require('./src/types');

var _entities = require('./../entities');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};

function asType(a) {
  return a;
};
function asIterable(a) {
  return { type: '$List<E>', value: a, $isTraitObject: true };
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

      var binding = $unwrapTraitObject(i.scope).getBinding(i.name);
      if (binding) {
        return (0, _core.Some)(binding);
      } else {
        return _core.None;
      };
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
        reportError({ type: '$CallExpression', value: c, $isTraitObject: true }, "" + name + " is not callable");
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
          reportError({ type: '$CallExpression', value: c, $isTraitObject: true }, "" + name + " can only be called on a mutable binding");
        };
      };
    };
    var __PUCK__value__20 = (0, _range.checkRange)(c.argumentList, _function.parameterRange, "arguments", name);
    if ($unwrapTraitObject(__PUCK__value__20).kind == "Err") {
      var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__20),
          _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
          error = _$unwrapTraitObject7$[0];

      reportError({ type: '$CallExpression', value: c, $isTraitObject: true }, error);
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
        var __PUCK__value__23 = _core.Iterable['$List<E>'].enumerate.call({ type: '$List<E>', value: _function.parameters, $isTraitObject: true });
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
                    return reportError({ type: '$Expression', value: argument, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(existingMapping, _ast.Expression.getType.call(argument)));
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
    var __PUCK__value__26 = _core.Iterable['$List<E>'].enumerate.call({ type: '$List<E>', value: c.argumentList, $isTraitObject: true });
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
        reportError({ type: '$Expression', value: argument, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)($unwrapTraitObject(parameter).type_, _ast.Expression.getType.call(argument)) + " in parameter " + parameterName + " of function " + name + "");
      };
      if ($unwrapTraitObject(parameter).mutable) {
        var __PUCK__value__30 = getBinding(argument);
        if ($unwrapTraitObject(__PUCK__value__30).kind == "Some") {
          var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__30),
              _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
              argumentBinding = _$unwrapTraitObject11[0];

          var argumentName = argumentBinding.name;
          if (!argumentBinding.mutable) {
            return reportError({ type: '$Expression', value: argument, $isTraitObject: true }, "Parameter " + parameterName + " of function " + name + " requires a mutable binding " + "but " + argumentName + " is declared as immutable.");
          };
        };
      };
    });
    return _function;
  };
  var structureVisitorInstance = (0, _structure_visitor.structureVisitor)(reportError);
  return $unwrapTraitObject(_js._Object).assign({}, $unwrapTraitObject(visit).walkingVisitor, structureVisitorInstance, {
    reportError: reportError,
    visitModule: function visitModule(m) {
      var self = this;
      $unwrapTraitObject(self).scope = m.scope;
      _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: m.statements, $isTraitObject: true }, function (s) {
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
      return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: m.statements, $isTraitObject: true }, function (s) {
        $unwrapTraitObject(self).isUsed = false;
        return $unwrapTraitObject(self).visitTopLevelStatement(s);
      });
    },
    visitExpression: function visitExpression(e) {
      var self = this;
      $unwrapTraitObject(self).isUsed = true;
      return $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(visit).walkingVisitor).visitExpression).call(self, e);
    },
    visitImplDeclaration: function visitImplDeclaration(i) {
      var self = this;
      return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: i.members, $isTraitObject: true }, function (f) {
        return $unwrapTraitObject(self).visitFunctionDeclaration(f);
      });
    },
    visitImplShorthandDeclaration: function visitImplShorthandDeclaration(i) {
      var self = this;
      return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: i.members, $isTraitObject: true }, function (f) {
        return $unwrapTraitObject(self).visitFunctionDeclaration(f);
      });
    },
    visitTraitDeclaration: function visitTraitDeclaration(t) {
      var self = this;
      $unwrapTraitObject(self).scope = t.scope;
      $unwrapTraitObject(visit).walkTraitDeclaration(self, t);
      return $unwrapTraitObject(self).scope = $unwrapTraitObject($unwrapTraitObject(self).scope).parent;
    },
    visitTypeDeclaration: function visitTypeDeclaration(t) {},
    visitExportDirective: function visitExportDirective(e) {
      var self = this;
      return $unwrapTraitObject(visit).walkExportDirective(self, e);
    },
    visitImportDirective: function visitImportDirective(i) {},
    visitObjectDestructure: function visitObjectDestructure(i) {},
    visitBlock: function visitBlock(b) {
      var isUsed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var self = this;
      b.scope = $unwrapTraitObject(self).scope;
      _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: b.statements, $isTraitObject: true }, function (s) {
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
      var lastIndex = _core.Iterable['$List<E>'].size.call({ type: '$List<E>', value: b.statements, $isTraitObject: true }) - 1;
      var __PUCK__value__42 = _core.Iterable['$List<E>'].enumerate.call({ type: '$List<E>', value: b.statements, $isTraitObject: true });
      _core.Iterable[__PUCK__value__42.type].forEach.call(__PUCK__value__42, function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            s = _ref6[0],
            index = _ref6[1];

        $unwrapTraitObject(self).isUsed = isUsed && index == lastIndex;
        return $unwrapTraitObject(self).visitBlockLevelStatement(s);
      });
      var __PUCK__value__43 = _core.Iterable['$List<E>'].last.call({ type: '$List<E>', value: b.statements, $isTraitObject: true });
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
      return $unwrapTraitObject(visit).walkReturn(self, r);
    },
    visitWhileLoop: function visitWhileLoop(e) {
      var self = this;
      $unwrapTraitObject(self).scope = (0, _scope.createScope)(context, file, $unwrapTraitObject(self).scope);
      e.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(self).visitExpression(e.condition);
      $unwrapTraitObject(self).visitBlock(e.body, false);
      e.type_ = _entities.Type.empty();
      return $unwrapTraitObject(self).scope = $unwrapTraitObject($unwrapTraitObject(self).scope).parent;
    },
    visitIdentifier: function visitIdentifier(i) {
      var self = this;
      i.scope = $unwrapTraitObject(self).scope;
      var binding = $unwrapTraitObject(i.scope).getBinding(i.name);
      if (!binding) {
        reportError({ type: '$Identifier', value: i, $isTraitObject: true }, "Use of undefined variable " + i.name);
      } else {
        i.type_ = $unwrapTraitObject(binding).type_;
      };
      return $unwrapTraitObject(visit).walkIdentifier(self, i);
    },
    visitFunctionDeclaration: function visitFunctionDeclaration(f) {
      var isHoisting = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var self = this;
      structureVisitorInstance.visitFunctionDeclaration.call(self, f);
      if (!isHoisting) {
        var selfScope = $unwrapTraitObject(self).scope;
        $unwrapTraitObject(self).scope = f.scope;
        _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: f.parameterList, $isTraitObject: true }, function (p) {
          return $unwrapTraitObject(self).visitVariableDeclaration(p);
        });
        var __PUCK__value__45 = f.body;
        if ($unwrapTraitObject(__PUCK__value__45).kind == "Some") {
          var _$unwrapTraitObject24 = $unwrapTraitObject(__PUCK__value__45),
              _$unwrapTraitObject25 = _slicedToArray(_$unwrapTraitObject24.value, 1),
              body = _$unwrapTraitObject25[0];

          $unwrapTraitObject(self).visitBlock(body);
          var __PUCK__value__46 = f.type_.kind;
          if ($unwrapTraitObject(__PUCK__value__46).kind == "Function") {
            var _$unwrapTraitObject26 = $unwrapTraitObject(__PUCK__value__46),
                _$unwrapTraitObject27 = _slicedToArray(_$unwrapTraitObject26.value, 1),
                func = _$unwrapTraitObject27[0];

            if (func.returnType) {
              if (!(0, _types.isAssignable)(func.returnType, body.type_)) {
                reportError({ type: '$FunctionDeclaration', value: f, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(func.returnType, body.type_) + " as returnType");
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
      var __PUCK__value__47 = void 0;
      if (visitInitializer) {
        __PUCK__value__47 = visitInitializer;
      } else {
        __PUCK__value__47 = function __PUCK__value__47(e) {
          var parentAssignedTo = $unwrapTraitObject(self).assignedTo;
          $unwrapTraitObject(self).assignedTo = d;
          $unwrapTraitObject(self).isUsed = true;
          $unwrapTraitObject(self).visitExpression(e);
          return $unwrapTraitObject(self).assignedTo = parentAssignedTo;
        };
      };
      return structureVisitorInstance.visitVariableDeclaration.call(self, d, __PUCK__value__47, type_, allowNotExhaustive);
    },
    visitAssignmentExpression: function visitAssignmentExpression(e) {
      var self = this;
      e.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(visit).walkAssignmentExpression(self, e);
      var __PUCK__value__48 = getBinding(e.lhs);
      if ($unwrapTraitObject(__PUCK__value__48).kind == "Some") {
        var _$unwrapTraitObject28 = $unwrapTraitObject(__PUCK__value__48),
            _$unwrapTraitObject29 = _slicedToArray(_$unwrapTraitObject28.value, 1),
            binding = _$unwrapTraitObject29[0];

        if (!binding.mutable) {
          reportError({ type: '$AssignmentExpression', value: e, $isTraitObject: true }, "Can't assign to immutable variable " + binding.name);
        };
        if (!(0, _types.isAssignable)(_ast.Expression.getType.call(e.lhs), _ast.Expression.getType.call(e.rhs))) {
          reportError({ type: '$AssignmentExpression', value: e, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(_ast.Expression.getType.call(e.lhs), _ast.Expression.getType.call(e.rhs)));
        };
      };
      return e.type_ = _ast.Expression.getType.call(e.lhs) || _ast.Expression.getType.call(e.rhs);
    },
    visitBinaryExpression: function visitBinaryExpression(e) {
      var self = this;
      e.scope = $unwrapTraitObject(self).scope;
      return $unwrapTraitObject(visit).walkBinaryExpression(self, e);
    },
    visitCallExpression: function visitCallExpression(e) {
      var self = this;
      e.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(self).visitExpression(e.func);
      var functionType = _ast.Expression.getType.call(e.func);
      var __PUCK__value__49 = e.func;
      if ($unwrapTraitObject(__PUCK__value__49).kind == "MemberAccess") {
        var _$unwrapTraitObject30 = $unwrapTraitObject(__PUCK__value__49),
            _$unwrapTraitObject31 = _slicedToArray(_$unwrapTraitObject30.value, 1),
            access = _$unwrapTraitObject31[0];

        if (_ast.Expression.getType.call(access.object)) {
          var name = access.member.name;
          var objectType = _ast.Expression.getType.call(access.object);
          var __PUCK__value__50 = objectType.kind;
          if ($unwrapTraitObject(__PUCK__value__50).kind == "Trait") {
            var _$unwrapTraitObject32 = $unwrapTraitObject(__PUCK__value__50),
                _$unwrapTraitObject33 = _slicedToArray(_$unwrapTraitObject32.value, 1),
                trait_ = _$unwrapTraitObject33[0];

            functionType = trait_.functions[name];
            if (functionType) {
              var _function = _entities.Type.getFunction.call(functionType);
              if (_core.Option.isSome.call(_function.selfBinding)) {
                e.traitName = _core.Option.unwrap.call(objectType.name);
                e.isTraitObject = true;
              };
            };
          } else {
            var __PUCK__value__51 = (0, _impls.getImplementation)(name, objectType, e, reportError);
            if ($unwrapTraitObject(__PUCK__value__51).kind == "Some") {
              var _$unwrapTraitObject34 = $unwrapTraitObject(__PUCK__value__51),
                  _$unwrapTraitObject35 = _slicedToArray(_$unwrapTraitObject34.value, 1),
                  implementation = _$unwrapTraitObject35[0];

              var __PUCK__value__52 = implementation.trait_.instance;
              var __PUCK__value__53 = void 0;
              if ($unwrapTraitObject(__PUCK__value__52).kind == "Some") {
                var _$unwrapTraitObject36 = $unwrapTraitObject(__PUCK__value__52),
                    _$unwrapTraitObject37 = _slicedToArray(_$unwrapTraitObject36.value, 1),
                    instance = _$unwrapTraitObject37[0];

                __PUCK__value__53 = instance._class;
              } else {
                __PUCK__value__53 = implementation.trait_;
              };
              var _trait_ = __PUCK__value__53;
              var traitName = _core.Option.unwrap.call(_trait_.name);
              if (!$unwrapTraitObject(e.scope).getTypeBinding(traitName)) {
                reportError({ type: '$CallExpression', value: e, $isTraitObject: true }, "The function " + name + " is defined in trait " + traitName + " but it is not in scope");
              };
              e.traitName = traitName;
              e.isShorthand = _entities.Type.getTrait.call(_trait_).isShorthand;
              e.implementationType = implementation.type_;
              functionType = _entities.Type.getTrait.call(asType(implementation.trait_)).functions[name];
            };
          };
          var __PUCK__value__54 = objectType.instance;
          if ($unwrapTraitObject(__PUCK__value__54).kind == "Some") {
            var _$unwrapTraitObject38 = $unwrapTraitObject(__PUCK__value__54),
                _$unwrapTraitObject39 = _slicedToArray(_$unwrapTraitObject38.value, 1),
                _instance = _$unwrapTraitObject39[0];

            functionType = (0, _types.resolveTypeParameters)(_instance.parameterMap)(functionType);
          };
        };
      };
      if (functionType && _entities.Type.isFunction.call(functionType)) {
        (function () {
          var callTypeParameters = _core.Option.unwrapOr.call(_core.Option.map.call(functionType._class, function (_class) {
            return _class.typeParameters;
          }), []);
          var callParameterMap = _core.ObjectMap._new();
          var parentAssignedTo = $unwrapTraitObject(self).assignedTo;
          var __PUCK__value__55 = _core.Iterable['$List<E>'].enumerate.call({ type: '$List<E>', value: e.argumentList, $isTraitObject: true });
          _core.Iterable[__PUCK__value__55.type].forEach.call(__PUCK__value__55, function (_ref7) {
            var _ref8 = _slicedToArray(_ref7, 2),
                a = _ref8[0],
                i = _ref8[1];

            $unwrapTraitObject(self).assignedTo = _entities.Type.getFunction.call(functionType).parameters[i];
            $unwrapTraitObject(self).visitExpression(a);
            if (_core.Iterable['$List<E>'].isNotEmpty.call({ type: '$List<E>', value: callTypeParameters, $isTraitObject: true }) && $unwrapTraitObject(_entities.Type.getFunction.call(functionType).parameters[i]).type_ && _ast.Expression.getType.call(a)) {
              return (0, _functions.resolveFunctionTypeParameters)(callParameterMap, callTypeParameters, $unwrapTraitObject(_entities.Type.getFunction.call(functionType).parameters[i]).type_, _ast.Expression.getType.call(a));
            };
          });
          if (_core.Iterable['$List<E>'].isNotEmpty.call({ type: '$List<E>', value: callTypeParameters, $isTraitObject: true })) {
            functionType = (0, _types.resolveTypeParameters)(callParameterMap)(functionType);
          };
          $unwrapTraitObject(self).assignedTo = parentAssignedTo;
        })();
      } else {
        _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: e.argumentList, $isTraitObject: true }, function (a) {
          return $unwrapTraitObject(self).visitExpression(a);
        });
      };
      if (functionType) {
        e.functionType = functionType;
        var _function2 = checkFunctionCall(functionType, e);
        if (_function2) {
          return e.type_ = _function2.returnType;
        };
      };
    },
    visitIfExpression: function visitIfExpression(e) {
      var self = this;
      $unwrapTraitObject(self).scope = (0, _scope.createScope)(context, file, $unwrapTraitObject(self).scope);
      e.scope = $unwrapTraitObject(self).scope;
      var isUsed = $unwrapTraitObject(self).isUsed;
      $unwrapTraitObject(self).visitExpression(e.condition);
      $unwrapTraitObject(self).visitBlock(e.then_, isUsed);
      var __PUCK__value__56 = e.else_;
      if ($unwrapTraitObject(__PUCK__value__56).kind == "Some") {
        var _$unwrapTraitObject40 = $unwrapTraitObject(__PUCK__value__56),
            _$unwrapTraitObject41 = _slicedToArray(_$unwrapTraitObject40.value, 1),
            else_ = _$unwrapTraitObject41[0];

        $unwrapTraitObject(self).visitBlock(else_, isUsed);
      };
      if (isUsed) {
        var __PUCK__value__57 = e.else_;
        var __PUCK__value__58 = void 0;
        if ($unwrapTraitObject(__PUCK__value__57).kind == "Some") {
          var _$unwrapTraitObject42 = $unwrapTraitObject(__PUCK__value__57),
              _$unwrapTraitObject43 = _slicedToArray(_$unwrapTraitObject42.value, 1),
              _else_ = _$unwrapTraitObject43[0];

          var result = (0, _types.findCommonType)([e.then_.type_, _else_.type_]);
          var __PUCK__value__59 = result;
          var __PUCK__value__60 = __PUCK__value__59;
          var __PUCK__value__61 = void 0;
          if ($unwrapTraitObject(__PUCK__value__60).kind == "Ok") {
            var _$unwrapTraitObject44 = $unwrapTraitObject(__PUCK__value__60),
                _$unwrapTraitObject45 = _slicedToArray(_$unwrapTraitObject44.value, 1),
                type_ = _$unwrapTraitObject45[0];

            __PUCK__value__61 = type_;
          } else {
            var __PUCK__value__62 = __PUCK__value__59;
            var __PUCK__value__63 = void 0;
            if ($unwrapTraitObject(__PUCK__value__62).kind == "Err") {
              var _$unwrapTraitObject46 = $unwrapTraitObject(__PUCK__value__62),
                  _$unwrapTraitObject47 = _slicedToArray(_$unwrapTraitObject46.value, 1),
                  __PUCK__value__64 = _$unwrapTraitObject47[0];

              __PUCK__value__63 = reportError({ type: '$IfExpression', value: e, $isTraitObject: true }, "Type " + _entities.Type.displayName.call(e.then_.type_) + " and " + _entities.Type.displayName.call(asType(_else_.type_)) + " is not compatible");
            };
            __PUCK__value__61 = __PUCK__value__63;
          };
          __PUCK__value__58 = __PUCK__value__61;
        } else {
          __PUCK__value__58 = {
            displayName: _core.None,
            name: _core.None,
            kind: _entities.TypeKind.Struct({
              implementations: [],
              kind: _entities.StructKind.Tuple({ properties: [] })
            }),
            _class: _core.None,
            instance: _core.None
          };
        };
        e.type_ = __PUCK__value__58;
      };
      return $unwrapTraitObject(self).scope = $unwrapTraitObject($unwrapTraitObject(self).scope).parent;
    },
    visitIfLetExpression: function visitIfLetExpression(e) {
      var self = this;
      $unwrapTraitObject(self).scope = (0, _scope.createScope)(context, file, $unwrapTraitObject(self).scope);
      e.scope = $unwrapTraitObject(self).scope;
      var isUsed = $unwrapTraitObject(self).isUsed;
      $unwrapTraitObject(self).visitPattern(e.pattern);
      $unwrapTraitObject(self).visitExpression(e.expression);
      var result = (0, _structure_visitor.declarePatternVariables)(e.scope, self, e.pattern, false, _ast.Expression.getType.call(e.expression), true);
      var __PUCK__value__65 = result;
      var __PUCK__value__66 = __PUCK__value__65;
      if ($unwrapTraitObject(__PUCK__value__66).kind == "Ok") {
        var _$unwrapTraitObject48 = $unwrapTraitObject(__PUCK__value__66),
            _$unwrapTraitObject49 = _slicedToArray(_$unwrapTraitObject48.value, 1),
            patternTy = _$unwrapTraitObject49[0];

        if (!(0, _types.isAssignable)(_ast.Expression.getType.call(e.expression), patternTy)) {
          reportError({ type: '$Expression', value: e.expression, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(patternTy, _ast.Expression.getType.call(e.expression)));
        };
      } else {
        var __PUCK__value__67 = __PUCK__value__65;
        if ($unwrapTraitObject(__PUCK__value__67).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__67).value)[$unwrapTraitObject(0)]).kind == "PatternMismatch") {
          var _$unwrapTraitObject50 = $unwrapTraitObject(__PUCK__value__67),
              _$unwrapTraitObject51 = _slicedToArray(_$unwrapTraitObject50.value, 1),
              _$unwrapTraitObject52 = _slicedToArray(_$unwrapTraitObject51[0].value, 3),
              pattern = _$unwrapTraitObject52[0],
              to = _$unwrapTraitObject52[1],
              subject = _$unwrapTraitObject52[2];

          reportError({ type: '$Expression', value: e.expression, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(to, subject));
        } else {
          var __PUCK__value__68 = __PUCK__value__65;
          if (true) {
            var __PUCK__value__69 = __PUCK__value__68;
          };
        };
      };
      $unwrapTraitObject(self).visitBlock(e.then_, isUsed);
      var __PUCK__value__70 = e.else_;
      if ($unwrapTraitObject(__PUCK__value__70).kind == "Some") {
        var _$unwrapTraitObject53 = $unwrapTraitObject(__PUCK__value__70),
            _$unwrapTraitObject54 = _slicedToArray(_$unwrapTraitObject53.value, 1),
            else_ = _$unwrapTraitObject54[0];

        $unwrapTraitObject(self).visitBlock(else_, isUsed);
      };
      if (isUsed) {
        var __PUCK__value__71 = e.else_;
        var __PUCK__value__72 = void 0;
        if ($unwrapTraitObject(__PUCK__value__71).kind == "Some") {
          var _$unwrapTraitObject55 = $unwrapTraitObject(__PUCK__value__71),
              _$unwrapTraitObject56 = _slicedToArray(_$unwrapTraitObject55.value, 1),
              _else_2 = _$unwrapTraitObject56[0];

          var _result = (0, _types.findCommonType)([e.then_.type_, _else_2.type_]);
          var __PUCK__value__73 = _result;
          var __PUCK__value__74 = __PUCK__value__73;
          var __PUCK__value__75 = void 0;
          if ($unwrapTraitObject(__PUCK__value__74).kind == "Ok") {
            var _$unwrapTraitObject57 = $unwrapTraitObject(__PUCK__value__74),
                _$unwrapTraitObject58 = _slicedToArray(_$unwrapTraitObject57.value, 1),
                type_ = _$unwrapTraitObject58[0];

            __PUCK__value__75 = type_;
          } else {
            var __PUCK__value__76 = __PUCK__value__73;
            var __PUCK__value__77 = void 0;
            if ($unwrapTraitObject(__PUCK__value__76).kind == "Err") {
              var _$unwrapTraitObject59 = $unwrapTraitObject(__PUCK__value__76),
                  _$unwrapTraitObject60 = _slicedToArray(_$unwrapTraitObject59.value, 1),
                  __PUCK__value__78 = _$unwrapTraitObject60[0];

              __PUCK__value__77 = reportError({ type: '$IfLetExpression', value: e, $isTraitObject: true }, "Type " + _entities.Type.displayName.call(e.then_.type_) + " and " + _entities.Type.displayName.call(asType(_else_2.type_)) + " is not compatible");
            };
            __PUCK__value__75 = __PUCK__value__77;
          };
          __PUCK__value__72 = __PUCK__value__75;
        } else {
          __PUCK__value__72 = {
            displayName: _core.None,
            name: _core.None,
            kind: _entities.TypeKind.Struct({
              implementations: [],
              kind: _entities.StructKind.Tuple({ properties: [] })
            }),
            _class: _core.None,
            instance: _core.None
          };
        };
        e.type_ = __PUCK__value__72;
      };
      return $unwrapTraitObject(self).scope = $unwrapTraitObject($unwrapTraitObject(self).scope).parent;
    },
    visitMatchExpression: function visitMatchExpression(e) {
      var self = this;
      e.scope = $unwrapTraitObject(self).scope;
      var oldMatchExpression = matchExpression;
      matchExpression = (0, _core.Some)(e);
      var isUsed = $unwrapTraitObject(self).isUsed;
      $unwrapTraitObject(self).visitExpression(e.expression);
      _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: e.patterns, $isTraitObject: true }, function (a) {
        return $unwrapTraitObject(self).visitMatchArm(a, isUsed);
      });
      var __PUCK__value__79 = (0, _enums.checkExhaustive)(e);
      if ($unwrapTraitObject(__PUCK__value__79).kind == "Err") {
        var _$unwrapTraitObject61 = $unwrapTraitObject(__PUCK__value__79),
            _$unwrapTraitObject62 = _slicedToArray(_$unwrapTraitObject61.value, 1),
            error = _$unwrapTraitObject62[0];

        reportError({ type: '$MatchExpression', value: e, $isTraitObject: true }, error);
      };
      if (isUsed) {
        var __PUCK__value__80 = void 0;
        if (_core.Iterable['$List<E>'].isNotEmpty.call({ type: '$List<E>', value: e.patterns, $isTraitObject: true })) {
          var __PUCK__value__81 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: e.patterns, $isTraitObject: true }, function (arm) {
            return arm.type_;
          });
          var result = (0, _types.findCommonType)(_core.Iterable[__PUCK__value__81.type].toList.call(__PUCK__value__81));
          var __PUCK__value__82 = result;
          var __PUCK__value__83 = __PUCK__value__82;
          var __PUCK__value__84 = void 0;
          if ($unwrapTraitObject(__PUCK__value__83).kind == "Ok") {
            var _$unwrapTraitObject63 = $unwrapTraitObject(__PUCK__value__83),
                _$unwrapTraitObject64 = _slicedToArray(_$unwrapTraitObject63.value, 1),
                type_ = _$unwrapTraitObject64[0];

            __PUCK__value__84 = type_;
          } else {
            var __PUCK__value__85 = __PUCK__value__82;
            var __PUCK__value__86 = void 0;
            if ($unwrapTraitObject(__PUCK__value__85).kind == "Err") {
              var _$unwrapTraitObject65 = $unwrapTraitObject(__PUCK__value__85),
                  _$unwrapTraitObject66 = _slicedToArray(_$unwrapTraitObject65.value, 1),
                  __PUCK__value__87 = _$unwrapTraitObject66[0];

              __PUCK__value__86 = reportError({ type: '$MatchExpression', value: e, $isTraitObject: true }, "Match arms return mixed types " + _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: e.patterns, $isTraitObject: true }, function (arm) {
                return _entities.Type.displayName.call(asType(arm.type_));
              }).value.join(", "));
            };
            __PUCK__value__84 = __PUCK__value__86;
          };
          __PUCK__value__80 = __PUCK__value__84;
        } else {
          __PUCK__value__80 = {
            displayName: _core.None,
            name: _core.None,
            kind: _entities.TypeKind.Struct({
              implementations: [],
              kind: _entities.StructKind.Tuple({ properties: [] })
            }),
            _class: _core.None,
            instance: _core.None
          };
        };
        e.type_ = __PUCK__value__80;
      };
      return matchExpression = oldMatchExpression;
    },
    visitMatchArm: function visitMatchArm(a, isUsed) {
      var self = this;
      $unwrapTraitObject(self).scope = (0, _scope.createScope)(context, file, $unwrapTraitObject(self).scope);
      a.scope = $unwrapTraitObject(self).scope;
      var m = _core.Option.unwrap.call(matchExpression);
      var result = (0, _structure_visitor.declarePatternVariables)(a.scope, self, a.pattern, false, _ast.Expression.getType.call(m.expression), true);
      var __PUCK__value__88 = result;
      var __PUCK__value__89 = __PUCK__value__88;
      if ($unwrapTraitObject(__PUCK__value__89).kind == "Ok") {
        var _$unwrapTraitObject67 = $unwrapTraitObject(__PUCK__value__89),
            _$unwrapTraitObject68 = _slicedToArray(_$unwrapTraitObject67.value, 1),
            patternTy = _$unwrapTraitObject68[0];

        if (!(0, _types.isAssignable)(_ast.Expression.getType.call(m.expression), patternTy)) {
          reportError({ type: '$MatchArm', value: a, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(_ast.Expression.getType.call(m.expression), patternTy));
        };
      } else {
        var __PUCK__value__90 = __PUCK__value__88;
        if ($unwrapTraitObject(__PUCK__value__90).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__90).value)[$unwrapTraitObject(0)]).kind == "PatternMismatch") {
          var _$unwrapTraitObject69 = $unwrapTraitObject(__PUCK__value__90),
              _$unwrapTraitObject70 = _slicedToArray(_$unwrapTraitObject69.value, 1),
              _$unwrapTraitObject71 = _slicedToArray(_$unwrapTraitObject70[0].value, 3),
              pattern = _$unwrapTraitObject71[0],
              to = _$unwrapTraitObject71[1],
              subject = _$unwrapTraitObject71[2];

          reportError({ type: '$MatchArm', value: a, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(to, subject));
        } else {
          var __PUCK__value__91 = __PUCK__value__88;
          if (true) {
            var __PUCK__value__92 = __PUCK__value__91;
          };
        };
      };
      $unwrapTraitObject(self).visitBlock(a.block, isUsed);
      a.type_ = a.block.type_;
      return $unwrapTraitObject(self).scope = $unwrapTraitObject($unwrapTraitObject(self).scope).parent;
    },
    visitTypePathExpression: function visitTypePathExpression(e) {
      var self = this;
      e.scope = $unwrapTraitObject(self).scope;
      var typePath = e.typePath;
      var __PUCK__value__93 = typePath;
      if ($unwrapTraitObject(__PUCK__value__93).kind == "_Object") {
        var _$unwrapTraitObject72 = $unwrapTraitObject(__PUCK__value__93),
            _$unwrapTraitObject73 = _slicedToArray(_$unwrapTraitObject72.value, 2),
            object = _$unwrapTraitObject73[0],
            _typePath = _$unwrapTraitObject73[1];

        var binding = $unwrapTraitObject(e.scope).getTypeBinding(object.name);
        if (!binding) {
          reportError({ type: '$TypePathExpression', value: e, $isTraitObject: true }, "Use of undeclared type " + object.name);
        };
        var type_ = $unwrapTraitObject(binding).type_;
        var __PUCK__value__94 = _typePath;
        if ($unwrapTraitObject(__PUCK__value__94).kind == "Member") {
          var _ret3 = function () {
            var _$unwrapTraitObject74 = $unwrapTraitObject(__PUCK__value__94),
                _$unwrapTraitObject75 = _slicedToArray(_$unwrapTraitObject74.value, 1),
                memberIdentifier = _$unwrapTraitObject75[0];

            var __PUCK__value__95 = type_.kind;
            if ($unwrapTraitObject(__PUCK__value__95).kind == "Enum") {
              var _$unwrapTraitObject76 = $unwrapTraitObject(__PUCK__value__95),
                  _$unwrapTraitObject77 = _slicedToArray(_$unwrapTraitObject76.value, 1),
                  enum_ = _$unwrapTraitObject77[0];

              var member = enum_.members[memberIdentifier.name];
              if (!member) {
                return {
                  v: reportError({ type: '$Identifier', value: memberIdentifier, $isTraitObject: true }, _entities.Type.displayName.call(type_) + " has no member named " + memberIdentifier.name)
                };
              } else {
                var __PUCK__value__96 = member.kind;
                var __PUCK__value__97 = __PUCK__value__96;
                if ($unwrapTraitObject(__PUCK__value__97).kind == "Struct") {
                  var _$unwrapTraitObject78 = $unwrapTraitObject(__PUCK__value__97),
                      _$unwrapTraitObject79 = _slicedToArray(_$unwrapTraitObject78.value, 1),
                      struct = _$unwrapTraitObject79[0];

                  var __PUCK__value__98 = struct.kind;
                  var __PUCK__value__99 = __PUCK__value__98;
                  if ($unwrapTraitObject(__PUCK__value__99).kind == "Record") {
                    var _$unwrapTraitObject80 = $unwrapTraitObject(__PUCK__value__99),
                        _$unwrapTraitObject81 = _slicedToArray(_$unwrapTraitObject80.value, 1),
                        record = _$unwrapTraitObject81[0];

                    var __PUCK__value__100 = type_._class;
                    var __PUCK__value__101 = void 0;
                    if ($unwrapTraitObject(__PUCK__value__100).kind == "Some") {
                      var _$unwrapTraitObject82 = $unwrapTraitObject(__PUCK__value__100),
                          _$unwrapTraitObject83 = _slicedToArray(_$unwrapTraitObject82.value, 1),
                          _class = _$unwrapTraitObject83[0];

                      __PUCK__value__101 = (0, _types.createTypeInstance)(type_, asIterable(_class.typeParameters));
                    } else {
                      __PUCK__value__101 = type_;
                    };
                    return {
                      v: e.type_ = {
                        displayName: _core.Option.map.call(type_.name, function (name) {
                          return name + "::" + memberIdentifier.name;
                        }),
                        name: type_.name,
                        kind: _entities.TypeKind.Function({
                          selfBinding: _core.None,
                          parameters: [{
                            name: memberIdentifier.name,
                            token: { type: '$Identifier', value: memberIdentifier, $isTraitObject: true },
                            mutable: false,
                            type_: member,
                            redefined: false
                          }],
                          parameterRange: {
                            start: 1,
                            end: 2
                          },
                          returnType: __PUCK__value__101,
                          isAbstract: false
                        }),
                        _class: _core.Option.map.call(type_._class, function (_class) {
                          return $unwrapTraitObject(_js._Object).assign({}, _class, { instances: [] });
                        }),
                        instance: type_.instance
                      }
                    };
                  } else {
                    var __PUCK__value__102 = __PUCK__value__98;
                    if ($unwrapTraitObject(__PUCK__value__102).kind == "Tuple") {
                      var _$unwrapTraitObject84 = $unwrapTraitObject(__PUCK__value__102),
                          _$unwrapTraitObject85 = _slicedToArray(_$unwrapTraitObject84.value, 1),
                          tuple = _$unwrapTraitObject85[0];

                      var __PUCK__value__104 = _core.Iterable['$List<E>'].enumerate.call({ type: '$List<E>', value: tuple.properties, $isTraitObject: true });
                      var __PUCK__value__103 = _core.Iterable[__PUCK__value__104.type].map.call(__PUCK__value__104, function (_ref9) {
                        var _ref10 = _slicedToArray(_ref9, 2),
                            p = _ref10[0],
                            i = _ref10[1];

                        return {
                          name: i.toString(),
                          token: memberIdentifier,
                          mutable: false,
                          type_: p,
                          redefined: false
                        };
                      });
                      var __PUCK__value__105 = type_._class;
                      var __PUCK__value__106 = void 0;
                      if ($unwrapTraitObject(__PUCK__value__105).kind == "Some") {
                        var _$unwrapTraitObject86 = $unwrapTraitObject(__PUCK__value__105),
                            _$unwrapTraitObject87 = _slicedToArray(_$unwrapTraitObject86.value, 1),
                            _class2 = _$unwrapTraitObject87[0];

                        __PUCK__value__106 = (0, _types.createTypeInstance)(type_, asIterable(_class2.typeParameters));
                      } else {
                        __PUCK__value__106 = type_;
                      };
                      return {
                        v: e.type_ = {
                          displayName: _core.Option.map.call(type_.name, function (name) {
                            return name + "::" + memberIdentifier.name;
                          }),
                          name: type_.name,
                          kind: _entities.TypeKind.Function({
                            selfBinding: _core.None,
                            parameters: _core.Iterable[__PUCK__value__103.type].toList.call(__PUCK__value__103),
                            parameterRange: {
                              start: tuple.properties.length,
                              end: tuple.properties.length + 1
                            },
                            returnType: __PUCK__value__106,
                            isAbstract: false
                          }),
                          _class: _core.Option.map.call(type_._class, function (_class) {
                            return $unwrapTraitObject(_js._Object).assign({}, _class, { instances: [] });
                          }),
                          instance: type_.instance
                        }
                      };
                    } else {
                      var __PUCK__value__107 = __PUCK__value__98;
                      if ($unwrapTraitObject(__PUCK__value__107).kind == "Unit") {
                        var _undefined3 = $unwrapTraitObject(__PUCK__value__107);
                        return {
                          v: e.type_ = {
                            displayName: _core.Option.map.call(type_.name, function (name) {
                              return name + "::" + memberIdentifier.name;
                            }),
                            name: type_.name,
                            kind: type_.kind,
                            _class: type_._class,
                            instance: type_.instance
                          }
                        };
                      };
                    };
                  };
                } else {
                  var __PUCK__value__108 = __PUCK__value__96;
                  if (true) {
                    var __PUCK__value__109 = __PUCK__value__108;
                    throw "enum arm is not a struct";
                  };
                };
              };
            };
          }();

          if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
        } else {
          reportError({ type: '$TypePathExpression', value: e, $isTraitObject: true }, "Nested type paths are not supported");
          return [];
        };
      };
    },
    visitUnaryExpression: function visitUnaryExpression(e) {
      var self = this;
      e.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(visit).walkUnaryExpression(self, e);
      var __PUCK__value__110 = void 0;
      if (e.operator.kind == $unwrapTraitObject(_ast2.SyntaxKind).NotKeyword) {
        __PUCK__value__110 = $unwrapTraitObject($unwrapTraitObject(e.scope).getTypeBinding("Bool")).type_;
      } else {
        var __PUCK__value__111 = void 0;
        if (e.operator.kind == $unwrapTraitObject(_ast2.SyntaxKind).MinusToken || e.operator.kind == $unwrapTraitObject(_ast2.SyntaxKind).PlusToken) {
          __PUCK__value__111 = $unwrapTraitObject($unwrapTraitObject(e.scope).getTypeBinding("Num")).type_;
        };
        __PUCK__value__110 = __PUCK__value__111;
      };
      return e.type_ = __PUCK__value__110;
    },
    visitIndexAccess: function visitIndexAccess(a) {
      var self = this;
      a.scope = $unwrapTraitObject(self).scope;
      return $unwrapTraitObject(visit).walkIndexAccess(self, a);
    },
    visitMemberAccess: function visitMemberAccess(a) {
      var self = this;
      a.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(visit).walkExpression(self, a.object);
      if (_ast.Expression.getType.call(a.object)) {
        var __PUCK__value__112 = _ast.Expression.getType.call(a.object).kind;
        if ($unwrapTraitObject(__PUCK__value__112).kind == "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__112).value)[$unwrapTraitObject(0)]).kind).kind == "Record") {
          var _$unwrapTraitObject88 = $unwrapTraitObject(__PUCK__value__112),
              _$unwrapTraitObject89 = _slicedToArray(_$unwrapTraitObject88.value, 1),
              _$unwrapTraitObject90 = _slicedToArray(_$unwrapTraitObject89[0].kind.value, 1),
              record = _$unwrapTraitObject90[0];

          return a.type_ = record.properties[a.member.name];
        } else {};
      };
    },
    visitBooleanLiteral: function visitBooleanLiteral(l) {
      var self = this;
      l.scope = $unwrapTraitObject(self).scope;
      l.type_ = $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(self).scope).getTypeBinding("Bool")).type_;
      return $unwrapTraitObject(visit).walkBooleanLiteral(self, l);
    },
    visitListLiteral: function visitListLiteral(l) {
      var self = this;
      l.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(visit).walkListLiteral(self, l);
      if (l.members.length >= 1) {
        var __PUCK__value__113 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: l.members, $isTraitObject: true }, function (m) {
          return _ast.Expression.getType.call(m);
        });
        var types = _core.Iterable[__PUCK__value__113.type].toList.call(__PUCK__value__113);
        var result = (0, _types.findCommonType)(types);
        var __PUCK__value__114 = result;
        var __PUCK__value__115 = __PUCK__value__114;
        if ($unwrapTraitObject(__PUCK__value__115).kind == "Ok") {
          var _$unwrapTraitObject91 = $unwrapTraitObject(__PUCK__value__115),
              _$unwrapTraitObject92 = _slicedToArray(_$unwrapTraitObject91.value, 1),
              type_ = _$unwrapTraitObject92[0];

          if (!type_) {
            return l.type_ = $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(self).scope).getTypeBinding("List")).type_;
          } else {
            return l.type_ = (0, _types.createTypeInstance)($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(self).scope).getTypeBinding("List")).type_, asIterable([type_]));
          };
        } else {
          var __PUCK__value__116 = __PUCK__value__114;
          if ($unwrapTraitObject(__PUCK__value__116).kind == "Err") {
            var _$unwrapTraitObject93 = $unwrapTraitObject(__PUCK__value__116),
                _$unwrapTraitObject94 = _slicedToArray(_$unwrapTraitObject93.value, 1),
                __PUCK__value__117 = _$unwrapTraitObject94[0];

            return reportError({ type: '$ListLiteral', value: l, $isTraitObject: true }, "List contains mixed types");
          };
        };
      } else {
        return l.type_ = $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(self).scope).getTypeBinding("List")).type_;
      };
    },
    visitNumberLiteral: function visitNumberLiteral(l) {
      var self = this;
      l.scope = $unwrapTraitObject(self).scope;
      l.type_ = $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(self).scope).getTypeBinding("Num")).type_;
      return $unwrapTraitObject(visit).walkNumberLiteral(self, l);
    },
    visitRecordLiteral: function visitRecordLiteral(l) {
      var self = this;
      l.scope = $unwrapTraitObject(self).scope;
      _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: l.members, $isTraitObject: true }, function (m) {
        return $unwrapTraitObject(self).visitExpression(m.value);
      });
      return l.type_ = {
        displayName: _core.None,
        name: _core.None,
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: _entities.StructKind.Record({ properties: _core.ObjectMap.fromIter(_core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: l.members, $isTraitObject: true }, function (m) {
              return [m.name.name, _ast.Expression.getType.call(m.value)];
            })) })
        }),
        _class: _core.None,
        instance: _core.None
      };
    },
    visitStringLiteral: function visitStringLiteral(l) {
      var self = this;
      l.scope = $unwrapTraitObject(self).scope;
      l.type_ = $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(self).scope).getTypeBinding("String")).type_;
      return $unwrapTraitObject(visit).walkStringLiteral(self, l);
    },
    visitTupleLiteral: function visitTupleLiteral(l) {
      var self = this;
      l.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(visit).walkTupleLiteral(self, l);
      var __PUCK__value__118 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: l.expressions, $isTraitObject: true }, function (e) {
        return _ast.Expression.getType.call(e);
      });
      return l.type_ = {
        displayName: _core.None,
        name: _core.None,
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: _entities.StructKind.Tuple({ properties: _core.Iterable[__PUCK__value__118.type].toList.call(__PUCK__value__118) })
        }),
        _class: _core.None,
        instance: _core.None
      };
    },
    visitPattern: function visitPattern(p) {
      var self = this;
      p.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(visit).walkPattern(self, p);
      var __PUCK__value__119 = p;
      var __PUCK__value__120 = __PUCK__value__119;
      var __PUCK__value__121 = void 0;
      if ($unwrapTraitObject(__PUCK__value__120).kind == "CatchAll") {
        var _undefined4 = $unwrapTraitObject(__PUCK__value__120);
        __PUCK__value__121 = _js._undefined;
      } else {
        var __PUCK__value__122 = __PUCK__value__119;
        var __PUCK__value__123 = void 0;
        if ($unwrapTraitObject(__PUCK__value__122).kind == "Identifier") {
          var _$unwrapTraitObject95 = $unwrapTraitObject(__PUCK__value__122),
              _$unwrapTraitObject96 = _slicedToArray(_$unwrapTraitObject95.value, 1),
              identifier = _$unwrapTraitObject96[0];

          __PUCK__value__123 = _js._undefined;
        } else {
          var __PUCK__value__124 = __PUCK__value__119;
          var __PUCK__value__125 = void 0;
          if ($unwrapTraitObject(__PUCK__value__124).kind == "Record") {
            var _$unwrapTraitObject97 = $unwrapTraitObject(__PUCK__value__124),
                _$unwrapTraitObject98 = _slicedToArray(_$unwrapTraitObject97.value, 1),
                record = _$unwrapTraitObject98[0];

            __PUCK__value__125 = record.type_;
          } else {
            var __PUCK__value__126 = __PUCK__value__119;
            var __PUCK__value__127 = void 0;
            if ($unwrapTraitObject(__PUCK__value__126).kind == "RecordType") {
              var _$unwrapTraitObject99 = $unwrapTraitObject(__PUCK__value__126),
                  _$unwrapTraitObject100 = _slicedToArray(_$unwrapTraitObject99.value, 2),
                  typePath = _$unwrapTraitObject100[0],
                  _record = _$unwrapTraitObject100[1];

              __PUCK__value__127 = typePath.type_;
            } else {
              var __PUCK__value__128 = __PUCK__value__119;
              var __PUCK__value__129 = void 0;
              if ($unwrapTraitObject(__PUCK__value__128).kind == "Tuple") {
                var _$unwrapTraitObject101 = $unwrapTraitObject(__PUCK__value__128),
                    _$unwrapTraitObject102 = _slicedToArray(_$unwrapTraitObject101.value, 1),
                    tuple = _$unwrapTraitObject102[0];

                __PUCK__value__129 = tuple.type_;
              } else {
                var __PUCK__value__130 = __PUCK__value__119;
                var __PUCK__value__131 = void 0;
                if ($unwrapTraitObject(__PUCK__value__130).kind == "TupleType") {
                  var _$unwrapTraitObject103 = $unwrapTraitObject(__PUCK__value__130),
                      _$unwrapTraitObject104 = _slicedToArray(_$unwrapTraitObject103.value, 2),
                      _typePath2 = _$unwrapTraitObject104[0],
                      _tuple = _$unwrapTraitObject104[1];

                  __PUCK__value__131 = _typePath2.type_;
                } else {
                  var __PUCK__value__132 = __PUCK__value__119;
                  var __PUCK__value__133 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__132).kind == "UnitType") {
                    var _undefined5 = $unwrapTraitObject(__PUCK__value__132);
                    __PUCK__value__133 = _entities.Type.empty();
                  };
                  __PUCK__value__131 = __PUCK__value__133;
                };
                __PUCK__value__129 = __PUCK__value__131;
              };
              __PUCK__value__127 = __PUCK__value__129;
            };
            __PUCK__value__125 = __PUCK__value__127;
          };
          __PUCK__value__123 = __PUCK__value__125;
        };
        __PUCK__value__121 = __PUCK__value__123;
      };
      return p.type_ = __PUCK__value__121;
    },
    visitRecordPattern: function visitRecordPattern(p) {
      var self = this;
      p.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(visit).walkRecordPattern(self, p);
      return p.type_ = {
        displayName: _core.None,
        name: _core.None,
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: _entities.StructKind.Record({ properties: _core.ObjectMap.fromIter(_core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: p.properties, $isTraitObject: true }, function (p) {
              return [p.property, p.local && $unwrapTraitObject(p.local).type_];
            })) })
        }),
        instance: _core.None,
        _class: _core.None
      };
    },
    visitTuplePattern: function visitTuplePattern(p) {
      var self = this;
      p.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(visit).walkTuplePattern(self, p);
      var __PUCK__value__134 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: p.properties, $isTraitObject: true }, function (p) {
        return p.type_;
      });
      return p.type_ = {
        displayName: _core.None,
        name: _core.None,
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: _entities.StructKind.Tuple({ properties: _core.Iterable[__PUCK__value__134.type].toList.call(__PUCK__value__134) })
        }),
        instance: _core.None,
        _class: _core.None
      };
    }
  });
}
