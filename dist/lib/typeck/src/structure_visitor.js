'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.structureVisitor = exports.PatternError = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.notAssignableError = notAssignableError;
exports.declarePatternVariables = declarePatternVariables;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _util = require('util');

var _ast = require('./../../ast/ast');

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
var structureVisitor = exports.structureVisitor = {
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
            var _PUCK__value__2$valu = _slicedToArray(__PUCK__value__2.value, 1),
                func = _PUCK__value__2$valu[0];

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
          var _PUCK__value__6$valu = _slicedToArray(__PUCK__value__6.value, 1),
              returnType = _PUCK__value__6$valu[0];

          $unwrapTraitObject(self).visitTypeBound(returnType);
        };
        f.type_ = (0, _functions.createFunctionType)(f.scope, f, $unwrapTraitObject(self).reportError);
        var __PUCK__value__7 = f.name;
        if ($unwrapTraitObject(__PUCK__value__7).kind == "Some") {
          var _PUCK__value__7$valu = _slicedToArray(__PUCK__value__7.value, 1),
              name = _PUCK__value__7$valu[0];

          $unwrapTraitObject($unwrapTraitObject(f.scope).parent).define({
            name: name.name,
            token: f,
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
        var _PUCK__value__8$valu = _slicedToArray(__PUCK__value__8.value, 1),
            first = _PUCK__value__8$valu[0];

        var __PUCK__value__9 = first.pattern;
        if ($unwrapTraitObject(__PUCK__value__9).kind == "Identifier") {
          var _PUCK__value__9$valu = _slicedToArray(__PUCK__value__9.value, 1),
              name = _PUCK__value__9$valu[0].name;

          if (name == "self") {
            var selfTypeBound = first.typeBound;
            if (_core.Option.isNone.call(selfTypeBound)) {
              $unwrapTraitObject(f.parameterList[0]).typeBound = (0, _core.Some)(_ast.TypeBound.NamedTypeBound({
                path: _ast.TypePath.Member({ name: "Self" }),
                typeParameters: []
              }));
            } else {
              $unwrapTraitObject(self).visitVariableDeclaration(first);
              if (!(0, _types.isAssignable)(first.type_, selfType)) {
                $unwrapTraitObject(self).reportError(first, notAssignableError(first.type_, selfType));
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
        var _PUCK__value__10$val = _slicedToArray(__PUCK__value__10.value, 1),
            returnType = _PUCK__value__10$val[0];

        $unwrapTraitObject(self).visitTypeBound(returnType);
      };
      f.type_ = (0, _functions.createFunctionType)(f.scope, f, $unwrapTraitObject(self).reportError);
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
        _class: _entities.TypeClass.fromAstNode(t, function () {}),
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
      var __PUCK__value__13 = t.path;
      var __PUCK__value__14 = void 0;
      if ($unwrapTraitObject(__PUCK__value__13).kind == "Member") {
        var _PUCK__value__13$val = _slicedToArray(__PUCK__value__13.value, 1),
            name = _PUCK__value__13$val[0].name;

        var __PUCK__value__15 = void 0;
        if (name == "Self") {
          if (t.typeParameters.length > 0) {
            $unwrapTraitObject(self).reportError(t, "Self is not generic");
          };
          var __PUCK__value__16 = type_._class;
          if ($unwrapTraitObject(__PUCK__value__16).kind == "Some") {
            var _PUCK__value__16$val = _slicedToArray(__PUCK__value__16.value, 1),
                _class = _PUCK__value__16$val[0];

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
          var _PUCK__value__17$val = _slicedToArray(__PUCK__value__17.value, 1),
              _class2 = _PUCK__value__17$val[0];

          var __PUCK__value__18 = (0, _range.checkRange)(t.typeParameters, _class2.parameterRange, "type parameters", _entities.Type.displayName.call(type_));
          if ($unwrapTraitObject(__PUCK__value__18).kind == "Err") {
            var _PUCK__value__18$val = _slicedToArray(__PUCK__value__18.value, 1),
                error = _PUCK__value__18$val[0];

            $unwrapTraitObject(self).reportError(t, error);
          };
        } else {
          if (t.typeParameters.length > 0) {
            $unwrapTraitObject(self).reportError(t, "Type " + _entities.Type.displayName.call(type_) + " is not generic");
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
        _class: _entities.TypeClass.fromAstNode(t, $unwrapTraitObject(self).reportError),
        instance: _core.None
      };
      return $unwrapTraitObject($unwrapTraitObject(self).scope).defineType(t.type_, t);
    };
  },
  visitTypePath: function visitTypePath(t) {
    var self = this;
    if (!t.type_) {
      t.scope = $unwrapTraitObject(self).scope;
      var binding = $unwrapTraitObject($unwrapTraitObject(self).scope).getTypePath(t);
      if (!binding) {
        $unwrapTraitObject(self).reportError(t, "Use of undeclared type " + $unwrapTraitObject($unwrapTraitObject(t.value)[0]).name);
      };
      return t.type_ = $unwrapTraitObject(binding).type_;
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
    var __PUCK__value__21 = declarePatternVariables(d.scope, self, d.pattern, d.mutable, d.type_, allowNotExhaustive);
    var __PUCK__value__22 = __PUCK__value__21;
    if ($unwrapTraitObject(__PUCK__value__22).kind == "Ok") {
      var _PUCK__value__22$val = _slicedToArray(__PUCK__value__22.value, 1),
          patternTy = _PUCK__value__22$val[0];

      patternType = (0, _core.Some)(patternTy);
      if (!(0, _types.isAssignable)(patternTy, d.type_)) {
        $unwrapTraitObject(self).reportError(d, notAssignableError(patternTy, d.type_));
      };
    } else {
      var __PUCK__value__23 = __PUCK__value__21;
      if ($unwrapTraitObject(__PUCK__value__23).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__23).value)[$unwrapTraitObject(0)]).kind == "PatternMismatch") {
        var _PUCK__value__23$val = _slicedToArray(__PUCK__value__23.value, 1),
            _PUCK__value__23$val$ = _slicedToArray(_PUCK__value__23$val[0].value, 3),
            __PUCK__value__24 = _PUCK__value__23$val$[0],
            to = _PUCK__value__23$val$[1],
            subject = _PUCK__value__23$val$[2];

        $unwrapTraitObject(self).reportError(d, notAssignableError(to, subject));
      } else {
        var __PUCK__value__25 = __PUCK__value__21;
        if ($unwrapTraitObject(__PUCK__value__25).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__25).value)[$unwrapTraitObject(0)]).kind == "NotExhaustive") {
          var _PUCK__value__25$val = _toArray(__PUCK__value__25.value);

          $unwrapTraitObject(self).reportError(d, "non exhaustive pattern");
        };
      };
    };
    var __PUCK__value__26 = d.initializer;
    if ($unwrapTraitObject(__PUCK__value__26).kind == "Some") {
      var _PUCK__value__26$val = _slicedToArray(__PUCK__value__26.value, 1),
          initializer = _PUCK__value__26$val[0];

      visitInitializer(initializer);
      var initializerType = _ast.Expression.getType.call(initializer);
      if (!d.type_ && d.pattern.binding) {
        $unwrapTraitObject(d.pattern.binding).type_ = initializerType;
        return d.type_ = initializerType;
      } else {
        if (!(0, _types.isAssignable)(d.type_, initializerType)) {
          return $unwrapTraitObject(self).reportError(d, notAssignableError(d.type_, initializerType));
        } else {
          var __PUCK__value__27 = patternType;
          if ($unwrapTraitObject(__PUCK__value__27).kind == "Some") {
            var _PUCK__value__27$val = _slicedToArray(__PUCK__value__27.value, 1),
                _patternTy = _PUCK__value__27$val[0];

            _patternTy = _patternTy;
            if (!(0, _types.isAssignable)(_patternTy, initializerType)) {
              return $unwrapTraitObject(self).reportError(d, notAssignableError(_patternTy, initializerType));
            };
          };
        };
      };
    };
  }
};
function declarePatternVariables(scope, visitor, p, mutable, type_, allowNotExhaustive) {
  var __PUCK__value__28 = p;
  var __PUCK__value__29 = __PUCK__value__28;
  if ($unwrapTraitObject(__PUCK__value__29).kind == "CatchAll") {
    var _undefined2 = __PUCK__value__29;
    return (0, _core.Ok)(false);
  } else {
    var __PUCK__value__30 = __PUCK__value__28;
    if ($unwrapTraitObject(__PUCK__value__30).kind == "Identifier") {
      var _undefined3 = __PUCK__value__30;
      p.binding = scope.define({
        name: $unwrapTraitObject($unwrapTraitObject(p.value)[0]).name,
        mutable: mutable,
        token: p,
        type_: type_
      }, true);
      return (0, _core.Ok)(false);
    } else {
      var __PUCK__value__31 = __PUCK__value__28;
      if ($unwrapTraitObject(__PUCK__value__31).kind == "Record") {
        var _ret2 = function () {
          var _PUCK__value__31$val = _slicedToArray(__PUCK__value__31.value, 1),
              record = _PUCK__value__31$val[0];

          var __PUCK__value__32 = void 0;
          if (type_) {
            var __PUCK__value__33 = type_.kind;
            var __PUCK__value__34 = __PUCK__value__33;
            var __PUCK__value__35 = void 0;
            if ($unwrapTraitObject(__PUCK__value__34).kind == "Struct") {
              var _PUCK__value__34$val = _slicedToArray(__PUCK__value__34.value, 1),
                  struct = _PUCK__value__34$val[0];

              var __PUCK__value__36 = struct.kind;
              var __PUCK__value__37 = __PUCK__value__36;
              var __PUCK__value__38 = void 0;
              if ($unwrapTraitObject(__PUCK__value__37).kind == "Record") {
                var _PUCK__value__37$val = _slicedToArray(__PUCK__value__37.value, 1),
                    _record = _PUCK__value__37$val[0];

                __PUCK__value__38 = _record.properties;
              } else {
                var __PUCK__value__39 = __PUCK__value__36;
                var __PUCK__value__40 = void 0;
                if (true) {
                  var __PUCK__value__41 = __PUCK__value__39;
                  throw "bad type";
                };
                __PUCK__value__38 = __PUCK__value__40;
              };
              __PUCK__value__35 = __PUCK__value__38;
            } else {
              var __PUCK__value__42 = __PUCK__value__33;
              var __PUCK__value__43 = void 0;
              if ($unwrapTraitObject(__PUCK__value__42).kind == "Parameter") {
                var _undefined4 = __PUCK__value__42;
                __PUCK__value__43 = {};
              } else {
                var __PUCK__value__44 = __PUCK__value__33;
                var __PUCK__value__45 = void 0;
                if (true) {
                  var __PUCK__value__46 = __PUCK__value__44;
                  throw "abd type";
                };
                __PUCK__value__43 = __PUCK__value__45;
              };
              __PUCK__value__35 = __PUCK__value__43;
            };
            __PUCK__value__32 = __PUCK__value__35;
          } else {
            __PUCK__value__32 = _core.ObjectMap._new();
          };
          var props = __PUCK__value__32;
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
            v: _core.Result.map.call(properties, function (__PUCK__value__47) {
              return false;
            })
          };
        }();

        if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
      } else {
        var __PUCK__value__48 = __PUCK__value__28;
        if ($unwrapTraitObject(__PUCK__value__48).kind == "RecordType") {
          var _ret3 = function () {
            var _PUCK__value__48$val = _slicedToArray(__PUCK__value__48.value, 2),
                typePath = _PUCK__value__48$val[0],
                record = _PUCK__value__48$val[1];

            $unwrapTraitObject(visitor).visitTypePath(typePath);
            var __PUCK__value__49 = typePath;
            var __PUCK__value__50 = __PUCK__value__49;
            var __PUCK__value__51 = void 0;
            if ($unwrapTraitObject(__PUCK__value__50).kind == "Member") {
              var _PUCK__value__50$val = _slicedToArray(__PUCK__value__50.value, 1),
                  __PUCK__value__52 = _PUCK__value__50$val[0];

              __PUCK__value__51 = _core.None;
            } else {
              var __PUCK__value__53 = __PUCK__value__49;
              var __PUCK__value__54 = void 0;
              if ($unwrapTraitObject(__PUCK__value__53).kind == "_Object") {
                var _PUCK__value__53$val = _slicedToArray(__PUCK__value__53.value, 2),
                    name = _PUCK__value__53$val[0].name,
                    __PUCK__value__55 = _PUCK__value__53$val[1];

                var _type_ = scope.getTypeBinding(name).type_;
                var __PUCK__value__56 = void 0;
                if (_entities.Type.isEnum.call(_type_)) {
                  __PUCK__value__56 = (0, _core.Some)(_type_);
                } else {
                  __PUCK__value__56 = _core.None;
                };
                __PUCK__value__54 = __PUCK__value__56;
              };
              __PUCK__value__51 = __PUCK__value__54;
            };
            var enumType = __PUCK__value__51;
            var __PUCK__value__57 = void 0;
            if (type_) {
              __PUCK__value__57 = type_;
            } else {
              __PUCK__value__57 = typePath.type_;
            };
            var recordType = __PUCK__value__57;
            var __PUCK__value__58 = recordType.kind;
            var __PUCK__value__59 = __PUCK__value__58;
            var __PUCK__value__60 = void 0;
            if ($unwrapTraitObject(__PUCK__value__59).kind == "Enum") {
              var _PUCK__value__59$val = _slicedToArray(__PUCK__value__59.value, 1),
                  enum_ = _PUCK__value__59$val[0];

              var member = (0, _enums.getEnumMember)(typePath);
              var enumArmType = enum_.members[member];
              __PUCK__value__60 = enumArmType;
            } else {
              var __PUCK__value__61 = __PUCK__value__58;
              var __PUCK__value__62 = void 0;
              if (true) {
                var __PUCK__value__63 = __PUCK__value__61;
                __PUCK__value__62 = recordType;
              };
              __PUCK__value__60 = __PUCK__value__62;
            };
            recordType = __PUCK__value__60;
            var __PUCK__value__64 = recordType.kind;
            var __PUCK__value__65 = __PUCK__value__64;
            var __PUCK__value__66 = void 0;
            if ($unwrapTraitObject(__PUCK__value__65).kind == "Struct") {
              var _PUCK__value__65$val = _slicedToArray(__PUCK__value__65.value, 1),
                  struct = _PUCK__value__65$val[0];

              var __PUCK__value__67 = struct.kind;
              var __PUCK__value__68 = __PUCK__value__67;
              var __PUCK__value__69 = void 0;
              if ($unwrapTraitObject(__PUCK__value__68).kind == "Record") {
                var _PUCK__value__68$val = _slicedToArray(__PUCK__value__68.value, 1),
                    _record2 = _PUCK__value__68$val[0];

                __PUCK__value__69 = _record2.properties;
              } else {
                var __PUCK__value__70 = __PUCK__value__67;
                var __PUCK__value__71 = void 0;
                if (true) {
                  var __PUCK__value__72 = __PUCK__value__70;
                  throw "bad type";
                };
                __PUCK__value__69 = __PUCK__value__71;
              };
              __PUCK__value__66 = __PUCK__value__69;
            } else {
              var __PUCK__value__73 = __PUCK__value__64;
              var __PUCK__value__74 = void 0;
              if ($unwrapTraitObject(__PUCK__value__73).kind == "Parameter") {
                var _undefined5 = __PUCK__value__73;
                __PUCK__value__74 = {};
              } else {
                var __PUCK__value__75 = __PUCK__value__64;
                var __PUCK__value__76 = void 0;
                if (true) {
                  var __PUCK__value__77 = __PUCK__value__75;
                  throw "abd type";
                };
                __PUCK__value__74 = __PUCK__value__76;
              };
              __PUCK__value__66 = __PUCK__value__74;
            };
            var props = __PUCK__value__66;
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
                var __PUCK__value__78 = enumType;
                if ($unwrapTraitObject(__PUCK__value__78).kind == "Some") {
                  var _PUCK__value__78$val = _slicedToArray(__PUCK__value__78.value, 1),
                      _enumType = _PUCK__value__78$val[0];

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
          var __PUCK__value__79 = __PUCK__value__28;
          if ($unwrapTraitObject(__PUCK__value__79).kind == "Tuple") {
            var _ret4 = function () {
              var _PUCK__value__79$val = _slicedToArray(__PUCK__value__79.value, 1),
                  tuple = _PUCK__value__79$val[0];

              var __PUCK__value__80 = void 0;
              if (type_) {
                var __PUCK__value__81 = type_.kind;
                var __PUCK__value__82 = __PUCK__value__81;
                var __PUCK__value__83 = void 0;
                if ($unwrapTraitObject(__PUCK__value__82).kind == "Struct") {
                  var _PUCK__value__82$val = _slicedToArray(__PUCK__value__82.value, 1),
                      struct = _PUCK__value__82$val[0];

                  var __PUCK__value__84 = struct.kind;
                  var __PUCK__value__85 = __PUCK__value__84;
                  var __PUCK__value__86 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__85).kind == "Tuple") {
                    var _PUCK__value__85$val = _slicedToArray(__PUCK__value__85.value, 1),
                        _tuple = _PUCK__value__85$val[0];

                    __PUCK__value__86 = _tuple.properties;
                  } else {
                    var __PUCK__value__87 = __PUCK__value__84;
                    var __PUCK__value__88 = void 0;
                    if (true) {
                      var __PUCK__value__89 = __PUCK__value__87;
                      return {
                        v: (0, _core.Err)(PatternError.PatternMismatch(p, p.type_, type_))
                      };
                    };
                    __PUCK__value__86 = __PUCK__value__88;
                  };
                  __PUCK__value__83 = __PUCK__value__86;
                } else {
                  var __PUCK__value__90 = __PUCK__value__81;
                  var __PUCK__value__91 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__90).kind == "Parameter") {
                    var _undefined6 = __PUCK__value__90;
                    __PUCK__value__91 = [];
                  } else {
                    var __PUCK__value__92 = __PUCK__value__81;
                    var __PUCK__value__93 = void 0;
                    if (true) {
                      var __PUCK__value__94 = __PUCK__value__92;
                      return {
                        v: (0, _core.Err)(PatternError.PatternMismatch(p, p.type_, type_))
                      };
                    };
                    __PUCK__value__91 = __PUCK__value__93;
                  };
                  __PUCK__value__83 = __PUCK__value__91;
                };
                __PUCK__value__80 = __PUCK__value__83;
              } else {
                __PUCK__value__80 = [];
              };
              var props = __PUCK__value__80;
              var __PUCK__value__96 = _core.Iterable['$List<E>'].enumerate.call({ type: '$List<E>', value: tuple.properties, $isTraitObject: true });
              var __PUCK__value__95 = _core.Iterable[__PUCK__value__96.type].map.call(__PUCK__value__96, function (_ref10) {
                var _ref11 = _slicedToArray(_ref10, 2),
                    p = _ref11[0],
                    i = _ref11[1];

                return declarePatternVariables(scope, visitor, $unwrapTraitObject(p), mutable, props[i], allowNotExhaustive);
              });
              var properties = _core.Iterable[__PUCK__value__95.type].toList.call(__PUCK__value__95).reduce(function (acc, cur) {
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
            var __PUCK__value__97 = __PUCK__value__28;
            if ($unwrapTraitObject(__PUCK__value__97).kind == "TupleType") {
              var _ret5 = function () {
                var _PUCK__value__97$val = _slicedToArray(__PUCK__value__97.value, 2),
                    typePath = _PUCK__value__97$val[0],
                    tuple = _PUCK__value__97$val[1];

                $unwrapTraitObject(visitor).visitTypePath(typePath);
                var __PUCK__value__98 = typePath;
                var __PUCK__value__99 = __PUCK__value__98;
                var __PUCK__value__100 = void 0;
                if ($unwrapTraitObject(__PUCK__value__99).kind == "Member") {
                  var _PUCK__value__99$val = _slicedToArray(__PUCK__value__99.value, 1),
                      __PUCK__value__101 = _PUCK__value__99$val[0];

                  __PUCK__value__100 = _core.None;
                } else {
                  var __PUCK__value__102 = __PUCK__value__98;
                  var __PUCK__value__103 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__102).kind == "_Object") {
                    var _PUCK__value__102$va = _slicedToArray(__PUCK__value__102.value, 2),
                        name = _PUCK__value__102$va[0].name,
                        __PUCK__value__104 = _PUCK__value__102$va[1];

                    var _enumType2 = scope.getTypeBinding(name).type_;
                    var __PUCK__value__105 = void 0;
                    if (_entities.Type.isEnum.call(_enumType2)) {
                      if (type_ && _entities.Type.isEnum.call(type_) && !(0, _types.isAssignable)(_enumType2, type_)) {
                        return {
                          v: (0, _core.Err)(PatternError.PatternMismatch(p, _enumType2, type_))
                        };
                      };
                      __PUCK__value__105 = (0, _core.Some)(_enumType2);
                    } else {
                      __PUCK__value__105 = _core.None;
                    };
                    __PUCK__value__103 = __PUCK__value__105;
                  };
                  __PUCK__value__100 = __PUCK__value__103;
                };
                var enumType = __PUCK__value__100;
                var __PUCK__value__106 = void 0;
                if (type_) {
                  __PUCK__value__106 = type_;
                } else {
                  __PUCK__value__106 = typePath.type_;
                };
                var tupleType = __PUCK__value__106;
                var __PUCK__value__107 = tupleType.kind;
                var __PUCK__value__108 = __PUCK__value__107;
                var __PUCK__value__109 = void 0;
                if ($unwrapTraitObject(__PUCK__value__108).kind == "Enum") {
                  var _PUCK__value__108$va = _slicedToArray(__PUCK__value__108.value, 1),
                      enum_ = _PUCK__value__108$va[0];

                  var member = (0, _enums.getEnumMember)(typePath);
                  var enumArmType = enum_.members[member];
                  __PUCK__value__109 = enumArmType;
                } else {
                  var __PUCK__value__110 = __PUCK__value__107;
                  var __PUCK__value__111 = void 0;
                  if (true) {
                    var __PUCK__value__112 = __PUCK__value__110;
                    __PUCK__value__111 = tupleType;
                  };
                  __PUCK__value__109 = __PUCK__value__111;
                };
                tupleType = __PUCK__value__109;
                var __PUCK__value__113 = tupleType.kind;
                var __PUCK__value__114 = __PUCK__value__113;
                var __PUCK__value__115 = void 0;
                if ($unwrapTraitObject(__PUCK__value__114).kind == "Struct") {
                  var _PUCK__value__114$va = _slicedToArray(__PUCK__value__114.value, 1),
                      struct = _PUCK__value__114$va[0];

                  var __PUCK__value__116 = struct.kind;
                  var __PUCK__value__117 = __PUCK__value__116;
                  var __PUCK__value__118 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__117).kind == "Tuple") {
                    var _PUCK__value__117$va = _slicedToArray(__PUCK__value__117.value, 1),
                        _tuple2 = _PUCK__value__117$va[0];

                    __PUCK__value__118 = _tuple2.properties;
                  } else {
                    var __PUCK__value__119 = __PUCK__value__116;
                    var __PUCK__value__120 = void 0;
                    if (true) {
                      var __PUCK__value__121 = __PUCK__value__119;
                      (0, _core.print)("asd2");
                      return {
                        v: (0, _core.Err)(PatternError.PatternMismatch(p, p.type_, tupleType))
                      };
                    };
                    __PUCK__value__118 = __PUCK__value__120;
                  };
                  __PUCK__value__115 = __PUCK__value__118;
                } else {
                  var __PUCK__value__122 = __PUCK__value__113;
                  var __PUCK__value__123 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__122).kind == "Parameter") {
                    var _undefined7 = __PUCK__value__122;
                    __PUCK__value__123 = [];
                  } else {
                    var __PUCK__value__124 = __PUCK__value__113;
                    var __PUCK__value__125 = void 0;
                    if (true) {
                      var __PUCK__value__126 = __PUCK__value__124;
                      (0, _core.print)("asd");
                      return {
                        v: (0, _core.Err)(PatternError.PatternMismatch(p, p.type_, tupleType))
                      };
                    };
                    __PUCK__value__123 = __PUCK__value__125;
                  };
                  __PUCK__value__115 = __PUCK__value__123;
                };
                var props = __PUCK__value__115;
                var __PUCK__value__128 = _core.Iterable['$List<E>'].enumerate.call({ type: '$List<E>', value: tuple.properties, $isTraitObject: true });
                var __PUCK__value__127 = _core.Iterable[__PUCK__value__128.type].map.call(__PUCK__value__128, function (_ref12) {
                  var _ref13 = _slicedToArray(_ref12, 2),
                      p = _ref13[0],
                      i = _ref13[1];

                  return declarePatternVariables(scope, visitor, $unwrapTraitObject(p), mutable, props[i], allowNotExhaustive);
                });
                var properties = _core.Iterable[__PUCK__value__127.type].toList.call(__PUCK__value__127).reduce(function (acc, cur) {
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
                    var __PUCK__value__129 = enumType;
                    if ($unwrapTraitObject(__PUCK__value__129).kind == "Some") {
                      var _PUCK__value__129$va = _slicedToArray(__PUCK__value__129.value, 1),
                          _enumType3 = _PUCK__value__129$va[0];

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
              var __PUCK__value__130 = __PUCK__value__28;
              if ($unwrapTraitObject(__PUCK__value__130).kind == "UnitType") {
                var _PUCK__value__130$va = _slicedToArray(__PUCK__value__130.value, 1),
                    typePath = _PUCK__value__130$va[0];

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
