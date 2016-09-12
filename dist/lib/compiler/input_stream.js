#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputStream = InputStream;

var _js = require('puck-lang/dist/lib/stdlib/js');

function InputStream(file) {
  var pos = 0;
  var line = 1;
  var col = 1;
  function next() {
    var ch = file.puck.charAt(pos);
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

    return file.puck.charAt(pos + distance);
  };
  function eof() {
    return peek() == "";
  };
  function croak(msg) {
    _js.console.log("" + msg + "\n    at " + file.absolutePath + "  (" + line + ":" + col + ")\n\n");
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
