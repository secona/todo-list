import * as React from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons/lib';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  RightIcon?: IconType;
  LeftIcon?: IconType;
}

const WrapperButton = styled.button<Props>`
  position: relative;
  padding: 0.4rem;
  background-color: #ff1744;
  border: none;
  border-radius: 0.3rem;
  color: white;
  cursor: pointer;

  ${props => props.LeftIcon && 'padding-left: 2rem;'}
  ${props => props.RightIcon && 'padding-right: 2rem;'}

  &:hover {
    background-color: #d32f2f;
  }

  &:active {
    box-shadow: 0 0 0 0.2rem #d32f2fbf;
  }

  &:disabled {
    background-color: #455a64;
    color: #90a4ae;

    & > svg {
      fill: #90a4ae;
    }
  }

  & > svg {
    fill: white;
    position: absolute;
    top: 0.5rem;

    &.button-lefticon {
      left: 0.5rem;
    }

    &.button-righticon {
      right: 0.5rem;
    }
  }
`;

export const Button = ({ children, ...rest }: Props) => {
  const { LeftIcon, RightIcon } = rest;
  return (
    <WrapperButton {...rest}>
      {LeftIcon && <LeftIcon size={16} className='button-lefticon' />}
      {RightIcon && <RightIcon size={16} className='button-righticon' />}
      {children}
    </WrapperButton>
  );
};
