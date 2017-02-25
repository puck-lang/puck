'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.createServerundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const path = require("path");
const $puck_3 = require("vscode-languageserver");
const $puck_4 = require("./ast/ast");
const $puck_5 = require("./ast/span");
const $puck_6 = require("./pls/completions");
const $puck_7 = require("./pls/definition");
const $puck_8 = require("./pls/hover");
const $puck_9 = require("./pls/position_visitor");
const $puck_10 = require("./typeck/src/scope");
const $puck_11 = require("./compiler");
const $puck_12 = require("./entities");
function createServer(projectPath, sendDiagnostic) {
  let context = $puck_11.createContext(projectPath);
  context.reportError = function (file, token, message) {
    $puck_1.print("reportError", [
      file.absolutePath,
      message,
    ]);
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
      message: message,
      source: "puck",
    });
  };
  let a = {};
  a.onClose = function (filePath) {};
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
    let $puck_13 = result;
    if (($puck_13.kind == "Err")) {
      let {value: [error]} = $puck_13;
      if (error != "Syntax Error") {
        $puck_1.print("Error:", $unwrapTraitObject(error));
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
    let visitor = $puck_6.CompletionVisitor._new(position);
    const result = $puck_2.asResult(function () {
      return $puck_9.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/completions.puck:CompletionVisitor"].visitModule.call({type: '$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/completions.puck:CompletionVisitor', value: visitor, $isTraitObject: true}, _module);
    });
    let $puck_14 = result;
    if ($unwrapTraitObject($puck_14).kind == "Ok") {
      let {value: [completions]} = $unwrapTraitObject($puck_14);
      let $puck_15 = visitor.completions;
      if ($puck_15.kind == "Some") {
        let {value: [completions]} = $puck_15;
        return completions;
      }
      else {
        return [];
      };
    }
    else {
      if ($unwrapTraitObject($puck_14).kind == "Err") {
        let {value: [error]} = $unwrapTraitObject($puck_14);
        $puck_1.print("completions Error:", [
          error,
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
      return $puck_8.Hover.empty();
    };
    const _module = $unwrapTraitObject(file.ast);
    if (!_module) {
      return $puck_8.Hover.empty();
    };
    let visitor = $puck_8.HoverVisitor._new(position);
    const result = $puck_2.asResult(function () {
      return $puck_9.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor"].visitModule.call({type: '$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/hover.puck:HoverVisitor', value: visitor, $isTraitObject: true}, _module);
    });
    let $puck_16 = result;
    if ($unwrapTraitObject($puck_16).kind == "Ok") {
      let {value: [$puck_17]} = $unwrapTraitObject($puck_16);
      $puck_1.print("onHover ok", visitor.hover);
      return $puck_1.Option.unwrapOrElse.call(visitor.hover, function () {
        return $puck_8.Hover.empty();
      });
    }
    else {
      if ($unwrapTraitObject($puck_16).kind == "Err") {
        let {value: [error]} = $unwrapTraitObject($puck_16);
        $puck_1.print("onHover Error:", [
          error,
          $unwrapTraitObject(error).stack,
        ]);
        return $puck_8.Hover.empty();
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
    let visitor = $puck_7.DefinitionVisitor._new(file, position);
    const result = $puck_2.asResult(function () {
      return $puck_9.PositionVisitor["$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/definition.puck:DefinitionVisitor"].visitModule.call({type: '$impl_lib/pls/position_visitor.puck:PositionVisitor$lib/pls/definition.puck:DefinitionVisitor', value: visitor, $isTraitObject: true}, _module);
    });
    let $puck_18 = result;
    if ($unwrapTraitObject($puck_18).kind == "Ok") {
      let {value: [$puck_19]} = $unwrapTraitObject($puck_18);
      $puck_1.print("onDefinition ok", visitor.definitions);
      return visitor.definitions;
    }
    else {
      if ($unwrapTraitObject($puck_18).kind == "Err") {
        let {value: [error]} = $unwrapTraitObject($puck_18);
        $puck_1.print("onDefinition Error:", [
          error,
          $unwrapTraitObject(error).stack,
        ]);
        return [];
      };
    };
  };
  return a;
};
exports.createServer = createServer
