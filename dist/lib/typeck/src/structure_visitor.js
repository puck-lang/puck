'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.TypeBoundVisitor = exports.notAssignableError = exports.structureVisitor = exports.visitMethodDeclaration = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("util");
const $puck_4 = require("./../../ast/ast");
const $puck_5 = require("./../../ast/span");
const $puck_6 = require("./../../compiler");
const visit = require("./../../ast/visit");
const $puck_7 = require("./../../ast/empty_visitor");
const visit2 = require("./../../ast/empty_visitor");
const $puck_8 = require("./../../compiler/ast");
const $puck_9 = require("./../../entities");
const $puck_10 = require("./functions");
const $puck_11 = require("./patterns");
const $puck_12 = require("./range");
const $puck_13 = require("./scope");
const $puck_14 = require("./types");
var TypeBoundVisitor = exports.TypeBoundVisitor = (object) => object;
$puck_7.EmptyVisitor["$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/src/structure_visitor.puck:TypeBoundVisitor"] = {
visitModule: $puck_7.EmptyVisitor.visitModule,
visitTopLevelStatement: $puck_7.EmptyVisitor.visitTopLevelStatement,
visitBlockLevelStatement: $puck_7.EmptyVisitor.visitBlockLevelStatement,
visitExpression: $puck_7.EmptyVisitor.visitExpression,
visitEnumDeclaration: $puck_7.EmptyVisitor.visitEnumDeclaration,
visitEnumMember: $puck_7.EmptyVisitor.visitEnumMember,
visitImplDeclaration: $puck_7.EmptyVisitor.visitImplDeclaration,
visitImplShorthandDeclaration: $puck_7.EmptyVisitor.visitImplShorthandDeclaration,
visitMethodDeclaration: $puck_7.EmptyVisitor.visitMethodDeclaration,
visitTraitDeclaration: $puck_7.EmptyVisitor.visitTraitDeclaration,
visitTypeDeclaration: $puck_7.EmptyVisitor.visitTypeDeclaration,
visitExportDirective: $puck_7.EmptyVisitor.visitExportDirective,
visitImportDirective: $puck_7.EmptyVisitor.visitImportDirective,
visitObjectDestructure: $puck_7.EmptyVisitor.visitObjectDestructure,
visitObjectDestructureMember: $puck_7.EmptyVisitor.visitObjectDestructureMember,
visitBlock: $puck_7.EmptyVisitor.visitBlock,
visitBreakStatement: $puck_7.EmptyVisitor.visitBreakStatement,
visitReturnStatement: $puck_7.EmptyVisitor.visitReturnStatement,
visitForLoop: $puck_7.EmptyVisitor.visitForLoop,
visitWhileLoop: $puck_7.EmptyVisitor.visitWhileLoop,
visitIdentifier: $puck_7.EmptyVisitor.visitIdentifier,
visitFunctionDeclaration: $puck_7.EmptyVisitor.visitFunctionDeclaration,
visitVariableDeclaration: $puck_7.EmptyVisitor.visitVariableDeclaration,
visitAssignmentExpression: $puck_7.EmptyVisitor.visitAssignmentExpression,
visitBinaryExpression: $puck_7.EmptyVisitor.visitBinaryExpression,
visitCallExpression: $puck_7.EmptyVisitor.visitCallExpression,
visitIfExpression: $puck_7.EmptyVisitor.visitIfExpression,
visitIfLetExpression: $puck_7.EmptyVisitor.visitIfLetExpression,
visitMatchExpression: $puck_7.EmptyVisitor.visitMatchExpression,
visitMatchArm: $puck_7.EmptyVisitor.visitMatchArm,
visitTypePath: function (t) {
  let self = this;
  if ((!t.type_)) {
    t.scope = self.value.getScope();
    const scope = self.value.getScope();
    let $puck_28 = $puck_13.Scope.getTypePath.call(scope, t, self.value.visitorName);
    if ($puck_28.kind === "Ok") {
      let {value: binding} = $puck_28;
      t.type_ = binding.type_;
      t.providesType = (binding.type_ && $puck_1.Option.unwrapOr.call(binding.type_.providesType, binding.type_));
    }
    else {
      if ($puck_28.kind === "Err" && $unwrapTraitObject($puck_28.value).kind === "UndefinedType") {
        let {value: {value: name}} = $puck_28;
        self.value.reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: t, $isTraitObject: true}, $puck_9.CompilationError.UndefinedVariable(name));
      }
      else {
        if (($puck_28.kind === "Err" && $unwrapTraitObject($puck_28.value).kind === "Other")) {
          let {value: {value: err}} = $puck_28;
          self.value.reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: t, $isTraitObject: true}, $puck_9.CompilationError.Other(err));
        };
      };
    };
  };
},
visitTypePathExpression: $puck_7.EmptyVisitor.visitTypePathExpression,
visitUnaryExpression: $puck_7.EmptyVisitor.visitUnaryExpression,
visitIndexAccess: $puck_7.EmptyVisitor.visitIndexAccess,
visitMemberAccess: $puck_7.EmptyVisitor.visitMemberAccess,
visitTupleIndexAccess: $puck_7.EmptyVisitor.visitTupleIndexAccess,
visitUnknownAccess: $puck_7.EmptyVisitor.visitUnknownAccess,
visitUnknownIndexAccess: $puck_7.EmptyVisitor.visitUnknownIndexAccess,
visitListLiteral: $puck_7.EmptyVisitor.visitListLiteral,
visitBooleanLiteral: $puck_7.EmptyVisitor.visitBooleanLiteral,
visitNumberLiteral: $puck_7.EmptyVisitor.visitNumberLiteral,
visitRangeLiteral: $puck_7.EmptyVisitor.visitRangeLiteral,
visitRecordLiteral: $puck_7.EmptyVisitor.visitRecordLiteral,
visitRecordLiteralMember: $puck_7.EmptyVisitor.visitRecordLiteralMember,
visitStringLiteral: $puck_7.EmptyVisitor.visitStringLiteral,
visitStringLiteralPart: $puck_7.EmptyVisitor.visitStringLiteralPart,
visitTupleLiteral: $puck_7.EmptyVisitor.visitTupleLiteral,
visitPattern: $puck_7.EmptyVisitor.visitPattern,
visitIdentifierPattern: $puck_7.EmptyVisitor.visitIdentifierPattern,
visitRecordPattern: $puck_7.EmptyVisitor.visitRecordPattern,
visitTuplePattern: $puck_7.EmptyVisitor.visitTuplePattern,
visitTypeBound: $puck_7.EmptyVisitor.visitTypeBound,
visitFunctionTypeBound: function (t) {
  let self = this;
  if (!t.scope) {
    const parentScope = self.value.getScope();
    self.value.setScope($puck_13.Scope.createChild.call(parentScope));
    t.scope = self.value.getScope();
    visit2.walkFunctionTypeBound(self, t);
    let $puck_16 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.parameters.properties, $isTraitObject: true})
;
    let $puck_15 = $puck_1.Iterable[$puck_16.type].map.call($puck_16, function ([i, t]) {
      return {
        definition: $puck_9.Definition({
        file: self.value.file,
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
    const parameters = $puck_1.Iterable[$puck_15.type].toList.call($puck_15);
    t.type_ = $puck_9.Type({
      definition: $puck_9.Definition({
      file: self.value.file,
      token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionTypeBound', value: t, $isTraitObject: true},
    }),
      id: $puck_1.None,
      displayName: $puck_1.None,
      name: $puck_1.None,
      kind: $puck_9.TypeKind.Function({
      selfBinding: $puck_1.None,
      parameters: parameters,
      parameterRange: {
      start: $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameters, $isTraitObject: true}),
      end: $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameters, $isTraitObject: true}) + 1,
    },
      returnType: $puck_4.TypeBound.getType.call(t.returnType),
      isAbstract: false,
    }),
      _class: $puck_9.TypeClass.fromAstNode(t, function (token, message) {
      return self.value.reportError(token, $puck_9.CompilationError.Other(message));
    }),
      instance: $puck_1.None,
      providesType: $puck_1.None,
      enumMember: $puck_1.None,
    });
    self.value.setScope(parentScope);
  };
},
visitIntersectionTypeBound: function (t) {
  let self = this;
  if ((!t.scope)) {
    t.scope = self.value.getScope();
    visit2.walkIntersectionTypeBound(self, t);
    if (!$puck_9.Type.isTrait.call($puck_4.NamedTypeBound.getType.call(t.traitBound))) {
      self.value.reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t.traitBound, $isTraitObject: true}, $puck_9.CompilationError.Other("Can only add a trait bound, " + $puck_9.Type.displayName.call($puck_4.NamedTypeBound.getType.call(t.traitBound)) + " is not a trait"));
    };
    t.type_ = $puck_9.Type({
      definition: $puck_9.Definition({
      file: self.value.file,
      token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IntersectionTypeBound', value: t, $isTraitObject: true},
    }),
      id: $puck_1.None,
      displayName: $puck_1.None,
      name: $puck_1.None,
      kind: $puck_9.TypeKind.Intersection({
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
  let self = this;
  if ((!t.scope)) {
    t.scope = self.value.getScope();
    $puck_7.EmptyVisitor["$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/src/structure_visitor.puck:TypeBoundVisitor"].visitTypePath.call(self, t.path);
    let type_ = $unwrapTraitObject(t.path.providesType);
    if (!type_) {
      return undefined;
    };
    type_ = $puck_9.Type({
      definition: $puck_9.Definition({
      file: self.value.file,
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
    let $puck_17 = t.path;
    let $puck_18;
    if ($puck_17.kind === "Member") {
      let {value: {name: name}} = $puck_17;
      let $puck_19;
      if (name === "Self") {
        if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}) > 0) {
          self.value.reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t, $isTraitObject: true}, $puck_9.CompilationError.Other("Self is not generic"));
        };
        $puck_19 = true;
      }
      else {
        $puck_19 = false;
      };
      $puck_18 = $puck_19;
    }
    else {
      $puck_18 = false;
    };
    const isSelf = $puck_18;
    if ((!isSelf)) {
      let $puck_20 = type_._class;
      if ($puck_20 !== undefined) {
        let _class = $puck_20;
        let $puck_21 = $puck_12.checkRange(t.typeParameters, _class.parameterRange, "type parameters", $puck_9.Type.displayName.call(type_));
        if ($puck_21.kind === "Err") {
          let {value: error} = $puck_21;
          self.value.reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t, $isTraitObject: true}, $puck_9.CompilationError.Other(error));
        };
      }
      else {
        if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}) > 0) {
          self.value.reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t, $isTraitObject: true}, $puck_9.CompilationError.Other("Type " + $puck_9.Type.displayName.call(type_) + " is not generic"));
        };
      };
    };
    visit2.walkNamedTypeBound(self, t);
    let $puck_22;
    if ($puck_1.Option.isSome.call(type_._class)) {
      let $puck_23 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}, function (typeBound) {
        return $puck_4.TypeBound.getType.call(typeBound);
      })
;
      $puck_22 = $puck_14.createTypeInstance(type_, $puck_1.Iterable[$puck_23.type].toList.call($puck_23));
    }
    else {
      $puck_22 = type_;
    };
    t.type_ = $puck_22;
  };
},
visitRecordTypeBound: function (t) {
  let self = this;
  if ((!t.scope)) {
    t.scope = self.value.getScope();
    visit2.walkRecordTypeBound(self, t);
    let properties = $puck_1.ObjectMap._new();
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.properties, $isTraitObject: true}, function (p) {
      let $puck_24 = p;
      if ($puck_24.kind === "Property") {
        let {value: {name: name, optional: optional, typeBound: typeBound}} = $puck_24;
        return $puck_1.ObjectMap.set.call(properties, name.name, {
          type_: $puck_4.TypeBound.getType.call(typeBound),
          optional: optional,
        });
      }
      else {
        if ($puck_24.kind === "Spread") {
          let {value: typeBound} = $puck_24;
          let $puck_25 = $puck_4.TypeBound.getType.call(typeBound).kind;
          if (($puck_25.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($puck_25.value).kind).kind === "Record")) {
            let {value: {kind: {value: r}}} = $puck_25;
            return $puck_1.ObjectMap.merge.call(properties, r.properties);
          }
          else {
            if (true) {
              $puck_25;
              return self.value.reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: typeBound, $isTraitObject: true}, $puck_9.CompilationError.Other("Can only spread record types"));
            };
          };
        };
      };
    });
    t.type_ = $puck_9.Type({
      definition: $puck_9.Definition({
      file: self.value.file,
      token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordTypeBound', value: t, $isTraitObject: true},
    }),
      id: $puck_1.None,
      displayName: $puck_1.None,
      name: $puck_1.None,
      kind: $puck_9.TypeKind.Struct({
      implementations: [],
      kind: $puck_9.StructKind.Record({properties: properties}),
    }),
      _class: $puck_1.None,
      instance: $puck_1.None,
      providesType: $puck_1.None,
      enumMember: $puck_1.None,
    });
  };
},
visitRecordTypeBoundMember: $puck_7.EmptyVisitor.visitRecordTypeBoundMember,
visitTupleTypeBound: function (t) {
  let self = this;
  if ((!t.scope)) {
    t.scope = self.value.getScope();
    visit2.walkTupleTypeBound(self, t);
    let $puck_26 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.properties, $isTraitObject: true}, function (p) {
      return $puck_4.TypeBound.getType.call(p);
    })
;
    t.type_ = $puck_9.Type({
      definition: $puck_9.Definition({
      file: self.value.file,
      token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleTypeBound', value: t, $isTraitObject: true},
    }),
      id: $puck_1.None,
      displayName: $puck_1.None,
      name: $puck_1.None,
      kind: $puck_9.TypeKind.Struct({
      implementations: [],
      kind: $puck_9.StructKind.Tuple({properties: $puck_1.Iterable[$puck_26.type].toList.call($puck_26)}),
    }),
      _class: $puck_1.None,
      instance: $puck_1.None,
      providesType: $puck_1.None,
      enumMember: $puck_1.None,
    });
  };
},
visitTypeParameter: function (t) {
  let self = this;
  if (!t.scope) {
    t.scope = self.value.getScope();
    visit2.walkTypeParameter(self, t);
    t.type_ = $puck_9.Type({
      definition: $puck_9.Definition({
      file: self.value.file,
      token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter', value: t, $isTraitObject: true},
    }),
      id: $puck_1.Some(t.name.name),
      displayName: $puck_1.None,
      name: $puck_1.Some(t.name.name),
      kind: $puck_9.TypeKind.Parameter({defaultValue: $puck_1.Option.map.call(t.defaultValue, function (typeBound) {
      return $puck_4.TypeBound.getType.call(typeBound);
    })}),
      _class: $puck_1.None,
      instance: $puck_1.None,
      providesType: $puck_1.None,
      enumMember: $puck_1.None,
    });
    let scope = self.value.getScope();
    let $puck_27 = $puck_13.Scope.define.call(scope, {
      definition: $puck_9.Definition({
      file: self.value.file,
      token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter', value: t, $isTraitObject: true},
    }),
      name: t.name.name,
      mutable: false,
      allowRedeclare: false,
      type_: $puck_9.Type.provides($unwrapTraitObject(t.type_)),
      completeType: $puck_1.None,
      previous: $puck_1.None,
    });
    if ($puck_27.kind === "Err") {
      let {value: err} = $puck_27;
      self.value.reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: t.name, $isTraitObject: true}, $puck_9.CompilationError.Other(err));
    };
  };
},
visitTypeParameterBound: $puck_7.EmptyVisitor.visitTypeParameterBound,
visitWhereClause: $puck_7.EmptyVisitor.visitWhereClause
};
function asMut(i) {
  return i;
};
function notAssignableError(to, subject) {
  return $puck_9.Type.displayName.call(subject) + " is not assignable to type " + $puck_9.Type.displayName.call(to);
};
exports.notAssignableError = notAssignableError;
function structureVisitor(context, file, visitor = "") {
  function reportError(token, message) {
    return $puck_6.CompilerContext.reportError.call(context, file, token, $puck_9.CompilationError.Other(message));
  };
  return {
    visitEnumMember: visit.walkingVisitor.visitEnumMember,
    visitFunctionDeclaration: function (f) {
    let self = this;
    let $puck_29;
    if ($unwrapTraitObject(self).assignedTo) {
      let $puck_30 = $unwrapTraitObject($unwrapTraitObject(self).assignedTo).kind;
      let $puck_31;
      if (($puck_30.kind === "Function")) {
        let {value: func} = $puck_30;
        $puck_31 = $puck_1.Some(func);
      }
      else {
        $puck_31 = $puck_1.None;
      };
      $puck_29 = $puck_31;
    }
    else {
      $puck_29 = $puck_1.None;
    };
    const assignedTo = $puck_29;
    if ((!f.scope)) {
      let parentScope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(self).scope = $puck_13.Scope.createChild.call(parentScope);
      f.scope = $unwrapTraitObject(self).scope;
      $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.typeParameters, $isTraitObject: true}, function (p) {
        return $unwrapTraitObject(self).visitTypeParameter(p);
      });
      let $puck_32 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true})
;
      $puck_1.Iterable[$puck_32.type].forEach.call($puck_32, function ([i, p]) {
        let $puck_33 = assignedTo;
        let $puck_34;
        if ($puck_33 !== undefined) {
          let assignedTo = $puck_33;
          let $puck_35;
          if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: assignedTo.parameters, $isTraitObject: true}) > i) {
            $puck_35 = assignedTo.parameters[i].type_;
          }
          else {
            $puck_35 = $puck_2._undefined;
          };
          $puck_34 = $puck_35;
        }
        else {
          $puck_34 = $puck_2._undefined;
        };
        const type_ = $puck_34;
        return $unwrapTraitObject(self).visitVariableDeclaration(p, $puck_2._undefined, type_);
      });
      let $puck_36 = f.returnType;
      if ($puck_36 !== undefined) {
        let returnType = $puck_36;
        $unwrapTraitObject(self).visitTypeBound(returnType);
      };
      f.type_ = $puck_10.createFunctionType(file, $unwrapTraitObject(f.scope), f, reportError);
      let $puck_37 = f.name;
      if ($puck_37 !== undefined) {
        let name = $puck_37;
        let $puck_38 = $puck_13.Scope.define.call(parentScope, {
          definition: $puck_9.Definition({
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
        if ($puck_38.kind === "Err") {
          let {value: err} = $puck_38;
          reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: name, $isTraitObject: true}, err);
        };
      };
      return $unwrapTraitObject(self).scope = parentScope;
    }
    else {
      let parentScope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(self).scope = f.scope;
      let $puck_39 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true})
;
      $puck_1.Iterable[$puck_39.type].forEach.call($puck_39, function ([i, p]) {
        let $puck_40 = assignedTo;
        let $puck_41;
        if ($puck_40 !== undefined) {
          let assignedTo = $puck_40;
          let $puck_42;
          if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: assignedTo.parameters, $isTraitObject: true}) > i) {
            $puck_42 = assignedTo.parameters[i].type_;
          }
          else {
            $puck_42 = $puck_2._undefined;
          };
          $puck_41 = $puck_42;
        }
        else {
          $puck_41 = $puck_2._undefined;
        };
        const type_ = $puck_41;
        return $unwrapTraitObject(self).visitVariableDeclaration(p, $puck_2._undefined, type_);
      });
      return $unwrapTraitObject(self).scope = parentScope;
    };
  },
    visitMethodDeclaration: function (f, selfType) {
    let self = this;
    if ((!f.scope)) {
      const parentScope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(self).scope = $puck_13.Scope.createChild.call(parentScope);
      f.scope = $unwrapTraitObject(self).scope;
      if ($puck_1.Option.isNone.call(f.name)) {
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: f, $isTraitObject: true}, "Trait functions must have a name");
      };
      if ($puck_1.Option.isNone.call(f.returnType)) {
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: f, $isTraitObject: true}, "Trait functions must have a return type");
      };
      $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.typeParameters, $isTraitObject: true}, $unwrapTraitObject($unwrapTraitObject(self).visitTypeParameter).bind(self));
      let $puck_43 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true});
      if ($puck_43 !== undefined) {
        let first = $puck_43;
        let $puck_44 = first.pattern;
        if ($puck_44.kind === "Identifier") {
          let {value: {identifier: identifier}} = $puck_44;
          if (identifier.name === "self") {
            if ($puck_1.Option.isNone.call(first.typeBound)) {
              $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: f.parameterList, $isTraitObject: true}, 0).typeBound = $puck_1.Some($puck_4.TypeBound.NamedTypeBound({
                path: $puck_4.TypePath.Member({
                name: "Self",
                span: identifier.span,
              }),
                typeParameters: [],
              }));
            }
            else {
              $unwrapTraitObject(self).visitVariableDeclaration(first);
              if ((!$puck_14.isAssignable($unwrapTraitObject(first.type_), selfType))) {
                reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: first, $isTraitObject: true}, notAssignableError($unwrapTraitObject(first.type_), selfType));
              };
            };
          };
        };
      };
      $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true}, function (p) {
        return $unwrapTraitObject(self).visitVariableDeclaration(p);
      });
      let $puck_45 = f.returnType;
      if ($puck_45 !== undefined) {
        let returnType = $puck_45;
        $unwrapTraitObject(self).visitTypeBound(returnType);
      };
      f.type_ = $puck_10.createFunctionType(file, $unwrapTraitObject(f.scope), f, reportError);
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
      $unwrapTraitObject(self).scope = $puck_13.Scope.createChild.call(parentScope);
      t.scope = $unwrapTraitObject(self).scope;
      visit.walkFunctionTypeBound(self, t);
      let $puck_47 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.parameters.properties, $isTraitObject: true})
;
      let $puck_46 = $puck_1.Iterable[$puck_47.type].map.call($puck_47, function ([i, t]) {
        return {
          definition: $puck_9.Definition({
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
      const parameters = $puck_1.Iterable[$puck_46.type].toList.call($puck_46);
      t.type_ = $puck_9.Type({
        definition: $puck_9.Definition({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionTypeBound', value: t, $isTraitObject: true},
      }),
        id: $puck_1.None,
        displayName: $puck_1.None,
        name: $puck_1.None,
        kind: $puck_9.TypeKind.Function({
        selfBinding: $puck_1.None,
        parameters: parameters,
        parameterRange: {
        start: $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameters, $isTraitObject: true}),
        end: $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parameters, $isTraitObject: true}) + 1,
      },
        returnType: $puck_4.TypeBound.getType.call(t.returnType),
        isAbstract: false,
      }),
        _class: $puck_9.TypeClass.fromAstNode(t, reportError),
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
      if (!$puck_9.Type.isTrait.call($puck_4.NamedTypeBound.getType.call(t.traitBound))) {
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t.traitBound, $isTraitObject: true}, "Can only add a trait bound, " + $puck_9.Type.displayName.call($puck_4.NamedTypeBound.getType.call(t.traitBound)) + " is not a trait");
      };
      return t.type_ = $puck_9.Type({
        definition: $puck_9.Definition({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IntersectionTypeBound', value: t, $isTraitObject: true},
      }),
        id: $puck_1.None,
        displayName: $puck_1.None,
        name: $puck_1.None,
        kind: $puck_9.TypeKind.Intersection({
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
      type_ = $puck_9.Type({
        definition: $puck_9.Definition({
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
      let $puck_48 = t.path;
      let $puck_49;
      if ($puck_48.kind === "Member") {
        let {value: {name: name}} = $puck_48;
        let $puck_50;
        if (name === "Self") {
          if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}) > 0) {
            reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t, $isTraitObject: true}, "Self is not generic");
          };
          $puck_50 = true;
        }
        else {
          $puck_50 = false;
        };
        $puck_49 = $puck_50;
      }
      else {
        $puck_49 = false;
      };
      const isSelf = $puck_49;
      if ((!isSelf)) {
        let $puck_51 = type_._class;
        if ($puck_51 !== undefined) {
          let _class = $puck_51;
          let $puck_52 = $puck_12.checkRange(t.typeParameters, _class.parameterRange, "type parameters", $puck_9.Type.displayName.call(type_));
          if ($puck_52.kind === "Err") {
            let {value: error} = $puck_52;
            reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t, $isTraitObject: true}, error);
          };
        }
        else {
          if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}) > 0) {
            reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t, $isTraitObject: true}, "Type " + $puck_9.Type.displayName.call(type_) + " is not generic");
          };
        };
      };
      visit.walkNamedTypeBound(self, t);
      let $puck_53;
      if ($puck_1.Option.isSome.call(type_._class)) {
        let $puck_54 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}, function (typeBound) {
          return $puck_4.TypeBound.getType.call(typeBound);
        })
;
        $puck_53 = $puck_14.createTypeInstance(type_, $puck_1.Iterable[$puck_54.type].toList.call($puck_54));
      }
      else {
        $puck_53 = type_;
      };
      return t.type_ = $puck_53;
    };
  },
    visitRecordTypeBound: function (t) {
    const self = this;
    if ((!t.scope)) {
      t.scope = $unwrapTraitObject(self).scope;
      visit.walkRecordTypeBound(self, t);
      let properties = $puck_1.ObjectMap._new();
      $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.properties, $isTraitObject: true}, function (p) {
        let $puck_55 = p;
        if ($puck_55.kind === "Property") {
          let {value: {name: name, optional: optional, typeBound: typeBound}} = $puck_55;
          return $puck_1.ObjectMap.set.call(properties, name.name, {
            type_: $puck_4.TypeBound.getType.call(typeBound),
            optional: optional,
          });
        }
        else {
          if ($puck_55.kind === "Spread") {
            let {value: typeBound} = $puck_55;
            let $puck_56 = $puck_4.TypeBound.getType.call(typeBound).kind;
            if (($puck_56.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($puck_56.value).kind).kind === "Record")) {
              let {value: {kind: {value: r}}} = $puck_56;
              return $puck_1.ObjectMap.merge.call(properties, r.properties);
            }
            else {
              if (true) {
                $puck_56;
                return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeBound', value: typeBound, $isTraitObject: true}, "Can only spread record types");
              };
            };
          };
        };
      });
      return t.type_ = $puck_9.Type({
        definition: $puck_9.Definition({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordTypeBound', value: t, $isTraitObject: true},
      }),
        id: $puck_1.None,
        displayName: $puck_1.None,
        name: $puck_1.None,
        kind: $puck_9.TypeKind.Struct({
        implementations: [],
        kind: $puck_9.StructKind.Record({properties: properties}),
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
      let $puck_57 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.properties, $isTraitObject: true}, function (p) {
        return $puck_4.TypeBound.getType.call(p);
      })
;
      return t.type_ = $puck_9.Type({
        definition: $puck_9.Definition({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleTypeBound', value: t, $isTraitObject: true},
      }),
        id: $puck_1.None,
        displayName: $puck_1.None,
        name: $puck_1.None,
        kind: $puck_9.TypeKind.Struct({
        implementations: [],
        kind: $puck_9.StructKind.Tuple({properties: $puck_1.Iterable[$puck_57.type].toList.call($puck_57)}),
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
      t.type_ = $puck_9.Type({
        definition: $puck_9.Definition({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter', value: t, $isTraitObject: true},
      }),
        id: $puck_1.Some(t.name.name),
        displayName: $puck_1.None,
        name: $puck_1.Some(t.name.name),
        kind: $puck_9.TypeKind.Parameter({defaultValue: $puck_1.Option.map.call(t.defaultValue, function (typeBound) {
        return $puck_4.TypeBound.getType.call(typeBound);
      })}),
        _class: $puck_1.None,
        instance: $puck_1.None,
        providesType: $puck_1.None,
        enumMember: $puck_1.None,
      });
      let scope = $unwrapTraitObject(self).scope;
      let $puck_58 = $puck_13.Scope.define.call(scope, {
        definition: $puck_9.Definition({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeParameter', value: t, $isTraitObject: true},
      }),
        name: t.name.name,
        mutable: false,
        allowRedeclare: false,
        type_: $puck_9.Type.provides($unwrapTraitObject(t.type_)),
        completeType: $puck_1.None,
        previous: $puck_1.None,
      });
      if ($puck_58.kind === "Err") {
        let {value: err} = $puck_58;
        return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: t.name, $isTraitObject: true}, err);
      };
    };
  },
    visitTypePath: function (t) {
    const self = this;
    if ((!t.type_)) {
      t.scope = $unwrapTraitObject(self).scope;
      const scope = $unwrapTraitObject(self).scope;
      let $puck_59 = $puck_13.Scope.getTypePath.call(scope, t, visitor);
      if ($puck_59.kind === "Ok") {
        let {value: binding} = $puck_59;
        t.type_ = binding.type_;
        return t.providesType = (binding.type_ && $puck_1.Option.unwrapOr.call(binding.type_.providesType, binding.type_));
      }
      else {
        if ($puck_59.kind === "Err" && $unwrapTraitObject($puck_59.value).kind === "UndefinedType") {
          let {value: {value: name}} = $puck_59;
          return $puck_6.CompilerContext.reportError.call(context, file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypePath', value: t, $isTraitObject: true}, $puck_9.CompilationError.UndefinedVariable(name));
        }
        else {
          if (($puck_59.kind === "Err" && $unwrapTraitObject($puck_59.value).kind === "Other")) {
            let {value: {value: err}} = $puck_59;
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
    if (!$puck_14.isAssignable($unwrapTraitObject(d.pattern.type_), type_)) {
      return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: d.pattern, $isTraitObject: true}, $puck_9.Type.displayName.call(type_) + " is not assignable to pattern " + $puck_4.Pattern.displayName.call(d.pattern));
    };
    let scope = $unwrapTraitObject(self).scope;
    let $puck_60;
    if ($puck_1.Option.isSome.call(d.initializer)) {
      $puck_60 = $puck_13.Scope.createChild.call(scope);
    }
    else {
      $puck_60 = scope;
    };
    let childScope = $puck_60;
    let $puck_61 = $puck_11.declarePatternVariables(childScope, self, d.pattern, type_, false, $puck_1.Option.isSome.call(d.initializer));
    if (($puck_61.kind === "Ok")) {
      $puck_61;
    }
    else {
      if (($puck_61.kind === "Err" && $unwrapTraitObject($puck_61.value).kind === "PatternMismatch")) {
        let {value: {value: [, to, subject]}} = $puck_61;
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: d, $isTraitObject: true}, notAssignableError(to, subject));
      }
      else {
        if (($puck_61.kind === "Err" && $unwrapTraitObject($puck_61.value).kind === "NotExhaustive")) {
          $puck_61;
          reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: d, $isTraitObject: true}, "non exhaustive pattern");
        }
        else {
          if (($puck_61.kind === "Err" && $unwrapTraitObject($puck_61.value).kind === "ScopeError")) {
            let {value: {value: [token, err]}} = $puck_61;
            reportError(token, err);
          };
        };
      };
    };
    let $puck_62 = d.initializer;
    if ($puck_62 !== undefined) {
      let initializer = $puck_62;
      const parentVariableDeclarationScope = $unwrapTraitObject(self).variableDeclarationScope;
      $unwrapTraitObject(self).variableDeclarationScope = childScope;
      if (visitInitializer) {
        visitInitializer(initializer);
      }
      else {
        $unwrapTraitObject(self).visitExpression(initializer);
      };
      $puck_13.Scope.merge.call(scope, childScope);
      $unwrapTraitObject(self).variableDeclarationScope = parentVariableDeclarationScope;
      const initializerType = $puck_4.Expression.getType.call(initializer);
      if ((!d.type_ && d.pattern.binding)) {
        d.pattern.binding.type_ = initializerType;
        d.type_ = initializerType;
      }
      else {
        if (!$puck_14.isAssignable(type_, initializerType)) {
          return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: initializer, $isTraitObject: true}, notAssignableError(type_, initializerType));
        };
      };
      if (!$puck_14.isAssignable($unwrapTraitObject(d.pattern.type_), initializerType)) {
        return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: d, $isTraitObject: true}, notAssignableError($unwrapTraitObject(d.pattern.type_), initializerType));
      };
    };
  },
    visitTypeParameterBound: visit.walkingVisitor.visitTypeParameterBound,
    visitWhereClause: visit.walkingVisitor.visitWhereClause,
  };
};
exports.structureVisitor = structureVisitor;
function visitMethodDeclaration(visitor, f, selfType) {
  if (!f.type_) {
    const parentScope = visitor.getScope();
    const scope = $puck_13.Scope.createChild.call(parentScope);
    visitor.setScope(scope);
    f.scope = scope;
    if ($puck_1.Option.isNone.call(f.name)) {
      visitor.reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: f, $isTraitObject: true}, $puck_9.CompilationError.Other("Trait functions must have a name"));
    };
    if ($puck_1.Option.isNone.call(f.returnType)) {
      visitor.reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: f, $isTraitObject: true}, $puck_9.CompilationError.Other("Trait functions must have a return type"));
    };
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.typeParameters, $isTraitObject: true}, function (p) {
      return $puck_7.EmptyVisitor["$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/src/structure_visitor.puck:TypeBoundVisitor"].visitTypeParameter.call({type: '$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/src/structure_visitor.puck:TypeBoundVisitor', value: visitor, $isTraitObject: true}, p);
    });
    let $puck_63 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true});
    if ($puck_63 !== undefined) {
      let first = $puck_63;
      let $puck_64 = first.pattern;
      if ($puck_64.kind === "Identifier") {
        let {value: {identifier: identifier}} = $puck_64;
        if (identifier.name === "self") {
          let $puck_65 = first.typeBound;
          if ($puck_65 !== undefined) {
            let typeBound = $puck_65;
            $puck_7.EmptyVisitor["$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/src/structure_visitor.puck:TypeBoundVisitor"].visitTypeBound.call({type: '$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/src/structure_visitor.puck:TypeBoundVisitor', value: visitor, $isTraitObject: true}, typeBound);
            if ((!$puck_14.isAssignable($puck_4.TypeBound.getType.call(typeBound), selfType))) {
              visitor.reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: first, $isTraitObject: true}, $puck_9.CompilationError.Other(notAssignableError($puck_4.TypeBound.getType.call(typeBound), selfType)));
            };
          }
          else {
            $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: asMut(f).parameterList, $isTraitObject: true}, 0).typeBound = $puck_1.Some($puck_4.TypeBound.NamedTypeBound({
              path: $puck_4.TypePath.Member({
              name: "Self",
              span: identifier.span,
            }),
              typeParameters: [],
            }));
          };
        };
      };
    };
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true}, function (p) {
      let $puck_66 = p.typeBound;
      if ($puck_66 !== undefined) {
        let typeBound = $puck_66;
        $puck_7.EmptyVisitor["$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/src/structure_visitor.puck:TypeBoundVisitor"].visitTypeBound.call({type: '$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/src/structure_visitor.puck:TypeBoundVisitor', value: visitor, $isTraitObject: true}, typeBound);
        p.type_ = $puck_4.TypeBound.getType.call(typeBound);
        return undefined;
      }
      else {
        return visitor.reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: p, $isTraitObject: true}, $puck_9.CompilationError.Other("Trait function parameters must have a type"));
      };
    });
    let $puck_67 = f.returnType;
    if ($puck_67 !== undefined) {
      let returnType = $puck_67;
      $puck_7.EmptyVisitor["$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/src/structure_visitor.puck:TypeBoundVisitor"].visitTypeBound.call({type: '$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/src/structure_visitor.puck:TypeBoundVisitor', value: visitor, $isTraitObject: true}, returnType);
    };
    asMut(f).type_ = $puck_10.createFunctionType(visitor.file, scope, f, function (token, message) {
      return visitor.reportError(token, $puck_9.CompilationError.Other(message));
    });
    visitor.setScope(parentScope);
  };
};
exports.visitMethodDeclaration = visitMethodDeclaration
