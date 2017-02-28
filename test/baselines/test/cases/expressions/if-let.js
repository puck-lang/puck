'use strict';
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
let $puck_2 = $puck_1.Some(5);
if ($puck_2.kind === "Some") {
  let {value: [value]} = $puck_2;
  $puck_1.print(value);
}
else {
  $puck_1.print("None");
};
let $puck_3 = $puck_1.Option.Some(5);
if ($puck_3.kind === "Some") {
  let {value: [value]} = $puck_3;
  $puck_1.print(value);
}
else {
  $puck_1.print("None");
};
let $puck_4 = $puck_1.Option.Some(3);
if ($puck_4.kind === "Some") {
  let {value: [number]} = $puck_4;
  number;
}
else {
  "string";
}
