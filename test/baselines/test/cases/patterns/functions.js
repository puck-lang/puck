'use strict';
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
function a($puck_2) {
  return 5;
};
function b($puck_3, num) {
  return num;
};
a("hello");
b("hello", 5);
function c() {
  if (false === true) {
    return "Wut?";
  }
  else {
    if (false === true) {
      return "Wut?";
    }
    else {
      if (false === true) {
        return "Wut?";
      }
      else {
        if (false === true) {
          return "Wut?";
        }
        else {
          if (false === true) {
            return "Wut?";
          }
          else {
            if (false === true) {
              return "Wut?";
            }
            else {
              if (false === true) {
                return "Wut?";
              }
              else {
                if (false === true) {
                  return "Wut?";
                }
                else {
                  return "fine";
                };
              };
            };
          };
        };
      };
    };
  };
};
function d([a, b]) {
  return a + b;
};
let da = [
  1,
  2,
];
d(da)
