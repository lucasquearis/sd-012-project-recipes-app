import React, { useState } from 'react';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteButton() {
  // const { localStorageItems, setLocalStorageItems } = useContext(MyContext);
  const [heart] = useState(whiteHeartIcon);

  const saveLocalStorage = (item) => localStorage
    .setItem('doneRecipes', JSON.stringify([item]));
  //   const recipes = {
  //     id,
  //     type: 'comidas',
  //     area: getRecipe.strArea,
  //     category: getRecipe.strCategory,
  //     alcoholicOrNot: '',
  //     name: getRecipe.strMeal,
  //     image: getRecipe.strMealThumb,
  //   };
  //   localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));

  return (
    <button
      type="button"
      data-testid="favorite-btn"
      onClick={ saveLocalStorage }
    >
      <img src={ heart } alt="Favorite" data-testid="favorite-btn" />
    </button>
  );
}
// teste

export default FavoriteButton;

