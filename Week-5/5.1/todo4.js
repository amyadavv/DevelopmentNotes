import React, { useState } from "react";

function App() {

  const [todos, setTodos] = useState([{
    title: "DSA",
    description: "5PM",
    completed: false
  }, {
    title: "MERN",
    description: "9PM",
    completed: false
  }])

  function addTodo () {
    setTodos([...todos, {
      title:"new Todo",
      description:"Tatte shot"
    }])
  }

  return (
    <div>
        <button onClick={addTodo}>Add extra todo</button>
      {todos.map(function (todo) {
        return <Todo title={todo.title} description={todo.description}></Todo>
      })}
    </div>
  )
}
export default App;

function Todo(proops) {
  return (
    <div>
      <h1>{proops.title}</h1>
      <h1>{proops.description}</h1>
    </div>
  )
}