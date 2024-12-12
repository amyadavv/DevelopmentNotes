import React, { useState } from "react";

function App() {
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
      <Todo title="Amit" description="Done"></Todo>
    </div>
  )
}
//create a component which take single todo

function Todo(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.description}</h2>
    </div>
  )
}

export default App;