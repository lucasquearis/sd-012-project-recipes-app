import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Context from '.';
import fetchAPI from '../services/API';

function Provider({ children }) {
  const [isFetching, setIsFetching] = useState(true);
  const [inputText, setInputText] = useState('');
  const [apiData, setApiData] = useState(null);
  const [radioValue, setRadioValue] = useState('s');
  const requestApiData = useCallback(async (URL) => {
    const searchType = radioValue === 'i' || radioValue === 'c' ? 'filter' : 'search';
    setIsFetching(true);
    setApiData([await fetchAPI(URL, searchType, radioValue, inputText)]);
    setIsFetching(false);
  }, [inputText, radioValue]);

  const contextValue = {
    apiData,
    inputText,
    setInputText,
    setRadioValue,
    isFetching,
    requestApiData,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
