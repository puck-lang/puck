'use strict';
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
let $puck_2 = $puck_1.IntoIterator["$impl_IntoIterator$lib/stdlib/core.puck:Range"].iter.call({type: '$impl_IntoIterator$lib/stdlib/core.puck:Range', value: $puck_1.Range._new(0, 10), $isTraitObject: true});
let $puck_3 = true;
while ($puck_3) {
  let $puck_5 = $puck_1.Iterator[$puck_2.type].next.call($puck_2);
  if ($puck_5 !== undefined) {
    let i = $puck_5;
    $puck_1.print(i);
  }
  else {
    $puck_3 = false;
  };
};
let $puck_6 = $puck_1.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [
  "Anna",
  "John",
  "May",
], $isTraitObject: true});
let $puck_7 = true;
while ($puck_7) {
  let $puck_9 = $puck_1.Iterator[$puck_6.type].next.call($puck_6);
  if ($puck_9 !== undefined) {
    let name = $puck_9;
    $puck_1.print($puck_1.String.toUpperCase.call(name));
  }
  else {
    $puck_7 = false;
  };
}
