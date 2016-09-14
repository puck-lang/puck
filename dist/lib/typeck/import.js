#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.ImportVisitor = ImportVisitor;

var _js = require('puck-lang/dist/lib/stdlib/js');

var _fs = require('fs');

var _visit = require('./../ast/visit.js');

var visit = _interopRequireWildcard(_visit);

var _ast = require('./../compiler/ast.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var domains = ["node", "puck"];
var puckFile = (0, _js.RegExp)("\\.puck$", "i");
var puckModules = ["js"];
function ImportVisitor(context, file) {
  var reportError = context.reportError.bind(context, file);
  return _js._Object.assign({}, visit.Visitor, {
    visitModule: function visitModule(m) {
      var self = this;
      return m.lines.forEach(function (e) {
        if (e.kind == _ast.SyntaxKind.ImportDirective) {
          return self.visitImportDirective(e);
        };
      });
    },
    visitImportDirective: function visitImportDirective(i) {
      var self = this;
      if (i.domain == "puck") {
        if (puckModules.indexOf(i.path) == -1) {
          return reportError(i, "Invalid puck module " + i.path);
        };
      } else {
        if (!i.domain) {
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
              var _ret2 = function () {
                var _module = context.importFile(importedFile).ast;
                if (i.specifier.kind == _ast.SyntaxKind.ObjectDestructure) {
                  return {
                    v: {
                      v: i.specifier.members.forEach(function (m) {
                        if (!_module.exports[m.property.name]) {
                          return reportError(m, importedFile.fileName + " has no export named " + m.property.name);
                        };
                      })
                    }
                  };
                };
              }();

              if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
            };
          }();

          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        } else {
          if (domains.indexOf(i.domain)) {
            return reportError(i, "Invalid import domain " + i.domain);
          };
        };
      };
    }
  });
}