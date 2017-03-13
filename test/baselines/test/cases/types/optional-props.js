'use strict';
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
var HasOptionalProps = (object) => object;
const a = {
  required: true,
  optional: false,
  optional2: 42,
  optionalOption: $puck_1.Some(5),
};
const b = {required: true};
const c = {
  required: true,
  optional2: 5,
};
let d = HasOptionalProps({
  required: true,
  optional: false,
  optional2: 42,
  optionalOption: $puck_1.Some(5),
});
d = HasOptionalProps({required: true});
d = HasOptionalProps({
  required: true,
  optional2: 5,
});
const e = a.required;
const f = $puck_1.Option.unwrap.call(a.optional);
const g = e === f;
const h = $puck_1.Option.unwrap.call($puck_1.Option.unwrap.call(a.optionalOption)) === $puck_1.Option.unwrap.call(c.optional2);
const i = $puck_1.Option.unwrap.call(d.optional2) === $puck_1.Option.unwrap.call($puck_1.Option.unwrapOr.call(d.optionalOption, $puck_1.Some(1)))
