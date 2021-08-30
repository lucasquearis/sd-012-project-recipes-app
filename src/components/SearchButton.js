import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Context from '../context/Context';

function SearchButton({ name, datatestid }) {
  const {
    filter: { search, type, src },
    RequestAPI,
    setRecipes,
    recipes,
    recipes: { list, loading },
  } = useContext(Context);

  const handleClick = () => {
    RequestAPI();
  };

  const throwAlert = () => {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    setRecipes({ ...recipes, list: [], loading: true });
  };

  return (
    <button
      data-testid={ datatestid }
      onClick={ () => handleClick() }
      type="button"
      disabled={ search === '' || type === '' }
    >
      {!loading
      && src === 'meal'
      && list.meals !== null
      && list.meals.length === 1
      && <Redirect to={ `/comidas/${list.meals[0].idMeal}` } />}
      {!loading
      && src === 'cocktail'
      && list.drinks !== null
      && list.drinks.length === 1
      && <Redirect to={ `/bebidas/${list.drinks[0].idDrink}` } />}
      {!loading
      && (list.drinks === null || list.meals === null)
      && throwAlert()}
      { name }
    </button>
  );
}

SearchButton.propTypes = {
  name: PropTypes.string.isRequired,
  datatestid: PropTypes.string.isRequired,
};

export default SearchButton;