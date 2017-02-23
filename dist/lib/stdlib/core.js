'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.None = exports.Some = exports.Err = exports.Ok = exports.Ord = exports.PartialOrd = exports.Index = exports.Iterable = exports.Iterator = exports.IntoIterator = exports.Never = exports.Ordering = exports.Option = exports.Result = exports.Radix = exports.Unknown = exports.ObjectMap = exports.Range = exports.List = exports.String = exports.Num = exports.Bool = exports.RegExp = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (_js.Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.print = print;
exports.panic = panic;

var _js = require('puck-lang/dist/lib/stdlib/js');

var _js2 = require('./core/js.js');

var js = _interopRequireWildcard(_js2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toArray(arr) { return _js.Array.isArray(arr) ? arr : _js.Array.from(arr); }

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
var Unknown = exports.Unknown = function Unknown(object) {
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
    for (var _len = arguments.length, members = (0, _js.Array)(_len), _key = 0; _key < _len; _key++) {
      members[_key] = arguments[_key];
    }

    return { kind: 'Ok', value: members };
  },
  Err: function Err() {
    for (var _len2 = arguments.length, members = (0, _js.Array)(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      members[_key2] = arguments[_key2];
    }

    return { kind: 'Err', value: members };
  }
};
var Option = exports.Option = {
  Some: function Some() {
    for (var _len3 = arguments.length, members = (0, _js.Array)(_len3), _key3 = 0; _key3 < _len3; _key3++) {
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
      if (__PUCK__value__1.kind == "Some") {
        var _PUCK__value__1$valu = _slicedToArray(__PUCK__value__1.value, 1),
            value = _PUCK__value__1$valu[0];

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
      if (__PUCK__value__2.kind == "Some") {
        var _PUCK__value__2$valu = _slicedToArray(__PUCK__value__2.value, 1),
            value = _PUCK__value__2$valu[0];

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
      if (__PUCK__value__3.kind == "Some") {
        var _PUCK__value__3$valu = _slicedToArray(__PUCK__value__3.value, 1),
            value = _PUCK__value__3$valu[0];

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
      if (__PUCK__value__4.kind == "Some") {
        var _PUCK__value__4$valu = _slicedToArray(__PUCK__value__4.value, 1),
            value = _PUCK__value__4$valu[0];

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
var Index = exports.Index = {};
var PartialOrd = exports.PartialOrd = {
  lt: function lt(other) {
    var self = this;
    var __PUCK__value__5 = PartialOrd[self.type].partialCmp.call(self, $unwrapTraitObject(other));
    if ($unwrapTraitObject(__PUCK__value__5).kind == "Some" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__5).value)[0]).kind == "Less") {
      var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__5),
          _$unwrapTraitObject$v = _toArray(_$unwrapTraitObject.value);

      return true;
    } else {
      if (true) {
        var __PUCK__value__6 = __PUCK__value__5;
        return false;
      };
    };
  },
  le: function le(other) {
    var self = this;
    var __PUCK__value__7 = PartialOrd[self.type].partialCmp.call(self, $unwrapTraitObject(other));
    if ($unwrapTraitObject(__PUCK__value__7).kind == "Some" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__7).value)[0]).kind == "Less") {
      var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__7),
          _$unwrapTraitObject2$ = _toArray(_$unwrapTraitObject2.value);

      return true;
    } else {
      if ($unwrapTraitObject(__PUCK__value__7).kind == "Some" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__7).value)[0]).kind == "Equal") {
        var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__7),
            _$unwrapTraitObject3$ = _toArray(_$unwrapTraitObject3.value);

        return true;
      } else {
        if (true) {
          var __PUCK__value__8 = __PUCK__value__7;
          return false;
        };
      };
    };
  },
  gt: function gt(other) {
    var self = this;
    var __PUCK__value__9 = PartialOrd[self.type].partialCmp.call(self, $unwrapTraitObject(other));
    if ($unwrapTraitObject(__PUCK__value__9).kind == "Some" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__9).value)[0]).kind == "Greater") {
      var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__9),
          _$unwrapTraitObject4$ = _toArray(_$unwrapTraitObject4.value);

      return true;
    } else {
      if (true) {
        var __PUCK__value__10 = __PUCK__value__9;
        return false;
      };
    };
  },
  ge: function ge(other) {
    var self = this;
    var __PUCK__value__11 = PartialOrd[self.type].partialCmp.call(self, $unwrapTraitObject(other));
    if ($unwrapTraitObject(__PUCK__value__11).kind == "Some" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__11).value)[0]).kind == "Greater") {
      var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__11),
          _$unwrapTraitObject5$ = _toArray(_$unwrapTraitObject5.value);

      return true;
    } else {
      if ($unwrapTraitObject(__PUCK__value__11).kind == "Some" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__11).value)[0]).kind == "Equal") {
        var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__11),
            _$unwrapTraitObject6$ = _toArray(_$unwrapTraitObject6.value);

        return true;
      } else {
        if (true) {
          var __PUCK__value__12 = __PUCK__value__11;
          return false;
        };
      };
    };
  }
};
var Ord = exports.Ord = {};
Iterator["$impl_lib/stdlib/core.puck:Iterator$lib/stdlib/core.puck:StringIterator"] = {
  next: function next() {
    var self = this;
    if (self.value.index < String.size.call(self.value.string)) {
      var char = $unwrapTraitObject(self.value.string.charAt(self.value.index));
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
    var __PUCK__value__13 = self.value.iter;
    return Option.map.call(Iterator[__PUCK__value__13.type].next.call(__PUCK__value__13), $unwrapTraitObject(self.value.f));
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
      var __PUCK__value__15 = self.value.iter;
      var __PUCK__value__14 = Iterator[__PUCK__value__15.type].next.call(__PUCK__value__15);
      if (__PUCK__value__14.kind == "Some") {
        var _PUCK__value__14$val = _slicedToArray(__PUCK__value__14.value, 1),
            value = _PUCK__value__14$val[0];

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
      var __PUCK__value__17 = self.value.iter;
      var __PUCK__value__16 = Iterator[__PUCK__value__17.type].next.call(__PUCK__value__17);
      if (__PUCK__value__16.kind == "Some") {
        var _PUCK__value__16$val = _slicedToArray(__PUCK__value__16.value, 1),
            value = _PUCK__value__16$val[0];

        var __PUCK__value__18 = self.value.f($unwrapTraitObject(value));
        if (__PUCK__value__18.kind == "Some") {
          var _PUCK__value__18$val = _slicedToArray(__PUCK__value__18.value, 1),
              _value = _PUCK__value__18$val[0];

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
    return { type: '$impl_lib/stdlib/core.puck:Iterable$List', value: asList(self.value.map(function (element, index) {
        return [index, element];
      })), $isTraitObject: true };
  },
  size: function size() {
    var self = this;
    return $unwrapTraitObject(self.value.length);
  },
  isEmpty: function isEmpty() {
    var self = this;
    return Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call(self) == 0;
  },
  isNotEmpty: function isNotEmpty() {
    var self = this;
    return Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call(self) > 0;
  },
  first: function first() {
    var self = this;
    if (Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call(self) > 0) {
      return Some($unwrapTraitObject(Index["$impl_Index$List"].index.call(self, 0)));
    } else {
      return None;
    };
  },
  last: function last() {
    var self = this;
    if (Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call(self) > 0) {
      return Some($unwrapTraitObject(Index["$impl_Index$List"].index.call(self, Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call(self) - 1)));
    } else {
      return None;
    };
  },
  all: function all(predicate) {
    var self = this;
    var i = 0;
    while (i < Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call(self)) {
      if (!predicate($unwrapTraitObject(Index["$impl_Index$List"].index.call(self, i)))) {
        return false;
      };
      i += 1;
    };
    return true;
  },
  any: function any(predicate) {
    var self = this;
    var i = 0;
    while (i < Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call(self)) {
      if (predicate($unwrapTraitObject(Index["$impl_Index$List"].index.call(self, i)))) {
        return true;
      };
      i += 1;
    };
    return false;
  },
  find: function find(predicate) {
    var self = this;
    var index = $unwrapTraitObject(self.value.findIndex(predicate));
    if (index >= 0) {
      return Some($unwrapTraitObject(Index["$impl_Index$List"].index.call(self, index)));
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
    $unwrapTraitObject(anyCast(self)).forEach(func);
  },
  map: function map(func) {
    var self = this;
    return { type: '$impl_lib/stdlib/core.puck:Iterable$List', value: asList($unwrapTraitObject(anyCast(self)).map(func)), $isTraitObject: true };
  },
  filterMap: function filterMap(func) {
    var self = this;
    var newList = [];
    Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call(self, function (element) {
      var __PUCK__value__19 = func($unwrapTraitObject(element));
      if (__PUCK__value__19.kind == "Some") {
        var _PUCK__value__19$val = _slicedToArray(__PUCK__value__19.value, 1),
            mappedElement = _PUCK__value__19$val[0];

        return List.push.call(newList, $unwrapTraitObject(mappedElement));
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
    var index = $unwrapTraitObject(self.value.findIndex(predicate));
    var __PUCK__value__20 = void 0;
    if (index == -1) {
      __PUCK__value__20 = [];
    } else {
      __PUCK__value__20 = self.value.slice(index);
    };
    return { type: '$impl_lib/stdlib/core.puck:Iterable$List', value: asList(__PUCK__value__20), $isTraitObject: true };
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
Index["$impl_Index$List"] = {
  index: function index(_index) {
    var self = this;
    if (_index < 0) {
      panic("index out of bounds: index must be positive but is " + _index + "");
    };
    if (_index >= Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call(self)) {
      panic("index out of bounds: the length is " + Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call(self) + " but the index is " + _index + "");
    };
    return $unwrapTraitObject(self.value[$unwrapTraitObject(_index)]);
  }
};
Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"] = {
  index: function index(key) {
    var self = this;
    if (!ObjectMap.has.call(self.value, $unwrapTraitObject(key))) {
      panic("The key " + key + " is missing");
    };
    return $unwrapTraitObject(self.value[$unwrapTraitObject(key)]);
  }
};
PartialOrd["$impl_PartialOrd$Num"] = {
  partialCmp: function partialCmp(other) {
    var self = this;
    var a = self <= other;
    var b = self >= other;
    if (a && b) {
      return Some(Ordering.Equal);
    } else {
      if (!a && b) {
        return Some(Ordering.Greater);
      } else {
        if (a && !b) {
          return Some(Ordering.Less);
        } else {
          return None;
        };
      };
    };
  },
  lt: function lt(other) {
    var self = this;
    return self < other;
  },
  le: function le(other) {
    var self = this;
    return self <= other;
  },
  gt: function gt(other) {
    var self = this;
    return self > other;
  },
  ge: function ge(other) {
    var self = this;
    return self >= other;
  }
};
Ord["$impl_lib/stdlib/core.puck:Ord$String"] = {
  cmp: function cmp(other) {
    var self = this;
    var cmp = $unwrapTraitObject(self.value.localeCompare(other));
    if (cmp > 0) {
      return Ordering.Greater;
    } else {
      if (cmp < 0) {
        return Ordering.Less;
      } else {
        return Ordering.Equal;
      };
    };
  }
};
PartialOrd["$impl_PartialOrd$String"] = {
  partialCmp: function partialCmp(other) {
    var self = this;
    var o = $unwrapTraitObject(other);
    return Some(Ord["$impl_lib/stdlib/core.puck:Ord$String"].cmp.call(self, { type: '$impl_lib/stdlib/core.puck:Ord$String', value: o, $isTraitObject: true }));
  },
  lt: PartialOrd.lt,
  le: PartialOrd.le,
  gt: PartialOrd.gt,
  ge: PartialOrd.ge
};
RegExp._new = function (pattern) {
  var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

  return $unwrapTraitObject(js.RegExp(pattern, flags));
};
RegExp.test = function (string) {
  var self = this;
  return $unwrapTraitObject(self.test(string));
};
Radix.pattern = function () {
  var self = this;
  var __PUCK__value__21 = self;
  if ($unwrapTraitObject(__PUCK__value__21).kind == "Binary") {
    var _undefined2 = $unwrapTraitObject(__PUCK__value__21);
    return RegExp._new("^[-+]?[01]+$");
  } else {
    if ($unwrapTraitObject(__PUCK__value__21).kind == "Octal") {
      var _undefined3 = $unwrapTraitObject(__PUCK__value__21);
      return RegExp._new("^[-+]?[0-7]+$");
    } else {
      if ($unwrapTraitObject(__PUCK__value__21).kind == "Decimal") {
        var _undefined4 = $unwrapTraitObject(__PUCK__value__21);
        return RegExp._new("^[-+]?[0-9]+$");
      } else {
        if ($unwrapTraitObject(__PUCK__value__21).kind == "Hex") {
          var _undefined5 = $unwrapTraitObject(__PUCK__value__21);
          return RegExp._new("^[-+]?[0-9A-Fa-f]+$");
        };
      };
    };
  };
};
Radix.radix = function () {
  var self = this;
  var __PUCK__value__22 = self;
  if ($unwrapTraitObject(__PUCK__value__22).kind == "Binary") {
    var _undefined6 = $unwrapTraitObject(__PUCK__value__22);
    return 2;
  } else {
    if ($unwrapTraitObject(__PUCK__value__22).kind == "Octal") {
      var _undefined7 = $unwrapTraitObject(__PUCK__value__22);
      return 8;
    } else {
      if ($unwrapTraitObject(__PUCK__value__22).kind == "Decimal") {
        var _undefined8 = $unwrapTraitObject(__PUCK__value__22);
        return 10;
      } else {
        if ($unwrapTraitObject(__PUCK__value__22).kind == "Hex") {
          var _undefined9 = $unwrapTraitObject(__PUCK__value__22);
          return 16;
        };
      };
    };
  };
};
Num.parseInt = function (string) {
  var radix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Radix.Decimal;

  if (RegExp.test.call(Radix.pattern.call(radix), string)) {
    return Result.Ok($unwrapTraitObject(js.parseInt(string, Radix.radix.call(radix))));
  } else {
    return Result.Err([]);
  };
};
Num.parse = function (string) {
  if (RegExp.test.call(RegExp._new("^[-+]?[0-9]+(\\.[0-9]+)?$"), string)) {
    return Result.Ok($unwrapTraitObject(js.parseFloat(string, 10)));
  } else {
    return Result.Err([]);
  };
};
Num.isNan = function () {
  var self = this;
  return $unwrapTraitObject(js.isNaN(self));
};
Num.isInfinite = function () {
  var self = this;
  return self == js.infinity || self == -js.infinity;
};
Num.ceil = function () {
  var self = this;
  return $unwrapTraitObject(js.Math.ceil(self));
};
Num.floor = function () {
  var self = this;
  return $unwrapTraitObject(js.Math.floor(self));
};
Num.round = function () {
  var self = this;
  return $unwrapTraitObject(js.Math.round(self));
};
Num.limit = function (range) {
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
Num.cmp = function (other) {
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
String.size = function () {
  var self = this;
  return $unwrapTraitObject(self.length);
};
String.contains = function (subStr) {
  var self = this;
  var index = $unwrapTraitObject(self.indexOf(subStr));
  return index >= 0;
};
String.split = function () {
  var pattern = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

  var self = this;
  return $unwrapTraitObject(anyCast(self)).split(pattern);
};
String.padLeft = function (width) {
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
String.padRight = function (width) {
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
String.toLowerCase = function () {
  var self = this;
  return $unwrapTraitObject(anyCast(self)).toLowerCase();
};
String.toUpperCase = function () {
  var self = this;
  return $unwrapTraitObject(anyCast(self)).toUpperCase();
};
String.trim = function () {
  var self = this;
  return String.trimRight.call(String.trimLeft.call(self));
};
String.trimLeft = function () {
  var self = this;
  return $unwrapTraitObject(anyCast(self)).replace(RegExp._new("^\\s+"), "");
};
String.trimRight = function () {
  var self = this;
  return $unwrapTraitObject(anyCast(self)).replace(RegExp._new("\\s+$"), "");
};
Result.isOk = function () {
  var self = this;
  return self.kind == "Ok";
};
Result.isErr = function () {
  var self = this;
  return !Result.isOk.call(self);
};
Result.andThen = function (op) {
  var self = this;
  var __PUCK__value__27 = self;
  if (__PUCK__value__27.kind == "Ok") {
    var _PUCK__value__27$val = _slicedToArray(__PUCK__value__27.value, 1),
        value = _PUCK__value__27$val[0];

    return op($unwrapTraitObject(value));
  } else {
    return self;
  };
};
Result.map = function (op) {
  var self = this;
  var __PUCK__value__28 = self;
  if (__PUCK__value__28.kind == "Ok") {
    var _PUCK__value__28$val = _slicedToArray(__PUCK__value__28.value, 1),
        value = _PUCK__value__28$val[0];

    return Ok($unwrapTraitObject(op($unwrapTraitObject(value))));
  } else {
    return self;
  };
};
Result.mapErr = function (op) {
  var self = this;
  var __PUCK__value__29 = self;
  if (__PUCK__value__29.kind == "Err") {
    var _PUCK__value__29$val = _slicedToArray(__PUCK__value__29.value, 1),
        value = _PUCK__value__29$val[0];

    return Err($unwrapTraitObject(op($unwrapTraitObject(value))));
  } else {
    return self;
  };
};
Result.unwrap = function () {
  var self = this;
  var __PUCK__value__30 = self;
  if ($unwrapTraitObject(__PUCK__value__30).kind == "Ok") {
    var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__30),
        _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
        value = _$unwrapTraitObject7$[0];

    return value;
  } else {
    if ($unwrapTraitObject(__PUCK__value__30).kind == "Err") {
      var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__30),
          _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
          err = _$unwrapTraitObject8$[0];

      throw (0, _js.Error)($unwrapTraitObject(err));
    };
  };
};
Result.unwrapErr = function () {
  var self = this;
  var __PUCK__value__31 = self;
  if ($unwrapTraitObject(__PUCK__value__31).kind == "Ok") {
    var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__31),
        _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
        value = _$unwrapTraitObject9$[0];

    throw (0, _js.Error)($unwrapTraitObject(value));
  } else {
    if ($unwrapTraitObject(__PUCK__value__31).kind == "Err") {
      var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__31),
          _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
          err = _$unwrapTraitObject11[0];

      return err;
    };
  };
};
Option.isSome = function () {
  var self = this;
  return self.kind == "Some";
};
Option.isNone = function () {
  var self = this;
  return !Option.isSome.call(self);
};
Option.okOr = function (err) {
  var self = this;
  var __PUCK__value__32 = self;
  if (__PUCK__value__32.kind == "Some") {
    var _PUCK__value__32$val = _slicedToArray(__PUCK__value__32.value, 1),
        value = _PUCK__value__32$val[0];

    return Ok($unwrapTraitObject(value));
  } else {
    return Err($unwrapTraitObject(err));
  };
};
Option.okOrElse = function (err) {
  var self = this;
  var __PUCK__value__33 = self;
  if (__PUCK__value__33.kind == "Some") {
    var _PUCK__value__33$val = _slicedToArray(__PUCK__value__33.value, 1),
        value = _PUCK__value__33$val[0];

    return Ok($unwrapTraitObject(value));
  } else {
    return Err($unwrapTraitObject(err()));
  };
};
Option.andValue = function (optb) {
  var self = this;
  if (Option.isNone.call(self)) {
    return self;
  } else {
    return optb;
  };
};
Option.andThen = function (op) {
  var self = this;
  var __PUCK__value__34 = self;
  if (__PUCK__value__34.kind == "Some") {
    var _PUCK__value__34$val = _slicedToArray(__PUCK__value__34.value, 1),
        value = _PUCK__value__34$val[0];

    return op($unwrapTraitObject(value));
  } else {
    return self;
  };
};
Option.orValue = function (optb) {
  var self = this;
  if (Option.isSome.call(self)) {
    return self;
  } else {
    return optb;
  };
};
Option.orElse = function (op) {
  var self = this;
  if (Option.isNone.call(self)) {
    return op();
  } else {
    return self;
  };
};
Option.map = function (f) {
  var self = this;
  var __PUCK__value__35 = self;
  if (__PUCK__value__35.kind == "Some") {
    var _PUCK__value__35$val = _slicedToArray(__PUCK__value__35.value, 1),
        value = _PUCK__value__35$val[0];

    return Some($unwrapTraitObject(f($unwrapTraitObject(value))));
  } else {
    return self;
  };
};
Option.mapOr = function (_default, f) {
  var self = this;
  var __PUCK__value__36 = self;
  if (__PUCK__value__36.kind == "Some") {
    var _PUCK__value__36$val = _slicedToArray(__PUCK__value__36.value, 1),
        value = _PUCK__value__36$val[0];

    return f($unwrapTraitObject(value));
  } else {
    return _default;
  };
};
Option.mapOrElse = function (_default, f) {
  var self = this;
  var __PUCK__value__37 = self;
  if (__PUCK__value__37.kind == "Some") {
    var _PUCK__value__37$val = _slicedToArray(__PUCK__value__37.value, 1),
        value = _PUCK__value__37$val[0];

    return f($unwrapTraitObject(value));
  } else {
    return _default();
  };
};
Option.unwrap = function () {
  var self = this;
  var __PUCK__value__38 = self;
  if ($unwrapTraitObject(__PUCK__value__38).kind == "Some") {
    var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__38),
        _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12.value, 1),
        value = _$unwrapTraitObject13[0];

    return value;
  } else {
    if ($unwrapTraitObject(__PUCK__value__38).kind == "None") {
      var _undefined10 = $unwrapTraitObject(__PUCK__value__38);
      throw (0, _js.Error)("Can not unwrap empty Option");
    };
  };
};
Option.unwrapOr = function (_default) {
  var self = this;
  var __PUCK__value__39 = self;
  if (__PUCK__value__39.kind == "Some") {
    var _PUCK__value__39$val = _slicedToArray(__PUCK__value__39.value, 1),
        value = _PUCK__value__39$val[0];

    return value;
  } else {
    return _default;
  };
};
Option.unwrapOrElse = function (_default) {
  var self = this;
  var __PUCK__value__40 = self;
  if (__PUCK__value__40.kind == "Some") {
    var _PUCK__value__40$val = _slicedToArray(__PUCK__value__40.value, 1),
        value = _PUCK__value__40$val[0];

    return value;
  } else {
    return _default();
  };
};
Ordering.reverse = function () {
  var self = this;
  var __PUCK__value__41 = self;
  if ($unwrapTraitObject(__PUCK__value__41).kind == "Less") {
    var _undefined11 = $unwrapTraitObject(__PUCK__value__41);
    return Ordering.Greater;
  } else {
    if ($unwrapTraitObject(__PUCK__value__41).kind == "Equal") {
      var _undefined12 = $unwrapTraitObject(__PUCK__value__41);
      return Ordering.Equal;
    } else {
      if ($unwrapTraitObject(__PUCK__value__41).kind == "Greater") {
        var _undefined13 = $unwrapTraitObject(__PUCK__value__41);
        return Ordering.Less;
      };
    };
  };
};
List.zip = function (a, b) {
  if (Iterable[a.type].size.call(a) != Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b, $isTraitObject: true })) {
    throw (0, _js.Error)("Iterable a and b are not of the same length");
  };
  var __PUCK__value__43 = Iterable[a.type].enumerate.call(a);
  var __PUCK__value__42 = Iterable[__PUCK__value__43.type].map.call(__PUCK__value__43, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        i = _ref2[0],
        a = _ref2[1];

    return [a, Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: b, $isTraitObject: true }, i)];
  });
  return Iterable[__PUCK__value__42.type].toList.call(__PUCK__value__42);
};
List.push = function (element) {
  var self = this;
  self.push(element);
};
List.lpush = function (element) {
  var self = this;
  self.unshift(element);
};
List.get = function (index) {
  var self = this;
  if (index >= 0 && index < Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self, $isTraitObject: true })) {
    return Some($unwrapTraitObject(Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: self, $isTraitObject: true }, index)));
  } else {
    return None;
  };
};
List.contains = function (item) {
  var self = this;
  return self.indexOf(item) != -1;
};
List.binarySearchBy = function (f) {
  var self = this;
  var min = 0;
  var max = Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self, $isTraitObject: true }) - 1;
  while (true) {
    if (max < min) {
      return Err(min);
    };
    var guess = [min + max] / 2;
    guess = Num.floor.call(guess);
    var __PUCK__value__44 = f($unwrapTraitObject(Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: self, $isTraitObject: true }, guess)));
    if ($unwrapTraitObject(__PUCK__value__44).kind == "Equal") {
      var _undefined14 = $unwrapTraitObject(__PUCK__value__44);
      return Ok(guess);
    } else {
      if ($unwrapTraitObject(__PUCK__value__44).kind == "Less") {
        var _undefined15 = $unwrapTraitObject(__PUCK__value__44);
        min = guess + 1;
      } else {
        if ($unwrapTraitObject(__PUCK__value__44).kind == "Greater") {
          var _undefined16 = $unwrapTraitObject(__PUCK__value__44);
          max = guess - 1;
        };
      };
    };
  };
  return Err(0);
};
Range.contains = function (item) {
  var self = this;
  return self.start <= item && item < self.end;
};
Range.isSubsetOf = function (other) {
  var self = this;
  return self.start >= other.start && other.end >= self.end;
};
ObjectMap._new = function () {
  return $unwrapTraitObject(_js._Object.create(_js._null));
};
ObjectMap.fromIter = function (list) {
  var object = ObjectMap._new();
  Iterable[list.type].forEach.call(list, function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        item = _ref4[1];

    return ObjectMap.set.call(object, key, $unwrapTraitObject(item));
  });
  return object;
};
ObjectMap.size = function () {
  var self = this;
  return $unwrapTraitObject(ObjectMap.keys.call(self).length);
};
ObjectMap.isEmpty = function () {
  var self = this;
  return ObjectMap.size.call(self) == 0;
};
ObjectMap.isNotEmpty = function () {
  var self = this;
  return ObjectMap.size.call(self) > 0;
};
ObjectMap.keys = function () {
  var self = this;
  return $unwrapTraitObject(_js._Object.keys(self));
};
ObjectMap.values = function () {
  var self = this;
  var __PUCK__value__45 = Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: ObjectMap.keys.call(self), $isTraitObject: true }, function (key) {
    return Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({ type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: self, $isTraitObject: true }, key);
  });
  return Iterable[__PUCK__value__45.type].toList.call(__PUCK__value__45);
};
ObjectMap.toList = function () {
  var self = this;
  var __PUCK__value__46 = Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: ObjectMap.keys.call(self), $isTraitObject: true }, function (key) {
    return [key, Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({ type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: self, $isTraitObject: true }, key)];
  });
  return Iterable[__PUCK__value__46.type].toList.call(__PUCK__value__46);
};
ObjectMap.all = function (predicate) {
  var self = this;
  var i = 0;
  var keys = ObjectMap.keys.call(self);
  while (i < Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: keys, $isTraitObject: true })) {
    if (!predicate($unwrapTraitObject(Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({ type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: self, $isTraitObject: true }, Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: keys, $isTraitObject: true }, i))))) {
      return false;
    };
    i += 1;
  };
  return true;
};
ObjectMap.any = function (predicate) {
  var self = this;
  var i = 0;
  var keys = ObjectMap.keys.call(self);
  while (i < Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: keys, $isTraitObject: true })) {
    if (predicate($unwrapTraitObject(Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({ type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: self, $isTraitObject: true }, Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: keys, $isTraitObject: true }, i))))) {
      return true;
    };
    i += 1;
  };
  return false;
};
ObjectMap.map = function (mapper) {
  var self = this;
  var _new = ObjectMap._new();
  Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: ObjectMap.keys.call(self), $isTraitObject: true }, function (key) {
    return _new[key] = mapper($unwrapTraitObject(Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({ type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: self, $isTraitObject: true }, key)));
  });
  return _new;
};
ObjectMap.find = function (predicate) {
  var self = this;
  var key = Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: ObjectMap.keys.call(self), $isTraitObject: true }, function (key) {
    return predicate([key, $unwrapTraitObject(Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({ type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: self, $isTraitObject: true }, key))]);
  });
  var __PUCK__value__47 = key;
  if (__PUCK__value__47.kind == "Some") {
    var _PUCK__value__47$val = _slicedToArray(__PUCK__value__47.value, 1),
        _key4 = _PUCK__value__47$val[0];

    return Some([_key4, Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({ type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: self, $isTraitObject: true }, _key4)]);
  } else {
    return None;
  };
};
ObjectMap.forEach = function (func) {
  var self = this;
  var keys = $unwrapTraitObject(_js._Object.keys(self));
  Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: keys, $isTraitObject: true }, function (key) {
    return func([key, $unwrapTraitObject(Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({ type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: self, $isTraitObject: true }, key))]);
  });
};
ObjectMap._delete = function (key) {
  var self = this;
  js._delete(self, key);
};
ObjectMap.has = function (key) {
  var self = this;
  return $unwrapTraitObject(_js._Object.prototype.hasOwnProperty.call(self, key));
};
ObjectMap.get = function (key) {
  var self = this;
  if (ObjectMap.has.call(self, key)) {
    return Some($unwrapTraitObject(Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({ type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: self, $isTraitObject: true }, key)));
  } else {
    return None;
  };
};
ObjectMap.set = function (key, value) {
  var self = this;
  self[key] = value;
};
Unknown.from = function (value) {
  return value;
};
Unknown.isNull = function () {
  var self = this;
  return $unwrapTraitObject(js.isNull(self));
};
Unknown.isUndefined = function () {
  var self = this;
  return $unwrapTraitObject(js.isUndefined(self));
};
Unknown.isBool = function () {
  var self = this;
  return (0, _js._typeof)(self) == "boolean";
};
Unknown.isNum = function () {
  var self = this;
  return (0, _js._typeof)(self) == "number";
};
Unknown.isString = function () {
  var self = this;
  return (0, _js._typeof)(self) == "string";
};
Unknown.isList = function () {
  var self = this;
  return $unwrapTraitObject(_js.Array.isArray(self));
};
Unknown.isObject = function () {
  var self = this;
  return self != _js._null && (0, _js._typeof)(self) == "object";
};
Unknown.asBool = function () {
  var self = this;
  if (Unknown.isBool.call(self)) {
    return Some($unwrapTraitObject(self));
  } else {
    return None;
  };
};
Unknown.asNum = function () {
  var self = this;
  if (Unknown.isNum.call(self)) {
    return Some($unwrapTraitObject(self));
  } else {
    return None;
  };
};
Unknown.asString = function () {
  var self = this;
  if (Unknown.isString.call(self)) {
    return Some($unwrapTraitObject(self));
  } else {
    return None;
  };
};
Unknown.asList = function () {
  var self = this;
  if (Unknown.isList.call(self)) {
    return Some($unwrapTraitObject(self));
  } else {
    return None;
  };
};
Unknown.getProp = function (property) {
  var self = this;
  if (!(Unknown.isNull.call(self) || Unknown.isUndefined.call(self))) {
    if (_js._Object.prototype.hasOwnProperty.call(self, property)) {
      return Some(self[property]);
    } else {
      return None;
    };
  } else {
    return None;
  };
};
Unknown.transmute = function () {
  var self = this;
  return self;
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

  $unwrapTraitObject($unwrapTraitObject(_js.console).log).apply(_js.console, [message].concat(extra));
};
function panic(reason) {
  return $unwrapTraitObject(js.panic(reason));
}
