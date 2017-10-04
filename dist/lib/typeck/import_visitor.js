'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.puckFile = exports.puckModules = exports.ImportVisitor = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("fs");
const path = require("path");
const requireRelative = require("require-relative");
const $puck_4 = require("./../ast/ast");
const $puck_5 = require("./../ast/span");
const $puck_6 = require("./../compiler");
const visit = require("./../ast/visit");
const $puck_7 = require("./../entities");
const $puck_8 = require("./../compiler/ast");
const domains = [
  "node",
  "puck",
  "package",
];
var puckFile = exports.puckFile = $puck_1.RegExp._new("\\.puck$", "i");
var puckModules = exports.puckModules = [
  "core",
  "js",
  "test",
];
function ImportVisitor(context, file) {
  let declarations;
  function importModule(i, importedFile) {
    let $puck_9 = $puck_2.asResult(function () {
      return $puck_6.CompilerContext.importFile.call(context, importedFile);
    });
    if ($puck_9.kind === "Ok") {
      let {value: contextFile} = $puck_9;
      let $puck_10 = contextFile.ast;
      let $puck_11;
      if ($puck_10 !== undefined) {
        let _module = $puck_10;
        $puck_11 = _module;
      }
      else {
        let $puck_12;
        if ($puck_10 === undefined) {
          $puck_10;
          return $puck_6.CompilerContext.defer.call(context, importedFile, function () {
            return importModule(i, importedFile);
          });
        };
        $puck_11 = $puck_12;
      };
      const _module = $puck_11;
      let $puck_13 = i.specifier;
      if ($puck_13.kind === "ObjectDestructure") {
        let {value: o} = $puck_13;
        $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: o.members, $isTraitObject: true}, function (m) {
          if ((!$puck_1.ObjectMap.has.call(_module.exports, m.property.name))) {
            return $puck_6.CompilerContext.reportError.call(context, file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructureMember', value: m, $isTraitObject: true}, $puck_7.CompilationError.Other(importedFile.fileName + " has no export named " + m.property.name));
          };
        });
      }
      else {
        if (($puck_13.kind === "Asterisk")) {
          let {value: token} = $puck_13;
          let $puck_15 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.ObjectMap.keys.call(_module.exports), $isTraitObject: true}, function (e) {
            return (!$puck_1.ObjectMap.has.call(declarations, e));
          })
;
          let $puck_14 = $puck_1.Iterable[$puck_15.type].map.call($puck_15, function (e) {
            const property = $puck_1.Index["$impl_Index$lib/stdlib/core.puck:ObjectMap"].index.call({type: '$impl_Index$lib/stdlib/core.puck:ObjectMap', value: _module.exports, $isTraitObject: true}, e).identifier;
            return {
              property: property,
              local: property,
              file: $puck_1.Some(_module.file),
            };
          })
;
          i.specifier = $puck_4.ImportSpecifier.ObjectDestructure({
            openBrace: token,
            closeBrace: token,
            members: $puck_1.Iterable[$puck_14.type].toList.call($puck_14),
          });
        }
        else {
          if ($puck_13.kind === "Identifier") {
            $puck_13;
          };
        };
      };
      i.file = contextFile;
      i._module = $puck_1.Some(_module);
    }
    else {
      if ($puck_9.kind === "Err") {
        let {value: err} = $puck_9;
        if (err === "Syntax Error") {
          $puck_6.CompilerContext.reportError.call(context, file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective', value: i, $isTraitObject: true}, $puck_7.CompilationError.Other(err));
        }
        else {
          throw err;
        };
      };
    };
  };
  return $puck_2._Object.assign({}, visit.emptyVisitor, {
    visitModule: function (m) {
    const self = this;
    declarations = $unwrapTraitObject(m.declarations);
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: m.statements, $isTraitObject: true}, function (s) {
      let $puck_16 = s;
      if ($puck_16.kind === "ImportDirective") {
        let {value: e} = $puck_16;
        return $unwrapTraitObject(self).visitImportDirective(e);
      };
    });
    return m.declarations = $unwrapTraitObject($puck_2._undefined);
  },
    visitImportDirective: function (i) {
    const self = this;
    let $puck_17 = i.domain;
    if ($puck_17 !== undefined) {
      let domain = $puck_17;
      if (domain === "puck") {
        if ((!$puck_1.List.contains.call(puckModules, i.path))) {
          return $puck_6.CompilerContext.reportError.call(context, file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective', value: i, $isTraitObject: true}, $puck_7.CompilationError.Other("Invalid puck module " + i.path));
        };
        let importedFile = $puck_6.CompilerContext.resolvePath(path.join(path.dirname(require.resolve("puck-lang/package.json")), "lib", "stdlib", i.path + ".puck"), file);
        importModule(i, importedFile);
      }
      else {
        if ((domain === "package")) {
          let $puck_18 = $puck_1.IntoIterator["$impl_IntoIterator$String"].iter.call({type: '$impl_IntoIterator$String', value: i.path, $isTraitObject: true})
;
          const slash = $puck_1.Option.unwrapOr.call($puck_1.Iterator[$puck_18.type].position.call($puck_18, function (c) {
            return c === "/";
          }), $puck_1.String.size.call(i.path));
          const packageName = $puck_1.String.sub.call(i.path, $puck_1.Range._new(0, slash));
          const packagePath = $puck_1.String.sub.call(i.path, $puck_1.Range._new(slash, $puck_1.String.size.call(i.path)));
          const result = $puck_2.asResult(function () {
            return $puck_6.CompilerContext.resolvePath(path.join(path.dirname(requireRelative.resolve("puck-" + packageName + "/package.json", file.absolutePath)), "lib", packagePath), file);
          });
          let $puck_19 = result;
          if ($puck_19.kind === "Ok") {
            let {value: importedFile} = $puck_19;
            if ($puck_1.RegExp.test.call(puckFile, importedFile.absolutePath)) {
              importModule(i, importedFile);
            };
          }
          else {
            if ($puck_19.kind === "Err") {
              let {value: error} = $puck_19;
              return $puck_6.CompilerContext.reportError.call(context, file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective', value: i, $isTraitObject: true}, $puck_7.CompilationError.Other("Imported file package:" + i.path + " not found"));
            };
          };
        }
        else {
          if ((!$puck_1.List.contains.call(domains, domain))) {
            $puck_6.CompilerContext.reportError.call(context, file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective', value: i, $isTraitObject: true}, $puck_7.CompilationError.Other("Invalid import domain " + domain + ""));
          };
        };
      };
    }
    else {
      if (true) {
        const None = $puck_17;
        const result = $puck_2.asResult(function () {
          return $puck_6.CompilerContext.resolvePath(i.path, file);
        });
        let $puck_20 = result;
        if ($puck_20.kind === "Ok") {
          let {value: importedFile} = $puck_20;
          if ($puck_1.RegExp.test.call(puckFile, importedFile.absolutePath)) {
            importModule(i, importedFile);
          };
        }
        else {
          if ($puck_20.kind === "Err") {
            let {value: error} = $puck_20;
            return $puck_6.CompilerContext.reportError.call(context, file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective', value: i, $isTraitObject: true}, $puck_7.CompilationError.Other("Imported file " + i.path + " not found"));
          };
        };
      };
    };
    return undefined;
  },
  });
};
exports.ImportVisitor = ImportVisitor
