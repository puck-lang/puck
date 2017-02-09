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
var __PUCK__value__6 = _core.Result.Ok(5);
var __PUCK__value__7 = __PUCK__value__6;
var __PUCK__value__8 = void 0;
if ($unwrapTraitObject(__PUCK__value__7).kind == "Ok") {
  var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__7),
      _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
      _num = _$unwrapTraitObject2$[0];

  __PUCK__value__8 = "" + _num + "";
} else {
  var __PUCK__value__9 = __PUCK__value__6;
  var __PUCK__value__10 = void 0;
  if ($unwrapTraitObject(__PUCK__value__9).kind == "Err") {
    var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__9),
        _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
        __PUCK__value__11 = _$unwrapTraitObject3$[0];

    __PUCK__value__10 = "error";
  };
  __PUCK__value__8 = __PUCK__value__10;
};
(0, _core.print)(__PUCK__value__8);
var __PUCK__value__12 = _core.Result.Ok(5);
var __PUCK__value__13 = __PUCK__value__12;
var __PUCK__value__14 = void 0;
if ($unwrapTraitObject(__PUCK__value__13).kind == "Ok") {
  var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__13),
      _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
      _num2 = _$unwrapTraitObject4$[0];

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
var __PUCK__value__18 = _core.Result.Ok(5);
var __PUCK__value__19 = __PUCK__value__18;
if ($unwrapTraitObject(__PUCK__value__19).kind == "Ok") {
  var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__19),
      _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
      _num3 = _$unwrapTraitObject5$[0];

  _num3;
} else {
  var __PUCK__value__20 = __PUCK__value__18;
  if (true) {
    var __PUCK__value__21 = __PUCK__value__20;
    "error";
  };
};
var __PUCK__value__22 = _core.Option.Some(5);
var __PUCK__value__23 = __PUCK__value__22;
var __PUCK__value__24 = void 0;
if ($unwrapTraitObject(__PUCK__value__23).kind == "Some") {
  var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__23),
      _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
      _num4 = _$unwrapTraitObject6$[0];

  __PUCK__value__24 = _num4;
} else {
  var __PUCK__value__25 = __PUCK__value__22;
  var __PUCK__value__26 = void 0;
  if ($unwrapTraitObject(__PUCK__value__25).kind == "None") {
    var _undefined2 = $unwrapTraitObject(__PUCK__value__25);
    __PUCK__value__26 = 0;
  };
  __PUCK__value__24 = __PUCK__value__26;
};
(0, _core.print)(__PUCK__value__24);
var __PUCK__value__27 = _core.Option.None;
var __PUCK__value__28 = __PUCK__value__27;
var __PUCK__value__29 = void 0;
if ($unwrapTraitObject(__PUCK__value__28).kind == "Some") {
  var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__28),
      _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
      __PUCK__value__30 = _$unwrapTraitObject7$[0];

  __PUCK__value__29 = "someting";
} else {
  var __PUCK__value__31 = __PUCK__value__27;
  var __PUCK__value__32 = void 0;
  if ($unwrapTraitObject(__PUCK__value__31).kind == "None") {
    var _undefined3 = $unwrapTraitObject(__PUCK__value__31);
    __PUCK__value__32 = "nothing";
  };
  __PUCK__value__29 = __PUCK__value__32;
};
(0, _core.print)(__PUCK__value__29);
var __PUCK__value__33 = _core.Option.None;
var __PUCK__value__34 = __PUCK__value__33;
var __PUCK__value__35 = void 0;
if (true) {
  var __PUCK__value__36 = __PUCK__value__34;
  __PUCK__value__35 = "whatever";
};
(0, _core.print)(__PUCK__value__35);
var __PUCK__value__37 = _core.Result.Err(5);
var __PUCK__value__38 = __PUCK__value__37;
var __PUCK__value__39 = void 0;
if ($unwrapTraitObject(__PUCK__value__38).kind == "Ok") {
  var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__38),
      _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
      __PUCK__value__40 = _$unwrapTraitObject8$[0];

  __PUCK__value__39 = "ok";
} else {
  var __PUCK__value__41 = __PUCK__value__37;
  var __PUCK__value__42 = void 0;
  if ($unwrapTraitObject(__PUCK__value__41).kind == "Err") {
    var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__41),
        _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
        err = _$unwrapTraitObject9$[0];

    __PUCK__value__42 = "error: " + err + "";
  };
  __PUCK__value__39 = __PUCK__value__42;
};
(0, _core.print)(__PUCK__value__39);
function sayHello(name) {
  return (0, _core.print)("Hello, " + name + "");
};
var __PUCK__value__43 = _core.Option.Some("World");
var __PUCK__value__44 = __PUCK__value__43;
if ($unwrapTraitObject(__PUCK__value__44).kind == "Some") {
  var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__44),
      _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
      name = _$unwrapTraitObject11[0];

  name = $unwrapTraitObject(name).toUpperCase();
  sayHello(name);
} else {
  var __PUCK__value__45 = __PUCK__value__43;
  if ($unwrapTraitObject(__PUCK__value__45).kind == "None") {
    var _undefined4 = $unwrapTraitObject(__PUCK__value__45);
    (0, _core.print)("Oh, nothing");
  };
};
var __PUCK__value__46 = Value.One({ value: "World" });
var __PUCK__value__47 = __PUCK__value__46;
if ($unwrapTraitObject(__PUCK__value__47).kind == "One") {
  var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__47),
      value = _$unwrapTraitObject12.value.value;

  sayHello(value);
} else {
  var __PUCK__value__48 = __PUCK__value__46;
  if (true) {
    var __PUCK__value__49 = __PUCK__value__48;
    (0, _core.print)("Sorry");
  };
};
var __PUCK__value__50 = Value.Two;
var __PUCK__value__51 = __PUCK__value__50;
if ($unwrapTraitObject(__PUCK__value__51).kind == "Two") {
  var _undefined5 = $unwrapTraitObject(__PUCK__value__51);
  (0, _core.print)("two");
} else {
  var __PUCK__value__52 = __PUCK__value__50;
  if ($unwrapTraitObject(__PUCK__value__52).kind == "Three") {
    var _undefined6 = $unwrapTraitObject(__PUCK__value__52);
    (0, _core.print)("three");
  } else {
    var __PUCK__value__53 = __PUCK__value__50;
    if (true) {
      var __PUCK__value__54 = __PUCK__value__53;
      (0, _core.print)("Sorry");
    };
  };
};
var __PUCK__value__55 = Value.Three;
var __PUCK__value__56 = __PUCK__value__55;
if ($unwrapTraitObject(__PUCK__value__56).kind == "Two") {
  var _undefined7 = $unwrapTraitObject(__PUCK__value__56);
  (0, _core.print)("two");
} else {
  var __PUCK__value__57 = __PUCK__value__55;
  if ($unwrapTraitObject(__PUCK__value__57).kind == "Three") {
    var _undefined8 = $unwrapTraitObject(__PUCK__value__57);
    (0, _core.print)("three");
  } else {
    var __PUCK__value__58 = __PUCK__value__55;
    if (true) {
      var __PUCK__value__59 = __PUCK__value__58;
      (0, _core.print)("Sorry");
    };
  };
};
function func() {
  return (0, _core.Err)(Value.Two);
};
var __PUCK__value__60 = func();
var __PUCK__value__61 = __PUCK__value__60;
if ($unwrapTraitObject(__PUCK__value__61).kind == "Ok") {
  var _$unwrapTraitObject13 = $unwrapTraitObject(__PUCK__value__61),
      _$unwrapTraitObject14 = _slicedToArray(_$unwrapTraitObject13.value, 1),
      __PUCK__value__62 = _$unwrapTraitObject14[0];

  (0, _core.print)("ok");
} else {
  var __PUCK__value__63 = __PUCK__value__60;
  if ($unwrapTraitObject(__PUCK__value__63).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__63).value)[$unwrapTraitObject(0)]).kind == "One") {
    var _$unwrapTraitObject15 = $unwrapTraitObject(__PUCK__value__63),
        _$unwrapTraitObject16 = _slicedToArray(_$unwrapTraitObject15.value, 1),
        _value = _$unwrapTraitObject16[0].value.value;

    sayHello(_value);
  } else {
    var __PUCK__value__64 = __PUCK__value__60;
    if ($unwrapTraitObject(__PUCK__value__64).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__64).value)[$unwrapTraitObject(0)]).kind == "Two") {
      var _$unwrapTraitObject17 = $unwrapTraitObject(__PUCK__value__64),
          _$unwrapTraitObject18 = _toArray(_$unwrapTraitObject17.value);

      (0, _core.print)("two");
    } else {
      var __PUCK__value__65 = __PUCK__value__60;
      if ($unwrapTraitObject(__PUCK__value__65).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__65).value)[$unwrapTraitObject(0)]).kind == "Three") {
        var _$unwrapTraitObject19 = $unwrapTraitObject(__PUCK__value__65),
            _$unwrapTraitObject20 = _toArray(_$unwrapTraitObject19.value);

        (0, _core.print)("three");
      };
    };
  };
};
var __PUCK__value__66 = _core.Option.Some(_core.Option.Some(5));
var __PUCK__value__67 = __PUCK__value__66;
if ($unwrapTraitObject(__PUCK__value__67).kind == "Some") {
  var _$unwrapTraitObject21 = $unwrapTraitObject(__PUCK__value__67),
      _$unwrapTraitObject22 = _slicedToArray(_$unwrapTraitObject21.value, 1),
      inner = _$unwrapTraitObject22[0];

  var __PUCK__value__68 = inner;
  var __PUCK__value__69 = __PUCK__value__68;
  if ($unwrapTraitObject(__PUCK__value__69).kind == "Some") {
    var _$unwrapTraitObject23 = $unwrapTraitObject(__PUCK__value__69),
        _$unwrapTraitObject24 = _slicedToArray(_$unwrapTraitObject23.value, 1),
        _value2 = _$unwrapTraitObject24[0];

    _value2;
  } else {
    var __PUCK__value__70 = __PUCK__value__68;
    if ($unwrapTraitObject(__PUCK__value__70).kind == "None") {
      var _undefined9 = $unwrapTraitObject(__PUCK__value__70);
      0;
    };
  };
} else {
  var __PUCK__value__71 = __PUCK__value__66;
  if ($unwrapTraitObject(__PUCK__value__71).kind == "None") {
    var _undefined10 = $unwrapTraitObject(__PUCK__value__71);
    0;
  };
};
var __PUCK__value__72 = _Object._Object;
var __PUCK__value__73 = __PUCK__value__72;
if ($unwrapTraitObject(__PUCK__value__73).kind == "_Object") {
  var _undefined11 = $unwrapTraitObject(__PUCK__value__73);
  "Object";
}
