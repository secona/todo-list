import * as React from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons/lib';
import { FaExclamationTriangle } from 'react-icons/fa';
import { FieldError } from 'react-hook-form';

interface Props extends React.ComponentPropsWithoutRef<'input'> {
  LeftIcon?: IconType;
  RightIcon?: IconType;
  error?: FieldError;
}

interface WrapperProps {
  withLeftIcon?: boolean;
  withRightIcon?: boolean;
}

const Input = styled.label<WrapperProps>`
  position: relative;
  display: block;

  & > svg {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);

    &.input-lefticon {
      left: 0.5rem;
    }

    &.input-righticon {
      right: 0.5rem;
    }
  }

  & > input {
    border: none;
    border-radius: 0.3rem;
    background-color: #37474f;
    color: white;
    padding: 0.5rem;
    width: 100%;
    outline: none;

    ${props => props.withLeftIcon && 'padding-left: 2rem;'};
    ${props => props.withRightIcon && 'padding-right: 2rem;'};

    &:focus {
      box-shadow: 0 0 0 0.125rem #536dfe;
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
  ({ LeftIcon, RightIcon, error, ...rest }, ref) => {
    return (
      <div>
        <Input withLeftIcon={!!LeftIcon} withRightIcon={!!RightIcon}>
          <input {...rest} ref={ref} />
          {LeftIcon && <LeftIcon size={16} className='input-lefticon' />}
          {RightIcon && <RightIcon size={16} className='input-righticon' />}
        </Input>
        {error && <ErrorMsg>{error.message}</ErrorMsg>}
      </div>
    );
  }
);
