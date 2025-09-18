const axios = require('axios').default;

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
const apiURL = 'http://localhost:1337/api';

const axiosClient = axios.create({
    baseURL: apiURL,
    headers: {
        Authorization: `Bearer ${apiKey}`
    }
})

export default axiosClient;