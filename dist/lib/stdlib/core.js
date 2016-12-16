#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObjectMap = exports.Range = exports.List = exports.None = exports.Some = exports.Option = exports.Err = exports.Ok = exports.Result = exports.String = exports.Num = exports.Bool = exports.ObjectMapTrait = exports.RangeTrait = exports.Iterable = exports.ListTrait = exports.MaybeTrait = exports.ResultTrait = exports.StringTrait = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
    var __PUCK__value__1 = self;
    if (__PUCK__value__1.kind == "Ok") {
      var _PUCK__value__1$valu = _slicedToArray(__PUCK__value__1.value, 1);

      var value = _PUCK__value__1$valu[0];

      return op(value);
    } else {
      return self;
    };
  },
  map: function map(op) {
    var self = this;
    var __PUCK__value__2 = self;
    if (__PUCK__value__2.kind == "Ok") {
      var _PUCK__value__2$valu = _slicedToArray(__PUCK__value__2.value, 1);

      var value = _PUCK__value__2$valu[0];

      return Ok(op(value));
    } else {
      return self;
    };
  }
};
var MaybeTrait = exports.MaybeTrait = {
  isJust: function isJust() {
    var self = this;
    return self.kind == "Some";
  },
  isNothing: function isNothing() {
    var self = this;
    return !MaybeTrait['$Option'].isJust.call(self);
  },
  map: function map(f) {
    var self = this;
    var __PUCK__value__3 = self;
    if (__PUCK__value__3.kind == "Some") {
      var _PUCK__value__3$valu = _slicedToArray(__PUCK__value__3.value, 1);

      var value = _PUCK__value__3$valu[0];

      return Some(f(value));
    } else {
      return self;
    };
  },
  mapOr: function mapOr(_default, f) {
    var self = this;
    var __PUCK__value__4 = self;
    if (__PUCK__value__4.kind == "Some") {
      var _PUCK__value__4$valu = _slicedToArray(__PUCK__value__4.value, 1);

      var value = _PUCK__value__4$valu[0];

      return f(value);
    } else {
      return _default;
    };
  },
  mapOrElse: function mapOrElse(_default, f) {
    var self = this;
    var __PUCK__value__5 = self;
    if (__PUCK__value__5.kind == "Some") {
      var _PUCK__value__5$valu = _slicedToArray(__PUCK__value__5.value, 1);

      var value = _PUCK__value__5$valu[0];

      return f(value);
    } else {
      return _default();
    };
  },
  unwrap: function unwrap() {
    var self = this;
    if (MaybeTrait['$Option'].isNothing.call(self)) {
      throw (0, _js.Error)("Can not unwap empty maybe");
    };
    return self.value[0];
  },
  unwrapOr: function unwrapOr(_default) {
    var self = this;
    var __PUCK__value__6 = self;
    if (__PUCK__value__6.kind == "Some") {
      var _PUCK__value__6$valu = _slicedToArray(__PUCK__value__6.value, 1);

      var value = _PUCK__value__6$valu[0];

      return value;
    } else {
      return _default;
    };
  },
  unwrapOrElse: function unwrapOrElse(_default) {
    var self = this;
    var __PUCK__value__7 = self;
    if (__PUCK__value__7.kind == "Some") {
      var _PUCK__value__7$valu = _slicedToArray(__PUCK__value__7.value, 1);

      var value = _PUCK__value__7$valu[0];

      return value;
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
  },
  find: function find(predicate) {
    var self = this;
    var key = _js._Object.keys(self).find(function (key) {
      return predicate([key, self[key]]);
    });
    if (key) {
      return Some([key, self[key]]);
    } else {
      return None;
    };
  },
  forEach: function forEach(func) {
    var self = this;
    _js._Object.keys(self).forEach(function (key) {
      return func([key, self[key]]);
    });
    return [];
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
MaybeTrait['$Option'] = {
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
  enumerate: function enumerate() {
    var self = this;
    return self.map(function (element, index) {
      return [element, index];
    });
  },
  size: function size() {
    var self = this;
    return self.length;
  },
  find: function find(predicate) {
    var self = this;
    var index = self.findIndex(predicate);
    if (index >= 0) {
      return Some(self[index]);
    } else {
      return None;
    };
  },
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
  find: ObjectMapTrait.find,
  forEach: ObjectMapTrait.forEach,
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
var Option = exports.Option = {
  Some: function Some() {
    for (var _len3 = arguments.length, members = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      members[_key3] = arguments[_key3];
    }

    return { kind: 'Some', value: members };
  },
  None: { kind: 'None', value: Symbol('None') }
};
var Some = exports.Some = Option.Some;
var None = exports.None = Option.None;
var List = exports.List = function List(object) {
  return object;
};
var Range = exports.Range = function Range(object) {
  return object;
};
function print(message) {
  var extra = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  return _js.console.log.apply(_js.console, [message].concat(extra));
};
var ObjectMap = exports.ObjectMap = function ObjectMap(object) {
  return object;
};
