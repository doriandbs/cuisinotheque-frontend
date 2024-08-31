import axios from "../api";

const HomeService = {
  scrapeRecipe(url) {
    return axios.get('/recipes/scrape', {
      params: {
        url: url
      }
    });
  },

  createRecipe(recipeDTO) {
    console.log(recipeDTO)
    const token = localStorage.getItem('token');
    console.log(token)
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
