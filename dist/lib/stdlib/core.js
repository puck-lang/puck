#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.print = print;

var _js = require('puck-lang/dist/lib/stdlib/js');

function print(message, a, b, c) {
  var args = [message];
  if (a != _js._undefined) {
    args.push(a);
  };
  if (b != _js._undefined) {
    args[2] = b;
  };
  if (c != _js._undefined) {
    args[3] = c;
  };
  return _js.console.log.apply(_js.console, args);
}
