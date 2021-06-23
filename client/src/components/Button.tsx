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
  background-color: ${props => props.theme.primary.surface};
  border: none;
  border-radius: 0.3rem;
  color: white;
  cursor: pointer;

  ${props => props.LeftIcon && 'padding-left: 2.5rem;'}
  ${props => props.RightIcon && 'padding-right: 2.5rem;'}

  &:hover {
    background-color: ${props => props.theme.primary.hover};
  }

  &:active {
    background-color: ${props => props.theme.primary.active};
  }

  &:disabled {
    background-color: ${props => props.theme.disabled.surface};
    color: ${props => props.theme.disabled.onSurface};
    cursor: default;

    & > svg {
      fill: ${props => props.theme.disabled.onSurface};
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
