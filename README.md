# Puck

Puck is a compile to JS language.
It has syntax and semantics that are inspired from Rust but adapted to work 
better in a web environment.

## Key features
- Simple project setup
- Explicit mutability
- Good JS interop
- Trait based type system (See [Rust](https://doc.rust-lang.org/book/traits.html))

## Getting Started

## Contibuting
Add `export PATH=$PATH:dist/bin` to your `.bashrc` or `.zshrc`, or prefix the 
following commands with `dist/bin/`.

Run `puck build` to build the project.  
Run `puck test` to run the testsuite.  
Run `cases` to run compilation tests.  
Run `cases update-baselines` to update the baselines (accept the current behaviour) for the compilation tests.  
Run `self-test` to run a self test of the compiler that validates that the compiler can reproduce itself.

## Editors
There is a fully featured plugin avalible for Visual Studio Code, that features syntax highlighting, 
code completions, hover information, go to definition and more.
Other editor support can be built from a Textmate grammar and the Puck Language Server which uses
the [Language Server Protocol](https://github.com/Microsoft/language-server-protocol).  
See [puck-lang/editors](https://github.com/puck-lang/editors) for more details.
