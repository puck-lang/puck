#!/usr/bin/env node

'use strict';

var isIdentifier = require("./ast").isIdentifier;
var operators = require("./ast").operators;
var textToToken = require("./ast").textToToken;
var SyntaxKind = require("./ast").SyntaxKind;
var NULL = require("./ast").NULL;
function TokenStream(input) {
  var current = null;
  var currentNewline = null;
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
      {
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
      }
    };
    if (textToToken[found]) {
      var i = 0;
      while (i < length) {
        {
          input.next();
          i += 1;
        }
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
        if (hasDot) {
          return false;
        } else {
          hasDot = true;
          return true;
        };
      };
      return isDigit(ch);
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
  function readEscaped(end) {
    var escaped = false;
    var str = "";
    input.next();
    while (!input.eof()) {
      {
        var ch = input.next();
        if (escaped) {
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
                        input.croak("Invalid escape character " + ch);
                      }
                    }
                  }
                }
              }
            }
          };
          escaped = false;
        } else {
          if (ch == "\\") {
            escaped = true;
          } else {
            if (ch == end) {
              break;
            } else {
              str += ch;
            }
          }
        };
      }
    };
    return str;
  };
  function readString() {
    return {
      kind: SyntaxKind.StringLiteral,
      value: readEscaped(input.peek())
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
  function readNext(tokenizeNewline) {
    readWhile(isWhitespace);
    if (isNewline(input.peek())) {
      var _token = { kind: SyntaxKind.NewlineToken };
      if (tokenizeNewline) {
        return _token;
      } else {
        currentNewline = _token;
      };
    } else {
      currentNewline = null;
    };
    readWhile(isWhitespaceOrNewline);
    if (input.eof()) {
      return null;
    };
    var ch = input.peek();
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
      input.croak("Unexpected token: ${ch}");
    };
    return token;
  };
  function peek(tokenizeNewline) {
    if (tokenizeNewline && currentNewline) {
      return currentNewline;
    };
    if (current) {
      return current;
    };
    var token = readNext(tokenizeNewline);
    if (tokenizeNewline && token.kind == SyntaxKind.NewlineToken) {
      return currentNewline = token;
    } else {
      return current = token;
    };
  };
  function next(tokenizeNewline) {
    var token = current;
    if (tokenizeNewline && currentNewline) {
      token = currentNewline;
      currentNewline = null;
      return token;
    };
    current = null;
    return token || readNext(tokenizeNewline);
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
