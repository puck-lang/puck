'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.parse = parse;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _ast = require('./../ast/ast');

var _ast2 = require('./ast');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};

function any(a) {
  return a;
};
function parse(input) {
  function isToken(kind) {
    var withDummy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var token = $unwrapTraitObject(input).peek(withDummy);
    return token && $unwrapTraitObject(token).kind == kind;
  };
  function tokenName(token) {
    if ((0, _js._typeof)($unwrapTraitObject(_ast2.tokenToText)[token.kind]) == "function") {
      return $unwrapTraitObject(_ast2.tokenToText)[token.kind](token);
    } else {
      if ($unwrapTraitObject(_ast2.tokenToText)[token.kind]) {
        return $unwrapTraitObject(_ast2.tokenToText)[token.kind];
      } else {
        return $unwrapTraitObject(_ast2.SyntaxKind)[token.kind];
      };
    };
  };
  function expect(expect) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "token";

    var token = $unwrapTraitObject(input).peek();
    if (!isToken(expect)) {
      var expectedText = ": \"" + tokenName({ kind: expect }) + "\"";
      var __PUCK__value__1 = void 0;
      if (token) {
        var got = tokenName(token);
        __PUCK__value__1 = "got \"" + got + "\"";
      } else {
        __PUCK__value__1 = "reached end of file";
      };
      var but = __PUCK__value__1;
      $unwrapTraitObject(_js.console).error(token);
      $unwrapTraitObject(input).croak("Expected " + name + "" + expectedText + ", but " + but + "");
    };
    return token;
  };
  function consumeToken(token) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "token";

    if (token) {
      expect(token, name);
    };
    return $unwrapTraitObject(input).next();
  };
  function maybeConsumeToken(token) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "token";

    if (isToken(token)) {
      return (0, _core.Some)(consumeToken(token, name));
    } else {
      return _core.None;
    };
  };
  function skipKeyword(kw) {
    expect(kw, "keyword");
    return $unwrapTraitObject(input).next();
  };
  function unexpected() {
    var token = $unwrapTraitObject(input).peek();
    $unwrapTraitObject(_js.console).error("token", token, (0, _js._typeof)(token));
    var name = $unwrapTraitObject(_ast2.tokenToText)[$unwrapTraitObject($unwrapTraitObject(token).kind)];
    return $unwrapTraitObject(input).croak("Unexpected token: " + name + "");
  };
  function consumeSeparator(kind) {
    if (!$unwrapTraitObject(input).eof()) {
      var token = $unwrapTraitObject(input).peek(true);
      if ($unwrapTraitObject(token).kind == $unwrapTraitObject(_ast2.SyntaxKind).NewlineToken || $unwrapTraitObject(token).kind == $unwrapTraitObject(_ast2.SyntaxKind).Comment) {
        return $unwrapTraitObject(input).next(true);
      } else {
        return consumeToken(kind);
      };
    };
  };
  function isAssignment(token) {
    if (!token) {
      return _js._undefined;
    };
    return token.kind == $unwrapTraitObject(_ast2.SyntaxKind).EqualsToken || token.kind == $unwrapTraitObject(_ast2.SyntaxKind).PlusEqualsToken || token.kind == $unwrapTraitObject(_ast2.SyntaxKind).MinusEqualsToken || token.kind == $unwrapTraitObject(_ast2.SyntaxKind).AsteriskEqualsToken || token.kind == $unwrapTraitObject(_ast2.SyntaxKind).AsteriskAsteriskEqualsToken || token.kind == $unwrapTraitObject(_ast2.SyntaxKind).SlashEqualsToken || token.kind == $unwrapTraitObject(_ast2.SyntaxKind).PercentEqualsToken;
  };
  function maybeParseOperator() {
    if (isAssignment($unwrapTraitObject(input).peek()) || isToken($unwrapTraitObject(_ast2.SyntaxKind).EqualsEqualsToken) || isToken($unwrapTraitObject(_ast2.SyntaxKind).ExclamationEqualsToken) || isToken($unwrapTraitObject(_ast2.SyntaxKind).GreaterThanToken) || isToken($unwrapTraitObject(_ast2.SyntaxKind).GreaterThanEqualsToken) || isToken($unwrapTraitObject(_ast2.SyntaxKind).LessThanToken) || isToken($unwrapTraitObject(_ast2.SyntaxKind).LessThanEqualsToken) || isToken($unwrapTraitObject(_ast2.SyntaxKind).PlusToken) || isToken($unwrapTraitObject(_ast2.SyntaxKind).MinusToken) || isToken($unwrapTraitObject(_ast2.SyntaxKind).AsteriskToken) || isToken($unwrapTraitObject(_ast2.SyntaxKind).AsteriskAsteriskToken) || isToken($unwrapTraitObject(_ast2.SyntaxKind).SlashToken) || isToken($unwrapTraitObject(_ast2.SyntaxKind).PercentToken) || isToken($unwrapTraitObject(_ast2.SyntaxKind).AndKeyword) || isToken($unwrapTraitObject(_ast2.SyntaxKind).OrKeyword) || isToken($unwrapTraitObject(_ast2.SyntaxKind).NotKeyword)) {
      return $unwrapTraitObject(input).peek();
    } else {
      return _js._null;
    };
  };
  function maybeBinary(left, myPrecedence) {
    var operator = maybeParseOperator();
    if (operator) {
      var hisPrecedence = $unwrapTraitObject(_ast2.precedence)[operator.kind];
      if (hisPrecedence == _js._undefined) {
        var name = $unwrapTraitObject(_ast2.tokenToText)[operator.kind];
        var json = $unwrapTraitObject($unwrapTraitObject(_js.global).JSON).stringify(operator);
        throw "No precedence for " + name + ": " + json + "";
      };
      if (hisPrecedence > myPrecedence) {
        $unwrapTraitObject(input).next();
        var e = void 0;
        var innerExpression = maybeBinary(parseAtom(), hisPrecedence);
        if (isAssignment(operator)) {
          if ((0, _ast2.isIdentifier)(left) || (0, _ast2.isMember)(left) || (0, _ast2.isIndex)(left)) {
            var a = {
              kind: $unwrapTraitObject(_ast2.SyntaxKind).AssignmentExpression,
              lhs: left,
              token: operator,
              rhs: innerExpression
            };
            e = a;
            [];
          } else {
            $unwrapTraitObject(input).croak("Can only assign to an identifier");
          };
        } else {
          var b = {
            kind: $unwrapTraitObject(_ast2.SyntaxKind).BinaryExpression,
            lhs: left,
            operator: operator,
            rhs: innerExpression
          };
          e = b;
          [];
        };
        return maybeBinary(e, myPrecedence);
      };
    };
    return left;
  };
  function maybeCall(expr) {
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenParenToken, true)) {
      return maybeCall(maybeMemberAccess({
        kind: $unwrapTraitObject(_ast2.SyntaxKind).CallExpression,
        func: expr,
        openParen: $unwrapTraitObject(input).peek(),
        argumentList: delimited("(", ")", ",", parseExpression, false),
        closeParen: consumeToken($unwrapTraitObject(_ast2.SyntaxKind).CloseParenToken)
      }));
    } else {
      return expr;
    };
  };
  function maybeMemberAccess(token) {
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).DotToken)) {
      $unwrapTraitObject(input).next();
      return maybeAccess({
        kind: $unwrapTraitObject(_ast2.SyntaxKind).MemberAccess,
        object: token,
        member: consumeToken($unwrapTraitObject(_ast2.SyntaxKind).Identifier, "identifier")
      });
    } else {
      return token;
    };
  };
  function maybeIndexAccess(token) {
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBracketToken, true)) {
      $unwrapTraitObject(input).next();
      var index = parseExpression();
      consumeToken($unwrapTraitObject(_ast2.SyntaxKind).CloseBracketToken);
      return maybeAccess({
        kind: $unwrapTraitObject(_ast2.SyntaxKind).IndexAccess,
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
    var consumeStop = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

    if ((0, _js._typeof)(start) == "string") {
      start = $unwrapTraitObject(_ast2.textToToken)[$unwrapTraitObject(start)];
    };
    if ((0, _js._typeof)(stop) == "string") {
      stop = $unwrapTraitObject(_ast2.textToToken)[$unwrapTraitObject(stop)];
    };
    if ((0, _js._typeof)(separator) == "string") {
      separator = $unwrapTraitObject(_ast2.textToToken)[$unwrapTraitObject(separator)];
    };
    var parts = [];
    var first = true;
    consumeToken(start);
    while (!$unwrapTraitObject(input).eof()) {
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
    var keyword = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).EnumKeyword);
    var name = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).Identifier, "identifier");
    var __PUCK__value__2 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).LessThanToken)) {
      __PUCK__value__2 = delimited("<", ">", ",", parseTypeParameter);
    } else {
      __PUCK__value__2 = [];
    };
    var typeParameters = __PUCK__value__2;
    var openBrace = $unwrapTraitObject(input).peek();
    var members = delimited("{", "}", ",", parseEnumMember, false);
    var closeBrace = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).CloseBraceToken);
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).EnumDeclaration,
      keyword: keyword,
      name: name,
      typeParameters: typeParameters,
      openBrace: openBrace,
      members: members,
      closeBrace: closeBrace
    };
  };
  function parseEnumMember() {
    var name = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).Identifier, "identifier");
    var __PUCK__value__3 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken)) {
      __PUCK__value__3 = (0, _core.Some)(parseObjectTypeBound());
    } else {
      var __PUCK__value__4 = void 0;
      if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenParenToken)) {
        __PUCK__value__4 = (0, _core.Some)(parseTupleTypeBound());
      } else {
        __PUCK__value__4 = _core.None;
      };
      __PUCK__value__3 = __PUCK__value__4;
    };
    var bound = __PUCK__value__3;
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).EnumMember,
      name: name,
      bound: bound
    };
  };
  function parseObjectDestructureMember() {
    var property = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).Identifier, "identifier");
    var __PUCK__value__5 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).ColonToken)) {
      $unwrapTraitObject(input).next();
      __PUCK__value__5 = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).Identifier, "identifier");
    } else {
      __PUCK__value__5 = property;
    };
    var local = __PUCK__value__5;
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).ObjectDestructureMember,
      property: property,
      local: local
    };
  };
  function parseObjectDestructure() {
    var openBrace = $unwrapTraitObject(input).peek();
    var members = delimited("{", "}", ",", parseObjectDestructureMember, false);
    var closeBrace = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).CloseBraceToken);
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).ObjectDestructure,
      openBrace: openBrace,
      members: members,
      closeBrace: closeBrace
    };
  };
  function parseRecordPatternMember() {
    var property = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).Identifier, "identifier");
    var __PUCK__value__6 = void 0;
    if (_core.Option.isSome.call(maybeConsumeToken($unwrapTraitObject(_ast2.SyntaxKind).ColonToken))) {
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
    var openBrace = expect($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken);
    var properties = delimited("{", "}", ",", parseRecordPatternMember, false);
    var closeBrace = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).CloseBraceToken);
    return {
      openBrace: openBrace,
      properties: properties,
      closeBrace: closeBrace
    };
  };
  function parseTuplePattern() {
    var openParen = expect($unwrapTraitObject(_ast2.SyntaxKind).OpenParenToken);
    var properties = delimited("(", ")", ",", parsePattern, false);
    var closeParen = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).CloseParenToken);
    return {
      openParen: openParen,
      properties: properties,
      closeParen: closeParen
    };
  };
  function parsePattern() {
    if (_core.Option.isSome.call(maybeConsumeToken($unwrapTraitObject(_ast2.SyntaxKind).UnderscoreToken))) {
      return _ast.Pattern.CatchAll;
    } else {
      if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenParenToken)) {
        return _ast.Pattern.Tuple(parseTuplePattern());
      } else {
        if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken)) {
          return _ast.Pattern.Record(parseRecordPattern());
        } else {
          var identifier = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).Identifier, "identifier");
          if (isToken($unwrapTraitObject(_ast2.SyntaxKind).ColonColonToken) || isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenParenToken) || isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken)) {
            var typePath = parseTypePath((0, _core.Some)(identifier));
            if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenParenToken)) {
              return _ast.Pattern.TupleType(typePath, parseTuplePattern());
            } else {
              if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken)) {
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
    var keyword = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).TraitKeyword);
    var name = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).Identifier, "identifier");
    var __PUCK__value__7 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).LessThanToken)) {
      __PUCK__value__7 = delimited("<", ">", ",", parseTypeParameter);
    } else {
      __PUCK__value__7 = [];
    };
    var typeParameters = __PUCK__value__7;
    var openBrace = expect($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken);
    var __PUCK__value__8 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: delimited("{", "}", ";", function () {
        return parseFunctionDeclaration(true);
      }, false), $isTraitObject: true }, function (f) {
      if (_core.Option.isNone.call(f.name)) {
        $unwrapTraitObject(input).croak("Trait functions must have a name");
      };
      if (_core.Option.isNone.call(f.returnType)) {
        $unwrapTraitObject(input).croak("Trait functions must have a return type");
      };
      return f;
    });
    var members = _core.Iterable[__PUCK__value__8.type].toList.call(__PUCK__value__8);
    var closeBrace = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).CloseBraceToken);
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).TraitDeclaration,
      keyword: keyword,
      name: name,
      typeParameters: typeParameters,
      openBrace: openBrace,
      members: members,
      closeBrace: closeBrace
    };
  };
  function parseImplDeclaration() {
    var implKeyword = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).ImplKeyword);
    var __PUCK__value__9 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).LessThanToken)) {
      __PUCK__value__9 = delimited("<", ">", ",", parseTypeParameter);
    } else {
      __PUCK__value__9 = [];
    };
    var typeParameters = __PUCK__value__9;
    var trait_ = parseTypeBound();
    var __PUCK__value__10 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).ForKeyword)) {
      __PUCK__value__10 = {
        forKeyword: (0, _core.Some)(consumeToken($unwrapTraitObject(_ast2.SyntaxKind).ForKeyword)),
        type_: (0, _core.Some)(parseTypeBound())
      };
    } else {
      __PUCK__value__10 = {
        forKeyword: _core.None,
        type_: _core.None
      };
    };
    var _PUCK__value__ = __PUCK__value__10,
        forKeyword = _PUCK__value__.forKeyword,
        type_ = _PUCK__value__.type_;

    var openBrace = expect($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken);
    var __PUCK__value__11 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: delimited("{", "}", ";", parseFunctionDeclaration, false), $isTraitObject: true }, function (f) {
      if (_core.Option.isNone.call(f.name)) {
        $unwrapTraitObject(input).croak("Trait functions must have a name");
      };
      if (_core.Option.isNone.call(f.returnType)) {
        $unwrapTraitObject(input).croak("Trait functions must have a return type");
      };
      return f;
    });
    var members = _core.Iterable[__PUCK__value__11.type].toList.call(__PUCK__value__11);
    var closeBrace = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).CloseBraceToken);
    var __PUCK__value__12 = type_;
    if ($unwrapTraitObject(__PUCK__value__12).kind == "Some") {
      var _PUCK__value__12$val = _slicedToArray(__PUCK__value__12.value, 1),
          _type_ = _PUCK__value__12$val[0];

      return {
        kind: $unwrapTraitObject(_ast2.SyntaxKind).ImplDeclaration,
        implKeyword: implKeyword,
        typeParameters: typeParameters,
        trait_: trait_,
        forKeyword: _core.Option.unwrap.call(forKeyword),
        type_: _type_,
        openBrace: openBrace,
        members: members,
        closeBrace: closeBrace
      };
    } else {
      return {
        kind: $unwrapTraitObject(_ast2.SyntaxKind).ImplShorthandDeclaration,
        implKeyword: implKeyword,
        typeParameters: typeParameters,
        type_: trait_,
        openBrace: openBrace,
        members: members,
        closeBrace: closeBrace
      };
    };
  };
  function parseFunctionTypeBound(tuple) {
    var __PUCK__value__13 = void 0;
    if (!tuple && isToken($unwrapTraitObject(_ast2.SyntaxKind).LessThanToken)) {
      __PUCK__value__13 = delimited("<", ">", ",", parseTypeParameter);
    } else {
      __PUCK__value__13 = [];
    };
    var typeParameters = __PUCK__value__13;
    var _arguments = tuple || parseTupleTypeBound();
    consumeToken($unwrapTraitObject(_ast2.SyntaxKind).MinusGreaterThanToken);
    var returnType = parseTypeBound();
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).FunctionTypeBound,
      typeParameters: typeParameters,
      _arguments: _arguments,
      returnType: returnType
    };
  };
  function parseNamedTypeBound() {
    var path = parseTypePath(_core.None);
    var __PUCK__value__14 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).LessThanToken)) {
      __PUCK__value__14 = delimited("<", ">", ",", parseTypeBound);
    } else {
      __PUCK__value__14 = [];
    };
    var typeParameters = __PUCK__value__14;
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).NamedTypeBound,
      path: path,
      typeParameters: typeParameters
    };
  };
  function parseObjectTypeBound() {
    expect($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken);
    var openBrace = $unwrapTraitObject(input).peek();
    var properties = delimited("{", "}", ",", parseTypeProperty, false);
    var closeBrace = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).CloseBraceToken);
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).ObjectTypeBound,
      openBrace: openBrace,
      properties: properties,
      closeBrace: closeBrace
    };
  };
  function parseTupleTypeBound() {
    expect($unwrapTraitObject(_ast2.SyntaxKind).OpenParenToken);
    var openParen = $unwrapTraitObject(input).peek();
    var properties = delimited("(", ")", ",", parseTypeBound, false);
    var closeParen = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).CloseParenToken);
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).TupleTypeBound,
      openParen: openParen,
      properties: properties,
      closeParen: closeParen
    };
  };
  function parseTypeBound() {
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).LessThanToken)) {
      return any(parseFunctionTypeBound(_js._undefined));
    } else {
      if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenParenToken)) {
        var tuple = parseTupleTypeBound();
        if (isToken($unwrapTraitObject(_ast2.SyntaxKind).MinusGreaterThanToken)) {
          return any(parseFunctionTypeBound(tuple));
        } else {
          return any(tuple);
        };
      } else {
        if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken)) {
          return any(parseObjectTypeBound());
        } else {
          return any(parseNamedTypeBound());
        };
      };
    };
  };
  function parseTypeParameter() {
    var name = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).Identifier, "identifier");
    var __PUCK__value__15 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).EqualsToken)) {
      $unwrapTraitObject(input).next();
      __PUCK__value__15 = (0, _core.Some)(parseTypeBound());
    } else {
      __PUCK__value__15 = _core.None;
    };
    var defaultValue = __PUCK__value__15;
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).TypeParameter,
      name: name,
      defaultValue: defaultValue
    };
  };
  function parseTypePath(identifier) {
    var i = _core.Option.unwrapOrElse.call(identifier, function () {
      return consumeToken($unwrapTraitObject(_ast2.SyntaxKind).Identifier, "identifier");
    });
    if (_core.Option.isSome.call(maybeConsumeToken($unwrapTraitObject(_ast2.SyntaxKind).ColonColonToken))) {
      return _ast.TypePath._Object(i, parseTypePath(_core.None));
    } else {
      return _ast.TypePath.Member(i);
    };
  };
  function parseTypeProperty() {
    var name = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).Identifier, "identifier");
    consumeToken($unwrapTraitObject(_ast2.SyntaxKind).ColonToken);
    var typeBound = parseTypeBound();
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).TypeProperty,
      name: name,
      typeBound: typeBound
    };
  };
  function parseTypeDeclaration() {
    var keyword = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).TypeKeyword);
    var name = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).Identifier, "identifier");
    var __PUCK__value__16 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).LessThanToken)) {
      __PUCK__value__16 = delimited("<", ">", ",", parseTypeParameter);
    } else {
      __PUCK__value__16 = [];
    };
    var typeParameters = __PUCK__value__16;
    var __PUCK__value__17 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken)) {
      __PUCK__value__17 = (0, _core.Some)(parseObjectTypeBound());
    } else {
      var __PUCK__value__18 = void 0;
      if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenParenToken)) {
        __PUCK__value__18 = (0, _core.Some)(parseTupleTypeBound());
      } else {
        __PUCK__value__18 = _core.None;
      };
      __PUCK__value__17 = __PUCK__value__18;
    };
    var bound = __PUCK__value__17;
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).TypeDeclaration,
      keyword: keyword,
      name: name,
      typeParameters: typeParameters,
      bound: bound,
      type_: _js._undefined
    };
  };
  function parseVariableDeclaration() {
    var mutable = _core.Option.isSome.call(maybeConsumeToken($unwrapTraitObject(_ast2.SyntaxKind).MutKeyword));
    var pattern = parsePattern();
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).VariableDeclaration,
      pattern: pattern,
      mutable: mutable,
      typeBound: _core.Option.map.call(maybeConsumeToken($unwrapTraitObject(_ast2.SyntaxKind).ColonToken), function (__PUCK__value__19) {
        return parseTypeBound();
      }),
      initializer: _core.Option.map.call(maybeConsumeToken($unwrapTraitObject(_ast2.SyntaxKind).EqualsToken), function (__PUCK__value__20) {
        return parseExpression();
      })
    };
  };
  function parseFunctionDeclaration() {
    var optionalBody = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    consumeToken($unwrapTraitObject(_ast2.SyntaxKind).FnKeyword);
    var name = maybeConsumeToken($unwrapTraitObject(_ast2.SyntaxKind).Identifier, "identifier");
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).Identifier)) {
      (0, _core.Some)(consumeToken($unwrapTraitObject(_ast2.SyntaxKind).Identifier, "identifier"));
    } else {
      _core.None;
    };
    var __PUCK__value__21 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).LessThanToken)) {
      __PUCK__value__21 = delimited("<", ">", ",", parseTypeParameter);
    } else {
      __PUCK__value__21 = [];
    };
    var typeParameters = __PUCK__value__21;
    var parameterList = delimited("(", ")", ",", parseVariableDeclaration);
    var __PUCK__value__22 = void 0;
    if (_core.Option.isSome.call(maybeConsumeToken($unwrapTraitObject(_ast2.SyntaxKind).MinusGreaterThanToken))) {
      __PUCK__value__22 = (0, _core.Some)(parseTypeBound());
    } else {
      __PUCK__value__22 = _core.None;
    };
    var returnType = __PUCK__value__22;
    var __PUCK__value__23 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken) || !optionalBody) {
      __PUCK__value__23 = (0, _core.Some)(parseBlock());
    } else {
      __PUCK__value__23 = _core.None;
    };
    var body = __PUCK__value__23;
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).Function,
      name: name,
      typeParameters: typeParameters,
      parameterList: parameterList,
      returnType: returnType,
      body: body,
      type_: _js._undefined
    };
  };
  function parseLambda() {
    var parameterList = delimited("|", "|", ",", parseVariableDeclaration);
    var __PUCK__value__24 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken)) {
      __PUCK__value__24 = (0, _core.Some)(parseBlock());
    } else {
      __PUCK__value__24 = (0, _core.Some)({
        kind: $unwrapTraitObject(_ast2.SyntaxKind).Block,
        expressions: [parseExpression()],
        type_: _js._undefined
      });
    };
    var body = __PUCK__value__24;
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).Function,
      name: _core.None,
      typeParameters: [],
      parameterList: parameterList,
      returnType: _core.None,
      body: body,
      type_: _js._undefined
    };
  };
  function parseIfLet(ifKeyword) {
    var letKeyword = skipKeyword($unwrapTraitObject(_ast2.SyntaxKind).LetKeyword);
    var pattern = parsePattern();
    var equalsToken = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).EqualsToken);
    var expression = parseExpression();
    var __PUCK__value__25 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken)) {
      __PUCK__value__25 = parseBlock();
    } else {
      skipKeyword($unwrapTraitObject(_ast2.SyntaxKind).ThenKeyword);
      __PUCK__value__25 = {
        kind: $unwrapTraitObject(_ast2.SyntaxKind).Block,
        expressions: [parseExpression()],
        type_: _js._undefined
      };
    };
    var then_ = __PUCK__value__25;
    var __PUCK__value__26 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).ElseKeyword)) {
      $unwrapTraitObject(input).next();
      var __PUCK__value__27 = void 0;
      if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken)) {
        __PUCK__value__27 = parseBlock();
      } else {
        __PUCK__value__27 = {
          kind: $unwrapTraitObject(_ast2.SyntaxKind).Block,
          expressions: [parseExpression()],
          type_: _js._undefined
        };
      };
      __PUCK__value__26 = (0, _core.Some)(__PUCK__value__27);
    } else {
      __PUCK__value__26 = _core.None;
    };
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).IfLetExpression,
      ifKeyword: ifKeyword,
      letKeyword: letKeyword,
      pattern: pattern,
      expression: expression,
      then_: then_,
      else_: __PUCK__value__26
    };
  };
  function parseIfCondition(ifKeyword) {
    var condition = parseExpression();
    var __PUCK__value__28 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken)) {
      __PUCK__value__28 = parseBlock();
    } else {
      skipKeyword($unwrapTraitObject(_ast2.SyntaxKind).ThenKeyword);
      __PUCK__value__28 = {
        kind: $unwrapTraitObject(_ast2.SyntaxKind).Block,
        expressions: [parseExpression()],
        type_: _js._undefined
      };
    };
    var then_ = __PUCK__value__28;
    var __PUCK__value__29 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).ElseKeyword)) {
      $unwrapTraitObject(input).next();
      var __PUCK__value__30 = void 0;
      if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken)) {
        __PUCK__value__30 = parseBlock();
      } else {
        __PUCK__value__30 = {
          kind: $unwrapTraitObject(_ast2.SyntaxKind).Block,
          expressions: [parseExpression()],
          type_: _js._undefined
        };
      };
      __PUCK__value__29 = (0, _core.Some)(__PUCK__value__30);
    } else {
      __PUCK__value__29 = _core.None;
    };
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).IfExpression,
      ifKeyword: ifKeyword,
      condition: condition,
      then_: then_,
      else_: __PUCK__value__29
    };
  };
  function parseIf() {
    var ifKeyword = skipKeyword($unwrapTraitObject(_ast2.SyntaxKind).IfKeyword);
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).LetKeyword)) {
      return any(parseIfLet(ifKeyword));
    } else {
      return parseIfCondition(ifKeyword);
    };
  };
  function parseMatch() {
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).MatchExpression,
      matchKeyword: skipKeyword($unwrapTraitObject(_ast2.SyntaxKind).MatchKeyword),
      expression: parseExpression(),
      openBrace: $unwrapTraitObject(input).peek(),
      patterns: delimited("{", "}", ",", parseMatchArm, false),
      closeBrace: consumeToken($unwrapTraitObject(_ast2.SyntaxKind).CloseBraceToken)
    };
  };
  function parseMatchArm() {
    var pattern = parsePattern();
    var arrow = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).EqualsGreaterThanToken);
    var __PUCK__value__31 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken)) {
      __PUCK__value__31 = parseBlock();
    } else {
      __PUCK__value__31 = {
        kind: $unwrapTraitObject(_ast2.SyntaxKind).Block,
        expressions: [parseExpression()],
        type_: _js._undefined
      };
    };
    var block = __PUCK__value__31;
    return {
      pattern: pattern,
      arrow: arrow,
      block: block
    };
  };
  function parseUnaryExpression() {
    var operator = $unwrapTraitObject(input).next();
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).UnaryExpression,
      operator: operator,
      rhs: parseExpression($unwrapTraitObject(_ast2.precedence)[$unwrapTraitObject($unwrapTraitObject(operator).kind)])
    };
  };
  function parseWhile() {
    skipKeyword($unwrapTraitObject(_ast2.SyntaxKind).WhileKeyword);
    var condition = parseExpression();
    var body = parseBlock();
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).WhileLoop,
      condition: condition,
      body: body
    };
  };
  function parseListLiteral() {
    var members = delimited("[", "]", ",", parseExpression);
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).ListLiteral,
      members: members
    };
  };
  function parseObjectLiteralMember() {
    var name = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).Identifier, "identifier");
    var __PUCK__value__32 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).ColonToken)) {
      $unwrapTraitObject(input).next();
      __PUCK__value__32 = parseExpression();
    } else {
      __PUCK__value__32 = name;
    };
    var value = __PUCK__value__32;
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).ObjectLiteralMember,
      name: name,
      value: value
    };
  };
  function parseObjectLiteral() {
    var openBrace = $unwrapTraitObject(input).peek();
    var members = delimited("{", "}", ",", parseObjectLiteralMember, false);
    var closeBrace = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).CloseBraceToken);
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).ObjectLiteral,
      openBrace: openBrace,
      members: members,
      closeBrace: closeBrace
    };
  };
  function parseTupleOrExpression(forceTuple) {
    var openParen = $unwrapTraitObject(input).peek();
    var expressions = delimited("(", ")", ",", function () {
      return parseExpression(0, true);
    }, false);
    var closeParen = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).CloseParenToken);
    if (!forceTuple && expressions.length == 1) {
      return expressions[0];
    } else {
      return {
        kind: $unwrapTraitObject(_ast2.SyntaxKind).TupleLiteral,
        openParen: openParen,
        expressions: expressions,
        closeParen: closeParen
      };
    };
  };
  function parseAtom() {
    var forceTuple = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    return maybeCall(function innerParseAtom() {
      if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenParenToken)) {
        return parseTupleOrExpression(forceTuple);
      } else {
        if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBracketToken)) {
          return any(parseListLiteral());
        } else {
          if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken)) {
            return any(parseObjectLiteral());
          } else {
            if (isToken($unwrapTraitObject(_ast2.SyntaxKind).BarToken)) {
              return any(parseLambda());
            } else {
              if (isToken($unwrapTraitObject(_ast2.SyntaxKind).IfKeyword)) {
                return any(parseIf());
              } else {
                if (isToken($unwrapTraitObject(_ast2.SyntaxKind).MatchKeyword)) {
                  return any(parseMatch());
                } else {
                  if (isToken($unwrapTraitObject(_ast2.SyntaxKind).FnKeyword)) {
                    return any(parseFunctionDeclaration());
                  } else {
                    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).LetKeyword)) {
                      $unwrapTraitObject(input).next();
                      return any(parseVariableDeclaration());
                    } else {
                      if (isToken($unwrapTraitObject(_ast2.SyntaxKind).NotKeyword) || isToken($unwrapTraitObject(_ast2.SyntaxKind).MinusToken) || isToken($unwrapTraitObject(_ast2.SyntaxKind).PlusToken)) {
                        return any(parseUnaryExpression());
                      } else {
                        if (isToken($unwrapTraitObject(_ast2.SyntaxKind).BreakKeyword)) {
                          return $unwrapTraitObject(input).next();
                        } else {
                          if (isToken($unwrapTraitObject(_ast2.SyntaxKind).ReturnKeyword)) {
                            return any({
                              kind: $unwrapTraitObject(_ast2.SyntaxKind).ReturnStatement,
                              keyword: $unwrapTraitObject(input).next(),
                              expression: parseExpression()
                            });
                          } else {
                            if (isToken($unwrapTraitObject(_ast2.SyntaxKind).ThrowKeyword)) {
                              return any({
                                kind: $unwrapTraitObject($unwrapTraitObject(input).next()).kind,
                                expression: parseExpression()
                              });
                            } else {
                              if (isToken($unwrapTraitObject(_ast2.SyntaxKind).TrueKeyword) || isToken($unwrapTraitObject(_ast2.SyntaxKind).FalseKeyword)) {
                                return any(maybeAccess({
                                  kind: $unwrapTraitObject(_ast2.SyntaxKind).BooleanLiteral,
                                  value: $unwrapTraitObject($unwrapTraitObject(input).next()).kind == $unwrapTraitObject(_ast2.SyntaxKind).TrueKeyword
                                }));
                              } else {
                                if (isToken($unwrapTraitObject(_ast2.SyntaxKind).NumberLiteral) || isToken($unwrapTraitObject(_ast2.SyntaxKind).StringLiteral)) {
                                  return any(maybeAccess($unwrapTraitObject(input).next()));
                                } else {
                                  if (isToken($unwrapTraitObject(_ast2.SyntaxKind).Identifier)) {
                                    var identifier = $unwrapTraitObject(input).next();
                                    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).ColonColonToken)) {
                                      return any({
                                        kind: $unwrapTraitObject(_ast2.SyntaxKind).TypePathExpression,
                                        typePath: parseTypePath((0, _core.Some)(identifier))
                                      });
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
    }());
  };
  function parseExport() {
    var keyword = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).ExportKeyword);
    var expression = void 0;
    var identifier = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).EnumKeyword)) {
      expression = parseEnumDeclaration();
      identifier = $unwrapTraitObject(expression).name;
      [];
    } else {
      if (isToken($unwrapTraitObject(_ast2.SyntaxKind).FnKeyword)) {
        expression = parseFunctionDeclaration();
        var func = expression;
        var __PUCK__value__33 = func.name;
        if ($unwrapTraitObject(__PUCK__value__33).kind == "Some") {
          var _PUCK__value__33$val = _slicedToArray(__PUCK__value__33.value, 1),
              name = _PUCK__value__33$val[0];

          identifier = name;
        } else {
          $unwrapTraitObject(input).croak("Can not export function without a name");
        };
        [];
      } else {
        if (isToken($unwrapTraitObject(_ast2.SyntaxKind).LetKeyword)) {
          $unwrapTraitObject(input).next();
          expression = parseVariableDeclaration();
          var __PUCK__value__34 = $unwrapTraitObject(expression).pattern;
          if ($unwrapTraitObject(__PUCK__value__34).kind == "Identifier") {
            var _PUCK__value__34$val = _slicedToArray(__PUCK__value__34.value, 1),
                _name = _PUCK__value__34$val[0];

            identifier = _name;
          } else {
            $unwrapTraitObject(input).croak("Can not export a let declaration without a identifier pattern");
          };
          [];
        } else {
          if (isToken($unwrapTraitObject(_ast2.SyntaxKind).TraitKeyword)) {
            expression = parseTraitDeclaration();
            identifier = $unwrapTraitObject(expression).name;
            [];
          } else {
            if (isToken($unwrapTraitObject(_ast2.SyntaxKind).TypeKeyword)) {
              expression = parseTypeDeclaration();
              identifier = $unwrapTraitObject(expression).name;
              [];
            } else {
              $unwrapTraitObject(input).croak("Expected trait, type, function or variable declaration after export");
            };
          };
        };
      };
    };
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).ExportDirective,
      keyword: keyword,
      identifier: identifier,
      expression: expression
    };
  };
  function parseImport() {
    var importKeyword = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).ImportKeyword);
    var locator = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).StringLiteral);
    if ($unwrapTraitObject($unwrapTraitObject(locator).parts).length != 1) {
      throw Error("More than one part in import string");
    };
    var parts = $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(locator).parts)[0]).value).split(":");
    if (parts > 2) {
      $unwrapTraitObject(input).croak("Illegal token \":\" used in import path");
    };
    var __PUCK__value__35 = void 0;
    if ($unwrapTraitObject(parts).length == 2) {
      __PUCK__value__35 = (0, _core.Some)($unwrapTraitObject(parts)[0]);
    } else {
      __PUCK__value__35 = _core.None;
    };
    var domain = __PUCK__value__35;
    var __PUCK__value__36 = void 0;
    if ($unwrapTraitObject(parts).length == 2) {
      __PUCK__value__36 = $unwrapTraitObject(parts)[1];
    } else {
      __PUCK__value__36 = $unwrapTraitObject(parts)[0];
    };
    var path = __PUCK__value__36;
    var asKeyword = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).AsKeyword);
    var __PUCK__value__37 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken)) {
      __PUCK__value__37 = parseObjectDestructure();
    } else {
      var __PUCK__value__38 = void 0;
      if (isToken($unwrapTraitObject(_ast2.SyntaxKind).AsteriskToken)) {
        __PUCK__value__38 = consumeToken(false);
      } else {
        __PUCK__value__38 = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).Identifier, "identifier");
      };
      __PUCK__value__37 = __PUCK__value__38;
    };
    var specifier = __PUCK__value__37;
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).ImportDirective,
      importKeyword: importKeyword,
      domain: domain,
      path: path,
      asKeyword: asKeyword,
      specifier: specifier
    };
  };
  function parseTopLevelExpression() {
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).EnumKeyword)) {
      return any(parseEnumDeclaration());
    } else {
      if (isToken($unwrapTraitObject(_ast2.SyntaxKind).ExportKeyword)) {
        return any(parseExport());
      } else {
        if (isToken($unwrapTraitObject(_ast2.SyntaxKind).ImplKeyword)) {
          return any(parseImplDeclaration());
        } else {
          if (isToken($unwrapTraitObject(_ast2.SyntaxKind).ImportKeyword)) {
            return any(parseImport());
          } else {
            if (isToken($unwrapTraitObject(_ast2.SyntaxKind).TraitKeyword)) {
              return any(parseTraitDeclaration());
            } else {
              if (isToken($unwrapTraitObject(_ast2.SyntaxKind).TypeKeyword)) {
                return any(parseTypeDeclaration());
              } else {
                return any(parseBlockLevelExpression());
              };
            };
          };
        };
      };
    };
  };
  function parseBlockLevelExpression() {
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).WhileKeyword)) {
      return any(parseWhile());
    } else {
      return parseExpression();
    };
  };
  function parseModule() {
    var exports = {};
    var expressions = [];
    while (!$unwrapTraitObject(input).eof()) {
      var expression = parseTopLevelExpression();
      if (expression) {
        expressions.push(expression);
        if ($unwrapTraitObject(expression).kind == $unwrapTraitObject(_ast2.SyntaxKind).ExportDirective) {
          exports[$unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(expression).identifier).name)] = expression;
        };
      };
      if (!$unwrapTraitObject(input).eof()) {
        consumeSeparator($unwrapTraitObject(_ast2.SyntaxKind).SemicolonToken);
      };
    };
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).Module,
      fileName: $unwrapTraitObject($unwrapTraitObject(input).file).fileName,
      path: $unwrapTraitObject($unwrapTraitObject(input).file).absolutePath,
      exports: exports,
      expressions: expressions
    };
  };
  function parseBlock() {
    var expressions = delimited("{", "}", ";", parseBlockLevelExpression);
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).Block,
      expressions: expressions,
      type_: _js._undefined
    };
  };
  function parseExpression() {
    var precedence = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var forceTuple = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    return maybeCall(maybeAccess(maybeBinary(parseAtom(forceTuple), precedence)));
  };
  return parseModule();
}
