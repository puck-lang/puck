'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToSpan = exports.Span = exports.Position = undefined;

var _core = require('puck-lang/dist/lib/stdlib/core');

var Position = exports.Position = function Position(object) {
  return object;
};
var Span = exports.Span = function Span(object) {
  return object;
};
var ToSpan = exports.ToSpan = {
  span: function span() {
    var self = this;
    return {
      start: ToSpan[self.type].start.call(self),
      end: ToSpan[self.type].end.call(self)
    };
  },
  start: function start() {
    var self = this;
    return ToSpan[self.type].span.call(self).start;
  },
  end: function end() {
    var self = this;
    return ToSpan[self.type].span.call(self).end;
  }
};
ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/span.puck:Span"] = {
  span: function span() {
    var self = this;
    return self.value;
  },
  start: ToSpan.start,
  end: ToSpan.end
};
Span.empty = function empty() {
  return {
    start: {
      line: 0,
      column: 0
    },
    end: {
      line: 0,
      column: 0
    }
  };
};
Span.cmp = function cmp(position) {
  var self = this;
  if (position.line < self.start.line || position.line == self.start.line && position.column < self.start.column) {
    return _core.Ordering.Greater;
  } else {
    if (position.line > self.end.line || position.line == self.end.line && position.column > self.end.column) {
      return _core.Ordering.Less;
    } else {
      return _core.Ordering.Equal;
    };
  };
};
