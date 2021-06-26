import * as React from 'react';
import styled, { css } from 'styled-components';

interface Props {
  isSecondary?: boolean;
}

export const IconButton = styled.button<Props>`
  padding: 0.5rem;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  transition-duration: 0.1s;
  line-height: 0;

  ${({ theme: { primary, secondary, disabled }, isSecondary }) => {
    const toUse = isSecondary ? secondary : primary;
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
        background-color: ${disabled.surface};
        * {
          color: ${disabled.onSurface} !important;
        }
      }
    `;
  }}
`;
