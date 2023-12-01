import "./lesson-1-1.css";
import React, { useState } from "react";
import { OPENAI, suggestedOPENAI } from "../../api/openai";
import componentImage from "../../assets/component.png";

export const LESSON_1_3 = () => {
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
          <h1>Lesson 3 - Components</h1>
        </div>
      </div>
      <div className="lesson-content">
        <div className="menu">
          <div className="menu-content">
            <h2>Lesson Directory</h2>
            <a href="/lesson-1-1">Lesson 1 - Introduction to React.js</a>
            <a href="/lesson-1-2">Lesson 2 - React Basics: JSX</a>
            <a href="/lesson-1-3">Lesson 3 - Components</a>
            <a href="/lesson-1-4">Lesson 4 - State and Lifecycle</a>
            <a href="/lesson-1-5">Lesson 5 - Handling Events</a>
            <a href="/lesson-1-6">Lesson 6 - Conditional Rendering</a>
            <a href="/lesson-1-7">Lesson 7 - Lists and Keys</a>
            <a href="/lesson-1-8">Lesson 8 - Forms in React</a>
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
            <h3>Components in React</h3>
          </div>
          <div className="break"></div>
          <div className="overview-paragraph">
            <ul>
              <li>
                In React, a component is a reusable, self-contained building
                block that encapsulates a piece of the user interface.
              </li>
              <li>Components can be functional or class-based.</li>
            </ul>
          </div>
          <div className="break"></div>
          <div className="what-is-header">
            <h3>Functional Components: </h3>
          </div>
          <div className="break"></div>
          <div className="what-is-paragraph">
            <ul>
              <li>
                These kinds of components are declared as JavaScript functions.
              </li>
              <li>
                Typically simple and concise, especially for presentational
                components.
              </li>
            </ul>
            <div className="code">
              function FirstComponent() &#123;
              <div className="break"></div>
              <pre> return &#40;</pre>
              <pre>   &#60;p&#62;This is my first component!&#60;/p&#62;</pre>
              <div className="break"></div>
              <pre> &#41;;</pre>
              <div className="break"></div>
              &#125;
            </div>
            Now that we have made a component, we can use it in another
            component like this:
            <div className="code">
              export default function MyApp() &#123;
              <div className="break"></div>
              return &#40;
              <div className="break"></div>
              <pre>   &#60;div&#62;</pre>
              <div className="break"></div>
              <pre>     &#60;p&#62;This is my app!&#60;/p&#62;</pre>
              <div className="break"></div>
              <pre>     &#60;FirstComponent /&#62;</pre>
              <div className="break"></div>
              <pre>   &#60;/div&#62;</pre>
              <div className="break"></div>
              &#41;;
              <div className="break"></div>
              &#125;
            </div>
            <ul>
              <li>
                This code represents a basic React component (MyApp) that you
                can use as the starting point for your application. When you
                import MyApp into another file, you can include and render it as
                a component in your application.
              </li>
            </ul>
          </div>
          <div className="first-app">
            <h3> Importing and Exporting: </h3>
            <ul>
              <li>
                In the previous example, the export default statement is used to
                export the MyApp component as the default export from this
                module.
              </li>
              <li>
                This allows you to import and use MyApp in other parts of your
                application.
              </li>
              <li>To import components into other files:</li>
            </ul>
            <div className="code">
              import React from 'react'; //This is typical for every .jsx file
              <div className="break"></div>
              import &#123;MyApp&#125; from './MyApp';
            </div>
            <ul>
              <li>
                It is best practice to put these import statements in the first
                lines of your file
              </li>
              <li>
                In this example, we're importing our 'MyApp' component from the
                'MyApp.jsx' file into another file, though we don't explicitly
                state the .jsx extension in the import statement
              </li>
            </ul>
            <h3>Summary: </h3>
            <div className="break"></div>
            <img
              src={componentImage}
              alt="Failed to load."
              className="lesson-3-image"
            />
            <div className="break"></div>
            <em>Components in React:</em>
            <ul>
              <li>Building blocks for UI elements.</li>
            </ul>
            <em>Functional Components</em>
            <ul>
              <li>Declared as functions.</li>
              <li>Ideal for simplicity and presentation.</li>
            </ul>
            <em>Using Components:</em>
            <ul>
              <li>Compose components within others.</li>
              <li>Export using export default.</li>
            </ul>
            <em>Importing Components:</em>
            <ul>
              <li>Import components for reuse.</li>
              <li>Best practice: Place imports at the file's start.</li>
            </ul>
          </div>
          <a className="lesson-1-button" href="./lesson-1-2">
            Previous Lesson
          </a>
          <a className="lesson-1-button" href="./lesson-1-4">
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
      <button className="ai-submit" onClick={() => handleAIResponse(userInput)}>
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
