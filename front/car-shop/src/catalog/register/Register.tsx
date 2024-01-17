import React from 'react'
import  "./Register.css"
import *  as Router  from 'react-router-dom';
import { Button, InputAdornment, TextField } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import MailIcon from '@mui/icons-material/Mail';
import agent from '../../api/agent';

function Register() {
    const [data, setData] = React.useState({
      username: "",
      password: "",
      email: ""
    })
    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = Router.useNavigate();
    const [onSuccess, setOnSuccess] = React.useState(false);
    const handleOnChange = (event :any)=>{
      const {name, value} = event.target;
      setData({...data, [name]: value});
    }

    const handleSubmit = (e: any) => {
      e.preventDefault();
      console.log("submit data: ",data);
      agent.auth.register(data).then((data)=>(console.log("response from axios: ",data), setOnSuccess(data==undefined ? false : true))).catch((e)=>(console.warn(e), setOnSuccess(false)));
      console.log("onSuccess: ",onSuccess);
      navigate("/login");
    };

  return (
    <div className='app-container'>
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Rejestrowanie</h2>
            <TextField
              id="input-login"
              name='username'
              label="Login"
              value={data.username} 
              onChange={(e) => handleOnChange(e)}
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
              focused
            />

            <TextField
              id="input-email"
              label="Email"
              name='email'
              value={data.email} 
              onChange={(e) => handleOnChange(e)}
              InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailIcon />
                </InputAdornment>
              ),
              }}

              variant="outlined"
              fullWidth
              style={{marginBottom:'20px'}}
              focused
            />

            <TextField
              id="input-password"
              type={showPassword ? "text" : "password"}
              label="Haslo"
              name='password'
              value={data.password} 
              onChange={(e) => handleOnChange(e)}
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
              focused
            />
            <Button type='submit' variant='contained' color='primary'>REJESTRUJ</Button>
            <div style={{display:'flex', justifyContent:'center', marginTop:'10px'}}>
            <Router.Link to="/login">Logowanie</Router.Link>
            </div>
            
        </form>
    </div>
  )
}

export default Register