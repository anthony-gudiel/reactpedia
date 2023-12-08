import "./lesson-1-1.css";
import React, { useState } from "react";
import { OPENAI, suggestedOPENAI } from "../../api/openai";

export const LESSON_1_4 = () => {
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
          <h1>Lesson 4 - Props & State in React</h1>
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
              <li>Understand the role of props in passing data between React components.</li>
              <li>Learn how to manage and utilize state within React components.</li>
              <li>Differentiate between props and state.</li>
            </ul>
          </div>
          <div className="break"></div>
          <div className="what-is-header">
            <h3>Props in React</h3>
          </div>
          <div className="break"></div>
          <div className="what-is-paragraph">
            <ul>
              <li>
                Definition: Props (short for properties) are a way to pass data from a parent component to a child component
              </li>
              <li>
                Purpose: Enable communication between components.
              </li>
            </ul>
            <div className="code">
              // Parent Component
              <div className="break"></div>
              function App() &#123;
              <div className="break"></div>
              <pre> return &#40;</pre>
              <div className="break"></div>
              <pre>   &#60;div&#62;</pre>
              <div className="break"></div>
              <pre>     &#123;Greeting name="John" /&#125;</pre>
              <div className="break"></div>
              <pre>   &#60;/div&#62;</pre>
              <div className="break"></div>
              <pre> &#41;</pre>
              <div className="break"></div>
              &#125;
            </div>
            <div className="code">
              // Child Component
              <div className="break"></div>
              function Greeting (props) &#123;
              <div className="break"></div>
              <pre>
                {" "}
                return &#60;p&#62;Hello, &#123;props.name&#125; ! &#60;/p&#62;
              </pre>
              <div className="break"></div>
              &#125;
            </div>
            <ul>
              <li>
                If you remember, we talked about props in lesson 2! If you need a quick refresher, head back there and then come back here when you're done. 
              </li>
            </ul>
          </div>
          <div className="first-app">
            <h3> State in React </h3>
            <ul>
              <li>
                Definition: State is a way to manage and store data within a component.
              </li>
              <li>
                Purpose: Enables component to maintain and update their own data.
              </li>
            </ul>
            <div className="code">
              import React, &#123;Component&#125; from 'react';
              <div className="break"></div>
              class Counter extends Component &#123;
              <div className="break"></div>
              <pre> constructor(props)&#123;</pre>
              <div className="break"></div>
              <pre>   super(props);</pre>
              <div className="break"></div>
              <pre>   this.state = &#123;</pre>
              <div className="break"></div>
              <pre>     count: 0,</pre>
              <div className="break"></div>
              <pre>   &#125;;</pre>
              <div className="break"></div>
              &#125;
              <div className="break"></div>
              <pre> render()</pre>
              <div className="break"></div>
              <pre>   return &#40;</pre>
              <div className="break"></div>
              <pre>     &#60;div&#62;</pre>
              <div className="break"></div>
              <pre>       &#60;p&#62;Count: &#123;this.state.count&#125;&#60;/p&#62;</pre>
              <div className="break"></div>
              <pre>       &#60;button OnClick = &#123;() =&#62; this.setState(&#123; count: this.state.count + 1 &#125;)&#125;&#62;</pre>
              <div className="break"></div>
              <pre>         Increment</pre>
              <div className="break"></div>
              <pre>       &#60;/button&#62;</pre>
              <div className="break"></div>
              <pre>     &#60;/div&#62;</pre>
              <div className="break"></div>
              <pre>   &#41;</pre>
              <div className="break"></div>
              <pre> &#125;</pre>
              <div className="break"></div>
              &#125;
            </div>
            <ul>
              <li>
                First we define a class named `Counter` that extends the `Component` class from React. This means that `Counter` is a React component.
              </li>
              <li>
                The `constructor` method is a special method that gets called when an instance of the class is created. It initializes the state of the component.
              </li>
              <li>
                `super(props)` calls the constructor of the parent class (`Component`). It's necessary to call `super` before accessing `this` in the constructor.
              </li>
              <li>
                `this.state` is an object that holds the state of the component. In this case, it has one property, `count`, intialized to `0`.
              </li>
              <li>
                The `render` method is required for every React component. It describes what the UI of the component should look like.
              </li>
              <li>
                In this example, it returns a JSX structure that includes a paragraph `&#123;p&#125;` displaying the current count and a button with an onClick event handler
              </li>
              <li>
                When the button is clicked, the count is updated in the component's state. It calls `this.setState` to update the state and trigger a re-render.
              </li>
            </ul>
            <h3>Differences Between Props and State</h3>
            <div className="break"></div>
            <em>Props:</em>
            <ul>
              <li> Immutable, read-only data received from a parent component.</li>
              <li>Passed from parent to child.</li>
              <li>Changes in props trigger a re-render in the child component.</li>
            </ul>
            <em>State: </em>
            <ul>
              <li>Mutable data managed within a component.</li>
              <li>Internally maintained by the component.</li>
              <li>Changes in state trigger a re-render of the component. </li>
            </ul>
            <h3>Updating State</h3>
            <ul>
              <li>Utilize the `setState` method to update state in a React component.</li>
              <li>Note: State updates may be asynchronous, and React may batch multiple `setState` calls for performance.</li>
            </ul>
            <div className="code">
                            class Counter extends Component &#123;
              <div className="break"></div>
              <pre> constructor(props)&#123;</pre>
              <div className="break"></div>
              <pre>   super(props);</pre>
              <div className="break"></div>
              <pre>   this.state = &#123;</pre>
              <div className="break"></div>
              <pre>     count: 0,</pre>
              <div className="break"></div>
              <pre>   &#125;;</pre>
              <div className="break"></div>
              &#125;
              <div className="break"></div>
              <pre> incrementCount = () =&#62; &#40;&#123;</pre>
              <div className="break"></div>
              <pre>   this.setState&#40;&#40;prevState&#41; =&#62; &#40;&#123;</pre>
              <div className="break"></div>
              <pre>     count: prevState.count + 1,</pre>
              <div className="break"></div>
              <pre>   &#125;&#41;&#41;;</pre>
              <div className="break"></div>
              <pre> &#125;;</pre>
              <div className="break"></div>
              <pre> render()</pre>
              <div className="break"></div>
              <pre>   return &#40;</pre>
              <div className="break"></div>
              <pre>     &#60;div&#62;</pre>
              <div className="break"></div>
              <pre>       &#60;p&#62;Count: &#123;this.state.count&#125;&#60;/p&#62;</pre>
              <div className="break"></div>
              <pre>       &#60;button OnClick = &#123;this.incrementCount&#125;&#62;</pre>
              <div className="break"></div>
              <pre>         Increment</pre>
              <div className="break"></div>
              <pre>       &#60;/button&#62;</pre>
              <div className="break"></div>
              <pre>     &#60;/div&#62;</pre>
              <div className="break"></div>
              <pre>   &#41;</pre>
              <div className="break"></div>
              <pre> &#125;</pre>
              <div className="break"></div>
            </div>
            <ul>
              <li>This is similar to the previous example, except we have added `incrementCount`
                to increment the counter every time the button is clicked and set its state.
              </li>
              <li>`incrementCount = () =&#62; &#123; ... &#125;`: Defines an arrow function named `incrementCount`.
                Arrow functions are used to bind the function to the instance of the class, ensuring that this
                refers to the component instance.</li>
              <li>`this.setState((prevState) =&#62; (&#123; count: prevState.count + 1 &#125;));`:
                Uses `this.setState` to update the state based on the previous state. It increments
                 the `count` by 1.</li>
            </ul>
            <h3>Stateless Functional Components</h3>
            <ul>
              <li>Functional component can receive props.</li>
              <li>Use the `useState` hook to introduce state in functional components.</li>
            </ul>
            <div className="code">
              import React, &#123;useState&#125; from 'react';
              <div className="break"></div>
              const Counter = () =&#62; &#123;
              <div className="break"></div>
              <pre> const [count, setCount] = useState(0);</pre>
              <div className="break"></div>
              <pre> return &#40;</pre>
              <div className="break"></div>
              <pre>   &#60;div&#62;</pre>
              <div className="break"></div>
              <pre>     &#60;p&#62; Count: &#123;count&#125; &#60;/p&#62;</pre>
              <div className="break"></div>
              <pre>     &#60;button OnClick = &#123;() =&#62; setCount(count + 1)&#125;&#62;</pre>
              <div className="break"></div>
              <pre>       Increment</pre>
              <div className="break"></div>
              <pre>     &#60;/button&#62;</pre>
              <div className="break"></div>
              <pre>   &#60;/div&#62;</pre>
              <div className="break"></div>
              <pre> &#41;;</pre>
              <div className="break"></div>
              &#125;;
            </div>
            <ul>
              <li> This functional component uses the useState hook to manage a state variable (count)
                 that represents a counter. The component renders a paragraph displaying the current
                count and a button to increment the count when clicked. The use of useState allows
                functional components to maintain state.</li>
              <li>`const [count, setCount] = useState(0);`: Initializes state using the `useState` hook.
                 It declares a state variable `count` and a function `setCount` to update the state.
                The initial state value is set to `0`.</li>  
            </ul>  
          </div>
          <a className="lesson-1-button" href="./lesson-1-3">
            Previous Lesson
          </a>
          <a className="lesson-1-button" href="./lesson-1-5">
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
