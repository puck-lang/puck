'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.EmptyType = exports.FunctionsType = exports.GenericType = exports.Empty = exports.Functions = exports.SelfAware = exports.Generic = exports.GenericSelf = exports.MoreFunctions = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
var EmptyType = exports.EmptyType = (object) => object;
var FunctionsType = exports.FunctionsType = (object) => object;
var GenericType = exports.GenericType = (object) => object;
var Empty = exports.Empty = {

};
var Functions = exports.Functions = {
withBody: function (a) {
  const self = this;
  const b = a;
  return b;
}
};
var SelfAware = exports.SelfAware = {
_static: function () {
  return 5;
},
withImmutableSelf: function (a) {
  const self = this;
  return a;
},
withMutableSelf: function () {
  let self = this;
  return self;
}
};
var Generic = exports.Generic = {

};
var GenericSelf = exports.GenericSelf = {
genericSelf2: function (a) {
  const self = this;
  return $unwrapTraitObject(GenericSelf[self.type].genericSelf.call(self, a));
}
};
var MoreFunctions = exports.MoreFunctions = {
doubleNoBody: function () {
  const self = this;
  return MoreFunctions[self.type].noBody.call(self) * 2;
},
doubleWithBody: function (a) {
  const self = this;
  return (MoreFunctions[self.type].withBody.call(self, a) + MoreFunctions[self.type].withBody.call(self, a));
}
};
Empty["$impl_test/cases/types/traits.puck:Empty$test/cases/types/traits.puck:EmptyType"] = {

};
Functions["$impl_test/cases/types/traits.puck:Functions$test/cases/types/traits.puck:EmptyType"] = {
noBody: function () {
  const self = this;
  return 5;
},
withBody: Functions.withBody
};
Functions["$impl_test/cases/types/traits.puck:Functions$test/cases/types/traits.puck:FunctionsType"] = {
noBody: function () {
  const self = this;
  return 5;
},
withBody: function (a) {
  const self = this;
  return self.value.name;
}
};
Generic["$impl_test/cases/types/traits.puck:Generic$test/cases/types/traits.puck:GenericType"] = {
generic: function (a) {
  const self = this;
  return $unwrapTraitObject(a);
}
};
GenericSelf["$impl_test/cases/types/traits.puck:GenericSelf$test/cases/types/traits.puck:GenericType"] = {
genericSelf: function (a) {
  const self = this;
  return a.value;
},
genericSelf2: GenericSelf.genericSelf2
};
Generic["$impl_test/cases/types/traits.puck:Generic$test/cases/types/traits.puck:GenericType$1"] = {
generic: function (a) {
  const self = this;
  return a + a;
}
};
SelfAware["$impl_test/cases/types/traits.puck:SelfAware$test/cases/types/traits.puck:FunctionsType"] = {
_static: SelfAware._static,
withImmutableSelf: SelfAware.withImmutableSelf,
withMutableSelf: SelfAware.withMutableSelf
};
Functions["$impl_test/cases/types/traits.puck:MoreFunctions$test/cases/types/traits.puck:FunctionsType"] = MoreFunctions["$impl_test/cases/types/traits.puck:MoreFunctions$test/cases/types/traits.puck:FunctionsType"] = {
noBody: Functions.noBody,
withBody: Functions.withBody,
doubleNoBody: MoreFunctions.doubleNoBody,
doubleWithBody: MoreFunctions.doubleWithBody
};
Functions["$impl_test/cases/types/traits.puck:Functions$test/cases/types/traits.puck:EmptyType"].noBody.call({type: '$impl_test/cases/types/traits.puck:Functions$test/cases/types/traits.puck:EmptyType', value: EmptyType({}), $isTraitObject: true});
let func = {name: "func"};
Functions["$impl_test/cases/types/traits.puck:Functions$test/cases/types/traits.puck:FunctionsType"].withBody.call({type: '$impl_test/cases/types/traits.puck:Functions$test/cases/types/traits.puck:FunctionsType', value: func, $isTraitObject: true}, "body");
let mutFunc = func;
SelfAware["$impl_test/cases/types/traits.puck:SelfAware$test/cases/types/traits.puck:FunctionsType"].withMutableSelf.call({type: '$impl_test/cases/types/traits.puck:SelfAware$test/cases/types/traits.puck:FunctionsType', value: mutFunc, $isTraitObject: true});
const genericNum = {};
Generic["$impl_test/cases/types/traits.puck:Generic$test/cases/types/traits.puck:GenericType"].generic.call({type: '$impl_test/cases/types/traits.puck:Generic$test/cases/types/traits.puck:GenericType', value: genericNum, $isTraitObject: true}, 5);
const genericString = {};
Generic["$impl_test/cases/types/traits.puck:Generic$test/cases/types/traits.puck:GenericType$1"].generic.call({type: '$impl_test/cases/types/traits.puck:Generic$test/cases/types/traits.puck:GenericType$1', value: genericString, $isTraitObject: true}, "hello");
Generic["$impl_test/cases/types/traits.puck:Generic$test/cases/types/traits.puck:GenericType"].generic.call({type: '$impl_test/cases/types/traits.puck:Generic$test/cases/types/traits.puck:GenericType', value: genericNum, $isTraitObject: true}, 5);
Generic["$impl_test/cases/types/traits.puck:Generic$test/cases/types/traits.puck:GenericType$1"].generic.call({type: '$impl_test/cases/types/traits.puck:Generic$test/cases/types/traits.puck:GenericType$1', value: genericString, $isTraitObject: true}, "hello");
func = {name: "func"};
Functions["$impl_test/cases/types/traits.puck:Functions$test/cases/types/traits.puck:FunctionsType"].withBody.call({type: '$impl_test/cases/types/traits.puck:Functions$test/cases/types/traits.puck:FunctionsType', value: func, $isTraitObject: true}, "body");
MoreFunctions["$impl_test/cases/types/traits.puck:MoreFunctions$test/cases/types/traits.puck:FunctionsType"].doubleWithBody.call({type: '$impl_test/cases/types/traits.puck:MoreFunctions$test/cases/types/traits.puck:FunctionsType', value: func, $isTraitObject: true}, "body");
func = {type: '$impl_test/cases/types/traits.puck:MoreFunctions$test/cases/types/traits.puck:FunctionsType', value: func, $isTraitObject: true};
MoreFunctions[func.type].withBody.call(func, "body");
MoreFunctions[func.type].doubleWithBody.call(func, "body");
MoreFunctions[func.type].doubleNoBody.call(func);
MoreFunctions[func.type].doubleWithBody.call(func, "body")
