'use strict';

var _core = require('puck-lang/dist/lib/stdlib/core');

var _test = require('puck-lang/dist/lib/stdlib/test');

var _core2 = require('./core');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
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
    (0, _test.describe)("round", function () {
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
    (0, _test.describe)("limit", function () {
      (0, _test.it)("should return the start of range if the number is less than the start", function () {
        (0, _test.expect)(_core2.Num.limit.call(5, {
          start: 10,
          end: 50
        })).toBe(10);
        (0, _test.expect)(_core2.Num.limit.call(0, {
          start: 5,
          end: 50
        })).toBe(5);
        return (0, _test.expect)(_core2.Num.limit.call(-100, {
          start: -50,
          end: -10
        })).toBe(-50);
      });
      (0, _test.it)("should return the end of range if the number is greater than the end", function () {
        (0, _test.expect)(_core2.Num.limit.call(100, {
          start: 10,
          end: 50
        })).toBe(49);
        return (0, _test.expect)(_core2.Num.limit.call(-5, {
          start: -50,
          end: -10
        })).toBe(-11);
      });
      return (0, _test.it)("should return the number if it is with the range", function () {
        (0, _test.expect)(_core2.Num.limit.call(11, {
          start: 10,
          end: 50
        })).toBe(11);
        (0, _test.expect)(_core2.Num.limit.call(49, {
          start: 10,
          end: 50
        })).toBe(49);
        (0, _test.expect)(_core2.Num.limit.call(20, {
          start: 10,
          end: 50
        })).toBe(20);
        (0, _test.expect)(_core2.Num.limit.call(0, {
          start: -10,
          end: 10
        })).toBe(0);
        return (0, _test.expect)(_core2.Num.limit.call(-10, {
          start: -50,
          end: -5
        })).toBe(-10);
      });
    });
    return (0, _test.describe)("cmp", function () {
      (0, _test.it)("should return less for numbers greater than self", function () {
        (0, _test.expect)(_core2.Num.cmp.call(5, 10)).toBe(_core2.Ordering.Less);
        (0, _test.expect)(_core2.Num.cmp.call(0, 1)).toBe(_core2.Ordering.Less);
        return (0, _test.expect)(_core2.Num.cmp.call(-1, 0)).toBe(_core2.Ordering.Less);
      });
      (0, _test.it)("should return greater for numbers less than self", function () {
        (0, _test.expect)(_core2.Num.cmp.call(10, 5)).toBe(_core2.Ordering.Greater);
        (0, _test.expect)(_core2.Num.cmp.call(1, 0)).toBe(_core2.Ordering.Greater);
        return (0, _test.expect)(_core2.Num.cmp.call(0, -1)).toBe(_core2.Ordering.Greater);
      });
      return (0, _test.it)("should return equal for equal numbers", function () {
        (0, _test.expect)(_core2.Num.cmp.call(10, 10)).toBe(_core2.Ordering.Equal);
        (0, _test.expect)(_core2.Num.cmp.call(0, 0)).toBe(_core2.Ordering.Equal);
        return (0, _test.expect)(_core2.Num.cmp.call(-1, -1)).toBe(_core2.Ordering.Equal);
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
    (0, _test.describe)("trimRight", function () {
      return (0, _test.it)("should remove trailing whitespace", function () {
        (0, _test.expect)(_core2.String.trimRight.call("")).toEqual("");
        (0, _test.expect)(_core2.String.trimRight.call("   Hello")).toEqual("   Hello");
        (0, _test.expect)(_core2.String.trimRight.call("Hello   ")).toEqual("Hello");
        return (0, _test.expect)(_core2.String.trimRight.call("   Hello   ")).toEqual("   Hello");
      });
    });
    return (0, _test.describe)("IntoIterator", function () {
      return (0, _test.it)("should return an iterator that iterates over the characters", function () {
        var iterator = _core2.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$String"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$String', value: "ABCåäö", $isTraitObject: true });
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual((0, _core.Some)("A"));
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual((0, _core.Some)("B"));
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual((0, _core.Some)("C"));
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual((0, _core.Some)("å"));
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual((0, _core.Some)("ä"));
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual((0, _core.Some)("ö"));
        return (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual(_core2.None);
      });
    });
  });
  (0, _test.describe)("Option", function () {
    (0, _test.describe)("isSome", function () {
      (0, _test.it)("should return true if Some(value)", function () {
        return (0, _test.expect)(_core2.Option.isSome.call((0, _core.Some)(1))).toBe(true);
      });
      return (0, _test.it)("should return false if None", function () {
        return (0, _test.expect)(_core2.Option.isSome.call(_core2.None)).toBe(false);
      });
    });
    (0, _test.describe)("isNone", function () {
      (0, _test.it)("should return false if Some(value)", function () {
        return (0, _test.expect)(_core2.Option.isNone.call((0, _core.Some)(1))).toBe(false);
      });
      return (0, _test.it)("should return true if None", function () {
        return (0, _test.expect)(_core2.Option.isNone.call(_core2.None)).toBe(true);
      });
    });
    (0, _test.describe)("andThen", function () {
      (0, _test.it)("should map the value if Some(value) and returns Some(newValue)", function () {
        return (0, _test.expect)(_core2.Option.andThen.call((0, _core.Some)(1), function (value) {
          return (0, _core.Some)(value + value);
        })).toEqual((0, _core.Some)(2));
      });
      (0, _test.it)("should not call the map function if None", function () {
        return (0, _test.expect)(_core2.Option.andThen.call(_core2.None, function (value) {
          return (0, _core.panic)("andThen should not called");
        })).toEqual(_core2.None);
      });
      return (0, _test.it)("should return None if Some(value) and returns None", function () {
        return (0, _test.expect)(_core2.Option.andThen.call((0, _core.Some)(1), function (value) {
          return _core2.None;
        })).toEqual(_core2.None);
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
        return (0, _test.expect)(_core2.Option.map.call(_core2.None, function (value) {
          return (0, _core.panic)("map should not called");
        })).toEqual(_core2.None);
      });
    });
    (0, _test.describe)("mapOr", function () {
      (0, _test.it)("should map the value if Some(value)", function () {
        return (0, _test.expect)(_core2.Option.mapOr.call((0, _core.Some)(1), 5, function (value) {
          return value + value;
        })).toBe(2);
      });
      return (0, _test.it)("should return the default value if None", function () {
        return (0, _test.expect)(_core2.Option.mapOr.call(_core2.None, 5, function (value) {
          return (0, _core.panic)("map should not called");
        })).toBe(5);
      });
    });
    (0, _test.describe)("mapOrElse", function () {
      (0, _test.it)("should map the value if Some(value)", function () {
        return (0, _test.expect)($unwrapTraitObject(_core2.Option.mapOrElse.call((0, _core.Some)(1), function () {
          return (0, _core.panic)("orElse should not called");
        }, function (value) {
          return value + value;
        }))).toBe(2);
      });
      return (0, _test.it)("should return the result of the default function if None", function () {
        return (0, _test.expect)(_core2.Option.mapOrElse.call(_core2.None, function () {
          return 5;
        }, function (value) {
          return (0, _core.panic)("map should not called");
        })).toBe(5);
      });
    });
    (0, _test.describe)("unwrap", function () {
      (0, _test.it)("should return the value if Some(value)", function () {
        return (0, _test.expect)(_core2.Option.unwrap.call((0, _core.Some)("value"))).toBe("value");
      });
      return (0, _test.it)("should panic if None", function () {
        return (0, _test.expect)(function () {
          return _core2.Option.unwrap.call(_core2.None);
        }).toThrow();
      });
    });
    (0, _test.describe)("unwrapOr", function () {
      (0, _test.it)("should return the value if Some(value)", function () {
        return (0, _test.expect)(_core2.Option.unwrapOr.call((0, _core.Some)("value"), "default")).toBe("value");
      });
      return (0, _test.it)("should return the default value if None", function () {
        return (0, _test.expect)($unwrapTraitObject(_core2.Option.unwrapOr.call(_core2.None, "default"))).toBe("default");
      });
    });
    return (0, _test.describe)("unwrapOrElse", function () {
      (0, _test.it)("should return the value if Some(value)", function () {
        return (0, _test.expect)(_core2.Option.unwrapOrElse.call((0, _core.Some)("value"), function () {
          return (0, _core.panic)("orElse should not called");
        })).toBe("value");
      });
      return (0, _test.it)("should return the result of the default function if None", function () {
        return (0, _test.expect)($unwrapTraitObject(_core2.Option.unwrapOrElse.call(_core2.None, function () {
          return "default";
        }))).toBe("default");
      });
    });
  });
  (0, _test.describe)("Result", function () {
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
          (0, _core.panic)("andThen should not called");
          return (0, _core.Err)(0);
        })).toEqual((0, _core.Err)(2));
      });
      return (0, _test.it)("should return the error if Ok(value) and returns Err(error)", function () {
        return (0, _test.expect)(_core2.Result.andThen.call((0, _core.Ok)(1), function (__PUCK__value__2) {
          return (0, _core.Err)("error");
        })).toEqual((0, _core.Err)("error"));
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
          return (0, _core.panic)("map should not called");
        })).toEqual((0, _core.Err)(2));
      });
    });
    (0, _test.describe)("mapErr", function () {
      (0, _test.it)("should map the value if Ok(value)", function () {
        (0, _test.expect)(_core2.Result.mapErr.call((0, _core.Err)(1), function (value) {
          return value + value;
        })).toEqual((0, _core.Err)(2));
        return (0, _test.expect)($unwrapTraitObject(_core2.Result.unwrapErr.call(_core2.Result.mapErr.call((0, _core.Err)(2), function (value) {
          return value + value;
        })))).toBe(4);
      });
      return (0, _test.it)("should not call the mapErr function if Err(err)", function () {
        return (0, _test.expect)(_core2.Result.mapErr.call((0, _core.Ok)(2), function (value) {
          return (0, _core.panic)("mapErr should not called");
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
  (0, _test.describe)("Iterator", function () {
    (0, _test.describe)("count", function () {
      return (0, _test.it)("should count the elements in the iterator", function () {
        var __PUCK__value__4 = _core2.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [], $isTraitObject: true });
        (0, _test.expect)(_core2.Iterator[__PUCK__value__4.type].count.call(__PUCK__value__4)).toBe(0);
        var __PUCK__value__5 = _core2.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [1, 2, 3], $isTraitObject: true });
        (0, _test.expect)(_core2.Iterator[__PUCK__value__5.type].count.call(__PUCK__value__5)).toBe(3);
        var __PUCK__value__6 = _core2.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: ["a", "b"], $isTraitObject: true });
        return (0, _test.expect)(_core2.Iterator[__PUCK__value__6.type].count.call(__PUCK__value__6)).toBe(2);
      });
    });
    (0, _test.describe)("EnumerateIterator", function () {
      return (0, _test.it)("should map index and values on the iterator", function () {
        var __PUCK__value__7 = _core2.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [1, 2, 3], $isTraitObject: true });
        var iterator = _core2.Iterator[__PUCK__value__7.type].enumerate.call(__PUCK__value__7);
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual((0, _core.Some)([0, 1]));
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual((0, _core.Some)([1, 2]));
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual((0, _core.Some)([2, 3]));
        return (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual(_core2.None);
      });
    });
    (0, _test.describe)("MapIterator", function () {
      (0, _test.it)("should map values on the iterator", function () {
        var __PUCK__value__8 = _core2.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [1, 2, 3], $isTraitObject: true });
        var iterator = _core2.Iterator[__PUCK__value__8.type].map.call(__PUCK__value__8, function (i) {
          return i * 2;
        });
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual((0, _core.Some)(2));
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual((0, _core.Some)(4));
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual((0, _core.Some)(6));
        return (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual(_core2.None);
      });
      return (0, _test.it)("should map lazily", function () {
        var __PUCK__value__9 = _core2.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [1, 2, 3], $isTraitObject: true });
        var iterator = _core2.Iterator[__PUCK__value__9.type].map.call(__PUCK__value__9, function (i) {
          if (i > 1) {
            throw "Should only be called once";
          };
          return i;
        });
        return (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual((0, _core.Some)(1));
      });
    });
    (0, _test.describe)("filter", function () {
      (0, _test.it)("should remove elements from the iterator that does not match the predicate", function () {
        var predicate = function predicate(i) {
          return i < 3;
        };
        var __PUCK__value__10 = _core2.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [1, 2, 3], $isTraitObject: true });
        var iterator = _core2.Iterator[__PUCK__value__10.type].filter.call(__PUCK__value__10, predicate);
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual((0, _core.Some)(1));
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual((0, _core.Some)(2));
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual(_core2.None);
        predicate = function predicate(i) {
          return i != 2;
        };
        var __PUCK__value__11 = _core2.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [1, 2, 3], $isTraitObject: true });
        iterator = _core2.Iterator[__PUCK__value__11.type].filter.call(__PUCK__value__11, predicate);
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual((0, _core.Some)(1));
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual((0, _core.Some)(3));
        return (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual(_core2.None);
      });
      return (0, _test.it)("should correctly count a filtered iterator", function () {
        var predicate = function predicate(i) {
          return i % 2 == 1;
        };
        var __PUCK__value__12 = _core2.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [1, 2, 3, 4], $isTraitObject: true });
        var iterator = _core2.Iterator[__PUCK__value__12.type].filter.call(__PUCK__value__12, predicate);
        return (0, _test.expect)(_core2.Iterator[iterator.type].count.call(iterator)).toBe(2);
      });
    });
    (0, _test.describe)("filterMap", function () {
      (0, _test.it)("should remove elements from the iterator that does not match the predicate", function () {
        var predicate = function predicate(i) {
          if (i < 3) {
            return (0, _core.Some)(i * 2);
          } else {
            return _core2.None;
          };
        };
        var __PUCK__value__13 = _core2.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [1, 2, 3], $isTraitObject: true });
        var iterator = _core2.Iterator[__PUCK__value__13.type].filterMap.call(__PUCK__value__13, predicate);
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual((0, _core.Some)(2));
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual((0, _core.Some)(4));
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual(_core2.None);
        predicate = function predicate(i) {
          if (i != 2) {
            return (0, _core.Some)(i * 2);
          } else {
            return _core2.None;
          };
        };
        var __PUCK__value__14 = _core2.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [1, 2, 3], $isTraitObject: true });
        iterator = _core2.Iterator[__PUCK__value__14.type].filterMap.call(__PUCK__value__14, predicate);
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual((0, _core.Some)(2));
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual((0, _core.Some)(6));
        return (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual(_core2.None);
      });
      return (0, _test.it)("should correctly count a filtered iterator", function () {
        var predicate = function predicate(i) {
          if (i % 2 == 1) {
            return (0, _core.Some)(i * 2);
          } else {
            return _core2.None;
          };
        };
        var __PUCK__value__15 = _core2.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [1, 2, 3, 4], $isTraitObject: true });
        var iterator = _core2.Iterator[__PUCK__value__15.type].filterMap.call(__PUCK__value__15, predicate);
        return (0, _test.expect)(_core2.Iterator[iterator.type].count.call(iterator)).toBe(2);
      });
    });
    (0, _test.describe)("all", function () {
      (0, _test.it)("should return true for empty iterators", function () {
        var __PUCK__value__16 = _core2.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [], $isTraitObject: true });
        return (0, _test.expect)(_core2.Iterator[__PUCK__value__16.type].all.call(__PUCK__value__16, function (__PUCK__value__17) {
          return false;
        })).toBe(true);
      });
      (0, _test.it)("should return true if all elements matches the predicate", function () {
        var iterator = _core2.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [1, 2, 3], $isTraitObject: true });
        var predicate = function predicate(i) {
          return i > 0;
        };
        return (0, _test.expect)(_core2.Iterator[iterator.type].all.call(iterator, predicate)).toBe(true);
      });
      return (0, _test.it)("should return false if any of the elements does not match the predicate", function () {
        var predicate = function predicate(i) {
          return i > 4;
        };
        var __PUCK__value__18 = _core2.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [1, 2, 3], $isTraitObject: true });
        (0, _test.expect)(_core2.Iterator[__PUCK__value__18.type].all.call(__PUCK__value__18, predicate)).toBe(false);
        var __PUCK__value__19 = _core2.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [4, 5, 6], $isTraitObject: true });
        (0, _test.expect)(_core2.Iterator[__PUCK__value__19.type].all.call(__PUCK__value__19, predicate)).toBe(false);
        var __PUCK__value__20 = _core2.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [6, 5, 4], $isTraitObject: true });
        return (0, _test.expect)(_core2.Iterator[__PUCK__value__20.type].all.call(__PUCK__value__20, predicate)).toBe(false);
      });
    });
    (0, _test.describe)("any", function () {
      (0, _test.it)("should return false for empty iterators", function () {
        var __PUCK__value__21 = _core2.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [], $isTraitObject: true });
        return (0, _test.expect)(_core2.Iterator[__PUCK__value__21.type].any.call(__PUCK__value__21, function (__PUCK__value__22) {
          return true;
        })).toBe(false);
      });
      (0, _test.it)("should return true if any of the elements match the predicate", function () {
        var predicate = function predicate(i) {
          return i > 4;
        };
        var __PUCK__value__23 = _core2.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [1, 2, 5], $isTraitObject: true });
        (0, _test.expect)(_core2.Iterator[__PUCK__value__23.type].any.call(__PUCK__value__23, predicate)).toBe(true);
        var __PUCK__value__24 = _core2.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [4, 5, 6], $isTraitObject: true });
        (0, _test.expect)(_core2.Iterator[__PUCK__value__24.type].any.call(__PUCK__value__24, predicate)).toBe(true);
        var __PUCK__value__25 = _core2.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [6, 1, 2], $isTraitObject: true });
        return (0, _test.expect)(_core2.Iterator[__PUCK__value__25.type].any.call(__PUCK__value__25, predicate)).toBe(true);
      });
      return (0, _test.it)("should return false if none of the elements match the predicate", function () {
        var iterator = _core2.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [1, 2, 3], $isTraitObject: true });
        var predicate = function predicate(i) {
          return i > 4;
        };
        return (0, _test.expect)(_core2.Iterator[iterator.type].any.call(iterator, predicate)).toBe(false);
      });
    });
    return (0, _test.describe)("find", function () {
      (0, _test.it)("should return None for empty iterators", function () {
        var __PUCK__value__26 = _core2.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [], $isTraitObject: true });
        return (0, _test.expect)(_core2.Iterator[__PUCK__value__26.type].find.call(__PUCK__value__26, function (__PUCK__value__27) {
          return true;
        })).toEqual(_core2.None);
      });
      (0, _test.it)("should return the first matching element", function () {
        var predicate = function predicate(i) {
          return i > 4;
        };
        var __PUCK__value__28 = _core2.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [1, 2, 5], $isTraitObject: true });
        (0, _test.expect)(_core2.Iterator[__PUCK__value__28.type].find.call(__PUCK__value__28, predicate)).toEqual((0, _core.Some)(5));
        var __PUCK__value__29 = _core2.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [4, 5, 6], $isTraitObject: true });
        (0, _test.expect)(_core2.Iterator[__PUCK__value__29.type].find.call(__PUCK__value__29, predicate)).toEqual((0, _core.Some)(5));
        var __PUCK__value__30 = _core2.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [6, 1, 2], $isTraitObject: true });
        return (0, _test.expect)(_core2.Iterator[__PUCK__value__30.type].find.call(__PUCK__value__30, predicate)).toEqual((0, _core.Some)(6));
      });
      return (0, _test.it)("should return None if none of the elements match the predicate", function () {
        var iterator = _core2.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [1, 2, 3], $isTraitObject: true });
        var predicate = function predicate(i) {
          return i > 4;
        };
        return (0, _test.expect)(_core2.Iterator[iterator.type].find.call(iterator, predicate)).toEqual(_core2.None);
      });
    });
  });
  (0, _test.describe)("List", function () {
    (0, _test.describe)("Index<Num>", function () {
      (0, _test.it)("should return the specified index", function () {
        (0, _test.expect)($unwrapTraitObject(_core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: [1, 2, 3], $isTraitObject: true }, 0))).toEqual(1);
        (0, _test.expect)($unwrapTraitObject(_core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: [1, 2, 3], $isTraitObject: true }, 1))).toEqual(2);
        return (0, _test.expect)($unwrapTraitObject(_core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: [1, 2, 3], $isTraitObject: true }, 2))).toEqual(3);
      });
      return (0, _test.it)("should panic for out of bounds", function () {
        (0, _test.expect)(function () {
          return _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: [], $isTraitObject: true }, 0);
        }).toThrow();
        (0, _test.expect)(function () {
          return _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: [1, 2, 3], $isTraitObject: true }, 3);
        }).toThrow();
        return (0, _test.expect)(function () {
          return _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: [1, 2, 3], $isTraitObject: true }, -1);
        }).toThrow();
      });
    });
    (0, _test.describe)("IntoIterator", function () {
      return (0, _test.it)("should return an iterator that iterates over the elements", function () {
        var iterator = _core2.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [1, 2, 3], $isTraitObject: true });
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual((0, _core.Some)(1));
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual((0, _core.Some)(2));
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual((0, _core.Some)(3));
        return (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual(_core2.None);
      });
    });
    return (0, _test.describe)("binarySearchBy", function () {
      (0, _test.it)("should return Err(0) for empty lists", function () {
        return (0, _test.expect)(_core2.List.binarySearchBy.call([], function (__PUCK__value__31) {
          return _core2.Ordering.Less;
        })).toEqual((0, _core.Err)(0));
      });
      (0, _test.it)("should return Err(n - 1) if the value is greater than everying", function () {
        return (0, _test.expect)(_core2.List.binarySearchBy.call([1, 2, 3], function (val) {
          return _core2.Num.cmp.call(val, 4);
        })).toEqual((0, _core.Err)(3));
      });
      (0, _test.it)("should return Err(0) if the value is less than everying", function () {
        return (0, _test.expect)(_core2.List.binarySearchBy.call([1, 2, 3], function (val) {
          return _core2.Num.cmp.call(val, 0);
        })).toEqual((0, _core.Err)(0));
      });
      return (0, _test.it)("should return Ok(index) if the value is found", function () {
        return (0, _test.expect)(_core2.List.binarySearchBy.call([1, 2, 3], function (val) {
          return _core2.Num.cmp.call(val, 2);
        })).toEqual((0, _core.Ok)(1));
      });
    });
  });
  (0, _test.describe)("ordering", function () {
    return (0, _test.describe)("reverse", function () {
      (0, _test.it)("should return greater for less", function () {
        return (0, _test.expect)(_core2.Ordering.reverse.call(_core2.Ordering.Less)).toBe(_core2.Ordering.Greater);
      });
      (0, _test.it)("should return equal for equal", function () {
        return (0, _test.expect)(_core2.Ordering.reverse.call(_core2.Ordering.Equal)).toBe(_core2.Ordering.Equal);
      });
      return (0, _test.it)("should return less for greater", function () {
        return (0, _test.expect)(_core2.Ordering.reverse.call(_core2.Ordering.Greater)).toBe(_core2.Ordering.Less);
      });
    });
  });
  return (0, _test.describe)("Range", function () {
    return (0, _test.describe)("IntoIterator", function () {
      return (0, _test.it)("should return an iterator that iterates over the elements", function () {
        var range = {
          start: -3,
          end: 3
        };
        var iterator = _core2.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$lib/stdlib/core.puck:Range"].iter.call({ type: '$impl_lib/stdlib/core.puck:IntoIterator$lib/stdlib/core.puck:Range', value: range, $isTraitObject: true });
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual((0, _core.Some)(-3));
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual((0, _core.Some)(-2));
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual((0, _core.Some)(-1));
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual((0, _core.Some)(0));
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual((0, _core.Some)(1));
        (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual((0, _core.Some)(2));
        return (0, _test.expect)(_core2.Iterator[iterator.type].next.call(iterator)).toEqual(_core2.None);
      });
    });
  });
});
