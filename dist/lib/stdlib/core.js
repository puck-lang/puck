#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RangeTrait = exports.Iterable = exports.StringTrait = undefined;
exports.print = print;
exports.objectFromList = objectFromList;

var _js = require('puck-lang/dist/lib/stdlib/js');

var StringTrait = exports.StringTrait = {
  contains: function contains(subStr) {
    var self = this;
    return self.indexOf(subStr) >= 0;
  }
};
var Iterable = exports.Iterable = {};
var RangeTrait = exports.RangeTrait = {};
StringTrait['$String'] = {
  contains: StringTrait.contains
};
Iterable['$List'] = {
  skip: function skip(count) {
    var self = this;
    return self.slice(count);
  },
  skipUntil: function skipUntil(test) {
    var self = this;
    var index = self.findIndex(test);
    if (index == -1) {
      return [];
    } else {
      return self.slice(index);
    };
  }
};
RangeTrait['$Range<Num>'] = {
  contains: function contains(item) {
    var self = this;
    return self.start <= item && item < self.end;
  },
  isSubsetOf: function isSubsetOf(other) {
    var self = this;
    return self.start >= other.start && other.end >= self.end;
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
  var object = _js._Object.create(_js._null);
  list.forEach(function (item) {
    return object[item[0]] = item[1];
  });
  return object;
}
