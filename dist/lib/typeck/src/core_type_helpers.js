'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.PropertyError = exports.getCoreType = exports.wrapInOption = exports.getRecordPropType = exports.getNamedPropertyType = exports.getIndexedPropertyType = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("./scope");
const $puck_3 = require("./../../entities");
const $puck_4 = require("./types");
var PropertyError = exports.PropertyError = {
MissingProperty: {kind: 'MissingProperty', value: Symbol('MissingProperty')},
UnsupportedType: {kind: 'UnsupportedType', value: Symbol('UnsupportedType')},
Scope: (member) => ({kind: 'Scope', value: member}),
};
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
exports.getRecordPropType = getRecordPropType;
function getNamedPropertyType(scope, type_, propertyName) {
  let $puck_7 = type_.kind;
  if (($puck_7.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($puck_7.value).kind).kind === "Record")) {
    let {value: {kind: {value: record}}} = $puck_7;
    let $puck_8 = $puck_1.Option.map.call($puck_1.ObjectMap.get.call(record.properties, propertyName), getRecordPropType(scope));
    if ($puck_8 !== undefined) {
      let result = $puck_8;
      return $puck_1.Result.mapErr.call(result, PropertyError.Scope);
    }
    else {
      if (true) {
        const None = $puck_8;
        return $puck_1.Err(PropertyError.MissingProperty);
      };
    };
  }
  else {
    if ($puck_7.kind === "Intersection") {
      let {value: {baseType: baseType}} = $puck_7;
      return getNamedPropertyType(scope, baseType, propertyName);
    }
    else {
      if (true) {
        $puck_7;
        return $puck_1.Err(PropertyError.UnsupportedType);
      };
    };
  };
};
exports.getNamedPropertyType = getNamedPropertyType;
function getIndexedPropertyType(type_, index) {
  let $puck_9 = type_.kind;
  if (($puck_9.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($puck_9.value).kind).kind === "Tuple")) {
    let {value: {kind: {value: tuple}}} = $puck_9;
    let $puck_10 = $puck_1.List.get.call(tuple.properties, index);
    if ($puck_10 !== undefined) {
      let type_ = $puck_10;
      return $puck_1.Ok(type_);
    }
    else {
      if (true) {
        const None = $puck_10;
        return $puck_1.Err(PropertyError.MissingProperty);
      };
    };
  }
  else {
    if ($puck_9.kind === "Intersection") {
      let {value: {baseType: baseType}} = $puck_9;
      return getIndexedPropertyType(baseType, index);
    }
    else {
      if (true) {
        $puck_9;
        return $puck_1.Err(PropertyError.UnsupportedType);
      };
    };
  };
};
exports.getIndexedPropertyType = getIndexedPropertyType
