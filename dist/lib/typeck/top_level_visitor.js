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
  return _js._Object.assign({}, visit.emptyVisitor, {
    visitModule: function visitModule(m) {
      var self = this;
      m.declarations = declarations;
      m.file = file;
      return visit.walkModule(self, m);
    },
    visitEnumDeclaration: function visitEnumDeclaration(t) {
      var self = this;
      return _core.ObjectMap.set.call(declarations, t.name.name, { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumDeclaration', value: t, $isTraitObject: true });
    },
    visitTraitDeclaration: function visitTraitDeclaration(t) {
      var self = this;
      return _core.ObjectMap.set.call(declarations, t.name.name, { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration', value: t, $isTraitObject: true });
    },
    visitTypeDeclaration: function visitTypeDeclaration(t) {
      var self = this;
      return _core.ObjectMap.set.call(declarations, t.name.name, { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeDeclaration', value: t, $isTraitObject: true });
    },
    visitExportDirective: function visitExportDirective(e) {
      var self = this;
      return visit.walkExportDirective(self, e);
    },
    visitImportDirective: function visitImportDirective(i) {
      var self = this;
      var __PUCK__value__1 = i.specifier;
      if ($unwrapTraitObject(__PUCK__value__1).kind == "Identifier") {
        var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__1),
            _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
            identifier = _$unwrapTraitObject$v[0];

        return _core.ObjectMap.set.call(declarations, identifier.name, { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true });
      } else {
        if ($unwrapTraitObject(__PUCK__value__1).kind == "ObjectDestructure") {
          var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__1),
              _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
              d = _$unwrapTraitObject2$[0];

          return $unwrapTraitObject(self).visitObjectDestructure(d);
        } else {
          if ($unwrapTraitObject(__PUCK__value__1).kind == "Asterisk") {
            var __PUCK__value__2 = $unwrapTraitObject(__PUCK__value__1);;

            var _PUCK__value__2$valu = _slicedToArray(__PUCK__value__2.value, 1),
                __PUCK__value__3 = _PUCK__value__2$valu[0];

            ;
            return __PUCK__value__2;
          };
        };
      };
    },
    visitObjectDestructure: function visitObjectDestructure(i) {
      var self = this;
      return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true }, function (m) {
        return _core.ObjectMap.set.call(declarations, m.local.name, { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructureMember', value: m, $isTraitObject: true });
      });
    },
    visitFunctionDeclaration: function visitFunctionDeclaration(f) {
      var self = this;
      var __PUCK__value__4 = f.name;
      if (__PUCK__value__4.kind == "Some") {
        var _PUCK__value__4$valu = _slicedToArray(__PUCK__value__4.value, 1),
            name = _PUCK__value__4$valu[0];

        return _core.ObjectMap.set.call(declarations, name.name, { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: f, $isTraitObject: true });
      };
    },
    visitVariableDeclaration: function visitVariableDeclaration(d) {
      var self = this;
      return visit.walkVariableDeclaration(self, d);
    },
    visitPattern: visit.walkingVisitor.visitPattern,
    visitIdentifierPattern: function visitIdentifierPattern(p) {
      var self = this;
      return _core.ObjectMap.set.call(declarations, p.name, { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: p, $isTraitObject: true });
    }
  });
}
