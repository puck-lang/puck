#!/usr/bin/env node

'use strict';

var _core = require('puck-lang/dist/lib/stdlib/core');

var z = 5;
function a() {};
function b() {};
if (z) {
  a();
};
if (z) {
  a();
} else {
  b();
};
if (z) {
  a();
} else {
  b();
};
if (z) {
  a();
} else {
  b();
};
if (z) {
  a();
} else {
  b();
};
var __PUCK__value__1 = void 0;
if (z) {
  __PUCK__value__1 = true;
};
var q1 = __PUCK__value__1;
var __PUCK__value__2 = void 0;
if (z) {
  __PUCK__value__2 = true;
} else {
  __PUCK__value__2 = false;
};
var q2 = __PUCK__value__2;
var __PUCK__value__3 = void 0;
if (z) {
  var __PUCK__value__4 = void 0;
  if (z % 2) {
    __PUCK__value__4 = 1;
  } else {
    __PUCK__value__4 = 2;
  };
  __PUCK__value__3 = __PUCK__value__4;
} else {
  __PUCK__value__3 = 3;
};
var q3 = __PUCK__value__3;
var __PUCK__value__5 = void 0;
if (z) {
  __PUCK__value__5 = z / 2;
} else {
  __PUCK__value__5 = b(z);
};
var q4 = __PUCK__value__5;
var __PUCK__value__6 = void 0;
if (z) {
  __PUCK__value__6 = z / 2;
} else {
  __PUCK__value__6 = b(z);
};
var q5 = __PUCK__value__6;
var __PUCK__value__7 = void 0;
if (z) {
  var x = z / 2;
  var __PUCK__value__8 = void 0;
  if (z < 0) {
    __PUCK__value__8 = -z;
  } else {
    __PUCK__value__8 = a(z) + b(z);
  };
  var y = __PUCK__value__8;
  __PUCK__value__7 = a(Math.pow(x, y));
} else {
  var __PUCK__value__9 = void 0;
  if (z == 0) {
    __PUCK__value__9 = q6;
  } else {
    __PUCK__value__9 = 0;
  };
  __PUCK__value__7 = __PUCK__value__9;
};
var q6 = __PUCK__value__7;
var __PUCK__value__10 = void 0;
if (z) {
  __PUCK__value__10 = 5;
};
var q7 = __PUCK__value__10;
function c() {
  if (z) {
    return z / 2;
  };
};
function d() {
  if (z) {
    return z / 2;
  } else {
    return b(z);
  };
};
function e() {
  if (z) {
    return z / 2;
  } else {
    return b(z);
  };
};
function g() {
  if (z) {
    var _x = z / 2;
    var __PUCK__value__11 = void 0;
    if (z < 0) {
      __PUCK__value__11 = -z;
    } else {
      __PUCK__value__11 = a(z) + b(z);
    };
    var _y = __PUCK__value__11;
    return a(Math.pow(_x, _y));
  } else {
    if (z == 0) {
      return q6;
    };
  };
};
function h() {
  var z = 5;
  function a() {};
  function b() {};
  if (z) {
    a();
  };
  if (z) {
    a();
  } else {
    b();
  };
  if (z) {
    a();
  } else {
    b();
  };
  if (z) {
    a();
  } else {
    b();
  };
  if (z) {
    a();
  } else {
    b();
  };
  var __PUCK__value__12 = void 0;
  if (z) {
    __PUCK__value__12 = true;
  };
  var q1 = __PUCK__value__12;
  var __PUCK__value__13 = void 0;
  if (z) {
    __PUCK__value__13 = true;
  } else {
    __PUCK__value__13 = false;
  };
  var q2 = __PUCK__value__13;
  var __PUCK__value__14 = void 0;
  if (z) {
    var __PUCK__value__15 = void 0;
    if (z % 2) {
      __PUCK__value__15 = 1;
    } else {
      __PUCK__value__15 = 2;
    };
    __PUCK__value__14 = __PUCK__value__15;
  } else {
    __PUCK__value__14 = 3;
  };
  var q3 = __PUCK__value__14;
  var __PUCK__value__16 = void 0;
  if (z) {
    __PUCK__value__16 = z / 2;
  } else {
    __PUCK__value__16 = b(z);
  };
  var q4 = __PUCK__value__16;
  var __PUCK__value__17 = void 0;
  if (z) {
    __PUCK__value__17 = z / 2;
  } else {
    __PUCK__value__17 = b(z);
  };
  var q5 = __PUCK__value__17;
  var __PUCK__value__18 = void 0;
  if (z) {
    var _x2 = z / 2;
    var __PUCK__value__19 = void 0;
    if (z < 0) {
      __PUCK__value__19 = -z;
    } else {
      __PUCK__value__19 = a(z) + b(z);
    };
    var _y2 = __PUCK__value__19;
    __PUCK__value__18 = a(Math.pow(_x2, _y2));
  } else {
    var __PUCK__value__20 = void 0;
    if (z == 0) {
      __PUCK__value__20 = q6;
    } else {
      __PUCK__value__20 = 0;
    };
    __PUCK__value__18 = __PUCK__value__20;
  };
  var q6 = __PUCK__value__18;
  var __PUCK__value__21 = void 0;
  if (z) {
    __PUCK__value__21 = 5;
  };
  var q7 = __PUCK__value__21;
  function c() {
    if (z) {
      return z / 2;
    };
  };
  function d() {
    if (z) {
      return z / 2;
    } else {
      return b(z);
    };
  };
  function e() {
    if (z) {
      return z / 2;
    } else {
      return b(z);
    };
  };
  return function g() {
    if (z) {
      var _x3 = z / 2;
      var __PUCK__value__22 = void 0;
      if (z < 0) {
        __PUCK__value__22 = -z;
      } else {
        __PUCK__value__22 = a(z) + b(z);
      };
      var _y3 = __PUCK__value__22;
      return a(Math.pow(_x3, _y3));
    } else {
      if (z == 0) {
        return q6;
      };
    };
  };
}
