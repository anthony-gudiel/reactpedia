import React, { useState } from "react";
import "../lessons/lesson-1-1.css";
import { OPENAI } from "../../api/openai";

export const Quizzes = () => {
  const [selectedSection, setSelectedSection] = useState("");
  const [quizContent, setQuizContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDropdownChange = (e) => {
    setSelectedSection(e.target.value);
  };

  const handleButtonClick = async () => {
    if (selectedSection) {
      setLoading(true);

      const quiz = await OPENAI(`Your one and only job is to create a quiz for ${selectedSection}`);

      setQuizContent(quiz);
      setLoading(false);
    }
  };

  return (
    <div className="quizzes">
      <div className="container">
        <div className="lessonHeader">
          <div className="quiz-yourself">
            <h1>Quiz Yourself!</h1>
          </div>
        </div>
      </div>
      <div className="quiz-container">
        <select
          className="full-width-button"
          onChange={handleDropdownChange}
          value={selectedSection}
        >
          <option value="" disabled>
            Click here to select which section would you like to be quizzed on.
          </option>
          <option
            value="Lesson 1.1 - Introduction to React.js. Here is what the lesson contains:
                Lesson Overview:
                Welcome to the exciting world of React.js! In this introductory lesson, we'll cover the
                basics of what React is, why it's widely used, and how to set up a simple React application.
                By the end of this lesson, you'll have a solid understanding of React's core concepts and be
                ready to dive deeper into building dynamic and interactive user interfaces.

                What is React.js?
                React.js is a JavaScript library developed by Facebook for building user interfaces,
                especially for single-page applications where data is updated frequently. It allows
                developers to create reusable UI components, making it easier to manage and scale complex
                applications.
                
                Why React?
                Declarative Syntax:
                React uses a declarative syntax, making it easier to understand and debug code.
                Component-Based Architecture:
                React applications are built using components, which are self-contained, reusable pieces of code.
                This makes development more modular and maintainable.
                Virtual DOM:
                React uses a virtual DOM to optimize rendering and improve performance, ensuring that only
                the necessary components are updated when data changes.
                Community and Ecosystem:
                React has a large and active community, providing a wealth of resources, libraries, and tools for developers.
                Setting Up Your First React App:
                For our lessons, we'll have an in-browser development environment for you to work from,
                but why not have you download the real thing while we're here!
                Step 1: Install Node.js
                React applications are typically built using Node.js. Install it from nodejs.org.
                Step 2: Create a React App
                Open your terminal and run the following commands:
                npx create-react-app my-first-react-app
                cd my-first-react-app
                Step 3: Start the Development Server
                Run the following command to start the development server:
                npm start
                This will open your new React app in a web browser.
                Understanding the Project Structure:
                src Folder: This is where your application code lives
                public Folder: Contains the HTML file and other static assets.
                package.json File: Describes your project and its dependencies.
                Your First React Component:
                Open the src/App.js file. You'll see a basic component like this:
                import React from 'react';
                function App () {
                return (
                <div>
                    <h1> Hello World! </h1>
                </div>
                );
                }
                export default App;
                import React from 'react'; : Imports the React library.
                function App() {...} : Defines a functional component named App.
                return ( ... ) : Describes the component's UI.
                Congratulations!
                You've just set up your first React app and created a simple React component. In 
                the next lesson, we'll explore React components in more detail and learn how to create
                dynamic and interactive user interfaces. Happy coding!"
          >
            Lesson 1 - Introduction to React.js
          </option>

          <option
            value="Lesson 1.2 - React Basics: JSX: What is JSX?
                Definition: JSX stands for JavaScript XML. It's a syntax extension for JavaScrip
                recommended by React or describing what the UI should look like.

                JSX vs HTML:
                JSX closely resembles HTML but has some key differences
                JSX allows you to include expressions and functions within the syntax
                HTML only allows for static text
                JSX is the standard for React applications JSX Syntax

                Embedding expressions: In JSX, you can embed JavaScript expressions within curly braces '{...}' like this:
                const name = 'John';
                const greeting = <p> Hello, {name}! </p> HTML-like Elements: JSX allows you to write
                HTML-like elements in your JavaScript code:
                const element = <h1>Hello, React! </h1>;

                Creating Components with JSX:
                Components are arguably the most important part of React, and can be considered the
                building blocks of React applications
                Components can be created using JSX syntax

                function Greeting(props) {
                return <p> Hello, {props.name}! </p>;
                } 
                
                Properties (in this case 'props') can be used to pass data to components. Properties
                pass information from a parent component to a child component
                '{props.name}' is an example of how you can access a specific property named 'name'.
                This assumes that the parent component is passing a property called 'name' like this:

                // Parent Component
                function App() {
                return  (
                    <div>
                        {Greeting name='John' /}
                    </div>
                )
                }

                // Child Component
                function Greeting (props) {
                return <p>Hello, {props.name} ! </p>
                }
                
                In this example, the App component is rendering the 'Greeting' component and passing
                the 'name' prop with the value 'John'. The 'Greeting' component receives this prop
                through the 'props' object and uses it in the JSX expression to dynamically display
                a personalized greeting. The resulting output would be <p>Hello, John! </p>

                Conditional Rendering: JSX allows you to use JavaScript for conditional rendering,
                which is the process of displaying different content based on certain conditions
                or states

                function Greeting ({isLoggedIn}) {
                return (
                    <div>
                        {isLoggedIn ? <p> Welcome back! </p> :<p> Please log in. </p> }
                    </div>
                )
                }

                Here we can see that if the user is logged in, the message 'Welcome back!' would
                be returned, but if not, 'Please log in.' would be returned.

                JSX Best Practices:
                Use parentheses for multi-line JSX:
                It's good practice to wrap JSX elements in parentheses when they extend over
                multiple lines

                const element = (
                <div>
                    <h1>Hello</h1>
                    <p>React is awesome!</p>
                </div>
                )
                One Root Element:
                JSX expressions must have one outermost root element
                // Valid JSX with one root element
                const validJSX = (
                <div>
                    <h1>Hello</h1>
                </div>
                )
                // Inalid JSX with one root element
                const invalidJSX = (
                <h1>Hello</h1>
                )
                Do you see the difference? In this first valid example, there is a single <div>
                that contains all elements, where in the second example, there is no parent
                element (<div>)"
          >
            Lesson 2 - React Basics: JSX
          </option>

          <option
            value="Components in React
            In React, a component is a reusable, self-contained building block that encapsulates a piece of the user interface.
            Components can be functional or class-based.
            Functional Components:
            These kinds of components are declared as JavaScript functions.
            Typically simple and concise, especially for presentational components.
            function FirstComponent() {
             return (
               <p>This is my first component!</p>
             );
            }
            Now that we have made a component, we can use it in another component like this:
            export default function MyApp() {
            return (
               <div>
                 <p>This is my app!</p>
                 <FirstComponent />
               </div>
            );
            }
            This code represents a basic React component (MyApp) that you can use as the starting point for your application. When you import MyApp into another file, you can include and render it as a component in your application.
            Importing and Exporting:
            In the previous example, the export default statement is used to export the MyApp component as the default export from this module.
            This allows you to import and use MyApp in other parts of your application.
            To import components into other files:
            import React from 'react'; //This is typical for every .jsx file
            import {MyApp} from './MyApp';
            It is best practice to put these import statements in the first lines of your file
            In this example, we're importing our 'MyApp' component from the 'MyApp.jsx' file into another file, though we don't explicitly state the .jsx extension in the import statement
            Summary: Components in React:
            Building blocks for UI elements.
            Functional Components
            Declared as functions.
            Ideal for simplicity and presentation.
            Using Components:
            Compose components within others.
            Export using export default.
            Importing Components:
            Import components for reuse.
            Best practice: Place imports at the file's start."
          >
            Lesson 3 - Components in React
          </option>


          <option
            value="Lesson 4: Props & State in React.
            Objectives
            Understand the role of props in passing data between React components.
            Learn how to manage and utilize state within React components.
            Differentiate between props and state.
            Props in React
            Definition: Props (short for properties) are a way to pass data from a parent component to a child component
            Purpose: Enable communication between components.
            // Parent Component
            function App() {
            return (
              <div>
                {Greeting name='John' /}
              </div>
            )
            }
            // Child Component
            function Greeting (props) {
            return <p>Hello, {props.name} ! </p>
            }
            If you remember, we talked about props in lesson 2! If you need a quick refresher, head back there and then come back here when you're done.
            State in React
            Definition: State is a way to manage and store data within a component.
            Purpose: Enables component to maintain and update their own data.
            import React, {Component} from 'react';
            class Counter extends Component {
            constructor(props){
              super(props);
              this.state = {
                count: 0,
              };
            }
            render()
              return (
                <div>
                  <p>Count: {this.state.count}</p>
                  <button OnClick = {() => this.setState({ count: this.state.count + 1 })}>
                    Increment
                  </button>
                </div>
              )
            }
            }
            First we define a class named `Counter` that extends the `Component` class from React. This means that `Counter` is a React component.
            The `constructor` method is a special method that gets called when an instance of the class is created. It initializes the state of the component.
            `super(props)` calls the constructor of the parent class (`Component`). It's necessary to call `super` before accessing `this` in the constructor.
            `this.state` is an object that holds the state of the component. In this case, it has one property, `count`, intialized to `0`.
            The `render` method is required for every React component. It describes what the UI of the component should look like.
            In this example, it returns a JSX structure that includes a paragraph `{p}` displaying the current count and a button with an onClick event handler
            When the button is clicked, the count is updated in the component's state. It calls `this.setState` to update the state and trigger a re-render.
            Differences Between Props and State
            Props:
            Immutable, read-only data received from a parent component.
            Passed from parent to child.
            Changes in props trigger a re-render in the child component.
            State:
            Mutable data managed within a component.
            Internally maintained by the component.
            Changes in state trigger a re-render of the component.
            Updating State
            Utilize the `setState` method to update state in a React component.
            Note: State updates may be asynchronous, and React may batch multiple `setState` calls for performance.
            class Counter extends Component {
            constructor(props){
              super(props);
              this.state = {
                count: 0,
              };
            }
            incrementCount = () => ({
              this.setState((prevState) => ({
                count: prevState.count + 1,
              }));
            };
            render()
              return (
                <div>
                  <p>Count: {this.state.count}</p>
                  <button OnClick = {this.incrementCount}>
                    Increment
                  </button>
                </div>
              )
            }
            This is similar to the previous example, except we have added `incrementCount` to increment the counter every time the button is clicked and set its state.
            `incrementCount = () => { ... }`: Defines an arrow function named `incrementCount`. Arrow functions are used to bind the function to the instance of the class, ensuring that this refers to the component instance.
            `this.setState((prevState) => ({ count: prevState.count + 1 }));`: Uses `this.setState` to update the state based on the previous state. It increments the `count` by 1.
            Stateless Functional Components
            Functional component can receive props.
            Use the `useState` hook to introduce state in functional components.
            import React, {useState} from 'react';
            const Counter = () => {
            const [count, setCount] = useState(0);
            return (
              <div>
                <p> Count: {count} </p>
                <button OnClick = {() => setCount(count + 1)}>
                  Increment
                </button>
              </div>
            );
            };
            This functional component uses the useState hook to manage a state variable (count) that represents a counter. The component renders a paragraph displaying the current count and a button to increment the count when clicked. The use of useState allows functional components to maintain state.
            `const [count, setCount] = useState(0);`: Initializes state using the `useState` hook. It declares a state variable `count` and a function `setCount` to update the state. The initial state value is set to `0`.
            "
         >
            Lesson 4 - Props & State in React
          </option>

          <option
            value="Lists & Keys in React.
            Objectives
            Understand how to render lists of data in React.
            Learn about the importance of using keys in React lists.
            Apply knowledge to dynamically render components based on data.
            Rendering Lists in React
            Definition: Lists in React represent dynamically generated collections of elements, often sourced from arrays, that can be efficiently updated and managed using keys.
            Purpose: Enables the display of dynamic data retrieved from APIs or user input.
            const MyList = () => {
            const items = ['Item 1', 'Item 2', 'Item 3']
              return (
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            );
            };
            First we declare the functional component `MyList`
            Then we create a list named `items`
            In the return statement, {items.map((item, index) => ( uses the map function to iterate over each element in the `items` array.
            <li key={index}>{item}</li> : For each item in the array, a list item is created. The `key` attribute is set to the `index` of the item, which helps React efficiently update the list when items are added or removed.
            The Importance of Keys
            Definition: Keys are special attributes used to uniquely identify and track individual elements within dynamically rendered lists.
            Purpose: Aids React in efficiently updating the user interface.
            Keys help React identify which items have changed, are added, or are removed.
            const MyList = () => {
            const items = [
              { id: 1, text: 'Item 1' },
              { id: 2, text: 'Item 2' },
              { id: 3, text: 'Item 3' },
              ];
            return (
                <ul>
                  {items.map((item) => (
                    <li key={item.id}>{item.text}</li>
                  ))}
                </ul>
              );
            };
            `const items`: This declares an array called `items`, containing three objects. Each object represents an item with an 'id' and 'text'. This array is used as the data source for rendering the list.
            <li key={item.id}>{item.text}</li>: For each item in the array, it creates a list item. The key attribute is set to the 'id' of the item. Using a unique key for each item helps React efficiently update the DOM when the list changes. The content of each is the 'text' property of the item.
            {items.map((item) => ... )}: Maps over each item in the items array and generates a corresponding li element for each one.
            Essentially, what we're doing here is generating an unordered list where each list item corresponds to an object in the `items' array. The'id' is used as the key to efficiently manage updates, and the 'text' is displayed as the content of each list item.
            Dynamic Lists with Components
            Definition: Components can be dynamically rendered within lists.
            Purpose: Encourages reusability and modularity.
            const MyList = () => {
            const items = [
              { id: 1, text: 'Item 1' },
              { id: 2, text: 'Item 2' },
              { id: 3, text: 'Item 3' },
              ];
            return (
                <ul>
                  {items.map((item) => (
                    <li key={item.id}>text={item.text}</li>
                  ))}
                </ul>
              );
            };
            const MyListItem = ({ item }) => {
              return <li>{text}</li>;
            };
            Although this looks very similar to the last code snippet we just went over, there are some important differences.
            Here, we're using the `MyListItem` component, passing `key` and `text` as props.
            The separate `MyListItem` component is defined to represent each list item. This provides a modular and reusable approach
            We would want to use this reusable version of the code when we may need to use reuse the list items elsewhere."
          >
            Lesson 5 - Components in React
          </option>

          <option
            value="Handling Events & Conditional Rendering in React.
            Objectives
            Understand how to handle events in React components.
            Learn about the concept of conditional rendering.
            Apply event handling and conditional rendering in React applications.
            Handling Events in React:
            Handling events is crucial for creating interactive and responsive user interfaces in React.
            Events like clicks, changes, and submissions can be managed efficiently.
            const EventHandlingExample = () => {
            const handleClick = () => {
                console.log('Button Clicked')
            };
            return (
                <button onClick={handleClick}>
                    Click me
                </button>
            );
            };
            Event Handling Syntax:
            In React, event handlers are assigned in JSX use camelCase, such as `onClick` or `onChange`.
            Common events include `onClick`, `onChange`, and `onSubmit`
            const EventHandlingSyntax = () => {
            const handleChange = (event) => {
                console.log('Input Value:', event.target.value);
            }
            return (
                <input type='text' onChange={handleChange} />
            );
            };
            State and Event Handling:
            State and event handling often go hand in hand.
            You can update state based on user interactions, leading to dynamic and responsive components.
            const StateAndEventHandling = () => {
            const [count, setCount] = useState(0);
            const handleIncrement = () => {
                setCount(count + 1);
            };
            return (
                <div>
                    <p> Count: {count} </p>
                    <button onClick={handleIncrement}>
                        Increment
                    </button>
                <div>
            );
            };
            Conditional Rendering in React:
            Conditional rendering allows components to be displayed or hidden based on certain conditions
            This is useful for showing different content based on user authentication, form validation, etc.
            const ConditionalRenderingExample = () => {
            const [isLoggedIn, setIsLoggedIn] = useState(false);
            return (
                <div>
                    {isLoggedIn ? (
                        <p>Welcome, user!</p>
                    ) : (
                        <button onClick = {() => setIsLoggedIn(true)}>
                            Log In
                        </button>
                    )}
                </div>
            );
            };
            Conditional Rendering Techniques
            Ternary operator:
            const RenderWithTernary = () => {
            const isTrue = true;
            return (
                <p> {isTrue ? 'It is true' : 'It is false' }</p>
            );
            };
            && operator:
            const RenderWithLogicalAnd = () => {
            const showContent = true;
            return (
                <div>
                    {showContent && <p>Show this content</p>}
                </div>
            );
            };
            Handling Conditional Styles:
            Apply dynamic styles based on conditions, enhancing the visual aspects of your components
            const ConditionalStylesExample = () => {
            const [isError, setIsError] = useState(false);
            return (
                <div style={{ color: isError ? 'red' : 'green' }}>
                    {isError ? 'Error' : 'Success!'}
                </div>
            );
            };
            Best Practices:
            Keep event handlers concise and focused on specific functionalities.
            Use meaningful variable names for conditions to improve code readability."
          >
            Lesson 6 - Handling Events & Conditional Rendering
          </option>


          <option
            value="Component lifecycle in React.
            Objectives
            Understand the lifecycle phases of a React component.
            Learn how to utilize lifecycle methods for various tasks.
            Apply knowledge of the component lifecycle to manage state, perform side effects, and optimize performance.
            Introduction to Component Lifecycle:
            Handling events is crucial for creating interactive and responsive user interfaces in React.The component lifecycle refers to the different phases a React component goes through, from its creation to its removal from the DOM.
            Understanding these phases allows developers to perform tasks at specific points in a component's existence.
            Phases:
            Mounting: When a component is being created and inserted into the DOM.
            Updating: When a component is re-rendered as a result of changes to its state or props.
            Unmounting: When a component is removed from the DOM.
            Mounting Phase:
            `constructor()` Method
            The constructor is called when an instance of the component is being created. It's the right place to initialize state.
            constructor (props) {
             super(props);
             this.state = {
                 count : 0,
             };
             this.handleClick = this.handleClick.bind(this)
            }
            Next is the `render()` Method
            The render method is responsible for creating the initial UI structure of the component.
            render() {
             return <div>{this.state.count}</div>
            }
            Next is the `componentDidMount()` Method.
            This is called after the component is rendered in the DOM. It' suitable for fetching data or performing similar side effects.
            componentDidMount() {
             //Say we're fetching data from an API
             fetch('https://api.example.com/data')
                 .then(response => response.json())
                 .then(data => this.setState ({ data }))
            }
            Updating Phase:
            `shouldComponentUpdate()` Method
            This allows you to control whether a component should re-render.
            It can optimize performance by preventing unnecessary re-renders.
            shouldComponentUpdate(nextProps, nextState) {
             //Only re-render if the count changes
             return this.state.count !== nextState.count;
            }
            `render()` Method again
            The render method is called again when a component re-renders due to changes in state or props.
            `componentDidUpdate()` Method:
            `componentDidUpdate` is called after the component is updated. It's suitable for performing side effects or additional data fetching.
            componentDidUpdate(prevProps, prevState) {
             if (prevState.count !== this.state.count) {
                 console.log('Count updated:', this.state.count);
             }
            }
            Error Handling:
            `componentDidCatch()` Method
            `componentDidCatch` is a lifecycle method for handling errors that occur within child components during rendering.
            componentDidCatch(error, errorInfo) {
               logErrorToMyService(error, errorInfo);
            }
            Best Practices:
            Keep lifecycle methods concise and focused on specific functionalities
            Be aware of depricated lifecycle methods, as React evolves."
          >
            Lesson 7 - Component Lifecycle in React
          </option>

          <option
            value="Styling in React.
            Objectives
            Understand various approaches of styling in React
            Learn about inline styles, CSS-in-JS libraries, and external stylesheets.
            Apply styling techniques to create visually appealing React components.
            Introduction to Styling in React:
            Importance of Styling: Allows you to create engaging and user-friendly web applications.
            Common Challenges with Styling: Resuability, responsiveness, code organization.
            Inline Styles:
            We'll first discuss how to apply styles directly within the JSX using the `style` attribute.
            These are called inline styles.
            Pros of Inline Styles: Easy integration with React components, dynamic styling.
            Cons of Inline Styles: Limited reusability, potential code clutter.
            Example:
            const MyComponent = () => {
             const styles = {
                 color: 'blue',
                 fontSize: '16px',
             };
             return <div style={styles}>Styled Component</div>
            }
            CSS-in-JS Libraries:
            CSS-in-JS libraries are tools that allow developers to write and manage CSS styles directly within JavaScript frameworks.
            Good for scoped styling, dynamic theming, and better organization.
            import styled from 'styled-components';
            const StyledButton = styled.button`
                 background-color: blue;
                 color: black;
                 padding: 10px;
            `;
            Here, we are importing the `styled` function from the `styled-components` library. This function is a utility provided by `styled-components` to create styled components.
            We then use the `styled` function called with our HTML element `button` as a template literal. The template literal contains CSS styles that will be applied to the specified element.
            External StyleSheets:
            This is commonly considered the most traditional approach for using CSS to stylize.
            In this method, we link external CSS files to use in our JSX file.
            There are two common ways of doing this:
            <link rel='stylesheet' href='styles.css' />
            import '../my-stylesheet.css'
            Responsive Design in React:
            Media queries are essential in creating responsive designs
            Media queries are commonly used to adjust your styles based on the screen size of the user:
            @media (max-width:1003px) {
               .lesson-3-image{
                   display: none;
               }
            }
            Here, we're making it so that once the screen size of the user hits 1003px or less, the image under class `lesson-3-image` will no longer be displayed.
            Best Practices:
            Use consistent naming conventions and meaningful class names for styles
            Consider the reusability of your styles.
            Explore common CSS techniques like Flexbox and Grid"
          >
            Lesson 8 - Styling in React
          </option>

          <option
            value="Routing in React.
            Objectives
            Understand the concept of routing in a single-page application.
            Learn how to implement routing in React using React Router.
            Explore the usage of `BrowserRouter`, `Route`, `Link`, and `Switch` components.
            Apply routing to create a multi-page-like experience within a React application.
            Introduction to Routing & Basics:
            In React, routing is the mechanism that allows different components to be displayed based on the current URL. It's crucial for single-page applications, providing a seamless transition between views without the need for a full-page reload.
            React Router simplifies navigation in React applications. It introduces components like `BrowserRouter`, `Route`, `Link`, and `Switch` to manage UI updates based on the URL.
            To install React Router:
            npm install react-router-dom
            And setup of your routes will look something like this:
            import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
            function App() {
               return (
               <Router>
                   {/* Routes go here */} 
               )
            }
            Setting up Basic Routing:
            For this we'll use `BrowserRouter`, `Route`, and `Switch`
            `BrowserRouter` wraps the application, providing routing context. `Route` defines routes and the components to render. `Switch` ensures only the first matching route is rendered.
            <Router>
             <Switch>
                 <Route path='home' component={Home} />
                 <Route path='about' component={About} />
                 <Route path='contact' component={Contact} />
             </Switch>
            </Router>
            `<Route path='/home' component={Home} />`: This line defines a route. It states that if the current URL matches '/home,' the Home component will be rendered.
            The same can be said for the about and contact lines.
            The `path`prop in each Route component specifies the URL path that should trigger the rendering of the associated component. If the current URL matches any of these paths, the corresponding component is rendered.
            Creating Navigation Links:
            For this, we use the `Link` Component.
            `Link` creates the actual navigation links for the users to click and navigate, where what we just covered only set up the routes.
            <Link to='/home'>Home</Link>
            <Link to='/about'>About</Link>
            <Link to='/contact'>Contact</Link>
            The `to` prop is a crucial attribute of the `<Link>` component. It specifies the target URL to which the user should be navigated when they click on the link.
            The text between the opening and closing `<Link>` tags ('Home,' 'About,' 'Contact') represents the visible content of the link. Clicking on this text will trigger navigation to the specified URL.
            <Link to='/url'>url-name</Link>: This link, when clicked, will navigate the user to the '/example-url' URL. (In this case, home, about, or contact)
            Nested Routes:
            Nested routes allow you to organize your application's components in a hierarchical structure, mirroring the structure of your UI. This organizational pattern is particularly useful when dealing with complex UIs that have sections or pages containing their own sub-sections or sub-pages.
            <Route path='/dashboard' component={Dashboard}>
               <Route path='/dashboard/profile' component={Profile}>
               <Route path='/dashboard/settings' component={Settings}>
            </Route>
            The 'Dashboard' route has nested routes for 'Profile' and 'Settings.' When the user navigates to '/dashboard,' the `Dashboard` component is rendered, and within it, the nested routes for 'Profile' and 'Settings' are defined. The `Link` components are used for navigation between different views.
            Redirects and Navigation Guards:
            The `Redirect` component is used to navigate a user from one route to another programmatically. This is often done based on certain conditions or user actions.
            This is particularly useful for scenarios where you want to redirect users to another route dynamically, such as after form submissions or authentication checks.
            <Route path='/login'>
               { isLoggedIn ? <Redirect to='/dashboard' /> : <Login /> }
            </Route>
            Here we have a conditional rendering statement inside the `Route` component.
            If `isLoggedIn` is true, then the dashboard is rendered and the user will be redirected to the '/dashboard' route.
            If `isLoggedIn` is false, then `Login` component is rendered
            Best Practices:
            Group related routes together and use nested routes for hierarchial structures in your application.
            Consider looking into how to lazily load components for routes that may not be needed immediately."
          >
            Lesson 9 - Routing in React
          </option>

          <option
            value="Hooks in React.
            Objectives
            Understand the concept of React Hooks and their role in functional components.
            Learn about some commonly used built-in hooks in React.
            Explore how hooks can enhance the state and lifecycle management in functional components.
            Introduction to React Hooks:
            React Hooks are functions that enable functional components to use state and lifecycle features that were previously only available in class components.
            They allow functional components to manage local state, side effects, and more.
            `useState` Hook:
            `useState` is a hook that enables the use of state in functional components.
            Doing so allows components to have local state, making them more dynamic.
            const [count, setCount] = useState(0);
            `useState` allows functional components to have state variables. It takes an initial state as an argument.
            In this case, the initial state is set to 0, meaning that `count` will initially have a value of 0.
            `useEffect` Hook:
            `useEffect` is a hook used for side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.
            This helps to handle side effects in a declarative way.
            useEffect(() => {
                 document.title = `Count: ${count}`;
            }, [count]);
            In this example, we're using `useEffect` to update the document title when count changes.
            This will run after the initial render and after every re-render.
            `useContext` Hook:
            This hook allows functional components to subscribe to a context and access the values provided by that context. It provides a way to avoid passing data through multiple layers of components and makes it easier to access shared values.
            First we'll create a context using `createContext`:
            //MyContext.jsx
            import { createContext } from 'react';
            const MyContext = createContext();
            export default MyContext;
            Now, we can use `useContext` to access the values provided by this context in our components:
            // MyComponent.js
            import { useContext } from 'react';
            const MyComponent = () => {
                 const contextValue = useContext(MyContext);
                 return <p>Context Value: {contextValue}</p>;
            }
            export default MyComponent
            First, we create a context using createContext. This context can hold a default value.
            Next, we wrap our component tree with a MyContext.Provider to provide a value to the context.
            Now, in any functional component within the tree, you can use `useContext(MyContext)` to access the current value of the context.
            Custom Hooks:
            You can also create your own custom hooks!
            Create a function (e.g., `useCounter`) that encapsulates the logic you want to reuse. It can use other built-in hooks like useState.
            The custom hook should return values or functions that the components using the hook can use.
            You can then import and use the custom hook in your components.
            Conclusion:
            This is all we have to teach you for now! We hope you learned something useful! Be on the lookout for new future lessons and improved upon current lessons!"
          >
            Lesson 10 - Hooks in React
          </option>
        </select>
        <button className="ai-submit" onClick={handleButtonClick}>
          Click to Submit!
        </button>
      </div>
      <div className="quiz-code">
        Quiz will appear here:
        {loading && (
          <div className="loading">
            Please be patient. This may take a moment...
          </div>
        )}
        {!loading && quizContent && (
          <div>
            <h3>Quiz:</h3>
            <pre style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
              {quizContent}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
