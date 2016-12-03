#!/usr/bin/env node

'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _core = require('puck-lang/dist/lib/stdlib/core');

var a = 1;
var b = 2;
var c = 3;
var _ref = [2, 3];
var _ref2 = [2, 3, 4, 5];
var d = _ref2[1];
var e = _ref2[3];
var _ref3 = [[2, 3], 4, 5];

var _ref3$ = _slicedToArray(_ref3[0], 2);

var f = _ref3$[0];
var g = _ref3$[1];
var h = _ref3[2];

a = 2;
