#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseString = parseString;
exports.compile = compile;
exports.build = build;

var _babelCore = require('babel-core');

var babel = _interopRequireWildcard(_babelCore);

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _emitter = require('./compiler/emitter.js');

var _input_stream = require('./compiler/input_stream.js');

var _parser = require('./compiler/parser.js');

var _token_stream = require('./compiler/token_stream.js');

var _js = require('./stdlib/js.js');

var _helpers = require('./helpers.js');

var _import = require('./typeck/import.js');

var _scope = require('./typeck/scope.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function parseString(context, file) {
  var ast = (0, _parser.parse)((0, _token_stream.TokenStream)((0, _input_stream.InputStream)(file)), file);
  (0, _import.ImportVisitor)(context, file).visitModule(ast);
  (0, _scope.ScopeVisitor)(context, file).visitModule(ast);
  return ast;
};
function compile(context, file) {
  return (0, _emitter.Emitter)().emitModule(file.ast);
};
function build(files) {
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
    resolvePath: function resolvePath(file, relativeTo) {
      var filePath = path.join(path.dirname(relativeTo.absolutePath), file);
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
        file.puck = fs.readFileSync(file.absolutePath, { encoding: "utf-8" });
        file.ast = parseString(context, file);
        self.files[file.absolutePath] = file;
      };
      return self.files[file.absolutePath];
    },
    reportError: function reportError(file, token, message) {
      _js.console.error("" + message + "\n  in " + file.absolutePath);
      return _js.process.exit(1);
    }
  };
  files = files.map(function (f) {
    return context.importFile(f);
  });
  files.forEach(function (file) {
    file.js = compile(context, file);
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
