import axios from 'axios';

const axiosInstanceAuth = axios.create({
    baseURL: 'https://grupo-17-418915.uc.r.appspot.com/api',
    withCredentials: true, // To include cookies in requests
    headers: {
        'Content-Type': 'application/json',
    }
});

export default axiosInstanceAuth;
