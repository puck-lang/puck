'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.parse = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("./../ast/ast");
const $puck_4 = require("./../ast/span");
const $puck_5 = require("./../ast/token");
const $puck_6 = require("./../entities");
const $puck_7 = require("./token_stream");
function isAssignment(token) {
  let $puck_8 = token.kind;
  if ($puck_8.kind === "EqualsToken") {
    $puck_8;
    return true;
  }
  else {
    if ($puck_8.kind === "PlusEqualsToken") {
      $puck_8;
      return true;
    }
    else {
      if ($puck_8.kind === "MinusEqualsToken") {
        $puck_8;
        return true;
      }
      else {
        if ($puck_8.kind === "AsteriskEqualsToken") {
          $puck_8;
          return true;
        }
        else {
          if ($puck_8.kind === "AsteriskAsteriskEqualsToken") {
            $puck_8;
            return true;
          }
          else {
            if ($puck_8.kind === "SlashEqualsToken") {
              $puck_8;
              return true;
            }
            else {
              if ($puck_8.kind === "PercentEqualsToken") {
                $puck_8;
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
  if ($puck_9.kind === "Identifier") {
    $puck_9;
    return true;
  }
  else {
    if ($puck_9.kind === "MemberAccess") {
      $puck_9;
      return true;
    }
    else {
      if ($puck_9.kind === "IndexAccess") {
        $puck_9;
        return true;
      }
      else {
        if ($puck_9.kind === "UnknownAccess") {
          $puck_9;
          return true;
        }
        else {
          if ($puck_9.kind === "UnknownIndexAccess") {
            $puck_9;
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
    if ($puck_10.kind === "SimpleToken") {
      let {value: token} = $puck_10;
      return $puck_1.identical(token.kind, kind);
    }
    else {
      if (true) {
        $puck_10;
        return false;
      };
    };
  };
  function maybeToken(kind) {
    let $puck_11 = $puck_7.TokenStream.peek.call(input);
    if ($puck_11.kind === "SimpleToken") {
      let {value: token} = $puck_11;
      if ($puck_1.identical(token.kind, kind)) {
        return $puck_1.Some(token);
      }
      else {
        return $puck_1.None;
      };
    }
    else {
      if (true) {
        $puck_11;
        return $puck_1.None;
      };
    };
  };
  function butGot() {
    let $puck_12 = $puck_7.TokenStream.peek.call(input);
    let $puck_13;
    if (($puck_12.kind === "SimpleToken" && $unwrapTraitObject($unwrapTraitObject($puck_12.value).kind).kind === "EndOfFileToken")) {
      let {value: {}} = $puck_12;
      $puck_13 = "but reached end of file";
    }
    else {
      let $puck_14;
      if (true) {
        const token = $puck_12;
        $puck_14 = "but got \"" + $puck_5.Token.name.call(token) + "\"";
      };
      $puck_13 = $puck_14;
    };
    let $puck_15 = $puck_13;;
    let token = $puck_15;;
    return $puck_15;
  };
  function expect(kind) {
    const token = $puck_7.TokenStream.peek.call(input);
    let $puck_16 = token;
    if (($puck_16.kind === "SimpleToken")) {
      let {value: token} = $puck_16;
      if ((!$puck_1.identical(token.kind, kind))) {
        $puck_7.TokenStream.croak.call(input, "Expected token: \"" + $puck_5.SyntaxKind.name.call(kind) + "\", " + butGot());
      };
      return token;
    }
    else {
      if (true) {
        $puck_16;
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
      let $puck_17 = $puck_7.TokenStream.peek.call(input);
      if (($puck_17.kind === "SimpleToken")) {
        let {value: {span: span}} = $puck_17;
        return {
          name: "",
          span: span,
        };
      }
      else {
        if (true) {
          $puck_17;
        };
      };
    };
    let $puck_18 = $puck_7.TokenStream.next.call(input);
    if ($puck_18.kind === "Identifier") {
      let {value: identifier} = $puck_18;
      return identifier;
    }
    else {
      if (true) {
        $puck_18;
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
    let $puck_19 = token;
    if (($puck_19.kind === "SimpleToken" && $unwrapTraitObject($unwrapTraitObject($puck_19.value).kind).kind === "NewlineToken")) {
      let {value: {}} = $puck_19;
      $puck_7.TokenStream.next.call(input, true);
    }
    else {
      if ($puck_19.kind === "Comment") {
        $puck_19;
        $puck_7.TokenStream.next.call(input, true);
      }
      else {
        if (true) {
          $puck_19;
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
    let $puck_20 = $puck_7.TokenStream.peek.call(input);
    if ($puck_20.kind === "SimpleToken") {
      let {value: token} = $puck_20;
      let $puck_21 = token.kind;
      if ($puck_21.kind === "EqualsEqualsToken") {
        $puck_21;
        return $puck_1.Some(token);
      }
      else {
        if ($puck_21.kind === "ExclamationEqualsToken") {
          $puck_21;
          return $puck_1.Some(token);
        }
        else {
          if ($puck_21.kind === "GreaterThanToken") {
            $puck_21;
            return $puck_1.Some(token);
          }
          else {
            if ($puck_21.kind === "GreaterThanEqualsToken") {
              $puck_21;
              return $puck_1.Some(token);
            }
            else {
              if ($puck_21.kind === "LessThanToken") {
                $puck_21;
                return $puck_1.Some(token);
              }
              else {
                if ($puck_21.kind === "LessThanEqualsToken") {
                  $puck_21;
                  return $puck_1.Some(token);
                }
                else {
                  if ($puck_21.kind === "PlusToken") {
                    $puck_21;
                    return $puck_1.Some(token);
                  }
                  else {
                    if ($puck_21.kind === "PlusPlusToken") {
                      $puck_21;
                      return $puck_1.Some(token);
                    }
                    else {
                      if ($puck_21.kind === "MinusToken") {
                        $puck_21;
                        return $puck_1.Some(token);
                      }
                      else {
                        if ($puck_21.kind === "AsteriskToken") {
                          $puck_21;
                          return $puck_1.Some(token);
                        }
                        else {
                          if ($puck_21.kind === "AsteriskAsteriskToken") {
                            $puck_21;
                            return $puck_1.Some(token);
                          }
                          else {
                            if ($puck_21.kind === "SlashToken") {
                              $puck_21;
                              return $puck_1.Some(token);
                            }
                            else {
                              if ($puck_21.kind === "PercentToken") {
                                $puck_21;
                                return $puck_1.Some(token);
                              }
                              else {
                                if ($puck_21.kind === "AndKeyword") {
                                  $puck_21;
                                  return $puck_1.Some(token);
                                }
                                else {
                                  if ($puck_21.kind === "OrKeyword") {
                                    $puck_21;
                                    return $puck_1.Some(token);
                                  }
                                  else {
                                    if ($puck_21.kind === "NotKeyword") {
                                      $puck_21;
                                      return $puck_1.Some(token);
                                    }
                                    else {
                                      if (true) {
                                        $puck_21;
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
      };
    }
    else {
      if (true) {
        $puck_20;
        return $puck_1.None;
      };
    };
  };
  function maybeBinary(left, myPrecedence) {
    let $puck_22 = maybeParseOperator();
    if ($puck_22 !== undefined) {
      let operator = $puck_22;
      let hisPrecedence = $puck_5.SyntaxKind.precedence.call(operator.kind);
      if (hisPrecedence > myPrecedence) {
        $puck_7.TokenStream.next.call(input);
        let innerExpression = maybeBinary(parseAtom(), hisPrecedence);
        let $puck_23;
        if (isAssignment(operator)) {
          if ((!isAssignable(left))) {
            $puck_7.TokenStream.croak.call(input, "Can only assign to an identifier");
          };
          $puck_23 = $puck_3.Expression.AssignmentExpression({
            lhs: left,
            token: operator,
            rhs: innerExpression,
          });
        }
        else {
          $puck_23 = $puck_3.Expression.BinaryExpression({
            lhs: left,
            operator: operator,
            rhs: innerExpression,
          });
        };
        const e = $puck_23;
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
      const dotToken = consumeToken($puck_5.SyntaxKind.DotToken);
      const token = $puck_7.TokenStream.peek.call(input);
      let $puck_24 = token;
      let $puck_25;
      if ($puck_24.kind === "NumberLiteral") {
        let {value: index} = $puck_24;
        $puck_7.TokenStream.next.call(input);
        $puck_25 = $puck_3.Expression.TupleIndexAccess({
          object: expression,
          dotToken: dotToken,
          index: index,
        });
      }
      else {
        let $puck_26;
        if ($puck_24.kind === "Identifier") {
          let {value: identifier} = $puck_24;
          $puck_7.TokenStream.next.call(input);
          $puck_26 = $puck_3.Expression.MemberAccess({
            object: expression,
            dotToken: dotToken,
            member: identifier,
          });
        }
        else {
          let $puck_27;
          if (true) {
            $puck_24;
            let $puck_28;
            if (recover) {
              $puck_28 = $puck_3.Expression.MemberAccess({
                object: expression,
                dotToken: dotToken,
                member: {
                name: "",
                span: $puck_4.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/token.puck:Token"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/token.puck:Token', value: token, $isTraitObject: true}),
              },
              });
            }
            else {
              $puck_7.TokenStream.next.call(input);
              $puck_28 = $puck_7.TokenStream.croak.call(input, "Expected number or identifier, " + butGot());
            };
            $puck_27 = $puck_28;
          };
          $puck_26 = $puck_27;
        };
        $puck_25 = $puck_26;
      };
      return maybeAccess($puck_25);
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
  function maybeRangeLiteral(expression) {
    if (isToken($puck_5.SyntaxKind.DotDotToken)) {
      const dotDotToken = consumeToken($puck_5.SyntaxKind.DotDotToken);
      const end = parseExpression();
      return $puck_3.Expression.RangeLiteral({
        start: expression,
        dotDotToken: dotDotToken,
        end: end,
      });
    }
    else {
      return expression;
    };
  };
  function onlyDelimited(separator, parser) {
    let parts = [];
    let first = true;
    while ((!$puck_7.TokenStream.eof.call(input))) {
      if (first) {
        first = false;
      }
      else {
        if (isToken(separator)) {
          consumeSeparator(separator);
        }
        else {
          break        };
      };
      $puck_1.List.push.call(parts, $unwrapTraitObject(parser()));
    };
    return parts;
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
      let $puck_29 = statement;
      if ($puck_29.kind === "ExportDirective") {
        let {value: e} = $puck_29;
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
    let $puck_30 = $puck_7.TokenStream.peek.call(input);
    if ($puck_30.kind === "SimpleToken") {
      let {value: token} = $puck_30;
      let $puck_31 = token.kind;
      if ($puck_31.kind === "HashToken") {
        $puck_31;
        return parseDeclarationWithAttribute();
      }
      else {
        if ($puck_31.kind === "EnumKeyword") {
          $puck_31;
          return $puck_3.TopLevelStatement.EnumDeclaration(parseEnumDeclaration());
        }
        else {
          if ($puck_31.kind === "ExportKeyword") {
            $puck_31;
            return $puck_3.TopLevelStatement.ExportDirective(parseExport());
          }
          else {
            if ($puck_31.kind === "ImplKeyword") {
              $puck_31;
              return parseImplDeclaration();
            }
            else {
              if ($puck_31.kind === "ImportKeyword") {
                $puck_31;
                return $puck_3.TopLevelStatement.ImportDirective(parseImport());
              }
              else {
                if ($puck_31.kind === "TraitKeyword") {
                  $puck_31;
                  return $puck_3.TopLevelStatement.TraitDeclaration(parseTraitDeclaration());
                }
                else {
                  if ($puck_31.kind === "TypeKeyword") {
                    $puck_31;
                    return $puck_3.TopLevelStatement.TypeDeclaration(parseTypeDeclaration());
                  }
                  else {
                    if (true) {
                      $puck_31;
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
        $puck_30;
        return $puck_3.TopLevelStatement.BlockLevelStatement(parseBlockLevelStatement());
      };
    };
  };
  function parseBlockLevelStatement() {
    let $puck_32 = $puck_7.TokenStream.peek.call(input);
    if (($puck_32.kind === "SimpleToken" && $unwrapTraitObject($unwrapTraitObject($puck_32.value).kind).kind === "BreakKeyword")) {
      let {value: {}} = $puck_32;
      return $puck_3.BlockLevelStatement.BreakStatement({keyword: consumeToken($puck_5.SyntaxKind.BreakKeyword)});
    }
    else {
      if (($puck_32.kind === "SimpleToken" && $unwrapTraitObject($unwrapTraitObject($puck_32.value).kind).kind === "ReturnKeyword")) {
        let {value: {}} = $puck_32;
        return $puck_3.BlockLevelStatement.ReturnStatement({
          keyword: consumeToken($puck_5.SyntaxKind.ReturnKeyword),
          expression: parseExpression(),
        });
      }
      else {
        if (($puck_32.kind === "SimpleToken" && $unwrapTraitObject($unwrapTraitObject($puck_32.value).kind).kind === "ForKeyword")) {
          let {value: {}} = $puck_32;
          return $puck_3.BlockLevelStatement.ForLoop(parseFor());
        }
        else {
          if (($puck_32.kind === "SimpleToken" && $unwrapTraitObject($unwrapTraitObject($puck_32.value).kind).kind === "WhileKeyword")) {
            let {value: {}} = $puck_32;
            return $puck_3.BlockLevelStatement.WhileLoop(parseWhile());
          }
          else {
            if (true) {
              $puck_32;
              return $puck_3.BlockLevelStatement.Expression(parseExpression());
            };
          };
        };
      };
    };
  };
  function parseExpression(precedence = 0, forceTuple = false) {
    return maybeRangeLiteral(maybeCall(maybeAccess(maybeBinary(parseAtom(forceTuple), precedence))));
  };
  function parseAtom(forceTuple = false) {
    let $puck_33 = $puck_7.TokenStream.peek.call(input);
    let $puck_34;
    if ($puck_33.kind === "SimpleToken") {
      let {value: token} = $puck_33;
      let $puck_35 = token.kind;
      let $puck_36;
      if ($puck_35.kind === "OpenParenToken") {
        $puck_35;
        $puck_36 = parseTupleOrExpression(forceTuple);
      }
      else {
        let $puck_37;
        if ($puck_35.kind === "OpenBracketToken") {
          $puck_35;
          $puck_37 = $puck_3.Expression.ListLiteral(parseListLiteral());
        }
        else {
          let $puck_38;
          if ($puck_35.kind === "OpenBraceToken") {
            $puck_35;
            $puck_38 = $puck_3.Expression.RecordLiteral(parseRecordLiteral());
          }
          else {
            let $puck_39;
            if ($puck_35.kind === "BarToken") {
              $puck_35;
              $puck_39 = $puck_3.Expression.FunctionDeclaration(parseLambda());
            }
            else {
              let $puck_40;
              if ($puck_35.kind === "IfKeyword") {
                $puck_35;
                $puck_40 = parseIf();
              }
              else {
                let $puck_41;
                if ($puck_35.kind === "MatchKeyword") {
                  $puck_35;
                  $puck_41 = $puck_3.Expression.MatchExpression(parseMatch());
                }
                else {
                  let $puck_42;
                  if ($puck_35.kind === "FnKeyword") {
                    $puck_35;
                    $puck_42 = $puck_3.Expression.FunctionDeclaration(parseFunctionDeclaration());
                  }
                  else {
                    let $puck_43;
                    if ($puck_35.kind === "LetKeyword") {
                      $puck_35;
                      $puck_7.TokenStream.next.call(input);
                      $puck_43 = $puck_3.Expression.VariableDeclaration(parseVariableDeclaration());
                    }
                    else {
                      let $puck_44;
                      if ($puck_35.kind === "NotKeyword") {
                        $puck_35;
                        $puck_44 = $puck_3.Expression.UnaryExpression(parseUnaryExpression());
                      }
                      else {
                        let $puck_45;
                        if ($puck_35.kind === "MinusToken") {
                          $puck_35;
                          $puck_45 = $puck_3.Expression.UnaryExpression(parseUnaryExpression());
                        }
                        else {
                          let $puck_46;
                          if ($puck_35.kind === "PlusToken") {
                            $puck_35;
                            $puck_46 = $puck_3.Expression.UnaryExpression(parseUnaryExpression());
                          }
                          else {
                            let $puck_47;
                            if ($puck_35.kind === "TrueKeyword") {
                              $puck_35;
                              $puck_47 = maybeAccess($puck_3.Expression.BooleanLiteral({
                                keyword: consumeToken($puck_5.SyntaxKind.TrueKeyword),
                                value: true,
                              }));
                            }
                            else {
                              let $puck_48;
                              if ($puck_35.kind === "FalseKeyword") {
                                $puck_35;
                                $puck_48 = maybeAccess($puck_3.Expression.BooleanLiteral({
                                  keyword: consumeToken($puck_5.SyntaxKind.FalseKeyword),
                                  value: false,
                                }));
                              }
                              else {
                                let $puck_49;
                                if (true) {
                                  $puck_35;
                                  let $puck_50;
                                  if (recover) {
                                    $puck_50 = $puck_3.Expression.Identifier(consumeIdentifier());
                                  }
                                  else {
                                    $puck_50 = unexpected();
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
      $puck_34 = $puck_36;
    }
    else {
      let $puck_51;
      if ($puck_33.kind === "NumberLiteral") {
        let {value: numberLiteral} = $puck_33;
        $puck_7.TokenStream.next.call(input);
        $puck_51 = maybeAccess($puck_3.Expression.NumberLiteral(numberLiteral));
      }
      else {
        let $puck_52;
        if ($puck_33.kind === "StringLiteral") {
          let {value: stringLiteral} = $puck_33;
          $puck_7.TokenStream.next.call(input);
          $puck_52 = maybeAccess($puck_3.Expression.StringLiteral(stringLiteral));
        }
        else {
          let $puck_53;
          if ($puck_33.kind === "Identifier") {
            let {value: identifier} = $puck_33;
            $puck_53 = parseIdentifierOrTypePath();
          }
          else {
            let $puck_54;
            if ($puck_33.kind === "Comment") {
              $puck_33;
              $puck_54 = unexpected();
            };
            $puck_53 = $puck_54;
          };
          $puck_52 = $puck_53;
        };
        $puck_51 = $puck_52;
      };
      $puck_34 = $puck_51;
    };
    return maybeCall($puck_34);
  };
  function parseSimpleLiteral() {
    let $puck_55 = $puck_7.TokenStream.next.call(input);
    if ($puck_55.kind === "SimpleToken") {
      let {value: token} = $puck_55;
      let $puck_56 = token.kind;
      if ($puck_56.kind === "TrueKeyword") {
        $puck_56;
        return $puck_3.SimpleLiteral.BooleanLiteral({
          keyword: token,
          value: true,
        });
      }
      else {
        if ($puck_56.kind === "FalseKeyword") {
          $puck_56;
          return $puck_3.SimpleLiteral.BooleanLiteral({
            keyword: token,
            value: false,
          });
        }
        else {
          if (true) {
            $puck_56;
            return unexpected();
          };
        };
      };
    }
    else {
      if ($puck_55.kind === "NumberLiteral") {
        let {value: numberLiteral} = $puck_55;
        return $puck_3.SimpleLiteral.NumberLiteral(numberLiteral);
      }
      else {
        if ($puck_55.kind === "StringLiteral") {
          let {value: stringLiteral} = $puck_55;
          if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: stringLiteral.parts, $isTraitObject: true}) > 1) {
            $puck_7.TokenStream.croak.call(input, "Attributes can only contain simple string literals. Interpolation is not supported.");
          };
          let $puck_57 = $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: stringLiteral.parts, $isTraitObject: true}, 0);
          if ($puck_57.kind === "Literal") {
            let {value: literal} = $puck_57;
            return $puck_3.SimpleLiteral.StringLiteral(literal);
          }
          else {
            if (true) {
              $puck_57;
              return $puck_1.panic("String literal does not start with a literal");
            };
          };
        }
        else {
          if (true) {
            $puck_55;
            return unexpected();
          };
        };
      };
    };
  };
  function parseAttributeArgument() {
    const name = consumeIdentifier();
    const value = $puck_1.Option.map.call(maybeConsumeToken($puck_5.SyntaxKind.EqualsToken), function ($puck_58) {
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
    let $puck_59;
    if ($puck_1.Option.isSome.call(maybeConsumeToken($puck_5.SyntaxKind.EqualsToken))) {
      $puck_59 = $puck_3.AttributeData.Value(parseSimpleLiteral());
    }
    else {
      let $puck_60;
      if (isToken($puck_5.SyntaxKind.OpenParenToken)) {
        $puck_60 = $puck_3.AttributeData.Arguments(delimited($puck_5.SyntaxKind.OpenParenToken, $puck_5.SyntaxKind.CloseParenToken, $puck_5.SyntaxKind.CommaToken, parseAttributeArgument, true));
      }
      else {
        $puck_60 = $puck_3.AttributeData.None;
      };
      $puck_59 = $puck_60;
    };
    const data = $puck_59;
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
    let $puck_61;
    if (isToken($puck_5.SyntaxKind.LessThanToken)) {
      $puck_61 = delimited($puck_5.SyntaxKind.LessThanToken, $puck_5.SyntaxKind.GreaterThanToken, $puck_5.SyntaxKind.CommaToken, parseTypeParameter, true);
    }
    else {
      $puck_61 = [];
    };
    const typeParameters = $puck_61;
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
    let $puck_62;
    if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
      $puck_62 = $puck_1.Some(parseRecordTypeBound());
    }
    else {
      let $puck_63;
      if (isToken($puck_5.SyntaxKind.OpenParenToken)) {
        $puck_63 = $puck_1.Some(parseTupleTypeBound());
      }
      else {
        $puck_63 = $puck_1.None;
      };
      $puck_62 = $puck_63;
    };
    const bound = $puck_62;
    return {
      name: name,
      bound: bound,
    };
  };
  function parseImplDeclaration() {
    const implKeyword = consumeToken($puck_5.SyntaxKind.ImplKeyword);
    let $puck_64;
    if (isToken($puck_5.SyntaxKind.LessThanToken)) {
      $puck_64 = delimited($puck_5.SyntaxKind.LessThanToken, $puck_5.SyntaxKind.GreaterThanToken, $puck_5.SyntaxKind.CommaToken, parseTypeParameter, true);
    }
    else {
      $puck_64 = [];
    };
    const typeParameters = $puck_64;
    const trait_ = parseNamedTypeBound();
    let $puck_65;
    if (isToken($puck_5.SyntaxKind.ForKeyword)) {
      $puck_65 = {
        forKeyword: $puck_1.Some(consumeToken($puck_5.SyntaxKind.ForKeyword)),
        type_: $puck_1.Some(parseNamedTypeBound()),
      };
    }
    else {
      $puck_65 = {
        forKeyword: $puck_1.None,
        type_: $puck_1.None,
      };
    };
    let {forKeyword: forKeyword, type_: type_} = $puck_65;
    const whereClause = maybeWhereClause();
    const openBrace = expect($puck_5.SyntaxKind.OpenBraceToken);
    const members = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].toList.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: delimited($puck_5.SyntaxKind.OpenBraceToken, $puck_5.SyntaxKind.CloseBraceToken, $puck_5.SyntaxKind.SemicolonToken, parseFunctionDeclaration, false), $isTraitObject: true});
    const closeBrace = consumeToken($puck_5.SyntaxKind.CloseBraceToken);
    let $puck_66 = type_;
    if ($puck_66 !== undefined) {
      let type_ = $puck_66;
      return $puck_3.TopLevelStatement.ImplDeclaration({
        implKeyword: implKeyword,
        typeParameters: typeParameters,
        trait_: trait_,
        forKeyword: $puck_1.Option.unwrap.call(forKeyword),
        type_: type_,
        whereClause: whereClause,
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
        whereClause: whereClause,
        openBrace: openBrace,
        members: members,
        closeBrace: closeBrace,
      });
    };
  };
  function parseTraitDeclaration(attributes = []) {
    const keyword = consumeToken($puck_5.SyntaxKind.TraitKeyword);
    const name = consumeIdentifier();
    let $puck_67;
    if (isToken($puck_5.SyntaxKind.LessThanToken)) {
      $puck_67 = delimited($puck_5.SyntaxKind.LessThanToken, $puck_5.SyntaxKind.GreaterThanToken, $puck_5.SyntaxKind.CommaToken, parseTypeParameter, true);
    }
    else {
      $puck_67 = [];
    };
    const typeParameters = $puck_67;
    const traitBound = $puck_1.Option.map.call(maybeConsumeToken($puck_5.SyntaxKind.ColonToken), function (colonToken) {
      return {
        colonToken: colonToken,
        bound: parseTypeBound(),
      };
    });
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
      traitBound: traitBound,
      openBrace: openBrace,
      members: members,
      closeBrace: closeBrace,
    };
  };
  function parseTypeDeclaration(attributes = []) {
    const keyword = consumeToken($puck_5.SyntaxKind.TypeKeyword);
    const name = consumeIdentifier();
    let $puck_68;
    if (isToken($puck_5.SyntaxKind.LessThanToken)) {
      $puck_68 = delimited($puck_5.SyntaxKind.LessThanToken, $puck_5.SyntaxKind.GreaterThanToken, $puck_5.SyntaxKind.CommaToken, parseTypeParameter, true);
    }
    else {
      $puck_68 = [];
    };
    const typeParameters = $puck_68;
    let $puck_69;
    if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
      $puck_69 = $puck_1.Some(parseRecordTypeBound());
    }
    else {
      let $puck_70;
      if (isToken($puck_5.SyntaxKind.OpenParenToken)) {
        $puck_70 = $puck_1.Some(parseTupleTypeBound());
      }
      else {
        $puck_70 = $puck_1.None;
      };
      $puck_69 = $puck_70;
    };
    const bound = $puck_69;
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
              let $puck_71 = functionDeclaration.name;
              if ($puck_71 !== undefined) {
                let name = $puck_71;
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
                let $puck_72 = variableDeclaration.pattern;
                if ($puck_72.kind === "Identifier") {
                  let {value: {identifier: name}} = $puck_72;
                  identifier = name;
                }
                else {
                  $puck_7.TokenStream.croak.call(input, "Can not export a let declaration without a identifier pattern");
                };
              }
              else {
                let $puck_73 = $puck_7.TokenStream.peek.call(input);
                if ($puck_73.kind === "Identifier") {
                  $puck_73;
                  identifier = consumeIdentifier();
                  statement = $puck_3.ExportedStatement.Identifier(identifier);
                }
                else {
                  $puck_7.TokenStream.croak.call(input, "Expected trait, type, function or variable declaration after export");
                };
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
    let $puck_74 = $puck_7.TokenStream.next.call(input);
    let $puck_75;
    if ($puck_74.kind === "StringLiteral") {
      let {value: stringLiteral} = $puck_74;
      $puck_75 = stringLiteral;
    }
    else {
      let $puck_76;
      if (true) {
        $puck_74;
        $puck_76 = $puck_7.TokenStream.croak.call(input, "Expected string, " + butGot());
      };
      $puck_75 = $puck_76;
    };
    const locator = $puck_75;
    if (($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: locator.parts, $isTraitObject: true}) !== 1)) {
      $puck_1.panic("More than one part in import string");
    };
    let $puck_77 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].first.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: locator.parts, $isTraitObject: true});
    let $puck_78;
    if (($puck_77 !== undefined && $puck_77.kind === "Literal")) {
      let {value: {value: value}} = $puck_77;
      $puck_78 = $puck_1.String.split.call(value, ":");
    }
    else {
      let $puck_79;
      if (true) {
        $puck_77;
        $puck_79 = $puck_1.panic("String literal does not start with a literal");
      };
      $puck_78 = $puck_79;
    };
    const parts = $puck_78;
    if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parts, $isTraitObject: true}) > 2) {
      $puck_7.TokenStream.croak.call(input, "Illegal token \":\" used in import path");
    };
    let $puck_80;
    if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parts, $isTraitObject: true}) === 2) {
      $puck_80 = $puck_1.Some($puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: parts, $isTraitObject: true}, 0));
    }
    else {
      $puck_80 = $puck_1.None;
    };
    const domain = $puck_80;
    let $puck_81;
    if ($puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: parts, $isTraitObject: true}) === 2) {
      $puck_81 = $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: parts, $isTraitObject: true}, 1);
    }
    else {
      $puck_81 = $puck_1.Index["$impl_Index$List"].index.call({type: '$impl_Index$List', value: parts, $isTraitObject: true}, 0);
    };
    const path = $puck_81;
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
    let $puck_82;
    if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
      $puck_82 = $puck_3.ImportSpecifier.ObjectDestructure(parseObjectDestructure());
    }
    else {
      let $puck_83;
      if (isToken($puck_5.SyntaxKind.AsteriskToken)) {
        $puck_83 = $puck_3.ImportSpecifier.Asterisk(consumeToken($puck_5.SyntaxKind.AsteriskToken));
      }
      else {
        $puck_83 = $puck_3.ImportSpecifier.Identifier(consumeIdentifier());
      };
      $puck_82 = $puck_83;
    };
    const specifier = $puck_82;
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
    let $puck_84;
    if (isToken($puck_5.SyntaxKind.ColonToken)) {
      $puck_7.TokenStream.next.call(input);
      $puck_84 = consumeIdentifier();
    }
    else {
      $puck_84 = property;
    };
    const local = $puck_84;
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
  function parseFor() {
    const forKeyword = consumeToken($puck_5.SyntaxKind.ForKeyword);
    const pattern = parsePattern();
    const ofKeyword = consumeToken($puck_5.SyntaxKind.OfKeyword);
    const expression = parseExpression();
    const body = parseBlock();
    return {
      forKeyword: forKeyword,
      pattern: pattern,
      ofKeyword: ofKeyword,
      expression: expression,
      body: body,
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
    let $puck_85 = $puck_7.TokenStream.peek.call(input);
    let $puck_86;
    if ($puck_85.kind === "Identifier") {
      let {value: identifier} = $puck_85;
      $puck_7.TokenStream.next.call(input);
      $puck_86 = $puck_1.Some(identifier);
    }
    else {
      let $puck_87;
      if (true) {
        $puck_85;
        $puck_87 = $puck_1.None;
      };
      $puck_86 = $puck_87;
    };
    const name = $puck_86;
    let $puck_88;
    if (isToken($puck_5.SyntaxKind.LessThanToken)) {
      $puck_88 = delimited($puck_5.SyntaxKind.LessThanToken, $puck_5.SyntaxKind.GreaterThanToken, $puck_5.SyntaxKind.CommaToken, parseTypeParameter, true);
    }
    else {
      $puck_88 = [];
    };
    const typeParameters = $puck_88;
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
        type_: $unwrapTraitObject($puck_2._undefined),
      };
    };
    const openParenOrBar = expect($puck_5.SyntaxKind.OpenParenToken);
    const parameterList = delimited($puck_5.SyntaxKind.OpenParenToken, $puck_5.SyntaxKind.CloseParenToken, $puck_5.SyntaxKind.CommaToken, parseVariableDeclaration, false);
    const closeParenOrBar = consumeToken($puck_5.SyntaxKind.CloseParenToken);
    let $puck_89;
    if ($puck_1.Option.isSome.call(maybeConsumeToken($puck_5.SyntaxKind.MinusGreaterThanToken))) {
      $puck_89 = $puck_1.Some(parseTypeBound());
    }
    else {
      $puck_89 = $puck_1.None;
    };
    const returnType = $puck_89;
    let $puck_90;
    if ((recover && !isToken($puck_5.SyntaxKind.OpenBraceToken) && (!optionalBody || $puck_1.Option.isNone.call(returnType)))) {
      $puck_90 = $puck_1.Some(mockBlock());
    }
    else {
      let $puck_91;
      if ((isToken($puck_5.SyntaxKind.OpenBraceToken) || !optionalBody)) {
        $puck_91 = $puck_1.Some(parseBlock());
      }
      else {
        $puck_91 = $puck_1.None;
      };
      $puck_90 = $puck_91;
    };
    const body = $puck_90;
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
    let $puck_92;
    if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
      $puck_92 = $puck_1.Some(parseBlock());
    }
    else {
      $puck_92 = $puck_1.Some({
        openBrace: $puck_1.None,
        statements: [parseBlockLevelStatement()],
        closeBrace: $puck_1.None,
        type_: $unwrapTraitObject($puck_2._undefined),
      });
    };
    const body = $puck_92;
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
      typeBound: $puck_1.Option.map.call(maybeConsumeToken($puck_5.SyntaxKind.ColonToken), function ($puck_93) {
      return parseTypeBound();
    }),
      initializer: $puck_1.Option.map.call(maybeConsumeToken($puck_5.SyntaxKind.EqualsToken), function ($puck_94) {
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
    let $puck_95;
    if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
      $puck_95 = parseBlock();
    }
    else {
      let $puck_96;
      if ((recover && !isToken($puck_5.SyntaxKind.ThenKeyword))) {
        $puck_96 = mockBlock();
      }
      else {
        consumeToken($puck_5.SyntaxKind.ThenKeyword);
        $puck_96 = {
          openBrace: $puck_1.None,
          statements: [parseBlockLevelStatement()],
          closeBrace: $puck_1.None,
          type_: $puck_2._undefined,
        };
      };
      $puck_95 = $puck_96;
    };
    const then_ = $puck_95;
    let $puck_97;
    if (isToken($puck_5.SyntaxKind.ElseKeyword)) {
      $puck_7.TokenStream.next.call(input);
      let $puck_98;
      if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
        $puck_98 = parseBlock();
      }
      else {
        $puck_98 = {
          openBrace: $puck_1.None,
          statements: [parseBlockLevelStatement()],
          closeBrace: $puck_1.None,
          type_: $puck_2._undefined,
        };
      };
      $puck_97 = $puck_1.Some($puck_98);
    }
    else {
      $puck_97 = $puck_1.None;
    };
    return {
      ifKeyword: ifKeyword,
      condition: condition,
      then_: then_,
      else_: $puck_97,
    };
  };
  function parseIfLetExpression(ifKeyword) {
    const letKeyword = consumeToken($puck_5.SyntaxKind.LetKeyword);
    const pattern = parsePattern();
    const equalsToken = consumeToken($puck_5.SyntaxKind.EqualsToken);
    const expression = parseExpression();
    let $puck_99;
    if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
      $puck_99 = parseBlock();
    }
    else {
      let $puck_100;
      if ((recover && !isToken($puck_5.SyntaxKind.ThenKeyword))) {
        $puck_100 = mockBlock();
      }
      else {
        consumeToken($puck_5.SyntaxKind.ThenKeyword);
        $puck_100 = {
          openBrace: $puck_1.None,
          statements: [parseBlockLevelStatement()],
          closeBrace: $puck_1.None,
          type_: $puck_2._undefined,
        };
      };
      $puck_99 = $puck_100;
    };
    const then_ = $puck_99;
    let $puck_101;
    if (isToken($puck_5.SyntaxKind.ElseKeyword)) {
      $puck_7.TokenStream.next.call(input);
      let $puck_102;
      if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
        $puck_102 = parseBlock();
      }
      else {
        $puck_102 = {
          openBrace: $puck_1.None,
          statements: [parseBlockLevelStatement()],
          closeBrace: $puck_1.None,
          type_: $puck_2._undefined,
        };
      };
      $puck_101 = $puck_1.Some($puck_102);
    }
    else {
      $puck_101 = $puck_1.None;
    };
    return {
      ifKeyword: ifKeyword,
      letKeyword: letKeyword,
      pattern: pattern,
      expression: expression,
      then_: then_,
      else_: $puck_101,
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
    let $puck_103;
    if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
      $puck_103 = parseBlock();
    }
    else {
      $puck_103 = {
        openBrace: $puck_1.None,
        statements: [parseBlockLevelStatement()],
        closeBrace: $puck_1.None,
        type_: $puck_2._undefined,
      };
    };
    const block = $puck_103;
    return {
      pattern: pattern,
      arrow: arrow,
      block: block,
    };
  };
  function parseUnaryExpression() {
    let $puck_104 = $puck_7.TokenStream.next.call(input);
    if ($puck_104.kind === "SimpleToken") {
      let {value: operator} = $puck_104;
      let $puck_105 = operator.kind;
      if ($puck_105.kind === "NotKeyword") {
        $puck_105;
        return {
          operator: operator,
          rhs: parseExpression($puck_5.SyntaxKind.precedence.call(operator.kind)),
        };
      }
      else {
        if ($puck_105.kind === "MinusToken") {
          $puck_105;
          return {
            operator: operator,
            rhs: parseExpression($puck_5.SyntaxKind.precedence.call(operator.kind)),
          };
        }
        else {
          if ($puck_105.kind === "PlusToken") {
            $puck_105;
            return {
              operator: operator,
              rhs: parseExpression($puck_5.SyntaxKind.precedence.call(operator.kind)),
            };
          }
          else {
            if (true) {
              $puck_105;
              return unexpected();
            };
          };
        };
      };
    }
    else {
      if (true) {
        $puck_104;
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
    if ($puck_1.Option.isSome.call(maybeConsumeToken($puck_5.SyntaxKind.DotDotDotToken))) {
      return $puck_3.RecordLiteralMember.Spread(parseExpression());
    }
    else {
      const name = consumeIdentifier();
      let $puck_106;
      if (isToken($puck_5.SyntaxKind.ColonToken)) {
        $puck_7.TokenStream.next.call(input);
        $puck_106 = parseExpression();
      }
      else {
        $puck_106 = $puck_3.Expression.Identifier(name);
      };
      const value = $puck_106;
      return $puck_3.RecordLiteralMember.Property({
        name: name,
        value: value,
      });
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
    let $puck_107 = maybeConsumeToken($puck_5.SyntaxKind.UnderscoreToken);
    if ($puck_107 !== undefined) {
      let token = $puck_107;
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
    let $puck_108;
    if ($puck_1.Option.isSome.call(maybeConsumeToken($puck_5.SyntaxKind.ColonToken))) {
      $puck_108 = parsePattern();
    }
    else {
      $puck_108 = $puck_3.Pattern.Identifier({
        identifier: property,
        mutable: false,
      });
    };
    const pattern = $puck_108;
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
    let $puck_109;
    if (isToken($puck_5.SyntaxKind.LessThanToken)) {
      $puck_109 = parseFunctionTypeBound($puck_1.None);
    }
    else {
      let $puck_110;
      if (isToken($puck_5.SyntaxKind.OpenParenToken)) {
        const tuple = parseTupleTypeBound();
        let $puck_111;
        if (isToken($puck_5.SyntaxKind.MinusGreaterThanToken)) {
          $puck_111 = parseFunctionTypeBound($puck_1.Some(tuple));
        }
        else {
          $puck_111 = tuple;
        };
        $puck_110 = $puck_111;
      }
      else {
        let $puck_112;
        if (isToken($puck_5.SyntaxKind.OpenBraceToken)) {
          $puck_112 = parseRecordTypeBound();
        }
        else {
          $puck_112 = $puck_3.TypeBound.NamedTypeBound(parseNamedTypeBound());
        };
        $puck_110 = $puck_112;
      };
      $puck_109 = $puck_110;
    };
    return maybeParseIntersectionTypeBound($puck_109);
  };
  function parseFunctionTypeBound(tuple) {
    let $puck_113;
    if ($puck_1.Option.isNone.call(tuple) && isToken($puck_5.SyntaxKind.LessThanToken)) {
      $puck_113 = delimited($puck_5.SyntaxKind.LessThanToken, $puck_5.SyntaxKind.GreaterThanToken, $puck_5.SyntaxKind.CommaToken, parseTypeParameter, true);
    }
    else {
      $puck_113 = [];
    };
    const typeParameters = $puck_113;
    const parameters = $puck_3.TypeBound.getTupleTypeBound.call($puck_1.Option.unwrapOrElse.call(tuple, parseTupleTypeBound));
    consumeToken($puck_5.SyntaxKind.MinusGreaterThanToken);
    const returnType = parseTypeBound();
    return $puck_3.TypeBound.FunctionTypeBound({
      typeParameters: typeParameters,
      parameters: parameters,
      returnType: returnType,
    });
  };
  function maybeParseIntersectionTypeBound(baseType) {
    while (true) {
      let $puck_114 = maybeConsumeToken($puck_5.SyntaxKind.PlusToken);
      if ($puck_114 !== undefined) {
        let plusToken = $puck_114;
        baseType = $puck_3.TypeBound.IntersectionTypeBound({
          baseType: baseType,
          plusToken: plusToken,
          traitBound: parseNamedTypeBound(),
        });
      }
      else {
        return baseType;
      };
    };
    return baseType;
  };
  function parseNamedTypeBound() {
    const path = parseTypePath($puck_1.None);
    let $puck_115;
    if (isToken($puck_5.SyntaxKind.LessThanToken)) {
      $puck_115 = delimited($puck_5.SyntaxKind.LessThanToken, $puck_5.SyntaxKind.GreaterThanToken, $puck_5.SyntaxKind.CommaToken, parseTypeBound, true);
    }
    else {
      $puck_115 = [];
    };
    const typeParameters = $puck_115;
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
    if ($puck_1.Option.isSome.call(maybeConsumeToken($puck_5.SyntaxKind.DotDotDotToken))) {
      return $puck_3.RecordTypeBoundMember.Spread(parseTypeBound());
    }
    else {
      const name = consumeIdentifier();
      const optional = $puck_1.Option.isSome.call(maybeConsumeToken($puck_5.SyntaxKind.QuestionMarkToken));
      consumeToken($puck_5.SyntaxKind.ColonToken);
      const typeBound = parseTypeBound();
      return $puck_3.RecordTypeBoundMember.Property({
        name: name,
        optional: optional,
        typeBound: typeBound,
      });
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
    let $puck_116;
    if (isToken($puck_5.SyntaxKind.EqualsToken)) {
      $puck_7.TokenStream.next.call(input);
      $puck_116 = $puck_1.Some(parseTypeBound());
    }
    else {
      $puck_116 = $puck_1.None;
    };
    const defaultValue = $puck_116;
    return {
      name: name,
      defaultValue: defaultValue,
    };
  };
  function parseTypeParameterBound() {
    return {
      subType: parseTypeBound(),
      colonToken: consumeToken($puck_5.SyntaxKind.ColonToken),
      superType: parseTypeBound(),
      commaToken: maybeToken($puck_5.SyntaxKind.CommaToken),
    };
  };
  function maybeWhereClause() {
    return $puck_1.Option.map.call(maybeConsumeToken($puck_5.SyntaxKind.WhereKeyword), function (token) {
      return {
        whereKeyword: token,
        bounds: onlyDelimited($puck_5.SyntaxKind.CommaToken, parseTypeParameterBound),
      };
    });
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
