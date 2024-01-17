import React from 'react'
import { useAuth } from '../../context/AuthContext'
import agent from '../../api/agent';
import CardCar, { Car } from '../../components/CardCar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import MainMenu from '../../components/MainMenu';
import ReservationList from '../../components/ReservationList';


function Dashboard() {
    const [allCars, setAllCars] = React.useState([]);
    const [showReservationData, setShowReservationData] = React.useState<boolean>(false);
    const auth = useAuth();
    //console.log("in dashboard: ", auth.contextData);
    // if(auth.contextData?.token){
    //   agent.user.allCars(auth.contextData?.token).then((resp)=>setAllCars(resp));
    // }
    
    React.useEffect(()=>{
      if(auth.contextData?.token){
        agent.user.allCars(auth.contextData?.token).then((resp)=>setAllCars(resp));
        
      }
    },[])
    //console.log("allCars: ", allCars);
  return (
    <div>
      
      <Box sx={{flexGrow:1, marginTop:'20px'}}>
        
        <Grid container spacing={1}>
        <Grid item xs={12}>
          <MainMenu email={auth!.contextData ? auth.contextData.email : ""} setShowTable = {setShowReservationData} showTable = {showReservationData}/>
        </Grid>
          {showReservationData && <Grid item xs={12} > <ReservationList /> </Grid> }
            
          {!showReservationData && allCars.map((item : Car)=>(<Grid item xs={8} md={3} key={item.id} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}><CardCar {...item} key={item.id}/></Grid>))}
          {/* {allCars.map((item : Car)=>(<Grid item xs={8} md={3} key={item.id}><CardCar {...item} key={item.id}/></Grid>))} */}
        </Grid>
      </Box>
      
    </div>
    
  )
}

export default Dashboard