import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://test-api.atom6studio.com',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
});
