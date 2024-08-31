import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Typography, Grid, Paper, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeService from '../../../services/homeService/HomeService';

const AddRecipe = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { recipeDTO } = location.state || {};

  const [recipe, setRecipe] = useState(recipeDTO || {
    title: '',
    ingredients: [''],
    instructions: ['']
  });

  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value
    });
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...recipe.instructions];
    newInstructions[index] = value;
    setRecipe({ ...recipe, instructions: newInstructions });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] });
  };

  const removeIngredient = (index) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const addInstruction = () => {
    setRecipe({ ...recipe, instructions: [...recipe.instructions, ''] });
  };

  const removeInstruction = (index) => {
    const newInstructions = recipe.instructions.filter((_, i) => i !== index);
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
      <Paper elevation={3} sx={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
        <Typography variant="h4" gutterBottom align="center">
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
          <Grid container spacing={2} key={index} alignItems="center">
            <Grid item xs={10}>
              <TextField
                label={`Ingrédient ${index + 1}`}
                variant="outlined"
                fullWidth
                margin="normal"
                value={ingredient.ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton onClick={() => removeIngredient(index)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Button
          startIcon={<AddIcon />}
          onClick={addIngredient}
          sx={{ marginTop: '1rem' }}
        >
          Ajouter un ingrédient
        </Button>
        <Typography variant="h6" gutterBottom sx={{ marginTop: '2rem' }}>
          Instructions
        </Typography>
        {recipe.instructions.map((instruction, index) => (
          <Grid container spacing={2} key={index} alignItems="center">
            <Grid item xs={10}>
              <TextField
                label={`Instruction ${index + 1}`}
                variant="outlined"
                fullWidth
                margin="normal"
                value={instruction.instruction}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton onClick={() => removeInstruction(index)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Button
          startIcon={<AddIcon />}
          onClick={addInstruction}
          sx={{ marginTop: '1rem' }}
        >
          Ajouter une instruction
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ marginTop: '2rem', display: 'block', marginLeft: 'auto' }}
        >
          Enregistrer
        </Button>
      </Paper>
    </Box>
    
  );
};

export default AddRecipe;
