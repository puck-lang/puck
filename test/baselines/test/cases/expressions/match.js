'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _core = require('puck-lang/dist/lib/stdlib/core');

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};

var Value = {
  One: function One(object) {
    return { kind: 'One', value: object };
  },
  Two: { kind: 'Two', value: Symbol('Two') },
  Three: { kind: 'Three', value: Symbol('Three') }
};
var _Object = {
  _Object: { kind: '_Object', value: Symbol('_Object') }
};
var __PUCK__value__1 = _core.Option.Some(5);
var __PUCK__value__2 = void 0;
if ($unwrapTraitObject(__PUCK__value__1).kind == "Some") {
  var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__1),
      _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
      num = _$unwrapTraitObject$v[0];

  __PUCK__value__2 = "" + num + "";
} else {
  var __PUCK__value__3 = void 0;
  if ($unwrapTraitObject(__PUCK__value__1).kind == "None") {
    var _undefined = $unwrapTraitObject(__PUCK__value__1);
    __PUCK__value__3 = "nothing";
  };
  __PUCK__value__2 = __PUCK__value__3;
};
(0, _core.print)(__PUCK__value__2);
var __PUCK__value__4 = (0, _core.Some)(5);
var __PUCK__value__5 = void 0;
if ($unwrapTraitObject(__PUCK__value__4).kind == "Some") {
  var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__4),
      _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
      _num = _$unwrapTraitObject2$[0];

  __PUCK__value__5 = "" + _num + "";
} else {
  var __PUCK__value__6 = void 0;
  if (true) {
    var _None = __PUCK__value__4;
    __PUCK__value__6 = "nothing";
  };
  __PUCK__value__5 = __PUCK__value__6;
};
(0, _core.print)(__PUCK__value__5);
var __PUCK__value__7 = _core.Result.Ok(5);
var __PUCK__value__8 = void 0;
if ($unwrapTraitObject(__PUCK__value__7).kind == "Ok") {
  var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__7),
      _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
      _num2 = _$unwrapTraitObject3$[0];

  __PUCK__value__8 = "" + _num2 + "";
} else {
  var __PUCK__value__9 = void 0;
  if ($unwrapTraitObject(__PUCK__value__7).kind == "Err") {
    var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__7),
        _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
        __PUCK__value__10 = _$unwrapTraitObject4$[0];

    __PUCK__value__9 = "error";
  };
  __PUCK__value__8 = __PUCK__value__9;
};
(0, _core.print)(__PUCK__value__8);
var __PUCK__value__11 = _core.Result.Ok(5);
var __PUCK__value__12 = void 0;
if ($unwrapTraitObject(__PUCK__value__11).kind == "Ok") {
  var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__11),
      _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
      _num3 = _$unwrapTraitObject5$[0];

  __PUCK__value__12 = "" + _num3 + "";
} else {
  var __PUCK__value__13 = void 0;
  if (true) {
    var __PUCK__value__14 = __PUCK__value__11;
    __PUCK__value__13 = "error";
  };
  __PUCK__value__12 = __PUCK__value__13;
};
(0, _core.print)(__PUCK__value__12);
var __PUCK__value__15 = _core.Result.Ok(5);
if ($unwrapTraitObject(__PUCK__value__15).kind == "Ok") {
  var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__15),
      _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
      _num4 = _$unwrapTraitObject6$[0];

  _num4;
} else {
  if (true) {
    var __PUCK__value__16 = __PUCK__value__15;
    "error";
  };
};
var __PUCK__value__17 = _core.Option.Some(5);
var __PUCK__value__18 = void 0;
if ($unwrapTraitObject(__PUCK__value__17).kind == "Some") {
  var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__17),
      _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
      _num5 = _$unwrapTraitObject7$[0];

  __PUCK__value__18 = _num5;
} else {
  var __PUCK__value__19 = void 0;
  if ($unwrapTraitObject(__PUCK__value__17).kind == "None") {
    var _undefined2 = $unwrapTraitObject(__PUCK__value__17);
    __PUCK__value__19 = 0;
  };
  __PUCK__value__18 = __PUCK__value__19;
};
(0, _core.print)(__PUCK__value__18);
var __PUCK__value__20 = _core.Option.None;
var __PUCK__value__21 = void 0;
if ($unwrapTraitObject(__PUCK__value__20).kind == "Some") {
  var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__20),
      _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
      __PUCK__value__22 = _$unwrapTraitObject8$[0];

  __PUCK__value__21 = "someting";
} else {
  var __PUCK__value__23 = void 0;
  if ($unwrapTraitObject(__PUCK__value__20).kind == "None") {
    var _undefined3 = $unwrapTraitObject(__PUCK__value__20);
    __PUCK__value__23 = "nothing";
  };
  __PUCK__value__21 = __PUCK__value__23;
};
(0, _core.print)(__PUCK__value__21);
var __PUCK__value__24 = _core.Option.None;
var __PUCK__value__25 = void 0;
if (true) {
  var __PUCK__value__26 = __PUCK__value__24;
  __PUCK__value__25 = "whatever";
};
(0, _core.print)(__PUCK__value__25);
var __PUCK__value__27 = _core.Result.Err(5);
var __PUCK__value__28 = void 0;
if ($unwrapTraitObject(__PUCK__value__27).kind == "Ok") {
  var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__27),
      _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
      __PUCK__value__29 = _$unwrapTraitObject9$[0];

  __PUCK__value__28 = "ok";
} else {
  var __PUCK__value__30 = void 0;
  if ($unwrapTraitObject(__PUCK__value__27).kind == "Err") {
    var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__27),
        _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
        err = _$unwrapTraitObject11[0];

    __PUCK__value__30 = "error: " + err + "";
  };
  __PUCK__value__28 = __PUCK__value__30;
};
(0, _core.print)(__PUCK__value__28);
function sayHello(name) {
  return (0, _core.print)("Hello, " + name + "");
};
var __PUCK__value__31 = _core.Option.Some("World");
if ($unwrapTraitObject(__PUCK__value__31).kind == "Some") {
  var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__31),
      _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12.value, 1),
      name = _$unwrapTraitObject13[0];

  name = _core.String.toUpperCase.call(name);
  sayHello(name);
} else {
  if ($unwrapTraitObject(__PUCK__value__31).kind == "None") {
    var _undefined4 = $unwrapTraitObject(__PUCK__value__31);
    (0, _core.print)("Oh, nothing");
  };
};
var __PUCK__value__32 = Value.One({ value: "World" });
if ($unwrapTraitObject(__PUCK__value__32).kind == "One") {
  var _$unwrapTraitObject14 = $unwrapTraitObject(__PUCK__value__32),
      value = _$unwrapTraitObject14.value.value;

  sayHello(value);
} else {
  if (true) {
    var __PUCK__value__33 = __PUCK__value__32;
    (0, _core.print)("Sorry");
  };
};
var __PUCK__value__34 = Value.Two;
if ($unwrapTraitObject(__PUCK__value__34).kind == "Two") {
  var _undefined5 = $unwrapTraitObject(__PUCK__value__34);
  (0, _core.print)("two");
} else {
  if ($unwrapTraitObject(__PUCK__value__34).kind == "Three") {
    var _undefined6 = $unwrapTraitObject(__PUCK__value__34);
    (0, _core.print)("three");
  } else {
    if (true) {
      var __PUCK__value__35 = __PUCK__value__34;
      (0, _core.print)("Sorry");
    };
  };
};
var __PUCK__value__36 = Value.Three;
if ($unwrapTraitObject(__PUCK__value__36).kind == "Two") {
  var _undefined7 = $unwrapTraitObject(__PUCK__value__36);
  (0, _core.print)("two");
} else {
  if ($unwrapTraitObject(__PUCK__value__36).kind == "Three") {
    var _undefined8 = $unwrapTraitObject(__PUCK__value__36);
    (0, _core.print)("three");
  } else {
    if (true) {
      var __PUCK__value__37 = __PUCK__value__36;
      (0, _core.print)("Sorry");
    };
  };
};
function func() {
  return (0, _core.Err)(Value.Two);
};
var __PUCK__value__38 = func();
if ($unwrapTraitObject(__PUCK__value__38).kind == "Ok") {
  var _$unwrapTraitObject15 = $unwrapTraitObject(__PUCK__value__38),
      _$unwrapTraitObject16 = _slicedToArray(_$unwrapTraitObject15.value, 1),
      __PUCK__value__39 = _$unwrapTraitObject16[0];

  (0, _core.print)("ok");
} else {
  if ($unwrapTraitObject(__PUCK__value__38).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__38).value)[0]).kind == "One") {
    var _$unwrapTraitObject17 = $unwrapTraitObject(__PUCK__value__38),
        _$unwrapTraitObject18 = _slicedToArray(_$unwrapTraitObject17.value, 1),
        _value = _$unwrapTraitObject18[0].value.value;

    sayHello(_value);
  } else {
    if ($unwrapTraitObject(__PUCK__value__38).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__38).value)[0]).kind == "Two") {
      var _$unwrapTraitObject19 = $unwrapTraitObject(__PUCK__value__38),
          _$unwrapTraitObject20 = _toArray(_$unwrapTraitObject19.value);

      (0, _core.print)("two");
    } else {
      if ($unwrapTraitObject(__PUCK__value__38).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__38).value)[0]).kind == "Three") {
        var _$unwrapTraitObject21 = $unwrapTraitObject(__PUCK__value__38),
            _$unwrapTraitObject22 = _toArray(_$unwrapTraitObject21.value);

        (0, _core.print)("three");
      };
    };
  };
};
var __PUCK__value__40 = _core.Option.Some(_core.Option.Some(5));
if ($unwrapTraitObject(__PUCK__value__40).kind == "Some") {
  var _$unwrapTraitObject23 = $unwrapTraitObject(__PUCK__value__40),
      _$unwrapTraitObject24 = _slicedToArray(_$unwrapTraitObject23.value, 1),
      inner = _$unwrapTraitObject24[0];

  var __PUCK__value__41 = inner;
  if ($unwrapTraitObject(__PUCK__value__41).kind == "Some") {
    var _$unwrapTraitObject25 = $unwrapTraitObject(__PUCK__value__41),
        _$unwrapTraitObject26 = _slicedToArray(_$unwrapTraitObject25.value, 1),
        _value2 = _$unwrapTraitObject26[0];

    _value2;
  } else {
    if ($unwrapTraitObject(__PUCK__value__41).kind == "None") {
      var _undefined9 = $unwrapTraitObject(__PUCK__value__41);
      0;
    };
  };
} else {
  if ($unwrapTraitObject(__PUCK__value__40).kind == "None") {
    var _undefined10 = $unwrapTraitObject(__PUCK__value__40);
    0;
  };
};
var __PUCK__value__42 = _Object._Object;
if ($unwrapTraitObject(__PUCK__value__42).kind == "_Object") {
  var _undefined11 = $unwrapTraitObject(__PUCK__value__42);
  "Object";
};
function func2(error) {
  if (error) {
    return (0, _core.Err)(5);
  } else {
    return (0, _core.Ok)("");
  };
};
var __PUCK__value__43 = func2(false);
if ($unwrapTraitObject(__PUCK__value__43).kind == "Ok") {
  var _$unwrapTraitObject27 = $unwrapTraitObject(__PUCK__value__43),
      _$unwrapTraitObject28 = _slicedToArray(_$unwrapTraitObject27.value, 1),
      _value3 = _$unwrapTraitObject28[0];

  _core.String.toUpperCase.call(_value3);
} else {
  if ($unwrapTraitObject(__PUCK__value__43).kind == "Err") {
    var _$unwrapTraitObject29 = $unwrapTraitObject(__PUCK__value__43),
        _$unwrapTraitObject30 = _slicedToArray(_$unwrapTraitObject29.value, 1),
        _err = _$unwrapTraitObject30[0];

    _core.Num.round.call(_err);
  };
}
