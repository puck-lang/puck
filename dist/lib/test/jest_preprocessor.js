'use strict';
exports.process = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("path");
const $puck_3 = require("./../compiler");
const $puck_4 = require("./../entities");
function process(src, path) {
  if ($puck_1.String.endsWith.call(path, ".puck")) {
    return $puck_1.Option.unwrap.call($puck_1.Result.unwrap.call($puck_3.buildString(src, path, $puck_2.dirname(path))).js);
  }
  else {
    return src;
  };
};
exports.process = process
