'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PatternError = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.notAssignableError = notAssignableError;
exports.structureVisitor = structureVisitor;
exports.declarePatternVariables = declarePatternVariables;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _util = require('util');

var _ast = require('./../../ast/ast');

var _span = require('./../../ast/span');

var _visit = require('./../../ast/visit');

var visit = _interopRequireWildcard(_visit);

var _ast2 = require('./../../compiler/ast');

var _entities = require('./../../entities');

var _enums = require('./enums');

var _functions = require('./functions');

var _range = require('./range');

var _types = require('./types');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};
var PatternError = exports.PatternError = {
  PatternMismatch: function PatternMismatch() {
    for (var _len = arguments.length, members = Array(_len), _key = 0; _key < _len; _key++) {
      members[_key] = arguments[_key];
    }

    return { kind: 'PatternMismatch', value: members };
  },
  NotExhaustive: { kind: 'NotExhaustive', value: Symbol('NotExhaustive') }
};
function notAssignableError(to, subject) {
  return _entities.Type.displayName.call(subject) + " is not assignable to type " + _entities.Type.displayName.call(to);
};
function structureVisitor(reportError) {
  return {
    visitEnumMember: $unwrapTraitObject($unwrapTraitObject(visit).walkingVisitor).visitEnumMember,
    visitFunctionDeclaration: function visitFunctionDeclaration(f) {
      var self = this;
      if (!f.scope) {
        var _ret = function () {
          $unwrapTraitObject(self).scope = $unwrapTraitObject($unwrapTraitObject(self).scope).createChild();
          f.scope = $unwrapTraitObject(self).scope;
          var __PUCK__value__1 = void 0;
          if ($unwrapTraitObject(self).assignedTo && $unwrapTraitObject($unwrapTraitObject(self).assignedTo).type_) {
            var __PUCK__value__2 = $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(self).assignedTo).type_).kind;
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
          _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: f.typeParameters, $isTraitObject: true }, $unwrapTraitObject($unwrapTraitObject(self).visitTypeParameter).bind(self));
          var __PUCK__value__4 = _core.Iterable['$List<E>'].enumerate.call({ type: '$List<E>', value: f.parameterList, $isTraitObject: true });
          _core.Iterable[__PUCK__value__4.type].forEach.call(__PUCK__value__4, function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                p = _ref2[0],
                i = _ref2[1];

            var __PUCK__value__5 = void 0;
            if (assignedTo && $unwrapTraitObject(assignedTo.parameters)[i]) {
              __PUCK__value__5 = $unwrapTraitObject($unwrapTraitObject(assignedTo.parameters)[i]).type_;
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

            var token = { type: '$FunctionDeclaration', value: f, $isTraitObject: true };
            $unwrapTraitObject($unwrapTraitObject(f.scope).parent).define({
              name: name.name,
              token: token,
              mutable: false,
              type_: f.type_
            });
          };
          return {
            v: $unwrapTraitObject(self).scope = $unwrapTraitObject(f.scope).parent
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      };
    },
    visitMethodDeclaration: function visitMethodDeclaration(f, selfType) {
      var self = this;
      if (!f.scope) {
        $unwrapTraitObject(self).scope = $unwrapTraitObject($unwrapTraitObject(self).scope).createChild();
        f.scope = $unwrapTraitObject(self).scope;
        _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: f.typeParameters, $isTraitObject: true }, $unwrapTraitObject($unwrapTraitObject(self).visitTypeParameter).bind(self));
        var __PUCK__value__8 = _core.Iterable['$List<E>'].first.call({ type: '$List<E>', value: f.parameterList, $isTraitObject: true });
        if ($unwrapTraitObject(__PUCK__value__8).kind == "Some") {
          var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__8),
              _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
              first = _$unwrapTraitObject4$[0];

          var __PUCK__value__9 = first.pattern;
          if ($unwrapTraitObject(__PUCK__value__9).kind == "Identifier") {
            var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__9),
                _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
                _$unwrapTraitObject5$2 = _$unwrapTraitObject5$[0],
                name = _$unwrapTraitObject5$2.name,
                span = _$unwrapTraitObject5$2.span;

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
                  reportError({ type: '$VariableDeclaration', value: first, $isTraitObject: true }, notAssignableError(first.type_, selfType));
                };
              };
            };
          };
        };
        _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: f.parameterList, $isTraitObject: true }, function (p) {
          return $unwrapTraitObject(self).visitVariableDeclaration(p);
        });
        var __PUCK__value__10 = f.returnType;
        if ($unwrapTraitObject(__PUCK__value__10).kind == "Some") {
          var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__10),
              _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
              returnType = _$unwrapTraitObject6$[0];

          $unwrapTraitObject(self).visitTypeBound(returnType);
        };
        f.type_ = (0, _functions.createFunctionType)(f.scope, f, reportError);
        return $unwrapTraitObject(self).scope = $unwrapTraitObject(f.scope).parent;
      };
    },
    visitTypeBound: function visitTypeBound(t) {
      var self = this;
      return $unwrapTraitObject(visit).walkTypeBound(self, t);
    },
    visitFunctionTypeBound: function visitFunctionTypeBound(t) {
      var self = this;
      if (!t.scope) {
        $unwrapTraitObject(self).scope = $unwrapTraitObject($unwrapTraitObject(self).scope).createChild();
        t.scope = $unwrapTraitObject(self).scope;
        $unwrapTraitObject(visit).walkFunctionTypeBound(self, t);
        var __PUCK__value__12 = _core.Iterable['$List<E>'].enumerate.call({ type: '$List<E>', value: t.parameters.properties, $isTraitObject: true });
        var __PUCK__value__11 = _core.Iterable[__PUCK__value__12.type].map.call(__PUCK__value__12, function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              t = _ref4[0],
              i = _ref4[1];

          return {
            name: "" + i + "",
            mutable: false,
            type_: _ast.TypeBound.getType.call(t)
          };
        });
        var parameters = _core.Iterable[__PUCK__value__11.type].toList.call(__PUCK__value__11);
        t.type_ = {
          displayName: _core.None,
          name: _core.None,
          kind: _entities.TypeKind.Function({
            selfBinding: _core.None,
            parameters: parameters,
            parameterRange: {
              start: parameters.length,
              end: parameters.length + 1
            },
            returnType: _ast.TypeBound.getType.call(t.returnType),
            isAbstract: false
          }),
          _class: _entities.TypeClass.fromAstNode(t, reportError),
          instance: _core.None
        };
        return $unwrapTraitObject(self).scope = $unwrapTraitObject($unwrapTraitObject(self).scope).parent;
      };
    },
    visitNamedTypeBound: function visitNamedTypeBound(t) {
      var self = this;
      if (!t.scope) {
        t.scope = $unwrapTraitObject(self).scope;
        $unwrapTraitObject(self).visitTypePath(t.path);
        var type_ = t.path.type_;
        if (!type_) {
          return [];
        };
        var __PUCK__value__13 = t.path;
        var __PUCK__value__14 = void 0;
        if ($unwrapTraitObject(__PUCK__value__13).kind == "Member") {
          var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__13),
              _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
              name = _$unwrapTraitObject7$[0].name;

          var __PUCK__value__15 = void 0;
          if (name == "Self") {
            if (t.typeParameters.length > 0) {
              reportError({ type: '$NamedTypeBound', value: t, $isTraitObject: true }, "Self is not generic");
            };
            var __PUCK__value__16 = type_._class;
            if ($unwrapTraitObject(__PUCK__value__16).kind == "Some") {
              var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__16),
                  _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
                  _class = _$unwrapTraitObject8$[0];

              t.typeParameters = $unwrapTraitObject(_class.typeParameterBindings).map(function (_ref5) {
                var name = _ref5.name;

                return _ast.TypeBound.NamedTypeBound({
                  kind: $unwrapTraitObject(_ast2.SyntaxKind).NamedTypeBound,
                  path: _ast.TypePath.Member(name),
                  typeParameters: []
                });
              });
            };
            __PUCK__value__15 = true;
          } else {
            __PUCK__value__15 = false;
          };
          __PUCK__value__14 = __PUCK__value__15;
        } else {
          __PUCK__value__14 = false;
        };
        var isSelf = __PUCK__value__14;
        if (!isSelf) {
          var __PUCK__value__17 = type_._class;
          if ($unwrapTraitObject(__PUCK__value__17).kind == "Some") {
            var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__17),
                _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
                _class2 = _$unwrapTraitObject9$[0];

            var __PUCK__value__18 = (0, _range.checkRange)(t.typeParameters, _class2.parameterRange, "type parameters", _entities.Type.displayName.call(type_));
            if ($unwrapTraitObject(__PUCK__value__18).kind == "Err") {
              var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__18),
                  _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
                  error = _$unwrapTraitObject11[0];

              reportError({ type: '$NamedTypeBound', value: t, $isTraitObject: true }, error);
            };
          } else {
            if (t.typeParameters.length > 0) {
              reportError({ type: '$NamedTypeBound', value: t, $isTraitObject: true }, "Type " + _entities.Type.displayName.call(type_) + " is not generic");
            };
          };
        };
        $unwrapTraitObject(visit).walkNamedTypeBound(self, t);
        var __PUCK__value__19 = void 0;
        if (_core.Option.isSome.call(type_._class)) {
          __PUCK__value__19 = (0, _types.createTypeInstance)(type_, _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: t.typeParameters, $isTraitObject: true }, function (typeBound) {
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
        $unwrapTraitObject(visit).walkRecordTypeBound(self, t);
        return t.type_ = {
          displayName: _core.None,
          name: _core.None,
          kind: _entities.TypeKind.Struct({
            implementations: [],
            kind: _entities.StructKind.Record({ properties: _core.ObjectMap.fromIter(_core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: t.properties, $isTraitObject: true }, function (member) {
                return [member.name.name, _ast.TypeBound.getType.call(member.typeBound)];
              })) })
          }),
          _class: _core.None,
          instance: _core.None
        };
      };
    },
    visitRecordTypeBoundMember: $unwrapTraitObject($unwrapTraitObject(visit).walkingVisitor).visitRecordTypeBoundMember,
    visitTupleTypeBound: function visitTupleTypeBound(t) {
      var self = this;
      if (!t.scope) {
        t.scope = $unwrapTraitObject(self).scope;
        $unwrapTraitObject(visit).walkTupleTypeBound(self, t);
        var __PUCK__value__20 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: t.properties, $isTraitObject: true }, function (p) {
          return _ast.TypeBound.getType.call(p);
        });
        return t.type_ = {
          displayName: _core.None,
          name: _core.None,
          kind: _entities.TypeKind.Struct({
            implementations: [],
            kind: _entities.StructKind.Tuple({ properties: _core.Iterable[__PUCK__value__20.type].toList.call(__PUCK__value__20) })
          }),
          _class: _core.None,
          instance: _core.None
        };
      };
    },
    visitTypeParameter: function visitTypeParameter(t) {
      var self = this;
      if (!t.scope) {
        t.scope = $unwrapTraitObject(self).scope;
        $unwrapTraitObject(visit).walkTypeParameter(self, t);
        t.type_ = {
          displayName: _core.None,
          name: (0, _core.Some)(t.name.name),
          kind: _entities.TypeKind.Parameter({ defaultValue: _core.Option.map.call(t.defaultValue, function (typeBound) {
              return _ast.TypeBound.getType.call(typeBound);
            }) }),
          _class: _core.None,
          instance: _core.None
        };
        return $unwrapTraitObject($unwrapTraitObject(self).scope).defineType(t.type_, t);
      };
    },
    visitTypePath: function visitTypePath(t) {
      var self = this;
      if (!t.type_) {
        t.scope = $unwrapTraitObject(self).scope;
        var result = $unwrapTraitObject($unwrapTraitObject(self).scope).getTypePath(t);
        var __PUCK__value__21 = result;
        var __PUCK__value__22 = __PUCK__value__21;
        if ($unwrapTraitObject(__PUCK__value__22).kind == "Ok") {
          var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__22),
              _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12.value, 1),
              binding = _$unwrapTraitObject13[0];

          return t.type_ = binding.type_;
        } else {
          var __PUCK__value__23 = __PUCK__value__21;
          if ($unwrapTraitObject(__PUCK__value__23).kind == "Err") {
            var _$unwrapTraitObject14 = $unwrapTraitObject(__PUCK__value__23),
                _$unwrapTraitObject15 = _slicedToArray(_$unwrapTraitObject14.value, 1),
                err = _$unwrapTraitObject15[0];

            return reportError({ type: '$TypePath', value: t, $isTraitObject: true }, err);
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
      d.type_ = _core.Option.mapOr.call(d.typeBound, type_, function (bound) {
        $unwrapTraitObject(self).visitTypeBound(bound);
        return _ast.TypeBound.getType.call(bound) || type_;
      });
      var patternType = _core.None;
      var __PUCK__value__24 = declarePatternVariables(d.scope, self, d.pattern, d.mutable, d.type_, allowNotExhaustive);
      var __PUCK__value__25 = __PUCK__value__24;
      if ($unwrapTraitObject(__PUCK__value__25).kind == "Ok") {
        var _$unwrapTraitObject16 = $unwrapTraitObject(__PUCK__value__25),
            _$unwrapTraitObject17 = _slicedToArray(_$unwrapTraitObject16.value, 1),
            patternTy = _$unwrapTraitObject17[0];

        patternType = (0, _core.Some)(patternTy);
        if (!(0, _types.isAssignable)(patternTy, d.type_)) {
          reportError({ type: '$VariableDeclaration', value: d, $isTraitObject: true }, notAssignableError(patternTy, d.type_));
        };
      } else {
        var __PUCK__value__26 = __PUCK__value__24;
        if ($unwrapTraitObject(__PUCK__value__26).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__26).value)[$unwrapTraitObject(0)]).kind == "PatternMismatch") {
          var _$unwrapTraitObject18 = $unwrapTraitObject(__PUCK__value__26),
              _$unwrapTraitObject19 = _slicedToArray(_$unwrapTraitObject18.value, 1),
              _$unwrapTraitObject20 = _slicedToArray(_$unwrapTraitObject19[0].value, 3),
              __PUCK__value__27 = _$unwrapTraitObject20[0],
              to = _$unwrapTraitObject20[1],
              subject = _$unwrapTraitObject20[2];

          reportError({ type: '$VariableDeclaration', value: d, $isTraitObject: true }, notAssignableError(to, subject));
        } else {
          var __PUCK__value__28 = __PUCK__value__24;
          if ($unwrapTraitObject(__PUCK__value__28).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__28).value)[$unwrapTraitObject(0)]).kind == "NotExhaustive") {
            var _$unwrapTraitObject21 = $unwrapTraitObject(__PUCK__value__28),
                _$unwrapTraitObject22 = _toArray(_$unwrapTraitObject21.value);

            reportError({ type: '$VariableDeclaration', value: d, $isTraitObject: true }, "non exhaustive pattern");
          };
        };
      };
      var __PUCK__value__29 = d.initializer;
      if ($unwrapTraitObject(__PUCK__value__29).kind == "Some") {
        var _$unwrapTraitObject23 = $unwrapTraitObject(__PUCK__value__29),
            _$unwrapTraitObject24 = _slicedToArray(_$unwrapTraitObject23.value, 1),
            initializer = _$unwrapTraitObject24[0];

        visitInitializer(initializer);
        var initializerType = _ast.Expression.getType.call(initializer);
        if (!d.type_ && d.pattern.binding) {
          $unwrapTraitObject(d.pattern.binding).type_ = initializerType;
          d.type_ = initializerType;
        } else {
          if (!(0, _types.isAssignable)(d.type_, initializerType)) {
            reportError({ type: '$VariableDeclaration', value: d, $isTraitObject: true }, notAssignableError(d.type_, initializerType));
          } else {
            var __PUCK__value__30 = patternType;
            if ($unwrapTraitObject(__PUCK__value__30).kind == "Some") {
              var _$unwrapTraitObject25 = $unwrapTraitObject(__PUCK__value__30),
                  _$unwrapTraitObject26 = _slicedToArray(_$unwrapTraitObject25.value, 1),
                  _patternTy = _$unwrapTraitObject26[0];

              _patternTy = _patternTy;
              if (!(0, _types.isAssignable)(_patternTy, initializerType)) {
                reportError({ type: '$VariableDeclaration', value: d, $isTraitObject: true }, notAssignableError(_patternTy, initializerType));
              };
            };
          };
        };
      };
      return [];
    }
  };
};
function declarePatternVariables(scope, visitor, p, mutable, type_, allowNotExhaustive) {
  var __PUCK__value__31 = p;
  var __PUCK__value__32 = __PUCK__value__31;
  if ($unwrapTraitObject(__PUCK__value__32).kind == "CatchAll") {
    var _undefined2 = $unwrapTraitObject(__PUCK__value__32);
    return (0, _core.Ok)(_entities.Type.unused());
  } else {
    var __PUCK__value__33 = __PUCK__value__31;
    if ($unwrapTraitObject(__PUCK__value__33).kind == "Identifier") {
      var _$unwrapTraitObject27 = $unwrapTraitObject(__PUCK__value__33),
          _$unwrapTraitObject28 = _slicedToArray(_$unwrapTraitObject27.value, 1),
          identifier = _$unwrapTraitObject28[0];

      p.binding = scope.define({
        name: identifier.name,
        mutable: mutable,
        token: { type: '$Pattern', value: p, $isTraitObject: true },
        type_: type_
      }, true);
      return (0, _core.Ok)(type_);
    } else {
      var __PUCK__value__34 = __PUCK__value__31;
      if ($unwrapTraitObject(__PUCK__value__34).kind == "Record") {
        var _ret2 = function () {
          var _$unwrapTraitObject29 = $unwrapTraitObject(__PUCK__value__34),
              _$unwrapTraitObject30 = _slicedToArray(_$unwrapTraitObject29.value, 1),
              record = _$unwrapTraitObject30[0];

          var __PUCK__value__35 = void 0;
          if (type_) {
            var __PUCK__value__36 = type_.kind;
            var __PUCK__value__37 = __PUCK__value__36;
            var __PUCK__value__38 = void 0;
            if ($unwrapTraitObject(__PUCK__value__37).kind == "Struct") {
              var _$unwrapTraitObject31 = $unwrapTraitObject(__PUCK__value__37),
                  _$unwrapTraitObject32 = _slicedToArray(_$unwrapTraitObject31.value, 1),
                  struct = _$unwrapTraitObject32[0];

              var __PUCK__value__39 = struct.kind;
              var __PUCK__value__40 = __PUCK__value__39;
              var __PUCK__value__41 = void 0;
              if ($unwrapTraitObject(__PUCK__value__40).kind == "Record") {
                var _$unwrapTraitObject33 = $unwrapTraitObject(__PUCK__value__40),
                    _$unwrapTraitObject34 = _slicedToArray(_$unwrapTraitObject33.value, 1),
                    _record = _$unwrapTraitObject34[0];

                __PUCK__value__41 = _record.properties;
              } else {
                var __PUCK__value__42 = __PUCK__value__39;
                var __PUCK__value__43 = void 0;
                if (true) {
                  var __PUCK__value__44 = __PUCK__value__42;
                  throw "bad type";
                };
                __PUCK__value__41 = __PUCK__value__43;
              };
              __PUCK__value__38 = __PUCK__value__41;
            } else {
              var __PUCK__value__45 = __PUCK__value__36;
              var __PUCK__value__46 = void 0;
              if ($unwrapTraitObject(__PUCK__value__45).kind == "Parameter") {
                var _undefined3 = $unwrapTraitObject(__PUCK__value__45);
                __PUCK__value__46 = {};
              } else {
                var __PUCK__value__47 = __PUCK__value__36;
                var __PUCK__value__48 = void 0;
                if (true) {
                  var __PUCK__value__49 = __PUCK__value__47;
                  throw "abd type";
                };
                __PUCK__value__46 = __PUCK__value__48;
              };
              __PUCK__value__38 = __PUCK__value__46;
            };
            __PUCK__value__35 = __PUCK__value__38;
          } else {
            __PUCK__value__35 = _core.ObjectMap._new();
          };
          var props = __PUCK__value__35;
          var properties = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: record.properties, $isTraitObject: true }, function (p) {
            return [p.property.name, declarePatternVariables(scope, visitor, p.pattern, mutable, props[p.property.name], allowNotExhaustive)];
          }).value.reduce(function (acc, _ref6) {
            var _ref7 = _slicedToArray(_ref6, 2),
                name = _ref7[0],
                type_ = _ref7[1];

            return _core.Result.andThen.call(acc, function (props) {
              return _core.Result.map.call(type_, function (prop) {
                var newProps = $unwrapTraitObject(_js._Object).assign({}, props);
                $unwrapTraitObject(newProps)[name] = prop;
                return newProps;
              });
            });
          }, (0, _core.Ok)(_core.ObjectMap._new()));
          return {
            v: _core.Result.map.call(properties, function (__PUCK__value__50) {
              return false;
            })
          };
        }();

        if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
      } else {
        var __PUCK__value__51 = __PUCK__value__31;
        if ($unwrapTraitObject(__PUCK__value__51).kind == "RecordType") {
          var _ret3 = function () {
            var _$unwrapTraitObject35 = $unwrapTraitObject(__PUCK__value__51),
                _$unwrapTraitObject36 = _slicedToArray(_$unwrapTraitObject35.value, 2),
                typePath = _$unwrapTraitObject36[0],
                record = _$unwrapTraitObject36[1];

            $unwrapTraitObject(visitor).visitTypePath(typePath);
            var __PUCK__value__52 = typePath;
            var __PUCK__value__53 = __PUCK__value__52;
            var __PUCK__value__54 = void 0;
            if ($unwrapTraitObject(__PUCK__value__53).kind == "Member") {
              var _$unwrapTraitObject37 = $unwrapTraitObject(__PUCK__value__53),
                  _$unwrapTraitObject38 = _slicedToArray(_$unwrapTraitObject37.value, 1),
                  __PUCK__value__55 = _$unwrapTraitObject38[0];

              __PUCK__value__54 = _core.None;
            } else {
              var __PUCK__value__56 = __PUCK__value__52;
              var __PUCK__value__57 = void 0;
              if ($unwrapTraitObject(__PUCK__value__56).kind == "_Object") {
                var _$unwrapTraitObject39 = $unwrapTraitObject(__PUCK__value__56),
                    _$unwrapTraitObject40 = _slicedToArray(_$unwrapTraitObject39.value, 2),
                    name = _$unwrapTraitObject40[0].name,
                    __PUCK__value__58 = _$unwrapTraitObject40[1];

                var _type_ = scope.getTypeBinding(name).type_;
                var __PUCK__value__59 = void 0;
                if (_entities.Type.isEnum.call(_type_)) {
                  __PUCK__value__59 = (0, _core.Some)(_type_);
                } else {
                  __PUCK__value__59 = _core.None;
                };
                __PUCK__value__57 = __PUCK__value__59;
              };
              __PUCK__value__54 = __PUCK__value__57;
            };
            var enumType = __PUCK__value__54;
            var __PUCK__value__60 = void 0;
            if (type_) {
              __PUCK__value__60 = type_;
            } else {
              __PUCK__value__60 = typePath.type_;
            };
            var recordType = __PUCK__value__60;
            var __PUCK__value__61 = recordType.kind;
            var __PUCK__value__62 = __PUCK__value__61;
            var __PUCK__value__63 = void 0;
            if ($unwrapTraitObject(__PUCK__value__62).kind == "Enum") {
              var _$unwrapTraitObject41 = $unwrapTraitObject(__PUCK__value__62),
                  _$unwrapTraitObject42 = _slicedToArray(_$unwrapTraitObject41.value, 1),
                  enum_ = _$unwrapTraitObject42[0];

              var member = (0, _enums.getEnumMember)(typePath);
              var enumArmType = enum_.members[member];
              __PUCK__value__63 = enumArmType;
            } else {
              var __PUCK__value__64 = __PUCK__value__61;
              var __PUCK__value__65 = void 0;
              if (true) {
                var __PUCK__value__66 = __PUCK__value__64;
                __PUCK__value__65 = recordType;
              };
              __PUCK__value__63 = __PUCK__value__65;
            };
            recordType = __PUCK__value__63;
            var __PUCK__value__67 = recordType.kind;
            var __PUCK__value__68 = __PUCK__value__67;
            var __PUCK__value__69 = void 0;
            if ($unwrapTraitObject(__PUCK__value__68).kind == "Struct") {
              var _$unwrapTraitObject43 = $unwrapTraitObject(__PUCK__value__68),
                  _$unwrapTraitObject44 = _slicedToArray(_$unwrapTraitObject43.value, 1),
                  struct = _$unwrapTraitObject44[0];

              var __PUCK__value__70 = struct.kind;
              var __PUCK__value__71 = __PUCK__value__70;
              var __PUCK__value__72 = void 0;
              if ($unwrapTraitObject(__PUCK__value__71).kind == "Record") {
                var _$unwrapTraitObject45 = $unwrapTraitObject(__PUCK__value__71),
                    _$unwrapTraitObject46 = _slicedToArray(_$unwrapTraitObject45.value, 1),
                    _record2 = _$unwrapTraitObject46[0];

                __PUCK__value__72 = _record2.properties;
              } else {
                var __PUCK__value__73 = __PUCK__value__70;
                var __PUCK__value__74 = void 0;
                if (true) {
                  var __PUCK__value__75 = __PUCK__value__73;
                  throw "bad type";
                };
                __PUCK__value__72 = __PUCK__value__74;
              };
              __PUCK__value__69 = __PUCK__value__72;
            } else {
              var __PUCK__value__76 = __PUCK__value__67;
              var __PUCK__value__77 = void 0;
              if ($unwrapTraitObject(__PUCK__value__76).kind == "Parameter") {
                var _undefined4 = $unwrapTraitObject(__PUCK__value__76);
                __PUCK__value__77 = {};
              } else {
                var __PUCK__value__78 = __PUCK__value__67;
                var __PUCK__value__79 = void 0;
                if (true) {
                  var __PUCK__value__80 = __PUCK__value__78;
                  throw "abd type";
                };
                __PUCK__value__77 = __PUCK__value__79;
              };
              __PUCK__value__69 = __PUCK__value__77;
            };
            var props = __PUCK__value__69;
            var properties = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: _core.Iterable['$List<E>'].toList.call({ type: '$List<E>', value: record.properties, $isTraitObject: true }), $isTraitObject: true }, function (p) {
              return [p.property.name, declarePatternVariables(scope, visitor, p.pattern, mutable, props[p.property.name], allowNotExhaustive)];
            }).value.reduce(function (acc, _ref8) {
              var _ref9 = _slicedToArray(_ref8, 2),
                  name = _ref9[0],
                  type_ = _ref9[1];

              return _core.Result.andThen.call(acc, function (props) {
                return _core.Result.map.call(type_, function (prop) {
                  var newProps = $unwrapTraitObject(_js._Object).assign({}, props);
                  $unwrapTraitObject(newProps)[name] = prop;
                  return newProps;
                });
              });
            }, (0, _core.Ok)(_core.ObjectMap._new()));
            return {
              v: _core.Result.andThen.call(properties, function (properties) {
                var type_ = {
                  displayName: _core.None,
                  name: _core.None,
                  kind: _entities.TypeKind.Struct({
                    implementations: [],
                    kind: _entities.StructKind.Record({ properties: properties })
                  }),
                  _class: _core.None,
                  instance: _core.None
                };
                var __PUCK__value__81 = enumType;
                if ($unwrapTraitObject(__PUCK__value__81).kind == "Some") {
                  var _$unwrapTraitObject47 = $unwrapTraitObject(__PUCK__value__81),
                      _$unwrapTraitObject48 = _slicedToArray(_$unwrapTraitObject47.value, 1),
                      _enumType = _$unwrapTraitObject48[0];

                  if (!allowNotExhaustive && _core.ObjectMap.size.call(_entities.Type.getEnum.call(_enumType).members) > 1) {
                    return (0, _core.Err)(PatternError.NotExhaustive);
                  } else {
                    var _member = (0, _enums.getEnumMember)(typePath);
                    var _enumArmType = _entities.Type.getEnum.call(_enumType).members[_member];
                    if ((0, _types.isAssignable)(_enumArmType, type_)) {
                      return (0, _core.Ok)(_enumType);
                    } else {
                      return (0, _core.Err)(PatternError.PatternMismatch(p, _enumArmType, type_));
                    };
                  };
                } else {
                  if ((0, _types.isAssignable)(typePath.type_, type_)) {
                    return (0, _core.Ok)(typePath.type_);
                  } else {
                    return (0, _core.Err)(PatternError.PatternMismatch(p, typePath.type_, type_));
                  };
                };
              })
            };
          }();

          if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
        } else {
          var __PUCK__value__82 = __PUCK__value__31;
          if ($unwrapTraitObject(__PUCK__value__82).kind == "Tuple") {
            var _ret4 = function () {
              var _$unwrapTraitObject49 = $unwrapTraitObject(__PUCK__value__82),
                  _$unwrapTraitObject50 = _slicedToArray(_$unwrapTraitObject49.value, 1),
                  tuple = _$unwrapTraitObject50[0];

              var __PUCK__value__83 = void 0;
              if (type_) {
                var __PUCK__value__84 = type_.kind;
                var __PUCK__value__85 = __PUCK__value__84;
                var __PUCK__value__86 = void 0;
                if ($unwrapTraitObject(__PUCK__value__85).kind == "Struct") {
                  var _$unwrapTraitObject51 = $unwrapTraitObject(__PUCK__value__85),
                      _$unwrapTraitObject52 = _slicedToArray(_$unwrapTraitObject51.value, 1),
                      struct = _$unwrapTraitObject52[0];

                  var __PUCK__value__87 = struct.kind;
                  var __PUCK__value__88 = __PUCK__value__87;
                  var __PUCK__value__89 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__88).kind == "Tuple") {
                    var _$unwrapTraitObject53 = $unwrapTraitObject(__PUCK__value__88),
                        _$unwrapTraitObject54 = _slicedToArray(_$unwrapTraitObject53.value, 1),
                        _tuple = _$unwrapTraitObject54[0];

                    __PUCK__value__89 = _tuple.properties;
                  } else {
                    var __PUCK__value__90 = __PUCK__value__87;
                    var __PUCK__value__91 = void 0;
                    if (true) {
                      var __PUCK__value__92 = __PUCK__value__90;
                      return {
                        v: (0, _core.Err)(PatternError.PatternMismatch(p, p.type_, type_))
                      };
                    };
                    __PUCK__value__89 = __PUCK__value__91;
                  };
                  __PUCK__value__86 = __PUCK__value__89;
                } else {
                  var __PUCK__value__93 = __PUCK__value__84;
                  var __PUCK__value__94 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__93).kind == "Parameter") {
                    var _undefined5 = $unwrapTraitObject(__PUCK__value__93);
                    __PUCK__value__94 = [];
                  } else {
                    var __PUCK__value__95 = __PUCK__value__84;
                    var __PUCK__value__96 = void 0;
                    if (true) {
                      var __PUCK__value__97 = __PUCK__value__95;
                      return {
                        v: (0, _core.Err)(PatternError.PatternMismatch(p, p.type_, type_))
                      };
                    };
                    __PUCK__value__94 = __PUCK__value__96;
                  };
                  __PUCK__value__86 = __PUCK__value__94;
                };
                __PUCK__value__83 = __PUCK__value__86;
              } else {
                __PUCK__value__83 = [];
              };
              var props = __PUCK__value__83;
              var __PUCK__value__99 = _core.Iterable['$List<E>'].enumerate.call({ type: '$List<E>', value: tuple.properties, $isTraitObject: true });
              var __PUCK__value__98 = _core.Iterable[__PUCK__value__99.type].map.call(__PUCK__value__99, function (_ref10) {
                var _ref11 = _slicedToArray(_ref10, 2),
                    p = _ref11[0],
                    i = _ref11[1];

                return declarePatternVariables(scope, visitor, $unwrapTraitObject(p), mutable, props[i], allowNotExhaustive);
              });
              var properties = _core.Iterable[__PUCK__value__98.type].toList.call(__PUCK__value__98).reduce(function (acc, cur) {
                return _core.Result.andThen.call(acc, function (props) {
                  return _core.Result.map.call(cur, function (prop) {
                    return props.concat(prop);
                  });
                });
              }, (0, _core.Ok)([]));
              return {
                v: _core.Result.map.call(properties, function (properties) {
                  return {
                    displayName: _core.None,
                    name: _core.None,
                    kind: _entities.TypeKind.Struct({
                      implementations: [],
                      kind: _entities.StructKind.Tuple({ properties: properties })
                    }),
                    _class: _core.None,
                    instance: _core.None
                  };
                })
              };
            }();

            if ((typeof _ret4 === 'undefined' ? 'undefined' : _typeof(_ret4)) === "object") return _ret4.v;
          } else {
            var __PUCK__value__100 = __PUCK__value__31;
            if ($unwrapTraitObject(__PUCK__value__100).kind == "TupleType") {
              var _ret5 = function () {
                var _$unwrapTraitObject55 = $unwrapTraitObject(__PUCK__value__100),
                    _$unwrapTraitObject56 = _slicedToArray(_$unwrapTraitObject55.value, 2),
                    typePath = _$unwrapTraitObject56[0],
                    tuple = _$unwrapTraitObject56[1];

                $unwrapTraitObject(visitor).visitTypePath(typePath);
                var __PUCK__value__101 = typePath;
                var __PUCK__value__102 = __PUCK__value__101;
                var __PUCK__value__103 = void 0;
                if ($unwrapTraitObject(__PUCK__value__102).kind == "Member") {
                  var _$unwrapTraitObject57 = $unwrapTraitObject(__PUCK__value__102),
                      _$unwrapTraitObject58 = _slicedToArray(_$unwrapTraitObject57.value, 1),
                      __PUCK__value__104 = _$unwrapTraitObject58[0];

                  __PUCK__value__103 = _core.None;
                } else {
                  var __PUCK__value__105 = __PUCK__value__101;
                  var __PUCK__value__106 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__105).kind == "_Object") {
                    var _$unwrapTraitObject59 = $unwrapTraitObject(__PUCK__value__105),
                        _$unwrapTraitObject60 = _slicedToArray(_$unwrapTraitObject59.value, 2),
                        name = _$unwrapTraitObject60[0].name,
                        __PUCK__value__107 = _$unwrapTraitObject60[1];

                    var _enumType2 = scope.getTypeBinding(name).type_;
                    var __PUCK__value__108 = void 0;
                    if (_entities.Type.isEnum.call(_enumType2)) {
                      if (type_ && _entities.Type.isEnum.call(type_) && !(0, _types.isAssignable)(_enumType2, type_)) {
                        return {
                          v: (0, _core.Err)(PatternError.PatternMismatch(p, _enumType2, type_))
                        };
                      };
                      __PUCK__value__108 = (0, _core.Some)(_enumType2);
                    } else {
                      __PUCK__value__108 = _core.None;
                    };
                    __PUCK__value__106 = __PUCK__value__108;
                  };
                  __PUCK__value__103 = __PUCK__value__106;
                };
                var enumType = __PUCK__value__103;
                var __PUCK__value__109 = void 0;
                if (type_) {
                  __PUCK__value__109 = type_;
                } else {
                  __PUCK__value__109 = typePath.type_;
                };
                var tupleType = __PUCK__value__109;
                var __PUCK__value__110 = tupleType.kind;
                var __PUCK__value__111 = __PUCK__value__110;
                var __PUCK__value__112 = void 0;
                if ($unwrapTraitObject(__PUCK__value__111).kind == "Enum") {
                  var _$unwrapTraitObject61 = $unwrapTraitObject(__PUCK__value__111),
                      _$unwrapTraitObject62 = _slicedToArray(_$unwrapTraitObject61.value, 1),
                      enum_ = _$unwrapTraitObject62[0];

                  var member = (0, _enums.getEnumMember)(typePath);
                  var enumArmType = enum_.members[member];
                  __PUCK__value__112 = enumArmType;
                } else {
                  var __PUCK__value__113 = __PUCK__value__110;
                  var __PUCK__value__114 = void 0;
                  if (true) {
                    var __PUCK__value__115 = __PUCK__value__113;
                    __PUCK__value__114 = tupleType;
                  };
                  __PUCK__value__112 = __PUCK__value__114;
                };
                tupleType = __PUCK__value__112;
                var __PUCK__value__116 = tupleType.kind;
                var __PUCK__value__117 = __PUCK__value__116;
                var __PUCK__value__118 = void 0;
                if ($unwrapTraitObject(__PUCK__value__117).kind == "Struct") {
                  var _$unwrapTraitObject63 = $unwrapTraitObject(__PUCK__value__117),
                      _$unwrapTraitObject64 = _slicedToArray(_$unwrapTraitObject63.value, 1),
                      struct = _$unwrapTraitObject64[0];

                  var __PUCK__value__119 = struct.kind;
                  var __PUCK__value__120 = __PUCK__value__119;
                  var __PUCK__value__121 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__120).kind == "Tuple") {
                    var _$unwrapTraitObject65 = $unwrapTraitObject(__PUCK__value__120),
                        _$unwrapTraitObject66 = _slicedToArray(_$unwrapTraitObject65.value, 1),
                        _tuple2 = _$unwrapTraitObject66[0];

                    __PUCK__value__121 = _tuple2.properties;
                  } else {
                    var __PUCK__value__122 = __PUCK__value__119;
                    var __PUCK__value__123 = void 0;
                    if (true) {
                      var __PUCK__value__124 = __PUCK__value__122;
                      return {
                        v: (0, _core.Err)(PatternError.PatternMismatch(p, p.type_, tupleType))
                      };
                    };
                    __PUCK__value__121 = __PUCK__value__123;
                  };
                  __PUCK__value__118 = __PUCK__value__121;
                } else {
                  var __PUCK__value__125 = __PUCK__value__116;
                  var __PUCK__value__126 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__125).kind == "Parameter") {
                    var _undefined6 = $unwrapTraitObject(__PUCK__value__125);
                    __PUCK__value__126 = [];
                  } else {
                    var __PUCK__value__127 = __PUCK__value__116;
                    var __PUCK__value__128 = void 0;
                    if (true) {
                      var __PUCK__value__129 = __PUCK__value__127;
                      return {
                        v: (0, _core.Err)(PatternError.PatternMismatch(p, p.type_, tupleType))
                      };
                    };
                    __PUCK__value__126 = __PUCK__value__128;
                  };
                  __PUCK__value__118 = __PUCK__value__126;
                };
                var props = __PUCK__value__118;
                var __PUCK__value__131 = _core.Iterable['$List<E>'].enumerate.call({ type: '$List<E>', value: tuple.properties, $isTraitObject: true });
                var __PUCK__value__130 = _core.Iterable[__PUCK__value__131.type].map.call(__PUCK__value__131, function (_ref12) {
                  var _ref13 = _slicedToArray(_ref12, 2),
                      p = _ref13[0],
                      i = _ref13[1];

                  return declarePatternVariables(scope, visitor, $unwrapTraitObject(p), mutable, props[i], allowNotExhaustive);
                });
                var properties = _core.Iterable[__PUCK__value__130.type].toList.call(__PUCK__value__130).reduce(function (acc, cur) {
                  return _core.Result.andThen.call(acc, function (props) {
                    return _core.Result.map.call(cur, function (prop) {
                      return props.concat(prop);
                    });
                  });
                }, (0, _core.Ok)([]));
                return {
                  v: _core.Result.andThen.call(properties, function (properties) {
                    var type_ = {
                      displayName: _core.None,
                      name: _core.None,
                      kind: _entities.TypeKind.Struct({
                        implementations: [],
                        kind: _entities.StructKind.Tuple({ properties: properties })
                      }),
                      _class: _core.None,
                      instance: _core.None
                    };
                    var __PUCK__value__132 = enumType;
                    if ($unwrapTraitObject(__PUCK__value__132).kind == "Some") {
                      var _$unwrapTraitObject67 = $unwrapTraitObject(__PUCK__value__132),
                          _$unwrapTraitObject68 = _slicedToArray(_$unwrapTraitObject67.value, 1),
                          _enumType3 = _$unwrapTraitObject68[0];

                      if (!allowNotExhaustive && _core.ObjectMap.size.call(_entities.Type.getEnum.call(_enumType3).members) > 1) {
                        return (0, _core.Err)(PatternError.NotExhaustive);
                      } else {
                        var _member2 = (0, _enums.getEnumMember)(typePath);
                        var _enumArmType2 = _entities.Type.getEnum.call(_enumType3).members[_member2];
                        if ((0, _types.isAssignable)(_enumArmType2, type_)) {
                          return (0, _core.Ok)(_enumType3);
                        } else {
                          return (0, _core.Err)(PatternError.PatternMismatch(p, _enumArmType2, type_));
                        };
                      };
                    } else {
                      if ((0, _types.isAssignable)(typePath.type_, type_)) {
                        return (0, _core.Ok)(typePath.type_);
                      } else {
                        return (0, _core.Err)(PatternError.PatternMismatch(p, typePath.type_, type_));
                      };
                    };
                  })
                };
              }();

              if ((typeof _ret5 === 'undefined' ? 'undefined' : _typeof(_ret5)) === "object") return _ret5.v;
            } else {
              var __PUCK__value__133 = __PUCK__value__31;
              if ($unwrapTraitObject(__PUCK__value__133).kind == "UnitType") {
                var _$unwrapTraitObject69 = $unwrapTraitObject(__PUCK__value__133),
                    _$unwrapTraitObject70 = _slicedToArray(_$unwrapTraitObject69.value, 1),
                    typePath = _$unwrapTraitObject70[0];

                $unwrapTraitObject(visitor).visitTypePath(typePath);
                return (0, _core.Ok)(false);
              };
            };
          };
        };
      };
    };
  };
}
