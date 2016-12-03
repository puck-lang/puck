#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObjectMap = exports.Range = exports.List = exports.Nothing = exports.Just = exports.Maybe = exports.Err = exports.Ok = exports.Result = exports.String = exports.Num = exports.Bool = exports.ObjectMapTrait = exports.RangeTrait = exports.Iterable = exports.ListTrait = exports.MaybeTrait = exports.ResultTrait = exports.StringTrait = undefined;
exports.print = print;

var _js = require('puck-lang/dist/lib/stdlib/js');

var StringTrait = exports.StringTrait = {
  contains: function contains(subStr) {
    var self = this;
    return self.indexOf(subStr) >= 0;
  }
};
var ResultTrait = exports.ResultTrait = {
  isOk: function isOk() {
    var self = this;
    return self.kind == "Ok";
  },
  isErr: function isErr() {
    var self = this;
    return !ResultTrait['$Result'].isOk.call(self);
  },
  andThen: function andThen(op) {
    var self = this;
    if (ResultTrait['$Result'].isOk.call(self)) {
      return op(self.value[0]);
    } else {
      return self;
    };
  },
  map: function map(op) {
    var self = this;
    if (ResultTrait['$Result'].isOk.call(self)) {
      return Ok(op(self.value[0]));
    } else {
      return self;
    };
  }
};
var MaybeTrait = exports.MaybeTrait = {
  isJust: function isJust() {
    var self = this;
    return self.kind == "Just";
  },
  isNothing: function isNothing() {
    var self = this;
    return !MaybeTrait['$Maybe'].isJust.call(self);
  },
  map: function map(f) {
    var self = this;
    if (MaybeTrait['$Maybe'].isJust.call(self)) {
      return Just(f(MaybeTrait['$Maybe'].unwrap.call(self)));
    } else {
      return self;
    };
  },
  mapOr: function mapOr(_default, f) {
    var self = this;
    if (MaybeTrait['$Maybe'].isJust.call(self)) {
      return f(MaybeTrait['$Maybe'].unwrap.call(self));
    } else {
      return _default;
    };
  },
  mapOrElse: function mapOrElse(_default, f) {
    var self = this;
    if (MaybeTrait['$Maybe'].isJust.call(self)) {
      return f(MaybeTrait['$Maybe'].unwrap.call(self));
    } else {
      return _default();
    };
  },
  unwrap: function unwrap() {
    var self = this;
    if (MaybeTrait['$Maybe'].isNothing.call(self)) {
      throw (0, _js.Error)("Can not unwap empty maybe");
    };
    return self.value[0];
  },
  unwrapOr: function unwrapOr(_default) {
    var self = this;
    if (MaybeTrait['$Maybe'].isJust.call(self)) {
      return self.value[0];
    } else {
      return _default;
    };
  },
  unwrapOrElse: function unwrapOrElse(_default) {
    var self = this;
    if (MaybeTrait['$Maybe'].isJust.call(self)) {
      return self.value[0];
    } else {
      return _default();
    };
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
var Iterable = exports.Iterable = {
  size: function size() {
    var self = this;
    return self.length;
  }
};
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
  },
  size: function size() {
    var self = this;
    return _js._Object.keys(self).length;
  }
};
StringTrait['$String'] = {
  contains: StringTrait.contains
};
ResultTrait['$Result'] = {
  isOk: ResultTrait.isOk,
  isErr: ResultTrait.isErr,
  andThen: ResultTrait.andThen,
  map: ResultTrait.map
};
MaybeTrait['$Maybe'] = {
  isJust: MaybeTrait.isJust,
  isNothing: MaybeTrait.isNothing,
  map: MaybeTrait.map,
  mapOr: MaybeTrait.mapOr,
  mapOrElse: MaybeTrait.mapOrElse,
  unwrap: MaybeTrait.unwrap,
  unwrapOr: MaybeTrait.unwrapOr,
  unwrapOrElse: MaybeTrait.unwrapOrElse
};
ListTrait['$List'] = {
  zip: ListTrait.zip
};
Iterable['$List'] = {
  size: Iterable.size,
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
  map: ObjectMapTrait.map,
  size: ObjectMapTrait.size
};
var Bool = exports.Bool = function Bool(object) {
  return object;
};
var Num = exports.Num = function Num(object) {
  return object;
};
var String = exports.String = function String(object) {
  return object;
};
var Result = exports.Result = {
  Ok: function Ok() {
    for (var _len = arguments.length, members = Array(_len), _key = 0; _key < _len; _key++) {
      members[_key] = arguments[_key];
    }

    return { kind: 'Ok', value: members };
  },
  Err: function Err() {
    for (var _len2 = arguments.length, members = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      members[_key2] = arguments[_key2];
    }

    return { kind: 'Err', value: members };
  }
};
var Ok = exports.Ok = Result.Ok;
var Err = exports.Err = Result.Err;
var Maybe = exports.Maybe = {
  Just: function Just() {
    for (var _len3 = arguments.length, members = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      members[_key3] = arguments[_key3];
    }

    return { kind: 'Just', value: members };
  },
  Nothing: { kind: 'Nothing', value: Symbol('Nothing') }
};
var Just = exports.Just = Maybe.Just;
var Nothing = exports.Nothing = Maybe.Nothing;
var List = exports.List = function List(object) {
  return object;
};
var Range = exports.Range = function Range(object) {
  return object;
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
var ObjectMap = exports.ObjectMap = function ObjectMap(object) {
  return object;
};
