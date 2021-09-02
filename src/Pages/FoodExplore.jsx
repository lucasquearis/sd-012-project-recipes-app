import React, { useState, useEffect } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import ButtonCard from '../Components/ButtonCard';

function FoodExplore() {
  const [data, setData] = useState([]);

  const surpriseMe = async () => {
    const END_POINT = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const { meals } = await fetch(END_POINT).then((response) => response.json());
    setData(meals[0]);
  };
  useEffect(() => {
    surpriseMe();
  }, [data]);

  const path = (id) => `/comidas/${id}`;

  return (
    <div>
      <Header title="Comidas" loading />
      <ButtonCard
        page="/explorar/comidas/ingredientes"
        testId="explore-by-ingredient"
        buttonText="Por Ingredientes"
      />
      <ButtonCard
        page="/explorar/comidas/area"
        testId="explore-by-area"
        buttonText="Por Local de Origem"
      />
      <ButtonCard
        page={ path(data.idMeal) }
        testId="explore-surprise"
        buttonText="Me Surpreenda!"
      />
      <Footer />
    </div>
  );
}

export default FoodExplore;