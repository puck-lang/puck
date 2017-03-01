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
  let context = $puck_14.createContext(projectPath);
  let globalExportMap = $puck_1.Map._new();
  let diagnosticId = 0;
  context.reportError = function (file, token, message, error = $puck_15.CompilationError.Other) {
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
      message: message,
      source: "puck",
    });
  };
  context.onFileParsed = function (file) {
    const _module = $unwrapTraitObject(file.ast);
    return $puck_1.ObjectMap.forEach.call(_module.exports, function ([name, e]) {
      return $puck_1.Set.add.call($puck_1.Entry.orInsertWith.call($puck_1.Map.entry.call(globalExportMap, name), function () {
        return $puck_1.Set._new();
      }), file.absolutePath);
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
      let file = {
        isBin: false,
        fileName: $unwrapTraitObject(path.basename(filePath)),
        absolutePath: $unwrapTraitObject(path.resolve(path.normalize(filePath))),
        puck: contents,
      };
      file = context.importFile(file, true, skipSyntaxErrors);
      const parseTime = $puck_2.Date.now() - startTime;
      $puck_1.print("Parse time " + parseTime + "");
      let $puck_21 = $puck_1.Map.get.call(diagnostics, filePath);
      if (($puck_21.kind === "Some")) {
        let {value: [d]} = $puck_21;
        let dm = d;
        $puck_1.Map.clear.call(dm);
      };
      context.runTypeVisitor();
      const typeVisitorTime = $puck_2.Date.now() - startTime - parseTime;
      $puck_1.print("Type visitor time " + typeVisitorTime + "");
      context.runImplVisitor();
      const implVisitorTime = $puck_2.Date.now() - startTime - parseTime - typeVisitorTime;
      $puck_1.print("Impl visitor time " + implVisitorTime + "");
      context.runCheckerOnFile(file);
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
        $puck_1.print("Error:", error);
      };
      if ((!skipSyntaxErrors)) {};
    }
    else {};
  };
  a.onCompletion = function (filePath, position) {
    $puck_1.print("onCompletion");
    const file = $unwrapTraitObject(context.files[path.resolve(path.normalize(filePath))]);
    if (!file) {
      return [];
    };
    const _module = $unwrapTraitObject(file.ast);
    if (!_module) {
      return [];
    };
    let visitor = $puck_8.CompletionVisitor._new(file, position);
    const result = $puck_2.asResult(function () {
      return $puck_11.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/completions.puck:CompletionVisitor"].visitModule.call({type: '$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/completions.puck:CompletionVisitor', value: visitor, $isTraitObject: true}, _module);
    });
    let $puck_23 = result;
    if ($unwrapTraitObject($puck_23).kind === "Ok") {
      let {value: [completions]} = $unwrapTraitObject($puck_23);
      let $puck_24 = visitor.completions;
      if ($puck_24.kind === "Some") {
        let {value: [completions]} = $puck_24;
        return completions;
      }
      else {
        return [];
      };
    }
    else {
      if ($unwrapTraitObject($puck_23).kind === "Err") {
        let {value: [error]} = $unwrapTraitObject($puck_23);
        $puck_1.print("completions Error:", [
          $unwrapTraitObject(error),
          $unwrapTraitObject(error).stack,
        ]);
        return [];
      };
    };
  };
  a.onHover = function (filePath, position) {
    $puck_1.print("onHover");
    const file = $unwrapTraitObject(context.files[path.resolve(path.normalize(filePath))]);
    if ((!file)) {
      return $puck_1.None;
    };
    const _module = $unwrapTraitObject(file.ast);
    if (!_module) {
      return $puck_1.None;
    };
    let visitor = $puck_10.HoverVisitor._new(position);
    const result = $puck_2.asResult(function () {
      return $puck_11.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor"].visitModule.call({type: '$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor', value: visitor, $isTraitObject: true}, _module);
    });
    let $puck_25 = result;
    if ($unwrapTraitObject($puck_25).kind === "Ok") {
      let {value: [$puck_26]} = $unwrapTraitObject($puck_25);
      $puck_1.print("onHover ok", visitor.hover);
      return visitor.hover;
    }
    else {
      if ($unwrapTraitObject($puck_25).kind === "Err") {
        let {value: [error]} = $unwrapTraitObject($puck_25);
        $puck_1.print("onHover Error:", [
          $unwrapTraitObject(error),
          $unwrapTraitObject(error).stack,
        ]);
        return $puck_1.None;
      };
    };
  };
  a.onDefinition = function (filePath, position) {
    $puck_1.print("onDefinition");
    const file = $unwrapTraitObject(context.files[path.resolve(path.normalize(filePath))]);
    if ((!file)) {
      return [];
    };
    const _module = $unwrapTraitObject(file.ast);
    if (!_module) {
      return [];
    };
    let visitor = $puck_9.DefinitionVisitor._new(file, position);
    const result = $puck_2.asResult(function () {
      return $puck_11.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/definition.puck:DefinitionVisitor"].visitModule.call({type: '$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/definition.puck:DefinitionVisitor', value: visitor, $isTraitObject: true}, _module);
    });
    let $puck_27 = result;
    if ($unwrapTraitObject($puck_27).kind === "Ok") {
      let {value: [$puck_28]} = $unwrapTraitObject($puck_27);
      $puck_1.print("onDefinition ok", visitor.definitions);
      return visitor.definitions;
    }
    else {
      if ($unwrapTraitObject($puck_27).kind === "Err") {
        let {value: [error]} = $unwrapTraitObject($puck_27);
        $puck_1.print("onDefinition Error:", [
          $unwrapTraitObject(error),
          $unwrapTraitObject(error).stack,
        ]);
        return [];
      };
    };
  };
  a.onSignatureHelp = function (filePath, position) {
    $puck_1.print("onSignatureHelp");
    const file = $unwrapTraitObject(context.files[path.resolve(path.normalize(filePath))]);
    if ((!file)) {
      return $puck_1.None;
    };
    const _module = $unwrapTraitObject(file.ast);
    if (!_module) {
      return $puck_1.None;
    };
    let visitor = $puck_12.SignatureVisitor._new(position);
    const result = $puck_2.asResult(function () {
      return $puck_11.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/signature.puck:SignatureVisitor"].visitModule.call({type: '$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/signature.puck:SignatureVisitor', value: visitor, $isTraitObject: true}, _module);
    });
    let $puck_29 = result;
    if ($unwrapTraitObject($puck_29).kind === "Ok") {
      let {value: [$puck_30]} = $unwrapTraitObject($puck_29);
      $puck_1.print("onSignature ok", visitor.signatureHelp);
      return visitor.signatureHelp;
    }
    else {
      if ($unwrapTraitObject($puck_29).kind === "Err") {
        let {value: [error]} = $unwrapTraitObject($puck_29);
        $puck_1.print("onDefinition Error:", [
          $unwrapTraitObject(error),
          $unwrapTraitObject(error).stack,
        ]);
        return $puck_1.None;
      };
    };
  };
  a.onCodeAction = function (filePath, span, codeActionContext) {
    const file = $unwrapTraitObject(context.files[path.resolve(path.normalize(filePath))]);
    if ((!file)) {
      return [];
    };
    const result = $puck_2.asResult(function () {
      let $puck_34 = $puck_1.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: codeActionContext.diagnostics, $isTraitObject: true})
;
      let $puck_33 = $puck_1.Iterator[$puck_34.type].filter.call($puck_34, function (d) {
        return d.code >= 0;
      })
;
      let $puck_32 = $puck_1.Iterator[$puck_33.type].filterMap.call($puck_33, function (d) {
        return $puck_1.Option.andThen.call($puck_1.Map.get.call(diagnostics, filePath), function (errors) {
          return $puck_1.Map.get.call(errors, d.code);
        });
      })
;
      let $puck_31 = $puck_1.Iterator[$puck_32.type].flatMap.call($puck_32, function (error) {
        let $puck_35 = error;
        let $puck_36;
        if ($unwrapTraitObject($puck_35).kind === "UndefinedVariable") {
          let {value: [name]} = $unwrapTraitObject($puck_35);
          let $puck_38 = $puck_1.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$lib/stdlib/core.puck:Set"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$lib/stdlib/core.puck:Set', value: $puck_1.Option.unwrapOrElse.call($puck_1.Map.get.call(globalExportMap, name), function () {
            return $puck_1.Set._new();
          }), $isTraitObject: true})
;
          let $puck_37 = $puck_1.Iterator[$puck_38.type].map.call($puck_38, function (filePath) {
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
          $puck_36 = $puck_1.Iterator[$puck_37.type].collect.call($puck_37);
        }
        else {
          let $puck_39;
          if ($unwrapTraitObject($puck_35).kind === "TraitNotInScope") {
            let {value: {name: name, id: id}} = $unwrapTraitObject($puck_35);
            let $puck_44 = $puck_1.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$lib/stdlib/core.puck:Set"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$lib/stdlib/core.puck:Set', value: $puck_1.Option.unwrapOrElse.call($puck_1.Map.get.call(globalExportMap, name), function () {
              return $puck_1.Set._new();
            }), $isTraitObject: true})
;
            let $puck_43 = $puck_1.Iterator[$puck_44.type].filterMap.call($puck_44, function (filePath) {
              return $puck_1.ObjectMap.get.call(context.files, $unwrapTraitObject(filePath));
            })
;
            let $puck_42 = $puck_1.Iterator[$puck_43.type].filterMap.call($puck_43, function (file) {
              const _module = $unwrapTraitObject(file).ast;
              if (_module) {
                return $puck_1.Some(_module);
              }
              else {
                return $puck_1.None;
              };
            })
;
            let $puck_41 = $puck_1.Iterator[$puck_42.type].filter.call($puck_42, function (_module) {
              return $puck_1.Option.unwrapOr.call($puck_1.Option.map.call($puck_1.ObjectMap.get.call(_module.exports, name), function (e) {
                let $puck_45 = e.statement;
                if ($unwrapTraitObject($puck_45).kind === "TraitDeclaration") {
                  let {value: [t]} = $unwrapTraitObject($puck_45);
                  return $puck_1.Option.unwrap.call($puck_1.Option.unwrap.call($puck_4.TraitDeclaration.getType.call(t).providesType).id) === id;
                }
                else {
                  if (true) {
                    let $puck_46 = $puck_45;
                    return false;
                  };
                };
              }), false);
            })
;
            let $puck_40 = $puck_1.Iterator[$puck_41.type].map.call($puck_41, function (_module) {
              const path = $puck_7.bestImportPath(file, _module.file.absolutePath);
              const cmd = $puck_6.Command({
                title: "Import " + name + " from " + path + "",
                command: "puck.addImport",
                _arguments: [[
                name,
                file.absolutePath,
                _module.file.absolutePath,
              ]],
              });
              cmd["arguments"] = cmd._arguments;
              return cmd;
            })
;
            $puck_39 = $puck_1.Iterator[$puck_40.type].collect.call($puck_40);
          }
          else {
            let $puck_47;
            if (true) {
              let $puck_48 = $puck_35;
              $puck_47 = [];
            };
            $puck_39 = $puck_47;
          };
          $puck_36 = $puck_39;
        };
        const list = $puck_36;
        const iter = {type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: list, $isTraitObject: true};
        return iter;
      })
;
      return $puck_1.Iterator[$puck_31.type].collect.call($puck_31);
    });
    let $puck_49 = result;
    if ($unwrapTraitObject($puck_49).kind === "Ok") {
      let {value: [a]} = $unwrapTraitObject($puck_49);
      $puck_1.print("onCodeAction ok", a);
      return a;
    }
    else {
      if ($unwrapTraitObject($puck_49).kind === "Err") {
        let {value: [error]} = $unwrapTraitObject($puck_49);
        $puck_1.print("onCodeAction Error:", [
          $unwrapTraitObject(error),
          $unwrapTraitObject(error).stack,
        ]);
        return [];
      };
    };
  };
  a.onExecuteCommand = function (command) {
    $puck_1.print("onExecuteCommand", command);
    let $puck_50;
    if (command.command === "puck.reload") {
      context.files = $puck_1.ObjectMap._new();
      context.deferred = $puck_1.ObjectMap._new();
      $puck_1.Map.clear.call(globalExportMap);
      $puck_50 = diagnosticId = 0;
    }
    else {
      let $puck_51;
      if (command.command === "puck.addImport") {
        let [name, importingPath, importedPath] = $unwrapTraitObject(command["arguments"]);
        let $puck_52 = [
          $puck_1.ObjectMap.get.call(context.files, importingPath),
          $puck_1.ObjectMap.get.call(context.files, importedPath),
        ];
        let $puck_53;
        if (($unwrapTraitObject($puck_52[0]).kind === "Some" && $unwrapTraitObject($puck_52[1]).kind === "Some")) {
          let [{value: [importingFile]}, {value: [importedFile]}] = $puck_52;
          const importingModule = $unwrapTraitObject($unwrapTraitObject(importingFile).ast);
          const importedModule = $unwrapTraitObject($unwrapTraitObject(importedFile).ast);
          const result = $puck_2.asResult(function () {
            const edit = $puck_7.createImport(name, importingModule, importedModule);
            $puck_1.print("edit", edit);
            let changes = $puck_1.ObjectMap._new();
            changes[$unwrapTraitObject($puck_6.toUri(importingPath))] = [edit];
            $puck_1.print("changes", changes);
            return applyEdit({changes: [{
              textDocument: {uri: $puck_6.toUri(importingPath)},
              edits: [edit],
            }]});
          });
          let $puck_54 = result;
          let $puck_55;
          if ($unwrapTraitObject($puck_54).kind === "Ok") {
            let {value: [a]} = $unwrapTraitObject($puck_54);
            $puck_1.print("applyEdit ok", a);
            a["then"](function (b) {
              return $puck_1.print("applyEdit then", b);
            });
            a["catch"](function (b) {
              return $puck_1.print("applyEdit catch", b);
            });
            $puck_55 = a;
          }
          else {
            let $puck_56;
            if ($unwrapTraitObject($puck_54).kind === "Err") {
              let {value: [error]} = $unwrapTraitObject($puck_54);
              $puck_1.print("applyEdit Error:", [
                $unwrapTraitObject(error),
                $unwrapTraitObject(error).stack,
              ]);
              $puck_56 = [];
            };
            $puck_55 = $puck_56;
          };
          $puck_53 = $puck_55;
        };
        $puck_51 = $puck_53;
      };
      $puck_50 = $puck_51;
    };
    $puck_50;
  };
  return a;
};
exports.createServer = createServer
