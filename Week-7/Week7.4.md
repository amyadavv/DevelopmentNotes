# Atom

An atom is the smallest unit of state that you can store similar to useState. 

Example: 

import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil"
import { jobAtom, messageAtom, notificationAtom } from "./store/atoms/count"

function App() {
    return (
        <RecoilRoot>
            <MainApp />
        </RecoilRoot>
    )
}

function MainApp() {
    const networkNotificationCount = useRecoilValue(notificationAtom);
    const jobsCount = useRecoilValue(jobAtom);
    const messageCount = useRecoilValue(messageAtom);
    const [notificationCount, setNotificationCount] = useRecoilState(notificationAtom);
    return (
        <div>
            <button>Home</button>

            <button>Jobs ({jobsCount})</button>
            <button>My Network ({networkNotificationCount >= 100 ? "99+" : networkNotificationCount})</button>
            <button>Messaging ({messageCount})</button>
            <button>Notifications ({notificationCount})</button>

            <button onClick={()=>{
                setNotificationCount(notificationCount + 1);
            }}>Me</button>
        </div>
    )
}

export default App;


Atom file 


import { atom } from "recoil";

export const notificationAtom = atom({
    key: "notificationAtom",
    default: 102
})
export const jobAtom = atom({
    key: "jobAtom",
    default: 2
})
export const networkAtom = atom({
    key: "networkAtom",
    default: 3
})
export const messageAtom = atom({
    key: "messageAtom",
    default: 4
})

# Selector 

A selector is something that can be derived from other atoms or other selectors 

import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil"
import { jobAtom, messageAtom, notificationAtom, totalNotificationSelector } from "./store/atoms/count"
import { useMemo } from "react";

function App() {
    return (
        <RecoilRoot>
            <MainApp />
        </RecoilRoot>
    )
}

function MainApp() {
    const networkNotificationCount = useRecoilValue(notificationAtom);
    const jobsCount = useRecoilValue(jobAtom);
    const messageCount = useRecoilValue(messageAtom);
    const notificationCount = useRecoilValue(notificationAtom);
    const totalNotificationCount2 = useRecoilValue(totalNotificationSelector)

    const totalNotificationCount = useMemo(()=> {
        return networkNotificationCount + jobsCount + messageCount + notificationCount;
    },[networkNotificationCount, jobsCount, messageCount, notificationCount]) 
    // using this we can use this logic outside the component so that's why we use selector

    return (
        <div>
            <button>Home</button>

            <button>Jobs ({jobsCount})</button>
            <button>My Network ({networkNotificationCount >= 100 ? "99+" : networkNotificationCount})</button>
            <button>Messaging ({messageCount})</button>
            <button>Notifications ({notificationCount})</button>

            <button>Me ({totalNotificationCount2})</button>
        </div>
    )
}

export default App;

Atoms file 

import { atom, selector } from "recoil";

export const notificationAtom = atom({
    key: "notificationAtom",
    default: 102
})
export const jobAtom = atom({
    key: "jobAtom",
    default: 2
})
export const networkAtom = atom({
    key: "networkAtom",
    default: 3
})
export const messageAtom = atom({
    key: "messageAtom",
    default: 4
})

export const totalNotificationSelector = selector({
    key: "totalNotificationSelector",
    get: ({get}) => {
        const notificationAtomCount = get(notificationAtom);
        const jobAtomCount = get(jobAtom);
        const networkAtomCount = get(networkAtom);
        const messageAtomCount = get(messageAtom);
        return notificationAtomCount + jobAtomCount + networkAtomCount + messageAtomCount
    }
})


# Asynchronous Data Queries
