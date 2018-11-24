import axios from 'axios';

axios.interceptors.request.use(
  config => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.jwt) {
      config.headers = {
        Authorization: `Bearer ${user.jwt}`,
        Accept: 'application/vnd.api+json',
      };
    }
    return config;
  },
  error => Promise.reject(error)
);
