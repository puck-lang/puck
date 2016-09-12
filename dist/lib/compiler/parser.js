#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = parse;

var _ast = require('./ast.js');

var _js = require('./../stdlib/js.js');

function parse(input) {
  function isToken(kind, peekDistance) {
    var token = input.peek(false, peekDistance);
    return token && token.kind == kind;
  };
  function tokenName(token) {
    if ((0, _js._typeof)(_ast.tokenToText[token.kind]) == "function") {
      return _ast.tokenToText[token.kind](token);
    } else {
      if (_ast.tokenToText[token.kind]) {
        return _ast.tokenToText[token.kind];
      } else {
        return _ast.SyntaxKind[token.kind];
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
      _js.console.error(token);
      return input.croak("Expected " + name + "" + expectedText + ", but " + but + "");
    };
  };
  function consumeToken(token, name) {
    expect(token, name);
    return input.next();
  };
  function skipKeyword(kw) {
    expect(kw, "keyword");
    return input.next();
  };
  function unexpected() {
    var token = input.peek();
    _js.console.error("token", token, (0, _js._typeof)(token));
    var name = _ast.tokenToText[token.kind];
    return input.croak("Unexpected token: " + name + "");
  };
  function consumeSeparator(kind) {
    if (!input.eof()) {
      var token = input.peek(true);
      if (token.kind == _ast.SyntaxKind.NewlineToken || token.kind == _ast.SyntaxKind.Comment) {
        return input.next(true);
      } else {
        return consumeToken(kind);
      };
    };
  };
  function isAssignment(token) {
    if (!token) {
      return _js._undefined;
    };
    return token.kind == _ast.SyntaxKind.EqualsToken || token.kind == _ast.SyntaxKind.PlusEqualsToken || token.kind == _ast.SyntaxKind.MinusEqualsToken || token.kind == _ast.SyntaxKind.AsteriskEqualsToken || token.kind == _ast.SyntaxKind.AsteriskAsteriskEqualsToken || token.kind == _ast.SyntaxKind.SlashEqualsToken || token.kind == _ast.SyntaxKind.PercentEqualsToken;
  };
  function maybeParseOperator() {
    if (isAssignment(input.peek()) || isToken(_ast.SyntaxKind.EqualsEqualsToken) || isToken(_ast.SyntaxKind.ExclamationEqualsToken) || isToken(_ast.SyntaxKind.GreaterThanToken) || isToken(_ast.SyntaxKind.GreaterThanEqualsToken) || isToken(_ast.SyntaxKind.LessThanToken) || isToken(_ast.SyntaxKind.LessThanEqualsToken) || isToken(_ast.SyntaxKind.PlusToken) || isToken(_ast.SyntaxKind.MinusToken) || isToken(_ast.SyntaxKind.AsteriskToken) || isToken(_ast.SyntaxKind.AsteriskAsteriskToken) || isToken(_ast.SyntaxKind.SlashToken) || isToken(_ast.SyntaxKind.PercentToken) || isToken(_ast.SyntaxKind.AndKeyword) || isToken(_ast.SyntaxKind.OrKeyword) || isToken(_ast.SyntaxKind.NotKeyword)) {
      return input.peek();
    } else {
      return _js._null;
    };
  };
  function maybeBinary(left, myprecedence) {
    var operator = maybeParseOperator();
    if (operator) {
      var hisprecedence = _ast.precedence[operator.kind];
      if (hisprecedence == _js._undefined) {
        var name = _ast.tokenToText[operator.kind];
        var json = _js.global.JSON.stringify(operator);
        throw "No precedence for " + name + ": " + json + "";
      };
      if (hisprecedence > myprecedence) {
        input.next();
        var e = void 0;
        var innerExpression = maybeBinary(parseAtom(), hisprecedence);
        if (isAssignment(operator)) {
          if ((0, _ast.isIdentifier)(left) || (0, _ast.isMember)(left) || (0, _ast.isIndex)(left)) {
            var a = {
              kind: _ast.SyntaxKind.AssignmentExpression,
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
            kind: _ast.SyntaxKind.BinaryExpression,
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
    if (isToken(_ast.SyntaxKind.OpenParenToken)) {
      return maybeCall(maybeMemberAccess({
        kind: _ast.SyntaxKind.CallExpression,
        func: expr,
        openParen: input.peek(),
        argumentList: delimited("(", ")", ",", parseExpression, false),
        closeParen: consumeToken(_ast.SyntaxKind.CloseParenToken)
      }));
    } else {
      return expr;
    };
  };
  function maybeMemberAccess(token) {
    if (isToken(_ast.SyntaxKind.DotToken)) {
      input.next();
      expect(_ast.SyntaxKind.Identifier, "identifier");
      return {
        kind: _ast.SyntaxKind.MemberAccess,
        object: token,
        member: maybeMemberAccess(input.next())
      };
    };
    if (isToken(_ast.SyntaxKind.OpenBracketToken)) {
      input.next();
      var index = parseExpression();
      consumeToken(_ast.SyntaxKind.CloseBracketToken);
      return maybeMemberAccess({
        kind: _ast.SyntaxKind.IndexAccess,
        object: token,
        index: index
      });
    };
    return token;
  };
  function delimited(start, stop, separator, parser) {
    var consumeStop = arguments.length <= 4 || arguments[4] === undefined ? true : arguments[4];

    if ((0, _js._typeof)(start) == "string") {
      start = _ast.textToToken[start];
    };
    if ((0, _js._typeof)(stop) == "string") {
      stop = _ast.textToToken[stop];
    };
    if ((0, _js._typeof)(separator) == "string") {
      separator = _ast.textToToken[separator];
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
        if ((0, _js._typeof)(separator) == "function") {
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
    if (consumeStop) {
      consumeToken(stop);
    };
    return parts;
  };
  function parseTypeBound() {
    var name = consumeToken(_ast.SyntaxKind.Identifier, "identifier");
    var __PUCK__value__2 = void 0;
    if (isToken(_ast.SyntaxKind.LessThanToken)) {
      __PUCK__value__2 = delimited("<", ">", ",", parseTypeBound);
    };
    var parameters = __PUCK__value__2;
    return {
      kind: _ast.SyntaxKind.TypeBound,
      name: name,
      parameters: parameters
    };
  };
  function parseObjectDestructureMember() {
    var property = consumeToken(_ast.SyntaxKind.Identifier, "identifier");
    var __PUCK__value__3 = void 0;
    if (isToken(_ast.SyntaxKind.ColonToken)) {
      input.next();
      __PUCK__value__3 = consumeToken(_ast.SyntaxKind.Identifier, "identifier");
    } else {
      __PUCK__value__3 = property;
    };
    var local = __PUCK__value__3;
    return {
      kind: _ast.SyntaxKind.ObjectDestructureMember,
      property: property,
      local: local
    };
  };
  function parseObjectDestructure() {
    var openBrace = input.peek();
    var members = delimited("{", "}", ",", parseObjectDestructureMember, false);
    var closeBrace = consumeToken(_ast.SyntaxKind.CloseBraceToken);
    return {
      kind: _ast.SyntaxKind.ObjectDestructure,
      openBrace: openBrace,
      members: members,
      closeBrace: closeBrace
    };
  };
  function parseTypeParameter() {
    var name = consumeToken(_ast.SyntaxKind.Identifier, "identifier");
    var __PUCK__value__4 = void 0;
    if (isToken(_ast.SyntaxKind.EqualsToken)) {
      input.next();
      __PUCK__value__4 = parseTypeBound();
    };
    var defaultValue = __PUCK__value__4;
    return {
      kind: _ast.SyntaxKind.TypeParameter,
      name: name,
      defaultValue: defaultValue
    };
  };
  function parseTypeProperty() {
    var name = consumeToken(_ast.SyntaxKind.Identifier, "identifier");
    consumeToken(_ast.SyntaxKind.ColonToken);
    var typeBound = parseTypeBound();
    return {
      kind: _ast.SyntaxKind.TypeProperty,
      name: name,
      typeBound: typeBound
    };
  };
  function parseTypeDeclaration() {
    var keyword = consumeToken(_ast.SyntaxKind.TypeKeyword);
    var name = consumeToken(_ast.SyntaxKind.Identifier, "identifier");
    var __PUCK__value__5 = void 0;
    if (isToken(_ast.SyntaxKind.LessThanToken)) {
      __PUCK__value__5 = delimited("<", ">", ",", parseTypeParameter);
    } else {
      __PUCK__value__5 = [];
    };
    var parameters = __PUCK__value__5;
    consumeToken(_ast.SyntaxKind.EqualsToken);
    expect(_ast.SyntaxKind.OpenBraceToken);
    var openBrace = input.peek();
    var properties = delimited("{", "}", ",", parseTypeProperty, false);
    var closeBrace = consumeToken(_ast.SyntaxKind.CloseBraceToken);
    return {
      kind: _ast.SyntaxKind.TypeDeclaration,
      name: name,
      parameters: parameters,
      openBrace: openBrace,
      properties: properties,
      closeBrace: closeBrace
    };
  };
  function parseVariableDeclaration() {
    var mutable = false;
    if (isToken(_ast.SyntaxKind.MutKeyword)) {
      input.next();
      mutable = true;
    };
    expect(_ast.SyntaxKind.Identifier, "identifier");
    var declaration = {
      kind: _ast.SyntaxKind.VariableDeclaration,
      identifier: input.next(),
      mutable: mutable
    };
    if (isToken(_ast.SyntaxKind.ColonToken)) {
      input.next();
      declaration.typeBound = parseTypeBound();
    };
    if (isToken(_ast.SyntaxKind.EqualsToken)) {
      input.next();
      declaration.initializer = parseExpression();
    };
    return declaration;
  };
  function parseFunction() {
    var __PUCK__value__6 = void 0;
    if (isToken(_ast.SyntaxKind.Identifier)) {
      __PUCK__value__6 = input.next();
    };
    var name = __PUCK__value__6;
    var parameterList = delimited("(", ")", ",", parseVariableDeclaration);
    var __PUCK__value__7 = void 0;
    if (isToken(_ast.SyntaxKind.ColonToken)) {
      input.next();
      __PUCK__value__7 = parseTypeBound();
    };
    var returnType = __PUCK__value__7;
    var __PUCK__value__8 = void 0;
    if (isToken(_ast.SyntaxKind.OpenBraceToken)) {
      __PUCK__value__8 = parseBlock();
    } else {
      skipKeyword(_ast.SyntaxKind.ThenKeyword);
      __PUCK__value__8 = {
        kind: _ast.SyntaxKind.Block,
        block: [parseExpression()]
      };
    };
    var body = __PUCK__value__8;
    return {
      kind: _ast.SyntaxKind.Function,
      name: name,
      parameterList: parameterList,
      returnType: returnType,
      body: body
    };
  };
  function parseLambda() {
    var parameterList = delimited("|", "|", ",", parseVariableDeclaration);
    var __PUCK__value__9 = void 0;
    if (isToken(_ast.SyntaxKind.OpenBraceToken)) {
      __PUCK__value__9 = parseBlock();
    } else {
      __PUCK__value__9 = {
        kind: _ast.SyntaxKind.Block,
        block: [parseExpression()]
      };
    };
    var body = __PUCK__value__9;
    return {
      kind: _ast.SyntaxKind.Function,
      parameterList: parameterList,
      body: body
    };
  };
  function parseIf() {
    skipKeyword(_ast.SyntaxKind.IfKeyword);
    var condition = parseExpression();
    var __PUCK__value__10 = void 0;
    if (isToken(_ast.SyntaxKind.OpenBraceToken)) {
      __PUCK__value__10 = parseBlock();
    } else {
      skipKeyword(_ast.SyntaxKind.ThenKeyword);
      __PUCK__value__10 = {
        kind: _ast.SyntaxKind.Block,
        block: [parseExpression()]
      };
    };
    var _then = __PUCK__value__10;
    var ret = {
      kind: _ast.SyntaxKind.IfExpression,
      condition: condition,
      _then: _then
    };
    if (isToken(_ast.SyntaxKind.ElseKeyword)) {
      input.next();
      var __PUCK__value__11 = void 0;
      if (isToken(_ast.SyntaxKind.OpenBraceToken)) {
        __PUCK__value__11 = parseBlock();
      } else {
        __PUCK__value__11 = {
          kind: _ast.SyntaxKind.Block,
          block: [parseExpression()]
        };
      };
      ret._else = __PUCK__value__11;
    };
    return ret;
  };
  function parseWhile() {
    skipKeyword(_ast.SyntaxKind.WhileKeyword);
    var condition = parseExpression();
    var __PUCK__value__12 = void 0;
    if (isToken(_ast.SyntaxKind.OpenBraceToken)) {
      __PUCK__value__12 = parseBlock();
    } else {
      skipKeyword(_ast.SyntaxKind.ThenKeyword);
      __PUCK__value__12 = {
        kind: _ast.SyntaxKind.Block,
        block: [parseExpression()]
      };
    };
    var body = __PUCK__value__12;
    return {
      kind: _ast.SyntaxKind.WhileExpression,
      condition: condition,
      body: body
    };
  };
  function parseArrayLiteral() {
    var members = delimited("[", "]", ",", parseExpression);
    return {
      kind: _ast.SyntaxKind.ArrayLiteral,
      members: members
    };
  };
  function parseObjectLiteralMember() {
    var name = consumeToken(_ast.SyntaxKind.Identifier, "identifier");
    var __PUCK__value__13 = void 0;
    if (isToken(_ast.SyntaxKind.ColonToken)) {
      input.next();
      __PUCK__value__13 = parseExpression();
    } else {
      __PUCK__value__13 = name;
    };
    var value = __PUCK__value__13;
    return {
      kind: _ast.SyntaxKind.ObjectLiteralMember,
      name: name,
      value: value
    };
  };
  function parseObjectLiteral() {
    var members = delimited("{", "}", ",", parseObjectLiteralMember);
    return {
      kind: _ast.SyntaxKind.ObjectLiteral,
      members: members
    };
  };
  function parseAtom() {
    return maybeCall(function innerParseAtom() {
      if (isToken(_ast.SyntaxKind.OpenParenToken)) {
        input.next();
        var exp = parseExpression();
        consumeToken(_ast.SyntaxKind.CloseParenToken);
        return exp;
      } else {
        if (isToken(_ast.SyntaxKind.OpenBracketToken)) {
          return parseArrayLiteral();
        } else {
          if (isToken(_ast.SyntaxKind.OpenBraceToken)) {
            return parseObjectLiteral();
          } else {
            if (isToken(_ast.SyntaxKind.BarToken)) {
              return parseLambda();
            } else {
              if (isToken(_ast.SyntaxKind.IfKeyword)) {
                return parseIf();
              } else {
                if (isToken(_ast.SyntaxKind.WhileKeyword)) {
                  return parseWhile();
                } else {
                  if (isToken(_ast.SyntaxKind.FnKeyword)) {
                    input.next();
                    return parseFunction();
                  } else {
                    if (isToken(_ast.SyntaxKind.LetKeyword)) {
                      input.next();
                      return parseVariableDeclaration();
                    } else {
                      if (isToken(_ast.SyntaxKind.NotKeyword) || isToken(_ast.SyntaxKind.MinusToken) || isToken(_ast.SyntaxKind.PlusToken)) {
                        return {
                          kind: _ast.SyntaxKind.UnaryExpression,
                          operator: input.next(),
                          rhs: parseExpression()
                        };
                      } else {
                        if (isToken(_ast.SyntaxKind.BreakKeyword)) {
                          return input.next();
                        } else {
                          if (isToken(_ast.SyntaxKind.ReturnKeyword)) {
                            return {
                              kind: _ast.SyntaxKind.ReturnStatement,
                              keyword: input.next(),
                              expression: parseExpression()
                            };
                          } else {
                            if (isToken(_ast.SyntaxKind.ThrowKeyword)) {
                              return {
                                kind: input.next().kind,
                                expression: parseExpression()
                              };
                            } else {
                              if (isToken(_ast.SyntaxKind.TrueKeyword) || isToken(_ast.SyntaxKind.FalseKeyword)) {
                                return maybeMemberAccess({
                                  kind: _ast.SyntaxKind.BooleanLiteral,
                                  value: input.next().kind == _ast.SyntaxKind.TrueKeyword
                                });
                              } else {
                                if (isToken(_ast.SyntaxKind.NumberLiteral) || isToken(_ast.SyntaxKind.StringLiteral) || isToken(_ast.SyntaxKind.Identifier)) {
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
    var keyword = consumeToken(_ast.SyntaxKind.ExportKeyword);
    var expression = void 0;
    var identifier = void 0;
    if (isToken(_ast.SyntaxKind.TypeKeyword)) {
      expression = parseTypeDeclaration();
      identifier = expression.name;
    } else {
      if (isToken(_ast.SyntaxKind.FnKeyword)) {
        input.next();
        expression = parseFunction();
        identifier = expression.name;
      } else {
        if (isToken(_ast.SyntaxKind.LetKeyword)) {
          input.next();
          expression = parseVariableDeclaration();
          identifier = expression.identifier;
        } else {
          input.croak("Expected type, function or variable declaration after export");
        };
      };
    };
    return {
      kind: _ast.SyntaxKind.ExportDirective,
      keyword: keyword,
      identifier: identifier,
      expression: expression
    };
  };
  function parseImport() {
    var importKeyword = consumeToken(_ast.SyntaxKind.ImportKeyword);
    var locator = consumeToken(_ast.SyntaxKind.StringLiteral);
    if (locator.parts.length != 1) {
      throw Error("More than one part in import string");
    };
    var parts = locator.parts[0].value.split(":");
    if (parts > 2) {
      input.croak("Illegal token \":\" used in import path");
    };
    var __PUCK__value__14 = void 0;
    if (parts.length == 2) {
      __PUCK__value__14 = parts[0];
    };
    var domain = __PUCK__value__14;
    var __PUCK__value__15 = void 0;
    if (parts.length == 2) {
      __PUCK__value__15 = parts[1];
    } else {
      __PUCK__value__15 = parts[0];
    };
    var path = __PUCK__value__15;
    var asKeyword = consumeToken(_ast.SyntaxKind.AsKeyword);
    var __PUCK__value__16 = void 0;
    if (isToken(_ast.SyntaxKind.OpenBraceToken)) {
      __PUCK__value__16 = parseObjectDestructure();
    } else {
      __PUCK__value__16 = consumeToken(_ast.SyntaxKind.Identifier, "identifier");
    };
    var specifier = __PUCK__value__16;
    return {
      kind: _ast.SyntaxKind.ImportDirective,
      importKeyword: importKeyword,
      domain: domain,
      path: path,
      asKeyword: asKeyword,
      specifier: specifier
    };
  };
  function parseTopLevelExpression() {
    if (isToken(_ast.SyntaxKind.ExportKeyword)) {
      return parseExport();
    } else {
      if (isToken(_ast.SyntaxKind.ImportKeyword)) {
        return parseImport();
      } else {
        if (isToken(_ast.SyntaxKind.TypeKeyword)) {
          return parseTypeDeclaration();
        } else {
          return parseExpression();
        };
      };
    };
  };
  function parseModule() {
    var exports = {};
    var lines = [];
    while (!input.eof()) {
      var expression = parseTopLevelExpression();
      if (expression) {
        lines.push(expression);
        if (expression.kind == _ast.SyntaxKind.ExportDirective) {
          exports[expression.identifier.name] = expression;
        };
      };
      if (!input.eof()) {
        consumeSeparator(_ast.SyntaxKind.SemicolonToken);
      };
    };
    return {
      kind: _ast.SyntaxKind.Module,
      fileName: input.file.fileName,
      path: input.file.absolutePath,
      exports: exports,
      lines: lines
    };
  };
  function parseBlock() {
    var block = delimited("{", "}", ";", parseExpression);
    return {
      kind: _ast.SyntaxKind.Block,
      block: block
    };
  };
  function parseExpression() {
    return maybeCall(maybeMemberAccess(maybeBinary(parseAtom(), 0)));
  };
  return parseModule();
}
