import "./lesson-1-1.css";
import React, { useState } from "react";
import { OPENAI, suggestedOPENAI } from "../../api/openai";

export const LESSON_1_7 = () => {
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
          <h1>Lesson 7 - Component Lifecycle in React</h1>
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
            <h3>Objectives</h3>
          </div>
          <div className="break"></div>
          <div className="overview-paragraph">
            <ul>
                <li>Understand the lifecycle phases of a React component.</li>
                <li>Learn how to utilize lifecycle methods for various tasks.</li>
                <li>Apply knowledge of the component lifecycle to manage state, perform side effects, and optimize performance.</li>
            </ul>
          </div>
          <div className="break"></div>
          <div className="what-is-header">
          <h3>Introduction to Component Lifecycle: </h3>
          </div>
          <div className="break"></div>
          <div className="what-is-paragraph">
            <ul>
                <li>Handling events is crucial for creating interactive and responsive user interfaces
                in React.The component lifecycle refers to the different phases a React component goes
                through, from its creation to its removal from the DOM.</li>
                <li>Understanding these phases allows developers to perform tasks at specific points in a component's existence.</li>
                <b>Phases: </b>
                <li>Mounting: When a component is being created and inserted into the DOM.</li>
                <li>Updating: When a component is re-rendered as a result of changes to its state or props.</li>
                <li>Unmounting: When a component is removed from the DOM.</li>
            </ul>
          </div>
          <div className="first-app">
            <h3>Mounting Phase: </h3>
            <ul>
                <li>`constructor()` Method</li>
                <li>The constructor is called when an instance of the component is being created. It's the right place to initialize state.</li>
            </ul>
            <div className="code">
              <div className="break"></div>
              constructor (props) &#123;
              <div className="break"></div>
              <pre> super(props);</pre>
              <div className="break"></div>
              <pre> this.state = &#123;</pre>
              <div className="break"></div>
              <pre>     count : 0,</pre>
              <div className="break"></div>
              <pre> &#125;;</pre>
              <div className="break"></div>
              <pre> this.handleClick = this.handleClick.bind(this)</pre>
              <div className="break"></div>
              <pre>&#125;</pre>
            </div>
            <div className="break"></div>
            <ul>
                <li>Next is the `render()` Method</li>
                <li>The render method is responsible for creating the initial UI structure of the component.</li>
            </ul>
            <div className="code">
              <div className="break"></div>
              render() &#123;
              <div className="break"></div>
              <pre> return &#60;div&#62;&#123;this.state.count&#125;&#60;/div&#62;</pre>
              <div className="break"></div>
              &#125;
            </div>
            <ul>
                <li>Next is the `componentDidMount()` Method.</li>
                <li>This is called after the component is rendered in the DOM. It' suitable for fetching data or performing similar side effects.</li>
            </ul>
            <div className="code">
              <div className="break"></div>
              componentDidMount() &#123;
              <div className="break"></div>
              <pre> //Say we're fetching data from an API</pre>
              <div className="break"></div>
              <pre> fetch('https://api.example.com/data')</pre>
              <div className="break"></div>
              <pre>     .then(response =&#62; response.json())</pre>
              <div className="break"></div>
              <pre>     .then(data =&#62; this.setState (&#123; data &#125;))</pre>
              <div className="break"></div>
                &#125;
            </div>
            <h3>Updating Phase: </h3>
            <ul>
                <li>`shouldComponentUpdate()` Method </li>
                <li>This allows you to control whether a component should re-render.</li>
                <li>It can optimize performance by preventing unnecessary re-renders.</li>
            </ul>
            <div className="code">
              <div className="break"></div>
              shouldComponentUpdate(nextProps, nextState) &#123;
              <div className="break"></div>
              <pre> //Only re-render if the count changes</pre>
              <div className="break"></div>
              <pre> return this.state.count !== nextState.count;</pre>
              <div className="break"></div>
                &#125;
            </div>
            <ul>
                <li>`render()` Method again</li>
                <li>The render method is called again when a component re-renders due to changes in state or props.</li>
            </ul>
            <ul>
                <li>`componentDidUpdate()` Method:</li>
                <li>`componentDidUpdate` is called after the component is updated. It's suitable for performing side effects or additional data fetching.</li>
            </ul>
            <div className="code">
              <div className="break"></div>
              componentDidUpdate(prevProps, prevState) &#123;
              <div className="break"></div>
              <pre> if (prevState.count !== this.state.count) &#123;</pre>
              <div className="break"></div>
              <pre>     console.log('Count updated:', this.state.count);</pre>
              <div className="break"></div>
              <pre> &#125;</pre>
              <div className="break"></div>
                &#125;
            </div>
            <h3>Error Handling: </h3>
            <ul>
                <li>`componentDidCatch()` Method</li>
                <li>`componentDidCatch` is a lifecycle method for handling errors that occur within child components during rendering.</li>
            </ul>
            <div className="code">
            componentDidCatch(error, errorInfo) &#123;
            <div className="break"></div>
            <pre>   logErrorToMyService(error, errorInfo);</pre>
            <div className="break"></div>
            &#125;
            </div>
            <h3>Best Practices: </h3>
            <ul>
                <li>Keep lifecycle methods concise and focused on specific functionalities</li>
                <li>Be aware of depricated lifecycle methods, as React evolves.</li>
            </ul>
          </div>
          <a className="lesson-1-button" href="./lesson-1-6">
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
