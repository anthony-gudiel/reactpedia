import React from 'react';
import CompilerIframe from '../../CompilerIFrame';
import './compiler.css';

export const Compiler = () => {
  return (
    <div className="compiler-container">
      <h2 className="compiler-heading">Your In-Browser Compiler!</h2> {/* Heading with class */}
      <p className="compiler-description">
        This compiler is an excellent tool for practicing and learning ReactJS, JavaScript, and other programming languages. It provides an interactive environment where you can write, run, and test code in real-time. Whether you're working on small snippets or larger projects, this tool can greatly enhance your understanding and proficiency in coding. It's particularly useful for experimenting with new concepts and debugging.
      </p>
      <div className='frame'>
      <CompilerIframe 
        src="https://onecompiler.com/react" 
        width="1000" 
        height="600" 
      />
      </div>
    </div>
  )
}
