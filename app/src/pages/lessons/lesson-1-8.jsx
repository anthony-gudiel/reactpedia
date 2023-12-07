import "./lesson-1-1.css";
import React, { useState } from "react";
import { OPENAI, suggestedOPENAI } from "../../api/openai";

export const LESSON_1_8 = () => {
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
          <h1>Lesson 8 - Styling in React</h1>
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
                <li>Understand various approaches of styling in React</li>
                <li>Learn about inline styles, CSS-in-JS libraries, and external stylesheets.</li>
                <li>Apply styling techniques to create visually appealing React components.</li>
            </ul>
          </div>
          <div className="break"></div>
          <div className="what-is-header">
          <h3>Introduction to Styling in React: </h3>
          </div>
          <div className="break"></div>
          <div className="what-is-paragraph">
            <ul>
                <li>Importance of Styling: Allows you to create engaging and user-friendly web applications.</li>
                <li>Common Challenges with Styling: Resuability, responsiveness, code organization.</li>
            </ul>
          </div>
          <div className="first-app">
            <h3>Inline Styles: </h3>
            <ul>
                <li>We'll first discuss how to apply styles directly within the JSX using the `style` attribute.</li>
                <li>These are called inline styles.</li>
                <li>Pros of Inline Styles: Easy integration with React components, dynamic styling.</li>
                <li>Cons of Inline Styles: Limited reusability, potential code clutter.</li>
                <li>Example: </li>
            </ul>
            <div className="code">
              <div className="break"></div>
              const MyComponent = () =&#62; &#123;
              <div className="break"></div>
              <pre> const styles = &#123;</pre>
              <div className="break"></div>
              <pre>     color: 'blue',</pre>
              <div className="break"></div>
              <pre>     fontSize: '16px',</pre>
              <div className="break"></div>
              <pre> &#125;;</pre>
              <div className="break"></div>
              <pre> return &#60;div style=&#123;styles&#125;&#62;Styled Component&#60;/div&#62;</pre>
              <div className="break"></div>
              &#125;
            </div>
            <h3>CSS-in-JS Libraries: </h3>
            <ul>
                <li>CSS-in-JS libraries are tools that allow developers to write and manage CSS styles directly within JavaScript frameworks.</li>
                <li>Good for scoped styling, dynamic theming, and better organization.</li>
            </ul>
            <div className="code">
              <div className="break"></div>
              import styled from 'styled-components';
              <div className="break"></div>
              const StyledButton = styled.button`
              <div className="break"></div>
              <pre>     background-color: blue;</pre>
              <div className="break"></div>
              <pre>     color: black;</pre>
              <div className="break"></div>
              <pre>     padding: 10px;</pre>
              <div className="break"></div>
              `;
            </div>
            <ul>
                <li>Here, we are importing the `styled` function from the `styled-components` library.
                    This function is a utility provided by `styled-components` to create styled
                    components.
                </li>
                <li>We then use the `styled` function called with our HTML element `button` as a template
                    literal. The template literal contains CSS styles that will be applied to the specified
                    element.
                </li>
            </ul>
            <h3>External StyleSheets: </h3>
            <ul>
                <li>This is commonly considered the most traditional approach for using CSS to stylize.</li>
                <li>In this method, we link external CSS files to use in our JSX file.</li>
                <li>There are two common ways of doing this:</li>
            </ul>
            <div className="code">
                &#60;link rel='stylesheet' href='styles.css' /&#62;
            </div>
            <div className="code">
                import '../my-stylesheet.css'
            </div>
            <h3>Responsive Design in React: </h3>
            <ul>
                <li>Media queries are essential in creating responsive designs</li>
                <li>Media queries are commonly used to adjust your styles based on the screen size of the user: </li>
            </ul>
            <div className="code">
                @media (max-width:1003px) &#123;
                <div className="break"></div>
                <pre>   .lesson-3-image&#123;</pre>
                <div className="break"></div>
                <pre>       display: none;</pre>
                <div className="break"></div>
                <pre>   &#125;</pre>
                <div className="break"></div>
                &#125;
            </div>
            <ul>
                <li>Here, we're making it so that once the screen size of the user hits 1003px or less,
                    the image under class `lesson-3-image` will no longer be displayed.
                </li>
            </ul>
            <h3>Best Practices: </h3>
            <ul>
                <li>Use consistent naming conventions and meaningful class names for styles</li>
                <li>Consider the reusability of your styles.</li>
                <li>Explore common CSS techniques like Flexbox and Grid</li>
            </ul>
          </div>
          <a className="lesson-1-button" href="./lesson-1-7">
            Previous Lesson
          </a>
          <a className="lesson-1-button" href="./lesson-1-9">
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
