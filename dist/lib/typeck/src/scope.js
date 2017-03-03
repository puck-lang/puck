'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.Binding = exports.Scope = exports.ScopeErrorundefined;
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
    let $puck_12 = binding.completeType;
    if ($puck_12.kind === "Some") {
      let {value: completeType} = $puck_12;
      let $puck_13 = completeType("");
      if ($puck_13.kind === "Some") {
        let {value: type_} = $puck_13;
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
  let $puck_14 = $puck_1.ObjectMap.get.call(self.bindings, binding.name);
  let $puck_15;
  if ($unwrapTraitObject($puck_14).kind === "Some") {
    let {value: previous} = $unwrapTraitObject($puck_14);
    let $puck_16;
    if (previous.allowRedeclare) {
      $puck_16 = $puck_1.Some(previous);
    }
    else {
      return $puck_1.Err(binding.name + " is already defined");
    };
    $puck_15 = $puck_16;
  }
  else {
    let $puck_17;
    if (($unwrapTraitObject($puck_14).kind === "None")) {
      $unwrapTraitObject($puck_14);
      let $puck_18;
      if (useParentScope) {
        let $puck_19 = $puck_1.Option.andThen.call(self.parent, function (p) {
          return $puck_1.ObjectMap.get.call(p.bindings, binding.name);
        });
        let $puck_20;
        if ($puck_19.kind === "Some") {
          let {value: previous} = $puck_19;
          let $puck_21;
          if (previous.allowRedeclare) {
            $puck_21 = $puck_1.Some(previous);
          }
          else {
            return $puck_1.Err(binding.name + " is already defined");
          };
          $puck_20 = $puck_21;
        }
        else {
          $puck_20 = $puck_1.None;
        };
        $puck_18 = $puck_20;
      }
      else {
        $puck_18 = $puck_1.None;
      };
      $puck_17 = $puck_18;
    };
    $puck_15 = $puck_17;
  };
  const previous = $puck_15;
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
    let $puck_22 = binding.type_.providesType;
    if (($puck_22.kind === "Some" && $unwrapTraitObject($unwrapTraitObject($puck_22.value).id).kind === "Some")) {
      let {value: {id: {value: id}}} = $puck_22;
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
  let $puck_23 = typePath;
  if ($unwrapTraitObject($puck_23).kind === "Member") {
    let {value: identifier} = $unwrapTraitObject($puck_23);
    let $puck_24 = Scope.getBinding.call(self, identifier.name, visitor);
    if ($puck_24.kind === "Some") {
      let {value: binding} = $puck_24;
      identifier.binding = binding;
      return $puck_1.Ok(binding);
    }
    else {
      return $puck_1.Err(ScopeError.UndefinedType(identifier.name));
    };
  }
  else {
    if ($unwrapTraitObject($puck_23).kind === "_Object") {
      let {value: [identifier, path]} = $unwrapTraitObject($puck_23);
      let token = {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true};
      let name = identifier.name;
      let path_ = path;
      let $puck_25 = Scope.getBinding.call(self, name, visitor);
      let $puck_26;
      if ($unwrapTraitObject($puck_25).kind === "Some") {
        let {value: binding} = $unwrapTraitObject($puck_25);
        $puck_26 = binding;
      }
      else {
        let $puck_27;
        if ($unwrapTraitObject($puck_25).kind === "None") {
          $unwrapTraitObject($puck_25);
          return $puck_1.Err(ScopeError.UndefinedType(name));
        };
        $puck_26 = $puck_27;
      };
      const binding = $puck_26;
      identifier.binding = binding;
      let type_ = binding.type_;
      while (true) {
        let displayPath = "" + name + "";
        const providesType = $puck_1.Option.unwrapOr.call(type_.providesType, type_);
        let $puck_28 = path_;
        if ($unwrapTraitObject($puck_28).kind === "Member") {
          let {value: identifier} = $unwrapTraitObject($puck_28);
          token = {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true};
          name = identifier.name;
          let $puck_29 = getTypeMember(providesType, displayPath, name);
          let $puck_30;
          if ($unwrapTraitObject($puck_29).kind === "Ok") {
            let {value: type_} = $unwrapTraitObject($puck_29);
            $puck_30 = type_;
          }
          else {
            let $puck_31;
            if ($unwrapTraitObject($puck_29).kind === "Err") {
              let {value: err} = $unwrapTraitObject($puck_29);
              return $puck_1.Err(ScopeError.Other(err));
            };
            $puck_30 = $puck_31;
          };
          type_ = $puck_30;
          break        }
        else {
          if ($unwrapTraitObject($puck_28).kind === "_Object") {
            let {value: [identifier, path]} = $unwrapTraitObject($puck_28);
            token = {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true};
            name = identifier.name;
            path_ = path;
            let $puck_32 = getTypeMember(providesType, displayPath, name);
            let $puck_33;
            if ($unwrapTraitObject($puck_32).kind === "Ok") {
              let {value: type_} = $unwrapTraitObject($puck_32);
              $puck_33 = type_;
            }
            else {
              let $puck_34;
              if ($unwrapTraitObject($puck_32).kind === "Err") {
                let {value: err} = $unwrapTraitObject($puck_32);
                return $puck_1.Err(ScopeError.Other(err));
              };
              $puck_33 = $puck_34;
            };
            type_ = $puck_33;
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
  let $puck_35 = type_.kind;
  if ($unwrapTraitObject($puck_35).kind === "Enum") {
    let {value: enum_} = $unwrapTraitObject($puck_35);
    let $puck_36 = $puck_1.ObjectMap.get.call(enum_.members, member);
    if ($unwrapTraitObject($puck_36).kind === "Some") {
      let {value: memberType} = $unwrapTraitObject($puck_36);
      return $puck_1.Ok(memberType);
    }
    else {
      if ($unwrapTraitObject($puck_36).kind === "None") {
        $unwrapTraitObject($puck_36);
        return $puck_1.Err("Use of undeclared type " + displayPath + "::" + member + "");
      };
    };
  }
  else {
    if ($unwrapTraitObject($puck_35).kind === "Struct") {
      let {value: struct} = $unwrapTraitObject($puck_35);
      let $puck_37 = struct.kind;
      if ($unwrapTraitObject($puck_37).kind === "Record") {
        let {value: record} = $unwrapTraitObject($puck_37);
        let $puck_38 = $puck_1.ObjectMap.get.call(record.properties, member);
        if ($unwrapTraitObject($puck_38).kind === "Some") {
          let {value: propertyType} = $unwrapTraitObject($puck_38);
          return $puck_1.Ok(propertyType);
        }
        else {
          if ($unwrapTraitObject($puck_38).kind === "None") {
            $unwrapTraitObject($puck_38);
            return $puck_1.Err("Use of undeclared type " + displayPath + "::" + member + "");
          };
        };
      }
      else {
        if ($unwrapTraitObject($puck_37).kind === "Tuple") {
          $unwrapTraitObject($puck_37);
          return $puck_1.Err("Can not access members on a tuple type");
        }
        else {
          if ($unwrapTraitObject($puck_37).kind === "Unit") {
            $unwrapTraitObject($puck_37);
            return $puck_1.Err("Can not access members on a unit type");
          };
        };
      };
    }
    else {
      if (true) {
        $puck_35;
        return $puck_1.Err("Type paths can only access enums or records");
      };
    };
  };
}
