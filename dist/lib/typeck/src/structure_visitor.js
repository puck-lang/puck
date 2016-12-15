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

var _functions = require('./functions.js');

var _range = require('./range.js');

var _types = require('./types.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function notAssignableError(to, subject) {
  return subject.name + " is not assignable to type " + to.name;
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
        if (self.assignedTo) {
          __PUCK__value__1 = self.assignedTo.type_;
        };
        var assignedTo = __PUCK__value__1;
        if (f.typeParameters) {
          f.typeParameters.forEach(self.visitTypeParameter.bind(self));
        };
        f.parameterList.forEach(function (p, i) {
          var __PUCK__value__2 = void 0;
          if (assignedTo) {
            __PUCK__value__2 = assignedTo._arguments[i].type_;
          };
          var type_ = __PUCK__value__2;
          return self.visitFunctionParameter(p, type_);
        });
        var __PUCK__value__3 = f.returnType;
        if (__PUCK__value__3.kind == "Some") {
          var _PUCK__value__3$valu = _slicedToArray(__PUCK__value__3.value, 1);

          var returnType = _PUCK__value__3$valu[0];

          self.visitTypeBound(returnType);
        };
        f.type_ = (0, _functions.createFunctionType)(f.scope, f, self.reportError);
        var __PUCK__value__4 = f.name;
        if (__PUCK__value__4.kind == "Some") {
          var _PUCK__value__4$valu = _slicedToArray(__PUCK__value__4.value, 1);

          var name = _PUCK__value__4$valu[0];

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
      if ((0, _entities.isTypeClass)(t.path.type_)) {
        var __PUCK__value__5 = (0, _range.checkRange)(t.typeParameters, t.path.type_.parameterRange, "type parameters", t.path.type_.name);
        if (__PUCK__value__5.kind == "Err") {
          var _PUCK__value__5$valu = _slicedToArray(__PUCK__value__5.value, 1);

          var error = _PUCK__value__5$valu[0];

          self.reportError(t, error);
        };
      } else {
        if (t.typeParameters.length > 0) {
          self.reportError(t, "Type " + t.path.type_.name + " is not generic");
        };
      };
      visit.walkNamedTypeBound(self, t);
      var __PUCK__value__6 = void 0;
      if ((0, _entities.isTypeClass)(t.path.type_)) {
        __PUCK__value__6 = (0, _types.createTypeInstanceTypeCast)(t.path.type_, t.typeParameters.map(function (p) {
          return p.type_;
        }));
      } else {
        __PUCK__value__6 = t.path.type_;
      };
      return t.type_ = __PUCK__value__6;
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
      var binding = self.scope.defineType(t);
      return t.type_ = binding.type_;
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
    var __PUCK__value__7 = declarePatternVariables(d.scope, self, d.pattern, d.mutable, d.type_, allowNotExhaustive);
    var __PUCK__value__8 = __PUCK__value__7;
    if (__PUCK__value__8.kind == "Ok") {
      var _PUCK__value__8$valu = _slicedToArray(__PUCK__value__8.value, 1);

      var patternTy = _PUCK__value__8$valu[0];

      if (patternTy) {
        if (!d.type_) {
          d.type_ = patternTy;
        } else {
          if (!(0, _types.isAssignable)(patternTy, d.type_)) {
            self.reportError(d, notAssignableError(patternTy, d.type_));
          };
        };
      };
    } else {
      var __PUCK__value__9 = __PUCK__value__7;
      if (__PUCK__value__9.kind == "Err" && __PUCK__value__9.value[0].kind == "PatternMismatch") {
        var _PUCK__value__9$valu = _slicedToArray(__PUCK__value__9.value, 1);

        var _PUCK__value__9$valu$ = _slicedToArray(_PUCK__value__9$valu[0].value, 3);

        var __PUCK__value__10 = _PUCK__value__9$valu$[0];
        var to = _PUCK__value__9$valu$[1];
        var subject = _PUCK__value__9$valu$[2];

        self.reportError(d, notAssignableError(to, subject));
      } else {
        var __PUCK__value__11 = __PUCK__value__7;
        if (__PUCK__value__11.kind == "Err" && __PUCK__value__11.value[0].kind == "NotExhaustive") {
          var _PUCK__value__11$val = _toArray(__PUCK__value__11.value);

          self.reportError(d, "non exhaustive pattern");
        };
      };
    };
    var __PUCK__value__12 = d.initializer;
    if (__PUCK__value__12.kind == "Some") {
      var _PUCK__value__12$val = _slicedToArray(__PUCK__value__12.value, 1);

      var initializer = _PUCK__value__12$val[0];

      visitInitializer(initializer);
      if (!d.type_ && d.pattern.binding) {
        d.pattern.binding.type_ = initializer.type_;
        return d.type_ = initializer.type_;
      } else {
        if (!(0, _types.isAssignable)(d.type_, initializer.type_)) {
          return self.reportError(d, notAssignableError(d.type_, initializer.type_));
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
  var __PUCK__value__13 = p;
  var __PUCK__value__14 = __PUCK__value__13;
  if (__PUCK__value__14.kind == "CatchAll") {
    var _undefined2 = __PUCK__value__14;
    return (0, _core.Ok)(false);
  } else {
    var __PUCK__value__15 = __PUCK__value__13;
    if (__PUCK__value__15.kind == "Identifier") {
      var _undefined3 = __PUCK__value__15;
      p.binding = scope.define({
        name: p.value[0].name,
        mutable: mutable,
        token: p,
        type_: type_
      }, true);
      return (0, _core.Ok)(false);
    } else {
      var __PUCK__value__16 = __PUCK__value__13;
      if (__PUCK__value__16.kind == "Record") {
        var _PUCK__value__16$val = _slicedToArray(__PUCK__value__16.value, 1);

        var record = _PUCK__value__16$val[0];

        var properties = record.properties.map(function (p) {
          return declarePatternVariables(scope, visitor, p.pattern, mutable, type_ && type_.properties[p.property.name], allowNotExhaustive);
        }).reduce(function (acc, cur) {
          return _core.ResultTrait['$Result'].andThen.call(acc, function (props) {
            return _core.ResultTrait['$Result'].map.call(cur, function (prop) {
              return props.concat(prop);
            });
          });
        }, (0, _core.Ok)([]));
        return _core.ResultTrait['$Result'].map.call(properties, function (__PUCK__value__17) {
          return false;
        });
      } else {
        var __PUCK__value__18 = __PUCK__value__13;
        if (__PUCK__value__18.kind == "RecordType") {
          var _ret2 = function () {
            var _PUCK__value__18$val = _slicedToArray(__PUCK__value__18.value, 2);

            var typePath = _PUCK__value__18$val[0];
            var record = _PUCK__value__18$val[1];

            visitor.visitTypePath(typePath);
            var __PUCK__value__19 = void 0;
            if (type_ && ((0, _entities.isStruct)(type_) || (0, _entities.isEnumType)(type_))) {
              __PUCK__value__19 = type_;
            } else {
              __PUCK__value__19 = typePath.type_;
            };
            var recordType = __PUCK__value__19;
            var __PUCK__value__20 = void 0;
            if ((0, _entities.isEnumType)(recordType)) {
              var member = typePath.value[1].value[0].name;
              var enumArmType = recordType.members[member];
              __PUCK__value__20 = enumArmType;
            } else {
              __PUCK__value__20 = recordType;
            };
            recordType = __PUCK__value__20;
            var properties = record.properties.map(function (p) {
              return declarePatternVariables(scope, visitor, p.pattern, mutable, recordType && recordType.properties[p.property.name], allowNotExhaustive);
            }).reduce(function (acc, cur) {
              return _core.ResultTrait['$Result'].andThen.call(acc, function (props) {
                return _core.ResultTrait['$Result'].map.call(cur, function (prop) {
                  return props.concat(prop);
                });
              });
            }, (0, _core.Ok)([]));
            return {
              v: _core.ResultTrait['$Result'].map.call(properties, function (__PUCK__value__21) {
                return p.value[0].type_;
              })
            };
          }();

          if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
        } else {
          var __PUCK__value__22 = __PUCK__value__13;
          if (__PUCK__value__22.kind == "Tuple") {
            var _PUCK__value__22$val = _slicedToArray(__PUCK__value__22.value, 1);

            var tuple = _PUCK__value__22$val[0];

            var _properties = tuple.properties.map(function (p, i) {
              return declarePatternVariables(scope, visitor, p, mutable, type_ && type_.properties && type_.properties[i], allowNotExhaustive);
            }).reduce(function (acc, cur) {
              return _core.ResultTrait['$Result'].andThen.call(acc, function (props) {
                return _core.ResultTrait['$Result'].map.call(cur, function (prop) {
                  return props.concat(prop);
                });
              });
            }, (0, _core.Ok)([]));
            return _core.ResultTrait['$Result'].map.call(_properties, function (properties) {
              return {
                kind: "Tuple",
                name: (0, _functions.getTupleTypeName)(properties),
                properties: properties
              };
            });
          } else {
            var __PUCK__value__23 = __PUCK__value__13;
            if (__PUCK__value__23.kind == "TupleType") {
              var _ret3 = function () {
                var _PUCK__value__23$val = _slicedToArray(__PUCK__value__23.value, 2);

                var typePath = _PUCK__value__23$val[0];
                var tuple = _PUCK__value__23$val[1];

                visitor.visitTypePath(typePath);
                var __PUCK__value__24 = void 0;
                if (type_ && ((0, _entities.isTupleType)(type_) || (0, _entities.isEnumType)(type_))) {
                  __PUCK__value__24 = type_;
                } else {
                  __PUCK__value__24 = typePath.type_;
                };
                var tupleType = __PUCK__value__24;
                var __PUCK__value__25 = void 0;
                if ((0, _entities.isEnumType)(tupleType)) {
                  var member = typePath.value[1].value[0].name;
                  var enumArmType = tupleType.members[member];
                  __PUCK__value__25 = enumArmType;
                } else {
                  __PUCK__value__25 = tupleType;
                };
                tupleType = __PUCK__value__25;
                var properties = tuple.properties.map(function (p, i) {
                  return declarePatternVariables(scope, visitor, p, mutable, tupleType && tupleType.properties[i], allowNotExhaustive);
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
                      kind: "Tuple",
                      name: (0, _functions.getTupleTypeName)(properties),
                      properties: properties
                    };
                    if ((0, _entities.isEnumType)(typePath.type_)) {
                      var enumType = typePath.type_;
                      if (!allowNotExhaustive && _js._Object.keys(enumType.members).length > 1) {
                        return (0, _core.Err)(PatternError.NotExhaustive);
                      } else {
                        var _member = typePath.value[1].value[0].name;
                        var _enumArmType = typePath.type_.members[_member];
                        if ((0, _types.isAssignable)(_enumArmType, type_)) {
                          return (0, _core.Ok)(enumType);
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
              var __PUCK__value__26 = __PUCK__value__13;
              if (__PUCK__value__26.kind == "UnitType") {
                var _PUCK__value__26$val = _slicedToArray(__PUCK__value__26.value, 1);

                var _typePath = _PUCK__value__26$val[0];

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
