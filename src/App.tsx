import React from 'react'
import './App.css'
import Home from './pages/home/Home'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div className='App'>
      <Router>
        <ToastContainer />
        <Home />
      </Router>
    </div>
  )
}

export default App
