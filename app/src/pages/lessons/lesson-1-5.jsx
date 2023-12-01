import "./lesson-1-1.css";
import React, { useState } from "react";
import { OPENAI, suggestedOPENAI } from "../../api/openai";

export const LESSON_1_5 = () => {
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
          <h1>Lesson 5 - Lists & Keys in React</h1>
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
            <h3>Objectives</h3>
          </div>
          <div className="break"></div>
          <div className="overview-paragraph">
            <ul>
                <li>Understand how to render lists of data in React.</li>
                <li>Learn about the importance of using keys in React lists.</li>
                <li>Apply knowledge to dynamically render components based on data.</li>
            </ul>
          </div>
          <div className="break"></div>
          <div className="what-is-header">
          <h3>Rendering Lists in React</h3>
          </div>
          <div className="break"></div>
          <div className="what-is-paragraph">
            <ul>
                <li>Definition: Lists in React represent dynamically generated collections of elements, often sourced from arrays, that can be efficiently updated and managed using keys.</li>
                <li>Purpose: Enables the display of dynamic data retrieved from APIs or user input.</li>
            </ul>
            <div className="code">
              const MyList = () =&#62; &#123;
              <div className="break"></div>
              <pre> const items = ['Item 1', 'Item 2', 'Item 3']</pre>
              <div className="break"></div>
              <pre>  return &#40;</pre>
              <div className="break"></div>
              <pre>     &#60;ul&#62;</pre>
              <div className="break"></div>
              <pre>         &#123;items.map&#40;(item, index) =&#62; &#40;</pre>
              <div className="break"></div>
              <pre>             &#60;li key=&#123;index&#125;&#62;&#123;item&#125;&#60;/li&#62;</pre>
              <div className="break"></div>
              <pre>         &#41;&#41;&#125;</pre>
              <div className="break"></div>
              <pre>     &#60;/ul&#62;</pre>
              <div className="break"></div>
              <pre> &#41;;</pre>
              <div className="break"></div>
                &#125;;
            </div>
            <ul>
                <li>First we declare the functional component `MyList`</li>
                <li>Then we create a list named `items`</li>
                <li>In the return statement, &#123;items.map&#40;(item, index) =&#62; &#40; uses the map function to iterate over each element in the `items` array. </li>
                <li> &#60;li key=&#123;index&#125;&#62;&#123;item&#125;&#60;/li&#62; :  For each item in the array, a list item is created. The `key` attribute is set to the `index` of the item, which helps React efficiently update the list when items are added or removed.</li>
            </ul>
          </div>
          <div className="first-app">
            <h3> The Importance of Keys </h3>
            <ul>
                <li>Definition: Keys are special attributes used to uniquely identify and track individual elements within dynamically rendered lists.</li>
                <li>Purpose: Aids React in efficiently updating the user interface.</li>
                <li>Keys help React identify which items have changed, are added, or are removed.</li>
            </ul>
            <div className="code">
              <div className="break"></div>
              const MyList = () =&#62; &#123;
              <div className="break"></div>
              <pre> const items = &#91;</pre>
              <div className="break"></div>
              <pre>   &#123; id: 1, text: 'Item 1' &#125;,</pre>
              <div className="break"></div>
              <pre>   &#123; id: 2, text: 'Item 2' &#125;,</pre>
              <div className="break"></div>
              <pre>   &#123; id: 3, text: 'Item 3' &#125;,</pre>
              <div className="break"></div>
              <pre>   &#93;;</pre>
              <div className="break"></div>
              <pre> return &#40;</pre>
              <div className="break"></div>
              <pre>     &#60;ul&#62;</pre>
              <div className="break"></div>
              <pre>       &#123;items.map&#40;(item) =&#62; &#40;</pre>
              <div className="break"></div>
              <pre>         &#60;li key=&#123;item.id&#125;&#62;&#123;item.text&#125;&#60;/li&#62;</pre>
              <div className="break"></div>
              <pre>       &#41;&#41;&#125;</pre>
              <div className="break"></div>
              <pre>     &#60;/ul&#62;</pre>
              <div className="break"></div>
              <pre>   &#41;;</pre>
              <div className="break"></div>
              <pre> &#125;;</pre>
            </div>
            <ul>
                <li>`const items`: This declares an array called `items`, containing three objects. Each object represents an item with an 'id' and 'text'. This array is used as the data source for rendering the list.</li>
                <li>&#60;li key=&#123;item.id&#125;&#62;&#123;item.text&#125;&#60;/li&#62;: For each item in the array, it creates a list item. The key attribute is set to the 'id' of the item. Using a unique key for each item helps React efficiently update the DOM when the list changes. The content of each is the 'text' property of the item.</li>
                <li> &#123;items.map&#40;(item) =&#62; ... &#41;&#125;: Maps over each item in the items array and generates a corresponding li element for each one.</li>
                <li>Essentially, what we're doing here is generating an unordered list where each list item corresponds to an object in the `items' array. The'id' is used as the key to efficiently manage updates, and the 'text' is displayed as the content of each list item.</li>
            </ul>
            <h3>Dynamic Lists with Components</h3>
            <div className="break"></div>
            <ul>
                <li>Definition: Components can be dynamically rendered within lists.</li>
                <li>Purpose: Encourages reusability and modularity.</li>
            </ul>
            <div className="code">
              <div className="break"></div>
              const MyList = () =&#62; &#123;
              <div className="break"></div>
              <pre> const items = &#91;</pre>
              <div className="break"></div>
              <pre>   &#123; id: 1, text: 'Item 1' &#125;,</pre>
              <div className="break"></div>
              <pre>   &#123; id: 2, text: 'Item 2' &#125;,</pre>
              <div className="break"></div>
              <pre>   &#123; id: 3, text: 'Item 3' &#125;,</pre>
              <div className="break"></div>
              <pre>   &#93;;</pre>
              <div className="break"></div>
              <pre> return &#40;</pre>
              <div className="break"></div>
              <pre>     &#60;ul&#62;</pre>
              <div className="break"></div>
              <pre>       &#123;items.map&#40;(item) =&#62; &#40;</pre>
              <div className="break"></div>
              <pre>         &#60;li key=&#123;item.id&#125;&#62;text=&#123;item.text&#125;&#60;/li&#62;</pre>
              <div className="break"></div>
              <pre>       &#41;&#41;&#125;</pre>
              <div className="break"></div>
              <pre>     &#60;/ul&#62;</pre>
              <div className="break"></div>
              <pre>   &#41;;</pre>
              <div className="break"></div>
              <pre> &#125;;</pre>
              <div className="break"></div>
              const MyListItem = (&#123; item &#125;) =&#62; &#123;
              <div className="break"></div>
              <pre>   return &#60;li&#62;&#123;text&#125;&#60;/li&#62;;</pre>
              <div className="break"></div>
              &#125;;
            </div>
            <ul>
                <li>Although this looks very similar to the last code snippet we just went over, there are some important differences.</li>
                <li>Here, we're using the `MyListItem` component, passing `key` and `text` as props.</li>
                <li>The separate `MyListItem` component is defined to represent each list item. This provides a modular and reusable approach</li>
                <li>We would want to use this reusable version of the code when we may need to use reuse the list items elsewhere.</li>
            </ul>        
          </div>
          <a className="lesson-1-button" href="./lesson-1-4">
            Previous Lesson
          </a>
          <a className="lesson-1-button" href="./lesson-1-6">
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
