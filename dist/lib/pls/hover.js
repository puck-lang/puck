'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.Hover = exports.HoverVisitorundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("./../ast/ast");
const $puck_3 = require("./../ast/span");
const $puck_4 = require("./../entities");
const $puck_5 = require("./position_visitor");
const visit = require("./position_visitor");
var Hover = exports.Hover = (object) => object;
var HoverVisitor = exports.HoverVisitor = (object) => object;
$puck_5.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor"] = {
position: function () {
  const self = this;
  return self.value.position;
},
visitModule: $puck_5.PositionVisitor.visitModule,
visitTopLevelStatement: $puck_5.PositionVisitor.visitTopLevelStatement,
visitBlockLevelStatement: $puck_5.PositionVisitor.visitBlockLevelStatement,
visitExpression: $puck_5.PositionVisitor.visitExpression,
visitEnumDeclaration: $puck_5.PositionVisitor.visitEnumDeclaration,
visitEnumMember: $puck_5.PositionVisitor.visitEnumMember,
visitImplDeclaration: $puck_5.PositionVisitor.visitImplDeclaration,
visitImplShorthandDeclaration: $puck_5.PositionVisitor.visitImplShorthandDeclaration,
visitMethodDeclaration: $puck_5.PositionVisitor.visitMethodDeclaration,
visitTraitDeclaration: $puck_5.PositionVisitor.visitTraitDeclaration,
visitTypeDeclaration: $puck_5.PositionVisitor.visitTypeDeclaration,
visitExportDirective: $puck_5.PositionVisitor.visitExportDirective,
visitImportDirective: $puck_5.PositionVisitor.visitImportDirective,
visitObjectDestructure: $puck_5.PositionVisitor.visitObjectDestructure,
visitObjectDestructureMember: $puck_5.PositionVisitor.visitObjectDestructureMember,
visitBlock: $puck_5.PositionVisitor.visitBlock,
visitBreakStatement: $puck_5.PositionVisitor.visitBreakStatement,
visitReturnStatement: $puck_5.PositionVisitor.visitReturnStatement,
visitWhileLoop: $puck_5.PositionVisitor.visitWhileLoop,
visitIdentifier: function (i) {
  let self = this;
  $puck_1.print("onHover visitIdentifier");
  let type_ = $unwrapTraitObject(i.type_);
  if (!type_ && i.binding) {
    type_ = $unwrapTraitObject(i.binding.type_);
  };
  if (type_) {
    self.value.hover = $puck_1.Some({
      contents: getTypeContents(type_, self.value.inTypePath),
      span: $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: i, $isTraitObject: true}),
    });
  };
},
visitFunctionDeclaration: function (f) {
  let self = this;
  let $puck_6 = f.name;
  if ($puck_6.kind === "Some") {
    let {value: name} = $puck_6;
    if ($puck_1.identical($puck_3.Span.cmp.call(name.span, $puck_5.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor"].position.call(self)), $puck_1.Ordering.Equal)) {
      if (f.type_) {
        const type_ = f.type_;
        self.value.hover = $puck_1.Some({
          contents: getTypeContents(type_),
          span: name.span,
        });
        return null;
      };
    };
  };
  visit.walkFunctionDeclaration(self, f);
},
visitVariableDeclaration: function (d) {
  let self = this;
  const parent = self.value.patternType;
  let $puck_7;
  if (d.type_) {
    $puck_7 = $puck_1.Some($unwrapTraitObject(d.type_));
  }
  else {
    $puck_7 = $puck_1.None;
  };
  self.value.patternType = $puck_7;
  visit.walkVariableDeclaration(self, d);
  self.value.patternType = parent;
},
visitAssignmentExpression: $puck_5.PositionVisitor.visitAssignmentExpression,
visitBinaryExpression: $puck_5.PositionVisitor.visitBinaryExpression,
visitCallExpression: function (e) {
  let self = this;
  if (e.functionType) {
    if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.func, $isTraitObject: true}), $puck_5.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor"].position.call(self)), $puck_1.Ordering.Equal)) {
      let $puck_8 = e.func;
      if ($puck_8.kind === "MemberAccess") {
        let {value: a} = $puck_8;
        if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: a.member, $isTraitObject: true}), $puck_5.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor"].position.call(self)), $puck_1.Ordering.Equal)) {
          self.value.hover = $puck_1.Some({
            contents: getTypeContents($unwrapTraitObject(e.functionType)),
            span: $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: a.member, $isTraitObject: true}),
          });
          return null;
        };
      };
    };
  };
  visit.walkCallExpression(self, e);
},
visitIfExpression: $puck_5.PositionVisitor.visitIfExpression,
visitIfLetExpression: function (e) {
  let self = this;
  const parent = self.value.patternType;
  const expressionType = $puck_2.Expression.getType.call(e.expression);
  let $puck_9;
  if (expressionType) {
    $puck_9 = $puck_1.Some(expressionType);
  }
  else {
    $puck_9 = $puck_1.None;
  };
  self.value.patternType = $puck_9;
  visit.walkIfLetExpression(self, e);
  self.value.patternType = parent;
},
visitMatchExpression: function (e) {
  let self = this;
  const parent = self.value.patternType;
  const expressionType = $puck_2.Expression.getType.call(e.expression);
  let $puck_10;
  if (expressionType) {
    $puck_10 = $puck_1.Some(expressionType);
  }
  else {
    $puck_10 = $puck_1.None;
  };
  self.value.patternType = $puck_10;
  visit.walkMatchExpression(self, e);
  self.value.patternType = parent;
},
visitMatchArm: $puck_5.PositionVisitor.visitMatchArm,
visitTypePath: function (t) {
  let self = this;
  self.value.inTypePath = true;
  visit.walkTypePath(self, t);
  self.value.inTypePath = false;
},
visitTypePathExpression: $puck_5.PositionVisitor.visitTypePathExpression,
visitUnaryExpression: $puck_5.PositionVisitor.visitUnaryExpression,
visitIndexAccess: $puck_5.PositionVisitor.visitIndexAccess,
visitMemberAccess: function (a) {
  let self = this;
  if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: a.member, $isTraitObject: true}), $puck_5.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor"].position.call(self)), $puck_1.Ordering.Equal)) {
    $puck_1.print("onHover visitMemberAccess");
    if (a.type_) {
      const type_ = $unwrapTraitObject(a.type_);
      self.value.hover = $puck_1.Some({
        contents: getTypeContents(type_),
        span: $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: a.member, $isTraitObject: true}),
      });
    };
  }
  else {
    visit.walkMemberAccess(self, a);
  };
},
visitUnknownAccess: $puck_5.PositionVisitor.visitUnknownAccess,
visitUnknownIndexAccess: $puck_5.PositionVisitor.visitUnknownIndexAccess,
visitListLiteral: $puck_5.PositionVisitor.visitListLiteral,
visitBooleanLiteral: $puck_5.PositionVisitor.visitBooleanLiteral,
visitNumberLiteral: $puck_5.PositionVisitor.visitNumberLiteral,
visitRecordLiteral: function (l) {
  let self = this;
  const parent = self.value.literalType;
  let $puck_11;
  if (l.type_) {
    $puck_11 = $puck_1.Some($unwrapTraitObject(l.type_));
  }
  else {
    $puck_11 = $puck_1.None;
  };
  self.value.literalType = $puck_11;
  visit.walkRecordLiteral(self, l);
  self.value.literalType = parent;
},
visitRecordLiteralMember: function (l) {
  let self = this;
  let $puck_12 = l;
  if ($unwrapTraitObject($puck_12).kind === "Property") {
    let {value: {name: name, value: value}} = $unwrapTraitObject($puck_12);
    if ($puck_1.identical($puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: name, $isTraitObject: true}), $puck_5.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor"].position.call(self)), $puck_1.Ordering.Equal)) {
      $puck_1.print("onHover visitRecordLiteralMember");
      self.value.hover = $puck_1.Option.map.call($puck_1.Option.andThen.call(self.value.literalType, function (t) {
        return getPropertyType(t, name.name);
      }), function (type_) {
        return {
          contents: getTypeContents(type_),
          span: $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: name, $isTraitObject: true}),
        };
      });
    }
    else {
      visit.walkRecordLiteralMember(self, l);
    };
  }
  else {
    if ($unwrapTraitObject($puck_12).kind === "Spread") {
      let {value: e} = $unwrapTraitObject($puck_12);
      visit.walkRecordLiteralMember(self, l);
    };
  };
},
visitStringLiteral: $puck_5.PositionVisitor.visitStringLiteral,
visitStringLiteralPart: $puck_5.PositionVisitor.visitStringLiteralPart,
visitTupleLiteral: $puck_5.PositionVisitor.visitTupleLiteral,
visitPattern: $puck_5.PositionVisitor.visitPattern,
visitIdentifierPattern: function (p) {
  let self = this;
  $puck_1.print("onHover visitIdentifierPattern?");
  let $puck_13 = self.value.patternType;
  if ($puck_13.kind === "Some") {
    let {value: type_} = $puck_13;
    $puck_1.print("onHover visitIdentifierPattern");
    self.value.hover = $puck_1.Some({
      contents: getTypeContents(type_),
      span: $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: p, $isTraitObject: true}),
    });
  };
},
visitRecordPattern: function (p) {
  let self = this;
  let $puck_14 = $puck_1.List.binarySearchBy.call(p.properties, function (prop) {
    return $puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordPatternMember"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordPatternMember', value: prop, $isTraitObject: true}), $puck_5.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor"].position.call(self));
  });
  if ($puck_14.kind === "Ok") {
    let {value: index} = $puck_14;
    self.value.patternType = $puck_1.Option.andThen.call(self.value.patternType, function (t) {
      return getPropertyType(t, $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: p.properties, $isTraitObject: true}, index).property.name);
    });
    $puck_5.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor"].visitPattern.call(self, $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: p.properties, $isTraitObject: true}, index).pattern);
  };
},
visitRecordTypePattern: function (t, p) {
  let self = this;
  const type_ = $unwrapTraitObject(t.type_);
  let $puck_15;
  if (type_) {
    $puck_15 = $puck_1.Option.orValue.call($puck_1.Option.orValue.call($puck_1.Option.andThen.call(type_.enumMember, function ([member, ]) {
      return $puck_1.Option.andThen.call(self.value.patternType, function (t) {
        return getEnumMember(t, member);
      });
    }), type_.providesType), $puck_1.Some(type_));
  }
  else {
    $puck_15 = $puck_1.None;
  };
  self.value.patternType = $puck_15;
  visit.walkTypePath(self, t);
  $puck_5.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor"].visitRecordPattern.call(self, p);
},
visitTuplePattern: function (p) {
  let self = this;
  let $puck_16 = $puck_1.List.binarySearchBy.call(p.properties, function (prop) {
    return $puck_3.Span.cmp.call($puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: prop, $isTraitObject: true}), $puck_5.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor"].position.call(self));
  });
  if ($puck_16.kind === "Ok") {
    let {value: index} = $puck_16;
    self.value.patternType = $puck_1.Option.andThen.call(self.value.patternType, function (t) {
      return getTupleType(t, index);
    });
    $puck_5.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor"].visitPattern.call(self, $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: p.properties, $isTraitObject: true}, index));
  };
},
visitTupleTypePattern: function (t, p) {
  let self = this;
  const type_ = $unwrapTraitObject(t.type_);
  let $puck_17;
  if (type_) {
    $puck_17 = $puck_1.Option.orValue.call($puck_1.Option.orValue.call($puck_1.Option.andThen.call(type_.enumMember, function ([member, ]) {
      return $puck_1.Option.andThen.call(self.value.patternType, function (t) {
        return getEnumMember(t, member);
      });
    }), type_.providesType), $puck_1.Some(type_));
  }
  else {
    $puck_17 = $puck_1.None;
  };
  self.value.patternType = $puck_17;
  visit.walkTypePath(self, t);
  $puck_5.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor"].visitTuplePattern.call(self, p);
},
visitTypeBound: $puck_5.PositionVisitor.visitTypeBound,
visitFunctionTypeBound: $puck_5.PositionVisitor.visitFunctionTypeBound,
visitNamedTypeBound: $puck_5.PositionVisitor.visitNamedTypeBound,
visitRecordTypeBound: $puck_5.PositionVisitor.visitRecordTypeBound,
visitRecordTypeBoundMember: $puck_5.PositionVisitor.visitRecordTypeBoundMember,
visitTupleTypeBound: $puck_5.PositionVisitor.visitTupleTypeBound,
visitTypeParameter: $puck_5.PositionVisitor.visitTypeParameter
};
Hover.empty = function () {
  return {
    contents: [],
    span: $puck_3.Span.empty(),
  };
};
HoverVisitor._new = function (position) {
  return {
    position: position,
    hover: $puck_1.None,
    patternType: $puck_1.None,
    literalType: $puck_1.None,
    inTypePath: false,
  };
};
function getTypeContents(type_, details = false) {
  let $puck_18 = $puck_1.Option.unwrapOr.call(type_.providesType, type_).kind;
  let $puck_19;
  if ($unwrapTraitObject($puck_18).kind === "Enum") {
    $unwrapTraitObject($puck_18);
    $puck_19 = "enum " + $puck_4.Type.displayName.call(type_);
  }
  else {
    let $puck_20;
    if (($unwrapTraitObject($puck_18).kind === "Function")) {
      $unwrapTraitObject($puck_18);
      $puck_20 = $puck_4.Type.verboseName.call(type_);
    }
    else {
      let $puck_21;
      if ($unwrapTraitObject($puck_18).kind === "Struct") {
        $unwrapTraitObject($puck_18);
        let $puck_22;
        if (details) {
          $puck_22 = $puck_4.Type.verboseName.call($puck_1.Option.unwrapOr.call(type_.providesType, type_));
        }
        else {
          $puck_22 = "type " + $puck_4.Type.displayName.call(type_);
        };
        $puck_21 = $puck_22;
      }
      else {
        let $puck_23;
        if (($unwrapTraitObject($puck_18).kind === "Trait")) {
          $unwrapTraitObject($puck_18);
          $puck_23 = "trait " + $puck_4.Type.displayName.call(type_);
        }
        else {
          let $puck_24;
          if (true) {
            $puck_18;
            $puck_24 = $puck_4.Type.displayName.call(type_);
          };
          $puck_23 = $puck_24;
        };
        $puck_21 = $puck_23;
      };
      $puck_20 = $puck_21;
    };
    $puck_19 = $puck_20;
  };
  const name = $puck_19;
  return [{
    language: "puck",
    value: name,
  }];
};
function getEnumMember(type_, member) {
  let $puck_25 = type_.kind;
  if (($unwrapTraitObject($puck_25).kind === "Enum")) {
    let {value: enum_} = $unwrapTraitObject($puck_25);
    return $puck_1.ObjectMap.get.call(enum_.members, member);
  }
  else {
    if (true) {
      $puck_25;
      return $puck_1.None;
    };
  };
};
function getPropertyType(type_, property) {
  let $puck_26 = type_.kind;
  if (($unwrapTraitObject($puck_26).kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_26).value).kind).kind === "Record")) {
    let {value: {kind: {value: record}}} = $unwrapTraitObject($puck_26);
    return $puck_1.ObjectMap.get.call(record.properties, property);
  }
  else {
    if (true) {
      $puck_26;
      return $puck_1.None;
    };
  };
};
function getTupleType(type_, index) {
  let $puck_27 = type_.kind;
  if (($unwrapTraitObject($puck_27).kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_27).value).kind).kind === "Tuple")) {
    let {value: {kind: {value: tuple}}} = $unwrapTraitObject($puck_27);
    return $puck_1.List.get.call(tuple.properties, index);
  }
  else {
    if (true) {
      $puck_27;
      return $puck_1.None;
    };
  };
}
