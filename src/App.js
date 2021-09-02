import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Explore from './Pages/Explore';
import Login from './Pages/Login';
import FoodMainPage from './Pages/FoodMainPage';
import DrinksExplore from './Pages/DrinksExplore';
import FoodExplore from './Pages/FoodExplore';
import FoodIngredientesExplore from './Pages/FoodIngredientesExplore';
import FoodPlaceExplore from './Pages/FoodPlaceExplore';
import Profile from './Pages/Profile';
import FoodDetails from './Pages/FoodDetails';
import DrinkIngredientesExplore from './Pages/DrinksIngredientExplore';
import DrinkDetails from './Pages/DrinkDetails';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/explorar/comidas/area"
        component={ FoodPlaceExplore }
      />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ FoodIngredientesExplore }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ DrinkIngredientesExplore }
      />
      <Route exact path="/explorar/comidas" component={ FoodExplore } />
      <Route exact path="/explorar/bebidas" component={ DrinksExplore } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/comidas/:id" component={ FoodDetails } />
      <Route exact path="/bebidas/:id" component={ DrinkDetails } />
      <Route exact path="/comidas" component={ FoodMainPage } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
