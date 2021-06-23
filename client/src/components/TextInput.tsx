import * as React from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons/lib';
import { FieldError } from 'react-hook-form';

interface Props extends React.ComponentPropsWithoutRef<'input'> {
  LeftIcon?: IconType;
  RightIcon?: IconType;
  error?: FieldError;
}

const Label = styled.label`
  position: relative;
  display: block;

  & > svg {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);

    &.i-left {
      left: 0.5rem;
    }

    &.i-right {
      right: 0.5rem;
    }
  }
`;

const Input = styled.input<Props>`
  display: block;
  border-style: solid;
  border-radius: 0.3rem;
  border-width: 0.1rem;
  border-color: ${props => props.theme.elevationColor['24dp']};
  background-color: transparent;
  color: white;
  padding: 0.5rem;
  width: 100%;
  outline: none;

  ${props => props.LeftIcon && 'padding-left: 2rem;'};
  ${props => props.RightIcon && 'padding-right: 2rem;'};

  ${props =>
    props.error && `border-color: ${props.theme.error.surface}; !important`}

  &:focus {
    border-color: ${props => props.theme.primary.surface};
  }

  &:disabled {
    color: ${props => props.theme.disabled.onSurface};
    border-color: ${props => props.theme.disabled.surface};
    & ~ svg {
      fill: ${props => props.theme.disabled.onSurface};
    }
  }
`;

const ErrorMsg = styled.span`
  display: block;
  color: ${props => props.theme.error.surface};
  font-size: 0.75rem;
  text-align: left;
  padding: 0 0.5rem;
`;

export const TextInput = React.forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const { RightIcon, LeftIcon, error } = props;
    return (
      <div>
        <Label>
          <Input {...props} ref={ref} />
          {LeftIcon && <LeftIcon size={16} className='i-left' />}
          {RightIcon && <RightIcon size={16} className='i-right' />}
        </Label>
        {error && <ErrorMsg children={error.message} />}
      </div>
    );
  }
);
