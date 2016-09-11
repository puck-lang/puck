#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.ImportVisitor = ImportVisitor;

var _fs = require('fs');

var _visit = require('./../ast/visit.js');

var visit = _interopRequireWildcard(_visit);

var _ast = require('./../compiler/ast.js');

var _js = require('./../stdlib/js.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var puckFile = (0, _js.RegExp)("\\.puck$", "i");
function ImportVisitor(context, file) {
  var reportError = context.reportError.bind(context, file);
  return _js._Object.assign({}, visit.Visitor, {
    visitBlock: function visitBlock(b) {
      var self = this;
      return b.block.forEach(function (e) {
        if (e.kind == _ast.SyntaxKind.ImportDirective) {
          return self.visitImportDirective(e);
        };
      });
    },
    visitImportDirective: function visitImportDirective(i) {
      var self = this;
      if (!i.domain) {
        var _ret = function () {
          var path = context.resolvePath(i.path, file);
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
              v: context.importFile(path)
            };
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      };
    }
  });
}
