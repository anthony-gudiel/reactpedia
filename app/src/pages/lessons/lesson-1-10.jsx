import "./lesson-1-1.css";
import React, { useState } from "react";
import { OPENAI, suggestedOPENAI } from "../../api/openai";

export const LESSON_1_10 = () => {
  const [userInput, setUserInput] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponseReady, setApiResponseReady] = useState(false);
  const [showSuggestedQuestions, setShowSuggestedQuestions] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleQuestionClick = (question) => {
    question = question.slice(3);
    setUserInput(question);
    handleAIResponse(question);
  };

  const handleAIResponse = async (input) => {
    setIsLoading(true);
    const response = await OPENAI(input);
    setApiResponse(response);
    const suggestedQuestionsResponse = await suggestedOPENAI(response);
    setSuggestedQuestions(suggestedQuestionsResponse);
    setUserInput("");
    setIsLoading(false);
    setApiResponseReady(true);
  };

  return (
    <div className="lesson-1-1">
      <div className="container">
        <div className="lessonHeader">
          <h1>Lesson 10 - Hooks in React</h1>
        </div>
      </div>
      <div className="lesson-content">
        <div className="menu">
          <div className="menu-content">
            <h2>Lesson Directory</h2>
            <a href="/lesson-1-1">Lesson 1 - Introduction to React.js</a>
            <a href="/lesson-1-2">Lesson 2 - React Basics: JSX</a>
            <a href="/lesson-1-3">Lesson 3 - Components</a>
            <a href="/lesson-1-4">Lesson 4 - Props & State</a>
            <a href="/lesson-1-5">Lesson 5 - Lists & Keys</a>
            <a href="/lesson-1-6">Lesson 6 - Conditional Rendering</a>
            <a href="/lesson-1-7">Lesson 7 - Component Lifecycle</a>
            <a href="/lesson-1-8">Lesson 8 - Styling in React</a>
            <a href="/lesson-1-9">Lesson 9 - React Router</a>
            <a href="/lesson-1-10">Lesson 10 - Hooks in React</a>
          </div>
        </div>
        <div className="container-2">
          <div className="overview-header">
            <h3>Objectives</h3>
          </div>
          <div className="break"></div>
          <div className="overview-paragraph">
            <ul>
                <li>Understand the concept of React Hooks and their role in functional components.</li>
                <li>Learn about some commonly used built-in hooks in React.</li>
                <li>Explore how hooks can enhance the state and lifecycle management in functional components.</li>
            </ul>
          </div>
          <div className="break"></div>
          <div className="what-is-header">
          <h3>Introduction to React Hooks: </h3>
          </div>
          <div className="break"></div>
          <div className="what-is-paragraph">
            <ul>
                <li>React Hooks are functions that enable functional components to use state and
                    lifecycle features that were previously only available in class components.</li>
                <li>They allow functional components to manage local state, side effects, and more.</li>
            </ul>
          </div>
          <div className="first-app">
            <h3>`useState` Hook: </h3>
            <ul>
                <li>`useState` is a hook that enables the use of state in functional components.</li>
                <li>Doing so allows components to have local state, making them more dynamic.</li>
            </ul>
            <div className="code">
              const [count, setCount] = useState(0);
            </div>
            <ul>
                <li>`useState` allows functional components to have state variables. It takes an initial state as an argument.</li>
                <li>In this case, the initial state is set to 0, meaning that `count` will initially have a value of 0.</li>
            </ul>
            <h3>`useEffect` Hook: </h3>
            <ul>
                <li>`useEffect` is a hook used for side effects in functional components, such as
                    data fetching, subscriptions, or manually changing the DOM.</li>
                <li>This helps to handle side effects in a declarative way.</li>
            </ul>
            <div className="code">
                useEffect&#40;() =&#62; &#123;
              <div className="break"></div>
              <pre>     document.title = `Count: $&#123;count&#125;`;</pre>
              <div className="break"></div>
                &#125;, [count]&#41;;
             </div>
            <ul>
                <li>In this example, we're using `useEffect` to update the document title when count
                    changes.</li>
                <li>This will run after the initial render and after every re-render.</li>
            </ul>
            <h3>`useContext` Hook: </h3>
            <ul>
                <li>This hook allows functional components to subscribe to a context and access the
                    values provided by that context. It provides a way to avoid passing data
                    through multiple layers of components and makes it easier to access shared
                    values.</li>
                <li>First we'll create a context using `createContext`:</li>
            </ul>
            <div className="code">
                //MyContext.jsx
                <div className="break"></div>
                import &#123; createContext &#125; from 'react';                
                <div className="break"></div>
                const MyContext = createContext();
                <div className="break"></div>
                export default MyContext;
            </div>
            <ul>
                <li>Now, we can use `useContext` to access the values provided by this context in our components:</li>
            </ul>
            <div className="code">
                // MyComponent.js
                <div className="break"></div>
                import &#123; useContext &#125; from 'react';                
                <div className="break"></div>
                const MyComponent = () =&#62; &#123;
                <div className="break"></div>
                <pre>     const contextValue = useContext(MyContext);</pre>
                <div className="break"></div>
                <pre>     return &#60;p&#62;Context Value: &#123;contextValue&#125;&#60;/p&#62;;</pre>
                <div className="break"></div>
                &#125;
                <div className="break"></div>
                export default MyComponent
            </div>
            <ul>
                <li>First, we create a context using createContext. This context can hold a default value.</li>
                <li>Next, we wrap our component tree with a MyContext.Provider to provide a value to the context.</li>
                <li>Now, in any functional component within the tree, you can use `useContext(MyContext)` to access
                    the current value of the context.</li>
            </ul>
            <h3>Custom Hooks: </h3>
            <ul>
                <li>You can also create your own custom hooks!</li>
                <li>Create a function (e.g., `useCounter`) that encapsulates the logic you want to 
                    reuse. It can use other built-in hooks like useState.</li>
                <li>The custom hook should return values or functions that the components using
                    the hook can use.</li>
                <li>You can then import and use the custom hook in your components.</li>
            </ul>
            <h3>Conclusion: </h3>
            This is all we have to teach you for now! We hope you learned something useful! Be on
            the lookout for new future lessons and improved upon current lessons!
          </div>
          <a className="lesson-1-button" href="./lesson-1-9">
            Previous Lesson
          </a>
          <a className="lesson-1-button" href="./quizzes">
            Quiz yourself!
          </a>
        </div>
      </div>
      <input
        type="text"
        className="full-width-button"
        placeholder="Any questions? Type here to ask your AI assistant! &#129302;"
        value={userInput}
        onChange={handleInputChange}
      />
      <button className="ai-submit" onClick={handleAIResponse}>
        Click to Submit!
      </button>
      <div className="ai-response">
        <h4>Response will appear here! :</h4>
        {isLoading ? (
          <div className="code">
            <div className="loading">
              Generating reponse. Please wait a moment...
            </div>
          </div>
        ) : (
          apiResponse && (
            <div className="code">
              <pre style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
                {apiResponse}
              </pre>
            </div>
          )
        )}

        {apiResponseReady && (
          <>
            <button
              className="suggested-questions-button"
              onClick={() => setShowSuggestedQuestions(true)}
            >
              Click Here to See Related Questions
            </button>

            {showSuggestedQuestions && (
              <div className="suggested-questions-modal">
                <ul>
                  {suggestedQuestions.map((question, index) =>
                    question.split("\n").map((line, lineIndex) => (
                      <li key={`${index}-${lineIndex}`}>
                        <div
                          key={`${index}-${lineIndex}`}
                          className="suggested-question-button"
                          onClick={() => handleQuestionClick(line)}
                        >
                          {line}
                        </div>
                      </li>
                    ))
                  )}
                </ul>
                <button onClick={() => setShowSuggestedQuestions(false)}>
                  Close
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
