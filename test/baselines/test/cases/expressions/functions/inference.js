'use strict';

var _core = require('puck-lang/dist/lib/stdlib/core');

function a(b) {};
a(function (c) {
  return _core.String.contains.call(c, "text");
});
