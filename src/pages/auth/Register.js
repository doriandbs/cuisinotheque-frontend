import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const RegisterContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5rem;
  height: 100vh;

    @media (max-width: 600px) {
        margin-top: 2rem; /* Réduit la marge supérieure sur mobile */
        padding: 0 1rem; /* Ajoute du padding pour éviter que le contenu ne touche les bords */
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
            margin-top: 2rem; /* Réduit la marge supérieure sur mobile */
            margin-bottom: 1rem; /* Réduit la marge inférieure sur mobile */
        }
    }
`;

const Register = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(3, 'Au moins 3 caractères')
                .max(20, 'Au plus 20 caractères')
                .required('Requis'),
            email: Yup.string()
                .email('Adresse email invalide')
                .required('Requis'),
            password: Yup.string()
                .min(6, 'Au moins 6 caractères')
                .required('Requis'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
                .required('Requis'),
        }),
        onSubmit: async (values) => {
            setError('');
            try {
                const { username, email, password } = values;
                await register({ username, email, password });
                navigate('/profile');
            } catch (err) {
                setError(err.response?.data?.message || 'Erreur lors de l\'inscription');
            }
        },
    });

    return (
        <RegisterContainer maxWidth="xs">
            <Typography component="h1" variant="h5">
                S'inscrire
            </Typography>
            {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
            <StyledBox component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Nom d'utilisateur"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Adresse Email"
                    name="email"
                    autoComplete="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Mot de Passe"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirmer le Mot de Passe"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
                <StyledButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    S'inscrire
                </StyledButton>
                <Typography variant="body2" align="center">
                    Vous avez déjà un compte ? <Link to="/login">Se Connecter</Link>
                </Typography>
            </StyledBox>
        </RegisterContainer>
    );
};

export default Register;
