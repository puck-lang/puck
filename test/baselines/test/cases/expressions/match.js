'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
var Value = {
One: (object) => ({kind: 'One', value: object}),
Two: {kind: 'Two', value: Symbol('Two')},
Three: {kind: 'Three', value: Symbol('Three')},
};
var _Object = {
_Object: {kind: '_Object', value: Symbol('_Object')},
};
let $puck_2 = $puck_1.Option.Some(5);
let $puck_3;
if ($puck_2 !== undefined) {
  let num = $puck_2;
  $puck_3 = "" + num + "";
}
else {
  let $puck_4;
  if ($puck_2 === undefined) {
    $puck_2;
    $puck_4 = "nothing";
  };
  $puck_3 = $puck_4;
};
$puck_1.print($puck_3);
let $puck_5 = $puck_1.Some(5);
let $puck_6;
if ($puck_5 !== undefined) {
  let num = $puck_5;
  $puck_6 = "" + num + "";
}
else {
  let $puck_7;
  if (true) {
    const None = $puck_5;
    $puck_7 = "nothing";
  };
  $puck_6 = $puck_7;
};
$puck_1.print($puck_6);
let $puck_8 = $puck_1.Result.Ok(5);
let $puck_9;
if ($puck_8.kind === "Ok") {
  let {value: num} = $puck_8;
  $puck_9 = "" + num + "";
}
else {
  let $puck_10;
  if ($puck_8.kind === "Err") {
    $puck_8;
    $puck_10 = "error";
  };
  $puck_9 = $puck_10;
};
$puck_1.print($puck_9);
let $puck_11 = $puck_1.Result.Ok(5);
let $puck_12;
if ($puck_11.kind === "Ok") {
  let {value: num} = $puck_11;
  $puck_12 = "" + num + "";
}
else {
  let $puck_13;
  if (true) {
    $puck_11;
    $puck_13 = "error";
  };
  $puck_12 = $puck_13;
};
$puck_1.print($puck_12);
let $puck_14 = $puck_1.Result.Ok(5);
if ($puck_14.kind === "Ok") {
  let {value: num} = $puck_14;
  num;
}
else {
  if (true) {
    $puck_14;
    "error";
  };
};
let $puck_15 = $puck_1.Option.Some(5);
let $puck_16;
if ($puck_15 !== undefined) {
  let num = $puck_15;
  $puck_16 = num;
}
else {
  let $puck_17;
  if ($puck_15 === undefined) {
    $puck_15;
    $puck_17 = 0;
  };
  $puck_16 = $puck_17;
};
$puck_1.print($puck_16);
let $puck_18 = $puck_1.Option.None;
let $puck_19;
if ($puck_18 !== undefined) {
  $puck_18;
  $puck_19 = "someting";
}
else {
  let $puck_20;
  if ($puck_18 === undefined) {
    $puck_18;
    $puck_20 = "nothing";
  };
  $puck_19 = $puck_20;
};
$puck_1.print($puck_19);
let $puck_21 = $puck_1.Option.None;
let $puck_22;
if (true) {
  $puck_21;
  $puck_22 = "whatever";
};
$puck_1.print($puck_22);
let $puck_23 = $puck_1.Result.Err(5);
let $puck_24;
if ($puck_23.kind === "Ok") {
  $puck_23;
  $puck_24 = "ok";
}
else {
  let $puck_25;
  if ($puck_23.kind === "Err") {
    let {value: err} = $puck_23;
    $puck_25 = "error: " + err + "";
  };
  $puck_24 = $puck_25;
};
$puck_1.print($puck_24);
function sayHello(name) {
  return $puck_1.print("Hello, " + name + "");
};
let $puck_26 = $puck_1.Option.Some("World");
if ($puck_26 !== undefined) {
  let name = $puck_26;
  name = $puck_1.String.toUpperCase.call(name);
  sayHello(name);
}
else {
  if ($puck_26 === undefined) {
    $puck_26;
    $puck_1.print("Oh, nothing");
  };
};
let $puck_27 = Value.One({value: "World"});
if ($puck_27.kind === "One") {
  let {value: {value: value}} = $puck_27;
  sayHello(value);
}
else {
  if (true) {
    $puck_27;
    $puck_1.print("Sorry");
  };
};
let $puck_28 = Value.Two;
if ($puck_28.kind === "Two") {
  $puck_28;
  $puck_1.print("two");
}
else {
  if ($puck_28.kind === "Three") {
    $puck_28;
    $puck_1.print("three");
  }
  else {
    if (true) {
      $puck_28;
      $puck_1.print("Sorry");
    };
  };
};
let $puck_29 = Value.Three;
if ($puck_29.kind === "Two") {
  $puck_29;
  $puck_1.print("two");
}
else {
  if ($puck_29.kind === "Three") {
    $puck_29;
    $puck_1.print("three");
  }
  else {
    if (true) {
      $puck_29;
      $puck_1.print("Sorry");
    };
  };
};
function func() {
  return $puck_1.Err(Value.Two);
};
let $puck_30 = func();
if ($puck_30.kind === "Ok") {
  $puck_30;
  $puck_1.print("ok");
}
else {
  if (($puck_30.kind === "Err" && $unwrapTraitObject($puck_30.value).kind === "One")) {
    let {value: {value: {value: value}}} = $puck_30;
    sayHello(value);
  }
  else {
    if (($puck_30.kind === "Err" && $unwrapTraitObject($puck_30.value).kind === "Two")) {
      $puck_30;
      $puck_1.print("two");
    }
    else {
      if (($puck_30.kind === "Err" && $unwrapTraitObject($puck_30.value).kind === "Three")) {
        $puck_30;
        $puck_1.print("three");
      };
    };
  };
};
let $puck_31 = $puck_1.Option.Some($puck_1.Option.Some(5));
if ($puck_31 !== undefined) {
  let inner = $puck_31;
  let $puck_32 = inner;
  if ($puck_32 !== undefined) {
    let value = $puck_32;
    value;
  }
  else {
    if ($puck_32 === undefined) {
      $puck_32;
      0;
    };
  };
}
else {
  if ($puck_31 === undefined) {
    $puck_31;
    0;
  };
};
let $puck_33 = _Object._Object;
if ($puck_33.kind === "_Object") {
  $puck_33;
  "Object";
};
function func2(error) {
  if (error) {
    return $puck_1.Err(5);
  }
  else {
    return $puck_1.Ok("");
  };
};
let $puck_34 = func2(false);
if ($puck_34.kind === "Ok") {
  let {value: value} = $puck_34;
  $puck_1.String.toUpperCase.call(value);
}
else {
  if ($puck_34.kind === "Err") {
    let {value: err} = $puck_34;
    $puck_1.Num.round.call(err);
  };
}
