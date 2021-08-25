import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CategoryButton from '../components/CategoryButton';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import MyContext from '../context/MyContext';

function Bebidas(props) {
  const { history: { location: { pathname } } } = props;
  const [drinkRecipes, setDrinkRecipes] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const MAX_RECIPES = 12;
  const MAX_CATEGORIES = 5;
  const drinkEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const drinkCategoriesEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  const newDrinkRecipes = (data) => {
    setDrinkRecipes(data);
  };

  const getAllDrinks = () => {
    fetch(drinkEndpoint)
      .then((res) => res.json())
      .then(({ drinks }) => setDrinkRecipes(drinks));
  };

  useEffect(() => {
    getAllDrinks();

    fetch(drinkCategoriesEndpoint)
      .then((res) => res.json())
      .then(({ drinks }) => setDrinkCategories(drinks));
  }, []);

  const handleClick = ({ target }) => {
    if (target.className !== 'clicked') {
      const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target.innerText}`;
      const allFilters = document.getElementsByName('category-filter');

      fetch(URL)
        .then((res) => res.json())
        .then(({ drinks }) => setDrinkRecipes(drinks));

      allFilters.forEach((filter) => { filter.className = ''; });

      target.className = 'clicked';
    } else {
      getAllDrinks();
      target.className = '';
    }
  };

  return (
    <div>
      <MyContext.Provider value={ newDrinkRecipes }>
        <Header titulo="Bebidas" showProfileIcon="sim" pathname={ pathname } />
      </MyContext.Provider>
      { drinkCategories.map(({ strCategory }, index) => {
        if (index < MAX_CATEGORIES) {
          return (
            <CategoryButton
              key={ strCategory }
              strCategory={ strCategory }
              handleClick={ handleClick }
            />
          );
        }
        return null;
      }) }
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ getAllDrinks }
      >
        All
      </button>
      { drinkRecipes.map(({ strDrinkThumb, strDrink, idDrink }, index) => {
        if (index < MAX_RECIPES) {
          return (
            <Link key={ strDrink } to={ `/bebidas/${idDrink}` }>
              <RecipeCard
                key={ strDrink }
                thumb={ strDrinkThumb }
                name={ strDrink }
                index={ index }
              />
            </Link>
          );
        }
        return null;
      }) }
    </div>
  );
}

Bebidas.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
}.isRequired;

export default Bebidas;
