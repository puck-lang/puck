#!/usr/bin/env node

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var isIdentifier = require("./ast").isIdentifier;
var isIndex = require("./ast").isIndex;
var isMember = require("./ast").isMember;
var textToToken = require("./ast").textToToken;
var tokenToText = require("./ast").tokenToText;
var SyntaxKind = require("./ast").SyntaxKind;
var precedence = require("./ast").precedence;
function parse(input) {
  function isToken(kind, peekDistance) {
    var token = input.peek(false, peekDistance);
    return token && token.kind == kind;
  };
  function tokenName(token) {
    if (typeof tokenToText[token.kind] == "function") {
      return tokenToText[token.kind](token);
    } else {
      if (tokenToText[token.kind]) {
        return tokenToText[token.kind];
      } else {
        return SyntaxKind[token.kind];
      };
    };
  };
  function expect(expect) {
    var name = arguments.length <= 1 || arguments[1] === undefined ? "token" : arguments[1];

    if (!isToken(expect)) {
      var token = input.peek();
      var expectedText = ": \"" + tokenName({ kind: expect }) + "\"";
      var __PUCK__value__1 = void 0;
      if (token) {
        var got = tokenName(token);
        __PUCK__value__1 = "got \"" + got + "\"";
      } else {
        __PUCK__value__1 = "reached end of file";
      };
      var but = __PUCK__value__1;
      console.error(token);
      return input.croak("Expected " + name + "" + expectedText + ", but " + but + "");
    };
  };
  function consumeToken(token) {
    expect(token);
    return input.next();
  };
  function skipKeyword(kw) {
    expect(kw, "keyword");
    return input.next();
  };
  function unexpected() {
    var token = input.peek();
    console.error("token", token, typeof token === "undefined" ? "undefined" : _typeof(token));
    var name = tokenToText[token.kind];
    return input.croak("Unexpected token: " + name + "");
  };
  function consumeSeparator(kind) {
    if (!input.eof()) {
      var token = input.peek(true);
      if (token.kind == SyntaxKind.NewlineToken || token.kind == SyntaxKind.Comment) {
        return input.next(true);
      } else {
        return consumeToken(kind);
      };
    };
  };
  function isAssignment(token) {
    if (!token) {
      return undefined;
    };
    return token.kind == SyntaxKind.EqualsToken || token.kind == SyntaxKind.PlusEqualsToken || token.kind == SyntaxKind.MinusEqualsToken || token.kind == SyntaxKind.AsteriskEqualsToken || token.kind == SyntaxKind.AsteriskAsteriskEqualsToken || token.kind == SyntaxKind.SlashEqualsToken || token.kind == SyntaxKind.PercentEqualsToken;
  };
  function maybeParseOperator() {
    if (isAssignment(input.peek()) || isToken(SyntaxKind.EqualsEqualsToken) || isToken(SyntaxKind.ExclamationEqualsToken) || isToken(SyntaxKind.GreaterThanToken) || isToken(SyntaxKind.GreaterThanEqualsToken) || isToken(SyntaxKind.LessThanToken) || isToken(SyntaxKind.LessThanEqualsToken) || isToken(SyntaxKind.PlusToken) || isToken(SyntaxKind.MinusToken) || isToken(SyntaxKind.AsteriskToken) || isToken(SyntaxKind.AsteriskAsteriskToken) || isToken(SyntaxKind.SlashToken) || isToken(SyntaxKind.PercentToken) || isToken(SyntaxKind.AndKeyword) || isToken(SyntaxKind.OrKeyword) || isToken(SyntaxKind.NotKeyword)) {
      return input.peek();
    } else {
      return null;
    };
  };
  function maybeBinary(left, myprecedence) {
    var operator = maybeParseOperator();
    if (operator) {
      var hisprecedence = precedence[operator.kind];
      if (hisprecedence == undefined) {
        var name = tokenToText[operator.kind];
        var json = JSON.stringify(operator);
        throw "No precedence for " + name + ": " + json + "";
      };
      if (hisprecedence > myprecedence) {
        input.next();
        var e = void 0;
        var innerExpression = maybeBinary(parseAtom(), hisprecedence);
        if (isAssignment(operator)) {
          if (isIdentifier(left) || isMember(left) || isIndex(left)) {
            var a = {
              kind: SyntaxKind.AssignmentExpression,
              lhs: left,
              token: operator,
              rhs: innerExpression
            };
            e = a;
          } else {
            input.croak("Can only assign to an identifier");
          };
        } else {
          var b = {
            kind: SyntaxKind.BinaryExpression,
            lhs: left,
            operator: operator,
            rhs: innerExpression
          };
          e = b;
        };
        return maybeBinary(e, myprecedence);
      };
    };
    return left;
  };
  function maybeCall(expr) {
    if (isToken(SyntaxKind.OpenParenToken)) {
      return {
        kind: SyntaxKind.CallExpression,
        func: expr,
        openParen: input.peek(),
        argumentList: delimited("(", ")", ",", parseExpression),
        closeParen: input.peek()
      };
    } else {
      return expr;
    };
  };
  function maybeMemberAccess(token) {
    if (isToken(SyntaxKind.DotToken)) {
      input.next();
      expect(SyntaxKind.Identifier, "identifier");
      return {
        kind: SyntaxKind.MemberAccess,
        object: token,
        member: maybeMemberAccess(maybeCall(input.next()))
      };
    };
    if (isToken(SyntaxKind.OpenBracketToken)) {
      input.next();
      var index = parseExpression();
      consumeToken(SyntaxKind.CloseBracketToken);
      return maybeMemberAccess(maybeCall({
        kind: SyntaxKind.IndexAccess,
        object: token,
        index: index
      }));
    };
    return token;
  };
  function delimited(start, stop, separator, parser) {
    if (typeof start == "string") {
      start = textToToken[start];
    };
    if (typeof stop == "string") {
      stop = textToToken[stop];
    };
    if (typeof separator == "string") {
      separator = textToToken[separator];
    };
    var parts = [];
    var first = true;
    consumeToken(start);
    while (!input.eof()) {
      if (isToken(stop)) {
        break;
      };
      if (first) {
        first = false;
      } else {
        if (typeof separator == "function") {
          separator();
        } else {
          consumeSeparator(separator);
        };
      };
      var part = void 0;
      while (!part) {
        if (isToken(stop)) {
          break;
        };
        part = parser();
      };
      if (part) {
        parts.push(part);
      };
    };
    consumeToken(stop);
    return parts;
  };
  function parseTypeBound() {
    expect(SyntaxKind.Identifier, "identifier");
    var name = input.next();
    var __PUCK__value__2 = void 0;
    if (isToken(SyntaxKind.LessThanToken)) {
      __PUCK__value__2 = delimited("<", ">", ",", parseTypeBound);
    };
    var parameters = __PUCK__value__2;
    return {
      kind: SyntaxKind.TypeBound,
      name: name,
      parameters: parameters
    };
  };
  function parseVariableDeclaration() {
    var mutable = false;
    if (isToken(SyntaxKind.MutKeyword)) {
      input.next();
      mutable = true;
    };
    expect(SyntaxKind.Identifier, "identifier");
    var declaration = {
      kind: SyntaxKind.VariableDeclaration,
      identifier: input.next(),
      mutable: mutable
    };
    if (isToken(SyntaxKind.ColonToken)) {
      input.next();
      declaration.typeBound = parseTypeBound();
    };
    if (isToken(SyntaxKind.EqualsToken)) {
      input.next();
      declaration.initializer = parseExpression();
    };
    return declaration;
  };
  function parseFunction() {
    var __PUCK__value__3 = void 0;
    if (isToken(SyntaxKind.Identifier)) {
      __PUCK__value__3 = input.next();
    };
    var name = __PUCK__value__3;
    var parameterList = delimited("(", ")", ",", parseVariableDeclaration);
    var __PUCK__value__4 = void 0;
    if (isToken(SyntaxKind.ColonToken)) {
      input.next();
      __PUCK__value__4 = parseTypeBound();
    };
    var returnType = __PUCK__value__4;
    var __PUCK__value__5 = void 0;
    if (isToken(SyntaxKind.OpenBraceToken)) {
      __PUCK__value__5 = parseBlock();
    } else {
      skipKeyword(SyntaxKind.ThenKeyword);
      __PUCK__value__5 = {
        kind: SyntaxKind.Block,
        block: [parseExpression()]
      };
    };
    var body = __PUCK__value__5;
    return {
      kind: SyntaxKind.Function,
      name: name,
      parameterList: parameterList,
      returnType: returnType,
      body: body
    };
  };
  function parseLambda() {
    var parameterList = delimited("|", "|", ",", parseVariableDeclaration);
    var __PUCK__value__6 = void 0;
    if (isToken(SyntaxKind.OpenBraceToken)) {
      __PUCK__value__6 = parseBlock();
    } else {
      __PUCK__value__6 = {
        kind: SyntaxKind.Block,
        block: [parseExpression()]
      };
    };
    var body = __PUCK__value__6;
    return {
      kind: SyntaxKind.Function,
      parameterList: parameterList,
      body: body
    };
  };
  function parseIf() {
    skipKeyword(SyntaxKind.IfKeyword);
    var condition = parseExpression();
    var __PUCK__value__7 = void 0;
    if (isToken(SyntaxKind.OpenBraceToken)) {
      __PUCK__value__7 = parseBlock();
    } else {
      skipKeyword(SyntaxKind.ThenKeyword);
      __PUCK__value__7 = {
        kind: SyntaxKind.Block,
        block: [parseExpression()]
      };
    };
    var _then = __PUCK__value__7;
    var ret = {
      kind: SyntaxKind.IfExpression,
      condition: condition,
      _then: _then
    };
    if (isToken(SyntaxKind.ElseKeyword)) {
      input.next();
      var __PUCK__value__8 = void 0;
      if (isToken(SyntaxKind.OpenBraceToken)) {
        __PUCK__value__8 = parseBlock();
      } else {
        __PUCK__value__8 = {
          kind: SyntaxKind.Block,
          block: [parseExpression()]
        };
      };
      ret._else = __PUCK__value__8;
    };
    return ret;
  };
  function parseWhile() {
    skipKeyword(SyntaxKind.WhileKeyword);
    var condition = parseExpression();
    var __PUCK__value__9 = void 0;
    if (isToken(SyntaxKind.OpenBraceToken)) {
      __PUCK__value__9 = parseBlock();
    } else {
      skipKeyword(SyntaxKind.ThenKeyword);
      __PUCK__value__9 = {
        kind: SyntaxKind.Block,
        block: [parseExpression()]
      };
    };
    var body = __PUCK__value__9;
    return {
      kind: SyntaxKind.WhileExpression,
      condition: condition,
      body: body
    };
  };
  function parseArrayLiteral() {
    var members = delimited("[", "]", ",", parseExpression);
    return {
      kind: SyntaxKind.ArrayLiteral,
      members: members
    };
  };
  function parseObjectLiteralMember() {
    var name = consumeToken(SyntaxKind.Identifier);
    var __PUCK__value__10 = void 0;
    if (isToken(SyntaxKind.ColonToken)) {
      input.next();
      __PUCK__value__10 = parseExpression();
    } else {
      __PUCK__value__10 = name;
    };
    var value = __PUCK__value__10;
    return {
      kind: SyntaxKind.ObjectLiteralMember,
      name: name,
      value: value
    };
  };
  function parseObjectLiteral() {
    var members = delimited("{", "}", ",", parseObjectLiteralMember);
    return {
      kind: SyntaxKind.ObjectLiteral,
      members: members
    };
  };
  function parseAtom() {
    return maybeCall(function innerParseAtom() {
      if (isToken(SyntaxKind.OpenParenToken)) {
        input.next();
        var exp = parseExpression();
        consumeToken(SyntaxKind.CloseParenToken);
        return exp;
      } else {
        if (isToken(SyntaxKind.OpenBracketToken)) {
          return parseArrayLiteral();
        } else {
          if (isToken(SyntaxKind.OpenBraceToken)) {
            return parseObjectLiteral();
          } else {
            if (isToken(SyntaxKind.BarToken)) {
              return parseLambda();
            } else {
              if (isToken(SyntaxKind.IfKeyword)) {
                return parseIf();
              } else {
                if (isToken(SyntaxKind.WhileKeyword)) {
                  return parseWhile();
                } else {
                  if (isToken(SyntaxKind.FnKeyword)) {
                    input.next();
                    return parseFunction();
                  } else {
                    if (isToken(SyntaxKind.LetKeyword)) {
                      input.next();
                      return parseVariableDeclaration();
                    } else {
                      if (isToken(SyntaxKind.NotKeyword) || isToken(SyntaxKind.MinusToken) || isToken(SyntaxKind.PlusToken)) {
                        return {
                          kind: SyntaxKind.UnaryExpression,
                          operator: input.next(),
                          rhs: parseExpression()
                        };
                      } else {
                        if (isToken(SyntaxKind.BreakKeyword)) {
                          return input.next();
                        } else {
                          if (isToken(SyntaxKind.ReturnKeyword)) {
                            return {
                              kind: SyntaxKind.ReturnStatement,
                              keyword: input.next(),
                              expression: parseExpression()
                            };
                          } else {
                            if (isToken(SyntaxKind.ThrowKeyword)) {
                              return {
                                kind: input.next().kind,
                                expression: parseExpression()
                              };
                            } else {
                              if (isToken(SyntaxKind.TrueKeyword) || isToken(SyntaxKind.FalseKeyword)) {
                                return maybeMemberAccess({
                                  kind: SyntaxKind.BooleanLiteral,
                                  value: input.next().kind == SyntaxKind.TrueKeyword
                                });
                              } else {
                                if (isToken(SyntaxKind.NumberLiteral) || isToken(SyntaxKind.StringLiteral) || isToken(SyntaxKind.Identifier)) {
                                  return maybeMemberAccess(input.next());
                                } else {
                                  return unexpected();
                                };
                              };
                            };
                          };
                        };
                      };
                    };
                  };
                };
              };
            };
          };
        };
      };
    }());
  };
  function parseExport() {
    var keyword = consumeToken(SyntaxKind.ExportKeyword);
    var expression = void 0;
    var identifier = void 0;
    if (isToken(SyntaxKind.FnKeyword)) {
      input.next();
      expression = parseFunction();
      identifier = expression.name;
    } else {
      if (isToken(SyntaxKind.LetKeyword)) {
        input.next();
        expression = parseVariableDeclaration();
        identifier = expression.identifier;
      } else {
        input.croak("Expected function or variable declaration after export");
      };
    };
    return {
      kind: SyntaxKind.ExportStatement,
      keyword: keyword,
      identifier: identifier,
      expression: expression
    };
  };
  function parseTopLevelExpression() {
    if (isToken(SyntaxKind.ExportKeyword)) {
      return parseExport();
    } else {
      return parseExpression();
    };
  };
  function parseToplevel() {
    var prog = [];
    while (!input.eof()) {
      var expression = parseTopLevelExpression();
      if (expression) {
        prog.push(expression);
      };
      if (!input.eof()) {
        consumeSeparator(SyntaxKind.SemicolonToken);
      };
    };
    return {
      kind: SyntaxKind.Block,
      block: prog
    };
  };
  function parseBlock() {
    var block = delimited("{", "}", ";", parseExpression);
    return {
      kind: SyntaxKind.Block,
      block: block
    };
  };
  function parseExpression() {
    return maybeMemberAccess(maybeCall(maybeBinary(parseAtom(), 0)));
  };
  return parseToplevel();
};
module.exports.parse = parse;
