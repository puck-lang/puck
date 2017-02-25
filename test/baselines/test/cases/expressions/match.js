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
if ($unwrapTraitObject($puck_2).kind == "Some") {
  let {value: [num]} = $unwrapTraitObject($puck_2);
  $puck_3 = "" + num + "";
}
else {
  let $puck_4;
  if ($unwrapTraitObject($puck_2).kind == "None") {
    let undefined = $unwrapTraitObject($puck_2);
    $puck_4 = "nothing";
  };
  $puck_3 = $puck_4;
};
$puck_1.print($puck_3);
let $puck_5 = $puck_1.Some(5);
let $puck_6;
if ($unwrapTraitObject($puck_5).kind == "Some") {
  let {value: [num]} = $unwrapTraitObject($puck_5);
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
if ($unwrapTraitObject($puck_8).kind == "Ok") {
  let {value: [num]} = $unwrapTraitObject($puck_8);
  $puck_9 = "" + num + "";
}
else {
  let $puck_10;
  if ($unwrapTraitObject($puck_8).kind == "Err") {
    let {value: [$puck_11]} = $unwrapTraitObject($puck_8);
    $puck_10 = "error";
  };
  $puck_9 = $puck_10;
};
$puck_1.print($puck_9);
let $puck_12 = $puck_1.Result.Ok(5);
let $puck_13;
if ($unwrapTraitObject($puck_12).kind == "Ok") {
  let {value: [num]} = $unwrapTraitObject($puck_12);
  $puck_13 = "" + num + "";
}
else {
  let $puck_14;
  if (true) {
    let $puck_15 = $puck_12;
    $puck_14 = "error";
  };
  $puck_13 = $puck_14;
};
$puck_1.print($puck_13);
let $puck_16 = $puck_1.Result.Ok(5);
if ($unwrapTraitObject($puck_16).kind == "Ok") {
  let {value: [num]} = $unwrapTraitObject($puck_16);
  num;
}
else {
  if (true) {
    let $puck_17 = $puck_16;
    "error";
  };
};
let $puck_18 = $puck_1.Option.Some(5);
let $puck_19;
if ($unwrapTraitObject($puck_18).kind == "Some") {
  let {value: [num]} = $unwrapTraitObject($puck_18);
  $puck_19 = num;
}
else {
  let $puck_20;
  if ($unwrapTraitObject($puck_18).kind == "None") {
    let undefined = $unwrapTraitObject($puck_18);
    $puck_20 = 0;
  };
  $puck_19 = $puck_20;
};
$puck_1.print($puck_19);
let $puck_21 = $puck_1.Option.None;
let $puck_22;
if ($unwrapTraitObject($puck_21).kind == "Some") {
  let {value: [$puck_23]} = $unwrapTraitObject($puck_21);
  $puck_22 = "someting";
}
else {
  let $puck_24;
  if ($unwrapTraitObject($puck_21).kind == "None") {
    let undefined = $unwrapTraitObject($puck_21);
    $puck_24 = "nothing";
  };
  $puck_22 = $puck_24;
};
$puck_1.print($puck_22);
let $puck_25 = $puck_1.Option.None;
let $puck_26;
if (true) {
  let $puck_27 = $puck_25;
  $puck_26 = "whatever";
};
$puck_1.print($puck_26);
let $puck_28 = $puck_1.Result.Err(5);
let $puck_29;
if ($unwrapTraitObject($puck_28).kind == "Ok") {
  let {value: [$puck_30]} = $unwrapTraitObject($puck_28);
  $puck_29 = "ok";
}
else {
  let $puck_31;
  if ($unwrapTraitObject($puck_28).kind == "Err") {
    let {value: [err]} = $unwrapTraitObject($puck_28);
    $puck_31 = "error: " + err + "";
  };
  $puck_29 = $puck_31;
};
$puck_1.print($puck_29);
function sayHello(name) {
  return $puck_1.print("Hello, " + name + "");
};
let $puck_32 = $puck_1.Option.Some("World");
if ($unwrapTraitObject($puck_32).kind == "Some") {
  let {value: [name]} = $unwrapTraitObject($puck_32);
  name = $puck_1.String.toUpperCase.call(name);
  sayHello(name);
}
else {
  if ($unwrapTraitObject($puck_32).kind == "None") {
    let undefined = $unwrapTraitObject($puck_32);
    $puck_1.print("Oh, nothing");
  };
};
let $puck_33 = Value.One({value: "World"});
if ($unwrapTraitObject($puck_33).kind == "One") {
  let {value: {value: value}} = $unwrapTraitObject($puck_33);
  sayHello(value);
}
else {
  if (true) {
    let $puck_34 = $puck_33;
    $puck_1.print("Sorry");
  };
};
let $puck_35 = Value.Two;
if ($unwrapTraitObject($puck_35).kind == "Two") {
  let undefined = $unwrapTraitObject($puck_35);
  $puck_1.print("two");
}
else {
  if ($unwrapTraitObject($puck_35).kind == "Three") {
    let undefined = $unwrapTraitObject($puck_35);
    $puck_1.print("three");
  }
  else {
    if (true) {
      let $puck_36 = $puck_35;
      $puck_1.print("Sorry");
    };
  };
};
let $puck_37 = Value.Three;
if ($unwrapTraitObject($puck_37).kind == "Two") {
  let undefined = $unwrapTraitObject($puck_37);
  $puck_1.print("two");
}
else {
  if ($unwrapTraitObject($puck_37).kind == "Three") {
    let undefined = $unwrapTraitObject($puck_37);
    $puck_1.print("three");
  }
  else {
    if (true) {
      let $puck_38 = $puck_37;
      $puck_1.print("Sorry");
    };
  };
};
function func() {
  return $puck_1.Err(Value.Two);
};
let $puck_39 = func();
if ($unwrapTraitObject($puck_39).kind == "Ok") {
  let {value: [$puck_40]} = $unwrapTraitObject($puck_39);
  $puck_1.print("ok");
}
else {
  if (($unwrapTraitObject($puck_39).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_39).value)[0]).kind == "One")) {
    let {value: [{value: {value: value}}]} = $unwrapTraitObject($puck_39);
    sayHello(value);
  }
  else {
    if (($unwrapTraitObject($puck_39).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_39).value)[0]).kind == "Two")) {
      let {value: []} = $unwrapTraitObject($puck_39);
      $puck_1.print("two");
    }
    else {
      if (($unwrapTraitObject($puck_39).kind == "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_39).value)[0]).kind == "Three")) {
        let {value: []} = $unwrapTraitObject($puck_39);
        $puck_1.print("three");
      };
    };
  };
};
let $puck_41 = $puck_1.Option.Some($puck_1.Option.Some(5));
if ($unwrapTraitObject($puck_41).kind == "Some") {
  let {value: [inner]} = $unwrapTraitObject($puck_41);
  let $puck_42 = inner;
  if ($unwrapTraitObject($puck_42).kind == "Some") {
    let {value: [value]} = $unwrapTraitObject($puck_42);
    value;
  }
  else {
    if ($unwrapTraitObject($puck_42).kind == "None") {
      let undefined = $unwrapTraitObject($puck_42);
      0;
    };
  };
}
else {
  if ($unwrapTraitObject($puck_41).kind == "None") {
    let undefined = $unwrapTraitObject($puck_41);
    0;
  };
};
let $puck_43 = _Object._Object;
if ($unwrapTraitObject($puck_43).kind == "_Object") {
  let undefined = $unwrapTraitObject($puck_43);
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
let $puck_44 = func2(false);
if ($unwrapTraitObject($puck_44).kind == "Ok") {
  let {value: [value]} = $unwrapTraitObject($puck_44);
  $puck_1.String.toUpperCase.call(value);
}
else {
  if ($unwrapTraitObject($puck_44).kind == "Err") {
    let {value: [err]} = $unwrapTraitObject($puck_44);
    $puck_1.Num.round.call(err);
  };
}
