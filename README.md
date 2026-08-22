#  Full-Stack Web Development & Engineering Notes

> **Purpose of this repository:** A centralized library for learning notes, deep-dive architectural insights, and simple, crystal-clear explanations of full-stack concepts—from core JavaScript to backend engineering and system architecture.

---

##  Quick Links
-  **[SDE-2 & Full-Stack Revision Tracker](RevisionTracker.md)** — Comprehensive interview checklist covering Core JS, React, Backend, Databases, and STAR project depth stories.
-  **[PDF Reference Guides](NotesPDF/)** — Visual notes on DOM, Middlewares, Global Catches, and Zod validation.

---

## 📖 What I Have Learned So Far

###  Week 4: Foundations & Authentication
- **DOM & Vanilla JS**: DOM manipulation, dynamic rendering without frameworks, state-to-DOM sync, connecting frontend to backend endpoints.
- **Debouncing Concept**: Timing and delaying expensive API calls during user inputs.
- **React Genesis**: Understanding the transition from imperative DOM updates to declarative React components.
- **JWT & Auth Internals ([`Week-4/jwtExplain.md`](Week-4/jwtExplain.md))**:
  - JWT structure (`header.payload.signature`).
  - Base64 encoding vs encryption, cryptographic signature verification with secrets, and auth security best practices.

---

###  Week 5: React Core & State Management
- **React Fundamentals ([`Week-5/5.1/Notes5.1.md`](Week-5/5.1/Notes5.1.md))**:
  - Why React over imperative DOM/jQuery.
  - Virtual DOM, reconciliation, components as pure functions of state.
  - `useState`, triggering re-renders, and JSX compilation.
  - Hands-on Todo apps and dynamic list rendering.

---

###  Week 6: React Performance & Hooks Deep Dive
- **Rendering & Optimization ([`Week-6/Note.md`](Week-6/Note.md))**:
  - What triggers re-renders and how to minimize them.
  - Pushing state down the component tree.
  - `React.memo` for component memoization.
  - `useMemo` for expensive computations vs `useCallback` for referential equality of functions.
  - `useRef` for DOM references and mutable values without triggering re-renders.
  - Wrapper components and the `children` prop pattern.
  - Keys in dynamic lists and why index keys can cause bugs.

---

###  Week 7: SPAs, Routing & Global State
- **Routing & SPAs ([`Week-7/Week7Notes.md`](Week-7/Week7Notes.md))**:
  - Single Page Application (SPA) architecture & client-side bundles.
  - Client-side routing with `react-router-dom` (`BrowserRouter`, `Routes`, `Route`, `useNavigate`).
  - Code splitting and lazy loading with `React.lazy` and `Suspense`.
- **Context API ([`Week-7/Week7.2.md`](Week-7/Week7.2.md))**:
  - Solving prop drilling with `createContext` and `useContext`.
  - Context Provider pattern and when to use Context vs dedicated state libraries.
- **Recoil State Management ([`Week-7/Week7.4.md`](Week-7/Week7.4.md))**:
  - Atoms (smallest units of state) and Selectors (derived/computed state).
  - `useRecoilState`, `useRecoilValue`, and `useSetRecoilState`.
  - Asynchronous data queries in Recoil, `atomFamily`, and `selectorFamily`.

---

###  Week 8: Modern Styling, Networking & Full-Stack Projects
- **Tailwind CSS & Responsive Design ([`Week-8/Notes-8.1.md`](Week-8/Notes-8.1.md))**:
  - Mobile-first breakpoint design (`sm:`, `md:`, `lg:`, `xl:`).
  - CSS Grid & Flexbox utility workflows.
- **Networking: Fetch vs Axios ([`Week-8/AxiosVSFetch.md`](Week-8/AxiosVSFetch.md))**:
  - Differences in automatic JSON parsing, request/response interceptors, and error handling.
- **PayTM Full-Stack Project ([`Week-8/paytm/`](Week-8/paytm/))**:
  - **Backend**: Express.js, MongoDB/Mongoose, JWT auth, input validation with Zod, and ACID transactions for secure money transfers.
  - **Frontend**: React, Tailwind CSS, dashboard, user search, and balance transfer flow.

---

###  Miscellaneous Topics
- **REST APIs & HTTP Architecture ([`MiscellaneousTopic/RestApis.md`](MiscellaneousTopic/RestApis.md))**:
  - REST architectural constraints, statelessness, HTTP methods (GET, POST, PUT, PATCH, DELETE), status codes, and idempotency.
- **Performance Utilities ([`MiscellaneousTopic/Debounce&throttle/`](MiscellaneousTopic/Debounce&throttle/))**:
  - Clean polyfills and implementations for Debounce and Throttle with practical use cases.

---

##  What I Am Learning Now (Active Topics)

###  Week 9: Custom Hooks & TypeScript
- **Advanced Custom Hooks ([`Week-9/Week9.1.md`](Week-9/Week9.1.md))**:
  - Component lifecycle events in functional components.
  - Cleanup functions and race conditions in `useEffect`.
  - Building reusable custom hooks:
    - `useTodos` (data fetching hook)
    - `useIsOnline` (browser network status tracking)
    - `useMousePointer` (real-time mouse coordinates)
    - `useInterval` (declarative interval timer)
    - `useDebounce` (debouncing search inputs in React)
- **TypeScript Deep Dive ([`Week-9/Week9.2.md`](Week-9/Week9.2.md))**:
  - Strongly typed vs loosely typed languages.
  - TypeScript runtime vs compile-time architecture.
  - `tsc` compiler and build tools (`esbuild`, `swc`).
  - Strict static typing, interfaces, type aliases, and generics.

---

##  How to Use This Repository
1. **For Concept Revision**: Browse each weekly folder for clean markdown notes containing code examples, edge cases, and architectural reasoning.
2. **For Interview Prep**: Track your progress in **[`RevisionTracker.md`](RevisionTracker.md)** before technical rounds.
3. **For Code References**: Explore implementation examples inside component and project directories.
