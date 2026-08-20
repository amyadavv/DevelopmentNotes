# Typescript (Slides notes - https://projects.100xdevs.com/tracks/6SbPPXGkG8QKFOTW9BmL/ts-2)

Step 1 - Types of language

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

