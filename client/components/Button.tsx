import * as React from 'react';
import styled, { css } from 'styled-components';
import { IconType } from 'react-icons/lib';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  RightIcon?: IconType;
  LeftIcon?: IconType;
  color?: 'primary' | 'secondary' | 'transparent';
}

const WrapperButton = styled.button<Props>`
  position: relative;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.3rem;
  transition-duration: 0.1s;
  cursor: pointer;

  ${props => props.LeftIcon && 'padding-left: 2.5rem;'}
  ${props => props.RightIcon && 'padding-right: 2.5rem;'}

  /* theming */
  ${({ theme, color }) => {
    const toUse = theme[color || 'primary'];
    return css`
      background-color: ${toUse.surface};
      color: ${toUse.onSurface} !important;

      &:hover {
        background-color: ${toUse.hover};
      }

      &:active {
        background-color: ${toUse.active};
      }

      &:disabled {
        cursor: default;
        background-color: ${theme.disabled.surface};
        color: ${theme.disabled.onSurface};

        & > svg {
          fill: ${theme.disabled.onSurface};
        }
      }
    `;
  }}

  & > svg.icon {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
  }

  & > svg.icon.icon-left {
    left: 1rem;
  }

  & > svg.icon.icon-right {
    right: 1rem;
  }
`;

export const Button = ({ children, ...rest }: Props) => {
  const { LeftIcon, RightIcon } = rest;
  return (
    <WrapperButton {...rest}>
      {LeftIcon && <LeftIcon size={16} className='icon icon-left' />}
      {RightIcon && <RightIcon size={16} className='icon icon-right' />}
      {children}
    </WrapperButton>
  );
};
