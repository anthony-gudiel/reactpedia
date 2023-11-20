import React from 'react'
import './home.css'
import imageSrc from '/src/assets/react-rocket-ship.png';
import { Link } from 'react-router-dom';
export const Home = () => {
  return (
    <div className='Home'>
      <div className='container-1'>
          <div className='landingText'>
            <div className='landingTitle'>
             <h1>Unleash the Power of React.js - Start Learning Today!</h1>
            </div>
            <div className='landingSummary'>
              <p> React.js is a beginner-friendly JavaScript library for building interactive web apps.
              It uses a component based approach for easier development, ensuring faster and smoother 
              user experiences. Join us to create modern, responsive apps today!
              </p>
            </div>
            <a class="custom-button" href="./lesson-1-1">Click Here to Start!</a>
          </div>
          <div className='circular-image'>
            <img src={imageSrc} alt="Failed to load." />
          </div>
          <div className='information-parent'>
            <div className='information-1'>
              <h2> AI Assistance </h2>
              Our website has seamlessly integrated AI assistance to enhance the learning experience for React enthusiasts. Through personalized recommendations, real-time feedback, and interactive exercises, our AI-driven platform guides users on their journey to master React, providing a dynamic and effective learning environment.
            </div>
            <div className='information-2'>
              <h2> Video Library </h2>
              Explore our extensive collection of React tutorial videos! Our website offers a comprehensive library of video tutorials that cover everything from React fundamentals to advanced techniques. Whether you're a beginner or an experienced developer, our video tutorials are designed to help you master React and build impressive web applications with ease. Start learning today with our engaging and informative video content!
            </div>
            <div className='information-3'>
              <h2> In-Browser IDE </h2>
              Experience the convenience of coding with our in-browser Integrated Development Environment IDE. Our application offers a powerful, user-friendly coding environment that allows you to write, test, and debug your code right in your web browser. No need for downloads or installations. Whether you're on a laptop, tablet, or smartphone, our in-browser IDE ensures you have access to your code anytime, anywhere. Enjoy seamless development with our intuitive coding platform!
            </div>
          </div>
        </div>
    </div>
  )
}