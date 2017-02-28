'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.TypeVisitorundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("path");
const $puck_4 = require("./../ast/ast");
const $puck_5 = require("./../ast/span");
const visit = require("./../ast/visit");
const $puck_6 = require("./../entities");
const $puck_7 = require("./src/scope");
const $puck_8 = require("./src/structure_visitor");
function isTypeScope(e) {
  let $puck_9 = e.statement;
  if ($unwrapTraitObject($puck_9).kind === "EnumDeclaration") {
    let {value: [$puck_10]} = $unwrapTraitObject($puck_9);
    return true;
  }
  else {
    if ($unwrapTraitObject($puck_9).kind === "TraitDeclaration") {
      let {value: [$puck_11]} = $unwrapTraitObject($puck_9);
      return true;
    }
    else {
      if ($unwrapTraitObject($puck_9).kind === "TypeDeclaration") {
        let {value: [$puck_12]} = $unwrapTraitObject($puck_9);
        return true;
      }
      else {
        if (true) {
          let $puck_13 = $puck_9;
          return false;
        };
      };
    };
  };
};
function generateTypeId(context, file, name) {
  const path = $puck_3.relative($unwrapTraitObject(context).projectPath, file.absolutePath);
  return $puck_1.Some(path + ":" + name + "");
};
function getTypeId(declaration, context, file) {
  const reportError = $unwrapTraitObject($unwrapTraitObject(context).reportError).bind(context, file);
  let $puck_14 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: declaration.attributes, $isTraitObject: true}, function (a) {
    return (a.name.name === "type_id");
  });
  if ($puck_14.kind === "Some") {
    let {value: [attribute]} = $puck_14;
    let $puck_15 = attribute.data;
    if ($unwrapTraitObject($puck_15).kind === "Value") {
      let {value: [literal]} = $unwrapTraitObject($puck_15);
      let $puck_16 = literal;
      if ($unwrapTraitObject($puck_16).kind === "StringLiteral") {
        let {value: [{value: value}]} = $unwrapTraitObject($puck_16);
        return $puck_1.Some(value);
      }
      else {
        if (true) {
          let $puck_17 = $puck_16;
          reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Attribute', value: attribute, $isTraitObject: true}, "type_id must be a string");
          return generateTypeId(context, file, declaration.name.name);
        };
      };
    }
    else {
      if (true) {
        let $puck_18 = $puck_15;
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Attribute', value: attribute, $isTraitObject: true}, "type_id must have a value");
        return generateTypeId(context, file, declaration.name.name);
      };
    };
  }
  else {
    return generateTypeId(context, file, declaration.name.name);
  };
};
function TypeVisitor(context, file) {
  const reportError = $unwrapTraitObject($unwrapTraitObject(context).reportError).bind(context, file);
  let imports = $puck_1.ObjectMap._new();
  const structureVisitorInstance = $puck_8.structureVisitor(file, reportError, "TypeVisitor");
  return $puck_2._Object.assign({}, visit.emptyVisitor, structureVisitorInstance, {
    scope: $puck_7.Scope._new(context),
    visitModule: function (m) {
    let self = this;
    m.scope = $unwrapTraitObject(self).scope;
    let imports = [];
    let declarations = [];
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: m.statements, $isTraitObject: true}, function (s) {
      let $puck_19 = s;
      if ($unwrapTraitObject($puck_19).kind === "EnumDeclaration") {
        let {value: [$puck_20]} = $unwrapTraitObject($puck_19);
        return $puck_1.List.push.call(declarations, s);
      }
      else {
        if ($unwrapTraitObject($puck_19).kind === "ImportDirective") {
          let {value: [i]} = $unwrapTraitObject($puck_19);
          return $puck_1.List.push.call(imports, i);
        }
        else {
          if ($unwrapTraitObject($puck_19).kind === "TraitDeclaration") {
            let {value: [$puck_21]} = $unwrapTraitObject($puck_19);
            return $puck_1.List.push.call(declarations, s);
          }
          else {
            if ($unwrapTraitObject($puck_19).kind === "TypeDeclaration") {
              let {value: [$puck_22]} = $unwrapTraitObject($puck_19);
              return $puck_1.List.push.call(declarations, s);
            }
            else {
              if ($unwrapTraitObject($puck_19).kind === "ExportDirective") {
                let {value: [e]} = $unwrapTraitObject($puck_19);
                let $puck_23 = e.statement;
                if ($unwrapTraitObject($puck_23).kind === "EnumDeclaration") {
                  let {value: [$puck_24]} = $unwrapTraitObject($puck_23);
                  return $puck_1.List.push.call(declarations, s);
                }
                else {
                  if ($unwrapTraitObject($puck_23).kind === "TraitDeclaration") {
                    let {value: [$puck_25]} = $unwrapTraitObject($puck_23);
                    return $puck_1.List.push.call(declarations, s);
                  }
                  else {
                    if ($unwrapTraitObject($puck_23).kind === "TypeDeclaration") {
                      let {value: [$puck_26]} = $unwrapTraitObject($puck_23);
                      return $puck_1.List.push.call(declarations, s);
                    }
                    else {
                      if (true) {
                        let $puck_27 = $puck_23;;
                        let $puck_28 = $puck_27;;
                        return $puck_27;
                      };
                    };
                  };
                };
              }
              else {
                if (true) {
                  let $puck_29 = $puck_19;;
                  let $puck_30 = $puck_29;;
                  return $puck_29;
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
      const definition = $puck_6.Definition({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumDeclaration', value: t, $isTraitObject: true},
      });
      t.type_ = $puck_6.Type.provides({
        definition: definition,
        id: generateTypeId(context, file, t.name.name),
        displayName: $puck_1.None,
        name: $puck_1.Some(t.name.name),
        kind: $puck_6.TypeKind.Enum({
        implementations: [],
        members: $puck_1.ObjectMap._new(),
      }),
        _class: $puck_6.TypeClass.fromAstNode(t, reportError),
        instance: $puck_1.None,
        providesType: $puck_1.None,
        enumMember: $puck_1.None,
      });
      let $puck_31 = $puck_7.Scope.define.call(parentScope, {
        definition: definition,
        name: t.name.name,
        mutable: false,
        allowRedeclare: false,
        type_: $unwrapTraitObject(t.type_),
        previous: $puck_1.None,
        completeType: $puck_1.None,
      });
      if ($puck_31.kind === "Err") {
        let {value: [error]} = $puck_31;
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: t.name, $isTraitObject: true}, error);
      };
    }
    else {
      if ((!t.scope)) {
        let scope = $puck_7.Scope.createChild.call(parentScope);
        t.scope = scope;
        $unwrapTraitObject(self).scope = scope;
        let $puck_32 = $puck_1.Option.unwrap.call(type_.providesType)._class;
        if ($puck_32.kind === "Some") {
          let {value: [_class]} = $puck_32;
          let c = _class;
          $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}, function (p) {
            $unwrapTraitObject(self).visitTypeParameter(p);
            return $puck_1.List.push.call(c.typeParameters, $unwrapTraitObject(p.type_));
          });
        };
        $puck_7.Scope.setSelfType.call(scope, $puck_1.Option.unwrap.call(type_.providesType));
        $unwrapTraitObject(self).scope = parentScope;
      }
      else {
        $unwrapTraitObject(self).scope = t.scope;
        $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.members, $isTraitObject: true}, function (m) {
          return $unwrapTraitObject(self).visitEnumMember(m);
        });
        const memberMap = $puck_1.ObjectMap.fromIter($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.members, $isTraitObject: true}, function (p) {
          const definition = $puck_6.Definition({
            file: file,
            token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumMember', value: p, $isTraitObject: true},
          });
          return [
            p.name.name,
            $puck_1.Option.mapOr.call(p.bound, $puck_6.Type({
            definition: definition,
            id: generateTypeId(context, file, t.name.name + "::" + p.name.name),
            displayName: $puck_1.None,
            name: $puck_1.Some(t.name.name + "::" + p.name.name),
            kind: $puck_6.TypeKind.Struct({
            implementations: [],
            kind: $puck_6.StructKind.Unit,
          }),
            _class: $puck_1.None,
            instance: $puck_1.None,
            providesType: $puck_1.None,
            enumMember: $puck_1.Some([
            p.name.name,
            $puck_1.Option.unwrap.call(type_.providesType),
          ]),
          }), function (bound) {
            return $puck_6.Type({
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
        let $puck_33 = $puck_1.Option.unwrap.call(type_.providesType).kind;
        if (($puck_33.kind === "Enum")) {
          let {value: [enum_]} = $puck_33;
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
      const definition = $puck_6.Definition({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration', value: t, $isTraitObject: true},
      });
      t.type_ = $puck_6.Type.provides({
        definition: definition,
        id: getTypeId(t, context, file),
        displayName: $puck_1.None,
        name: $puck_1.Some(t.name.name),
        kind: $puck_6.TypeKind.Trait({
        isShorthand: false,
        functions: $puck_1.ObjectMap._new(),
      }),
        _class: $puck_6.TypeClass.fromAstNode(t, reportError),
        instance: $puck_1.None,
        providesType: $puck_1.None,
        enumMember: $puck_1.None,
      });
      let $puck_34 = $puck_7.Scope.define.call(parentScope, {
        definition: definition,
        name: t.name.name,
        mutable: false,
        allowRedeclare: false,
        type_: $unwrapTraitObject(t.type_),
        previous: $puck_1.None,
        completeType: $puck_1.None,
      });
      if ($puck_34.kind === "Err") {
        let {value: [error]} = $puck_34;
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: t.name, $isTraitObject: true}, error);
      };
    }
    else {
      if ((!t.scope)) {
        let scope = $puck_7.Scope.createChild.call(parentScope);
        t.scope = scope;
        $unwrapTraitObject(self).scope = scope;
        let $puck_35 = $puck_1.Option.unwrap.call(type_.providesType)._class;
        if ($puck_35.kind === "Some") {
          let {value: [_class]} = $puck_35;
          let c = _class;
          $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}, function (p) {
            $unwrapTraitObject(self).visitTypeParameter(p);
            return $puck_1.List.push.call(c.typeParameters, $unwrapTraitObject(p.type_));
          });
        };
        $puck_7.Scope.setSelfType.call(scope, $puck_1.Option.unwrap.call(type_.providesType));
        $unwrapTraitObject(self).scope = parentScope;
      }
      else {
        $unwrapTraitObject(self).scope = t.scope;
        $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.members, $isTraitObject: true}, function (m) {
          return $unwrapTraitObject(self).visitMethodDeclaration(m, $puck_1.Option.unwrap.call(type_.providesType));
        });
        let $puck_36 = $puck_1.Option.unwrap.call(type_.providesType).kind;
        if ($puck_36.kind === "Trait") {
          let {value: [trait_]} = $puck_36;
          $puck_2._Object.assign(trait_.functions, $puck_1.ObjectMap.fromIter($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.members, $isTraitObject: true}, function (m) {
            let $puck_37 = m.type_.kind;
            if ($puck_37.kind === "Function") {
              let {value: [_function]} = $puck_37;
              if ((_function.isAbstract && $puck_1.Option.isNone.call(_function.selfBinding))) {
                reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: m, $isTraitObject: true}, "Static trait functions can not be abstract");
              };
            };
            return [
              $puck_1.Option.unwrap.call(m.name).name,
              m.type_,
            ];
          })));
          let $puck_38 = $puck_1.Option.unwrap.call(type_.providesType)._class;
          if ($puck_38.kind === "Some") {
            let {value: [_class]} = $puck_38;
            $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _class.instances, $isTraitObject: true}, function (instance) {
              let $puck_39 = instance.kind;
              if ($puck_39.kind === "Trait") {
                let {value: [instanceTrait]} = $puck_39;
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
      let $puck_40 = t.bound;
      let $puck_41;
      if ($puck_40.kind === "Some") {
        let {value: [typeBound]} = $puck_40;
        let $puck_42 = typeBound;
        let $puck_43;
        if ($unwrapTraitObject($puck_42).kind === "RecordTypeBound") {
          let {value: [record]} = $unwrapTraitObject($puck_42);
          $puck_43 = $puck_6.StructKind.Record({properties: $puck_1.ObjectMap._new()});
        }
        else {
          let $puck_44;
          if ($unwrapTraitObject($puck_42).kind === "TupleTypeBound") {
            let {value: [tuple]} = $unwrapTraitObject($puck_42);
            $puck_44 = $puck_6.StructKind.Tuple({properties: []});
          }
          else {
            let $puck_45;
            if (true) {
              let $puck_46 = $puck_42;
              throw "Unreachable";
            };
            $puck_44 = $puck_45;
          };
          $puck_43 = $puck_44;
        };
        $puck_41 = $puck_43;
      }
      else {
        $puck_41 = $puck_6.StructKind.Unit;
      };
      const structKind = $puck_41;
      const definition = $puck_6.Definition({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeDeclaration', value: t, $isTraitObject: true},
      });
      t.type_ = $puck_6.Type.provides({
        definition: definition,
        id: getTypeId(t, context, file),
        displayName: $puck_1.None,
        name: $puck_1.Some(t.name.name),
        kind: $puck_6.TypeKind.Struct({
        implementations: [],
        kind: structKind,
      }),
        _class: $puck_6.TypeClass.fromAstNode(t, reportError),
        instance: $puck_1.None,
        providesType: $puck_1.None,
        enumMember: $puck_1.None,
      });
      let $puck_47 = $puck_7.Scope.define.call(parentScope, {
        definition: definition,
        name: t.name.name,
        mutable: false,
        allowRedeclare: false,
        type_: $unwrapTraitObject(t.type_),
        previous: $puck_1.None,
        completeType: $puck_1.None,
      });
      if ($puck_47.kind === "Err") {
        let {value: [error]} = $puck_47;
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: t.name, $isTraitObject: true}, error);
      };
    }
    else {
      if ((!t.scope)) {
        let scope = $puck_7.Scope.createChild.call(parentScope);
        t.scope = scope;
        $unwrapTraitObject(self).scope = scope;
        let $puck_48 = $puck_1.Option.unwrap.call(type_.providesType)._class;
        if ($puck_48.kind === "Some") {
          let {value: [_class]} = $puck_48;
          let c = _class;
          $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: t.typeParameters, $isTraitObject: true}, function (p) {
            $unwrapTraitObject(self).visitTypeParameter(p);
            return $puck_1.List.push.call(c.typeParameters, $unwrapTraitObject(p.type_));
          });
        };
        $puck_7.Scope.setSelfType.call(scope, $puck_1.Option.unwrap.call(type_.providesType));
        $unwrapTraitObject(self).scope = parentScope;
      }
      else {
        $unwrapTraitObject(self).scope = t.scope;
        let $puck_49 = t.bound;
        if ($puck_49.kind === "Some") {
          let {value: [typeBound]} = $puck_49;
          $unwrapTraitObject(self).visitTypeBound(typeBound);
          let $puck_50 = $puck_1.Option.unwrap.call(type_.providesType).kind;
          if (($unwrapTraitObject($puck_50).kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_50).value)[0]).kind).kind === "Record")) {
            let {value: [{kind: {value: [{properties: properties}]}}]} = $unwrapTraitObject($puck_50);
            $puck_2._Object.assign(properties, $puck_1.ObjectMap.fromIter($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_4.TypeBound.getRecordTypeBound.call(typeBound).properties, $isTraitObject: true}, function (p) {
              return [
                p.name.name,
                $puck_4.TypeBound.getType.call(p.typeBound),
              ];
            })));
          }
          else {
            if (($unwrapTraitObject($puck_50).kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_50).value)[0]).kind).kind === "Tuple")) {
              let {value: [{kind: {value: [tuple]}}]} = $unwrapTraitObject($puck_50);
              let $puck_51 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_4.TypeBound.getTupleTypeBound.call(typeBound).properties, $isTraitObject: true}, function (p) {
                return $puck_4.TypeBound.getType.call(p);
              })
;
              $puck_2._Object.assign(tuple, {properties: $puck_1.Iterable[$puck_51.type].toList.call($puck_51)});
            }
            else {
              if (true) {
                let $puck_52 = $puck_50;
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
    let $puck_53 = importDirective._module;
    if ($puck_53.kind === "Some") {
      let {value: [_module]} = $puck_53;
      if ((!_module.scope)) {
        $unwrapTraitObject(context).runTypeVisitorOnFile(_module.file);
      };
    };
    let $puck_54 = importDirective.specifier;
    if ($unwrapTraitObject($puck_54).kind === "Identifier") {
      let {value: [identifier]} = $unwrapTraitObject($puck_54);
      let $puck_55 = importDirective._module;
      let $puck_56;
      if ($puck_55.kind === "Some") {
        let {value: [_module]} = $puck_55;
        $puck_56 = $puck_1.ObjectMap.map.call(_module.exports, function (exportDirective) {
          return $puck_4.ExportDirective.getType.call(exportDirective);
        });
      }
      else {
        $puck_56 = $puck_1.ObjectMap._new();
      };
      const typeProperties = $puck_56;
      const definition = $puck_6.Definition({
        file: file,
        token: {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true},
      });
      let type_ = $puck_6.Type({
        definition: definition,
        id: $puck_1.None,
        displayName: $puck_1.Some(identifier.name),
        name: $puck_1.None,
        kind: $puck_6.TypeKind.Struct({
        implementations: [],
        kind: $puck_6.StructKind.Record({properties: typeProperties}),
      }),
        instance: $puck_1.None,
        _class: $puck_1.None,
        providesType: $puck_1.None,
        enumMember: $puck_1.None,
      });
      let $puck_57 = $puck_7.Scope.define.call(scope, {
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
            $unwrapTraitObject(context).runTypeVisitorOnFile(_module.file);
          }
          else {
            $unwrapTraitObject(context).runCheckerOnFile(_module.file);
          };
          const moduleScope = $unwrapTraitObject(_module.scope);
          let typeProperties = $puck_1.ObjectMap.map.call(_module.exports, function (exportDirective) {
            return $puck_4.ExportDirective.getType.call(exportDirective);
          });
          let $puck_58 = type_.kind;
          if (($unwrapTraitObject($puck_58).kind === "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_58).value)[0]).kind).kind === "Record")) {
            let {value: [{kind: {value: [record]}}]} = $unwrapTraitObject($puck_58);
            let r = record;
            r.properties = typeProperties;
          }
          else {
            if (true) {
              let $puck_59 = $puck_58;
              throw "Unreachable";
            };
          };
          return $puck_1.Some(type_);
        };
      }),
      });
      if ($puck_57.kind === "Err") {
        let {value: [error]} = $puck_57;
        return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true}, error);
      };
    }
    else {
      if ($unwrapTraitObject($puck_54).kind === "ObjectDestructure") {
        let {value: [d]} = $unwrapTraitObject($puck_54);
        return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: d.members, $isTraitObject: true}, function (m) {
          let $puck_60 = importDirective._module;
          if ($puck_60.kind === "Some") {
            let {value: [_module]} = $puck_60;
            const moduleScope = $unwrapTraitObject(_module.scope);
            const importedBinding = $puck_1.Option.unwrapOr.call($puck_7.Scope.getBinding.call(moduleScope, m.property.name, "TypeVisitor"), $unwrapTraitObject($puck_2._Object.assign({})));
            let $puck_61 = $puck_7.Scope.define.call(scope, {
              definition: $puck_6.Definition({
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
                $unwrapTraitObject(context).runTypeVisitorOnFile(_module.file);
              }
              else {
                $unwrapTraitObject(context).runCheckerOnFile(_module.file);
              };
              const externalBinding = $puck_7.Scope.getBinding.call(moduleScope, m.property.name, visitor);
              return $puck_1.Option.map.call(externalBinding, function (binding) {
                return binding.type_;
              });
            }),
            });
            if ($puck_61.kind === "Err") {
              let {value: [error]} = $puck_61;
              reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: m.local, $isTraitObject: true}, error);
            };
            m.local.type_ = importedBinding.type_;
            imports[m.local.name] = importDirective.file;
            return [];
          }
          else {
            let $puck_62 = $puck_7.Scope.define.call(scope, {
              definition: $puck_6.Definition({
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
            if ($puck_62.kind === "Err") {
              let {value: [error]} = $puck_62;
              return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: m.local, $isTraitObject: true}, error);
            };
          };
        });
      }
      else {
        if ($unwrapTraitObject($puck_54).kind === "Asterisk") {
          let $puck_63 = $unwrapTraitObject($puck_54);;
          let {value: [$puck_64]} = $puck_63;;
          return $puck_63;
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
    const result = $puck_7.Scope.getTypePath.call(scope, t.path, "TypeVisitor");
    let $puck_65 = result;
    if ($unwrapTraitObject($puck_65).kind === "Ok") {
      let {value: [binding]} = $unwrapTraitObject($puck_65);
    }
    else {
      if ($unwrapTraitObject($puck_65).kind === "Err") {
        let {value: [err]} = $unwrapTraitObject($puck_65);
        reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:NamedTypeBound', value: t, $isTraitObject: true}, err);
      };
    };
    return structureVisitorInstance.visitNamedTypeBound.call(self, t);
  },
    visitTypeProperty: visit.walkingVisitor.visitTypeProperty,
  });
};
exports.TypeVisitor = TypeVisitor
