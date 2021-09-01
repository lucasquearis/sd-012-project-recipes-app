import React, { useState, useEffect } from 'react';
import './pageCSS/DrinkProcess.css';
import PropTypes from 'prop-types';
import searchDrinkId from '../services/Header-SearchBar/Drinks/searchDrinkId';
import Loading from '../components/Loading';

export default function DrinkRecipeDetails(props) {
  const { match: { params: { id } } } = props;
  const [resultDrinkRecipe, setResultDrinkRecipe] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  useEffect(() => {
    const resolveAPI = async () => {
      const { drinks } = await searchDrinkId(id);
      setResultDrinkRecipe(drinks);
    };
    resolveAPI();
    const { cocktails } = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: { [id]: [] }, meals: {} };
    setCheckedIngredients([...cocktails[id]]);
  }, [id]);

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: {}, meals: {} };
    const defaultObject = {
      ...getLocalStorage,
      cocktails: { ...getLocalStorage.cocktails,
        [id]: [] },
    };

    if (!getLocalStorage.cocktails[id]) {
      localStorage
        .setItem('inProgressRecipes', JSON
          .stringify(defaultObject));
      return false;
    }
  }, [id]);

  const isIngredientChecked = (comparison) => checkedIngredients
    .some((ingredient) => ingredient === comparison);

  const updateStateFromLocalStorage = () => {
    const { cocktails } = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: { [id]: [] }, meals: {} };
    setCheckedIngredients([...cocktails[id]]);
  };

  const handleClick = ({ target: { name } }) => {
    const getLocalStorage = () => JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: { [id]: [name] }, meals: {} };

    if (!getLocalStorage().cocktails[id]) {
      localStorage
        .setItem('inProgressRecipes', JSON
          .stringify({
            ...getLocalStorage(),
            cocktails: { ...getLocalStorage().cocktails,
              [id]: [name] } }));
      return false;
    }

    const removeIngredient = getLocalStorage().cocktails[id]
      .filter((ingredient) => ingredient !== name);

    const isOnList = getLocalStorage().cocktails[id].includes(name);

    if (!isOnList) {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({
          ...getLocalStorage(),
          cocktails: { ...getLocalStorage().cocktails,
            [id]: [...getLocalStorage().cocktails[id],
              name] } }));
      return false;
    }

    localStorage.setItem('inProgressRecipes', JSON
      .stringify({
        ...getLocalStorage(),
        cocktails: { ...getLocalStorage().cocktails,
          [id]: removeIngredient } }));
  };

  if (resultDrinkRecipe.length > 0) {
    const {
      strDrink,
      strDrinkThumb,
      strAlcoholic,
      strInstructions,
    } = resultDrinkRecipe[0];
    const keysIngredients = Object.keys(resultDrinkRecipe[0]);
    const listIngredients = keysIngredients.filter((item) => item
      .includes('strIngredient'));
    const listMeasures = keysIngredients.filter((item) => item.includes('strMeasure'));
    return (
      <>
        <h1 data-testid="recipe-title">{strDrink}</h1>
        <img data-testid="recipe-photo" src={ strDrinkThumb } alt={ strDrink } />
        <button data-testid="share-btn" type="button">Compartilhar</button>
        <button data-testid="favorite-btn" type="button">Favoritar</button>
        <span data-testid="recipe-category">{strAlcoholic}</span>
        <ul className="progress__checkbox-list">
          {listIngredients.map((ingredient, index) => {
            if (resultDrinkRecipe[0][ingredient]) {
              return (
                <li
                  key={ ingredient }
                  data-testid={ `${index}-ingredient-step` }
                >
                  <label htmlFor={ `${ingredient}-checkbox` }>
                    <input
                      onClick={ handleClick }
                      type="checkbox"
                      id={ `${ingredient}-checkbox` }
                      name={ resultDrinkRecipe[0][ingredient] }
                      checked={ isIngredientChecked(resultDrinkRecipe[0][ingredient]) }
                      onChange={ updateStateFromLocalStorage }
                    />
                    <span>
                      { resultDrinkRecipe[0][ingredient] }
                      {' '}
                      -
                      {' '}
                      {resultDrinkRecipe[0][listMeasures[index]]}
                    </span>
                  </label>
                </li>
              );
            }
            return false;
          })}
        </ul>
        <h2>Instruções:</h2>
        <p data-testid="instructions">{strInstructions}</p>
        <button
          data-testid="finish-recipe-btn"
          type="button"
        >
          Finalizar Receita
        </button>
      </>
    );
  }

  return <Loading />;
}

DrinkRecipeDetails.propTypes = {
  id: PropTypes.number,
}.isRequired;