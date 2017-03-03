'use strict';

const $unwrapTraitObject = obj => obj && (obj.$isTraitObject ? obj.value : obj);
exports.TokenStreamundefined;
const $puck_1 = require("puck-lang/dist/lib/stdlib/core");
const $puck_2 = require("puck-lang/dist/lib/stdlib/js");
const $puck_3 = require("./../ast/ast");
const $puck_4 = require("./../ast/token");
const $puck_5 = require("./../ast/span");
const $puck_6 = require("./input_stream");
var TokenStream = exports.TokenStream = (object) => object;
TokenStream._new = function (input) {
  return {
    input: input,
    current: $puck_1.None,
    currentDummy: $puck_1.None,
    inImport: false,
  };
};
TokenStream.peek = function (returnDummy = false) {
  let self = this;
  if (returnDummy) {
    let $puck_7 = self.currentDummy;
    if ($puck_7.kind === "Some") {
      let {value: token} = $puck_7;
      return token;
    };
  };
  let $puck_8 = self.current;
  if ($puck_8.kind === "Some") {
    let {value: token} = $puck_8;
    if ((!isDummy(token))) {
      return token;
    }
    else {
      self.currentDummy = self.current;
      if (returnDummy) {
        return token;
      };
    };
  };
  let token = TokenStream._readNext.call(self);
  self.current = $puck_1.Some(token);
  while ((isDummy(token) && !returnDummy)) {
    token = TokenStream._readNext.call(self);
    self.currentDummy = self.current;
    self.current = $puck_1.Some(token);
  };
  return token;
};
TokenStream.next = function (returnDummy = false) {
  let self = this;
  let $puck_9 = self.currentDummy;
  if ($puck_9.kind === "Some") {
    let {value: token} = $puck_9;
    self.currentDummy = $puck_1.None;
    if (returnDummy) {
      return token;
    };
  };
  let $puck_10 = self.current;
  if ($puck_10.kind === "Some") {
    let {value: token} = $puck_10;
    self.current = $puck_1.None;
    if ((!isDummy(token) || returnDummy)) {
      return token;
    };
  };
  let token = TokenStream._readNext.call(self);
  while ((isDummy(token) && !returnDummy)) {
    token = TokenStream._readNext.call(self);
  };
  return token;
};
TokenStream.eof = function () {
  let self = this;
  let $puck_11 = TokenStream.peek.call(self);
  if (($unwrapTraitObject($puck_11).kind === "SimpleToken" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_11).value).kind).kind === "EndOfFileToken")) {
    let {value: {}} = $unwrapTraitObject($puck_11);
    return true;
  }
  else {
    if (true) {
      $puck_11;
      return false;
    };
  };
};
TokenStream.croak = function (reason) {
  const self = this;
  return $puck_6.InputStream.croak.call(self.input, reason);
};
TokenStream._tryParseOperator = function () {
  let self = this;
  let length = 0;
  let searchString = "";
  let found;
  while (length < longestOperator) {
    const ch = $puck_6.InputStream.peek.call(self.input, length);
    if (isWhitespaceOrNewline(ch)) {
      break    };
    searchString += ch;
    let $puck_12 = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].filter.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_4.operators, $isTraitObject: true}, function (token) {
      if ($puck_1.String.size.call(token) < length) {
        return false;
      }
      else {
        return $puck_1.String.startsWith.call(token, searchString);
      };
    })
;
    const hasMatches = $puck_1.Iterable["$impl_lib/stdlib/core.puck:Iterable$List"].size.call({type: '$impl_lib/stdlib/core.puck:Iterable$List', value: $puck_1.Iterable[$puck_12.type].toList.call($puck_12), $isTraitObject: true}) > 0;
    if (hasMatches) {
      length += 1;
      found = searchString;
    }
    else {
      break    };
  };
  return $puck_1.Option.map.call($puck_4.SyntaxKind.fromText(found), function (kind) {
    const start = $puck_6.InputStream.position.call(self.input);
    let i = 0;
    while (i < length) {
      $puck_6.InputStream.next.call(self.input);
      i += 1;
    };
    const end = $puck_6.InputStream.position.call(self.input);
    return {
      kind: kind,
      span: {
      start: start,
      end: end,
    },
    };
  });
};
TokenStream._readWhile = function (predicate) {
  let self = this;
  let str = "";
  while ((!$puck_6.InputStream.eof.call(self.input) && predicate($puck_6.InputStream.peek.call(self.input)))) {
    str += $puck_6.InputStream.next.call(self.input);
  };
  return str;
};
TokenStream._readNumber = function () {
  let self = this;
  let hasDot = false;
  const start = $puck_6.InputStream.position.call(self.input);
  const number = TokenStream._readWhile.call(self, function (ch) {
    if (ch === ".") {
      if ((hasDot || !isDigit($puck_6.InputStream.peek.call(self.input, 1)))) {
        return false;
      }
      else {
        hasDot = true;
        return true;
      };
    }
    else {
      return isDigit(ch);
    };
  });
  const end = $puck_6.InputStream.position.call(self.input);
  const span = {
    start: start,
    end: end,
  };
  return {
    value: $puck_1.Result.unwrap.call($puck_1.Num.parse(number)),
    span: {
    start: start,
    end: end,
  },
  };
};
TokenStream._readIdentifier = function () {
  let self = this;
  const start = $puck_6.InputStream.position.call(self.input);
  const id = TokenStream._readWhile.call(self, isId);
  const end = $puck_6.InputStream.position.call(self.input);
  return {
    name: id,
    span: {
    start: start,
    end: end,
  },
  };
};
TokenStream._readIdentifierOrKeyword = function () {
  let self = this;
  const start = $puck_6.InputStream.position.call(self.input);
  const id = TokenStream._readWhile.call(self, isId);
  const end = $puck_6.InputStream.position.call(self.input);
  const span = {
    start: start,
    end: end,
  };
  if (id === "import") {
    self.inImport = true;
    return $puck_4.Token.SimpleToken({
      kind: $puck_4.SyntaxKind.ImportKeyword,
      span: span,
    });
  }
  else {
    if (id === "as") {
      self.inImport = false;
      return $puck_4.Token.SimpleToken({
        kind: $puck_4.SyntaxKind.AsKeyword,
        span: span,
      });
    }
    else {
      let $puck_13 = $puck_4.SyntaxKind.fromText(id);
      if ($puck_13.kind === "Some") {
        let {value: kind} = $puck_13;
        return $puck_4.Token.SimpleToken({
          kind: kind,
          span: span,
        });
      }
      else {
        return $puck_4.Token.Identifier({
          name: id,
          span: span,
        });
      };
    };
  };
};
TokenStream._readString = function () {
  let self = this;
  let escaped = false;
  let parts = [];
  let str = "";
  let start = $puck_6.InputStream.position.call(self.input);
  const delimiter = $puck_6.InputStream.next.call(self.input);
  while ((!$puck_6.InputStream.eof.call(self.input))) {
    const ch = $puck_6.InputStream.next.call(self.input);
    if (escaped) {
      if (ch === "$") {
        str += "$";
      }
      else {
        if (ch === "n") {
          str += "\n";
        }
        else {
          if (ch === "r") {
            str += "\r";
          }
          else {
            if (ch === "t") {
              str += "\t";
            }
            else {
              if (ch === "'") {
                str += "'";
              }
              else {
                if (ch === "\"") {
                  str += "\"";
                }
                else {
                  if (ch === "\\") {
                    str += "\\";
                  }
                  else {
                    if (ch === "\n") {
                      $puck_2._null;
                    }
                    else {
                      $puck_6.InputStream.croak.call(self.input, "Invalid escape character " + ch + "");
                    };
                  };
                };
              };
            };
          };
        };
      };
      escaped = false;
    }
    else {
      if (ch === "\\") {
        escaped = true;
      }
      else {
        if ((ch === "$" && isIdStart($puck_6.InputStream.peek.call(self.input)) && (!self.inImport))) {
          const end = $puck_6.InputStream.position.call(self.input);
          $puck_1.List.push.call(parts, $puck_3.StringLiteralPart.Literal({
            span: {
            start: start,
            end: end,
          },
            value: str,
          }));
          $puck_1.List.push.call(parts, $puck_3.StringLiteralPart.Identifier(TokenStream._readIdentifier.call(self)));
          str = "";
          start = $puck_6.InputStream.position.call(self.input);
        }
        else {
          if (ch === delimiter) {
            break          }
          else {
            str += ch;
          };
        };
      };
    };
  };
  const end = $puck_6.InputStream.position.call(self.input);
  $puck_1.List.push.call(parts, $puck_3.StringLiteralPart.Literal({
    span: {
    start: start,
    end: end,
  },
    value: str,
  }));
  return {parts: parts};
};
TokenStream._readComment = function () {
  let self = this;
  const start = $puck_6.InputStream.position.call(self.input);
  $puck_6.InputStream.next.call(self.input);
  $puck_6.InputStream.next.call(self.input);
  TokenStream._readWhile.call(self, isWhitespace);
  const comment = TokenStream._readWhile.call(self, function (ch) {
    return ch !== "\n";
  });
  $puck_6.InputStream.next.call(self.input);
  const end = $puck_6.InputStream.position.call(self.input);
  return {
    text: comment,
    span: {
    start: start,
    end: end,
  },
  };
};
TokenStream._readNext = function () {
  let self = this;
  TokenStream._readWhile.call(self, isWhitespace);
  if ($puck_6.InputStream.eof.call(self.input)) {
    const position = $puck_6.InputStream.position.call(self.input);
    return $puck_4.Token.SimpleToken({
      kind: $puck_4.SyntaxKind.EndOfFileToken,
      span: {
      start: position,
      end: position,
    },
    });
  }
  else {
    const ch = $puck_6.InputStream.peek.call(self.input);
    if (isNewline(ch)) {
      const start = $puck_6.InputStream.position.call(self.input);
      $puck_6.InputStream.next.call(self.input);
      const end = $puck_6.InputStream.position.call(self.input);
      return $puck_4.Token.SimpleToken({
        kind: $puck_4.SyntaxKind.NewlineToken,
        span: {
        start: start,
        end: end,
      },
      });
    }
    else {
      if ((ch === "/" && $puck_6.InputStream.peek.call(self.input, 1) === "/")) {
        return $puck_4.Token.Comment(TokenStream._readComment.call(self));
      }
      else {
        if ((ch === "'" || ch === "\"")) {
          return $puck_4.Token.StringLiteral(TokenStream._readString.call(self));
        }
        else {
          if (isDigit(ch)) {
            return $puck_4.Token.NumberLiteral(TokenStream._readNumber.call(self));
          }
          else {
            if (isIdStart(ch)) {
              return TokenStream._readIdentifierOrKeyword.call(self);
            }
            else {
              let $puck_14 = TokenStream._tryParseOperator.call(self);
              if ($puck_14.kind === "Some") {
                let {value: operator} = $puck_14;
                return $puck_4.Token.SimpleToken(operator);
              }
              else {
                return $puck_6.InputStream.croak.call(self.input, "Unexpected token: " + ch + "");
              };
            };
          };
        };
      };
    };
  };
};
let $puck_15 = $puck_1.IntoIterator["$impl_lib/stdlib/core.puck:IntoIterator$List"].iter.call({type: '$impl_lib/stdlib/core.puck:IntoIterator$List', value: $puck_4.operators, $isTraitObject: true})
;
const longestOperator = $puck_1.Iterator[$puck_15.type].fold.call($puck_15, 0, function (longest, curr) {
  if ($puck_1.String.size.call(curr) > longest) {
    return $puck_1.String.size.call(curr);
  }
  else {
    return longest;
  };
});
function isDummy(token) {
  let $puck_16 = token;
  if (($unwrapTraitObject($puck_16).kind === "SimpleToken" && $unwrapTraitObject($unwrapTraitObject($unwrapTraitObject($puck_16).value).kind).kind === "NewlineToken")) {
    let {value: {}} = $unwrapTraitObject($puck_16);
    return true;
  }
  else {
    if ($unwrapTraitObject($puck_16).kind === "Comment") {
      $unwrapTraitObject($puck_16);
      return true;
    }
    else {
      if (true) {
        $puck_16;
        return false;
      };
    };
  };
};
function isDigit(ch) {
  return $puck_1.RegExp.test.call($puck_1.RegExp._new("^[0-9]$"), ch);
};
function isIdStart(ch) {
  return $puck_1.RegExp.test.call($puck_1.RegExp._new("^[a-z_]$", "i"), ch);
};
function isId(ch) {
  return (isIdStart(ch) || isDigit(ch));
};
function isNewline(ch) {
  return ch === "\n";
};
function isWhitespace(ch) {
  return ch === " ";
};
function isWhitespaceOrNewline(ch) {
  return (isNewline(ch) || isWhitespace(ch));
}
