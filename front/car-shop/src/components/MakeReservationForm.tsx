import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Car } from './CardCar';
import agent from '../api/agent';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type CarFormReservation = {
    carId: number | null,
    dateFrom: string | null,
    dateTo: string | null,
    carShopId: number | null,
}

function MakeReservationForm(props: {open: boolean, setOpen: (value: boolean)=>void, carId: number}) {
    const [carData, setCarData] = React.useState<Car | null>(null);
    const [formData, setFormData] = React.useState<CarFormReservation>({
        carId: props.carId,
        dateFrom: "",
        dateTo:  "",
        carShopId: 1,
    });

    const navigate = useNavigate();
    const auth = useAuth();
    //console.log("carData: ",carData);
    React.useEffect(()=>{
        if(auth.contextData?.token){
            agent.user.car(props.carId,auth.contextData?.token).then((data)=>setCarData(data)).catch((e)=>console.warn(e));
        }else{
            navigate("/not-found");
        }
        
    },[])

    const handleInputChange= (event : any)=>{
        const {name, value} = event.target;
        setFormData({...formData, [name]: value})
    }

    const handleClose = () => {
        props.setOpen(false);
      };

    const handleSubmit = (e : any)=>{
        e.preventDefault();
        setFormData({...formData, carId:props.carId});
        //console.log("formData: ",formData);
        if(auth.contextData?.token){
            agent.user.reserveCar(formData, auth.contextData?.token).then(()=>toast.success("Added Reservation")).catch((e)=>console.warn(e));
           
        }else{
            navigate("/not-found");
        }
        props.setOpen(false);
    }
    //console.log("carId: ",props.carId);

  return (
    <>
         <Dialog
        open={props.open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle> Reserve {carData?.brand} {carData?.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            required
            id="dateFrom"
            name="dateFrom"
            label="From"
            onChange={handleInputChange}
            type="date"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            required
            id="dateTo"
            name="dateTo"
            label="To"
            onChange={handleInputChange}
            type="date"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='contained' color='error'>Cancel</Button>
          <Button type="submit" onClick={handleSubmit} variant='contained' color='success'>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default MakeReservationForm