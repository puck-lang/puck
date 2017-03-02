'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.createServerundefined;
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
    if ($unwrapTraitObject($puck_16).kind === "UndefinedVariable") {
      let {value: [name]} = $unwrapTraitObject($puck_16);
      $puck_17 = diagnosticId += 1;
    }
    else {
      let $puck_18;
      if ($unwrapTraitObject($puck_16).kind === "TraitNotInScope") {
        let undefined = $unwrapTraitObject($puck_16);
        $puck_18 = diagnosticId += 1;
      }
      else {
        let $puck_19;
        if (true) {
          let $puck_20 = $puck_16;
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
      let $puck_21 = $puck_1.Map.get.call(diagnostics, filePath);
      if (($puck_21.kind === "Some")) {
        let {value: [d]} = $puck_21;
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
    let $puck_22 = result;
    if (($puck_22.kind === "Err")) {
      let {value: [error]} = $puck_22;
      if (error !== "Syntax Error") {
        return $puck_1.print("Error:", error);
      };
    };
  };
  a.onCompletion = function (filePath, position) {
    $puck_1.print("onCompletion");
    let $puck_23 = $puck_1.Map.get.call(context.files, normalizePath(filePath));
    let $puck_24;
    if ($unwrapTraitObject($puck_23).kind === "Some") {
      let {value: [_module]} = $unwrapTraitObject($puck_23);
      $puck_24 = _module;
    }
    else {
      let $puck_25;
      if ($unwrapTraitObject($puck_23).kind === "None") {
        let undefined = $unwrapTraitObject($puck_23);
        return [];
      };
      $puck_24 = $puck_25;
    };
    const file = $puck_24;
    let $puck_26 = file.ast;
    let $puck_27;
    if ($unwrapTraitObject($puck_26).kind === "Some") {
      let {value: [_module]} = $unwrapTraitObject($puck_26);
      $puck_27 = _module;
    }
    else {
      let $puck_28;
      if ($unwrapTraitObject($puck_26).kind === "None") {
        let undefined = $unwrapTraitObject($puck_26);
        return [];
      };
      $puck_27 = $puck_28;
    };
    const _module = $puck_27;
    let visitor = $puck_8.CompletionVisitor._new(file, position);
    const result = $puck_2.asResult(function () {
      return $puck_11.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/completions.puck:CompletionVisitor"].visitModule.call({type: '$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/completions.puck:CompletionVisitor', value: visitor, $isTraitObject: true}, _module);
    });
    let $puck_29 = result;
    if ($unwrapTraitObject($puck_29).kind === "Ok") {
      let {value: [completions]} = $unwrapTraitObject($puck_29);
      let $puck_30 = visitor.completions;
      if ($puck_30.kind === "Some") {
        let {value: [completions]} = $puck_30;
        return completions;
      }
      else {
        return [];
      };
    }
    else {
      if ($unwrapTraitObject($puck_29).kind === "Err") {
        let {value: [error]} = $unwrapTraitObject($puck_29);
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
    let $puck_31 = getAst(filePath);
    let $puck_32;
    if ($unwrapTraitObject($puck_31).kind === "Some") {
      let {value: [_module]} = $unwrapTraitObject($puck_31);
      $puck_32 = _module;
    }
    else {
      let $puck_33;
      if ($unwrapTraitObject($puck_31).kind === "None") {
        let undefined = $unwrapTraitObject($puck_31);
        return $puck_1.None;
      };
      $puck_32 = $puck_33;
    };
    const _module = $puck_32;
    let visitor = $puck_10.HoverVisitor._new(position);
    const result = $puck_2.asResult(function () {
      return $puck_11.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor"].visitModule.call({type: '$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor', value: visitor, $isTraitObject: true}, _module);
    });
    let $puck_34 = result;
    if ($unwrapTraitObject($puck_34).kind === "Ok") {
      let {value: [$puck_35]} = $unwrapTraitObject($puck_34);
      $puck_1.print("onHover ok", visitor.hover);
      return visitor.hover;
    }
    else {
      if ($unwrapTraitObject($puck_34).kind === "Err") {
        let {value: [error]} = $unwrapTraitObject($puck_34);
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
    let $puck_36 = $puck_1.Map.get.call(context.files, normalizePath(filePath));
    let $puck_37;
    if ($unwrapTraitObject($puck_36).kind === "Some") {
      let {value: [_module]} = $unwrapTraitObject($puck_36);
      $puck_37 = _module;
    }
    else {
      let $puck_38;
      if ($unwrapTraitObject($puck_36).kind === "None") {
        let undefined = $unwrapTraitObject($puck_36);
        return [];
      };
      $puck_37 = $puck_38;
    };
    const file = $puck_37;
    let $puck_39 = file.ast;
    let $puck_40;
    if ($unwrapTraitObject($puck_39).kind === "Some") {
      let {value: [_module]} = $unwrapTraitObject($puck_39);
      $puck_40 = _module;
    }
    else {
      let $puck_41;
      if ($unwrapTraitObject($puck_39).kind === "None") {
        let undefined = $unwrapTraitObject($puck_39);
        return [];
      };
      $puck_40 = $puck_41;
    };
    const _module = $puck_40;
    let visitor = $puck_9.DefinitionVisitor._new(file, position);
    const result = $puck_2.asResult(function () {
      return $puck_11.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/definition.puck:DefinitionVisitor"].visitModule.call({type: '$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/definition.puck:DefinitionVisitor', value: visitor, $isTraitObject: true}, _module);
    });
    let $puck_42 = result;
    if ($unwrapTraitObject($puck_42).kind === "Ok") {
      let {value: [$puck_43]} = $unwrapTraitObject($puck_42);
      $puck_1.print("onDefinition ok", visitor.definitions);
      return visitor.definitions;
    }
    else {
      if ($unwrapTraitObject($puck_42).kind === "Err") {
        let {value: [error]} = $unwrapTraitObject($puck_42);
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
    let $puck_44 = getAst(filePath);
    let $puck_45;
    if ($unwrapTraitObject($puck_44).kind === "Some") {
      let {value: [_module]} = $unwrapTraitObject($puck_44);
      $puck_45 = _module;
    }
    else {
      let $puck_46;
      if ($unwrapTraitObject($puck_44).kind === "None") {
        let undefined = $unwrapTraitObject($puck_44);
        return $puck_1.None;
      };
      $puck_45 = $puck_46;
    };
    const _module = $puck_45;
    let visitor = $puck_12.SignatureVisitor._new(position);
    const result = $puck_2.asResult(function () {
      return $puck_11.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/signature.puck:SignatureVisitor"].visitModule.call({type: '$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/signature.puck:SignatureVisitor', value: visitor, $isTraitObject: true}, _module);
    });
    let $puck_47 = result;
    if ($unwrapTraitObject($puck_47).kind === "Ok") {
      let {value: [$puck_48]} = $unwrapTraitObject($puck_47);
      $puck_1.print("onSignature ok", visitor.signatureHelp);
      return visitor.signatureHelp;
    }
    else {
      if ($unwrapTraitObject($puck_47).kind === "Err") {
        let {value: [error]} = $unwrapTraitObject($puck_47);
        $puck_1.print("onDefinition Error:", [
          error,
          error.stack,
        ]);
        return $puck_1.None;
      };
    };
  };
  a.onCodeAction = function (filePath, span, codeActionContext) {
    let $puck_49 = $puck_1.Map.get.call(context.files, normalizePath(filePath));
    let $puck_50;
    if ($unwrapTraitObject($puck_49).kind === "Some") {
      let {value: [_module]} = $unwrapTraitObject($puck_49);
      $puck_50 = _module;
    }
    else {
      let $puck_51;
      if ($unwrapTraitObject($puck_49).kind === "None") {
        let undefined = $unwrapTraitObject($puck_49);
        return [];
      };
      $puck_50 = $puck_51;
    };
    const file = $puck_50;
    const result = $puck_2.asResult(function () {
      let $puck_55 = $puck_1.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: codeActionContext.diagnostics, $isTraitObject: true})
;
      let $puck_54 = $puck_1.Iterator[$puck_55.type].filter.call($puck_55, function (d) {
        return d.code >= 0;
      })
;
      let $puck_53 = $puck_1.Iterator[$puck_54.type].filterMap.call($puck_54, function (d) {
        return $puck_1.Option.andThen.call($puck_1.Map.get.call(diagnostics, filePath), function (errors) {
          return $puck_1.Map.get.call(errors, d.code);
        });
      })
;
      let $puck_52 = $puck_1.Iterator[$puck_53.type].flatMap.call($puck_53, function (error) {
        let $puck_56 = error;
        let $puck_57;
        if ($unwrapTraitObject($puck_56).kind === "UndefinedVariable") {
          let {value: [name]} = $unwrapTraitObject($puck_56);
          let $puck_59 = $puck_1.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$lib/stdlib/core.puck:Set"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$lib/stdlib/core.puck:Set', value: $puck_1.Option.unwrapOrElse.call($puck_1.Map.get.call(globalExportMap, name), function () {
            return $puck_1.Set._new();
          }), $isTraitObject: true})
;
          let $puck_58 = $puck_1.Iterator[$puck_59.type].map.call($puck_59, function (filePath) {
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
          $puck_57 = $puck_1.Iterator[$puck_58.type].collect.call($puck_58);
        }
        else {
          let $puck_60;
          if ($unwrapTraitObject($puck_56).kind === "TraitNotInScope") {
            let {value: {traitName: traitName, id: id}} = $unwrapTraitObject($puck_56);
            let $puck_65 = $puck_1.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$lib/stdlib/core.puck:Set"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$lib/stdlib/core.puck:Set', value: $puck_1.Option.unwrapOrElse.call($puck_1.Map.get.call(globalExportMap, traitName), function () {
              return $puck_1.Set._new();
            }), $isTraitObject: true})
;
            let $puck_64 = $puck_1.Iterator[$puck_65.type].filterMap.call($puck_65, function (filePath) {
              return $puck_1.Map.get.call(context.files, $unwrapTraitObject(filePath));
            })
;
            let $puck_63 = $puck_1.Iterator[$puck_64.type].filterMap.call($puck_64, function (file) {
              return file.ast;
            })
;
            let $puck_62 = $puck_1.Iterator[$puck_63.type].filter.call($puck_63, function (_module) {
              return $puck_1.Option.unwrapOr.call($puck_1.Option.map.call($puck_1.ObjectMap.get.call(_module.exports, traitName), function (e) {
                let $puck_66 = e.statement;
                if ($unwrapTraitObject($puck_66).kind === "TraitDeclaration") {
                  let {value: [t]} = $unwrapTraitObject($puck_66);
                  return $puck_1.Option.unwrap.call($puck_1.Option.unwrap.call($puck_4.TraitDeclaration.getType.call(t).providesType).id) === id;
                }
                else {
                  if (true) {
                    let $puck_67 = $puck_66;
                    return false;
                  };
                };
              }), false);
            })
;
            let $puck_61 = $puck_1.Iterator[$puck_62.type].map.call($puck_62, function (_module) {
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
            $puck_60 = $puck_1.Iterator[$puck_61.type].collect.call($puck_61);
          }
          else {
            let $puck_68;
            if (true) {
              let $puck_69 = $puck_56;
              $puck_68 = [];
            };
            $puck_60 = $puck_68;
          };
          $puck_57 = $puck_60;
        };
        const list = $puck_57;
        const iter = {type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: list, $isTraitObject: true};
        return iter;
      })
;
      return $puck_1.Iterator[$puck_52.type].collect.call($puck_52);
    });
    let $puck_70 = result;
    if ($unwrapTraitObject($puck_70).kind === "Ok") {
      let {value: [a]} = $unwrapTraitObject($puck_70);
      $puck_1.print("onCodeAction ok", a);
      return a;
    }
    else {
      if ($unwrapTraitObject($puck_70).kind === "Err") {
        let {value: [error]} = $unwrapTraitObject($puck_70);
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
    let $puck_71;
    if (command.command === "puck.reload") {
      $puck_1.Map.clear.call(context.files);
      $puck_1.Map.clear.call(context.impls);
      $puck_1.Map.clear.call(context.deferred);
      $puck_1.Map.clear.call(globalExportMap);
      $puck_71 = diagnosticId = 0;
    }
    else {
      let $puck_72;
      if (command.command === "puck.addImport") {
        let [name, importingPath, importedPath] = $unwrapTraitObject(command["arguments"]);
        let $puck_73 = [
          $puck_1.Option.andThen.call($puck_1.Map.get.call(context.files, importingPath), function (f) {
          return f.ast;
        }),
          $puck_1.Option.andThen.call($puck_1.Map.get.call(context.files, importedPath), function (f) {
          return f.ast;
        }),
        ];
        let $puck_74;
        if (($unwrapTraitObject($puck_73[0]).kind === "Some" && $unwrapTraitObject($puck_73[1]).kind === "Some")) {
          let [{value: [importingModule]}, {value: [importedModule]}] = $puck_73;
          const edit = $puck_7.createImport(name, importingModule, importedModule);
          $puck_1.print("edit", edit);
          let changes = $puck_1.ObjectMap._new();
          changes[$unwrapTraitObject($puck_6.toUri(importingPath))] = [edit];
          $puck_1.print("changes", changes);
          $puck_74 = applyEdit({changes: [{
            textDocument: {uri: $puck_6.toUri(importingPath)},
            edits: [edit],
          }]});
        };
        $puck_72 = $puck_74;
      };
      $puck_71 = $puck_72;
    };
    $puck_71;
  };
  return a;
};
exports.createServer = createServer
