import React from 'react'
import { useAuth } from '../../context/AuthContext'
import agent from '../../api/agent';
import CardCar, { Car } from '../../components/CardCar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


function Dashboard() {
    const [allCars, setAllCars] = React.useState([]);
    const auth = useAuth();
    console.log("in dashboard: ", auth.contextData);
    // if(auth.contextData?.token){
    //   agent.user.allCars(auth.contextData?.token).then((resp)=>setAllCars(resp));
    // }
    
    React.useEffect(()=>{
      if(auth.contextData?.token){
        agent.user.allCars(auth.contextData?.token).then((resp)=>setAllCars(resp));
        
      }
    },[])
    console.log("allCars: ", allCars);
  return (
    <div>
      <div>Dashboard</div>
      <Box sx={{flexGrow:1}}>
        <Grid container spacing={2}>
        {allCars.map((item : Car)=>(<Grid item xs={8} md={4}><CardCar {...item} key={item.id}/></Grid>))}

          
        </Grid>
      </Box>
      
    </div>
    
  )
}

export default Dashboard