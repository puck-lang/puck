'use strict';
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
var User = (object) => object;
var ExpectationObject = (object) => object;
const argv = [];
let $puck_2 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].skipUntil.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: argv, $isTraitObject: true}, function (arg) {
  return $puck_1.String.contains.call(arg, "puck");
})
;
const _arguments = $puck_1.Iterable[$puck_2.type].skip.call($puck_2, 1);
const user = $puck_1.Option.Some({name: "Anna"});
const name = $puck_1.Option.map.call(user, function (user) {
  return user.name;
});
const user2 = $puck_1.Option.Some({name: "Anna"});
const name2 = $puck_1.Option.map.call(user2, function (user) {
  return user.name;
});
const name3 = $puck_1.Option.unwrapOr.call(name2, "Guest");
const containsGuest = $puck_1.String.contains.call(name3, "Guest");
function expect(value) {
  return {toEqual: function ($puck_3) {}};
};
expect($puck_1.Option.andThen.call($puck_1.Some(1), function (value) {
  return $puck_1.Some(value + value);
})).toEqual($puck_1.Some(2))
