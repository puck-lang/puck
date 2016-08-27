#!/usr/bin/env node

'use strict';

var exec = require("child_process").exec;
var _new = require("./js")._new;
Array.prototype.takeFrom = function (predicate) {
  var index = this.findIndex(predicate);
  return this.slice(index);
};
function cmd(cmd) {
  return _new(Promise)(function (resolve, reject) {
    return exec(cmd, {
      cwd: process.cwd(),
      shell: "/bin/bash"
    }, function (error, stdout, stderr) {
      if (stderr) {
        console.error(stderr);
      };
      if (stdout) {
        console.log(stdout);
      };
      if (error) {
        return reject(error);
      } else {
        return resolve();
      };
    });
  });
};
function flag(_arguments, name, defaultValue) {
  var index = _arguments.indexOf(name);
  if (index >= 0) {
    var value = _arguments[index + 1];
    _arguments.splice(index, 2);
    return value;
  } else {
    return defaultValue;
  };
};
module.exports.cmd = cmd;
module.exports.flag = flag;
