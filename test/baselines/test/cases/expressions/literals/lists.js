'use strict';
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const a = [
  "a",
  "1",
  "true",
];
const b = [
  [1],
  [
  2,
  3,
],
];
const c = [[[[[[[[[[[[[[[]]]]]]]]]]]]]]];
const d = [
  a,
  a,
];
let $puck_2;
if (true) {
  $puck_2 = d;
}
else {
  $puck_2 = [];
};
let $puck_3;
if (false) {
  $puck_3 = d;
}
else {
  $puck_3 = [
    a,
    a,
    a,
  ];
};
const e = [
  $puck_2,
  $puck_3,
];
$puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b, $isTraitObject: true});
$puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: [], $isTraitObject: true});
[
  $puck_1.Some(5),
  $puck_1.Some(5),
  $puck_1.None,
];
$puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: ["b"], $isTraitObject: true}, function (e) {
  return $puck_1.String.contains.call(e, "a");
});
[
  $puck_1.Ok(5),
  $puck_1.Err("hi"),
]
