'use strict';
exports.buildAll = exports.buildTestCompilerundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("./../lib/helpers");
function buildAll(outFolder = "dist", compiler = "dist", useBabel = false) {
  let $puck_3;
  if (useBabel) {
    $puck_3 = "--babel true";
  }
  else {
    $puck_3 = "";
  };
  const babel = $puck_3;
  return $puck_2.cmd("" + compiler + "/bin/puckc " + babel + " --out-dir " + outFolder + " --skip-extension true --is-binary true bin/**/*.puck && " + "" + compiler + "/bin/puckc " + babel + " --out-dir " + outFolder + " lib/**/*.puck");
};
exports.buildAll = buildAll;
function buildTestCompiler(useBabel = false) {
  $puck_2.cmd("rm -rf .tmp && mkdir -p .tmp/{old,new}/{bin,node_modules} .tmp/{old,new}/lib/compiler .tmp/{old,new}/lib/stdlib/{core,js}");
  buildAll(".tmp/old", "dist", useBabel);
  return $puck_2.cmd("cp dist/lib/compiler/{ast,emitter}.js .tmp/old/lib/compiler &&     cp dist/lib/stdlib/core/js.js .tmp/old/lib/stdlib/core/ &&     cp dist/lib/stdlib/js/js.js .tmp/old/lib/stdlib/js/ &&     cp dist/lib/compiler/{ast,emitter}.js .tmp/new/lib/compiler/ &&     cp dist/lib/stdlib/core/js.js .tmp/new/lib/stdlib/core/ &&     cp dist/lib/stdlib/js/js.js .tmp/new/lib/stdlib/js/ &&     mkdir .tmp/{old,new}/node_modules/puck-lang &&     ln -s ../lib .tmp/lib &&     ln -s ../../../old .tmp/old/node_modules/puck-lang/dist &&     ln -s ../../../new .tmp/new/node_modules/puck-lang/dist  ");
};
exports.buildTestCompiler = buildTestCompiler
