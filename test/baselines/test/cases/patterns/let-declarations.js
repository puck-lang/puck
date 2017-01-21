#!/usr/bin/env node

'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _core = require('puck-lang/dist/lib/stdlib/core');

var Tuple = function Tuple() {
  for (var _len = arguments.length, members = Array(_len), _key = 0; _key < _len; _key++) {
    members[_key] = arguments[_key];
  }

  return members;
};
var Record = function Record(object) {
  return object;
};
var Enum = {
  A: function A() {
    for (var _len2 = arguments.length, members = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      members[_key2] = arguments[_key2];
    }

    return { kind: 'A', value: members };
  }
};

var a = 1;
var b = 2;
var c = 3;
var __PUCK__value__1 = 2;
var __PUCK__value__2 = 3;
var __PUCK__value__3 = 2;
var d = 3;
var __PUCK__value__4 = 4;
var e = 5;
var f = 2;
var g = 3;
var __PUCK__value__5 = 4;
var h = 5;
var _i$a$b = {
  i: 1,
  a: 2,
  b: 3
};
var i = _i$a$b.i;
var j = _i$a$b.a;
var _a$b = {
  a: {
    a: 1,
    b: [2, 3]
  },
  b: [{ n: 4 }, 5]
};
var _a$b$a = _a$b.a;
var k = _a$b$a.a;

var _a$b$a$b = _slicedToArray(_a$b$a.b, 2);

var l = _a$b$a$b[0];
var m = _a$b$a$b[1];

var _a$b$b = _slicedToArray(_a$b.b, 2);

var n = _a$b$b[0].n;
var o = _a$b$b[1];
var p = 1;
var q = 2;
var _a$b2 = {
  a: 1,
  b: 2
};
var r = _a$b2.a;

var _Enum$A = Enum.A(1);

var _Enum$A$value = _slicedToArray(_Enum$A.value, 1);

var s = _Enum$A$value[0];

a = 2;
