'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.TypeVisitorundefined;
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
  if ($unwrapTraitObject($puck_10).kind === "EnumDeclaration") {
    let {value: [$puck_11]} = $unwrapTraitObject($puck_10);
    return true;
  }
  else {
    if ($unwrapTraitObject($puck_10).kind === "TraitDeclaration") {
      let {value: [$puck_12]} = $unwrapTraitObject($puck_10);
      return true;
    }
    else {
      if ($unwrapTraitObject($puck_10).kind === "TypeDeclaration") {
        let {value: [$puck_13]} = $unwrapTraitObject($puck_10);
        return true;
      }
      else {
        if (true) {
          let $puck_14 = $puck_10;
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
  let $puck_15 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: declaration.attributes, $isTraitObject: true}, function (a) {
    return (a.name.name === "type_id");
  });
  if ($puck_15.kind === "Some") {
    let {value: [attribute]} = $puck_15;
    let $puck_16 = attribute.data;
    if ($unwrapTraitObject($puck_16).kind === "Value") {
      let {value: [literal]} = $unwrapTraitObject($puck_16);
      let $puck_17 = literal;
      if ($unwrapTraitObject($puck_17).kind === "StringLiteral") {
        let {value: [{value: value}]} = $unwrapTraitObject($puck_17);
        return $puck_1.Some(value);
      }
      else {
        if (true) {
          let $puck_18 = $puck_17;
          $puck_6.CompilerContext.reportError.call(context, file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Attribute', value: attribute, $isTraitObject: true}, $puck_7.CompilationError.Other("type_id must be a string"));
          return generateTypeId(context, file, declaration.name.name);
        };
      };
    }
    else {
      if (true) {
        let $puck_19 = $puck_16;
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
    let declarations = [];
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: m.statements, $isTraitObject: true}, function (s) {
      let $puck_20 = s;
      if ($unwrapTraitObject($puck_20).kind === "EnumDeclaration") {
        let {value: [$puck_21]} = $unwrapTraitObject($puck_20);
        return $puck_1.List.push.call(declarations, s);
      }
      else {
        if ($unwrapTraitObject($puck_20).kind === "ImportDirective") {
          let {value: [i]} = $unwrapTraitObject($puck_20);
          return $puck_1.List.push.call(imports, i);
        }
        else {
          if ($unwrapTraitObject($puck_20).kind === "TraitDeclaration") {
            let {value: [$puck_22]} = $unwrapTraitObject($puck_20);
            return $puck_1.List.push.call(declarations, s);
          }
          else {
            if ($unwrapTraitObject($puck_20).kind === "TypeDeclaration") {
              let {value: [$puck_23]} = $unwrapTraitObject($puck_20);
              return $puck_1.List.push.call(declarations, s);
            }
            else {
              if ($unwrapTraitObject($puck_20).kind === "ExportDirective") {
                let {value: [e]} = $unwrapTraitObject($puck_20);
                let $puck_24 = e.statement;
                if ($unwrapTraitObject($puck_24).kind === "EnumDeclaration") {
                  let {value: [$puck_25]} = $unwrapTraitObject($puck_24);
                  return $puck_1.List.push.call(declarations, s);
                }
                else {
                  if ($unwrapTraitObject($puck_24).kind === "TraitDeclaration") {
                    let {value: [$puck_26]} = $unwrapTraitObject($puck_24);
                    return $puck_1.List.push.call(declarations, s);
                  }
                  else {
                    if ($unwrapTraitObject($puck_24).kind === "TypeDeclaration") {
                      let {value: [$puck_27]} = $unwrapTraitObject($puck_24);
                      return $puck_1.List.push.call(declarations, s);
                    }
                    else {
                      if (true) {
                        let $puck_28 = $puck_24;;
                        let $puck_29 = $puck_28;;
                        return $puck_28;
                      };
                    };
                  };
                };
              }
              else {
                if (true) {
                  let $puck_30 = $puck_20;;
                  let $puck_31 = $puck_30;;
                  return $puck_30;
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
        id: generateTypeId(context, file, t.name.name),
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
      let $puck_32 = $puck_8.Scope.define.call(parentScope, {
        definition: definition,
        name: t.name.name,
        mutable: false,
        allowRedeclare: false,
        type_: $unwrapTraitObject(t.type_),
        previous: $puck_1.None,
        completeType: $puck_1.None,
      });
      if ($puck_32.kind === "Err") {
        let {value: [error]} = $puck_32;
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: t.name, $isTraitObject: true}, error);
      };
    }
    else {
      if ((!t.scope)) {
        let scope = $puck_8.Scope.createChild.call(parentScope);
        t.scope = scope;
        $unwrapTraitObject(self).scope = scope;
        let $puck_33 = $puck_1.Option.unwrap.call(type_.providesType)._class;
        if ($puck_33.kind === "Some") {
          let {value: [_class]} = $puck_33;
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
        let $puck_34 = $puck_1.Option.unwrap.call(type_.providesType).kind;
        if (($puck_34.kind === "Enum")) {
          let {value: [enum_]} = $puck_34;
          $puck_2._Object.assign(enum_.members, memberMap);
        }
        else {
          throw "is not an enum";
        };
        $unwrapTraitObject(self).scope = parentScope;
      };
    };
    return [];
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
      let $puck_35 = $puck_8.Scope.define.call(parentScope, {
        definition: definition,
        name: t.name.name,
        mutable: false,
        allowRedeclare: false,
        type_: $unwrapTraitObject(t.type_),
        previous: $puck_1.None,
        completeType: $puck_1.None,
      });
      if ($puck_35.kind === "Err") {
        let {value: [error]} = $puck_35;
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: t.name, $isTraitObject: true}, error);
      };
    }
    else {
      if ((!t.scope)) {
        let scope = $puck_8.Scope.createChild.call(parentScope);
        t.scope = scope;
        $unwrapTraitObject(self).scope = scope;
        let $puck_36 = $puck_1.Option.unwrap.call(type_.providesType)._class;
        if ($puck_36.kind === "Some") {
          let {value: [_class]} = $puck_36;
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
        let $puck_37 = $puck_1.Option.unwrap.call(type_.providesType).kind;
        if ($puck_37.kind === "Trait") {
          let {value: [trait_]} = $puck_37;
          $puck_2._Object.assign(trait_.functions, $puck_1.ObjectMap.fromIter($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.members, $isTraitObject: true}, function (m) {
            let $puck_38 = m.type_.kind;
            if ($puck_38.kind === "Function") {
              let {value: [_function]} = $puck_38;
              if ((_function.isAbstract && $puck_1.Option.isNone.call(_function.selfBinding))) {
                reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: m, $isTraitObject: true}, "Static trait functions can not be abstract");
              };
            };
            return [
              $puck_1.Option.unwrap.call(m.name).name,
              m.type_,
            ];
          })));
          let $puck_39 = $puck_1.Option.unwrap.call(type_.providesType)._class;
          if ($puck_39.kind === "Some") {
            let {value: [_class]} = $puck_39;
            $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _class.instances, $isTraitObject: true}, function (instance) {
              let $puck_40 = instance.kind;
              if ($puck_40.kind === "Trait") {
                let {value: [instanceTrait]} = $puck_40;
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
    return [];
  },
    visitTypeDeclaration: function (t) {
    let self = this;
    let parentScope = $unwrapTraitObject(self).scope;
    const type_ = $unwrapTraitObject(t.type_);
    if ((!t.type_)) {
      let $puck_41 = t.bound;
      let $puck_42;
      if ($puck_41.kind === "Some") {
        let {value: [typeBound]} = $puck_41;
        let $puck_43 = typeBound;
        let $puck_44;
        if ($unwrapTraitObject($puck_43).kind === "RecordTypeBound") {
          let {value: [record]} = $unwrapTraitObject($puck_43);
          $puck_44 = $puck_7.StructKind.Record({properties: $puck_1.ObjectMap._new()});
        }
        else {
          let $puck_45;
          if ($unwrapTraitObject($puck_43).kind === "TupleTypeBound") {
            let {value: [tuple]} = $unwrapTraitObject($puck_43);
            $puck_45 = $puck_7.StructKind.Tuple({properties: []});
          }
          else {
            let $puck_46;
            if (true) {
              let $puck_47 = $puck_43;
              throw "Unreachable";
            };
            $puck_45 = $puck_46;
          };
          $puck_44 = $puck_45;
        };
        $puck_42 = $puck_44;
      }
      else {
        $puck_42 = $puck_7.StructKind.Unit;
      };
      const structKind = $puck_42;
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
      let $puck_48 = $puck_8.Scope.define.call(parentScope, {
        definition: definition,
        name: t.name.name,
        mutable: false,
        allowRedeclare: false,
        type_: $unwrapTraitObject(t.type_),
        previous: $puck_1.None,
        completeType: $puck_1.None,
      });
      if ($puck_48.kind === "Err") {
        let {value: [error]} = $puck_48;
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: t.name, $isTraitObject: true}, error);
      };
    }
    else {
      if ((!t.scope)) {
        let scope = $puck_8.Scope.createChild.call(parentScope);
        t.scope = scope;
        $unwrapTraitObject(self).scope = scope;
        let $puck_49 = $puck_1.Option.unwrap.call(type_.providesType)._class;
        if ($puck_49.kind === "Some") {
          let {value: [_class]} = $puck_49;
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
        let $puck_50 = t.bound;
        if ($puck_50.kind === "Some") {
          let {value: [typeBound]} = $puck_50;
          $unwrapTraitObject(self).visitTypeBound(typeBound);
          let $puck_51 = $puck_1.Option.unwrap.call(type_.providesType).kind;
          if (($unwrapTraitObject($puck_51).kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_51).value)[0]).kind).kind === "Record")) {
            let {value: [{kind: {value: [{properties: properties}]}}]} = $unwrapTraitObject($puck_51);
            $puck_2._Object.assign(properties, $puck_1.ObjectMap.fromIter($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_4.TypeBound.getRecordTypeBound.call(typeBound).properties, $isTraitObject: true}, function (p) {
              return [
                p.name.name,
                $puck_4.TypeBound.getType.call(p.typeBound),
              ];
            })));
          }
          else {
            if (($unwrapTraitObject($puck_51).kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_51).value)[0]).kind).kind === "Tuple")) {
              let {value: [{kind: {value: [tuple]}}]} = $unwrapTraitObject($puck_51);
              let $puck_52 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_4.TypeBound.getTupleTypeBound.call(typeBound).properties, $isTraitObject: true}, function (p) {
                return $puck_4.TypeBound.getType.call(p);
              })
;
              $puck_2._Object.assign(tuple, {properties: $puck_1.Iterable[$puck_52.type].toList.call($puck_52)});
            }
            else {
              if (true) {
                let $puck_53 = $puck_51;
              };
            };
          };
        };
        $unwrapTraitObject(self).scope = parentScope;
      };
    };
    return [];
  },
    visitExportDirective: function (e) {
    const self = this;
    return visit.walkExportDirective(self, e);
  },
    visitImportDirective: function (importDirective) {
    let self = this;
    let scope = $unwrapTraitObject(self).scope;
    let $puck_54 = importDirective._module;
    if ($puck_54.kind === "Some") {
      let {value: [_module]} = $puck_54;
      if ((!_module.scope)) {
        $puck_6.CompilerContext.runTypeVisitorOnFile.call(context, _module.file);
      };
    };
    let $puck_55 = importDirective.specifier;
    if ($unwrapTraitObject($puck_55).kind === "Identifier") {
      let {value: [identifier]} = $unwrapTraitObject($puck_55);
      let $puck_56 = importDirective._module;
      let $puck_57;
      if ($puck_56.kind === "Some") {
        let {value: [_module]} = $puck_56;
        $puck_57 = $puck_1.ObjectMap.map.call(_module.exports, function (exportDirective) {
          return $puck_4.ExportDirective.getType.call(exportDirective);
        });
      }
      else {
        $puck_57 = $puck_1.ObjectMap._new();
      };
      const typeProperties = $puck_57;
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
      let $puck_58 = $puck_8.Scope.define.call(scope, {
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
            return $puck_4.ExportDirective.getType.call(exportDirective);
          });
          let $puck_59 = type_.kind;
          if (($unwrapTraitObject($puck_59).kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_59).value)[0]).kind).kind === "Record")) {
            let {value: [{kind: {value: [record]}}]} = $unwrapTraitObject($puck_59);
            let r = record;
            r.properties = typeProperties;
          }
          else {
            if (true) {
              let $puck_60 = $puck_59;
              throw "Unreachable";
            };
          };
          return $puck_1.Some(type_);
        };
      }),
      });
      if ($puck_58.kind === "Err") {
        let {value: [error]} = $puck_58;
        return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true}, error);
      };
    }
    else {
      if ($unwrapTraitObject($puck_55).kind === "ObjectDestructure") {
        let {value: [d]} = $unwrapTraitObject($puck_55);
        return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: d.members, $isTraitObject: true}, function (m) {
          let $puck_61 = importDirective._module;
          if ($puck_61.kind === "Some") {
            let {value: [_module]} = $puck_61;
            const moduleScope = $unwrapTraitObject(_module.scope);
            const importedBinding = $puck_1.Option.unwrapOr.call($puck_8.Scope.getBinding.call(moduleScope, m.property.name, "TypeVisitor"), $unwrapTraitObject($puck_2._Object.assign({})));
            let $puck_62 = $puck_8.Scope.define.call(scope, {
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
            if ($puck_62.kind === "Err") {
              let {value: [error]} = $puck_62;
              reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: m.local, $isTraitObject: true}, error);
            };
            m.local.type_ = importedBinding.type_;
            imports[m.local.name] = importDirective.file;
            return [];
          }
          else {
            let $puck_63 = $puck_8.Scope.define.call(scope, {
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
            if ($puck_63.kind === "Err") {
              let {value: [error]} = $puck_63;
              return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: m.local, $isTraitObject: true}, error);
            };
          };
        });
      }
      else {
        if ($unwrapTraitObject($puck_55).kind === "Asterisk") {
          let $puck_64 = $unwrapTraitObject($puck_55);;
          let {value: [$puck_65]} = $puck_64;;
          return $puck_64;
        };
      };
    };
  },
    visitTypeBound: function (t) {
    const self = this;
    return visit.walkTypeBound(self, t);
  },
    visitNamedTypeBound: function (t) {
    const self = this;
    const scope = $unwrapTraitObject(self).scope;
    const result = $puck_8.Scope.getTypePath.call(scope, t.path, "TypeVisitor");
    let $puck_66 = result;
    if ($unwrapTraitObject($puck_66).kind === "Ok") {
      let {value: [binding]} = $unwrapTraitObject($puck_66);
    }
    else {
      if (($unwrapTraitObject($puck_66).kind === "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_66).value)[0]).kind === "UndefinedType")) {
        let {value: [{value: [name]}]} = $unwrapTraitObject($puck_66);
        $puck_6.CompilerContext.reportError.call(context, file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t, $isTraitObject: true}, $puck_7.CompilationError.UndefinedVariable(name));
      }
      else {
        if (($unwrapTraitObject($puck_66).kind === "Err" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_66).value)[0]).kind === "Other")) {
          let {value: [{value: [err]}]} = $unwrapTraitObject($puck_66);
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
