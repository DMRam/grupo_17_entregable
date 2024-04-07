import axios from 'axios';

const axiosInstanceAuth = axios.create({
    baseURL: 'https://grupo-17-418915.uc.r.appspot.com/api',
});

export default axiosInstanceAuth;
