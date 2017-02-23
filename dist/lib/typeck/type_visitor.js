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
  if ($unwrapTraitObject(__PUCK__value__1).kind == "EnumDeclaration") {
    var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__1),
        _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
        __PUCK__value__2 = _$unwrapTraitObject$v[0];

    return true;
  } else {
    if ($unwrapTraitObject(__PUCK__value__1).kind == "TraitDeclaration") {
      var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__1),
          _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
          __PUCK__value__3 = _$unwrapTraitObject2$[0];

      return true;
    } else {
      if ($unwrapTraitObject(__PUCK__value__1).kind == "TypeDeclaration") {
        var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__1),
            _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
            __PUCK__value__4 = _$unwrapTraitObject3$[0];

        return true;
      } else {
        if (true) {
          var __PUCK__value__5 = __PUCK__value__1;
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
function getTypeId(declaration, context, file) {
  var reportError = $unwrapTraitObject($unwrapTraitObject(context).reportError).bind(context, file);
  var __PUCK__value__6 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: declaration.attributes, $isTraitObject: true }, function (a) {
    return a.name.name == "type_id";
  });
  if (__PUCK__value__6.kind == "Some") {
    var _PUCK__value__6$valu = _slicedToArray(__PUCK__value__6.value, 1),
        attribute = _PUCK__value__6$valu[0];

    var __PUCK__value__7 = attribute.data;
    if ($unwrapTraitObject(__PUCK__value__7).kind == "Value") {
      var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__7),
          _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
          literal = _$unwrapTraitObject4$[0];

      var __PUCK__value__8 = literal;
      if ($unwrapTraitObject(__PUCK__value__8).kind == "StringLiteral") {
        var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__8),
            _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
            value = _$unwrapTraitObject5$[0].value;

        return (0, _core.Some)(value);
      } else {
        if (true) {
          var __PUCK__value__9 = __PUCK__value__8;
          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Attribute', value: attribute, $isTraitObject: true }, "type_id must be a string");
          return generateTypeId(context, file, declaration.name.name);
        };
      };
    } else {
      if (true) {
        var __PUCK__value__10 = __PUCK__value__7;
        reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Attribute', value: attribute, $isTraitObject: true }, "type_id must have a value");
        return generateTypeId(context, file, declaration.name.name);
      };
    };
  } else {
    return generateTypeId(context, file, declaration.name.name);
  };
};
function TypeVisitor(context, file) {
  var reportError = $unwrapTraitObject($unwrapTraitObject(context).reportError).bind(context, file);
  var imports = _core.ObjectMap._new();
  var structureVisitorInstance = (0, _structure_visitor.structureVisitor)(reportError, "TypeVisitor");
  return _js._Object.assign({}, visit.emptyVisitor, structureVisitorInstance, {
    scope: _scope.Scope._new(context),
    visitModule: function visitModule(m) {
      var self = this;
      m.scope = $unwrapTraitObject(self).scope;
      var imports = [];
      var declarations = [];
      _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: m.statements, $isTraitObject: true }, function (s) {
        var __PUCK__value__11 = s;
        if ($unwrapTraitObject(__PUCK__value__11).kind == "EnumDeclaration") {
          var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__11),
              _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
              __PUCK__value__12 = _$unwrapTraitObject6$[0];

          return _core.List.push.call(declarations, s);
        } else {
          if ($unwrapTraitObject(__PUCK__value__11).kind == "ImportDirective") {
            var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__11),
                _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
                i = _$unwrapTraitObject7$[0];

            return _core.List.push.call(imports, i);
          } else {
            if ($unwrapTraitObject(__PUCK__value__11).kind == "TraitDeclaration") {
              var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__11),
                  _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
                  __PUCK__value__13 = _$unwrapTraitObject8$[0];

              return _core.List.push.call(declarations, s);
            } else {
              if ($unwrapTraitObject(__PUCK__value__11).kind == "TypeDeclaration") {
                var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__11),
                    _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
                    __PUCK__value__14 = _$unwrapTraitObject9$[0];

                return _core.List.push.call(declarations, s);
              } else {
                if ($unwrapTraitObject(__PUCK__value__11).kind == "ExportDirective") {
                  var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__11),
                      _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
                      e = _$unwrapTraitObject11[0];

                  var __PUCK__value__15 = e.statement;
                  if ($unwrapTraitObject(__PUCK__value__15).kind == "EnumDeclaration") {
                    var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__15),
                        _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12.value, 1),
                        __PUCK__value__16 = _$unwrapTraitObject13[0];

                    return _core.List.push.call(declarations, s);
                  } else {
                    if ($unwrapTraitObject(__PUCK__value__15).kind == "TraitDeclaration") {
                      var _$unwrapTraitObject14 = $unwrapTraitObject(__PUCK__value__15),
                          _$unwrapTraitObject15 = _slicedToArray(_$unwrapTraitObject14.value, 1),
                          __PUCK__value__17 = _$unwrapTraitObject15[0];

                      return _core.List.push.call(declarations, s);
                    } else {
                      if ($unwrapTraitObject(__PUCK__value__15).kind == "TypeDeclaration") {
                        var _$unwrapTraitObject16 = $unwrapTraitObject(__PUCK__value__15),
                            _$unwrapTraitObject17 = _slicedToArray(_$unwrapTraitObject16.value, 1),
                            __PUCK__value__18 = _$unwrapTraitObject17[0];

                        return _core.List.push.call(declarations, s);
                      } else {
                        if (true) {
                          var __PUCK__value__19 = __PUCK__value__15;;
                          var __PUCK__value__20 = __PUCK__value__19;;
                          return __PUCK__value__19;
                        };
                      };
                    };
                  };
                } else {
                  if (true) {
                    var __PUCK__value__21 = __PUCK__value__11;;
                    var __PUCK__value__22 = __PUCK__value__21;;
                    return __PUCK__value__21;
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
      var type_ = $unwrapTraitObject(t.type_);
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
          enumMember: _core.None
        });
        var token = { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumDeclaration', value: t, $isTraitObject: true };
        var __PUCK__value__23 = _scope.Scope.define.call(parentScope, {
          name: t.name.name,
          token: token,
          mutable: false,
          allowRedeclare: false,
          type_: $unwrapTraitObject(t.type_),
          previous: _core.None,
          completeType: _core.None
        });
        if (__PUCK__value__23.kind == "Err") {
          var _PUCK__value__23$val = _slicedToArray(__PUCK__value__23.value, 1),
              error = _PUCK__value__23$val[0];

          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: t.name, $isTraitObject: true }, error);
        };
      } else {
        if (!t.scope) {
          var scope = _scope.Scope.createChild.call(parentScope);
          t.scope = scope;
          $unwrapTraitObject(self).scope = scope;
          var __PUCK__value__24 = _core.Option.unwrap.call(type_.providesType)._class;
          if (__PUCK__value__24.kind == "Some") {
            (function () {
              var _PUCK__value__24$val = _slicedToArray(__PUCK__value__24.value, 1),
                  _class = _PUCK__value__24$val[0];

              var c = _class;
              _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true }, function (p) {
                $unwrapTraitObject(self).visitTypeParameter(p);
                return _core.List.push.call(c.typeParameters, $unwrapTraitObject(p.type_));
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
              enumMember: (0, _core.Some)([p.name.name, _core.Option.unwrap.call(type_.providesType)])
            }), function (bound) {
              return (0, _entities.Type)({
                id: generateTypeId(context, file, t.name.name + "::" + p.name.name),
                displayName: _core.None,
                name: _core.None,
                kind: _ast.TypeBound.getType.call(bound).kind,
                _class: _core.None,
                instance: _core.None,
                providesType: _core.None,
                enumMember: (0, _core.Some)([p.name.name, _core.Option.unwrap.call(type_.providesType)])
              });
            })];
          }));
          if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.members, $isTraitObject: true }) != _core.ObjectMap.size.call(memberMap)) {
            (function () {
              var members = _core.ObjectMap._new();
              _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.members, $isTraitObject: true }, function (p) {
                if (_core.ObjectMap.has.call(members, p.name.name)) {
                  reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumMember', value: p, $isTraitObject: true }, "Duplicate member " + p.name.name);
                };
                return members[p.name.name] = p;
              });
            })();
          };
          var __PUCK__value__25 = _core.Option.unwrap.call(type_.providesType).kind;
          if (__PUCK__value__25.kind == "Enum") {
            var _PUCK__value__25$val = _slicedToArray(__PUCK__value__25.value, 1),
                enum_ = _PUCK__value__25$val[0];

            _js._Object.assign(enum_.members, memberMap);
          } else {
            throw "is not an enum";
          };
          $unwrapTraitObject(self).scope = parentScope;
        };
      };
      return [];
    },
    visitTraitDeclaration: function visitTraitDeclaration(t) {
      var self = this;
      var parentScope = $unwrapTraitObject(self).scope;
      var type_ = $unwrapTraitObject(t.type_);
      if (!t.type_) {
        t.type_ = _entities.Type.provides({
          id: getTypeId(t, context, file),
          displayName: _core.None,
          name: (0, _core.Some)(t.name.name),
          kind: _entities.TypeKind.Trait({
            isShorthand: false,
            functions: _core.ObjectMap._new()
          }),
          _class: _entities.TypeClass.fromAstNode(t, reportError),
          instance: _core.None,
          providesType: _core.None,
          enumMember: _core.None
        });
        var token = { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration', value: t, $isTraitObject: true };
        var __PUCK__value__26 = _scope.Scope.define.call(parentScope, {
          name: t.name.name,
          token: token,
          mutable: false,
          allowRedeclare: false,
          type_: $unwrapTraitObject(t.type_),
          previous: _core.None,
          completeType: _core.None
        });
        if (__PUCK__value__26.kind == "Err") {
          var _PUCK__value__26$val = _slicedToArray(__PUCK__value__26.value, 1),
              error = _PUCK__value__26$val[0];

          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: t.name, $isTraitObject: true }, error);
        };
      } else {
        if (!t.scope) {
          var scope = _scope.Scope.createChild.call(parentScope);
          t.scope = scope;
          $unwrapTraitObject(self).scope = scope;
          var __PUCK__value__27 = _core.Option.unwrap.call(type_.providesType)._class;
          if (__PUCK__value__27.kind == "Some") {
            (function () {
              var _PUCK__value__27$val = _slicedToArray(__PUCK__value__27.value, 1),
                  _class = _PUCK__value__27$val[0];

              var c = _class;
              _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true }, function (p) {
                $unwrapTraitObject(self).visitTypeParameter(p);
                return _core.List.push.call(c.typeParameters, $unwrapTraitObject(p.type_));
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
          var __PUCK__value__28 = _core.Option.unwrap.call(type_.providesType).kind;
          if (__PUCK__value__28.kind == "Trait") {
            (function () {
              var _PUCK__value__28$val = _slicedToArray(__PUCK__value__28.value, 1),
                  trait_ = _PUCK__value__28$val[0];

              _js._Object.assign(trait_.functions, _core.ObjectMap.fromIter(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.members, $isTraitObject: true }, function (m) {
                var __PUCK__value__29 = m.type_.kind;
                if (__PUCK__value__29.kind == "Function") {
                  var _PUCK__value__29$val = _slicedToArray(__PUCK__value__29.value, 1),
                      _function = _PUCK__value__29$val[0];

                  if (_function.isAbstract && _core.Option.isNone.call(_function.selfBinding)) {
                    reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: m, $isTraitObject: true }, "Static trait functions can not be abstract");
                  };
                };
                return [_core.Option.unwrap.call(m.name).name, m.type_];
              })));
              var __PUCK__value__30 = _core.Option.unwrap.call(type_.providesType)._class;
              if (__PUCK__value__30.kind == "Some") {
                var _PUCK__value__30$val = _slicedToArray(__PUCK__value__30.value, 1),
                    _class = _PUCK__value__30$val[0];

                _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _class.instances, $isTraitObject: true }, function (instance) {
                  var __PUCK__value__31 = instance.kind;
                  if (__PUCK__value__31.kind == "Trait") {
                    var _PUCK__value__31$val = _slicedToArray(__PUCK__value__31.value, 1),
                        instanceTrait = _PUCK__value__31$val[0];

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
          $unwrapTraitObject(self).scope = parentScope;
        };
      };
      return [];
    },
    visitTypeDeclaration: function visitTypeDeclaration(t) {
      var self = this;
      var parentScope = $unwrapTraitObject(self).scope;
      var type_ = $unwrapTraitObject(t.type_);
      if (!t.type_) {
        var __PUCK__value__32 = t.bound;
        var __PUCK__value__33 = void 0;
        if (__PUCK__value__32.kind == "Some") {
          var _PUCK__value__32$val = _slicedToArray(__PUCK__value__32.value, 1),
              typeBound = _PUCK__value__32$val[0];

          var __PUCK__value__34 = typeBound;
          var __PUCK__value__35 = void 0;
          if ($unwrapTraitObject(__PUCK__value__34).kind == "RecordTypeBound") {
            var _$unwrapTraitObject18 = $unwrapTraitObject(__PUCK__value__34),
                _$unwrapTraitObject19 = _slicedToArray(_$unwrapTraitObject18.value, 1),
                record = _$unwrapTraitObject19[0];

            __PUCK__value__35 = _entities.StructKind.Record({ properties: _core.ObjectMap._new() });
          } else {
            var __PUCK__value__36 = void 0;
            if ($unwrapTraitObject(__PUCK__value__34).kind == "TupleTypeBound") {
              var _$unwrapTraitObject20 = $unwrapTraitObject(__PUCK__value__34),
                  _$unwrapTraitObject21 = _slicedToArray(_$unwrapTraitObject20.value, 1),
                  tuple = _$unwrapTraitObject21[0];

              __PUCK__value__36 = _entities.StructKind.Tuple({ properties: [] });
            } else {
              var __PUCK__value__37 = void 0;
              if (true) {
                var __PUCK__value__38 = __PUCK__value__34;
                throw "Unreachable";
              };
              __PUCK__value__36 = __PUCK__value__37;
            };
            __PUCK__value__35 = __PUCK__value__36;
          };
          __PUCK__value__33 = __PUCK__value__35;
        } else {
          __PUCK__value__33 = _entities.StructKind.Unit;
        };
        var structKind = __PUCK__value__33;
        t.type_ = _entities.Type.provides({
          id: getTypeId(t, context, file),
          displayName: _core.None,
          name: (0, _core.Some)(t.name.name),
          kind: _entities.TypeKind.Struct({
            implementations: [],
            kind: structKind
          }),
          _class: _entities.TypeClass.fromAstNode(t, reportError),
          instance: _core.None,
          providesType: _core.None,
          enumMember: _core.None
        });
        var token = { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeDeclaration', value: t, $isTraitObject: true };
        var __PUCK__value__39 = _scope.Scope.define.call(parentScope, {
          name: t.name.name,
          token: token,
          mutable: false,
          allowRedeclare: false,
          type_: $unwrapTraitObject(t.type_),
          previous: _core.None,
          completeType: _core.None
        });
        if (__PUCK__value__39.kind == "Err") {
          var _PUCK__value__39$val = _slicedToArray(__PUCK__value__39.value, 1),
              error = _PUCK__value__39$val[0];

          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: t.name, $isTraitObject: true }, error);
        };
      } else {
        if (!t.scope) {
          var scope = _scope.Scope.createChild.call(parentScope);
          t.scope = scope;
          $unwrapTraitObject(self).scope = scope;
          var __PUCK__value__40 = _core.Option.unwrap.call(type_.providesType)._class;
          if (__PUCK__value__40.kind == "Some") {
            (function () {
              var _PUCK__value__40$val = _slicedToArray(__PUCK__value__40.value, 1),
                  _class = _PUCK__value__40$val[0];

              var c = _class;
              _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true }, function (p) {
                $unwrapTraitObject(self).visitTypeParameter(p);
                return _core.List.push.call(c.typeParameters, $unwrapTraitObject(p.type_));
              });
            })();
          };
          _scope.Scope.setSelfType.call(scope, _core.Option.unwrap.call(type_.providesType));
          $unwrapTraitObject(self).scope = parentScope;
        } else {
          $unwrapTraitObject(self).scope = t.scope;
          var __PUCK__value__41 = t.bound;
          if (__PUCK__value__41.kind == "Some") {
            var _PUCK__value__41$val = _slicedToArray(__PUCK__value__41.value, 1),
                _typeBound = _PUCK__value__41$val[0];

            $unwrapTraitObject(self).visitTypeBound(_typeBound);
            var __PUCK__value__42 = _core.Option.unwrap.call(type_.providesType).kind;
            if ($unwrapTraitObject(__PUCK__value__42).kind == "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__42).value)[0]).kind).kind == "Record") {
              var _$unwrapTraitObject22 = $unwrapTraitObject(__PUCK__value__42),
                  _$unwrapTraitObject23 = _slicedToArray(_$unwrapTraitObject22.value, 1),
                  _$unwrapTraitObject24 = _slicedToArray(_$unwrapTraitObject23[0].kind.value, 1),
                  properties = _$unwrapTraitObject24[0].properties;

              _js._Object.assign(properties, _core.ObjectMap.fromIter(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _ast.TypeBound.getRecordTypeBound.call(_typeBound).properties, $isTraitObject: true }, function (p) {
                return [p.name.name, _ast.TypeBound.getType.call(p.typeBound)];
              })));
            } else {
              if ($unwrapTraitObject(__PUCK__value__42).kind == "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__42).value)[0]).kind).kind == "Tuple") {
                var _$unwrapTraitObject25 = $unwrapTraitObject(__PUCK__value__42),
                    _$unwrapTraitObject26 = _slicedToArray(_$unwrapTraitObject25.value, 1),
                    _$unwrapTraitObject27 = _slicedToArray(_$unwrapTraitObject26[0].kind.value, 1),
                    _tuple = _$unwrapTraitObject27[0];

                var __PUCK__value__43 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _ast.TypeBound.getTupleTypeBound.call(_typeBound).properties, $isTraitObject: true }, function (p) {
                  return _ast.TypeBound.getType.call(p);
                });
                _js._Object.assign(_tuple, { properties: _core.Iterable[__PUCK__value__43.type].toList.call(__PUCK__value__43) });
              } else {
                if (true) {
                  var __PUCK__value__44 = __PUCK__value__42;
                };
              };
            };
          };
          $unwrapTraitObject(self).scope = parentScope;
        };
      };
      return [];
    },
    visitExportDirective: function visitExportDirective(e) {
      var self = this;
      return visit.walkExportDirective(self, e);
    },
    visitImportDirective: function visitImportDirective(importDirective) {
      var self = this;
      var scope = $unwrapTraitObject(self).scope;
      var __PUCK__value__45 = importDirective._module;
      if (__PUCK__value__45.kind == "Some") {
        var _PUCK__value__45$val = _slicedToArray(__PUCK__value__45.value, 1),
            _module = _PUCK__value__45$val[0];

        if (!_module.scope) {
          $unwrapTraitObject(context).runTypeVisitorOnFile(_module.file);
        };
      };
      var __PUCK__value__46 = importDirective.specifier;
      if ($unwrapTraitObject(__PUCK__value__46).kind == "Identifier") {
        var _ret6 = function () {
          var _$unwrapTraitObject28 = $unwrapTraitObject(__PUCK__value__46),
              _$unwrapTraitObject29 = _slicedToArray(_$unwrapTraitObject28.value, 1),
              identifier = _$unwrapTraitObject29[0];

          var token = { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true };
          var __PUCK__value__47 = importDirective._module;
          var __PUCK__value__48 = void 0;
          if (__PUCK__value__47.kind == "Some") {
            var _PUCK__value__47$val = _slicedToArray(__PUCK__value__47.value, 1),
                _module2 = _PUCK__value__47$val[0];

            __PUCK__value__48 = _core.ObjectMap.map.call(_module2.exports, function (exportDirective) {
              return _ast.ExportDirective.getType.call(exportDirective);
            });
          } else {
            __PUCK__value__48 = _core.ObjectMap._new();
          };
          var typeProperties = __PUCK__value__48;
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
            enumMember: _core.None
          });
          var __PUCK__value__49 = _scope.Scope.define.call(scope, {
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
                var moduleScope = $unwrapTraitObject(_module.scope);
                var typeProperties = _core.ObjectMap.map.call(_module.exports, function (exportDirective) {
                  return _ast.ExportDirective.getType.call(exportDirective);
                });
                var __PUCK__value__50 = type_.kind;
                if ($unwrapTraitObject(__PUCK__value__50).kind == "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__50).value)[0]).kind).kind == "Record") {
                  var _$unwrapTraitObject30 = $unwrapTraitObject(__PUCK__value__50),
                      _$unwrapTraitObject31 = _slicedToArray(_$unwrapTraitObject30.value, 1),
                      _$unwrapTraitObject32 = _slicedToArray(_$unwrapTraitObject31[0].kind.value, 1),
                      record = _$unwrapTraitObject32[0];

                  var r = record;
                  r.properties = typeProperties;
                } else {
                  if (true) {
                    var __PUCK__value__51 = __PUCK__value__50;
                    throw "Unreachable";
                  };
                };
                return (0, _core.Some)(type_);
              };
            })
          });
          if (__PUCK__value__49.kind == "Err") {
            var _PUCK__value__49$val = _slicedToArray(__PUCK__value__49.value, 1),
                error = _PUCK__value__49$val[0];

            return {
              v: reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true }, error)
            };
          };
        }();

        if ((typeof _ret6 === 'undefined' ? 'undefined' : _typeof(_ret6)) === "object") return _ret6.v;
      } else {
        if ($unwrapTraitObject(__PUCK__value__46).kind == "ObjectDestructure") {
          var _$unwrapTraitObject33 = $unwrapTraitObject(__PUCK__value__46),
              _$unwrapTraitObject34 = _slicedToArray(_$unwrapTraitObject33.value, 1),
              d = _$unwrapTraitObject34[0];

          return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: d.members, $isTraitObject: true }, function (m) {
            var token = { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructureMember', value: m, $isTraitObject: true };
            var __PUCK__value__52 = importDirective._module;
            if (__PUCK__value__52.kind == "Some") {
              var _ret7 = function () {
                var _PUCK__value__52$val = _slicedToArray(__PUCK__value__52.value, 1),
                    _module = _PUCK__value__52$val[0];

                var moduleScope = $unwrapTraitObject(_module.scope);
                var importedBinding = _core.Option.unwrapOr.call(_scope.Scope.getBinding.call(moduleScope, m.property.name, "TypeVisitor"), $unwrapTraitObject(_js._Object.assign({})));
                var __PUCK__value__53 = _scope.Scope.define.call(scope, {
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
                if (__PUCK__value__53.kind == "Err") {
                  var _PUCK__value__53$val = _slicedToArray(__PUCK__value__53.value, 1),
                      error = _PUCK__value__53$val[0];

                  reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: m.local, $isTraitObject: true }, error);
                };
                m.local.type_ = importedBinding.type_;
                imports[m.local.name] = importDirective.file;
                return {
                  v: []
                };
              }();

              if ((typeof _ret7 === 'undefined' ? 'undefined' : _typeof(_ret7)) === "object") return _ret7.v;
            } else {
              var __PUCK__value__54 = _scope.Scope.define.call(scope, {
                name: m.local.name,
                token: token,
                mutable: false,
                allowRedeclare: false,
                type_: $unwrapTraitObject(_js._undefined),
                providesType: _core.None,
                previous: _core.None,
                completeType: _core.None
              });
              if (__PUCK__value__54.kind == "Err") {
                var _PUCK__value__54$val = _slicedToArray(__PUCK__value__54.value, 1),
                    error = _PUCK__value__54$val[0];

                return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: m.local, $isTraitObject: true }, error);
              };
            };
          });
        } else {
          if ($unwrapTraitObject(__PUCK__value__46).kind == "Asterisk") {
            var __PUCK__value__55 = $unwrapTraitObject(__PUCK__value__46);;

            var _PUCK__value__55$val = _slicedToArray(__PUCK__value__55.value, 1),
                __PUCK__value__56 = _PUCK__value__55$val[0];

            ;
            return __PUCK__value__55;
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
      var __PUCK__value__57 = result;
      if ($unwrapTraitObject(__PUCK__value__57).kind == "Ok") {
        var _$unwrapTraitObject35 = $unwrapTraitObject(__PUCK__value__57),
            _$unwrapTraitObject36 = _slicedToArray(_$unwrapTraitObject35.value, 1),
            binding = _$unwrapTraitObject36[0];
      } else {
        if ($unwrapTraitObject(__PUCK__value__57).kind == "Err") {
          var _$unwrapTraitObject37 = $unwrapTraitObject(__PUCK__value__57),
              _$unwrapTraitObject38 = _slicedToArray(_$unwrapTraitObject37.value, 1),
              err = _$unwrapTraitObject38[0];

          reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t, $isTraitObject: true }, err);
        };
      };
      return structureVisitorInstance.visitNamedTypeBound.call(self, t);
    },
    visitTypeProperty: visit.walkingVisitor.visitTypeProperty
  });
}
