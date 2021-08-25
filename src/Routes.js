// vitals
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Explorer from './pages/Explorer';
// components
import Login from './pages/Login';
import Profile from './pages/Profile';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      {/* <Route exact path="/comidas" component={ Foods } /> */}
      {/* <Route exact path="/bebidas" component={ Drinks } /> */}
      {/* <Route path="/comidas/:id" component={ OneRecept } /> */}
      <Route path="/explorar" component={ Explorer } />
      <Route path="/profile" component={ Profile } />
    </Switch>
  );
}

export default Routes;
