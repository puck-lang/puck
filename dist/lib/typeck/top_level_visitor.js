'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.TopLevelVisitor = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("./../ast/ast");
const $puck_4 = require("./../ast/span");
const $puck_5 = require("./../compiler");
const visit = require("./../ast/visit");
const $puck_6 = require("./../compiler/ast");
const $puck_7 = require("./../entities");
function TopLevelVisitor(context, file) {
  let declarations = $puck_1.ObjectMap._new();
  return $puck_2._Object.assign({}, visit.emptyVisitor, {
    visitModule: function (m) {
    const self = this;
    m.declarations = declarations;
    return visit.walkModule(self, m);
  },
    visitEnumDeclaration: function (t) {
    const self = this;
    return $puck_1.ObjectMap.set.call(declarations, t.name.name, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:EnumDeclaration', value: t, $isTraitObject: true});
  },
    visitTraitDeclaration: function (t) {
    const self = this;
    return $puck_1.ObjectMap.set.call(declarations, t.name.name, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TraitDeclaration', value: t, $isTraitObject: true});
  },
    visitTypeDeclaration: function (t) {
    const self = this;
    return $puck_1.ObjectMap.set.call(declarations, t.name.name, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:TypeDeclaration', value: t, $isTraitObject: true});
  },
    visitExportDirective: function (e) {
    const self = this;
    return visit.walkExportDirective(self, e);
  },
    visitImportDirective: function (i) {
    const self = this;
    let $puck_8 = i.specifier;
    if ($puck_8.kind === "Identifier") {
      let {value: identifier} = $puck_8;
      return $puck_1.ObjectMap.set.call(declarations, identifier.name, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true});
    }
    else {
      if ($puck_8.kind === "ObjectDestructure") {
        let {value: d} = $puck_8;
        return $unwrapTraitObject(self).visitObjectDestructure(d);
      }
      else {
        if ($puck_8.kind === "Asterisk") {
          let $puck_9 = $puck_8;;
          return $puck_9;
        };
      };
    };
  },
    visitObjectDestructure: function (i) {
    const self = this;
    return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i.members, $isTraitObject: true}, function (m) {
      return $puck_1.ObjectMap.set.call(declarations, m.local.name, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructureMember', value: m, $isTraitObject: true});
    });
  },
    visitFunctionDeclaration: function (f) {
    const self = this;
    let $puck_10 = f.name;
    if ($puck_10 !== undefined) {
      let name = $puck_10;
      return $puck_1.ObjectMap.set.call(declarations, name.name, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:FunctionDeclaration', value: f, $isTraitObject: true});
    };
  },
    visitVariableDeclaration: function (d) {
    const self = this;
    return visit.walkVariableDeclaration(self, d);
  },
    visitPattern: visit.walkingVisitor.visitPattern,
    visitIdentifierPattern: function (p) {
    const self = this;
    return $puck_1.ObjectMap.set.call(declarations, p.name, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: p, $isTraitObject: true});
  },
  });
};
exports.TopLevelVisitor = TopLevelVisitor
