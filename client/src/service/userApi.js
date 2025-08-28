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

export const LoginUser = async(userData)=>{
    try {
        const response = await api.post("/login", userData)
        return response.data
    } catch (error) {
        console.error(error.message)
    }
}

export const createrSeller = async(sellerData)=>{
     try {
        const response = await api.post("/seller-signup", sellerData);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error.message);
        throw error;
    } 
}

export const sellerLogin = async(sellerData)=>{
    try {
        const response = await api.post("/seller-login", sellerData)
        return response.data
    } catch (error) {
        console.error(error.message)
    }
}
