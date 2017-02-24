'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.parseString = parseString;
exports.compile = compile;
exports.createContext = createContext;
exports.buildString = buildString;
exports.build = build;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _babelCore = require('babel-core');

var babel = _interopRequireWildcard(_babelCore);

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _util = require('util');

var _span = require('./ast/span');

var _emitter = require('./compiler/emitter');

var _input_stream = require('./compiler/input_stream');

var _parser = require('./compiler/parser');

var _token_stream = require('./compiler/token_stream');

var _helpers = require('./helpers');

var _impl_visitor = require('./typeck/impl_visitor');

var _import_visitor = require('./typeck/import_visitor');

var _scope_visitor = require('./typeck/scope_visitor');

var _top_level_visitor = require('./typeck/top_level_visitor');

var _type_visitor = require('./typeck/type_visitor');

var _entities = require('./entities');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};

function fileInspect(depth, opts) {
  var self = this;
  return (0, _util.inspect)(_js._Object.assign({}, self, {
    puck: "[hidden]",
    ast: "[hidden]",
    js: "[hidden]",
    inspect: _js._undefined
  }), _js._Object.assign({}, opts, { depth: $unwrapTraitObject(opts).depth - depth }));
};
function parseString(context, file) {
  var ast = (0, _parser.parse)(_token_stream.TokenStream._new(_input_stream.InputStream._new(context, file)), file);
  (0, _top_level_visitor.TopLevelVisitor)(context, file).visitModule(ast);
  (0, _import_visitor.ImportVisitor)(context, file).visitModule(ast);
  return ast;
};
function compile(context, file) {
  return $unwrapTraitObject((0, _emitter.Emitter)(context, file)).emitModule(file.ast, file.isBin);
};
function babelTransform(file) {
  return $unwrapTraitObject(babel.transform($unwrapTraitObject(file).js, {
    filename: $unwrapTraitObject(file).absolutePath,
    presets: _js.require.resolve("babel-preset-latest"),
    babelrc: false
  }).code);
};
function dumpFiles(files, prop) {
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: files, $isTraitObject: true }, function (file) {
    (0, _core.print)("");
    (0, _core.print)(file.absolutePath);
    var __PUCK__value__1 = _core.Unknown.asString.call(file[prop]);
    var __PUCK__value__2 = void 0;
    if ($unwrapTraitObject(__PUCK__value__1).kind == "Some") {
      var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__1),
          _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
          _data = _$unwrapTraitObject$v[0];

      __PUCK__value__2 = _data;
    } else {
      var __PUCK__value__3 = void 0;
      if (true) {
        var _None = __PUCK__value__1;
        __PUCK__value__3 = (0, _util.inspect)(file[prop], {
          colors: false,
          depth: 25
        });
      };
      __PUCK__value__2 = __PUCK__value__3;
    };
    var data = __PUCK__value__2;
    return (0, _core.print)(_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _core.String.split.call(data, "\n"), $isTraitObject: true }, function (line) {
      return "  " + line + "";
    }).value.join("\n"));
  });
};
function createContext(projectPath) {
  var ignoreErrors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return {
    projectPath: projectPath,
    impls: _core.ObjectMap._new(),
    files: _core.ObjectMap._new(),
    deferred: _core.ObjectMap._new(),
    runTypeVisitor: function runTypeVisitor() {
      var self = this;
      var keys = $unwrapTraitObject(_js._Object.keys($unwrapTraitObject(self).files));
      var __PUCK__value__4 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: keys, $isTraitObject: true }, function (path) {
        return $unwrapTraitObject($unwrapTraitObject(self).files)[path];
      });
      return _core.Iterable[__PUCK__value__4.type].forEach.call(__PUCK__value__4, function (file) {
        if (!file.typeVisitorStarted && file.ast) {
          file.typeVisitorStarted = true;
          (0, _type_visitor.TypeVisitor)(self, file).visitModule(file.ast);
          return file.typeVisitorCompleted = true;
        };
      });
    },
    runImplVisitor: function runImplVisitor() {
      var self = this;
      var keys = $unwrapTraitObject(_js._Object.keys($unwrapTraitObject(self).files));
      var __PUCK__value__5 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: keys, $isTraitObject: true }, function (path) {
        return $unwrapTraitObject($unwrapTraitObject(self).files)[path];
      });
      return _core.Iterable[__PUCK__value__5.type].forEach.call(__PUCK__value__5, function (file) {
        if (!file.implVisitorStarted && file.ast) {
          file.implVisitorStarted = true;
          return (0, _impl_visitor.ImplVisitor)(self, file).visitModule(file.ast);
        };
      });
    },
    runChecker: function runChecker() {
      var self = this;
      var keys = $unwrapTraitObject(_js._Object.keys($unwrapTraitObject(self).files));
      var __PUCK__value__6 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: keys, $isTraitObject: true }, function (path) {
        return $unwrapTraitObject($unwrapTraitObject(self).files)[path];
      });
      return _core.Iterable[__PUCK__value__6.type].forEach.call(__PUCK__value__6, function (file) {
        if (!file.scopeVisitorStarted && file.ast) {
          file.scopeVisitorStarted = true;
          return (0, _scope_visitor.ScopeVisitor)(self, file).visitModule(file.ast);
        };
      });
    },
    runTypeVisitorOnFile: function runTypeVisitorOnFile(file) {
      var self = this;
      if (!$unwrapTraitObject(file).typeVisitorCompleted) {
        if ($unwrapTraitObject(file).typeVisitorStarted) {
          throw "Circular import??";
        };
        $unwrapTraitObject(file).typeVisitorStarted = true;
        (0, _type_visitor.TypeVisitor)(self, file).visitModule($unwrapTraitObject(file).ast);
        return $unwrapTraitObject(file).typeVisitorCompleted = true;
      };
    },
    runImplVisitorOnFile: function runImplVisitorOnFile(file) {
      var self = this;
      if (!$unwrapTraitObject(file).typeVisitorStarted) {
        $unwrapTraitObject(self).runTypeVisitorOnFile(file);
      };
      if ($unwrapTraitObject(file).implVisitorStarted) {
        throw (0, _js.Error)("runImplVisitorOnFile??");
      };
      $unwrapTraitObject(file).implVisitorStarted = true;
      return (0, _impl_visitor.ImplVisitor)(self, file).visitModule($unwrapTraitObject(file).ast);
    },
    runCheckerOnFile: function runCheckerOnFile(file) {
      var self = this;
      if (!$unwrapTraitObject(file).implVisitorStarted) {
        $unwrapTraitObject(self).runImplVisitorOnFile(file);
      };
      if (!$unwrapTraitObject(file).scopeVisitorStarted) {
        $unwrapTraitObject(file).scopeVisitorStarted = true;
        return (0, _scope_visitor.ScopeVisitor)(self, file).visitModule($unwrapTraitObject(file).ast);
      };
    },
    defer: function defer(file, func) {
      var self = this;
      if (!$unwrapTraitObject($unwrapTraitObject(self).deferred)[$unwrapTraitObject($unwrapTraitObject(file).absolutePath)]) {
        $unwrapTraitObject($unwrapTraitObject(self).deferred)[$unwrapTraitObject($unwrapTraitObject(file).absolutePath)] = [];
      };
      return $unwrapTraitObject($unwrapTraitObject(self).deferred)[$unwrapTraitObject($unwrapTraitObject(file).absolutePath)].push(func);
    },
    resolvePath: function resolvePath(file, relativeTo) {
      var __PUCK__value__7 = void 0;
      if ($unwrapTraitObject(file).substring(0, 1) == "/") {
        __PUCK__value__7 = file;
      } else {
        __PUCK__value__7 = path.join(path.dirname($unwrapTraitObject(relativeTo).absolutePath), file);
      };
      var filePath = __PUCK__value__7;
      var absolutePath = $unwrapTraitObject(fs.realpathSync(path.resolve(path.normalize(filePath))));
      var fileName = path.basename(absolutePath);
      return {
        absolutePath: absolutePath,
        fileName: fileName,
        inspect: fileInspect
      };
    },
    importFile: function importFile(file) {
      var self = this;
      if ($unwrapTraitObject($unwrapTraitObject(self).files)[file.absolutePath] && file.outDir && file.outFile) {
        $unwrapTraitObject($unwrapTraitObject(self).files)[file.absolutePath].outDir = file.outDir;
        $unwrapTraitObject($unwrapTraitObject(self).files)[file.absolutePath].outFile = file.outFile;
      };
      if (!$unwrapTraitObject($unwrapTraitObject(self).files)[file.absolutePath]) {
        $unwrapTraitObject($unwrapTraitObject(self).files)[file.absolutePath] = file;
        if (!file.puck) {
          file.puck = $unwrapTraitObject(fs.readFileSync(file.absolutePath, { encoding: "utf-8" }));
        };
        file.ast = parseString(self, file);
        if ($unwrapTraitObject($unwrapTraitObject(self).deferred)[file.absolutePath]) {
          var callbacks = $unwrapTraitObject($unwrapTraitObject(self).deferred)[file.absolutePath];
          $unwrapTraitObject($unwrapTraitObject(self).deferred)[file.absolutePath] = $unwrapTraitObject(_js._undefined);
          callbacks.forEach(function (callback) {
            return callback();
          });
        };
      };
      return $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(self).files)[file.absolutePath]);
    },
    reportError: function reportError(file, token, message) {
      var self = this;
      if (!ignoreErrors) {
        var _ToSpan$token$type$sp = _span.ToSpan[token.type].span.call(token).start,
            line = _ToSpan$token$type$sp.line,
            column = _ToSpan$token$type$sp.column;

        throw (0, _js.Error)("" + message + "\n  in " + file.absolutePath + " (" + line + ":" + column + ")");
      };
    }
  };
};
function buildString(code, filePath, projectPath) {
  return (0, _js.asResult)(function () {
    var context = createContext(projectPath);
    var file = context.importFile({
      isBin: false,
      fileName: $unwrapTraitObject(path.basename(filePath)),
      absolutePath: $unwrapTraitObject(fs.realpathSync(path.resolve(path.normalize(filePath)))),
      puck: code
    });
    context.runTypeVisitor();
    context.runImplVisitor();
    context.runChecker();
    file.js = compile(context, file);
    file.babel = babelTransform(file);
    return file;
  });
};
function build(files, context) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var dump = options.dump;
  files = $unwrapTraitObject(files).map(function (f) {
    var fileName = $unwrapTraitObject(path.basename($unwrapTraitObject(f).file));
    var absolutePath = $unwrapTraitObject(fs.realpathSync(path.resolve(path.normalize($unwrapTraitObject(f).file))));
    var outFile = path.normalize($unwrapTraitObject(f).outFile);
    var outDir = path.dirname(outFile);
    return {
      isBin: $unwrapTraitObject(f).isBin,
      absolutePath: absolutePath,
      outFile: outFile,
      outDir: outDir,
      inspect: fileInspect
    };
  });
  var __PUCK__value__8 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: files, $isTraitObject: true }, function (f) {
    return $unwrapTraitObject(context).importFile(f);
  });
  files = _core.Iterable[__PUCK__value__8.type].toList.call(__PUCK__value__8);
  if (dump == "ast") {
    dumpFiles(files, "ast");
    return _js._undefined;
  };
  $unwrapTraitObject(context).runTypeVisitor();
  if (dump == "typed-ast") {
    dumpFiles(files, "ast");
    return _js._undefined;
  };
  $unwrapTraitObject(context).runImplVisitor();
  if (dump == "impl-ast") {
    dumpFiles(files, "ast");
    return _js._undefined;
  };
  $unwrapTraitObject(context).runChecker();
  if (dump == "checked-ast") {
    dumpFiles(files, "ast");
    return _js._undefined;
  };
  _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: files, $isTraitObject: true }, function (file) {
    return file.js = compile(context, file);
  });
  if (dump == "js") {
    dumpFiles(files, "js");
    return _js._undefined;
  };
  _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: files, $isTraitObject: true }, function (file) {
    return file.babel = babelTransform(file);
  });
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: files, $isTraitObject: true }, function (f) {
    var outDir = f.outDir;
    var outFile = f.outFile;
    (0, _helpers.cmd)("mkdir -p " + outDir + "");
    return fs.writeFileSync("" + outFile + "", f.babel + "\n", { mode: 511 });
  });
}
