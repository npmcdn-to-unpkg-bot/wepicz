import axios from 'axios';

axios.interceptors.request.use(function (config) {
  // Do something before request is sent

  if (localStorage.token){
    config.headers.common['Authorization'] = 'Bearer ' + localStorage.token;
  }

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default axios;
