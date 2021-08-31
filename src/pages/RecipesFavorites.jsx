import React, { useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/RecipesFavorites.css';

const clipboardCopy = require('clipboard-copy');

export default function RecipesFavorites() {
  const [copy, setCopy] = useState({ id: '', copied: false });

  function getFavorites() {
    const storedFavorites = JSON
      .parse(localStorage.getItem('favoriteRecipes'));
    return storedFavorites;
  }

  function handleClick(id) {
    const editedFavorites = getFavorites().filter((item) => item.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(editedFavorites));
    const specificCard = `${id}-favorite-card`;
    const favoriteCard = document.getElementById(specificCard);
    favoriteCard.remove();
  }

  function renderArea(item) {
    return (
      <p key={ item.area }>
        { item.area }
      </p>
    );
  }

  function renderAlcoholic(item) {
    return (
      <p key={ item.alcoholicOrNot }>
        { item.alcoholicOrNot }
      </p>
    );
  }

  function copyToClipboard(id, type) {
    const url = window.location.href;
    console.log(url);
    const urlArr = url.split('/');
    const link = urlArr[2];
    clipboardCopy(`http://${link}/${type}s/${id}`);
    setCopy({ id, copied: true });
  }

  function renderFavorites() {
    return getFavorites().map((item, index) => (
      <div key={ item.id } id={ `${item.id}-favorite-card` }>
        <img
          className="recipe-pic"
          key={ item.image }
          src={ item.image }
          alt="favorite recipe"
          data-testid={ `${index}-horizontal-image` }
        />
        <h3 key={ item.name } data-testid={ `${index}-horizontal-name` }>
          { item.name }
        </h3>
        <p key={ item.category } data-testid={ `${index}-horizontal-top-text` }>
          { item.category }
        </p>
        { item.type === 'comida' && renderArea(item) }
        { item.type === 'bebida' && renderAlcoholic(item) }
        <button
          className="share-btn"
          type="button"
          onClick={ () => copyToClipboard(item.id, item.type) }
        >
          <img
            src={ shareIcon }
            alt="share icon"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
        { copy.copied && copy.id === item.id
          ? <div className="copy-div">Link copiado!</div> : <div /> }
        <button
          className="unfavorite-btn"
          type="button"
          onClick={ () => handleClick(item.id) }
        >
          <img
            src={ blackHeartIcon }
            alt="favorited icon"
            data-testid={ `${index}-horizontal-favorite-btn` }
          />
        </button>
      </div>
    ));
  }

  return (
    <main className="favorite-recipes-main">
      <Header title="Receitas Favoritas" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      { renderFavorites() }
    </main>
  );
}
