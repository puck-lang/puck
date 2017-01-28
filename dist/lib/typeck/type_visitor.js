'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.TypeVisitor = TypeVisitor;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _ast = require('./../ast/ast');

var _visit = require('./../ast/visit');

var visit = _interopRequireWildcard(_visit);

var _ast2 = require('./../compiler/ast');

var _entities = require('./../entities');

var _scope = require('./src/scope');

var _structure_visitor = require('./src/structure_visitor');

var _types = require('./src/types');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};
function TypeVisitor(context, file) {
  var importDirective = void 0;
  var reportError = $unwrapTraitObject($unwrapTraitObject(context).reportError).bind(context, file);
  return $unwrapTraitObject(_js._Object).assign({}, $unwrapTraitObject(visit).emptyVisitor, _structure_visitor.structureVisitor, {
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
            members: _core.ObjectMap._new()
          }),
          _class: _entities.TypeClass.fromAstNode(t, reportError),
          instance: _core.None
        };
        $unwrapTraitObject($unwrapTraitObject(self).scope).defineType(t.type_, t, true);
        $unwrapTraitObject($unwrapTraitObject(self).scope).define({
          name: t.name.name,
          mutable: false,
          token: t,
          type_: t.type_
        });
        t.scope = $unwrapTraitObject($unwrapTraitObject(self).scope).createChild();
        return $unwrapTraitObject($unwrapTraitObject(self).postHoist).push(t);
      } else {
        if (!t.typeParametersAssigned) {
          $unwrapTraitObject(self).scope = t.scope;
          var __PUCK__value__1 = $unwrapTraitObject(t.type_)._class;
          if ($unwrapTraitObject(__PUCK__value__1).kind == "Some") {
            (function () {
              var _PUCK__value__1$valu = _slicedToArray(__PUCK__value__1.value, 1),
                  _class = _PUCK__value__1$valu[0];

              _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: t.typeParameters, $isTraitObject: true }, function (p) {
                $unwrapTraitObject(self).visitTypeParameter(p);
                return $unwrapTraitObject($unwrapTraitObject(_class).typeParameters).push(p.type_);
              });
            })();
          };
          t.typeParametersAssigned = true;
          $unwrapTraitObject(t.scope).setSelfBinding(t.name.name);
          return $unwrapTraitObject(self).scope = $unwrapTraitObject($unwrapTraitObject(self).scope).parent;
        } else {
          $unwrapTraitObject(self).scope = t.scope;
          _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: t.members, $isTraitObject: true }, function (m) {
            return $unwrapTraitObject(self).visitEnumMember(m);
          });
          var memberMap = _core.ObjectMap.fromIter(_core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: t.members, $isTraitObject: true }, function (p) {
            return [p.name.name, _core.Option.mapOrElse.call(p.bound, function () {
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
          if (_core.Iterable['$List<E>'].size.call({ type: '$List<E>', value: t.members, $isTraitObject: true }) != _core.ObjectMap.size.call(memberMap)) {
            (function () {
              var members = _core.ObjectMap._new();
              _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: t.members, $isTraitObject: true }, function (p) {
                if (members[p.name.name]) {
                  reportError(p, "Duplicate member " + p.name.name);
                };
                return members[p.name.name] = p;
              });
            })();
          };
          var __PUCK__value__2 = $unwrapTraitObject(t.type_).kind;
          if ($unwrapTraitObject(__PUCK__value__2).kind == "Enum") {
            var _PUCK__value__2$valu = _slicedToArray(__PUCK__value__2.value, 1),
                enum_ = _PUCK__value__2$valu[0];

            $unwrapTraitObject(_js._Object).assign(enum_.members, memberMap);
          } else {
            throw "is not an enum";
          };
          return $unwrapTraitObject(self).scope = $unwrapTraitObject($unwrapTraitObject(self).scope).parent;
        };
      };
    },
    visitModule: function visitModule(m) {
      var self = this;
      $unwrapTraitObject(self).scope = m.scope;
      $unwrapTraitObject($unwrapTraitObject(self).scope).clearBindings();
      var expressions = m.expressions.filter(function (e) {
        return $unwrapTraitObject(e).kind == $unwrapTraitObject(_ast2.SyntaxKind).EnumDeclaration || $unwrapTraitObject(e).kind == $unwrapTraitObject(_ast2.SyntaxKind).ImportDirective || $unwrapTraitObject(e).kind == $unwrapTraitObject(_ast2.SyntaxKind).TraitDeclaration || $unwrapTraitObject(e).kind == $unwrapTraitObject(_ast2.SyntaxKind).TypeDeclaration || $unwrapTraitObject(e).kind == $unwrapTraitObject(_ast2.SyntaxKind).ExportDirective && ($unwrapTraitObject($unwrapTraitObject(e).expression).kind == $unwrapTraitObject(_ast2.SyntaxKind).EnumDeclaration || $unwrapTraitObject($unwrapTraitObject(e).expression).kind == $unwrapTraitObject(_ast2.SyntaxKind).TraitDeclaration || $unwrapTraitObject($unwrapTraitObject(e).expression).kind == $unwrapTraitObject(_ast2.SyntaxKind).TypeDeclaration);
      });
      $unwrapTraitObject(expressions).forEach(function (e) {
        $unwrapTraitObject(self).visitExpression(e);
        return $unwrapTraitObject(e).hoisted = true;
      });
      $unwrapTraitObject($unwrapTraitObject(self).postHoist).forEach($unwrapTraitObject($unwrapTraitObject(self).visitExpression).bind(self));
      return $unwrapTraitObject(expressions).forEach($unwrapTraitObject($unwrapTraitObject(self).visitExpression).bind(self));
    },
    visitNamedTypeBound: function visitNamedTypeBound(t) {
      var self = this;
      var binding = $unwrapTraitObject($unwrapTraitObject(self).scope).getTypePath(t.path);
      if (!binding) {
        $unwrapTraitObject(self).reportError(t, "Use of undeclared type " + $unwrapTraitObject($unwrapTraitObject(t.path.value)[0]).name);
      };
      if (!$unwrapTraitObject($unwrapTraitObject(binding).token).scope) {
        if (!$unwrapTraitObject($unwrapTraitObject(self).imports)[$unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(t.path.value)[0]).name)]) {
          reportError(t, "Scope not set for binding " + $unwrapTraitObject($unwrapTraitObject(t.path.value)[0]).name + " but not found in imports either");
        };
        $unwrapTraitObject(context).runTypeVisitorOnFile($unwrapTraitObject($unwrapTraitObject(self).imports)[$unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(t.path.value)[0]).name)]);
      };
      return $unwrapTraitObject($unwrapTraitObject(_structure_visitor.structureVisitor).visitNamedTypeBound).call(self, t);
    },
    visitObjectDestructure: function visitObjectDestructure(i) {
      var self = this;
      i.scope = $unwrapTraitObject(self).scope;
      return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: i.members, $isTraitObject: true }, function (m) {
        if (importDirective._module) {
          var e = $unwrapTraitObject($unwrapTraitObject(importDirective._module).exports)[m.local.name];
          if ($unwrapTraitObject($unwrapTraitObject(e).expression).kind == $unwrapTraitObject(_ast2.SyntaxKind).EnumDeclaration || $unwrapTraitObject($unwrapTraitObject(e).expression).kind == $unwrapTraitObject(_ast2.SyntaxKind).TraitDeclaration || $unwrapTraitObject($unwrapTraitObject(e).expression).kind == $unwrapTraitObject(_ast2.SyntaxKind).TypeDeclaration) {
            var typeBinding = $unwrapTraitObject($unwrapTraitObject(importDirective._module).scope).getTypeBinding(m.property.name);
            $unwrapTraitObject($unwrapTraitObject(self).scope).setTypeBinding(typeBinding);
            $unwrapTraitObject($unwrapTraitObject(self).scope).define({
              name: m.local.name,
              mutable: false,
              token: m,
              type_: $unwrapTraitObject(typeBinding).type_
            });
            return $unwrapTraitObject($unwrapTraitObject(self).imports)[m.local.name] = importDirective.file;
          } else {
            var binding = $unwrapTraitObject($unwrapTraitObject(importDirective._module).scope).getBinding(m.property.name);
            return $unwrapTraitObject($unwrapTraitObject(self).scope).define({
              name: m.local.name,
              mutable: false,
              token: m,
              inherit: binding,
              importedFrom: importDirective
            });
          };
        } else {
          return $unwrapTraitObject($unwrapTraitObject(self).scope).define({
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
          kind: _entities.TypeKind.Trait({
            isShorthand: false,
            functions: _core.ObjectMap._new()
          }),
          _class: _entities.TypeClass.fromAstNode(t, reportError),
          instance: _core.None
        };
        $unwrapTraitObject($unwrapTraitObject(self).scope).defineType(t.type_, t, true);
        t.binding = $unwrapTraitObject($unwrapTraitObject(self).scope).define({
          name: t.name.name,
          mutable: false,
          token: t,
          type_: t.type_
        });
        return $unwrapTraitObject($unwrapTraitObject(self).postHoist).push(t);
      } else {
        if (!t.scope) {
          $unwrapTraitObject(self).scope = $unwrapTraitObject($unwrapTraitObject(self).scope).createChild();
          t.scope = $unwrapTraitObject(self).scope;
          var __PUCK__value__3 = $unwrapTraitObject(t.type_)._class;
          if ($unwrapTraitObject(__PUCK__value__3).kind == "Some") {
            (function () {
              var _PUCK__value__3$valu = _slicedToArray(__PUCK__value__3.value, 1),
                  _class = _PUCK__value__3$valu[0];

              _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: t.typeParameters, $isTraitObject: true }, function (p) {
                $unwrapTraitObject(self).visitTypeParameter(p);
                return $unwrapTraitObject($unwrapTraitObject(_class).typeParameters).push(p.type_);
              });
            })();
          };
          $unwrapTraitObject(t.scope).setSelfBinding(t.name.name);
          return $unwrapTraitObject(self).scope = $unwrapTraitObject($unwrapTraitObject(self).scope).parent;
        } else {
          $unwrapTraitObject(self).scope = t.scope;
          _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: t.members, $isTraitObject: true }, function (m) {
            return $unwrapTraitObject(self).visitMethodDeclaration(m, t.type_);
          });
          var __PUCK__value__4 = $unwrapTraitObject(t.type_).kind;
          if ($unwrapTraitObject(__PUCK__value__4).kind == "Trait") {
            (function () {
              var _PUCK__value__4$valu = _slicedToArray(__PUCK__value__4.value, 1),
                  trait_ = _PUCK__value__4$valu[0];

              $unwrapTraitObject(_js._Object).assign(trait_.functions, _core.ObjectMap.fromIter(_core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: t.members, $isTraitObject: true }, function (m) {
                return [$unwrapTraitObject($unwrapTraitObject(m.name.value)[0]).name, m.type_];
              })));
              var __PUCK__value__5 = $unwrapTraitObject(t.type_)._class;
              if ($unwrapTraitObject(__PUCK__value__5).kind == "Some") {
                var _PUCK__value__5$valu = _slicedToArray(__PUCK__value__5.value, 1),
                    _class = _PUCK__value__5$valu[0];

                $unwrapTraitObject($unwrapTraitObject(_class).instances).forEach(function (instance) {
                  var __PUCK__value__6 = $unwrapTraitObject(instance).kind;
                  if ($unwrapTraitObject(__PUCK__value__6).kind == "Trait") {
                    var _PUCK__value__6$valu = _slicedToArray(__PUCK__value__6.value, 1),
                        instanceTrait = _PUCK__value__6$valu[0];

                    return $unwrapTraitObject(_js._Object).assign(instanceTrait, { functions: trait_.functions });
                  } else {
                    throw "instance is not a trait";
                  };
                });
              };
            })();
          } else {
            throw "is not a trait";
          };
          return $unwrapTraitObject(self).scope = $unwrapTraitObject($unwrapTraitObject(self).scope).parent;
        };
      };
    },
    visitTypeDeclaration: function visitTypeDeclaration(t) {
      var self = this;
      if (!t.type_) {
        var __PUCK__value__7 = t.bound;
        var __PUCK__value__8 = void 0;
        if ($unwrapTraitObject(__PUCK__value__7).kind == "Some") {
          var _PUCK__value__7$valu = _slicedToArray(__PUCK__value__7.value, 1),
              typeBound = _PUCK__value__7$valu[0];

          var __PUCK__value__9 = void 0;
          if (typeBound.kind == $unwrapTraitObject(_ast2.SyntaxKind).ObjectTypeBound) {
            __PUCK__value__9 = _entities.StructKind.Record({ properties: _core.ObjectMap._new() });
          } else {
            var __PUCK__value__10 = void 0;
            if (typeBound.kind == $unwrapTraitObject(_ast2.SyntaxKind).TupleTypeBound) {
              __PUCK__value__10 = _entities.StructKind.Tuple({ properties: [] });
            } else {
              throw "Unreachable";
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
          _class: _entities.TypeClass.fromAstNode(t, reportError),
          instance: _core.None
        };
        $unwrapTraitObject($unwrapTraitObject(self).scope).defineType(t.type_, t, true);
        t.binding = $unwrapTraitObject($unwrapTraitObject(self).scope).define({
          name: t.name.name,
          mutable: false,
          token: t,
          type_: t.type_
        });
        t.scope = $unwrapTraitObject($unwrapTraitObject(self).scope).createChild();
        return $unwrapTraitObject($unwrapTraitObject(self).postHoist).push(t);
      } else {
        if (!t.typeParametersAssigned) {
          $unwrapTraitObject(self).scope = t.scope;
          var __PUCK__value__11 = t.type_._class;
          if ($unwrapTraitObject(__PUCK__value__11).kind == "Some") {
            (function () {
              var _PUCK__value__11$val = _slicedToArray(__PUCK__value__11.value, 1),
                  _class = _PUCK__value__11$val[0];

              _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: t.typeParameters, $isTraitObject: true }, function (p) {
                $unwrapTraitObject(self).visitTypeParameter(p);
                return _class.typeParameters.push(p.type_);
              });
            })();
          };
          t.typeParametersAssigned = true;
          $unwrapTraitObject(t.scope).setSelfBinding(t.name.name);
          return $unwrapTraitObject(self).scope = $unwrapTraitObject($unwrapTraitObject(self).scope).parent;
        } else {
          $unwrapTraitObject(self).scope = t.scope;
          var __PUCK__value__12 = t.bound;
          if ($unwrapTraitObject(__PUCK__value__12).kind == "Some") {
            var _PUCK__value__12$val = _slicedToArray(__PUCK__value__12.value, 1),
                _typeBound = _PUCK__value__12$val[0];

            $unwrapTraitObject(self).visitTypeBound(_typeBound);
            var __PUCK__value__13 = t.type_.kind;
            var __PUCK__value__14 = __PUCK__value__13;
            if ($unwrapTraitObject(__PUCK__value__14).kind == "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__14).value)[$unwrapTraitObject(0)]).kind).kind == "Record") {
              var _PUCK__value__14$val = _slicedToArray(__PUCK__value__14.value, 1),
                  _PUCK__value__14$val$ = _slicedToArray(_PUCK__value__14$val[0].kind.value, 1),
                  properties = _PUCK__value__14$val$[0].properties;

              var propertyList = $unwrapTraitObject(_typeBound.properties).map(function (p) {
                return [$unwrapTraitObject($unwrapTraitObject(p).name).name, $unwrapTraitObject($unwrapTraitObject(p).typeBound).type_];
              });
              $unwrapTraitObject(_js._Object).assign(properties, _core.ObjectMap.fromIter({ type: '$List<E>', value: propertyList, $isTraitObject: true }));
            } else {
              var __PUCK__value__15 = __PUCK__value__13;
              if ($unwrapTraitObject(__PUCK__value__15).kind == "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__15).value)[$unwrapTraitObject(0)]).kind).kind == "Tuple") {
                var _PUCK__value__15$val = _slicedToArray(__PUCK__value__15.value, 1),
                    _PUCK__value__15$val$ = _slicedToArray(_PUCK__value__15$val[0].kind.value, 1),
                    tuple = _PUCK__value__15$val$[0];

                $unwrapTraitObject(_js._Object).assign(tuple, { properties: $unwrapTraitObject(_typeBound.properties).map(function (p) {
                    return $unwrapTraitObject(p).type_;
                  }) });
              } else {
                var __PUCK__value__16 = __PUCK__value__13;
                if (true) {
                  var __PUCK__value__17 = __PUCK__value__16;
                };
              };
            };
          };
          return $unwrapTraitObject(self).scope = $unwrapTraitObject($unwrapTraitObject(self).scope).parent;
        };
      };
    },
    visitTypeProperty: $unwrapTraitObject($unwrapTraitObject(visit).walkingVisitor).visitTypeProperty,
    visitExportDirective: function visitExportDirective(e) {
      var self = this;
      e.scope = $unwrapTraitObject(self).scope;
      return $unwrapTraitObject(visit).walkExportDirective(self, e);
    },
    visitImportDirective: function visitImportDirective(i) {
      var self = this;
      if (i.hoisted) {
        return _js._undefined;
      };
      i.scope = $unwrapTraitObject(self).scope;
      if ($unwrapTraitObject(i.specifier).kind == $unwrapTraitObject(_ast2.SyntaxKind).Identifier) {
        return $unwrapTraitObject($unwrapTraitObject(self).scope).define({
          name: $unwrapTraitObject(i.specifier).name,
          mutable: false,
          token: i
        });
      } else {
        if ($unwrapTraitObject(i.specifier).kind == $unwrapTraitObject(_ast2.SyntaxKind).ObjectDestructure) {
          importDirective = i;
          return $unwrapTraitObject(visit).walkImportDirective(self, i);
        };
      };
    }
  });
}
