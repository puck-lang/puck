#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.print = print;

var _js = require('puck-lang/dist/lib/stdlib/js');

function print(message, a, b, c) {
  var args = [message];
  if (c != _js._undefined) {
    args.push(c);
  } else {
    if (b != _js._undefined) {
      args.push(b);
    } else {
      if (a != _js._undefined) {
        args.push(a);
      };
    };
  };
  return _js.console.log.apply(_js.console, args);
}
