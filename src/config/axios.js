import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cfp-api.onrender.com/api/v1',
});

export default api;
