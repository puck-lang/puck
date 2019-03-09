'use strict';
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
var TypeFoo = (object) => object;
var TypeBar = (object) => object;
var TraitFoo = {
a: function () {}
};
var TraitBar = {

};
var TraitFooBar = {
c: function () {
  const self = this;
  TraitFooBar[self.type].a.call(self);
  TraitFooBar[self.type].a.call(self);
}
};
TraitFoo["$impl_test/cases/types/impl.puck:TraitFoo$test/cases/types/impl.puck:TypeFoo"] = {
a: function () {}
};
TraitFoo["$impl_test/cases/types/impl.puck:TraitFoo$test/cases/types/impl.puck:TypeBar"] = {
a: TraitFoo.a
};
TraitBar["$impl_test/cases/types/impl.puck:TraitBar$test/cases/types/impl.puck:TypeBar"] = {
b: function () {
  const self = this;
  TraitFoo["$impl_test/cases/types/impl.puck:TraitFoo$test/cases/types/impl.puck:TypeBar"].a.call({type: '$impl_test/cases/types/impl.puck:TraitFoo$test/cases/types/impl.puck:TypeBar', value: self.value, $isTraitObject: true});
  TraitFoo["$impl_test/cases/types/impl.puck:TraitFoo$test/cases/types/impl.puck:TypeBar"].a.call({type: '$impl_test/cases/types/impl.puck:TraitFoo$test/cases/types/impl.puck:TypeBar', value: self.value, $isTraitObject: true});
}
};
TraitFoo["$impl_test/cases/types/impl.puck:TraitFooBar$test/cases/types/impl.puck:TypeBar"] = TraitFooBar["$impl_test/cases/types/impl.puck:TraitFooBar$test/cases/types/impl.puck:TypeBar"] = {
a: TraitFoo.a,
c: TraitFooBar.c
};
TypeFoo.isAnswer = function () {
  const self = this;
  return self.value === 42;
};
TypeFoo.isNegative = function (other) {
  const self = this;
  return {value: self.value + other.value};
};
TypeFoo.isAnswer2 = function () {
  const self = this;
  return TypeFoo.isAnswer.call(self);
};
const type_ = {value: 42};
TypeFoo.isAnswer.call(type_);
const bar = TypeBar({});
TraitBar["$impl_test/cases/types/impl.puck:TraitBar$test/cases/types/impl.puck:TypeBar"].b.call({type: '$impl_test/cases/types/impl.puck:TraitBar$test/cases/types/impl.puck:TypeBar', value: bar, $isTraitObject: true});
TraitFooBar["$impl_test/cases/types/impl.puck:TraitFooBar$test/cases/types/impl.puck:TypeBar"].c.call({type: '$impl_test/cases/types/impl.puck:TraitFooBar$test/cases/types/impl.puck:TypeBar', value: bar, $isTraitObject: true})
