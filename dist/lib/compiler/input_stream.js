#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputStream = InputStream;

var _js = require('./../stdlib/js');

function InputStream(input, file) {
  var pos = 0;
  var line = 1;
  var col = 1;
  function next() {
    var ch = input.charAt(pos);
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

    return input.charAt(pos + distance);
  };
  function eof() {
    return peek() == "";
  };
  function croak(msg) {
    _js.console.log(msg + " (" + line + ":" + col + ")\n    at " + file + "\n\n");
    return _js.process.exit(1);
  };
  return {
    next: next,
    peek: peek,
    eof: eof,
    croak: croak,
    getLine: function getLine() {
      return line;
    },
    getCol: function getCol() {
      return col;
    }
  };
}
