#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.TypeVisitor = TypeVisitor;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _ast = require('./../ast/ast.js');

var _visit = require('./../ast/visit.js');

var visit = _interopRequireWildcard(_visit);

var _ast2 = require('./../compiler/ast.js');

var _entities = require('./../entities.js');

var _scope = require('./src/scope.js');

var _structure_visitor = require('./src/structure_visitor.js');

var _types = require('./src/types.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function TypeVisitor(context, file) {
  var importDirective = void 0;
  var reportError = context.reportError.bind(context, file);
  return _js._Object.assign({}, visit.emptyVisitor, _structure_visitor.structureVisitor, {
    scope: (0, _scope.createScope)(context, file),
    reportError: reportError,
    imports: {},
    postHoist: [],
    visitEnumDeclaration: function visitEnumDeclaration(t) {
      var self = this;
      if (!t.type_) {
        t.type_ = {
          displayName: _core.None,
          name: (0, _core.Some)(t.name.name),
          kind: _entities.TypeKind.Enum({
            implementations: [],
            members: []
          }),
          _class: _entities.TypeClassTrait.fromAstNode(t, reportError),
          instance: _core.None
        };
        self.scope.defineType(t.type_, t, true);
        self.scope.define({
          name: t.name.name,
          mutable: false,
          token: t,
          type_: t.type_
        });
        t.scope = (0, _scope.createScope)(context, file, self.scope);
        return self.postHoist.push(t);
      } else {
        if (!t.typeParametersAssigned) {
          self.scope = t.scope;
          var __PUCK__value__1 = t.type_._class;
          if (__PUCK__value__1.kind == "Some") {
            (function () {
              var _PUCK__value__1$valu = _slicedToArray(__PUCK__value__1.value, 1);

              var _class = _PUCK__value__1$valu[0];

              t.typeParameters.forEach(function (p) {
                self.visitTypeParameter(p);
                return _class.typeParameters.push(p.type_);
              });
            })();
          };
          t.typeParametersAssigned = true;
          return self.scope = self.scope.parent;
        } else {
          self.scope = t.scope;
          t.members.forEach(function (m) {
            return self.visitEnumMember(m);
          });
          var memberMap = _core.ObjectMapTrait.fromList(_core.Iterable['$List'].map.call(t.members, function (p) {
            return [p.name.name, _core.MaybeTrait['$Option'].mapOrElse.call(p.bound, function () {
              return {
                displayName: _core.None,
                name: (0, _core.Some)(p.name.name),
                kind: _entities.TypeKind.Struct({
                  implementations: [],
                  kind: _entities.StructKind.Unit
                }),
                _class: _core.None,
                instance: _core.None
              };
            }, function (bound) {
              return bound.type_;
            })];
          }));
          if (_core.Iterable['$List'].size.call(t.members) != _core.ObjectMapTrait['$ObjectMap'].size.call(memberMap)) {
            (function () {
              var members = _core.ObjectMapTrait._new();
              t.members.forEach(function (p) {
                if (members[p.name.name]) {
                  reportError(p, "Duplicate member " + p.name.name);
                };
                return members[p.name.name] = p;
              });
            })();
          };
          var __PUCK__value__2 = t.type_.kind;
          if (__PUCK__value__2.kind == "Enum") {
            var _PUCK__value__2$valu = _slicedToArray(__PUCK__value__2.value, 1);

            var enum_ = _PUCK__value__2$valu[0];

            _js._Object.assign(enum_.members, memberMap);
          } else {
            throw "is not an enum";
          };
          return self.scope = self.scope.parent;
        };
      };
    },
    visitModule: function visitModule(m) {
      var self = this;
      self.scope = m.scope;
      self.scope.clearBindings();
      var expressions = m.expressions.filter(function (e) {
        return e.kind == _ast2.SyntaxKind.EnumDeclaration || e.kind == _ast2.SyntaxKind.ImportDirective || e.kind == _ast2.SyntaxKind.TraitDeclaration || e.kind == _ast2.SyntaxKind.TypeDeclaration || e.kind == _ast2.SyntaxKind.ExportDirective && (e.expression.kind == _ast2.SyntaxKind.EnumDeclaration || e.expression.kind == _ast2.SyntaxKind.TraitDeclaration || e.expression.kind == _ast2.SyntaxKind.TypeDeclaration);
      });
      expressions.forEach(function (e) {
        self.visitExpression(e);
        return e.hoisted = true;
      });
      self.postHoist.forEach(self.visitExpression.bind(self));
      return expressions.forEach(self.visitExpression.bind(self));
    },
    visitNamedTypeBound: function visitNamedTypeBound(t) {
      var self = this;
      var binding = self.scope.getTypePath(t.path);
      if (!binding) {
        self.reportError(t, "Use of undeclared type " + t.path.value[0].name);
      };
      if (!binding.token.scope) {
        if (!self.imports[t.path.value[0].name]) {
          reportError(t, "Scope not set for binding " + t.path.value[0].name + " but not found in imports either");
        };
        context.runTypeVisitorOnFile(self.imports[t.path.value[0].name]);
      };
      return _structure_visitor.structureVisitor.visitNamedTypeBound.call(self, t);
    },
    visitObjectDestructure: function visitObjectDestructure(i) {
      var self = this;
      i.scope = self.scope;
      return i.members.forEach(function (m) {
        if (importDirective._module) {
          var e = importDirective._module.exports[m.local.name];
          if (e.expression.kind == _ast2.SyntaxKind.EnumDeclaration || e.expression.kind == _ast2.SyntaxKind.TraitDeclaration) {
            var typeBinding = importDirective._module.scope.getTypeBinding(m.property.name);
            self.scope.setTypeBinding(typeBinding);
            return self.scope.define({
              name: m.local.name,
              mutable: false,
              token: m,
              type_: typeBinding.type_
            });
          } else {
            if (e.expression.kind == _ast2.SyntaxKind.TypeDeclaration) {
              var _typeBinding = importDirective._module.scope.getTypeBinding(m.property.name);
              self.scope.setTypeBinding(_typeBinding);
              return self.imports[m.local.name] = importDirective.file;
            } else {
              var binding = importDirective._module.scope.getBinding(m.property.name);
              return self.scope.define({
                name: m.local.name,
                mutable: false,
                token: m,
                inherit: binding,
                importedFrom: importDirective
              });
            };
          };
        } else {
          return self.scope.define({
            name: m.local.name,
            mutable: false,
            token: m
          });
        };
      });
    },
    visitTraitDeclaration: function visitTraitDeclaration(t) {
      var self = this;
      if (!t.type_) {
        t.type_ = {
          displayName: _core.None,
          name: (0, _core.Some)(t.name.name),
          kind: _entities.TypeKind.Trait({ functions: _core.ObjectMapTrait._new() }),
          _class: _entities.TypeClassTrait.fromAstNode(t, reportError),
          instance: _core.None
        };
        self.scope.defineType(t.type_, t, true);
        t.binding = self.scope.define({
          name: t.name.name,
          mutable: false,
          token: t,
          type_: t.type_
        });
        return self.postHoist.push(t);
      } else {
        if (!t.scope) {
          self.scope = (0, _scope.createScope)(context, file, self.scope);
          t.scope = self.scope;
          var __PUCK__value__3 = t.type_._class;
          if (__PUCK__value__3.kind == "Some") {
            (function () {
              var _PUCK__value__3$valu = _slicedToArray(__PUCK__value__3.value, 1);

              var _class = _PUCK__value__3$valu[0];

              t.typeParameters.forEach(function (p) {
                self.visitTypeParameter(p);
                return _class.typeParameters.push(p.type_);
              });
            })();
          };
          return self.scope = self.scope.parent;
        } else {
          self.scope = t.scope;
          t.members.forEach(function (t) {
            return self.visitFunctionDeclaration(t);
          });
          var __PUCK__value__4 = t.type_.kind;
          if (__PUCK__value__4.kind == "Trait") {
            (function () {
              var _PUCK__value__4$valu = _slicedToArray(__PUCK__value__4.value, 1);

              var trait_ = _PUCK__value__4$valu[0];

              _js._Object.assign(trait_.functions, _core.ObjectMapTrait.fromList(_core.Iterable['$List'].map.call(t.members, function (m) {
                return [m.name.value[0].name, m.type_];
              })));
              var __PUCK__value__5 = t.type_._class;
              if (__PUCK__value__5.kind == "Some") {
                var _PUCK__value__5$valu = _slicedToArray(__PUCK__value__5.value, 1);

                var _class2 = _PUCK__value__5$valu[0];

                _class2.instances.forEach(function (instance) {
                  var __PUCK__value__6 = instance.kind;
                  if (__PUCK__value__6.kind == "Trait") {
                    var _PUCK__value__6$valu = _slicedToArray(__PUCK__value__6.value, 1);

                    var instanceTrait = _PUCK__value__6$valu[0];

                    return _js._Object.assign(instanceTrait, { functions: trait_.functions });
                  } else {
                    throw "instance is not a trait";
                  };
                });
              };
            })();
          } else {
            throw "is not a trait";
          };
          return self.scope = self.scope.parent;
        };
      };
    },
    visitTypeDeclaration: function visitTypeDeclaration(t) {
      var self = this;
      if (!t.type_) {
        var __PUCK__value__7 = t.bound;
        var __PUCK__value__8 = void 0;
        if (__PUCK__value__7.kind == "Some") {
          var _PUCK__value__7$valu = _slicedToArray(__PUCK__value__7.value, 1);

          var typeBound = _PUCK__value__7$valu[0];

          var __PUCK__value__9 = void 0;
          if (typeBound.kind == _ast2.SyntaxKind.ObjectTypeBound) {
            __PUCK__value__9 = _entities.StructKind.Record({ properties: _core.ObjectMapTrait._new() });
          } else {
            var __PUCK__value__10 = void 0;
            if (typeBound.kind == _ast2.SyntaxKind.TupleTypeBound) {
              __PUCK__value__10 = _entities.StructKind.Tuple({ properties: [] });
            };
            __PUCK__value__9 = __PUCK__value__10;
          };
          __PUCK__value__8 = __PUCK__value__9;
        } else {
          __PUCK__value__8 = _entities.StructKind.Unit;
        };
        var structKind = __PUCK__value__8;
        t.type_ = {
          displayName: _core.None,
          name: (0, _core.Some)(t.name.name),
          kind: _entities.TypeKind.Struct({
            implementations: [],
            kind: structKind
          }),
          _class: _entities.TypeClassTrait.fromAstNode(t, reportError),
          instance: _core.None
        };
        self.scope.defineType(t.type_, t, true);
        t.scope = (0, _scope.createScope)(context, file, self.scope);
        return self.postHoist.push(t);
      } else {
        if (!t.typeParametersAssigned) {
          self.scope = t.scope;
          var __PUCK__value__11 = t.type_._class;
          if (__PUCK__value__11.kind == "Some") {
            (function () {
              var _PUCK__value__11$val = _slicedToArray(__PUCK__value__11.value, 1);

              var _class = _PUCK__value__11$val[0];

              t.typeParameters.forEach(function (p) {
                self.visitTypeParameter(p);
                return _class.typeParameters.push(p.type_);
              });
            })();
          };
          t.typeParametersAssigned = true;
          return self.scope = self.scope.parent;
        } else {
          self.scope = t.scope;
          var __PUCK__value__12 = t.bound;
          if (__PUCK__value__12.kind == "Some") {
            var _PUCK__value__12$val = _slicedToArray(__PUCK__value__12.value, 1);

            var _typeBound = _PUCK__value__12$val[0];

            self.visitTypeBound(_typeBound);
            var __PUCK__value__13 = t.type_.kind;
            var __PUCK__value__14 = __PUCK__value__13;
            if (__PUCK__value__14.kind == "Struct" && __PUCK__value__14.value[0].kind.kind == "Record") {
              var _PUCK__value__14$val = _slicedToArray(__PUCK__value__14.value, 1);

              var _PUCK__value__14$val$ = _slicedToArray(_PUCK__value__14$val[0].kind.value, 1);

              var properties = _PUCK__value__14$val$[0].properties;

              _js._Object.assign(properties, _core.ObjectMapTrait.fromList(_typeBound.properties.map(function (p) {
                return [p.name.name, p.typeBound.type_];
              })));
            } else {
              var __PUCK__value__15 = __PUCK__value__13;
              if (__PUCK__value__15.kind == "Struct" && __PUCK__value__15.value[0].kind.kind == "Tuple") {
                var _PUCK__value__15$val = _slicedToArray(__PUCK__value__15.value, 1);

                var _PUCK__value__15$val$ = _slicedToArray(_PUCK__value__15$val[0].kind.value, 1);

                var tuple = _PUCK__value__15$val$[0];

                _js._Object.assign(tuple, { properties: _typeBound.properties.map(function (p) {
                    return p.type_;
                  }) });
              } else {
                var __PUCK__value__16 = __PUCK__value__13;
                if (true) {
                  var __PUCK__value__17 = __PUCK__value__16;
                };
              };
            };
          };
          return self.scope = self.scope.parent;
        };
      };
    },
    visitTypeProperty: visit.walkingVisitor.visitTypeProperty,
    visitExportDirective: function visitExportDirective(e) {
      var self = this;
      e.scope = self.scope;
      return visit.walkExportDirective(self, e);
    },
    visitImportDirective: function visitImportDirective(i) {
      var self = this;
      if (i.hoisted) {
        return _js._undefined;
      };
      i.scope = self.scope;
      if (i.specifier.kind == _ast2.SyntaxKind.Identifier) {
        return self.scope.define({
          name: i.specifier.name,
          mutable: false,
          token: i
        });
      } else {
        if (i.specifier.kind == _ast2.SyntaxKind.ObjectDestructure) {
          importDirective = i;
          return visit.walkImportDirective(self, i);
        };
      };
    }
  });
}
