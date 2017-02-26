'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.Completion = exports.CompletionVisitorundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const fs = require("fs");
const path = require("path");
const $puck_2 = require("vscode-languageserver");
const $puck_3 = require("./../ast/ast");
const $puck_4 = require("./../ast/span");
const $puck_5 = require("./../typeck/src/scope");
const $puck_6 = require("./../typeck/import_visitor");
const $puck_7 = require("./../entities");
const $puck_8 = require("./position_visitor");
const visit = require("./position_visitor");
var Completion = exports.Completion = (object) => object;
var CompletionVisitor = exports.CompletionVisitor = (object) => object;
$puck_8.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/completions.puck:CompletionVisitor"] = {
position: function () {
  const self = this;
  return self.value.position;
},
visitModule: $puck_8.PositionVisitor.visitModule,
visitTopLevelStatement: $puck_8.PositionVisitor.visitTopLevelStatement,
visitBlockLevelStatement: $puck_8.PositionVisitor.visitBlockLevelStatement,
visitExpression: $puck_8.PositionVisitor.visitExpression,
visitEnumDeclaration: $puck_8.PositionVisitor.visitEnumDeclaration,
visitEnumMember: $puck_8.PositionVisitor.visitEnumMember,
visitImplDeclaration: function (i) {
  let self = this;
  $puck_1.print("CompletionVisitor visitImplDeclaration");
  const trait_ = $puck_3.NamedTypeBound.getType.call(i.trait_);
  if (trait_) {
    let $puck_9 = trait_.kind;
    if ($unwrapTraitObject($puck_9).kind == "Trait") {
      let {value: [trait_]} = $unwrapTraitObject($puck_9);
      self.value.inTraitImpl = $puck_1.Some(trait_);
    }
    else {
      if (true) {
        let $puck_10 = $puck_9;
      };
    };
  };
  if ((!visit.walkImplDeclaration(self, i))) {
    $puck_1.print("CompletionVisitor not visit.walkImplDeclara");
    self.value.completions = $puck_1.Option.map.call(self.value.inTraitImpl, getTraitImplCompletions);
  };
},
visitImplShorthandDeclaration: $puck_8.PositionVisitor.visitImplShorthandDeclaration,
visitMethodDeclaration: function (f) {
  let self = this;
  let $puck_25 = f.name;
  if ($puck_25.kind == "Some") {
    let {value: [name]} = $puck_25;
    if ($puck_4.Span.cmp.call(name.span, self.value.position) == $puck_1.Ordering.Equal) {
      self.value.completions = $puck_1.Option.map.call(self.value.inTraitImpl, getTraitImplCompletions);
      return [];
    };
  };
  self.value.inTraitImpl = $puck_1.None;
  visit.walkFunctionDeclaration(self, f);
},
visitTraitDeclaration: $puck_8.PositionVisitor.visitTraitDeclaration,
visitTypeDeclaration: $puck_8.PositionVisitor.visitTypeDeclaration,
visitExportDirective: $puck_8.PositionVisitor.visitExportDirective,
visitImportDirective: function (i) {
  let self = this;
  self.value.importedModule = i._module;
  if ($puck_4.Span.cmp.call($puck_4.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral', value: i.locator, $isTraitObject: true}), self.value.position) == $puck_1.Ordering.Equal) {
    let $puck_11 = i.domain;
    if ($puck_11.kind == "Some") {
      let {value: [domain]} = $puck_11;
      if (domain == "puck") {
        let $puck_12 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_6.puckModules, $isTraitObject: true}, function (_module) {
          return {
            label: "puck:" + _module + "",
            kind: $unwrapTraitObject($puck_2.CompletionItemKind).Module,
            insertText: _module,
            insertTextFormat: $unwrapTraitObject($puck_2.InsertTextFormat).PlainText,
          };
        })
;
        self.value.completions = $puck_1.Some($puck_1.Iterable[$puck_12.type].toList.call($puck_12));
      };
    }
    else {
      const fileDirname = $unwrapTraitObject(path.dirname(self.value.file.absolutePath));
      const resolved = $unwrapTraitObject(path.resolve(fileDirname, i.path));
      const exists = fs.existsSync(resolved);
      const isTypedDirectory = (exists && fs.statSync(resolved).isDirectory());
      if (exists && !isTypedDirectory) {
        return [];
      };
      let $puck_13;
      if (isTypedDirectory) {
        $puck_13 = resolved;
      }
      else {
        $puck_13 = path.dirname(resolved);
      };
      const dirname = $puck_13;
      if ((!fs.existsSync(dirname) || !fs.statSync(dirname).isDirectory())) {
        return [];
      };
      let files = $unwrapTraitObject(fs.readdirSync(dirname));
      let $puck_14 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filterMap.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: files, $isTraitObject: true}, function (fileName) {
        if ($puck_1.RegExp.test.call(isHidden, fileName)) {
          return $puck_1.None;
        };
        const file = $unwrapTraitObject(path.join(dirname, fileName));
        const isDirectory = $unwrapTraitObject(fs.statSync(file).isDirectory());
        const relativePath = $unwrapTraitObject(path.relative(fileDirname, file));
        const isPuckFile = $puck_1.RegExp.test.call($puck_6.puckFile, fileName);
        const createAs = (isPuckFile && i.asKeyword.span.end.line == 0);
        let $puck_15;
        if (isTypedDirectory) {
          $puck_15 = i.path;
        }
        else {
          $puck_15 = path.dirname(i.path);
        };
        const typedDir = $puck_15;
        let filterText = $unwrapTraitObject(path.join(typedDir, fileName));
        let $puck_16;
        if (createAs) {
          $puck_16 = "'" + filterText + "' as ";
        }
        else {
          $puck_16 = filterText;
        };
        filterText = $puck_16;
        let $puck_17;
        if (createAs) {
          $puck_17 = "'" + relativePath + "' as ";
        }
        else {
          $puck_17 = relativePath;
        };
        const insertText = $puck_17;
        let $puck_18;
        if (createAs) {
          $puck_18 = 1;
        }
        else {
          $puck_18 = 0;
        };
        const startOffset = $puck_18;
        let $puck_19;
        if (createAs) {
          $puck_19 = 1;
        }
        else {
          $puck_19 = 2;
        };
        const endOffset = $puck_19;
        const range = {
          start: {
          line: $puck_4.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral', value: i.locator, $isTraitObject: true}).start.line - 1,
          character: $puck_4.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral', value: i.locator, $isTraitObject: true}).start.column - startOffset,
        },
          end: {
          line: $puck_4.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral', value: i.locator, $isTraitObject: true}).end.line - 1,
          character: $puck_4.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral', value: i.locator, $isTraitObject: true}).end.column - endOffset,
        },
        };
        let $puck_20;
        if (isPuckFile) {
          $puck_20 = $unwrapTraitObject($puck_2.CompletionItemKind).Module;
        }
        else {
          let $puck_21;
          if (isDirectory) {
            $puck_21 = $unwrapTraitObject($puck_2.CompletionItemKind).Class;
          }
          else {
            $puck_21 = $unwrapTraitObject($puck_2.CompletionItemKind).File;
          };
          $puck_20 = $puck_21;
        };
        let $puck_22;
        if (isPuckFile) {
          $puck_22 = "1" + fileName + "";
        }
        else {
          let $puck_23;
          if (isDirectory) {
            $puck_23 = "2" + fileName + "";
          }
          else {
            $puck_23 = "3" + fileName + "";
          };
          $puck_22 = $puck_23;
        };
        return $puck_1.Some({
          label: fileName,
          kind: $puck_20,
          filterText: filterText,
          insertText: insertText,
          insertTextFormat: $unwrapTraitObject($puck_2.InsertTextFormat).PlainText,
          textEdit: {
          range: range,
          newText: insertText,
        },
          sortText: $puck_22,
        });
      })
;
      self.value.completions = $puck_1.Some($puck_1.Iterable[$puck_14.type].toList.call($puck_14));
    };
  }
  else {
    visit.walkImportDirective(self, i);
  };
},
visitObjectDestructure: function (o) {
  let self = this;
  if ((!visit.walkObjectDestructure(self, o))) {
    $puck_1.print("CompletionVisitor visitObjectDestructure");
    self.value.completions = $puck_1.Option.map.call(self.value.importedModule, getImportCompletions);
  };
},
visitObjectDestructureMember: function (m) {
  let self = this;
  if ($puck_4.Span.cmp.call($puck_4.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Identifier', value: m.property, $isTraitObject: true}), $puck_8.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/completions.puck:CompletionVisitor"].position.call(self)) == $puck_1.Ordering.Equal) {
    $puck_1.print("CompletionVisitor visitObjectDestructureMember");
    self.value.completions = $puck_1.Option.map.call(self.value.importedModule, getImportCompletions);
  };
},
visitBlock: function (b) {
  let self = this;
  if ((!visit.walkBlock(self, b))) {
    $puck_1.print("CompletionVisitor visitBlock");
    self.value.completions = $puck_1.Some(getScopeCompletions(b));
  };
},
visitBreakStatement: $puck_8.PositionVisitor.visitBreakStatement,
visitReturnStatement: $puck_8.PositionVisitor.visitReturnStatement,
visitWhileLoop: $puck_8.PositionVisitor.visitWhileLoop,
visitIdentifier: function (i) {
  let self = this;
  $puck_1.print("CompletionVisitor visitIdentifier");
  self.value.completions = $puck_1.Some(getScopeCompletions(i));
},
visitFunctionDeclaration: function (f) {
  let self = this;
  let $puck_24 = f.name;
  if ($puck_24.kind == "Some") {
    let {value: [name]} = $puck_24;
    if ($puck_4.Span.cmp.call(name.span, self.value.position) == $puck_1.Ordering.Equal) {
      return [];
    };
  };
  visit.walkFunctionDeclaration(self, f);
},
visitVariableDeclaration: $puck_8.PositionVisitor.visitVariableDeclaration,
visitAssignmentExpression: $puck_8.PositionVisitor.visitAssignmentExpression,
visitBinaryExpression: $puck_8.PositionVisitor.visitBinaryExpression,
visitCallExpression: $puck_8.PositionVisitor.visitCallExpression,
visitIfExpression: $puck_8.PositionVisitor.visitIfExpression,
visitIfLetExpression: $puck_8.PositionVisitor.visitIfLetExpression,
visitMatchExpression: $puck_8.PositionVisitor.visitMatchExpression,
visitMatchArm: $puck_8.PositionVisitor.visitMatchArm,
visitTypePath: $puck_8.PositionVisitor.visitTypePath,
visitTypePathExpression: $puck_8.PositionVisitor.visitTypePathExpression,
visitUnaryExpression: $puck_8.PositionVisitor.visitUnaryExpression,
visitIndexAccess: $puck_8.PositionVisitor.visitIndexAccess,
visitMemberAccess: function (a) {
  let self = this;
  if ($puck_4.Span.cmp.call($puck_4.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:Expression', value: a.object, $isTraitObject: true}), $puck_8.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/completions.puck:CompletionVisitor"].position.call(self)) == $puck_1.Ordering.Less) {
    $puck_1.print("CompletionVisitor visitMemberAccess");
    const type_ = $puck_3.Expression.getType.call(a.object);
    if (type_) {
      let $puck_26 = type_.kind;
      if (($unwrapTraitObject($puck_26).kind == "Struct" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_26).value)[0]).kind).kind == "Record")) {
        let {value: [{kind: {value: [record]}}]} = $unwrapTraitObject($puck_26);
        let $puck_27 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.ObjectMap.toList.call(record.properties), $isTraitObject: true}, function ([property, type_]) {
          const typeName = $puck_7.Type.displayName.call(type_);
          return {
            label: "" + property + ": " + typeName + "",
            kind: $unwrapTraitObject($puck_2.CompletionItemKind).Field,
            insertText: property,
            insertTextFormat: $unwrapTraitObject($puck_2.InsertTextFormat).PlainText,
          };
        })
;
        self.value.completions = $puck_1.Some($puck_1.Iterable[$puck_27.type].toList.call($puck_27));
      }
      else {
        if (true) {
          let $puck_28 = $puck_26;
        };
      };
    };
  }
  else {
    visit.walkMemberAccess(self, a);
  };
},
visitUnknownAccess: $puck_8.PositionVisitor.visitUnknownAccess,
visitUnknownIndexAccess: $puck_8.PositionVisitor.visitUnknownIndexAccess,
visitListLiteral: $puck_8.PositionVisitor.visitListLiteral,
visitBooleanLiteral: $puck_8.PositionVisitor.visitBooleanLiteral,
visitNumberLiteral: $puck_8.PositionVisitor.visitNumberLiteral,
visitRecordLiteral: $puck_8.PositionVisitor.visitRecordLiteral,
visitRecordLiteralMember: $puck_8.PositionVisitor.visitRecordLiteralMember,
visitStringLiteral: $puck_8.PositionVisitor.visitStringLiteral,
visitStringLiteralPart: $puck_8.PositionVisitor.visitStringLiteralPart,
visitTupleLiteral: $puck_8.PositionVisitor.visitTupleLiteral,
visitPattern: $puck_8.PositionVisitor.visitPattern,
visitIdentifierPattern: $puck_8.PositionVisitor.visitIdentifierPattern,
visitRecordPattern: $puck_8.PositionVisitor.visitRecordPattern,
visitRecordTypePattern: $puck_8.PositionVisitor.visitRecordTypePattern,
visitTuplePattern: $puck_8.PositionVisitor.visitTuplePattern,
visitTupleTypePattern: $puck_8.PositionVisitor.visitTupleTypePattern,
visitTypeBound: $puck_8.PositionVisitor.visitTypeBound,
visitFunctionTypeBound: $puck_8.PositionVisitor.visitFunctionTypeBound,
visitNamedTypeBound: $puck_8.PositionVisitor.visitNamedTypeBound,
visitRecordTypeBound: $puck_8.PositionVisitor.visitRecordTypeBound,
visitRecordTypeBoundMember: $puck_8.PositionVisitor.visitRecordTypeBoundMember,
visitTupleTypeBound: $puck_8.PositionVisitor.visitTupleTypeBound,
visitTypeParameter: $puck_8.PositionVisitor.visitTypeParameter
};
CompletionVisitor._new = function (file, position) {
  return {
    file: file,
    position: position,
    completions: $puck_1.None,
    importedModule: $puck_1.None,
    inTraitImpl: $puck_1.None,
    inType: $puck_1.None,
  };
};
const isHidden = $puck_1.RegExp._new("^\\.");
function getImportCompletions(_module) {
  let $puck_29 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.ObjectMap.values.call(_module.exports), $isTraitObject: true}, function (e) {
    return {
      label: e.identifier.name,
      kind: $unwrapTraitObject($puck_2.CompletionItemKind).Text,
      insertText: e.identifier.name,
      insertTextFormat: $unwrapTraitObject($puck_2.InsertTextFormat).PlainText,
    };
  })
;
  return $puck_1.Iterable[$puck_29.type].toList.call($puck_29);
};
function getScopeCompletions(node) {
  if ($unwrapTraitObject(node).scope) {
    const scope = $unwrapTraitObject(node).scope;
    let $puck_30 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.ObjectMap.values.call($puck_5.Scope.getBindings.call(scope)), $isTraitObject: true}, function (binding) {
      let $puck_31;
      if ((!binding.type_)) {
        $puck_31 = "??";
      }
      else {
        let $puck_32 = binding.type_.kind;
        let $puck_33;
        if ($unwrapTraitObject($puck_32).kind == "Function") {
          let undefined = $unwrapTraitObject($puck_32);
          $puck_33 = $puck_7.Type.verboseName.call(binding.type_);
        }
        else {
          let $puck_34;
          if (true) {
            let $puck_35 = $puck_32;
            $puck_34 = $puck_7.Type.displayName.call(binding.type_);
          };
          $puck_33 = $puck_34;
        };
        $puck_31 = $puck_33;
      };
      const typeName = $puck_31;
      return {
        label: binding.name + ": " + typeName + "",
        kind: $unwrapTraitObject($puck_2.CompletionItemKind).Text,
        insertText: binding.name,
        insertTextFormat: $unwrapTraitObject($puck_2.InsertTextFormat).PlainText,
      };
    })
;
    return $puck_1.Iterable[$puck_30.type].toList.call($puck_30);
  }
  else {
    return [];
  };
};
function getTraitImplCompletions(trait_) {
  let $puck_36 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.ObjectMap.toList.call(trait_.functions), $isTraitObject: true}, function ([name, type_]) {
    const signature = name + $puck_7.Type.verboseName.call(type_);
    return {
      label: signature,
      kind: $unwrapTraitObject($puck_2.CompletionItemKind).Method,
      insertText: "" + signature + " {$0}",
      insertTextFormat: $unwrapTraitObject($puck_2.InsertTextFormat).Snippet,
    };
  })
;
  return $puck_1.Iterable[$puck_36.type].toList.call($puck_36);
}
