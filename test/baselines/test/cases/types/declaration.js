'use strict';
exports.A = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
var Foo = (object) => object;
var Generic = (object) => object;
var A = exports.A = (object) => object;
var Functions = (object) => object;
var NamedTuple = (...members) => members;
var NamedGenericTuple = (...members) => members;
var Record = (object) => object;
var Tuple = (...members) => members;
var RecordSpread = (object) => object;
var RecordRewrite = (object) => object;
var Enum = {
A: (...members) => ({kind: 'A', value: members}),
B: (object) => ({kind: 'B', value: object}),
C: {kind: 'C', value: Symbol('C')},
};
var GenericEnum = {
A: (...members) => ({kind: 'A', value: members}),
B: (object) => ({kind: 'B', value: object}),
C: {kind: 'C', value: Symbol('C')},
};
const record = Record({name: "Puck"});
const tuple = Tuple(42, true)
