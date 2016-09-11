#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cmd = cmd;
exports.walkSync = walkSync;
exports.flag = flag;

var _child_process = require('child_process');

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _js = require('./stdlib/js.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

_js.Array.prototype.takeFrom = function (predicate) {
  var self = this;
  var index = self.findIndex(predicate);
  return self.slice(index);
};
function cmd(cmd) {
  var result = (0, _js.asResult)(function () {
    return (0, _child_process.execSync)(cmd, {
      cwd: _js.process.cwd(),
      shell: "/bin/bash",
      env: {
        BASHOPTS: "globstar:extglob",
        PATH: _js.process.env.PATH
      }
    });
  });
  if (result.error) {
    var stdout = result.error.stdout.toString();
    var stderr = result.error.stderr.toString();
    if (stdout) {
      _js.console.log(stdout.trim());
    };
    if (stderr) {
      _js.console.error(stderr.trim());
    };
    throw result.error;
  } else {
    if (result.result.toString()) {
      _js.console.log(result.result.toString().trim());
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
