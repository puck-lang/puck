'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.structureVisitor = undefined;

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
var PatternError = {
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
          if (assignedTo && $unwrapTraitObject($unwrapTraitObject(assignedTo)._arguments)[i]) {
            __PUCK__value__5 = $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(assignedTo)._arguments)[i]).type_;
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
            name: $unwrapTraitObject(name).name,
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

        var __PUCK__value__9 = $unwrapTraitObject(first).pattern;
        if ($unwrapTraitObject(__PUCK__value__9).kind == "Identifier") {
          var _PUCK__value__9$valu = _slicedToArray(__PUCK__value__9.value, 1),
              name = _PUCK__value__9$valu[0].name;

          var type_ = $unwrapTraitObject(first).typeBound;
          if (name == "self") {
            if (_core.Option.isNone.call(type_)) {
              $unwrapTraitObject(f.parameterList[0]).typeBound = (0, _core.Some)({
                kind: $unwrapTraitObject(_ast2.SyntaxKind).NamedTypeBound,
                path: _ast.TypePath.Member({ name: "Self" }),
                typeParameters: []
              });
            } else {
              $unwrapTraitObject(self).visitFunctionParameter(first);
              if (!(0, _types.isAssignable)($unwrapTraitObject(first).type_, selfType)) {
                $unwrapTraitObject(self).reportError(first, notAssignableError($unwrapTraitObject(first).type_, selfType));
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
  visitFunctionTypeBound: function visitFunctionTypeBound(t) {
    var self = this;
    if (!t.scope) {
      $unwrapTraitObject(self).scope = $unwrapTraitObject($unwrapTraitObject(self).scope).createChild();
      t.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(visit).walkFunctionTypeBound(self, t);
      t.type_ = (0, _types.getType)(t.scope, t);
      return $unwrapTraitObject(self).scope = $unwrapTraitObject($unwrapTraitObject(self).scope).parent;
    };
  },
  visitNamedTypeBound: function visitNamedTypeBound(t) {
    var self = this;
    if (!t.scope) {
      t.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(self).visitTypePath(t.path);
      var type_ = t.path.type_;
      var __PUCK__value__11 = t.path;
      var __PUCK__value__12 = void 0;
      if ($unwrapTraitObject(__PUCK__value__11).kind == "Member") {
        var _PUCK__value__11$val = _slicedToArray(__PUCK__value__11.value, 1),
            name = _PUCK__value__11$val[0].name;

        var __PUCK__value__13 = void 0;
        if (name == "Self") {
          if (t.typeParameters.length > 0) {
            $unwrapTraitObject(self).reportError(t, "Self is not generic");
          };
          var __PUCK__value__14 = type_._class;
          if ($unwrapTraitObject(__PUCK__value__14).kind == "Some") {
            var _PUCK__value__14$val = _slicedToArray(__PUCK__value__14.value, 1),
                _class = _PUCK__value__14$val[0];

            t.typeParameters = $unwrapTraitObject($unwrapTraitObject(_class).typeParameterBindings).map(function (_ref3) {
              var name = _ref3.name;

              return {
                kind: $unwrapTraitObject(_ast2.SyntaxKind).NamedTypeBound,
                path: _ast.TypePath.Member(name),
                typeParameters: []
              };
            });
          };
          __PUCK__value__13 = true;
        } else {
          __PUCK__value__13 = false;
        };
        __PUCK__value__12 = __PUCK__value__13;
      } else {
        __PUCK__value__12 = false;
      };
      var isSelf = __PUCK__value__12;
      if (!isSelf) {
        var __PUCK__value__15 = type_._class;
        if ($unwrapTraitObject(__PUCK__value__15).kind == "Some") {
          var _PUCK__value__15$val = _slicedToArray(__PUCK__value__15.value, 1),
              _class2 = _PUCK__value__15$val[0];

          var __PUCK__value__16 = (0, _range.checkRange)(t.typeParameters, $unwrapTraitObject(_class2).parameterRange, "type parameters", _entities.Type.displayName.call(type_));
          if ($unwrapTraitObject(__PUCK__value__16).kind == "Err") {
            var _PUCK__value__16$val = _slicedToArray(__PUCK__value__16.value, 1),
                error = _PUCK__value__16$val[0];

            $unwrapTraitObject(self).reportError(t, error);
          };
        } else {
          if (t.typeParameters.length > 0) {
            $unwrapTraitObject(self).reportError(t, "Type " + _entities.Type.displayName.call(type_) + " is not generic");
          };
        };
      };
      $unwrapTraitObject(visit).walkNamedTypeBound(self, t);
      var __PUCK__value__17 = void 0;
      if (_core.Option.isSome.call(type_._class)) {
        __PUCK__value__17 = (0, _types.createTypeInstance)(type_, _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: t.typeParameters, $isTraitObject: true }, function (p) {
          return p.type_;
        }));
      } else {
        __PUCK__value__17 = type_;
      };
      return t.type_ = __PUCK__value__17;
    };
  },
  visitObjectTypeBound: function visitObjectTypeBound(t) {
    var self = this;
    if (!t.scope) {
      t.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(visit).walkObjectTypeBound(self, t);
      return t.type_ = (0, _types.getType)(t.scope, t);
    };
  },
  visitTupleTypeBound: function visitTupleTypeBound(t) {
    var self = this;
    if (!t.scope) {
      t.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(visit).walkTupleTypeBound(self, t);
      return t.type_ = (0, _types.getType)(t.scope, t);
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
            return (0, _types.getType)(t.scope, typeBound);
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
      return (0, _types.getType)(d.scope, bound) || type_;
    });
    var patternType = _core.None;
    var __PUCK__value__18 = declarePatternVariables(d.scope, self, d.pattern, d.mutable, d.type_, allowNotExhaustive);
    var __PUCK__value__19 = __PUCK__value__18;
    if ($unwrapTraitObject(__PUCK__value__19).kind == "Ok") {
      var _PUCK__value__19$val = _slicedToArray(__PUCK__value__19.value, 1),
          patternTy = _PUCK__value__19$val[0];

      patternType = (0, _core.Some)(patternTy);
      if (!(0, _types.isAssignable)(patternTy, d.type_)) {
        $unwrapTraitObject(self).reportError(d, notAssignableError(patternTy, d.type_));
      };
    } else {
      var __PUCK__value__20 = __PUCK__value__18;
      if ($unwrapTraitObject(__PUCK__value__20).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__20).value)[$unwrapTraitObject(0)]).kind == "PatternMismatch") {
        var _PUCK__value__20$val = _slicedToArray(__PUCK__value__20.value, 1),
            _PUCK__value__20$val$ = _slicedToArray(_PUCK__value__20$val[0].value, 3),
            __PUCK__value__21 = _PUCK__value__20$val$[0],
            to = _PUCK__value__20$val$[1],
            subject = _PUCK__value__20$val$[2];

        $unwrapTraitObject(self).reportError(d, notAssignableError(to, subject));
      } else {
        var __PUCK__value__22 = __PUCK__value__18;
        if ($unwrapTraitObject(__PUCK__value__22).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__22).value)[$unwrapTraitObject(0)]).kind == "NotExhaustive") {
          var _PUCK__value__22$val = _toArray(__PUCK__value__22.value);

          $unwrapTraitObject(self).reportError(d, "non exhaustive pattern");
        };
      };
    };
    var __PUCK__value__23 = d.initializer;
    if ($unwrapTraitObject(__PUCK__value__23).kind == "Some") {
      var _PUCK__value__23$val = _slicedToArray(__PUCK__value__23.value, 1),
          initializer = _PUCK__value__23$val[0];

      visitInitializer(initializer);
      if (!d.type_ && d.pattern.binding) {
        $unwrapTraitObject(d.pattern.binding).type_ = $unwrapTraitObject(initializer).type_;
        return d.type_ = $unwrapTraitObject(initializer).type_;
      } else {
        if (!(0, _types.isAssignable)(d.type_, $unwrapTraitObject(initializer).type_)) {
          return $unwrapTraitObject(self).reportError(d, notAssignableError(d.type_, $unwrapTraitObject(initializer).type_));
        } else {
          var __PUCK__value__24 = patternType;
          if ($unwrapTraitObject(__PUCK__value__24).kind == "Some") {
            var _PUCK__value__24$val = _slicedToArray(__PUCK__value__24.value, 1),
                _patternTy = _PUCK__value__24$val[0];

            _patternTy = _patternTy;
            if (!(0, _types.isAssignable)(_patternTy, $unwrapTraitObject(initializer).type_)) {
              return $unwrapTraitObject(self).reportError(d, notAssignableError(_patternTy, $unwrapTraitObject(initializer).type_));
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
  var __PUCK__value__25 = p;
  var __PUCK__value__26 = __PUCK__value__25;
  if ($unwrapTraitObject(__PUCK__value__26).kind == "CatchAll") {
    var _undefined2 = __PUCK__value__26;
    return (0, _core.Ok)(false);
  } else {
    var __PUCK__value__27 = __PUCK__value__25;
    if ($unwrapTraitObject(__PUCK__value__27).kind == "Identifier") {
      var _undefined3 = __PUCK__value__27;
      p.binding = scope.define({
        name: $unwrapTraitObject($unwrapTraitObject(p.value)[0]).name,
        mutable: mutable,
        token: p,
        type_: type_
      }, true);
      return (0, _core.Ok)(false);
    } else {
      var __PUCK__value__28 = __PUCK__value__25;
      if ($unwrapTraitObject(__PUCK__value__28).kind == "Record") {
        var _ret2 = function () {
          var _PUCK__value__28$val = _slicedToArray(__PUCK__value__28.value, 1),
              record = _PUCK__value__28$val[0];

          var __PUCK__value__29 = void 0;
          if (type_) {
            var __PUCK__value__30 = type_.kind;
            var __PUCK__value__31 = __PUCK__value__30;
            var __PUCK__value__32 = void 0;
            if ($unwrapTraitObject(__PUCK__value__31).kind == "Struct") {
              var _PUCK__value__31$val = _slicedToArray(__PUCK__value__31.value, 1),
                  struct = _PUCK__value__31$val[0];

              var __PUCK__value__33 = struct.kind;
              var __PUCK__value__34 = __PUCK__value__33;
              var __PUCK__value__35 = void 0;
              if ($unwrapTraitObject(__PUCK__value__34).kind == "Record") {
                var _PUCK__value__34$val = _slicedToArray(__PUCK__value__34.value, 1),
                    _record = _PUCK__value__34$val[0];

                __PUCK__value__35 = _record.properties;
              } else {
                var __PUCK__value__36 = __PUCK__value__33;
                var __PUCK__value__37 = void 0;
                if (true) {
                  var __PUCK__value__38 = __PUCK__value__36;
                  throw "bad type";
                };
                __PUCK__value__35 = __PUCK__value__37;
              };
              __PUCK__value__32 = __PUCK__value__35;
            } else {
              var __PUCK__value__39 = __PUCK__value__30;
              var __PUCK__value__40 = void 0;
              if ($unwrapTraitObject(__PUCK__value__39).kind == "Parameter") {
                var _undefined4 = __PUCK__value__39;
                __PUCK__value__40 = {};
              } else {
                var __PUCK__value__41 = __PUCK__value__30;
                var __PUCK__value__42 = void 0;
                if (true) {
                  var __PUCK__value__43 = __PUCK__value__41;
                  throw "abd type";
                };
                __PUCK__value__40 = __PUCK__value__42;
              };
              __PUCK__value__32 = __PUCK__value__40;
            };
            __PUCK__value__29 = __PUCK__value__32;
          } else {
            __PUCK__value__29 = _core.ObjectMap._new();
          };
          var props = __PUCK__value__29;
          var properties = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: record.properties, $isTraitObject: true }, function (p) {
            return declarePatternVariables(scope, visitor, p.pattern, mutable, $unwrapTraitObject(props)[p.property.name], allowNotExhaustive);
          }).value.reduce(function (acc, cur) {
            return _core.Result.andThen.call(acc, function (props) {
              return _core.Result.map.call(cur, function (prop) {
                return props.concat(prop);
              });
            });
          }, (0, _core.Ok)([]));
          return {
            v: _core.Result.map.call(properties, function (__PUCK__value__44) {
              return false;
            })
          };
        }();

        if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
      } else {
        var __PUCK__value__45 = __PUCK__value__25;
        if ($unwrapTraitObject(__PUCK__value__45).kind == "RecordType") {
          var _ret3 = function () {
            var _PUCK__value__45$val = _slicedToArray(__PUCK__value__45.value, 2),
                typePath = _PUCK__value__45$val[0],
                record = _PUCK__value__45$val[1];

            $unwrapTraitObject(visitor).visitTypePath(typePath);
            var __PUCK__value__46 = void 0;
            if (type_) {
              __PUCK__value__46 = type_;
            } else {
              __PUCK__value__46 = typePath.type_;
            };
            var recordType = __PUCK__value__46;
            var __PUCK__value__47 = recordType.kind;
            var __PUCK__value__48 = __PUCK__value__47;
            var __PUCK__value__49 = void 0;
            if ($unwrapTraitObject(__PUCK__value__48).kind == "Enum") {
              var _PUCK__value__48$val = _slicedToArray(__PUCK__value__48.value, 1),
                  enum_ = _PUCK__value__48$val[0];

              var member = (0, _enums.getEnumMember)(typePath);
              var enumArmType = enum_.members[$unwrapTraitObject(member)];
              __PUCK__value__49 = enumArmType;
            } else {
              var __PUCK__value__50 = __PUCK__value__47;
              var __PUCK__value__51 = void 0;
              if (true) {
                var __PUCK__value__52 = __PUCK__value__50;
                __PUCK__value__51 = recordType;
              };
              __PUCK__value__49 = __PUCK__value__51;
            };
            recordType = __PUCK__value__49;
            var __PUCK__value__53 = recordType.kind;
            var __PUCK__value__54 = __PUCK__value__53;
            var __PUCK__value__55 = void 0;
            if ($unwrapTraitObject(__PUCK__value__54).kind == "Struct") {
              var _PUCK__value__54$val = _slicedToArray(__PUCK__value__54.value, 1),
                  struct = _PUCK__value__54$val[0];

              var __PUCK__value__56 = struct.kind;
              var __PUCK__value__57 = __PUCK__value__56;
              var __PUCK__value__58 = void 0;
              if ($unwrapTraitObject(__PUCK__value__57).kind == "Record") {
                var _PUCK__value__57$val = _slicedToArray(__PUCK__value__57.value, 1),
                    _record2 = _PUCK__value__57$val[0];

                __PUCK__value__58 = _record2.properties;
              } else {
                var __PUCK__value__59 = __PUCK__value__56;
                var __PUCK__value__60 = void 0;
                if (true) {
                  var __PUCK__value__61 = __PUCK__value__59;
                  throw "bad type";
                };
                __PUCK__value__58 = __PUCK__value__60;
              };
              __PUCK__value__55 = __PUCK__value__58;
            } else {
              var __PUCK__value__62 = __PUCK__value__53;
              var __PUCK__value__63 = void 0;
              if ($unwrapTraitObject(__PUCK__value__62).kind == "Parameter") {
                var _undefined5 = __PUCK__value__62;
                __PUCK__value__63 = {};
              } else {
                var __PUCK__value__64 = __PUCK__value__53;
                var __PUCK__value__65 = void 0;
                if (true) {
                  var __PUCK__value__66 = __PUCK__value__64;
                  throw "abd type";
                };
                __PUCK__value__63 = __PUCK__value__65;
              };
              __PUCK__value__55 = __PUCK__value__63;
            };
            var props = __PUCK__value__55;
            var properties = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: record.properties, $isTraitObject: true }, function (p) {
              return declarePatternVariables(scope, visitor, p.pattern, mutable, $unwrapTraitObject(props)[p.property.name], allowNotExhaustive);
            }).value.reduce(function (acc, cur) {
              return _core.Result.andThen.call(acc, function (props) {
                return _core.Result.map.call(cur, function (prop) {
                  return props.concat(prop);
                });
              });
            }, (0, _core.Ok)([]));
            return {
              v: _core.Result.map.call(properties, function (__PUCK__value__67) {
                return $unwrapTraitObject($unwrapTraitObject(p.value)[0]).type_;
              })
            };
          }();

          if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
        } else {
          var __PUCK__value__68 = __PUCK__value__25;
          if ($unwrapTraitObject(__PUCK__value__68).kind == "Tuple") {
            var _ret4 = function () {
              var _PUCK__value__68$val = _slicedToArray(__PUCK__value__68.value, 1),
                  tuple = _PUCK__value__68$val[0];

              var __PUCK__value__69 = void 0;
              if (type_) {
                var __PUCK__value__70 = type_.kind;
                var __PUCK__value__71 = __PUCK__value__70;
                var __PUCK__value__72 = void 0;
                if ($unwrapTraitObject(__PUCK__value__71).kind == "Struct") {
                  var _PUCK__value__71$val = _slicedToArray(__PUCK__value__71.value, 1),
                      struct = _PUCK__value__71$val[0];

                  var __PUCK__value__73 = struct.kind;
                  var __PUCK__value__74 = __PUCK__value__73;
                  var __PUCK__value__75 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__74).kind == "Tuple") {
                    var _PUCK__value__74$val = _slicedToArray(__PUCK__value__74.value, 1),
                        _tuple = _PUCK__value__74$val[0];

                    __PUCK__value__75 = _tuple.properties;
                  } else {
                    var __PUCK__value__76 = __PUCK__value__73;
                    var __PUCK__value__77 = void 0;
                    if (true) {
                      var __PUCK__value__78 = __PUCK__value__76;
                      throw "bad type t";
                    };
                    __PUCK__value__75 = __PUCK__value__77;
                  };
                  __PUCK__value__72 = __PUCK__value__75;
                } else {
                  var __PUCK__value__79 = __PUCK__value__70;
                  var __PUCK__value__80 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__79).kind == "Parameter") {
                    var _undefined6 = __PUCK__value__79;
                    __PUCK__value__80 = [];
                  } else {
                    var __PUCK__value__81 = __PUCK__value__70;
                    var __PUCK__value__82 = void 0;
                    if (true) {
                      var __PUCK__value__83 = __PUCK__value__81;
                      throw "abd type t";
                    };
                    __PUCK__value__80 = __PUCK__value__82;
                  };
                  __PUCK__value__72 = __PUCK__value__80;
                };
                __PUCK__value__69 = __PUCK__value__72;
              } else {
                __PUCK__value__69 = [];
              };
              var props = __PUCK__value__69;
              var __PUCK__value__84 = _core.Iterable['$List<E>'].enumerate.call({ type: '$List<E>', value: tuple.properties, $isTraitObject: true });
              var properties = _core.Iterable[__PUCK__value__84.type].map.call(__PUCK__value__84, function (_ref4) {
                var _ref5 = _slicedToArray(_ref4, 2),
                    p = _ref5[0],
                    i = _ref5[1];

                return declarePatternVariables(scope, visitor, $unwrapTraitObject(p), mutable, $unwrapTraitObject(props)[i], allowNotExhaustive);
              }).value.reduce(function (acc, cur) {
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
            var __PUCK__value__85 = __PUCK__value__25;
            if ($unwrapTraitObject(__PUCK__value__85).kind == "TupleType") {
              var _ret5 = function () {
                var _PUCK__value__85$val = _slicedToArray(__PUCK__value__85.value, 2),
                    typePath = _PUCK__value__85$val[0],
                    tuple = _PUCK__value__85$val[1];

                $unwrapTraitObject(visitor).visitTypePath(typePath);
                var __PUCK__value__86 = void 0;
                if (type_) {
                  __PUCK__value__86 = type_;
                } else {
                  __PUCK__value__86 = typePath.type_;
                };
                var tupleType = __PUCK__value__86;
                var __PUCK__value__87 = void 0;
                if ((0, _types.isAssignable)(typePath.type_, tupleType)) {
                  __PUCK__value__87 = tupleType;
                } else {
                  __PUCK__value__87 = typePath.type_;
                };
                var typePathType = __PUCK__value__87;
                var __PUCK__value__88 = typePathType.kind;
                var __PUCK__value__89 = __PUCK__value__88;
                var __PUCK__value__90 = void 0;
                if ($unwrapTraitObject(__PUCK__value__89).kind == "Enum") {
                  var _PUCK__value__89$val = _slicedToArray(__PUCK__value__89.value, 1),
                      enum_ = _PUCK__value__89$val[0];

                  var member = (0, _enums.getEnumMember)(typePath);
                  var enumArmType = enum_.members[$unwrapTraitObject(member)];
                  __PUCK__value__90 = enumArmType;
                } else {
                  var __PUCK__value__91 = __PUCK__value__88;
                  var __PUCK__value__92 = void 0;
                  if (true) {
                    var __PUCK__value__93 = __PUCK__value__91;
                    __PUCK__value__92 = tupleType;
                  };
                  __PUCK__value__90 = __PUCK__value__92;
                };
                tupleType = __PUCK__value__90;
                var __PUCK__value__94 = tupleType.kind;
                var __PUCK__value__95 = __PUCK__value__94;
                var __PUCK__value__96 = void 0;
                if ($unwrapTraitObject(__PUCK__value__95).kind == "Struct") {
                  var _PUCK__value__95$val = _slicedToArray(__PUCK__value__95.value, 1),
                      struct = _PUCK__value__95$val[0];

                  var __PUCK__value__97 = struct.kind;
                  var __PUCK__value__98 = __PUCK__value__97;
                  var __PUCK__value__99 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__98).kind == "Tuple") {
                    var _PUCK__value__98$val = _slicedToArray(__PUCK__value__98.value, 1),
                        _tuple2 = _PUCK__value__98$val[0];

                    __PUCK__value__99 = _tuple2.properties;
                  } else {
                    var __PUCK__value__100 = __PUCK__value__97;
                    var __PUCK__value__101 = void 0;
                    if (true) {
                      var __PUCK__value__102 = __PUCK__value__100;
                      throw "bad type t";
                    };
                    __PUCK__value__99 = __PUCK__value__101;
                  };
                  __PUCK__value__96 = __PUCK__value__99;
                } else {
                  var __PUCK__value__103 = __PUCK__value__94;
                  var __PUCK__value__104 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__103).kind == "Parameter") {
                    var _undefined7 = __PUCK__value__103;
                    __PUCK__value__104 = [];
                  } else {
                    var __PUCK__value__105 = __PUCK__value__94;
                    var __PUCK__value__106 = void 0;
                    if (true) {
                      var __PUCK__value__107 = __PUCK__value__105;
                      throw "abd type t";
                    };
                    __PUCK__value__104 = __PUCK__value__106;
                  };
                  __PUCK__value__96 = __PUCK__value__104;
                };
                var props = __PUCK__value__96;
                var __PUCK__value__108 = _core.Iterable['$List<E>'].enumerate.call({ type: '$List<E>', value: tuple.properties, $isTraitObject: true });
                var properties = _core.Iterable[__PUCK__value__108.type].map.call(__PUCK__value__108, function (_ref6) {
                  var _ref7 = _slicedToArray(_ref6, 2),
                      p = _ref7[0],
                      i = _ref7[1];

                  return declarePatternVariables(scope, visitor, $unwrapTraitObject(p), mutable, $unwrapTraitObject(props)[i], allowNotExhaustive);
                }).value.reduce(function (acc, cur) {
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
                    var __PUCK__value__109 = $unwrapTraitObject(typePath.type_).kind;
                    if ($unwrapTraitObject(__PUCK__value__109).kind == "Enum") {
                      var _PUCK__value__109$va = _slicedToArray(__PUCK__value__109.value, 1),
                          enumType = _PUCK__value__109$va[0];

                      if (!allowNotExhaustive && _core.ObjectMap.size.call(enumType.members) > 1) {
                        return (0, _core.Err)(PatternError.NotExhaustive);
                      } else {
                        var _member = (0, _enums.getEnumMember)(typePath);
                        var _enumArmType = enumType.members[$unwrapTraitObject(_member)];
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
              var __PUCK__value__110 = __PUCK__value__25;
              if ($unwrapTraitObject(__PUCK__value__110).kind == "UnitType") {
                var _PUCK__value__110$va = _slicedToArray(__PUCK__value__110.value, 1),
                    typePath = _PUCK__value__110$va[0];

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
