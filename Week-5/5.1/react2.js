// use of component

import { useState } from "react";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div>
            {/* render component  */}
            <CustomButton count={count} setCount={setCount}></CustomButton >
        </div>
    )

}

// this is component
// write my component and render it above
function CustomButton(props) {

    function onCLickHandler() {
        props.setCount(props.count + 1);
    }

    return (
        <button onClick={onCLickHandler}>Counter {props.count}</button>
    )
}

export default App;