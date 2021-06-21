import * as React from 'react';
import { IconType } from 'react-icons/lib';
import styled from 'styled-components';

interface Props extends React.ComponentPropsWithoutRef<'input'> {
  LeftIcon?: IconType;
  RightIcon?: IconType;
}

interface WrapperProps {
  withLeftIcon?: boolean;
  withRightIcon?: boolean;
}
// TODO: fix box-shadow looks like it has offset
const WrapperLabel = styled.label<WrapperProps>`
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
    outline: none;

    ${props => props.withLeftIcon && 'padding-left: 2rem;'};
    ${props => props.withRightIcon && 'padding-right: 2rem;'};

    &:focus {
      box-shadow: 0 0 0 0.125rem #536dfe;
    }
  }
`;

export const TextInput = React.forwardRef<HTMLInputElement, Props>(
  ({ LeftIcon, RightIcon, ...rest }, ref) => {
    return (
      <WrapperLabel withLeftIcon={!!LeftIcon} withRightIcon={!!RightIcon}>
        <input {...rest} ref={ref} />
        {LeftIcon && <LeftIcon size={16} className='input-lefticon' />}
        {RightIcon && <RightIcon size={16} className='input-righticon' />}
      </WrapperLabel>
    );
  }
);
