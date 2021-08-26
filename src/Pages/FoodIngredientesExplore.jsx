import React, { useEffect, useState } from 'react';

function FoodIngredientesExplore() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getIngredient = async () => {
      const END_POINT = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
      const response = await fetch(END_POINT);
      const { meals } = await response.json();
      setData(meals);
    };
    getIngredient();
  }, [data]);

  const srcImg = (name) => `https://www.themealdb.com/images/ingredients/${name}-Small.png`;
  const MNumber = '12';
  return (
    <>
      {data
        .filter((_, item) => (item < MNumber))
        .map(({ strIngredient }, index) => (
          <div
            key={ index }
            data-testid={ `${index}-ingredient-card` }
          >
            <img
              src={ srcImg(strIngredient) }
              data-testid={ `${index}-card-img` }
              alt={ strIngredient }
            />
            <div>
              <h4
                data-testid={ `${index}-card-name` }
              >
                { strIngredient }
              </h4>
            </div>
          </div>
        ))}
    </>
  );
}

export default FoodIngredientesExplore;
