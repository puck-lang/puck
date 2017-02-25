'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.parseundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("./../ast/ast");
const $puck_4 = require("./../ast/token");
const $puck_5 = require("./../entities");
const $puck_6 = require("./token_stream");
function isAssignment(token) {
  let $puck_7 = token.kind;
  if ($unwrapTraitObject($puck_7).kind == "EqualsToken") {
    let undefined = $unwrapTraitObject($puck_7);
    return true;
  }
  else {
    if ($unwrapTraitObject($puck_7).kind == "PlusEqualsToken") {
      let undefined = $unwrapTraitObject($puck_7);
      return true;
    }
    else {
      if ($unwrapTraitObject($puck_7).kind == "MinusEqualsToken") {
        let undefined = $unwrapTraitObject($puck_7);
        return true;
      }
      else {
        if ($unwrapTraitObject($puck_7).kind == "AsteriskEqualsToken") {
          let undefined = $unwrapTraitObject($puck_7);
          return true;
        }
        else {
          if ($unwrapTraitObject($puck_7).kind == "AsteriskAsteriskEqualsToken") {
            let undefined = $unwrapTraitObject($puck_7);
            return true;
          }
          else {
            if ($unwrapTraitObject($puck_7).kind == "SlashEqualsToken") {
              let undefined = $unwrapTraitObject($puck_7);
              return true;
            }
            else {
              if ($unwrapTraitObject($puck_7).kind == "PercentEqualsToken") {
                let undefined = $unwrapTraitObject($puck_7);
                return true;
              }
              else {
                if (true) {
                  let $puck_8 = $puck_7;
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
  if ($unwrapTraitObject($puck_9).kind == "Identifier") {
    let {value: [$puck_10]} = $unwrapTraitObject($puck_9);
    return true;
  }
  else {
    if ($unwrapTraitObject($puck_9).kind == "MemberAccess") {
      let {value: [$puck_11]} = $unwrapTraitObject($puck_9);
      return true;
    }
    else {
      if ($unwrapTraitObject($puck_9).kind == "IndexAccess") {
        let {value: [$puck_12]} = $unwrapTraitObject($puck_9);
        return true;
      }
      else {
        if ($unwrapTraitObject($puck_9).kind == "UnknownAccess") {
          let {value: [$puck_13]} = $unwrapTraitObject($puck_9);
          return true;
        }
        else {
          if ($unwrapTraitObject($puck_9).kind == "UnknownIndexAccess") {
            let {value: [$puck_14]} = $unwrapTraitObject($puck_9);
            return true;
          }
          else {
            if (true) {
              let $puck_15 = $puck_9;
              return false;
            };
          };
        };
      };
    };
  };
};
function parse(input, file) {
  function isToken(kind, withDummy = false) {
    let $puck_16 = $puck_6.TokenStream.peek.call(input, withDummy);
    if ($unwrapTraitObject($puck_16).kind == "SimpleToken") {
      let {value: [token]} = $unwrapTraitObject($puck_16);
      return token.kind == kind;
    }
    else {
      if (true) {
        let $puck_17 = $puck_16;
        return false;
      };
    };
  };
  function butGot() {
    let $puck_18 = $puck_6.TokenStream.peek.call(input);
    let $puck_19;
    if (($unwrapTraitObject($puck_18).kind == "SimpleToken" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_18).value)[0]).kind).kind == "EndOfFileToken")) {
      let {value: [{kind: undefined}]} = $unwrapTraitObject($puck_18);
      $puck_19 = "but reached end of file";
    }
    else {
      let $puck_20;
      if (true) {
        const token = $puck_18;
        $puck_20 = "but got \"" + $puck_4.Token.name.call(token) + "\"";
      };
      $puck_19 = $puck_20;
    };
    let $puck_21 = $puck_19;;
    let token = $puck_21;;
    return $puck_21;
  };
  function expect(kind) {
    const token = $puck_6.TokenStream.peek.call(input);
    let $puck_22 = token;
    if (($unwrapTraitObject($puck_22).kind == "SimpleToken")) {
      let {value: [token]} = $unwrapTraitObject($puck_22);
      if (token.kind != kind) {
        $puck_6.TokenStream.croak.call(input, "Expected token: \"" + $puck_4.SyntaxKind.name.call(kind) + "\", " + butGot());
      };
      return token;
    }
    else {
      if (true) {
        let $puck_23 = $puck_22;
        return $puck_6.TokenStream.croak.call(input, "Expected token: \"" + $puck_4.SyntaxKind.name.call(kind) + "\", " + butGot());
      };
    };
  };
  function consumeToken(kind) {
    const token = expect(kind);
    $puck_6.TokenStream.next.call(input);
    return token;
  };
  function consumeIdentifier() {
    let $puck_24 = $puck_6.TokenStream.next.call(input);
    if (($unwrapTraitObject($puck_24).kind == "Identifier")) {
      let {value: [identifier]} = $unwrapTraitObject($puck_24);
      return identifier;
    }
    else {
      if (true) {
        let $puck_25 = $puck_24;
        return $puck_6.TokenStream.croak.call(input, "Expected identifier, " + butGot());
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
    const name = $puck_4.Token.name.call($puck_6.TokenStream.peek.call(input));
    return $puck_6.TokenStream.croak.call(input, "Unexpected token: " + name + "");
  };
  function attributeNotSupported() {
    return $puck_6.TokenStream.croak.call(input, "Attributes are only supported on enum, trait and type declarations");
  };
  function consumeSeparator(kind) {
    let token = $puck_6.TokenStream.peek.call(input, true);
    let $puck_26 = token;
    if (($unwrapTraitObject($puck_26).kind == "SimpleToken" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_26).value)[0]).kind).kind == "NewlineToken")) {
      let {value: [{kind: undefined}]} = $unwrapTraitObject($puck_26);
      $puck_6.TokenStream.next.call(input, true);
    }
    else {
      if ($unwrapTraitObject($puck_26).kind == "Comment") {
        let undefined = $unwrapTraitObject($puck_26);
        $puck_6.TokenStream.next.call(input, true);
      }
      else {
        if (true) {
          let $puck_27 = $puck_26;
          consumeToken(kind);
        };
      };
    };
  };
  function maybeParseOperator() {
    let $puck_28 = $puck_6.TokenStream.peek.call(input);
    if ($unwrapTraitObject($puck_28).kind == "SimpleToken") {
      let {value: [token]} = $unwrapTraitObject($puck_28);
      let $puck_29 = token.kind;
      if ($unwrapTraitObject($puck_29).kind == "EqualsEqualsToken") {
        let undefined = $unwrapTraitObject($puck_29);
        return $puck_1.Some(token);
      }
      else {
        if ($unwrapTraitObject($puck_29).kind == "ExclamationEqualsToken") {
          let undefined = $unwrapTraitObject($puck_29);
          return $puck_1.Some(token);
        }
        else {
          if ($unwrapTraitObject($puck_29).kind == "GreaterThanToken") {
            let undefined = $unwrapTraitObject($puck_29);
            return $puck_1.Some(token);
          }
          else {
            if ($unwrapTraitObject($puck_29).kind == "GreaterThanEqualsToken") {
              let undefined = $unwrapTraitObject($puck_29);
              return $puck_1.Some(token);
            }
            else {
              if ($unwrapTraitObject($puck_29).kind == "LessThanToken") {
                let undefined = $unwrapTraitObject($puck_29);
                return $puck_1.Some(token);
              }
              else {
                if ($unwrapTraitObject($puck_29).kind == "LessThanEqualsToken") {
                  let undefined = $unwrapTraitObject($puck_29);
                  return $puck_1.Some(token);
                }
                else {
                  if ($unwrapTraitObject($puck_29).kind == "PlusToken") {
                    let undefined = $unwrapTraitObject($puck_29);
                    return $puck_1.Some(token);
                  }
                  else {
                    if ($unwrapTraitObject($puck_29).kind == "MinusToken") {
                      let undefined = $unwrapTraitObject($puck_29);
                      return $puck_1.Some(token);
                    }
                    else {
                      if ($unwrapTraitObject($puck_29).kind == "AsteriskToken") {
                        let undefined = $unwrapTraitObject($puck_29);
                        return $puck_1.Some(token);
                      }
                      else {
                        if ($unwrapTraitObject($puck_29).kind == "AsteriskAsteriskToken") {
                          let undefined = $unwrapTraitObject($puck_29);
                          return $puck_1.Some(token);
                        }
                        else {
                          if ($unwrapTraitObject($puck_29).kind == "SlashToken") {
                            let undefined = $unwrapTraitObject($puck_29);
                            return $puck_1.Some(token);
                          }
                          else {
                            if ($unwrapTraitObject($puck_29).kind == "PercentToken") {
                              let undefined = $unwrapTraitObject($puck_29);
                              return $puck_1.Some(token);
                            }
                            else {
                              if ($unwrapTraitObject($puck_29).kind == "AndKeyword") {
                                let undefined = $unwrapTraitObject($puck_29);
                                return $puck_1.Some(token);
                              }
                              else {
                                if ($unwrapTraitObject($puck_29).kind == "OrKeyword") {
                                  let undefined = $unwrapTraitObject($puck_29);
                                  return $puck_1.Some(token);
                                }
                                else {
                                  if ($unwrapTraitObject($puck_29).kind == "NotKeyword") {
                                    let undefined = $unwrapTraitObject($puck_29);
                                    return $puck_1.Some(token);
                                  }
                                  else {
                                    if (true) {
                                      let $puck_30 = $puck_29;
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
        let $puck_31 = $puck_28;
        return $puck_1.None;
      };
    };
  };
  function maybeBinary(left, myPrecedence) {
    let $puck_32 = maybeParseOperator();
    if ($puck_32.kind == "Some") {
      let {value: [operator]} = $puck_32;
      let hisPrecedence = $puck_4.SyntaxKind.precedence.call(operator.kind);
      if (hisPrecedence > myPrecedence) {
        $puck_6.TokenStream.next.call(input);
        let innerExpression = maybeBinary(parseAtom(), hisPrecedence);
        let $puck_33;
        if (isAssignment(operator)) {
          if ((!isAssignable(left))) {
            $puck_6.TokenStream.croak.call(input, "Can only assign to an identifier");
          };
          $puck_33 = $puck_3.Expression.AssignmentExpression({
            lhs: left,
            token: operator,
            rhs: innerExpression,
          });
        }
        else {
          $puck_33 = $puck_3.Expression.BinaryExpression({
            lhs: left,
            operator: operator,
            rhs: innerExpression,
          });
        };
        const e = $puck_33;
        return maybeBinary(e, myPrecedence);
      };
    };
    return left;
  };
  function maybeCall(expression) {
    if (isToken($puck_4.SyntaxKind.OpenParenToken, true)) {
      return maybeCall(maybeAccess($puck_3.Expression.CallExpression({
        func: expression,
        openParen: expect($puck_4.SyntaxKind.OpenParenToken),
        argumentList: delimited($puck_4.SyntaxKind.OpenParenToken, $puck_4.SyntaxKind.CloseParenToken, $puck_4.SyntaxKind.CommaToken, parseExpression, false),
        closeParen: consumeToken($puck_4.SyntaxKind.CloseParenToken),
      })));
    }
    else {
      return expression;
    };
  };
  function maybeAccess(expression) {
    return maybeUnknownAccess(maybeIndexAccess(maybeMemberAccess(expression)));
  };
  function maybeMemberAccess(expression) {
    if (isToken($puck_4.SyntaxKind.DotToken)) {
      $puck_6.TokenStream.next.call(input);
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
    if (isToken($puck_4.SyntaxKind.OpenBracketToken, true)) {
      const openBracket = consumeToken($puck_4.SyntaxKind.OpenBracketToken);
      const index = parseExpression();
      const closeBracket = consumeToken($puck_4.SyntaxKind.CloseBracketToken);
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
    if (isToken($puck_4.SyntaxKind.MinusGreaterThanToken)) {
      $puck_6.TokenStream.next.call(input);
      if (isToken($puck_4.SyntaxKind.OpenBracketToken)) {
        const openBracket = consumeToken($puck_4.SyntaxKind.OpenBracketToken);
        const index = parseExpression();
        const closeBracket = consumeToken($puck_4.SyntaxKind.CloseBracketToken);
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
    while (!$puck_6.TokenStream.eof.call(input)) {
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
    while (!$puck_6.TokenStream.eof.call(input)) {
      const statement = parseTopLevelStatement();
      $puck_1.List.push.call(statements, statement);
      let $puck_34 = statement;
      if ($puck_34.kind == "ExportDirective") {
        let {value: [e]} = $puck_34;
        exports[e.identifier.name] = e;
      };
      consumeSeparator($puck_4.SyntaxKind.SemicolonToken);
    };
    return {
      fileName: file.fileName,
      path: file.absolutePath,
      exports: exports,
      statements: statements,
      file: $unwrapTraitObject($puck_2._undefined),
      scope: $puck_2._undefined,
    };
  };
  function parseTopLevelStatement() {
    let $puck_35 = $puck_6.TokenStream.peek.call(input);
    if ($unwrapTraitObject($puck_35).kind == "SimpleToken") {
      let {value: [token]} = $unwrapTraitObject($puck_35);
      let $puck_36 = token.kind;
      if ($unwrapTraitObject($puck_36).kind == "HashToken") {
        let undefined = $unwrapTraitObject($puck_36);
        return parseDeclarationWithAttribute();
      }
      else {
        if ($unwrapTraitObject($puck_36).kind == "EnumKeyword") {
          let undefined = $unwrapTraitObject($puck_36);
          return $puck_3.TopLevelStatement.EnumDeclaration(parseEnumDeclaration());
        }
        else {
          if ($unwrapTraitObject($puck_36).kind == "ExportKeyword") {
            let undefined = $unwrapTraitObject($puck_36);
            return $puck_3.TopLevelStatement.ExportDirective(parseExport());
          }
          else {
            if ($unwrapTraitObject($puck_36).kind == "ImplKeyword") {
              let undefined = $unwrapTraitObject($puck_36);
              return parseImplDeclaration();
            }
            else {
              if ($unwrapTraitObject($puck_36).kind == "ImportKeyword") {
                let undefined = $unwrapTraitObject($puck_36);
                return $puck_3.TopLevelStatement.ImportDirective(parseImport());
              }
              else {
                if ($unwrapTraitObject($puck_36).kind == "TraitKeyword") {
                  let undefined = $unwrapTraitObject($puck_36);
                  return $puck_3.TopLevelStatement.TraitDeclaration(parseTraitDeclaration());
                }
                else {
                  if ($unwrapTraitObject($puck_36).kind == "TypeKeyword") {
                    let undefined = $unwrapTraitObject($puck_36);
                    return $puck_3.TopLevelStatement.TypeDeclaration(parseTypeDeclaration());
                  }
                  else {
                    if (true) {
                      let $puck_37 = $puck_36;
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
        let $puck_38 = $puck_35;
        return $puck_3.TopLevelStatement.BlockLevelStatement(parseBlockLevelStatement());
      };
    };
  };
  function parseBlockLevelStatement() {
    let $puck_39 = $puck_6.TokenStream.peek.call(input);
    if (($unwrapTraitObject($puck_39).kind == "SimpleToken" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_39).value)[0]).kind).kind == "BreakKeyword")) {
      let {value: [{kind: undefined}]} = $unwrapTraitObject($puck_39);
      return $puck_3.BlockLevelStatement.BreakStatement({keyword: consumeToken($puck_4.SyntaxKind.BreakKeyword)});
    }
    else {
      if (($unwrapTraitObject($puck_39).kind == "SimpleToken" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_39).value)[0]).kind).kind == "ReturnKeyword")) {
        let {value: [{kind: undefined}]} = $unwrapTraitObject($puck_39);
        return $puck_3.BlockLevelStatement.ReturnStatement({
          keyword: consumeToken($puck_4.SyntaxKind.ReturnKeyword),
          expression: parseExpression(),
        });
      }
      else {
        if (($unwrapTraitObject($puck_39).kind == "SimpleToken" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_39).value)[0]).kind).kind == "WhileKeyword")) {
          let {value: [{kind: undefined}]} = $unwrapTraitObject($puck_39);
          return $puck_3.BlockLevelStatement.WhileLoop(parseWhile());
        }
        else {
          if (true) {
            let $puck_40 = $puck_39;
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
    let $puck_41 = $puck_6.TokenStream.peek.call(input);
    let $puck_42;
    if ($unwrapTraitObject($puck_41).kind == "SimpleToken") {
      let {value: [token]} = $unwrapTraitObject($puck_41);
      let $puck_43 = token.kind;
      let $puck_44;
      if ($unwrapTraitObject($puck_43).kind == "OpenParenToken") {
        let undefined = $unwrapTraitObject($puck_43);
        $puck_44 = parseTupleOrExpression(forceTuple);
      }
      else {
        let $puck_45;
        if ($unwrapTraitObject($puck_43).kind == "OpenBracketToken") {
          let undefined = $unwrapTraitObject($puck_43);
          $puck_45 = $puck_3.Expression.ListLiteral(parseListLiteral());
        }
        else {
          let $puck_46;
          if ($unwrapTraitObject($puck_43).kind == "OpenBraceToken") {
            let undefined = $unwrapTraitObject($puck_43);
            $puck_46 = $puck_3.Expression.RecordLiteral(parseRecordLiteral());
          }
          else {
            let $puck_47;
            if ($unwrapTraitObject($puck_43).kind == "BarToken") {
              let undefined = $unwrapTraitObject($puck_43);
              $puck_47 = $puck_3.Expression.FunctionDeclaration(parseLambda());
            }
            else {
              let $puck_48;
              if ($unwrapTraitObject($puck_43).kind == "IfKeyword") {
                let undefined = $unwrapTraitObject($puck_43);
                $puck_48 = parseIf();
              }
              else {
                let $puck_49;
                if ($unwrapTraitObject($puck_43).kind == "MatchKeyword") {
                  let undefined = $unwrapTraitObject($puck_43);
                  $puck_49 = $puck_3.Expression.MatchExpression(parseMatch());
                }
                else {
                  let $puck_50;
                  if ($unwrapTraitObject($puck_43).kind == "FnKeyword") {
                    let undefined = $unwrapTraitObject($puck_43);
                    $puck_50 = $puck_3.Expression.FunctionDeclaration(parseFunctionDeclaration());
                  }
                  else {
                    let $puck_51;
                    if ($unwrapTraitObject($puck_43).kind == "LetKeyword") {
                      let undefined = $unwrapTraitObject($puck_43);
                      $puck_6.TokenStream.next.call(input);
                      $puck_51 = $puck_3.Expression.VariableDeclaration(parseVariableDeclaration());
                    }
                    else {
                      let $puck_52;
                      if ($unwrapTraitObject($puck_43).kind == "NotKeyword") {
                        let undefined = $unwrapTraitObject($puck_43);
                        $puck_52 = $puck_3.Expression.UnaryExpression(parseUnaryExpression());
                      }
                      else {
                        let $puck_53;
                        if ($unwrapTraitObject($puck_43).kind == "MinusToken") {
                          let undefined = $unwrapTraitObject($puck_43);
                          $puck_53 = $puck_3.Expression.UnaryExpression(parseUnaryExpression());
                        }
                        else {
                          let $puck_54;
                          if ($unwrapTraitObject($puck_43).kind == "PlusToken") {
                            let undefined = $unwrapTraitObject($puck_43);
                            $puck_54 = $puck_3.Expression.UnaryExpression(parseUnaryExpression());
                          }
                          else {
                            let $puck_55;
                            if ($unwrapTraitObject($puck_43).kind == "ThrowKeyword") {
                              let undefined = $unwrapTraitObject($puck_43);
                              $puck_6.TokenStream.next.call(input);
                              $puck_55 = $puck_3.Expression.ThrowStatement({expression: parseExpression()});
                            }
                            else {
                              let $puck_56;
                              if ($unwrapTraitObject($puck_43).kind == "TrueKeyword") {
                                let undefined = $unwrapTraitObject($puck_43);
                                $puck_56 = maybeAccess($puck_3.Expression.BooleanLiteral({
                                  keyword: consumeToken($puck_4.SyntaxKind.TrueKeyword),
                                  value: true,
                                }));
                              }
                              else {
                                let $puck_57;
                                if ($unwrapTraitObject($puck_43).kind == "FalseKeyword") {
                                  let undefined = $unwrapTraitObject($puck_43);
                                  $puck_57 = maybeAccess($puck_3.Expression.BooleanLiteral({
                                    keyword: consumeToken($puck_4.SyntaxKind.FalseKeyword),
                                    value: false,
                                  }));
                                }
                                else {
                                  let $puck_58;
                                  if (true) {
                                    let $puck_59 = $puck_43;
                                    $puck_58 = unexpected();
                                  };
                                  $puck_57 = $puck_58;
                                };
                                $puck_56 = $puck_57;
                              };
                              $puck_55 = $puck_56;
                            };
                            $puck_54 = $puck_55;
                          };
                          $puck_53 = $puck_54;
                        };
                        $puck_52 = $puck_53;
                      };
                      $puck_51 = $puck_52;
                    };
                    $puck_50 = $puck_51;
                  };
                  $puck_49 = $puck_50;
                };
                $puck_48 = $puck_49;
              };
              $puck_47 = $puck_48;
            };
            $puck_46 = $puck_47;
          };
          $puck_45 = $puck_46;
        };
        $puck_44 = $puck_45;
      };
      $puck_42 = $puck_44;
    }
    else {
      let $puck_60;
      if ($unwrapTraitObject($puck_41).kind == "NumberLiteral") {
        let {value: [numberLiteral]} = $unwrapTraitObject($puck_41);
        $puck_6.TokenStream.next.call(input);
        $puck_60 = maybeAccess($puck_3.Expression.NumberLiteral(numberLiteral));
      }
      else {
        let $puck_61;
        if ($unwrapTraitObject($puck_41).kind == "StringLiteral") {
          let {value: [stringLiteral]} = $unwrapTraitObject($puck_41);
          $puck_6.TokenStream.next.call(input);
          $puck_61 = maybeAccess($puck_3.Expression.StringLiteral(stringLiteral));
        }
        else {
          let $puck_62;
          if ($unwrapTraitObject($puck_41).kind == "Identifier") {
            let {value: [identifier]} = $unwrapTraitObject($puck_41);
            $puck_62 = parseIdentifierOrTypePath();
          }
          else {
            let $puck_63;
            if ($unwrapTraitObject($puck_41).kind == "Comment") {
              let undefined = $unwrapTraitObject($puck_41);
              $puck_63 = unexpected();
            };
            $puck_62 = $puck_63;
          };
          $puck_61 = $puck_62;
        };
        $puck_60 = $puck_61;
      };
      $puck_42 = $puck_60;
    };
    return maybeCall($puck_42);
  };
  function parseSimpleLiteral() {
    let $puck_64 = $puck_6.TokenStream.next.call(input);
    if ($unwrapTraitObject($puck_64).kind == "SimpleToken") {
      let {value: [token]} = $unwrapTraitObject($puck_64);
      let $puck_65 = token.kind;
      if ($unwrapTraitObject($puck_65).kind == "TrueKeyword") {
        let undefined = $unwrapTraitObject($puck_65);
        return $puck_3.SimpleLiteral.BooleanLiteral({
          keyword: token,
          value: true,
        });
      }
      else {
        if ($unwrapTraitObject($puck_65).kind == "FalseKeyword") {
          let undefined = $unwrapTraitObject($puck_65);
          return $puck_3.SimpleLiteral.BooleanLiteral({
            keyword: token,
            value: false,
          });
        }
        else {
          if (true) {
            let $puck_66 = $puck_65;
            return unexpected();
          };
        };
      };
    }
    else {
      if ($unwrapTraitObject($puck_64).kind == "NumberLiteral") {
        let {value: [numberLiteral]} = $unwrapTraitObject($puck_64);
        return $puck_3.SimpleLiteral.NumberLiteral(numberLiteral);
      }
      else {
        if ($unwrapTraitObject($puck_64).kind == "StringLiteral") {
          let {value: [stringLiteral]} = $unwrapTraitObject($puck_64);
          if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: stringLiteral.parts, $isTraitObject: true}) > 1) {
            $puck_6.TokenStream.croak.call(input, "Attributes can only contain simple string literals. Interpolation is not supported.");
          };
          let $puck_67 = $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: stringLiteral.parts, $isTraitObject: true}, 0);
          if ($unwrapTraitObject($puck_67).kind == "Literal") {
            let {value: [literal]} = $unwrapTraitObject($puck_67);
            return $puck_3.SimpleLiteral.StringLiteral(literal);
          }
          else {
            if (true) {
              let $puck_68 = $puck_67;
              return $puck_1.panic("String literal does not start with a literal");
            };
          };
        }
        else {
          if (true) {
            let $puck_69 = $puck_64;
            return unexpected();
          };
        };
      };
    };
  };
  function parseAttributeArgument() {
    const name = consumeIdentifier();
    const value = $puck_1.Option.map.call(maybeConsumeToken($puck_4.SyntaxKind.EqualsToken), function ($puck_70) {
      return parseSimpleLiteral();
    });
    return {
      name: name,
      value: value,
    };
  };
  function parseAttribute() {
    const hashToken = consumeToken($puck_4.SyntaxKind.HashToken);
    const openBracket = consumeToken($puck_4.SyntaxKind.OpenBracketToken);
    const name = consumeIdentifier();
    let $puck_71;
    if ($puck_1.Option.isSome.call(maybeConsumeToken($puck_4.SyntaxKind.EqualsToken))) {
      $puck_71 = $puck_3.AttributeData.Value(parseSimpleLiteral());
    }
    else {
      let $puck_72;
      if (isToken($puck_4.SyntaxKind.OpenParenToken)) {
        $puck_72 = $puck_3.AttributeData.Arguments(delimited($puck_4.SyntaxKind.OpenParenToken, $puck_4.SyntaxKind.CloseParenToken, $puck_4.SyntaxKind.CommaToken, parseAttributeArgument, true));
      }
      else {
        $puck_72 = $puck_3.AttributeData.None;
      };
      $puck_71 = $puck_72;
    };
    const data = $puck_71;
    const closeBracket = consumeToken($puck_4.SyntaxKind.CloseBracketToken);
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
    while (isToken($puck_4.SyntaxKind.HashToken)) {
      $puck_1.List.push.call(attributes, parseAttribute());
    };
    if (isToken($puck_4.SyntaxKind.EnumKeyword)) {
      return $puck_3.TopLevelStatement.EnumDeclaration(parseEnumDeclaration(attributes));
    }
    else {
      if (isToken($puck_4.SyntaxKind.ExportKeyword)) {
        return $puck_3.TopLevelStatement.ExportDirective(parseExport(attributes));
      }
      else {
        if (isToken($puck_4.SyntaxKind.TraitKeyword)) {
          return $puck_3.TopLevelStatement.TraitDeclaration(parseTraitDeclaration(attributes));
        }
        else {
          if (isToken($puck_4.SyntaxKind.TypeKeyword)) {
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
    const keyword = consumeToken($puck_4.SyntaxKind.EnumKeyword);
    const name = consumeIdentifier();
    let $puck_73;
    if (isToken($puck_4.SyntaxKind.LessThanToken)) {
      $puck_73 = delimited($puck_4.SyntaxKind.LessThanToken, $puck_4.SyntaxKind.GreaterThanToken, $puck_4.SyntaxKind.CommaToken, parseTypeParameter, true);
    }
    else {
      $puck_73 = [];
    };
    const typeParameters = $puck_73;
    const openBrace = expect($puck_4.SyntaxKind.OpenBraceToken);
    const members = delimited($puck_4.SyntaxKind.OpenBraceToken, $puck_4.SyntaxKind.CloseBraceToken, $puck_4.SyntaxKind.CommaToken, parseEnumMember, false);
    const closeBrace = consumeToken($puck_4.SyntaxKind.CloseBraceToken);
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
    let $puck_74;
    if (isToken($puck_4.SyntaxKind.OpenBraceToken)) {
      $puck_74 = $puck_1.Some(parseRecordTypeBound());
    }
    else {
      let $puck_75;
      if (isToken($puck_4.SyntaxKind.OpenParenToken)) {
        $puck_75 = $puck_1.Some(parseTupleTypeBound());
      }
      else {
        $puck_75 = $puck_1.None;
      };
      $puck_74 = $puck_75;
    };
    const bound = $puck_74;
    return {
      name: name,
      bound: bound,
    };
  };
  function parseImplDeclaration() {
    const implKeyword = consumeToken($puck_4.SyntaxKind.ImplKeyword);
    let $puck_76;
    if (isToken($puck_4.SyntaxKind.LessThanToken)) {
      $puck_76 = delimited($puck_4.SyntaxKind.LessThanToken, $puck_4.SyntaxKind.GreaterThanToken, $puck_4.SyntaxKind.CommaToken, parseTypeParameter, true);
    }
    else {
      $puck_76 = [];
    };
    const typeParameters = $puck_76;
    const trait_ = parseNamedTypeBound();
    let $puck_77;
    if (isToken($puck_4.SyntaxKind.ForKeyword)) {
      $puck_77 = {
        forKeyword: $puck_1.Some(consumeToken($puck_4.SyntaxKind.ForKeyword)),
        type_: $puck_1.Some(parseNamedTypeBound()),
      };
    }
    else {
      $puck_77 = {
        forKeyword: $puck_1.None,
        type_: $puck_1.None,
      };
    };
    let {forKeyword: forKeyword, type_: type_} = $puck_77;
    const openBrace = expect($puck_4.SyntaxKind.OpenBraceToken);
    const members = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].toList.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: delimited($puck_4.SyntaxKind.OpenBraceToken, $puck_4.SyntaxKind.CloseBraceToken, $puck_4.SyntaxKind.SemicolonToken, parseFunctionDeclaration, false), $isTraitObject: true});
    const closeBrace = consumeToken($puck_4.SyntaxKind.CloseBraceToken);
    let $puck_78 = type_;
    if ($puck_78.kind == "Some") {
      let {value: [type_]} = $puck_78;
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
    const keyword = consumeToken($puck_4.SyntaxKind.TraitKeyword);
    const name = consumeIdentifier();
    let $puck_79;
    if (isToken($puck_4.SyntaxKind.LessThanToken)) {
      $puck_79 = delimited($puck_4.SyntaxKind.LessThanToken, $puck_4.SyntaxKind.GreaterThanToken, $puck_4.SyntaxKind.CommaToken, parseTypeParameter, true);
    }
    else {
      $puck_79 = [];
    };
    const typeParameters = $puck_79;
    const openBrace = expect($puck_4.SyntaxKind.OpenBraceToken);
    const members = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].toList.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: delimited($puck_4.SyntaxKind.OpenBraceToken, $puck_4.SyntaxKind.CloseBraceToken, $puck_4.SyntaxKind.SemicolonToken, function () {
      return parseFunctionDeclaration(true);
    }, false), $isTraitObject: true});
    const closeBrace = consumeToken($puck_4.SyntaxKind.CloseBraceToken);
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
    const keyword = consumeToken($puck_4.SyntaxKind.TypeKeyword);
    const name = consumeIdentifier();
    let $puck_80;
    if (isToken($puck_4.SyntaxKind.LessThanToken)) {
      $puck_80 = delimited($puck_4.SyntaxKind.LessThanToken, $puck_4.SyntaxKind.GreaterThanToken, $puck_4.SyntaxKind.CommaToken, parseTypeParameter, true);
    }
    else {
      $puck_80 = [];
    };
    const typeParameters = $puck_80;
    let $puck_81;
    if (isToken($puck_4.SyntaxKind.OpenBraceToken)) {
      $puck_81 = $puck_1.Some(parseRecordTypeBound());
    }
    else {
      let $puck_82;
      if (isToken($puck_4.SyntaxKind.OpenParenToken)) {
        $puck_82 = $puck_1.Some(parseTupleTypeBound());
      }
      else {
        $puck_82 = $puck_1.None;
      };
      $puck_81 = $puck_82;
    };
    const bound = $puck_81;
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
    const keyword = consumeToken($puck_4.SyntaxKind.ExportKeyword);
    let statement;
    let identifier;
    if (isToken($puck_4.SyntaxKind.EnumKeyword)) {
      const enumDeclaration = parseEnumDeclaration(attributes);
      statement = $puck_3.ExportedStatement.EnumDeclaration(enumDeclaration);
      identifier = enumDeclaration.name;
    }
    else {
      if (isToken($puck_4.SyntaxKind.TraitKeyword)) {
        const traitDeclaration = parseTraitDeclaration(attributes);
        statement = $puck_3.ExportedStatement.TraitDeclaration(traitDeclaration);
        identifier = traitDeclaration.name;
      }
      else {
        if (isToken($puck_4.SyntaxKind.TypeKeyword)) {
          const typeDeclaration = parseTypeDeclaration(attributes);
          statement = $puck_3.ExportedStatement.TypeDeclaration(typeDeclaration);
          identifier = typeDeclaration.name;
        }
        else {
          if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].isEmpty.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: attributes, $isTraitObject: true})) {
            if (isToken($puck_4.SyntaxKind.FnKeyword)) {
              const functionDeclaration = parseFunctionDeclaration();
              statement = $puck_3.ExportedStatement.FunctionDeclaration(functionDeclaration);
              let $puck_83 = functionDeclaration.name;
              if ($puck_83.kind == "Some") {
                let {value: [name]} = $puck_83;
                identifier = name;
              }
              else {
                $puck_6.TokenStream.croak.call(input, "Can not export function without a name");
              };
            }
            else {
              if (isToken($puck_4.SyntaxKind.LetKeyword)) {
                $puck_6.TokenStream.next.call(input);
                const variableDeclaration = parseVariableDeclaration();
                statement = $puck_3.ExportedStatement.VariableDeclaration(variableDeclaration);
                let $puck_84 = variableDeclaration.pattern;
                if ($puck_84.kind == "Identifier") {
                  let {value: [name]} = $puck_84;
                  identifier = name;
                }
                else {
                  $puck_6.TokenStream.croak.call(input, "Can not export a let declaration without a identifier pattern");
                };
              }
              else {
                $puck_6.TokenStream.croak.call(input, "Expected trait, type, function or variable declaration after export");
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
    const importKeyword = consumeToken($puck_4.SyntaxKind.ImportKeyword);
    let $puck_85 = $puck_6.TokenStream.next.call(input);
    let $puck_86;
    if ($unwrapTraitObject($puck_85).kind == "StringLiteral") {
      let {value: [stringLiteral]} = $unwrapTraitObject($puck_85);
      $puck_86 = stringLiteral;
    }
    else {
      let $puck_87;
      if (true) {
        let $puck_88 = $puck_85;
        $puck_87 = $puck_6.TokenStream.croak.call(input, "Expected string, " + butGot());
      };
      $puck_86 = $puck_87;
    };
    const locator = $puck_86;
    if (($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: locator.parts, $isTraitObject: true}) != 1)) {
      $puck_1.panic("More than one part in import string");
    };
    let $puck_89 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: locator.parts, $isTraitObject: true});
    let $puck_90;
    if (($unwrapTraitObject($puck_89).kind == "Some" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_89).value)[0]).kind == "Literal")) {
      let {value: [{value: [{value: value}]}]} = $unwrapTraitObject($puck_89);
      $puck_90 = $puck_1.String.split.call(value, ":");
    }
    else {
      let $puck_91;
      if (true) {
        let $puck_92 = $puck_89;
        $puck_91 = $puck_1.panic("String literal does not start with a literal");
      };
      $puck_90 = $puck_91;
    };
    const parts = $puck_90;
    if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parts, $isTraitObject: true}) > 2) {
      $puck_6.TokenStream.croak.call(input, "Illegal token \":\" used in import path");
    };
    let $puck_93;
    if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parts, $isTraitObject: true}) == 2) {
      $puck_93 = $puck_1.Some($puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: parts, $isTraitObject: true}, 0));
    }
    else {
      $puck_93 = $puck_1.None;
    };
    const domain = $puck_93;
    let $puck_94;
    if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parts, $isTraitObject: true}) == 2) {
      $puck_94 = $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: parts, $isTraitObject: true}, 1);
    }
    else {
      $puck_94 = $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: parts, $isTraitObject: true}, 0);
    };
    const path = $puck_94;
    const asKeyword = consumeToken($puck_4.SyntaxKind.AsKeyword);
    let $puck_95;
    if (isToken($puck_4.SyntaxKind.OpenBraceToken)) {
      $puck_95 = $puck_3.ImportSpecifier.ObjectDestructure(parseObjectDestructure());
    }
    else {
      let $puck_96;
      if (isToken($puck_4.SyntaxKind.AsteriskToken)) {
        $puck_96 = $puck_3.ImportSpecifier.Asterisk(consumeToken($puck_4.SyntaxKind.AsteriskToken));
      }
      else {
        $puck_96 = $puck_3.ImportSpecifier.Identifier(consumeIdentifier());
      };
      $puck_95 = $puck_96;
    };
    const specifier = $puck_95;
    return {
      importKeyword: importKeyword,
      domain: domain,
      path: path,
      asKeyword: asKeyword,
      specifier: specifier,
      _module: $puck_1.None,
    };
  };
  function parseObjectDestructure() {
    const openBrace = expect($puck_4.SyntaxKind.OpenBraceToken);
    const members = delimited($puck_4.SyntaxKind.OpenBraceToken, $puck_4.SyntaxKind.CloseBraceToken, $puck_4.SyntaxKind.CommaToken, parseObjectDestructureMember, false);
    const closeBrace = consumeToken($puck_4.SyntaxKind.CloseBraceToken);
    return {
      openBrace: openBrace,
      members: members,
      closeBrace: closeBrace,
    };
  };
  function parseObjectDestructureMember() {
    const property = consumeIdentifier();
    let $puck_97;
    if (isToken($puck_4.SyntaxKind.ColonToken)) {
      $puck_6.TokenStream.next.call(input);
      $puck_97 = consumeIdentifier();
    }
    else {
      $puck_97 = property;
    };
    const local = $puck_97;
    return {
      property: property,
      local: local,
    };
  };
  function parseBlock() {
    const openBrace = $puck_1.Some(expect($puck_4.SyntaxKind.OpenBraceToken));
    const statements = delimited($puck_4.SyntaxKind.OpenBraceToken, $puck_4.SyntaxKind.CloseBraceToken, $puck_4.SyntaxKind.SemicolonToken, parseBlockLevelStatement, false);
    const closeBrace = $puck_1.Some(consumeToken($puck_4.SyntaxKind.CloseBraceToken));
    return {
      openBrace: openBrace,
      statements: statements,
      closeBrace: closeBrace,
      type_: $unwrapTraitObject($puck_2._undefined),
    };
  };
  function parseWhile() {
    const keyword = consumeToken($puck_4.SyntaxKind.WhileKeyword);
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
    if (isToken($puck_4.SyntaxKind.ColonColonToken)) {
      return $puck_3.Expression.TypePathExpression({typePath: parseTypePath($puck_1.Some(identifier))});
    }
    else {
      return maybeAccess($puck_3.Expression.Identifier(identifier));
    };
  };
  function parseFunctionDeclaration(optionalBody = false) {
    consumeToken($puck_4.SyntaxKind.FnKeyword);
    let $puck_98 = $puck_6.TokenStream.peek.call(input);
    let $puck_99;
    if ($unwrapTraitObject($puck_98).kind == "Identifier") {
      let {value: [identifier]} = $unwrapTraitObject($puck_98);
      $puck_6.TokenStream.next.call(input);
      $puck_99 = $puck_1.Some(identifier);
    }
    else {
      let $puck_100;
      if (true) {
        let $puck_101 = $puck_98;
        $puck_100 = $puck_1.None;
      };
      $puck_99 = $puck_100;
    };
    const name = $puck_99;
    let $puck_102;
    if (isToken($puck_4.SyntaxKind.LessThanToken)) {
      $puck_102 = delimited($puck_4.SyntaxKind.LessThanToken, $puck_4.SyntaxKind.GreaterThanToken, $puck_4.SyntaxKind.CommaToken, parseTypeParameter, true);
    }
    else {
      $puck_102 = [];
    };
    const typeParameters = $puck_102;
    const openParenOrBar = expect($puck_4.SyntaxKind.OpenParenToken);
    const parameterList = delimited($puck_4.SyntaxKind.OpenParenToken, $puck_4.SyntaxKind.CloseParenToken, $puck_4.SyntaxKind.CommaToken, parseVariableDeclaration, false);
    const closeParenOrBar = consumeToken($puck_4.SyntaxKind.CloseParenToken);
    let $puck_103;
    if ($puck_1.Option.isSome.call(maybeConsumeToken($puck_4.SyntaxKind.MinusGreaterThanToken))) {
      $puck_103 = $puck_1.Some(parseTypeBound());
    }
    else {
      $puck_103 = $puck_1.None;
    };
    const returnType = $puck_103;
    let $puck_104;
    if ((isToken($puck_4.SyntaxKind.OpenBraceToken) || !optionalBody)) {
      $puck_104 = $puck_1.Some(parseBlock());
    }
    else {
      $puck_104 = $puck_1.None;
    };
    const body = $puck_104;
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
    const openParenOrBar = expect($puck_4.SyntaxKind.BarToken);
    const parameterList = delimited($puck_4.SyntaxKind.BarToken, $puck_4.SyntaxKind.BarToken, $puck_4.SyntaxKind.CommaToken, parseVariableDeclaration, false);
    const closeParenOrBar = consumeToken($puck_4.SyntaxKind.BarToken);
    let $puck_105;
    if (isToken($puck_4.SyntaxKind.OpenBraceToken)) {
      $puck_105 = $puck_1.Some(parseBlock());
    }
    else {
      $puck_105 = $puck_1.Some({
        openBrace: $puck_1.None,
        statements: [parseBlockLevelStatement()],
        closeBrace: $puck_1.None,
        type_: $puck_2._undefined,
      });
    };
    const body = $puck_105;
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
    const mutable = $puck_1.Option.isSome.call(maybeConsumeToken($puck_4.SyntaxKind.MutKeyword));
    const pattern = parsePattern();
    return {
      pattern: pattern,
      mutable: mutable,
      typeBound: $puck_1.Option.map.call(maybeConsumeToken($puck_4.SyntaxKind.ColonToken), function ($puck_106) {
      return parseTypeBound();
    }),
      initializer: $puck_1.Option.map.call(maybeConsumeToken($puck_4.SyntaxKind.EqualsToken), function ($puck_107) {
      return parseExpression();
    }),
    };
  };
  function parseIf() {
    const ifKeyword = consumeToken($puck_4.SyntaxKind.IfKeyword);
    if (isToken($puck_4.SyntaxKind.LetKeyword)) {
      return $puck_3.Expression.IfLetExpression(parseIfLetExpression(ifKeyword));
    }
    else {
      return $puck_3.Expression.IfExpression(parseIfExpression(ifKeyword));
    };
  };
  function parseIfExpression(ifKeyword) {
    const condition = parseExpression();
    let $puck_108;
    if (isToken($puck_4.SyntaxKind.OpenBraceToken)) {
      $puck_108 = parseBlock();
    }
    else {
      consumeToken($puck_4.SyntaxKind.ThenKeyword);
      $puck_108 = {
        openBrace: $puck_1.None,
        statements: [parseBlockLevelStatement()],
        closeBrace: $puck_1.None,
        type_: $puck_2._undefined,
      };
    };
    const then_ = $puck_108;
    let $puck_109;
    if (isToken($puck_4.SyntaxKind.ElseKeyword)) {
      $puck_6.TokenStream.next.call(input);
      let $puck_110;
      if (isToken($puck_4.SyntaxKind.OpenBraceToken)) {
        $puck_110 = parseBlock();
      }
      else {
        $puck_110 = {
          openBrace: $puck_1.None,
          statements: [parseBlockLevelStatement()],
          closeBrace: $puck_1.None,
          type_: $puck_2._undefined,
        };
      };
      $puck_109 = $puck_1.Some($puck_110);
    }
    else {
      $puck_109 = $puck_1.None;
    };
    return {
      ifKeyword: ifKeyword,
      condition: condition,
      then_: then_,
      else_: $puck_109,
    };
  };
  function parseIfLetExpression(ifKeyword) {
    const letKeyword = consumeToken($puck_4.SyntaxKind.LetKeyword);
    const pattern = parsePattern();
    const equalsToken = consumeToken($puck_4.SyntaxKind.EqualsToken);
    const expression = parseExpression();
    let $puck_111;
    if (isToken($puck_4.SyntaxKind.OpenBraceToken)) {
      $puck_111 = parseBlock();
    }
    else {
      consumeToken($puck_4.SyntaxKind.ThenKeyword);
      $puck_111 = {
        openBrace: $puck_1.None,
        statements: [parseBlockLevelStatement()],
        closeBrace: $puck_1.None,
        type_: $puck_2._undefined,
      };
    };
    const then_ = $puck_111;
    let $puck_112;
    if (isToken($puck_4.SyntaxKind.ElseKeyword)) {
      $puck_6.TokenStream.next.call(input);
      let $puck_113;
      if (isToken($puck_4.SyntaxKind.OpenBraceToken)) {
        $puck_113 = parseBlock();
      }
      else {
        $puck_113 = {
          openBrace: $puck_1.None,
          statements: [parseBlockLevelStatement()],
          closeBrace: $puck_1.None,
          type_: $puck_2._undefined,
        };
      };
      $puck_112 = $puck_1.Some($puck_113);
    }
    else {
      $puck_112 = $puck_1.None;
    };
    return {
      ifKeyword: ifKeyword,
      letKeyword: letKeyword,
      pattern: pattern,
      expression: expression,
      then_: then_,
      else_: $puck_112,
    };
  };
  function parseMatch() {
    return {
      matchKeyword: consumeToken($puck_4.SyntaxKind.MatchKeyword),
      expression: parseExpression(),
      openBrace: expect($puck_4.SyntaxKind.OpenBraceToken),
      patterns: delimited($puck_4.SyntaxKind.OpenBraceToken, $puck_4.SyntaxKind.CloseBraceToken, $puck_4.SyntaxKind.CommaToken, parseMatchArm, false),
      closeBrace: consumeToken($puck_4.SyntaxKind.CloseBraceToken),
    };
  };
  function parseMatchArm() {
    const pattern = parsePattern();
    const arrow = consumeToken($puck_4.SyntaxKind.EqualsGreaterThanToken);
    let $puck_114;
    if (isToken($puck_4.SyntaxKind.OpenBraceToken)) {
      $puck_114 = parseBlock();
    }
    else {
      $puck_114 = {
        openBrace: $puck_1.None,
        statements: [parseBlockLevelStatement()],
        closeBrace: $puck_1.None,
        type_: $puck_2._undefined,
      };
    };
    const block = $puck_114;
    return {
      pattern: pattern,
      arrow: arrow,
      block: block,
    };
  };
  function parseUnaryExpression() {
    let $puck_115 = $puck_6.TokenStream.next.call(input);
    if ($unwrapTraitObject($puck_115).kind == "SimpleToken") {
      let {value: [operator]} = $unwrapTraitObject($puck_115);
      let $puck_116 = operator.kind;
      if ($unwrapTraitObject($puck_116).kind == "NotKeyword") {
        let undefined = $unwrapTraitObject($puck_116);
        return {
          operator: operator,
          rhs: parseExpression($puck_4.SyntaxKind.precedence.call(operator.kind)),
        };
      }
      else {
        if ($unwrapTraitObject($puck_116).kind == "MinusToken") {
          let undefined = $unwrapTraitObject($puck_116);
          return {
            operator: operator,
            rhs: parseExpression($puck_4.SyntaxKind.precedence.call(operator.kind)),
          };
        }
        else {
          if ($unwrapTraitObject($puck_116).kind == "PlusToken") {
            let undefined = $unwrapTraitObject($puck_116);
            return {
              operator: operator,
              rhs: parseExpression($puck_4.SyntaxKind.precedence.call(operator.kind)),
            };
          }
          else {
            if (true) {
              let $puck_117 = $puck_116;
              return unexpected();
            };
          };
        };
      };
    }
    else {
      if (true) {
        let $puck_118 = $puck_115;
        return unexpected();
      };
    };
  };
  function parseListLiteral() {
    const openBracket = expect($puck_4.SyntaxKind.OpenBracketToken);
    const members = delimited($puck_4.SyntaxKind.OpenBracketToken, $puck_4.SyntaxKind.CloseBracketToken, $puck_4.SyntaxKind.CommaToken, parseExpression, false);
    const closeBracket = consumeToken($puck_4.SyntaxKind.CloseBracketToken);
    return {
      openBracket: openBracket,
      members: members,
      closeBracket: closeBracket,
    };
  };
  function parseRecordLiteral() {
    const openBrace = expect($puck_4.SyntaxKind.OpenBraceToken);
    const members = delimited($puck_4.SyntaxKind.OpenBraceToken, $puck_4.SyntaxKind.CloseBraceToken, $puck_4.SyntaxKind.CommaToken, parseRecordLiteralMember, false);
    const closeBrace = consumeToken($puck_4.SyntaxKind.CloseBraceToken);
    return {
      openBrace: openBrace,
      members: members,
      closeBrace: closeBrace,
    };
  };
  function parseRecordLiteralMember() {
    const name = consumeIdentifier();
    let $puck_119;
    if (isToken($puck_4.SyntaxKind.ColonToken)) {
      $puck_6.TokenStream.next.call(input);
      $puck_119 = parseExpression();
    }
    else {
      $puck_119 = $puck_3.Expression.Identifier(name);
    };
    const value = $puck_119;
    return {
      name: name,
      value: value,
    };
  };
  function parseTupleOrExpression(forceTuple) {
    const openParen = expect($puck_4.SyntaxKind.OpenParenToken);
    const expressions = delimited($puck_4.SyntaxKind.OpenParenToken, $puck_4.SyntaxKind.CloseParenToken, $puck_4.SyntaxKind.CommaToken, function () {
      return parseExpression(0, true);
    }, false);
    const closeParen = consumeToken($puck_4.SyntaxKind.CloseParenToken);
    if ((!forceTuple && $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: expressions, $isTraitObject: true}) == 1)) {
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
    let $puck_120 = maybeConsumeToken($puck_4.SyntaxKind.UnderscoreToken);
    if ($puck_120.kind == "Some") {
      let {value: [token]} = $puck_120;
      return $puck_3.Pattern.CatchAll(token);
    }
    else {
      if (isToken($puck_4.SyntaxKind.OpenParenToken)) {
        return $puck_3.Pattern.Tuple(parseTuplePattern());
      }
      else {
        if (isToken($puck_4.SyntaxKind.OpenBraceToken)) {
          return $puck_3.Pattern.Record(parseRecordPattern());
        }
        else {
          const identifier = consumeIdentifier();
          if ((isToken($puck_4.SyntaxKind.ColonColonToken) || isToken($puck_4.SyntaxKind.OpenParenToken) || isToken($puck_4.SyntaxKind.OpenBraceToken))) {
            const typePath = parseTypePath($puck_1.Some(identifier));
            if (isToken($puck_4.SyntaxKind.OpenParenToken)) {
              return $puck_3.Pattern.TupleType(typePath, parseTuplePattern());
            }
            else {
              if (isToken($puck_4.SyntaxKind.OpenBraceToken)) {
                return $puck_3.Pattern.RecordType(typePath, parseRecordPattern());
              }
              else {
                return $puck_3.Pattern.UnitType(typePath);
              };
            };
          }
          else {
            return $puck_3.Pattern.Identifier(identifier);
          };
        };
      };
    };
  };
  function parseRecordPattern() {
    const openBrace = expect($puck_4.SyntaxKind.OpenBraceToken);
    const properties = delimited($puck_4.SyntaxKind.OpenBraceToken, $puck_4.SyntaxKind.CloseBraceToken, $puck_4.SyntaxKind.CommaToken, parseRecordPatternMember, false);
    const closeBrace = consumeToken($puck_4.SyntaxKind.CloseBraceToken);
    return {
      openBrace: openBrace,
      properties: properties,
      closeBrace: closeBrace,
    };
  };
  function parseRecordPatternMember() {
    const property = consumeIdentifier();
    let $puck_121;
    if ($puck_1.Option.isSome.call(maybeConsumeToken($puck_4.SyntaxKind.ColonToken))) {
      $puck_121 = parsePattern();
    }
    else {
      $puck_121 = $puck_3.Pattern.Identifier(property);
    };
    const pattern = $puck_121;
    return {
      property: property,
      pattern: pattern,
    };
  };
  function parseTuplePattern() {
    const openParen = expect($puck_4.SyntaxKind.OpenParenToken);
    const properties = delimited($puck_4.SyntaxKind.OpenParenToken, $puck_4.SyntaxKind.CloseParenToken, $puck_4.SyntaxKind.CommaToken, parsePattern, false);
    const closeParen = consumeToken($puck_4.SyntaxKind.CloseParenToken);
    return {
      openParen: openParen,
      properties: properties,
      closeParen: closeParen,
    };
  };
  function parseTypeBound() {
    if (isToken($puck_4.SyntaxKind.LessThanToken)) {
      return parseFunctionTypeBound($puck_1.None);
    }
    else {
      if (isToken($puck_4.SyntaxKind.OpenParenToken)) {
        const tuple = parseTupleTypeBound();
        if (isToken($puck_4.SyntaxKind.MinusGreaterThanToken)) {
          return parseFunctionTypeBound($puck_1.Some(tuple));
        }
        else {
          return tuple;
        };
      }
      else {
        if (isToken($puck_4.SyntaxKind.OpenBraceToken)) {
          return parseRecordTypeBound();
        }
        else {
          return $puck_3.TypeBound.NamedTypeBound(parseNamedTypeBound());
        };
      };
    };
  };
  function parseFunctionTypeBound(tuple) {
    let $puck_122;
    if ($puck_1.Option.isNone.call(tuple) && isToken($puck_4.SyntaxKind.LessThanToken)) {
      $puck_122 = delimited($puck_4.SyntaxKind.LessThanToken, $puck_4.SyntaxKind.GreaterThanToken, $puck_4.SyntaxKind.CommaToken, parseTypeParameter, true);
    }
    else {
      $puck_122 = [];
    };
    const typeParameters = $puck_122;
    const parameters = $puck_3.TypeBound.getTupleTypeBound.call($puck_1.Option.unwrapOrElse.call(tuple, parseTupleTypeBound));
    consumeToken($puck_4.SyntaxKind.MinusGreaterThanToken);
    const returnType = parseTypeBound();
    return $puck_3.TypeBound.FunctionTypeBound({
      typeParameters: typeParameters,
      parameters: parameters,
      returnType: returnType,
    });
  };
  function parseNamedTypeBound() {
    const path = parseTypePath($puck_1.None);
    let $puck_123;
    if (isToken($puck_4.SyntaxKind.LessThanToken)) {
      $puck_123 = delimited($puck_4.SyntaxKind.LessThanToken, $puck_4.SyntaxKind.GreaterThanToken, $puck_4.SyntaxKind.CommaToken, parseTypeBound, true);
    }
    else {
      $puck_123 = [];
    };
    const typeParameters = $puck_123;
    return {
      path: path,
      typeParameters: typeParameters,
    };
  };
  function parseRecordTypeBound() {
    expect($puck_4.SyntaxKind.OpenBraceToken);
    const openBrace = expect($puck_4.SyntaxKind.OpenBraceToken);
    const properties = delimited($puck_4.SyntaxKind.OpenBraceToken, $puck_4.SyntaxKind.CloseBraceToken, $puck_4.SyntaxKind.CommaToken, parseRecordTypeBoundMember, false);
    const closeBrace = consumeToken($puck_4.SyntaxKind.CloseBraceToken);
    return $puck_3.TypeBound.RecordTypeBound({
      openBrace: openBrace,
      properties: properties,
      closeBrace: closeBrace,
    });
  };
  function parseRecordTypeBoundMember() {
    const name = consumeIdentifier();
    consumeToken($puck_4.SyntaxKind.ColonToken);
    const typeBound = parseTypeBound();
    return {
      name: name,
      typeBound: typeBound,
    };
  };
  function parseTupleTypeBound() {
    const openParen = expect($puck_4.SyntaxKind.OpenParenToken);
    const properties = delimited($puck_4.SyntaxKind.OpenParenToken, $puck_4.SyntaxKind.CloseParenToken, $puck_4.SyntaxKind.CommaToken, parseTypeBound, false);
    const closeParen = consumeToken($puck_4.SyntaxKind.CloseParenToken);
    return $puck_3.TypeBound.TupleTypeBound({
      openParen: openParen,
      properties: properties,
      closeParen: closeParen,
    });
  };
  function parseTypeParameter() {
    const name = consumeIdentifier();
    let $puck_124;
    if (isToken($puck_4.SyntaxKind.EqualsToken)) {
      $puck_6.TokenStream.next.call(input);
      $puck_124 = $puck_1.Some(parseTypeBound());
    }
    else {
      $puck_124 = $puck_1.None;
    };
    const defaultValue = $puck_124;
    return {
      name: name,
      defaultValue: defaultValue,
    };
  };
  function parseTypePath(identifier) {
    const i = $puck_1.Option.unwrapOrElse.call(identifier, consumeIdentifier);
    if ($puck_1.Option.isSome.call(maybeConsumeToken($puck_4.SyntaxKind.ColonColonToken))) {
      return $puck_3.TypePath._Object(i, parseTypePath($puck_1.None));
    }
    else {
      return $puck_3.TypePath.Member(i);
    };
  };
  return parseModule();
};
exports.parse = parse
