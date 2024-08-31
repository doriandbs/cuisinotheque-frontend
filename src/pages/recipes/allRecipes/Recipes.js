import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import HomeService from '../../services/homeService/HomeService'; 

const RecipesContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const RecipeList = styled.div`
  width: 30%;
  background-color: #f8f9fa;
  padding: 1rem;
  overflow-y: auto;
  border-right: 1px solid #dee2e6;
`;

const RecipeListItem = styled.div`
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? '#007bff' : 'white')};
  color: ${(props) => (props.selected ? 'white' : 'black')};
  border-radius: 4px;

  &:hover {
    background-color: #007bff;
    color: white;
  }
`;

const RecipeDetail = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const RecipeTitle = styled.h2`
  margin-bottom: 1rem;
`;

const Ingredient = styled.li`
  margin-bottom: 0.5rem;
`;

const Instruction = styled.li`
  margin-bottom: 0.5rem;
`;

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await HomeService.getAllRecipes();
        setRecipes(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Erreur lors du chargement des recettes', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
  };
  

  return (
    <RecipesContainer>
      <RecipeList>
        <h2>Mes Recettes</h2>
        {recipes.map((recipe) => (
          <RecipeListItem
            key={recipe.id}
            onClick={() => handleRecipeSelect(recipe)}
            selected={selectedRecipe && selectedRecipe.id === recipe.id}
          >
            {recipe.title}
          </RecipeListItem>
        ))}
      </RecipeList>
      <RecipeDetail>
        {selectedRecipe ? (
          <>
            <RecipeTitle>{selectedRecipe.title}</RecipeTitle>
            <h3>Ingrédients</h3>
            <ul>
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <Ingredient key={index}>
                  {ingredient.quantity} {ingredient.ingredient}
                </Ingredient>
              ))}
            </ul>
            <h3>Instructions</h3>
            <ul>
              {selectedRecipe.instructions.map((instruction, index) => (
                <Instruction key={index}>{instruction.instruction}</Instruction>
              ))}
            </ul>
          </>
        ) : (
          <p>Sélectionnez une recette pour voir les détails</p>
        )}
      </RecipeDetail>
    </RecipesContainer>
  );
};

export default Recipes;
