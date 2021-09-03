import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Loading from '../Components/Loading';
import RecipeHeader from '../Components/RecipeHeader';
import RenderRecommendations from '../Components/RenderRecommendations';
import IngredientsAndMeasures from '../Components/IngredientsAndMeasures';
import * as required from '../helper/requiredDetails';
import { setRecipeDetails } from '../Redux/actions/actionSetRecipeDetails';

function DrinkDetails() {
  const [recipe, setRecipe] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [doneRecipe, setDoneRecipe] = useState(true);
  const [progressRecipe, setProgressRecipe] = useState(false);
  const dispatch = useDispatch();

  const { id } = useParams();
  const { push } = useHistory();

  const { consultDrink,
    getMealsRecommendations,
    verificationDoneRecipe,
    verificatioinProgressRecipe } = required;

  useEffect(() => {
    setRecipe(consultDrink(id));
    setRecommendation(getMealsRecommendations());
    setDoneRecipe(verificationDoneRecipe(id));
    setProgressRecipe(verificatioinProgressRecipe(id));
  }, [id, consultDrink,
    getMealsRecommendations,
    verificationDoneRecipe,
    verificatioinProgressRecipe]);

  const handleRedirect = () => {
    dispatch(setRecipeDetails(recipe));
    push(`/bebidas/${id}/in-progress`);
  };

  console.log(recommendation);

  if (recipe.length === 0) {
    return <Loading />;
  }
  return (
    <section>
      <RecipeHeader
        thumb={ recipe.strDrinkThumb }
        title={ recipe.strDrinkThumb }
        category={ recipe.strAlcoholic }
        recipe={ recipe }
        type="bebida"
      />
      <IngredientsAndMeasures
        recipe={ recipe }
      />
      <div>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </div>
      <div>
        <RenderRecommendations
          recommendation={ recommendation }
          key
        />
      </div>
      <div>
        {!doneRecipe && (
          <button
            type="button"
            data-testid="start-recipe-btn"
            onClick={ handleRedirect }
          >
            { progressRecipe ? 'Continuar Receita' : 'Iniciar Receita' }
          </button>
        )}
      </div>
    </section>
  );
}

export default DrinkDetails;