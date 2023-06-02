import axios, { InternalAxiosRequestConfig } from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables()

const calendarApi = axios.create({
    baseURL: VITE_API_URL
});

//Configurar interceptores, agregando el token en las cabeceras.
calendarApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {

    if (config.headers) {
        config.headers['x-token'] = localStorage.getItem('token');
    }
    return config;
});

export default calendarApi;