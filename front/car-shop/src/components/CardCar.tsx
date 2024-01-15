import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
  return (
    <Card sx={{ maxWidth: 345, backgroundColor:"#92a8d1" }}>
      {}
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
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default CardCar