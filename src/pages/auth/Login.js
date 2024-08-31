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
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
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
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Se Connecter
                </Button>
                <Typography variant="body2" align="center">
                    Vous n'avez pas de compte ? <Link to="/register">S'inscrire</Link>
                </Typography>
            </Box>
        </LoginContainer>
    );
};

export default Login;
