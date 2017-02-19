'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.notAssignableError = notAssignableError;
exports.structureVisitor = structureVisitor;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _util = require('util');

var _ast = require('./../../ast/ast');

var _span = require('./../../ast/span');

var _visit = require('./../../ast/visit');

var visit = _interopRequireWildcard(_visit);

var _ast2 = require('./../../compiler/ast');

var _entities = require('./../../entities');

var _functions = require('./functions');

var _patterns = require('./patterns');

var _range = require('./range');

var _scope = require('./scope');

var _types = require('./types');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};
function notAssignableError(to, subject) {
  return _entities.Type.displayName.call(subject) + " is not assignable to type " + _entities.Type.displayName.call(to);
};
function structureVisitor(reportError) {
  var visitor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

  return {
    visitEnumMember: visit.walkingVisitor.visitEnumMember,
    visitFunctionDeclaration: function visitFunctionDeclaration(f) {
      var self = this;
      if (!f.scope) {
        var _ret = function () {
          var parentScope = $unwrapTraitObject(self).scope;
          $unwrapTraitObject(self).scope = _scope.Scope.createChild.call(parentScope);
          f.scope = $unwrapTraitObject(self).scope;
          var __PUCK__value__1 = void 0;
          if ($unwrapTraitObject(self).assignedTo) {
            var __PUCK__value__2 = $unwrapTraitObject($unwrapTraitObject(self).assignedTo).kind;
            var __PUCK__value__3 = void 0;
            if ($unwrapTraitObject(__PUCK__value__2).kind == "Function") {
              var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__2),
                  _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
                  func = _$unwrapTraitObject$v[0];

              __PUCK__value__3 = func;
            };
            __PUCK__value__1 = __PUCK__value__3;
          };
          var assignedTo = __PUCK__value__1;
          _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.typeParameters, $isTraitObject: true }, function (p) {
            return $unwrapTraitObject(self).visitTypeParameter(p);
          });
          var __PUCK__value__4 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true });
          _core.Iterable[__PUCK__value__4.type].forEach.call(__PUCK__value__4, function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                p = _ref2[0],
                i = _ref2[1];

            var __PUCK__value__5 = void 0;
            if (assignedTo && $unwrapTraitObject(assignedTo.parameters)[i]) {
              __PUCK__value__5 = $unwrapTraitObject($unwrapTraitObject(assignedTo.parameters)[i]).type_;
            } else {
              __PUCK__value__5 = _js._undefined;
            };
            var type_ = __PUCK__value__5;
            return $unwrapTraitObject(self).visitVariableDeclaration(p, _js._undefined, type_);
          });
          var __PUCK__value__6 = f.returnType;
          if ($unwrapTraitObject(__PUCK__value__6).kind == "Some") {
            var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__6),
                _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
                returnType = _$unwrapTraitObject2$[0];

            $unwrapTraitObject(self).visitTypeBound(returnType);
          };
          f.type_ = (0, _functions.createFunctionType)(f.scope, f, reportError);
          var __PUCK__value__7 = f.name;
          if ($unwrapTraitObject(__PUCK__value__7).kind == "Some") {
            var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__7),
                _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
                name = _$unwrapTraitObject3$[0];

            var token = { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: f, $isTraitObject: true };
            var __PUCK__value__8 = _scope.Scope.define.call(parentScope, {
              name: name.name,
              token: token,
              allowRedeclare: false,
              mutable: false,
              type_: f.type_,
              previous: _core.None,
              completeType: _core.None,
              complete: true
            });
            if ($unwrapTraitObject(__PUCK__value__8).kind == "Err") {
              var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__8),
                  _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
                  err = _$unwrapTraitObject4$[0];

              reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: name, $isTraitObject: true }, err);
            };
          };
          return {
            v: $unwrapTraitObject(self).scope = parentScope
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      };
    },
    visitMethodDeclaration: function visitMethodDeclaration(f, selfType) {
      var self = this;
      if (!f.scope) {
        var parentScope = $unwrapTraitObject(self).scope;
        $unwrapTraitObject(self).scope = _scope.Scope.createChild.call(parentScope);
        f.scope = $unwrapTraitObject(self).scope;
        _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.typeParameters, $isTraitObject: true }, $unwrapTraitObject($unwrapTraitObject(self).visitTypeParameter).bind(self));
        var __PUCK__value__9 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true });
        if ($unwrapTraitObject(__PUCK__value__9).kind == "Some") {
          var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__9),
              _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
              first = _$unwrapTraitObject5$[0];

          var __PUCK__value__10 = first.pattern;
          if ($unwrapTraitObject(__PUCK__value__10).kind == "Identifier") {
            var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__10),
                _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
                _$unwrapTraitObject6$2 = _$unwrapTraitObject6$[0],
                name = _$unwrapTraitObject6$2.name,
                span = _$unwrapTraitObject6$2.span;

            if (name == "self") {
              var selfTypeBound = first.typeBound;
              if (_core.Option.isNone.call(selfTypeBound)) {
                $unwrapTraitObject(f.parameterList[0]).typeBound = (0, _core.Some)(_ast.TypeBound.NamedTypeBound({
                  path: _ast.TypePath.Member({
                    name: "Self",
                    span: span
                  }),
                  typeParameters: []
                }));
              } else {
                $unwrapTraitObject(self).visitVariableDeclaration(first);
                if (!(0, _types.isAssignable)(first.type_, selfType)) {
                  reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: first, $isTraitObject: true }, notAssignableError(first.type_, selfType));
                };
              };
            };
          };
        };
        _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true }, function (p) {
          return $unwrapTraitObject(self).visitVariableDeclaration(p);
        });
        var __PUCK__value__11 = f.returnType;
        if ($unwrapTraitObject(__PUCK__value__11).kind == "Some") {
          var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__11),
              _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
              returnType = _$unwrapTraitObject7$[0];

          $unwrapTraitObject(self).visitTypeBound(returnType);
        };
        f.type_ = (0, _functions.createFunctionType)(f.scope, f, reportError);
        return $unwrapTraitObject(self).scope = parentScope;
      };
    },
    visitTypeBound: function visitTypeBound(t) {
      var self = this;
      return visit.walkTypeBound(self, t);
    },
    visitFunctionTypeBound: function visitFunctionTypeBound(t) {
      var self = this;
      if (!t.scope) {
        var parentScope = $unwrapTraitObject(self).scope;
        $unwrapTraitObject(self).scope = _scope.Scope.createChild.call(parentScope);
        t.scope = $unwrapTraitObject(self).scope;
        visit.walkFunctionTypeBound(self, t);
        var __PUCK__value__13 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.parameters.properties, $isTraitObject: true });
        var __PUCK__value__12 = _core.Iterable[__PUCK__value__13.type].map.call(__PUCK__value__13, function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              t = _ref4[0],
              i = _ref4[1];

          return {
            name: "" + i + "",
            token: t,
            mutable: false,
            allowRedeclare: true,
            type_: _ast.TypeBound.getType.call(t),
            completeType: _core.None,
            previous: _core.None
          };
        });
        var parameters = _core.Iterable[__PUCK__value__12.type].toList.call(__PUCK__value__12);
        t.type_ = (0, _entities.Type)({
          id: _core.None,
          displayName: _core.None,
          name: _core.None,
          kind: _entities.TypeKind.Function({
            selfBinding: _core.None,
            parameters: parameters,
            parameterRange: {
              start: _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameters, $isTraitObject: true }),
              end: _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameters, $isTraitObject: true }) + 1
            },
            returnType: _ast.TypeBound.getType.call(t.returnType),
            isAbstract: false
          }),
          _class: _entities.TypeClass.fromAstNode(t, reportError),
          instance: _core.None,
          providesType: _core.None,
          enumMember: _core.None,
          complete: true
        });
        return $unwrapTraitObject(self).scope = parentScope;
      };
    },
    visitNamedTypeBound: function visitNamedTypeBound(t) {
      var self = this;
      if (!t.scope) {
        t.scope = $unwrapTraitObject(self).scope;
        $unwrapTraitObject(self).visitTypePath(t.path);
        var type_ = t.path.providesType;
        if (!type_) {
          return [];
        };
        var __PUCK__value__14 = t.path;
        var __PUCK__value__15 = void 0;
        if ($unwrapTraitObject(__PUCK__value__14).kind == "Member") {
          var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__14),
              _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
              name = _$unwrapTraitObject8$[0].name;

          var __PUCK__value__16 = void 0;
          if (name == "Self") {
            if (t.typeParameters.length > 0) {
              reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t, $isTraitObject: true }, "Self is not generic");
            };
            __PUCK__value__16 = true;
          } else {
            __PUCK__value__16 = false;
          };
          __PUCK__value__15 = __PUCK__value__16;
        } else {
          __PUCK__value__15 = false;
        };
        var isSelf = __PUCK__value__15;
        if (!isSelf) {
          var __PUCK__value__17 = type_._class;
          if ($unwrapTraitObject(__PUCK__value__17).kind == "Some") {
            var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__17),
                _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
                _class = _$unwrapTraitObject9$[0];

            var __PUCK__value__18 = (0, _range.checkRange)(t.typeParameters, _class.parameterRange, "type parameters", _entities.Type.displayName.call(type_));
            if ($unwrapTraitObject(__PUCK__value__18).kind == "Err") {
              var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__18),
                  _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
                  error = _$unwrapTraitObject11[0];

              reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t, $isTraitObject: true }, error);
            };
          } else {
            if (t.typeParameters.length > 0) {
              reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t, $isTraitObject: true }, "Type " + _entities.Type.displayName.call(type_) + " is not generic");
            };
          };
        };
        visit.walkNamedTypeBound(self, t);
        var __PUCK__value__19 = void 0;
        if (_core.Option.isSome.call(type_._class)) {
          __PUCK__value__19 = (0, _types.createTypeInstance)(type_, _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true }, function (typeBound) {
            return _ast.TypeBound.getType.call(typeBound);
          }));
        } else {
          __PUCK__value__19 = type_;
        };
        return t.type_ = __PUCK__value__19;
      };
    },
    visitRecordTypeBound: function visitRecordTypeBound(t) {
      var self = this;
      if (!t.scope) {
        t.scope = $unwrapTraitObject(self).scope;
        visit.walkRecordTypeBound(self, t);
        return t.type_ = (0, _entities.Type)({
          id: _core.None,
          displayName: _core.None,
          name: _core.None,
          kind: _entities.TypeKind.Struct({
            implementations: [],
            kind: _entities.StructKind.Record({ properties: _core.ObjectMap.fromIter(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.properties, $isTraitObject: true }, function (member) {
                return [member.name.name, _ast.TypeBound.getType.call(member.typeBound)];
              })) })
          }),
          _class: _core.None,
          instance: _core.None,
          providesType: _core.None,
          enumMember: _core.None,
          complete: true
        });
      };
    },
    visitRecordTypeBoundMember: visit.walkingVisitor.visitRecordTypeBoundMember,
    visitTupleTypeBound: function visitTupleTypeBound(t) {
      var self = this;
      if (!t.scope) {
        t.scope = $unwrapTraitObject(self).scope;
        visit.walkTupleTypeBound(self, t);
        var __PUCK__value__20 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.properties, $isTraitObject: true }, function (p) {
          return _ast.TypeBound.getType.call(p);
        });
        return t.type_ = (0, _entities.Type)({
          id: _core.None,
          displayName: _core.None,
          name: _core.None,
          kind: _entities.TypeKind.Struct({
            implementations: [],
            kind: _entities.StructKind.Tuple({ properties: _core.Iterable[__PUCK__value__20.type].toList.call(__PUCK__value__20) })
          }),
          _class: _core.None,
          instance: _core.None,
          providesType: _core.None,
          enumMember: _core.None,
          complete: true
        });
      };
    },
    visitTypeParameter: function visitTypeParameter(t) {
      var self = this;
      if (!t.scope) {
        t.scope = $unwrapTraitObject(self).scope;
        visit.walkTypeParameter(self, t);
        t.type_ = (0, _entities.Type)({
          id: (0, _core.Some)(t.name.name),
          displayName: _core.None,
          name: (0, _core.Some)(t.name.name),
          kind: _entities.TypeKind.Parameter({ defaultValue: _core.Option.map.call(t.defaultValue, function (typeBound) {
              return _ast.TypeBound.getType.call(typeBound);
            }) }),
          _class: _core.None,
          instance: _core.None,
          providesType: _core.None,
          enumMember: _core.None,
          complete: true
        });
        var scope = $unwrapTraitObject(self).scope;
        var __PUCK__value__21 = _scope.Scope.define.call(scope, {
          name: t.name.name,
          token: { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter', value: t, $isTraitObject: true },
          mutable: false,
          allowRedeclare: false,
          type_: _entities.Type.provides(t.type_),
          completeType: _core.None,
          previous: _core.None
        });
        if ($unwrapTraitObject(__PUCK__value__21).kind == "Err") {
          var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__21),
              _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12.value, 1),
              err = _$unwrapTraitObject13[0];

          return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: t.name, $isTraitObject: true }, err);
        };
      };
    },
    visitTypePath: function visitTypePath(t) {
      var self = this;
      if (!t.type_) {
        t.scope = $unwrapTraitObject(self).scope;
        var scope = $unwrapTraitObject(self).scope;
        var __PUCK__value__22 = _scope.Scope.getTypePath.call(scope, t, visitor);
        var __PUCK__value__23 = __PUCK__value__22;
        if ($unwrapTraitObject(__PUCK__value__23).kind == "Ok") {
          var _$unwrapTraitObject14 = $unwrapTraitObject(__PUCK__value__23),
              _$unwrapTraitObject15 = _slicedToArray(_$unwrapTraitObject14.value, 1),
              binding = _$unwrapTraitObject15[0];

          t.type_ = binding.type_;
          return t.providesType = _core.Option.unwrapOr.call(binding.type_.providesType, binding.type_);
        } else {
          var __PUCK__value__24 = __PUCK__value__22;
          if ($unwrapTraitObject(__PUCK__value__24).kind == "Err") {
            var _$unwrapTraitObject16 = $unwrapTraitObject(__PUCK__value__24),
                _$unwrapTraitObject17 = _slicedToArray(_$unwrapTraitObject16.value, 1),
                err = _$unwrapTraitObject17[0];

            return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: t, $isTraitObject: true }, err);
          };
        };
      };
    },
    visitVariableDeclaration: function visitVariableDeclaration(d, visitInitializer, type_) {
      var allowNotExhaustive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      var self = this;
      if (d.scope) {
        return _js._undefined;
      };
      d.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(self).visitPattern(d.pattern);
      type_ = _core.Option.mapOr.call(d.typeBound, type_, function (bound) {
        $unwrapTraitObject(self).visitTypeBound(bound);
        return _ast.TypeBound.getType.call(bound) || type_;
      });
      d.type_ = type_;
      if (!(0, _types.isAssignable)(d.pattern.type_, d.type_)) {
        return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: d.pattern, $isTraitObject: true }, _entities.Type.displayName.call(type_) + " is not assignable to pattern " + _ast.Pattern.displayName.call(d.pattern));
      };
      var __PUCK__value__25 = (0, _patterns.declarePatternVariables)(d.scope, self, d.pattern, d.mutable, d.type_, allowNotExhaustive);
      var __PUCK__value__26 = __PUCK__value__25;
      if ($unwrapTraitObject(__PUCK__value__26).kind == "Ok") {
        var _$unwrapTraitObject18 = $unwrapTraitObject(__PUCK__value__26),
            _$unwrapTraitObject19 = _slicedToArray(_$unwrapTraitObject18.value, 1),
            __PUCK__value__27 = _$unwrapTraitObject19[0];
      } else {
        var __PUCK__value__28 = __PUCK__value__25;
        if ($unwrapTraitObject(__PUCK__value__28).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__28).value)[$unwrapTraitObject(0)]).kind == "PatternMismatch") {
          var _$unwrapTraitObject20 = $unwrapTraitObject(__PUCK__value__28),
              _$unwrapTraitObject21 = _slicedToArray(_$unwrapTraitObject20.value, 1),
              _$unwrapTraitObject22 = _slicedToArray(_$unwrapTraitObject21[0].value, 3),
              __PUCK__value__29 = _$unwrapTraitObject22[0],
              to = _$unwrapTraitObject22[1],
              subject = _$unwrapTraitObject22[2];

          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: d, $isTraitObject: true }, notAssignableError(to, subject));
        } else {
          var __PUCK__value__30 = __PUCK__value__25;
          if ($unwrapTraitObject(__PUCK__value__30).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__30).value)[$unwrapTraitObject(0)]).kind == "NotExhaustive") {
            var _$unwrapTraitObject23 = $unwrapTraitObject(__PUCK__value__30),
                _$unwrapTraitObject24 = _toArray(_$unwrapTraitObject23.value);

            reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: d, $isTraitObject: true }, "non exhaustive pattern");
          } else {
            var __PUCK__value__31 = __PUCK__value__25;
            if ($unwrapTraitObject(__PUCK__value__31).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__31).value)[$unwrapTraitObject(0)]).kind == "ScopeError") {
              var _$unwrapTraitObject25 = $unwrapTraitObject(__PUCK__value__31),
                  _$unwrapTraitObject26 = _slicedToArray(_$unwrapTraitObject25.value, 1),
                  _$unwrapTraitObject27 = _slicedToArray(_$unwrapTraitObject26[0].value, 2),
                  token = _$unwrapTraitObject27[0],
                  err = _$unwrapTraitObject27[1];

              reportError(token, err);
            };
          };
        };
      };
      var __PUCK__value__32 = d.initializer;
      if ($unwrapTraitObject(__PUCK__value__32).kind == "Some") {
        var _$unwrapTraitObject28 = $unwrapTraitObject(__PUCK__value__32),
            _$unwrapTraitObject29 = _slicedToArray(_$unwrapTraitObject28.value, 1),
            initializer = _$unwrapTraitObject29[0];

        if (visitInitializer) {
          visitInitializer(initializer);
        } else {
          $unwrapTraitObject(self).visitExpression(initializer);
        };
        var initializerType = _ast.Expression.getType.call(initializer);
        if (!d.type_ && d.pattern.binding) {
          $unwrapTraitObject(d.pattern.binding).type_ = initializerType;
          d.type_ = initializerType;
        } else {
          if (!(0, _types.isAssignable)(d.type_, initializerType)) {
            return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: initializer, $isTraitObject: true }, notAssignableError(d.type_, initializerType));
          };
        };
        if (!(0, _types.isAssignable)(d.pattern.type_, initializerType)) {
          return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: d, $isTraitObject: true }, notAssignableError(d.pattern.type_, initializerType));
        };
      };
    }
  };
}
