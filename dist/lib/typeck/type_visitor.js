'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.TypeVisitor = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("path");
const $puck_4 = require("./../ast/ast");
const $puck_5 = require("./../ast/span");
const $puck_6 = require("./../compiler");
const visit = require("./../ast/visit");
const $puck_7 = require("./../entities");
const $puck_8 = require("./src/scope");
const $puck_9 = require("./src/structure_visitor");
const $puck_10 = require("./src/types");
function isTypeScope(e) {
  let $puck_11 = e.statement;
  if ($puck_11.kind === "EnumDeclaration") {
    $puck_11;
    return true;
  }
  else {
    if ($puck_11.kind === "TraitDeclaration") {
      $puck_11;
      return true;
    }
    else {
      if ($puck_11.kind === "TypeDeclaration") {
        $puck_11;
        return true;
      }
      else {
        if (true) {
          $puck_11;
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
  let $puck_12 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: declaration.attributes, $isTraitObject: true}, function (a) {
    return (a.name.name === "type_id");
  });
  if ($puck_12 !== undefined) {
    let attribute = $puck_12;
    let $puck_13 = attribute.data;
    if ($puck_13.kind === "Value") {
      let {value: literal} = $puck_13;
      let $puck_14 = literal;
      if ($puck_14.kind === "StringLiteral") {
        let {value: {value: value}} = $puck_14;
        return $puck_1.Some(value);
      }
      else {
        if (true) {
          $puck_14;
          $puck_6.CompilerContext.reportError.call(context, file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Attribute', value: attribute, $isTraitObject: true}, $puck_7.CompilationError.Other("type_id must be a string"));
          return generateTypeId(context, file, declaration.name.name);
        };
      };
    }
    else {
      if (true) {
        $puck_13;
        $puck_6.CompilerContext.reportError.call(context, file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Attribute', value: attribute, $isTraitObject: true}, $puck_7.CompilationError.Other("type_id must have a value"));
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
  let $puck_15 = type_.kind;
  if ($puck_15.kind === "Trait") {
    let {value: trait_} = $puck_15;
    return $puck_1.Ok([type_]);
  }
  else {
    if ($puck_15.kind === "Intersection") {
      let {value: intersection} = $puck_15;
      return $puck_1.Result.map.call(getTraits(intersection.baseType), function (types) {
        $puck_1.List.push.call(types, intersection.intersectedTrait);
        return types;
      });
    }
    else {
      if (true) {
        $puck_15;
        return $puck_1.Err([
          type_.definition.token,
          "Can only extend other traits",
        ]);
      };
    };
  };
};
function TypeVisitor(context, file) {
  let imports = $puck_1.ObjectMap._new();
  function reportError(token, message) {
    return $puck_6.CompilerContext.reportError.call(context, file, token, $puck_7.CompilationError.Other(message));
  };
  const structureVisitorInstance = $puck_9.structureVisitor(context, file, "TypeVisitor");
  return $puck_2._Object.assign({}, visit.emptyVisitor, structureVisitorInstance, {
    scope: $puck_8.Scope._new(context),
    visitModule: function (m) {
    let self = this;
    m.scope = $unwrapTraitObject(self).scope;
    let imports = [];
    let reexports = [];
    let declarations = [];
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: m.statements, $isTraitObject: true}, function (s) {
      let $puck_16 = s;
      if ($puck_16.kind === "EnumDeclaration") {
        $puck_16;
        return $puck_1.List.push.call(declarations, s);
      }
      else {
        if ($puck_16.kind === "ImportDirective") {
          let {value: i} = $puck_16;
          return $puck_1.List.push.call(imports, i);
        }
        else {
          if ($puck_16.kind === "TraitDeclaration") {
            $puck_16;
            return $puck_1.List.push.call(declarations, s);
          }
          else {
            if ($puck_16.kind === "TypeDeclaration") {
              $puck_16;
              return $puck_1.List.push.call(declarations, s);
            }
            else {
              if ($puck_16.kind === "ExportDirective") {
                let {value: e} = $puck_16;
                let $puck_17 = e.statement;
                if ($puck_17.kind === "EnumDeclaration") {
                  $puck_17;
                  return $puck_1.List.push.call(declarations, s);
                }
                else {
                  if ($puck_17.kind === "TraitDeclaration") {
                    $puck_17;
                    return $puck_1.List.push.call(declarations, s);
                  }
                  else {
                    if ($puck_17.kind === "TypeDeclaration") {
                      $puck_17;
                      return $puck_1.List.push.call(declarations, s);
                    }
                    else {
                      if ($puck_17.kind === "Identifier") {
                        $puck_17;
                        return $puck_1.List.push.call(reexports, s);
                      }
                      else {
                        if (true) {
                          let $puck_18 = $puck_17;;
                          return $puck_18;
                        };
                      };
                    };
                  };
                };
              }
              else {
                if (true) {
                  let $puck_19 = $puck_16;;
                  return $puck_19;
                };
              };
            };
          };
        };
      };
    });
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: declarations, $isTraitObject: true}, function (e) {
      return $unwrapTraitObject(self).visitTopLevelStatement(e);
    });
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: imports, $isTraitObject: true}, function (i) {
      return $unwrapTraitObject(self).visitImportDirective(i);
    });
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: reexports, $isTraitObject: true}, function (e) {
      return $unwrapTraitObject(self).visitTopLevelStatement(e);
    });
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: declarations, $isTraitObject: true}, function (e) {
      return $unwrapTraitObject(self).visitTopLevelStatement(e);
    });
    return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: declarations, $isTraitObject: true}, function (e) {
      return $unwrapTraitObject(self).visitTopLevelStatement(e);
    });
  },
    visitEnumDeclaration: function (t) {
    let self = this;
    let parentScope = $unwrapTraitObject(self).scope;
    let type_ = $unwrapTraitObject(t.type_);
    if ((!t.type_)) {
      const definition = $puck_7.Definition({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumDeclaration', value: t, $isTraitObject: true},
      });
      t.type_ = $puck_7.Type.provides({
        definition: definition,
        id: getTypeId(t, context, file),
        displayName: $puck_1.None,
        name: $puck_1.Some(t.name.name),
        kind: $puck_7.TypeKind.Enum({
        implementations: [],
        members: $puck_1.ObjectMap._new(),
      }),
        _class: $puck_7.TypeClass.fromAstNode(t, reportError),
        instance: $puck_1.None,
        providesType: $puck_1.None,
        enumMember: $puck_1.None,
      });
      let $puck_20 = $puck_8.Scope.define.call(parentScope, {
        definition: definition,
        name: t.name.name,
        mutable: false,
        allowRedeclare: false,
        type_: $unwrapTraitObject(t.type_),
        previous: $puck_1.None,
        completeType: $puck_1.None,
      });
      if ($puck_20.kind === "Err") {
        let {value: error} = $puck_20;
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: t.name, $isTraitObject: true}, error);
      };
    }
    else {
      if ((!t.scope)) {
        let scope = $puck_8.Scope.createChild.call(parentScope);
        t.scope = scope;
        $unwrapTraitObject(self).scope = scope;
        let $puck_21 = $puck_1.Option.unwrap.call(type_.providesType)._class;
        if ($puck_21 !== undefined) {
          let _class = $puck_21;
          let c = _class;
          $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}, function (p) {
            $unwrapTraitObject(self).visitTypeParameter(p);
            return $puck_1.List.push.call(c.typeParameters, $unwrapTraitObject(p.type_));
          });
        };
        $puck_8.Scope.setSelfType.call(scope, $puck_1.Option.unwrap.call(type_.providesType));
        $unwrapTraitObject(self).scope = parentScope;
      }
      else {
        $unwrapTraitObject(self).scope = t.scope;
        $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.members, $isTraitObject: true}, function (m) {
          return $unwrapTraitObject(self).visitEnumMember(m);
        });
        const memberMap = $puck_1.ObjectMap.fromIter($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.members, $isTraitObject: true}, function (p) {
          const definition = $puck_7.Definition({
            file: file,
            token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumMember', value: p, $isTraitObject: true},
          });
          return [
            p.name.name,
            $puck_1.Option.mapOr.call(p.bound, $puck_7.Type({
            definition: definition,
            id: generateTypeId(context, file, t.name.name + "::" + p.name.name),
            displayName: $puck_1.None,
            name: $puck_1.Some(t.name.name + "::" + p.name.name),
            kind: $puck_7.TypeKind.Struct({
            implementations: [],
            kind: $puck_7.StructKind.Unit,
          }),
            _class: $puck_1.None,
            instance: $puck_1.None,
            providesType: $puck_1.None,
            enumMember: $puck_1.Some([
            p.name.name,
            $puck_1.Option.unwrap.call(type_.providesType),
          ]),
          }), function (bound) {
            return $puck_7.Type({
              definition: definition,
              id: generateTypeId(context, file, t.name.name + "::" + p.name.name),
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
              reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumMember', value: p, $isTraitObject: true}, "Duplicate member " + p.name.name);
            };
            return members[p.name.name] = p;
          });
        };
        let $puck_22 = $puck_1.Option.unwrap.call(type_.providesType).kind;
        if (($puck_22.kind === "Enum")) {
          let {value: enum_} = $puck_22;
          $puck_2._Object.assign(enum_.members, memberMap);
        }
        else {
          throw "is not an enum";
        };
        $unwrapTraitObject(self).scope = parentScope;
      };
    };
    return undefined;
  },
    visitTraitDeclaration: function (t) {
    let self = this;
    let parentScope = $unwrapTraitObject(self).scope;
    const type_ = $unwrapTraitObject(t.type_);
    if ((!t.type_)) {
      const definition = $puck_7.Definition({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration', value: t, $isTraitObject: true},
      });
      t.type_ = $puck_7.Type.provides({
        definition: definition,
        id: getTypeId(t, context, file),
        displayName: $puck_1.None,
        name: $puck_1.Some(t.name.name),
        kind: $puck_7.TypeKind.Trait({
        isShorthand: false,
        requiredTraits: [],
        functions: $puck_1.ObjectMap._new(),
      }),
        _class: $puck_7.TypeClass.fromAstNode(t, reportError),
        instance: $puck_1.None,
        providesType: $puck_1.None,
        enumMember: $puck_1.None,
      });
      let $puck_23 = $puck_8.Scope.define.call(parentScope, {
        definition: definition,
        name: t.name.name,
        mutable: false,
        allowRedeclare: false,
        type_: $unwrapTraitObject(t.type_),
        previous: $puck_1.None,
        completeType: $puck_1.None,
      });
      if ($puck_23.kind === "Err") {
        let {value: error} = $puck_23;
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: t.name, $isTraitObject: true}, error);
      };
    }
    else {
      if ((!t.scope)) {
        let scope = $puck_8.Scope.createChild.call(parentScope);
        t.scope = scope;
        $unwrapTraitObject(self).scope = scope;
        let $puck_24 = $puck_1.Option.unwrap.call(type_.providesType)._class;
        if ($puck_24 !== undefined) {
          let _class = $puck_24;
          let c = _class;
          $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}, function (p) {
            $unwrapTraitObject(self).visitTypeParameter(p);
            return $puck_1.List.push.call(c.typeParameters, $unwrapTraitObject(p.type_));
          });
        };
        let $puck_25 = t.traitBound;
        if ($puck_25 !== undefined) {
          let {bound: bound} = $puck_25;
          $unwrapTraitObject(self).visitTypeBound(bound);
          let $puck_26 = getTraits($puck_4.TypeBound.getType.call(bound));
          if ($puck_26.kind === "Ok") {
            let {value: requiredTraits} = $puck_26;
            let $puck_27 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: requiredTraits, $isTraitObject: true}, function (t) {
              return $puck_10.isSameId(t, $puck_1.Option.unwrap.call(type_.providesType));
            });
            if ($puck_27 !== undefined) {
              let trait_ = $puck_27;
              reportError(trait_.definition.token, "A trait can not extend itself");
            };
            let trait_ = $puck_7.Type.getTrait.call(type_);
            trait_.requiredTraits = requiredTraits;
          }
          else {
            if ($puck_26.kind === "Err") {
              let {value: [token, message]} = $puck_26;
              reportError(token, message);
            };
          };
        };
        $puck_8.Scope.setSelfType.call(scope, $puck_1.Option.unwrap.call(type_.providesType));
        $unwrapTraitObject(self).scope = parentScope;
      }
      else {
        $unwrapTraitObject(self).scope = t.scope;
        $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.members, $isTraitObject: true}, function (m) {
          return $unwrapTraitObject(self).visitMethodDeclaration(m, $puck_1.Option.unwrap.call(type_.providesType));
        });
        let trait_ = $puck_7.Type.getTrait.call(type_);
        $puck_1.ObjectMap.merge.call(trait_.functions, $puck_1.ObjectMap.fromIter($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.members, $isTraitObject: true}, function (m) {
          let $puck_28 = m.type_.kind;
          if ($puck_28.kind === "Function") {
            let {value: _function} = $puck_28;
            if ((_function.isAbstract && $puck_1.Option.isNone.call(_function.selfBinding))) {
              reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: m, $isTraitObject: true}, "Static trait functions can not be abstract");
            };
          };
          return [
            $puck_1.Option.unwrap.call(m.name).name,
            m.type_,
          ];
        })));
        let $puck_29 = $puck_1.Option.unwrap.call(type_.providesType)._class;
        if ($puck_29 !== undefined) {
          let _class = $puck_29;
          $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _class.instances, $isTraitObject: true}, function (instance) {
            let instanceTrait = $puck_7.Type.getTrait.call(instance);
            return instanceTrait.functions = trait_.functions;
          });
        };
        $unwrapTraitObject(self).scope = parentScope;
      };
    };
    return undefined;
  },
    visitTypeDeclaration: function (t) {
    let self = this;
    let parentScope = $unwrapTraitObject(self).scope;
    const type_ = $unwrapTraitObject(t.type_);
    if ((!t.type_)) {
      let $puck_30 = t.bound;
      let $puck_31;
      if ($puck_30 !== undefined) {
        let typeBound = $puck_30;
        let $puck_32 = typeBound;
        let $puck_33;
        if ($puck_32.kind === "RecordTypeBound") {
          let {value: record} = $puck_32;
          $puck_33 = $puck_7.StructKind.Record({properties: $puck_1.ObjectMap._new()});
        }
        else {
          let $puck_34;
          if ($puck_32.kind === "TupleTypeBound") {
            let {value: tuple} = $puck_32;
            $puck_34 = $puck_7.StructKind.Tuple({properties: []});
          }
          else {
            let $puck_35;
            if (true) {
              $puck_32;
              throw "Unreachable";
            };
            $puck_34 = $puck_35;
          };
          $puck_33 = $puck_34;
        };
        $puck_31 = $puck_33;
      }
      else {
        $puck_31 = $puck_7.StructKind.Unit;
      };
      const structKind = $puck_31;
      const definition = $puck_7.Definition({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeDeclaration', value: t, $isTraitObject: true},
      });
      t.type_ = $puck_7.Type.provides({
        definition: definition,
        id: getTypeId(t, context, file),
        displayName: $puck_1.None,
        name: $puck_1.Some(t.name.name),
        kind: $puck_7.TypeKind.Struct({
        implementations: [],
        kind: structKind,
      }),
        _class: $puck_7.TypeClass.fromAstNode(t, reportError),
        instance: $puck_1.None,
        providesType: $puck_1.None,
        enumMember: $puck_1.None,
      });
      let $puck_36 = $puck_8.Scope.define.call(parentScope, {
        definition: definition,
        name: t.name.name,
        mutable: false,
        allowRedeclare: false,
        type_: $unwrapTraitObject(t.type_),
        previous: $puck_1.None,
        completeType: $puck_1.None,
      });
      if ($puck_36.kind === "Err") {
        let {value: error} = $puck_36;
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: t.name, $isTraitObject: true}, error);
      };
    }
    else {
      if ((!t.scope)) {
        let scope = $puck_8.Scope.createChild.call(parentScope);
        t.scope = scope;
        $unwrapTraitObject(self).scope = scope;
        let $puck_37 = $puck_1.Option.unwrap.call(type_.providesType)._class;
        if ($puck_37 !== undefined) {
          let _class = $puck_37;
          let c = _class;
          $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}, function (p) {
            $unwrapTraitObject(self).visitTypeParameter(p);
            return $puck_1.List.push.call(c.typeParameters, $unwrapTraitObject(p.type_));
          });
        };
        $puck_8.Scope.setSelfType.call(scope, $puck_1.Option.unwrap.call(type_.providesType));
        $unwrapTraitObject(self).scope = parentScope;
      }
      else {
        $unwrapTraitObject(self).scope = t.scope;
        let $puck_38 = t.bound;
        if ($puck_38 !== undefined) {
          let typeBound = $puck_38;
          $unwrapTraitObject(self).visitTypeBound(typeBound);
          let $puck_39 = $puck_1.Option.unwrap.call(type_.providesType).kind;
          if (($puck_39.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($puck_39.value).kind).kind === "Record")) {
            let {value: {kind: {value: r}}} = $puck_39;
            let $puck_40 = $puck_4.TypeBound.getType.call(typeBound).kind;
            if (($puck_40.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($puck_40.value).kind).kind === "Record")) {
              let {value: {kind: {value: tr}}} = $puck_40;
              $puck_1.ObjectMap.merge.call(r.properties, tr.properties);
            }
            else {
              if (true) {
                $puck_40;
              };
            };
          }
          else {
            if (($puck_39.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($puck_39.value).kind).kind === "Tuple")) {
              let {value: {kind: {value: tuple}}} = $puck_39;
              let $puck_41 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_4.TypeBound.getTupleTypeBound.call(typeBound).properties, $isTraitObject: true}, function (p) {
                return $puck_4.TypeBound.getType.call(p);
              })
;
              $puck_2._Object.assign(tuple, {properties: $puck_1.Iterable[$puck_41.type].toList.call($puck_41)});
            }
            else {
              if (true) {
                $puck_39;
              };
            };
          };
        };
        $unwrapTraitObject(self).scope = parentScope;
      };
    };
    return undefined;
  },
    visitExportDirective: function (e) {
    const self = this;
    return visit.walkExportDirective(self, e);
  },
    visitImportDirective: function (importDirective) {
    let self = this;
    let scope = $unwrapTraitObject(self).scope;
    let $puck_42 = importDirective._module;
    if ($puck_42 !== undefined) {
      let _module = $puck_42;
      if ((!_module.scope)) {
        $puck_6.CompilerContext.runTypeVisitorOnFile.call(context, _module.file);
      };
    };
    let $puck_43 = importDirective.specifier;
    if ($puck_43.kind === "Identifier") {
      let {value: identifier} = $puck_43;
      let $puck_44 = importDirective._module;
      let $puck_45;
      if ($puck_44 !== undefined) {
        let _module = $puck_44;
        $puck_45 = $puck_1.ObjectMap.map.call(_module.exports, function (exportDirective) {
          return {
            type_: $puck_4.ExportDirective.getType.call(exportDirective),
            optional: false,
          };
        });
      }
      else {
        $puck_45 = $puck_1.ObjectMap._new();
      };
      const typeProperties = $puck_45;
      const definition = $puck_7.Definition({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true},
      });
      let type_ = $puck_7.Type({
        definition: definition,
        id: $puck_1.None,
        displayName: $puck_1.Some(identifier.name),
        name: $puck_1.None,
        kind: $puck_7.TypeKind.Struct({
        implementations: [],
        kind: $puck_7.StructKind.Record({properties: typeProperties}),
      }),
        instance: $puck_1.None,
        _class: $puck_1.None,
        providesType: $puck_1.None,
        enumMember: $puck_1.None,
      });
      let $puck_46 = $puck_8.Scope.define.call(scope, {
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
            $puck_6.CompilerContext.runTypeVisitorOnFile.call(context, _module.file);
          }
          else {
            $puck_6.CompilerContext.runCheckerOnFile.call(context, _module.file);
          };
          const moduleScope = $unwrapTraitObject(_module.scope);
          let typeProperties = $puck_1.ObjectMap.map.call(_module.exports, function (exportDirective) {
            return {
              type_: $puck_4.ExportDirective.getType.call(exportDirective),
              optional: false,
            };
          });
          let $puck_47 = type_.kind;
          if (($puck_47.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($puck_47.value).kind).kind === "Record")) {
            let {value: {kind: {value: record}}} = $puck_47;
            let r = record;
            r.properties = typeProperties;
          }
          else {
            if (true) {
              $puck_47;
              throw "Unreachable";
            };
          };
          return $puck_1.Some(type_);
        };
      }),
      });
      if ($puck_46.kind === "Err") {
        let {value: error} = $puck_46;
        return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true}, error);
      };
    }
    else {
      if ($puck_43.kind === "ObjectDestructure") {
        let {value: d} = $puck_43;
        return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: d.members, $isTraitObject: true}, function (m) {
          let $puck_48 = importDirective._module;
          if ($puck_48 !== undefined) {
            let _module = $puck_48;
            const moduleScope = $unwrapTraitObject(_module.scope);
            const importedBinding = $puck_1.Option.unwrapOr.call($puck_8.Scope.getBinding.call(moduleScope, m.property.name, "TypeVisitor"), $unwrapTraitObject($puck_2._Object.assign({})));
            let $puck_49 = $puck_8.Scope.define.call(scope, {
              definition: $puck_7.Definition({
              file: $puck_1.Option.unwrapOr.call(m.file, file),
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
                $puck_6.CompilerContext.runTypeVisitorOnFile.call(context, _module.file);
              }
              else {
                $puck_6.CompilerContext.runCheckerOnFile.call(context, _module.file);
              };
              const externalBinding = $puck_8.Scope.getBinding.call(moduleScope, m.property.name, visitor);
              return $puck_1.Option.map.call(externalBinding, function (binding) {
                return binding.type_;
              });
            }),
            });
            if ($puck_49.kind === "Err") {
              let {value: error} = $puck_49;
              reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: m.local, $isTraitObject: true}, error);
            };
            m.local.type_ = importedBinding.type_;
            imports[m.local.name] = importDirective.file;
            return undefined;
          }
          else {
            let $puck_50 = $puck_8.Scope.define.call(scope, {
              definition: $puck_7.Definition({
              file: file,
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
            if ($puck_50.kind === "Err") {
              let {value: error} = $puck_50;
              return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: m.local, $isTraitObject: true}, error);
            };
          };
        });
      }
      else {
        if ($puck_43.kind === "Asterisk") {
          let $puck_51 = $puck_43;;
          return $puck_51;
        };
      };
    };
  },
    visitIdentifier: function (i) {
    const self = this;
    const scope = $unwrapTraitObject(self).scope;
    let $puck_52 = $puck_8.Scope.getBinding.call(scope, i.name, "ImplVisitor");
    if ($puck_52 !== undefined) {
      let binding = $puck_52;
      i.binding = binding;
      i.type_ = binding.type_;
    }
    else {
      $puck_6.CompilerContext.reportError.call(context, file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: i, $isTraitObject: true}, $puck_7.CompilationError.UndefinedVariable(i.name));
    };
    return undefined;
  },
    visitTypeBound: function (t) {
    const self = this;
    return visit.walkTypeBound(self, t);
  },
    visitNamedTypeBound: function (t) {
    const self = this;
    const scope = $unwrapTraitObject(self).scope;
    const result = $puck_8.Scope.getTypePath.call(scope, t.path, "TypeVisitor");
    let $puck_53 = result;
    if ($puck_53.kind === "Ok") {
      let {value: binding} = $puck_53;
    }
    else {
      if (($puck_53.kind === "Err" && $unwrapTraitObject($puck_53.value).kind === "UndefinedType")) {
        let {value: {value: name}} = $puck_53;
        $puck_6.CompilerContext.reportError.call(context, file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t, $isTraitObject: true}, $puck_7.CompilationError.UndefinedVariable(name));
      }
      else {
        if (($puck_53.kind === "Err" && $unwrapTraitObject($puck_53.value).kind === "Other")) {
          let {value: {value: err}} = $puck_53;
          reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t, $isTraitObject: true}, err);
        };
      };
    };
    return structureVisitorInstance.visitNamedTypeBound.call(self, t);
  },
    visitTypeProperty: visit.walkingVisitor.visitTypeProperty,
  });
};
exports.TypeVisitor = TypeVisitor
