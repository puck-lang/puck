'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.Binding = exports.Scope = exports.ScopeError = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("util");
const $puck_4 = require("./../../ast/ast");
const $puck_5 = require("./../../ast/span");
const $puck_6 = require("./../../compiler");
const $puck_7 = require("./../../compiler/ast");
const $puck_8 = require("./../../entities");
var Binding = exports.Binding = (object) => object;
var Scope = exports.Scope = (object) => object;
var ScopeError = exports.ScopeError = {
UndefinedType: (member) => ({kind: 'UndefinedType', value: member}),
Other: (member) => ({kind: 'Other', value: member}),
};
Scope._new = function (context) {
  return {
    context: context,
    parent: $puck_1.None,
    bindings: $puck_1.ObjectMap._new(),
    bindingsByTypeId: $puck_1.ObjectMap._new(),
  };
};
Scope.createChild = function () {
  const self = this;
  return {
    context: self.context,
    parent: $puck_1.Some(self),
    bindings: $puck_1.ObjectMap._new(),
    bindingsByTypeId: $puck_1.ObjectMap._new(),
  };
};
Scope.getBindings = function () {
  const self = this;
  let $puck_9 = self.parent;
  if ($puck_9.kind === "Some") {
    let {value: parent} = $puck_9;
    return $puck_2._Object.assign({}, Scope.getBindings.call(parent), self.bindings);
  }
  else {
    return self.bindings;
  };
};
Scope.getBinding = function (name, visitor = "") {
  const self = this;
  return $puck_1.Option.map.call($puck_1.Option.orElse.call($puck_1.ObjectMap.get.call(self.bindings, name), function () {
    return $puck_1.Option.andThen.call(self.parent, function (p) {
      return Scope.getBinding.call(p, name, visitor);
    });
  }), function (binding) {
    let $puck_10 = binding.completeType;
    if ($puck_10.kind === "Some") {
      let {value: completeType} = $puck_10;
      let $puck_11 = completeType(visitor);
      if ($puck_11.kind === "Some") {
        let {value: type_} = $puck_11;
        if ((!binding.type_ && type_)) {
          let $puck_12 = type_.providesType;
          if (($puck_12.kind === "Some" && $unwrapTraitObject($unwrapTraitObject($puck_12.value).id).kind === "Some")) {
            let {value: {id: {value: id}}} = $puck_12;
            self.bindingsByTypeId[id] = binding;
          };
        };
        binding.type_ = type_;
      };
    };
    return binding;
  });
};
Scope.getBindingByTypeId = function (id) {
  const self = this;
  return $puck_1.Option.map.call($puck_1.Option.orElse.call($puck_1.ObjectMap.get.call(self.bindingsByTypeId, id), function () {
    return $puck_1.Option.andThen.call(self.parent, function (p) {
      return Scope.getBindingByTypeId.call(p, id);
    });
  }), function (binding) {
    let $puck_13 = binding.completeType;
    if ($puck_13.kind === "Some") {
      let {value: completeType} = $puck_13;
      let $puck_14 = completeType("");
      if ($puck_14.kind === "Some") {
        let {value: type_} = $puck_14;
        binding.type_ = type_;
      };
    };
    return binding;
  });
};
Scope.define = function (binding, useParentScope = false) {
  let self = this;
  if (binding.name === "Self") {
    return $puck_1.Err("Self is a reserved name");
  };
  let $puck_15 = $puck_1.ObjectMap.get.call(self.bindings, binding.name);
  let $puck_16;
  if ($unwrapTraitObject($puck_15).kind === "Some") {
    let {value: previous} = $unwrapTraitObject($puck_15);
    let $puck_17;
    if (previous.allowRedeclare) {
      $puck_17 = $puck_1.Some(previous);
    }
    else {
      return $puck_1.Err(binding.name + " is already defined");
    };
    $puck_16 = $puck_17;
  }
  else {
    let $puck_18;
    if (($unwrapTraitObject($puck_15).kind === "None")) {
      $unwrapTraitObject($puck_15);
      let $puck_19;
      if (useParentScope) {
        let $puck_20 = $puck_1.Option.andThen.call(self.parent, function (p) {
          return $puck_1.ObjectMap.get.call(p.bindings, binding.name);
        });
        let $puck_21;
        if ($puck_20.kind === "Some") {
          let {value: previous} = $puck_20;
          let $puck_22;
          if (previous.allowRedeclare) {
            $puck_22 = $puck_1.Some(previous);
          }
          else {
            return $puck_1.Err(binding.name + " is already defined");
          };
          $puck_21 = $puck_22;
        }
        else {
          $puck_21 = $puck_1.None;
        };
        $puck_19 = $puck_21;
      }
      else {
        $puck_19 = $puck_1.None;
      };
      $puck_18 = $puck_19;
    };
    $puck_16 = $puck_18;
  };
  const previous = $puck_16;
  binding = {
    definition: binding.definition,
    name: binding.name,
    mutable: binding.mutable,
    allowRedeclare: binding.allowRedeclare,
    type_: binding.type_,
    completeType: binding.completeType,
    previous: previous,
  };
  $puck_1.ObjectMap.set.call(self.bindings, binding.name, binding);
  if (binding.type_) {
    let $puck_23 = binding.type_.providesType;
    if (($puck_23.kind === "Some" && $unwrapTraitObject($unwrapTraitObject($puck_23.value).id).kind === "Some")) {
      let {value: {id: {value: id}}} = $puck_23;
      $puck_1.ObjectMap.set.call(self.bindingsByTypeId, id, binding);
    };
  };
  return $puck_1.Ok(binding);
};
Scope.setSelfType = function (selfType) {
  let self = this;
  $puck_1.ObjectMap.set.call(self.bindings, "Self", {
    definition: selfType.definition,
    name: "Self",
    mutable: false,
    allowRedeclare: false,
    type_: $puck_8.Type.provides(selfType),
    previous: $puck_1.None,
    completeType: $puck_1.None,
  });
};
Scope.getTypePath = function (typePath, visitor = "") {
  const self = this;
  let $puck_24 = typePath;
  if ($unwrapTraitObject($puck_24).kind === "Member") {
    let {value: identifier} = $unwrapTraitObject($puck_24);
    let $puck_25 = Scope.getBinding.call(self, identifier.name, visitor);
    if ($puck_25.kind === "Some") {
      let {value: binding} = $puck_25;
      identifier.binding = binding;
      return $puck_1.Ok(binding);
    }
    else {
      return $puck_1.Err(ScopeError.UndefinedType(identifier.name));
    };
  }
  else {
    if ($unwrapTraitObject($puck_24).kind === "_Object") {
      let {value: [identifier, path]} = $unwrapTraitObject($puck_24);
      let token = {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true};
      let name = identifier.name;
      let path_ = path;
      let $puck_26 = Scope.getBinding.call(self, name, visitor);
      let $puck_27;
      if ($unwrapTraitObject($puck_26).kind === "Some") {
        let {value: binding} = $unwrapTraitObject($puck_26);
        $puck_27 = binding;
      }
      else {
        let $puck_28;
        if ($unwrapTraitObject($puck_26).kind === "None") {
          $unwrapTraitObject($puck_26);
          return $puck_1.Err(ScopeError.UndefinedType(name));
        };
        $puck_27 = $puck_28;
      };
      const binding = $puck_27;
      identifier.binding = binding;
      let type_ = binding.type_;
      while (true) {
        let displayPath = "" + name + "";
        const providesType = $puck_1.Option.unwrapOr.call(type_.providesType, type_);
        let $puck_29 = path_;
        if ($unwrapTraitObject($puck_29).kind === "Member") {
          let {value: identifier} = $unwrapTraitObject($puck_29);
          token = {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true};
          name = identifier.name;
          let $puck_30 = getTypeMember(providesType, displayPath, name);
          let $puck_31;
          if ($unwrapTraitObject($puck_30).kind === "Ok") {
            let {value: type_} = $unwrapTraitObject($puck_30);
            $puck_31 = type_;
          }
          else {
            let $puck_32;
            if ($unwrapTraitObject($puck_30).kind === "Err") {
              let {value: err} = $unwrapTraitObject($puck_30);
              return $puck_1.Err(ScopeError.Other(err));
            };
            $puck_31 = $puck_32;
          };
          type_ = $puck_31;
          break        }
        else {
          if ($unwrapTraitObject($puck_29).kind === "_Object") {
            let {value: [identifier, path]} = $unwrapTraitObject($puck_29);
            token = {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true};
            name = identifier.name;
            path_ = path;
            let $puck_33 = getTypeMember(providesType, displayPath, name);
            let $puck_34;
            if ($unwrapTraitObject($puck_33).kind === "Ok") {
              let {value: type_} = $unwrapTraitObject($puck_33);
              $puck_34 = type_;
            }
            else {
              let $puck_35;
              if ($unwrapTraitObject($puck_33).kind === "Err") {
                let {value: err} = $unwrapTraitObject($puck_33);
                return $puck_1.Err(ScopeError.Other(err));
              };
              $puck_34 = $puck_35;
            };
            type_ = $puck_34;
            displayPath = "" + displayPath + "::" + name + "";
          };
        };
      };
      return $puck_1.Ok(Binding({
        definition: type_.definition,
        name: name,
        mutable: binding.mutable,
        allowRedeclare: binding.allowRedeclare,
        type_: type_,
        previous: binding.previous,
        completeType: binding.completeType,
      }));
    };
  };
};
Scope.merge = function (other) {
  let self = this;
  $puck_2._Object.assign(self.bindings, other.bindings);
};
function getTypeMember(type_, displayPath, member) {
  let $puck_36 = type_.kind;
  if ($unwrapTraitObject($puck_36).kind === "Enum") {
    let {value: enum_} = $unwrapTraitObject($puck_36);
    let $puck_37 = $puck_1.ObjectMap.get.call(enum_.members, member);
    if ($unwrapTraitObject($puck_37).kind === "Some") {
      let {value: memberType} = $unwrapTraitObject($puck_37);
      return $puck_1.Ok(memberType);
    }
    else {
      if ($unwrapTraitObject($puck_37).kind === "None") {
        $unwrapTraitObject($puck_37);
        return $puck_1.Err("Use of undeclared type " + displayPath + "::" + member + "");
      };
    };
  }
  else {
    if ($unwrapTraitObject($puck_36).kind === "Struct") {
      let {value: struct} = $unwrapTraitObject($puck_36);
      let $puck_38 = struct.kind;
      if ($unwrapTraitObject($puck_38).kind === "Record") {
        let {value: record} = $unwrapTraitObject($puck_38);
        let $puck_39 = $puck_1.ObjectMap.get.call(record.properties, member);
        if ($unwrapTraitObject($puck_39).kind === "Some") {
          let {value: propertyType} = $unwrapTraitObject($puck_39);
          return $puck_1.Ok(propertyType);
        }
        else {
          if ($unwrapTraitObject($puck_39).kind === "None") {
            $unwrapTraitObject($puck_39);
            return $puck_1.Err("Use of undeclared type " + displayPath + "::" + member + "");
          };
        };
      }
      else {
        if ($unwrapTraitObject($puck_38).kind === "Tuple") {
          $unwrapTraitObject($puck_38);
          return $puck_1.Err("Can not access members on a tuple type");
        }
        else {
          if ($unwrapTraitObject($puck_38).kind === "Unit") {
            $unwrapTraitObject($puck_38);
            return $puck_1.Err("Can not access members on a unit type");
          };
        };
      };
    }
    else {
      if (true) {
        $puck_36;
        return $puck_1.Err("Type paths can only access enums or records");
      };
    };
  };
}
