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
      var _PUCK__value__2$valu = _slicedToArray(__PUCK__value__2.value, 1),
          i = _PUCK__value__2$valu[0];

      var binding = $unwrapTraitObject(i.scope).getBinding(i.name);
      if (binding) {
        return (0, _core.Some)(binding);
      } else {
        return _core.None;
      };
    } else {
      var __PUCK__value__3 = __PUCK__value__1;
      if ($unwrapTraitObject(__PUCK__value__3).kind == "IndexAccess") {
        var _PUCK__value__3$valu = _slicedToArray(__PUCK__value__3.value, 1),
            _i = _PUCK__value__3$valu[0];

        return getBinding(_i.object);
      } else {
        var __PUCK__value__4 = __PUCK__value__1;
        if ($unwrapTraitObject(__PUCK__value__4).kind == "MemberAccess") {
          var _PUCK__value__4$valu = _slicedToArray(__PUCK__value__4.value, 1),
              _i2 = _PUCK__value__4$valu[0];

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
      var _PUCK__value__8$valu = _slicedToArray(__PUCK__value__8.value, 1),
          i = _PUCK__value__8$valu[0];

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
      var _PUCK__value__14$val = _slicedToArray(__PUCK__value__14.value, 1),
          func = _PUCK__value__14$val[0];

      __PUCK__value__15 = func;
    } else {
      var __PUCK__value__16 = __PUCK__value__13;
      var __PUCK__value__17 = void 0;
      if (true) {
        var __PUCK__value__18 = __PUCK__value__16;
        __PUCK__value__17 = reportError(c, "" + name + " is not callable");
      };
      __PUCK__value__15 = __PUCK__value__17;
    };
    var _function = __PUCK__value__15;
    var __PUCK__value__19 = _function.selfBinding;
    if ($unwrapTraitObject(__PUCK__value__19).kind == "Some") {
      var _PUCK__value__19$val = _slicedToArray(__PUCK__value__19.value, 1),
          selfBinding = _PUCK__value__19$val[0];

      if (selfBinding.mutable) {
        if (!_core.Option.mapOr.call(getBinding(c.func), true, function (binding) {
          return binding.mutable;
        })) {
          reportError(c, "" + name + " can only be called on a mutable binding");
        };
      };
    };
    var __PUCK__value__20 = (0, _range.checkRange)(c.argumentList, _function.parameterRange, "arguments", name);
    if ($unwrapTraitObject(__PUCK__value__20).kind == "Err") {
      var _PUCK__value__20$val = _slicedToArray(__PUCK__value__20.value, 1),
          error = _PUCK__value__20$val[0];

      reportError(c, error);
    };
    var __PUCK__value__21 = functionType._class;
    var __PUCK__value__22 = void 0;
    if ($unwrapTraitObject(__PUCK__value__21).kind == "Some") {
      (function () {
        var _PUCK__value__21$val = _slicedToArray(__PUCK__value__21.value, 1),
            _class = _PUCK__value__21$val[0];

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
              var _undefined2 = __PUCK__value__25;
              if (parameterMap[_core.Option.unwrap.call(parameter.type_.name)]) {
                var existingMapping = parameterMap[_core.Option.unwrap.call(parameter.type_.name)];
                if (!(0, _types.isAssignable)(existingMapping, _ast.Expression.getType.call(argument))) {
                  if ((0, _types.isAssignable)(_ast.Expression.getType.call(argument), existingMapping)) {
                    return parameterMap[_core.Option.unwrap.call(parameter.type_.name)] = _ast.Expression.getType.call(argument);
                  } else {
                    return reportError(argument, (0, _structure_visitor.notAssignableError)(existingMapping, _ast.Expression.getType.call(argument)));
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
          var _PUCK__value__28$val = _slicedToArray(__PUCK__value__28.value, 1),
              _name = _PUCK__value__28$val[0].name;

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
        reportError(argument, (0, _structure_visitor.notAssignableError)($unwrapTraitObject(parameter).type_, _ast.Expression.getType.call(argument)) + " in parameter " + parameterName + " of function " + name + "");
      };
      if ($unwrapTraitObject(parameter).mutable) {
        var __PUCK__value__30 = getBinding(argument);
        if ($unwrapTraitObject(__PUCK__value__30).kind == "Some") {
          var _PUCK__value__30$val = _slicedToArray(__PUCK__value__30.value, 1),
              argumentBinding = _PUCK__value__30$val[0];

          var argumentName = argumentBinding.name;
          if (!argumentBinding.mutable) {
            return reportError(argument, "Parameter " + parameterName + " of function " + name + " requires a mutable binding " + "but " + argumentName + " is declared as immutable.");
          };
        };
      };
    });
    return _function;
  };
  return $unwrapTraitObject(_js._Object).assign({}, $unwrapTraitObject(visit).walkingVisitor, _structure_visitor.structureVisitor, {
    reportError: reportError,
    visitModule: function visitModule(m) {
      var self = this;
      $unwrapTraitObject(self).scope = m.scope;
      _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: m.statements, $isTraitObject: true }, function (s) {
        var __PUCK__value__31 = s;
        var __PUCK__value__32 = __PUCK__value__31;
        if ($unwrapTraitObject(__PUCK__value__32).kind == "ExportDirective" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__32).value)[$unwrapTraitObject(0)]).statement).kind == "FunctionDeclaration") {
          var _PUCK__value__32$val = _slicedToArray(__PUCK__value__32.value, 1),
              _PUCK__value__32$val$ = _slicedToArray(_PUCK__value__32$val[0].statement.value, 1),
              f = _PUCK__value__32$val$[0];

          return $unwrapTraitObject(self).visitFunctionDeclaration(f, true);
        } else {
          var __PUCK__value__33 = __PUCK__value__31;
          if ($unwrapTraitObject(__PUCK__value__33).kind == "BlockLevelStatement" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__33).value)[$unwrapTraitObject(0)]).kind == "Expression" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__33).value)[$unwrapTraitObject(0)]).value)[$unwrapTraitObject(0)]).kind == "FunctionDeclaration") {
            var _PUCK__value__33$val = _slicedToArray(__PUCK__value__33.value, 1),
                _PUCK__value__33$val$ = _slicedToArray(_PUCK__value__33$val[0].value, 1),
                _PUCK__value__33$val$2 = _slicedToArray(_PUCK__value__33$val$[0].value, 1),
                _f = _PUCK__value__33$val$2[0];

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
          var _PUCK__value__38$val = _slicedToArray(__PUCK__value__38.value, 1),
              _PUCK__value__38$val$ = _slicedToArray(_PUCK__value__38$val[0].value, 1),
              f = _PUCK__value__38$val$[0];

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
        var _PUCK__value__43$val = _slicedToArray(__PUCK__value__43.value, 1),
            last = _PUCK__value__43$val[0];

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
        reportError(i, "Use of undefined variable " + i.name);
      } else {
        i.type_ = $unwrapTraitObject(binding).type_;
      };
      return $unwrapTraitObject(visit).walkIdentifier(self, i);
    },
    visitFunctionDeclaration: function visitFunctionDeclaration(f) {
      var isHoisting = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var self = this;
      $unwrapTraitObject($unwrapTraitObject(_structure_visitor.structureVisitor).visitFunctionDeclaration).call(self, f);
      if (!isHoisting) {
        var selfScope = $unwrapTraitObject(self).scope;
        $unwrapTraitObject(self).scope = f.scope;
        _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: f.parameterList, $isTraitObject: true }, function (p) {
          return $unwrapTraitObject(self).visitVariableDeclaration(p);
        });
        var __PUCK__value__45 = f.body;
        if ($unwrapTraitObject(__PUCK__value__45).kind == "Some") {
          var _PUCK__value__45$val = _slicedToArray(__PUCK__value__45.value, 1),
              body = _PUCK__value__45$val[0];

          $unwrapTraitObject(self).visitBlock(body);
          var __PUCK__value__46 = f.type_.kind;
          if ($unwrapTraitObject(__PUCK__value__46).kind == "Function") {
            var _PUCK__value__46$val = _slicedToArray(__PUCK__value__46.value, 1),
                func = _PUCK__value__46$val[0];

            if (func.returnType) {
              if (!(0, _types.isAssignable)(func.returnType, body.type_)) {
                reportError(f, (0, _structure_visitor.notAssignableError)(func.returnType, body.type_) + " as returnType");
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
      return $unwrapTraitObject($unwrapTraitObject(_structure_visitor.structureVisitor).visitVariableDeclaration).call(self, d, __PUCK__value__47, type_, allowNotExhaustive);
    },
    visitAssignmentExpression: function visitAssignmentExpression(e) {
      var self = this;
      e.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(visit).walkAssignmentExpression(self, e);
      var __PUCK__value__48 = getBinding(e.lhs);
      if ($unwrapTraitObject(__PUCK__value__48).kind == "Some") {
        var _PUCK__value__48$val = _slicedToArray(__PUCK__value__48.value, 1),
            binding = _PUCK__value__48$val[0];

        if (!binding.mutable) {
          reportError(e, "Can't assign to immutable variable " + binding.name);
        };
        if (!(0, _types.isAssignable)(_ast.Expression.getType.call(e.lhs), _ast.Expression.getType.call(e.rhs))) {
          reportError(e, (0, _structure_visitor.notAssignableError)(_ast.Expression.getType.call(e.lhs), _ast.Expression.getType.call(e.rhs)));
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
        var _PUCK__value__49$val = _slicedToArray(__PUCK__value__49.value, 1),
            access = _PUCK__value__49$val[0];

        if (_ast.Expression.getType.call(access.object)) {
          var name = access.member.name;
          var objectType = _ast.Expression.getType.call(access.object);
          var __PUCK__value__50 = objectType.kind;
          if ($unwrapTraitObject(__PUCK__value__50).kind == "Trait") {
            var _PUCK__value__50$val = _slicedToArray(__PUCK__value__50.value, 1),
                trait_ = _PUCK__value__50$val[0];

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
              var _PUCK__value__51$val = _slicedToArray(__PUCK__value__51.value, 1),
                  implementation = _PUCK__value__51$val[0];

              var __PUCK__value__52 = implementation.trait_.instance;
              var __PUCK__value__53 = void 0;
              if ($unwrapTraitObject(__PUCK__value__52).kind == "Some") {
                var _PUCK__value__52$val = _slicedToArray(__PUCK__value__52.value, 1),
                    instance = _PUCK__value__52$val[0];

                __PUCK__value__53 = instance._class;
              } else {
                __PUCK__value__53 = implementation.trait_;
              };
              var _trait_ = __PUCK__value__53;
              var traitName = _core.Option.unwrap.call(_trait_.name);
              if (!$unwrapTraitObject(e.scope).getTypeBinding(traitName)) {
                reportError(e, "The function " + name + " is defined in trait " + traitName + " but it is not in scope");
              };
              e.traitName = traitName;
              e.isShorthand = _entities.Type.getTrait.call(_trait_).isShorthand;
              e.implementationType = implementation.type_;
              functionType = _entities.Type.getTrait.call(asType(implementation.trait_)).functions[name];
            };
          };
          var __PUCK__value__54 = objectType.instance;
          if ($unwrapTraitObject(__PUCK__value__54).kind == "Some") {
            var _PUCK__value__54$val = _slicedToArray(__PUCK__value__54.value, 1),
                _instance = _PUCK__value__54$val[0];

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
        return e.type_ = _function2.returnType;
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
        var _PUCK__value__56$val = _slicedToArray(__PUCK__value__56.value, 1),
            else_ = _PUCK__value__56$val[0];

        $unwrapTraitObject(self).visitBlock(else_, isUsed);
      };
      if (isUsed) {
        var __PUCK__value__57 = e.else_;
        var __PUCK__value__58 = void 0;
        if ($unwrapTraitObject(__PUCK__value__57).kind == "Some") {
          var _PUCK__value__57$val = _slicedToArray(__PUCK__value__57.value, 1),
              _else_ = _PUCK__value__57$val[0];

          var result = (0, _types.findCommonType)([e.then_.type_, _else_.type_]);
          var __PUCK__value__59 = result;
          var __PUCK__value__60 = __PUCK__value__59;
          var __PUCK__value__61 = void 0;
          if ($unwrapTraitObject(__PUCK__value__60).kind == "Ok") {
            var _PUCK__value__60$val = _slicedToArray(__PUCK__value__60.value, 1),
                type_ = _PUCK__value__60$val[0];

            __PUCK__value__61 = type_;
          } else {
            var __PUCK__value__62 = __PUCK__value__59;
            var __PUCK__value__63 = void 0;
            if ($unwrapTraitObject(__PUCK__value__62).kind == "Err") {
              var _PUCK__value__62$val = _slicedToArray(__PUCK__value__62.value, 1),
                  __PUCK__value__64 = _PUCK__value__62$val[0];

              __PUCK__value__63 = reportError(e, "Type " + _entities.Type.displayName.call(e.then_.type_) + " and " + _entities.Type.displayName.call(asType(_else_.type_)) + " is not compatible");
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
        var _PUCK__value__66$val = _slicedToArray(__PUCK__value__66.value, 1),
            patternTy = _PUCK__value__66$val[0];

        if (!(0, _types.isAssignable)(_ast.Expression.getType.call(e.expression), patternTy)) {
          $unwrapTraitObject(self).reportError(e.expression, (0, _structure_visitor.notAssignableError)(patternTy, _ast.Expression.getType.call(e.expression)));
        };
      } else {
        var __PUCK__value__67 = __PUCK__value__65;
        if ($unwrapTraitObject(__PUCK__value__67).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__67).value)[$unwrapTraitObject(0)]).kind == "PatternMismatch") {
          var _PUCK__value__67$val = _slicedToArray(__PUCK__value__67.value, 1),
              _PUCK__value__67$val$ = _slicedToArray(_PUCK__value__67$val[0].value, 3),
              pattern = _PUCK__value__67$val$[0],
              to = _PUCK__value__67$val$[1],
              subject = _PUCK__value__67$val$[2];

          $unwrapTraitObject(self).reportError(e.expression, (0, _structure_visitor.notAssignableError)(to, subject));
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
        var _PUCK__value__70$val = _slicedToArray(__PUCK__value__70.value, 1),
            else_ = _PUCK__value__70$val[0];

        $unwrapTraitObject(self).visitBlock(else_, isUsed);
      };
      if (isUsed) {
        var __PUCK__value__71 = e.else_;
        var __PUCK__value__72 = void 0;
        if ($unwrapTraitObject(__PUCK__value__71).kind == "Some") {
          var _PUCK__value__71$val = _slicedToArray(__PUCK__value__71.value, 1),
              _else_2 = _PUCK__value__71$val[0];

          var _result = (0, _types.findCommonType)([e.then_.type_, _else_2.type_]);
          var __PUCK__value__73 = _result;
          var __PUCK__value__74 = __PUCK__value__73;
          var __PUCK__value__75 = void 0;
          if ($unwrapTraitObject(__PUCK__value__74).kind == "Ok") {
            var _PUCK__value__74$val = _slicedToArray(__PUCK__value__74.value, 1),
                type_ = _PUCK__value__74$val[0];

            __PUCK__value__75 = type_;
          } else {
            var __PUCK__value__76 = __PUCK__value__73;
            var __PUCK__value__77 = void 0;
            if ($unwrapTraitObject(__PUCK__value__76).kind == "Err") {
              var _PUCK__value__76$val = _slicedToArray(__PUCK__value__76.value, 1),
                  __PUCK__value__78 = _PUCK__value__76$val[0];

              __PUCK__value__77 = reportError(e, "Type " + _entities.Type.displayName.call(e.then_.type_) + " and " + _entities.Type.displayName.call(asType(_else_2.type_)) + " is not compatible");
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
        var _PUCK__value__79$val = _slicedToArray(__PUCK__value__79.value, 1),
            error = _PUCK__value__79$val[0];

        $unwrapTraitObject(self).reportError(e, error);
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
            var _PUCK__value__83$val = _slicedToArray(__PUCK__value__83.value, 1),
                type_ = _PUCK__value__83$val[0];

            __PUCK__value__84 = type_;
          } else {
            var __PUCK__value__85 = __PUCK__value__82;
            var __PUCK__value__86 = void 0;
            if ($unwrapTraitObject(__PUCK__value__85).kind == "Err") {
              var _PUCK__value__85$val = _slicedToArray(__PUCK__value__85.value, 1),
                  __PUCK__value__87 = _PUCK__value__85$val[0];

              __PUCK__value__86 = reportError(e, "Match arms return mixed types " + _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: e.patterns, $isTraitObject: true }, function (arm) {
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
        var _PUCK__value__89$val = _slicedToArray(__PUCK__value__89.value, 1),
            patternTy = _PUCK__value__89$val[0];

        if (!(0, _types.isAssignable)(_ast.Expression.getType.call(m.expression), patternTy)) {
          $unwrapTraitObject(self).reportError(a, (0, _structure_visitor.notAssignableError)(_ast.Expression.getType.call(m.expression), patternTy));
        };
      } else {
        var __PUCK__value__90 = __PUCK__value__88;
        if ($unwrapTraitObject(__PUCK__value__90).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__90).value)[$unwrapTraitObject(0)]).kind == "PatternMismatch") {
          var _PUCK__value__90$val = _slicedToArray(__PUCK__value__90.value, 1),
              _PUCK__value__90$val$ = _slicedToArray(_PUCK__value__90$val[0].value, 3),
              pattern = _PUCK__value__90$val$[0],
              to = _PUCK__value__90$val$[1],
              subject = _PUCK__value__90$val$[2];

          $unwrapTraitObject(self).reportError(a, (0, _structure_visitor.notAssignableError)(to, subject));
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
      if (typePath.kind == "_Object") {
        var binding = $unwrapTraitObject(e.scope).getTypeBinding($unwrapTraitObject($unwrapTraitObject(typePath.value)[0]).name);
        if (!binding) {
          $unwrapTraitObject(self).reportError(e, "Use of undeclared type " + $unwrapTraitObject($unwrapTraitObject(typePath.value)[0]).name);
        };
        var type_ = $unwrapTraitObject(binding).type_;
        if ($unwrapTraitObject($unwrapTraitObject(typePath.value)[1]).kind != "Member") {
          $unwrapTraitObject(self).reportError(e, "Nested type paths are not supported");
        };
        var __PUCK__value__93 = type_.kind;
        if ($unwrapTraitObject(__PUCK__value__93).kind == "Enum") {
          var _ret3 = function () {
            var _PUCK__value__93$val = _slicedToArray(__PUCK__value__93.value, 1),
                enum_ = _PUCK__value__93$val[0];

            var memberIdentifier = $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(typePath.value)[1]).value)[0];
            var member = enum_.members[$unwrapTraitObject($unwrapTraitObject(memberIdentifier).name)];
            if (!member) {
              return {
                v: reportError(memberIdentifier, _entities.Type.displayName.call(type_) + " has no member named " + $unwrapTraitObject(memberIdentifier).name)
              };
            } else {
              var __PUCK__value__94 = member.kind;
              var __PUCK__value__95 = __PUCK__value__94;
              if ($unwrapTraitObject(__PUCK__value__95).kind == "Struct") {
                var _PUCK__value__95$val = _slicedToArray(__PUCK__value__95.value, 1),
                    struct = _PUCK__value__95$val[0];

                var __PUCK__value__96 = struct.kind;
                var __PUCK__value__97 = __PUCK__value__96;
                if ($unwrapTraitObject(__PUCK__value__97).kind == "Record") {
                  var _PUCK__value__97$val = _slicedToArray(__PUCK__value__97.value, 1),
                      record = _PUCK__value__97$val[0];

                  var __PUCK__value__98 = type_._class;
                  var __PUCK__value__99 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__98).kind == "Some") {
                    var _PUCK__value__98$val = _slicedToArray(__PUCK__value__98.value, 1),
                        _class = _PUCK__value__98$val[0];

                    __PUCK__value__99 = (0, _types.createTypeInstance)(type_, asIterable(_class.typeParameters));
                  } else {
                    __PUCK__value__99 = type_;
                  };
                  return {
                    v: e.type_ = {
                      displayName: _core.Option.map.call(type_.name, function (name) {
                        return name + "::" + $unwrapTraitObject(memberIdentifier).name;
                      }),
                      name: type_.name,
                      kind: _entities.TypeKind.Function({
                        selfBinding: _core.None,
                        parameters: [{
                          name: $unwrapTraitObject(memberIdentifier).name,
                          token: memberIdentifier,
                          mutable: false,
                          type_: member,
                          redefined: false
                        }],
                        parameterRange: {
                          start: 1,
                          end: 2
                        },
                        returnType: __PUCK__value__99,
                        isAbstract: false
                      }),
                      _class: _core.Option.map.call(type_._class, function (_class) {
                        return $unwrapTraitObject(_js._Object).assign({}, _class, { instances: [] });
                      }),
                      instance: type_.instance
                    }
                  };
                } else {
                  var __PUCK__value__100 = __PUCK__value__96;
                  if ($unwrapTraitObject(__PUCK__value__100).kind == "Tuple") {
                    var _PUCK__value__100$va = _slicedToArray(__PUCK__value__100.value, 1),
                        tuple = _PUCK__value__100$va[0];

                    var __PUCK__value__102 = _core.Iterable['$List<E>'].enumerate.call({ type: '$List<E>', value: tuple.properties, $isTraitObject: true });
                    var __PUCK__value__101 = _core.Iterable[__PUCK__value__102.type].map.call(__PUCK__value__102, function (_ref9) {
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
                    var __PUCK__value__103 = type_._class;
                    var __PUCK__value__104 = void 0;
                    if ($unwrapTraitObject(__PUCK__value__103).kind == "Some") {
                      var _PUCK__value__103$va = _slicedToArray(__PUCK__value__103.value, 1),
                          _class2 = _PUCK__value__103$va[0];

                      __PUCK__value__104 = (0, _types.createTypeInstance)(type_, asIterable(_class2.typeParameters));
                    } else {
                      __PUCK__value__104 = type_;
                    };
                    return {
                      v: e.type_ = {
                        displayName: _core.Option.map.call(type_.name, function (name) {
                          return name + "::" + $unwrapTraitObject(memberIdentifier).name;
                        }),
                        name: type_.name,
                        kind: _entities.TypeKind.Function({
                          selfBinding: _core.None,
                          parameters: _core.Iterable[__PUCK__value__101.type].toList.call(__PUCK__value__101),
                          parameterRange: {
                            start: tuple.properties.length,
                            end: tuple.properties.length + 1
                          },
                          returnType: __PUCK__value__104,
                          isAbstract: false
                        }),
                        _class: _core.Option.map.call(type_._class, function (_class) {
                          return $unwrapTraitObject(_js._Object).assign({}, _class, { instances: [] });
                        }),
                        instance: type_.instance
                      }
                    };
                  } else {
                    var __PUCK__value__105 = __PUCK__value__96;
                    if ($unwrapTraitObject(__PUCK__value__105).kind == "Unit") {
                      var _undefined3 = __PUCK__value__105;
                      return {
                        v: e.type_ = {
                          displayName: _core.Option.map.call(type_.name, function (name) {
                            return name + "::" + $unwrapTraitObject(memberIdentifier).name;
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
                var __PUCK__value__106 = __PUCK__value__94;
                if (true) {
                  var __PUCK__value__107 = __PUCK__value__106;
                  throw "enum arm is not a struct";
                };
              };
            };
          }();

          if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
        };
      };
    },
    visitUnaryExpression: function visitUnaryExpression(e) {
      var self = this;
      e.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(visit).walkUnaryExpression(self, e);
      var __PUCK__value__108 = void 0;
      if (e.operator.kind == $unwrapTraitObject(_ast2.SyntaxKind).NotKeyword) {
        __PUCK__value__108 = $unwrapTraitObject($unwrapTraitObject(e.scope).getTypeBinding("Bool")).type_;
      } else {
        var __PUCK__value__109 = void 0;
        if (e.operator.kind == $unwrapTraitObject(_ast2.SyntaxKind).MinusToken || e.operator.kind == $unwrapTraitObject(_ast2.SyntaxKind).PlusToken) {
          __PUCK__value__109 = $unwrapTraitObject($unwrapTraitObject(e.scope).getTypeBinding("Num")).type_;
        };
        __PUCK__value__108 = __PUCK__value__109;
      };
      return e.type_ = __PUCK__value__108;
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
        var __PUCK__value__110 = _ast.Expression.getType.call(a.object).kind;
        if ($unwrapTraitObject(__PUCK__value__110).kind == "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__110).value)[$unwrapTraitObject(0)]).kind).kind == "Record") {
          var _PUCK__value__110$va = _slicedToArray(__PUCK__value__110.value, 1),
              _PUCK__value__110$va$ = _slicedToArray(_PUCK__value__110$va[0].kind.value, 1),
              record = _PUCK__value__110$va$[0];

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
        var __PUCK__value__111 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: l.members, $isTraitObject: true }, function (m) {
          return _ast.Expression.getType.call(m);
        });
        var types = _core.Iterable[__PUCK__value__111.type].toList.call(__PUCK__value__111);
        var result = (0, _types.findCommonType)(types);
        var __PUCK__value__112 = result;
        var __PUCK__value__113 = __PUCK__value__112;
        if ($unwrapTraitObject(__PUCK__value__113).kind == "Ok") {
          var _PUCK__value__113$va = _slicedToArray(__PUCK__value__113.value, 1),
              type_ = _PUCK__value__113$va[0];

          if (!type_) {
            return l.type_ = $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(self).scope).getTypeBinding("List")).type_;
          } else {
            return l.type_ = (0, _types.createTypeInstance)($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(self).scope).getTypeBinding("List")).type_, asIterable([type_]));
          };
        } else {
          var __PUCK__value__114 = __PUCK__value__112;
          if ($unwrapTraitObject(__PUCK__value__114).kind == "Err") {
            var _PUCK__value__114$va = _slicedToArray(__PUCK__value__114.value, 1),
                __PUCK__value__115 = _PUCK__value__114$va[0];

            return reportError(l, "List contains mixed types");
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
      var __PUCK__value__116 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: l.expressions, $isTraitObject: true }, function (e) {
        return _ast.Expression.getType.call(e);
      });
      return l.type_ = {
        displayName: _core.None,
        name: _core.None,
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: _entities.StructKind.Tuple({ properties: _core.Iterable[__PUCK__value__116.type].toList.call(__PUCK__value__116) })
        }),
        _class: _core.None,
        instance: _core.None
      };
    },
    visitPattern: function visitPattern(p) {
      var self = this;
      p.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(visit).walkPattern(self, p);
      var __PUCK__value__117 = p;
      var __PUCK__value__118 = __PUCK__value__117;
      var __PUCK__value__119 = void 0;
      if ($unwrapTraitObject(__PUCK__value__118).kind == "CatchAll") {
        var _undefined4 = __PUCK__value__118;
        __PUCK__value__119 = _js._undefined;
      } else {
        var __PUCK__value__120 = __PUCK__value__117;
        var __PUCK__value__121 = void 0;
        if ($unwrapTraitObject(__PUCK__value__120).kind == "Identifier") {
          var _PUCK__value__120$va = _slicedToArray(__PUCK__value__120.value, 1),
              identifier = _PUCK__value__120$va[0];

          __PUCK__value__121 = _js._undefined;
        } else {
          var __PUCK__value__122 = __PUCK__value__117;
          var __PUCK__value__123 = void 0;
          if ($unwrapTraitObject(__PUCK__value__122).kind == "Record") {
            var _PUCK__value__122$va = _slicedToArray(__PUCK__value__122.value, 1),
                record = _PUCK__value__122$va[0];

            __PUCK__value__123 = record.type_;
          } else {
            var __PUCK__value__124 = __PUCK__value__117;
            var __PUCK__value__125 = void 0;
            if ($unwrapTraitObject(__PUCK__value__124).kind == "RecordType") {
              var _PUCK__value__124$va = _slicedToArray(__PUCK__value__124.value, 2),
                  typePath = _PUCK__value__124$va[0],
                  _record = _PUCK__value__124$va[1];

              __PUCK__value__125 = typePath.type_;
            } else {
              var __PUCK__value__126 = __PUCK__value__117;
              var __PUCK__value__127 = void 0;
              if ($unwrapTraitObject(__PUCK__value__126).kind == "Tuple") {
                var _PUCK__value__126$va = _slicedToArray(__PUCK__value__126.value, 1),
                    tuple = _PUCK__value__126$va[0];

                __PUCK__value__127 = tuple.type_;
              } else {
                var __PUCK__value__128 = __PUCK__value__117;
                var __PUCK__value__129 = void 0;
                if ($unwrapTraitObject(__PUCK__value__128).kind == "TupleType") {
                  var _PUCK__value__128$va = _slicedToArray(__PUCK__value__128.value, 2),
                      _typePath = _PUCK__value__128$va[0],
                      _tuple = _PUCK__value__128$va[1];

                  __PUCK__value__129 = _typePath.type_;
                } else {
                  var __PUCK__value__130 = __PUCK__value__117;
                  var __PUCK__value__131 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__130).kind == "UnitType") {
                    var _undefined5 = __PUCK__value__130;
                    __PUCK__value__131 = _entities.Type.empty();
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
        __PUCK__value__119 = __PUCK__value__121;
      };
      return p.type_ = __PUCK__value__119;
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
      var __PUCK__value__132 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: p.properties, $isTraitObject: true }, function (p) {
        return p.type_;
      });
      return p.type_ = {
        displayName: _core.None,
        name: _core.None,
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: _entities.StructKind.Tuple({ properties: _core.Iterable[__PUCK__value__132.type].toList.call(__PUCK__value__132) })
        }),
        instance: _core.None,
        _class: _core.None
      };
    }
  });
}
