#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = parse;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

require('./../ast/ast.js');

var _ast = require('./ast.js');

function parse(input) {
  function isToken(kind) {
    var peekDistance = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

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
  function consumeToken() {
    var token = arguments.length <= 0 || arguments[0] === undefined ? _js._undefined : arguments[0];
    var name = arguments.length <= 1 || arguments[1] === undefined ? _js._undefined : arguments[1];

    if (token) {
      expect(token, name);
    };
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
  function parseObjectDestructureMember() {
    var property = consumeToken(_ast.SyntaxKind.Identifier, "identifier");
    var __PUCK__value__2 = void 0;
    if (isToken(_ast.SyntaxKind.ColonToken)) {
      input.next();
      __PUCK__value__2 = consumeToken(_ast.SyntaxKind.Identifier, "identifier");
    } else {
      __PUCK__value__2 = property;
    };
    var local = __PUCK__value__2;
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
  function parseTraitDeclaration() {
    var keyword = consumeToken(_ast.SyntaxKind.TraitKeyword);
    var name = consumeToken(_ast.SyntaxKind.Identifier, "identifier");
    var openBrace = expect(_ast.SyntaxKind.OpenBraceToken);
    var members = delimited("{", "}", ";", function () {
      return parseFunctionDeclaration(true);
    }, false);
    var closeBrace = consumeToken(_ast.SyntaxKind.CloseBraceToken);
    return {
      kind: _ast.SyntaxKind.TraitDeclaration,
      keyword: keyword,
      name: name,
      openBrace: openBrace,
      members: members,
      closeBrace: closeBrace
    };
  };
  function parseFunctionTypeBound() {
    var __PUCK__value__3 = void 0;
    if (isToken(_ast.SyntaxKind.LessThanToken)) {
      __PUCK__value__3 = delimited("<", ">", ",", parseTypeParameter);
    } else {
      __PUCK__value__3 = [];
    };
    var typeParameters = __PUCK__value__3;
    var parameters = delimited("(", ")", ",", parseTypeBound);
    consumeToken(_ast.SyntaxKind.EqualsGreaterThanToken);
    var returnType = parseTypeBound();
    return {
      kind: _ast.SyntaxKind.FunctionTypeBound,
      typeParameters: typeParameters,
      parameters: parameters,
      returnType: returnType
    };
  };
  function parseNamedTypeBound() {
    var name = consumeToken(_ast.SyntaxKind.Identifier, "identifier");
    var __PUCK__value__4 = void 0;
    if (isToken(_ast.SyntaxKind.LessThanToken)) {
      __PUCK__value__4 = delimited("<", ">", ",", parseTypeBound);
    } else {
      __PUCK__value__4 = [];
    };
    var parameters = __PUCK__value__4;
    return {
      kind: _ast.SyntaxKind.NamedTypeBound,
      name: name,
      parameters: parameters
    };
  };
  function parseTypeBound() {
    if (isToken(_ast.SyntaxKind.OpenParenToken) || isToken(_ast.SyntaxKind.LessThanToken)) {
      return parseFunctionTypeBound();
    } else {
      return parseNamedTypeBound();
    };
  };
  function parseTypeParameter() {
    var name = consumeToken(_ast.SyntaxKind.Identifier, "identifier");
    var __PUCK__value__5 = void 0;
    if (isToken(_ast.SyntaxKind.EqualsToken)) {
      input.next();
      __PUCK__value__5 = parseTypeBound();
    };
    var defaultValue = __PUCK__value__5;
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
    var __PUCK__value__6 = void 0;
    if (isToken(_ast.SyntaxKind.LessThanToken)) {
      __PUCK__value__6 = delimited("<", ">", ",", parseTypeParameter);
    } else {
      __PUCK__value__6 = [];
    };
    var parameters = __PUCK__value__6;
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
  function parseFunctionDeclaration() {
    var optionalBody = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

    consumeToken(_ast.SyntaxKind.FnKeyword);
    var __PUCK__value__7 = void 0;
    if (isToken(_ast.SyntaxKind.Identifier)) {
      __PUCK__value__7 = input.next();
    };
    var name = __PUCK__value__7;
    var __PUCK__value__8 = void 0;
    if (isToken(_ast.SyntaxKind.LessThanToken)) {
      __PUCK__value__8 = delimited("<", ">", ",", parseTypeParameter);
    } else {
      __PUCK__value__8 = [];
    };
    var typeParameters = __PUCK__value__8;
    var parameterList = delimited("(", ")", ",", parseVariableDeclaration);
    var __PUCK__value__9 = void 0;
    if (isToken(_ast.SyntaxKind.ColonToken)) {
      input.next();
      __PUCK__value__9 = parseTypeBound();
    };
    var returnType = __PUCK__value__9;
    var __PUCK__value__10 = void 0;
    if (isToken(_ast.SyntaxKind.OpenBraceToken)) {
      __PUCK__value__10 = parseBlock();
    } else {
      var __PUCK__value__11 = void 0;
      if (isToken(_ast.SyntaxKind.ThenKeyword)) {
        skipKeyword(_ast.SyntaxKind.ThenKeyword);
        __PUCK__value__11 = {
          kind: _ast.SyntaxKind.Block,
          block: [parseExpression()]
        };
      } else {
        var __PUCK__value__12 = void 0;
        if (!optionalBody) {
          __PUCK__value__12 = input.croak("A function declaration must be followed by a `{` or `then`");
        };
        __PUCK__value__11 = __PUCK__value__12;
      };
      __PUCK__value__10 = __PUCK__value__11;
    };
    var body = __PUCK__value__10;
    return {
      kind: _ast.SyntaxKind.Function,
      name: name,
      typeParameters: typeParameters,
      parameterList: parameterList,
      returnType: returnType,
      body: body
    };
  };
  function parseLambda() {
    var parameterList = delimited("|", "|", ",", parseVariableDeclaration);
    var __PUCK__value__13 = void 0;
    if (isToken(_ast.SyntaxKind.OpenBraceToken)) {
      __PUCK__value__13 = parseBlock();
    } else {
      __PUCK__value__13 = {
        kind: _ast.SyntaxKind.Block,
        block: [parseExpression()]
      };
    };
    var body = __PUCK__value__13;
    return {
      kind: _ast.SyntaxKind.Function,
      parameterList: parameterList,
      body: body
    };
  };
  function parseIf() {
    skipKeyword(_ast.SyntaxKind.IfKeyword);
    var condition = parseExpression();
    var __PUCK__value__14 = void 0;
    if (isToken(_ast.SyntaxKind.OpenBraceToken)) {
      __PUCK__value__14 = parseBlock();
    } else {
      skipKeyword(_ast.SyntaxKind.ThenKeyword);
      __PUCK__value__14 = {
        kind: _ast.SyntaxKind.Block,
        block: [parseExpression()]
      };
    };
    var _then = __PUCK__value__14;
    var ret = {
      kind: _ast.SyntaxKind.IfExpression,
      condition: condition,
      _then: _then
    };
    if (isToken(_ast.SyntaxKind.ElseKeyword)) {
      input.next();
      var __PUCK__value__15 = void 0;
      if (isToken(_ast.SyntaxKind.OpenBraceToken)) {
        __PUCK__value__15 = parseBlock();
      } else {
        __PUCK__value__15 = {
          kind: _ast.SyntaxKind.Block,
          block: [parseExpression()]
        };
      };
      ret._else = __PUCK__value__15;
    };
    return ret;
  };
  function parseUnaryExpression() {
    var operator = input.next();
    return {
      kind: _ast.SyntaxKind.UnaryExpression,
      operator: operator,
      rhs: parseExpression(_ast.precedence[operator.kind])
    };
  };
  function parseWhile() {
    skipKeyword(_ast.SyntaxKind.WhileKeyword);
    var condition = parseExpression();
    var __PUCK__value__16 = void 0;
    if (isToken(_ast.SyntaxKind.OpenBraceToken)) {
      __PUCK__value__16 = parseBlock();
    } else {
      skipKeyword(_ast.SyntaxKind.ThenKeyword);
      __PUCK__value__16 = {
        kind: _ast.SyntaxKind.Block,
        block: [parseExpression()]
      };
    };
    var body = __PUCK__value__16;
    return {
      kind: _ast.SyntaxKind.WhileExpression,
      condition: condition,
      body: body
    };
  };
  function parseListLiteral() {
    var members = delimited("[", "]", ",", parseExpression);
    return {
      kind: _ast.SyntaxKind.ArrayLiteral,
      members: members
    };
  };
  function parseObjectLiteralMember() {
    var name = consumeToken(_ast.SyntaxKind.Identifier, "identifier");
    var __PUCK__value__17 = void 0;
    if (isToken(_ast.SyntaxKind.ColonToken)) {
      input.next();
      __PUCK__value__17 = parseExpression();
    } else {
      __PUCK__value__17 = name;
    };
    var value = __PUCK__value__17;
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
          return parseListLiteral();
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
                    return parseFunctionDeclaration();
                  } else {
                    if (isToken(_ast.SyntaxKind.LetKeyword)) {
                      input.next();
                      return parseVariableDeclaration();
                    } else {
                      if (isToken(_ast.SyntaxKind.NotKeyword) || isToken(_ast.SyntaxKind.MinusToken) || isToken(_ast.SyntaxKind.PlusToken)) {
                        return parseUnaryExpression();
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
    if (isToken(_ast.SyntaxKind.TraitKeyword)) {
      expression = parseTraitDeclaration();
      identifier = expression.name;
    } else {
      if (isToken(_ast.SyntaxKind.TypeKeyword)) {
        expression = parseTypeDeclaration();
        identifier = expression.name;
      } else {
        if (isToken(_ast.SyntaxKind.FnKeyword)) {
          expression = parseFunctionDeclaration();
          identifier = expression.name;
        } else {
          if (isToken(_ast.SyntaxKind.LetKeyword)) {
            input.next();
            expression = parseVariableDeclaration();
            identifier = expression.identifier;
          } else {
            input.croak("Expected trait, type, function or variable declaration after export");
          };
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
    var __PUCK__value__18 = void 0;
    if (parts.length == 2) {
      __PUCK__value__18 = parts[0];
    };
    var domain = __PUCK__value__18;
    var __PUCK__value__19 = void 0;
    if (parts.length == 2) {
      __PUCK__value__19 = parts[1];
    } else {
      __PUCK__value__19 = parts[0];
    };
    var path = __PUCK__value__19;
    var asKeyword = consumeToken(_ast.SyntaxKind.AsKeyword);
    var __PUCK__value__20 = void 0;
    if (isToken(_ast.SyntaxKind.OpenBraceToken)) {
      __PUCK__value__20 = parseObjectDestructure();
    } else {
      var __PUCK__value__21 = void 0;
      if (isToken(_ast.SyntaxKind.AsteriskToken)) {
        __PUCK__value__21 = consumeToken();
      } else {
        __PUCK__value__21 = consumeToken(_ast.SyntaxKind.Identifier, "identifier");
      };
      __PUCK__value__20 = __PUCK__value__21;
    };
    var specifier = __PUCK__value__20;
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
        if (isToken(_ast.SyntaxKind.TraitKeyword)) {
          return parseTraitDeclaration();
        } else {
          if (isToken(_ast.SyntaxKind.TypeKeyword)) {
            return parseTypeDeclaration();
          } else {
            return parseExpression();
          };
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
    var precedence = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

    return maybeCall(maybeMemberAccess(maybeBinary(parseAtom(), precedence)));
  };
  return parseModule();
}
