import axios from "../api";

const HomeService = {
  scrapeRecipe(url) {
    return axios.get('/recipes/scrape', {
      params: {
        url: url
      }
    });
  },
  analyzeRecipeText(recipeText){
    return axios.get(`recipes/openai?message=${encodeURIComponent(recipeText)}`);
  },

  createRecipe(recipeDTO) {
    return axios.post('/recipes/create', recipeDTO);
  },

  getAllRecipes() {
    return axios.get('/recipes/all');
  },

  getMyRecipes() {
    return axios.get('/recipes/mines');
  },
};

export default HomeService;

