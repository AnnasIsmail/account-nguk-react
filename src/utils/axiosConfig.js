import axios from 'axios';

const axiosConfig = axios.create({
  // baseURL: 'http://localhost:5000/',
  // baseURL: 'http://localhost:5001/account-nguk/us-central1/app',
  // baseURL: 'https://account-nguk-api.annasismail.repl.co/',
  baseURL: 'https://account-nguk.vercel.app/',
});

export default axiosConfig;
