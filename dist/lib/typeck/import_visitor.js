'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.puckFile = exports.puckModules = exports.ImportVisitorundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("fs");
const path = require("path");
const $puck_4 = require("./../ast/ast");
const $puck_5 = require("./../ast/span");
const visit = require("./../ast/visit");
const $puck_6 = require("./../entities");
const $puck_7 = require("./../compiler/ast");
const domains = [
  "node",
  "puck",
];
var puckFile = exports.puckFile = $puck_1.RegExp._new("\\.puck$", "i");
var puckModules = exports.puckModules = [
  "core",
  "js",
  "test",
];
function ImportVisitor(context, file) {
  const reportError = $unwrapTraitObject($unwrapTraitObject(context).reportError).bind(context, file);
  let declarations;
  function importModule(i, importedFile) {
    const result = $puck_2.asResult(function () {
      return $unwrapTraitObject(context).importFile(importedFile);
    });
    let $puck_8 = result;
    if ($unwrapTraitObject($puck_8).kind == "Ok") {
      let {value: [contextFile]} = $unwrapTraitObject($puck_8);
      const _module = $unwrapTraitObject(contextFile.ast);
      if ((!_module)) {
        return $unwrapTraitObject(context).defer(importedFile, function () {
          return importModule(i, importedFile);
        });
      };
      let $puck_9 = i.specifier;
      if ($unwrapTraitObject($puck_9).kind == "ObjectDestructure") {
        let {value: [o]} = $unwrapTraitObject($puck_9);
        $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: o.members, $isTraitObject: true}, function (m) {
          if ((!$puck_1.ObjectMap.has.call(_module.exports, m.property.name))) {
            return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructureMember', value: m, $isTraitObject: true}, importedFile.fileName + " has no export named " + m.property.name);
          };
        });
      }
      else {
        if (($unwrapTraitObject($puck_9).kind == "Asterisk")) {
          let {value: [token]} = $unwrapTraitObject($puck_9);
          let $puck_11 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.ObjectMap.keys.call(_module.exports), $isTraitObject: true}, function (e) {
            return (!$puck_1.ObjectMap.has.call(declarations, e));
          })
;
          let $puck_10 = $puck_1.Iterable[$puck_11.type].map.call($puck_11, function (e) {
            const property = $puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: _module.exports, $isTraitObject: true}, e).identifier;
            return {
              property: property,
              local: property,
            };
          })
;
          i.specifier = $puck_4.ImportSpecifier.ObjectDestructure({
            openBrace: token,
            closeBrace: token,
            members: $puck_1.Iterable[$puck_10.type].toList.call($puck_10),
          });
        }
        else {
          if ($unwrapTraitObject($puck_9).kind == "Identifier") {
            let {value: [$puck_12]} = $unwrapTraitObject($puck_9);
          };
        };
      };
      i.file = contextFile;
      i._module = $puck_1.Some(_module);
    }
    else {
      if (true) {
        const Err = $puck_8;
      };
    };
  };
  return $puck_2._Object.assign({}, visit.emptyVisitor, {
    visitModule: function (m) {
    const self = this;
    declarations = $unwrapTraitObject(m.declarations);
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: m.statements, $isTraitObject: true}, function (s) {
      let $puck_13 = s;
      if ($puck_13.kind == "ImportDirective") {
        let {value: [e]} = $puck_13;
        return $unwrapTraitObject(self).visitImportDirective(e);
      };
    });
    return m.declarations = $unwrapTraitObject($puck_2._undefined);
  },
    visitImportDirective: function (i) {
    const self = this;
    let $puck_14 = i.domain;
    if ($unwrapTraitObject($puck_14).kind == "Some") {
      let {value: [domain]} = $unwrapTraitObject($puck_14);
      if (domain == "puck") {
        if ((!$puck_1.List.contains.call(puckModules, i.path))) {
          return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective', value: i, $isTraitObject: true}, "Invalid puck module " + i.path);
        };
        const importedFile = $unwrapTraitObject(context).resolvePath(path.join(path.dirname($puck_2._require.resolve("puck-lang/dist/bin/puck")), "../../lib/stdlib/" + i.path + ".puck"), file);
        importModule(i, importedFile);
      }
      else {
        if ((!$puck_1.List.contains.call(domains, domain))) {
          reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective', value: i, $isTraitObject: true}, "Invalid import domain " + domain + "");
        };
      };
    }
    else {
      if (true) {
        const None = $puck_14;
        const result = $puck_2.asResult(function () {
          return $unwrapTraitObject(context).resolvePath(i.path, file);
        });
        let $puck_15 = result;
        if ($unwrapTraitObject($puck_15).kind == "Ok") {
          let {value: [importedFile]} = $unwrapTraitObject($puck_15);
          if ($puck_1.RegExp.test.call(puckFile, importedFile.absolutePath)) {
            importModule(i, importedFile);
          };
        }
        else {
          if ($unwrapTraitObject($puck_15).kind == "Err") {
            let {value: [error]} = $unwrapTraitObject($puck_15);
            return reportError({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective', value: i, $isTraitObject: true}, "Imported file " + i.path + " not found");
          };
        };
      };
    };
    return [];
  },
  });
};
exports.ImportVisitor = ImportVisitor
