import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';
import HomeService from '../../services/homeService/HomeService';
import { AuthContext } from '../../contexts/AuthContext'; 

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), 
              url('/assets/home-background.jpg') no-repeat center center/cover;
  color: #fff;
  text-align: center;

  @media (max-width: 600px) {
    height: auto;
    padding: 2rem 1rem;
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  color: #ffeb3b;
  margin-bottom: 1.5rem;
  font-family: 'Raleway', sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);

  @media (max-width: 600px) {
    font-size: 3rem;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.8rem;
  color: #ffffffcc;
  margin-bottom: 3rem;
  font-family: 'Open Sans', sans-serif;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const StyledTextField = styled(TextField)`
  && {
    margin-bottom: 1rem;
    width: 300px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 5px;

    @media (max-width: 480px) {
      width: 100%;
    }
  }
`;

const StyledButton = styled(Button)`
  && {
    margin-top: 2rem;
    color: #fff;
    background-color: #ff9800;
    &:hover {
      background-color: #ffb74d;
    }

    @media (max-width: 480px) {
      width: 100%;
    }
  }
`;

const MessageContainer = styled.div`
  margin-top: 3rem;
  font-size: 1.5rem;
  color: #ffffffcc;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);

  a {
    color: #ffeb3b;
    text-decoration: underline;
    margin: 0 5px;

    &:hover {
      color: #ffffff;
    }
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const Home = () => {
  const { user } = useContext(AuthContext);  
  const [url, setUrl] = useState('');
  const [recipeText, setRecipeText] = useState(''); 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleScrape = async () => {
    setError('');
    try {
      let response;
      console.log("recipeText", recipeText)
      if (recipeText) {
        response = await HomeService.analyzeRecipeText(recipeText);
      } else if (url) {
        response = await HomeService.scrapeRecipe(url);
      }
      navigate('/addrecipe', { state: { recipeDTO: response.data } });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <HomeContainer>
      <Title>Bienvenue dans votre Cuisinothèque</Title>
      <Subtitle>Votre bibliothèque personnelle de recettes</Subtitle>
      {user ? (
        <>
          <StyledTextField
            label="URL de la recette"
            variant="outlined"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Subtitle>OU</Subtitle>
          <StyledTextField
            label="Collez votre recette ici"
            variant="outlined"
            multiline
            rows={6}
            value={recipeText}
            onChange={(e) => setRecipeText(e.target.value)}
          />
          <StyledButton variant="contained" onClick={handleScrape}>
            Ajouter une recette
          </StyledButton>
          {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
          <StyledButton variant="contained" component={Link} to="/recipes">
            Explorer Mes Recettes
          </StyledButton>
        </>
      ) : (
        <MessageContainer>
          <p>Pour ajouter et explorer vos recettes, vous devez être connecté.</p>
          <p>
            <Link to="/login">Se connecter</Link> ou <Link to="/register">Créer un compte</Link>
          </p>
        </MessageContainer>
      )}
    </HomeContainer>
  );
};

export default Home;
