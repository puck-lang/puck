'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TokenStream = TokenStream;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _ast = require('./../ast/ast');

var _ast2 = require('./ast');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};
function TokenStream(input) {
  var current = _js._null;
  var currentDummy = _js._null;
  var inImport = false;
  var longestOperator = $unwrapTraitObject(_ast2.operators).reduce(function (longest, curr) {
    if ($unwrapTraitObject(curr).length > longest) {
      return $unwrapTraitObject(curr).length;
    } else {
      return longest;
    };
  }, 0);
  function tryParseOperator() {
    var length = 0;
    var searchString = "";
    var found = void 0;
    while (length < longestOperator) {
      var ch = $unwrapTraitObject(input).peek(length);
      if (isWhitespaceOrNewline(ch)) {
        break;
      };
      searchString += ch;
      var hasMatches = $unwrapTraitObject($unwrapTraitObject(_ast2.operators).filter(function (token) {
        if ($unwrapTraitObject(token).length < length) {
          return false;
        } else {
          return $unwrapTraitObject(token).substr(0, length + 1) == searchString;
        };
      })).length > 0;
      if (hasMatches) {
        length += 1;
        found = searchString;
      } else {
        break;
      };
    };
    if ($unwrapTraitObject(_ast2.textToToken)[$unwrapTraitObject(found)]) {
      var i = 0;
      while (i < length) {
        $unwrapTraitObject(input).next();
        i += 1;
      };
      return { kind: $unwrapTraitObject(_ast2.textToToken)[$unwrapTraitObject(found)] };
    };
  };
  function isDigit(ch) {
    return $unwrapTraitObject((0, _js.RegExp)("[0-9]")).test(ch);
  };
  function isIdStart(ch) {
    return $unwrapTraitObject((0, _js.RegExp)("[a-z_]", "i")).test(ch);
  };
  function isId(ch) {
    return isIdStart(ch) || isDigit(ch);
  };
  function isNewline(ch) {
    return ch == "\n";
  };
  function isWhitespace(ch) {
    return " \t".indexOf(ch) >= 0;
  };
  function isWhitespaceOrNewline(ch) {
    return isNewline(ch) || isWhitespace(ch);
  };
  function readWhile(predicate) {
    var str = "";
    while (!$unwrapTraitObject(input).eof() && predicate($unwrapTraitObject(input).peek())) {
      str += $unwrapTraitObject(input).next();
    };
    return str;
  };
  function readNumber() {
    var hasDot = false;
    var number = readWhile(function (ch) {
      if (ch == ".") {
        if (hasDot || !isDigit($unwrapTraitObject(input).peek(1))) {
          return false;
        } else {
          hasDot = true;
          return true;
        };
      } else {
        return isDigit(ch);
      };
    });
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).NumberLiteral,
      value: $unwrapTraitObject(_js.global).parseFloat(number)
    };
  };
  function readIdent() {
    var id = readWhile(isId);
    if (id == "import") {
      inImport = true;
      return { kind: $unwrapTraitObject(_ast2.SyntaxKind).ImportKeyword };
    } else {
      if (id == "as") {
        inImport = false;
        return { kind: $unwrapTraitObject(_ast2.SyntaxKind).AsKeyword };
      } else {
        if ($unwrapTraitObject(_ast2.textToToken)[id] != _js._undefined) {
          return { kind: $unwrapTraitObject(_ast2.textToToken)[id] };
        } else {
          return {
            kind: $unwrapTraitObject(_ast2.SyntaxKind).Identifier,
            name: id
          };
        };
      };
    };
  };
  function readString() {
    var escaped = false;
    var parts = [];
    var str = "";
    var delimiter = $unwrapTraitObject(input).next();
    while (!$unwrapTraitObject(input).eof()) {
      var ch = $unwrapTraitObject(input).next();
      if (escaped) {
        if (ch == "$") {
          str += "$";
        } else {
          if (ch == "n") {
            str += "\n";
          } else {
            if (ch == "r") {
              str += "\r";
            } else {
              if (ch == "t") {
                str += "\t";
              } else {
                if (ch == "'") {
                  str += "'";
                } else {
                  if (ch == "\"") {
                    str += "\"";
                  } else {
                    if (ch == "\\") {
                      str += "\\";
                    } else {
                      if (ch == "\n") {
                        _js._null;
                      } else {
                        $unwrapTraitObject(input).croak("Invalid escape character " + ch + "");
                      };
                    };
                  };
                };
              };
            };
          };
        };
        escaped = false;
      } else {
        if (ch == "\\") {
          escaped = true;
        } else {
          if (ch == "$" && isIdStart($unwrapTraitObject(input).peek()) && !inImport) {
            parts.push({
              kind: $unwrapTraitObject(_ast2.SyntaxKind).StringLiteralPart,
              value: str
            });
            parts.push(readIdent());
            str = "";
          } else {
            if (ch == delimiter) {
              break;
            } else {
              str += ch;
            };
          };
        };
      };
    };
    parts.push({
      kind: $unwrapTraitObject(_ast2.SyntaxKind).StringLiteralPart,
      value: str
    });
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).StringLiteral,
      parts: parts
    };
  };
  function readComment() {
    $unwrapTraitObject(input).next();
    $unwrapTraitObject(input).next();
    readWhile(isWhitespace);
    var comment = readWhile(function (ch) {
      return ch != "\n";
    });
    $unwrapTraitObject(input).next();
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).Comment,
      text: comment
    };
  };
  function readNext() {
    readWhile(isWhitespace);
    if ($unwrapTraitObject(input).eof()) {
      return _js._null;
    };
    var ch = $unwrapTraitObject(input).peek();
    if (isNewline(ch)) {
      $unwrapTraitObject(input).next();
      return { kind: $unwrapTraitObject(_ast2.SyntaxKind).NewlineToken };
    };
    if (ch == "/" && $unwrapTraitObject(input).peek(1) == "/") {
      return readComment();
    };
    if (ch == "'" || ch == "\"") {
      return readString();
    };
    if (isDigit(ch)) {
      return readNumber();
    };
    if (isIdStart(ch)) {
      return readIdent();
    };
    var operator = tryParseOperator();
    if (!operator) {
      $unwrapTraitObject(input).croak("Unexpected token: " + ch + "");
    };
    return operator;
  };
  function isDummy(token) {
    if (!token) {
      return false;
    };
    return $unwrapTraitObject(token).kind == $unwrapTraitObject(_ast2.SyntaxKind).NewlineToken || $unwrapTraitObject(token).kind == $unwrapTraitObject(_ast2.SyntaxKind).Comment;
  };
  function peek() {
    var returnDummy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (returnDummy && currentDummy) {
      return currentDummy;
    };
    if (current && !isDummy(current) || returnDummy) {
      return current;
    };
    current = readNext();
    currentDummy = current;
    while (!returnDummy && isDummy(current)) {
      current = readNext();
    };
    return current;
  };
  function next(returnDummy) {
    if (currentDummy) {
      var _token = currentDummy;
      currentDummy = _js._null;
      if (returnDummy) {
        return _token;
      };
    };
    if (current) {
      var _token2 = current;
      current = _js._null;
      if (returnDummy || !isDummy(_token2)) {
        return _token2;
      };
    };
    var token = readNext();
    while (isDummy(token) && !returnDummy) {
      token = readNext();
    };
    return token;
  };
  function eof() {
    return peek() == _js._null;
  };
  return {
    next: next,
    peek: peek,
    eof: eof,
    croak: $unwrapTraitObject(input).croak,
    file: $unwrapTraitObject(input).file
  };
}
