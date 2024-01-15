import React, { ContextType, useState } from 'react';
import "./Login.css"
import * as Router from "react-router-dom";
import { Button, InputAdornment, TextField } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import agent from '../../api/agent';
import { useAuth } from '../../context/AuthContext';
import { AxiosResponse } from 'axios';
const Login = () => {
  const auth = useAuth();
  const navigate = Router.useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [values, setValues] = useState({
    username:'',
    password:''
  })

  function handleInputChange(event: any){
    const {name, value} = event.target;
    setValues({...values, [name]: value})
  }

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log("data: ",values);
    agent.auth.login(values).then((data )=>(
        auth.setContextData(data?.data)
    )).then(()=>(navigate("/dashboard"))).catch((e)=>console.warn(e))
    
  };

  return (
    <div className='app-container'>
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Logowanie</h2>
            <TextField
              id="input-login"
              label="Login"
              value={values.username} 
              name='username'
              onChange={(e) => handleInputChange(e)}
              InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
              }}

              variant="outlined"
              fullWidth
              style={{marginBottom:'20px'}}
            />

            <TextField
              id="input-password"
              type={showPassword ? "text" : "password"}
              label="Haslo"
              value={values.password} 
              name='password'
              onChange={(e) => handleInputChange(e)}
              InputProps={{
              startAdornment: (
                <InputAdornment style={{cursor:'pointer'}} position="start" onClick = {()=>{setShowPassword(!showPassword)}}>
                  <KeyIcon />
                </InputAdornment>
              ),
              }}
              style={{marginBottom:'20px'}}
              variant="outlined"
              fullWidth
            />
            
            
            <Button variant='contained' color='success' type='submit'>ZALOGUJ</Button>
            <div style={{display:'flex', justifyContent:'center', marginTop:'10px'}}>
              <Router.Link to="/register">Rejestrowanie</Router.Link>
            </div>
        </form>
    </div>
    
  );
};

export default Login;
