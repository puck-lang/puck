#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.ImportVisitor = ImportVisitor;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _fs = require('fs');

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _ast = require('./../ast/ast.js');

var _visit = require('./../ast/visit.js');

var visit = _interopRequireWildcard(_visit);

var _entities = require('./../entities.js');

var _ast2 = require('./../compiler/ast.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var domains = ["node", "puck"];
var puckFile = (0, _js.RegExp)("\\.puck$", "i");
var puckModules = ["core", "js"];
function ImportVisitor(context, file) {
  var reportError = context.reportError.bind(context, file);
  var moduleScope = void 0;
  function importModule(i, importedFile) {
    var contextFile = context.importFile(importedFile);
    var _module = contextFile.ast;
    if (!_module) {
      return context.defer(importedFile, function () {
        return importModule(i, importedFile);
      });
    };
    i.file = contextFile;
    i._module = _module;
    if (i.specifier.kind == _ast2.SyntaxKind.ObjectDestructure) {
      return i.specifier.members.forEach(function (m) {
        if (!_module.exports[m.property.name]) {
          return reportError(m, importedFile.fileName + " has no export named " + m.property.name);
        };
      });
    } else {
      if (i.specifier.kind == _ast2.SyntaxKind.AsteriskToken) {
        return i.specifier = {
          kind: _ast2.SyntaxKind.ObjectDestructure,
          members: _core.ObjectMap.keys.call(_module.exports).filter(function (e) {
            return !moduleScope.getBinding(e);
          }).map(function (e) {
            var property = _module.exports[e].identifier;
            return {
              kind: _ast2.SyntaxKind.ObjectDestructureMember,
              property: property,
              local: property
            };
          })
        };
      };
    };
  };
  return _js._Object.assign({}, visit.emptyVisitor, {
    visitModule: function visitModule(m) {
      var self = this;
      moduleScope = m.scope;
      return _core.Iterable['$List'].forEach.call(m.expressions, function (e) {
        if (e.kind == _ast2.SyntaxKind.ImportDirective) {
          return self.visitImportDirective(e);
        };
      });
    },
    visitImportDirective: function visitImportDirective(i) {
      var self = this;
      if (_core.Option.isNothing.call(i.domain)) {
        var _ret = function () {
          var importedFile = context.resolvePath(i.path, file);
          var path = importedFile.absolutePath;
          var result = (0, _js.asResult)(function () {
            return (0, _fs.statSync)(path);
          });
          if (result.error) {
            reportError(i, "Imported file " + path + " not found");
          } else {
            if (!result.result.isFile()) {
              reportError(i, "Imported file " + path + " is not a file");
            };
          };
          if (puckFile.test(path)) {
            return {
              v: importModule(i, importedFile)
            };
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      } else {
        if (i.domain.value[0] == "puck") {
          if (puckModules.indexOf(i.path) == -1) {
            reportError(i, "Invalid puck module " + i.path);
          };
          var _importedFile = context.resolvePath(path.join(path.dirname(_js.require.resolve("puck-lang/dist/bin/puck")), "../../lib/stdlib/" + i.path + ".puck"), file);
          return importModule(i, _importedFile);
        } else {
          if (domains.indexOf(i.domain.value[0]) == -1) {
            return reportError(i, "Invalid import domain " + i.domain.value[0]);
          };
        };
      };
    }
  });
}
