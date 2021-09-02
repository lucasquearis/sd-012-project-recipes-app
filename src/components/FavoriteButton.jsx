import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getFavorite from '../services/getFavorite';
import wIcon from '../images/whiteHeartIcon.svg';
import bIcon from '../images/blackHeartIcon.svg';

const FavoriteChangerHandle = (Recipe, id, type) => {
  const storage = localStorage.getItem('favoriteRecipes');
  const storagejson = JSON.parse(storage);
  const objfavoritmount = {
    id,
    type: type === 'comidas' ? 'comida' : 'bebida',
    area: type === 'comidas' ? Recipe.area : '',
    category: Recipe.category,
    alcoholicOrNot: type === 'bebidas' ? Recipe.type : '',
    name: Recipe.tittle,
    image: Recipe.img,
  };
  if (storagejson) { storagejson.push(objfavoritmount); }
  const storageReturn = storagejson || [objfavoritmount];
  localStorage.setItem('favoriteRecipes', JSON.stringify(storageReturn));
};

const FavoriteRemoverHandle = (ID) => {
  const storage = localStorage.getItem('favoriteRecipes');
  let storagejson = JSON.parse(storage);
  storagejson = storagejson.filter((n) => n.id !== ID);
  localStorage.setItem('favoriteRecipes', JSON.stringify(storagejson));
};

const FavoriteChanger = (itFavoriteOrNot, Recipe, id, type) => {
  if (itFavoriteOrNot) {
    FavoriteRemoverHandle(id);
    return wIcon;
  }
  FavoriteChangerHandle(Recipe, id, type);
  return bIcon;
};

function FavoriteButton(props) {
  const { id, recipe, type } = props;
  const initialfavorite = getFavorite(id);
  const [favorbutton, setfavorite] = useState(initialfavorite ? bIcon : wIcon);

  useEffect(() => {
    setfavorite(getFavorite(id) ? bIcon : wIcon);
  }, [id]);

  return (
    <button
      type="button"
      onClick={ () => {
        setfavorite(FavoriteChanger(getFavorite(id), recipe, id, type));
      } }
    >
      <img data-testid="favorite-btn" src={ favorbutton } alt="white-heart" />
    </button>
  );
}

const { string, shape } = PropTypes;
FavoriteButton.propTypes = {
  type: string.isRequired,
  id: string.isRequired,
  recipe: shape({
    tittle: string.isRequired,
    img: string.isRequired,
    type: string,
    category: string.isRequired,
    Instructions: string.isRequired,
    tag: string.isRequired,
    ingredients: string.isRequired,
    measures: string.isRequired,
  }).isRequired,

};

export default FavoriteButton;