import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/reactpedia(1).jpg'

export const Header = () => {
  return (
    <div className='header'>
      <div className='logo-and-title'>
        <div className='header-logo'>
          <img src={logo} alt="Failed to load." />
        </div>
        <div className='header-title'>
        ReactPedia
        </div>
      </div>
      <div className='links'>
        <Link to='/'> Home </Link>
        <Link to='/lesson-1-1'> Lessons </Link>
        <Link to='/quizzes'> Quizzes </Link>
        <Link to='/videos'> Videos </Link>
        <Link to='/compiler'> Compiler </Link>
        <Link to='/about'> About </Link>
      </div>
    </div>
  )
}