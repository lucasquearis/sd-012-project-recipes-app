import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import CategoryFoodButtons from './CategoryFoodButtons';
import FoodSearchBar from './FoodSearchBar';
import { changeShowBar, getFoodsApi } from '../Redux/actions/apiActions';
import mealApi from '../services/GetUrl';

function FoodHeader({ title }) {
  const { showBar, foodSearch: { type, entry } } = useSelector((state) => state.mainPage);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(changeShowBar(!showBar));
    const url = mealApi(type, entry);
    dispatch(getFoodsApi(url));
  };

  if (showBar === false) {
    return (
      <section className="fixing">
        <header className="header-container">
          <Link to="/perfil">
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="profile"
            />
          </Link>
          <h2 data-testid="page-title">{ title }</h2>
          <button
            className="header-button"
            type="button"
            data-testid="search-top-btn"
            onClick={ handleClick }
          >
            <img src={ searchIcon } alt="search icon" />
          </button>
        </header>
        <CategoryFoodButtons />
      </section>
    );
  }

  return (
    <section className="fixing">
      <header className="header-container">
        <Link to="/perfil">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile"
          />
        </Link>
        <h2 data-testid="page-title">{ title }</h2>
        <button
          className="header-button"
          type="button"
          data-testid="search-top-btn"
          onClick={ handleClick }
        >
          <img src={ searchIcon } alt="search icon" />
        </button>
      </header>
      <FoodSearchBar />
    </section>
  );
}

FoodHeader.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default FoodHeader;
