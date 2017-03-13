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
function isTypeScope(e) {
  let $puck_10 = e.statement;
  if ($puck_10.kind === "EnumDeclaration") {
    $puck_10;
    return true;
  }
  else {
    if ($puck_10.kind === "TraitDeclaration") {
      $puck_10;
      return true;
    }
    else {
      if ($puck_10.kind === "TypeDeclaration") {
        $puck_10;
        return true;
      }
      else {
        if (true) {
          $puck_10;
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
  let $puck_11 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: declaration.attributes, $isTraitObject: true}, function (a) {
    return (a.name.name === "type_id");
  });
  if ($puck_11 !== undefined) {
    let attribute = $puck_11;
    let $puck_12 = attribute.data;
    if ($puck_12.kind === "Value") {
      let {value: literal} = $puck_12;
      let $puck_13 = literal;
      if ($puck_13.kind === "StringLiteral") {
        let {value: {value: value}} = $puck_13;
        return $puck_1.Some(value);
      }
      else {
        if (true) {
          $puck_13;
          $puck_6.CompilerContext.reportError.call(context, file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Attribute', value: attribute, $isTraitObject: true}, $puck_7.CompilationError.Other("type_id must be a string"));
          return generateTypeId(context, file, declaration.name.name);
        };
      };
    }
    else {
      if (true) {
        $puck_12;
        $puck_6.CompilerContext.reportError.call(context, file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Attribute', value: attribute, $isTraitObject: true}, $puck_7.CompilationError.Other("type_id must have a value"));
        return generateTypeId(context, file, declaration.name.name);
      };
    };
  }
  else {
    return generateTypeId(context, file, declaration.name.name);
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
      let $puck_14 = s;
      if ($puck_14.kind === "EnumDeclaration") {
        $puck_14;
        return $puck_1.List.push.call(declarations, s);
      }
      else {
        if ($puck_14.kind === "ImportDirective") {
          let {value: i} = $puck_14;
          return $puck_1.List.push.call(imports, i);
        }
        else {
          if ($puck_14.kind === "TraitDeclaration") {
            $puck_14;
            return $puck_1.List.push.call(declarations, s);
          }
          else {
            if ($puck_14.kind === "TypeDeclaration") {
              $puck_14;
              return $puck_1.List.push.call(declarations, s);
            }
            else {
              if ($puck_14.kind === "ExportDirective") {
                let {value: e} = $puck_14;
                let $puck_15 = e.statement;
                if ($puck_15.kind === "EnumDeclaration") {
                  $puck_15;
                  return $puck_1.List.push.call(declarations, s);
                }
                else {
                  if ($puck_15.kind === "TraitDeclaration") {
                    $puck_15;
                    return $puck_1.List.push.call(declarations, s);
                  }
                  else {
                    if ($puck_15.kind === "TypeDeclaration") {
                      $puck_15;
                      return $puck_1.List.push.call(declarations, s);
                    }
                    else {
                      if ($puck_15.kind === "Identifier") {
                        $puck_15;
                        return $puck_1.List.push.call(reexports, s);
                      }
                      else {
                        if (true) {
                          let $puck_16 = $puck_15;;
                          return $puck_16;
                        };
                      };
                    };
                  };
                };
              }
              else {
                if (true) {
                  let $puck_17 = $puck_14;;
                  return $puck_17;
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
      let $puck_18 = $puck_8.Scope.define.call(parentScope, {
        definition: definition,
        name: t.name.name,
        mutable: false,
        allowRedeclare: false,
        type_: $unwrapTraitObject(t.type_),
        previous: $puck_1.None,
        completeType: $puck_1.None,
      });
      if ($puck_18.kind === "Err") {
        let {value: error} = $puck_18;
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: t.name, $isTraitObject: true}, error);
      };
    }
    else {
      if ((!t.scope)) {
        let scope = $puck_8.Scope.createChild.call(parentScope);
        t.scope = scope;
        $unwrapTraitObject(self).scope = scope;
        let $puck_19 = $puck_1.Option.unwrap.call(type_.providesType)._class;
        if ($puck_19 !== undefined) {
          let _class = $puck_19;
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
        let $puck_20 = $puck_1.Option.unwrap.call(type_.providesType).kind;
        if (($puck_20.kind === "Enum")) {
          let {value: enum_} = $puck_20;
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
        functions: $puck_1.ObjectMap._new(),
      }),
        _class: $puck_7.TypeClass.fromAstNode(t, reportError),
        instance: $puck_1.None,
        providesType: $puck_1.None,
        enumMember: $puck_1.None,
      });
      let $puck_21 = $puck_8.Scope.define.call(parentScope, {
        definition: definition,
        name: t.name.name,
        mutable: false,
        allowRedeclare: false,
        type_: $unwrapTraitObject(t.type_),
        previous: $puck_1.None,
        completeType: $puck_1.None,
      });
      if ($puck_21.kind === "Err") {
        let {value: error} = $puck_21;
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: t.name, $isTraitObject: true}, error);
      };
    }
    else {
      if ((!t.scope)) {
        let scope = $puck_8.Scope.createChild.call(parentScope);
        t.scope = scope;
        $unwrapTraitObject(self).scope = scope;
        let $puck_22 = $puck_1.Option.unwrap.call(type_.providesType)._class;
        if ($puck_22 !== undefined) {
          let _class = $puck_22;
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
          return $unwrapTraitObject(self).visitMethodDeclaration(m, $puck_1.Option.unwrap.call(type_.providesType));
        });
        let $puck_23 = $puck_1.Option.unwrap.call(type_.providesType).kind;
        if ($puck_23.kind === "Trait") {
          let {value: trait_} = $puck_23;
          $puck_2._Object.assign(trait_.functions, $puck_1.ObjectMap.fromIter($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.members, $isTraitObject: true}, function (m) {
            let $puck_24 = m.type_.kind;
            if ($puck_24.kind === "Function") {
              let {value: _function} = $puck_24;
              if ((_function.isAbstract && $puck_1.Option.isNone.call(_function.selfBinding))) {
                reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: m, $isTraitObject: true}, "Static trait functions can not be abstract");
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
              let $puck_26 = instance.kind;
              if ($puck_26.kind === "Trait") {
                let {value: instanceTrait} = $puck_26;
                return $puck_2._Object.assign(instanceTrait, {functions: trait_.functions});
              }
              else {
                throw "instance is not a trait";
              };
            });
          };
        }
        else {
          throw "is not a trait";
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
      let $puck_27 = t.bound;
      let $puck_28;
      if ($puck_27 !== undefined) {
        let typeBound = $puck_27;
        let $puck_29 = typeBound;
        let $puck_30;
        if ($puck_29.kind === "RecordTypeBound") {
          let {value: record} = $puck_29;
          $puck_30 = $puck_7.StructKind.Record({properties: $puck_1.ObjectMap._new()});
        }
        else {
          let $puck_31;
          if ($puck_29.kind === "TupleTypeBound") {
            let {value: tuple} = $puck_29;
            $puck_31 = $puck_7.StructKind.Tuple({properties: []});
          }
          else {
            let $puck_32;
            if (true) {
              $puck_29;
              throw "Unreachable";
            };
            $puck_31 = $puck_32;
          };
          $puck_30 = $puck_31;
        };
        $puck_28 = $puck_30;
      }
      else {
        $puck_28 = $puck_7.StructKind.Unit;
      };
      const structKind = $puck_28;
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
      let $puck_33 = $puck_8.Scope.define.call(parentScope, {
        definition: definition,
        name: t.name.name,
        mutable: false,
        allowRedeclare: false,
        type_: $unwrapTraitObject(t.type_),
        previous: $puck_1.None,
        completeType: $puck_1.None,
      });
      if ($puck_33.kind === "Err") {
        let {value: error} = $puck_33;
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: t.name, $isTraitObject: true}, error);
      };
    }
    else {
      if ((!t.scope)) {
        let scope = $puck_8.Scope.createChild.call(parentScope);
        t.scope = scope;
        $unwrapTraitObject(self).scope = scope;
        let $puck_34 = $puck_1.Option.unwrap.call(type_.providesType)._class;
        if ($puck_34 !== undefined) {
          let _class = $puck_34;
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
        let $puck_35 = t.bound;
        if ($puck_35 !== undefined) {
          let typeBound = $puck_35;
          $unwrapTraitObject(self).visitTypeBound(typeBound);
          let $puck_36 = $puck_1.Option.unwrap.call(type_.providesType).kind;
          if (($puck_36.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($puck_36.value).kind).kind === "Record")) {
            let {value: {kind: {value: r}}} = $puck_36;
            let $puck_37 = $puck_4.TypeBound.getType.call(typeBound).kind;
            if (($puck_37.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($puck_37.value).kind).kind === "Record")) {
              let {value: {kind: {value: tr}}} = $puck_37;
              $puck_1.ObjectMap.merge.call(r.properties, tr.properties);
            }
            else {
              if (true) {
                $puck_37;
              };
            };
          }
          else {
            if (($puck_36.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($puck_36.value).kind).kind === "Tuple")) {
              let {value: {kind: {value: tuple}}} = $puck_36;
              let $puck_38 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_4.TypeBound.getTupleTypeBound.call(typeBound).properties, $isTraitObject: true}, function (p) {
                return $puck_4.TypeBound.getType.call(p);
              })
;
              $puck_2._Object.assign(tuple, {properties: $puck_1.Iterable[$puck_38.type].toList.call($puck_38)});
            }
            else {
              if (true) {
                $puck_36;
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
    let $puck_39 = importDirective._module;
    if ($puck_39 !== undefined) {
      let _module = $puck_39;
      if ((!_module.scope)) {
        $puck_6.CompilerContext.runTypeVisitorOnFile.call(context, _module.file);
      };
    };
    let $puck_40 = importDirective.specifier;
    if ($puck_40.kind === "Identifier") {
      let {value: identifier} = $puck_40;
      let $puck_41 = importDirective._module;
      let $puck_42;
      if ($puck_41 !== undefined) {
        let _module = $puck_41;
        $puck_42 = $puck_1.ObjectMap.map.call(_module.exports, function (exportDirective) {
          return {
            type_: $puck_4.ExportDirective.getType.call(exportDirective),
            optional: false,
          };
        });
      }
      else {
        $puck_42 = $puck_1.ObjectMap._new();
      };
      const typeProperties = $puck_42;
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
      let $puck_43 = $puck_8.Scope.define.call(scope, {
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
          let $puck_44 = type_.kind;
          if (($puck_44.kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($puck_44.value).kind).kind === "Record")) {
            let {value: {kind: {value: record}}} = $puck_44;
            let r = record;
            r.properties = typeProperties;
          }
          else {
            if (true) {
              $puck_44;
              throw "Unreachable";
            };
          };
          return $puck_1.Some(type_);
        };
      }),
      });
      if ($puck_43.kind === "Err") {
        let {value: error} = $puck_43;
        return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true}, error);
      };
    }
    else {
      if ($puck_40.kind === "ObjectDestructure") {
        let {value: d} = $puck_40;
        return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: d.members, $isTraitObject: true}, function (m) {
          let $puck_45 = importDirective._module;
          if ($puck_45 !== undefined) {
            let _module = $puck_45;
            const moduleScope = $unwrapTraitObject(_module.scope);
            const importedBinding = $puck_1.Option.unwrapOr.call($puck_8.Scope.getBinding.call(moduleScope, m.property.name, "TypeVisitor"), $unwrapTraitObject($puck_2._Object.assign({})));
            let $puck_46 = $puck_8.Scope.define.call(scope, {
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
            if ($puck_46.kind === "Err") {
              let {value: error} = $puck_46;
              reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: m.local, $isTraitObject: true}, error);
            };
            m.local.type_ = importedBinding.type_;
            imports[m.local.name] = importDirective.file;
            return undefined;
          }
          else {
            let $puck_47 = $puck_8.Scope.define.call(scope, {
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
            if ($puck_47.kind === "Err") {
              let {value: error} = $puck_47;
              return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: m.local, $isTraitObject: true}, error);
            };
          };
        });
      }
      else {
        if ($puck_40.kind === "Asterisk") {
          let $puck_48 = $puck_40;;
          return $puck_48;
        };
      };
    };
  },
    visitIdentifier: function (i) {
    const self = this;
    const scope = $unwrapTraitObject(self).scope;
    let $puck_49 = $puck_8.Scope.getBinding.call(scope, i.name, "ImplVisitor");
    if ($puck_49 !== undefined) {
      let binding = $puck_49;
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
    let $puck_50 = result;
    if ($puck_50.kind === "Ok") {
      let {value: binding} = $puck_50;
    }
    else {
      if (($puck_50.kind === "Err" && $unwrapTraitObject($puck_50.value).kind === "UndefinedType")) {
        let {value: {value: name}} = $puck_50;
        $puck_6.CompilerContext.reportError.call(context, file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t, $isTraitObject: true}, $puck_7.CompilationError.UndefinedVariable(name));
      }
      else {
        if (($puck_50.kind === "Err" && $unwrapTraitObject($puck_50.value).kind === "Other")) {
          let {value: {value: err}} = $puck_50;
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
