import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import Button from './Button';

function ExploreButtons({ type }) {
  const { requestRandomAPI, recipes: { list } } = useContext(Context);
  const history = useHistory();
  const typeFood = () => type === 'foods';
  const redirectButtonArea = () => {
    if (typeFood()) {
      history.push('comidas/area');
    }
  };

  useEffect(() => {
    const drinkOrMeal = [type === 'foods' ? 'meals' : type];
    if (list[drinkOrMeal] !== undefined) {
      const id = list[drinkOrMeal][0][`id${type === 'foods' ? 'Meal' : 'Drink'}`];
      history.push(`/${type === 'foods' ? 'comidas' : 'bebidas'}/${id}`);
    }
  }, [list, type, history]);

  const redirectButtonIngredient = () => {
    if (typeFood()) {
      return history.push('comidas/ingredientes');
    }
    history.push('bebidas/ingredientes');
  };

  const showAreaButton = () => {
    if (typeFood()) {
      return (
        <Button
          datatestid="explore-by-area"
          name="Por Local de Origem"
          onClick={ () => redirectButtonArea() }
        />);
    }
  };

  const handleSurpriseClick = () => {
    const urlType = type === 'foods' ? 'meal' : 'cocktail';
    requestRandomAPI(urlType);
  };

  return (
    <div>
      <Button
        datatestid="explore-by-ingredient"
        name="Por Ingredientes"
        onClick={ () => redirectButtonIngredient() }
      />
      <Button
        datatestid="explore-surprise"
        name="Me Surpreenda!"
        onClick={ () => handleSurpriseClick() }
      />
      {showAreaButton()}
    </div>
  );
}

ExploreButtons.propTypes = {
  type: PropTypes.string.isRequired,
};

export default ExploreButtons;