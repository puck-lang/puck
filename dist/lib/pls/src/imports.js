'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.bestImportPath = exports.createImportundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const path = require("path");
const $puck_2 = require("./../../ast/ast");
const $puck_3 = require("./../../ast/span");
const $puck_4 = require("./../../entities");
const $puck_5 = require("./entities");
const stdLibPattern = $puck_1.RegExp._new("node_modules/puck-lang/lib/stdlib/([a-z]+).puck$");
function bestImportPath(importingFile, importedFile) {
  const matches = stdLibPattern.exec(importedFile);
  if (!$puck_1.Unknown.isNull.call(matches)) {
    const _module = $unwrapTraitObject(matches[1]);
    return "puck:" + _module + "";
  };
  const dirname = $unwrapTraitObject(path.dirname(importingFile.absolutePath));
  const relativePath = $unwrapTraitObject(path.relative(dirname, importedFile));
  return relativePath;
};
exports.bestImportPath = bestImportPath;
function createImport(binding, importingModule, importedModule) {
  const path = bestImportPath(importingModule.file, importedModule.file.absolutePath);
  let $puck_6 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filterMap.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: importingModule.statements, $isTraitObject: true}, function (s) {
    let $puck_7 = s;
    if ($unwrapTraitObject($puck_7).kind === "ImportDirective") {
      let {value: [d]} = $unwrapTraitObject($puck_7);
      let $puck_8 = d.specifier;
      if ($unwrapTraitObject($puck_8).kind === "ObjectDestructure") {
        let {value: [o]} = $unwrapTraitObject($puck_8);
        return $puck_1.Some(d);
      }
      else {
        if (true) {
          let $puck_9 = $puck_8;
          return $puck_1.None;
        };
      };
    }
    else {
      if (true) {
        let $puck_10 = $puck_7;
        return $puck_1.None;
      };
    };
  })
;
  const imports = $puck_1.Iterable[$puck_6.type].toList.call($puck_6);
  let $puck_11 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].find.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: imports, $isTraitObject: true}, function (d) {
    return $puck_1.Option.mapOr.call(d.domain, d.path, function (domain) {
      return "" + domain + ":" + d.path;
    }) === path;
  });
  if (($puck_11.kind === "Some")) {
    let {value: [import_]} = $puck_11;
    let $puck_12 = import_.specifier;
    if ($unwrapTraitObject($puck_12).kind === "ObjectDestructure") {
      let {value: [o]} = $unwrapTraitObject($puck_12);
      const index = $puck_1.Result.unwrapErr.call($puck_1.List.binarySearchBy.call(o.members, function (m) {
        return $puck_1.Ord["$impl_lib/stdlib/core.puck:Ord$String"].cmp.call({type: '$impl_lib/stdlib/core.puck:Ord$String', value: m.local.name, $isTraitObject: true}, {type: '$impl_lib/stdlib/core.puck:Ord$String', value: binding, $isTraitObject: true});
      }));
      let $puck_13;
      if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: o.members, $isTraitObject: true})) {
        $puck_13 = o.openBrace.span.end.line;
      }
      else {
        let $puck_14;
        if (index === $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: o.members, $isTraitObject: true})) {
          $puck_14 = $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructureMember"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructureMember', value: $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: o.members, $isTraitObject: true}, index - 1), $isTraitObject: true}).line - 1;
        }
        else {
          $puck_14 = $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructureMember"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructureMember', value: $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: o.members, $isTraitObject: true}, index), $isTraitObject: true}).line - 1;
        };
        $puck_13 = $puck_14;
      };
      let $puck_15;
      if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: o.members, $isTraitObject: true})) {
        $puck_15 = o.openBrace.span.end.column - 1;
      }
      else {
        let $puck_16;
        if ((index === $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: o.members, $isTraitObject: true}))) {
          $puck_16 = $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructureMember"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructureMember', value: $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: o.members, $isTraitObject: true}, index - 1), $isTraitObject: true}).column - 1;
        }
        else {
          $puck_16 = $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructureMember"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructureMember', value: $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: o.members, $isTraitObject: true}, index), $isTraitObject: true}).column - 1;
        };
        $puck_15 = $puck_16;
      };
      const position = {
        line: $puck_13,
        character: $puck_15,
      };
      let $puck_17;
      if ((o.openBrace.span.start.line !== o.closeBrace.span.end.line)) {
        $puck_17 = "\n  " + binding + "";
      }
      else {
        let $puck_18;
        if (index > 0) {
          $puck_18 = ", " + binding + "";
        }
        else {
          let $puck_19;
          if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: o.members, $isTraitObject: true})) {
            $puck_19 = binding;
          }
          else {
            $puck_19 = "" + binding + ", ";
          };
          $puck_18 = $puck_19;
        };
        $puck_17 = $puck_18;
      };
      return {
        range: {
        start: position,
        end: position,
      },
        newText: $puck_17,
      };
    }
    else {
      if (true) {
        let $puck_20 = $puck_12;
        return $puck_1.panic("Unreachable");
      };
    };
  }
  else {
    let $puck_21;
    if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: imports, $isTraitObject: true})) {
      $puck_21 = 0;
    }
    else {
      $puck_21 = $puck_1.Result.unwrapErr.call($puck_1.Result.mapErr.call($puck_1.List.binarySearchBy.call($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].toList.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: imports, $isTraitObject: true}), function (i) {
        let $puck_22 = i.domain;
        if ($puck_22.kind === "Some") {
          let {value: [domain]} = $puck_22;
          if ($puck_1.String.startsWith.call(path, "puck:")) {
            if (domain === "puck") {
              return $puck_1.Ordering.reverse.call($puck_1.Ord["$impl_lib/stdlib/core.puck:Ord$String"].cmp.call({type: '$impl_lib/stdlib/core.puck:Ord$String', value: $puck_1.String.sub.call(path, $puck_1.Range._new(5, $puck_1.String.size.call(path))), $isTraitObject: true}, {type: '$impl_lib/stdlib/core.puck:Ord$String', value: i.path, $isTraitObject: true}));
            }
            else {
              return $puck_1.Ordering.Greater;
            };
          }
          else {
            return $puck_1.Ordering.Less;
          };
        }
        else {
          if ($puck_1.String.startsWith.call(path, "puck:")) {
            return $puck_1.Ordering.Greater;
          }
          else {
            if ($puck_1.Option.isSome.call(i.domain)) {
              return $puck_1.Ordering.Less;
            }
            else {
              return $puck_1.Ordering.reverse.call($puck_1.Ord["$impl_lib/stdlib/core.puck:Ord$String"].cmp.call({type: '$impl_lib/stdlib/core.puck:Ord$String', value: path, $isTraitObject: true}, {type: '$impl_lib/stdlib/core.puck:Ord$String', value: i.path, $isTraitObject: true}));
            };
          };
        };
      }), function (index) {
        const i = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].toList.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: imports, $isTraitObject: true});
        if (index === $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: i, $isTraitObject: true})) {
          return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective', value: $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: i, $isTraitObject: true}, index - 1), $isTraitObject: true}).line;
        }
        else {
          return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective"].end.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective', value: $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: i, $isTraitObject: true}, index), $isTraitObject: true}).line + 1;
        };
      }));
    };
    const position = {
      line: $puck_21,
      character: 0,
    };
    return {
      range: {
      start: position,
      end: position,
    },
      newText: "import '" + path + "' as {" + binding + "}\n",
    };
  };
};
exports.createImport = createImport
