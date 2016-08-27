#!/usr/bin/env node

'use strict';

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
