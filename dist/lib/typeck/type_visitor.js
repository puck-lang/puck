'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.TypeVisitor = TypeVisitor;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _path = require('path');

var _ast = require('./../ast/ast');

var _span = require('./../ast/span');

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
    var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__2),
        _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
        __PUCK__value__3 = _$unwrapTraitObject$v[0];

    return true;
  } else {
    var __PUCK__value__4 = __PUCK__value__1;
    if ($unwrapTraitObject(__PUCK__value__4).kind == "TraitDeclaration") {
      var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__4),
          _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
          __PUCK__value__5 = _$unwrapTraitObject2$[0];

      return true;
    } else {
      var __PUCK__value__6 = __PUCK__value__1;
      if ($unwrapTraitObject(__PUCK__value__6).kind == "TypeDeclaration") {
        var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__6),
            _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
            __PUCK__value__7 = _$unwrapTraitObject3$[0];

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
function generateTypeId(context, file, name) {
  var path = (0, _path.relative)($unwrapTraitObject(context).projectPath, file.absolutePath);
  return (0, _core.Some)(path + ":" + name + "");
};
function TypeVisitor(context, file) {
  var reportError = $unwrapTraitObject($unwrapTraitObject(context).reportError).bind(context, file);
  var imports = _core.ObjectMap._new();
  var structureVisitorInstance = (0, _structure_visitor.structureVisitor)(reportError, "TypeVisitor");
  return $unwrapTraitObject(_js._Object).assign({}, visit.emptyVisitor, structureVisitorInstance, {
    scope: _scope.Scope._new(context),
    visitModule: function visitModule(m) {
      var self = this;
      m.scope = $unwrapTraitObject(self).scope;
      var imports = [];
      var declarations = [];
      _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: m.statements, $isTraitObject: true }, function (s) {
        var __PUCK__value__10 = s;
        var __PUCK__value__11 = __PUCK__value__10;
        if ($unwrapTraitObject(__PUCK__value__11).kind == "EnumDeclaration") {
          var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__11),
              _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
              __PUCK__value__12 = _$unwrapTraitObject4$[0];

          return _core.List.add.call(declarations, s);
        } else {
          var __PUCK__value__13 = __PUCK__value__10;
          if ($unwrapTraitObject(__PUCK__value__13).kind == "ImportDirective") {
            var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__13),
                _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
                i = _$unwrapTraitObject5$[0];

            return _core.List.add.call(imports, i);
          } else {
            var __PUCK__value__14 = __PUCK__value__10;
            if ($unwrapTraitObject(__PUCK__value__14).kind == "TraitDeclaration") {
              var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__14),
                  _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
                  __PUCK__value__15 = _$unwrapTraitObject6$[0];

              return _core.List.add.call(declarations, s);
            } else {
              var __PUCK__value__16 = __PUCK__value__10;
              if ($unwrapTraitObject(__PUCK__value__16).kind == "TypeDeclaration") {
                var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__16),
                    _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
                    __PUCK__value__17 = _$unwrapTraitObject7$[0];

                return _core.List.add.call(declarations, s);
              } else {
                var __PUCK__value__18 = __PUCK__value__10;
                if ($unwrapTraitObject(__PUCK__value__18).kind == "ExportDirective") {
                  var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__18),
                      _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
                      e = _$unwrapTraitObject8$[0];

                  var __PUCK__value__19 = e.statement;
                  var __PUCK__value__20 = __PUCK__value__19;
                  if ($unwrapTraitObject(__PUCK__value__20).kind == "EnumDeclaration") {
                    var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__20),
                        _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
                        __PUCK__value__21 = _$unwrapTraitObject9$[0];

                    return _core.List.add.call(declarations, s);
                  } else {
                    var __PUCK__value__22 = __PUCK__value__19;
                    if ($unwrapTraitObject(__PUCK__value__22).kind == "TraitDeclaration") {
                      var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__22),
                          _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
                          __PUCK__value__23 = _$unwrapTraitObject11[0];

                      return _core.List.add.call(declarations, s);
                    } else {
                      var __PUCK__value__24 = __PUCK__value__19;
                      if ($unwrapTraitObject(__PUCK__value__24).kind == "TypeDeclaration") {
                        var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__24),
                            _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12.value, 1),
                            __PUCK__value__25 = _$unwrapTraitObject13[0];

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
      _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: declarations, $isTraitObject: true }, function (e) {
        return $unwrapTraitObject(self).visitTopLevelStatement(e);
      });
      _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: imports, $isTraitObject: true }, function (i) {
        return $unwrapTraitObject(self).visitImportDirective(i);
      });
      _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: declarations, $isTraitObject: true }, function (e) {
        return $unwrapTraitObject(self).visitTopLevelStatement(e);
      });
      return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: declarations, $isTraitObject: true }, function (e) {
        return $unwrapTraitObject(self).visitTopLevelStatement(e);
      });
    },
    visitEnumDeclaration: function visitEnumDeclaration(t) {
      var self = this;
      var parentScope = $unwrapTraitObject(self).scope;
      var type_ = t.type_;
      if (!t.type_) {
        t.type_ = _entities.Type.provides({
          id: generateTypeId(context, file, t.name.name),
          displayName: _core.None,
          name: (0, _core.Some)(t.name.name),
          kind: _entities.TypeKind.Enum({
            implementations: [],
            members: _core.ObjectMap._new()
          }),
          _class: _entities.TypeClass.fromAstNode(t, reportError),
          instance: _core.None,
          providesType: _core.None,
          enumMember: _core.None,
          complete: false
        });
        var token = { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumDeclaration', value: t, $isTraitObject: true };
        var __PUCK__value__32 = _scope.Scope.define.call(parentScope, {
          name: t.name.name,
          token: token,
          mutable: false,
          allowRedeclare: false,
          type_: t.type_,
          previous: _core.None,
          completeType: _core.None
        });
        if ($unwrapTraitObject(__PUCK__value__32).kind == "Err") {
          var _$unwrapTraitObject14 = $unwrapTraitObject(__PUCK__value__32),
              _$unwrapTraitObject15 = _slicedToArray(_$unwrapTraitObject14.value, 1),
              error = _$unwrapTraitObject15[0];

          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: t.name, $isTraitObject: true }, error);
        };
      } else {
        if (!t.scope) {
          var scope = _scope.Scope.createChild.call(parentScope);
          t.scope = scope;
          $unwrapTraitObject(self).scope = scope;
          var __PUCK__value__33 = _core.Option.unwrap.call(type_.providesType)._class;
          if ($unwrapTraitObject(__PUCK__value__33).kind == "Some") {
            (function () {
              var _$unwrapTraitObject16 = $unwrapTraitObject(__PUCK__value__33),
                  _$unwrapTraitObject17 = _slicedToArray(_$unwrapTraitObject16.value, 1),
                  _class = _$unwrapTraitObject17[0];

              _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true }, function (p) {
                $unwrapTraitObject(self).visitTypeParameter(p);
                return _class.typeParameters.push(p.type_);
              });
            })();
          };
          _scope.Scope.setSelfType.call(scope, _core.Option.unwrap.call(type_.providesType));
          $unwrapTraitObject(self).scope = parentScope;
        } else {
          $unwrapTraitObject(self).scope = t.scope;
          _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.members, $isTraitObject: true }, function (m) {
            return $unwrapTraitObject(self).visitEnumMember(m);
          });
          var memberMap = _core.ObjectMap.fromIter(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.members, $isTraitObject: true }, function (p) {
            return [p.name.name, _core.Option.mapOr.call(p.bound, (0, _entities.Type)({
              id: generateTypeId(context, file, t.name.name + "::" + p.name.name),
              displayName: _core.None,
              name: (0, _core.Some)(t.name.name + "::" + p.name.name),
              kind: _entities.TypeKind.Struct({
                implementations: [],
                kind: _entities.StructKind.Unit
              }),
              _class: _core.None,
              instance: _core.None,
              providesType: _core.None,
              enumMember: (0, _core.Some)([p.name.name, _core.Option.unwrap.call(type_.providesType)]),
              complete: true
            }), function (bound) {
              return (0, _entities.Type)({
                id: generateTypeId(context, file, t.name.name + "::" + p.name.name),
                displayName: _core.None,
                name: _core.None,
                kind: _ast.TypeBound.getType.call(bound).kind,
                _class: _core.None,
                instance: _core.None,
                providesType: _core.None,
                enumMember: (0, _core.Some)([p.name.name, _core.Option.unwrap.call(type_.providesType)]),
                complete: true
              });
            })];
          }));
          if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.members, $isTraitObject: true }) != _core.ObjectMap.size.call(memberMap)) {
            (function () {
              var members = _core.ObjectMap._new();
              _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.members, $isTraitObject: true }, function (p) {
                if (members[p.name.name]) {
                  reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumMember', value: p, $isTraitObject: true }, "Duplicate member " + p.name.name);
                };
                return members[p.name.name] = p;
              });
            })();
          };
          var __PUCK__value__34 = _core.Option.unwrap.call(type_.providesType).kind;
          if ($unwrapTraitObject(__PUCK__value__34).kind == "Enum") {
            var _$unwrapTraitObject18 = $unwrapTraitObject(__PUCK__value__34),
                _$unwrapTraitObject19 = _slicedToArray(_$unwrapTraitObject18.value, 1),
                enum_ = _$unwrapTraitObject19[0];

            $unwrapTraitObject(_js._Object).assign(enum_.members, memberMap);
          } else {
            throw "is not an enum";
          };
          $unwrapTraitObject(self).scope = parentScope;
          _core.Option.unwrap.call(type_.providesType).completed = true;
        };
      };
      return [];
    },
    visitTraitDeclaration: function visitTraitDeclaration(t) {
      var self = this;
      var parentScope = $unwrapTraitObject(self).scope;
      var type_ = t.type_;
      if (!t.type_) {
        t.type_ = _entities.Type.provides({
          id: generateTypeId(context, file, t.name.name),
          displayName: _core.None,
          name: (0, _core.Some)(t.name.name),
          kind: _entities.TypeKind.Trait({
            isShorthand: false,
            functions: _core.ObjectMap._new()
          }),
          _class: _entities.TypeClass.fromAstNode(t, reportError),
          instance: _core.None,
          providesType: _core.None,
          enumMember: _core.None,
          complete: false
        });
        var token = { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration', value: t, $isTraitObject: true };
        var __PUCK__value__35 = _scope.Scope.define.call(parentScope, {
          name: t.name.name,
          token: token,
          mutable: false,
          allowRedeclare: false,
          type_: t.type_,
          previous: _core.None,
          completeType: _core.None
        });
        if ($unwrapTraitObject(__PUCK__value__35).kind == "Err") {
          var _$unwrapTraitObject20 = $unwrapTraitObject(__PUCK__value__35),
              _$unwrapTraitObject21 = _slicedToArray(_$unwrapTraitObject20.value, 1),
              error = _$unwrapTraitObject21[0];

          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: t.name, $isTraitObject: true }, error);
        };
      } else {
        if (!t.scope) {
          var scope = _scope.Scope.createChild.call(parentScope);
          t.scope = scope;
          $unwrapTraitObject(self).scope = scope;
          var __PUCK__value__36 = _core.Option.unwrap.call(type_.providesType)._class;
          if ($unwrapTraitObject(__PUCK__value__36).kind == "Some") {
            (function () {
              var _$unwrapTraitObject22 = $unwrapTraitObject(__PUCK__value__36),
                  _$unwrapTraitObject23 = _slicedToArray(_$unwrapTraitObject22.value, 1),
                  _class = _$unwrapTraitObject23[0];

              _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true }, function (p) {
                $unwrapTraitObject(self).visitTypeParameter(p);
                return _class.typeParameters.push(p.type_);
              });
            })();
          };
          _scope.Scope.setSelfType.call(scope, _core.Option.unwrap.call(type_.providesType));
          $unwrapTraitObject(self).scope = parentScope;
        } else {
          $unwrapTraitObject(self).scope = t.scope;
          _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.members, $isTraitObject: true }, function (m) {
            return $unwrapTraitObject(self).visitMethodDeclaration(m, _core.Option.unwrap.call(type_.providesType));
          });
          var __PUCK__value__37 = _core.Option.unwrap.call(type_.providesType).kind;
          if ($unwrapTraitObject(__PUCK__value__37).kind == "Trait") {
            (function () {
              var _$unwrapTraitObject24 = $unwrapTraitObject(__PUCK__value__37),
                  _$unwrapTraitObject25 = _slicedToArray(_$unwrapTraitObject24.value, 1),
                  trait_ = _$unwrapTraitObject25[0];

              $unwrapTraitObject(_js._Object).assign(trait_.functions, _core.ObjectMap.fromIter(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.members, $isTraitObject: true }, function (m) {
                var __PUCK__value__38 = m.type_.kind;
                if ($unwrapTraitObject(__PUCK__value__38).kind == "Function") {
                  var _$unwrapTraitObject26 = $unwrapTraitObject(__PUCK__value__38),
                      _$unwrapTraitObject27 = _slicedToArray(_$unwrapTraitObject26.value, 1),
                      _function = _$unwrapTraitObject27[0];

                  if (_function.isAbstract && _core.Option.isNone.call(_function.selfBinding)) {
                    reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: m, $isTraitObject: true }, "Static trait functions can not be abstract");
                  };
                };
                return [$unwrapTraitObject($unwrapTraitObject(m.name.value)[0]).name, m.type_];
              })));
              var __PUCK__value__39 = _core.Option.unwrap.call(type_.providesType)._class;
              if ($unwrapTraitObject(__PUCK__value__39).kind == "Some") {
                var _$unwrapTraitObject28 = $unwrapTraitObject(__PUCK__value__39),
                    _$unwrapTraitObject29 = _slicedToArray(_$unwrapTraitObject28.value, 1),
                    _class = _$unwrapTraitObject29[0];

                _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _class.instances, $isTraitObject: true }, function (instance) {
                  var __PUCK__value__40 = instance.kind;
                  if ($unwrapTraitObject(__PUCK__value__40).kind == "Trait") {
                    var _$unwrapTraitObject30 = $unwrapTraitObject(__PUCK__value__40),
                        _$unwrapTraitObject31 = _slicedToArray(_$unwrapTraitObject30.value, 1),
                        instanceTrait = _$unwrapTraitObject31[0];

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
          $unwrapTraitObject(self).scope = parentScope;
          _core.Option.unwrap.call(type_.providesType).completed = true;
        };
      };
      return [];
    },
    visitTypeDeclaration: function visitTypeDeclaration(t) {
      var self = this;
      var parentScope = $unwrapTraitObject(self).scope;
      var type_ = t.type_;
      if (!t.type_) {
        var __PUCK__value__41 = t.bound;
        var __PUCK__value__42 = void 0;
        if ($unwrapTraitObject(__PUCK__value__41).kind == "Some") {
          var _$unwrapTraitObject32 = $unwrapTraitObject(__PUCK__value__41),
              _$unwrapTraitObject33 = _slicedToArray(_$unwrapTraitObject32.value, 1),
              typeBound = _$unwrapTraitObject33[0];

          var __PUCK__value__43 = typeBound;
          var __PUCK__value__44 = __PUCK__value__43;
          var __PUCK__value__45 = void 0;
          if ($unwrapTraitObject(__PUCK__value__44).kind == "RecordTypeBound") {
            var _$unwrapTraitObject34 = $unwrapTraitObject(__PUCK__value__44),
                _$unwrapTraitObject35 = _slicedToArray(_$unwrapTraitObject34.value, 1),
                record = _$unwrapTraitObject35[0];

            __PUCK__value__45 = _entities.StructKind.Record({ properties: _core.ObjectMap._new() });
          } else {
            var __PUCK__value__46 = __PUCK__value__43;
            var __PUCK__value__47 = void 0;
            if ($unwrapTraitObject(__PUCK__value__46).kind == "TupleTypeBound") {
              var _$unwrapTraitObject36 = $unwrapTraitObject(__PUCK__value__46),
                  _$unwrapTraitObject37 = _slicedToArray(_$unwrapTraitObject36.value, 1),
                  tuple = _$unwrapTraitObject37[0];

              __PUCK__value__47 = _entities.StructKind.Tuple({ properties: [] });
            } else {
              var __PUCK__value__48 = __PUCK__value__43;
              var __PUCK__value__49 = void 0;
              if (true) {
                var __PUCK__value__50 = __PUCK__value__48;
                throw "Unreachable";
              };
              __PUCK__value__47 = __PUCK__value__49;
            };
            __PUCK__value__45 = __PUCK__value__47;
          };
          __PUCK__value__42 = __PUCK__value__45;
        } else {
          __PUCK__value__42 = _entities.StructKind.Unit;
        };
        var structKind = __PUCK__value__42;
        var __PUCK__value__51 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.attributes, $isTraitObject: true }, function (a) {
          return a.name.name == "type_id";
        });
        var __PUCK__value__52 = void 0;
        if ($unwrapTraitObject(__PUCK__value__51).kind == "Some") {
          var _$unwrapTraitObject38 = $unwrapTraitObject(__PUCK__value__51),
              _$unwrapTraitObject39 = _slicedToArray(_$unwrapTraitObject38.value, 1),
              attribute = _$unwrapTraitObject39[0];

          var __PUCK__value__53 = attribute.data;
          var __PUCK__value__54 = __PUCK__value__53;
          var __PUCK__value__55 = void 0;
          if ($unwrapTraitObject(__PUCK__value__54).kind == "Value") {
            var _$unwrapTraitObject40 = $unwrapTraitObject(__PUCK__value__54),
                _$unwrapTraitObject41 = _slicedToArray(_$unwrapTraitObject40.value, 1),
                literal = _$unwrapTraitObject41[0];

            var __PUCK__value__56 = literal;
            var __PUCK__value__57 = __PUCK__value__56;
            var __PUCK__value__58 = void 0;
            if ($unwrapTraitObject(__PUCK__value__57).kind == "StringLiteral") {
              var _$unwrapTraitObject42 = $unwrapTraitObject(__PUCK__value__57),
                  _$unwrapTraitObject43 = _slicedToArray(_$unwrapTraitObject42.value, 1),
                  value = _$unwrapTraitObject43[0].value;

              __PUCK__value__58 = (0, _core.Some)(value);
            } else {
              var __PUCK__value__59 = __PUCK__value__56;
              var __PUCK__value__60 = void 0;
              if (true) {
                var __PUCK__value__61 = __PUCK__value__59;
                reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Attribute', value: attribute, $isTraitObject: true }, "type_id must be a string");
                __PUCK__value__60 = generateTypeId(context, file, t.name.name);
              };
              __PUCK__value__58 = __PUCK__value__60;
            };
            __PUCK__value__55 = __PUCK__value__58;
          } else {
            var __PUCK__value__62 = __PUCK__value__53;
            var __PUCK__value__63 = void 0;
            if (true) {
              var __PUCK__value__64 = __PUCK__value__62;
              reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Attribute', value: attribute, $isTraitObject: true }, "type_id must have a value");
              __PUCK__value__63 = generateTypeId(context, file, t.name.name);
            };
            __PUCK__value__55 = __PUCK__value__63;
          };
          __PUCK__value__52 = __PUCK__value__55;
        } else {
          __PUCK__value__52 = generateTypeId(context, file, t.name.name);
        };
        var id = __PUCK__value__52;
        t.type_ = _entities.Type.provides({
          id: id,
          displayName: _core.None,
          name: (0, _core.Some)(t.name.name),
          kind: _entities.TypeKind.Struct({
            implementations: [],
            kind: structKind
          }),
          _class: _entities.TypeClass.fromAstNode(t, reportError),
          instance: _core.None,
          providesType: _core.None,
          enumMember: _core.None,
          complete: false
        });
        var token = { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeDeclaration', value: t, $isTraitObject: true };
        var __PUCK__value__65 = _scope.Scope.define.call(parentScope, {
          name: t.name.name,
          token: token,
          mutable: false,
          allowRedeclare: false,
          type_: t.type_,
          previous: _core.None,
          completeType: _core.None
        });
        if ($unwrapTraitObject(__PUCK__value__65).kind == "Err") {
          var _$unwrapTraitObject44 = $unwrapTraitObject(__PUCK__value__65),
              _$unwrapTraitObject45 = _slicedToArray(_$unwrapTraitObject44.value, 1),
              error = _$unwrapTraitObject45[0];

          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: t.name, $isTraitObject: true }, error);
        };
      } else {
        if (!t.scope) {
          var scope = _scope.Scope.createChild.call(parentScope);
          t.scope = scope;
          $unwrapTraitObject(self).scope = scope;
          var __PUCK__value__66 = _core.Option.unwrap.call(type_.providesType)._class;
          if ($unwrapTraitObject(__PUCK__value__66).kind == "Some") {
            (function () {
              var _$unwrapTraitObject46 = $unwrapTraitObject(__PUCK__value__66),
                  _$unwrapTraitObject47 = _slicedToArray(_$unwrapTraitObject46.value, 1),
                  _class = _$unwrapTraitObject47[0];

              _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true }, function (p) {
                $unwrapTraitObject(self).visitTypeParameter(p);
                return _class.typeParameters.push(p.type_);
              });
            })();
          };
          _scope.Scope.setSelfType.call(scope, _core.Option.unwrap.call(type_.providesType));
          $unwrapTraitObject(self).scope = parentScope;
        } else {
          $unwrapTraitObject(self).scope = t.scope;
          var __PUCK__value__67 = t.bound;
          if ($unwrapTraitObject(__PUCK__value__67).kind == "Some") {
            var _$unwrapTraitObject48 = $unwrapTraitObject(__PUCK__value__67),
                _$unwrapTraitObject49 = _slicedToArray(_$unwrapTraitObject48.value, 1),
                _typeBound = _$unwrapTraitObject49[0];

            $unwrapTraitObject(self).visitTypeBound(_typeBound);
            var __PUCK__value__68 = _core.Option.unwrap.call(type_.providesType).kind;
            var __PUCK__value__69 = __PUCK__value__68;
            if ($unwrapTraitObject(__PUCK__value__69).kind == "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__69).value)[$unwrapTraitObject(0)]).kind).kind == "Record") {
              var _$unwrapTraitObject50 = $unwrapTraitObject(__PUCK__value__69),
                  _$unwrapTraitObject51 = _slicedToArray(_$unwrapTraitObject50.value, 1),
                  _$unwrapTraitObject52 = _slicedToArray(_$unwrapTraitObject51[0].kind.value, 1),
                  properties = _$unwrapTraitObject52[0].properties;

              $unwrapTraitObject(_js._Object).assign(properties, _core.ObjectMap.fromIter(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _ast.TypeBound.getRecordTypeBound.call(_typeBound).properties, $isTraitObject: true }, function (p) {
                return [p.name.name, _ast.TypeBound.getType.call(p.typeBound)];
              })));
            } else {
              var __PUCK__value__70 = __PUCK__value__68;
              if ($unwrapTraitObject(__PUCK__value__70).kind == "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__70).value)[$unwrapTraitObject(0)]).kind).kind == "Tuple") {
                var _$unwrapTraitObject53 = $unwrapTraitObject(__PUCK__value__70),
                    _$unwrapTraitObject54 = _slicedToArray(_$unwrapTraitObject53.value, 1),
                    _$unwrapTraitObject55 = _slicedToArray(_$unwrapTraitObject54[0].kind.value, 1),
                    _tuple = _$unwrapTraitObject55[0];

                var __PUCK__value__71 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _ast.TypeBound.getTupleTypeBound.call(_typeBound).properties, $isTraitObject: true }, function (p) {
                  return _ast.TypeBound.getType.call(p);
                });
                $unwrapTraitObject(_js._Object).assign(_tuple, { properties: _core.Iterable[__PUCK__value__71.type].toList.call(__PUCK__value__71) });
              } else {
                var __PUCK__value__72 = __PUCK__value__68;
                if (true) {
                  var __PUCK__value__73 = __PUCK__value__72;
                };
              };
            };
          };
          $unwrapTraitObject(self).scope = parentScope;
          _core.Option.unwrap.call(type_.providesType).completed = true;
        };
      };
      return [];
    },
    visitExportDirective: function visitExportDirective(e) {
      var self = this;
      e.scope = $unwrapTraitObject(self).scope;
      return visit.walkExportDirective(self, e);
    },
    visitImportDirective: function visitImportDirective(importDirective) {
      var self = this;
      var scope = $unwrapTraitObject(self).scope;
      importDirective.scope = $unwrapTraitObject(self).scope;
      var __PUCK__value__74 = importDirective._module;
      if ($unwrapTraitObject(__PUCK__value__74).kind == "Some") {
        var _$unwrapTraitObject56 = $unwrapTraitObject(__PUCK__value__74),
            _$unwrapTraitObject57 = _slicedToArray(_$unwrapTraitObject56.value, 1),
            _module = _$unwrapTraitObject57[0];

        if (!_module.scope) {
          $unwrapTraitObject(context).runTypeVisitorOnFile(_module.file);
        };
      };
      var __PUCK__value__75 = importDirective.specifier;
      var __PUCK__value__76 = __PUCK__value__75;
      if ($unwrapTraitObject(__PUCK__value__76).kind == "Identifier") {
        var _ret6 = function () {
          var _$unwrapTraitObject58 = $unwrapTraitObject(__PUCK__value__76),
              _$unwrapTraitObject59 = _slicedToArray(_$unwrapTraitObject58.value, 1),
              identifier = _$unwrapTraitObject59[0];

          var token = { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true };
          var __PUCK__value__77 = importDirective._module;
          var __PUCK__value__78 = void 0;
          if ($unwrapTraitObject(__PUCK__value__77).kind == "Some") {
            var _$unwrapTraitObject60 = $unwrapTraitObject(__PUCK__value__77),
                _$unwrapTraitObject61 = _slicedToArray(_$unwrapTraitObject60.value, 1),
                _module2 = _$unwrapTraitObject61[0];

            __PUCK__value__78 = _core.ObjectMap.map.call(_module2.exports, function (exportDirective) {
              return _ast.ExportDirective.getType.call(exportDirective);
            });
          } else {
            __PUCK__value__78 = _core.ObjectMap._new();
          };
          var typeProperties = __PUCK__value__78;
          var type_ = (0, _entities.Type)({
            id: _core.None,
            displayName: (0, _core.Some)(identifier.name),
            name: _core.None,
            kind: _entities.TypeKind.Struct({
              implementations: [],
              kind: _entities.StructKind.Record({ properties: typeProperties })
            }),
            instance: _core.None,
            _class: _core.None,
            providesType: _core.None,
            enumMember: _core.None,
            complete: _core.ObjectMap.all.call(typeProperties, function (type_) {
              return type_ && type_.complete;
            })
          });
          var __PUCK__value__79 = _scope.Scope.define.call(scope, {
            name: identifier.name,
            token: token,
            mutable: false,
            allowRedeclare: false,
            type_: type_,
            previous: _core.None,
            completeType: _core.Option.map.call(importDirective._module, function (_module) {
              return function (visitor) {
                if (visitor == "TypeVisitor") {
                  return _core.None;
                };
                if (visitor == "ImplVisitor") {
                  $unwrapTraitObject(context).runTypeVisitorOnFile(_module.file);
                } else {
                  $unwrapTraitObject(context).runCheckerOnFile(_module.file);
                };
                var moduleScope = _module.scope;
                var typeProperties = _core.ObjectMap.map.call(_module.exports, function (exportDirective) {
                  return _ast.ExportDirective.getType.call(exportDirective);
                });
                var __PUCK__value__80 = type_.kind;
                var __PUCK__value__81 = __PUCK__value__80;
                if ($unwrapTraitObject(__PUCK__value__81).kind == "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__81).value)[$unwrapTraitObject(0)]).kind).kind == "Record") {
                  var _$unwrapTraitObject62 = $unwrapTraitObject(__PUCK__value__81),
                      _$unwrapTraitObject63 = _slicedToArray(_$unwrapTraitObject62.value, 1),
                      _$unwrapTraitObject64 = _slicedToArray(_$unwrapTraitObject63[0].kind.value, 1),
                      record = _$unwrapTraitObject64[0];

                  var r = record;
                  r.properties = typeProperties;
                } else {
                  var __PUCK__value__82 = __PUCK__value__80;
                  if (true) {
                    var __PUCK__value__83 = __PUCK__value__82;
                    throw "Unreachable";
                  };
                };
                return (0, _core.Some)(type_);
              };
            })
          });
          if ($unwrapTraitObject(__PUCK__value__79).kind == "Err") {
            var _$unwrapTraitObject65 = $unwrapTraitObject(__PUCK__value__79),
                _$unwrapTraitObject66 = _slicedToArray(_$unwrapTraitObject65.value, 1),
                error = _$unwrapTraitObject66[0];

            return {
              v: reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true }, error)
            };
          };
        }();

        if ((typeof _ret6 === 'undefined' ? 'undefined' : _typeof(_ret6)) === "object") return _ret6.v;
      } else {
        var __PUCK__value__84 = __PUCK__value__75;
        if ($unwrapTraitObject(__PUCK__value__84).kind == "ObjectDestructure") {
          var _$unwrapTraitObject67 = $unwrapTraitObject(__PUCK__value__84),
              _$unwrapTraitObject68 = _slicedToArray(_$unwrapTraitObject67.value, 1),
              d = _$unwrapTraitObject68[0];

          return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: d.members, $isTraitObject: true }, function (m) {
            var token = { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructureMember', value: m, $isTraitObject: true };
            var __PUCK__value__85 = importDirective._module;
            if ($unwrapTraitObject(__PUCK__value__85).kind == "Some") {
              var _ret7 = function () {
                var _$unwrapTraitObject69 = $unwrapTraitObject(__PUCK__value__85),
                    _$unwrapTraitObject70 = _slicedToArray(_$unwrapTraitObject69.value, 1),
                    _module = _$unwrapTraitObject70[0];

                var moduleScope = _module.scope;
                var importedBinding = _core.Option.unwrapOr.call(_scope.Scope.getBinding.call(moduleScope, m.property.name, "TypeVisitor"), $unwrapTraitObject(_js._Object).assign({}));
                var __PUCK__value__86 = _scope.Scope.define.call(scope, {
                  name: m.local.name,
                  token: token,
                  mutable: false,
                  allowRedeclare: false,
                  type_: importedBinding.type_,
                  previous: _core.None,
                  completeType: (0, _core.Some)(function (visitor) {
                    if (visitor == "TypeVisitor") {
                      return _core.None;
                    };
                    if (visitor == "ImplVisitor") {
                      $unwrapTraitObject(context).runTypeVisitorOnFile(_module.file);
                    } else {
                      $unwrapTraitObject(context).runCheckerOnFile(_module.file);
                    };
                    var externalBinding = _scope.Scope.getBinding.call(moduleScope, m.property.name, visitor);
                    return _core.Option.map.call(externalBinding, function (binding) {
                      return binding.type_;
                    });
                  })
                });
                if ($unwrapTraitObject(__PUCK__value__86).kind == "Err") {
                  var _$unwrapTraitObject71 = $unwrapTraitObject(__PUCK__value__86),
                      _$unwrapTraitObject72 = _slicedToArray(_$unwrapTraitObject71.value, 1),
                      error = _$unwrapTraitObject72[0];

                  reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: m.local, $isTraitObject: true }, error);
                };
                m.local.type_ = importedBinding.type_;
                return {
                  v: imports[m.local.name] = importDirective.file
                };
              }();

              if ((typeof _ret7 === 'undefined' ? 'undefined' : _typeof(_ret7)) === "object") return _ret7.v;
            } else {
              var __PUCK__value__87 = _scope.Scope.define.call(scope, {
                name: m.local.name,
                token: token,
                mutable: false,
                allowRedeclare: false,
                type_: _js._undefined,
                providesType: _core.None,
                previous: _core.None,
                completeType: _core.None
              });
              if ($unwrapTraitObject(__PUCK__value__87).kind == "Err") {
                var _$unwrapTraitObject73 = $unwrapTraitObject(__PUCK__value__87),
                    _$unwrapTraitObject74 = _slicedToArray(_$unwrapTraitObject73.value, 1),
                    error = _$unwrapTraitObject74[0];

                return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: m.local, $isTraitObject: true }, error);
              };
            };
          });
        } else {
          var __PUCK__value__88 = __PUCK__value__75;
          if ($unwrapTraitObject(__PUCK__value__88).kind == "Asterisk") {
            var __PUCK__value__89 = $unwrapTraitObject(__PUCK__value__88);;

            var _PUCK__value__89$val = _slicedToArray(__PUCK__value__89.value, 1),
                __PUCK__value__90 = _PUCK__value__89$val[0];

            ;
            return __PUCK__value__89;
          };
        };
      };
    },
    visitTypeBound: function visitTypeBound(t) {
      var self = this;
      return visit.walkTypeBound(self, t);
    },
    visitNamedTypeBound: function visitNamedTypeBound(t) {
      var self = this;
      var scope = $unwrapTraitObject(self).scope;
      var result = _scope.Scope.getTypePath.call(scope, t.path, "TypeVisitor");
      var __PUCK__value__91 = result;
      var __PUCK__value__92 = __PUCK__value__91;
      if ($unwrapTraitObject(__PUCK__value__92).kind == "Ok") {
        var _$unwrapTraitObject75 = $unwrapTraitObject(__PUCK__value__92),
            _$unwrapTraitObject76 = _slicedToArray(_$unwrapTraitObject75.value, 1),
            binding = _$unwrapTraitObject76[0];
      } else {
        var __PUCK__value__93 = __PUCK__value__91;
        if ($unwrapTraitObject(__PUCK__value__93).kind == "Err") {
          var _$unwrapTraitObject77 = $unwrapTraitObject(__PUCK__value__93),
              _$unwrapTraitObject78 = _slicedToArray(_$unwrapTraitObject77.value, 1),
              err = _$unwrapTraitObject78[0];

          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t, $isTraitObject: true }, err);
        };
      };
      return structureVisitorInstance.visitNamedTypeBound.call(self, t);
    },
    visitTypeProperty: visit.walkingVisitor.visitTypeProperty
  });
}
