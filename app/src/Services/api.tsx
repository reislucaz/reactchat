import axios from 'axios';

// Para realizar chamadas para a API, estamos utilizando a biblioteca axios.
// Essa biblioteca é uma alternativa para o fetch API, que é nativo do JavaScript.
// Ela é mais simples de utilizar e possui algumas funcionalidades extras.

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

export const authapi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }
})
