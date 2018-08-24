'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.notAssignableError = exports.structureVisitor = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("util");
const $puck_4 = require("./../../ast/ast");
const $puck_5 = require("./../../ast/span");
const $puck_6 = require("./../../compiler");
const visit = require("./../../ast/visit");
const $puck_7 = require("./../../compiler/ast");
const $puck_8 = require("./../../entities");
const $puck_9 = require("./functions");
const $puck_10 = require("./patterns");
const $puck_11 = require("./range");
const $puck_12 = require("./scope");
const $puck_13 = require("./types");
function notAssignableError(to, subject) {
  return $puck_8.Type.displayName.call(subject) + " is not assignable to type " + $puck_8.Type.displayName.call(to);
};
exports.notAssignableError = notAssignableError;
function structureVisitor(context, file, visitor = "") {
  function reportError(token, message) {
    return $puck_6.CompilerContext.reportError.call(context, file, token, $puck_8.CompilationError.Other(message));
  };
  return {
    visitEnumMember: visit.walkingVisitor.visitEnumMember,
    visitFunctionDeclaration: function (f) {
    let self = this;
    if ((!f.scope)) {
      let parentScope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(self).scope = $puck_12.Scope.createChild.call(parentScope);
      f.scope = $unwrapTraitObject(self).scope;
      let $puck_14;
      if ($unwrapTraitObject(self).assignedTo) {
        let $puck_15 = $unwrapTraitObject($unwrapTraitObject(self).assignedTo).kind;
        let $puck_16;
        if ($puck_15.kind === "Function") {
          let {value: func} = $puck_15;
          $puck_16 = $puck_1.Some(func);
        }
        else {
          $puck_16 = $puck_1.None;
        };
        $puck_14 = $puck_16;
      }
      else {
        $puck_14 = $puck_1.None;
      };
      const assignedTo = $puck_14;
      $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.typeParameters, $isTraitObject: true}, function (p) {
        return $unwrapTraitObject(self).visitTypeParameter(p);
      });
      let $puck_17 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true})
;
      $puck_1.Iterable[$puck_17.type].forEach.call($puck_17, function ([i, p]) {
        let $puck_18 = assignedTo;
        let $puck_19;
        if ($puck_18 !== undefined) {
          let assignedTo = $puck_18;
          let $puck_20;
          if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: assignedTo.parameters, $isTraitObject: true}) > i) {
            $puck_20 = assignedTo.parameters[i].type_;
          }
          else {
            $puck_20 = $puck_2._undefined;
          };
          $puck_19 = $puck_20;
        }
        else {
          $puck_19 = $puck_2._undefined;
        };
        const type_ = $puck_19;
        return $unwrapTraitObject(self).visitVariableDeclaration(p, $puck_2._undefined, type_);
      });
      let $puck_21 = f.returnType;
      if ($puck_21 !== undefined) {
        let returnType = $puck_21;
        $unwrapTraitObject(self).visitTypeBound(returnType);
      };
      let $puck_22 = f.whereClause;
      if ($puck_22 !== undefined) {
        let whereClause = $puck_22;
        $unwrapTraitObject(self).visitWhereClause(whereClause);
      };
      f.type_ = $puck_9.createFunctionType(file, $unwrapTraitObject(f.scope), f, reportError);
      let $puck_23 = f.name;
      if ($puck_23 !== undefined) {
        let name = $puck_23;
        let $puck_24 = $puck_12.Scope.define.call(parentScope, {
          definition: $puck_8.Definition({
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
        if ($puck_24.kind === "Err") {
          let {value: err} = $puck_24;
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
      $unwrapTraitObject(self).scope = $puck_12.Scope.createChild.call(parentScope);
      f.scope = $unwrapTraitObject(self).scope;
      if ($puck_1.Option.isNone.call(f.name)) {
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: f, $isTraitObject: true}, "Trait functions must have a name");
      };
      if ($puck_1.Option.isNone.call(f.returnType)) {
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: f, $isTraitObject: true}, "Trait functions must have a return type");
      };
      $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.typeParameters, $isTraitObject: true}, $unwrapTraitObject($unwrapTraitObject(self).visitTypeParameter).bind(self));
      let $puck_25 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true});
      if ($puck_25 !== undefined) {
        let first = $puck_25;
        let $puck_26 = first.pattern;
        if ($puck_26.kind === "Identifier") {
          let {value: {identifier: {name: name, span: span}}} = $puck_26;
          if (name === "self") {
            if ($puck_1.Option.isNone.call(first.typeBound)) {
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
              if ((!$puck_13.isAssignable($unwrapTraitObject(first.type_), selfType))) {
                reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: first, $isTraitObject: true}, notAssignableError($unwrapTraitObject(first.type_), selfType));
              };
            };
          };
        };
      };
      $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true}, function (p) {
        return $unwrapTraitObject(self).visitVariableDeclaration(p);
      });
      let $puck_27 = f.returnType;
      if ($puck_27 !== undefined) {
        let returnType = $puck_27;
        $unwrapTraitObject(self).visitTypeBound(returnType);
      };
      let $puck_28 = f.whereClause;
      if ($puck_28 !== undefined) {
        let whereClause = $puck_28;
        $unwrapTraitObject(self).visitWhereClause(whereClause);
      };
      f.type_ = $puck_9.createFunctionType(file, $unwrapTraitObject(f.scope), f, reportError);
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
      $unwrapTraitObject(self).scope = $puck_12.Scope.createChild.call(parentScope);
      t.scope = $unwrapTraitObject(self).scope;
      visit.walkFunctionTypeBound(self, t);
      let $puck_30 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.parameters.properties, $isTraitObject: true})
;
      let $puck_29 = $puck_1.Iterable[$puck_30.type].map.call($puck_30, function ([i, t]) {
        return {
          definition: $puck_8.Definition({
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
      const parameters = $puck_1.Iterable[$puck_29.type].toList.call($puck_29);
      t.type_ = $puck_8.Type({
        definition: $puck_8.Definition({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionTypeBound', value: t, $isTraitObject: true},
      }),
        id: $puck_1.None,
        displayName: $puck_1.None,
        name: $puck_1.None,
        kind: $puck_8.TypeKind.Function({
        selfBinding: $puck_1.None,
        parameters: parameters,
        parameterRange: {
        start: $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameters, $isTraitObject: true}),
        end: $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameters, $isTraitObject: true}) + 1,
      },
        returnType: $puck_4.TypeBound.getType.call(t.returnType),
        typeParameterBounds: $puck_1.None,
        isAbstract: false,
      }),
        _class: $puck_8.TypeClass.fromAstNode(t, reportError),
        instance: $puck_1.None,
        providesType: $puck_1.None,
        enumMember: $puck_1.None,
      });
      return $unwrapTraitObject(self).scope = parentScope;
    };
  },
    visitIntersectionTypeBound: function (t) {
    const self = this;
    if ((!t.scope)) {
      t.scope = $unwrapTraitObject(self).scope;
      visit.walkIntersectionTypeBound(self, t);
      if (!$puck_8.Type.isTrait.call($puck_4.NamedTypeBound.getType.call(t.traitBound))) {
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t.traitBound, $isTraitObject: true}, "Can only add a trait bound, " + $puck_8.Type.displayName.call($puck_4.NamedTypeBound.getType.call(t.traitBound)) + " is not a trait");
      };
      return t.type_ = $puck_8.Type({
        definition: $puck_8.Definition({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IntersectionTypeBound', value: t, $isTraitObject: true},
      }),
        id: $puck_1.None,
        displayName: $puck_1.None,
        name: $puck_1.None,
        kind: $puck_8.TypeKind.Intersection({
        baseType: $puck_4.TypeBound.getType.call(t.baseType),
        intersectedTrait: $puck_1.Option.unwrapOr.call($puck_4.NamedTypeBound.getType.call(t.traitBound).providesType, $puck_4.NamedTypeBound.getType.call(t.traitBound)),
      }),
        _class: $puck_1.None,
        instance: $puck_1.None,
        providesType: $puck_1.None,
        enumMember: $puck_1.None,
      });
    };
  },
    visitNamedTypeBound: function (t) {
    const self = this;
    if ((!t.scope)) {
      t.scope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(self).visitTypePath(t.path);
      let type_ = $unwrapTraitObject(t.path.providesType);
      if (!type_) {
        return undefined;
      };
      type_ = $puck_8.Type({
        definition: $puck_8.Definition({
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
      let $puck_31 = t.path;
      let $puck_32;
      if ($puck_31.kind === "Member") {
        let {value: {name: name}} = $puck_31;
        let $puck_33;
        if (name === "Self") {
          if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}) > 0) {
            reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t, $isTraitObject: true}, "Self is not generic");
          };
          $puck_33 = true;
        }
        else {
          $puck_33 = false;
        };
        $puck_32 = $puck_33;
      }
      else {
        $puck_32 = false;
      };
      const isSelf = $puck_32;
      if ((!isSelf)) {
        let $puck_34 = type_._class;
        if ($puck_34 !== undefined) {
          let _class = $puck_34;
          let $puck_35 = $puck_11.checkRange(t.typeParameters, _class.parameterRange, "type parameters", $puck_8.Type.displayName.call(type_));
          if ($puck_35.kind === "Err") {
            let {value: error} = $puck_35;
            reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t, $isTraitObject: true}, error);
          };
        }
        else {
          if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}) > 0) {
            reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t, $isTraitObject: true}, "Type " + $puck_8.Type.displayName.call(type_) + " is not generic");
          };
        };
      };
      visit.walkNamedTypeBound(self, t);
      let $puck_36;
      if ($puck_1.Option.isSome.call(type_._class)) {
        let $puck_37 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}, function (typeBound) {
          return $puck_4.TypeBound.getType.call(typeBound);
        })
;
        $puck_36 = $puck_13.createTypeInstance(type_, $puck_1.Iterable[$puck_37.type].toList.call($puck_37));
      }
      else {
        $puck_36 = type_;
      };
      return t.type_ = $puck_36;
    };
  },
    visitRecordTypeBound: function (t) {
    const self = this;
    if ((!t.scope)) {
      t.scope = $unwrapTraitObject(self).scope;
      visit.walkRecordTypeBound(self, t);
      let properties = $puck_1.ObjectMap._new();
      $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.properties, $isTraitObject: true}, function (p) {
        let $puck_38 = p;
        if ($puck_38.kind === "Property") {
          let {value: {name: name, optional: optional, typeBound: typeBound}} = $puck_38;
          return $puck_1.ObjectMap.set.call(properties, name.name, {
            type_: $puck_4.TypeBound.getType.call(typeBound),
            optional: optional,
          });
        }
        else {
          if ($puck_38.kind === "Spread") {
            let {value: typeBound} = $puck_38;
            let $puck_39 = $puck_4.TypeBound.getType.call(typeBound).kind;
            if (($puck_39.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($puck_39.value).kind).kind === "Record")) {
              let {value: {kind: {value: r}}} = $puck_39;
              return $puck_1.ObjectMap.merge.call(properties, r.properties);
            }
            else {
              if (true) {
                $puck_39;
                return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: typeBound, $isTraitObject: true}, "Can only spread record types");
              };
            };
          };
        };
      });
      return t.type_ = $puck_8.Type({
        definition: $puck_8.Definition({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordTypeBound', value: t, $isTraitObject: true},
      }),
        id: $puck_1.None,
        displayName: $puck_1.None,
        name: $puck_1.None,
        kind: $puck_8.TypeKind.Struct({
        implementations: [],
        kind: $puck_8.StructKind.Record({properties: properties}),
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
    if ((!t.scope)) {
      t.scope = $unwrapTraitObject(self).scope;
      visit.walkTupleTypeBound(self, t);
      let $puck_40 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.properties, $isTraitObject: true}, function (p) {
        return $puck_4.TypeBound.getType.call(p);
      })
;
      return t.type_ = $puck_8.Type({
        definition: $puck_8.Definition({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleTypeBound', value: t, $isTraitObject: true},
      }),
        id: $puck_1.None,
        displayName: $puck_1.None,
        name: $puck_1.None,
        kind: $puck_8.TypeKind.Struct({
        implementations: [],
        kind: $puck_8.StructKind.Tuple({properties: $puck_1.Iterable[$puck_40.type].toList.call($puck_40)}),
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
      t.type_ = $puck_8.Type({
        definition: $puck_8.Definition({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter', value: t, $isTraitObject: true},
      }),
        id: $puck_1.Some(t.name.name),
        displayName: $puck_1.None,
        name: $puck_1.Some(t.name.name),
        kind: $puck_8.TypeKind.Parameter({defaultValue: $puck_1.Option.map.call(t.defaultValue, function (typeBound) {
        return $puck_4.TypeBound.getType.call(typeBound);
      })}),
        _class: $puck_1.None,
        instance: $puck_1.None,
        providesType: $puck_1.None,
        enumMember: $puck_1.None,
      });
      let scope = $unwrapTraitObject(self).scope;
      let $puck_41 = $puck_12.Scope.define.call(scope, {
        definition: $puck_8.Definition({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter', value: t, $isTraitObject: true},
      }),
        name: t.name.name,
        mutable: false,
        allowRedeclare: false,
        type_: $puck_8.Type.provides($unwrapTraitObject(t.type_)),
        completeType: $puck_1.None,
        previous: $puck_1.None,
      });
      if ($puck_41.kind === "Err") {
        let {value: err} = $puck_41;
        return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: t.name, $isTraitObject: true}, err);
      };
    };
  },
    visitTypePath: function (t) {
    const self = this;
    if ((!t.type_)) {
      t.scope = $unwrapTraitObject(self).scope;
      const scope = $unwrapTraitObject(self).scope;
      let $puck_42 = $puck_12.Scope.getTypePath.call(scope, t, visitor);
      if ($puck_42.kind === "Ok") {
        let {value: binding} = $puck_42;
        t.type_ = binding.type_;
        return t.providesType = (binding.type_ && $puck_1.Option.unwrapOr.call(binding.type_.providesType, binding.type_));
      }
      else {
        if ($puck_42.kind === "Err" && $unwrapTraitObject($puck_42.value).kind === "UndefinedType") {
          let {value: {value: name}} = $puck_42;
          return $puck_6.CompilerContext.reportError.call(context, file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: t, $isTraitObject: true}, $puck_8.CompilationError.UndefinedVariable(name));
        }
        else {
          if (($puck_42.kind === "Err" && $unwrapTraitObject($puck_42.value).kind === "Other")) {
            let {value: {value: err}} = $puck_42;
            return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: t, $isTraitObject: true}, err);
          };
        };
      };
    };
  },
    visitVariableDeclaration: function (d, visitInitializer, type_) {
    let self = this;
    if (d.scope) {
      return undefined;
    };
    d.scope = $unwrapTraitObject(self).scope;
    $unwrapTraitObject(self).visitPattern(d.pattern);
    type_ = $puck_1.Option.mapOr.call(d.typeBound, type_, function (bound) {
      $unwrapTraitObject(self).visitTypeBound(bound);
      return ($puck_4.TypeBound.getType.call(bound) || type_);
    });
    d.type_ = type_;
    if (!$puck_13.isAssignable($unwrapTraitObject(d.pattern.type_), type_)) {
      return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: d.pattern, $isTraitObject: true}, $puck_8.Type.displayName.call(type_) + " is not assignable to pattern " + $puck_4.Pattern.displayName.call(d.pattern));
    };
    let scope = $unwrapTraitObject(self).scope;
    let $puck_43;
    if ($puck_1.Option.isSome.call(d.initializer)) {
      $puck_43 = $puck_12.Scope.createChild.call(scope);
    }
    else {
      $puck_43 = scope;
    };
    let childScope = $puck_43;
    let $puck_44 = $puck_10.declarePatternVariables(childScope, self, d.pattern, type_, false, $puck_1.Option.isSome.call(d.initializer));
    if (($puck_44.kind === "Ok")) {
      $puck_44;
    }
    else {
      if (($puck_44.kind === "Err" && $unwrapTraitObject($puck_44.value).kind === "PatternMismatch")) {
        let {value: {value: [, to, subject]}} = $puck_44;
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: d, $isTraitObject: true}, notAssignableError(to, subject));
      }
      else {
        if (($puck_44.kind === "Err" && $unwrapTraitObject($puck_44.value).kind === "NotExhaustive")) {
          $puck_44;
          reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: d, $isTraitObject: true}, "non exhaustive pattern");
        }
        else {
          if (($puck_44.kind === "Err" && $unwrapTraitObject($puck_44.value).kind === "ScopeError")) {
            let {value: {value: [token, err]}} = $puck_44;
            reportError(token, err);
          };
        };
      };
    };
    let $puck_45 = d.initializer;
    if ($puck_45 !== undefined) {
      let initializer = $puck_45;
      const parentVariableDeclarationScope = $unwrapTraitObject(self).variableDeclarationScope;
      $unwrapTraitObject(self).variableDeclarationScope = childScope;
      if (visitInitializer) {
        visitInitializer(initializer);
      }
      else {
        $unwrapTraitObject(self).visitExpression(initializer);
      };
      $puck_12.Scope.merge.call(scope, childScope);
      $unwrapTraitObject(self).variableDeclarationScope = parentVariableDeclarationScope;
      const initializerType = $puck_4.Expression.getType.call(initializer);
      if ((!d.type_ && d.pattern.binding)) {
        d.pattern.binding.type_ = initializerType;
        d.type_ = initializerType;
      }
      else {
        if (!$puck_13.isAssignable(type_, initializerType)) {
          return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: initializer, $isTraitObject: true}, notAssignableError(type_, initializerType));
        };
      };
      if (!$puck_13.isAssignable($unwrapTraitObject(d.pattern.type_), initializerType)) {
        return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: d, $isTraitObject: true}, notAssignableError($unwrapTraitObject(d.pattern.type_), initializerType));
      };
    };
  },
    visitTypeParameterBound: visit.walkingVisitor.visitTypeParameterBound,
    visitWhereClause: visit.walkingVisitor.visitWhereClause,
  };
};
exports.structureVisitor = structureVisitor
