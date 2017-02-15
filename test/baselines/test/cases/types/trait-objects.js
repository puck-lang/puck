'use strict';

var _core = require('puck-lang/dist/lib/stdlib/core');

var Apple = function Apple(object) {
  return object;
};
var Banana = function Banana(object) {
  return object;
};
var Food = {
  eat: function eat() {
    var self = this;
    return (0, _core.print)(self.value.name + " is some kind of food");
  },
  passThrough: function passThrough() {
    var self = this;
    return self;
  },
  asFood: function asFood() {
    var self = this;
    return self;
  }
};
Food["$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Apple"] = {
  eat: Food.eat,
  passThrough: Food.passThrough,
  asFood: Food.asFood
};
Food["$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana"] = {
  eat: function eat() {
    var self = this;
    return (0, _core.print)(self.value.name + " is a banana");
  },
  passThrough: function passThrough() {
    var self = this;
    return self;
  },
  asFood: function asFood() {
    var self = this;
    return self;
  }
};
var apple = { name: "apple" };
var banana = { name: "banana" };
var apple2 = { type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Apple', value: apple, $isTraitObject: true };
var banana2 = { type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana', value: banana, $isTraitObject: true };
Food["$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Apple"].eat.call({ type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Apple', value: apple, $isTraitObject: true });
Food["$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana"].eat.call({ type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana', value: banana, $isTraitObject: true });
Food[apple2.type].eat.call(apple2);
Food[banana2.type].eat.call(banana2);
var __PUCK__value__1 = Food["$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Apple"].passThrough.call({ type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Apple', value: apple, $isTraitObject: true });
Food[__PUCK__value__1.type].eat.call(__PUCK__value__1);
var __PUCK__value__2 = Food["$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana"].passThrough.call({ type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana', value: banana, $isTraitObject: true });
Food[__PUCK__value__2.type].eat.call(__PUCK__value__2);
var __PUCK__value__3 = Food[apple2.type].passThrough.call(apple2);
Food[__PUCK__value__3.type].eat.call(__PUCK__value__3);
var __PUCK__value__4 = Food[banana2.type].passThrough.call(banana2);
Food[__PUCK__value__4.type].eat.call(__PUCK__value__4);
var __PUCK__value__5 = Food["$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Apple"].asFood.call({ type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Apple', value: apple, $isTraitObject: true });
Food[__PUCK__value__5.type].eat.call(__PUCK__value__5);
var __PUCK__value__6 = Food["$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana"].asFood.call({ type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana', value: banana, $isTraitObject: true });
Food[__PUCK__value__6.type].eat.call(__PUCK__value__6);
var __PUCK__value__7 = Food[apple2.type].asFood.call(apple2);
Food[__PUCK__value__7.type].eat.call(__PUCK__value__7);
var __PUCK__value__8 = Food[banana2.type].asFood.call(banana2);
Food[__PUCK__value__8.type].eat.call(__PUCK__value__8);
var fruitSallad = {
  apple: apple,
  banana: banana,
  appleFood: { type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Apple', value: apple, $isTraitObject: true },
  bananaFood: { type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana', value: banana, $isTraitObject: true },
  apple2: apple2,
  banana2: banana2
};
(0, _core.print)(fruitSallad.apple.name);
(0, _core.print)(fruitSallad.banana.name);
(0, _core.print)(fruitSallad.appleFood.value.name);
(0, _core.print)(fruitSallad.bananaFood.value.name);
(0, _core.print)(fruitSallad.apple2.value.name);
(0, _core.print)(fruitSallad.banana2.value.name);
var fruits = [{ type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Apple', value: apple, $isTraitObject: true }, { type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana', value: banana, $isTraitObject: true }, apple2, banana2];
var fruits2 = [{ type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana', value: banana, $isTraitObject: true }];
_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$lib/stdlib/core.puck:List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$lib/stdlib/core.puck:List', value: fruits, $isTraitObject: true }, function (fruit) {
  return Food[fruit.type].eat.call(fruit);
});
_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$lib/stdlib/core.puck:List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$lib/stdlib/core.puck:List', value: fruits2, $isTraitObject: true }, function (fruit) {
  return Food[fruit.type].eat.call(fruit);
});
var apple3 = apple,
    banana3 = banana,
    apple4 = { type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Apple', value: apple, $isTraitObject: true },
    banana4 = { type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana', value: banana, $isTraitObject: true },
    apple5 = apple2,
    banana5 = banana2;

(0, _core.print)(apple3.name);
(0, _core.print)(banana3.name);
(0, _core.print)(apple4.value.name);
(0, _core.print)(banana4.value.name);
(0, _core.print)(apple5.value.name);
(0, _core.print)(banana5.value.name);
function passThroughBanana(banana) {
  return banana;
};
function passThroughFood(food) {
  return food;
};
function bananaToFood(banana) {
  return { type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana', value: banana, $isTraitObject: true };
};
Food["$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Apple"].eat.call({ type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Apple', value: fruitSallad.apple, $isTraitObject: true });
Food["$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana"].eat.call({ type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana', value: fruitSallad.banana, $isTraitObject: true });
var __PUCK__value__9 = fruitSallad.appleFood;
Food[__PUCK__value__9.type].eat.call(__PUCK__value__9);
var __PUCK__value__10 = fruitSallad.bananaFood;
Food[__PUCK__value__10.type].eat.call(__PUCK__value__10);
var __PUCK__value__11 = fruitSallad.apple2;
Food[__PUCK__value__11.type].eat.call(__PUCK__value__11);
var __PUCK__value__12 = fruitSallad.banana2;
Food[__PUCK__value__12.type].eat.call(__PUCK__value__12);
Food["$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana"].eat.call({ type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana', value: passThroughBanana(banana), $isTraitObject: true });
var __PUCK__value__13 = passThroughFood({ type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana', value: banana, $isTraitObject: true });
Food[__PUCK__value__13.type].eat.call(__PUCK__value__13);
var __PUCK__value__14 = passThroughFood({ type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Apple', value: apple, $isTraitObject: true });
Food[__PUCK__value__14.type].eat.call(__PUCK__value__14);
var __PUCK__value__15 = passThroughFood(banana2);
Food[__PUCK__value__15.type].eat.call(__PUCK__value__15);
var __PUCK__value__16 = bananaToFood(banana);
Food[__PUCK__value__16.type].eat.call(__PUCK__value__16);
