function debounce (fn, delay) {
    let timerId;
    return function (...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
        fn(...args);
        }, delay);
    };
}

const search = (query) => {
    console.log("Searching for " + query);
}  // This function which we want to delay

const searchWithDebounce = debounce(search,1000);

searchWithDebounce('Ha');
searchWithDebounce('Hard');
searchWithDebounce('Hard JS');
searchWithDebounce('Hard JS Interview');
searchWithDebounce('Hard JS Interview question');
searchWithDebounce('Hard JS Interview question for practice');


//  example - in google if we search for something then when we type something on the search box then the suggestion does not come on the spot a slightly delay is there in the suggestion. This is where debounce is useful. When we want some delay in something, like in api call then we implement debounce.
// Debounce — when you want final action only
// Debounce reacts AFTER the action stops.

// Use case	Why debounce?
// Search input	Call API after typing stops
// Form validation	Validate after user finishes
// Auto-save	Save when user pauses
// Button double-click	Allow only final click