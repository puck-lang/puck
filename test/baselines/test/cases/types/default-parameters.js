'use strict';

var _core = require('puck-lang/dist/lib/stdlib/core');

var Default = function Default(object) {
  return object;
};
var DefaultTrait = {
  method: function method() {}
};
DefaultTrait['$Default<Num>'] = {
  method: DefaultTrait.method
};
var a = { value: 5 };
DefaultTrait['$Default<Num>'].method.call({ type: '$Default<Num>', value: a, $isTraitObject: true });
