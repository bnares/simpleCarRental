import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { Button } from '@mui/material';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="background"></div>
      <h1 className="light-text">Wypożyczalnia Samochodów</h1>
      <p className="light-text">Witaj w naszej wypożyczalni samochodów. Znajdź idealny samochód dla siebie!</p>

      <div className="cta-buttons">
        
          
          <Button component = {Link} to = "/register" variant="contained" color='error'>REJESTRUJ</Button>
          <Button component = {Link} to = "/login"  variant="contained" color='success'>ZALOGUJ</Button>
          
        
      </div>
    </div>
  );
}

export default HomePage;
