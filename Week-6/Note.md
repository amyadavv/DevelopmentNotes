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

We cannot print the key on the DOM

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


The real wrapper:

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
}, []) // This is the dependency array so in this array if this changes, maybe we put state so when a state update then this useEffect will run again. So this array represents when useEffect run. If we do not pass it the useEffect will run on every render.

you cannot async the useEffect function it will fail (useEffect( async () {}))
If you want to do it async useEffect then use library 'useAsyncEffect'


## Notes for 6.2

Side Effects - In react the concept of side effect encompasses any operations that reach outside the functional scope of a react component. These operations can affect other components, interact with the browser, or perform asynchronous data fetching.

Anything that is not related to rendering (putting things on the DOM taking things out of the DOM) are called side effects. Specifically things like  whenever we try to fetch data from the backend or we try to create setTimeout and setInterval or we directly manipulate the DOM (which we should not do it) all of these can be consider as side effects. These aren't part of the main react rendering cycle

Hooks - Hooks are a feature introduced in React 16.8 that allow you to use state and other React features without writing a class. They enable functional components to have access to stateful logic and lifecycle features, which were previously only possible in class components. This has led to a more concise and readable way of writing components in react.

Common Hooks - useState, useEffect, useCallback, useMemo, useRef, useContext

## useState

Let's you describe the state of your app whenever state updates, it triggers a re-render which finally results in a DOM update. 

## useEffect

The 'useEffect' hook is a feature in React, a popular Javascript library for building user interfaces. It allows you to perform side effects in function components. Side effects are operations that can affect other components or can't be done during rendering, such as data fetching, subscriptions, or manually changing the DOM in React components. 
The 'useEffect' hook serves the same purpose as 'componentDidMount', 'componentDidUpdate' and 'componentWillUnmount' in React class components, but unified into a single API. 

The useEffect always run at the first render and will run again if the dependency array changes

if there is any condition under which you want to hit the code again which is  inside the useEffect then use dependency array (put condition inside this array). So condition means state variable, dependency array always take state variable as a input so any time the state variable changes the code inside the useEffect reruns.
It is not necessary that the dependency is always take a state it can take another things maybe a variable its a very dangerous thing to do. So dependency array should be a state variable.

Example : 

import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [counter, setCounter] = useState(1);
  return (
    <div>
      <button onClick={function() {
        setCounter(1)
      }}> 1 </button>
      <button onClick={function() {
        setCounter(2)
      }}> 2 </button>
      <button onClick={function() {
        setCounter(3)
      }}> 3 </button>
      <Todo id={counter}></Todo>
    </div>
  )
}
function Todo({ id }) {
  const [todo, setTodo] = useState([]);

  useEffect(()=> {
    axios.get("" + id)
    .then(function(response) {
      setTodos(response.data.todo)
    })
  },[id])
  
  return (
    <div>
      <h1>{todo.title}</h1>
      <h2>{todo.description}</h2>
    </div>
  )
}

export default App;

## useMemo

What memoization means? Its a mildly DSA concept. It means remembering some output given an input and not computing it again. It is very similar to caching 

example :

import { useState, useEffect, useMemo } from "react";
import axios from "axios";
function App() {
  const [counter, setCounter] = useState(0);
  const [value, setValue] = useState(1);

  let counterM = useMemo(() => {
    let count = 0;
    for (let i = 1; i <= value; i++) {
      count = count + i;
    }
    return count;
  }, [value])

  // memoize the value across re-renders, only recalculate it if Value changes


  return (
    <div>
      <input onChange={function (e) {
        setValue(e.target.value)
      }} ></input>

      <div>Sum from 1 to {value} is {count}</div>

      <button onClick={function () { setCounter(counter + 1) }}>Counter ({counter})</button>
    </div>
  )



}

export default App;

Anytime dependency array changes the useMemo run 

useReducer is least used hook.


## useCallback

It is a hook in React, a popular JS library for building user interfaces. It is used to memoize functions, which can help in optimizing the performance of your application, especially in cases involving child components that rely on reference equality to prevent unnecessary renders. 


// 1. In this code the child always re-render because the state variable changes and 'Child' is the child component of App so when ever the parent re-renders the child always re-renders no matter the props changes or not.  


// import { useState, useEffect, useMemo, memo } from "react";

// function App() {
//   const [count, setCount] = useState(0);

//   // function inputFunction () {
//   //   console.log("Hii there");
//   // }

//   return ( 
//     <div>
//       <Child/>
//       <button onClick={() => {
//         setCount(count+1);
//       }}> Click Me {count}</button>
//     </div>
//   )
// }

// const Child = () => {
//   console.log("child render");
//   return ( 
//     <div>
//       <button >Button clicked</button>
//     </div>
//   )
// }

// export default App;



// 2. Now the memo does that the child component or any component it only renders if the props changes. 

// import { useState, useEffect, useMemo, memo } from "react";

// function App() {
//   const [count, setCount] = useState(0);

//   // function inputFunction () {
//   //   console.log("Hii there");
//   // }

//   return ( 
//     <div>
//       <Child/>
//       <button onClick={() => {
//         setCount(count+1);
//       }}> Click Me {count}</button>
//     </div>
//   )
// }

// const Child = memo ( () => {
//   console.log("child render");
//   return ( 
//     <div>
//       <button >Button clicked</button>
//     </div>
//   )
// })
// export default App;


// 3. But now in this code the props does not changes we can easily see the code flow but the 'Child' still re-renders. It is because the function is stored in the memory and whenever re-renders happen the function address changes and memo think that the props changes so the 'Child' re-renders


// import { useState, useEffect, useMemo, memo } from "react";

// function App() {
//   const [count, setCount] = useState(0);

//   function inputFunction () {
//     console.log("Hii there");
//   }

//   return ( 
//     <div>
//       <Child newFnc = {inputFunction}/>
//       <button onClick={() => {
//         setCount(count+1);
//       }}> Click Me {count}</button>
//     </div>
//   )
// }

// const Child = memo ( ({newFnc}) => {
//   console.log("child render");
//   return ( 
//     <div>
//       <button onClick={newFnc} >Button clicked</button>
//     </div>
//   )
// })

// export default App;


// 4. 





import { useState, useEffect, useMemo, memo, useCallback } from "react";

function App() {
  const [count, setCount] = useState(0);

  const inputFunction = useCallback(() => {
    console.log("Hii there");
  },[])

  // So this is now a function wrapped inside a useCallback and only if something in dependency array changes will be consider this inputFunction to change else this inputFunction is same across renders.
  // We memoized this function, across re-render we will remember its original implementation we will not keep redefining the inputFunction unless any dependency changes 

  return (
    <div>
      <Child newFnc={inputFunction} />
      <button onClick={() => {
        setCount(count + 1);
      }}> Click Me {count}</button>
    </div>
  )
}

const Child = memo(({ newFnc }) => {
  console.log("child render");
  return (
    <div>
      <button onClick={newFnc} >Button clicked</button>
    </div>
  )
})

export default App;

if we use 'useCallback' we will get back function - function = useCallback
if we use 'useMemo' we will get back number/string - number/string = useMemo


## Extra things 

// import { useEffect, useState } from "react"

// function App() {
//   const [count, setCount] = useState(0);
//   return (
//     <div>
//       <button onClick={() => {
//         setCount (count + 1);
//         setCount (count + 1);
//       }}> Click Me
//       </button>
//     </div>
//   )
// }

// export default App;

// When we click on the button it does not update to 2, it will update 1 by 1 means only add 1 at a time why? Because whenever we are updating the setCount it does not updated synchronously it is updating asynchronously. So the state does not immediately updated. It will be      setCount (count + 1); ( 0 + 1 )
//        setCount (count + 1); ( 0 + 1 ) the count variable does not change immediately. So if you want to do update the state by 2 then do this 


import { useEffect, useState } from "react"

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => {
        setCount (function (e) { return e + 1 });
        setCount (function (e) { return e + 1 });
      }}> Click Me {count}
      </button>
    </div>
  )
}

export default App;


import { useState, useCallback } from "react";

function App() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Render")
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <Child onClick={handleClick} />
    </div>
  )
}
function Child({ onClick }) {
  return (
    <button onClick={onClick}>Click Here</button>
  )
}
export default App;

// This is not infinitely rendering, anytime count changes handleClick ka signature changes this does not called (handleClick) so this function actually does not call it only called when we clicked on the 'Child' button which is why this is not infinity render. useCallback does not mean that if count is changed the inside code will run, it will only change the signature of the function (change the function looks like means reference different function), it does not call the function.

Pure component is class based and memo is the same. They do the same thing.

== for number integers it is equality by value ( let a = 1, let b =1, a==b is true)
== for functions, objects, arrays it is equality by reference 

## Custom Hooks

Just like useState, useEffect, you can write your own hooks. Only condition is - It should start with a 'use' (naming convention)

We cannot define random function inside which we use useState we cannot do that if you want to ever use a hook, the function inside which it is defined either needs to be a hook or needs to be a component. We cannot create a raw function and use useState inside.


import { useEffect, useState } from "react"
import axios from "axios";

function useTodos () {
   const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get ("")
      .then(function (res) {
        setTodos(res.data.todos);
      })
  }, [])
  return todos;
}

function App() {

  const todos = useTodos();
 

  return (
    <div>

    </div>
  )
}

Another Example : 

import { useEffect, useState } from "react"

function useCounter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(count + 1)
        console.log("Counter update" + count);
    }, [])

    return [count, setCount];
}

function App() {
    const [counter, setCounter] = useCounter();
    return (
        <div>
            <button onClick={function () {
                setCounter(counter + 1)
            }} > Click Me {counter} </button>
        </div>
    )
}

export default App;

When you want to do async call you have to use useEffect and if something depends on something synchronously then we use useMemo. 
We can also memoized object using useMemo

## Notes for 6.3 Class

### Reconciliations

When you are the developer in react you write some state management code, you give your state to react and react reconcile what should the DOM look like now and finally render things on the DOM. So what is reconciliation, it is the process of taking the current state finding the difference from the existing state reconciling what DOM the should look like right now and putting things on the DOM.

In React, reconciliation is the process of comparing the old virtual DOM with the new virtual DOM and updating only the changed parts in the real DOM.

Can you do DOM manipulation yourself - Yes
Should you do it yourself - No
Is it good for you to delegate the heavy task of calculating the DOM change to React - Yes
What do you give to react - The state
How often does react re-render - Any time state changes
Does react have tricks to make calculations faster - Yes 

Also react does not do DOM manipulation, the reactDOM library does. 
Re-render - If Function app running means this component re-rendered.

#### useMemo

import { useEffect, useMemo, useState } from 'react'

function App() {
  const [exchange1Data, setExchange1Data] = useState({});
  const [exchange2Data, setExchange2Data] = useState({});
  const [bankData, setBankData] = useState({});

  useEffect(() => {
    // Some operation to get the data
    setExchange1Data({
      returns: 100
    });
  }, [])

  useEffect(() => {
    // Some operation to get the data
    setExchange2Data({
      returns: 100
    });
  }, [])

  useEffect(() => {
    // Some operation to get the data
    setTimeout(() => {
      setBankData({
        income: 100
      });
    },5000)
  }, [])

  const cryptoReturns = useMemo(()=> {
    return exchange1Data.returns + exchange2Data.returns;
  },[exchange1Data, exchange2Data]) 
  
  const incomeTax = (cryptoReturns + bankData.income) * 0.3

  return (
    <div>
        hi there, your income tax returns are {incomeTax}
    </div>
  )
}

export default App

#### useCallback

If you ever want to memoize a function, we use useCallback. useCallback is not about minimizing the amount of code that is run. useCallback is about not rendering a child component, if the function has not/does not need to change across renders. 

Example : 


 import { useCallback, useEffect, useMemo, useState } from 'react'

function App() {
  const [exchange1Data, setExchange1Data] = useState({});
  const [exchange2Data, setExchange2Data] = useState({});
  const [bankData, setBankData] = useState({});

  useEffect(() => {
    // Some operation to get the data
    setExchange1Data({
      returns: 100
    });
  }, [])

  useEffect(() => {
    // Some operation to get the data
    setExchange2Data({
      returns: 100
    });
  }, [])

  useEffect(() => {
    // Some operation to get the data
    setTimeout(() => {
      setBankData({
        income: 100
      });
    },5000)
  }, [])

  const calculateCryptoReturns = useCallback(function () {
    return exchange1Data.returns + exchange2Data.returns;
  },[exchange1Data, exchange2Data])
  
  return (
    <div>
        <CryptoGainsCalculator calculateCryptoReturns={calculateCryptoReturns}/>
    </div>
  )
}

const CryptoGainsCalculator = memo (function ({calculateCryptoReturns}) {
    return <div>
        Your crypto return are {calculateCryptoReturns()}
    </div>
})

export default App

Example: 

import { useCallback, useState } from "react";

// Create a counter component with increment and decrement functions. Pass these functions to a child component which has buttons to perform the increment and decrement actions. Use useCallback to ensure that these functions are not recreated on every render.

export function Assignment1() {
    const [count, setCount] = useState(0);

    // Your code starts here
    const handleIncrement = useCallback(() => {
        // setCount(count + 1);
        // This will use the count the state variable to update the state. Uses count from the closure (the value captured when this render happened). If multiple updates happen quickly, this can use an old value (stale state). To use this we need to add count in the dependency array if not then this function wont run again. 
        setCount(function (currentCount) {
            return currentCount + 1;
        })
        // This will use current count for the increment. React passes the latest state value into currentCount at update time. Safe for batched updates and repeated clicks.
    }, [])

    const handleDecrement = useCallback(() => {
        setCount(currentCount => currentCount - 1)
    }, [])
    // Your code ends here

    return (
        <div>
            <p>Count: {count}</p>
            <CounterButtons onIncrement={handleIncrement} onDecrement={handleDecrement} />
        </div>
    );
};

const CounterButtons = memo(({ onIncrement, onDecrement }) => (
    <div>
        <button onClick={onIncrement}>Increment</button>
        <button onClick={onDecrement}>Decrement</button>
    </div>
));

#### useRef

It lets you do two thing:

1. This hook is used to get reference to DOM elements. (most important use case)
2. Maintain a variable across re-renders.

Example: 

import { useEffect, useRef, useState } from "react"

function App() {
    const [incomeTax, setIncomeTax] = useState(20000);
    const divRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            console.log(divRef.current);
            divRef.current.innerHTML = 10
        }, 5000)
    }, []);
    // why use current because current used to access to the current reference of that specific div  
    return (
        <div>
            Hi there, your income tax are <div ref={divRef}>{incomeTax}</div>

            <div> // The divRef which I defined on the top contain the reference of this div element. </div>

        </div>
    )
}
export default App;

Example: 

import { useEffect, useRef } from "react";

// Create a component with a text input field and a button. When the component mounts or the button is clicked, automatically focus the text input field using useRef.

export function Assignment1() {
    const divRef = useRef();

    useEffect(() => {
        divRef.current.focus();
    }, []);

    const handleButtonClick = () => {
        divRef.current.focus();
    };

    return (
        <div>
            <input type="text" placeholder="Enter text here" ref={divRef} />
            <button onClick={handleButtonClick}>Focus Input</button>
        </div>
    );
};

Example 2: 

import React, { useState, useCallback, useRef } from 'react';

// Create a component that tracks and displays the number of times it has been rendered. Use useRef to create a variable that persists across renders without causing additional renders when it changes.

export function Assignment2() {
    const [, forceRender] = useState(0);
    const countRender = useRef(0);

    const handleReRender = () => {
        // Update state to force re-render
        forceRender(Math.random());
    };
    countRender.current = countRender.current + 1;

    return (
        <div>
            <p>This component has rendered {countRender.current} times.</p>
            <button onClick={handleReRender}>Force Re-render</button>
        </div>
    );
};


// `useRef` can store a value that survives re-renders, but changing it does not re-render the UI.

// Think of it like a private notebook:
// 1. React does not erase it on every render.
// 2. Writing in that notebook does not tell React to repaint the screen.

// Why this is useful in your Assignment2:
// 1. You want to count how many times component rendered.
// 2. If you use `useState` for this count, updating it will cause another render, which can create a loop/confusion.
// 3. If you use `useRef`, you can increment the count safely without triggering extra renders.

// Typical pattern:
// - `const renderCount = useRef(0);`
// - inside render/effect: `renderCount.current += 1;`
// - show it on screen when some other render happens.

// So main difference:
// - `useState`: stores value + causes re-render on update.
// - `useRef`: stores value + does NOT cause re-render on update.


### Reducer function 

array.reduce((accumulator, currentValue) => {
  // logic
  return accumulator;
}, initialValue);

Parameters:
accumulator → stores the result of previous iterations
currentValue → current element being processed
initialValue → starting value (optional but recommended)

example: 

const numbers = [1, 2, 3, 4];

const sum = numbers.reduce((acc, curr) => {
  return acc + curr;
}, 0);

console.log(sum); // 10

👉 How it works:

acc=0, curr=1 → 1
acc=1, curr=2 → 3
acc=3, curr=3 → 6
acc=6, curr=4 → 10
 