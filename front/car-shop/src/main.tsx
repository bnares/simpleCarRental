import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import *  as Router  from 'react-router-dom';
import HomePage from './catalog/home/HomePage.tsx';
import Login from './catalog/login/Login.tsx';
import Register from './catalog/register/Register.tsx';
import { router } from './routes/Routes.tsx';
import { ContextProvider } from './context/AuthContext.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(

  <ContextProvider>
  <React.StrictMode>
    <Router.RouterProvider router={router}/>
    {/* <Router.BrowserRouter>
      <Router.Routes>
        <Router.Route path='/' element = {<HomePage />}></Router.Route>
        <Router.Route path='/login' element={<Login />}></Router.Route>
        <Router.Route path='/register' element={<Register />}></Router.Route>
      </Router.Routes>
    </Router.BrowserRouter> */}
    {/* <App /> */}
  </React.StrictMode>
  </ContextProvider>
)
