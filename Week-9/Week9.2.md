# Typescript

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

TypeScript is a programming language developed and maintained by microsoft. It is a strict syntactical superset of Javascript and adds optional static typing to the language. 
If you write some js code it will work in typescript and if you write some typescript code is will not work in js. 

# Where/How does typescript code run? - Very Important





