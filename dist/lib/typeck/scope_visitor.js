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
  function getBinding(token) {
    if (token.kind == $unwrapTraitObject(_ast2.SyntaxKind).Identifier) {
      return $unwrapTraitObject(token.scope).getBinding(token.name);
    } else {
      if (token.kind == $unwrapTraitObject(_ast2.SyntaxKind).MemberAccess) {
        return getBinding(token.object);
      } else {
        if (token.kind == $unwrapTraitObject(_ast2.SyntaxKind).IndexAccess) {
          return getBinding(token.object);
        };
      };
    };
  };
  function checkFunctionCall(functionType, c) {
    if (!functionType) {
      return _js._undefined;
    };
    var name = c.func.name || _core.None;
    var __PUCK__value__1 = void 0;
    if (!$unwrapTraitObject(name).kind) {
      __PUCK__value__1 = (0, _core.Some)(name);
    } else {
      __PUCK__value__1 = name;
    };
    var iName = __PUCK__value__1;
    name = _core.Option.unwrapOrElse.call(iName, function () {
      return _entities.Type.displayName.call(functionType);
    });
    var __PUCK__value__2 = functionType.kind;
    var __PUCK__value__3 = __PUCK__value__2;
    var __PUCK__value__4 = void 0;
    if ($unwrapTraitObject(__PUCK__value__3).kind == "Function") {
      var _PUCK__value__3$valu = _slicedToArray(__PUCK__value__3.value, 1),
          func = _PUCK__value__3$valu[0];

      __PUCK__value__4 = func;
    } else {
      var __PUCK__value__5 = __PUCK__value__2;
      var __PUCK__value__6 = void 0;
      if (true) {
        var __PUCK__value__7 = __PUCK__value__5;
        __PUCK__value__6 = reportError(c, "" + name + " is not callable");
      };
      __PUCK__value__4 = __PUCK__value__6;
    };
    var _function = __PUCK__value__4;
    var __PUCK__value__8 = _function.selfBinding;
    if ($unwrapTraitObject(__PUCK__value__8).kind == "Some") {
      var _PUCK__value__8$valu = _slicedToArray(__PUCK__value__8.value, 1),
          selfBinding = _PUCK__value__8$valu[0];

      if (selfBinding.mutable) {
        var binding = getBinding(c.func);
        if (binding && !$unwrapTraitObject(binding).mutable) {
          reportError(c, "" + name + " can only be called on a mutable binding");
        };
      };
    };
    var __PUCK__value__9 = (0, _range.checkRange)(c.argumentList, _function.argumentRange, "arguments", name);
    if ($unwrapTraitObject(__PUCK__value__9).kind == "Err") {
      var _PUCK__value__9$valu = _slicedToArray(__PUCK__value__9.value, 1),
          error = _PUCK__value__9$valu[0];

      reportError(c, error);
    };
    var __PUCK__value__10 = functionType._class;
    var __PUCK__value__11 = void 0;
    if ($unwrapTraitObject(__PUCK__value__10).kind == "Some") {
      (function () {
        var _PUCK__value__10$val = _slicedToArray(__PUCK__value__10.value, 1),
            _class = _PUCK__value__10$val[0];

        var parameterMap = _core.ObjectMap._new();
        var __PUCK__value__12 = _core.Iterable['$List<E>'].enumerate.call({ type: '$List<E>', value: _function._arguments, $isTraitObject: true });
        _core.Iterable[__PUCK__value__12.type].forEach.call(__PUCK__value__12, function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              parameter = _ref2[0],
              i = _ref2[1];

          var __PUCK__value__13 = void 0;
          if (i < c.argumentList.length) {
            __PUCK__value__13 = c.argumentList[i];
          } else {
            __PUCK__value__13 = parameter;
          };
          var argument = __PUCK__value__13;
          if (parameter.type_ && argument.type_) {
            var __PUCK__value__14 = parameter.type_.kind;
            if ($unwrapTraitObject(__PUCK__value__14).kind == "Parameter") {
              var _undefined2 = __PUCK__value__14;
              if (parameterMap[_core.Option.unwrap.call(parameter.type_.name)]) {
                var existingMapping = parameterMap[_core.Option.unwrap.call(parameter.type_.name)];
                if (!(0, _types.isAssignable)(existingMapping, argument.type_)) {
                  if ((0, _types.isAssignable)(argument.type_, existingMapping)) {
                    return parameterMap[_core.Option.unwrap.call(parameter.type_.name)] = argument.type_;
                  } else {
                    return reportError(argument, (0, _structure_visitor.notAssignableError)(existingMapping, argument.type_));
                  };
                };
              } else {
                return parameterMap[_core.Option.unwrap.call(parameter.type_.name)] = argument.type_;
              };
            };
          };
        });
        var resolvedFunction = (0, _types.resolveTypeParameters)(parameterMap)(functionType);
        var __PUCK__value__15 = resolvedFunction.kind;
        var __PUCK__value__16 = __PUCK__value__15;
        var __PUCK__value__17 = void 0;
        if ($unwrapTraitObject(__PUCK__value__16).kind == "Function") {
          var _PUCK__value__16$val = _slicedToArray(__PUCK__value__16.value, 1),
              _func = _PUCK__value__16$val[0];

          __PUCK__value__17 = _func;
        } else {
          var __PUCK__value__18 = __PUCK__value__15;
          var __PUCK__value__19 = void 0;
          if (true) {
            var __PUCK__value__20 = __PUCK__value__18;
            throw "resolved function is not a function";
          };
          __PUCK__value__17 = __PUCK__value__19;
        };
        __PUCK__value__11 = __PUCK__value__17;
      })();
    } else {
      __PUCK__value__11 = _function;
    };
    _function = __PUCK__value__11;
    var __PUCK__value__21 = _core.Iterable['$List<E>'].enumerate.call({ type: '$List<E>', value: c.argumentList, $isTraitObject: true });
    _core.Iterable[__PUCK__value__21.type].forEach.call(__PUCK__value__21, function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          argument = _ref4[0],
          i = _ref4[1];

      var parameter = _function._arguments[i];
      var __PUCK__value__22 = void 0;
      if ($unwrapTraitObject(parameter).pattern) {
        var __PUCK__value__23 = $unwrapTraitObject(parameter).pattern;
        var __PUCK__value__24 = void 0;
        if ($unwrapTraitObject(__PUCK__value__23).kind == "Identifier") {
          var _PUCK__value__23$val = _slicedToArray(__PUCK__value__23.value, 1),
              _name = _PUCK__value__23$val[0].name;

          __PUCK__value__24 = _name;
        } else {
          __PUCK__value__24 = "" + i + "";
        };
        __PUCK__value__22 = __PUCK__value__24;
      } else {
        __PUCK__value__22 = "" + i + "";
      };
      var parameterName = __PUCK__value__22;
      if (!(0, _types.isAssignable)($unwrapTraitObject(parameter).type_, $unwrapTraitObject(argument).type_)) {
        reportError(argument, (0, _structure_visitor.notAssignableError)($unwrapTraitObject(parameter).type_, $unwrapTraitObject(argument).type_) + " in parameter " + parameterName + " of function " + name + "");
      };
      if ($unwrapTraitObject(parameter).mutable && $unwrapTraitObject(argument).kind == $unwrapTraitObject(_ast2.SyntaxKind).Identifier) {
        var argumentName = $unwrapTraitObject(argument).name;
        var argumentBinding = $unwrapTraitObject($unwrapTraitObject(argument).scope).getBinding(argumentName);
        if (!$unwrapTraitObject(argumentBinding).mutable) {
          return reportError(argument, "Parameter " + parameterName + " of function " + name + " requires a mutable binding " + "but " + argumentName + " is declared as immutable.");
        };
      };
    });
    return _function;
  };
  function defineHoisted(expressions, visitor) {
    return $unwrapTraitObject(expressions).forEach(function (e) {
      if ($unwrapTraitObject(e).kind == $unwrapTraitObject(_ast2.SyntaxKind).Function) {
        $unwrapTraitObject(e).hoisting = true;
        $unwrapTraitObject(visitor).visitFunctionDeclaration(e);
        $unwrapTraitObject(e).hoisted = true;
      };
      if ($unwrapTraitObject(e).kind == $unwrapTraitObject(_ast2.SyntaxKind).ExportDirective && $unwrapTraitObject($unwrapTraitObject(e).expression).kind == $unwrapTraitObject(_ast2.SyntaxKind).Function) {
        $unwrapTraitObject($unwrapTraitObject(e).expression).hoisting = true;
        $unwrapTraitObject(visitor).visitFunctionDeclaration($unwrapTraitObject(e).expression);
        return $unwrapTraitObject($unwrapTraitObject(e).expression).hoisted = true;
      };
    });
  };
  return $unwrapTraitObject(_js._Object).assign({}, $unwrapTraitObject(visit).walkingVisitor, _structure_visitor.structureVisitor, {
    reportError: reportError,
    visitExpression: function visitExpression(e) {
      var isUsed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var self = this;
      $unwrapTraitObject(self).isUsed = isUsed;
      return $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(visit).walkingVisitor).visitExpression).call(self, e);
    },
    visitBlock: function visitBlock(b) {
      var isBlockUsed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var self = this;
      b.scope = $unwrapTraitObject(self).scope;
      defineHoisted(b.expressions, self);
      var __PUCK__value__25 = _core.Iterable['$List<E>'].enumerate.call({ type: '$List<E>', value: b.expressions, $isTraitObject: true });
      _core.Iterable[__PUCK__value__25.type].forEach.call(__PUCK__value__25, function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            e = _ref6[0],
            i = _ref6[1];

        var isUsed = isBlockUsed && i + 1 == _core.Iterable['$List<E>'].size.call({ type: '$List<E>', value: b.expressions, $isTraitObject: true });
        return $unwrapTraitObject(self).visitExpression(e, isUsed);
      });
      var __PUCK__value__26 = _core.Iterable['$List<E>'].last.call({ type: '$List<E>', value: b.expressions, $isTraitObject: true });
      var __PUCK__value__27 = void 0;
      if ($unwrapTraitObject(__PUCK__value__26).kind == "Some") {
        var _PUCK__value__26$val = _slicedToArray(__PUCK__value__26.value, 1),
            last = _PUCK__value__26$val[0];

        __PUCK__value__27 = last.type_;
      } else {
        __PUCK__value__27 = _entities.Type.empty();
      };
      return b.type_ = __PUCK__value__27;
    },
    visitFunctionDeclaration: function visitFunctionDeclaration(f) {
      var self = this;
      $unwrapTraitObject($unwrapTraitObject(_structure_visitor.structureVisitor).visitFunctionDeclaration).call(self, f);
      if (!f.hoisting || f.hoisted) {
        var selfScope = $unwrapTraitObject(self).scope;
        $unwrapTraitObject(self).scope = f.scope;
        _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: f.parameterList, $isTraitObject: true }, function (p) {
          return $unwrapTraitObject(self).visitVariableDeclaration(p);
        });
        var __PUCK__value__28 = f.body;
        if ($unwrapTraitObject(__PUCK__value__28).kind == "Some") {
          var _PUCK__value__28$val = _slicedToArray(__PUCK__value__28.value, 1),
              body = _PUCK__value__28$val[0];

          $unwrapTraitObject(self).visitBlock(body);
          var __PUCK__value__29 = f.type_.kind;
          if ($unwrapTraitObject(__PUCK__value__29).kind == "Function") {
            var _PUCK__value__29$val = _slicedToArray(__PUCK__value__29.value, 1),
                func = _PUCK__value__29$val[0];

            if (func.returnType) {
              if (!(0, _types.isAssignable)(func.returnType, body.type_)) {
                reportError(f, (0, _structure_visitor.notAssignableError)(func.returnType, body.type_));
              };
            } else {
              $unwrapTraitObject(_js._Object).assign(func, { returnType: body.type_ });
            };
          };
        };
        return $unwrapTraitObject(self).scope = selfScope;
      };
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
    visitImplDeclaration: function visitImplDeclaration(i) {
      var self = this;
      return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: i.members, $isTraitObject: true }, $unwrapTraitObject($unwrapTraitObject(self).visitFunctionDeclaration).bind(self));
    },
    visitImplShorthandDeclaration: function visitImplShorthandDeclaration(i) {
      var self = this;
      return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: i.members, $isTraitObject: true }, $unwrapTraitObject($unwrapTraitObject(self).visitFunctionDeclaration).bind(self));
    },
    visitModule: function visitModule(m) {
      var self = this;
      $unwrapTraitObject(self).scope = m.scope;
      defineHoisted(m.expressions, self);
      return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: m.expressions, $isTraitObject: true }, function (e) {
        return $unwrapTraitObject(self).visitExpression(e, false);
      });
    },
    visitObjectDestructure: function visitObjectDestructure(i) {},
    visitTraitDeclaration: function visitTraitDeclaration(t) {
      var self = this;
      $unwrapTraitObject(self).scope = t.scope;
      $unwrapTraitObject(visit).walkTraitDeclaration(self, t);
      return $unwrapTraitObject(self).scope = $unwrapTraitObject($unwrapTraitObject(self).scope).parent;
    },
    visitTypeDeclaration: function visitTypeDeclaration(t) {},
    visitVariableDeclaration: function visitVariableDeclaration(d, visitInitializer, type_) {
      var allowNotExhaustive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      var self = this;
      var __PUCK__value__30 = void 0;
      if (visitInitializer) {
        __PUCK__value__30 = visitInitializer;
      } else {
        __PUCK__value__30 = function __PUCK__value__30(e) {
          var parentAssignedTo = $unwrapTraitObject(self).assignedTo;
          $unwrapTraitObject(self).assignedTo = d;
          $unwrapTraitObject(self).visitExpression(e);
          return $unwrapTraitObject(self).assignedTo = parentAssignedTo;
        };
      };
      return $unwrapTraitObject($unwrapTraitObject(_structure_visitor.structureVisitor).visitVariableDeclaration).call(self, d, __PUCK__value__30, type_, allowNotExhaustive);
    },
    visitExportDirective: function visitExportDirective(e) {
      var self = this;
      return $unwrapTraitObject(visit).walkExportDirective(self, e);
    },
    visitImportDirective: function visitImportDirective(i) {},
    visitPattern: function visitPattern(p) {
      var self = this;
      p.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(visit).walkPattern(self, p);
      var __PUCK__value__31 = p;
      var __PUCK__value__32 = __PUCK__value__31;
      var __PUCK__value__33 = void 0;
      if ($unwrapTraitObject(__PUCK__value__32).kind == "CatchAll") {
        var _undefined3 = __PUCK__value__32;
        __PUCK__value__33 = _js._undefined;
      } else {
        var __PUCK__value__34 = __PUCK__value__31;
        var __PUCK__value__35 = void 0;
        if ($unwrapTraitObject(__PUCK__value__34).kind == "Identifier") {
          var _PUCK__value__34$val = _slicedToArray(__PUCK__value__34.value, 1),
              identifier = _PUCK__value__34$val[0];

          __PUCK__value__35 = _js._undefined;
        } else {
          var __PUCK__value__36 = __PUCK__value__31;
          var __PUCK__value__37 = void 0;
          if ($unwrapTraitObject(__PUCK__value__36).kind == "Record") {
            var _PUCK__value__36$val = _slicedToArray(__PUCK__value__36.value, 1),
                record = _PUCK__value__36$val[0];

            __PUCK__value__37 = record.type_;
          } else {
            var __PUCK__value__38 = __PUCK__value__31;
            var __PUCK__value__39 = void 0;
            if ($unwrapTraitObject(__PUCK__value__38).kind == "RecordType") {
              var _PUCK__value__38$val = _slicedToArray(__PUCK__value__38.value, 2),
                  typePath = _PUCK__value__38$val[0],
                  _record = _PUCK__value__38$val[1];

              __PUCK__value__39 = typePath.type_;
            } else {
              var __PUCK__value__40 = __PUCK__value__31;
              var __PUCK__value__41 = void 0;
              if ($unwrapTraitObject(__PUCK__value__40).kind == "Tuple") {
                var _PUCK__value__40$val = _slicedToArray(__PUCK__value__40.value, 1),
                    tuple = _PUCK__value__40$val[0];

                __PUCK__value__41 = tuple.type_;
              } else {
                var __PUCK__value__42 = __PUCK__value__31;
                var __PUCK__value__43 = void 0;
                if ($unwrapTraitObject(__PUCK__value__42).kind == "TupleType") {
                  var _PUCK__value__42$val = _slicedToArray(__PUCK__value__42.value, 2),
                      _typePath = _PUCK__value__42$val[0],
                      _tuple = _PUCK__value__42$val[1];

                  __PUCK__value__43 = _typePath.type_;
                } else {
                  var __PUCK__value__44 = __PUCK__value__31;
                  var __PUCK__value__45 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__44).kind == "UnitType") {
                    var _undefined4 = __PUCK__value__44;
                    __PUCK__value__45 = _entities.Type.empty();
                  };
                  __PUCK__value__43 = __PUCK__value__45;
                };
                __PUCK__value__41 = __PUCK__value__43;
              };
              __PUCK__value__39 = __PUCK__value__41;
            };
            __PUCK__value__37 = __PUCK__value__39;
          };
          __PUCK__value__35 = __PUCK__value__37;
        };
        __PUCK__value__33 = __PUCK__value__35;
      };
      return p.type_ = __PUCK__value__33;
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
      var __PUCK__value__46 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: p.properties, $isTraitObject: true }, function (p) {
        return p.type_;
      });
      return p.type_ = {
        displayName: _core.None,
        name: _core.None,
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: _entities.StructKind.Tuple({ properties: _core.Iterable[__PUCK__value__46.type].toList.call(__PUCK__value__46) })
        }),
        instance: _core.None,
        _class: _core.None
      };
    },
    visitAssignmentExpression: function visitAssignmentExpression(e) {
      var self = this;
      e.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(visit).walkAssignmentExpression(self, e);
      var binding = getBinding(e.lhs);
      if (binding) {
        if (!$unwrapTraitObject(binding).mutable) {
          reportError(e, "Can't assign to immutable variable " + $unwrapTraitObject(binding).name);
        };
        if (!(0, _types.isAssignable)($unwrapTraitObject(e.lhs).type_, e.rhs.type_)) {
          reportError(e, (0, _structure_visitor.notAssignableError)($unwrapTraitObject(e.lhs).type_, e.rhs.type_));
        };
      };
      return e.type_ = $unwrapTraitObject(e.lhs).type_ || e.rhs.type_;
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
      var functionType = e.func.type_;
      if (e.func.kind == $unwrapTraitObject(_ast2.SyntaxKind).MemberAccess && $unwrapTraitObject(e.func.object).type_) {
        var name = $unwrapTraitObject(e.func.member).name;
        var objectType = $unwrapTraitObject(e.func.object).type_;
        var __PUCK__value__47 = objectType.kind;
        if ($unwrapTraitObject(__PUCK__value__47).kind == "Trait") {
          var _PUCK__value__47$val = _slicedToArray(__PUCK__value__47.value, 1),
              trait_ = _PUCK__value__47$val[0];

          functionType = trait_.functions[$unwrapTraitObject(name)];
          if (functionType) {
            var _function = _entities.Type.getFunction.call(functionType);
            if (_core.Option.isSome.call(_function.selfBinding)) {
              e.traitName = _core.Option.unwrap.call(objectType.name);
              e.isTraitObject = true;
            };
          };
        } else {
          var __PUCK__value__48 = (0, _impls.getImplementation)(name, objectType, e, reportError);
          if ($unwrapTraitObject(__PUCK__value__48).kind == "Some") {
            var _PUCK__value__48$val = _slicedToArray(__PUCK__value__48.value, 1),
                implementation = _PUCK__value__48$val[0];

            var __PUCK__value__49 = implementation.trait_.instance;
            var __PUCK__value__50 = void 0;
            if ($unwrapTraitObject(__PUCK__value__49).kind == "Some") {
              var _PUCK__value__49$val = _slicedToArray(__PUCK__value__49.value, 1),
                  instance = _PUCK__value__49$val[0];

              __PUCK__value__50 = instance._class;
            } else {
              __PUCK__value__50 = implementation.trait_;
            };
            var _trait_ = __PUCK__value__50;
            var traitName = _core.Option.unwrap.call(_trait_.name);
            if (!$unwrapTraitObject(e.scope).getTypeBinding(traitName)) {
              reportError(e, "The function " + name + " is defined in trait " + traitName + " but it is not in scope");
            };
            e.traitName = traitName;
            e.isShorthand = _entities.Type.getTrait.call(_trait_).isShorthand;
            e.implementationType = implementation.type_;
            functionType = _entities.Type.getTrait.call(asType(implementation.trait_)).functions[$unwrapTraitObject(name)];
          };
        };
        var __PUCK__value__51 = objectType.instance;
        if ($unwrapTraitObject(__PUCK__value__51).kind == "Some") {
          var _PUCK__value__51$val = _slicedToArray(__PUCK__value__51.value, 1),
              _instance = _PUCK__value__51$val[0];

          functionType = (0, _types.resolveTypeParameters)(_instance.parameterMap)(functionType);
        };
      };
      if (functionType && _entities.Type.isFunction.call(functionType)) {
        (function () {
          var callTypeParameters = _core.Option.unwrapOr.call(_core.Option.map.call(functionType._class, function (_class) {
            return _class.typeParameters;
          }), []);
          var callParameterMap = _core.ObjectMap._new();
          var parentAssignedTo = $unwrapTraitObject(self).assignedTo;
          var __PUCK__value__52 = _core.Iterable['$List<E>'].enumerate.call({ type: '$List<E>', value: e.argumentList, $isTraitObject: true });
          _core.Iterable[__PUCK__value__52.type].forEach.call(__PUCK__value__52, function (_ref7) {
            var _ref8 = _slicedToArray(_ref7, 2),
                a = _ref8[0],
                i = _ref8[1];

            $unwrapTraitObject(self).assignedTo = _entities.Type.getFunction.call(functionType)._arguments[i];
            $unwrapTraitObject(self).visitExpression(a);
            if (_core.Iterable['$List<E>'].isNotEmpty.call({ type: '$List<E>', value: callTypeParameters, $isTraitObject: true }) && $unwrapTraitObject(_entities.Type.getFunction.call(functionType)._arguments[i]).type_ && $unwrapTraitObject(a).type_) {
              return (0, _functions.resolveFunctionTypeParameters)(callParameterMap, callTypeParameters, $unwrapTraitObject(_entities.Type.getFunction.call(functionType)._arguments[i]).type_, $unwrapTraitObject(a).type_);
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
    visitForExpression: function visitForExpression(e) {
      var self = this;
      $unwrapTraitObject(self).scope = (0, _scope.createScope)(context, file, $unwrapTraitObject(self).scope);
      e.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(visit).walkForExpression(self, e);
      return $unwrapTraitObject(self).scope = $unwrapTraitObject($unwrapTraitObject(self).scope).parent;
    },
    visitIfExpression: function visitIfExpression(e) {
      var self = this;
      $unwrapTraitObject(self).scope = (0, _scope.createScope)(context, file, $unwrapTraitObject(self).scope);
      e.scope = $unwrapTraitObject(self).scope;
      var isUsed = $unwrapTraitObject(self).isUsed;
      $unwrapTraitObject(self).visitExpression(e.condition);
      $unwrapTraitObject(self).visitBlock(e.then_, isUsed);
      var __PUCK__value__53 = e.else_;
      if ($unwrapTraitObject(__PUCK__value__53).kind == "Some") {
        var _PUCK__value__53$val = _slicedToArray(__PUCK__value__53.value, 1),
            else_ = _PUCK__value__53$val[0];

        $unwrapTraitObject(self).visitBlock(else_, isUsed);
      };
      if (isUsed) {
        var __PUCK__value__54 = e.else_;
        var __PUCK__value__55 = void 0;
        if ($unwrapTraitObject(__PUCK__value__54).kind == "Some") {
          var _PUCK__value__54$val = _slicedToArray(__PUCK__value__54.value, 1),
              _else_ = _PUCK__value__54$val[0];

          var result = (0, _types.findCommonType)([e.then_.type_, _else_.type_]);
          var __PUCK__value__56 = result;
          var __PUCK__value__57 = __PUCK__value__56;
          var __PUCK__value__58 = void 0;
          if ($unwrapTraitObject(__PUCK__value__57).kind == "Ok") {
            var _PUCK__value__57$val = _slicedToArray(__PUCK__value__57.value, 1),
                type_ = _PUCK__value__57$val[0];

            __PUCK__value__58 = type_;
          } else {
            var __PUCK__value__59 = __PUCK__value__56;
            var __PUCK__value__60 = void 0;
            if ($unwrapTraitObject(__PUCK__value__59).kind == "Err") {
              var _PUCK__value__59$val = _slicedToArray(__PUCK__value__59.value, 1),
                  __PUCK__value__61 = _PUCK__value__59$val[0];

              __PUCK__value__60 = reportError(e, "Type " + _entities.Type.displayName.call(e.then_.type_) + " and " + _entities.Type.displayName.call(asType(_else_.type_)) + " is not compatible");
            };
            __PUCK__value__58 = __PUCK__value__60;
          };
          __PUCK__value__55 = __PUCK__value__58;
        } else {
          __PUCK__value__55 = {
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
        e.type_ = __PUCK__value__55;
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
      var result = (0, _structure_visitor.declarePatternVariables)(e.scope, self, e.pattern, false, e.expression.type_, true);
      var __PUCK__value__62 = result;
      var __PUCK__value__63 = __PUCK__value__62;
      if ($unwrapTraitObject(__PUCK__value__63).kind == "Ok") {
        var _PUCK__value__63$val = _slicedToArray(__PUCK__value__63.value, 1),
            patternTy = _PUCK__value__63$val[0];

        if (!(0, _types.isAssignable)(e.expression.type_, patternTy)) {
          $unwrapTraitObject(self).reportError(e.expression, (0, _structure_visitor.notAssignableError)(patternTy, e.expression.type_));
        };
      } else {
        var __PUCK__value__64 = __PUCK__value__62;
        if ($unwrapTraitObject(__PUCK__value__64).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__64).value)[$unwrapTraitObject(0)]).kind == "PatternMismatch") {
          var _PUCK__value__64$val = _slicedToArray(__PUCK__value__64.value, 1),
              _PUCK__value__64$val$ = _slicedToArray(_PUCK__value__64$val[0].value, 3),
              pattern = _PUCK__value__64$val$[0],
              to = _PUCK__value__64$val$[1],
              subject = _PUCK__value__64$val$[2];

          $unwrapTraitObject(self).reportError(e.expression, (0, _structure_visitor.notAssignableError)(to, subject));
        } else {
          var __PUCK__value__65 = __PUCK__value__62;
          if (true) {
            var __PUCK__value__66 = __PUCK__value__65;
          };
        };
      };
      $unwrapTraitObject(self).visitBlock(e.then_, isUsed);
      var __PUCK__value__67 = e.else_;
      if ($unwrapTraitObject(__PUCK__value__67).kind == "Some") {
        var _PUCK__value__67$val = _slicedToArray(__PUCK__value__67.value, 1),
            else_ = _PUCK__value__67$val[0];

        $unwrapTraitObject(self).visitBlock(else_, isUsed);
      };
      if (isUsed) {
        var __PUCK__value__68 = e.else_;
        var __PUCK__value__69 = void 0;
        if ($unwrapTraitObject(__PUCK__value__68).kind == "Some") {
          var _PUCK__value__68$val = _slicedToArray(__PUCK__value__68.value, 1),
              _else_2 = _PUCK__value__68$val[0];

          var _result = (0, _types.findCommonType)([e.then_.type_, _else_2.type_]);
          var __PUCK__value__70 = _result;
          var __PUCK__value__71 = __PUCK__value__70;
          var __PUCK__value__72 = void 0;
          if ($unwrapTraitObject(__PUCK__value__71).kind == "Ok") {
            var _PUCK__value__71$val = _slicedToArray(__PUCK__value__71.value, 1),
                type_ = _PUCK__value__71$val[0];

            __PUCK__value__72 = type_;
          } else {
            var __PUCK__value__73 = __PUCK__value__70;
            var __PUCK__value__74 = void 0;
            if ($unwrapTraitObject(__PUCK__value__73).kind == "Err") {
              var _PUCK__value__73$val = _slicedToArray(__PUCK__value__73.value, 1),
                  __PUCK__value__75 = _PUCK__value__73$val[0];

              __PUCK__value__74 = reportError(e, "Type " + _entities.Type.displayName.call(e.then_.type_) + " and " + _entities.Type.displayName.call(asType(_else_2.type_)) + " is not compatible");
            };
            __PUCK__value__72 = __PUCK__value__74;
          };
          __PUCK__value__69 = __PUCK__value__72;
        } else {
          __PUCK__value__69 = {
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
        e.type_ = __PUCK__value__69;
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
      var __PUCK__value__76 = (0, _enums.checkExhaustive)(e);
      if ($unwrapTraitObject(__PUCK__value__76).kind == "Err") {
        var _PUCK__value__76$val = _slicedToArray(__PUCK__value__76.value, 1),
            error = _PUCK__value__76$val[0];

        $unwrapTraitObject(self).reportError(e, error);
      };
      if (isUsed) {
        var __PUCK__value__77 = void 0;
        if (_core.Iterable['$List<E>'].isNotEmpty.call({ type: '$List<E>', value: e.patterns, $isTraitObject: true })) {
          var __PUCK__value__78 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: e.patterns, $isTraitObject: true }, function (arm) {
            return arm.type_;
          });
          var result = (0, _types.findCommonType)(_core.Iterable[__PUCK__value__78.type].toList.call(__PUCK__value__78));
          var __PUCK__value__79 = result;
          var __PUCK__value__80 = __PUCK__value__79;
          var __PUCK__value__81 = void 0;
          if ($unwrapTraitObject(__PUCK__value__80).kind == "Ok") {
            var _PUCK__value__80$val = _slicedToArray(__PUCK__value__80.value, 1),
                type_ = _PUCK__value__80$val[0];

            __PUCK__value__81 = type_;
          } else {
            var __PUCK__value__82 = __PUCK__value__79;
            var __PUCK__value__83 = void 0;
            if ($unwrapTraitObject(__PUCK__value__82).kind == "Err") {
              var _PUCK__value__82$val = _slicedToArray(__PUCK__value__82.value, 1),
                  __PUCK__value__84 = _PUCK__value__82$val[0];

              __PUCK__value__83 = reportError(e, "Match arms return mixed types " + _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: e.patterns, $isTraitObject: true }, function (arm) {
                return _entities.Type.displayName.call(asType(arm.type_));
              }).value.join(", "));
            };
            __PUCK__value__81 = __PUCK__value__83;
          };
          __PUCK__value__77 = __PUCK__value__81;
        } else {
          __PUCK__value__77 = {
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
        e.type_ = __PUCK__value__77;
      };
      return matchExpression = oldMatchExpression;
    },
    visitMatchArm: function visitMatchArm(a, isUsed) {
      var self = this;
      $unwrapTraitObject(self).scope = (0, _scope.createScope)(context, file, $unwrapTraitObject(self).scope);
      a.scope = $unwrapTraitObject(self).scope;
      var m = _core.Option.unwrap.call(matchExpression);
      var result = (0, _structure_visitor.declarePatternVariables)(a.scope, self, a.pattern, false, m.expression.type_, true);
      var __PUCK__value__85 = result;
      var __PUCK__value__86 = __PUCK__value__85;
      if ($unwrapTraitObject(__PUCK__value__86).kind == "Ok") {
        var _PUCK__value__86$val = _slicedToArray(__PUCK__value__86.value, 1),
            patternTy = _PUCK__value__86$val[0];

        if (!(0, _types.isAssignable)(m.expression.type_, patternTy)) {
          $unwrapTraitObject(self).reportError(a, (0, _structure_visitor.notAssignableError)(m.expression.type_, patternTy));
        };
      } else {
        var __PUCK__value__87 = __PUCK__value__85;
        if ($unwrapTraitObject(__PUCK__value__87).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__87).value)[$unwrapTraitObject(0)]).kind == "PatternMismatch") {
          var _PUCK__value__87$val = _slicedToArray(__PUCK__value__87.value, 1),
              _PUCK__value__87$val$ = _slicedToArray(_PUCK__value__87$val[0].value, 3),
              pattern = _PUCK__value__87$val$[0],
              to = _PUCK__value__87$val$[1],
              subject = _PUCK__value__87$val$[2];

          $unwrapTraitObject(self).reportError(a, (0, _structure_visitor.notAssignableError)(to, subject));
        } else {
          var __PUCK__value__88 = __PUCK__value__85;
          if (true) {
            var __PUCK__value__89 = __PUCK__value__88;
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
        var __PUCK__value__90 = type_.kind;
        if ($unwrapTraitObject(__PUCK__value__90).kind == "Enum") {
          var _ret3 = function () {
            var _PUCK__value__90$val = _slicedToArray(__PUCK__value__90.value, 1),
                enum_ = _PUCK__value__90$val[0];

            var memberIdentifier = $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(typePath.value)[1]).value)[0];
            var member = enum_.members[$unwrapTraitObject($unwrapTraitObject(memberIdentifier).name)];
            if (!member) {
              return {
                v: reportError(memberIdentifier, _entities.Type.displayName.call(type_) + " has no member named " + $unwrapTraitObject(memberIdentifier).name)
              };
            } else {
              var __PUCK__value__91 = member.kind;
              var __PUCK__value__92 = __PUCK__value__91;
              if ($unwrapTraitObject(__PUCK__value__92).kind == "Struct") {
                var _PUCK__value__92$val = _slicedToArray(__PUCK__value__92.value, 1),
                    struct = _PUCK__value__92$val[0];

                var __PUCK__value__93 = struct.kind;
                var __PUCK__value__94 = __PUCK__value__93;
                if ($unwrapTraitObject(__PUCK__value__94).kind == "Record") {
                  var _PUCK__value__94$val = _slicedToArray(__PUCK__value__94.value, 1),
                      record = _PUCK__value__94$val[0];

                  var __PUCK__value__95 = type_._class;
                  var __PUCK__value__96 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__95).kind == "Some") {
                    var _PUCK__value__95$val = _slicedToArray(__PUCK__value__95.value, 1),
                        _class = _PUCK__value__95$val[0];

                    __PUCK__value__96 = (0, _types.createTypeInstance)(type_, asIterable(_class.typeParameters));
                  } else {
                    __PUCK__value__96 = type_;
                  };
                  return {
                    v: e.type_ = {
                      displayName: _core.Option.map.call(type_.name, function (name) {
                        return name + "::" + $unwrapTraitObject(memberIdentifier).name;
                      }),
                      name: type_.name,
                      kind: _entities.TypeKind.Function({
                        selfBinding: _core.None,
                        _arguments: [{
                          name: $unwrapTraitObject(memberIdentifier).name,
                          token: memberIdentifier,
                          mutable: false,
                          type_: member,
                          redefined: false
                        }],
                        argumentRange: {
                          start: 1,
                          end: 2
                        },
                        returnType: __PUCK__value__96,
                        isAbstract: false
                      }),
                      _class: _core.Option.map.call(type_._class, function (_class) {
                        return $unwrapTraitObject(_js._Object).assign({}, _class, { instances: [] });
                      }),
                      instance: type_.instance
                    }
                  };
                } else {
                  var __PUCK__value__97 = __PUCK__value__93;
                  if ($unwrapTraitObject(__PUCK__value__97).kind == "Tuple") {
                    var _PUCK__value__97$val = _slicedToArray(__PUCK__value__97.value, 1),
                        tuple = _PUCK__value__97$val[0];

                    var __PUCK__value__99 = _core.Iterable['$List<E>'].enumerate.call({ type: '$List<E>', value: tuple.properties, $isTraitObject: true });
                    var __PUCK__value__98 = _core.Iterable[__PUCK__value__99.type].map.call(__PUCK__value__99, function (_ref9) {
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
                    var __PUCK__value__100 = type_._class;
                    var __PUCK__value__101 = void 0;
                    if ($unwrapTraitObject(__PUCK__value__100).kind == "Some") {
                      var _PUCK__value__100$va = _slicedToArray(__PUCK__value__100.value, 1),
                          _class2 = _PUCK__value__100$va[0];

                      __PUCK__value__101 = (0, _types.createTypeInstance)(type_, asIterable(_class2.typeParameters));
                    } else {
                      __PUCK__value__101 = type_;
                    };
                    return {
                      v: e.type_ = {
                        displayName: _core.Option.map.call(type_.name, function (name) {
                          return name + "::" + $unwrapTraitObject(memberIdentifier).name;
                        }),
                        name: type_.name,
                        kind: _entities.TypeKind.Function({
                          selfBinding: _core.None,
                          _arguments: _core.Iterable[__PUCK__value__98.type].toList.call(__PUCK__value__98),
                          argumentRange: {
                            start: tuple.properties.length,
                            end: tuple.properties.length + 1
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
                    var __PUCK__value__102 = __PUCK__value__93;
                    if ($unwrapTraitObject(__PUCK__value__102).kind == "Unit") {
                      var _undefined5 = __PUCK__value__102;
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
                var __PUCK__value__103 = __PUCK__value__91;
                if (true) {
                  var __PUCK__value__104 = __PUCK__value__103;
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
      var __PUCK__value__105 = void 0;
      if (e.operator.kind == $unwrapTraitObject(_ast2.SyntaxKind).NotKeyword) {
        __PUCK__value__105 = $unwrapTraitObject($unwrapTraitObject(e.scope).getTypeBinding("Bool")).type_;
      } else {
        var __PUCK__value__106 = void 0;
        if (e.operator.kind == $unwrapTraitObject(_ast2.SyntaxKind).MinusToken || e.operator.kind == $unwrapTraitObject(_ast2.SyntaxKind).PlusToken) {
          __PUCK__value__106 = $unwrapTraitObject($unwrapTraitObject(e.scope).getTypeBinding("Num")).type_;
        };
        __PUCK__value__105 = __PUCK__value__106;
      };
      return e.type_ = __PUCK__value__105;
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
    visitIndexAccess: function visitIndexAccess(a) {
      var self = this;
      a.scope = $unwrapTraitObject(self).scope;
      return $unwrapTraitObject(visit).walkIndexAccess(self, a);
    },
    visitMemberAccess: function visitMemberAccess(a) {
      var self = this;
      a.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(visit).walkExpression(self, a.object);
      if (a.object.type_) {
        var __PUCK__value__107 = $unwrapTraitObject(a.object.type_).kind;
        if ($unwrapTraitObject(__PUCK__value__107).kind == "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__107).value)[$unwrapTraitObject(0)]).kind).kind == "Record") {
          var _PUCK__value__107$va = _slicedToArray(__PUCK__value__107.value, 1),
              _PUCK__value__107$va$ = _slicedToArray(_PUCK__value__107$va[0].kind.value, 1),
              record = _PUCK__value__107$va$[0];

          return a.type_ = record.properties[a.member.name];
        } else {};
      };
    },
    visitBreak: function visitBreak(b) {
      var self = this;
      b.scope = $unwrapTraitObject(self).scope;
      return $unwrapTraitObject(visit).walkBreak(self, b);
    },
    visitReturn: function visitReturn(r) {
      var self = this;
      r.scope = $unwrapTraitObject(self).scope;
      return $unwrapTraitObject(visit).walkReturn(self, r);
    },
    visitListLiteral: function visitListLiteral(l) {
      var self = this;
      l.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(visit).walkListLiteral(self, l);
      if (l.members.length >= 1) {
        var __PUCK__value__108 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: l.members, $isTraitObject: true }, function (m) {
          return m.type_;
        });
        var types = _core.Iterable[__PUCK__value__108.type].toList.call(__PUCK__value__108);
        var result = (0, _types.findCommonType)(types);
        var __PUCK__value__109 = result;
        var __PUCK__value__110 = __PUCK__value__109;
        if ($unwrapTraitObject(__PUCK__value__110).kind == "Ok") {
          var _PUCK__value__110$va = _slicedToArray(__PUCK__value__110.value, 1),
              type_ = _PUCK__value__110$va[0];

          if (!type_) {
            return l.type_ = $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(self).scope).getTypeBinding("List")).type_;
          } else {
            return l.type_ = (0, _types.createTypeInstance)($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(self).scope).getTypeBinding("List")).type_, asIterable([type_]));
          };
        } else {
          var __PUCK__value__111 = __PUCK__value__109;
          if ($unwrapTraitObject(__PUCK__value__111).kind == "Err") {
            var _PUCK__value__111$va = _slicedToArray(__PUCK__value__111.value, 1),
                __PUCK__value__112 = _PUCK__value__111$va[0];

            return reportError(l, "List contains mixed types");
          };
        };
      } else {
        return l.type_ = $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(self).scope).getTypeBinding("List")).type_;
      };
    },
    visitBooleanLiteral: function visitBooleanLiteral(l) {
      var self = this;
      l.scope = $unwrapTraitObject(self).scope;
      l.type_ = $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(self).scope).getTypeBinding("Bool")).type_;
      return $unwrapTraitObject(visit).walkBooleanLiteral(self, l);
    },
    visitNumberLiteral: function visitNumberLiteral(l) {
      var self = this;
      l.scope = $unwrapTraitObject(self).scope;
      l.type_ = $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(self).scope).getTypeBinding("Num")).type_;
      return $unwrapTraitObject(visit).walkNumberLiteral(self, l);
    },
    visitObjectLiteral: function visitObjectLiteral(l) {
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
              return [m.name.name, m.value.type_];
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
      var __PUCK__value__113 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: l.expressions, $isTraitObject: true }, function (e) {
        return e.type_;
      });
      var properties = _core.Iterable[__PUCK__value__113.type].toList.call(__PUCK__value__113);
      return l.type_ = {
        displayName: _core.None,
        name: _core.None,
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: _entities.StructKind.Tuple({ properties: properties })
        }),
        _class: _core.None,
        instance: _core.None
      };
    }
  });
}
