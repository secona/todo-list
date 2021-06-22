import * as React from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons/lib';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  RightIcon?: IconType;
  LeftIcon?: IconType;
}

const WrapperButton = styled.button<Props>`
  position: relative;
  padding: 0.5rem 1rem;
  background-color: #2979ff;
  border: none;
  border-radius: 0.3rem;
  color: white;
  cursor: pointer;

  ${props => props.LeftIcon && 'padding-left: 2.5rem;'}
  ${props => props.RightIcon && 'padding-right: 2.5rem;'}

  &:hover {
    background-color: #2979ffdf;
  }

  &:active {
    background-color: #2979ffbf;
  }

  &:disabled {
    background-color: rgba(255, 255, 255, 12%);
    color: rgba(255, 255, 255, 38%);
    cursor: default;

    & > svg {
      fill: rgba(255, 255, 255, 38%);
    }
  }

  & > svg {
    fill: white;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);

    &.button-lefticon {
      left: 1rem;
    }

    &.button-righticon {
      right: 1rem;
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
