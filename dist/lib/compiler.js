'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.CompilerContext = exports.parseString = exports.compile = exports.buildString = exports.build = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const babel = require("babel-core");
const fs = require("fs");
const path = require("path");
const $puck_3 = require("util");
const $puck_4 = require("./ast/empty_visitor");
const $puck_5 = require("./ast/span");
const $puck_6 = require("./compiler/emitter");
const $puck_7 = require("./compiler/input_stream");
const $puck_8 = require("./compiler/parser");
const $puck_9 = require("./compiler/token_stream");
const $puck_10 = require("./helpers");
const $puck_11 = require("./typeck/impl_visitor");
const $puck_12 = require("./typeck/import_visitor");
const $puck_13 = require("./typeck/scope_visitor");
const $puck_14 = require("./typeck/top_level_visitor");
const $puck_15 = require("./typeck/type_visitor");
const $puck_16 = require("./entities");
var CompilerContext = exports.CompilerContext = (object) => object;
CompilerContext._new = function (projectPath, onReportError, onFileParsed = function ($puck_17) {}) {
  return {
    projectPath: projectPath,
    impls: $puck_1.Map._new(),
    files: $puck_1.Map._new(),
    deferred: $puck_1.Map._new(),
    deferredImpl: $puck_1.Map._new(),
    onFileParsed: onFileParsed,
    onReportError: onReportError,
  };
};
CompilerContext.runTypeVisitor = function () {
  let self = this;
  $puck_1.Iterator["$impl_Iterator$lib/stdlib/core.puck:JsIterator"].forEach.call({type: '$impl_Iterator$lib/stdlib/core.puck:JsIterator', value: $puck_1.Map.values.call(self.files), $isTraitObject: true}, function (file) {
    if (!file.typeVisitorStarted && $puck_1.Option.isSome.call(file.ast)) {
      file.typeVisitorStarted = true;
      $puck_15.TypeVisitor(self, file).visitModule($puck_1.Option.unwrap.call(file.ast));
      return file.typeVisitorCompleted = true;
    };
  });
};
CompilerContext.runImplVisitor = function () {
  let self = this;
  $puck_1.Iterator["$impl_Iterator$lib/stdlib/core.puck:JsIterator"].forEach.call({type: '$impl_Iterator$lib/stdlib/core.puck:JsIterator', value: $puck_1.Map.values.call(self.files), $isTraitObject: true}, function (file) {
    if ((!file.implVisitorStarted && $puck_1.Option.isSome.call(file.ast))) {
      file.implVisitorStarted = true;
      $puck_4.EmptyVisitor["$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/impl_visitor.puck:ImplVisitor"].visitModule.call({type: '$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/impl_visitor.puck:ImplVisitor', value: $puck_11.ImplVisitor._new(self, file), $isTraitObject: true}, $puck_1.Option.unwrap.call(file.ast));
      return $puck_11.checkDefferedImpls(self.deferredImpl);
    };
  });
  $puck_11.checkDefferedImpls(self.deferredImpl);
  let $puck_18 = $puck_1.IntoIterator["$impl_IntoIterator$lib/stdlib/core.puck:JsIterator"].iter.call({type: '$impl_IntoIterator$lib/stdlib/core.puck:JsIterator', value: $puck_1.Map.entries.call(self.deferredImpl), $isTraitObject: true});
  let $puck_19 = true;
  while ($puck_19) {
    let $puck_21 = $puck_1.Iterator[$puck_18.type].next.call($puck_18);
    if ($puck_21 !== undefined) {
      let [, awaiters] = $puck_21;
      let $puck_22 = $puck_1.IntoIterator["$impl_IntoIterator$List"].iter.call({type: '$impl_IntoIterator$List', value: awaiters, $isTraitObject: true});
      let $puck_23 = true;
      while ($puck_23) {
        let $puck_25 = $puck_1.Iterator[$puck_22.type].next.call($puck_22);
        if ($puck_25 !== undefined) {
          let [, callback] = $puck_25;
          callback();
        }
        else {
          $puck_23 = false;
        };
      };
    }
    else {
      $puck_19 = false;
    };
  };
};
CompilerContext.runChecker = function () {
  let self = this;
  $puck_1.Iterator["$impl_Iterator$lib/stdlib/core.puck:JsIterator"].forEach.call({type: '$impl_Iterator$lib/stdlib/core.puck:JsIterator', value: $puck_1.Map.values.call(self.files), $isTraitObject: true}, function (file) {
    if ((!file.scopeVisitorStarted && $puck_1.Option.isSome.call(file.ast))) {
      file.scopeVisitorStarted = true;
      return $puck_13.ScopeVisitor(self, file).visitModule($puck_1.Option.unwrap.call(file.ast));
    };
  });
};
CompilerContext.runTypeVisitorOnFile = function (file) {
  let self = this;
  if (!file.typeVisitorStarted) {
    file.typeVisitorStarted = true;
    $puck_15.TypeVisitor(self, file).visitModule($puck_1.Option.unwrap.call(file.ast));
  };
};
CompilerContext.runImplVisitorOnFile = function (file) {
  let self = this;
  if (!file.typeVisitorStarted) {
    CompilerContext.runTypeVisitorOnFile.call(self, file);
  };
  if (file.implVisitorStarted) {
    $puck_1.panic($puck_2.Error("runImplVisitorOnFile??"));
  };
  file.implVisitorStarted = true;
  $puck_4.EmptyVisitor["$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/impl_visitor.puck:ImplVisitor"].visitModule.call({type: '$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/impl_visitor.puck:ImplVisitor', value: $puck_11.ImplVisitor._new(self, file), $isTraitObject: true}, $puck_1.Option.unwrap.call(file.ast));
  $puck_11.checkDefferedImpls(self.deferredImpl);
};
CompilerContext.runCheckerOnFile = function (file) {
  let self = this;
  if (!file.implVisitorStarted) {
    CompilerContext.runImplVisitorOnFile.call(self, file);
  };
  if (!file.scopeVisitorStarted) {
    file.scopeVisitorStarted = true;
    $puck_13.ScopeVisitor(self, file).visitModule($puck_1.Option.unwrap.call(file.ast));
  };
};
CompilerContext.defer = function (file, func) {
  let self = this;
  $puck_1.List.push.call($puck_1.Entry.orInsert.call($puck_1.Map.entry.call(self.deferred, file.absolutePath), []), func);
};
CompilerContext.deferAfterImpl = function (type_, traits, func) {
  let self = this;
  $puck_1.List.push.call($puck_1.Entry.orInsert.call($puck_1.Map.entry.call(self.deferredImpl, type_), []), [
    traits,
    func,
  ]);
  $puck_11.checkDefferedImpls(self.deferredImpl);
};
CompilerContext.resolvePath = function (file, relativeTo) {
  let $puck_26;
  if ($puck_1.String.startsWith.call(file, "/")) {
    $puck_26 = file;
  }
  else {
    $puck_26 = path.join(path.dirname(relativeTo.absolutePath), file);
  };
  const filePath = $puck_26;
  const absolutePath = fs.realpathSync(path.resolve(path.normalize(filePath)));
  const fileName = path.basename(absolutePath);
  return {
    isBin: false,
    fileName: fileName,
    absolutePath: absolutePath,
    puck: "",
    outFile: $puck_1.None,
    ast: $puck_1.None,
    js: $puck_1.None,
  };
};
CompilerContext.importFile = function (file, force = false, recoverFromSyntaxErrors = false) {
  let self = this;
  let $puck_27 = file.outFile;
  if ($puck_27 !== undefined) {
    let outFile = $puck_27;
    let $puck_28 = $puck_1.Map.get.call(self.files, file.absolutePath);
    if ($puck_28 !== undefined) {
      let existingFile = $puck_28;
      existingFile.outFile = $puck_1.Some(outFile);
    };
  };
  if ((force || !$puck_1.Map.has.call(self.files, file.absolutePath))) {
    $puck_1.Map.set.call(self.files, file.absolutePath, file);
    if (!file.puck) {
      file.puck = $unwrapTraitObject(fs.readFileSync(file.absolutePath, {encoding: "utf-8"}));
    };
    file.ast = $puck_1.Some(parseString(self, file, recoverFromSyntaxErrors));
    self.onFileParsed(file);
    let $puck_29 = $puck_1.Map.get.call(self.deferred, file.absolutePath);
    if ($puck_29 !== undefined) {
      let callbacks = $puck_29;
      $puck_1.Map._delete.call(self.deferred, file.absolutePath);
      callbacks.forEach(function (callback) {
        return callback();
      });
    };
    return file;
  }
  else {
    return $puck_1.Index["$impl_Index$lib/stdlib/core.puck:Map"].index.call({type: '$impl_Index$lib/stdlib/core.puck:Map', value: self.files, $isTraitObject: true}, file.absolutePath);
  };
};
CompilerContext.reportError = function (file, token, error) {
  const self = this;
  self.onReportError(file, token, error);
};
function fileInspect(depth, opts) {
  const self = this;
  return $puck_3.inspect($puck_2._Object.assign({}, self, {
    puck: "[hidden]",
    ast: "[hidden]",
    js: "[hidden]",
    inspect: $puck_2._undefined,
  }), $puck_2._Object.assign({}, opts, {depth: opts.depth - depth}));
};
function parseString(context, file, recoverFromSyntaxErrors = false) {
  let ast = $puck_8.parse($puck_9.TokenStream._new($puck_7.InputStream._new(context, file)), file, recoverFromSyntaxErrors);
  let topLevelVisitor = $puck_14.TopLevelVisitor._new(context, file);
  $puck_4.EmptyVisitor["$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/top_level_visitor.puck:TopLevelVisitor"].visitModule.call({type: '$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/top_level_visitor.puck:TopLevelVisitor', value: topLevelVisitor, $isTraitObject: true}, ast);
  $puck_4.EmptyVisitor["$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/import_visitor.puck:ImportVisitor"].visitModule.call({type: '$impl_lib/ast/empty_visitor.puck:EmptyVisitor$lib/typeck/import_visitor.puck:ImportVisitor', value: $puck_12.ImportVisitor._new(context, file, topLevelVisitor.declarations), $isTraitObject: true}, ast);
  return ast;
};
exports.parseString = parseString;
function compile(context, file) {
  return $unwrapTraitObject($puck_6.Emitter(context, file)).emitModule($puck_1.Option.unwrap.call(file.ast), file.isBin);
};
exports.compile = compile;
function babelTransform(file) {
  return $unwrapTraitObject(babel.transform($puck_1.Option.unwrap.call(file.js), {
    filename: file.absolutePath,
    presets: require.resolve("babel-preset-latest"),
    babelrc: false,
  }).code);
};
function dumpFiles(files, prop) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: files, $isTraitObject: true}, function (file) {
    $puck_1.print("");
    $puck_1.print(file.absolutePath);
    let $puck_30 = $puck_1.Unknown.asString.call(file[prop]);
    let $puck_31;
    if (($puck_30 !== undefined)) {
      let data = $puck_30;
      $puck_31 = data;
    }
    else {
      let $puck_32;
      if (true) {
        const None = $puck_30;
        $puck_32 = $puck_3.inspect(file[prop], {
          colors: false,
          depth: 25,
        });
      };
      $puck_31 = $puck_32;
    };
    const data = $puck_31;
    return $puck_1.print($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.String.split.call(data, "\n"), $isTraitObject: true}, function (line) {
      return "  " + line + "";
    }).value.join("\n"));
  });
};
function buildString(code, filePath, projectPath, options = {useBabel: false}) {
  return $puck_2.asResult(function () {
    function reportError(file, token, error) {
      const self = this;
      let {line: line, column: column} = $puck_5.ToSpan[token.type].span.call(token).start;
      return $puck_1.panic($puck_2.Error($puck_16.CompilationError.message.call(error) + "\n  in " + file.absolutePath + " (" + line + ":" + column + ")"));
    };
    let context = CompilerContext._new(projectPath, reportError);
    let file = CompilerContext.importFile.call(context, {
      isBin: false,
      fileName: $unwrapTraitObject(path.basename(filePath)),
      absolutePath: $unwrapTraitObject(fs.realpathSync(path.resolve(path.normalize(filePath)))),
      puck: code,
      outFile: $puck_1.None,
      ast: $puck_1.None,
      js: $puck_1.None,
    });
    CompilerContext.runTypeVisitor.call(context);
    CompilerContext.runImplVisitor.call(context);
    CompilerContext.runChecker.call(context);
    file.js = $puck_1.Some(compile(context, file));
    if (options.useBabel) {
      file.js = $puck_1.Some(babelTransform(file));
    };
    return file;
  });
};
exports.buildString = buildString;
function build(files, context, options = {
  dump: "",
  useBabel: false,
}) {
  const dump = options.dump;
  files = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: files, $isTraitObject: true}, function (f) {
    const fileName = $unwrapTraitObject(path.basename(f.file));
    const absolutePath = $unwrapTraitObject(fs.realpathSync(path.resolve(path.normalize(f.file))));
    const outFile = $puck_1.Some($unwrapTraitObject(path.normalize(f.outFile)));
    return {
      isBin: f.isBin,
      fileName: fileName,
      absolutePath: absolutePath,
      outFile: outFile,
      inspect: fileInspect,
      puck: "",
      ast: $puck_1.None,
      js: $puck_1.None,
    };
  });
  let $puck_33 = $puck_1.Iterable[files.type].map.call(files, function (f) {
    return CompilerContext.importFile.call(context, f);
  })
;
  files = $puck_1.Iterable[$puck_33.type].toList.call($puck_33);
  if ((dump === "ast")) {
    dumpFiles(files, "ast");
    return $puck_2._undefined;
  };
  CompilerContext.runTypeVisitor.call(context);
  if (dump === "typed-ast") {
    dumpFiles(files, "ast");
    return $puck_2._undefined;
  };
  CompilerContext.runImplVisitor.call(context);
  if (dump === "impl-ast") {
    dumpFiles(files, "ast");
    return $puck_2._undefined;
  };
  CompilerContext.runChecker.call(context);
  if (dump === "checked-ast") {
    dumpFiles(files, "ast");
    return $puck_2._undefined;
  };
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: files, $isTraitObject: true}, function (file) {
    return file.js = $puck_1.Some(compile(context, file));
  });
  if (dump === "js") {
    dumpFiles(files, "js");
    return $puck_2._undefined;
  };
  if (options.useBabel) {
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: files, $isTraitObject: true}, function (file) {
      return file.js = $puck_1.Some(babelTransform(file));
    });
  };
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: files, $isTraitObject: true}, function (f) {
    const outFile = $puck_1.Option.unwrap.call(f.outFile);
    const outDir = path.dirname(outFile);
    $puck_10.cmd("mkdir -p " + outDir + "");
    const code = $puck_1.Option.unwrap.call(f.js);
    return fs.writeFileSync("" + outFile + "", "" + code + "\n", {mode: $puck_1.Result.unwrap.call($puck_1.Num.parseInt("777", $puck_1.Radix.Octal))});
  });
};
exports.build = build
