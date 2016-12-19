#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.structureVisitor = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.notAssignableError = notAssignableError;
exports.declarePatternVariables = declarePatternVariables;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _util = require('util');

var _ast = require('./../../ast/ast.js');

var _visit = require('./../../ast/visit.js');

var visit = _interopRequireWildcard(_visit);

var _ast2 = require('./../../compiler/ast.js');

var _entities = require('./../../entities.js');

var _enums = require('./enums.js');

var _functions = require('./functions.js');

var _range = require('./range.js');

var _types = require('./types.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function notAssignableError(to, subject) {
  return _entities.TypeTrait['$Type'].displayName.call(subject) + " is not assignable to type " + _entities.TypeTrait['$Type'].displayName.call(to);
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
            var _PUCK__value__2$valu = _slicedToArray(__PUCK__value__2.value, 1);

            var func = _PUCK__value__2$valu[0];

            __PUCK__value__3 = func;
          };
          __PUCK__value__1 = __PUCK__value__3;
        };
        var assignedTo = __PUCK__value__1;
        if (f.typeParameters) {
          f.typeParameters.forEach(self.visitTypeParameter.bind(self));
        };
        f.parameterList.forEach(function (p, i) {
          var __PUCK__value__4 = void 0;
          if (assignedTo && assignedTo._arguments[i]) {
            __PUCK__value__4 = assignedTo._arguments[i].type_;
          };
          var type_ = __PUCK__value__4;
          return self.visitFunctionParameter(p, type_);
        });
        var __PUCK__value__5 = f.returnType;
        if (__PUCK__value__5.kind == "Some") {
          var _PUCK__value__5$valu = _slicedToArray(__PUCK__value__5.value, 1);

          var returnType = _PUCK__value__5$valu[0];

          self.visitTypeBound(returnType);
        };
        f.type_ = (0, _functions.createFunctionType)(f.scope, f, self.reportError);
        var __PUCK__value__6 = f.name;
        if (__PUCK__value__6.kind == "Some") {
          var _PUCK__value__6$valu = _slicedToArray(__PUCK__value__6.value, 1);

          var name = _PUCK__value__6$valu[0];

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
      var __PUCK__value__7 = type_._class;
      if (__PUCK__value__7.kind == "Some") {
        var _PUCK__value__7$valu = _slicedToArray(__PUCK__value__7.value, 1);

        var _class = _PUCK__value__7$valu[0];

        var __PUCK__value__8 = (0, _range.checkRange)(t.typeParameters, _class.parameterRange, "type parameters", _entities.TypeTrait['$Type'].displayName.call(type_));
        if (__PUCK__value__8.kind == "Err") {
          var _PUCK__value__8$valu = _slicedToArray(__PUCK__value__8.value, 1);

          var error = _PUCK__value__8$valu[0];

          self.reportError(t, error);
        };
      } else {
        if (t.typeParameters.length > 0) {
          self.reportError(t, "Type " + _entities.TypeTrait['$Type'].displayName.call(type_) + " is not generic");
        };
      };
      visit.walkNamedTypeBound(self, t);
      var __PUCK__value__9 = type_._class;
      var __PUCK__value__10 = void 0;
      if (__PUCK__value__9.kind == "Some") {
        var _PUCK__value__9$valu = _slicedToArray(__PUCK__value__9.value, 1);

        var __PUCK__value__11 = _PUCK__value__9$valu[0];

        __PUCK__value__10 = (0, _types.createTypeInstance)(type_, _core.Iterable['$List'].map.call(t.typeParameters, function (p) {
          return p.type_;
        }));
      } else {
        __PUCK__value__10 = type_;
      };
      return t.type_ = __PUCK__value__10;
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
        kind: _entities.TypeKind.Parameter({ defaultValue: _core.MaybeTrait['$Option'].map.call(t.defaultValue, function (typeBound) {
            return (0, _types.getType)(t.scope, typeBound);
          }) }),
        _class: _entities.TypeClassTrait.fromAstNode(t, self.reportError),
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
    var allowNotExhaustive = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

    var self = this;
    if (d.scope) {
      return _js._undefined;
    };
    d.scope = self.scope;
    d.type_ = _core.MaybeTrait['$Option'].mapOr.call(d.typeBound, type_, function (bound) {
      self.visitTypeBound(bound);
      return (0, _types.getType)(d.scope, bound) || type_;
    });
    var patternType = _core.None;
    var __PUCK__value__12 = declarePatternVariables(d.scope, self, d.pattern, d.mutable, d.type_, allowNotExhaustive);
    var __PUCK__value__13 = __PUCK__value__12;
    if (__PUCK__value__13.kind == "Ok") {
      var _PUCK__value__13$val = _slicedToArray(__PUCK__value__13.value, 1);

      var patternTy = _PUCK__value__13$val[0];

      patternType = (0, _core.Some)(patternTy);
      if (!(0, _types.isAssignable)(patternTy, d.type_)) {
        self.reportError(d, notAssignableError(patternTy, d.type_));
      };
    } else {
      var __PUCK__value__14 = __PUCK__value__12;
      if (__PUCK__value__14.kind == "Err" && __PUCK__value__14.value[0].kind == "PatternMismatch") {
        var _PUCK__value__14$val = _slicedToArray(__PUCK__value__14.value, 1);

        var _PUCK__value__14$val$ = _slicedToArray(_PUCK__value__14$val[0].value, 3);

        var __PUCK__value__15 = _PUCK__value__14$val$[0];
        var to = _PUCK__value__14$val$[1];
        var subject = _PUCK__value__14$val$[2];

        self.reportError(d, notAssignableError(to, subject));
      } else {
        var __PUCK__value__16 = __PUCK__value__12;
        if (__PUCK__value__16.kind == "Err" && __PUCK__value__16.value[0].kind == "NotExhaustive") {
          var _PUCK__value__16$val = _toArray(__PUCK__value__16.value);

          self.reportError(d, "non exhaustive pattern");
        };
      };
    };
    var __PUCK__value__17 = d.initializer;
    if (__PUCK__value__17.kind == "Some") {
      var _PUCK__value__17$val = _slicedToArray(__PUCK__value__17.value, 1);

      var initializer = _PUCK__value__17$val[0];

      visitInitializer(initializer);
      if (!d.type_ && d.pattern.binding) {
        d.pattern.binding.type_ = initializer.type_;
        return d.type_ = initializer.type_;
      } else {
        if (!(0, _types.isAssignable)(d.type_, initializer.type_)) {
          return self.reportError(d, notAssignableError(d.type_, initializer.type_));
        } else {
          var __PUCK__value__18 = patternType;
          if (__PUCK__value__18.kind == "Some") {
            var _PUCK__value__18$val = _slicedToArray(__PUCK__value__18.value, 1);

            var _patternTy = _PUCK__value__18$val[0];

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
    return l.members.forEach(self.visitLiteral.bind(self));
  },
  visitStrictNumberLiteral: function visitStrictNumberLiteral(l) {
    var self = this;
    return l.type_ = self.scope.getTypeBinding("Num").type_;
  },
  visitStrictObjectLiteral: function visitStrictObjectLiteral(l) {
    var self = this;
    return l.members.forEach(function (m) {
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
    return l.expressions.forEach(self.visitLiteral.bind(self));
  }
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
function declarePatternVariables(scope, visitor, p, mutable, type_, allowNotExhaustive) {
  var __PUCK__value__19 = p;
  var __PUCK__value__20 = __PUCK__value__19;
  if (__PUCK__value__20.kind == "CatchAll") {
    var _undefined2 = __PUCK__value__20;
    return (0, _core.Ok)(false);
  } else {
    var __PUCK__value__21 = __PUCK__value__19;
    if (__PUCK__value__21.kind == "Identifier") {
      var _undefined3 = __PUCK__value__21;
      p.binding = scope.define({
        name: p.value[0].name,
        mutable: mutable,
        token: p,
        type_: type_
      }, true);
      return (0, _core.Ok)(false);
    } else {
      var __PUCK__value__22 = __PUCK__value__19;
      if (__PUCK__value__22.kind == "Record") {
        var _ret2 = function () {
          var _PUCK__value__22$val = _slicedToArray(__PUCK__value__22.value, 1);

          var record = _PUCK__value__22$val[0];

          var __PUCK__value__23 = void 0;
          if (type_) {
            var __PUCK__value__24 = type_.kind;
            var __PUCK__value__25 = __PUCK__value__24;
            var __PUCK__value__26 = void 0;
            if (__PUCK__value__25.kind == "Struct") {
              var _PUCK__value__25$val = _slicedToArray(__PUCK__value__25.value, 1);

              var struct = _PUCK__value__25$val[0];

              var __PUCK__value__27 = struct.kind;
              var __PUCK__value__28 = __PUCK__value__27;
              var __PUCK__value__29 = void 0;
              if (__PUCK__value__28.kind == "Record") {
                var _PUCK__value__28$val = _slicedToArray(__PUCK__value__28.value, 1);

                var _record = _PUCK__value__28$val[0];

                __PUCK__value__29 = _record.properties;
              } else {
                var __PUCK__value__30 = __PUCK__value__27;
                var __PUCK__value__31 = void 0;
                if (true) {
                  var __PUCK__value__32 = __PUCK__value__30;
                  throw "bad type";
                };
                __PUCK__value__29 = __PUCK__value__31;
              };
              __PUCK__value__26 = __PUCK__value__29;
            } else {
              var __PUCK__value__33 = __PUCK__value__24;
              var __PUCK__value__34 = void 0;
              if (__PUCK__value__33.kind == "Parameter") {
                var _undefined4 = __PUCK__value__33;
                __PUCK__value__34 = {};
              } else {
                var __PUCK__value__35 = __PUCK__value__24;
                var __PUCK__value__36 = void 0;
                if (true) {
                  var __PUCK__value__37 = __PUCK__value__35;
                  throw "abd type";
                };
                __PUCK__value__34 = __PUCK__value__36;
              };
              __PUCK__value__26 = __PUCK__value__34;
            };
            __PUCK__value__23 = __PUCK__value__26;
          } else {
            __PUCK__value__23 = _core.ObjectMapTrait._new();
          };
          var props = __PUCK__value__23;
          var properties = _core.Iterable['$List'].map.call(record.properties, function (p) {
            return declarePatternVariables(scope, visitor, p.pattern, mutable, props[p.property.name], allowNotExhaustive);
          }).reduce(function (acc, cur) {
            return _core.ResultTrait['$Result'].andThen.call(acc, function (props) {
              return _core.ResultTrait['$Result'].map.call(cur, function (prop) {
                return props.concat(prop);
              });
            });
          }, (0, _core.Ok)([]));
          return {
            v: _core.ResultTrait['$Result'].map.call(properties, function (__PUCK__value__38) {
              return false;
            })
          };
        }();

        if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
      } else {
        var __PUCK__value__39 = __PUCK__value__19;
        if (__PUCK__value__39.kind == "RecordType") {
          var _ret3 = function () {
            var _PUCK__value__39$val = _slicedToArray(__PUCK__value__39.value, 2);

            var typePath = _PUCK__value__39$val[0];
            var record = _PUCK__value__39$val[1];

            visitor.visitTypePath(typePath);
            var __PUCK__value__40 = void 0;
            if (type_) {
              __PUCK__value__40 = type_;
            } else {
              __PUCK__value__40 = typePath.type_;
            };
            var recordType = __PUCK__value__40;
            var __PUCK__value__41 = recordType.kind;
            var __PUCK__value__42 = __PUCK__value__41;
            var __PUCK__value__43 = void 0;
            if (__PUCK__value__42.kind == "Enum") {
              var _PUCK__value__42$val = _slicedToArray(__PUCK__value__42.value, 1);

              var enum_ = _PUCK__value__42$val[0];

              var member = (0, _enums.getEnumMember)(typePath);
              var enumArmType = enum_.members[member];
              __PUCK__value__43 = enumArmType;
            } else {
              var __PUCK__value__44 = __PUCK__value__41;
              var __PUCK__value__45 = void 0;
              if (true) {
                var __PUCK__value__46 = __PUCK__value__44;
                __PUCK__value__45 = recordType;
              };
              __PUCK__value__43 = __PUCK__value__45;
            };
            recordType = __PUCK__value__43;
            var __PUCK__value__47 = recordType.kind;
            var __PUCK__value__48 = __PUCK__value__47;
            var __PUCK__value__49 = void 0;
            if (__PUCK__value__48.kind == "Struct") {
              var _PUCK__value__48$val = _slicedToArray(__PUCK__value__48.value, 1);

              var struct = _PUCK__value__48$val[0];

              var __PUCK__value__50 = struct.kind;
              var __PUCK__value__51 = __PUCK__value__50;
              var __PUCK__value__52 = void 0;
              if (__PUCK__value__51.kind == "Record") {
                var _PUCK__value__51$val = _slicedToArray(__PUCK__value__51.value, 1);

                var _record2 = _PUCK__value__51$val[0];

                __PUCK__value__52 = _record2.properties;
              } else {
                var __PUCK__value__53 = __PUCK__value__50;
                var __PUCK__value__54 = void 0;
                if (true) {
                  var __PUCK__value__55 = __PUCK__value__53;
                  throw "bad type";
                };
                __PUCK__value__52 = __PUCK__value__54;
              };
              __PUCK__value__49 = __PUCK__value__52;
            } else {
              var __PUCK__value__56 = __PUCK__value__47;
              var __PUCK__value__57 = void 0;
              if (__PUCK__value__56.kind == "Parameter") {
                var _undefined5 = __PUCK__value__56;
                __PUCK__value__57 = {};
              } else {
                var __PUCK__value__58 = __PUCK__value__47;
                var __PUCK__value__59 = void 0;
                if (true) {
                  var __PUCK__value__60 = __PUCK__value__58;
                  throw "abd type";
                };
                __PUCK__value__57 = __PUCK__value__59;
              };
              __PUCK__value__49 = __PUCK__value__57;
            };
            var props = __PUCK__value__49;
            var properties = _core.Iterable['$List'].map.call(record.properties, function (p) {
              return declarePatternVariables(scope, visitor, p.pattern, mutable, props[p.property.name], allowNotExhaustive);
            }).reduce(function (acc, cur) {
              return _core.ResultTrait['$Result'].andThen.call(acc, function (props) {
                return _core.ResultTrait['$Result'].map.call(cur, function (prop) {
                  return props.concat(prop);
                });
              });
            }, (0, _core.Ok)([]));
            return {
              v: _core.ResultTrait['$Result'].map.call(properties, function (__PUCK__value__61) {
                return p.value[0].type_;
              })
            };
          }();

          if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
        } else {
          var __PUCK__value__62 = __PUCK__value__19;
          if (__PUCK__value__62.kind == "Tuple") {
            var _ret4 = function () {
              var _PUCK__value__62$val = _slicedToArray(__PUCK__value__62.value, 1);

              var tuple = _PUCK__value__62$val[0];

              var __PUCK__value__63 = void 0;
              if (type_) {
                var __PUCK__value__64 = type_.kind;
                var __PUCK__value__65 = __PUCK__value__64;
                var __PUCK__value__66 = void 0;
                if (__PUCK__value__65.kind == "Struct") {
                  var _PUCK__value__65$val = _slicedToArray(__PUCK__value__65.value, 1);

                  var struct = _PUCK__value__65$val[0];

                  var __PUCK__value__67 = struct.kind;
                  var __PUCK__value__68 = __PUCK__value__67;
                  var __PUCK__value__69 = void 0;
                  if (__PUCK__value__68.kind == "Tuple") {
                    var _PUCK__value__68$val = _slicedToArray(__PUCK__value__68.value, 1);

                    var _tuple = _PUCK__value__68$val[0];

                    __PUCK__value__69 = _tuple.properties;
                  } else {
                    var __PUCK__value__70 = __PUCK__value__67;
                    var __PUCK__value__71 = void 0;
                    if (true) {
                      var __PUCK__value__72 = __PUCK__value__70;
                      throw "bad type t";
                    };
                    __PUCK__value__69 = __PUCK__value__71;
                  };
                  __PUCK__value__66 = __PUCK__value__69;
                } else {
                  var __PUCK__value__73 = __PUCK__value__64;
                  var __PUCK__value__74 = void 0;
                  if (__PUCK__value__73.kind == "Parameter") {
                    var _undefined6 = __PUCK__value__73;
                    __PUCK__value__74 = [];
                  } else {
                    var __PUCK__value__75 = __PUCK__value__64;
                    var __PUCK__value__76 = void 0;
                    if (true) {
                      var __PUCK__value__77 = __PUCK__value__75;
                      throw "abd type t";
                    };
                    __PUCK__value__74 = __PUCK__value__76;
                  };
                  __PUCK__value__66 = __PUCK__value__74;
                };
                __PUCK__value__63 = __PUCK__value__66;
              } else {
                __PUCK__value__63 = [];
              };
              var props = __PUCK__value__63;
              var properties = _core.Iterable['$List'].map.call(_core.Iterable['$List'].enumerate.call(tuple.properties), function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2);

                var p = _ref2[0];
                var i = _ref2[1];

                return declarePatternVariables(scope, visitor, p, mutable, props[i], allowNotExhaustive);
              }).reduce(function (acc, cur) {
                return _core.ResultTrait['$Result'].andThen.call(acc, function (props) {
                  return _core.ResultTrait['$Result'].map.call(cur, function (prop) {
                    return props.concat(prop);
                  });
                });
              }, (0, _core.Ok)([]));
              return {
                v: _core.ResultTrait['$Result'].map.call(properties, function (properties) {
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
            var __PUCK__value__78 = __PUCK__value__19;
            if (__PUCK__value__78.kind == "TupleType") {
              var _ret5 = function () {
                var _PUCK__value__78$val = _slicedToArray(__PUCK__value__78.value, 2);

                var typePath = _PUCK__value__78$val[0];
                var tuple = _PUCK__value__78$val[1];

                visitor.visitTypePath(typePath);
                var __PUCK__value__79 = void 0;
                if (type_) {
                  __PUCK__value__79 = type_;
                } else {
                  __PUCK__value__79 = typePath.type_;
                };
                var tupleType = __PUCK__value__79;
                var __PUCK__value__80 = void 0;
                if ((0, _types.isAssignable)(typePath.type_, tupleType)) {
                  __PUCK__value__80 = tupleType;
                } else {
                  __PUCK__value__80 = typePath.type_;
                };
                var typePathType = __PUCK__value__80;
                var __PUCK__value__81 = typePathType.kind;
                var __PUCK__value__82 = __PUCK__value__81;
                var __PUCK__value__83 = void 0;
                if (__PUCK__value__82.kind == "Enum") {
                  var _PUCK__value__82$val = _slicedToArray(__PUCK__value__82.value, 1);

                  var enum_ = _PUCK__value__82$val[0];

                  var member = (0, _enums.getEnumMember)(typePath);
                  var enumArmType = enum_.members[member];
                  __PUCK__value__83 = enumArmType;
                } else {
                  var __PUCK__value__84 = __PUCK__value__81;
                  var __PUCK__value__85 = void 0;
                  if (true) {
                    var __PUCK__value__86 = __PUCK__value__84;
                    __PUCK__value__85 = tupleType;
                  };
                  __PUCK__value__83 = __PUCK__value__85;
                };
                tupleType = __PUCK__value__83;
                var __PUCK__value__87 = tupleType.kind;
                var __PUCK__value__88 = __PUCK__value__87;
                var __PUCK__value__89 = void 0;
                if (__PUCK__value__88.kind == "Struct") {
                  var _PUCK__value__88$val = _slicedToArray(__PUCK__value__88.value, 1);

                  var struct = _PUCK__value__88$val[0];

                  var __PUCK__value__90 = struct.kind;
                  var __PUCK__value__91 = __PUCK__value__90;
                  var __PUCK__value__92 = void 0;
                  if (__PUCK__value__91.kind == "Tuple") {
                    var _PUCK__value__91$val = _slicedToArray(__PUCK__value__91.value, 1);

                    var _tuple2 = _PUCK__value__91$val[0];

                    __PUCK__value__92 = _tuple2.properties;
                  } else {
                    var __PUCK__value__93 = __PUCK__value__90;
                    var __PUCK__value__94 = void 0;
                    if (true) {
                      var __PUCK__value__95 = __PUCK__value__93;
                      throw "bad type t";
                    };
                    __PUCK__value__92 = __PUCK__value__94;
                  };
                  __PUCK__value__89 = __PUCK__value__92;
                } else {
                  var __PUCK__value__96 = __PUCK__value__87;
                  var __PUCK__value__97 = void 0;
                  if (__PUCK__value__96.kind == "Parameter") {
                    var _undefined7 = __PUCK__value__96;
                    __PUCK__value__97 = [];
                  } else {
                    var __PUCK__value__98 = __PUCK__value__87;
                    var __PUCK__value__99 = void 0;
                    if (true) {
                      var __PUCK__value__100 = __PUCK__value__98;
                      throw "abd type t";
                    };
                    __PUCK__value__97 = __PUCK__value__99;
                  };
                  __PUCK__value__89 = __PUCK__value__97;
                };
                var props = __PUCK__value__89;
                var properties = _core.Iterable['$List'].map.call(_core.Iterable['$List'].enumerate.call(tuple.properties), function (_ref3) {
                  var _ref4 = _slicedToArray(_ref3, 2);

                  var p = _ref4[0];
                  var i = _ref4[1];

                  return declarePatternVariables(scope, visitor, p, mutable, props[i], allowNotExhaustive);
                }).reduce(function (acc, cur) {
                  return _core.ResultTrait['$Result'].andThen.call(acc, function (props) {
                    return _core.ResultTrait['$Result'].map.call(cur, function (prop) {
                      return props.concat(prop);
                    });
                  });
                }, (0, _core.Ok)([]));
                return {
                  v: _core.ResultTrait['$Result'].andThen.call(properties, function (properties) {
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
                    var __PUCK__value__101 = typePath.type_.kind;
                    if (__PUCK__value__101.kind == "Enum") {
                      var _PUCK__value__101$va = _slicedToArray(__PUCK__value__101.value, 1);

                      var enumType = _PUCK__value__101$va[0];

                      if (!allowNotExhaustive && _js._Object.keys(enumType.members).length > 1) {
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
              var __PUCK__value__102 = __PUCK__value__19;
              if (__PUCK__value__102.kind == "UnitType") {
                var _PUCK__value__102$va = _slicedToArray(__PUCK__value__102.value, 1);

                var _typePath = _PUCK__value__102$va[0];

                visitor.visitTypePath(_typePath);
                return (0, _core.Ok)(false);
              };
            };
          };
        };
      };
    };
  };
}
