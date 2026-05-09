## Why do we need react?
For dynamic website react make it easier to do DOM manipulation. React is just an easier way to write normal HTML/CSS/JS. It's a new syntax, that under the hood gets converted to HTML/CSS/JS

React ----- npm run build ------- HTML/CSS/JS

## Why react? 

People realized it's harder to do DOM manipulation the conventional way. There were libraries that came into the picture that made it slightly easy, but still for a very big app it's very hard (JQuery). Under the hood, the react compiler convert your code to HTML/CSS/JS.

## split() function work

let x = "Amit Yadav Good Boy"
x.split(" ");
['Amit','Yadav','Good','Boy'] - create a array 
x.split(" ")[1] - This will give me 'Yadav'



## Three Important terms for react 

1. Component - How a DOM element should render, given a state? Component is a re-usable, dynamic, HTML snippet that changes given the state
2. State - An object (JS object) that represent the current state of the app. It represents the dynamic things in your app (things that change) For example, the value of the counter. We maintain a state which represents our dynamic parts of the website we just need to update the state react take care of actually updating the DOM element.
3. Rerendering - A state change triggers a re-render. A re-render represents the actual DOM being manipulated when the state changes. 

Virtual DOM - It is the representation of the current DOM that reacts keeps in the memory uses to calculate the difference between the old state and the new state and understand what updates need to make.

We usually have to define all your components once and then all you have to do is update the state of your app, react takes care of re-rendering your app. 

We have to atleast once do a render in react the first render.

JSX - A Js File inside which you can write both JS and xml. A JS file where you can write HTML.

When ever you want to write any JS or render a JS variable inside a react component you have to put it inside the curly braces. <button>{state.count}</button>


Any time a parent re-render, its child re-renders as well. Re-rendering only happen when the state changes. React only monitoring state variable. If child component re-renders that does not mean it parent re-renders 


useState - any time you create something that react needs to watch (if it is changed than react need to do re-render). UseState takes initial value of an input and it returns two things an variable which represents the current value of todo, and an variable that lets you update todos 

const [todos, setTodos] = useState([]); To update the todo we need to always use setTodos. todos is never used to update the state. And the state updates the react re-render the page.  

React component take prop and use that props and do something with it and return jsx that jsx is transpiled by 'babel' in React.createElement(a core way) and react convert use it own logic to convert it to raw html css js. 
When we hit setTodo() function it restart the reconciliation, calculate diff and update the dom efficiently.


## Notes for 5.2

 - Whenever we created a backend/frontend we first initialize a package.json file. To create it use npm init

 - zod for validation 

 - await todo.update({
        _id: req.body.id
    }, {
        completed: true
    })

    // Update takes two parameters, the first one is the filter and the second one is the update. The filter is used to find the document that we want to update and the update is used to specify the fields that we want to update and their new values.


app.use(cors());
// cors is a middleware that allows us to make requests from the frontend to the backend. It is used to enable cross-origin resource sharing. By default, the browser does not allow requests from different origins for security reasons. CORS allows us to bypass this restriction and make requests from the frontend to the backend. In this case, we are allowing requests from all origins by using the cors middleware without any options. This means that any frontend application can make requests to our backend. In a production environment, you would want to restrict this to only allow requests from your frontend application for security reasons.

app.use(cors({
    origin: "http://localhost:5173"
}));
// This is how you would restrict the CORS to only allow requests from your frontend application. In this case, we are only allowing requests from "http://localhost:5173", which is the default port for Vite, the development server we are using for the frontend.