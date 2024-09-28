// const baseurl = 'http://cs.api.yuleng.top'
// const baseurl = 'http://192.168.115.22:38089'
const baseurl = "http://119.29.27.252:38089";

import axios from "axios";

const request = axios.create({
  baseURL: baseurl,
  timeout: 5000,
});

request.interceptors.request.use((config) => {
  if (localStorage.getItem("token")) {
    config.headers.Authorization = "Bearer " + localStorage.getItem("token");
  }
  return config;
});

export default request;
