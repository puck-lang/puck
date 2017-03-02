'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.ScopeVisitorundefined;
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
function asType(a) {
  return $unwrapTraitObject(a);
};
function getBinding(e) {
  let $puck_18 = e;
  if ($unwrapTraitObject($puck_18).kind === "Identifier") {
    let {value: [i]} = $unwrapTraitObject($puck_18);
    const scope = $unwrapTraitObject(i.scope);
    return $puck_13.Scope.getBinding.call(scope, i.name);
  }
  else {
    if ($unwrapTraitObject($puck_18).kind === "IndexAccess") {
      let {value: [i]} = $unwrapTraitObject($puck_18);
      return getBinding(i.object);
    }
    else {
      if ($unwrapTraitObject($puck_18).kind === "MemberAccess") {
        let {value: [i]} = $unwrapTraitObject($puck_18);
        return getBinding(i.object);
      }
      else {
        if (true) {
          let $puck_19 = $puck_18;
          return $puck_1.None;
        };
      };
    };
  };
};
function getCoreType(scope, id, description) {
  let $puck_20 = $puck_13.Scope.getBindingByTypeId.call(scope, id);
  if ($puck_20.kind === "Some") {
    let {value: [binding]} = $puck_20;
    return $puck_1.Ok([
      $puck_1.Option.unwrap.call(binding.type_.providesType),
      binding,
    ]);
  }
  else {
    return $puck_1.Err("puck:core::" + id + " is not in scope. Please import " + id + " from puck:core to use " + description + ".");
  };
};
function asTraitCall(visitor, e, trait_, method, desription) {
  let $puck_21 = getCoreType($unwrapTraitObject(visitor).scope, trait_, desription);
  if ($unwrapTraitObject($puck_21).kind === "Ok") {
    let {value: [[$puck_22, binding]]} = $unwrapTraitObject($puck_21);
    let call = $puck_4.CallExpression({
      func: $puck_4.Expression.MemberAccess({
      object: $puck_4.Expression.Identifier({
      name: binding.name,
      span: e.operator.span,
    }),
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
    return $puck_1.Ok([]);
  }
  else {
    if ($unwrapTraitObject($puck_21).kind === "Err") {
      let {value: [err]} = $unwrapTraitObject($puck_21);
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
    let $puck_23 = c.func;
    let $puck_24;
    if ($unwrapTraitObject($puck_23).kind === "Identifier") {
      let {value: [i]} = $unwrapTraitObject($puck_23);
      $puck_24 = $puck_1.Some(i.name);
    }
    else {
      let $puck_25;
      if (true) {
        let $puck_26 = $puck_23;
        $puck_25 = $puck_1.None;
      };
      $puck_24 = $puck_25;
    };
    const namei = $puck_24;
    const name = $puck_1.Option.unwrapOrElse.call(namei, function () {
      return $puck_17.Type.displayName.call(functionType);
    });
    let $puck_27 = functionType.kind;
    let $puck_28;
    if ($unwrapTraitObject($puck_27).kind === "Function") {
      let {value: [func]} = $unwrapTraitObject($puck_27);
      $puck_28 = func;
    }
    else {
      let $puck_29;
      if (true) {
        let $puck_30 = $puck_27;
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: c, $isTraitObject: true}, "" + name + " is not callable");
        return $puck_2._undefined;
      };
      $puck_28 = $puck_29;
    };
    const _function = $puck_28;
    let $puck_31 = _function.selfBinding;
    if ($puck_31.kind === "Some") {
      let {value: [selfBinding]} = $puck_31;
      if (selfBinding.mutable) {
        if ((!$puck_1.Option.mapOr.call(getBinding(c.func), true, function (binding) {
          return binding.mutable;
        }))) {
          reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: c, $isTraitObject: true}, "" + name + " can only be called on a mutable binding");
        };
      };
    };
    let $puck_32 = $puck_12.checkRange(c.argumentList, _function.parameterRange, "arguments", name);
    if ($puck_32.kind === "Err") {
      let {value: [error]} = $puck_32;
      reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: c, $isTraitObject: true}, error);
      return _function;
    };
    let $puck_33 = c.typeArguments;
    if ($puck_33.kind === "Some") {
      let {value: [t]} = $puck_33;
      let $puck_34 = $puck_1.Option.orValue.call($puck_1.Option.andThen.call(functionType.instance, function (i) {
        return i._class._class;
      }), functionType._class);
      if ($puck_34.kind === "Some") {
        let {value: [_class]} = $puck_34;
        let $puck_35 = $puck_12.checkRange(t.typeArguments, _class.parameterRange, "type parameters", $puck_17.Type.displayName.call(functionType));
        if ($puck_35.kind === "Err") {
          let {value: [error]} = $puck_35;
          reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeArguments', value: t, $isTraitObject: true}, error);
        };
      }
      else {
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeArguments', value: t, $isTraitObject: true}, "Type " + $puck_17.Type.displayName.call(functionType) + " is not generic");
      };
    };
    let $puck_36 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: c.argumentList, $isTraitObject: true})
;
    $puck_1.Iterable[$puck_36.type].forEach.call($puck_36, function ([i, argument]) {
      const parameter = $puck_1.Option.unwrap.call($puck_1.List.get.call(_function.parameters, i));
      const parameterName = parameter.name;
      if ((!$puck_16.isAssignable(parameter.type_, $puck_4.Expression.getType.call(argument)))) {
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: argument, $isTraitObject: true}, $puck_14.notAssignableError(parameter.type_, $puck_4.Expression.getType.call(argument)) + " in parameter " + parameterName + " of function " + name + "");
      };
      if (parameter.mutable) {
        let $puck_37 = getBinding(argument);
        if (($puck_37.kind === "Some")) {
          let {value: [argumentBinding]} = $puck_37;
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
      let $puck_38 = s;
      if (($unwrapTraitObject($puck_38).kind === "ExportDirective" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_38).value)[0]).statement).kind === "FunctionDeclaration")) {
        let {value: [{statement: {value: [f]}}]} = $unwrapTraitObject($puck_38);
        return $unwrapTraitObject(self).visitFunctionDeclaration(f, true);
      }
      else {
        if (($unwrapTraitObject($puck_38).kind === "BlockLevelStatement" && ($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_38).value)[0]).kind === "Expression" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_38).value)[0]).value)[0]).kind === "FunctionDeclaration"))) {
          let {value: [{value: [{value: [f]}]}]} = $unwrapTraitObject($puck_38);
          return $unwrapTraitObject(self).visitFunctionDeclaration(f, true);
        }
        else {
          if (true) {
            let $puck_39 = $puck_38;;
            let $puck_40 = $puck_39;;
            return $puck_39;
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
    let $puck_41 = s;
    if ($unwrapTraitObject($puck_41).kind === "Expression") {
      let {value: [e]} = $unwrapTraitObject($puck_41);
      return $unwrapTraitObject(self).visitExpression(e, assignedTo, isUsed);
    }
    else {
      if (true) {
        let $puck_42 = $puck_41;
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
      let $puck_43 = s;
      if (($unwrapTraitObject($puck_43).kind === "Expression" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_43).value)[0]).kind === "FunctionDeclaration")) {
        let {value: [{value: [f]}]} = $unwrapTraitObject($puck_43);
        return $unwrapTraitObject(self).visitFunctionDeclaration(f, true);
      }
      else {
        if (true) {
          let $puck_44 = $puck_43;;
          let $puck_45 = $puck_44;;
          return $puck_44;
        };
      };
    });
    const lastIndex = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true}) - 1;
    let $puck_46 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true})
;
    $puck_1.Iterable[$puck_46.type].forEach.call($puck_46, function ([index, s]) {
      if ((index === lastIndex)) {
        return $unwrapTraitObject(self).visitBlockLevelStatement(s, assignedTo, isUsed);
      }
      else {
        return $unwrapTraitObject(self).visitBlockLevelStatement(s, $puck_2._undefined, false);
      };
    });
    let $puck_47 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].last.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true});
    let $puck_48;
    if ($puck_47.kind === "Some") {
      let {value: [last]} = $puck_47;
      $puck_48 = $puck_4.BlockLevelStatement.getType.call(last);
    }
    else {
      $puck_48 = $puck_17.Type.empty({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: b, $isTraitObject: true},
      });
    };
    return b.type_ = $puck_48;
  },
    visitBreak: function (b) {
    const self = this;
    return b.scope = $unwrapTraitObject(self).scope;
  },
    visitReturn: function (r) {
    let self = this;
    visit.walkReturnStatement(self, r);
    let $puck_49 = $unwrapTraitObject($unwrapTraitObject(self).functionContext).returnType;
    if ($puck_49.kind === "Some") {
      let {value: [returnType]} = $puck_49;
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
    let $puck_50 = $puck_13.Scope.getBinding.call(scope, i.name);
    if ($puck_50.kind === "Some") {
      let {value: [binding]} = $puck_50;
      let b = binding;
      i.binding = binding;
      let $puck_51;
      if ((binding.type_ && $puck_1.Option.isSome.call(binding.type_.providesType))) {
        $puck_51 = $puck_15.enumMemberToFunction(b.type_);
      }
      else {
        $puck_51 = binding.type_;
      };
      i.type_ = $puck_51;
    }
    else {
      $puck_6.CompilerContext.reportError.call(context, file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: i, $isTraitObject: true}, $puck_17.CompilationError.UndefinedVariable(i.name));
    };
    return [];
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
        let $puck_52 = vdScope.parent;
        if ($puck_52.kind === "Some") {
          let {value: [vdParent]} = $puck_52;
          while (true) {
            let $puck_53 = fScope.parent;
            if ($puck_53.kind === "Some") {
              let {value: [fParent]} = $puck_53;
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
      let $puck_54 = f.body;
      if ($puck_54.kind === "Some") {
        let {value: [body]} = $puck_54;
        const parentAssignedTo = $unwrapTraitObject(self).assignedTo;
        const parentContext = $unwrapTraitObject(self).functionContext;
        let isUsed = true;
        $unwrapTraitObject(self).functionContext = {
          returnType: $puck_1.None,
          returnTypes: [],
        };
        let $puck_55 = f.type_.kind;
        if ($puck_55.kind === "Function") {
          let {value: [func]} = $puck_55;
          $unwrapTraitObject(self).assignedTo = func.returnType;
          if (func.returnType) {
            $unwrapTraitObject($unwrapTraitObject(self).functionContext).returnType = $puck_1.Some(func.returnType);
            if ($puck_17.Type.isEmpty.call(func.returnType)) {
              isUsed = false;
            };
          };
        };
        $unwrapTraitObject(self).visitBlock(body, isUsed);
        let $puck_56 = $unwrapTraitObject(self).functionContext;
        if ($puck_56.kind === "None") {
          let undefined = $puck_56;
        };
        let $puck_57 = f.type_.kind;
        if ($puck_57.kind === "Function") {
          let {value: [func]} = $puck_57;
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
              let $puck_58 = $puck_16.findCommonType(types);
              if ($unwrapTraitObject($puck_58).kind === "Ok") {
                let {value: [type_]} = $unwrapTraitObject($puck_58);
                $puck_2._Object.assign(func, {returnType: body.type_});
              }
              else {
                if ($unwrapTraitObject($puck_58).kind === "Err") {
                  let {value: [$puck_59]} = $unwrapTraitObject($puck_58);
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
    let $puck_60;
    if (visitInitializer) {
      $puck_60 = visitInitializer;
    }
    else {
      $puck_60 = function (e) {
        $unwrapTraitObject(self).isUsed = true;
        return $unwrapTraitObject(self).visitExpression(e, d.type_);
      };
    };
    return structureVisitorInstance.visitVariableDeclaration.call(self, d, $puck_60, type_);
  },
    visitAssignmentExpression: function (e) {
    const self = this;
    e.scope = $unwrapTraitObject(self).scope;
    let $puck_61 = e.lhs;
    if (($puck_61.kind === "IndexAccess")) {
      let {value: [a]} = $puck_61;
      visit.walkIndexAccess(self, a);
      $unwrapTraitObject(self).visitExpression(e.rhs);
    }
    else {
      visit.walkAssignmentExpression(self, e);
    };
    let $puck_62 = getBinding(e.lhs);
    if ($puck_62.kind === "Some") {
      let {value: [binding]} = $puck_62;
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
    let $puck_63 = e.operator.kind;
    if ($unwrapTraitObject($puck_63).kind === "EqualsEqualsToken") {
      let undefined = $unwrapTraitObject($puck_63);
      return asTraitCall(self, e, "PartialEq", "eq", "equal operators");
    }
    else {
      if ($unwrapTraitObject($puck_63).kind === "ExclamationEqualsToken") {
        let undefined = $unwrapTraitObject($puck_63);
        return asTraitCall(self, e, "PartialEq", "ne", "equal operators");
      }
      else {
        if ($unwrapTraitObject($puck_63).kind === "LessThanToken") {
          let undefined = $unwrapTraitObject($puck_63);
          return asTraitCall(self, e, "PartialOrd", "lt", "comparison operators");
        }
        else {
          if ($unwrapTraitObject($puck_63).kind === "LessThanEqualsToken") {
            let undefined = $unwrapTraitObject($puck_63);
            return asTraitCall(self, e, "PartialOrd", "le", "comparison operators");
          }
          else {
            if ($unwrapTraitObject($puck_63).kind === "GreaterThanToken") {
              let undefined = $unwrapTraitObject($puck_63);
              return asTraitCall(self, e, "PartialOrd", "gt", "comparison operators");
            }
            else {
              if ($unwrapTraitObject($puck_63).kind === "GreaterThanEqualsToken") {
                let undefined = $unwrapTraitObject($puck_63);
                return asTraitCall(self, e, "PartialOrd", "ge", "comparison operators");
              }
              else {
                if (true) {
                  let $puck_64 = $puck_63;
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
    let $puck_65 = e.func;
    if ($puck_65.kind === "MemberAccess") {
      let {value: [access]} = $puck_65;
      $unwrapTraitObject(self).visitMemberAccess(access, true);
      functionType = $puck_4.Expression.getType.call(e.func);
      if ($puck_4.Expression.getType.call(access.object)) {
        const name = access.member.name;
        const objectType = $puck_4.Expression.getType.call(access.object);
        let $puck_66 = objectType.providesType;
        if ($puck_66.kind === "Some") {
          let {value: [providesType]} = $puck_66;
          let $puck_67 = providesType.kind;
          if ($unwrapTraitObject($puck_67).kind === "Enum") {
            let {value: [enum_]} = $unwrapTraitObject($puck_67);
            functionType = $puck_1.Option.unwrapOr.call($puck_1.Option.andThen.call($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: enum_.implementations, $isTraitObject: true}, function ({trait_: trait_}) {
              return $puck_17.Type.getTrait.call(trait_).isShorthand;
            }), function ({trait_: trait_}) {
              return $puck_1.ObjectMap.get.call($puck_17.Type.getTrait.call(trait_).functions, name);
            }), $unwrapTraitObject($puck_2._undefined));
          }
          else {
            if ($unwrapTraitObject($puck_67).kind === "Struct") {
              let {value: [struct]} = $unwrapTraitObject($puck_67);
              functionType = $puck_1.Option.unwrapOr.call($puck_1.Option.andThen.call($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: struct.implementations, $isTraitObject: true}, function ({trait_: trait_}) {
                return $puck_17.Type.getTrait.call(trait_).isShorthand;
              }), function ({trait_: trait_}) {
                return $puck_1.ObjectMap.get.call($puck_17.Type.getTrait.call(trait_).functions, name);
              }), $unwrapTraitObject($puck_2._undefined));
            }
            else {
              if ($unwrapTraitObject($puck_67).kind === "Trait") {
                let {value: [trait_]} = $unwrapTraitObject($puck_67);
                functionType = $puck_1.Option.unwrapOr.call($puck_1.ObjectMap.get.call(trait_.functions, name), $unwrapTraitObject($puck_2._undefined));
              }
              else {
                if (true) {
                  let $puck_68 = $puck_67;
                };
              };
            };
          };
          if (functionType) {
            const _function = $puck_17.Type.getFunction.call(functionType);
            let $puck_69 = _function.selfBinding;
            if ($puck_69.kind === "Some") {
              let {value: [selfBinding]} = $puck_69;
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
              let $puck_70 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true});
              if (($puck_70.kind === "Some")) {
                let {value: [selfArgument]} = $puck_70;
                skipFirstArgument = true;
                $unwrapTraitObject(self).visitExpression(selfArgument);
                if ((!$puck_4.Expression.getType.call(selfArgument))) {
                  reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: selfArgument, $isTraitObject: true}, "selfArgument has no type");
                };
                let $puck_71 = $puck_10.getImplementationForTrait($puck_4.Expression.getType.call(selfArgument), $puck_1.Option.unwrapOr.call(objectType.providesType, objectType));
                if (($unwrapTraitObject($puck_71).kind === "Ok" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_71).value)[0]).kind === "Some")) {
                  let {value: [{value: [implementation]}]} = $unwrapTraitObject($puck_71);
                  e.traitName = $puck_1.Option.unwrap.call($puck_13.Scope.getBindingByTypeId.call(scope, $puck_1.Option.unwrap.call(providesType.id))).name;
                  e.traitBinding = $puck_1.Option.unwrap.call($puck_13.Scope.getBindingByTypeId.call(scope, $puck_1.Option.unwrap.call(providesType.id)));
                  e.isDirectTraitCall = true;
                  e.implementation = implementation;
                  if ($puck_1.Option.isSome.call(providesType._class)) {
                    let $puck_72 = $puck_10.resolveImplTypeParameters($unwrapTraitObject(e.implementation), $puck_4.Expression.getType.call(selfArgument));
                    if ($unwrapTraitObject($puck_72).kind === "Ok") {
                      let {value: [resolvedTrait]} = $unwrapTraitObject($puck_72);
                      let parameterMap = $puck_1.Option.unwrap.call(resolvedTrait.instance).parameterMap;
                      functionType = $unwrapTraitObject($puck_16.resolveTypeParameters(parameterMap)(functionType));
                    }
                    else {
                      if ($unwrapTraitObject($puck_72).kind === "Err") {
                        let {value: [[to, subject]]} = $unwrapTraitObject($puck_72);
                        return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true}, $puck_14.notAssignableError(to, subject));
                      };
                    };
                  };
                }
                else {
                  if (($unwrapTraitObject($puck_71).kind === "Ok" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_71).value)[0]).kind === "None")) {
                    let {value: []} = $unwrapTraitObject($puck_71);
                    reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true}, $puck_17.Type.displayName.call(objectType) + " has not been implemented for type " + $puck_17.Type.displayName.call($puck_4.Expression.getType.call(selfArgument)));
                  }
                  else {
                    if (true) {
                      const Err = $puck_71;
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
          let $puck_73 = objectType.kind;
          if (($puck_73.kind === "Trait")) {
            let {value: [trait_]} = $puck_73;
            let $puck_74 = $puck_1.ObjectMap.get.call(trait_.functions, name);
            if ($puck_74.kind === "Some") {
              let {value: [func]} = $puck_74;
              functionType = func;
              const _function = $puck_17.Type.getFunction.call(functionType);
              if ($puck_1.Option.isSome.call(_function.selfBinding)) {
                let $puck_75 = $puck_13.Scope.getBindingByTypeId.call(scope, $puck_1.Option.unwrap.call(objectType.id));
                if ($puck_75.kind === "Some") {
                  let {value: [binding]} = $puck_75;
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
            let $puck_76 = $puck_10.getImplementation(name, objectType, e);
            if (($unwrapTraitObject($puck_76).kind === "Ok" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_76).value)[0]).kind === "Some")) {
              let {value: [{value: [implementation]}]} = $unwrapTraitObject($puck_76);
              let $puck_77 = implementation.trait_.instance;
              let $puck_78;
              if ($puck_77.kind === "Some") {
                let {value: [instance]} = $puck_77;
                $puck_78 = instance._class;
              }
              else {
                $puck_78 = implementation.trait_;
              };
              const trait_ = $puck_78;
              let $puck_79 = $puck_13.Scope.getBindingByTypeId.call(scope, $puck_1.Option.unwrap.call(trait_.id));
              if ($puck_79.kind === "Some") {
                let {value: [binding]} = $puck_79;
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
              if ($unwrapTraitObject($puck_76).kind === "Ok") {
                let {value: [None]} = $unwrapTraitObject($puck_76);
              }
              else {
                if (true) {
                  const Err = $puck_76;
                  reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true}, "Ambiguous trait call");
                };
              };
            };
          };
          if (e.traitName) {
            let $puck_80 = objectType.instance;
            if ($puck_80.kind === "Some") {
              let {value: [instance]} = $puck_80;
              functionType = $unwrapTraitObject($puck_16.resolveTypeParameters(instance.parameterMap)(functionType));
            };
          };
        };
      };
      if (e.traitName) {
        accessError = $puck_1.None;
      }
      else {
        let $puck_81 = accessError;
        if ($puck_81.kind === "Some") {
          let {value: [[token, message]]} = $puck_81;
          reportError(token, message);
          accessError = $puck_1.None;
        };
      };
    }
    else {
      $unwrapTraitObject(self).visitExpression(e.func);
      functionType = $puck_4.Expression.getType.call(e.func);
      let $puck_82 = e.func;
      if ($puck_82.kind === "UnknownAccess") {
        let {value: [$puck_83]} = $puck_82;
        isUnknownCall = true;
      }
      else {
        let $puck_84 = e.func;
        if ($puck_84.kind === "UnknownIndexAccess") {
          let {value: [$puck_85]} = $puck_84;
          isUnknownCall = true;
        };
      };
    };
    let $puck_86 = e.typeArguments;
    if ($puck_86.kind === "Some") {
      let {value: [t]} = $puck_86;
      const callParameterMap = $puck_1.ObjectMap._new();
      $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeArguments, $isTraitObject: true}, function (t) {
        return $unwrapTraitObject(self).visitTypeBound(t);
      });
      if (functionType) {
        let $puck_87 = functionType._class;
        if ($puck_87.kind === "Some") {
          let {value: [_class]} = $puck_87;
          if ($puck_1.Range.contains.call(_class.parameterRange, $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeArguments, $isTraitObject: true}))) {
            let $puck_88 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeArguments, $isTraitObject: true}, function (t) {
              return $puck_4.TypeBound.getType.call(t);
            })
;
            functionType = $puck_16.createTypeInstance(functionType, $puck_1.Iterable[$puck_88.type].toList.call($puck_88));
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
      let $puck_90 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true})
;
      let $puck_89 = $puck_1.Iterable[$puck_90.type].take.call($puck_90, $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: functionKind.parameters, $isTraitObject: true}))
;
      $puck_1.Iterable[$puck_89.type].forEach.call($puck_89, function ([i, a]) {
        let parameter = $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: functionKind.parameters, $isTraitObject: true}, i);
        let $puck_91;
        if ((!parameter.type_ || $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: callTypeParameters, $isTraitObject: true}))) {
          $puck_91 = parameter.type_;
        }
        else {
          $puck_91 = resolveParameter(parameter.type_);
        };
        const parameterType = $puck_91;
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
    return [];
  },
    visitIfExpression: function (e) {
    let self = this;
    const parentScope = $unwrapTraitObject(self).scope;
    e.scope = $unwrapTraitObject(self).scope;
    const isUsed = $unwrapTraitObject(self).isUsed;
    $unwrapTraitObject(self).visitExpression(e.condition);
    $unwrapTraitObject(self).scope = $puck_13.Scope.createChild.call(parentScope);
    $unwrapTraitObject(self).visitBlock(e.then_, isUsed && $puck_1.Option.isSome.call(e.else_));
    let $puck_92 = e.else_;
    if ($puck_92.kind === "Some") {
      let {value: [else_]} = $puck_92;
      $unwrapTraitObject(self).scope = $puck_13.Scope.createChild.call(parentScope);
      $unwrapTraitObject(self).visitBlock(else_, isUsed);
    };
    if (isUsed) {
      let $puck_93 = e.else_;
      let $puck_94;
      if ($puck_93.kind === "Some") {
        let {value: [else_]} = $puck_93;
        let $puck_95 = $puck_16.findCommonType([
          e.then_.type_,
          else_.type_,
        ]);
        let $puck_96;
        if ($unwrapTraitObject($puck_95).kind === "Ok") {
          let {value: [type_]} = $unwrapTraitObject($puck_95);
          $puck_96 = type_;
        }
        else {
          let $puck_97;
          if ($unwrapTraitObject($puck_95).kind === "Err") {
            let {value: [$puck_98]} = $unwrapTraitObject($puck_95);
            reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression', value: e, $isTraitObject: true}, "Type " + $puck_17.Type.displayName.call(e.then_.type_) + " and " + $puck_17.Type.displayName.call(else_.type_) + " is not compatible");
            $puck_97 = $puck_17.Type.empty({
              file: file,
              token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression', value: e, $isTraitObject: true},
            });
          };
          $puck_96 = $puck_97;
        };
        $puck_94 = $puck_96;
      }
      else {
        $puck_94 = $puck_17.Type.empty({
          file: file,
          token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression', value: e, $isTraitObject: true},
        });
      };
      e.type_ = $puck_94;
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
    let $puck_99 = $puck_11.declarePatternVariables($unwrapTraitObject(self).scope, self, e.pattern, $puck_4.Expression.getType.call(e.expression), true);
    if (($unwrapTraitObject($puck_99).kind === "Ok")) {
      let {value: [$puck_100]} = $unwrapTraitObject($puck_99);
    }
    else {
      if (($unwrapTraitObject($puck_99).kind === "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_99).value)[0]).kind === "PatternMismatch")) {
        let {value: [{value: [pattern, to, subject]}]} = $unwrapTraitObject($puck_99);
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true}, $puck_14.notAssignableError(to, subject));
      }
      else {
        if (($unwrapTraitObject($puck_99).kind === "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_99).value)[0]).kind === "ScopeError")) {
          let {value: [{value: [token, err]}]} = $unwrapTraitObject($puck_99);
          reportError(token, err);
        }
        else {
          if (($unwrapTraitObject($puck_99).kind === "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_99).value)[0]).kind === "NotExhaustive")) {
            let {value: []} = $unwrapTraitObject($puck_99);
          };
        };
      };
    };
    const expressionScope = $unwrapTraitObject(self).scope;
    $unwrapTraitObject(self).scope = $puck_13.Scope.createChild.call(expressionScope);
    $unwrapTraitObject(self).visitBlock(e.then_, isUsed);
    let $puck_101 = e.else_;
    if ($puck_101.kind === "Some") {
      let {value: [else_]} = $puck_101;
      $unwrapTraitObject(self).scope = $puck_13.Scope.createChild.call(expressionScope);
      $unwrapTraitObject(self).visitBlock(else_, isUsed);
    };
    if (isUsed) {
      let $puck_102 = e.else_;
      let $puck_103;
      if ($puck_102.kind === "Some") {
        let {value: [else_]} = $puck_102;
        let $puck_104 = $puck_16.findCommonType([
          e.then_.type_,
          else_.type_,
        ]);
        let $puck_105;
        if ($unwrapTraitObject($puck_104).kind === "Ok") {
          let {value: [type_]} = $unwrapTraitObject($puck_104);
          $puck_105 = type_;
        }
        else {
          let $puck_106;
          if ($unwrapTraitObject($puck_104).kind === "Err") {
            let {value: [$puck_107]} = $unwrapTraitObject($puck_104);
            reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression', value: e, $isTraitObject: true}, "Type " + $puck_17.Type.displayName.call(e.then_.type_) + " and " + $puck_17.Type.displayName.call(else_.type_) + " is not compatible");
            $puck_106 = $puck_17.Type.empty({
              file: file,
              token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression', value: e, $isTraitObject: true},
            });
          };
          $puck_105 = $puck_106;
        };
        $puck_103 = $puck_105;
      }
      else {
        $puck_103 = $puck_17.Type.empty({
          file: file,
          token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression', value: e, $isTraitObject: true},
        });
      };
      e.type_ = $puck_103;
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
    let $puck_108 = $puck_8.checkExhaustive(e);
    if ($puck_108.kind === "Err") {
      let {value: [error]} = $puck_108;
      reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true}, error);
    };
    if (isUsed) {
      let $puck_109;
      if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isNotEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true})) {
        let $puck_111 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true}, function (arm) {
          return arm.type_;
        })
;
        let $puck_110 = $puck_16.findCommonType($puck_1.Iterable[$puck_111.type].toList.call($puck_111));
        let $puck_112;
        if ($unwrapTraitObject($puck_110).kind === "Ok") {
          let {value: [type_]} = $unwrapTraitObject($puck_110);
          $puck_112 = type_;
        }
        else {
          let $puck_113;
          if ($unwrapTraitObject($puck_110).kind === "Err") {
            let {value: [$puck_114]} = $unwrapTraitObject($puck_110);
            reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true}, "Match arms return mixed types " + $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true}, function (arm) {
              return $puck_17.Type.displayName.call(asType($unwrapTraitObject(arm.type_)));
            }).value.join(", "));
            $puck_113 = $puck_17.Type.empty({
              file: file,
              token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true},
            });
          };
          $puck_112 = $puck_113;
        };
        $puck_109 = $puck_112;
      }
      else {
        $puck_109 = $puck_17.Type.empty({
          file: file,
          token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true},
        });
      };
      e.type_ = $puck_109;
    };
    matchExpression = oldMatchExpression;
    return [];
  },
    visitMatchArm: function (a, isUsed) {
    let self = this;
    const parentScope = $unwrapTraitObject(self).scope;
    $unwrapTraitObject(self).scope = $puck_13.Scope.createChild.call(parentScope);
    a.scope = $unwrapTraitObject(self).scope;
    const m = $puck_1.Option.unwrap.call(matchExpression);
    $unwrapTraitObject(self).visitPattern(a.pattern);
    let $puck_115 = $puck_11.declarePatternVariables($unwrapTraitObject(self).scope, self, a.pattern, $puck_4.Expression.getType.call(m.expression), true);
    if (($unwrapTraitObject($puck_115).kind === "Ok")) {
      let {value: [$puck_116]} = $unwrapTraitObject($puck_115);
    }
    else {
      if (($unwrapTraitObject($puck_115).kind === "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_115).value)[0]).kind === "PatternMismatch")) {
        let {value: [{value: [pattern, to, subject]}]} = $unwrapTraitObject($puck_115);
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchArm', value: a, $isTraitObject: true}, $puck_14.notAssignableError(to, subject));
      }
      else {
        if (($unwrapTraitObject($puck_115).kind === "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_115).value)[0]).kind === "ScopeError")) {
          let {value: [{value: [token, err]}]} = $unwrapTraitObject($puck_115);
          reportError(token, err);
        }
        else {
          if (($unwrapTraitObject($puck_115).kind === "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_115).value)[0]).kind === "NotExhaustive")) {
            let {value: []} = $unwrapTraitObject($puck_115);
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
    let $puck_117 = e.operator.kind;
    if ($unwrapTraitObject($puck_117).kind === "NotKeyword") {
      let undefined = $unwrapTraitObject($puck_117);
      let $puck_118 = $puck_13.Scope.getBindingByTypeId.call(scope, "Bool");
      if ($puck_118.kind === "Some") {
        let {value: [binding]} = $puck_118;
        e.type_ = $puck_1.Option.unwrap.call(binding.type_.providesType);
      }
      else {
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true}, "puck:core::Bool is not in scope. Please import Bool from puck:core to use boolean literals.");
      };
    }
    else {
      if ($unwrapTraitObject($puck_117).kind === "MinusToken") {
        let undefined = $unwrapTraitObject($puck_117);
        let $puck_119 = $puck_13.Scope.getBindingByTypeId.call(scope, "Num");
        if ($puck_119.kind === "Some") {
          let {value: [binding]} = $puck_119;
          e.type_ = $puck_1.Option.unwrap.call(binding.type_.providesType);
        }
        else {
          reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true}, "puck:core::Num is not in scope. Please import Num from puck:core to use number literals.");
        };
      }
      else {
        if ($unwrapTraitObject($puck_117).kind === "PlusToken") {
          let undefined = $unwrapTraitObject($puck_117);
          let $puck_120 = $puck_13.Scope.getBindingByTypeId.call(scope, "Num");
          if ($puck_120.kind === "Some") {
            let {value: [binding]} = $puck_120;
            e.type_ = $puck_1.Option.unwrap.call(binding.type_.providesType);
          }
          else {
            reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true}, "puck:core::Num is not in scope. Please import Num from puck:core to use number literals.");
          };
        }
        else {
          if (true) {
            let $puck_121 = $puck_117;
          };
        };
      };
    };
    return [];
  },
    visitIndexAccess: function (a) {
    const self = this;
    let $puck_122 = getCoreType($unwrapTraitObject(self).scope, "Index", "index access");
    if ($unwrapTraitObject($puck_122).kind === "Ok") {
      let {value: [[$puck_123, binding]]} = $unwrapTraitObject($puck_122);
      let call = $puck_4.CallExpression({
        func: $puck_4.Expression.MemberAccess({
        object: $puck_4.Expression.Identifier({
        name: binding.name,
        span: $puck_5.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: a.object, $isTraitObject: true}),
      }),
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
      return [];
    }
    else {
      if ($unwrapTraitObject($puck_122).kind === "Err") {
        let {value: [err]} = $unwrapTraitObject($puck_122);
        return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IndexAccess', value: a, $isTraitObject: true}, err);
      };
    };
  },
    visitMemberAccess: function (a, inCallExpression = false) {
    const self = this;
    $unwrapTraitObject(self).visitExpression(a.object);
    if ($puck_4.Expression.getType.call(a.object)) {
      let $puck_124 = $puck_4.Expression.getType.call(a.object).kind;
      if (($puck_124.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_124.value)[0]).kind).kind === "Record")) {
        let {value: [{kind: {value: [record]}}]} = $puck_124;
        let $puck_125 = $puck_1.ObjectMap.get.call(record.properties, a.member.name);
        if ($puck_125.kind === "Some") {
          let {value: [type_]} = $puck_125;
          return a.type_ = type_;
        }
        else {
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
    visitUnknownAccess: function (a) {
    const self = this;
    visit.walkExpression(self, a.object);
    let $puck_126 = getCoreType($unwrapTraitObject(self).scope, "Unknown", "unknown access");
    if (($unwrapTraitObject($puck_126).kind === "Ok")) {
      let {value: [[type_, $puck_127]]} = $unwrapTraitObject($puck_126);
      a.type_ = type_;
    }
    else {
      if ($unwrapTraitObject($puck_126).kind === "Err") {
        let {value: [err]} = $unwrapTraitObject($puck_126);
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownAccess', value: a, $isTraitObject: true}, err);
      };
    };
    return [];
  },
    visitUnknownIndexAccess: function (a) {
    const self = this;
    visit.walkUnknownIndexAccess(self, a);
    let $puck_128 = getCoreType($unwrapTraitObject(self).scope, "Unknown", "unknown access");
    if ($unwrapTraitObject($puck_128).kind === "Ok") {
      let {value: [[type_, $puck_129]]} = $unwrapTraitObject($puck_128);
      a.type_ = type_;
    }
    else {
      if ($unwrapTraitObject($puck_128).kind === "Err") {
        let {value: [err]} = $unwrapTraitObject($puck_128);
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownIndexAccess', value: a, $isTraitObject: true}, err);
      };
    };
    return [];
  },
    visitBooleanLiteral: function (l) {
    const self = this;
    const scope = $unwrapTraitObject(self).scope;
    l.scope = $unwrapTraitObject(self).scope;
    let $puck_130 = $puck_13.Scope.getBindingByTypeId.call(scope, "Bool");
    if ($puck_130.kind === "Some") {
      let {value: [binding]} = $puck_130;
      l.type_ = $puck_1.Option.unwrap.call(binding.type_.providesType);
    }
    else {
      reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:BooleanLiteral', value: l, $isTraitObject: true}, "puck:core::Bool is not in scope. Please import Bool from puck:core to use boolean literals.");
    };
    return [];
  },
    visitListLiteral: function (l) {
    const self = this;
    const scope = $unwrapTraitObject(self).scope;
    let $puck_131 = $puck_13.Scope.getBindingByTypeId.call(scope, "List");
    let $puck_132;
    if ($puck_131.kind === "Some") {
      let {value: [binding]} = $puck_131;
      $puck_132 = $puck_1.Option.unwrap.call(binding.type_.providesType);
    }
    else {
      return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral', value: l, $isTraitObject: true}, "puck:core::List is not in scope. Please import List from puck:core to use list literals.");
    };
    let listType = $puck_132;
    let type_ = $puck_1.None;
    if ($unwrapTraitObject(self).assignedTo) {
      const a = $unwrapTraitObject(self).assignedTo;
      let $puck_133 = a.kind;
      if ($puck_133.kind === "Struct") {
        let {value: [$puck_134]} = $puck_133;
        if ($puck_1.Option.unwrapOr.call(a.id, "") === "List") {
          type_ = $puck_1.Some(a);
        };
      };
    };
    visit.walkListLiteral(self, l);
    let $puck_135 = type_;
    if ($puck_135.kind === "Some") {
      let {value: [type_]} = $puck_135;
      l.type_ = type_;
    }
    else {
      if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true}) >= 1) {
        let $puck_136 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true}, function (m) {
          return $puck_4.Expression.getType.call(m);
        })
;
        const types = $puck_1.Iterable[$puck_136.type].toList.call($puck_136);
        let $puck_137 = $puck_16.findCommonType(types);
        if ($unwrapTraitObject($puck_137).kind === "Ok") {
          let {value: [type_]} = $unwrapTraitObject($puck_137);
          if ((!type_)) {
            l.type_ = listType;
          }
          else {
            l.type_ = $puck_16.createTypeInstance(listType, [type_]);
          };
        }
        else {
          if ($unwrapTraitObject($puck_137).kind === "Err") {
            let {value: [$puck_138]} = $unwrapTraitObject($puck_137);
            reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral', value: l, $isTraitObject: true}, "List contains mixed types");
          };
        };
      }
      else {
        l.type_ = listType;
      };
    };
    return [];
  },
    visitNumberLiteral: function (l) {
    const self = this;
    const scope = $unwrapTraitObject(self).scope;
    let $puck_139 = $puck_13.Scope.getBindingByTypeId.call(scope, "Num");
    if ($puck_139.kind === "Some") {
      let {value: [binding]} = $puck_139;
      l.type_ = $puck_1.Option.unwrap.call(binding.type_.providesType);
      return [];
    }
    else {
      return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NumberLiteral', value: l, $isTraitObject: true}, "puck:core::Num is not in scope. Please import Num from puck:core to use number literals.");
    };
  },
    visitRecordLiteral: function (l) {
    const self = this;
    l.scope = $unwrapTraitObject(self).scope;
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true}, function (m) {
      return $unwrapTraitObject(self).visitExpression(m.value);
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
      kind: $puck_17.StructKind.Record({properties: $puck_1.ObjectMap.fromIter($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true}, function (m) {
      return [
        m.name.name,
        $puck_4.Expression.getType.call(m.value),
      ];
    }))}),
    }),
      _class: $puck_1.None,
      instance: $puck_1.None,
      providesType: $puck_1.None,
      enumMember: $puck_1.None,
    });
  },
    visitStringLiteral: function (l) {
    const self = this;
    const scope = $unwrapTraitObject(self).scope;
    l.scope = $unwrapTraitObject(self).scope;
    let $puck_140 = $puck_13.Scope.getBindingByTypeId.call(scope, "String");
    if ($puck_140.kind === "Some") {
      let {value: [binding]} = $puck_140;
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
    let $puck_141 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.expressions, $isTraitObject: true}, function (e) {
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
      kind: $puck_17.StructKind.Tuple({properties: $puck_1.Iterable[$puck_141.type].toList.call($puck_141)}),
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
    let $puck_142 = p;
    let $puck_143;
    if ($unwrapTraitObject($puck_142).kind === "CatchAll") {
      let undefined = $unwrapTraitObject($puck_142);
      $puck_143 = $puck_17.Type.unused({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p, $isTraitObject: true},
      });
    }
    else {
      let $puck_144;
      if ($unwrapTraitObject($puck_142).kind === "Identifier") {
        let {value: {identifier: identifier}} = $unwrapTraitObject($puck_142);
        $puck_144 = $puck_2._undefined;
      }
      else {
        let $puck_145;
        if ($unwrapTraitObject($puck_142).kind === "Record") {
          let {value: [record]} = $unwrapTraitObject($puck_142);
          $puck_145 = record.type_;
        }
        else {
          let $puck_146;
          if ($unwrapTraitObject($puck_142).kind === "RecordType") {
            let {value: [typePath, record]} = $unwrapTraitObject($puck_142);
            const type_ = $unwrapTraitObject(typePath.providesType);
            if ((!$puck_16.isAssignable($unwrapTraitObject(record.type_), type_))) {
              reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p, $isTraitObject: true}, $puck_17.Type.displayName.call(type_) + " is not assignable to pattern " + $puck_4.RecordPattern.displayName.call(record));
            };
            $puck_146 = $puck_1.Option.mapOr.call(type_.enumMember, type_, function ([$puck_147, enum_]) {
              return enum_;
            });
          }
          else {
            let $puck_148;
            if (($unwrapTraitObject($puck_142).kind === "Tuple")) {
              let {value: [tuple]} = $unwrapTraitObject($puck_142);
              $puck_148 = tuple.type_;
            }
            else {
              let $puck_149;
              if ($unwrapTraitObject($puck_142).kind === "TupleType") {
                let {value: [typePath, tuple]} = $unwrapTraitObject($puck_142);
                const type_ = $unwrapTraitObject(typePath.providesType);
                if ((!$puck_16.isAssignable($unwrapTraitObject(tuple.type_), type_))) {
                  reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p, $isTraitObject: true}, $puck_17.Type.displayName.call(type_) + " is not assignable to pattern " + $puck_4.TuplePattern.displayName.call(tuple));
                };
                $puck_149 = $puck_1.Option.mapOr.call(type_.enumMember, type_, function ([$puck_150, enum_]) {
                  return enum_;
                });
              }
              else {
                let $puck_151;
                if (($unwrapTraitObject($puck_142).kind === "UnitType")) {
                  let {value: [typePath]} = $unwrapTraitObject($puck_142);
                  $puck_151 = $puck_2._undefined;
                };
                $puck_149 = $puck_151;
              };
              $puck_148 = $puck_149;
            };
            $puck_146 = $puck_148;
          };
          $puck_145 = $puck_146;
        };
        $puck_144 = $puck_145;
      };
      $puck_143 = $puck_144;
    };
    return p.type_ = $puck_143;
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
      return [
        p.property.name,
        p.pattern.type_,
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
    let $puck_152 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: p.properties, $isTraitObject: true}, function (p) {
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
      kind: $puck_17.StructKind.Tuple({properties: $puck_1.Iterable[$puck_152.type].toList.call($puck_152)}),
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
