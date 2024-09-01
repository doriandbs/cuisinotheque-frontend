import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import HomeService from '../../services/homeService/HomeService';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button } from '@mui/material';

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
  display: flex;
  flex-direction: column;
  padding: 2rem;
  overflow-y: auto;
  background: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const RecipeTitle = styled.h2`
  color: #343a40;
  font-size: 2rem;
  border-bottom: 2px solid #17a2b8;
  padding-bottom: 0.5rem;
  margin: 0;
`;

const ContentWrapper = styled.div`
  display: flex;
`;

const LeftContent = styled.div`
  width: 60%;
`;

const RightContent = styled.div`
  width: 35%; /* Réduit la largeur pour le slider */
  padding-left: 2rem;
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

const SliderContainer = styled.div`
  width: 200%;
  max-width: 500px;
  margin: 0 auto;
`;

const Image = styled.img`
  width: 200%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

  const handleDownloadPDF = () => {
    if (!selectedRecipe) return;

    const doc = new jsPDF('p', 'mm', 'a4');
    const marginLeft = 20;
    const marginTop = 20;
    const lineHeight = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxTextWidth = pageWidth - marginLeft * 2;

    // Ajouter le titre
    doc.setFontSize(22);
    doc.setFont('Helvetica', 'bold');
    doc.text(selectedRecipe.title, marginLeft, marginTop);

    // Ajouter les ingrédients
    doc.setFontSize(16);
    doc.setFont('Helvetica', 'normal');
    doc.text('Ingrédients', marginLeft, marginTop + 10);

    let yOffset = marginTop + 20;

    selectedRecipe.ingredients.forEach((ingredient, index) => {
      doc.text(`${index + 1}. ${ingredient.ingredient}`, marginLeft, yOffset, { maxWidth: maxTextWidth });
      yOffset += lineHeight;

      if (yOffset > 270) {
        doc.addPage();
        yOffset = marginTop;
      }
    });

    yOffset += 10; 

    doc.setFontSize(16);
    doc.setFont('Helvetica', 'normal');
    doc.text('Instructions', marginLeft, yOffset);

    yOffset += 10;

    selectedRecipe.instructions.forEach((instruction, index) => {
      const splitText = doc.splitTextToSize(`${index + 1}. ${instruction.instruction}`, maxTextWidth);
      doc.text(splitText, marginLeft, yOffset);
      yOffset += lineHeight * splitText.length;

      if (yOffset > 270) {
        doc.addPage();
        yOffset = marginTop;
      }
    });


    const imagesToAdd = selectedRecipe.images.slice(0, 3);

    if (imagesToAdd.length > 0) {
      yOffset += 10;
      doc.setFontSize(16);
      doc.text('Images', marginLeft, yOffset);
      yOffset += 10;

      imagesToAdd.forEach((image, index) => {
        const imgData = `data:image/webp;base64,${image.imageData}`;
        doc.addImage(imgData, 'WEBP', marginLeft + index * 60, yOffset, 50, 50); 
      });
    }

    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Page ${i} of ${totalPages}`, marginLeft, 290, { align: 'left' });
    }

    doc.save(`${selectedRecipe.title}.pdf`);
  };


  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  return (
    <RecipesContainer>
      <RecipeList>
        <h2>Les Recettes</h2>
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
            <Header>
              <RecipeTitle>{selectedRecipe.title}</RecipeTitle>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleDownloadPDF}
              >
                Exporter en PDF
              </Button>
            </Header>
            <ContentWrapper>
              <LeftContent>
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
              </LeftContent>
              <RightContent>
                {selectedRecipe.images && selectedRecipe.images.length > 0 && (
                  <>
                    <SectionTitle>Images</SectionTitle>
                    <SliderContainer>
                      <Slider {...sliderSettings}>
                        {selectedRecipe.images.map((image, index) => (
                          <Image 
                            key={index}
                            src={`data:image/webp;base64,${image.imageData}`} 
                            alt={`Image ${index + 1}`} 
                          />
                        ))}
                      </Slider>
                    </SliderContainer>
                  </>
                )}
              </RightContent>
            </ContentWrapper>
          </>
        ) : (
          <Placeholder>Sélectionnez une recette pour voir les détails</Placeholder>
        )}
      </RecipeDetail>
    </RecipesContainer>
  );
};

export default Recipes;
