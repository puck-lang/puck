#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.parse = parse;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _ast = require('./../ast/ast.js');

var _ast2 = require('./ast.js');

function parse(input) {
  function isToken(kind) {
    var peekDistance = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    var token = input.peek(false, peekDistance);
    return token && token.kind == kind;
  };
  function tokenName(token) {
    if ((0, _js._typeof)(_ast2.tokenToText[token.kind]) == "function") {
      return _ast2.tokenToText[token.kind](token);
    } else {
      if (_ast2.tokenToText[token.kind]) {
        return _ast2.tokenToText[token.kind];
      } else {
        return _ast2.SyntaxKind[token.kind];
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
  function consumeToken(token) {
    var name = arguments.length <= 1 || arguments[1] === undefined ? "token" : arguments[1];

    if (token) {
      expect(token, name);
    };
    return input.next();
  };
  function maybeConsumeToken(token) {
    var name = arguments.length <= 1 || arguments[1] === undefined ? "token" : arguments[1];

    if (isToken(token)) {
      return (0, _core.Just)(consumeToken(token, name));
    } else {
      return _core.Nothing;
    };
  };
  function skipKeyword(kw) {
    expect(kw, "keyword");
    return input.next();
  };
  function unexpected() {
    var token = input.peek();
    _js.console.error("token", token, (0, _js._typeof)(token));
    var name = _ast2.tokenToText[token.kind];
    return input.croak("Unexpected token: " + name + "");
  };
  function consumeSeparator(kind) {
    if (!input.eof()) {
      var token = input.peek(true);
      if (token.kind == _ast2.SyntaxKind.NewlineToken || token.kind == _ast2.SyntaxKind.Comment) {
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
    return token.kind == _ast2.SyntaxKind.EqualsToken || token.kind == _ast2.SyntaxKind.PlusEqualsToken || token.kind == _ast2.SyntaxKind.MinusEqualsToken || token.kind == _ast2.SyntaxKind.AsteriskEqualsToken || token.kind == _ast2.SyntaxKind.AsteriskAsteriskEqualsToken || token.kind == _ast2.SyntaxKind.SlashEqualsToken || token.kind == _ast2.SyntaxKind.PercentEqualsToken;
  };
  function maybeParseOperator() {
    if (isAssignment(input.peek()) || isToken(_ast2.SyntaxKind.EqualsEqualsToken) || isToken(_ast2.SyntaxKind.ExclamationEqualsToken) || isToken(_ast2.SyntaxKind.GreaterThanToken) || isToken(_ast2.SyntaxKind.GreaterThanEqualsToken) || isToken(_ast2.SyntaxKind.LessThanToken) || isToken(_ast2.SyntaxKind.LessThanEqualsToken) || isToken(_ast2.SyntaxKind.PlusToken) || isToken(_ast2.SyntaxKind.MinusToken) || isToken(_ast2.SyntaxKind.AsteriskToken) || isToken(_ast2.SyntaxKind.AsteriskAsteriskToken) || isToken(_ast2.SyntaxKind.SlashToken) || isToken(_ast2.SyntaxKind.PercentToken) || isToken(_ast2.SyntaxKind.AndKeyword) || isToken(_ast2.SyntaxKind.OrKeyword) || isToken(_ast2.SyntaxKind.NotKeyword)) {
      return input.peek();
    } else {
      return _js._null;
    };
  };
  function maybeBinary(left, myPrecedence) {
    var operator = maybeParseOperator();
    if (operator) {
      var hisPrecedence = _ast2.precedence[operator.kind];
      if (hisPrecedence == _js._undefined) {
        var name = _ast2.tokenToText[operator.kind];
        var json = _js.global.JSON.stringify(operator);
        throw "No precedence for " + name + ": " + json + "";
      };
      if (hisPrecedence > myPrecedence) {
        input.next();
        var e = void 0;
        var innerExpression = maybeBinary(parseAtom(), hisPrecedence);
        if (isAssignment(operator)) {
          if ((0, _ast2.isIdentifier)(left) || (0, _ast2.isMember)(left) || (0, _ast2.isIndex)(left)) {
            var a = {
              kind: _ast2.SyntaxKind.AssignmentExpression,
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
            kind: _ast2.SyntaxKind.BinaryExpression,
            lhs: left,
            operator: operator,
            rhs: innerExpression
          };
          e = b;
        };
        return maybeBinary(e, myPrecedence);
      };
    };
    return left;
  };
  function maybeCall(expr) {
    if (isToken(_ast2.SyntaxKind.OpenParenToken)) {
      return maybeCall(maybeMemberAccess({
        kind: _ast2.SyntaxKind.CallExpression,
        func: expr,
        openParen: input.peek(),
        argumentList: delimited("(", ")", ",", parseExpression, false),
        closeParen: consumeToken(_ast2.SyntaxKind.CloseParenToken)
      }));
    } else {
      return expr;
    };
  };
  function maybeMemberAccess(token) {
    if (isToken(_ast2.SyntaxKind.DotToken)) {
      input.next();
      return maybeAccess({
        kind: _ast2.SyntaxKind.MemberAccess,
        object: token,
        member: consumeToken(_ast2.SyntaxKind.Identifier, "identifier")
      });
    } else {
      return token;
    };
  };
  function maybeIndexAccess(token) {
    if (isToken(_ast2.SyntaxKind.OpenBracketToken)) {
      input.next();
      var index = parseExpression();
      consumeToken(_ast2.SyntaxKind.CloseBracketToken);
      return maybeAccess({
        kind: _ast2.SyntaxKind.IndexAccess,
        object: token,
        index: index
      });
    } else {
      return token;
    };
  };
  function maybeAccess(token) {
    return maybeIndexAccess(maybeMemberAccess(token));
  };
  function delimited(start, stop, separator, parser) {
    var consumeStop = arguments.length <= 4 || arguments[4] === undefined ? true : arguments[4];

    if ((0, _js._typeof)(start) == "string") {
      start = _ast2.textToToken[start];
    };
    if ((0, _js._typeof)(stop) == "string") {
      stop = _ast2.textToToken[stop];
    };
    if ((0, _js._typeof)(separator) == "string") {
      separator = _ast2.textToToken[separator];
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
  function parseEnumDeclaration() {
    var keyword = consumeToken(_ast2.SyntaxKind.EnumKeyword);
    var name = consumeToken(_ast2.SyntaxKind.Identifier, "identifier");
    var __PUCK__value__2 = void 0;
    if (isToken(_ast2.SyntaxKind.LessThanToken)) {
      __PUCK__value__2 = delimited("<", ">", ",", parseTypeParameter);
    } else {
      __PUCK__value__2 = [];
    };
    var typeParameters = __PUCK__value__2;
    consumeToken(_ast2.SyntaxKind.EqualsToken);
    var members = [parseEnumMember()];
    while (isToken(_ast2.SyntaxKind.BarToken)) {
      input.next();
      members.push(parseEnumMember());
    };
    return {
      kind: _ast2.SyntaxKind.EnumDeclaration,
      name: name,
      typeParameters: typeParameters,
      members: members
    };
  };
  function parseEnumMember() {
    var name = consumeToken(_ast2.SyntaxKind.Identifier, "identifier");
    var __PUCK__value__3 = void 0;
    if (isToken(_ast2.SyntaxKind.OpenBraceToken)) {
      __PUCK__value__3 = (0, _core.Just)(parseObjectTypeBound());
    } else {
      var __PUCK__value__4 = void 0;
      if (isToken(_ast2.SyntaxKind.OpenParenToken)) {
        __PUCK__value__4 = (0, _core.Just)(parseTupleTypeBound());
      } else {
        __PUCK__value__4 = _core.Nothing;
      };
      __PUCK__value__3 = __PUCK__value__4;
    };
    var bound = __PUCK__value__3;
    return {
      kind: _ast2.SyntaxKind.EnumMember,
      name: name,
      bound: bound
    };
  };
  function parseObjectDestructureMember() {
    var property = consumeToken(_ast2.SyntaxKind.Identifier, "identifier");
    var __PUCK__value__5 = void 0;
    if (isToken(_ast2.SyntaxKind.ColonToken)) {
      input.next();
      __PUCK__value__5 = consumeToken(_ast2.SyntaxKind.Identifier, "identifier");
    } else {
      __PUCK__value__5 = property;
    };
    var local = __PUCK__value__5;
    return {
      kind: _ast2.SyntaxKind.ObjectDestructureMember,
      property: property,
      local: local
    };
  };
  function parseObjectDestructure() {
    var openBrace = input.peek();
    var members = delimited("{", "}", ",", parseObjectDestructureMember, false);
    var closeBrace = consumeToken(_ast2.SyntaxKind.CloseBraceToken);
    return {
      kind: _ast2.SyntaxKind.ObjectDestructure,
      openBrace: openBrace,
      members: members,
      closeBrace: closeBrace
    };
  };
  function parseRecordPatternMember() {
    var property = consumeToken(_ast2.SyntaxKind.Identifier, "identifier");
    var __PUCK__value__6 = void 0;
    if (_core.MaybeTrait['$Maybe'].isJust.call(maybeConsumeToken(_ast2.SyntaxKind.ColonToken))) {
      __PUCK__value__6 = parsePattern();
    } else {
      __PUCK__value__6 = _ast.Pattern.Identifier(property);
    };
    var pattern = __PUCK__value__6;
    return {
      property: property,
      pattern: pattern
    };
  };
  function parseRecordPattern() {
    var openBrace = expect(_ast2.SyntaxKind.OpenBraceToken);
    var properties = delimited("{", "}", ",", parseRecordPatternMember, false);
    var closeBrace = consumeToken(_ast2.SyntaxKind.CloseBraceToken);
    return {
      openBrace: openBrace,
      properties: properties,
      closeBrace: closeBrace
    };
  };
  function parseTuplePattern() {
    var openParen = expect(_ast2.SyntaxKind.OpenParenToken);
    var properties = delimited("(", ")", ",", parsePattern, false);
    var closeParen = consumeToken(_ast2.SyntaxKind.CloseParenToken);
    return {
      openParen: openParen,
      properties: properties,
      closeParen: closeParen
    };
  };
  function parsePattern() {
    if (_core.MaybeTrait['$Maybe'].isJust.call(maybeConsumeToken(_ast2.SyntaxKind.UnderscoreToken))) {
      return _ast.Pattern.CatchAll;
    } else {
      if (isToken(_ast2.SyntaxKind.OpenParenToken)) {
        return _ast.Pattern.Tuple(parseTuplePattern());
      } else {
        if (isToken(_ast2.SyntaxKind.OpenBraceToken)) {
          return _ast.Pattern.Record(parseRecordPattern());
        } else {
          var identifier = consumeToken(_ast2.SyntaxKind.Identifier, "identifier");
          if (isToken(_ast2.SyntaxKind.ColonColonToken) || isToken(_ast2.SyntaxKind.OpenParenToken) || isToken(_ast2.SyntaxKind.OpenBraceToken)) {
            var typePath = parseTypePath((0, _core.Just)(identifier));
            if (isToken(_ast2.SyntaxKind.OpenParenToken)) {
              return _ast.Pattern.TupleType(typePath, parseTuplePattern());
            } else {
              if (isToken(_ast2.SyntaxKind.OpenBraceToken)) {
                return _ast.Pattern.RecordType(typePath, parseRecordPattern());
              } else {
                return _ast.Pattern.UnitType(typePath);
              };
            };
          } else {
            return _ast.Pattern.Identifier(identifier);
          };
        };
      };
    };
  };
  function parseTraitDeclaration() {
    var keyword = consumeToken(_ast2.SyntaxKind.TraitKeyword);
    var name = consumeToken(_ast2.SyntaxKind.Identifier, "identifier");
    var __PUCK__value__7 = void 0;
    if (isToken(_ast2.SyntaxKind.LessThanToken)) {
      __PUCK__value__7 = delimited("<", ">", ",", parseTypeParameter);
    } else {
      __PUCK__value__7 = [];
    };
    var typeParameters = __PUCK__value__7;
    var openBrace = expect(_ast2.SyntaxKind.OpenBraceToken);
    var members = delimited("{", "}", ";", function () {
      return parseFunctionDeclaration(true);
    }, false).map(function (f) {
      if (_core.MaybeTrait['$Maybe'].isNothing.call(f.name)) {
        input.croak("Trait functions must have a name");
      };
      if (_core.MaybeTrait['$Maybe'].isNothing.call(f.returnType)) {
        input.croak("Trait functions must have a return type");
      };
      return f;
    });
    var closeBrace = consumeToken(_ast2.SyntaxKind.CloseBraceToken);
    return {
      kind: _ast2.SyntaxKind.TraitDeclaration,
      keyword: keyword,
      name: name,
      typeParameters: typeParameters,
      openBrace: openBrace,
      members: members,
      closeBrace: closeBrace
    };
  };
  function parseImplDeclaration() {
    var implKeyword = consumeToken(_ast2.SyntaxKind.ImplKeyword);
    var __PUCK__value__8 = void 0;
    if (isToken(_ast2.SyntaxKind.LessThanToken)) {
      __PUCK__value__8 = delimited("<", ">", ",", parseTypeParameter);
    } else {
      __PUCK__value__8 = [];
    };
    var typeParameters = __PUCK__value__8;
    var trait_ = parseTypeBound();
    var forKeyword = consumeToken(_ast2.SyntaxKind.ForKeyword);
    var type_ = parseTypeBound();
    var openBrace = expect(_ast2.SyntaxKind.OpenBraceToken);
    var members = delimited("{", "}", ";", parseFunctionDeclaration, false).map(function (f) {
      if (_core.MaybeTrait['$Maybe'].isNothing.call(f.name)) {
        input.croak("Trait functions must have a name");
      };
      if (_core.MaybeTrait['$Maybe'].isNothing.call(f.returnType)) {
        input.croak("Trait functions must have a return type");
      };
      return f;
    });
    var closeBrace = consumeToken(_ast2.SyntaxKind.CloseBraceToken);
    return {
      kind: _ast2.SyntaxKind.ImplDeclaration,
      implKeyword: implKeyword,
      typeParameters: typeParameters,
      trait_: trait_,
      forKeyword: forKeyword,
      type_: type_,
      openBrace: openBrace,
      members: members,
      closeBrace: closeBrace
    };
  };
  function parseFunctionTypeBound(tuple) {
    var __PUCK__value__9 = void 0;
    if (!tuple && isToken(_ast2.SyntaxKind.LessThanToken)) {
      __PUCK__value__9 = delimited("<", ">", ",", parseTypeParameter);
    } else {
      __PUCK__value__9 = [];
    };
    var typeParameters = __PUCK__value__9;
    var _arguments = tuple || parseTupleTypeBound();
    consumeToken(_ast2.SyntaxKind.EqualsGreaterThanToken);
    var returnType = parseTypeBound();
    return {
      kind: _ast2.SyntaxKind.FunctionTypeBound,
      typeParameters: typeParameters,
      _arguments: _arguments,
      returnType: returnType
    };
  };
  function parseNamedTypeBound() {
    var path = parseTypePath(_core.Nothing);
    var __PUCK__value__10 = void 0;
    if (isToken(_ast2.SyntaxKind.LessThanToken)) {
      __PUCK__value__10 = delimited("<", ">", ",", parseTypeBound);
    } else {
      __PUCK__value__10 = [];
    };
    var typeParameters = __PUCK__value__10;
    return {
      kind: _ast2.SyntaxKind.NamedTypeBound,
      path: path,
      typeParameters: typeParameters
    };
  };
  function parseObjectTypeBound() {
    expect(_ast2.SyntaxKind.OpenBraceToken);
    var openBrace = input.peek();
    var properties = delimited("{", "}", ",", parseTypeProperty, false);
    var closeBrace = consumeToken(_ast2.SyntaxKind.CloseBraceToken);
    return {
      kind: _ast2.SyntaxKind.ObjectTypeBound,
      openBrace: openBrace,
      properties: properties,
      closeBrace: closeBrace
    };
  };
  function parseTupleTypeBound() {
    expect(_ast2.SyntaxKind.OpenParenToken);
    var openParen = input.peek();
    var properties = delimited("(", ")", ",", parseTypeBound, false);
    var closeParen = consumeToken(_ast2.SyntaxKind.CloseParenToken);
    return {
      kind: _ast2.SyntaxKind.TupleTypeBound,
      openParen: openParen,
      properties: properties,
      closeParen: closeParen
    };
  };
  function parseTypeBound() {
    if (isToken(_ast2.SyntaxKind.LessThanToken)) {
      return parseFunctionTypeBound(_js._undefined);
    } else {
      if (isToken(_ast2.SyntaxKind.OpenParenToken)) {
        var tuple = parseTupleTypeBound();
        if (isToken(_ast2.SyntaxKind.EqualsGreaterThanToken)) {
          return parseFunctionTypeBound(tuple);
        } else {
          return tuple;
        };
      } else {
        if (isToken(_ast2.SyntaxKind.OpenBraceToken)) {
          return parseObjectTypeBound();
        } else {
          return parseNamedTypeBound();
        };
      };
    };
  };
  function parseTypeParameter() {
    var name = consumeToken(_ast2.SyntaxKind.Identifier, "identifier");
    var __PUCK__value__11 = void 0;
    if (isToken(_ast2.SyntaxKind.EqualsToken)) {
      input.next();
      __PUCK__value__11 = (0, _core.Just)(parseTypeBound());
    } else {
      __PUCK__value__11 = _core.Nothing;
    };
    var defaultValue = __PUCK__value__11;
    return {
      kind: _ast2.SyntaxKind.TypeParameter,
      name: name,
      defaultValue: defaultValue
    };
  };
  function parseTypePath(identifier) {
    var i = _core.MaybeTrait['$Maybe'].unwrapOrElse.call(identifier, function () {
      return consumeToken(_ast2.SyntaxKind.Identifier, "identifier");
    });
    if (_core.MaybeTrait['$Maybe'].isJust.call(maybeConsumeToken(_ast2.SyntaxKind.ColonColonToken))) {
      return _ast.TypePath._Object(i, parseTypePath(_core.Nothing));
    } else {
      return _ast.TypePath.Member(i);
    };
  };
  function parseTypeProperty() {
    var name = consumeToken(_ast2.SyntaxKind.Identifier, "identifier");
    consumeToken(_ast2.SyntaxKind.ColonToken);
    var typeBound = parseTypeBound();
    return {
      kind: _ast2.SyntaxKind.TypeProperty,
      name: name,
      typeBound: typeBound
    };
  };
  function parseTypeDeclaration() {
    var keyword = consumeToken(_ast2.SyntaxKind.TypeKeyword);
    var name = consumeToken(_ast2.SyntaxKind.Identifier, "identifier");
    var __PUCK__value__12 = void 0;
    if (isToken(_ast2.SyntaxKind.LessThanToken)) {
      __PUCK__value__12 = delimited("<", ">", ",", parseTypeParameter);
    } else {
      __PUCK__value__12 = [];
    };
    var typeParameters = __PUCK__value__12;
    var __PUCK__value__13 = void 0;
    if (isToken(_ast2.SyntaxKind.OpenBraceToken)) {
      __PUCK__value__13 = (0, _core.Just)(parseObjectTypeBound());
    } else {
      var __PUCK__value__14 = void 0;
      if (isToken(_ast2.SyntaxKind.OpenParenToken)) {
        __PUCK__value__14 = (0, _core.Just)(parseTupleTypeBound());
      } else {
        __PUCK__value__14 = _core.Nothing;
      };
      __PUCK__value__13 = __PUCK__value__14;
    };
    var bound = __PUCK__value__13;
    return {
      kind: _ast2.SyntaxKind.TypeDeclaration,
      name: name,
      typeParameters: typeParameters,
      bound: bound
    };
  };
  function parseVariableDeclaration() {
    var mutable = _core.MaybeTrait['$Maybe'].isJust.call(maybeConsumeToken(_ast2.SyntaxKind.MutKeyword));
    var pattern = parsePattern();
    return {
      kind: _ast2.SyntaxKind.VariableDeclaration,
      pattern: pattern,
      mutable: mutable,
      typeBound: _core.MaybeTrait['$Maybe'].map.call(maybeConsumeToken(_ast2.SyntaxKind.ColonToken), function (__PUCK__value__15) {
        return parseTypeBound();
      }),
      initializer: _core.MaybeTrait['$Maybe'].map.call(maybeConsumeToken(_ast2.SyntaxKind.EqualsToken), function (__PUCK__value__16) {
        return parseExpression();
      })
    };
  };
  function parseFunctionDeclaration() {
    var optionalBody = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

    consumeToken(_ast2.SyntaxKind.FnKeyword);
    var name = maybeConsumeToken(_ast2.SyntaxKind.Identifier, "identifier");
    if (isToken(_ast2.SyntaxKind.Identifier)) {
      (0, _core.Just)(consumeToken(_ast2.SyntaxKind.Identifier, "identifier"));
    } else {
      _core.Nothing;
    };
    var __PUCK__value__17 = void 0;
    if (isToken(_ast2.SyntaxKind.LessThanToken)) {
      __PUCK__value__17 = delimited("<", ">", ",", parseTypeParameter);
    } else {
      __PUCK__value__17 = [];
    };
    var typeParameters = __PUCK__value__17;
    var parameterList = delimited("(", ")", ",", parseVariableDeclaration);
    var __PUCK__value__18 = void 0;
    if (isToken(_ast2.SyntaxKind.ColonToken)) {
      input.next();
      __PUCK__value__18 = (0, _core.Just)(parseTypeBound());
    } else {
      __PUCK__value__18 = _core.Nothing;
    };
    var returnType = __PUCK__value__18;
    var __PUCK__value__19 = void 0;
    if (isToken(_ast2.SyntaxKind.OpenBraceToken)) {
      __PUCK__value__19 = parseBlock();
    } else {
      var __PUCK__value__20 = void 0;
      if (isToken(_ast2.SyntaxKind.ThenKeyword)) {
        skipKeyword(_ast2.SyntaxKind.ThenKeyword);
        __PUCK__value__20 = {
          kind: _ast2.SyntaxKind.Block,
          expressions: [parseExpression()]
        };
      } else {
        var __PUCK__value__21 = void 0;
        if (!optionalBody) {
          __PUCK__value__21 = input.croak("A function declaration must be followed by a `{` or `then`");
        };
        __PUCK__value__20 = __PUCK__value__21;
      };
      __PUCK__value__19 = __PUCK__value__20;
    };
    var body = __PUCK__value__19;
    return {
      kind: _ast2.SyntaxKind.Function,
      name: name,
      typeParameters: typeParameters,
      parameterList: parameterList,
      returnType: returnType,
      body: body
    };
  };
  function parseLambda() {
    var parameterList = delimited("|", "|", ",", parseVariableDeclaration);
    var __PUCK__value__22 = void 0;
    if (isToken(_ast2.SyntaxKind.OpenBraceToken)) {
      __PUCK__value__22 = parseBlock();
    } else {
      __PUCK__value__22 = {
        kind: _ast2.SyntaxKind.Block,
        expressions: [parseExpression()]
      };
    };
    var body = __PUCK__value__22;
    return {
      kind: _ast2.SyntaxKind.Function,
      name: _core.Nothing,
      parameterList: parameterList,
      returnType: _core.Nothing,
      body: body
    };
  };
  function parseIfLet(ifKeyword) {
    var letKeyword = skipKeyword(_ast2.SyntaxKind.LetKeyword);
    var pattern = parsePattern();
    var equalsToken = consumeToken(_ast2.SyntaxKind.EqualsToken);
    var expression = parseExpression();
    var __PUCK__value__23 = void 0;
    if (isToken(_ast2.SyntaxKind.OpenBraceToken)) {
      __PUCK__value__23 = parseBlock();
    } else {
      skipKeyword(_ast2.SyntaxKind.ThenKeyword);
      __PUCK__value__23 = {
        kind: _ast2.SyntaxKind.Block,
        expressions: [parseExpression()]
      };
    };
    var then_ = __PUCK__value__23;
    var __PUCK__value__24 = void 0;
    if (isToken(_ast2.SyntaxKind.ElseKeyword)) {
      input.next();
      var __PUCK__value__25 = void 0;
      if (isToken(_ast2.SyntaxKind.OpenBraceToken)) {
        __PUCK__value__25 = parseBlock();
      } else {
        __PUCK__value__25 = {
          kind: _ast2.SyntaxKind.Block,
          expressions: [parseExpression()]
        };
      };
      __PUCK__value__24 = (0, _core.Just)(__PUCK__value__25);
    } else {
      __PUCK__value__24 = _core.Nothing;
    };
    return {
      kind: _ast2.SyntaxKind.IfLetExpression,
      letKeyword: letKeyword,
      variableDeclaration: {
        kind: _ast2.SyntaxKind.VariableDeclaration,
        pattern: pattern,
        mutable: false,
        typeBound: _core.Nothing,
        initializer: (0, _core.Just)(expression)
      },
      then_: then_,
      else_: __PUCK__value__24
    };
  };
  function parseIfCondition(ifKeyword) {
    var condition = parseExpression();
    var __PUCK__value__26 = void 0;
    if (isToken(_ast2.SyntaxKind.OpenBraceToken)) {
      __PUCK__value__26 = parseBlock();
    } else {
      skipKeyword(_ast2.SyntaxKind.ThenKeyword);
      __PUCK__value__26 = {
        kind: _ast2.SyntaxKind.Block,
        expressions: [parseExpression()]
      };
    };
    var then_ = __PUCK__value__26;
    var __PUCK__value__27 = void 0;
    if (isToken(_ast2.SyntaxKind.ElseKeyword)) {
      input.next();
      var __PUCK__value__28 = void 0;
      if (isToken(_ast2.SyntaxKind.OpenBraceToken)) {
        __PUCK__value__28 = parseBlock();
      } else {
        __PUCK__value__28 = {
          kind: _ast2.SyntaxKind.Block,
          expressions: [parseExpression()]
        };
      };
      __PUCK__value__27 = (0, _core.Just)(__PUCK__value__28);
    } else {
      __PUCK__value__27 = _core.Nothing;
    };
    return {
      kind: _ast2.SyntaxKind.IfExpression,
      condition: condition,
      then_: then_,
      else_: __PUCK__value__27
    };
  };
  function parseIf() {
    var ifKeyword = skipKeyword(_ast2.SyntaxKind.IfKeyword);
    if (isToken(_ast2.SyntaxKind.LetKeyword)) {
      return parseIfLet(ifKeyword);
    } else {
      return parseIfCondition(ifKeyword);
    };
  };
  function parseMatch() {
    return {
      kind: _ast2.SyntaxKind.MatchExpression,
      matchKeyword: skipKeyword(_ast2.SyntaxKind.MatchKeyword),
      expression: parseExpression(),
      openBrace: input.peek(),
      patterns: delimited("{", "}", ",", parseMatchArm, false),
      closeBrace: consumeToken(_ast2.SyntaxKind.CloseBraceToken)
    };
  };
  function parseMatchArm() {
    return {
      pattern: parsePattern(),
      arrow: consumeToken(_ast2.SyntaxKind.EqualsGreaterThanToken),
      expression: parseExpression()
    };
  };
  function parseUnaryExpression() {
    var operator = input.next();
    return {
      kind: _ast2.SyntaxKind.UnaryExpression,
      operator: operator,
      rhs: parseExpression(_ast2.precedence[operator.kind])
    };
  };
  function parseWhile() {
    skipKeyword(_ast2.SyntaxKind.WhileKeyword);
    var condition = parseExpression();
    var __PUCK__value__29 = void 0;
    if (isToken(_ast2.SyntaxKind.OpenBraceToken)) {
      __PUCK__value__29 = parseBlock();
    } else {
      skipKeyword(_ast2.SyntaxKind.ThenKeyword);
      __PUCK__value__29 = {
        kind: _ast2.SyntaxKind.Block,
        expressions: [parseExpression()]
      };
    };
    var body = __PUCK__value__29;
    return {
      kind: _ast2.SyntaxKind.WhileExpression,
      condition: condition,
      body: body
    };
  };
  function parseListLiteral() {
    var members = delimited("[", "]", ",", parseExpression);
    return {
      kind: _ast2.SyntaxKind.ListLiteral,
      members: members
    };
  };
  function parseObjectLiteralMember() {
    var name = consumeToken(_ast2.SyntaxKind.Identifier, "identifier");
    var __PUCK__value__30 = void 0;
    if (isToken(_ast2.SyntaxKind.ColonToken)) {
      input.next();
      __PUCK__value__30 = parseExpression();
    } else {
      __PUCK__value__30 = name;
    };
    var value = __PUCK__value__30;
    return {
      kind: _ast2.SyntaxKind.ObjectLiteralMember,
      name: name,
      value: value
    };
  };
  function parseObjectLiteral() {
    var openBrace = input.peek();
    var members = delimited("{", "}", ",", parseObjectLiteralMember, false);
    var closeBrace = consumeToken(_ast2.SyntaxKind.CloseBraceToken);
    return {
      kind: _ast2.SyntaxKind.ObjectLiteral,
      openBrace: openBrace,
      members: members,
      closeBrace: closeBrace
    };
  };
  function parseTupleOrExpression(forceTuple) {
    var openParen = input.peek();
    var expressions = delimited("(", ")", ",", function () {
      return parseExpression(0, true);
    }, false);
    var closeParen = consumeToken(_ast2.SyntaxKind.CloseParenToken);
    if (!forceTuple && expressions.length == 1) {
      return expressions[0];
    } else {
      return {
        kind: _ast2.SyntaxKind.TupleLiteral,
        openParen: openParen,
        expressions: expressions,
        closeParen: closeParen
      };
    };
  };
  function parseAtom() {
    var forceTuple = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

    return maybeCall(function innerParseAtom() {
      if (isToken(_ast2.SyntaxKind.OpenParenToken)) {
        return parseTupleOrExpression(forceTuple);
      } else {
        if (isToken(_ast2.SyntaxKind.OpenBracketToken)) {
          return parseListLiteral();
        } else {
          if (isToken(_ast2.SyntaxKind.OpenBraceToken)) {
            return parseObjectLiteral();
          } else {
            if (isToken(_ast2.SyntaxKind.BarToken)) {
              return parseLambda();
            } else {
              if (isToken(_ast2.SyntaxKind.IfKeyword)) {
                return parseIf();
              } else {
                if (isToken(_ast2.SyntaxKind.MatchKeyword)) {
                  return parseMatch();
                } else {
                  if (isToken(_ast2.SyntaxKind.WhileKeyword)) {
                    return parseWhile();
                  } else {
                    if (isToken(_ast2.SyntaxKind.FnKeyword)) {
                      return parseFunctionDeclaration();
                    } else {
                      if (isToken(_ast2.SyntaxKind.LetKeyword)) {
                        input.next();
                        return parseVariableDeclaration();
                      } else {
                        if (isToken(_ast2.SyntaxKind.NotKeyword) || isToken(_ast2.SyntaxKind.MinusToken) || isToken(_ast2.SyntaxKind.PlusToken)) {
                          return parseUnaryExpression();
                        } else {
                          if (isToken(_ast2.SyntaxKind.BreakKeyword)) {
                            return input.next();
                          } else {
                            if (isToken(_ast2.SyntaxKind.ReturnKeyword)) {
                              return {
                                kind: _ast2.SyntaxKind.ReturnStatement,
                                keyword: input.next(),
                                expression: parseExpression()
                              };
                            } else {
                              if (isToken(_ast2.SyntaxKind.ThrowKeyword)) {
                                return {
                                  kind: input.next().kind,
                                  expression: parseExpression()
                                };
                              } else {
                                if (isToken(_ast2.SyntaxKind.TrueKeyword) || isToken(_ast2.SyntaxKind.FalseKeyword)) {
                                  return maybeAccess({
                                    kind: _ast2.SyntaxKind.BooleanLiteral,
                                    value: input.next().kind == _ast2.SyntaxKind.TrueKeyword
                                  });
                                } else {
                                  if (isToken(_ast2.SyntaxKind.NumberLiteral) || isToken(_ast2.SyntaxKind.StringLiteral)) {
                                    return maybeAccess(input.next());
                                  } else {
                                    if (isToken(_ast2.SyntaxKind.Identifier)) {
                                      var identifier = input.next();
                                      if (isToken(_ast2.SyntaxKind.ColonColonToken)) {
                                        return {
                                          kind: _ast2.SyntaxKind.TypePathExpression,
                                          typePath: parseTypePath((0, _core.Just)(identifier))
                                        };
                                      } else {
                                        return maybeAccess(identifier);
                                      };
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
        };
      };
    }());
  };
  function parseExport() {
    var keyword = consumeToken(_ast2.SyntaxKind.ExportKeyword);
    var expression = void 0;
    var identifier = void 0;
    if (isToken(_ast2.SyntaxKind.EnumKeyword)) {
      expression = parseEnumDeclaration();
      identifier = expression.name;
    } else {
      if (isToken(_ast2.SyntaxKind.FnKeyword)) {
        expression = parseFunctionDeclaration();
        var func = expression;
        var __PUCK__value__31 = func.name;
        if (__PUCK__value__31.kind == "Just") {
          var _PUCK__value__31$val = _slicedToArray(__PUCK__value__31.value, 1);

          var name = _PUCK__value__31$val[0];

          identifier = name;
        } else {
          input.croak("Can not export function without a name");
        };
      } else {
        if (isToken(_ast2.SyntaxKind.LetKeyword)) {
          input.next();
          expression = parseVariableDeclaration();
          var __PUCK__value__32 = expression.pattern;
          if (__PUCK__value__32.kind == "Identifier") {
            var _PUCK__value__32$val = _slicedToArray(__PUCK__value__32.value, 1);

            var _name = _PUCK__value__32$val[0];

            identifier = _name;
          } else {
            input.croak("Can not export a let declaration without a identifier pattern");
          };
        } else {
          if (isToken(_ast2.SyntaxKind.TraitKeyword)) {
            expression = parseTraitDeclaration();
            identifier = expression.name;
          } else {
            if (isToken(_ast2.SyntaxKind.TypeKeyword)) {
              expression = parseTypeDeclaration();
              identifier = expression.name;
            } else {
              input.croak("Expected trait, type, function or variable declaration after export");
            };
          };
        };
      };
    };
    return {
      kind: _ast2.SyntaxKind.ExportDirective,
      keyword: keyword,
      identifier: identifier,
      expression: expression
    };
  };
  function parseImport() {
    var importKeyword = consumeToken(_ast2.SyntaxKind.ImportKeyword);
    var locator = consumeToken(_ast2.SyntaxKind.StringLiteral);
    if (locator.parts.length != 1) {
      throw Error("More than one part in import string");
    };
    var parts = locator.parts[0].value.split(":");
    if (parts > 2) {
      input.croak("Illegal token \":\" used in import path");
    };
    var __PUCK__value__33 = void 0;
    if (parts.length == 2) {
      __PUCK__value__33 = (0, _core.Just)(parts[0]);
    } else {
      __PUCK__value__33 = _core.Nothing;
    };
    var domain = __PUCK__value__33;
    var __PUCK__value__34 = void 0;
    if (parts.length == 2) {
      __PUCK__value__34 = parts[1];
    } else {
      __PUCK__value__34 = parts[0];
    };
    var path = __PUCK__value__34;
    var asKeyword = consumeToken(_ast2.SyntaxKind.AsKeyword);
    var __PUCK__value__35 = void 0;
    if (isToken(_ast2.SyntaxKind.OpenBraceToken)) {
      __PUCK__value__35 = parseObjectDestructure();
    } else {
      var __PUCK__value__36 = void 0;
      if (isToken(_ast2.SyntaxKind.AsteriskToken)) {
        __PUCK__value__36 = consumeToken(false);
      } else {
        __PUCK__value__36 = consumeToken(_ast2.SyntaxKind.Identifier, "identifier");
      };
      __PUCK__value__35 = __PUCK__value__36;
    };
    var specifier = __PUCK__value__35;
    return {
      kind: _ast2.SyntaxKind.ImportDirective,
      importKeyword: importKeyword,
      domain: domain,
      path: path,
      asKeyword: asKeyword,
      specifier: specifier
    };
  };
  function parseTopLevelExpression() {
    if (isToken(_ast2.SyntaxKind.EnumKeyword)) {
      return parseEnumDeclaration();
    } else {
      if (isToken(_ast2.SyntaxKind.ExportKeyword)) {
        return parseExport();
      } else {
        if (isToken(_ast2.SyntaxKind.ImplKeyword)) {
          return parseImplDeclaration();
        } else {
          if (isToken(_ast2.SyntaxKind.ImportKeyword)) {
            return parseImport();
          } else {
            if (isToken(_ast2.SyntaxKind.TraitKeyword)) {
              return parseTraitDeclaration();
            } else {
              if (isToken(_ast2.SyntaxKind.TypeKeyword)) {
                return parseTypeDeclaration();
              } else {
                return parseExpression();
              };
            };
          };
        };
      };
    };
  };
  function parseModule() {
    var exports = {};
    var expressions = [];
    while (!input.eof()) {
      var expression = parseTopLevelExpression();
      if (expression) {
        expressions.push(expression);
        if (expression.kind == _ast2.SyntaxKind.ExportDirective) {
          exports[expression.identifier.name] = expression;
        };
      };
      if (!input.eof()) {
        consumeSeparator(_ast2.SyntaxKind.SemicolonToken);
      };
    };
    return {
      kind: _ast2.SyntaxKind.Module,
      fileName: input.file.fileName,
      path: input.file.absolutePath,
      exports: exports,
      expressions: expressions
    };
  };
  function parseBlock() {
    var expressions = delimited("{", "}", ";", parseExpression);
    return {
      kind: _ast2.SyntaxKind.Block,
      expressions: expressions
    };
  };
  function parseExpression() {
    var precedence = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var forceTuple = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    return maybeCall(maybeAccess(maybeBinary(parseAtom(forceTuple), precedence)));
  };
  return parseModule();
}
