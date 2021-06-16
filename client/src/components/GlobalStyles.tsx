import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

  * {
    font-family: Poppins, sans-serif;
    color: white;
  }

  body {
    background-color: #263238;
  }
`;
