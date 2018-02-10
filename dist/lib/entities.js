'use strict';
exports.BuildFile = exports.File = exports.Definition = exports.Type = exports.Enum = exports.Function = exports.Intersection = exports.Struct = exports.Trait = exports.Record = exports.RecordMember = exports.Tuple = exports.Implementation = exports.TypeClass = exports.TypeInstance = exports.TypeParameter = exports.CompilationError = exports.TypeKind = exports.StructKind = undefined;
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
var Intersection = exports.Intersection = (object) => object;
var Struct = exports.Struct = (object) => object;
var Trait = exports.Trait = (object) => object;
var Record = exports.Record = (object) => object;
var RecordMember = exports.RecordMember = (object) => object;
var Tuple = exports.Tuple = (object) => object;
var Implementation = exports.Implementation = (object) => object;
var TypeClass = exports.TypeClass = (object) => object;
var TypeInstance = exports.TypeInstance = (object) => object;
var TypeParameter = exports.TypeParameter = (object) => object;
var CompilationError = exports.CompilationError = {
UndefinedVariable: (member) => ({kind: 'UndefinedVariable', value: member}),
TraitNotInScope: (object) => ({kind: 'TraitNotInScope', value: object}),
Other: (member) => ({kind: 'Other', value: member}),
};
var TypeKind = exports.TypeKind = {
Enum: (member) => ({kind: 'Enum', value: member}),
Function: (member) => ({kind: 'Function', value: member}),
Intersection: (member) => ({kind: 'Intersection', value: member}),
Parameter: (member) => ({kind: 'Parameter', value: member}),
Struct: (member) => ({kind: 'Struct', value: member}),
Trait: (member) => ({kind: 'Trait', value: member}),
};
var StructKind = exports.StructKind = {
Record: (member) => ({kind: 'Record', value: member}),
Tuple: (member) => ({kind: 'Tuple', value: member}),
Unit: {kind: 'Unit', value: Symbol('Unit')},
};
CompilationError.message = function () {
  const self = this;
  let $puck_7 = self;
  if ($puck_7.kind === "UndefinedVariable") {
    let {value: name} = $puck_7;
    return "Use of undefined variable " + name + "";
  }
  else {
    if ($puck_7.kind === "TraitNotInScope") {
      let {value: {functionName: functionName, traitName: traitName}} = $puck_7;
      return "The function " + functionName + " is defined in trait " + traitName + " but it is not in scope";
    }
    else {
      if ($puck_7.kind === "Other") {
        let {value: name} = $puck_7;
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
Type.never = function (definition) {
  return {
    definition: definition,
    id: $puck_1.None,
    displayName: $puck_1.Some("Never"),
    name: $puck_1.None,
    kind: TypeKind.Enum({
    implementations: [],
    members: $puck_1.ObjectMap._new(),
  }),
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
  if ($puck_8 !== undefined) {
    let name = $puck_8;
    return name;
  };
  let $puck_9 = self.kind;
  if ($puck_9.kind === "Enum") {
    let {value: enum_} = $puck_9;
    return getGenericName($puck_1.Option.unwrap.call(self.name), self);
  }
  else {
    if ($puck_9.kind === "Function") {
      let {value: _function} = $puck_9;
      return $puck_1.Option.unwrapOrElse.call(self.name, function () {
        return getFunctionTypeName(_function);
      });
    }
    else {
      if ($puck_9.kind === "Intersection") {
        let {value: intersection} = $puck_9;
        return Type.displayName.call(intersection.baseType) + " + " + Type.displayName.call(intersection.intersectedTrait);
      }
      else {
        if (($puck_9.kind === "Parameter")) {
          $puck_9;
          return $puck_1.Option.unwrap.call(self.name);
        }
        else {
          if ($puck_9.kind === "Struct") {
            let {value: struct} = $puck_9;
            return $puck_1.Option.mapOrElse.call(self.name, function () {
              let $puck_10 = struct.kind;
              if ($puck_10.kind === "Record") {
                let {value: {properties: properties}} = $puck_10;
                return getRecordTypeName(properties);
              }
              else {
                if ($puck_10.kind === "Tuple") {
                  let {value: {properties: properties}} = $puck_10;
                  return getTupleTypeName({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: properties, $isTraitObject: true});
                }
                else {
                  if ($puck_10.kind === "Unit") {
                    $puck_10;
                    return $puck_1.Option.unwrap.call(self.name);
                  };
                };
              };
            }, function (name) {
              return getGenericName(name, self);
            });
          }
          else {
            if ($puck_9.kind === "Trait") {
              $puck_9;
              return getGenericName($puck_1.Option.unwrap.call(self.name), self, true);
            };
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
  let $puck_11 = self.kind;
  if ($puck_11.kind === "Enum") {
    let {value: enum_} = $puck_11;
    return getGenericName($puck_1.Option.unwrap.call(self.name), self, true);
  }
  else {
    if ($puck_11.kind === "Function") {
      let {value: _function} = $puck_11;
      return getGenericName(getFunctionTypeName(_function), self, true);
    }
    else {
      if ($puck_11.kind === "Intersection") {
        let {value: intersection} = $puck_11;
        return Type.verboseName.call(intersection.baseType) + " + " + Type.verboseName.call(intersection.intersectedTrait);
      }
      else {
        if (($puck_11.kind === "Parameter")) {
          $puck_11;
          return $puck_1.Option.unwrap.call(self.name);
        }
        else {
          if ($puck_11.kind === "Struct") {
            let {value: struct} = $puck_11;
            let $puck_12 = struct.kind;
            if ($puck_12.kind === "Record") {
              let {value: {properties: properties}} = $puck_12;
              return getRecordTypeName(properties);
            }
            else {
              if ($puck_12.kind === "Tuple") {
                let {value: {properties: properties}} = $puck_12;
                return getTupleTypeName({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: properties, $isTraitObject: true});
              }
              else {
                if ($puck_12.kind === "Unit") {
                  $puck_12;
                  return $puck_1.Option.unwrap.call(self.name);
                };
              };
            };
          }
          else {
            if ($puck_11.kind === "Trait") {
              $puck_11;
              return getGenericName($puck_1.Option.unwrap.call(self.name), self, true);
            };
          };
        };
      };
    };
  };
};
Type.getEnum = function () {
  const self = this;
  let $puck_13 = self.kind;
  if ($puck_13.kind === "Enum") {
    let {value: enum_} = $puck_13;
    return enum_;
  }
  else {
    if (true) {
      $puck_13;
      const name = Type.displayName.call(self);
      throw $puck_2.Error("Type " + name + " is not an enum");
    };
  };
};
Type.getFunction = function () {
  const self = this;
  let $puck_14 = self.kind;
  if ($puck_14.kind === "Function") {
    let {value: _function} = $puck_14;
    return _function;
  }
  else {
    if (true) {
      $puck_14;
      const name = Type.displayName.call(self);
      throw $puck_2.Error("Type " + name + " is not a function");
    };
  };
};
Type.getTrait = function () {
  const self = this;
  let $puck_15 = self.kind;
  if ($puck_15.kind === "Trait") {
    let {value: trait_} = $puck_15;
    return trait_;
  }
  else {
    if (true) {
      $puck_15;
      const name = Type.displayName.call(self);
      throw $puck_2.Error("Type " + name + " is not a trait");
    };
  };
};
Type.isEmpty = function () {
  const self = this;
  let $puck_16 = self.kind;
  if ($puck_16.kind === "Struct") {
    let {value: struct} = $puck_16;
    let $puck_17 = struct.kind;
    if ($puck_17.kind === "Tuple") {
      let {value: tuple} = $puck_17;
      return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: tuple.properties, $isTraitObject: true});
    }
    else {
      if (true) {
        $puck_17;
        return false;
      };
    };
  }
  else {
    if (true) {
      $puck_16;
      return false;
    };
  };
};
Type.isNever = function () {
  const self = this;
  let $puck_18 = self.kind;
  if ($puck_18.kind === "Enum") {
    let {value: enum_} = $puck_18;
    return $puck_1.ObjectMap.isEmpty.call(enum_.members);
  }
  else {
    if (true) {
      $puck_18;
      return false;
    };
  };
};
Type.isEnum = function () {
  const self = this;
  let $puck_19 = self.kind;
  if ($puck_19.kind === "Enum") {
    $puck_19;
    return true;
  }
  else {
    if (true) {
      $puck_19;
      return false;
    };
  };
};
Type.isFunction = function () {
  const self = this;
  let $puck_20 = self.kind;
  if ($puck_20.kind === "Function") {
    $puck_20;
    return true;
  }
  else {
    if (true) {
      $puck_20;
      return false;
    };
  };
};
Type.isParameter = function () {
  const self = this;
  let $puck_21 = self.kind;
  if ($puck_21.kind === "Parameter") {
    $puck_21;
    return true;
  }
  else {
    if (true) {
      $puck_21;
      return false;
    };
  };
};
Type.isTrait = function () {
  const self = this;
  let $puck_22 = self.kind;
  if ($puck_22.kind === "Trait") {
    $puck_22;
    return true;
  }
  else {
    if (true) {
      $puck_22;
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
  let $puck_23 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _function.parameters, $isTraitObject: true}, function (b) {
    const typeName = Type.displayName.call(b.type_);
    let $puck_24;
    if ($puck_1.RegExp.test.call(startWithNumber, b.name)) {
      $puck_24 = typeName;
    }
    else {
      $puck_24 = b.name + ": " + typeName + "";
    };
    const typed = $puck_24;
    if (b.mutable) {
      return "mut " + typed + "";
    }
    else {
      return typed;
    };
  })
;
  let parameters = $puck_1.Iterable[$puck_23.type].toList.call($puck_23);
  let $puck_25 = _function.selfBinding;
  if (($puck_25 !== undefined)) {
    let selfBinding = $puck_25;
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
  return "{" + $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.ObjectMap.toList.call(properties), $isTraitObject: true}, function ([key, {type_: type_, optional: optional}]) {
    let $puck_26;
    if (optional) {
      $puck_26 = "?";
    }
    else {
      $puck_26 = "";
    };
    const questionMark = $puck_26;
    return "" + key + "" + questionMark + ": " + Type.displayName.call(type_);
  }).value.join(", ") + "}";
};
function getGenericName(name, type_, showClassParameters = false) {
  let $puck_27 = type_.instance;
  let $puck_28;
  if (($puck_27 !== undefined)) {
    let instance = $puck_27;
    $puck_28 = "<" + $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: instance.typeParameters, $isTraitObject: true}, function (p) {
      return Type.displayName.call(p);
    }).value.join(", ") + ">";
  }
  else {
    let $puck_29;
    if (showClassParameters) {
      let $puck_30 = type_._class;
      let $puck_31;
      if (($puck_30 !== undefined)) {
        let _class = $puck_30;
        $puck_31 = "<" + $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _class.typeParameters, $isTraitObject: true}, function (p) {
          return Type.displayName.call(p);
        }).value.join(", ") + ">";
      }
      else {
        $puck_31 = "";
      };
      $puck_29 = $puck_31;
    }
    else {
      $puck_29 = "";
    };
    $puck_28 = $puck_29;
  };
  const parameters = $puck_28;
  if (Type.isFunction.call(type_)) {
    return parameters + name;
  }
  else {
    return name + parameters;
  };
}
