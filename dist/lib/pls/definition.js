'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.Definition = exports.DefinitionVisitorundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("./../ast/ast");
const $puck_3 = require("./../ast/span");
const $puck_4 = require("./../typeck/src/scope");
const $puck_5 = require("./../entities");
const $puck_6 = require("./position_visitor");
const visit = require("./position_visitor");
var Definition = exports.Definition = (object) => object;
var DefinitionVisitor = exports.DefinitionVisitor = (object) => object;
$puck_6.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/definition.puck:DefinitionVisitor"] = {
position: function () {
  const self = this;
  return self.value.position;
},
visitModule: $puck_6.PositionVisitor.visitModule,
visitTopLevelStatement: $puck_6.PositionVisitor.visitTopLevelStatement,
visitBlockLevelStatement: $puck_6.PositionVisitor.visitBlockLevelStatement,
visitExpression: $puck_6.PositionVisitor.visitExpression,
visitEnumDeclaration: $puck_6.PositionVisitor.visitEnumDeclaration,
visitEnumMember: $puck_6.PositionVisitor.visitEnumMember,
visitImplDeclaration: function (i) {
  let self = this;
  const trait_ = $puck_2.NamedTypeBound.getType.call(i.trait_);
  if (trait_) {
    let $puck_7 = trait_.kind;
    if ($unwrapTraitObject($puck_7).kind == "Trait") {
      let {value: [trait_]} = $unwrapTraitObject($puck_7);
      self.value.inTraitImpl = $puck_1.Some(trait_);
    }
    else {
      if (true) {
        let $puck_8 = $puck_7;
      };
    };
  };
  visit.walkImplDeclaration(self, i);
},
visitImplShorthandDeclaration: $puck_6.PositionVisitor.visitImplShorthandDeclaration,
visitMethodDeclaration: function (f) {
  let self = this;
  let $puck_16 = [
    f.name,
    self.value.inTraitImpl,
  ];
  if (($unwrapTraitObject($puck_16[0]).kind == "Some" && $unwrapTraitObject($puck_16[1]).kind == "Some")) {
    let [{value: [name]}, {value: [trait_]}] = $puck_16;
    if ($puck_3.Span.cmp.call(name.span, self.value.position) == $puck_1.Ordering.Equal) {
      let $puck_17 = $puck_1.ObjectMap.get.call(trait_.functions, name.name);
      if ($puck_17.kind == "Some") {
        let {value: [func]} = $puck_17;
        let $puck_18 = func.definition.token
;
        self.value.definitions = [{
          file: func.definition.file,
          span: $puck_3.ToSpan[$puck_18.type].span.call($puck_18),
        }];
      };
    };
  };
},
visitTraitDeclaration: $puck_6.PositionVisitor.visitTraitDeclaration,
visitTypeDeclaration: $puck_6.PositionVisitor.visitTypeDeclaration,
visitExportDirective: $puck_6.PositionVisitor.visitExportDirective,
visitImportDirective: function (i) {
  let self = this;
  self.value.importedModule = i._module;
  let $puck_9 = i._module;
  if ($puck_9.kind == "Some") {
    let {value: [_module]} = $puck_9;
    if ($puck_1.Option.isNone.call(i.domain)) {
      if ($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral', value: i.locator, $isTraitObject: true}), self.value.position) == $puck_1.Ordering.Equal) {
        self.value.definitions = [{
          file: _module.file,
          span: $puck_3.Span({
          start: {
          line: 1,
          column: 1,
        },
          end: {
          line: 1,
          column: 1,
        },
        }),
        }];
        return [];
      }
      else {
        if ($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportSpecifier"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportSpecifier', value: i.specifier, $isTraitObject: true}), self.value.position) == $puck_1.Ordering.Equal) {
          let $puck_10 = i.specifier;
          if ($unwrapTraitObject($puck_10).kind == "Identifier") {
            let {value: [$puck_11]} = $unwrapTraitObject($puck_10);
            self.value.definitions = [{
              file: _module.file,
              span: $puck_3.Span({
              start: {
              line: 1,
              column: 1,
            },
              end: {
              line: 1,
              column: 1,
            },
            }),
            }];
            return [];
          }
          else {
            if (true) {
              let $puck_12 = $puck_10;
            };
          };
        };
      };
    };
  };
  visit.walkImportDirective(self, i);
},
visitObjectDestructure: $puck_6.PositionVisitor.visitObjectDestructure,
visitObjectDestructureMember: function (m) {
  let self = this;
  if ($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: m.property, $isTraitObject: true}), $puck_6.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/definition.puck:DefinitionVisitor"].position.call(self)) == $puck_1.Ordering.Equal) {
    let $puck_13 = self.value.importedModule;
    if ($puck_13.kind == "Some") {
      let {value: [_module]} = $puck_13;
      let $puck_14 = $puck_1.ObjectMap.get.call(_module.exports, m.property.name);
      if ($puck_14.kind == "Some") {
        let {value: [e]} = $puck_14;
        self.value.definitions = [{
          file: _module.file,
          span: $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: e.identifier, $isTraitObject: true}),
        }];
      };
    };
  };
},
visitBlock: $puck_6.PositionVisitor.visitBlock,
visitBreakStatement: $puck_6.PositionVisitor.visitBreakStatement,
visitReturnStatement: $puck_6.PositionVisitor.visitReturnStatement,
visitWhileLoop: $puck_6.PositionVisitor.visitWhileLoop,
visitIdentifier: function (i) {
  let self = this;
  const binding = $unwrapTraitObject(i.binding);
  if (binding) {
    let $puck_15 = binding.definition.token
;
    self.value.definitions = [{
      file: binding.definition.file,
      span: $puck_3.ToSpan[$puck_15.type].span.call($puck_15),
    }];
  };
},
visitFunctionDeclaration: $puck_6.PositionVisitor.visitFunctionDeclaration,
visitVariableDeclaration: $puck_6.PositionVisitor.visitVariableDeclaration,
visitAssignmentExpression: $puck_6.PositionVisitor.visitAssignmentExpression,
visitBinaryExpression: $puck_6.PositionVisitor.visitBinaryExpression,
visitCallExpression: function (e) {
  let self = this;
  if (e.functionType) {
    if ($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.func, $isTraitObject: true}), $puck_6.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/definition.puck:DefinitionVisitor"].position.call(self)) == $puck_1.Ordering.Equal) {
      let $puck_19 = e.func;
      if ($puck_19.kind == "MemberAccess") {
        let {value: [a]} = $puck_19;
        if ($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: a.member, $isTraitObject: true}), $puck_6.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/definition.puck:DefinitionVisitor"].position.call(self)) == $puck_1.Ordering.Equal) {
          const functionType = $unwrapTraitObject(e.functionType);
          const traitBinding = $unwrapTraitObject(e.traitBinding);
          const objectType = $puck_2.Expression.getType.call(a.object);
          const implementation = $unwrapTraitObject(e.implementation);
          if ((implementation && !e.isShorthand && $puck_1.ObjectMap.has.call(implementation.functions, a.member.name))) {
            let $puck_20 = $puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: implementation.functions, $isTraitObject: true}, a.member.name).definition.token
;
            let $puck_21 = $puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: $puck_5.Type.getTrait.call(implementation.trait_).functions, $isTraitObject: true}, a.member.name).definition.token
;
            self.value.definitions = [
              {
              file: $puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: implementation.functions, $isTraitObject: true}, a.member.name).definition.file,
              span: $puck_3.ToSpan[$puck_20.type].span.call($puck_20),
            },
              {
              file: $puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: $puck_5.Type.getTrait.call(implementation.trait_).functions, $isTraitObject: true}, a.member.name).definition.file,
              span: $puck_3.ToSpan[$puck_21.type].span.call($puck_21),
            },
            ];
          }
          else {
            let $puck_22 = functionType.definition.token
;
            self.value.definitions = [{
              file: functionType.definition.file,
              span: $puck_3.ToSpan[$puck_22.type].span.call($puck_22),
            }];
          };
          return [];
        };
      };
    };
  };
  visit.walkCallExpression(self, e);
},
visitIfExpression: $puck_6.PositionVisitor.visitIfExpression,
visitIfLetExpression: $puck_6.PositionVisitor.visitIfLetExpression,
visitMatchExpression: $puck_6.PositionVisitor.visitMatchExpression,
visitMatchArm: $puck_6.PositionVisitor.visitMatchArm,
visitTypePath: $puck_6.PositionVisitor.visitTypePath,
visitTypePathExpression: $puck_6.PositionVisitor.visitTypePathExpression,
visitUnaryExpression: $puck_6.PositionVisitor.visitUnaryExpression,
visitIndexAccess: $puck_6.PositionVisitor.visitIndexAccess,
visitMemberAccess: function (a) {
  let self = this;
  if ($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: a.member, $isTraitObject: true}), $puck_6.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/definition.puck:DefinitionVisitor"].position.call(self)) == $puck_1.Ordering.Equal) {
    $puck_1.print("onDefinition visitMemberAccess");
    const type_ = $puck_2.Expression.getType.call(a.object);
    if (type_) {
      let $puck_23 = type_.kind;
      if (($unwrapTraitObject($puck_23).kind == "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_23).value)[0]).kind).kind == "Record")) {
        let {value: [{kind: {value: [record]}}]} = $unwrapTraitObject($puck_23);
        let $puck_24 = $puck_1.ObjectMap.get.call(record.properties, a.member.name);
        if ($puck_24.kind == "Some") {
          let {value: [type_]} = $puck_24;
          let $puck_25 = type_.definition.token
;
          self.value.definitions = [{
            file: type_.definition.file,
            span: $puck_3.ToSpan[$puck_25.type].span.call($puck_25),
          }];
        };
      }
      else {
        if (true) {
          let $puck_26 = $puck_23;
        };
      };
    };
  }
  else {
    visit.walkMemberAccess(self, a);
  };
},
visitUnknownAccess: $puck_6.PositionVisitor.visitUnknownAccess,
visitUnknownIndexAccess: $puck_6.PositionVisitor.visitUnknownIndexAccess,
visitListLiteral: $puck_6.PositionVisitor.visitListLiteral,
visitBooleanLiteral: $puck_6.PositionVisitor.visitBooleanLiteral,
visitNumberLiteral: $puck_6.PositionVisitor.visitNumberLiteral,
visitRecordLiteral: $puck_6.PositionVisitor.visitRecordLiteral,
visitRecordLiteralMember: $puck_6.PositionVisitor.visitRecordLiteralMember,
visitStringLiteral: $puck_6.PositionVisitor.visitStringLiteral,
visitStringLiteralPart: $puck_6.PositionVisitor.visitStringLiteralPart,
visitTupleLiteral: $puck_6.PositionVisitor.visitTupleLiteral,
visitPattern: $puck_6.PositionVisitor.visitPattern,
visitIdentifierPattern: $puck_6.PositionVisitor.visitIdentifierPattern,
visitRecordPattern: $puck_6.PositionVisitor.visitRecordPattern,
visitRecordTypePattern: $puck_6.PositionVisitor.visitRecordTypePattern,
visitTuplePattern: $puck_6.PositionVisitor.visitTuplePattern,
visitTupleTypePattern: $puck_6.PositionVisitor.visitTupleTypePattern,
visitTypeBound: $puck_6.PositionVisitor.visitTypeBound,
visitFunctionTypeBound: $puck_6.PositionVisitor.visitFunctionTypeBound,
visitNamedTypeBound: $puck_6.PositionVisitor.visitNamedTypeBound,
visitRecordTypeBound: $puck_6.PositionVisitor.visitRecordTypeBound,
visitRecordTypeBoundMember: $puck_6.PositionVisitor.visitRecordTypeBoundMember,
visitTupleTypeBound: $puck_6.PositionVisitor.visitTupleTypeBound,
visitTypeParameter: $puck_6.PositionVisitor.visitTypeParameter
};
DefinitionVisitor._new = function (file, position) {
  return {
    file: file,
    position: position,
    definitions: [],
    importedModule: $puck_1.None,
    inTraitImpl: $puck_1.None,
  };
}
