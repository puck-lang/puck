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

var _entities = require('./../entities');

var _scope = require('./src/scope');

var _structure_visitor = require('./src/structure_visitor');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};

function isTypeScope(e) {
  var __PUCK__value__1 = e.statement;
  var __PUCK__value__2 = __PUCK__value__1;
  if ($unwrapTraitObject(__PUCK__value__2).kind == "EnumDeclaration") {
    var _PUCK__value__2$valu = _slicedToArray(__PUCK__value__2.value, 1),
        __PUCK__value__3 = _PUCK__value__2$valu[0];

    return true;
  } else {
    var __PUCK__value__4 = __PUCK__value__1;
    if ($unwrapTraitObject(__PUCK__value__4).kind == "TraitDeclaration") {
      var _PUCK__value__4$valu = _slicedToArray(__PUCK__value__4.value, 1),
          __PUCK__value__5 = _PUCK__value__4$valu[0];

      return true;
    } else {
      var __PUCK__value__6 = __PUCK__value__1;
      if ($unwrapTraitObject(__PUCK__value__6).kind == "TypeDeclaration") {
        var _PUCK__value__6$valu = _slicedToArray(__PUCK__value__6.value, 1),
            __PUCK__value__7 = _PUCK__value__6$valu[0];

        return true;
      } else {
        var __PUCK__value__8 = __PUCK__value__1;
        if (true) {
          var __PUCK__value__9 = __PUCK__value__8;
          return false;
        };
      };
    };
  };
};
function TypeVisitor(context, file) {
  var reportError = $unwrapTraitObject($unwrapTraitObject(context).reportError).bind(context, file);
  return $unwrapTraitObject(_js._Object).assign({}, $unwrapTraitObject(visit).emptyVisitor, _structure_visitor.structureVisitor, {
    scope: (0, _scope.createScope)(context, file),
    reportError: reportError,
    imports: {},
    visitModule: function visitModule(m) {
      var self = this;
      $unwrapTraitObject(self).scope = m.scope;
      $unwrapTraitObject($unwrapTraitObject(self).scope).clearBindings();
      var imports = [];
      var declarations = [];
      _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: m.statements, $isTraitObject: true }, function (s) {
        var __PUCK__value__10 = s;
        var __PUCK__value__11 = __PUCK__value__10;
        if ($unwrapTraitObject(__PUCK__value__11).kind == "EnumDeclaration") {
          var _PUCK__value__11$val = _slicedToArray(__PUCK__value__11.value, 1),
              __PUCK__value__12 = _PUCK__value__11$val[0];

          return _core.List.add.call(declarations, s);
        } else {
          var __PUCK__value__13 = __PUCK__value__10;
          if ($unwrapTraitObject(__PUCK__value__13).kind == "ImportDirective") {
            var _PUCK__value__13$val = _slicedToArray(__PUCK__value__13.value, 1),
                i = _PUCK__value__13$val[0];

            return _core.List.add.call(imports, i);
          } else {
            var __PUCK__value__14 = __PUCK__value__10;
            if ($unwrapTraitObject(__PUCK__value__14).kind == "TraitDeclaration") {
              var _PUCK__value__14$val = _slicedToArray(__PUCK__value__14.value, 1),
                  __PUCK__value__15 = _PUCK__value__14$val[0];

              return _core.List.add.call(declarations, s);
            } else {
              var __PUCK__value__16 = __PUCK__value__10;
              if ($unwrapTraitObject(__PUCK__value__16).kind == "TypeDeclaration") {
                var _PUCK__value__16$val = _slicedToArray(__PUCK__value__16.value, 1),
                    __PUCK__value__17 = _PUCK__value__16$val[0];

                return _core.List.add.call(declarations, s);
              } else {
                var __PUCK__value__18 = __PUCK__value__10;
                if ($unwrapTraitObject(__PUCK__value__18).kind == "ExportDirective") {
                  var _PUCK__value__18$val = _slicedToArray(__PUCK__value__18.value, 1),
                      e = _PUCK__value__18$val[0];

                  var __PUCK__value__19 = e.statement;
                  var __PUCK__value__20 = __PUCK__value__19;
                  if ($unwrapTraitObject(__PUCK__value__20).kind == "EnumDeclaration") {
                    var _PUCK__value__20$val = _slicedToArray(__PUCK__value__20.value, 1),
                        __PUCK__value__21 = _PUCK__value__20$val[0];

                    return _core.List.add.call(declarations, s);
                  } else {
                    var __PUCK__value__22 = __PUCK__value__19;
                    if ($unwrapTraitObject(__PUCK__value__22).kind == "TraitDeclaration") {
                      var _PUCK__value__22$val = _slicedToArray(__PUCK__value__22.value, 1),
                          __PUCK__value__23 = _PUCK__value__22$val[0];

                      return _core.List.add.call(declarations, s);
                    } else {
                      var __PUCK__value__24 = __PUCK__value__19;
                      if ($unwrapTraitObject(__PUCK__value__24).kind == "TypeDeclaration") {
                        var _PUCK__value__24$val = _slicedToArray(__PUCK__value__24.value, 1),
                            __PUCK__value__25 = _PUCK__value__24$val[0];

                        return _core.List.add.call(declarations, s);
                      } else {
                        var __PUCK__value__26 = __PUCK__value__19;
                        if (true) {
                          var __PUCK__value__27 = __PUCK__value__26;;
                          var __PUCK__value__28 = __PUCK__value__27;;
                          return __PUCK__value__27;
                        };
                      };
                    };
                  };
                } else {
                  var __PUCK__value__29 = __PUCK__value__10;
                  if (true) {
                    var __PUCK__value__30 = __PUCK__value__29;;
                    var __PUCK__value__31 = __PUCK__value__30;;
                    return __PUCK__value__30;
                  };
                };
              };
            };
          };
        };
      });
      _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: imports, $isTraitObject: true }, function (i) {
        return $unwrapTraitObject(self).visitImportDirective(i);
      });
      _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: declarations, $isTraitObject: true }, function (e) {
        return $unwrapTraitObject(self).visitTopLevelStatement(e);
      });
      _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: declarations, $isTraitObject: true }, function (e) {
        return $unwrapTraitObject(self).visitTopLevelStatement(e);
      });
      return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: declarations, $isTraitObject: true }, function (e) {
        return $unwrapTraitObject(self).visitTopLevelStatement(e);
      });
    },
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
        return $unwrapTraitObject($unwrapTraitObject(self).scope).define({
          name: t.name.name,
          mutable: false,
          token: t,
          type_: t.type_
        });
      } else {
        if (!t.scope) {
          t.scope = $unwrapTraitObject($unwrapTraitObject(self).scope).createChild();
          $unwrapTraitObject(self).scope = t.scope;
          var __PUCK__value__32 = $unwrapTraitObject(t.type_)._class;
          if ($unwrapTraitObject(__PUCK__value__32).kind == "Some") {
            (function () {
              var _PUCK__value__32$val = _slicedToArray(__PUCK__value__32.value, 1),
                  _class = _PUCK__value__32$val[0];

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
              return _ast.TypeBound.getType.call(bound);
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
          var __PUCK__value__33 = $unwrapTraitObject(t.type_).kind;
          if ($unwrapTraitObject(__PUCK__value__33).kind == "Enum") {
            var _PUCK__value__33$val = _slicedToArray(__PUCK__value__33.value, 1),
                enum_ = _PUCK__value__33$val[0];

            $unwrapTraitObject(_js._Object).assign(enum_.members, memberMap);
          } else {
            throw "is not an enum";
          };
          return $unwrapTraitObject(self).scope = $unwrapTraitObject($unwrapTraitObject(self).scope).parent;
        };
      };
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
        return t.binding = $unwrapTraitObject($unwrapTraitObject(self).scope).define({
          name: t.name.name,
          mutable: false,
          token: t,
          type_: t.type_
        });
      } else {
        if (!t.scope) {
          $unwrapTraitObject(self).scope = $unwrapTraitObject($unwrapTraitObject(self).scope).createChild();
          t.scope = $unwrapTraitObject(self).scope;
          var __PUCK__value__34 = $unwrapTraitObject(t.type_)._class;
          if ($unwrapTraitObject(__PUCK__value__34).kind == "Some") {
            (function () {
              var _PUCK__value__34$val = _slicedToArray(__PUCK__value__34.value, 1),
                  _class = _PUCK__value__34$val[0];

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
          var __PUCK__value__35 = $unwrapTraitObject(t.type_).kind;
          if ($unwrapTraitObject(__PUCK__value__35).kind == "Trait") {
            (function () {
              var _PUCK__value__35$val = _slicedToArray(__PUCK__value__35.value, 1),
                  trait_ = _PUCK__value__35$val[0];

              $unwrapTraitObject(_js._Object).assign(trait_.functions, _core.ObjectMap.fromIter(_core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: t.members, $isTraitObject: true }, function (m) {
                return [$unwrapTraitObject($unwrapTraitObject(m.name.value)[0]).name, m.type_];
              })));
              var __PUCK__value__36 = $unwrapTraitObject(t.type_)._class;
              if ($unwrapTraitObject(__PUCK__value__36).kind == "Some") {
                var _PUCK__value__36$val = _slicedToArray(__PUCK__value__36.value, 1),
                    _class = _PUCK__value__36$val[0];

                $unwrapTraitObject($unwrapTraitObject(_class).instances).forEach(function (instance) {
                  var __PUCK__value__37 = $unwrapTraitObject(instance).kind;
                  if ($unwrapTraitObject(__PUCK__value__37).kind == "Trait") {
                    var _PUCK__value__37$val = _slicedToArray(__PUCK__value__37.value, 1),
                        instanceTrait = _PUCK__value__37$val[0];

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
        var __PUCK__value__38 = t.bound;
        var __PUCK__value__39 = void 0;
        if ($unwrapTraitObject(__PUCK__value__38).kind == "Some") {
          var _PUCK__value__38$val = _slicedToArray(__PUCK__value__38.value, 1),
              typeBound = _PUCK__value__38$val[0];

          var __PUCK__value__40 = typeBound;
          var __PUCK__value__41 = __PUCK__value__40;
          var __PUCK__value__42 = void 0;
          if ($unwrapTraitObject(__PUCK__value__41).kind == "RecordTypeBound") {
            var _PUCK__value__41$val = _slicedToArray(__PUCK__value__41.value, 1),
                record = _PUCK__value__41$val[0];

            __PUCK__value__42 = _entities.StructKind.Record({ properties: _core.ObjectMap._new() });
          } else {
            var __PUCK__value__43 = __PUCK__value__40;
            var __PUCK__value__44 = void 0;
            if ($unwrapTraitObject(__PUCK__value__43).kind == "TupleTypeBound") {
              var _PUCK__value__43$val = _slicedToArray(__PUCK__value__43.value, 1),
                  tuple = _PUCK__value__43$val[0];

              __PUCK__value__44 = _entities.StructKind.Tuple({ properties: [] });
            } else {
              var __PUCK__value__45 = __PUCK__value__40;
              var __PUCK__value__46 = void 0;
              if (true) {
                var __PUCK__value__47 = __PUCK__value__45;
                throw "Unreachable";
              };
              __PUCK__value__44 = __PUCK__value__46;
            };
            __PUCK__value__42 = __PUCK__value__44;
          };
          __PUCK__value__39 = __PUCK__value__42;
        } else {
          __PUCK__value__39 = _entities.StructKind.Unit;
        };
        var structKind = __PUCK__value__39;
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
        return t.binding = $unwrapTraitObject($unwrapTraitObject(self).scope).define({
          name: t.name.name,
          mutable: false,
          token: t,
          type_: t.type_
        });
      } else {
        if (!t.scope) {
          t.scope = $unwrapTraitObject($unwrapTraitObject(self).scope).createChild();
          $unwrapTraitObject(self).scope = t.scope;
          var __PUCK__value__48 = t.type_._class;
          if ($unwrapTraitObject(__PUCK__value__48).kind == "Some") {
            (function () {
              var _PUCK__value__48$val = _slicedToArray(__PUCK__value__48.value, 1),
                  _class = _PUCK__value__48$val[0];

              _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: t.typeParameters, $isTraitObject: true }, function (p) {
                $unwrapTraitObject(self).visitTypeParameter(p);
                return _class.typeParameters.push(p.type_);
              });
            })();
          };
          $unwrapTraitObject(t.scope).setSelfBinding(t.name.name);
          return $unwrapTraitObject(self).scope = $unwrapTraitObject($unwrapTraitObject(self).scope).parent;
        } else {
          $unwrapTraitObject(self).scope = t.scope;
          var __PUCK__value__49 = t.bound;
          if ($unwrapTraitObject(__PUCK__value__49).kind == "Some") {
            var _PUCK__value__49$val = _slicedToArray(__PUCK__value__49.value, 1),
                _typeBound = _PUCK__value__49$val[0];

            $unwrapTraitObject(self).visitTypeBound(_typeBound);
            var __PUCK__value__50 = t.type_.kind;
            var __PUCK__value__51 = __PUCK__value__50;
            if ($unwrapTraitObject(__PUCK__value__51).kind == "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__51).value)[$unwrapTraitObject(0)]).kind).kind == "Record") {
              var _PUCK__value__51$val = _slicedToArray(__PUCK__value__51.value, 1),
                  _PUCK__value__51$val$ = _slicedToArray(_PUCK__value__51$val[0].kind.value, 1),
                  properties = _PUCK__value__51$val$[0].properties;

              $unwrapTraitObject(_js._Object).assign(properties, _core.ObjectMap.fromIter(_core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: _ast.TypeBound.getRecordTypeBound.call(_typeBound).properties, $isTraitObject: true }, function (p) {
                return [p.name.name, _ast.TypeBound.getType.call(p.typeBound)];
              })));
            } else {
              var __PUCK__value__52 = __PUCK__value__50;
              if ($unwrapTraitObject(__PUCK__value__52).kind == "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__52).value)[$unwrapTraitObject(0)]).kind).kind == "Tuple") {
                var _PUCK__value__52$val = _slicedToArray(__PUCK__value__52.value, 1),
                    _PUCK__value__52$val$ = _slicedToArray(_PUCK__value__52$val[0].kind.value, 1),
                    _tuple = _PUCK__value__52$val$[0];

                var __PUCK__value__53 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: _ast.TypeBound.getTupleTypeBound.call(_typeBound).properties, $isTraitObject: true }, function (p) {
                  return _ast.TypeBound.getType.call(p);
                });
                $unwrapTraitObject(_js._Object).assign(_tuple, { properties: _core.Iterable[__PUCK__value__53.type].toList.call(__PUCK__value__53) });
              } else {
                var __PUCK__value__54 = __PUCK__value__50;
                if (true) {
                  var __PUCK__value__55 = __PUCK__value__54;
                };
              };
            };
          };
          return $unwrapTraitObject(self).scope = $unwrapTraitObject($unwrapTraitObject(self).scope).parent;
        };
      };
    },
    visitExportDirective: function visitExportDirective(e) {
      var self = this;
      e.scope = $unwrapTraitObject(self).scope;
      return $unwrapTraitObject(visit).walkExportDirective(self, e);
    },
    visitImportDirective: function visitImportDirective(importDirective) {
      var self = this;
      importDirective.scope = $unwrapTraitObject(self).scope;
      var __PUCK__value__56 = importDirective.specifier;
      var __PUCK__value__57 = __PUCK__value__56;
      if ($unwrapTraitObject(__PUCK__value__57).kind == "Identifier") {
        var _PUCK__value__57$val = _slicedToArray(__PUCK__value__57.value, 1),
            identifier = _PUCK__value__57$val[0];

        return $unwrapTraitObject($unwrapTraitObject(self).scope).define({
          name: identifier.name,
          mutable: false,
          token: identifier
        });
      } else {
        var __PUCK__value__58 = __PUCK__value__56;
        if ($unwrapTraitObject(__PUCK__value__58).kind == "ObjectDestructure") {
          var _PUCK__value__58$val = _slicedToArray(__PUCK__value__58.value, 1),
              d = _PUCK__value__58$val[0];

          return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: d.members, $isTraitObject: true }, function (m) {
            if (importDirective._module) {
              var e = $unwrapTraitObject($unwrapTraitObject(importDirective._module).exports)[m.local.name];
              if (isTypeScope(e)) {
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
        } else {
          var __PUCK__value__59 = __PUCK__value__56;
          if ($unwrapTraitObject(__PUCK__value__59).kind == "Asterisk") {
            var __PUCK__value__60 = __PUCK__value__59;;

            var _PUCK__value__60$val = _slicedToArray(__PUCK__value__60.value, 1),
                __PUCK__value__61 = _PUCK__value__60$val[0];

            ;
            return __PUCK__value__60;
          };
        };
      };
    },
    visitTypeBound: function visitTypeBound(t) {
      var self = this;
      return $unwrapTraitObject(visit).walkTypeBound(self, t);
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
    visitTypeProperty: $unwrapTraitObject($unwrapTraitObject(visit).walkingVisitor).visitTypeProperty
  });
}
