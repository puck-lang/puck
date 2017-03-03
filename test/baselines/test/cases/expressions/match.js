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
if ($unwrapTraitObject($puck_2).kind === "Some") {
  let {value: num} = $unwrapTraitObject($puck_2);
  $puck_3 = "" + num + "";
}
else {
  let $puck_4;
  if ($unwrapTraitObject($puck_2).kind === "None") {
    $unwrapTraitObject($puck_2);
    $puck_4 = "nothing";
  };
  $puck_3 = $puck_4;
};
$puck_1.print($puck_3);
let $puck_5 = $puck_1.Some(5);
let $puck_6;
if ($unwrapTraitObject($puck_5).kind === "Some") {
  let {value: num} = $unwrapTraitObject($puck_5);
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
if ($unwrapTraitObject($puck_8).kind === "Ok") {
  let {value: num} = $unwrapTraitObject($puck_8);
  $puck_9 = "" + num + "";
}
else {
  let $puck_10;
  if ($unwrapTraitObject($puck_8).kind === "Err") {
    $unwrapTraitObject($puck_8);
    $puck_10 = "error";
  };
  $puck_9 = $puck_10;
};
$puck_1.print($puck_9);
let $puck_11 = $puck_1.Result.Ok(5);
let $puck_12;
if ($unwrapTraitObject($puck_11).kind === "Ok") {
  let {value: num} = $unwrapTraitObject($puck_11);
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
if ($unwrapTraitObject($puck_14).kind === "Ok") {
  let {value: num} = $unwrapTraitObject($puck_14);
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
if ($unwrapTraitObject($puck_15).kind === "Some") {
  let {value: num} = $unwrapTraitObject($puck_15);
  $puck_16 = num;
}
else {
  let $puck_17;
  if ($unwrapTraitObject($puck_15).kind === "None") {
    $unwrapTraitObject($puck_15);
    $puck_17 = 0;
  };
  $puck_16 = $puck_17;
};
$puck_1.print($puck_16);
let $puck_18 = $puck_1.Option.None;
let $puck_19;
if ($unwrapTraitObject($puck_18).kind === "Some") {
  $unwrapTraitObject($puck_18);
  $puck_19 = "someting";
}
else {
  let $puck_20;
  if ($unwrapTraitObject($puck_18).kind === "None") {
    $unwrapTraitObject($puck_18);
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
if ($unwrapTraitObject($puck_23).kind === "Ok") {
  $unwrapTraitObject($puck_23);
  $puck_24 = "ok";
}
else {
  let $puck_25;
  if ($unwrapTraitObject($puck_23).kind === "Err") {
    let {value: err} = $unwrapTraitObject($puck_23);
    $puck_25 = "error: " + err + "";
  };
  $puck_24 = $puck_25;
};
$puck_1.print($puck_24);
function sayHello(name) {
  return $puck_1.print("Hello, " + name + "");
};
let $puck_26 = $puck_1.Option.Some("World");
if ($unwrapTraitObject($puck_26).kind === "Some") {
  let {value: name} = $unwrapTraitObject($puck_26);
  name = $puck_1.String.toUpperCase.call(name);
  sayHello(name);
}
else {
  if ($unwrapTraitObject($puck_26).kind === "None") {
    $unwrapTraitObject($puck_26);
    $puck_1.print("Oh, nothing");
  };
};
let $puck_27 = Value.One({value: "World"});
if ($unwrapTraitObject($puck_27).kind === "One") {
  let {value: {value: value}} = $unwrapTraitObject($puck_27);
  sayHello(value);
}
else {
  if (true) {
    $puck_27;
    $puck_1.print("Sorry");
  };
};
let $puck_28 = Value.Two;
if ($unwrapTraitObject($puck_28).kind === "Two") {
  $unwrapTraitObject($puck_28);
  $puck_1.print("two");
}
else {
  if ($unwrapTraitObject($puck_28).kind === "Three") {
    $unwrapTraitObject($puck_28);
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
if ($unwrapTraitObject($puck_29).kind === "Two") {
  $unwrapTraitObject($puck_29);
  $puck_1.print("two");
}
else {
  if ($unwrapTraitObject($puck_29).kind === "Three") {
    $unwrapTraitObject($puck_29);
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
if ($unwrapTraitObject($puck_30).kind === "Ok") {
  $unwrapTraitObject($puck_30);
  $puck_1.print("ok");
}
else {
  if (($unwrapTraitObject($puck_30).kind === "Err" && $unwrapTraitObject($unwrapTraitObject($puck_30).value).kind === "One")) {
    let {value: {value: {value: value}}} = $unwrapTraitObject($puck_30);
    sayHello(value);
  }
  else {
    if (($unwrapTraitObject($puck_30).kind === "Err" && $unwrapTraitObject($unwrapTraitObject($puck_30).value).kind === "Two")) {
      $unwrapTraitObject($puck_30);
      $puck_1.print("two");
    }
    else {
      if (($unwrapTraitObject($puck_30).kind === "Err" && $unwrapTraitObject($unwrapTraitObject($puck_30).value).kind === "Three")) {
        $unwrapTraitObject($puck_30);
        $puck_1.print("three");
      };
    };
  };
};
let $puck_31 = $puck_1.Option.Some($puck_1.Option.Some(5));
if ($unwrapTraitObject($puck_31).kind === "Some") {
  let {value: inner} = $unwrapTraitObject($puck_31);
  let $puck_32 = inner;
  if ($unwrapTraitObject($puck_32).kind === "Some") {
    let {value: value} = $unwrapTraitObject($puck_32);
    value;
  }
  else {
    if ($unwrapTraitObject($puck_32).kind === "None") {
      $unwrapTraitObject($puck_32);
      0;
    };
  };
}
else {
  if ($unwrapTraitObject($puck_31).kind === "None") {
    $unwrapTraitObject($puck_31);
    0;
  };
};
let $puck_33 = _Object._Object;
if ($unwrapTraitObject($puck_33).kind === "_Object") {
  $unwrapTraitObject($puck_33);
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
if ($unwrapTraitObject($puck_34).kind === "Ok") {
  let {value: value} = $unwrapTraitObject($puck_34);
  $puck_1.String.toUpperCase.call(value);
}
else {
  if ($unwrapTraitObject($puck_34).kind === "Err") {
    let {value: err} = $unwrapTraitObject($puck_34);
    $puck_1.Num.round.call(err);
  };
}
