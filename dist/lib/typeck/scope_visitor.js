'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.ScopeVisitorundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const core = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("util");
const $puck_4 = require("./../ast/ast");
const $puck_5 = require("./../ast/span");
const $puck_6 = require("./../ast/token");
const visit = require("./../ast/visit");
const $puck_7 = require("./src/enums");
const $puck_8 = require("./src/functions");
const $puck_9 = require("./src/impls");
const $puck_10 = require("./src/patterns");
const $puck_11 = require("./src/range");
const $puck_12 = require("./src/scope");
const $puck_13 = require("./src/structure_visitor");
const $puck_14 = require("./src/type_function");
const $puck_15 = require("./src/types");
const $puck_16 = require("./../entities");
function asType(a) {
  return $unwrapTraitObject(a);
};
function getBinding(e) {
  let $puck_17 = e;
  if ($unwrapTraitObject($puck_17).kind === "Identifier") {
    let {value: [i]} = $unwrapTraitObject($puck_17);
    const scope = $unwrapTraitObject(i.scope);
    return $puck_12.Scope.getBinding.call(scope, i.name);
  }
  else {
    if ($unwrapTraitObject($puck_17).kind === "IndexAccess") {
      let {value: [i]} = $unwrapTraitObject($puck_17);
      return getBinding(i.object);
    }
    else {
      if ($unwrapTraitObject($puck_17).kind === "MemberAccess") {
        let {value: [i]} = $unwrapTraitObject($puck_17);
        return getBinding(i.object);
      }
      else {
        if (true) {
          let $puck_18 = $puck_17;
          return $puck_1.None;
        };
      };
    };
  };
};
function getCoreType(scope, id, description) {
  let $puck_19 = $puck_12.Scope.getBindingByTypeId.call(scope, id);
  if ($puck_19.kind === "Some") {
    let {value: [binding]} = $puck_19;
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
  let $puck_20 = getCoreType($unwrapTraitObject(visitor).scope, trait_, desription);
  if ($unwrapTraitObject($puck_20).kind === "Ok") {
    let {value: [[$puck_21, binding]]} = $unwrapTraitObject($puck_20);
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
    if ($unwrapTraitObject($puck_20).kind === "Err") {
      let {value: [err]} = $unwrapTraitObject($puck_20);
      return $puck_1.Err(err);
    };
  };
};
function ScopeVisitor(context, file) {
  let importDirective;
  let matchExpression = $puck_1.None;
  const reportError = $unwrapTraitObject($unwrapTraitObject(context).reportError).bind(context, file);
  const reportFullError = $unwrapTraitObject($unwrapTraitObject(context).reportError).bind(context, file);
  let accessError = $puck_1.None;
  function checkFunctionCall(functionType, c) {
    if ((!functionType)) {
      return $puck_2._undefined;
    };
    let $puck_22 = c.func;
    let $puck_23;
    if ($unwrapTraitObject($puck_22).kind === "Identifier") {
      let {value: [i]} = $unwrapTraitObject($puck_22);
      $puck_23 = $puck_1.Some(i.name);
    }
    else {
      let $puck_24;
      if (true) {
        let $puck_25 = $puck_22;
        $puck_24 = $puck_1.None;
      };
      $puck_23 = $puck_24;
    };
    const namei = $puck_23;
    const name = $puck_1.Option.unwrapOrElse.call(namei, function () {
      return $puck_16.Type.displayName.call(functionType);
    });
    let $puck_26 = functionType.kind;
    let $puck_27;
    if ($unwrapTraitObject($puck_26).kind === "Function") {
      let {value: [func]} = $unwrapTraitObject($puck_26);
      $puck_27 = func;
    }
    else {
      let $puck_28;
      if (true) {
        let $puck_29 = $puck_26;
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: c, $isTraitObject: true}, "" + name + " is not callable");
        return $puck_2._undefined;
      };
      $puck_27 = $puck_28;
    };
    const _function = $puck_27;
    let $puck_30 = _function.selfBinding;
    if ($puck_30.kind === "Some") {
      let {value: [selfBinding]} = $puck_30;
      if (selfBinding.mutable) {
        if ((!$puck_1.Option.mapOr.call(getBinding(c.func), true, function (binding) {
          return binding.mutable;
        }))) {
          reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: c, $isTraitObject: true}, "" + name + " can only be called on a mutable binding");
        };
      };
    };
    let $puck_31 = $puck_11.checkRange(c.argumentList, _function.parameterRange, "arguments", name);
    if ($puck_31.kind === "Err") {
      let {value: [error]} = $puck_31;
      reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: c, $isTraitObject: true}, error);
      return _function;
    };
    let $puck_32 = c.typeArguments;
    if ($puck_32.kind === "Some") {
      let {value: [t]} = $puck_32;
      let $puck_33 = $puck_1.Option.orValue.call($puck_1.Option.andThen.call(functionType.instance, function (i) {
        return i._class._class;
      }), functionType._class);
      if ($puck_33.kind === "Some") {
        let {value: [_class]} = $puck_33;
        let $puck_34 = $puck_11.checkRange(t.typeArguments, _class.parameterRange, "type parameters", $puck_16.Type.displayName.call(functionType));
        if ($puck_34.kind === "Err") {
          let {value: [error]} = $puck_34;
          reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeArguments', value: t, $isTraitObject: true}, error);
        };
      }
      else {
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeArguments', value: t, $isTraitObject: true}, "Type " + $puck_16.Type.displayName.call(functionType) + " is not generic");
      };
    };
    let $puck_35 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: c.argumentList, $isTraitObject: true})
;
    $puck_1.Iterable[$puck_35.type].forEach.call($puck_35, function ([i, argument]) {
      const parameter = $puck_1.Option.unwrap.call($puck_1.List.get.call(_function.parameters, i));
      const parameterName = parameter.name;
      if ((!$puck_15.isAssignable(parameter.type_, $puck_4.Expression.getType.call(argument)))) {
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: argument, $isTraitObject: true}, $puck_13.notAssignableError(parameter.type_, $puck_4.Expression.getType.call(argument)) + " in parameter " + parameterName + " of function " + name + "");
      };
      if (parameter.mutable) {
        let $puck_36 = getBinding(argument);
        if (($puck_36.kind === "Some")) {
          let {value: [argumentBinding]} = $puck_36;
          const argumentName = argumentBinding.name;
          if ((!argumentBinding.mutable)) {
            return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: argument, $isTraitObject: true}, "Parameter " + parameterName + " of function " + name + " requires a mutable binding " + "but " + argumentName + " is declared as immutable.");
          };
        };
      };
    });
    return _function;
  };
  const structureVisitorInstance = $puck_13.structureVisitor(file, reportError, reportFullError);
  return $puck_2._Object.assign({}, visit.walkingVisitor, structureVisitorInstance, {
    reportError: reportError,
    visitModule: function (m) {
    let self = this;
    $unwrapTraitObject(self).scope = m.scope;
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: m.statements, $isTraitObject: true}, function (s) {
      let $puck_37 = s;
      if (($unwrapTraitObject($puck_37).kind === "ExportDirective" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_37).value)[0]).statement).kind === "FunctionDeclaration")) {
        let {value: [{statement: {value: [f]}}]} = $unwrapTraitObject($puck_37);
        return $unwrapTraitObject(self).visitFunctionDeclaration(f, true);
      }
      else {
        if (($unwrapTraitObject($puck_37).kind === "BlockLevelStatement" && ($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_37).value)[0]).kind === "Expression" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_37).value)[0]).value)[0]).kind === "FunctionDeclaration"))) {
          let {value: [{value: [{value: [f]}]}]} = $unwrapTraitObject($puck_37);
          return $unwrapTraitObject(self).visitFunctionDeclaration(f, true);
        }
        else {
          if (true) {
            let $puck_38 = $puck_37;;
            let $puck_39 = $puck_38;;
            return $puck_38;
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
    let $puck_40 = s;
    if ($unwrapTraitObject($puck_40).kind === "Expression") {
      let {value: [e]} = $unwrapTraitObject($puck_40);
      return $unwrapTraitObject(self).visitExpression(e, assignedTo, isUsed);
    }
    else {
      if (true) {
        let $puck_41 = $puck_40;
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
      let $puck_42 = s;
      if (($unwrapTraitObject($puck_42).kind === "Expression" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_42).value)[0]).kind === "FunctionDeclaration")) {
        let {value: [{value: [f]}]} = $unwrapTraitObject($puck_42);
        return $unwrapTraitObject(self).visitFunctionDeclaration(f, true);
      }
      else {
        if (true) {
          let $puck_43 = $puck_42;;
          let $puck_44 = $puck_43;;
          return $puck_43;
        };
      };
    });
    const lastIndex = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true}) - 1;
    let $puck_45 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true})
;
    $puck_1.Iterable[$puck_45.type].forEach.call($puck_45, function ([index, s]) {
      if ((index === lastIndex)) {
        return $unwrapTraitObject(self).visitBlockLevelStatement(s, assignedTo, isUsed);
      }
      else {
        return $unwrapTraitObject(self).visitBlockLevelStatement(s, $puck_2._undefined, false);
      };
    });
    let $puck_46 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].last.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: b.statements, $isTraitObject: true});
    let $puck_47;
    if ($puck_46.kind === "Some") {
      let {value: [last]} = $puck_46;
      $puck_47 = $puck_4.BlockLevelStatement.getType.call(last);
    }
    else {
      $puck_47 = $puck_16.Type.empty({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Block', value: b, $isTraitObject: true},
      });
    };
    return b.type_ = $puck_47;
  },
    visitBreak: function (b) {
    const self = this;
    return b.scope = $unwrapTraitObject(self).scope;
  },
    visitReturn: function (r) {
    let self = this;
    visit.walkReturnStatement(self, r);
    let $puck_48 = $unwrapTraitObject($unwrapTraitObject(self).functionContext).returnType;
    if ($puck_48.kind === "Some") {
      let {value: [returnType]} = $puck_48;
      if ((!$puck_15.isAssignable($unwrapTraitObject(returnType), $puck_4.Expression.getType.call(r.expression)))) {
        return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: r.expression, $isTraitObject: true}, $puck_13.notAssignableError($unwrapTraitObject(returnType), $puck_4.Expression.getType.call(r.expression)));
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
    $unwrapTraitObject(self).scope = $puck_12.Scope.createChild.call(parentScope);
    e.scope = $unwrapTraitObject(self).scope;
    $unwrapTraitObject(self).visitExpression(e.condition);
    $unwrapTraitObject(self).visitBlock(e.body, false);
    e.type_ = $puck_16.Type.empty({
      file: file,
      token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:WhileLoop', value: e, $isTraitObject: true},
    });
    return $unwrapTraitObject(self).scope = parentScope;
  },
    visitIdentifier: function (i) {
    const self = this;
    const scope = $unwrapTraitObject(self).scope;
    i.scope = $unwrapTraitObject(self).scope;
    let $puck_49 = $puck_12.Scope.getBinding.call(scope, i.name);
    if ($puck_49.kind === "Some") {
      let {value: [binding]} = $puck_49;
      let b = binding;
      i.binding = binding;
      let $puck_50;
      if ((binding.type_ && $puck_1.Option.isSome.call(binding.type_.providesType))) {
        $puck_50 = $puck_14.enumMemberToFunction(b.type_);
      }
      else {
        $puck_50 = binding.type_;
      };
      i.type_ = $puck_50;
    }
    else {
      reportFullError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: i, $isTraitObject: true}, "Use of undefined variable " + i.name, $puck_16.CompilationError.UndefinedVariable(i.name));
    };
    return [];
  },
    visitFunctionDeclaration: function (f, isHoisting = false) {
    let self = this;
    structureVisitorInstance.visitFunctionDeclaration.call(self, f);
    if ((!isHoisting)) {
      const selfScope = $unwrapTraitObject(self).scope;
      $unwrapTraitObject(self).scope = f.scope;
      if ($unwrapTraitObject(self).variableDeclarationScope) {
        const vdScope = $unwrapTraitObject(self).variableDeclarationScope;
        let fScope = $unwrapTraitObject(self).scope;
        let bindings = fScope.bindings;
        let $puck_51 = vdScope.parent;
        if ($puck_51.kind === "Some") {
          let {value: [vdParent]} = $puck_51;
          while (true) {
            let $puck_52 = fScope.parent;
            if ($puck_52.kind === "Some") {
              let {value: [fParent]} = $puck_52;
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
        $unwrapTraitObject(self).scope = $puck_12.Scope({
          context: $unwrapTraitObject($unwrapTraitObject(self).scope).context,
          parent: $puck_1.Some($unwrapTraitObject(self).variableDeclarationScope),
          bindings: bindings,
          bindingsByTypeId: $unwrapTraitObject($unwrapTraitObject(self).scope).bindingsByTypeId,
        });
      };
      let $puck_53 = f.body;
      if ($puck_53.kind === "Some") {
        let {value: [body]} = $puck_53;
        const parentAssignedTo = $unwrapTraitObject(self).assignedTo;
        const parentContext = $unwrapTraitObject(self).functionContext;
        let isUsed = true;
        $unwrapTraitObject(self).functionContext = {
          returnType: $puck_1.None,
          returnTypes: [],
        };
        let $puck_54 = f.type_.kind;
        if ($puck_54.kind === "Function") {
          let {value: [func]} = $puck_54;
          $unwrapTraitObject(self).assignedTo = func.returnType;
          if (func.returnType) {
            $unwrapTraitObject($unwrapTraitObject(self).functionContext).returnType = $puck_1.Some(func.returnType);
            if ($puck_16.Type.isEmpty.call(func.returnType)) {
              isUsed = false;
            };
          };
        };
        $unwrapTraitObject(self).visitBlock(body, isUsed);
        let $puck_55 = $unwrapTraitObject(self).functionContext;
        if ($puck_55.kind === "None") {
          let undefined = $puck_55;
        };
        let $puck_56 = f.type_.kind;
        if ($puck_56.kind === "Function") {
          let {value: [func]} = $puck_56;
          if (func.returnType) {
            if ((!$puck_15.isAssignable(func.returnType, body.type_) && !$puck_16.Type.isEmpty.call(func.returnType))) {
              reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: f, $isTraitObject: true}, $puck_13.notAssignableError(func.returnType, body.type_));
            };
          }
          else {
            let types = $unwrapTraitObject($unwrapTraitObject(self).functionContext).returnTypes;
            if (body.type_) {
              $puck_1.List.push.call(types, body.type_);
            };
            if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isNotEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: types, $isTraitObject: true})) {
              let $puck_57 = $puck_15.findCommonType(types);
              if ($unwrapTraitObject($puck_57).kind === "Ok") {
                let {value: [type_]} = $unwrapTraitObject($puck_57);
                $puck_2._Object.assign(func, {returnType: body.type_});
              }
              else {
                if ($unwrapTraitObject($puck_57).kind === "Err") {
                  let {value: [$puck_58]} = $unwrapTraitObject($puck_57);
                  reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: f, $isTraitObject: true}, "No best common type exists among return expressions. Found " + $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: types, $isTraitObject: true}, function (type_) {
                    return $puck_16.Type.displayName.call(type_);
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
    let $puck_59;
    if (visitInitializer) {
      $puck_59 = visitInitializer;
    }
    else {
      $puck_59 = function (e) {
        $unwrapTraitObject(self).isUsed = true;
        return $unwrapTraitObject(self).visitExpression(e, d.type_);
      };
    };
    return structureVisitorInstance.visitVariableDeclaration.call(self, d, $puck_59, type_);
  },
    visitAssignmentExpression: function (e) {
    const self = this;
    e.scope = $unwrapTraitObject(self).scope;
    let $puck_60 = e.lhs;
    if (($puck_60.kind === "IndexAccess")) {
      let {value: [a]} = $puck_60;
      visit.walkIndexAccess(self, a);
      $unwrapTraitObject(self).visitExpression(e.rhs);
    }
    else {
      visit.walkAssignmentExpression(self, e);
    };
    let $puck_61 = getBinding(e.lhs);
    if ($puck_61.kind === "Some") {
      let {value: [binding]} = $puck_61;
      if ((!binding.mutable)) {
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:AssignmentExpression', value: e, $isTraitObject: true}, "Can't assign to immutable variable " + binding.name);
      };
      if ((!$puck_15.isAssignable($puck_4.Expression.getType.call(e.lhs), $puck_4.Expression.getType.call(e.rhs)))) {
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:AssignmentExpression', value: e, $isTraitObject: true}, $puck_13.notAssignableError($puck_4.Expression.getType.call(e.lhs), $puck_4.Expression.getType.call(e.rhs)));
      };
    };
    return e.type_ = ($puck_4.Expression.getType.call(e.lhs) || $puck_4.Expression.getType.call(e.rhs));
  },
    visitBinaryExpression: function (e) {
    const self = this;
    let $puck_62 = e.operator.kind;
    if ($unwrapTraitObject($puck_62).kind === "EqualsEqualsToken") {
      let undefined = $unwrapTraitObject($puck_62);
      return asTraitCall(self, e, "PartialEq", "eq", "equal operators");
    }
    else {
      if ($unwrapTraitObject($puck_62).kind === "ExclamationEqualsToken") {
        let undefined = $unwrapTraitObject($puck_62);
        return asTraitCall(self, e, "PartialEq", "ne", "equal operators");
      }
      else {
        if ($unwrapTraitObject($puck_62).kind === "LessThanToken") {
          let undefined = $unwrapTraitObject($puck_62);
          return asTraitCall(self, e, "PartialOrd", "lt", "comparison operators");
        }
        else {
          if ($unwrapTraitObject($puck_62).kind === "LessThanEqualsToken") {
            let undefined = $unwrapTraitObject($puck_62);
            return asTraitCall(self, e, "PartialOrd", "le", "comparison operators");
          }
          else {
            if ($unwrapTraitObject($puck_62).kind === "GreaterThanToken") {
              let undefined = $unwrapTraitObject($puck_62);
              return asTraitCall(self, e, "PartialOrd", "gt", "comparison operators");
            }
            else {
              if ($unwrapTraitObject($puck_62).kind === "GreaterThanEqualsToken") {
                let undefined = $unwrapTraitObject($puck_62);
                return asTraitCall(self, e, "PartialOrd", "ge", "comparison operators");
              }
              else {
                if (true) {
                  let $puck_63 = $puck_62;
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
    let $puck_64 = e.func;
    if ($puck_64.kind === "MemberAccess") {
      let {value: [access]} = $puck_64;
      $unwrapTraitObject(self).visitMemberAccess(access, true);
      functionType = $puck_4.Expression.getType.call(e.func);
      if ($puck_4.Expression.getType.call(access.object)) {
        const name = access.member.name;
        const objectType = $puck_4.Expression.getType.call(access.object);
        let $puck_65 = objectType.providesType;
        if ($puck_65.kind === "Some") {
          let {value: [providesType]} = $puck_65;
          let $puck_66 = providesType.kind;
          if ($unwrapTraitObject($puck_66).kind === "Enum") {
            let {value: [enum_]} = $unwrapTraitObject($puck_66);
            functionType = $puck_1.Option.unwrapOr.call($puck_1.Option.andThen.call($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: enum_.implementations, $isTraitObject: true}, function ({trait_: trait_}) {
              return $puck_16.Type.getTrait.call(trait_).isShorthand;
            }), function ({trait_: trait_}) {
              return $puck_1.ObjectMap.get.call($puck_16.Type.getTrait.call(trait_).functions, name);
            }), $unwrapTraitObject($puck_2._undefined));
          }
          else {
            if ($unwrapTraitObject($puck_66).kind === "Struct") {
              let {value: [struct]} = $unwrapTraitObject($puck_66);
              functionType = $puck_1.Option.unwrapOr.call($puck_1.Option.andThen.call($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: struct.implementations, $isTraitObject: true}, function ({trait_: trait_}) {
                return $puck_16.Type.getTrait.call(trait_).isShorthand;
              }), function ({trait_: trait_}) {
                return $puck_1.ObjectMap.get.call($puck_16.Type.getTrait.call(trait_).functions, name);
              }), $unwrapTraitObject($puck_2._undefined));
            }
            else {
              if ($unwrapTraitObject($puck_66).kind === "Trait") {
                let {value: [trait_]} = $unwrapTraitObject($puck_66);
                functionType = $puck_1.Option.unwrapOr.call($puck_1.ObjectMap.get.call(trait_.functions, name), $unwrapTraitObject($puck_2._undefined));
              }
              else {
                if (true) {
                  let $puck_67 = $puck_66;
                };
              };
            };
          };
          if (functionType) {
            const _function = $puck_16.Type.getFunction.call(functionType);
            let $puck_68 = _function.selfBinding;
            if ($puck_68.kind === "Some") {
              let {value: [selfBinding]} = $puck_68;
              functionType = {
                definition: functionType.definition,
                id: functionType.id,
                displayName: functionType.displayName,
                name: functionType.name,
                kind: $puck_16.TypeKind.Function({
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
              let $puck_69 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true});
              if (($puck_69.kind === "Some")) {
                let {value: [selfArgument]} = $puck_69;
                skipFirstArgument = true;
                $unwrapTraitObject(self).visitExpression(selfArgument);
                if ((!$puck_4.Expression.getType.call(selfArgument))) {
                  reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: selfArgument, $isTraitObject: true}, "selfArgument has no type");
                };
                let $puck_70 = $puck_9.getImplementationForTrait($puck_4.Expression.getType.call(selfArgument), $puck_1.Option.unwrapOr.call(objectType.providesType, objectType));
                if (($unwrapTraitObject($puck_70).kind === "Ok" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_70).value)[0]).kind === "Some")) {
                  let {value: [{value: [implementation]}]} = $unwrapTraitObject($puck_70);
                  e.traitName = $puck_1.Option.unwrap.call($puck_12.Scope.getBindingByTypeId.call(scope, $puck_1.Option.unwrap.call(providesType.id))).name;
                  e.traitBinding = $puck_1.Option.unwrap.call($puck_12.Scope.getBindingByTypeId.call(scope, $puck_1.Option.unwrap.call(providesType.id)));
                  e.isDirectTraitCall = true;
                  e.implementation = implementation;
                  if ($puck_1.Option.isSome.call(providesType._class)) {
                    let $puck_71 = $puck_9.resolveImplTypeParameters($unwrapTraitObject(e.implementation), $puck_4.Expression.getType.call(selfArgument));
                    if ($unwrapTraitObject($puck_71).kind === "Ok") {
                      let {value: [resolvedTrait]} = $unwrapTraitObject($puck_71);
                      let parameterMap = $puck_1.Option.unwrap.call(resolvedTrait.instance).parameterMap;
                      functionType = $unwrapTraitObject($puck_15.resolveTypeParameters(parameterMap)(functionType));
                    }
                    else {
                      if ($unwrapTraitObject($puck_71).kind === "Err") {
                        let {value: [[to, subject]]} = $unwrapTraitObject($puck_71);
                        return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true}, $puck_13.notAssignableError(to, subject));
                      };
                    };
                  };
                }
                else {
                  if (($unwrapTraitObject($puck_70).kind === "Ok" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_70).value)[0]).kind === "None")) {
                    let {value: []} = $unwrapTraitObject($puck_70);
                    reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true}, $puck_16.Type.displayName.call(objectType) + " has not been implemented for type " + $puck_16.Type.displayName.call($puck_4.Expression.getType.call(selfArgument)));
                  }
                  else {
                    if (true) {
                      const Err = $puck_70;
                      reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true}, "Ambiguous trait call");
                    };
                  };
                };
              };
            }
            else {
              e.traitName = $puck_1.Option.unwrap.call($puck_12.Scope.getBindingByTypeId.call(scope, $puck_1.Option.unwrap.call(providesType.id))).name;
              e.traitBinding = $puck_1.Option.unwrap.call($puck_12.Scope.getBindingByTypeId.call(scope, $puck_1.Option.unwrap.call(providesType.id)));
              e.isTraitObject = true;
            };
          }
          else {
            reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true}, $puck_16.Type.displayName.call(providesType) + " has no function named " + name + "");
          };
        }
        else {
          let $puck_72 = objectType.kind;
          if (($puck_72.kind === "Trait")) {
            let {value: [trait_]} = $puck_72;
            let $puck_73 = $puck_1.ObjectMap.get.call(trait_.functions, name);
            if ($puck_73.kind === "Some") {
              let {value: [func]} = $puck_73;
              functionType = func;
              const _function = $puck_16.Type.getFunction.call(functionType);
              if ($puck_1.Option.isSome.call(_function.selfBinding)) {
                let $puck_74 = $puck_12.Scope.getBindingByTypeId.call(scope, $puck_1.Option.unwrap.call(objectType.id));
                if ($puck_74.kind === "Some") {
                  let {value: [binding]} = $puck_74;
                  e.traitName = binding.name;
                  e.traitBinding = binding;
                  e.isTraitObject = true;
                }
                else {
                  const typeName = $puck_1.Option.unwrap.call(objectType.name);
                  reportFullError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true}, "The function " + name + " is defined in trait " + typeName + " but it is not in scope", $puck_16.CompilationError.TraitNotInScope({
                    name: typeName,
                    id: $puck_1.Option.unwrap.call(objectType.id),
                  }));
                };
              };
            };
          }
          else {
            let $puck_75 = $puck_9.getImplementation(name, objectType, e);
            if (($unwrapTraitObject($puck_75).kind === "Ok" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_75).value)[0]).kind === "Some")) {
              let {value: [{value: [implementation]}]} = $unwrapTraitObject($puck_75);
              let $puck_76 = implementation.trait_.instance;
              let $puck_77;
              if ($puck_76.kind === "Some") {
                let {value: [instance]} = $puck_76;
                $puck_77 = instance._class;
              }
              else {
                $puck_77 = implementation.trait_;
              };
              const trait_ = $puck_77;
              let $puck_78 = $puck_12.Scope.getBindingByTypeId.call(scope, $puck_1.Option.unwrap.call(trait_.id));
              if ($puck_78.kind === "Some") {
                let {value: [binding]} = $puck_78;
                e.traitName = binding.name;
                e.traitBinding = binding;
                e.isShorthand = $puck_16.Type.getTrait.call(trait_).isShorthand;
                e.implementation = implementation;
                functionType = $puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: $puck_16.Type.getTrait.call(implementation.trait_).functions, $isTraitObject: true}, name);
              }
              else {
                const traitName = $puck_1.Option.unwrap.call(trait_.name);
                reportFullError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true}, "The function " + name + " is defined in trait " + traitName + " but it is not in scope", $puck_16.CompilationError.TraitNotInScope({
                  name: traitName,
                  id: $puck_1.Option.unwrap.call(trait_.id),
                }));
              };
            }
            else {
              if ($unwrapTraitObject($puck_75).kind === "Ok") {
                let {value: [None]} = $unwrapTraitObject($puck_75);
              }
              else {
                if (true) {
                  const Err = $puck_75;
                  reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:CallExpression', value: e, $isTraitObject: true}, "Ambiguous trait call");
                };
              };
            };
          };
          if (e.traitName) {
            let $puck_79 = objectType.instance;
            if ($puck_79.kind === "Some") {
              let {value: [instance]} = $puck_79;
              functionType = $unwrapTraitObject($puck_15.resolveTypeParameters(instance.parameterMap)(functionType));
            };
          };
        };
      };
      if (e.traitName) {
        accessError = $puck_1.None;
      }
      else {
        let $puck_80 = accessError;
        if ($puck_80.kind === "Some") {
          let {value: [[token, message]]} = $puck_80;
          reportError(token, message);
          accessError = $puck_1.None;
        };
      };
    }
    else {
      $unwrapTraitObject(self).visitExpression(e.func);
      functionType = $puck_4.Expression.getType.call(e.func);
      let $puck_81 = e.func;
      if ($puck_81.kind === "UnknownAccess") {
        let {value: [$puck_82]} = $puck_81;
        isUnknownCall = true;
      }
      else {
        let $puck_83 = e.func;
        if ($puck_83.kind === "UnknownIndexAccess") {
          let {value: [$puck_84]} = $puck_83;
          isUnknownCall = true;
        };
      };
    };
    let $puck_85 = e.typeArguments;
    if ($puck_85.kind === "Some") {
      let {value: [t]} = $puck_85;
      const callParameterMap = $puck_1.ObjectMap._new();
      $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeArguments, $isTraitObject: true}, function (t) {
        return $unwrapTraitObject(self).visitTypeBound(t);
      });
      if (functionType) {
        let $puck_86 = functionType._class;
        if ($puck_86.kind === "Some") {
          let {value: [_class]} = $puck_86;
          if ($puck_1.Range.contains.call(_class.parameterRange, $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeArguments, $isTraitObject: true}))) {
            let $puck_87 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeArguments, $isTraitObject: true}, function (t) {
              return $puck_4.TypeBound.getType.call(t);
            })
;
            functionType = $puck_15.createTypeInstance(functionType, $puck_1.Iterable[$puck_87.type].toList.call($puck_87));
          };
        };
      };
    };
    if ((!isUnknownCall && functionType && $puck_16.Type.isFunction.call(functionType))) {
      const callTypeParameters = $puck_1.Option.unwrapOr.call($puck_1.Option.map.call(functionType._class, function (_class) {
        return _class.typeParameters;
      }), []);
      let callParameterMap = $puck_1.ObjectMap._new();
      let functionKind = $puck_16.Type.getFunction.call(functionType);
      const resolveParameter = $puck_15.resolveTypeParameters(callParameterMap, false);
      let $puck_89 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].enumerate.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.argumentList, $isTraitObject: true})
;
      let $puck_88 = $puck_1.Iterable[$puck_89.type].take.call($puck_89, $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: functionKind.parameters, $isTraitObject: true}))
;
      $puck_1.Iterable[$puck_88.type].forEach.call($puck_88, function ([i, a]) {
        let parameter = $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: functionKind.parameters, $isTraitObject: true}, i);
        let $puck_90;
        if ((!parameter.type_ || $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: callTypeParameters, $isTraitObject: true}))) {
          $puck_90 = parameter.type_;
        }
        else {
          $puck_90 = resolveParameter(parameter.type_);
        };
        const parameterType = $puck_90;
        if ((!skipFirstArgument || i > 0)) {
          $unwrapTraitObject(self).visitExpression(a, parameterType);
        };
        if (($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isNotEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: callTypeParameters, $isTraitObject: true}) && parameterType && $puck_4.Expression.getType.call(a))) {
          return $puck_8.resolveFunctionTypeParameters(callParameterMap, callTypeParameters, parameterType, $puck_4.Expression.getType.call(a));
        };
      });
      if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isNotEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: callTypeParameters, $isTraitObject: true})) {
        functionType = $unwrapTraitObject($puck_15.resolveTypeParameters(callParameterMap)(functionType));
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
    $unwrapTraitObject(self).scope = $puck_12.Scope.createChild.call(parentScope);
    $unwrapTraitObject(self).visitBlock(e.then_, isUsed && $puck_1.Option.isSome.call(e.else_));
    let $puck_91 = e.else_;
    if ($puck_91.kind === "Some") {
      let {value: [else_]} = $puck_91;
      $unwrapTraitObject(self).scope = $puck_12.Scope.createChild.call(parentScope);
      $unwrapTraitObject(self).visitBlock(else_, isUsed);
    };
    if (isUsed) {
      let $puck_92 = e.else_;
      let $puck_93;
      if ($puck_92.kind === "Some") {
        let {value: [else_]} = $puck_92;
        let $puck_94 = $puck_15.findCommonType([
          e.then_.type_,
          else_.type_,
        ]);
        let $puck_95;
        if ($unwrapTraitObject($puck_94).kind === "Ok") {
          let {value: [type_]} = $unwrapTraitObject($puck_94);
          $puck_95 = type_;
        }
        else {
          let $puck_96;
          if ($unwrapTraitObject($puck_94).kind === "Err") {
            let {value: [$puck_97]} = $unwrapTraitObject($puck_94);
            reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression', value: e, $isTraitObject: true}, "Type " + $puck_16.Type.displayName.call(e.then_.type_) + " and " + $puck_16.Type.displayName.call(else_.type_) + " is not compatible");
            $puck_96 = $puck_16.Type.empty({
              file: file,
              token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression', value: e, $isTraitObject: true},
            });
          };
          $puck_95 = $puck_96;
        };
        $puck_93 = $puck_95;
      }
      else {
        $puck_93 = $puck_16.Type.empty({
          file: file,
          token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfExpression', value: e, $isTraitObject: true},
        });
      };
      e.type_ = $puck_93;
    };
    return $unwrapTraitObject(self).scope = parentScope;
  },
    visitIfLetExpression: function (e) {
    let self = this;
    const parentScope = $unwrapTraitObject(self).scope;
    e.scope = $unwrapTraitObject(self).scope;
    $unwrapTraitObject(self).scope = $puck_12.Scope.createChild.call(parentScope);
    const isUsed = $unwrapTraitObject(self).isUsed;
    $unwrapTraitObject(self).visitPattern(e.pattern);
    $unwrapTraitObject(self).visitExpression(e.expression);
    let $puck_98 = $puck_10.declarePatternVariables($unwrapTraitObject(self).scope, self, e.pattern, $puck_4.Expression.getType.call(e.expression), true);
    if (($unwrapTraitObject($puck_98).kind === "Ok")) {
      let {value: [$puck_99]} = $unwrapTraitObject($puck_98);
    }
    else {
      if (($unwrapTraitObject($puck_98).kind === "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_98).value)[0]).kind === "PatternMismatch")) {
        let {value: [{value: [pattern, to, subject]}]} = $unwrapTraitObject($puck_98);
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: e.expression, $isTraitObject: true}, $puck_13.notAssignableError(to, subject));
      }
      else {
        if (($unwrapTraitObject($puck_98).kind === "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_98).value)[0]).kind === "ScopeError")) {
          let {value: [{value: [token, err]}]} = $unwrapTraitObject($puck_98);
          reportError(token, err);
        }
        else {
          if (($unwrapTraitObject($puck_98).kind === "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_98).value)[0]).kind === "NotExhaustive")) {
            let {value: []} = $unwrapTraitObject($puck_98);
          };
        };
      };
    };
    const expressionScope = $unwrapTraitObject(self).scope;
    $unwrapTraitObject(self).scope = $puck_12.Scope.createChild.call(expressionScope);
    $unwrapTraitObject(self).visitBlock(e.then_, isUsed);
    let $puck_100 = e.else_;
    if ($puck_100.kind === "Some") {
      let {value: [else_]} = $puck_100;
      $unwrapTraitObject(self).scope = $puck_12.Scope.createChild.call(expressionScope);
      $unwrapTraitObject(self).visitBlock(else_, isUsed);
    };
    if (isUsed) {
      let $puck_101 = e.else_;
      let $puck_102;
      if ($puck_101.kind === "Some") {
        let {value: [else_]} = $puck_101;
        let $puck_103 = $puck_15.findCommonType([
          e.then_.type_,
          else_.type_,
        ]);
        let $puck_104;
        if ($unwrapTraitObject($puck_103).kind === "Ok") {
          let {value: [type_]} = $unwrapTraitObject($puck_103);
          $puck_104 = type_;
        }
        else {
          let $puck_105;
          if ($unwrapTraitObject($puck_103).kind === "Err") {
            let {value: [$puck_106]} = $unwrapTraitObject($puck_103);
            reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression', value: e, $isTraitObject: true}, "Type " + $puck_16.Type.displayName.call(e.then_.type_) + " and " + $puck_16.Type.displayName.call(else_.type_) + " is not compatible");
            $puck_105 = $puck_16.Type.empty({
              file: file,
              token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression', value: e, $isTraitObject: true},
            });
          };
          $puck_104 = $puck_105;
        };
        $puck_102 = $puck_104;
      }
      else {
        $puck_102 = $puck_16.Type.empty({
          file: file,
          token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IfLetExpression', value: e, $isTraitObject: true},
        });
      };
      e.type_ = $puck_102;
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
    let $puck_107 = $puck_7.checkExhaustive(e);
    if ($puck_107.kind === "Err") {
      let {value: [error]} = $puck_107;
      reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true}, error);
    };
    if (isUsed) {
      let $puck_108;
      if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isNotEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true})) {
        let $puck_110 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true}, function (arm) {
          return arm.type_;
        })
;
        let $puck_109 = $puck_15.findCommonType($puck_1.Iterable[$puck_110.type].toList.call($puck_110));
        let $puck_111;
        if ($unwrapTraitObject($puck_109).kind === "Ok") {
          let {value: [type_]} = $unwrapTraitObject($puck_109);
          $puck_111 = type_;
        }
        else {
          let $puck_112;
          if ($unwrapTraitObject($puck_109).kind === "Err") {
            let {value: [$puck_113]} = $unwrapTraitObject($puck_109);
            reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true}, "Match arms return mixed types " + $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: e.patterns, $isTraitObject: true}, function (arm) {
              return $puck_16.Type.displayName.call(asType($unwrapTraitObject(arm.type_)));
            }).value.join(", "));
            $puck_112 = $puck_16.Type.empty({
              file: file,
              token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true},
            });
          };
          $puck_111 = $puck_112;
        };
        $puck_108 = $puck_111;
      }
      else {
        $puck_108 = $puck_16.Type.empty({
          file: file,
          token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchExpression', value: e, $isTraitObject: true},
        });
      };
      e.type_ = $puck_108;
    };
    matchExpression = oldMatchExpression;
    return [];
  },
    visitMatchArm: function (a, isUsed) {
    let self = this;
    const parentScope = $unwrapTraitObject(self).scope;
    $unwrapTraitObject(self).scope = $puck_12.Scope.createChild.call(parentScope);
    a.scope = $unwrapTraitObject(self).scope;
    const m = $puck_1.Option.unwrap.call(matchExpression);
    $unwrapTraitObject(self).visitPattern(a.pattern);
    let $puck_114 = $puck_10.declarePatternVariables($unwrapTraitObject(self).scope, self, a.pattern, $puck_4.Expression.getType.call(m.expression), true);
    if (($unwrapTraitObject($puck_114).kind === "Ok")) {
      let {value: [$puck_115]} = $unwrapTraitObject($puck_114);
    }
    else {
      if (($unwrapTraitObject($puck_114).kind === "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_114).value)[0]).kind === "PatternMismatch")) {
        let {value: [{value: [pattern, to, subject]}]} = $unwrapTraitObject($puck_114);
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:MatchArm', value: a, $isTraitObject: true}, $puck_13.notAssignableError(to, subject));
      }
      else {
        if (($unwrapTraitObject($puck_114).kind === "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_114).value)[0]).kind === "ScopeError")) {
          let {value: [{value: [token, err]}]} = $unwrapTraitObject($puck_114);
          reportError(token, err);
        }
        else {
          if (($unwrapTraitObject($puck_114).kind === "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_114).value)[0]).kind === "NotExhaustive")) {
            let {value: []} = $unwrapTraitObject($puck_114);
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
      return e.type_ = $puck_14.enumMemberToFunction(type_);
    };
  },
    visitUnaryExpression: function (e) {
    const self = this;
    const scope = $unwrapTraitObject(self).scope;
    e.scope = $unwrapTraitObject(self).scope;
    visit.walkUnaryExpression(self, e);
    let $puck_116 = e.operator.kind;
    if ($unwrapTraitObject($puck_116).kind === "NotKeyword") {
      let undefined = $unwrapTraitObject($puck_116);
      let $puck_117 = $puck_12.Scope.getBindingByTypeId.call(scope, "Bool");
      if ($puck_117.kind === "Some") {
        let {value: [binding]} = $puck_117;
        e.type_ = $puck_1.Option.unwrap.call(binding.type_.providesType);
      }
      else {
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true}, "puck:core::Bool is not in scope. Please import Bool from puck:core to use boolean literals.");
      };
    }
    else {
      if ($unwrapTraitObject($puck_116).kind === "MinusToken") {
        let undefined = $unwrapTraitObject($puck_116);
        let $puck_118 = $puck_12.Scope.getBindingByTypeId.call(scope, "Num");
        if ($puck_118.kind === "Some") {
          let {value: [binding]} = $puck_118;
          e.type_ = $puck_1.Option.unwrap.call(binding.type_.providesType);
        }
        else {
          reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true}, "puck:core::Num is not in scope. Please import Num from puck:core to use number literals.");
        };
      }
      else {
        if ($unwrapTraitObject($puck_116).kind === "PlusToken") {
          let undefined = $unwrapTraitObject($puck_116);
          let $puck_119 = $puck_12.Scope.getBindingByTypeId.call(scope, "Num");
          if ($puck_119.kind === "Some") {
            let {value: [binding]} = $puck_119;
            e.type_ = $puck_1.Option.unwrap.call(binding.type_.providesType);
          }
          else {
            reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnaryExpression', value: e, $isTraitObject: true}, "puck:core::Num is not in scope. Please import Num from puck:core to use number literals.");
          };
        }
        else {
          if (true) {
            let $puck_120 = $puck_116;
          };
        };
      };
    };
    return [];
  },
    visitIndexAccess: function (a) {
    const self = this;
    let $puck_121 = getCoreType($unwrapTraitObject(self).scope, "Index", "index access");
    if ($unwrapTraitObject($puck_121).kind === "Ok") {
      let {value: [[$puck_122, binding]]} = $unwrapTraitObject($puck_121);
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
      if ($unwrapTraitObject($puck_121).kind === "Err") {
        let {value: [err]} = $unwrapTraitObject($puck_121);
        return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:IndexAccess', value: a, $isTraitObject: true}, err);
      };
    };
  },
    visitMemberAccess: function (a, inCallExpression = false) {
    const self = this;
    $unwrapTraitObject(self).visitExpression(a.object);
    if ($puck_4.Expression.getType.call(a.object)) {
      let $puck_123 = $puck_4.Expression.getType.call(a.object).kind;
      if (($puck_123.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_123.value)[0]).kind).kind === "Record")) {
        let {value: [{kind: {value: [record]}}]} = $puck_123;
        let $puck_124 = $puck_1.ObjectMap.get.call(record.properties, a.member.name);
        if ($puck_124.kind === "Some") {
          let {value: [type_]} = $puck_124;
          return a.type_ = type_;
        }
        else {
          const message = $puck_16.Type.displayName.call($puck_4.Expression.getType.call(a.object)) + " has no property " + a.member.name;
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
    let $puck_125 = getCoreType($unwrapTraitObject(self).scope, "Unknown", "unknown access");
    if (($unwrapTraitObject($puck_125).kind === "Ok")) {
      let {value: [[type_, $puck_126]]} = $unwrapTraitObject($puck_125);
      a.type_ = type_;
    }
    else {
      if ($unwrapTraitObject($puck_125).kind === "Err") {
        let {value: [err]} = $unwrapTraitObject($puck_125);
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownAccess', value: a, $isTraitObject: true}, err);
      };
    };
    return [];
  },
    visitUnknownIndexAccess: function (a) {
    const self = this;
    visit.walkUnknownIndexAccess(self, a);
    let $puck_127 = getCoreType($unwrapTraitObject(self).scope, "Unknown", "unknown access");
    if ($unwrapTraitObject($puck_127).kind === "Ok") {
      let {value: [[type_, $puck_128]]} = $unwrapTraitObject($puck_127);
      a.type_ = type_;
    }
    else {
      if ($unwrapTraitObject($puck_127).kind === "Err") {
        let {value: [err]} = $unwrapTraitObject($puck_127);
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:UnknownIndexAccess', value: a, $isTraitObject: true}, err);
      };
    };
    return [];
  },
    visitBooleanLiteral: function (l) {
    const self = this;
    const scope = $unwrapTraitObject(self).scope;
    l.scope = $unwrapTraitObject(self).scope;
    let $puck_129 = $puck_12.Scope.getBindingByTypeId.call(scope, "Bool");
    if ($puck_129.kind === "Some") {
      let {value: [binding]} = $puck_129;
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
    let $puck_130 = $puck_12.Scope.getBindingByTypeId.call(scope, "List");
    let $puck_131;
    if ($puck_130.kind === "Some") {
      let {value: [binding]} = $puck_130;
      $puck_131 = $puck_1.Option.unwrap.call(binding.type_.providesType);
    }
    else {
      return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ListLiteral', value: l, $isTraitObject: true}, "puck:core::List is not in scope. Please import List from puck:core to use list literals.");
    };
    let listType = $puck_131;
    let type_ = $puck_1.None;
    if ($unwrapTraitObject(self).assignedTo) {
      const a = $unwrapTraitObject(self).assignedTo;
      let $puck_132 = a.kind;
      if ($puck_132.kind === "Struct") {
        let {value: [$puck_133]} = $puck_132;
        if ($puck_1.Option.unwrapOr.call(a.id, "") === "List") {
          type_ = $puck_1.Some(a);
        };
      };
    };
    visit.walkListLiteral(self, l);
    let $puck_134 = type_;
    if ($puck_134.kind === "Some") {
      let {value: [type_]} = $puck_134;
      l.type_ = type_;
    }
    else {
      if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true}) >= 1) {
        let $puck_135 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true}, function (m) {
          return $puck_4.Expression.getType.call(m);
        })
;
        const types = $puck_1.Iterable[$puck_135.type].toList.call($puck_135);
        let $puck_136 = $puck_15.findCommonType(types);
        if ($unwrapTraitObject($puck_136).kind === "Ok") {
          let {value: [type_]} = $unwrapTraitObject($puck_136);
          if ((!type_)) {
            l.type_ = listType;
          }
          else {
            l.type_ = $puck_15.createTypeInstance(listType, [type_]);
          };
        }
        else {
          if ($unwrapTraitObject($puck_136).kind === "Err") {
            let {value: [$puck_137]} = $unwrapTraitObject($puck_136);
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
    let $puck_138 = $puck_12.Scope.getBindingByTypeId.call(scope, "Num");
    if ($puck_138.kind === "Some") {
      let {value: [binding]} = $puck_138;
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
    return l.type_ = $puck_16.Type({
      definition: $puck_16.Definition({
      file: file,
      token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordLiteral', value: l, $isTraitObject: true},
    }),
      id: $puck_1.None,
      displayName: $puck_1.None,
      name: $puck_1.None,
      kind: $puck_16.TypeKind.Struct({
      implementations: [],
      kind: $puck_16.StructKind.Record({properties: $puck_1.ObjectMap.fromIter($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.members, $isTraitObject: true}, function (m) {
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
    let $puck_139 = $puck_12.Scope.getBindingByTypeId.call(scope, "String");
    if ($puck_139.kind === "Some") {
      let {value: [binding]} = $puck_139;
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
    let $puck_140 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: l.expressions, $isTraitObject: true}, function (e) {
      return $puck_4.Expression.getType.call(e);
    })
;
    return l.type_ = $puck_16.Type({
      definition: $puck_16.Definition({
      file: file,
      token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TupleLiteral', value: l, $isTraitObject: true},
    }),
      id: $puck_1.None,
      displayName: $puck_1.None,
      name: $puck_1.None,
      kind: $puck_16.TypeKind.Struct({
      implementations: [],
      kind: $puck_16.StructKind.Tuple({properties: $puck_1.Iterable[$puck_140.type].toList.call($puck_140)}),
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
    let $puck_141 = p;
    let $puck_142;
    if ($unwrapTraitObject($puck_141).kind === "CatchAll") {
      let undefined = $unwrapTraitObject($puck_141);
      $puck_142 = $puck_16.Type.unused({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p, $isTraitObject: true},
      });
    }
    else {
      let $puck_143;
      if ($unwrapTraitObject($puck_141).kind === "Identifier") {
        let {value: {identifier: identifier}} = $unwrapTraitObject($puck_141);
        $puck_143 = $puck_2._undefined;
      }
      else {
        let $puck_144;
        if ($unwrapTraitObject($puck_141).kind === "Record") {
          let {value: [record]} = $unwrapTraitObject($puck_141);
          $puck_144 = record.type_;
        }
        else {
          let $puck_145;
          if ($unwrapTraitObject($puck_141).kind === "RecordType") {
            let {value: [typePath, record]} = $unwrapTraitObject($puck_141);
            const type_ = $unwrapTraitObject(typePath.providesType);
            if ((!$puck_15.isAssignable($unwrapTraitObject(record.type_), type_))) {
              reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p, $isTraitObject: true}, $puck_16.Type.displayName.call(type_) + " is not assignable to pattern " + $puck_4.RecordPattern.displayName.call(record));
            };
            $puck_145 = $puck_1.Option.mapOr.call(type_.enumMember, type_, function ([$puck_146, enum_]) {
              return enum_;
            });
          }
          else {
            let $puck_147;
            if (($unwrapTraitObject($puck_141).kind === "Tuple")) {
              let {value: [tuple]} = $unwrapTraitObject($puck_141);
              $puck_147 = tuple.type_;
            }
            else {
              let $puck_148;
              if ($unwrapTraitObject($puck_141).kind === "TupleType") {
                let {value: [typePath, tuple]} = $unwrapTraitObject($puck_141);
                const type_ = $unwrapTraitObject(typePath.providesType);
                if ((!$puck_15.isAssignable($unwrapTraitObject(tuple.type_), type_))) {
                  reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Pattern', value: p, $isTraitObject: true}, $puck_16.Type.displayName.call(type_) + " is not assignable to pattern " + $puck_4.TuplePattern.displayName.call(tuple));
                };
                $puck_148 = $puck_1.Option.mapOr.call(type_.enumMember, type_, function ([$puck_149, enum_]) {
                  return enum_;
                });
              }
              else {
                let $puck_150;
                if (($unwrapTraitObject($puck_141).kind === "UnitType")) {
                  let {value: [typePath]} = $unwrapTraitObject($puck_141);
                  $puck_150 = $puck_2._undefined;
                };
                $puck_148 = $puck_150;
              };
              $puck_147 = $puck_148;
            };
            $puck_145 = $puck_147;
          };
          $puck_144 = $puck_145;
        };
        $puck_143 = $puck_144;
      };
      $puck_142 = $puck_143;
    };
    return p.type_ = $puck_142;
  },
    visitRecordPattern: function (p) {
    const self = this;
    p.scope = $unwrapTraitObject(self).scope;
    visit.walkRecordPattern(self, p);
    return p.type_ = $puck_16.Type({
      definition: $puck_16.Definition({
      file: file,
      token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:RecordPattern', value: p, $isTraitObject: true},
    }),
      id: $puck_1.None,
      displayName: $puck_1.None,
      name: $puck_1.None,
      kind: $puck_16.TypeKind.Struct({
      implementations: [],
      kind: $puck_16.StructKind.Record({properties: $puck_1.ObjectMap.fromIter($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: p.properties, $isTraitObject: true}, function (p) {
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
    let $puck_151 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: p.properties, $isTraitObject: true}, function (p) {
      return p.type_;
    })
;
    return p.type_ = $puck_16.Type({
      definition: $puck_16.Definition({
      file: file,
      token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TuplePattern', value: p, $isTraitObject: true},
    }),
      id: $puck_1.None,
      displayName: $puck_1.None,
      name: $puck_1.None,
      kind: $puck_16.TypeKind.Struct({
      implementations: [],
      kind: $puck_16.StructKind.Tuple({properties: $puck_1.Iterable[$puck_151.type].toList.call($puck_151)}),
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
