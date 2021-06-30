import axios from 'axios';

export const fetchWithToken = axios.create({
  validateStatus(status) {
    return status < 500;
  },
});

fetchWithToken.interceptors.request.use(config => {
  const login = localStorage.getItem('login') || ';';
  const [userId, token] = login.split(';');
  if (!userId || !token) throw new axios.Cancel('ERR_STORED_CREDENTIALS');

  config.url = config.url?.replace(/\:userId/, userId);
  config.headers['authorization'] = `Bearer ${token}`;
  return config;
});
