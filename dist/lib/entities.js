'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.BuildFile = exports.UnparsedFile = exports.File = exports.Definition = exports.Type = exports.Enum = exports.Function = exports.Struct = exports.Trait = exports.Record = exports.Tuple = exports.Implementation = exports.TypeClass = exports.TypeInstance = exports.TypeParameter = exports.TypeKind = exports.StructKindundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("./ast/ast");
const $puck_4 = require("./ast/span");
const $puck_5 = require("./typeck/src/range");
const $puck_6 = require("./typeck/src/scope");
var BuildFile = exports.BuildFile = (object) => object;
var UnparsedFile = exports.UnparsedFile = (object) => object;
var File = exports.File = (object) => object;
var Definition = exports.Definition = (object) => object;
var Type = exports.Type = (object) => object;
var Enum = exports.Enum = (object) => object;
var Function = exports.Function = (object) => object;
var Struct = exports.Struct = (object) => object;
var Trait = exports.Trait = (object) => object;
var Record = exports.Record = (object) => object;
var Tuple = exports.Tuple = (object) => object;
var Implementation = exports.Implementation = (object) => object;
var TypeClass = exports.TypeClass = (object) => object;
var TypeInstance = exports.TypeInstance = (object) => object;
var TypeParameter = exports.TypeParameter = (object) => object;
var TypeKind = exports.TypeKind = {
Enum: (...members) => ({kind: 'Enum', value: members}),
Function: (...members) => ({kind: 'Function', value: members}),
Parameter: (...members) => ({kind: 'Parameter', value: members}),
Struct: (...members) => ({kind: 'Struct', value: members}),
Trait: (...members) => ({kind: 'Trait', value: members}),
};
var StructKind = exports.StructKind = {
Record: (...members) => ({kind: 'Record', value: members}),
Tuple: (...members) => ({kind: 'Tuple', value: members}),
Unit: {kind: 'Unit', value: Symbol('Unit')},
};
Type.empty = function (definition) {
  return {
    definition: definition,
    id: $puck_1.None,
    displayName: $puck_1.Some("()"),
    name: $puck_1.None,
    kind: TypeKind.Struct({
    implementations: [],
    kind: StructKind.Tuple({properties: []}),
  }),
    _class: $puck_1.None,
    instance: $puck_1.None,
    providesType: $puck_1.None,
    enumMember: $puck_1.None,
  };
};
Type.provides = function (type_) {
  return {
    definition: type_.definition,
    id: $puck_1.None,
    displayName: type_.displayName,
    name: type_.name,
    kind: TypeKind.Struct({
    implementations: [],
    kind: StructKind.Tuple({properties: []}),
  }),
    _class: type_._class,
    instance: type_.instance,
    providesType: $puck_1.Some(type_),
    enumMember: $puck_1.None,
  };
};
Type.unused = function (definition) {
  return {
    definition: definition,
    id: $puck_1.None,
    displayName: $puck_1.Some("_"),
    name: $puck_1.None,
    kind: TypeKind.Parameter({defaultValue: $puck_1.None}),
    _class: $puck_1.None,
    instance: $puck_1.None,
    providesType: $puck_1.None,
    enumMember: $puck_1.None,
  };
};
Type.displayName = function () {
  const self = this;
  if (!self) {
    return "??";
  };
  let $puck_7 = self.displayName;
  if ($puck_7.kind === "Some") {
    let {value: [name]} = $puck_7;
    return name;
  };
  let $puck_8 = self.kind;
  if ($unwrapTraitObject($puck_8).kind === "Enum") {
    let {value: [enum_]} = $unwrapTraitObject($puck_8);
    return getGenericName($puck_1.Option.unwrap.call(self.name), self);
  }
  else {
    if ($unwrapTraitObject($puck_8).kind === "Function") {
      let {value: [_function]} = $unwrapTraitObject($puck_8);
      return $puck_1.Option.unwrapOrElse.call(self.name, function () {
        return getFunctionTypeName(_function);
      });
    }
    else {
      if ($unwrapTraitObject($puck_8).kind === "Parameter") {
        let {value: [$puck_9]} = $unwrapTraitObject($puck_8);
        return $puck_1.Option.unwrap.call(self.name);
      }
      else {
        if ($unwrapTraitObject($puck_8).kind === "Struct") {
          let {value: [struct]} = $unwrapTraitObject($puck_8);
          return $puck_1.Option.mapOrElse.call(self.name, function () {
            let $puck_10 = struct.kind;
            if ($unwrapTraitObject($puck_10).kind === "Record") {
              let {value: [{properties: properties}]} = $unwrapTraitObject($puck_10);
              return getRecordTypeName(properties);
            }
            else {
              if ($unwrapTraitObject($puck_10).kind === "Tuple") {
                let {value: [{properties: properties}]} = $unwrapTraitObject($puck_10);
                return getTupleTypeName({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: properties, $isTraitObject: true});
              }
              else {
                if ($unwrapTraitObject($puck_10).kind === "Unit") {
                  let undefined = $unwrapTraitObject($puck_10);
                  return $puck_1.Option.unwrap.call(self.name);
                };
              };
            };
          }, function (name) {
            return getGenericName(name, self);
          });
        }
        else {
          if ($unwrapTraitObject($puck_8).kind === "Trait") {
            let {value: [$puck_11]} = $unwrapTraitObject($puck_8);
            return getGenericName($puck_1.Option.unwrap.call(self.name), self, true);
          };
        };
      };
    };
  };
};
Type.verboseName = function () {
  const self = this;
  if ((!self)) {
    return "??";
  };
  let $puck_12 = self.kind;
  if ($unwrapTraitObject($puck_12).kind === "Enum") {
    let {value: [enum_]} = $unwrapTraitObject($puck_12);
    return getGenericName($puck_1.Option.unwrap.call(self.name), self, true);
  }
  else {
    if ($unwrapTraitObject($puck_12).kind === "Function") {
      let {value: [_function]} = $unwrapTraitObject($puck_12);
      return getGenericName(getFunctionTypeName(_function), self, true);
    }
    else {
      if ($unwrapTraitObject($puck_12).kind === "Parameter") {
        let {value: [$puck_13]} = $unwrapTraitObject($puck_12);
        return $puck_1.Option.unwrap.call(self.name);
      }
      else {
        if ($unwrapTraitObject($puck_12).kind === "Struct") {
          let {value: [struct]} = $unwrapTraitObject($puck_12);
          let $puck_14 = struct.kind;
          if ($unwrapTraitObject($puck_14).kind === "Record") {
            let {value: [{properties: properties}]} = $unwrapTraitObject($puck_14);
            return getRecordTypeName(properties);
          }
          else {
            if ($unwrapTraitObject($puck_14).kind === "Tuple") {
              let {value: [{properties: properties}]} = $unwrapTraitObject($puck_14);
              return getTupleTypeName({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: properties, $isTraitObject: true});
            }
            else {
              if ($unwrapTraitObject($puck_14).kind === "Unit") {
                let undefined = $unwrapTraitObject($puck_14);
                return $puck_1.Option.unwrap.call(self.name);
              };
            };
          };
        }
        else {
          if ($unwrapTraitObject($puck_12).kind === "Trait") {
            let {value: [$puck_15]} = $unwrapTraitObject($puck_12);
            return getGenericName($puck_1.Option.unwrap.call(self.name), self, true);
          };
        };
      };
    };
  };
};
Type.getEnum = function () {
  const self = this;
  let $puck_16 = self.kind;
  if ($unwrapTraitObject($puck_16).kind === "Enum") {
    let {value: [enum_]} = $unwrapTraitObject($puck_16);
    return enum_;
  }
  else {
    if (true) {
      let $puck_17 = $puck_16;
      const name = Type.displayName.call(self);
      throw $puck_2.Error("Type " + name + " is not an enum");
    };
  };
};
Type.getFunction = function () {
  const self = this;
  let $puck_18 = self.kind;
  if ($unwrapTraitObject($puck_18).kind === "Function") {
    let {value: [_function]} = $unwrapTraitObject($puck_18);
    return _function;
  }
  else {
    if (true) {
      let $puck_19 = $puck_18;
      const name = Type.displayName.call(self);
      throw $puck_2.Error("Type " + name + " is not a function");
    };
  };
};
Type.getTrait = function () {
  const self = this;
  let $puck_20 = self.kind;
  if ($unwrapTraitObject($puck_20).kind === "Trait") {
    let {value: [trait_]} = $unwrapTraitObject($puck_20);
    return trait_;
  }
  else {
    if (true) {
      let $puck_21 = $puck_20;
      const name = Type.displayName.call(self);
      throw $puck_2.Error("Type " + name + " is not a trait");
    };
  };
};
Type.isEmpty = function () {
  const self = this;
  let $puck_22 = self.kind;
  if ($unwrapTraitObject($puck_22).kind === "Struct") {
    let {value: [struct]} = $unwrapTraitObject($puck_22);
    let $puck_23 = struct.kind;
    if ($unwrapTraitObject($puck_23).kind === "Tuple") {
      let {value: [tuple]} = $unwrapTraitObject($puck_23);
      return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true});
    }
    else {
      if (true) {
        let $puck_24 = $puck_23;
        return false;
      };
    };
  }
  else {
    if (true) {
      let $puck_25 = $puck_22;
      return false;
    };
  };
};
Type.isNever = function () {
  const self = this;
  let $puck_26 = self.kind;
  if ($unwrapTraitObject($puck_26).kind === "Enum") {
    let {value: [enum_]} = $unwrapTraitObject($puck_26);
    return $puck_1.ObjectMap.isEmpty.call(enum_.members);
  }
  else {
    if (true) {
      let $puck_27 = $puck_26;
      return false;
    };
  };
};
Type.isEnum = function () {
  const self = this;
  let $puck_28 = self.kind;
  if ($unwrapTraitObject($puck_28).kind === "Enum") {
    let {value: [$puck_29]} = $unwrapTraitObject($puck_28);
    return true;
  }
  else {
    if (true) {
      let $puck_30 = $puck_28;
      return false;
    };
  };
};
Type.isFunction = function () {
  const self = this;
  let $puck_31 = self.kind;
  if ($unwrapTraitObject($puck_31).kind === "Function") {
    let {value: [$puck_32]} = $unwrapTraitObject($puck_31);
    return true;
  }
  else {
    if (true) {
      let $puck_33 = $puck_31;
      return false;
    };
  };
};
Type.isParameter = function () {
  const self = this;
  let $puck_34 = self.kind;
  if ($unwrapTraitObject($puck_34).kind === "Parameter") {
    let {value: [$puck_35]} = $unwrapTraitObject($puck_34);
    return true;
  }
  else {
    if (true) {
      let $puck_36 = $puck_34;
      return false;
    };
  };
};
Type.typeParameters = function () {
  const self = this;
  return $puck_1.Option.orValue.call($puck_1.Option.map.call(self.instance, function (i) {
    return i.typeParameters;
  }), $puck_1.Option.map.call(self._class, function (i) {
    return i.typeParameters;
  }));
};
TypeClass.fromAstNode = function (astNode, reportError) {
  if ((astNode.typeParameters && $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: astNode.typeParameters, $isTraitObject: true}))) {
    const parameterRange = $puck_5.getRange(astNode.typeParameters, function (p) {
      return $puck_1.Option.isSome.call(p.defaultValue);
    }, reportError, "type parameter");
    return $puck_1.Some({
      parameterRange: parameterRange,
      typeParameters: [],
      typeParameterBindings: astNode.typeParameters,
      instances: [],
    });
  }
  else {
    return $puck_1.None;
  };
};
const startWithNumber = $puck_1.RegExp._new("^[0-9]");
function getFunctionTypeName(_function) {
  let $puck_37 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _function.parameters, $isTraitObject: true}, function (b) {
    const typeName = Type.displayName.call(b.type_);
    let $puck_38;
    if ($puck_1.RegExp.test.call(startWithNumber, b.name)) {
      $puck_38 = typeName;
    }
    else {
      $puck_38 = b.name + ": " + typeName + "";
    };
    const typed = $puck_38;
    if (b.mutable) {
      return "mut " + typed + "";
    }
    else {
      return typed;
    };
  })
;
  let parameters = $puck_1.Iterable[$puck_37.type].toList.call($puck_37);
  let $puck_39 = _function.selfBinding;
  if (($puck_39.kind === "Some")) {
    let {value: [selfBinding]} = $puck_39;
    if (selfBinding.mutable) {
      $puck_1.List.lpush.call(parameters, "mut self");
    }
    else {
      $puck_1.List.lpush.call(parameters, "self");
    };
  };
  parameters = parameters.join(", ");
  const returnType = Type.displayName.call(_function.returnType);
  return "(" + parameters + ") -> " + returnType + "";
};
function getTupleTypeName(properties) {
  return "(" + $puck_1.Iterable[properties.type].map.call(properties, function (type_) {
    return Type.displayName.call(type_);
  }).value.join(", ") + ")";
};
function getRecordTypeName(properties) {
  return "{" + $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.ObjectMap.toList.call(properties), $isTraitObject: true}, function ([key, type_]) {
    return "" + key + ": " + Type.displayName.call(type_);
  }).value.join(", ") + "}";
};
function getGenericName(name, type_, showClassParameters = false) {
  let $puck_40 = type_.instance;
  let $puck_41;
  if (($puck_40.kind === "Some")) {
    let {value: [instance]} = $puck_40;
    $puck_41 = "<" + $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: instance.typeParameters, $isTraitObject: true}, function (p) {
      return Type.displayName.call(p);
    }).value.join(", ") + ">";
  }
  else {
    let $puck_42;
    if (showClassParameters) {
      let $puck_43 = type_._class;
      let $puck_44;
      if (($puck_43.kind === "Some")) {
        let {value: [_class]} = $puck_43;
        $puck_44 = "<" + $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _class.typeParameters, $isTraitObject: true}, function (p) {
          return Type.displayName.call(p);
        }).value.join(", ") + ">";
      }
      else {
        $puck_44 = "";
      };
      $puck_42 = $puck_44;
    }
    else {
      $puck_42 = "";
    };
    $puck_41 = $puck_42;
  };
  const parameters = $puck_41;
  if (Type.isFunction.call(type_)) {
    return parameters + name;
  }
  else {
    return name + parameters;
  };
}
