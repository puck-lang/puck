'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseString = parseString;
exports.compile = compile;
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

function fileInspect(depth, opts) {
  var self = this;
  return (0, _util.inspect)({ absolutePath: self.absolutePath }, _js._Object.assign({}, opts, { depth: opts.depth - depth }));
};
function parseString(context, file) {
  var ast = (0, _parser.parse)((0, _token_stream.TokenStream)((0, _input_stream.InputStream)(file)));
  (0, _top_level_visitor.TopLevelVisitor)(context, file).visitModule(ast);
  (0, _import_visitor.ImportVisitor)(context, file).visitModule(ast);
  return ast;
};
function compile(context, file) {
  return (0, _emitter.Emitter)(context, file).emitModule(file.ast, file.isBin);
};
function babelTransform(file) {
  return babel.transform(file.js, {
    filename: file.absolutePath,
    presets: _js.require.resolve("babel-preset-latest"),
    babelrc: false
  }).code;
};
function dumpFiles(files, prop) {
  return _core.Iterable['$List<E>'].forEach.call(files, function (file) {
    (0, _core.print)();
    (0, _core.print)(file.absolutePath);
    var data = file[prop];
    if ((0, _js._typeof)(data) != "string") {
      data = (0, _util.inspect)(data, {
        colors: false,
        depth: 10
      });
    };
    return (0, _core.print)(data.split("\n").map(function (line) {
      return "  " + line + "";
    }).join("\n"));
  });
};
function createContext() {
  var ignoreErrors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  return {
    files: {},
    deferred: {},
    runTypeVisitor: function runTypeVisitor() {
      var self = this;
      return _js._Object.keys(self.files).map(function (path) {
        return self.files[path];
      }).forEach(function (file) {
        if (!file.typeVisitorStarted) {
          file.typeVisitorStarted = true;
          return (0, _type_visitor.TypeVisitor)(self, file).visitModule(file.ast);
        };
      });
    },
    runImplVisitor: function runImplVisitor() {
      var self = this;
      return _js._Object.keys(self.files).map(function (path) {
        return self.files[path];
      }).forEach(function (file) {
        return (0, _impl_visitor.ImplVisitor)(self, file).visitModule(file.ast);
      });
    },
    runChecker: function runChecker() {
      var self = this;
      return _js._Object.keys(self.files).map(function (path) {
        return self.files[path];
      }).forEach(function (file) {
        if (!file.scopeVisitorStarted) {
          file.scopeVisitorStarted = true;
          return (0, _scope_visitor.ScopeVisitor)(self, file).visitModule(file.ast);
        };
      });
    },
    runTypeVisitorOnFile: function runTypeVisitorOnFile(file) {
      var self = this;
      if (file.typeVisitorStarted) {
        throw "Circular import??";
      };
      file.typeVisitorStarted = true;
      return (0, _type_visitor.TypeVisitor)(self, file).visitModule(file.ast);
    },
    runCheckerOnFile: function runCheckerOnFile(file) {
      var self = this;
      if (!file.scopeVisitorStarted) {
        file.scopeVisitorStarted = true;
        return (0, _scope_visitor.ScopeVisitor)(self, file).visitModule(file.ast);
      };
    },
    defer: function defer(file, func) {
      var self = this;
      return self.deferred[file.absolutePath] = func;
    },
    resolvePath: function resolvePath(file, relativeTo) {
      var __PUCK__value__1 = void 0;
      if (file.substring(0, 1) == "/") {
        __PUCK__value__1 = file;
      } else {
        __PUCK__value__1 = path.join(path.dirname(relativeTo.absolutePath), file);
      };
      var filePath = __PUCK__value__1;
      var absolutePath = path.resolve(path.normalize(filePath));
      var fileName = path.basename(absolutePath);
      return {
        absolutePath: absolutePath,
        fileName: fileName,
        inspect: fileInspect
      };
    },
    importFile: function importFile(file) {
      var self = this;
      if (self.files[file.absolutePath] && file.outDir && file.outFile) {
        self.files[file.absolutePath].outDir = file.outDir;
        self.files[file.absolutePath].outFile = file.outFile;
      };
      if (!self.files[file.absolutePath]) {
        self.files[file.absolutePath] = file;
        if (!file.puck) {
          file.puck = fs.readFileSync(file.absolutePath, { encoding: "utf-8" });
        };
        file.ast = parseString(self, file);
        if (self.deferred[file.absolutePath]) {
          self.deferred[file.absolutePath]();
        };
      };
      return self.files[file.absolutePath];
    },
    reportError: function reportError(file, token, message) {
      var self = this;
      if (!ignoreErrors) {
        throw Error("" + message + "\n  in " + file.absolutePath);
      };
    }
  };
};
function buildString(code, filePath) {
  return (0, _js.asResult)(function () {
    var context = createContext();
    var file = context.importFile({
      isBin: false,
      fileName: path.basename(filePath),
      absolutePath: path.resolve(path.normalize(filePath)),
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
function build(files) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var dump = options.dump;
  var context = createContext(options.ignoreErrors);
  files = files.map(function (f) {
    var fileName = path.basename(f.file);
    var absolutePath = path.resolve(path.normalize(f.file));
    var outFile = path.normalize(f.outFile);
    var outDir = path.dirname(outFile);
    return {
      isBin: f.isBin,
      absolutePath: absolutePath,
      outFile: outFile,
      outDir: outDir,
      inspect: fileInspect
    };
  });
  files = files.map(function (f) {
    return context.importFile(f);
  });
  if (dump == "ast") {
    dumpFiles(files, "ast");
    return _js._undefined;
  };
  context.runTypeVisitor();
  if (dump == "typed-ast") {
    dumpFiles(files, "ast");
    return _js._undefined;
  };
  context.runImplVisitor();
  if (dump == "impl-ast") {
    dumpFiles(files, "ast");
    return _js._undefined;
  };
  context.runChecker();
  if (dump == "checked-ast") {
    dumpFiles(files, "ast");
    return _js._undefined;
  };
  files.forEach(function (file) {
    return file.js = compile(context, file);
  });
  if (dump == "js") {
    dumpFiles(files, "js");
    return _js._undefined;
  };
  files.forEach(function (file) {
    return file.babel = babelTransform(file);
  });
  return files.forEach(function (f) {
    var outDir = f.outDir;
    var outFile = f.outFile;
    (0, _helpers.cmd)("mkdir -p " + outDir + "");
    return fs.writeFileSync("" + outFile + "", f.babel + "\n", { mode: 511 });
  });
}
