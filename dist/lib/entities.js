'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.BuildFile = exports.File = exports.Definition = exports.Type = exports.Enum = exports.Function = exports.Struct = exports.Trait = exports.Record = exports.Tuple = exports.Implementation = exports.TypeClass = exports.TypeInstance = exports.TypeParameter = exports.CompilationError = exports.TypeKind = exports.StructKindundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("./ast/ast");
const $puck_4 = require("./ast/span");
const $puck_5 = require("./typeck/src/range");
const $puck_6 = require("./typeck/src/scope");
var BuildFile = exports.BuildFile = (object) => object;
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
var CompilationError = exports.CompilationError = {
UndefinedVariable: (...members) => ({kind: 'UndefinedVariable', value: members}),
TraitNotInScope: (object) => ({kind: 'TraitNotInScope', value: object}),
Other: (...members) => ({kind: 'Other', value: members}),
};
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
CompilationError.message = function () {
  const self = this;
  let $puck_7 = self;
  if ($unwrapTraitObject($puck_7).kind === "UndefinedVariable") {
    let {value: [name]} = $unwrapTraitObject($puck_7);
    return "Use of undefined variable " + name + "";
  }
  else {
    if ($unwrapTraitObject($puck_7).kind === "TraitNotInScope") {
      let {value: {functionName: functionName, traitName: traitName}} = $unwrapTraitObject($puck_7);
      return "The function " + functionName + " is defined in trait " + traitName + " but it is not in scope";
    }
    else {
      if ($unwrapTraitObject($puck_7).kind === "Other") {
        let {value: [name]} = $unwrapTraitObject($puck_7);
        return name;
      };
    };
  };
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
  if ((!self)) {
    return "??";
  };
  let $puck_8 = self.displayName;
  if ($puck_8.kind === "Some") {
    let {value: [name]} = $puck_8;
    return name;
  };
  let $puck_9 = self.kind;
  if ($unwrapTraitObject($puck_9).kind === "Enum") {
    let {value: [enum_]} = $unwrapTraitObject($puck_9);
    return getGenericName($puck_1.Option.unwrap.call(self.name), self);
  }
  else {
    if ($unwrapTraitObject($puck_9).kind === "Function") {
      let {value: [_function]} = $unwrapTraitObject($puck_9);
      return $puck_1.Option.unwrapOrElse.call(self.name, function () {
        return getFunctionTypeName(_function);
      });
    }
    else {
      if ($unwrapTraitObject($puck_9).kind === "Parameter") {
        let {value: [$puck_10]} = $unwrapTraitObject($puck_9);
        return $puck_1.Option.unwrap.call(self.name);
      }
      else {
        if ($unwrapTraitObject($puck_9).kind === "Struct") {
          let {value: [struct]} = $unwrapTraitObject($puck_9);
          return $puck_1.Option.mapOrElse.call(self.name, function () {
            let $puck_11 = struct.kind;
            if ($unwrapTraitObject($puck_11).kind === "Record") {
              let {value: [{properties: properties}]} = $unwrapTraitObject($puck_11);
              return getRecordTypeName(properties);
            }
            else {
              if ($unwrapTraitObject($puck_11).kind === "Tuple") {
                let {value: [{properties: properties}]} = $unwrapTraitObject($puck_11);
                return getTupleTypeName({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: properties, $isTraitObject: true});
              }
              else {
                if ($unwrapTraitObject($puck_11).kind === "Unit") {
                  let undefined = $unwrapTraitObject($puck_11);
                  return $puck_1.Option.unwrap.call(self.name);
                };
              };
            };
          }, function (name) {
            return getGenericName(name, self);
          });
        }
        else {
          if ($unwrapTraitObject($puck_9).kind === "Trait") {
            let {value: [$puck_12]} = $unwrapTraitObject($puck_9);
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
  let $puck_13 = self.kind;
  if ($unwrapTraitObject($puck_13).kind === "Enum") {
    let {value: [enum_]} = $unwrapTraitObject($puck_13);
    return getGenericName($puck_1.Option.unwrap.call(self.name), self, true);
  }
  else {
    if ($unwrapTraitObject($puck_13).kind === "Function") {
      let {value: [_function]} = $unwrapTraitObject($puck_13);
      return getGenericName(getFunctionTypeName(_function), self, true);
    }
    else {
      if ($unwrapTraitObject($puck_13).kind === "Parameter") {
        let {value: [$puck_14]} = $unwrapTraitObject($puck_13);
        return $puck_1.Option.unwrap.call(self.name);
      }
      else {
        if ($unwrapTraitObject($puck_13).kind === "Struct") {
          let {value: [struct]} = $unwrapTraitObject($puck_13);
          let $puck_15 = struct.kind;
          if ($unwrapTraitObject($puck_15).kind === "Record") {
            let {value: [{properties: properties}]} = $unwrapTraitObject($puck_15);
            return getRecordTypeName(properties);
          }
          else {
            if ($unwrapTraitObject($puck_15).kind === "Tuple") {
              let {value: [{properties: properties}]} = $unwrapTraitObject($puck_15);
              return getTupleTypeName({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: properties, $isTraitObject: true});
            }
            else {
              if ($unwrapTraitObject($puck_15).kind === "Unit") {
                let undefined = $unwrapTraitObject($puck_15);
                return $puck_1.Option.unwrap.call(self.name);
              };
            };
          };
        }
        else {
          if ($unwrapTraitObject($puck_13).kind === "Trait") {
            let {value: [$puck_16]} = $unwrapTraitObject($puck_13);
            return getGenericName($puck_1.Option.unwrap.call(self.name), self, true);
          };
        };
      };
    };
  };
};
Type.getEnum = function () {
  const self = this;
  let $puck_17 = self.kind;
  if ($unwrapTraitObject($puck_17).kind === "Enum") {
    let {value: [enum_]} = $unwrapTraitObject($puck_17);
    return enum_;
  }
  else {
    if (true) {
      let $puck_18 = $puck_17;
      const name = Type.displayName.call(self);
      throw $puck_2.Error("Type " + name + " is not an enum");
    };
  };
};
Type.getFunction = function () {
  const self = this;
  let $puck_19 = self.kind;
  if ($unwrapTraitObject($puck_19).kind === "Function") {
    let {value: [_function]} = $unwrapTraitObject($puck_19);
    return _function;
  }
  else {
    if (true) {
      let $puck_20 = $puck_19;
      const name = Type.displayName.call(self);
      throw $puck_2.Error("Type " + name + " is not a function");
    };
  };
};
Type.getTrait = function () {
  const self = this;
  let $puck_21 = self.kind;
  if ($unwrapTraitObject($puck_21).kind === "Trait") {
    let {value: [trait_]} = $unwrapTraitObject($puck_21);
    return trait_;
  }
  else {
    if (true) {
      let $puck_22 = $puck_21;
      const name = Type.displayName.call(self);
      throw $puck_2.Error("Type " + name + " is not a trait");
    };
  };
};
Type.isEmpty = function () {
  const self = this;
  let $puck_23 = self.kind;
  if ($unwrapTraitObject($puck_23).kind === "Struct") {
    let {value: [struct]} = $unwrapTraitObject($puck_23);
    let $puck_24 = struct.kind;
    if ($unwrapTraitObject($puck_24).kind === "Tuple") {
      let {value: [tuple]} = $unwrapTraitObject($puck_24);
      return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true});
    }
    else {
      if (true) {
        let $puck_25 = $puck_24;
        return false;
      };
    };
  }
  else {
    if (true) {
      let $puck_26 = $puck_23;
      return false;
    };
  };
};
Type.isNever = function () {
  const self = this;
  let $puck_27 = self.kind;
  if ($unwrapTraitObject($puck_27).kind === "Enum") {
    let {value: [enum_]} = $unwrapTraitObject($puck_27);
    return $puck_1.ObjectMap.isEmpty.call(enum_.members);
  }
  else {
    if (true) {
      let $puck_28 = $puck_27;
      return false;
    };
  };
};
Type.isEnum = function () {
  const self = this;
  let $puck_29 = self.kind;
  if ($unwrapTraitObject($puck_29).kind === "Enum") {
    let {value: [$puck_30]} = $unwrapTraitObject($puck_29);
    return true;
  }
  else {
    if (true) {
      let $puck_31 = $puck_29;
      return false;
    };
  };
};
Type.isFunction = function () {
  const self = this;
  let $puck_32 = self.kind;
  if ($unwrapTraitObject($puck_32).kind === "Function") {
    let {value: [$puck_33]} = $unwrapTraitObject($puck_32);
    return true;
  }
  else {
    if (true) {
      let $puck_34 = $puck_32;
      return false;
    };
  };
};
Type.isParameter = function () {
  const self = this;
  let $puck_35 = self.kind;
  if ($unwrapTraitObject($puck_35).kind === "Parameter") {
    let {value: [$puck_36]} = $unwrapTraitObject($puck_35);
    return true;
  }
  else {
    if (true) {
      let $puck_37 = $puck_35;
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
  let $puck_38 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _function.parameters, $isTraitObject: true}, function (b) {
    const typeName = Type.displayName.call(b.type_);
    let $puck_39;
    if ($puck_1.RegExp.test.call(startWithNumber, b.name)) {
      $puck_39 = typeName;
    }
    else {
      $puck_39 = b.name + ": " + typeName + "";
    };
    const typed = $puck_39;
    if (b.mutable) {
      return "mut " + typed + "";
    }
    else {
      return typed;
    };
  })
;
  let parameters = $puck_1.Iterable[$puck_38.type].toList.call($puck_38);
  let $puck_40 = _function.selfBinding;
  if (($puck_40.kind === "Some")) {
    let {value: [selfBinding]} = $puck_40;
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
  let $puck_41 = type_.instance;
  let $puck_42;
  if (($puck_41.kind === "Some")) {
    let {value: [instance]} = $puck_41;
    $puck_42 = "<" + $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: instance.typeParameters, $isTraitObject: true}, function (p) {
      return Type.displayName.call(p);
    }).value.join(", ") + ">";
  }
  else {
    let $puck_43;
    if (showClassParameters) {
      let $puck_44 = type_._class;
      let $puck_45;
      if (($puck_44.kind === "Some")) {
        let {value: [_class]} = $puck_44;
        $puck_45 = "<" + $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _class.typeParameters, $isTraitObject: true}, function (p) {
          return Type.displayName.call(p);
        }).value.join(", ") + ">";
      }
      else {
        $puck_45 = "";
      };
      $puck_43 = $puck_45;
    }
    else {
      $puck_43 = "";
    };
    $puck_42 = $puck_43;
  };
  const parameters = $puck_42;
  if (Type.isFunction.call(type_)) {
    return parameters + name;
  }
  else {
    return name + parameters;
  };
}
