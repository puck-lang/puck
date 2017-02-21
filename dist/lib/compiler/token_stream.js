'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TokenStream = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _ast = require('./../ast/ast');

var _token5 = require('./../ast/token');

var _span = require('./../ast/span');

var _input_stream = require('./input_stream');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};
var TokenStream = exports.TokenStream = function TokenStream(object) {
  return object;
};
TokenStream._new = function _new(input) {
  return {
    input: input,
    current: _core.None,
    currentDummy: _core.None,
    inImport: false
  };
};
TokenStream.peek = function peek() {
  var returnDummy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  var self = this;
  if (returnDummy) {
    var __PUCK__value__1 = self.currentDummy;
    if ($unwrapTraitObject(__PUCK__value__1).kind == "Some") {
      var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__1),
          _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
          _token = _$unwrapTraitObject$v[0];

      return _token;
    };
  };
  var __PUCK__value__2 = self.current;
  if ($unwrapTraitObject(__PUCK__value__2).kind == "Some") {
    var _$unwrapTraitObject2 = $unwrapTraitObject(__PUCK__value__2),
        _$unwrapTraitObject2$ = _slicedToArray(_$unwrapTraitObject2.value, 1),
        _token2 = _$unwrapTraitObject2$[0];

    if (!isDummy(_token2)) {
      return _token2;
    } else {
      self.currentDummy = self.current;
      if (returnDummy) {
        return _token2;
      };
    };
  };
  var token = TokenStream._readNext.call(self);
  self.current = (0, _core.Some)(token);
  while (isDummy(token) && !returnDummy) {
    token = TokenStream._readNext.call(self);
    self.currentDummy = self.current;
    self.current = (0, _core.Some)(token);
  };
  return token;
};
TokenStream.next = function next() {
  var returnDummy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  var self = this;
  var __PUCK__value__3 = self.currentDummy;
  if ($unwrapTraitObject(__PUCK__value__3).kind == "Some") {
    var _$unwrapTraitObject3 = $unwrapTraitObject(__PUCK__value__3),
        _$unwrapTraitObject3$ = _slicedToArray(_$unwrapTraitObject3.value, 1),
        _token3 = _$unwrapTraitObject3$[0];

    self.currentDummy = _core.None;
    if (returnDummy) {
      return _token3;
    };
  };
  var __PUCK__value__4 = self.current;
  if ($unwrapTraitObject(__PUCK__value__4).kind == "Some") {
    var _$unwrapTraitObject4 = $unwrapTraitObject(__PUCK__value__4),
        _$unwrapTraitObject4$ = _slicedToArray(_$unwrapTraitObject4.value, 1),
        _token4 = _$unwrapTraitObject4$[0];

    self.current = _core.None;
    if (!isDummy(_token4) || returnDummy) {
      return _token4;
    };
  };
  var token = TokenStream._readNext.call(self);
  while (isDummy(token) && !returnDummy) {
    token = TokenStream._readNext.call(self);
  };
  return token;
};
TokenStream.eof = function eof() {
  var self = this;
  var __PUCK__value__5 = TokenStream.peek.call(self);
  var __PUCK__value__6 = __PUCK__value__5;
  if ($unwrapTraitObject(__PUCK__value__6).kind == "SimpleToken" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__6).value)[$unwrapTraitObject(0)]).kind).kind == "EndOfFileToken") {
    var _$unwrapTraitObject5 = $unwrapTraitObject(__PUCK__value__6),
        _$unwrapTraitObject5$ = _slicedToArray(_$unwrapTraitObject5.value, 1),
        _undefined2 = _$unwrapTraitObject5$[0].kind;

    return true;
  } else {
    var __PUCK__value__7 = __PUCK__value__5;
    if (true) {
      var __PUCK__value__8 = __PUCK__value__7;
      return false;
    };
  };
};
TokenStream.croak = function croak(reason) {
  var self = this;
  return _input_stream.InputStream.croak.call(self.input, reason);
};
TokenStream._tryParseOperator = function _tryParseOperator() {
  var self = this;
  var length = 0;
  var searchString = "";
  var found = void 0;
  while (length < longestOperator) {
    var ch = _input_stream.InputStream.peek.call(self.input, length);
    if (isWhitespaceOrNewline(ch)) {
      break;
    };
    searchString += ch;
    var hasMatches = _core.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({ type: '$impl_lib/stdlib/core.puck:Iterable$List', value: _token5.operators, $isTraitObject: true }, function (token) {
      if (token.length < length) {
        return false;
      } else {
        return token.substr(0, length + 1) == searchString;
      };
    }).value.length > 0;
    if (hasMatches) {
      length += 1;
      found = searchString;
    } else {
      break;
    };
  };
  return _core.Option.map.call(_token5.SyntaxKind.fromText(found), function (kind) {
    var start = _input_stream.InputStream.position.call(self.input);
    var i = 0;
    while (i < length) {
      _input_stream.InputStream.next.call(self.input);
      i += 1;
    };
    var end = _input_stream.InputStream.position.call(self.input);
    return {
      kind: kind,
      span: {
        start: start,
        end: end
      }
    };
  });
};
TokenStream._readWhile = function _readWhile(predicate) {
  var self = this;
  var str = "";
  while (!_input_stream.InputStream.eof.call(self.input) && predicate(_input_stream.InputStream.peek.call(self.input))) {
    str += _input_stream.InputStream.next.call(self.input);
  };
  return str;
};
TokenStream._readNumber = function _readNumber() {
  var self = this;
  var hasDot = false;
  var start = _input_stream.InputStream.position.call(self.input);
  var number = TokenStream._readWhile.call(self, function (ch) {
    if (ch == ".") {
      if (hasDot || !isDigit(_input_stream.InputStream.peek.call(self.input, 1))) {
        return false;
      } else {
        hasDot = true;
        return true;
      };
    } else {
      return isDigit(ch);
    };
  });
  var end = _input_stream.InputStream.position.call(self.input);
  var span = {
    start: start,
    end: end
  };
  return {
    value: _core.Result.unwrap.call(_core.Num.parse(number)),
    span: {
      start: start,
      end: end
    }
  };
};
TokenStream._readIdentifier = function _readIdentifier() {
  var self = this;
  var start = _input_stream.InputStream.position.call(self.input);
  var id = TokenStream._readWhile.call(self, isId);
  var end = _input_stream.InputStream.position.call(self.input);
  return {
    name: id,
    span: {
      start: start,
      end: end
    }
  };
};
TokenStream._readIdentifierOrKeyword = function _readIdentifierOrKeyword() {
  var self = this;
  var start = _input_stream.InputStream.position.call(self.input);
  var id = TokenStream._readWhile.call(self, isId);
  var end = _input_stream.InputStream.position.call(self.input);
  var span = {
    start: start,
    end: end
  };
  if (id == "import") {
    self.inImport = true;
    return _token5.Token.SimpleToken({
      kind: _token5.SyntaxKind.ImportKeyword,
      span: span
    });
  } else {
    if (id == "as") {
      self.inImport = false;
      return _token5.Token.SimpleToken({
        kind: _token5.SyntaxKind.AsKeyword,
        span: span
      });
    } else {
      var __PUCK__value__9 = _token5.SyntaxKind.fromText(id);
      if ($unwrapTraitObject(__PUCK__value__9).kind == "Some") {
        var _$unwrapTraitObject6 = $unwrapTraitObject(__PUCK__value__9),
            _$unwrapTraitObject6$ = _slicedToArray(_$unwrapTraitObject6.value, 1),
            kind = _$unwrapTraitObject6$[0];

        return _token5.Token.SimpleToken({
          kind: kind,
          span: span
        });
      } else {
        return _token5.Token.Identifier({
          name: id,
          span: span
        });
      };
    };
  };
};
TokenStream._readString = function _readString() {
  var self = this;
  var escaped = false;
  var parts = [];
  var str = "";
  var start = _input_stream.InputStream.position.call(self.input);
  var delimiter = _input_stream.InputStream.next.call(self.input);
  while (!_input_stream.InputStream.eof.call(self.input)) {
    var ch = _input_stream.InputStream.next.call(self.input);
    if (escaped) {
      if (ch == "$") {
        str += "$";
      } else {
        if (ch == "n") {
          str += "\n";
        } else {
          if (ch == "r") {
            str += "\r";
          } else {
            if (ch == "t") {
              str += "\t";
            } else {
              if (ch == "'") {
                str += "'";
              } else {
                if (ch == "\"") {
                  str += "\"";
                } else {
                  if (ch == "\\") {
                    str += "\\";
                  } else {
                    if (ch == "\n") {
                      _js._null;
                    } else {
                      _input_stream.InputStream.croak.call(self.input, "Invalid escape character " + ch + "");
                    };
                  };
                };
              };
            };
          };
        };
      };
      escaped = false;
    } else {
      if (ch == "\\") {
        escaped = true;
      } else {
        if (ch == "$" && isIdStart(_input_stream.InputStream.peek.call(self.input)) && !self.inImport) {
          var _end = _input_stream.InputStream.position.call(self.input);
          parts.push(_ast.StringLiteralPart.Literal({
            span: {
              start: start,
              end: _end
            },
            value: str
          }));
          parts.push(_ast.StringLiteralPart.Identifier(TokenStream._readIdentifier.call(self)));
          str = "";
          start = _input_stream.InputStream.position.call(self.input);
        } else {
          if (ch == delimiter) {
            break;
          } else {
            str += ch;
          };
        };
      };
    };
  };
  var end = _input_stream.InputStream.position.call(self.input);
  parts.push(_ast.StringLiteralPart.Literal({
    span: {
      start: start,
      end: end
    },
    value: str
  }));
  return { parts: parts };
};
TokenStream._readComment = function _readComment() {
  var self = this;
  var start = _input_stream.InputStream.position.call(self.input);
  _input_stream.InputStream.next.call(self.input);
  _input_stream.InputStream.next.call(self.input);
  TokenStream._readWhile.call(self, isWhitespace);
  var comment = TokenStream._readWhile.call(self, function (ch) {
    return ch != "\n";
  });
  _input_stream.InputStream.next.call(self.input);
  var end = _input_stream.InputStream.position.call(self.input);
  return {
    text: comment,
    span: {
      start: start,
      end: end
    }
  };
};
TokenStream._readNext = function _readNext() {
  var self = this;
  TokenStream._readWhile.call(self, isWhitespace);
  if (_input_stream.InputStream.eof.call(self.input)) {
    var position = _input_stream.InputStream.position.call(self.input);
    return _token5.Token.SimpleToken({
      kind: _token5.SyntaxKind.EndOfFileToken,
      span: {
        start: position,
        end: position
      }
    });
  } else {
    var ch = _input_stream.InputStream.peek.call(self.input);
    if (isNewline(ch)) {
      var start = _input_stream.InputStream.position.call(self.input);
      _input_stream.InputStream.next.call(self.input);
      var end = _input_stream.InputStream.position.call(self.input);
      return _token5.Token.SimpleToken({
        kind: _token5.SyntaxKind.NewlineToken,
        span: {
          start: start,
          end: end
        }
      });
    } else {
      if (ch == "/" && _input_stream.InputStream.peek.call(self.input, 1) == "/") {
        return _token5.Token.Comment(TokenStream._readComment.call(self));
      } else {
        if (ch == "'" || ch == "\"") {
          return _token5.Token.StringLiteral(TokenStream._readString.call(self));
        } else {
          if (isDigit(ch)) {
            return _token5.Token.NumberLiteral(TokenStream._readNumber.call(self));
          } else {
            if (isIdStart(ch)) {
              return TokenStream._readIdentifierOrKeyword.call(self);
            } else {
              var __PUCK__value__10 = TokenStream._tryParseOperator.call(self);
              if ($unwrapTraitObject(__PUCK__value__10).kind == "Some") {
                var _$unwrapTraitObject7 = $unwrapTraitObject(__PUCK__value__10),
                    _$unwrapTraitObject7$ = _slicedToArray(_$unwrapTraitObject7.value, 1),
                    operator = _$unwrapTraitObject7$[0];

                return _token5.Token.SimpleToken(operator);
              } else {
                return _input_stream.InputStream.croak.call(self.input, "Unexpected token: " + ch + "");
              };
            };
          };
        };
      };
    };
  };
};
var longestOperator = _token5.operators.reduce(function (longest, curr) {
  if ($unwrapTraitObject(curr).length > longest) {
    return $unwrapTraitObject(curr).length;
  } else {
    return longest;
  };
}, 0);
function isDummy(token) {
  var __PUCK__value__11 = token;
  var __PUCK__value__12 = __PUCK__value__11;
  if ($unwrapTraitObject(__PUCK__value__12).kind == "SimpleToken" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($unwrapTraitObject(__PUCK__value__12).value)[$unwrapTraitObject(0)]).kind).kind == "NewlineToken") {
    var _$unwrapTraitObject8 = $unwrapTraitObject(__PUCK__value__12),
        _$unwrapTraitObject8$ = _slicedToArray(_$unwrapTraitObject8.value, 1),
        _undefined3 = _$unwrapTraitObject8$[0].kind;

    return true;
  } else {
    var __PUCK__value__13 = __PUCK__value__11;
    if ($unwrapTraitObject(__PUCK__value__13).kind == "Comment") {
      var _undefined4 = $unwrapTraitObject(__PUCK__value__13);
      return true;
    } else {
      var __PUCK__value__14 = __PUCK__value__11;
      if (true) {
        var __PUCK__value__15 = __PUCK__value__14;
        return false;
      };
    };
  };
};
function isDigit(ch) {
  return $unwrapTraitObject((0, _js.RegExp)("^[0-9]$")).test(ch);
};
function isIdStart(ch) {
  return $unwrapTraitObject((0, _js.RegExp)("^[a-z_]$", "i")).test(ch);
};
function isId(ch) {
  return isIdStart(ch) || isDigit(ch);
};
function isNewline(ch) {
  return ch == "\n";
};
function isWhitespace(ch) {
  return ch == " ";
};
function isWhitespaceOrNewline(ch) {
  return isNewline(ch) || isWhitespace(ch);
}
