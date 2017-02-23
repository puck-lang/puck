'use strict';

var _core = require('puck-lang/dist/lib/stdlib/core');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};

[].length;
[]["length"];
var prop = "length";
[][prop];
prop[prop];
prop.length;
prop.toUpperCase();
var length = $unwrapTraitObject(prop.length);
var message = _core.Unknown.asString.call(["hello", "world"].map(function (s) {
  return $unwrapTraitObject(s).toUpperCase();
}).join(", "));
var a = {};
a.a = "a";
a["b"] = "b";
