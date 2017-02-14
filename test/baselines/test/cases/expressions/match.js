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
var __PUCK__value__2 = __PUCK__value__1;
var __PUCK__value__3 = void 0;
if ($unwrapTraitObject(__PUCK__value__2).kind == "Some") {
  var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__2),
      _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
      num = _$unwrapTraitObject$v[0];

  __PUCK__value__3 = "" + num + "";
} else {
  var __PUCK__value__4 = __PUCK__value__1;
  var __PUCK__value__5 = void 0;
  if ($unwrapTraitObject(__PUCK__value__4).kind == "None") {
    var _undefined = $unwrapTraitObject(__PUCK__value__4);
    __PUCK__value__5 = "nothing";
  };
  __PUCK__value__3 = __PUCK__value__5;
};
(0, _core.print)(__PUCK__value__3);
var __PUCK__value__6 = (0, _core.Some)(5);
var __PUCK__value__7 = __PUCK__value__6;
var __PUCK__value__8 = void 0;
if ($unwrapTraitObject(__PUCK__value__7).kind == "Some") {
  var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__7),
      _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
      _num = _$unwrapTraitObject2$[0];

  __PUCK__value__8 = "" + _num + "";
} else {
  var __PUCK__value__9 = __PUCK__value__6;
  var __PUCK__value__10 = void 0;
  if (true) {
    var _None = __PUCK__value__9;
    __PUCK__value__10 = "nothing";
  };
  __PUCK__value__8 = __PUCK__value__10;
};
(0, _core.print)(__PUCK__value__8);
var __PUCK__value__11 = _core.Result.Ok(5);
var __PUCK__value__12 = __PUCK__value__11;
var __PUCK__value__13 = void 0;
if ($unwrapTraitObject(__PUCK__value__12).kind == "Ok") {
  var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__12),
      _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
      _num2 = _$unwrapTraitObject3$[0];

  __PUCK__value__13 = "" + _num2 + "";
} else {
  var __PUCK__value__14 = __PUCK__value__11;
  var __PUCK__value__15 = void 0;
  if ($unwrapTraitObject(__PUCK__value__14).kind == "Err") {
    var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__14),
        _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
        __PUCK__value__16 = _$unwrapTraitObject4$[0];

    __PUCK__value__15 = "error";
  };
  __PUCK__value__13 = __PUCK__value__15;
};
(0, _core.print)(__PUCK__value__13);
var __PUCK__value__17 = _core.Result.Ok(5);
var __PUCK__value__18 = __PUCK__value__17;
var __PUCK__value__19 = void 0;
if ($unwrapTraitObject(__PUCK__value__18).kind == "Ok") {
  var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__18),
      _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
      _num3 = _$unwrapTraitObject5$[0];

  __PUCK__value__19 = "" + _num3 + "";
} else {
  var __PUCK__value__20 = __PUCK__value__17;
  var __PUCK__value__21 = void 0;
  if (true) {
    var __PUCK__value__22 = __PUCK__value__20;
    __PUCK__value__21 = "error";
  };
  __PUCK__value__19 = __PUCK__value__21;
};
(0, _core.print)(__PUCK__value__19);
var __PUCK__value__23 = _core.Result.Ok(5);
var __PUCK__value__24 = __PUCK__value__23;
if ($unwrapTraitObject(__PUCK__value__24).kind == "Ok") {
  var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__24),
      _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
      _num4 = _$unwrapTraitObject6$[0];

  _num4;
} else {
  var __PUCK__value__25 = __PUCK__value__23;
  if (true) {
    var __PUCK__value__26 = __PUCK__value__25;
    "error";
  };
};
var __PUCK__value__27 = _core.Option.Some(5);
var __PUCK__value__28 = __PUCK__value__27;
var __PUCK__value__29 = void 0;
if ($unwrapTraitObject(__PUCK__value__28).kind == "Some") {
  var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__28),
      _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
      _num5 = _$unwrapTraitObject7$[0];

  __PUCK__value__29 = _num5;
} else {
  var __PUCK__value__30 = __PUCK__value__27;
  var __PUCK__value__31 = void 0;
  if ($unwrapTraitObject(__PUCK__value__30).kind == "None") {
    var _undefined2 = $unwrapTraitObject(__PUCK__value__30);
    __PUCK__value__31 = 0;
  };
  __PUCK__value__29 = __PUCK__value__31;
};
(0, _core.print)(__PUCK__value__29);
var __PUCK__value__32 = _core.Option.None;
var __PUCK__value__33 = __PUCK__value__32;
var __PUCK__value__34 = void 0;
if ($unwrapTraitObject(__PUCK__value__33).kind == "Some") {
  var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__33),
      _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
      __PUCK__value__35 = _$unwrapTraitObject8$[0];

  __PUCK__value__34 = "someting";
} else {
  var __PUCK__value__36 = __PUCK__value__32;
  var __PUCK__value__37 = void 0;
  if ($unwrapTraitObject(__PUCK__value__36).kind == "None") {
    var _undefined3 = $unwrapTraitObject(__PUCK__value__36);
    __PUCK__value__37 = "nothing";
  };
  __PUCK__value__34 = __PUCK__value__37;
};
(0, _core.print)(__PUCK__value__34);
var __PUCK__value__38 = _core.Option.None;
var __PUCK__value__39 = __PUCK__value__38;
var __PUCK__value__40 = void 0;
if (true) {
  var __PUCK__value__41 = __PUCK__value__39;
  __PUCK__value__40 = "whatever";
};
(0, _core.print)(__PUCK__value__40);
var __PUCK__value__42 = _core.Result.Err(5);
var __PUCK__value__43 = __PUCK__value__42;
var __PUCK__value__44 = void 0;
if ($unwrapTraitObject(__PUCK__value__43).kind == "Ok") {
  var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__43),
      _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
      __PUCK__value__45 = _$unwrapTraitObject9$[0];

  __PUCK__value__44 = "ok";
} else {
  var __PUCK__value__46 = __PUCK__value__42;
  var __PUCK__value__47 = void 0;
  if ($unwrapTraitObject(__PUCK__value__46).kind == "Err") {
    var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__46),
        _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
        err = _$unwrapTraitObject11[0];

    __PUCK__value__47 = "error: " + err + "";
  };
  __PUCK__value__44 = __PUCK__value__47;
};
(0, _core.print)(__PUCK__value__44);
function sayHello(name) {
  return (0, _core.print)("Hello, " + name + "");
};
var __PUCK__value__48 = _core.Option.Some("World");
var __PUCK__value__49 = __PUCK__value__48;
if ($unwrapTraitObject(__PUCK__value__49).kind == "Some") {
  var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__49),
      _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12.value, 1),
      name = _$unwrapTraitObject13[0];

  name = $unwrapTraitObject(name).toUpperCase();
  sayHello(name);
} else {
  var __PUCK__value__50 = __PUCK__value__48;
  if ($unwrapTraitObject(__PUCK__value__50).kind == "None") {
    var _undefined4 = $unwrapTraitObject(__PUCK__value__50);
    (0, _core.print)("Oh, nothing");
  };
};
var __PUCK__value__51 = Value.One({ value: "World" });
var __PUCK__value__52 = __PUCK__value__51;
if ($unwrapTraitObject(__PUCK__value__52).kind == "One") {
  var _$unwrapTraitObject14 = $unwrapTraitObject(__PUCK__value__52),
      value = _$unwrapTraitObject14.value.value;

  sayHello(value);
} else {
  var __PUCK__value__53 = __PUCK__value__51;
  if (true) {
    var __PUCK__value__54 = __PUCK__value__53;
    (0, _core.print)("Sorry");
  };
};
var __PUCK__value__55 = Value.Two;
var __PUCK__value__56 = __PUCK__value__55;
if ($unwrapTraitObject(__PUCK__value__56).kind == "Two") {
  var _undefined5 = $unwrapTraitObject(__PUCK__value__56);
  (0, _core.print)("two");
} else {
  var __PUCK__value__57 = __PUCK__value__55;
  if ($unwrapTraitObject(__PUCK__value__57).kind == "Three") {
    var _undefined6 = $unwrapTraitObject(__PUCK__value__57);
    (0, _core.print)("three");
  } else {
    var __PUCK__value__58 = __PUCK__value__55;
    if (true) {
      var __PUCK__value__59 = __PUCK__value__58;
      (0, _core.print)("Sorry");
    };
  };
};
var __PUCK__value__60 = Value.Three;
var __PUCK__value__61 = __PUCK__value__60;
if ($unwrapTraitObject(__PUCK__value__61).kind == "Two") {
  var _undefined7 = $unwrapTraitObject(__PUCK__value__61);
  (0, _core.print)("two");
} else {
  var __PUCK__value__62 = __PUCK__value__60;
  if ($unwrapTraitObject(__PUCK__value__62).kind == "Three") {
    var _undefined8 = $unwrapTraitObject(__PUCK__value__62);
    (0, _core.print)("three");
  } else {
    var __PUCK__value__63 = __PUCK__value__60;
    if (true) {
      var __PUCK__value__64 = __PUCK__value__63;
      (0, _core.print)("Sorry");
    };
  };
};
function func() {
  return (0, _core.Err)(Value.Two);
};
var __PUCK__value__65 = func();
var __PUCK__value__66 = __PUCK__value__65;
if ($unwrapTraitObject(__PUCK__value__66).kind == "Ok") {
  var _$unwrapTraitObject15 = $unwrapTraitObject(__PUCK__value__66),
      _$unwrapTraitObject16 = _slicedToArray(_$unwrapTraitObject15.value, 1),
      __PUCK__value__67 = _$unwrapTraitObject16[0];

  (0, _core.print)("ok");
} else {
  var __PUCK__value__68 = __PUCK__value__65;
  if ($unwrapTraitObject(__PUCK__value__68).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__68).value)[$unwrapTraitObject(0)]).kind == "One") {
    var _$unwrapTraitObject17 = $unwrapTraitObject(__PUCK__value__68),
        _$unwrapTraitObject18 = _slicedToArray(_$unwrapTraitObject17.value, 1),
        _value = _$unwrapTraitObject18[0].value.value;

    sayHello(_value);
  } else {
    var __PUCK__value__69 = __PUCK__value__65;
    if ($unwrapTraitObject(__PUCK__value__69).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__69).value)[$unwrapTraitObject(0)]).kind == "Two") {
      var _$unwrapTraitObject19 = $unwrapTraitObject(__PUCK__value__69),
          _$unwrapTraitObject20 = _toArray(_$unwrapTraitObject19.value);

      (0, _core.print)("two");
    } else {
      var __PUCK__value__70 = __PUCK__value__65;
      if ($unwrapTraitObject(__PUCK__value__70).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__70).value)[$unwrapTraitObject(0)]).kind == "Three") {
        var _$unwrapTraitObject21 = $unwrapTraitObject(__PUCK__value__70),
            _$unwrapTraitObject22 = _toArray(_$unwrapTraitObject21.value);

        (0, _core.print)("three");
      };
    };
  };
};
var __PUCK__value__71 = _core.Option.Some(_core.Option.Some(5));
var __PUCK__value__72 = __PUCK__value__71;
if ($unwrapTraitObject(__PUCK__value__72).kind == "Some") {
  var _$unwrapTraitObject23 = $unwrapTraitObject(__PUCK__value__72),
      _$unwrapTraitObject24 = _slicedToArray(_$unwrapTraitObject23.value, 1),
      inner = _$unwrapTraitObject24[0];

  var __PUCK__value__73 = inner;
  var __PUCK__value__74 = __PUCK__value__73;
  if ($unwrapTraitObject(__PUCK__value__74).kind == "Some") {
    var _$unwrapTraitObject25 = $unwrapTraitObject(__PUCK__value__74),
        _$unwrapTraitObject26 = _slicedToArray(_$unwrapTraitObject25.value, 1),
        _value2 = _$unwrapTraitObject26[0];

    _value2;
  } else {
    var __PUCK__value__75 = __PUCK__value__73;
    if ($unwrapTraitObject(__PUCK__value__75).kind == "None") {
      var _undefined9 = $unwrapTraitObject(__PUCK__value__75);
      0;
    };
  };
} else {
  var __PUCK__value__76 = __PUCK__value__71;
  if ($unwrapTraitObject(__PUCK__value__76).kind == "None") {
    var _undefined10 = $unwrapTraitObject(__PUCK__value__76);
    0;
  };
};
var __PUCK__value__77 = _Object._Object;
var __PUCK__value__78 = __PUCK__value__77;
if ($unwrapTraitObject(__PUCK__value__78).kind == "_Object") {
  var _undefined11 = $unwrapTraitObject(__PUCK__value__78);
  "Object";
}
