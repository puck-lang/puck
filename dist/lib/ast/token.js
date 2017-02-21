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
Token.name = function name() {
  var self = this;
  var __PUCK__value__1 = self;
  var __PUCK__value__2 = __PUCK__value__1;
  if ($unwrapTraitObject(__PUCK__value__2).kind == "SimpleToken") {
    var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__2),
        _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
        token = _$unwrapTraitObject$v[0];

    return SyntaxKind.name.call(token.kind);
  } else {
    var __PUCK__value__3 = __PUCK__value__1;
    if ($unwrapTraitObject(__PUCK__value__3).kind == "Comment") {
      var _undefined = $unwrapTraitObject(__PUCK__value__3);
      return "comment";
    } else {
      var __PUCK__value__4 = __PUCK__value__1;
      if ($unwrapTraitObject(__PUCK__value__4).kind == "Identifier") {
        var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__4),
            _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
            _name = _$unwrapTraitObject2$[0].name;

        return "identifier \"" + _name + "\"";
      } else {
        var __PUCK__value__5 = __PUCK__value__1;
        if ($unwrapTraitObject(__PUCK__value__5).kind == "NumberLiteral") {
          var _undefined2 = $unwrapTraitObject(__PUCK__value__5);
          return "number";
        } else {
          var __PUCK__value__6 = __PUCK__value__1;
          if ($unwrapTraitObject(__PUCK__value__6).kind == "StringLiteral") {
            var _undefined3 = $unwrapTraitObject(__PUCK__value__6);
            return "string";
          };
        };
      };
    };
  };
};
SyntaxKind.fromText = function fromText(text) {
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
SyntaxKind.name = function name() {
  var self = this;
  var __PUCK__value__7 = self;
  var __PUCK__value__8 = __PUCK__value__7;
  if ($unwrapTraitObject(__PUCK__value__8).kind == "AsKeyword") {
    var _undefined4 = $unwrapTraitObject(__PUCK__value__8);
    return "as";
  } else {
    var __PUCK__value__9 = __PUCK__value__7;
    if ($unwrapTraitObject(__PUCK__value__9).kind == "AndKeyword") {
      var _undefined5 = $unwrapTraitObject(__PUCK__value__9);
      return "and";
    } else {
      var __PUCK__value__10 = __PUCK__value__7;
      if ($unwrapTraitObject(__PUCK__value__10).kind == "BreakKeyword") {
        var _undefined6 = $unwrapTraitObject(__PUCK__value__10);
        return "break";
      } else {
        var __PUCK__value__11 = __PUCK__value__7;
        if ($unwrapTraitObject(__PUCK__value__11).kind == "ElseKeyword") {
          var _undefined7 = $unwrapTraitObject(__PUCK__value__11);
          return "else";
        } else {
          var __PUCK__value__12 = __PUCK__value__7;
          if ($unwrapTraitObject(__PUCK__value__12).kind == "EnumKeyword") {
            var _undefined8 = $unwrapTraitObject(__PUCK__value__12);
            return "enum";
          } else {
            var __PUCK__value__13 = __PUCK__value__7;
            if ($unwrapTraitObject(__PUCK__value__13).kind == "ExportKeyword") {
              var _undefined9 = $unwrapTraitObject(__PUCK__value__13);
              return "export";
            } else {
              var __PUCK__value__14 = __PUCK__value__7;
              if ($unwrapTraitObject(__PUCK__value__14).kind == "FalseKeyword") {
                var _undefined10 = $unwrapTraitObject(__PUCK__value__14);
                return "false";
              } else {
                var __PUCK__value__15 = __PUCK__value__7;
                if ($unwrapTraitObject(__PUCK__value__15).kind == "ForKeyword") {
                  var _undefined11 = $unwrapTraitObject(__PUCK__value__15);
                  return "for";
                } else {
                  var __PUCK__value__16 = __PUCK__value__7;
                  if ($unwrapTraitObject(__PUCK__value__16).kind == "FnKeyword") {
                    var _undefined12 = $unwrapTraitObject(__PUCK__value__16);
                    return "fn";
                  } else {
                    var __PUCK__value__17 = __PUCK__value__7;
                    if ($unwrapTraitObject(__PUCK__value__17).kind == "IfKeyword") {
                      var _undefined13 = $unwrapTraitObject(__PUCK__value__17);
                      return "if";
                    } else {
                      var __PUCK__value__18 = __PUCK__value__7;
                      if ($unwrapTraitObject(__PUCK__value__18).kind == "ImplKeyword") {
                        var _undefined14 = $unwrapTraitObject(__PUCK__value__18);
                        return "impl";
                      } else {
                        var __PUCK__value__19 = __PUCK__value__7;
                        if ($unwrapTraitObject(__PUCK__value__19).kind == "ImportKeyword") {
                          var _undefined15 = $unwrapTraitObject(__PUCK__value__19);
                          return "import";
                        } else {
                          var __PUCK__value__20 = __PUCK__value__7;
                          if ($unwrapTraitObject(__PUCK__value__20).kind == "LetKeyword") {
                            var _undefined16 = $unwrapTraitObject(__PUCK__value__20);
                            return "let";
                          } else {
                            var __PUCK__value__21 = __PUCK__value__7;
                            if ($unwrapTraitObject(__PUCK__value__21).kind == "MatchKeyword") {
                              var _undefined17 = $unwrapTraitObject(__PUCK__value__21);
                              return "match";
                            } else {
                              var __PUCK__value__22 = __PUCK__value__7;
                              if ($unwrapTraitObject(__PUCK__value__22).kind == "MutKeyword") {
                                var _undefined18 = $unwrapTraitObject(__PUCK__value__22);
                                return "mut";
                              } else {
                                var __PUCK__value__23 = __PUCK__value__7;
                                if ($unwrapTraitObject(__PUCK__value__23).kind == "NotKeyword") {
                                  var _undefined19 = $unwrapTraitObject(__PUCK__value__23);
                                  return "not";
                                } else {
                                  var __PUCK__value__24 = __PUCK__value__7;
                                  if ($unwrapTraitObject(__PUCK__value__24).kind == "OrKeyword") {
                                    var _undefined20 = $unwrapTraitObject(__PUCK__value__24);
                                    return "or";
                                  } else {
                                    var __PUCK__value__25 = __PUCK__value__7;
                                    if ($unwrapTraitObject(__PUCK__value__25).kind == "ReturnKeyword") {
                                      var _undefined21 = $unwrapTraitObject(__PUCK__value__25);
                                      return "return";
                                    } else {
                                      var __PUCK__value__26 = __PUCK__value__7;
                                      if ($unwrapTraitObject(__PUCK__value__26).kind == "ThrowKeyword") {
                                        var _undefined22 = $unwrapTraitObject(__PUCK__value__26);
                                        return "throw";
                                      } else {
                                        var __PUCK__value__27 = __PUCK__value__7;
                                        if ($unwrapTraitObject(__PUCK__value__27).kind == "TrueKeyword") {
                                          var _undefined23 = $unwrapTraitObject(__PUCK__value__27);
                                          return "true";
                                        } else {
                                          var __PUCK__value__28 = __PUCK__value__7;
                                          if ($unwrapTraitObject(__PUCK__value__28).kind == "ThenKeyword") {
                                            var _undefined24 = $unwrapTraitObject(__PUCK__value__28);
                                            return "then";
                                          } else {
                                            var __PUCK__value__29 = __PUCK__value__7;
                                            if ($unwrapTraitObject(__PUCK__value__29).kind == "TraitKeyword") {
                                              var _undefined25 = $unwrapTraitObject(__PUCK__value__29);
                                              return "trait";
                                            } else {
                                              var __PUCK__value__30 = __PUCK__value__7;
                                              if ($unwrapTraitObject(__PUCK__value__30).kind == "TypeKeyword") {
                                                var _undefined26 = $unwrapTraitObject(__PUCK__value__30);
                                                return "type";
                                              } else {
                                                var __PUCK__value__31 = __PUCK__value__7;
                                                if ($unwrapTraitObject(__PUCK__value__31).kind == "WhileKeyword") {
                                                  var _undefined27 = $unwrapTraitObject(__PUCK__value__31);
                                                  return "while";
                                                } else {
                                                  var __PUCK__value__32 = __PUCK__value__7;
                                                  if ($unwrapTraitObject(__PUCK__value__32).kind == "OpenBraceToken") {
                                                    var _undefined28 = $unwrapTraitObject(__PUCK__value__32);
                                                    return "{";
                                                  } else {
                                                    var __PUCK__value__33 = __PUCK__value__7;
                                                    if ($unwrapTraitObject(__PUCK__value__33).kind == "CloseBraceToken") {
                                                      var _undefined29 = $unwrapTraitObject(__PUCK__value__33);
                                                      return "}";
                                                    } else {
                                                      var __PUCK__value__34 = __PUCK__value__7;
                                                      if ($unwrapTraitObject(__PUCK__value__34).kind == "OpenBracketToken") {
                                                        var _undefined30 = $unwrapTraitObject(__PUCK__value__34);
                                                        return "[";
                                                      } else {
                                                        var __PUCK__value__35 = __PUCK__value__7;
                                                        if ($unwrapTraitObject(__PUCK__value__35).kind == "CloseBracketToken") {
                                                          var _undefined31 = $unwrapTraitObject(__PUCK__value__35);
                                                          return "]";
                                                        } else {
                                                          var __PUCK__value__36 = __PUCK__value__7;
                                                          if ($unwrapTraitObject(__PUCK__value__36).kind == "OpenParenToken") {
                                                            var _undefined32 = $unwrapTraitObject(__PUCK__value__36);
                                                            return "(";
                                                          } else {
                                                            var __PUCK__value__37 = __PUCK__value__7;
                                                            if ($unwrapTraitObject(__PUCK__value__37).kind == "CloseParenToken") {
                                                              var _undefined33 = $unwrapTraitObject(__PUCK__value__37);
                                                              return ")";
                                                            } else {
                                                              var __PUCK__value__38 = __PUCK__value__7;
                                                              if ($unwrapTraitObject(__PUCK__value__38).kind == "BarToken") {
                                                                var _undefined34 = $unwrapTraitObject(__PUCK__value__38);
                                                                return "|";
                                                              } else {
                                                                var __PUCK__value__39 = __PUCK__value__7;
                                                                if ($unwrapTraitObject(__PUCK__value__39).kind == "CommaToken") {
                                                                  var _undefined35 = $unwrapTraitObject(__PUCK__value__39);
                                                                  return ",";
                                                                } else {
                                                                  var __PUCK__value__40 = __PUCK__value__7;
                                                                  if ($unwrapTraitObject(__PUCK__value__40).kind == "ColonToken") {
                                                                    var _undefined36 = $unwrapTraitObject(__PUCK__value__40);
                                                                    return ":";
                                                                  } else {
                                                                    var __PUCK__value__41 = __PUCK__value__7;
                                                                    if ($unwrapTraitObject(__PUCK__value__41).kind == "ColonColonToken") {
                                                                      var _undefined37 = $unwrapTraitObject(__PUCK__value__41);
                                                                      return "::";
                                                                    } else {
                                                                      var __PUCK__value__42 = __PUCK__value__7;
                                                                      if ($unwrapTraitObject(__PUCK__value__42).kind == "DotToken") {
                                                                        var _undefined38 = $unwrapTraitObject(__PUCK__value__42);
                                                                        return ".";
                                                                      } else {
                                                                        var __PUCK__value__43 = __PUCK__value__7;
                                                                        if ($unwrapTraitObject(__PUCK__value__43).kind == "HashToken") {
                                                                          var _undefined39 = $unwrapTraitObject(__PUCK__value__43);
                                                                          return "#";
                                                                        } else {
                                                                          var __PUCK__value__44 = __PUCK__value__7;
                                                                          if ($unwrapTraitObject(__PUCK__value__44).kind == "SemicolonToken") {
                                                                            var _undefined40 = $unwrapTraitObject(__PUCK__value__44);
                                                                            return ";";
                                                                          } else {
                                                                            var __PUCK__value__45 = __PUCK__value__7;
                                                                            if ($unwrapTraitObject(__PUCK__value__45).kind == "UnderscoreToken") {
                                                                              var _undefined41 = $unwrapTraitObject(__PUCK__value__45);
                                                                              return "_";
                                                                            } else {
                                                                              var __PUCK__value__46 = __PUCK__value__7;
                                                                              if ($unwrapTraitObject(__PUCK__value__46).kind == "LessThanToken") {
                                                                                var _undefined42 = $unwrapTraitObject(__PUCK__value__46);
                                                                                return "<";
                                                                              } else {
                                                                                var __PUCK__value__47 = __PUCK__value__7;
                                                                                if ($unwrapTraitObject(__PUCK__value__47).kind == "GreaterThanToken") {
                                                                                  var _undefined43 = $unwrapTraitObject(__PUCK__value__47);
                                                                                  return ">";
                                                                                } else {
                                                                                  var __PUCK__value__48 = __PUCK__value__7;
                                                                                  if ($unwrapTraitObject(__PUCK__value__48).kind == "LessThanEqualsToken") {
                                                                                    var _undefined44 = $unwrapTraitObject(__PUCK__value__48);
                                                                                    return "<=";
                                                                                  } else {
                                                                                    var __PUCK__value__49 = __PUCK__value__7;
                                                                                    if ($unwrapTraitObject(__PUCK__value__49).kind == "GreaterThanEqualsToken") {
                                                                                      var _undefined45 = $unwrapTraitObject(__PUCK__value__49);
                                                                                      return ">=";
                                                                                    } else {
                                                                                      var __PUCK__value__50 = __PUCK__value__7;
                                                                                      if ($unwrapTraitObject(__PUCK__value__50).kind == "EqualsEqualsToken") {
                                                                                        var _undefined46 = $unwrapTraitObject(__PUCK__value__50);
                                                                                        return "==";
                                                                                      } else {
                                                                                        var __PUCK__value__51 = __PUCK__value__7;
                                                                                        if ($unwrapTraitObject(__PUCK__value__51).kind == "ExclamationEqualsToken") {
                                                                                          var _undefined47 = $unwrapTraitObject(__PUCK__value__51);
                                                                                          return "!=";
                                                                                        } else {
                                                                                          var __PUCK__value__52 = __PUCK__value__7;
                                                                                          if ($unwrapTraitObject(__PUCK__value__52).kind == "EqualsGreaterThanToken") {
                                                                                            var _undefined48 = $unwrapTraitObject(__PUCK__value__52);
                                                                                            return "=>";
                                                                                          } else {
                                                                                            var __PUCK__value__53 = __PUCK__value__7;
                                                                                            if ($unwrapTraitObject(__PUCK__value__53).kind == "MinusGreaterThanToken") {
                                                                                              var _undefined49 = $unwrapTraitObject(__PUCK__value__53);
                                                                                              return "->";
                                                                                            } else {
                                                                                              var __PUCK__value__54 = __PUCK__value__7;
                                                                                              if ($unwrapTraitObject(__PUCK__value__54).kind == "PlusToken") {
                                                                                                var _undefined50 = $unwrapTraitObject(__PUCK__value__54);
                                                                                                return "+";
                                                                                              } else {
                                                                                                var __PUCK__value__55 = __PUCK__value__7;
                                                                                                if ($unwrapTraitObject(__PUCK__value__55).kind == "MinusToken") {
                                                                                                  var _undefined51 = $unwrapTraitObject(__PUCK__value__55);
                                                                                                  return "-";
                                                                                                } else {
                                                                                                  var __PUCK__value__56 = __PUCK__value__7;
                                                                                                  if ($unwrapTraitObject(__PUCK__value__56).kind == "AsteriskToken") {
                                                                                                    var _undefined52 = $unwrapTraitObject(__PUCK__value__56);
                                                                                                    return "*";
                                                                                                  } else {
                                                                                                    var __PUCK__value__57 = __PUCK__value__7;
                                                                                                    if ($unwrapTraitObject(__PUCK__value__57).kind == "AsteriskAsteriskToken") {
                                                                                                      var _undefined53 = $unwrapTraitObject(__PUCK__value__57);
                                                                                                      return "**";
                                                                                                    } else {
                                                                                                      var __PUCK__value__58 = __PUCK__value__7;
                                                                                                      if ($unwrapTraitObject(__PUCK__value__58).kind == "SlashToken") {
                                                                                                        var _undefined54 = $unwrapTraitObject(__PUCK__value__58);
                                                                                                        return "/";
                                                                                                      } else {
                                                                                                        var __PUCK__value__59 = __PUCK__value__7;
                                                                                                        if ($unwrapTraitObject(__PUCK__value__59).kind == "PercentToken") {
                                                                                                          var _undefined55 = $unwrapTraitObject(__PUCK__value__59);
                                                                                                          return "%";
                                                                                                        } else {
                                                                                                          var __PUCK__value__60 = __PUCK__value__7;
                                                                                                          if ($unwrapTraitObject(__PUCK__value__60).kind == "EqualsToken") {
                                                                                                            var _undefined56 = $unwrapTraitObject(__PUCK__value__60);
                                                                                                            return "=";
                                                                                                          } else {
                                                                                                            var __PUCK__value__61 = __PUCK__value__7;
                                                                                                            if ($unwrapTraitObject(__PUCK__value__61).kind == "PlusEqualsToken") {
                                                                                                              var _undefined57 = $unwrapTraitObject(__PUCK__value__61);
                                                                                                              return "+=";
                                                                                                            } else {
                                                                                                              var __PUCK__value__62 = __PUCK__value__7;
                                                                                                              if ($unwrapTraitObject(__PUCK__value__62).kind == "MinusEqualsToken") {
                                                                                                                var _undefined58 = $unwrapTraitObject(__PUCK__value__62);
                                                                                                                return "-=";
                                                                                                              } else {
                                                                                                                var __PUCK__value__63 = __PUCK__value__7;
                                                                                                                if ($unwrapTraitObject(__PUCK__value__63).kind == "AsteriskEqualsToken") {
                                                                                                                  var _undefined59 = $unwrapTraitObject(__PUCK__value__63);
                                                                                                                  return "*=";
                                                                                                                } else {
                                                                                                                  var __PUCK__value__64 = __PUCK__value__7;
                                                                                                                  if ($unwrapTraitObject(__PUCK__value__64).kind == "AsteriskAsteriskEqualsToken") {
                                                                                                                    var _undefined60 = $unwrapTraitObject(__PUCK__value__64);
                                                                                                                    return "**=";
                                                                                                                  } else {
                                                                                                                    var __PUCK__value__65 = __PUCK__value__7;
                                                                                                                    if ($unwrapTraitObject(__PUCK__value__65).kind == "SlashEqualsToken") {
                                                                                                                      var _undefined61 = $unwrapTraitObject(__PUCK__value__65);
                                                                                                                      return "/=";
                                                                                                                    } else {
                                                                                                                      var __PUCK__value__66 = __PUCK__value__7;
                                                                                                                      if ($unwrapTraitObject(__PUCK__value__66).kind == "PercentEqualsToken") {
                                                                                                                        var _undefined62 = $unwrapTraitObject(__PUCK__value__66);
                                                                                                                        return "%=";
                                                                                                                      } else {
                                                                                                                        var __PUCK__value__67 = __PUCK__value__7;
                                                                                                                        if ($unwrapTraitObject(__PUCK__value__67).kind == "NewlineToken") {
                                                                                                                          var _undefined63 = $unwrapTraitObject(__PUCK__value__67);
                                                                                                                          return "new line";
                                                                                                                        } else {
                                                                                                                          var __PUCK__value__68 = __PUCK__value__7;
                                                                                                                          if ($unwrapTraitObject(__PUCK__value__68).kind == "EndOfFileToken") {
                                                                                                                            var _undefined64 = $unwrapTraitObject(__PUCK__value__68);
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
SyntaxKind.precedence = function precedence() {
  var self = this;
  var __PUCK__value__69 = self;
  var __PUCK__value__70 = __PUCK__value__69;
  if ($unwrapTraitObject(__PUCK__value__70).kind == "EqualsToken") {
    var _undefined65 = $unwrapTraitObject(__PUCK__value__70);
    return 1;
  } else {
    var __PUCK__value__71 = __PUCK__value__69;
    if ($unwrapTraitObject(__PUCK__value__71).kind == "PlusEqualsToken") {
      var _undefined66 = $unwrapTraitObject(__PUCK__value__71);
      return 1.1;
    } else {
      var __PUCK__value__72 = __PUCK__value__69;
      if ($unwrapTraitObject(__PUCK__value__72).kind == "MinusEqualsToken") {
        var _undefined67 = $unwrapTraitObject(__PUCK__value__72);
        return 1.1;
      } else {
        var __PUCK__value__73 = __PUCK__value__69;
        if ($unwrapTraitObject(__PUCK__value__73).kind == "OrKeyword") {
          var _undefined68 = $unwrapTraitObject(__PUCK__value__73);
          return 2;
        } else {
          var __PUCK__value__74 = __PUCK__value__69;
          if ($unwrapTraitObject(__PUCK__value__74).kind == "AndKeyword") {
            var _undefined69 = $unwrapTraitObject(__PUCK__value__74);
            return 3;
          } else {
            var __PUCK__value__75 = __PUCK__value__69;
            if ($unwrapTraitObject(__PUCK__value__75).kind == "NotKeyword") {
              var _undefined70 = $unwrapTraitObject(__PUCK__value__75);
              return 4;
            } else {
              var __PUCK__value__76 = __PUCK__value__69;
              if ($unwrapTraitObject(__PUCK__value__76).kind == "EqualsEqualsToken") {
                var _undefined71 = $unwrapTraitObject(__PUCK__value__76);
                return 7;
              } else {
                var __PUCK__value__77 = __PUCK__value__69;
                if ($unwrapTraitObject(__PUCK__value__77).kind == "ExclamationEqualsToken") {
                  var _undefined72 = $unwrapTraitObject(__PUCK__value__77);
                  return 7;
                } else {
                  var __PUCK__value__78 = __PUCK__value__69;
                  if ($unwrapTraitObject(__PUCK__value__78).kind == "GreaterThanToken") {
                    var _undefined73 = $unwrapTraitObject(__PUCK__value__78);
                    return 7;
                  } else {
                    var __PUCK__value__79 = __PUCK__value__69;
                    if ($unwrapTraitObject(__PUCK__value__79).kind == "GreaterThanEqualsToken") {
                      var _undefined74 = $unwrapTraitObject(__PUCK__value__79);
                      return 7;
                    } else {
                      var __PUCK__value__80 = __PUCK__value__69;
                      if ($unwrapTraitObject(__PUCK__value__80).kind == "LessThanToken") {
                        var _undefined75 = $unwrapTraitObject(__PUCK__value__80);
                        return 7;
                      } else {
                        var __PUCK__value__81 = __PUCK__value__69;
                        if ($unwrapTraitObject(__PUCK__value__81).kind == "LessThanEqualsToken") {
                          var _undefined76 = $unwrapTraitObject(__PUCK__value__81);
                          return 7;
                        } else {
                          var __PUCK__value__82 = __PUCK__value__69;
                          if ($unwrapTraitObject(__PUCK__value__82).kind == "PlusToken") {
                            var _undefined77 = $unwrapTraitObject(__PUCK__value__82);
                            return 10;
                          } else {
                            var __PUCK__value__83 = __PUCK__value__69;
                            if ($unwrapTraitObject(__PUCK__value__83).kind == "MinusToken") {
                              var _undefined78 = $unwrapTraitObject(__PUCK__value__83);
                              return 10;
                            } else {
                              var __PUCK__value__84 = __PUCK__value__69;
                              if ($unwrapTraitObject(__PUCK__value__84).kind == "AsteriskToken") {
                                var _undefined79 = $unwrapTraitObject(__PUCK__value__84);
                                return 20;
                              } else {
                                var __PUCK__value__85 = __PUCK__value__69;
                                if ($unwrapTraitObject(__PUCK__value__85).kind == "SlashToken") {
                                  var _undefined80 = $unwrapTraitObject(__PUCK__value__85);
                                  return 20;
                                } else {
                                  var __PUCK__value__86 = __PUCK__value__69;
                                  if ($unwrapTraitObject(__PUCK__value__86).kind == "PercentToken") {
                                    var _undefined81 = $unwrapTraitObject(__PUCK__value__86);
                                    return 20;
                                  } else {
                                    var __PUCK__value__87 = __PUCK__value__69;
                                    if ($unwrapTraitObject(__PUCK__value__87).kind == "AsteriskAsteriskToken") {
                                      var _undefined82 = $unwrapTraitObject(__PUCK__value__87);
                                      return 25;
                                    } else {
                                      var __PUCK__value__88 = __PUCK__value__69;
                                      if (true) {
                                        var __PUCK__value__89 = __PUCK__value__88;
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
