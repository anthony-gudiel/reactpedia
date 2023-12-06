import "./lesson-1-1.css";
import React, { useState } from "react";
import { OPENAI, suggestedOPENAI } from "../../api/openai";

export const LESSON_1_6 = () => {
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
          <h1>Lesson 6 - Handling Events & Conditional Rendering</h1>
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
            <a href="/lesson-1-10">Lesson 10 - State Management with Context</a>
            <a href="/lesson-1-11">Lesson 11 - Hooks in React</a>
            <a href="/lesson-1-12">Lesson 12 - Fetching Data with API</a>
            <a href="/lesson-1-13">Lesson 13 - Testing in React</a>
            <a href="/lesson-1-14">Lesson 14 - Deployment and Best Practices</a>
          </div>
        </div>
        <div className="container-2">
          <div className="overview-header">
            <h3>Objectives</h3>
          </div>
          <div className="break"></div>
          <div className="overview-paragraph">
            <ul>
                <li>Understand how to handle events in React components.</li>
                <li>Learn about the concept of conditional rendering.</li>
                <li>Apply event handling and conditional rendering in React applications.</li>
            </ul>
          </div>
          <div className="break"></div>
          <div className="what-is-header">
          <h3>Handling Events in React:</h3>
          </div>
          <div className="break"></div>
          <div className="what-is-paragraph">
            <ul>
                <li>Handling events is crucial for creating interactive and responsive user interfaces in React.</li>
                <li>Events like clicks, changes, and submissions can be managed efficiently.</li>
            </ul>
            <div className="code">
              const EventHandlingExample = () =&#62; &#123;
              <div className="break"></div>
              <pre> const handleClick = () =&#62; &#123;</pre>
              <div className="break"></div>
              <pre>     console.log('Button Clicked')</pre>
              <div className="break"></div>
              <pre> &#125;;</pre>


              <div className="break"></div>
              <pre> return &#40;</pre>
              <div className="break"></div>
              <pre>     &#60;button onClick=&#123;handleClick&#125;&#62;</pre>
              <div className="break"></div>
              <pre>         Click me</pre>
              <div className="break"></div>
              <pre>     &#60;/button&#62;</pre>
              <div className="break"></div>
              <pre> &#41;;</pre>
              <div className="break"></div>
                &#125;;
            </div>
          </div>
          <div className="first-app">
            <h3>Event Handling Syntax: </h3>
            <ul>
                <li>In React, event handlers are assigned in JSX use camelCase, such as `onClick` or `onChange`.</li>
                <li>Common events include `onClick`, `onChange`, and `onSubmit`</li>
            </ul>
            <div className="code">
              <div className="break"></div>
              const EventHandlingSyntax = () =&#62; &#123;
              <div className="break"></div>
              <pre> const handleChange = (event) =&#62; &#123;</pre>
              <div className="break"></div>
              <pre>     console.log('Input Value:', event.target.value);</pre>
              <div className="break"></div>
              <pre> &#125;</pre>
          

              <div className="break"></div>
              <pre> return &#40;</pre>
              <div className="break"></div>
              <pre>     &#60;input type='text' onChange=&#123;handleChange&#125; /&#62;</pre>
              <div className="break"></div>
              <pre> &#41;;</pre>
              <div className="break"></div>
              <pre>&#125;;</pre>
            </div>
            <h3>State and Event Handling:</h3>
            <div className="break"></div>
            <ul>
                <li>State and event handling often go hand in hand.</li>
                <li>You can update state based on user interactions, leading to dynamic and responsive components.</li>
            </ul>
            <div className="code">
              <div className="break"></div>
              const StateAndEventHandling = () =&#62; &#123;
              <div className="break"></div>
              <pre> const [count, setCount] = useState(0);</pre>
              <div className="break"></div>
              <pre> const handleIncrement = () =&#62; &#123;</pre>
              <div className="break"></div>
              <pre>     setCount(count + 1);</pre>
              <div className="break"></div>
              &#125;;
              <div className="break"></div>
              <pre> return &#40;</pre>
              <div className="break"></div>
              <pre>     &#60;div&#62;</pre>
              <div className="break"></div>
              <pre>         &#60;p&#62; Count: &#123;count&#125; &#60;/p&#62;</pre>
              <div className="break"></div>
              <pre>         &#60;button onClick=&#123;handleIncrement&#125;&#62;</pre>
              <div className="break"></div>
              <pre>             Increment</pre>
              <div className="break"></div>
              <pre>         &#60;/button&#62;</pre>
              <div className="break"></div>
              <pre>     &#60;div&#62;</pre>
              <div className="break"></div>
              <pre> &#41;;</pre>
              <div className="break"></div>
              &#125;;
            </div>
            <h3>Conditional Rendering in React: </h3>
            <ul>
                <li>Conditional rendering allows components to be displayed or hidden based on certain conditions</li>
                <li>This is useful for showing different content based on user authentication, form validation, etc.</li>
            </ul>
            <div className="code">
              <div className="break"></div>
              const ConditionalRenderingExample = () =&#62; &#123;
              <div className="break"></div>
              <pre> const [isLoggedIn, setIsLoggedIn] = useState(false);</pre>
              <div className="break"></div>
              <pre> return &#40;</pre>
              <div className="break"></div>
              <pre>     &#60;div&#62;</pre>
              <div className="break"></div>
              <pre>         &#123;isLoggedIn ? &#40;</pre>
              <div className="break"></div>
              <pre>             &#60;p&#62;Welcome, user!&#60;/p&#62;</pre>
              <div className="break"></div>
              <pre>         &#41; : &#40;</pre>
              <div className="break"></div>
              <pre>             &#60;button onClick = &#123;() =&#62; setIsLoggedIn(true)&#125;&#62;</pre>
              <div className="break"></div>
              <pre>                 Log In</pre>
              <div className="break"></div>
              <pre>             &#60;/button&#62;</pre>
              <div className="break"></div>
              <pre>         &#41;&#125;</pre>
              <div className="break"></div>
              <pre>     &#60;/div&#62;</pre>
              <div className="break"></div>
              <pre> &#41;;</pre>
              <div className="break"></div>
                &#125;;
            </div>
            <h3>Conditional Rendering Techniques</h3>
            <ul>
                <li>Ternary operator:</li>
            </ul>
            <div className="code">
              <div className="break"></div>
              const RenderWithTernary = () =&#62; &#123;
              <div className="break"></div>
              <pre> const isTrue = true;</pre>
              <div className="break"></div>
              <pre> return &#40;</pre>
              <div className="break"></div>
              <pre>     &#60;p&#62; &#123;isTrue ? 'It is true' : 'It is false' &#125;&#60;/p&#62;</pre>
              <div className="break"></div>
              <pre> &#41;;</pre>
              <div className="break"></div>
                &#125;;
            </div>
            <ul>
                <li>&& operator:</li>
            </ul>
            <div className="code">
              <div className="break"></div>
              const RenderWithLogicalAnd = () =&#62; &#123;
              <div className="break"></div>
              <pre> const showContent = true;</pre>
              <div className="break"></div>
              <pre> return &#40;</pre>
              <div className="break"></div>
              <pre>     &#60;div&#62;</pre>
              <div className="break"></div>
              <pre>         &#123;showContent && &#60;p&#62;Show this content&#60;/p&#62;&#125;</pre>
              <div className="break"></div>
              <pre>     &#60;/div&#62;</pre>
              <div className="break"></div>
              <pre> &#41;;</pre>
              <div className="break"></div>
                &#125;;
            </div>
            <h3>Handling Conditional Styles: </h3>
            <ul>
                <li>Apply dynamic styles based on conditions, enhancing the visual aspects of your components</li>
            </ul>
            <div className="code">
              <div className="break"></div>
              const ConditionalStylesExample = () =&#62; &#123;
              <div className="break"></div>
              <pre> const [isError, setIsError] = useState(false);</pre>
              <div className="break"></div>
              <pre> return &#40;</pre>
              <div className="break"></div>
              <pre>     &#60;div style=&#123;&#123; color: isError ? 'red' : 'green' &#125;&#125;&#62;</pre>
              <div className="break"></div>
              <pre>         &#123;isError ? 'Error' : 'Success!'&#125;</pre>
              <div className="break"></div>
              <pre>     &#60;/div&#62;</pre>
              <div className="break"></div>
              <pre> &#41;;</pre>
              <div className="break"></div>
                &#125;;
            </div>
            <h3>Best Practices: </h3>
            <ul>
                <li>Keep event handlers concise and focused on specific functionalities.</li>
                <li>Use meaningful variable names for conditions to improve code readability.</li>
            </ul>
          </div>
          <a className="lesson-1-button" href="./lesson-1-5">
            Previous Lesson
          </a>
          <a className="lesson-1-button" href="./lesson-1-7">
            Next Lesson
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
