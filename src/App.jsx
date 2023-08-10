import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet, Link, redirect } from "react-router-dom";

function App() {
  return (
    <>
      <h1>Quizzical Trivia</h1>
      <p className="description">
        Welcome to a simple 5 question quiz.
      </p>
      
        <Link className='button' to={`quiz/`}>Start Quiz</Link>
        
      
    </>
  )
}

export default App
