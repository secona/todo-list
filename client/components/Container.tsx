import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  width: calc(100% - 40px);

  @media only screen and (min-width: 576px) {
    width: 540px;
  }

  @media only screen and (min-width: 768px) {
    width: 720px;
  }

  @media only screen and (min-width: 992px) {
    width: 960px;
  }

  @media only screen and (min-width: 1200px) {
    width: 1140px;
  }

  @media only screen and (min-width: 1400px) {
    width: 1320px;
  }
`;
