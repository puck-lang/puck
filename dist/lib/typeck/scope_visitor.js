'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.ScopeVisitor = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const core = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("util");
const $puck_4 = require("./../ast/ast");
const $puck_5 = require("./../ast/span");
const $puck_6 = require("./../compiler");
const $puck_7 = require("./../ast/token");
const visit = require("./../ast/visit");
const $puck_8 = require("./src/enums");
const $puck_9 = require("./src/functions");
const $puck_10 = require("./src/impls");
const $puck_11 = require("./src/patterns");
const $puck_12 = require("./src/range");
const $puck_13 = require("./src/scope");
const $puck_14 = require("./src/structure_visitor");
const $puck_15 = require("./src/type_function");
const $puck_16 = require("./src/types");
const $puck_17 = require("./../entities");
const $puck_18 = require("./src/core_type_helpers");
function asType(a) {
  return $unwrapTraitObject(a);
};
function getBinding(e) {
  let $puck_19 = e;
  if ($puck_19.kind === "Identifier") {
    let {value: i} = $puck_19;
    const scope = $unwrapTraitObject(i.scope);
    return $puck_13.Scope.getBinding.call(scope, i.name);
  }
  else {
    if ($puck_19.kind === "IndexAccess") {
      let {value: i} = $puck_19;
      return getBinding(i.object);
    }
    else {
      if ($puck_19.kind === "MemberAccess") {
        let {value: i} = $puck_19;
        return getBinding(i.object);
      }
      else {
        if (true) {
          $puck_19;
          return $puck_1.None;
        };
      };
    };
  };
};
function asTraitCall(visitor, e, trait_, method, desription) {
  let $puck_20 = $puck_18.getCoreType($unwrapTraitObject(visitor).scope, trait_, desription);
  if ($puck_20.kind === "Ok") {
    let {value: [, binding]} = $puck_20;
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
    $unwrapTraitObject(visitor).visitCallExpression(call);
    e.call = call;
    e.type_ = call.type_;
    return $puck_1.Ok(undefined);
  }
  else {
    if ($puck_20.kind === "Err") {
      let {value: err} = $puck_20;
      return $puck_1.Err(err);
    };
  };
};
function ScopeVisitor(context, file) {
  let importDirective;
  let matchExpression = $puck_1.None;
  let accessError = $puck_1.None;
  function reportError(token, message) {
    return $puck_6.CompilerContext.reportError.call(context, file, token, $puck_17.CompilationError.Other(message));
  };
  function checkFunctionCall(functionType, c) {
    if ((!functionType)) {
      return $puck_2._undefined;
    };
    let $puck_21 = c.func;
    let $puck_22;
    if ($puck_21.kind === "Identifier") {
      let {value: i} = $puck_21;
      $puck_22 = $puck_1.Some(i.name);
    }
    else {
      let $puck_23;
      if (true) {
        $puck_21;
        $puck_23 = $puck_1.None;
      };
      $puck_22 = $puck_23;
    };
    const namei = $puck_22;
    const name = $puck_1.Option.unwrapOrElse.call(namei, function () {
      return $puck_17.Type.displayName.call(functionType);
    });
    let $puck_24 = functionType.kind;
    let $puck_25;
    if ($puck_24.kind === "Function") {
      let {value: func} = $puck_24;
      $puck_25 = func;
    }
    else {
      let $puck_26;
      if (true) {
        $puck_24;
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: c, $isTraitObject: true}, "" + name + " is not callable");
        return $puck_2._undefined;
      };
      $puck_25 = $puck_26;
    };
    const _function = $puck_25;
    let $puck_27 = _function.selfBinding;
    if ($puck_27 !== undefined) {
      let selfBinding = $puck_27;
      if (selfBinding.mutable) {
        if ((!$puck_1.Option.mapOr.call(getBinding(c.func), true, function (binding) {
          return binding.mutable;
        }))) {
          reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: c, $isTraitObject: true}, "" + name + " can only be called on a mutable binding");
        };
      };
    };
    let $puck_28 = $puck_12.checkRange(c.argumentList, _function.parameterRange, "arguments", name);
    if ($puck_28.kind === "Err") {
      let {value: error} = $puck_28;
      reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: c, $isTraitObject: true}, error);
      return _function;
    };
    let $puck_29 = c.typeArguments;
    if ($puck_29 !== undefined) {
      let t = $puck_29;
      let $puck_30 = $puck_1.Option.orValue.call($puck_1.Option.andThen.call(functionType.instance, function (i) {
        return i._class._class;
      }), functionType._class);
      if ($puck_30 !== undefined) {
        let _class = $puck_30;
        let $puck_31 = $puck_12.checkRange(t.typeArguments, _class.parameterRange, "type parameters", $puck_17.Type.displayName.call(functionType));
        if ($puck_31.kind === "Err") {
          let {value: error} = $puck_31;
          reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeArguments', value: t, $isTraitObject: true}, error);
        };
      }
      else {
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeArguments', value: t, $isTraitObject: true}, "Type " + $puck_17.Type.displayName.call(functionType) + " is not generic");
      };
    };
    let $puck_32 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: c.argumentList, $isTraitObject: true})
;
    $puck_1.Iterable[$puck_32.type].forEach.call($puck_32, function ([i, argument]) {
      const parameter = $puck_1.Option.unwrap.call($puck_1.List.get.call(_function.parameters, i));
      const parameterName = parameter.name;
      if ((!$puck_16.isAssignable(parameter.type_, $puck_4.Expression.getType.call(argument)))) {
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: argument, $isTraitObject: true}, $puck_14.notAssignableError(parameter.type_, $puck_4.Expression.getType.call(argument)) + " in parameter " + parameterName + " of function " + name + "");
      };
      if (parameter.mutable) {
        let $puck_33 = getBinding(argument);
        if (($puck_33 !== undefined)) {
          let argumentBinding = $puck_33;
          const argumentName = argumentBinding.name;
          if ((!argumentBinding.mutable)) {
            return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: argument, $isTraitObject: true}, "Parameter " + parameterName + " of function " + name + " requires a mutable binding " + "but " + argumentName + " is declared as immutable.");
          };
        };
      };
    });
    return _function;
  };
  const structureVisitorInstance = $puck_14.structureVisitor(context, file);
  return $puck_2._Object.assign({}, visit.walkingVisitor, structureVisitorInstance, {
    reportError: reportError,
    visitModule: function (m) {
    let self = this;
    $unwrapTraitObject(self).scope = m.scope;
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: m.statements, $isTraitObject: true}, function (s) {
      let $puck_34 = s;
      if (($puck_34.kind === "ExportDirective" && $unwrapTraitObject($unwrapTraitObject($puck_34.value).statement).kind === "FunctionDeclaration")) {
        let {value: {statement: {value: f}}} = $puck_34;
        return $unwrapTraitObject(self).visitFunctionDeclaration(f, true);
      }
      else {
        if (($puck_34.kind === "BlockLevelStatement" && ($unwrapTraitObject($puck_34.value).kind === "Expression" && $unwrapTraitObject($unwrapTraitObject($puck_34.value).value).kind === "FunctionDeclaration"))) {
          let {value: {value: {value: f}}} = $puck_34;
          return $unwrapTraitObject(self).visitFunctionDeclaration(f, true);
        }
        else {
          if (true) {
            let $puck_35 = $puck_34;;
            return $puck_35;
          };
        };
      };
    });
    return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: m.statements, $isTraitObject: true}, function (s) {
      $unwrapTraitObject(self).isUsed = false;
      return $unwrapTraitObject(self).visitTopLevelStatement(s);
    });
  },
    visitBlockLevelStatement: function (s, assignedTo = $puck_2._undefined, isUsed = true) {
    let self = this;
    let $puck_36 = s;
    if ($puck_36.kind === "Expression") {
      let {value: e} = $puck_36;
      return $unwrapTraitObject(self).visitExpression(e, assignedTo, isUsed);
    }
    else {
      if (true) {
        $puck_36;
        return visit.walkBlockLevelStatement(self, s);
      };
    };
  },
    visitExpression: function (e, assignedTo = $puck_2._undefined, isUsed = true) {
    let self = this;
    $unwrapTraitObject(self).isUsed = isUsed;
    const parentAssignedTo = $unwrapTraitObject(self).assignedTo;
    $unwrapTraitObject(self).assignedTo = assignedTo;
    visit.walkExpression(self, e);
    return $unwrapTraitObject(self).assignedTo = parentAssignedTo;
  },
    visitImplDeclaration: function (i) {
    const self = this;
    return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true}, function (f) {
      return $unwrapTraitObject(self).visitFunctionDeclaration(f);
    });
  },
    visitImplShorthandDeclaration: function (i) {
    const self = this;
    return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true}, function (f) {
      return $unwrapTraitObject(self).visitFunctionDeclaration(f);
    });
  },
    visitTraitDeclaration: function (t) {
    let self = this;
    const parentScope = $unwrapTraitObject(self).scope;
    $unwrapTraitObject(self).scope = t.scope;
    visit.walkTraitDeclaration(self, t);
    return $unwrapTraitObject(self).scope = parentScope;
  },
    visitTypeDeclaration: function (t) {},
    visitExportDirective: function (e) {
    const self = this;
    return visit.walkExportDirective(self, e);
  },
    visitImportDirective: function (i) {},
    visitObjectDestructure: function (i) {},
    visitBlock: function (b, isUsed = true) {
    let self = this;
    b.scope = $unwrapTraitObject(self).scope;
    const assignedTo = $unwrapTraitObject(self).assignedTo;
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true}, function (s) {
      let $puck_37 = s;
      if (($puck_37.kind === "Expression" && $unwrapTraitObject($puck_37.value).kind === "FunctionDeclaration")) {
        let {value: {value: f}} = $puck_37;
        return $unwrapTraitObject(self).visitFunctionDeclaration(f, true);
      }
      else {
        if (true) {
          let $puck_38 = $puck_37;;
          return $puck_38;
        };
      };
    });
    const lastIndex = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true}) - 1;
    let $puck_39 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true})
;
    $puck_1.Iterable[$puck_39.type].forEach.call($puck_39, function ([index, s]) {
      if ((index === lastIndex)) {
        return $unwrapTraitObject(self).visitBlockLevelStatement(s, assignedTo, isUsed);
      }
      else {
        return $unwrapTraitObject(self).visitBlockLevelStatement(s, $puck_2._undefined, false);
      };
    });
    let $puck_40 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].last.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true});
    let $puck_41;
    if ($puck_40 !== undefined) {
      let last = $puck_40;
      $puck_41 = $puck_4.BlockLevelStatement.getType.call(last);
    }
    else {
      $puck_41 = $puck_17.Type.empty({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: b, $isTraitObject: true},
      });
    };
    return b.type_ = $puck_41;
  },
    visitBreak: function (b) {
    const self = this;
    return b.scope = $unwrapTraitObject(self).scope;
  },
    visitReturn: function (r) {
    let self = this;
    visit.walkReturnStatement(self, r);
    let $puck_42 = $unwrapTraitObject($unwrapTraitObject(self).functionContext).returnType;
    if ($puck_42 !== undefined) {
      let returnType = $puck_42;
      if ((!$puck_16.isAssignable($unwrapTraitObject(returnType), $puck_4.Expression.getType.call(r.expression)))) {
        return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: r.expression, $isTraitObject: true}, $puck_14.notAssignableError($unwrapTraitObject(returnType), $puck_4.Expression.getType.call(r.expression)));
      };
    }
    else {
      if ($puck_4.Expression.getType.call(r.expression)) {
        return $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(self).functionContext).returnTypes).push($puck_4.Expression.getType.call(r.expression));
      };
    };
  },
    visitForLoop: function (e) {
    let self = this;
    const parentScope = $unwrapTraitObject(self).scope;
    $unwrapTraitObject(self).scope = $puck_13.Scope.createChild.call(parentScope);
    e.scope = $unwrapTraitObject(self).scope;
    $unwrapTraitObject(self).visitPattern(e.pattern);
    $unwrapTraitObject(self).visitExpression(e.expression);
    let $puck_43 = $puck_13.Scope.getBindingByTypeId.call(parentScope, "IntoIterator");
    if ($puck_43 !== undefined) {
      let intoIteratorBinding = $puck_43;
      let $puck_44 = $puck_13.Scope.getBindingByTypeId.call(parentScope, "Iterator");
      if ($puck_44 !== undefined) {
        let iteratorBinding = $puck_44;
        let $puck_45 = $puck_13.Scope.getBindingByTypeId.call(parentScope, "Option");
        if ($puck_45 !== undefined) {
          let optionBinding = $puck_45;
          const intoIteratorType = $puck_1.Option.unwrap.call(intoIteratorBinding.type_.providesType);
          const iteratorType = $puck_1.Option.unwrap.call(iteratorBinding.type_.providesType);
          if ((!$puck_16.isAssignable(intoIteratorType, $puck_4.Expression.getType.call(e.expression)))) {
            reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true}, $puck_14.notAssignableError(intoIteratorType, $puck_4.Expression.getType.call(e.expression)));
          };
          let $puck_46 = $puck_10.getImplementationForTrait($puck_4.Expression.getType.call(e.expression), intoIteratorType);
          if (($puck_46.kind === "Ok" && $puck_46.value !== undefined)) {
            let {value: implementation} = $puck_46;
            const type_ = $puck_1.Option.unwrap.call($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.Option.unwrap.call($puck_1.Result.unwrap.call($puck_10.resolveImplTypeParameters(implementation, $puck_4.Expression.getType.call(e.expression))).instance).typeParameters, $isTraitObject: true}));
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
            $unwrapTraitObject(self).visitCallExpression(nextCall);
            const optionSome = $puck_4.TypePath._Object({
              name: optionBinding.name,
              span: $puck_5.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: e.pattern, $isTraitObject: true}),
            }, $puck_4.TypePath.Member({
              name: "Some",
              span: $puck_5.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: e.pattern, $isTraitObject: true}),
            }));
            e.optionSome = optionSome;
            $unwrapTraitObject(self).visitTypePath(optionSome);
            let $puck_47 = $puck_11.declarePatternVariables($unwrapTraitObject(self).scope, self, e.pattern, type_, false);
            if ($puck_47.kind === "Ok") {
              $puck_47;
            }
            else {
              if (($puck_47.kind === "Err" && $unwrapTraitObject($puck_47.value).kind === "PatternMismatch")) {
                let {value: {value: [pattern, to, subject]}} = $puck_47;
                reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true}, $puck_14.notAssignableError(to, subject));
              }
              else {
                if (($puck_47.kind === "Err" && $unwrapTraitObject($puck_47.value).kind === "ScopeError")) {
                  let {value: {value: [token, err]}} = $puck_47;
                  reportError(token, err);
                }
                else {
                  if (($puck_47.kind === "Err" && $unwrapTraitObject($puck_47.value).kind === "NotExhaustive")) {
                    $puck_47;
                    reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: e.pattern, $isTraitObject: true}, "non exhaustive pattern");
                  };
                };
              };
            };
          }
          else {
            if (($puck_46.kind === "Ok" && $puck_46.value === undefined)) {
              $puck_46;
              reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ForLoop', value: e, $isTraitObject: true}, $puck_17.Type.displayName.call(intoIteratorType) + " has not been implemented for type " + $puck_17.Type.displayName.call($puck_4.Expression.getType.call(e.expression)));
            }
            else {
              if (true) {
                const Err = $puck_46;
                reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ForLoop', value: e, $isTraitObject: true}, "Ambiguous trait call");
              };
            };
          };
        }
        else {
          reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ForLoop', value: e, $isTraitObject: true}, "puck:core::Option is not in scope. Please import Option from puck:core to use for loops.");
        };
      }
      else {
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ForLoop', value: e, $isTraitObject: true}, "puck:core::Iterator is not in scope. Please import Iterator from puck:core to use for loops.");
      };
    }
    else {
      reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ForLoop', value: e, $isTraitObject: true}, "puck:core::IntoIterator is not in scope. Please import IntoIterator from puck:core to use for loops.");
    };
    $unwrapTraitObject(self).visitBlock(e.body, false);
    e.type_ = $puck_17.Type.empty({
      file: file,
      token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ForLoop', value: e, $isTraitObject: true},
    });
    return $unwrapTraitObject(self).scope = parentScope;
  },
    visitWhileLoop: function (e) {
    let self = this;
    const parentScope = $unwrapTraitObject(self).scope;
    $unwrapTraitObject(self).scope = $puck_13.Scope.createChild.call(parentScope);
    e.scope = $unwrapTraitObject(self).scope;
    $unwrapTraitObject(self).visitExpression(e.condition);
    $unwrapTraitObject(self).visitBlock(e.body, false);
    e.type_ = $puck_17.Type.empty({
      file: file,
      token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:WhileLoop', value: e, $isTraitObject: true},
    });
    return $unwrapTraitObject(self).scope = parentScope;
  },
    visitIdentifier: function (i) {
    const self = this;
    const scope = $unwrapTraitObject(self).scope;
    i.scope = $unwrapTraitObject(self).scope;
    let $puck_48 = $puck_13.Scope.getBinding.call(scope, i.name);
    if (($puck_48 !== undefined)) {
      let binding = $puck_48;
      let b = binding;
      i.binding = binding;
      let $puck_49;
      if ((binding.type_ && $puck_1.Option.isSome.call(binding.type_.providesType))) {
        $puck_49 = $puck_15.enumMemberToFunction(b.type_);
      }
      else {
        $puck_49 = binding.type_;
      };
      i.type_ = $puck_49;
    }
    else {
      $puck_6.CompilerContext.reportError.call(context, file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: i, $isTraitObject: true}, $puck_17.CompilationError.UndefinedVariable(i.name));
    };
    return undefined;
  },
    visitFunctionDeclaration: function (f, isHoisting = false) {
    let self = this;
    structureVisitorInstance.visitFunctionDeclaration.call(self, f);
    if (!isHoisting) {
      const selfScope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(self).scope = f.scope;
      if ($unwrapTraitObject(self).variableDeclarationScope) {
        const vdScope = $unwrapTraitObject(self).variableDeclarationScope;
        let fScope = $unwrapTraitObject(self).scope;
        let bindings = fScope.bindings;
        let $puck_50 = vdScope.parent;
        if ($puck_50 !== undefined) {
          let vdParent = $puck_50;
          while (true) {
            let $puck_51 = fScope.parent;
            if ($puck_51 !== undefined) {
              let fParent = $puck_51;
              if ($puck_1.identical(vdParent, fParent)) {
                break              }
              else {
                bindings = $unwrapTraitObject($puck_2._Object.assign({}, fParent.bindings, bindings));
                fScope = fParent;
              };
            }
            else {
              break            };
          };
        };
        $unwrapTraitObject(self).scope = $puck_13.Scope({
          context: $unwrapTraitObject($unwrapTraitObject(self).scope).context,
          parent: $puck_1.Some($unwrapTraitObject(self).variableDeclarationScope),
          bindings: bindings,
          bindingsByTypeId: $unwrapTraitObject($unwrapTraitObject(self).scope).bindingsByTypeId,
        });
      };
      let $puck_52 = f.body;
      if ($puck_52 !== undefined) {
        let body = $puck_52;
        const parentAssignedTo = $unwrapTraitObject(self).assignedTo;
        const parentContext = $unwrapTraitObject(self).functionContext;
        let isUsed = true;
        $unwrapTraitObject(self).functionContext = {
          returnType: $puck_1.None,
          returnTypes: [],
        };
        let $puck_53 = f.type_.kind;
        if ($puck_53.kind === "Function") {
          let {value: func} = $puck_53;
          $unwrapTraitObject(self).assignedTo = func.returnType;
          if (func.returnType) {
            $unwrapTraitObject($unwrapTraitObject(self).functionContext).returnType = $puck_1.Some(func.returnType);
            if ($puck_17.Type.isEmpty.call(func.returnType)) {
              isUsed = false;
            };
          };
        };
        $unwrapTraitObject(self).visitBlock(body, isUsed);
        let $puck_54 = $unwrapTraitObject(self).functionContext;
        if ($puck_54 === undefined) {
          $puck_54;
        };
        let $puck_55 = f.type_.kind;
        if ($puck_55.kind === "Function") {
          let {value: func} = $puck_55;
          if (func.returnType) {
            if ((!$puck_16.isAssignable(func.returnType, body.type_) && !$puck_17.Type.isEmpty.call(func.returnType))) {
              reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: f, $isTraitObject: true}, $puck_14.notAssignableError(func.returnType, body.type_));
            };
          }
          else {
            let types = $unwrapTraitObject($unwrapTraitObject(self).functionContext).returnTypes;
            if (body.type_) {
              $puck_1.List.push.call(types, body.type_);
            };
            if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isNotEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: types, $isTraitObject: true})) {
              let $puck_56 = $puck_16.findCommonType(types);
              if ($puck_56.kind === "Ok") {
                let {value: type_} = $puck_56;
                $puck_2._Object.assign(func, {returnType: body.type_});
              }
              else {
                if ($puck_56.kind === "Err") {
                  $puck_56;
                  reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: f, $isTraitObject: true}, "No best common type exists among return expressions. Found " + $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: types, $isTraitObject: true}, function (type_) {
                    return $puck_17.Type.displayName.call(type_);
                  }).value.join(", "));
                };
              };
            };
          };
        };
        $unwrapTraitObject(self).assignedTo = parentAssignedTo;
        $unwrapTraitObject(self).functionContext = parentContext;
      };
      return $unwrapTraitObject(self).scope = selfScope;
    };
  },
    visitVariableDeclaration: function (d, visitInitializer, type_) {
    let self = this;
    let $puck_57;
    if (visitInitializer) {
      $puck_57 = visitInitializer;
    }
    else {
      $puck_57 = function (e) {
        $unwrapTraitObject(self).isUsed = true;
        return $unwrapTraitObject(self).visitExpression(e, d.type_);
      };
    };
    return structureVisitorInstance.visitVariableDeclaration.call(self, d, $puck_57, type_);
  },
    visitAssignmentExpression: function (e) {
    const self = this;
    e.scope = $unwrapTraitObject(self).scope;
    let $puck_58 = e.lhs;
    if (($puck_58.kind === "IndexAccess")) {
      let {value: a} = $puck_58;
      visit.walkIndexAccess(self, a);
      $unwrapTraitObject(self).visitExpression(e.rhs);
    }
    else {
      visit.walkAssignmentExpression(self, e);
    };
    let $puck_59 = getBinding(e.lhs);
    if ($puck_59 !== undefined) {
      let binding = $puck_59;
      if ((!binding.mutable)) {
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:AssignmentExpression', value: e, $isTraitObject: true}, "Can't assign to immutable variable " + binding.name);
      };
      if ((!$puck_16.isAssignable($puck_4.Expression.getType.call(e.lhs), $puck_4.Expression.getType.call(e.rhs)))) {
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:AssignmentExpression', value: e, $isTraitObject: true}, $puck_14.notAssignableError($puck_4.Expression.getType.call(e.lhs), $puck_4.Expression.getType.call(e.rhs)));
      };
    };
    return e.type_ = ($puck_4.Expression.getType.call(e.lhs) || $puck_4.Expression.getType.call(e.rhs));
  },
    visitBinaryExpression: function (e) {
    const self = this;
    let $puck_60 = e.operator.kind;
    if ($puck_60.kind === "EqualsEqualsToken") {
      $puck_60;
      return asTraitCall(self, e, "PartialEq", "eq", "equal operators");
    }
    else {
      if ($puck_60.kind === "ExclamationEqualsToken") {
        $puck_60;
        return asTraitCall(self, e, "PartialEq", "ne", "equal operators");
      }
      else {
        if ($puck_60.kind === "LessThanToken") {
          $puck_60;
          return asTraitCall(self, e, "PartialOrd", "lt", "comparison operators");
        }
        else {
          if ($puck_60.kind === "LessThanEqualsToken") {
            $puck_60;
            return asTraitCall(self, e, "PartialOrd", "le", "comparison operators");
          }
          else {
            if ($puck_60.kind === "GreaterThanToken") {
              $puck_60;
              return asTraitCall(self, e, "PartialOrd", "gt", "comparison operators");
            }
            else {
              if ($puck_60.kind === "GreaterThanEqualsToken") {
                $puck_60;
                return asTraitCall(self, e, "PartialOrd", "ge", "comparison operators");
              }
              else {
                if (true) {
                  $puck_60;
                  return visit.walkBinaryExpression(self, e);
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
    e.scope = $unwrapTraitObject(self).scope;
    const scope = $unwrapTraitObject(self).scope;
    let functionType;
    let isUnknownCall = false;
    let skipFirstArgument = false;
    let $puck_61 = e.func;
    if ($puck_61.kind === "MemberAccess") {
      let {value: access} = $puck_61;
      $unwrapTraitObject(self).visitMemberAccess(access, true);
      functionType = $puck_4.Expression.getType.call(e.func);
      if ($puck_4.Expression.getType.call(access.object)) {
        const name = access.member.name;
        const objectType = $puck_4.Expression.getType.call(access.object);
        let $puck_62 = objectType.providesType;
        if ($puck_62 !== undefined) {
          let providesType = $puck_62;
          let $puck_63 = providesType.kind;
          if ($puck_63.kind === "Enum") {
            let {value: enum_} = $puck_63;
            functionType = $puck_1.Option.unwrapOr.call($puck_1.Option.andThen.call($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: enum_.implementations, $isTraitObject: true}, function ({trait_: trait_}) {
              return $puck_17.Type.getTrait.call(trait_).isShorthand;
            }), function ({trait_: trait_}) {
              return $puck_1.ObjectMap.get.call($puck_17.Type.getTrait.call(trait_).functions, name);
            }), $unwrapTraitObject($puck_2._undefined));
          }
          else {
            if ($puck_63.kind === "Struct") {
              let {value: struct} = $puck_63;
              functionType = $puck_1.Option.unwrapOr.call($puck_1.Option.andThen.call($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: struct.implementations, $isTraitObject: true}, function ({trait_: trait_}) {
                return $puck_17.Type.getTrait.call(trait_).isShorthand;
              }), function ({trait_: trait_}) {
                return $puck_1.ObjectMap.get.call($puck_17.Type.getTrait.call(trait_).functions, name);
              }), $unwrapTraitObject($puck_2._undefined));
            }
            else {
              if ($puck_63.kind === "Trait") {
                let {value: trait_} = $puck_63;
                functionType = $puck_1.Option.unwrapOr.call($puck_1.ObjectMap.get.call(trait_.functions, name), $unwrapTraitObject($puck_2._undefined));
              }
              else {
                if (true) {
                  $puck_63;
                };
              };
            };
          };
          if (functionType) {
            const _function = $puck_17.Type.getFunction.call(functionType);
            let $puck_64 = _function.selfBinding;
            if ($puck_64 !== undefined) {
              let selfBinding = $puck_64;
              functionType = {
                definition: functionType.definition,
                id: functionType.id,
                displayName: functionType.displayName,
                name: functionType.name,
                kind: $puck_17.TypeKind.Function({
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
              let $puck_65 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true});
              if (($puck_65 !== undefined)) {
                let selfArgument = $puck_65;
                skipFirstArgument = true;
                $unwrapTraitObject(self).visitExpression(selfArgument);
                if ((!$puck_4.Expression.getType.call(selfArgument))) {
                  reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: selfArgument, $isTraitObject: true}, "selfArgument has no type");
                };
                let $puck_66 = $puck_10.getImplementationForTrait($puck_4.Expression.getType.call(selfArgument), $puck_1.Option.unwrapOr.call(objectType.providesType, objectType));
                if (($puck_66.kind === "Ok" && $puck_66.value !== undefined)) {
                  let {value: implementation} = $puck_66;
                  e.traitName = $puck_1.Option.unwrap.call($puck_13.Scope.getBindingByTypeId.call(scope, $puck_1.Option.unwrap.call(providesType.id))).name;
                  e.traitBinding = $puck_1.Option.unwrap.call($puck_13.Scope.getBindingByTypeId.call(scope, $puck_1.Option.unwrap.call(providesType.id)));
                  e.isDirectTraitCall = true;
                  e.implementation = implementation;
                  if ($puck_1.Option.isSome.call(providesType._class)) {
                    let $puck_67 = $puck_10.resolveImplTypeParameters($unwrapTraitObject(e.implementation), $puck_4.Expression.getType.call(selfArgument));
                    if ($puck_67.kind === "Ok") {
                      let {value: resolvedTrait} = $puck_67;
                      let parameterMap = $puck_1.Option.unwrap.call(resolvedTrait.instance).parameterMap;
                      functionType = $unwrapTraitObject($puck_16.resolveTypeParameters(parameterMap)(functionType));
                    }
                    else {
                      if ($puck_67.kind === "Err") {
                        let {value: [to, subject]} = $puck_67;
                        return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true}, $puck_14.notAssignableError(to, subject));
                      };
                    };
                  };
                }
                else {
                  if (($puck_66.kind === "Ok" && $puck_66.value === undefined)) {
                    $puck_66;
                    reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true}, $puck_17.Type.displayName.call(objectType) + " has not been implemented for type " + $puck_17.Type.displayName.call($puck_4.Expression.getType.call(selfArgument)));
                  }
                  else {
                    if (true) {
                      const Err = $puck_66;
                      reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true}, "Ambiguous trait call");
                    };
                  };
                };
              };
            }
            else {
              e.traitName = $puck_1.Option.unwrap.call($puck_13.Scope.getBindingByTypeId.call(scope, $puck_1.Option.unwrap.call(providesType.id))).name;
              e.traitBinding = $puck_1.Option.unwrap.call($puck_13.Scope.getBindingByTypeId.call(scope, $puck_1.Option.unwrap.call(providesType.id)));
              e.isTraitObject = true;
            };
          }
          else {
            reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true}, $puck_17.Type.displayName.call(providesType) + " has no function named " + name + "");
          };
        }
        else {
          let $puck_68 = objectType.kind;
          if (($puck_68.kind === "Trait")) {
            let {value: trait_} = $puck_68;
            let $puck_69 = $puck_1.ObjectMap.get.call(trait_.functions, name);
            if ($puck_69 !== undefined) {
              let func = $puck_69;
              functionType = func;
              const _function = $puck_17.Type.getFunction.call(functionType);
              if ($puck_1.Option.isSome.call(_function.selfBinding)) {
                let $puck_70 = $puck_13.Scope.getBindingByTypeId.call(scope, $puck_1.Option.unwrap.call(objectType.id));
                if ($puck_70 !== undefined) {
                  let binding = $puck_70;
                  e.traitName = binding.name;
                  e.traitBinding = binding;
                  e.isTraitObject = true;
                }
                else {
                  const typeName = $puck_1.Option.unwrap.call(objectType.name);
                  $puck_6.CompilerContext.reportError.call(context, file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true}, $puck_17.CompilationError.TraitNotInScope({
                    functionName: name,
                    traitName: typeName,
                    id: $puck_1.Option.unwrap.call(objectType.id),
                  }));
                };
              };
            };
          }
          else {
            let $puck_71 = $puck_10.getImplementation(name, objectType, e);
            if (($puck_71.kind === "Ok" && $puck_71.value !== undefined)) {
              let {value: implementation} = $puck_71;
              let $puck_72 = implementation.trait_.instance;
              let $puck_73;
              if ($puck_72 !== undefined) {
                let instance = $puck_72;
                $puck_73 = instance._class;
              }
              else {
                $puck_73 = implementation.trait_;
              };
              const trait_ = $puck_73;
              let $puck_74 = $puck_13.Scope.getBindingByTypeId.call(scope, $puck_1.Option.unwrap.call(trait_.id));
              if ($puck_74 !== undefined) {
                let binding = $puck_74;
                e.traitName = binding.name;
                e.traitBinding = binding;
                e.isShorthand = $puck_17.Type.getTrait.call(trait_).isShorthand;
                e.implementation = implementation;
                functionType = $puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: $puck_17.Type.getTrait.call(implementation.trait_).functions, $isTraitObject: true}, name);
              }
              else {
                const traitName = $puck_1.Option.unwrap.call(trait_.name);
                $puck_6.CompilerContext.reportError.call(context, file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true}, $puck_17.CompilationError.TraitNotInScope({
                  functionName: name,
                  traitName: traitName,
                  id: $puck_1.Option.unwrap.call(trait_.id),
                }));
              };
            }
            else {
              if ($puck_71.kind === "Ok") {
                let {value: None} = $puck_71;
              }
              else {
                if (true) {
                  const Err = $puck_71;
                  reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true}, "Ambiguous trait call");
                };
              };
            };
          };
          if (e.traitName) {
            let $puck_75 = objectType.instance;
            if ($puck_75 !== undefined) {
              let instance = $puck_75;
              functionType = $unwrapTraitObject($puck_16.resolveTypeParameters(instance.parameterMap)(functionType));
            };
          };
        };
      };
      if (e.traitName) {
        accessError = $puck_1.None;
      }
      else {
        let $puck_76 = accessError;
        if ($puck_76 !== undefined) {
          let [token, message] = $puck_76;
          reportError(token, message);
          accessError = $puck_1.None;
        };
      };
    }
    else {
      $unwrapTraitObject(self).visitExpression(e.func);
      functionType = $puck_4.Expression.getType.call(e.func);
      let $puck_77 = e.func;
      if ($puck_77.kind === "UnknownAccess") {
        $puck_77;
        isUnknownCall = true;
      }
      else {
        let $puck_78 = e.func;
        if ($puck_78.kind === "UnknownIndexAccess") {
          $puck_78;
          isUnknownCall = true;
        };
      };
    };
    let $puck_79 = e.typeArguments;
    if ($puck_79 !== undefined) {
      let t = $puck_79;
      const callParameterMap = $puck_1.ObjectMap._new();
      $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeArguments, $isTraitObject: true}, function (t) {
        return $unwrapTraitObject(self).visitTypeBound(t);
      });
      if (functionType) {
        let $puck_80 = functionType._class;
        if ($puck_80 !== undefined) {
          let _class = $puck_80;
          if ($puck_1.Range.contains.call(_class.parameterRange, $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeArguments, $isTraitObject: true}))) {
            let $puck_81 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeArguments, $isTraitObject: true}, function (t) {
              return $puck_4.TypeBound.getType.call(t);
            })
;
            functionType = $puck_16.createTypeInstance(functionType, $puck_1.Iterable[$puck_81.type].toList.call($puck_81));
          };
        };
      };
    };
    if ((!isUnknownCall && functionType && $puck_17.Type.isFunction.call(functionType))) {
      const callTypeParameters = $puck_1.Option.unwrapOr.call($puck_1.Option.map.call(functionType._class, function (_class) {
        return _class.typeParameters;
      }), []);
      let callParameterMap = $puck_1.ObjectMap._new();
      let functionKind = $puck_17.Type.getFunction.call(functionType);
      const resolveParameter = $puck_16.resolveTypeParameters(callParameterMap, false);
      let $puck_83 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true})
;
      let $puck_82 = $puck_1.Iterable[$puck_83.type].take.call($puck_83, $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: functionKind.parameters, $isTraitObject: true}))
;
      $puck_1.Iterable[$puck_82.type].forEach.call($puck_82, function ([i, a]) {
        let parameter = $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: functionKind.parameters, $isTraitObject: true}, i);
        let $puck_84;
        if ((!parameter.type_ || $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: callTypeParameters, $isTraitObject: true}))) {
          $puck_84 = parameter.type_;
        }
        else {
          $puck_84 = resolveParameter(parameter.type_);
        };
        const parameterType = $puck_84;
        if ((!skipFirstArgument || i > 0)) {
          $unwrapTraitObject(self).visitExpression(a, parameterType);
        };
        if (($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isNotEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: callTypeParameters, $isTraitObject: true}) && parameterType && $puck_4.Expression.getType.call(a))) {
          return $puck_9.resolveFunctionTypeParameters(callParameterMap, callTypeParameters, parameterType, $puck_4.Expression.getType.call(a));
        };
      });
      if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isNotEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: callTypeParameters, $isTraitObject: true})) {
        functionType = $unwrapTraitObject($puck_16.resolveTypeParameters(callParameterMap)(functionType));
      };
    }
    else {
      $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true}, function (a) {
        return $unwrapTraitObject(self).visitExpression(a);
      });
    };
    if (isUnknownCall) {
      e.type_ = functionType;
    }
    else {
      if (functionType) {
        e.functionType = functionType;
        const _function = checkFunctionCall(functionType, e);
        if (_function) {
          e.type_ = _function.returnType;
        };
      };
    };
    return undefined;
  },
    visitIfExpression: function (e) {
    let self = this;
    const parentScope = $unwrapTraitObject(self).scope;
    e.scope = $unwrapTraitObject(self).scope;
    const isUsed = $unwrapTraitObject(self).isUsed;
    $unwrapTraitObject(self).visitExpression(e.condition);
    $unwrapTraitObject(self).scope = $puck_13.Scope.createChild.call(parentScope);
    $unwrapTraitObject(self).visitBlock(e.then_, isUsed && $puck_1.Option.isSome.call(e.else_));
    let $puck_85 = e.else_;
    if ($puck_85 !== undefined) {
      let else_ = $puck_85;
      $unwrapTraitObject(self).scope = $puck_13.Scope.createChild.call(parentScope);
      $unwrapTraitObject(self).visitBlock(else_, isUsed);
    };
    if (isUsed) {
      let $puck_86 = e.else_;
      let $puck_87;
      if ($puck_86 !== undefined) {
        let else_ = $puck_86;
        let $puck_88 = $puck_16.findCommonType([
          e.then_.type_,
          else_.type_,
        ]);
        let $puck_89;
        if ($puck_88.kind === "Ok") {
          let {value: type_} = $puck_88;
          $puck_89 = type_;
        }
        else {
          let $puck_90;
          if ($puck_88.kind === "Err") {
            $puck_88;
            reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression', value: e, $isTraitObject: true}, "Type " + $puck_17.Type.displayName.call(e.then_.type_) + " and " + $puck_17.Type.displayName.call(else_.type_) + " is not compatible");
            $puck_90 = $puck_17.Type.empty({
              file: file,
              token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression', value: e, $isTraitObject: true},
            });
          };
          $puck_89 = $puck_90;
        };
        $puck_87 = $puck_89;
      }
      else {
        $puck_87 = $puck_17.Type.empty({
          file: file,
          token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression', value: e, $isTraitObject: true},
        });
      };
      e.type_ = $puck_87;
    };
    return $unwrapTraitObject(self).scope = parentScope;
  },
    visitIfLetExpression: function (e) {
    let self = this;
    const parentScope = $unwrapTraitObject(self).scope;
    e.scope = $unwrapTraitObject(self).scope;
    $unwrapTraitObject(self).scope = $puck_13.Scope.createChild.call(parentScope);
    const isUsed = $unwrapTraitObject(self).isUsed;
    $unwrapTraitObject(self).visitPattern(e.pattern);
    $unwrapTraitObject(self).visitExpression(e.expression);
    let $puck_91 = $puck_11.declarePatternVariables($unwrapTraitObject(self).scope, self, e.pattern, $puck_4.Expression.getType.call(e.expression), true);
    if (($puck_91.kind === "Ok")) {
      $puck_91;
    }
    else {
      if (($puck_91.kind === "Err" && $unwrapTraitObject($puck_91.value).kind === "PatternMismatch")) {
        let {value: {value: [pattern, to, subject]}} = $puck_91;
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true}, $puck_14.notAssignableError(to, subject));
      }
      else {
        if (($puck_91.kind === "Err" && $unwrapTraitObject($puck_91.value).kind === "ScopeError")) {
          let {value: {value: [token, err]}} = $puck_91;
          reportError(token, err);
        }
        else {
          if (($puck_91.kind === "Err" && $unwrapTraitObject($puck_91.value).kind === "NotExhaustive")) {
            $puck_91;
          };
        };
      };
    };
    const expressionScope = $unwrapTraitObject(self).scope;
    $unwrapTraitObject(self).scope = $puck_13.Scope.createChild.call(expressionScope);
    $unwrapTraitObject(self).visitBlock(e.then_, isUsed);
    let $puck_92 = e.else_;
    if ($puck_92 !== undefined) {
      let else_ = $puck_92;
      $unwrapTraitObject(self).scope = $puck_13.Scope.createChild.call(expressionScope);
      $unwrapTraitObject(self).visitBlock(else_, isUsed);
    };
    if (isUsed) {
      let $puck_93 = e.else_;
      let $puck_94;
      if ($puck_93 !== undefined) {
        let else_ = $puck_93;
        let $puck_95 = $puck_16.findCommonType([
          e.then_.type_,
          else_.type_,
        ]);
        let $puck_96;
        if ($puck_95.kind === "Ok") {
          let {value: type_} = $puck_95;
          $puck_96 = type_;
        }
        else {
          let $puck_97;
          if ($puck_95.kind === "Err") {
            $puck_95;
            reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression', value: e, $isTraitObject: true}, "Type " + $puck_17.Type.displayName.call(e.then_.type_) + " and " + $puck_17.Type.displayName.call(else_.type_) + " is not compatible");
            $puck_97 = $puck_17.Type.empty({
              file: file,
              token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression', value: e, $isTraitObject: true},
            });
          };
          $puck_96 = $puck_97;
        };
        $puck_94 = $puck_96;
      }
      else {
        $puck_94 = $puck_17.Type.empty({
          file: file,
          token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression', value: e, $isTraitObject: true},
        });
      };
      e.type_ = $puck_94;
    };
    return $unwrapTraitObject(self).scope = parentScope;
  },
    visitMatchExpression: function (e) {
    let self = this;
    e.scope = $unwrapTraitObject(self).scope;
    const oldMatchExpression = matchExpression;
    matchExpression = $puck_1.Some(e);
    const isUsed = $unwrapTraitObject(self).isUsed;
    $unwrapTraitObject(self).visitExpression(e.expression);
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true}, function (a) {
      return $unwrapTraitObject(self).visitMatchArm(a, isUsed);
    });
    if ((!$puck_4.Expression.getType.call(e.expression))) {
      return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true}, "No type in match expression");
    };
    let $puck_98 = $puck_8.checkExhaustive(e);
    if ($puck_98.kind === "Err") {
      let {value: error} = $puck_98;
      reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true}, error);
    };
    if (isUsed) {
      let $puck_99;
      if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isNotEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true})) {
        let $puck_101 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true}, function (arm) {
          return arm.type_;
        })
;
        let $puck_100 = $puck_16.findCommonType($puck_1.Iterable[$puck_101.type].toList.call($puck_101));
        let $puck_102;
        if ($puck_100.kind === "Ok") {
          let {value: type_} = $puck_100;
          $puck_102 = type_;
        }
        else {
          let $puck_103;
          if ($puck_100.kind === "Err") {
            $puck_100;
            reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true}, "Match arms return mixed types " + $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true}, function (arm) {
              return $puck_17.Type.displayName.call(asType($unwrapTraitObject(arm.type_)));
            }).value.join(", "));
            $puck_103 = $puck_17.Type.empty({
              file: file,
              token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true},
            });
          };
          $puck_102 = $puck_103;
        };
        $puck_99 = $puck_102;
      }
      else {
        $puck_99 = $puck_17.Type.empty({
          file: file,
          token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true},
        });
      };
      e.type_ = $puck_99;
    };
    matchExpression = oldMatchExpression;
    return undefined;
  },
    visitMatchArm: function (a, isUsed) {
    let self = this;
    const parentScope = $unwrapTraitObject(self).scope;
    $unwrapTraitObject(self).scope = $puck_13.Scope.createChild.call(parentScope);
    a.scope = $unwrapTraitObject(self).scope;
    const m = $puck_1.Option.unwrap.call(matchExpression);
    $unwrapTraitObject(self).visitPattern(a.pattern);
    let $puck_104 = $puck_11.declarePatternVariables($unwrapTraitObject(self).scope, self, a.pattern, $puck_4.Expression.getType.call(m.expression), true);
    if (($puck_104.kind === "Ok")) {
      $puck_104;
    }
    else {
      if (($puck_104.kind === "Err" && $unwrapTraitObject($puck_104.value).kind === "PatternMismatch")) {
        let {value: {value: [pattern, to, subject]}} = $puck_104;
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchArm', value: a, $isTraitObject: true}, $puck_14.notAssignableError(to, subject));
      }
      else {
        if (($puck_104.kind === "Err" && $unwrapTraitObject($puck_104.value).kind === "ScopeError")) {
          let {value: {value: [token, err]}} = $puck_104;
          reportError(token, err);
        }
        else {
          if (($puck_104.kind === "Err" && $unwrapTraitObject($puck_104.value).kind === "NotExhaustive")) {
            $puck_104;
          };
        };
      };
    };
    $unwrapTraitObject(self).visitBlock(a.block, isUsed);
    a.type_ = a.block.type_;
    return $unwrapTraitObject(self).scope = parentScope;
  },
    visitTypePathExpression: function (e) {
    const self = this;
    e.scope = $unwrapTraitObject(self).scope;
    const typePath = e.typePath;
    $unwrapTraitObject(self).visitTypePath(e.typePath);
    let type_ = $unwrapTraitObject(e.typePath.type_);
    if (type_) {
      return e.type_ = $puck_15.enumMemberToFunction(type_);
    };
  },
    visitUnaryExpression: function (e) {
    const self = this;
    const scope = $unwrapTraitObject(self).scope;
    e.scope = $unwrapTraitObject(self).scope;
    visit.walkUnaryExpression(self, e);
    let $puck_105 = e.operator.kind;
    if ($puck_105.kind === "NotKeyword") {
      $puck_105;
      let $puck_106 = $puck_13.Scope.getBindingByTypeId.call(scope, "Bool");
      if ($puck_106 !== undefined) {
        let binding = $puck_106;
        e.type_ = $puck_1.Option.unwrap.call(binding.type_.providesType);
      }
      else {
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true}, "puck:core::Bool is not in scope. Please import Bool from puck:core to use boolean literals.");
      };
    }
    else {
      if ($puck_105.kind === "MinusToken") {
        $puck_105;
        let $puck_107 = $puck_13.Scope.getBindingByTypeId.call(scope, "Num");
        if ($puck_107 !== undefined) {
          let binding = $puck_107;
          e.type_ = $puck_1.Option.unwrap.call(binding.type_.providesType);
        }
        else {
          reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true}, "puck:core::Num is not in scope. Please import Num from puck:core to use number literals.");
        };
      }
      else {
        if ($puck_105.kind === "PlusToken") {
          $puck_105;
          let $puck_108 = $puck_13.Scope.getBindingByTypeId.call(scope, "Num");
          if ($puck_108 !== undefined) {
            let binding = $puck_108;
            e.type_ = $puck_1.Option.unwrap.call(binding.type_.providesType);
          }
          else {
            reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true}, "puck:core::Num is not in scope. Please import Num from puck:core to use number literals.");
          };
        }
        else {
          if (true) {
            $puck_105;
          };
        };
      };
    };
    return undefined;
  },
    visitIndexAccess: function (a) {
    const self = this;
    let $puck_109 = $puck_18.getCoreType($unwrapTraitObject(self).scope, "Index", "index access");
    if ($puck_109.kind === "Ok") {
      let {value: [, binding]} = $puck_109;
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
      $unwrapTraitObject(self).visitCallExpression(call);
      a.call = call;
      a.type_ = call.type_;
      return undefined;
    }
    else {
      if ($puck_109.kind === "Err") {
        let {value: err} = $puck_109;
        return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IndexAccess', value: a, $isTraitObject: true}, err);
      };
    };
  },
    visitMemberAccess: function (a, inCallExpression = false) {
    const self = this;
    $unwrapTraitObject(self).visitExpression(a.object);
    if ($puck_4.Expression.getType.call(a.object)) {
      let $puck_110 = $puck_4.Expression.getType.call(a.object).kind;
      if (($puck_110.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($puck_110.value).kind).kind === "Record")) {
        let {value: {kind: {value: record}}} = $puck_110;
        let $puck_111 = $puck_1.Option.map.call($puck_1.ObjectMap.get.call(record.properties, a.member.name), $puck_18.getRecordPropType($unwrapTraitObject(self).scope));
        if (($puck_111 !== undefined && $puck_111.kind === "Ok")) {
          let {value: type_} = $puck_111;
          return a.type_ = type_;
        }
        else {
          if (($puck_111 !== undefined && $puck_111.kind === "Err")) {
            let {value: err} = $puck_111;
            return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MemberAccess', value: a, $isTraitObject: true}, err);
          }
          else {
            if (true) {
              const None = $puck_111;
              const message = $puck_17.Type.displayName.call($puck_4.Expression.getType.call(a.object)) + " has no property " + a.member.name;
              const token = {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: a.member, $isTraitObject: true};
              if (inCallExpression) {
                return accessError = $puck_1.Some([
                  token,
                  message,
                ]);
              }
              else {
                return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MemberAccess', value: a, $isTraitObject: true}, message);
              };
            };
          };
        };
      }
      else {
        const message = "Can only read properties on record types";
        const token = {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: a.member, $isTraitObject: true};
        if (inCallExpression) {
          return accessError = $puck_1.Some([
            token,
            message,
          ]);
        }
        else {
          return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MemberAccess', value: a, $isTraitObject: true}, message);
        };
      };
    };
  },
    visitTupleIndexAccess: function (a, inCallExpression = false) {
    const self = this;
    $unwrapTraitObject(self).visitExpression(a.object);
    if ($puck_4.Expression.getType.call(a.object)) {
      let $puck_112 = $puck_4.Expression.getType.call(a.object).kind;
      if (($puck_112.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($puck_112.value).kind).kind === "Tuple")) {
        let {value: {kind: {value: record}}} = $puck_112;
        let $puck_113 = $puck_1.List.get.call(record.properties, a.index.value);
        if ($puck_113 !== undefined) {
          let type_ = $puck_113;
          return a.type_ = type_;
        }
        else {
          if (true) {
            const None = $puck_113;
            const message = $puck_17.Type.displayName.call($puck_4.Expression.getType.call(a.object)) + " has no index " + a.index.value;
            const token = {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NumberLiteral', value: a.index, $isTraitObject: true};
            if (inCallExpression) {
              return accessError = $puck_1.Some([
                token,
                message,
              ]);
            }
            else {
              return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleIndexAccess', value: a, $isTraitObject: true}, message);
            };
          };
        };
      }
      else {
        const message = "Can only read properties on tuple types";
        const token = {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NumberLiteral', value: a.index, $isTraitObject: true};
        if (inCallExpression) {
          return accessError = $puck_1.Some([
            token,
            message,
          ]);
        }
        else {
          return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleIndexAccess', value: a, $isTraitObject: true}, message);
        };
      };
    };
  },
    visitUnknownAccess: function (a) {
    const self = this;
    visit.walkExpression(self, a.object);
    let $puck_114 = $puck_18.getCoreType($unwrapTraitObject(self).scope, "Unknown", "unknown access");
    if (($puck_114.kind === "Ok")) {
      let {value: [type_, ]} = $puck_114;
      a.type_ = type_;
    }
    else {
      if ($puck_114.kind === "Err") {
        let {value: err} = $puck_114;
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownAccess', value: a, $isTraitObject: true}, err);
      };
    };
    return undefined;
  },
    visitUnknownIndexAccess: function (a) {
    const self = this;
    visit.walkUnknownIndexAccess(self, a);
    let $puck_115 = $puck_18.getCoreType($unwrapTraitObject(self).scope, "Unknown", "unknown access");
    if ($puck_115.kind === "Ok") {
      let {value: [type_, ]} = $puck_115;
      a.type_ = type_;
    }
    else {
      if ($puck_115.kind === "Err") {
        let {value: err} = $puck_115;
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownIndexAccess', value: a, $isTraitObject: true}, err);
      };
    };
    return undefined;
  },
    visitBooleanLiteral: function (l) {
    const self = this;
    const scope = $unwrapTraitObject(self).scope;
    l.scope = $unwrapTraitObject(self).scope;
    let $puck_116 = $puck_13.Scope.getBindingByTypeId.call(scope, "Bool");
    if ($puck_116 !== undefined) {
      let binding = $puck_116;
      l.type_ = $puck_1.Option.unwrap.call(binding.type_.providesType);
    }
    else {
      reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BooleanLiteral', value: l, $isTraitObject: true}, "puck:core::Bool is not in scope. Please import Bool from puck:core to use boolean literals.");
    };
    return undefined;
  },
    visitListLiteral: function (l) {
    const self = this;
    const scope = $unwrapTraitObject(self).scope;
    let $puck_117 = $puck_13.Scope.getBindingByTypeId.call(scope, "List");
    let $puck_118;
    if ($puck_117 !== undefined) {
      let binding = $puck_117;
      $puck_118 = $puck_1.Option.unwrap.call(binding.type_.providesType);
    }
    else {
      return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral', value: l, $isTraitObject: true}, "puck:core::List is not in scope. Please import List from puck:core to use list literals.");
    };
    let listType = $puck_118;
    let type_ = $puck_1.None;
    if ($unwrapTraitObject(self).assignedTo) {
      const a = $unwrapTraitObject(self).assignedTo;
      let $puck_119 = a.kind;
      if ($puck_119.kind === "Struct") {
        $puck_119;
        if ($puck_1.Option.unwrapOr.call(a.id, "") === "List") {
          type_ = $puck_1.Some(a);
        };
      };
    };
    visit.walkListLiteral(self, l);
    let $puck_120 = type_;
    if ($puck_120 !== undefined) {
      let type_ = $puck_120;
      l.type_ = type_;
    }
    else {
      if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true}) >= 1) {
        let $puck_121 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true}, function (m) {
          return $puck_4.Expression.getType.call(m);
        })
;
        const types = $puck_1.Iterable[$puck_121.type].toList.call($puck_121);
        let $puck_122 = $puck_16.findCommonType(types);
        if ($puck_122.kind === "Ok") {
          let {value: type_} = $puck_122;
          if ((!type_)) {
            l.type_ = listType;
          }
          else {
            l.type_ = $puck_16.createTypeInstance(listType, [type_]);
          };
        }
        else {
          if ($puck_122.kind === "Err") {
            $puck_122;
            reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral', value: l, $isTraitObject: true}, "List contains mixed types");
          };
        };
      }
      else {
        l.type_ = listType;
      };
    };
    return undefined;
  },
    visitNumberLiteral: function (l) {
    const self = this;
    const scope = $unwrapTraitObject(self).scope;
    let $puck_123 = $puck_13.Scope.getBindingByTypeId.call(scope, "Num");
    if ($puck_123 !== undefined) {
      let binding = $puck_123;
      l.type_ = $puck_1.Option.unwrap.call(binding.type_.providesType);
      return undefined;
    }
    else {
      return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NumberLiteral', value: l, $isTraitObject: true}, "puck:core::Num is not in scope. Please import Num from puck:core to use number literals.");
    };
  },
    visitRangeLiteral: function (l) {
    const self = this;
    visit.walkRangeLiteral(self, l);
    const scope = $unwrapTraitObject(self).scope;
    let $puck_124 = $puck_18.getCoreType(scope, "Range", "range literals");
    if ($puck_124.kind === "Ok") {
      let {value: [, binding]} = $puck_124;
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
      $unwrapTraitObject(self).visitCallExpression(call);
      l.call = call;
      l.type_ = call.type_;
    }
    else {
      if ($puck_124.kind === "Err") {
        let {value: err} = $puck_124;
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RangeLiteral', value: l, $isTraitObject: true}, err);
      };
    };
    return undefined;
  },
    visitRecordLiteral: function (l) {
    const self = this;
    visit.walkRecordLiteral(self, l);
    let properties = $puck_1.ObjectMap._new();
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true}, function (m) {
      let $puck_125 = m;
      if ($puck_125.kind === "Property") {
        let {value: {name: name, value: value}} = $puck_125;
        return $puck_1.ObjectMap.set.call(properties, name.name, {
          type_: $puck_4.Expression.getType.call(value),
          optional: false,
        });
      }
      else {
        if ($puck_125.kind === "Spread") {
          let {value: e} = $puck_125;
          let $puck_126 = $puck_4.Expression.getType.call(e).kind;
          if (($puck_126.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($puck_126.value).kind).kind === "Record")) {
            let {value: {kind: {value: r}}} = $puck_126;
            return $puck_1.ObjectMap.merge.call(properties, r.properties);
          }
          else {
            if (true) {
              let $puck_127 = $puck_126;;
              return $puck_127;
            };
          };
        };
      };
    });
    return l.type_ = $puck_17.Type({
      definition: $puck_17.Definition({
      file: file,
      token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordLiteral', value: l, $isTraitObject: true},
    }),
      id: $puck_1.None,
      displayName: $puck_1.None,
      name: $puck_1.None,
      kind: $puck_17.TypeKind.Struct({
      implementations: [],
      kind: $puck_17.StructKind.Record({properties: properties}),
    }),
      _class: $puck_1.None,
      instance: $puck_1.None,
      providesType: $puck_1.None,
      enumMember: $puck_1.None,
    });
  },
    visitRecordLiteralMember: function (l) {
    const self = this;
    visit.walkRecordLiteralMember(self, l);
    let $puck_128 = l;
    if ($puck_128.kind === "Spread") {
      let {value: e} = $puck_128;
      let $puck_129 = $puck_4.Expression.getType.call(e).kind;
      if (($puck_129.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($puck_129.value).kind).kind === "Record")) {
        let $puck_130 = $puck_129;;
        let {value: {}} = $puck_130;;
        return $puck_130;
      }
      else {
        if (true) {
          $puck_129;
          return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e, $isTraitObject: true}, "Can only spread record types");
        };
      };
    };
  },
    visitStringLiteral: function (l) {
    const self = this;
    const scope = $unwrapTraitObject(self).scope;
    l.scope = $unwrapTraitObject(self).scope;
    let $puck_131 = $puck_13.Scope.getBindingByTypeId.call(scope, "String");
    if ($puck_131 !== undefined) {
      let binding = $puck_131;
      l.type_ = $puck_1.Option.unwrap.call(binding.type_.providesType);
    }
    else {
      reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral', value: l, $isTraitObject: true}, "puck:core::String is not in scope. Please import String from puck:core to use string literals.");
    };
    return visit.walkStringLiteral(self, l);
  },
    visitTupleLiteral: function (l) {
    const self = this;
    l.scope = $unwrapTraitObject(self).scope;
    visit.walkTupleLiteral(self, l);
    let $puck_132 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.expressions, $isTraitObject: true}, function (e) {
      return $puck_4.Expression.getType.call(e);
    })
;
    return l.type_ = $puck_17.Type({
      definition: $puck_17.Definition({
      file: file,
      token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleLiteral', value: l, $isTraitObject: true},
    }),
      id: $puck_1.None,
      displayName: $puck_1.None,
      name: $puck_1.None,
      kind: $puck_17.TypeKind.Struct({
      implementations: [],
      kind: $puck_17.StructKind.Tuple({properties: $puck_1.Iterable[$puck_132.type].toList.call($puck_132)}),
    }),
      _class: $puck_1.None,
      instance: $puck_1.None,
      providesType: $puck_1.None,
      enumMember: $puck_1.None,
    });
  },
    visitPattern: function (p) {
    const self = this;
    p.scope = $unwrapTraitObject(self).scope;
    visit.walkPattern(self, p);
    let $puck_133 = p;
    let $puck_134;
    if ($puck_133.kind === "CatchAll") {
      $puck_133;
      $puck_134 = $puck_17.Type.unused({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p, $isTraitObject: true},
      });
    }
    else {
      let $puck_135;
      if ($puck_133.kind === "Identifier") {
        let {value: {identifier: identifier}} = $puck_133;
        $puck_135 = $puck_2._undefined;
      }
      else {
        let $puck_136;
        if ($puck_133.kind === "Record") {
          let {value: record} = $puck_133;
          $puck_136 = record.type_;
        }
        else {
          let $puck_137;
          if ($puck_133.kind === "RecordType") {
            let {value: [typePath, record]} = $puck_133;
            const type_ = $unwrapTraitObject(typePath.providesType);
            if ((!$puck_16.isAssignable($unwrapTraitObject(record.type_), type_))) {
              reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p, $isTraitObject: true}, $puck_17.Type.displayName.call(type_) + " is not assignable to pattern " + $puck_4.RecordPattern.displayName.call(record));
            };
            $puck_137 = $puck_1.Option.mapOr.call(type_.enumMember, type_, function ([, enum_]) {
              return enum_;
            });
          }
          else {
            let $puck_138;
            if (($puck_133.kind === "Tuple")) {
              let {value: tuple} = $puck_133;
              $puck_138 = tuple.type_;
            }
            else {
              let $puck_139;
              if ($puck_133.kind === "TupleType") {
                let {value: [typePath, tuple]} = $puck_133;
                const type_ = $unwrapTraitObject(typePath.providesType);
                if ((!$puck_16.isAssignable($unwrapTraitObject(tuple.type_), type_))) {
                  reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p, $isTraitObject: true}, $puck_17.Type.displayName.call(type_) + " is not assignable to pattern " + $puck_4.TuplePattern.displayName.call(tuple));
                };
                $puck_139 = $puck_1.Option.mapOr.call(type_.enumMember, type_, function ([, enum_]) {
                  return enum_;
                });
              }
              else {
                let $puck_140;
                if (($puck_133.kind === "UnitType")) {
                  let {value: typePath} = $puck_133;
                  $puck_140 = $puck_2._undefined;
                };
                $puck_139 = $puck_140;
              };
              $puck_138 = $puck_139;
            };
            $puck_137 = $puck_138;
          };
          $puck_136 = $puck_137;
        };
        $puck_135 = $puck_136;
      };
      $puck_134 = $puck_135;
    };
    return p.type_ = $puck_134;
  },
    visitRecordPattern: function (p) {
    const self = this;
    p.scope = $unwrapTraitObject(self).scope;
    visit.walkRecordPattern(self, p);
    return p.type_ = $puck_17.Type({
      definition: $puck_17.Definition({
      file: file,
      token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordPattern', value: p, $isTraitObject: true},
    }),
      id: $puck_1.None,
      displayName: $puck_1.None,
      name: $puck_1.None,
      kind: $puck_17.TypeKind.Struct({
      implementations: [],
      kind: $puck_17.StructKind.Record({properties: $puck_1.ObjectMap.fromIter($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: p.properties, $isTraitObject: true}, function (p) {
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
    const self = this;
    p.scope = $unwrapTraitObject(self).scope;
    visit.walkTuplePattern(self, p);
    let $puck_141 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: p.properties, $isTraitObject: true}, function (p) {
      return p.type_;
    })
;
    return p.type_ = $puck_17.Type({
      definition: $puck_17.Definition({
      file: file,
      token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TuplePattern', value: p, $isTraitObject: true},
    }),
      id: $puck_1.None,
      displayName: $puck_1.None,
      name: $puck_1.None,
      kind: $puck_17.TypeKind.Struct({
      implementations: [],
      kind: $puck_17.StructKind.Tuple({properties: $puck_1.Iterable[$puck_141.type].toList.call($puck_141)}),
    }),
      instance: $puck_1.None,
      _class: $puck_1.None,
      providesType: $puck_1.None,
      enumMember: $puck_1.None,
    });
  },
  });
};
exports.ScopeVisitor = ScopeVisitor
