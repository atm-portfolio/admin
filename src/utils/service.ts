import axios from 'axios';

import Storage from './storage';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const apiWithToken = () => {
  return axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      Authorization: `Bearer ${Storage.get('token.admin')}`,
    },
  });
};
