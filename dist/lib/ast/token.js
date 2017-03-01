'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.SimpleToken = exports.SyntaxKind = exports.Token = exports.operatorsundefined;
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
OrKeyword: {kind: 'OrKeyword', value: Symbol('OrKeyword')},
ReturnKeyword: {kind: 'ReturnKeyword', value: Symbol('ReturnKeyword')},
ThenKeyword: {kind: 'ThenKeyword', value: Symbol('ThenKeyword')},
ThrowKeyword: {kind: 'ThrowKeyword', value: Symbol('ThrowKeyword')},
TraitKeyword: {kind: 'TraitKeyword', value: Symbol('TraitKeyword')},
TrueKeyword: {kind: 'TrueKeyword', value: Symbol('TrueKeyword')},
TypeKeyword: {kind: 'TypeKeyword', value: Symbol('TypeKeyword')},
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
SemicolonToken: {kind: 'SemicolonToken', value: Symbol('SemicolonToken')},
SlashEqualsToken: {kind: 'SlashEqualsToken', value: Symbol('SlashEqualsToken')},
SlashToken: {kind: 'SlashToken', value: Symbol('SlashToken')},
UnderscoreToken: {kind: 'UnderscoreToken', value: Symbol('UnderscoreToken')},
NewlineToken: {kind: 'NewlineToken', value: Symbol('NewlineToken')},
EndOfFileToken: {kind: 'EndOfFileToken', value: Symbol('EndOfFileToken')},
};
var Token = exports.Token = {
SimpleToken: (...members) => ({kind: 'SimpleToken', value: members}),
Comment: (...members) => ({kind: 'Comment', value: members}),
Identifier: (...members) => ({kind: 'Identifier', value: members}),
NumberLiteral: (...members) => ({kind: 'NumberLiteral', value: members}),
StringLiteral: (...members) => ({kind: 'StringLiteral', value: members}),
};
Token.name = function () {
  const self = this;
  let $puck_4 = self;
  if ($unwrapTraitObject($puck_4).kind === "SimpleToken") {
    let {value: [token]} = $unwrapTraitObject($puck_4);
    return SyntaxKind.name.call(token.kind);
  }
  else {
    if ($unwrapTraitObject($puck_4).kind === "Comment") {
      let undefined = $unwrapTraitObject($puck_4);
      return "comment";
    }
    else {
      if ($unwrapTraitObject($puck_4).kind === "Identifier") {
        let {value: [{name: name}]} = $unwrapTraitObject($puck_4);
        return "identifier \"" + name + "\"";
      }
      else {
        if ($unwrapTraitObject($puck_4).kind === "NumberLiteral") {
          let undefined = $unwrapTraitObject($puck_4);
          return "number";
        }
        else {
          if ($unwrapTraitObject($puck_4).kind === "StringLiteral") {
            let undefined = $unwrapTraitObject($puck_4);
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
                                if (text === "or") {
                                  return $puck_1.Some(SyntaxKind.OrKeyword);
                                }
                                else {
                                  if (text === "return") {
                                    return $puck_1.Some(SyntaxKind.ReturnKeyword);
                                  }
                                  else {
                                    if (text === "throw") {
                                      return $puck_1.Some(SyntaxKind.ThrowKeyword);
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
SyntaxKind.name = function () {
  const self = this;
  let $puck_5 = self;
  if ($unwrapTraitObject($puck_5).kind === "AsKeyword") {
    let undefined = $unwrapTraitObject($puck_5);
    return "as";
  }
  else {
    if ($unwrapTraitObject($puck_5).kind === "AndKeyword") {
      let undefined = $unwrapTraitObject($puck_5);
      return "and";
    }
    else {
      if ($unwrapTraitObject($puck_5).kind === "BreakKeyword") {
        let undefined = $unwrapTraitObject($puck_5);
        return "break";
      }
      else {
        if ($unwrapTraitObject($puck_5).kind === "ElseKeyword") {
          let undefined = $unwrapTraitObject($puck_5);
          return "else";
        }
        else {
          if ($unwrapTraitObject($puck_5).kind === "EnumKeyword") {
            let undefined = $unwrapTraitObject($puck_5);
            return "enum";
          }
          else {
            if ($unwrapTraitObject($puck_5).kind === "ExportKeyword") {
              let undefined = $unwrapTraitObject($puck_5);
              return "export";
            }
            else {
              if ($unwrapTraitObject($puck_5).kind === "FalseKeyword") {
                let undefined = $unwrapTraitObject($puck_5);
                return "false";
              }
              else {
                if ($unwrapTraitObject($puck_5).kind === "ForKeyword") {
                  let undefined = $unwrapTraitObject($puck_5);
                  return "for";
                }
                else {
                  if ($unwrapTraitObject($puck_5).kind === "FnKeyword") {
                    let undefined = $unwrapTraitObject($puck_5);
                    return "fn";
                  }
                  else {
                    if ($unwrapTraitObject($puck_5).kind === "IfKeyword") {
                      let undefined = $unwrapTraitObject($puck_5);
                      return "if";
                    }
                    else {
                      if ($unwrapTraitObject($puck_5).kind === "ImplKeyword") {
                        let undefined = $unwrapTraitObject($puck_5);
                        return "impl";
                      }
                      else {
                        if ($unwrapTraitObject($puck_5).kind === "ImportKeyword") {
                          let undefined = $unwrapTraitObject($puck_5);
                          return "import";
                        }
                        else {
                          if ($unwrapTraitObject($puck_5).kind === "LetKeyword") {
                            let undefined = $unwrapTraitObject($puck_5);
                            return "let";
                          }
                          else {
                            if ($unwrapTraitObject($puck_5).kind === "MatchKeyword") {
                              let undefined = $unwrapTraitObject($puck_5);
                              return "match";
                            }
                            else {
                              if ($unwrapTraitObject($puck_5).kind === "MutKeyword") {
                                let undefined = $unwrapTraitObject($puck_5);
                                return "mut";
                              }
                              else {
                                if ($unwrapTraitObject($puck_5).kind === "NotKeyword") {
                                  let undefined = $unwrapTraitObject($puck_5);
                                  return "not";
                                }
                                else {
                                  if ($unwrapTraitObject($puck_5).kind === "OrKeyword") {
                                    let undefined = $unwrapTraitObject($puck_5);
                                    return "or";
                                  }
                                  else {
                                    if ($unwrapTraitObject($puck_5).kind === "ReturnKeyword") {
                                      let undefined = $unwrapTraitObject($puck_5);
                                      return "return";
                                    }
                                    else {
                                      if ($unwrapTraitObject($puck_5).kind === "ThrowKeyword") {
                                        let undefined = $unwrapTraitObject($puck_5);
                                        return "throw";
                                      }
                                      else {
                                        if ($unwrapTraitObject($puck_5).kind === "TrueKeyword") {
                                          let undefined = $unwrapTraitObject($puck_5);
                                          return "true";
                                        }
                                        else {
                                          if ($unwrapTraitObject($puck_5).kind === "ThenKeyword") {
                                            let undefined = $unwrapTraitObject($puck_5);
                                            return "then";
                                          }
                                          else {
                                            if ($unwrapTraitObject($puck_5).kind === "TraitKeyword") {
                                              let undefined = $unwrapTraitObject($puck_5);
                                              return "trait";
                                            }
                                            else {
                                              if ($unwrapTraitObject($puck_5).kind === "TypeKeyword") {
                                                let undefined = $unwrapTraitObject($puck_5);
                                                return "type";
                                              }
                                              else {
                                                if ($unwrapTraitObject($puck_5).kind === "WhileKeyword") {
                                                  let undefined = $unwrapTraitObject($puck_5);
                                                  return "while";
                                                }
                                                else {
                                                  if ($unwrapTraitObject($puck_5).kind === "OpenBraceToken") {
                                                    let undefined = $unwrapTraitObject($puck_5);
                                                    return "{";
                                                  }
                                                  else {
                                                    if ($unwrapTraitObject($puck_5).kind === "CloseBraceToken") {
                                                      let undefined = $unwrapTraitObject($puck_5);
                                                      return "}";
                                                    }
                                                    else {
                                                      if ($unwrapTraitObject($puck_5).kind === "OpenBracketToken") {
                                                        let undefined = $unwrapTraitObject($puck_5);
                                                        return "[";
                                                      }
                                                      else {
                                                        if ($unwrapTraitObject($puck_5).kind === "CloseBracketToken") {
                                                          let undefined = $unwrapTraitObject($puck_5);
                                                          return "]";
                                                        }
                                                        else {
                                                          if ($unwrapTraitObject($puck_5).kind === "OpenParenToken") {
                                                            let undefined = $unwrapTraitObject($puck_5);
                                                            return "(";
                                                          }
                                                          else {
                                                            if ($unwrapTraitObject($puck_5).kind === "CloseParenToken") {
                                                              let undefined = $unwrapTraitObject($puck_5);
                                                              return ")";
                                                            }
                                                            else {
                                                              if ($unwrapTraitObject($puck_5).kind === "BarToken") {
                                                                let undefined = $unwrapTraitObject($puck_5);
                                                                return "|";
                                                              }
                                                              else {
                                                                if ($unwrapTraitObject($puck_5).kind === "CommaToken") {
                                                                  let undefined = $unwrapTraitObject($puck_5);
                                                                  return ",";
                                                                }
                                                                else {
                                                                  if ($unwrapTraitObject($puck_5).kind === "ColonToken") {
                                                                    let undefined = $unwrapTraitObject($puck_5);
                                                                    return ":";
                                                                  }
                                                                  else {
                                                                    if ($unwrapTraitObject($puck_5).kind === "ColonColonToken") {
                                                                      let undefined = $unwrapTraitObject($puck_5);
                                                                      return "::";
                                                                    }
                                                                    else {
                                                                      if ($unwrapTraitObject($puck_5).kind === "ColonColonLessThanToken") {
                                                                        let undefined = $unwrapTraitObject($puck_5);
                                                                        return "::<";
                                                                      }
                                                                      else {
                                                                        if ($unwrapTraitObject($puck_5).kind === "DotToken") {
                                                                          let undefined = $unwrapTraitObject($puck_5);
                                                                          return ".";
                                                                        }
                                                                        else {
                                                                          if ($unwrapTraitObject($puck_5).kind === "HashToken") {
                                                                            let undefined = $unwrapTraitObject($puck_5);
                                                                            return "#";
                                                                          }
                                                                          else {
                                                                            if ($unwrapTraitObject($puck_5).kind === "SemicolonToken") {
                                                                              let undefined = $unwrapTraitObject($puck_5);
                                                                              return ";";
                                                                            }
                                                                            else {
                                                                              if ($unwrapTraitObject($puck_5).kind === "UnderscoreToken") {
                                                                                let undefined = $unwrapTraitObject($puck_5);
                                                                                return "_";
                                                                              }
                                                                              else {
                                                                                if ($unwrapTraitObject($puck_5).kind === "LessThanToken") {
                                                                                  let undefined = $unwrapTraitObject($puck_5);
                                                                                  return "<";
                                                                                }
                                                                                else {
                                                                                  if ($unwrapTraitObject($puck_5).kind === "GreaterThanToken") {
                                                                                    let undefined = $unwrapTraitObject($puck_5);
                                                                                    return ">";
                                                                                  }
                                                                                  else {
                                                                                    if ($unwrapTraitObject($puck_5).kind === "LessThanEqualsToken") {
                                                                                      let undefined = $unwrapTraitObject($puck_5);
                                                                                      return "<=";
                                                                                    }
                                                                                    else {
                                                                                      if ($unwrapTraitObject($puck_5).kind === "GreaterThanEqualsToken") {
                                                                                        let undefined = $unwrapTraitObject($puck_5);
                                                                                        return ">=";
                                                                                      }
                                                                                      else {
                                                                                        if ($unwrapTraitObject($puck_5).kind === "EqualsEqualsToken") {
                                                                                          let undefined = $unwrapTraitObject($puck_5);
                                                                                          return "==";
                                                                                        }
                                                                                        else {
                                                                                          if ($unwrapTraitObject($puck_5).kind === "ExclamationEqualsToken") {
                                                                                            let undefined = $unwrapTraitObject($puck_5);
                                                                                            return "!=";
                                                                                          }
                                                                                          else {
                                                                                            if ($unwrapTraitObject($puck_5).kind === "EqualsGreaterThanToken") {
                                                                                              let undefined = $unwrapTraitObject($puck_5);
                                                                                              return "=>";
                                                                                            }
                                                                                            else {
                                                                                              if ($unwrapTraitObject($puck_5).kind === "MinusGreaterThanToken") {
                                                                                                let undefined = $unwrapTraitObject($puck_5);
                                                                                                return "->";
                                                                                              }
                                                                                              else {
                                                                                                if ($unwrapTraitObject($puck_5).kind === "PlusToken") {
                                                                                                  let undefined = $unwrapTraitObject($puck_5);
                                                                                                  return "+";
                                                                                                }
                                                                                                else {
                                                                                                  if ($unwrapTraitObject($puck_5).kind === "MinusToken") {
                                                                                                    let undefined = $unwrapTraitObject($puck_5);
                                                                                                    return "-";
                                                                                                  }
                                                                                                  else {
                                                                                                    if ($unwrapTraitObject($puck_5).kind === "AsteriskToken") {
                                                                                                      let undefined = $unwrapTraitObject($puck_5);
                                                                                                      return "*";
                                                                                                    }
                                                                                                    else {
                                                                                                      if ($unwrapTraitObject($puck_5).kind === "AsteriskAsteriskToken") {
                                                                                                        let undefined = $unwrapTraitObject($puck_5);
                                                                                                        return "**";
                                                                                                      }
                                                                                                      else {
                                                                                                        if ($unwrapTraitObject($puck_5).kind === "SlashToken") {
                                                                                                          let undefined = $unwrapTraitObject($puck_5);
                                                                                                          return "/";
                                                                                                        }
                                                                                                        else {
                                                                                                          if ($unwrapTraitObject($puck_5).kind === "PercentToken") {
                                                                                                            let undefined = $unwrapTraitObject($puck_5);
                                                                                                            return "%";
                                                                                                          }
                                                                                                          else {
                                                                                                            if ($unwrapTraitObject($puck_5).kind === "EqualsToken") {
                                                                                                              let undefined = $unwrapTraitObject($puck_5);
                                                                                                              return "=";
                                                                                                            }
                                                                                                            else {
                                                                                                              if ($unwrapTraitObject($puck_5).kind === "PlusEqualsToken") {
                                                                                                                let undefined = $unwrapTraitObject($puck_5);
                                                                                                                return "+=";
                                                                                                              }
                                                                                                              else {
                                                                                                                if ($unwrapTraitObject($puck_5).kind === "MinusEqualsToken") {
                                                                                                                  let undefined = $unwrapTraitObject($puck_5);
                                                                                                                  return "-=";
                                                                                                                }
                                                                                                                else {
                                                                                                                  if ($unwrapTraitObject($puck_5).kind === "AsteriskEqualsToken") {
                                                                                                                    let undefined = $unwrapTraitObject($puck_5);
                                                                                                                    return "*=";
                                                                                                                  }
                                                                                                                  else {
                                                                                                                    if ($unwrapTraitObject($puck_5).kind === "AsteriskAsteriskEqualsToken") {
                                                                                                                      let undefined = $unwrapTraitObject($puck_5);
                                                                                                                      return "**=";
                                                                                                                    }
                                                                                                                    else {
                                                                                                                      if ($unwrapTraitObject($puck_5).kind === "SlashEqualsToken") {
                                                                                                                        let undefined = $unwrapTraitObject($puck_5);
                                                                                                                        return "/=";
                                                                                                                      }
                                                                                                                      else {
                                                                                                                        if ($unwrapTraitObject($puck_5).kind === "PercentEqualsToken") {
                                                                                                                          let undefined = $unwrapTraitObject($puck_5);
                                                                                                                          return "%=";
                                                                                                                        }
                                                                                                                        else {
                                                                                                                          if ($unwrapTraitObject($puck_5).kind === "NewlineToken") {
                                                                                                                            let undefined = $unwrapTraitObject($puck_5);
                                                                                                                            return "new line";
                                                                                                                          }
                                                                                                                          else {
                                                                                                                            if ($unwrapTraitObject($puck_5).kind === "EndOfFileToken") {
                                                                                                                              let undefined = $unwrapTraitObject($puck_5);
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
SyntaxKind.precedence = function () {
  const self = this;
  let $puck_6 = self;
  if ($unwrapTraitObject($puck_6).kind === "EqualsToken") {
    let undefined = $unwrapTraitObject($puck_6);
    return 1;
  }
  else {
    if ($unwrapTraitObject($puck_6).kind === "PlusEqualsToken") {
      let undefined = $unwrapTraitObject($puck_6);
      return 1.1;
    }
    else {
      if ($unwrapTraitObject($puck_6).kind === "MinusEqualsToken") {
        let undefined = $unwrapTraitObject($puck_6);
        return 1.1;
      }
      else {
        if ($unwrapTraitObject($puck_6).kind === "OrKeyword") {
          let undefined = $unwrapTraitObject($puck_6);
          return 2;
        }
        else {
          if ($unwrapTraitObject($puck_6).kind === "AndKeyword") {
            let undefined = $unwrapTraitObject($puck_6);
            return 3;
          }
          else {
            if ($unwrapTraitObject($puck_6).kind === "NotKeyword") {
              let undefined = $unwrapTraitObject($puck_6);
              return 4;
            }
            else {
              if ($unwrapTraitObject($puck_6).kind === "EqualsEqualsToken") {
                let undefined = $unwrapTraitObject($puck_6);
                return 7;
              }
              else {
                if ($unwrapTraitObject($puck_6).kind === "ExclamationEqualsToken") {
                  let undefined = $unwrapTraitObject($puck_6);
                  return 7;
                }
                else {
                  if ($unwrapTraitObject($puck_6).kind === "GreaterThanToken") {
                    let undefined = $unwrapTraitObject($puck_6);
                    return 7;
                  }
                  else {
                    if ($unwrapTraitObject($puck_6).kind === "GreaterThanEqualsToken") {
                      let undefined = $unwrapTraitObject($puck_6);
                      return 7;
                    }
                    else {
                      if ($unwrapTraitObject($puck_6).kind === "LessThanToken") {
                        let undefined = $unwrapTraitObject($puck_6);
                        return 7;
                      }
                      else {
                        if ($unwrapTraitObject($puck_6).kind === "LessThanEqualsToken") {
                          let undefined = $unwrapTraitObject($puck_6);
                          return 7;
                        }
                        else {
                          if ($unwrapTraitObject($puck_6).kind === "PlusToken") {
                            let undefined = $unwrapTraitObject($puck_6);
                            return 10;
                          }
                          else {
                            if ($unwrapTraitObject($puck_6).kind === "MinusToken") {
                              let undefined = $unwrapTraitObject($puck_6);
                              return 10;
                            }
                            else {
                              if ($unwrapTraitObject($puck_6).kind === "AsteriskToken") {
                                let undefined = $unwrapTraitObject($puck_6);
                                return 20;
                              }
                              else {
                                if ($unwrapTraitObject($puck_6).kind === "SlashToken") {
                                  let undefined = $unwrapTraitObject($puck_6);
                                  return 20;
                                }
                                else {
                                  if ($unwrapTraitObject($puck_6).kind === "PercentToken") {
                                    let undefined = $unwrapTraitObject($puck_6);
                                    return 20;
                                  }
                                  else {
                                    if ($unwrapTraitObject($puck_6).kind === "AsteriskAsteriskToken") {
                                      let undefined = $unwrapTraitObject($puck_6);
                                      return 25;
                                    }
                                    else {
                                      if (true) {
                                        let $puck_7 = $puck_6;
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
]
