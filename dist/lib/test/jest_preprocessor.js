'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.process = process;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _compiler = require('./../compiler.js');

var _entities = require('./../entities.js');

function process(src, path) {
  if (path.endsWith(".puck")) {
    var r = (0, _compiler.buildString)(src, path);
    return _core.Result.unwrap.call(r).babel;
  } else {
    return src;
  };
}
