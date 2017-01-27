'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.None = exports.Some = exports.Err = exports.Ok = exports.Iterable = exports.Option = exports.Result = exports.ObjectMap = exports.Range = exports.List = exports.String = exports.Num = exports.Bool = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.print = print;

var _js = require('puck-lang/dist/lib/stdlib/js');

var Bool = exports.Bool = function Bool(object) {
  return object;
};
var Num = exports.Num = function Num(object) {
  return object;
};
var String = exports.String = function String(object) {
  return object;
};
var List = exports.List = function List(object) {
  return object;
};
var Range = exports.Range = function Range(object) {
  return object;
};
var ObjectMap = exports.ObjectMap = function ObjectMap(object) {
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
var Option = exports.Option = {
  Some: function Some() {
    for (var _len3 = arguments.length, members = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      members[_key3] = arguments[_key3];
    }

    return { kind: 'Some', value: members };
  },
  None: { kind: 'None', value: Symbol('None') }
};
var Iterable = exports.Iterable = {};
Iterable['$List<E>'] = {
  enumerate: function enumerate() {
    var self = this;
    return anyCast(self).map(function (element, index) {
      return [element, index];
    });
  },
  size: function size() {
    var self = this;
    return self.length;
  },
  isEmpty: function isEmpty() {
    var self = this;
    return self.length == 0;
  },
  isNotEmpty: function isNotEmpty() {
    var self = this;
    return self.length > 0;
  },
  first: function first() {
    var self = this;
    if (self.length > 0) {
      return Some(self[0]);
    } else {
      return None;
    };
  },
  last: function last() {
    var self = this;
    if (self.length > 0) {
      return Some(self[self.length - 1]);
    } else {
      return None;
    };
  },
  all: function all(predicate) {
    var self = this;
    var i = 0;
    while (i < self.length) {
      if (!predicate(self[i])) {
        return false;
      };
      i += 1;
    };
    return true;
  },
  any: function any(predicate) {
    var self = this;
    var i = 0;
    while (i < self.length) {
      if (predicate(self[i])) {
        return true;
      };
      i += 1;
    };
    return false;
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
  forEach: function forEach(func) {
    var self = this;
    return anyCast(self).forEach(func);
  },
  map: function map(func) {
    var self = this;
    return anyCast(self).map(func);
  },
  skip: function skip(count) {
    var self = this;
    return self.slice(count);
  },
  skipUntil: function skipUntil(predicate) {
    var self = this;
    var index = self.findIndex(predicate);
    if (index == -1) {
      return [];
    } else {
      return self.slice(index);
    };
  }
};
String.contains = function contains(subStr) {
  var self = this;
  return self.indexOf(subStr) >= 0;
};
Result.isOk = function isOk() {
  var self = this;
  return self.kind == "Ok";
};
Result.isErr = function isErr() {
  var self = this;
  return !Result.isOk.call(self);
};
Result.andThen = function andThen(op) {
  var self = this;
  var __PUCK__value__1 = self;
  if (__PUCK__value__1.kind == "Ok") {
    var _PUCK__value__1$valu = _slicedToArray(__PUCK__value__1.value, 1),
        value = _PUCK__value__1$valu[0];

    return op(value);
  } else {
    return self;
  };
};
Result.map = function map(op) {
  var self = this;
  var __PUCK__value__2 = self;
  if (__PUCK__value__2.kind == "Ok") {
    var _PUCK__value__2$valu = _slicedToArray(__PUCK__value__2.value, 1),
        value = _PUCK__value__2$valu[0];

    return Ok(op(value));
  } else {
    return self;
  };
};
Result.mapErr = function mapErr(op) {
  var self = this;
  var __PUCK__value__3 = self;
  if (__PUCK__value__3.kind == "Err") {
    var _PUCK__value__3$valu = _slicedToArray(__PUCK__value__3.value, 1),
        value = _PUCK__value__3$valu[0];

    return Err(op(value));
  } else {
    return self;
  };
};
Result.unwrap = function unwrap() {
  var self = this;
  if (Result.isErr.call(self)) {
    throw (0, _js.Error)(self.value[0]);
  };
  return self.value[0];
};
Result.unwrapErr = function unwrapErr() {
  var self = this;
  if (Result.isOk.call(self)) {
    throw (0, _js.Error)(self.value[0]);
  };
  return self.value[0];
};
Option.isSome = function isSome() {
  var self = this;
  return self.kind == "Some";
};
Option.isNone = function isNone() {
  var self = this;
  return !Option.isSome.call(self);
};
Option.andThen = function andThen(op) {
  var self = this;
  var __PUCK__value__4 = self;
  if (__PUCK__value__4.kind == "Some") {
    var _PUCK__value__4$valu = _slicedToArray(__PUCK__value__4.value, 1),
        value = _PUCK__value__4$valu[0];

    return op(value);
  } else {
    return self;
  };
};
Option.map = function map(f) {
  var self = this;
  var __PUCK__value__5 = self;
  if (__PUCK__value__5.kind == "Some") {
    var _PUCK__value__5$valu = _slicedToArray(__PUCK__value__5.value, 1),
        value = _PUCK__value__5$valu[0];

    return Some(f(value));
  } else {
    return self;
  };
};
Option.mapOr = function mapOr(_default, f) {
  var self = this;
  var __PUCK__value__6 = self;
  if (__PUCK__value__6.kind == "Some") {
    var _PUCK__value__6$valu = _slicedToArray(__PUCK__value__6.value, 1),
        value = _PUCK__value__6$valu[0];

    return f(value);
  } else {
    return _default;
  };
};
Option.mapOrElse = function mapOrElse(_default, f) {
  var self = this;
  var __PUCK__value__7 = self;
  if (__PUCK__value__7.kind == "Some") {
    var _PUCK__value__7$valu = _slicedToArray(__PUCK__value__7.value, 1),
        value = _PUCK__value__7$valu[0];

    return f(value);
  } else {
    return _default();
  };
};
Option.unwrap = function unwrap() {
  var self = this;
  if (Option.isNone.call(self)) {
    throw (0, _js.Error)("Can not unwrap empty Option");
  };
  return self.value[0];
};
Option.unwrapOr = function unwrapOr(_default) {
  var self = this;
  var __PUCK__value__8 = self;
  if (__PUCK__value__8.kind == "Some") {
    var _PUCK__value__8$valu = _slicedToArray(__PUCK__value__8.value, 1),
        value = _PUCK__value__8$valu[0];

    return value;
  } else {
    return _default;
  };
};
Option.unwrapOrElse = function unwrapOrElse(_default) {
  var self = this;
  var __PUCK__value__9 = self;
  if (__PUCK__value__9.kind == "Some") {
    var _PUCK__value__9$valu = _slicedToArray(__PUCK__value__9.value, 1),
        value = _PUCK__value__9$valu[0];

    return value;
  } else {
    return _default();
  };
};
List.zip = function zip(a, b) {
  if (a.length != b.length) {
    throw (0, _js.Error)("List a and b are not of the same length");
  };
  return Iterable['$List<E>'].map.call(Iterable['$List<E>'].enumerate.call(a), function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        a = _ref2[0],
        i = _ref2[1];

    return [a, b[i]];
  });
};
List.add = function add(element) {
  var self = this;
  return self.push(element);
};
Range.contains = function contains(item) {
  var self = this;
  return self.start <= item && item < self.end;
};
Range.isSubsetOf = function isSubsetOf(other) {
  var self = this;
  return self.start >= other.start && other.end >= self.end;
};
ObjectMap._new = function _new() {
  return _js._Object.create(_js._null);
};
ObjectMap.fromList = function fromList(list) {
  var object = _js._Object.create(_js._null);
  Iterable['$List<E>'].forEach.call(list, function (item) {
    return object[item[0]] = item[1];
  });
  return object;
};
ObjectMap.keys = function keys() {
  var self = this;
  return _js._Object.keys(self);
};
ObjectMap.values = function values() {
  var self = this;
  return _js._Object.keys(self).map(function (key) {
    return self[key];
  });
};
ObjectMap.toList = function toList() {
  var self = this;
  return _js._Object.keys(self).map(function (key) {
    return [key, self[key]];
  });
};
ObjectMap.all = function all(predicate) {
  var self = this;
  var i = 0;
  var keys = _js._Object.keys(self);
  while (i < keys.length) {
    if (!predicate(self[keys[i]])) {
      return false;
    };
    i += 1;
  };
  return true;
};
ObjectMap.any = function any(predicate) {
  var self = this;
  var i = 0;
  var keys = _js._Object.keys(self);
  while (i < keys.length) {
    if (predicate(self[keys[i]])) {
      return true;
    };
    i += 1;
  };
  return false;
};
ObjectMap.map = function map(mapper) {
  var self = this;
  var _new = ObjectMap._new.call(ObjectMap);
  _js._Object.keys(self).forEach(function (key) {
    return _new[key] = mapper(self[key]);
  });
  return _new;
};
ObjectMap.find = function find(predicate) {
  var self = this;
  var key = _js._Object.keys(self).find(function (key) {
    return predicate([key, self[key]]);
  });
  if (key) {
    return Some([key, self[key]]);
  } else {
    return None;
  };
};
ObjectMap.forEach = function forEach(func) {
  var self = this;
  _js._Object.keys(self).forEach(function (key) {
    return func([key, self[key]]);
  });
  return [];
};
ObjectMap.has = function has(key) {
  var self = this;
  return _js._Object.prototype.hasOwnProperty.call(self, key);
};
ObjectMap.get = function get(key) {
  var self = this;
  if (ObjectMap.has.call(self, key)) {
    return Some(self[key]);
  } else {
    return None;
  };
};
ObjectMap.size = function size() {
  var self = this;
  return _js._Object.keys(self).length;
};
var Ok = exports.Ok = Result.Ok;
var Err = exports.Err = Result.Err;
var Some = exports.Some = Option.Some;
var None = exports.None = Option.None;
function anyCast(a) {
  return a;
};
function print(message) {
  var extra = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return _js.console.log.apply(_js.console, [message].concat(extra));
}
