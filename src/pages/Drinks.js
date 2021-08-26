import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from '../components';
import HeaderDrinks from '../components/HeaderDrinks';
import Footer from '../components/Footer';
import * as api from '../services/api';
import './css/Drinks.css';
import AppContext from '../context/AppContext';

const drinksAPI = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const categoriesAPI = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const categoryAPI = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
const DRINKS_LENGTH = 12;
const CATEGORIES_LENGTH = 5;

const Drinks = () => {
  const [categories, setCategories] = useState([]);
  const [categoryEntry, setCategoryEntry] = useState('');
  const [categoryClicked, setCategoryClicked] = useState(false);
  const [lastCategory, setLastCategory] = useState('');
  const { data, setData } = useContext(AppContext);

  useEffect(() => {
    api.getDrinks(drinksAPI, DRINKS_LENGTH, setData);
    api.getDrinks(categoriesAPI, CATEGORIES_LENGTH, setCategories);
  }, []);

  useEffect(() => {
    if (categoryClicked && (categoryEntry !== lastCategory)) {
      if (categoryEntry === 'All') api.getDrinks(drinksAPI, DRINKS_LENGTH, setData);
      else api.getDrinks(`${categoryAPI}${categoryEntry}`, DRINKS_LENGTH, setData);
      setLastCategory(categoryEntry);
    }
    if (categoryClicked && (categoryEntry === lastCategory)) {
      api.getDrinks(drinksAPI, DRINKS_LENGTH, setData);
      setLastCategory('');
    }
    setCategoryClicked(false);
  }, [categoryClicked]);

  const handleCategoryClick = ({ target: { name } }) => {
    setCategoryEntry(name);
    setCategoryClicked(true);
  };

  return (
    <div className="drinks-container">
      <HeaderDrinks title="Bebidas" />
      <div className="drinks-categories-container">
        <Button
          type="button"
          id="All-category-filter"
          className="drinks-categories"
          buttonText="All"
          onClick={ handleCategoryClick }
          isDisable={ false }
        />
        { categories.map((category, index) => (
          <Button
            key={ index }
            type="button"
            id={ `${category.strCategory}-category-filter` }
            className="drinks-categories"
            buttonText={ category.strCategory }
            onClick={ handleCategoryClick }
            isDisable={ false }
          />
        )) }
      </div>
      <div className="drinks-cards-container">
        { data.length
          ? (data.map((drink, index) => (
            <Link
              to={ `bebidas/${drink.idDrink}` }
              key={ drink.idDrink }
              className="drink-card-link"
            >
              <Card
                type="Drink"
                index={ index }
                thumb={ drink.strDrinkThumb }
                name={ drink.strDrink }
                onClick={ handleCategoryClick }
                isDisable={ false }
              />
            </Link>
          ))) : ''}
      </div>
      <Footer />
    </div>
  );
};

export default Drinks;
