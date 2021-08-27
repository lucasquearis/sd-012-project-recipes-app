import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchDrinksRedux, fetchMealDetails } from '../redux/actions/foodActions';
import { copyToClipboard, myFavoriteRecipe, getDate, startRecipe } from '../services';
import DrinksCards from './DrinksCard';

function FoodInfo() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details, drinks } = useSelector((state) => state.foodsAndDrinks);
  const [favorite, setFavorite] = useState(false);
  const [button, setButton] = useState('Iniciar Receita');
  const [share, setShare] = useState(false);
  const sixRecomendations = 6;

  const getFoodAndDrinks = useCallback(() => {
    dispatch(fetchMealDetails(id));
    dispatch(fetchDrinksRedux);
  }, [dispatch, id]);

  useEffect(() => {
    getFoodAndDrinks();
  }, [getFoodAndDrinks]);

  const checkRecipeName = useCallback(() => {
    const storage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (storage && details) {
      const storageRecipeName = storage.find(({ name }) => (
        name === details.meals[0].strMeal));
      if (storageRecipeName) {
        setButton('Continuar Receita');
      }
    } else {
      setButton('Iniciar Receita');
    }
  }, [details]);

  useEffect(() => {
    checkRecipeName();
  }, [checkRecipeName]);

  if (!drinks) {
    return (
      <h1>Loading</h1>
    );
  }

  const foodDetails = details.meals[0];
  const objKeyFood = Object.keys(foodDetails);
  const filterObjFood = objKeyFood.filter((obj) => obj.includes('strIngredient'));
  const otherFilterObjFood = filterObjFood.filter((obj) => foodDetails[obj] !== '');

  const favoriteHeart = <img src="/images/blackHeartIcon.svg" alt="black heart" />;
  const notFavoriteHeart = <img src="/images/whiteHeartIcon.svg" alt="white-heart" />;
  const shareTag = <img src="/images/shareIcon.svg" alt="shareIt" />;

  const doneRecipes = {
    id,
    type: 'comida',
    area: foodDetails.strArea,
    category: foodDetails.strCategory,
    alcoholicOrNot: '',
    name: foodDetails.strMeal,
    image: foodDetails.strMealThumb,
    doneDate: getDate(new Date()),
    tags: [foodDetails.strTags],
  };

  const favoriteRecipe = {
    id,
    type: 'comida',
    area: foodDetails.strArea,
    category: foodDetails.strCategory,
    alcoholicOrNot: '',
    name: foodDetails.strMeal,
    image: foodDetails.strMealThumb,
  };

  return (
    <section>
      <img
        src={ foodDetails.strMealThumb }
        alt={ foodDetails.strMeal }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{ foodDetails.strMeal }</h2>
      <button
        onClick={ () => setShare(copyToClipboard) }
        type="button"
        data-testid="share-btn"
      >
        { shareTag }
        <span>{ share ? 'Link copiado!' : '' }</span>
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => setFavorite(myFavoriteRecipe(favoriteRecipe)) }
      >
        { favorite ? favoriteHeart : notFavoriteHeart }
      </button>
      <p data-testid="recipe-category">{ foodDetails.strCategory }</p>
      <ul>
        { otherFilterObjFood.map((ingredient, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            { foodDetails[ingredient] }
          </li>)) }
      </ul>
      <p data-testid="instructions">{ foodDetails.strInstructions }</p>
      <iframe
        data-testid="video"
        width="360"
        height="315"
        src={ foodDetails.strYoutube }
        title={ foodDetails.strMeal }
        allowFullScreen
      />
      <ul />
      <ul>
        { drinks.slice(0, sixRecomendations)
          .map((drink, index) => (
            <li
              key={ index }
              data-testid={ `${index}-recomendation-card` }
            >
              { DrinksCards(drink, 'bebidas', index) }
            </li>))}
      </ul>
      <Link to={ `/comidas/${id}/in-progress` }>
        <button
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => startRecipe(doneRecipes) }
        >
          { button }
        </button>
      </Link>
    </section>
  );
}

export default FoodInfo;
