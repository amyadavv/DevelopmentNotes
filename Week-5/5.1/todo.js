import React, { useState } from "react";

function App() {

    //dumbest way
    const [todos, setTodos] = useState([{
        title: "Gym",
        description: "5PM",
        completed: false
    }, {
        title: "Tution",
        description: "7PM",
        completed: false
    }])

    return (
        <div>
            {JSON.stringify(todos)}
        </div>
    )
}

export default App;