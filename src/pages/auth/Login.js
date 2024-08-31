import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';

const LoginContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5rem;
  height: 100vh;

    @media (max-width: 600px) {
        margin-top: 2rem; /* Réduit la marge supérieure sur les petits écrans */
        padding: 0 1rem; /* Ajoute du padding latéral pour éviter que le contenu ne touche les bords */
    }
`;

const StyledBox = styled(Box)`
    width: 100%;
    
    @media (max-width: 600px) {
        padding: 0.5rem; /* Réduit le padding interne sur les petits écrans */
    }
`;

const StyledButton = styled(Button)`
    && {
        margin-top: 3rem;
        margin-bottom: 2rem;

        @media (max-width: 600px) {
            margin-top: 2rem; /* Réduit la marge supérieure pour le bouton sur mobile */
            margin-bottom: 1rem; /* Réduit la marge inférieure pour le bouton sur mobile */
        }
    }
`;
const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(credentials);
            navigate('/');  
        } catch (err) {
            setError(err.message || 'Erreur lors de la connexion');
        }
    };

    return (
        <LoginContainer maxWidth="xs">
            <Typography component="h1" variant="h5">
                Se Connecter
            </Typography>
            {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
            <StyledBox component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Adresse Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={credentials.email}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Mot de Passe"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={credentials.password}
                    onChange={handleChange}
                />
                <StyledButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Se Connecter
                </StyledButton>
                <Typography variant="body2" align="center">
                    Vous n'avez pas de compte ? <Link to="/register">S'inscrire</Link>
                </Typography>
            </StyledBox>
        </LoginContainer>
    );
};

export default Login;