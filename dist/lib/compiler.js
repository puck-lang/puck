'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.parseString = exports.compile = exports.createContext = exports.buildString = exports.buildundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const babel = require("babel-core");
const fs = require("fs");
const path = require("path");
const $puck_3 = require("util");
const $puck_4 = require("./ast/span");
const $puck_5 = require("./compiler/emitter");
const $puck_6 = require("./compiler/input_stream");
const $puck_7 = require("./compiler/parser");
const $puck_8 = require("./compiler/token_stream");
const $puck_9 = require("./helpers");
const $puck_10 = require("./typeck/impl_visitor");
const $puck_11 = require("./typeck/import_visitor");
const $puck_12 = require("./typeck/scope_visitor");
const $puck_13 = require("./typeck/top_level_visitor");
const $puck_14 = require("./typeck/type_visitor");
const $puck_15 = require("./entities");
function fileInspect(depth, opts) {
  const self = this;
  return $puck_3.inspect($puck_2._Object.assign({}, self, {
    puck: "[hidden]",
    ast: "[hidden]",
    js: "[hidden]",
    inspect: $puck_2._undefined,
  }), $puck_2._Object.assign({}, opts, {depth: $unwrapTraitObject(opts).depth - depth}));
};
function parseString(context, file, recoverFromSyntaxErrors = false) {
  let ast = $puck_7.parse($puck_8.TokenStream._new($puck_6.InputStream._new(context, file)), file, recoverFromSyntaxErrors);
  $puck_13.TopLevelVisitor(context, file).visitModule(ast);
  $puck_11.ImportVisitor(context, file).visitModule(ast);
  return ast;
};
exports.parseString = parseString;
function compile(context, file) {
  return $unwrapTraitObject($puck_5.Emitter(context, file)).emitModule(file.ast, file.isBin);
};
exports.compile = compile;
function babelTransform(file) {
  return $unwrapTraitObject(babel.transform($unwrapTraitObject(file).js, {
    filename: $unwrapTraitObject(file).absolutePath,
    presets: $puck_2._require.resolve("babel-preset-latest"),
    babelrc: false,
  }).code);
};
function dumpFiles(files, prop) {
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: files, $isTraitObject: true}, function (file) {
    $puck_1.print("");
    $puck_1.print(file.absolutePath);
    let $puck_16 = $puck_1.Unknown.asString.call(file[prop]);
    let $puck_17;
    if (($unwrapTraitObject($puck_16).kind == "Some")) {
      let {value: [data]} = $unwrapTraitObject($puck_16);
      $puck_17 = data;
    }
    else {
      let $puck_18;
      if (true) {
        const None = $puck_16;
        $puck_18 = $puck_3.inspect(file[prop], {
          colors: false,
          depth: 25,
        });
      };
      $puck_17 = $puck_18;
    };
    const data = $puck_17;
    return $puck_1.print($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.String.split.call(data, "\n"), $isTraitObject: true}, function (line) {
      return "  " + line + "";
    }).value.join("\n"));
  });
};
function createContext(projectPath, ignoreErrors = false) {
  return {
    projectPath: projectPath,
    impls: $puck_1.ObjectMap._new(),
    files: $puck_1.ObjectMap._new(),
    deferred: $puck_1.ObjectMap._new(),
    runTypeVisitor: function () {
    const self = this;
    const keys = $unwrapTraitObject($puck_2._Object.keys($unwrapTraitObject(self).files));
    let $puck_19 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: keys, $isTraitObject: true}, function (path) {
      return $unwrapTraitObject($unwrapTraitObject(self).files)[path];
    })
;
    return $puck_1.Iterable[$puck_19.type].forEach.call($puck_19, function (file) {
      if ((!file.typeVisitorStarted && file.ast)) {
        file.typeVisitorStarted = true;
        $puck_14.TypeVisitor(self, file).visitModule(file.ast);
        return file.typeVisitorCompleted = true;
      };
    });
  },
    runImplVisitor: function () {
    let self = this;
    const keys = $unwrapTraitObject($puck_2._Object.keys($unwrapTraitObject(self).files));
    let $puck_20 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: keys, $isTraitObject: true}, function (path) {
      return $unwrapTraitObject($unwrapTraitObject(self).files)[path];
    })
;
    return $puck_1.Iterable[$puck_20.type].forEach.call($puck_20, function (file) {
      if ((!file.implVisitorStarted && file.ast)) {
        file.implVisitorStarted = true;
        return $puck_10.ImplVisitor(self, file).visitModule(file.ast);
      };
    });
  },
    runChecker: function () {
    const self = this;
    const keys = $unwrapTraitObject($puck_2._Object.keys($unwrapTraitObject(self).files));
    let $puck_21 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].map.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: keys, $isTraitObject: true}, function (path) {
      return $unwrapTraitObject($unwrapTraitObject(self).files)[path];
    })
;
    return $puck_1.Iterable[$puck_21.type].forEach.call($puck_21, function (file) {
      if ((!file.scopeVisitorStarted && file.ast)) {
        file.scopeVisitorStarted = true;
        return $puck_12.ScopeVisitor(self, file).visitModule(file.ast);
      };
    });
  },
    runTypeVisitorOnFile: function (file) {
    const self = this;
    if (!$unwrapTraitObject(file).typeVisitorCompleted) {
      if ($unwrapTraitObject(file).typeVisitorStarted) {
        throw "Circular import??";
      };
      $unwrapTraitObject(file).typeVisitorStarted = true;
      $puck_14.TypeVisitor(self, file).visitModule($unwrapTraitObject(file).ast);
      return $unwrapTraitObject(file).typeVisitorCompleted = true;
    };
  },
    runImplVisitorOnFile: function (file) {
    let self = this;
    if (!$unwrapTraitObject(file).typeVisitorStarted) {
      $unwrapTraitObject(self).runTypeVisitorOnFile(file);
    };
    if ($unwrapTraitObject(file).implVisitorStarted) {
      throw $puck_2.Error("runImplVisitorOnFile??");
    };
    $unwrapTraitObject(file).implVisitorStarted = true;
    return $puck_10.ImplVisitor(self, file).visitModule($unwrapTraitObject(file).ast);
  },
    runCheckerOnFile: function (file) {
    const self = this;
    if (!$unwrapTraitObject(file).implVisitorStarted) {
      $unwrapTraitObject(self).runImplVisitorOnFile(file);
    };
    if (!$unwrapTraitObject(file).scopeVisitorStarted) {
      $unwrapTraitObject(file).scopeVisitorStarted = true;
      return $puck_12.ScopeVisitor(self, file).visitModule($unwrapTraitObject(file).ast);
    };
  },
    defer: function (file, func) {
    let self = this;
    if (!$unwrapTraitObject($unwrapTraitObject(self).deferred)[$unwrapTraitObject($unwrapTraitObject(file).absolutePath)]) {
      $unwrapTraitObject($unwrapTraitObject(self).deferred)[$unwrapTraitObject($unwrapTraitObject(file).absolutePath)] = [];
    };
    return $unwrapTraitObject($unwrapTraitObject(self).deferred)[$unwrapTraitObject($unwrapTraitObject(file).absolutePath)].push(func);
  },
    resolvePath: function (file, relativeTo) {
    let $puck_22;
    if ($unwrapTraitObject(file).substring(0, 1) == "/") {
      $puck_22 = file;
    }
    else {
      $puck_22 = path.join(path.dirname($unwrapTraitObject(relativeTo).absolutePath), file);
    };
    const filePath = $puck_22;
    const absolutePath = $unwrapTraitObject(fs.realpathSync(path.resolve(path.normalize(filePath))));
    const fileName = path.basename(absolutePath);
    return {
      absolutePath: absolutePath,
      fileName: fileName,
      inspect: fileInspect,
    };
  },
    importFile: function (file, force = false, recoverFromSyntaxErrors = false) {
    let self = this;
    if (($unwrapTraitObject($unwrapTraitObject(self).files)[file.absolutePath] && file.outDir && file.outFile)) {
      $unwrapTraitObject($unwrapTraitObject(self).files)[file.absolutePath].outDir = file.outDir;
      $unwrapTraitObject($unwrapTraitObject(self).files)[file.absolutePath].outFile = file.outFile;
    };
    if ((force || !$unwrapTraitObject($unwrapTraitObject(self).files)[file.absolutePath])) {
      $unwrapTraitObject($unwrapTraitObject(self).files)[file.absolutePath] = file;
      if (!file.puck) {
        file.puck = $unwrapTraitObject(fs.readFileSync(file.absolutePath, {encoding: "utf-8"}));
      };
      file.ast = parseString(self, file, recoverFromSyntaxErrors);
      if ($unwrapTraitObject($unwrapTraitObject(self).deferred)[file.absolutePath]) {
        const callbacks = $unwrapTraitObject($unwrapTraitObject(self).deferred)[file.absolutePath];
        $unwrapTraitObject($unwrapTraitObject(self).deferred)[file.absolutePath] = $unwrapTraitObject($puck_2._undefined);
        callbacks.forEach(function (callback) {
          return callback();
        });
      };
    };
    return $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(self).files)[file.absolutePath]);
  },
    reportError: function (file, token, message) {
    const self = this;
    if (!ignoreErrors) {
      let {line: line, column: column} = $puck_4.ToSpan[token.type].span.call(token).start;
      throw $puck_2.Error("" + message + "\n  in " + file.absolutePath + " (" + line + ":" + column + ")");
    };
  },
  };
};
exports.createContext = createContext;
function buildString(code, filePath, projectPath, options = {useBabel: false}) {
  return $puck_2.asResult(function () {
    let context = createContext(projectPath);
    let file = context.importFile({
      isBin: false,
      fileName: $unwrapTraitObject(path.basename(filePath)),
      absolutePath: $unwrapTraitObject(fs.realpathSync(path.resolve(path.normalize(filePath)))),
      puck: code,
    });
    context.runTypeVisitor();
    context.runImplVisitor();
    context.runChecker();
    file.js = compile(context, file);
    if (options.useBabel) {
      file.js = babelTransform(file);
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
    const outFile = path.normalize(f.outFile);
    const outDir = path.dirname(outFile);
    return {
      isBin: f.isBin,
      absolutePath: absolutePath,
      outFile: outFile,
      outDir: outDir,
      inspect: fileInspect,
    };
  });
  let $puck_23 = $puck_1.Iterable[files.type].map.call(files, function (f) {
    return $unwrapTraitObject(context).importFile(f);
  })
;
  files = $puck_1.Iterable[$puck_23.type].toList.call($puck_23);
  if ((dump == "ast")) {
    dumpFiles(files, "ast");
    return $puck_2._undefined;
  };
  $unwrapTraitObject(context).runTypeVisitor();
  if (dump == "typed-ast") {
    dumpFiles(files, "ast");
    return $puck_2._undefined;
  };
  $unwrapTraitObject(context).runImplVisitor();
  if (dump == "impl-ast") {
    dumpFiles(files, "ast");
    return $puck_2._undefined;
  };
  $unwrapTraitObject(context).runChecker();
  if (dump == "checked-ast") {
    dumpFiles(files, "ast");
    return $puck_2._undefined;
  };
  $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: files, $isTraitObject: true}, function (file) {
    return file.js = compile(context, file);
  });
  if (dump == "js") {
    dumpFiles(files, "js");
    return $puck_2._undefined;
  };
  if (options.useBabel) {
    $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: files, $isTraitObject: true}, function (file) {
      return file.js = babelTransform(file);
    });
  };
  return $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].forEach.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: files, $isTraitObject: true}, function (f) {
    const outDir = f.outDir;
    const outFile = f.outFile;
    $puck_9.cmd("mkdir -p " + outDir + "");
    return fs.writeFileSync("" + outFile + "", f.js + "\n", {mode: $puck_1.Result.unwrap.call($puck_1.Num.parseInt("777", $puck_1.Radix.Octal))});
  });
};
exports.build = build
