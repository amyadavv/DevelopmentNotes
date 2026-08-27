# Enums 
Enums (short for enumerations) in TypeScript are a feature that allows you to define a set of named constants.
The concept behind an enumeration is to create a human-readable way to represent a set of constant values, which might otherwise be represented as numbers or strings.

Example 1 - Game 
Let’s say you have a game where you have to perform an action based on weather the user has pressed the up arrow key, down arrow key, left arrow key or right arrow key.

```tsx
function doSomething(keyPressed) {
	// do something.
}
```

What should the type of keyPressed be?
Should it be a string? (UP , DOWN , LEFT, RIGHT) ?
Should it be numbers? (1, 2, 3, 4) ?

Approach 1: 

```tsx
function doSomething(keyPressed: string) {
	// do something.
}

keyPressed("Up");
keyPressed("Down");
keyPressed("UpRandomg");  // random value

// Problem with this approach is I can give any random value and it does not throw error because the random value is also a string then in the doSomething function logic will fail.

```

Approach 2:

```tsx
type keyInput = "Up" | "Down" | "Left" | "Right";

function doSomething(keyPressed: keyInput) {
	// do something.
    if (keyPressed == "up")
    {

    }
}

keyPressed("Up");
keyPressed("Down");
keyPressed("UpRandomg");  // now this will throw error

```

The best thing to use in such a case is an enum.

```tsx
enum Direction {
    Up,
    Down,
    Left,
    Right
}

function doSomething(keyPressed: Direction) {
	if(keyPressed == Direction.Up) {

    }
}

doSomething(Direction.Up)
doSomething(Direction.Down)

``` 

This makes code slightly cleaner to read out. 
The final value stored at runtime is still a number (0, 1, 2, 3). 
The enum is a virtual concepts in typescript. There is no concept of enums in javascript. 
 
2. What values do you see at runtime for Direction.UP ? Try logging Direction.Up on screen

```tsx 

enum Direction {
    Up,
    Down,
    Left,
    Right
}

function doSomething(keyPressed: Direction) {
	// do something.
}

doSomething(Direction.Up)
console.log(Direction.Up)

```
Output: 0

This tells you that by default, enums get values as 0 , 1, 2...

3. How to change values?

```tsx
enum Direction {
    Up = 1,
    Down, // becomes 2 by default
    Left, // becomes 3
    Right // becomes 4
}

function doSomething(keyPressed: Direction) {
	// do something.
}

doSomething(Direction.Down)
console.log(Direction.Down)
```
Output: 2

4. Can also be strings

```tsx
enum Direction {
    Up = "UP",
    Down = "Down",
    Left = "Left",
    Right = 'Right'   // In enums if you added one string value to the constant then you need to add string values to all the constants otherwise it will give error. 
}

function doSomething(keyPressed: Direction) {
	// do something.
}

doSomething(Direction.Down)
console.log(Direction.Down)
```
Output: Down

5. Common use case in express

```tsx
enum ResponseStatus {
    Success = 200,
    NotFound = 404,
    Error = 500
}

app.get("/", (req, res) => {
    if (!req.query.userId) {
			res.status(ResponseStatus.Error).json({})
    }
    // and so on...
		res.status(ResponseStatus.Success).json({});
})
```

# Generics

Generics are a language independent concept (exist in C++ as well)
 
1. Problem Statement
Let’s say you have a function that needs to return the first element of an array. Array can be of type either string or integer. How would you solve this problem?

``` tsx
function getFirstElement(arr: (string | number)[]) {
    return arr[0];
}

const el = getFirstElement([1, 2, 3, "Amit"]);
```

What is the problem in this approach?

- Problem 1: 

```tsx
type Input = number | string;

function getFirstElement(arr: Input[]) {
    return arr[0];
}

const el = getFirstElement(["Amit", "Yadav"]);
console.log(el.toUpperCase());

// Let say I want to print Amit in upper case. We cannot do that because this error is coming "Property 'toUpperCase' does not exist on type Input ('string | number')." 
// Given an Input array output is going to be Input and since Input can either be a number or a string typescript prevent calling toUpperCase(). Number pe we cannot call uppercase. 
```

- Problem 2: User can send different types of values in inputs, without any type errors. Typescript isn’t able to infer the right type of the return type

Solution :

```tsx
function getFirstElement(arr: string[] | number[]) {
    return arr[0];
}

const el = getFirstElement(["Amit", "Yadav"]);
 
```

2. Solution - Generics
Generics enable you to create components that work with any data type while still providing compile-time type safety.
Simple example - 

```tsx
function identity<T>(arg: T): T {
    return arg;
}

let output1 = identity<string>("myString");
let output2 = identity<number>(100);
```