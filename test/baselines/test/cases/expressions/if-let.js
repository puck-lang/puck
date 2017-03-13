'use strict';
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
let $puck_2 = $puck_1.Some(5);
if ($puck_2 !== undefined) {
  let value = $puck_2;
  $puck_1.print(value);
}
else {
  $puck_1.print("None");
};
let $puck_3 = $puck_1.Option.Some(5);
if ($puck_3 !== undefined) {
  let value = $puck_3;
  $puck_1.print(value);
}
else {
  $puck_1.print("None");
};
let $puck_4 = $puck_1.Option.Some(3);
if ($puck_4 !== undefined) {
  let number = $puck_4;
  number;
}
else {
  "string";
}
