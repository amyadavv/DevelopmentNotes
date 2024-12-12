// import { useState } from "react";


// function App() {
//     const [count, setcount] = useState(0); // instalizing the state 

//     function onClickHandler() {
//         setcount(count + 1);
//     }
//     //returning dynamic HTML
//     return (  
//         <div>
//             <button onClick={onClickHandler}>Counter {count}</button>
//         </div>
//     )
// }

// export default App


const number = [1, 2, 3, 4, 5];
const ans = number.map(function (num) {
    return num + 1;
})
console.log(ans);