import React from 'react'
import './lesson-1-1.css'

export const LESSON_1_2_ANSWERS = () => {
  return (
            <div className='answers'>
                <h3>1.</h3>
                <div className='code'>
                    //WelcomeMessage Component
                    <div className='break'></div>
                    function WelcomeMessage(props) &#123;
                    <div className='break'></div>
                    <pre>   return &#60;p&#62; Welcome &#123;props.name&#125;! &#60;/p&#62;</pre>
                    <div className='break'></div>
                    &#125;
                </div>
                <div className='code'>
                    //Example Usage in Another Component (e.g. App)
                    <div className='break'></div>
                    function App() &#123;
                    <div className='break'></div>
                    <pre>   return &#40;</pre>
                    <div className='break'></div>
                    <pre>       &#60;div&#62;</pre>
                    <div className='break'></div>
                    <pre>           &#60;WelcomeMessage name='John' /&#62;</pre>
                    <div className='break'></div>
                    <pre>       &#60;div&#62;</pre>
                    <div className='break'></div>
                    <pre>   &#41;</pre>
                    <div className='break'></div>
                    &#125;
                </div>
                <div className='break'></div>
                <h3>2.</h3>
                <div className='code'>
                    //AlertMessage Component
                    <div className='break'></div>
                    function AlertMessage(props) &#123;
                    <div className='break'></div>
                    if (props.isActive) &#123;
                    <div className='break'></div>
                    <pre>   return &#60;div className="alert"&#62; Alert! Something important happened! &#60;/div&#62; </pre>
                    <div className='break'></div>
                    <pre>   &#125; else &#123;</pre>
                    <div className='break'></div>
                    <pre>   return null</pre>
                    <div className='break'></div>
                    <pre>   &#125;</pre>
                    <div className='break'></div>
                    &#125;
                </div>
                <div className='code'>
                    //Example Usage in Another Component (e.g. App)
                    <div className='break'></div>
                    function App() &#123;
                    <div className='break'></div>
                    <pre>   return &#40;</pre>
                    <div className='break'></div>
                    <pre>       &#60;div&#62;</pre>
                    <div className='break'></div>
                    <pre>           &#60;AlertMessage isActive=&#123;true&#125; /&#62;</pre>
                    <div className='break'></div>
                    <pre>       &#60;div&#62;</pre>
                    <div className='break'></div>
                    <pre>   &#41;</pre>
                    <div className='break'></div>
                    &#125;
                </div>
                <div className='break'></div>
                <h3>3.</h3>
                <div className='code'>
                    //MultiLineComponent Component
                    <div className='break'></div>
                    function MultiLineComponent()&#123;
                    <div className='break'></div>
                    <pre>   &#60;div&#62;</pre>
                    <div className='break'></div>
                    <pre>       &#60;h2&#62;This is a heading&#60;/h2&#62;</pre>
                    <div className='break'></div>
                    <pre>       &#60;p&#62;This is a paragraph&#60;/p&#62;</pre>
                    <div className='break'></div>
                    <pre>       &#60;ul&#62;</pre>
                    <div className='break'></div>
                    <pre>           &#60;li&#62;List item 1&#60;/li&#62;</pre>
                    <div className='break'></div>
                    <pre>           &#60;li&#62;List item 2&#60;/li&#62;</pre>
                    <div className='break'></div>
                    <pre>           &#60;li&#62;List item 3&#60;/li&#62;</pre>
                    <div className='break'></div>
                    <pre>       &#60;/ul&#62;</pre>
                    <div className='break'></div>
                    <pre>   &#60;/div&#62;</pre>
                    <div className='break'></div>
                    &#125;
                </div>
                <div className='code'>
                    //Example Usage in Another Component (e.g. App)
                    <div className='break'></div>
                    function App() &#123;
                    <div className='break'></div>
                    <pre>   &#60;div&#62;</pre>
                    <div className='break'></div>
                    <pre>       &#60;MultLineComponent /&#62;</pre>
                    <pre>   &#60;div&#62;</pre>
                    <div className='break'></div>
                    &#125;
                </div>
            </div>
  )
}
