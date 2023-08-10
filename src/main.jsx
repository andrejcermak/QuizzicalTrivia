import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,
  RouterProvider } from 'react-router-dom';
import Quizz from './Quizz.jsx'
import App from './App.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/quiz/",
    element: <Quizz/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
