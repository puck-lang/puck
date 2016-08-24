import {
  isIdentifier,
  operators,
  textToToken,
  CommentNode,
  Identifier,
  IfExpression,
  NumberLiteral,
  StringLiteral,
  SyntaxKind,
  Token,
} from './ast'
import {InputStream} from './input_stream_type'

// export function TokenStream(input: InputStream): TokenStream {
//   let current: Token = null
//   let currentNewline: Token = null
//   let longestOperator = operators.reduce((longest, curr) => {
//     if (curr.length > longest) return curr.length
//     else return longest
//   }, 0)

//   function tryParseToken() {
//     let length = 0
//     let searchString = ''
//     let found

//     while (length < longestOperator) {
//       let ch = input.peek(length)
//       if (isWhitespaceOrNewline(ch)) break
//       searchString += ch

//       let hasMatches = operators
//         .filter(token => {
//           if (token.length < length) return false
//           return token.substr(0, length + 1) == searchString
//         })
//         .length > 0

//       if (hasMatches) {
//         length++
//         found = searchString
//       } else break
//     }

//     if (textToToken[found]) {
//       for (let i = 0; i < length; i++) {
//         input.next()
//       }
//       return {kind: textToToken[found]}
//     }
//   }

//   function isDigit(ch) {
//     return /[0-9]/i.test(ch)
//   }

//   function isIdStart(ch) {
//     return /[a-z_]/i.test(ch)
//   }

//   function isId(ch) {
//     return isIdStart(ch) || isDigit(ch)
//   }

//   function isNewline(ch) {
//     return ch == '\n'
//   }

//   function isWhitespace(ch) {
//     return ' \t'.indexOf(ch) >= 0
//   }

//   function isWhitespaceOrNewline(ch) {
//     return isNewline(ch) || isWhitespace(ch)
//   }

//   function readWhile(predicate: (ch: String) => boolean) {
//     let str = ''
//     while (!input.eof() && predicate(input.peek()))
//         str += input.next()
//     return str
//   }

//   function readNumber(): NumberLiteral {
//     let has_dot = false
//     let number = readWhile(ch => {
//         if (ch == `.`) {
//             if (has_dot) return false
//             has_dot = true
//             return true
//         }
//         return isDigit(ch)
//     })
//     return { kind: SyntaxKind.NumberLiteral, value: parseFloat(number) }
//   }

//   function readIdent(): Token|Identifier {
//     let id = readWhile(isId)
//     let kind
//     if ((kind = textToToken[id]) !== undefined) return {kind}
//     return {
//       kind: SyntaxKind.Identifier,
//       name: id,
//     }
//   }

//   function readEscaped(end) {
//     let escaped = false, str = ''
//     input.next()
//     while (!input.eof()) {
//       let ch = input.next()
//       if (escaped) {
//         if (ch == 'n') { str += '\n' }
//         else if (ch == 'r') { str += '\r' }
//         else if (ch == 't') { str += '\t' }
//         else if (ch == '\'') { str += '\'' }
//         else if (ch == '\"') { str += '\"' }
//         else if (ch == '\\') { str += '\\' }
//         else { input.croak('Invalid escape character ' + ch) }
//         escaped = false
//       } else if (ch == `\\`) {
//         escaped = true
//       } else if (ch == end) {
//         break
//       } else {
//         str += ch
//       }
//     }
//     return str
//   }

//   function readString(): StringLiteral {
//     return { kind: SyntaxKind.StringLiteral, value: readEscaped(`'`) }
//   }

//   function readComment(): CommentNode {
//     input.next()
//     input.next()
//     readWhile(isWhitespace)
//     let comment = readWhile(ch => ch != '\n')
//     input.next()

//     return {
//       kind: SyntaxKind.Comment,
//       text: comment,
//     }
//   }

//   function readNext(tokenizeNewline = false): Token {
//     readWhile(isWhitespace)
//     if (isNewline(input.peek())) {
//       let token = {kind: SyntaxKind.NewlineToken}
//       if (tokenizeNewline) return token
//       else currentNewline = token
//     } else {
//       currentNewline = null
//     }
//     readWhile(isWhitespaceOrNewline)
//     if (input.eof()) return null

//     let ch = input.peek()

//     if (ch == '/' && input.peek(1) == '/') return readComment()
//     if (ch == `'`) return readString()
//     if (isDigit(ch)) return readNumber()
//     if (isIdStart(ch)) return readIdent()
//     let token = tryParseToken()
//     if (token) return token
//     input.croak(`Unexpected token: ${ch}`)
//   }

//   function peek(tokenizeNewline?): Token {
//     if (tokenizeNewline && currentNewline) return currentNewline
//     if (current) return current
//     let token = readNext(tokenizeNewline)
//     if (tokenizeNewline && token.kind == SyntaxKind.NewlineToken) {
//       return currentNewline = token
//     } else {
//       return current = token
//     }
//   }

//   function next(tokenizeNewline?): Token {
//     let token = current
//     if (tokenizeNewline && currentNewline) {
//       token = currentNewline
//       currentNewline = null
//       return token
//     }
//     current = null
//     return token || readNext(tokenizeNewline)
//   }

//   function eof() {
//     return peek() == null
//   }

//   return {next, peek, eof, croak: input.croak}
// }

export type TokenStream = {
  next: (tokenizeNewline?: boolean) => Token,
  peek: (tokenizeNewline?: boolean, peekDistance?: number) => Token,
  eof: () => boolean,
  croak: (message: string) => void
}
