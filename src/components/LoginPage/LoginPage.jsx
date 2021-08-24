import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';

const LoginPage = () => {
  const [disabled, setDisabled] = useState(true);

  const {
    user,
    user: { email },
    setEmail,
    password,
    setPassword,
    mealsToken,
    cocktailsToken,
  } = useContext(AppContext);

  useEffect(() => {
    const re = /\w+@\w+.com/.test(email);
    const minimumPasswordLength = 7;
    const validPassword = password.length >= minimumPasswordLength;
    const logicValidation = re && validPassword;
    setDisabled(!logicValidation);
  }, [email, password]);

  const saveLoginInfoLocalStorage = () => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('mealsToken', JSON.stringify(mealsToken));
    localStorage.setItem('cocktailsToken', JSON.stringify(cocktailsToken));
  };

  return (
    <form>
      <label htmlFor="email-input">
        E-mail
        <input
          type="email"
          id="email-input"
          data-testid="email-input"
          name="email"
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="password-input">
        Password
        <input
          type="password"
          id="password-input"
          data-testid="password-input"
          name="password"
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <Link to="/comidas">
        <button
          type="submit"
          disabled={ disabled }
          data-testid="login-submit-btn"
          onClick={ () => saveLoginInfoLocalStorage() }
        >
          Entrar
        </button>
      </Link>
    </form>
  );
};

export default LoginPage;
