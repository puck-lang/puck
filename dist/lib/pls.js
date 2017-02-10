'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.createServer = createServer;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _vscodeLanguageserver = require('vscode-languageserver');

var _span = require('./ast/span');

var _compiler = require('./compiler');

var _entities = require('./entities');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};
function createServer(sendDiagnostic) {
  var context = (0, _compiler.createContext)();
  $unwrapTraitObject(context).reportError = function (file, token, message) {
    var span = _span.ToSpan[token.type].span.call(token);
    return sendDiagnostic(file.absolutePath, {
      severity: $unwrapTraitObject(_vscodeLanguageserver.DiagnosticSeverity).Error,
      range: {
        start: {
          line: span.start.line - 1,
          character: span.start.column - 1
        },
        end: {
          line: span.end.line - 1,
          character: span.end.column - 1
        }
      },
      message: message,
      source: "puck"
    });
  };
  $unwrapTraitObject(context).validateDocument = function (filePath, contents) {
    var result = (0, _js.asResult)(function () {
      var file = {
        isBin: false,
        fileName: $unwrapTraitObject(path).basename(filePath),
        absolutePath: $unwrapTraitObject(path).resolve($unwrapTraitObject(path).normalize(filePath)),
        puck: contents
      };
      $unwrapTraitObject($unwrapTraitObject(context).files)[$unwrapTraitObject(file.absolutePath)] = _js._undefined;
      $unwrapTraitObject($unwrapTraitObject(context).deferred)[$unwrapTraitObject(file.absolutePath)] = _js._undefined;
      file = $unwrapTraitObject(context).importFile(file);
      $unwrapTraitObject(context).runTypeVisitorOnFile(file);
      $unwrapTraitObject(context).runImplVisitorOnFile(file);
      return $unwrapTraitObject(context).runCheckerOnFile(file);
    });
    var __PUCK__value__1 = result;
    if ($unwrapTraitObject(__PUCK__value__1).kind == "Err") {
      var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__1),
          _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
          error = _$unwrapTraitObject$v[0];

      if (error != "Syntax Error") {
        return (0, _core.print)("Error:", error);
      };
    };
  };
  return context;
}
