// Throttle is a technique that allows a function to run at most once in a fixed time interval, no matter how many times it is triggered.

function throttle (fn, delay) {
    let lastCall = 0;
    // THROTTLE LEARNING NOTES
    // 1) throttle(fn, delay) runs once when you create a throttled function.
    // 2) It returns a new wrapper function (closure).
    // 3) That wrapper remembers `lastCall` between calls.
    // 4) `lastCall` is NOT reset on every wrapper call.
    // 5) `lastCall` resets only when you create a NEW throttled instance.
    // Return #1: throttle(...) returns this wrapper function.
    return function (...args) {
        const now = Date.now();
        // `lastCall` lives inside closure memory for this specific throttled function.
        // It starts at 0 only once: when throttle(...) is executed.
        if(now - lastCall < delay) {
            // Return #2: block this call because delay window is not completed.
            // `lastCall` stays unchanged on blocked calls.
            return;
        } 
        lastCall = now;
        // Return #3: execute original function and pass its return value back.
        return fn(...args);
    };   
}

function sendChatMessage ( message ) {
    console.log("Sending message", message);
}

const sendChatSlowMode = throttle(sendChatMessage,1000);
// Important closure behavior:
// Calling sendChatSlowMode many times does NOT recreate `lastCall`.
// `lastCall` remains shared inside this one returned wrapper.
// If you do `const another = throttle(sendChatMessage, 1000)`,
// then `another` gets its own fresh `lastCall = 0`.

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

// If you use a throttle with a 3-second gap, then:

// the first request is executed
// any other requests that come within those 3 seconds are ignored
// after 3 seconds, the next request can run again
// So it allows only one request to execute in a given time window.

// Example:

// 0s → request runs
// 1s → ignored
// 2s → ignored
// 3s → allowed again