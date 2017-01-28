'use strict';

var _core = require('puck-lang/dist/lib/stdlib/core');

var _test = require('puck-lang/dist/lib/stdlib/test');

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
  (0, _test.describe)("Option", function () {
    (0, _test.describe)("isSome", function () {
      (0, _test.it)("should return true if Some(value)", function () {
        return (0, _test.expect)($unwrapTraitObject((0, _core.Some)(1)).isSome()).toBe(true);
      });
      return (0, _test.it)("should return false if None", function () {
        return (0, _test.expect)($unwrapTraitObject(_core.None).isSome()).toBe(false);
      });
    });
    (0, _test.describe)("isNone", function () {
      (0, _test.it)("should return false if Some(value)", function () {
        return (0, _test.expect)($unwrapTraitObject((0, _core.Some)(1)).isNone()).toBe(false);
      });
      return (0, _test.it)("should return true if None", function () {
        return (0, _test.expect)($unwrapTraitObject(_core.None).isNone()).toBe(true);
      });
    });
    (0, _test.describe)("andThen", function () {
      (0, _test.it)("should map the value if Some(value) and returns Some(newValue)", function () {
        return (0, _test.expect)(any($unwrapTraitObject((0, _core.Some)(1)).andThen(function (value) {
          return (0, _core.Some)(value + value);
        }))).toEqual(any((0, _core.Some)(2)));
      });
      (0, _test.it)("should not call the map function if None", function () {
        return (0, _test.expect)(any($unwrapTraitObject(_core.None).andThen(function (value) {
          return (0, _test.expect)("andThen").toBe("not called");
        }))).toEqual(any(_core.None));
      });
      return (0, _test.it)("should return None if Some(value) and returns None", function () {
        return (0, _test.expect)(any($unwrapTraitObject((0, _core.Some)(1)).andThen(function (value) {
          return _core.None;
        }))).toEqual(any(_core.None));
      });
    });
    (0, _test.describe)("map", function () {
      (0, _test.it)("should map the value if Some(value)", function () {
        (0, _test.expect)(any($unwrapTraitObject((0, _core.Some)(1)).map(function (value) {
          return value + value;
        }))).toEqual(any((0, _core.Some)(2)));
        return (0, _test.expect)($unwrapTraitObject($unwrapTraitObject((0, _core.Some)(2)).map(function (value) {
          return value + value;
        })).unwrap()).toBe(4);
      });
      return (0, _test.it)("should not call the map function if None", function () {
        return (0, _test.expect)(any($unwrapTraitObject(_core.None).map(function (value) {
          return (0, _test.expect)("map").toBe("not called");
        }))).toEqual(any(_core.None));
      });
    });
    (0, _test.describe)("mapOr", function () {
      (0, _test.it)("should map the value if Some(value)", function () {
        return (0, _test.expect)(any($unwrapTraitObject((0, _core.Some)(1)).mapOr(5, function (value) {
          return value + value;
        }))).toBe(2);
      });
      return (0, _test.it)("should return the default value if None", function () {
        return (0, _test.expect)(any($unwrapTraitObject(_core.None).mapOr(5, function (value) {
          return (0, _test.expect)("map").toBe("not called");
        }))).toBe(5);
      });
    });
    (0, _test.describe)("mapOrElse", function () {
      (0, _test.it)("should map the value if Some(value)", function () {
        return (0, _test.expect)(any($unwrapTraitObject((0, _core.Some)(1)).mapOrElse(function () {
          return (0, _test.expect)("orElse").toBe("not called");
        }, function (value) {
          return value + value;
        }))).toBe(2);
      });
      return (0, _test.it)("should return the result of the default function if None", function () {
        return (0, _test.expect)(any($unwrapTraitObject(_core.None).mapOrElse(function () {
          return 5;
        }, function (value) {
          return (0, _test.expect)("map").toBe("not called");
        }))).toBe(5);
      });
    });
    (0, _test.describe)("unwrap", function () {
      (0, _test.it)("should return the value if Some(value)", function () {
        return (0, _test.expect)($unwrapTraitObject((0, _core.Some)("value")).unwrap()).toBe("value");
      });
      return (0, _test.it)("should panic if None", function () {
        return (0, _test.expect)(any(function () {
          return $unwrapTraitObject(_core.None).unwrap();
        })).toThrow();
      });
    });
    (0, _test.describe)("unwrapOr", function () {
      (0, _test.it)("should return the value if Some(value)", function () {
        return (0, _test.expect)($unwrapTraitObject((0, _core.Some)("value")).unwrapOr("default")).toBe("value");
      });
      return (0, _test.it)("should return the default value if None", function () {
        return (0, _test.expect)($unwrapTraitObject(_core.None).unwrapOr("default")).toBe("default");
      });
    });
    return (0, _test.describe)("unwrapOrElse", function () {
      (0, _test.it)("should return the value if Some(value)", function () {
        return (0, _test.expect)($unwrapTraitObject((0, _core.Some)("value")).unwrapOrElse(function () {
          return (0, _test.expect)("orElse").toBe("not called");
        })).toBe("value");
      });
      return (0, _test.it)("should return the result of the default function if None", function () {
        return (0, _test.expect)($unwrapTraitObject(_core.None).unwrapOrElse(function () {
          return "default";
        })).toBe("default");
      });
    });
  });
  return (0, _test.describe)("Result", function () {
    (0, _test.describe)("isOk", function () {
      (0, _test.it)("should return true if Ok(value)", function () {
        return (0, _test.expect)($unwrapTraitObject((0, _core.Ok)(1)).isOk()).toBe(true);
      });
      return (0, _test.it)("should return false if Err(err)", function () {
        return (0, _test.expect)($unwrapTraitObject((0, _core.Err)(2)).isOk()).toBe(false);
      });
    });
    (0, _test.describe)("isErr", function () {
      (0, _test.it)("should return false if Ok(value)", function () {
        return (0, _test.expect)($unwrapTraitObject((0, _core.Ok)(1)).isErr()).toBe(false);
      });
      return (0, _test.it)("should return true if Err(err)", function () {
        return (0, _test.expect)($unwrapTraitObject((0, _core.Err)(2)).isErr()).toBe(true);
      });
    });
    (0, _test.describe)("andThen", function () {
      (0, _test.it)("should map the value if Ok(value) and returns Ok(newValue)", function () {
        return (0, _test.expect)(any($unwrapTraitObject((0, _core.Ok)(1)).andThen(function (value) {
          return (0, _core.Ok)(value + value);
        }))).toEqual(any((0, _core.Ok)(2)));
      });
      (0, _test.it)("should not call the map function if Err(err)", function () {
        return (0, _test.expect)(any($unwrapTraitObject((0, _core.Err)(2)).andThen(function (value) {
          return (0, _test.expect)("andThen").toBe("not called");
        }))).toEqual(any((0, _core.Err)(2)));
      });
      return (0, _test.it)("should return the error if Ok(value) and returns Err(error)", function () {
        return (0, _test.expect)(any($unwrapTraitObject((0, _core.Ok)(1)).andThen(function (value) {
          return (0, _core.Err)("error");
        }))).toEqual(any((0, _core.Err)("error")));
      });
    });
    (0, _test.describe)("map", function () {
      (0, _test.it)("should map the value if Ok(value)", function () {
        (0, _test.expect)(any($unwrapTraitObject((0, _core.Ok)(1)).map(function (value) {
          return value + value;
        }))).toEqual(any((0, _core.Ok)(2)));
        return (0, _test.expect)($unwrapTraitObject($unwrapTraitObject((0, _core.Ok)(2)).map(function (value) {
          return value + value;
        })).unwrap()).toBe(4);
      });
      return (0, _test.it)("should not call the map function if Err(err)", function () {
        return (0, _test.expect)(any($unwrapTraitObject((0, _core.Err)(2)).map(function (value) {
          return (0, _test.expect)("map").toBe("not called");
        }))).toEqual(any((0, _core.Err)(2)));
      });
    });
    (0, _test.describe)("mapErr", function () {
      (0, _test.it)("should map the value if Ok(value)", function () {
        (0, _test.expect)(any($unwrapTraitObject((0, _core.Err)(1)).mapErr(function (value) {
          return value + value;
        }))).toEqual(any((0, _core.Err)(2)));
        return (0, _test.expect)($unwrapTraitObject($unwrapTraitObject((0, _core.Err)(2)).mapErr(function (value) {
          return value + value;
        })).unwrapErr()).toBe(4);
      });
      return (0, _test.it)("should not call the mapErr function if Err(err)", function () {
        return (0, _test.expect)(any($unwrapTraitObject((0, _core.Ok)(2)).mapErr(function (value) {
          return (0, _test.expect)("mapErr").toBe("not called");
        }))).toEqual(any((0, _core.Ok)(2)));
      });
    });
    (0, _test.describe)("unwrap", function () {
      (0, _test.it)("should return the value if Ok(value)", function () {
        return (0, _test.expect)($unwrapTraitObject((0, _core.Ok)("value")).unwrap()).toBe("value");
      });
      return (0, _test.it)("should panic if Err(err)", function () {
        return (0, _test.expect)(any(function () {
          return $unwrapTraitObject((0, _core.Err)("err")).unwrap();
        })).toThrow();
      });
    });
    return (0, _test.describe)("unwrapErr", function () {
      (0, _test.it)("should panic if Ok(value)", function () {
        return (0, _test.expect)(any(function () {
          return $unwrapTraitObject((0, _core.Ok)("value")).unwrapErr();
        })).toThrow();
      });
      return (0, _test.it)("should return the error if Err(err)", function () {
        return (0, _test.expect)($unwrapTraitObject((0, _core.Err)("err")).unwrapErr()).toBe("err");
      });
    });
  });
});
