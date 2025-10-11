import axios from 'axios';

const api = axios.create({
  baseURL: 'https://minha-dose-express.onrender.com/', 
});

export default api;