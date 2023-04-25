import axios from 'axios';

export const axiosConfig = () => {
    axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
    axios.defaults.withCredentials = true;
}