#!/usr/bin/env node

'use strict';

var isIdentifier = require("./ast").isIdentifier;
var operators = require("./ast").operators;
var textToToken = require("./ast").textToToken;
var SyntaxKind = require("./ast").SyntaxKind;
var NULL = require("./ast").NULL;
function TokenStream(input) {
  var current = null;
  var currentDummy = null;
  var longestOperator = operators.reduce(function (longest, curr) {
    if (curr.length > longest) {
      return curr.length;
    } else {
      return longest;
    };
  }, 0);
  function tryParseToken() {
    var length = 0;
    var searchString = "";
    var found = void 0;
    while (length < longestOperator) {
      var ch = input.peek(length);
      if (isWhitespaceOrNewline(ch)) {
        break;
      };
      searchString += ch;
      var hasMatches = operators.filter(function (token) {
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
    if (textToToken[found]) {
      var i = 0;
      while (i < length) {
        input.next();
        i += 1;
      };
      return { kind: textToToken[found] };
    };
  };
  function isDigit(ch) {
    return RegExp("[0-9]").test(ch);
  };
  function isIdStart(ch) {
    return RegExp("[a-z_]", "i").test(ch);
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
      kind: SyntaxKind.NumberLiteral,
      value: parseFloat(number)
    };
  };
  function readIdent() {
    var id = readWhile(isId);
    if (textToToken[id] != undefined) {
      return { kind: textToToken[id] };
    } else {
      return {
        kind: SyntaxKind.Identifier,
        name: id
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
                        null;
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
          if (ch == "$" && isIdStart(input.peek())) {
            parts.push({
              kind: SyntaxKind.StringLiteralPart,
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
      kind: SyntaxKind.StringLiteralPart,
      value: str
    });
    return {
      kind: SyntaxKind.StringLiteral,
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
      kind: SyntaxKind.Comment,
      text: comment
    };
  };
  function readNext() {
    readWhile(isWhitespace);
    if (input.eof()) {
      return null;
    };
    var ch = input.peek();
    if (isNewline(ch)) {
      input.next();
      return { kind: SyntaxKind.NewlineToken };
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
    var token = tryParseToken();
    if (!token) {
      input.croak("Unexpected token: " + ch + "");
    };
    return token;
  };
  function isDummy(token) {
    if (!token) {
      return false;
    };
    return token.kind == SyntaxKind.NewlineToken || token.kind == SyntaxKind.Comment;
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
      currentDummy = null;
      if (returnDummy) {
        return _token;
      };
    };
    if (current) {
      var _token2 = current;
      current = null;
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
    return peek() == null;
  };
  return {
    next: next,
    peek: peek,
    eof: eof,
    croak: input.croak
  };
};
module.exports.TokenStream = TokenStream;
