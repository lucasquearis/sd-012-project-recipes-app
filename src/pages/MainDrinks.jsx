import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Header, RecipeList, Footer, CategoryFilter } from '../components';
import UseInitialRecipes from '../hook/UseInitialRecipes';

function MainDrinks() {
  const filter = useSelector(({ meals }) => meals.filter);
  if (filter !== 'explore') {
    UseInitialRecipes('drinks');
  }
  const recipes = useSelector(({ meals }) => meals.recipes);
  if (recipes.drinks && recipes.drinks.length === 1 && filter === 'searchBar') {
    const drinkId = recipes.drinks[0].idDrink;
    return <Redirect to={ `/bebidas/${drinkId}` } />;
  }
  return (
    <div>
      <Header title="Bebidas" searchIcon />
      <CategoryFilter />
      <RecipeList />
      <Footer />
    </div>
  );
}

export default MainDrinks;
