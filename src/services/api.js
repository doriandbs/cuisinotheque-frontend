import axios from 'axios';

const api = axios.create({
    baseURL: 'https://cuisinotheque-backend.onrender.com/api/v1', 
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        console.log(token)

        if (token) {
            console.log(token)

            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
