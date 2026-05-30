# React Context API

## What is Context API?

The Context API is a built-in React feature that allows you to **share state across the component tree without passing props manually at every level** — this problem is known as **prop drilling**.

Think of it as a "teleporter" for state: you define data at a top-level component and any deeply nested child can access it directly, skipping all the intermediate components in between.

---

## Why Use Context?

Without Context, passing data from a grandparent to a grandchild requires threading props through every component in between — even those that don't care about the data at all. This is **prop drilling** and it makes code hard to maintain.

**Without Context (prop drilling):**
```
App (has `user` state)
  └── Layout (passes `user` down)
        └── Sidebar (passes `user` down)
              └── UserAvatar (finally uses `user`)
```

**With Context:**
```
App (provides `user` via Context)
  └── Layout
        └── Sidebar
              └── UserAvatar (consumes `user` directly)
```

---

## Core Concepts

| Concept | Description |
|---|---|
| `createContext()` | Creates a new context object |
| `Context.Provider` | Wraps the component tree and supplies the value |
| `useContext()` | Hook used inside a component to read the context value |

---

## Important Caveat — Re-renders

> **A component that is wrapped inside a `Provider` will re-render whenever the context value changes — even if that component doesn't use the context value itself.**

This is a common performance gotcha. If you have a large subtree under a Provider and the context value changes frequently (e.g., on every keystroke), all components inside that tree re-render. Solutions include splitting contexts, using `React.memo`, or reaching for a state manager like Zustand/Redux for high-frequency updates.

---

## Code Example

```jsx
import React, { createContext, useContext, useState } from "react";

// 1. Create the context
const UserContext = createContext(null); // Think of this as creating a global communication channel.

// 2. Create a Provider component. This is where actual data is stored.
function UserProvider({ children }) {
  const [user, setUser] = useState({ name: "Alice", role: "Admin" });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// 3. Intermediate component — does NOT use user, but is still in the tree
function Layout({ children }) {
  console.log("Layout rendered"); // re-renders when context value changes
  return <div className="layout">{children}</div>;
}

// 4. Deep child — directly consumes the context
function UserProfile() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>Role: {user.role}</p>
      <button onClick={() => setUser({ name: "Bob", role: "User" })}>
        Switch User
      </button>
    </div>
  );
}

// 5. Root App
export default function App() {
  return (
    <UserProvider>
      <Layout>
        <UserProfile />
      </Layout>
    </UserProvider>
  );
}
```

### What happens when "Switch User" is clicked?
1. `setUser` updates state inside `UserProvider`.
2. The new value flows through `UserContext.Provider`.
3. **Both `Layout` and `UserProfile` re-render** — even though `Layout` never reads the context.
4. `UserProfile` gets the new user data and displays it.

---

## When to Use Context vs. Props

| Situation | Use |
|---|---|
| Data needed by many components at different nesting levels | Context |
| Data only needed by a direct child | Props |
| High-frequency updates (e.g., form input) | Local state or Zustand/Redux |
| Global app data (theme, auth, locale) | Context |

---

## Summary

- Use `createContext` → `Provider` → `useContext` to share state globally.
- Avoids prop drilling through unrelated components.
- Be aware that all components under a Provider re-render on value change, regardless of whether they consume the context.


## Why do we use context api

- To make rendering more performative - no
- To make syntax cleaner / get rid of prop drilling

# State Management 

A cleaner way to store the state of your app. Until now, the cleanest thing you can do is use the context API. It lets you teleport state. But there are better solutions that get rid of the problem that context api has (unnecessary re-renders)

- Recoil - A state management library for React written by some ex React folks (maybe).

- Recoil has the concept of an atom to store the state. An atom can be defined outside the component. Can be teleported to any component. 

- To understand recoil we need to first create atom. An atom is similar to useState. The biggest importance of atom is now you can define your component tree how ever you want. Your atom is always define outside in the different file.

- Things to learn - RecoilRoot, atom, useRecoilState, useRecoilValue, useSetRecoilState, selector

- useState and useRecoilState are exactly same
- useRecoilValue this will give us just the value, we don't need to create an array. When we just want the value and need not to worry about updating the value
- useSetRecoilState when you only want to update the variable and not actually get the value.

- If a state is only using in a component then we can use useState. Recoil is mostly used for the global state where that state is used by many components.

Example- 

import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { countAtom } from "./store/atoms/count";

function App() {
    return (
        <div>
            <RecoilRoot> // to use the recoil in the child component we need to wrap the parent component
                <Count />
            </RecoilRoot>
        </div>
    )
}

function Count() {
    console.log("Re-render?")
    return (
        <div>
            <CountRenderer></CountRenderer>
            <Buttons></Buttons>
        </div>
    )
}

function CountRenderer() {
    const count = useRecoilValue(countAtom);
    return (
        <div>
            {count}
        </div>
    )
}

function Buttons() {
    const setCount = useSetRecoilState(countAtom);
    // using this the re-rendering of buttons is also stop
    console.log("Re-rendering of buttons")
    return (
        <div>
            <button onClick={function () {
                setCount(function (c) {
                    return c + 1;
                })
            }} >Increase</button>
            <button onClick={function () {
                setCount(function (c) {
                    return c - 1;  // this does not required the count, it will get the current value and update it.
                })
            }} >Decrease</button>
        </div>
    )
}

export default App;

store/atoms/Count.jsx


import { atom } from "recoil"

export const countAtom = atom({
    key: 'countAtom',  // uniques way to identify an atom.
    default: 0   // what you want the default value of a specific atom will be
})

- Selector - A selector represents a piece of derived state. You can think of derived state as the output of passing state to a pure function that derives a new value from the said state. 
When you know something completely depends on another state variable.


import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { countAtom, evenSelector } from "./store/atoms/count";
import { useMemo } from "react";

function App() {
    // <RecoilRoot> // to use the recoil in the child component we need to wrap the parent component
    return (
        <div>
            <RecoilRoot>
                <Count />
            </RecoilRoot>
        </div>
    )
}

function Count() {
    console.log("Re-render?")
    return (
        <div>
            <Buttons></Buttons>
            <CountRenderer></CountRenderer>
        </div>
    )
}

function CountRenderer() {
    const count = useRecoilValue(countAtom);
    return (
        <div>
            {count}
            <EvenCountRender></EvenCountRender>
        </div>
    )
}

function EvenCountRender () {
    // const count = useRecoilValue(countAtom);
    // When ever we have derived state we use useMemo, so it only re-renders when count changes.
    // const isEven = useMemo(()=>{
    //     return count % 2 == 0 
    // },[count])
    const isEven = useRecoilValue(evenSelector);

    return (
        <div>
            {isEven ? "It is even" : null}
        </div>
    )
}

function Buttons() {
    const setCount = useSetRecoilState(countAtom);
    // using this the re-rendering of buttons is also stop
    console.log("Re-rendering of buttons")
    return (
        <div>
            <button onClick={function () {
                setCount(function (c) {
                    return c + 1;
                })
            }} >Increase</button>
            <button onClick={function () {
                setCount(function (c) {
                    return c - 1;  // this does not required the count, it will get the current value and update it.
                })
            }} >Decrease</button>
        </div>
    )
}

export default App;

count.jsx 


import { atom, selector } from "recoil"

export const countAtom = atom({
    key: 'countAtom',  // uniques way to identify an atom.
    default: 0   // what you want the default value of a specific atom will be
})

export const evenSelector = selector({
    key: "evenSelector",
    get: ({get}) => {
        const count = get(countAtom);
        return count % 2 == 0;
    }

})
// so basically in that get function we have the access to various atoms and can return the state which depends on these atoms by doing some logic.  

// This is a selector which only depends on countAtom, a selector could depends on multiple things
// Selector can depends on atom, selector can depends on other selector as well 