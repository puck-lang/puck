'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.TopLevelVisitor = TopLevelVisitor;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _ast = require('./../ast/ast');

var _span = require('./../ast/span');

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
    visitModule: function visitModule(m) {
      var self = this;
      m.scope = scope;
      return $unwrapTraitObject(visit).walkModule(self, m);
    },
    visitEnumDeclaration: function visitEnumDeclaration(t) {
      var self = this;
      return scope.defineType({
        displayName: _core.None,
        name: (0, _core.Some)(t.name.name),
        kind: _entities.TypeKind.Enum({
          implementations: [],
          members: _core.ObjectMap._new()
        }),
        _class: _entities.TypeClass.fromAstNode(t, reportError),
        instance: _core.None
      }, { type: '$EnumDeclaration', value: t, $isTraitObject: true });
    },
    visitTraitDeclaration: function visitTraitDeclaration(t) {
      var self = this;
      return scope.defineType({
        displayName: _core.None,
        name: (0, _core.Some)(t.name.name),
        kind: _entities.TypeKind.Trait({
          isShorthand: false,
          functions: _core.ObjectMap._new()
        }),
        _class: _entities.TypeClass.fromAstNode(t, reportError),
        instance: _core.None
      }, { type: '$TraitDeclaration', value: t, $isTraitObject: true });
    },
    visitTypeDeclaration: function visitTypeDeclaration(t) {
      var self = this;
      var __PUCK__value__1 = t.bound;
      var __PUCK__value__2 = void 0;
      if ($unwrapTraitObject(__PUCK__value__1).kind == "Some") {
        var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__1),
            _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
            typeBound = _$unwrapTraitObject$v[0];

        var __PUCK__value__3 = typeBound;
        var __PUCK__value__4 = __PUCK__value__3;
        var __PUCK__value__5 = void 0;
        if ($unwrapTraitObject(__PUCK__value__4).kind == "RecordTypeBound") {
          var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__4),
              _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
              record = _$unwrapTraitObject2$[0];

          __PUCK__value__5 = _entities.StructKind.Record({ properties: _core.ObjectMap._new() });
        } else {
          var __PUCK__value__6 = __PUCK__value__3;
          var __PUCK__value__7 = void 0;
          if ($unwrapTraitObject(__PUCK__value__6).kind == "TupleTypeBound") {
            var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__6),
                _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
                tuple = _$unwrapTraitObject3$[0];

            __PUCK__value__7 = _entities.StructKind.Tuple({ properties: [] });
          } else {
            var __PUCK__value__8 = __PUCK__value__3;
            var __PUCK__value__9 = void 0;
            if (true) {
              var __PUCK__value__10 = __PUCK__value__8;
              throw "Unreachable";
            };
            __PUCK__value__7 = __PUCK__value__9;
          };
          __PUCK__value__5 = __PUCK__value__7;
        };
        __PUCK__value__2 = __PUCK__value__5;
      } else {
        __PUCK__value__2 = _entities.StructKind.Unit;
      };
      var structKind = __PUCK__value__2;
      return scope.defineType({
        displayName: _core.None,
        name: (0, _core.Some)(t.name.name),
        kind: _entities.TypeKind.Struct({
          implementations: [],
          kind: structKind
        }),
        _class: _entities.TypeClass.fromAstNode(t, reportError),
        instance: _core.None
      }, { type: '$TypeDeclaration', value: t, $isTraitObject: true });
    },
    visitExportDirective: function visitExportDirective(e) {
      var self = this;
      return $unwrapTraitObject(visit).walkExportDirective(self, e);
    },
    visitImportDirective: function visitImportDirective(i) {
      var self = this;
      var __PUCK__value__11 = i.specifier;
      var __PUCK__value__12 = __PUCK__value__11;
      if ($unwrapTraitObject(__PUCK__value__12).kind == "Identifier") {
        var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__12),
            _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
            identifier = _$unwrapTraitObject4$[0];

        return scope.define({
          name: identifier.name,
          mutable: false,
          token: { type: '$Identifier', value: identifier, $isTraitObject: true },
          type_: _js._undefined
        }, false);
      } else {
        var __PUCK__value__13 = __PUCK__value__11;
        if ($unwrapTraitObject(__PUCK__value__13).kind == "ObjectDestructure") {
          var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__13),
              _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
              d = _$unwrapTraitObject5$[0];

          return $unwrapTraitObject(self).visitObjectDestructure(d);
        } else {
          var __PUCK__value__14 = __PUCK__value__11;
          if ($unwrapTraitObject(__PUCK__value__14).kind == "Asterisk") {
            var __PUCK__value__15 = $unwrapTraitObject(__PUCK__value__14);;

            var _PUCK__value__15$val = _slicedToArray(__PUCK__value__15.value, 1),
                __PUCK__value__16 = _PUCK__value__15$val[0];

            ;
            return __PUCK__value__15;
          };
        };
      };
    },
    visitObjectDestructure: function visitObjectDestructure(i) {
      var self = this;
      return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: i.members, $isTraitObject: true }, function (m) {
        return scope.define({
          name: m.local.name,
          mutable: false,
          token: { type: '$ObjectDestructureMember', value: m, $isTraitObject: true },
          type_: _js._undefined
        }, true);
      });
    },
    visitFunctionDeclaration: function visitFunctionDeclaration(f) {
      var self = this;
      var __PUCK__value__17 = f.name;
      if ($unwrapTraitObject(__PUCK__value__17).kind == "Some") {
        var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__17),
            _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
            name = _$unwrapTraitObject6$[0];

        var token = { type: '$FunctionDeclaration', value: f, $isTraitObject: true };
        return scope.define({
          name: name.name,
          token: token,
          mutable: false,
          type_: _js._undefined
        }, false);
      };
    },
    visitVariableDeclaration: function visitVariableDeclaration(d) {
      var self = this;
      variableDeclaration = (0, _core.Some)(d);
      $unwrapTraitObject(visit).walkVariableDeclaration(self, d);
      return variableDeclaration = _core.None;
    },
    visitPattern: $unwrapTraitObject($unwrapTraitObject(visit).walkingVisitor).visitPattern,
    visitIdentifierPattern: function visitIdentifierPattern(p) {
      var self = this;
      return _core.Option.map.call(variableDeclaration, function (d) {
        return scope.define({
          name: p.name,
          mutable: d.mutable,
          token: { type: '$VariableDeclaration', value: d, $isTraitObject: true },
          type_: _js._undefined
        }, true);
      });
    }
  });
}
