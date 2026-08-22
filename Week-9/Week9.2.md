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

function sum (a: number, b:number): number {
    return a + b;
}
const value = sum(4,6);
console.log(value);

// one thing is even if we didn't give the function return type. Function will still give me the same signature because typescript was able to infer the type. This is what's called 'type inference'. How typescript is able to do this as it can see in the function a is a number b is a number if we do sum then it will return the number so don't have to explicitly gave the number. Usually its good practice to gave it a number or return type


Problem 3 - Return true or false based on if a user is 18+