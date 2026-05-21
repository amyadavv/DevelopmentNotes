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

First how to do with the normal way: 

import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil"
import { notification, totalNotificationSelector } from "./store/atoms/count"
import { useEffect } from "react";
import axios from "axios";

function App() {
    return (
        <RecoilRoot>
            <MainApp />
        </RecoilRoot>
    )
}

function MainApp() {
    const [networkCount, setNetworkCount] = useRecoilState(notification);
    const totalNotificationCount = useRecoilValue(totalNotificationSelector);

    useEffect(() => {
        //     // axios.get("https://sum-server.100xdevs.com/notifications")
        //     // .then(res => {
        //         // setNetworkCount(res.data)
        //     // })
        setNetworkCount({
            network: 99,
            jobs: 34,
            notification: 67,
            messaging: 56
        })
    }, [])


    return (
        <div>
            <button>Home</button>

            <button>My Network ({networkCount.network >= 100 ? "99+" : networkCount.network})</button>
            <button>Jobs ({networkCount.jobs})</button>
            <button>Messaging ({networkCount.messaging})</button>
            <button>Notifications ({networkCount.notification})</button>

            <button>Me ({totalNotificationCount})</button>
        </div>
    )
}

export default App;

// This is not the right way to do async queries. The reason for that is, there is a slight delay when the new values are come from the backend because of the useEffect. Firstly the default value get rendered then the useEffect gets response and the actual data got rendered, thats why there is a flash when data is updated. 


Count file: 

import { atom, selector } from "recoil";

export const notification = atom({
    key: "networkAtom",
    default: {
        network: 0,
        jobs: 0,
        messaging: 0,
        notification: 0
    }
})

export const totalNotificationSelector = selector({
    key: "totalNotificationSelector",
    get: ({ get }) => {
        const allNotifications = get(notification);
        return allNotifications.network + allNotifications.jobs + allNotifications.messaging + allNotifications.notification
    }
})


How to use Asynchronous Data Queries ?

Recoil provides a way to map state and derived state to React components via a data-flow graph. What's really powerful is that the functions in the graph can also be asynchronous. This makes it easy to use asynchronous functions in synchronous React component render functions. 

Selectors can be used as one way to incorporate asynchronous data into the recoil data-flow graph. 