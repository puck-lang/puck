# For loops
Puck does not have the standard "C-style" for loops and does instead only feature
a "foreach version" that iterates over an iterator. Here is a list of common
for loop patterns and how they are instead expressed in Puck.

## Iterating a number of times
Use ranges to iterate a specific number of times

#### JS
```js
for (let i = 0; i < 10; i++) {
  console.log(i)
}
```

#### Puck
```puck
for i of 0..10 {
  print(i)
}
```

## Iterate over a list, and track the index
The Iterator trait has an enumerate method that maps an iterator to an
iterator of tuples where the first position is the index and the second is
the element.

#### JS
```js
for (let i = 0; i < array.length; i++) {
  const element = array[i]
  console.log(element, i)
} 
```

#### Puck
```puck
for (i, element) of list.enumerate() {
  print(element, i)
}
```

## Iterate over a list in reverse
```js
for (let i = array.length - 1; i >= 0; i--) {
  const element = array[i]
  console.log(element, i)
} 
```
```puck
for element of list.rev() {
  print(element)
}
```
