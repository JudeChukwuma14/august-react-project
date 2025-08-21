import axios from 'axios';
const API_URL = 'http://localhost:3000/api';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const createUser = async (userData)=>{
    try {
        const response = await api.post("/signup", userData);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error.message);
        throw error;
    }
}