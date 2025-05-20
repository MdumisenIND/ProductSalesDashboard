import axios from 'axios';
// export const api = axios.create({ baseURL: 'http://localhost:5161/api' }); // proxy in package.json"http://localhost:5161/api";
export const api = axios.create({ baseURL: 'https://localhost:7229/api' }); 