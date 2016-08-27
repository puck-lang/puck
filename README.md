# Puck

Puck is a compile to js language.
It has (a goal to have) syntax and semantics that are inspired from Rust but adapted to
work better in a web environment with for example good JS interop.

## Goals
- Trait based type system (See [Rust](https://doc.rust-lang.org/book/traits.html))
- Good js interop (npm support, unsafe access and calls)
- Explicit mutability
- Simple project setup

## Basic Concepts
Explicit mutability, a variable is immutable if not declared with the mut modifier.

Everything is an expression and the last value of a block will be the value of a block, meaning that
you can assign the result of an if expression or any use return if you need an early return of the function.

```puck
fn subject(name) {
  if name then name else 'World'
}

fn greet(name) {
  let mut phrase = 'Hello, '
  phrase += subject(name)
  phrase += '!'

  console.log(phrase)
}

greet(process.argv[2])
```

## Getting Started
The compiler is currently a mix of TypeScript and Puck but will eventually only be written in puck,
until then, run `npm run watch` to build and watch the TS code.

The build tool is located in `bin/puck.puck` and is built to `dist/bin/puck`, a precompiled version
is included in the repo. Add `export PATH=$PATH:dist/bin` to your `.bashrc` or `.zshrc`, or use
`dist/bin/puck` instead of `puck` below.

Run `puck build path/to/file` to build the specified file.  
Run `puck self-test` for a self test of the compiler, which consists of:  

1. Build the full compiler to .tmp/old
2. Build the full compiler to .tmp/new using the version in .tmp/old
3. diff .tmp/new and .tmp/old to make sure the output is exactly the same

## Editors
There are avalible plugins for Atom and Visual Studio Code, as well as a textmate grammar
that can be used to create plugins for most editors. 
See [puck-lang/editors](https://github.com/puck-lang/editors) for details.
