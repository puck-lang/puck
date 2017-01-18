#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildAll = buildAll;
exports.buildTestCompiler = buildTestCompiler;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _helpers = require('./../lib/helpers.js');

function buildAll() {
  var outFolder = arguments.length <= 0 || arguments[0] === undefined ? "dist" : arguments[0];
  var compiler = arguments.length <= 1 || arguments[1] === undefined ? "dist" : arguments[1];

  return (0, _helpers.cmd)("" + compiler + "/bin/puckc --out-dir " + outFolder + " --skip-extension true bin/**/*.puck && " + "" + compiler + "/bin/puckc --out-dir " + outFolder + " lib/**/*.puck");
};
function buildTestCompiler() {
  (0, _helpers.cmd)("rm -rf .tmp && mkdir -p .tmp/{old,new}/{bin,node_modules} .tmp/{old,new}/lib/compiler .tmp/{old,new}/lib/stdlib/js");
  buildAll(".tmp/old");
  return (0, _helpers.cmd)("cp dist/lib/compiler/{ast,emitter}.js .tmp/old/lib/compiler &&     cp dist/lib/stdlib/js/js.js .tmp/old/lib/stdlib/js/ &&     cp dist/lib/compiler/{ast,emitter}.js .tmp/new/lib/compiler/ &&     cp dist/lib/stdlib/js/js.js .tmp/new/lib/stdlib/js/ &&     mkdir .tmp/{old,new}/node_modules/puck-lang &&     ln -s ../lib .tmp/lib &&     ln -s ../../../old .tmp/old/node_modules/puck-lang/dist &&     ln -s ../../../new .tmp/new/node_modules/puck-lang/dist  ");
}
