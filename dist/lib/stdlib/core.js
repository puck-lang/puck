'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.None = exports.Some = exports.Err = exports.Ok = exports.Iterable = exports.Never = exports.Option = exports.Result = exports.ObjectMap = exports.Range = exports.List = exports.String = exports.Num = exports.Bool = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.print = print;

var _js = require('puck-lang/dist/lib/stdlib/js');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
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
var Never = exports.Never = {};
var Iterable = exports.Iterable = {};
Iterable['$List<E>'] = {
  enumerate: function enumerate() {
    var self = this;
    return { type: '$List<E>', value: asList($unwrapTraitObject(anyCast(self)).map(function (element, index) {
        return [element, index];
      })), $isTraitObject: true };
  },
  size: function size() {
    var self = this;
    return self.value.length;
  },
  isEmpty: function isEmpty() {
    var self = this;
    return self.value.length == 0;
  },
  isNotEmpty: function isNotEmpty() {
    var self = this;
    return self.value.length > 0;
  },
  first: function first() {
    var self = this;
    if (self.value.length > 0) {
      return Some(self.value[0]);
    } else {
      return None;
    };
  },
  last: function last() {
    var self = this;
    if (self.value.length > 0) {
      return Some(self.value[$unwrapTraitObject(self.value.length - 1)]);
    } else {
      return None;
    };
  },
  all: function all(predicate) {
    var self = this;
    var i = 0;
    while (i < self.value.length) {
      if (!predicate(self.value[i])) {
        return false;
      };
      i += 1;
    };
    return true;
  },
  any: function any(predicate) {
    var self = this;
    var i = 0;
    while (i < self.value.length) {
      if (predicate(self.value[i])) {
        return true;
      };
      i += 1;
    };
    return false;
  },
  find: function find(predicate) {
    var self = this;
    var index = self.value.findIndex(predicate);
    if (index >= 0) {
      return Some(self.value[$unwrapTraitObject(index)]);
    } else {
      return None;
    };
  },
  filter: function filter(func) {
    var self = this;
    return { type: '$List<E>', value: asList($unwrapTraitObject(anyCast(self)).filter(func)), $isTraitObject: true };
  },
  forEach: function forEach(func) {
    var self = this;
    return $unwrapTraitObject(anyCast(self)).forEach(func);
  },
  map: function map(func) {
    var self = this;
    return { type: '$List<E>', value: asList($unwrapTraitObject(anyCast(self)).map(func)), $isTraitObject: true };
  },
  filterMap: function filterMap(func) {
    var self = this;
    var newList = [];
    Iterable['$List<E>'].forEach.call(self, function (element) {
      var __PUCK__value__1 = func($unwrapTraitObject(element));
      if ($unwrapTraitObject(__PUCK__value__1).kind == "Some") {
        var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__1),
            _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
            mappedElement = _$unwrapTraitObject$v[0];

        return List.add.call(newList, $unwrapTraitObject(mappedElement));
      };
    });
    return { type: '$List<E>', value: newList, $isTraitObject: true };
  },
  skip: function skip(count) {
    var self = this;
    return { type: '$List<E>', value: asList(self.value.slice(count)), $isTraitObject: true };
  },
  skipUntil: function skipUntil(predicate) {
    var self = this;
    var index = self.value.findIndex(predicate);
    var __PUCK__value__2 = void 0;
    if (index == -1) {
      __PUCK__value__2 = [];
    } else {
      __PUCK__value__2 = self.value.slice(index);
    };
    return { type: '$List<E>', value: asList(__PUCK__value__2), $isTraitObject: true };
  },
  toList: function toList() {
    var self = this;
    return self.value;
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
  var __PUCK__value__3 = self;
  if ($unwrapTraitObject(__PUCK__value__3).kind == "Ok") {
    var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__3),
        _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
        value = _$unwrapTraitObject2$[0];

    return op($unwrapTraitObject(value));
  } else {
    return self;
  };
};
Result.map = function map(op) {
  var self = this;
  var __PUCK__value__4 = self;
  if ($unwrapTraitObject(__PUCK__value__4).kind == "Ok") {
    var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__4),
        _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
        value = _$unwrapTraitObject3$[0];

    return Ok($unwrapTraitObject(op($unwrapTraitObject(value))));
  } else {
    return self;
  };
};
Result.mapErr = function mapErr(op) {
  var self = this;
  var __PUCK__value__5 = self;
  if ($unwrapTraitObject(__PUCK__value__5).kind == "Err") {
    var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__5),
        _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
        value = _$unwrapTraitObject4$[0];

    return Err($unwrapTraitObject(op($unwrapTraitObject(value))));
  } else {
    return self;
  };
};
Result.unwrap = function unwrap() {
  var self = this;
  if (Result.isErr.call(self)) {
    throw (0, _js.Error)($unwrapTraitObject(self.value)[0]);
  };
  return $unwrapTraitObject(self.value)[0];
};
Result.unwrapErr = function unwrapErr() {
  var self = this;
  if (Result.isOk.call(self)) {
    throw (0, _js.Error)($unwrapTraitObject(self.value)[0]);
  };
  return $unwrapTraitObject(self.value)[0];
};
Option.isSome = function isSome() {
  var self = this;
  return self.kind == "Some";
};
Option.isNone = function isNone() {
  var self = this;
  return !Option.isSome.call(self);
};
Option.okOr = function okOr(err) {
  var self = this;
  var __PUCK__value__6 = self;
  if ($unwrapTraitObject(__PUCK__value__6).kind == "Some") {
    var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__6),
        _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
        value = _$unwrapTraitObject5$[0];

    return Ok($unwrapTraitObject(value));
  } else {
    return Err($unwrapTraitObject(err));
  };
};
Option.okOrElse = function okOrElse(err) {
  var self = this;
  var __PUCK__value__7 = self;
  if ($unwrapTraitObject(__PUCK__value__7).kind == "Some") {
    var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__7),
        _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
        value = _$unwrapTraitObject6$[0];

    return Ok($unwrapTraitObject(value));
  } else {
    return Err($unwrapTraitObject(err()));
  };
};
Option.andValue = function andValue(optb) {
  var self = this;
  if (Option.isNone.call(self)) {
    return self;
  } else {
    return optb;
  };
};
Option.andThen = function andThen(op) {
  var self = this;
  var __PUCK__value__8 = self;
  if ($unwrapTraitObject(__PUCK__value__8).kind == "Some") {
    var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__8),
        _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
        value = _$unwrapTraitObject7$[0];

    return op($unwrapTraitObject(value));
  } else {
    return self;
  };
};
Option.orValue = function orValue(optb) {
  var self = this;
  if (Option.isSome.call(self)) {
    return self;
  } else {
    return optb;
  };
};
Option.orElse = function orElse(op) {
  var self = this;
  if (Option.isNone.call(self)) {
    return op();
  } else {
    return self;
  };
};
Option.map = function map(f) {
  var self = this;
  var __PUCK__value__9 = self;
  if ($unwrapTraitObject(__PUCK__value__9).kind == "Some") {
    var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__9),
        _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
        value = _$unwrapTraitObject8$[0];

    return Some($unwrapTraitObject(f($unwrapTraitObject(value))));
  } else {
    return self;
  };
};
Option.mapOr = function mapOr(_default, f) {
  var self = this;
  var __PUCK__value__10 = self;
  if ($unwrapTraitObject(__PUCK__value__10).kind == "Some") {
    var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__10),
        _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
        value = _$unwrapTraitObject9$[0];

    return f($unwrapTraitObject(value));
  } else {
    return _default;
  };
};
Option.mapOrElse = function mapOrElse(_default, f) {
  var self = this;
  var __PUCK__value__11 = self;
  if ($unwrapTraitObject(__PUCK__value__11).kind == "Some") {
    var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__11),
        _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
        value = _$unwrapTraitObject11[0];

    return f($unwrapTraitObject(value));
  } else {
    return _default();
  };
};
Option.unwrap = function unwrap() {
  var self = this;
  if (Option.isNone.call(self)) {
    throw (0, _js.Error)("Can not unwrap empty Option");
  };
  return $unwrapTraitObject(self.value)[0];
};
Option.unwrapOr = function unwrapOr(_default) {
  var self = this;
  var __PUCK__value__12 = self;
  if ($unwrapTraitObject(__PUCK__value__12).kind == "Some") {
    var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__12),
        _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12.value, 1),
        value = _$unwrapTraitObject13[0];

    return value;
  } else {
    return _default;
  };
};
Option.unwrapOrElse = function unwrapOrElse(_default) {
  var self = this;
  var __PUCK__value__13 = self;
  if ($unwrapTraitObject(__PUCK__value__13).kind == "Some") {
    var _$unwrapTraitObject14 = $unwrapTraitObject(__PUCK__value__13),
        _$unwrapTraitObject15 = _slicedToArray(_$unwrapTraitObject14.value, 1),
        value = _$unwrapTraitObject15[0];

    return value;
  } else {
    return _default();
  };
};
List.zip = function zip(a, b) {
  if (Iterable[a.type].size.call(a) != Iterable[b.type].size.call(b)) {
    throw (0, _js.Error)("Iterable a and b are not of the same length");
  };
  var __PUCK__value__15 = Iterable[a.type].enumerate.call(a);
  var __PUCK__value__14 = Iterable[__PUCK__value__15.type].map.call(__PUCK__value__15, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        a = _ref2[0],
        i = _ref2[1];

    return [a, b.value[i]];
  });
  return Iterable[__PUCK__value__14.type].toList.call(__PUCK__value__14);
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
  return $unwrapTraitObject(_js._Object).create(_js._null);
};
ObjectMap.fromIter = function fromIter(list) {
  var object = $unwrapTraitObject(_js._Object).create(_js._null);
  Iterable[list.type].forEach.call(list, function (item) {
    return $unwrapTraitObject(object)[$unwrapTraitObject(item[0])] = item[1];
  });
  return object;
};
ObjectMap.keys = function keys() {
  var self = this;
  return $unwrapTraitObject(_js._Object).keys(self);
};
ObjectMap.values = function values() {
  var self = this;
  return $unwrapTraitObject($unwrapTraitObject(_js._Object).keys(self)).map(function (key) {
    return self[$unwrapTraitObject(key)];
  });
};
ObjectMap.toList = function toList() {
  var self = this;
  return $unwrapTraitObject($unwrapTraitObject(_js._Object).keys(self)).map(function (key) {
    return [key, self[$unwrapTraitObject(key)]];
  });
};
ObjectMap.all = function all(predicate) {
  var self = this;
  var i = 0;
  var keys = $unwrapTraitObject(_js._Object).keys(self);
  while (i < $unwrapTraitObject(keys).length) {
    if (!predicate(self[$unwrapTraitObject($unwrapTraitObject(keys)[i])])) {
      return false;
    };
    i += 1;
  };
  return true;
};
ObjectMap.any = function any(predicate) {
  var self = this;
  var i = 0;
  var keys = $unwrapTraitObject(_js._Object).keys(self);
  while (i < $unwrapTraitObject(keys).length) {
    if (predicate(self[$unwrapTraitObject($unwrapTraitObject(keys)[i])])) {
      return true;
    };
    i += 1;
  };
  return false;
};
ObjectMap.map = function map(mapper) {
  var self = this;
  var _new = ObjectMap._new();
  $unwrapTraitObject($unwrapTraitObject(_js._Object).keys(self)).forEach(function (key) {
    return _new[$unwrapTraitObject(key)] = mapper(self[$unwrapTraitObject(key)]);
  });
  return _new;
};
ObjectMap.find = function find(predicate) {
  var self = this;
  var key = $unwrapTraitObject($unwrapTraitObject(_js._Object).keys(self)).find(function (key) {
    return predicate([key, self[$unwrapTraitObject(key)]]);
  });
  if (key) {
    return Some([key, self[$unwrapTraitObject(key)]]);
  } else {
    return None;
  };
};
ObjectMap.forEach = function forEach(func) {
  var self = this;
  $unwrapTraitObject($unwrapTraitObject(_js._Object).keys(self)).forEach(function (key) {
    return func([key, self[$unwrapTraitObject(key)]]);
  });
  return [];
};
ObjectMap.has = function has(key) {
  var self = this;
  return $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(_js._Object).prototype).hasOwnProperty).call(self, key);
};
ObjectMap.get = function get(key) {
  var self = this;
  if (ObjectMap.has.call(self, key)) {
    return Some(self[key]);
  } else {
    return None;
  };
};
ObjectMap.set = function set(key, value) {
  var self = this;
  self[key] = value;
  return [];
};
ObjectMap.size = function size() {
  var self = this;
  return $unwrapTraitObject($unwrapTraitObject(_js._Object).keys(self)).length;
};
var Ok = exports.Ok = Result.Ok;
var Err = exports.Err = Result.Err;
var Some = exports.Some = Option.Some;
var None = exports.None = Option.None;
function anyCast(a) {
  return a;
};
function asList(a) {
  return a;
};
function print(message) {
  var extra = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return $unwrapTraitObject($unwrapTraitObject(_js.console).log).apply(_js.console, [message].concat(extra));
}
