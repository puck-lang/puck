#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cmd = cmd;
exports.walkSync = walkSync;
exports.flag = flag;
var execSync = require("child_process").execSync;
var fs = require("fs");
var path = require("path");
var _new = require("./js")._new;
var asResult = require("./js").asResult;
Array.prototype.takeFrom = function (predicate) {
  var index = this.findIndex(predicate);
  return this.slice(index);
};
function cmd(cmd) {
  var result = asResult(function () {
    return execSync(cmd, {
      cwd: process.cwd(),
      shell: "/bin/bash",
      env: {
        BASHOPTS: "globstar:extglob",
        PATH: process.env.PATH
      }
    });
  });
  if (result.error) {
    var stdout = result.error.stdout.toString();
    var stderr = result.error.stderr.toString();
    if (stdout) {
      console.log(stdout.trim());
    };
    if (stderr) {
      console.error(stderr.trim());
    };
    throw result.error;
  } else {
    if (result.result.toString()) {
      console.log(result.result.toString().trim());
    };
  };
};
function walkSync(directory) {
  var filelist = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  var files = fs.readdirSync(directory);
  files.forEach(function (fileName) {
    var file = path.join(directory, fileName);
    if (fs.statSync(file).isDirectory()) {
      return walkSync(file, filelist);
    } else {
      return filelist.push(file);
    };
  });
  return filelist;
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
}
