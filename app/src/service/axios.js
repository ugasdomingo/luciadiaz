import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:3001/api/v3',
    timeout: 10000,
    withCredentials: true,
})