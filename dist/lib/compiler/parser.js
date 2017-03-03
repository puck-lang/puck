'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.parseundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("./../ast/ast");
const $puck_4 = require("./../ast/span");
const $puck_5 = require("./../ast/token");
const $puck_6 = require("./../entities");
const $puck_7 = require("./token_stream");
function isAssignment(token) {
  let $puck_8 = token.kind;
  if ($unwrapTraitObject($puck_8).kind === "EqualsToken") {
    $unwrapTraitObject($puck_8);
    return true;
  }
  else {
    if ($unwrapTraitObject($puck_8).kind === "PlusEqualsToken") {
      $unwrapTraitObject($puck_8);
      return true;
    }
    else {
      if ($unwrapTraitObject($puck_8).kind === "MinusEqualsToken") {
        $unwrapTraitObject($puck_8);
        return true;
      }
      else {
        if ($unwrapTraitObject($puck_8).kind === "AsteriskEqualsToken") {
          $unwrapTraitObject($puck_8);
          return true;
        }
        else {
          if ($unwrapTraitObject($puck_8).kind === "AsteriskAsteriskEqualsToken") {
            $unwrapTraitObject($puck_8);
            return true;
          }
          else {
            if ($unwrapTraitObject($puck_8).kind === "SlashEqualsToken") {
              $unwrapTraitObject($puck_8);
              return true;
            }
            else {
              if ($unwrapTraitObject($puck_8).kind === "PercentEqualsToken") {
                $unwrapTraitObject($puck_8);
                return true;
              }
              else {
                if (true) {
                  $puck_8;
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
function isAssignable(expression) {
  let $puck_9 = expression;
  if ($unwrapTraitObject($puck_9).kind === "Identifier") {
    $unwrapTraitObject($puck_9);
    return true;
  }
  else {
    if ($unwrapTraitObject($puck_9).kind === "MemberAccess") {
      $unwrapTraitObject($puck_9);
      return true;
    }
    else {
      if ($unwrapTraitObject($puck_9).kind === "IndexAccess") {
        $unwrapTraitObject($puck_9);
        return true;
      }
      else {
        if ($unwrapTraitObject($puck_9).kind === "UnknownAccess") {
          $unwrapTraitObject($puck_9);
          return true;
        }
        else {
          if ($unwrapTraitObject($puck_9).kind === "UnknownIndexAccess") {
            $unwrapTraitObject($puck_9);
            return true;
          }
          else {
            if (true) {
              $puck_9;
              return false;
            };
          };
        };
      };
    };
  };
};
function parse(input, file, recover = false) {
  function isToken(kind, withDummy = false) {
    let $puck_10 = $puck_7.TokenStream.peek.call(input, withDummy);
    if ($unwrapTraitObject($puck_10).kind === "SimpleToken") {
      let {value: token} = $unwrapTraitObject($puck_10);
      return $puck_1.identical(token.kind, kind);
    }
    else {
      if (true) {
        $puck_10;
        return false;
      };
    };
  };
  function butGot() {
    let $puck_11 = $puck_7.TokenStream.peek.call(input);
    let $puck_12;
    if (($unwrapTraitObject($puck_11).kind === "SimpleToken" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_11).value).kind).kind === "EndOfFileToken")) {
      let {value: {}} = $unwrapTraitObject($puck_11);
      $puck_12 = "but reached end of file";
    }
    else {
      let $puck_13;
      if (true) {
        const token = $puck_11;
        $puck_13 = "but got \"" + $puck_5.Token.name.call(token) + "\"";
      };
      $puck_12 = $puck_13;
    };
    let $puck_14 = $puck_12;;
    let token = $puck_14;;
    return $puck_14;
  };
  function expect(kind) {
    const token = $puck_7.TokenStream.peek.call(input);
    let $puck_15 = token;
    if (($unwrapTraitObject($puck_15).kind === "SimpleToken")) {
      let {value: token} = $unwrapTraitObject($puck_15);
      if ((!$puck_1.identical(token.kind, kind))) {
        $puck_7.TokenStream.croak.call(input, "Expected token: \"" + $puck_5.SyntaxKind.name.call(kind) + "\", " + butGot());
      };
      return token;
    }
    else {
      if (true) {
        $puck_15;
        return $puck_7.TokenStream.croak.call(input, "Expected token: \"" + $puck_5.SyntaxKind.name.call(kind) + "\", " + butGot());
      };
    };
  };
  function consumeToken(kind) {
    const token = expect(kind);
    $puck_7.TokenStream.next.call(input);
    return token;
  };
  function consumeIdentifier() {
    if (recover) {
      let $puck_16 = $puck_7.TokenStream.peek.call(input);
      if (($unwrapTraitObject($puck_16).kind === "SimpleToken")) {
        let {value: {span: span}} = $unwrapTraitObject($puck_16);
        return {
          name: "",
          span: span,
        };
      }
      else {
        if (true) {
          $puck_16;
        };
      };
    };
    let $puck_17 = $puck_7.TokenStream.next.call(input);
    if ($unwrapTraitObject($puck_17).kind === "Identifier") {
      let {value: identifier} = $unwrapTraitObject($puck_17);
      return identifier;
    }
    else {
      if (true) {
        $puck_17;
        return $puck_7.TokenStream.croak.call(input, "Expected identifier, " + butGot());
      };
    };
  };
  function maybeConsumeToken(kind) {
    if (isToken(kind)) {
      return $puck_1.Some(consumeToken(kind));
    }
    else {
      return $puck_1.None;
    };
  };
  function unexpected() {
    const name = $puck_5.Token.name.call($puck_7.TokenStream.peek.call(input));
    return $puck_7.TokenStream.croak.call(input, "Unexpected token: " + name + "");
  };
  function attributeNotSupported() {
    return $puck_7.TokenStream.croak.call(input, "Attributes are only supported on enum, trait and type declarations");
  };
  function consumeSeparator(kind) {
    let token = $puck_7.TokenStream.peek.call(input, true);
    let $puck_18 = token;
    if (($unwrapTraitObject($puck_18).kind === "SimpleToken" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_18).value).kind).kind === "NewlineToken")) {
      let {value: {}} = $unwrapTraitObject($puck_18);
      $puck_7.TokenStream.next.call(input, true);
    }
    else {
      if ($unwrapTraitObject($puck_18).kind === "Comment") {
        $unwrapTraitObject($puck_18);
        $puck_7.TokenStream.next.call(input, true);
      }
      else {
        if (true) {
          $puck_18;
          consumeToken(kind);
        };
      };
    };
  };
  function mockBlock() {
    return {
      openBrace: $puck_1.None,
      statements: [$puck_3.BlockLevelStatement.Expression($puck_3.Expression.Identifier(consumeIdentifier()))],
      closeBrace: $puck_1.None,
      type_: $puck_2._undefined,
    };
  };
  function maybeParseOperator() {
    let $puck_19 = $puck_7.TokenStream.peek.call(input);
    if ($unwrapTraitObject($puck_19).kind === "SimpleToken") {
      let {value: token} = $unwrapTraitObject($puck_19);
      let $puck_20 = token.kind;
      if ($unwrapTraitObject($puck_20).kind === "EqualsEqualsToken") {
        $unwrapTraitObject($puck_20);
        return $puck_1.Some(token);
      }
      else {
        if ($unwrapTraitObject($puck_20).kind === "ExclamationEqualsToken") {
          $unwrapTraitObject($puck_20);
          return $puck_1.Some(token);
        }
        else {
          if ($unwrapTraitObject($puck_20).kind === "GreaterThanToken") {
            $unwrapTraitObject($puck_20);
            return $puck_1.Some(token);
          }
          else {
            if ($unwrapTraitObject($puck_20).kind === "GreaterThanEqualsToken") {
              $unwrapTraitObject($puck_20);
              return $puck_1.Some(token);
            }
            else {
              if ($unwrapTraitObject($puck_20).kind === "LessThanToken") {
                $unwrapTraitObject($puck_20);
                return $puck_1.Some(token);
              }
              else {
                if ($unwrapTraitObject($puck_20).kind === "LessThanEqualsToken") {
                  $unwrapTraitObject($puck_20);
                  return $puck_1.Some(token);
                }
                else {
                  if ($unwrapTraitObject($puck_20).kind === "PlusToken") {
                    $unwrapTraitObject($puck_20);
                    return $puck_1.Some(token);
                  }
                  else {
                    if ($unwrapTraitObject($puck_20).kind === "MinusToken") {
                      $unwrapTraitObject($puck_20);
                      return $puck_1.Some(token);
                    }
                    else {
                      if ($unwrapTraitObject($puck_20).kind === "AsteriskToken") {
                        $unwrapTraitObject($puck_20);
                        return $puck_1.Some(token);
                      }
                      else {
                        if ($unwrapTraitObject($puck_20).kind === "AsteriskAsteriskToken") {
                          $unwrapTraitObject($puck_20);
                          return $puck_1.Some(token);
                        }
                        else {
                          if ($unwrapTraitObject($puck_20).kind === "SlashToken") {
                            $unwrapTraitObject($puck_20);
                            return $puck_1.Some(token);
                          }
                          else {
                            if ($unwrapTraitObject($puck_20).kind === "PercentToken") {
                              $unwrapTraitObject($puck_20);
                              return $puck_1.Some(token);
                            }
                            else {
                              if ($unwrapTraitObject($puck_20).kind === "AndKeyword") {
                                $unwrapTraitObject($puck_20);
                                return $puck_1.Some(token);
                              }
                              else {
                                if ($unwrapTraitObject($puck_20).kind === "OrKeyword") {
                                  $unwrapTraitObject($puck_20);
                                  return $puck_1.Some(token);
                                }
                                else {
                                  if ($unwrapTraitObject($puck_20).kind === "NotKeyword") {
                                    $unwrapTraitObject($puck_20);
                                    return $puck_1.Some(token);
                                  }
                                  else {
                                    if (true) {
                                      $puck_20;
                                      if (isAssignment(token)) {
                                        return $puck_1.Some(token);
                                      }
                                      else {
                                        return $puck_1.None;
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
    }
    else {
      if (true) {
        $puck_19;
        return $puck_1.None;
      };
    };
  };
  function maybeBinary(left, myPrecedence) {
    let $puck_21 = maybeParseOperator();
    if ($puck_21.kind === "Some") {
      let {value: operator} = $puck_21;
      let hisPrecedence = $puck_5.SyntaxKind.precedence.call(operator.kind);
      if (hisPrecedence > myPrecedence) {
        $puck_7.TokenStream.next.call(input);
        let innerExpression = maybeBinary(parseAtom(), hisPrecedence);
        let $puck_22;
        if (isAssignment(operator)) {
          if ((!isAssignable(left))) {
            $puck_7.TokenStream.croak.call(input, "Can only assign to an identifier");
          };
          $puck_22 = $puck_3.Expression.AssignmentExpression({
            lhs: left,
            token: operator,
            rhs: innerExpression,
          });
        }
        else {
          $puck_22 = $puck_3.Expression.BinaryExpression({
            lhs: left,
            operator: operator,
            rhs: innerExpression,
          });
        };
        const e = $puck_22;
        return maybeBinary(e, myPrecedence);
      };
    };
    return left;
  };
  function maybeCall(expression) {
    if (isToken($puck_5.SyntaxKind.ColonColonLessThanToken)) {
      return maybeCall(maybeAccess($puck_3.Expression.CallExpression({
        func: expression,
        typeArguments: $puck_1.Some({
        openBracket: expect($puck_5.SyntaxKind.ColonColonLessThanToken),
        typeArguments: delimited($puck_5.SyntaxKind.ColonColonLessThanToken, $puck_5.SyntaxKind.GreaterThanToken, $puck_5.SyntaxKind.CommaToken, parseTypeBound, false),
        closeBracket: consumeToken($puck_5.SyntaxKind.GreaterThanToken),
      }),
        openParen: expect($puck_5.SyntaxKind.OpenParenToken),
        argumentList: delimited($puck_5.SyntaxKind.OpenParenToken, $puck_5.SyntaxKind.CloseParenToken, $puck_5.SyntaxKind.CommaToken, parseExpression, false),
        closeParen: consumeToken($puck_5.SyntaxKind.CloseParenToken),
      })));
    }
    else {
      if (isToken($puck_5.SyntaxKind.OpenParenToken, true)) {
        return maybeCall(maybeAccess($puck_3.Expression.CallExpression({
          func: expression,
          typeArguments: $puck_1.None,
          openParen: expect($puck_5.SyntaxKind.OpenParenToken),
          argumentList: delimited($puck_5.SyntaxKind.OpenParenToken, $puck_5.SyntaxKind.CloseParenToken, $puck_5.SyntaxKind.CommaToken, parseExpression, false),
          closeParen: consumeToken($puck_5.SyntaxKind.CloseParenToken),
        })));
      }
      else {
        return expression;
      };
    };
  };
  function maybeAccess(expression) {
    return maybeUnknownAccess(maybeIndexAccess(maybeMemberAccess(expression)));
  };
  function maybeMemberAccess(expression) {
    if (isToken($puck_5.SyntaxKind.DotToken)) {
      $puck_7.TokenStream.next.call(input);
      return maybeAccess($puck_3.Expression.MemberAccess({
        object: expression,
        member: consumeIdentifier(),
      }));
    }
    else {
      return expression;
    };
  };
  function maybeIndexAccess(expression) {
    if (isToken($puck_5.SyntaxKind.OpenBracketToken, true)) {
      const openBracket = consumeToken($puck_5.SyntaxKind.OpenBracketToken);
      const index = parseExpression();
      const closeBracket = consumeToken($puck_5.SyntaxKind.CloseBracketToken);
      return maybeAccess($puck_3.Expression.IndexAccess({
        object: expression,
        openBracket: openBracket,
        index: index,
        closeBracket: closeBracket,
      }));
    }
    else {
      return expression;
    };
  };
  function maybeUnknownAccess(expression) {
    if (isToken($puck_5.SyntaxKind.MinusGreaterThanToken)) {
      $puck_7.TokenStream.next.call(input);
      if (isToken($puck_5.SyntaxKind.OpenBracketToken)) {
        const openBracket = consumeToken($puck_5.SyntaxKind.OpenBracketToken);
        const index = parseExpression();
        const closeBracket = consumeToken($puck_5.SyntaxKind.CloseBracketToken);
        return maybeAccess($puck_3.Expression.UnknownIndexAccess({
          object: expression,
          openBracket: openBracket,
          index: index,
          closeBracket: closeBracket,
        }));
      }
      else {
        return maybeAccess($puck_3.Expression.UnknownAccess({
          object: expression,
          member: consumeIdentifier(),
        }));
      };
    }
    else {
      return expression;
    };
  };
  function delimited(start, stop, separator, parser, consumeStop) {
    let parts = [];
    let first = true;
    consumeToken(start);
    while (!$puck_7.TokenStream.eof.call(input)) {
      if (isToken(stop)) {
        break      };
      if (first) {
        first = false;
      }
      else {
        consumeSeparator(separator);
      };
      let part;
      while (!part) {
        if (isToken(stop)) {
          break        };
        part = parser();
      };
      if (part) {
        $puck_1.List.push.call(parts, part);
      };
    };
    if (consumeStop) {
      consumeToken(stop);
    };
    return parts;
  };
  function parseModule() {
    let exports = {};
    let statements = [];
    while (!$puck_7.TokenStream.eof.call(input)) {
      const statement = parseTopLevelStatement();
      $puck_1.List.push.call(statements, statement);
      let $puck_23 = statement;
      if ($puck_23.kind === "ExportDirective") {
        let {value: e} = $puck_23;
        exports[e.identifier.name] = e;
      };
      consumeSeparator($puck_5.SyntaxKind.SemicolonToken);
    };
    return {
      fileName: file.fileName,
      path: file.absolutePath,
      exports: exports,
      statements: statements,
      file: file,
      scope: $puck_2._undefined,
    };
  };
  function parseTopLevelStatement() {
    let $puck_24 = $puck_7.TokenStream.peek.call(input);
    if ($unwrapTraitObject($puck_24).kind === "SimpleToken") {
      let {value: token} = $unwrapTraitObject($puck_24);
      let $puck_25 = token.kind;
      if ($unwrapTraitObject($puck_25).kind === "HashToken") {
        $unwrapTraitObject($puck_25);
        return parseDeclarationWithAttribute();
      }
      else {
        if ($unwrapTraitObject($puck_25).kind === "EnumKeyword") {
          $unwrapTraitObject($puck_25);
          return $puck_3.TopLevelStatement.EnumDeclaration(parseEnumDeclaration());
        }
        else {
          if ($unwrapTraitObject($puck_25).kind === "ExportKeyword") {
            $unwrapTraitObject($puck_25);
            return $puck_3.TopLevelStatement.ExportDirective(parseExport());
          }
          else {
            if ($unwrapTraitObject($puck_25).kind === "ImplKeyword") {
              $unwrapTraitObject($puck_25);
              return parseImplDeclaration();
            }
            else {
              if ($unwrapTraitObject($puck_25).kind === "ImportKeyword") {
                $unwrapTraitObject($puck_25);
                return $puck_3.TopLevelStatement.ImportDirective(parseImport());
              }
              else {
                if ($unwrapTraitObject($puck_25).kind === "TraitKeyword") {
                  $unwrapTraitObject($puck_25);
                  return $puck_3.TopLevelStatement.TraitDeclaration(parseTraitDeclaration());
                }
                else {
                  if ($unwrapTraitObject($puck_25).kind === "TypeKeyword") {
                    $unwrapTraitObject($puck_25);
                    return $puck_3.TopLevelStatement.TypeDeclaration(parseTypeDeclaration());
                  }
                  else {
                    if (true) {
                      $puck_25;
                      return $puck_3.TopLevelStatement.BlockLevelStatement(parseBlockLevelStatement());
                    };
                  };
                };
              };
            };
          };
        };
      };
    }
    else {
      if (true) {
        $puck_24;
        return $puck_3.TopLevelStatement.BlockLevelStatement(parseBlockLevelStatement());
      };
    };
  };
  function parseBlockLevelStatement() {
    let $puck_26 = $puck_7.TokenStream.peek.call(input);
    if (($unwrapTraitObject($puck_26).kind === "SimpleToken" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_26).value).kind).kind === "BreakKeyword")) {
      let {value: {}} = $unwrapTraitObject($puck_26);
      return $puck_3.BlockLevelStatement.BreakStatement({keyword: consumeToken($puck_5.SyntaxKind.BreakKeyword)});
    }
    else {
      if (($unwrapTraitObject($puck_26).kind === "SimpleToken" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_26).value).kind).kind === "ReturnKeyword")) {
        let {value: {}} = $unwrapTraitObject($puck_26);
        return $puck_3.BlockLevelStatement.ReturnStatement({
          keyword: consumeToken($puck_5.SyntaxKind.ReturnKeyword),
          expression: parseExpression(),
        });
      }
      else {
        if (($unwrapTraitObject($puck_26).kind === "SimpleToken" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_26).value).kind).kind === "WhileKeyword")) {
          let {value: {}} = $unwrapTraitObject($puck_26);
          return $puck_3.BlockLevelStatement.WhileLoop(parseWhile());
        }
        else {
          if (true) {
            $puck_26;
            return $puck_3.BlockLevelStatement.Expression(parseExpression());
          };
        };
      };
    };
  };
  function parseExpression(precedence = 0, forceTuple = false) {
    return maybeCall(maybeAccess(maybeBinary(parseAtom(forceTuple), precedence)));
  };
  function parseAtom(forceTuple = false) {
    let $puck_27 = $puck_7.TokenStream.peek.call(input);
    let $puck_28;
    if ($unwrapTraitObject($puck_27).kind === "SimpleToken") {
      let {value: token} = $unwrapTraitObject($puck_27);
      let $puck_29 = token.kind;
      let $puck_30;
      if ($unwrapTraitObject($puck_29).kind === "OpenParenToken") {
        $unwrapTraitObject($puck_29);
        $puck_30 = parseTupleOrExpression(forceTuple);
      }
      else {
        let $puck_31;
        if ($unwrapTraitObject($puck_29).kind === "OpenBracketToken") {
          $unwrapTraitObject($puck_29);
          $puck_31 = $puck_3.Expression.ListLiteral(parseListLiteral());
        }
        else {
          let $puck_32;
          if ($unwrapTraitObject($puck_29).kind === "OpenBraceToken") {
            $unwrapTraitObject($puck_29);
            $puck_32 = $puck_3.Expression.RecordLiteral(parseRecordLiteral());
          }
          else {
            let $puck_33;
            if ($unwrapTraitObject($puck_29).kind === "BarToken") {
              $unwrapTraitObject($puck_29);
              $puck_33 = $puck_3.Expression.FunctionDeclaration(parseLambda());
            }
            else {
              let $puck_34;
              if ($unwrapTraitObject($puck_29).kind === "IfKeyword") {
                $unwrapTraitObject($puck_29);
                $puck_34 = parseIf();
              }
              else {
                let $puck_35;
                if ($unwrapTraitObject($puck_29).kind === "MatchKeyword") {
                  $unwrapTraitObject($puck_29);
                  $puck_35 = $puck_3.Expression.MatchExpression(parseMatch());
                }
                else {
                  let $puck_36;
                  if ($unwrapTraitObject($puck_29).kind === "FnKeyword") {
                    $unwrapTraitObject($puck_29);
                    $puck_36 = $puck_3.Expression.FunctionDeclaration(parseFunctionDeclaration());
                  }
                  else {
                    let $puck_37;
                    if ($unwrapTraitObject($puck_29).kind === "LetKeyword") {
                      $unwrapTraitObject($puck_29);
                      $puck_7.TokenStream.next.call(input);
                      $puck_37 = $puck_3.Expression.VariableDeclaration(parseVariableDeclaration());
                    }
                    else {
                      let $puck_38;
                      if ($unwrapTraitObject($puck_29).kind === "NotKeyword") {
                        $unwrapTraitObject($puck_29);
                        $puck_38 = $puck_3.Expression.UnaryExpression(parseUnaryExpression());
                      }
                      else {
                        let $puck_39;
                        if ($unwrapTraitObject($puck_29).kind === "MinusToken") {
                          $unwrapTraitObject($puck_29);
                          $puck_39 = $puck_3.Expression.UnaryExpression(parseUnaryExpression());
                        }
                        else {
                          let $puck_40;
                          if ($unwrapTraitObject($puck_29).kind === "PlusToken") {
                            $unwrapTraitObject($puck_29);
                            $puck_40 = $puck_3.Expression.UnaryExpression(parseUnaryExpression());
                          }
                          else {
                            let $puck_41;
                            if ($unwrapTraitObject($puck_29).kind === "ThrowKeyword") {
                              $unwrapTraitObject($puck_29);
                              $puck_7.TokenStream.next.call(input);
                              $puck_41 = $puck_3.Expression.ThrowStatement({expression: parseExpression()});
                            }
                            else {
                              let $puck_42;
                              if ($unwrapTraitObject($puck_29).kind === "TrueKeyword") {
                                $unwrapTraitObject($puck_29);
                                $puck_42 = maybeAccess($puck_3.Expression.BooleanLiteral({
                                  keyword: consumeToken($puck_5.SyntaxKind.TrueKeyword),
                                  value: true,
                                }));
                              }
                              else {
                                let $puck_43;
                                if ($unwrapTraitObject($puck_29).kind === "FalseKeyword") {
                                  $unwrapTraitObject($puck_29);
                                  $puck_43 = maybeAccess($puck_3.Expression.BooleanLiteral({
                                    keyword: consumeToken($puck_5.SyntaxKind.FalseKeyword),
                                    value: false,
                                  }));
                                }
                                else {
                                  let $puck_44;
                                  if (true) {
                                    $puck_29;
                                    let $puck_45;
                                    if (recover) {
                                      $puck_45 = $puck_3.Expression.Identifier(consumeIdentifier());
                                    }
                                    else {
                                      $puck_45 = unexpected();
                                    };
                                    $puck_44 = $puck_45;
                                  };
                                  $puck_43 = $puck_44;
                                };
                                $puck_42 = $puck_43;
                              };
                              $puck_41 = $puck_42;
                            };
                            $puck_40 = $puck_41;
                          };
                          $puck_39 = $puck_40;
                        };
                        $puck_38 = $puck_39;
                      };
                      $puck_37 = $puck_38;
                    };
                    $puck_36 = $puck_37;
                  };
                  $puck_35 = $puck_36;
                };
                $puck_34 = $puck_35;
              };
              $puck_33 = $puck_34;
            };
            $puck_32 = $puck_33;
          };
          $puck_31 = $puck_32;
        };
        $puck_30 = $puck_31;
      };
      $puck_28 = $puck_30;
    }
    else {
      let $puck_46;
      if ($unwrapTraitObject($puck_27).kind === "NumberLiteral") {
        let {value: numberLiteral} = $unwrapTraitObject($puck_27);
        $puck_7.TokenStream.next.call(input);
        $puck_46 = maybeAccess($puck_3.Expression.NumberLiteral(numberLiteral));
      }
      else {
        let $puck_47;
        if ($unwrapTraitObject($puck_27).kind === "StringLiteral") {
          let {value: stringLiteral} = $unwrapTraitObject($puck_27);
          $puck_7.TokenStream.next.call(input);
          $puck_47 = maybeAccess($puck_3.Expression.StringLiteral(stringLiteral));
        }
        else {
          let $puck_48;
          if ($unwrapTraitObject($puck_27).kind === "Identifier") {
            let {value: identifier} = $unwrapTraitObject($puck_27);
            $puck_48 = parseIdentifierOrTypePath();
          }
          else {
            let $puck_49;
            if ($unwrapTraitObject($puck_27).kind === "Comment") {
              $unwrapTraitObject($puck_27);
              $puck_49 = unexpected();
            };
            $puck_48 = $puck_49;
          };
          $puck_47 = $puck_48;
        };
        $puck_46 = $puck_47;
      };
      $puck_28 = $puck_46;
    };
    return maybeCall($puck_28);
  };
  function parseSimpleLiteral() {
    let $puck_50 = $puck_7.TokenStream.next.call(input);
    if ($unwrapTraitObject($puck_50).kind === "SimpleToken") {
      let {value: token} = $unwrapTraitObject($puck_50);
      let $puck_51 = token.kind;
      if ($unwrapTraitObject($puck_51).kind === "TrueKeyword") {
        $unwrapTraitObject($puck_51);
        return $puck_3.SimpleLiteral.BooleanLiteral({
          keyword: token,
          value: true,
        });
      }
      else {
        if ($unwrapTraitObject($puck_51).kind === "FalseKeyword") {
          $unwrapTraitObject($puck_51);
          return $puck_3.SimpleLiteral.BooleanLiteral({
            keyword: token,
            value: false,
          });
        }
        else {
          if (true) {
            $puck_51;
            return unexpected();
          };
        };
      };
    }
    else {
      if ($unwrapTraitObject($puck_50).kind === "NumberLiteral") {
        let {value: numberLiteral} = $unwrapTraitObject($puck_50);
        return $puck_3.SimpleLiteral.NumberLiteral(numberLiteral);
      }
      else {
        if ($unwrapTraitObject($puck_50).kind === "StringLiteral") {
          let {value: stringLiteral} = $unwrapTraitObject($puck_50);
          if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: stringLiteral.parts, $isTraitObject: true}) > 1) {
            $puck_7.TokenStream.croak.call(input, "Attributes can only contain simple string literals. Interpolation is not supported.");
          };
          let $puck_52 = $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: stringLiteral.parts, $isTraitObject: true}, 0);
          if ($unwrapTraitObject($puck_52).kind === "Literal") {
            let {value: literal} = $unwrapTraitObject($puck_52);
            return $puck_3.SimpleLiteral.StringLiteral(literal);
          }
          else {
            if (true) {
              $puck_52;
              return $puck_1.panic("String literal does not start with a literal");
            };
          };
        }
        else {
          if (true) {
            $puck_50;
            return unexpected();
          };
        };
      };
    };
  };
  function parseAttributeArgument() {
    const name = consumeIdentifier();
    const value = $puck_1.Option.map.call(maybeConsumeToken($puck_5.SyntaxKind.EqualsToken), function ($puck_53) {
      return parseSimpleLiteral();
    });
    return {
      name: name,
      value: value,
    };
  };
  function parseAttribute() {
    const hashToken = consumeToken($puck_5.SyntaxKind.HashToken);
    const openBracket = consumeToken($puck_5.SyntaxKind.OpenBracketToken);
    const name = consumeIdentifier();
    let $puck_54;
    if ($puck_1.Option.isSome.call(maybeConsumeToken($puck_5.SyntaxKind.EqualsToken))) {
      $puck_54 = $puck_3.AttributeData.Value(parseSimpleLiteral());
    }
    else {
      let $puck_55;
      if (isToken($puck_5.SyntaxKind.OpenParenToken)) {
        $puck_55 = $puck_3.AttributeData.Arguments(delimited($puck_5.SyntaxKind.OpenParenToken, $puck_5.SyntaxKind.CloseParenToken, $puck_5.SyntaxKind.CommaToken, parseAttributeArgument, true));
      }
      else {
        $puck_55 = $puck_3.AttributeData.None;
      };
      $puck_54 = $puck_55;
    };
    const data = $puck_54;
    const closeBracket = consumeToken($puck_5.SyntaxKind.CloseBracketToken);
    return {
      hashToken: hashToken,
      openBracket: openBracket,
      name: name,
      data: data,
      closeBracket: closeBracket,
    };
  };
  function parseDeclarationWithAttribute() {
    let attributes = [];
    while (isToken($puck_5.SyntaxKind.HashToken)) {
      $puck_1.List.push.call(attributes, parseAttribute());
    };
    if (isToken($puck_5.SyntaxKind.EnumKeyword)) {
      return $puck_3.TopLevelStatement.EnumDeclaration(parseEnumDeclaration(attributes));
    }
    else {
      if (isToken($puck_5.SyntaxKind.ExportKeyword)) {
        return $puck_3.TopLevelStatement.ExportDirective(parseExport(attributes));
      }
      else {
        if (isToken($puck_5.SyntaxKind.TraitKeyword)) {
          return $puck_3.TopLevelStatement.TraitDeclaration(parseTraitDeclaration(attributes));
        }
        else {
          if (isToken($puck_5.SyntaxKind.TypeKeyword)) {
            return $puck_3.TopLevelStatement.TypeDeclaration(parseTypeDeclaration(attributes));
          }
          else {
            return attributeNotSupported();
          };
        };
      };
    };
  };
  function parseEnumDeclaration(attributes = []) {
    const keyword = consumeToken($puck_5.SyntaxKind.EnumKeyword);
    const name = consumeIdentifier();
    let $puck_56;
    if (isToken($puck_5.SyntaxKind.LessThanToken)) {
      $puck_56 = delimited($puck_5.SyntaxKind.LessThanToken, $puck_5.SyntaxKind.GreaterThanToken, $puck_5.SyntaxKind.CommaToken, parseTypeParameter, true);
    }
    else {
      $puck_56 = [];
    };
    const typeParameters = $puck_56;
    const openBrace = expect($puck_5.SyntaxKind.OpenBraceToken);
    const members = delimited($puck_5.SyntaxKind.OpenBraceToken, $puck_5.SyntaxKind.CloseBraceToken, $puck_5.SyntaxKind.CommaToken, parseEnumMember, false);
    const closeBrace = consumeToken($puck_5.SyntaxKind.CloseBraceToken);
    return {
      attributes: attributes,
      keyword: keyword,
      name: name,
      typeParameters: typeParameters,
      openBrace: openBrace,
      members: members,
      closeBrace: closeBrace,
    };
  };
  function parseEnumMember() {
    const name = consumeIdentifier();
    let $puck_57;
    if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
      $puck_57 = $puck_1.Some(parseRecordTypeBound());
    }
    else {
      let $puck_58;
      if (isToken($puck_5.SyntaxKind.OpenParenToken)) {
        $puck_58 = $puck_1.Some(parseTupleTypeBound());
      }
      else {
        $puck_58 = $puck_1.None;
      };
      $puck_57 = $puck_58;
    };
    const bound = $puck_57;
    return {
      name: name,
      bound: bound,
    };
  };
  function parseImplDeclaration() {
    const implKeyword = consumeToken($puck_5.SyntaxKind.ImplKeyword);
    let $puck_59;
    if (isToken($puck_5.SyntaxKind.LessThanToken)) {
      $puck_59 = delimited($puck_5.SyntaxKind.LessThanToken, $puck_5.SyntaxKind.GreaterThanToken, $puck_5.SyntaxKind.CommaToken, parseTypeParameter, true);
    }
    else {
      $puck_59 = [];
    };
    const typeParameters = $puck_59;
    const trait_ = parseNamedTypeBound();
    let $puck_60;
    if (isToken($puck_5.SyntaxKind.ForKeyword)) {
      $puck_60 = {
        forKeyword: $puck_1.Some(consumeToken($puck_5.SyntaxKind.ForKeyword)),
        type_: $puck_1.Some(parseNamedTypeBound()),
      };
    }
    else {
      $puck_60 = {
        forKeyword: $puck_1.None,
        type_: $puck_1.None,
      };
    };
    let {forKeyword: forKeyword, type_: type_} = $puck_60;
    const openBrace = expect($puck_5.SyntaxKind.OpenBraceToken);
    const members = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].toList.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: delimited($puck_5.SyntaxKind.OpenBraceToken, $puck_5.SyntaxKind.CloseBraceToken, $puck_5.SyntaxKind.SemicolonToken, parseFunctionDeclaration, false), $isTraitObject: true});
    const closeBrace = consumeToken($puck_5.SyntaxKind.CloseBraceToken);
    let $puck_61 = type_;
    if ($puck_61.kind === "Some") {
      let {value: type_} = $puck_61;
      return $puck_3.TopLevelStatement.ImplDeclaration({
        implKeyword: implKeyword,
        typeParameters: typeParameters,
        trait_: trait_,
        forKeyword: $puck_1.Option.unwrap.call(forKeyword),
        type_: type_,
        openBrace: openBrace,
        members: members,
        closeBrace: closeBrace,
      });
    }
    else {
      return $puck_3.TopLevelStatement.ImplShorthandDeclaration({
        implKeyword: implKeyword,
        typeParameters: typeParameters,
        type_: trait_,
        openBrace: openBrace,
        members: members,
        closeBrace: closeBrace,
      });
    };
  };
  function parseTraitDeclaration(attributes = []) {
    const keyword = consumeToken($puck_5.SyntaxKind.TraitKeyword);
    const name = consumeIdentifier();
    let $puck_62;
    if (isToken($puck_5.SyntaxKind.LessThanToken)) {
      $puck_62 = delimited($puck_5.SyntaxKind.LessThanToken, $puck_5.SyntaxKind.GreaterThanToken, $puck_5.SyntaxKind.CommaToken, parseTypeParameter, true);
    }
    else {
      $puck_62 = [];
    };
    const typeParameters = $puck_62;
    const openBrace = expect($puck_5.SyntaxKind.OpenBraceToken);
    const members = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].toList.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: delimited($puck_5.SyntaxKind.OpenBraceToken, $puck_5.SyntaxKind.CloseBraceToken, $puck_5.SyntaxKind.SemicolonToken, function () {
      return parseFunctionDeclaration(true);
    }, false), $isTraitObject: true});
    const closeBrace = consumeToken($puck_5.SyntaxKind.CloseBraceToken);
    return {
      attributes: attributes,
      keyword: keyword,
      name: name,
      typeParameters: typeParameters,
      openBrace: openBrace,
      members: members,
      closeBrace: closeBrace,
    };
  };
  function parseTypeDeclaration(attributes = []) {
    const keyword = consumeToken($puck_5.SyntaxKind.TypeKeyword);
    const name = consumeIdentifier();
    let $puck_63;
    if (isToken($puck_5.SyntaxKind.LessThanToken)) {
      $puck_63 = delimited($puck_5.SyntaxKind.LessThanToken, $puck_5.SyntaxKind.GreaterThanToken, $puck_5.SyntaxKind.CommaToken, parseTypeParameter, true);
    }
    else {
      $puck_63 = [];
    };
    const typeParameters = $puck_63;
    let $puck_64;
    if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
      $puck_64 = $puck_1.Some(parseRecordTypeBound());
    }
    else {
      let $puck_65;
      if (isToken($puck_5.SyntaxKind.OpenParenToken)) {
        $puck_65 = $puck_1.Some(parseTupleTypeBound());
      }
      else {
        $puck_65 = $puck_1.None;
      };
      $puck_64 = $puck_65;
    };
    const bound = $puck_64;
    return {
      attributes: attributes,
      keyword: keyword,
      name: name,
      typeParameters: typeParameters,
      bound: bound,
      type_: $unwrapTraitObject($puck_2._undefined),
    };
  };
  function parseExport(attributes = []) {
    const keyword = consumeToken($puck_5.SyntaxKind.ExportKeyword);
    let statement;
    let identifier;
    if (isToken($puck_5.SyntaxKind.EnumKeyword)) {
      const enumDeclaration = parseEnumDeclaration(attributes);
      statement = $puck_3.ExportedStatement.EnumDeclaration(enumDeclaration);
      identifier = enumDeclaration.name;
    }
    else {
      if (isToken($puck_5.SyntaxKind.TraitKeyword)) {
        const traitDeclaration = parseTraitDeclaration(attributes);
        statement = $puck_3.ExportedStatement.TraitDeclaration(traitDeclaration);
        identifier = traitDeclaration.name;
      }
      else {
        if (isToken($puck_5.SyntaxKind.TypeKeyword)) {
          const typeDeclaration = parseTypeDeclaration(attributes);
          statement = $puck_3.ExportedStatement.TypeDeclaration(typeDeclaration);
          identifier = typeDeclaration.name;
        }
        else {
          if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: attributes, $isTraitObject: true})) {
            if (isToken($puck_5.SyntaxKind.FnKeyword)) {
              const functionDeclaration = parseFunctionDeclaration();
              statement = $puck_3.ExportedStatement.FunctionDeclaration(functionDeclaration);
              let $puck_66 = functionDeclaration.name;
              if ($puck_66.kind === "Some") {
                let {value: name} = $puck_66;
                identifier = name;
              }
              else {
                $puck_7.TokenStream.croak.call(input, "Can not export function without a name");
              };
            }
            else {
              if (isToken($puck_5.SyntaxKind.LetKeyword)) {
                $puck_7.TokenStream.next.call(input);
                const variableDeclaration = parseVariableDeclaration();
                statement = $puck_3.ExportedStatement.VariableDeclaration(variableDeclaration);
                let $puck_67 = variableDeclaration.pattern;
                if ($puck_67.kind === "Identifier") {
                  let {value: {identifier: name}} = $puck_67;
                  identifier = name;
                }
                else {
                  $puck_7.TokenStream.croak.call(input, "Can not export a let declaration without a identifier pattern");
                };
              }
              else {
                $puck_7.TokenStream.croak.call(input, "Expected trait, type, function or variable declaration after export");
              };
            };
          }
          else {
            attributeNotSupported();
          };
        };
      };
    };
    return {
      keyword: keyword,
      identifier: identifier,
      statement: statement,
    };
  };
  function parseImport() {
    const importKeyword = consumeToken($puck_5.SyntaxKind.ImportKeyword);
    let $puck_68 = $puck_7.TokenStream.next.call(input);
    let $puck_69;
    if ($unwrapTraitObject($puck_68).kind === "StringLiteral") {
      let {value: stringLiteral} = $unwrapTraitObject($puck_68);
      $puck_69 = stringLiteral;
    }
    else {
      let $puck_70;
      if (true) {
        $puck_68;
        $puck_70 = $puck_7.TokenStream.croak.call(input, "Expected string, " + butGot());
      };
      $puck_69 = $puck_70;
    };
    const locator = $puck_69;
    if (($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: locator.parts, $isTraitObject: true}) !== 1)) {
      $puck_1.panic("More than one part in import string");
    };
    let $puck_71 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: locator.parts, $isTraitObject: true});
    let $puck_72;
    if (($unwrapTraitObject($puck_71).kind === "Some" && $unwrapTraitObject($unwrapTraitObject($puck_71).value).kind === "Literal")) {
      let {value: {value: {value: value}}} = $unwrapTraitObject($puck_71);
      $puck_72 = $puck_1.String.split.call(value, ":");
    }
    else {
      let $puck_73;
      if (true) {
        $puck_71;
        $puck_73 = $puck_1.panic("String literal does not start with a literal");
      };
      $puck_72 = $puck_73;
    };
    const parts = $puck_72;
    if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parts, $isTraitObject: true}) > 2) {
      $puck_7.TokenStream.croak.call(input, "Illegal token \":\" used in import path");
    };
    let $puck_74;
    if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parts, $isTraitObject: true}) === 2) {
      $puck_74 = $puck_1.Some($puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: parts, $isTraitObject: true}, 0));
    }
    else {
      $puck_74 = $puck_1.None;
    };
    const domain = $puck_74;
    let $puck_75;
    if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parts, $isTraitObject: true}) === 2) {
      $puck_75 = $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: parts, $isTraitObject: true}, 1);
    }
    else {
      $puck_75 = $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: parts, $isTraitObject: true}, 0);
    };
    const path = $puck_75;
    if ((recover && !isToken($puck_5.SyntaxKind.AsKeyword))) {
      return {
        importKeyword: importKeyword,
        locator: locator,
        domain: domain,
        path: path,
        asKeyword: {
        kind: $puck_5.SyntaxKind.AsKeyword,
        span: $puck_4.Span.empty(),
      },
        specifier: $puck_3.ImportSpecifier.Identifier(consumeIdentifier()),
        _module: $puck_1.None,
      };
    };
    const asKeyword = consumeToken($puck_5.SyntaxKind.AsKeyword);
    let $puck_76;
    if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
      $puck_76 = $puck_3.ImportSpecifier.ObjectDestructure(parseObjectDestructure());
    }
    else {
      let $puck_77;
      if (isToken($puck_5.SyntaxKind.AsteriskToken)) {
        $puck_77 = $puck_3.ImportSpecifier.Asterisk(consumeToken($puck_5.SyntaxKind.AsteriskToken));
      }
      else {
        $puck_77 = $puck_3.ImportSpecifier.Identifier(consumeIdentifier());
      };
      $puck_76 = $puck_77;
    };
    const specifier = $puck_76;
    return {
      importKeyword: importKeyword,
      locator: locator,
      domain: domain,
      path: path,
      asKeyword: asKeyword,
      specifier: specifier,
      _module: $puck_1.None,
    };
  };
  function parseObjectDestructure() {
    const openBrace = expect($puck_5.SyntaxKind.OpenBraceToken);
    const members = delimited($puck_5.SyntaxKind.OpenBraceToken, $puck_5.SyntaxKind.CloseBraceToken, $puck_5.SyntaxKind.CommaToken, parseObjectDestructureMember, false);
    const closeBrace = consumeToken($puck_5.SyntaxKind.CloseBraceToken);
    return {
      openBrace: openBrace,
      members: members,
      closeBrace: closeBrace,
    };
  };
  function parseObjectDestructureMember() {
    const property = consumeIdentifier();
    let $puck_78;
    if (isToken($puck_5.SyntaxKind.ColonToken)) {
      $puck_7.TokenStream.next.call(input);
      $puck_78 = consumeIdentifier();
    }
    else {
      $puck_78 = property;
    };
    const local = $puck_78;
    return {
      property: property,
      local: local,
      file: $puck_1.None,
    };
  };
  function parseBlock() {
    const openBrace = $puck_1.Some(expect($puck_5.SyntaxKind.OpenBraceToken));
    const statements = delimited($puck_5.SyntaxKind.OpenBraceToken, $puck_5.SyntaxKind.CloseBraceToken, $puck_5.SyntaxKind.SemicolonToken, parseBlockLevelStatement, false);
    const closeBrace = $puck_1.Some(consumeToken($puck_5.SyntaxKind.CloseBraceToken));
    return {
      openBrace: openBrace,
      statements: statements,
      closeBrace: closeBrace,
      type_: $unwrapTraitObject($puck_2._undefined),
    };
  };
  function parseWhile() {
    const keyword = consumeToken($puck_5.SyntaxKind.WhileKeyword);
    const condition = parseExpression();
    const body = parseBlock();
    return {
      keyword: keyword,
      condition: condition,
      body: body,
    };
  };
  function parseIdentifierOrTypePath() {
    const identifier = consumeIdentifier();
    if (isToken($puck_5.SyntaxKind.ColonColonToken)) {
      return $puck_3.Expression.TypePathExpression({typePath: parseTypePath($puck_1.Some(identifier))});
    }
    else {
      return maybeAccess($puck_3.Expression.Identifier(identifier));
    };
  };
  function parseFunctionDeclaration(optionalBody = false) {
    if ((!recover || isToken($puck_5.SyntaxKind.FnKeyword))) {
      consumeToken($puck_5.SyntaxKind.FnKeyword);
    };
    let $puck_79 = $puck_7.TokenStream.peek.call(input);
    let $puck_80;
    if ($unwrapTraitObject($puck_79).kind === "Identifier") {
      let {value: identifier} = $unwrapTraitObject($puck_79);
      $puck_7.TokenStream.next.call(input);
      $puck_80 = $puck_1.Some(identifier);
    }
    else {
      let $puck_81;
      if (true) {
        $puck_79;
        $puck_81 = $puck_1.None;
      };
      $puck_80 = $puck_81;
    };
    const name = $puck_80;
    let $puck_82;
    if (isToken($puck_5.SyntaxKind.LessThanToken)) {
      $puck_82 = delimited($puck_5.SyntaxKind.LessThanToken, $puck_5.SyntaxKind.GreaterThanToken, $puck_5.SyntaxKind.CommaToken, parseTypeParameter, true);
    }
    else {
      $puck_82 = [];
    };
    const typeParameters = $puck_82;
    if ((recover && !isToken($puck_5.SyntaxKind.OpenParenToken))) {
      return {
        name: name,
        typeParameters: typeParameters,
        openParenOrBar: {
        kind: $puck_5.SyntaxKind.OpenParenToken,
        span: $puck_4.Span.empty(),
      },
        parameterList: [],
        closeParenOrBar: {
        kind: $puck_5.SyntaxKind.OpenParenToken,
        span: $puck_4.Span.empty(),
      },
        returnType: $puck_1.None,
        body: $puck_1.Some(mockBlock()),
        type_: $puck_2._undefined,
      };
    };
    const openParenOrBar = expect($puck_5.SyntaxKind.OpenParenToken);
    const parameterList = delimited($puck_5.SyntaxKind.OpenParenToken, $puck_5.SyntaxKind.CloseParenToken, $puck_5.SyntaxKind.CommaToken, parseVariableDeclaration, false);
    const closeParenOrBar = consumeToken($puck_5.SyntaxKind.CloseParenToken);
    let $puck_83;
    if ($puck_1.Option.isSome.call(maybeConsumeToken($puck_5.SyntaxKind.MinusGreaterThanToken))) {
      $puck_83 = $puck_1.Some(parseTypeBound());
    }
    else {
      $puck_83 = $puck_1.None;
    };
    const returnType = $puck_83;
    let $puck_84;
    if ((recover && !isToken($puck_5.SyntaxKind.OpenBraceToken) && (!optionalBody || $puck_1.Option.isNone.call(returnType)))) {
      $puck_84 = $puck_1.Some(mockBlock());
    }
    else {
      let $puck_85;
      if ((isToken($puck_5.SyntaxKind.OpenBraceToken) || !optionalBody)) {
        $puck_85 = $puck_1.Some(parseBlock());
      }
      else {
        $puck_85 = $puck_1.None;
      };
      $puck_84 = $puck_85;
    };
    const body = $puck_84;
    return {
      name: name,
      typeParameters: typeParameters,
      openParenOrBar: openParenOrBar,
      parameterList: parameterList,
      closeParenOrBar: closeParenOrBar,
      returnType: returnType,
      body: body,
      type_: $unwrapTraitObject($puck_2._undefined),
    };
  };
  function parseLambda() {
    const openParenOrBar = expect($puck_5.SyntaxKind.BarToken);
    const parameterList = delimited($puck_5.SyntaxKind.BarToken, $puck_5.SyntaxKind.BarToken, $puck_5.SyntaxKind.CommaToken, parseVariableDeclaration, false);
    const closeParenOrBar = consumeToken($puck_5.SyntaxKind.BarToken);
    let $puck_86;
    if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
      $puck_86 = $puck_1.Some(parseBlock());
    }
    else {
      $puck_86 = $puck_1.Some({
        openBrace: $puck_1.None,
        statements: [parseBlockLevelStatement()],
        closeBrace: $puck_1.None,
        type_: $unwrapTraitObject($puck_2._undefined),
      });
    };
    const body = $puck_86;
    return {
      name: $puck_1.None,
      typeParameters: [],
      openParenOrBar: openParenOrBar,
      parameterList: parameterList,
      closeParenOrBar: closeParenOrBar,
      returnType: $puck_1.None,
      body: body,
      type_: $unwrapTraitObject($puck_2._undefined),
    };
  };
  function parseVariableDeclaration() {
    const pattern = parsePattern();
    return {
      pattern: pattern,
      typeBound: $puck_1.Option.map.call(maybeConsumeToken($puck_5.SyntaxKind.ColonToken), function ($puck_87) {
      return parseTypeBound();
    }),
      initializer: $puck_1.Option.map.call(maybeConsumeToken($puck_5.SyntaxKind.EqualsToken), function ($puck_88) {
      return parseExpression();
    }),
    };
  };
  function parseIf() {
    const ifKeyword = consumeToken($puck_5.SyntaxKind.IfKeyword);
    if (isToken($puck_5.SyntaxKind.LetKeyword)) {
      return $puck_3.Expression.IfLetExpression(parseIfLetExpression(ifKeyword));
    }
    else {
      return $puck_3.Expression.IfExpression(parseIfExpression(ifKeyword));
    };
  };
  function parseIfExpression(ifKeyword) {
    const condition = parseExpression();
    let $puck_89;
    if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
      $puck_89 = parseBlock();
    }
    else {
      let $puck_90;
      if ((recover && !isToken($puck_5.SyntaxKind.ThenKeyword))) {
        $puck_90 = mockBlock();
      }
      else {
        consumeToken($puck_5.SyntaxKind.ThenKeyword);
        $puck_90 = {
          openBrace: $puck_1.None,
          statements: [parseBlockLevelStatement()],
          closeBrace: $puck_1.None,
          type_: $puck_2._undefined,
        };
      };
      $puck_89 = $puck_90;
    };
    const then_ = $puck_89;
    let $puck_91;
    if (isToken($puck_5.SyntaxKind.ElseKeyword)) {
      $puck_7.TokenStream.next.call(input);
      let $puck_92;
      if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
        $puck_92 = parseBlock();
      }
      else {
        $puck_92 = {
          openBrace: $puck_1.None,
          statements: [parseBlockLevelStatement()],
          closeBrace: $puck_1.None,
          type_: $puck_2._undefined,
        };
      };
      $puck_91 = $puck_1.Some($puck_92);
    }
    else {
      $puck_91 = $puck_1.None;
    };
    return {
      ifKeyword: ifKeyword,
      condition: condition,
      then_: then_,
      else_: $puck_91,
    };
  };
  function parseIfLetExpression(ifKeyword) {
    const letKeyword = consumeToken($puck_5.SyntaxKind.LetKeyword);
    const pattern = parsePattern();
    const equalsToken = consumeToken($puck_5.SyntaxKind.EqualsToken);
    const expression = parseExpression();
    let $puck_93;
    if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
      $puck_93 = parseBlock();
    }
    else {
      let $puck_94;
      if ((recover && !isToken($puck_5.SyntaxKind.ThenKeyword))) {
        $puck_94 = mockBlock();
      }
      else {
        consumeToken($puck_5.SyntaxKind.ThenKeyword);
        $puck_94 = {
          openBrace: $puck_1.None,
          statements: [parseBlockLevelStatement()],
          closeBrace: $puck_1.None,
          type_: $puck_2._undefined,
        };
      };
      $puck_93 = $puck_94;
    };
    const then_ = $puck_93;
    let $puck_95;
    if (isToken($puck_5.SyntaxKind.ElseKeyword)) {
      $puck_7.TokenStream.next.call(input);
      let $puck_96;
      if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
        $puck_96 = parseBlock();
      }
      else {
        $puck_96 = {
          openBrace: $puck_1.None,
          statements: [parseBlockLevelStatement()],
          closeBrace: $puck_1.None,
          type_: $puck_2._undefined,
        };
      };
      $puck_95 = $puck_1.Some($puck_96);
    }
    else {
      $puck_95 = $puck_1.None;
    };
    return {
      ifKeyword: ifKeyword,
      letKeyword: letKeyword,
      pattern: pattern,
      expression: expression,
      then_: then_,
      else_: $puck_95,
    };
  };
  function parseMatch() {
    const matchKeyword = consumeToken($puck_5.SyntaxKind.MatchKeyword);
    const expression = parseExpression();
    if ((recover && !isToken($puck_5.SyntaxKind.OpenBraceToken))) {
      return {
        matchKeyword: matchKeyword,
        expression: expression,
        openBrace: {
        kind: $puck_5.SyntaxKind.OpenBraceToken,
        span: $puck_4.Span.empty(),
      },
        patterns: [],
        closeBrace: {
        kind: $puck_5.SyntaxKind.OpenBraceToken,
        span: $puck_4.Span.empty(),
      },
      };
    };
    return {
      matchKeyword: matchKeyword,
      expression: expression,
      openBrace: expect($puck_5.SyntaxKind.OpenBraceToken),
      patterns: delimited($puck_5.SyntaxKind.OpenBraceToken, $puck_5.SyntaxKind.CloseBraceToken, $puck_5.SyntaxKind.CommaToken, parseMatchArm, false),
      closeBrace: consumeToken($puck_5.SyntaxKind.CloseBraceToken),
    };
  };
  function parseMatchArm() {
    const pattern = parsePattern();
    if ((recover && !isToken($puck_5.SyntaxKind.EqualsGreaterThanToken))) {
      return {
        pattern: pattern,
        arrow: {
        kind: $puck_5.SyntaxKind.EqualsGreaterThanToken,
        span: $puck_4.Span.empty(),
      },
        block: mockBlock(),
      };
    };
    const arrow = consumeToken($puck_5.SyntaxKind.EqualsGreaterThanToken);
    let $puck_97;
    if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
      $puck_97 = parseBlock();
    }
    else {
      $puck_97 = {
        openBrace: $puck_1.None,
        statements: [parseBlockLevelStatement()],
        closeBrace: $puck_1.None,
        type_: $puck_2._undefined,
      };
    };
    const block = $puck_97;
    return {
      pattern: pattern,
      arrow: arrow,
      block: block,
    };
  };
  function parseUnaryExpression() {
    let $puck_98 = $puck_7.TokenStream.next.call(input);
    if ($unwrapTraitObject($puck_98).kind === "SimpleToken") {
      let {value: operator} = $unwrapTraitObject($puck_98);
      let $puck_99 = operator.kind;
      if ($unwrapTraitObject($puck_99).kind === "NotKeyword") {
        $unwrapTraitObject($puck_99);
        return {
          operator: operator,
          rhs: parseExpression($puck_5.SyntaxKind.precedence.call(operator.kind)),
        };
      }
      else {
        if ($unwrapTraitObject($puck_99).kind === "MinusToken") {
          $unwrapTraitObject($puck_99);
          return {
            operator: operator,
            rhs: parseExpression($puck_5.SyntaxKind.precedence.call(operator.kind)),
          };
        }
        else {
          if ($unwrapTraitObject($puck_99).kind === "PlusToken") {
            $unwrapTraitObject($puck_99);
            return {
              operator: operator,
              rhs: parseExpression($puck_5.SyntaxKind.precedence.call(operator.kind)),
            };
          }
          else {
            if (true) {
              $puck_99;
              return unexpected();
            };
          };
        };
      };
    }
    else {
      if (true) {
        $puck_98;
        return unexpected();
      };
    };
  };
  function parseListLiteral() {
    const openBracket = expect($puck_5.SyntaxKind.OpenBracketToken);
    const members = delimited($puck_5.SyntaxKind.OpenBracketToken, $puck_5.SyntaxKind.CloseBracketToken, $puck_5.SyntaxKind.CommaToken, parseExpression, false);
    const closeBracket = consumeToken($puck_5.SyntaxKind.CloseBracketToken);
    return {
      openBracket: openBracket,
      members: members,
      closeBracket: closeBracket,
    };
  };
  function parseRecordLiteral() {
    const openBrace = expect($puck_5.SyntaxKind.OpenBraceToken);
    const members = delimited($puck_5.SyntaxKind.OpenBraceToken, $puck_5.SyntaxKind.CloseBraceToken, $puck_5.SyntaxKind.CommaToken, parseRecordLiteralMember, false);
    const closeBrace = consumeToken($puck_5.SyntaxKind.CloseBraceToken);
    return {
      openBrace: openBrace,
      members: members,
      closeBrace: closeBrace,
    };
  };
  function parseRecordLiteralMember() {
    const name = consumeIdentifier();
    let $puck_100;
    if (isToken($puck_5.SyntaxKind.ColonToken)) {
      $puck_7.TokenStream.next.call(input);
      $puck_100 = parseExpression();
    }
    else {
      $puck_100 = $puck_3.Expression.Identifier(name);
    };
    const value = $puck_100;
    return {
      name: name,
      value: value,
    };
  };
  function parseTupleOrExpression(forceTuple) {
    const openParen = expect($puck_5.SyntaxKind.OpenParenToken);
    const expressions = delimited($puck_5.SyntaxKind.OpenParenToken, $puck_5.SyntaxKind.CloseParenToken, $puck_5.SyntaxKind.CommaToken, function () {
      return parseExpression(0, true);
    }, false);
    const closeParen = consumeToken($puck_5.SyntaxKind.CloseParenToken);
    if ((!forceTuple && $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: expressions, $isTraitObject: true}) === 1)) {
      return $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: expressions, $isTraitObject: true}, 0);
    }
    else {
      return $puck_3.Expression.TupleLiteral({
        openParen: openParen,
        expressions: expressions,
        closeParen: closeParen,
      });
    };
  };
  function parsePattern() {
    let $puck_101 = maybeConsumeToken($puck_5.SyntaxKind.UnderscoreToken);
    if ($puck_101.kind === "Some") {
      let {value: token} = $puck_101;
      return $puck_3.Pattern.CatchAll(token);
    }
    else {
      if (isToken($puck_5.SyntaxKind.OpenParenToken)) {
        return $puck_3.Pattern.Tuple(parseTuplePattern());
      }
      else {
        if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
          return $puck_3.Pattern.Record(parseRecordPattern());
        }
        else {
          if (isToken($puck_5.SyntaxKind.MutKeyword)) {
            consumeToken($puck_5.SyntaxKind.MutKeyword);
            const identifier = consumeIdentifier();
            return $puck_3.Pattern.Identifier({
              identifier: identifier,
              mutable: true,
            });
          }
          else {
            const identifier = consumeIdentifier();
            if ((isToken($puck_5.SyntaxKind.ColonColonToken) || isToken($puck_5.SyntaxKind.OpenParenToken) || isToken($puck_5.SyntaxKind.OpenBraceToken))) {
              const typePath = parseTypePath($puck_1.Some(identifier));
              if (isToken($puck_5.SyntaxKind.OpenParenToken)) {
                return $puck_3.Pattern.TupleType(typePath, parseTuplePattern());
              }
              else {
                if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
                  return $puck_3.Pattern.RecordType(typePath, parseRecordPattern());
                }
                else {
                  return $puck_3.Pattern.UnitType(typePath);
                };
              };
            }
            else {
              return $puck_3.Pattern.Identifier({
                identifier: identifier,
                mutable: false,
              });
            };
          };
        };
      };
    };
  };
  function parseRecordPattern() {
    const openBrace = expect($puck_5.SyntaxKind.OpenBraceToken);
    const properties = delimited($puck_5.SyntaxKind.OpenBraceToken, $puck_5.SyntaxKind.CloseBraceToken, $puck_5.SyntaxKind.CommaToken, parseRecordPatternMember, false);
    const closeBrace = consumeToken($puck_5.SyntaxKind.CloseBraceToken);
    return {
      openBrace: openBrace,
      properties: properties,
      closeBrace: closeBrace,
    };
  };
  function parseRecordPatternMember() {
    const property = consumeIdentifier();
    let $puck_102;
    if ($puck_1.Option.isSome.call(maybeConsumeToken($puck_5.SyntaxKind.ColonToken))) {
      $puck_102 = parsePattern();
    }
    else {
      $puck_102 = $puck_3.Pattern.Identifier({
        identifier: property,
        mutable: false,
      });
    };
    const pattern = $puck_102;
    return {
      property: property,
      pattern: pattern,
    };
  };
  function parseTuplePattern() {
    const openParen = expect($puck_5.SyntaxKind.OpenParenToken);
    const properties = delimited($puck_5.SyntaxKind.OpenParenToken, $puck_5.SyntaxKind.CloseParenToken, $puck_5.SyntaxKind.CommaToken, parsePattern, false);
    const closeParen = consumeToken($puck_5.SyntaxKind.CloseParenToken);
    return {
      openParen: openParen,
      properties: properties,
      closeParen: closeParen,
    };
  };
  function parseTypeBound() {
    if (isToken($puck_5.SyntaxKind.LessThanToken)) {
      return parseFunctionTypeBound($puck_1.None);
    }
    else {
      if (isToken($puck_5.SyntaxKind.OpenParenToken)) {
        const tuple = parseTupleTypeBound();
        if (isToken($puck_5.SyntaxKind.MinusGreaterThanToken)) {
          return parseFunctionTypeBound($puck_1.Some(tuple));
        }
        else {
          return tuple;
        };
      }
      else {
        if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
          return parseRecordTypeBound();
        }
        else {
          return $puck_3.TypeBound.NamedTypeBound(parseNamedTypeBound());
        };
      };
    };
  };
  function parseFunctionTypeBound(tuple) {
    let $puck_103;
    if ($puck_1.Option.isNone.call(tuple) && isToken($puck_5.SyntaxKind.LessThanToken)) {
      $puck_103 = delimited($puck_5.SyntaxKind.LessThanToken, $puck_5.SyntaxKind.GreaterThanToken, $puck_5.SyntaxKind.CommaToken, parseTypeParameter, true);
    }
    else {
      $puck_103 = [];
    };
    const typeParameters = $puck_103;
    const parameters = $puck_3.TypeBound.getTupleTypeBound.call($puck_1.Option.unwrapOrElse.call(tuple, parseTupleTypeBound));
    consumeToken($puck_5.SyntaxKind.MinusGreaterThanToken);
    const returnType = parseTypeBound();
    return $puck_3.TypeBound.FunctionTypeBound({
      typeParameters: typeParameters,
      parameters: parameters,
      returnType: returnType,
    });
  };
  function parseNamedTypeBound() {
    const path = parseTypePath($puck_1.None);
    let $puck_104;
    if (isToken($puck_5.SyntaxKind.LessThanToken)) {
      $puck_104 = delimited($puck_5.SyntaxKind.LessThanToken, $puck_5.SyntaxKind.GreaterThanToken, $puck_5.SyntaxKind.CommaToken, parseTypeBound, true);
    }
    else {
      $puck_104 = [];
    };
    const typeParameters = $puck_104;
    return {
      path: path,
      typeParameters: typeParameters,
    };
  };
  function parseRecordTypeBound() {
    expect($puck_5.SyntaxKind.OpenBraceToken);
    const openBrace = expect($puck_5.SyntaxKind.OpenBraceToken);
    const properties = delimited($puck_5.SyntaxKind.OpenBraceToken, $puck_5.SyntaxKind.CloseBraceToken, $puck_5.SyntaxKind.CommaToken, parseRecordTypeBoundMember, false);
    const closeBrace = consumeToken($puck_5.SyntaxKind.CloseBraceToken);
    return $puck_3.TypeBound.RecordTypeBound({
      openBrace: openBrace,
      properties: properties,
      closeBrace: closeBrace,
    });
  };
  function parseRecordTypeBoundMember() {
    const name = consumeIdentifier();
    consumeToken($puck_5.SyntaxKind.ColonToken);
    const typeBound = parseTypeBound();
    return {
      name: name,
      typeBound: typeBound,
    };
  };
  function parseTupleTypeBound() {
    const openParen = expect($puck_5.SyntaxKind.OpenParenToken);
    const properties = delimited($puck_5.SyntaxKind.OpenParenToken, $puck_5.SyntaxKind.CloseParenToken, $puck_5.SyntaxKind.CommaToken, parseTypeBound, false);
    const closeParen = consumeToken($puck_5.SyntaxKind.CloseParenToken);
    return $puck_3.TypeBound.TupleTypeBound({
      openParen: openParen,
      properties: properties,
      closeParen: closeParen,
    });
  };
  function parseTypeParameter() {
    const name = consumeIdentifier();
    let $puck_105;
    if (isToken($puck_5.SyntaxKind.EqualsToken)) {
      $puck_7.TokenStream.next.call(input);
      $puck_105 = $puck_1.Some(parseTypeBound());
    }
    else {
      $puck_105 = $puck_1.None;
    };
    const defaultValue = $puck_105;
    return {
      name: name,
      defaultValue: defaultValue,
    };
  };
  function parseTypePath(identifier) {
    const i = $puck_1.Option.unwrapOrElse.call(identifier, consumeIdentifier);
    if ($puck_1.Option.isSome.call(maybeConsumeToken($puck_5.SyntaxKind.ColonColonToken))) {
      return $puck_3.TypePath._Object(i, parseTypePath($puck_1.None));
    }
    else {
      return $puck_3.TypePath.Member(i);
    };
  };
  return parseModule();
};
exports.parse = parse
