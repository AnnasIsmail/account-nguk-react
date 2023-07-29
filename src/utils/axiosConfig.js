import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'http://localhost:5000/',
  // baseURL: 'https://account-nguk.vercel.app/',
});

export default axiosConfig;
