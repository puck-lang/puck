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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};
function TopLevelVisitor(context, file) {
  var declarations = _core.ObjectMap._new();
  var reportError = $unwrapTraitObject($unwrapTraitObject(context).reportError).bind(context, file);
  return $unwrapTraitObject(_js._Object).assign({}, visit.emptyVisitor, {
    visitModule: function visitModule(m) {
      var self = this;
      m.declarations = declarations;
      m.file = file;
      return visit.walkModule(self, m);
    },
    visitEnumDeclaration: function visitEnumDeclaration(t) {
      var self = this;
      return _core.ObjectMap.set.call(declarations, t.name.name, { type: '$EnumDeclaration', value: t, $isTraitObject: true });
    },
    visitTraitDeclaration: function visitTraitDeclaration(t) {
      var self = this;
      return _core.ObjectMap.set.call(declarations, t.name.name, { type: '$TraitDeclaration', value: t, $isTraitObject: true });
    },
    visitTypeDeclaration: function visitTypeDeclaration(t) {
      var self = this;
      return _core.ObjectMap.set.call(declarations, t.name.name, { type: '$TypeDeclaration', value: t, $isTraitObject: true });
    },
    visitExportDirective: function visitExportDirective(e) {
      var self = this;
      return visit.walkExportDirective(self, e);
    },
    visitImportDirective: function visitImportDirective(i) {
      var self = this;
      var __PUCK__value__1 = i.specifier;
      var __PUCK__value__2 = __PUCK__value__1;
      if ($unwrapTraitObject(__PUCK__value__2).kind == "Identifier") {
        var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__2),
            _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
            identifier = _$unwrapTraitObject$v[0];

        return _core.ObjectMap.set.call(declarations, identifier.name, { type: '$Identifier', value: identifier, $isTraitObject: true });
      } else {
        var __PUCK__value__3 = __PUCK__value__1;
        if ($unwrapTraitObject(__PUCK__value__3).kind == "ObjectDestructure") {
          var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__3),
              _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
              d = _$unwrapTraitObject2$[0];

          return $unwrapTraitObject(self).visitObjectDestructure(d);
        } else {
          var __PUCK__value__4 = __PUCK__value__1;
          if ($unwrapTraitObject(__PUCK__value__4).kind == "Asterisk") {
            var __PUCK__value__5 = $unwrapTraitObject(__PUCK__value__4);;

            var _PUCK__value__5$valu = _slicedToArray(__PUCK__value__5.value, 1),
                __PUCK__value__6 = _PUCK__value__5$valu[0];

            ;
            return __PUCK__value__5;
          };
        };
      };
    },
    visitObjectDestructure: function visitObjectDestructure(i) {
      var self = this;
      return _core.Iterable['$List<E>'].forEach.call({ type: '$List<E>', value: i.members, $isTraitObject: true }, function (m) {
        return _core.ObjectMap.set.call(declarations, m.local.name, { type: '$ObjectDestructureMember', value: m, $isTraitObject: true });
      });
    },
    visitFunctionDeclaration: function visitFunctionDeclaration(f) {
      var self = this;
      var __PUCK__value__7 = f.name;
      if ($unwrapTraitObject(__PUCK__value__7).kind == "Some") {
        var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__7),
            _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
            name = _$unwrapTraitObject3$[0];

        return _core.ObjectMap.set.call(declarations, name.name, { type: '$FunctionDeclaration', value: f, $isTraitObject: true });
      };
    },
    visitVariableDeclaration: function visitVariableDeclaration(d) {
      var self = this;
      return visit.walkVariableDeclaration(self, d);
    },
    visitPattern: $unwrapTraitObject(visit.walkingVisitor).visitPattern,
    visitIdentifierPattern: function visitIdentifierPattern(p) {
      var self = this;
      return _core.ObjectMap.set.call(declarations, p.name, { type: '$Identifier', value: p, $isTraitObject: true });
    }
  });
}
