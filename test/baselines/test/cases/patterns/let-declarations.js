'use strict';
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
var Tuple = (...members) => members;
var Record = (object) => object;
var Enum = {
A: (member) => ({kind: 'A', value: member}),
};
let a = 1;
let [b, c] = [
  2,
  3,
];
let [, ] = [
  2,
  3,
];
let [, d, , e] = [
  2,
  3,
  4,
  5,
];
let [[f, g], , h] = [
  [
  2,
  3,
],
  4,
  5,
];
let {i: i, a: j} = {
  i: 1,
  a: 2,
  b: 3,
};
let {a: {a: k, b: [l, m]}, b: [{n: n}, o]} = {
  a: {
  a: 1,
  b: [
  2,
  3,
],
},
  b: [
  {n: 4},
  5,
],
};
let [p, q] = [
  1,
  2,
];
let {a: r} = {
  a: 1,
  b: 2,
};
let {value: s} = Enum.A(1);
a = 2;
a = "" + $puck_1.Num.round.call(a);
a = function (first) {
  if (first) {
    return a(false);
  }
  else {
    return 5;
  };
};
const t = {
  a: function () {
  return t;
},
  b: function () {
  return t;
},
};
const u = function (u2) {
  return function (u3) {
    return u + u2 + u3;
  };
};
let [a, b] = [
  1,
  2,
];
b += 2
