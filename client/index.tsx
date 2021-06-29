import * as React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Routes } from './pages/Routes';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';

axios.interceptors.request.use(config => {
  const login = localStorage.getItem('login') || ';';
  const [userId, token] = login.split(';');
  if (!userId || !token) throw new axios.Cancel('ERR_STORED_CREDENTIALS');

  config.url = config.url?.replace(/\:userId/, userId);
  config.headers['authorization'] = `Bearer ${token}`;
  return config;
});

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <BrowserRouter>
      <Switch>
        <Routes />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>
);

render(<App />, document.getElementById('root'));
