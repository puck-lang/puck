'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (_js.Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.cmd = cmd;
exports.walkSync = walkSync;
exports.flag = flag;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _child_process = require('child_process');

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _ast = require('./compiler/ast');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
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
  var __PUCK__value__1 = result;
  if ($unwrapTraitObject(__PUCK__value__1).kind == "Ok") {
    var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__1),
        _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
        output = _$unwrapTraitObject$v[0];

    if (output.toString()) {
      return (0, _core.print)(output.toString().trim());
    };
  } else {
    if ($unwrapTraitObject(__PUCK__value__1).kind == "Err") {
      var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__1),
          _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
          error = _$unwrapTraitObject2$[0];

      var stdout = $unwrapTraitObject(error.stdout.toString());
      var stderr = $unwrapTraitObject(error.stderr.toString());
      if (stdout) {
        (0, _core.print)(_core.String.trim.call(stdout));
      };
      if (stderr) {
        $unwrapTraitObject(_js.console).error(_core.String.trim.call(stderr));
      };
      if (error.stack) {
        $unwrapTraitObject(_js.console).error(error.stack);
      };
      _js.process.exit(1);
      return [];
    };
  };
};
function walkSync(directory) {
  var filelist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!fs.existsSync(directory) || !fs.statSync(directory).isDirectory()) {
    return [];
  };
  var files = $unwrapTraitObject(fs.readdirSync(directory));
  _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: files, $isTraitObject: true }, function (fileName) {
    var file = path.join(directory, fileName);
    if (fs.statSync(file).isDirectory()) {
      walkSync(file, filelist);
    } else {
      _core.List.push.call(filelist, file);
    };
    return [];
  });
  return filelist;
};
function flag(_arguments, name) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

  var index = $unwrapTraitObject(_arguments.indexOf(name));
  if (index >= 0) {
    var value = _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: _arguments, $isTraitObject: true }, index + 1);
    _arguments.splice(index, 2);
    return value;
  } else {
    return defaultValue;
  };
}
