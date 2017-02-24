'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.operators = exports.Token = exports.SyntaxKind = exports.SimpleToken = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _core = require('puck-lang/dist/lib/stdlib/core');

var _ast = require('./ast');

var _span = require('./span');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};
var SimpleToken = exports.SimpleToken = function SimpleToken(object) {
  return object;
};
var SyntaxKind = exports.SyntaxKind = {
  AndKeyword: { kind: 'AndKeyword', value: Symbol('AndKeyword') },
  AsKeyword: { kind: 'AsKeyword', value: Symbol('AsKeyword') },
  BreakKeyword: { kind: 'BreakKeyword', value: Symbol('BreakKeyword') },
  ElseKeyword: { kind: 'ElseKeyword', value: Symbol('ElseKeyword') },
  EnumKeyword: { kind: 'EnumKeyword', value: Symbol('EnumKeyword') },
  ExportKeyword: { kind: 'ExportKeyword', value: Symbol('ExportKeyword') },
  FalseKeyword: { kind: 'FalseKeyword', value: Symbol('FalseKeyword') },
  FnKeyword: { kind: 'FnKeyword', value: Symbol('FnKeyword') },
  ForKeyword: { kind: 'ForKeyword', value: Symbol('ForKeyword') },
  IfKeyword: { kind: 'IfKeyword', value: Symbol('IfKeyword') },
  ImplKeyword: { kind: 'ImplKeyword', value: Symbol('ImplKeyword') },
  ImportKeyword: { kind: 'ImportKeyword', value: Symbol('ImportKeyword') },
  LetKeyword: { kind: 'LetKeyword', value: Symbol('LetKeyword') },
  MutKeyword: { kind: 'MutKeyword', value: Symbol('MutKeyword') },
  MatchKeyword: { kind: 'MatchKeyword', value: Symbol('MatchKeyword') },
  NotKeyword: { kind: 'NotKeyword', value: Symbol('NotKeyword') },
  OrKeyword: { kind: 'OrKeyword', value: Symbol('OrKeyword') },
  ReturnKeyword: { kind: 'ReturnKeyword', value: Symbol('ReturnKeyword') },
  ThenKeyword: { kind: 'ThenKeyword', value: Symbol('ThenKeyword') },
  ThrowKeyword: { kind: 'ThrowKeyword', value: Symbol('ThrowKeyword') },
  TraitKeyword: { kind: 'TraitKeyword', value: Symbol('TraitKeyword') },
  TrueKeyword: { kind: 'TrueKeyword', value: Symbol('TrueKeyword') },
  TypeKeyword: { kind: 'TypeKeyword', value: Symbol('TypeKeyword') },
  WhileKeyword: { kind: 'WhileKeyword', value: Symbol('WhileKeyword') },
  OpenBraceToken: { kind: 'OpenBraceToken', value: Symbol('OpenBraceToken') },
  CloseBraceToken: { kind: 'CloseBraceToken', value: Symbol('CloseBraceToken') },
  OpenBracketToken: { kind: 'OpenBracketToken', value: Symbol('OpenBracketToken') },
  CloseBracketToken: { kind: 'CloseBracketToken', value: Symbol('CloseBracketToken') },
  OpenParenToken: { kind: 'OpenParenToken', value: Symbol('OpenParenToken') },
  CloseParenToken: { kind: 'CloseParenToken', value: Symbol('CloseParenToken') },
  AsteriskAsteriskEqualsToken: { kind: 'AsteriskAsteriskEqualsToken', value: Symbol('AsteriskAsteriskEqualsToken') },
  AsteriskAsteriskToken: { kind: 'AsteriskAsteriskToken', value: Symbol('AsteriskAsteriskToken') },
  AsteriskEqualsToken: { kind: 'AsteriskEqualsToken', value: Symbol('AsteriskEqualsToken') },
  AsteriskToken: { kind: 'AsteriskToken', value: Symbol('AsteriskToken') },
  BarToken: { kind: 'BarToken', value: Symbol('BarToken') },
  ColonToken: { kind: 'ColonToken', value: Symbol('ColonToken') },
  ColonColonToken: { kind: 'ColonColonToken', value: Symbol('ColonColonToken') },
  CommaToken: { kind: 'CommaToken', value: Symbol('CommaToken') },
  DotToken: { kind: 'DotToken', value: Symbol('DotToken') },
  EqualsEqualsToken: { kind: 'EqualsEqualsToken', value: Symbol('EqualsEqualsToken') },
  EqualsGreaterThanToken: { kind: 'EqualsGreaterThanToken', value: Symbol('EqualsGreaterThanToken') },
  EqualsToken: { kind: 'EqualsToken', value: Symbol('EqualsToken') },
  ExclamationEqualsToken: { kind: 'ExclamationEqualsToken', value: Symbol('ExclamationEqualsToken') },
  GreaterThanEqualsToken: { kind: 'GreaterThanEqualsToken', value: Symbol('GreaterThanEqualsToken') },
  GreaterThanToken: { kind: 'GreaterThanToken', value: Symbol('GreaterThanToken') },
  HashToken: { kind: 'HashToken', value: Symbol('HashToken') },
  LessThanEqualsToken: { kind: 'LessThanEqualsToken', value: Symbol('LessThanEqualsToken') },
  LessThanToken: { kind: 'LessThanToken', value: Symbol('LessThanToken') },
  MinusEqualsToken: { kind: 'MinusEqualsToken', value: Symbol('MinusEqualsToken') },
  MinusGreaterThanToken: { kind: 'MinusGreaterThanToken', value: Symbol('MinusGreaterThanToken') },
  MinusToken: { kind: 'MinusToken', value: Symbol('MinusToken') },
  PercentEqualsToken: { kind: 'PercentEqualsToken', value: Symbol('PercentEqualsToken') },
  PercentToken: { kind: 'PercentToken', value: Symbol('PercentToken') },
  PlusEqualsToken: { kind: 'PlusEqualsToken', value: Symbol('PlusEqualsToken') },
  PlusToken: { kind: 'PlusToken', value: Symbol('PlusToken') },
  SemicolonToken: { kind: 'SemicolonToken', value: Symbol('SemicolonToken') },
  SlashEqualsToken: { kind: 'SlashEqualsToken', value: Symbol('SlashEqualsToken') },
  SlashToken: { kind: 'SlashToken', value: Symbol('SlashToken') },
  UnderscoreToken: { kind: 'UnderscoreToken', value: Symbol('UnderscoreToken') },
  NewlineToken: { kind: 'NewlineToken', value: Symbol('NewlineToken') },
  EndOfFileToken: { kind: 'EndOfFileToken', value: Symbol('EndOfFileToken') }
};
var Token = exports.Token = {
  SimpleToken: function SimpleToken() {
    for (var _len = arguments.length, members = Array(_len), _key = 0; _key < _len; _key++) {
      members[_key] = arguments[_key];
    }

    return { kind: 'SimpleToken', value: members };
  },
  Comment: function Comment() {
    for (var _len2 = arguments.length, members = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      members[_key2] = arguments[_key2];
    }

    return { kind: 'Comment', value: members };
  },
  Identifier: function Identifier() {
    for (var _len3 = arguments.length, members = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      members[_key3] = arguments[_key3];
    }

    return { kind: 'Identifier', value: members };
  },
  NumberLiteral: function NumberLiteral() {
    for (var _len4 = arguments.length, members = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      members[_key4] = arguments[_key4];
    }

    return { kind: 'NumberLiteral', value: members };
  },
  StringLiteral: function StringLiteral() {
    for (var _len5 = arguments.length, members = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      members[_key5] = arguments[_key5];
    }

    return { kind: 'StringLiteral', value: members };
  }
};
Token.name = function () {
  var self = this;
  var __PUCK__value__1 = self;
  if ($unwrapTraitObject(__PUCK__value__1).kind == "SimpleToken") {
    var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__1),
        _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
        token = _$unwrapTraitObject$v[0];

    return SyntaxKind.name.call(token.kind);
  } else {
    if ($unwrapTraitObject(__PUCK__value__1).kind == "Comment") {
      var _undefined = $unwrapTraitObject(__PUCK__value__1);
      return "comment";
    } else {
      if ($unwrapTraitObject(__PUCK__value__1).kind == "Identifier") {
        var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__1),
            _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
            name = _$unwrapTraitObject2$[0].name;

        return "identifier \"" + name + "\"";
      } else {
        if ($unwrapTraitObject(__PUCK__value__1).kind == "NumberLiteral") {
          var _undefined2 = $unwrapTraitObject(__PUCK__value__1);
          return "number";
        } else {
          if ($unwrapTraitObject(__PUCK__value__1).kind == "StringLiteral") {
            var _undefined3 = $unwrapTraitObject(__PUCK__value__1);
            return "string";
          };
        };
      };
    };
  };
};
SyntaxKind.fromText = function (text) {
  if (text == "and") {
    return (0, _core.Some)(SyntaxKind.AndKeyword);
  } else {
    if (text == "break") {
      return (0, _core.Some)(SyntaxKind.BreakKeyword);
    } else {
      if (text == "else") {
        return (0, _core.Some)(SyntaxKind.ElseKeyword);
      } else {
        if (text == "enum") {
          return (0, _core.Some)(SyntaxKind.EnumKeyword);
        } else {
          if (text == "export") {
            return (0, _core.Some)(SyntaxKind.ExportKeyword);
          } else {
            if (text == "false") {
              return (0, _core.Some)(SyntaxKind.FalseKeyword);
            } else {
              if (text == "for") {
                return (0, _core.Some)(SyntaxKind.ForKeyword);
              } else {
                if (text == "fn") {
                  return (0, _core.Some)(SyntaxKind.FnKeyword);
                } else {
                  if (text == "if") {
                    return (0, _core.Some)(SyntaxKind.IfKeyword);
                  } else {
                    if (text == "impl") {
                      return (0, _core.Some)(SyntaxKind.ImplKeyword);
                    } else {
                      if (text == "import") {
                        return (0, _core.Some)(SyntaxKind.ImportKeyword);
                      } else {
                        if (text == "let") {
                          return (0, _core.Some)(SyntaxKind.LetKeyword);
                        } else {
                          if (text == "match") {
                            return (0, _core.Some)(SyntaxKind.MatchKeyword);
                          } else {
                            if (text == "mut") {
                              return (0, _core.Some)(SyntaxKind.MutKeyword);
                            } else {
                              if (text == "not") {
                                return (0, _core.Some)(SyntaxKind.NotKeyword);
                              } else {
                                if (text == "or") {
                                  return (0, _core.Some)(SyntaxKind.OrKeyword);
                                } else {
                                  if (text == "return") {
                                    return (0, _core.Some)(SyntaxKind.ReturnKeyword);
                                  } else {
                                    if (text == "throw") {
                                      return (0, _core.Some)(SyntaxKind.ThrowKeyword);
                                    } else {
                                      if (text == "true") {
                                        return (0, _core.Some)(SyntaxKind.TrueKeyword);
                                      } else {
                                        if (text == "then") {
                                          return (0, _core.Some)(SyntaxKind.ThenKeyword);
                                        } else {
                                          if (text == "trait") {
                                            return (0, _core.Some)(SyntaxKind.TraitKeyword);
                                          } else {
                                            if (text == "type") {
                                              return (0, _core.Some)(SyntaxKind.TypeKeyword);
                                            } else {
                                              if (text == "while") {
                                                return (0, _core.Some)(SyntaxKind.WhileKeyword);
                                              } else {
                                                if (text == "{") {
                                                  return (0, _core.Some)(SyntaxKind.OpenBraceToken);
                                                } else {
                                                  if (text == "}") {
                                                    return (0, _core.Some)(SyntaxKind.CloseBraceToken);
                                                  } else {
                                                    if (text == "[") {
                                                      return (0, _core.Some)(SyntaxKind.OpenBracketToken);
                                                    } else {
                                                      if (text == "]") {
                                                        return (0, _core.Some)(SyntaxKind.CloseBracketToken);
                                                      } else {
                                                        if (text == "(") {
                                                          return (0, _core.Some)(SyntaxKind.OpenParenToken);
                                                        } else {
                                                          if (text == ")") {
                                                            return (0, _core.Some)(SyntaxKind.CloseParenToken);
                                                          } else {
                                                            if (text == "|") {
                                                              return (0, _core.Some)(SyntaxKind.BarToken);
                                                            } else {
                                                              if (text == ",") {
                                                                return (0, _core.Some)(SyntaxKind.CommaToken);
                                                              } else {
                                                                if (text == ":") {
                                                                  return (0, _core.Some)(SyntaxKind.ColonToken);
                                                                } else {
                                                                  if (text == "::") {
                                                                    return (0, _core.Some)(SyntaxKind.ColonColonToken);
                                                                  } else {
                                                                    if (text == ".") {
                                                                      return (0, _core.Some)(SyntaxKind.DotToken);
                                                                    } else {
                                                                      if (text == "#") {
                                                                        return (0, _core.Some)(SyntaxKind.HashToken);
                                                                      } else {
                                                                        if (text == ";") {
                                                                          return (0, _core.Some)(SyntaxKind.SemicolonToken);
                                                                        } else {
                                                                          if (text == "_") {
                                                                            return (0, _core.Some)(SyntaxKind.UnderscoreToken);
                                                                          } else {
                                                                            if (text == "<") {
                                                                              return (0, _core.Some)(SyntaxKind.LessThanToken);
                                                                            } else {
                                                                              if (text == ">") {
                                                                                return (0, _core.Some)(SyntaxKind.GreaterThanToken);
                                                                              } else {
                                                                                if (text == "<=") {
                                                                                  return (0, _core.Some)(SyntaxKind.LessThanEqualsToken);
                                                                                } else {
                                                                                  if (text == ">=") {
                                                                                    return (0, _core.Some)(SyntaxKind.GreaterThanEqualsToken);
                                                                                  } else {
                                                                                    if (text == "==") {
                                                                                      return (0, _core.Some)(SyntaxKind.EqualsEqualsToken);
                                                                                    } else {
                                                                                      if (text == "!=") {
                                                                                        return (0, _core.Some)(SyntaxKind.ExclamationEqualsToken);
                                                                                      } else {
                                                                                        if (text == "=>") {
                                                                                          return (0, _core.Some)(SyntaxKind.EqualsGreaterThanToken);
                                                                                        } else {
                                                                                          if (text == "->") {
                                                                                            return (0, _core.Some)(SyntaxKind.MinusGreaterThanToken);
                                                                                          } else {
                                                                                            if (text == "+") {
                                                                                              return (0, _core.Some)(SyntaxKind.PlusToken);
                                                                                            } else {
                                                                                              if (text == "-") {
                                                                                                return (0, _core.Some)(SyntaxKind.MinusToken);
                                                                                              } else {
                                                                                                if (text == "*") {
                                                                                                  return (0, _core.Some)(SyntaxKind.AsteriskToken);
                                                                                                } else {
                                                                                                  if (text == "**") {
                                                                                                    return (0, _core.Some)(SyntaxKind.AsteriskAsteriskToken);
                                                                                                  } else {
                                                                                                    if (text == "/") {
                                                                                                      return (0, _core.Some)(SyntaxKind.SlashToken);
                                                                                                    } else {
                                                                                                      if (text == "%") {
                                                                                                        return (0, _core.Some)(SyntaxKind.PercentToken);
                                                                                                      } else {
                                                                                                        if (text == "=") {
                                                                                                          return (0, _core.Some)(SyntaxKind.EqualsToken);
                                                                                                        } else {
                                                                                                          if (text == "+=") {
                                                                                                            return (0, _core.Some)(SyntaxKind.PlusEqualsToken);
                                                                                                          } else {
                                                                                                            if (text == "-=") {
                                                                                                              return (0, _core.Some)(SyntaxKind.MinusEqualsToken);
                                                                                                            } else {
                                                                                                              if (text == "*=") {
                                                                                                                return (0, _core.Some)(SyntaxKind.AsteriskEqualsToken);
                                                                                                              } else {
                                                                                                                if (text == "**=") {
                                                                                                                  return (0, _core.Some)(SyntaxKind.AsteriskAsteriskEqualsToken);
                                                                                                                } else {
                                                                                                                  if (text == "/=") {
                                                                                                                    return (0, _core.Some)(SyntaxKind.SlashEqualsToken);
                                                                                                                  } else {
                                                                                                                    if (text == "%=") {
                                                                                                                      return (0, _core.Some)(SyntaxKind.PercentEqualsToken);
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
                                                                                  };
                                                                                };
                                                                              };
                                                                            };
                                                                          };
                                                                        };
                                                                      };
                                                                    };
                                                                  };
                                                                };
                                                              };
                                                            };
                                                          };
                                                        };
                                                      };
                                                    };
                                                  };
                                                };
                                              };
                                            };
                                          };
                                        };
                                      };
                                    };
                                  };
                                };
                              };
                            };
                          };
                        };
                      };
                    };
                  };
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
  var self = this;
  var __PUCK__value__2 = self;
  if ($unwrapTraitObject(__PUCK__value__2).kind == "AsKeyword") {
    var _undefined4 = $unwrapTraitObject(__PUCK__value__2);
    return "as";
  } else {
    if ($unwrapTraitObject(__PUCK__value__2).kind == "AndKeyword") {
      var _undefined5 = $unwrapTraitObject(__PUCK__value__2);
      return "and";
    } else {
      if ($unwrapTraitObject(__PUCK__value__2).kind == "BreakKeyword") {
        var _undefined6 = $unwrapTraitObject(__PUCK__value__2);
        return "break";
      } else {
        if ($unwrapTraitObject(__PUCK__value__2).kind == "ElseKeyword") {
          var _undefined7 = $unwrapTraitObject(__PUCK__value__2);
          return "else";
        } else {
          if ($unwrapTraitObject(__PUCK__value__2).kind == "EnumKeyword") {
            var _undefined8 = $unwrapTraitObject(__PUCK__value__2);
            return "enum";
          } else {
            if ($unwrapTraitObject(__PUCK__value__2).kind == "ExportKeyword") {
              var _undefined9 = $unwrapTraitObject(__PUCK__value__2);
              return "export";
            } else {
              if ($unwrapTraitObject(__PUCK__value__2).kind == "FalseKeyword") {
                var _undefined10 = $unwrapTraitObject(__PUCK__value__2);
                return "false";
              } else {
                if ($unwrapTraitObject(__PUCK__value__2).kind == "ForKeyword") {
                  var _undefined11 = $unwrapTraitObject(__PUCK__value__2);
                  return "for";
                } else {
                  if ($unwrapTraitObject(__PUCK__value__2).kind == "FnKeyword") {
                    var _undefined12 = $unwrapTraitObject(__PUCK__value__2);
                    return "fn";
                  } else {
                    if ($unwrapTraitObject(__PUCK__value__2).kind == "IfKeyword") {
                      var _undefined13 = $unwrapTraitObject(__PUCK__value__2);
                      return "if";
                    } else {
                      if ($unwrapTraitObject(__PUCK__value__2).kind == "ImplKeyword") {
                        var _undefined14 = $unwrapTraitObject(__PUCK__value__2);
                        return "impl";
                      } else {
                        if ($unwrapTraitObject(__PUCK__value__2).kind == "ImportKeyword") {
                          var _undefined15 = $unwrapTraitObject(__PUCK__value__2);
                          return "import";
                        } else {
                          if ($unwrapTraitObject(__PUCK__value__2).kind == "LetKeyword") {
                            var _undefined16 = $unwrapTraitObject(__PUCK__value__2);
                            return "let";
                          } else {
                            if ($unwrapTraitObject(__PUCK__value__2).kind == "MatchKeyword") {
                              var _undefined17 = $unwrapTraitObject(__PUCK__value__2);
                              return "match";
                            } else {
                              if ($unwrapTraitObject(__PUCK__value__2).kind == "MutKeyword") {
                                var _undefined18 = $unwrapTraitObject(__PUCK__value__2);
                                return "mut";
                              } else {
                                if ($unwrapTraitObject(__PUCK__value__2).kind == "NotKeyword") {
                                  var _undefined19 = $unwrapTraitObject(__PUCK__value__2);
                                  return "not";
                                } else {
                                  if ($unwrapTraitObject(__PUCK__value__2).kind == "OrKeyword") {
                                    var _undefined20 = $unwrapTraitObject(__PUCK__value__2);
                                    return "or";
                                  } else {
                                    if ($unwrapTraitObject(__PUCK__value__2).kind == "ReturnKeyword") {
                                      var _undefined21 = $unwrapTraitObject(__PUCK__value__2);
                                      return "return";
                                    } else {
                                      if ($unwrapTraitObject(__PUCK__value__2).kind == "ThrowKeyword") {
                                        var _undefined22 = $unwrapTraitObject(__PUCK__value__2);
                                        return "throw";
                                      } else {
                                        if ($unwrapTraitObject(__PUCK__value__2).kind == "TrueKeyword") {
                                          var _undefined23 = $unwrapTraitObject(__PUCK__value__2);
                                          return "true";
                                        } else {
                                          if ($unwrapTraitObject(__PUCK__value__2).kind == "ThenKeyword") {
                                            var _undefined24 = $unwrapTraitObject(__PUCK__value__2);
                                            return "then";
                                          } else {
                                            if ($unwrapTraitObject(__PUCK__value__2).kind == "TraitKeyword") {
                                              var _undefined25 = $unwrapTraitObject(__PUCK__value__2);
                                              return "trait";
                                            } else {
                                              if ($unwrapTraitObject(__PUCK__value__2).kind == "TypeKeyword") {
                                                var _undefined26 = $unwrapTraitObject(__PUCK__value__2);
                                                return "type";
                                              } else {
                                                if ($unwrapTraitObject(__PUCK__value__2).kind == "WhileKeyword") {
                                                  var _undefined27 = $unwrapTraitObject(__PUCK__value__2);
                                                  return "while";
                                                } else {
                                                  if ($unwrapTraitObject(__PUCK__value__2).kind == "OpenBraceToken") {
                                                    var _undefined28 = $unwrapTraitObject(__PUCK__value__2);
                                                    return "{";
                                                  } else {
                                                    if ($unwrapTraitObject(__PUCK__value__2).kind == "CloseBraceToken") {
                                                      var _undefined29 = $unwrapTraitObject(__PUCK__value__2);
                                                      return "}";
                                                    } else {
                                                      if ($unwrapTraitObject(__PUCK__value__2).kind == "OpenBracketToken") {
                                                        var _undefined30 = $unwrapTraitObject(__PUCK__value__2);
                                                        return "[";
                                                      } else {
                                                        if ($unwrapTraitObject(__PUCK__value__2).kind == "CloseBracketToken") {
                                                          var _undefined31 = $unwrapTraitObject(__PUCK__value__2);
                                                          return "]";
                                                        } else {
                                                          if ($unwrapTraitObject(__PUCK__value__2).kind == "OpenParenToken") {
                                                            var _undefined32 = $unwrapTraitObject(__PUCK__value__2);
                                                            return "(";
                                                          } else {
                                                            if ($unwrapTraitObject(__PUCK__value__2).kind == "CloseParenToken") {
                                                              var _undefined33 = $unwrapTraitObject(__PUCK__value__2);
                                                              return ")";
                                                            } else {
                                                              if ($unwrapTraitObject(__PUCK__value__2).kind == "BarToken") {
                                                                var _undefined34 = $unwrapTraitObject(__PUCK__value__2);
                                                                return "|";
                                                              } else {
                                                                if ($unwrapTraitObject(__PUCK__value__2).kind == "CommaToken") {
                                                                  var _undefined35 = $unwrapTraitObject(__PUCK__value__2);
                                                                  return ",";
                                                                } else {
                                                                  if ($unwrapTraitObject(__PUCK__value__2).kind == "ColonToken") {
                                                                    var _undefined36 = $unwrapTraitObject(__PUCK__value__2);
                                                                    return ":";
                                                                  } else {
                                                                    if ($unwrapTraitObject(__PUCK__value__2).kind == "ColonColonToken") {
                                                                      var _undefined37 = $unwrapTraitObject(__PUCK__value__2);
                                                                      return "::";
                                                                    } else {
                                                                      if ($unwrapTraitObject(__PUCK__value__2).kind == "DotToken") {
                                                                        var _undefined38 = $unwrapTraitObject(__PUCK__value__2);
                                                                        return ".";
                                                                      } else {
                                                                        if ($unwrapTraitObject(__PUCK__value__2).kind == "HashToken") {
                                                                          var _undefined39 = $unwrapTraitObject(__PUCK__value__2);
                                                                          return "#";
                                                                        } else {
                                                                          if ($unwrapTraitObject(__PUCK__value__2).kind == "SemicolonToken") {
                                                                            var _undefined40 = $unwrapTraitObject(__PUCK__value__2);
                                                                            return ";";
                                                                          } else {
                                                                            if ($unwrapTraitObject(__PUCK__value__2).kind == "UnderscoreToken") {
                                                                              var _undefined41 = $unwrapTraitObject(__PUCK__value__2);
                                                                              return "_";
                                                                            } else {
                                                                              if ($unwrapTraitObject(__PUCK__value__2).kind == "LessThanToken") {
                                                                                var _undefined42 = $unwrapTraitObject(__PUCK__value__2);
                                                                                return "<";
                                                                              } else {
                                                                                if ($unwrapTraitObject(__PUCK__value__2).kind == "GreaterThanToken") {
                                                                                  var _undefined43 = $unwrapTraitObject(__PUCK__value__2);
                                                                                  return ">";
                                                                                } else {
                                                                                  if ($unwrapTraitObject(__PUCK__value__2).kind == "LessThanEqualsToken") {
                                                                                    var _undefined44 = $unwrapTraitObject(__PUCK__value__2);
                                                                                    return "<=";
                                                                                  } else {
                                                                                    if ($unwrapTraitObject(__PUCK__value__2).kind == "GreaterThanEqualsToken") {
                                                                                      var _undefined45 = $unwrapTraitObject(__PUCK__value__2);
                                                                                      return ">=";
                                                                                    } else {
                                                                                      if ($unwrapTraitObject(__PUCK__value__2).kind == "EqualsEqualsToken") {
                                                                                        var _undefined46 = $unwrapTraitObject(__PUCK__value__2);
                                                                                        return "==";
                                                                                      } else {
                                                                                        if ($unwrapTraitObject(__PUCK__value__2).kind == "ExclamationEqualsToken") {
                                                                                          var _undefined47 = $unwrapTraitObject(__PUCK__value__2);
                                                                                          return "!=";
                                                                                        } else {
                                                                                          if ($unwrapTraitObject(__PUCK__value__2).kind == "EqualsGreaterThanToken") {
                                                                                            var _undefined48 = $unwrapTraitObject(__PUCK__value__2);
                                                                                            return "=>";
                                                                                          } else {
                                                                                            if ($unwrapTraitObject(__PUCK__value__2).kind == "MinusGreaterThanToken") {
                                                                                              var _undefined49 = $unwrapTraitObject(__PUCK__value__2);
                                                                                              return "->";
                                                                                            } else {
                                                                                              if ($unwrapTraitObject(__PUCK__value__2).kind == "PlusToken") {
                                                                                                var _undefined50 = $unwrapTraitObject(__PUCK__value__2);
                                                                                                return "+";
                                                                                              } else {
                                                                                                if ($unwrapTraitObject(__PUCK__value__2).kind == "MinusToken") {
                                                                                                  var _undefined51 = $unwrapTraitObject(__PUCK__value__2);
                                                                                                  return "-";
                                                                                                } else {
                                                                                                  if ($unwrapTraitObject(__PUCK__value__2).kind == "AsteriskToken") {
                                                                                                    var _undefined52 = $unwrapTraitObject(__PUCK__value__2);
                                                                                                    return "*";
                                                                                                  } else {
                                                                                                    if ($unwrapTraitObject(__PUCK__value__2).kind == "AsteriskAsteriskToken") {
                                                                                                      var _undefined53 = $unwrapTraitObject(__PUCK__value__2);
                                                                                                      return "**";
                                                                                                    } else {
                                                                                                      if ($unwrapTraitObject(__PUCK__value__2).kind == "SlashToken") {
                                                                                                        var _undefined54 = $unwrapTraitObject(__PUCK__value__2);
                                                                                                        return "/";
                                                                                                      } else {
                                                                                                        if ($unwrapTraitObject(__PUCK__value__2).kind == "PercentToken") {
                                                                                                          var _undefined55 = $unwrapTraitObject(__PUCK__value__2);
                                                                                                          return "%";
                                                                                                        } else {
                                                                                                          if ($unwrapTraitObject(__PUCK__value__2).kind == "EqualsToken") {
                                                                                                            var _undefined56 = $unwrapTraitObject(__PUCK__value__2);
                                                                                                            return "=";
                                                                                                          } else {
                                                                                                            if ($unwrapTraitObject(__PUCK__value__2).kind == "PlusEqualsToken") {
                                                                                                              var _undefined57 = $unwrapTraitObject(__PUCK__value__2);
                                                                                                              return "+=";
                                                                                                            } else {
                                                                                                              if ($unwrapTraitObject(__PUCK__value__2).kind == "MinusEqualsToken") {
                                                                                                                var _undefined58 = $unwrapTraitObject(__PUCK__value__2);
                                                                                                                return "-=";
                                                                                                              } else {
                                                                                                                if ($unwrapTraitObject(__PUCK__value__2).kind == "AsteriskEqualsToken") {
                                                                                                                  var _undefined59 = $unwrapTraitObject(__PUCK__value__2);
                                                                                                                  return "*=";
                                                                                                                } else {
                                                                                                                  if ($unwrapTraitObject(__PUCK__value__2).kind == "AsteriskAsteriskEqualsToken") {
                                                                                                                    var _undefined60 = $unwrapTraitObject(__PUCK__value__2);
                                                                                                                    return "**=";
                                                                                                                  } else {
                                                                                                                    if ($unwrapTraitObject(__PUCK__value__2).kind == "SlashEqualsToken") {
                                                                                                                      var _undefined61 = $unwrapTraitObject(__PUCK__value__2);
                                                                                                                      return "/=";
                                                                                                                    } else {
                                                                                                                      if ($unwrapTraitObject(__PUCK__value__2).kind == "PercentEqualsToken") {
                                                                                                                        var _undefined62 = $unwrapTraitObject(__PUCK__value__2);
                                                                                                                        return "%=";
                                                                                                                      } else {
                                                                                                                        if ($unwrapTraitObject(__PUCK__value__2).kind == "NewlineToken") {
                                                                                                                          var _undefined63 = $unwrapTraitObject(__PUCK__value__2);
                                                                                                                          return "new line";
                                                                                                                        } else {
                                                                                                                          if ($unwrapTraitObject(__PUCK__value__2).kind == "EndOfFileToken") {
                                                                                                                            var _undefined64 = $unwrapTraitObject(__PUCK__value__2);
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
SyntaxKind.precedence = function () {
  var self = this;
  var __PUCK__value__3 = self;
  if ($unwrapTraitObject(__PUCK__value__3).kind == "EqualsToken") {
    var _undefined65 = $unwrapTraitObject(__PUCK__value__3);
    return 1;
  } else {
    if ($unwrapTraitObject(__PUCK__value__3).kind == "PlusEqualsToken") {
      var _undefined66 = $unwrapTraitObject(__PUCK__value__3);
      return 1.1;
    } else {
      if ($unwrapTraitObject(__PUCK__value__3).kind == "MinusEqualsToken") {
        var _undefined67 = $unwrapTraitObject(__PUCK__value__3);
        return 1.1;
      } else {
        if ($unwrapTraitObject(__PUCK__value__3).kind == "OrKeyword") {
          var _undefined68 = $unwrapTraitObject(__PUCK__value__3);
          return 2;
        } else {
          if ($unwrapTraitObject(__PUCK__value__3).kind == "AndKeyword") {
            var _undefined69 = $unwrapTraitObject(__PUCK__value__3);
            return 3;
          } else {
            if ($unwrapTraitObject(__PUCK__value__3).kind == "NotKeyword") {
              var _undefined70 = $unwrapTraitObject(__PUCK__value__3);
              return 4;
            } else {
              if ($unwrapTraitObject(__PUCK__value__3).kind == "EqualsEqualsToken") {
                var _undefined71 = $unwrapTraitObject(__PUCK__value__3);
                return 7;
              } else {
                if ($unwrapTraitObject(__PUCK__value__3).kind == "ExclamationEqualsToken") {
                  var _undefined72 = $unwrapTraitObject(__PUCK__value__3);
                  return 7;
                } else {
                  if ($unwrapTraitObject(__PUCK__value__3).kind == "GreaterThanToken") {
                    var _undefined73 = $unwrapTraitObject(__PUCK__value__3);
                    return 7;
                  } else {
                    if ($unwrapTraitObject(__PUCK__value__3).kind == "GreaterThanEqualsToken") {
                      var _undefined74 = $unwrapTraitObject(__PUCK__value__3);
                      return 7;
                    } else {
                      if ($unwrapTraitObject(__PUCK__value__3).kind == "LessThanToken") {
                        var _undefined75 = $unwrapTraitObject(__PUCK__value__3);
                        return 7;
                      } else {
                        if ($unwrapTraitObject(__PUCK__value__3).kind == "LessThanEqualsToken") {
                          var _undefined76 = $unwrapTraitObject(__PUCK__value__3);
                          return 7;
                        } else {
                          if ($unwrapTraitObject(__PUCK__value__3).kind == "PlusToken") {
                            var _undefined77 = $unwrapTraitObject(__PUCK__value__3);
                            return 10;
                          } else {
                            if ($unwrapTraitObject(__PUCK__value__3).kind == "MinusToken") {
                              var _undefined78 = $unwrapTraitObject(__PUCK__value__3);
                              return 10;
                            } else {
                              if ($unwrapTraitObject(__PUCK__value__3).kind == "AsteriskToken") {
                                var _undefined79 = $unwrapTraitObject(__PUCK__value__3);
                                return 20;
                              } else {
                                if ($unwrapTraitObject(__PUCK__value__3).kind == "SlashToken") {
                                  var _undefined80 = $unwrapTraitObject(__PUCK__value__3);
                                  return 20;
                                } else {
                                  if ($unwrapTraitObject(__PUCK__value__3).kind == "PercentToken") {
                                    var _undefined81 = $unwrapTraitObject(__PUCK__value__3);
                                    return 20;
                                  } else {
                                    if ($unwrapTraitObject(__PUCK__value__3).kind == "AsteriskAsteriskToken") {
                                      var _undefined82 = $unwrapTraitObject(__PUCK__value__3);
                                      return 25;
                                    } else {
                                      if (true) {
                                        var __PUCK__value__4 = __PUCK__value__3;
                                        return (0, _core.panic)("no precedence for " + SyntaxKind.name.call(self));
                                      };
                                    };
                                  };
                                };
                              };
                            };
                          };
                        };
                      };
                    };
                  };
                };
              };
            };
          };
        };
      };
    };
  };
};
var operators = exports.operators = [",", ";", ":", "::", ".", "_", "|", "{", "}", "[", "]", "(", ")", "+", "-", "*", "**", "/", "%", "=", "+=", "-=", "*=", "**=", "/=", "%=", "==", "!=", "<", "<=", ">", ">=", "=>", "->", "#"];
