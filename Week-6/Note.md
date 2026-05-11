## Notes 6.1 Class

A component can only return a single top level xml
Why ? Because react Makes it easy to do reconciliation ( the process of figuring out what DOM updates need to happen as your application grows )


<React.Fragment> <React.Fragment/> used to make a container used as a parent container for a react app at the top level. <></> and <React.Fragment><React.Fragment/> is the same thing.


## Re-rendering 

Anytime a final DOM manipulation happens, anytime a react actual updates the DOM is consider as a re-render. 
Thumb rule for a dynamic website is Minimize re-render. You will not see any performance issue is most of the website but when you create mobile app in react native or games then re-render super important to consider and minimize the re-render.

A re-render means that 
1. React did some work to calculate what all should update in this component.
2. The component actually got called (you can put a log to confirm this)
3. The inspector shows you a bounding box around the component (extension required which is react dev tools so inspect it then click on the components then click on the setting and check the Highlight updates when component render) 

It happens when 
1. A state variable that is being used inside a component changes
2. A parent component re-render triggers all children re-rendering


You want to minimize the number of re-renders to make a highly optimal react app
The more the component that are getting re-rendered, the worse

So the first step we can do to minimize the re-render is:
1. Pushing the state down (if that state only uses in the child component)

import React, { useState } from "react";

function App() {
  return (
    <div>
      <HearderWithTitle></HearderWithTitle>
      <Headers title="Raman"></Headers>
    </div>
  )
}

function HearderWithTitle() {

  const [title, setTitle] = useState("My name is Amit Yadav");

   function updateTitle () {
    setTitle("My name is " + Math.random()); 
  }

  return (
    <div>
      <button onClick={updateTitle}>Update the title</button>
        <Headers title={title} ></Headers>

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



2. The other solution is use react.memo.

React.Memo lets you skip re-rendering a component when its props are unchanged.

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

const Headers = React.memo(function Headers(props) {
  return (
    <div>
      {props.title}
    </div>
  )
})


React have a virtual dom and whenever the state changes it calculate the difference between the original dom and virtual dom and updates the dom.

## Keys in react

Whenever your'e rendering an array in react to make sure react knows which array element is updated because an array can be sorted, flip, added items, delete items etc. So react can easily get confused that which was the first element, or second element etc. so this will increase the number of renders at the end. But without adding key the app still works. So key will uniquely identify each element in an array

Example: -

import React from 'react';
import { useState } from 'react';
let count = 4;
function App() {
  const [todos, setTodos] = useState([{
    id: 1,
    title: "Todo 1",
    description: "Description 1"
  }, {
    id: 2,
    title: "Todo 2",
    description: "Description 2"
  }, {
    id: 3,
    title: "Todo 3",
    description: "Description 3"
  }]);

  function addTodos () {
    setTodos([...todos,{id: count++, title:"Todo", description:Math.random()}])
  }
  return (
    <div>
      {/* {todos.map(todo => 
        <CreateTodo title={todo.title} description={todo.description} />
      )} */}
      {/* or this syntax */}
      <button onClick={addTodos}>Add Todo</button>
      {todos.map( function (todo) {
        return <CreateTodo key={todo.id} title={todo.title} description={todo.description} />
      })}
    </div>
  )
}
function CreateTodo({title, description}) {
  return (
    <div>
      <h1>{title}</h1>
      <h2>{description}</h2>
    </div>
  )
}
export default App;

## Wrapper Components 

Component that takes other component as an input and render it correctly.
Example :

// This syntax is not optimal and will not be used

function App() {
  return (
    <div>
      <CardWrapper innerComponent={<TextComponent />} />
    </div>
  )
}


function CardWrapper({ innerComponent }) {
  return (
    <div style={{ border: "4px solid black" }}>
      {innerComponent}
    </div>
  )
}

function TextComponent() {
  return (
    <div>Hii There</div>
  )
}

export default App;


The read wrapper:

Whenever you write a component inside which you put bunch of children could be a string could be a span or could be a another component so we can access the above whole thing as a children variable into that component in which it is passed.

function App() {
  return (
    <div>
      <CardWrapper>
          Hi there from the card wrapper component!
      </CardWrapper>
      <CardWrapper>
          <TextComponent/>
      </CardWrapper>

    </div>
  )
}
function CardWrapper({ children }) {
  return (
    <div style={{ border: "4px solid black" }}>
      {children}
    </div>
  )
}
export default App;

So if you want to build a lot of cards then you can create a wrapper card component that takes the inner React component as an input.

## Hooks

These functions that start with use are called hooks. Hooks in react are functions that allow you to "hook into" React state and lifecycle features from function components.
Popular hooks are useState, useEffect, useMemo, useCallback, useRef, useReducer, useContext, useLayoutEffect

So what are lifecycle features :- It means that whenever the component first mounted (mount means render. It means whenever the component first time put into the DOM it is called mount). 

useEffect lets you hook into the lifecycle features.

useEffect(() => {
    fetch("https://locahhost:3000/todos")
    .then(async (res) => {
        const json = await res.json();
        setTodos(json.todos);
    })
}, []) // This is the dependency array so in this array if this changes maybe we put state so when a state update then this useEffect will run again. So this array represents when useEffect run. If we do not pass it the useEffect will run infinitely.

you cannot async the useEffect function it will fail (useEffect( async () {}))
If you want to do it async useEffect then use library 'useAsyncEffect'


## Notes for 6.2

Side Effects - In react the concept of side effect encompasses any operations that reach outside the functional scope of a react component. These operations can affect other components, interact with the browser, or perform asynchronous data fetching.

Anything that is not related to rendering (putting things on the DOM taking things out of the DOM) are called side effects. Specifically things like  whenever we try to fetch data from the backend or we try to create setTimeout and setInterval or we directly manipulate the DOM (which we should not do it) all of these can be consider as side effects. These aren't part of the main react rendering cycle

Hooks - Hooks are a feature introduced in React 16.8 that allow you to use state and other React features without writing a class. They enable functional components to have access to stateful logic and lifecycle features, which were previously only possible in class components. This has led to a more concise and readable way of writing components in react.