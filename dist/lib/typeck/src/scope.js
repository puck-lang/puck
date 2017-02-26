'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.Binding = exports.Scopeundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("util");
const $puck_4 = require("./../../ast/ast");
const $puck_5 = require("./../../ast/span");
const $puck_6 = require("./../../compiler/ast");
const $puck_7 = require("./../../entities");
var Binding = exports.Binding = (object) => object;
var Scope = exports.Scope = (object) => object;
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
  let $puck_8 = self.parent;
  if ($puck_8.kind == "Some") {
    let {value: [parent]} = $puck_8;
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
    let $puck_9 = binding.completeType;
    if ($puck_9.kind == "Some") {
      let {value: [completeType]} = $puck_9;
      let $puck_10 = completeType(visitor);
      if ($puck_10.kind == "Some") {
        let {value: [type_]} = $puck_10;
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
    let $puck_11 = binding.completeType;
    if ($puck_11.kind == "Some") {
      let {value: [completeType]} = $puck_11;
      let $puck_12 = completeType("");
      if ($puck_12.kind == "Some") {
        let {value: [type_]} = $puck_12;
        binding.type_ = type_;
      };
    };
    return binding;
  });
};
Scope.define = function (binding, useParentScope = false) {
  let self = this;
  if (binding.name == "Self") {
    return $puck_1.Err("Self is a reserved name");
  };
  let $puck_13 = $puck_1.ObjectMap.get.call(self.bindings, binding.name);
  let $puck_14;
  if ($unwrapTraitObject($puck_13).kind == "Some") {
    let {value: [previous]} = $unwrapTraitObject($puck_13);
    let $puck_15;
    if (previous.allowRedeclare) {
      $puck_15 = $puck_1.Some(previous);
    }
    else {
      return $puck_1.Err(binding.name + " is already defined");
    };
    $puck_14 = $puck_15;
  }
  else {
    let $puck_16;
    if (($unwrapTraitObject($puck_13).kind == "None")) {
      let undefined = $unwrapTraitObject($puck_13);
      let $puck_17;
      if (useParentScope) {
        let $puck_18 = $puck_1.Option.andThen.call(self.parent, function (p) {
          return $puck_1.ObjectMap.get.call(p.bindings, binding.name);
        });
        let $puck_19;
        if ($puck_18.kind == "Some") {
          let {value: [previous]} = $puck_18;
          let $puck_20;
          if (previous.allowRedeclare) {
            $puck_20 = $puck_1.Some(previous);
          }
          else {
            return $puck_1.Err(binding.name + " is already defined");
          };
          $puck_19 = $puck_20;
        }
        else {
          $puck_19 = $puck_1.None;
        };
        $puck_17 = $puck_19;
      }
      else {
        $puck_17 = $puck_1.None;
      };
      $puck_16 = $puck_17;
    };
    $puck_14 = $puck_16;
  };
  const previous = $puck_14;
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
    let $puck_21 = binding.type_.providesType;
    if (($puck_21.kind == "Some" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_21.value)[0]).id).kind == "Some")) {
      let {value: [{id: {value: [id]}}]} = $puck_21;
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
    type_: $puck_7.Type.provides(selfType),
    previous: $puck_1.None,
    completeType: $puck_1.None,
  });
};
Scope.getTypePath = function (typePath, visitor = "") {
  const self = this;
  let $puck_22 = typePath;
  if ($unwrapTraitObject($puck_22).kind == "Member") {
    let {value: [identifier]} = $unwrapTraitObject($puck_22);
    let $puck_23 = Scope.getBinding.call(self, identifier.name, visitor);
    if ($puck_23.kind == "Some") {
      let {value: [binding]} = $puck_23;
      identifier.binding = binding;
      return $puck_1.Ok(binding);
    }
    else {
      return $puck_1.Err("Use of undeclared type " + identifier.name);
    };
  }
  else {
    if (($unwrapTraitObject($puck_22).kind == "_Object")) {
      let {value: [identifier, path]} = $unwrapTraitObject($puck_22);
      let token = {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true};
      let name = identifier.name;
      let path_ = path;
      let $puck_24 = Scope.getBinding.call(self, name, visitor);
      let $puck_25;
      if ($unwrapTraitObject($puck_24).kind == "Some") {
        let {value: [binding]} = $unwrapTraitObject($puck_24);
        $puck_25 = binding;
      }
      else {
        let $puck_26;
        if ($unwrapTraitObject($puck_24).kind == "None") {
          let undefined = $unwrapTraitObject($puck_24);
          return $puck_1.Err("Use of undeclared type " + name + "");
        };
        $puck_25 = $puck_26;
      };
      const binding = $puck_25;
      identifier.binding = binding;
      let type_ = binding.type_;
      while (true) {
        let displayPath = "" + name + "";
        const providesType = $puck_1.Option.unwrapOr.call(type_.providesType, type_);
        let $puck_27 = path_;
        if ($unwrapTraitObject($puck_27).kind == "Member") {
          let {value: [identifier]} = $unwrapTraitObject($puck_27);
          token = {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true};
          name = identifier.name;
          let $puck_28 = getTypeMember(providesType, displayPath, name);
          let $puck_29;
          if ($unwrapTraitObject($puck_28).kind == "Ok") {
            let {value: [type_]} = $unwrapTraitObject($puck_28);
            $puck_29 = type_;
          }
          else {
            let $puck_30;
            if ($unwrapTraitObject($puck_28).kind == "Err") {
              let {value: [err]} = $unwrapTraitObject($puck_28);
              return $puck_1.Err(err);
            };
            $puck_29 = $puck_30;
          };
          type_ = $puck_29;
          break        }
        else {
          if ($unwrapTraitObject($puck_27).kind == "_Object") {
            let {value: [identifier, path]} = $unwrapTraitObject($puck_27);
            token = {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true};
            name = identifier.name;
            path_ = path;
            let $puck_31 = getTypeMember(providesType, displayPath, name);
            let $puck_32;
            if ($unwrapTraitObject($puck_31).kind == "Ok") {
              let {value: [type_]} = $unwrapTraitObject($puck_31);
              $puck_32 = type_;
            }
            else {
              let $puck_33;
              if ($unwrapTraitObject($puck_31).kind == "Err") {
                let {value: [err]} = $unwrapTraitObject($puck_31);
                return $puck_1.Err(err);
              };
              $puck_32 = $puck_33;
            };
            type_ = $puck_32;
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
  let $puck_34 = type_.kind;
  if ($unwrapTraitObject($puck_34).kind == "Enum") {
    let {value: [enum_]} = $unwrapTraitObject($puck_34);
    let $puck_35 = $puck_1.ObjectMap.get.call(enum_.members, member);
    if ($unwrapTraitObject($puck_35).kind == "Some") {
      let {value: [memberType]} = $unwrapTraitObject($puck_35);
      return $puck_1.Ok(memberType);
    }
    else {
      if ($unwrapTraitObject($puck_35).kind == "None") {
        let undefined = $unwrapTraitObject($puck_35);
        return $puck_1.Err("Use of undeclared type " + displayPath + "::" + member + "");
      };
    };
  }
  else {
    if ($unwrapTraitObject($puck_34).kind == "Struct") {
      let {value: [struct]} = $unwrapTraitObject($puck_34);
      let $puck_36 = struct.kind;
      if ($unwrapTraitObject($puck_36).kind == "Record") {
        let {value: [record]} = $unwrapTraitObject($puck_36);
        let $puck_37 = $puck_1.ObjectMap.get.call(record.properties, member);
        if ($unwrapTraitObject($puck_37).kind == "Some") {
          let {value: [propertyType]} = $unwrapTraitObject($puck_37);
          return $puck_1.Ok(propertyType);
        }
        else {
          if ($unwrapTraitObject($puck_37).kind == "None") {
            let undefined = $unwrapTraitObject($puck_37);
            return $puck_1.Err("Use of undeclared type " + displayPath + "::" + member + "");
          };
        };
      }
      else {
        if ($unwrapTraitObject($puck_36).kind == "Tuple") {
          let undefined = $unwrapTraitObject($puck_36);
          return $puck_1.Err("Can not access members on a tuple type");
        }
        else {
          if ($unwrapTraitObject($puck_36).kind == "Unit") {
            let undefined = $unwrapTraitObject($puck_36);
            return $puck_1.Err("Can not access members on a unit type");
          };
        };
      };
    }
    else {
      if (true) {
        let $puck_38 = $puck_34;
        return $puck_1.Err("Type paths can only access enums or records");
      };
    };
  };
}
