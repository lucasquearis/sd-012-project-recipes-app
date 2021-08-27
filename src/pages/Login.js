import React, { useState } from 'react';
import { func, number, string, objectOf, oneOfType, object } from 'prop-types';
import { useDispatch } from 'react-redux';
import { loginAction } from '../redux/actions/mainActions';
import useLocalStorage from '../helpers/useLocalStorage';
import Input from '../components/Input';

function Login(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mealsToken, setMealsToken] = useLocalStorage('mealsToken', '1');
  const [cocktailsToken, setCocktailsToken] = useLocalStorage('cocktailsToken', '1');
  const [userToken, setUserToken] = useLocalStorage('user', '');
  const { history } = props;

  function validateEmail(eMail) {
    const re = /\S+@\S+\.\S+/;
    return re.test(eMail);
  }

  const isEligible = () => {
    const seven = 7;
    const isPswEligible = password.length >= seven;
    const isEmailEligible = validateEmail(email);
    if (isEmailEligible && isPswEligible) return true;
    return false;
  };

  const submitLogin = (e) => {
    const consoleTest = `${mealsToken}, ${cocktailsToken}, ${userToken}`;
    const userEmail = email;
    e.preventDefault();
    dispatch(loginAction(email));
    setMealsToken(1);
    setCocktailsToken(1);
    setUserToken({ email: userEmail });
    console.log(consoleTest);
    return history.push('/comidas');
  };

  return (
    <div className="login__page">
      <Input
        type="text"
        text="Email: "
        value={ email }
        onChange={ (e) => setEmail(e.target.value) }
        dataTestId="email-input"
        id="email"
      />
      <Input
        type="password"
        text="Senha: "
        value={ password }
        onChange={ (e) => setPassword(e.target.value) }
        dataTestId="password-input"
        id="password"
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ !isEligible() }
        onClick={ (e) => submitLogin(e) }
      >
        Entrar
      </button>
    </div>
  );
}

Login.propTypes = {
  history: objectOf(oneOfType([func, string, number, object])).isRequired,
};

export default Login;