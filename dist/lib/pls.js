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
  var contexts = _core.ObjectMap._new();
  var a = {};
  a.onClose = function (filePath) {
    return _core.ObjectMap._delete.call(contexts, filePath);
  };
  a.validateDocument = function (filePath, contents) {
    (0, _core.print)("validateDocument");
    var context = (0, _compiler.createContext)(projectPath);
    _core.ObjectMap.set.call(contexts, filePath, context);
    context.reportError = function (file, token, message) {
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
      file = context.importFile(file);
      context.runTypeVisitor();
      context.runImplVisitor();
      return context.runCheckerOnFile(file);
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
    var __PUCK__value__2 = _core.ObjectMap.get.call(contexts, filePath);
    var __PUCK__value__3 = __PUCK__value__2;
    var __PUCK__value__4 = void 0;
    if ($unwrapTraitObject(__PUCK__value__3).kind == "Some") {
      var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__3),
          _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
          _context = _$unwrapTraitObject2$[0];

      __PUCK__value__4 = _context;
    } else {
      var __PUCK__value__5 = __PUCK__value__2;
      var __PUCK__value__6 = void 0;
      if (true) {
        var _None = __PUCK__value__5;
        return [];
      };
      __PUCK__value__4 = __PUCK__value__6;
    };
    var context = __PUCK__value__4;
    var file = $unwrapTraitObject(_core.Unknown.transmute.call($unwrapTraitObject($unwrapTraitObject(context).files)[$unwrapTraitObject(path.resolve(path.normalize(filePath)))]));
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
    var __PUCK__value__7 = result;
    var __PUCK__value__8 = __PUCK__value__7;
    if ($unwrapTraitObject(__PUCK__value__8).kind == "Ok") {
      var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__8),
          _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
          completions = _$unwrapTraitObject3$[0];

      var __PUCK__value__9 = visitor.completions;
      if ($unwrapTraitObject(__PUCK__value__9).kind == "Some") {
        var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__9),
            _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
            _completions = _$unwrapTraitObject4$[0];

        return _completions;
      } else {
        return [];
      };
    } else {
      var __PUCK__value__10 = __PUCK__value__7;
      if ($unwrapTraitObject(__PUCK__value__10).kind == "Err") {
        var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__10),
            _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
            error = _$unwrapTraitObject5$[0];

        (0, _core.print)("completions Error:", [error, $unwrapTraitObject(error).stack]);
        return [];
      };
    };
  };
  a.onHover = function (filePath, position) {
    (0, _core.print)("onHover");
    var __PUCK__value__11 = _core.ObjectMap.get.call(contexts, filePath);
    var __PUCK__value__12 = __PUCK__value__11;
    var __PUCK__value__13 = void 0;
    if ($unwrapTraitObject(__PUCK__value__12).kind == "Some") {
      var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__12),
          _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
          _context2 = _$unwrapTraitObject6$[0];

      __PUCK__value__13 = _context2;
    } else {
      var __PUCK__value__14 = __PUCK__value__11;
      var __PUCK__value__15 = void 0;
      if (true) {
        var _None2 = __PUCK__value__14;
        return _hover.Hover.empty();
      };
      __PUCK__value__13 = __PUCK__value__15;
    };
    var context = __PUCK__value__13;
    var file = $unwrapTraitObject(_core.Unknown.transmute.call($unwrapTraitObject($unwrapTraitObject(context).files)[$unwrapTraitObject(path.resolve(path.normalize(filePath)))]));
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
    var __PUCK__value__16 = result;
    var __PUCK__value__17 = __PUCK__value__16;
    if ($unwrapTraitObject(__PUCK__value__17).kind == "Ok") {
      var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__17),
          _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
          __PUCK__value__18 = _$unwrapTraitObject7$[0];

      (0, _core.print)("onHover ok", visitor.hover);
      return _core.Option.unwrapOrElse.call(visitor.hover, function () {
        return _hover.Hover.empty();
      });
    } else {
      var __PUCK__value__19 = __PUCK__value__16;
      if ($unwrapTraitObject(__PUCK__value__19).kind == "Err") {
        var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__19),
            _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
            error = _$unwrapTraitObject8$[0];

        (0, _core.print)("onHover Error:", [error, $unwrapTraitObject(error).stack]);
        return _hover.Hover.empty();
      };
    };
  };
  a.onDefinition = function (filePath, position) {
    (0, _core.print)("onDefinition");
    var __PUCK__value__20 = _core.ObjectMap.get.call(contexts, filePath);
    var __PUCK__value__21 = __PUCK__value__20;
    var __PUCK__value__22 = void 0;
    if ($unwrapTraitObject(__PUCK__value__21).kind == "Some") {
      var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__21),
          _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
          _context3 = _$unwrapTraitObject9$[0];

      __PUCK__value__22 = _context3;
    } else {
      var __PUCK__value__23 = __PUCK__value__20;
      var __PUCK__value__24 = void 0;
      if (true) {
        var _None3 = __PUCK__value__23;
        return [];
      };
      __PUCK__value__22 = __PUCK__value__24;
    };
    var context = __PUCK__value__22;
    var file = $unwrapTraitObject(_core.Unknown.transmute.call($unwrapTraitObject($unwrapTraitObject(context).files)[$unwrapTraitObject(path.resolve(path.normalize(filePath)))]));
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
    var __PUCK__value__25 = result;
    var __PUCK__value__26 = __PUCK__value__25;
    if ($unwrapTraitObject(__PUCK__value__26).kind == "Ok") {
      var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__26),
          _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
          __PUCK__value__27 = _$unwrapTraitObject11[0];

      (0, _core.print)("onDefinition ok", visitor.definitions);
      return visitor.definitions;
    } else {
      var __PUCK__value__28 = __PUCK__value__25;
      if ($unwrapTraitObject(__PUCK__value__28).kind == "Err") {
        var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__28),
            _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12.value, 1),
            error = _$unwrapTraitObject13[0];

        (0, _core.print)("onDefinition Error:", [error, $unwrapTraitObject(error).stack]);
        return [];
      };
    };
  };
  return a;
}
