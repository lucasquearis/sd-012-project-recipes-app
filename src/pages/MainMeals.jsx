import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Header, RecipeList, Footer } from '../components';
import UseInitialRecipes from '../hook/UseInitialRecipes';

function MainMeals() {
  UseInitialRecipes('meals');
  const recipes = useSelector(({ meals }) => meals.recipes);
  const filter = useSelector(({ meals }) => meals.filter);
  console.log(filter);
  if (recipes.meals && recipes.meals.length === 1 && filter === 'searchBar') {
    const mealId = recipes.meals[0].idMeal;
    return <Redirect to={ `/comidas/${mealId}` } />;
  }
  return (
    <div>
      <Header title="Comidas" searchIcon />
      <RecipeList />
      <Footer />
    </div>
  );
}

export default MainMeals;
