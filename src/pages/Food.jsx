import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MyContext from '../context/MyContext';
import '../css/Card.css';

function Food() {
  const { searchedRecipe, redirectFood } = useContext(MyContext);
  const recipeLimit = 12;

  function searchedFoodRecipes() {
    return (
      <div className="card-section">
        {
          searchedRecipe.filter((food, i) => i < recipeLimit).map((food, i) => (
            <Card
              key={ i }
              data-testid={ `${i}-recipe-card` }
              style={ { width: '10rem' } }
            >
              <Card.Img
                data-testid={ `${i}-card-img` }
                variant="top"
                src={ food.strMealThumb }
              />
              <Card.Body>
                <Card.Title data-testid={ `${i}-card-name` }>{ food.strMeal }</Card.Title>
              </Card.Body>
            </Card>
          ))
        }
      </div>
    );
  }

  return (
    <div>
      <Header />
      { searchedRecipe.length > 1
        ? searchedFoodRecipes() : redirectFood()}
      <Footer />
    </div>
  );
}

export default Food;
