import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://10.0.0.4:3333',
    baseURL: 'https://thawing-river-38619.herokuapp.com',
});

// export const staticAddress = 'http://10.0.0.4:3333/static/'
export const staticAddress = 'https://thawing-river-38619.herokuapp.com/static/'
export default api;