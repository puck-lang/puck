'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.cmd = exports.walkSync = exports.flagundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("child_process");
const fs = require("fs");
const path = require("path");
const $puck_4 = require("./compiler/ast");
function cmd(cmd) {
  const result = $puck_2.asResult(function () {
    return $puck_3.execSync(cmd, {
      cwd: $puck_2.process.cwd(),
      shell: "/bin/bash",
      env: {
      BASHOPTS: "globstar:extglob",
      PATH: $puck_2.process.env.PATH,
    },
    });
  });
  let $puck_5 = result;
  if ($unwrapTraitObject($puck_5).kind == "Ok") {
    let {value: [output]} = $unwrapTraitObject($puck_5);
    if (output.toString()) {
      return $puck_1.print(output.toString().trim());
    };
  }
  else {
    if ($unwrapTraitObject($puck_5).kind == "Err") {
      let {value: [error]} = $unwrapTraitObject($puck_5);
      const stdout = $unwrapTraitObject(error.stdout.toString());
      const stderr = $unwrapTraitObject(error.stderr.toString());
      if (stdout) {
        $puck_1.print($puck_1.String.trim.call(stdout));
      };
      if (stderr) {
        $unwrapTraitObject($puck_2.console).error($puck_1.String.trim.call(stderr));
      };
      if (error.stack) {
        $unwrapTraitObject($puck_2.console).error(error.stack);
      };
      $puck_2.process.exit(1);
      return [];
    };
  };
};
exports.cmd = cmd;
function walkSync(directory, filelist = []) {
  if ((!fs.existsSync(directory) || !fs.statSync(directory).isDirectory())) {
    return [];
  };
  let files = $unwrapTraitObject(fs.readdirSync(directory));
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: files, $isTraitObject: true}, function (fileName) {
    const file = path.join(directory, fileName);
    if (fs.statSync(file).isDirectory()) {
      walkSync(file, filelist);
    }
    else {
      $puck_1.List.push.call(filelist, file);
    };
    return [];
  });
  return filelist;
};
exports.walkSync = walkSync;
function flag(_arguments, name, defaultValue = "") {
  const index = $unwrapTraitObject(_arguments.indexOf(name));
  if (index >= 0) {
    const value = $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: _arguments, $isTraitObject: true}, index + 1);
    _arguments.splice(index, 2);
    return value;
  }
  else {
    return defaultValue;
  };
};
exports.flag = flag
