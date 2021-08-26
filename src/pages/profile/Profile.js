import React from 'react';
import HeaderWithoutSearch from '../../components/header/HeaderWithoutSearch';

const Profile = () => {
  const { email } = JSON.parse(localStorage.getItem('user'));
  console.log(email);
  return (
    <div>
      <HeaderWithoutSearch>Perfil</HeaderWithoutSearch>
      <p data-testid="profile-email">{ email }</p>
      <button type="button" data-testid="profile-done-btn">Receitas Feitas</button>
      <button type="button" data-testid="profile-favorite-btn">Receitas Favoritas</button>
      <button type="button" data-testid="profile-logout-btn">Sair</button>
    </div>
  );
};

export default Profile;