import React from 'react';
import CompilerIframe from '../../CompilerIFrame';
import './Contact.css';

export const Contact = () => {
  return (
    <div className="contact-container">
      <h2 className="compiler-heading">Compiler</h2> {/* Heading with class */}
      <p className="compiler-description">
        This compiler is an excellent tool for practicing and learning ReactJS, JavaScript, and other programming languages. It provides an interactive environment where you can write, run, and test code in real-time. Whether you're working on small snippets or larger projects, this tool can greatly enhance your understanding and proficiency in coding. It's particularly useful for experimenting with new concepts and debugging.
      </p>
      <CompilerIframe 
        src="https://onecompiler.com/#" 
        width="1000" 
        height="600" 
      />
    </div>
  )
}