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
  visitEnumMember: visit.walkingVisitor.visitEnumMember,
  visitFunctionDeclaration: function visitFunctionDeclaration(f) {
    var self = this;
    if (!f.scope) {
      var _ret = function () {
        self.scope = self.scope.createChild();
        f.scope = self.scope;
        var __PUCK__value__1 = void 0;
        if (self.assignedTo && self.assignedTo.type_) {
          var __PUCK__value__2 = self.assignedTo.type_.kind;
          var __PUCK__value__3 = void 0;
          if (__PUCK__value__2.kind == "Function") {
            var _PUCK__value__2$valu = _slicedToArray(__PUCK__value__2.value, 1),
                func = _PUCK__value__2$valu[0];

            __PUCK__value__3 = func;
          };
          __PUCK__value__1 = __PUCK__value__3;
        };
        var assignedTo = __PUCK__value__1;
        _core.Iterable['$List<E>'].forEach.call(f.typeParameters, self.visitTypeParameter.bind(self));
        _core.Iterable['$List<E>'].forEach.call(_core.Iterable['$List<E>'].enumerate.call(f.parameterList), function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              p = _ref2[0],
              i = _ref2[1];

          var __PUCK__value__4 = void 0;
          if (assignedTo && assignedTo._arguments[i]) {
            __PUCK__value__4 = assignedTo._arguments[i].type_;
          };
          var type_ = __PUCK__value__4;
          return self.visitFunctionParameter(p, type_);
        });
        var __PUCK__value__5 = f.returnType;
        if (__PUCK__value__5.kind == "Some") {
          var _PUCK__value__5$valu = _slicedToArray(__PUCK__value__5.value, 1),
              returnType = _PUCK__value__5$valu[0];

          self.visitTypeBound(returnType);
        };
        f.type_ = (0, _functions.createFunctionType)(f.scope, f, self.reportError);
        var __PUCK__value__6 = f.name;
        if (__PUCK__value__6.kind == "Some") {
          var _PUCK__value__6$valu = _slicedToArray(__PUCK__value__6.value, 1),
              name = _PUCK__value__6$valu[0];

          f.scope.parent.define({
            name: name.name,
            token: f,
            mutable: false,
            type_: f.type_
          });
        };
        return {
          v: self.scope = f.scope.parent
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    };
  },
  visitMethodDeclaration: function visitMethodDeclaration(f, selfType) {
    var self = this;
    if (!f.scope) {
      self.scope = self.scope.createChild();
      f.scope = self.scope;
      _core.Iterable['$List<E>'].forEach.call(f.typeParameters, self.visitTypeParameter.bind(self));
      var __PUCK__value__7 = _core.Iterable['$List<E>'].first.call(f.parameterList);
      if (__PUCK__value__7.kind == "Some") {
        var _PUCK__value__7$valu = _slicedToArray(__PUCK__value__7.value, 1),
            first = _PUCK__value__7$valu[0];

        var __PUCK__value__8 = first.pattern;
        if (__PUCK__value__8.kind == "Identifier") {
          var _PUCK__value__8$valu = _slicedToArray(__PUCK__value__8.value, 1),
              name = _PUCK__value__8$valu[0].name;

          var type_ = first.typeBound;
          if (name == "self") {
            if (_core.Option.isNothing.call(type_)) {
              f.parameterList[0].typeBound = (0, _core.Some)({
                kind: _ast2.SyntaxKind.NamedTypeBound,
                path: _ast.TypePath.Member({ name: "Self" }),
                typeParameters: []
              });
            } else {
              self.visitFunctionParameter(first);
              if (!(0, _types.isAssignable)(first.type_, selfType)) {
                self.reportError(first, notAssignableError(first.type_, selfType));
              };
            };
          };
        };
      };
      _core.Iterable['$List<E>'].forEach.call(f.parameterList, function (p) {
        return self.visitFunctionParameter(p);
      });
      var __PUCK__value__9 = f.returnType;
      if (__PUCK__value__9.kind == "Some") {
        var _PUCK__value__9$valu = _slicedToArray(__PUCK__value__9.value, 1),
            returnType = _PUCK__value__9$valu[0];

        self.visitTypeBound(returnType);
      };
      f.type_ = (0, _functions.createFunctionType)(f.scope, f, self.reportError);
      return self.scope = f.scope.parent;
    };
  },
  visitFunctionParameter: function visitFunctionParameter(v, type_) {
    var self = this;
    return self.visitVariableDeclaration(v, self.visitLiteral.bind(self), type_);
  },
  visitFunctionTypeBound: function visitFunctionTypeBound(t) {
    var self = this;
    if (!t.scope) {
      self.scope = self.scope.createChild();
      t.scope = self.scope;
      visit.walkFunctionTypeBound(self, t);
      t.type_ = (0, _types.getType)(t.scope, t);
      return self.scope = self.scope.parent;
    };
  },
  visitNamedTypeBound: function visitNamedTypeBound(t) {
    var self = this;
    if (!t.scope) {
      t.scope = self.scope;
      self.visitTypePath(t.path);
      var type_ = t.path.type_;
      var __PUCK__value__10 = t.path;
      var __PUCK__value__11 = void 0;
      if (__PUCK__value__10.kind == "Member") {
        var _PUCK__value__10$val = _slicedToArray(__PUCK__value__10.value, 1),
            name = _PUCK__value__10$val[0].name;

        var __PUCK__value__12 = void 0;
        if (name == "Self") {
          if (t.typeParameters.length > 0) {
            self.reportError(t, "Self is not generic");
          };
          var __PUCK__value__13 = type_._class;
          if (__PUCK__value__13.kind == "Some") {
            var _PUCK__value__13$val = _slicedToArray(__PUCK__value__13.value, 1),
                _class = _PUCK__value__13$val[0];

            t.typeParameters = _class.typeParameterBindings.map(function (_ref3) {
              var name = _ref3.name;

              return {
                kind: _ast2.SyntaxKind.NamedTypeBound,
                path: _ast.TypePath.Member(name),
                typeParameters: []
              };
            });
          };
          __PUCK__value__12 = true;
        } else {
          __PUCK__value__12 = false;
        };
        __PUCK__value__11 = __PUCK__value__12;
      } else {
        __PUCK__value__11 = false;
      };
      var isSelf = __PUCK__value__11;
      if (!isSelf) {
        var __PUCK__value__14 = type_._class;
        if (__PUCK__value__14.kind == "Some") {
          var _PUCK__value__14$val = _slicedToArray(__PUCK__value__14.value, 1),
              _class2 = _PUCK__value__14$val[0];

          var __PUCK__value__15 = (0, _range.checkRange)(t.typeParameters, _class2.parameterRange, "type parameters", _entities.Type.displayName.call(type_));
          if (__PUCK__value__15.kind == "Err") {
            var _PUCK__value__15$val = _slicedToArray(__PUCK__value__15.value, 1),
                error = _PUCK__value__15$val[0];

            self.reportError(t, error);
          };
        } else {
          if (t.typeParameters.length > 0) {
            self.reportError(t, "Type " + _entities.Type.displayName.call(type_) + " is not generic");
          };
        };
      };
      visit.walkNamedTypeBound(self, t);
      var __PUCK__value__16 = void 0;
      if (_core.Option.isJust.call(type_._class)) {
        __PUCK__value__16 = (0, _types.createTypeInstance)(type_, _core.Iterable['$List<E>'].map.call(t.typeParameters, function (p) {
          return p.type_;
        }));
      } else {
        __PUCK__value__16 = type_;
      };
      return t.type_ = __PUCK__value__16;
    };
  },
  visitObjectTypeBound: function visitObjectTypeBound(t) {
    var self = this;
    if (!t.scope) {
      t.scope = self.scope;
      visit.walkObjectTypeBound(self, t);
      return t.type_ = (0, _types.getType)(t.scope, t);
    };
  },
  visitTupleTypeBound: function visitTupleTypeBound(t) {
    var self = this;
    if (!t.scope) {
      t.scope = self.scope;
      visit.walkTupleTypeBound(self, t);
      return t.type_ = (0, _types.getType)(t.scope, t);
    };
  },
  visitTypeParameter: function visitTypeParameter(t) {
    var self = this;
    if (!t.scope) {
      t.scope = self.scope;
      visit.walkTypeParameter(self, t);
      t.type_ = {
        displayName: _core.None,
        name: (0, _core.Some)(t.name.name),
        kind: _entities.TypeKind.Parameter({ defaultValue: _core.Option.map.call(t.defaultValue, function (typeBound) {
            return (0, _types.getType)(t.scope, typeBound);
          }) }),
        _class: _entities.TypeClass.fromAstNode.call(_entities.TypeClass, t, self.reportError),
        instance: _core.None
      };
      return self.scope.defineType(t.type_, t);
    };
  },
  visitTypePath: function visitTypePath(t) {
    var self = this;
    if (!t.scope) {
      t.scope = self.scope;
      var binding = t.scope.getTypeBinding(t.value[0].name);
      if (!binding) {
        self.reportError(t, "Use of undeclared type " + t.value[0].name);
      };
      return t.type_ = binding.type_;
    };
  },
  visitVariableDeclaration: function visitVariableDeclaration(d, visitInitializer, type_) {
    var allowNotExhaustive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    var self = this;
    if (d.scope) {
      return _js._undefined;
    };
    d.scope = self.scope;
    d.type_ = _core.Option.mapOr.call(d.typeBound, type_, function (bound) {
      self.visitTypeBound(bound);
      return (0, _types.getType)(d.scope, bound) || type_;
    });
    var patternType = _core.None;
    var __PUCK__value__17 = declarePatternVariables(d.scope, self, d.pattern, d.mutable, d.type_, allowNotExhaustive);
    var __PUCK__value__18 = __PUCK__value__17;
    if (__PUCK__value__18.kind == "Ok") {
      var _PUCK__value__18$val = _slicedToArray(__PUCK__value__18.value, 1),
          patternTy = _PUCK__value__18$val[0];

      patternType = (0, _core.Some)(patternTy);
      if (!(0, _types.isAssignable)(patternTy, d.type_)) {
        self.reportError(d, notAssignableError(patternTy, d.type_));
      };
    } else {
      var __PUCK__value__19 = __PUCK__value__17;
      if (__PUCK__value__19.kind == "Err" && __PUCK__value__19.value[0].kind == "PatternMismatch") {
        var _PUCK__value__19$val = _slicedToArray(__PUCK__value__19.value, 1),
            _PUCK__value__19$val$ = _slicedToArray(_PUCK__value__19$val[0].value, 3),
            __PUCK__value__20 = _PUCK__value__19$val$[0],
            to = _PUCK__value__19$val$[1],
            subject = _PUCK__value__19$val$[2];

        self.reportError(d, notAssignableError(to, subject));
      } else {
        var __PUCK__value__21 = __PUCK__value__17;
        if (__PUCK__value__21.kind == "Err" && __PUCK__value__21.value[0].kind == "NotExhaustive") {
          var _PUCK__value__21$val = _toArray(__PUCK__value__21.value);

          self.reportError(d, "non exhaustive pattern");
        };
      };
    };
    var __PUCK__value__22 = d.initializer;
    if (__PUCK__value__22.kind == "Some") {
      var _PUCK__value__22$val = _slicedToArray(__PUCK__value__22.value, 1),
          initializer = _PUCK__value__22$val[0];

      visitInitializer(initializer);
      if (!d.type_ && d.pattern.binding) {
        d.pattern.binding.type_ = initializer.type_;
        return d.type_ = initializer.type_;
      } else {
        if (!(0, _types.isAssignable)(d.type_, initializer.type_)) {
          return self.reportError(d, notAssignableError(d.type_, initializer.type_));
        } else {
          var __PUCK__value__23 = patternType;
          if (__PUCK__value__23.kind == "Some") {
            var _PUCK__value__23$val = _slicedToArray(__PUCK__value__23.value, 1),
                _patternTy = _PUCK__value__23$val[0];

            _patternTy = _patternTy;
            if (!(0, _types.isAssignable)(_patternTy, initializer.type_)) {
              return self.reportError(d, notAssignableError(_patternTy, initializer.type_));
            };
          };
        };
      };
    };
  },
  visitLiteral: function visitLiteral(l) {
    var self = this;
    l.scope = self.scope;
    if (l.kind == _ast2.SyntaxKind.BooleanLiteral) {
      return self.visitStrictBooleanLiteral(l);
    } else {
      if (l.kind == _ast2.SyntaxKind.ListLiteral) {
        return self.visitStrictListLiteral(l);
      } else {
        if (l.kind == _ast2.SyntaxKind.NumberLiteral) {
          return self.visitStrictNumberLiteral(l);
        } else {
          if (l.kind == _ast2.SyntaxKind.ObjectLiteral) {
            return self.visitStrictObjectLiteral(l);
          } else {
            if (l.kind == _ast2.SyntaxKind.StringLiteral) {
              return self.visitStrictStringLiteral(l);
            } else {
              return self.reportError(l, "not a literal" + (0, _util.inspect)(l));
            };
          };
        };
      };
    };
  },
  visitStrictBooleanLiteral: function visitStrictBooleanLiteral(l) {
    var self = this;
    return l.type_ = self.scope.getTypeBinding("Bool").type_;
  },
  visitStrictListLiteral: function visitStrictListLiteral(l) {
    var self = this;
    return _core.Iterable['$List<E>'].forEach.call(l.members, self.visitLiteral.bind(self));
  },
  visitStrictNumberLiteral: function visitStrictNumberLiteral(l) {
    var self = this;
    return l.type_ = self.scope.getTypeBinding("Num").type_;
  },
  visitStrictObjectLiteral: function visitStrictObjectLiteral(l) {
    var self = this;
    return _core.Iterable['$List<E>'].forEach.call(l.members, function (m) {
      return self.visitLiteral(m.value);
    });
  },
  visitStrictStringLiteral: function visitStrictStringLiteral(l) {
    var self = this;
    l.type_ = self.scope.getTypeBinding("String").type_;
    if (l.parts.some(function (p) {
      return p.kind == _ast2.SyntaxKind.Identifier;
    })) {
      return self.reportError(l, "not a literal");
    };
  },
  visitStrictTupleLiteral: function visitStrictTupleLiteral(l) {
    var self = this;
    return _core.Iterable['$List<E>'].forEach.call(l.expressions, self.visitLiteral.bind(self));
  }
};
function declarePatternVariables(scope, visitor, p, mutable, type_, allowNotExhaustive) {
  var __PUCK__value__24 = p;
  var __PUCK__value__25 = __PUCK__value__24;
  if (__PUCK__value__25.kind == "CatchAll") {
    var _undefined2 = __PUCK__value__25;
    return (0, _core.Ok)(false);
  } else {
    var __PUCK__value__26 = __PUCK__value__24;
    if (__PUCK__value__26.kind == "Identifier") {
      var _undefined3 = __PUCK__value__26;
      p.binding = scope.define({
        name: p.value[0].name,
        mutable: mutable,
        token: p,
        type_: type_
      }, true);
      return (0, _core.Ok)(false);
    } else {
      var __PUCK__value__27 = __PUCK__value__24;
      if (__PUCK__value__27.kind == "Record") {
        var _ret2 = function () {
          var _PUCK__value__27$val = _slicedToArray(__PUCK__value__27.value, 1),
              record = _PUCK__value__27$val[0];

          var __PUCK__value__28 = void 0;
          if (type_) {
            var __PUCK__value__29 = type_.kind;
            var __PUCK__value__30 = __PUCK__value__29;
            var __PUCK__value__31 = void 0;
            if (__PUCK__value__30.kind == "Struct") {
              var _PUCK__value__30$val = _slicedToArray(__PUCK__value__30.value, 1),
                  struct = _PUCK__value__30$val[0];

              var __PUCK__value__32 = struct.kind;
              var __PUCK__value__33 = __PUCK__value__32;
              var __PUCK__value__34 = void 0;
              if (__PUCK__value__33.kind == "Record") {
                var _PUCK__value__33$val = _slicedToArray(__PUCK__value__33.value, 1),
                    _record = _PUCK__value__33$val[0];

                __PUCK__value__34 = _record.properties;
              } else {
                var __PUCK__value__35 = __PUCK__value__32;
                var __PUCK__value__36 = void 0;
                if (true) {
                  var __PUCK__value__37 = __PUCK__value__35;
                  throw "bad type";
                };
                __PUCK__value__34 = __PUCK__value__36;
              };
              __PUCK__value__31 = __PUCK__value__34;
            } else {
              var __PUCK__value__38 = __PUCK__value__29;
              var __PUCK__value__39 = void 0;
              if (__PUCK__value__38.kind == "Parameter") {
                var _undefined4 = __PUCK__value__38;
                __PUCK__value__39 = {};
              } else {
                var __PUCK__value__40 = __PUCK__value__29;
                var __PUCK__value__41 = void 0;
                if (true) {
                  var __PUCK__value__42 = __PUCK__value__40;
                  throw "abd type";
                };
                __PUCK__value__39 = __PUCK__value__41;
              };
              __PUCK__value__31 = __PUCK__value__39;
            };
            __PUCK__value__28 = __PUCK__value__31;
          } else {
            __PUCK__value__28 = _core.ObjectMap._new.call(_core.ObjectMap);
          };
          var props = __PUCK__value__28;
          var properties = _core.Iterable['$List<E>'].map.call(record.properties, function (p) {
            return declarePatternVariables(scope, visitor, p.pattern, mutable, props[p.property.name], allowNotExhaustive);
          }).reduce(function (acc, cur) {
            return _core.Result.andThen.call(acc, function (props) {
              return _core.Result.map.call(cur, function (prop) {
                return props.concat(prop);
              });
            });
          }, (0, _core.Ok)([]));
          return {
            v: _core.Result.map.call(properties, function (__PUCK__value__43) {
              return false;
            })
          };
        }();

        if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
      } else {
        var __PUCK__value__44 = __PUCK__value__24;
        if (__PUCK__value__44.kind == "RecordType") {
          var _ret3 = function () {
            var _PUCK__value__44$val = _slicedToArray(__PUCK__value__44.value, 2),
                typePath = _PUCK__value__44$val[0],
                record = _PUCK__value__44$val[1];

            visitor.visitTypePath(typePath);
            var __PUCK__value__45 = void 0;
            if (type_) {
              __PUCK__value__45 = type_;
            } else {
              __PUCK__value__45 = typePath.type_;
            };
            var recordType = __PUCK__value__45;
            var __PUCK__value__46 = recordType.kind;
            var __PUCK__value__47 = __PUCK__value__46;
            var __PUCK__value__48 = void 0;
            if (__PUCK__value__47.kind == "Enum") {
              var _PUCK__value__47$val = _slicedToArray(__PUCK__value__47.value, 1),
                  enum_ = _PUCK__value__47$val[0];

              var member = (0, _enums.getEnumMember)(typePath);
              var enumArmType = enum_.members[member];
              __PUCK__value__48 = enumArmType;
            } else {
              var __PUCK__value__49 = __PUCK__value__46;
              var __PUCK__value__50 = void 0;
              if (true) {
                var __PUCK__value__51 = __PUCK__value__49;
                __PUCK__value__50 = recordType;
              };
              __PUCK__value__48 = __PUCK__value__50;
            };
            recordType = __PUCK__value__48;
            var __PUCK__value__52 = recordType.kind;
            var __PUCK__value__53 = __PUCK__value__52;
            var __PUCK__value__54 = void 0;
            if (__PUCK__value__53.kind == "Struct") {
              var _PUCK__value__53$val = _slicedToArray(__PUCK__value__53.value, 1),
                  struct = _PUCK__value__53$val[0];

              var __PUCK__value__55 = struct.kind;
              var __PUCK__value__56 = __PUCK__value__55;
              var __PUCK__value__57 = void 0;
              if (__PUCK__value__56.kind == "Record") {
                var _PUCK__value__56$val = _slicedToArray(__PUCK__value__56.value, 1),
                    _record2 = _PUCK__value__56$val[0];

                __PUCK__value__57 = _record2.properties;
              } else {
                var __PUCK__value__58 = __PUCK__value__55;
                var __PUCK__value__59 = void 0;
                if (true) {
                  var __PUCK__value__60 = __PUCK__value__58;
                  throw "bad type";
                };
                __PUCK__value__57 = __PUCK__value__59;
              };
              __PUCK__value__54 = __PUCK__value__57;
            } else {
              var __PUCK__value__61 = __PUCK__value__52;
              var __PUCK__value__62 = void 0;
              if (__PUCK__value__61.kind == "Parameter") {
                var _undefined5 = __PUCK__value__61;
                __PUCK__value__62 = {};
              } else {
                var __PUCK__value__63 = __PUCK__value__52;
                var __PUCK__value__64 = void 0;
                if (true) {
                  var __PUCK__value__65 = __PUCK__value__63;
                  throw "abd type";
                };
                __PUCK__value__62 = __PUCK__value__64;
              };
              __PUCK__value__54 = __PUCK__value__62;
            };
            var props = __PUCK__value__54;
            var properties = _core.Iterable['$List<E>'].map.call(record.properties, function (p) {
              return declarePatternVariables(scope, visitor, p.pattern, mutable, props[p.property.name], allowNotExhaustive);
            }).reduce(function (acc, cur) {
              return _core.Result.andThen.call(acc, function (props) {
                return _core.Result.map.call(cur, function (prop) {
                  return props.concat(prop);
                });
              });
            }, (0, _core.Ok)([]));
            return {
              v: _core.Result.map.call(properties, function (__PUCK__value__66) {
                return p.value[0].type_;
              })
            };
          }();

          if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
        } else {
          var __PUCK__value__67 = __PUCK__value__24;
          if (__PUCK__value__67.kind == "Tuple") {
            var _ret4 = function () {
              var _PUCK__value__67$val = _slicedToArray(__PUCK__value__67.value, 1),
                  tuple = _PUCK__value__67$val[0];

              var __PUCK__value__68 = void 0;
              if (type_) {
                var __PUCK__value__69 = type_.kind;
                var __PUCK__value__70 = __PUCK__value__69;
                var __PUCK__value__71 = void 0;
                if (__PUCK__value__70.kind == "Struct") {
                  var _PUCK__value__70$val = _slicedToArray(__PUCK__value__70.value, 1),
                      struct = _PUCK__value__70$val[0];

                  var __PUCK__value__72 = struct.kind;
                  var __PUCK__value__73 = __PUCK__value__72;
                  var __PUCK__value__74 = void 0;
                  if (__PUCK__value__73.kind == "Tuple") {
                    var _PUCK__value__73$val = _slicedToArray(__PUCK__value__73.value, 1),
                        _tuple = _PUCK__value__73$val[0];

                    __PUCK__value__74 = _tuple.properties;
                  } else {
                    var __PUCK__value__75 = __PUCK__value__72;
                    var __PUCK__value__76 = void 0;
                    if (true) {
                      var __PUCK__value__77 = __PUCK__value__75;
                      throw "bad type t";
                    };
                    __PUCK__value__74 = __PUCK__value__76;
                  };
                  __PUCK__value__71 = __PUCK__value__74;
                } else {
                  var __PUCK__value__78 = __PUCK__value__69;
                  var __PUCK__value__79 = void 0;
                  if (__PUCK__value__78.kind == "Parameter") {
                    var _undefined6 = __PUCK__value__78;
                    __PUCK__value__79 = [];
                  } else {
                    var __PUCK__value__80 = __PUCK__value__69;
                    var __PUCK__value__81 = void 0;
                    if (true) {
                      var __PUCK__value__82 = __PUCK__value__80;
                      throw "abd type t";
                    };
                    __PUCK__value__79 = __PUCK__value__81;
                  };
                  __PUCK__value__71 = __PUCK__value__79;
                };
                __PUCK__value__68 = __PUCK__value__71;
              } else {
                __PUCK__value__68 = [];
              };
              var props = __PUCK__value__68;
              var properties = _core.Iterable['$List<E>'].map.call(_core.Iterable['$List<E>'].enumerate.call(tuple.properties), function (_ref4) {
                var _ref5 = _slicedToArray(_ref4, 2),
                    p = _ref5[0],
                    i = _ref5[1];

                return declarePatternVariables(scope, visitor, p, mutable, props[i], allowNotExhaustive);
              }).reduce(function (acc, cur) {
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
            var __PUCK__value__83 = __PUCK__value__24;
            if (__PUCK__value__83.kind == "TupleType") {
              var _ret5 = function () {
                var _PUCK__value__83$val = _slicedToArray(__PUCK__value__83.value, 2),
                    typePath = _PUCK__value__83$val[0],
                    tuple = _PUCK__value__83$val[1];

                visitor.visitTypePath(typePath);
                var __PUCK__value__84 = void 0;
                if (type_) {
                  __PUCK__value__84 = type_;
                } else {
                  __PUCK__value__84 = typePath.type_;
                };
                var tupleType = __PUCK__value__84;
                var __PUCK__value__85 = void 0;
                if ((0, _types.isAssignable)(typePath.type_, tupleType)) {
                  __PUCK__value__85 = tupleType;
                } else {
                  __PUCK__value__85 = typePath.type_;
                };
                var typePathType = __PUCK__value__85;
                var __PUCK__value__86 = typePathType.kind;
                var __PUCK__value__87 = __PUCK__value__86;
                var __PUCK__value__88 = void 0;
                if (__PUCK__value__87.kind == "Enum") {
                  var _PUCK__value__87$val = _slicedToArray(__PUCK__value__87.value, 1),
                      enum_ = _PUCK__value__87$val[0];

                  var member = (0, _enums.getEnumMember)(typePath);
                  var enumArmType = enum_.members[member];
                  __PUCK__value__88 = enumArmType;
                } else {
                  var __PUCK__value__89 = __PUCK__value__86;
                  var __PUCK__value__90 = void 0;
                  if (true) {
                    var __PUCK__value__91 = __PUCK__value__89;
                    __PUCK__value__90 = tupleType;
                  };
                  __PUCK__value__88 = __PUCK__value__90;
                };
                tupleType = __PUCK__value__88;
                var __PUCK__value__92 = tupleType.kind;
                var __PUCK__value__93 = __PUCK__value__92;
                var __PUCK__value__94 = void 0;
                if (__PUCK__value__93.kind == "Struct") {
                  var _PUCK__value__93$val = _slicedToArray(__PUCK__value__93.value, 1),
                      struct = _PUCK__value__93$val[0];

                  var __PUCK__value__95 = struct.kind;
                  var __PUCK__value__96 = __PUCK__value__95;
                  var __PUCK__value__97 = void 0;
                  if (__PUCK__value__96.kind == "Tuple") {
                    var _PUCK__value__96$val = _slicedToArray(__PUCK__value__96.value, 1),
                        _tuple2 = _PUCK__value__96$val[0];

                    __PUCK__value__97 = _tuple2.properties;
                  } else {
                    var __PUCK__value__98 = __PUCK__value__95;
                    var __PUCK__value__99 = void 0;
                    if (true) {
                      var __PUCK__value__100 = __PUCK__value__98;
                      throw "bad type t";
                    };
                    __PUCK__value__97 = __PUCK__value__99;
                  };
                  __PUCK__value__94 = __PUCK__value__97;
                } else {
                  var __PUCK__value__101 = __PUCK__value__92;
                  var __PUCK__value__102 = void 0;
                  if (__PUCK__value__101.kind == "Parameter") {
                    var _undefined7 = __PUCK__value__101;
                    __PUCK__value__102 = [];
                  } else {
                    var __PUCK__value__103 = __PUCK__value__92;
                    var __PUCK__value__104 = void 0;
                    if (true) {
                      var __PUCK__value__105 = __PUCK__value__103;
                      throw "abd type t";
                    };
                    __PUCK__value__102 = __PUCK__value__104;
                  };
                  __PUCK__value__94 = __PUCK__value__102;
                };
                var props = __PUCK__value__94;
                var properties = _core.Iterable['$List<E>'].map.call(_core.Iterable['$List<E>'].enumerate.call(tuple.properties), function (_ref6) {
                  var _ref7 = _slicedToArray(_ref6, 2),
                      p = _ref7[0],
                      i = _ref7[1];

                  return declarePatternVariables(scope, visitor, p, mutable, props[i], allowNotExhaustive);
                }).reduce(function (acc, cur) {
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
                    var __PUCK__value__106 = typePath.type_.kind;
                    if (__PUCK__value__106.kind == "Enum") {
                      var _PUCK__value__106$va = _slicedToArray(__PUCK__value__106.value, 1),
                          enumType = _PUCK__value__106$va[0];

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
              var __PUCK__value__107 = __PUCK__value__24;
              if (__PUCK__value__107.kind == "UnitType") {
                var _PUCK__value__107$va = _slicedToArray(__PUCK__value__107.value, 1),
                    typePath = _PUCK__value__107$va[0];

                visitor.visitTypePath(typePath);
                return (0, _core.Ok)(false);
              };
            };
          };
        };
      };
    };
  };
}
