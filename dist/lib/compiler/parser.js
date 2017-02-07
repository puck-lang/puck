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
  function isAssignable(expression) {
    var __PUCK__value__2 = expression;
    var __PUCK__value__3 = __PUCK__value__2;
    if ($unwrapTraitObject(__PUCK__value__3).kind == "Identifier") {
      var _PUCK__value__3$valu = _slicedToArray(__PUCK__value__3.value, 1),
          __PUCK__value__4 = _PUCK__value__3$valu[0];

      return true;
    } else {
      var __PUCK__value__5 = __PUCK__value__2;
      if ($unwrapTraitObject(__PUCK__value__5).kind == "MemberAccess") {
        var _PUCK__value__5$valu = _slicedToArray(__PUCK__value__5.value, 1),
            __PUCK__value__6 = _PUCK__value__5$valu[0];

        return true;
      } else {
        var __PUCK__value__7 = __PUCK__value__2;
        if ($unwrapTraitObject(__PUCK__value__7).kind == "IndexAccess") {
          var _PUCK__value__7$valu = _slicedToArray(__PUCK__value__7.value, 1),
              __PUCK__value__8 = _PUCK__value__7$valu[0];

          return true;
        } else {
          var __PUCK__value__9 = __PUCK__value__2;
          if (true) {
            var __PUCK__value__10 = __PUCK__value__9;
            return false;
          };
        };
      };
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
          if (isAssignable(left)) {
            e = _ast.Expression.AssignmentExpression({
              lhs: left,
              token: operator,
              rhs: innerExpression
            });
          } else {
            $unwrapTraitObject(input).croak("Can only assign to an identifier");
          };
        } else {
          e = _ast.Expression.BinaryExpression({
            lhs: left,
            operator: operator,
            rhs: innerExpression
          });
          [];
        };
        return maybeBinary(e, myPrecedence);
      };
    };
    return left;
  };
  function maybeCall(expr) {
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenParenToken, true)) {
      return maybeCall(maybeMemberAccess(_ast.Expression.CallExpression({
        func: expr,
        openParen: $unwrapTraitObject(input).peek(),
        argumentList: delimited("(", ")", ",", parseExpression, false),
        closeParen: consumeToken($unwrapTraitObject(_ast2.SyntaxKind).CloseParenToken)
      })));
    } else {
      return expr;
    };
  };
  function maybeAccess(token) {
    return maybeIndexAccess(maybeMemberAccess(token));
  };
  function maybeMemberAccess(token) {
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).DotToken)) {
      $unwrapTraitObject(input).next();
      return maybeAccess(_ast.Expression.MemberAccess({
        object: token,
        member: consumeToken($unwrapTraitObject(_ast2.SyntaxKind).Identifier, "identifier")
      }));
    } else {
      return token;
    };
  };
  function maybeIndexAccess(token) {
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBracketToken, true)) {
      $unwrapTraitObject(input).next();
      var index = parseExpression();
      consumeToken($unwrapTraitObject(_ast2.SyntaxKind).CloseBracketToken);
      return maybeAccess(_ast.Expression.IndexAccess({
        object: token,
        index: index
      }));
    } else {
      return token;
    };
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
  function parseModule() {
    var exports = {};
    var statements = [];
    while (!$unwrapTraitObject(input).eof()) {
      var statement = parseTopLevelStatement();
      if (statement) {
        _core.List.add.call(statements, statement);
        var __PUCK__value__11 = statement;
        if ($unwrapTraitObject(__PUCK__value__11).kind == "ExportDirective") {
          var _PUCK__value__11$val = _slicedToArray(__PUCK__value__11.value, 1),
              e = _PUCK__value__11$val[0];

          exports[e.identifier.name] = e;
        };
      };
      if (!$unwrapTraitObject(input).eof()) {
        consumeSeparator($unwrapTraitObject(_ast2.SyntaxKind).SemicolonToken);
      };
    };
    return {
      fileName: $unwrapTraitObject($unwrapTraitObject(input).file).fileName,
      path: $unwrapTraitObject($unwrapTraitObject(input).file).absolutePath,
      exports: exports,
      statements: statements
    };
  };
  function parseTopLevelStatement() {
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).EnumKeyword)) {
      return _ast.TopLevelStatement.EnumDeclaration(parseEnumDeclaration());
    } else {
      if (isToken($unwrapTraitObject(_ast2.SyntaxKind).ExportKeyword)) {
        return _ast.TopLevelStatement.ExportDirective(parseExport());
      } else {
        if (isToken($unwrapTraitObject(_ast2.SyntaxKind).ImplKeyword)) {
          return parseImplDeclaration();
        } else {
          if (isToken($unwrapTraitObject(_ast2.SyntaxKind).ImportKeyword)) {
            return _ast.TopLevelStatement.ImportDirective(parseImport());
          } else {
            if (isToken($unwrapTraitObject(_ast2.SyntaxKind).TraitKeyword)) {
              return _ast.TopLevelStatement.TraitDeclaration(parseTraitDeclaration());
            } else {
              if (isToken($unwrapTraitObject(_ast2.SyntaxKind).TypeKeyword)) {
                return _ast.TopLevelStatement.TypeDeclaration(parseTypeDeclaration());
              } else {
                return _ast.TopLevelStatement.BlockLevelStatement(parseBlockLevelStatement());
              };
            };
          };
        };
      };
    };
  };
  function parseBlockLevelStatement() {
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).BreakKeyword)) {
      return _ast.BlockLevelStatement.BreakStatement($unwrapTraitObject(input).next());
    } else {
      if (isToken($unwrapTraitObject(_ast2.SyntaxKind).ReturnKeyword)) {
        return _ast.BlockLevelStatement.ReturnStatement({
          keyword: $unwrapTraitObject(input).next(),
          expression: parseExpression()
        });
      } else {
        if (isToken($unwrapTraitObject(_ast2.SyntaxKind).WhileKeyword)) {
          return _ast.BlockLevelStatement.WhileLoop(parseWhile());
        } else {
          return _ast.BlockLevelStatement.Expression(parseExpression());
        };
      };
    };
  };
  function parseExpression() {
    var precedence = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var forceTuple = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    return maybeCall(maybeAccess(maybeBinary(parseAtom(forceTuple), precedence)));
  };
  function parseAtom() {
    var forceTuple = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var __PUCK__value__12 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenParenToken)) {
      __PUCK__value__12 = parseTupleOrExpression(forceTuple);
    } else {
      var __PUCK__value__13 = void 0;
      if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBracketToken)) {
        __PUCK__value__13 = _ast.Expression.ListLiteral(parseListLiteral());
      } else {
        var __PUCK__value__14 = void 0;
        if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken)) {
          __PUCK__value__14 = _ast.Expression.RecordLiteral(parseRecordLiteral());
        } else {
          var __PUCK__value__15 = void 0;
          if (isToken($unwrapTraitObject(_ast2.SyntaxKind).BarToken)) {
            __PUCK__value__15 = _ast.Expression.FunctionDeclaration(parseLambda());
          } else {
            var __PUCK__value__16 = void 0;
            if (isToken($unwrapTraitObject(_ast2.SyntaxKind).IfKeyword)) {
              __PUCK__value__16 = parseIf();
            } else {
              var __PUCK__value__17 = void 0;
              if (isToken($unwrapTraitObject(_ast2.SyntaxKind).MatchKeyword)) {
                __PUCK__value__17 = _ast.Expression.MatchExpression(parseMatch());
              } else {
                var __PUCK__value__18 = void 0;
                if (isToken($unwrapTraitObject(_ast2.SyntaxKind).FnKeyword)) {
                  __PUCK__value__18 = _ast.Expression.FunctionDeclaration(parseFunctionDeclaration());
                } else {
                  var __PUCK__value__19 = void 0;
                  if (isToken($unwrapTraitObject(_ast2.SyntaxKind).LetKeyword)) {
                    $unwrapTraitObject(input).next();
                    __PUCK__value__19 = _ast.Expression.VariableDeclaration(parseVariableDeclaration());
                  } else {
                    var __PUCK__value__20 = void 0;
                    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).NotKeyword) || isToken($unwrapTraitObject(_ast2.SyntaxKind).MinusToken) || isToken($unwrapTraitObject(_ast2.SyntaxKind).PlusToken)) {
                      __PUCK__value__20 = _ast.Expression.UnaryExpression(parseUnaryExpression());
                    } else {
                      var __PUCK__value__21 = void 0;
                      if (_core.Option.isSome.call(maybeConsumeToken($unwrapTraitObject(_ast2.SyntaxKind).ThrowKeyword))) {
                        __PUCK__value__21 = _ast.Expression.ThrowStatement({ expression: parseExpression() });
                      } else {
                        var __PUCK__value__22 = void 0;
                        if (isToken($unwrapTraitObject(_ast2.SyntaxKind).TrueKeyword) || isToken($unwrapTraitObject(_ast2.SyntaxKind).FalseKeyword)) {
                          __PUCK__value__22 = maybeAccess(_ast.Expression.BooleanLiteral({
                            keyword: $unwrapTraitObject(input).peek(),
                            value: $unwrapTraitObject($unwrapTraitObject(input).next()).kind == $unwrapTraitObject(_ast2.SyntaxKind).TrueKeyword
                          }));
                        } else {
                          var __PUCK__value__23 = void 0;
                          if (isToken($unwrapTraitObject(_ast2.SyntaxKind).NumberLiteral)) {
                            __PUCK__value__23 = maybeAccess(_ast.Expression.NumberLiteral($unwrapTraitObject(input).next()));
                          } else {
                            var __PUCK__value__24 = void 0;
                            if (isToken($unwrapTraitObject(_ast2.SyntaxKind).StringLiteral)) {
                              __PUCK__value__24 = maybeAccess(_ast.Expression.StringLiteral($unwrapTraitObject(input).next()));
                            } else {
                              var __PUCK__value__25 = void 0;
                              if (isToken($unwrapTraitObject(_ast2.SyntaxKind).Identifier)) {
                                __PUCK__value__25 = parseIdentifierOrTypePath();
                              } else {
                                __PUCK__value__25 = unexpected();
                              };
                              __PUCK__value__24 = __PUCK__value__25;
                            };
                            __PUCK__value__23 = __PUCK__value__24;
                          };
                          __PUCK__value__22 = __PUCK__value__23;
                        };
                        __PUCK__value__21 = __PUCK__value__22;
                      };
                      __PUCK__value__20 = __PUCK__value__21;
                    };
                    __PUCK__value__19 = __PUCK__value__20;
                  };
                  __PUCK__value__18 = __PUCK__value__19;
                };
                __PUCK__value__17 = __PUCK__value__18;
              };
              __PUCK__value__16 = __PUCK__value__17;
            };
            __PUCK__value__15 = __PUCK__value__16;
          };
          __PUCK__value__14 = __PUCK__value__15;
        };
        __PUCK__value__13 = __PUCK__value__14;
      };
      __PUCK__value__12 = __PUCK__value__13;
    };
    return maybeCall(__PUCK__value__12);
  };
  function parseEnumDeclaration() {
    var keyword = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).EnumKeyword);
    var name = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).Identifier, "identifier");
    var __PUCK__value__26 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).LessThanToken)) {
      __PUCK__value__26 = delimited("<", ">", ",", parseTypeParameter);
    } else {
      __PUCK__value__26 = [];
    };
    var typeParameters = __PUCK__value__26;
    var openBrace = $unwrapTraitObject(input).peek();
    var members = delimited("{", "}", ",", parseEnumMember, false);
    var closeBrace = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).CloseBraceToken);
    return {
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
    var __PUCK__value__27 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken)) {
      __PUCK__value__27 = (0, _core.Some)(parseRecordTypeBound());
    } else {
      var __PUCK__value__28 = void 0;
      if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenParenToken)) {
        __PUCK__value__28 = (0, _core.Some)(parseTupleTypeBound());
      } else {
        __PUCK__value__28 = _core.None;
      };
      __PUCK__value__27 = __PUCK__value__28;
    };
    var bound = __PUCK__value__27;
    return {
      name: name,
      bound: bound
    };
  };
  function parseImplDeclaration() {
    var implKeyword = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).ImplKeyword);
    var __PUCK__value__29 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).LessThanToken)) {
      __PUCK__value__29 = delimited("<", ">", ",", parseTypeParameter);
    } else {
      __PUCK__value__29 = [];
    };
    var typeParameters = __PUCK__value__29;
    var trait_ = parseTypeBound();
    var __PUCK__value__30 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).ForKeyword)) {
      __PUCK__value__30 = {
        forKeyword: (0, _core.Some)(consumeToken($unwrapTraitObject(_ast2.SyntaxKind).ForKeyword)),
        type_: (0, _core.Some)(parseTypeBound())
      };
    } else {
      __PUCK__value__30 = {
        forKeyword: _core.None,
        type_: _core.None
      };
    };
    var _PUCK__value__ = __PUCK__value__30,
        forKeyword = _PUCK__value__.forKeyword,
        type_ = _PUCK__value__.type_;

    var openBrace = expect($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken);
    var __PUCK__value__31 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: delimited("{", "}", ";", parseFunctionDeclaration, false), $isTraitObject: true }, function (f) {
      if (_core.Option.isNone.call(f.name)) {
        $unwrapTraitObject(input).croak("Trait functions must have a name");
      };
      if (_core.Option.isNone.call(f.returnType)) {
        $unwrapTraitObject(input).croak("Trait functions must have a return type");
      };
      return f;
    });
    var members = _core.Iterable[__PUCK__value__31.type].toList.call(__PUCK__value__31);
    var closeBrace = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).CloseBraceToken);
    var __PUCK__value__32 = type_;
    if ($unwrapTraitObject(__PUCK__value__32).kind == "Some") {
      var _PUCK__value__32$val = _slicedToArray(__PUCK__value__32.value, 1),
          _type_ = _PUCK__value__32$val[0];

      return _ast.TopLevelStatement.ImplDeclaration({
        implKeyword: implKeyword,
        typeParameters: typeParameters,
        trait_: trait_,
        forKeyword: _core.Option.unwrap.call(forKeyword),
        type_: _type_,
        openBrace: openBrace,
        members: members,
        closeBrace: closeBrace
      });
    } else {
      return _ast.TopLevelStatement.ImplShorthandDeclaration({
        implKeyword: implKeyword,
        typeParameters: typeParameters,
        type_: trait_,
        openBrace: openBrace,
        members: members,
        closeBrace: closeBrace
      });
    };
  };
  function parseTraitDeclaration() {
    var keyword = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).TraitKeyword);
    var name = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).Identifier, "identifier");
    var __PUCK__value__33 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).LessThanToken)) {
      __PUCK__value__33 = delimited("<", ">", ",", parseTypeParameter);
    } else {
      __PUCK__value__33 = [];
    };
    var typeParameters = __PUCK__value__33;
    var openBrace = expect($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken);
    var __PUCK__value__34 = _core.Iterable['$List<E>'].map.call({ type: '$List<E>', value: delimited("{", "}", ";", function () {
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
    var members = _core.Iterable[__PUCK__value__34.type].toList.call(__PUCK__value__34);
    var closeBrace = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).CloseBraceToken);
    return {
      keyword: keyword,
      name: name,
      typeParameters: typeParameters,
      openBrace: openBrace,
      members: members,
      closeBrace: closeBrace
    };
  };
  function parseTypeDeclaration() {
    var keyword = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).TypeKeyword);
    var name = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).Identifier, "identifier");
    var __PUCK__value__35 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).LessThanToken)) {
      __PUCK__value__35 = delimited("<", ">", ",", parseTypeParameter);
    } else {
      __PUCK__value__35 = [];
    };
    var typeParameters = __PUCK__value__35;
    var __PUCK__value__36 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken)) {
      __PUCK__value__36 = (0, _core.Some)(parseRecordTypeBound());
    } else {
      var __PUCK__value__37 = void 0;
      if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenParenToken)) {
        __PUCK__value__37 = (0, _core.Some)(parseTupleTypeBound());
      } else {
        __PUCK__value__37 = _core.None;
      };
      __PUCK__value__36 = __PUCK__value__37;
    };
    var bound = __PUCK__value__36;
    return {
      keyword: keyword,
      name: name,
      typeParameters: typeParameters,
      bound: bound,
      type_: _js._undefined
    };
  };
  function parseExport() {
    var keyword = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).ExportKeyword);
    var statement = void 0;
    var identifier = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).EnumKeyword)) {
      var enumDeclaration = parseEnumDeclaration();
      statement = _ast.ExportedStatement.EnumDeclaration(enumDeclaration);
      identifier = enumDeclaration.name;
    } else {
      if (isToken($unwrapTraitObject(_ast2.SyntaxKind).FnKeyword)) {
        var functionDeclaration = parseFunctionDeclaration();
        statement = _ast.ExportedStatement.FunctionDeclaration(functionDeclaration);
        var __PUCK__value__38 = functionDeclaration.name;
        if ($unwrapTraitObject(__PUCK__value__38).kind == "Some") {
          var _PUCK__value__38$val = _slicedToArray(__PUCK__value__38.value, 1),
              name = _PUCK__value__38$val[0];

          identifier = name;
        } else {
          $unwrapTraitObject(input).croak("Can not export function without a name");
        };
      } else {
        if (isToken($unwrapTraitObject(_ast2.SyntaxKind).LetKeyword)) {
          $unwrapTraitObject(input).next();
          var variableDeclaration = parseVariableDeclaration();
          statement = _ast.ExportedStatement.VariableDeclaration(variableDeclaration);
          var __PUCK__value__39 = variableDeclaration.pattern;
          if ($unwrapTraitObject(__PUCK__value__39).kind == "Identifier") {
            var _PUCK__value__39$val = _slicedToArray(__PUCK__value__39.value, 1),
                _name = _PUCK__value__39$val[0];

            identifier = _name;
          } else {
            $unwrapTraitObject(input).croak("Can not export a let declaration without a identifier pattern");
          };
        } else {
          if (isToken($unwrapTraitObject(_ast2.SyntaxKind).TraitKeyword)) {
            var traitDeclaration = parseTraitDeclaration();
            statement = _ast.ExportedStatement.TraitDeclaration(traitDeclaration);
            identifier = traitDeclaration.name;
          } else {
            if (isToken($unwrapTraitObject(_ast2.SyntaxKind).TypeKeyword)) {
              var typeDeclaration = parseTypeDeclaration();
              statement = _ast.ExportedStatement.TypeDeclaration(typeDeclaration);
              identifier = typeDeclaration.name;
            } else {
              $unwrapTraitObject(input).croak("Expected trait, type, function or variable declaration after export");
            };
          };
        };
      };
    };
    return {
      keyword: keyword,
      identifier: identifier,
      statement: statement
    };
  };
  function parseImport() {
    var importKeyword = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).ImportKeyword);
    var locator = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).StringLiteral);
    if ($unwrapTraitObject($unwrapTraitObject(locator).parts).length != 1) {
      throw (0, _js.Error)("More than one part in import string");
    };
    var parts = $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(locator).parts)[0]).value).split(":");
    if (parts > 2) {
      $unwrapTraitObject(input).croak("Illegal token \":\" used in import path");
    };
    var __PUCK__value__40 = void 0;
    if ($unwrapTraitObject(parts).length == 2) {
      __PUCK__value__40 = (0, _core.Some)($unwrapTraitObject(parts)[0]);
    } else {
      __PUCK__value__40 = _core.None;
    };
    var domain = __PUCK__value__40;
    var __PUCK__value__41 = void 0;
    if ($unwrapTraitObject(parts).length == 2) {
      __PUCK__value__41 = $unwrapTraitObject(parts)[1];
    } else {
      __PUCK__value__41 = $unwrapTraitObject(parts)[0];
    };
    var path = __PUCK__value__41;
    var asKeyword = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).AsKeyword);
    var __PUCK__value__42 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken)) {
      __PUCK__value__42 = _ast.ImportSpecifier.ObjectDestructure(parseObjectDestructure());
    } else {
      var __PUCK__value__43 = void 0;
      if (isToken($unwrapTraitObject(_ast2.SyntaxKind).AsteriskToken)) {
        __PUCK__value__43 = _ast.ImportSpecifier.Asterisk(consumeToken(false));
      } else {
        __PUCK__value__43 = _ast.ImportSpecifier.Identifier(consumeToken($unwrapTraitObject(_ast2.SyntaxKind).Identifier, "identifier"));
      };
      __PUCK__value__42 = __PUCK__value__43;
    };
    var specifier = __PUCK__value__42;
    return {
      importKeyword: importKeyword,
      domain: domain,
      path: path,
      asKeyword: asKeyword,
      specifier: specifier
    };
  };
  function parseObjectDestructure() {
    var openBrace = $unwrapTraitObject(input).peek();
    var members = delimited("{", "}", ",", parseObjectDestructureMember, false);
    var closeBrace = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).CloseBraceToken);
    return {
      openBrace: openBrace,
      members: members,
      closeBrace: closeBrace
    };
  };
  function parseObjectDestructureMember() {
    var property = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).Identifier, "identifier");
    var __PUCK__value__44 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).ColonToken)) {
      $unwrapTraitObject(input).next();
      __PUCK__value__44 = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).Identifier, "identifier");
    } else {
      __PUCK__value__44 = property;
    };
    var local = __PUCK__value__44;
    return {
      property: property,
      local: local
    };
  };
  function parseBlock() {
    return {
      statements: delimited("{", "}", ";", parseBlockLevelStatement),
      type_: _js._undefined
    };
  };
  function parseWhile() {
    skipKeyword($unwrapTraitObject(_ast2.SyntaxKind).WhileKeyword);
    var condition = parseExpression();
    var body = parseBlock();
    return {
      condition: condition,
      body: body
    };
  };
  function parseIdentifierOrTypePath() {
    var identifier = $unwrapTraitObject(input).next();
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).ColonColonToken)) {
      return _ast.Expression.TypePathExpression({ typePath: parseTypePath((0, _core.Some)(identifier)) });
    } else {
      return maybeAccess(_ast.Expression.Identifier(identifier));
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
    var __PUCK__value__45 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).LessThanToken)) {
      __PUCK__value__45 = delimited("<", ">", ",", parseTypeParameter);
    } else {
      __PUCK__value__45 = [];
    };
    var typeParameters = __PUCK__value__45;
    var parameterList = delimited("(", ")", ",", parseVariableDeclaration);
    var __PUCK__value__46 = void 0;
    if (_core.Option.isSome.call(maybeConsumeToken($unwrapTraitObject(_ast2.SyntaxKind).MinusGreaterThanToken))) {
      __PUCK__value__46 = (0, _core.Some)(parseTypeBound());
    } else {
      __PUCK__value__46 = _core.None;
    };
    var returnType = __PUCK__value__46;
    var __PUCK__value__47 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken) || !optionalBody) {
      __PUCK__value__47 = (0, _core.Some)(parseBlock());
    } else {
      __PUCK__value__47 = _core.None;
    };
    var body = __PUCK__value__47;
    return {
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
    var __PUCK__value__48 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken)) {
      __PUCK__value__48 = (0, _core.Some)(parseBlock());
    } else {
      __PUCK__value__48 = (0, _core.Some)({
        statements: [parseBlockLevelStatement()],
        type_: _js._undefined
      });
    };
    var body = __PUCK__value__48;
    return {
      name: _core.None,
      typeParameters: [],
      parameterList: parameterList,
      returnType: _core.None,
      body: body,
      type_: _js._undefined
    };
  };
  function parseVariableDeclaration() {
    var mutable = _core.Option.isSome.call(maybeConsumeToken($unwrapTraitObject(_ast2.SyntaxKind).MutKeyword));
    var pattern = parsePattern();
    return {
      pattern: pattern,
      mutable: mutable,
      typeBound: _core.Option.map.call(maybeConsumeToken($unwrapTraitObject(_ast2.SyntaxKind).ColonToken), function (__PUCK__value__49) {
        return parseTypeBound();
      }),
      initializer: _core.Option.map.call(maybeConsumeToken($unwrapTraitObject(_ast2.SyntaxKind).EqualsToken), function (__PUCK__value__50) {
        return parseExpression();
      })
    };
  };
  function parseIf() {
    var ifKeyword = skipKeyword($unwrapTraitObject(_ast2.SyntaxKind).IfKeyword);
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).LetKeyword)) {
      return _ast.Expression.IfLetExpression(parseIfLetExpression(ifKeyword));
    } else {
      return _ast.Expression.IfExpression(parseIfExpression(ifKeyword));
    };
  };
  function parseIfExpression(ifKeyword) {
    var condition = parseExpression();
    var __PUCK__value__51 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken)) {
      __PUCK__value__51 = parseBlock();
    } else {
      skipKeyword($unwrapTraitObject(_ast2.SyntaxKind).ThenKeyword);
      __PUCK__value__51 = {
        statements: [parseBlockLevelStatement()],
        type_: _js._undefined
      };
    };
    var then_ = __PUCK__value__51;
    var __PUCK__value__52 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).ElseKeyword)) {
      $unwrapTraitObject(input).next();
      var __PUCK__value__53 = void 0;
      if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken)) {
        __PUCK__value__53 = parseBlock();
      } else {
        __PUCK__value__53 = {
          statements: [parseBlockLevelStatement()],
          type_: _js._undefined
        };
      };
      __PUCK__value__52 = (0, _core.Some)(__PUCK__value__53);
    } else {
      __PUCK__value__52 = _core.None;
    };
    return {
      ifKeyword: ifKeyword,
      condition: condition,
      then_: then_,
      else_: __PUCK__value__52
    };
  };
  function parseIfLetExpression(ifKeyword) {
    var letKeyword = skipKeyword($unwrapTraitObject(_ast2.SyntaxKind).LetKeyword);
    var pattern = parsePattern();
    var equalsToken = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).EqualsToken);
    var expression = parseExpression();
    var __PUCK__value__54 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken)) {
      __PUCK__value__54 = parseBlock();
    } else {
      skipKeyword($unwrapTraitObject(_ast2.SyntaxKind).ThenKeyword);
      __PUCK__value__54 = {
        statements: [parseBlockLevelStatement()],
        type_: _js._undefined
      };
    };
    var then_ = __PUCK__value__54;
    var __PUCK__value__55 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).ElseKeyword)) {
      $unwrapTraitObject(input).next();
      var __PUCK__value__56 = void 0;
      if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken)) {
        __PUCK__value__56 = parseBlock();
      } else {
        __PUCK__value__56 = {
          statements: [parseBlockLevelStatement()],
          type_: _js._undefined
        };
      };
      __PUCK__value__55 = (0, _core.Some)(__PUCK__value__56);
    } else {
      __PUCK__value__55 = _core.None;
    };
    return {
      ifKeyword: ifKeyword,
      letKeyword: letKeyword,
      pattern: pattern,
      expression: expression,
      then_: then_,
      else_: __PUCK__value__55
    };
  };
  function parseMatch() {
    return {
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
    var __PUCK__value__57 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken)) {
      __PUCK__value__57 = parseBlock();
    } else {
      __PUCK__value__57 = {
        statements: [parseBlockLevelStatement()],
        type_: _js._undefined
      };
    };
    var block = __PUCK__value__57;
    return {
      pattern: pattern,
      arrow: arrow,
      block: block
    };
  };
  function parseUnaryExpression() {
    var operator = $unwrapTraitObject(input).next();
    return {
      operator: operator,
      rhs: parseExpression($unwrapTraitObject(_ast2.precedence)[$unwrapTraitObject($unwrapTraitObject(operator).kind)])
    };
  };
  function parseListLiteral() {
    return { members: delimited("[", "]", ",", parseExpression) };
  };
  function parseRecordLiteral() {
    var openBrace = $unwrapTraitObject(input).peek();
    var members = delimited("{", "}", ",", parseRecordLiteralMember, false);
    var closeBrace = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).CloseBraceToken);
    return {
      openBrace: openBrace,
      members: members,
      closeBrace: closeBrace
    };
  };
  function parseRecordLiteralMember() {
    var name = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).Identifier, "identifier");
    var __PUCK__value__58 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).ColonToken)) {
      $unwrapTraitObject(input).next();
      __PUCK__value__58 = parseExpression();
    } else {
      __PUCK__value__58 = _ast.Expression.Identifier(name);
    };
    var value = __PUCK__value__58;
    return {
      name: name,
      value: value
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
      return _ast.Expression.TupleLiteral({
        openParen: openParen,
        expressions: expressions,
        closeParen: closeParen
      });
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
  function parseRecordPatternMember() {
    var property = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).Identifier, "identifier");
    var __PUCK__value__59 = void 0;
    if (_core.Option.isSome.call(maybeConsumeToken($unwrapTraitObject(_ast2.SyntaxKind).ColonToken))) {
      __PUCK__value__59 = parsePattern();
    } else {
      __PUCK__value__59 = _ast.Pattern.Identifier(property);
    };
    var pattern = __PUCK__value__59;
    return {
      property: property,
      pattern: pattern
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
  function parseTypeBound() {
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).LessThanToken)) {
      return parseFunctionTypeBound(_core.None);
    } else {
      if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenParenToken)) {
        var tuple = parseTupleTypeBound();
        if (isToken($unwrapTraitObject(_ast2.SyntaxKind).MinusGreaterThanToken)) {
          return parseFunctionTypeBound((0, _core.Some)(tuple));
        } else {
          return tuple;
        };
      } else {
        if (isToken($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken)) {
          return parseRecordTypeBound();
        } else {
          return parseNamedTypeBound();
        };
      };
    };
  };
  function parseFunctionTypeBound(tuple) {
    var __PUCK__value__60 = void 0;
    if (_core.Option.isNone.call(tuple) && isToken($unwrapTraitObject(_ast2.SyntaxKind).LessThanToken)) {
      __PUCK__value__60 = delimited("<", ">", ",", parseTypeParameter);
    } else {
      __PUCK__value__60 = [];
    };
    var typeParameters = __PUCK__value__60;
    var parameters = _ast.TypeBound.getTupleTypeBound.call(_core.Option.unwrapOrElse.call(tuple, parseTupleTypeBound));
    consumeToken($unwrapTraitObject(_ast2.SyntaxKind).MinusGreaterThanToken);
    var returnType = parseTypeBound();
    return _ast.TypeBound.FunctionTypeBound({
      typeParameters: typeParameters,
      parameters: parameters,
      returnType: returnType
    });
  };
  function parseNamedTypeBound() {
    var path = parseTypePath(_core.None);
    var __PUCK__value__61 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).LessThanToken)) {
      __PUCK__value__61 = delimited("<", ">", ",", parseTypeBound);
    } else {
      __PUCK__value__61 = [];
    };
    var typeParameters = __PUCK__value__61;
    return _ast.TypeBound.NamedTypeBound({
      path: path,
      typeParameters: typeParameters
    });
  };
  function parseRecordTypeBound() {
    expect($unwrapTraitObject(_ast2.SyntaxKind).OpenBraceToken);
    var openBrace = $unwrapTraitObject(input).peek();
    var properties = delimited("{", "}", ",", parseRecordTypeBoundMember, false);
    var closeBrace = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).CloseBraceToken);
    return _ast.TypeBound.RecordTypeBound({
      openBrace: openBrace,
      properties: properties,
      closeBrace: closeBrace
    });
  };
  function parseRecordTypeBoundMember() {
    var name = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).Identifier, "identifier");
    consumeToken($unwrapTraitObject(_ast2.SyntaxKind).ColonToken);
    var typeBound = parseTypeBound();
    return {
      name: name,
      typeBound: typeBound
    };
  };
  function parseTupleTypeBound() {
    expect($unwrapTraitObject(_ast2.SyntaxKind).OpenParenToken);
    var openParen = $unwrapTraitObject(input).peek();
    var properties = delimited("(", ")", ",", parseTypeBound, false);
    var closeParen = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).CloseParenToken);
    return _ast.TypeBound.TupleTypeBound({
      openParen: openParen,
      properties: properties,
      closeParen: closeParen
    });
  };
  function parseTypeParameter() {
    var name = consumeToken($unwrapTraitObject(_ast2.SyntaxKind).Identifier, "identifier");
    var __PUCK__value__62 = void 0;
    if (isToken($unwrapTraitObject(_ast2.SyntaxKind).EqualsToken)) {
      $unwrapTraitObject(input).next();
      __PUCK__value__62 = (0, _core.Some)(parseTypeBound());
    } else {
      __PUCK__value__62 = _core.None;
    };
    var defaultValue = __PUCK__value__62;
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
  return parseModule();
}
