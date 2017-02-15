'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
  return (0, _util.inspect)($unwrapTraitObject(_js._Object).assign({}, self, {
    puck: "[hidden]",
    ast: "[hidden]",
    js: "[hidden]",
    inspect: _js._undefined
  }), $unwrapTraitObject(_js._Object).assign({}, opts, { depth: $unwrapTraitObject(opts).depth - depth }));
};
function parseString(context, file) {
  var ast = (0, _parser.parse)((0, _token_stream.TokenStream)((0, _input_stream.InputStream)(context, file)));
  $unwrapTraitObject((0, _top_level_visitor.TopLevelVisitor)(context, file)).visitModule(ast);
  $unwrapTraitObject((0, _import_visitor.ImportVisitor)(context, file)).visitModule(ast);
  return ast;
};
function compile(context, file) {
  return $unwrapTraitObject((0, _emitter.Emitter)(context, file)).emitModule(file.ast, file.isBin);
};
function babelTransform(file) {
  return $unwrapTraitObject(babel.transform($unwrapTraitObject(file).js, {
    filename: $unwrapTraitObject(file).absolutePath,
    presets: $unwrapTraitObject(_js.require).resolve("babel-preset-latest"),
    babelrc: false
  })).code;
};
function dumpFiles(files, prop) {
  return _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$lib/stdlib/core.puck:List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$lib/stdlib/core.puck:List', value: files, $isTraitObject: true }, function (file) {
    (0, _core.print)("");
    (0, _core.print)(file.absolutePath);
    var data = file[prop];
    if ((0, _js._typeof)(data) != "string") {
      data = (0, _util.inspect)(data, {
        colors: false,
        depth: 25
      });
    };
    return (0, _core.print)($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(data).split("\n")).map(function (line) {
      return "  " + line + "";
    })).join("\n"));
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
      return $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(_js._Object).keys($unwrapTraitObject(self).files)).map(function (path) {
        return $unwrapTraitObject($unwrapTraitObject(self).files)[$unwrapTraitObject(path)];
      })).forEach(function (file) {
        if (!$unwrapTraitObject(file).typeVisitorStarted) {
          $unwrapTraitObject(file).typeVisitorStarted = true;
          $unwrapTraitObject((0, _type_visitor.TypeVisitor)(self, file)).visitModule($unwrapTraitObject(file).ast);
          return $unwrapTraitObject(file).typeVisitorCompleted = true;
        };
      });
    },
    runImplVisitor: function runImplVisitor() {
      var self = this;
      return $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(_js._Object).keys($unwrapTraitObject(self).files)).map(function (path) {
        return $unwrapTraitObject($unwrapTraitObject(self).files)[$unwrapTraitObject(path)];
      })).forEach(function (file) {
        if (!$unwrapTraitObject(file).implVisitorStarted) {
          $unwrapTraitObject(file).implVisitorStarted = true;
          return $unwrapTraitObject((0, _impl_visitor.ImplVisitor)(self, file)).visitModule($unwrapTraitObject(file).ast);
        };
      });
    },
    runChecker: function runChecker() {
      var self = this;
      return $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(_js._Object).keys($unwrapTraitObject(self).files)).map(function (path) {
        return $unwrapTraitObject($unwrapTraitObject(self).files)[$unwrapTraitObject(path)];
      })).forEach(function (file) {
        if (!$unwrapTraitObject(file).scopeVisitorStarted) {
          $unwrapTraitObject(file).scopeVisitorStarted = true;
          return $unwrapTraitObject((0, _scope_visitor.ScopeVisitor)(self, file)).visitModule($unwrapTraitObject(file).ast);
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
        $unwrapTraitObject((0, _type_visitor.TypeVisitor)(self, file)).visitModule($unwrapTraitObject(file).ast);
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
      return $unwrapTraitObject((0, _impl_visitor.ImplVisitor)(self, file)).visitModule($unwrapTraitObject(file).ast);
    },
    runCheckerOnFile: function runCheckerOnFile(file) {
      var self = this;
      if (!$unwrapTraitObject(file).implVisitorStarted) {
        $unwrapTraitObject(self).runImplVisitorOnFile(file);
      };
      if (!$unwrapTraitObject(file).scopeVisitorStarted) {
        $unwrapTraitObject(file).scopeVisitorStarted = true;
        return $unwrapTraitObject((0, _scope_visitor.ScopeVisitor)(self, file)).visitModule($unwrapTraitObject(file).ast);
      };
    },
    defer: function defer(file, func) {
      var self = this;
      if (!$unwrapTraitObject($unwrapTraitObject(self).deferred)[$unwrapTraitObject($unwrapTraitObject(file).absolutePath)]) {
        $unwrapTraitObject($unwrapTraitObject(self).deferred)[$unwrapTraitObject($unwrapTraitObject(file).absolutePath)] = [];
      };
      return $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(self).deferred)[$unwrapTraitObject($unwrapTraitObject(file).absolutePath)]).push(func);
    },
    resolvePath: function resolvePath(file, relativeTo) {
      var __PUCK__value__1 = void 0;
      if ($unwrapTraitObject(file).substring(0, 1) == "/") {
        __PUCK__value__1 = file;
      } else {
        __PUCK__value__1 = path.join(path.dirname($unwrapTraitObject(relativeTo).absolutePath), file);
      };
      var filePath = __PUCK__value__1;
      var absolutePath = fs.realpathSync(path.resolve(path.normalize(filePath)));
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
        $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(self).files)[file.absolutePath]).outDir = file.outDir;
        $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(self).files)[file.absolutePath]).outFile = file.outFile;
      };
      if (!$unwrapTraitObject($unwrapTraitObject(self).files)[file.absolutePath]) {
        $unwrapTraitObject($unwrapTraitObject(self).files)[file.absolutePath] = file;
        if (!file.puck) {
          file.puck = fs.readFileSync(file.absolutePath, { encoding: "utf-8" });
        };
        file.ast = parseString(self, file);
        if ($unwrapTraitObject($unwrapTraitObject(self).deferred)[file.absolutePath]) {
          var callbacks = $unwrapTraitObject($unwrapTraitObject(self).deferred)[file.absolutePath];
          $unwrapTraitObject($unwrapTraitObject(self).deferred)[file.absolutePath] = _js._undefined;
          $unwrapTraitObject(callbacks).forEach(function (callback) {
            return callback();
          });
        };
      };
      return $unwrapTraitObject($unwrapTraitObject(self).files)[file.absolutePath];
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
      fileName: path.basename(filePath),
      absolutePath: fs.realpathSync(path.resolve(path.normalize(filePath))),
      puck: code
    });
    context.runTypeVisitor();
    context.runImplVisitor();
    context.runChecker();
    $unwrapTraitObject(file).js = compile(context, file);
    $unwrapTraitObject(file).babel = babelTransform(file);
    return file;
  });
};
function build(files, context) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var dump = options.dump;
  files = $unwrapTraitObject(files).map(function (f) {
    var fileName = path.basename($unwrapTraitObject(f).file);
    var absolutePath = fs.realpathSync(path.resolve(path.normalize($unwrapTraitObject(f).file)));
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
  files = $unwrapTraitObject(files).map(function (f) {
    return $unwrapTraitObject(context).importFile(f);
  });
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
  $unwrapTraitObject(files).forEach(function (file) {
    return $unwrapTraitObject(file).js = compile(context, file);
  });
  if (dump == "js") {
    dumpFiles(files, "js");
    return _js._undefined;
  };
  $unwrapTraitObject(files).forEach(function (file) {
    return $unwrapTraitObject(file).babel = babelTransform(file);
  });
  return $unwrapTraitObject(files).forEach(function (f) {
    var outDir = $unwrapTraitObject(f).outDir;
    var outFile = $unwrapTraitObject(f).outFile;
    (0, _helpers.cmd)("mkdir -p " + outDir + "");
    return fs.writeFileSync("" + outFile + "", $unwrapTraitObject(f).babel + "\n", { mode: 511 });
  });
}
