'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.TypeBoundVisitor = exports.notAssignableError = exports.visitMethodDeclaration = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("util");
const $puck_4 = require("./../../ast/ast");
const $puck_5 = require("./../../ast/span");
const $puck_6 = require("./../../compiler");
const $puck_7 = require("./../../ast/visit");
const visit = require("./../../ast/visit");
const $puck_8 = require("./../../compiler/ast");
const $puck_9 = require("./../../entities");
const $puck_10 = require("./functions");
const $puck_11 = require("./patterns");
const $puck_12 = require("./range");
const $puck_13 = require("./scope");
const $puck_14 = require("./types");
var TypeBoundVisitor = exports.TypeBoundVisitor = (object) => object;
$puck_7.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor"] = {
visitModule: $puck_7.Visit.visitModule,
visitTopLevelStatement: $puck_7.Visit.visitTopLevelStatement,
visitBlockLevelStatement: $puck_7.Visit.visitBlockLevelStatement,
visitExpression: $puck_7.Visit.visitExpression,
visitEnumDeclaration: $puck_7.Visit.visitEnumDeclaration,
visitEnumMember: $puck_7.Visit.visitEnumMember,
visitImplDeclaration: $puck_7.Visit.visitImplDeclaration,
visitImplShorthandDeclaration: $puck_7.Visit.visitImplShorthandDeclaration,
visitMethodDeclaration: $puck_7.Visit.visitMethodDeclaration,
visitTraitDeclaration: $puck_7.Visit.visitTraitDeclaration,
visitTypeDeclaration: $puck_7.Visit.visitTypeDeclaration,
visitExportDirective: $puck_7.Visit.visitExportDirective,
visitImportDirective: $puck_7.Visit.visitImportDirective,
visitObjectDestructure: $puck_7.Visit.visitObjectDestructure,
visitObjectDestructureMember: $puck_7.Visit.visitObjectDestructureMember,
visitBlock: $puck_7.Visit.visitBlock,
visitBreakStatement: $puck_7.Visit.visitBreakStatement,
visitReturnStatement: $puck_7.Visit.visitReturnStatement,
visitForLoop: $puck_7.Visit.visitForLoop,
visitWhileLoop: $puck_7.Visit.visitWhileLoop,
visitIdentifier: $puck_7.Visit.visitIdentifier,
visitFunctionDeclaration: $puck_7.Visit.visitFunctionDeclaration,
visitVariableDeclaration: $puck_7.Visit.visitVariableDeclaration,
visitAssignmentExpression: $puck_7.Visit.visitAssignmentExpression,
visitBinaryExpression: $puck_7.Visit.visitBinaryExpression,
visitCallExpression: $puck_7.Visit.visitCallExpression,
visitIfExpression: $puck_7.Visit.visitIfExpression,
visitIfLetExpression: $puck_7.Visit.visitIfLetExpression,
visitMatchExpression: $puck_7.Visit.visitMatchExpression,
visitMatchArm: $puck_7.Visit.visitMatchArm,
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
visitTypePathExpression: $puck_7.Visit.visitTypePathExpression,
visitUnaryExpression: $puck_7.Visit.visitUnaryExpression,
visitIndexAccess: $puck_7.Visit.visitIndexAccess,
visitMemberAccess: $puck_7.Visit.visitMemberAccess,
visitTupleIndexAccess: $puck_7.Visit.visitTupleIndexAccess,
visitUnknownAccess: $puck_7.Visit.visitUnknownAccess,
visitUnknownIndexAccess: $puck_7.Visit.visitUnknownIndexAccess,
visitListLiteral: $puck_7.Visit.visitListLiteral,
visitBooleanLiteral: $puck_7.Visit.visitBooleanLiteral,
visitNumberLiteral: $puck_7.Visit.visitNumberLiteral,
visitRangeLiteral: $puck_7.Visit.visitRangeLiteral,
visitRecordLiteral: $puck_7.Visit.visitRecordLiteral,
visitRecordLiteralMember: $puck_7.Visit.visitRecordLiteralMember,
visitStringLiteral: $puck_7.Visit.visitStringLiteral,
visitStringLiteralPart: $puck_7.Visit.visitStringLiteralPart,
visitTupleLiteral: $puck_7.Visit.visitTupleLiteral,
visitPattern: $puck_7.Visit.visitPattern,
visitIdentifierPattern: $puck_7.Visit.visitIdentifierPattern,
visitRecordPattern: $puck_7.Visit.visitRecordPattern,
visitTuplePattern: $puck_7.Visit.visitTuplePattern,
visitTypeBound: $puck_7.Visit.visitTypeBound,
visitFunctionTypeBound: function (t) {
  let self = this;
  if (!t.scope) {
    const parentScope = self.value.getScope();
    self.value.setScope($puck_13.Scope.createChild.call(parentScope));
    t.scope = self.value.getScope();
    visit.walkFunctionTypeBound(self, t);
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
    visit.walkIntersectionTypeBound(self, t);
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
    $puck_7.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor"].visitTypePath.call(self, t.path);
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
    visit.walkNamedTypeBound(self, t);
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
    visit.walkRecordTypeBound(self, t);
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
visitRecordTypeBoundMember: $puck_7.Visit.visitRecordTypeBoundMember,
visitTupleTypeBound: function (t) {
  let self = this;
  if ((!t.scope)) {
    t.scope = self.value.getScope();
    visit.walkTupleTypeBound(self, t);
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
    visit.walkTypeParameter(self, t);
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
visitTypeParameterBound: $puck_7.Visit.visitTypeParameterBound,
visitWhereClause: $puck_7.Visit.visitWhereClause
};
function asMut(i) {
  return i;
};
function notAssignableError(to, subject) {
  return $puck_9.Type.displayName.call(subject) + " is not assignable to type " + $puck_9.Type.displayName.call(to);
};
exports.notAssignableError = notAssignableError;
function visitMethodDeclaration(visitor, f, selfType) {
  if ((!f.type_)) {
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
      return $puck_7.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor"].visitTypeParameter.call({type: '$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor', value: visitor, $isTraitObject: true}, p);
    });
    let $puck_29 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true});
    if ($puck_29 !== undefined) {
      let first = $puck_29;
      let $puck_30 = first.pattern;
      if ($puck_30.kind === "Identifier") {
        let {value: {identifier: identifier}} = $puck_30;
        if (identifier.name === "self") {
          let $puck_31 = first.typeBound;
          if ($puck_31 !== undefined) {
            let typeBound = $puck_31;
            $puck_7.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor"].visitTypeBound.call({type: '$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor', value: visitor, $isTraitObject: true}, typeBound);
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
      let $puck_32 = p.typeBound;
      if ($puck_32 !== undefined) {
        let typeBound = $puck_32;
        $puck_7.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor"].visitTypeBound.call({type: '$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor', value: visitor, $isTraitObject: true}, typeBound);
        p.type_ = $puck_4.TypeBound.getType.call(typeBound);
        return undefined;
      }
      else {
        return visitor.reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: p, $isTraitObject: true}, $puck_9.CompilationError.Other("Trait function parameters must have a type"));
      };
    });
    let $puck_33 = f.returnType;
    if ($puck_33 !== undefined) {
      let returnType = $puck_33;
      $puck_7.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor"].visitTypeBound.call({type: '$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor', value: visitor, $isTraitObject: true}, returnType);
    };
    asMut(f).type_ = $puck_10.createFunctionType(visitor.file, scope, f, function (token, message) {
      return visitor.reportError(token, $puck_9.CompilationError.Other(message));
    });
    visitor.setScope(parentScope);
  };
};
exports.visitMethodDeclaration = visitMethodDeclaration
