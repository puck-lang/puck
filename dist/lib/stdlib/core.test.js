'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/test");
const $puck_3 = require("./core");
$puck_2.describe("core", function () {
  $puck_2.describe("Num", function () {
    $puck_2.describe("parseInt", function () {
      $puck_2.it("should default to parse decimal numbers", function () {
        $puck_2.expect($puck_3.Num.parseInt("1")).toEqual($puck_1.Ok(1));
        $puck_2.expect($puck_3.Num.parseInt("0")).toEqual($puck_1.Ok(0));
        $puck_2.expect($puck_3.Num.parseInt("10")).toEqual($puck_1.Ok(10));
        return $puck_2.expect($puck_3.Num.parseInt("-123456789")).toEqual($puck_1.Ok(-123456789));
      });
      $puck_2.it("should be able to parse binary numbers", function () {
        $puck_2.expect($puck_3.Num.parseInt("1", $puck_3.Radix.Binary)).toEqual($puck_1.Ok(1));
        $puck_2.expect($puck_3.Num.parseInt("0", $puck_3.Radix.Binary)).toEqual($puck_1.Ok(0));
        $puck_2.expect($puck_3.Num.parseInt("10", $puck_3.Radix.Binary)).toEqual($puck_1.Ok(2));
        return $puck_2.expect($puck_3.Num.parseInt("-101", $puck_3.Radix.Binary)).toEqual($puck_1.Ok(-5));
      });
      $puck_2.it("should be able to parse octal numbers", function () {
        $puck_2.expect($puck_3.Num.parseInt("1", $puck_3.Radix.Octal)).toEqual($puck_1.Ok(1));
        $puck_2.expect($puck_3.Num.parseInt("0", $puck_3.Radix.Octal)).toEqual($puck_1.Ok(0));
        $puck_2.expect($puck_3.Num.parseInt("10", $puck_3.Radix.Octal)).toEqual($puck_1.Ok(8));
        return $puck_2.expect($puck_3.Num.parseInt("-107", $puck_3.Radix.Octal)).toEqual($puck_1.Ok(-71));
      });
      $puck_2.it("should be able to parse hex numbers", function () {
        $puck_2.expect($puck_3.Num.parseInt("1", $puck_3.Radix.Hex)).toEqual($puck_1.Ok(1));
        $puck_2.expect($puck_3.Num.parseInt("0", $puck_3.Radix.Hex)).toEqual($puck_1.Ok(0));
        $puck_2.expect($puck_3.Num.parseInt("f", $puck_3.Radix.Hex)).toEqual($puck_1.Ok(15));
        $puck_2.expect($puck_3.Num.parseInt("F", $puck_3.Radix.Hex)).toEqual($puck_1.Ok(15));
        $puck_2.expect($puck_3.Num.parseInt("10", $puck_3.Radix.Hex)).toEqual($puck_1.Ok(16));
        $puck_2.expect($puck_3.Num.parseInt("-10e9f", $puck_3.Radix.Hex)).toEqual($puck_1.Ok(-69279));
        return $puck_2.expect($puck_3.Num.parseInt("-10E9F", $puck_3.Radix.Hex)).toEqual($puck_1.Ok(-69279));
      });
      return $puck_2.it("should error for invalid characters", function () {
        $puck_2.expect($puck_3.Num.parseInt("A")).toEqual($puck_1.Err([]));
        $puck_2.expect($puck_3.Num.parseInt("2", $puck_3.Radix.Binary)).toEqual($puck_1.Err([]));
        $puck_2.expect($puck_3.Num.parseInt("8", $puck_3.Radix.Octal)).toEqual($puck_1.Err([]));
        $puck_2.expect($puck_3.Num.parseInt("G", $puck_3.Radix.Hex)).toEqual($puck_1.Err([]));
        $puck_2.expect($puck_3.Num.parseInt("2341A")).toEqual($puck_1.Err([]));
        $puck_2.expect($puck_3.Num.parseInt("1010112", $puck_3.Radix.Binary)).toEqual($puck_1.Err([]));
        $puck_2.expect($puck_3.Num.parseInt("1232648", $puck_3.Radix.Octal)).toEqual($puck_1.Err([]));
        return $puck_2.expect($puck_3.Num.parseInt("1289AC6G", $puck_3.Radix.Hex)).toEqual($puck_1.Err([]));
      });
    });
    $puck_2.describe("parse", function () {
      $puck_2.it("should be able to parse integers", function () {
        $puck_2.expect($puck_3.Num.parse("1")).toEqual($puck_1.Ok(1));
        $puck_2.expect($puck_3.Num.parse("0")).toEqual($puck_1.Ok(0));
        $puck_2.expect($puck_3.Num.parse("10")).toEqual($puck_1.Ok(10));
        return $puck_2.expect($puck_3.Num.parse("-123456789")).toEqual($puck_1.Ok(-123456789));
      });
      return $puck_2.it("should be able to parse doubles", function () {
        $puck_2.expect($puck_3.Num.parse("1.03")).toEqual($puck_1.Ok(1.03));
        $puck_2.expect($puck_3.Num.parse("0.5")).toEqual($puck_1.Ok(0.5));
        $puck_2.expect($puck_3.Num.parse("10.12")).toEqual($puck_1.Ok(10.12));
        return $puck_2.expect($puck_3.Num.parse("-123456789.123")).toEqual($puck_1.Ok(-123456789.123));
      });
    });
    $puck_2.describe("isNan", function () {
      $puck_2.it("should return false for normal numbers", function () {
        $puck_2.expect($puck_3.Num.isNan.call(1)).toBe(false);
        $puck_2.expect($puck_3.Num.isNan.call(1.04)).toBe(false);
        $puck_2.expect($puck_3.Num.isNan.call(100)).toBe(false);
        return $puck_2.expect($puck_3.Num.isNan.call(-50)).toBe(false);
      });
      return $puck_2.it("should return true for nan", function () {
        const nan = 0 / 0;
        return $puck_2.expect($puck_3.Num.isNan.call(nan)).toBe(true);
      });
    });
    $puck_2.describe("isInfinite", function () {
      $puck_2.it("should return false for normal numbers", function () {
        $puck_2.expect($puck_3.Num.isInfinite.call(1)).toBe(false);
        $puck_2.expect($puck_3.Num.isInfinite.call(1.04)).toBe(false);
        $puck_2.expect($puck_3.Num.isInfinite.call(100)).toBe(false);
        return $puck_2.expect($puck_3.Num.isInfinite.call((-50))).toBe(false);
      });
      return $puck_2.it("should return true for infinity", function () {
        const positiveInfinity = 1 / 0;
        const negativeInfinity = (-1 / 0);
        $puck_2.expect($puck_3.Num.isInfinite.call(positiveInfinity)).toBe(true);
        return $puck_2.expect($puck_3.Num.isInfinite.call(negativeInfinity)).toBe(true);
      });
    });
    $puck_2.describe("ceil", function () {
      return $puck_2.it("should should always away from zero", function () {
        $puck_2.expect($puck_3.Num.ceil.call(1)).toBe(1);
        $puck_2.expect($puck_3.Num.ceil.call(1.5)).toBe(2);
        $puck_2.expect((-$puck_3.Num.ceil.call(0.4))).toBe(-1);
        $puck_2.expect($puck_3.Num.ceil.call(10.4)).toBe(11);
        return $puck_2.expect(-$puck_3.Num.ceil.call(10.4)).toBe(-11);
      });
    });
    $puck_2.describe("floor", function () {
      return $puck_2.it("should should always round towards zero", function () {
        $puck_2.expect($puck_3.Num.floor.call(1)).toBe(1);
        $puck_2.expect($puck_3.Num.floor.call(1.5)).toBe(1);
        $puck_2.expect(-$puck_3.Num.floor.call(0.4)).toBe(-0);
        $puck_2.expect($puck_3.Num.floor.call(10.4)).toBe(10);
        return $puck_2.expect(-$puck_3.Num.floor.call(10.4)).toBe(-10);
      });
    });
    $puck_2.describe("round", function () {
      return $puck_2.it("should should round using normal rules", function () {
        $puck_2.expect($puck_3.Num.round.call(1)).toBe(1);
        $puck_2.expect($puck_3.Num.round.call(1.5)).toBe(2);
        $puck_2.expect(-$puck_3.Num.round.call(0.4)).toBe(-0);
        $puck_2.expect(-$puck_3.Num.round.call(0.5)).toBe(-1);
        $puck_2.expect($puck_3.Num.round.call(10.4)).toBe(10);
        $puck_2.expect($puck_3.Num.round.call(10.5)).toBe(11);
        $puck_2.expect(-$puck_3.Num.round.call(10.4)).toBe(-10);
        return $puck_2.expect(-$puck_3.Num.round.call(10.5)).toBe(-11);
      });
    });
    $puck_2.describe("limit", function () {
      $puck_2.it("should return the start of range if the number is less than the start", function () {
        $puck_2.expect($puck_3.Num.limit.call(5, {
          start: 10,
          end: 50,
        })).toBe(10);
        $puck_2.expect($puck_3.Num.limit.call(0, {
          start: 5,
          end: 50,
        })).toBe(5);
        return $puck_2.expect($puck_3.Num.limit.call(-100, {
          start: -50,
          end: -10,
        })).toBe(-50);
      });
      $puck_2.it("should return the end of range if the number is greater than the end", function () {
        $puck_2.expect($puck_3.Num.limit.call(100, {
          start: 10,
          end: 50,
        })).toBe(49);
        return $puck_2.expect($puck_3.Num.limit.call(-5, {
          start: -50,
          end: -10,
        })).toBe(-11);
      });
      return $puck_2.it("should return the number if it is with the range", function () {
        $puck_2.expect($puck_3.Num.limit.call(11, {
          start: 10,
          end: 50,
        })).toBe(11);
        $puck_2.expect($puck_3.Num.limit.call(49, {
          start: 10,
          end: 50,
        })).toBe(49);
        $puck_2.expect($puck_3.Num.limit.call(20, {
          start: 10,
          end: 50,
        })).toBe(20);
        $puck_2.expect($puck_3.Num.limit.call(0, {
          start: -10,
          end: 10,
        })).toBe(0);
        return $puck_2.expect($puck_3.Num.limit.call(-10, {
          start: -50,
          end: -5,
        })).toBe(-10);
      });
    });
    return $puck_2.describe("cmp", function () {
      $puck_2.it("should return less for numbers greater than self", function () {
        $puck_2.expect($puck_3.Num.cmp.call(5, 10)).toBe($puck_3.Ordering.Less);
        $puck_2.expect($puck_3.Num.cmp.call(0, 1)).toBe($puck_3.Ordering.Less);
        return $puck_2.expect($puck_3.Num.cmp.call(-1, 0)).toBe($puck_3.Ordering.Less);
      });
      $puck_2.it("should return greater for numbers less than self", function () {
        $puck_2.expect($puck_3.Num.cmp.call(10, 5)).toBe($puck_3.Ordering.Greater);
        $puck_2.expect($puck_3.Num.cmp.call(1, 0)).toBe($puck_3.Ordering.Greater);
        return $puck_2.expect($puck_3.Num.cmp.call(0, -1)).toBe($puck_3.Ordering.Greater);
      });
      return $puck_2.it("should return equal for equal numbers", function () {
        $puck_2.expect($puck_3.Num.cmp.call(10, 10)).toBe($puck_3.Ordering.Equal);
        $puck_2.expect($puck_3.Num.cmp.call(0, 0)).toBe($puck_3.Ordering.Equal);
        return $puck_2.expect($puck_3.Num.cmp.call(-1, -1)).toBe($puck_3.Ordering.Equal);
      });
    });
  });
  $puck_2.describe("String", function () {
    $puck_2.describe("contains", function () {
      $puck_2.it("should return true if the string contains the substring", function () {
        $puck_2.expect($puck_3.String.contains.call("abcdefg", "abc")).toBe(true);
        $puck_2.expect($puck_3.String.contains.call("abcdefg", "efg")).toBe(true);
        $puck_2.expect($puck_3.String.contains.call("abcdefg", "cde")).toBe(true);
        $puck_2.expect($puck_3.String.contains.call("abcdefg", "c")).toBe(true);
        return $puck_2.expect($puck_3.String.contains.call("abcdefg", "abcdefg")).toBe(true);
      });
      return $puck_2.it("should return false if the string does not contain the substring", function () {
        $puck_2.expect($puck_3.String.contains.call("abcdefg", "cba")).toBe(false);
        $puck_2.expect($puck_3.String.contains.call("abcdefg", "efgh")).toBe(false);
        $puck_2.expect($puck_3.String.contains.call("abcdefg", "ced")).toBe(false);
        $puck_2.expect($puck_3.String.contains.call("abcdefg", "h")).toBe(false);
        return $puck_2.expect($puck_3.String.contains.call("abcdefg", "abcdefgh")).toBe(false);
      });
    });
    $puck_2.describe("startsWith", function () {
      $puck_2.it("should return true if the string starts with the substring", function () {
        $puck_2.expect($puck_3.String.startsWith.call("abc", "")).toBe(true);
        $puck_2.expect($puck_3.String.startsWith.call("abc", "a")).toBe(true);
        $puck_2.expect($puck_3.String.startsWith.call("abc", "ab")).toBe(true);
        return $puck_2.expect($puck_3.String.startsWith.call("abc", "abc")).toBe(true);
      });
      return $puck_2.it("should return false if the string does not start with the substring", function () {
        $puck_2.expect($puck_3.String.startsWith.call("abc", "b")).toBe(false);
        $puck_2.expect($puck_3.String.startsWith.call("abc", "bc")).toBe(false);
        $puck_2.expect($puck_3.String.startsWith.call("abc", "ac")).toBe(false);
        return $puck_2.expect($puck_3.String.startsWith.call("abc", "abcd")).toBe(false);
      });
    });
    $puck_2.describe("endsWith", function () {
      $puck_2.it("should return true if the string ends with the substring", function () {
        $puck_2.expect($puck_3.String.endsWith.call("abc", "")).toBe(true);
        $puck_2.expect($puck_3.String.endsWith.call("abc", "c")).toBe(true);
        $puck_2.expect($puck_3.String.endsWith.call("abc", "bc")).toBe(true);
        return $puck_2.expect($puck_3.String.endsWith.call("abc", "abc")).toBe(true);
      });
      return $puck_2.it("should return false if the string does not end with the substring", function () {
        $puck_2.expect($puck_3.String.endsWith.call("abc", "b")).toBe(false);
        $puck_2.expect($puck_3.String.endsWith.call("abc", "ab")).toBe(false);
        $puck_2.expect($puck_3.String.endsWith.call("abc", "ac")).toBe(false);
        return $puck_2.expect($puck_3.String.endsWith.call("abc", "aabc")).toBe(false);
      });
    });
    $puck_2.describe("split", function () {
      $puck_2.it("should default to split at each character", function () {
        return $puck_2.expect($puck_3.String.split.call("abcdefg")).toEqual([
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
        ]);
      });
      return $puck_2.it("should split at the provided pattern", function () {
        $puck_2.expect($puck_3.String.split.call("hello world", " ")).toEqual([
          "hello",
          "world",
        ]);
        $puck_2.expect($puck_3.String.split.call("hello, world", " ")).toEqual([
          "hello,",
          "world",
        ]);
        return $puck_2.expect($puck_3.String.split.call("hello, world", ", ")).toEqual([
          "hello",
          "world",
        ]);
      });
    });
    $puck_2.describe("sub", function () {
      $puck_2.it("should be able to return the characters for a range", function () {
        $puck_2.expect($puck_3.String.sub.call("abc", $puck_3.Range._new(0, 3))).toBe("abc");
        $puck_2.expect($puck_3.String.sub.call("abc", $puck_3.Range._new(0, 2))).toBe("ab");
        $puck_2.expect($puck_3.String.sub.call("abc", $puck_3.Range._new(0, 0))).toBe("");
        return $puck_2.expect($puck_3.String.sub.call("abc", $puck_3.Range._new(1, 3))).toBe("bc");
      });
      return $puck_2.it("should ignore characters outside the range", function () {
        $puck_2.expect($puck_3.String.sub.call("abc", $puck_3.Range._new(0, 4))).toBe("abc");
        $puck_2.expect($puck_3.String.sub.call("abc", $puck_3.Range._new(-1, 2))).toBe("ab");
        $puck_2.expect($puck_3.String.sub.call("abc", $puck_3.Range._new(-5, 0))).toBe("");
        return $puck_2.expect($puck_3.String.sub.call("abc", $puck_3.Range._new(1, 6))).toBe("bc");
      });
    });
    $puck_2.describe("padLeft", function () {
      $puck_2.it("should not pad the string if the width is >= width", function () {
        $puck_2.expect($puck_3.String.padLeft.call("Hello", 5)).toEqual("Hello");
        $puck_2.expect($puck_3.String.padLeft.call("Hello", 2)).toEqual("Hello");
        return $puck_2.expect($puck_3.String.padLeft.call("Hello", -2)).toEqual("Hello");
      });
      $puck_2.it("should pad the string with spaces if the width is < width", function () {
        return $puck_2.expect($puck_3.String.padLeft.call("Hello", 10)).toEqual("     Hello");
      });
      $puck_2.it("should pad the string with spaces if the passed padding is an empty string and width is < width", function () {
        return $puck_2.expect($puck_3.String.padLeft.call("Hello", 10, "")).toEqual("     Hello");
      });
      return $puck_2.it("should pad the string with passed padding if the width is < width", function () {
        $puck_2.expect($puck_3.String.padLeft.call("Hello", 10, "*")).toEqual("*****Hello");
        return $puck_2.expect($puck_3.String.padLeft.call("Hello", 10, "**")).toEqual("******Hello");
      });
    });
    $puck_2.describe("padRight", function () {
      $puck_2.it("should not pad the string if the width is >= width", function () {
        $puck_2.expect($puck_3.String.padRight.call("Hello", 5)).toEqual("Hello");
        $puck_2.expect($puck_3.String.padRight.call("Hello", 2)).toEqual("Hello");
        return $puck_2.expect($puck_3.String.padRight.call("Hello", -2)).toEqual("Hello");
      });
      $puck_2.it("should pad the string with spaces if the width is < width", function () {
        return $puck_2.expect($puck_3.String.padRight.call("Hello", 10)).toEqual("Hello     ");
      });
      $puck_2.it("should pad the string with spaces if the passed padding is an empty string and width is < width", function () {
        return $puck_2.expect($puck_3.String.padRight.call("Hello", 10, "")).toEqual("Hello     ");
      });
      return $puck_2.it("should pad the string with passed padding if the width is < width", function () {
        $puck_2.expect($puck_3.String.padRight.call("Hello", 10, "*")).toEqual("Hello*****");
        return $puck_2.expect($puck_3.String.padRight.call("Hello", 10, "**")).toEqual("Hello******");
      });
    });
    $puck_2.describe("toLowerCase", function () {
      return $puck_2.it("should convert characters to lower case", function () {
        return $puck_2.expect($puck_3.String.toLowerCase.call("abcABCåäöÅÄÖ")).toEqual("abcabcåäöåäö");
      });
    });
    $puck_2.describe("toUpperCase", function () {
      return $puck_2.it("should convert characters to upper case", function () {
        return $puck_2.expect($puck_3.String.toUpperCase.call("abcABCåäöÅÄÖ")).toEqual("ABCABCÅÄÖÅÄÖ");
      });
    });
    $puck_2.describe("trim", function () {
      return $puck_2.it("should remove whitespace", function () {
        $puck_2.expect($puck_3.String.trim.call("")).toEqual("");
        $puck_2.expect($puck_3.String.trim.call("   Hello")).toEqual("Hello");
        $puck_2.expect($puck_3.String.trim.call("Hello   ")).toEqual("Hello");
        return $puck_2.expect($puck_3.String.trim.call("   Hello   ")).toEqual("Hello");
      });
    });
    $puck_2.describe("trimLeft", function () {
      return $puck_2.it("should remove leading whitespace", function () {
        $puck_2.expect($puck_3.String.trimLeft.call("")).toEqual("");
        $puck_2.expect($puck_3.String.trimLeft.call("   Hello")).toEqual("Hello");
        $puck_2.expect($puck_3.String.trimLeft.call("Hello   ")).toEqual("Hello   ");
        return $puck_2.expect($puck_3.String.trimLeft.call("   Hello   ")).toEqual("Hello   ");
      });
    });
    $puck_2.describe("trimRight", function () {
      return $puck_2.it("should remove trailing whitespace", function () {
        $puck_2.expect($puck_3.String.trimRight.call("")).toEqual("");
        $puck_2.expect($puck_3.String.trimRight.call("   Hello")).toEqual("   Hello");
        $puck_2.expect($puck_3.String.trimRight.call("Hello   ")).toEqual("Hello");
        return $puck_2.expect($puck_3.String.trimRight.call("   Hello   ")).toEqual("   Hello");
      });
    });
    $puck_2.describe("IntoIterator", function () {
      return $puck_2.it("should return an iterator that iterates over the characters", function () {
        let iterator = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$String"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$String', value: "ABCåäö", $isTraitObject: true});
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_1.Some("A"));
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_1.Some("B"));
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_1.Some("C"));
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_1.Some("å"));
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_1.Some("ä"));
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_1.Some("ö"));
        return $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_3.None);
      });
    });
    return $puck_2.describe("Index", function () {
      return $puck_2.it("should be able to return the character at a specific index", function () {
        $puck_2.expect($puck_1.Index["$impl_Index$String"].index.call({type: '$impl_Index$String', value: "abc", $isTraitObject: true}, 0)).toBe("a");
        $puck_2.expect($puck_1.Index["$impl_Index$String"].index.call({type: '$impl_Index$String', value: "abc", $isTraitObject: true}, 1)).toBe("b");
        return $puck_2.expect($puck_1.Index["$impl_Index$String"].index.call({type: '$impl_Index$String', value: "abc", $isTraitObject: true}, 2)).toBe("c");
      });
    });
  });
  $puck_2.describe("Option", function () {
    $puck_2.describe("isSome", function () {
      $puck_2.it("should return true if Some(value)", function () {
        return $puck_2.expect($puck_3.Option.isSome.call($puck_1.Some(1))).toBe(true);
      });
      return $puck_2.it("should return false if None", function () {
        return $puck_2.expect($puck_3.Option.isSome.call($puck_3.None)).toBe(false);
      });
    });
    $puck_2.describe("isNone", function () {
      $puck_2.it("should return false if Some(value)", function () {
        return $puck_2.expect($puck_3.Option.isNone.call($puck_1.Some(1))).toBe(false);
      });
      return $puck_2.it("should return true if None", function () {
        return $puck_2.expect($puck_3.Option.isNone.call($puck_3.None)).toBe(true);
      });
    });
    $puck_2.describe("andValue", function () {
      $puck_2.it("should return the new value if Some(value) and receives Some(newValue)", function () {
        return $puck_2.expect($puck_3.Option.andValue.call($puck_1.Some(1), $puck_1.Some(2))).toEqual($puck_1.Some(2));
      });
      $puck_2.it("should return None if None", function () {
        return $puck_2.expect($puck_3.Option.andValue.call($puck_3.None, $puck_3.None)).toEqual($puck_3.None);
      });
      return $puck_2.it("should return None if Some(value) and receives None", function () {
        return $puck_2.expect($puck_3.Option.andValue.call($puck_1.Some(1), $puck_3.None)).toEqual($puck_3.None);
      });
    });
    $puck_2.describe("andThen", function () {
      $puck_2.it("should map the value if Some(value) and returns Some(newValue)", function () {
        return $puck_2.expect($puck_3.Option.andThen.call($puck_1.Some(1), function (value) {
          return $puck_1.Some(value + value);
        })).toEqual($puck_1.Some(2));
      });
      $puck_2.it("should not call the map function if None", function () {
        return $puck_2.expect($puck_3.Option.andThen.call($puck_3.None, function (value) {
          return $puck_1.panic("andThen should not called");
        })).toEqual($puck_3.None);
      });
      return $puck_2.it("should return None if Some(value) and returns None", function () {
        return $puck_2.expect($puck_3.Option.andThen.call($puck_1.Some(1), function (value) {
          return $puck_3.None;
        })).toEqual($puck_3.None);
      });
    });
    $puck_2.describe("orValue", function () {
      $puck_2.it("should return the new value if None and receives Some(newValue)", function () {
        return $puck_2.expect($puck_3.Option.orValue.call($puck_3.None, $puck_1.Some(2))).toEqual($puck_1.Some(2));
      });
      $puck_2.it("should return the value if Some(value)", function () {
        $puck_2.expect($puck_3.Option.orValue.call($puck_1.Some(2), $puck_1.Some(0))).toEqual($puck_1.Some(2));
        return $puck_2.expect($puck_3.Option.orValue.call($puck_1.Some(2), $puck_3.None)).toEqual($puck_1.Some(2));
      });
      return $puck_2.it("should return None if None and receives None", function () {
        return $puck_2.expect($puck_3.Option.orValue.call($puck_3.None, $puck_3.None)).toEqual($puck_3.None);
      });
    });
    $puck_2.describe("orElse", function () {
      $puck_2.it("should map None if None and returns Some(newValue)", function () {
        return $puck_2.expect($puck_3.Option.orElse.call($puck_3.None, function () {
          return $puck_1.Some(2);
        })).toEqual($puck_1.Some(2));
      });
      $puck_2.it("should not call the map function if Some(value)", function () {
        return $puck_2.expect($puck_3.Option.orElse.call($puck_1.Some(2), function () {
          $puck_1.panic("orElse should not called");
          return $puck_3.None;
        })).toEqual($puck_1.Some(2));
      });
      return $puck_2.it("should return None if None and returns None", function () {
        return $puck_2.expect($puck_3.Option.orElse.call($puck_3.None, function () {
          return $puck_3.None;
        })).toEqual($puck_3.None);
      });
    });
    $puck_2.describe("map", function () {
      $puck_2.it("should map the value if Some(value)", function () {
        $puck_2.expect($puck_3.Option.map.call($puck_1.Some(1), function (value) {
          return value + value;
        })).toEqual($puck_1.Some(2));
        return $puck_2.expect($unwrapTraitObject($puck_3.Option.unwrap.call($puck_3.Option.map.call($puck_1.Some(2), function (value) {
          return value + value;
        })))).toBe(4);
      });
      return $puck_2.it("should not call the map function if None", function () {
        return $puck_2.expect($puck_3.Option.map.call($puck_3.None, function (value) {
          return $puck_1.panic("map should not called");
        })).toEqual($puck_3.None);
      });
    });
    $puck_2.describe("mapOr", function () {
      $puck_2.it("should map the value if Some(value)", function () {
        return $puck_2.expect($puck_3.Option.mapOr.call($puck_1.Some(1), 5, function (value) {
          return value + value;
        })).toBe(2);
      });
      return $puck_2.it("should return the default value if None", function () {
        return $puck_2.expect($puck_3.Option.mapOr.call($puck_3.None, 5, function (value) {
          return $puck_1.panic("map should not called");
        })).toBe(5);
      });
    });
    $puck_2.describe("mapOrElse", function () {
      $puck_2.it("should map the value if Some(value)", function () {
        return $puck_2.expect($unwrapTraitObject($puck_3.Option.mapOrElse.call($puck_1.Some(1), function () {
          return $puck_1.panic("orElse should not called");
        }, function (value) {
          return value + value;
        }))).toBe(2);
      });
      return $puck_2.it("should return the result of the default function if None", function () {
        return $puck_2.expect($puck_3.Option.mapOrElse.call($puck_3.None, function () {
          return 5;
        }, function (value) {
          return $puck_1.panic("map should not called");
        })).toBe(5);
      });
    });
    $puck_2.describe("unwrap", function () {
      $puck_2.it("should return the value if Some(value)", function () {
        return $puck_2.expect($puck_3.Option.unwrap.call($puck_1.Some("value"))).toBe("value");
      });
      return $puck_2.it("should panic if None", function () {
        return $puck_2.expect(function () {
          return $puck_3.Option.unwrap.call($puck_3.None);
        }).toThrow();
      });
    });
    $puck_2.describe("unwrapOr", function () {
      $puck_2.it("should return the value if Some(value)", function () {
        return $puck_2.expect($puck_3.Option.unwrapOr.call($puck_1.Some("value"), "default")).toBe("value");
      });
      return $puck_2.it("should return the default value if None", function () {
        return $puck_2.expect($unwrapTraitObject($puck_3.Option.unwrapOr.call($puck_3.None, "default"))).toBe("default");
      });
    });
    return $puck_2.describe("unwrapOrElse", function () {
      $puck_2.it("should return the value if Some(value)", function () {
        return $puck_2.expect($puck_3.Option.unwrapOrElse.call($puck_1.Some("value"), function () {
          return $puck_1.panic("orElse should not called");
        })).toBe("value");
      });
      return $puck_2.it("should return the result of the default function if None", function () {
        return $puck_2.expect($unwrapTraitObject($puck_3.Option.unwrapOrElse.call($puck_3.None, function () {
          return "default";
        }))).toBe("default");
      });
    });
  });
  $puck_2.describe("Result", function () {
    $puck_2.describe("isOk", function () {
      $puck_2.it("should return true if Ok(value)", function () {
        return $puck_2.expect($puck_3.Result.isOk.call($puck_1.Ok(1))).toBe(true);
      });
      return $puck_2.it("should return false if Err(err)", function () {
        return $puck_2.expect($puck_3.Result.isOk.call($puck_1.Err(2))).toBe(false);
      });
    });
    $puck_2.describe("isErr", function () {
      $puck_2.it("should return false if Ok(value)", function () {
        return $puck_2.expect($puck_3.Result.isErr.call($puck_1.Ok(1))).toBe(false);
      });
      return $puck_2.it("should return true if Err(err)", function () {
        return $puck_2.expect($puck_3.Result.isErr.call($puck_1.Err(2))).toBe(true);
      });
    });
    $puck_2.describe("andValue", function () {
      $puck_2.it("should return the new value if Ok(value) and receives Ok(newValue)", function () {
        return $puck_2.expect($puck_3.Result.andValue.call($puck_1.Ok(1), $puck_1.Ok(2))).toEqual($puck_1.Ok(2));
      });
      $puck_2.it("should return the error if Err(err)", function () {
        return $puck_2.expect($puck_3.Result.andValue.call($puck_1.Err(2), $puck_1.Err(0))).toEqual($puck_1.Err(2));
      });
      return $puck_2.it("should return the error if Ok(value) and receives Err(error)", function () {
        return $puck_2.expect($puck_3.Result.andValue.call($puck_1.Ok(1), $puck_1.Err("error"))).toEqual($puck_1.Err("error"));
      });
    });
    $puck_2.describe("andThen", function () {
      $puck_2.it("should map the value if Ok(value) and returns Ok(newValue)", function () {
        return $puck_2.expect($puck_3.Result.andThen.call($puck_1.Ok(1), function (value) {
          return $puck_1.Ok(value + value);
        })).toEqual($puck_1.Ok(2));
      });
      $puck_2.it("should not call the map function if Err(err)", function () {
        return $puck_2.expect($puck_3.Result.andThen.call($puck_1.Err(2), function ($puck_4) {
          $puck_1.panic("andThen should not called");
          return $puck_1.Err(0);
        })).toEqual($puck_1.Err(2));
      });
      return $puck_2.it("should return the error if Ok(value) and returns Err(error)", function () {
        return $puck_2.expect($puck_3.Result.andThen.call($puck_1.Ok(1), function ($puck_5) {
          return $puck_1.Err("error");
        })).toEqual($puck_1.Err("error"));
      });
    });
    $puck_2.describe("orValue", function () {
      $puck_2.it("should return the new value if Err(err) and receives Ok(newValue)", function () {
        return $puck_2.expect($puck_3.Result.orValue.call($puck_1.Err(1), $puck_1.Ok(2))).toEqual($puck_1.Ok(2));
      });
      $puck_2.it("should return the value if Ok(Value)", function () {
        $puck_2.expect($puck_3.Result.orValue.call($puck_1.Ok(2), $puck_1.Ok(0))).toEqual($puck_1.Ok(2));
        return $puck_2.expect($puck_3.Result.orValue.call($puck_1.Ok(2), $puck_1.Err(0))).toEqual($puck_1.Ok(2));
      });
      return $puck_2.it("should return the error if Err(err) and receives Err(error)", function () {
        return $puck_2.expect($puck_3.Result.orValue.call($puck_1.Err(1), $puck_1.Err("error"))).toEqual($puck_1.Err("error"));
      });
    });
    $puck_2.describe("orElse", function () {
      $puck_2.it("should map the error if Err(err) and returns Ok(newValue)", function () {
        return $puck_2.expect($puck_3.Result.orElse.call($puck_1.Err(1), function (value) {
          return $puck_1.Ok(value + value);
        })).toEqual($puck_1.Ok(2));
      });
      $puck_2.it("should not call the map function if Ok(value)", function () {
        return $puck_2.expect($puck_3.Result.orElse.call($puck_1.Ok(2), function ($puck_6) {
          $puck_1.panic("orElse should not called");
          return $puck_1.Err(0);
        })).toEqual($puck_1.Ok(2));
      });
      return $puck_2.it("should return the error if Err(err) and returns Err(error)", function () {
        return $puck_2.expect($puck_3.Result.orElse.call($puck_1.Err(1), function ($puck_7) {
          return $puck_1.Err("error");
        })).toEqual($puck_1.Err("error"));
      });
    });
    $puck_2.describe("map", function () {
      $puck_2.it("should map the value if Ok(value)", function () {
        $puck_2.expect($puck_3.Result.map.call($puck_1.Ok(1), function (value) {
          return value + value;
        })).toEqual($puck_1.Ok(2));
        return $puck_2.expect($unwrapTraitObject($puck_3.Result.unwrap.call($puck_3.Result.map.call($puck_1.Ok(2), function (value) {
          return value + value;
        })))).toBe(4);
      });
      return $puck_2.it("should not call the map function if Err(err)", function () {
        return $puck_2.expect($puck_3.Result.map.call($puck_1.Err(2), function ($puck_8) {
          return $puck_1.panic("map should not called");
        })).toEqual($puck_1.Err(2));
      });
    });
    $puck_2.describe("mapErr", function () {
      $puck_2.it("should map the value if Ok(value)", function () {
        $puck_2.expect($puck_3.Result.mapErr.call($puck_1.Err(1), function (value) {
          return value + value;
        })).toEqual($puck_1.Err(2));
        return $puck_2.expect($unwrapTraitObject($puck_3.Result.unwrapErr.call($puck_3.Result.mapErr.call($puck_1.Err(2), function (value) {
          return value + value;
        })))).toBe(4);
      });
      return $puck_2.it("should not call the mapErr function if Err(err)", function () {
        return $puck_2.expect($puck_3.Result.mapErr.call($puck_1.Ok(2), function (value) {
          return $puck_1.panic("mapErr should not called");
        })).toEqual($puck_1.Ok(2));
      });
    });
    $puck_2.describe("unwrap", function () {
      $puck_2.it("should return the value if Ok(value)", function () {
        return $puck_2.expect($puck_3.Result.unwrap.call($puck_1.Ok("value"))).toBe("value");
      });
      return $puck_2.it("should panic if Err(err)", function () {
        return $puck_2.expect(function () {
          return $puck_3.Result.unwrap.call($puck_1.Err("err"));
        }).toThrow();
      });
    });
    $puck_2.describe("unwrapOr", function () {
      $puck_2.it("should return the value if Ok(value)", function () {
        return $puck_2.expect($puck_3.Result.unwrapOr.call($puck_1.Ok("value"), "default")).toBe("value");
      });
      return $puck_2.it("should return the default value if Err(err)", function () {
        return $puck_2.expect($unwrapTraitObject($puck_3.Result.unwrapOr.call($puck_1.Err("err"), "default"))).toBe("default");
      });
    });
    $puck_2.describe("unwrapOrElse", function () {
      $puck_2.it("should return the value if Ok(value)", function () {
        return $puck_2.expect($puck_3.Result.unwrapOrElse.call($puck_1.Ok("value"), function () {
          return $puck_1.panic("orElse should not called");
        })).toBe("value");
      });
      return $puck_2.it("should return the result of the default function if Err(err)", function () {
        return $puck_2.expect($unwrapTraitObject($puck_3.Result.unwrapOrElse.call($puck_1.Err("err"), function () {
          return "default";
        }))).toBe("default");
      });
    });
    return $puck_2.describe("unwrapErr", function () {
      $puck_2.it("should panic if Ok(value)", function () {
        return $puck_2.expect(function () {
          return $puck_3.Result.unwrapErr.call($puck_1.Ok("value"));
        }).toThrow();
      });
      return $puck_2.it("should return the error if Err(err)", function () {
        return $puck_2.expect($puck_3.Result.unwrapErr.call($puck_1.Err("err"))).toBe("err");
      });
    });
  });
  $puck_2.describe("Iterator", function () {
    $puck_2.describe("count", function () {
      return $puck_2.it("should count the elements in the iterator", function () {
        let $puck_9 = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [], $isTraitObject: true})
;
        $puck_2.expect($puck_3.Iterator[$puck_9.type].count.call($puck_9)).toBe(0);
        let $puck_10 = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true})
;
        $puck_2.expect($puck_3.Iterator[$puck_10.type].count.call($puck_10)).toBe(3);
        let $puck_11 = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [
          "a",
          "b",
        ], $isTraitObject: true})
;
        return $puck_2.expect($puck_3.Iterator[$puck_11.type].count.call($puck_11)).toBe(2);
      });
    });
    $puck_2.describe("EnumerateIterator", function () {
      return $puck_2.it("should map index and values on the iterator", function () {
        let $puck_12 = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true})
;
        let iterator = $puck_3.Iterator[$puck_12.type].enumerate.call($puck_12);
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_1.Some([
          0,
          1,
        ]));
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_1.Some([
          1,
          2,
        ]));
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_1.Some([
          2,
          3,
        ]));
        return $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_3.None);
      });
    });
    $puck_2.describe("MapIterator", function () {
      $puck_2.it("should map values on the iterator", function () {
        let $puck_13 = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true})
;
        let iterator = $puck_3.Iterator[$puck_13.type].map.call($puck_13, function (i) {
          return i * 2;
        });
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_1.Some(2));
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_1.Some(4));
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_1.Some(6));
        return $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_3.None);
      });
      return $puck_2.it("should map lazily", function () {
        let $puck_14 = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true})
;
        let iterator = $puck_3.Iterator[$puck_14.type].map.call($puck_14, function (i) {
          if ((i > 1)) {
            throw "Should only be called once";
          };
          return i;
        });
        return $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_1.Some(1));
      });
    });
    $puck_2.describe("filter", function () {
      $puck_2.it("should remove elements from the iterator that does not match the predicate", function () {
        let predicate = function (i) {
          return i < 3;
        };
        let $puck_15 = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true})
;
        let iterator = $puck_3.Iterator[$puck_15.type].filter.call($puck_15, predicate);
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_1.Some(1));
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_1.Some(2));
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_3.None);
        predicate = function (i) {
          return i !== 2;
        };
        let $puck_16 = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true})
;
        iterator = $puck_3.Iterator[$puck_16.type].filter.call($puck_16, predicate);
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_1.Some(1));
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_1.Some(3));
        return $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_3.None);
      });
      return $puck_2.it("should correctly count a filtered iterator", function () {
        const predicate = function (i) {
          const mod = i % 2;
          return (mod === 1);
        };
        let $puck_17 = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [
          1,
          2,
          3,
          4,
        ], $isTraitObject: true})
;
        let iterator = $puck_3.Iterator[$puck_17.type].filter.call($puck_17, predicate);
        return $puck_2.expect($puck_3.Iterator[iterator.type].count.call(iterator)).toBe(2);
      });
    });
    $puck_2.describe("filterMap", function () {
      $puck_2.it("should remove elements from the iterator that does not match the predicate", function () {
        let predicate = function (i) {
          if (i < 3) {
            return $puck_1.Some(i * 2);
          }
          else {
            return $puck_3.None;
          };
        };
        let $puck_18 = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true})
;
        let iterator = $puck_3.Iterator[$puck_18.type].filterMap.call($puck_18, predicate);
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_1.Some(2));
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_1.Some(4));
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_3.None);
        predicate = function (i) {
          if ((i !== 2)) {
            return $puck_1.Some(i * 2);
          }
          else {
            return $puck_3.None;
          };
        };
        let $puck_19 = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true})
;
        iterator = $puck_3.Iterator[$puck_19.type].filterMap.call($puck_19, predicate);
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_1.Some(2));
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_1.Some(6));
        return $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_3.None);
      });
      return $puck_2.it("should correctly count a filtered iterator", function () {
        const predicate = function (i) {
          const mod = i % 2;
          if ((mod === 1)) {
            return $puck_1.Some(i * 2);
          }
          else {
            return $puck_3.None;
          };
        };
        let $puck_20 = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [
          1,
          2,
          3,
          4,
        ], $isTraitObject: true})
;
        let iterator = $puck_3.Iterator[$puck_20.type].filterMap.call($puck_20, predicate);
        return $puck_2.expect($puck_3.Iterator[iterator.type].count.call(iterator)).toBe(2);
      });
    });
    $puck_2.describe("fold", function () {
      $puck_2.it("should return the initial value for empty iterators", function () {
        let $puck_21 = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [], $isTraitObject: true})
;
        return $puck_2.expect($puck_3.Iterator[$puck_21.type].fold.call($puck_21, 0, function (sum, val) {
          return (sum + val);
        })).toBe(0);
      });
      return $puck_2.it("should reuce the iteratur with the passed reducere", function () {
        let $puck_22 = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true})
;
        return $puck_2.expect($puck_3.Iterator[$puck_22.type].fold.call($puck_22, 0, function (sum, val) {
          return sum + val;
        })).toBe(6);
      });
    });
    $puck_2.describe("all", function () {
      $puck_2.it("should return true for empty iterators", function () {
        let $puck_23 = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [], $isTraitObject: true})
;
        return $puck_2.expect($puck_3.Iterator[$puck_23.type].all.call($puck_23, function ($puck_24) {
          return false;
        })).toBe(true);
      });
      $puck_2.it("should return true if all elements matches the predicate", function () {
        let iterator = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true});
        const predicate = function (i) {
          return (i > 0);
        };
        return $puck_2.expect($puck_3.Iterator[iterator.type].all.call(iterator, predicate)).toBe(true);
      });
      return $puck_2.it("should return false if any of the elements does not match the predicate", function () {
        const predicate = function (i) {
          return i > 4;
        };
        let $puck_25 = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true})
;
        $puck_2.expect($puck_3.Iterator[$puck_25.type].all.call($puck_25, predicate)).toBe(false);
        let $puck_26 = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [
          4,
          5,
          6,
        ], $isTraitObject: true})
;
        $puck_2.expect($puck_3.Iterator[$puck_26.type].all.call($puck_26, predicate)).toBe(false);
        let $puck_27 = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [
          6,
          5,
          4,
        ], $isTraitObject: true})
;
        return $puck_2.expect($puck_3.Iterator[$puck_27.type].all.call($puck_27, predicate)).toBe(false);
      });
    });
    $puck_2.describe("any", function () {
      $puck_2.it("should return false for empty iterators", function () {
        let $puck_28 = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [], $isTraitObject: true})
;
        return $puck_2.expect($puck_3.Iterator[$puck_28.type].any.call($puck_28, function ($puck_29) {
          return true;
        })).toBe(false);
      });
      $puck_2.it("should return true if any of the elements match the predicate", function () {
        const predicate = function (i) {
          return i > 4;
        };
        let $puck_30 = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [
          1,
          2,
          5,
        ], $isTraitObject: true})
;
        $puck_2.expect($puck_3.Iterator[$puck_30.type].any.call($puck_30, predicate)).toBe(true);
        let $puck_31 = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [
          4,
          5,
          6,
        ], $isTraitObject: true})
;
        $puck_2.expect($puck_3.Iterator[$puck_31.type].any.call($puck_31, predicate)).toBe(true);
        let $puck_32 = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [
          6,
          1,
          2,
        ], $isTraitObject: true})
;
        return $puck_2.expect($puck_3.Iterator[$puck_32.type].any.call($puck_32, predicate)).toBe(true);
      });
      return $puck_2.it("should return false if none of the elements match the predicate", function () {
        let iterator = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true});
        const predicate = function (i) {
          return i > 4;
        };
        return $puck_2.expect($puck_3.Iterator[iterator.type].any.call(iterator, predicate)).toBe(false);
      });
    });
    $puck_2.describe("find", function () {
      $puck_2.it("should return None for empty iterators", function () {
        let $puck_33 = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [], $isTraitObject: true})
;
        return $puck_2.expect($puck_3.Iterator[$puck_33.type].find.call($puck_33, function ($puck_34) {
          return true;
        })).toEqual($puck_3.None);
      });
      $puck_2.it("should return the first matching element", function () {
        const predicate = function (i) {
          return i > 4;
        };
        let $puck_35 = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [
          1,
          2,
          5,
        ], $isTraitObject: true})
;
        $puck_2.expect($puck_3.Iterator[$puck_35.type].find.call($puck_35, predicate)).toEqual($puck_1.Some(5));
        let $puck_36 = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [
          4,
          5,
          6,
        ], $isTraitObject: true})
;
        $puck_2.expect($puck_3.Iterator[$puck_36.type].find.call($puck_36, predicate)).toEqual($puck_1.Some(5));
        let $puck_37 = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [
          6,
          1,
          2,
        ], $isTraitObject: true})
;
        return $puck_2.expect($puck_3.Iterator[$puck_37.type].find.call($puck_37, predicate)).toEqual($puck_1.Some(6));
      });
      return $puck_2.it("should return None if none of the elements match the predicate", function () {
        let iterator = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true});
        const predicate = function (i) {
          return i > 4;
        };
        return $puck_2.expect($puck_3.Iterator[iterator.type].find.call(iterator, predicate)).toEqual($puck_3.None);
      });
    });
    return $puck_2.describe("position", function () {
      $puck_2.it("should return None for empty iterators", function () {
        let $puck_38 = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [], $isTraitObject: true})
;
        return $puck_2.expect($puck_3.Iterator[$puck_38.type].position.call($puck_38, function ($puck_39) {
          return true;
        })).toEqual($puck_3.None);
      });
      $puck_2.it("should return the first matching element index", function () {
        const predicate = function (i) {
          return i > 4;
        };
        let $puck_40 = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [
          1,
          2,
          5,
        ], $isTraitObject: true})
;
        $puck_2.expect($puck_3.Iterator[$puck_40.type].position.call($puck_40, predicate)).toEqual($puck_1.Some(2));
        let $puck_41 = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [
          4,
          5,
          6,
        ], $isTraitObject: true})
;
        $puck_2.expect($puck_3.Iterator[$puck_41.type].position.call($puck_41, predicate)).toEqual($puck_1.Some(1));
        let $puck_42 = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [
          6,
          1,
          2,
        ], $isTraitObject: true})
;
        return $puck_2.expect($puck_3.Iterator[$puck_42.type].position.call($puck_42, predicate)).toEqual($puck_1.Some(0));
      });
      return $puck_2.it("should return None if none of the elements match the predicate", function () {
        let iterator = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true});
        const predicate = function (i) {
          return i > 4;
        };
        return $puck_2.expect($puck_3.Iterator[iterator.type].position.call(iterator, predicate)).toEqual($puck_3.None);
      });
    });
  });
  $puck_2.describe("List", function () {
    $puck_2.describe("Index<Num>", function () {
      $puck_2.it("should return the specified index", function () {
        $puck_2.expect($puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true}, 0)).toEqual(1);
        $puck_2.expect($puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true}, 1)).toEqual(2);
        return $puck_2.expect($puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true}, 2)).toEqual(3);
      });
      return $puck_2.it("should panic for out of bounds", function () {
        $puck_2.expect(function () {
          return $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: [], $isTraitObject: true}, 0);
        }).toThrow();
        $puck_2.expect(function () {
          return $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: [
            1,
            2,
            3,
          ], $isTraitObject: true}, 3);
        }).toThrow();
        return $puck_2.expect(function () {
          return $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: [
            1,
            2,
            3,
          ], $isTraitObject: true}, -1);
        }).toThrow();
      });
    });
    $puck_2.describe("IntoIterator", function () {
      return $puck_2.it("should return an iterator that iterates over the elements", function () {
        let iterator = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true});
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_1.Some(1));
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_1.Some(2));
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_1.Some(3));
        return $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_3.None);
      });
    });
    return $puck_2.describe("binarySearchBy", function () {
      $puck_2.it("should return Err(0) for empty lists", function () {
        return $puck_2.expect($puck_3.List.binarySearchBy.call([], function ($puck_43) {
          return $puck_3.Ordering.Less;
        })).toEqual($puck_1.Err(0));
      });
      $puck_2.it("should return Err(n - 1) if the value is greater than everying", function () {
        return $puck_2.expect($puck_3.List.binarySearchBy.call([
          1,
          2,
          3,
        ], function (val) {
          return $puck_3.Num.cmp.call(val, 4);
        })).toEqual($puck_1.Err(3));
      });
      $puck_2.it("should return Err(0) if the value is less than everying", function () {
        return $puck_2.expect($puck_3.List.binarySearchBy.call([
          1,
          2,
          3,
        ], function (val) {
          return $puck_3.Num.cmp.call(val, 0);
        })).toEqual($puck_1.Err(0));
      });
      return $puck_2.it("should return Ok(index) if the value is found", function () {
        return $puck_2.expect($puck_3.List.binarySearchBy.call([
          1,
          2,
          3,
        ], function (val) {
          return $puck_3.Num.cmp.call(val, 2);
        })).toEqual($puck_1.Ok(1));
      });
    });
  });
  $puck_2.describe("ordering", function () {
    return $puck_2.describe("reverse", function () {
      $puck_2.it("should return greater for less", function () {
        return $puck_2.expect($puck_3.Ordering.reverse.call($puck_3.Ordering.Less)).toBe($puck_3.Ordering.Greater);
      });
      $puck_2.it("should return equal for equal", function () {
        return $puck_2.expect($puck_3.Ordering.reverse.call($puck_3.Ordering.Equal)).toBe($puck_3.Ordering.Equal);
      });
      return $puck_2.it("should return less for greater", function () {
        return $puck_2.expect($puck_3.Ordering.reverse.call($puck_3.Ordering.Greater)).toBe($puck_3.Ordering.Less);
      });
    });
  });
  return $puck_2.describe("Range", function () {
    return $puck_2.describe("IntoIterator", function () {
      return $puck_2.it("should return an iterator that iterates over the elements", function () {
        const range = {
          start: -3,
          end: 3,
        };
        let iterator = $puck_3.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$lib/stdlib/core.puck:Range"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$lib/stdlib/core.puck:Range', value: range, $isTraitObject: true});
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_1.Some(-3));
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_1.Some(-2));
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_1.Some(-1));
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_1.Some(0));
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_1.Some(1));
        $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_1.Some(2));
        return $puck_2.expect($puck_3.Iterator[iterator.type].next.call(iterator)).toEqual($puck_3.None);
      });
    });
  });
})
