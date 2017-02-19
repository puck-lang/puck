'use strict';

var _core = require('puck-lang/dist/lib/stdlib/core');

var User = function User(object) {
  return object;
};
var ExpectationObject = function ExpectationObject(object) {
  return object;
};
var argv = [];
var __PUCK__value__1 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].skipUntil.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: argv, $isTraitObject: true }, function (arg) {
  return _core.String.contains.call(arg, "puck");
});
var _arguments = _core.Iterable[__PUCK__value__1.type].skip.call(__PUCK__value__1, 1);
var user = _core.Option.Some({ name: "Anna" });
var name = _core.Option.map.call(user, function (user) {
  return user.name;
});
var user2 = _core.Option.Some({ name: "Anna" });
var name2 = _core.Option.map.call(user2, function (user) {
  return user.name;
});
var name3 = _core.Option.unwrapOr.call(name2, "Guest");
var containsGuest = _core.String.contains.call(name3, "Guest");
function expect(value) {
  return { toEqual: function toEqual(__PUCK__value__2) {} };
};
expect(_core.Option.andThen.call((0, _core.Some)(1), function (value) {
  return (0, _core.Some)(value + value);
})).toEqual((0, _core.Some)(2));
