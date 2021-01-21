import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.0.4:3333',
});

export const staticAddress = 'http://10.0.0.4:3333/static/'
export default api;