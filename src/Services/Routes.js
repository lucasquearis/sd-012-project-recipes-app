import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Explore from '../Pages/Explore';
import ExploreDrinks from '../Pages/ExploreDrinks';
import ExploreDrinksByIngredients from '../Pages/ExploreDrinksByIngredients';
import ExploreFoods from '../Pages/ExploreFoods';
import ExploreFoodsByIngredient from '../Pages/ExploreFoodsByIngredient';
import ExploreFoodsByOrigin from '../Pages/ExploreFoodsByOrigin';
import FavoriteRecipes from '../Pages/FavoriteRecipes';
import FoodsAndDrinks from '../Pages/FoodsAndDrinks';
import Login from '../Pages/Login';
import MadeRecipes from '../Pages/MadeRecipes';
import Profile from '../Pages/Profile';
import RecipesDetails from '../Pages/RecipesDetails';
import RecipeInProgress from '../Pages/RecipeInProgress';

function Routes() {
  return (
    <Switch>
      <Route exact path="/bebidas" component={ FoodsAndDrinks } />
      <Route
        exact
        path="/bebidas/:recipeID/in-progress"
        render={ (props) => <RecipeInProgress { ...props } type="drink" /> }
      />
      <Route
        exact
        path="/bebidas/:recipeID"
        render={ (props) => <RecipesDetails { ...props } type="drink" /> }
      />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExploreDrinksByIngredients }
      />
      <Route exact path="/explorar/comidas" component={ ExploreFoods } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExploreFoodsByIngredient }
      />
      <Route exact path="/explorar/comidas/area" component={ ExploreFoodsByOrigin } />
      <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      <Route exact path="/comidas" component={ FoodsAndDrinks } />
      <Route
        exact
        path="/comidas/:recipeID/in-progress"
        render={ (props) => <RecipeInProgress { ...props } type="food" /> }
      />
      <Route
        exact
        path="/comidas/:recipeID"
        render={ (props) => <RecipesDetails { ...props } type="food" /> }
      />
      <Route exact path="/" component={ Login } />
      <Route exact path="/receitas-feitas" component={ MadeRecipes } />
      <Route exact path="/perfil" component={ Profile } />
    </Switch>
  );
}

export default Routes;