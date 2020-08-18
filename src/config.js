import axios from 'axios';

export const host = 'https://www.dashchallengesapi.com/mobileapi';
const adminHost = 'https://www.dashchallengesapi.com/adminapi'

export const mediaHost = 'https://www.dashchallengesapi.com/static/media/';

export const api = axios.create({
  baseURL: `${host}`,
});

// response middleware
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error.message);
    console.log(error.response);
    return Promise.reject(error);
  },
);

export const apiAdmin = axios.create({
  baseURL: `${adminHost}`,
});

// response middleware
apiAdmin.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error.message);
    console.log(error.response);
    return Promise.reject(error);
  },
);
