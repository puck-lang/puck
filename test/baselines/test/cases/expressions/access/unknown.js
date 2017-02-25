'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
[].length;
[]["length"];
const prop = "length";
[][prop];
prop[prop];
prop.length;
prop.toUpperCase();
const length = $unwrapTraitObject(prop.length);
const message = $puck_1.Unknown.asString.call([
  "hello",
  "world",
].map(function (s) {
  return $unwrapTraitObject(s).toUpperCase();
}).join(", "));
const a = {};
a.a = "a";
a["b"] = "b"
