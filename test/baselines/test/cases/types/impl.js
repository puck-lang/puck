#!/usr/bin/env node

'use strict';

var _core = require('puck-lang/dist/lib/stdlib/core');

var Type = function Type(object) {
  return object;
};
Type.isAnswer = function isAnswer() {
  var self = this;
  return self.value == 42;
};

var type_ = { value: 42 };
Type.isAnswer.call(type_);
