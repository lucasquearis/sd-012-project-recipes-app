import React from 'react';
import './App.css';
import logoreceitapp from './images/logoreceitapp.png';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Services/Routes';
import Provider from './Context/AppProvider';

function App() {
  return (
    <Provider>
      <img className="logo" src={ logoreceitapp } alt="Logo da aplicação" />
      <div className="meals">
        {/* <span className="logo">TRYBE</span> */}
        {/* <object
          className="rocksGlass"
          type="image/svg+xml"
          data={ rockGlass }
        >
          Glass
        </object> */}
        <Routes />
      </div>
    </Provider>
  );
}

export default App;
