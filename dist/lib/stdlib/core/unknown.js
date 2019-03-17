'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.Unknown = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const js = require("puck-lang/dist/lib/stdlib/js");
var Unknown = exports.Unknown = (object) => object;
Unknown.from = function (value) {
  return $unwrapTraitObject(value);
};
Unknown.isNull = function () {
  const self = this;
  return $puck_1.identical(self, $puck_2._null);
};
Unknown.isUndefined = function () {
  const self = this;
  return $puck_1.identical(self, $unwrapTraitObject($puck_2._undefined));
};
Unknown.isBool = function () {
  const self = this;
  return $unwrapTraitObject(js)._typeof(self) === "boolean";
};
Unknown.isNum = function () {
  const self = this;
  return $unwrapTraitObject(js)._typeof(self) === "number";
};
Unknown.isString = function () {
  const self = this;
  return $unwrapTraitObject(js)._typeof(self) === "string";
};
Unknown.isList = function () {
  const self = this;
  return $unwrapTraitObject($puck_2.Array.isArray(self));
};
Unknown.isObject = function () {
  const self = this;
  return (!$puck_1.identical(self, $puck_2._null) && $unwrapTraitObject(js)._typeof(self) === "object");
};
Unknown.asBool = function () {
  const self = this;
  if (Unknown.isBool.call(self)) {
    return $puck_1.Some(self);
  }
  else {
    return $puck_1.None;
  };
};
Unknown.asNum = function () {
  const self = this;
  if (Unknown.isNum.call(self)) {
    return $puck_1.Some(self);
  }
  else {
    return $puck_1.None;
  };
};
Unknown.asString = function () {
  const self = this;
  if (Unknown.isString.call(self)) {
    return $puck_1.Some(self);
  }
  else {
    return $puck_1.None;
  };
};
Unknown.asList = function () {
  const self = this;
  if (Unknown.isList.call(self)) {
    return $puck_1.Some(self);
  }
  else {
    return $puck_1.None;
  };
};
Unknown.getProp = function (property) {
  const self = this;
  if ((!(Unknown.isNull.call(self) || Unknown.isUndefined.call(self)))) {
    if ($puck_2._Object.prototype.hasOwnProperty.call(self, property)) {
      return $puck_1.Some(self[property]);
    }
    else {
      return $puck_1.None;
    };
  }
  else {
    return $puck_1.None;
  };
};
Unknown.transmute = function () {
  const self = this;
  return self;
}
