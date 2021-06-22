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

const Input = styled.input<Omit<Props, 'error'>>`
  border: none;
  border-radius: 0.3rem;
  background-color: #37474f;
  color: white;
  padding: 0.5rem;
  width: 100%;
  outline: none;

  ${props => props.LeftIcon && 'padding-left: 2rem;'};
  ${props => props.RightIcon && 'padding-right: 2rem;'};

  &:focus {
    box-shadow: 0 0 0 0.125rem #536dfe;
  }

  &:disabled {
    color: #546e7a;
    & ~ svg {
      fill: #546e7a;
    }
  }
`;

const ErrorMsg = styled.span`
  display: block;
  color: #e53935;
  font-size: 0.75rem;
  text-align: left;
  padding: 0 0.5rem;
`;

export const TextInput = React.forwardRef<HTMLInputElement, Props>(
  ({ error, ...rest }, ref) => {
    return (
      <div>
        <Label>
          <Input {...rest} ref={ref} />
          {rest.LeftIcon && <rest.LeftIcon size={16} className='i-left' />}
          {rest.RightIcon && <rest.RightIcon size={16} className='i-right' />}
        </Label>
        {error && <ErrorMsg children={error.message} />}
      </div>
    );
  }
);
