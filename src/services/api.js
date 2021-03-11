//File que cria uma api base em todas as files, facilitando mudanças
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/', 
});
export default api; 