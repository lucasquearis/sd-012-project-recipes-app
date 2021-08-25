import React, { useContext, useState } from 'react';
import DrinksAPI from '../service/drinksAPI';
import Buttons from '../components/categoriesButton';
import RecipesContext from '../context/RecipesContext';
import Recipes from '../components/Recipes';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Bebidas() {
  const { drinkCategory, drinkData } = useContext(RecipesContext);
  DrinksAPI();
  const [food] = useState(false);
  console.log(drinkData);
  if (drinkCategory.length > 0) {
    return (
      <div>
        <Header title="Bebidas" />
        <Buttons food={ food } />
        <Recipes food={ food } />
        <Footer />
      </div>
    );
  }
  return <p> Loading... </p>;
}

export default Bebidas;
