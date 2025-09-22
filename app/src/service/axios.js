import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://luciadiaz.vercel.app/api/v3',
    timeout: 10000,
    withCredentials: true,
})

// Interceptors
// https://luciadiaz.vercel.app/api/v3
// http://localhost:3001/api/v3