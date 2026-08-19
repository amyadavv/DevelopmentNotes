# Custom Hooks

## What are hooks?

Hooks are a feature introduced in react 16.8 that allow you to use state and other React features without writing a class. They are functions that let you "hook into" React state and lifecycle features from function components. 

## Lifecycle events

Events that can get triggered or some code that you can run whenever a lifecycle of a component changes, whenever a component mounts which means first time the component gets put on the DOM or it unmounts whenever it get put off the DOM/screen these are called lifecycle events and a lot of time we need to run some code when the component mounts and when the component unmounts. The way to do that in functional components is using useEffect

## useEffect

``` jsx

useEffect(()=> {
    console.error("component mounted");     // whenever the component first mount this one will log

    return () => {
        console.log("component unmounted")  // 
    };
}, []);

```

useEffect can also return something, it should always return function don't return any other value. So this function runs whenever the dependency changes. So whenever the dependency changes the function from the last render would run first then above code runs again in the useEffect in this case it is console.error("component mounted");
So if you have a useEffect which has some dependency then the first time the dependency changes this code run - console.error("component mounted"); then the second time the dependency change first this code runs - return () => {console.log("component unmounted")  }; (this is for cleanup) then the above useEffect code runs again - console.error("component mounted"); 

When there is no dependency then when the component mount this code run - console.error("component mounted");  and when the component unmount this code runs - return () => {console.log("component unmounted")  };

How to unmount a component example - 

Example 1:

```jsx

function App () {
    const [render, setRender] = useState(true);

    useEffect(()=>{
        setTimeout(()=>{
            setRender(false);
        },10000)
    },[]);

return (
    <>
        {render ? <MyComponent/> : <div>2nd div</div> }
    </>
)
}

function MyComponent () {
    useEffect (()=>{
        console.error("component mounted");

        return () => {
            console.log("component unmounted");
        };
    }, []);

    return (
        <div> From inside my component </div>
    )
}

```

Example 2 

```jsx

function App () {
    const [render, setRender] = useState(true);

    useEffect(()=>{
        setInterval(()=>{
            setRender(r => !r);
        },5000)
    },[]);

return (
    <>
        {render ? <MyComponent/> : <div>2nd div</div> }
    </>
)
}

function MyComponent () {
    useEffect (()=>{
        console.error("component mounted");

        return () => {
            console.log("component unmounted");
        };
    }, []);

    return (
        <div> From inside my component </div>
    )
}

```
## Custom Hooks

Hooks that you create yourself, so other people can use them are called custom hooks. 
A custom hook is effectively a function, but with the following properties-
1. Uses another hook internally (useState, useEffect, another custom hook)
2. Starts with use

A few good examples of this can be 
1. Data fetching hooks.
2. Browser functionality related hooks - useOnlineStatus, useWindowSize, useMousePosition
3. Performance/Timer based - useInterval, useDebounce


### Data fetching hooks

Data fetching hooks can be used to encapsulate all the logic to fetch the data from your backend.
Example: 

``` jsx 

import { useEffect, useState } from 'react'
import axios from 'axios'

function useTodos () {
    const [todos, setTodos] = useState([]);

    useEffect(()=> {
        axios.get("url")
        .then(res => {
            setTodos(res.data.todos);
        })
    }, [])

    return todos;
}

function App () {
    // const [todos, setTodos] = useState([]);

    // useEffect(()=> {
    //     axios.get("url")
    //     .then(res => {
    //         setTodos(res.data.todos);
    //     })
    // }, [])

    const todos = useTodos();

    return (
        <div>
        {todos.map(todo => <Track todo={todo}/>)}
        </div>
    )
}

function Track ({todo}) {
    return <div>
    {todo.title}
    <br/>
    {todo.description}
    </div>
}

```

export default App;

Example with loading: 

```jsx

import { useEffect, useState } from 'react'
import axios from 'axios'

function useTodos () {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        axios.get("url")
        .then(res => {
            setTodos(res.data.todos);
            setLoading(false);
        })
    }, [])

    return {todos, loading};
}

function App () {

    const {todos, loading} = useTodos();

    if(loading) {
        return <div> Loading... </div>
    }

    return (
        <div>
        {todos.map(todo => <Track todo={todo}/>)}
        </div>
    )
}

function Track ({todo}) {
    return <div>
    {todo.title}
    <br/>
    {todo.description}
    </div>
}

export default App;

```

### Auto refreshing hooks

What if you want to keep polling the backend every n seconds? n needs to be passed in as an input to the hook. 

```jsx 

import { useEffect, useState } from 'react'
import axios from 'axios'

function useTodos (n) {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const value = setInterval (()=> {
            axios.get("url")
                .then(res => {
                    setTodos(res.data.todos);
                    setLoading(false);
                })
        },n * 1000)
    axios.get("url")
        .then(res => {
            setTodos(res.data.todos);
            setLoading(false);
        })

    return () => {
        clearInterval(value)
    }

    },[n])

    return {todos, loading};
}

function App () {

    const {todos, loading} = useTodos(5);

    if(loading) {
        return <div> Loading... </div>
    }

    return (
        <div>
        {todos.map(todo => <Track todo={todo}/>)}
        </div>
    )
}

function Track ({todo}) {
    return <div>
    {todo.title}
    <br/>
    {todo.description}
    </div>
}

export default App;

```

### SWR library - React Hooks for Data fetching

But its better to use your own custom hook rather than using Data fetching library

SWR is a popular React library that creates a lot of these hooks for you, and you can use it directly. 

Example:

``` jsx

import useSWR from 'swr'

// const fetcher = (url) => fetch(url). then((res)=> res.json());
const fetcher = async function (url) {
    const data = await fetch(url);
    const json = await data.json();
    return json();
};

function Profile () {
    const { data, error, isLoading } = useSWR('url', fetcher)

    if(error) return <div> failed to load </div>
    if(isLoading) return <div> Loading ... </div>
    return <div>hello, you have {data.todos.length} todos!</div>
 }


```

### Browser Functionality related hooks

1. useIsOnline hook 

Create a hook that returns true or false based on weather the user is currently online

You are given that - 

- window.navigator.onLine returns true or false based on weather the user is online 
- You can attach the following event listeners to listen to weather the user is online or not

``` jsx
window.addEventListener('online', () => console.log('Became online'));
window.addEventListener('offline', () => console.log('Became offline'));
``` 
Solution : 
```jsx
function useIsOnline () {
    const [isOnline, setIsOnline] = useState(window.navigator.onLine);

        useEffect(()=> {
            window.addEventListener("online", ()=> {
                setIsOnline(true);
            })
            window.addEventListener("offline", ()=> {
                setIsOnline(false);
            })
        },[])
            return isOnline;
}

```

2. useMousePointer hook

Create a hook that returns you the current mouse pointer position.

```jsx 

import { useEffect, useState } from 'react'

const useMousePointer = () => {
    const [position, setPosition] = useState({x: 0, y: 0});

    const handleMouseMove = (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
    };

    useEffect (()=> {
        window.addEventListener('mousemove', handleMouseMove)
        return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        }
    },[]);
    return position;
}

function App () {
    const mousePointer = useMousePointer();

    return (
        <>
        Your mouse position is {mousePointer.x} {mousePointer.y}
        </>
    )
}

export default App

```

### Performance/Timer based

1. useInterval 

Create a hook that runs a certain callback function every n seconds.

Solution - 

``` jsx

import { useEffect, useState } from 'react';

function useInterval (fn , timeout) {
    useEffect(()=>{
        const int = setInterval(()=> {
            fn();
        },timeout);
        return () => {
            clearInterval(int);
        }
    },[])
}

function App () {
    const [count, setCount] = useState(0);

    useInterval(()=> {
        setCount(c => c+1);
    },1000)

    return (
        <div> Timer is at {count} </div>
    )
}

export default App;

```

2. useDebounce

Create a hook that debounce a value given 
- The value that needs to be debounced
- The interval at which the value should be debounced

Solution:

``` jsx 


```