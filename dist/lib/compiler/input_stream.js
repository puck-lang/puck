'use strict';
exports.InputStream = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("./../ast/span");
const $puck_4 = require("./../entities");
const $puck_5 = require("./../compiler");
var InputStream = exports.InputStream = (object) => object;
InputStream._new = function (context, file) {
  let $puck_6;
  if ($puck_1.String.startsWith.call(file.puck, "//#![no_core]")) {
    $puck_6 = "\n" + file.puck.slice(13);
  }
  else {
    $puck_6 = "import 'puck:core' as *\n" + file.puck;
  };
  return {
    context: context,
    file: file,
    code: $puck_6,
    pos: 0,
    line: 0,
    column: 0,
  };
};
InputStream.position = function () {
  const self = this;
  return {
    line: self.line,
    column: self.column,
  };
};
InputStream.next = function () {
  let self = this;
  if (($puck_1.String.size.call(self.code) <= self.pos)) {
    return "";
  };
  const ch = $puck_1.Index["$impl_Index$String"].index.call({type: '$impl_Index$String', value: self.code, $isTraitObject: true}, self.pos);
  self.pos += 1;
  if (ch === "\n") {
    self.line += 1;
    self.column = 1;
  }
  else {
    self.column += 1;
  };
  return ch;
};
InputStream.peek = function (distance = 0) {
  const self = this;
  if ($puck_1.String.size.call(self.code) <= self.pos + distance) {
    return "";
  }
  else {
    return $puck_1.Index["$impl_Index$String"].index.call({type: '$impl_Index$String', value: self.code, $isTraitObject: true}, self.pos + distance);
  };
};
InputStream.eof = function () {
  const self = this;
  return (InputStream.peek.call(self) === "");
};
InputStream.croak = function (message) {
  const self = this;
  const span = {
    start: {
    line: self.line,
    column: self.column,
  },
    end: {
    line: self.line,
    column: self.column + 1,
  },
  };
  const token = {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/span.puck:Span', value: span, $isTraitObject: true};
  $puck_5.CompilerContext.reportError.call(self.context, self.file, token, $puck_4.CompilationError.Other(message));
  return $puck_1.panic("Syntax Error");
}
