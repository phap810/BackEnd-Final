import { apiBase } from '@/api/instance';

export const Login = parameter => {
  return apiBase({
    url: '/users/login',
    method: 'post',
    data: parameter
  });
};

export const Logout = parameter => {
  return apiBase({
    url: '/users/logout',
    method: 'post',
    data: parameter
  });
};
