import React, { useState } from "react";

function App() {
  const [title, setTitle] = useState("My name is Amit Yadav");

  function updateTitle () {
    setTitle("My name is " + Math.random()); 
  }

  return (
    <div>
      <button onClick={updateTitle}>Update the title</button>
      <Headers title={title} ></Headers>
      <Headers title="Raman"></Headers>
    </div>
  )
}

function Headers(props) {
  return (
    <div>
      {props.title}
    </div>
  )
}

export default App;