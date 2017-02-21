'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputStream = undefined;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _span = require('./../ast/span');

var _entities = require('./../entities');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};
var InputStream = exports.InputStream = function InputStream(object) {
  return object;
};
InputStream._new = function _new(context, file) {
  var __PUCK__value__1 = void 0;
  if (file.puck.substring(0, 13) == "//#![no_core]") {
    __PUCK__value__1 = "\n" + file.puck.slice(13);
  } else {
    __PUCK__value__1 = "import 'puck:core' as *\n" + file.puck;
  };
  return {
    context: context,
    file: file,
    code: __PUCK__value__1,
    pos: 0,
    line: 0,
    column: 0
  };
};
InputStream.position = function position() {
  var self = this;
  return {
    line: self.line,
    column: self.column
  };
};
InputStream.next = function next() {
  var self = this;
  var ch = self.code.charAt(self.pos);
  self.pos += 1;
  if (ch == "\n") {
    self.line += 1;
    self.column = 1;
  } else {
    self.column += 1;
  };
  return ch;
};
InputStream.peek = function peek() {
  var distance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  var self = this;
  return self.code.charAt(self.pos + distance);
};
InputStream.eof = function eof() {
  var self = this;
  return InputStream.peek.call(self) == "";
};
InputStream.croak = function croak(message) {
  var self = this;
  var span = {
    start: {
      line: self.line,
      column: self.column
    },
    end: {
      line: self.line,
      column: self.column + 1
    }
  };
  var token = { type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/span.puck:Span', value: span, $isTraitObject: true };
  $unwrapTraitObject(self.context).reportError(self.file, token, message);
  throw "Syntax Error";
};
