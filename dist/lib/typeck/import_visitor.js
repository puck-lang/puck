'use strict';
exports.ImportVisitor = exports.puckFile = exports.puckModules = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("fs");
const path = require("path");
const requireRelative = require("require-relative");
const $puck_4 = require("./../ast/ast");
const $puck_5 = require("./../ast/visit");
const $puck_6 = require("./../ast/span");
const $puck_7 = require("./../compiler");
const $puck_8 = require("./../entities");
const $puck_9 = require("./../compiler/ast");
var ImportVisitor = exports.ImportVisitor = (object) => object;
$puck_5.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/import_visitor.puck:ImportVisitor"] = {
visitModule: function (m) {
  let self = this;
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: m.statements, $isTraitObject: true}, function (s) {
    let $puck_10 = s;
    if ($puck_10.kind === "ImportDirective") {
      let {value: e} = $puck_10;
      return $puck_5.Visit["$impl_lib/ast/visit.puck:Visit$lib/typeck/import_visitor.puck:ImportVisitor"].visitImportDirective.call(self, e);
    };
  });
},
visitTopLevelStatement: $puck_5.Visit.visitTopLevelStatement,
visitBlockLevelStatement: $puck_5.Visit.visitBlockLevelStatement,
visitExpression: $puck_5.Visit.visitExpression,
visitEnumDeclaration: $puck_5.Visit.visitEnumDeclaration,
visitEnumMember: $puck_5.Visit.visitEnumMember,
visitImplDeclaration: $puck_5.Visit.visitImplDeclaration,
visitImplShorthandDeclaration: $puck_5.Visit.visitImplShorthandDeclaration,
visitMethodDeclaration: $puck_5.Visit.visitMethodDeclaration,
visitTraitDeclaration: $puck_5.Visit.visitTraitDeclaration,
visitTypeDeclaration: $puck_5.Visit.visitTypeDeclaration,
visitExportDirective: $puck_5.Visit.visitExportDirective,
visitImportDirective: function (i) {
  let self = this;
  let $puck_11 = i.domain;
  if ($puck_11 !== undefined) {
    let domain = $puck_11;
    if (domain === "puck") {
      if ((!$puck_1.List.contains.call(puckModules, i.path))) {
        return $puck_7.CompilerContext.reportError.call(self.value.context, self.value.file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective', value: i, $isTraitObject: true}, $puck_8.CompilationError.Other("Invalid puck module " + i.path));
      };
      let importedFile = $puck_7.CompilerContext.resolvePath(path.join(path.dirname(require.resolve("puck-lang/package.json")), "lib", "stdlib", i.path + ".puck"), self.value.file);
      ImportVisitor.importModule.call(self.value, i, importedFile);
    }
    else {
      if ((domain === "package")) {
        let $puck_12 = $puck_1.IntoIterator["$impl_IntoIterator$String"].iter.call({type: '$impl_IntoIterator$String', value: i.path, $isTraitObject: true})
;
        const slash = $puck_1.Option.unwrapOr.call($puck_1.Iterator[$puck_12.type].position.call($puck_12, function (c) {
          return c === "/";
        }), $puck_1.String.size.call(i.path));
        const packageName = $puck_1.String.sub.call(i.path, $puck_1.Range._new(0, slash));
        const packagePath = $puck_1.String.sub.call(i.path, $puck_1.Range._new(slash, $puck_1.String.size.call(i.path)));
        const result = $puck_2.asResult(function () {
          return $puck_7.CompilerContext.resolvePath(path.join(path.dirname(requireRelative.resolve("puck-" + packageName + "/package.json", self.value.file.absolutePath)), "lib", packagePath), self.value.file);
        });
        let $puck_13 = result;
        if ($puck_13.kind === "Ok") {
          let {value: importedFile} = $puck_13;
          if ($puck_1.RegExp.test.call(puckFile, importedFile.absolutePath)) {
            ImportVisitor.importModule.call(self.value, i, importedFile);
          };
        }
        else {
          if ($puck_13.kind === "Err") {
            let {value: error} = $puck_13;
            return $puck_7.CompilerContext.reportError.call(self.value.context, self.value.file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective', value: i, $isTraitObject: true}, $puck_8.CompilationError.Other("Imported file package:" + i.path + " not found"));
          };
        };
      }
      else {
        if ((!$puck_1.List.contains.call(domains, domain))) {
          $puck_7.CompilerContext.reportError.call(self.value.context, self.value.file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective', value: i, $isTraitObject: true}, $puck_8.CompilationError.Other("Invalid import domain " + domain + ""));
        };
      };
    };
  }
  else {
    if (true) {
      const None = $puck_11;
      const result = $puck_2.asResult(function () {
        return $puck_7.CompilerContext.resolvePath(i.path, self.value.file);
      });
      let $puck_14 = result;
      if ($puck_14.kind === "Ok") {
        let {value: importedFile} = $puck_14;
        if ($puck_1.RegExp.test.call(puckFile, importedFile.absolutePath)) {
          ImportVisitor.importModule.call(self.value, i, importedFile);
        };
      }
      else {
        if ($puck_14.kind === "Err") {
          let {value: error} = $puck_14;
          return $puck_7.CompilerContext.reportError.call(self.value.context, self.value.file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective', value: i, $isTraitObject: true}, $puck_8.CompilationError.Other("Imported file " + i.path + " not found"));
        };
      };
    };
  };
  undefined;
},
visitObjectDestructure: $puck_5.Visit.visitObjectDestructure,
visitObjectDestructureMember: $puck_5.Visit.visitObjectDestructureMember,
visitBlock: $puck_5.Visit.visitBlock,
visitBreakStatement: $puck_5.Visit.visitBreakStatement,
visitReturnStatement: $puck_5.Visit.visitReturnStatement,
visitForLoop: $puck_5.Visit.visitForLoop,
visitWhileLoop: $puck_5.Visit.visitWhileLoop,
visitIdentifier: $puck_5.Visit.visitIdentifier,
visitFunctionDeclaration: $puck_5.Visit.visitFunctionDeclaration,
visitVariableDeclaration: $puck_5.Visit.visitVariableDeclaration,
visitAssignmentExpression: $puck_5.Visit.visitAssignmentExpression,
visitBinaryExpression: $puck_5.Visit.visitBinaryExpression,
visitCallExpression: $puck_5.Visit.visitCallExpression,
visitIfExpression: $puck_5.Visit.visitIfExpression,
visitIfLetExpression: $puck_5.Visit.visitIfLetExpression,
visitMatchExpression: $puck_5.Visit.visitMatchExpression,
visitMatchArm: $puck_5.Visit.visitMatchArm,
visitTypePath: $puck_5.Visit.visitTypePath,
visitTypePathExpression: $puck_5.Visit.visitTypePathExpression,
visitUnaryExpression: $puck_5.Visit.visitUnaryExpression,
visitIndexAccess: $puck_5.Visit.visitIndexAccess,
visitMemberAccess: $puck_5.Visit.visitMemberAccess,
visitTupleIndexAccess: $puck_5.Visit.visitTupleIndexAccess,
visitUnknownAccess: $puck_5.Visit.visitUnknownAccess,
visitUnknownIndexAccess: $puck_5.Visit.visitUnknownIndexAccess,
visitListLiteral: $puck_5.Visit.visitListLiteral,
visitBooleanLiteral: $puck_5.Visit.visitBooleanLiteral,
visitNumberLiteral: $puck_5.Visit.visitNumberLiteral,
visitRangeLiteral: $puck_5.Visit.visitRangeLiteral,
visitRecordLiteral: $puck_5.Visit.visitRecordLiteral,
visitRecordLiteralMember: $puck_5.Visit.visitRecordLiteralMember,
visitStringLiteral: $puck_5.Visit.visitStringLiteral,
visitStringLiteralPart: $puck_5.Visit.visitStringLiteralPart,
visitTupleLiteral: $puck_5.Visit.visitTupleLiteral,
visitPattern: $puck_5.Visit.visitPattern,
visitIdentifierPattern: $puck_5.Visit.visitIdentifierPattern,
visitRecordPattern: $puck_5.Visit.visitRecordPattern,
visitTuplePattern: $puck_5.Visit.visitTuplePattern,
visitTypeBound: $puck_5.Visit.visitTypeBound,
visitFunctionTypeBound: $puck_5.Visit.visitFunctionTypeBound,
visitIntersectionTypeBound: $puck_5.Visit.visitIntersectionTypeBound,
visitNamedTypeBound: $puck_5.Visit.visitNamedTypeBound,
visitRecordTypeBound: $puck_5.Visit.visitRecordTypeBound,
visitRecordTypeBoundMember: $puck_5.Visit.visitRecordTypeBoundMember,
visitTupleTypeBound: $puck_5.Visit.visitTupleTypeBound,
visitTypeParameter: $puck_5.Visit.visitTypeParameter,
visitTypeParameterBound: $puck_5.Visit.visitTypeParameterBound,
visitWhereClause: $puck_5.Visit.visitWhereClause
};
ImportVisitor._new = function (context, file, declarations) {
  return {
    context: context,
    file: file,
    declarations: declarations,
  };
};
ImportVisitor.importModule = function (i, importedFile) {
  let self = this;
  let $puck_15 = $puck_2.asResult(function () {
    return $puck_7.CompilerContext.importFile.call(self.context, importedFile);
  });
  if (($puck_15.kind === "Ok")) {
    let {value: contextFile} = $puck_15;
    let $puck_16 = contextFile.ast;
    let $puck_17;
    if ($puck_16 !== undefined) {
      let _module = $puck_16;
      $puck_17 = _module;
    }
    else {
      let $puck_18;
      if ($puck_16 === undefined) {
        $puck_16;
        return $puck_7.CompilerContext.defer.call(self.context, importedFile, function () {
          return ImportVisitor.importModule.call(self, i, importedFile);
        });
      };
      $puck_17 = $puck_18;
    };
    const _module = $puck_17;
    let $puck_19 = i.specifier;
    if ($puck_19.kind === "ObjectDestructure") {
      let {value: o} = $puck_19;
      $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: o.members, $isTraitObject: true}, function (m) {
        if ((!$puck_1.ObjectMap.has.call(_module.exports, m.property.name))) {
          return $puck_7.CompilerContext.reportError.call(self.context, self.file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ObjectDestructureMember', value: m, $isTraitObject: true}, $puck_8.CompilationError.Other(importedFile.fileName + " has no export named " + m.property.name));
        };
      });
    }
    else {
      if (($puck_19.kind === "Asterisk")) {
        let {value: token} = $puck_19;
        let $puck_21 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.ObjectMap.keys.call(_module.exports), $isTraitObject: true}, function (e) {
          return (!$puck_1.ObjectMap.has.call(self.declarations, e));
        })
;
        let $puck_20 = $puck_1.Iterable[$puck_21.type].map.call($puck_21, function (e) {
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
          members: $puck_1.Iterable[$puck_20.type].toList.call($puck_20),
        });
      }
      else {
        if ($puck_19.kind === "Identifier") {
          $puck_19;
        };
      };
    };
    i.file = contextFile;
    i._module = $puck_1.Some(_module);
  }
  else {
    if ($puck_15.kind === "Err") {
      let {value: err} = $puck_15;
      if (err === "Syntax Error") {
        $puck_7.CompilerContext.reportError.call(self.context, self.file, {type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:ImportDirective', value: i, $isTraitObject: true}, $puck_8.CompilationError.Other(err));
      }
      else {
        $puck_1.panic(err);
      };
    };
  };
};
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
]
