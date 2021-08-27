import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import { fetchMeals, fetchMealsCategories } from '../Services/fetchMeals';
import { fetchCocktails, fetchCocktailsCategories } from '../Services/fetchCocktails';

function Provider({ children }) {
  const [userEmail, setUserEmail] = useState('');
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);

  const globalState = {
    email: userEmail,
    meals,
    drinks,
    mealsCategories,
    drinksCategories,
  };

  const contextValue = {
    globalState,
    setUserEmail,
  };

  useEffect(() => {
    const getMealsAndDrinks = async () => {
      const mealsApi = await fetchMeals();
      const drinksApi = await fetchCocktails();
      const mealsCategoriesApi = await fetchMealsCategories();
      const drinksCategoriesApi = await fetchCocktailsCategories();

      setMeals(mealsApi);
      setDrinks(drinksApi);
      setMealsCategories(mealsCategoriesApi);
      setDrinksCategories(drinksCategoriesApi);
    };

    getMealsAndDrinks();
  }, []);

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;