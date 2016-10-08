#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Iterable = undefined;
exports.print = print;
exports.objectFromList = objectFromList;

var _js = require('puck-lang/dist/lib/stdlib/js');

var Iterable = exports.Iterable = {};
Iterable['$List'] = {
  skip: function skip(count) {
    var self = this;
    return self.slice(count);
  },
  skipWhile: function skipWhile(test) {
    var self = this;
    var index = self.findIndex(function (e) {
      return !test(e);
    });
    if (index == -1) {
      return [];
    } else {
      return self.slice(index);
    };
  }
};
function print(message, a, b, c) {
  var args = [message];
  if (a != _js._undefined) {
    args.push(a);
  };
  if (b != _js._undefined) {
    args[2] = b;
  };
  if (c != _js._undefined) {
    args[3] = c;
  };
  return _js.console.log.apply(_js.console, args);
};
function objectFromList(list) {
  var object = {};
  list.forEach(function (item) {
    return object[item[0]] = item[1];
  });
  return object;
}
