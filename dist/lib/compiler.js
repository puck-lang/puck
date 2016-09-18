#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseString = parseString;
exports.compile = compile;
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

var _emitter = require('./compiler/emitter.js');

var _input_stream = require('./compiler/input_stream.js');

var _parser = require('./compiler/parser.js');

var _token_stream = require('./compiler/token_stream.js');

var _helpers = require('./helpers.js');

var _import = require('./typeck/import.js');

var _scope = require('./typeck/scope.js');

require('./entities.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function parseString(context, file) {
  var ast = (0, _parser.parse)((0, _token_stream.TokenStream)((0, _input_stream.InputStream)(file)), file);
  (0, _scope.TopScopeVisitor)(context, file).visitModule(ast);
  (0, _import.ImportVisitor)(context, file).visitModule(ast);
  return ast;
};
function compile(context, file) {
  return (0, _emitter.Emitter)(context, file).emitModule(file.ast);
};
function dumpFiles(files, prop) {
  return files.forEach(function (file) {
    (0, _core.print)();
    (0, _core.print)(file.absolutePath);
    var data = file[prop];
    if ((0, _js._typeof)(data) != "string") {
      data = (0, _util.inspect)(data, {
        colors: true,
        depth: 5
      });
    };
    return (0, _core.print)(data.split("\n").map(function (line) {
      return "  " + line + "";
    }).join("\n"));
  });
};
function build(files) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var dump = options.dump;
  files = files.map(function (f) {
    var fileName = path.basename(f.file);
    var absolutePath = path.resolve(path.normalize(f.file));
    var outFile = path.normalize(f.outFile);
    var outDir = path.dirname(outFile);
    return {
      absolutePath: absolutePath,
      outFile: outFile,
      outDir: outDir
    };
  });
  var context = {
    files: {},
    deferred: {},
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
        fileName: fileName
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
        file.puck = fs.readFileSync(file.absolutePath, { encoding: "utf-8" });
        file.ast = parseString(context, file);
        if (self.deferred[file.absolutePath]) {
          self.deferred[file.absolutePath]();
        };
      };
      return self.files[file.absolutePath];
    },
    reportError: function reportError(file, token, message) {
      if (!options.ignoreErrors) {
        _js.console.error("" + message + "\n  in " + file.absolutePath);
        throw Error();
        return _js.process.exit(1);
      };
    }
  };
  files = files.map(function (f) {
    return context.importFile(f);
  });
  if (dump == "ast") {
    dumpFiles(files, "ast");
    return _js._undefined;
  };
  _js._Object.keys(context.files).map(function (path) {
    return context.files[path];
  }).forEach(function (file) {
    return (0, _scope.ScopeVisitor)(context, file).visitModule(file.ast);
  });
  if (dump == "typed-ast") {
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
    return file.babel = babel.transform(file.js, {
      filename: file.absolutePath,
      presets: "latest",
      babelrc: false
    }).code;
  });
  return files.forEach(function (f) {
    var outDir = f.outDir;
    var outFile = f.outFile;
    (0, _helpers.cmd)("mkdir -p " + outDir + "");
    return fs.writeFileSync("" + outFile + "", f.babel + "\n", { mode: 511 });
  });
}
