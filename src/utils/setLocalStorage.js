export default function setLocalStorage() {
  const done = [];
  const doneRecipesStorage = JSON.stringify(done);
  localStorage.setItem('doneRecipes', doneRecipesStorage);

  const favorite = [];

  const favoriteRecipesStorage = JSON.stringify(favorite);
  localStorage.setItem('favoriteRecipes', favoriteRecipesStorage);

  const inProgress = {
    cocktails: {},
    meals: {},
  };

  const inProgressStorage = JSON.stringify(inProgress);
  localStorage.setItem('inProgressRecipes', inProgressStorage);
}