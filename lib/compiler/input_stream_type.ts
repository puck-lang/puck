// export function InputStream(input): InputStream {
//   let pos = 0, line = 1, col = 1

//   function next() {
//     let ch = input.charAt(pos++)
//     if (ch === '\n') {
//       line++
//       col = 1
//     } else {
//       col++
//     }
//     return ch
//   }

//   function peek(distance = 0) {
//     return input.charAt(pos + distance)
//   }

//   function eof() {
//     return peek() === ''
//   }

//   function croak(msg) {
//     throw new Error(msg + ` (` + line + `:` + col + `)`)
//   }

//   return {next, peek, eof, croak, getRow: () => line, getCol: () => col}
// }

export type InputStream = {
  next: () => string
  peek: (length?: number) => string
  eof: () => boolean
  croak: (message: string) => void
}
