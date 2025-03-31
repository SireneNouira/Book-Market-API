
import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000/api',
//   headers: {
//     'Accept': 'application/ld+json',
//     'Content-Type': 'application/ld+json'
//   },
// });


const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  // Pas de headers par défaut car ils diffèrent entre endpoints
});


// Intercepteur pour les erreurs API Platform
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.data?.['hydra:description']) {
      error.message = error.response.data['hydra:description'];
    }
    return Promise.reject(error);
  }
);

export default api;