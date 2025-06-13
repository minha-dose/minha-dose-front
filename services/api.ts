import axios from 'axios';

const api = axios.create({
  baseURL: 'https://minha-dose-express-copy-nine.vercel.app/', 
});

export default api;
