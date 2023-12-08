import axios from 'axios';

const AxiosClient = axios.create({
    baseURL:`http://localhost:8000/api`
});

AxiosClient.interceptors.request.use((config)=>{
    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = `${localStorage.getItem('TOKEN')}`;
    return config;
});

AxiosClient.interceptors.response.use((response)=>{
    return response;
},error=>{
    if(error.response && error.response.status === 401){
        localStorage.removeItem('TOKEN');
        return error;
    }
    throw error;
});

export default AxiosClient;