import * as React from 'react';
import styled from 'styled-components';
import { Button } from '../../../components/Button';

const WrapperDiv = styled.div`
  padding: 2rem 0;
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;

  h1 {
    flex-grow: 1;
    margin: 0;
    padding: 0;
  }
`;

export const Header = () => {
  // TODO: new todo button logic
  return (
    <WrapperDiv>
      <h1>Things to do</h1>
      <Button>New</Button>
    </WrapperDiv>
  );
};
