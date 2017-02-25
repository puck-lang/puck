'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.RegExp = exports.Bool = exports.Num = exports.String = exports.List = exports.Range = exports.ObjectMap = exports.Unknown = exports.Radix = exports.Result = exports.Option = exports.Ordering = exports.Never = exports.IntoIterator = exports.Iterator = exports.Iterable = exports.Index = exports.PartialOrd = exports.Ord = exports.Ok = exports.Err = exports.Some = exports.None = exports.print = exports.panicundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/js");
const js = require("./core/js.js");
var RegExp = exports.RegExp = (object) => object;
var Bool = exports.Bool = (object) => object;
var Num = exports.Num = (object) => object;
var String = exports.String = (object) => object;
var StringIterator = (object) => object;
var List = exports.List = (object) => object;
var MapIterator = (object) => object;
var FilterIterator = (object) => object;
var FilterMapIterator = (object) => object;
var ListIterator = (object) => object;
var Range = exports.Range = (object) => object;
var NumRangeIterator = (object) => object;
var ObjectMap = exports.ObjectMap = (object) => object;
var Unknown = exports.Unknown = (object) => object;
var Radix = exports.Radix = {
Binary: {kind: 'Binary', value: Symbol('Binary')},
Octal: {kind: 'Octal', value: Symbol('Octal')},
Decimal: {kind: 'Decimal', value: Symbol('Decimal')},
Hex: {kind: 'Hex', value: Symbol('Hex')},
};
var Result = exports.Result = {
Ok: (...members) => ({kind: 'Ok', value: members}),
Err: (...members) => ({kind: 'Err', value: members}),
};
var Option = exports.Option = {
Some: (...members) => ({kind: 'Some', value: members}),
None: {kind: 'None', value: Symbol('None')},
};
var Ordering = exports.Ordering = {
Less: {kind: 'Less', value: Symbol('Less')},
Equal: {kind: 'Equal', value: Symbol('Equal')},
Greater: {kind: 'Greater', value: Symbol('Greater')},
};
var Never = exports.Never = {

};
var IntoIterator = exports.IntoIterator = {

};
var Iterator = exports.Iterator = {
count: function () {
  let self = this;
  let count_ = 0;
  while (true) {
    let $puck_2 = Iterator[self.type].next.call(self);
    if ($puck_2.kind == "Some") {
      let {value: [value]} = $puck_2;
      count_ += 1;
    }
    else {
      return count_;
    };
  };
  return count_;
},
map: function (f) {
  const self = this;
  const iter = {
    iter: self,
    f: f,
  };
  return {type: '$impl_lib/stdlib/core.puck:Iterator$lib/stdlib/core.puck:MapIterator', value: iter, $isTraitObject: true};
},
filter: function (predicate) {
  const self = this;
  const iter = {
    iter: self,
    predicate: predicate,
  };
  return {type: '$impl_lib/stdlib/core.puck:Iterator$lib/stdlib/core.puck:FilterIterator', value: iter, $isTraitObject: true};
},
filterMap: function (f) {
  const self = this;
  const iter = {
    iter: self,
    f: f,
  };
  return {type: '$impl_lib/stdlib/core.puck:Iterator$lib/stdlib/core.puck:FilterMapIterator', value: iter, $isTraitObject: true};
},
enumerate: function () {
  const self = this;
  let index = -1;
  return Iterator[self.type].map.call(self, function (e) {
    index += 1;
    return [
      index,
      e,
    ];
  });
},
all: function (predicate) {
  let self = this;
  while (true) {
    let $puck_3 = Iterator[self.type].next.call(self);
    if (($puck_3.kind == "Some")) {
      let {value: [value]} = $puck_3;
      if ((!predicate($unwrapTraitObject(value)))) {
        return false;
      };
    }
    else {
      return true;
    };
  };
  return true;
},
any: function (predicate) {
  let self = this;
  while (true) {
    let $puck_4 = Iterator[self.type].next.call(self);
    if ($puck_4.kind == "Some") {
      let {value: [value]} = $puck_4;
      if (predicate($unwrapTraitObject(value))) {
        return true;
      };
    }
    else {
      return false;
    };
  };
  return false;
},
find: function (predicate) {
  let self = this;
  while (true) {
    let $puck_5 = Iterator[self.type].next.call(self);
    if ($puck_5.kind == "Some") {
      let {value: [value]} = $puck_5;
      if (predicate($unwrapTraitObject(value))) {
        return Some($unwrapTraitObject(value));
      };
    }
    else {
      return None;
    };
  };
  return None;
}
};
var Iterable = exports.Iterable = {

};
var Index = exports.Index = {

};
var PartialOrd = exports.PartialOrd = {
lt: function (other) {
  const self = this;
  let $puck_6 = PartialOrd[self.type].partialCmp.call(self, $unwrapTraitObject(other));
  if (($unwrapTraitObject($puck_6).kind == "Some" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_6).value)[0]).kind == "Less")) {
    let {value: []} = $unwrapTraitObject($puck_6);
    return true;
  }
  else {
    if (true) {
      let $puck_7 = $puck_6;
      return false;
    };
  };
},
le: function (other) {
  const self = this;
  let $puck_8 = PartialOrd[self.type].partialCmp.call(self, $unwrapTraitObject(other));
  if (($unwrapTraitObject($puck_8).kind == "Some" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_8).value)[0]).kind == "Less")) {
    let {value: []} = $unwrapTraitObject($puck_8);
    return true;
  }
  else {
    if (($unwrapTraitObject($puck_8).kind == "Some" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_8).value)[0]).kind == "Equal")) {
      let {value: []} = $unwrapTraitObject($puck_8);
      return true;
    }
    else {
      if (true) {
        let $puck_9 = $puck_8;
        return false;
      };
    };
  };
},
gt: function (other) {
  const self = this;
  let $puck_10 = PartialOrd[self.type].partialCmp.call(self, $unwrapTraitObject(other));
  if (($unwrapTraitObject($puck_10).kind == "Some" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_10).value)[0]).kind == "Greater")) {
    let {value: []} = $unwrapTraitObject($puck_10);
    return true;
  }
  else {
    if (true) {
      let $puck_11 = $puck_10;
      return false;
    };
  };
},
ge: function (other) {
  const self = this;
  let $puck_12 = PartialOrd[self.type].partialCmp.call(self, $unwrapTraitObject(other));
  if (($unwrapTraitObject($puck_12).kind == "Some" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_12).value)[0]).kind == "Greater")) {
    let {value: []} = $unwrapTraitObject($puck_12);
    return true;
  }
  else {
    if (($unwrapTraitObject($puck_12).kind == "Some" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_12).value)[0]).kind == "Equal")) {
      let {value: []} = $unwrapTraitObject($puck_12);
      return true;
    }
    else {
      if (true) {
        let $puck_13 = $puck_12;
        return false;
      };
    };
  };
}
};
var Ord = exports.Ord = {

};
Iterator["$impl_lib/stdlib/core.puck:Iterator$lib/stdlib/core.puck:StringIterator"] = {
next: function () {
  let self = this;
  if (self.value.index < String.size.call(self.value.string)) {
    const char = $unwrapTraitObject(self.value.string.charAt(self.value.index));
    self.value.index += 1;
    return Option.Some(char);
  }
  else {
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
iter: function () {
  const self = this;
  const iterator = {
    index: 0,
    string: self.value,
  };
  return {type: '$impl_lib/stdlib/core.puck:Iterator$lib/stdlib/core.puck:StringIterator', value: iterator, $isTraitObject: true};
}
};
Iterator["$impl_lib/stdlib/core.puck:Iterator$lib/stdlib/core.puck:MapIterator"] = {
next: function () {
  let self = this;
  let $puck_14 = self.value.iter
;
  return Option.map.call(Iterator[$puck_14.type].next.call($puck_14), $unwrapTraitObject(self.value.f));
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
next: function () {
  let self = this;
  while (true) {
    let $puck_16 = self.value.iter
;
    let $puck_15 = Iterator[$puck_16.type].next.call($puck_16);
    if ($puck_15.kind == "Some") {
      let {value: [value]} = $puck_15;
      if (self.value.predicate($unwrapTraitObject(value))) {
        return Some($unwrapTraitObject(value));
      };
    }
    else {
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
next: function () {
  let self = this;
  while (true) {
    let $puck_18 = self.value.iter
;
    let $puck_17 = Iterator[$puck_18.type].next.call($puck_18);
    if ($puck_17.kind == "Some") {
      let {value: [value]} = $puck_17;
      let $puck_19 = self.value.f($unwrapTraitObject(value));
      if ($puck_19.kind == "Some") {
        let {value: [value]} = $puck_19;
        return Some($unwrapTraitObject(value));
      };
    }
    else {
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
next: function () {
  let self = this;
  const element = List.get.call(self.value.list, self.value.index);
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
iter: function () {
  const self = this;
  const iterator = {
    index: 0,
    list: self.value,
  };
  return {type: '$impl_lib/stdlib/core.puck:Iterator$lib/stdlib/core.puck:ListIterator', value: iterator, $isTraitObject: true};
}
};
Iterable["$impl_lib/stdlib/core.puck:Iterable$List"] = {
enumerate: function () {
  const self = this;
  return {type: '$impl_lib/stdlib/core.puck:Iterable$List', value: asList(self.value.map(function (element, index) {
    return [
      index,
      element,
    ];
  })), $isTraitObject: true};
},
size: function () {
  const self = this;
  return $unwrapTraitObject(self.value.length);
},
isEmpty: function () {
  const self = this;
  return Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call(self) == 0;
},
isNotEmpty: function () {
  const self = this;
  return Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call(self) > 0;
},
first: function () {
  const self = this;
  if (Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call(self) > 0) {
    return Some($unwrapTraitObject(Index["$impl_Index$List"].index.call(self, 0)));
  }
  else {
    return None;
  };
},
last: function () {
  const self = this;
  if (Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call(self) > 0) {
    return Some($unwrapTraitObject(Index["$impl_Index$List"].index.call(self, Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call(self) - 1)));
  }
  else {
    return None;
  };
},
all: function (predicate) {
  const self = this;
  let i = 0;
  while ((i < Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call(self))) {
    if ((!predicate($unwrapTraitObject(Index["$impl_Index$List"].index.call(self, i))))) {
      return false;
    };
    i += 1;
  };
  return true;
},
any: function (predicate) {
  const self = this;
  let i = 0;
  while (i < Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call(self)) {
    if (predicate($unwrapTraitObject(Index["$impl_Index$List"].index.call(self, i)))) {
      return true;
    };
    i += 1;
  };
  return false;
},
find: function (predicate) {
  const self = this;
  const index = $unwrapTraitObject(self.value.findIndex(predicate));
  if (index >= 0) {
    return Some($unwrapTraitObject(Index["$impl_Index$List"].index.call(self, index)));
  }
  else {
    return None;
  };
},
filter: function (func) {
  const self = this;
  return {type: '$impl_lib/stdlib/core.puck:Iterable$List', value: asList($unwrapTraitObject(anyCast(self)).filter(func)), $isTraitObject: true};
},
forEach: function (func) {
  const self = this;
  $unwrapTraitObject(anyCast(self)).forEach(func);
},
map: function (func) {
  const self = this;
  return {type: '$impl_lib/stdlib/core.puck:Iterable$List', value: asList($unwrapTraitObject(anyCast(self)).map(func)), $isTraitObject: true};
},
filterMap: function (func) {
  const self = this;
  let newList = [];
  Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call(self, function (element) {
    let $puck_20 = func($unwrapTraitObject(element));
    if ($puck_20.kind == "Some") {
      let {value: [mappedElement]} = $puck_20;
      return List.push.call(newList, $unwrapTraitObject(mappedElement));
    };
  });
  return {type: '$impl_lib/stdlib/core.puck:Iterable$List', value: newList, $isTraitObject: true};
},
skip: function (count) {
  const self = this;
  return {type: '$impl_lib/stdlib/core.puck:Iterable$List', value: asList(self.value.slice(count)), $isTraitObject: true};
},
skipUntil: function (predicate) {
  const self = this;
  const index = $unwrapTraitObject(self.value.findIndex(predicate));
  let $puck_21;
  if (index == -1) {
    $puck_21 = [];
  }
  else {
    $puck_21 = self.value.slice(index);
  };
  return {type: '$impl_lib/stdlib/core.puck:Iterable$List', value: asList($puck_21), $isTraitObject: true};
},
take: function (count) {
  const self = this;
  return {type: '$impl_lib/stdlib/core.puck:Iterable$List', value: asList(self.value.slice(0, count)), $isTraitObject: true};
},
toList: function () {
  const self = this;
  return self.value;
}
};
Iterator["$impl_lib/stdlib/core.puck:Iterator$lib/stdlib/core.puck:NumRangeIterator"] = {
next: function () {
  let self = this;
  const element = self.value.index;
  if ((element < self.value.end)) {
    self.value.index += 1;
    return Some(element);
  }
  else {
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
iter: function () {
  const self = this;
  const iterator = {
    index: self.value.start,
    end: self.value.end,
  };
  return {type: '$impl_lib/stdlib/core.puck:Iterator$lib/stdlib/core.puck:NumRangeIterator', value: iterator, $isTraitObject: true};
}
};
Index["$impl_Index$List"] = {
index: function (index) {
  const self = this;
  if (index < 0) {
    panic("index out of bounds: index must be positive but is " + index + "");
  };
  if (index >= Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call(self)) {
    panic("index out of bounds: the length is " + Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call(self) + " but the index is " + index + "");
  };
  return $unwrapTraitObject(self.value[$unwrapTraitObject(index)]);
}
};
Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"] = {
index: function (key) {
  const self = this;
  if ((!ObjectMap.has.call(self.value, $unwrapTraitObject(key)))) {
    panic("The key " + key + " is missing");
  };
  return $unwrapTraitObject(self.value[$unwrapTraitObject(key)]);
}
};
PartialOrd["$impl_PartialOrd$Num"] = {
partialCmp: function (other) {
  const self = this;
  const a = self <= other;
  const b = self >= other;
  if ((a && b)) {
    return Some(Ordering.Equal);
  }
  else {
    if (!a && b) {
      return Some(Ordering.Greater);
    }
    else {
      if ((a && !b)) {
        return Some(Ordering.Less);
      }
      else {
        return None;
      };
    };
  };
},
lt: function (other) {
  const self = this;
  return self < other;
},
le: function (other) {
  const self = this;
  return self <= other;
},
gt: function (other) {
  const self = this;
  return self > other;
},
ge: function (other) {
  const self = this;
  return self >= other;
}
};
Ord["$impl_lib/stdlib/core.puck:Ord$String"] = {
cmp: function (other) {
  const self = this;
  const cmp = $unwrapTraitObject(self.value.localeCompare(other));
  if (cmp > 0) {
    return Ordering.Greater;
  }
  else {
    if (cmp < 0) {
      return Ordering.Less;
    }
    else {
      return Ordering.Equal;
    };
  };
}
};
PartialOrd["$impl_PartialOrd$String"] = {
partialCmp: function (other) {
  const self = this;
  const o = $unwrapTraitObject(other);
  return Some(Ord["$impl_lib/stdlib/core.puck:Ord$String"].cmp.call(self, {type: '$impl_lib/stdlib/core.puck:Ord$String', value: o, $isTraitObject: true}));
},
lt: PartialOrd.lt,
le: PartialOrd.le,
gt: PartialOrd.gt,
ge: PartialOrd.ge
};
RegExp._new = function (pattern, flags = "") {
  return $unwrapTraitObject(js.RegExp(pattern, flags));
};
RegExp.test = function (string) {
  const self = this;
  return $unwrapTraitObject(self.test(string));
};
Radix.pattern = function () {
  const self = this;
  let $puck_22 = self;
  if ($unwrapTraitObject($puck_22).kind == "Binary") {
    let undefined = $unwrapTraitObject($puck_22);
    return RegExp._new("^[-+]?[01]+$");
  }
  else {
    if ($unwrapTraitObject($puck_22).kind == "Octal") {
      let undefined = $unwrapTraitObject($puck_22);
      return RegExp._new("^[-+]?[0-7]+$");
    }
    else {
      if ($unwrapTraitObject($puck_22).kind == "Decimal") {
        let undefined = $unwrapTraitObject($puck_22);
        return RegExp._new("^[-+]?[0-9]+$");
      }
      else {
        if ($unwrapTraitObject($puck_22).kind == "Hex") {
          let undefined = $unwrapTraitObject($puck_22);
          return RegExp._new("^[-+]?[0-9A-Fa-f]+$");
        };
      };
    };
  };
};
Radix.radix = function () {
  const self = this;
  let $puck_23 = self;
  if ($unwrapTraitObject($puck_23).kind == "Binary") {
    let undefined = $unwrapTraitObject($puck_23);
    return 2;
  }
  else {
    if ($unwrapTraitObject($puck_23).kind == "Octal") {
      let undefined = $unwrapTraitObject($puck_23);
      return 8;
    }
    else {
      if ($unwrapTraitObject($puck_23).kind == "Decimal") {
        let undefined = $unwrapTraitObject($puck_23);
        return 10;
      }
      else {
        if ($unwrapTraitObject($puck_23).kind == "Hex") {
          let undefined = $unwrapTraitObject($puck_23);
          return 16;
        };
      };
    };
  };
};
Num.parseInt = function (string, radix = Radix.Decimal) {
  if (RegExp.test.call(Radix.pattern.call(radix), string)) {
    return Result.Ok($unwrapTraitObject(js.parseInt(string, Radix.radix.call(radix))));
  }
  else {
    return Result.Err([]);
  };
};
Num.parse = function (string) {
  if (RegExp.test.call(RegExp._new("^[-+]?[0-9]+(\\.[0-9]+)?$"), string)) {
    return Result.Ok($unwrapTraitObject(js.parseFloat(string, 10)));
  }
  else {
    return Result.Err([]);
  };
};
Num.isNan = function () {
  const self = this;
  return $unwrapTraitObject(js.isNaN(self));
};
Num.isInfinite = function () {
  const self = this;
  return (self == js.infinity || self == -js.infinity);
};
Num.ceil = function () {
  const self = this;
  return $unwrapTraitObject(js.Math.ceil(self));
};
Num.floor = function () {
  const self = this;
  return $unwrapTraitObject(js.Math.floor(self));
};
Num.round = function () {
  const self = this;
  return $unwrapTraitObject(js.Math.round(self));
};
Num.limit = function (range) {
  const self = this;
  if ((self < range.start)) {
    return range.start;
  }
  else {
    if (self >= range.end) {
      return range.end - 1;
    }
    else {
      return self;
    };
  };
};
Num.cmp = function (other) {
  const self = this;
  if ((self < other)) {
    return Ordering.Less;
  }
  else {
    if (self > other) {
      return Ordering.Greater;
    }
    else {
      return Ordering.Equal;
    };
  };
};
String.size = function () {
  const self = this;
  return $unwrapTraitObject(self.length);
};
String.contains = function (subStr) {
  const self = this;
  const index = $unwrapTraitObject(self.indexOf(subStr));
  return index >= 0;
};
String.split = function (pattern = "") {
  const self = this;
  return $unwrapTraitObject(anyCast(self)).split(pattern);
};
String.padLeft = function (width, padding = " ") {
  const self = this;
  let $puck_24;
  if (width < 0) {
    $puck_24 = 0;
  }
  else {
    $puck_24 = width;
  };
  width = $puck_24;
  let $puck_25;
  if (padding == "") {
    $puck_25 = " ";
  }
  else {
    $puck_25 = padding;
  };
  padding = $puck_25;
  if (String.size.call(self) >= width) {
    return self;
  };
  const padCount = (width - String.size.call(self)) / String.size.call(padding);
  let i = 0;
  let _new = self;
  while ((i < padCount)) {
    _new = padding + _new;
    i += 1;
  };
  return _new;
};
String.padRight = function (width, padding = " ") {
  const self = this;
  let $puck_26;
  if ((width < 0)) {
    $puck_26 = 0;
  }
  else {
    $puck_26 = width;
  };
  width = $puck_26;
  let $puck_27;
  if (padding == "") {
    $puck_27 = " ";
  }
  else {
    $puck_27 = padding;
  };
  padding = $puck_27;
  if (String.size.call(self) >= width) {
    return self;
  };
  const padCount = (width - String.size.call(self)) / String.size.call(padding);
  let i = 0;
  let _new = self;
  while ((i < padCount)) {
    _new = _new + padding;
    i += 1;
  };
  return _new;
};
String.toLowerCase = function () {
  const self = this;
  return $unwrapTraitObject(anyCast(self)).toLowerCase();
};
String.toUpperCase = function () {
  const self = this;
  return $unwrapTraitObject(anyCast(self)).toUpperCase();
};
String.trim = function () {
  const self = this;
  return String.trimRight.call(String.trimLeft.call(self));
};
String.trimLeft = function () {
  const self = this;
  return $unwrapTraitObject(anyCast(self)).replace(RegExp._new("^\\s+"), "");
};
String.trimRight = function () {
  const self = this;
  return $unwrapTraitObject(anyCast(self)).replace(RegExp._new("\\s+$"), "");
};
Result.isOk = function () {
  const self = this;
  return (self.kind == "Ok");
};
Result.isErr = function () {
  const self = this;
  return (!Result.isOk.call(self));
};
Result.andThen = function (op) {
  const self = this;
  let $puck_28 = self;
  if ($puck_28.kind == "Ok") {
    let {value: [value]} = $puck_28;
    return op($unwrapTraitObject(value));
  }
  else {
    return self;
  };
};
Result.map = function (op) {
  const self = this;
  let $puck_29 = self;
  if ($puck_29.kind == "Ok") {
    let {value: [value]} = $puck_29;
    return Ok($unwrapTraitObject(op($unwrapTraitObject(value))));
  }
  else {
    return self;
  };
};
Result.mapErr = function (op) {
  const self = this;
  let $puck_30 = self;
  if ($puck_30.kind == "Err") {
    let {value: [value]} = $puck_30;
    return Err($unwrapTraitObject(op($unwrapTraitObject(value))));
  }
  else {
    return self;
  };
};
Result.unwrap = function () {
  const self = this;
  let $puck_31 = self;
  if ($unwrapTraitObject($puck_31).kind == "Ok") {
    let {value: [value]} = $unwrapTraitObject($puck_31);
    return value;
  }
  else {
    if ($unwrapTraitObject($puck_31).kind == "Err") {
      let {value: [err]} = $unwrapTraitObject($puck_31);
      throw $puck_1.Error($unwrapTraitObject(err));
    };
  };
};
Result.unwrapErr = function () {
  const self = this;
  let $puck_32 = self;
  if ($unwrapTraitObject($puck_32).kind == "Ok") {
    let {value: [value]} = $unwrapTraitObject($puck_32);
    throw $puck_1.Error($unwrapTraitObject(value));
  }
  else {
    if ($unwrapTraitObject($puck_32).kind == "Err") {
      let {value: [err]} = $unwrapTraitObject($puck_32);
      return err;
    };
  };
};
Option.isSome = function () {
  const self = this;
  return self.kind == "Some";
};
Option.isNone = function () {
  const self = this;
  return (!Option.isSome.call(self));
};
Option.okOr = function (err) {
  const self = this;
  let $puck_33 = self;
  if ($puck_33.kind == "Some") {
    let {value: [value]} = $puck_33;
    return Ok($unwrapTraitObject(value));
  }
  else {
    return Err($unwrapTraitObject(err));
  };
};
Option.okOrElse = function (err) {
  const self = this;
  let $puck_34 = self;
  if ($puck_34.kind == "Some") {
    let {value: [value]} = $puck_34;
    return Ok($unwrapTraitObject(value));
  }
  else {
    return Err($unwrapTraitObject(err()));
  };
};
Option.andValue = function (optb) {
  const self = this;
  if (Option.isNone.call(self)) {
    return self;
  }
  else {
    return optb;
  };
};
Option.andThen = function (op) {
  const self = this;
  let $puck_35 = self;
  if ($puck_35.kind == "Some") {
    let {value: [value]} = $puck_35;
    return op($unwrapTraitObject(value));
  }
  else {
    return self;
  };
};
Option.orValue = function (optb) {
  const self = this;
  if (Option.isSome.call(self)) {
    return self;
  }
  else {
    return optb;
  };
};
Option.orElse = function (op) {
  const self = this;
  if (Option.isNone.call(self)) {
    return op();
  }
  else {
    return self;
  };
};
Option.map = function (f) {
  const self = this;
  let $puck_36 = self;
  if ($puck_36.kind == "Some") {
    let {value: [value]} = $puck_36;
    return Some($unwrapTraitObject(f($unwrapTraitObject(value))));
  }
  else {
    return self;
  };
};
Option.mapOr = function (_default, f) {
  const self = this;
  let $puck_37 = self;
  if ($puck_37.kind == "Some") {
    let {value: [value]} = $puck_37;
    return f($unwrapTraitObject(value));
  }
  else {
    return _default;
  };
};
Option.mapOrElse = function (_default, f) {
  const self = this;
  let $puck_38 = self;
  if ($puck_38.kind == "Some") {
    let {value: [value]} = $puck_38;
    return f($unwrapTraitObject(value));
  }
  else {
    return _default();
  };
};
Option.unwrap = function () {
  const self = this;
  let $puck_39 = self;
  if ($unwrapTraitObject($puck_39).kind == "Some") {
    let {value: [value]} = $unwrapTraitObject($puck_39);
    return value;
  }
  else {
    if ($unwrapTraitObject($puck_39).kind == "None") {
      let undefined = $unwrapTraitObject($puck_39);
      throw $puck_1.Error("Can not unwrap empty Option");
    };
  };
};
Option.unwrapOr = function (_default) {
  const self = this;
  let $puck_40 = self;
  if ($puck_40.kind == "Some") {
    let {value: [value]} = $puck_40;
    return value;
  }
  else {
    return _default;
  };
};
Option.unwrapOrElse = function (_default) {
  const self = this;
  let $puck_41 = self;
  if ($puck_41.kind == "Some") {
    let {value: [value]} = $puck_41;
    return value;
  }
  else {
    return _default();
  };
};
Ordering.reverse = function () {
  const self = this;
  let $puck_42 = self;
  if ($unwrapTraitObject($puck_42).kind == "Less") {
    let undefined = $unwrapTraitObject($puck_42);
    return Ordering.Greater;
  }
  else {
    if ($unwrapTraitObject($puck_42).kind == "Equal") {
      let undefined = $unwrapTraitObject($puck_42);
      return Ordering.Equal;
    }
    else {
      if ($unwrapTraitObject($puck_42).kind == "Greater") {
        let undefined = $unwrapTraitObject($puck_42);
        return Ordering.Less;
      };
    };
  };
};
List.zip = function (a, b) {
  if (Iterable[a.type].size.call(a) != Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b, $isTraitObject: true})) {
    throw $puck_1.Error("Iterable a and b are not of the same length");
  };
  let $puck_44 = Iterable[a.type].enumerate.call(a)
;
  let $puck_43 = Iterable[$puck_44.type].map.call($puck_44, function ([i, a]) {
    return [
      a,
      Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: b, $isTraitObject: true}, i),
    ];
  })
;
  return Iterable[$puck_43.type].toList.call($puck_43);
};
List.push = function (element) {
  let self = this;
  self.push(element);
};
List.lpush = function (element) {
  let self = this;
  self.unshift(element);
};
List.get = function (index) {
  const self = this;
  if ((index >= 0 && index < Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self, $isTraitObject: true}))) {
    return Some($unwrapTraitObject(Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: self, $isTraitObject: true}, index)));
  }
  else {
    return None;
  };
};
List.contains = function (item) {
  const self = this;
  return self.indexOf(item) != -1;
};
List.binarySearchBy = function (f) {
  const self = this;
  let min = 0;
  let max = Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self, $isTraitObject: true}) - 1;
  while (true) {
    if ((max < min)) {
      return Err(min);
    };
    let guess = [(min + max)] / 2;
    guess = Num.floor.call(guess);
    let $puck_45 = f($unwrapTraitObject(Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: self, $isTraitObject: true}, guess)));
    if (($unwrapTraitObject($puck_45).kind == "Equal")) {
      let undefined = $unwrapTraitObject($puck_45);
      return Ok(guess);
    }
    else {
      if ($unwrapTraitObject($puck_45).kind == "Less") {
        let undefined = $unwrapTraitObject($puck_45);
        min = guess + 1;
      }
      else {
        if (($unwrapTraitObject($puck_45).kind == "Greater")) {
          let undefined = $unwrapTraitObject($puck_45);
          max = guess - 1;
        };
      };
    };
  };
  return Err(0);
};
Range.contains = function (item) {
  const self = this;
  return (self.start <= item && item < self.end);
};
Range.isSubsetOf = function (other) {
  const self = this;
  return (self.start >= other.start && other.end >= self.end);
};
ObjectMap._new = function () {
  return $unwrapTraitObject($puck_1._Object.create($puck_1._null));
};
ObjectMap.fromIter = function (list) {
  let object = ObjectMap._new();
  Iterable[list.type].forEach.call(list, function ([key, item]) {
    return ObjectMap.set.call(object, key, $unwrapTraitObject(item));
  });
  return object;
};
ObjectMap.size = function () {
  const self = this;
  return $unwrapTraitObject(ObjectMap.keys.call(self).length);
};
ObjectMap.isEmpty = function () {
  const self = this;
  return ObjectMap.size.call(self) == 0;
};
ObjectMap.isNotEmpty = function () {
  const self = this;
  return ObjectMap.size.call(self) > 0;
};
ObjectMap.keys = function () {
  const self = this;
  return $unwrapTraitObject($puck_1._Object.keys(self));
};
ObjectMap.values = function () {
  const self = this;
  let $puck_46 = Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: ObjectMap.keys.call(self), $isTraitObject: true}, function (key) {
    return Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: self, $isTraitObject: true}, key);
  })
;
  return Iterable[$puck_46.type].toList.call($puck_46);
};
ObjectMap.toList = function () {
  const self = this;
  let $puck_47 = Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: ObjectMap.keys.call(self), $isTraitObject: true}, function (key) {
    return [
      key,
      Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: self, $isTraitObject: true}, key),
    ];
  })
;
  return Iterable[$puck_47.type].toList.call($puck_47);
};
ObjectMap.all = function (predicate) {
  const self = this;
  let i = 0;
  const keys = ObjectMap.keys.call(self);
  while (i < Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: keys, $isTraitObject: true})) {
    if ((!predicate($unwrapTraitObject(Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: self, $isTraitObject: true}, Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: keys, $isTraitObject: true}, i)))))) {
      return false;
    };
    i += 1;
  };
  return true;
};
ObjectMap.any = function (predicate) {
  const self = this;
  let i = 0;
  const keys = ObjectMap.keys.call(self);
  while (i < Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: keys, $isTraitObject: true})) {
    if (predicate($unwrapTraitObject(Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: self, $isTraitObject: true}, Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: keys, $isTraitObject: true}, i))))) {
      return true;
    };
    i += 1;
  };
  return false;
};
ObjectMap.map = function (mapper) {
  const self = this;
  let _new = ObjectMap._new();
  Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: ObjectMap.keys.call(self), $isTraitObject: true}, function (key) {
    return _new[key] = mapper($unwrapTraitObject(Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: self, $isTraitObject: true}, key)));
  });
  return _new;
};
ObjectMap.find = function (predicate) {
  const self = this;
  const key = Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: ObjectMap.keys.call(self), $isTraitObject: true}, function (key) {
    return predicate([
      key,
      $unwrapTraitObject(Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: self, $isTraitObject: true}, key)),
    ]);
  });
  let $puck_48 = key;
  if ($puck_48.kind == "Some") {
    let {value: [key]} = $puck_48;
    return Some([
      key,
      Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: self, $isTraitObject: true}, key),
    ]);
  }
  else {
    return None;
  };
};
ObjectMap.forEach = function (func) {
  const self = this;
  const keys = $unwrapTraitObject($puck_1._Object.keys(self));
  Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: keys, $isTraitObject: true}, function (key) {
    return func([
      key,
      $unwrapTraitObject(Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: self, $isTraitObject: true}, key)),
    ]);
  });
};
ObjectMap._delete = function (key) {
  let self = this;
  js._delete(self, key);
};
ObjectMap.has = function (key) {
  const self = this;
  return $unwrapTraitObject($puck_1._Object.prototype.hasOwnProperty.call(self, key));
};
ObjectMap.get = function (key) {
  const self = this;
  if (ObjectMap.has.call(self, key)) {
    return Some($unwrapTraitObject(Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: self, $isTraitObject: true}, key)));
  }
  else {
    return None;
  };
};
ObjectMap.set = function (key, value) {
  let self = this;
  self[key] = value;
};
Unknown.from = function (value) {
  return value;
};
Unknown.isNull = function () {
  const self = this;
  return $unwrapTraitObject(js.isNull(self));
};
Unknown.isUndefined = function () {
  const self = this;
  return $unwrapTraitObject(js.isUndefined(self));
};
Unknown.isBool = function () {
  const self = this;
  return $puck_1._typeof(self) == "boolean";
};
Unknown.isNum = function () {
  const self = this;
  return $puck_1._typeof(self) == "number";
};
Unknown.isString = function () {
  const self = this;
  return $puck_1._typeof(self) == "string";
};
Unknown.isList = function () {
  const self = this;
  return $unwrapTraitObject($puck_1.Array.isArray(self));
};
Unknown.isObject = function () {
  const self = this;
  return (self != $puck_1._null && $puck_1._typeof(self) == "object");
};
Unknown.asBool = function () {
  const self = this;
  if (Unknown.isBool.call(self)) {
    return Some($unwrapTraitObject(self));
  }
  else {
    return None;
  };
};
Unknown.asNum = function () {
  const self = this;
  if (Unknown.isNum.call(self)) {
    return Some($unwrapTraitObject(self));
  }
  else {
    return None;
  };
};
Unknown.asString = function () {
  const self = this;
  if (Unknown.isString.call(self)) {
    return Some($unwrapTraitObject(self));
  }
  else {
    return None;
  };
};
Unknown.asList = function () {
  const self = this;
  if (Unknown.isList.call(self)) {
    return Some($unwrapTraitObject(self));
  }
  else {
    return None;
  };
};
Unknown.getProp = function (property) {
  const self = this;
  if ((!(Unknown.isNull.call(self) || Unknown.isUndefined.call(self)))) {
    if ($puck_1._Object.prototype.hasOwnProperty.call(self, property)) {
      return Some(self[property]);
    }
    else {
      return None;
    };
  }
  else {
    return None;
  };
};
Unknown.transmute = function () {
  const self = this;
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
function print(message, extra = []) {
  $unwrapTraitObject($unwrapTraitObject($puck_1.console).log).apply($puck_1.console, [message].concat(extra));
};
exports.print = print;
function panic(reason) {
  return $unwrapTraitObject(js.panic(reason));
};
exports.panic = panic
