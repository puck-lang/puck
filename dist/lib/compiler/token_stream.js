'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.TokenStream = TokenStream;

var _core = require('puck-lang/dist/lib/stdlib/core');

var _js = require('puck-lang/dist/lib/stdlib/js');

var _ast = require('./../ast/ast');

var _span = require('./../ast/span');

var _ast2 = require('./ast');

var $unwrapTraitObject = function $unwrapTraitObject(obj) {
  return obj && (obj.$isTraitObject ? obj.value : obj);
};
function TokenStream(input) {
  var current = _js._null;
  var currentDummy = _js._null;
  var inImport = false;
  var longestOperator = $unwrapTraitObject(_ast2.operators).reduce(function (longest, curr) {
    if ($unwrapTraitObject(curr).length > longest) {
      return $unwrapTraitObject(curr).length;
    } else {
      return longest;
    };
  }, 0);
  function tryParseOperator() {
    var length = 0;
    var searchString = "";
    var found = void 0;
    while (length < longestOperator) {
      var ch = $unwrapTraitObject(input).peek(length);
      if (isWhitespaceOrNewline(ch)) {
        break;
      };
      searchString += ch;
      var hasMatches = $unwrapTraitObject($unwrapTraitObject(_ast2.operators).filter(function (token) {
        if ($unwrapTraitObject(token).length < length) {
          return false;
        } else {
          return $unwrapTraitObject(token).substr(0, length + 1) == searchString;
        };
      })).length > 0;
      if (hasMatches) {
        length += 1;
        found = searchString;
      } else {
        break;
      };
    };
    if ($unwrapTraitObject(_ast2.textToToken)[$unwrapTraitObject(found)]) {
      var start = $unwrapTraitObject(input).getPosition();
      var i = 0;
      while (i < length) {
        $unwrapTraitObject(input).next();
        i += 1;
      };
      var end = $unwrapTraitObject(input).getPosition();
      return (0, _core.Some)({
        kind: $unwrapTraitObject(_ast2.textToToken)[$unwrapTraitObject(found)],
        span: {
          start: start,
          end: end
        }
      });
    } else {
      return _core.None;
    };
  };
  function isDigit(ch) {
    return $unwrapTraitObject((0, _js.RegExp)("[0-9]")).test(ch);
  };
  function isIdStart(ch) {
    return $unwrapTraitObject((0, _js.RegExp)("[a-z_]", "i")).test(ch);
  };
  function isId(ch) {
    return isIdStart(ch) || isDigit(ch);
  };
  function isNewline(ch) {
    return ch == "\n";
  };
  function isWhitespace(ch) {
    return " \t".indexOf(ch) >= 0;
  };
  function isWhitespaceOrNewline(ch) {
    return isNewline(ch) || isWhitespace(ch);
  };
  function readWhile(predicate) {
    var str = "";
    while (!$unwrapTraitObject(input).eof() && predicate($unwrapTraitObject(input).peek())) {
      str += $unwrapTraitObject(input).next();
    };
    return str;
  };
  function readNumber() {
    var hasDot = false;
    var start = $unwrapTraitObject(input).getPosition();
    var number = readWhile(function (ch) {
      if (ch == ".") {
        if (hasDot || !isDigit($unwrapTraitObject(input).peek(1))) {
          return false;
        } else {
          hasDot = true;
          return true;
        };
      } else {
        return isDigit(ch);
      };
    });
    var end = $unwrapTraitObject(input).getPosition();
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).NumberLiteral,
      span: {
        start: start,
        end: end
      },
      value: $unwrapTraitObject(_js.global).parseFloat(number)
    };
  };
  function readIdentifier() {
    var start = $unwrapTraitObject(input).getPosition();
    var id = readWhile(isId);
    var end = $unwrapTraitObject(input).getPosition();
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).Identifier,
      span: {
        start: start,
        end: end
      },
      name: id
    };
  };
  function readIdentifierOrKeyword() {
    var start = $unwrapTraitObject(input).getPosition();
    var id = readWhile(isId);
    var end = $unwrapTraitObject(input).getPosition();
    var span = {
      start: start,
      end: end
    };
    if (id == "import") {
      inImport = true;
      return {
        kind: $unwrapTraitObject(_ast2.SyntaxKind).ImportKeyword,
        span: span
      };
    } else {
      if (id == "as") {
        inImport = false;
        return {
          kind: $unwrapTraitObject(_ast2.SyntaxKind).AsKeyword,
          span: span
        };
      } else {
        if ($unwrapTraitObject(_ast2.textToToken)[id] != _js._undefined) {
          return {
            kind: $unwrapTraitObject(_ast2.textToToken)[id],
            span: span
          };
        } else {
          return {
            kind: $unwrapTraitObject(_ast2.SyntaxKind).Identifier,
            span: span,
            name: id
          };
        };
      };
    };
  };
  function readString() {
    var escaped = false;
    var parts = [];
    var str = "";
    var start = $unwrapTraitObject(input).getPosition();
    var delimiter = $unwrapTraitObject(input).next();
    while (!$unwrapTraitObject(input).eof()) {
      var ch = $unwrapTraitObject(input).next();
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
                        $unwrapTraitObject(input).croak("Invalid escape character " + ch + "");
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
          if (ch == "$" && isIdStart($unwrapTraitObject(input).peek()) && !inImport) {
            var _end = $unwrapTraitObject(input).getPosition();
            parts.push(_ast.StringLiteralPart.Literal({
              span: {
                start: start,
                end: _end
              },
              value: str
            }));
            parts.push(_ast.StringLiteralPart.Identifier(readIdentifier()));
            str = "";
            start = $unwrapTraitObject(input).getPosition();
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
    var end = $unwrapTraitObject(input).getPosition();
    parts.push(_ast.StringLiteralPart.Literal({
      span: {
        start: start,
        end: end
      },
      value: str
    }));
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).StringLiteral,
      parts: parts
    };
  };
  function readComment() {
    var start = $unwrapTraitObject(input).getPosition();
    $unwrapTraitObject(input).next();
    $unwrapTraitObject(input).next();
    readWhile(isWhitespace);
    var comment = readWhile(function (ch) {
      return ch != "\n";
    });
    $unwrapTraitObject(input).next();
    var end = $unwrapTraitObject(input).getPosition();
    return {
      kind: $unwrapTraitObject(_ast2.SyntaxKind).Comment,
      span: {
        start: start,
        end: end
      },
      text: comment
    };
  };
  function readNext() {
    readWhile(isWhitespace);
    if ($unwrapTraitObject(input).eof()) {
      return _js._null;
    };
    var ch = $unwrapTraitObject(input).peek();
    if (isNewline(ch)) {
      $unwrapTraitObject(input).next();
      return { kind: $unwrapTraitObject(_ast2.SyntaxKind).NewlineToken };
    };
    if (ch == "/" && $unwrapTraitObject(input).peek(1) == "/") {
      return readComment();
    };
    if (ch == "'" || ch == "\"") {
      return readString();
    };
    if (isDigit(ch)) {
      return readNumber();
    };
    if (isIdStart(ch)) {
      return readIdentifierOrKeyword();
    };
    var __PUCK__value__1 = tryParseOperator();
    if ($unwrapTraitObject(__PUCK__value__1).kind == "Some") {
      var _$unwrapTraitObject = $unwrapTraitObject(__PUCK__value__1),
          _$unwrapTraitObject$v = _slicedToArray(_$unwrapTraitObject.value, 1),
          operator = _$unwrapTraitObject$v[0];

      return operator;
    } else {
      return $unwrapTraitObject(input).croak("Unexpected token: " + ch + "");
    };
  };
  function isDummy(token) {
    if (!token) {
      return false;
    };
    return $unwrapTraitObject(token).kind == $unwrapTraitObject(_ast2.SyntaxKind).NewlineToken || $unwrapTraitObject(token).kind == $unwrapTraitObject(_ast2.SyntaxKind).Comment;
  };
  function peek() {
    var returnDummy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (returnDummy && currentDummy) {
      return currentDummy;
    };
    if (current && !isDummy(current) || returnDummy) {
      return current;
    };
    current = readNext();
    currentDummy = current;
    while (!returnDummy && isDummy(current)) {
      current = readNext();
    };
    return current;
  };
  function next(returnDummy) {
    if (currentDummy) {
      var _token = currentDummy;
      currentDummy = _js._null;
      if (returnDummy) {
        return _token;
      };
    };
    if (current) {
      var _token2 = current;
      current = _js._null;
      if (returnDummy || !isDummy(_token2)) {
        return _token2;
      };
    };
    var token = readNext();
    while (isDummy(token) && !returnDummy) {
      token = readNext();
    };
    return token;
  };
  function eof() {
    return peek() == _js._null;
  };
  return {
    next: next,
    peek: peek,
    eof: eof,
    croak: $unwrapTraitObject(input).croak,
    file: $unwrapTraitObject(input).file
  };
}
