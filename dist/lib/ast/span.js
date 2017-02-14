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
var ToSpan = exports.ToSpan = {};
ToSpan['$Span'] = {
  span: function span() {
    var self = this;
    return self.value;
  }
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