import * as React from 'react';
import styled from 'styled-components';
import { Button } from '../../../components/Button';

interface Props {
  buttonProps?: React.ComponentPropsWithoutRef<'button'>;
}

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

export const Header = ({ buttonProps }: Props) => {
  return (
    <WrapperDiv>
      <h1>Things to do</h1>
      <Button {...buttonProps}>New</Button>
    </WrapperDiv>
  );
};
