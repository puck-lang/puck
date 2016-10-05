# For loops

## Iterating a number of times
Use ranges to iterate a specific number of times

```js
for (let i = 0; i < 10; i++) {
  console.log(i)
}
```

```puck
for i in 0..10 {
  print(i)
}
```

## Iterate over a list, and track the index
```js
for (let i = 0; i < array.length; i++) {
  const element = array[i]
  console.log(element, i)
} 
```
```puck
for (element, i) in list.enumerate() {
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
for element in list.rev() {
  print(element)
}
```
