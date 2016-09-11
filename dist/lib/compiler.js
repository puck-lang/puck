#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildString = buildString;
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

function buildString(context, puck, file) {
  var ast = (0, _parser.parse)((0, _token_stream.TokenStream)((0, _input_stream.InputStream)(puck, file)));
  (0, _import.ImportVisitor)(context, file).visitBlock(ast);
  (0, _scope.ScopeVisitor)(context, file).visitBlock(ast);
  return (0, _emitter.Emitter)().emitProgram(ast);
};
function build(files) {
  files = files.map(function (f) {
    var file = path.resolve(path.normalize(f.file));
    var outFile = path.normalize(f.outFile);
    var outDir = path.dirname(outFile);
    return {
      file: file,
      outFile: outFile,
      outDir: outDir
    };
  });
  var context = {
    files: {},
    resolvePath: function resolvePath(file, relativeTo) {
      return path.resolve(path.normalize(path.join(path.dirname(relativeTo), file)));
    },
    importFile: function importFile(file) {
      var self = this;
      if ((0, _js._typeof)(file) == "string") {
        file = { file: file };
      } else {
        if (self.files[file.file]) {
          self.files[file.file].outDir = file.outDir;
          self.files[file.file].outFile = file.outFile;
        };
      };
      if (!self.files[file.file]) {
        file.puck = fs.readFileSync(file.file, { encoding: "utf-8" });
        file.js = buildString(context, file.puck, file.file);
        self.files[file.file] = file;
      };
      return self.files[file.file];
    },
    reportError: function reportError(file, token, message) {
      throw "" + message + " in " + file + "";
    }
  };
  files = files.map(function (f) {
    return context.importFile(f);
  });
  files.forEach(function (f) {
    return f.babel = babel.transform(f.js, {
      filename: f.file,
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
