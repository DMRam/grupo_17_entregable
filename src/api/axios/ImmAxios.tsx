import axios from 'axios';

const axios_api = axios.create({
    // baseURL: '${urlToApiCall}',
    baseURL: 'http://localhost:8080/'
});

export default axios_api