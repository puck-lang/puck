#!/usr/bin/env node

import {InputStream} from './input_stream'
import {TokenStream} from './token_stream'
import {parse} from './parser'
import {emitProgram} from './emitter'


let stdin = process.stdin
let stdout = process.stdout
let inputChunks = []

stdin.resume()
stdin.setEncoding('utf8')

stdin.on('data', chunk => inputChunks.push(chunk))

stdin.on('end', () => {
  let code = inputChunks.join()
  let ast = parse(TokenStream(InputStream(code)))
  console.log(emitProgram(ast))
})
