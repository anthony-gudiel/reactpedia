import React from 'react';
import './about.css';

export const About = () => {
    return (
        <div className="aboutContainer">
            <h1>About React-Er</h1>
            <div className='break'></div>
            <p>
                React-Er is dedicated to providing comprehensive, easy-to-understand, 
                and up-to-date tutorials on React.js. Our mission is to empower developers 
                at all levels, from beginners to advanced, to master React and build 
                efficient, modern web applications.
            </p>
            <div className='break'></div>
            <div className="teamSection">
                <h2>Meet the Team Behind ReactPedia</h2>
                    At React-Er, our journey began much like yours - as curious students 
                    with a passion for coding and an eagerness to master React. We remember 
                    the hurdles, the late-night coding sessions, and the thirst for a resource 
                    that could make React not just understandable, but also engaging and fun.
                <div className='break'></div>
                    That's where our paths converged, leading to the creation of ReactPedia. 
                    We are Jashan, Anthony, Clement, and Dean - four developers who transformed 
                    our challenges into a creative solution.
                <div className='break'></div>
                <ul>
                    <li><strong>Jashan</strong>: The Visionary. Jashan's knack for seeing the big 
                        picture and his unwavering commitment to user experience sets the tone for 
                        ReactPedia's user-centric approach.</li>
                    <li><strong>Anthony</strong>: The Code Wizard. Anthony turns complex React 
                        concepts into interactive, easy-to-grasp lessons. His code is not just 
                        functional; it's a work of art.</li>
                    <li><strong>Clement</strong>: The Problem Solver. Clement's ability to unravel 
                        coding puzzles is unmatched. He ensures that ReactPedia's content is accurate 
                        and insightful.</li>
                    <li><strong>Dean</strong>: The Design Guru. Dean's design skills bring ReactPedia 
                        to life. His layouts and interfaces are not just visually appealing; they 
                        enhance learning.</li>
                </ul>
                <div className='break'></div>
                    Together, we have turned ReactPedia into a haven for React learners. Our mission 
                    is simple yet bold: to provide a platform where learning React is no longer 
                    daunting, but a delightful journey. ReactPedia is more than just our creation; 
                    it's our contribution to the React community - a tool we wish we had as students 
                    and are proud to offer as developers.
                <div className='break'></div>
                    Join us in this exciting journey of learning and mastering React. With ReactPedia, 
                    you're not just learning; you're becoming part of a community that grows together.
            </div>
        </div>
    );
}

