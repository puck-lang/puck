'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.ScopeVisitor = exports.getBinding = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const core = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("util");
const $puck_4 = require("./../ast/ast");
const $puck_5 = require("./../ast/span");
const $puck_6 = require("./../ast/visit");
const visit = require("./../ast/visit");
const $puck_7 = require("./../ast/token");
const $puck_8 = require("./../compiler");
const $puck_9 = require("./src/enums");
const $puck_10 = require("./src/functions");
const $puck_11 = require("./src/impls");
const $puck_12 = require("./src/patterns");
const $puck_13 = require("./src/range");
const $puck_14 = require("./src/scope");
const $puck_15 = require("./src/type_bound_visitor");
const $puck_16 = require("./src/type_function");
const $puck_17 = require("./src/types");
const $puck_18 = require("./../entities");
const $puck_19 = require("./src/core_type_helpers");
var ScopeVisitor = exports.ScopeVisitor = (object) => object;
$puck_6.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/scope_visitor.puck:ScopeVisitor"] = {
visitModule: function (m) {
  let self = this;
  self.value.scope = $unwrapTraitObject(m.scope);
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: m.statements, $isTraitObject: true}, function (s) {
    let $puck_20 = s;
    if ($puck_20.kind === "ExportDirective" && $unwrapTraitObject($unwrapTraitObject($puck_20.value).statement).kind === "FunctionDeclaration") {
      let {value: {statement: {value: f}}} = $puck_20;
      return visitFunctionDeclaration(self.value, f);
    }
    else {
      if (($puck_20.kind === "BlockLevelStatement" && ($unwrapTraitObject($puck_20.value).kind === "Expression" && $unwrapTraitObject($unwrapTraitObject($puck_20.value).value).kind === "FunctionDeclaration"))) {
        let {value: {value: {value: f}}} = $puck_20;
        return visitFunctionDeclaration(self.value, f);
      }
      else {
        if (true) {
          let $puck_21 = $puck_20;;
          return $puck_21;
        };
      };
    };
  });
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: m.statements, $isTraitObject: true}, function (s) {
    self.value.isUsed = false;
    return $puck_6.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/scope_visitor.puck:ScopeVisitor"].visitTopLevelStatement.call(self, s);
  });
},
visitTopLevelStatement: $puck_6.Visit.visitTopLevelStatement,
visitBlockLevelStatement: function (s) {
  let self = this;
  let $puck_22 = s;
  if ($puck_22.kind === "Expression") {
    let {value: e} = $puck_22;
    visitExpression(self.value, e, self.value.assignedTo, self.value.isUsed);
  }
  else {
    if (true) {
      $puck_22;
      visit.walkBlockLevelStatement(self, s);
    };
  };
},
visitExpression: function (e) {
  let self = this;
  visitExpression(self.value, e, self.value.assignedTo, true);
},
visitEnumDeclaration: $puck_6.Visit.visitEnumDeclaration,
visitEnumMember: $puck_6.Visit.visitEnumMember,
visitImplDeclaration: function (i) {
  let self = this;
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true}, function (f) {
    return $puck_6.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/scope_visitor.puck:ScopeVisitor"].visitFunctionDeclaration.call(self, f);
  });
},
visitImplShorthandDeclaration: function (i) {
  let self = this;
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true}, function (f) {
    return $puck_6.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/scope_visitor.puck:ScopeVisitor"].visitFunctionDeclaration.call(self, f);
  });
},
visitMethodDeclaration: function (f) {
  let self = this;
  $puck_6.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/scope_visitor.puck:ScopeVisitor"].visitFunctionDeclaration.call(self, f);
},
visitTraitDeclaration: function (t) {
  let self = this;
  const parentScope = self.value.scope;
  self.value.scope = $unwrapTraitObject(t.scope);
  visit.walkTraitDeclaration(self, t);
  self.value.scope = parentScope;
},
visitTypeDeclaration: function (t) {},
visitExportDirective: function (e) {
  let self = this;
  visit.walkExportDirective(self, e);
},
visitImportDirective: function (i) {},
visitObjectDestructure: function (i) {},
visitObjectDestructureMember: $puck_6.Visit.visitObjectDestructureMember,
visitBlock: $puck_6.Visit.visitBlock,
visitBreakStatement: $puck_6.Visit.visitBreakStatement,
visitReturnStatement: function (r) {
  let self = this;
  if ($puck_1.Option.isNone.call(self.value.functionContext)) {
    ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ReturnStatement', value: r, $isTraitObject: true}, "Return used outside of a function");
  };
  r.type_ = $puck_18.Type.never({
    file: self.value.file,
    token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ReturnStatement', value: r, $isTraitObject: true},
  });
  const returnType = $puck_1.Option.unwrap.call(self.value.functionContext).returnType;
  visitExpression(self.value, r.expression, returnType);
  let $puck_23 = returnType;
  if ($puck_23 !== undefined) {
    let returnType = $puck_23;
    if ((!$puck_17.isAssignable(returnType, $puck_4.Expression.getType.call(r.expression)))) {
      ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: r.expression, $isTraitObject: true}, $puck_15.notAssignableError(returnType, $puck_4.Expression.getType.call(r.expression)));
    };
  }
  else {
    if ($puck_4.Expression.getType.call(r.expression)) {
      $puck_1.List.push.call($puck_1.Option.unwrap.call(self.value.functionContext).returnTypes, $puck_4.Expression.getType.call(r.expression));
    };
  };
},
visitForLoop: function (e) {
  let self = this;
  const parentScope = self.value.scope;
  self.value.scope = $puck_14.Scope.createChild.call(parentScope);
  e.scope = self.value.scope;
  $puck_6.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/scope_visitor.puck:ScopeVisitor"].visitPattern.call(self, e.pattern);
  visitExpression(self.value, e.expression);
  let $puck_24 = [
    $puck_14.Scope.getBindingByTypeId.call(parentScope, "IntoIterator"),
    $puck_14.Scope.getBindingByTypeId.call(parentScope, "Iterator"),
    $puck_14.Scope.getBindingByTypeId.call(parentScope, "Option"),
  ];
  if (($puck_24[0] !== undefined && $puck_24[1] !== undefined && $puck_24[2] !== undefined)) {
    let [intoIteratorBinding, iteratorBinding, optionBinding] = $puck_24;
    const intoIteratorType = $puck_1.Option.unwrap.call(intoIteratorBinding.type_.providesType);
    const iteratorType = $puck_1.Option.unwrap.call(iteratorBinding.type_.providesType);
    if ((!$puck_17.isAssignable(intoIteratorType, $puck_4.Expression.getType.call(e.expression)))) {
      return ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true}, $puck_15.notAssignableError(intoIteratorType, $puck_4.Expression.getType.call(e.expression)));
    };
    let $puck_25 = $puck_11.getImplementationForTrait($puck_4.Expression.getType.call(e.expression), intoIteratorType);
    if (($puck_25.kind === "Ok" && $puck_25.value !== undefined)) {
      let {value: implementation} = $puck_25;
      const type_ = $puck_1.Option.unwrap.call($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.Option.unwrap.call($puck_1.Result.unwrap.call($puck_11.resolveImplTypeParameters(implementation, $puck_4.Expression.getType.call(e.expression))).instance).typeParameters, $isTraitObject: true}));
      let createIterCall = $puck_4.CallExpression({
        func: $puck_4.Expression.MemberAccess({
        object: $puck_4.Expression.Identifier({
        name: intoIteratorBinding.name,
        span: $puck_5.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true}),
      }),
        dotToken: e.ofKeyword,
        member: {
        name: "iter",
        span: $puck_5.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true}),
      },
      }),
        typeArguments: $puck_1.None,
        openParen: e.ofKeyword,
        argumentList: [e.expression],
        closeParen: e.ofKeyword,
      });
      e.createIterCall = createIterCall;
      let nextCall = $puck_4.CallExpression({
        func: $puck_4.Expression.MemberAccess({
        object: $puck_4.Expression.CallExpression(createIterCall),
        dotToken: e.ofKeyword,
        member: {
        name: "next",
        span: $puck_5.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: e.pattern, $isTraitObject: true}),
      },
      }),
        typeArguments: $puck_1.None,
        openParen: e.ofKeyword,
        argumentList: [],
        closeParen: e.ofKeyword,
      });
      e.nextCall = nextCall;
      $puck_6.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/scope_visitor.puck:ScopeVisitor"].visitCallExpression.call(self, nextCall);
      const optionSome = $puck_4.TypePath._Object({
        name: optionBinding.name,
        span: $puck_5.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: e.pattern, $isTraitObject: true}),
      }, $puck_4.TypePath.Member({
        name: "Some",
        span: $puck_5.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: e.pattern, $isTraitObject: true}),
      }));
      e.optionSome = optionSome;
      $puck_6.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/scope_visitor.puck:ScopeVisitor"].visitTypePath.call(self, optionSome);
      let $puck_26 = $puck_12.declarePatternVariables(self.value.scope, self.value, asMut(e.pattern), type_, false);
      if ($puck_26.kind === "Ok") {
        $puck_26;
      }
      else {
        if (($puck_26.kind === "Err" && $unwrapTraitObject($puck_26.value).kind === "PatternMismatch")) {
          let {value: {value: [pattern, to, subject]}} = $puck_26;
          ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true}, $puck_15.notAssignableError(to, subject));
        }
        else {
          if (($puck_26.kind === "Err" && $unwrapTraitObject($puck_26.value).kind === "ScopeError")) {
            let {value: {value: [token, err]}} = $puck_26;
            ScopeVisitor.reportOtherError.call(self.value, token, err);
          }
          else {
            if (($puck_26.kind === "Err" && $unwrapTraitObject($puck_26.value).kind === "NotExhaustive")) {
              $puck_26;
              ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: e.pattern, $isTraitObject: true}, "non exhaustive pattern");
            };
          };
        };
      };
    }
    else {
      if (($puck_25.kind === "Ok" && $puck_25.value === undefined)) {
        $puck_25;
        ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ForLoop', value: e, $isTraitObject: true}, $puck_18.Type.displayName.call(intoIteratorType) + " has not been implemented for type " + $puck_18.Type.displayName.call($puck_4.Expression.getType.call(e.expression)));
      }
      else {
        if (($puck_25.kind === "Err")) {
          $puck_25;
          ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ForLoop', value: e, $isTraitObject: true}, "Ambiguous trait call");
        };
      };
    };
  }
  else {
    if ($puck_24[0] === undefined) {
      let [, , ] = $puck_24;
      ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ForLoop', value: e, $isTraitObject: true}, "puck:core::IntoIterator is not in scope. Please import IntoIterator from puck:core to use for loops.");
    }
    else {
      if ($puck_24[1] === undefined) {
        let [, , ] = $puck_24;
        ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ForLoop', value: e, $isTraitObject: true}, "puck:core::Iterator is not in scope. Please import Iterator from puck:core to use for loops.");
      }
      else {
        if ($puck_24[2] === undefined) {
          let [, , ] = $puck_24;
          ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ForLoop', value: e, $isTraitObject: true}, "puck:core::Option is not in scope. Please import Option from puck:core to use for loops.");
        };
      };
    };
  };
  visitBlock(self.value, e.body, false);
  e.type_ = $puck_18.Type.empty({
    file: self.value.file,
    token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ForLoop', value: e, $isTraitObject: true},
  });
  self.value.scope = parentScope;
},
visitWhileLoop: function (e) {
  let self = this;
  const parentScope = self.value.scope;
  self.value.scope = $puck_14.Scope.createChild.call(parentScope);
  e.scope = self.value.scope;
  visitExpression(self.value, e.condition);
  visitBlock(self.value, e.body, false);
  e.type_ = $puck_18.Type.empty({
    file: self.value.file,
    token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:WhileLoop', value: e, $isTraitObject: true},
  });
  self.value.scope = parentScope;
},
visitIdentifier: function (i) {
  let self = this;
  i.scope = self.value.scope;
  let $puck_27 = $puck_14.Scope.getBinding.call(self.value.scope, i.name);
  if ($puck_27 !== undefined) {
    let binding = $puck_27;
    i.binding = binding;
    let $puck_28;
    if ((binding.type_ && $puck_1.Option.isSome.call(binding.type_.providesType))) {
      $puck_28 = $puck_16.enumMemberToFunction(binding.type_);
    }
    else {
      $puck_28 = binding.type_;
    };
    i.type_ = $puck_28;
  }
  else {
    ScopeVisitor.reportError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: i, $isTraitObject: true}, $puck_18.CompilationError.UndefinedVariable(i.name));
  };
},
visitFunctionDeclaration: function (f) {
  let self = this;
  visitFunctionDeclaration(self.value, asMut(f), self.value.assignedTo);
  const selfScope = self.value.scope;
  self.value.scope = $unwrapTraitObject(f.scope);
  let $puck_29 = self.value.variableDeclarationScope;
  if ($puck_29 !== undefined) {
    let vdScope = $puck_29;
    let fScope = self.value.scope;
    let bindings = fScope.bindings;
    let $puck_30 = vdScope.parent;
    if ($puck_30 !== undefined) {
      let vdParent = $puck_30;
      while (true) {
        let $puck_31 = fScope.parent;
        if ($puck_31 !== undefined) {
          let fParent = $puck_31;
          if ($puck_1.identical(vdParent, fParent)) {
            break          }
          else {
            bindings = $unwrapTraitObject($puck_2._Object.assign({}, fParent.bindings, bindings));
            fScope = fParent;
          };
        }
        else {
          break        };
      };
    };
    self.value.scope = $puck_14.Scope({
      context: self.value.scope.context,
      parent: $puck_1.Some(vdScope),
      bindings: bindings,
      bindingsByTypeId: self.value.scope.bindingsByTypeId,
    });
  };
  let $puck_32 = f.body;
  if ($puck_32 !== undefined) {
    let body = $puck_32;
    const parentAssignedTo = self.value.assignedTo;
    const parentContext = self.value.functionContext;
    let isUsed = true;
    self.value.functionContext = $puck_1.Some({
      returnType: $puck_1.None,
      returnTypes: [],
    });
    let $puck_33 = f.type_.kind;
    if ($puck_33.kind === "Function") {
      let {value: func} = $puck_33;
      if (func.returnType) {
        self.value.assignedTo = $puck_1.Some(func.returnType);
        $puck_1.Option.unwrap.call(self.value.functionContext).returnType = $puck_1.Some(func.returnType);
        if ($puck_18.Type.isEmpty.call(func.returnType)) {
          isUsed = false;
        };
      };
    };
    visitBlock(self.value, body, isUsed);
    let $puck_34 = f.type_.kind;
    if ($puck_34.kind === "Function") {
      let {value: func} = $puck_34;
      if (func.returnType) {
        if ((!$puck_17.isAssignable(func.returnType, body.type_) && !$puck_18.Type.isEmpty.call(func.returnType))) {
          ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: f, $isTraitObject: true}, $puck_15.notAssignableError(func.returnType, body.type_));
        };
      }
      else {
        let types = $puck_1.Option.unwrap.call(self.value.functionContext).returnTypes;
        if (body.type_) {
          $puck_1.List.push.call(types, body.type_);
        };
        if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isNotEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: types, $isTraitObject: true})) {
          let $puck_35 = $puck_17.findCommonType(types);
          if ($puck_35.kind === "Ok") {
            let {value: type_} = $puck_35;
            $puck_2._Object.assign(func, {returnType: body.type_});
          }
          else {
            if ($puck_35.kind === "Err") {
              $puck_35;
              ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: f, $isTraitObject: true}, "No best common type exists among return expressions. Found " + $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: types, $isTraitObject: true}, function (type_) {
                return $puck_18.Type.displayName.call(type_);
              }).value.join(", "));
            };
          };
        };
      };
    };
    self.value.assignedTo = parentAssignedTo;
    self.value.functionContext = parentContext;
  };
  self.value.scope = selfScope;
},
visitVariableDeclaration: function (d) {
  let self = this;
  visitVariableDeclaration(self.value, asMut(d), $puck_1.None);
},
visitAssignmentExpression: function (e) {
  let self = this;
  e.scope = self.value.scope;
  let $puck_36 = e.lhs;
  if (($puck_36.kind === "IndexAccess")) {
    let {value: a} = $puck_36;
    visit.walkIndexAccess(self, a);
    visitExpression(self.value, e.rhs);
  }
  else {
    visit.walkAssignmentExpression(self, e);
  };
  let $puck_37 = getBinding(e.lhs);
  if ($puck_37 !== undefined) {
    let binding = $puck_37;
    if ((!binding.mutable)) {
      ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:AssignmentExpression', value: e, $isTraitObject: true}, "Can't assign to immutable variable " + binding.name);
    };
    if ((!$puck_17.isAssignable($puck_4.Expression.getType.call(e.lhs), $puck_4.Expression.getType.call(e.rhs)))) {
      ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:AssignmentExpression', value: e, $isTraitObject: true}, $puck_15.notAssignableError($puck_4.Expression.getType.call(e.lhs), $puck_4.Expression.getType.call(e.rhs)));
    };
  };
  e.type_ = ($puck_4.Expression.getType.call(e.lhs) || $puck_4.Expression.getType.call(e.rhs));
},
visitBinaryExpression: function (e) {
  let self = this;
  let $puck_38 = e.operator.kind;
  if ($puck_38.kind === "PlusToken") {
    $puck_38;
    asTraitCall(self.value, asMut(e), "Add", "add", "the addition operator");
  }
  else {
    if ($puck_38.kind === "MinusToken") {
      $puck_38;
      asTraitCall(self.value, asMut(e), "Sub", "sub", "the subtraction operator");
    }
    else {
      if ($puck_38.kind === "AsteriskToken") {
        $puck_38;
        asTraitCall(self.value, asMut(e), "Mul", "mul", "the multiplication operator");
      }
      else {
        if ($puck_38.kind === "SlashToken") {
          $puck_38;
          asTraitCall(self.value, asMut(e), "Div", "div", "the division operator");
        }
        else {
          if ($puck_38.kind === "PercentToken") {
            $puck_38;
            asTraitCall(self.value, asMut(e), "Rem", "rem", "the reminder operator");
          }
          else {
            if ($puck_38.kind === "AsteriskAsteriskToken") {
              $puck_38;
              asTraitCall(self.value, asMut(e), "Mul", "mul", "the power operator");
            }
            else {
              if ($puck_38.kind === "EqualsEqualsToken") {
                $puck_38;
                asTraitCall(self.value, asMut(e), "PartialEq", "eq", "equal operators");
              }
              else {
                if ($puck_38.kind === "ExclamationEqualsToken") {
                  $puck_38;
                  asTraitCall(self.value, asMut(e), "PartialEq", "ne", "equal operators");
                }
                else {
                  if ($puck_38.kind === "LessThanToken") {
                    $puck_38;
                    asTraitCall(self.value, asMut(e), "PartialOrd", "lt", "comparison operators");
                  }
                  else {
                    if ($puck_38.kind === "LessThanEqualsToken") {
                      $puck_38;
                      asTraitCall(self.value, asMut(e), "PartialOrd", "le", "comparison operators");
                    }
                    else {
                      if ($puck_38.kind === "GreaterThanToken") {
                        $puck_38;
                        asTraitCall(self.value, asMut(e), "PartialOrd", "gt", "comparison operators");
                      }
                      else {
                        if ($puck_38.kind === "GreaterThanEqualsToken") {
                          $puck_38;
                          asTraitCall(self.value, asMut(e), "PartialOrd", "ge", "comparison operators");
                        }
                        else {
                          if ($puck_38.kind === "PlusPlusToken") {
                            $puck_38;
                            asTraitCall(self.value, asMut(e), "Concat", "concat", "the concat operator");
                          }
                          else {
                            if (true) {
                              $puck_38;
                              visit.walkBinaryExpression(self, e);
                            };
                          };
                        };
                      };
                    };
                  };
                };
              };
            };
          };
        };
      };
    };
  };
},
visitCallExpression: function (e) {
  let self = this;
  e.scope = self.value.scope;
  let functionType;
  let isUnknownCall = false;
  let skipFirstArgument = false;
  let $puck_39 = e.func;
  if ($puck_39.kind === "MemberAccess") {
    let {value: access} = $puck_39;
    let $puck_40 = visitMemberAccess(self.value, access);
    let $puck_41;
    if ($puck_40.kind === "Ok") {
      $puck_40;
      $puck_41 = $puck_1.None;
    }
    else {
      let $puck_42;
      if ($puck_40.kind === "Err") {
        let {value: error} = $puck_40;
        $puck_42 = $puck_1.Some(error);
      };
      $puck_41 = $puck_42;
    };
    const accessError = $puck_41;
    functionType = $puck_4.Expression.getType.call(e.func);
    if ($puck_4.Expression.getType.call(access.object)) {
      const name = access.member.name;
      const objectType = $puck_4.Expression.getType.call(access.object);
      let $puck_43 = objectType.providesType;
      if ($puck_43 !== undefined) {
        let providesType = $puck_43;
        let $puck_44 = providesType.kind;
        if ($puck_44.kind === "Enum") {
          let {value: enum_} = $puck_44;
          functionType = $puck_1.Option.unwrapOr.call($puck_1.Option.andThen.call($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: enum_.implementations, $isTraitObject: true}, function ({trait_: trait_}) {
            return $puck_18.Type.getTrait.call(trait_).isShorthand;
          }), function ({trait_: trait_}) {
            return $puck_1.ObjectMap.get.call($puck_18.Type.getTrait.call(trait_).functions, name);
          }), $unwrapTraitObject($puck_2._undefined));
        }
        else {
          if ($puck_44.kind === "Struct") {
            let {value: struct} = $puck_44;
            functionType = $puck_1.Option.unwrapOr.call($puck_1.Option.andThen.call($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: struct.implementations, $isTraitObject: true}, function ({trait_: trait_}) {
              return $puck_18.Type.getTrait.call(trait_).isShorthand;
            }), function ({trait_: trait_}) {
              return $puck_1.ObjectMap.get.call($puck_18.Type.getTrait.call(trait_).functions, name);
            }), $unwrapTraitObject($puck_2._undefined));
          }
          else {
            if ($puck_44.kind === "Trait") {
              let {value: trait_} = $puck_44;
              functionType = $puck_1.Option.unwrapOr.call($puck_1.ObjectMap.get.call(trait_.functions, name), $unwrapTraitObject($puck_2._undefined));
            }
            else {
              if (true) {
                $puck_44;
              };
            };
          };
        };
        if (functionType) {
          const _function = $puck_18.Type.getFunction.call(functionType);
          let $puck_45 = _function.selfBinding;
          if ($puck_45 !== undefined) {
            let selfBinding = $puck_45;
            functionType = {
              definition: functionType.definition,
              id: functionType.id,
              displayName: functionType.displayName,
              name: functionType.name,
              kind: $puck_18.TypeKind.Function({
              selfBinding: $puck_1.None,
              parameters: $unwrapTraitObject([selfBinding].concat(_function.parameters)),
              parameterRange: {
              start: _function.parameterRange.start + 1,
              end: _function.parameterRange.end + 1,
            },
              returnType: _function.returnType,
              isAbstract: _function.isAbstract,
            }),
              _class: functionType._class,
              instance: functionType.instance,
              providesType: functionType.providesType,
              enumMember: functionType.enumMember,
            };
            let $puck_46 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true});
            if (($puck_46 !== undefined)) {
              let selfArgument = $puck_46;
              skipFirstArgument = true;
              visitExpression(self.value, selfArgument);
              if ((!$puck_4.Expression.getType.call(selfArgument))) {
                return ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: selfArgument, $isTraitObject: true}, "selfArgument has no type");
              };
              const traitCall = $puck_11.getTraitObjectCall(name, $puck_4.Expression.getType.call(selfArgument), $puck_1.Option.unwrapOr.call(objectType.providesType, objectType), e, functionType);
              let $puck_47 = traitCall;
              if ($puck_47.kind === "TraitObject") {
                let {value: {objectType: objectType}} = $puck_47;
                let $puck_48 = $puck_14.Scope.getBindingByTypeId.call(self.value.scope, $puck_1.Option.unwrap.call(objectType.id));
                if ($puck_48 !== undefined) {
                  let binding = $puck_48;
                  e.traitName = binding.name;
                  e.traitBinding = binding;
                  e.isTraitObject = true;
                  e.isDirectTraitCall = true;
                }
                else {
                  const typeName = $puck_1.Option.unwrap.call(objectType.name);
                  ScopeVisitor.reportError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true}, $puck_18.CompilationError.TraitNotInScope({
                    functionName: name,
                    traitName: typeName,
                    id: $puck_1.Option.unwrap.call(objectType.id),
                  }));
                };
              }
              else {
                if ($puck_47.kind === "TypeObject") {
                  let {value: implementation} = $puck_47;
                  e.traitName = $puck_1.Option.unwrap.call($puck_14.Scope.getBindingByTypeId.call(self.value.scope, $puck_1.Option.unwrap.call(providesType.id))).name;
                  e.traitBinding = $puck_1.Option.unwrap.call($puck_14.Scope.getBindingByTypeId.call(self.value.scope, $puck_1.Option.unwrap.call(providesType.id)));
                  e.isDirectTraitCall = true;
                  e.implementation = implementation;
                  if ($puck_1.Option.isSome.call(providesType._class)) {
                    let $puck_49 = $puck_11.resolveImplTypeParameters($unwrapTraitObject(e.implementation), $puck_4.Expression.getType.call(selfArgument));
                    if ($puck_49.kind === "Ok") {
                      let {value: resolvedTrait} = $puck_49;
                      let parameterMap = $puck_1.Option.unwrap.call(resolvedTrait.instance).parameterMap;
                      functionType = $puck_17.resolveTypeParameters(parameterMap)(functionType);
                    }
                    else {
                      if ($puck_49.kind === "Err") {
                        let {value: [to, subject]} = $puck_49;
                        return ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true}, $puck_15.notAssignableError(to, subject));
                      };
                    };
                  };
                }
                else {
                  if ($puck_47.kind === "None") {
                    $puck_47;
                    ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true}, $puck_18.Type.displayName.call(objectType) + " has not been implemented for type " + $puck_18.Type.displayName.call($puck_4.Expression.getType.call(selfArgument)));
                  }
                  else {
                    if (($puck_47.kind === "Error")) {
                      let {value: [token, message]} = $puck_47;
                      ScopeVisitor.reportOtherError.call(self.value, token, message);
                    };
                  };
                };
              };
            };
          }
          else {
            e.traitName = $puck_1.Option.unwrap.call($puck_14.Scope.getBindingByTypeId.call(self.value.scope, $puck_1.Option.unwrap.call(providesType.id))).name;
            e.traitBinding = $puck_1.Option.unwrap.call($puck_14.Scope.getBindingByTypeId.call(self.value.scope, $puck_1.Option.unwrap.call(providesType.id)));
            e.isTraitObject = true;
          };
        }
        else {
          ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true}, $puck_18.Type.displayName.call(providesType) + " has no function named " + name + "");
        };
      }
      else {
        let $puck_50 = $puck_11.getTraitCall(objectType, name, e);
        if (($puck_50.kind === "TraitObject")) {
          let {value: {objectType: objectType, functionType: func}} = $puck_50;
          functionType = func;
          const _function = $puck_18.Type.getFunction.call(functionType);
          if ($puck_1.Option.isSome.call(_function.selfBinding)) {
            let $puck_51 = $puck_14.Scope.getBindingByTypeId.call(self.value.scope, $puck_1.Option.unwrap.call(objectType.id));
            if ($puck_51 !== undefined) {
              let binding = $puck_51;
              e.traitName = binding.name;
              e.traitBinding = binding;
              e.isTraitObject = true;
            }
            else {
              const typeName = $puck_1.Option.unwrap.call(objectType.name);
              ScopeVisitor.reportError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true}, $puck_18.CompilationError.TraitNotInScope({
                functionName: name,
                traitName: typeName,
                id: $puck_1.Option.unwrap.call(objectType.id),
              }));
            };
          };
        }
        else {
          if ($puck_50.kind === "TypeObject") {
            let {value: implementation} = $puck_50;
            let $puck_52 = implementation.trait_.instance;
            let $puck_53;
            if ($puck_52 !== undefined) {
              let instance = $puck_52;
              $puck_53 = instance._class;
            }
            else {
              $puck_53 = implementation.trait_;
            };
            const trait_ = $puck_53;
            let $puck_54 = $puck_14.Scope.getBindingByTypeId.call(self.value.scope, $puck_1.Option.unwrap.call(trait_.id));
            if ($puck_54 !== undefined) {
              let binding = $puck_54;
              e.traitName = binding.name;
              e.traitBinding = binding;
              e.isShorthand = $puck_18.Type.getTrait.call(trait_).isShorthand;
              e.implementation = implementation;
              functionType = $puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: $puck_18.Type.getTrait.call(implementation.trait_).functions, $isTraitObject: true}, name);
            }
            else {
              const traitName = $puck_1.Option.unwrap.call(trait_.name);
              ScopeVisitor.reportError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true}, $puck_18.CompilationError.TraitNotInScope({
                functionName: name,
                traitName: traitName,
                id: $puck_1.Option.unwrap.call(trait_.id),
              }));
            };
          }
          else {
            if ($puck_50.kind === "None") {
              $puck_50;
            }
            else {
              if ($puck_50.kind === "Error") {
                let {value: [token, message]} = $puck_50;
                ScopeVisitor.reportOtherError.call(self.value, token, message);
              };
            };
          };
        };
        if (e.traitName) {
          let $puck_55 = objectType.instance;
          if ($puck_55 !== undefined) {
            let instance = $puck_55;
            functionType = $puck_17.resolveTypeParameters(instance.parameterMap)(functionType);
          };
        };
      };
    };
    if (e.traitName) {}
    else {
      let $puck_56 = accessError;
      if ($puck_56 !== undefined) {
        let [token, message] = $puck_56;
        ScopeVisitor.reportOtherError.call(self.value, token, message);
      };
    };
  }
  else {
    visitExpression(self.value, e.func);
    functionType = $puck_4.Expression.getType.call(e.func);
    let $puck_57 = e.func;
    if ($puck_57.kind === "UnknownAccess") {
      $puck_57;
      isUnknownCall = true;
    }
    else {
      let $puck_58 = e.func;
      if ($puck_58.kind === "UnknownIndexAccess") {
        $puck_58;
        isUnknownCall = true;
      };
    };
  };
  let $puck_59 = e.typeArguments;
  if ($puck_59 !== undefined) {
    let t = $puck_59;
    const callParameterMap = $puck_1.ObjectMap._new();
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeArguments, $isTraitObject: true}, function (t) {
      return $puck_6.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/scope_visitor.puck:ScopeVisitor"].visitTypeBound.call(self, t);
    });
    if (functionType) {
      let $puck_60 = functionType._class;
      if ($puck_60 !== undefined) {
        let _class = $puck_60;
        if ($puck_1.Range.contains.call(_class.parameterRange, $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeArguments, $isTraitObject: true}))) {
          let $puck_61 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeArguments, $isTraitObject: true}, function (t) {
            return $puck_4.TypeBound.getType.call(t);
          })
;
          functionType = $puck_17.createTypeInstance(functionType, $puck_1.Iterable[$puck_61.type].toList.call($puck_61));
        };
      };
    };
  };
  if ((!isUnknownCall && functionType && $puck_18.Type.isFunction.call(functionType))) {
    const callTypeParameters = $puck_1.Option.unwrapOr.call($puck_1.Option.map.call(functionType._class, function (_class) {
      return _class.typeParameters;
    }), []);
    let callParameterMap = $puck_1.ObjectMap._new();
    let functionKind = $puck_18.Type.getFunction.call(functionType);
    const resolveParameter = $puck_17.resolveTypeParameters(callParameterMap, false);
    let $puck_62 = self.value.assignedTo;
    if ($puck_62 !== undefined) {
      let assignedTo = $puck_62;
      if (functionKind.returnType) {
        $puck_10.resolveFunctionTypeParametersByReturnValue(callParameterMap, callTypeParameters, functionKind.returnType, assignedTo);
      };
    };
    let $puck_64 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true})
;
    let $puck_63 = $puck_1.Iterable[$puck_64.type].take.call($puck_64, $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: functionKind.parameters, $isTraitObject: true}))
;
    $puck_1.Iterable[$puck_63.type].forEach.call($puck_63, function ([i, a]) {
      let parameter = $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: functionKind.parameters, $isTraitObject: true}, i);
      let $puck_65;
      if ((!parameter.type_ || $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: callTypeParameters, $isTraitObject: true}))) {
        $puck_65 = parameter.type_;
      }
      else {
        $puck_65 = resolveParameter(parameter.type_);
      };
      const parameterType = $puck_65;
      if ((!skipFirstArgument || i > 0)) {
        let $puck_66;
        if (parameterType) {
          $puck_66 = $puck_1.Some(parameterType);
        }
        else {
          $puck_66 = $puck_1.None;
        };
        visitExpression(self.value, a, $puck_66);
      };
      if (($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isNotEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: callTypeParameters, $isTraitObject: true}) && parameterType && $puck_4.Expression.getType.call(a))) {
        return $puck_10.resolveFunctionTypeParameters(callParameterMap, callTypeParameters, parameterType, $puck_4.Expression.getType.call(a));
      };
    });
    if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isNotEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: callTypeParameters, $isTraitObject: true})) {
      functionType = $puck_17.resolveTypeParameters(callParameterMap)(functionType);
    };
  }
  else {
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true}, function (a) {
      return visitExpression(self.value, a);
    });
  };
  if (isUnknownCall) {
    e.type_ = functionType;
  }
  else {
    if (functionType) {
      e.functionType = functionType;
      let $puck_67 = $puck_10.checkFunctionCall(functionType, e);
      if ($puck_67.kind === "Ok") {
        let {value: _function} = $puck_67;
        if (_function) {
          e.type_ = _function.returnType;
        };
      }
      else {
        if ($puck_67.kind === "Err") {
          let {value: [token, message]} = $puck_67;
          ScopeVisitor.reportOtherError.call(self.value, token, message);
        };
      };
    };
  };
  undefined;
},
visitIfExpression: function (e) {
  let self = this;
  const parentScope = self.value.scope;
  e.scope = self.value.scope;
  const isUsed = self.value.isUsed;
  visitExpression(self.value, e.condition);
  self.value.scope = $puck_14.Scope.createChild.call(parentScope);
  visitBlock(self.value, e.then_, (isUsed && $puck_1.Option.isSome.call(e.else_)));
  let $puck_68 = e.else_;
  if ($puck_68 !== undefined) {
    let else_ = $puck_68;
    self.value.scope = $puck_14.Scope.createChild.call(parentScope);
    visitBlock(self.value, else_, isUsed);
  };
  if (isUsed) {
    let $puck_69 = e.else_;
    let $puck_70;
    if ($puck_69 !== undefined) {
      let else_ = $puck_69;
      let $puck_71 = $puck_17.findCommonType([
        e.then_.type_,
        else_.type_,
      ]);
      let $puck_72;
      if ($puck_71.kind === "Ok") {
        let {value: type_} = $puck_71;
        $puck_72 = type_;
      }
      else {
        let $puck_73;
        if ($puck_71.kind === "Err") {
          $puck_71;
          ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression', value: e, $isTraitObject: true}, "Type " + $puck_18.Type.displayName.call(e.then_.type_) + " and " + $puck_18.Type.displayName.call(else_.type_) + " is not compatible");
          $puck_73 = $puck_18.Type.empty({
            file: self.value.file,
            token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression', value: e, $isTraitObject: true},
          });
        };
        $puck_72 = $puck_73;
      };
      $puck_70 = $puck_72;
    }
    else {
      $puck_70 = $puck_18.Type.empty({
        file: self.value.file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression', value: e, $isTraitObject: true},
      });
    };
    e.type_ = $puck_70;
  };
  self.value.scope = parentScope;
},
visitIfLetExpression: function (e) {
  let self = this;
  const parentScope = self.value.scope;
  e.scope = self.value.scope;
  self.value.scope = $puck_14.Scope.createChild.call(parentScope);
  const isUsed = self.value.isUsed;
  $puck_6.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/scope_visitor.puck:ScopeVisitor"].visitPattern.call(self, e.pattern);
  visitExpression(self.value, e.expression);
  let $puck_74 = $puck_12.declarePatternVariables(self.value.scope, self.value, asMut(e.pattern), $puck_4.Expression.getType.call(e.expression), true);
  if (($puck_74.kind === "Ok")) {
    $puck_74;
  }
  else {
    if (($puck_74.kind === "Err" && $unwrapTraitObject($puck_74.value).kind === "PatternMismatch")) {
      let {value: {value: [pattern, to, subject]}} = $puck_74;
      ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true}, $puck_15.notAssignableError(to, subject));
    }
    else {
      if (($puck_74.kind === "Err" && $unwrapTraitObject($puck_74.value).kind === "ScopeError")) {
        let {value: {value: [token, err]}} = $puck_74;
        ScopeVisitor.reportOtherError.call(self.value, token, err);
      }
      else {
        if (($puck_74.kind === "Err" && $unwrapTraitObject($puck_74.value).kind === "NotExhaustive")) {
          $puck_74;
        };
      };
    };
  };
  const expressionScope = self.value.scope;
  self.value.scope = $puck_14.Scope.createChild.call(expressionScope);
  visitBlock(self.value, e.then_, isUsed);
  let $puck_75 = e.else_;
  if ($puck_75 !== undefined) {
    let else_ = $puck_75;
    self.value.scope = $puck_14.Scope.createChild.call(expressionScope);
    visitBlock(self.value, else_, isUsed);
  };
  if (isUsed) {
    let $puck_76 = e.else_;
    let $puck_77;
    if ($puck_76 !== undefined) {
      let else_ = $puck_76;
      let $puck_78 = $puck_17.findCommonType([
        e.then_.type_,
        else_.type_,
      ]);
      let $puck_79;
      if ($puck_78.kind === "Ok") {
        let {value: type_} = $puck_78;
        $puck_79 = type_;
      }
      else {
        let $puck_80;
        if ($puck_78.kind === "Err") {
          $puck_78;
          ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression', value: e, $isTraitObject: true}, "Type " + $puck_18.Type.displayName.call(e.then_.type_) + " and " + $puck_18.Type.displayName.call(else_.type_) + " is not compatible");
          $puck_80 = $puck_18.Type.empty({
            file: self.value.file,
            token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression', value: e, $isTraitObject: true},
          });
        };
        $puck_79 = $puck_80;
      };
      $puck_77 = $puck_79;
    }
    else {
      $puck_77 = $puck_18.Type.empty({
        file: self.value.file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression', value: e, $isTraitObject: true},
      });
    };
    e.type_ = $puck_77;
  };
  self.value.scope = parentScope;
},
visitMatchExpression: function (e) {
  let self = this;
  e.scope = self.value.scope;
  const oldMatchExpression = self.value.matchExpression;
  self.value.matchExpression = $puck_1.Some(e);
  const isUsed = self.value.isUsed;
  visitExpression(self.value, e.expression);
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true}, function (a) {
    return $puck_6.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/scope_visitor.puck:ScopeVisitor"].visitMatchArm.call(self, a);
  });
  if ((!$puck_4.Expression.getType.call(e.expression))) {
    return ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true}, "No type in match expression");
  };
  let $puck_81 = $puck_9.checkExhaustive(e);
  if ($puck_81.kind === "Err") {
    let {value: error} = $puck_81;
    ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true}, error);
  };
  if (isUsed) {
    let $puck_82;
    if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isNotEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true})) {
      let $puck_84 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true}, function (arm) {
        return arm.type_;
      })
;
      let $puck_83 = $puck_17.findCommonType($puck_1.Iterable[$puck_84.type].toList.call($puck_84));
      let $puck_85;
      if ($puck_83.kind === "Ok") {
        let {value: type_} = $puck_83;
        $puck_85 = type_;
      }
      else {
        let $puck_86;
        if ($puck_83.kind === "Err") {
          $puck_83;
          ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true}, "Match arms return mixed types " + $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true}, function (arm) {
            return $puck_18.Type.displayName.call(asType($unwrapTraitObject(arm.type_)));
          }).value.join(", "));
          $puck_86 = $puck_18.Type.empty({
            file: self.value.file,
            token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true},
          });
        };
        $puck_85 = $puck_86;
      };
      $puck_82 = $puck_85;
    }
    else {
      $puck_82 = $puck_18.Type.empty({
        file: self.value.file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true},
      });
    };
    e.type_ = $puck_82;
  };
  self.value.matchExpression = oldMatchExpression;
},
visitMatchArm: function (a) {
  let self = this;
  const parentScope = self.value.scope;
  self.value.scope = $puck_14.Scope.createChild.call(parentScope);
  a.scope = self.value.scope;
  const m = $puck_1.Option.unwrap.call(self.value.matchExpression);
  $puck_6.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/scope_visitor.puck:ScopeVisitor"].visitPattern.call(self, a.pattern);
  let $puck_87 = $puck_12.declarePatternVariables(self.value.scope, self.value, asMut(a.pattern), $puck_4.Expression.getType.call(m.expression), true);
  if (($puck_87.kind === "Ok")) {
    $puck_87;
  }
  else {
    if (($puck_87.kind === "Err" && $unwrapTraitObject($puck_87.value).kind === "PatternMismatch")) {
      let {value: {value: [pattern, to, subject]}} = $puck_87;
      ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchArm', value: a, $isTraitObject: true}, $puck_15.notAssignableError(to, subject));
    }
    else {
      if (($puck_87.kind === "Err" && $unwrapTraitObject($puck_87.value).kind === "ScopeError")) {
        let {value: {value: [token, err]}} = $puck_87;
        ScopeVisitor.reportOtherError.call(self.value, token, err);
      }
      else {
        if (($puck_87.kind === "Err" && $unwrapTraitObject($puck_87.value).kind === "NotExhaustive")) {
          $puck_87;
        };
      };
    };
  };
  visitBlock(self.value, a.block, self.value.isUsed);
  a.type_ = a.block.type_;
  self.value.scope = parentScope;
},
visitTypePath: function (t) {
  let self = this;
  $puck_6.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor"].visitTypePath.call({type: '$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor', value: self.value.typeBoundVisitor, $isTraitObject: true}, t);
},
visitTypePathExpression: function (e) {
  let self = this;
  e.scope = self.value.scope;
  const typePath = e.typePath;
  $puck_6.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/scope_visitor.puck:ScopeVisitor"].visitTypePath.call(self, e.typePath);
  let type_ = $unwrapTraitObject(e.typePath.type_);
  if (type_) {
    e.type_ = $puck_16.enumMemberToFunction(type_);
  };
},
visitUnaryExpression: function (e) {
  let self = this;
  e.scope = self.value.scope;
  visit.walkUnaryExpression(self, e);
  let $puck_88 = e.operator.kind;
  if ($puck_88.kind === "NotKeyword") {
    $puck_88;
    let $puck_89 = $puck_14.Scope.getBindingByTypeId.call(self.value.scope, "Bool");
    if ($puck_89 !== undefined) {
      let binding = $puck_89;
      e.type_ = $puck_1.Option.unwrap.call(binding.type_.providesType);
    }
    else {
      ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true}, "puck:core::Bool is not in scope. Please import Bool from puck:core to use boolean literals.");
    };
  }
  else {
    if ($puck_88.kind === "MinusToken") {
      $puck_88;
      let $puck_90 = $puck_14.Scope.getBindingByTypeId.call(self.value.scope, "Num");
      if ($puck_90 !== undefined) {
        let binding = $puck_90;
        e.type_ = $puck_1.Option.unwrap.call(binding.type_.providesType);
      }
      else {
        ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true}, "puck:core::Num is not in scope. Please import Num from puck:core to use number literals.");
      };
    }
    else {
      if ($puck_88.kind === "PlusToken") {
        $puck_88;
        let $puck_91 = $puck_14.Scope.getBindingByTypeId.call(self.value.scope, "Num");
        if ($puck_91 !== undefined) {
          let binding = $puck_91;
          e.type_ = $puck_1.Option.unwrap.call(binding.type_.providesType);
        }
        else {
          ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true}, "puck:core::Num is not in scope. Please import Num from puck:core to use number literals.");
        };
      }
      else {
        if (true) {
          $puck_88;
        };
      };
    };
  };
  undefined;
},
visitIndexAccess: function (a) {
  let self = this;
  let $puck_92 = $puck_19.getCoreType(self.value.scope, "Index", "index access");
  if ($puck_92.kind === "Ok") {
    let {value: [, binding]} = $puck_92;
    let call = $puck_4.CallExpression({
      func: $puck_4.Expression.MemberAccess({
      object: $puck_4.Expression.Identifier({
      name: binding.name,
      span: $puck_5.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: a.object, $isTraitObject: true}),
    }),
      dotToken: a.openBracket,
      member: {
      name: "index",
      span: {
      start: a.openBracket.span.start,
      end: a.closeBracket.span.end,
    },
    },
    }),
      typeArguments: $puck_1.None,
      openParen: a.openBracket,
      argumentList: [
      a.object,
      a.index,
    ],
      closeParen: a.closeBracket,
    });
    $puck_6.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/scope_visitor.puck:ScopeVisitor"].visitCallExpression.call(self, call);
    a.call = call;
    a.type_ = call.type_;
    undefined;
  }
  else {
    if ($puck_92.kind === "Err") {
      let {value: err} = $puck_92;
      ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IndexAccess', value: a, $isTraitObject: true}, err);
    };
  };
},
visitMemberAccess: function (a) {
  let self = this;
  let $puck_93 = visitMemberAccess(self.value, a);
  if ($puck_93.kind === "Err") {
    let {value: [token, message]} = $puck_93;
    ScopeVisitor.reportOtherError.call(self.value, token, message);
  };
},
visitTupleIndexAccess: function (a) {
  let self = this;
  visitExpression(self.value, a.object);
  if ($puck_4.Expression.getType.call(a.object)) {
    let $puck_94 = $puck_19.getIndexedPropertyType($puck_4.Expression.getType.call(a.object), a.index.value);
    if ($puck_94.kind === "Ok") {
      let {value: type_} = $puck_94;
      a.type_ = type_;
    }
    else {
      if (($puck_94.kind === "Err" && $unwrapTraitObject($puck_94.value).kind === "MissingProperty")) {
        $puck_94;
        const message = $puck_18.Type.displayName.call($puck_4.Expression.getType.call(a.object)) + " has no index " + $puck_1.Num.toString.call(a.index.value);
        const token = {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NumberLiteral', value: a.index, $isTraitObject: true};
        ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleIndexAccess', value: a, $isTraitObject: true}, message);
      }
      else {
        if (($puck_94.kind === "Err" && $unwrapTraitObject($puck_94.value).kind === "UnsupportedType")) {
          $puck_94;
          const message = "Can only read indexed properties on tuple types";
          const token = {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NumberLiteral', value: a.index, $isTraitObject: true};
          ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleIndexAccess', value: a, $isTraitObject: true}, message);
        }
        else {
          if (($puck_94.kind === "Err" && $unwrapTraitObject($puck_94.value).kind === "Scope")) {
            let {value: {value: message}} = $puck_94;
            ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleIndexAccess', value: a, $isTraitObject: true}, message);
          };
        };
      };
    };
  };
},
visitUnknownAccess: function (a) {
  let self = this;
  visit.walkExpression(self, a.object);
  let $puck_95 = $puck_19.getCoreType(self.value.scope, "Unknown", "unknown access");
  if ($puck_95.kind === "Ok") {
    let {value: [type_, ]} = $puck_95;
    a.type_ = type_;
  }
  else {
    if ($puck_95.kind === "Err") {
      let {value: err} = $puck_95;
      ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownAccess', value: a, $isTraitObject: true}, err);
    };
  };
  undefined;
},
visitUnknownIndexAccess: function (a) {
  let self = this;
  visit.walkUnknownIndexAccess(self, a);
  let $puck_96 = $puck_19.getCoreType(self.value.scope, "Unknown", "unknown access");
  if ($puck_96.kind === "Ok") {
    let {value: [type_, ]} = $puck_96;
    a.type_ = type_;
  }
  else {
    if ($puck_96.kind === "Err") {
      let {value: err} = $puck_96;
      ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownIndexAccess', value: a, $isTraitObject: true}, err);
    };
  };
  undefined;
},
visitListLiteral: function (l) {
  let self = this;
  let $puck_98 = $puck_14.Scope.getBindingByTypeId.call(self.value.scope, "List");
  let $puck_99;
  if ($puck_98 !== undefined) {
    let binding = $puck_98;
    $puck_99 = $puck_1.Option.unwrap.call(binding.type_.providesType);
  }
  else {
    return ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral', value: l, $isTraitObject: true}, "puck:core::List is not in scope. Please import List from puck:core to use list literals.");
  };
  let listType = $puck_99;
  let type_ = $puck_1.None;
  let $puck_100 = self.value.assignedTo;
  if ($puck_100 !== undefined) {
    let assignedTo = $puck_100;
    let $puck_101 = assignedTo.kind;
    if ($puck_101.kind === "Struct") {
      $puck_101;
      if ($puck_1.Option.unwrapOr.call(assignedTo.id, "") === "List") {
        type_ = $puck_1.Some(assignedTo);
      };
    };
  };
  visit.walkListLiteral(self, l);
  let $puck_102 = type_;
  if ($puck_102 !== undefined) {
    let type_ = $puck_102;
    l.type_ = type_;
  }
  else {
    if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true}) >= 1) {
      let $puck_103 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true}, function (m) {
        return $puck_4.Expression.getType.call(m);
      })
;
      const types = $puck_1.Iterable[$puck_103.type].toList.call($puck_103);
      let $puck_104 = $puck_17.findCommonType(types);
      if ($puck_104.kind === "Ok") {
        let {value: type_} = $puck_104;
        if ((!type_)) {
          l.type_ = listType;
        }
        else {
          l.type_ = $puck_17.createTypeInstance(listType, [type_]);
        };
      }
      else {
        if ($puck_104.kind === "Err") {
          $puck_104;
          ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral', value: l, $isTraitObject: true}, "List contains mixed types");
        };
      };
    }
    else {
      l.type_ = listType;
    };
  };
  undefined;
},
visitBooleanLiteral: function (l) {
  let self = this;
  l.scope = self.value.scope;
  let $puck_97 = $puck_14.Scope.getBindingByTypeId.call(self.value.scope, "Bool");
  if ($puck_97 !== undefined) {
    let binding = $puck_97;
    l.type_ = $puck_1.Option.unwrap.call(binding.type_.providesType);
  }
  else {
    ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BooleanLiteral', value: l, $isTraitObject: true}, "puck:core::Bool is not in scope. Please import Bool from puck:core to use boolean literals.");
  };
  undefined;
},
visitNumberLiteral: function (l) {
  let self = this;
  let $puck_105 = $puck_14.Scope.getBindingByTypeId.call(self.value.scope, "Num");
  if ($puck_105 !== undefined) {
    let binding = $puck_105;
    l.type_ = $puck_1.Option.unwrap.call(binding.type_.providesType);
    undefined;
  }
  else {
    ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NumberLiteral', value: l, $isTraitObject: true}, "puck:core::Num is not in scope. Please import Num from puck:core to use number literals.");
  };
},
visitRangeLiteral: function (l) {
  let self = this;
  visit.walkRangeLiteral(self, l);
  let $puck_106 = $puck_19.getCoreType(self.value.scope, "Range", "range literals");
  if ($puck_106.kind === "Ok") {
    let {value: [, binding]} = $puck_106;
    let call = $puck_4.CallExpression({
      func: $puck_4.Expression.MemberAccess({
      object: $puck_4.Expression.Identifier({
      name: binding.name,
      span: l.dotDotToken.span,
    }),
      dotToken: l.dotDotToken,
      member: {
      name: "new",
      span: l.dotDotToken.span,
    },
    }),
      typeArguments: $puck_1.None,
      openParen: l.dotDotToken,
      argumentList: [
      l.start,
      l.end,
    ],
      closeParen: l.dotDotToken,
    });
    $puck_6.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/scope_visitor.puck:ScopeVisitor"].visitCallExpression.call(self, call);
    l.call = call;
    l.type_ = call.type_;
  }
  else {
    if ($puck_106.kind === "Err") {
      let {value: err} = $puck_106;
      ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RangeLiteral', value: l, $isTraitObject: true}, err);
    };
  };
  undefined;
},
visitRecordLiteral: function (l) {
  let self = this;
  visit.walkRecordLiteral(self, l);
  let properties = $puck_1.ObjectMap._new();
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true}, function (m) {
    let $puck_107 = m;
    if ($puck_107.kind === "Property") {
      let {value: {name: name, value: value}} = $puck_107;
      return $puck_1.ObjectMap.set.call(properties, name.name, {
        type_: $puck_4.Expression.getType.call(value),
        optional: false,
      });
    }
    else {
      if ($puck_107.kind === "Spread") {
        let {value: e} = $puck_107;
        let $puck_108 = $puck_4.Expression.getType.call(e).kind;
        if (($puck_108.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($puck_108.value).kind).kind === "Record")) {
          let {value: {kind: {value: r}}} = $puck_108;
          return $puck_1.ObjectMap.merge.call(properties, r.properties);
        }
        else {
          if (true) {
            let $puck_109 = $puck_108;;
            return $puck_109;
          };
        };
      };
    };
  });
  l.type_ = $puck_18.Type({
    definition: $puck_18.Definition({
    file: self.value.file,
    token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordLiteral', value: l, $isTraitObject: true},
  }),
    id: $puck_1.None,
    displayName: $puck_1.None,
    name: $puck_1.None,
    kind: $puck_18.TypeKind.Struct({
    implementations: [],
    kind: $puck_18.StructKind.Record({properties: properties}),
  }),
    _class: $puck_1.None,
    instance: $puck_1.None,
    providesType: $puck_1.None,
    enumMember: $puck_1.None,
  });
},
visitRecordLiteralMember: function (l) {
  let self = this;
  visit.walkRecordLiteralMember(self, l);
  let $puck_110 = l;
  if ($puck_110.kind === "Spread") {
    let {value: e} = $puck_110;
    let $puck_111 = $puck_4.Expression.getType.call(e).kind;
    if (($puck_111.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($puck_111.value).kind).kind === "Record")) {
      let {value: {}} = $puck_111;
    }
    else {
      if (true) {
        $puck_111;
        ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e, $isTraitObject: true}, "Can only spread record types");
      };
    };
  };
},
visitStringLiteral: function (l) {
  let self = this;
  l.scope = self.value.scope;
  let $puck_112 = $puck_14.Scope.getBindingByTypeId.call(self.value.scope, "String");
  if ($puck_112 !== undefined) {
    let binding = $puck_112;
    l.type_ = $puck_1.Option.unwrap.call(binding.type_.providesType);
  }
  else {
    ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral', value: l, $isTraitObject: true}, "puck:core::String is not in scope. Please import String from puck:core to use string literals.");
  };
  visit.walkStringLiteral(self, l);
},
visitStringLiteralPart: $puck_6.Visit.visitStringLiteralPart,
visitTupleLiteral: function (l) {
  let self = this;
  l.scope = self.value.scope;
  visit.walkTupleLiteral(self, l);
  let $puck_113 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.expressions, $isTraitObject: true}, function (e) {
    return $puck_4.Expression.getType.call(e);
  })
;
  l.type_ = $puck_18.Type({
    definition: $puck_18.Definition({
    file: self.value.file,
    token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleLiteral', value: l, $isTraitObject: true},
  }),
    id: $puck_1.None,
    displayName: $puck_1.None,
    name: $puck_1.None,
    kind: $puck_18.TypeKind.Struct({
    implementations: [],
    kind: $puck_18.StructKind.Tuple({properties: $puck_1.Iterable[$puck_113.type].toList.call($puck_113)}),
  }),
    _class: $puck_1.None,
    instance: $puck_1.None,
    providesType: $puck_1.None,
    enumMember: $puck_1.None,
  });
},
visitPattern: function (p) {
  let self = this;
  p.scope = self.value.scope;
  visit.walkPattern(self, p);
  let $puck_114 = p;
  let $puck_115;
  if ($puck_114.kind === "CatchAll") {
    $puck_114;
    $puck_115 = $puck_18.Type.unused({
      file: self.value.file,
      token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p, $isTraitObject: true},
    });
  }
  else {
    let $puck_116;
    if ($puck_114.kind === "Identifier") {
      let {value: {identifier: identifier}} = $puck_114;
      $puck_116 = $puck_2._undefined;
    }
    else {
      let $puck_117;
      if ($puck_114.kind === "Record") {
        let {value: record} = $puck_114;
        $puck_117 = record.type_;
      }
      else {
        let $puck_118;
        if ($puck_114.kind === "RecordType") {
          let {value: [typePath, record]} = $puck_114;
          const type_ = $unwrapTraitObject(typePath.providesType);
          if ((!$puck_17.isAssignable($unwrapTraitObject(record.type_), type_))) {
            ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p, $isTraitObject: true}, $puck_18.Type.displayName.call(type_) + " is not assignable to pattern " + $puck_4.RecordPattern.displayName.call(record));
          };
          $puck_118 = $puck_1.Option.mapOr.call(type_.enumMember, type_, function ([, enum_]) {
            return enum_;
          });
        }
        else {
          let $puck_119;
          if (($puck_114.kind === "Tuple")) {
            let {value: tuple} = $puck_114;
            $puck_119 = tuple.type_;
          }
          else {
            let $puck_120;
            if ($puck_114.kind === "TupleType") {
              let {value: [typePath, tuple]} = $puck_114;
              const type_ = $unwrapTraitObject(typePath.providesType);
              if ((!$puck_17.isAssignable($unwrapTraitObject(tuple.type_), type_))) {
                ScopeVisitor.reportOtherError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p, $isTraitObject: true}, $puck_18.Type.displayName.call(type_) + " is not assignable to pattern " + $puck_4.TuplePattern.displayName.call(tuple));
              };
              $puck_120 = $puck_1.Option.mapOr.call(type_.enumMember, type_, function ([, enum_]) {
                return enum_;
              });
            }
            else {
              let $puck_121;
              if (($puck_114.kind === "UnitType")) {
                let {value: typePath} = $puck_114;
                $puck_121 = $puck_2._undefined;
              };
              $puck_120 = $puck_121;
            };
            $puck_119 = $puck_120;
          };
          $puck_118 = $puck_119;
        };
        $puck_117 = $puck_118;
      };
      $puck_116 = $puck_117;
    };
    $puck_115 = $puck_116;
  };
  p.type_ = $puck_115;
},
visitIdentifierPattern: $puck_6.Visit.visitIdentifierPattern,
visitRecordPattern: function (p) {
  let self = this;
  p.scope = self.value.scope;
  visit.walkRecordPattern(self, p);
  p.type_ = $puck_18.Type({
    definition: $puck_18.Definition({
    file: self.value.file,
    token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordPattern', value: p, $isTraitObject: true},
  }),
    id: $puck_1.None,
    displayName: $puck_1.None,
    name: $puck_1.None,
    kind: $puck_18.TypeKind.Struct({
    implementations: [],
    kind: $puck_18.StructKind.Record({properties: $puck_1.ObjectMap.fromIter($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: p.properties, $isTraitObject: true}, function (p) {
    const type_ = $unwrapTraitObject(p.pattern.type_);
    return [
      p.property.name,
      {
      type_: type_,
      optional: false,
    },
    ];
  }))}),
  }),
    instance: $puck_1.None,
    _class: $puck_1.None,
    providesType: $puck_1.None,
    enumMember: $puck_1.None,
  });
},
visitTuplePattern: function (p) {
  let self = this;
  p.scope = self.value.scope;
  visit.walkTuplePattern(self, p);
  let $puck_122 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: p.properties, $isTraitObject: true}, function (p) {
    return p.type_;
  })
;
  p.type_ = $puck_18.Type({
    definition: $puck_18.Definition({
    file: self.value.file,
    token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TuplePattern', value: p, $isTraitObject: true},
  }),
    id: $puck_1.None,
    displayName: $puck_1.None,
    name: $puck_1.None,
    kind: $puck_18.TypeKind.Struct({
    implementations: [],
    kind: $puck_18.StructKind.Tuple({properties: $puck_1.Iterable[$puck_122.type].toList.call($puck_122)}),
  }),
    instance: $puck_1.None,
    _class: $puck_1.None,
    providesType: $puck_1.None,
    enumMember: $puck_1.None,
  });
},
visitTypeBound: $puck_6.Visit.visitTypeBound,
visitFunctionTypeBound: function (t) {
  let self = this;
  $puck_6.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor"].visitFunctionTypeBound.call({type: '$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor', value: self.value.typeBoundVisitor, $isTraitObject: true}, t);
},
visitIntersectionTypeBound: function (t) {
  let self = this;
  $puck_6.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor"].visitIntersectionTypeBound.call({type: '$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor', value: self.value.typeBoundVisitor, $isTraitObject: true}, t);
},
visitNamedTypeBound: function (t) {
  let self = this;
  $puck_6.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor"].visitNamedTypeBound.call({type: '$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor', value: self.value.typeBoundVisitor, $isTraitObject: true}, t);
},
visitRecordTypeBound: function (t) {
  let self = this;
  $puck_6.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor"].visitRecordTypeBound.call({type: '$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor', value: self.value.typeBoundVisitor, $isTraitObject: true}, t);
},
visitRecordTypeBoundMember: $puck_6.Visit.visitRecordTypeBoundMember,
visitTupleTypeBound: function (t) {
  let self = this;
  $puck_6.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor"].visitTupleTypeBound.call({type: '$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor', value: self.value.typeBoundVisitor, $isTraitObject: true}, t);
},
visitTypeParameter: function (t) {
  let self = this;
  $puck_6.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor"].visitTypeParameter.call({type: '$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor', value: self.value.typeBoundVisitor, $isTraitObject: true}, t);
},
visitTypeParameterBound: $puck_6.Visit.visitTypeParameterBound,
visitWhereClause: $puck_6.Visit.visitWhereClause
};
ScopeVisitor._new = function (context, file) {
  let scopeVisitor = {
    file: file,
    context: context,
    scope: $puck_14.Scope._new(context),
    variableDeclarationScope: $puck_1.None,
    matchExpression: $puck_1.None,
    assignedTo: $puck_1.None,
    isUsed: false,
    functionContext: $puck_1.None,
    typeBoundVisitor: {
    getScope: function () {
    return $unwrapTraitObject(scopeVisitor).scope;
  },
    setScope: function (scope) {
    return $unwrapTraitObject(scopeVisitor).scope = scope;
  },
    file: file,
    reportError: function (token, error) {
    return $puck_8.CompilerContext.reportError.call(context, file, token, error);
  },
    visitorName: "ScopeVisitor",
  },
  };
  return scopeVisitor;
};
ScopeVisitor.reportError = function (token, error) {
  let self = this;
  $puck_8.CompilerContext.reportError.call(self.context, self.file, token, error);
};
ScopeVisitor.reportOtherError = function (token, error) {
  let self = this;
  $puck_8.CompilerContext.reportError.call(self.context, self.file, token, $puck_18.CompilationError.Other(error));
};
function asMut(i) {
  return i;
};
function asType(a) {
  return $unwrapTraitObject(a);
};
function getBinding(e) {
  let $puck_123 = e;
  if ($puck_123.kind === "Identifier") {
    let {value: i} = $puck_123;
    const scope = $unwrapTraitObject(i.scope);
    if ((!scope)) {
      $puck_2.console.error("no scope for", i);
      return $puck_1.None;
    };
    return $puck_14.Scope.getBinding.call(scope, i.name);
  }
  else {
    if ($puck_123.kind === "IndexAccess") {
      let {value: i} = $puck_123;
      return getBinding(i.object);
    }
    else {
      if ($puck_123.kind === "MemberAccess") {
        let {value: i} = $puck_123;
        return getBinding(i.object);
      }
      else {
        if (true) {
          $puck_123;
          return $puck_1.None;
        };
      };
    };
  };
};
exports.getBinding = getBinding;
function asTraitCall(visitor, e, trait_, method, desription) {
  let $puck_124 = $puck_19.getCoreType(visitor.scope, trait_, desription);
  if ($puck_124.kind === "Ok") {
    let {value: [, binding]} = $puck_124;
    let call = $puck_4.CallExpression({
      func: $puck_4.Expression.MemberAccess({
      object: $puck_4.Expression.Identifier({
      name: binding.name,
      span: e.operator.span,
    }),
      dotToken: e.operator,
      member: {
      name: method,
      span: {
      start: e.operator.span.start,
      end: e.operator.span.end,
    },
    },
    }),
      typeArguments: $puck_1.None,
      openParen: e.operator,
      argumentList: [
      e.lhs,
      e.rhs,
    ],
      closeParen: e.operator,
    });
    $puck_6.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/scope_visitor.puck:ScopeVisitor"].visitCallExpression.call({type: '$impl_lib/ast/visit.puck:Visit$lib/typeck/scope_visitor.puck:ScopeVisitor', value: visitor, $isTraitObject: true}, call);
    e.call = call;
    e.type_ = call.type_;
    return $puck_1.Ok(undefined);
  }
  else {
    if ($puck_124.kind === "Err") {
      let {value: err} = $puck_124;
      return $puck_1.Result.Err(err);
    };
  };
};
function visitExpression(visitor, e, assignedTo = $puck_1.None, isUsed = true) {
  const parentAssignedTo = visitor.assignedTo;
  const parentIsUsed = visitor.isUsed;
  visitor.assignedTo = assignedTo;
  visitor.isUsed = isUsed;
  visit.walkExpression({type: '$impl_lib/ast/visit.puck:Visit$lib/typeck/scope_visitor.puck:ScopeVisitor', value: visitor, $isTraitObject: true}, e);
  visitor.assignedTo = parentAssignedTo;
  visitor.isUsed = parentIsUsed;
};
function visitBlock(visitor, b, isUsed = true) {
  b.scope = visitor.scope;
  const assignedTo = visitor.assignedTo;
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true}, function (s) {
    let $puck_125 = s;
    if (($puck_125.kind === "Expression" && $unwrapTraitObject($puck_125.value).kind === "FunctionDeclaration")) {
      let {value: {value: f}} = $puck_125;
      return visitFunctionDeclaration(visitor, f);
    }
    else {
      if (true) {
        let $puck_126 = $puck_125;;
        return $puck_126;
      };
    };
  });
  const lastIndex = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true}) - 1;
  let $puck_127 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true})
;
  $puck_1.Iterable[$puck_127.type].forEach.call($puck_127, function ([index, s]) {
    if ((index === lastIndex)) {
      visitor.assignedTo = assignedTo;
      visitor.isUsed = isUsed;
      return $puck_6.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/scope_visitor.puck:ScopeVisitor"].visitBlockLevelStatement.call({type: '$impl_lib/ast/visit.puck:Visit$lib/typeck/scope_visitor.puck:ScopeVisitor', value: visitor, $isTraitObject: true}, s);
    }
    else {
      visitor.assignedTo = $puck_1.None;
      visitor.isUsed = false;
      return $puck_6.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/scope_visitor.puck:ScopeVisitor"].visitBlockLevelStatement.call({type: '$impl_lib/ast/visit.puck:Visit$lib/typeck/scope_visitor.puck:ScopeVisitor', value: visitor, $isTraitObject: true}, s);
    };
  });
  let $puck_128 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].last.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true});
  let $puck_129;
  if ($puck_128 !== undefined) {
    let last = $puck_128;
    $puck_129 = $puck_4.BlockLevelStatement.getType.call(last);
  }
  else {
    $puck_129 = $puck_18.Type.empty({
      file: visitor.file,
      token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: b, $isTraitObject: true},
    });
  };
  b.type_ = $puck_129;
  visitor.assignedTo = assignedTo;
  visitor.isUsed = isUsed;
};
function visitFunctionDeclaration(visitor, f, assignedTo = $puck_1.None) {
  assignedTo = $puck_1.Option.andThen.call(assignedTo, function (assignedTo) {
    let $puck_130 = assignedTo.kind;
    if ($puck_130.kind === "Function") {
      let {value: func} = $puck_130;
      return $puck_1.Some(func);
    }
    else {
      if (true) {
        $puck_130;
        return $puck_1.None;
      };
    };
  });
  if ((!f.type_)) {
    let parentScope = visitor.scope;
    visitor.scope = $puck_14.Scope.createChild.call(parentScope);
    f.scope = visitor.scope;
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.typeParameters, $isTraitObject: true}, function (p) {
      return $puck_6.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/scope_visitor.puck:ScopeVisitor"].visitTypeParameter.call({type: '$impl_lib/ast/visit.puck:Visit$lib/typeck/scope_visitor.puck:ScopeVisitor', value: visitor, $isTraitObject: true}, p);
    });
    let $puck_131 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true})
;
    $puck_1.Iterable[$puck_131.type].forEach.call($puck_131, function ([i, p]) {
      const parameterType = $puck_1.Option.andThen.call(assignedTo, function (assignedTo) {
        if (($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: assignedTo.parameters, $isTraitObject: true}) > i && assignedTo.parameters[i].type_)) {
          return $puck_1.Some($unwrapTraitObject(assignedTo.parameters[i].type_));
        }
        else {
          return $puck_1.None;
        };
      });
      return visitVariableDeclaration(visitor, p, parameterType);
    });
    $puck_1.Option.map.call(f.returnType, function (returnType) {
      return $puck_6.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/scope_visitor.puck:ScopeVisitor"].visitTypeBound.call({type: '$impl_lib/ast/visit.puck:Visit$lib/typeck/scope_visitor.puck:ScopeVisitor', value: visitor, $isTraitObject: true}, returnType);
    });
    f.type_ = $puck_10.createFunctionType(visitor.file, $unwrapTraitObject(f.scope), f, function (token, message) {
      return ScopeVisitor.reportOtherError.call(visitor, token, message);
    });
    let $puck_132 = f.name;
    if ($puck_132 !== undefined) {
      let name = $puck_132;
      let $puck_133 = $puck_14.Scope.define.call(parentScope, {
        definition: $puck_18.Definition({
        file: visitor.file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: f, $isTraitObject: true},
      }),
        name: name.name,
        allowRedeclare: false,
        mutable: false,
        type_: f.type_,
        previous: $puck_1.None,
        completeType: $puck_1.None,
      });
      if ($puck_133.kind === "Err") {
        let {value: err} = $puck_133;
        ScopeVisitor.reportOtherError.call(visitor, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: name, $isTraitObject: true}, err);
      };
    };
    visitor.scope = parentScope;
  }
  else {
    const parentScope = visitor.scope;
    visitor.scope = $unwrapTraitObject(f.scope);
    let $puck_134 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: f.parameterList, $isTraitObject: true})
;
    $puck_1.Iterable[$puck_134.type].forEach.call($puck_134, function ([i, p]) {
      const parameterType = $puck_1.Option.andThen.call(assignedTo, function (assignedTo) {
        if (($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: assignedTo.parameters, $isTraitObject: true}) > i && assignedTo.parameters[i].type_)) {
          return $puck_1.Some($unwrapTraitObject(assignedTo.parameters[i].type_));
        }
        else {
          return $puck_1.None;
        };
      });
      return visitVariableDeclaration(visitor, p, parameterType);
    });
    visitor.scope = parentScope;
  };
};
function visitVariableDeclaration(visitor, d, assignedTo) {
  if (d.scope) {
    return undefined;
  };
  d.scope = visitor.scope;
  $puck_6.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/scope_visitor.puck:ScopeVisitor"].visitPattern.call({type: '$impl_lib/ast/visit.puck:Visit$lib/typeck/scope_visitor.puck:ScopeVisitor', value: visitor, $isTraitObject: true}, d.pattern);
  const type_ = $puck_1.Option.unwrapOr.call($puck_1.Option.orValue.call($puck_1.Option.andThen.call(d.typeBound, function (bound) {
    $puck_6.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/scope_visitor.puck:ScopeVisitor"].visitTypeBound.call({type: '$impl_lib/ast/visit.puck:Visit$lib/typeck/scope_visitor.puck:ScopeVisitor', value: visitor, $isTraitObject: true}, bound);
    if ($puck_4.TypeBound.getType.call(bound)) {
      return $puck_1.Some($puck_4.TypeBound.getType.call(bound));
    }
    else {
      return $puck_1.None;
    };
  }), assignedTo), $unwrapTraitObject($puck_2._undefined));
  d.type_ = type_;
  if ((!$puck_17.isAssignable($unwrapTraitObject(d.pattern.type_), type_))) {
    return ScopeVisitor.reportOtherError.call(visitor, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: d.pattern, $isTraitObject: true}, $puck_18.Type.displayName.call(type_) + " is not assignable to pattern " + $puck_4.Pattern.displayName.call(d.pattern));
  };
  let $puck_135;
  if ($puck_1.Option.isSome.call(d.initializer)) {
    $puck_135 = $puck_14.Scope.createChild.call(visitor.scope);
  }
  else {
    $puck_135 = visitor.scope;
  };
  let childScope = $puck_135;
  let $puck_136 = $puck_12.declarePatternVariables(childScope, visitor, d.pattern, type_, false, $puck_1.Option.isSome.call(d.initializer));
  if (($puck_136.kind === "Ok")) {
    $puck_136;
  }
  else {
    if (($puck_136.kind === "Err" && $unwrapTraitObject($puck_136.value).kind === "PatternMismatch")) {
      let {value: {value: [, to, subject]}} = $puck_136;
      ScopeVisitor.reportOtherError.call(visitor, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: d, $isTraitObject: true}, $puck_15.notAssignableError(to, subject));
    }
    else {
      if (($puck_136.kind === "Err" && $unwrapTraitObject($puck_136.value).kind === "NotExhaustive")) {
        $puck_136;
        ScopeVisitor.reportOtherError.call(visitor, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: d, $isTraitObject: true}, "non exhaustive pattern");
      }
      else {
        if (($puck_136.kind === "Err" && $unwrapTraitObject($puck_136.value).kind === "ScopeError")) {
          let {value: {value: [token, err]}} = $puck_136;
          ScopeVisitor.reportOtherError.call(visitor, token, err);
        };
      };
    };
  };
  let $puck_137 = d.initializer;
  if ($puck_137 !== undefined) {
    let initializer = $puck_137;
    const parentVariableDeclarationScope = visitor.variableDeclarationScope;
    visitor.variableDeclarationScope = $puck_1.Some(childScope);
    let $puck_138;
    if (type_) {
      $puck_138 = $puck_1.Some(type_);
    }
    else {
      $puck_138 = $puck_2._undefined;
    };
    visitExpression(visitor, initializer, $puck_138, true);
    $puck_14.Scope.merge.call(visitor.scope, childScope);
    visitor.variableDeclarationScope = parentVariableDeclarationScope;
    const initializerType = $puck_4.Expression.getType.call(initializer);
    if ((!d.type_ && d.pattern.binding)) {
      d.pattern.binding.type_ = initializerType;
      d.type_ = initializerType;
    }
    else {
      if (!$puck_17.isAssignable(type_, initializerType)) {
        return ScopeVisitor.reportOtherError.call(visitor, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: initializer, $isTraitObject: true}, $puck_15.notAssignableError(type_, initializerType));
      };
    };
    if (!$puck_17.isAssignable($unwrapTraitObject(d.pattern.type_), initializerType)) {
      return ScopeVisitor.reportOtherError.call(visitor, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:VariableDeclaration', value: d, $isTraitObject: true}, $puck_15.notAssignableError($unwrapTraitObject(d.pattern.type_), initializerType));
    };
  };
};
function visitMemberAccess(visitor, a) {
  visitExpression(visitor, a.object);
  if ($puck_4.Expression.getType.call(a.object)) {
    let $puck_139 = $puck_19.getNamedPropertyType(visitor.scope, $puck_4.Expression.getType.call(a.object), a.member.name);
    if ($puck_139.kind === "Ok") {
      let {value: type_} = $puck_139;
      a.type_ = type_;
      return $puck_1.Result.Ok(undefined);
    }
    else {
      if (($puck_139.kind === "Err" && $unwrapTraitObject($puck_139.value).kind === "MissingProperty")) {
        $puck_139;
        const span = {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: a.member, $isTraitObject: true};
        return $puck_1.Result.Err([
          span,
          $puck_18.Type.displayName.call($puck_4.Expression.getType.call(a.object)) + " has no property " + a.member.name,
        ]);
      }
      else {
        if (($puck_139.kind === "Err" && $unwrapTraitObject($puck_139.value).kind === "UnsupportedType")) {
          $puck_139;
          return $puck_1.Result.Err([
            {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MemberAccess', value: a, $isTraitObject: true},
            "Can only read properties on record types",
          ]);
        }
        else {
          if (($puck_139.kind === "Err" && $unwrapTraitObject($puck_139.value).kind === "Scope")) {
            let {value: {value: message}} = $puck_139;
            return $puck_1.Result.Err([
              {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MemberAccess', value: a, $isTraitObject: true},
              message,
            ]);
          };
        };
      };
    };
  }
  else {
    return $puck_1.Result.Ok(undefined);
  };
}
