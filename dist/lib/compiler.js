#!/usr/bin/env node

'use strict';

var fs = require("fs");
var path = require("path");
var InputStream = require("./compiler/input_stream").InputStream;
var TokenStream = require("./compiler/token_stream").TokenStream;
var parse = require("./compiler/parser").parse;
var emitProgram = require("./compiler/emitter").emitProgram;
var cmd = require("./helpers").cmd;
var scopeVisitor = require("./typeck/scope").scopeVisitor;
function buildString(puck, file) {
  var ast = parse(TokenStream(InputStream(puck, file)));
  scopeVisitor.visitBlock(ast);
  return emitProgram(ast);
};
function build(file, outFile) {
  file = path.normalize(file);
  outFile = path.normalize(outFile);
  var outDir = path.dirname(outFile);
  var puck = fs.readFileSync(file, { encoding: "utf-8" });
  var js = buildString(puck, file);
  return cmd("mkdir -p " + outDir)["then"](function () {
    return fs.writeFileSync(outFile + ".tmp", js);
  })["then"](function () {
    return cmd("babel " + outFile + ".tmp --out-file " + outFile + " && chmod +x " + outFile);
  })["then"](function () {
    return fs.unlinkSync(outFile + ".tmp");
  });
};
module.exports.buildString = buildString;
module.exports.build = build;
