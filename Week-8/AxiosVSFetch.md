## GET call

function main () {
    fetch("https.....")
        .then( async (response) => {
            const json = await response.json();
            console.log(json.todos.length);
        });
}
main();


async function main () {
    const response = await fetch("https.....")
    const json = await response.json();
    console.log(json.todos.length);
}

main();


const axios = require("axios);

async function call () {
    const response = await axios.get("");
    consloe.log("response.data.todos.lenght")

}

## POST Call

async function call () {
    const response = await fetch ("sf", {
        method:"POST",
        body: {
            username: "fwfwe",
            password: "sdfsw"
        },
        headers: {
            "Authorization": "Bearer 123" 
        }
    })
    const textualData = response.text(); //If this data is text then use this if json then use json
    console.log(textualData)
}

const axios = require("axios");

async function call () {
    const response = await axios.post("dvd0", {
        username: "sfew",
        password:"sdfsf"
    }, {
        headers: {
            Authorization: "Bearer 1123"
        }
    })
    console.log("svsfs" + response.data);
}


// In axios if the method is get then we cannot send the body it will ignore, so the second parameter should be header, if the second parameter is body and third argument is Header then both get ignored. And in post the second parameter is body and third is headers. Same logic follow on other methods as well. In get we can send the query parameters in the URL


Or the simplest  syntax is for the axios 

async function call () {
    const response = await axios (
        {
            url: "sffwef",
            method: "POST",
            headers: {
                Authorization: "Bearer 123",
            },
            
            data: {
                username: "sdfsw"
            }
        }
    )
}