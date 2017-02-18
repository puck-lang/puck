'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.None = exports.Some = exports.Err = exports.Ok = exports.Iterable = exports.Iterator = exports.IntoIterator = exports.Never = exports.Ordering = exports.Option = exports.Result = exports.Radix = exports.ObjectMap = exports.Range = exports.List = exports.String = exports.Num = exports.Bool = exports.RegExp = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.print = print;

var _js = require('puck-lang/dist/lib/stdlib/js');

var _js2 = require('./core/js.js');

var js = _interopRequireWildcard(_js2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};
var RegExp = exports.RegExp = function RegExp(object) {
  return object;
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
var StringIterator = function StringIterator(object) {
  return object;
};
var List = exports.List = function List(object) {
  return object;
};
var MapIterator = function MapIterator(object) {
  return object;
};
var FilterIterator = function FilterIterator(object) {
  return object;
};
var FilterMapIterator = function FilterMapIterator(object) {
  return object;
};
var ListIterator = function ListIterator(object) {
  return object;
};
var Range = exports.Range = function Range(object) {
  return object;
};
var NumRangeIterator = function NumRangeIterator(object) {
  return object;
};
var ObjectMap = exports.ObjectMap = function ObjectMap(object) {
  return object;
};
var Radix = exports.Radix = {
  Binary: { kind: 'Binary', value: Symbol('Binary') },
  Octal: { kind: 'Octal', value: Symbol('Octal') },
  Decimal: { kind: 'Decimal', value: Symbol('Decimal') },
  Hex: { kind: 'Hex', value: Symbol('Hex') }
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
var Ordering = exports.Ordering = {
  Less: { kind: 'Less', value: Symbol('Less') },
  Equal: { kind: 'Equal', value: Symbol('Equal') },
  Greater: { kind: 'Greater', value: Symbol('Greater') }
};
var Never = exports.Never = {};
var IntoIterator = exports.IntoIterator = {};
var Iterator = exports.Iterator = {
  count: function count() {
    var self = this;
    var count_ = 0;
    while (true) {
      var __PUCK__value__1 = Iterator[self.type].next.call(self);
      if ($unwrapTraitObject(__PUCK__value__1).kind == "Some") {
        var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__1),
            _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
            value = _$unwrapTraitObject$v[0];

        count_ += 1;
      } else {
        return count_;
      };
    };
    return count_;
  },
  map: function map(f) {
    var self = this;
    var iter = {
      iter: self,
      f: f
    };
    return { type: '$impl_lib/stdlib/core.puck:Iterator$lib/stdlib/core.puck:MapIterator', value: iter, $isTraitObject: true };
  },
  filter: function filter(predicate) {
    var self = this;
    var iter = {
      iter: self,
      predicate: predicate
    };
    return { type: '$impl_lib/stdlib/core.puck:Iterator$lib/stdlib/core.puck:FilterIterator', value: iter, $isTraitObject: true };
  },
  filterMap: function filterMap(f) {
    var self = this;
    var iter = {
      iter: self,
      f: f
    };
    return { type: '$impl_lib/stdlib/core.puck:Iterator$lib/stdlib/core.puck:FilterMapIterator', value: iter, $isTraitObject: true };
  },
  enumerate: function enumerate() {
    var self = this;
    var index = -1;
    return Iterator[self.type].map.call(self, function (e) {
      index += 1;
      return [index, e];
    });
  },
  all: function all(predicate) {
    var self = this;
    while (true) {
      var __PUCK__value__2 = Iterator[self.type].next.call(self);
      if ($unwrapTraitObject(__PUCK__value__2).kind == "Some") {
        var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__2),
            _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
            value = _$unwrapTraitObject2$[0];

        if (!predicate($unwrapTraitObject(value))) {
          return false;
        };
      } else {
        return true;
      };
    };
    return true;
  },
  any: function any(predicate) {
    var self = this;
    while (true) {
      var __PUCK__value__3 = Iterator[self.type].next.call(self);
      if ($unwrapTraitObject(__PUCK__value__3).kind == "Some") {
        var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__3),
            _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
            value = _$unwrapTraitObject3$[0];

        if (predicate($unwrapTraitObject(value))) {
          return true;
        };
      } else {
        return false;
      };
    };
    return false;
  },
  find: function find(predicate) {
    var self = this;
    while (true) {
      var __PUCK__value__4 = Iterator[self.type].next.call(self);
      if ($unwrapTraitObject(__PUCK__value__4).kind == "Some") {
        var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__4),
            _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
            value = _$unwrapTraitObject4$[0];

        if (predicate($unwrapTraitObject(value))) {
          return Some($unwrapTraitObject(value));
        };
      } else {
        return None;
      };
    };
    return None;
  }
};
var Iterable = exports.Iterable = {};
Iterator["$impl_lib/stdlib/core.puck:Iterator$lib/stdlib/core.puck:StringIterator"] = {
  next: function next() {
    var self = this;
    if (self.value.index < String.size.call(self.value.string)) {
      var char = self.value.string.charAt(self.value.index);
      self.value.index += 1;
      return Option.Some(char);
    } else {
      return Option.None;
    };
  },
  count: Iterator.count,
  map: Iterator.map,
  filter: Iterator.filter,
  filterMap: Iterator.filterMap,
  enumerate: Iterator.enumerate,
  all: Iterator.all,
  any: Iterator.any,
  find: Iterator.find
};
IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$String"] = {
  iter: function iter() {
    var self = this;
    var iterator = {
      index: 0,
      string: self.value
    };
    return { type: '$impl_lib/stdlib/core.puck:Iterator$lib/stdlib/core.puck:StringIterator', value: iterator, $isTraitObject: true };
  }
};
Iterator["$impl_lib/stdlib/core.puck:Iterator$lib/stdlib/core.puck:MapIterator"] = {
  next: function next() {
    var self = this;
    var __PUCK__value__5 = self.value.iter;
    return Option.map.call(Iterator[__PUCK__value__5.type].next.call(__PUCK__value__5), $unwrapTraitObject(self.value.f));
  },
  count: Iterator.count,
  map: Iterator.map,
  filter: Iterator.filter,
  filterMap: Iterator.filterMap,
  enumerate: Iterator.enumerate,
  all: Iterator.all,
  any: Iterator.any,
  find: Iterator.find
};
Iterator["$impl_lib/stdlib/core.puck:Iterator$lib/stdlib/core.puck:FilterIterator"] = {
  next: function next() {
    var self = this;
    while (true) {
      var __PUCK__value__7 = self.value.iter;
      var __PUCK__value__6 = Iterator[__PUCK__value__7.type].next.call(__PUCK__value__7);
      if ($unwrapTraitObject(__PUCK__value__6).kind == "Some") {
        var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__6),
            _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
            value = _$unwrapTraitObject5$[0];

        if (self.value.predicate($unwrapTraitObject(value))) {
          return Some($unwrapTraitObject(value));
        };
      } else {
        return None;
      };
    };
    return None;
  },
  count: Iterator.count,
  map: Iterator.map,
  filter: Iterator.filter,
  filterMap: Iterator.filterMap,
  enumerate: Iterator.enumerate,
  all: Iterator.all,
  any: Iterator.any,
  find: Iterator.find
};
Iterator["$impl_lib/stdlib/core.puck:Iterator$lib/stdlib/core.puck:FilterMapIterator"] = {
  next: function next() {
    var self = this;
    while (true) {
      var __PUCK__value__9 = self.value.iter;
      var __PUCK__value__8 = Iterator[__PUCK__value__9.type].next.call(__PUCK__value__9);
      if ($unwrapTraitObject(__PUCK__value__8).kind == "Some") {
        var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__8),
            _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
            value = _$unwrapTraitObject6$[0];

        var __PUCK__value__10 = self.value.f($unwrapTraitObject(value));
        if ($unwrapTraitObject(__PUCK__value__10).kind == "Some") {
          var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__10),
              _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
              _value = _$unwrapTraitObject7$[0];

          return Some($unwrapTraitObject(_value));
        };
      } else {
        return None;
      };
    };
    return None;
  },
  count: Iterator.count,
  map: Iterator.map,
  filter: Iterator.filter,
  filterMap: Iterator.filterMap,
  enumerate: Iterator.enumerate,
  all: Iterator.all,
  any: Iterator.any,
  find: Iterator.find
};
Iterator["$impl_lib/stdlib/core.puck:Iterator$lib/stdlib/core.puck:ListIterator"] = {
  next: function next() {
    var self = this;
    var element = List.get.call(self.value.list, self.value.index);
    if (Option.isSome.call(element)) {
      self.value.index += 1;
    };
    return element;
  },
  count: Iterator.count,
  map: Iterator.map,
  filter: Iterator.filter,
  filterMap: Iterator.filterMap,
  enumerate: Iterator.enumerate,
  all: Iterator.all,
  any: Iterator.any,
  find: Iterator.find
};
IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"] = {
  iter: function iter() {
    var self = this;
    var iterator = {
      index: 0,
      list: self.value
    };
    return { type: '$impl_lib/stdlib/core.puck:Iterator$lib/stdlib/core.puck:ListIterator', value: iterator, $isTraitObject: true };
  }
};
Iterable["$impl_lib/stdlib/core.puck:Iterable$List"] = {
  enumerate: function enumerate() {
    var self = this;
    return { type: '$impl_lib/stdlib/core.puck:Iterable$List', value: asList($unwrapTraitObject(anyCast(self)).map(function (element, index) {
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
    return { type: '$impl_lib/stdlib/core.puck:Iterable$List', value: asList($unwrapTraitObject(anyCast(self)).filter(func)), $isTraitObject: true };
  },
  forEach: function forEach(func) {
    var self = this;
    return $unwrapTraitObject(anyCast(self)).forEach(func);
  },
  map: function map(func) {
    var self = this;
    return { type: '$impl_lib/stdlib/core.puck:Iterable$List', value: asList($unwrapTraitObject(anyCast(self)).map(func)), $isTraitObject: true };
  },
  filterMap: function filterMap(func) {
    var self = this;
    var newList = [];
    Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call(self, function (element) {
      var __PUCK__value__11 = func($unwrapTraitObject(element));
      if ($unwrapTraitObject(__PUCK__value__11).kind == "Some") {
        var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__11),
            _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
            mappedElement = _$unwrapTraitObject8$[0];

        return List.add.call(newList, $unwrapTraitObject(mappedElement));
      };
    });
    return { type: '$impl_lib/stdlib/core.puck:Iterable$List', value: newList, $isTraitObject: true };
  },
  skip: function skip(count) {
    var self = this;
    return { type: '$impl_lib/stdlib/core.puck:Iterable$List', value: asList(self.value.slice(count)), $isTraitObject: true };
  },
  skipUntil: function skipUntil(predicate) {
    var self = this;
    var index = self.value.findIndex(predicate);
    var __PUCK__value__12 = void 0;
    if (index == -1) {
      __PUCK__value__12 = [];
    } else {
      __PUCK__value__12 = self.value.slice(index);
    };
    return { type: '$impl_lib/stdlib/core.puck:Iterable$List', value: asList(__PUCK__value__12), $isTraitObject: true };
  },
  take: function take(count) {
    var self = this;
    return { type: '$impl_lib/stdlib/core.puck:Iterable$List', value: asList(self.value.slice(0, count)), $isTraitObject: true };
  },
  toList: function toList() {
    var self = this;
    return self.value;
  }
};
Iterator["$impl_lib/stdlib/core.puck:Iterator$lib/stdlib/core.puck:NumRangeIterator"] = {
  next: function next() {
    var self = this;
    var element = self.value.index;
    if (element < self.value.end) {
      self.value.index += 1;
      return Some(element);
    } else {
      return None;
    };
  },
  count: Iterator.count,
  map: Iterator.map,
  filter: Iterator.filter,
  filterMap: Iterator.filterMap,
  enumerate: Iterator.enumerate,
  all: Iterator.all,
  any: Iterator.any,
  find: Iterator.find
};
IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$lib/stdlib/core.puck:Range"] = {
  iter: function iter() {
    var self = this;
    var iterator = {
      index: self.value.start,
      end: self.value.end
    };
    return { type: '$impl_lib/stdlib/core.puck:Iterator$lib/stdlib/core.puck:NumRangeIterator', value: iterator, $isTraitObject: true };
  }
};
RegExp._new = function _new(pattern) {
  return js.RegExp(pattern);
};
RegExp.test = function test(string) {
  var self = this;
  return $unwrapTraitObject(anyCast(self)).test(string);
};
Radix.pattern = function pattern() {
  var self = this;
  var __PUCK__value__13 = self;
  var __PUCK__value__14 = __PUCK__value__13;
  if ($unwrapTraitObject(__PUCK__value__14).kind == "Binary") {
    var _undefined2 = $unwrapTraitObject(__PUCK__value__14);
    return js.RegExp("^[-+]?[01]+$");
  } else {
    var __PUCK__value__15 = __PUCK__value__13;
    if ($unwrapTraitObject(__PUCK__value__15).kind == "Octal") {
      var _undefined3 = $unwrapTraitObject(__PUCK__value__15);
      return js.RegExp("^[-+]?[0-7]+$");
    } else {
      var __PUCK__value__16 = __PUCK__value__13;
      if ($unwrapTraitObject(__PUCK__value__16).kind == "Decimal") {
        var _undefined4 = $unwrapTraitObject(__PUCK__value__16);
        return js.RegExp("^[-+]?[0-9]+$");
      } else {
        var __PUCK__value__17 = __PUCK__value__13;
        if ($unwrapTraitObject(__PUCK__value__17).kind == "Hex") {
          var _undefined5 = $unwrapTraitObject(__PUCK__value__17);
          return js.RegExp("^[-+]?[0-9A-Fa-f]+$");
        };
      };
    };
  };
};
Radix.radix = function radix() {
  var self = this;
  var __PUCK__value__18 = self;
  var __PUCK__value__19 = __PUCK__value__18;
  if ($unwrapTraitObject(__PUCK__value__19).kind == "Binary") {
    var _undefined6 = $unwrapTraitObject(__PUCK__value__19);
    return 2;
  } else {
    var __PUCK__value__20 = __PUCK__value__18;
    if ($unwrapTraitObject(__PUCK__value__20).kind == "Octal") {
      var _undefined7 = $unwrapTraitObject(__PUCK__value__20);
      return 8;
    } else {
      var __PUCK__value__21 = __PUCK__value__18;
      if ($unwrapTraitObject(__PUCK__value__21).kind == "Decimal") {
        var _undefined8 = $unwrapTraitObject(__PUCK__value__21);
        return 10;
      } else {
        var __PUCK__value__22 = __PUCK__value__18;
        if ($unwrapTraitObject(__PUCK__value__22).kind == "Hex") {
          var _undefined9 = $unwrapTraitObject(__PUCK__value__22);
          return 16;
        };
      };
    };
  };
};
Num.parseInt = function parseInt(string) {
  var radix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Radix.Decimal;

  if (RegExp.test.call(Radix.pattern.call(radix), string)) {
    return Result.Ok(js.parseInt(string, Radix.radix.call(radix)));
  } else {
    return Result.Err([]);
  };
};
Num.parse = function parse(string) {
  if ($unwrapTraitObject(js.RegExp("^[-+]?[0-9]+(\\.[0-9]+)?$")).test(string)) {
    return Result.Ok(js.parseFloat(string, 10));
  } else {
    return Result.Err([]);
  };
};
Num.isNan = function isNan() {
  var self = this;
  return js.isNaN(self);
};
Num.isInfinite = function isInfinite() {
  var self = this;
  return self == js.infinity || self == -js.infinity;
};
Num.ceil = function ceil() {
  var self = this;
  return $unwrapTraitObject(js.Math).ceil(self);
};
Num.floor = function floor() {
  var self = this;
  return $unwrapTraitObject(js.Math).floor(self);
};
Num.round = function round() {
  var self = this;
  return $unwrapTraitObject(js.Math).round(self);
};
Num.limit = function limit(range) {
  var self = this;
  if (self < range.start) {
    return range.start;
  } else {
    if (self >= range.end) {
      return range.end - 1;
    } else {
      return self;
    };
  };
};
Num.cmp = function cmp(other) {
  var self = this;
  if (self < other) {
    return Ordering.Less;
  } else {
    if (self > other) {
      return Ordering.Greater;
    } else {
      return Ordering.Equal;
    };
  };
};
String.size = function size() {
  var self = this;
  return self.length;
};
String.contains = function contains(subStr) {
  var self = this;
  return self.indexOf(subStr) >= 0;
};
String.split = function split() {
  var pattern = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

  var self = this;
  return $unwrapTraitObject(anyCast(self)).split(pattern);
};
String.padLeft = function padLeft(width) {
  var padding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : " ";

  var self = this;
  var __PUCK__value__23 = void 0;
  if (width < 0) {
    __PUCK__value__23 = 0;
  } else {
    __PUCK__value__23 = width;
  };
  width = __PUCK__value__23;
  var __PUCK__value__24 = void 0;
  if (padding == "") {
    __PUCK__value__24 = " ";
  } else {
    __PUCK__value__24 = padding;
  };
  padding = __PUCK__value__24;
  if (String.size.call(self) >= width) {
    return self;
  };
  var padCount = (width - String.size.call(self)) / String.size.call(padding);
  var i = 0;
  var _new = self;
  while (i < padCount) {
    _new = padding + _new;
    i += 1;
  };
  return _new;
};
String.padRight = function padRight(width) {
  var padding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : " ";

  var self = this;
  var __PUCK__value__25 = void 0;
  if (width < 0) {
    __PUCK__value__25 = 0;
  } else {
    __PUCK__value__25 = width;
  };
  width = __PUCK__value__25;
  var __PUCK__value__26 = void 0;
  if (padding == "") {
    __PUCK__value__26 = " ";
  } else {
    __PUCK__value__26 = padding;
  };
  padding = __PUCK__value__26;
  if (String.size.call(self) >= width) {
    return self;
  };
  var padCount = (width - String.size.call(self)) / String.size.call(padding);
  var i = 0;
  var _new = self;
  while (i < padCount) {
    _new = _new + padding;
    i += 1;
  };
  return _new;
};
String.toLowerCase = function toLowerCase() {
  var self = this;
  return $unwrapTraitObject(anyCast(self)).toLowerCase();
};
String.toUpperCase = function toUpperCase() {
  var self = this;
  return $unwrapTraitObject(anyCast(self)).toUpperCase();
};
String.trim = function trim() {
  var self = this;
  return String.trimRight.call(String.trimLeft.call(self));
};
String.trimLeft = function trimLeft() {
  var self = this;
  return $unwrapTraitObject(anyCast(self)).replace(RegExp._new("^\\s+"), "");
};
String.trimRight = function trimRight() {
  var self = this;
  return $unwrapTraitObject(anyCast(self)).replace(RegExp._new("\\s+$"), "");
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
  var __PUCK__value__27 = self;
  if ($unwrapTraitObject(__PUCK__value__27).kind == "Ok") {
    var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__27),
        _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
        value = _$unwrapTraitObject9$[0];

    return op($unwrapTraitObject(value));
  } else {
    return self;
  };
};
Result.map = function map(op) {
  var self = this;
  var __PUCK__value__28 = self;
  if ($unwrapTraitObject(__PUCK__value__28).kind == "Ok") {
    var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__28),
        _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
        value = _$unwrapTraitObject11[0];

    return Ok($unwrapTraitObject(op($unwrapTraitObject(value))));
  } else {
    return self;
  };
};
Result.mapErr = function mapErr(op) {
  var self = this;
  var __PUCK__value__29 = self;
  if ($unwrapTraitObject(__PUCK__value__29).kind == "Err") {
    var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__29),
        _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12.value, 1),
        value = _$unwrapTraitObject13[0];

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
  var __PUCK__value__30 = self;
  if ($unwrapTraitObject(__PUCK__value__30).kind == "Some") {
    var _$unwrapTraitObject14 = $unwrapTraitObject(__PUCK__value__30),
        _$unwrapTraitObject15 = _slicedToArray(_$unwrapTraitObject14.value, 1),
        value = _$unwrapTraitObject15[0];

    return Ok($unwrapTraitObject(value));
  } else {
    return Err($unwrapTraitObject(err));
  };
};
Option.okOrElse = function okOrElse(err) {
  var self = this;
  var __PUCK__value__31 = self;
  if ($unwrapTraitObject(__PUCK__value__31).kind == "Some") {
    var _$unwrapTraitObject16 = $unwrapTraitObject(__PUCK__value__31),
        _$unwrapTraitObject17 = _slicedToArray(_$unwrapTraitObject16.value, 1),
        value = _$unwrapTraitObject17[0];

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
  var __PUCK__value__32 = self;
  if ($unwrapTraitObject(__PUCK__value__32).kind == "Some") {
    var _$unwrapTraitObject18 = $unwrapTraitObject(__PUCK__value__32),
        _$unwrapTraitObject19 = _slicedToArray(_$unwrapTraitObject18.value, 1),
        value = _$unwrapTraitObject19[0];

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
  var __PUCK__value__33 = self;
  if ($unwrapTraitObject(__PUCK__value__33).kind == "Some") {
    var _$unwrapTraitObject20 = $unwrapTraitObject(__PUCK__value__33),
        _$unwrapTraitObject21 = _slicedToArray(_$unwrapTraitObject20.value, 1),
        value = _$unwrapTraitObject21[0];

    return Some($unwrapTraitObject(f($unwrapTraitObject(value))));
  } else {
    return self;
  };
};
Option.mapOr = function mapOr(_default, f) {
  var self = this;
  var __PUCK__value__34 = self;
  if ($unwrapTraitObject(__PUCK__value__34).kind == "Some") {
    var _$unwrapTraitObject22 = $unwrapTraitObject(__PUCK__value__34),
        _$unwrapTraitObject23 = _slicedToArray(_$unwrapTraitObject22.value, 1),
        value = _$unwrapTraitObject23[0];

    return f($unwrapTraitObject(value));
  } else {
    return _default;
  };
};
Option.mapOrElse = function mapOrElse(_default, f) {
  var self = this;
  var __PUCK__value__35 = self;
  if ($unwrapTraitObject(__PUCK__value__35).kind == "Some") {
    var _$unwrapTraitObject24 = $unwrapTraitObject(__PUCK__value__35),
        _$unwrapTraitObject25 = _slicedToArray(_$unwrapTraitObject24.value, 1),
        value = _$unwrapTraitObject25[0];

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
  var __PUCK__value__36 = self;
  if ($unwrapTraitObject(__PUCK__value__36).kind == "Some") {
    var _$unwrapTraitObject26 = $unwrapTraitObject(__PUCK__value__36),
        _$unwrapTraitObject27 = _slicedToArray(_$unwrapTraitObject26.value, 1),
        value = _$unwrapTraitObject27[0];

    return value;
  } else {
    return _default;
  };
};
Option.unwrapOrElse = function unwrapOrElse(_default) {
  var self = this;
  var __PUCK__value__37 = self;
  if ($unwrapTraitObject(__PUCK__value__37).kind == "Some") {
    var _$unwrapTraitObject28 = $unwrapTraitObject(__PUCK__value__37),
        _$unwrapTraitObject29 = _slicedToArray(_$unwrapTraitObject28.value, 1),
        value = _$unwrapTraitObject29[0];

    return value;
  } else {
    return _default();
  };
};
Ordering.reverse = function reverse() {
  var self = this;
  var __PUCK__value__38 = self;
  var __PUCK__value__39 = __PUCK__value__38;
  if ($unwrapTraitObject(__PUCK__value__39).kind == "Less") {
    var _undefined10 = $unwrapTraitObject(__PUCK__value__39);
    return Ordering.Greater;
  } else {
    var __PUCK__value__40 = __PUCK__value__38;
    if ($unwrapTraitObject(__PUCK__value__40).kind == "Equal") {
      var _undefined11 = $unwrapTraitObject(__PUCK__value__40);
      return Ordering.Equal;
    } else {
      var __PUCK__value__41 = __PUCK__value__38;
      if ($unwrapTraitObject(__PUCK__value__41).kind == "Greater") {
        var _undefined12 = $unwrapTraitObject(__PUCK__value__41);
        return Ordering.Less;
      };
    };
  };
};
List.zip = function zip(a, b) {
  if (Iterable[a.type].size.call(a) != Iterable[b.type].size.call(b)) {
    throw (0, _js.Error)("Iterable a and b are not of the same length");
  };
  var __PUCK__value__43 = Iterable[a.type].enumerate.call(a);
  var __PUCK__value__42 = Iterable[__PUCK__value__43.type].map.call(__PUCK__value__43, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        a = _ref2[0],
        i = _ref2[1];

    return [a, b.value[i]];
  });
  return Iterable[__PUCK__value__42.type].toList.call(__PUCK__value__42);
};
List.add = function add(element) {
  var self = this;
  return self.push(element);
};
List.get = function get(index) {
  var self = this;
  if (index >= 0 && index < Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self, $isTraitObject: true })) {
    return Some(self[index]);
  } else {
    return None;
  };
};
List.binarySearchBy = function binarySearchBy(f) {
  var self = this;
  var min = 0;
  var max = Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self, $isTraitObject: true }) - 1;
  while (true) {
    if (max < min) {
      return Err(min);
    };
    var guess = [min + max] / 2;
    guess = Num.floor.call(guess);
    var __PUCK__value__44 = f(self[guess]);
    var __PUCK__value__45 = __PUCK__value__44;
    if ($unwrapTraitObject(__PUCK__value__45).kind == "Equal") {
      var _undefined13 = $unwrapTraitObject(__PUCK__value__45);
      return Ok(guess);
    } else {
      var __PUCK__value__46 = __PUCK__value__44;
      if ($unwrapTraitObject(__PUCK__value__46).kind == "Less") {
        var _undefined14 = $unwrapTraitObject(__PUCK__value__46);
        min = guess + 1;
      } else {
        var __PUCK__value__47 = __PUCK__value__44;
        if ($unwrapTraitObject(__PUCK__value__47).kind == "Greater") {
          var _undefined15 = $unwrapTraitObject(__PUCK__value__47);
          max = guess - 1;
        };
      };
    };
  };
  return Err(0);
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
function anyCast(a) {
  return a;
};
var Ok = exports.Ok = Result.Ok;
var Err = exports.Err = Result.Err;
var Some = exports.Some = Option.Some;
var None = exports.None = Option.None;
function asList(a) {
  return a;
};
function print(message) {
  var extra = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return $unwrapTraitObject($unwrapTraitObject(_js.console).log).apply(_js.console, [message].concat(extra));
}
