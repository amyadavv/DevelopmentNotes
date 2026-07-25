# Notes for 7.1

# Routing

1. Single page application 
2. Client side bundle
3. Client side routing

## Simple explanation of all three

1. Single Page Application (SPA)
- In a SPA, the browser loads one main HTML page only once.
- After that, when you click around the app, it does not fully reload the page.
- It only updates the needed part of the screen, so it feels faster and smoother.

2. Client-side Bundle
- A bundle is a set of JavaScript (and sometimes CSS) files sent to the browser.
- This bundle contains your app code, components, and logic.
- Once the bundle is loaded, the browser can run most of the app without asking the server for every small page change.
- If the app uses code splitting/lazy loading, only the required bundle is downloaded first, and additional bundles are fetched when needed.

3. Client-side Routing
- Routing means deciding what to show for a URL path (like `/home`, `/about`, `/profile`).
- In client-side routing, this decision is made in the browser using JavaScript.
- So when you move between routes, the app changes the view without a full page refresh.


### What are routes? 

google.com/maps
facebook.com/messages

### How to do routing in react?

react-router-dom 

#### Code for routing

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/Home" element={<Home />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

function Dashboard() {
    return (
        <div>
            Dashboard
        </div>
    )
}
function Home() {
    return (
        <div>
            Home
        </div>
    )
}

- In react we are allowed to, if there is an component which take props as an input which can be a number, or string or it can be another component. So one component can use another component and render it inside. Here the concept of children is introduce. If there is a component 1 which return a simple div and there is a component 2 which takes children as an input. This component 2 can return a div which renders the children.
Then we can do that 
<!-- <Com2>
    <div><div/>
 <Com2/> -->

 or 

 <!-- <Com2>
    <Com1><Com1/>
 <Com2/> -->

- BrowserRouter this is given by react-router-dom library
- This much code is enough for you to do client side rendering. Means this much code is enough to create dynamic application which only gets the bundle once and based on current route render the right page.

#### window.location

Global Location object is something you have access in HTML. Using this we cannot do client side routing because when you log the location then you will find out that href: "http://localhost:5173/" so when you used this, this will switch to the different page. When you click on the button this will fetch data from the backend and will not do client side routing. We still refreshing the page (hard reload). See below example:

function App() {

    return (
        <div>
            <div>
                <button onClick={() => {
                    window.location.href = "/";
                }}>Landing Page</button>
                
                <button onClick={() => {
                    window.location.href = "/dashboard";
                }}>Dashboard</button>
            </div>
            <BrowserRouter>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="/" element={<Landing />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

#### useNavigate 

- used to navigate from one route to another without doing hard refresh (hard reload). It will do just changing the route keeping the same client bundle and changing the page because the route has changed. This is the right way to do client side routing when you switching from one page to another. 

Example :

import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Landing } from "./components/Landing";

function App() {

    return (
        <div>
            <BrowserRouter>
                <AppBar />
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="/" element={<Landing />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

function AppBar() {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => {
                navigate("/")
            }}>Landing Page</button>

            <button onClick={() => {
                navigate("/dashboard")
            }}>Dashboard</button>
        </div>
    )
}

export default App;

- useNavigate hook expects that whenever we are using this hook make sure you are using in a component inside the BrowserRouter. You cannot use useNavigate outside a component that is not inside the BrowserRouter

#### Lazy Loading

- Lazy loading means we do not load all route component code at app start.
- We load a component only when that route is opened by the user.
- This makes first load faster because initial bundle size is smaller.
- In your routing flow, Landing page code can load first, and Dashboard code can load later when user navigates to /dashboard.

Simple definition:
Lazy loading means loading code only when needed instead of sending everything in the first bundle.

So to use lazy component we have to wrap it inside a 'Suspense' which is another api that react provide, which is used to for the cases like asynchronous component fetching or asynchronous data fetching which basically means that we do not have the access to the dashboard or landing component immediately on the frontend. The lazy component need to get back data from the backend so it would take 1 sec or 3 sec so during this time what should the browser render. It is like I have to render dashboard but the browser does not have the dashboard it is coming from the backend. So for cases like this react provides the suspense api which means if the component is suspended (component which is inside the suspense tag)/ if the data is not there yet then render the fallback

Example: 
import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
const Dashboard = React.lazy(() => import("./components/Dashboard"))
const Landing = React.lazy(() => import("./components/Landing"))

function App() {
    return (
        <div>
            <BrowserRouter>
                <AppBar />
                <Routes>
                    <Route path="/" element={<Suspense fallback={"Loading..."}><Dashboard/></Suspense>}/>
                    <Route path="/dashboard" element={<Suspense fallback={"loading..."}><Landing/></Suspense>}/> 
                </Routes>
            </BrowserRouter>
        </div>
    )
}

function AppBar() {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => {
                navigate("/")
            }}>Landing Page</button>

            <button onClick={() => {
                navigate("/dashboard")
            }}>Dashboard</button>
        </div>
    )
}

export default App;

### Prop drilling


- Push it down as much as possible ( rule to store a state variable in a component ). 

- How do we should manage state variable?
1. Keep everything in the top level component.
2. Keep everything as low as possible.

- Either way, you will need to drill props down through the Component tree. This gets very hard to maintain and highly verbose. Makes code highly unreadable. 

- Prop drilling does not mean that parent re-renders children. It just means the syntactic uneasiness when writing code.

- Components are still getting re-render but thats not what prop drilling is. 

- The problem with passing props is passing props can become verbose and inconvenient when you need to pass some prop deeply through the tree, or if many components need the same prop. The nearest common ancestor could be far from the components that need data, and lifting state up that high can lead to a situation called "prop drilling".


### Context API

It helps to teleport data to the components in the tree that need it without passing props.
If you use the context api, you are pushing your state management outside the core react components. 
If you ever want to use context api, to teleport any state variable directly to a component, you need to make sure that component is wrap inside the 'provider' (provider - something that provide the context value later on). You need to wrap all the component that need to use the state inside the provider. When you initialize the createContext(), so this will return an object which has a provider in it.
 
#### Extra

- export default function  Dashboard () {
    return (
        <div>
            Dashboard Page
        </div>
    )
}

// "default" makes this the file's main export.
// So import it without curly braces:
// import Dashboard from "./components/Dashboard";
// If it were a named export, you would use:
// import { Dashboard } from "./components/Dashboard";
// Benefits of default export:
// 1) Cleaner import for the main component in a file.
// 2) Import name can be chosen freely by the importer.
// 3) Makes file intention clear: this is the primary export.
// Yes, a file can have multiple exports without default.
// In that case, use named exports for all items.
// Example:
// export function Dashboard() {}
// export function StatsCard() {}
// import { Dashboard, StatsCard } from "./components/Dashboard";