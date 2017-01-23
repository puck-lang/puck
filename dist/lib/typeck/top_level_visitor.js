'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.TopLevelVisitor = TopLevelVisitor;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _ast = require('./../ast/ast');

var _visit = require('./../ast/visit');

var visit = _interopRequireWildcard(_visit);

var _ast2 = require('./../compiler/ast');

var _entities = require('./../entities');

var _scope = require('./src/scope');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function TopLevelVisitor(context, file) {
  var scope = (0, _scope.createScope)(context, file);
  var variableDeclaration = _core.None;
  var reportError = context.reportError.bind(context, file);
  return _js._Object.assign({}, visit.emptyVisitor, {
    visitBlock: function visitBlock(b) {},
    visitEnumDeclaration: function visitEnumDeclaration(t) {
      var self = this;
      return scope.defineType({
        displayName: _core.None,
        name: (0, _core.Some)(t.name.name),
        kind: _entities.TypeKind.Enum({
          implementations: [],
          members: _core.ObjectMap._new.call(_core.ObjectMap)
        }),
        _class: _entities.TypeClass.fromAstNode.call(_entities.TypeClass, t, reportError),
        instance: _core.None
      }, t);
    },
    visitFunctionDeclaration: function visitFunctionDeclaration(f) {
      var self = this;
      var __PUCK__value__1 = f.name;
      if (__PUCK__value__1.kind == "Some") {
        var _PUCK__value__1$valu = _slicedToArray(__PUCK__value__1.value, 1),
            name = _PUCK__value__1$valu[0];

        return scope.define({
          name: name.name,
          token: f,
          mutable: false
        });
      };
    },
    visitModule: function visitModule(m) {
      var self = this;
      m.scope = scope;
      return visit.walkModule(self, m);
    },
    visitObjectDestructure: function visitObjectDestructure(i) {
      var self = this;
      return _core.Iterable['$List<E>'].forEach.call(i.members, function (m) {
        return scope.define({
          name: m.local.name,
          mutable: false,
          token: m
        }, true);
      });
    },
    visitTraitDeclaration: function visitTraitDeclaration(t) {
      var self = this;
      return scope.defineType({
        displayName: _core.None,
        name: (0, _core.Some)(t.name.name),
        kind: _entities.TypeKind.Trait({
          isShorthand: false,
          functions: _core.ObjectMap._new.call(_core.ObjectMap)
        }),
        _class: _entities.TypeClass.fromAstNode.call(_entities.TypeClass, t, reportError),
        instance: _core.None
      }, t);
    },
    visitTypeDeclaration: function visitTypeDeclaration(t) {
      var self = this;
      var __PUCK__value__2 = t.bound;
      var __PUCK__value__3 = void 0;
      if (__PUCK__value__2.kind == "Some") {
        var _PUCK__value__2$valu = _slicedToArray(__PUCK__value__2.value, 1),
            typeBound = _PUCK__value__2$valu[0];

        var __PUCK__value__4 = void 0;
        if (typeBound.kind == _ast2.SyntaxKind.ObjectTypeBound) {
          __PUCK__value__4 = _entities.StructKind.Record({ properties: _core.ObjectMap._new.call(_core.ObjectMap) });
        } else {
          var __PUCK__value__5 = void 0;
          if (typeBound.kind == _ast2.SyntaxKind.TupleTypeBound) {
            __PUCK__value__5 = _entities.StructKind.Tuple({ properties: [] });
          };
          __PUCK__value__4 = __PUCK__value__5;
        };
        __PUCK__value__3 = __PUCK__value__4;
      } else {
        __PUCK__value__3 = _entities.StructKind.Unit;
      };
      var structKind = __PUCK__value__3;
      return scope.defineType({
        displayName: _core.None,
        name: (0, _core.Some)(t.name.name),
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: structKind
        }),
        _class: _entities.TypeClass.fromAstNode.call(_entities.TypeClass, t, reportError),
        instance: _core.None
      }, t);
    },
    visitVariableDeclaration: function visitVariableDeclaration(d) {
      var self = this;
      variableDeclaration = (0, _core.Some)(d);
      visit.walkVariableDeclaration(self, d);
      return variableDeclaration = _core.None;
    },
    visitExportDirective: function visitExportDirective(e) {
      var self = this;
      return visit.walkExportDirective(self, e);
    },
    visitImportDirective: function visitImportDirective(i) {
      var self = this;
      if (i.specifier.kind == _ast2.SyntaxKind.Identifier) {
        return scope.define({
          name: i.specifier.name,
          mutable: false,
          token: i
        });
      } else {
        if (i.specifier.kind == _ast2.SyntaxKind.ObjectDestructure) {
          return visit.walkImportDirective(self, i);
        };
      };
    },
    visitPattern: visit.walkingVisitor.visitPattern,
    visitIdentifierPattern: function visitIdentifierPattern(p) {
      var self = this;
      return _core.Option.map.call(variableDeclaration, function (d) {
        return scope.define({
          name: p.name,
          mutable: d.mutable,
          token: d
        }, true);
      });
    }
  });
}
