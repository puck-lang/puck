# Syntax
This document will give you a brief introduction to the syntax and basic concepts in puck

## Comments
```puck
//! This is a module comments, it documents the current module.
//! It's specified by two slashes and a bang

/// Three slashes is a doc-comment, it sits on top of functions,
/// variables and other declarations to describe their external use.
let iAmDocumentd = 5

/// Doc and module comments can contain **markdown** to _emphasis_
/// or link to declarations like [aParamter]
fn aFunction(aParameter) {
  // This is an ordinary comment to describe the code or itself
}
```

## Let declarations
Variables are declared with `let`, and optionally made mutable with `mut`.
```puck
let letters = 'abc'

let mut object = {number: 42}
// mut variables can be mutated
object.number = 3.14

// Variables can be redeclared to overshadow immutable variables
// with a new value
let letters = 'xyz'

// Variables can also be given an explicit type-annotation
let color: String = 'blue' 
```

## Literals
```puck
true  : Bool
false : Bool

42    : Num
3.14  : Num

'abc' : String
"abc" : String
// Adjecent string literals are concatenated
'a' 'b'
'c' == 'abc'
// ...and they support interpolation
'Hello, $name! Welcome to ${siteName.toUpperCase()}'

[1, 2, 3] : List<Num>

0..10 : Range<Num>

// Tuples
(42, 'red', false) : (Num, String, Bool)

// Object literals gets their type from their structure
{ x: 3, y: 4 } : {x: Num, y: Num} 
```

## Functions
```puck
fn add(a, b) then a + b

fn avarage(numbers) {
  let total = numbers.reduce(add, 0)

  // The last value of a block becomes the value of the block
  // so there is no need to return the last expression
  total / numbers.length
}

// Lamda syntax
names.map(|name| name.toUpperCase())

// Functions can take mutable parameters, and type them!
fn makeAdmin(mut user: User): User {
  user.isAdmin = true
  user
}
```

## Conditionals
```puck
let health =
  if wasHit
    then oldHealth - 1
    else oldHealth

let action =
  if key == Key.Up
    then Jump
  else if key == Key.Down
    then Duck
  else
    Ignore
```

## Loops
```puck
// The for loop iterates over an iterable, for example a list
for color in ['red', 'green', 'blue'] {
  // ...
}

// The while loop will loop until the condition becomes false
while power <= 9000 {
  increasePower()
}
print('OVER 9000!!!')
```

Puck doesn't have c-style for loops (the kind that looks like `for (int i = 0; < 10; i++)`) but
only what you may know as "for each" loops. To see examples on how to convert a c-style for loop
to puck, please see [for loops](for_loops.md).


## Types
```puck
// Object types describes the members of a data structure
type Point {
  x: Num
  y: Num
}

// Enums can hold a set of different types  
enum Maybe<T> = Just(T) | Nothing
```

Puck enums are tagged unions or just union types which can be 
very helpful to ho hold complex data /// STUFF

## Traits
A trait is like an interface in a classical language, it specifies
a set of functions/operations that can be implemented on an object
```puck
trait Area {
  fn calculateArea(self) -> Num
}

impl Area on Rect {
  fn calculateArea(self) then self.width * self.height
}

impl Area on Circle {
  fn calculateArea(self) then pi * self.radius ^ 2
}

// Sometimes you doesn't need a trait, for example factory functions
// that just create objects of their types
impl Rect {
  fn square(length: Num) then 
    Rect { width: length, height: length }
}
```

## Modules
Each file is considered a separate module and need to export and import
declarations to share them between files.
```puck
import 'puck:math' as math
import 'shapes.puck' as {Circle}

export fn randomCircle() {
  Circle { radius: math.random() }
}
```
