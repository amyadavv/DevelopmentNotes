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