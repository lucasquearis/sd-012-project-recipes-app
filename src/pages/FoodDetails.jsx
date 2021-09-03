import React, { useEffect, useState } from 'react';
import '../styles/Details.css';
import { useLocation } from 'react-router-dom';
import RecomendationsDrinks from '../components/RecomendationsDrinks';
import ButtonFoods from '../components/ButtonFoods';
import ShareButton from '../components/ShareButton';
import FavoriteButtonFoods from '../components/FavoriteButtonFoods';

const listIgredientsAndMeasure = (getRecipe, setIngredient, setMeasure) => {
  const lenghtIndredients = 20;
  const itens = [];
  const itensMeasure = [];
  if (getRecipe) {
    for (let i = 1; i < lenghtIndredients; i += 1) {
      itens.push(getRecipe[`strIngredient${i}`]);
      itensMeasure.push(getRecipe[`strMeasure${i}`]);
    }
  }
  setIngredient(itens.filter((it) => it !== null && it !== undefined && it.length >= 1));
  setMeasure(itensMeasure);
};

function FoodDetails() {
  const { pathname } = useLocation();
  const id = pathname.replace(/([^\d])+/gim, '');
  const [getRecipe, setGetRecipe] = useState({});
  const [ingredient, setIngredient] = useState([]);
  const [measure, setMeasure] = useState([]);

  useEffect(() => {
    try {
      const urlFoods = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
      const fetchDetailsRecipe = async () => {
        const request = await fetch(`${urlFoods}${id}`);
        const response = await request.json();
        const resolve = await response.meals[0];
        setGetRecipe(resolve);
      };
      fetchDetailsRecipe();
    } catch (error) {
      console.log(error);
    }
  }, [id, setGetRecipe]);

  useEffect(() => {
    listIgredientsAndMeasure(getRecipe, setIngredient, setMeasure);
  }, [getRecipe]);

  return (
    <div>
      <div>
        <img
          alt="foto da comida"
          data-testid="recipe-photo"
          src={ getRecipe.strMealThumb }
          style={ { width: '10rem' } }
        />
      </div>
      <div>
        <h2 data-testid="recipe-title">{ getRecipe.strMeal }</h2>
        <div className="icons">
          <ShareButton />
          <FavoriteButtonFoods />
        </div>
        <p data-testid="recipe-category">{ getRecipe.strCategory }</p>
      </div>
      <section>
        <h4>Ingredients</h4>
        <ul>
          { ingredient.map((item, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { `${measure[index]} - ${item}` }
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h5>Preparation</h5>
        <p data-testid="instructions">{ getRecipe.strInstructions }</p>
      </section>
      <div>
        <iframe
          width="420"
          height="315"
          src={ `${(getRecipe.strYoutube)}` }
          title="video"
          data-testid="video"
        />
      </div>
      <div className="recomendations">
        <RecomendationsDrinks />
      </div>
      <div>
        <ButtonFoods />
      </div>
    </div>
  );
}

export default FoodDetails;
