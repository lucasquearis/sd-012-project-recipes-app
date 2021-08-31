export const initialProgressStore = () => {
  localStorage.setItem('inProgressRecipes', JSON.stringify({
    meals: {},
    drinks: {},
  }));
};

export const updateProgressRecipe = (id, ing, type) => {
  const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const recipes = getStorage[type];
  localStorage.setItem('inProgressRecipes', JSON.stringify({
    ...getStorage,
    [type]: { ...recipes, [id]: ing },
  }));
};

export const favoriteRecipes = (props, btnFavorite) => {
  const { drink, meal, thumb, category, alcoholic, id, area, type } = props;
  const recipe = [{
    id,
    type: type === 'comida' || type === 'meals' ? 'comida' : 'bebida',
    area: area || '',
    category: category || '',
    alcoholicOrNot: alcoholic || '',
    name: type === 'comida' || type === 'meals' ? meal : drink,
    image: thumb,
  }];
  const recipesFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (localStorage.favoriteRecipes && recipesFavorite.length > 0) {
    if (!recipesFavorite.some((item) => item.id === id)) {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...recipesFavorite, ...recipe]));
    }
    if (btnFavorite && recipesFavorite.some((item) => item.id === id)) {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...recipesFavorite.filter((item) => item.id !== id)]));
    }
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipe));
  }
};

export const startOrContinue = (callback, id, type) => {
  const data = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (localStorage.inProgressRecipes) {
    if (type === 'bebida') {
      const { drinks } = data;
      callback(Object.keys(drinks).some((item) => +item === +id));
    } else {
      const { meals } = data;
      callback(Object.keys(meals).some((item) => +item === +id));
    }
  }
};