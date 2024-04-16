import axios from 'axios';

const axios_api = axios.create({
    // baseURL: 'https://grupo-17-418915.uc.r.appspot.com/',
    baseURL: 'http://localhost:8080/'
});

export default axios_api