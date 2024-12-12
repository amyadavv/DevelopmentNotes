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

//   passing direct to todo through props 

  return (
    <div>
      <Todo title={todos[0].title} description={todos[0].description}></Todo>
      <Todo title={todos[1].title} description={todos[1].description}></Todo>
    </div>
  )
}

function Todo(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.description}</h2>
    </div>
  )
}

export default App;