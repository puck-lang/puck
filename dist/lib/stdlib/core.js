#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObjectMapTrait = exports.RangeTrait = exports.Iterable = exports.ListTrait = exports.StringTrait = undefined;
exports.print = print;

var _js = require('puck-lang/dist/lib/stdlib/js');

var StringTrait = exports.StringTrait = {
  contains: function contains(subStr) {
    var self = this;
    return self.indexOf(subStr) >= 0;
  }
};
var ListTrait = exports.ListTrait = {
  zip: function zip(a, b) {
    if (a.length != b.length) {
      throw (0, _js.Error)("List a and b are not of the same length");
    };
    return a.map(function (a, i) {
      return [a, b[i]];
    });
  }
};
var Iterable = exports.Iterable = {};
var RangeTrait = exports.RangeTrait = {};
var ObjectMapTrait = exports.ObjectMapTrait = {
  _new: function _new() {
    return _js._Object.create(_js._null);
  },
  fromList: function fromList(list) {
    var object = _js._Object.create(_js._null);
    list.forEach(function (item) {
      return object[item[0]] = item[1];
    });
    return object;
  },
  map: function map(mapper) {
    var self = this;
    var _new = ObjectMapTrait._new();
    _js._Object.keys(self).forEach(function (key) {
      return _new[key] = mapper(self[key]);
    });
    return _new;
  }
};
StringTrait['$String'] = {
  contains: StringTrait.contains
};
ListTrait['$List'] = {
  zip: ListTrait.zip
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
ObjectMapTrait['$ObjectMap'] = {
  _new: ObjectMapTrait._new,
  fromList: ObjectMapTrait.fromList,
  map: ObjectMapTrait.map
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
}
