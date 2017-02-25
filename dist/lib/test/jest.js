'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.jestundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("jest");
const path = require("path");
function jest(watch, rootDir) {
  let moduleNameMapper = $puck_1.ObjectMap._new();
  moduleNameMapper["^puck-lang/dist/lib/stdlib(.*)$"] = path.resolve($puck_2._require.resolve("../core"), "..") + "$1";
  let transform = $puck_1.ObjectMap._new();
  transform[".*"] = $puck_2._require.resolve("../../test/jest_preprocessor");
  const config = {
    moduleFileExtensions: [
    "puck",
    "js",
  ],
    moduleNameMapper: moduleNameMapper,
    rootDir: rootDir,
    transform: transform,
    setupFiles: [],
    testEnvironment: "node",
    testRegex: "(/__tests__/.*|\\.(test))\\.puck$",
  };
  let jestArgs = [
    "--config",
    $unwrapTraitObject($unwrapTraitObject($puck_2._global).JSON).stringify(config),
  ];
  if (watch) {
    $puck_1.List.push.call(jestArgs, "--watch");
  };
  return $puck_3.run(jestArgs);
};
exports.jest = jest
