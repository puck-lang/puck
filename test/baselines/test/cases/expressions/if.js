'use strict';
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const z = 5;
function a(z = 0) {
  return z;
};
function b(z = 0) {};
if (z) {
  a();
};
if (z) {
  a();
}
else {
  b();
};
if (z) {
  a();
}
else {
  b();
};
if (z) {
  a();
}
else {
  b();
};
if (z) {
  a();
}
else {
  b();
};
let $puck_2;
if (z) {
  $puck_2 = true;
};
const q1 = $puck_2;
let $puck_3;
if (z) {
  $puck_3 = true;
}
else {
  $puck_3 = false;
};
const q2 = $puck_3;
let $puck_4;
if (z) {
  let $puck_5;
  if (z % 2) {
    $puck_5 = 1;
  }
  else {
    $puck_5 = 2;
  };
  $puck_4 = $puck_5;
}
else {
  $puck_4 = 3;
};
const q3 = $puck_4;
let $puck_6;
if (z) {
  $puck_6 = z / 2;
}
else {
  $puck_6 = b(z);
};
const q4 = $puck_6;
let $puck_7;
if (z) {
  $puck_7 = z / 2;
}
else {
  $puck_7 = b(z);
};
const q5 = $puck_7;
let $puck_8;
if (z) {
  const x = z / 2;
  let $puck_9;
  if ((z < 0)) {
    $puck_9 = -z;
  }
  else {
    $puck_9 = a(z) + b(z);
  };
  const y = $puck_9;
  $puck_8 = a(x ** y);
}
else {
  let $puck_10;
  if ((z == 0)) {
    $puck_10 = 1;
  }
  else {
    $puck_10 = 0;
  };
  $puck_8 = $puck_10;
};
const q6 = $puck_8;
let $puck_11;
if (z) {
  $puck_11 = 5;
};
const q7 = $puck_11;
function c() {
  if (z) {
    return z / 2;
  };
};
function d() {
  if (z) {
    return z / 2;
  }
  else {
    return b(z);
  };
};
function e() {
  if (z) {
    return z / 2;
  }
  else {
    return b(z);
  };
};
function g() {
  if (z) {
    const x = z / 2;
    let $puck_12;
    if ((z < 0)) {
      $puck_12 = -z;
    }
    else {
      $puck_12 = a(z) + b(z);
    };
    const y = $puck_12;
    return a(x ** y);
  }
  else {
    if ((z == 0)) {
      return q6;
    }
    else {
      return 3;
    };
  };
};
function h() {
  if (z) {
    a();
  };
  if (z) {
    a();
  }
  else {
    b();
  };
  if (z) {
    a();
  }
  else {
    b();
  };
  if (z) {
    a();
  }
  else {
    b();
  };
  if (z) {
    a();
  }
  else {
    b();
  };
  let $puck_13;
  if (z) {
    $puck_13 = true;
  };
  const q1 = $puck_13;
  let $puck_14;
  if (z) {
    $puck_14 = true;
  }
  else {
    $puck_14 = false;
  };
  const q2 = $puck_14;
  let $puck_15;
  if (z) {
    let $puck_16;
    if (z % 2) {
      $puck_16 = 1;
    }
    else {
      $puck_16 = 2;
    };
    $puck_15 = $puck_16;
  }
  else {
    $puck_15 = 3;
  };
  const q3 = $puck_15;
  let $puck_17;
  if (z) {
    $puck_17 = z / 2;
  }
  else {
    $puck_17 = b(z);
  };
  const q4 = $puck_17;
  let $puck_18;
  if (z) {
    $puck_18 = z / 2;
  }
  else {
    $puck_18 = b(z);
  };
  const q5 = $puck_18;
  let $puck_19;
  if (z) {
    const x = z / 2;
    let $puck_20;
    if ((z < 0)) {
      $puck_20 = -z;
    }
    else {
      $puck_20 = a(z) + b(z);
    };
    const y = $puck_20;
    $puck_19 = a(x ** y);
  }
  else {
    let $puck_21;
    if ((z == 0)) {
      $puck_21 = q6;
    }
    else {
      $puck_21 = 0;
    };
    $puck_19 = $puck_21;
  };
  const q6 = $puck_19;
  let $puck_22;
  if (z) {
    $puck_22 = 5;
  };
  const q7 = $puck_22;
  function c() {
    if (z) {
      return z / 2;
    };
  };
  function d() {
    if (z) {
      return z / 2;
    }
    else {
      return b(z);
    };
  };
  function e() {
    if (z) {
      return z / 2;
    }
    else {
      return b(z);
    };
  };
  return function g() {
    if (z) {
      const x = z / 2;
      let $puck_23;
      if ((z < 0)) {
        $puck_23 = -z;
      }
      else {
        $puck_23 = a(z) + b(z);
      };
      const y = $puck_23;
      return a(x ** y);
    }
    else {
      if ((z == 0)) {
        return q6;
      }
      else {
        return 7;
      };
    };
  };
};
if (2 > 3) {
  5;
}
else {
  "string";
};
let $puck_24;
if (2 > 3) {
  $puck_24 = "five";
}
else {
  $puck_24 = "string";
};
const value = $puck_24
