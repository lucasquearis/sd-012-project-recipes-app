const searchDrinksByFirstLetter = async (firstLetter) => {
  const URL_API = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const result = await fetch(URL_API);
  const data = result.json();
  return data;
};

export default searchDrinksByFirstLetter;
