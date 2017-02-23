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
var puckFile = _core.RegExp._new("\\.puck$", "i");
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
    if ($unwrapTraitObject(__PUCK__value__1).kind == "ObjectDestructure") {
      var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__1),
          _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
          o = _$unwrapTraitObject$v[0];

      _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: o.members, $isTraitObject: true }, function (m) {
        if (!_core.ObjectMap.has.call(_module.exports, m.property.name)) {
          return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructureMember', value: m, $isTraitObject: true }, importedFile.fileName + " has no export named " + m.property.name);
        };
      });
    } else {
      if ($unwrapTraitObject(__PUCK__value__1).kind == "Asterisk") {
        var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__1),
            _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
            token = _$unwrapTraitObject2$[0];

        var __PUCK__value__3 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _core.ObjectMap.keys.call(_module.exports), $isTraitObject: true }, function (e) {
          return !_core.ObjectMap.has.call(declarations, e);
        });
        var __PUCK__value__2 = _core.Iterable[__PUCK__value__3.type].map.call(__PUCK__value__3, function (e) {
          var property = _core.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({ type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: _module.exports, $isTraitObject: true }, e).identifier;
          return {
            property: property,
            local: property
          };
        });
        i.specifier = _ast.ImportSpecifier.ObjectDestructure({
          openBrace: token,
          closeBrace: token,
          members: _core.Iterable[__PUCK__value__2.type].toList.call(__PUCK__value__2)
        });
      } else {
        if ($unwrapTraitObject(__PUCK__value__1).kind == "Identifier") {
          var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__1),
              _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
              __PUCK__value__4 = _$unwrapTraitObject3$[0];
        };
      };
    };
    i.file = contextFile;
    return i._module = (0, _core.Some)(_module);
  };
  return _js._Object.assign({}, visit.emptyVisitor, {
    visitModule: function visitModule(m) {
      var self = this;
      declarations = $unwrapTraitObject(m.declarations);
      _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: m.statements, $isTraitObject: true }, function (s) {
        var __PUCK__value__5 = s;
        if (__PUCK__value__5.kind == "ImportDirective") {
          var _PUCK__value__5$valu = _slicedToArray(__PUCK__value__5.value, 1),
              e = _PUCK__value__5$valu[0];

          return $unwrapTraitObject(self).visitImportDirective(e);
        };
      });
      return m.declarations = $unwrapTraitObject(_js._undefined);
    },
    visitImportDirective: function visitImportDirective(i) {
      var self = this;
      var __PUCK__value__6 = i.domain;
      if ($unwrapTraitObject(__PUCK__value__6).kind == "Some") {
        var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__6),
            _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
            domain = _$unwrapTraitObject4$[0];

        if (domain == "puck") {
          if (!_core.List.contains.call(puckModules, i.path)) {
            return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective', value: i, $isTraitObject: true }, "Invalid puck module " + i.path);
          };
          var importedFile = $unwrapTraitObject(context).resolvePath(path.join(path.dirname(_js.require.resolve("puck-lang/dist/bin/puck")), "../../lib/stdlib/" + i.path + ".puck"), file);
          importModule(i, importedFile);
        } else {
          if (!_core.List.contains.call(domains, domain)) {
            reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective', value: i, $isTraitObject: true }, "Invalid import domain " + domain + "");
          };
        };
      } else {
        if (true) {
          var _None = __PUCK__value__6;
          var result = (0, _js.asResult)(function () {
            return $unwrapTraitObject(context).resolvePath(i.path, file);
          });
          var __PUCK__value__7 = result;
          if ($unwrapTraitObject(__PUCK__value__7).kind == "Ok") {
            var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__7),
                _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
                _importedFile = _$unwrapTraitObject5$[0];

            if (_core.RegExp.test.call(puckFile, _importedFile.absolutePath)) {
              importModule(i, _importedFile);
            };
          } else {
            if ($unwrapTraitObject(__PUCK__value__7).kind == "Err") {
              var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__7),
                  _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
                  error = _$unwrapTraitObject6$[0];

              return reportError({ type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective', value: i, $isTraitObject: true }, "Imported file " + i.path + " not found");
            };
          };
        };
      };
      return [];
    }
  });
}
