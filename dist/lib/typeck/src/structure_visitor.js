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
          if (assignedTo && $unwrapTraitObject(assignedTo._arguments)[i]) {
            __PUCK__value__5 = $unwrapTraitObject($unwrapTraitObject(assignedTo._arguments)[i]).type_;
          };
          var type_ = __PUCK__value__5;
          return $unwrapTraitObject(self).visitFunctionParameter(p, type_);
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

          var type_ = first.typeBound;
          if (name == "self") {
            if (_core.Option.isNone.call(type_)) {
              $unwrapTraitObject(f.parameterList[0]).typeBound = (0, _core.Some)(_ast.TypeBound.NamedTypeBound({
                kind: $unwrapTraitObject(_ast2.SyntaxKind).NamedTypeBound,
                path: _ast.TypePath.Member({ name: "Self" }),
                typeParameters: []
              }));
            } else {
              $unwrapTraitObject(self).visitFunctionParameter(first);
              if (!(0, _types.isAssignable)(first.type_, selfType)) {
                $unwrapTraitObject(self).reportError(first, notAssignableError(first.type_, selfType));
              };
            };
          };
        };
      };
      _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: f.parameterList, $isTraitObject: true }, function (p) {
        return $unwrapTraitObject(self).visitFunctionParameter(p);
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
  visitFunctionParameter: function visitFunctionParameter(v, type_) {
    var self = this;
    return $unwrapTraitObject(self).visitVariableDeclaration(v, $unwrapTraitObject($unwrapTraitObject(self).visitLiteral).bind(self), type_);
  },
  visitTypeBound: function visitTypeBound(t_) {
    var self = this;
    if (!t_.scope) {
      t_.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(visit).walkTypeBound(self, t_);
      var __PUCK__value__11 = t_;
      var __PUCK__value__12 = __PUCK__value__11;
      if ($unwrapTraitObject(__PUCK__value__12).kind == "FunctionTypeBound") {
        var _PUCK__value__12$val = _slicedToArray(__PUCK__value__12.value, 1),
            t = _PUCK__value__12$val[0];

        return t_.type_ = t.type_;
      } else {
        var __PUCK__value__13 = __PUCK__value__11;
        if ($unwrapTraitObject(__PUCK__value__13).kind == "NamedTypeBound") {
          var _PUCK__value__13$val = _slicedToArray(__PUCK__value__13.value, 1),
              _t = _PUCK__value__13$val[0];

          return t_.type_ = _t.type_;
        } else {
          var __PUCK__value__14 = __PUCK__value__11;
          if ($unwrapTraitObject(__PUCK__value__14).kind == "RecordTypeBound") {
            var _PUCK__value__14$val = _slicedToArray(__PUCK__value__14.value, 1),
                _t2 = _PUCK__value__14$val[0];

            return t_.type_ = _t2.type_;
          } else {
            var __PUCK__value__15 = __PUCK__value__11;
            if ($unwrapTraitObject(__PUCK__value__15).kind == "TupleTypeBound") {
              var _PUCK__value__15$val = _slicedToArray(__PUCK__value__15.value, 1),
                  _t3 = _PUCK__value__15$val[0];

              return t_.type_ = _t3.type_;
            };
          };
        };
      };
    };
  },
  visitFunctionTypeBound: function visitFunctionTypeBound(t) {
    var self = this;
    if (!t.scope) {
      $unwrapTraitObject(self).scope = $unwrapTraitObject($unwrapTraitObject(self).scope).createChild();
      t.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(visit).walkFunctionTypeBound(self, t);
      var _arguments = t._arguments.properties;
      t.type_ = {
        displayName: _core.None,
        name: _core.None,
        kind: _entities.TypeKind.Function({
          selfBinding: _core.None,
          _arguments: _arguments,
          argumentRange: {
            start: _arguments.length,
            end: _arguments.length + 1
          },
          returnType: t.returnType.type_,
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
      var __PUCK__value__16 = t.path;
      var __PUCK__value__17 = void 0;
      if ($unwrapTraitObject(__PUCK__value__16).kind == "Member") {
        var _PUCK__value__16$val = _slicedToArray(__PUCK__value__16.value, 1),
            name = _PUCK__value__16$val[0].name;

        var __PUCK__value__18 = void 0;
        if (name == "Self") {
          if (t.typeParameters.length > 0) {
            $unwrapTraitObject(self).reportError(t, "Self is not generic");
          };
          var __PUCK__value__19 = type_._class;
          if ($unwrapTraitObject(__PUCK__value__19).kind == "Some") {
            var _PUCK__value__19$val = _slicedToArray(__PUCK__value__19.value, 1),
                _class = _PUCK__value__19$val[0];

            t.typeParameters = $unwrapTraitObject(_class.typeParameterBindings).map(function (_ref3) {
              var name = _ref3.name;

              return _ast.TypeBound.NamedTypeBound({
                kind: $unwrapTraitObject(_ast2.SyntaxKind).NamedTypeBound,
                path: _ast.TypePath.Member(name),
                typeParameters: []
              });
            });
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
        var __PUCK__value__20 = type_._class;
        if ($unwrapTraitObject(__PUCK__value__20).kind == "Some") {
          var _PUCK__value__20$val = _slicedToArray(__PUCK__value__20.value, 1),
              _class2 = _PUCK__value__20$val[0];

          var __PUCK__value__21 = (0, _range.checkRange)(t.typeParameters, _class2.parameterRange, "type parameters", _entities.Type.displayName.call(type_));
          if ($unwrapTraitObject(__PUCK__value__21).kind == "Err") {
            var _PUCK__value__21$val = _slicedToArray(__PUCK__value__21.value, 1),
                error = _PUCK__value__21$val[0];

            $unwrapTraitObject(self).reportError(t, error);
          };
        } else {
          if (t.typeParameters.length > 0) {
            $unwrapTraitObject(self).reportError(t, "Type " + _entities.Type.displayName.call(type_) + " is not generic");
          };
        };
      };
      $unwrapTraitObject(visit).walkNamedTypeBound(self, t);
      var __PUCK__value__22 = void 0;
      if (_core.Option.isSome.call(type_._class)) {
        __PUCK__value__22 = (0, _types.createTypeInstance)(type_, _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: t.typeParameters, $isTraitObject: true }, function (p) {
          return p.type_;
        }));
      } else {
        __PUCK__value__22 = type_;
      };
      return t.type_ = __PUCK__value__22;
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
              return [member.name.name, member.typeBound.type_];
            })) })
        }),
        _class: _core.None,
        instance: _core.None
      };
    };
  },
  visitTupleTypeBound: function visitTupleTypeBound(t) {
    var self = this;
    if (!t.scope) {
      t.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(visit).walkTupleTypeBound(self, t);
      var __PUCK__value__23 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: t.properties, $isTraitObject: true }, function (p) {
        return p.type_;
      });
      return t.type_ = {
        displayName: _core.None,
        name: _core.None,
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: _entities.StructKind.Tuple({ properties: _core.Iterable[__PUCK__value__23.type].toList.call(__PUCK__value__23) })
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
            return typeBound.type_;
          }) }),
        _class: _entities.TypeClass.fromAstNode(t, $unwrapTraitObject(self).reportError),
        instance: _core.None
      };
      return $unwrapTraitObject($unwrapTraitObject(self).scope).defineType(t.type_, t);
    };
  },
  visitTypePath: function visitTypePath(t) {
    var self = this;
    if (!t.scope) {
      t.scope = $unwrapTraitObject(self).scope;
      var binding = $unwrapTraitObject(t.scope).getTypeBinding($unwrapTraitObject($unwrapTraitObject(t.value)[0]).name);
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
      return bound.type_ || type_;
    });
    var patternType = _core.None;
    var __PUCK__value__24 = declarePatternVariables(d.scope, self, d.pattern, d.mutable, d.type_, allowNotExhaustive);
    var __PUCK__value__25 = __PUCK__value__24;
    if ($unwrapTraitObject(__PUCK__value__25).kind == "Ok") {
      var _PUCK__value__25$val = _slicedToArray(__PUCK__value__25.value, 1),
          patternTy = _PUCK__value__25$val[0];

      patternType = (0, _core.Some)(patternTy);
      if (!(0, _types.isAssignable)(patternTy, d.type_)) {
        $unwrapTraitObject(self).reportError(d, notAssignableError(patternTy, d.type_));
      };
    } else {
      var __PUCK__value__26 = __PUCK__value__24;
      if ($unwrapTraitObject(__PUCK__value__26).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__26).value)[$unwrapTraitObject(0)]).kind == "PatternMismatch") {
        var _PUCK__value__26$val = _slicedToArray(__PUCK__value__26.value, 1),
            _PUCK__value__26$val$ = _slicedToArray(_PUCK__value__26$val[0].value, 3),
            __PUCK__value__27 = _PUCK__value__26$val$[0],
            to = _PUCK__value__26$val$[1],
            subject = _PUCK__value__26$val$[2];

        $unwrapTraitObject(self).reportError(d, notAssignableError(to, subject));
      } else {
        var __PUCK__value__28 = __PUCK__value__24;
        if ($unwrapTraitObject(__PUCK__value__28).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__28).value)[$unwrapTraitObject(0)]).kind == "NotExhaustive") {
          var _PUCK__value__28$val = _toArray(__PUCK__value__28.value);

          $unwrapTraitObject(self).reportError(d, "non exhaustive pattern");
        };
      };
    };
    var __PUCK__value__29 = d.initializer;
    if ($unwrapTraitObject(__PUCK__value__29).kind == "Some") {
      var _PUCK__value__29$val = _slicedToArray(__PUCK__value__29.value, 1),
          initializer = _PUCK__value__29$val[0];

      visitInitializer(initializer);
      if (!d.type_ && d.pattern.binding) {
        $unwrapTraitObject(d.pattern.binding).type_ = initializer.type_;
        return d.type_ = initializer.type_;
      } else {
        if (!(0, _types.isAssignable)(d.type_, initializer.type_)) {
          return $unwrapTraitObject(self).reportError(d, notAssignableError(d.type_, initializer.type_));
        } else {
          var __PUCK__value__30 = patternType;
          if ($unwrapTraitObject(__PUCK__value__30).kind == "Some") {
            var _PUCK__value__30$val = _slicedToArray(__PUCK__value__30.value, 1),
                _patternTy = _PUCK__value__30$val[0];

            _patternTy = _patternTy;
            if (!(0, _types.isAssignable)(_patternTy, initializer.type_)) {
              return $unwrapTraitObject(self).reportError(d, notAssignableError(_patternTy, initializer.type_));
            };
          };
        };
      };
    };
  },
  visitLiteral: function visitLiteral(l) {
    var self = this;
    $unwrapTraitObject(l).scope = $unwrapTraitObject(self).scope;
    if ($unwrapTraitObject(l).kind == $unwrapTraitObject(_ast2.SyntaxKind).BooleanLiteral) {
      return $unwrapTraitObject(self).visitStrictBooleanLiteral(l);
    } else {
      if ($unwrapTraitObject(l).kind == $unwrapTraitObject(_ast2.SyntaxKind).ListLiteral) {
        return $unwrapTraitObject(self).visitStrictListLiteral(l);
      } else {
        if ($unwrapTraitObject(l).kind == $unwrapTraitObject(_ast2.SyntaxKind).NumberLiteral) {
          return $unwrapTraitObject(self).visitStrictNumberLiteral(l);
        } else {
          if ($unwrapTraitObject(l).kind == $unwrapTraitObject(_ast2.SyntaxKind).ObjectLiteral) {
            return $unwrapTraitObject(self).visitStrictObjectLiteral(l);
          } else {
            if ($unwrapTraitObject(l).kind == $unwrapTraitObject(_ast2.SyntaxKind).StringLiteral) {
              return $unwrapTraitObject(self).visitStrictStringLiteral(l);
            } else {
              return $unwrapTraitObject(self).reportError(l, "not a literal" + (0, _util.inspect)(l));
            };
          };
        };
      };
    };
  },
  visitStrictBooleanLiteral: function visitStrictBooleanLiteral(l) {
    var self = this;
    return l.type_ = $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(self).scope).getTypeBinding("Bool")).type_;
  },
  visitStrictListLiteral: function visitStrictListLiteral(l) {
    var self = this;
    return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: l.members, $isTraitObject: true }, $unwrapTraitObject($unwrapTraitObject(self).visitLiteral).bind(self));
  },
  visitStrictNumberLiteral: function visitStrictNumberLiteral(l) {
    var self = this;
    return l.type_ = $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(self).scope).getTypeBinding("Num")).type_;
  },
  visitStrictObjectLiteral: function visitStrictObjectLiteral(l) {
    var self = this;
    return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: l.members, $isTraitObject: true }, function (m) {
      return $unwrapTraitObject(self).visitLiteral(m.value);
    });
  },
  visitStrictStringLiteral: function visitStrictStringLiteral(l) {
    var self = this;
    l.type_ = $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(self).scope).getTypeBinding("String")).type_;
    if ($unwrapTraitObject(l.parts).some(function (p) {
      return $unwrapTraitObject(p).kind == $unwrapTraitObject(_ast2.SyntaxKind).Identifier;
    })) {
      return $unwrapTraitObject(self).reportError(l, "not a literal");
    };
  },
  visitStrictTupleLiteral: function visitStrictTupleLiteral(l) {
    var self = this;
    return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: l.expressions, $isTraitObject: true }, $unwrapTraitObject($unwrapTraitObject(self).visitLiteral).bind(self));
  }
};
function declarePatternVariables(scope, visitor, p, mutable, type_, allowNotExhaustive) {
  var __PUCK__value__31 = p;
  var __PUCK__value__32 = __PUCK__value__31;
  if ($unwrapTraitObject(__PUCK__value__32).kind == "CatchAll") {
    var _undefined2 = __PUCK__value__32;
    return (0, _core.Ok)(false);
  } else {
    var __PUCK__value__33 = __PUCK__value__31;
    if ($unwrapTraitObject(__PUCK__value__33).kind == "Identifier") {
      var _undefined3 = __PUCK__value__33;
      p.binding = scope.define({
        name: $unwrapTraitObject($unwrapTraitObject(p.value)[0]).name,
        mutable: mutable,
        token: p,
        type_: type_
      }, true);
      return (0, _core.Ok)(false);
    } else {
      var __PUCK__value__34 = __PUCK__value__31;
      if ($unwrapTraitObject(__PUCK__value__34).kind == "Record") {
        var _ret2 = function () {
          var _PUCK__value__34$val = _slicedToArray(__PUCK__value__34.value, 1),
              record = _PUCK__value__34$val[0];

          var __PUCK__value__35 = void 0;
          if (type_) {
            var __PUCK__value__36 = type_.kind;
            var __PUCK__value__37 = __PUCK__value__36;
            var __PUCK__value__38 = void 0;
            if ($unwrapTraitObject(__PUCK__value__37).kind == "Struct") {
              var _PUCK__value__37$val = _slicedToArray(__PUCK__value__37.value, 1),
                  struct = _PUCK__value__37$val[0];

              var __PUCK__value__39 = struct.kind;
              var __PUCK__value__40 = __PUCK__value__39;
              var __PUCK__value__41 = void 0;
              if ($unwrapTraitObject(__PUCK__value__40).kind == "Record") {
                var _PUCK__value__40$val = _slicedToArray(__PUCK__value__40.value, 1),
                    _record = _PUCK__value__40$val[0];

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
                var _undefined4 = __PUCK__value__45;
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
            return declarePatternVariables(scope, visitor, p.pattern, mutable, props[p.property.name], allowNotExhaustive);
          }).value.reduce(function (acc, cur) {
            return _core.Result.andThen.call(acc, function (props) {
              return _core.Result.map.call(cur, function (prop) {
                return props.concat(prop);
              });
            });
          }, (0, _core.Ok)([]));
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
            var _PUCK__value__51$val = _slicedToArray(__PUCK__value__51.value, 2),
                typePath = _PUCK__value__51$val[0],
                record = _PUCK__value__51$val[1];

            $unwrapTraitObject(visitor).visitTypePath(typePath);
            var __PUCK__value__52 = void 0;
            if (type_) {
              __PUCK__value__52 = type_;
            } else {
              __PUCK__value__52 = typePath.type_;
            };
            var recordType = __PUCK__value__52;
            var __PUCK__value__53 = recordType.kind;
            var __PUCK__value__54 = __PUCK__value__53;
            var __PUCK__value__55 = void 0;
            if ($unwrapTraitObject(__PUCK__value__54).kind == "Enum") {
              var _PUCK__value__54$val = _slicedToArray(__PUCK__value__54.value, 1),
                  enum_ = _PUCK__value__54$val[0];

              var member = (0, _enums.getEnumMember)(typePath);
              var enumArmType = enum_.members[member];
              __PUCK__value__55 = enumArmType;
            } else {
              var __PUCK__value__56 = __PUCK__value__53;
              var __PUCK__value__57 = void 0;
              if (true) {
                var __PUCK__value__58 = __PUCK__value__56;
                __PUCK__value__57 = recordType;
              };
              __PUCK__value__55 = __PUCK__value__57;
            };
            recordType = __PUCK__value__55;
            var __PUCK__value__59 = recordType.kind;
            var __PUCK__value__60 = __PUCK__value__59;
            var __PUCK__value__61 = void 0;
            if ($unwrapTraitObject(__PUCK__value__60).kind == "Struct") {
              var _PUCK__value__60$val = _slicedToArray(__PUCK__value__60.value, 1),
                  struct = _PUCK__value__60$val[0];

              var __PUCK__value__62 = struct.kind;
              var __PUCK__value__63 = __PUCK__value__62;
              var __PUCK__value__64 = void 0;
              if ($unwrapTraitObject(__PUCK__value__63).kind == "Record") {
                var _PUCK__value__63$val = _slicedToArray(__PUCK__value__63.value, 1),
                    _record2 = _PUCK__value__63$val[0];

                __PUCK__value__64 = _record2.properties;
              } else {
                var __PUCK__value__65 = __PUCK__value__62;
                var __PUCK__value__66 = void 0;
                if (true) {
                  var __PUCK__value__67 = __PUCK__value__65;
                  throw "bad type";
                };
                __PUCK__value__64 = __PUCK__value__66;
              };
              __PUCK__value__61 = __PUCK__value__64;
            } else {
              var __PUCK__value__68 = __PUCK__value__59;
              var __PUCK__value__69 = void 0;
              if ($unwrapTraitObject(__PUCK__value__68).kind == "Parameter") {
                var _undefined5 = __PUCK__value__68;
                __PUCK__value__69 = {};
              } else {
                var __PUCK__value__70 = __PUCK__value__59;
                var __PUCK__value__71 = void 0;
                if (true) {
                  var __PUCK__value__72 = __PUCK__value__70;
                  throw "abd type";
                };
                __PUCK__value__69 = __PUCK__value__71;
              };
              __PUCK__value__61 = __PUCK__value__69;
            };
            var props = __PUCK__value__61;
            var properties = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: record.properties, $isTraitObject: true }, function (p) {
              return declarePatternVariables(scope, visitor, p.pattern, mutable, props[p.property.name], allowNotExhaustive);
            }).value.reduce(function (acc, cur) {
              return _core.Result.andThen.call(acc, function (props) {
                return _core.Result.map.call(cur, function (prop) {
                  return props.concat(prop);
                });
              });
            }, (0, _core.Ok)([]));
            return {
              v: _core.Result.map.call(properties, function (__PUCK__value__73) {
                return typePath.type_;
              })
            };
          }();

          if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
        } else {
          var __PUCK__value__74 = __PUCK__value__31;
          if ($unwrapTraitObject(__PUCK__value__74).kind == "Tuple") {
            var _ret4 = function () {
              var _PUCK__value__74$val = _slicedToArray(__PUCK__value__74.value, 1),
                  tuple = _PUCK__value__74$val[0];

              var __PUCK__value__75 = void 0;
              if (type_) {
                var __PUCK__value__76 = type_.kind;
                var __PUCK__value__77 = __PUCK__value__76;
                var __PUCK__value__78 = void 0;
                if ($unwrapTraitObject(__PUCK__value__77).kind == "Struct") {
                  var _PUCK__value__77$val = _slicedToArray(__PUCK__value__77.value, 1),
                      struct = _PUCK__value__77$val[0];

                  var __PUCK__value__79 = struct.kind;
                  var __PUCK__value__80 = __PUCK__value__79;
                  var __PUCK__value__81 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__80).kind == "Tuple") {
                    var _PUCK__value__80$val = _slicedToArray(__PUCK__value__80.value, 1),
                        _tuple = _PUCK__value__80$val[0];

                    __PUCK__value__81 = _tuple.properties;
                  } else {
                    var __PUCK__value__82 = __PUCK__value__79;
                    var __PUCK__value__83 = void 0;
                    if (true) {
                      var __PUCK__value__84 = __PUCK__value__82;
                      throw "bad type t";
                    };
                    __PUCK__value__81 = __PUCK__value__83;
                  };
                  __PUCK__value__78 = __PUCK__value__81;
                } else {
                  var __PUCK__value__85 = __PUCK__value__76;
                  var __PUCK__value__86 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__85).kind == "Parameter") {
                    var _undefined6 = __PUCK__value__85;
                    __PUCK__value__86 = [];
                  } else {
                    var __PUCK__value__87 = __PUCK__value__76;
                    var __PUCK__value__88 = void 0;
                    if (true) {
                      var __PUCK__value__89 = __PUCK__value__87;
                      return {
                        v: (0, _core.Err)(PatternError.PatternMismatch(p, p.type_, type_))
                      };
                    };
                    __PUCK__value__86 = __PUCK__value__88;
                  };
                  __PUCK__value__78 = __PUCK__value__86;
                };
                __PUCK__value__75 = __PUCK__value__78;
              } else {
                __PUCK__value__75 = [];
              };
              var props = __PUCK__value__75;
              var __PUCK__value__91 = _core.Iterable['$List<E>'].enumerate.call({ type: '$List<E>', value: tuple.properties, $isTraitObject: true });
              var __PUCK__value__90 = _core.Iterable[__PUCK__value__91.type].map.call(__PUCK__value__91, function (_ref4) {
                var _ref5 = _slicedToArray(_ref4, 2),
                    p = _ref5[0],
                    i = _ref5[1];

                return declarePatternVariables(scope, visitor, $unwrapTraitObject(p), mutable, props[i], allowNotExhaustive);
              });
              var properties = _core.Iterable[__PUCK__value__90.type].toList.call(__PUCK__value__90).reduce(function (acc, cur) {
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
            var __PUCK__value__92 = __PUCK__value__31;
            if ($unwrapTraitObject(__PUCK__value__92).kind == "TupleType") {
              var _ret5 = function () {
                var _PUCK__value__92$val = _slicedToArray(__PUCK__value__92.value, 2),
                    typePath = _PUCK__value__92$val[0],
                    tuple = _PUCK__value__92$val[1];

                $unwrapTraitObject(visitor).visitTypePath(typePath);
                var __PUCK__value__93 = void 0;
                if (type_) {
                  __PUCK__value__93 = type_;
                } else {
                  __PUCK__value__93 = typePath.type_;
                };
                var tupleType = __PUCK__value__93;
                var __PUCK__value__94 = void 0;
                if ((0, _types.isAssignable)(typePath.type_, tupleType)) {
                  __PUCK__value__94 = tupleType;
                } else {
                  __PUCK__value__94 = typePath.type_;
                };
                var typePathType = __PUCK__value__94;
                var __PUCK__value__95 = typePathType.kind;
                var __PUCK__value__96 = __PUCK__value__95;
                var __PUCK__value__97 = void 0;
                if ($unwrapTraitObject(__PUCK__value__96).kind == "Enum") {
                  var _PUCK__value__96$val = _slicedToArray(__PUCK__value__96.value, 1),
                      enum_ = _PUCK__value__96$val[0];

                  var member = (0, _enums.getEnumMember)(typePath);
                  var enumArmType = enum_.members[member];
                  __PUCK__value__97 = enumArmType;
                } else {
                  var __PUCK__value__98 = __PUCK__value__95;
                  var __PUCK__value__99 = void 0;
                  if (true) {
                    var __PUCK__value__100 = __PUCK__value__98;
                    __PUCK__value__99 = tupleType;
                  };
                  __PUCK__value__97 = __PUCK__value__99;
                };
                tupleType = __PUCK__value__97;
                var __PUCK__value__101 = tupleType.kind;
                var __PUCK__value__102 = __PUCK__value__101;
                var __PUCK__value__103 = void 0;
                if ($unwrapTraitObject(__PUCK__value__102).kind == "Struct") {
                  var _PUCK__value__102$va = _slicedToArray(__PUCK__value__102.value, 1),
                      struct = _PUCK__value__102$va[0];

                  var __PUCK__value__104 = struct.kind;
                  var __PUCK__value__105 = __PUCK__value__104;
                  var __PUCK__value__106 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__105).kind == "Tuple") {
                    var _PUCK__value__105$va = _slicedToArray(__PUCK__value__105.value, 1),
                        _tuple2 = _PUCK__value__105$va[0];

                    __PUCK__value__106 = _tuple2.properties;
                  } else {
                    var __PUCK__value__107 = __PUCK__value__104;
                    var __PUCK__value__108 = void 0;
                    if (true) {
                      var __PUCK__value__109 = __PUCK__value__107;
                      throw "bad type t";
                    };
                    __PUCK__value__106 = __PUCK__value__108;
                  };
                  __PUCK__value__103 = __PUCK__value__106;
                } else {
                  var __PUCK__value__110 = __PUCK__value__101;
                  var __PUCK__value__111 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__110).kind == "Parameter") {
                    var _undefined7 = __PUCK__value__110;
                    __PUCK__value__111 = [];
                  } else {
                    var __PUCK__value__112 = __PUCK__value__101;
                    var __PUCK__value__113 = void 0;
                    if (true) {
                      var __PUCK__value__114 = __PUCK__value__112;
                      return {
                        v: (0, _core.Err)(PatternError.PatternMismatch(p, p.type_, tupleType))
                      };
                    };
                    __PUCK__value__111 = __PUCK__value__113;
                  };
                  __PUCK__value__103 = __PUCK__value__111;
                };
                var props = __PUCK__value__103;
                var __PUCK__value__116 = _core.Iterable['$List<E>'].enumerate.call({ type: '$List<E>', value: tuple.properties, $isTraitObject: true });
                var __PUCK__value__115 = _core.Iterable[__PUCK__value__116.type].map.call(__PUCK__value__116, function (_ref6) {
                  var _ref7 = _slicedToArray(_ref6, 2),
                      p = _ref7[0],
                      i = _ref7[1];

                  return declarePatternVariables(scope, visitor, $unwrapTraitObject(p), mutable, props[i], allowNotExhaustive);
                });
                var properties = _core.Iterable[__PUCK__value__115.type].toList.call(__PUCK__value__115).reduce(function (acc, cur) {
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
                    var __PUCK__value__117 = $unwrapTraitObject(typePath.type_).kind;
                    if ($unwrapTraitObject(__PUCK__value__117).kind == "Enum") {
                      var _PUCK__value__117$va = _slicedToArray(__PUCK__value__117.value, 1),
                          enumType = _PUCK__value__117$va[0];

                      if (!allowNotExhaustive && _core.ObjectMap.size.call(enumType.members) > 1) {
                        return (0, _core.Err)(PatternError.NotExhaustive);
                      } else {
                        var _member = (0, _enums.getEnumMember)(typePath);
                        var _enumArmType = enumType.members[_member];
                        if ((0, _types.isAssignable)(_enumArmType, type_)) {
                          return (0, _core.Ok)(typePath.type_);
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

              if ((typeof _ret5 === 'undefined' ? 'undefined' : _typeof(_ret5)) === "object") return _ret5.v;
            } else {
              var __PUCK__value__118 = __PUCK__value__31;
              if ($unwrapTraitObject(__PUCK__value__118).kind == "UnitType") {
                var _PUCK__value__118$va = _slicedToArray(__PUCK__value__118.value, 1),
                    typePath = _PUCK__value__118$va[0];

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
