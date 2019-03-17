'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.TypeVisitor = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("path");
const $puck_4 = require("./../ast/ast");
const $puck_5 = require("./../ast/span");
const $puck_6 = require("./../compiler");
const $puck_7 = require("./../ast/visit");
const $puck_8 = require("./../entities");
const $puck_9 = require("./src/scope");
const $puck_10 = require("./src/type_bound_visitor");
const $puck_11 = require("./src/types");
var TypeVisitor = exports.TypeVisitor = (object) => object;
$puck_7.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/type_visitor.puck:TypeVisitor"] = {
visitModule: function (m) {
  let self = this;
  asMut(m).scope = self.value.scope;
  let imports = [];
  let reexports = [];
  let declarations = [];
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: m.statements, $isTraitObject: true}, function (s) {
    let $puck_12 = s;
    if ($puck_12.kind === "EnumDeclaration") {
      $puck_12;
      return $puck_1.List.push.call(declarations, s);
    }
    else {
      if ($puck_12.kind === "ImportDirective") {
        let {value: i} = $puck_12;
        return $puck_1.List.push.call(imports, i);
      }
      else {
        if ($puck_12.kind === "TraitDeclaration") {
          $puck_12;
          return $puck_1.List.push.call(declarations, s);
        }
        else {
          if ($puck_12.kind === "TypeDeclaration") {
            $puck_12;
            return $puck_1.List.push.call(declarations, s);
          }
          else {
            if ($puck_12.kind === "ExportDirective") {
              let {value: e} = $puck_12;
              let $puck_13 = e.statement;
              if ($puck_13.kind === "EnumDeclaration") {
                $puck_13;
                return $puck_1.List.push.call(declarations, s);
              }
              else {
                if ($puck_13.kind === "TraitDeclaration") {
                  $puck_13;
                  return $puck_1.List.push.call(declarations, s);
                }
                else {
                  if ($puck_13.kind === "TypeDeclaration") {
                    $puck_13;
                    return $puck_1.List.push.call(declarations, s);
                  }
                  else {
                    if ($puck_13.kind === "Identifier") {
                      $puck_13;
                      return $puck_1.List.push.call(reexports, s);
                    }
                    else {
                      if (true) {
                        let $puck_14 = $puck_13;;
                        return $puck_14;
                      };
                    };
                  };
                };
              };
            }
            else {
              if (true) {
                let $puck_15 = $puck_12;;
                return $puck_15;
              };
            };
          };
        };
      };
    };
  });
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: declarations, $isTraitObject: true}, function (e) {
    return $puck_7.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/type_visitor.puck:TypeVisitor"].visitTopLevelStatement.call(self, $unwrapTraitObject(e));
  });
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: imports, $isTraitObject: true}, function (i) {
    return $puck_7.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/type_visitor.puck:TypeVisitor"].visitImportDirective.call(self, $unwrapTraitObject(i));
  });
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: reexports, $isTraitObject: true}, function (e) {
    return $puck_7.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/type_visitor.puck:TypeVisitor"].visitTopLevelStatement.call(self, $unwrapTraitObject(e));
  });
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: declarations, $isTraitObject: true}, function (e) {
    return $puck_7.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/type_visitor.puck:TypeVisitor"].visitTopLevelStatement.call(self, $unwrapTraitObject(e));
  });
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: declarations, $isTraitObject: true}, function (e) {
    return $puck_7.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/type_visitor.puck:TypeVisitor"].visitTopLevelStatement.call(self, $unwrapTraitObject(e));
  });
},
visitTopLevelStatement: $puck_7.Visit.visitTopLevelStatement,
visitBlockLevelStatement: $puck_7.Visit.visitBlockLevelStatement,
visitExpression: $puck_7.Visit.visitExpression,
visitEnumDeclaration: function (t) {
  let self = this;
  let parentScope = self.value.scope;
  let type_ = $unwrapTraitObject(t.type_);
  if ((!t.type_)) {
    const definition = $puck_8.Definition({
      file: self.value.file,
      token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumDeclaration', value: t, $isTraitObject: true},
    });
    t.type_ = $puck_8.Type.provides({
      definition: definition,
      id: getTypeId(t, self.value.context, self.value.file),
      displayName: $puck_1.None,
      name: $puck_1.Some(t.name.name),
      kind: $puck_8.TypeKind.Enum({
      implementations: [],
      members: $puck_1.ObjectMap._new(),
    }),
      _class: $puck_8.TypeClass.fromAstNode(t, function (token, message) {
      return TypeVisitor.reportError.call(self.value, token, $puck_8.CompilationError.Other(message));
    }),
      instance: $puck_1.None,
      providesType: $puck_1.None,
      enumMember: $puck_1.None,
    });
    let $puck_16 = $puck_9.Scope.define.call(parentScope, {
      definition: definition,
      name: t.name.name,
      mutable: false,
      allowRedeclare: false,
      type_: $unwrapTraitObject(t.type_),
      previous: $puck_1.None,
      completeType: $puck_1.None,
    });
    if ($puck_16.kind === "Err") {
      let {value: error} = $puck_16;
      TypeVisitor.reportError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: t.name, $isTraitObject: true}, $puck_8.CompilationError.Other(error));
    };
  }
  else {
    if ((!t.scope)) {
      let scope = $puck_9.Scope.createChild.call(parentScope);
      t.scope = scope;
      self.value.scope = scope;
      let $puck_17 = $puck_1.Option.unwrap.call(type_.providesType)._class;
      if ($puck_17 !== undefined) {
        let _class = $puck_17;
        let c = _class;
        $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}, function (p) {
          $puck_7.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/type_visitor.puck:TypeVisitor"].visitTypeParameter.call(self, p);
          return $puck_1.List.push.call(c.typeParameters, $unwrapTraitObject(p.type_));
        });
      };
      $puck_9.Scope.setSelfType.call(scope, $puck_1.Option.unwrap.call(type_.providesType));
      self.value.scope = parentScope;
    }
    else {
      self.value.scope = $unwrapTraitObject(t.scope);
      $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.members, $isTraitObject: true}, function (m) {
        return $puck_7.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/type_visitor.puck:TypeVisitor"].visitEnumMember.call(self, m);
      });
      const memberMap = $puck_1.ObjectMap.fromIter($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.members, $isTraitObject: true}, function (p) {
        const definition = $puck_8.Definition({
          file: self.value.file,
          token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumMember', value: p, $isTraitObject: true},
        });
        return [
          p.name.name,
          $puck_1.Option.mapOr.call(p.bound, $puck_8.Type({
          definition: definition,
          id: generateTypeId(self.value.context, self.value.file, t.name.name + "::" + p.name.name),
          displayName: $puck_1.None,
          name: $puck_1.Some(t.name.name + "::" + p.name.name),
          kind: $puck_8.TypeKind.Struct({
          implementations: [],
          kind: $puck_8.StructKind.Unit,
        }),
          _class: $puck_1.None,
          instance: $puck_1.None,
          providesType: $puck_1.None,
          enumMember: $puck_1.Some([
          p.name.name,
          $puck_1.Option.unwrap.call(type_.providesType),
        ]),
        }), function (bound) {
          return $puck_8.Type({
            definition: definition,
            id: generateTypeId(self.value.context, self.value.file, t.name.name + "::" + p.name.name),
            displayName: $puck_1.None,
            name: $puck_1.None,
            kind: $puck_4.TypeBound.getType.call(bound).kind,
            _class: $puck_1.None,
            instance: $puck_1.None,
            providesType: $puck_1.None,
            enumMember: $puck_1.Some([
            p.name.name,
            $puck_1.Option.unwrap.call(type_.providesType),
          ]),
          });
        }),
        ];
      }));
      if (($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.members, $isTraitObject: true}) !== $puck_1.ObjectMap.size.call(memberMap))) {
        let members = $puck_1.ObjectMap._new();
        $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.members, $isTraitObject: true}, function (p) {
          if ($puck_1.ObjectMap.has.call(members, p.name.name)) {
            TypeVisitor.reportError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumMember', value: p, $isTraitObject: true}, $puck_8.CompilationError.Other("Duplicate member " + p.name.name));
          };
          return members[p.name.name] = p;
        });
      };
      let $puck_18 = $puck_1.Option.unwrap.call(type_.providesType).kind;
      if (($puck_18.kind === "Enum")) {
        let {value: enum_} = $puck_18;
        $puck_2._Object.assign(enum_.members, memberMap);
      }
      else {
        $puck_1.panic("is not an enum");
      };
      self.value.scope = parentScope;
    };
  };
  undefined;
},
visitEnumMember: $puck_7.Visit.visitEnumMember,
visitImplDeclaration: $puck_7.Visit.visitImplDeclaration,
visitImplShorthandDeclaration: $puck_7.Visit.visitImplShorthandDeclaration,
visitMethodDeclaration: $puck_7.Visit.visitMethodDeclaration,
visitTraitDeclaration: function (t) {
  let self = this;
  let parentScope = self.value.scope;
  const type_ = $unwrapTraitObject(t.type_);
  if ((!t.type_)) {
    const definition = $puck_8.Definition({
      file: self.value.file,
      token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration', value: t, $isTraitObject: true},
    });
    t.type_ = $puck_8.Type.provides({
      definition: definition,
      id: getTypeId(t, self.value.context, self.value.file),
      displayName: $puck_1.None,
      name: $puck_1.Some(t.name.name),
      kind: $puck_8.TypeKind.Trait({
      isShorthand: false,
      requiredTraits: [],
      functions: $puck_1.ObjectMap._new(),
    }),
      _class: $puck_8.TypeClass.fromAstNode(t, function (token, message) {
      return TypeVisitor.reportError.call(self.value, token, $puck_8.CompilationError.Other(message));
    }),
      instance: $puck_1.None,
      providesType: $puck_1.None,
      enumMember: $puck_1.None,
    });
    let $puck_19 = $puck_9.Scope.define.call(parentScope, {
      definition: definition,
      name: t.name.name,
      mutable: false,
      allowRedeclare: false,
      type_: $unwrapTraitObject(t.type_),
      previous: $puck_1.None,
      completeType: $puck_1.None,
    });
    if ($puck_19.kind === "Err") {
      let {value: error} = $puck_19;
      TypeVisitor.reportError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: t.name, $isTraitObject: true}, $puck_8.CompilationError.Other(error));
    };
  }
  else {
    if ((!t.scope)) {
      let scope = $puck_9.Scope.createChild.call(parentScope);
      t.scope = scope;
      self.value.scope = scope;
      let $puck_20 = $puck_1.Option.unwrap.call(type_.providesType)._class;
      if ($puck_20 !== undefined) {
        let _class = $puck_20;
        let c = _class;
        $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}, function (p) {
          $puck_7.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/type_visitor.puck:TypeVisitor"].visitTypeParameter.call(self, p);
          return $puck_1.List.push.call(c.typeParameters, $unwrapTraitObject(p.type_));
        });
      };
      let $puck_21 = t.traitBound;
      if ($puck_21 !== undefined) {
        let {bound: bound} = $puck_21;
        $puck_7.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/type_visitor.puck:TypeVisitor"].visitTypeBound.call(self, bound);
        let $puck_22 = getTraits($puck_4.TypeBound.getType.call(bound));
        if ($puck_22.kind === "Ok") {
          let {value: requiredTraits} = $puck_22;
          let $puck_23 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: requiredTraits, $isTraitObject: true}, function (t) {
            return $puck_11.isSameId(t, $puck_1.Option.unwrap.call(type_.providesType));
          });
          if ($puck_23 !== undefined) {
            let trait_ = $puck_23;
            TypeVisitor.reportError.call(self.value, trait_.definition.token, $puck_8.CompilationError.Other("A trait can not extend itself"));
          };
          let trait_ = $puck_8.Type.getTrait.call(type_);
          trait_.requiredTraits = requiredTraits;
        }
        else {
          if ($puck_22.kind === "Err") {
            let {value: [token, message]} = $puck_22;
            TypeVisitor.reportError.call(self.value, token, $puck_8.CompilationError.Other(message));
          };
        };
      };
      $puck_9.Scope.setSelfType.call(scope, $puck_1.Option.unwrap.call(type_.providesType));
      self.value.scope = parentScope;
    }
    else {
      self.value.scope = $unwrapTraitObject(t.scope);
      $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.members, $isTraitObject: true}, function (m) {
        return $puck_10.visitMethodDeclaration(self.value.typeBoundVisitor, m, $puck_1.Option.unwrap.call(type_.providesType));
      });
      let trait_ = $puck_8.Type.getTrait.call(type_);
      $puck_1.ObjectMap.merge.call(trait_.functions, $puck_1.ObjectMap.fromIter($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.members, $isTraitObject: true}, function (m) {
        let $puck_24 = m.type_.kind;
        if ($puck_24.kind === "Function") {
          let {value: _function} = $puck_24;
          if ((_function.isAbstract && $puck_1.Option.isNone.call(_function.selfBinding))) {
            TypeVisitor.reportError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: m, $isTraitObject: true}, $puck_8.CompilationError.Other("Static trait functions can not be abstract"));
          };
        };
        return [
          $puck_1.Option.unwrap.call(m.name).name,
          m.type_,
        ];
      })));
      let $puck_25 = $puck_1.Option.unwrap.call(type_.providesType)._class;
      if ($puck_25 !== undefined) {
        let _class = $puck_25;
        $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _class.instances, $isTraitObject: true}, function (instance) {
          let instanceTrait = $puck_8.Type.getTrait.call(instance);
          return instanceTrait.functions = trait_.functions;
        });
      };
      self.value.scope = parentScope;
    };
  };
  undefined;
},
visitTypeDeclaration: function (t) {
  let self = this;
  let parentScope = self.value.scope;
  const type_ = $unwrapTraitObject(t.type_);
  if ((!t.type_)) {
    let $puck_26 = t.bound;
    let $puck_27;
    if ($puck_26 !== undefined) {
      let typeBound = $puck_26;
      let $puck_28 = typeBound;
      let $puck_29;
      if ($puck_28.kind === "RecordTypeBound") {
        let {value: record} = $puck_28;
        $puck_29 = $puck_8.StructKind.Record({properties: $puck_1.ObjectMap._new()});
      }
      else {
        let $puck_30;
        if ($puck_28.kind === "TupleTypeBound") {
          let {value: tuple} = $puck_28;
          $puck_30 = $puck_8.StructKind.Tuple({properties: []});
        }
        else {
          let $puck_31;
          if (true) {
            $puck_28;
            $puck_31 = $puck_1.panic("Unreachable");
          };
          $puck_30 = $puck_31;
        };
        $puck_29 = $puck_30;
      };
      $puck_27 = $puck_29;
    }
    else {
      $puck_27 = $puck_8.StructKind.Unit;
    };
    const structKind = $puck_27;
    const definition = $puck_8.Definition({
      file: self.value.file,
      token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeDeclaration', value: t, $isTraitObject: true},
    });
    t.type_ = $puck_8.Type.provides({
      definition: definition,
      id: getTypeId(t, self.value.context, self.value.file),
      displayName: $puck_1.None,
      name: $puck_1.Some(t.name.name),
      kind: $puck_8.TypeKind.Struct({
      implementations: [],
      kind: structKind,
    }),
      _class: $puck_8.TypeClass.fromAstNode(t, function (token, message) {
      return TypeVisitor.reportError.call(self.value, token, $puck_8.CompilationError.Other(message));
    }),
      instance: $puck_1.None,
      providesType: $puck_1.None,
      enumMember: $puck_1.None,
    });
    let $puck_32 = $puck_9.Scope.define.call(parentScope, {
      definition: definition,
      name: t.name.name,
      mutable: false,
      allowRedeclare: false,
      type_: $unwrapTraitObject(t.type_),
      previous: $puck_1.None,
      completeType: $puck_1.None,
    });
    if ($puck_32.kind === "Err") {
      let {value: error} = $puck_32;
      TypeVisitor.reportError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: t.name, $isTraitObject: true}, $puck_8.CompilationError.Other(error));
    };
  }
  else {
    if ((!t.scope)) {
      let scope = $puck_9.Scope.createChild.call(parentScope);
      t.scope = scope;
      self.value.scope = scope;
      let $puck_33 = $puck_1.Option.unwrap.call(type_.providesType)._class;
      if ($puck_33 !== undefined) {
        let _class = $puck_33;
        let c = _class;
        $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}, function (p) {
          $puck_7.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/type_visitor.puck:TypeVisitor"].visitTypeParameter.call(self, p);
          return $puck_1.List.push.call(c.typeParameters, $unwrapTraitObject(p.type_));
        });
      };
      $puck_9.Scope.setSelfType.call(scope, $puck_1.Option.unwrap.call(type_.providesType));
      self.value.scope = parentScope;
    }
    else {
      self.value.scope = $unwrapTraitObject(t.scope);
      let $puck_34 = t.bound;
      if ($puck_34 !== undefined) {
        let typeBound = $puck_34;
        $puck_7.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/type_visitor.puck:TypeVisitor"].visitTypeBound.call(self, typeBound);
        let $puck_35 = $puck_1.Option.unwrap.call(type_.providesType).kind;
        if (($puck_35.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($puck_35.value).kind).kind === "Record")) {
          let {value: {kind: {value: r}}} = $puck_35;
          let $puck_36 = $puck_4.TypeBound.getType.call(typeBound).kind;
          if (($puck_36.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($puck_36.value).kind).kind === "Record")) {
            let {value: {kind: {value: tr}}} = $puck_36;
            $puck_1.ObjectMap.merge.call(r.properties, tr.properties);
          }
          else {
            if (true) {
              $puck_36;
            };
          };
        }
        else {
          if (($puck_35.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($puck_35.value).kind).kind === "Tuple")) {
            let {value: {kind: {value: tuple}}} = $puck_35;
            let $puck_37 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_4.TypeBound.getTupleTypeBound.call(typeBound).properties, $isTraitObject: true}, function (p) {
              return $puck_4.TypeBound.getType.call(p);
            })
;
            $puck_2._Object.assign(tuple, {properties: $puck_1.Iterable[$puck_37.type].toList.call($puck_37)});
          }
          else {
            if (true) {
              $puck_35;
            };
          };
        };
      };
      self.value.scope = parentScope;
    };
  };
  undefined;
},
visitExportDirective: $puck_7.Visit.visitExportDirective,
visitImportDirective: function (importDirective) {
  let self = this;
  let scope = self.value.scope;
  let $puck_38 = importDirective._module;
  if ($puck_38 !== undefined) {
    let _module = $puck_38;
    if ((!_module.scope)) {
      $puck_6.CompilerContext.runTypeVisitorOnFile.call(self.value.context, _module.file);
    };
  };
  let $puck_39 = importDirective.specifier;
  if ($puck_39.kind === "Identifier") {
    let {value: identifier} = $puck_39;
    let $puck_40 = importDirective._module;
    let $puck_41;
    if ($puck_40 !== undefined) {
      let _module = $puck_40;
      $puck_41 = $puck_1.ObjectMap.map.call(_module.exports, function (exportDirective) {
        return {
          type_: $puck_4.ExportDirective.getType.call(exportDirective),
          optional: false,
        };
      });
    }
    else {
      $puck_41 = $puck_1.ObjectMap._new();
    };
    const typeProperties = $puck_41;
    const definition = $puck_8.Definition({
      file: self.value.file,
      token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true},
    });
    let type_ = $puck_8.Type({
      definition: definition,
      id: $puck_1.None,
      displayName: $puck_1.Some(identifier.name),
      name: $puck_1.None,
      kind: $puck_8.TypeKind.Struct({
      implementations: [],
      kind: $puck_8.StructKind.Record({properties: typeProperties}),
    }),
      instance: $puck_1.None,
      _class: $puck_1.None,
      providesType: $puck_1.None,
      enumMember: $puck_1.None,
    });
    let $puck_42 = $puck_9.Scope.define.call(scope, {
      definition: definition,
      name: identifier.name,
      mutable: false,
      allowRedeclare: false,
      type_: type_,
      previous: $puck_1.None,
      completeType: $puck_1.Option.map.call(importDirective._module, function (_module) {
      return function (visitor) {
        if (visitor === "TypeVisitor") {
          return $puck_1.None;
        };
        if (visitor === "ImplVisitor") {
          $puck_6.CompilerContext.runTypeVisitorOnFile.call(self.value.context, _module.file);
        }
        else {
          $puck_6.CompilerContext.runCheckerOnFile.call(self.value.context, _module.file);
        };
        const moduleScope = $unwrapTraitObject(_module.scope);
        let typeProperties = $puck_1.ObjectMap.map.call(_module.exports, function (exportDirective) {
          return {
            type_: $puck_4.ExportDirective.getType.call(exportDirective),
            optional: false,
          };
        });
        let $puck_43 = type_.kind;
        if (($puck_43.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($puck_43.value).kind).kind === "Record")) {
          let {value: {kind: {value: record}}} = $puck_43;
          let r = record;
          r.properties = typeProperties;
        }
        else {
          if (true) {
            $puck_43;
            $puck_1.panic("Unreachable");
          };
        };
        return $puck_1.Some(type_);
      };
    }),
    });
    if ($puck_42.kind === "Err") {
      let {value: error} = $puck_42;
      TypeVisitor.reportError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true}, $puck_8.CompilationError.Other(error));
    };
  }
  else {
    if ($puck_39.kind === "ObjectDestructure") {
      let {value: d} = $puck_39;
      $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: d.members, $isTraitObject: true}, function (m) {
        let $puck_44 = importDirective._module;
        if ($puck_44 !== undefined) {
          let _module = $puck_44;
          const moduleScope = $unwrapTraitObject(_module.scope);
          const importedBinding = $puck_1.Option.unwrapOr.call($puck_9.Scope.getBinding.call(moduleScope, m.property.name, "TypeVisitor"), $unwrapTraitObject($puck_2._Object.assign({})));
          let $puck_45 = $puck_9.Scope.define.call(scope, {
            definition: $puck_8.Definition({
            file: $puck_1.Option.unwrapOr.call(m.file, self.value.file),
            token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructureMember', value: m, $isTraitObject: true},
          }),
            name: m.local.name,
            mutable: false,
            allowRedeclare: false,
            type_: importedBinding.type_,
            previous: $puck_1.None,
            completeType: $puck_1.Some(function (visitor) {
            if (visitor === "TypeVisitor") {
              return $puck_1.None;
            };
            if (visitor === "ImplVisitor") {
              $puck_6.CompilerContext.runTypeVisitorOnFile.call(self.value.context, _module.file);
            }
            else {
              $puck_6.CompilerContext.runCheckerOnFile.call(self.value.context, _module.file);
            };
            const externalBinding = $puck_9.Scope.getBinding.call(moduleScope, m.property.name, visitor);
            return $puck_1.Option.map.call(externalBinding, function (binding) {
              return binding.type_;
            });
          }),
          });
          if ($puck_45.kind === "Err") {
            let {value: error} = $puck_45;
            TypeVisitor.reportError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: m.local, $isTraitObject: true}, $puck_8.CompilationError.Other(error));
          };
          m.local.type_ = importedBinding.type_;
          return undefined;
        }
        else {
          let $puck_46 = $puck_9.Scope.define.call(scope, {
            definition: $puck_8.Definition({
            file: self.value.file,
            token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructureMember', value: m, $isTraitObject: true},
          }),
            name: m.local.name,
            mutable: false,
            allowRedeclare: false,
            type_: $unwrapTraitObject($puck_2._undefined),
            providesType: $puck_1.None,
            previous: $puck_1.None,
            completeType: $puck_1.None,
          });
          if ($puck_46.kind === "Err") {
            let {value: error} = $puck_46;
            return TypeVisitor.reportError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: m.local, $isTraitObject: true}, $puck_8.CompilationError.Other(error));
          };
        };
      });
    }
    else {
      if ($puck_39.kind === "Asterisk") {
        $puck_39;
      };
    };
  };
},
visitObjectDestructure: $puck_7.Visit.visitObjectDestructure,
visitObjectDestructureMember: $puck_7.Visit.visitObjectDestructureMember,
visitBlock: $puck_7.Visit.visitBlock,
visitBreakStatement: $puck_7.Visit.visitBreakStatement,
visitReturnStatement: $puck_7.Visit.visitReturnStatement,
visitForLoop: $puck_7.Visit.visitForLoop,
visitWhileLoop: $puck_7.Visit.visitWhileLoop,
visitIdentifier: function (i) {
  const self = this;
  const scope = self.value.scope;
  let $puck_47 = $puck_9.Scope.getBinding.call(scope, i.name, "ImplVisitor");
  if ($puck_47 !== undefined) {
    let binding = $puck_47;
    asMut(i).binding = binding;
    asMut(i).type_ = binding.type_;
  }
  else {
    $puck_6.CompilerContext.reportError.call(self.value.context, self.value.file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: i, $isTraitObject: true}, $puck_8.CompilationError.UndefinedVariable(i.name));
  };
  undefined;
},
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
  $puck_7.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor"].visitTypePath.call({type: '$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor', value: self.value.typeBoundVisitor, $isTraitObject: true}, t);
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
  $puck_7.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor"].visitFunctionTypeBound.call({type: '$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor', value: self.value.typeBoundVisitor, $isTraitObject: true}, t);
},
visitIntersectionTypeBound: function (t) {
  let self = this;
  $puck_7.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor"].visitIntersectionTypeBound.call({type: '$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor', value: self.value.typeBoundVisitor, $isTraitObject: true}, t);
},
visitNamedTypeBound: function (t) {
  let self = this;
  const result = $puck_9.Scope.getTypePath.call(self.value.scope, t.path, "TypeVisitor");
  let $puck_48 = result;
  if ($puck_48.kind === "Ok") {
    let {value: binding} = $puck_48;
  }
  else {
    if (($puck_48.kind === "Err" && $unwrapTraitObject($puck_48.value).kind === "UndefinedType")) {
      let {value: {value: name}} = $puck_48;
      TypeVisitor.reportError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t, $isTraitObject: true}, $puck_8.CompilationError.UndefinedVariable(name));
    }
    else {
      if (($puck_48.kind === "Err" && $unwrapTraitObject($puck_48.value).kind === "Other")) {
        let {value: {value: err}} = $puck_48;
        TypeVisitor.reportError.call(self.value, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t, $isTraitObject: true}, $puck_8.CompilationError.Other(err));
      };
    };
  };
  $puck_7.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor"].visitNamedTypeBound.call({type: '$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor', value: self.value.typeBoundVisitor, $isTraitObject: true}, t);
},
visitRecordTypeBound: function (t) {
  let self = this;
  $puck_7.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor"].visitRecordTypeBound.call({type: '$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor', value: self.value.typeBoundVisitor, $isTraitObject: true}, t);
},
visitRecordTypeBoundMember: $puck_7.Visit.visitRecordTypeBoundMember,
visitTupleTypeBound: function (t) {
  let self = this;
  $puck_7.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor"].visitTupleTypeBound.call({type: '$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor', value: self.value.typeBoundVisitor, $isTraitObject: true}, t);
},
visitTypeParameter: function (t) {
  let self = this;
  $puck_7.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor"].visitTypeParameter.call({type: '$impl_lib/ast/visit.puck:Visit$lib/typeck/src/type_bound_visitor.puck:TypeBoundVisitor', value: self.value.typeBoundVisitor, $isTraitObject: true}, t);
},
visitTypeParameterBound: $puck_7.Visit.visitTypeParameterBound,
visitWhereClause: $puck_7.Visit.visitWhereClause
};
TypeVisitor._new = function (context, file) {
  let typeVisitor = {
    context: context,
    file: file,
    scope: $puck_9.Scope._new(context),
    assignedTo: $puck_1.None,
    typeBoundVisitor: {
    getScope: function () {
    return $unwrapTraitObject(typeVisitor).scope;
  },
    setScope: function (scope) {
    return $unwrapTraitObject(typeVisitor).scope = scope;
  },
    file: file,
    reportError: function (token, error) {
    return $puck_6.CompilerContext.reportError.call(context, file, token, error);
  },
    visitorName: "TypeVisitor",
  },
  };
  return typeVisitor;
};
TypeVisitor.reportError = function (token, error) {
  const self = this;
  $puck_6.CompilerContext.reportError.call(self.context, self.file, token, error);
};
function asMut(i) {
  return i;
};
function isTypeScope(e) {
  let $puck_49 = e.statement;
  if ($puck_49.kind === "EnumDeclaration") {
    $puck_49;
    return true;
  }
  else {
    if ($puck_49.kind === "TraitDeclaration") {
      $puck_49;
      return true;
    }
    else {
      if ($puck_49.kind === "TypeDeclaration") {
        $puck_49;
        return true;
      }
      else {
        if (true) {
          $puck_49;
          return false;
        };
      };
    };
  };
};
function generateTypeId(context, file, name) {
  const path = $puck_3.relative(context.projectPath, file.absolutePath);
  return $puck_1.Some(path + ":" + name + "");
};
function getTypeId(declaration, context, file) {
  let $puck_50 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: declaration.attributes, $isTraitObject: true}, function (a) {
    return (a.name.name === "type_id");
  });
  if ($puck_50 !== undefined) {
    let attribute = $puck_50;
    let $puck_51 = attribute.data;
    if ($puck_51.kind === "Value") {
      let {value: literal} = $puck_51;
      let $puck_52 = literal;
      if ($puck_52.kind === "StringLiteral") {
        let {value: {value: value}} = $puck_52;
        return $puck_1.Some(value);
      }
      else {
        if (true) {
          $puck_52;
          $puck_6.CompilerContext.reportError.call(context, file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Attribute', value: attribute, $isTraitObject: true}, $puck_8.CompilationError.Other("type_id must be a string"));
          return generateTypeId(context, file, declaration.name.name);
        };
      };
    }
    else {
      if (true) {
        $puck_51;
        $puck_6.CompilerContext.reportError.call(context, file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Attribute', value: attribute, $isTraitObject: true}, $puck_8.CompilationError.Other("type_id must have a value"));
        return generateTypeId(context, file, declaration.name.name);
      };
    };
  }
  else {
    return generateTypeId(context, file, declaration.name.name);
  };
};
function getTraits(type_) {
  type_ = $puck_1.Option.unwrapOr.call(type_.providesType, type_);
  let $puck_53 = type_.kind;
  if ($puck_53.kind === "Trait") {
    let {value: trait_} = $puck_53;
    return $puck_1.Ok([type_]);
  }
  else {
    if ($puck_53.kind === "Intersection") {
      let {value: intersection} = $puck_53;
      return $puck_1.Result.map.call(getTraits(intersection.baseType), function (types) {
        $puck_1.List.push.call(types, intersection.intersectedTrait);
        return types;
      });
    }
    else {
      if (true) {
        $puck_53;
        return $puck_1.Err([
          type_.definition.token,
          "Can only extend other traits",
        ]);
      };
    };
  };
}
