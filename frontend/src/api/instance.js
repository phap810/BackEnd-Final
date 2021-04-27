import axios from 'axios';
import config from '@/config';
import { getCookie } from '@/utils/cookie';
import notification from 'ant-design-vue/es/notification';

const API_BASE_URL = config.apiBaseUrl;

const API = axios.create({
  baseURL: API_BASE_URL
});

export const apiBase = options => {
  return new Promise((resolve, reject) => {
    API(options)
      .then(response => {
        resolve(response.data);
      })
      .catch(errors => {
        reject(errors);
      });
  });
};

const err = (error) => {
  const { response } = error;
  if (response) {
    const { data } = response;
    switch (response.status) {
      case 401:
        notification.error({
          message: 'Unauthorized',
          description: 'Authorization verification failed'
        });
        break;
      case 403:
        notification.error({
          message: 'Forbidden',
          description: data.message
        });
        break;
    }
  }
  return Promise.reject(error);
};

API.interceptors.request.use(
  function(config) {
    const TOKEN = getCookie('token');
    return {
      ...config,
      headers: {
        ...(TOKEN && { Authorization: `Bearer ${TOKEN}` })
      }
    };
  },
  err
);

API.interceptors.response.use(
  function(response) {
    return response;
  },
  err
);

