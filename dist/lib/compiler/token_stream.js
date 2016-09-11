#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TokenStream = TokenStream;

var _ast = require('././ast');

var _js = require('./../stdlib/js');

function TokenStream(input) {
  var current = _js._null;
  var currentDummy = _js._null;
  var inImport = false;
  var longestOperator = _ast.operators.reduce(function (longest, curr) {
    if (curr.length > longest) {
      return curr.length;
    } else {
      return longest;
    };
  }, 0);
  function tryParseOperator() {
    var length = 0;
    var searchString = "";
    var found = void 0;
    while (length < longestOperator) {
      var ch = input.peek(length);
      if (isWhitespaceOrNewline(ch)) {
        break;
      };
      searchString += ch;
      var hasMatches = _ast.operators.filter(function (token) {
        if (token.length < length) {
          return false;
        } else {
          return token.substr(0, length + 1) == searchString;
        };
      }).length > 0;
      if (hasMatches) {
        length += 1;
        found = searchString;
      } else {
        break;
      };
    };
    if (_ast.textToToken[found]) {
      var i = 0;
      while (i < length) {
        input.next();
        i += 1;
      };
      return { kind: _ast.textToToken[found] };
    };
  };
  function isDigit(ch) {
    return (0, _js.RegExp)("[0-9]").test(ch);
  };
  function isIdStart(ch) {
    return (0, _js.RegExp)("[a-z_]", "i").test(ch);
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
    while (!input.eof() && predicate(input.peek())) {
      str += input.next();
    };
    return str;
  };
  function readNumber() {
    var hasDot = false;
    var number = readWhile(function (ch) {
      if (ch == ".") {
        if (hasDot || !isDigit(input.peek(1))) {
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
      kind: _ast.SyntaxKind.NumberLiteral,
      value: _js.global.parseFloat(number)
    };
  };
  function readIdent() {
    var id = readWhile(isId);
    if (id == "import") {
      inImport = true;
      return { kind: _ast.SyntaxKind.ImportKeyword };
    } else {
      if (id == "as") {
        inImport = false;
        return { kind: _ast.SyntaxKind.AsKeyword };
      } else {
        if (_ast.textToToken[id] != _js._undefined) {
          return { kind: _ast.textToToken[id] };
        } else {
          return {
            kind: _ast.SyntaxKind.Identifier,
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
    var delimiter = input.next();
    while (!input.eof()) {
      var ch = input.next();
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
                        input.croak("Invalid escape character " + ch + "");
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
          if (ch == "$" && isIdStart(input.peek()) && !inImport) {
            parts.push({
              kind: _ast.SyntaxKind.StringLiteralPart,
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
      kind: _ast.SyntaxKind.StringLiteralPart,
      value: str
    });
    return {
      kind: _ast.SyntaxKind.StringLiteral,
      parts: parts
    };
  };
  function readComment() {
    input.next();
    input.next();
    readWhile(isWhitespace);
    var comment = readWhile(function (ch) {
      return ch != "\n";
    });
    input.next();
    return {
      kind: _ast.SyntaxKind.Comment,
      text: comment
    };
  };
  function readNext() {
    readWhile(isWhitespace);
    if (input.eof()) {
      return _js._null;
    };
    var ch = input.peek();
    if (isNewline(ch)) {
      input.next();
      return { kind: _ast.SyntaxKind.NewlineToken };
    };
    if (ch == "/" && input.peek(1) == "/") {
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
      input.croak("Unexpected token: " + ch + "");
    };
    return operator;
  };
  function isDummy(token) {
    if (!token) {
      return false;
    };
    return token.kind == _ast.SyntaxKind.NewlineToken || token.kind == _ast.SyntaxKind.Comment;
  };
  function peek(returnDummy) {
    if (returnDummy && currentDummy) {
      return currentDummy;
    };
    if (current) {
      if (returnDummy || !isDummy(current)) {
        return current;
      };
    };
    current = readNext();
    currentDummy = current;
    while (isDummy(current) && !returnDummy) {
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
    croak: input.croak
  };
}
