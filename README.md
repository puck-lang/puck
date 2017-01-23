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
import 'puck:js' as {process}

fn greet(name) {
  let mut phrase = 'Hello, '
  phrase += 
    if name 
      then name 
      else 'World'
  phrase += '!'

  print(phrase)
}

greet(process.argv[2])
```

## Getting Started
The compiler is currently a mix of TypeScript and Puck but will eventually only be written in puck,
until then, run `npm run watch` to build and watch the TS code.

The build tool is called `puck` and the compiler `puckc`. Binaries are placed in `bin/` and 
library files in `lib/`

is included in the repo. Add `export PATH=$PATH:dist/bin` to your `.bashrc` or `.zshrc`, or prefix 
the following commands with `dist/bin/`.

Run `puckc some/file some/other/file` to build the specified file(s).  
Run `puck build` to build the project.  
Run `puck test` to run the testsuite.  
Run `cases` to run compilation tests.  
Run `cases update-baselines` to update the baselines (accept the current behaviour) for the compilation tests.  
Run `self-test` to run a self test of the compiler that validates that the compiler can reproduce itself.

## Editors
There are plugins avalible for Atom and Visual Studio Code, as well as a Textmate grammar
that can be used to create plugins for most editors. 
See [puck-lang/editors](https://github.com/puck-lang/editors) for details.
