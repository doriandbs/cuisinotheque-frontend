import React, { createContext, useState, useEffect } from 'react';
import axios from '../services/api';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("TOKEENNN", token)
        if (token) {
            axios.get('/account/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des informations utilisateur', error);
                localStorage.removeItem('token');
            })
            .finally(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (credentials) => {
        try {
            const response = await axios.post('/account/login', credentials);
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            setUser(user);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (err) {
            if (err.response?.status === 404) {
                throw new Error('Utilisateur n\'a pas été trouvé');
            }
            throw new Error(err.response?.data?.message || 'Erreur lors de la connexion');
        }
    };

    const register = async (userData) => {
        console.log(userData)
        const response = await axios.post('/account/register', userData);
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        setUser(user);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
