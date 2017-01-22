'use strict';

var _core = require('puck-lang/dist/lib/stdlib/core');

var _test = require('puck-lang/dist/lib/stdlib/test');

(0, _test.describe)("core", function () {
  return (0, _test.describe)("String", function () {
    return (0, _test.describe)("contains", function () {
      (0, _test.it)("should return true if the string contains the substring", function () {
        (0, _test.expect)(_core.String.contains.call("abcdefg", "abc")).toBe(true);
        (0, _test.expect)(_core.String.contains.call("abcdefg", "efg")).toBe(true);
        (0, _test.expect)(_core.String.contains.call("abcdefg", "cde")).toBe(true);
        (0, _test.expect)(_core.String.contains.call("abcdefg", "c")).toBe(true);
        return (0, _test.expect)(_core.String.contains.call("abcdefg", "abcdefg")).toBe(true);
      });
      return (0, _test.it)("should return false if the string does not contain the substring", function () {
        (0, _test.expect)(_core.String.contains.call("abcdefg", "cba")).toBe(false);
        (0, _test.expect)(_core.String.contains.call("abcdefg", "efgh")).toBe(false);
        (0, _test.expect)(_core.String.contains.call("abcdefg", "ced")).toBe(false);
        (0, _test.expect)(_core.String.contains.call("abcdefg", "h")).toBe(false);
        return (0, _test.expect)(_core.String.contains.call("abcdefg", "abcdefgh")).toBe(false);
      });
    });
  });
});
