'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.parse = parse;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _ast = require('./../ast/ast');

var _token3 = require('./../ast/token');

var _entities = require('./../entities');

var _token_stream = require('./token_stream');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};
function parse(input, file) {
  function isToken(kind) {
    var withDummy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var __PUCK__value__1 = _token_stream.TokenStream.peek.call(input, withDummy);
    if ($unwrapTraitObject(__PUCK__value__1).kind == "SimpleToken") {
      var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__1),
          _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
          token = _$unwrapTraitObject$v[0];

      return token.kind == kind;
    } else {
      if (true) {
        var __PUCK__value__2 = __PUCK__value__1;
        return false;
      };
    };
  };
  function butGot() {
    var __PUCK__value__3 = _token_stream.TokenStream.peek.call(input);
    var __PUCK__value__4 = void 0;
    if ($unwrapTraitObject(__PUCK__value__3).kind == "SimpleToken" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__3).value)[0]).kind).kind == "EndOfFileToken") {
      var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__3),
          _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
          _undefined2 = _$unwrapTraitObject2$[0].kind;

      __PUCK__value__4 = "but reached end of file";
    } else {
      var __PUCK__value__5 = void 0;
      if (true) {
        var _token = __PUCK__value__3;
        __PUCK__value__5 = "but got \"" + _token3.Token.name.call(_token) + "\"";
      };
      __PUCK__value__4 = __PUCK__value__5;
    };
    var __PUCK__value__6 = __PUCK__value__4;;
    var token = __PUCK__value__6;;
    return __PUCK__value__6;
  };
  function expect(kind) {
    var token = _token_stream.TokenStream.peek.call(input);
    var __PUCK__value__7 = token;
    if ($unwrapTraitObject(__PUCK__value__7).kind == "SimpleToken") {
      var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__7),
          _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
          _token2 = _$unwrapTraitObject3$[0];

      if (_token2.kind != kind) {
        _token_stream.TokenStream.croak.call(input, "Expected token: \"" + _token3.SyntaxKind.name.call(kind) + "\", " + butGot());
      };
      return _token2;
    } else {
      if (true) {
        var __PUCK__value__8 = __PUCK__value__7;
        return _token_stream.TokenStream.croak.call(input, "Expected token: \"" + _token3.SyntaxKind.name.call(kind) + "\", " + butGot());
      };
    };
  };
  function consumeToken(kind) {
    var token = expect(kind);
    _token_stream.TokenStream.next.call(input);
    return token;
  };
  function consumeIdentifier() {
    var __PUCK__value__9 = _token_stream.TokenStream.next.call(input);
    if ($unwrapTraitObject(__PUCK__value__9).kind == "Identifier") {
      var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__9),
          _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
          identifier = _$unwrapTraitObject4$[0];

      return identifier;
    } else {
      if (true) {
        var __PUCK__value__10 = __PUCK__value__9;
        return _token_stream.TokenStream.croak.call(input, "Expected identifier, " + butGot());
      };
    };
  };
  function maybeConsumeToken(kind) {
    if (isToken(kind)) {
      return (0, _core.Some)(consumeToken(kind));
    } else {
      return _core.None;
    };
  };
  function unexpected() {
    var name = _token3.Token.name.call(_token_stream.TokenStream.peek.call(input));
    return _token_stream.TokenStream.croak.call(input, "Unexpected token: " + name + "");
  };
  function attributeNotSupported() {
    return _token_stream.TokenStream.croak.call(input, "Attributes are only supported on enum, trait and type declarations");
  };
  function consumeSeparator(kind) {
    var token = _token_stream.TokenStream.peek.call(input, true);
    var __PUCK__value__11 = token;
    if ($unwrapTraitObject(__PUCK__value__11).kind == "SimpleToken" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__11).value)[0]).kind).kind == "NewlineToken") {
      var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__11),
          _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
          _undefined3 = _$unwrapTraitObject5$[0].kind;

      _token_stream.TokenStream.next.call(input, true);
    } else {
      if ($unwrapTraitObject(__PUCK__value__11).kind == "Comment") {
        var _undefined4 = $unwrapTraitObject(__PUCK__value__11);
        _token_stream.TokenStream.next.call(input, true);
      } else {
        if (true) {
          var __PUCK__value__12 = __PUCK__value__11;
          consumeToken(kind);
        };
      };
    };
  };
  function isAssignment(token) {
    var __PUCK__value__13 = token.kind;
    if ($unwrapTraitObject(__PUCK__value__13).kind == "EqualsToken") {
      var _undefined5 = $unwrapTraitObject(__PUCK__value__13);
      return true;
    } else {
      if ($unwrapTraitObject(__PUCK__value__13).kind == "PlusEqualsToken") {
        var _undefined6 = $unwrapTraitObject(__PUCK__value__13);
        return true;
      } else {
        if ($unwrapTraitObject(__PUCK__value__13).kind == "MinusEqualsToken") {
          var _undefined7 = $unwrapTraitObject(__PUCK__value__13);
          return true;
        } else {
          if ($unwrapTraitObject(__PUCK__value__13).kind == "AsteriskEqualsToken") {
            var _undefined8 = $unwrapTraitObject(__PUCK__value__13);
            return true;
          } else {
            if ($unwrapTraitObject(__PUCK__value__13).kind == "AsteriskAsteriskEqualsToken") {
              var _undefined9 = $unwrapTraitObject(__PUCK__value__13);
              return true;
            } else {
              if ($unwrapTraitObject(__PUCK__value__13).kind == "SlashEqualsToken") {
                var _undefined10 = $unwrapTraitObject(__PUCK__value__13);
                return true;
              } else {
                if ($unwrapTraitObject(__PUCK__value__13).kind == "PercentEqualsToken") {
                  var _undefined11 = $unwrapTraitObject(__PUCK__value__13);
                  return true;
                } else {
                  if (true) {
                    var __PUCK__value__14 = __PUCK__value__13;
                    return false;
                  };
                };
              };
            };
          };
        };
      };
    };
  };
  function maybeParseOperator() {
    var __PUCK__value__15 = _token_stream.TokenStream.peek.call(input);
    if ($unwrapTraitObject(__PUCK__value__15).kind == "SimpleToken") {
      var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__15),
          _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
          token = _$unwrapTraitObject6$[0];

      var __PUCK__value__16 = token.kind;
      if ($unwrapTraitObject(__PUCK__value__16).kind == "EqualsEqualsToken") {
        var _undefined12 = $unwrapTraitObject(__PUCK__value__16);
        return (0, _core.Some)(token);
      } else {
        if ($unwrapTraitObject(__PUCK__value__16).kind == "ExclamationEqualsToken") {
          var _undefined13 = $unwrapTraitObject(__PUCK__value__16);
          return (0, _core.Some)(token);
        } else {
          if ($unwrapTraitObject(__PUCK__value__16).kind == "GreaterThanToken") {
            var _undefined14 = $unwrapTraitObject(__PUCK__value__16);
            return (0, _core.Some)(token);
          } else {
            if ($unwrapTraitObject(__PUCK__value__16).kind == "GreaterThanEqualsToken") {
              var _undefined15 = $unwrapTraitObject(__PUCK__value__16);
              return (0, _core.Some)(token);
            } else {
              if ($unwrapTraitObject(__PUCK__value__16).kind == "LessThanToken") {
                var _undefined16 = $unwrapTraitObject(__PUCK__value__16);
                return (0, _core.Some)(token);
              } else {
                if ($unwrapTraitObject(__PUCK__value__16).kind == "LessThanEqualsToken") {
                  var _undefined17 = $unwrapTraitObject(__PUCK__value__16);
                  return (0, _core.Some)(token);
                } else {
                  if ($unwrapTraitObject(__PUCK__value__16).kind == "PlusToken") {
                    var _undefined18 = $unwrapTraitObject(__PUCK__value__16);
                    return (0, _core.Some)(token);
                  } else {
                    if ($unwrapTraitObject(__PUCK__value__16).kind == "MinusToken") {
                      var _undefined19 = $unwrapTraitObject(__PUCK__value__16);
                      return (0, _core.Some)(token);
                    } else {
                      if ($unwrapTraitObject(__PUCK__value__16).kind == "AsteriskToken") {
                        var _undefined20 = $unwrapTraitObject(__PUCK__value__16);
                        return (0, _core.Some)(token);
                      } else {
                        if ($unwrapTraitObject(__PUCK__value__16).kind == "AsteriskAsteriskToken") {
                          var _undefined21 = $unwrapTraitObject(__PUCK__value__16);
                          return (0, _core.Some)(token);
                        } else {
                          if ($unwrapTraitObject(__PUCK__value__16).kind == "SlashToken") {
                            var _undefined22 = $unwrapTraitObject(__PUCK__value__16);
                            return (0, _core.Some)(token);
                          } else {
                            if ($unwrapTraitObject(__PUCK__value__16).kind == "PercentToken") {
                              var _undefined23 = $unwrapTraitObject(__PUCK__value__16);
                              return (0, _core.Some)(token);
                            } else {
                              if ($unwrapTraitObject(__PUCK__value__16).kind == "AndKeyword") {
                                var _undefined24 = $unwrapTraitObject(__PUCK__value__16);
                                return (0, _core.Some)(token);
                              } else {
                                if ($unwrapTraitObject(__PUCK__value__16).kind == "OrKeyword") {
                                  var _undefined25 = $unwrapTraitObject(__PUCK__value__16);
                                  return (0, _core.Some)(token);
                                } else {
                                  if ($unwrapTraitObject(__PUCK__value__16).kind == "NotKeyword") {
                                    var _undefined26 = $unwrapTraitObject(__PUCK__value__16);
                                    return (0, _core.Some)(token);
                                  } else {
                                    if (true) {
                                      var __PUCK__value__17 = __PUCK__value__16;
                                      if (isAssignment(token)) {
                                        return (0, _core.Some)(token);
                                      } else {
                                        return _core.None;
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
      };
    } else {
      if (true) {
        var __PUCK__value__18 = __PUCK__value__15;
        return _core.None;
      };
    };
  };
  function isAssignable(expression) {
    var __PUCK__value__19 = expression;
    if ($unwrapTraitObject(__PUCK__value__19).kind == "Identifier") {
      var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__19),
          _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
          __PUCK__value__20 = _$unwrapTraitObject7$[0];

      return true;
    } else {
      if ($unwrapTraitObject(__PUCK__value__19).kind == "MemberAccess") {
        var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__19),
            _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
            __PUCK__value__21 = _$unwrapTraitObject8$[0];

        return true;
      } else {
        if ($unwrapTraitObject(__PUCK__value__19).kind == "IndexAccess") {
          var _$unwrapTraitObject9 = $unwrapTraitObject(__PUCK__value__19),
              _$unwrapTraitObject9$ = _slicedToArray(_$unwrapTraitObject9.value, 1),
              __PUCK__value__22 = _$unwrapTraitObject9$[0];

          return true;
        } else {
          if ($unwrapTraitObject(__PUCK__value__19).kind == "UnknownAccess") {
            var _$unwrapTraitObject10 = $unwrapTraitObject(__PUCK__value__19),
                _$unwrapTraitObject11 = _slicedToArray(_$unwrapTraitObject10.value, 1),
                __PUCK__value__23 = _$unwrapTraitObject11[0];

            return true;
          } else {
            if ($unwrapTraitObject(__PUCK__value__19).kind == "UnknownIndexAccess") {
              var _$unwrapTraitObject12 = $unwrapTraitObject(__PUCK__value__19),
                  _$unwrapTraitObject13 = _slicedToArray(_$unwrapTraitObject12.value, 1),
                  __PUCK__value__24 = _$unwrapTraitObject13[0];

              return true;
            } else {
              if (true) {
                var __PUCK__value__25 = __PUCK__value__19;
                return false;
              };
            };
          };
        };
      };
    };
  };
  function maybeBinary(left, myPrecedence) {
    var __PUCK__value__26 = maybeParseOperator();
    if (__PUCK__value__26.kind == "Some") {
      var _PUCK__value__26$val = _slicedToArray(__PUCK__value__26.value, 1),
          operator = _PUCK__value__26$val[0];

      var hisPrecedence = _token3.SyntaxKind.precedence.call(operator.kind);
      if (hisPrecedence > myPrecedence) {
        _token_stream.TokenStream.next.call(input);
        var innerExpression = maybeBinary(parseAtom(), hisPrecedence);
        var __PUCK__value__27 = void 0;
        if (isAssignment(operator)) {
          if (!isAssignable(left)) {
            _token_stream.TokenStream.croak.call(input, "Can only assign to an identifier");
          };
          __PUCK__value__27 = _ast.Expression.AssignmentExpression({
            lhs: left,
            token: operator,
            rhs: innerExpression
          });
        } else {
          __PUCK__value__27 = _ast.Expression.BinaryExpression({
            lhs: left,
            operator: operator,
            rhs: innerExpression
          });
        };
        var e = __PUCK__value__27;
        return maybeBinary(e, myPrecedence);
      };
    };
    return left;
  };
  function maybeCall(expression) {
    if (isToken(_token3.SyntaxKind.OpenParenToken, true)) {
      return maybeCall(maybeAccess(_ast.Expression.CallExpression({
        func: expression,
        openParen: expect(_token3.SyntaxKind.OpenParenToken),
        argumentList: delimited(_token3.SyntaxKind.OpenParenToken, _token3.SyntaxKind.CloseParenToken, _token3.SyntaxKind.CommaToken, parseExpression, false),
        closeParen: consumeToken(_token3.SyntaxKind.CloseParenToken)
      })));
    } else {
      return expression;
    };
  };
  function maybeAccess(expression) {
    return maybeUnknownAccess(maybeIndexAccess(maybeMemberAccess(expression)));
  };
  function maybeMemberAccess(expression) {
    if (isToken(_token3.SyntaxKind.DotToken)) {
      _token_stream.TokenStream.next.call(input);
      return maybeAccess(_ast.Expression.MemberAccess({
        object: expression,
        member: consumeIdentifier()
      }));
    } else {
      return expression;
    };
  };
  function maybeIndexAccess(expression) {
    if (isToken(_token3.SyntaxKind.OpenBracketToken, true)) {
      var openBracket = consumeToken(_token3.SyntaxKind.OpenBracketToken);
      var index = parseExpression();
      var closeBracket = consumeToken(_token3.SyntaxKind.CloseBracketToken);
      return maybeAccess(_ast.Expression.IndexAccess({
        object: expression,
        openBracket: openBracket,
        index: index,
        closeBracket: closeBracket
      }));
    } else {
      return expression;
    };
  };
  function maybeUnknownAccess(expression) {
    if (isToken(_token3.SyntaxKind.MinusGreaterThanToken)) {
      _token_stream.TokenStream.next.call(input);
      if (isToken(_token3.SyntaxKind.OpenBracketToken)) {
        var openBracket = consumeToken(_token3.SyntaxKind.OpenBracketToken);
        var index = parseExpression();
        var closeBracket = consumeToken(_token3.SyntaxKind.CloseBracketToken);
        return maybeAccess(_ast.Expression.UnknownIndexAccess({
          object: expression,
          openBracket: openBracket,
          index: index,
          closeBracket: closeBracket
        }));
      } else {
        return maybeAccess(_ast.Expression.UnknownAccess({
          object: expression,
          member: consumeIdentifier()
        }));
      };
    } else {
      return expression;
    };
  };
  function delimited(start, stop, separator, parser, consumeStop) {
    var parts = [];
    var first = true;
    consumeToken(start);
    while (!_token_stream.TokenStream.eof.call(input)) {
      if (isToken(stop)) {
        break;
      };
      if (first) {
        first = false;
      } else {
        consumeSeparator(separator);
      };
      var part = void 0;
      while (!part) {
        if (isToken(stop)) {
          break;
        };
        part = parser();
      };
      if (part) {
        _core.List.push.call(parts, part);
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
    while (!_token_stream.TokenStream.eof.call(input)) {
      var statement = parseTopLevelStatement();
      _core.List.push.call(statements, statement);
      var __PUCK__value__28 = statement;
      if (__PUCK__value__28.kind == "ExportDirective") {
        var _PUCK__value__28$val = _slicedToArray(__PUCK__value__28.value, 1),
            e = _PUCK__value__28$val[0];

        exports[e.identifier.name] = e;
      };
      consumeSeparator(_token3.SyntaxKind.SemicolonToken);
    };
    return {
      fileName: file.fileName,
      path: file.absolutePath,
      exports: exports,
      statements: statements,
      file: $unwrapTraitObject(_js._undefined),
      scope: _js._undefined
    };
  };
  function parseTopLevelStatement() {
    var __PUCK__value__29 = _token_stream.TokenStream.peek.call(input);
    if ($unwrapTraitObject(__PUCK__value__29).kind == "SimpleToken") {
      var _$unwrapTraitObject14 = $unwrapTraitObject(__PUCK__value__29),
          _$unwrapTraitObject15 = _slicedToArray(_$unwrapTraitObject14.value, 1),
          token = _$unwrapTraitObject15[0];

      var __PUCK__value__30 = token.kind;
      if ($unwrapTraitObject(__PUCK__value__30).kind == "HashToken") {
        var _undefined27 = $unwrapTraitObject(__PUCK__value__30);
        return parseDeclarationWithAttribute();
      } else {
        if ($unwrapTraitObject(__PUCK__value__30).kind == "EnumKeyword") {
          var _undefined28 = $unwrapTraitObject(__PUCK__value__30);
          return _ast.TopLevelStatement.EnumDeclaration(parseEnumDeclaration());
        } else {
          if ($unwrapTraitObject(__PUCK__value__30).kind == "ExportKeyword") {
            var _undefined29 = $unwrapTraitObject(__PUCK__value__30);
            return _ast.TopLevelStatement.ExportDirective(parseExport());
          } else {
            if ($unwrapTraitObject(__PUCK__value__30).kind == "ImplKeyword") {
              var _undefined30 = $unwrapTraitObject(__PUCK__value__30);
              return parseImplDeclaration();
            } else {
              if ($unwrapTraitObject(__PUCK__value__30).kind == "ImportKeyword") {
                var _undefined31 = $unwrapTraitObject(__PUCK__value__30);
                return _ast.TopLevelStatement.ImportDirective(parseImport());
              } else {
                if ($unwrapTraitObject(__PUCK__value__30).kind == "TraitKeyword") {
                  var _undefined32 = $unwrapTraitObject(__PUCK__value__30);
                  return _ast.TopLevelStatement.TraitDeclaration(parseTraitDeclaration());
                } else {
                  if ($unwrapTraitObject(__PUCK__value__30).kind == "TypeKeyword") {
                    var _undefined33 = $unwrapTraitObject(__PUCK__value__30);
                    return _ast.TopLevelStatement.TypeDeclaration(parseTypeDeclaration());
                  } else {
                    if (true) {
                      var __PUCK__value__31 = __PUCK__value__30;
                      return _ast.TopLevelStatement.BlockLevelStatement(parseBlockLevelStatement());
                    };
                  };
                };
              };
            };
          };
        };
      };
    } else {
      if (true) {
        var __PUCK__value__32 = __PUCK__value__29;
        return _ast.TopLevelStatement.BlockLevelStatement(parseBlockLevelStatement());
      };
    };
  };
  function parseBlockLevelStatement() {
    var __PUCK__value__33 = _token_stream.TokenStream.peek.call(input);
    if ($unwrapTraitObject(__PUCK__value__33).kind == "SimpleToken" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__33).value)[0]).kind).kind == "BreakKeyword") {
      var _$unwrapTraitObject16 = $unwrapTraitObject(__PUCK__value__33),
          _$unwrapTraitObject17 = _slicedToArray(_$unwrapTraitObject16.value, 1),
          _undefined34 = _$unwrapTraitObject17[0].kind;

      return _ast.BlockLevelStatement.BreakStatement({ keyword: consumeToken(_token3.SyntaxKind.BreakKeyword) });
    } else {
      if ($unwrapTraitObject(__PUCK__value__33).kind == "SimpleToken" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__33).value)[0]).kind).kind == "ReturnKeyword") {
        var _$unwrapTraitObject18 = $unwrapTraitObject(__PUCK__value__33),
            _$unwrapTraitObject19 = _slicedToArray(_$unwrapTraitObject18.value, 1),
            _undefined35 = _$unwrapTraitObject19[0].kind;

        return _ast.BlockLevelStatement.ReturnStatement({
          keyword: consumeToken(_token3.SyntaxKind.ReturnKeyword),
          expression: parseExpression()
        });
      } else {
        if ($unwrapTraitObject(__PUCK__value__33).kind == "SimpleToken" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__33).value)[0]).kind).kind == "WhileKeyword") {
          var _$unwrapTraitObject20 = $unwrapTraitObject(__PUCK__value__33),
              _$unwrapTraitObject21 = _slicedToArray(_$unwrapTraitObject20.value, 1),
              _undefined36 = _$unwrapTraitObject21[0].kind;

          return _ast.BlockLevelStatement.WhileLoop(parseWhile());
        } else {
          if (true) {
            var __PUCK__value__34 = __PUCK__value__33;
            return _ast.BlockLevelStatement.Expression(parseExpression());
          };
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

    var __PUCK__value__35 = _token_stream.TokenStream.peek.call(input);
    var __PUCK__value__36 = void 0;
    if ($unwrapTraitObject(__PUCK__value__35).kind == "SimpleToken") {
      var _$unwrapTraitObject22 = $unwrapTraitObject(__PUCK__value__35),
          _$unwrapTraitObject23 = _slicedToArray(_$unwrapTraitObject22.value, 1),
          token = _$unwrapTraitObject23[0];

      var __PUCK__value__37 = token.kind;
      var __PUCK__value__38 = void 0;
      if ($unwrapTraitObject(__PUCK__value__37).kind == "OpenParenToken") {
        var _undefined37 = $unwrapTraitObject(__PUCK__value__37);
        __PUCK__value__38 = parseTupleOrExpression(forceTuple);
      } else {
        var __PUCK__value__39 = void 0;
        if ($unwrapTraitObject(__PUCK__value__37).kind == "OpenBracketToken") {
          var _undefined38 = $unwrapTraitObject(__PUCK__value__37);
          __PUCK__value__39 = _ast.Expression.ListLiteral(parseListLiteral());
        } else {
          var __PUCK__value__40 = void 0;
          if ($unwrapTraitObject(__PUCK__value__37).kind == "OpenBraceToken") {
            var _undefined39 = $unwrapTraitObject(__PUCK__value__37);
            __PUCK__value__40 = _ast.Expression.RecordLiteral(parseRecordLiteral());
          } else {
            var __PUCK__value__41 = void 0;
            if ($unwrapTraitObject(__PUCK__value__37).kind == "BarToken") {
              var _undefined40 = $unwrapTraitObject(__PUCK__value__37);
              __PUCK__value__41 = _ast.Expression.FunctionDeclaration(parseLambda());
            } else {
              var __PUCK__value__42 = void 0;
              if ($unwrapTraitObject(__PUCK__value__37).kind == "IfKeyword") {
                var _undefined41 = $unwrapTraitObject(__PUCK__value__37);
                __PUCK__value__42 = parseIf();
              } else {
                var __PUCK__value__43 = void 0;
                if ($unwrapTraitObject(__PUCK__value__37).kind == "MatchKeyword") {
                  var _undefined42 = $unwrapTraitObject(__PUCK__value__37);
                  __PUCK__value__43 = _ast.Expression.MatchExpression(parseMatch());
                } else {
                  var __PUCK__value__44 = void 0;
                  if ($unwrapTraitObject(__PUCK__value__37).kind == "FnKeyword") {
                    var _undefined43 = $unwrapTraitObject(__PUCK__value__37);
                    __PUCK__value__44 = _ast.Expression.FunctionDeclaration(parseFunctionDeclaration());
                  } else {
                    var __PUCK__value__45 = void 0;
                    if ($unwrapTraitObject(__PUCK__value__37).kind == "LetKeyword") {
                      var _undefined44 = $unwrapTraitObject(__PUCK__value__37);
                      _token_stream.TokenStream.next.call(input);
                      __PUCK__value__45 = _ast.Expression.VariableDeclaration(parseVariableDeclaration());
                    } else {
                      var __PUCK__value__46 = void 0;
                      if ($unwrapTraitObject(__PUCK__value__37).kind == "NotKeyword") {
                        var _undefined45 = $unwrapTraitObject(__PUCK__value__37);
                        __PUCK__value__46 = _ast.Expression.UnaryExpression(parseUnaryExpression());
                      } else {
                        var __PUCK__value__47 = void 0;
                        if ($unwrapTraitObject(__PUCK__value__37).kind == "MinusToken") {
                          var _undefined46 = $unwrapTraitObject(__PUCK__value__37);
                          __PUCK__value__47 = _ast.Expression.UnaryExpression(parseUnaryExpression());
                        } else {
                          var __PUCK__value__48 = void 0;
                          if ($unwrapTraitObject(__PUCK__value__37).kind == "PlusToken") {
                            var _undefined47 = $unwrapTraitObject(__PUCK__value__37);
                            __PUCK__value__48 = _ast.Expression.UnaryExpression(parseUnaryExpression());
                          } else {
                            var __PUCK__value__49 = void 0;
                            if ($unwrapTraitObject(__PUCK__value__37).kind == "ThrowKeyword") {
                              var _undefined48 = $unwrapTraitObject(__PUCK__value__37);
                              _token_stream.TokenStream.next.call(input);
                              __PUCK__value__49 = _ast.Expression.ThrowStatement({ expression: parseExpression() });
                            } else {
                              var __PUCK__value__50 = void 0;
                              if ($unwrapTraitObject(__PUCK__value__37).kind == "TrueKeyword") {
                                var _undefined49 = $unwrapTraitObject(__PUCK__value__37);
                                __PUCK__value__50 = maybeAccess(_ast.Expression.BooleanLiteral({
                                  keyword: consumeToken(_token3.SyntaxKind.TrueKeyword),
                                  value: true
                                }));
                              } else {
                                var __PUCK__value__51 = void 0;
                                if ($unwrapTraitObject(__PUCK__value__37).kind == "FalseKeyword") {
                                  var _undefined50 = $unwrapTraitObject(__PUCK__value__37);
                                  __PUCK__value__51 = maybeAccess(_ast.Expression.BooleanLiteral({
                                    keyword: consumeToken(_token3.SyntaxKind.FalseKeyword),
                                    value: false
                                  }));
                                } else {
                                  var __PUCK__value__52 = void 0;
                                  if (true) {
                                    var __PUCK__value__53 = __PUCK__value__37;
                                    __PUCK__value__52 = unexpected();
                                  };
                                  __PUCK__value__51 = __PUCK__value__52;
                                };
                                __PUCK__value__50 = __PUCK__value__51;
                              };
                              __PUCK__value__49 = __PUCK__value__50;
                            };
                            __PUCK__value__48 = __PUCK__value__49;
                          };
                          __PUCK__value__47 = __PUCK__value__48;
                        };
                        __PUCK__value__46 = __PUCK__value__47;
                      };
                      __PUCK__value__45 = __PUCK__value__46;
                    };
                    __PUCK__value__44 = __PUCK__value__45;
                  };
                  __PUCK__value__43 = __PUCK__value__44;
                };
                __PUCK__value__42 = __PUCK__value__43;
              };
              __PUCK__value__41 = __PUCK__value__42;
            };
            __PUCK__value__40 = __PUCK__value__41;
          };
          __PUCK__value__39 = __PUCK__value__40;
        };
        __PUCK__value__38 = __PUCK__value__39;
      };
      __PUCK__value__36 = __PUCK__value__38;
    } else {
      var __PUCK__value__54 = void 0;
      if ($unwrapTraitObject(__PUCK__value__35).kind == "NumberLiteral") {
        var _$unwrapTraitObject24 = $unwrapTraitObject(__PUCK__value__35),
            _$unwrapTraitObject25 = _slicedToArray(_$unwrapTraitObject24.value, 1),
            numberLiteral = _$unwrapTraitObject25[0];

        _token_stream.TokenStream.next.call(input);
        __PUCK__value__54 = maybeAccess(_ast.Expression.NumberLiteral(numberLiteral));
      } else {
        var __PUCK__value__55 = void 0;
        if ($unwrapTraitObject(__PUCK__value__35).kind == "StringLiteral") {
          var _$unwrapTraitObject26 = $unwrapTraitObject(__PUCK__value__35),
              _$unwrapTraitObject27 = _slicedToArray(_$unwrapTraitObject26.value, 1),
              stringLiteral = _$unwrapTraitObject27[0];

          _token_stream.TokenStream.next.call(input);
          __PUCK__value__55 = maybeAccess(_ast.Expression.StringLiteral(stringLiteral));
        } else {
          var __PUCK__value__56 = void 0;
          if ($unwrapTraitObject(__PUCK__value__35).kind == "Identifier") {
            var _$unwrapTraitObject28 = $unwrapTraitObject(__PUCK__value__35),
                _$unwrapTraitObject29 = _slicedToArray(_$unwrapTraitObject28.value, 1),
                identifier = _$unwrapTraitObject29[0];

            __PUCK__value__56 = parseIdentifierOrTypePath();
          } else {
            var __PUCK__value__57 = void 0;
            if ($unwrapTraitObject(__PUCK__value__35).kind == "Comment") {
              var _undefined51 = $unwrapTraitObject(__PUCK__value__35);
              __PUCK__value__57 = unexpected();
            };
            __PUCK__value__56 = __PUCK__value__57;
          };
          __PUCK__value__55 = __PUCK__value__56;
        };
        __PUCK__value__54 = __PUCK__value__55;
      };
      __PUCK__value__36 = __PUCK__value__54;
    };
    return maybeCall(__PUCK__value__36);
  };
  function parseSimpleLiteral() {
    var __PUCK__value__58 = _token_stream.TokenStream.next.call(input);
    if ($unwrapTraitObject(__PUCK__value__58).kind == "SimpleToken") {
      var _$unwrapTraitObject30 = $unwrapTraitObject(__PUCK__value__58),
          _$unwrapTraitObject31 = _slicedToArray(_$unwrapTraitObject30.value, 1),
          token = _$unwrapTraitObject31[0];

      var __PUCK__value__59 = token.kind;
      if ($unwrapTraitObject(__PUCK__value__59).kind == "TrueKeyword") {
        var _undefined52 = $unwrapTraitObject(__PUCK__value__59);
        return _ast.SimpleLiteral.BooleanLiteral({
          keyword: token,
          value: true
        });
      } else {
        if ($unwrapTraitObject(__PUCK__value__59).kind == "FalseKeyword") {
          var _undefined53 = $unwrapTraitObject(__PUCK__value__59);
          return _ast.SimpleLiteral.BooleanLiteral({
            keyword: token,
            value: false
          });
        } else {
          if (true) {
            var __PUCK__value__60 = __PUCK__value__59;
            return unexpected();
          };
        };
      };
    } else {
      if ($unwrapTraitObject(__PUCK__value__58).kind == "NumberLiteral") {
        var _$unwrapTraitObject32 = $unwrapTraitObject(__PUCK__value__58),
            _$unwrapTraitObject33 = _slicedToArray(_$unwrapTraitObject32.value, 1),
            numberLiteral = _$unwrapTraitObject33[0];

        return _ast.SimpleLiteral.NumberLiteral(numberLiteral);
      } else {
        if ($unwrapTraitObject(__PUCK__value__58).kind == "StringLiteral") {
          var _$unwrapTraitObject34 = $unwrapTraitObject(__PUCK__value__58),
              _$unwrapTraitObject35 = _slicedToArray(_$unwrapTraitObject34.value, 1),
              stringLiteral = _$unwrapTraitObject35[0];

          if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: stringLiteral.parts, $isTraitObject: true }) > 1) {
            _token_stream.TokenStream.croak.call(input, "Attributes can only contain simple string literals. Interpolation is not supported.");
          };
          var part = _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: stringLiteral.parts, $isTraitObject: true }, 0);
          var __PUCK__value__61 = part;
          if ($unwrapTraitObject(__PUCK__value__61).kind == "Literal") {
            var _$unwrapTraitObject36 = $unwrapTraitObject(__PUCK__value__61),
                _$unwrapTraitObject37 = _slicedToArray(_$unwrapTraitObject36.value, 1),
                literal = _$unwrapTraitObject37[0];

            return _ast.SimpleLiteral.StringLiteral(literal);
          } else {
            if (true) {
              var __PUCK__value__62 = __PUCK__value__61;
              return (0, _core.panic)("String literal does not start with a literal");
            };
          };
        } else {
          if (true) {
            var __PUCK__value__63 = __PUCK__value__58;
            return unexpected();
          };
        };
      };
    };
  };
  function parseAttributeArgument() {
    var name = consumeIdentifier();
    var value = _core.Option.map.call(maybeConsumeToken(_token3.SyntaxKind.EqualsToken), function (__PUCK__value__64) {
      return parseSimpleLiteral();
    });
    return {
      name: name,
      value: value
    };
  };
  function parseAttribute() {
    var hashToken = consumeToken(_token3.SyntaxKind.HashToken);
    var openBracket = consumeToken(_token3.SyntaxKind.OpenBracketToken);
    var name = consumeIdentifier();
    var __PUCK__value__65 = void 0;
    if (_core.Option.isSome.call(maybeConsumeToken(_token3.SyntaxKind.EqualsToken))) {
      __PUCK__value__65 = _ast.AttributeData.Value(parseSimpleLiteral());
    } else {
      var __PUCK__value__66 = void 0;
      if (isToken(_token3.SyntaxKind.OpenParenToken)) {
        __PUCK__value__66 = _ast.AttributeData.Arguments(delimited(_token3.SyntaxKind.OpenParenToken, _token3.SyntaxKind.CloseParenToken, _token3.SyntaxKind.CommaToken, parseAttributeArgument, true));
      } else {
        __PUCK__value__66 = _ast.AttributeData.None;
      };
      __PUCK__value__65 = __PUCK__value__66;
    };
    var data = __PUCK__value__65;
    var closeBracket = consumeToken(_token3.SyntaxKind.CloseBracketToken);
    return {
      hashToken: hashToken,
      openBracket: openBracket,
      name: name,
      data: data,
      closeBracket: closeBracket
    };
  };
  function parseDeclarationWithAttribute() {
    var attributes = [];
    while (isToken(_token3.SyntaxKind.HashToken)) {
      _core.List.push.call(attributes, parseAttribute());
    };
    if (isToken(_token3.SyntaxKind.EnumKeyword)) {
      return _ast.TopLevelStatement.EnumDeclaration(parseEnumDeclaration(attributes));
    } else {
      if (isToken(_token3.SyntaxKind.ExportKeyword)) {
        return _ast.TopLevelStatement.ExportDirective(parseExport(attributes));
      } else {
        if (isToken(_token3.SyntaxKind.TraitKeyword)) {
          return _ast.TopLevelStatement.TraitDeclaration(parseTraitDeclaration(attributes));
        } else {
          if (isToken(_token3.SyntaxKind.TypeKeyword)) {
            return _ast.TopLevelStatement.TypeDeclaration(parseTypeDeclaration(attributes));
          } else {
            return attributeNotSupported();
          };
        };
      };
    };
  };
  function parseEnumDeclaration() {
    var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var keyword = consumeToken(_token3.SyntaxKind.EnumKeyword);
    var name = consumeIdentifier();
    var __PUCK__value__67 = void 0;
    if (isToken(_token3.SyntaxKind.LessThanToken)) {
      __PUCK__value__67 = delimited(_token3.SyntaxKind.LessThanToken, _token3.SyntaxKind.GreaterThanToken, _token3.SyntaxKind.CommaToken, parseTypeParameter, true);
    } else {
      __PUCK__value__67 = [];
    };
    var typeParameters = __PUCK__value__67;
    var openBrace = expect(_token3.SyntaxKind.OpenBraceToken);
    var members = delimited(_token3.SyntaxKind.OpenBraceToken, _token3.SyntaxKind.CloseBraceToken, _token3.SyntaxKind.CommaToken, parseEnumMember, false);
    var closeBrace = consumeToken(_token3.SyntaxKind.CloseBraceToken);
    return {
      attributes: attributes,
      keyword: keyword,
      name: name,
      typeParameters: typeParameters,
      openBrace: openBrace,
      members: members,
      closeBrace: closeBrace
    };
  };
  function parseEnumMember() {
    var name = consumeIdentifier();
    var __PUCK__value__68 = void 0;
    if (isToken(_token3.SyntaxKind.OpenBraceToken)) {
      __PUCK__value__68 = (0, _core.Some)(parseRecordTypeBound());
    } else {
      var __PUCK__value__69 = void 0;
      if (isToken(_token3.SyntaxKind.OpenParenToken)) {
        __PUCK__value__69 = (0, _core.Some)(parseTupleTypeBound());
      } else {
        __PUCK__value__69 = _core.None;
      };
      __PUCK__value__68 = __PUCK__value__69;
    };
    var bound = __PUCK__value__68;
    return {
      name: name,
      bound: bound
    };
  };
  function parseImplDeclaration() {
    var implKeyword = consumeToken(_token3.SyntaxKind.ImplKeyword);
    var __PUCK__value__70 = void 0;
    if (isToken(_token3.SyntaxKind.LessThanToken)) {
      __PUCK__value__70 = delimited(_token3.SyntaxKind.LessThanToken, _token3.SyntaxKind.GreaterThanToken, _token3.SyntaxKind.CommaToken, parseTypeParameter, true);
    } else {
      __PUCK__value__70 = [];
    };
    var typeParameters = __PUCK__value__70;
    var trait_ = parseTypeBound();
    var __PUCK__value__71 = void 0;
    if (isToken(_token3.SyntaxKind.ForKeyword)) {
      __PUCK__value__71 = {
        forKeyword: (0, _core.Some)(consumeToken(_token3.SyntaxKind.ForKeyword)),
        type_: (0, _core.Some)(parseTypeBound())
      };
    } else {
      __PUCK__value__71 = {
        forKeyword: _core.None,
        type_: _core.None
      };
    };
    var _PUCK__value__ = __PUCK__value__71,
        forKeyword = _PUCK__value__.forKeyword,
        type_ = _PUCK__value__.type_;

    var openBrace = expect(_token3.SyntaxKind.OpenBraceToken);
    var members = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].toList.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: delimited(_token3.SyntaxKind.OpenBraceToken, _token3.SyntaxKind.CloseBraceToken, _token3.SyntaxKind.SemicolonToken, parseFunctionDeclaration, false), $isTraitObject: true });
    var closeBrace = consumeToken(_token3.SyntaxKind.CloseBraceToken);
    var __PUCK__value__72 = type_;
    if (__PUCK__value__72.kind == "Some") {
      var _PUCK__value__72$val = _slicedToArray(__PUCK__value__72.value, 1),
          _type_ = _PUCK__value__72$val[0];

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
    var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var keyword = consumeToken(_token3.SyntaxKind.TraitKeyword);
    var name = consumeIdentifier();
    var __PUCK__value__73 = void 0;
    if (isToken(_token3.SyntaxKind.LessThanToken)) {
      __PUCK__value__73 = delimited(_token3.SyntaxKind.LessThanToken, _token3.SyntaxKind.GreaterThanToken, _token3.SyntaxKind.CommaToken, parseTypeParameter, true);
    } else {
      __PUCK__value__73 = [];
    };
    var typeParameters = __PUCK__value__73;
    var openBrace = expect(_token3.SyntaxKind.OpenBraceToken);
    var members = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].toList.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: delimited(_token3.SyntaxKind.OpenBraceToken, _token3.SyntaxKind.CloseBraceToken, _token3.SyntaxKind.SemicolonToken, function () {
        return parseFunctionDeclaration(true);
      }, false), $isTraitObject: true });
    var closeBrace = consumeToken(_token3.SyntaxKind.CloseBraceToken);
    return {
      attributes: attributes,
      keyword: keyword,
      name: name,
      typeParameters: typeParameters,
      openBrace: openBrace,
      members: members,
      closeBrace: closeBrace
    };
  };
  function parseTypeDeclaration() {
    var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var keyword = consumeToken(_token3.SyntaxKind.TypeKeyword);
    var name = consumeIdentifier();
    var __PUCK__value__74 = void 0;
    if (isToken(_token3.SyntaxKind.LessThanToken)) {
      __PUCK__value__74 = delimited(_token3.SyntaxKind.LessThanToken, _token3.SyntaxKind.GreaterThanToken, _token3.SyntaxKind.CommaToken, parseTypeParameter, true);
    } else {
      __PUCK__value__74 = [];
    };
    var typeParameters = __PUCK__value__74;
    var __PUCK__value__75 = void 0;
    if (isToken(_token3.SyntaxKind.OpenBraceToken)) {
      __PUCK__value__75 = (0, _core.Some)(parseRecordTypeBound());
    } else {
      var __PUCK__value__76 = void 0;
      if (isToken(_token3.SyntaxKind.OpenParenToken)) {
        __PUCK__value__76 = (0, _core.Some)(parseTupleTypeBound());
      } else {
        __PUCK__value__76 = _core.None;
      };
      __PUCK__value__75 = __PUCK__value__76;
    };
    var bound = __PUCK__value__75;
    return {
      attributes: attributes,
      keyword: keyword,
      name: name,
      typeParameters: typeParameters,
      bound: bound,
      type_: $unwrapTraitObject(_js._undefined)
    };
  };
  function parseExport() {
    var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var keyword = consumeToken(_token3.SyntaxKind.ExportKeyword);
    var statement = void 0;
    var identifier = void 0;
    if (isToken(_token3.SyntaxKind.EnumKeyword)) {
      var enumDeclaration = parseEnumDeclaration(attributes);
      statement = _ast.ExportedStatement.EnumDeclaration(enumDeclaration);
      identifier = enumDeclaration.name;
    } else {
      if (isToken(_token3.SyntaxKind.TraitKeyword)) {
        var traitDeclaration = parseTraitDeclaration(attributes);
        statement = _ast.ExportedStatement.TraitDeclaration(traitDeclaration);
        identifier = traitDeclaration.name;
      } else {
        if (isToken(_token3.SyntaxKind.TypeKeyword)) {
          var typeDeclaration = parseTypeDeclaration(attributes);
          statement = _ast.ExportedStatement.TypeDeclaration(typeDeclaration);
          identifier = typeDeclaration.name;
        } else {
          if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isEmpty.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: attributes, $isTraitObject: true })) {
            if (isToken(_token3.SyntaxKind.FnKeyword)) {
              var functionDeclaration = parseFunctionDeclaration();
              statement = _ast.ExportedStatement.FunctionDeclaration(functionDeclaration);
              var __PUCK__value__77 = functionDeclaration.name;
              if (__PUCK__value__77.kind == "Some") {
                var _PUCK__value__77$val = _slicedToArray(__PUCK__value__77.value, 1),
                    name = _PUCK__value__77$val[0];

                identifier = name;
              } else {
                _token_stream.TokenStream.croak.call(input, "Can not export function without a name");
              };
            } else {
              if (isToken(_token3.SyntaxKind.LetKeyword)) {
                _token_stream.TokenStream.next.call(input);
                var variableDeclaration = parseVariableDeclaration();
                statement = _ast.ExportedStatement.VariableDeclaration(variableDeclaration);
                var __PUCK__value__78 = variableDeclaration.pattern;
                if (__PUCK__value__78.kind == "Identifier") {
                  var _PUCK__value__78$val = _slicedToArray(__PUCK__value__78.value, 1),
                      _name = _PUCK__value__78$val[0];

                  identifier = _name;
                } else {
                  _token_stream.TokenStream.croak.call(input, "Can not export a let declaration without a identifier pattern");
                };
              } else {
                _token_stream.TokenStream.croak.call(input, "Expected trait, type, function or variable declaration after export");
              };
            };
          } else {
            attributeNotSupported();
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
    var importKeyword = consumeToken(_token3.SyntaxKind.ImportKeyword);
    var __PUCK__value__79 = _token_stream.TokenStream.next.call(input);
    var __PUCK__value__80 = void 0;
    if ($unwrapTraitObject(__PUCK__value__79).kind == "StringLiteral") {
      var _$unwrapTraitObject38 = $unwrapTraitObject(__PUCK__value__79),
          _$unwrapTraitObject39 = _slicedToArray(_$unwrapTraitObject38.value, 1),
          stringLiteral = _$unwrapTraitObject39[0];

      __PUCK__value__80 = stringLiteral;
    } else {
      var __PUCK__value__81 = void 0;
      if (true) {
        var __PUCK__value__82 = __PUCK__value__79;
        __PUCK__value__81 = _token_stream.TokenStream.croak.call(input, "Expected string, " + butGot());
      };
      __PUCK__value__80 = __PUCK__value__81;
    };
    var locator = __PUCK__value__80;
    if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: locator.parts, $isTraitObject: true }) != 1) {
      (0, _core.panic)("More than one part in import string");
    };
    var __PUCK__value__83 = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: locator.parts, $isTraitObject: true });
    var __PUCK__value__84 = void 0;
    if ($unwrapTraitObject(__PUCK__value__83).kind == "Some" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__83).value)[0]).kind == "Literal") {
      var _$unwrapTraitObject40 = $unwrapTraitObject(__PUCK__value__83),
          _$unwrapTraitObject41 = _slicedToArray(_$unwrapTraitObject40.value, 1),
          _$unwrapTraitObject42 = _slicedToArray(_$unwrapTraitObject41[0].value, 1),
          value = _$unwrapTraitObject42[0].value;

      __PUCK__value__84 = _core.String.split.call(value, ":");
    } else {
      var __PUCK__value__85 = void 0;
      if (true) {
        var __PUCK__value__86 = __PUCK__value__83;
        __PUCK__value__85 = (0, _core.panic)("String literal does not start with a literal");
      };
      __PUCK__value__84 = __PUCK__value__85;
    };
    var parts = __PUCK__value__84;
    if (parts > 2) {
      _token_stream.TokenStream.croak.call(input, "Illegal token \":\" used in import path");
    };
    var __PUCK__value__87 = void 0;
    if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parts, $isTraitObject: true }) == 2) {
      __PUCK__value__87 = (0, _core.Some)(_core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: parts, $isTraitObject: true }, 0));
    } else {
      __PUCK__value__87 = _core.None;
    };
    var domain = __PUCK__value__87;
    var __PUCK__value__88 = void 0;
    if (_core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parts, $isTraitObject: true }) == 2) {
      __PUCK__value__88 = _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: parts, $isTraitObject: true }, 1);
    } else {
      __PUCK__value__88 = _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: parts, $isTraitObject: true }, 0);
    };
    var path = __PUCK__value__88;
    var asKeyword = consumeToken(_token3.SyntaxKind.AsKeyword);
    var __PUCK__value__89 = void 0;
    if (isToken(_token3.SyntaxKind.OpenBraceToken)) {
      __PUCK__value__89 = _ast.ImportSpecifier.ObjectDestructure(parseObjectDestructure());
    } else {
      var __PUCK__value__90 = void 0;
      if (isToken(_token3.SyntaxKind.AsteriskToken)) {
        __PUCK__value__90 = _ast.ImportSpecifier.Asterisk(consumeToken(_token3.SyntaxKind.AsteriskToken));
      } else {
        __PUCK__value__90 = _ast.ImportSpecifier.Identifier(consumeIdentifier());
      };
      __PUCK__value__89 = __PUCK__value__90;
    };
    var specifier = __PUCK__value__89;
    return {
      importKeyword: importKeyword,
      domain: domain,
      path: path,
      asKeyword: asKeyword,
      specifier: specifier,
      _module: _core.None
    };
  };
  function parseObjectDestructure() {
    var openBrace = expect(_token3.SyntaxKind.OpenBraceToken);
    var members = delimited(_token3.SyntaxKind.OpenBraceToken, _token3.SyntaxKind.CloseBraceToken, _token3.SyntaxKind.CommaToken, parseObjectDestructureMember, false);
    var closeBrace = consumeToken(_token3.SyntaxKind.CloseBraceToken);
    return {
      openBrace: openBrace,
      members: members,
      closeBrace: closeBrace
    };
  };
  function parseObjectDestructureMember() {
    var property = consumeIdentifier();
    var __PUCK__value__91 = void 0;
    if (isToken(_token3.SyntaxKind.ColonToken)) {
      _token_stream.TokenStream.next.call(input);
      __PUCK__value__91 = consumeIdentifier();
    } else {
      __PUCK__value__91 = property;
    };
    var local = __PUCK__value__91;
    return {
      property: property,
      local: local
    };
  };
  function parseBlock() {
    var openBrace = (0, _core.Some)(expect(_token3.SyntaxKind.OpenBraceToken));
    var statements = delimited(_token3.SyntaxKind.OpenBraceToken, _token3.SyntaxKind.CloseBraceToken, _token3.SyntaxKind.SemicolonToken, parseBlockLevelStatement, false);
    var closeBrace = (0, _core.Some)(consumeToken(_token3.SyntaxKind.CloseBraceToken));
    return {
      openBrace: openBrace,
      statements: statements,
      closeBrace: closeBrace,
      type_: $unwrapTraitObject(_js._undefined)
    };
  };
  function parseWhile() {
    var keyword = consumeToken(_token3.SyntaxKind.WhileKeyword);
    var condition = parseExpression();
    var body = parseBlock();
    return {
      keyword: keyword,
      condition: condition,
      body: body
    };
  };
  function parseIdentifierOrTypePath() {
    var identifier = consumeIdentifier();
    if (isToken(_token3.SyntaxKind.ColonColonToken)) {
      return _ast.Expression.TypePathExpression({ typePath: parseTypePath((0, _core.Some)(identifier)) });
    } else {
      return maybeAccess(_ast.Expression.Identifier(identifier));
    };
  };
  function parseFunctionDeclaration() {
    var optionalBody = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    consumeToken(_token3.SyntaxKind.FnKeyword);
    var __PUCK__value__92 = _token_stream.TokenStream.peek.call(input);
    var __PUCK__value__93 = void 0;
    if ($unwrapTraitObject(__PUCK__value__92).kind == "Identifier") {
      var _$unwrapTraitObject43 = $unwrapTraitObject(__PUCK__value__92),
          _$unwrapTraitObject44 = _slicedToArray(_$unwrapTraitObject43.value, 1),
          identifier = _$unwrapTraitObject44[0];

      _token_stream.TokenStream.next.call(input);
      __PUCK__value__93 = (0, _core.Some)(identifier);
    } else {
      var __PUCK__value__94 = void 0;
      if (true) {
        var __PUCK__value__95 = __PUCK__value__92;
        __PUCK__value__94 = _core.None;
      };
      __PUCK__value__93 = __PUCK__value__94;
    };
    var name = __PUCK__value__93;
    var __PUCK__value__96 = void 0;
    if (isToken(_token3.SyntaxKind.LessThanToken)) {
      __PUCK__value__96 = delimited(_token3.SyntaxKind.LessThanToken, _token3.SyntaxKind.GreaterThanToken, _token3.SyntaxKind.CommaToken, parseTypeParameter, true);
    } else {
      __PUCK__value__96 = [];
    };
    var typeParameters = __PUCK__value__96;
    var openParenOrBar = expect(_token3.SyntaxKind.OpenParenToken);
    var parameterList = delimited(_token3.SyntaxKind.OpenParenToken, _token3.SyntaxKind.CloseParenToken, _token3.SyntaxKind.CommaToken, parseVariableDeclaration, false);
    var closeParenOrBar = consumeToken(_token3.SyntaxKind.CloseParenToken);
    var __PUCK__value__97 = void 0;
    if (_core.Option.isSome.call(maybeConsumeToken(_token3.SyntaxKind.MinusGreaterThanToken))) {
      __PUCK__value__97 = (0, _core.Some)(parseTypeBound());
    } else {
      __PUCK__value__97 = _core.None;
    };
    var returnType = __PUCK__value__97;
    var __PUCK__value__98 = void 0;
    if (isToken(_token3.SyntaxKind.OpenBraceToken) || !optionalBody) {
      __PUCK__value__98 = (0, _core.Some)(parseBlock());
    } else {
      __PUCK__value__98 = _core.None;
    };
    var body = __PUCK__value__98;
    return {
      name: name,
      typeParameters: typeParameters,
      openParenOrBar: openParenOrBar,
      parameterList: parameterList,
      closeParenOrBar: closeParenOrBar,
      returnType: returnType,
      body: body,
      type_: $unwrapTraitObject(_js._undefined)
    };
  };
  function parseLambda() {
    var openParenOrBar = expect(_token3.SyntaxKind.BarToken);
    var parameterList = delimited(_token3.SyntaxKind.BarToken, _token3.SyntaxKind.BarToken, _token3.SyntaxKind.CommaToken, parseVariableDeclaration, false);
    var closeParenOrBar = consumeToken(_token3.SyntaxKind.BarToken);
    var __PUCK__value__99 = void 0;
    if (isToken(_token3.SyntaxKind.OpenBraceToken)) {
      __PUCK__value__99 = (0, _core.Some)(parseBlock());
    } else {
      __PUCK__value__99 = (0, _core.Some)({
        openBrace: _core.None,
        statements: [parseBlockLevelStatement()],
        closeBrace: _core.None,
        type_: _js._undefined
      });
    };
    var body = __PUCK__value__99;
    return {
      name: _core.None,
      typeParameters: [],
      openParenOrBar: openParenOrBar,
      parameterList: parameterList,
      closeParenOrBar: closeParenOrBar,
      returnType: _core.None,
      body: body,
      type_: $unwrapTraitObject(_js._undefined)
    };
  };
  function parseVariableDeclaration() {
    var mutable = _core.Option.isSome.call(maybeConsumeToken(_token3.SyntaxKind.MutKeyword));
    var pattern = parsePattern();
    return {
      pattern: pattern,
      mutable: mutable,
      typeBound: _core.Option.map.call(maybeConsumeToken(_token3.SyntaxKind.ColonToken), function (__PUCK__value__100) {
        return parseTypeBound();
      }),
      initializer: _core.Option.map.call(maybeConsumeToken(_token3.SyntaxKind.EqualsToken), function (__PUCK__value__101) {
        return parseExpression();
      })
    };
  };
  function parseIf() {
    var ifKeyword = consumeToken(_token3.SyntaxKind.IfKeyword);
    if (isToken(_token3.SyntaxKind.LetKeyword)) {
      return _ast.Expression.IfLetExpression(parseIfLetExpression(ifKeyword));
    } else {
      return _ast.Expression.IfExpression(parseIfExpression(ifKeyword));
    };
  };
  function parseIfExpression(ifKeyword) {
    var condition = parseExpression();
    var __PUCK__value__102 = void 0;
    if (isToken(_token3.SyntaxKind.OpenBraceToken)) {
      __PUCK__value__102 = parseBlock();
    } else {
      consumeToken(_token3.SyntaxKind.ThenKeyword);
      __PUCK__value__102 = {
        openBrace: _core.None,
        statements: [parseBlockLevelStatement()],
        closeBrace: _core.None,
        type_: _js._undefined
      };
    };
    var then_ = __PUCK__value__102;
    var __PUCK__value__103 = void 0;
    if (isToken(_token3.SyntaxKind.ElseKeyword)) {
      _token_stream.TokenStream.next.call(input);
      var __PUCK__value__104 = void 0;
      if (isToken(_token3.SyntaxKind.OpenBraceToken)) {
        __PUCK__value__104 = parseBlock();
      } else {
        __PUCK__value__104 = {
          openBrace: _core.None,
          statements: [parseBlockLevelStatement()],
          closeBrace: _core.None,
          type_: _js._undefined
        };
      };
      __PUCK__value__103 = (0, _core.Some)(__PUCK__value__104);
    } else {
      __PUCK__value__103 = _core.None;
    };
    return {
      ifKeyword: ifKeyword,
      condition: condition,
      then_: then_,
      else_: __PUCK__value__103
    };
  };
  function parseIfLetExpression(ifKeyword) {
    var letKeyword = consumeToken(_token3.SyntaxKind.LetKeyword);
    var pattern = parsePattern();
    var equalsToken = consumeToken(_token3.SyntaxKind.EqualsToken);
    var expression = parseExpression();
    var __PUCK__value__105 = void 0;
    if (isToken(_token3.SyntaxKind.OpenBraceToken)) {
      __PUCK__value__105 = parseBlock();
    } else {
      consumeToken(_token3.SyntaxKind.ThenKeyword);
      __PUCK__value__105 = {
        openBrace: _core.None,
        statements: [parseBlockLevelStatement()],
        closeBrace: _core.None,
        type_: _js._undefined
      };
    };
    var then_ = __PUCK__value__105;
    var __PUCK__value__106 = void 0;
    if (isToken(_token3.SyntaxKind.ElseKeyword)) {
      _token_stream.TokenStream.next.call(input);
      var __PUCK__value__107 = void 0;
      if (isToken(_token3.SyntaxKind.OpenBraceToken)) {
        __PUCK__value__107 = parseBlock();
      } else {
        __PUCK__value__107 = {
          openBrace: _core.None,
          statements: [parseBlockLevelStatement()],
          closeBrace: _core.None,
          type_: _js._undefined
        };
      };
      __PUCK__value__106 = (0, _core.Some)(__PUCK__value__107);
    } else {
      __PUCK__value__106 = _core.None;
    };
    return {
      ifKeyword: ifKeyword,
      letKeyword: letKeyword,
      pattern: pattern,
      expression: expression,
      then_: then_,
      else_: __PUCK__value__106
    };
  };
  function parseMatch() {
    return {
      matchKeyword: consumeToken(_token3.SyntaxKind.MatchKeyword),
      expression: parseExpression(),
      openBrace: expect(_token3.SyntaxKind.OpenBraceToken),
      patterns: delimited(_token3.SyntaxKind.OpenBraceToken, _token3.SyntaxKind.CloseBraceToken, _token3.SyntaxKind.CommaToken, parseMatchArm, false),
      closeBrace: consumeToken(_token3.SyntaxKind.CloseBraceToken)
    };
  };
  function parseMatchArm() {
    var pattern = parsePattern();
    var arrow = consumeToken(_token3.SyntaxKind.EqualsGreaterThanToken);
    var __PUCK__value__108 = void 0;
    if (isToken(_token3.SyntaxKind.OpenBraceToken)) {
      __PUCK__value__108 = parseBlock();
    } else {
      __PUCK__value__108 = {
        openBrace: _core.None,
        statements: [parseBlockLevelStatement()],
        closeBrace: _core.None,
        type_: _js._undefined
      };
    };
    var block = __PUCK__value__108;
    return {
      pattern: pattern,
      arrow: arrow,
      block: block
    };
  };
  function parseUnaryExpression() {
    var __PUCK__value__109 = _token_stream.TokenStream.next.call(input);
    if ($unwrapTraitObject(__PUCK__value__109).kind == "SimpleToken") {
      var _$unwrapTraitObject45 = $unwrapTraitObject(__PUCK__value__109),
          _$unwrapTraitObject46 = _slicedToArray(_$unwrapTraitObject45.value, 1),
          operator = _$unwrapTraitObject46[0];

      var __PUCK__value__110 = operator.kind;
      if ($unwrapTraitObject(__PUCK__value__110).kind == "NotKeyword") {
        var _undefined54 = $unwrapTraitObject(__PUCK__value__110);
        return {
          operator: operator,
          rhs: parseExpression(_token3.SyntaxKind.precedence.call(operator.kind))
        };
      } else {
        if ($unwrapTraitObject(__PUCK__value__110).kind == "MinusToken") {
          var _undefined55 = $unwrapTraitObject(__PUCK__value__110);
          return {
            operator: operator,
            rhs: parseExpression(_token3.SyntaxKind.precedence.call(operator.kind))
          };
        } else {
          if ($unwrapTraitObject(__PUCK__value__110).kind == "PlusToken") {
            var _undefined56 = $unwrapTraitObject(__PUCK__value__110);
            return {
              operator: operator,
              rhs: parseExpression(_token3.SyntaxKind.precedence.call(operator.kind))
            };
          } else {
            if (true) {
              var __PUCK__value__111 = __PUCK__value__110;
              return unexpected();
            };
          };
        };
      };
    } else {
      if (true) {
        var __PUCK__value__112 = __PUCK__value__109;
        return unexpected();
      };
    };
  };
  function parseListLiteral() {
    var openBracket = expect(_token3.SyntaxKind.OpenBracketToken);
    var members = delimited(_token3.SyntaxKind.OpenBracketToken, _token3.SyntaxKind.CloseBracketToken, _token3.SyntaxKind.CommaToken, parseExpression, false);
    var closeBracket = consumeToken(_token3.SyntaxKind.CloseBracketToken);
    return {
      openBracket: openBracket,
      members: members,
      closeBracket: closeBracket
    };
  };
  function parseRecordLiteral() {
    var openBrace = expect(_token3.SyntaxKind.OpenBraceToken);
    var members = delimited(_token3.SyntaxKind.OpenBraceToken, _token3.SyntaxKind.CloseBraceToken, _token3.SyntaxKind.CommaToken, parseRecordLiteralMember, false);
    var closeBrace = consumeToken(_token3.SyntaxKind.CloseBraceToken);
    return {
      openBrace: openBrace,
      members: members,
      closeBrace: closeBrace
    };
  };
  function parseRecordLiteralMember() {
    var name = consumeIdentifier();
    var __PUCK__value__113 = void 0;
    if (isToken(_token3.SyntaxKind.ColonToken)) {
      _token_stream.TokenStream.next.call(input);
      __PUCK__value__113 = parseExpression();
    } else {
      __PUCK__value__113 = _ast.Expression.Identifier(name);
    };
    var value = __PUCK__value__113;
    return {
      name: name,
      value: value
    };
  };
  function parseTupleOrExpression(forceTuple) {
    var openParen = expect(_token3.SyntaxKind.OpenParenToken);
    var expressions = delimited(_token3.SyntaxKind.OpenParenToken, _token3.SyntaxKind.CloseParenToken, _token3.SyntaxKind.CommaToken, function () {
      return parseExpression(0, true);
    }, false);
    var closeParen = consumeToken(_token3.SyntaxKind.CloseParenToken);
    if (!forceTuple && _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: expressions, $isTraitObject: true }) == 1) {
      return _core.Index["$impl_Index$List"].index.call({ type: '$impl_Index$List', value: expressions, $isTraitObject: true }, 0);
    } else {
      return _ast.Expression.TupleLiteral({
        openParen: openParen,
        expressions: expressions,
        closeParen: closeParen
      });
    };
  };
  function parsePattern() {
    var __PUCK__value__114 = maybeConsumeToken(_token3.SyntaxKind.UnderscoreToken);
    if (__PUCK__value__114.kind == "Some") {
      var _PUCK__value__114$va = _slicedToArray(__PUCK__value__114.value, 1),
          token = _PUCK__value__114$va[0];

      return _ast.Pattern.CatchAll(token);
    } else {
      if (isToken(_token3.SyntaxKind.OpenParenToken)) {
        return _ast.Pattern.Tuple(parseTuplePattern());
      } else {
        if (isToken(_token3.SyntaxKind.OpenBraceToken)) {
          return _ast.Pattern.Record(parseRecordPattern());
        } else {
          var identifier = consumeIdentifier();
          if (isToken(_token3.SyntaxKind.ColonColonToken) || isToken(_token3.SyntaxKind.OpenParenToken) || isToken(_token3.SyntaxKind.OpenBraceToken)) {
            var typePath = parseTypePath((0, _core.Some)(identifier));
            if (isToken(_token3.SyntaxKind.OpenParenToken)) {
              return _ast.Pattern.TupleType(typePath, parseTuplePattern());
            } else {
              if (isToken(_token3.SyntaxKind.OpenBraceToken)) {
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
    var openBrace = expect(_token3.SyntaxKind.OpenBraceToken);
    var properties = delimited(_token3.SyntaxKind.OpenBraceToken, _token3.SyntaxKind.CloseBraceToken, _token3.SyntaxKind.CommaToken, parseRecordPatternMember, false);
    var closeBrace = consumeToken(_token3.SyntaxKind.CloseBraceToken);
    return {
      openBrace: openBrace,
      properties: properties,
      closeBrace: closeBrace
    };
  };
  function parseRecordPatternMember() {
    var property = consumeIdentifier();
    var __PUCK__value__115 = void 0;
    if (_core.Option.isSome.call(maybeConsumeToken(_token3.SyntaxKind.ColonToken))) {
      __PUCK__value__115 = parsePattern();
    } else {
      __PUCK__value__115 = _ast.Pattern.Identifier(property);
    };
    var pattern = __PUCK__value__115;
    return {
      property: property,
      pattern: pattern
    };
  };
  function parseTuplePattern() {
    var openParen = expect(_token3.SyntaxKind.OpenParenToken);
    var properties = delimited(_token3.SyntaxKind.OpenParenToken, _token3.SyntaxKind.CloseParenToken, _token3.SyntaxKind.CommaToken, parsePattern, false);
    var closeParen = consumeToken(_token3.SyntaxKind.CloseParenToken);
    return {
      openParen: openParen,
      properties: properties,
      closeParen: closeParen
    };
  };
  function parseTypeBound() {
    if (isToken(_token3.SyntaxKind.LessThanToken)) {
      return parseFunctionTypeBound(_core.None);
    } else {
      if (isToken(_token3.SyntaxKind.OpenParenToken)) {
        var tuple = parseTupleTypeBound();
        if (isToken(_token3.SyntaxKind.MinusGreaterThanToken)) {
          return parseFunctionTypeBound((0, _core.Some)(tuple));
        } else {
          return tuple;
        };
      } else {
        if (isToken(_token3.SyntaxKind.OpenBraceToken)) {
          return parseRecordTypeBound();
        } else {
          return parseNamedTypeBound();
        };
      };
    };
  };
  function parseFunctionTypeBound(tuple) {
    var __PUCK__value__116 = void 0;
    if (_core.Option.isNone.call(tuple) && isToken(_token3.SyntaxKind.LessThanToken)) {
      __PUCK__value__116 = delimited(_token3.SyntaxKind.LessThanToken, _token3.SyntaxKind.GreaterThanToken, _token3.SyntaxKind.CommaToken, parseTypeParameter, true);
    } else {
      __PUCK__value__116 = [];
    };
    var typeParameters = __PUCK__value__116;
    var parameters = _ast.TypeBound.getTupleTypeBound.call(_core.Option.unwrapOrElse.call(tuple, parseTupleTypeBound));
    consumeToken(_token3.SyntaxKind.MinusGreaterThanToken);
    var returnType = parseTypeBound();
    return _ast.TypeBound.FunctionTypeBound({
      typeParameters: typeParameters,
      parameters: parameters,
      returnType: returnType
    });
  };
  function parseNamedTypeBound() {
    var path = parseTypePath(_core.None);
    var __PUCK__value__117 = void 0;
    if (isToken(_token3.SyntaxKind.LessThanToken)) {
      __PUCK__value__117 = delimited(_token3.SyntaxKind.LessThanToken, _token3.SyntaxKind.GreaterThanToken, _token3.SyntaxKind.CommaToken, parseTypeBound, true);
    } else {
      __PUCK__value__117 = [];
    };
    var typeParameters = __PUCK__value__117;
    return _ast.TypeBound.NamedTypeBound({
      path: path,
      typeParameters: typeParameters
    });
  };
  function parseRecordTypeBound() {
    expect(_token3.SyntaxKind.OpenBraceToken);
    var openBrace = expect(_token3.SyntaxKind.OpenBraceToken);
    var properties = delimited(_token3.SyntaxKind.OpenBraceToken, _token3.SyntaxKind.CloseBraceToken, _token3.SyntaxKind.CommaToken, parseRecordTypeBoundMember, false);
    var closeBrace = consumeToken(_token3.SyntaxKind.CloseBraceToken);
    return _ast.TypeBound.RecordTypeBound({
      openBrace: openBrace,
      properties: properties,
      closeBrace: closeBrace
    });
  };
  function parseRecordTypeBoundMember() {
    var name = consumeIdentifier();
    consumeToken(_token3.SyntaxKind.ColonToken);
    var typeBound = parseTypeBound();
    return {
      name: name,
      typeBound: typeBound
    };
  };
  function parseTupleTypeBound() {
    var openParen = expect(_token3.SyntaxKind.OpenParenToken);
    var properties = delimited(_token3.SyntaxKind.OpenParenToken, _token3.SyntaxKind.CloseParenToken, _token3.SyntaxKind.CommaToken, parseTypeBound, false);
    var closeParen = consumeToken(_token3.SyntaxKind.CloseParenToken);
    return _ast.TypeBound.TupleTypeBound({
      openParen: openParen,
      properties: properties,
      closeParen: closeParen
    });
  };
  function parseTypeParameter() {
    var name = consumeIdentifier();
    var __PUCK__value__118 = void 0;
    if (isToken(_token3.SyntaxKind.EqualsToken)) {
      _token_stream.TokenStream.next.call(input);
      __PUCK__value__118 = (0, _core.Some)(parseTypeBound());
    } else {
      __PUCK__value__118 = _core.None;
    };
    var defaultValue = __PUCK__value__118;
    return {
      name: name,
      defaultValue: defaultValue
    };
  };
  function parseTypePath(identifier) {
    var i = _core.Option.unwrapOrElse.call(identifier, consumeIdentifier);
    if (_core.Option.isSome.call(maybeConsumeToken(_token3.SyntaxKind.ColonColonToken))) {
      return _ast.TypePath._Object(i, parseTypePath(_core.None));
    } else {
      return _ast.TypePath.Member(i);
    };
  };
  return parseModule();
}
