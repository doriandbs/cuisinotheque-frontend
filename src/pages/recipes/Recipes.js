import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import HomeService from '../../services/homeService/HomeService'; 

const RecipesContainer = styled.div`
  display: flex;
  height: 100vh;
  background: linear-gradient(to right, #f8f9fa, #ececec);
  font-family: 'Roboto', sans-serif;
`;

const RecipeList = styled.div`
  width: 30%;
  background-color: #ffffff;
  padding: 1rem;
  overflow-y: auto;
  border-right: 1px solid #dee2e6;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const RecipeListItem = styled.div`
  padding: 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? '#17a2b8' : 'white')};
  color: ${(props) => (props.selected ? 'white' : 'black')};
  border-radius: 8px;
  box-shadow: ${(props) => (props.selected ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none')};
  transition: all 0.3s ease;

  &:hover {
    background-color: #17a2b8;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const RecipeDetail = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 1rem;
`;

const RecipeTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: #343a40;
  font-size: 2rem;
  border-bottom: 2px solid #17a2b8;
  padding-bottom: 0.5rem;
`;

const SectionTitle = styled.h3`
  color: #6c757d;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Ingredient = styled.li`
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  color: #495057;
`;

const Instruction = styled.li`
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  color: #495057;
`;

const Placeholder = styled.p`
  color: #6c757d;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 2rem;
`;

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await HomeService.getMyRecipes();
        setRecipes(response.data);
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
            <SectionTitle>Ingrédients</SectionTitle>
            <ul>
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <Ingredient key={index}>
                  {ingredient.quantity} {ingredient.ingredient}
                </Ingredient>
              ))}
            </ul>
            <SectionTitle>Instructions</SectionTitle>
            <ul>
              {selectedRecipe.instructions.map((instruction, index) => (
                <Instruction key={index}>{instruction.instruction}</Instruction>
              ))}
            </ul>
          </>
          
        ) : (
          <Placeholder>Sélectionnez une recette pour voir les détails</Placeholder>
        )}
      </RecipeDetail>
    </RecipesContainer>
  );
};

export default Recipes;
