const baseurl = 'http://api.yuleng.top:38089'

import axios from "axios"

const request = axios.create({
    baseURL: baseurl,
    timeout: 5000
})

request.interceptors.request.use(config => {
    if (localStorage.getItem('token')) {
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    }
    return config;
})

export default request;
