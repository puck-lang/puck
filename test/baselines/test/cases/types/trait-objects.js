'use strict';
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
var Apple = (object) => object;
var Banana = (object) => object;
var Food = {
eat: function () {
  const self = this;
  $puck_1.print(self.value.name + " is some kind of food");
},
passThrough: function () {
  const self = this;
  return self;
},
asFood: function () {
  const self = this;
  return self;
}
};
Food["$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Apple"] = {
eat: Food.eat,
passThrough: Food.passThrough,
asFood: Food.asFood
};
Food["$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana"] = {
eat: function () {
  const self = this;
  $puck_1.print(self.value.name + " is a banana");
},
passThrough: function () {
  const self = this;
  return self;
},
asFood: function () {
  const self = this;
  return self;
}
};
const apple = {name: "apple"};
const banana = {name: "banana"};
const apple2 = {type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Apple', value: apple, $isTraitObject: true};
const banana2 = {type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana', value: banana, $isTraitObject: true};
Food["$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Apple"].eat.call({type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Apple', value: apple, $isTraitObject: true});
Food["$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana"].eat.call({type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana', value: banana, $isTraitObject: true});
Food[apple2.type].eat.call(apple2);
Food[banana2.type].eat.call(banana2);
let $puck_2 = Food["$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Apple"].passThrough.call({type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Apple', value: apple, $isTraitObject: true})
;
Food[$puck_2.type].eat.call($puck_2);
let $puck_3 = Food["$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana"].passThrough.call({type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana', value: banana, $isTraitObject: true})
;
Food[$puck_3.type].eat.call($puck_3);
let $puck_4 = Food[apple2.type].passThrough.call(apple2)
;
Food[$puck_4.type].eat.call($puck_4);
let $puck_5 = Food[banana2.type].passThrough.call(banana2)
;
Food[$puck_5.type].eat.call($puck_5);
let $puck_6 = Food["$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Apple"].asFood.call({type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Apple', value: apple, $isTraitObject: true})
;
Food[$puck_6.type].eat.call($puck_6);
let $puck_7 = Food["$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana"].asFood.call({type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana', value: banana, $isTraitObject: true})
;
Food[$puck_7.type].eat.call($puck_7);
let $puck_8 = Food[apple2.type].asFood.call(apple2)
;
Food[$puck_8.type].eat.call($puck_8);
let $puck_9 = Food[banana2.type].asFood.call(banana2)
;
Food[$puck_9.type].eat.call($puck_9);
const fruitSallad = {
  apple: apple,
  banana: banana,
  appleFood: {type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Apple', value: apple, $isTraitObject: true},
  bananaFood: {type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana', value: banana, $isTraitObject: true},
  apple2: apple2,
  banana2: banana2,
};
$puck_1.print(fruitSallad.apple.name);
$puck_1.print(fruitSallad.banana.name);
$puck_1.print(fruitSallad.appleFood.value.name);
$puck_1.print(fruitSallad.bananaFood.value.name);
$puck_1.print(fruitSallad.apple2.value.name);
$puck_1.print(fruitSallad.banana2.value.name);
const fruits = [
  {type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Apple', value: apple, $isTraitObject: true},
  {type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana', value: banana, $isTraitObject: true},
  apple2,
  banana2,
];
const fruits2 = [{type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana', value: banana, $isTraitObject: true}];
$puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: fruits, $isTraitObject: true}, function (fruit) {
  return Food[fruit.type].eat.call(fruit);
});
$puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: fruits2, $isTraitObject: true}, function (fruit) {
  return Food[fruit.type].eat.call(fruit);
});
let [apple3, banana3, apple4, banana4, apple5, banana5] = [
  apple,
  banana,
  {type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Apple', value: apple, $isTraitObject: true},
  {type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana', value: banana, $isTraitObject: true},
  apple2,
  banana2,
];
$puck_1.print(apple3.name);
$puck_1.print(banana3.name);
$puck_1.print(apple4.value.name);
$puck_1.print(banana4.value.name);
$puck_1.print(apple5.value.name);
$puck_1.print(banana5.value.name);
function passThroughBanana(banana) {
  return banana;
};
function passThroughFood(food) {
  return food;
};
function bananaToFood(banana) {
  return {type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana', value: banana, $isTraitObject: true};
};
Food["$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Apple"].eat.call({type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Apple', value: fruitSallad.apple, $isTraitObject: true});
Food["$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana"].eat.call({type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana', value: fruitSallad.banana, $isTraitObject: true});
let $puck_10 = fruitSallad.appleFood
;
Food[$puck_10.type].eat.call($puck_10);
let $puck_11 = fruitSallad.bananaFood
;
Food[$puck_11.type].eat.call($puck_11);
let $puck_12 = fruitSallad.apple2
;
Food[$puck_12.type].eat.call($puck_12);
let $puck_13 = fruitSallad.banana2
;
Food[$puck_13.type].eat.call($puck_13);
Food["$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana"].eat.call({type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana', value: passThroughBanana(banana), $isTraitObject: true});
let $puck_14 = passThroughFood({type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Banana', value: banana, $isTraitObject: true})
;
Food[$puck_14.type].eat.call($puck_14);
let $puck_15 = passThroughFood({type: '$impl_test/cases/types/trait-objects.puck:Food$test/cases/types/trait-objects.puck:Apple', value: apple, $isTraitObject: true})
;
Food[$puck_15.type].eat.call($puck_15);
let $puck_16 = passThroughFood(banana2)
;
Food[$puck_16.type].eat.call($puck_16);
let $puck_17 = bananaToFood(banana)
;
Food[$puck_17.type].eat.call($puck_17)
