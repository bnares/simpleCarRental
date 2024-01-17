import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MakeReservationForm from './MakeReservationForm';

export type Car = {
  id: number,
  name: string,
  brand: string,
  productionYear: number,
  odometer: number,
  horsePower: number,
  price: number,
  isRented: boolean,
  pictureName: string,
  carShopId: number,
  carShop: {} | null,
}

function CardCar({ id, name, brand, productionYear,odometer, horsePower, price, isRented, pictureName, carShopId,carShop}:Car) {
  const [openReserveForm, setOpenReserveForm] = React.useState<boolean>(false);

  return (
    <>
    {openReserveForm && <MakeReservationForm open = {openReserveForm} setOpen={setOpenReserveForm} carId={id} />}
    <Card sx={{ maxWidth: 245, backgroundColor:"#92a8d1", marginTop:"40px" }}>
      
      <CardMedia
        sx={{ height: 140 }}
        image="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600"
        title={brand}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {brand}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <p style={{fontWeight:"bold", marginTop:'3px', marginBottom:'3px'}}>Name: {name}</p>
          <p style={{fontWeight:"bold", marginTop:'3px', marginBottom:'3px'}}>Odometer: {odometer}km</p>
          <p style={{fontWeight:"bold", marginTop:'3px', marginBottom:'3px'}}>Production Year: {productionYear}</p>
          <p style={{fontWeight:"bold", marginTop:'3px', marginBottom:'3px'}}>Horse Power: {horsePower}</p>
          <p style={{color:'red', fontSize:"1.5rem", marginTop:'3px', marginBottom:'3px'}}>Price: ${price}</p>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>setOpenReserveForm(true)}>Reserve</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </>
  )
}

export default CardCar