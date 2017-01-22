'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jest = jest;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _jest = require('jest');

var _path = require('path');

var path = _interopRequireWildcard(_path);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function jest(watch, rootDir) {
  var moduleNameMapper = _core.ObjectMap._new.call(_core.ObjectMap);
  moduleNameMapper["^puck-lang/dist/lib/stdlib(.*)$"] = path.resolve(_js.require.resolve("../core"), "..") + "$1";
  var transform = _core.ObjectMap._new.call(_core.ObjectMap);
  transform[".*"] = _js.require.resolve("../../test/jest_preprocessor");
  var config = {
    moduleFileExtensions: ["puck", "js"],
    moduleNameMapper: moduleNameMapper,
    rootDir: rootDir,
    transform: transform,
    setupFiles: [],
    testEnvironment: "node",
    testRegex: "(/__tests__/.*|\\.(test))\\.puck$"
  };
  var jestArgs = ["--config", _js.global.JSON.stringify(config)];
  if (watch) {
    _core.List.add.call(jestArgs, "--watch");
  };
  return (0, _jest.run)(jestArgs);
}
