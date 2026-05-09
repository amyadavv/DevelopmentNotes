function throttle (fn, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = Date.now();
        if(now - lastCall < delay) {
            return;
        } 
        lastCall = now;
        return fn(...args);
    };   
}

function sendChatMessage ( message ) {
    console.log("Sending message", message);
}

const sendChatSlowMode = throttle(sendChatMessage,1000);

sendChatSlowMode("Hi 1");
sendChatSlowMode("Hi");
sendChatSlowMode("Hi");
sendChatSlowMode("Hi last");
sendChatSlowMode("Hlo ji");

// console.log(Date.now());



// If a child ask for food but the food will be served after 10 mins, so if the child asked for food between the 10 mins then the request of food is rejected. 
// Throttle reacts DURING the action.
// Throttle — when you need continuous updates


// Use case	Why throttle?
// Scroll listener	Track position periodically
// Window resize	Update layout at intervals
// Mouse move	Heatmap / UI effects
// Video progress save	Save every few seconds
// API rate limiting	Prevent spam


// Case 1: THROTTLE (Security guard rule)

// Rule:

// “No matter how many times you press, I will allow the bell to ring once every 3 seconds.”

// What happens?
// Time →  0s   1s   2s   3s   4s   5s   6s
// Press → | | | | | | | | | | | |
// Bell  → R           R           R


// Bell rings regularly

// It does not wait for you to stop

// It keeps reacting, but slowly

// Key feeling

// “I am being heard, but not every time.”

// That is THROTTLE.

