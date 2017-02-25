'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.TopLevelVisitorundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("./../ast/ast");
const $puck_4 = require("./../ast/span");
const visit = require("./../ast/visit");
const $puck_5 = require("./../compiler/ast");
const $puck_6 = require("./../entities");
function TopLevelVisitor(context, file) {
  let declarations = $puck_1.ObjectMap._new();
  const reportError = $unwrapTraitObject($unwrapTraitObject(context).reportError).bind(context, file);
  return $puck_2._Object.assign({}, visit.emptyVisitor, {
    visitModule: function (m) {
    const self = this;
    m.declarations = declarations;
    m.file = file;
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
    let $puck_7 = i.specifier;
    if ($unwrapTraitObject($puck_7).kind == "Identifier") {
      let {value: [identifier]} = $unwrapTraitObject($puck_7);
      return $puck_1.ObjectMap.set.call(declarations, identifier.name, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: identifier, $isTraitObject: true});
    }
    else {
      if ($unwrapTraitObject($puck_7).kind == "ObjectDestructure") {
        let {value: [d]} = $unwrapTraitObject($puck_7);
        return $unwrapTraitObject(self).visitObjectDestructure(d);
      }
      else {
        if ($unwrapTraitObject($puck_7).kind == "Asterisk") {
          let $puck_8 = $unwrapTraitObject($puck_7);;
          let {value: [$puck_9]} = $puck_8;;
          return $puck_8;
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
    if ($puck_10.kind == "Some") {
      let {value: [name]} = $puck_10;
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
