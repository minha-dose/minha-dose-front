import axios from 'axios';

const api = axios.create({
  baseURL: 'https://minha-dose-back-s6ae.onrender.com/', 
});

export default api;