import React from 'react'
import './lesson-1-1.css'
import { Link } from 'react-router-dom'

export const LESSON_1_1 = () => {
  return (
    <div className='lesson-1-1'>
      <div className='container'>
        <div className='lessonHeader'>
          <h1>Lesson 1.1 - Introduction to React.js</h1>
        </div>
      </div>
      <div className='lesson-content'>
      <div className='container-2'>
        <div className='overview-header'>
          <h3>Lesson Overview:</h3>
        </div>
        <div className='break'></div>
        <div className='overview-paragraph'>
          Welcome to the exciting world of React.js! In this introductory lesson, we'll cover the basics of what React is, why it's widely used, and how to set up a simple React application. By the end of this lesson, you'll have a solid understanding of React's core concepts and be ready to dive deeper into building dynamic and interactive user interfaces.
        </div>
        <div className='what-is-header'>
          <h3>What is React.js?</h3>
        </div>
        <div className='break'></div>
        <div className='what-is-paragraph'>
          React.js is a JavaScript library developed by Facebook for building user interfaces, especially for single-page applications where data is updated frequently. It allows developers to create reusable UI components, making it easier to manage and scale complex applications.
        </div>
        <div className='why-react'>
          <h3>Why React?</h3>
        </div>
        <div className='break'></div>
        <div className='declarative-syntax'>
          <em>Declarative Syntax:</em> 
          <div className='break'></div>
          React uses a declarative syntax, making it easier to understand and debug code.
        </div>
        <div className='break'></div>
        <div className='component-based-architecture'>
          <em>Component-Based Architecture:</em>
          <div className='break'></div>
          React applications are built using components, which are self-contained, reusable pieces of code. This makes development more modular and maintainable.
        </div>
        <div className='virtual-dom'>
          <em>Virtual DOM:</em> 
          <div className='break'></div>
          React uses a virtual DOM to optimize rendering and improve performance, ensuring that only the necessary components are updated when data changes.
        </div>
        <div className='break'></div>
        <div className='community-ecosystem'>
          <em>Community and Ecosystem:</em>
          <div className='break'></div>
          React has a large and active community, providing a wealth of resources, libraries, and tools for developers.
        </div>
        <div className='first-app'>
          <h3> Setting Up Your First React App: </h3>
          For our lessons, we'll have an in-browser development environment for you to work from, but why not have you download the real thing while we're here!
          <div className='break'></div>
          Step 1: Install Node.js
          <div className='break'></div>
          React applications are typically built using Node.js. Install it from nodejs.org.
          <div className='break'></div>
          Step 2: Create a React App
          <div className='break'></div>
          Open your terminal and run the following commands:
          <div className='code'>
            <code>npx create-react-app my-first-react-app</code>
            <div className='break'></div>
            <code>cd my-first-react-app</code>
            </div>
            <div className='break'></div>
            Step 3: Start the Development Server
            <div className='break'></div>
            Run the following command to start the development server:
            <div className='break'></div>
            <div className='code'>
              <code>npm start</code>
            </div>
            This will open your new React app in a web browser.
        </div>
        <div className='project-structure'>
          <h3>Understanding the Project Structure:</h3>
          <ul>
            <li>src Folder: This is where your application code lives</li>
            <li>public Folder: Contains the HTML file and other static assets.</li>
            <li> package.json File: Describes your project and its dependencies.</li>
          </ul>
        </div>
        <div className='first-component'>
          <h3>Your First React Component:</h3>
          Open the src/App.js file. You'll see a basic component like this:
          <div className='code'>
            import React from 'react';
            <div className='break'></div>
            function App () &#123;
            <div className='break'></div>
            <pre> return &#40;</pre>
            <div className='break'></div>
            <pre>   &#60;div&#62;</pre>
            <div className='break'></div>
            <pre>     &#60;h1&#62; Hello World! &#60;&#47;h1&#62;</pre>
            <div className='break'></div>
            <pre>   &#60;/div&#62;</pre>
            <div className='break'></div>
            <pre> &#41;&#59;</pre>
            <div className='break'></div>
            &#125;
            <div className='break'></div>
            export default App;
          </div>
          <ul>
            <li>import React from 'react'; : Imports the React library.</li>
            <li>function App()  &#123;...&#125; : Defines a functional component named App.</li>
            <li>return ( ... ) : Describes the component's UI. </li>
          </ul>
        </div>
        <div className='break'></div>
        <div className='congratulations'>
          <h3>Congratulations!</h3>
          You've just set up your first React app and created a simple React component. In the next lesson, we'll explore React components in more detail and learn how to create dynamic and interactive user interfaces. Happy coding!
        </div>
        <button className='lesson-1-button'>
          <Link to='/lesson-1-2'>Next Lesson</Link>
        </button>
      </div>
      </div>
      <button className='full-width-button'>
        Any questions? Ask your AI assistant! &#129302;
      </button>
    </div>
  )
}