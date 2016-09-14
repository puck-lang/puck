#!/usr/bin/env node

'use strict';

var _core = require('puck-lang/dist/lib/stdlib/core');

var a = 5;
var a2 = 5;
function b() {
  a + a;
  a + a;
  {
    a: a;
  };
  {
    a: a;
  };
  return { a: a };
}
