'use strict';
exports.SimpleToken = exports.SyntaxKind = exports.Token = exports.operators = undefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("./ast");
const $puck_3 = require("./span");
var SimpleToken = exports.SimpleToken = (object) => object;
var SyntaxKind = exports.SyntaxKind = {
AndKeyword: {kind: 'AndKeyword', value: Symbol('AndKeyword')},
AsKeyword: {kind: 'AsKeyword', value: Symbol('AsKeyword')},
BreakKeyword: {kind: 'BreakKeyword', value: Symbol('BreakKeyword')},
ElseKeyword: {kind: 'ElseKeyword', value: Symbol('ElseKeyword')},
EnumKeyword: {kind: 'EnumKeyword', value: Symbol('EnumKeyword')},
ExportKeyword: {kind: 'ExportKeyword', value: Symbol('ExportKeyword')},
FalseKeyword: {kind: 'FalseKeyword', value: Symbol('FalseKeyword')},
FnKeyword: {kind: 'FnKeyword', value: Symbol('FnKeyword')},
ForKeyword: {kind: 'ForKeyword', value: Symbol('ForKeyword')},
IfKeyword: {kind: 'IfKeyword', value: Symbol('IfKeyword')},
ImplKeyword: {kind: 'ImplKeyword', value: Symbol('ImplKeyword')},
ImportKeyword: {kind: 'ImportKeyword', value: Symbol('ImportKeyword')},
LetKeyword: {kind: 'LetKeyword', value: Symbol('LetKeyword')},
MutKeyword: {kind: 'MutKeyword', value: Symbol('MutKeyword')},
MatchKeyword: {kind: 'MatchKeyword', value: Symbol('MatchKeyword')},
NotKeyword: {kind: 'NotKeyword', value: Symbol('NotKeyword')},
OfKeyword: {kind: 'OfKeyword', value: Symbol('OfKeyword')},
OrKeyword: {kind: 'OrKeyword', value: Symbol('OrKeyword')},
ReturnKeyword: {kind: 'ReturnKeyword', value: Symbol('ReturnKeyword')},
ThenKeyword: {kind: 'ThenKeyword', value: Symbol('ThenKeyword')},
TraitKeyword: {kind: 'TraitKeyword', value: Symbol('TraitKeyword')},
TrueKeyword: {kind: 'TrueKeyword', value: Symbol('TrueKeyword')},
TypeKeyword: {kind: 'TypeKeyword', value: Symbol('TypeKeyword')},
WhereKeyword: {kind: 'WhereKeyword', value: Symbol('WhereKeyword')},
WhileKeyword: {kind: 'WhileKeyword', value: Symbol('WhileKeyword')},
OpenBraceToken: {kind: 'OpenBraceToken', value: Symbol('OpenBraceToken')},
CloseBraceToken: {kind: 'CloseBraceToken', value: Symbol('CloseBraceToken')},
OpenBracketToken: {kind: 'OpenBracketToken', value: Symbol('OpenBracketToken')},
CloseBracketToken: {kind: 'CloseBracketToken', value: Symbol('CloseBracketToken')},
OpenParenToken: {kind: 'OpenParenToken', value: Symbol('OpenParenToken')},
CloseParenToken: {kind: 'CloseParenToken', value: Symbol('CloseParenToken')},
AsteriskAsteriskEqualsToken: {kind: 'AsteriskAsteriskEqualsToken', value: Symbol('AsteriskAsteriskEqualsToken')},
AsteriskAsteriskToken: {kind: 'AsteriskAsteriskToken', value: Symbol('AsteriskAsteriskToken')},
AsteriskEqualsToken: {kind: 'AsteriskEqualsToken', value: Symbol('AsteriskEqualsToken')},
AsteriskToken: {kind: 'AsteriskToken', value: Symbol('AsteriskToken')},
BarToken: {kind: 'BarToken', value: Symbol('BarToken')},
ColonToken: {kind: 'ColonToken', value: Symbol('ColonToken')},
ColonColonToken: {kind: 'ColonColonToken', value: Symbol('ColonColonToken')},
ColonColonLessThanToken: {kind: 'ColonColonLessThanToken', value: Symbol('ColonColonLessThanToken')},
CommaToken: {kind: 'CommaToken', value: Symbol('CommaToken')},
DotToken: {kind: 'DotToken', value: Symbol('DotToken')},
DotDotToken: {kind: 'DotDotToken', value: Symbol('DotDotToken')},
DotDotDotToken: {kind: 'DotDotDotToken', value: Symbol('DotDotDotToken')},
EqualsEqualsToken: {kind: 'EqualsEqualsToken', value: Symbol('EqualsEqualsToken')},
EqualsGreaterThanToken: {kind: 'EqualsGreaterThanToken', value: Symbol('EqualsGreaterThanToken')},
EqualsToken: {kind: 'EqualsToken', value: Symbol('EqualsToken')},
ExclamationEqualsToken: {kind: 'ExclamationEqualsToken', value: Symbol('ExclamationEqualsToken')},
GreaterThanEqualsToken: {kind: 'GreaterThanEqualsToken', value: Symbol('GreaterThanEqualsToken')},
GreaterThanToken: {kind: 'GreaterThanToken', value: Symbol('GreaterThanToken')},
HashToken: {kind: 'HashToken', value: Symbol('HashToken')},
LessThanEqualsToken: {kind: 'LessThanEqualsToken', value: Symbol('LessThanEqualsToken')},
LessThanToken: {kind: 'LessThanToken', value: Symbol('LessThanToken')},
MinusEqualsToken: {kind: 'MinusEqualsToken', value: Symbol('MinusEqualsToken')},
MinusGreaterThanToken: {kind: 'MinusGreaterThanToken', value: Symbol('MinusGreaterThanToken')},
MinusToken: {kind: 'MinusToken', value: Symbol('MinusToken')},
PercentEqualsToken: {kind: 'PercentEqualsToken', value: Symbol('PercentEqualsToken')},
PercentToken: {kind: 'PercentToken', value: Symbol('PercentToken')},
PlusEqualsToken: {kind: 'PlusEqualsToken', value: Symbol('PlusEqualsToken')},
PlusToken: {kind: 'PlusToken', value: Symbol('PlusToken')},
PlusPlusToken: {kind: 'PlusPlusToken', value: Symbol('PlusPlusToken')},
QuestionMarkToken: {kind: 'QuestionMarkToken', value: Symbol('QuestionMarkToken')},
SemicolonToken: {kind: 'SemicolonToken', value: Symbol('SemicolonToken')},
SlashEqualsToken: {kind: 'SlashEqualsToken', value: Symbol('SlashEqualsToken')},
SlashToken: {kind: 'SlashToken', value: Symbol('SlashToken')},
UnderscoreToken: {kind: 'UnderscoreToken', value: Symbol('UnderscoreToken')},
NewlineToken: {kind: 'NewlineToken', value: Symbol('NewlineToken')},
EndOfFileToken: {kind: 'EndOfFileToken', value: Symbol('EndOfFileToken')},
};
var Token = exports.Token = {
SimpleToken: (member) => ({kind: 'SimpleToken', value: member}),
Comment: (member) => ({kind: 'Comment', value: member}),
Identifier: (member) => ({kind: 'Identifier', value: member}),
NumberLiteral: (member) => ({kind: 'NumberLiteral', value: member}),
StringLiteral: (member) => ({kind: 'StringLiteral', value: member}),
};
$puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/token.puck:Token"] = {
span: function () {
  const self = this;
  let $puck_4 = self;
  if ($puck_4.value.kind === "SimpleToken") {
    let {value: {span: span}} = $puck_4.value;
    return span;
  }
  else {
    if ($puck_4.value.kind === "Comment") {
      let {value: {span: span}} = $puck_4.value;
      return span;
    }
    else {
      if ($puck_4.value.kind === "Identifier") {
        let {value: {span: span}} = $puck_4.value;
        return span;
      }
      else {
        if ($puck_4.value.kind === "NumberLiteral") {
          let {value: {span: span}} = $puck_4.value;
          return span;
        }
        else {
          if ($puck_4.value.kind === "StringLiteral") {
            let {value: string} = $puck_4.value;
            return $puck_3.ToSpan["$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral"].span.call({type: '$impl_lib/ast/span.puck:ToSpan$lib/ast/ast.puck:StringLiteral', value: string, $isTraitObject: true});
          };
        };
      };
    };
  };
},
start: $puck_3.ToSpan.start,
end: $puck_3.ToSpan.end
};
Token.name = function () {
  const self = this;
  let $puck_5 = self;
  if ($puck_5.kind === "SimpleToken") {
    let {value: token} = $puck_5;
    return SyntaxKind.name.call(token.kind);
  }
  else {
    if ($puck_5.kind === "Comment") {
      $puck_5;
      return "comment";
    }
    else {
      if ($puck_5.kind === "Identifier") {
        let {value: {name: name}} = $puck_5;
        return "identifier \"" + name + "\"";
      }
      else {
        if ($puck_5.kind === "NumberLiteral") {
          $puck_5;
          return "number";
        }
        else {
          if ($puck_5.kind === "StringLiteral") {
            $puck_5;
            return "string";
          };
        };
      };
    };
  };
};
SyntaxKind.fromText = function (text) {
  if (text === "and") {
    return $puck_1.Some(SyntaxKind.AndKeyword);
  }
  else {
    if (text === "break") {
      return $puck_1.Some(SyntaxKind.BreakKeyword);
    }
    else {
      if (text === "else") {
        return $puck_1.Some(SyntaxKind.ElseKeyword);
      }
      else {
        if (text === "enum") {
          return $puck_1.Some(SyntaxKind.EnumKeyword);
        }
        else {
          if (text === "export") {
            return $puck_1.Some(SyntaxKind.ExportKeyword);
          }
          else {
            if (text === "false") {
              return $puck_1.Some(SyntaxKind.FalseKeyword);
            }
            else {
              if (text === "for") {
                return $puck_1.Some(SyntaxKind.ForKeyword);
              }
              else {
                if (text === "fn") {
                  return $puck_1.Some(SyntaxKind.FnKeyword);
                }
                else {
                  if (text === "if") {
                    return $puck_1.Some(SyntaxKind.IfKeyword);
                  }
                  else {
                    if (text === "impl") {
                      return $puck_1.Some(SyntaxKind.ImplKeyword);
                    }
                    else {
                      if (text === "import") {
                        return $puck_1.Some(SyntaxKind.ImportKeyword);
                      }
                      else {
                        if (text === "let") {
                          return $puck_1.Some(SyntaxKind.LetKeyword);
                        }
                        else {
                          if (text === "match") {
                            return $puck_1.Some(SyntaxKind.MatchKeyword);
                          }
                          else {
                            if (text === "mut") {
                              return $puck_1.Some(SyntaxKind.MutKeyword);
                            }
                            else {
                              if (text === "not") {
                                return $puck_1.Some(SyntaxKind.NotKeyword);
                              }
                              else {
                                if (text === "of") {
                                  return $puck_1.Some(SyntaxKind.OfKeyword);
                                }
                                else {
                                  if (text === "or") {
                                    return $puck_1.Some(SyntaxKind.OrKeyword);
                                  }
                                  else {
                                    if (text === "return") {
                                      return $puck_1.Some(SyntaxKind.ReturnKeyword);
                                    }
                                    else {
                                      if (text === "true") {
                                        return $puck_1.Some(SyntaxKind.TrueKeyword);
                                      }
                                      else {
                                        if (text === "then") {
                                          return $puck_1.Some(SyntaxKind.ThenKeyword);
                                        }
                                        else {
                                          if (text === "trait") {
                                            return $puck_1.Some(SyntaxKind.TraitKeyword);
                                          }
                                          else {
                                            if (text === "type") {
                                              return $puck_1.Some(SyntaxKind.TypeKeyword);
                                            }
                                            else {
                                              if (text === "where") {
                                                return $puck_1.Some(SyntaxKind.WhereKeyword);
                                              }
                                              else {
                                                if (text === "while") {
                                                  return $puck_1.Some(SyntaxKind.WhileKeyword);
                                                }
                                                else {
                                                  if (text === "{") {
                                                    return $puck_1.Some(SyntaxKind.OpenBraceToken);
                                                  }
                                                  else {
                                                    if (text === "}") {
                                                      return $puck_1.Some(SyntaxKind.CloseBraceToken);
                                                    }
                                                    else {
                                                      if (text === "[") {
                                                        return $puck_1.Some(SyntaxKind.OpenBracketToken);
                                                      }
                                                      else {
                                                        if (text === "]") {
                                                          return $puck_1.Some(SyntaxKind.CloseBracketToken);
                                                        }
                                                        else {
                                                          if (text === "(") {
                                                            return $puck_1.Some(SyntaxKind.OpenParenToken);
                                                          }
                                                          else {
                                                            if (text === ")") {
                                                              return $puck_1.Some(SyntaxKind.CloseParenToken);
                                                            }
                                                            else {
                                                              if (text === "|") {
                                                                return $puck_1.Some(SyntaxKind.BarToken);
                                                              }
                                                              else {
                                                                if (text === ",") {
                                                                  return $puck_1.Some(SyntaxKind.CommaToken);
                                                                }
                                                                else {
                                                                  if (text === ":") {
                                                                    return $puck_1.Some(SyntaxKind.ColonToken);
                                                                  }
                                                                  else {
                                                                    if (text === "::") {
                                                                      return $puck_1.Some(SyntaxKind.ColonColonToken);
                                                                    }
                                                                    else {
                                                                      if (text === "::<") {
                                                                        return $puck_1.Some(SyntaxKind.ColonColonLessThanToken);
                                                                      }
                                                                      else {
                                                                        if (text === ".") {
                                                                          return $puck_1.Some(SyntaxKind.DotToken);
                                                                        }
                                                                        else {
                                                                          if (text === "..") {
                                                                            return $puck_1.Some(SyntaxKind.DotDotToken);
                                                                          }
                                                                          else {
                                                                            if (text === "...") {
                                                                              return $puck_1.Some(SyntaxKind.DotDotDotToken);
                                                                            }
                                                                            else {
                                                                              if (text === "?") {
                                                                                return $puck_1.Some(SyntaxKind.QuestionMarkToken);
                                                                              }
                                                                              else {
                                                                                if (text === "#") {
                                                                                  return $puck_1.Some(SyntaxKind.HashToken);
                                                                                }
                                                                                else {
                                                                                  if (text === ";") {
                                                                                    return $puck_1.Some(SyntaxKind.SemicolonToken);
                                                                                  }
                                                                                  else {
                                                                                    if (text === "_") {
                                                                                      return $puck_1.Some(SyntaxKind.UnderscoreToken);
                                                                                    }
                                                                                    else {
                                                                                      if (text === "<") {
                                                                                        return $puck_1.Some(SyntaxKind.LessThanToken);
                                                                                      }
                                                                                      else {
                                                                                        if (text === ">") {
                                                                                          return $puck_1.Some(SyntaxKind.GreaterThanToken);
                                                                                        }
                                                                                        else {
                                                                                          if (text === "<=") {
                                                                                            return $puck_1.Some(SyntaxKind.LessThanEqualsToken);
                                                                                          }
                                                                                          else {
                                                                                            if (text === ">=") {
                                                                                              return $puck_1.Some(SyntaxKind.GreaterThanEqualsToken);
                                                                                            }
                                                                                            else {
                                                                                              if (text === "==") {
                                                                                                return $puck_1.Some(SyntaxKind.EqualsEqualsToken);
                                                                                              }
                                                                                              else {
                                                                                                if (text === "!=") {
                                                                                                  return $puck_1.Some(SyntaxKind.ExclamationEqualsToken);
                                                                                                }
                                                                                                else {
                                                                                                  if (text === "=>") {
                                                                                                    return $puck_1.Some(SyntaxKind.EqualsGreaterThanToken);
                                                                                                  }
                                                                                                  else {
                                                                                                    if (text === "->") {
                                                                                                      return $puck_1.Some(SyntaxKind.MinusGreaterThanToken);
                                                                                                    }
                                                                                                    else {
                                                                                                      if (text === "+") {
                                                                                                        return $puck_1.Some(SyntaxKind.PlusToken);
                                                                                                      }
                                                                                                      else {
                                                                                                        if (text === "++") {
                                                                                                          return $puck_1.Some(SyntaxKind.PlusPlusToken);
                                                                                                        }
                                                                                                        else {
                                                                                                          if (text === "-") {
                                                                                                            return $puck_1.Some(SyntaxKind.MinusToken);
                                                                                                          }
                                                                                                          else {
                                                                                                            if (text === "*") {
                                                                                                              return $puck_1.Some(SyntaxKind.AsteriskToken);
                                                                                                            }
                                                                                                            else {
                                                                                                              if (text === "**") {
                                                                                                                return $puck_1.Some(SyntaxKind.AsteriskAsteriskToken);
                                                                                                              }
                                                                                                              else {
                                                                                                                if (text === "/") {
                                                                                                                  return $puck_1.Some(SyntaxKind.SlashToken);
                                                                                                                }
                                                                                                                else {
                                                                                                                  if (text === "%") {
                                                                                                                    return $puck_1.Some(SyntaxKind.PercentToken);
                                                                                                                  }
                                                                                                                  else {
                                                                                                                    if (text === "=") {
                                                                                                                      return $puck_1.Some(SyntaxKind.EqualsToken);
                                                                                                                    }
                                                                                                                    else {
                                                                                                                      if (text === "+=") {
                                                                                                                        return $puck_1.Some(SyntaxKind.PlusEqualsToken);
                                                                                                                      }
                                                                                                                      else {
                                                                                                                        if (text === "-=") {
                                                                                                                          return $puck_1.Some(SyntaxKind.MinusEqualsToken);
                                                                                                                        }
                                                                                                                        else {
                                                                                                                          if (text === "*=") {
                                                                                                                            return $puck_1.Some(SyntaxKind.AsteriskEqualsToken);
                                                                                                                          }
                                                                                                                          else {
                                                                                                                            if (text === "**=") {
                                                                                                                              return $puck_1.Some(SyntaxKind.AsteriskAsteriskEqualsToken);
                                                                                                                            }
                                                                                                                            else {
                                                                                                                              if (text === "/=") {
                                                                                                                                return $puck_1.Some(SyntaxKind.SlashEqualsToken);
                                                                                                                              }
                                                                                                                              else {
                                                                                                                                if (text === "%=") {
                                                                                                                                  return $puck_1.Some(SyntaxKind.PercentEqualsToken);
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
SyntaxKind.name = function () {
  const self = this;
  let $puck_6 = self;
  if ($puck_6.kind === "AsKeyword") {
    $puck_6;
    return "as";
  }
  else {
    if ($puck_6.kind === "AndKeyword") {
      $puck_6;
      return "and";
    }
    else {
      if ($puck_6.kind === "BreakKeyword") {
        $puck_6;
        return "break";
      }
      else {
        if ($puck_6.kind === "ElseKeyword") {
          $puck_6;
          return "else";
        }
        else {
          if ($puck_6.kind === "EnumKeyword") {
            $puck_6;
            return "enum";
          }
          else {
            if ($puck_6.kind === "ExportKeyword") {
              $puck_6;
              return "export";
            }
            else {
              if ($puck_6.kind === "FalseKeyword") {
                $puck_6;
                return "false";
              }
              else {
                if ($puck_6.kind === "ForKeyword") {
                  $puck_6;
                  return "for";
                }
                else {
                  if ($puck_6.kind === "FnKeyword") {
                    $puck_6;
                    return "fn";
                  }
                  else {
                    if ($puck_6.kind === "IfKeyword") {
                      $puck_6;
                      return "if";
                    }
                    else {
                      if ($puck_6.kind === "ImplKeyword") {
                        $puck_6;
                        return "impl";
                      }
                      else {
                        if ($puck_6.kind === "ImportKeyword") {
                          $puck_6;
                          return "import";
                        }
                        else {
                          if ($puck_6.kind === "LetKeyword") {
                            $puck_6;
                            return "let";
                          }
                          else {
                            if ($puck_6.kind === "MatchKeyword") {
                              $puck_6;
                              return "match";
                            }
                            else {
                              if ($puck_6.kind === "MutKeyword") {
                                $puck_6;
                                return "mut";
                              }
                              else {
                                if ($puck_6.kind === "NotKeyword") {
                                  $puck_6;
                                  return "not";
                                }
                                else {
                                  if ($puck_6.kind === "OfKeyword") {
                                    $puck_6;
                                    return "of";
                                  }
                                  else {
                                    if ($puck_6.kind === "OrKeyword") {
                                      $puck_6;
                                      return "or";
                                    }
                                    else {
                                      if ($puck_6.kind === "ReturnKeyword") {
                                        $puck_6;
                                        return "return";
                                      }
                                      else {
                                        if ($puck_6.kind === "TrueKeyword") {
                                          $puck_6;
                                          return "true";
                                        }
                                        else {
                                          if ($puck_6.kind === "ThenKeyword") {
                                            $puck_6;
                                            return "then";
                                          }
                                          else {
                                            if ($puck_6.kind === "TraitKeyword") {
                                              $puck_6;
                                              return "trait";
                                            }
                                            else {
                                              if ($puck_6.kind === "TypeKeyword") {
                                                $puck_6;
                                                return "type";
                                              }
                                              else {
                                                if ($puck_6.kind === "WhereKeyword") {
                                                  $puck_6;
                                                  return "where";
                                                }
                                                else {
                                                  if ($puck_6.kind === "WhileKeyword") {
                                                    $puck_6;
                                                    return "while";
                                                  }
                                                  else {
                                                    if ($puck_6.kind === "OpenBraceToken") {
                                                      $puck_6;
                                                      return "{";
                                                    }
                                                    else {
                                                      if ($puck_6.kind === "CloseBraceToken") {
                                                        $puck_6;
                                                        return "}";
                                                      }
                                                      else {
                                                        if ($puck_6.kind === "OpenBracketToken") {
                                                          $puck_6;
                                                          return "[";
                                                        }
                                                        else {
                                                          if ($puck_6.kind === "CloseBracketToken") {
                                                            $puck_6;
                                                            return "]";
                                                          }
                                                          else {
                                                            if ($puck_6.kind === "OpenParenToken") {
                                                              $puck_6;
                                                              return "(";
                                                            }
                                                            else {
                                                              if ($puck_6.kind === "CloseParenToken") {
                                                                $puck_6;
                                                                return ")";
                                                              }
                                                              else {
                                                                if ($puck_6.kind === "BarToken") {
                                                                  $puck_6;
                                                                  return "|";
                                                                }
                                                                else {
                                                                  if ($puck_6.kind === "CommaToken") {
                                                                    $puck_6;
                                                                    return ",";
                                                                  }
                                                                  else {
                                                                    if ($puck_6.kind === "ColonToken") {
                                                                      $puck_6;
                                                                      return ":";
                                                                    }
                                                                    else {
                                                                      if ($puck_6.kind === "ColonColonToken") {
                                                                        $puck_6;
                                                                        return "::";
                                                                      }
                                                                      else {
                                                                        if ($puck_6.kind === "ColonColonLessThanToken") {
                                                                          $puck_6;
                                                                          return "::<";
                                                                        }
                                                                        else {
                                                                          if ($puck_6.kind === "DotToken") {
                                                                            $puck_6;
                                                                            return ".";
                                                                          }
                                                                          else {
                                                                            if ($puck_6.kind === "DotDotToken") {
                                                                              $puck_6;
                                                                              return "..";
                                                                            }
                                                                            else {
                                                                              if ($puck_6.kind === "DotDotDotToken") {
                                                                                $puck_6;
                                                                                return "...";
                                                                              }
                                                                              else {
                                                                                if ($puck_6.kind === "QuestionMarkToken") {
                                                                                  $puck_6;
                                                                                  return "?";
                                                                                }
                                                                                else {
                                                                                  if ($puck_6.kind === "HashToken") {
                                                                                    $puck_6;
                                                                                    return "#";
                                                                                  }
                                                                                  else {
                                                                                    if ($puck_6.kind === "SemicolonToken") {
                                                                                      $puck_6;
                                                                                      return ";";
                                                                                    }
                                                                                    else {
                                                                                      if ($puck_6.kind === "UnderscoreToken") {
                                                                                        $puck_6;
                                                                                        return "_";
                                                                                      }
                                                                                      else {
                                                                                        if ($puck_6.kind === "LessThanToken") {
                                                                                          $puck_6;
                                                                                          return "<";
                                                                                        }
                                                                                        else {
                                                                                          if ($puck_6.kind === "GreaterThanToken") {
                                                                                            $puck_6;
                                                                                            return ">";
                                                                                          }
                                                                                          else {
                                                                                            if ($puck_6.kind === "LessThanEqualsToken") {
                                                                                              $puck_6;
                                                                                              return "<=";
                                                                                            }
                                                                                            else {
                                                                                              if ($puck_6.kind === "GreaterThanEqualsToken") {
                                                                                                $puck_6;
                                                                                                return ">=";
                                                                                              }
                                                                                              else {
                                                                                                if ($puck_6.kind === "EqualsEqualsToken") {
                                                                                                  $puck_6;
                                                                                                  return "==";
                                                                                                }
                                                                                                else {
                                                                                                  if ($puck_6.kind === "ExclamationEqualsToken") {
                                                                                                    $puck_6;
                                                                                                    return "!=";
                                                                                                  }
                                                                                                  else {
                                                                                                    if ($puck_6.kind === "EqualsGreaterThanToken") {
                                                                                                      $puck_6;
                                                                                                      return "=>";
                                                                                                    }
                                                                                                    else {
                                                                                                      if ($puck_6.kind === "MinusGreaterThanToken") {
                                                                                                        $puck_6;
                                                                                                        return "->";
                                                                                                      }
                                                                                                      else {
                                                                                                        if ($puck_6.kind === "PlusToken") {
                                                                                                          $puck_6;
                                                                                                          return "+";
                                                                                                        }
                                                                                                        else {
                                                                                                          if ($puck_6.kind === "PlusPlusToken") {
                                                                                                            $puck_6;
                                                                                                            return "++";
                                                                                                          }
                                                                                                          else {
                                                                                                            if ($puck_6.kind === "MinusToken") {
                                                                                                              $puck_6;
                                                                                                              return "-";
                                                                                                            }
                                                                                                            else {
                                                                                                              if ($puck_6.kind === "AsteriskToken") {
                                                                                                                $puck_6;
                                                                                                                return "*";
                                                                                                              }
                                                                                                              else {
                                                                                                                if ($puck_6.kind === "AsteriskAsteriskToken") {
                                                                                                                  $puck_6;
                                                                                                                  return "**";
                                                                                                                }
                                                                                                                else {
                                                                                                                  if ($puck_6.kind === "SlashToken") {
                                                                                                                    $puck_6;
                                                                                                                    return "/";
                                                                                                                  }
                                                                                                                  else {
                                                                                                                    if ($puck_6.kind === "PercentToken") {
                                                                                                                      $puck_6;
                                                                                                                      return "%";
                                                                                                                    }
                                                                                                                    else {
                                                                                                                      if ($puck_6.kind === "EqualsToken") {
                                                                                                                        $puck_6;
                                                                                                                        return "=";
                                                                                                                      }
                                                                                                                      else {
                                                                                                                        if ($puck_6.kind === "PlusEqualsToken") {
                                                                                                                          $puck_6;
                                                                                                                          return "+=";
                                                                                                                        }
                                                                                                                        else {
                                                                                                                          if ($puck_6.kind === "MinusEqualsToken") {
                                                                                                                            $puck_6;
                                                                                                                            return "-=";
                                                                                                                          }
                                                                                                                          else {
                                                                                                                            if ($puck_6.kind === "AsteriskEqualsToken") {
                                                                                                                              $puck_6;
                                                                                                                              return "*=";
                                                                                                                            }
                                                                                                                            else {
                                                                                                                              if ($puck_6.kind === "AsteriskAsteriskEqualsToken") {
                                                                                                                                $puck_6;
                                                                                                                                return "**=";
                                                                                                                              }
                                                                                                                              else {
                                                                                                                                if ($puck_6.kind === "SlashEqualsToken") {
                                                                                                                                  $puck_6;
                                                                                                                                  return "/=";
                                                                                                                                }
                                                                                                                                else {
                                                                                                                                  if ($puck_6.kind === "PercentEqualsToken") {
                                                                                                                                    $puck_6;
                                                                                                                                    return "%=";
                                                                                                                                  }
                                                                                                                                  else {
                                                                                                                                    if ($puck_6.kind === "NewlineToken") {
                                                                                                                                      $puck_6;
                                                                                                                                      return "new line";
                                                                                                                                    }
                                                                                                                                    else {
                                                                                                                                      if ($puck_6.kind === "EndOfFileToken") {
                                                                                                                                        $puck_6;
                                                                                                                                        return "end of file";
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
SyntaxKind.precedence = function () {
  const self = this;
  let $puck_7 = self;
  if ($puck_7.kind === "EqualsToken") {
    $puck_7;
    return 1;
  }
  else {
    if ($puck_7.kind === "PlusEqualsToken") {
      $puck_7;
      return 1.1;
    }
    else {
      if ($puck_7.kind === "MinusEqualsToken") {
        $puck_7;
        return 1.1;
      }
      else {
        if ($puck_7.kind === "OrKeyword") {
          $puck_7;
          return 2;
        }
        else {
          if ($puck_7.kind === "AndKeyword") {
            $puck_7;
            return 3;
          }
          else {
            if ($puck_7.kind === "NotKeyword") {
              $puck_7;
              return 4;
            }
            else {
              if ($puck_7.kind === "EqualsEqualsToken") {
                $puck_7;
                return 7;
              }
              else {
                if ($puck_7.kind === "ExclamationEqualsToken") {
                  $puck_7;
                  return 7;
                }
                else {
                  if ($puck_7.kind === "GreaterThanToken") {
                    $puck_7;
                    return 7;
                  }
                  else {
                    if ($puck_7.kind === "GreaterThanEqualsToken") {
                      $puck_7;
                      return 7;
                    }
                    else {
                      if ($puck_7.kind === "LessThanToken") {
                        $puck_7;
                        return 7;
                      }
                      else {
                        if ($puck_7.kind === "LessThanEqualsToken") {
                          $puck_7;
                          return 7;
                        }
                        else {
                          if ($puck_7.kind === "PlusPlusToken") {
                            $puck_7;
                            return 9;
                          }
                          else {
                            if ($puck_7.kind === "PlusToken") {
                              $puck_7;
                              return 10;
                            }
                            else {
                              if ($puck_7.kind === "MinusToken") {
                                $puck_7;
                                return 10;
                              }
                              else {
                                if ($puck_7.kind === "AsteriskToken") {
                                  $puck_7;
                                  return 20;
                                }
                                else {
                                  if ($puck_7.kind === "SlashToken") {
                                    $puck_7;
                                    return 20;
                                  }
                                  else {
                                    if ($puck_7.kind === "PercentToken") {
                                      $puck_7;
                                      return 20;
                                    }
                                    else {
                                      if ($puck_7.kind === "AsteriskAsteriskToken") {
                                        $puck_7;
                                        return 25;
                                      }
                                      else {
                                        if (true) {
                                          $puck_7;
                                          return $puck_1.panic("no precedence for " + SyntaxKind.name.call(self));
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
    };
  };
};
var operators = exports.operators = [
  ",",
  ";",
  ":",
  "::",
  ".",
  "_",
  "|",
  "{",
  "}",
  "[",
  "]",
  "(",
  ")",
  "+",
  "++",
  "-",
  "*",
  "**",
  "/",
  "%",
  "=",
  "+=",
  "-=",
  "*=",
  "**=",
  "/=",
  "%=",
  "==",
  "!=",
  "<",
  "<=",
  ">",
  ">=",
  "=>",
  "->",
  "#",
  "::<",
  "..",
  "...",
  "?",
]
