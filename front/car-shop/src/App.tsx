import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './catalog/home/HomePage'
import Login from './catalog/login/Login'
import Register from './catalog/register/Register'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { CssBaseline } from '@mui/material'
import "react-toastify/dist/ReactToastify.css"

function App() {
  

  return (
    <>
      <ToastContainer position='bottom-right' theme='colored' hideProgressBar/>
      <CssBaseline />
      <Outlet />
    </>
  )
}

export default App
