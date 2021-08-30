import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import './style.css';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="profile">
      <Typography variant="h5" component="h2" data-testid="profile-email">
        { user.email }
      </Typography>
      <Link to="/receitas-feitas">
        <Button
          color="default"
          variant="contained"
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </Button>
      </Link>
      <Link to="/receitas-favoritas">
        <Button
          color="default"
          variant="contained"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </Button>
      </Link>
      <Link to="/">
        <Button
          color="default"
          variant="contained"
          data-testid="profile-logout-btn"
          onClick={ () => localStorage.clear() }
        >
          Sair
        </Button>
      </Link>
    </div>
  );
}

export default Profile;
