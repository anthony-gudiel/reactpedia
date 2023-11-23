import React, { useState } from 'react';
import '../content/lesson-1-1.css';
import { OPENAI } from '../../api/openai';

export const Quizzes = () => {
    const [selectedSection, setSelectedSection] = useState('');
    const [quizContent, setQuizContent] = useState('');
    const [loading, setLoading] = useState(false); 
  
    const handleDropdownChange = (e) => {
        setSelectedSection(e.target.value);
      };

      const handleButtonClick = async () => {
        if (selectedSection) {
          setLoading(true);
    
          const quiz = await OPENAI(`Quiz for ${selectedSection}`);
          
          setQuizContent(quiz);
          setLoading(false);
        }
      };
    

  return (
    <div className='quizzes'>
        <div className='container'>
            <div className='lessonHeader'>
                <div className='quiz-yourself'><h1>Quiz Yourself!</h1></div>
            </div>
        </div>
        <div className='quiz-container'>
        <select
            className="full-width-button"
            onChange={handleDropdownChange}
            value={selectedSection}
            >
            <option value="" disabled>
                Click here to select which section would you like to be quizzed on.
            </option>
            <option value="Lesson 1.1 - Introduction to React.js. Here is what the lesson contains:
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
                dynamic and interactive user interfaces. Happy coding!">
            Lesson 1.1 - Introduction to React.js</option>

            <option value="Lesson 1.2 - React Basics: JSX: What is JSX?
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
                element (<div>)">

            Lesson 1.2 - React Basics: JSX</option>
        </select>
        <button className='ai-submit' onClick={handleButtonClick}>Click to Submit!</button>
        </div>
        <div className='quiz-code'>
            Quiz will appear here:
        {loading && <div className='loading'>Please be patient. This may take a moment...</div>}
        {!loading && quizContent && (
          <div>
            <h3>Quiz:</h3>
            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>{quizContent}</pre>
          </div>
        )}
        </div>
    </div>
  )
}
