'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.RegExp = exports.Bool = exports.Num = exports.String = exports.List = exports.Range = exports.ObjectMap = exports.Unknown = exports.JsIterator = exports.Map = exports.Entry = exports.Set = exports.Radix = exports.Result = exports.Option = exports.Ordering = exports.Never = exports.IntoIterator = exports.Iterator = exports.Iterable = exports.Index = exports.PartialEq = exports.PartialOrd = exports.Ord = exports.identical = exports.Ok = exports.Err = exports.Some = exports.None = exports.print = exports.panicundefined;
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
var FlatMapIterator = (object) => object;
var ListIterator = (object) => object;
var Range = exports.Range = (object) => object;
var NumRangeIterator = (object) => object;
var ObjectMap = exports.ObjectMap = (object) => object;
var Unknown = exports.Unknown = (object) => object;
var JsIterator = exports.JsIterator = (object) => object;
var Map = exports.Map = (object) => object;
var Entry = exports.Entry = (object) => object;
var Set = exports.Set = (object) => object;
var Radix = exports.Radix = {
Binary: {kind: 'Binary', value: Symbol('Binary')},
Octal: {kind: 'Octal', value: Symbol('Octal')},
Decimal: {kind: 'Decimal', value: Symbol('Decimal')},
Hex: {kind: 'Hex', value: Symbol('Hex')},
};
var Result = exports.Result = {
Ok: (member) => ({kind: 'Ok', value: member}),
Err: (member) => ({kind: 'Err', value: member}),
};
var Option = exports.Option = {
Some: (member) => ({kind: 'Some', value: member}),
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
    if ($puck_2.kind === "Some") {
      let {value: value} = $puck_2;
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
flatMap: function (f) {
  const self = this;
  const iter = {
    iter: self,
    flatteningIter: None,
    f: f,
  };
  return {type: '$impl_lib/stdlib/core.puck:Iterator$lib/stdlib/core.puck:FlatMapIterator', value: iter, $isTraitObject: true};
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
fold: function (init, reducer) {
  let self = this;
  let accumulator = $unwrapTraitObject(init);
  while (true) {
    let $puck_3 = Iterator[self.type].next.call(self);
    if (($puck_3.kind === "Some")) {
      let {value: value} = $puck_3;
      accumulator = $unwrapTraitObject(reducer($unwrapTraitObject(accumulator), $unwrapTraitObject(value)));
    }
    else {
      return accumulator;
    };
  };
},
all: function (predicate) {
  let self = this;
  while (true) {
    let $puck_4 = Iterator[self.type].next.call(self);
    if ($puck_4.kind === "Some") {
      let {value: value} = $puck_4;
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
    let $puck_5 = Iterator[self.type].next.call(self);
    if ($puck_5.kind === "Some") {
      let {value: value} = $puck_5;
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
    let $puck_6 = Iterator[self.type].next.call(self);
    if ($puck_6.kind === "Some") {
      let {value: value} = $puck_6;
      if (predicate($unwrapTraitObject(value))) {
        return Some($unwrapTraitObject(value));
      };
    }
    else {
      return None;
    };
  };
  return None;
},
position: function (predicate) {
  let self = this;
  let index = 0;
  while (true) {
    let $puck_7 = Iterator[self.type].next.call(self);
    if ($puck_7.kind === "Some") {
      let {value: value} = $puck_7;
      if (predicate($unwrapTraitObject(value))) {
        return Some(index);
      };
    }
    else {
      return None;
    };
    index += 1;
  };
  return None;
},
forEach: function (f) {
  let self = this;
  while (true) {
    let $puck_8 = Iterator[self.type].next.call(self);
    if ($puck_8.kind === "Some") {
      let {value: value} = $puck_8;
      f($unwrapTraitObject(value));
    }
    else {
      break    };
  };
},
collect: function () {
  let self = this;
  let list = [];
  while (true) {
    let $puck_9 = Iterator[self.type].next.call(self);
    if ($puck_9.kind === "Some") {
      let {value: value} = $puck_9;
      List.push.call(list, $unwrapTraitObject(value));
    }
    else {
      return list;
    };
  };
  return list;
}
};
var Iterable = exports.Iterable = {

};
var Index = exports.Index = {

};
var PartialEq = exports.PartialEq = {
ne: function (other) {
  const self = this;
  return (!PartialEq[self.type].eq.call(self, $unwrapTraitObject(other)));
}
};
var PartialOrd = exports.PartialOrd = {
lt: function (other) {
  const self = this;
  let $puck_10 = PartialOrd[self.type].partialCmp.call(self, $unwrapTraitObject(other));
  if (($unwrapTraitObject($puck_10).kind === "Some" && $unwrapTraitObject($unwrapTraitObject($puck_10).value).kind === "Less")) {
    $unwrapTraitObject($puck_10);
    return true;
  }
  else {
    if (true) {
      $puck_10;
      return false;
    };
  };
},
le: function (other) {
  const self = this;
  let $puck_11 = PartialOrd[self.type].partialCmp.call(self, $unwrapTraitObject(other));
  if (($unwrapTraitObject($puck_11).kind === "Some" && $unwrapTraitObject($unwrapTraitObject($puck_11).value).kind === "Less")) {
    $unwrapTraitObject($puck_11);
    return true;
  }
  else {
    if (($unwrapTraitObject($puck_11).kind === "Some" && $unwrapTraitObject($unwrapTraitObject($puck_11).value).kind === "Equal")) {
      $unwrapTraitObject($puck_11);
      return true;
    }
    else {
      if (true) {
        $puck_11;
        return false;
      };
    };
  };
},
gt: function (other) {
  const self = this;
  let $puck_12 = PartialOrd[self.type].partialCmp.call(self, $unwrapTraitObject(other));
  if (($unwrapTraitObject($puck_12).kind === "Some" && $unwrapTraitObject($unwrapTraitObject($puck_12).value).kind === "Greater")) {
    $unwrapTraitObject($puck_12);
    return true;
  }
  else {
    if (true) {
      $puck_12;
      return false;
    };
  };
},
ge: function (other) {
  const self = this;
  let $puck_13 = PartialOrd[self.type].partialCmp.call(self, $unwrapTraitObject(other));
  if (($unwrapTraitObject($puck_13).kind === "Some" && $unwrapTraitObject($unwrapTraitObject($puck_13).value).kind === "Greater")) {
    $unwrapTraitObject($puck_13);
    return true;
  }
  else {
    if (($unwrapTraitObject($puck_13).kind === "Some" && $unwrapTraitObject($unwrapTraitObject($puck_13).value).kind === "Equal")) {
      $unwrapTraitObject($puck_13);
      return true;
    }
    else {
      if (true) {
        $puck_13;
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
flatMap: Iterator.flatMap,
enumerate: Iterator.enumerate,
fold: Iterator.fold,
all: Iterator.all,
any: Iterator.any,
find: Iterator.find,
position: Iterator.position,
forEach: Iterator.forEach,
collect: Iterator.collect
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
Index["$impl_Index$String"] = {
index: function (index) {
  const self = this;
  if (index < 0) {
    panic("index out of bounds: index must be positive but is " + index + "");
  };
  if (index >= String.size.call(self.value)) {
    panic("index out of bounds: the length is " + String.size.call(self.value) + " but the index is " + index + "");
  };
  return $unwrapTraitObject(self.value.charAt(index));
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
flatMap: Iterator.flatMap,
enumerate: Iterator.enumerate,
fold: Iterator.fold,
all: Iterator.all,
any: Iterator.any,
find: Iterator.find,
position: Iterator.position,
forEach: Iterator.forEach,
collect: Iterator.collect
};
Iterator["$impl_lib/stdlib/core.puck:Iterator$lib/stdlib/core.puck:FilterIterator"] = {
next: function () {
  let self = this;
  while (true) {
    let $puck_16 = self.value.iter
;
    let $puck_15 = Iterator[$puck_16.type].next.call($puck_16);
    if (($puck_15.kind === "Some")) {
      let {value: value} = $puck_15;
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
flatMap: Iterator.flatMap,
enumerate: Iterator.enumerate,
fold: Iterator.fold,
all: Iterator.all,
any: Iterator.any,
find: Iterator.find,
position: Iterator.position,
forEach: Iterator.forEach,
collect: Iterator.collect
};
Iterator["$impl_lib/stdlib/core.puck:Iterator$lib/stdlib/core.puck:FilterMapIterator"] = {
next: function () {
  let self = this;
  while (true) {
    let $puck_18 = self.value.iter
;
    let $puck_17 = Iterator[$puck_18.type].next.call($puck_18);
    if ($puck_17.kind === "Some") {
      let {value: value} = $puck_17;
      let $puck_19 = self.value.f($unwrapTraitObject(value));
      if ($puck_19.kind === "Some") {
        let {value: value} = $puck_19;
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
flatMap: Iterator.flatMap,
enumerate: Iterator.enumerate,
fold: Iterator.fold,
all: Iterator.all,
any: Iterator.any,
find: Iterator.find,
position: Iterator.position,
forEach: Iterator.forEach,
collect: Iterator.collect
};
Iterator["$impl_lib/stdlib/core.puck:Iterator$lib/stdlib/core.puck:FlatMapIterator"] = {
next: function () {
  let self = this;
  let $puck_20 = self.value.flatteningIter;
  if ($puck_20.kind === "Some") {
    let {value: i} = $puck_20;
    let $puck_21 = Iterator[i.type].next.call(i);
    if ($puck_21.kind === "Some") {
      let {value: value} = $puck_21;
      return Some($unwrapTraitObject(value));
    }
    else {
      self.value.flatteningIter = None;
    };
  };
  while (true) {
    let $puck_23 = self.value.iter
;
    let $puck_22 = Iterator[$puck_23.type].next.call($puck_23);
    if ($puck_22.kind === "Some") {
      let {value: value} = $puck_22;
      let $puck_24 = self.value.f($unwrapTraitObject(value))
;
      let iter = IntoIterator[$puck_24.type].iter.call($puck_24);
      let $puck_25 = Iterator[iter.type].next.call(iter);
      if ($puck_25.kind === "Some") {
        let {value: value} = $puck_25;
        self.value.flatteningIter = Some(iter);
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
flatMap: Iterator.flatMap,
enumerate: Iterator.enumerate,
fold: Iterator.fold,
all: Iterator.all,
any: Iterator.any,
find: Iterator.find,
position: Iterator.position,
forEach: Iterator.forEach,
collect: Iterator.collect
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
flatMap: Iterator.flatMap,
enumerate: Iterator.enumerate,
fold: Iterator.fold,
all: Iterator.all,
any: Iterator.any,
find: Iterator.find,
position: Iterator.position,
forEach: Iterator.forEach,
collect: Iterator.collect
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
  return Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call(self) === 0;
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
  self.value.forEach(func);
},
map: function (func) {
  const self = this;
  return {type: '$impl_lib/stdlib/core.puck:Iterable$List', value: asList($unwrapTraitObject(anyCast(self)).map(func)), $isTraitObject: true};
},
filterMap: function (func) {
  const self = this;
  let newList = [];
  Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call(self, function (element) {
    let $puck_26 = func($unwrapTraitObject(element));
    if ($puck_26.kind === "Some") {
      let {value: mappedElement} = $puck_26;
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
  let $puck_27;
  if (index === -1) {
    $puck_27 = [];
  }
  else {
    $puck_27 = self.value.slice(index);
  };
  return {type: '$impl_lib/stdlib/core.puck:Iterable$List', value: asList($puck_27), $isTraitObject: true};
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
flatMap: Iterator.flatMap,
enumerate: Iterator.enumerate,
fold: Iterator.fold,
all: Iterator.all,
any: Iterator.any,
find: Iterator.find,
position: Iterator.position,
forEach: Iterator.forEach,
collect: Iterator.collect
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
Index["$impl_Index$lib/stdlib/core.puck:Map"] = {
index: function (key) {
  const self = this;
  if (!Map.has.call(self.value, $unwrapTraitObject(key))) {
    panic("The key " + key + " is missing");
  };
  return $unwrapTraitObject(Option.unwrap.call(Map.get.call(self.value, $unwrapTraitObject(key))));
}
};
PartialEq["$impl_PartialEq$Bool"] = {
eq: function (other) {
  const self = this;
  return identical(self.value, $unwrapTraitObject(other));
},
ne: PartialEq.ne
};
PartialEq["$impl_PartialEq$Num"] = {
eq: function (other) {
  const self = this;
  return identical(self.value, $unwrapTraitObject(other));
},
ne: PartialEq.ne
};
PartialEq["$impl_PartialEq$String"] = {
eq: function (other) {
  const self = this;
  return identical(self.value, $unwrapTraitObject(other));
},
ne: PartialEq.ne
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
Iterator["$impl_lib/stdlib/core.puck:Iterator$lib/stdlib/core.puck:JsIterator"] = {
next: function () {
  let self = this;
  let {value: value, done: done} = $unwrapTraitObject(self.value.next());
  if (done) {
    return None;
  }
  else {
    return Some(value);
  };
},
count: Iterator.count,
map: Iterator.map,
filter: Iterator.filter,
filterMap: Iterator.filterMap,
flatMap: Iterator.flatMap,
enumerate: Iterator.enumerate,
fold: Iterator.fold,
all: Iterator.all,
any: Iterator.any,
find: Iterator.find,
position: Iterator.position,
forEach: Iterator.forEach,
collect: Iterator.collect
};
IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$lib/stdlib/core.puck:Set"] = {
iter: function () {
  const self = this;
  const jsiter = Set.values.call(self.value);
  const iter = {type: '$impl_lib/stdlib/core.puck:Iterator$lib/stdlib/core.puck:JsIterator', value: jsiter, $isTraitObject: true};
  return iter;
}
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
  let $puck_28 = self;
  if ($unwrapTraitObject($puck_28).kind === "Binary") {
    $unwrapTraitObject($puck_28);
    return RegExp._new("^[-+]?[01]+$");
  }
  else {
    if ($unwrapTraitObject($puck_28).kind === "Octal") {
      $unwrapTraitObject($puck_28);
      return RegExp._new("^[-+]?[0-7]+$");
    }
    else {
      if ($unwrapTraitObject($puck_28).kind === "Decimal") {
        $unwrapTraitObject($puck_28);
        return RegExp._new("^[-+]?[0-9]+$");
      }
      else {
        if ($unwrapTraitObject($puck_28).kind === "Hex") {
          $unwrapTraitObject($puck_28);
          return RegExp._new("^[-+]?[0-9A-Fa-f]+$");
        };
      };
    };
  };
};
Radix.radix = function () {
  const self = this;
  let $puck_29 = self;
  if ($unwrapTraitObject($puck_29).kind === "Binary") {
    $unwrapTraitObject($puck_29);
    return 2;
  }
  else {
    if ($unwrapTraitObject($puck_29).kind === "Octal") {
      $unwrapTraitObject($puck_29);
      return 8;
    }
    else {
      if ($unwrapTraitObject($puck_29).kind === "Decimal") {
        $unwrapTraitObject($puck_29);
        return 10;
      }
      else {
        if ($unwrapTraitObject($puck_29).kind === "Hex") {
          $unwrapTraitObject($puck_29);
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
    return Result.Err(null);
  };
};
Num.parse = function (string) {
  if (RegExp.test.call(RegExp._new("^[-+]?[0-9]+(\\.[0-9]+)?$"), string)) {
    return Result.Ok($unwrapTraitObject(js.parseFloat(string, 10)));
  }
  else {
    return Result.Err(null);
  };
};
Num.isNan = function () {
  const self = this;
  return $unwrapTraitObject(js.isNaN(self));
};
Num.isInfinite = function () {
  const self = this;
  return (PartialEq["$impl_PartialEq$Num"].eq.call({type: '$impl_PartialEq$Num', value: self, $isTraitObject: true}, $unwrapTraitObject(js.infinity)) || self === -js.infinity);
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
  return Option.unwrapOr.call(Option.andValue.call(String.find.call(self, subStr), Option.Some(true)), false);
};
String.startsWith = function (subStr) {
  const self = this;
  return String.sub.call(self, Range._new(0, String.size.call(subStr))) === subStr;
};
String.endsWith = function (subStr) {
  const self = this;
  return String.sub.call(self, Range._new(String.size.call(self) - String.size.call(subStr), String.size.call(self))) === subStr;
};
String.split = function (pattern = "") {
  const self = this;
  return $unwrapTraitObject(self.split(pattern));
};
String.find = function (pattern = "") {
  const self = this;
  const index = $unwrapTraitObject(self.indexOf(pattern));
  if ((index >= 0)) {
    return Option.Some(index);
  }
  else {
    return Option.None;
  };
};
String.sub = function (range) {
  const self = this;
  if (range.end < range.start) {
    panic("The range is reversed");
  };
  return $unwrapTraitObject(self.substring(range.start, range.end));
};
String.padLeft = function (width, padding = " ") {
  const self = this;
  let $puck_30;
  if (width < 0) {
    $puck_30 = 0;
  }
  else {
    $puck_30 = width;
  };
  width = $puck_30;
  let $puck_31;
  if (padding === "") {
    $puck_31 = " ";
  }
  else {
    $puck_31 = padding;
  };
  padding = $puck_31;
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
  let $puck_32;
  if ((width < 0)) {
    $puck_32 = 0;
  }
  else {
    $puck_32 = width;
  };
  width = $puck_32;
  let $puck_33;
  if (padding === "") {
    $puck_33 = " ";
  }
  else {
    $puck_33 = padding;
  };
  padding = $puck_33;
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
  let $puck_34 = self;
  if (($unwrapTraitObject($puck_34).kind === "Ok")) {
    $unwrapTraitObject($puck_34);
    return true;
  }
  else {
    if ($unwrapTraitObject($puck_34).kind === "Err") {
      $unwrapTraitObject($puck_34);
      return false;
    };
  };
};
Result.isErr = function () {
  const self = this;
  let $puck_35 = self;
  if ($unwrapTraitObject($puck_35).kind === "Ok") {
    $unwrapTraitObject($puck_35);
    return false;
  }
  else {
    if ($unwrapTraitObject($puck_35).kind === "Err") {
      $unwrapTraitObject($puck_35);
      return true;
    };
  };
};
Result.andValue = function (res) {
  const self = this;
  if (Result.isOk.call(self)) {
    return res;
  }
  else {
    return self;
  };
};
Result.andThen = function (op) {
  const self = this;
  let $puck_36 = self;
  if ($puck_36.kind === "Ok") {
    let {value: value} = $puck_36;
    return op($unwrapTraitObject(value));
  }
  else {
    return self;
  };
};
Result.orValue = function (res) {
  const self = this;
  if (Result.isErr.call(self)) {
    return res;
  }
  else {
    return self;
  };
};
Result.orElse = function (op) {
  const self = this;
  let $puck_37 = self;
  if ($puck_37.kind === "Err") {
    let {value: err} = $puck_37;
    return op($unwrapTraitObject(err));
  }
  else {
    return self;
  };
};
Result.map = function (op) {
  const self = this;
  let $puck_38 = self;
  if ($puck_38.kind === "Ok") {
    let {value: value} = $puck_38;
    return Ok($unwrapTraitObject(op($unwrapTraitObject(value))));
  }
  else {
    return self;
  };
};
Result.mapErr = function (op) {
  const self = this;
  let $puck_39 = self;
  if ($puck_39.kind === "Err") {
    let {value: value} = $puck_39;
    return Err($unwrapTraitObject(op($unwrapTraitObject(value))));
  }
  else {
    return self;
  };
};
Result.unwrap = function () {
  const self = this;
  let $puck_40 = self;
  if ($unwrapTraitObject($puck_40).kind === "Ok") {
    let {value: value} = $unwrapTraitObject($puck_40);
    return value;
  }
  else {
    if ($unwrapTraitObject($puck_40).kind === "Err") {
      let {value: err} = $unwrapTraitObject($puck_40);
      throw $puck_1.Error($unwrapTraitObject(err));
    };
  };
};
Result.unwrapOr = function (_default) {
  const self = this;
  let $puck_41 = self;
  if ($puck_41.kind === "Ok") {
    let {value: value} = $puck_41;
    return value;
  }
  else {
    return _default;
  };
};
Result.unwrapOrElse = function (_default) {
  const self = this;
  let $puck_42 = self;
  if ($puck_42.kind === "Ok") {
    let {value: value} = $puck_42;
    return value;
  }
  else {
    return _default();
  };
};
Result.unwrapErr = function () {
  const self = this;
  let $puck_43 = self;
  if ($unwrapTraitObject($puck_43).kind === "Ok") {
    let {value: value} = $unwrapTraitObject($puck_43);
    throw $puck_1.Error($unwrapTraitObject(value));
  }
  else {
    if ($unwrapTraitObject($puck_43).kind === "Err") {
      let {value: err} = $unwrapTraitObject($puck_43);
      return err;
    };
  };
};
Option.isSome = function () {
  const self = this;
  let $puck_44 = self;
  if ($unwrapTraitObject($puck_44).kind === "Some") {
    $unwrapTraitObject($puck_44);
    return true;
  }
  else {
    if ($unwrapTraitObject($puck_44).kind === "None") {
      $unwrapTraitObject($puck_44);
      return false;
    };
  };
};
Option.isNone = function () {
  const self = this;
  let $puck_45 = self;
  if ($unwrapTraitObject($puck_45).kind === "Some") {
    $unwrapTraitObject($puck_45);
    return false;
  }
  else {
    if ($unwrapTraitObject($puck_45).kind === "None") {
      $unwrapTraitObject($puck_45);
      return true;
    };
  };
};
Option.okOr = function (err) {
  const self = this;
  let $puck_46 = self;
  if ($puck_46.kind === "Some") {
    let {value: value} = $puck_46;
    return Ok($unwrapTraitObject(value));
  }
  else {
    return Err($unwrapTraitObject(err));
  };
};
Option.okOrElse = function (err) {
  const self = this;
  let $puck_47 = self;
  if ($puck_47.kind === "Some") {
    let {value: value} = $puck_47;
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
  let $puck_48 = self;
  if ($puck_48.kind === "Some") {
    let {value: value} = $puck_48;
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
  let $puck_49 = self;
  if ($puck_49.kind === "Some") {
    let {value: value} = $puck_49;
    return Some($unwrapTraitObject(f($unwrapTraitObject(value))));
  }
  else {
    return self;
  };
};
Option.mapOr = function (_default, f) {
  const self = this;
  let $puck_50 = self;
  if ($puck_50.kind === "Some") {
    let {value: value} = $puck_50;
    return f($unwrapTraitObject(value));
  }
  else {
    return _default;
  };
};
Option.mapOrElse = function (_default, f) {
  const self = this;
  let $puck_51 = self;
  if ($puck_51.kind === "Some") {
    let {value: value} = $puck_51;
    return f($unwrapTraitObject(value));
  }
  else {
    return _default();
  };
};
Option.unwrap = function () {
  const self = this;
  let $puck_52 = self;
  if ($unwrapTraitObject($puck_52).kind === "Some") {
    let {value: value} = $unwrapTraitObject($puck_52);
    return value;
  }
  else {
    if ($unwrapTraitObject($puck_52).kind === "None") {
      $unwrapTraitObject($puck_52);
      return panic("Can not unwrap empty Option");
    };
  };
};
Option.unwrapOr = function (_default) {
  const self = this;
  let $puck_53 = self;
  if ($puck_53.kind === "Some") {
    let {value: value} = $puck_53;
    return value;
  }
  else {
    return _default;
  };
};
Option.unwrapOrElse = function (_default) {
  const self = this;
  let $puck_54 = self;
  if ($puck_54.kind === "Some") {
    let {value: value} = $puck_54;
    return value;
  }
  else {
    return _default();
  };
};
Ordering.reverse = function () {
  const self = this;
  let $puck_55 = self;
  if ($unwrapTraitObject($puck_55).kind === "Less") {
    $unwrapTraitObject($puck_55);
    return Ordering.Greater;
  }
  else {
    if ($unwrapTraitObject($puck_55).kind === "Equal") {
      $unwrapTraitObject($puck_55);
      return Ordering.Equal;
    }
    else {
      if ($unwrapTraitObject($puck_55).kind === "Greater") {
        $unwrapTraitObject($puck_55);
        return Ordering.Less;
      };
    };
  };
};
List.zip = function (a, b) {
  if (Iterable[a.type].size.call(a) !== Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b, $isTraitObject: true})) {
    throw $puck_1.Error("Iterable a and b are not of the same length");
  };
  let $puck_57 = Iterable[a.type].enumerate.call(a)
;
  let $puck_56 = Iterable[$puck_57.type].map.call($puck_57, function ([i, a]) {
    return [
      a,
      Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: b, $isTraitObject: true}, i),
    ];
  })
;
  return Iterable[$puck_56.type].toList.call($puck_56);
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
  const index = $unwrapTraitObject(self.indexOf(item));
  return index !== -1;
};
List.binarySearchBy = function (f) {
  const self = this;
  let min = 0;
  let max = Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: self, $isTraitObject: true}) - 1;
  while (true) {
    if ((max < min)) {
      return Err(min);
    };
    let guess = (min + max) / 2;
    guess = Num.floor.call(guess);
    let $puck_58 = f($unwrapTraitObject(Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: self, $isTraitObject: true}, guess)));
    if (($unwrapTraitObject($puck_58).kind === "Equal")) {
      $unwrapTraitObject($puck_58);
      return Ok(guess);
    }
    else {
      if ($unwrapTraitObject($puck_58).kind === "Less") {
        $unwrapTraitObject($puck_58);
        min = guess + 1;
      }
      else {
        if (($unwrapTraitObject($puck_58).kind === "Greater")) {
          $unwrapTraitObject($puck_58);
          max = guess - 1;
        };
      };
    };
  };
  return Err(0);
};
Range._new = function (start, end) {
  return {
    start: start,
    end: end,
  };
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
  return ObjectMap.size.call(self) === 0;
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
  let $puck_59 = Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: ObjectMap.keys.call(self), $isTraitObject: true}, function (key) {
    return Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: self, $isTraitObject: true}, key);
  })
;
  return Iterable[$puck_59.type].toList.call($puck_59);
};
ObjectMap.toList = function () {
  const self = this;
  let $puck_60 = Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: ObjectMap.keys.call(self), $isTraitObject: true}, function (key) {
    return [
      key,
      Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: self, $isTraitObject: true}, key),
    ];
  })
;
  return Iterable[$puck_60.type].toList.call($puck_60);
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
  let $puck_61 = key;
  if ($puck_61.kind === "Some") {
    let {value: key} = $puck_61;
    return Some([
      key,
      $unwrapTraitObject(Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: self, $isTraitObject: true}, key)),
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
  js["delete"](self, key);
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
  return $puck_1._typeof(self) === "boolean";
};
Unknown.isNum = function () {
  const self = this;
  return $puck_1._typeof(self) === "number";
};
Unknown.isString = function () {
  const self = this;
  return $puck_1._typeof(self) === "string";
};
Unknown.isList = function () {
  const self = this;
  return $unwrapTraitObject($puck_1.Array.isArray(self));
};
Unknown.isObject = function () {
  const self = this;
  return (!identical(self, $puck_1._null) && $puck_1._typeof(self) === "object");
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
Map._new = function () {
  return $unwrapTraitObject(js.createMap());
};
Map.size = function () {
  const self = this;
  return $unwrapTraitObject(self.size);
};
Map.clear = function () {
  let self = this;
  self.clear();
};
Map.set = function (key, value) {
  let self = this;
  self.set(key, value);
};
Map.get = function (key) {
  const self = this;
  const value = $unwrapTraitObject(self.get(key));
  if (value) {
    return Some($unwrapTraitObject(value));
  }
  else {
    return None;
  };
};
Map._delete = function (key) {
  let self = this;
  self["delete"](key);
};
Map.has = function (key) {
  const self = this;
  return $unwrapTraitObject(self.has(key));
};
Map.entries = function () {
  const self = this;
  return $unwrapTraitObject(self.entries());
};
Map.keys = function () {
  const self = this;
  return $unwrapTraitObject(self.keys());
};
Map.values = function () {
  const self = this;
  return $unwrapTraitObject(self.values());
};
Map.forEach = function (f) {
  const self = this;
  self.forEach(f);
};
Map.entry = function (key) {
  let self = this;
  return {
    map: self,
    key: $unwrapTraitObject(key),
  };
};
Entry.orInsert = function (_default) {
  let self = this;
  let $puck_62 = Map.get.call(self.map, $unwrapTraitObject(self.key));
  if ($puck_62.kind === "Some") {
    let {value: value} = $puck_62;
    return value;
  }
  else {
    Map.set.call(self.map, $unwrapTraitObject(self.key), $unwrapTraitObject(_default));
    return _default;
  };
};
Entry.orInsertWith = function (_default) {
  let self = this;
  let $puck_63 = Map.get.call(self.map, $unwrapTraitObject(self.key));
  if ($puck_63.kind === "Some") {
    let {value: value} = $puck_63;
    return value;
  }
  else {
    const value = $unwrapTraitObject(_default());
    Map.set.call(self.map, $unwrapTraitObject(self.key), $unwrapTraitObject(value));
    return value;
  };
};
Entry.key = function () {
  const self = this;
  return $unwrapTraitObject(self.key);
};
Set._new = function () {
  return $unwrapTraitObject(js.createSet());
};
Set.size = function () {
  const self = this;
  return $unwrapTraitObject(self.size);
};
Set.clear = function () {
  let self = this;
  self.clear();
};
Set.add = function (value) {
  let self = this;
  self.add(value);
};
Set._delete = function (value) {
  let self = this;
  self["delete"](value);
};
Set.has = function (value) {
  const self = this;
  return $unwrapTraitObject(self.has(value));
};
Set.values = function () {
  const self = this;
  return $unwrapTraitObject(self.values());
};
Set.forEach = function (f) {
  const self = this;
  self.forEach(f);
};
function identical(a, b) {
  return $unwrapTraitObject(js.identical(a, b));
};
exports.identical = identical;
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
function print(message, extra = null) {
  $unwrapTraitObject($unwrapTraitObject($puck_1.console).log).apply($puck_1.console, [message].concat(extra));
};
exports.print = print;
function panic(reason) {
  return $unwrapTraitObject(js.panic(reason));
};
exports.panic = panic
