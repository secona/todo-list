import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
    color: white;
  }

  body {
    background-color: #121212;
    margin: 0;
  }
`;
