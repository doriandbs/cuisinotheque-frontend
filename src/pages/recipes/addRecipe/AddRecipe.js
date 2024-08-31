import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Typography } from '@mui/material';
import HomeService from '../../../services/homeService/HomeService';


const AddRecipe = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { recipeDTO } = location.state || {};

  const [recipe, setRecipe] = useState(recipeDTO || {
    title: '',
    ingredients: [],
    instructions: []
  });

  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value
    });
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = {
      ...newIngredients[index],
      ingredient: value 
    };
    setRecipe({ ...recipe, ingredients: newIngredients });
  };
  
  const handleInstructionChange = (index, value) => {
    const newInstructions = [...recipe.instructions];
    newInstructions[index] = {
      ...newInstructions[index],
      instruction: value  
    };
    setRecipe({ ...recipe, instructions: newInstructions });
  };
  

  const handleSave = async () => {
    try {
      await HomeService.createRecipe(recipe);
      navigate('/recipes');
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Ajouter une nouvelle recette
      </Typography>
      <TextField
        label="Titre de la recette"
        variant="outlined"
        name="title"
        fullWidth
        margin="normal"
        value={recipe.title}
        onChange={handleChange}
      />
      <Typography variant="h6" gutterBottom>
        Ingrédients
      </Typography>
      {recipe.ingredients.map((ingredient, index) => (
        <TextField
          key={index}
          label={`Ingrédient ${index + 1}`}
          variant="outlined"
          fullWidth
          margin="normal"
          value={ingredient.ingredient}
          onChange={(e) => handleIngredientChange(index, e.target.value)}
        />
      ))}
      <Typography variant="h6" gutterBottom>
        Instructions
      </Typography>
      {recipe.instructions.map((instruction, index) => (
        <TextField
          key={index}
          label={`Instruction ${index + 1}`}
          variant="outlined"
          fullWidth
          margin="normal"
          value={instruction.instruction}
          onChange={(e) => handleInstructionChange(index, e.target.value)}
        />
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        sx={{ marginTop: '2rem' }}
      >
        Enregistrer
      </Button>
    </Box>
  );
};

export default AddRecipe;