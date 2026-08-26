# Typescript (Slides notes - https://projects.100xdevs.com/tracks/6SbPPXGkG8QKFOTW9BmL/ts-2)

Types of language

1. Strongly typed vs loosely typed
    The terms strongly typed and loosely typed refer to how programming languages handle types, particularly how strict they are about type conversions and type safety. 

    Strongly typed languages 
    - Example - Java, C++, C, Rust
    - Benefits - lesser runtime errors, stricter codebase, easy to catch error at compile time
    - Code does not work:
        #include <iostream.h>
        int main () {
            int number = 10; 
            number = "text";
            return 0;
        }

    Loosely typed languages
    - Example - Python, Javascript, Perl, php
    - Benefits - Easy to write code, fast to bootstrap, low learning curve
    - Code does work
        function main () {
            let number = 10;
            number = "text";
            return number;
        }

    People realized that javascript is a very power language, but lacks types (types mean strongly typed). Typescript was introduced as a new language to add types (types mean strongly typed) on top of javascript.

# What is typescript?

TypeScript is a programming language developed and maintained by microsoft. 
It is a strict syntactical superset of Javascript and adds optional static typing to the language. 
If you write some js code it will work in typescript and if you write some typescript code is will not work in js. 

# Where/How does typescript code run? - Very Important

Typescript code never runs in your browser. Your browser can only understand javascript. 
    1. Javascript is the runtime language (the thing that actually runs in your browser/node.js runtime).
    2. Typescript is something that compiles down to javascript
    3. When typescript is compiled down to javascript, you get type checking (similar to C++). If there is an error, the conversion to Javascript fails. 


Flow -   main.ts (typescript)------> main.js (javascript) --|-------Browser
                                                          |-------Node.js

# Typescript compiler

tsc is the official typescript compiler (transpiled) that you can use to convert Typescript code into Javascript
There are many other famous compilers/transpilers for converting Typescript to Javascript. Some famous ones are - 
1. esbuild
2. swc


# The tsc compiler

- Step 1 - Install tsc/typescript globally: 
    npm install -g typescript

- Step 2 - Initialize an empty Node.js project with typescript:
    mkdir node-app
    cd node-app
    npm init -y
    npx tsc --init

    These commands should initialize two files in your project - package.json and tsconfig.json

- Step 3 - Create a a.ts file
    const x: number = 1;
    console.log(x);

- Step 4 - Compile the ts file to js file
    tsc -b

- Step 5 - Explore the newly generated index.js file. Notice how there is no typescript code in the javascript file. It’s a plain old js file with no types.

- Step 7 - Delete a.js

- Step 6 - Try assigning x to a string
    Make sure you convert the const to let
    let x: number = 1;
    x = "harkirat"
    console.log(x);

Step 7 - Try compiling the code again
    tsc -b

Notice all the errors you see in the console. This tells you there are type errors in your codebase.
Also notice that no index.js is created anymore. This is the high level benefit of typescript. It lets you catch type errors at compile time

# Basic Types in TypeScript

Typescript provides you some basic types - number, string, boolean, null, undefined.

Problem 1 - Hello world. Thing to learn - How to give types to arguments of a function

    Write a function that greets a user given their first name. 
    Argument - firstName
    Logs - Hello {firstName}
    Doesn’t return anything

    Solution: 

    ```ts
    const hello : string = "Hello user";

    function greet (hello: string) {
        console.log(hello)
    }

    greet(hello);
    ```
    

What is 'any'? 
 Just like number is a type string is a type any is also a type. So we can do
 const x : any = 2;

 Now this code will show error because parameter hello implicitly has an 'any' type. So we have to explicitly tell to compiler that this is a string. So to avoid error we have to explicitly tell the compiler. 

    ```ts
    function greet (hello) {
        console.log(hello)
    }
    greet("Hello Amit");

    ```
    This will throw error 


Problem 2 - Sum function

// So we are explicitly saying that this function will return a number. 

```tsx

function sum (a: number, b:number): number {
    return a + b;
}
const value = sum(4,6);
console.log(value);

```

// one thing is even if we didn't give the function return type. Function will still give me the same signature because typescript was able to infer the type. This is what's called 'type inference'. How typescript is able to do this as it can see in the function a is a number b is a number if we do sum then it will return the number so don't have to explicitly gave the number. Usually its good practice to gave it a number or return type


Problem 3 - Return true or false based on if a user is 18+

```tsx
function isLegal (age: number) : boolean {
    if(age < 18) {
        return false;
    }
    else  {
        return true;
    }
}

let x  = isLegal(19)
let y : boolean = isLegal(19)

```

Problem 4 - Create a function that takes another function as input, and runs it after 1 second.

```tsx 
// This is the function which expects no arguments and it returns nothing it returns void. As we know the callback function is not returning not returning anything that's why we return void.

function runAfter1(fn: () => void) {
    setTimeout(() => {
        fn()
    }, 1000)
}

runAfter1(function () {
    console.log("Run after 1 sec")
})

```

# The tsconfig file

The tsconfig file has a bunch of options that you can change to change the compilation process. Some of these include
 
1. target
The target option in a tsconfig.json file specifies the ECMAScript target version to which the TypeScript compiler will compile the TypeScript code. To try it out, try compiling the following code for target being ES5 and es2020

const greet = (name: string) => `Hello, ${name}!`;

Output for ES5
"use strict";
var greet = function (name) { return "Hello, ".concat(name, "!"); };

Output for ES2020
"use strict";
const greet = (name) => `Hello, ${name}!`;

2. rootDir
Where should the compiler look for .ts files. Good practice is for this to be the src folder. So all the typeScript code should be in the 'src' folder and all the convert typeScript code into js code (final output) should be in the 'dist' folder. To use it search it in the tsconfig file and uncomment it with the source. Like this - "rootDir" : "./scr",


3. outDir
Where should the compiler look for spit out the .js files. To use it search it in the tsconfig file and uncomment it with the source. Like this - "outDir" : "./dist",


4. noImplicitAny
Try enabling it and see the compilation errors on the following code - 

const greet = (name) => `Hello, ${name}!`;
Then try disabling it

In the code base there shouldn't be any implicit any. So if you want you code base slightly strict ( we don't give arguments explicitly give to all function ) so set this to false - "noImplicitReturns": false, so above code will not give any error. So the typeScript assume implicitly type any to all function I will not complain.


5. removeComments
Weather or not to include comments in the final js file.

# Interfaces

1. What are interfaces 
An interface in TypeScript is a way to define the structure/shape of an object. Think of it as a rule or blueprint that tells you what properties an object should have and what types they should be.

Let you aggregate data together. Aggregate data means combining multiple individual pieces of data to get a summarized result.
How can you assign types to objects? For example, a user object that looks like this - 

const user = {
	firstName: "harkirat",
	lastName: "singh",
	email: "email@gmail.com".
	age: 21,
}

To assign a type to the user object, you can use interfaces
interface User {
	firstName: string;
	lastName: string;
	email: string;
	age: number;
}

Assignment #1 - Create a function isLegal that returns true or false if a user is above 18. It takes a user as an input.


```tsx
interface User {
    firstName: string,
    lastName: string,
    age: number,
    email?: string,  // this make optional to pass email
}

function isLegal(User: User) {
    if (User.age > 18) {
        return true;
    } else {
        return false;
    }
}

function greet(user: User) {
    console.log("Hello " + user.firstName);
}

isLegal({
    firstName: "AMit",
    lastName: "Yadav",
    age: 25
})
```

Assignment #2 - Create a React component that takes todos as an input and renders them. Select typescript when initializing the react project using npm create vite@latest.

```tsx
// Todo.tsx
interface TodoType {
  title: string;
  description: string;
  done: boolean;
}

interface TodoInput {
  todo: TodoType;
}

function Todo({ todo }: TodoInput) {
  return <div>
    <h1>{todo.title}</h1>
    <h2>{todo.description}</h2>
    
  </div>
}

// or you can do same like the above interface example example
```

2. Implementing interfaces

Interfaces have another special property. You can implement interfaces as a class. Let’s say you have an person interface - 

```tsx

interface Person {
    name: string;
    age: number;
    greet(phrase: string): void;
}

You can create a class which implements this interface.

class Employee implements Person {
    name: string;
    age: number;

    constructor(n: string, a: number) {
        this.name = n;
        this.age = a;
    }

    greet(phrase: string) {
        console.log(`${phrase} ${this.name}`);
    }
}

const e = new Employee("Amit", 22); // This e objects need to have a name property and an age property associate. You have to define these property above the constructor like above example. Other wise it will throw error.

console.log(e.greet("Hello"))

```

This is useful since now you can create multiple variants of a person (Manager, CEO …)

Ques: I can write the Employee class standalone itself. What is the purpose of an interface here? 
Who ever creating a class if they implement Person they will have a greet function. If they implement Person and don't have a greet function it will give you an error. The benefit of having interface is who ever is implementing Person so on that e object (console.log(e.greet("Hello"))) we can call greet. greet will exists as a function because you know class implements Person.

Ques: Difference between interface and types
The difference between interface and types is if you define a interface you can actually implement a class from it, we can create a class that follows all properties of interface but types don't let you do it. 

- Interface can also extends interface:

``` tsx

interface User {
    age: number;
}

interface Manager extends User { // manager will have both age and name number
    name: number;
}

interface Employee extends User { // Employee will also have age and name string 
    name : string;
}
// interface Employee extends User, Manager {} // can also extends more than one
 
```

- Example of callback where the called function accepts two arguments and returns a string. 

``` tsx 
function doSomething(cb2: (str: string, num: number) => string) : string {
    const x = cb2("2", 2);
     return "1";
}

```

# Types

What are types?
- Very similar to interfaces, types let you aggregate data together. Aggregate data means combining multiple individual pieces of data to get a summarized result.
- In types we have to put '=' but in interface we don't have to put '='.
- In types we cannot use to implement classes only interface is used to implement classes
- we cannot create array in interface
- But they let you do a few other things.

```tsx
type User = {
	firstName: string;
	lastName: string;
	age: number
}
```
 
1. Unions
Let’s say you want to print the id of a user, which can be a number or a string.You can not do this using interfaces.

```tsx
type StringOrNumber = string | number;

function printId(id: StringOrNumber) {
  console.log(`ID: ${id}`);
}

printId(101); // ID: 101
printId("202"); // ID: 202
```

2. Intersection
What if you want to create a type that has every property of multiple types/ interfaces. You can not do this using interfaces. 

```tsx
type Employee = {
  name: string;
  startDate: Date;
};

type Manager = {
  name: string;
  department: string;
};

type TeamLead = Employee & Manager;

const teamLead: TeamLead = {
  name: "harkirat",
  startDate: new Date(),
  department: "Software developer"
};

```

``` tsx
type Employee = {
    name: string;
    startDate: Date;
}

interface Manager {
    name: string;
    department: string;
}

type teamLead = Employee & Manager; // If we either do a OR or do an AND then we need to use a type we cannot use interfaces. If you ever want to create a class which implements a type then use a interface we cannot use a type. 

type teamLead2 = {
    name: string;
    department: string;
    startDate: Date;
}
// Both teamLead is the same thing

const TeamLead: teamLead = {
    name: "sff",
    startDate: new Date(),
    department: "sddfer"

}
```

# Arrays in TS

If you want to access arrays in typescript, it’s as simple as adding a [] annotation next to the type

Example - Given an array of positive integers as input, return the maximum value in the array

Solution:

```tsx 

type numberArr = number []; // we cannot create array in interface

function maxValue(arr: number[]): number {
    if (arr.length === 0) {
        throw new Error("Array cannot be empty");
    }

    let max = arr[0]!;

    for (const num of arr) {
        if (num > max) {
            max = num;
        }
    }

    return max;
}

console.log(maxValue([1, 2, 3]));
```

Example - Given a list of users, filter out the users that are legal (greater than 18 years of age)

interface User {
	firstName: string;
	lastName: string;
	age: number;
}

Solution: 

``` tsx 

interface User {
    firstName: string,
    lastName: string,
    age: number
}

function isLegal(user: User[]) {
    return user.filter(x => x.age >= 18);
}

console.log(isLegal([{
    firstName: "Amit",
    lastName: "ydv",
    age: 19
}, {
    firstName: "Amit",
    lastName: "y",
    age: 19
}, {
    firstName: "Am",
    lastName: "ydv",
    age: 0
}]))

```

# Extra:

1.  Difference between zod and typeScript
Zod is for runtime type checks. Zod runs when your code is actually executing on a browser on a nodejs. TypeScript compilation type checks happens during compile time when your typeScript code converted into javascript 


2.  TypeScript never goes into production ideally typescript should be only the part of build pipeline (CI/CD pipelines). The typeScript code is gets converted to javascript code then this javascript bundle will run on the server where the project deployed, so it should never reaches where your project is deployed. Typescript never runs only js runs, runs on the node js server.


3. What is a Monorepo?
A Monorepo (Monolithic Repository) is a strategy where code for multiple projects, libraries, or services lives inside a single Git repository, instead of being split across multiple repositories (Polyrepo).

    Key Advantages:
    1. Code Sharing & Reusability: Easily share types, helper functions, and UI component libraries across different apps without publishing private npm packages.
    2. Atomic Changes: Update a backend API contract and frontend client consuming it in a single Git commit and Pull Request.
    3. Unified Tooling & Dependencies: Single setup for ESLint, Prettier, TypeScript configs, and automated tests.

    Challenges:
    1. Tooling Complexity: Requires build tools that support caching and dependency graphs (e.g., Turborepo, Nx, Bazel, Lerna) to avoid rebuilding everything on every commit.
    2. Access Control: Harder to restrict developer access to only specific parts of the codebase.


4. What is a Microservice Architecture?
A Microservice Architecture is a design pattern where an application is broken down into small, independently deployable services. Each service handles a specific business domain (e.g., Auth, Payments, Orders) and communicates with others over a network (via REST APIs, gRPC, or Message Queues like Kafka/RabbitMQ).    


    Key Advantages:
    1. Independent Scalability: Scale only the high-traffic services (e.g., Payments during sale events) without scaling the whole application.
    2. Fault Isolation: If the recommendation service crashes, user authentication and order placement continue working.
    3. Tech Stack Freedom: Different teams can choose the best programming language/database for their specific service.

    Challenges:
    1. Distributed System Complexity: Requires handling network latency, distributed transactions, tracing, and data consistency.
    2. Operational Overhead: Requires robust DevOps infrastructure (Docker, Kubernetes, CI/CD pipelines, API gateways).


5. Difference between abstract class and interface. 
When we define the abstract class we can have a base constructor that whosoever is extending will able to use. We can have functions in the abstract class. Some methods are abstract and some methods are already implemented. We cannot do it on interface. In interface we cannot have any run time code any function implementation vs in the abstract class we can do it. 


6. Tuple type variable : 
    Eg 1: var employee : [number, string] = [1, "Amy"]; 
    Eg 2: function x () : [number, number] { return [2,3] }


7. Duplicate function implementation
You cannot define same function in multiple files in the same directory in typeScript. Ts compiler looks at multiple file. Duplicates in any file inside the folder containing tsconfig shouldn't have same name. 

When you write a function with the same name and code structure as a function already defined in another TypeScript file within your project, even if they're in separate files, TypeScript will raise a red flag saying, "Duplicate function Implementation."

why does it happen?
Ambient Modules: When you don't use explicit Imports and exports in its files, they become ambient modules.

All their contents, including functions, are treated as part of a single global namespace. Defining functions with Identical names and signatures in different ambient modules leads to this error. 

If you don't exports specific function, if you define a function in two files neither one of these are exported then they both reach the same place eventually which are called ambient modules in typescript and then there will be a conflict they cannot have the same name.

8. interface User {
    id: number | string,
    name: string
}


