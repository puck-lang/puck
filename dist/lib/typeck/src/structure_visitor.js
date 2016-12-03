#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.structureVisitor = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.notAssignableError = notAssignableError;

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
          __PUCK__value__1 = self.assignedTo.ty;
        };
        var assignedTo = __PUCK__value__1;
        if (f.typeParameters) {
          f.typeParameters.forEach(self.visitTypeParameter.bind(self));
        };
        f.parameterList.forEach(function (p, i) {
          var __PUCK__value__2 = void 0;
          if (assignedTo) {
            __PUCK__value__2 = assignedTo._arguments[i].ty;
          };
          var ty = __PUCK__value__2;
          return self.visitFunctionParameter(p, ty);
        });
        if (_core.MaybeTrait['$Maybe'].isJust.call(f.returnType)) {
          self.visitTypeBound(f.returnType.value[0]);
        };
        f.ty = (0, _functions.createFunctionType)(f.scope, f, self.reportError);
        if (_core.MaybeTrait['$Maybe'].isJust.call(f.name)) {
          f.scope.parent.define({
            name: f.name.value[0].name,
            token: f,
            mutable: false,
            ty: f.ty
          });
        };
        return {
          v: self.scope = f.scope.parent
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    };
  },
  visitFunctionParameter: function visitFunctionParameter(v, ty) {
    var self = this;
    return self.visitVariableDeclaration(v, self.visitLiteral.bind(self), ty);
  },
  visitFunctionTypeBound: function visitFunctionTypeBound(t) {
    var self = this;
    if (!t.scope) {
      self.scope = self.scope.createChild();
      t.scope = self.scope;
      visit.walkFunctionTypeBound(self, t);
      t.ty = (0, _types.getType)(t.scope, t);
      return self.scope = self.scope.parent;
    };
  },
  visitNamedTypeBound: function visitNamedTypeBound(t) {
    var self = this;
    if (!t.scope) {
      t.scope = self.scope;
      var binding = t.scope.getTypeBinding(t.name.name);
      if (!binding) {
        self.reportError(t, "Use of undeclared type " + t.name.name);
      } else {
        if ((0, _entities.isTypeClass)(binding.ty)) {
          var error = void 0;;
          if (error = (0, _range.checkRange)(t.typeParameters, binding.ty.parameterRange, "type parameters", binding.name)) {
            self.reportError(t, error);
          };
        } else {
          if (t.typeParameters.length > 0) {
            self.reportError(t, "Type " + binding.name + " is not generic");
          };
        };
      };
      visit.walkNamedTypeBound(self, t);
      return t.ty = (0, _types.getType)(t.scope, t);
    };
  },
  visitObjectTypeBound: function visitObjectTypeBound(t) {
    var self = this;
    if (!t.scope) {
      t.scope = self.scope;
      visit.walkObjectTypeBound(self, t);
      return t.ty = (0, _types.getType)(t.scope, t);
    };
  },
  visitTupleTypeBound: function visitTupleTypeBound(t) {
    var self = this;
    if (!t.scope) {
      t.scope = self.scope;
      visit.walkTupleTypeBound(self, t);
      return t.ty = (0, _types.getType)(t.scope, t);
    };
  },
  visitTypeParameter: function visitTypeParameter(t) {
    var self = this;
    if (!t.scope) {
      t.scope = self.scope;
      visit.walkTypeParameter(self, t);
      var binding = self.scope.defineType(t);
      return t.ty = binding.ty;
    };
  },
  visitVariableDeclaration: function visitVariableDeclaration(d, visitInitializer, ty) {
    var self = this;
    if (d.scope) {
      return _js._undefined;
    };
    d.scope = self.scope;
    d.ty = _core.MaybeTrait['$Maybe'].mapOr.call(d.typeBound, ty, function (bound) {
      self.visitTypeBound(bound);
      return (0, _types.getType)(d.scope, bound) || ty;
    });
    var result = declareVariable(d.scope, self, d.pattern, d.mutable, d.ty);
    if (_core.ResultTrait['$Result'].isOk.call(result)) {
      var patternTy = result.value[0];
      if (patternTy) {
        if (!d.ty) {
          d.ty = patternTy;
        } else {
          if (!(0, _types.isAssignable)(patternTy, d.ty)) {
            self.reportError(d, notAssignableError(patternTy, d.ty));
          };
        };
      };
    } else {
      var _result$value$ = _slicedToArray(result.value[0], 3);

      var pattern = _result$value$[0];
      var to = _result$value$[1];
      var subject = _result$value$[2];

      self.reportError(d, notAssignableError(to, subject));
    };
    if (_core.MaybeTrait['$Maybe'].isJust.call(d.initializer)) {
      var initializer = d.initializer.value[0];
      visitInitializer(initializer);
      if (!d.ty && d.pattern.binding) {
        d.pattern.binding.ty = initializer.ty;
        return d.ty = initializer.ty;
      } else {
        if (!(0, _types.isAssignable)(d.ty, initializer.ty)) {
          return self.reportError(d, notAssignableError(d.ty, initializer.ty));
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
    return l.ty = self.scope.getTypeBinding("Bool").ty;
  },
  visitStrictListLiteral: function visitStrictListLiteral(l) {
    var self = this;
    return l.members.forEach(self.visitLiteral.bind(self));
  },
  visitStrictNumberLiteral: function visitStrictNumberLiteral(l) {
    var self = this;
    return l.ty = self.scope.getTypeBinding("Num").ty;
  },
  visitStrictObjectLiteral: function visitStrictObjectLiteral(l) {
    var self = this;
    return l.members.forEach(function (m) {
      return self.visitLiteral(m.value);
    });
  },
  visitStrictStringLiteral: function visitStrictStringLiteral(l) {
    var self = this;
    l.ty = self.scope.getTypeBinding("String").ty;
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
function declareVariable(scope, visitor, p, mutable, ty) {
  if (p.kind == "CatchAll") {
    return (0, _core.Ok)(false);
  } else {
    if (p.kind == "Identifier") {
      p.binding = scope.define({
        name: p.value[0].name,
        mutable: mutable,
        token: p,
        ty: ty
      }, true);
      return (0, _core.Ok)(false);
    } else {
      if (p.kind == "Record") {
        var properties = p.value[0].properties.map(function (p) {
          return declareVariable(scope, visitor, p.local, mutable, ty);
        }).reduce(function (acc, cur) {
          return _core.ResultTrait['$Result'].andThen.call(acc, function (props) {
            return _core.ResultTrait['$Result'].map.call(cur, function (prop) {
              return props.concat(prop);
            });
          });
        }, (0, _core.Ok)([]));
        return _core.ResultTrait['$Result'].map.call(properties, function (__PUCK__value__4) {
          return false;
        });
      } else {
        if (p.kind == "RecordType") {
          visitor.visitNamedTypeBound(p.value[0]);
          var _properties = p.value[1].properties.map(function (p) {
            return declareVariable(scope, visitor, p.local, mutable, ty);
          }).reduce(function (acc, cur) {
            return _core.ResultTrait['$Result'].andThen.call(acc, function (props) {
              return _core.ResultTrait['$Result'].map.call(cur, function (prop) {
                return props.concat(prop);
              });
            });
          }, (0, _core.Ok)([]));
          return _core.ResultTrait['$Result'].map.call(_properties, function (__PUCK__value__5) {
            return p.value[0].ty;
          });
        } else {
          if (p.kind == "Tuple") {
            var _properties2 = p.value[0].properties.map(function (p) {
              return declareVariable(scope, visitor, p, mutable, ty);
            }).reduce(function (acc, cur) {
              return _core.ResultTrait['$Result'].andThen.call(acc, function (props) {
                return _core.ResultTrait['$Result'].map.call(cur, function (prop) {
                  return props.concat(prop);
                });
              });
            }, (0, _core.Ok)([]));
            return _core.ResultTrait['$Result'].map.call(_properties2, function (properties) {
              return {
                kind: "Tuple",
                name: (0, _functions.getTupleTypeName)(properties),
                properties: properties
              };
            });
          } else {
            if (p.kind == "TupleType") {
              visitor.visitNamedTypeBound(p.value[0]);
              var _properties3 = p.value[1].properties.map(function (p) {
                return declareVariable(scope, visitor, p, mutable, ty);
              }).reduce(function (acc, cur) {
                return _core.ResultTrait['$Result'].andThen.call(acc, function (props) {
                  return _core.ResultTrait['$Result'].map.call(cur, function (prop) {
                    return props.concat(prop);
                  });
                });
              }, (0, _core.Ok)([]));
              return _core.ResultTrait['$Result'].andThen.call(_properties3, function (properties) {
                var ty = {
                  kind: "Tuple",
                  name: (0, _functions.getTupleTypeName)(properties),
                  properties: properties
                };
                if ((0, _types.isAssignable)(p.value[0].ty, ty)) {
                  return (0, _core.Ok)(p.value[0].ty);
                } else {
                  return (0, _core.Err)([p, p.value[0].ty, ty]);
                };
              });
            };
          };
        };
      };
    };
  };
}
