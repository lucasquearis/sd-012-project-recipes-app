import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ContextApp } from '../../Context/ContextApp';
import RecipeCard from '../RecipeCard';
import './style.css';

function RecipesContainer({ category }) {
  const { recipes } = useContext(ContextApp);
  const number = 12;
  if (!recipes[category]) {
    return <h1>Getting Recipes</h1>;
  }
  return (
    <div className="recipe-container">
      {recipes[category].slice(0, number).map((recipe, index) => (
        <RecipeCard
          key={ index }
          name={ recipe.strMeal || recipe.strDrink }
          image={ recipe.strMealThumb || recipe.strDrinkThumb }
          testId={ `${index}-recipe-card` }
          index={ index }
          id={ recipe.idMeal || recipe.idDrink }
          feedType={ recipe.idMeal ? 'comidas' : 'bebidas' }
        />
      ))}
    </div>
  );
}

RecipesContainer.propTypes = {
  category: PropTypes.string.isRequired,
};

export default RecipesContainer;
