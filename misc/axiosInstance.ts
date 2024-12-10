import axios, {AxiosInstance} from 'axios';
import '@/misc/envConfig'

const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    withCredentials: true, // necesario para que las cookies se envíen en las peticiones
    withXSRFToken: true
});

export default api;