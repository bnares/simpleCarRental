import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Tooltip from '@mui/material/Tooltip';
import ReservationList from './ReservationList';

function MainMenu(props: {email: string, setShowTable: (value:boolean)=>void, showTable: boolean}) {
    const auth = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const matches = useMediaQuery('(min-width:600px)');
    const logout = ()=>{
        auth.setContextData({email:null, token:null, name:null});
        localStorage.clear();
        navigate("/login");
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="fixed">
      <Toolbar sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        {matches ? 
          <Box display="flex" alignItems='center'>
          <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
          {props.email}
          </Typography>
          </Box>
        : null}
        
        
        <Box display="flex" alignItems='center' sx={{paddingRight:'50px'}}>
            <Tooltip title="Show/Hide Reservations">
              <IconButton
                size="small"
                color="inherit"
                edge="end"
                sx={{display:'flex', justifyContent:'center'}}
                onClick={()=>props.setShowTable(!props.showTable)}
              >
                <TimeToLeaveIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
              <IconButton
            
                size="small"
                color="inherit"
                edge="end"
                sx={{display:'flex', justifyContent:'center'}}
                onClick={logout}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default MainMenu