'use strict';
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
  if ($puck_9 !== undefined) {
    let parent = $puck_9;
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
    if ($puck_10 !== undefined) {
      let completeType = $puck_10;
      let $puck_11 = completeType(visitor);
      if ($puck_11 !== undefined) {
        let type_ = $puck_11;
        if ((!binding.type_ && type_)) {
          let $puck_12 = type_.providesType;
          if (($puck_12 !== undefined && $puck_12.id !== undefined)) {
            let {id: id} = $puck_12;
            self.bindingsByTypeId[id] = binding;
          };
        };
        binding.type_ = type_;
      };
    };
    return binding;
  });
};
Scope.getBindingByTypeId = function (id, visitor = "") {
  const self = this;
  return $puck_1.Option.map.call($puck_1.Option.orElse.call($puck_1.ObjectMap.get.call(self.bindingsByTypeId, id), function () {
    return $puck_1.Option.andThen.call(self.parent, function (p) {
      return Scope.getBindingByTypeId.call(p, id, visitor);
    });
  }), function (binding) {
    if ((!binding.type_)) {
      let $puck_13 = binding.completeType;
      if ($puck_13 !== undefined) {
        let completeType = $puck_13;
        let $puck_14 = completeType(visitor);
        if ($puck_14 !== undefined) {
          let type_ = $puck_14;
          binding.type_ = type_;
        };
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
  if ($puck_15 !== undefined) {
    let previous = $puck_15;
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
    if (($puck_15 === undefined)) {
      $puck_15;
      let $puck_19;
      if (useParentScope) {
        let $puck_20 = $puck_1.Option.andThen.call(self.parent, function (p) {
          return $puck_1.ObjectMap.get.call(p.bindings, binding.name);
        });
        let $puck_21;
        if ($puck_20 !== undefined) {
          let previous = $puck_20;
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
    if (($puck_23 !== undefined && $puck_23.id !== undefined)) {
      let {id: id} = $puck_23;
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
  if ($puck_24.kind === "Member") {
    let {value: identifier} = $puck_24;
    let $puck_25 = Scope.getBinding.call(self, identifier.name, visitor);
    if ($puck_25 !== undefined) {
      let binding = $puck_25;
      identifier.binding = binding;
      return $puck_1.Ok(binding);
    }
    else {
      return $puck_1.Err(ScopeError.UndefinedType(identifier.name));
    };
  }
  else {
    if ($puck_24.kind === "_Object") {
      let {value: [identifier, path]} = $puck_24;
      let token = {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true};
      let name = identifier.name;
      let path_ = path;
      let $puck_26 = Scope.getBinding.call(self, name, visitor);
      let $puck_27;
      if ($puck_26 !== undefined) {
        let binding = $puck_26;
        $puck_27 = binding;
      }
      else {
        let $puck_28;
        if ($puck_26 === undefined) {
          $puck_26;
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
        if ($puck_29.kind === "Member") {
          let {value: identifier} = $puck_29;
          token = {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true};
          name = identifier.name;
          let $puck_30 = getTypeMember(providesType, displayPath, name);
          let $puck_31;
          if ($puck_30.kind === "Ok") {
            let {value: type_} = $puck_30;
            $puck_31 = type_;
          }
          else {
            let $puck_32;
            if ($puck_30.kind === "Err") {
              let {value: err} = $puck_30;
              return $puck_1.Err(ScopeError.Other(err));
            };
            $puck_31 = $puck_32;
          };
          type_ = $puck_31;
          break        }
        else {
          if ($puck_29.kind === "_Object") {
            let {value: [identifier, path]} = $puck_29;
            token = {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true};
            name = identifier.name;
            path_ = path;
            let $puck_33 = getTypeMember(providesType, displayPath, name);
            let $puck_34;
            if ($puck_33.kind === "Ok") {
              let {value: type_} = $puck_33;
              $puck_34 = type_;
            }
            else {
              let $puck_35;
              if ($puck_33.kind === "Err") {
                let {value: err} = $puck_33;
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
Scope.debugString = function () {
  const self = this;
  const current = "Scope [" + $puck_1.ObjectMap.keys.call(self.bindings).join(", ") + "]";
  let $puck_36 = self.parent;
  if (($puck_36 !== undefined)) {
    let parent = $puck_36;
    return current + "\n" + $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.String.split.call(Scope.debugString.call(parent), "\n"), $isTraitObject: true}, function (row) {
      return "  " + row;
    }).value.join("\n");
  }
  else {
    return current;
  };
};
function getTypeMember(type_, displayPath, member) {
  let $puck_37 = type_.kind;
  if (($puck_37.kind === "Enum")) {
    let {value: enum_} = $puck_37;
    let $puck_38 = $puck_1.ObjectMap.get.call(enum_.members, member);
    if ($puck_38 !== undefined) {
      let memberType = $puck_38;
      return $puck_1.Ok(memberType);
    }
    else {
      if ($puck_38 === undefined) {
        $puck_38;
        return $puck_1.Err("Use of undeclared type " + displayPath + "::" + member + "");
      };
    };
  }
  else {
    if ($puck_37.kind === "Struct") {
      let {value: struct} = $puck_37;
      let $puck_39 = struct.kind;
      if ($puck_39.kind === "Record") {
        let {value: record} = $puck_39;
        let $puck_40 = $puck_1.ObjectMap.get.call(record.properties, member);
        if ($puck_40 !== undefined) {
          let {type_: type_} = $puck_40;
          return $puck_1.Ok(type_);
        }
        else {
          if ($puck_40 === undefined) {
            $puck_40;
            return $puck_1.Err("Use of undeclared type " + displayPath + "::" + member + "");
          };
        };
      }
      else {
        if ($puck_39.kind === "Tuple") {
          $puck_39;
          return $puck_1.Err("Can not access members on a tuple type");
        }
        else {
          if ($puck_39.kind === "Unit") {
            $puck_39;
            return $puck_1.Err("Can not access members on a unit type");
          };
        };
      };
    }
    else {
      if (true) {
        $puck_37;
        return $puck_1.Err("Type paths can only access enums or records");
      };
    };
  };
}
