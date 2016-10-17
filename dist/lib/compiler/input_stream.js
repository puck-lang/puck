#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputStream = InputStream;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _entities = require('./../entities.js');

function InputStream(file) {
  var __PUCK__value__1 = void 0;
  if (file.puck.substring(0, 13) == "//#![no_core]") {
    __PUCK__value__1 = file.puck.slice(13);
  } else {
    __PUCK__value__1 = "import 'puck:core' as *\n" + file.puck;
  };
  var code = __PUCK__value__1;
  var pos = 0;
  var line = 0;
  var col = 1;
  function next() {
    var ch = code.charAt(pos);
    pos = pos + 1;
    if (ch == "\n") {
      line = line + 1;
      col = 1;
    } else {
      col = col + 1;
    };
    return ch;
  };
  function peek() {
    var distance = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

    return code.charAt(pos + distance);
  };
  function eof() {
    return peek() == "";
  };
  function croak(msg) {
    _js.console.log("" + msg + "\n    at " + file.absolutePath + "  (" + line + ":" + col + ")\n\n");
    throw Error();
    return _js.process.exit(1);
  };
  return {
    next: next,
    peek: peek,
    eof: eof,
    croak: croak,
    file: file,
    getLine: function getLine() {
      return line;
    },
    getCol: function getCol() {
      return col;
    }
  };
}
