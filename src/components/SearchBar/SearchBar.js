import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { actionStoreItems } from '../../actions/index';
import { searchOnClick } from './utils';

const SearchBar = ({ bool }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState({
    textValue: '',
    radioValue: '',
  });

  const [items, setItems] = useState();

  const [redirect, setRedirect] = useState({
    bool: false,
  });

  useEffect(() => {
    const checkItems = () => {
      if (items !== undefined && Object.values(items)[0].length === 1) {
        let pathName;
        if (Object.keys(items)[0] === 'meals') {
          pathName = 'comidas';
        } else {
          pathName = 'bebidas';
        }
        const mealDrink = Object.values(items)[0];
        const mealDrinkDetails = Object.values(mealDrink)[0];
        const mealDrinkIdKey = Object.keys(mealDrinkDetails)[0];
        const mealDrinkId = mealDrinkDetails[mealDrinkIdKey];
        setRedirect({
          bool: true,
          pathName,
          id: mealDrinkId,
        });
      }
    };
    checkItems();
    const saveItemsStore = () => {
      if (items !== undefined) {
        dispatch(actionStoreItems(Object.values(items)[0]));
      }
    };
    saveItemsStore();
  }, [items, dispatch]);

  const handleChange = ({ target: { name, value } }) => {
    setSearch({
      ...search,
      [name]: value,
    });
  };

  if (redirect.bool) {
    return <Redirect to={ `/${redirect.pathName}/${redirect.id}` } />;
  }

  if (bool) {
    return (
      <div>
        <input
          type="text"
          name="textValue"
          data-testid="search-input"
          placeholder="Busque por uma receita"
          onChange={ handleChange }
        />
        <div name="radioValue" onChange={ handleChange }>
          <label htmlFor="ingredients">
            Ingredientes
            <input
              type="radio"
              id="ingredients"
              name="radioValue"
              value="Ingredientes"
              data-testid="ingredient-search-radio"
            />
          </label>
          <label htmlFor="name">
            Nome
            <input
              type="radio"
              id="name"
              name="radioValue"
              value="Nome"
              data-testid="name-search-radio"
            />
          </label>
          <label htmlFor="first-letter">
            Primeira letra
            <input
              type="radio"
              id="first-letter"
              name="radioValue"
              value="Primeira letra"
              data-testid="first-letter-search-radio"
            />
          </label>
        </div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => searchOnClick(search, setItems) }
        >
          Buscar
        </button>
      </div>
    );
  }
  return null;
};

SearchBar.propTypes = {
  bool: PropTypes.bool.isRequired,
};

export default SearchBar;
