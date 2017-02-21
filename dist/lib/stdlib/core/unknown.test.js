'use strict';

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _test = require('puck-lang/dist/lib/stdlib/test');

var _core2 = require('./../core');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};

(0, _test.describe)("Unknown", function () {
  (0, _test.describe)("isNull", function () {
    return (0, _test.it)("should check if the object is null", function () {
      (0, _test.expect)(_core2.Unknown.isNull.call(_core2.Unknown.from(_js._null))).toBe(true);
      (0, _test.expect)(_core2.Unknown.isNull.call(_core2.Unknown.from(""))).toBe(false);
      (0, _test.expect)(_core2.Unknown.isNull.call(_core2.Unknown.from(0))).toBe(false);
      (0, _test.expect)(_core2.Unknown.isNull.call(_core2.Unknown.from(false))).toBe(false);
      return (0, _test.expect)(_core2.Unknown.isNull.call(_core2.Unknown.from(_js._undefined))).toBe(false);
    });
  });
  (0, _test.describe)("isUndefined", function () {
    return (0, _test.it)("should check if the object is undefined", function () {
      (0, _test.expect)(_core2.Unknown.isUndefined.call(_core2.Unknown.from(_js._undefined))).toBe(true);
      (0, _test.expect)(_core2.Unknown.isUndefined.call(_core2.Unknown.from(""))).toBe(false);
      (0, _test.expect)(_core2.Unknown.isUndefined.call(_core2.Unknown.from(0))).toBe(false);
      (0, _test.expect)(_core2.Unknown.isUndefined.call(_core2.Unknown.from(false))).toBe(false);
      return (0, _test.expect)(_core2.Unknown.isUndefined.call(_core2.Unknown.from(_js._null))).toBe(false);
    });
  });
  (0, _test.describe)("isBool", function () {
    return (0, _test.it)("should check if the object is a bool", function () {
      (0, _test.expect)(_core2.Unknown.isBool.call(_core2.Unknown.from(true))).toBe(true);
      (0, _test.expect)(_core2.Unknown.isBool.call(_core2.Unknown.from(false))).toBe(true);
      (0, _test.expect)(_core2.Unknown.isBool.call(_core2.Unknown.from(""))).toBe(false);
      (0, _test.expect)(_core2.Unknown.isBool.call(_core2.Unknown.from(0))).toBe(false);
      (0, _test.expect)(_core2.Unknown.isBool.call(_core2.Unknown.from(_js._undefined))).toBe(false);
      return (0, _test.expect)(_core2.Unknown.isBool.call(_core2.Unknown.from(_js._null))).toBe(false);
    });
  });
  (0, _test.describe)("isNum", function () {
    return (0, _test.it)("should check if the object is a number", function () {
      (0, _test.expect)(_core2.Unknown.isNum.call(_core2.Unknown.from(0))).toBe(true);
      (0, _test.expect)(_core2.Unknown.isNum.call(_core2.Unknown.from(-54.2))).toBe(true);
      (0, _test.expect)(_core2.Unknown.isNum.call(_core2.Unknown.from(123))).toBe(true);
      (0, _test.expect)(_core2.Unknown.isNum.call(_core2.Unknown.from(""))).toBe(false);
      (0, _test.expect)(_core2.Unknown.isNum.call(_core2.Unknown.from(_js._undefined))).toBe(false);
      return (0, _test.expect)(_core2.Unknown.isNum.call(_core2.Unknown.from(_js._null))).toBe(false);
    });
  });
  (0, _test.describe)("isString", function () {
    return (0, _test.it)("should check if the object is a string", function () {
      (0, _test.expect)(_core2.Unknown.isString.call(_core2.Unknown.from(""))).toBe(true);
      (0, _test.expect)(_core2.Unknown.isString.call(_core2.Unknown.from(0))).toBe(false);
      (0, _test.expect)(_core2.Unknown.isString.call(_core2.Unknown.from(_js._undefined))).toBe(false);
      return (0, _test.expect)(_core2.Unknown.isString.call(_core2.Unknown.from(_js._null))).toBe(false);
    });
  });
  (0, _test.describe)("isList", function () {
    return (0, _test.it)("should check if the object is a list", function () {
      (0, _test.expect)(_core2.Unknown.isList.call(_core2.Unknown.from([]))).toBe(true);
      (0, _test.expect)(_core2.Unknown.isList.call(_core2.Unknown.from([""]))).toBe(true);
      (0, _test.expect)(_core2.Unknown.isList.call(_core2.Unknown.from(""))).toBe(false);
      (0, _test.expect)(_core2.Unknown.isList.call(_core2.Unknown.from(0))).toBe(false);
      (0, _test.expect)(_core2.Unknown.isList.call(_core2.Unknown.from(_js._undefined))).toBe(false);
      return (0, _test.expect)(_core2.Unknown.isList.call(_core2.Unknown.from(_js._null))).toBe(false);
    });
  });
  (0, _test.describe)("isObject", function () {
    return (0, _test.it)("should check if the object is an object", function () {
      (0, _test.expect)(_core2.Unknown.isObject.call(_core2.Unknown.from({}))).toBe(true);
      (0, _test.expect)(_core2.Unknown.isObject.call(_core2.Unknown.from([]))).toBe(true);
      (0, _test.expect)(_core2.Unknown.isObject.call(_core2.Unknown.from([""]))).toBe(true);
      (0, _test.expect)(_core2.Unknown.isObject.call(_core2.Unknown.from(""))).toBe(false);
      (0, _test.expect)(_core2.Unknown.isObject.call(_core2.Unknown.from(0))).toBe(false);
      (0, _test.expect)(_core2.Unknown.isObject.call(_core2.Unknown.from(_js._undefined))).toBe(false);
      return (0, _test.expect)(_core2.Unknown.isObject.call(_core2.Unknown.from(_js._null))).toBe(false);
    });
  });
  (0, _test.describe)("asBool", function () {
    return (0, _test.it)("should return the object as a bool", function () {
      (0, _test.expect)(_core2.Unknown.asBool.call(_core2.Unknown.from(true))).toEqual((0, _core2.Some)(true));
      (0, _test.expect)(_core2.Unknown.asBool.call(_core2.Unknown.from(false))).toEqual((0, _core2.Some)(false));
      (0, _test.expect)(_core2.Unknown.asBool.call(_core2.Unknown.from(""))).toEqual(_core2.None);
      (0, _test.expect)(_core2.Unknown.asBool.call(_core2.Unknown.from(0))).toEqual(_core2.None);
      (0, _test.expect)(_core2.Unknown.asBool.call(_core2.Unknown.from(_js._undefined))).toEqual(_core2.None);
      return (0, _test.expect)(_core2.Unknown.asBool.call(_core2.Unknown.from(_js._null))).toEqual(_core2.None);
    });
  });
  (0, _test.describe)("asNum", function () {
    return (0, _test.it)("should return the object as a number", function () {
      (0, _test.expect)(_core2.Unknown.asNum.call(_core2.Unknown.from(0))).toEqual((0, _core2.Some)(0));
      (0, _test.expect)(_core2.Unknown.asNum.call(_core2.Unknown.from(-54.2))).toEqual((0, _core2.Some)(-54.2));
      (0, _test.expect)(_core2.Unknown.asNum.call(_core2.Unknown.from(123))).toEqual((0, _core2.Some)(123));
      (0, _test.expect)(_core2.Unknown.asNum.call(_core2.Unknown.from(""))).toEqual(_core2.None);
      (0, _test.expect)(_core2.Unknown.asNum.call(_core2.Unknown.from(_js._undefined))).toEqual(_core2.None);
      return (0, _test.expect)(_core2.Unknown.asNum.call(_core2.Unknown.from(_js._null))).toEqual(_core2.None);
    });
  });
  (0, _test.describe)("asString", function () {
    return (0, _test.it)("should return the object as a string", function () {
      (0, _test.expect)(_core2.Unknown.asString.call(_core2.Unknown.from(""))).toEqual((0, _core2.Some)(""));
      (0, _test.expect)(_core2.Unknown.asString.call(_core2.Unknown.from("Hello"))).toEqual((0, _core2.Some)("Hello"));
      (0, _test.expect)(_core2.Unknown.asString.call(_core2.Unknown.from(0))).toEqual(_core2.None);
      (0, _test.expect)(_core2.Unknown.asString.call(_core2.Unknown.from(_js._undefined))).toEqual(_core2.None);
      return (0, _test.expect)(_core2.Unknown.asString.call(_core2.Unknown.from(_js._null))).toEqual(_core2.None);
    });
  });
  (0, _test.describe)("asList", function () {
    return (0, _test.it)("should return the object as a list", function () {
      (0, _test.expect)(_core2.Unknown.asList.call(_core2.Unknown.from([]))).toEqual((0, _core2.Some)([]));
      (0, _test.expect)(_core2.Unknown.asList.call(_core2.Unknown.from([""]))).toEqual((0, _core2.Some)([_core2.Unknown.from("")]));
      (0, _test.expect)(_core2.Unknown.asList.call(_core2.Unknown.from(""))).toEqual(_core2.None);
      (0, _test.expect)(_core2.Unknown.asList.call(_core2.Unknown.from(0))).toEqual(_core2.None);
      (0, _test.expect)(_core2.Unknown.asList.call(_core2.Unknown.from(_js._undefined))).toEqual(_core2.None);
      return (0, _test.expect)(_core2.Unknown.asList.call(_core2.Unknown.from(_js._null))).toEqual(_core2.None);
    });
  });
  (0, _test.describe)("getProp", function () {
    return (0, _test.it)("should read the property if possible", function () {
      (0, _test.expect)(_core2.Unknown.getProp.call(_core2.Unknown.from([]), "length")).toEqual((0, _core2.Some)(_core2.Unknown.from(0)));
      (0, _test.expect)(_core2.Unknown.getProp.call(_core2.Unknown.from([""]), "length")).toEqual((0, _core2.Some)(_core2.Unknown.from(1)));
      (0, _test.expect)(_core2.Unknown.getProp.call(_core2.Unknown.from(""), "length")).toEqual((0, _core2.Some)(_core2.Unknown.from(0)));
      (0, _test.expect)(_core2.Unknown.getProp.call(_core2.Unknown.from("Hello"), "length")).toEqual((0, _core2.Some)(_core2.Unknown.from(5)));
      (0, _test.expect)(_core2.Unknown.getProp.call(_core2.Unknown.from(0), "length")).toEqual(_core2.None);
      (0, _test.expect)(_core2.Unknown.getProp.call(_core2.Unknown.from(_js._undefined), "length")).toEqual(_core2.None);
      return (0, _test.expect)(_core2.Unknown.getProp.call(_core2.Unknown.from(_js._null), "length")).toEqual(_core2.None);
    });
  });
  return (0, _test.describe)("transmute", function () {
    return (0, _test.it)("should return the object as anything", function () {
      (0, _test.expect)($unwrapTraitObject(_core2.Unknown.transmute.call(_core2.Unknown.from({})))).toEqual({});
      (0, _test.expect)($unwrapTraitObject(_core2.Unknown.transmute.call(_core2.Unknown.from([])))).toEqual([]);
      (0, _test.expect)($unwrapTraitObject(_core2.Unknown.transmute.call(_core2.Unknown.from([""])))).toEqual([""]);
      (0, _test.expect)($unwrapTraitObject(_core2.Unknown.transmute.call(_core2.Unknown.from("")))).toEqual("");
      (0, _test.expect)($unwrapTraitObject(_core2.Unknown.transmute.call(_core2.Unknown.from(0)))).toEqual(0);
      (0, _test.expect)($unwrapTraitObject(_core2.Unknown.transmute.call(_core2.Unknown.from(_js._undefined)))).toEqual(_js._undefined);
      return (0, _test.expect)($unwrapTraitObject(_core2.Unknown.transmute.call(_core2.Unknown.from(_js._null)))).toEqual(_js._null);
    });
  });
});
