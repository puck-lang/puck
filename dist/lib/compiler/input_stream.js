'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputStream = InputStream;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _span = require('./../ast/span');

var _entities = require('./../entities');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};
function InputStream(context, file) {
  var __PUCK__value__1 = void 0;
  if (file.puck.substring(0, 13) == "//#![no_core]") {
    __PUCK__value__1 = file.puck.slice(13);
  } else {
    __PUCK__value__1 = "import 'puck:core' as *\n" + file.puck;
  };
  var code = __PUCK__value__1;
  var pos = 0;
  var line = 0;
  var column = 1;
  function next() {
    var ch = $unwrapTraitObject(code).charAt(pos);
    pos = pos + 1;
    if (ch == "\n") {
      line = line + 1;
      column = 1;
    } else {
      column = column + 1;
    };
    return ch;
  };
  function peek() {
    var distance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    return $unwrapTraitObject(code).charAt(pos + distance);
  };
  function eof() {
    return peek() == "";
  };
  function croak(message) {
    var span = {
      start: {
        line: line,
        column: column
      },
      end: {
        line: line,
        column: column + 1
      }
    };
    var token = { type: '$Span', value: span, $isTraitObject: true };
    $unwrapTraitObject(context).reportError(file, token, message);
    throw "Syntax Error";
  };
  return {
    next: next,
    peek: peek,
    eof: eof,
    croak: croak,
    file: file,
    getPosition: function getPosition() {
      return {
        line: line,
        column: column
      };
    }
  };
}
