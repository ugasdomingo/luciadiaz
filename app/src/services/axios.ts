//Import tools
import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://luciadiaz-api.vercel.app/api/v1',
    withCredentials: true
});
