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
  (0, _test.describe)("String", function () {
    return (0, _test.describe)("contains", function () {
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
        return (0, _test.expect)(any(_core2.Option.andThen.call((0, _core.Some)(1), function (value) {
          return (0, _core.Some)(value + value);
        }))).toEqual(any((0, _core.Some)(2)));
      });
      (0, _test.it)("should not call the map function if None", function () {
        return (0, _test.expect)(any(_core2.Option.andThen.call(_core.None, function (value) {
          return (0, _test.expect)("andThen").toBe("not called");
        }))).toEqual(any(_core.None));
      });
      return (0, _test.it)("should return None if Some(value) and returns None", function () {
        return (0, _test.expect)(any(_core2.Option.andThen.call((0, _core.Some)(1), function (value) {
          return _core.None;
        }))).toEqual(any(_core.None));
      });
    });
    (0, _test.describe)("map", function () {
      (0, _test.it)("should map the value if Some(value)", function () {
        (0, _test.expect)(any(_core2.Option.map.call((0, _core.Some)(1), function (value) {
          return value + value;
        }))).toEqual(any((0, _core.Some)(2)));
        return (0, _test.expect)($unwrapTraitObject(_core2.Option.unwrap.call(_core2.Option.map.call((0, _core.Some)(2), function (value) {
          return value + value;
        })))).toBe(4);
      });
      return (0, _test.it)("should not call the map function if None", function () {
        return (0, _test.expect)(any(_core2.Option.map.call(_core.None, function (value) {
          return (0, _test.expect)("map").toBe("not called");
        }))).toEqual(any(_core.None));
      });
    });
    (0, _test.describe)("mapOr", function () {
      (0, _test.it)("should map the value if Some(value)", function () {
        return (0, _test.expect)(any(_core2.Option.mapOr.call((0, _core.Some)(1), 5, function (value) {
          return value + value;
        }))).toBe(2);
      });
      return (0, _test.it)("should return the default value if None", function () {
        return (0, _test.expect)(any(_core2.Option.mapOr.call(_core.None, 5, function (value) {
          return (0, _test.expect)("map").toBe("not called");
        }))).toBe(5);
      });
    });
    (0, _test.describe)("mapOrElse", function () {
      (0, _test.it)("should map the value if Some(value)", function () {
        return (0, _test.expect)(any(_core2.Option.mapOrElse.call((0, _core.Some)(1), function () {
          return (0, _test.expect)("orElse").toBe("not called");
        }, function (value) {
          return value + value;
        }))).toBe(2);
      });
      return (0, _test.it)("should return the result of the default function if None", function () {
        return (0, _test.expect)(any(_core2.Option.mapOrElse.call(_core.None, function () {
          return 5;
        }, function (value) {
          return (0, _test.expect)("map").toBe("not called");
        }))).toBe(5);
      });
    });
    (0, _test.describe)("unwrap", function () {
      (0, _test.it)("should return the value if Some(value)", function () {
        return (0, _test.expect)(_core2.Option.unwrap.call((0, _core.Some)("value"))).toBe("value");
      });
      return (0, _test.it)("should panic if None", function () {
        return (0, _test.expect)(any(function () {
          return _core2.Option.unwrap.call(_core.None);
        })).toThrow();
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
        return (0, _test.expect)(any(_core2.Result.andThen.call((0, _core.Ok)(1), function (value) {
          return (0, _core.Ok)(value + value);
        }))).toEqual(any((0, _core.Ok)(2)));
      });
      (0, _test.it)("should not call the map function if Err(err)", function () {
        return (0, _test.expect)(any(_core2.Result.andThen.call((0, _core.Err)(2), function (value) {
          return (0, _test.expect)("andThen").toBe("not called");
        }))).toEqual(any((0, _core.Err)(2)));
      });
      return (0, _test.it)("should return the error if Ok(value) and returns Err(error)", function () {
        return (0, _test.expect)(any(_core2.Result.andThen.call((0, _core.Ok)(1), function (value) {
          return (0, _core.Err)("error");
        }))).toEqual(any((0, _core.Err)("error")));
      });
    });
    (0, _test.describe)("map", function () {
      (0, _test.it)("should map the value if Ok(value)", function () {
        (0, _test.expect)(any(_core2.Result.map.call((0, _core.Ok)(1), function (value) {
          return value + value;
        }))).toEqual(any((0, _core.Ok)(2)));
        return (0, _test.expect)($unwrapTraitObject(_core2.Result.unwrap.call(_core2.Result.map.call((0, _core.Ok)(2), function (value) {
          return value + value;
        })))).toBe(4);
      });
      return (0, _test.it)("should not call the map function if Err(err)", function () {
        return (0, _test.expect)(any(_core2.Result.map.call((0, _core.Err)(2), function (value) {
          return (0, _test.expect)("map").toBe("not called");
        }))).toEqual(any((0, _core.Err)(2)));
      });
    });
    (0, _test.describe)("mapErr", function () {
      (0, _test.it)("should map the value if Ok(value)", function () {
        (0, _test.expect)(any(_core2.Result.mapErr.call((0, _core.Err)(1), function (value) {
          return value + value;
        }))).toEqual(any((0, _core.Err)(2)));
        return (0, _test.expect)($unwrapTraitObject(_core2.Result.unwrapErr.call(_core2.Result.mapErr.call((0, _core.Err)(2), function (value) {
          return value + value;
        })))).toBe(4);
      });
      return (0, _test.it)("should not call the mapErr function if Err(err)", function () {
        return (0, _test.expect)(any(_core2.Result.mapErr.call((0, _core.Ok)(2), function (value) {
          return (0, _test.expect)("mapErr").toBe("not called");
        }))).toEqual(any((0, _core.Ok)(2)));
      });
    });
    (0, _test.describe)("unwrap", function () {
      (0, _test.it)("should return the value if Ok(value)", function () {
        return (0, _test.expect)(_core2.Result.unwrap.call((0, _core.Ok)("value"))).toBe("value");
      });
      return (0, _test.it)("should panic if Err(err)", function () {
        return (0, _test.expect)(any(function () {
          return _core2.Result.unwrap.call((0, _core.Err)("err"));
        })).toThrow();
      });
    });
    return (0, _test.describe)("unwrapErr", function () {
      (0, _test.it)("should panic if Ok(value)", function () {
        return (0, _test.expect)(any(function () {
          return _core2.Result.unwrapErr.call((0, _core.Ok)("value"));
        })).toThrow();
      });
      return (0, _test.it)("should return the error if Err(err)", function () {
        return (0, _test.expect)(_core2.Result.unwrapErr.call((0, _core.Err)("err"))).toBe("err");
      });
    });
  });
});
