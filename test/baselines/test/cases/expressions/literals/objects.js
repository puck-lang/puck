'use strict';
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
let $puck_2;
if (false) {
  $puck_2 = 3;
};
let $puck_3;
if (true) {
  $puck_3 = 3;
}
else {
  $puck_3 = 1;
};
let a = {
  a: 1,
  b: 2,
  c: 4,
  d: $puck_2,
  e: $puck_3,
};
const b = {
  a: a,
  b: a,
};
const _arguments = [];
const c = {_arguments: _arguments};
a.a = 2;
let d = {a: 42};
d = {a: 5};
d = {
  a: 5,
  b: 10,
};
d = {
  a: 5,
  b: 10,
};
a.b = d.b;
const e = {
  a: "five",
  ...d,
  b: "ten",
};
$puck_1.Num.round.call(e.a);
$puck_1.String.toUpperCase.call(e.b);
const f = {
  ...e,
  ...d,
  c: "C",
};
let $puck_4;
if (true) {
  $puck_4 = {a: 5};
}
else {
  $puck_4 = {a: 10};
};
const g = {...$puck_4}
