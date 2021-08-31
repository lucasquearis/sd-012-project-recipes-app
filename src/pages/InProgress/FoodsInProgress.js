import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router';

const id = 52771;
const INITIAL_STATE = { cocktails: {}, meals: { [id]: [] } };

function FoodsInProgress() {
  const [recipeFood, setRecipeFood] = useState([{}]);
  // const { location: { id } } = useHistory();
  // console.log(id);

  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [inProgress, setInProgress] = useState(INITIAL_STATE); // array de ingredientes que vão sendo checados
  if (!localStorage.inProgressRecipes) {
    localStorage.setItem('inProgressRecipes', JSON.stringify(INITIAL_STATE));
  }
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const getRecipeFood = async () => {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`; // alterar Id depois p ser dinâmico
      // const endpoint = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771'; // alterar Id depois p ser dinâmico
      const { meals } = await fetch(endpoint).then((data) => data.json());
      setRecipeFood(meals);
    };
    getRecipeFood();
    // console.log(recipeFood);
  }, []);

  useEffect(() => {
    const ingredientsList = () => {
      const keys = Object.keys(recipeFood[0])
        .filter((item) => item.includes('strIngredient'));
      const ingredientNotEmpty = keys
        .filter((item) => recipeFood[0][item] !== ''
          && recipeFood[0][item] !== null);
      const ingredientList = ingredientNotEmpty.map((key) => recipeFood[0][key]);
      setIngredients(ingredientList);
      // console.log(recipeFood);
      // console.log(ingredientList.length);

      const keyMeasure = Object.keys(recipeFood[0])
        .filter((item) => item.includes('strMeasure'));
      const measureNoEmpty = keyMeasure
        .filter((item) => recipeFood[0][item] !== '' && recipeFood[0][item] !== null);
      const measureList = measureNoEmpty.map((kMeasure) => recipeFood[0][kMeasure]);
      setMeasure(measureList);
    };
    ingredientsList();
  }, [recipeFood]);

  // Requisito 50 - o número '52771' é só enquanto n tivermos o id
  const checkItem = (ingredient) => {
    const ingredientsArray = inProgress.meals[id];
    if (!ingredientsArray) { // lógica p qd add o primeiro ingredient
      const estado = {
        meals: {
          [id]: ingredient,
        },
      };
      setInProgress(estado);
      localStorage.setItem('inProgressRecipes', JSON.stringify(estado));
    } else {
      const alreadyExist = ingredientsArray.some((item) => item === ingredient);
      if (alreadyExist) { // lógica p qd tem q retirar
        const newIngredients = ingredientsArray.filter((item) => item !== ingredient);
        const estado2 = {
          meals: {
            [id]: newIngredients,
          },
        };
        setInProgress(estado2);
        localStorage.setItem('inProgressRecipes', JSON.stringify(estado2));
      } else { // lógica para acrescentar do 2 p frente de ingredientes.
        const estado3 = {
          meals: {
            [id]: [...inProgress.meals[id], ingredient],
          },
        };
        setInProgress(estado3);
        localStorage.setItem('inProgressRecipes', JSON.stringify(estado3));
      }
    }
  };

  useEffect(() => {
    const LS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setInProgress({ ...LS });
  }, []);

  const handleCheked = (ingredient) => (inProgress.meals[id].includes(ingredient));

  useEffect(() => {
    if (inProgress.meals[id].length !== ingredients.length || ingredients.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [inProgress, ingredients]);

  const { strMealThumb, strMeal, strCategory, strInstructions } = recipeFood[0];

  return (
    <div className="food-in-progress">
      <p>Page FoodsRecipeInProgress</p>
      <img data-testid="recipe-photo" alt="recipe" src={ strMealThumb } />
      <h1 data-testid="recipe-title">{ strMeal }</h1>
      <h4 data-testid="recipe-category">{ strCategory }</h4>
      <button data-testid="share-btn" type="button">btn compartilhar</button>
      <button data-testid="favorite-btn" type="button">btn favoritar</button>
      <div className="indredients">
        <h3>Ingredientes</h3>

        {
          ingredients.map((ingredient, index) => (
            <div key={ index } data-testid={ `${index}-ingredient-step` }>
              <label htmlFor={ `${ingredient}` }>
                <input
                  type="checkbox"
                  id={ `${ingredient}` }
                  value={ `${ingredient}` }
                  onChange={ () => checkItem(ingredient) }
                  defaultChecked={ handleCheked(ingredient) }
                />
                { `${measure[index]} ${ingredient}` }
              </label>
            </div>
          ))
        }
      </div>

      <h3>Instruções</h3>
      <p data-testid="instructions">{ strInstructions }</p>

      <Link to="/receitas-feitas">
        <button
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ disabled }
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}

export default FoodsInProgress;
