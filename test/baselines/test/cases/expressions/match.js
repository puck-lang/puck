#!/usr/bin/env node

'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _core = require('puck-lang/dist/lib/stdlib/core');

var __PUCK__value__1 = _core.Maybe.Just(5);
var __PUCK__value__2 = __PUCK__value__1;
var __PUCK__value__3 = void 0;
if (__PUCK__value__2.kind == "Just") {
  var _PUCK__value__2$valu = _slicedToArray(__PUCK__value__2.value, 1);

  var num = _PUCK__value__2$valu[0];

  __PUCK__value__3 = "" + num + "";
} else {
  var __PUCK__value__4 = __PUCK__value__1;
  var __PUCK__value__5 = void 0;
  if (__PUCK__value__4.kind == "Nothing") {
    var _undefined = __PUCK__value__4.value;
    __PUCK__value__5 = "nothing";
  };
  __PUCK__value__3 = __PUCK__value__5;
};
(0, _core.print)(__PUCK__value__3);
var __PUCK__value__6 = _core.Result.Ok(5);
var __PUCK__value__7 = __PUCK__value__6;
var __PUCK__value__8 = void 0;
if (__PUCK__value__7.kind == "Ok") {
  var _PUCK__value__7$valu = _slicedToArray(__PUCK__value__7.value, 1);

  var _num = _PUCK__value__7$valu[0];

  __PUCK__value__8 = "" + _num + "";
} else {
  var __PUCK__value__9 = __PUCK__value__6;
  var __PUCK__value__10 = void 0;
  if (__PUCK__value__9.kind == "Err") {
    var _PUCK__value__9$valu = _slicedToArray(__PUCK__value__9.value, 1);

    var __PUCK__value__11 = _PUCK__value__9$valu[0];

    __PUCK__value__10 = "error";
  };
  __PUCK__value__8 = __PUCK__value__10;
};
(0, _core.print)(__PUCK__value__8);
var __PUCK__value__12 = _core.Result.Ok(5);
var __PUCK__value__13 = __PUCK__value__12;
var __PUCK__value__14 = void 0;
if (__PUCK__value__13.kind == "Ok") {
  var _PUCK__value__13$val = _slicedToArray(__PUCK__value__13.value, 1);

  var _num2 = _PUCK__value__13$val[0];

  __PUCK__value__14 = "" + _num2 + "";
} else {
  var __PUCK__value__15 = __PUCK__value__12;
  var __PUCK__value__16 = void 0;
  if (true) {
    var __PUCK__value__17 = __PUCK__value__15;
    __PUCK__value__16 = "error";
  };
  __PUCK__value__14 = __PUCK__value__16;
};
(0, _core.print)(__PUCK__value__14);
var __PUCK__value__18 = _core.Maybe.Just(5);
var __PUCK__value__19 = __PUCK__value__18;
var __PUCK__value__20 = void 0;
if (__PUCK__value__19.kind == "Just") {
  var _PUCK__value__19$val = _slicedToArray(__PUCK__value__19.value, 1);

  var _num3 = _PUCK__value__19$val[0];

  __PUCK__value__20 = _num3;
} else {
  var __PUCK__value__21 = __PUCK__value__18;
  var __PUCK__value__22 = void 0;
  if (__PUCK__value__21.kind == "Nothing") {
    var _undefined2 = __PUCK__value__21.value;
    __PUCK__value__22 = 0;
  };
  __PUCK__value__20 = __PUCK__value__22;
};
(0, _core.print)(__PUCK__value__20);
var __PUCK__value__23 = _core.Maybe.Nothing;
var __PUCK__value__24 = __PUCK__value__23;
var __PUCK__value__25 = void 0;
if (__PUCK__value__24.kind == "Just") {
  var _PUCK__value__24$val = _slicedToArray(__PUCK__value__24.value, 1);

  var __PUCK__value__26 = _PUCK__value__24$val[0];

  __PUCK__value__25 = "someting";
} else {
  var __PUCK__value__27 = __PUCK__value__23;
  var __PUCK__value__28 = void 0;
  if (__PUCK__value__27.kind == "Nothing") {
    var _undefined3 = __PUCK__value__27.value;
    __PUCK__value__28 = "nothing";
  };
  __PUCK__value__25 = __PUCK__value__28;
};
(0, _core.print)(__PUCK__value__25);
var __PUCK__value__29 = _core.Maybe.Nothing;
var __PUCK__value__30 = __PUCK__value__29;
var __PUCK__value__31 = void 0;
if (true) {
  var __PUCK__value__32 = __PUCK__value__30;
  __PUCK__value__31 = "whatever";
};
(0, _core.print)(__PUCK__value__31);
var __PUCK__value__33 = _core.Result.Err(5);
var __PUCK__value__34 = __PUCK__value__33;
var __PUCK__value__35 = void 0;
if (__PUCK__value__34.kind == "Ok") {
  var _PUCK__value__34$val = _slicedToArray(__PUCK__value__34.value, 1);

  var __PUCK__value__36 = _PUCK__value__34$val[0];

  __PUCK__value__35 = "ok";
} else {
  var __PUCK__value__37 = __PUCK__value__33;
  var __PUCK__value__38 = void 0;
  if (__PUCK__value__37.kind == "Err") {
    var _PUCK__value__37$val = _slicedToArray(__PUCK__value__37.value, 1);

    var err = _PUCK__value__37$val[0];

    __PUCK__value__38 = "error: " + err + "";
  };
  __PUCK__value__35 = __PUCK__value__38;
};
(0, _core.print)(__PUCK__value__35);
function sayHello(name) {
  return (0, _core.print)("Hello, " + name + "");
};
var __PUCK__value__39 = _core.Maybe.Just("World");
var __PUCK__value__40 = __PUCK__value__39;
if (__PUCK__value__40.kind == "Just") {
  var _PUCK__value__40$val = _slicedToArray(__PUCK__value__40.value, 1);

  var name = _PUCK__value__40$val[0];

  sayHello(name);
} else {
  var __PUCK__value__41 = __PUCK__value__39;
  if (__PUCK__value__41.kind == "Nothing") {
    var _undefined4 = __PUCK__value__41.value;
    (0, _core.print)("Oh, nothing");
  };
};
var Value = {
  One: function One(object) {
    return { kind: 'One', value: object };
  },
  Two: { kind: 'Two', value: Symbol('Two') },
  Three: { kind: 'Three', value: Symbol('Three') }
};
var __PUCK__value__42 = Value.One({ value: "World" });
var __PUCK__value__43 = __PUCK__value__42;
if (__PUCK__value__43.kind == "One") {
  var value = __PUCK__value__43.value.value;

  sayHello(value);
} else {
  var __PUCK__value__44 = __PUCK__value__42;
  if (true) {
    var __PUCK__value__45 = __PUCK__value__44;
    (0, _core.print)("Sorry");
  };
};
var __PUCK__value__46 = Value.Two;
var __PUCK__value__47 = __PUCK__value__46;
if (__PUCK__value__47.kind == "Two") {
  var _undefined5 = __PUCK__value__47.value;
  (0, _core.print)("two");
} else {
  var __PUCK__value__48 = __PUCK__value__46;
  if (__PUCK__value__48.kind == "Three") {
    var _undefined6 = __PUCK__value__48.value;
    (0, _core.print)("three");
  } else {
    var __PUCK__value__49 = __PUCK__value__46;
    if (true) {
      var __PUCK__value__50 = __PUCK__value__49;
      (0, _core.print)("Sorry");
    };
  };
};
var __PUCK__value__51 = Value.Three;
var __PUCK__value__52 = __PUCK__value__51;
if (__PUCK__value__52.kind == "Two") {
  var _undefined7 = __PUCK__value__52.value;
  (0, _core.print)("two");
} else {
  var __PUCK__value__53 = __PUCK__value__51;
  if (__PUCK__value__53.kind == "Three") {
    var _undefined8 = __PUCK__value__53.value;
    (0, _core.print)("three");
  } else {
    var __PUCK__value__54 = __PUCK__value__51;
    if (true) {
      var __PUCK__value__55 = __PUCK__value__54;
      (0, _core.print)("Sorry");
    };
  };
}
