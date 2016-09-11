#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildString = buildString;
exports.build = build;

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _emitter = require('./compiler/emitter.js');

var _input_stream = require('./compiler/input_stream.js');

var _parser = require('./compiler/parser.js');

var _token_stream = require('./compiler/token_stream.js');

var _helpers = require('./helpers.js');

var _scope = require('./typeck/scope.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function buildString(puck, file) {
  var ast = (0, _parser.parse)((0, _token_stream.TokenStream)((0, _input_stream.InputStream)(puck, file)));
  (0, _scope.ScopeVisitor)().visitBlock(ast);
  return (0, _emitter.emitProgram)(ast);
};
function build(file, outFile) {
  file = path.normalize(file);
  outFile = path.normalize(outFile);
  var outDir = path.dirname(outFile);
  var puck = fs.readFileSync(file, { encoding: "utf-8" });
  var js = buildString(puck, file);
  (0, _helpers.cmd)("mkdir -p " + outDir + "");
  fs.writeFileSync("" + outFile + ".tmp", js);
  (0, _helpers.cmd)("babel " + outFile + ".tmp --out-file " + outFile + " && chmod +x " + outFile + "");
  return fs.unlinkSync("" + outFile + ".tmp");
}
