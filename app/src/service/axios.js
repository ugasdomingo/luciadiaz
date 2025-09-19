import axios from 'axios'

export const api = axios.create({
    baseURL: '/api/v3',
    timeout: 15000,
    withCredentials: true,
})

// Interceptors
// https://luciadiaz-f5cj.vercel.app/api/v3
// http://localhost:3001/api/v3