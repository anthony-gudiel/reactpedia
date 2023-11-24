import './lesson-1-1.css'
import React, { useState, useEffect } from 'react';
import { OPENAI, suggestedOPENAI } from '../../api/openai'

export const LESSON_1_2 = () => {
    const [userInput, setUserInput] = useState('');
    const [apiResponse, setApiResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [apiResponseReady, setApiResponseReady] = useState(false);
    const [showSuggestedQuestions, setShowSuggestedQuestions] = useState(false);
    const [suggestedQuestions, setSuggestedQuestions] = useState([]);
    
  
    const handleInputChange = (event) => {
      setUserInput(event.target.value);
    };
  
    const handleAIResponse = async () => {
      setIsLoading(true);
      const response = await OPENAI(userInput);
      setApiResponse(response);
      const suggestedQuestionsResponse = await suggestedOPENAI(userInput);
      setSuggestedQuestions(suggestedQuestionsResponse);
      setUserInput('');
      setIsLoading(false); 
      setApiResponseReady(true); 
  
    };
  
  return (
    <div className='lesson-1-1'>
        <div className='container'>
            <div className='lessonHeader'>
                <h1> Lesson 1.2 - React Basics: JSX </h1>
            </div>
        </div>
        <div className='lesson-content'>
            <div className='container-2'>
                <div className='what-is-jsx'>
                   <h3> What is JSX? </h3>
                </div>
                <div className='break'></div>
                <div className='jsx-paragraph'>
                    <strong>Definition: </strong> JSX stands for JavaScript XML. It's a syntax extension for JavaScript recommended by React or describing what the UI should look like.
                    <div className='break'></div>
                    <strong>JSX vs HTML: </strong>
                    <div className='break'></div>
                    JSX closely resembles HTML but has some key differences
                    <ul>
                        <li>JSX allows you to include expressions and functions within the syntax</li>
                        <li>HTML only allows for static text</li>
                        <li>JSX is the standard for React applications</li>
                    </ul>
                </div>
                <div className='jsx-syntax-header'>
                    <h3> JSX Syntax </h3>
                </div>
                <div className='jsx-syntax-paragraph'>
                    <strong >Embedding expressions: </strong> In JSX, you can embed JavaScript expressions within curly braces '&#123;...&#125;' like this:
                    <div className='break'></div>
                    <div className='code'>
                        const name = "John";
                        <div className='break'></div>
                        const greeting = &#60;p&#62; Hello, &#123;name&#125;! &#60;/p&#62;
                    </div>
                    <strong>HTML-like Elements: </strong> JSX allows you to write HTML-like elements in your JavaScript code:
                    <div className='break'></div>
                    <div className='code'>
                        const element = &#60;h1&#62;Hello, React! &#60;/h1&#62;;
                    </div>
                    <strong>Creating Components with JSX: </strong>
                    <ul>
                        <li>Components are arguably the most important part of React, and can be considered the building blocks of React applications</li>
                        <li>Components can be created using JSX syntax</li>
                    </ul>
                    <div className='code'>
                        function Greeting(props) &#123;
                        <div className='break'></div>
                        <pre>   return &#60;p&#62; Hello, &#123;props.name&#125;! &#60;/p&#62;;</pre>
                        <div className='break'></div>
                        &#125;
                    </div>
                    <ul>
                        <li>Properties (in this case 'props') can be used to pass data to components. Properties pass information from a parent component to a child component</li>
                        <li> '&#123;props.name&#125;' is an example of how you can access a specific property named 'name'. This assumes that the parent component is passing a property called 'name' like this:</li>
                    </ul>
                    <div className='code'>
                        // Parent Component
                        <div className='break'></div>
                        function App()  &#123;
                        <div className='break'></div>
                        <pre>   return 	&#40;</pre>
                        <div className='break'></div>
                        <pre>       &#60;div&#62;</pre>
                        <div className='break'></div>
                        <pre>           &#123;Greeting name="John" /&#125;</pre>
                        <div className='break'></div>
                        <pre>       &#60;/div&#62;</pre>
                        <div className='break'></div>
                        <pre>   &#41;</pre>
                        <div className='break'></div>
                        &#125;
                    </div>
                    <div className='code'>
                        // Child Component
                        <div className='break'></div>
                        function Greeting (props) &#123;
                        <div className='break'></div>
                        <pre>   return &#60;p&#62;Hello, &#123;props.name&#125; ! &#60;/p&#62;</pre>
                        <div className='break'></div>
                        &#125;
                    </div>
                    In this example, the App component is rendering the 'Greeting' component and
                    passing the 'name' prop with the value 'John'. The 'Greeting' component receives
                    this prop through the 'props' object and uses it in the JSX expression to
                    dynamically display a personalized greeting. The resulting output would be
                    &#60;p&#62;Hello, John! &#60;/p&#62;
                    <div className='break'></div>
                    <strong>Conditional Rendering: </strong> JSX allows you to use JavaScript for
                    conditional rendering, which is the process of displaying different content
                    based on certain conditions or states
                    <div className='code'>
                        function Greeting (&#123;isLoggedIn&#125;) &#123;
                        <div className='break'></div>
                        <pre>   return &#40;</pre>
                        <pre>       &#60;div&#62;</pre>
                        <div className='break'></div>
                        <pre>           &#123;isLoggedIn ? &#60;p&#62; Welcome back! &#60;/p&#62; :&#60;p&#62; Please log in. &#60;/p&#62; &#125;</pre>
                        <div className='break'></div>
                        <pre>       &#60;/div&#62;</pre>
                        <div className='break'></div>
                        <pre>   &#41;</pre>
                        &#125;
                    </div>
                    Here we can see that if the user is logged in, the message
                    'Welcome back!' would be returned, but if not, 'Please log in.' would be returned.
                    <h3>JSX Best Practices: </h3>
                    <div className='break'></div> 
                    <strong>Use parentheses for multi-line JSX:</strong>
                    <ul>
                        <li>It's good practice to wrap JSX elements in parentheses when
                        they extend over multiple lines</li>
                    </ul>
                    <div className='code'>
                        const element = &#40;
                        <div className='break'></div>
                        <pre>   &#60;div&#62;</pre>
                        <div className='break'></div>
                        <pre>       &#60;h1&#62;Hello&#60;/h1&#62;</pre>
                        <div className='break'></div>
                        <pre>       &#60;p&#62;React is awesome!&#60;/p&#62;</pre>
                        <div className='break'></div>
                        <pre>   &#60;/div&#62;</pre>
                        <div className='break'></div>
                        &#41;
                    </div>
                    <strong>One Root Element: </strong> 
                    <ul>
                        <li>JSX expressions must have one outermost root element</li>
                    </ul>
                    <div className='break'></div>
                    <div className='code'>
                        // Valid JSX with one root element
                        <div className='break'></div>
                        const validJSX = &#40;
                        <div className='break'></div>
                        <pre>   &#60;div&#62;</pre>
                        <div className='break'></div>
                        <pre>       &#60;h1&#62;Hello&#60;/h1&#62;</pre>
                        <div className='break'></div>
                        <pre>   &#60;/div&#62;</pre>
                        <div className='break'></div>
                        &#41;
                    </div>
                    <div className='code'>
                        // Inalid JSX with one root element
                        <div className='break'></div>
                        const invalidJSX = &#40;
                        <div className='break'></div>
                        <div className='break'></div>
                        <pre>   &#60;h1&#62;Hello&#60;/h1&#62;</pre>
                        <div className='break'></div>
                        &#41;
                    </div>
                    <div className='parent-explanation'>
                    Do you see the difference? In this first valid example, there is a single &#60;div&#62;
                    that contains all elements, where in the second example, there is no parent element
                    (&#60;div&#62;)
                    </div>
                    <div className='break'></div>
                    Now that you have a good idea about JSX syntax, it's time to do some exercises
                    to put that knowledge to the test!
                    <div className='break'></div>
                    Exercises:
                    <ol>
                        <li> Create a new React component named 'WelcomeMessage' using
                             JSX that displays a welcome message with a user's name passed 
                             as a prop</li>
                        <li>Create another component named 'AlertMessage' that conditionally
                            renders an alert message based on a prop indicating whether or not
                            the alert is active</li>
                        <li>Create a new component called 'MultiLineComponent' with a multi-line
                            output that contains at least three different elements (paragraphs, headings, etc.)</li>
                    </ol>
                    <a className="lesson-1-button" href="./lesson-1-1">Previous Lesson</a>
                    <a className="lesson-1-button" href="./lesson-1-3">Next Lesson</a>
                    <a className="lesson-1-button" href="./lesson-1-2-answers">Check Your Answers</a>
                </div>
            </div>
        </div>
        <input
        type="text"
        className="full-width-button"
        placeholder="Any questions? Type here to ask your AI assistant! &#129302;"
        value={userInput}
        onChange={handleInputChange}
      />
      <button className='ai-submit' onClick={handleAIResponse}>Click to Submit!</button>
      <div className='ai-response'>
        <h3>Response will appear here! :</h3>
        {isLoading ? (
          <div className='code'><div className='loading'>Generating reponse. Please wait a moment...</div></div>
        ) : (
          apiResponse && (
            <div className='code'>
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>{apiResponse}</pre>
            </div>
          )
        )}

      {apiResponseReady && (
        <>
          <button className='suggested-questions-button' onClick={() => setShowSuggestedQuestions(true)}>
            Click Here to See Related Questions
          </button>

          {showSuggestedQuestions && (
            <div className='suggested-questions-modal'>
              <ul>
                  {suggestedQuestions.map((question, index) => (
                    <li key={index}>
                    {question.split('\n').map((line, lineIndex) => (
                    <div key={lineIndex} className='code'>{line}</div>
                  ))}
              </li>
            ))}
              </ul>
              <button onClick={() => setShowSuggestedQuestions(false)}>Close</button>
            </div>
          )}
        </>
      )}
        </div>
    </div>
  )
}
