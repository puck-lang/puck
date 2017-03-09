'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.WorkspaceEdit = exports.TextDocumentEdit = exports.LsPosition = exports.TextEdit = exports.Diagnostic = exports.Command = exports.CodeActionContext = exports.fromUri = exports.toUri = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
var WorkspaceEdit = exports.WorkspaceEdit = (object) => object;
var TextDocumentEdit = exports.TextDocumentEdit = (object) => object;
var LsPosition = exports.LsPosition = (object) => object;
var TextEdit = exports.TextEdit = (object) => object;
var Diagnostic = exports.Diagnostic = (object) => object;
var Command = exports.Command = (object) => object;
var CodeActionContext = exports.CodeActionContext = (object) => object;
function fromUri(uri) {
  if ($puck_1.String.startsWith.call(uri, "file://")) {
    return $unwrapTraitObject($puck_2._global).decodeURIComponent($puck_1.String.sub.call(uri, $puck_1.Range._new(7, $puck_1.String.size.call(uri))));
  }
  else {
    return $puck_1.panic("Only file URIs are supported");
  };
};
exports.fromUri = fromUri;
function toUri(path) {
  return "file://" + $unwrapTraitObject($puck_2._global).encodeURI(path);
};
exports.toUri = toUri
