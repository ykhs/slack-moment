import axios from 'axios';

export default function({ accessToken }) {
  const instance = axios.create();
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  return instance;
}
