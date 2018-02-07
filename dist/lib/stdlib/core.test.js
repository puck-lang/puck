'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
const $puck_1 = require("puck-lang/dist/lib/stdlib/test");
const $puck_2 = require("./core");
$puck_1.describe("core", function () {
  $puck_1.describe("Num", function () {
    $puck_1.describe("parseInt", function () {
      $puck_1.it("should default to parse decimal numbers", function () {
        $puck_1.expect($puck_2.Num.parseInt("1")).toEqual($puck_2.Ok(1));
        $puck_1.expect($puck_2.Num.parseInt("0")).toEqual($puck_2.Ok(0));
        $puck_1.expect($puck_2.Num.parseInt("10")).toEqual($puck_2.Ok(10));
        return $puck_1.expect($puck_2.Num.parseInt("-123456789")).toEqual($puck_2.Ok(-123456789));
      });
      $puck_1.it("should be able to parse binary numbers", function () {
        $puck_1.expect($puck_2.Num.parseInt("1", $puck_2.Radix.Binary)).toEqual($puck_2.Ok(1));
        $puck_1.expect($puck_2.Num.parseInt("0", $puck_2.Radix.Binary)).toEqual($puck_2.Ok(0));
        $puck_1.expect($puck_2.Num.parseInt("10", $puck_2.Radix.Binary)).toEqual($puck_2.Ok(2));
        return $puck_1.expect($puck_2.Num.parseInt("-101", $puck_2.Radix.Binary)).toEqual($puck_2.Ok(-5));
      });
      $puck_1.it("should be able to parse octal numbers", function () {
        $puck_1.expect($puck_2.Num.parseInt("1", $puck_2.Radix.Octal)).toEqual($puck_2.Ok(1));
        $puck_1.expect($puck_2.Num.parseInt("0", $puck_2.Radix.Octal)).toEqual($puck_2.Ok(0));
        $puck_1.expect($puck_2.Num.parseInt("10", $puck_2.Radix.Octal)).toEqual($puck_2.Ok(8));
        return $puck_1.expect($puck_2.Num.parseInt("-107", $puck_2.Radix.Octal)).toEqual($puck_2.Ok(-71));
      });
      $puck_1.it("should be able to parse hex numbers", function () {
        $puck_1.expect($puck_2.Num.parseInt("1", $puck_2.Radix.Hex)).toEqual($puck_2.Ok(1));
        $puck_1.expect($puck_2.Num.parseInt("0", $puck_2.Radix.Hex)).toEqual($puck_2.Ok(0));
        $puck_1.expect($puck_2.Num.parseInt("f", $puck_2.Radix.Hex)).toEqual($puck_2.Ok(15));
        $puck_1.expect($puck_2.Num.parseInt("F", $puck_2.Radix.Hex)).toEqual($puck_2.Ok(15));
        $puck_1.expect($puck_2.Num.parseInt("10", $puck_2.Radix.Hex)).toEqual($puck_2.Ok(16));
        $puck_1.expect($puck_2.Num.parseInt("-10e9f", $puck_2.Radix.Hex)).toEqual($puck_2.Ok(-69279));
        return $puck_1.expect($puck_2.Num.parseInt("-10E9F", $puck_2.Radix.Hex)).toEqual($puck_2.Ok(-69279));
      });
      return $puck_1.it("should error for invalid characters", function () {
        $puck_1.expect($puck_2.Num.parseInt("A")).toEqual($puck_2.Err(undefined));
        $puck_1.expect($puck_2.Num.parseInt("2", $puck_2.Radix.Binary)).toEqual($puck_2.Err(undefined));
        $puck_1.expect($puck_2.Num.parseInt("8", $puck_2.Radix.Octal)).toEqual($puck_2.Err(undefined));
        $puck_1.expect($puck_2.Num.parseInt("G", $puck_2.Radix.Hex)).toEqual($puck_2.Err(undefined));
        $puck_1.expect($puck_2.Num.parseInt("2341A")).toEqual($puck_2.Err(undefined));
        $puck_1.expect($puck_2.Num.parseInt("1010112", $puck_2.Radix.Binary)).toEqual($puck_2.Err(undefined));
        $puck_1.expect($puck_2.Num.parseInt("1232648", $puck_2.Radix.Octal)).toEqual($puck_2.Err(undefined));
        return $puck_1.expect($puck_2.Num.parseInt("1289AC6G", $puck_2.Radix.Hex)).toEqual($puck_2.Err(undefined));
      });
    });
    $puck_1.describe("parse", function () {
      $puck_1.it("should be able to parse integers", function () {
        $puck_1.expect($puck_2.Num.parse("1")).toEqual($puck_2.Ok(1));
        $puck_1.expect($puck_2.Num.parse("0")).toEqual($puck_2.Ok(0));
        $puck_1.expect($puck_2.Num.parse("10")).toEqual($puck_2.Ok(10));
        return $puck_1.expect($puck_2.Num.parse("-123456789")).toEqual($puck_2.Ok(-123456789));
      });
      return $puck_1.it("should be able to parse doubles", function () {
        $puck_1.expect($puck_2.Num.parse("1.03")).toEqual($puck_2.Ok(1.03));
        $puck_1.expect($puck_2.Num.parse("0.5")).toEqual($puck_2.Ok(0.5));
        $puck_1.expect($puck_2.Num.parse("10.12")).toEqual($puck_2.Ok(10.12));
        return $puck_1.expect($puck_2.Num.parse("-123456789.123")).toEqual($puck_2.Ok(-123456789.123));
      });
    });
    $puck_1.describe("isNan", function () {
      $puck_1.it("should return false for normal numbers", function () {
        $puck_1.expect($puck_2.Num.isNan.call(1)).toBe(false);
        $puck_1.expect($puck_2.Num.isNan.call(1.04)).toBe(false);
        $puck_1.expect($puck_2.Num.isNan.call(100)).toBe(false);
        return $puck_1.expect($puck_2.Num.isNan.call(-50)).toBe(false);
      });
      return $puck_1.it("should return true for nan", function () {
        const nan = 0 / 0;
        return $puck_1.expect($puck_2.Num.isNan.call(nan)).toBe(true);
      });
    });
    $puck_1.describe("isInfinite", function () {
      $puck_1.it("should return false for normal numbers", function () {
        $puck_1.expect($puck_2.Num.isInfinite.call(1)).toBe(false);
        $puck_1.expect($puck_2.Num.isInfinite.call(1.04)).toBe(false);
        $puck_1.expect($puck_2.Num.isInfinite.call(100)).toBe(false);
        return $puck_1.expect($puck_2.Num.isInfinite.call((-50))).toBe(false);
      });
      return $puck_1.it("should return true for infinity", function () {
        const positiveInfinity = 1 / 0;
        const negativeInfinity = (-1 / 0);
        $puck_1.expect($puck_2.Num.isInfinite.call(positiveInfinity)).toBe(true);
        return $puck_1.expect($puck_2.Num.isInfinite.call(negativeInfinity)).toBe(true);
      });
    });
    $puck_1.describe("ceil", function () {
      return $puck_1.it("should should always away from zero", function () {
        $puck_1.expect($puck_2.Num.ceil.call(1)).toBe(1);
        $puck_1.expect($puck_2.Num.ceil.call(1.5)).toBe(2);
        $puck_1.expect((-$puck_2.Num.ceil.call(0.4))).toBe(-1);
        $puck_1.expect($puck_2.Num.ceil.call(10.4)).toBe(11);
        return $puck_1.expect(-$puck_2.Num.ceil.call(10.4)).toBe(-11);
      });
    });
    $puck_1.describe("floor", function () {
      return $puck_1.it("should should always round towards zero", function () {
        $puck_1.expect($puck_2.Num.floor.call(1)).toBe(1);
        $puck_1.expect($puck_2.Num.floor.call(1.5)).toBe(1);
        $puck_1.expect(-$puck_2.Num.floor.call(0.4)).toBe(-0);
        $puck_1.expect($puck_2.Num.floor.call(10.4)).toBe(10);
        return $puck_1.expect(-$puck_2.Num.floor.call(10.4)).toBe(-10);
      });
    });
    $puck_1.describe("round", function () {
      return $puck_1.it("should should round using normal rules", function () {
        $puck_1.expect($puck_2.Num.round.call(1)).toBe(1);
        $puck_1.expect($puck_2.Num.round.call(1.5)).toBe(2);
        $puck_1.expect(-$puck_2.Num.round.call(0.4)).toBe(-0);
        $puck_1.expect(-$puck_2.Num.round.call(0.5)).toBe(-1);
        $puck_1.expect($puck_2.Num.round.call(10.4)).toBe(10);
        $puck_1.expect($puck_2.Num.round.call(10.5)).toBe(11);
        $puck_1.expect(-$puck_2.Num.round.call(10.4)).toBe(-10);
        return $puck_1.expect(-$puck_2.Num.round.call(10.5)).toBe(-11);
      });
    });
    $puck_1.describe("limit", function () {
      $puck_1.it("should return the start of range if the number is less than the start", function () {
        $puck_1.expect($puck_2.Num.limit.call(5, {
          start: 10,
          end: 50,
        })).toBe(10);
        $puck_1.expect($puck_2.Num.limit.call(0, {
          start: 5,
          end: 50,
        })).toBe(5);
        return $puck_1.expect($puck_2.Num.limit.call(-100, {
          start: -50,
          end: -10,
        })).toBe(-50);
      });
      $puck_1.it("should return the end of range if the number is greater than the end", function () {
        $puck_1.expect($puck_2.Num.limit.call(100, {
          start: 10,
          end: 50,
        })).toBe(49);
        return $puck_1.expect($puck_2.Num.limit.call(-5, {
          start: -50,
          end: -10,
        })).toBe(-11);
      });
      return $puck_1.it("should return the number if it is with the range", function () {
        $puck_1.expect($puck_2.Num.limit.call(11, {
          start: 10,
          end: 50,
        })).toBe(11);
        $puck_1.expect($puck_2.Num.limit.call(49, {
          start: 10,
          end: 50,
        })).toBe(49);
        $puck_1.expect($puck_2.Num.limit.call(20, {
          start: 10,
          end: 50,
        })).toBe(20);
        $puck_1.expect($puck_2.Num.limit.call(0, {
          start: -10,
          end: 10,
        })).toBe(0);
        return $puck_1.expect($puck_2.Num.limit.call(-10, {
          start: -50,
          end: -5,
        })).toBe(-10);
      });
    });
    return $puck_1.describe("cmp", function () {
      $puck_1.it("should return less for numbers greater than self", function () {
        $puck_1.expect($puck_2.Num.cmp.call(5, 10)).toBe($puck_2.Ordering.Less);
        $puck_1.expect($puck_2.Num.cmp.call(0, 1)).toBe($puck_2.Ordering.Less);
        return $puck_1.expect($puck_2.Num.cmp.call(-1, 0)).toBe($puck_2.Ordering.Less);
      });
      $puck_1.it("should return greater for numbers less than self", function () {
        $puck_1.expect($puck_2.Num.cmp.call(10, 5)).toBe($puck_2.Ordering.Greater);
        $puck_1.expect($puck_2.Num.cmp.call(1, 0)).toBe($puck_2.Ordering.Greater);
        return $puck_1.expect($puck_2.Num.cmp.call(0, -1)).toBe($puck_2.Ordering.Greater);
      });
      return $puck_1.it("should return equal for equal numbers", function () {
        $puck_1.expect($puck_2.Num.cmp.call(10, 10)).toBe($puck_2.Ordering.Equal);
        $puck_1.expect($puck_2.Num.cmp.call(0, 0)).toBe($puck_2.Ordering.Equal);
        return $puck_1.expect($puck_2.Num.cmp.call(-1, -1)).toBe($puck_2.Ordering.Equal);
      });
    });
  });
  $puck_1.describe("String", function () {
    $puck_1.describe("contains", function () {
      $puck_1.it("should return true if the string contains the substring", function () {
        $puck_1.expect($puck_2.String.contains.call("abcdefg", "abc")).toBe(true);
        $puck_1.expect($puck_2.String.contains.call("abcdefg", "efg")).toBe(true);
        $puck_1.expect($puck_2.String.contains.call("abcdefg", "cde")).toBe(true);
        $puck_1.expect($puck_2.String.contains.call("abcdefg", "c")).toBe(true);
        return $puck_1.expect($puck_2.String.contains.call("abcdefg", "abcdefg")).toBe(true);
      });
      return $puck_1.it("should return false if the string does not contain the substring", function () {
        $puck_1.expect($puck_2.String.contains.call("abcdefg", "cba")).toBe(false);
        $puck_1.expect($puck_2.String.contains.call("abcdefg", "efgh")).toBe(false);
        $puck_1.expect($puck_2.String.contains.call("abcdefg", "ced")).toBe(false);
        $puck_1.expect($puck_2.String.contains.call("abcdefg", "h")).toBe(false);
        return $puck_1.expect($puck_2.String.contains.call("abcdefg", "abcdefgh")).toBe(false);
      });
    });
    $puck_1.describe("startsWith", function () {
      $puck_1.it("should return true if the string starts with the substring", function () {
        $puck_1.expect($puck_2.String.startsWith.call("abc", "")).toBe(true);
        $puck_1.expect($puck_2.String.startsWith.call("abc", "a")).toBe(true);
        $puck_1.expect($puck_2.String.startsWith.call("abc", "ab")).toBe(true);
        return $puck_1.expect($puck_2.String.startsWith.call("abc", "abc")).toBe(true);
      });
      return $puck_1.it("should return false if the string does not start with the substring", function () {
        $puck_1.expect($puck_2.String.startsWith.call("abc", "b")).toBe(false);
        $puck_1.expect($puck_2.String.startsWith.call("abc", "bc")).toBe(false);
        $puck_1.expect($puck_2.String.startsWith.call("abc", "ac")).toBe(false);
        return $puck_1.expect($puck_2.String.startsWith.call("abc", "abcd")).toBe(false);
      });
    });
    $puck_1.describe("endsWith", function () {
      $puck_1.it("should return true if the string ends with the substring", function () {
        $puck_1.expect($puck_2.String.endsWith.call("abc", "")).toBe(true);
        $puck_1.expect($puck_2.String.endsWith.call("abc", "c")).toBe(true);
        $puck_1.expect($puck_2.String.endsWith.call("abc", "bc")).toBe(true);
        return $puck_1.expect($puck_2.String.endsWith.call("abc", "abc")).toBe(true);
      });
      return $puck_1.it("should return false if the string does not end with the substring", function () {
        $puck_1.expect($puck_2.String.endsWith.call("abc", "b")).toBe(false);
        $puck_1.expect($puck_2.String.endsWith.call("abc", "ab")).toBe(false);
        $puck_1.expect($puck_2.String.endsWith.call("abc", "ac")).toBe(false);
        return $puck_1.expect($puck_2.String.endsWith.call("abc", "aabc")).toBe(false);
      });
    });
    $puck_1.describe("split", function () {
      $puck_1.it("should default to split at each character", function () {
        return $puck_1.expect($puck_2.String.split.call("abcdefg")).toEqual([
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
        ]);
      });
      return $puck_1.it("should split at the provided pattern", function () {
        $puck_1.expect($puck_2.String.split.call("hello world", " ")).toEqual([
          "hello",
          "world",
        ]);
        $puck_1.expect($puck_2.String.split.call("hello, world", " ")).toEqual([
          "hello,",
          "world",
        ]);
        return $puck_1.expect($puck_2.String.split.call("hello, world", ", ")).toEqual([
          "hello",
          "world",
        ]);
      });
    });
    $puck_1.describe("sub", function () {
      $puck_1.it("should be able to return the characters for a range", function () {
        $puck_1.expect($puck_2.String.sub.call("abc", $puck_2.Range._new(0, 3))).toBe("abc");
        $puck_1.expect($puck_2.String.sub.call("abc", $puck_2.Range._new(0, 2))).toBe("ab");
        $puck_1.expect($puck_2.String.sub.call("abc", $puck_2.Range._new(0, 0))).toBe("");
        return $puck_1.expect($puck_2.String.sub.call("abc", $puck_2.Range._new(1, 3))).toBe("bc");
      });
      return $puck_1.it("should ignore characters outside the range", function () {
        $puck_1.expect($puck_2.String.sub.call("abc", $puck_2.Range._new(0, 4))).toBe("abc");
        $puck_1.expect($puck_2.String.sub.call("abc", $puck_2.Range._new(-1, 2))).toBe("ab");
        $puck_1.expect($puck_2.String.sub.call("abc", $puck_2.Range._new(-5, 0))).toBe("");
        return $puck_1.expect($puck_2.String.sub.call("abc", $puck_2.Range._new(1, 6))).toBe("bc");
      });
    });
    $puck_1.describe("padLeft", function () {
      $puck_1.it("should not pad the string if the width is >= width", function () {
        $puck_1.expect($puck_2.String.padLeft.call("Hello", 5)).toEqual("Hello");
        $puck_1.expect($puck_2.String.padLeft.call("Hello", 2)).toEqual("Hello");
        return $puck_1.expect($puck_2.String.padLeft.call("Hello", -2)).toEqual("Hello");
      });
      $puck_1.it("should pad the string with spaces if the width is < width", function () {
        return $puck_1.expect($puck_2.String.padLeft.call("Hello", 10)).toEqual("     Hello");
      });
      $puck_1.it("should pad the string with spaces if the passed padding is an empty string and width is < width", function () {
        return $puck_1.expect($puck_2.String.padLeft.call("Hello", 10, "")).toEqual("     Hello");
      });
      return $puck_1.it("should pad the string with passed padding if the width is < width", function () {
        $puck_1.expect($puck_2.String.padLeft.call("Hello", 10, "*")).toEqual("*****Hello");
        return $puck_1.expect($puck_2.String.padLeft.call("Hello", 10, "**")).toEqual("******Hello");
      });
    });
    $puck_1.describe("padRight", function () {
      $puck_1.it("should not pad the string if the width is >= width", function () {
        $puck_1.expect($puck_2.String.padRight.call("Hello", 5)).toEqual("Hello");
        $puck_1.expect($puck_2.String.padRight.call("Hello", 2)).toEqual("Hello");
        return $puck_1.expect($puck_2.String.padRight.call("Hello", -2)).toEqual("Hello");
      });
      $puck_1.it("should pad the string with spaces if the width is < width", function () {
        return $puck_1.expect($puck_2.String.padRight.call("Hello", 10)).toEqual("Hello     ");
      });
      $puck_1.it("should pad the string with spaces if the passed padding is an empty string and width is < width", function () {
        return $puck_1.expect($puck_2.String.padRight.call("Hello", 10, "")).toEqual("Hello     ");
      });
      return $puck_1.it("should pad the string with passed padding if the width is < width", function () {
        $puck_1.expect($puck_2.String.padRight.call("Hello", 10, "*")).toEqual("Hello*****");
        return $puck_1.expect($puck_2.String.padRight.call("Hello", 10, "**")).toEqual("Hello******");
      });
    });
    $puck_1.describe("toLowerCase", function () {
      return $puck_1.it("should convert characters to lower case", function () {
        return $puck_1.expect($puck_2.String.toLowerCase.call("abcABCåäöÅÄÖ")).toEqual("abcabcåäöåäö");
      });
    });
    $puck_1.describe("toUpperCase", function () {
      return $puck_1.it("should convert characters to upper case", function () {
        return $puck_1.expect($puck_2.String.toUpperCase.call("abcABCåäöÅÄÖ")).toEqual("ABCABCÅÄÖÅÄÖ");
      });
    });
    $puck_1.describe("trim", function () {
      return $puck_1.it("should remove whitespace", function () {
        $puck_1.expect($puck_2.String.trim.call("")).toEqual("");
        $puck_1.expect($puck_2.String.trim.call("   Hello")).toEqual("Hello");
        $puck_1.expect($puck_2.String.trim.call("Hello   ")).toEqual("Hello");
        return $puck_1.expect($puck_2.String.trim.call("   Hello   ")).toEqual("Hello");
      });
    });
    $puck_1.describe("trimLeft", function () {
      return $puck_1.it("should remove leading whitespace", function () {
        $puck_1.expect($puck_2.String.trimLeft.call("")).toEqual("");
        $puck_1.expect($puck_2.String.trimLeft.call("   Hello")).toEqual("Hello");
        $puck_1.expect($puck_2.String.trimLeft.call("Hello   ")).toEqual("Hello   ");
        return $puck_1.expect($puck_2.String.trimLeft.call("   Hello   ")).toEqual("Hello   ");
      });
    });
    $puck_1.describe("trimRight", function () {
      return $puck_1.it("should remove trailing whitespace", function () {
        $puck_1.expect($puck_2.String.trimRight.call("")).toEqual("");
        $puck_1.expect($puck_2.String.trimRight.call("   Hello")).toEqual("   Hello");
        $puck_1.expect($puck_2.String.trimRight.call("Hello   ")).toEqual("Hello");
        return $puck_1.expect($puck_2.String.trimRight.call("   Hello   ")).toEqual("   Hello");
      });
    });
    $puck_1.describe("IntoIterator", function () {
      return $puck_1.it("should return an iterator that iterates over the characters", function () {
        let iterator = $puck_2.IntoIterator["$impl_IntoIterator$String"].iter.call({type: '$impl_IntoIterator$String', value: "ABCåäö", $isTraitObject: true});
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.Some("A"));
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.Some("B"));
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.Some("C"));
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.Some("å"));
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.Some("ä"));
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.Some("ö"));
        return $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.None);
      });
    });
    return $puck_1.describe("Index", function () {
      return $puck_1.it("should be able to return the character at a specific index", function () {
        $puck_1.expect($puck_2.Index["$impl_Index$String"].index.call({type: '$impl_Index$String', value: "abc", $isTraitObject: true}, 0)).toBe("a");
        $puck_1.expect($puck_2.Index["$impl_Index$String"].index.call({type: '$impl_Index$String', value: "abc", $isTraitObject: true}, 1)).toBe("b");
        return $puck_1.expect($puck_2.Index["$impl_Index$String"].index.call({type: '$impl_Index$String', value: "abc", $isTraitObject: true}, 2)).toBe("c");
      });
    });
  });
  $puck_1.describe("Option", function () {
    $puck_1.describe("isSome", function () {
      $puck_1.it("should return true if Some(value)", function () {
        return $puck_1.expect($puck_2.Option.isSome.call($puck_2.Some(1))).toBe(true);
      });
      return $puck_1.it("should return false if None", function () {
        return $puck_1.expect($puck_2.Option.isSome.call($puck_2.None)).toBe(false);
      });
    });
    $puck_1.describe("isNone", function () {
      $puck_1.it("should return false if Some(value)", function () {
        return $puck_1.expect($puck_2.Option.isNone.call($puck_2.Some(1))).toBe(false);
      });
      return $puck_1.it("should return true if None", function () {
        return $puck_1.expect($puck_2.Option.isNone.call($puck_2.None)).toBe(true);
      });
    });
    $puck_1.describe("andValue", function () {
      $puck_1.it("should return the new value if Some(value) and receives Some(newValue)", function () {
        return $puck_1.expect($puck_2.Option.andValue.call($puck_2.Some(1), $puck_2.Some(2))).toEqual($puck_2.Some(2));
      });
      $puck_1.it("should return None if None", function () {
        return $puck_1.expect($puck_2.Option.andValue.call($puck_2.None, $puck_2.None)).toEqual($puck_2.None);
      });
      return $puck_1.it("should return None if Some(value) and receives None", function () {
        return $puck_1.expect($puck_2.Option.andValue.call($puck_2.Some(1), $puck_2.None)).toEqual($puck_2.None);
      });
    });
    $puck_1.describe("andThen", function () {
      $puck_1.it("should map the value if Some(value) and returns Some(newValue)", function () {
        return $puck_1.expect($puck_2.Option.andThen.call($puck_2.Some(1), function (value) {
          return $puck_2.Some(value + value);
        })).toEqual($puck_2.Some(2));
      });
      $puck_1.it("should not call the map function if None", function () {
        return $puck_1.expect($puck_2.Option.andThen.call($puck_2.None, function (value) {
          return $puck_2.panic("andThen should not called");
        })).toEqual($puck_2.None);
      });
      return $puck_1.it("should return None if Some(value) and returns None", function () {
        return $puck_1.expect($puck_2.Option.andThen.call($puck_2.Some(1), function (value) {
          return $puck_2.None;
        })).toEqual($puck_2.None);
      });
    });
    $puck_1.describe("orValue", function () {
      $puck_1.it("should return the new value if None and receives Some(newValue)", function () {
        return $puck_1.expect($puck_2.Option.orValue.call($puck_2.None, $puck_2.Some(2))).toEqual($puck_2.Some(2));
      });
      $puck_1.it("should return the value if Some(value)", function () {
        $puck_1.expect($puck_2.Option.orValue.call($puck_2.Some(2), $puck_2.Some(0))).toEqual($puck_2.Some(2));
        return $puck_1.expect($puck_2.Option.orValue.call($puck_2.Some(2), $puck_2.None)).toEqual($puck_2.Some(2));
      });
      return $puck_1.it("should return None if None and receives None", function () {
        return $puck_1.expect($puck_2.Option.orValue.call($puck_2.None, $puck_2.None)).toEqual($puck_2.None);
      });
    });
    $puck_1.describe("orElse", function () {
      $puck_1.it("should map None if None and returns Some(newValue)", function () {
        return $puck_1.expect($puck_2.Option.orElse.call($puck_2.None, function () {
          return $puck_2.Some(2);
        })).toEqual($puck_2.Some(2));
      });
      $puck_1.it("should not call the map function if Some(value)", function () {
        return $puck_1.expect($puck_2.Option.orElse.call($puck_2.Some(2), function () {
          $puck_2.panic("orElse should not called");
          return $puck_2.None;
        })).toEqual($puck_2.Some(2));
      });
      return $puck_1.it("should return None if None and returns None", function () {
        return $puck_1.expect($puck_2.Option.orElse.call($puck_2.None, function () {
          return $puck_2.None;
        })).toEqual($puck_2.None);
      });
    });
    $puck_1.describe("map", function () {
      $puck_1.it("should map the value if Some(value)", function () {
        $puck_1.expect($puck_2.Option.map.call($puck_2.Some(1), function (value) {
          return value + value;
        })).toEqual($puck_2.Some(2));
        return $puck_1.expect($unwrapTraitObject($puck_2.Option.unwrap.call($puck_2.Option.map.call($puck_2.Some(2), function (value) {
          return value + value;
        })))).toBe(4);
      });
      return $puck_1.it("should not call the map function if None", function () {
        return $puck_1.expect($puck_2.Option.map.call($puck_2.None, function (value) {
          return $puck_2.panic("map should not called");
        })).toEqual($puck_2.None);
      });
    });
    $puck_1.describe("mapOr", function () {
      $puck_1.it("should map the value if Some(value)", function () {
        return $puck_1.expect($puck_2.Option.mapOr.call($puck_2.Some(1), 5, function (value) {
          return value + value;
        })).toBe(2);
      });
      return $puck_1.it("should return the default value if None", function () {
        return $puck_1.expect($puck_2.Option.mapOr.call($puck_2.None, 5, function (value) {
          return $puck_2.panic("map should not called");
        })).toBe(5);
      });
    });
    $puck_1.describe("mapOrElse", function () {
      $puck_1.it("should map the value if Some(value)", function () {
        return $puck_1.expect($unwrapTraitObject($puck_2.Option.mapOrElse.call($puck_2.Some(1), function () {
          return $puck_2.panic("orElse should not called");
        }, function (value) {
          return value + value;
        }))).toBe(2);
      });
      return $puck_1.it("should return the result of the default function if None", function () {
        return $puck_1.expect($puck_2.Option.mapOrElse.call($puck_2.None, function () {
          return 5;
        }, function (value) {
          return $puck_2.panic("map should not called");
        })).toBe(5);
      });
    });
    $puck_1.describe("unwrap", function () {
      $puck_1.it("should return the value if Some(value)", function () {
        return $puck_1.expect($puck_2.Option.unwrap.call($puck_2.Some("value"))).toBe("value");
      });
      return $puck_1.it("should panic if None", function () {
        return $puck_1.expect(function () {
          return $puck_2.Option.unwrap.call($puck_2.None);
        }).toThrow();
      });
    });
    $puck_1.describe("unwrapOr", function () {
      $puck_1.it("should return the value if Some(value)", function () {
        return $puck_1.expect($puck_2.Option.unwrapOr.call($puck_2.Some("value"), "default")).toBe("value");
      });
      return $puck_1.it("should return the default value if None", function () {
        return $puck_1.expect($unwrapTraitObject($puck_2.Option.unwrapOr.call($puck_2.None, "default"))).toBe("default");
      });
    });
    return $puck_1.describe("unwrapOrElse", function () {
      $puck_1.it("should return the value if Some(value)", function () {
        return $puck_1.expect($puck_2.Option.unwrapOrElse.call($puck_2.Some("value"), function () {
          return $puck_2.panic("orElse should not called");
        })).toBe("value");
      });
      return $puck_1.it("should return the result of the default function if None", function () {
        return $puck_1.expect($unwrapTraitObject($puck_2.Option.unwrapOrElse.call($puck_2.None, function () {
          return "default";
        }))).toBe("default");
      });
    });
  });
  $puck_1.describe("Result", function () {
    $puck_1.describe("isOk", function () {
      $puck_1.it("should return true if Ok(value)", function () {
        return $puck_1.expect($puck_2.Result.isOk.call($puck_2.Ok(1))).toBe(true);
      });
      return $puck_1.it("should return false if Err(err)", function () {
        return $puck_1.expect($puck_2.Result.isOk.call($puck_2.Err(2))).toBe(false);
      });
    });
    $puck_1.describe("isErr", function () {
      $puck_1.it("should return false if Ok(value)", function () {
        return $puck_1.expect($puck_2.Result.isErr.call($puck_2.Ok(1))).toBe(false);
      });
      return $puck_1.it("should return true if Err(err)", function () {
        return $puck_1.expect($puck_2.Result.isErr.call($puck_2.Err(2))).toBe(true);
      });
    });
    $puck_1.describe("andValue", function () {
      $puck_1.it("should return the new value if Ok(value) and receives Ok(newValue)", function () {
        return $puck_1.expect($puck_2.Result.andValue.call($puck_2.Ok(1), $puck_2.Ok(2))).toEqual($puck_2.Ok(2));
      });
      $puck_1.it("should return the error if Err(err)", function () {
        return $puck_1.expect($puck_2.Result.andValue.call($puck_2.Err(2), $puck_2.Err(0))).toEqual($puck_2.Err(2));
      });
      return $puck_1.it("should return the error if Ok(value) and receives Err(error)", function () {
        return $puck_1.expect($puck_2.Result.andValue.call($puck_2.Ok(1), $puck_2.Err("error"))).toEqual($puck_2.Err("error"));
      });
    });
    $puck_1.describe("andThen", function () {
      $puck_1.it("should map the value if Ok(value) and returns Ok(newValue)", function () {
        return $puck_1.expect($puck_2.Result.andThen.call($puck_2.Ok(1), function (value) {
          return $puck_2.Ok(value + value);
        })).toEqual($puck_2.Ok(2));
      });
      $puck_1.it("should not call the map function if Err(err)", function () {
        return $puck_1.expect($puck_2.Result.andThen.call($puck_2.Err(2), function ($puck_3) {
          $puck_2.panic("andThen should not called");
          return $puck_2.Err(0);
        })).toEqual($puck_2.Err(2));
      });
      return $puck_1.it("should return the error if Ok(value) and returns Err(error)", function () {
        return $puck_1.expect($puck_2.Result.andThen.call($puck_2.Ok(1), function ($puck_4) {
          return $puck_2.Err("error");
        })).toEqual($puck_2.Err("error"));
      });
    });
    $puck_1.describe("orValue", function () {
      $puck_1.it("should return the new value if Err(err) and receives Ok(newValue)", function () {
        return $puck_1.expect($puck_2.Result.orValue.call($puck_2.Err(1), $puck_2.Ok(2))).toEqual($puck_2.Ok(2));
      });
      $puck_1.it("should return the value if Ok(Value)", function () {
        $puck_1.expect($puck_2.Result.orValue.call($puck_2.Ok(2), $puck_2.Ok(0))).toEqual($puck_2.Ok(2));
        return $puck_1.expect($puck_2.Result.orValue.call($puck_2.Ok(2), $puck_2.Err(0))).toEqual($puck_2.Ok(2));
      });
      return $puck_1.it("should return the error if Err(err) and receives Err(error)", function () {
        return $puck_1.expect($puck_2.Result.orValue.call($puck_2.Err(1), $puck_2.Err("error"))).toEqual($puck_2.Err("error"));
      });
    });
    $puck_1.describe("orElse", function () {
      $puck_1.it("should map the error if Err(err) and returns Ok(newValue)", function () {
        return $puck_1.expect($puck_2.Result.orElse.call($puck_2.Err(1), function (value) {
          return $puck_2.Ok(value + value);
        })).toEqual($puck_2.Ok(2));
      });
      $puck_1.it("should not call the map function if Ok(value)", function () {
        return $puck_1.expect($puck_2.Result.orElse.call($puck_2.Ok(2), function ($puck_5) {
          $puck_2.panic("orElse should not called");
          return $puck_2.Err(0);
        })).toEqual($puck_2.Ok(2));
      });
      return $puck_1.it("should return the error if Err(err) and returns Err(error)", function () {
        return $puck_1.expect($puck_2.Result.orElse.call($puck_2.Err(1), function ($puck_6) {
          return $puck_2.Err("error");
        })).toEqual($puck_2.Err("error"));
      });
    });
    $puck_1.describe("map", function () {
      $puck_1.it("should map the value if Ok(value)", function () {
        $puck_1.expect($puck_2.Result.map.call($puck_2.Ok(1), function (value) {
          return value + value;
        })).toEqual($puck_2.Ok(2));
        return $puck_1.expect($unwrapTraitObject($puck_2.Result.unwrap.call($puck_2.Result.map.call($puck_2.Ok(2), function (value) {
          return value + value;
        })))).toBe(4);
      });
      return $puck_1.it("should not call the map function if Err(err)", function () {
        return $puck_1.expect($puck_2.Result.map.call($puck_2.Err(2), function ($puck_7) {
          return $puck_2.panic("map should not called");
        })).toEqual($puck_2.Err(2));
      });
    });
    $puck_1.describe("mapErr", function () {
      $puck_1.it("should map the value if Ok(value)", function () {
        $puck_1.expect($puck_2.Result.mapErr.call($puck_2.Err(1), function (value) {
          return value + value;
        })).toEqual($puck_2.Err(2));
        return $puck_1.expect($unwrapTraitObject($puck_2.Result.unwrapErr.call($puck_2.Result.mapErr.call($puck_2.Err(2), function (value) {
          return value + value;
        })))).toBe(4);
      });
      return $puck_1.it("should not call the mapErr function if Err(err)", function () {
        return $puck_1.expect($puck_2.Result.mapErr.call($puck_2.Ok(2), function (value) {
          return $puck_2.panic("mapErr should not called");
        })).toEqual($puck_2.Ok(2));
      });
    });
    $puck_1.describe("unwrap", function () {
      $puck_1.it("should return the value if Ok(value)", function () {
        return $puck_1.expect($puck_2.Result.unwrap.call($puck_2.Ok("value"))).toBe("value");
      });
      return $puck_1.it("should panic if Err(err)", function () {
        return $puck_1.expect(function () {
          return $puck_2.Result.unwrap.call($puck_2.Err("err"));
        }).toThrow();
      });
    });
    $puck_1.describe("unwrapOr", function () {
      $puck_1.it("should return the value if Ok(value)", function () {
        return $puck_1.expect($puck_2.Result.unwrapOr.call($puck_2.Ok("value"), "default")).toBe("value");
      });
      return $puck_1.it("should return the default value if Err(err)", function () {
        return $puck_1.expect($unwrapTraitObject($puck_2.Result.unwrapOr.call($puck_2.Err("err"), "default"))).toBe("default");
      });
    });
    $puck_1.describe("unwrapOrElse", function () {
      $puck_1.it("should return the value if Ok(value)", function () {
        return $puck_1.expect($puck_2.Result.unwrapOrElse.call($puck_2.Ok("value"), function () {
          return $puck_2.panic("orElse should not called");
        })).toBe("value");
      });
      return $puck_1.it("should return the result of the default function if Err(err)", function () {
        return $puck_1.expect($unwrapTraitObject($puck_2.Result.unwrapOrElse.call($puck_2.Err("err"), function () {
          return "default";
        }))).toBe("default");
      });
    });
    return $puck_1.describe("unwrapErr", function () {
      $puck_1.it("should panic if Ok(value)", function () {
        return $puck_1.expect(function () {
          return $puck_2.Result.unwrapErr.call($puck_2.Ok("value"));
        }).toThrow();
      });
      return $puck_1.it("should return the error if Err(err)", function () {
        return $puck_1.expect($puck_2.Result.unwrapErr.call($puck_2.Err("err"))).toBe("err");
      });
    });
  });
  $puck_1.describe("Iterator", function () {
    $puck_1.describe("count", function () {
      return $puck_1.it("should count the elements in the iterator", function () {
        let $puck_8 = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [], $isTraitObject: true})
;
        $puck_1.expect($puck_2.Iterator[$puck_8.type].count.call($puck_8)).toBe(0);
        let $puck_9 = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true})
;
        $puck_1.expect($puck_2.Iterator[$puck_9.type].count.call($puck_9)).toBe(3);
        let $puck_10 = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [
          "a",
          "b",
        ], $isTraitObject: true})
;
        return $puck_1.expect($puck_2.Iterator[$puck_10.type].count.call($puck_10)).toBe(2);
      });
    });
    $puck_1.describe("EnumerateIterator", function () {
      return $puck_1.it("should map index and values on the iterator", function () {
        let $puck_11 = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true})
;
        let iterator = $puck_2.Iterator[$puck_11.type].enumerate.call($puck_11);
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.Some([
          0,
          1,
        ]));
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.Some([
          1,
          2,
        ]));
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.Some([
          2,
          3,
        ]));
        return $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.None);
      });
    });
    $puck_1.describe("MapIterator", function () {
      $puck_1.it("should map values on the iterator", function () {
        let $puck_12 = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true})
;
        let iterator = $puck_2.Iterator[$puck_12.type].map.call($puck_12, function (i) {
          return i * 2;
        });
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.Some(2));
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.Some(4));
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.Some(6));
        return $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.None);
      });
      return $puck_1.it("should map lazily", function () {
        let $puck_13 = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true})
;
        let iterator = $puck_2.Iterator[$puck_13.type].map.call($puck_13, function (i) {
          if ((i > 1)) {
            throw "Should only be called once";
          };
          return i;
        });
        return $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.Some(1));
      });
    });
    $puck_1.describe("filter", function () {
      $puck_1.it("should remove elements from the iterator that does not match the predicate", function () {
        let predicate = function (i) {
          return i < 3;
        };
        let $puck_14 = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true})
;
        let iterator = $puck_2.Iterator[$puck_14.type].filter.call($puck_14, predicate);
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.Some(1));
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.Some(2));
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.None);
        predicate = function (i) {
          return i !== 2;
        };
        let $puck_15 = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true})
;
        iterator = $puck_2.Iterator[$puck_15.type].filter.call($puck_15, predicate);
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.Some(1));
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.Some(3));
        return $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.None);
      });
      return $puck_1.it("should correctly count a filtered iterator", function () {
        const predicate = function (i) {
          const mod = i % 2;
          return (mod === 1);
        };
        let $puck_16 = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [
          1,
          2,
          3,
          4,
        ], $isTraitObject: true})
;
        let iterator = $puck_2.Iterator[$puck_16.type].filter.call($puck_16, predicate);
        return $puck_1.expect($puck_2.Iterator[iterator.type].count.call(iterator)).toBe(2);
      });
    });
    $puck_1.describe("filterMap", function () {
      $puck_1.it("should remove elements from the iterator that does not match the predicate", function () {
        let predicate = function (i) {
          if (i < 3) {
            return $puck_2.Some(i * 2);
          }
          else {
            return $puck_2.None;
          };
        };
        let $puck_17 = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true})
;
        let iterator = $puck_2.Iterator[$puck_17.type].filterMap.call($puck_17, predicate);
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.Some(2));
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.Some(4));
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.None);
        predicate = function (i) {
          if ((i !== 2)) {
            return $puck_2.Some(i * 2);
          }
          else {
            return $puck_2.None;
          };
        };
        let $puck_18 = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true})
;
        iterator = $puck_2.Iterator[$puck_18.type].filterMap.call($puck_18, predicate);
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.Some(2));
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.Some(6));
        return $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.None);
      });
      return $puck_1.it("should correctly count a filtered iterator", function () {
        const predicate = function (i) {
          const mod = i % 2;
          if ((mod === 1)) {
            return $puck_2.Some(i * 2);
          }
          else {
            return $puck_2.None;
          };
        };
        let $puck_19 = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [
          1,
          2,
          3,
          4,
        ], $isTraitObject: true})
;
        let iterator = $puck_2.Iterator[$puck_19.type].filterMap.call($puck_19, predicate);
        return $puck_1.expect($puck_2.Iterator[iterator.type].count.call(iterator)).toBe(2);
      });
    });
    $puck_1.describe("fold", function () {
      $puck_1.it("should return the initial value for empty iterators", function () {
        let $puck_20 = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [], $isTraitObject: true})
;
        return $puck_1.expect($puck_2.Iterator[$puck_20.type].fold.call($puck_20, 0, function (sum, val) {
          return (sum + val);
        })).toBe(0);
      });
      return $puck_1.it("should reuce the iteratur with the passed reducere", function () {
        let $puck_21 = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true})
;
        return $puck_1.expect($puck_2.Iterator[$puck_21.type].fold.call($puck_21, 0, function (sum, val) {
          return sum + val;
        })).toBe(6);
      });
    });
    $puck_1.describe("all", function () {
      $puck_1.it("should return true for empty iterators", function () {
        let $puck_22 = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [], $isTraitObject: true})
;
        return $puck_1.expect($puck_2.Iterator[$puck_22.type].all.call($puck_22, function ($puck_23) {
          return false;
        })).toBe(true);
      });
      $puck_1.it("should return true if all elements matches the predicate", function () {
        let iterator = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true});
        const predicate = function (i) {
          return (i > 0);
        };
        return $puck_1.expect($puck_2.Iterator[iterator.type].all.call(iterator, predicate)).toBe(true);
      });
      return $puck_1.it("should return false if any of the elements does not match the predicate", function () {
        const predicate = function (i) {
          return i > 4;
        };
        let $puck_24 = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true})
;
        $puck_1.expect($puck_2.Iterator[$puck_24.type].all.call($puck_24, predicate)).toBe(false);
        let $puck_25 = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [
          4,
          5,
          6,
        ], $isTraitObject: true})
;
        $puck_1.expect($puck_2.Iterator[$puck_25.type].all.call($puck_25, predicate)).toBe(false);
        let $puck_26 = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [
          6,
          5,
          4,
        ], $isTraitObject: true})
;
        return $puck_1.expect($puck_2.Iterator[$puck_26.type].all.call($puck_26, predicate)).toBe(false);
      });
    });
    $puck_1.describe("any", function () {
      $puck_1.it("should return false for empty iterators", function () {
        let $puck_27 = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [], $isTraitObject: true})
;
        return $puck_1.expect($puck_2.Iterator[$puck_27.type].any.call($puck_27, function ($puck_28) {
          return true;
        })).toBe(false);
      });
      $puck_1.it("should return true if any of the elements match the predicate", function () {
        const predicate = function (i) {
          return i > 4;
        };
        let $puck_29 = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [
          1,
          2,
          5,
        ], $isTraitObject: true})
;
        $puck_1.expect($puck_2.Iterator[$puck_29.type].any.call($puck_29, predicate)).toBe(true);
        let $puck_30 = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [
          4,
          5,
          6,
        ], $isTraitObject: true})
;
        $puck_1.expect($puck_2.Iterator[$puck_30.type].any.call($puck_30, predicate)).toBe(true);
        let $puck_31 = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [
          6,
          1,
          2,
        ], $isTraitObject: true})
;
        return $puck_1.expect($puck_2.Iterator[$puck_31.type].any.call($puck_31, predicate)).toBe(true);
      });
      return $puck_1.it("should return false if none of the elements match the predicate", function () {
        let iterator = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true});
        const predicate = function (i) {
          return i > 4;
        };
        return $puck_1.expect($puck_2.Iterator[iterator.type].any.call(iterator, predicate)).toBe(false);
      });
    });
    $puck_1.describe("find", function () {
      $puck_1.it("should return None for empty iterators", function () {
        let $puck_32 = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [], $isTraitObject: true})
;
        return $puck_1.expect($puck_2.Iterator[$puck_32.type].find.call($puck_32, function ($puck_33) {
          return true;
        })).toEqual($puck_2.None);
      });
      $puck_1.it("should return the first matching element", function () {
        const predicate = function (i) {
          return i > 4;
        };
        let $puck_34 = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [
          1,
          2,
          5,
        ], $isTraitObject: true})
;
        $puck_1.expect($puck_2.Iterator[$puck_34.type].find.call($puck_34, predicate)).toEqual($puck_2.Some(5));
        let $puck_35 = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [
          4,
          5,
          6,
        ], $isTraitObject: true})
;
        $puck_1.expect($puck_2.Iterator[$puck_35.type].find.call($puck_35, predicate)).toEqual($puck_2.Some(5));
        let $puck_36 = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [
          6,
          1,
          2,
        ], $isTraitObject: true})
;
        return $puck_1.expect($puck_2.Iterator[$puck_36.type].find.call($puck_36, predicate)).toEqual($puck_2.Some(6));
      });
      return $puck_1.it("should return None if none of the elements match the predicate", function () {
        let iterator = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true});
        const predicate = function (i) {
          return i > 4;
        };
        return $puck_1.expect($puck_2.Iterator[iterator.type].find.call(iterator, predicate)).toEqual($puck_2.None);
      });
    });
    return $puck_1.describe("position", function () {
      $puck_1.it("should return None for empty iterators", function () {
        let $puck_37 = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [], $isTraitObject: true})
;
        return $puck_1.expect($puck_2.Iterator[$puck_37.type].position.call($puck_37, function ($puck_38) {
          return true;
        })).toEqual($puck_2.None);
      });
      $puck_1.it("should return the first matching element index", function () {
        const predicate = function (i) {
          return i > 4;
        };
        let $puck_39 = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [
          1,
          2,
          5,
        ], $isTraitObject: true})
;
        $puck_1.expect($puck_2.Iterator[$puck_39.type].position.call($puck_39, predicate)).toEqual($puck_2.Some(2));
        let $puck_40 = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [
          4,
          5,
          6,
        ], $isTraitObject: true})
;
        $puck_1.expect($puck_2.Iterator[$puck_40.type].position.call($puck_40, predicate)).toEqual($puck_2.Some(1));
        let $puck_41 = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [
          6,
          1,
          2,
        ], $isTraitObject: true})
;
        return $puck_1.expect($puck_2.Iterator[$puck_41.type].position.call($puck_41, predicate)).toEqual($puck_2.Some(0));
      });
      return $puck_1.it("should return None if none of the elements match the predicate", function () {
        let iterator = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true});
        const predicate = function (i) {
          return i > 4;
        };
        return $puck_1.expect($puck_2.Iterator[iterator.type].position.call(iterator, predicate)).toEqual($puck_2.None);
      });
    });
  });
  $puck_1.describe("List", function () {
    $puck_1.describe("Index<Num>", function () {
      $puck_1.it("should return the specified index", function () {
        $puck_1.expect($puck_2.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true}, 0)).toEqual(1);
        $puck_1.expect($puck_2.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true}, 1)).toEqual(2);
        return $puck_1.expect($puck_2.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true}, 2)).toEqual(3);
      });
      return $puck_1.it("should panic for out of bounds", function () {
        $puck_1.expect(function () {
          return $puck_2.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: [], $isTraitObject: true}, 0);
        }).toThrow();
        $puck_1.expect(function () {
          return $puck_2.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: [
            1,
            2,
            3,
          ], $isTraitObject: true}, 3);
        }).toThrow();
        return $puck_1.expect(function () {
          return $puck_2.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: [
            1,
            2,
            3,
          ], $isTraitObject: true}, -1);
        }).toThrow();
      });
    });
    $puck_1.describe("IntoIterator", function () {
      return $puck_1.it("should return an iterator that iterates over the elements", function () {
        let iterator = $puck_2.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: [
          1,
          2,
          3,
        ], $isTraitObject: true});
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.Some(1));
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.Some(2));
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.Some(3));
        return $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.None);
      });
    });
    return $puck_1.describe("binarySearchBy", function () {
      $puck_1.it("should return Err(0) for empty lists", function () {
        return $puck_1.expect($puck_2.List.binarySearchBy.call([], function ($puck_42) {
          return $puck_2.Ordering.Less;
        })).toEqual($puck_2.Err(0));
      });
      $puck_1.it("should return Err(n - 1) if the value is greater than everying", function () {
        return $puck_1.expect($puck_2.List.binarySearchBy.call([
          1,
          2,
          3,
        ], function (val) {
          return $puck_2.Num.cmp.call(val, 4);
        })).toEqual($puck_2.Err(3));
      });
      $puck_1.it("should return Err(0) if the value is less than everying", function () {
        return $puck_1.expect($puck_2.List.binarySearchBy.call([
          1,
          2,
          3,
        ], function (val) {
          return $puck_2.Num.cmp.call(val, 0);
        })).toEqual($puck_2.Err(0));
      });
      return $puck_1.it("should return Ok(index) if the value is found", function () {
        return $puck_1.expect($puck_2.List.binarySearchBy.call([
          1,
          2,
          3,
        ], function (val) {
          return $puck_2.Num.cmp.call(val, 2);
        })).toEqual($puck_2.Ok(1));
      });
    });
  });
  $puck_1.describe("ordering", function () {
    return $puck_1.describe("reverse", function () {
      $puck_1.it("should return greater for less", function () {
        return $puck_1.expect($puck_2.Ordering.reverse.call($puck_2.Ordering.Less)).toBe($puck_2.Ordering.Greater);
      });
      $puck_1.it("should return equal for equal", function () {
        return $puck_1.expect($puck_2.Ordering.reverse.call($puck_2.Ordering.Equal)).toBe($puck_2.Ordering.Equal);
      });
      return $puck_1.it("should return less for greater", function () {
        return $puck_1.expect($puck_2.Ordering.reverse.call($puck_2.Ordering.Greater)).toBe($puck_2.Ordering.Less);
      });
    });
  });
  return $puck_1.describe("Range", function () {
    return $puck_1.describe("IntoIterator", function () {
      return $puck_1.it("should return an iterator that iterates over the elements", function () {
        const range = {
          start: -3,
          end: 3,
        };
        let iterator = $puck_2.IntoIterator["$impl_IntoIterator$Range"].iter.call({type: '$impl_IntoIterator$Range', value: range, $isTraitObject: true});
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.Some(-3));
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.Some(-2));
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.Some(-1));
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.Some(0));
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.Some(1));
        $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.Some(2));
        return $puck_1.expect($puck_2.Iterator[iterator.type].next.call(iterator)).toEqual($puck_2.None);
      });
    });
  });
})
