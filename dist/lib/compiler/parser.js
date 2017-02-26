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
  if ($unwrapTraitObject($puck_8).kind == "EqualsToken") {
    let undefined = $unwrapTraitObject($puck_8);
    return true;
  }
  else {
    if ($unwrapTraitObject($puck_8).kind == "PlusEqualsToken") {
      let undefined = $unwrapTraitObject($puck_8);
      return true;
    }
    else {
      if ($unwrapTraitObject($puck_8).kind == "MinusEqualsToken") {
        let undefined = $unwrapTraitObject($puck_8);
        return true;
      }
      else {
        if ($unwrapTraitObject($puck_8).kind == "AsteriskEqualsToken") {
          let undefined = $unwrapTraitObject($puck_8);
          return true;
        }
        else {
          if ($unwrapTraitObject($puck_8).kind == "AsteriskAsteriskEqualsToken") {
            let undefined = $unwrapTraitObject($puck_8);
            return true;
          }
          else {
            if ($unwrapTraitObject($puck_8).kind == "SlashEqualsToken") {
              let undefined = $unwrapTraitObject($puck_8);
              return true;
            }
            else {
              if ($unwrapTraitObject($puck_8).kind == "PercentEqualsToken") {
                let undefined = $unwrapTraitObject($puck_8);
                return true;
              }
              else {
                if (true) {
                  let $puck_9 = $puck_8;
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
  let $puck_10 = expression;
  if ($unwrapTraitObject($puck_10).kind == "Identifier") {
    let {value: [$puck_11]} = $unwrapTraitObject($puck_10);
    return true;
  }
  else {
    if ($unwrapTraitObject($puck_10).kind == "MemberAccess") {
      let {value: [$puck_12]} = $unwrapTraitObject($puck_10);
      return true;
    }
    else {
      if ($unwrapTraitObject($puck_10).kind == "IndexAccess") {
        let {value: [$puck_13]} = $unwrapTraitObject($puck_10);
        return true;
      }
      else {
        if ($unwrapTraitObject($puck_10).kind == "UnknownAccess") {
          let {value: [$puck_14]} = $unwrapTraitObject($puck_10);
          return true;
        }
        else {
          if ($unwrapTraitObject($puck_10).kind == "UnknownIndexAccess") {
            let {value: [$puck_15]} = $unwrapTraitObject($puck_10);
            return true;
          }
          else {
            if (true) {
              let $puck_16 = $puck_10;
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
    let $puck_17 = $puck_7.TokenStream.peek.call(input, withDummy);
    if ($unwrapTraitObject($puck_17).kind == "SimpleToken") {
      let {value: [token]} = $unwrapTraitObject($puck_17);
      return token.kind == kind;
    }
    else {
      if (true) {
        let $puck_18 = $puck_17;
        return false;
      };
    };
  };
  function butGot() {
    let $puck_19 = $puck_7.TokenStream.peek.call(input);
    let $puck_20;
    if (($unwrapTraitObject($puck_19).kind == "SimpleToken" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_19).value)[0]).kind).kind == "EndOfFileToken")) {
      let {value: [{kind: undefined}]} = $unwrapTraitObject($puck_19);
      $puck_20 = "but reached end of file";
    }
    else {
      let $puck_21;
      if (true) {
        const token = $puck_19;
        $puck_21 = "but got \"" + $puck_5.Token.name.call(token) + "\"";
      };
      $puck_20 = $puck_21;
    };
    let $puck_22 = $puck_20;;
    let token = $puck_22;;
    return $puck_22;
  };
  function expect(kind) {
    const token = $puck_7.TokenStream.peek.call(input);
    let $puck_23 = token;
    if (($unwrapTraitObject($puck_23).kind == "SimpleToken")) {
      let {value: [token]} = $unwrapTraitObject($puck_23);
      if (token.kind != kind) {
        $puck_7.TokenStream.croak.call(input, "Expected token: \"" + $puck_5.SyntaxKind.name.call(kind) + "\", " + butGot());
      };
      return token;
    }
    else {
      if (true) {
        let $puck_24 = $puck_23;
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
      let $puck_25 = $puck_7.TokenStream.peek.call(input);
      if (($unwrapTraitObject($puck_25).kind == "SimpleToken")) {
        let {value: [{span: span}]} = $unwrapTraitObject($puck_25);
        return {
          name: "",
          span: span,
        };
      }
      else {
        if (true) {
          let $puck_26 = $puck_25;
        };
      };
    };
    let $puck_27 = $puck_7.TokenStream.next.call(input);
    if ($unwrapTraitObject($puck_27).kind == "Identifier") {
      let {value: [identifier]} = $unwrapTraitObject($puck_27);
      return identifier;
    }
    else {
      if (true) {
        let $puck_28 = $puck_27;
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
    let $puck_29 = token;
    if (($unwrapTraitObject($puck_29).kind == "SimpleToken" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_29).value)[0]).kind).kind == "NewlineToken")) {
      let {value: [{kind: undefined}]} = $unwrapTraitObject($puck_29);
      $puck_7.TokenStream.next.call(input, true);
    }
    else {
      if ($unwrapTraitObject($puck_29).kind == "Comment") {
        let undefined = $unwrapTraitObject($puck_29);
        $puck_7.TokenStream.next.call(input, true);
      }
      else {
        if (true) {
          let $puck_30 = $puck_29;
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
    let $puck_31 = $puck_7.TokenStream.peek.call(input);
    if ($unwrapTraitObject($puck_31).kind == "SimpleToken") {
      let {value: [token]} = $unwrapTraitObject($puck_31);
      let $puck_32 = token.kind;
      if ($unwrapTraitObject($puck_32).kind == "EqualsEqualsToken") {
        let undefined = $unwrapTraitObject($puck_32);
        return $puck_1.Some(token);
      }
      else {
        if ($unwrapTraitObject($puck_32).kind == "ExclamationEqualsToken") {
          let undefined = $unwrapTraitObject($puck_32);
          return $puck_1.Some(token);
        }
        else {
          if ($unwrapTraitObject($puck_32).kind == "GreaterThanToken") {
            let undefined = $unwrapTraitObject($puck_32);
            return $puck_1.Some(token);
          }
          else {
            if ($unwrapTraitObject($puck_32).kind == "GreaterThanEqualsToken") {
              let undefined = $unwrapTraitObject($puck_32);
              return $puck_1.Some(token);
            }
            else {
              if ($unwrapTraitObject($puck_32).kind == "LessThanToken") {
                let undefined = $unwrapTraitObject($puck_32);
                return $puck_1.Some(token);
              }
              else {
                if ($unwrapTraitObject($puck_32).kind == "LessThanEqualsToken") {
                  let undefined = $unwrapTraitObject($puck_32);
                  return $puck_1.Some(token);
                }
                else {
                  if ($unwrapTraitObject($puck_32).kind == "PlusToken") {
                    let undefined = $unwrapTraitObject($puck_32);
                    return $puck_1.Some(token);
                  }
                  else {
                    if ($unwrapTraitObject($puck_32).kind == "MinusToken") {
                      let undefined = $unwrapTraitObject($puck_32);
                      return $puck_1.Some(token);
                    }
                    else {
                      if ($unwrapTraitObject($puck_32).kind == "AsteriskToken") {
                        let undefined = $unwrapTraitObject($puck_32);
                        return $puck_1.Some(token);
                      }
                      else {
                        if ($unwrapTraitObject($puck_32).kind == "AsteriskAsteriskToken") {
                          let undefined = $unwrapTraitObject($puck_32);
                          return $puck_1.Some(token);
                        }
                        else {
                          if ($unwrapTraitObject($puck_32).kind == "SlashToken") {
                            let undefined = $unwrapTraitObject($puck_32);
                            return $puck_1.Some(token);
                          }
                          else {
                            if ($unwrapTraitObject($puck_32).kind == "PercentToken") {
                              let undefined = $unwrapTraitObject($puck_32);
                              return $puck_1.Some(token);
                            }
                            else {
                              if ($unwrapTraitObject($puck_32).kind == "AndKeyword") {
                                let undefined = $unwrapTraitObject($puck_32);
                                return $puck_1.Some(token);
                              }
                              else {
                                if ($unwrapTraitObject($puck_32).kind == "OrKeyword") {
                                  let undefined = $unwrapTraitObject($puck_32);
                                  return $puck_1.Some(token);
                                }
                                else {
                                  if ($unwrapTraitObject($puck_32).kind == "NotKeyword") {
                                    let undefined = $unwrapTraitObject($puck_32);
                                    return $puck_1.Some(token);
                                  }
                                  else {
                                    if (true) {
                                      let $puck_33 = $puck_32;
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
        let $puck_34 = $puck_31;
        return $puck_1.None;
      };
    };
  };
  function maybeBinary(left, myPrecedence) {
    let $puck_35 = maybeParseOperator();
    if ($puck_35.kind == "Some") {
      let {value: [operator]} = $puck_35;
      let hisPrecedence = $puck_5.SyntaxKind.precedence.call(operator.kind);
      if (hisPrecedence > myPrecedence) {
        $puck_7.TokenStream.next.call(input);
        let innerExpression = maybeBinary(parseAtom(), hisPrecedence);
        let $puck_36;
        if (isAssignment(operator)) {
          if ((!isAssignable(left))) {
            $puck_7.TokenStream.croak.call(input, "Can only assign to an identifier");
          };
          $puck_36 = $puck_3.Expression.AssignmentExpression({
            lhs: left,
            token: operator,
            rhs: innerExpression,
          });
        }
        else {
          $puck_36 = $puck_3.Expression.BinaryExpression({
            lhs: left,
            operator: operator,
            rhs: innerExpression,
          });
        };
        const e = $puck_36;
        return maybeBinary(e, myPrecedence);
      };
    };
    return left;
  };
  function maybeCall(expression) {
    if (isToken($puck_5.SyntaxKind.OpenParenToken, true)) {
      return maybeCall(maybeAccess($puck_3.Expression.CallExpression({
        func: expression,
        openParen: expect($puck_5.SyntaxKind.OpenParenToken),
        argumentList: delimited($puck_5.SyntaxKind.OpenParenToken, $puck_5.SyntaxKind.CloseParenToken, $puck_5.SyntaxKind.CommaToken, parseExpression, false),
        closeParen: consumeToken($puck_5.SyntaxKind.CloseParenToken),
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
      let $puck_37 = statement;
      if ($puck_37.kind == "ExportDirective") {
        let {value: [e]} = $puck_37;
        exports[e.identifier.name] = e;
      };
      consumeSeparator($puck_5.SyntaxKind.SemicolonToken);
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
    let $puck_38 = $puck_7.TokenStream.peek.call(input);
    if ($unwrapTraitObject($puck_38).kind == "SimpleToken") {
      let {value: [token]} = $unwrapTraitObject($puck_38);
      let $puck_39 = token.kind;
      if ($unwrapTraitObject($puck_39).kind == "HashToken") {
        let undefined = $unwrapTraitObject($puck_39);
        return parseDeclarationWithAttribute();
      }
      else {
        if ($unwrapTraitObject($puck_39).kind == "EnumKeyword") {
          let undefined = $unwrapTraitObject($puck_39);
          return $puck_3.TopLevelStatement.EnumDeclaration(parseEnumDeclaration());
        }
        else {
          if ($unwrapTraitObject($puck_39).kind == "ExportKeyword") {
            let undefined = $unwrapTraitObject($puck_39);
            return $puck_3.TopLevelStatement.ExportDirective(parseExport());
          }
          else {
            if ($unwrapTraitObject($puck_39).kind == "ImplKeyword") {
              let undefined = $unwrapTraitObject($puck_39);
              return parseImplDeclaration();
            }
            else {
              if ($unwrapTraitObject($puck_39).kind == "ImportKeyword") {
                let undefined = $unwrapTraitObject($puck_39);
                return $puck_3.TopLevelStatement.ImportDirective(parseImport());
              }
              else {
                if ($unwrapTraitObject($puck_39).kind == "TraitKeyword") {
                  let undefined = $unwrapTraitObject($puck_39);
                  return $puck_3.TopLevelStatement.TraitDeclaration(parseTraitDeclaration());
                }
                else {
                  if ($unwrapTraitObject($puck_39).kind == "TypeKeyword") {
                    let undefined = $unwrapTraitObject($puck_39);
                    return $puck_3.TopLevelStatement.TypeDeclaration(parseTypeDeclaration());
                  }
                  else {
                    if (true) {
                      let $puck_40 = $puck_39;
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
        let $puck_41 = $puck_38;
        return $puck_3.TopLevelStatement.BlockLevelStatement(parseBlockLevelStatement());
      };
    };
  };
  function parseBlockLevelStatement() {
    let $puck_42 = $puck_7.TokenStream.peek.call(input);
    if (($unwrapTraitObject($puck_42).kind == "SimpleToken" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_42).value)[0]).kind).kind == "BreakKeyword")) {
      let {value: [{kind: undefined}]} = $unwrapTraitObject($puck_42);
      return $puck_3.BlockLevelStatement.BreakStatement({keyword: consumeToken($puck_5.SyntaxKind.BreakKeyword)});
    }
    else {
      if (($unwrapTraitObject($puck_42).kind == "SimpleToken" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_42).value)[0]).kind).kind == "ReturnKeyword")) {
        let {value: [{kind: undefined}]} = $unwrapTraitObject($puck_42);
        return $puck_3.BlockLevelStatement.ReturnStatement({
          keyword: consumeToken($puck_5.SyntaxKind.ReturnKeyword),
          expression: parseExpression(),
        });
      }
      else {
        if (($unwrapTraitObject($puck_42).kind == "SimpleToken" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_42).value)[0]).kind).kind == "WhileKeyword")) {
          let {value: [{kind: undefined}]} = $unwrapTraitObject($puck_42);
          return $puck_3.BlockLevelStatement.WhileLoop(parseWhile());
        }
        else {
          if (true) {
            let $puck_43 = $puck_42;
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
    let $puck_44 = $puck_7.TokenStream.peek.call(input);
    let $puck_45;
    if ($unwrapTraitObject($puck_44).kind == "SimpleToken") {
      let {value: [token]} = $unwrapTraitObject($puck_44);
      let $puck_46 = token.kind;
      let $puck_47;
      if ($unwrapTraitObject($puck_46).kind == "OpenParenToken") {
        let undefined = $unwrapTraitObject($puck_46);
        $puck_47 = parseTupleOrExpression(forceTuple);
      }
      else {
        let $puck_48;
        if ($unwrapTraitObject($puck_46).kind == "OpenBracketToken") {
          let undefined = $unwrapTraitObject($puck_46);
          $puck_48 = $puck_3.Expression.ListLiteral(parseListLiteral());
        }
        else {
          let $puck_49;
          if ($unwrapTraitObject($puck_46).kind == "OpenBraceToken") {
            let undefined = $unwrapTraitObject($puck_46);
            $puck_49 = $puck_3.Expression.RecordLiteral(parseRecordLiteral());
          }
          else {
            let $puck_50;
            if ($unwrapTraitObject($puck_46).kind == "BarToken") {
              let undefined = $unwrapTraitObject($puck_46);
              $puck_50 = $puck_3.Expression.FunctionDeclaration(parseLambda());
            }
            else {
              let $puck_51;
              if ($unwrapTraitObject($puck_46).kind == "IfKeyword") {
                let undefined = $unwrapTraitObject($puck_46);
                $puck_51 = parseIf();
              }
              else {
                let $puck_52;
                if ($unwrapTraitObject($puck_46).kind == "MatchKeyword") {
                  let undefined = $unwrapTraitObject($puck_46);
                  $puck_52 = $puck_3.Expression.MatchExpression(parseMatch());
                }
                else {
                  let $puck_53;
                  if ($unwrapTraitObject($puck_46).kind == "FnKeyword") {
                    let undefined = $unwrapTraitObject($puck_46);
                    $puck_53 = $puck_3.Expression.FunctionDeclaration(parseFunctionDeclaration());
                  }
                  else {
                    let $puck_54;
                    if ($unwrapTraitObject($puck_46).kind == "LetKeyword") {
                      let undefined = $unwrapTraitObject($puck_46);
                      $puck_7.TokenStream.next.call(input);
                      $puck_54 = $puck_3.Expression.VariableDeclaration(parseVariableDeclaration());
                    }
                    else {
                      let $puck_55;
                      if ($unwrapTraitObject($puck_46).kind == "NotKeyword") {
                        let undefined = $unwrapTraitObject($puck_46);
                        $puck_55 = $puck_3.Expression.UnaryExpression(parseUnaryExpression());
                      }
                      else {
                        let $puck_56;
                        if ($unwrapTraitObject($puck_46).kind == "MinusToken") {
                          let undefined = $unwrapTraitObject($puck_46);
                          $puck_56 = $puck_3.Expression.UnaryExpression(parseUnaryExpression());
                        }
                        else {
                          let $puck_57;
                          if ($unwrapTraitObject($puck_46).kind == "PlusToken") {
                            let undefined = $unwrapTraitObject($puck_46);
                            $puck_57 = $puck_3.Expression.UnaryExpression(parseUnaryExpression());
                          }
                          else {
                            let $puck_58;
                            if ($unwrapTraitObject($puck_46).kind == "ThrowKeyword") {
                              let undefined = $unwrapTraitObject($puck_46);
                              $puck_7.TokenStream.next.call(input);
                              $puck_58 = $puck_3.Expression.ThrowStatement({expression: parseExpression()});
                            }
                            else {
                              let $puck_59;
                              if ($unwrapTraitObject($puck_46).kind == "TrueKeyword") {
                                let undefined = $unwrapTraitObject($puck_46);
                                $puck_59 = maybeAccess($puck_3.Expression.BooleanLiteral({
                                  keyword: consumeToken($puck_5.SyntaxKind.TrueKeyword),
                                  value: true,
                                }));
                              }
                              else {
                                let $puck_60;
                                if ($unwrapTraitObject($puck_46).kind == "FalseKeyword") {
                                  let undefined = $unwrapTraitObject($puck_46);
                                  $puck_60 = maybeAccess($puck_3.Expression.BooleanLiteral({
                                    keyword: consumeToken($puck_5.SyntaxKind.FalseKeyword),
                                    value: false,
                                  }));
                                }
                                else {
                                  let $puck_61;
                                  if (true) {
                                    let $puck_62 = $puck_46;
                                    let $puck_63;
                                    if (recover) {
                                      $puck_63 = $puck_3.Expression.Identifier(consumeIdentifier());
                                    }
                                    else {
                                      $puck_63 = unexpected();
                                    };
                                    $puck_61 = $puck_63;
                                  };
                                  $puck_60 = $puck_61;
                                };
                                $puck_59 = $puck_60;
                              };
                              $puck_58 = $puck_59;
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
      $puck_45 = $puck_47;
    }
    else {
      let $puck_64;
      if ($unwrapTraitObject($puck_44).kind == "NumberLiteral") {
        let {value: [numberLiteral]} = $unwrapTraitObject($puck_44);
        $puck_7.TokenStream.next.call(input);
        $puck_64 = maybeAccess($puck_3.Expression.NumberLiteral(numberLiteral));
      }
      else {
        let $puck_65;
        if ($unwrapTraitObject($puck_44).kind == "StringLiteral") {
          let {value: [stringLiteral]} = $unwrapTraitObject($puck_44);
          $puck_7.TokenStream.next.call(input);
          $puck_65 = maybeAccess($puck_3.Expression.StringLiteral(stringLiteral));
        }
        else {
          let $puck_66;
          if ($unwrapTraitObject($puck_44).kind == "Identifier") {
            let {value: [identifier]} = $unwrapTraitObject($puck_44);
            $puck_66 = parseIdentifierOrTypePath();
          }
          else {
            let $puck_67;
            if ($unwrapTraitObject($puck_44).kind == "Comment") {
              let undefined = $unwrapTraitObject($puck_44);
              $puck_67 = unexpected();
            };
            $puck_66 = $puck_67;
          };
          $puck_65 = $puck_66;
        };
        $puck_64 = $puck_65;
      };
      $puck_45 = $puck_64;
    };
    return maybeCall($puck_45);
  };
  function parseSimpleLiteral() {
    let $puck_68 = $puck_7.TokenStream.next.call(input);
    if ($unwrapTraitObject($puck_68).kind == "SimpleToken") {
      let {value: [token]} = $unwrapTraitObject($puck_68);
      let $puck_69 = token.kind;
      if ($unwrapTraitObject($puck_69).kind == "TrueKeyword") {
        let undefined = $unwrapTraitObject($puck_69);
        return $puck_3.SimpleLiteral.BooleanLiteral({
          keyword: token,
          value: true,
        });
      }
      else {
        if ($unwrapTraitObject($puck_69).kind == "FalseKeyword") {
          let undefined = $unwrapTraitObject($puck_69);
          return $puck_3.SimpleLiteral.BooleanLiteral({
            keyword: token,
            value: false,
          });
        }
        else {
          if (true) {
            let $puck_70 = $puck_69;
            return unexpected();
          };
        };
      };
    }
    else {
      if ($unwrapTraitObject($puck_68).kind == "NumberLiteral") {
        let {value: [numberLiteral]} = $unwrapTraitObject($puck_68);
        return $puck_3.SimpleLiteral.NumberLiteral(numberLiteral);
      }
      else {
        if ($unwrapTraitObject($puck_68).kind == "StringLiteral") {
          let {value: [stringLiteral]} = $unwrapTraitObject($puck_68);
          if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: stringLiteral.parts, $isTraitObject: true}) > 1) {
            $puck_7.TokenStream.croak.call(input, "Attributes can only contain simple string literals. Interpolation is not supported.");
          };
          let $puck_71 = $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: stringLiteral.parts, $isTraitObject: true}, 0);
          if ($unwrapTraitObject($puck_71).kind == "Literal") {
            let {value: [literal]} = $unwrapTraitObject($puck_71);
            return $puck_3.SimpleLiteral.StringLiteral(literal);
          }
          else {
            if (true) {
              let $puck_72 = $puck_71;
              return $puck_1.panic("String literal does not start with a literal");
            };
          };
        }
        else {
          if (true) {
            let $puck_73 = $puck_68;
            return unexpected();
          };
        };
      };
    };
  };
  function parseAttributeArgument() {
    const name = consumeIdentifier();
    const value = $puck_1.Option.map.call(maybeConsumeToken($puck_5.SyntaxKind.EqualsToken), function ($puck_74) {
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
    let $puck_75;
    if ($puck_1.Option.isSome.call(maybeConsumeToken($puck_5.SyntaxKind.EqualsToken))) {
      $puck_75 = $puck_3.AttributeData.Value(parseSimpleLiteral());
    }
    else {
      let $puck_76;
      if (isToken($puck_5.SyntaxKind.OpenParenToken)) {
        $puck_76 = $puck_3.AttributeData.Arguments(delimited($puck_5.SyntaxKind.OpenParenToken, $puck_5.SyntaxKind.CloseParenToken, $puck_5.SyntaxKind.CommaToken, parseAttributeArgument, true));
      }
      else {
        $puck_76 = $puck_3.AttributeData.None;
      };
      $puck_75 = $puck_76;
    };
    const data = $puck_75;
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
    let $puck_77;
    if (isToken($puck_5.SyntaxKind.LessThanToken)) {
      $puck_77 = delimited($puck_5.SyntaxKind.LessThanToken, $puck_5.SyntaxKind.GreaterThanToken, $puck_5.SyntaxKind.CommaToken, parseTypeParameter, true);
    }
    else {
      $puck_77 = [];
    };
    const typeParameters = $puck_77;
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
    let $puck_78;
    if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
      $puck_78 = $puck_1.Some(parseRecordTypeBound());
    }
    else {
      let $puck_79;
      if (isToken($puck_5.SyntaxKind.OpenParenToken)) {
        $puck_79 = $puck_1.Some(parseTupleTypeBound());
      }
      else {
        $puck_79 = $puck_1.None;
      };
      $puck_78 = $puck_79;
    };
    const bound = $puck_78;
    return {
      name: name,
      bound: bound,
    };
  };
  function parseImplDeclaration() {
    const implKeyword = consumeToken($puck_5.SyntaxKind.ImplKeyword);
    let $puck_80;
    if (isToken($puck_5.SyntaxKind.LessThanToken)) {
      $puck_80 = delimited($puck_5.SyntaxKind.LessThanToken, $puck_5.SyntaxKind.GreaterThanToken, $puck_5.SyntaxKind.CommaToken, parseTypeParameter, true);
    }
    else {
      $puck_80 = [];
    };
    const typeParameters = $puck_80;
    const trait_ = parseNamedTypeBound();
    let $puck_81;
    if (isToken($puck_5.SyntaxKind.ForKeyword)) {
      $puck_81 = {
        forKeyword: $puck_1.Some(consumeToken($puck_5.SyntaxKind.ForKeyword)),
        type_: $puck_1.Some(parseNamedTypeBound()),
      };
    }
    else {
      $puck_81 = {
        forKeyword: $puck_1.None,
        type_: $puck_1.None,
      };
    };
    let {forKeyword: forKeyword, type_: type_} = $puck_81;
    const openBrace = expect($puck_5.SyntaxKind.OpenBraceToken);
    const members = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].toList.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: delimited($puck_5.SyntaxKind.OpenBraceToken, $puck_5.SyntaxKind.CloseBraceToken, $puck_5.SyntaxKind.SemicolonToken, parseFunctionDeclaration, false), $isTraitObject: true});
    const closeBrace = consumeToken($puck_5.SyntaxKind.CloseBraceToken);
    let $puck_82 = type_;
    if ($puck_82.kind == "Some") {
      let {value: [type_]} = $puck_82;
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
    let $puck_83;
    if (isToken($puck_5.SyntaxKind.LessThanToken)) {
      $puck_83 = delimited($puck_5.SyntaxKind.LessThanToken, $puck_5.SyntaxKind.GreaterThanToken, $puck_5.SyntaxKind.CommaToken, parseTypeParameter, true);
    }
    else {
      $puck_83 = [];
    };
    const typeParameters = $puck_83;
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
    let $puck_84;
    if (isToken($puck_5.SyntaxKind.LessThanToken)) {
      $puck_84 = delimited($puck_5.SyntaxKind.LessThanToken, $puck_5.SyntaxKind.GreaterThanToken, $puck_5.SyntaxKind.CommaToken, parseTypeParameter, true);
    }
    else {
      $puck_84 = [];
    };
    const typeParameters = $puck_84;
    let $puck_85;
    if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
      $puck_85 = $puck_1.Some(parseRecordTypeBound());
    }
    else {
      let $puck_86;
      if (isToken($puck_5.SyntaxKind.OpenParenToken)) {
        $puck_86 = $puck_1.Some(parseTupleTypeBound());
      }
      else {
        $puck_86 = $puck_1.None;
      };
      $puck_85 = $puck_86;
    };
    const bound = $puck_85;
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
              let $puck_87 = functionDeclaration.name;
              if ($puck_87.kind == "Some") {
                let {value: [name]} = $puck_87;
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
                let $puck_88 = variableDeclaration.pattern;
                if ($puck_88.kind == "Identifier") {
                  let {value: [name]} = $puck_88;
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
    let $puck_89 = $puck_7.TokenStream.next.call(input);
    let $puck_90;
    if ($unwrapTraitObject($puck_89).kind == "StringLiteral") {
      let {value: [stringLiteral]} = $unwrapTraitObject($puck_89);
      $puck_90 = stringLiteral;
    }
    else {
      let $puck_91;
      if (true) {
        let $puck_92 = $puck_89;
        $puck_91 = $puck_7.TokenStream.croak.call(input, "Expected string, " + butGot());
      };
      $puck_90 = $puck_91;
    };
    const locator = $puck_90;
    if (($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: locator.parts, $isTraitObject: true}) != 1)) {
      $puck_1.panic("More than one part in import string");
    };
    let $puck_93 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: locator.parts, $isTraitObject: true});
    let $puck_94;
    if (($unwrapTraitObject($puck_93).kind == "Some" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_93).value)[0]).kind == "Literal")) {
      let {value: [{value: [{value: value}]}]} = $unwrapTraitObject($puck_93);
      $puck_94 = $puck_1.String.split.call(value, ":");
    }
    else {
      let $puck_95;
      if (true) {
        let $puck_96 = $puck_93;
        $puck_95 = $puck_1.panic("String literal does not start with a literal");
      };
      $puck_94 = $puck_95;
    };
    const parts = $puck_94;
    if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parts, $isTraitObject: true}) > 2) {
      $puck_7.TokenStream.croak.call(input, "Illegal token \":\" used in import path");
    };
    let $puck_97;
    if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parts, $isTraitObject: true}) == 2) {
      $puck_97 = $puck_1.Some($puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: parts, $isTraitObject: true}, 0));
    }
    else {
      $puck_97 = $puck_1.None;
    };
    const domain = $puck_97;
    let $puck_98;
    if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parts, $isTraitObject: true}) == 2) {
      $puck_98 = $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: parts, $isTraitObject: true}, 1);
    }
    else {
      $puck_98 = $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: parts, $isTraitObject: true}, 0);
    };
    const path = $puck_98;
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
    let $puck_99;
    if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
      $puck_99 = $puck_3.ImportSpecifier.ObjectDestructure(parseObjectDestructure());
    }
    else {
      let $puck_100;
      if (isToken($puck_5.SyntaxKind.AsteriskToken)) {
        $puck_100 = $puck_3.ImportSpecifier.Asterisk(consumeToken($puck_5.SyntaxKind.AsteriskToken));
      }
      else {
        $puck_100 = $puck_3.ImportSpecifier.Identifier(consumeIdentifier());
      };
      $puck_99 = $puck_100;
    };
    const specifier = $puck_99;
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
    let $puck_101;
    if (isToken($puck_5.SyntaxKind.ColonToken)) {
      $puck_7.TokenStream.next.call(input);
      $puck_101 = consumeIdentifier();
    }
    else {
      $puck_101 = property;
    };
    const local = $puck_101;
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
    let $puck_102 = $puck_7.TokenStream.peek.call(input);
    let $puck_103;
    if ($unwrapTraitObject($puck_102).kind == "Identifier") {
      let {value: [identifier]} = $unwrapTraitObject($puck_102);
      $puck_7.TokenStream.next.call(input);
      $puck_103 = $puck_1.Some(identifier);
    }
    else {
      let $puck_104;
      if (true) {
        let $puck_105 = $puck_102;
        $puck_104 = $puck_1.None;
      };
      $puck_103 = $puck_104;
    };
    const name = $puck_103;
    let $puck_106;
    if (isToken($puck_5.SyntaxKind.LessThanToken)) {
      $puck_106 = delimited($puck_5.SyntaxKind.LessThanToken, $puck_5.SyntaxKind.GreaterThanToken, $puck_5.SyntaxKind.CommaToken, parseTypeParameter, true);
    }
    else {
      $puck_106 = [];
    };
    const typeParameters = $puck_106;
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
    let $puck_107;
    if ($puck_1.Option.isSome.call(maybeConsumeToken($puck_5.SyntaxKind.MinusGreaterThanToken))) {
      $puck_107 = $puck_1.Some(parseTypeBound());
    }
    else {
      $puck_107 = $puck_1.None;
    };
    const returnType = $puck_107;
    let $puck_108;
    if ((recover && !isToken($puck_5.SyntaxKind.OpenBraceToken) && (!optionalBody || $puck_1.Option.isNone.call(returnType)))) {
      $puck_108 = $puck_1.Some(mockBlock());
    }
    else {
      let $puck_109;
      if ((isToken($puck_5.SyntaxKind.OpenBraceToken) || !optionalBody)) {
        $puck_109 = $puck_1.Some(parseBlock());
      }
      else {
        $puck_109 = $puck_1.None;
      };
      $puck_108 = $puck_109;
    };
    const body = $puck_108;
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
    let $puck_110;
    if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
      $puck_110 = $puck_1.Some(parseBlock());
    }
    else {
      $puck_110 = $puck_1.Some({
        openBrace: $puck_1.None,
        statements: [parseBlockLevelStatement()],
        closeBrace: $puck_1.None,
        type_: $puck_2._undefined,
      });
    };
    const body = $puck_110;
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
    const mutable = $puck_1.Option.isSome.call(maybeConsumeToken($puck_5.SyntaxKind.MutKeyword));
    const pattern = parsePattern();
    return {
      pattern: pattern,
      mutable: mutable,
      typeBound: $puck_1.Option.map.call(maybeConsumeToken($puck_5.SyntaxKind.ColonToken), function ($puck_111) {
      return parseTypeBound();
    }),
      initializer: $puck_1.Option.map.call(maybeConsumeToken($puck_5.SyntaxKind.EqualsToken), function ($puck_112) {
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
    let $puck_113;
    if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
      $puck_113 = parseBlock();
    }
    else {
      let $puck_114;
      if ((recover && !isToken($puck_5.SyntaxKind.ThenKeyword))) {
        $puck_114 = mockBlock();
      }
      else {
        consumeToken($puck_5.SyntaxKind.ThenKeyword);
        $puck_114 = {
          openBrace: $puck_1.None,
          statements: [parseBlockLevelStatement()],
          closeBrace: $puck_1.None,
          type_: $puck_2._undefined,
        };
      };
      $puck_113 = $puck_114;
    };
    const then_ = $puck_113;
    let $puck_115;
    if (isToken($puck_5.SyntaxKind.ElseKeyword)) {
      $puck_7.TokenStream.next.call(input);
      let $puck_116;
      if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
        $puck_116 = parseBlock();
      }
      else {
        $puck_116 = {
          openBrace: $puck_1.None,
          statements: [parseBlockLevelStatement()],
          closeBrace: $puck_1.None,
          type_: $puck_2._undefined,
        };
      };
      $puck_115 = $puck_1.Some($puck_116);
    }
    else {
      $puck_115 = $puck_1.None;
    };
    return {
      ifKeyword: ifKeyword,
      condition: condition,
      then_: then_,
      else_: $puck_115,
    };
  };
  function parseIfLetExpression(ifKeyword) {
    const letKeyword = consumeToken($puck_5.SyntaxKind.LetKeyword);
    const pattern = parsePattern();
    const equalsToken = consumeToken($puck_5.SyntaxKind.EqualsToken);
    const expression = parseExpression();
    let $puck_117;
    if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
      $puck_117 = parseBlock();
    }
    else {
      let $puck_118;
      if ((recover && !isToken($puck_5.SyntaxKind.ThenKeyword))) {
        $puck_118 = mockBlock();
      }
      else {
        consumeToken($puck_5.SyntaxKind.ThenKeyword);
        $puck_118 = {
          openBrace: $puck_1.None,
          statements: [parseBlockLevelStatement()],
          closeBrace: $puck_1.None,
          type_: $puck_2._undefined,
        };
      };
      $puck_117 = $puck_118;
    };
    const then_ = $puck_117;
    let $puck_119;
    if (isToken($puck_5.SyntaxKind.ElseKeyword)) {
      $puck_7.TokenStream.next.call(input);
      let $puck_120;
      if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
        $puck_120 = parseBlock();
      }
      else {
        $puck_120 = {
          openBrace: $puck_1.None,
          statements: [parseBlockLevelStatement()],
          closeBrace: $puck_1.None,
          type_: $puck_2._undefined,
        };
      };
      $puck_119 = $puck_1.Some($puck_120);
    }
    else {
      $puck_119 = $puck_1.None;
    };
    return {
      ifKeyword: ifKeyword,
      letKeyword: letKeyword,
      pattern: pattern,
      expression: expression,
      then_: then_,
      else_: $puck_119,
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
    let $puck_121;
    if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
      $puck_121 = parseBlock();
    }
    else {
      $puck_121 = {
        openBrace: $puck_1.None,
        statements: [parseBlockLevelStatement()],
        closeBrace: $puck_1.None,
        type_: $puck_2._undefined,
      };
    };
    const block = $puck_121;
    return {
      pattern: pattern,
      arrow: arrow,
      block: block,
    };
  };
  function parseUnaryExpression() {
    let $puck_122 = $puck_7.TokenStream.next.call(input);
    if ($unwrapTraitObject($puck_122).kind == "SimpleToken") {
      let {value: [operator]} = $unwrapTraitObject($puck_122);
      let $puck_123 = operator.kind;
      if ($unwrapTraitObject($puck_123).kind == "NotKeyword") {
        let undefined = $unwrapTraitObject($puck_123);
        return {
          operator: operator,
          rhs: parseExpression($puck_5.SyntaxKind.precedence.call(operator.kind)),
        };
      }
      else {
        if ($unwrapTraitObject($puck_123).kind == "MinusToken") {
          let undefined = $unwrapTraitObject($puck_123);
          return {
            operator: operator,
            rhs: parseExpression($puck_5.SyntaxKind.precedence.call(operator.kind)),
          };
        }
        else {
          if ($unwrapTraitObject($puck_123).kind == "PlusToken") {
            let undefined = $unwrapTraitObject($puck_123);
            return {
              operator: operator,
              rhs: parseExpression($puck_5.SyntaxKind.precedence.call(operator.kind)),
            };
          }
          else {
            if (true) {
              let $puck_124 = $puck_123;
              return unexpected();
            };
          };
        };
      };
    }
    else {
      if (true) {
        let $puck_125 = $puck_122;
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
    let $puck_126;
    if (isToken($puck_5.SyntaxKind.ColonToken)) {
      $puck_7.TokenStream.next.call(input);
      $puck_126 = parseExpression();
    }
    else {
      $puck_126 = $puck_3.Expression.Identifier(name);
    };
    const value = $puck_126;
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
    let $puck_127 = maybeConsumeToken($puck_5.SyntaxKind.UnderscoreToken);
    if ($puck_127.kind == "Some") {
      let {value: [token]} = $puck_127;
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
            return $puck_3.Pattern.Identifier(identifier);
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
    let $puck_128;
    if ($puck_1.Option.isSome.call(maybeConsumeToken($puck_5.SyntaxKind.ColonToken))) {
      $puck_128 = parsePattern();
    }
    else {
      $puck_128 = $puck_3.Pattern.Identifier(property);
    };
    const pattern = $puck_128;
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
    let $puck_129;
    if ($puck_1.Option.isNone.call(tuple) && isToken($puck_5.SyntaxKind.LessThanToken)) {
      $puck_129 = delimited($puck_5.SyntaxKind.LessThanToken, $puck_5.SyntaxKind.GreaterThanToken, $puck_5.SyntaxKind.CommaToken, parseTypeParameter, true);
    }
    else {
      $puck_129 = [];
    };
    const typeParameters = $puck_129;
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
    let $puck_130;
    if (isToken($puck_5.SyntaxKind.LessThanToken)) {
      $puck_130 = delimited($puck_5.SyntaxKind.LessThanToken, $puck_5.SyntaxKind.GreaterThanToken, $puck_5.SyntaxKind.CommaToken, parseTypeBound, true);
    }
    else {
      $puck_130 = [];
    };
    const typeParameters = $puck_130;
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
    let $puck_131;
    if (isToken($puck_5.SyntaxKind.EqualsToken)) {
      $puck_7.TokenStream.next.call(input);
      $puck_131 = $puck_1.Some(parseTypeBound());
    }
    else {
      $puck_131 = $puck_1.None;
    };
    const defaultValue = $puck_131;
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
