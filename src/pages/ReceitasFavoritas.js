import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';

import Header from '../components/Header/Header';

const formatFoodRecipe = (favoriteRecipe) => ({
  idMeal: favoriteRecipe.id,
  strArea: favoriteRecipe.area,
  strCategory: favoriteRecipe.category,
  strMeal: favoriteRecipe.name,
  strMealThumb: favoriteRecipe.image,
});

const formatDrinkRecipe = (favoriteRecipe) => ({
  idDrink: favoriteRecipe.id,
  strAlcoholic: favoriteRecipe.alcoholic,
  strCategory: favoriteRecipe.category,
  strDrink: favoriteRecipe.name,
  strDrinkThumb: favoriteRecipe.image,
});

const loadFavorites = (setFavoriteRecipes, setFilteredRecipes) => {
  const lastSave = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  setFavoriteRecipes(lastSave);
  setFilteredRecipes(lastSave);
};

export default function ReceitasFavoritas() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  useEffect(() => {
    loadFavorites(setFavoriteRecipes, setFilteredRecipes);
  }, []);
  const loadFavoritesCB = () => loadFavorites(
    setFavoriteRecipes, setFilteredRecipes,
  );
  return (
    <div>
      <Header>Receitas Favoritas</Header>
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => {
          setFilteredRecipes(favoriteRecipes);
        } }
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ () => {
          const filtered = favoriteRecipes.filter((recipe) => recipe.type === 'comida');
          setFilteredRecipes(filtered);
        } }
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => {
          const filtered = favoriteRecipes.filter((recipe) => recipe.type === 'bebida');
          setFilteredRecipes(filtered);
        } }
      >
        Drinks
      </button>
      {filteredRecipes.map((filteredRecipe, index) => {
        if (filteredRecipe.type === 'comida') {
          return (
            <div key={ index }>
              <Link to={ `/comidas/${filteredRecipe.id}` }>
                <h2 data-testid={ `${index}-horizontal-name` }>{filteredRecipe.name}</h2>
              </Link>
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${filteredRecipe.area} - ${filteredRecipe.category}`}
              </p>
              <button
                data-testid={ `${index}-horizontal-share-btn` }
                type="button"
                src="shareIcon"
              >
                Share
              </button>
              <FavoriteButton
                foodOrDrink={ formatFoodRecipe(filteredRecipe) }
                dataTestId={ `${index}-horizontal-favorite-btn` }
                loadFavoritesCB={ loadFavoritesCB }
              />
              <Link to={ `/comidas/${filteredRecipe.id}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ filteredRecipe.image }
                  alt={ filteredRecipe.name }
                />
              </Link>
            </div>
          );
        }
        if (filteredRecipe.type === 'bebida') {
          return (
            <div key={ index }>
              <Link to={ `/bebidas/${filteredRecipe.id}` }>
                <h2 data-testid={ `${index}-horizontal-name` }>{filteredRecipe.name}</h2>
              </Link>
              <p data-testid={ `${index}-horizontal-top-text` }>
                {filteredRecipe.alcoholicOrNot}
              </p>
              <button
                data-testid={ `${index}-horizontal-share-btn` }
                type="button"
                src="shareIcon"
              >
                Share
              </button>
              <FavoriteButton
                foodOrDrink={ formatDrinkRecipe(filteredRecipe) }
                dataTestId={ `${index}-horizontal-favorite-btn` }
                loadFavoritesCB={ loadFavoritesCB }
              />
              <Link to={ `/bebidas/${filteredRecipe.id}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ filteredRecipe.image }
                  alt={ filteredRecipe.name }
                />
              </Link>
            </div>
          );
        }
        return (
          <div key={ index }>Not Found</div>
        );
      })}
    </div>
  );
}
