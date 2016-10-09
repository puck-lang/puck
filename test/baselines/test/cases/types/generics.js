#!/usr/bin/env node

'use strict';

var _core = require('puck-lang/dist/lib/stdlib/core');

var argv = [];
var _arguments = _core.Iterable['$List'].skip.call(_core.Iterable['$List'].skipUntil.call(argv, function (arg) {
  return _core.StringTrait['$String'].contains.call(arg, "puck");
}), 1);
