#!/usr/bin/env node

'use strict';

var _core = require('puck-lang/dist/lib/stdlib/core');

var a = 0;
while (a < 10) {
  a += 1;
};
function b() {
  while (a < 20) {
    a += 1;
  };
}
