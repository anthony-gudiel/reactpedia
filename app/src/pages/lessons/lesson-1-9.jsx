import "./lesson-1-1.css";
import React, { useState } from "react";
import { OPENAI, suggestedOPENAI } from "../../api/openai";

export const LESSON_1_9 = () => {
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
          <h1>Lesson 9 - Routing in React</h1>
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
          </div>
        </div>
        <div className="container-2">
          <div className="overview-header">
            <h3>Objectives</h3>
          </div>
          <div className="break"></div>
          <div className="overview-paragraph">
            <ul>
                <li>Understand the concept of routing in a single-page application.</li>
                <li>Learn how to implement routing in React using React Router.</li>
                <li>Explore the usage of `BrowserRouter`, `Route`, `Link`, and `Switch` components.</li>
                <li>Apply routing to create a multi-page-like experience within a React application.</li>
            </ul>
          </div>
          <div className="break"></div>
          <div className="what-is-header">
          <h3>Introduction to Routing & Basics: </h3>
          </div>
          <div className="break"></div>
          <div className="what-is-paragraph">
            <ul>
                <li>In React, routing is the mechanism that allows different components to be displayed
                    based on the current URL. It's crucial for single-page applications, providing a
                    seamless transition between views without the need for a full-page reload.</li>
                <li>React Router simplifies navigation in React applications. It introduces
                    components like `BrowserRouter`, `Route`, `Link`, and `Switch` to manage UI updates based on the URL.</li>
                <li>To install React Router: </li>
            </ul>
            <div className="code">
                npm install react-router-dom
            </div>
            <li>And setup of your routes will look something like this:</li>
            <div className="code">
                import &#123; BrowserRouter as Router, Route, Link, Switch &#125; from 'react-router-dom';
                <div className="break"></div>
                function App() &#123;
                <div className="break"></div>
                <pre>   return &#40;</pre>
                <div className="break"></div>
                <pre>   &#60;Router&#62;</pre>
                <div className="break"></div>
                <pre>       &#123;/* Routes go here */&#125; </pre>
                <div className="break"></div>
                <pre>   &#41;</pre>
                <div className="break"></div>
                &#125;
            </div>
          </div>
          <div className="first-app">
            <h3>Setting up Basic Routing: </h3>
            <ul>
                <li>For this we'll use `BrowserRouter`, `Route`, and `Switch`</li>
                <li>`BrowserRouter` wraps the application, providing routing context.
                    `Route` defines routes and the components to render. `Switch` 
                    ensures only the first matching route is rendered.</li>
            </ul>
            <div className="code">
              <div className="break"></div>
              &#60;Router&#62;
              <div className="break"></div>
              <pre> &#60;Switch&#62;</pre>
              <div className="break"></div>
              <pre>     &#60;Route path="home" component=&#123;Home&#125; /&#62;</pre>
              <div className="break"></div>
              <pre>     &#60;Route path="about" component=&#123;About&#125; /&#62;</pre>
              <div className="break"></div>
              <pre>     &#60;Route path="contact" component=&#123;Contact&#125; /&#62;</pre>
              <div className="break"></div>
              <pre> &#60;/Switch&#62;</pre>
              <div className="break"></div>
              &#60;/Router&#62;
            </div>
            <ul>
                <li>`&#60;Route path="/home" component=&#123;Home&#125; /&#62;`: This line defines a route.
                     It states that if the current URL matches "/home," the Home component will be rendered.</li>
                <li>The same can be said for the about and contact lines.</li>
                <li>The `path`prop in each Route component specifies the URL path that should trigger the
                    rendering of the associated component. If the current URL matches any of these paths,
                    the corresponding component is rendered.</li>
            </ul>
            <h3>Creating Navigation Links: </h3>
            <ul>
                <li>For this, we use the `Link` Component.</li>
                <li>`Link` creates the actual navigation links for the users to click and navigate,
                    where what we just covered only set up the routes.
                </li>
            </ul>
            <div className="code">
                &#60;Link to='/home'&#62;Home&#60;/Link&#62;
              <div className="break"></div>
              &#60;Link to='/about'&#62;About&#60;/Link&#62;
              <div className="break"></div>
              &#60;Link to='/contact'&#62;Contact&#60;/Link&#62;
             </div>
            <ul>
                <li>The `to` prop is a crucial attribute of the `&#60;Link&#62;` component.
                    It specifies the target URL to which the user should be navigated when
                    they click on the link.
                </li>
                <li>The text between the opening and closing `&#60;Link&#62;` tags ("Home," "About," "Contact")
                    represents the visible content of the link. Clicking on this text will trigger 
                    navigation to the specified URL.
                </li>
                <li>&#60;Link to="/url"&#62;url-name&#60;/Link&#62;: This link, when 
                    clicked, will navigate the user to the "/example-url" URL. (In this case, home,
                    about, or contact)</li>
            </ul>
            <h3>Nested Routes: </h3>
            <ul>
                <li>Nested routes allow you to organize your application's components
                    in a hierarchical structure, mirroring the structure of your UI.
                    This organizational pattern is particularly useful when dealing with
                    complex UIs that have sections or pages containing their own sub-sections
                    or sub-pages.  </li>
            </ul>
            <div className="code">
                &#60;Route path='/dashboard' component=&#123;Dashboard&#125;&#62;
                <div className="break"></div>
                <pre>   &#60;Route path='/dashboard/profile' component=&#123;Profile&#125;&#62;</pre>
                <div className="break"></div>
                <pre>   &#60;Route path='/dashboard/settings' component=&#123;Settings&#125;&#62;</pre>
                <div className="break"></div>
                &#60;/Route&#62;
            </div>
            <ul>
                <li>The "Dashboard" route has nested routes for "Profile" and "Settings." When the user
                    navigates to "/dashboard," the `Dashboard` component is rendered, and within it, the
                    nested routes for "Profile" and "Settings" are defined. The `Link` components are used
                    for navigation between different views.</li>
            </ul>
            <h3>Redirects and Navigation Guards: </h3>
            <ul>
                <li>The `Redirect` component is used to navigate a user from one route to another
                    programmatically. This is often done based on certain conditions or user actions. </li>
                <li>This is particularly useful for scenarios where you want to redirect
                    users to another route dynamically, such as after form submissions or
                    authentication checks.</li>
            </ul>
            <div className="code">
                &#60;Route path='/login'&#62;
                <div className="break"></div>
                <pre>   &#123; isLoggedIn ? &#60;Redirect to='/dashboard' /&#62; : &#60;Login /&#62; &#125;</pre>
                <div className="break"></div>
                &#60;/Route&#62;
            </div>
            <ul>
                <li>Here we have a conditional rendering statement inside the `Route` component.</li>
                <li>If `isLoggedIn` is true, then the dashboard is rendered and the user will be redirected
                    to the '/dashboard' route.
                </li>
                <li>If `isLoggedIn` is false, then `Login` component is rendered</li>
            </ul>
            <h3>Best Practices: </h3>
            <ul>
                <li>Group related routes together and use nested routes for hierarchial structures
                    in your application.</li>
                <li>Consider looking into how to lazily load components for routes that may not be
                    needed immediately.</li>
            </ul>
          </div>
          <a className="lesson-1-button" href="./lesson-1-8">
            Previous Lesson
          </a>
          <a className="lesson-1-button" href="./lesson-1-10">
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
