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

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};
function TopLevelVisitor(context, file) {
  var scope = (0, _scope.createScope)(context, file);
  var variableDeclaration = _core.None;
  var reportError = $unwrapTraitObject($unwrapTraitObject(context).reportError).bind(context, file);
  return $unwrapTraitObject(_js._Object).assign({}, $unwrapTraitObject(visit).emptyVisitor, {
    visitBlock: function visitBlock(b) {},
    visitEnumDeclaration: function visitEnumDeclaration(t) {
      var self = this;
      return $unwrapTraitObject(scope).defineType({
        displayName: _core.None,
        name: (0, _core.Some)(t.name.name),
        kind: _entities.TypeKind.Enum({
          implementations: [],
          members: _core.ObjectMap._new()
        }),
        _class: _entities.TypeClass.fromAstNode(t, reportError),
        instance: _core.None
      }, t);
    },
    visitFunctionDeclaration: function visitFunctionDeclaration(f) {
      var self = this;
      var __PUCK__value__1 = f.name;
      if ($unwrapTraitObject(__PUCK__value__1).kind == "Some") {
        var _PUCK__value__1$valu = _slicedToArray(__PUCK__value__1.value, 1),
            name = _PUCK__value__1$valu[0];

        return $unwrapTraitObject(scope).define({
          name: $unwrapTraitObject(name).name,
          token: f,
          mutable: false
        });
      };
    },
    visitModule: function visitModule(m) {
      var self = this;
      m.scope = scope;
      return $unwrapTraitObject(visit).walkModule(self, m);
    },
    visitObjectDestructure: function visitObjectDestructure(i) {
      var self = this;
      return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: i.members, $isTraitObject: true }, function (m) {
        return $unwrapTraitObject(scope).define({
          name: m.local.name,
          mutable: false,
          token: m
        }, true);
      });
    },
    visitTraitDeclaration: function visitTraitDeclaration(t) {
      var self = this;
      return $unwrapTraitObject(scope).defineType({
        displayName: _core.None,
        name: (0, _core.Some)(t.name.name),
        kind: _entities.TypeKind.Trait({
          isShorthand: false,
          functions: _core.ObjectMap._new()
        }),
        _class: _entities.TypeClass.fromAstNode(t, reportError),
        instance: _core.None
      }, t);
    },
    visitTypeDeclaration: function visitTypeDeclaration(t) {
      var self = this;
      var __PUCK__value__2 = t.bound;
      var __PUCK__value__3 = void 0;
      if ($unwrapTraitObject(__PUCK__value__2).kind == "Some") {
        var _PUCK__value__2$valu = _slicedToArray(__PUCK__value__2.value, 1),
            typeBound = _PUCK__value__2$valu[0];

        var __PUCK__value__4 = void 0;
        if ($unwrapTraitObject(typeBound).kind == $unwrapTraitObject(_ast2.SyntaxKind).ObjectTypeBound) {
          __PUCK__value__4 = _entities.StructKind.Record({ properties: _core.ObjectMap._new() });
        } else {
          var __PUCK__value__5 = void 0;
          if ($unwrapTraitObject(typeBound).kind == $unwrapTraitObject(_ast2.SyntaxKind).TupleTypeBound) {
            __PUCK__value__5 = _entities.StructKind.Tuple({ properties: [] });
          } else {
            throw "Unreachable";
          };
          __PUCK__value__4 = __PUCK__value__5;
        };
        __PUCK__value__3 = __PUCK__value__4;
      } else {
        __PUCK__value__3 = _entities.StructKind.Unit;
      };
      var structKind = __PUCK__value__3;
      return $unwrapTraitObject(scope).defineType({
        displayName: _core.None,
        name: (0, _core.Some)(t.name.name),
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: structKind
        }),
        _class: _entities.TypeClass.fromAstNode(t, reportError),
        instance: _core.None
      }, t);
    },
    visitVariableDeclaration: function visitVariableDeclaration(d) {
      var self = this;
      variableDeclaration = (0, _core.Some)(d);
      $unwrapTraitObject(visit).walkVariableDeclaration(self, d);
      return variableDeclaration = _core.None;
    },
    visitExportDirective: function visitExportDirective(e) {
      var self = this;
      return $unwrapTraitObject(visit).walkExportDirective(self, e);
    },
    visitImportDirective: function visitImportDirective(i) {
      var self = this;
      if ($unwrapTraitObject(i.specifier).kind == $unwrapTraitObject(_ast2.SyntaxKind).Identifier) {
        return $unwrapTraitObject(scope).define({
          name: $unwrapTraitObject(i.specifier).name,
          mutable: false,
          token: i
        });
      } else {
        if ($unwrapTraitObject(i.specifier).kind == $unwrapTraitObject(_ast2.SyntaxKind).ObjectDestructure) {
          return $unwrapTraitObject(visit).walkImportDirective(self, i);
        };
      };
    },
    visitPattern: $unwrapTraitObject($unwrapTraitObject(visit).walkingVisitor).visitPattern,
    visitIdentifierPattern: function visitIdentifierPattern(p) {
      var self = this;
      return _core.Option.map.call(variableDeclaration, function (d) {
        return $unwrapTraitObject(scope).define({
          name: p.name,
          mutable: d.mutable,
          token: d
        }, true);
      });
    }
  });
}
