'use strict';

var _core = require('puck-lang/dist/lib/stdlib/core');

var Default = function Default(object) {
  return object;
};
var DefaultTrait = {
  method: function method() {}
};
DefaultTrait["$impl_test/cases/types/default-parameters.puck:DefaultTrait$test/cases/types/default-parameters.puck:Default"] = {
  method: DefaultTrait.method
};
var a = { value: 5 };
DefaultTrait["$impl_test/cases/types/default-parameters.puck:DefaultTrait$test/cases/types/default-parameters.puck:Default"].method.call({ type: '$impl_test/cases/types/default-parameters.puck:DefaultTrait$test/cases/types/default-parameters.puck:Default', value: a, $isTraitObject: true });
