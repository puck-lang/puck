'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.ImportVisitor = ImportVisitor;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _fs = require('fs');

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _ast = require('./../ast/ast');

var _span = require('./../ast/span');

var _visit = require('./../ast/visit');

var visit = _interopRequireWildcard(_visit);

var _entities = require('./../entities');

var _ast2 = require('./../compiler/ast');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};

var domains = ["node", "puck"];
var puckFile = (0, _js.RegExp)("\\.puck$", "i");
var puckModules = ["core", "js", "test"];
function ImportVisitor(context, file) {
  var reportError = $unwrapTraitObject($unwrapTraitObject(context).reportError).bind(context, file);
  var declarations = void 0;
  function importModule(i, importedFile) {
    var contextFile = $unwrapTraitObject(context).importFile(importedFile);
    var _module = $unwrapTraitObject(contextFile).ast;
    if (!_module) {
      return $unwrapTraitObject(context).defer(importedFile, function () {
        return importModule(i, importedFile);
      });
    };
    var __PUCK__value__1 = i.specifier;
    var __PUCK__value__2 = __PUCK__value__1;
    if ($unwrapTraitObject(__PUCK__value__2).kind == "ObjectDestructure") {
      var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__2),
          _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
          o = _$unwrapTraitObject$v[0];

      _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: o.members, $isTraitObject: true }, function (m) {
        if (!_core.ObjectMap.has.call(_module.exports, m.property.name)) {
          return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructureMember', value: m, $isTraitObject: true }, importedFile.fileName + " has no export named " + m.property.name);
        };
      });
    } else {
      var __PUCK__value__3 = __PUCK__value__1;
      if ($unwrapTraitObject(__PUCK__value__3).kind == "Asterisk") {
        var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__3),
            _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
            token = _$unwrapTraitObject2$[0];

        var __PUCK__value__5 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _core.ObjectMap.keys.call(_module.exports), $isTraitObject: true }, function (e) {
          return !_core.ObjectMap.has.call(declarations, e);
        });
        var __PUCK__value__4 = _core.Iterable[__PUCK__value__5.type].map.call(__PUCK__value__5, function (e) {
          var property = $unwrapTraitObject(_core.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({ type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: _module.exports, $isTraitObject: true }, e)).identifier;
          return {
            property: property,
            local: property
          };
        });
        i.specifier = _ast.ImportSpecifier.ObjectDestructure({
          openBrace: token,
          closeBrace: token,
          members: _core.Iterable[__PUCK__value__4.type].toList.call(__PUCK__value__4)
        });
      } else {
        var __PUCK__value__6 = __PUCK__value__1;
        if ($unwrapTraitObject(__PUCK__value__6).kind == "Identifier") {
          var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__6),
              _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
              __PUCK__value__7 = _$unwrapTraitObject3$[0];
        };
      };
    };
    i.file = contextFile;
    return i._module = (0, _core.Some)(_module);
  };
  return $unwrapTraitObject(_js._Object).assign({}, visit.emptyVisitor, {
    visitModule: function visitModule(m) {
      var self = this;
      declarations = m.declarations;
      _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: m.statements, $isTraitObject: true }, function (s) {
        var __PUCK__value__8 = s;
        if ($unwrapTraitObject(__PUCK__value__8).kind == "ImportDirective") {
          var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__8),
              _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
              e = _$unwrapTraitObject4$[0];

          return $unwrapTraitObject(self).visitImportDirective(e);
        };
      });
      return m.declarations = _js._undefined;
    },
    visitImportDirective: function visitImportDirective(i) {
      var self = this;
      var __PUCK__value__9 = i.domain;
      var __PUCK__value__10 = __PUCK__value__9;
      if ($unwrapTraitObject(__PUCK__value__10).kind == "Some") {
        var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__10),
            _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
            domain = _$unwrapTraitObject5$[0];

        if (domain == "puck") {
          if (puckModules.indexOf(i.path) == -1) {
            return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective', value: i, $isTraitObject: true }, "Invalid puck module " + i.path);
          };
          var importedFile = $unwrapTraitObject(context).resolvePath(path.join(path.dirname($unwrapTraitObject(_js.require).resolve("puck-lang/dist/bin/puck")), "../../lib/stdlib/" + i.path + ".puck"), file);
          importModule(i, importedFile);
        } else {
          if (domains.indexOf(domain) == -1) {
            reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective', value: i, $isTraitObject: true }, "Invalid import domain " + domain + "");
          };
        };
      } else {
        var __PUCK__value__11 = __PUCK__value__9;
        if (true) {
          var _None = __PUCK__value__11;
          var result = (0, _js.asResult)(function () {
            return $unwrapTraitObject(context).resolvePath(i.path, file);
          });
          var __PUCK__value__12 = result;
          var __PUCK__value__13 = __PUCK__value__12;
          if ($unwrapTraitObject(__PUCK__value__13).kind == "Ok") {
            var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__13),
                _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
                _importedFile = _$unwrapTraitObject6$[0];

            if ($unwrapTraitObject(puckFile).test(_importedFile.absolutePath)) {
              importModule(i, _importedFile);
            };
          } else {
            var __PUCK__value__14 = __PUCK__value__12;
            if ($unwrapTraitObject(__PUCK__value__14).kind == "Err") {
              var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__14),
                  _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
                  error = _$unwrapTraitObject7$[0];

              return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective', value: i, $isTraitObject: true }, "Imported file " + i.path + " not found");
            };
          };
        };
      };
      return [];
    }
  });
}
