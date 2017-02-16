'use strict';

var _core = require('puck-lang/dist/lib/stdlib/core');

var _test = require('puck-lang/dist/lib/stdlib/test');

var _core2 = require('./core');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};

function any(a) {
  return a;
};
(0, _test.describe)("core", function () {
  (0, _test.describe)("Num", function () {
    (0, _test.describe)("parseInt", function () {
      (0, _test.it)("should default to parse decimal numbers", function () {
        (0, _test.expect)(_core2.Num.parseInt("1")).toEqual((0, _core.Ok)(1));
        (0, _test.expect)(_core2.Num.parseInt("0")).toEqual((0, _core.Ok)(0));
        (0, _test.expect)(_core2.Num.parseInt("10")).toEqual((0, _core.Ok)(10));
        return (0, _test.expect)(_core2.Num.parseInt("-123456789")).toEqual((0, _core.Ok)(-123456789));
      });
      (0, _test.it)("should be able to parse binary numbers", function () {
        (0, _test.expect)(_core2.Num.parseInt("1", _core2.Radix.Binary)).toEqual((0, _core.Ok)(1));
        (0, _test.expect)(_core2.Num.parseInt("0", _core2.Radix.Binary)).toEqual((0, _core.Ok)(0));
        (0, _test.expect)(_core2.Num.parseInt("10", _core2.Radix.Binary)).toEqual((0, _core.Ok)(2));
        return (0, _test.expect)(_core2.Num.parseInt("-101", _core2.Radix.Binary)).toEqual((0, _core.Ok)(-5));
      });
      (0, _test.it)("should be able to parse octal numbers", function () {
        (0, _test.expect)(_core2.Num.parseInt("1", _core2.Radix.Octal)).toEqual((0, _core.Ok)(1));
        (0, _test.expect)(_core2.Num.parseInt("0", _core2.Radix.Octal)).toEqual((0, _core.Ok)(0));
        (0, _test.expect)(_core2.Num.parseInt("10", _core2.Radix.Octal)).toEqual((0, _core.Ok)(8));
        return (0, _test.expect)(_core2.Num.parseInt("-107", _core2.Radix.Octal)).toEqual((0, _core.Ok)(-71));
      });
      (0, _test.it)("should be able to parse hex numbers", function () {
        (0, _test.expect)(_core2.Num.parseInt("1", _core2.Radix.Hex)).toEqual((0, _core.Ok)(1));
        (0, _test.expect)(_core2.Num.parseInt("0", _core2.Radix.Hex)).toEqual((0, _core.Ok)(0));
        (0, _test.expect)(_core2.Num.parseInt("f", _core2.Radix.Hex)).toEqual((0, _core.Ok)(15));
        (0, _test.expect)(_core2.Num.parseInt("F", _core2.Radix.Hex)).toEqual((0, _core.Ok)(15));
        (0, _test.expect)(_core2.Num.parseInt("10", _core2.Radix.Hex)).toEqual((0, _core.Ok)(16));
        (0, _test.expect)(_core2.Num.parseInt("-10e9f", _core2.Radix.Hex)).toEqual((0, _core.Ok)(-69279));
        return (0, _test.expect)(_core2.Num.parseInt("-10E9F", _core2.Radix.Hex)).toEqual((0, _core.Ok)(-69279));
      });
      return (0, _test.it)("should error for invalid characters", function () {
        (0, _test.expect)(_core2.Num.parseInt("A")).toEqual((0, _core.Err)([]));
        (0, _test.expect)(_core2.Num.parseInt("2", _core2.Radix.Binary)).toEqual((0, _core.Err)([]));
        (0, _test.expect)(_core2.Num.parseInt("8", _core2.Radix.Octal)).toEqual((0, _core.Err)([]));
        (0, _test.expect)(_core2.Num.parseInt("G", _core2.Radix.Hex)).toEqual((0, _core.Err)([]));
        (0, _test.expect)(_core2.Num.parseInt("2341A")).toEqual((0, _core.Err)([]));
        (0, _test.expect)(_core2.Num.parseInt("1010112", _core2.Radix.Binary)).toEqual((0, _core.Err)([]));
        (0, _test.expect)(_core2.Num.parseInt("1232648", _core2.Radix.Octal)).toEqual((0, _core.Err)([]));
        return (0, _test.expect)(_core2.Num.parseInt("1289AC6G", _core2.Radix.Hex)).toEqual((0, _core.Err)([]));
      });
    });
    (0, _test.describe)("parse", function () {
      (0, _test.it)("should be able to parse integers", function () {
        (0, _test.expect)(_core2.Num.parse("1")).toEqual((0, _core.Ok)(1));
        (0, _test.expect)(_core2.Num.parse("0")).toEqual((0, _core.Ok)(0));
        (0, _test.expect)(_core2.Num.parse("10")).toEqual((0, _core.Ok)(10));
        return (0, _test.expect)(_core2.Num.parse("-123456789")).toEqual((0, _core.Ok)(-123456789));
      });
      return (0, _test.it)("should be able to parse doubles", function () {
        (0, _test.expect)(_core2.Num.parse("1.03")).toEqual((0, _core.Ok)(1.03));
        (0, _test.expect)(_core2.Num.parse("0.5")).toEqual((0, _core.Ok)(0.5));
        (0, _test.expect)(_core2.Num.parse("10.12")).toEqual((0, _core.Ok)(10.12));
        return (0, _test.expect)(_core2.Num.parse("-123456789.123")).toEqual((0, _core.Ok)(-123456789.123));
      });
    });
    (0, _test.describe)("isNan", function () {
      (0, _test.it)("should return false for normal numbers", function () {
        (0, _test.expect)(_core2.Num.isNan.call(1)).toBe(false);
        (0, _test.expect)(_core2.Num.isNan.call(1.04)).toBe(false);
        (0, _test.expect)(_core2.Num.isNan.call(100)).toBe(false);
        return (0, _test.expect)(_core2.Num.isNan.call(-50)).toBe(false);
      });
      return (0, _test.it)("should return true for nan", function () {
        var nan = 0 / 0;
        return (0, _test.expect)(_core2.Num.isNan.call(nan)).toBe(true);
      });
    });
    (0, _test.describe)("isInfinite", function () {
      (0, _test.it)("should return false for normal numbers", function () {
        (0, _test.expect)(_core2.Num.isInfinite.call(1)).toBe(false);
        (0, _test.expect)(_core2.Num.isInfinite.call(1.04)).toBe(false);
        (0, _test.expect)(_core2.Num.isInfinite.call(100)).toBe(false);
        return (0, _test.expect)(_core2.Num.isInfinite.call(-50)).toBe(false);
      });
      return (0, _test.it)("should return true for infinity", function () {
        var positiveInfinity = 1 / 0;
        var negativeInfinity = -1 / 0;
        (0, _test.expect)(_core2.Num.isInfinite.call(positiveInfinity)).toBe(true);
        return (0, _test.expect)(_core2.Num.isInfinite.call(negativeInfinity)).toBe(true);
      });
    });
    (0, _test.describe)("ceil", function () {
      return (0, _test.it)("should should always away from zero", function () {
        (0, _test.expect)(_core2.Num.ceil.call(1)).toBe(1);
        (0, _test.expect)(_core2.Num.ceil.call(1.5)).toBe(2);
        (0, _test.expect)(-_core2.Num.ceil.call(0.4)).toBe(-1);
        (0, _test.expect)(_core2.Num.ceil.call(10.4)).toBe(11);
        return (0, _test.expect)(-_core2.Num.ceil.call(10.4)).toBe(-11);
      });
    });
    (0, _test.describe)("floor", function () {
      return (0, _test.it)("should should always round towards zero", function () {
        (0, _test.expect)(_core2.Num.floor.call(1)).toBe(1);
        (0, _test.expect)(_core2.Num.floor.call(1.5)).toBe(1);
        (0, _test.expect)(-_core2.Num.floor.call(0.4)).toBe(-0);
        (0, _test.expect)(_core2.Num.floor.call(10.4)).toBe(10);
        return (0, _test.expect)(-_core2.Num.floor.call(10.4)).toBe(-10);
      });
    });
    return (0, _test.describe)("round", function () {
      return (0, _test.it)("should should round using normal rules", function () {
        (0, _test.expect)(_core2.Num.round.call(1)).toBe(1);
        (0, _test.expect)(_core2.Num.round.call(1.5)).toBe(2);
        (0, _test.expect)(-_core2.Num.round.call(0.4)).toBe(-0);
        (0, _test.expect)(-_core2.Num.round.call(0.5)).toBe(-1);
        (0, _test.expect)(_core2.Num.round.call(10.4)).toBe(10);
        (0, _test.expect)(_core2.Num.round.call(10.5)).toBe(11);
        (0, _test.expect)(-_core2.Num.round.call(10.4)).toBe(-10);
        return (0, _test.expect)(-_core2.Num.round.call(10.5)).toBe(-11);
      });
    });
  });
  (0, _test.describe)("String", function () {
    (0, _test.describe)("contains", function () {
      (0, _test.it)("should return true if the string contains the substring", function () {
        (0, _test.expect)(_core2.String.contains.call("abcdefg", "abc")).toBe(true);
        (0, _test.expect)(_core2.String.contains.call("abcdefg", "efg")).toBe(true);
        (0, _test.expect)(_core2.String.contains.call("abcdefg", "cde")).toBe(true);
        (0, _test.expect)(_core2.String.contains.call("abcdefg", "c")).toBe(true);
        return (0, _test.expect)(_core2.String.contains.call("abcdefg", "abcdefg")).toBe(true);
      });
      return (0, _test.it)("should return false if the string does not contain the substring", function () {
        (0, _test.expect)(_core2.String.contains.call("abcdefg", "cba")).toBe(false);
        (0, _test.expect)(_core2.String.contains.call("abcdefg", "efgh")).toBe(false);
        (0, _test.expect)(_core2.String.contains.call("abcdefg", "ced")).toBe(false);
        (0, _test.expect)(_core2.String.contains.call("abcdefg", "h")).toBe(false);
        return (0, _test.expect)(_core2.String.contains.call("abcdefg", "abcdefgh")).toBe(false);
      });
    });
    (0, _test.describe)("split", function () {
      (0, _test.it)("should default to split at each character", function () {
        return (0, _test.expect)(_core2.String.split.call("abcdefg")).toEqual(["a", "b", "c", "d", "e", "f", "g"]);
      });
      return (0, _test.it)("should split at the provided pattern", function () {
        (0, _test.expect)(_core2.String.split.call("hello world", " ")).toEqual(["hello", "world"]);
        (0, _test.expect)(_core2.String.split.call("hello, world", " ")).toEqual(["hello,", "world"]);
        return (0, _test.expect)(_core2.String.split.call("hello, world", ", ")).toEqual(["hello", "world"]);
      });
    });
    (0, _test.describe)("padLeft", function () {
      (0, _test.it)("should not pad the string if the width is >= width", function () {
        (0, _test.expect)(_core2.String.padLeft.call("Hello", 5)).toEqual("Hello");
        (0, _test.expect)(_core2.String.padLeft.call("Hello", 2)).toEqual("Hello");
        return (0, _test.expect)(_core2.String.padLeft.call("Hello", -2)).toEqual("Hello");
      });
      (0, _test.it)("should pad the string with spaces if the width is < width", function () {
        return (0, _test.expect)(_core2.String.padLeft.call("Hello", 10)).toEqual("     Hello");
      });
      (0, _test.it)("should pad the string with spaces if the passed padding is an empty string and width is < width", function () {
        return (0, _test.expect)(_core2.String.padLeft.call("Hello", 10, "")).toEqual("     Hello");
      });
      return (0, _test.it)("should pad the string with passed padding if the width is < width", function () {
        (0, _test.expect)(_core2.String.padLeft.call("Hello", 10, "*")).toEqual("*****Hello");
        return (0, _test.expect)(_core2.String.padLeft.call("Hello", 10, "**")).toEqual("******Hello");
      });
    });
    (0, _test.describe)("padRight", function () {
      (0, _test.it)("should not pad the string if the width is >= width", function () {
        (0, _test.expect)(_core2.String.padRight.call("Hello", 5)).toEqual("Hello");
        (0, _test.expect)(_core2.String.padRight.call("Hello", 2)).toEqual("Hello");
        return (0, _test.expect)(_core2.String.padRight.call("Hello", -2)).toEqual("Hello");
      });
      (0, _test.it)("should pad the string with spaces if the width is < width", function () {
        return (0, _test.expect)(_core2.String.padRight.call("Hello", 10)).toEqual("Hello     ");
      });
      (0, _test.it)("should pad the string with spaces if the passed padding is an empty string and width is < width", function () {
        return (0, _test.expect)(_core2.String.padRight.call("Hello", 10, "")).toEqual("Hello     ");
      });
      return (0, _test.it)("should pad the string with passed padding if the width is < width", function () {
        (0, _test.expect)(_core2.String.padRight.call("Hello", 10, "*")).toEqual("Hello*****");
        return (0, _test.expect)(_core2.String.padRight.call("Hello", 10, "**")).toEqual("Hello******");
      });
    });
    (0, _test.describe)("toLowerCase", function () {
      return (0, _test.it)("should convert characters to lower case", function () {
        return (0, _test.expect)(_core2.String.toLowerCase.call("abcABCåäöÅÄÖ")).toEqual("abcabcåäöåäö");
      });
    });
    (0, _test.describe)("toUpperCase", function () {
      return (0, _test.it)("should convert characters to upper case", function () {
        return (0, _test.expect)(_core2.String.toUpperCase.call("abcABCåäöÅÄÖ")).toEqual("ABCABCÅÄÖÅÄÖ");
      });
    });
    (0, _test.describe)("trim", function () {
      return (0, _test.it)("should remove whitespace", function () {
        (0, _test.expect)(_core2.String.trim.call("")).toEqual("");
        (0, _test.expect)(_core2.String.trim.call("   Hello")).toEqual("Hello");
        (0, _test.expect)(_core2.String.trim.call("Hello   ")).toEqual("Hello");
        return (0, _test.expect)(_core2.String.trim.call("   Hello   ")).toEqual("Hello");
      });
    });
    (0, _test.describe)("trimLeft", function () {
      return (0, _test.it)("should remove leading whitespace", function () {
        (0, _test.expect)(_core2.String.trimLeft.call("")).toEqual("");
        (0, _test.expect)(_core2.String.trimLeft.call("   Hello")).toEqual("Hello");
        (0, _test.expect)(_core2.String.trimLeft.call("Hello   ")).toEqual("Hello   ");
        return (0, _test.expect)(_core2.String.trimLeft.call("   Hello   ")).toEqual("Hello   ");
      });
    });
    return (0, _test.describe)("trimRight", function () {
      return (0, _test.it)("should remove trailing whitespace", function () {
        (0, _test.expect)(_core2.String.trimRight.call("")).toEqual("");
        (0, _test.expect)(_core2.String.trimRight.call("   Hello")).toEqual("   Hello");
        (0, _test.expect)(_core2.String.trimRight.call("Hello   ")).toEqual("Hello");
        return (0, _test.expect)(_core2.String.trimRight.call("   Hello   ")).toEqual("   Hello");
      });
    });
  });
  (0, _test.describe)("Option", function () {
    (0, _test.describe)("isSome", function () {
      (0, _test.it)("should return true if Some(value)", function () {
        return (0, _test.expect)(_core2.Option.isSome.call((0, _core.Some)(1))).toBe(true);
      });
      return (0, _test.it)("should return false if None", function () {
        return (0, _test.expect)(_core2.Option.isSome.call(_core.None)).toBe(false);
      });
    });
    (0, _test.describe)("isNone", function () {
      (0, _test.it)("should return false if Some(value)", function () {
        return (0, _test.expect)(_core2.Option.isNone.call((0, _core.Some)(1))).toBe(false);
      });
      return (0, _test.it)("should return true if None", function () {
        return (0, _test.expect)(_core2.Option.isNone.call(_core.None)).toBe(true);
      });
    });
    (0, _test.describe)("andThen", function () {
      (0, _test.it)("should map the value if Some(value) and returns Some(newValue)", function () {
        return (0, _test.expect)(_core2.Option.andThen.call((0, _core.Some)(1), function (value) {
          return (0, _core.Some)(value + value);
        })).toEqual((0, _core.Some)(2));
      });
      (0, _test.it)("should not call the map function if None", function () {
        return (0, _test.expect)(_core2.Option.andThen.call(_core.None, function (value) {
          return (0, _test.expect)("andThen").toBe("not called");
        })).toEqual(_core.None);
      });
      return (0, _test.it)("should return None if Some(value) and returns None", function () {
        return (0, _test.expect)(_core2.Option.andThen.call((0, _core.Some)(1), function (value) {
          return _core.None;
        })).toEqual(_core.None);
      });
    });
    (0, _test.describe)("map", function () {
      (0, _test.it)("should map the value if Some(value)", function () {
        (0, _test.expect)(_core2.Option.map.call((0, _core.Some)(1), function (value) {
          return value + value;
        })).toEqual((0, _core.Some)(2));
        return (0, _test.expect)($unwrapTraitObject(_core2.Option.unwrap.call(_core2.Option.map.call((0, _core.Some)(2), function (value) {
          return value + value;
        })))).toBe(4);
      });
      return (0, _test.it)("should not call the map function if None", function () {
        return (0, _test.expect)(_core2.Option.map.call(_core.None, function (value) {
          return (0, _test.expect)("map").toBe("not called");
        })).toEqual(_core.None);
      });
    });
    (0, _test.describe)("mapOr", function () {
      (0, _test.it)("should map the value if Some(value)", function () {
        return (0, _test.expect)(_core2.Option.mapOr.call((0, _core.Some)(1), 5, function (value) {
          return value + value;
        })).toBe(2);
      });
      return (0, _test.it)("should return the default value if None", function () {
        return (0, _test.expect)(_core2.Option.mapOr.call(_core.None, 5, function (value) {
          return (0, _test.expect)("map").toBe("not called");
        })).toBe(5);
      });
    });
    (0, _test.describe)("mapOrElse", function () {
      (0, _test.it)("should map the value if Some(value)", function () {
        return (0, _test.expect)(_core2.Option.mapOrElse.call((0, _core.Some)(1), function () {
          (0, _test.expect)("orElse").toBe("not called");
          return 0;
        }, function (value) {
          return value + value;
        })).toBe(2);
      });
      return (0, _test.it)("should return the result of the default function if None", function () {
        return (0, _test.expect)(_core2.Option.mapOrElse.call(_core.None, function () {
          return 5;
        }, function (value) {
          return (0, _test.expect)("map").toBe("not called");
        })).toBe(5);
      });
    });
    (0, _test.describe)("unwrap", function () {
      (0, _test.it)("should return the value if Some(value)", function () {
        return (0, _test.expect)(_core2.Option.unwrap.call((0, _core.Some)("value"))).toBe("value");
      });
      return (0, _test.it)("should panic if None", function () {
        return (0, _test.expect)(function () {
          return _core2.Option.unwrap.call(_core.None);
        }).toThrow();
      });
    });
    (0, _test.describe)("unwrapOr", function () {
      (0, _test.it)("should return the value if Some(value)", function () {
        return (0, _test.expect)(_core2.Option.unwrapOr.call((0, _core.Some)("value"), "default")).toBe("value");
      });
      return (0, _test.it)("should return the default value if None", function () {
        return (0, _test.expect)($unwrapTraitObject(_core2.Option.unwrapOr.call(_core.None, "default"))).toBe("default");
      });
    });
    return (0, _test.describe)("unwrapOrElse", function () {
      (0, _test.it)("should return the value if Some(value)", function () {
        return (0, _test.expect)(_core2.Option.unwrapOrElse.call((0, _core.Some)("value"), function () {
          return (0, _test.expect)("orElse").toBe("not called");
        })).toBe("value");
      });
      return (0, _test.it)("should return the result of the default function if None", function () {
        return (0, _test.expect)($unwrapTraitObject(_core2.Option.unwrapOrElse.call(_core.None, function () {
          return "default";
        }))).toBe("default");
      });
    });
  });
  return (0, _test.describe)("Result", function () {
    (0, _test.describe)("isOk", function () {
      (0, _test.it)("should return true if Ok(value)", function () {
        return (0, _test.expect)(_core2.Result.isOk.call((0, _core.Ok)(1))).toBe(true);
      });
      return (0, _test.it)("should return false if Err(err)", function () {
        return (0, _test.expect)(_core2.Result.isOk.call((0, _core.Err)(2))).toBe(false);
      });
    });
    (0, _test.describe)("isErr", function () {
      (0, _test.it)("should return false if Ok(value)", function () {
        return (0, _test.expect)(_core2.Result.isErr.call((0, _core.Ok)(1))).toBe(false);
      });
      return (0, _test.it)("should return true if Err(err)", function () {
        return (0, _test.expect)(_core2.Result.isErr.call((0, _core.Err)(2))).toBe(true);
      });
    });
    (0, _test.describe)("andThen", function () {
      (0, _test.it)("should map the value if Ok(value) and returns Ok(newValue)", function () {
        return (0, _test.expect)(_core2.Result.andThen.call((0, _core.Ok)(1), function (value) {
          return (0, _core.Ok)(value + value);
        })).toEqual((0, _core.Ok)(2));
      });
      (0, _test.it)("should not call the map function if Err(err)", function () {
        return (0, _test.expect)(_core2.Result.andThen.call((0, _core.Err)(2), function (__PUCK__value__1) {
          (0, _test.expect)("andThen").toBe("not called");
          return any((0, _core.Err)(0));
        })).toEqual(any((0, _core.Err)(2)));
      });
      return (0, _test.it)("should return the error if Ok(value) and returns Err(error)", function () {
        return (0, _test.expect)(_core2.Result.andThen.call((0, _core.Ok)(1), function (__PUCK__value__2) {
          return (0, _core.Err)("error");
        })).toEqual(any((0, _core.Err)("error")));
      });
    });
    (0, _test.describe)("map", function () {
      (0, _test.it)("should map the value if Ok(value)", function () {
        (0, _test.expect)(_core2.Result.map.call((0, _core.Ok)(1), function (value) {
          return value + value;
        })).toEqual((0, _core.Ok)(2));
        return (0, _test.expect)($unwrapTraitObject(_core2.Result.unwrap.call(_core2.Result.map.call((0, _core.Ok)(2), function (value) {
          return value + value;
        })))).toBe(4);
      });
      return (0, _test.it)("should not call the map function if Err(err)", function () {
        return (0, _test.expect)(_core2.Result.map.call((0, _core.Err)(2), function (__PUCK__value__3) {
          return (0, _test.expect)("map").toBe("not called");
        })).toEqual(any((0, _core.Err)(2)));
      });
    });
    (0, _test.describe)("mapErr", function () {
      (0, _test.it)("should map the value if Ok(value)", function () {
        (0, _test.expect)(_core2.Result.mapErr.call((0, _core.Err)(1), function (value) {
          return value + value;
        })).toEqual(any((0, _core.Err)(2)));
        return (0, _test.expect)($unwrapTraitObject(_core2.Result.unwrapErr.call(_core2.Result.mapErr.call((0, _core.Err)(2), function (value) {
          return value + value;
        })))).toBe(4);
      });
      return (0, _test.it)("should not call the mapErr function if Err(err)", function () {
        return (0, _test.expect)(_core2.Result.mapErr.call((0, _core.Ok)(2), function (value) {
          return (0, _test.expect)("mapErr").toBe("not called");
        })).toEqual((0, _core.Ok)(2));
      });
    });
    (0, _test.describe)("unwrap", function () {
      (0, _test.it)("should return the value if Ok(value)", function () {
        return (0, _test.expect)(_core2.Result.unwrap.call((0, _core.Ok)("value"))).toBe("value");
      });
      return (0, _test.it)("should panic if Err(err)", function () {
        return (0, _test.expect)(function () {
          return _core2.Result.unwrap.call((0, _core.Err)("err"));
        }).toThrow();
      });
    });
    return (0, _test.describe)("unwrapErr", function () {
      (0, _test.it)("should panic if Ok(value)", function () {
        return (0, _test.expect)(function () {
          return _core2.Result.unwrapErr.call((0, _core.Ok)("value"));
        }).toThrow();
      });
      return (0, _test.it)("should return the error if Err(err)", function () {
        return (0, _test.expect)(_core2.Result.unwrapErr.call((0, _core.Err)("err"))).toBe("err");
      });
    });
  });
});
