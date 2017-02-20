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

var _ast = require('./ast/ast');

var _span = require('./ast/span');

var _completions2 = require('./pls/completions');

var _definition = require('./pls/definition');

var _hover = require('./pls/hover');

var _position_visitor = require('./pls/position_visitor');

var _scope = require('./typeck/src/scope');

var _compiler = require('./compiler');

var _entities = require('./entities');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};
function createServer(projectPath, sendDiagnostic) {
  var context = void 0;
  var a = {};
  a.validateDocument = function (filePath, contents) {
    (0, _core.print)("validateDocument");
    context = (0, _compiler.createContext)(projectPath);
    $unwrapTraitObject(context).reportError = function (file, token, message) {
      (0, _core.print)("reportError", [file.absolutePath, message]);
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
    var result = (0, _js.asResult)(function () {
      var file = {
        isBin: false,
        fileName: path.basename(filePath),
        absolutePath: path.resolve(path.normalize(filePath)),
        puck: contents
      };
      file = $unwrapTraitObject(context).importFile(file);
      $unwrapTraitObject(context).runTypeVisitor();
      $unwrapTraitObject(context).runImplVisitor();
      return $unwrapTraitObject(context).runCheckerOnFile(file);
    });
    (0, _core.print)("validateDocument completed");
    var __PUCK__value__1 = result;
    if ($unwrapTraitObject(__PUCK__value__1).kind == "Err") {
      var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__1),
          _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
          error = _$unwrapTraitObject$v[0];

      if (error != "Syntax Error") {
        return (0, _core.print)("Error:", $unwrapTraitObject(error));
      };
    };
  };
  a.onCompletion = function (filePath, position) {
    (0, _core.print)("onCompletion");
    if (!context) {
      return [];
    };
    var file = $unwrapTraitObject($unwrapTraitObject(context).files)[$unwrapTraitObject(path.resolve(path.normalize(filePath)))];
    if (!file) {
      return [];
    };
    var _module = file.ast;
    if (!_module) {
      return [];
    };
    var visitor = _completions2.CompletionVisitor._new(position);
    var result = (0, _js.asResult)(function () {
      return _position_visitor.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/completions.puck:CompletionVisitor"].visitModule.call({ type: '$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/completions.puck:CompletionVisitor', value: visitor, $isTraitObject: true }, _module);
    });
    var __PUCK__value__2 = result;
    var __PUCK__value__3 = __PUCK__value__2;
    if ($unwrapTraitObject(__PUCK__value__3).kind == "Ok") {
      var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__3),
          _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
          completions = _$unwrapTraitObject2$[0];

      var __PUCK__value__4 = visitor.completions;
      if ($unwrapTraitObject(__PUCK__value__4).kind == "Some") {
        var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__4),
            _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
            _completions = _$unwrapTraitObject3$[0];

        return _completions;
      } else {
        return [];
      };
    } else {
      var __PUCK__value__5 = __PUCK__value__2;
      if ($unwrapTraitObject(__PUCK__value__5).kind == "Err") {
        var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__5),
            _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
            error = _$unwrapTraitObject4$[0];

        (0, _core.print)("completions Error:", [error, $unwrapTraitObject(error).stack]);
        return [];
      };
    };
  };
  a.onHover = function (filePath, position) {
    (0, _core.print)("onHover");
    if (!context) {
      return _hover.Hover.empty();
    };
    var file = $unwrapTraitObject($unwrapTraitObject(context).files)[$unwrapTraitObject(path.resolve(path.normalize(filePath)))];
    if (!file) {
      return _hover.Hover.empty();
    };
    var _module = file.ast;
    if (!_module) {
      return _hover.Hover.empty();
    };
    var visitor = _hover.HoverVisitor._new(position);
    var result = (0, _js.asResult)(function () {
      return _position_visitor.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor"].visitModule.call({ type: '$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor', value: visitor, $isTraitObject: true }, _module);
    });
    var __PUCK__value__6 = result;
    var __PUCK__value__7 = __PUCK__value__6;
    if ($unwrapTraitObject(__PUCK__value__7).kind == "Ok") {
      var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__7),
          _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
          __PUCK__value__8 = _$unwrapTraitObject5$[0];

      (0, _core.print)("onHover ok", visitor.hover);
      return _core.Option.unwrapOrElse.call(visitor.hover, function () {
        return _hover.Hover.empty();
      });
    } else {
      var __PUCK__value__9 = __PUCK__value__6;
      if ($unwrapTraitObject(__PUCK__value__9).kind == "Err") {
        var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__9),
            _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
            error = _$unwrapTraitObject6$[0];

        (0, _core.print)("onHover Error:", [error, $unwrapTraitObject(error).stack]);
        return _hover.Hover.empty();
      };
    };
  };
  a.onDefinition = function (filePath, position) {
    (0, _core.print)("onDefinition");
    if (!context) {
      return [];
    };
    var file = $unwrapTraitObject($unwrapTraitObject(context).files)[$unwrapTraitObject(path.resolve(path.normalize(filePath)))];
    if (!file) {
      return [];
    };
    var _module = file.ast;
    if (!_module) {
      return [];
    };
    var visitor = _definition.DefinitionVisitor._new(file, position);
    var result = (0, _js.asResult)(function () {
      return _position_visitor.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/definition.puck:DefinitionVisitor"].visitModule.call({ type: '$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/definition.puck:DefinitionVisitor', value: visitor, $isTraitObject: true }, _module);
    });
    var __PUCK__value__10 = result;
    var __PUCK__value__11 = __PUCK__value__10;
    if ($unwrapTraitObject(__PUCK__value__11).kind == "Ok") {
      var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__11),
          _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
          __PUCK__value__12 = _$unwrapTraitObject7$[0];

      (0, _core.print)("onDefinition ok", visitor.definitions);
      return visitor.definitions;
    } else {
      var __PUCK__value__13 = __PUCK__value__10;
      if ($unwrapTraitObject(__PUCK__value__13).kind == "Err") {
        var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__13),
            _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
            error = _$unwrapTraitObject8$[0];

        (0, _core.print)("onDefinition Error:", [error, $unwrapTraitObject(error).stack]);
        return [];
      };
    };
  };
  return a;
}
