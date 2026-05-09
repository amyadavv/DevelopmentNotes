import React from "react";
function App() {
  return (
    <div>
      <Headers title="Amit"></Headers>
      <Headers title="Amit"></Headers>

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

// you can also pass title as - Object destructuring

function Headers2 ({title}) {
return 
  <div>
    {title} 
  </div>

} 
export default App;