import { ComponentPropsWithoutRef } from 'react';
import styled, { css } from 'styled-components';
import { FieldError } from 'react-hook-form';

interface Props extends ComponentPropsWithoutRef<'textarea'> {
  error?: FieldError;
}

export const TextArea = styled.textarea<Props>`
  display: block;
  border-style: solid;
  border-radius: 0.3rem;
  border-width: 0.1rem;
  background-color: transparent;
  padding: 0.5rem;
  width: 100%;
  outline: none;
  resize: vertical;
  font-size: 1em;
  max-height: 25vh;

  ${p => p.error && `border-color: ${p.theme.error.surface} !important;`}

  // themes
  ${({ theme: { primary, disabled, elevationColor } }) => css`
    border-color: ${elevationColor['24dp']};

    &:focus {
      border-color: ${primary.surface};
    }

    &:disabled {
      color: ${disabled.onSurface} !important;
      border-color: ${disabled.surface};
    }
  `}
`;
