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
  return $unwrapTraitObject(_js._Object).assign({}, visit.walkingVisitor, structureVisitorInstance, {
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
      return $unwrapTraitObject($unwrapTraitObject(visit.walkingVisitor).visitExpression).call(self, e);
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
        reportError({ type: '$Identifier', value: i, $isTraitObject: true }, "Use of undefined variable " + i.name);
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
        _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: f.parameterList, $isTraitObject: true }, function (p) {
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
      return visit.walkBinaryExpression(self, e);
    },
    visitCallExpression: function visitCallExpression(e) {
      var self = this;
      e.scope = $unwrapTraitObject(self).scope;
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

                functionType = $unwrapTraitObject(_core.Option.unwrapOr.call(_core.Option.map.call(_core.Iterable['$List<E>'].find.call({ type: '$List<E>', value: enum_.implementations, $isTraitObject: true }, function (_ref7) {
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

                  functionType = $unwrapTraitObject(_core.Option.unwrapOr.call(_core.Option.map.call(_core.Iterable['$List<E>'].find.call({ type: '$List<E>', value: struct.implementations, $isTraitObject: true }, function (_ref9) {
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
                  reportError({ type: '$CallExpression', value: e, $isTraitObject: true }, _entities.Type.displayName.call(providesType) + "::" + name + " takes a self parameter and can't be called directly");
                } else {
                  e.traitName = _core.Option.unwrap.call(providesType.name);
                  e.isTraitObject = true;
                };
              } else {
                reportError({ type: '$CallExpression', value: e, $isTraitObject: true }, _entities.Type.displayName.call(providesType) + " has no function named " + name + "");
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
                    e.traitName = _core.Option.unwrap.call(objectType.name);
                    e.isTraitObject = true;
                  };
                };
              } else {
                var __PUCK__value__60 = (0, _impls.getImplementation)(name, objectType, e, reportError);
                if ($unwrapTraitObject(__PUCK__value__60).kind == "Some") {
                  var _$unwrapTraitObject44 = $unwrapTraitObject(__PUCK__value__60),
                      _$unwrapTraitObject45 = _slicedToArray(_$unwrapTraitObject44.value, 1),
                      implementation = _$unwrapTraitObject45[0];

                  var __PUCK__value__61 = implementation.trait_.instance;
                  var __PUCK__value__62 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__61).kind == "Some") {
                    var _$unwrapTraitObject46 = $unwrapTraitObject(__PUCK__value__61),
                        _$unwrapTraitObject47 = _slicedToArray(_$unwrapTraitObject46.value, 1),
                        instance = _$unwrapTraitObject47[0];

                    __PUCK__value__62 = instance._class;
                  } else {
                    __PUCK__value__62 = implementation.trait_;
                  };
                  var _trait_2 = __PUCK__value__62;
                  var traitName = _core.Option.unwrap.call(_trait_2.name);
                  var scope = e.scope;
                  if (_core.Option.isNone.call(_scope.Scope.getBinding.call(scope, traitName))) {
                    reportError({ type: '$CallExpression', value: e, $isTraitObject: true }, "The function " + name + " is defined in trait " + traitName + " but it is not in scope");
                  };
                  e.traitName = traitName;
                  e.isShorthand = _entities.Type.getTrait.call(_trait_2).isShorthand;
                  e.implementationType = implementation.type_;
                  functionType = _entities.Type.getTrait.call(asType(implementation.trait_)).functions[name];
                };
              };
              var __PUCK__value__63 = objectType.instance;
              if ($unwrapTraitObject(__PUCK__value__63).kind == "Some") {
                var _$unwrapTraitObject48 = $unwrapTraitObject(__PUCK__value__63),
                    _$unwrapTraitObject49 = _slicedToArray(_$unwrapTraitObject48.value, 1),
                    _instance = _$unwrapTraitObject49[0];

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
          var __PUCK__value__64 = _core.Iterable['$List<E>'].enumerate.call({ type: '$List<E>', value: e.argumentList, $isTraitObject: true });
          _core.Iterable[__PUCK__value__64.type].forEach.call(__PUCK__value__64, function (_ref11) {
            var _ref12 = _slicedToArray(_ref11, 2),
                a = _ref12[0],
                i = _ref12[1];

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
        parentAssignedTo = $unwrapTraitObject(self).assignedTo;
        $unwrapTraitObject(self).assignedTo = _js._undefined;
        _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: e.argumentList, $isTraitObject: true }, function (a) {
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
      var __PUCK__value__65 = e.else_;
      if ($unwrapTraitObject(__PUCK__value__65).kind == "Some") {
        var _$unwrapTraitObject50 = $unwrapTraitObject(__PUCK__value__65),
            _$unwrapTraitObject51 = _slicedToArray(_$unwrapTraitObject50.value, 1),
            else_ = _$unwrapTraitObject51[0];

        $unwrapTraitObject(self).visitBlock(else_, isUsed);
      };
      if (isUsed) {
        var __PUCK__value__66 = e.else_;
        var __PUCK__value__67 = void 0;
        if ($unwrapTraitObject(__PUCK__value__66).kind == "Some") {
          var _$unwrapTraitObject52 = $unwrapTraitObject(__PUCK__value__66),
              _$unwrapTraitObject53 = _slicedToArray(_$unwrapTraitObject52.value, 1),
              _else_ = _$unwrapTraitObject53[0];

          var __PUCK__value__68 = (0, _types.findCommonType)([e.then_.type_, _else_.type_]);
          var __PUCK__value__69 = __PUCK__value__68;
          var __PUCK__value__70 = void 0;
          if ($unwrapTraitObject(__PUCK__value__69).kind == "Ok") {
            var _$unwrapTraitObject54 = $unwrapTraitObject(__PUCK__value__69),
                _$unwrapTraitObject55 = _slicedToArray(_$unwrapTraitObject54.value, 1),
                type_ = _$unwrapTraitObject55[0];

            __PUCK__value__70 = type_;
          } else {
            var __PUCK__value__71 = __PUCK__value__68;
            var __PUCK__value__72 = void 0;
            if ($unwrapTraitObject(__PUCK__value__71).kind == "Err") {
              var _$unwrapTraitObject56 = $unwrapTraitObject(__PUCK__value__71),
                  _$unwrapTraitObject57 = _slicedToArray(_$unwrapTraitObject56.value, 1),
                  __PUCK__value__73 = _$unwrapTraitObject57[0];

              __PUCK__value__72 = reportError({ type: '$IfExpression', value: e, $isTraitObject: true }, "Type " + _entities.Type.displayName.call(e.then_.type_) + " and " + _entities.Type.displayName.call(asType(_else_.type_)) + " is not compatible");
            };
            __PUCK__value__70 = __PUCK__value__72;
          };
          __PUCK__value__67 = __PUCK__value__70;
        } else {
          __PUCK__value__67 = {
            displayName: _core.None,
            name: _core.None,
            kind: _entities.TypeKind.Struct({
              implementations: [],
              kind: _entities.StructKind.Tuple({ properties: [] })
            }),
            _class: _core.None,
            instance: _core.None,
            providesType: _core.None,
            enumMember: _core.None
          };
        };
        e.type_ = __PUCK__value__67;
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
      var __PUCK__value__74 = (0, _patterns.declarePatternVariables)(e.scope, self, e.pattern, false, _ast.Expression.getType.call(e.expression), true);
      var __PUCK__value__75 = __PUCK__value__74;
      if ($unwrapTraitObject(__PUCK__value__75).kind == "Ok") {
        var _$unwrapTraitObject58 = $unwrapTraitObject(__PUCK__value__75),
            _$unwrapTraitObject59 = _slicedToArray(_$unwrapTraitObject58.value, 1),
            __PUCK__value__76 = _$unwrapTraitObject59[0];
      } else {
        var __PUCK__value__77 = __PUCK__value__74;
        if ($unwrapTraitObject(__PUCK__value__77).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__77).value)[$unwrapTraitObject(0)]).kind == "PatternMismatch") {
          var _$unwrapTraitObject60 = $unwrapTraitObject(__PUCK__value__77),
              _$unwrapTraitObject61 = _slicedToArray(_$unwrapTraitObject60.value, 1),
              _$unwrapTraitObject62 = _slicedToArray(_$unwrapTraitObject61[0].value, 3),
              pattern = _$unwrapTraitObject62[0],
              to = _$unwrapTraitObject62[1],
              subject = _$unwrapTraitObject62[2];

          reportError({ type: '$Expression', value: e.expression, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(to, subject));
        } else {
          var __PUCK__value__78 = __PUCK__value__74;
          if ($unwrapTraitObject(__PUCK__value__78).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__78).value)[$unwrapTraitObject(0)]).kind == "ScopeError") {
            var _$unwrapTraitObject63 = $unwrapTraitObject(__PUCK__value__78),
                _$unwrapTraitObject64 = _slicedToArray(_$unwrapTraitObject63.value, 1),
                _$unwrapTraitObject65 = _slicedToArray(_$unwrapTraitObject64[0].value, 2),
                token = _$unwrapTraitObject65[0],
                err = _$unwrapTraitObject65[1];

            reportError(token, err);
          } else {
            var __PUCK__value__79 = __PUCK__value__74;
            if ($unwrapTraitObject(__PUCK__value__79).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__79).value)[$unwrapTraitObject(0)]).kind == "NotExhaustive") {
              var _$unwrapTraitObject66 = $unwrapTraitObject(__PUCK__value__79),
                  _$unwrapTraitObject67 = _toArray(_$unwrapTraitObject66.value);
            };
          };
        };
      };
      $unwrapTraitObject(self).visitBlock(e.then_, isUsed);
      var __PUCK__value__80 = e.else_;
      if ($unwrapTraitObject(__PUCK__value__80).kind == "Some") {
        var _$unwrapTraitObject68 = $unwrapTraitObject(__PUCK__value__80),
            _$unwrapTraitObject69 = _slicedToArray(_$unwrapTraitObject68.value, 1),
            else_ = _$unwrapTraitObject69[0];

        $unwrapTraitObject(self).visitBlock(else_, isUsed);
      };
      if (isUsed) {
        var __PUCK__value__81 = e.else_;
        var __PUCK__value__82 = void 0;
        if ($unwrapTraitObject(__PUCK__value__81).kind == "Some") {
          var _$unwrapTraitObject70 = $unwrapTraitObject(__PUCK__value__81),
              _$unwrapTraitObject71 = _slicedToArray(_$unwrapTraitObject70.value, 1),
              _else_2 = _$unwrapTraitObject71[0];

          var __PUCK__value__83 = (0, _types.findCommonType)([e.then_.type_, _else_2.type_]);
          var __PUCK__value__84 = __PUCK__value__83;
          var __PUCK__value__85 = void 0;
          if ($unwrapTraitObject(__PUCK__value__84).kind == "Ok") {
            var _$unwrapTraitObject72 = $unwrapTraitObject(__PUCK__value__84),
                _$unwrapTraitObject73 = _slicedToArray(_$unwrapTraitObject72.value, 1),
                type_ = _$unwrapTraitObject73[0];

            __PUCK__value__85 = type_;
          } else {
            var __PUCK__value__86 = __PUCK__value__83;
            var __PUCK__value__87 = void 0;
            if ($unwrapTraitObject(__PUCK__value__86).kind == "Err") {
              var _$unwrapTraitObject74 = $unwrapTraitObject(__PUCK__value__86),
                  _$unwrapTraitObject75 = _slicedToArray(_$unwrapTraitObject74.value, 1),
                  __PUCK__value__88 = _$unwrapTraitObject75[0];

              __PUCK__value__87 = reportError({ type: '$IfLetExpression', value: e, $isTraitObject: true }, "Type " + _entities.Type.displayName.call(e.then_.type_) + " and " + _entities.Type.displayName.call(asType(_else_2.type_)) + " is not compatible");
            };
            __PUCK__value__85 = __PUCK__value__87;
          };
          __PUCK__value__82 = __PUCK__value__85;
        } else {
          __PUCK__value__82 = {
            displayName: _core.None,
            name: _core.None,
            kind: _entities.TypeKind.Struct({
              implementations: [],
              kind: _entities.StructKind.Tuple({ properties: [] })
            }),
            _class: _core.None,
            instance: _core.None,
            providesType: _core.None,
            enumMember: _core.None
          };
        };
        e.type_ = __PUCK__value__82;
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
      _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: e.patterns, $isTraitObject: true }, function (a) {
        return $unwrapTraitObject(self).visitMatchArm(a, isUsed);
      });
      var __PUCK__value__89 = (0, _enums.checkExhaustive)(e);
      if ($unwrapTraitObject(__PUCK__value__89).kind == "Err") {
        var _$unwrapTraitObject76 = $unwrapTraitObject(__PUCK__value__89),
            _$unwrapTraitObject77 = _slicedToArray(_$unwrapTraitObject76.value, 1),
            error = _$unwrapTraitObject77[0];

        reportError({ type: '$MatchExpression', value: e, $isTraitObject: true }, error);
      };
      if (isUsed) {
        var __PUCK__value__90 = void 0;
        if (_core.Iterable['$List<E>'].isNotEmpty.call({ type: '$List<E>', value: e.patterns, $isTraitObject: true })) {
          var __PUCK__value__92 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: e.patterns, $isTraitObject: true }, function (arm) {
            return arm.type_;
          });
          var __PUCK__value__91 = (0, _types.findCommonType)(_core.Iterable[__PUCK__value__92.type].toList.call(__PUCK__value__92));
          var __PUCK__value__93 = __PUCK__value__91;
          var __PUCK__value__94 = void 0;
          if ($unwrapTraitObject(__PUCK__value__93).kind == "Ok") {
            var _$unwrapTraitObject78 = $unwrapTraitObject(__PUCK__value__93),
                _$unwrapTraitObject79 = _slicedToArray(_$unwrapTraitObject78.value, 1),
                type_ = _$unwrapTraitObject79[0];

            __PUCK__value__94 = type_;
          } else {
            var __PUCK__value__95 = __PUCK__value__91;
            var __PUCK__value__96 = void 0;
            if ($unwrapTraitObject(__PUCK__value__95).kind == "Err") {
              var _$unwrapTraitObject80 = $unwrapTraitObject(__PUCK__value__95),
                  _$unwrapTraitObject81 = _slicedToArray(_$unwrapTraitObject80.value, 1),
                  __PUCK__value__97 = _$unwrapTraitObject81[0];

              __PUCK__value__96 = reportError({ type: '$MatchExpression', value: e, $isTraitObject: true }, "Match arms return mixed types " + _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: e.patterns, $isTraitObject: true }, function (arm) {
                return _entities.Type.displayName.call(asType(arm.type_));
              }).value.join(", "));
            };
            __PUCK__value__94 = __PUCK__value__96;
          };
          __PUCK__value__90 = __PUCK__value__94;
        } else {
          __PUCK__value__90 = {
            displayName: _core.None,
            name: _core.None,
            kind: _entities.TypeKind.Struct({
              implementations: [],
              kind: _entities.StructKind.Tuple({ properties: [] })
            }),
            _class: _core.None,
            instance: _core.None,
            providesType: _core.None,
            enumMember: _core.None
          };
        };
        e.type_ = __PUCK__value__90;
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
      var __PUCK__value__98 = (0, _patterns.declarePatternVariables)(a.scope, self, a.pattern, false, _ast.Expression.getType.call(m.expression), true);
      var __PUCK__value__99 = __PUCK__value__98;
      if ($unwrapTraitObject(__PUCK__value__99).kind == "Ok") {
        var _$unwrapTraitObject82 = $unwrapTraitObject(__PUCK__value__99),
            _$unwrapTraitObject83 = _slicedToArray(_$unwrapTraitObject82.value, 1),
            __PUCK__value__100 = _$unwrapTraitObject83[0];
      } else {
        var __PUCK__value__101 = __PUCK__value__98;
        if ($unwrapTraitObject(__PUCK__value__101).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__101).value)[$unwrapTraitObject(0)]).kind == "PatternMismatch") {
          var _$unwrapTraitObject84 = $unwrapTraitObject(__PUCK__value__101),
              _$unwrapTraitObject85 = _slicedToArray(_$unwrapTraitObject84.value, 1),
              _$unwrapTraitObject86 = _slicedToArray(_$unwrapTraitObject85[0].value, 3),
              pattern = _$unwrapTraitObject86[0],
              to = _$unwrapTraitObject86[1],
              subject = _$unwrapTraitObject86[2];

          reportError({ type: '$MatchArm', value: a, $isTraitObject: true }, (0, _structure_visitor.notAssignableError)(to, subject));
        } else {
          var __PUCK__value__102 = __PUCK__value__98;
          if ($unwrapTraitObject(__PUCK__value__102).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__102).value)[$unwrapTraitObject(0)]).kind == "ScopeError") {
            var _$unwrapTraitObject87 = $unwrapTraitObject(__PUCK__value__102),
                _$unwrapTraitObject88 = _slicedToArray(_$unwrapTraitObject87.value, 1),
                _$unwrapTraitObject89 = _slicedToArray(_$unwrapTraitObject88[0].value, 2),
                token = _$unwrapTraitObject89[0],
                err = _$unwrapTraitObject89[1];

            reportError(token, err);
          } else {
            var __PUCK__value__103 = __PUCK__value__98;
            if ($unwrapTraitObject(__PUCK__value__103).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__103).value)[$unwrapTraitObject(0)]).kind == "NotExhaustive") {
              var _$unwrapTraitObject90 = $unwrapTraitObject(__PUCK__value__103),
                  _$unwrapTraitObject91 = _toArray(_$unwrapTraitObject90.value);
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
        e.type_ = _core.Option.unwrap.call(_core.Option.unwrap.call(_scope.Scope.getBinding.call(scope, "Bool")).type_.providesType);
      } else {
        if (e.operator.kind == $unwrapTraitObject(_ast2.SyntaxKind).MinusToken || e.operator.kind == $unwrapTraitObject(_ast2.SyntaxKind).PlusToken) {
          e.type_ = _core.Option.unwrap.call(_core.Option.unwrap.call(_scope.Scope.getBinding.call(scope, "Num")).type_.providesType);
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
        var __PUCK__value__104 = _ast.Expression.getType.call(a.object).kind;
        if ($unwrapTraitObject(__PUCK__value__104).kind == "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__104).value)[$unwrapTraitObject(0)]).kind).kind == "Record") {
          var _$unwrapTraitObject92 = $unwrapTraitObject(__PUCK__value__104),
              _$unwrapTraitObject93 = _slicedToArray(_$unwrapTraitObject92.value, 1),
              _$unwrapTraitObject94 = _slicedToArray(_$unwrapTraitObject93[0].kind.value, 1),
              record = _$unwrapTraitObject94[0];

          return a.type_ = record.properties[a.member.name];
        } else {};
      };
    },
    visitBooleanLiteral: function visitBooleanLiteral(l) {
      var self = this;
      var scope = $unwrapTraitObject(self).scope;
      l.scope = $unwrapTraitObject(self).scope;
      l.type_ = _core.Option.unwrap.call(_core.Option.unwrap.call(_scope.Scope.getBinding.call(scope, "Bool")).type_.providesType);
      return visit.walkBooleanLiteral(self, l);
    },
    visitListLiteral: function visitListLiteral(l) {
      var self = this;
      var scope = $unwrapTraitObject(self).scope;
      var listType = _core.Option.unwrap.call(_core.Option.unwrap.call(_scope.Scope.getBinding.call(scope, "List")).type_.providesType);
      l.scope = $unwrapTraitObject(self).scope;
      visit.walkListLiteral(self, l);
      if (l.members.length >= 1) {
        var __PUCK__value__105 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: l.members, $isTraitObject: true }, function (m) {
          return _ast.Expression.getType.call(m);
        });
        var types = _core.Iterable[__PUCK__value__105.type].toList.call(__PUCK__value__105);
        var result = (0, _types.findCommonType)(types);
        var __PUCK__value__106 = result;
        var __PUCK__value__107 = __PUCK__value__106;
        if ($unwrapTraitObject(__PUCK__value__107).kind == "Ok") {
          var _$unwrapTraitObject95 = $unwrapTraitObject(__PUCK__value__107),
              _$unwrapTraitObject96 = _slicedToArray(_$unwrapTraitObject95.value, 1),
              type_ = _$unwrapTraitObject96[0];

          if (!type_) {
            return l.type_ = listType;
          } else {
            return l.type_ = (0, _types.createTypeInstance)(listType, asIterable([type_]));
          };
        } else {
          var __PUCK__value__108 = __PUCK__value__106;
          if ($unwrapTraitObject(__PUCK__value__108).kind == "Err") {
            var _$unwrapTraitObject97 = $unwrapTraitObject(__PUCK__value__108),
                _$unwrapTraitObject98 = _slicedToArray(_$unwrapTraitObject97.value, 1),
                __PUCK__value__109 = _$unwrapTraitObject98[0];

            return reportError({ type: '$ListLiteral', value: l, $isTraitObject: true }, "List contains mixed types");
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
      l.type_ = _core.Option.unwrap.call(_core.Option.unwrap.call(_scope.Scope.getBinding.call(scope, "Num")).type_.providesType);
      return visit.walkNumberLiteral(self, l);
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
        instance: _core.None,
        providesType: _core.None,
        enumMember: _core.None
      };
    },
    visitStringLiteral: function visitStringLiteral(l) {
      var self = this;
      var scope = $unwrapTraitObject(self).scope;
      l.scope = $unwrapTraitObject(self).scope;
      l.type_ = _core.Option.unwrap.call(_core.Option.unwrap.call(_scope.Scope.getBinding.call(scope, "String")).type_.providesType);
      return visit.walkStringLiteral(self, l);
    },
    visitTupleLiteral: function visitTupleLiteral(l) {
      var self = this;
      l.scope = $unwrapTraitObject(self).scope;
      visit.walkTupleLiteral(self, l);
      var __PUCK__value__110 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: l.expressions, $isTraitObject: true }, function (e) {
        return _ast.Expression.getType.call(e);
      });
      return l.type_ = {
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
      };
    },
    visitPattern: function visitPattern(p) {
      var self = this;
      p.scope = $unwrapTraitObject(self).scope;
      visit.walkPattern(self, p);
      var __PUCK__value__111 = p;
      var __PUCK__value__112 = __PUCK__value__111;
      var __PUCK__value__113 = void 0;
      if ($unwrapTraitObject(__PUCK__value__112).kind == "CatchAll") {
        var _undefined3 = $unwrapTraitObject(__PUCK__value__112);
        __PUCK__value__113 = _entities.Type.unused();
      } else {
        var __PUCK__value__114 = __PUCK__value__111;
        var __PUCK__value__115 = void 0;
        if ($unwrapTraitObject(__PUCK__value__114).kind == "Identifier") {
          var _$unwrapTraitObject99 = $unwrapTraitObject(__PUCK__value__114),
              _$unwrapTraitObject100 = _slicedToArray(_$unwrapTraitObject99.value, 1),
              identifier = _$unwrapTraitObject100[0];

          __PUCK__value__115 = _js._undefined;
        } else {
          var __PUCK__value__116 = __PUCK__value__111;
          var __PUCK__value__117 = void 0;
          if ($unwrapTraitObject(__PUCK__value__116).kind == "Record") {
            var _$unwrapTraitObject101 = $unwrapTraitObject(__PUCK__value__116),
                _$unwrapTraitObject102 = _slicedToArray(_$unwrapTraitObject101.value, 1),
                record = _$unwrapTraitObject102[0];

            __PUCK__value__117 = record.type_;
          } else {
            var __PUCK__value__118 = __PUCK__value__111;
            var __PUCK__value__119 = void 0;
            if ($unwrapTraitObject(__PUCK__value__118).kind == "RecordType") {
              var _$unwrapTraitObject103 = $unwrapTraitObject(__PUCK__value__118),
                  _$unwrapTraitObject104 = _slicedToArray(_$unwrapTraitObject103.value, 2),
                  typePath = _$unwrapTraitObject104[0],
                  _record = _$unwrapTraitObject104[1];

              var type_ = typePath.providesType;
              if (!(0, _types.isAssignable)(_record.type_, type_)) {
                reportError({ type: '$Pattern', value: p, $isTraitObject: true }, _entities.Type.displayName.call(type_) + " is not assignable to pattern " + _ast.RecordPattern.displayName.call(_record));
              };
              __PUCK__value__119 = _core.Option.mapOr.call(type_.enumMember, type_, function (_ref13) {
                var _ref14 = _slicedToArray(_ref13, 2),
                    __PUCK__value__120 = _ref14[0],
                    enum_ = _ref14[1];

                return enum_;
              });
            } else {
              var __PUCK__value__121 = __PUCK__value__111;
              var __PUCK__value__122 = void 0;
              if ($unwrapTraitObject(__PUCK__value__121).kind == "Tuple") {
                var _$unwrapTraitObject105 = $unwrapTraitObject(__PUCK__value__121),
                    _$unwrapTraitObject106 = _slicedToArray(_$unwrapTraitObject105.value, 1),
                    tuple = _$unwrapTraitObject106[0];

                __PUCK__value__122 = tuple.type_;
              } else {
                var __PUCK__value__123 = __PUCK__value__111;
                var __PUCK__value__124 = void 0;
                if ($unwrapTraitObject(__PUCK__value__123).kind == "TupleType") {
                  var _$unwrapTraitObject107 = $unwrapTraitObject(__PUCK__value__123),
                      _$unwrapTraitObject108 = _slicedToArray(_$unwrapTraitObject107.value, 2),
                      _typePath = _$unwrapTraitObject108[0],
                      _tuple = _$unwrapTraitObject108[1];

                  var _type_ = _typePath.providesType;
                  if (!(0, _types.isAssignable)(_tuple.type_, _type_)) {
                    reportError({ type: '$Pattern', value: p, $isTraitObject: true }, _entities.Type.displayName.call(_type_) + " is not assignable to pattern " + _ast.TuplePattern.displayName.call(_tuple));
                  };
                  __PUCK__value__124 = _core.Option.mapOr.call(_type_.enumMember, _type_, function (_ref15) {
                    var _ref16 = _slicedToArray(_ref15, 2),
                        __PUCK__value__125 = _ref16[0],
                        enum_ = _ref16[1];

                    return enum_;
                  });
                } else {
                  var __PUCK__value__126 = __PUCK__value__111;
                  var __PUCK__value__127 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__126).kind == "UnitType") {
                    var _$unwrapTraitObject109 = $unwrapTraitObject(__PUCK__value__126),
                        _$unwrapTraitObject110 = _slicedToArray(_$unwrapTraitObject109.value, 1),
                        _typePath2 = _$unwrapTraitObject110[0];

                    __PUCK__value__127 = _js._undefined;
                  };
                  __PUCK__value__124 = __PUCK__value__127;
                };
                __PUCK__value__122 = __PUCK__value__124;
              };
              __PUCK__value__119 = __PUCK__value__122;
            };
            __PUCK__value__117 = __PUCK__value__119;
          };
          __PUCK__value__115 = __PUCK__value__117;
        };
        __PUCK__value__113 = __PUCK__value__115;
      };
      return p.type_ = __PUCK__value__113;
    },
    visitRecordPattern: function visitRecordPattern(p) {
      var self = this;
      p.scope = $unwrapTraitObject(self).scope;
      visit.walkRecordPattern(self, p);
      return p.type_ = {
        displayName: _core.None,
        name: _core.None,
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: _entities.StructKind.Record({ properties: _core.ObjectMap.fromIter(_core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: p.properties, $isTraitObject: true }, function (p) {
              return [p.property.name, p.pattern.type_];
            })) })
        }),
        instance: _core.None,
        _class: _core.None,
        providesType: _core.None,
        enumMember: _core.None
      };
    },
    visitTuplePattern: function visitTuplePattern(p) {
      var self = this;
      p.scope = $unwrapTraitObject(self).scope;
      visit.walkTuplePattern(self, p);
      var __PUCK__value__128 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: p.properties, $isTraitObject: true }, function (p) {
        return p.type_;
      });
      return p.type_ = {
        displayName: _core.None,
        name: _core.None,
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: _entities.StructKind.Tuple({ properties: _core.Iterable[__PUCK__value__128.type].toList.call(__PUCK__value__128) })
        }),
        instance: _core.None,
        _class: _core.None,
        providesType: _core.None,
        enumMember: _core.None
      };
    }
  });
}
