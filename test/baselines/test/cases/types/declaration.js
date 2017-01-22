'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.A = undefined;

var _core = require('puck-lang/dist/lib/stdlib/core');

var Foo = function Foo(object) {
  return object;
};
var Generic = function Generic(object) {
  return object;
};
var A = exports.A = function A(object) {
  return object;
};
var Functions = function Functions(object) {
  return object;
};
var NamedTuple = function NamedTuple() {
  for (var _len = arguments.length, members = Array(_len), _key = 0; _key < _len; _key++) {
    members[_key] = arguments[_key];
  }

  return members;
};
var NamedGenericTuple = function NamedGenericTuple() {
  for (var _len2 = arguments.length, members = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    members[_key2] = arguments[_key2];
  }

  return members;
};
var Enum = {
  A: function A() {
    for (var _len3 = arguments.length, members = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      members[_key3] = arguments[_key3];
    }

    return { kind: 'A', value: members };
  },
  B: function B(object) {
    return { kind: 'B', value: object };
  },
  C: { kind: 'C', value: Symbol('C') }
};
var GenericEnum = {
  A: function A() {
    for (var _len4 = arguments.length, members = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      members[_key4] = arguments[_key4];
    }

    return { kind: 'A', value: members };
  },
  B: function B(object) {
    return { kind: 'B', value: object };
  },
  C: { kind: 'C', value: Symbol('C') }
};
