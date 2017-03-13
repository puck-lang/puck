'use strict';
exports.foo = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const entities = require("puck-lang/dist/lib/entities");
const $puck_3 = require("module");
const $puck_4 = require("./export");
const e = require("./export");
const $puck_5 = require("./export");
const re = require("./reexport");
const $puck_6 = require("./reexport");
var Type = (member) => member;
var Trait = {
inner: function () {
  const self = this;
  return self;
}
};
Trait["$impl_test/cases/modules/import.puck:Trait$test/cases/modules/export.puck:Type"] = {
inner: Trait.inner
};
$puck_4.Trait["$impl_test/cases/modules/export.puck:Trait$test/cases/modules/import.puck:Type"] = {
_static: $puck_4.Trait._static,
implemented: function () {},
_default: $puck_4.Trait._default
};
var foo = exports.foo = e.b + $puck_3.a + $puck_5.b + $puck_3.b;
const q = "not imported";
const f = 1;
const h = $puck_4.Type(2);
$puck_6.Trait["$impl_test/cases/modules/export.puck:Trait$test/cases/modules/export.puck:Type"]._default.call({type: '$impl_test/cases/modules/export.puck:Trait$test/cases/modules/export.puck:Type', value: $puck_6.Trait._static(), $isTraitObject: true});
$puck_6.Trait["$impl_test/cases/modules/export.puck:Trait$test/cases/modules/export.puck:Type"]._default.call({type: '$impl_test/cases/modules/export.puck:Trait$test/cases/modules/export.puck:Type', value: f, $isTraitObject: true});
$puck_6.Trait["$impl_test/cases/modules/export.puck:Trait$test/cases/modules/export.puck:Type"].implemented.call({type: '$impl_test/cases/modules/export.puck:Trait$test/cases/modules/export.puck:Type', value: f, $isTraitObject: true});
$puck_5.OtherTrait["$impl_test/cases/modules/export.puck:OtherTrait$test/cases/modules/export.puck:Type"].other.call({type: '$impl_test/cases/modules/export.puck:OtherTrait$test/cases/modules/export.puck:Type', value: f, $isTraitObject: true});
const i = $puck_4.Type(3);
const j = e.Enum.A;
const k = $puck_6.Type(3);
const l = $puck_6.Type(3);
const m = re.Type(3);
const n = re.exportModule.Type(3)
