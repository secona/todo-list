import styled, { css } from 'styled-components';

interface Props {
  color?: 'primary' | 'secondary' | 'transparent';
}

export const IconButton = styled.button<Props>`
  padding: 0.5rem;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  transition-duration: 0.1s;
  line-height: 0;

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
        background-color: ${theme.disabled.surface};
        * {
          color: ${theme.disabled.onSurface} !important;
        }
      }
    `;
  }}
`;
