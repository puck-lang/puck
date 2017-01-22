'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.ImportVisitor = ImportVisitor;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _fs = require('fs');

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _ast = require('./../ast/ast');

var _visit = require('./../ast/visit');

var visit = _interopRequireWildcard(_visit);

var _entities = require('./../entities');

var _ast2 = require('./../compiler/ast');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var domains = ["node", "puck"];
var puckFile = (0, _js.RegExp)("\\.puck$", "i");
var puckModules = ["core", "js", "test"];
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
          var __PUCK__value__1 = result;
          var __PUCK__value__2 = __PUCK__value__1;
          if (__PUCK__value__2.kind == "Ok") {
            var _PUCK__value__2$valu = _slicedToArray(__PUCK__value__2.value, 1),
                stat = _PUCK__value__2$valu[0];

            if (!stat.isFile()) {
              reportError(i, "Imported file " + path + " is not a file");
            };
          } else {
            var __PUCK__value__3 = __PUCK__value__1;
            if (__PUCK__value__3.kind == "Err") {
              var _PUCK__value__3$valu = _slicedToArray(__PUCK__value__3.value, 1),
                  error = _PUCK__value__3$valu[0];

              reportError(i, "Imported file " + path + " not found");
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
          var importedFile = context.resolvePath(path.join(path.dirname(_js.require.resolve("puck-lang/dist/bin/puck")), "../../lib/stdlib/" + i.path + ".puck"), file);
          return importModule(i, importedFile);
        } else {
          if (domains.indexOf(i.domain.value[0]) == -1) {
            return reportError(i, "Invalid import domain " + i.domain.value[0]);
          };
        };
      };
    }
  });
}
