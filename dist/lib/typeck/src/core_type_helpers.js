'use strict';
exports.getCoreType = exports.wrapInOption = exports.getRecordPropType = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("./scope");
const $puck_3 = require("./../../entities");
const $puck_4 = require("./types");
function getCoreType(scope, id, description) {
  let $puck_5 = $puck_2.Scope.getBindingByTypeId.call(scope, id);
  if ($puck_5 !== undefined) {
    let binding = $puck_5;
    return $puck_1.Ok([
      $puck_1.Option.unwrap.call(binding.type_.providesType),
      binding,
    ]);
  }
  else {
    return $puck_1.Err("puck:core::" + id + " is not in scope. Please import " + id + " from puck:core to use " + description + ".");
  };
};
exports.getCoreType = getCoreType;
function wrapInOption(scope, type_) {
  let $puck_6 = getCoreType(scope, "Option", "optional properties");
  if ($puck_6.kind === "Ok") {
    let {value: [option, ]} = $puck_6;
    return $puck_1.Ok($puck_4.createTypeInstance(option, [type_]));
  }
  else {
    if ($puck_6.kind === "Err") {
      let {value: err} = $puck_6;
      return $puck_1.Err(err);
    };
  };
};
exports.wrapInOption = wrapInOption;
function getRecordPropType(scope) {
  return function (prop) {
    if (prop.optional) {
      return wrapInOption(scope, prop.type_);
    }
    else {
      return $puck_1.Ok(prop.type_);
    };
  };
};
exports.getRecordPropType = getRecordPropType
