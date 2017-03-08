'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("puck-lang/dist/lib/stdlib/test");
const $puck_4 = require("./unknown");
$puck_3.describe("Unknown", function () {
  $puck_3.describe("isNull", function () {
    return $puck_3.it("should check if the object is null", function () {
      $puck_3.expect($puck_4.Unknown.isNull.call($puck_4.Unknown.from($puck_2._null))).toBe(true);
      $puck_3.expect($puck_4.Unknown.isNull.call($puck_4.Unknown.from(""))).toBe(false);
      $puck_3.expect($puck_4.Unknown.isNull.call($puck_4.Unknown.from(0))).toBe(false);
      $puck_3.expect($puck_4.Unknown.isNull.call($puck_4.Unknown.from(false))).toBe(false);
      return $puck_3.expect($puck_4.Unknown.isNull.call($puck_4.Unknown.from($puck_2._undefined))).toBe(false);
    });
  });
  $puck_3.describe("isUndefined", function () {
    return $puck_3.it("should check if the object is undefined", function () {
      $puck_3.expect($puck_4.Unknown.isUndefined.call($puck_4.Unknown.from($puck_2._undefined))).toBe(true);
      $puck_3.expect($puck_4.Unknown.isUndefined.call($puck_4.Unknown.from(""))).toBe(false);
      $puck_3.expect($puck_4.Unknown.isUndefined.call($puck_4.Unknown.from(0))).toBe(false);
      $puck_3.expect($puck_4.Unknown.isUndefined.call($puck_4.Unknown.from(false))).toBe(false);
      return $puck_3.expect($puck_4.Unknown.isUndefined.call($puck_4.Unknown.from($puck_2._null))).toBe(false);
    });
  });
  $puck_3.describe("isBool", function () {
    return $puck_3.it("should check if the object is a bool", function () {
      $puck_3.expect($puck_4.Unknown.isBool.call($puck_4.Unknown.from(true))).toBe(true);
      $puck_3.expect($puck_4.Unknown.isBool.call($puck_4.Unknown.from(false))).toBe(true);
      $puck_3.expect($puck_4.Unknown.isBool.call($puck_4.Unknown.from(""))).toBe(false);
      $puck_3.expect($puck_4.Unknown.isBool.call($puck_4.Unknown.from(0))).toBe(false);
      $puck_3.expect($puck_4.Unknown.isBool.call($puck_4.Unknown.from($puck_2._undefined))).toBe(false);
      return $puck_3.expect($puck_4.Unknown.isBool.call($puck_4.Unknown.from($puck_2._null))).toBe(false);
    });
  });
  $puck_3.describe("isNum", function () {
    return $puck_3.it("should check if the object is a number", function () {
      $puck_3.expect($puck_4.Unknown.isNum.call($puck_4.Unknown.from(0))).toBe(true);
      $puck_3.expect($puck_4.Unknown.isNum.call($puck_4.Unknown.from(-54.2))).toBe(true);
      $puck_3.expect($puck_4.Unknown.isNum.call($puck_4.Unknown.from(123))).toBe(true);
      $puck_3.expect($puck_4.Unknown.isNum.call($puck_4.Unknown.from(""))).toBe(false);
      $puck_3.expect($puck_4.Unknown.isNum.call($puck_4.Unknown.from($puck_2._undefined))).toBe(false);
      return $puck_3.expect($puck_4.Unknown.isNum.call($puck_4.Unknown.from($puck_2._null))).toBe(false);
    });
  });
  $puck_3.describe("isString", function () {
    return $puck_3.it("should check if the object is a string", function () {
      $puck_3.expect($puck_4.Unknown.isString.call($puck_4.Unknown.from(""))).toBe(true);
      $puck_3.expect($puck_4.Unknown.isString.call($puck_4.Unknown.from(0))).toBe(false);
      $puck_3.expect($puck_4.Unknown.isString.call($puck_4.Unknown.from($puck_2._undefined))).toBe(false);
      return $puck_3.expect($puck_4.Unknown.isString.call($puck_4.Unknown.from($puck_2._null))).toBe(false);
    });
  });
  $puck_3.describe("isList", function () {
    return $puck_3.it("should check if the object is a list", function () {
      $puck_3.expect($puck_4.Unknown.isList.call($puck_4.Unknown.from([]))).toBe(true);
      $puck_3.expect($puck_4.Unknown.isList.call($puck_4.Unknown.from([""]))).toBe(true);
      $puck_3.expect($puck_4.Unknown.isList.call($puck_4.Unknown.from(""))).toBe(false);
      $puck_3.expect($puck_4.Unknown.isList.call($puck_4.Unknown.from(0))).toBe(false);
      $puck_3.expect($puck_4.Unknown.isList.call($puck_4.Unknown.from($puck_2._undefined))).toBe(false);
      return $puck_3.expect($puck_4.Unknown.isList.call($puck_4.Unknown.from($puck_2._null))).toBe(false);
    });
  });
  $puck_3.describe("isObject", function () {
    return $puck_3.it("should check if the object is an object", function () {
      $puck_3.expect($puck_4.Unknown.isObject.call($puck_4.Unknown.from({}))).toBe(true);
      $puck_3.expect($puck_4.Unknown.isObject.call($puck_4.Unknown.from([]))).toBe(true);
      $puck_3.expect($puck_4.Unknown.isObject.call($puck_4.Unknown.from([""]))).toBe(true);
      $puck_3.expect($puck_4.Unknown.isObject.call($puck_4.Unknown.from(""))).toBe(false);
      $puck_3.expect($puck_4.Unknown.isObject.call($puck_4.Unknown.from(0))).toBe(false);
      $puck_3.expect($puck_4.Unknown.isObject.call($puck_4.Unknown.from($puck_2._undefined))).toBe(false);
      return $puck_3.expect($puck_4.Unknown.isObject.call($puck_4.Unknown.from($puck_2._null))).toBe(false);
    });
  });
  $puck_3.describe("asBool", function () {
    return $puck_3.it("should return the object as a bool", function () {
      $puck_3.expect($puck_4.Unknown.asBool.call($puck_4.Unknown.from(true))).toEqual($puck_1.Some(true));
      $puck_3.expect($puck_4.Unknown.asBool.call($puck_4.Unknown.from(false))).toEqual($puck_1.Some(false));
      $puck_3.expect($puck_4.Unknown.asBool.call($puck_4.Unknown.from(""))).toEqual($puck_1.None);
      $puck_3.expect($puck_4.Unknown.asBool.call($puck_4.Unknown.from(0))).toEqual($puck_1.None);
      $puck_3.expect($puck_4.Unknown.asBool.call($puck_4.Unknown.from($puck_2._undefined))).toEqual($puck_1.None);
      return $puck_3.expect($puck_4.Unknown.asBool.call($puck_4.Unknown.from($puck_2._null))).toEqual($puck_1.None);
    });
  });
  $puck_3.describe("asNum", function () {
    return $puck_3.it("should return the object as a number", function () {
      $puck_3.expect($puck_4.Unknown.asNum.call($puck_4.Unknown.from(0))).toEqual($puck_1.Some(0));
      $puck_3.expect($puck_4.Unknown.asNum.call($puck_4.Unknown.from(-54.2))).toEqual($puck_1.Some(-54.2));
      $puck_3.expect($puck_4.Unknown.asNum.call($puck_4.Unknown.from(123))).toEqual($puck_1.Some(123));
      $puck_3.expect($puck_4.Unknown.asNum.call($puck_4.Unknown.from(""))).toEqual($puck_1.None);
      $puck_3.expect($puck_4.Unknown.asNum.call($puck_4.Unknown.from($puck_2._undefined))).toEqual($puck_1.None);
      return $puck_3.expect($puck_4.Unknown.asNum.call($puck_4.Unknown.from($puck_2._null))).toEqual($puck_1.None);
    });
  });
  $puck_3.describe("asString", function () {
    return $puck_3.it("should return the object as a string", function () {
      $puck_3.expect($puck_4.Unknown.asString.call($puck_4.Unknown.from(""))).toEqual($puck_1.Some(""));
      $puck_3.expect($puck_4.Unknown.asString.call($puck_4.Unknown.from("Hello"))).toEqual($puck_1.Some("Hello"));
      $puck_3.expect($puck_4.Unknown.asString.call($puck_4.Unknown.from(0))).toEqual($puck_1.None);
      $puck_3.expect($puck_4.Unknown.asString.call($puck_4.Unknown.from($puck_2._undefined))).toEqual($puck_1.None);
      return $puck_3.expect($puck_4.Unknown.asString.call($puck_4.Unknown.from($puck_2._null))).toEqual($puck_1.None);
    });
  });
  $puck_3.describe("asList", function () {
    return $puck_3.it("should return the object as a list", function () {
      $puck_3.expect($puck_4.Unknown.asList.call($puck_4.Unknown.from([]))).toEqual($puck_1.Some([]));
      $puck_3.expect($puck_4.Unknown.asList.call($puck_4.Unknown.from([""]))).toEqual($puck_1.Some([$puck_4.Unknown.from("")]));
      $puck_3.expect($puck_4.Unknown.asList.call($puck_4.Unknown.from(""))).toEqual($puck_1.None);
      $puck_3.expect($puck_4.Unknown.asList.call($puck_4.Unknown.from(0))).toEqual($puck_1.None);
      $puck_3.expect($puck_4.Unknown.asList.call($puck_4.Unknown.from($puck_2._undefined))).toEqual($puck_1.None);
      return $puck_3.expect($puck_4.Unknown.asList.call($puck_4.Unknown.from($puck_2._null))).toEqual($puck_1.None);
    });
  });
  $puck_3.describe("getProp", function () {
    return $puck_3.it("should read the property if possible", function () {
      $puck_3.expect($puck_4.Unknown.getProp.call($puck_4.Unknown.from([]), "length")).toEqual($puck_1.Some($puck_4.Unknown.from(0)));
      $puck_3.expect($puck_4.Unknown.getProp.call($puck_4.Unknown.from([""]), "length")).toEqual($puck_1.Some($puck_4.Unknown.from(1)));
      $puck_3.expect($puck_4.Unknown.getProp.call($puck_4.Unknown.from(""), "length")).toEqual($puck_1.Some($puck_4.Unknown.from(0)));
      $puck_3.expect($puck_4.Unknown.getProp.call($puck_4.Unknown.from("Hello"), "length")).toEqual($puck_1.Some($puck_4.Unknown.from(5)));
      $puck_3.expect($puck_4.Unknown.getProp.call($puck_4.Unknown.from(0), "length")).toEqual($puck_1.None);
      $puck_3.expect($puck_4.Unknown.getProp.call($puck_4.Unknown.from($puck_2._undefined), "length")).toEqual($puck_1.None);
      return $puck_3.expect($puck_4.Unknown.getProp.call($puck_4.Unknown.from($puck_2._null), "length")).toEqual($puck_1.None);
    });
  });
  return $puck_3.describe("transmute", function () {
    return $puck_3.it("should return the object as anything", function () {
      $puck_3.expect($unwrapTraitObject($puck_4.Unknown.from({}))).toEqual({});
      $puck_3.expect($unwrapTraitObject($puck_4.Unknown.from([]))).toEqual([]);
      $puck_3.expect($unwrapTraitObject($puck_4.Unknown.from([""]))).toEqual([""]);
      $puck_3.expect($unwrapTraitObject($puck_4.Unknown.from(""))).toEqual("");
      $puck_3.expect($unwrapTraitObject($puck_4.Unknown.from(0))).toEqual(0);
      $puck_3.expect($unwrapTraitObject($puck_4.Unknown.from($puck_2._undefined))).toEqual($unwrapTraitObject($puck_2._undefined));
      return $puck_3.expect($unwrapTraitObject($puck_4.Unknown.from($puck_2._null))).toEqual($puck_2._null);
    });
  });
})
