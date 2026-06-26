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

// Learning about args:
// args means arguments.
// In return function (...args), the three dots are called the rest parameter.
// It collects all values passed to searchWithDebounce into an array.
// Example: searchWithDebounce('Hard JS') makes args equal to ['Hard JS'].
// Later, fn(...args) uses the spread operator to pass those values back to the original function.
// So fn(...args) becomes search('Hard JS').
// This makes debounce reusable for any function, even if that function takes many arguments.

// Flow of this code:
// debounce(search, 1000) means:
// "When searchWithDebounce is called, wait 1 second before running search.
// If searchWithDebounce is called again before that 1 second finishes,
// cancel the old timer and start a new 1 second timer."

// Timeline:
// 0ms    -> searchWithDebounce('Ha') runs.
//          It starts a 1 second debounce timer.
//
// 300ms  -> searchWithDebounce('Hard') runs.
//          The old 'Ha' timer has not completed yet, so it is cancelled.
//          This is why "Previous timer cancelled" is logged.
//
// 600ms  -> searchWithDebounce('Hard JS') runs.
//          The old 'Hard' timer has not completed yet, so it is cancelled.
//
// 1500ms -> searchWithDebounce('Hard JS Interview question') runs.
//          It cancels the pending 'Hard JS' timer.
//
// 1500ms -> searchWithDebounce('Hard JS Interview question for practice') also runs.
//          Because it runs at the same time as the previous call,
//          it cancels that previous timer immediately.
//
// 2500ms -> No new call happened for 1 second,
//          so debounce finally runs search with the latest value:
//          'Hard JS Interview question for practice'.
//
// 3500ms -> searchWithDebounce('New search after pause') runs.
//          Since the previous search already completed, nothing is cancelled.
//
// 4500ms -> No new call happened for 1 second,
//          so debounce runs search with:
//          'New search after pause'.
//
// 15000ms -> searchWithDebounce('Hard JS Interview') runs.
//           This happens after 15 seconds.
//           Then debounce waits 1 more second.
//
// 16000ms -> If no new call happens after 15000ms,
//           debounce runs search with:
//           'Hard JS Interview'.
