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

    People realised that javascript is a very power language, but lacks types. Typescript was introduced as a new language to add types on top of javascript.

