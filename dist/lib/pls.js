'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.createServer = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const path = require("path");
const $puck_3 = require("vscode-languageserver");
const $puck_4 = require("./ast/ast");
const $puck_5 = require("./ast/span");
const $puck_6 = require("./pls/src/entities");
const $puck_7 = require("./pls/src/imports");
const $puck_8 = require("./pls/completions");
const $puck_9 = require("./pls/definition");
const $puck_10 = require("./pls/hover");
const $puck_11 = require("./pls/position_visitor");
const $puck_12 = require("./pls/signature");
const $puck_13 = require("./typeck/src/scope");
const $puck_14 = require("./compiler");
const $puck_15 = require("./entities");
function createServer(projectPath, sendDiagnostic, applyEdit) {
  let diagnostics = $puck_1.Map._new();
  let globalExportMap = $puck_1.Map._new();
  let diagnosticId = 0;
  function reportError(file, token, error) {
    let $puck_16 = error;
    let $puck_17;
    if ($puck_16.kind === "UndefinedVariable") {
      let {value: name} = $puck_16;
      $puck_17 = diagnosticId += 1;
    }
    else {
      let $puck_18;
      if ($puck_16.kind === "TraitNotInScope") {
        $puck_16;
        $puck_18 = diagnosticId += 1;
      }
      else {
        let $puck_19;
        if (true) {
          $puck_16;
          $puck_19 = -1;
        };
        $puck_18 = $puck_19;
      };
      $puck_17 = $puck_18;
    };
    const id = $puck_17;
    if ((id >= 0)) {
      $puck_1.Map.set.call($puck_1.Entry.orInsertWith.call($puck_1.Map.entry.call(diagnostics, file.absolutePath), function () {
        return $puck_1.Map._new();
      }), id, error);
    };
    const span = $puck_5.ToSpan[token.type].span.call(token);
    return sendDiagnostic(file.absolutePath, {
      severity: $unwrapTraitObject($puck_3.DiagnosticSeverity).Error,
      range: {
      start: {
      line: span.start.line - 1,
      character: span.start.column - 1,
    },
      end: {
      line: span.end.line - 1,
      character: span.end.column - 1,
    },
    },
      code: id,
      message: $puck_15.CompilationError.message.call(error),
      source: "puck",
    });
  };
  function onFileParsed(file) {
    const _module = $puck_1.Option.unwrap.call(file.ast);
    return $puck_1.ObjectMap.forEach.call(_module.exports, function ([name, e]) {
      return $puck_1.Set.add.call($puck_1.Entry.orInsertWith.call($puck_1.Map.entry.call(globalExportMap, name), function () {
        return $puck_1.Set._new();
      }), file.absolutePath);
    });
  };
  let context = $puck_14.CompilerContext._new(projectPath, reportError, onFileParsed);
  function normalizePath(filePath) {
    return path.resolve(path.normalize(filePath));
  };
  function getAst(filePath) {
    return $puck_1.Option.andThen.call($puck_1.Map.get.call(context.files, normalizePath(filePath)), function (f) {
      return f.ast;
    });
  };
  let a = {};
  a.onClose = function (filePath) {
    return $puck_1.Map._delete.call(diagnostics, filePath);
  };
  a.validateDocument = function (filePath, contents, skipSyntaxErrors) {
    $puck_1.print("validateDocument");
    const startTime = $puck_2.Date.now();
    const result = $puck_2.asResult(function () {
      const startTime = $puck_2.Date.now();
      let file = $puck_15.File({
        isBin: false,
        fileName: $unwrapTraitObject(path.basename(filePath)),
        absolutePath: $unwrapTraitObject(path.resolve(path.normalize(filePath))),
        puck: contents,
        js: $puck_1.None,
        ast: $puck_1.None,
        outFile: $puck_1.None,
      });
      file = $puck_14.CompilerContext.importFile.call(context, file, true, skipSyntaxErrors);
      const parseTime = $puck_2.Date.now() - startTime;
      $puck_1.print("Parse time " + parseTime + "");
      let $puck_20 = $puck_1.Map.get.call(diagnostics, filePath);
      if (($puck_20 !== undefined)) {
        let d = $puck_20;
        let dm = d;
        $puck_1.Map.clear.call(dm);
      };
      $puck_14.CompilerContext.runTypeVisitor.call(context);
      const typeVisitorTime = $puck_2.Date.now() - startTime - parseTime;
      $puck_1.print("Type visitor time " + typeVisitorTime + "");
      $puck_14.CompilerContext.runImplVisitor.call(context);
      const implVisitorTime = $puck_2.Date.now() - startTime - parseTime - typeVisitorTime;
      $puck_1.print("Impl visitor time " + implVisitorTime + "");
      $puck_14.CompilerContext.runCheckerOnFile.call(context, file);
      const scopeVisitorTime = $puck_2.Date.now() - startTime - parseTime - typeVisitorTime - implVisitorTime;
      return $puck_1.print("Scope visitor time " + scopeVisitorTime + "");
    });
    const totalTime = $puck_2.Date.now() - startTime;
    $puck_1.print("Total time " + totalTime + "");
    $puck_1.print("validateDocument completed");
    let $puck_21 = result;
    if (($puck_21.kind === "Err")) {
      let {value: error} = $puck_21;
      if (error !== "Syntax Error") {
        return $puck_1.print("Error:", error);
      };
    };
  };
  a.onCompletion = function (filePath, position) {
    $puck_1.print("onCompletion");
    let $puck_22 = $puck_1.Map.get.call(context.files, normalizePath(filePath));
    let $puck_23;
    if ($puck_22 !== undefined) {
      let _module = $puck_22;
      $puck_23 = _module;
    }
    else {
      let $puck_24;
      if ($puck_22 === undefined) {
        $puck_22;
        return [];
      };
      $puck_23 = $puck_24;
    };
    const file = $puck_23;
    let $puck_25 = file.ast;
    let $puck_26;
    if ($puck_25 !== undefined) {
      let _module = $puck_25;
      $puck_26 = _module;
    }
    else {
      let $puck_27;
      if ($puck_25 === undefined) {
        $puck_25;
        return [];
      };
      $puck_26 = $puck_27;
    };
    const _module = $puck_26;
    let visitor = $puck_8.CompletionVisitor._new(file, position);
    const result = $puck_2.asResult(function () {
      return $puck_11.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/completions.puck:CompletionVisitor"].visitModule.call({type: '$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/completions.puck:CompletionVisitor', value: visitor, $isTraitObject: true}, _module);
    });
    let $puck_28 = result;
    if ($puck_28.kind === "Ok") {
      let {value: completions} = $puck_28;
      let $puck_29 = visitor.completions;
      if ($puck_29 !== undefined) {
        let completions = $puck_29;
        return completions;
      }
      else {
        return [];
      };
    }
    else {
      if ($puck_28.kind === "Err") {
        let {value: error} = $puck_28;
        $puck_1.print("completions Error:", [
          error,
          error.stack,
        ]);
        return [];
      };
    };
  };
  a.onHover = function (filePath, position) {
    $puck_1.print("onHover");
    let $puck_30 = getAst(filePath);
    let $puck_31;
    if ($puck_30 !== undefined) {
      let _module = $puck_30;
      $puck_31 = _module;
    }
    else {
      let $puck_32;
      if ($puck_30 === undefined) {
        $puck_30;
        return $puck_1.None;
      };
      $puck_31 = $puck_32;
    };
    const _module = $puck_31;
    let visitor = $puck_10.HoverVisitor._new(position);
    const result = $puck_2.asResult(function () {
      return $puck_11.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor"].visitModule.call({type: '$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor', value: visitor, $isTraitObject: true}, _module);
    });
    let $puck_33 = result;
    if ($puck_33.kind === "Ok") {
      $puck_33;
      $puck_1.print("onHover ok", visitor.hover);
      return visitor.hover;
    }
    else {
      if ($puck_33.kind === "Err") {
        let {value: error} = $puck_33;
        $puck_1.print("onHover Error:", [
          error,
          error.stack,
        ]);
        return $puck_1.None;
      };
    };
  };
  a.onDefinition = function (filePath, position) {
    $puck_1.print("onDefinition");
    let $puck_34 = $puck_1.Map.get.call(context.files, normalizePath(filePath));
    let $puck_35;
    if ($puck_34 !== undefined) {
      let _module = $puck_34;
      $puck_35 = _module;
    }
    else {
      let $puck_36;
      if ($puck_34 === undefined) {
        $puck_34;
        return [];
      };
      $puck_35 = $puck_36;
    };
    const file = $puck_35;
    let $puck_37 = file.ast;
    let $puck_38;
    if ($puck_37 !== undefined) {
      let _module = $puck_37;
      $puck_38 = _module;
    }
    else {
      let $puck_39;
      if ($puck_37 === undefined) {
        $puck_37;
        return [];
      };
      $puck_38 = $puck_39;
    };
    const _module = $puck_38;
    let visitor = $puck_9.DefinitionVisitor._new(file, position);
    const result = $puck_2.asResult(function () {
      return $puck_11.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/definition.puck:DefinitionVisitor"].visitModule.call({type: '$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/definition.puck:DefinitionVisitor', value: visitor, $isTraitObject: true}, _module);
    });
    let $puck_40 = result;
    if ($puck_40.kind === "Ok") {
      $puck_40;
      $puck_1.print("onDefinition ok", visitor.definitions);
      return visitor.definitions;
    }
    else {
      if ($puck_40.kind === "Err") {
        let {value: error} = $puck_40;
        $puck_1.print("onDefinition Error:", [
          error,
          error.stack,
        ]);
        return [];
      };
    };
  };
  a.onSignatureHelp = function (filePath, position) {
    $puck_1.print("onSignatureHelp");
    let $puck_41 = getAst(filePath);
    let $puck_42;
    if ($puck_41 !== undefined) {
      let _module = $puck_41;
      $puck_42 = _module;
    }
    else {
      let $puck_43;
      if ($puck_41 === undefined) {
        $puck_41;
        return $puck_1.None;
      };
      $puck_42 = $puck_43;
    };
    const _module = $puck_42;
    let visitor = $puck_12.SignatureVisitor._new(position);
    const result = $puck_2.asResult(function () {
      return $puck_11.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/signature.puck:SignatureVisitor"].visitModule.call({type: '$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/signature.puck:SignatureVisitor', value: visitor, $isTraitObject: true}, _module);
    });
    let $puck_44 = result;
    if ($puck_44.kind === "Ok") {
      $puck_44;
      $puck_1.print("onSignature ok", visitor.signatureHelp);
      return visitor.signatureHelp;
    }
    else {
      if ($puck_44.kind === "Err") {
        let {value: error} = $puck_44;
        $puck_1.print("onDefinition Error:", [
          error,
          error.stack,
        ]);
        return $puck_1.None;
      };
    };
  };
  a.onCodeAction = function (filePath, span, codeActionContext) {
    let $puck_45 = $puck_1.Map.get.call(context.files, normalizePath(filePath));
    let $puck_46;
    if ($puck_45 !== undefined) {
      let _module = $puck_45;
      $puck_46 = _module;
    }
    else {
      let $puck_47;
      if ($puck_45 === undefined) {
        $puck_45;
        return [];
      };
      $puck_46 = $puck_47;
    };
    const file = $puck_46;
    const result = $puck_2.asResult(function () {
      let $puck_51 = $puck_1.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: codeActionContext.diagnostics, $isTraitObject: true})
;
      let $puck_50 = $puck_1.Iterator[$puck_51.type].filter.call($puck_51, function (d) {
        return d.code >= 0;
      })
;
      let $puck_49 = $puck_1.Iterator[$puck_50.type].filterMap.call($puck_50, function (d) {
        return $puck_1.Option.andThen.call($puck_1.Map.get.call(diagnostics, filePath), function (errors) {
          return $puck_1.Map.get.call(errors, d.code);
        });
      })
;
      let $puck_48 = $puck_1.Iterator[$puck_49.type].flatMap.call($puck_49, function (error) {
        let $puck_52 = error;
        let $puck_53;
        if ($puck_52.kind === "UndefinedVariable") {
          let {value: name} = $puck_52;
          let $puck_55 = $puck_1.IntoIterator["$impl_IntoIterator$lib/stdlib/core.puck:Set"].iter.call({type: '$impl_IntoIterator$lib/stdlib/core.puck:Set', value: $puck_1.Option.unwrapOrElse.call($puck_1.Map.get.call(globalExportMap, name), function () {
            return $puck_1.Set._new();
          }), $isTraitObject: true})
;
          let $puck_54 = $puck_1.Iterator[$puck_55.type].map.call($puck_55, function (filePath) {
            const path = $puck_7.bestImportPath(file, $unwrapTraitObject(filePath));
            const cmd = $puck_6.Command({
              title: "Import " + name + " from " + path + "",
              command: "puck.addImport",
              _arguments: [[
              name,
              file.absolutePath,
              $unwrapTraitObject(filePath),
            ]],
            });
            cmd["arguments"] = cmd._arguments;
            return cmd;
          })
;
          $puck_53 = $puck_1.Iterator[$puck_54.type].collect.call($puck_54);
        }
        else {
          let $puck_56;
          if ($puck_52.kind === "TraitNotInScope") {
            let {value: {traitName: traitName, id: id}} = $puck_52;
            let $puck_61 = $puck_1.IntoIterator["$impl_IntoIterator$lib/stdlib/core.puck:Set"].iter.call({type: '$impl_IntoIterator$lib/stdlib/core.puck:Set', value: $puck_1.Option.unwrapOrElse.call($puck_1.Map.get.call(globalExportMap, traitName), function () {
              return $puck_1.Set._new();
            }), $isTraitObject: true})
;
            let $puck_60 = $puck_1.Iterator[$puck_61.type].filterMap.call($puck_61, function (filePath) {
              return $puck_1.Map.get.call(context.files, $unwrapTraitObject(filePath));
            })
;
            let $puck_59 = $puck_1.Iterator[$puck_60.type].filterMap.call($puck_60, function (file) {
              return file.ast;
            })
;
            let $puck_58 = $puck_1.Iterator[$puck_59.type].filter.call($puck_59, function (_module) {
              return $puck_1.Option.unwrapOr.call($puck_1.Option.map.call($puck_1.ObjectMap.get.call(_module.exports, traitName), function (e) {
                let $puck_62 = e.statement;
                if ($puck_62.kind === "TraitDeclaration") {
                  let {value: t} = $puck_62;
                  return $puck_1.Option.unwrap.call($puck_1.Option.unwrap.call($puck_4.TraitDeclaration.getType.call(t).providesType).id) === id;
                }
                else {
                  if (true) {
                    $puck_62;
                    return false;
                  };
                };
              }), false);
            })
;
            let $puck_57 = $puck_1.Iterator[$puck_58.type].map.call($puck_58, function (_module) {
              const path = $puck_7.bestImportPath(file, _module.file.absolutePath);
              const cmd = $puck_6.Command({
                title: "Import " + traitName + " from " + path + "",
                command: "puck.addImport",
                _arguments: [[
                traitName,
                file.absolutePath,
                _module.file.absolutePath,
              ]],
              });
              cmd["arguments"] = cmd._arguments;
              return cmd;
            })
;
            $puck_56 = $puck_1.Iterator[$puck_57.type].collect.call($puck_57);
          }
          else {
            let $puck_63;
            if (true) {
              $puck_52;
              $puck_63 = [];
            };
            $puck_56 = $puck_63;
          };
          $puck_53 = $puck_56;
        };
        const list = $puck_53;
        const iter = {type: '$impl_IntoIterator$List', value: list, $isTraitObject: true};
        return iter;
      })
;
      return $puck_1.Iterator[$puck_48.type].collect.call($puck_48);
    });
    let $puck_64 = result;
    if ($puck_64.kind === "Ok") {
      let {value: a} = $puck_64;
      $puck_1.print("onCodeAction ok", a);
      return a;
    }
    else {
      if ($puck_64.kind === "Err") {
        let {value: error} = $puck_64;
        $puck_1.print("onCodeAction Error:", [
          error,
          error.stack,
        ]);
        return [];
      };
    };
  };
  a.onExecuteCommand = function (command) {
    $puck_1.print("onExecuteCommand", command);
    let $puck_65;
    if (command.command === "puck.reload") {
      $puck_1.Map.clear.call(context.files);
      $puck_1.Map.clear.call(context.impls);
      $puck_1.Map.clear.call(context.deferred);
      $puck_1.Map.clear.call(globalExportMap);
      $puck_65 = diagnosticId = 0;
    }
    else {
      let $puck_66;
      if (command.command === "puck.addImport") {
        let [name, importingPath, importedPath] = $unwrapTraitObject(command["arguments"]);
        let $puck_67 = [
          $puck_1.Option.andThen.call($puck_1.Map.get.call(context.files, importingPath), function (f) {
          return f.ast;
        }),
          $puck_1.Option.andThen.call($puck_1.Map.get.call(context.files, importedPath), function (f) {
          return f.ast;
        }),
        ];
        let $puck_68;
        if (($puck_67[0] !== undefined && $puck_67[1] !== undefined)) {
          let [importingModule, importedModule] = $puck_67;
          const edit = $puck_7.createImport(name, importingModule, importedModule);
          $puck_1.print("edit", edit);
          let changes = $puck_1.ObjectMap._new();
          changes[$unwrapTraitObject($puck_6.toUri(importingPath))] = [edit];
          $puck_1.print("changes", changes);
          $puck_68 = applyEdit({changes: [{
            textDocument: {uri: $puck_6.toUri(importingPath)},
            edits: [edit],
          }]});
        };
        $puck_66 = $puck_68;
      };
      $puck_65 = $puck_66;
    };
    $puck_65;
  };
  return a;
};
exports.createServer = createServer
