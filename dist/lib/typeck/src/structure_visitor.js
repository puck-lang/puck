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
            if (__PUCK__value__2.kind == "Function") {
              var _PUCK__value__2$valu = _slicedToArray(__PUCK__value__2.value, 1),
                  func = _PUCK__value__2$valu[0];

              __PUCK__value__3 = (0, _core.Some)(func);
            } else {
              __PUCK__value__3 = _core.None;
            };
            __PUCK__value__1 = __PUCK__value__3;
          } else {
            __PUCK__value__1 = _core.None;
          };
          var assignedTo = __PUCK__value__1;
          _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.typeParameters, $isTraitObject: true }, function (p) {
            return $unwrapTraitObject(self).visitTypeParameter(p);
          });
          var __PUCK__value__4 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true });
          _core.Iterable[__PUCK__value__4.type].forEach.call(__PUCK__value__4, function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                i = _ref2[0],
                p = _ref2[1];

            var __PUCK__value__5 = assignedTo;
            var __PUCK__value__6 = void 0;
            if (__PUCK__value__5.kind == "Some") {
              var _PUCK__value__5$valu = _slicedToArray(__PUCK__value__5.value, 1),
                  _assignedTo = _PUCK__value__5$valu[0];

              var __PUCK__value__7 = void 0;
              if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _assignedTo.parameters, $isTraitObject: true }) > i) {
                __PUCK__value__7 = _assignedTo.parameters[i].type_;
              } else {
                __PUCK__value__7 = _js._undefined;
              };
              __PUCK__value__6 = __PUCK__value__7;
            } else {
              __PUCK__value__6 = _js._undefined;
            };
            var type_ = __PUCK__value__6;
            return $unwrapTraitObject(self).visitVariableDeclaration(p, _js._undefined, type_);
          });
          var __PUCK__value__8 = f.returnType;
          if (__PUCK__value__8.kind == "Some") {
            var _PUCK__value__8$valu = _slicedToArray(__PUCK__value__8.value, 1),
                returnType = _PUCK__value__8$valu[0];

            $unwrapTraitObject(self).visitTypeBound(returnType);
          };
          f.type_ = (0, _functions.createFunctionType)($unwrapTraitObject(f.scope), f, reportError);
          var __PUCK__value__9 = f.name;
          if (__PUCK__value__9.kind == "Some") {
            var _PUCK__value__9$valu = _slicedToArray(__PUCK__value__9.value, 1),
                name = _PUCK__value__9$valu[0];

            var token = { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: f, $isTraitObject: true };
            var __PUCK__value__10 = _scope.Scope.define.call(parentScope, {
              name: name.name,
              token: token,
              allowRedeclare: false,
              mutable: false,
              type_: f.type_,
              previous: _core.None,
              completeType: _core.None
            });
            if (__PUCK__value__10.kind == "Err") {
              var _PUCK__value__10$val = _slicedToArray(__PUCK__value__10.value, 1),
                  err = _PUCK__value__10$val[0];

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
        if (_core.Option.isNone.call(f.name)) {
          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: f, $isTraitObject: true }, "Trait functions must have a name");
        };
        if (_core.Option.isNone.call(f.returnType)) {
          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: f, $isTraitObject: true }, "Trait functions must have a return type");
        };
        _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.typeParameters, $isTraitObject: true }, $unwrapTraitObject($unwrapTraitObject(self).visitTypeParameter).bind(self));
        var __PUCK__value__11 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true });
        if (__PUCK__value__11.kind == "Some") {
          var _PUCK__value__11$val = _slicedToArray(__PUCK__value__11.value, 1),
              first = _PUCK__value__11$val[0];

          var __PUCK__value__12 = first.pattern;
          if (__PUCK__value__12.kind == "Identifier") {
            var _PUCK__value__12$val = _slicedToArray(__PUCK__value__12.value, 1),
                _PUCK__value__12$val$ = _PUCK__value__12$val[0],
                name = _PUCK__value__12$val$.name,
                span = _PUCK__value__12$val$.span;

            if (name == "self") {
              var selfTypeBound = first.typeBound;
              if (_core.Option.isNone.call(selfTypeBound)) {
                _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: f.parameterList, $isTraitObject: true }, 0).typeBound = (0, _core.Some)(_ast.TypeBound.NamedTypeBound({
                  path: _ast.TypePath.Member({
                    name: "Self",
                    span: span
                  }),
                  typeParameters: []
                }));
              } else {
                $unwrapTraitObject(self).visitVariableDeclaration(first);
                if (!(0, _types.isAssignable)($unwrapTraitObject(first.type_), selfType)) {
                  reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: first, $isTraitObject: true }, notAssignableError($unwrapTraitObject(first.type_), selfType));
                };
              };
            };
          };
        };
        _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true }, function (p) {
          return $unwrapTraitObject(self).visitVariableDeclaration(p);
        });
        var __PUCK__value__13 = f.returnType;
        if (__PUCK__value__13.kind == "Some") {
          var _PUCK__value__13$val = _slicedToArray(__PUCK__value__13.value, 1),
              returnType = _PUCK__value__13$val[0];

          $unwrapTraitObject(self).visitTypeBound(returnType);
        };
        f.type_ = (0, _functions.createFunctionType)($unwrapTraitObject(f.scope), f, reportError);
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
        var __PUCK__value__15 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.parameters.properties, $isTraitObject: true });
        var __PUCK__value__14 = _core.Iterable[__PUCK__value__15.type].map.call(__PUCK__value__15, function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              i = _ref4[0],
              t = _ref4[1];

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
        var parameters = _core.Iterable[__PUCK__value__14.type].toList.call(__PUCK__value__14);
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
          enumMember: _core.None
        });
        return $unwrapTraitObject(self).scope = parentScope;
      };
    },
    visitNamedTypeBound: function visitNamedTypeBound(t) {
      var self = this;
      if (!t.scope) {
        t.scope = $unwrapTraitObject(self).scope;
        $unwrapTraitObject(self).visitTypePath(t.path);
        var type_ = $unwrapTraitObject(t.path.providesType);
        if (!type_) {
          return [];
        };
        var __PUCK__value__16 = t.path;
        var __PUCK__value__17 = void 0;
        if (__PUCK__value__16.kind == "Member") {
          var _PUCK__value__16$val = _slicedToArray(__PUCK__value__16.value, 1),
              name = _PUCK__value__16$val[0].name;

          var __PUCK__value__18 = void 0;
          if (name == "Self") {
            if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true }) > 0) {
              reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t, $isTraitObject: true }, "Self is not generic");
            };
            __PUCK__value__18 = true;
          } else {
            __PUCK__value__18 = false;
          };
          __PUCK__value__17 = __PUCK__value__18;
        } else {
          __PUCK__value__17 = false;
        };
        var isSelf = __PUCK__value__17;
        if (!isSelf) {
          var __PUCK__value__19 = type_._class;
          if (__PUCK__value__19.kind == "Some") {
            var _PUCK__value__19$val = _slicedToArray(__PUCK__value__19.value, 1),
                _class = _PUCK__value__19$val[0];

            var __PUCK__value__20 = (0, _range.checkRange)(t.typeParameters, _class.parameterRange, "type parameters", _entities.Type.displayName.call(type_));
            if (__PUCK__value__20.kind == "Err") {
              var _PUCK__value__20$val = _slicedToArray(__PUCK__value__20.value, 1),
                  error = _PUCK__value__20$val[0];

              reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t, $isTraitObject: true }, error);
            };
          } else {
            if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true }) > 0) {
              reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t, $isTraitObject: true }, "Type " + _entities.Type.displayName.call(type_) + " is not generic");
            };
          };
        };
        visit.walkNamedTypeBound(self, t);
        var __PUCK__value__21 = void 0;
        if (_core.Option.isSome.call(type_._class)) {
          var __PUCK__value__22 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true }, function (typeBound) {
            return _ast.TypeBound.getType.call(typeBound);
          });
          __PUCK__value__21 = (0, _types.createTypeInstance)(type_, _core.Iterable[__PUCK__value__22.type].toList.call(__PUCK__value__22));
        } else {
          __PUCK__value__21 = type_;
        };
        return t.type_ = __PUCK__value__21;
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
          enumMember: _core.None
        });
      };
    },
    visitRecordTypeBoundMember: visit.walkingVisitor.visitRecordTypeBoundMember,
    visitTupleTypeBound: function visitTupleTypeBound(t) {
      var self = this;
      if (!t.scope) {
        t.scope = $unwrapTraitObject(self).scope;
        visit.walkTupleTypeBound(self, t);
        var __PUCK__value__23 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.properties, $isTraitObject: true }, function (p) {
          return _ast.TypeBound.getType.call(p);
        });
        return t.type_ = (0, _entities.Type)({
          id: _core.None,
          displayName: _core.None,
          name: _core.None,
          kind: _entities.TypeKind.Struct({
            implementations: [],
            kind: _entities.StructKind.Tuple({ properties: _core.Iterable[__PUCK__value__23.type].toList.call(__PUCK__value__23) })
          }),
          _class: _core.None,
          instance: _core.None,
          providesType: _core.None,
          enumMember: _core.None
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
          enumMember: _core.None
        });
        var scope = $unwrapTraitObject(self).scope;
        var __PUCK__value__24 = _scope.Scope.define.call(scope, {
          name: t.name.name,
          token: { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter', value: t, $isTraitObject: true },
          mutable: false,
          allowRedeclare: false,
          type_: _entities.Type.provides($unwrapTraitObject(t.type_)),
          completeType: _core.None,
          previous: _core.None
        });
        if (__PUCK__value__24.kind == "Err") {
          var _PUCK__value__24$val = _slicedToArray(__PUCK__value__24.value, 1),
              err = _PUCK__value__24$val[0];

          return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: t.name, $isTraitObject: true }, err);
        };
      };
    },
    visitTypePath: function visitTypePath(t) {
      var self = this;
      if (!t.type_) {
        t.scope = $unwrapTraitObject(self).scope;
        var scope = $unwrapTraitObject(self).scope;
        var __PUCK__value__25 = _scope.Scope.getTypePath.call(scope, t, visitor);
        if ($unwrapTraitObject(__PUCK__value__25).kind == "Ok") {
          var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__25),
              _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
              binding = _$unwrapTraitObject$v[0];

          t.type_ = binding.type_;
          return t.providesType = _core.Option.unwrapOr.call(binding.type_.providesType, binding.type_);
        } else {
          if ($unwrapTraitObject(__PUCK__value__25).kind == "Err") {
            var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__25),
                _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
                err = _$unwrapTraitObject2$[0];

            return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: t, $isTraitObject: true }, err);
          };
        };
      };
    },
    visitVariableDeclaration: function visitVariableDeclaration(d, visitInitializer, type_) {
      var self = this;
      if (d.scope) {
        return [];
      };
      d.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(self).visitPattern(d.pattern);
      type_ = _core.Option.mapOr.call(d.typeBound, type_, function (bound) {
        $unwrapTraitObject(self).visitTypeBound(bound);
        return _ast.TypeBound.getType.call(bound) || type_;
      });
      d.type_ = type_;
      if (!(0, _types.isAssignable)($unwrapTraitObject(d.pattern.type_), type_)) {
        return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: d.pattern, $isTraitObject: true }, _entities.Type.displayName.call(type_) + " is not assignable to pattern " + _ast.Pattern.displayName.call(d.pattern));
      };
      var scope = $unwrapTraitObject(self).scope;
      var __PUCK__value__26 = void 0;
      if (_core.Option.isSome.call(d.initializer)) {
        __PUCK__value__26 = _scope.Scope.createChild.call(scope);
      } else {
        __PUCK__value__26 = scope;
      };
      var childScope = __PUCK__value__26;
      var __PUCK__value__27 = (0, _patterns.declarePatternVariables)(childScope, self, d.pattern, d.mutable, type_, false, _core.Option.isSome.call(d.initializer));
      if ($unwrapTraitObject(__PUCK__value__27).kind == "Ok") {
        var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__27),
            _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
            __PUCK__value__28 = _$unwrapTraitObject3$[0];
      } else {
        if ($unwrapTraitObject(__PUCK__value__27).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__27).value)[0]).kind == "PatternMismatch") {
          var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__27),
              _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
              _$unwrapTraitObject4$2 = _slicedToArray(_$unwrapTraitObject4$[0].value, 3),
              __PUCK__value__29 = _$unwrapTraitObject4$2[0],
              to = _$unwrapTraitObject4$2[1],
              subject = _$unwrapTraitObject4$2[2];

          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: d, $isTraitObject: true }, notAssignableError(to, subject));
        } else {
          if ($unwrapTraitObject(__PUCK__value__27).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__27).value)[0]).kind == "NotExhaustive") {
            var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__27),
                _$unwrapTraitObject5$ = _toArray(_$unwrapTraitObject5.value);

            reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: d, $isTraitObject: true }, "non exhaustive pattern");
          } else {
            if ($unwrapTraitObject(__PUCK__value__27).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__27).value)[0]).kind == "ScopeError") {
              var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__27),
                  _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
                  _$unwrapTraitObject6$2 = _slicedToArray(_$unwrapTraitObject6$[0].value, 2),
                  token = _$unwrapTraitObject6$2[0],
                  err = _$unwrapTraitObject6$2[1];

              reportError(token, err);
            };
          };
        };
      };
      var __PUCK__value__30 = d.initializer;
      if (__PUCK__value__30.kind == "Some") {
        var _PUCK__value__30$val = _slicedToArray(__PUCK__value__30.value, 1),
            initializer = _PUCK__value__30$val[0];

        var parentVariableDeclarationScope = $unwrapTraitObject(self).variableDeclarationScope;
        $unwrapTraitObject(self).variableDeclarationScope = childScope;
        if (visitInitializer) {
          visitInitializer(initializer);
        } else {
          $unwrapTraitObject(self).visitExpression(initializer);
        };
        _scope.Scope.merge.call(scope, childScope);
        $unwrapTraitObject(self).variableDeclarationScope = parentVariableDeclarationScope;
        var initializerType = _ast.Expression.getType.call(initializer);
        if (!d.type_ && d.pattern.binding) {
          d.pattern.binding.type_ = initializerType;
          d.type_ = initializerType;
        } else {
          if (!(0, _types.isAssignable)(type_, initializerType)) {
            return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: initializer, $isTraitObject: true }, notAssignableError(type_, initializerType));
          };
        };
        if (!(0, _types.isAssignable)($unwrapTraitObject(d.pattern.type_), initializerType)) {
          return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: d, $isTraitObject: true }, notAssignableError($unwrapTraitObject(d.pattern.type_), initializerType));
        };
      };
    }
  };
}
