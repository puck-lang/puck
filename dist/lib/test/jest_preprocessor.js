'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.process = process;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _path = require('path');

var _compiler = require('./../compiler');

var _entities = require('./../entities');

function process(src, path) {
  if (path.endsWith(".puck")) {
    return _core.Result.unwrap.call((0, _compiler.buildString)(src, path, (0, _path.dirname)(path))).babel;
  } else {
    return src;
  };
}
