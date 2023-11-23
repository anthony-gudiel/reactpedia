import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/reactpedia(1).jpg'

export const Header = () => {
  return (
    <div className='header'>
      <div className='header-logo'>
        <img src={logo} alt="Failed to load." />
      </div>
        <div className='links'>
            <Link to='/'> Home </Link>
            <Link to='/quizzes'> Quizzes </Link>
            <Link to='/tutorials'> Tutorials </Link>
            <Link to='/about'> About </Link>
            <Link to='/content'> Content </Link>
            <Link to='/contact'> Contact </Link>
        </div>

    </div>
  )
}