import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Routes } from './pages/Routes';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';

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
