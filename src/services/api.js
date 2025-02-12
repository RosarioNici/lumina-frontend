// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Assicurati che questo corrisponda al tuo backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
