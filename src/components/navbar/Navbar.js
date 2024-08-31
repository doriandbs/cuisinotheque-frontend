import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AppBar, Toolbar, Button, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

const NavbarContainer = styled(AppBar)`
  background-color: rgba(0, 0, 0, 0.7);
  box-shadow: none;
  padding: 0 2rem;

  @media (max-width: 600px) {
    padding: 0 1rem; /* Réduire la marge sur mobile */
  }
`;

const Logo = styled.div`
  flex-grow: 1;
  font-size: 1.8rem;
  color: #fff;
  display: flex;
  align-items: center;
  font-family: 'Pacifico', cursive;

  @media (max-width: 600px) {
    font-size: 1.4rem; /* Réduire la taille de la police sur mobile */
  }
`;

const StyledButton = styled(Button)`
  && {
    color: #fff;
    margin-left: 1rem;
    transition: color 0.3s ease, transform 0.3s ease;

    &:hover {
      color: #ffe082;
      transform: scale(1.1);
    }

    @media (max-width: 600px) {
      margin-left: 0.5rem; /* Réduire les marges sur mobile */
      font-size: 0.8rem; /* Réduire la taille des boutons sur mobile */
    }
  }
`;

const UserButton = styled(Button)`
  && {
    color: #fff;
    margin-left: 1rem;
    background-color: #004d40;
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
      background-color: #00695c;
      transform: scale(1.1);
    }

    @media (max-width: 600px) {
      margin-left: 0.5rem; /* Réduire les marges sur mobile */
      font-size: 0.8rem; /* Réduire la taille des boutons sur mobile */
    }
  }
`;

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
 
  return (
    <NavbarContainer position="static">
      <Toolbar>
        <Logo>
          <IconButton component={Link} to="/" edge="start" color="inherit">
            <HomeIcon fontSize="large" />
          </IconButton>
          Cuisinothèque
        </Logo>
        <StyledButton component={Link} to="/allrecipes">
              Toutes les recettes
        </StyledButton>
        {user ? (
          <>
            <StyledButton component={Link} to="/recipes">
              Mes Recettes
            </StyledButton>
            <StyledButton component={Link} to="/profile">
              Profil
            </StyledButton>
            <UserButton onClick={logout}>
              Se Déconnecter
            </UserButton>
          </>
        ) : (
          <>
            <StyledButton component={Link} to="/login">
              Se Connecter
            </StyledButton>
            <StyledButton component={Link} to="/register">
              S'inscrire
            </StyledButton>
          </>
        )}
      </Toolbar>
    </NavbarContainer>
  );
};

export default Navbar;

