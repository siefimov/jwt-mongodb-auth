import axios from 'axios';

export const API_URL = 'http://localhost:5000';

const $api = axios.create({
    withCredentials: true, // to ensure that cookies are automaticly attached to each request
    baseURL: API_URL,
});

// attach token to each request
$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

export default $api;
