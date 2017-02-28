'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.notAssignableError = exports.structureVisitorundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("util");
const $puck_4 = require("./../../ast/ast");
const $puck_5 = require("./../../ast/span");
const visit = require("./../../ast/visit");
const $puck_6 = require("./../../compiler/ast");
const $puck_7 = require("./../../entities");
const $puck_8 = require("./functions");
const $puck_9 = require("./patterns");
const $puck_10 = require("./range");
const $puck_11 = require("./scope");
const $puck_12 = require("./types");
function notAssignableError(to, subject) {
  return $puck_7.Type.displayName.call(subject) + " is not assignable to type " + $puck_7.Type.displayName.call(to);
};
exports.notAssignableError = notAssignableError;
function structureVisitor(file, reportError, visitor = "") {
  return {
    file: file,
    visitEnumMember: visit.walkingVisitor.visitEnumMember,
    visitFunctionDeclaration: function (f) {
    let self = this;
    if ((!f.scope)) {
      let parentScope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(self).scope = $puck_11.Scope.createChild.call(parentScope);
      f.scope = $unwrapTraitObject(self).scope;
      let $puck_13;
      if ($unwrapTraitObject(self).assignedTo) {
        let $puck_14 = $unwrapTraitObject($unwrapTraitObject(self).assignedTo).kind;
        let $puck_15;
        if ($puck_14.kind === "Function") {
          let {value: [func]} = $puck_14;
          $puck_15 = $puck_1.Some(func);
        }
        else {
          $puck_15 = $puck_1.None;
        };
        $puck_13 = $puck_15;
      }
      else {
        $puck_13 = $puck_1.None;
      };
      const assignedTo = $puck_13;
      $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.typeParameters, $isTraitObject: true}, function (p) {
        return $unwrapTraitObject(self).visitTypeParameter(p);
      });
      let $puck_16 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true})
;
      $puck_1.Iterable[$puck_16.type].forEach.call($puck_16, function ([i, p]) {
        let $puck_17 = assignedTo;
        let $puck_18;
        if ($puck_17.kind === "Some") {
          let {value: [assignedTo]} = $puck_17;
          let $puck_19;
          if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: assignedTo.parameters, $isTraitObject: true}) > i) {
            $puck_19 = assignedTo.parameters[i].type_;
          }
          else {
            $puck_19 = $puck_2._undefined;
          };
          $puck_18 = $puck_19;
        }
        else {
          $puck_18 = $puck_2._undefined;
        };
        const type_ = $puck_18;
        return $unwrapTraitObject(self).visitVariableDeclaration(p, $puck_2._undefined, type_);
      });
      let $puck_20 = f.returnType;
      if ($puck_20.kind === "Some") {
        let {value: [returnType]} = $puck_20;
        $unwrapTraitObject(self).visitTypeBound(returnType);
      };
      f.type_ = $puck_8.createFunctionType(file, $unwrapTraitObject(f.scope), f, reportError);
      let $puck_21 = f.name;
      if ($puck_21.kind === "Some") {
        let {value: [name]} = $puck_21;
        let $puck_22 = $puck_11.Scope.define.call(parentScope, {
          definition: $puck_7.Definition({
          file: file,
          token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: f, $isTraitObject: true},
        }),
          name: name.name,
          allowRedeclare: false,
          mutable: false,
          type_: f.type_,
          previous: $puck_1.None,
          completeType: $puck_1.None,
        });
        if ($puck_22.kind === "Err") {
          let {value: [err]} = $puck_22;
          reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: name, $isTraitObject: true}, err);
        };
      };
      return $unwrapTraitObject(self).scope = parentScope;
    };
  },
    visitMethodDeclaration: function (f, selfType) {
    let self = this;
    if ((!f.scope)) {
      const parentScope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(self).scope = $puck_11.Scope.createChild.call(parentScope);
      f.scope = $unwrapTraitObject(self).scope;
      if ($puck_1.Option.isNone.call(f.name)) {
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: f, $isTraitObject: true}, "Trait functions must have a name");
      };
      if ($puck_1.Option.isNone.call(f.returnType)) {
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: f, $isTraitObject: true}, "Trait functions must have a return type");
      };
      $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.typeParameters, $isTraitObject: true}, $unwrapTraitObject($unwrapTraitObject(self).visitTypeParameter).bind(self));
      let $puck_23 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true});
      if ($puck_23.kind === "Some") {
        let {value: [first]} = $puck_23;
        let $puck_24 = first.pattern;
        if ($puck_24.kind === "Identifier") {
          let {value: [{name: name, span: span}]} = $puck_24;
          if (name === "self") {
            const selfTypeBound = first.typeBound;
            if ($puck_1.Option.isNone.call(selfTypeBound)) {
              $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: f.parameterList, $isTraitObject: true}, 0).typeBound = $puck_1.Some($puck_4.TypeBound.NamedTypeBound({
                path: $puck_4.TypePath.Member({
                name: "Self",
                span: span,
              }),
                typeParameters: [],
              }));
            }
            else {
              $unwrapTraitObject(self).visitVariableDeclaration(first);
              if ((!$puck_12.isAssignable($unwrapTraitObject(first.type_), selfType))) {
                reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: first, $isTraitObject: true}, notAssignableError($unwrapTraitObject(first.type_), selfType));
              };
            };
          };
        };
      };
      $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true}, function (p) {
        return $unwrapTraitObject(self).visitVariableDeclaration(p);
      });
      let $puck_25 = f.returnType;
      if ($puck_25.kind === "Some") {
        let {value: [returnType]} = $puck_25;
        $unwrapTraitObject(self).visitTypeBound(returnType);
      };
      f.type_ = $puck_8.createFunctionType(file, $unwrapTraitObject(f.scope), f, reportError);
      return $unwrapTraitObject(self).scope = parentScope;
    };
  },
    visitTypeBound: function (t) {
    const self = this;
    return visit.walkTypeBound(self, t);
  },
    visitFunctionTypeBound: function (t) {
    let self = this;
    if ((!t.scope)) {
      const parentScope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(self).scope = $puck_11.Scope.createChild.call(parentScope);
      t.scope = $unwrapTraitObject(self).scope;
      visit.walkFunctionTypeBound(self, t);
      let $puck_27 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.parameters.properties, $isTraitObject: true})
;
      let $puck_26 = $puck_1.Iterable[$puck_27.type].map.call($puck_27, function ([i, t]) {
        return {
          definition: $puck_7.Definition({
          file: file,
          token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: t, $isTraitObject: true},
        }),
          name: "" + i + "",
          mutable: false,
          allowRedeclare: true,
          type_: $puck_4.TypeBound.getType.call(t),
          completeType: $puck_1.None,
          previous: $puck_1.None,
        };
      })
;
      const parameters = $puck_1.Iterable[$puck_26.type].toList.call($puck_26);
      t.type_ = $puck_7.Type({
        definition: $puck_7.Definition({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionTypeBound', value: t, $isTraitObject: true},
      }),
        id: $puck_1.None,
        displayName: $puck_1.None,
        name: $puck_1.None,
        kind: $puck_7.TypeKind.Function({
        selfBinding: $puck_1.None,
        parameters: parameters,
        parameterRange: {
        start: $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameters, $isTraitObject: true}),
        end: $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameters, $isTraitObject: true}) + 1,
      },
        returnType: $puck_4.TypeBound.getType.call(t.returnType),
        isAbstract: false,
      }),
        _class: $puck_7.TypeClass.fromAstNode(t, reportError),
        instance: $puck_1.None,
        providesType: $puck_1.None,
        enumMember: $puck_1.None,
      });
      return $unwrapTraitObject(self).scope = parentScope;
    };
  },
    visitNamedTypeBound: function (t) {
    const self = this;
    if ((!t.scope)) {
      t.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(self).visitTypePath(t.path);
      let type_ = $unwrapTraitObject(t.path.providesType);
      if (!type_) {
        return [];
      };
      type_ = $puck_7.Type({
        definition: $puck_7.Definition({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t, $isTraitObject: true},
      }),
        id: type_.id,
        displayName: type_.displayName,
        name: type_.name,
        kind: type_.kind,
        _class: type_._class,
        instance: type_.instance,
        providesType: type_.providesType,
        enumMember: type_.enumMember,
      });
      let $puck_28 = t.path;
      let $puck_29;
      if ($puck_28.kind === "Member") {
        let {value: [{name: name}]} = $puck_28;
        let $puck_30;
        if (name === "Self") {
          if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}) > 0) {
            reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t, $isTraitObject: true}, "Self is not generic");
          };
          $puck_30 = true;
        }
        else {
          $puck_30 = false;
        };
        $puck_29 = $puck_30;
      }
      else {
        $puck_29 = false;
      };
      const isSelf = $puck_29;
      if ((!isSelf)) {
        let $puck_31 = type_._class;
        if ($puck_31.kind === "Some") {
          let {value: [_class]} = $puck_31;
          let $puck_32 = $puck_10.checkRange(t.typeParameters, _class.parameterRange, "type parameters", $puck_7.Type.displayName.call(type_));
          if ($puck_32.kind === "Err") {
            let {value: [error]} = $puck_32;
            reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t, $isTraitObject: true}, error);
          };
        }
        else {
          if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}) > 0) {
            reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t, $isTraitObject: true}, "Type " + $puck_7.Type.displayName.call(type_) + " is not generic");
          };
        };
      };
      visit.walkNamedTypeBound(self, t);
      let $puck_33;
      if ($puck_1.Option.isSome.call(type_._class)) {
        let $puck_34 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}, function (typeBound) {
          return $puck_4.TypeBound.getType.call(typeBound);
        })
;
        $puck_33 = $puck_12.createTypeInstance(type_, $puck_1.Iterable[$puck_34.type].toList.call($puck_34));
      }
      else {
        $puck_33 = type_;
      };
      return t.type_ = $puck_33;
    };
  },
    visitRecordTypeBound: function (t) {
    const self = this;
    if ((!t.scope)) {
      t.scope = $unwrapTraitObject(self).scope;
      visit.walkRecordTypeBound(self, t);
      return t.type_ = $puck_7.Type({
        definition: $puck_7.Definition({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordTypeBound', value: t, $isTraitObject: true},
      }),
        id: $puck_1.None,
        displayName: $puck_1.None,
        name: $puck_1.None,
        kind: $puck_7.TypeKind.Struct({
        implementations: [],
        kind: $puck_7.StructKind.Record({properties: $puck_1.ObjectMap.fromIter($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.properties, $isTraitObject: true}, function (member) {
        return [
          member.name.name,
          $puck_4.TypeBound.getType.call(member.typeBound),
        ];
      }))}),
      }),
        _class: $puck_1.None,
        instance: $puck_1.None,
        providesType: $puck_1.None,
        enumMember: $puck_1.None,
      });
    };
  },
    visitRecordTypeBoundMember: visit.walkingVisitor.visitRecordTypeBoundMember,
    visitTupleTypeBound: function (t) {
    const self = this;
    if (!t.scope) {
      t.scope = $unwrapTraitObject(self).scope;
      visit.walkTupleTypeBound(self, t);
      let $puck_35 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.properties, $isTraitObject: true}, function (p) {
        return $puck_4.TypeBound.getType.call(p);
      })
;
      return t.type_ = $puck_7.Type({
        definition: $puck_7.Definition({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleTypeBound', value: t, $isTraitObject: true},
      }),
        id: $puck_1.None,
        displayName: $puck_1.None,
        name: $puck_1.None,
        kind: $puck_7.TypeKind.Struct({
        implementations: [],
        kind: $puck_7.StructKind.Tuple({properties: $puck_1.Iterable[$puck_35.type].toList.call($puck_35)}),
      }),
        _class: $puck_1.None,
        instance: $puck_1.None,
        providesType: $puck_1.None,
        enumMember: $puck_1.None,
      });
    };
  },
    visitTypeParameter: function (t) {
    const self = this;
    if (!t.scope) {
      t.scope = $unwrapTraitObject(self).scope;
      visit.walkTypeParameter(self, t);
      t.type_ = $puck_7.Type({
        definition: $puck_7.Definition({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter', value: t, $isTraitObject: true},
      }),
        id: $puck_1.Some(t.name.name),
        displayName: $puck_1.None,
        name: $puck_1.Some(t.name.name),
        kind: $puck_7.TypeKind.Parameter({defaultValue: $puck_1.Option.map.call(t.defaultValue, function (typeBound) {
        return $puck_4.TypeBound.getType.call(typeBound);
      })}),
        _class: $puck_1.None,
        instance: $puck_1.None,
        providesType: $puck_1.None,
        enumMember: $puck_1.None,
      });
      let scope = $unwrapTraitObject(self).scope;
      let $puck_36 = $puck_11.Scope.define.call(scope, {
        definition: $puck_7.Definition({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter', value: t, $isTraitObject: true},
      }),
        name: t.name.name,
        mutable: false,
        allowRedeclare: false,
        type_: $puck_7.Type.provides($unwrapTraitObject(t.type_)),
        completeType: $puck_1.None,
        previous: $puck_1.None,
      });
      if ($puck_36.kind === "Err") {
        let {value: [err]} = $puck_36;
        return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: t.name, $isTraitObject: true}, err);
      };
    };
  },
    visitTypePath: function (t) {
    const self = this;
    if ((!t.type_)) {
      t.scope = $unwrapTraitObject(self).scope;
      const scope = $unwrapTraitObject(self).scope;
      let $puck_37 = $puck_11.Scope.getTypePath.call(scope, t, visitor);
      if ($unwrapTraitObject($puck_37).kind === "Ok") {
        let {value: [binding]} = $unwrapTraitObject($puck_37);
        t.type_ = binding.type_;
        return t.providesType = $puck_1.Option.unwrapOr.call(binding.type_.providesType, binding.type_);
      }
      else {
        if ($unwrapTraitObject($puck_37).kind === "Err") {
          let {value: [err]} = $unwrapTraitObject($puck_37);
          return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: t, $isTraitObject: true}, err);
        };
      };
    };
  },
    visitVariableDeclaration: function (d, visitInitializer, type_) {
    let self = this;
    if (d.scope) {
      return [];
    };
    d.scope = $unwrapTraitObject(self).scope;
    $unwrapTraitObject(self).visitPattern(d.pattern);
    type_ = $puck_1.Option.mapOr.call(d.typeBound, type_, function (bound) {
      $unwrapTraitObject(self).visitTypeBound(bound);
      return ($puck_4.TypeBound.getType.call(bound) || type_);
    });
    d.type_ = type_;
    if (!$puck_12.isAssignable($unwrapTraitObject(d.pattern.type_), type_)) {
      return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: d.pattern, $isTraitObject: true}, $puck_7.Type.displayName.call(type_) + " is not assignable to pattern " + $puck_4.Pattern.displayName.call(d.pattern));
    };
    let scope = $unwrapTraitObject(self).scope;
    let $puck_38;
    if ($puck_1.Option.isSome.call(d.initializer)) {
      $puck_38 = $puck_11.Scope.createChild.call(scope);
    }
    else {
      $puck_38 = scope;
    };
    let childScope = $puck_38;
    let $puck_39 = $puck_9.declarePatternVariables(childScope, self, d.pattern, d.mutable, type_, false, $puck_1.Option.isSome.call(d.initializer));
    if (($unwrapTraitObject($puck_39).kind === "Ok")) {
      let {value: [$puck_40]} = $unwrapTraitObject($puck_39);
    }
    else {
      if (($unwrapTraitObject($puck_39).kind === "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_39).value)[0]).kind === "PatternMismatch")) {
        let {value: [{value: [$puck_41, to, subject]}]} = $unwrapTraitObject($puck_39);
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: d, $isTraitObject: true}, notAssignableError(to, subject));
      }
      else {
        if (($unwrapTraitObject($puck_39).kind === "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_39).value)[0]).kind === "NotExhaustive")) {
          let {value: []} = $unwrapTraitObject($puck_39);
          reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: d, $isTraitObject: true}, "non exhaustive pattern");
        }
        else {
          if (($unwrapTraitObject($puck_39).kind === "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_39).value)[0]).kind === "ScopeError")) {
            let {value: [{value: [token, err]}]} = $unwrapTraitObject($puck_39);
            reportError(token, err);
          };
        };
      };
    };
    let $puck_42 = d.initializer;
    if ($puck_42.kind === "Some") {
      let {value: [initializer]} = $puck_42;
      const parentVariableDeclarationScope = $unwrapTraitObject(self).variableDeclarationScope;
      $unwrapTraitObject(self).variableDeclarationScope = childScope;
      if (visitInitializer) {
        visitInitializer(initializer);
      }
      else {
        $unwrapTraitObject(self).visitExpression(initializer);
      };
      $puck_11.Scope.merge.call(scope, childScope);
      $unwrapTraitObject(self).variableDeclarationScope = parentVariableDeclarationScope;
      const initializerType = $puck_4.Expression.getType.call(initializer);
      if ((!d.type_ && d.pattern.binding)) {
        d.pattern.binding.type_ = initializerType;
        d.type_ = initializerType;
      }
      else {
        if (!$puck_12.isAssignable(type_, initializerType)) {
          return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: initializer, $isTraitObject: true}, notAssignableError(type_, initializerType));
        };
      };
      if (!$puck_12.isAssignable($unwrapTraitObject(d.pattern.type_), initializerType)) {
        return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: d, $isTraitObject: true}, notAssignableError($unwrapTraitObject(d.pattern.type_), initializerType));
      };
    };
  },
  };
};
exports.structureVisitor = structureVisitor
